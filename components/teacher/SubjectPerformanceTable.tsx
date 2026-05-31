import React, { useState } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { QuizAttempt } from './ClassOverviewStats';

interface Props {
  attempts: QuizAttempt[];
  sortKey?: string;
  onSort?: (key: string) => void;
}

const SUBJECTS = ['Physics', 'Chemistry', 'Biology', 'Math', 'CS'] as const;
type Subject = typeof SUBJECTS[number];

const SUBJECT_META: Record<Subject, { color: string; border: string; bar: string; bg: string }> = {
  Physics:   { color: 'text-sky-400',    border: 'border-l-sky-400',    bar: 'bg-sky-400',    bg: 'bg-sky-500/10' },
  Chemistry: { color: 'text-orange-400', border: 'border-l-orange-400', bar: 'bg-orange-400', bg: 'bg-orange-500/10' },
  Biology:   { color: 'text-purple-400', border: 'border-l-purple-400', bar: 'bg-purple-400', bg: 'bg-purple-500/10' },
  Math:      { color: 'text-blue-400',   border: 'border-l-blue-400',   bar: 'bg-blue-400',   bg: 'bg-blue-500/10' },
  CS:        { color: 'text-pink-400',   border: 'border-l-pink-400',   bar: 'bg-pink-400',   bg: 'bg-pink-500/10' },
};

const EXPERIMENTS_PER_SUBJECT: Record<Subject, number> = {
  Physics: 12, Chemistry: 10, Biology: 8, Math: 6, CS: 6,
};

const SubjectPerformanceTable: React.FC<Props> = ({ attempts }) => {
  const [expanded, setExpanded] = useState<Subject | null>(null);
  const [sortCol, setSortCol] = useState<'avgScore' | 'attempts' | 'attemptsPerStudent'>('avgScore');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const toggleSort = (col: typeof sortCol) => {
    if (sortCol === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortCol(col); setSortDir('desc'); }
  };

  // Aggregate per subject
  const subjectStats = SUBJECTS.map(sub => {
    const subAttempts = attempts.filter(a => a.subject === sub);
    const uniqueStudents = new Set(subAttempts.map(a => a.userId)).size;
    const uniqueExps     = new Set(subAttempts.map(a => a.experimentId)).size;
    const avgScore = subAttempts.length
      ? Math.round(subAttempts.reduce((s, a) => s + a.score, 0) / subAttempts.length)
      : 0;
    const attemptsPerStudent = uniqueStudents ? +(subAttempts.length / uniqueStudents).toFixed(1) : 0;

    // Per experiment breakdown for bar chart
    const expMap: Record<string, { name: string; total: number; count: number }> = {};
    for (const a of subAttempts) {
      if (!expMap[a.experimentId]) expMap[a.experimentId] = { name: a.experimentName, total: 0, count: 0 };
      expMap[a.experimentId].total += a.score;
      expMap[a.experimentId].count++;
    }
    const experiments = Object.values(expMap)
      .map(e => ({ name: e.name, avg: e.count ? Math.round(e.total / e.count) : 0 }))
      .sort((a, b) => b.avg - a.avg);

    const topExp  = experiments[0]?.name ?? '—';
    const weakExp = [...experiments].sort((a, b) => a.avg - b.avg)[0]?.name ?? '—';

    return { sub, avgScore, attempts: subAttempts.length, uniqueStudents, uniqueExps, attemptsPerStudent, experiments, topExp, weakExp };
  });

  const sorted = [...subjectStats].sort((a, b) => {
    const mult = sortDir === 'asc' ? 1 : -1;
    return (a[sortCol] - b[sortCol]) * mult;
  });

  const SortIcon = ({ col }: { col: typeof sortCol }) => {
    if (sortCol !== col) return <span className="text-zinc-600 ml-1">↕</span>;
    return <span className={`ml-1 ${sortDir === 'asc' ? 'text-sky-400' : 'text-sky-400'}`}>{sortDir === 'asc' ? '↑' : '↓'}</span>;
  };

  const headerCls = "text-left text-xs font-semibold text-zinc-500 uppercase tracking-wide py-3 px-4 cursor-pointer hover:text-zinc-300 transition-colors select-none";

  return (
    <div className="bg-gray-900 border border-white/8 rounded-2xl overflow-hidden">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-950/60 border-b border-white/8">
            <tr>
              <th className={headerCls}>Subject</th>
              <th className={`${headerCls} hidden md:table-cell`}>Labs Available</th>
              <th className={`${headerCls}`} onClick={() => toggleSort('attemptsPerStudent')}>
                Avg Attempts/Student <SortIcon col="attemptsPerStudent" />
              </th>
              <th className={headerCls} onClick={() => toggleSort('avgScore')}>
                Class Avg <SortIcon col="avgScore" />
              </th>
              <th className={`${headerCls} hidden lg:table-cell`}>Top Experiment</th>
              <th className={`${headerCls} hidden lg:table-cell`}>Weakest Experiment</th>
              <th className={headerCls}></th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(row => {
              const meta = SUBJECT_META[row.sub];
              const isOpen = expanded === row.sub;
              return (
                <React.Fragment key={row.sub}>
                  <tr
                    className={`border-l-2 ${meta.border} border-b border-white/5 hover:bg-white/4 transition-colors cursor-pointer`}
                    onClick={() => setExpanded(isOpen ? null : row.sub)}
                  >
                    <td className="py-3 px-4">
                      <span className={`font-semibold ${meta.color}`}>{row.sub}</span>
                    </td>
                    <td className="py-3 px-4 text-zinc-400 hidden md:table-cell">
                      {EXPERIMENTS_PER_SUBJECT[row.sub]}
                    </td>
                    <td className="py-3 px-4 text-zinc-300">{row.attemptsPerStudent}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                          <div className={`h-full ${meta.bar} opacity-80`} style={{ width: `${row.avgScore}%` }} />
                        </div>
                        <span className={`font-bold text-xs ${meta.color}`}>{row.avgScore}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-zinc-400 text-xs hidden lg:table-cell max-w-[150px] truncate">{row.topExp}</td>
                    <td className="py-3 px-4 text-zinc-400 text-xs hidden lg:table-cell max-w-[150px] truncate">{row.weakExp}</td>
                    <td className="py-3 px-4">
                      {isOpen ? <ChevronUp size={16} className="text-zinc-500" /> : <ChevronDown size={16} className="text-zinc-500" />}
                    </td>
                  </tr>

                  {/* Expanded inline panel with CSS bar chart */}
                  <AnimatePresence>
                    {isOpen && (
                      <tr>
                        <td colSpan={7} className="p-0">
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className={`${meta.bg} border-b border-white/5 overflow-hidden`}
                          >
                            <div className="p-5">
                              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">
                                Average Score per Experiment — {row.sub}
                              </p>
                              {row.experiments.length === 0 ? (
                                <p className="text-zinc-500 text-sm">No data available yet.</p>
                              ) : (
                                <div className="space-y-2.5">
                                  {row.experiments.map(exp => (
                                    <div key={exp.name} className="flex items-center gap-3">
                                      <div className="text-xs text-zinc-400 w-36 shrink-0 truncate" title={exp.name}>{exp.name}</div>
                                      <div className="flex-1 h-4 bg-gray-800/60 rounded-full overflow-hidden relative">
                                        <motion.div
                                          initial={{ width: 0 }}
                                          animate={{ width: `${exp.avg}%` }}
                                          transition={{ duration: 0.6, ease: 'easeOut' }}
                                          className={`h-full ${meta.bar} opacity-70 rounded-full`}
                                        />
                                        <span className="absolute inset-0 flex items-center px-2 text-[10px] font-bold text-white/80">
                                          {exp.avg > 10 ? `${exp.avg}%` : ''}
                                        </span>
                                      </div>
                                      <span className={`text-xs font-bold ${meta.color} w-10 text-right`}>{exp.avg}%</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </motion.div>
                        </td>
                      </tr>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubjectPerformanceTable;
