import React, { useState, useEffect } from 'react';
import { useAuth } from '../services/AuthContext';
import { uploadProfilePhoto, updateUserData } from '../services/firebase';
import { updateProfile } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import { Loader2, CheckCircle2, User, Mail, Calendar, Save, Edit3, BookOpen, Key, Camera, Copy, Link2, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const TeacherProfile: React.FC = () => {
  const { user: authUser, loading: authLoading, profileData, role, refreshProfile } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);

  const [formData, setFormData] = useState({
    name: '', institution: '', profession: 'PUC Lecturer',
  });

  useEffect(() => {
    if (!authLoading && !authUser) navigate('/login');
    else if (profileData) {
      setFormData({
        name: profileData.name || profileData.full_name || '',
        institution: profileData.institution || '',
        profession: profileData.profession || 'PUC Lecturer',
      });
    }
  }, [authUser, authLoading, profileData]);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !authUser) return;
    setUploadingPhoto(true);
    try {
      const url = await uploadProfilePhoto(authUser.uid, file);
      await updateUserData(authUser.uid, { photoURL: url });
      await updateProfile(authUser, { photoURL: url });
      await refreshProfile();
    } catch { alert('Failed to upload photo.'); }
    finally { setUploadingPhoto(false); }
  };

  const handleSave = async () => {
    if (!authUser) return;
    setIsSaving(true);
    try {
      await updateUserData(authUser.uid, {
        name: formData.name, full_name: formData.name,
        institution: formData.institution, profession: formData.profession,
      });
      if (formData.name) await updateProfile(authUser, { displayName: formData.name });
      await refreshProfile();
      setSaveSuccess(true);
      setIsEditing(false);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch { alert('Failed to save.'); }
    finally { setIsSaving(false); }
  };

  const handleCopyCode = () => {
    const code = profileData?.classCode || profileData?.class_code;
    if (code) {
      navigator.clipboard.writeText(code);
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    }
  };

  if (authLoading) {
    return <div className="pt-24 min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-purple-500" size={40} /></div>;
  }
  
  if (!profileData) {
    return (
      <div className="pt-24 min-h-screen flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-purple-500" size={36} />
        <p className="text-zinc-400 text-sm font-medium">Setting up teacher profile…</p>
        <button onClick={() => refreshProfile()} className="mt-2 px-6 py-2.5 rounded-xl bg-purple-600/10 text-purple-400 text-sm font-bold hover:bg-purple-600/20 border border-purple-500/20 transition-all flex items-center gap-2">
          <RefreshCw size={16} /> Retry Sync
        </button>
      </div>
    );
  }

  const avatarUrl = profileData.photoURL || authUser?.photoURL || '';
  const classCode = profileData.classCode || profileData.class_code || '';
  const createdDate = authUser?.metadata?.creationTime ? new Date(authUser.metadata.creationTime).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Unknown';

  return (
    <div className="pt-24 min-h-screen pb-12 px-6 lg:px-12 max-w-4xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl lg:text-4xl font-display font-bold text-white">Teacher Profile</h1>
        {saveSuccess && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-emerald-400 bg-emerald-400/10 px-4 py-2 rounded-full border border-emerald-400/20">
            <CheckCircle2 size={18} /><span className="text-sm font-bold">Saved!</span>
          </motion.div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Identity Card */}
        <GlassCard className="flex flex-col items-center text-center p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full"></div>
          <div className="relative z-10 mb-4">
            <div className="w-32 h-32 rounded-full bg-purple-600 flex items-center justify-center text-5xl font-bold text-white shadow-xl border-4 border-white/10 overflow-hidden">
              {avatarUrl ? <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" /> : (formData.name?.charAt(0)?.toUpperCase() || <User size={48} />)}
            </div>
            <label className="absolute bottom-0 right-0 w-9 h-9 bg-purple-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-purple-500 transition-colors shadow-lg">
              {uploadingPhoto ? <Loader2 size={16} className="animate-spin text-white" /> : <Camera size={16} className="text-white" />}
              <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} disabled={uploadingPhoto} />
            </label>
          </div>

          <h2 className="text-2xl font-bold text-white mb-1 z-10">{formData.name || 'Teacher'}</h2>
          <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center gap-1 text-sm font-medium mb-2">
            <BookOpen size={14}/> Teacher
          </span>
          {profileData.teacherId && <p className="text-xs text-purple-400 font-mono z-10 mb-1">{profileData.teacherId}</p>}
          <p className="text-xs text-zinc-500 font-mono z-10 mb-4">{profileData.loginId || profileData.email}</p>

          <div className="w-full space-y-3 text-sm z-10">
            <div className="flex items-center justify-between text-zinc-400 bg-white/5 py-2 px-3 rounded-lg border border-white/5">
              <div className="flex items-center gap-2"><Mail size={16} /> Login ID</div>
              <span className="text-white font-mono text-xs truncate max-w-[180px]">{profileData.loginId || profileData.email}</span>
            </div>
            <div className="flex items-center justify-between text-zinc-400 bg-white/5 py-2 px-3 rounded-lg border border-white/5">
              <div className="flex items-center gap-2"><Calendar size={16} /> Joined</div>
              <span className="text-white">{createdDate}</span>
            </div>
          </div>

          {!isEditing && (
            <button onClick={() => setIsEditing(true)} className="mt-6 w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all flex items-center justify-center gap-2 z-10">
              <Edit3 size={18} /> Edit Profile
            </button>
          )}
        </GlassCard>

        {/* Details + Class Code */}
        <div className="flex flex-col gap-6">
          <GlassCard className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Details</h2>
              {isEditing && (
                <div className="flex gap-3">
                  <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-zinc-400 font-bold hover:text-white">Cancel</button>
                  <button onClick={handleSave} disabled={isSaving} className="px-6 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold flex items-center gap-2 disabled:opacity-50">
                    {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} Save
                  </button>
                </div>
              )}
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase mb-2">Display Name</label>
                {isEditing ? (
                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-purple-500/50" />
                ) : <div className="bg-black/20 border border-white/5 rounded-xl px-4 py-2.5 text-white">{formData.name || 'Not set'}</div>}
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase mb-2">Institution</label>
                {isEditing ? (
                  <input type="text" value={formData.institution} onChange={e => setFormData({...formData, institution: e.target.value})}
                    placeholder="College name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500/50" />
                ) : <div className="bg-black/20 border border-white/5 rounded-xl px-4 py-2.5 text-white">{formData.institution || 'Not set'}</div>}
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase mb-2">Profession</label>
                {isEditing ? (
                  <select value={formData.profession} onChange={e => setFormData({...formData, profession: e.target.value})}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-purple-500/50 appearance-none">
                    <option>PUC Lecturer</option><option>Assistant Professor</option><option>Professor</option><option>Lab Instructor</option>
                  </select>
                ) : <div className="bg-black/20 border border-white/5 rounded-xl px-4 py-2.5 text-white">{formData.profession}</div>}
              </div>
            </div>
          </GlassCard>

          {/* Class Code */}
          <GlassCard className="p-6 border-amber-500/20 bg-amber-500/5">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2"><Link2 size={18} className="text-amber-400" /> Your Class Code</h3>
            {classCode ? (
              <div className="flex items-center gap-3">
                <div className="px-5 py-3 bg-black/30 rounded-xl border border-amber-500/30">
                  <span className="font-mono text-2xl font-black tracking-[0.3em] text-amber-400">{classCode}</span>
                </div>
                <button onClick={handleCopyCode}
                  className={`px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${codeCopied ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-white/10 text-white border border-white/10 hover:bg-white/20'}`}>
                  {codeCopied ? <><CheckCircle2 size={16} /> Copied!</> : <><Copy size={16} /> Copy</>}
                </button>
              </div>
            ) : (
              <p className="text-sm text-zinc-400">No class code generated yet. Go to your Dashboard to generate one.</p>
            )}
            <p className="text-xs text-zinc-500 mt-3">Share this code with your students so they can link to your class.</p>
          </GlassCard>

          <GlassCard className="p-4 border-zinc-500/20">
            <p className="text-xs text-zinc-500 text-center">🔒 Password changes are managed by the Admin. Contact the administrator if you need to reset your password.</p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
