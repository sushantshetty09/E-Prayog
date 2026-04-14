import { db } from './firebase';
import { doc, setDoc, getDoc, getDocs, collection, query, where } from 'firebase/firestore';

export function generateTeacherCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export const saveTeacherCode = async (uid: string, code: string) => {
  await setDoc(doc(db, 'teachers', uid), { id: uid, code }, { merge: true });
  await setDoc(doc(db, 'teacher_codes', code), { code, teacher_id: uid }, { merge: true });
  await setDoc(doc(db, 'users', uid), { teacherCode: code }, { merge: true });
};

export const resolveTeacherCode = async (code: string): Promise<string | null> => {
  const docSnap = await getDoc(doc(db, 'teacher_codes', code.toUpperCase()));
  if (docSnap.exists()) {
    return docSnap.data().teacher_id;
  }
  return null;
};

export const linkStudentToTeacher = async (studentUid: string, teacherUid: string) => {
  await setDoc(doc(db, 'users', studentUid), { teacherUid }, { merge: true });
  await setDoc(doc(db, 'teacher_students', `${teacherUid}_${studentUid}`), {
    teacher_id: teacherUid,
    student_id: studentUid,
    joined_at: new Date().toISOString()
  }, { merge: true });
};

export const getTeacherStudents = async (teacherUid: string) => {
  const q = query(
    collection(db, 'teacher_students'),
    where('teacher_id', '==', teacherUid)
  );
  const snapshot = await getDocs(q);
  if (snapshot.empty) return [];

  const studentUids = snapshot.docs.map(d => d.data().student_id);

  // Fetch each student profile
  const students: any[] = [];
  for (const uid of studentUids) {
    const studentDoc = await getDoc(doc(db, 'users', uid));
    if (studentDoc.exists()) {
      students.push({ id: studentDoc.id, ...studentDoc.data() });
    }
  }
  return students;
};
