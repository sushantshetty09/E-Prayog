import { auth, db, recalculateProgress, logActivity } from './firebase';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';

/**
 * Track first visit to a lab experiment.
 * Creates a labProgress doc and adds to visitedLabs on the user doc.
 */
export const trackLabVisit = async (
  labId: string,
  subjectId: string,
  labTitle: string
): Promise<void> => {
  if (!auth.currentUser) return;
  const uid = auth.currentUser.uid;

  try {
    const labRef = doc(db, 'labProgress', uid, 'labs', labId);
    const existing = await getDoc(labRef);

    if (!existing.exists()) {
      // First visit — create lab progress record
      await setDoc(labRef, {
        labId,
        subjectId,
        labTitle,
        status: 'visited',
        tabsCompleted: [],
        quizScore: null,
        quizTotal: null,
        quizPercentage: null,
        firstVisitedAt: new Date().toISOString(),
        completedAt: null,
        timeSpentMinutes: 0,
      });

      // Add to visitedLabs array on user doc
      await updateDoc(doc(db, 'users', uid), {
        visitedLabs: arrayUnion(labId),
      }).catch(() => {
        // If user doc doesn't have visitedLabs field yet, use setDoc merge
        setDoc(doc(db, 'users', uid), { visitedLabs: [labId] }, { merge: true });
      });

      // Log activity
      await logActivity({
        type: 'lab_visited',
        actorUid: uid,
        actorName: auth.currentUser.displayName || '',
        actorEmail: auth.currentUser.email || '',
        actorRole: 'Student',
        metadata: { labId, labTitle, subjectId },
        visibility: 'both',
      });
    }
  } catch (e) {
    console.warn('trackLabVisit error:', e);
  }
};

/**
 * Track tab completion within a lab.
 * When all required tabs are done, marks lab as completed.
 */
export const trackTabCompleted = async (
  labId: string,
  subjectId: string,
  tabId: string
): Promise<void> => {
  if (!auth.currentUser) return;
  const uid = auth.currentUser.uid;

  try {
    const labRef = doc(db, 'labProgress', uid, 'labs', labId);
    const existing = await getDoc(labRef);

    if (!existing.exists()) {
      // Create if doesn't exist (edge case)
      await setDoc(labRef, {
        labId,
        subjectId,
        labTitle: '',
        status: 'in_progress',
        tabsCompleted: [tabId],
        quizScore: null,
        quizTotal: null,
        quizPercentage: null,
        firstVisitedAt: new Date().toISOString(),
        completedAt: null,
        timeSpentMinutes: 0,
      });
      return;
    }

    await updateDoc(labRef, {
      tabsCompleted: arrayUnion(tabId),
      status: 'in_progress',
    });

    // Re-read to check if all required tabs are completed
    const REQUIRED_TABS = ['aim', 'procedure', 'simulation'];
    const snap = await getDoc(labRef);
    const tabs: string[] = snap.data()?.tabsCompleted || [];

    if (REQUIRED_TABS.every(t => tabs.includes(t))) {
      const data = snap.data();
      // Only mark completed if not already
      if (data?.status !== 'completed') {
        await updateDoc(labRef, {
          status: 'completed',
          completedAt: new Date().toISOString(),
        });

        // Add to completedLabs on user doc
        await updateDoc(doc(db, 'users', uid), {
          completedLabs: arrayUnion(labId),
        }).catch(() => {
          setDoc(doc(db, 'users', uid), { completedLabs: [labId] }, { merge: true });
        });

        // Recalculate subject progress
        await recalculateProgress(uid, subjectId);

        // Log activity
        await logActivity({
          type: 'lab_completed',
          actorUid: uid,
          actorName: auth.currentUser?.displayName || '',
          actorEmail: auth.currentUser?.email || '',
          actorRole: 'Student',
          metadata: { labId, subjectId },
          visibility: 'both',
        });
      }
    }
  } catch (e) {
    console.warn('trackTabCompleted error:', e);
  }
};

/**
 * Save quiz score in labProgress and recalculate overall progress.
 */
export const trackQuizScore = async (
  labId: string,
  subjectId: string,
  score: number,
  total: number
): Promise<void> => {
  if (!auth.currentUser) return;
  const uid = auth.currentUser.uid;

  try {
    const labRef = doc(db, 'labProgress', uid, 'labs', labId);
    await setDoc(labRef, {
      quizScore: score,
      quizTotal: total,
      quizPercentage: total > 0 ? Math.round((score / total) * 100) : 0,
      tabsCompleted: arrayUnion('quiz'),
    }, { merge: true });

    // Also save to quiz_scores collection for legacy compat
    await setDoc(doc(db, 'quiz_scores', `${uid}_${labId}`), {
      user_id: uid,
      lab_id: labId,
      score,
      total,
      completed_at: new Date().toISOString(),
    }, { merge: true });
  } catch (e) {
    console.warn('trackQuizScore error:', e);
  }
};
