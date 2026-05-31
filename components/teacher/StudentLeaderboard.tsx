import React, { useState, useMemo } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { Search, X, ChevronUp, ChevronDown, Medal, Star } from 'lucide-react';
import type { QuizAttempt } from './ClassOverviewStats';

interface StudentUser {
  id: string;
  name?: string;
  full_name?: string;
  email?: string;
  role?: string;
}

interface Props {
  attempts: QuizAttempt[];
  students: StudentUser[];
}

type SortKey = 'rank' | 'avgScore' | 'experimentsAttempted' | 'lastActive';
type ScoreFilter = 'all' | 'excellent' | 'good' | 'needsHelp';

const COGNITIVE_LEVELS = ['Cognitive', 'Thinking', 'Reasoning', 'Complexity', 'Cognitive Complexity'] as const;

const SUBJECTS = ['Physics', 'Chemistry', 'Biology', 'Math', 'CS'] as const;
const SUBJECT_COLORS: Record<string, string> = {
  Physics: 'text-sky-400', Chemistry: 'text-orange-400',
  Biology: 'text-purple-400', Math: 'text-blue-400', CS: 'text-pink-400',
};
const SUBJECT_BAR: Record<string, string> = {
  Physics: 'bg-sky-400', Chemistry: 'bg-orange-400',
  Biology: 'bg-purple-400', Math: 'bg-blue-400', CS: 'bg-pink-400',
};

const scoreBadge = (score: number) => {
  if (score >= 80) return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
  if (score >= 60) return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
  return 'bg-red-500/20 text-red-400 border-red-500/30';
};

const timeAgo = (iso: string): string => {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
};

const StudentLeaderboard: React.FC<Props> = ({ attempts, students }) => {
  const [search, setSearch] = useState('');
  const [subjectFilter, setSubjectFilter] = useState<string>('all');
  const [scoreFilter, setScoreFilter] = useState<ScoreFilter>('all');
  const [sortKey, setSortKey] = useState<SortKey>('rank');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir(key === 'rank' ? 'asc' : 'desc'); }
  };

  const studentStats = useMemo(() => {
    return students.map(stu => {
      const stuAttempts = attempts.filter(a => a.userId === stu.id);
      const avgScore = stuAttempts.length
        ? Math.round(stuAttempts.reduce((s, a) => s + a.score, 0) / stuAttempts.length)
        : 0;
      const experimentsAttempted = new Set(stuAttempts.map(a => a.experimentId)).size;
      const lastAttempt = stuAttempts.sort((a, b) =>
        new Date(b.attemptedAt).getTime() - new Date(a.attemptedAt).getTime()
      )[0];

      // Best/worst subject
      const subjectScores: Record<string, { total: number; count: number }> = {};
      for (const a of stuAttempts) {
        if (!subjectScores[a.subject]) subjectScores[a.subject] = { total: 0, count: 0 };
        subjectScores[a.subject].total += a.score;
        subjectScores[a.subject].count++;
      }
      const subjectAvgs = Object.entries(subjectScores).map(([sub, d]) => ({
        sub, avg: Math.round(d.total / d.count),
      }));
      const bestSub  = subjectAvgs.sort((a, b) => b.avg - a.avg)[0]?.sub ?? '—';
      const weakSub  = [...subjectAvgs].sort((a, b) => a.avg - b.avg)[0]?.sub ?? '—';

      return {
        id: stu.id,
        name: stu.name || stu.full_name || 'Unknown',
        email: stu.email || '',
        avgScore,
        experimentsAttempted,
        lastActive: lastAttempt?.attemptedAt ?? '',
        bestSub,
        weakSub,
        stuAttempts,
        subjectScores,
      };
    });
  }, [attempts, students]);

  const ranked = useMemo(() => {
    return [...studentStats].sort((a, b) => b.avgScore - a.avgScore).map((s, i) => ({ ...s, rank: i + 1 }));
  }, [studentStats]);

  const filtered = useMemo(() => {
    let list = ranked;
    if (search) list = list.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase()));
    if (subjectFilter !== 'all') list = list.filter(s => s.stuAttempts.some(a => a.subject === subjectFilter));
    if (scoreFilter === 'excellent') list = list.filter(s => s.avgScore >= 80);
    else if (scoreFilter === 'good') list = list.filter(s => s.avgScore >= 60 && s.avgScore < 80);
    else if (scoreFilter === 'needsHelp') list = list.filter(s => s.avgScore < 60);

    if (sortKey !== 'rank') {
      list = [...list].sort((a, b) => {
        const mult = sortDir === 'asc' ? 1 : -1;
        if (sortKey === 'avgScore') return (a.avgScore - b.avgScore) * mult;
        if (sortKey === 'experimentsAttempted') return (a.experimentsAttempted - b.experimentsAttempted) * mult;
        if (sortKey === 'lastActive') return (new Date(a.lastActive).getTime() - new Date(b.lastActive).getTime()) * mult;
        return 0;
      });
    }
    return list;
  }, [ranked, search, subjectFilter, scoreFilter, sortKey, sortDir]);

  const selectedStu = filtered.find(s => s.id === selectedStudent) ?? null;

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <span className="text-zinc-600 ml-1 text-xs">↕</span>;
    return <span className="text-sky-400 ml-1 text-xs">{sortDir === 'asc' ? '↑' : '↓'}</span>;
  };

  const hCls = "text-left text-xs font-semibold text-zinc-500 uppercase tracking-wide py-3 px-4 cursor-pointer hover:text-zinc-300 select-none";

  return (
    <div className="relative">
      {/* Filters row */}
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="relative flex-1 min-w-[180px] max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search students…"
            className="w-full pl-8 pr-3 py-2 bg-gray-900 border border-white/10 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-sky-500/50"
          />
        </div>
        <select
          value={subjectFilter}
          onChange={e => setSubjectFilter(e.target.value)}
          className="px-3 py-2 bg-gray-900 border border-white/10 rounded-xl text-sm text-zinc-300 focus:outline-none focus:border-sky-500/50"
        >
          <option value="all">All Subjects</option>
          {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select
          value={scoreFilter}
          onChange={e => setScoreFilter(e.target.value as ScoreFilter)}
          className="px-3 py-2 bg-gray-900 border border-white/10 rounded-xl text-sm text-zinc-300 focus:outline-none focus:border-sky-500/50"
        >
          <option value="all">All Scores</option>
          <option value="excellent">Excellent (≥ 80%)</option>
          <option value="good">Good (60–79%)</option>
          <option value="needsHelp">Needs Help (&lt; 60%)</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-gray-900 border border-white/8 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-950/60 border-b border-white/8">
              <tr>
                <th className={hCls} onClick={() => toggleSort('rank')}>Rank <SortIcon col="rank" /></th>
                <th className={hCls}>Student</th>
                <th className={hCls} onClick={() => toggleSort('experimentsAttempted')}>Exps <SortIcon col="experimentsAttempted" /></th>
                <th className={hCls} onClick={() => toggleSort('avgScore')}>Avg Score <SortIcon col="avgScore" /></th>
                <th className={`${hCls} hidden md:table-cell`}>Best Subject</th>
                <th className={`${hCls} hidden md:table-cell`}>Weakest</th>
                <th className={hCls} onClick={() => toggleSort('lastActive')}>Last Active <SortIcon col="lastActive" /></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="py-12 text-center text-zinc-500">No students match your filters.</td></tr>
              ) : filtered.map(stu => {
                const rankColors = ['border-l-amber-400', 'border-l-zinc-400', 'border-l-amber-700'];
                const rankBorderCls = stu.rank <= 3 ? rankColors[stu.rank - 1] : 'border-l-white/10';
                const medalColors = ['text-amber-400', 'text-zinc-300', 'text-amber-700'];
                return (
                  <tr
                    key={stu.id}
                    className={`border-l-2 ${rankBorderCls} border-b border-white/5 hover:bg-white/4 transition-colors cursor-pointer`}
                    onClick={() => setSelectedStudent(stu.id === selectedStudent ? null : stu.id)}
                  >
                    <td className="py-3 px-4">
                      {stu.rank <= 3
                        ? <Medal size={16} className={medalColors[stu.rank - 1]} />
                        : <span className="text-zinc-500 font-mono text-xs">#{stu.rank}</span>}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="size-8 rounded-full bg-gradient-to-br from-sky-600 to-violet-700 flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {stu.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-white font-medium text-sm">{stu.name}</div>
                          <div className="text-zinc-500 text-xs">{stu.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-zinc-300 font-mono">{stu.experimentsAttempted}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${scoreBadge(stu.avgScore)}`}>
                        {stu.avgScore}%
                      </span>
                    </td>
                    <td className={`py-3 px-4 hidden md:table-cell text-xs font-semibold ${SUBJECT_COLORS[stu.bestSub] ?? 'text-zinc-400'}`}>{stu.bestSub}</td>
                    <td className={`py-3 px-4 hidden md:table-cell text-xs ${SUBJECT_COLORS[stu.weakSub] ?? 'text-zinc-400'}`}>{stu.weakSub}</td>
                    <td className="py-3 px-4 text-zinc-500 text-xs">{stu.lastActive ? timeAgo(stu.lastActive) : '—'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over panel */}
      <AnimatePresence>
        {selectedStu && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setSelectedStudent(null)}
            />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-gray-950 border-l border-white/10 z-50 flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <div>
                  <h3 className="text-white font-bold text-lg">{selectedStu.name}</h3>
                  <p className="text-zinc-500 text-xs">{selectedStu.email}</p>
                </div>
                <button onClick={() => setSelectedStudent(null)} className="p-2 rounded-xl hover:bg-white/10 transition-colors">
                  <X size={18} className="text-zinc-400" />
                </button>
              </div>
              <div className="overflow-y-auto flex-1 p-5 space-y-6">
                {/* KPI strip */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-900 rounded-xl p-3 border border-white/8">
                    <div className="text-xl font-bold text-white">{selectedStu.avgScore}%</div>
                    <div className="text-xs text-zinc-500">Avg Score</div>
                  </div>
                  <div className="bg-gray-900 rounded-xl p-3 border border-white/8">
                    <div className="text-xl font-bold text-white">{selectedStu.experimentsAttempted}</div>
                    <div className="text-xs text-zinc-500">Experiments</div>
                  </div>
                </div>

                {/* Subject breakdown */}
                <div>
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Subject Performance</p>
                  {Object.entries(selectedStu.subjectScores).map(([sub, d]) => {
                    const avg = Math.round(d.total / d.count);
                    return (
                      <div key={sub} className="flex items-center gap-3 mb-2">
                        <div className={`text-xs font-semibold w-16 ${SUBJECT_COLORS[sub] ?? 'text-zinc-400'}`}>{sub}</div>
                        <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                          <div className={`h-full ${SUBJECT_BAR[sub] ?? 'bg-zinc-500'} opacity-80`} style={{ width: `${avg}%` }} />
                        </div>
                        <span className="text-xs text-zinc-300 font-bold w-10 text-right">{avg}%</span>
                      </div>
                    );
                  })}
                </div>

                {/* Recent attempts list */}
                <div>
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Recent Attempts</p>
                  <div className="space-y-2">
                    {selectedStu.stuAttempts
                      .sort((a, b) => new Date(b.attemptedAt).getTime() - new Date(a.attemptedAt).getTime())
                      .slice(0, 10)
                      .map(a => (
                        <div key={a.id} className="flex items-center justify-between p-3 bg-gray-900 rounded-xl border border-white/8">
                          <div>
                            <p className="text-white text-sm font-medium leading-tight">{a.experimentName}</p>
                            <p className={`text-xs ${SUBJECT_COLORS[a.subject] ?? 'text-zinc-500'}`}>{a.subject}</p>
                          </div>
                          <div className="text-right">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${scoreBadge(a.score)}`}>{a.score}%</span>
                            <p className="text-zinc-600 text-xs mt-0.5">{timeAgo(a.attemptedAt)}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudentLeaderboard;
