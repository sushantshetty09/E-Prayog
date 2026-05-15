import React, { useState, useEffect } from 'react';
import { useAuth } from '../services/AuthContext';
import { db, uploadProfilePhoto, updateUserData, resolveTeacherCode, linkStudentToTeacher, removeStudentFromClass, logActivity } from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import { Loader2, CheckCircle2, User, Mail, Shield, ShieldCheck, GraduationCap, Calendar, Save, Edit3, Settings, BookOpen, Link2, Key, Camera, Flame, FlaskConical, TrendingUp, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLang } from '../services/LanguageContext';

const AVATAR_COLORS = [
  'bg-slate-500', 'bg-red-500', 'bg-orange-500', 'bg-amber-500',
  'bg-emerald-500', 'bg-teal-500', 'bg-cyan-500', 'bg-blue-500',
  'bg-indigo-500', 'bg-violet-500', 'bg-purple-500', 'bg-pink-500'
];

const SUBJECT_COLORS: Record<string, string> = {
  physics: 'bg-emerald-500', chemistry: 'bg-orange-500', biology: 'bg-purple-500', math: 'bg-blue-500', cs: 'bg-pink-500'
};

// Module-level cache so teacher name survives tab switches
const teacherNameCache: Record<string, string> = {};

const Profile: React.FC = () => {
  const { t } = useLang();
  const { user: authUser, loading: authLoading, profileData, role, refreshProfile } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  // Teacher linking
  const [joinCode, setJoinCode] = useState('');
  const [linking, setLinking] = useState(false);
  const [linkedTeacherName, setLinkedTeacherName] = useState<string | null>(null);
  const [linkError, setLinkError] = useState('');
  const [linkSuccess, setLinkSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '', grade: 'Not Specified', syllabus: 'Not Specified',
    institution: '', language: 'English', avatar: 'bg-emerald-500',
  });

  useEffect(() => {
    if (!authLoading && !authUser) { navigate('/login'); return; }
    if (!profileData) return;

    setFormData({
      name: profileData.name || profileData.full_name || authUser?.displayName || '',
      grade: profileData.grade || 'Not Specified',
      syllabus: profileData.syllabus || 'Not Specified',
      institution: profileData.institution || '',
      language: profileData.language || 'English',
      avatar: profileData.avatar?.startsWith('bg-') ? profileData.avatar : 'bg-emerald-500',
    });

    if (profileData.teacherUid && role === 'Student') {
      // Use cache first — avoid extra Firestore fetch on every render
      if (teacherNameCache[profileData.teacherUid]) {
        setLinkedTeacherName(teacherNameCache[profileData.teacherUid]);
      } else {
        resolveLinkedTeacher(profileData.teacherUid);
      }
    }
  }, [authUser, authLoading, profileData, navigate]);

  const resolveLinkedTeacher = async (teacherUid: string) => {
    try {
      const snap = await getDoc(doc(db, 'users', teacherUid));
      if (snap.exists()) {
        const name = snap.data().name || snap.data().full_name || 'Teacher';
        teacherNameCache[teacherUid] = name; // cache so next visit is instant
        setLinkedTeacherName(name);
      }
    } catch {}
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !authUser) return;
    setUploadingPhoto(true);
    try {
      const url = await uploadProfilePhoto(authUser.uid, file);
      await updateUserData(authUser.uid, { photoURL: url });
      await updateProfile(authUser, { photoURL: url });
      await refreshProfile();
    } catch (err) {
      console.error('Photo upload failed:', err);
      alert('Failed to upload photo.');
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleJoinClass = async () => {
    if (!authUser || !joinCode.trim()) return;
    setLinking(true); setLinkError(''); setLinkSuccess(false);
    const code = joinCode.trim().toUpperCase();
    try {
      const teacher = await resolveTeacherCode(code);
      if (!teacher) { setLinkError('Invalid class code.'); return; }
      await linkStudentToTeacher(authUser.uid, teacher.uid, code, teacher.name);
      setLinkedTeacherName(teacher.name);
      setLinkSuccess(true);
      setJoinCode('');
      await logActivity({
        type: 'student_joined_class', actorUid: authUser.uid,
        actorName: profileData?.name || '', actorEmail: authUser.email || '',
        actorRole: 'Student', metadata: { teacherCode: code }, visibility: 'both',
      });
      await refreshProfile();
      setTimeout(() => setLinkSuccess(false), 3000);
    } catch (e) {
      setLinkError('Failed to link. Please try again.');
    } finally {
      setLinking(false);
    }
  };

  const handleLeaveClass = async () => {
    if (!authUser || !profileData?.teacherUid) return;
    try {
      await removeStudentFromClass(authUser.uid, profileData.teacherUid);
      setLinkedTeacherName(null);
      await refreshProfile();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async () => {
    if (!authUser) return;
    setIsSaving(true);
    try {
      await updateUserData(authUser.uid, {
        name: formData.name, full_name: formData.name,
        grade: formData.grade, syllabus: formData.syllabus,
        institution: formData.institution, language: formData.language,
        avatar: formData.avatar,
      });
      if (formData.name) await updateProfile(authUser, { displayName: formData.name });
      await refreshProfile();
      setSaveSuccess(true);
      setIsEditing(false);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (e) {
      console.error(e);
      alert('Failed to save profile.');
    } finally {
      setIsSaving(false);
    }
  };

  // Redirect teacher to their own profile page
  if (!authLoading && role === 'Teacher') { navigate('/teacher-profile', { replace: true }); return null; }

  // Still fetching auth/profile — show skeleton
  if (authLoading) {
    return (
      <div className="pt-24 min-h-screen pb-12 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="mb-8 h-10 w-48 bg-white/10 rounded-xl animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[1,2,3].map(i => (
            <div key={i} className="rounded-2xl bg-white/5 border border-white/10 h-80 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  // Auth done but no Firestore profile doc found
  if (!profileData) {
    return (
      <div className="pt-24 min-h-screen flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-emerald-500" size={36} />
        <p className="text-slate-400 text-sm">Setting up your profile…</p>
        <button onClick={() => refreshProfile()} className="mt-2 px-4 py-2 rounded-xl bg-white/10 text-white text-sm hover:bg-white/20 transition-all">
          Retry
        </button>
      </div>
    );
  }

  const avatarUrl = profileData.photoURL || authUser?.photoURL || '';
  const createdDate = authUser?.metadata?.creationTime ? new Date(authUser.metadata.creationTime).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Unknown';
  const progress = profileData.progress || { physics: 0, chemistry: 0, biology: 0, math: 0, cs: 0 };
  const completedLabs = profileData.completedLabs || [];
  const streak = profileData.streak || 0;
  const overallProgress = Math.round(Object.values(progress).reduce((a, b) => a + Number(b), 0) / 5);

  return (
    <div className="pt-24 min-h-screen pb-12 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl lg:text-4xl font-display font-bold text-white">{t.profileTitle}</h1>
        {saveSuccess && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-emerald-400 bg-emerald-400/10 px-4 py-2 rounded-full border border-emerald-400/20">
            <CheckCircle2 size={18} /><span className="text-sm font-bold">{t.profileSaved}</span>
          </motion.div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Column 1: Identity */}
        <GlassCard className="flex flex-col items-center text-center p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full"></div>
          <div className="relative z-10 mb-4">
            <div className={`w-32 h-32 rounded-full flex items-center justify-center text-5xl font-bold text-white shadow-xl shadow-black/20 border-4 border-white/10 overflow-hidden ${avatarUrl ? '' : formData.avatar}`}>
              {avatarUrl ? <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" /> : (formData.name?.charAt(0)?.toUpperCase() || <User size={48} />)}
            </div>
            <label className="absolute bottom-0 right-0 w-9 h-9 bg-emerald-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-emerald-500 transition-colors shadow-lg">
              {uploadingPhoto ? <Loader2 size={16} className="animate-spin text-white" /> : <Camera size={16} className="text-white" />}
              <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} disabled={uploadingPhoto} />
            </label>
          </div>

          {isEditing && !avatarUrl && (
            <div className="w-full mb-4 z-10">
              <p className="text-xs text-slate-400 font-bold mb-2 uppercase">{t.profileThemeColor}</p>
              <div className="flex flex-wrap justify-center gap-2">
                {AVATAR_COLORS.map(color => (
                  <button key={color} onClick={() => setFormData({...formData, avatar: color})}
                    className={`w-6 h-6 rounded-full ${color} ${formData.avatar === color ? 'ring-2 ring-white scale-110' : 'opacity-50 hover:opacity-100'} transition-all`} />
                ))}
              </div>
            </div>
          )}

          <h2 className="text-2xl font-bold text-white mb-1 z-10">{formData.name || 'E-Prayog User'}</h2>
          <div className="flex items-center gap-2 text-sm font-medium z-10 mb-2">
            {role === 'Admin' ? (
              <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 flex items-center gap-1"><ShieldCheck size={14}/> Admin</span>
            ) : (
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center gap-1"><GraduationCap size={14}/> Student</span>
            )}
          </div>
          {profileData.studentId && <p className="text-xs text-emerald-400 font-mono z-10 mb-4">{profileData.studentId}</p>}

          <div className="w-full space-y-3 text-sm z-10">
            <div className="flex items-center justify-between text-slate-400 bg-white/5 py-2 px-3 rounded-lg border border-white/5">
              <div className="flex items-center gap-2"><Mail size={16} /> {t.profileEmailLabel}</div>
              <span className="text-white truncate max-w-[150px]">{authUser?.email}</span>
            </div>
            <div className="flex items-center justify-between text-slate-400 bg-white/5 py-2 px-3 rounded-lg border border-white/5">
              <div className="flex items-center gap-2"><Shield size={16} /> {t.profileIdLabel}</div>
              <span className="text-white font-mono">{authUser?.uid?.substring(0,8)}...</span>
            </div>
            <div className="flex items-center justify-between text-slate-400 bg-white/5 py-2 px-3 rounded-lg border border-white/5">
              <div className="flex items-center gap-2"><Calendar size={16} /> {t.profileJoinedLabel}</div>
              <span className="text-white">{createdDate}</span>
            </div>
          </div>

          {!isEditing && (
            <button onClick={() => setIsEditing(true)}
              className="mt-6 w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all flex items-center justify-center gap-2 z-10">
              <Edit3 size={18} /> {t.profileEdit}
            </button>
          )}
        </GlassCard>

        {/* Column 2: Editable Details */}
        <GlassCard className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-white flex items-center gap-2"><Settings size={20} className="text-emerald-400" /> {t.profileAccountSettings}</h2>
            {isEditing && (
              <div className="flex items-center gap-3">
                <button onClick={() => { setIsEditing(false); }} className="px-4 py-2 rounded-xl text-slate-400 hover:text-white font-bold transition-colors">{t.profileCancel}</button>
                <button onClick={handleSave} disabled={isSaving} className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all flex items-center gap-2 disabled:opacity-50">
                  {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} {t.profileSave}
                </button>
              </div>
            )}
          </div>
          <div className="space-y-5">
            {[
              { label: t.profileDisplayName, key: 'name', type: 'text', placeholder: t.profileDisplayName },
              { label: t.profileInstitution, key: 'institution', type: 'text', placeholder: 'School/College' },
            ].map(field => (
              <div key={field.key}>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">{field.label}</label>
                {isEditing ? (
                  <input type={field.type} value={(formData as any)[field.key]} onChange={e => setFormData({...formData, [field.key]: e.target.value})}
                    placeholder={field.placeholder}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50" />
                ) : (
                  <div className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-2.5 text-white">{(formData as any)[field.key] || t.profileNotSet}</div>
                )}
              </div>
            ))}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">{t.profileGradeClass}</label>
              {isEditing ? (
                <select value={formData.grade} onChange={e => setFormData({...formData, grade: e.target.value})}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50 appearance-none">
                  <option>Not Specified</option><option>1st PUC / Class 11</option><option>2nd PUC / Class 12</option>
                </select>
              ) : <div className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-2.5 text-white">{formData.grade}</div>}
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">{t.profileBoardSyllabus}</label>
              {isEditing ? (
                <select value={formData.syllabus} onChange={e => setFormData({...formData, syllabus: e.target.value})}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50 appearance-none">
                  <option>Not Specified</option><option>Karnataka PUC</option><option>CBSE</option><option>ICSE</option>
                </select>
              ) : <div className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-2.5 text-white">{formData.syllabus}</div>}
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">{t.profileLanguageLabel}</label>
              {isEditing ? (
                <select value={formData.language} onChange={e => setFormData({...formData, language: e.target.value})}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50 appearance-none">
                  <option>English</option><option>Kannada</option><option>Hindi</option>
                </select>
              ) : <div className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-2.5 text-white">{formData.language}</div>}
            </div>
          </div>
        </GlassCard>

        {/* Column 3: Stats & Teacher */}
        <div className="flex flex-col gap-6">
          {/* Stats */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-bold text-white mb-4">{t.profileStats}</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
                <Flame size={24} className="text-orange-400" />
                <div><p className="text-lg font-bold text-white">{streak} day{streak !== 1 ? 's' : ''}</p><p className="text-xs text-orange-400/70">{t.profileCurrentStreak}</p></div>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <FlaskConical size={24} className="text-emerald-400" />
                <div><p className="text-lg font-bold text-white">{completedLabs.length}</p><p className="text-xs text-emerald-400/70">{t.profileLabsCompleted}</p></div>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <TrendingUp size={24} className="text-blue-400" />
                <div><p className="text-lg font-bold text-white">{overallProgress}%</p><p className="text-xs text-blue-400/70">{t.profileOverallProgress}</p></div>
              </div>
            </div>
          </GlassCard>

          {/* Teacher Section (Students only) */}
          {role === 'Student' && (
            <GlassCard className="p-6 border-amber-500/20 bg-amber-500/5">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2"><Link2 size={18} className="text-amber-400" /> {t.profileYourTeacher}</h3>
              {profileData?.teacherUid && linkedTeacherName ? (
                <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 size={20} className="text-green-400" />
                      <div>
                        <p className="text-green-300 font-bold">{linkedTeacherName}</p>
                        <p className="text-xs text-green-400/60 font-mono">Code: {profileData.teacherCode}</p>
                      </div>
                    </div>
                    <button onClick={handleLeaveClass}
                      className="px-3 py-1.5 rounded-lg bg-white/5 text-slate-400 border border-white/10 hover:bg-red-500/10 hover:text-red-400 text-xs font-bold transition-all">{t.profileLeave}</button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-xs text-slate-400 mb-3">{t.profileJoinClassHelp}</p>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                      <input type="text" maxLength={6} value={joinCode}
                        onChange={e => { setJoinCode(e.target.value.toUpperCase()); setLinkError(''); }}
                        placeholder="AB3K7M"
                        className="w-full pl-9 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-mono text-lg tracking-[0.2em] placeholder-slate-600 focus:outline-none focus:border-amber-500/50 uppercase" />
                    </div>
                    <button onClick={handleJoinClass} disabled={linking || joinCode.length < 6}
                      className="px-5 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold transition-all disabled:opacity-40 shrink-0">
                      {linking ? <Loader2 className="animate-spin" size={18} /> : <Link2 size={18} />}
                    </button>
                  </div>
                  {linkError && <p className="mt-2 text-sm text-red-400 font-bold">{linkError}</p>}
                  {linkSuccess && <p className="mt-2 text-sm text-green-400 font-bold flex items-center gap-1"><CheckCircle2 size={14} /> {t.profileLinked}</p>}
                </div>
              )}
            </GlassCard>
          )}

          {/* Subject Progress */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-bold text-white mb-4">{t.profileSubjectProgress}</h3>
            <div className="space-y-4">
              {Object.entries(progress).map(([subject, val]: [string, any]) => {
                const colorClass = SUBJECT_COLORS[subject.toLowerCase()] || 'bg-emerald-500';
                const percentage = Math.min(100, Math.max(0, parseInt(val) || 0));
                return (
                  <div key={subject}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-bold text-slate-300 capitalize">{subject}</span>
                      <span className="text-sm font-mono text-slate-400">{percentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-black/30 rounded-full overflow-hidden border border-white/5">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className={`h-full ${colorClass} opacity-80`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default Profile;
