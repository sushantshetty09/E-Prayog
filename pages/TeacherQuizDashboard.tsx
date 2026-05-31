import React, { useState, useEffect, useCallback } from 'react';
import { m as motion } from 'framer-motion';
import {
  BarChart3, Users, Grid3X3, Trophy, FlaskConical,
  RefreshCw, AlertCircle, BookOpen, Clock
} from 'lucide-react';
import { db } from '../services/firebase';
import { collection, onSnapshot, query, where, orderBy, limit } from 'firebase/firestore';
import { useAuth } from '../services/AuthContext';

import ClassOverviewStats, { type QuizAttempt } from '../components/teacher/ClassOverviewStats';
import SubjectPerformanceTable from '../components/teacher/SubjectPerformanceTable';
import CognitiveLevelHeatmap from '../components/teacher/CognitiveLevelHeatmap';
import StudentLeaderboard from '../components/teacher/StudentLeaderboard';
import ExperimentRankTable from '../components/teacher/ExperimentRankTable';

// ── Types ──────────────────────────────────────────────────────────────────────
interface StudentUser {
  id: string;
  name?: string;
  full_name?: string;
  email?: string;
  role?: string;
}

// ── Helpers ────────────────────────────────────────────────────────────────────
const timeAgo = (iso: string): string => {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
};

const scoreBadgeCls = (score: number) => {
  if (score >= 80) return 'bg-emerald-500/20 text-emerald-400';
  if (score >= 60) return 'bg-amber-500/20 text-amber-400';
  return 'bg-red-500/20 text-red-400';
};

const SUBJECT_COLORS: Record<string, string> = {
  Physics: 'text-sky-400', Chemistry: 'text-orange-400',
  Biology: 'text-purple-400', Math: 'text-blue-400', CS: 'text-pink-400',
};

// ── Skeleton ───────────────────────────────────────────────────────────────────
const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-white/5 rounded-xl ${className ?? ''}`} />
);

const KpiSkeleton = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="bg-gray-900 border border-white/8 rounded-2xl p-4 space-y-3">
        <Skeleton className="size-10" />
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-3 w-24" />
      </div>
    ))}
  </div>
);

// ── Section wrapper ────────────────────────────────────────────────────────────
interface SectionProps {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  onRefresh?: () => void;
  children: React.ReactNode;
  delay?: number;
}

const Section: React.FC<SectionProps> = ({ id, title, subtitle, icon, onRefresh, children, delay = 0 }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="mb-10"
  >
    <div className="flex items-start justify-between mb-5">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-white/5 border border-white/8">{icon}</div>
        <div>
          <h2 className="text-lg font-bold text-white leading-tight">{title}</h2>
          <p className="text-xs text-zinc-500 mt-0.5">{subtitle}</p>
        </div>
      </div>
      {onRefresh && (
        <button
          onClick={onRefresh}
          className="p-2 rounded-xl hover:bg-white/8 text-zinc-500 hover:text-white transition-colors"
          title="Refresh"
        >
          <RefreshCw size={15} />
        </button>
      )}
    </div>
    {children}
  </motion.section>
);

// ── Main Component ─────────────────────────────────────────────────────────────
const TeacherQuizDashboard: React.FC = () => {
  const { user } = useAuth();

  const [attempts, setAttempts]     = useState<QuizAttempt[]>([]);
  const [students, setStudents]     = useState<StudentUser[]>([]);
  const [loading, setLoading]       = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  // Unique students who have attempted at least 1 quiz
  const activeStudentCount = new Set(attempts.map(a => a.userId)).size;

  // ── Real-time Firestore subscriptions ────────────────────────────────────
  useEffect(() => {
    setLoading(true);
    let loaded = { attempts: false, students: false };
    const checkDone = () => {
      if (loaded.attempts && loaded.students) setLoading(false);
    };

    // All quiz attempts — teacher sees all (scoped by teacherId if present)
    const attemptsQuery = query(
      collection(db, 'quizAttempts'),
      orderBy('attemptedAt', 'desc'),
    );
    const unsubAttempts = onSnapshot(attemptsQuery, snap => {
      setAttempts(snap.docs.map(d => ({ id: d.id, ...d.data() } as QuizAttempt)));
      loaded.attempts = true;
      checkDone();
    }, err => {
      console.warn('quizAttempts snapshot error:', err);
      loaded.attempts = true;
      checkDone();
    });

    // All students
    const studentsQuery = query(
      collection(db, 'users'),
      where('role', '==', 'Student'),
    );
    const unsubStudents = onSnapshot(studentsQuery, snap => {
      setStudents(snap.docs.map(d => ({ id: d.id, ...d.data() } as StudentUser)));
      loaded.students = true;
      checkDone();
    }, err => {
      console.warn('users snapshot error:', err);
      loaded.students = true;
      checkDone();
    });

    return () => {
      unsubAttempts();
      unsubStudents();
    };
  }, [refreshKey]);

  const refresh = useCallback(() => setRefreshKey(k => k + 1), []);

  // ── Recent Activity Feed (last 20 attempts) ──────────────────────────────
  const recentAttempts = [...attempts]
    .sort((a, b) => new Date(b.attemptedAt).getTime() - new Date(a.attemptedAt).getTime())
    .slice(0, 20);

  // ── Empty state ──────────────────────────────────────────────────────────
  if (!loading && attempts.length === 0) {
    return (
      <div className="pt-24 pb-12 px-6 lg:px-12 max-w-7xl mx-auto min-h-screen">
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <div className="p-6 rounded-3xl bg-white/5 border border-white/8 mb-6">
            <BarChart3 size={48} className="text-zinc-600 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">No Quiz Data Available Yet</h2>
          <p className="text-zinc-400 max-w-md leading-relaxed">
            No quiz data available yet. Share experiment links with your students to get started.
            Once students complete quizzes, their performance will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 px-6 lg:px-12 max-w-7xl mx-auto min-h-screen bg-gray-950">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <div className="flex items-center gap-4 mb-2">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-sky-600/30 to-violet-600/30 border border-white/10">
            <BarChart3 size={28} className="text-sky-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Quiz Performance Dashboard</h1>
            <p className="text-zinc-500 text-sm mt-0.5">
              Real-time analytics across all students and experiments
            </p>
          </div>
        </div>
      </motion.div>

      {/* Section 0 — KPI Strip */}
      <Section
        id="kpi"
        title="Class Overview"
        subtitle="Key performance indicators — last 7 days trend shown"
        icon={<BarChart3 size={18} className="text-sky-400" />}
        onRefresh={refresh}
        delay={0}
      >
        {loading ? <KpiSkeleton /> : (
          <ClassOverviewStats attempts={attempts} studentCount={activeStudentCount} />
        )}
      </Section>

      {/* Section 1 — Subject Performance */}
      <Section
        id="subjects"
        title="Subject Performance Overview"
        subtitle="Click a row to expand per-experiment bar chart"
        icon={<FlaskConical size={18} className="text-orange-400" />}
        onRefresh={refresh}
        delay={0.08}
      >
        {loading
          ? <Skeleton className="h-48" />
          : <SubjectPerformanceTable attempts={attempts} />
        }
      </Section>

      {/* Section 2 — Cognitive Heatmap */}
      <Section
        id="heatmap"
        title="Where Is the Class Struggling?"
        subtitle="Red cells = areas needing teacher intervention"
        icon={<Grid3X3 size={18} className="text-red-400" />}
        onRefresh={refresh}
        delay={0.14}
      >
        {loading
          ? <Skeleton className="h-48" />
          : (
            <div className="bg-gray-900 border border-white/8 rounded-2xl p-5">
              <CognitiveLevelHeatmap attempts={attempts} />
            </div>
          )
        }
      </Section>

      {/* Section 3 — Student Leaderboard */}
      <Section
        id="leaderboard"
        title="Student Leaderboard"
        subtitle="Ranked by overall average score — click a student for full breakdown"
        icon={<Trophy size={18} className="text-amber-400" />}
        onRefresh={refresh}
        delay={0.2}
      >
        {loading
          ? <Skeleton className="h-64" />
          : <StudentLeaderboard attempts={attempts} students={students} />
        }
      </Section>

      {/* Section 4 — Experiment Difficulty Ranking */}
      <Section
        id="experiments"
        title="Experiment Difficulty Ranking"
        subtitle="Sorted hardest → easiest by class average. Send reminders to students."
        icon={<BookOpen size={18} className="text-violet-400" />}
        onRefresh={refresh}
        delay={0.26}
      >
        {loading
          ? <Skeleton className="h-64" />
          : <ExperimentRankTable attempts={attempts} teacherId={user?.uid ?? ''} />
        }
      </Section>

      {/* Section 5 — Recent Activity Feed */}
      <Section
        id="activity"
        title="Recent Activity Feed"
        subtitle="Last 20 quiz completions across all students"
        icon={<Clock size={18} className="text-emerald-400" />}
        delay={0.32}
      >
        {loading ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-14" />)}
          </div>
        ) : recentAttempts.length === 0 ? (
          <div className="bg-gray-900 border border-white/8 rounded-2xl p-8 text-center text-zinc-500 text-sm">
            No recent activity.
          </div>
        ) : (
          <div className="bg-gray-900 border border-white/8 rounded-2xl divide-y divide-white/5 overflow-hidden">
            {recentAttempts.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.025 }}
                className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/4 transition-colors"
              >
                {/* Avatar */}
                <div className="size-9 rounded-full bg-gradient-to-br from-sky-700 to-violet-800 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {(a.userName ?? '?').charAt(0).toUpperCase()}
                </div>
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white font-medium truncate">
                    <span className="text-zinc-300">{a.userName ?? 'Student'}</span>
                    {' completed '}
                    <span className="font-bold">{a.experimentName}</span>
                  </p>
                  <p className={`text-xs ${SUBJECT_COLORS[a.subject] ?? 'text-zinc-500'}`}>{a.subject}</p>
                </div>
                {/* Score badge */}
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${scoreBadgeCls(a.score)} shrink-0`}>
                  {a.score}%
                </span>
                {/* Time */}
                <span className="text-xs text-zinc-600 shrink-0 hidden sm:inline">
                  {a.attemptedAt ? timeAgo(a.attemptedAt) : '—'}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
};

export default TeacherQuizDashboard;
