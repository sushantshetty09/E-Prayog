import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, getSecondaryApp } from './firebase';
import { getAuth as getFirebaseAuth } from 'firebase/auth';

interface SeedAccount {
  email: string;
  password: string;
  role: 'Admin' | 'Teacher';
  name: string;
  loginId: string;
  extra?: Record<string, any>;
}

const SEED_ACCOUNTS: SeedAccount[] = [
  {
    email: 'admin@eprayog.com',
    password: 'Admin@123',
    role: 'Admin',
    name: 'Admin',
    loginId: 'admin@eprayog.com',
  },
  {
    email: 'teacher@eprayog.com',
    password: 'Teacher@123',
    role: 'Teacher',
    name: 'Default Teacher',
    loginId: 'teacher@eprayog.com',
    extra: {
      teacherId: 'teacher-TCH-0001',
      classCode: 'TEACH1',
      class_code: 'TEACH1',
      institution: 'E-Prayog Demo',
      profession: 'PUC Lecturer',
      failedLoginAttempts: 0,
    },
  },
];

/**
 * Idempotent seed: creates default Admin + Teacher accounts on first run.
 * Uses a secondary Firebase App instance so the current user session is never affected.
 */
export const ensureAdminExists = async (): Promise<void> => {
  for (const acct of SEED_ACCOUNTS) {
    try {
      // Quick check — if Firestore doc already exists, skip
      // We look up by email in user doc instead of UID (we don't know the UID yet)
      // So we just try creating the auth account — if it fails with email-already-in-use, skip.
      const secondaryApp = getSecondaryApp();
      const secondaryAuth = getFirebaseAuth(secondaryApp);

      let uid: string;

      try {
        const cred = await createUserWithEmailAndPassword(secondaryAuth, acct.email, acct.password);
        uid = cred.user.uid;
        console.log(`[Seed] Created ${acct.role} auth account: ${acct.email}`);
      } catch (err: any) {
        if (err.code === 'auth/email-already-in-use') {
          // Account already exists — try signing in to get uid and ensure Firestore doc
          try {
            const cred = await signInWithEmailAndPassword(secondaryAuth, acct.email, acct.password);
            uid = cred.user.uid;
          } catch {
            // Password might have been changed — skip this account
            console.log(`[Seed] ${acct.role} auth exists but password mismatch, skipping Firestore sync.`);
            await signOut(secondaryAuth).catch(() => {});
            continue;
          }
        } else {
          throw err;
        }
      }

      // Ensure Firestore doc exists (merge so we don't overwrite user edits)
      const docRef = doc(db, 'users', uid);
      const existing = await getDoc(docRef);
      if (!existing.exists()) {
        await setDoc(docRef, {
          uid,
          name: acct.name,
          full_name: acct.name,
          email: acct.email,
          loginId: acct.loginId,
          role: acct.role,
          photoURL: '',
          progress: { physics: 0, chemistry: 0, biology: 0, math: 0, cs: 0 },
          completedLabs: [],
          visitedLabs: [],
          streak: 0,
          lastActiveDate: '',
          totalTimeSpent: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          ...(acct.extra || {}),
        });
        console.log(`[Seed] Created ${acct.role} Firestore doc for ${acct.email}`);
      }

      // If teacher, also seed the teacherCodes + teachers collection
      if (acct.role === 'Teacher' && acct.extra?.classCode) {
        await setDoc(doc(db, 'teacherCodes', acct.extra.classCode), {
          teacherUid: uid,
          teacherName: acct.name,
          createdAt: new Date().toISOString(),
        }, { merge: true });
        await setDoc(doc(db, 'teachers', uid), {
          uid,
          classCode: acct.extra.classCode,
          students: [],
          createdAt: new Date().toISOString(),
        }, { merge: true });
      }

      await signOut(secondaryAuth).catch(() => {});
    } catch (e) {
      console.warn(`[Seed] Failed to seed ${acct.role}:`, e);
    }
  }
};
