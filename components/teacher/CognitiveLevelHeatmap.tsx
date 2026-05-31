import React, { useState } from 'react';
import { m as motion } from 'framer-motion';
import type { QuizAttempt } from './ClassOverviewStats';

interface Props {
  attempts: QuizAttempt[];
}

const SUBJECTS = ['Physics', 'Chemistry', 'Biology', 'Math', 'CS'] as const;
type Subject = typeof SUBJECTS[number];

const COGNITIVE_LEVELS = [
  'Cognitive',
  'Thinking',
  'Reasoning',
  'Complexity',
  'Cognitive Complexity',
] as const;
type CogLevel = typeof COGNITIVE_LEVELS[number];

const SUBJECT_LABELS: Record<Subject, string> = {
  Physics: 'Physics', Chemistry: 'Chem', Biology: 'Biology', Math: 'Math', CS: 'CS',
};

const getColor = (pct: number): string => {
  if (pct >= 80) return 'bg-emerald-500/80 text-emerald-100';
  if (pct >= 60) return 'bg-amber-500/80 text-amber-100';
  if (pct >= 40) return 'bg-orange-500/80 text-orange-100';
  return 'bg-red-500/80 text-red-100';
};

const getBorderColor = (pct: number): string => {
  if (pct >= 80) return 'border-emerald-500/40';
  if (pct >= 60) return 'border-amber-500/40';
  if (pct >= 40) return 'border-orange-500/40';
  return 'border-red-500/40';
};

interface TooltipState { sub: Subject; lvl: CogLevel; pct: number; count: number; x: number; y: number }

const CognitiveLevelHeatmap: React.FC<Props> = ({ attempts }) => {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  // Build subject × level accuracy map
  const grid: Record<Subject, Record<CogLevel, { correct: number; total: number; count: number }>> = {} as never;
  for (const sub of SUBJECTS) {
    grid[sub] = {} as Record<CogLevel, { correct: number; total: number; count: number }>;
    for (const lvl of COGNITIVE_LEVELS) {
      grid[sub][lvl] = { correct: 0, total: 0, count: 0 };
    }
  }

  for (const a of attempts) {
    const sub = a.subject as Subject;
    if (!SUBJECTS.includes(sub)) continue;
    if (!a.levelBreakdown) continue;
    for (const lvl of COGNITIVE_LEVELS) {
      const data = a.levelBreakdown[lvl];
      if (!data) continue;
      grid[sub][lvl].correct += data.correct;
      grid[sub][lvl].total   += data.total;
      grid[sub][lvl].count   += 1;
    }
  }

  const pct = (sub: Subject, lvl: CogLevel): number => {
    const cell = grid[sub][lvl];
    if (cell.total === 0) return -1; // no data
    return Math.round((cell.correct / cell.total) * 100);
  };

  return (
    <div className="relative overflow-visible">
      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 bg-gray-800 border border-white/15 rounded-xl px-3 py-2 text-xs text-white shadow-2xl pointer-events-none"
          style={{ left: tooltip.x + 12, top: tooltip.y - 40 }}
        >
          <p className="font-bold">{tooltip.sub} × {tooltip.lvl}</p>
          <p className="text-zinc-300 mt-0.5">
            {tooltip.pct >= 0 ? `${tooltip.pct}% avg across ${tooltip.count} attempt${tooltip.count !== 1 ? 's' : ''}` : 'No data'}
          </p>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr>
              <th className="text-left text-zinc-500 font-medium py-2 px-3 w-20">Subject</th>
              {COGNITIVE_LEVELS.map(lvl => (
                <th key={lvl} className="text-center text-zinc-400 font-medium py-2 px-2 min-w-[90px]">
                  <span className="hidden sm:inline">{lvl}</span>
                  <span className="sm:hidden">{lvl.split(' ')[0]}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SUBJECTS.map((sub, si) => (
              <motion.tr
                key={sub}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: si * 0.07 }}
              >
                <td className="py-1.5 px-3 text-zinc-400 font-semibold text-xs">
                  {SUBJECT_LABELS[sub]}
                </td>
                {COGNITIVE_LEVELS.map(lvl => {
                  const p = pct(sub, lvl);
                  const count = grid[sub][lvl].count;
                  return (
                    <td key={lvl} className="py-1.5 px-1 text-center">
                      <motion.div
                        whileHover={{ scale: 1.08 }}
                        onMouseEnter={e => setTooltip({
                          sub, lvl, pct: p, count,
                          x: e.clientX, y: e.clientY,
                        })}
                        onMouseLeave={() => setTooltip(null)}
                        className={`inline-flex items-center justify-center rounded-xl w-full py-2.5 font-bold border cursor-default transition-transform
                          ${p >= 0 ? getColor(p) : 'bg-gray-800/60 border-white/8 text-zinc-600'}
                          ${p >= 0 ? getBorderColor(p) : ''}
                        `}
                      >
                        {p >= 0 ? `${p}%` : '—'}
                      </motion.div>
                    </td>
                  );
                })}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-3 text-xs">
        {[
          { label: '≥ 80%', cls: 'bg-emerald-500/60' },
          { label: '60–79%', cls: 'bg-amber-500/60' },
          { label: '40–59%', cls: 'bg-orange-500/60' },
          { label: '< 40%', cls: 'bg-red-500/60' },
        ].map(l => (
          <div key={l.label} className="flex items-center gap-1.5">
            <div className={`size-3 rounded ${l.cls}`} />
            <span className="text-zinc-400">{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CognitiveLevelHeatmap;
