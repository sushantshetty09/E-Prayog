import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

export type ActivityEventType =
  | 'user_signup'
  | 'user_login'
  | 'user_role_changed'
  | 'student_joined_class'
  | 'student_left_class'
  | 'quiz_completed'
  | 'lab_visited'
  | 'lab_completed'
  | 'teacher_code_generated'
  | 'admin_role_change'
  | 'new_teacher_registered'
  | 'platform_feedback';

export interface ActivityEvent {
  id?: string;
  type: ActivityEventType;
  actorUid: string;
  actorName: string;
  actorEmail: string;
  actorRole: string; // 'Student' | 'Teacher' | 'Admin'
  targetUid?: string;
  targetName?: string;
  metadata: Record<string, any>;
  timestamp?: string;
  read?: boolean;
  visibility: 'admin' | 'teacher' | 'both';
}

export const logActivity = async (event: Omit<ActivityEvent, 'id' | 'timestamp' | 'read'>) => {
  try {
    await addDoc(collection(db, 'activity_feed'), {
      type: event.type,
      actorUid: event.actorUid,
      actorName: event.actorName,
      actorEmail: event.actorEmail,
      actorRole: event.actorRole,
      targetUid: event.targetUid || null,
      targetName: event.targetName || null,
      metadata: event.metadata,
      timestamp: new Date().toISOString(),
      read: false,
      visibility: event.visibility
    });
  } catch (e) {
    console.warn('Activity log failed silently:', e);
  }
};
