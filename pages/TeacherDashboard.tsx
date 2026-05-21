import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../services/AuthContext';
import { db, auth, getStudentsUnderTeacher, generateTeacherCode, saveTeacherCode, subscribeToPendingResets, logActivity } from '../services/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import GlassCard from '../components/GlassCard';
import { useNavigate, Link } from 'react-router-dom';
import { BookOpen, Users, Plus, Search, Loader2, Copy, CheckCircle2, RefreshCw, Link2, Key, Activity, BarChart3, AlertCircle } from 'lucide-react';
import { m as motion } from 'framer-motion';

const TeacherDashboard: React.FC = () => {
  const { user, profileData, role, refreshProfile } = useAuth();
  const navigate = useNavigate();

  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [classCode, setClassCode] = useState<string | null>(null);
  const [codeCopied, setCodeCopied] = useState(false);
  const [generatingCode, setGeneratingCode] = useState(false);
  const [resetRequests, setResetRequests] = useState<any[]>([]);

  // Assignment modal state
  const [showModal, setShowModal] = useState(false);
  const [assignment, setAssignment] = useState({ title: '', subject: 'Physics', grade: '2nd PUC / Class 12', dueDate: '' });

  // Load class code from profile
  useEffect(() => {
    const code = profileData?.classCode || profileData?.class_code || '';
    if (code) setClassCode(code);
  }, [profileData]);

  // Subscribe to linked students (real-time)
  useEffect(() => {
    if (!user) return;
    setLoading(true);
    const unsub = getStudentsUnderTeacher(user.uid, (data) => {
      setStudents(data);
      setLoading(false);
    });
    return () => unsub();
  }, [user]);

  // Subscribe to password reset requests
  useEffect(() => {
    const unsub = subscribeToPendingResets((reqs) => {
      setResetRequests(reqs);
    });
    return () => unsub();
  }, []);

  const handleGenerateCode = async () => {
    if (!user) return;
    setGeneratingCode(true);
    const newCode = generateTeacherCode();
    try {
      const teacherName = profileData?.name || profileData?.full_name || '';
      await saveTeacherCode(user.uid, newCode, teacherName);
      await logActivity({
        type: 'teacher_code_generated', actorUid: user.uid,
        actorName: teacherName, actorEmail: profileData?.email || '',
        actorRole: 'Teacher', metadata: { newCode }, visibility: 'admin',
      });
      setClassCode(newCode);
      await refreshProfile();
    } catch (e) {
      console.error('Failed to generate class code:', e);
      alert('Failed to save class code.');
    } finally {
      setGeneratingCode(false);
    }
  };

  const handleCopyCode = () => {
    if (classCode) {
      navigator.clipboard.writeText(classCode);
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    }
  };

  const filteredStudents = students.filter(s =>
    (s.name || s.full_name || '').toLowerCase().includes(search.toLowerCase()) ||
    (s.email || '').toLowerCase().includes(search.toLowerCase())
  );

  const teacherName = profileData?.name || profileData?.full_name || 'Teacher';
  const teacherId = profileData?.teacherId || '';
  const loginId = profileData?.loginId || profileData?.email || '';
  const institution = profileData?.institution || '';

  return (
    <div className="pt-24 pb-12 px-6 lg:px-12 max-w-7xl mx-auto min-h-screen">

      {/* HEADER */}
      <GlassCard className="p-6 md:p-8 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-purple-500/20 bg-purple-500/5 relative overflow-hidden">
        <div className="absolute -bottom-24 -left-24 size-64 bg-purple-500/10 blur-[80px] rounded-full"></div>
        <div className="flex items-center gap-4 z-10 w-full md:w-auto">
          <div className="size-14 rounded-2xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30 shrink-0">
            <BookOpen className="text-purple-400" size={28} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-semibold text-white mb-1">Teacher Dashboard</h1>
            <p className="text-sm text-purple-400/80">{teacherName}</p>
            {teacherId && <p className="text-xs text-zinc-500 font-mono">{teacherId}</p>}
            {loginId && <p className="text-xs text-zinc-500">{loginId}</p>}
            {institution && <p className="text-xs text-zinc-500">{institution}</p>}
          </div>
        </div>
        <div className="z-10 flex gap-3 w-full md:w-auto">
          <button onClick={() => setShowModal(true)} className="flex-1 md:flex-initial px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20">
            <Plus size={18} /> New Assignment
          </button>
        </div>
      </GlassCard>

      {/* CLASS CODE SECTION */}
      <GlassCard className="p-6 mb-8 border-amber-500/20 bg-amber-500/5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-xl bg-amber-500/20 flex items-center justify-center border border-amber-500/30 shrink-0">
              <Key className="text-amber-400" size={24} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white flex items-center gap-2"><Link2 size={18} className="text-amber-400" /> Class Code</h2>
              <p className="text-xs text-zinc-400 mt-0.5">Share this code with students so they can link to your class.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {classCode ? (
              <>
                <div className="flex items-center gap-2 px-5 py-3 bg-black/30 rounded-xl border border-amber-500/30">
                  <span className="font-mono text-2xl font-black tracking-[0.3em] text-amber-400">{classCode}</span>
                </div>
                <button onClick={handleCopyCode}
                  className={`px-4 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${codeCopied ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-white/10 text-white border border-white/10 hover:bg-white/20'}`}>
                  {codeCopied ? <><CheckCircle2 size={16} /> Copied!</> : <><Copy size={16} /> Copy</>}
                </button>
                <button onClick={handleGenerateCode} disabled={generatingCode}
                  className="px-4 py-3 rounded-xl bg-white/5 text-zinc-400 border border-white/10 hover:bg-white/10 hover:text-white font-bold text-sm transition-all flex items-center gap-2 disabled:opacity-50"
                  title="Regenerate code">
                  <RefreshCw size={16} className={generatingCode ? 'animate-spin' : ''} /> Regenerate
                </button>
              </>
            ) : (
              <button onClick={handleGenerateCode} disabled={generatingCode}
                className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold transition-all flex items-center gap-2 disabled:opacity-50">
                {generatingCode ? <Loader2 className="animate-spin" size={18} /> : <Key size={18} />} Generate Class Code
              </button>
            )}
          </div>
        </div>
      </GlassCard>

      {/* Password Reset Alerts */}
      {resetRequests.length > 0 && (
        <GlassCard className="p-6 mb-8 border-red-500/20 bg-red-500/5">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4"><AlertCircle size={20} className="text-red-400" /> Pending Password Reset Requests</h2>
          <div className="space-y-3">
            {resetRequests.map(req => (
              <div key={req.id} className="flex items-center justify-between p-3 rounded-xl bg-black/20 border border-red-500/10">
                <div>
                  <p className="font-bold text-white text-sm">{req.teacherName || req.teacherId}</p>
                  <p className="text-xs text-zinc-400">{req.failedAttempts} failed attempts: {new Date(req.requestedAt).toLocaleDateString()}</p>
                </div>
                <span className="text-xs font-bold text-amber-400 px-3 py-1 bg-amber-500/10 rounded-full border border-amber-500/20">Contact Admin</span>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {/* Activity Feed Widget */}
      <GlassCard className="p-6 mb-8 border-blue-500/20 bg-blue-500/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30 shrink-0"><Activity className="text-blue-400" size={24} /></div>
            <div>
              <h2 className="text-lg font-semibold text-white">Live Activity Feed</h2>
              <p className="text-xs text-zinc-400 mt-0.5">Monitor real-time student events.</p>
            </div>
          </div>
          <Link to="/teacher-activity" className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all flex items-center gap-2 text-sm">Open Live Feed</Link>
        </div>
      </GlassCard>

      {/* STUDENTS LIST */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Users className="text-purple-400" size={20} /> Linked Students ({filteredStudents.length})
        </h2>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
          <input type="text" placeholder="Search students..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500/50 text-sm" />
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          <GlassCard className="p-12 flex justify-center"><Loader2 className="animate-spin text-purple-400" size={32} /></GlassCard>
        ) : filteredStudents.length === 0 ? (
          <GlassCard className="p-12 text-center">
            <Users size={48} className="text-zinc-700 mx-auto mb-4" />
            <p className="text-zinc-400 font-bold mb-2">{classCode ? 'No students have linked to your class yet.' : 'Generate a class code to start linking students.'}</p>
            {classCode && <p className="text-zinc-500 text-sm">Share your class code <span className="font-mono text-amber-400 font-bold">{classCode}</span> with students.</p>}
          </GlassCard>
        ) : (
          filteredStudents.map(student => {
            const prog = student.progress || { physics: 0, chemistry: 0, biology: 0, math: 0, cs: 0 };
            const avgProgress = Math.round((Object.values(prog) as number[]).reduce((a, b) => a + Number(b), 0) / 5);
            const studentName = student.name || student.full_name || 'Unnamed';

            return (
              <GlassCard key={student.id} className="p-6 transition-colors hover:bg-white/5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="size-12 rounded-full bg-zinc-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
                      {studentName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">{studentName}</h3>
                      <div className="flex items-center gap-3 text-xs text-zinc-400 mt-1">
                        <span>{student.email}</span>
                        <span className="size-1 rounded-full bg-white/20"></span>
                        <span>{student.grade || 'N/A'}</span>
                        {student.studentId && <><span className="size-1 rounded-full bg-white/20"></span><span className="font-mono text-emerald-400">{student.studentId}</span></>}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 max-w-md w-full">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-zinc-400 uppercase">Average Completion</span>
                      <span className="text-xs font-mono font-bold text-purple-400">{avgProgress}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-black/30 border border-white/5 overflow-hidden mb-3">
                      <div className="h-full bg-purple-500 opacity-80" style={{ width: `${avgProgress}%` }}></div>
                    </div>
                    <div className="flex gap-1 h-1.5">
                      {Object.entries({ Phy: 'bg-emerald-500', Chem: 'bg-orange-500', Bio: 'bg-purple-500', Math: 'bg-blue-500', CS: 'bg-pink-500' }).map(([sub, color]) => {
                        const subKey = sub === 'Phy' ? 'physics' : sub === 'Chem' ? 'chemistry' : sub === 'Bio' ? 'biology' : sub === 'Math' ? 'math' : 'cs';
                        const val = Math.min(100, Math.max(0, Number(prog[subKey]) || 0));
                        return (
                          <div key={sub} className="flex-1 bg-black/30 rounded-full overflow-hidden" title={`${sub}: ${val}%`}>
                            <div className={`h-full ${color} opacity-60`} style={{ width: `${val}%` }}></div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </GlassCard>
            );
          })
        )}
      </div>

      {/* ASSIGNMENT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-zinc-900 border border-white/10 rounded-2xl p-6 shadow-2xl">
            <h2 className="text-xl font-semibold text-white mb-6">Create Assignment</h2>
            <form onSubmit={(e) => { e.preventDefault(); setShowModal(false); alert('Assignment created!'); }} className="space-y-4">
              <div>
                <span className="block text-xs font-bold text-zinc-400 uppercase mb-2">Title</span>
                <input id="assignment-title" required type="text" value={assignment.title} onChange={e => setAssignment({...assignment, title: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-purple-500/50" placeholder="e.g. Complete Titration Lab" />
              </div>
              <div>
                <span className="block text-xs font-bold text-zinc-400 uppercase mb-2">Subject</span>
                <select id="assignment-subject" value={assignment.subject} onChange={e => setAssignment({...assignment, subject: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-purple-500/50 appearance-none">
                  <option>Physics</option><option>Chemistry</option><option>Biology</option><option>Math</option><option>CS</option>
                </select>
              </div>
              <div>
                <span className="block text-xs font-bold text-zinc-400 uppercase mb-2">Due Date</span>
                <input id="assignment-due-date" required type="date" value={assignment.dueDate} onChange={e => setAssignment({...assignment, dueDate: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-purple-500/50" />
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl text-zinc-400 font-bold hover:bg-white/5 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-colors">Assign</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
