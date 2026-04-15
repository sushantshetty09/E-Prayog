import React from 'react';
import { useAuth } from '../services/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import { FlaskConical, BookOpen, GraduationCap, TrendingUp, ArrowRight, Zap, Dna, Calculator, Monitor, Clock, Sigma, Cpu, Table2, Hash, ShieldCheck, Microscope, Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import { SUBJECTS, findLabById, getSubjectLabIds, SUBJECT_LAB_COUNTS } from '../constants';

const SUBJECT_ICONS: Record<string, React.ReactNode> = {
  physics: <Zap size={24} />,
  chemistry: <FlaskConical size={24} />,
  biology: <Dna size={24} />,
  math: <Calculator size={24} />,
  cs: <Monitor size={24} />,
};

const SUBJECT_COLORS: Record<string, { bg: string; text: string; border: string; bar: string }> = {
  physics: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', bar: 'bg-emerald-500' },
  chemistry: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20', bar: 'bg-orange-500' },
  biology: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20', bar: 'bg-purple-500' },
  math: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20', bar: 'bg-blue-500' },
  cs: { bg: 'bg-pink-500/10', text: 'text-pink-400', border: 'border-pink-500/20', bar: 'bg-pink-500' },
};

const StudentDashboard: React.FC = () => {
  const { user, profileData, loading } = useAuth();
  const navigate = useNavigate();

  const progress = profileData?.progress || { physics: 0, chemistry: 0, biology: 0, math: 0, cs: 0 };
  const completedLabs: string[] = profileData?.completedLabs || [];
  const visitedLabs: string[] = profileData?.visitedLabs || [];
  const streak = profileData?.streak || 0;
  const grade = profileData?.grade || 'PUC';
  const displayName = profileData?.name || profileData?.full_name || user?.displayName || 'Student';
  const overallProgress = Math.round(
    ((progress.physics || 0) + (progress.chemistry || 0) + (progress.biology || 0) + (progress.math || 0) + (progress.cs || 0)) / 5
  );

  // Find most recent visited-but-not-completed lab
  const incompleteVisited = visitedLabs.filter(id => !completedLabs.includes(id)).slice(-1)[0];
  const recentLabData = findLabById(incompleteVisited);

  if (loading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-3 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) { navigate('/login'); return null; }

  return (
    <div className="pt-24 pb-12 px-6 lg:px-12 max-w-7xl mx-auto min-h-screen">
      {/* Welcome Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-display font-bold text-white mb-2">
            Welcome back, <span className="text-emerald-400">{displayName.split(' ')[0]}</span>!
          </h1>
          <p className="text-slate-400">Continue your learning journey. You've completed {overallProgress}% overall.</p>
        </div>
        {/* Streak badge */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-orange-500/10 border border-orange-500/20 shrink-0">
          <Flame size={22} className="text-orange-400" />
          <div>
            <p className="text-lg font-bold text-white leading-tight">{streak} day{streak !== 1 ? 's' : ''}</p>
            <p className="text-[10px] text-orange-400/70 font-bold uppercase">Streak</p>
          </div>
        </div>
      </div>

      {/* Quick Access Tools */}
      <section className="mb-8">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Quick Access</h3>
        <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
          {[
            { id: 'formula', label: 'Formula Sheet', icon: Sigma, color: '#3b82f6', bg: 'rgba(59,130,246,0.15)', path: '/tools/formula-sheet' },
            { id: 'logic', label: 'Logic Gates', icon: Cpu, color: '#a855f7', bg: 'rgba(168,85,247,0.15)', path: '/tools/logic-gates' },
            { id: 'periodic', label: 'Periodic Table', icon: Table2, color: '#10b981', bg: 'rgba(16,185,129,0.15)', path: '/tools/periodic-table' },
            { id: 'constants', label: 'Constants', icon: Hash, color: '#f59e0b', bg: 'rgba(245,158,11,0.15)', path: '/tools/constants' },
            { id: 'calc', label: 'Calculator', icon: Calculator, color: '#ec4899', bg: 'rgba(236,72,153,0.15)', path: '/tools/calculator' },
            { id: 'safety', label: 'Safety Guide', icon: ShieldCheck, color: '#ef4444', bg: 'rgba(239,68,68,0.15)', path: '/tools/safety-guide' },
            { id: 'bio', label: 'Bio Diagrams', icon: Microscope, color: '#22c55e', bg: 'rgba(34,197,94,0.15)', path: '/tools/bio-diagrams' },
          ].map(tool => (
            <Link key={tool.id} to={tool.path}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="rounded-2xl p-4 flex flex-col items-center gap-3 cursor-pointer bg-slate-900/60 border border-white/5 hover:border-white/15 transition-all h-full">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: tool.bg }}>
                  <tool.icon size={22} style={{ color: tool.color }} />
                </div>
                <span className="text-white text-xs font-semibold text-center leading-tight">{tool.label}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <GlassCard hoverEffect={false} className="p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20"><TrendingUp size={20} className="text-emerald-400" /></div>
            <div><div className="text-2xl font-display font-bold text-white">{overallProgress}%</div><div className="text-xs text-slate-400 font-medium">Overall Progress</div></div>
          </div>
        </GlassCard>
        <GlassCard hoverEffect={false} className="p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20"><FlaskConical size={20} className="text-blue-400" /></div>
            <div><div className="text-2xl font-display font-bold text-white">{completedLabs.length}</div><div className="text-xs text-slate-400 font-medium">Labs Completed</div></div>
          </div>
        </GlassCard>
        <GlassCard hoverEffect={false} className="p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20"><BookOpen size={20} className="text-purple-400" /></div>
            <div><div className="text-2xl font-display font-bold text-white">5</div><div className="text-xs text-slate-400 font-medium">Subjects</div></div>
          </div>
        </GlassCard>
        <GlassCard hoverEffect={false} className="p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20"><GraduationCap size={20} className="text-amber-400" /></div>
            <div><div className="text-2xl font-display font-bold text-white">{grade || 'PUC'}</div><div className="text-xs text-slate-400 font-medium">Your Grade</div></div>
          </div>
        </GlassCard>
      </div>

      {/* Continue Learning + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Clock size={20} className="text-emerald-400" /> Continue Learning</h2>
          <GlassCard hoverEffect={false} className="p-6 relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-emerald-500/5 blur-3xl rounded-full"></div>
            {recentLabData ? (
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-400 mb-1">Last experiment</p>
                  <h3 className="text-lg font-bold text-white mb-2">{recentLabData.lab.title}</h3>
                  <p className="text-xs text-slate-500 capitalize">{recentLabData.subject.name}</p>
                </div>
                <Link to={`/subjects/${recentLabData.subject.id}/${recentLabData.lab.id}`}
                  className="shrink-0 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors flex items-center gap-2">
                  Continue <ArrowRight size={16} />
                </Link>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center py-4">
                <FlaskConical className="text-slate-600 mb-4" size={40} />
                <p className="text-slate-400 mb-4">You haven't started any experiments yet.</p>
                <Link to="/subjects" className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors flex items-center gap-2">
                  Explore Labs <ArrowRight size={16} />
                </Link>
              </div>
            )}
          </GlassCard>
        </div>
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link to="/subjects" className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors group">
              <FlaskConical size={20} className="text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="text-white font-medium">Browse All Labs</span>
              <ArrowRight size={16} className="ml-auto text-slate-500 group-hover:text-white transition-colors" />
            </Link>
            <Link to="/tutor" className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors group">
              <Zap size={20} className="text-amber-400 group-hover:scale-110 transition-transform" />
              <span className="text-white font-medium">Ask AI Tutor</span>
              <ArrowRight size={16} className="ml-auto text-slate-500 group-hover:text-white transition-colors" />
            </Link>
            <Link to="/profile" className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors group">
              <GraduationCap size={20} className="text-blue-400 group-hover:scale-110 transition-transform" />
              <span className="text-white font-medium">Edit Profile</span>
              <ArrowRight size={16} className="ml-auto text-slate-500 group-hover:text-white transition-colors" />
            </Link>
          </div>
        </div>
      </div>

      {/* Subject Progress Cards */}
      <h2 className="text-xl font-bold text-white mb-4">Subject Progress</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {SUBJECTS.map(subject => {
          const subjectId = subject.id;
          const styles = SUBJECT_COLORS[subjectId] || SUBJECT_COLORS.physics;
          const percentage = Math.min(100, Math.max(0, progress[subjectId] || 0));
          const subjectLabIds = getSubjectLabIds(subjectId);
          const completedCount = completedLabs.filter(id => subjectLabIds.includes(id)).length;
          const totalLabs = SUBJECT_LAB_COUNTS[subjectId] || subject.labs.length;

          return (
            <Link to={`/subjects/${subjectId}`} key={subjectId}>
              <GlassCard className="p-5 h-full">
                <div className={`p-2.5 rounded-xl ${styles.bg} border ${styles.border} w-fit mb-3`}>
                  {SUBJECT_ICONS[subjectId] || <FlaskConical size={24} />}
                </div>
                <h3 className="text-white font-bold capitalize mb-1">{subject.name}</h3>
                <p className="text-xs text-slate-400 mb-3">{completedCount}/{totalLabs} experiments</p>
                <div className="w-full h-2 bg-black/30 rounded-full overflow-hidden border border-white/5 mb-1">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className={`h-full ${styles.bar} opacity-80`} />
                </div>
                <div className={`text-right text-xs font-mono font-bold ${styles.text}`}>{percentage}%</div>
              </GlassCard>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default StudentDashboard;
