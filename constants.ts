import { Zap, FlaskConical, Dna, Calculator, Monitor } from 'lucide-react';
import { SubjectData, NavItem } from './types';
import { physicsData } from './data/physics_data';
import { chemistryData } from './data/chemistry_data';
import { biologyData } from './data/biology_data';
import { mathData } from './data/math_data';
import { csData } from './data/cs_data';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/home' },
  { label: 'Tools', path: '/tools' },
  { label: 'About', path: '/about' },
];

export const SUBJECTS: SubjectData[] = [
  physicsData,
  chemistryData,
  biologyData,
  mathData,
  csData
];

export const SUBJECT_LAB_COUNTS: Record<string, number> = {
  physics: physicsData.labs.length,
  chemistry: chemistryData.labs.length,
  biology: biologyData.labs.length,
  math: mathData.labs.length,
  cs: csData.labs.length,
};

/**
 * Find a lab experiment by its id across all subjects.
 * Returns { subject, lab } or null.
 */
export const findLabById = (labId: string | undefined) => {
  if (!labId) return null;
  for (const subject of SUBJECTS) {
    const lab = subject.labs.find(l => l.id === labId);
    if (lab) return { subject, lab };
  }
  return null;
};

/**
 * Get all lab IDs for a given subject.
 */
export const getSubjectLabIds = (subjectId: string): string[] => {
  const subject = SUBJECTS.find(s => s.id === subjectId);
  return subject ? subject.labs.map(l => l.id) : [];
};
