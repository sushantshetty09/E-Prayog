import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getAuth as getFirebaseAuth } from 'firebase/auth';
// Use getFirestore (not initializeFirestore) for the secondary app — secondary app has no persistent cache config
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { getSecondaryApp } from './firebase';

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
    email: 'admin-admin-e-prayog@eprayog-auth.com',
    password: 'Admin@123',
    role: 'Admin',
    name: 'Admin',
    loginId: 'admin@admin.e-prayog',
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
  {
    email: 'teacher-tchr-e-prayog@eprayog-auth.com',
    password: 'Teacher@123',
    role: 'Teacher',
    name: 'Teacher',
    loginId: 'teacher@tchr.e-prayog',
    extra: {
      teacherId: 'teacher-TCH-0002',
      classCode: 'TEACH2',
      class_code: 'TEACH2',
      institution: 'E-Prayog Academy',
      profession: 'Teacher',
      failedLoginAttempts: 0,
    },
  },
];

/**
 * Idempotent seed: creates default Admin + Teacher accounts on first run.
 *
 * KEY FIX: All Firestore reads/writes use `secondaryDb` (Firestore from the
 * secondary Firebase App instance). The secondary app signs in first, so
 * request.auth is non-null and Firestore security rules pass.
 *
 * Previously this used the primary `db` which has NO authenticated user at
 * app startup — causing all Firestore writes to fail silently, meaning
 * admin/teacher profile docs were never created, so fetchProfile() returned
 * null and defaulted their role to 'Student'.
 */
export const ensureAdminExists = async (): Promise<void> => {
  for (const acct of SEED_ACCOUNTS) {
    try {
      const secondaryApp = getSecondaryApp();
      const secondaryAuth = getFirebaseAuth(secondaryApp);
      // Use secondary app's Firestore — authenticated with secondary app's signed-in user
      const secondaryDb = getFirestore(secondaryApp);

      let uid: string;

      try {
        const cred = await createUserWithEmailAndPassword(secondaryAuth, acct.email, acct.password);
        uid = cred.user.uid;
        console.log(`[Seed] Created ${acct.role} auth account: ${acct.email}`);
      } catch (err: any) {
        if (err.code === 'auth/email-already-in-use') {
          try {
            const cred = await signInWithEmailAndPassword(secondaryAuth, acct.email, acct.password);
            uid = cred.user.uid;
          } catch {
            console.log(`[Seed] ${acct.role} auth exists but password mismatch, skipping.`);
            await signOut(secondaryAuth).catch(() => {});
            continue;
          }
        } else {
          throw err;
        }
      }

      // Now secondary app IS authenticated — Firestore reads/writes will pass security rules
      const docRef = doc(secondaryDb, 'users', uid);
      const existing = await getDoc(docRef);
      const now = new Date().toISOString();

      const profileData = {
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
        updatedAt: now,
        ...(acct.extra || {}),
      };

      if (!existing.exists()) {
        await setDoc(docRef, { ...profileData, createdAt: now });
        console.log(`[Seed] Created ${acct.role} Firestore doc for ${acct.email}`);
      } else {
        // ALWAYS update to ensure role field is correct (fixes stale docs)
        const existingData = existing.data();
        if (existingData.role !== acct.role) {
          await setDoc(docRef, { ...profileData, createdAt: existingData.createdAt || now }, { merge: true });
          console.log(`[Seed] Updated ${acct.role} role for ${acct.email} (was '${existingData.role}')`);
        } else {
          console.log(`[Seed] ${acct.role} Firestore doc OK — skipping.`);
        }
      }

      // Seed teacher auxiliary collections
      if (acct.role === 'Teacher' && acct.extra?.classCode) {
        await setDoc(doc(secondaryDb, 'teacherCodes', acct.extra.classCode), {
          teacherUid: uid,
          teacherName: acct.name,
          createdAt: new Date().toISOString(),
        }, { merge: true });
        await setDoc(doc(secondaryDb, 'teachers', uid), {
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
