import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

// Extended profile type with all new fields (backwards-compatible)
export interface ProfileData {
  id: string;
  uid?: string;
  // Identity — read both name and full_name for backward compat
  name: string;
  full_name?: string;
  email: string;
  loginId?: string;
  role: 'Student' | 'Teacher' | 'Admin' | string;
  photoURL?: string;
  avatar?: string;
  // Student-specific
  studentId?: string;
  grade?: string;
  syllabus?: string;
  institution?: string;
  language?: string;
  teacherUid?: string;
  teacherCode?: string;
  teacher_code?: string; // backward compat
  // Teacher-specific
  teacherId?: string;
  profession?: string;
  classCode?: string;
  class_code?: string; // backward compat
  failedLoginAttempts?: number;
  // Progress tracking
  progress?: Record<string, number>;
  completedLabs?: string[];
  visitedLabs?: string[];
  // Streak & gamification
  streak?: number;
  lastActiveDate?: string;
  totalTimeSpent?: number;
  // Meta
  createdAt?: string;
  updatedAt?: string;
  // Legacy fields
  recent_lab_id?: string;
  recent_subject_id?: string;
  notes?: string;
  [key: string]: any; // allow additional fields
}

interface AuthContextType {
  user: User | null;
  session: any | null;
  role: string;
  profileData: ProfileData | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  role: '',
  profileData: null,
  loading: true,
  signOut: async () => {},
  refreshProfile: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState('');
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    try {
      const profilePromise = getDoc(doc(db, 'users', userId));
      const timeout = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Profile fetch timeout')), 8000);
      });
      const docSnap = await Promise.race([profilePromise, timeout]) as any;

      if (docSnap.exists()) {
        const raw = docSnap.data();
        const data: ProfileData = {
          id: docSnap.id,
          ...raw,
          // Normalize name: prefer `name`, fallback to `full_name`
          name: raw.name || raw.full_name || '',
          full_name: raw.full_name || raw.name || '',
          // Normalize class code fields
          classCode: raw.classCode || raw.class_code || '',
          class_code: raw.class_code || raw.classCode || '',
          teacherCode: raw.teacherCode || raw.teacher_code || '',
          teacher_code: raw.teacher_code || raw.teacherCode || '',
        };
        setProfileData(data);
        setRole(data.role || 'Student');
      } else {
        setRole('Student');
        setProfileData(null);
      }
    } catch (e) {
      console.error('Error fetching profile:', e);
      setRole('Student');
      setProfileData(null);
    } finally {
      setLoading(false);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.uid);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        await fetchProfile(firebaseUser.uid).catch(() => setLoading(false));
      } else {
        setUser(null);
        setRole('');
        setProfileData(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await firebaseSignOut(auth);
    } finally {
      setUser(null);
      setRole('');
      setProfileData(null);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, session: null, role, profileData, loading, signOut: handleSignOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
