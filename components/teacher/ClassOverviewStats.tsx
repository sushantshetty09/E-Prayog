import React from 'react';
import { m as motion } from 'framer-motion';
import { Users, BookOpen, TrendingUp, TrendingDown, Star, AlertTriangle, BarChart3, Minus } from 'lucide-react';

export interface QuizAttempt {
  id: string;
  userId: string;
  userName?: string;
  experimentId: string;
  experimentName: string;
  subject: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  attemptedAt: string;
  levelBreakdown?: Record<string, { correct: number; total: number }>;
  teacherId?: string;
}

interface Props {
  attempts: QuizAttempt[];
  studentCount: number;
}

const COGNITIVE_LEVELS = ['Cognitive', 'Thinking', 'Reasoning', 'Complexity', 'Cognitive Complexity'];

const ClassOverviewStats: React.FC<Props> = ({ attempts, studentCount }) => {
  const now = Date.now();
  const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
  const fourteenDaysAgo = now - 14 * 24 * 60 * 60 * 1000;

  const recentAttempts = attempts.filter(a => new Date(a.attemptedAt).getTime() >= sevenDaysAgo);
  const prevAttempts   = attempts.filter(a => {
    const t = new Date(a.attemptedAt).getTime();
    return t >= fourteenDaysAgo && t < sevenDaysAgo;
  });

  const classAvgScore = attempts.length
    ? Math.round(attempts.reduce((s, a) => s + a.score, 0) / attempts.length)
    : 0;
  const prevAvgScore = prevAttempts.length
    ? Math.round(prevAttempts.reduce((s, a) => s + a.score, 0) / prevAttempts.length)
    : null;

  // Most attempted experiment
  const expCounts: Record<string, { name: string; count: number }> = {};
  for (const a of attempts) {
    if (!expCounts[a.experimentId]) expCounts[a.experimentId] = { name: a.experimentName, count: 0 };
    expCounts[a.experimentId].count++;
  }
  const topExp = Object.values(expCounts).sort((a, b) => b.count - a.count)[0];

  // Weakest cognitive level (class-wide)
  const levelAccuracy: Record<string, { correct: number; total: number }> = {};
  for (const lvl of COGNITIVE_LEVELS) levelAccuracy[lvl] = { correct: 0, total: 0 };
  for (const a of attempts) {
    if (!a.levelBreakdown) continue;
    for (const [lvl, data] of Object.entries(a.levelBreakdown)) {
      if (!levelAccuracy[lvl]) levelAccuracy[lvl] = { correct: 0, total: 0 };
      levelAccuracy[lvl].correct += data.correct;
      levelAccuracy[lvl].total  += data.total;
    }
  }
  const weakestLevel = COGNITIVE_LEVELS.filter(l => levelAccuracy[l]?.total > 0)
    .sort((a, b) => {
      const accA = levelAccuracy[a].correct / levelAccuracy[a].total;
      const accB = levelAccuracy[b].correct / levelAccuracy[b].total;
      return accA - accB;
    })[0] ?? '—';

  const trend = (current: number, previous: number | null) => {
    if (previous === null) return null;
    const diff = current - previous;
    if (Math.abs(diff) < 1) return { dir: 'flat', val: 0 };
    return { dir: diff > 0 ? 'up' : 'down', val: Math.abs(diff) };
  };

  const totalTrend = trend(attempts.length, prevAttempts.length);
  const avgTrend   = trend(classAvgScore, prevAvgScore);

  const TrendBadge = ({ t }: { t: { dir: string; val: number } | null }) => {
    if (!t) return null;
    if (t.dir === 'flat') return <span className="text-xs text-zinc-500 flex items-center gap-0.5"><Minus size={12} /> same</span>;
    return t.dir === 'up'
      ? <span className="text-xs text-emerald-400 flex items-center gap-0.5"><TrendingUp size={12} />+{t.val}</span>
      : <span className="text-xs text-red-400 flex items-center gap-0.5"><TrendingDown size={12} />-{t.val}</span>;
  };

  const cards = [
    {
      id: 'students',
      label: 'Total Students',
      value: studentCount,
      icon: <Users size={20} className="text-sky-400" />,
      iconBg: 'bg-sky-500/15 border-sky-500/25',
      trend: null as null,
    },
    {
      id: 'attempts',
      label: 'Total Attempts',
      value: attempts.length,
      icon: <BookOpen size={20} className="text-violet-400" />,
      iconBg: 'bg-violet-500/15 border-violet-500/25',
      trend: totalTrend,
    },
    {
      id: 'avg',
      label: 'Class Avg Score',
      value: `${classAvgScore}%`,
      icon: <BarChart3 size={20} className="text-emerald-400" />,
      iconBg: 'bg-emerald-500/15 border-emerald-500/25',
      trend: avgTrend,
    },
    {
      id: 'top-exp',
      label: 'Most Attempted',
      value: topExp ? topExp.name : '—',
      small: true,
      icon: <Star size={20} className="text-amber-400" />,
      iconBg: 'bg-amber-500/15 border-amber-500/25',
      trend: null as null,
    },
    {
      id: 'weakest',
      label: 'Weakest Level',
      value: weakestLevel,
      small: true,
      icon: <AlertTriangle size={20} className="text-red-400" />,
      iconBg: 'bg-red-500/15 border-red-500/25',
      trend: null as null,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
      {cards.map((card, i) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06, duration: 0.4 }}
          className="bg-gray-900 border border-white/8 rounded-2xl p-4 flex flex-col gap-3 hover:border-white/15 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className={`p-2 rounded-xl border ${card.iconBg}`}>{card.icon}</div>
            {'trend' in card && card.trend && <TrendBadge t={card.trend} />}
          </div>
          <div>
            <div className={`font-bold text-white leading-tight ${card.small ? 'text-sm' : 'text-2xl'}`}>
              {String(card.value)}
            </div>
            <div className="text-xs text-zinc-500 mt-0.5 font-medium">{card.label}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ClassOverviewStats;
