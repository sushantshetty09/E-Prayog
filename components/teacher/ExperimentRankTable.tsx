import React, { useState } from 'react';
import { m as motion } from 'framer-motion';
import { Bell, ChevronUp, ChevronDown } from 'lucide-react';
import { db } from '../../services/firebase';
import { addDoc, collection } from 'firebase/firestore';
import type { QuizAttempt } from './ClassOverviewStats';

interface Props {
  attempts: QuizAttempt[];
  teacherId: string;
}

type SortKey = 'avgScore' | 'attempts' | 'subject';

const COGNITIVE_LEVELS = ['Cognitive', 'Thinking', 'Reasoning', 'Complexity', 'Cognitive Complexity'] as const;
const LEVEL_COLORS = [
  'bg-sky-400',
  'bg-violet-400',
  'bg-amber-400',
  'bg-orange-400',
  'bg-red-400',
];

const SUBJECT_COLORS: Record<string, string> = {
  Physics: 'text-sky-400', Chemistry: 'text-orange-400',
  Biology: 'text-purple-400', Math: 'text-blue-400', CS: 'text-pink-400',
};

const difficultyBadge = (score: number) => {
  if (score >= 75) return { label: '🟢 Easy',     cls: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' };
  if (score >= 55) return { label: '🟡 Moderate', cls: 'bg-amber-500/15 text-amber-400 border-amber-500/30' };
  return              { label: '🔴 Hard',      cls: 'bg-red-500/15 text-red-400 border-red-500/30' };
};

const ExperimentRankTable: React.FC<Props> = ({ attempts, teacherId }) => {
  const [sortKey, setSortKey] = useState<SortKey>('avgScore');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [reminded, setReminded] = useState<Set<string>>(new Set());
  const [sending, setSending] = useState<string | null>(null);

  // Aggregate per experiment
  const expMap: Record<string, {
    id: string; name: string; subject: string;
    totalScore: number; count: number;
    levelData: Record<string, { correct: number; total: number }>;
  }> = {};

  for (const a of attempts) {
    if (!expMap[a.experimentId]) {
      expMap[a.experimentId] = {
        id: a.experimentId, name: a.experimentName, subject: a.subject,
        totalScore: 0, count: 0, levelData: {},
      };
    }
    expMap[a.experimentId].totalScore += a.score;
    expMap[a.experimentId].count++;
    if (a.levelBreakdown) {
      for (const [lvl, data] of Object.entries(a.levelBreakdown)) {
        if (!expMap[a.experimentId].levelData[lvl]) expMap[a.experimentId].levelData[lvl] = { correct: 0, total: 0 };
        expMap[a.experimentId].levelData[lvl].correct += data.correct;
        expMap[a.experimentId].levelData[lvl].total   += data.total;
      }
    }
  }

  const rows = Object.values(expMap).map(e => ({
    ...e,
    avgScore: e.count ? Math.round(e.totalScore / e.count) : 0,
    levelPcts: COGNITIVE_LEVELS.map(lvl => {
      const d = e.levelData[lvl];
      return d && d.total > 0 ? Math.round((d.correct / d.total) * 100) : 0;
    }),
  }));

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir(key === 'avgScore' ? 'asc' : 'desc'); }
  };

  const sorted = [...rows].sort((a, b) => {
    const mult = sortDir === 'asc' ? 1 : -1;
    if (sortKey === 'avgScore') return (a.avgScore - b.avgScore) * mult;
    if (sortKey === 'attempts') return (a.count - b.count) * mult;
    if (sortKey === 'subject') return a.subject.localeCompare(b.subject) * mult;
    return 0;
  });

  const sendReminder = async (expId: string, expName: string) => {
    setSending(expId);
    try {
      await addDoc(collection(db, 'teacherAnnouncements'), {
        experimentId: expId,
        experimentName: expName,
        message: 'Review recommended — class performance is below threshold.',
        teacherId,
        createdAt: new Date().toISOString(),
      });
      setReminded(prev => new Set(prev).add(expId));
    } catch (err) {
      console.warn('Failed to send reminder:', err);
    } finally {
      setSending(null);
    }
  };

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <span className="text-zinc-600 ml-1 text-xs">↕</span>;
    return <span className="text-sky-400 ml-1 text-xs">{sortDir === 'asc' ? '↑' : '↓'}</span>;
  };

  const hCls = "text-left text-xs font-semibold text-zinc-500 uppercase tracking-wide py-3 px-4 cursor-pointer hover:text-zinc-300 select-none";

  return (
    <div className="bg-gray-900 border border-white/8 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-950/60 border-b border-white/8">
            <tr>
              <th className={`${hCls} w-10`}>#</th>
              <th className={hCls}>Experiment</th>
              <th className={hCls} onClick={() => toggleSort('subject')}>Subject <SortIcon col="subject" /></th>
              <th className={hCls} onClick={() => toggleSort('avgScore')}>Class Avg <SortIcon col="avgScore" /></th>
              <th className={hCls} onClick={() => toggleSort('attempts')}>Attempts <SortIcon col="attempts" /></th>
              <th className={`${hCls} hidden lg:table-cell`}>Cognitive Breakdown</th>
              <th className={hCls}>Difficulty</th>
              <th className={hCls}></th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-zinc-500 text-sm">
                  No experiment data yet.
                </td>
              </tr>
            ) : sorted.map((exp, idx) => {
              const badge = difficultyBadge(exp.avgScore);
              const isReminded = reminded.has(exp.id);
              return (
                <motion.tr
                  key={exp.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className="border-b border-white/5 hover:bg-white/4 transition-colors"
                >
                  <td className="py-3 px-4 text-zinc-600 font-mono text-xs">{idx + 1}</td>
                  <td className="py-3 px-4 text-white font-medium max-w-[180px]">
                    <span className="block truncate" title={exp.name}>{exp.name}</span>
                  </td>
                  <td className={`py-3 px-4 text-xs font-semibold ${SUBJECT_COLORS[exp.subject] ?? 'text-zinc-400'}`}>
                    {exp.subject}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${exp.avgScore >= 75 ? 'bg-emerald-400' : exp.avgScore >= 55 ? 'bg-amber-400' : 'bg-red-400'} opacity-80`}
                          style={{ width: `${exp.avgScore}%` }}
                        />
                      </div>
                      <span className="font-bold text-white text-xs">{exp.avgScore}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-zinc-400 font-mono text-xs">{exp.count}</td>
                  <td className="py-3 px-4 hidden lg:table-cell">
                    {/* Mini 5-bar cognitive breakdown */}
                    <div className="flex items-end gap-0.5 h-8">
                      {exp.levelPcts.map((pct, li) => (
                        <div
                          key={li}
                          title={`${COGNITIVE_LEVELS[li]}: ${pct}%`}
                          className={`w-4 rounded-sm ${LEVEL_COLORS[li]} opacity-80 transition-all`}
                          style={{ height: `${Math.max(3, pct * 0.28)}px` }}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${badge.cls}`}>
                      {badge.label}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => sendReminder(exp.id, exp.name)}
                      disabled={isReminded || sending === exp.id}
                      title="Send Review Reminder"
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all
                        ${isReminded
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 cursor-default'
                          : 'bg-sky-500/15 text-sky-400 border border-sky-500/30 hover:bg-sky-500/25'}
                        disabled:opacity-50`}
                    >
                      <Bell size={12} />
                      {isReminded ? 'Sent!' : sending === exp.id ? '…' : 'Remind'}
                    </button>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExperimentRankTable;
