// ─────────────────────────────────────────────────────────────────────────────
// E-Prayog Quiz Data — Karnataka PUC Virtual Science Lab
// 46 experiments × 15 questions = 690 questions across 5 cognitive levels
// All questions imported from subject-specific files:
//   quiz_physics.ts     — 12 Physics experiments
//   quiz_chemistry.ts   — 10 Chemistry experiments
//   quiz_bio_math_cs.ts — 8 Biology + 6 Math + 6 CS experiments
// ─────────────────────────────────────────────────────────────────────────────

// ── Type Definitions ──────────────────────────────────────────────────────────

export type CognitiveLevel =
  | 'Cognitive'           // Pure recall — definitions, formulas, units
  | 'Thinking'            // Basic application — substituting values, reading graphs
  | 'Reasoning'           // Why/how — explain phenomena, identify errors
  | 'Complexity'          // Multi-step problems — calculations with 2+ steps
  | 'Cognitive Complexity'; // Synthesis/evaluation — design, predict, critique

export interface QuizQuestion {
  id: string;                                   // e.g. "vernierCalipers_q1"
  question: string;
  options: [string, string, string, string];    // Always exactly 4 options
  correctAnswer: 0 | 1 | 2 | 3;               // Index of correct option
  explanation: string;                          // 1–2 sentence explanation
  level: CognitiveLevel;
  hint?: string;                                // Optional short hint
}

// ── Physics (12 experiments) ──────────────────────────────────────────────────
import {
  vernierCalipersQuestions,
  simplePendulumQuestions,
  screwGaugeQuestions,
  ohmsLawQuestions,
  concaveMirrorQuestions,
  convexLensQuestions,
  glassPrismQuestions,
  sonometerQuestions,
  metreBridgeQuestions,
  potentiometerQuestions,
  zenerDiodeQuestions,
  hookesLawQuestions,
} from './quiz_physics';

// ── Chemistry (10 experiments) ────────────────────────────────────────────────
import {
  acidBaseTitrationQuestions,
  kmno4TitrationQuestions,
  phOfSolutionsQuestions,
  saltAnalysisQuestions,
  paperChromatographyQuestions,
  enthalpyNeutralisationQuestions,
  rateOfReactionQuestions,
  cationAnalysisQuestions,
  anionAnalysisQuestions,
  crystallisationQuestions,
} from './quiz_chemistry';

// ── Biology, Mathematics & Computer Science (24 experiments) ─────────────────
import {
  // Biology (8)
  mitosisQuestions,
  stomataQuestions,
  osmosisQuestions,
  photosynthesisQuestions,
  dnaIsolationQuestions,
  benedictTestQuestions,
  bloodGroupQuestions,
  seedGerminationQuestions,
  // Mathematics (6)
  unitCircleQuestions,
  binomialTheoremQuestions,
  statisticsQuestions,
  matrixOperationsQuestions,
  probabilityQuestions,
  conicSectionsQuestions,
  // Computer Science (6)
  bubbleSortQuestions,
  insertionSortQuestions,
  binarySearchQuestions,
  stackOperationsQuestions,
  queueOperationsQuestions,
  logicGatesQuestions,
} from './quiz_bio_math_cs';

// ── Quiz Data Map ─────────────────────────────────────────────────────────────

export const quizData: Record<string, QuizQuestion[]> = {
  // ── Physics ──────────────────────────────────────────────────────────────────
  vernierCalipers:  vernierCalipersQuestions,
  simplePendulum:   simplePendulumQuestions,
  screwGauge:       screwGaugeQuestions,
  ohmsLaw:          ohmsLawQuestions,
  concaveMirror:    concaveMirrorQuestions,
  convexLens:       convexLensQuestions,
  glassPrism:       glassPrismQuestions,
  sonometer:        sonometerQuestions,
  metreBridge:      metreBridgeQuestions,
  potentiometer:    potentiometerQuestions,
  zenerDiode:       zenerDiodeQuestions,
  hookesLaw:        hookesLawQuestions,

  // ── Chemistry ────────────────────────────────────────────────────────────────
  acidBaseTitration:    acidBaseTitrationQuestions,
  kmno4Titration:       kmno4TitrationQuestions,
  phOfSolutions:        phOfSolutionsQuestions,
  saltAnalysis:         saltAnalysisQuestions,
  paperChromatography:  paperChromatographyQuestions,
  enthalpyNeutralisation: enthalpyNeutralisationQuestions,
  rateOfReaction:       rateOfReactionQuestions,
  cationAnalysis:       cationAnalysisQuestions,
  anionAnalysis:        anionAnalysisQuestions,
  crystallisation:      crystallisationQuestions,

  // ── Biology ──────────────────────────────────────────────────────────────────
  mitosis:          mitosisQuestions,
  stomata:          stomataQuestions,
  osmosis:          osmosisQuestions,
  photosynthesis:   photosynthesisQuestions,
  dnaIsolation:     dnaIsolationQuestions,
  benedictTest:     benedictTestQuestions,
  bloodGroup:       bloodGroupQuestions,
  seedGermination:  seedGerminationQuestions,

  // ── Mathematics ──────────────────────────────────────────────────────────────
  unitCircle:       unitCircleQuestions,
  binomialTheorem:  binomialTheoremQuestions,
  statistics:       statisticsQuestions,
  matrixOperations: matrixOperationsQuestions,
  probability:      probabilityQuestions,
  conicSections:    conicSectionsQuestions,

  // ── Computer Science ─────────────────────────────────────────────────────────
  bubbleSort:       bubbleSortQuestions,
  insertionSort:    insertionSortQuestions,
  binarySearch:     binarySearchQuestions,
  stackOperations:  stackOperationsQuestions,
  queueOperations:  queueOperationsQuestions,
  logicGates:       logicGatesQuestions,
};

// ── Helper Functions ──────────────────────────────────────────────────────────

/**
 * Returns the array of QuizQuestions for a given experiment ID.
 * Returns an empty array if the experiment is not found.
 */
export const getQuizByExperiment = (experimentId: string): QuizQuestion[] => {
  return quizData[experimentId] ?? [];
};

/**
 * Returns aggregate statistics for a given experiment:
 * - total: total number of questions
 * - byLevel: count of questions per cognitive level
 */
export const getQuizStats = (experimentId: string) => {
  const questions = getQuizByExperiment(experimentId);
  const levelCounts = questions.reduce((acc, q) => {
    acc[q.level] = (acc[q.level] || 0) + 1;
    return acc;
  }, {} as Record<CognitiveLevel, number>);
  return { total: questions.length, byLevel: levelCounts };
};
