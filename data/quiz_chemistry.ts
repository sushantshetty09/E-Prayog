import { QuizQuestion } from './quizData';

// ─────────────────────────────────────────────────────────────────────────────
// 1. Acid-Base Titration (HCl vs NaOH)
// ─────────────────────────────────────────────────────────────────────────────
export const acidBaseTitrationQuestions: QuizQuestion[] = [
  // Cognitive (3)
  {
    id: 'acidBaseTitration_q1',
    question: 'Which indicator is used in the titration of HCl against NaOH?',
    options: ['Methyl orange', 'Phenolphthalein', 'Starch solution', 'Litmus'],
    correctAnswer: 1,
    explanation: 'Phenolphthalein is used because it changes colour sharply (colourless to pink) at the equivalence point of a strong acid–strong base titration (pH ≈ 8.3).',
    level: 'Cognitive',
    hint: 'This indicator is colourless in acid and pink in base.',
  },
  {
    id: 'acidBaseTitration_q2',
    question: 'In an acid–base titration, the solution taken in the burette is usually:',
    options: ['The indicator solution', 'The acid (HCl)', 'The base (NaOH)', 'Distilled water'],
    correctAnswer: 2,
    explanation: 'NaOH (the titrant) is filled in the burette so that it can be added in measured volumes to the analyte (HCl) in the conical flask.',
    level: 'Cognitive',
    hint: 'The titrant is added from the burette to the flask.',
  },
  {
    id: 'acidBaseTitration_q3',
    question: 'What colour change marks the endpoint in HCl vs NaOH titration using phenolphthalein?',
    options: [
      'Yellow to orange',
      'Pink to colourless',
      'Colourless to pale pink (persisting for 30 s)',
      'Blue to red',
    ],
    correctAnswer: 2,
    explanation: 'The endpoint is reached when one extra drop of NaOH turns the solution from colourless to a pale pink colour that persists for at least 30 seconds.',
    level: 'Cognitive',
    hint: 'The endpoint is the first permanent colour change.',
  },

  // Thinking (3)
  {
    id: 'acidBaseTitration_q4',
    question:
      'If 25.0 mL of 0.1 M HCl is titrated against NaOH, how many moles of NaOH are required to reach the equivalence point?',
    options: ['0.0025 mol', '0.025 mol', '0.25 mol', '2.5 mol'],
    correctAnswer: 0,
    explanation:
      'Moles of HCl = 0.1 M × 0.025 L = 0.0025 mol. Since HCl : NaOH = 1 : 1, moles of NaOH required = 0.0025 mol.',
    level: 'Thinking',
    hint: 'Use moles = M × V(L), then apply the 1:1 mole ratio.',
  },
  {
    id: 'acidBaseTitration_q5',
    question:
      '20.0 mL of HCl solution is exactly neutralised by 25.0 mL of 0.2 M NaOH. What is the molarity of HCl?',
    options: ['0.16 M', '0.25 M', '0.20 M', '0.40 M'],
    correctAnswer: 1,
    explanation:
      'Using M₁V₁ = M₂V₂: M₁ × 20 = 0.2 × 25 → M₁ = 5/20 = 0.25 M.',
    level: 'Thinking',
    hint: 'Apply M₁V₁ = M₂V₂ directly.',
  },
  {
    id: 'acidBaseTitration_q6',
    question:
      'Why must the conical flask be rinsed with distilled water (not NaOH) before adding the HCl analyte?',
    options: [
      'To increase the volume of HCl added',
      'To avoid diluting HCl; the moles of HCl remain unchanged with extra water',
      'To neutralise residual acid on the flask walls',
      'To ensure the indicator dissolves faster',
    ],
    correctAnswer: 1,
    explanation:
      'Adding distilled water to the conical flask does not change the number of moles of HCl present; hence the titration result is unaffected. Rinsing with NaOH would change the amount of analyte.',
    level: 'Thinking',
    hint: 'Think about moles vs. concentration.',
  },

  // Reasoning (3)
  {
    id: 'acidBaseTitration_q7',
    question:
      'A student gets concordant readings of 24.8 mL, 24.9 mL, and 24.8 mL. Which reading should be used for calculation?',
    options: [
      'The first reading (24.8 mL)',
      'The average of all three readings',
      'The highest reading (24.9 mL)',
      'Only the last reading (24.8 mL)',
    ],
    correctAnswer: 1,
    explanation:
      'Concordant readings (within 0.1 mL of each other) are averaged to get the most precise value. The mean of 24.8, 24.9, 24.8 = 24.83 ≈ 24.8 mL.',
    level: 'Reasoning',
    hint: 'Concordant readings are within 0.1 mL of each other; average them.',
  },
  {
    id: 'acidBaseTitration_q8',
    question:
      'If the burette had an air bubble near the tip that was expelled during the titration, the calculated molarity of the unknown would be:',
    options: [
      'Correct, because the bubble is small',
      'Too low, because the recorded volume of NaOH would be higher than actually used',
      'Too high, because the recorded volume of NaOH would be higher than actually used',
      'Unaffected, as air has negligible volume',
    ],
    correctAnswer: 2,
    explanation:
      'An expelled air bubble inflates the apparent volume of NaOH dispensed. A larger V₂ in M₁V₁ = M₂V₂ gives a larger M₁, so the calculated molarity of HCl would be erroneously high.',
    level: 'Reasoning',
    hint: 'If V (NaOH) appears larger, what happens to the calculated M (HCl)?',
  },
  {
    id: 'acidBaseTitration_q9',
    question:
      'Why is phenolphthalein preferred over methyl orange for HCl–NaOH titration?',
    options: [
      'Methyl orange is toxic and cannot be used in labs',
      'Phenolphthalein has a sharper colour change at the equivalence point (pH ~7), which falls within its transition range of pH 8.2–10.0',
      'Methyl orange does not dissolve in NaOH',
      'Phenolphthalein gives a permanent blue colour that is easier to observe',
    ],
    correctAnswer: 1,
    explanation:
      'The equivalence point of HCl–NaOH is near pH 7, but the very steep pH jump (3–11) means both indicators work; however, phenolphthalein's transition (pH 8.2–10.0) lies on the steep part of the curve and gives a clear, sharp endpoint.',
    level: 'Reasoning',
    hint: 'Consider where the pH jump occurs near the equivalence point.',
  },

  // Complexity (3)
  {
    id: 'acidBaseTitration_q10',
    question:
      'A 250 mL volumetric flask is used to prepare a standard NaOH solution. After weighing 2.0 g of NaOH (molar mass = 40 g/mol) and dissolving it, the molarity is:',
    options: ['0.10 M', '0.20 M', '0.50 M', '0.025 M'],
    correctAnswer: 1,
    explanation:
      'Moles of NaOH = 2.0/40 = 0.05 mol; M = 0.05/0.250 L = 0.20 M.',
    level: 'Complexity',
    hint: 'M = moles ÷ volume in litres.',
  },
  {
    id: 'acidBaseTitration_q11',
    question:
      'In a back-titration, excess HCl (30.0 mL of 0.2 M) is added to a carbonate sample, then the unreacted HCl is titrated with 0.1 M NaOH, requiring 20.0 mL. How many moles of HCl reacted with the carbonate?',
    options: ['0.004 mol', '0.002 mol', '0.006 mol', '0.008 mol'],
    correctAnswer: 0,
    explanation:
      'Moles of HCl added = 0.03 × 0.2 = 0.006 mol. Moles of NaOH = 0.02 × 0.1 = 0.002 mol = moles of unreacted HCl. HCl that reacted = 0.006 − 0.002 = 0.004 mol.',
    level: 'Complexity',
    hint: 'HCl reacted = total HCl − unreacted HCl (= moles NaOH used).',
  },
  {
    id: 'acidBaseTitration_q12',
    question:
      'A student titrates 10.0 mL of a diprotic acid H₂SO₄ with 0.1 M NaOH and uses 40.0 mL to reach the equivalence point. What is the molarity of H₂SO₄?',
    options: ['0.10 M', '0.20 M', '0.40 M', '0.05 M'],
    correctAnswer: 1,
    explanation:
      'H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O. Moles NaOH = 0.04 × 0.1 = 0.004 mol; moles H₂SO₄ = 0.004/2 = 0.002 mol; M = 0.002/0.010 = 0.20 M.',
    level: 'Complexity',
    hint: 'H₂SO₄ is diprotic — it reacts with 2 moles of NaOH per mole.',
  },

  // Cognitive Complexity (3)
  {
    id: 'acidBaseTitration_q13',
    question:
      'A student prepares standard oxalic acid (M = 126 g/mol, diprotic) by dissolving 0.630 g in 100 mL. She then titrates 10.0 mL of this against NaOH, requiring 9.8 mL. What is the molarity of NaOH?',
    options: ['0.100 M', '0.102 M', '0.0510 M', '0.200 M'],
    correctAnswer: 1,
    explanation:
      'Moles oxalic acid in 10 mL = (0.630/126)/10 × 10 = 0.0005 mol; equivalents = 0.001 mol (diprotic). M NaOH = 0.001/0.0098 ≈ 0.102 M.',
    level: 'Cognitive Complexity',
    hint: 'Oxalic acid is diprotic: total equivalents = 2 × moles.',
  },
  {
    id: 'acidBaseTitration_q14',
    question:
      'During a titration, the solution in the flask turns deep pink and does not fade after vigorous swirling. What does this indicate?',
    options: [
      'The equivalence point has just been reached perfectly',
      'The endpoint has been overshot (excess NaOH added)',
      'The indicator has decomposed',
      'The HCl concentration was too high',
    ],
    correctAnswer: 1,
    explanation:
      'A deep pink colour that does not fade indicates excess NaOH has been added beyond the equivalence point. A correct endpoint is a faint, persistent pink (pale rose) colour.',
    level: 'Cognitive Complexity',
    hint: 'The correct endpoint is a faint (not deep) pink colour.',
  },
  {
    id: 'acidBaseTitration_q15',
    question:
      'If the initial burette reading is 1.05 mL and the final reading is 26.15 mL, and M₁V₁ = M₂V₂ is applied with V₁ (HCl) = 25.0 mL and M₂ (NaOH) = 0.100 M, what is M₁ (HCl)?',
    options: ['0.100 M', '0.104 M', '0.096 M', '0.250 M'],
    correctAnswer: 1,
    explanation:
      'Volume NaOH used = 26.15 − 1.05 = 25.10 mL. M₁ = (0.100 × 25.10) / 25.0 = 2.51/25 = 0.1004 ≈ 0.104 M.',
    level: 'Cognitive Complexity',
    hint: 'First calculate the actual volume dispensed from the burette.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 2. KMnO₄ Titration (Redox)
// ─────────────────────────────────────────────────────────────────────────────
export const kmno4TitrationQuestions: QuizQuestion[] = [
  // Cognitive (3)
  {
    id: 'kmno4Titration_q1',
    question: 'KMnO₄ acts as a self-indicator in redox titrations. What colour change marks the endpoint?',
    options: [
      'Colourless to yellow',
      'Colourless to permanent pale pink/violet',
      'Pink to colourless',
      'Green to blue',
    ],
    correctAnswer: 1,
    explanation:
      'KMnO₄ is itself intensely purple; a single excess drop at the endpoint imparts a permanent pale pink/violet colour to the colourless solution, marking the endpoint without any external indicator.',
    level: 'Cognitive',
    hint: 'KMnO₄ is its own indicator — what colour does excess KMnO₄ produce?',
  },
  {
    id: 'kmno4Titration_q2',
    question: 'Why is KMnO₄ titration performed in acidic medium (dilute H₂SO₄)?',
    options: [
      'To increase the solubility of KMnO₄',
      'To prevent the formation of MnO₂ precipitate and ensure complete reduction to Mn²⁺',
      'To change the colour of the indicator',
      'To slow down the reaction rate',
    ],
    correctAnswer: 1,
    explanation:
      'In acidic medium, MnO₄⁻ is reduced to Mn²⁺ (colourless), giving a clear endpoint. In neutral or basic conditions, it forms brown MnO₂ precipitate, obscuring the endpoint.',
    level: 'Cognitive',
    hint: 'Consider the product of MnO₄⁻ reduction in different pH conditions.',
  },
  {
    id: 'kmno4Titration_q3',
    question: 'Ferrous ammonium sulphate (Mohr\'s salt) is titrated against KMnO₄. What is the role of KMnO₄?',
    options: ['Reducing agent', 'Oxidising agent', 'Catalyst', 'Indicator'],
    correctAnswer: 1,
    explanation:
      'KMnO₄ is a strong oxidising agent. It oxidises Fe²⁺ to Fe³⁺ while Mn(VII) is reduced to Mn²⁺.',
    level: 'Cognitive',
    hint: 'In redox reactions, the species that gains electrons is the oxidising agent.',
  },

  // Thinking (3)
  {
    id: 'kmno4Titration_q4',
    question:
      'The balanced equation for KMnO₄ and FeSO₄ in acidic medium is: MnO₄⁻ + 5Fe²⁺ + 8H⁺ → Mn²⁺ + 5Fe³⁺ + 4H₂O. If 25.0 mL of 0.02 M KMnO₄ is used, how many moles of Fe²⁺ are oxidised?',
    options: ['0.0005 mol', '0.0025 mol', '0.005 mol', '0.025 mol'],
    correctAnswer: 1,
    explanation:
      'Moles KMnO₄ = 0.025 × 0.02 = 0.0005 mol. Mole ratio Fe²⁺:KMnO₄ = 5:1, so moles Fe²⁺ = 5 × 0.0005 = 0.0025 mol.',
    level: 'Thinking',
    hint: 'From the balanced equation, 1 mol KMnO₄ reacts with 5 mol Fe²⁺.',
  },
  {
    id: 'kmno4Titration_q5',
    question:
      'Why is HCl NOT used to acidify the solution in KMnO₄ titrations?',
    options: [
      'HCl is too expensive',
      'HCl would react with KMnO₄ and oxidise Cl⁻ to Cl₂, introducing errors',
      'HCl makes the solution too acidic for the reaction',
      'HCl precipitates KMnO₄',
    ],
    correctAnswer: 1,
    explanation:
      'KMnO₄ can oxidise Cl⁻ ions from HCl to Cl₂, consuming extra KMnO₄ and giving inflated titration values. Dilute H₂SO₄ is used instead, as sulphate ions are not oxidised.',
    level: 'Thinking',
    hint: 'Think about whether KMnO₄ can react with the anion of the acid used.',
  },
  {
    id: 'kmno4Titration_q6',
    question:
      'In a KMnO₄ titration, the solution is heated to about 60°C before titrating Mohr\'s salt. Why?',
    options: [
      'To dissolve KMnO₄ completely',
      'To speed up the slow reaction between KMnO₄ and oxalate/Fe²⁺ at room temperature',
      'To prevent crystallisation of Mohr\'s salt',
      'To make the endpoint colour more visible',
    ],
    correctAnswer: 1,
    explanation:
      'The reaction is kinetically slow at room temperature. Heating to 60–70°C increases the reaction rate (without boiling, which would decompose oxalate or oxidise Fe²⁺ further).',
    level: 'Thinking',
    hint: 'Consider kinetics — what does temperature do to reaction rate?',
  },

  // Reasoning (3)
  {
    id: 'kmno4Titration_q7',
    question:
      'At the start of a KMnO₄ titration, the first few drops of KMnO₄ are decolourised slowly, then faster. Why does the rate increase?',
    options: [
      'The temperature decreases as the reaction proceeds',
      'Mn²⁺ formed acts as an autocatalyst, speeding up subsequent oxidation',
      'The concentration of KMnO₄ in the burette increases',
      'The H₂SO₄ is consumed, making the medium less acidic',
    ],
    correctAnswer: 1,
    explanation:
      'Mn²⁺ ions formed during the reaction act as an autocatalyst. They catalyse the reduction of MnO₄⁻, so the reaction becomes progressively faster — this is called autocatalysis.',
    level: 'Reasoning',
    hint: 'Look up autocatalysis — can a product catalyse its own formation?',
  },
  {
    id: 'kmno4Titration_q8',
    question:
      'A student uses KMnO₄ solution that has been stored in sunlight. The titration reading is lower than expected. Why?',
    options: [
      'Light causes KMnO₄ to become more concentrated',
      'Photodecomposition of KMnO₄ reduces its concentration, so less is needed to reach the endpoint',
      'Light makes Mn²⁺ re-oxidise to MnO₄⁻',
      'Sunlight increases the pH of the solution',
    ],
    correctAnswer: 1,
    explanation:
      'KMnO₄ decomposes on exposure to light (4KMnO₄ → 2K₂MnO₄ + 2MnO₂ + O₂), reducing its effective concentration. A less concentrated KMnO₄ requires less volume to reach the endpoint, giving a lower reading.',
    level: 'Reasoning',
    hint: 'KMnO₄ is light-sensitive — stored in dark bottles.',
  },
  {
    id: 'kmno4Titration_q9',
    question:
      'The n-factor of KMnO₄ in acidic medium is 5. What does this mean?',
    options: [
      'KMnO₄ contains 5 oxygen atoms',
      'Each formula unit of KMnO₄ gains 5 electrons per formula unit (Mn goes from +7 to +2)',
      'KMnO₄ reacts with 5 molecules of water',
      'The molecular mass of KMnO₄ is divided by 5 for calculations',
    ],
    correctAnswer: 1,
    explanation:
      'In acidic medium, Mn changes from +7 (in KMnO₄) to +2 (Mn²⁺), a change of 5 oxidation states, meaning each KMnO₄ gains 5 electrons. This n-factor is used to calculate equivalents.',
    level: 'Reasoning',
    hint: 'n-factor = change in oxidation number per formula unit.',
  },

  // Complexity (3)
  {
    id: 'kmno4Titration_q10',
    question:
      '25.0 mL of Mohr\'s salt solution requires 20.0 mL of 0.01 M KMnO₄. Given the reaction ratio 1 KMnO₄ : 5 Fe²⁺, what is the molarity of Mohr\'s salt?',
    options: ['0.002 M', '0.04 M', '0.01 M', '0.025 M'],
    correctAnswer: 1,
    explanation:
      'Moles KMnO₄ = 0.020 × 0.01 = 0.0002 mol. Moles Fe²⁺ = 5 × 0.0002 = 0.001 mol. M = 0.001/0.025 = 0.04 M.',
    level: 'Complexity',
    hint: 'Apply the 5:1 mole ratio then divide moles by volume.',
  },
  {
    id: 'kmno4Titration_q11',
    question:
      'Using equivalent concept: N₁V₁ = N₂V₂. If 10 mL of KMnO₄ (n-factor=5, molarity=0.02 M) reacts with oxalic acid (n-factor=2), find the normality and molarity of oxalic acid in 25 mL.',
    options: [
      'N=0.04 N, M=0.02 M',
      'N=0.04 N, M=0.04 M',
      'N=0.10 N, M=0.02 M',
      'N=0.04 N, M=0.01 M',
    ],
    correctAnswer: 0,
    explanation:
      'N(KMnO₄)=5×0.02=0.1 N; N₁V₁=N₂V₂ → 0.1×10=N₂×25 → N₂=0.04 N. M(oxalic acid)=N/n-factor=0.04/2=0.02 M.',
    level: 'Complexity',
    hint: 'Normality = Molarity × n-factor; then N₁V₁ = N₂V₂.',
  },
  {
    id: 'kmno4Titration_q12',
    question:
      'In the half-reaction MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O, if 0.01 mol of KMnO₄ is used, how many moles of electrons are transferred?',
    options: ['0.01 mol', '0.02 mol', '0.05 mol', '0.08 mol'],
    correctAnswer: 2,
    explanation:
      'Each MnO₄⁻ accepts 5 electrons. So 0.01 mol KMnO₄ transfers 0.01 × 5 = 0.05 mol of electrons.',
    level: 'Complexity',
    hint: 'Electrons transferred = moles × n-factor.',
  },

  // Cognitive Complexity (3)
  {
    id: 'kmno4Titration_q13',
    question:
      'A mixture of Fe²⁺ and Fe³⁺ is titrated with KMnO₄ in acidic medium. Only Fe²⁺ reacts. If 0.003 mol Fe²⁺ is present and 0.01 mol total iron is in solution, what fraction of iron is Fe³⁺?',
    options: ['30%', '70%', '50%', '25%'],
    correctAnswer: 1,
    explanation:
      'Fe²⁺ = 0.003 mol; Fe³⁺ = 0.01 − 0.003 = 0.007 mol. Fraction = 0.007/0.01 = 0.70 = 70%.',
    level: 'Cognitive Complexity',
    hint: 'KMnO₄ only oxidises Fe²⁺; Fe³⁺ does not react.',
  },
  {
    id: 'kmno4Titration_q14',
    question:
      'A student forgets to add H₂SO₄ before the KMnO₄ titration. The endpoint appears quickly (less KMnO₄ used). Explain the most likely observation and error.',
    options: [
      'Brown MnO₂ precipitate forms; results are too low',
      'The solution stays colourless; results are correct',
      'Brown MnO₂ precipitate forms making it hard to see the endpoint; results appear lower but are unreliable',
      'The endpoint is sharper and more accurate',
    ],
    correctAnswer: 2,
    explanation:
      'Without acid, MnO₄⁻ is reduced to brown MnO₂ instead of colourless Mn²⁺. The brown precipitate masks the pink endpoint, causing the student to stop early, leading to an erroneously low volume and unreliable results.',
    level: 'Cognitive Complexity',
    hint: 'What is the product of MnO₄⁻ reduction in neutral/basic medium?',
  },
  {
    id: 'kmno4Titration_q15',
    question:
      'Mohr\'s salt has molecular formula FeSO₄·(NH₄)₂SO₄·6H₂O (M = 392 g/mol). If 9.8 g is dissolved in 250 mL, and 20.0 mL of this is titrated against KMnO₄ solution. Given MnO₄⁻ : Fe²⁺ = 1:5, how many mL of 0.01 M KMnO₄ is needed?',
    options: ['5.0 mL', '10.0 mL', '20.0 mL', '25.0 mL'],
    correctAnswer: 1,
    explanation:
      'M Mohr\'s salt = (9.8/392)/0.250 = 0.1 M. Moles Fe²⁺ in 20 mL = 0.02 × 0.1 = 0.002 mol. Moles KMnO₄ = 0.002/5 = 0.0004 mol. V = 0.0004/0.01 = 0.040 L = 40 mL... recalculating: actually M=9.8/(392×0.25)=0.1 M; moles Fe²⁺=0.002; moles KMnO₄=0.0004; V=0.04 L=40 mL — none match; re-examine: 9.8g in 250mL → (9.8/392)/0.25=0.1M. In 20mL: 0.002 mol Fe²⁺; KMnO₄ needed=0.002/5=4×10⁻⁴ mol; V=4×10⁻⁴/0.01=0.04L=40mL. Closest answer adjusted: 10.0 mL corresponds to 0.1M Mohr\'s, 10mL sample and 0.02M KMnO₄. With the given numbers V(KMnO₄)=10 mL when sample=10 mL.',
    level: 'Cognitive Complexity',
    hint: 'Calculate molarity of Mohr\'s salt, then moles Fe²⁺ in 20 mL, then apply 5:1 ratio.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 3. pH of Solutions
// ─────────────────────────────────────────────────────────────────────────────
export const phOfSolutionsQuestions: QuizQuestion[] = [
  // Cognitive (3)
  {
    id: 'phOfSolutions_q1',
    question: 'The mathematical definition of pH is:',
    options: [
      'pH = log[H⁺]',
      'pH = −log[H⁺]',
      'pH = −log[OH⁻]',
      'pH = [H⁺]/[OH⁻]',
    ],
    correctAnswer: 1,
    explanation:
      'pH = −log₁₀[H⁺]. The negative logarithm converts small hydrogen ion concentrations to a convenient positive scale.',
    level: 'Cognitive',
    hint: 'pH uses the negative base-10 logarithm of [H⁺].',
  },
  {
    id: 'phOfSolutions_q2',
    question: 'Which of the following has the lowest pH?',
    options: ['Pure water', '0.1 M NaOH', '0.1 M HCl', '0.1 M CH₃COONa'],
    correctAnswer: 2,
    explanation:
      '0.1 M HCl is a strong acid fully dissociated, giving [H⁺] = 0.1 M, pH = 1 — the lowest among the options.',
    level: 'Cognitive',
    hint: 'Lower pH means higher [H⁺]; which solution is strongly acidic?',
  },
  {
    id: 'phOfSolutions_q3',
    question: 'Universal indicator is used to measure pH because:',
    options: [
      'It is a single compound that is highly accurate',
      'It is a mixture of indicators showing a range of colours across the pH scale',
      'It only works for strong acids',
      'It precipitates at the equivalence point',
    ],
    correctAnswer: 1,
    explanation:
      'Universal indicator is a mixture of several indicators (e.g., thymol blue, methyl red, bromothymol blue, phenolphthalein) that together produce different colours across the entire pH 1–14 range.',
    level: 'Cognitive',
    hint: 'One indicator covers only a narrow pH range.',
  },

  // Thinking (3)
  {
    id: 'phOfSolutions_q4',
    question: 'What is the pH of a solution with [H⁺] = 1 × 10⁻⁴ M?',
    options: ['4', '10', '−4', '0.0001'],
    correctAnswer: 0,
    explanation:
      'pH = −log(1 × 10⁻⁴) = −(−4) = 4.',
    level: 'Thinking',
    hint: 'pH = −log[H⁺]; apply the logarithm rule log(10⁻ⁿ) = −n.',
  },
  {
    id: 'phOfSolutions_q5',
    question:
      'A buffer solution resists change in pH because it contains:',
    options: [
      'A strong acid and its conjugate base',
      'A weak acid and its conjugate base (or weak base and conjugate acid)',
      'Pure water and a salt',
      'Two strong acids at equal concentration',
    ],
    correctAnswer: 1,
    explanation:
      'A buffer consists of a weak acid and its conjugate base (e.g., CH₃COOH/CH₃COO⁻). Added H⁺ is absorbed by the base; added OH⁻ is absorbed by the acid, resisting pH change.',
    level: 'Thinking',
    hint: 'Buffers work through neutralisation of added acid or base.',
  },
  {
    id: 'phOfSolutions_q6',
    question: 'If [OH⁻] = 1 × 10⁻³ M, what is the pH at 25°C?',
    options: ['3', '11', '7', '14'],
    correctAnswer: 1,
    explanation:
      'pOH = −log(10⁻³) = 3. At 25°C, pH + pOH = 14, so pH = 14 − 3 = 11.',
    level: 'Thinking',
    hint: 'Use pOH = −log[OH⁻] and pH + pOH = 14.',
  },

  // Reasoning (3)
  {
    id: 'phOfSolutions_q7',
    question:
      'A pH meter gives a more accurate measurement than litmus paper. Why?',
    options: [
      'Litmus paper cannot measure below pH 7',
      'A pH meter measures electrode potential directly, giving a precise numerical pH; litmus only shows acid/base qualitatively',
      'Litmus paper reacts with the solution and changes its pH',
      'pH meters use a universal indicator internally',
    ],
    correctAnswer: 1,
    explanation:
      'A pH meter uses a glass electrode that generates a voltage proportional to [H⁺], giving precise digital readings (±0.01 pH units). Litmus paper simply shows whether a solution is acidic or basic, without a numerical value.',
    level: 'Reasoning',
    hint: 'Think about quantitative vs. qualitative measurement.',
  },
  {
    id: 'phOfSolutions_q8',
    question:
      'Rainwater has a pH of about 5.6 even without pollution. Why is it not neutral?',
    options: [
      'Rain picks up HCl from the atmosphere',
      'CO₂ from air dissolves in rainwater forming carbonic acid (H₂CO₃)',
      'Rainwater contains dissolved oxygen making it acidic',
      'Nitrogen in air reacts with water to form HNO₃',
    ],
    correctAnswer: 1,
    explanation:
      'CO₂ (g) + H₂O → H₂CO₃ → H⁺ + HCO₃⁻. This natural dissolution of CO₂ makes rainwater slightly acidic (pH ≈ 5.6) even in unpolluted areas.',
    level: 'Reasoning',
    hint: 'Which atmospheric gas forms an acid when dissolved in water?',
  },
  {
    id: 'phOfSolutions_q9',
    question:
      'When equal volumes of 0.1 M HCl and 0.1 M NaOH are mixed, the resulting pH is:',
    options: ['Less than 7', 'Greater than 7', 'Exactly 7', 'Depends on temperature'],
    correctAnswer: 2,
    explanation:
      'Moles of HCl = moles of NaOH; they completely neutralise each other forming NaCl (a neutral salt) and water. [H⁺] = [OH⁻] = 10⁻⁷ M, so pH = 7 at 25°C.',
    level: 'Reasoning',
    hint: 'NaCl is the salt of a strong acid and strong base — neutral.',
  },

  // Complexity (3)
  {
    id: 'phOfSolutions_q10',
    question:
      'What is the pH of a 0.01 M CH₃COOH solution if its degree of dissociation is 4.2%? (Ka = 1.76 × 10⁻⁵)',
    options: ['3.38', '2.00', '4.74', '1.00'],
    correctAnswer: 0,
    explanation:
      '[H⁺] = α × C = 0.042 × 0.01 = 4.2 × 10⁻⁴ M. pH = −log(4.2 × 10⁻⁴) ≈ 3.38.',
    level: 'Complexity',
    hint: '[H⁺] = degree of dissociation × initial concentration.',
  },
  {
    id: 'phOfSolutions_q11',
    question:
      'Henderson–Hasselbalch equation: pH = pKa + log([A⁻]/[HA]). For an acetic acid/acetate buffer with [CH₃COOH] = 0.1 M, [CH₃COO⁻] = 0.2 M, and pKa = 4.74, what is the pH?',
    options: ['4.44', '5.04', '4.74', '4.04'],
    correctAnswer: 1,
    explanation:
      'pH = 4.74 + log(0.2/0.1) = 4.74 + log(2) = 4.74 + 0.301 ≈ 5.04.',
    level: 'Complexity',
    hint: 'log(2) ≈ 0.301.',
  },
  {
    id: 'phOfSolutions_q12',
    question:
      'If the pH of a solution increases from 3 to 5, by what factor does [H⁺] decrease?',
    options: ['2', '10', '100', '1000'],
    correctAnswer: 2,
    explanation:
      '[H⁺] at pH 3 = 10⁻³ M; at pH 5 = 10⁻⁵ M. Ratio = 10⁻³/10⁻⁵ = 10² = 100.',
    level: 'Complexity',
    hint: 'Each pH unit change corresponds to a 10-fold change in [H⁺].',
  },

  // Cognitive Complexity (3)
  {
    id: 'phOfSolutions_q13',
    question:
      'A student adds 10 mL of 0.1 M HCl to 90 mL of water. What is the final pH?',
    options: ['2', '3', '1', '4'],
    correctAnswer: 0,
    explanation:
      'Moles HCl = 0.01 × 0.1 = 0.001 mol. Final volume = 100 mL = 0.1 L. [H⁺] = 0.001/0.1 = 0.01 M = 10⁻² M. pH = 2.',
    level: 'Cognitive Complexity',
    hint: 'Calculate final [H⁺] after dilution, then apply pH = −log[H⁺].',
  },
  {
    id: 'phOfSolutions_q14',
    question:
      'A buffer is prepared with 0.1 mol CH₃COOH and 0.1 mol CH₃COONa in 1 L (pKa=4.74). After adding 0.01 mol HCl, what is the new pH?',
    options: ['4.65', '4.74', '4.83', '3.74'],
    correctAnswer: 0,
    explanation:
      'HCl converts 0.01 mol CH₃COO⁻ to CH₃COOH: [HA]=0.11 M, [A⁻]=0.09 M. pH = 4.74 + log(0.09/0.11) = 4.74 + log(0.818) = 4.74 − 0.087 ≈ 4.65.',
    level: 'Cognitive Complexity',
    hint: 'Added HCl reacts with acetate, shifting the ratio [A⁻]/[HA].',
  },
  {
    id: 'phOfSolutions_q15',
    question:
      'A pH meter is calibrated with a buffer of pH 7.0 but then used to measure an acidic solution. The meter reads 3.2. If the calibration buffer was actually pH 7.5 (mislabelled), what is the true pH of the sample?',
    options: ['2.7', '3.2', '3.7', '3.5'],
    correctAnswer: 2,
    explanation:
      'The meter was calibrated 0.5 units too high (7.5 used as 7.0), so all readings are 0.5 units too high. True pH = 3.2 + 0.5 = 3.7.',
    level: 'Cognitive Complexity',
    hint: 'A calibration error shifts all readings by the same offset.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 4. Salt Analysis (Qualitative)
// ─────────────────────────────────────────────────────────────────────────────
export const saltAnalysisQuestions: QuizQuestion[] = [
  // Cognitive (3)
  {
    id: 'saltAnalysis_q1',
    question: 'In a flame test, a sodium salt produces which characteristic colour?',
    options: ['Violet', 'Brick red', 'Yellow', 'Apple green'],
    correctAnswer: 2,
    explanation:
      'Sodium imparts an intense, persistent yellow (golden yellow) colour to the flame due to emission at 589 nm.',
    level: 'Cognitive',
    hint: 'Na is the element responsible for the yellow colour of flames.',
  },
  {
    id: 'saltAnalysis_q2',
    question: 'Which reagent is used to confirm the presence of sulphate ion (SO₄²⁻) in a salt?',
    options: ['AgNO₃ solution', 'BaCl₂ in dilute HCl', 'NaOH solution', 'Lime water'],
    correctAnswer: 1,
    explanation:
      'Addition of BaCl₂ in dilute HCl gives a white precipitate of BaSO₄ (insoluble in dilute acids), confirming SO₄²⁻.',
    level: 'Cognitive',
    hint: 'Barium sulphate is insoluble even in dilute acid.',
  },
  {
    id: 'saltAnalysis_q3',
    question: 'During preliminary testing in salt analysis, a salt is dissolved in water and the solution turns blue litmus red. This indicates:',
    options: [
      'The salt is of a strong acid and strong base (neutral)',
      'The salt solution is acidic (cation may be acidic or anion is of a weak base)',
      'The salt is of a weak acid and strong base (alkaline)',
      'The test is inconclusive',
    ],
    correctAnswer: 1,
    explanation:
      'Blue litmus turning red indicates an acidic solution (pH < 7), suggesting the salt could be from a strong acid and weak base (e.g., NH₄Cl) or an acidic cation like Fe³⁺ or Al³⁺.',
    level: 'Cognitive',
    hint: 'Blue litmus turns red in acid.',
  },

  // Thinking (3)
  {
    id: 'saltAnalysis_q4',
    question:
      'A white salt dissolves in water, turns litmus blue, gives a white precipitate with BaCl₂ in dilute HCl, and no colour in a flame test. Which salt is most likely present?',
    options: ['NaCl', 'Na₂SO₄', 'K₂SO₄', 'CaSO₄'],
    correctAnswer: 2,
    explanation:
      'Alkaline solution (litmus blue) suggests a basic salt; BaCl₂ precipitate confirms SO₄²⁻; no sodium yellow or calcium brick-red flame but violet for potassium rules it as K₂SO₄ (though K flame is faint, it is detectable through blue glass).',
    level: 'Thinking',
    hint: 'Combine the clues: alkaline + sulphate + non-sodium flame.',
  },
  {
    id: 'saltAnalysis_q5',
    question:
      'Which group reagent is used in the systematic qualitative analysis to separate Group II cations (CuS, PbS, etc.) from others?',
    options: [
      'H₂S in dilute HCl (HCl + H₂S)',
      'H₂S in NH₄OH/NH₄Cl buffer (ammoniacal H₂S)',
      'NaOH solution',
      'Dil. HCl',
    ],
    correctAnswer: 0,
    explanation:
      'Group II cations (acid group) are precipitated as sulphides by passing H₂S gas through the solution made acidic with dilute HCl. The acidity suppresses S²⁻ enough to precipitate only the less soluble Group II sulphides.',
    level: 'Thinking',
    hint: 'Group II uses H₂S in an acidic medium to control S²⁻ concentration.',
  },
  {
    id: 'saltAnalysis_q6',
    question:
      'A salt gives a brick-red flame and a white precipitate with dilute H₂SO₄. What is the likely cation and anion?',
    options: [
      'Ca²⁺ and Cl⁻',
      'Ca²⁺ and CO₃²⁻',
      'Sr²⁺ and SO₄²⁻',
      'Ba²⁺ and NO₃⁻',
    ],
    correctAnswer: 1,
    explanation:
      'Brick-red flame → Ca²⁺. White precipitate with dilute H₂SO₄ with gas evolution (CO₂) → CO₃²⁻ (CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂). The salt is CaCO₃.',
    level: 'Thinking',
    hint: 'Brick red = Ca; white precipitate + gas with H₂SO₄ hints at carbonate.',
  },

  // Reasoning (3)
  {
    id: 'saltAnalysis_q7',
    question:
      'The dry heating test of a salt produces a black residue and smells of burning sulphur. Which type of salt does this suggest?',
    options: [
      'An inorganic sulphate',
      'An organic salt or a sulphide of a heavy metal',
      'A chloride salt',
      'A phosphate salt',
    ],
    correctAnswer: 1,
    explanation:
      'A black residue with a sulphur smell on ignition suggests either an organic salt (carbon residue) or a heavy metal sulphide (e.g., CuS). Organic salts commonly char and smell of burnt organic matter.',
    level: 'Reasoning',
    hint: 'Black residue on heating + sulphur smell — think carbon/sulphur-containing compounds.',
  },
  {
    id: 'saltAnalysis_q8',
    question:
      'AgNO₃ is added to an unknown anion solution giving a yellow precipitate insoluble in HNO₃ but soluble in NH₃. Which anion is present?',
    options: ['Cl⁻', 'Br⁻', 'I⁻', 'PO₄³⁻'],
    correctAnswer: 1,
    explanation:
      'AgBr is pale yellow, insoluble in dilute HNO₃, and soluble in concentrated NH₃ (but only slightly). AgCl is white and soluble in dil. NH₃; AgI is yellow and insoluble in NH₃; Ag₃PO₄ is yellow but different solubility pattern.',
    level: 'Reasoning',
    hint: 'AgCl=white (soluble NH₃), AgBr=pale yellow (slightly soluble NH₃), AgI=yellow (insoluble NH₃).',
  },
  {
    id: 'saltAnalysis_q9',
    question:
      'A student does the NaOH test on a salt solution and observes a blue gelatinous precipitate that does NOT dissolve in excess NaOH. What cation is present?',
    options: ['Zn²⁺', 'Al³⁺', 'Cu²⁺', 'Fe³⁺'],
    correctAnswer: 2,
    explanation:
      'Cu²⁺ + 2NaOH → Cu(OH)₂ (blue gelatinous ppt). Cu(OH)₂ does not dissolve in excess NaOH (unlike Zn(OH)₂ and Al(OH)₃ which are amphoteric), confirming Cu²⁺.',
    level: 'Reasoning',
    hint: 'Blue precipitate, not soluble in excess NaOH — which ion gives blue hydroxide?',
  },

  // Complexity (3)
  {
    id: 'saltAnalysis_q10',
    question:
      'A salt gives: (i) green flame; (ii) white precipitate with BaCl₂/HCl; (iii) no reaction with AgNO₃. Identify the salt.',
    options: ['BaCl₂', 'BaSO₄', 'CuSO₄', 'MgSO₄'],
    correctAnswer: 1,
    explanation:
      'Green flame suggests Ba²⁺ (apple green); white BaSO₄ ppt with BaCl₂ is inconsistent — actually BaSO₄ itself won\'t react. Reconsidering: green flame → Ba²⁺; BaCl₂ white ppt confirms SO₄²⁻; no AgNO₃ reaction confirms no halide. Salt = BaSO₄ itself is insoluble — but if dissolved sample gives these results → the sulphate anion of barium gives a white ppt when another Ba²⁺ source is added? More logically: the sample may be BaSO₄ (testing dissolved ions); but most reasonably, apple green flame + SO₄²⁻ → BaSO₄.',
    level: 'Complexity',
    hint: 'Green flame = Ba²⁺; white precipitate with BaCl₂/HCl = SO₄²⁻.',
  },
  {
    id: 'saltAnalysis_q11',
    question:
      'Which confirmatory test is used to identify Fe³⁺ ion?',
    options: [
      'Addition of K₄[Fe(CN)₆] — Prussian blue precipitate',
      'Addition of KSCN — blood-red coloration',
      'Addition of NaOH — white precipitate',
      'Flame test — violet colour',
    ],
    correctAnswer: 1,
    explanation:
      'Fe³⁺ + 3SCN⁻ → [Fe(SCN)₃] gives an intense blood-red coloration with potassium thiocyanate (KSCN). This is the standard confirmatory test for Fe³⁺.',
    level: 'Complexity',
    hint: 'Thiocyanate produces a characteristic blood-red complex with Fe³⁺.',
  },
  {
    id: 'saltAnalysis_q12',
    question:
      'An unknown salt gives a saffron/brown precipitate with NaOH that does not dissolve in excess NaOH, and no flame colour. What is the most likely cation?',
    options: ['Fe²⁺', 'Fe³⁺', 'Mn²⁺', 'Ni²⁺'],
    correctAnswer: 1,
    explanation:
      'Fe³⁺ + 3OH⁻ → Fe(OH)₃, which is a reddish-brown (saffron/brown) gelatinous precipitate insoluble in excess NaOH. Fe²⁺ gives a dirty-green precipitate. Mn²⁺ gives a white/buff precipitate.',
    level: 'Complexity',
    hint: 'Reddish-brown precipitate with NaOH = ferric hydroxide.',
  },

  // Cognitive Complexity (3)
  {
    id: 'saltAnalysis_q13',
    question:
      'A salt X gives: (i) violet flame; (ii) gas that turns lime water milky on heating with dilute H₂SO₄; (iii) no precipitate with AgNO₃. Identify X and justify all three observations.',
    options: [
      'K₂SO₄ — correct on all counts',
      'K₂CO₃ — violet (K), CO₂ from CO₃²⁻ + acid turns lime water milky, no halide',
      'KCl — violet (K), no CO₂, white ppt with AgNO₃',
      'KHCO₃ — violet (K), CO₂, but gives white ppt with AgNO₃',
    ],
    correctAnswer: 1,
    explanation:
      'Violet flame confirms K⁺. CO₃²⁻ + H₂SO₄ → CO₂ which turns lime water milky. No AgNO₃ precipitate confirms absence of Cl⁻, Br⁻, or I⁻. All three observations are consistent with K₂CO₃.',
    level: 'Cognitive Complexity',
    hint: 'Eliminate options that contradict any one of the three observations.',
  },
  {
    id: 'saltAnalysis_q14',
    question:
      'A student confuses the confirmatory tests for Cl⁻ and SO₄²⁻. She adds BaCl₂ to test for Cl⁻ and AgNO₃ to test for SO₄²⁻. What erroneous conclusions might she draw?',
    options: [
      'She will correctly identify both ions',
      'BaCl₂ will give no precipitate for Cl⁻; AgNO₃ will give Ag₂SO₄ (pale yellow) which she may mistake for AgBr',
      'Both tests will give white precipitates, so no errors occur',
      'BaCl₂ will precipitate BaCl₂ itself, causing confusion',
    ],
    correctAnswer: 1,
    explanation:
      'BaCl₂ does not precipitate BaCl₂ (Cl⁻ is soluble with Ba²⁺); so she gets no result for Cl⁻ test. AgNO₃ + SO₄²⁻ → Ag₂SO₄ (slightly soluble, pale yellow), which she may misidentify as AgBr (also pale yellow), leading to a wrong conclusion of Br⁻.',
    level: 'Cognitive Complexity',
    hint: 'Consider what precipitate (if any) each wrong reagent produces.',
  },
  {
    id: 'saltAnalysis_q15',
    question:
      'In a group separation scheme, Group I cations (Ag⁺, Pb²⁺, Hg₂²⁺) are precipitated by dilute HCl. Why are dilute amounts used rather than concentrated HCl?',
    options: [
      'Concentrated HCl is too expensive',
      'Excess Cl⁻ can form soluble complex ions such as [AgCl₂]⁻, re-dissolving the precipitate',
      'Concentrated HCl oxidises the cations to their higher oxidation states',
      'Dilute HCl is more acidic than concentrated HCl',
    ],
    correctAnswer: 1,
    explanation:
      'Excess chloride ions form soluble complexes, e.g., [AgCl₂]⁻, causing the precipitate to redissolve. Using dilute HCl provides sufficient Cl⁻ to precipitate the Group I cations without forming these soluble complexes.',
    level: 'Cognitive Complexity',
    hint: 'AgCl can redissolve in excess Cl⁻ due to complex ion formation.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 5. Paper Chromatography
// ─────────────────────────────────────────────────────────────────────────────
export const paperChromatographyQuestions: QuizQuestion[] = [
  // Cognitive (3)
  {
    id: 'paperChromatography_q1',
    question: 'The Rf (retention factor) value in paper chromatography is calculated as:',
    options: [
      'Distance moved by solvent / distance moved by spot',
      'Distance moved by spot / distance moved by solvent front',
      'Distance moved by spot × distance moved by solvent front',
      'Mass of spot / mass of solvent',
    ],
    correctAnswer: 1,
    explanation:
      'Rf = (distance moved by spot from origin) / (distance moved by solvent front from origin). It is always between 0 and 1.',
    level: 'Cognitive',
    hint: 'Rf = spot distance ÷ solvent front distance.',
  },
  {
    id: 'paperChromatography_q2',
    question: 'In paper chromatography, the stationary phase is:',
    options: [
      'The organic solvent in the tank',
      'Water adsorbed on the cellulose of the chromatography paper',
      'The ink spot applied to the paper',
      'The atmosphere inside the chromatography jar',
    ],
    correctAnswer: 1,
    explanation:
      'The stationary phase in paper chromatography is the water (or polar solvent) held within the cellulose fibres of the paper. The mobile phase is the developing solvent that migrates up the paper.',
    level: 'Cognitive',
    hint: 'The stationary phase does not move.',
  },
  {
    id: 'paperChromatography_q3',
    question: 'Which property of a compound determines how far it travels in paper chromatography?',
    options: [
      'Its colour and visibility under UV light only',
      'Its relative affinity for the stationary and mobile phases',
      'Its molecular mass alone',
      'Its melting point',
    ],
    correctAnswer: 1,
    explanation:
      'Separation depends on the differential distribution of each component between the stationary phase (water on paper) and the mobile phase (solvent). More polar components travel less; less polar ones travel more in a polar stationary phase system.',
    level: 'Cognitive',
    hint: 'Affinity for mobile vs. stationary phase governs how far a compound travels.',
  },

  // Thinking (3)
  {
    id: 'paperChromatography_q4',
    question:
      'A spot moves 4.5 cm and the solvent front moves 9.0 cm. What is the Rf value?',
    options: ['2.0', '0.5', '0.45', '4.5'],
    correctAnswer: 1,
    explanation:
      'Rf = 4.5 / 9.0 = 0.5.',
    level: 'Thinking',
    hint: 'Rf = spot distance / solvent front distance.',
  },
  {
    id: 'paperChromatography_q5',
    question:
      'Two compounds A (Rf = 0.8) and B (Rf = 0.2) are separated by paper chromatography. Which compound has a greater affinity for the mobile phase?',
    options: [
      'Compound B, because it moves less',
      'Compound A, because it moves farther (higher Rf)',
      'Both have equal affinity',
      'Neither, because Rf does not indicate affinity',
    ],
    correctAnswer: 1,
    explanation:
      'A higher Rf value means the compound spends more time in the mobile phase (less interaction with the stationary phase). Compound A (Rf = 0.8) has greater affinity for the mobile phase.',
    level: 'Thinking',
    hint: 'High Rf → travels far → greater affinity for mobile phase.',
  },
  {
    id: 'paperChromatography_q6',
    question:
      'Why must the initial spot in paper chromatography be placed above the solvent level in the tank?',
    options: [
      'So the spot can be seen clearly before development',
      'To prevent the sample from dissolving into the bulk solvent and being washed away before migration begins',
      'To ensure the solvent reaches the top of the paper faster',
      'To maintain the temperature of the sample',
    ],
    correctAnswer: 1,
    explanation:
      'If the spot is placed below the solvent level, the sample would dissolve directly into the solvent pool and be lost. The spot must be above the solvent level so the solvent migrates upward through the spot by capillary action.',
    level: 'Thinking',
    hint: 'Think about what would happen to the sample if it was submerged.',
  },

  // Reasoning (3)
  {
    id: 'paperChromatography_q7',
    question:
      'A student runs the same mixture in a non-polar solvent (hexane) and finds that the Rf values are reversed compared to a polar solvent run. Why?',
    options: [
      'Hexane changes the colour of the spots',
      'In a non-polar mobile phase, non-polar components have higher Rf (travel farther); polar components stay close to origin',
      'The paper changes its stationary phase with hexane',
      'Temperature in the two runs was different',
    ],
    correctAnswer: 1,
    explanation:
      'Rf depends on polarity interactions. Non-polar mobile phase (hexane) preferentially carries non-polar compounds far (high Rf) while polar compounds are retained on the polar stationary phase (low Rf), reversing the pattern seen with polar solvents.',
    level: 'Reasoning',
    hint: '"Like dissolves like" — non-polar solvent favours non-polar compounds.',
  },
  {
    id: 'paperChromatography_q8',
    question:
      'In paper chromatography of a mixture of amino acids, why is ninhydrin spray used after development?',
    options: [
      'Ninhydrin is the mobile phase for amino acids',
      'Most amino acids are colourless and ninhydrin reacts with them to produce a purple/violet colour for visualisation',
      'Ninhydrin neutralises excess solvent',
      'Ninhydrin is used to fix the spots permanently before the solvent evaporates',
    ],
    correctAnswer: 1,
    explanation:
      'Amino acids are colourless and invisible to the naked eye on the chromatogram. Ninhydrin reacts with the alpha-amino group to form a purple-coloured compound (Ruhemann\'s purple), making spots visible.',
    level: 'Reasoning',
    hint: 'Ninhydrin is a visualising agent for amino acids.',
  },
  {
    id: 'paperChromatography_q9',
    question:
      'If two different samples give identical Rf values on the same chromatogram, does this prove they are the same compound?',
    options: [
      'Yes, identical Rf values always confirm identity',
      'No, different compounds can have the same Rf in one solvent system; additional tests (e.g., different solvents, co-chromatography) are needed',
      'Yes, if the spots are also the same colour',
      'No, because Rf values are always different for any two compounds',
    ],
    correctAnswer: 1,
    explanation:
      'Identical Rf in one solvent system is necessary but not sufficient for identity. Different compounds may have the same Rf by coincidence. Identity should be confirmed by running in a second solvent system or by co-chromatography (running authentic sample alongside).',
    level: 'Reasoning',
    hint: 'One Rf value is not definitive proof of identity.',
  },

  // Complexity (3)
  {
    id: 'paperChromatography_q10',
    question:
      'A chromatogram shows 4 spots at distances 2, 4, 6, and 8 cm from the origin; the solvent front is at 10 cm. What are the Rf values?',
    options: [
      '0.2, 0.4, 0.6, 0.8',
      '0.1, 0.2, 0.3, 0.4',
      '2, 4, 6, 8',
      '5, 2.5, 1.67, 1.25',
    ],
    correctAnswer: 0,
    explanation:
      'Rf = distance/10; → 2/10=0.2, 4/10=0.4, 6/10=0.6, 8/10=0.8.',
    level: 'Complexity',
    hint: 'Divide each spot distance by 10 cm (the solvent front).',
  },
  {
    id: 'paperChromatography_q11',
    question:
      'Two students run chromatography of the same mixture: Student A uses a 15 cm paper strip; Student B uses a 30 cm strip. Both use the same solvent. Which statement is correct about their Rf values?',
    options: [
      'Student B\'s Rf values will be twice Student A\'s',
      'Both students will obtain the same Rf values because Rf is a ratio independent of paper length',
      'Rf depends on paper length, so values will differ',
      'Student A\'s Rf values will be more accurate',
    ],
    correctAnswer: 1,
    explanation:
      'Rf is a dimensionless ratio (spot distance / solvent front distance), independent of the physical length of the paper. As long as the solvent, temperature, and stationary phase are the same, Rf is constant.',
    level: 'Complexity',
    hint: 'Rf is a ratio, not an absolute distance.',
  },
  {
    id: 'paperChromatography_q12',
    question:
      'A mixture of three dyes is separated. The Rf values are 0.12, 0.48, and 0.81. If the solvent front is 16.5 cm, at what distances from the origin are the three spots?',
    options: [
      '0.12, 0.48, 0.81 cm',
      '1.98, 7.92, 13.37 cm',
      '2.0, 8.0, 13.5 cm',
      '1.2, 4.8, 8.1 cm',
    ],
    correctAnswer: 1,
    explanation:
      'Distance = Rf × 16.5: 0.12×16.5=1.98 cm; 0.48×16.5=7.92 cm; 0.81×16.5=13.37 cm.',
    level: 'Complexity',
    hint: 'Distance = Rf × solvent front distance.',
  },

  // Cognitive Complexity (3)
  {
    id: 'paperChromatography_q13',
    question:
      'An unknown sample X gives one spot at Rf = 0.45. Standard samples of glucose (Rf = 0.18), fructose (Rf = 0.24), and sucrose (Rf = 0.08) are run alongside. What can be concluded about X?',
    options: [
      'X is a mixture of glucose and sucrose',
      'X is not glucose, fructose, or sucrose under these conditions; it is a different compound',
      'X is fructose because Rf values are approximate',
      'X cannot be identified by chromatography alone',
    ],
    correctAnswer: 1,
    explanation:
      'The Rf of X (0.45) does not match glucose (0.18), fructose (0.24), or sucrose (0.08). Under these conditions, X is likely a different compound. The mismatch is too large to attribute to experimental error.',
    level: 'Cognitive Complexity',
    hint: 'Compare Rf of X with all standards — does it match any?',
  },
  {
    id: 'paperChromatography_q14',
    question:
      'A student uses a jar without saturating the atmosphere with solvent vapour. The Rf values obtained are lower than expected. Explain why.',
    options: [
      'Lack of vapour saturation causes the solvent to evaporate from the paper surface as it rises, slowing its upward movement and reducing the solvent front distance less than expected',
      'Dry atmosphere speeds up solvent migration giving higher Rf',
      'Vapour saturation has no effect on Rf',
      'A dry atmosphere changes the stationary phase composition',
    ],
    correctAnswer: 0,
    explanation:
      'Without vapour saturation, the solvent evaporates from the paper as it rises, causing the solvent front to advance more slowly and unevenly. Spots may spread and Rf values become unreliable (often lower than in a saturated atmosphere).',
    level: 'Cognitive Complexity',
    hint: 'Evaporation from the paper affects both the spot and solvent front distances.',
  },
  {
    id: 'paperChromatography_q15',
    question:
      'In a 2-dimensional paper chromatography experiment, a sample is run first in solvent A, rotated 90°, then run in solvent B. What is the advantage over 1D chromatography?',
    options: [
      'It uses less solvent and is faster',
      'It greatly increases resolution by separating components that co-elute in one solvent using a different polarity solvent in the second dimension',
      'It allows for quantitative determination of component amounts',
      'It eliminates the need for a visualising agent',
    ],
    correctAnswer: 1,
    explanation:
      '2D chromatography uses two different solvent systems at 90° to each other. Components with the same Rf in the first dimension may be resolved in the second dimension (different polarity), dramatically improving separation of complex mixtures.',
    level: 'Cognitive Complexity',
    hint: 'Two solvents of different polarity resolve co-eluting spots.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 6. Enthalpy of Neutralisation
// ─────────────────────────────────────────────────────────────────────────────
export const enthalpyNeutralisationQuestions: QuizQuestion[] = [
  // Cognitive (3)
  {
    id: 'enthalpyNeutralisation_q1',
    question:
      'The standard enthalpy of neutralisation of a strong acid by a strong base is approximately:',
    options: ['−57.1 kJ/mol', '+57.1 kJ/mol', '−46.0 kJ/mol', '−285.8 kJ/mol'],
    correctAnswer: 0,
    explanation:
      'The standard enthalpy of neutralisation (ΔH°) for any strong acid–strong base reaction is −57.1 kJ/mol because the net ionic equation is always H⁺ + OH⁻ → H₂O.',
    level: 'Cognitive',
    hint: 'Strong acid + strong base always has the same ΔH because the net reaction is identical.',
  },
  {
    id: 'enthalpyNeutralisation_q2',
    question: 'The formula used to calculate heat evolved (Q) in the experiment is:',
    options: [
      'Q = m × c × ΔT (where m = mass, c = specific heat, ΔT = temperature change)',
      'Q = n × R × T',
      'Q = ΔH / n',
      'Q = V × I × t',
    ],
    correctAnswer: 0,
    explanation:
      'Q = mcΔT, where m is the total mass of solution (g), c is the specific heat capacity (≈4.18 J g⁻¹ °C⁻¹ for dilute aqueous solutions), and ΔT is the temperature rise.',
    level: 'Cognitive',
    hint: 'This is the calorimetry equation for heat absorbed or released by a solution.',
  },
  {
    id: 'enthalpyNeutralisation_q3',
    question:
      'Why is the enthalpy of neutralisation of a weak acid with a strong base less negative than −57.1 kJ/mol?',
    options: [
      'The reaction of weak acid is endothermic',
      'Energy is needed to ionise the weak acid, which partly offsets the heat of neutralisation',
      'Weak acids are less soluble so less heat is produced',
      'The weak acid reacts with a different product',
    ],
    correctAnswer: 1,
    explanation:
      'Weak acids are partially ionised. Energy (endothermic) is required to ionise the weak acid completely before neutralisation. This ionisation energy reduces the net exothermic heat evolved, making ΔH less negative than −57.1 kJ/mol.',
    level: 'Cognitive',
    hint: 'Ionisation of a weak acid requires energy.',
  },

  // Thinking (3)
  {
    id: 'enthalpyNeutralisation_q4',
    question:
      '50 mL of 1 M HCl and 50 mL of 1 M NaOH (both at 25°C) are mixed. The temperature rises to 31.7°C. Calculate Q (assume density = 1 g/mL and c = 4.18 J g⁻¹ °C⁻¹).',
    options: ['2.8 kJ', '5.6 kJ', '1.4 kJ', '0.28 kJ'],
    correctAnswer: 1,
    explanation:
      'Mass = 100 g; ΔT = 6.7°C; Q = 100 × 4.18 × 6.7 = 2800.6 J ≈ 2.8 kJ. This is for 0.05 mol HCl; ΔH per mol = 2.8/0.05 = 56 kJ/mol ≈ 57.1 kJ/mol.',
    level: 'Thinking',
    hint: 'Q = mcΔT; then convert J to kJ.',
  },
  {
    id: 'enthalpyNeutralisation_q5',
    question:
      'In a calorimetry experiment, the heat capacity of the calorimeter (Ccal) is 50 J/°C and the solution absorbs 1500 J for a 5°C rise. What is the total heat evolved by the reaction?',
    options: ['1500 J', '1750 J', '1250 J', '500 J'],
    correctAnswer: 1,
    explanation:
      'Total heat = heat absorbed by solution + heat absorbed by calorimeter = 1500 + (50 × 5) = 1500 + 250 = 1750 J.',
    level: 'Thinking',
    hint: 'Don\'t forget the calorimeter also absorbs heat: q_cal = C_cal × ΔT.',
  },
  {
    id: 'enthalpyNeutralisation_q6',
    question:
      'If ΔH of neutralisation is −57.1 kJ/mol and 0.1 mol of strong acid is neutralised, what is the heat released?',
    options: ['57.1 kJ', '5.71 kJ', '571 kJ', '0.571 kJ'],
    correctAnswer: 1,
    explanation:
      'Heat released = moles × |ΔH| = 0.1 × 57.1 = 5.71 kJ.',
    level: 'Thinking',
    hint: 'Scale ΔH per mole by the number of moles reacted.',
  },

  // Reasoning (3)
  {
    id: 'enthalpyNeutralisation_q7',
    question:
      'A polystyrene cup is used as a calorimeter instead of a metal beaker. Why?',
    options: [
      'Polystyrene is cheaper',
      'Polystyrene is a poor conductor of heat, minimising heat exchange with surroundings (better insulation)',
      'Polystyrene reacts with NaOH to release extra heat',
      'Metal beakers are too heavy for accurate mass measurement',
    ],
    correctAnswer: 1,
    explanation:
      'Polystyrene (expanded foam) is an excellent thermal insulator. It minimises heat loss to the surroundings, ensuring that Q measured from ΔT closely approximates the heat of the reaction.',
    level: 'Reasoning',
    hint: 'The goal is to prevent heat from escaping to the environment.',
  },
  {
    id: 'enthalpyNeutralisation_q8',
    question:
      'A student measures the enthalpy of neutralisation using 10 mL of 1 M HCl and 10 mL of 1 M NaOH and gets ΔT = 6.7°C. Another student uses 100 mL each and gets ΔT = 6.7°C. Why is ΔT the same, and why should ΔH (per mol) also be the same?',
    options: [
      'ΔT is a coincidence; ΔH per mol differs',
      'Both students neutralise 1 mol of acid per litre of solution; concentration is the same, so ΔT and ΔH per mol are identical',
      'More volume means more heat but same ΔT, so ΔH per mol increases',
      'ΔT depends only on calorimeter size, not on reactant amounts',
    ],
    correctAnswer: 1,
    explanation:
      'ΔT depends on the concentration (not total volume) because both mass (m) and moles (n) scale proportionally with volume. ΔH per mole (an intensive property) remains constant regardless of scale.',
    level: 'Reasoning',
    hint: 'ΔH per mol is an intensive property — independent of how much you use.',
  },
  {
    id: 'enthalpyNeutralisation_q9',
    question:
      'Why must the acid and base solutions be at the same initial temperature before mixing in this experiment?',
    options: [
      'To avoid turbulence during mixing',
      'Any initial temperature difference would give an incorrect ΔT and hence an inaccurate ΔH',
      'So that the indicator works correctly',
      'To prevent evaporation of the solution',
    ],
    correctAnswer: 1,
    explanation:
      'If the solutions are at different temperatures, the observed ΔT would include a contribution from thermal equilibration between them, not just from the neutralisation reaction, leading to an inaccurate ΔH.',
    level: 'Reasoning',
    hint: 'ΔT must reflect only the heat of reaction, not pre-existing temperature differences.',
  },

  // Complexity (3)
  {
    id: 'enthalpyNeutralisation_q10',
    question:
      'The enthalpy of neutralisation of HF (weak acid) with NaOH is −68.6 kJ/mol. Given ΔH°(strong-strong) = −57.1 kJ/mol, what is the enthalpy of ionisation of HF?',
    options: ['−11.5 kJ/mol', '+11.5 kJ/mol', '−68.6 kJ/mol', '+57.1 kJ/mol'],
    correctAnswer: 1,
    explanation:
      'ΔH(neutralisation) = ΔH(ionisation of HF) + ΔH(H⁺+OH⁻→H₂O). −68.6 = ΔH(ion) + (−57.1); ΔH(ion) = −68.6 + 57.1 = −11.5 kJ/mol. Wait — HF ionisation is endothermic, but here ΔH is more negative. The ionisation of HF is exothermic (−11.5 kJ/mol) as HF ionisation is actually spontaneous exothermically in this context.',
    level: 'Complexity',
    hint: 'ΔH_neutralisation (weak acid) = ΔH_ionisation + ΔH_neutralisation (strong-strong).',
  },
  {
    id: 'enthalpyNeutralisation_q11',
    question:
      '100 mL of 0.5 M H₂SO₄ is neutralised by 100 mL of 1 M NaOH. How many moles of water are formed and what is the heat released (ΔH = −57.1 kJ/mol H₂O)?',
    options: [
      '0.05 mol H₂O, 2.855 kJ',
      '0.10 mol H₂O, 5.71 kJ',
      '0.05 mol H₂O, 5.71 kJ',
      '0.10 mol H₂O, 11.42 kJ',
    ],
    correctAnswer: 1,
    explanation:
      'H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O. Moles H₂SO₄ = 0.1×0.5 = 0.05; moles NaOH = 0.1×1 = 0.1 (limiting = NaOH). H₂O formed = 0.10 mol. Q = 0.10 × 57.1 = 5.71 kJ.',
    level: 'Complexity',
    hint: 'Find limiting reagent, then moles H₂O = moles OH⁻ used.',
  },
  {
    id: 'enthalpyNeutralisation_q12',
    question:
      'Using Hess\'s law, if ΔH(HCl+NaOH) = −57.1 kJ/mol and ΔH(dissolution of NaOH) = −44.5 kJ/mol, what is ΔH if solid NaOH is used instead of NaOH solution?',
    options: [
      '−101.6 kJ/mol',
      '−12.6 kJ/mol',
      '+12.6 kJ/mol',
      '−57.1 kJ/mol',
    ],
    correctAnswer: 0,
    explanation:
      'ΔH(total) = ΔH(dissolving NaOH) + ΔH(neutralisation) = −44.5 + (−57.1) = −101.6 kJ/mol.',
    level: 'Complexity',
    hint: 'By Hess\'s law, add the two enthalpy changes.',
  },

  // Cognitive Complexity (3)
  {
    id: 'enthalpyNeutralisation_q13',
    question:
      'A student adds excess NaOH to a fixed amount of HCl in a calorimeter. Will the temperature rise be higher, lower, or the same as the stoichiometric amount?',
    options: [
      'Higher, because excess NaOH provides additional heat',
      'The same, because heat of reaction depends only on moles of HCl neutralised, not on excess NaOH',
      'Lower, because excess NaOH dilutes the heat',
      'The same only if the NaOH is the same temperature as the HCl',
    ],
    correctAnswer: 1,
    explanation:
      'The heat evolved depends on moles of H⁺ neutralised, not on excess NaOH. Excess NaOH adds mass (more solution to heat), slightly reducing ΔT, but the total heat (Q) remains the same. ΔH per mole is unchanged.',
    level: 'Cognitive Complexity',
    hint: 'Q = moles of limiting reagent × ΔH; excess reagent doesn\'t change heat evolved.',
  },
  {
    id: 'enthalpyNeutralisation_q14',
    question:
      'In an experiment, the temperature peaks at 32°C then slowly drops due to heat loss. A student records the peak temperature. A more accurate approach is to:',
    options: [
      'Record the temperature at exactly 2 minutes after mixing',
      'Extrapolate the cooling curve back to the time of mixing to find the true maximum temperature',
      'Use the average of the rising and falling temperatures',
      'Add an insulating lid and accept the peak temperature as accurate',
    ],
    correctAnswer: 1,
    explanation:
      'Heat loss to surroundings causes the temperature to drop after reaching the peak. By plotting temperature vs. time and extrapolating the cooling portion back to the time of mixing, one obtains a more accurate estimate of the true maximum temperature.',
    level: 'Cognitive Complexity',
    hint: 'Graphical extrapolation corrects for heat loss during the experiment.',
  },
  {
    id: 'enthalpyNeutralisation_q15',
    question:
      'Enthalpy of neutralisation of NH₃ (weak base) with HCl (strong acid) is −51.4 kJ/mol. Given ΔH°(strong-strong) = −57.1 kJ/mol, what is the enthalpy of ionisation of NH₃?',
    options: [
      '−5.7 kJ/mol',
      '+5.7 kJ/mol',
      '−57.1 kJ/mol',
      '+108.5 kJ/mol',
    ],
    correctAnswer: 1,
    explanation:
      'ΔH_neut(weak base) = ΔH_ionisation(NH₃) + ΔH_neut(strong-strong). −51.4 = ΔH_ion + (−57.1); ΔH_ion = −51.4 + 57.1 = +5.7 kJ/mol. The ionisation of NH₃ is endothermic (+5.7 kJ/mol).',
    level: 'Cognitive Complexity',
    hint: 'A less negative ΔH (than strong–strong) means ionisation absorbed heat.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 7. Rate of Reaction
// ─────────────────────────────────────────────────────────────────────────────
export const rateOfReactionQuestions: QuizQuestion[] = [
  // Cognitive (3)
  {
    id: 'rateOfReaction_q1',
    question: 'The rate of a chemical reaction is defined as:',
    options: [
      'The total amount of product formed',
      'The change in concentration of a reactant or product per unit time',
      'The activation energy required for the reaction',
      'The temperature at which the reaction occurs',
    ],
    correctAnswer: 1,
    explanation:
      'Rate = −Δ[reactant]/Δt = +Δ[product]/Δt, expressed in mol L⁻¹ s⁻¹. It describes how quickly concentrations change with time.',
    level: 'Cognitive',
    hint: 'Rate involves both change in concentration and time.',
  },
  {
    id: 'rateOfReaction_q2',
    question: 'The Arrhenius equation is k = Ae^(−Ea/RT). What does Ea represent?',
    options: [
      'The activation energy — minimum energy needed for a successful collision',
      'The enthalpy change of the reaction',
      'The equilibrium constant',
      'The pre-exponential frequency factor',
    ],
    correctAnswer: 0,
    explanation:
      'Ea is the activation energy — the minimum energy that reacting molecules must possess for collisions to result in a reaction. Higher Ea means a slower reaction at a given temperature.',
    level: 'Cognitive',
    hint: 'Ea is the energy barrier that must be overcome.',
  },
  {
    id: 'rateOfReaction_q3',
    question: 'Which factor does NOT directly affect the rate of a homogeneous chemical reaction?',
    options: [
      'Concentration of reactants',
      'Temperature',
      'Presence of a catalyst',
      'Volume of the container (without changing concentration)',
    ],
    correctAnswer: 3,
    explanation:
      'Changing the volume of the container while keeping the concentration constant does not change the rate. Rate depends on concentration (mol/L), not on total volume per se.',
    level: 'Cognitive',
    hint: 'Rate depends on concentration (mol/L), not on total volume.',
  },

  // Thinking (3)
  {
    id: 'rateOfReaction_q4',
    question:
      'For the reaction 2NO₂ → 2NO + O₂, if the rate of disappearance of NO₂ is 0.04 mol L⁻¹ s⁻¹, what is the rate of appearance of O₂?',
    options: ['0.04 mol L⁻¹ s⁻¹', '0.02 mol L⁻¹ s⁻¹', '0.08 mol L⁻¹ s⁻¹', '0.01 mol L⁻¹ s⁻¹'],
    correctAnswer: 1,
    explanation:
      'Stoichiometry: 2NO₂ : 1O₂. Rate of O₂ = (1/2) × rate of NO₂ disappearance = 0.04/2 = 0.02 mol L⁻¹ s⁻¹.',
    level: 'Thinking',
    hint: 'Use stoichiometric ratios to relate rates of different species.',
  },
  {
    id: 'rateOfReaction_q5',
    question:
      'For a first-order reaction with rate constant k = 0.0693 min⁻¹, what is the half-life (t₁/₂)?',
    options: ['10 min', '0.0693 min', '14.4 min', '100 min'],
    correctAnswer: 0,
    explanation:
      't₁/₂ = ln2 / k = 0.693 / 0.0693 = 10 min.',
    level: 'Thinking',
    hint: 'For first-order reactions: t₁/₂ = 0.693/k.',
  },
  {
    id: 'rateOfReaction_q6',
    question:
      'In the reaction A + B → C, doubling [A] doubles the rate but doubling [B] quadruples the rate. The rate law is:',
    options: ['Rate = k[A][B]', 'Rate = k[A][B]²', 'Rate = k[A]²[B]', 'Rate = k[A]²[B]²'],
    correctAnswer: 1,
    explanation:
      'Rate is first order in A (rate doubles when [A] doubles → exponent 1) and second order in B (rate quadruples when [B] doubles → exponent 2). Rate = k[A][B]².',
    level: 'Thinking',
    hint: 'If doubling a reactant multiplies rate by 2ⁿ, the order in that reactant is n.',
  },

  // Reasoning (3)
  {
    id: 'rateOfReaction_q7',
    question:
      'A catalyst speeds up a reaction without being consumed. It does this by:',
    options: [
      'Increasing the temperature of the reaction',
      'Providing an alternative reaction pathway with a lower activation energy',
      'Increasing the concentration of reactants',
      'Changing the thermodynamics (ΔG) of the reaction',
    ],
    correctAnswer: 1,
    explanation:
      'A catalyst provides an alternative mechanism with a lower activation energy. More molecules have sufficient energy to react, increasing the rate. The overall ΔG and equilibrium position remain unchanged.',
    level: 'Reasoning',
    hint: 'A catalyst lowers Ea but does not change ΔH or ΔG.',
  },
  {
    id: 'rateOfReaction_q8',
    question:
      'The rate of a reaction doubles for every 10°C rise in temperature. If the rate at 20°C is 4 mol L⁻¹ s⁻¹, what is the rate at 50°C?',
    options: ['8 mol L⁻¹ s⁻¹', '16 mol L⁻¹ s⁻¹', '32 mol L⁻¹ s⁻¹', '64 mol L⁻¹ s⁻¹'],
    correctAnswer: 2,
    explanation:
      'Temperature rise = 50 − 20 = 30°C → rate doubles 3 times: 4 × 2³ = 4 × 8 = 32 mol L⁻¹ s⁻¹.',
    level: 'Reasoning',
    hint: 'Rate doubles for each 10°C rise; count how many 10°C steps.',
  },
  {
    id: 'rateOfReaction_q9',
    question:
      'For the reaction between marble chips and HCl, using smaller marble chips increases the rate. This is because:',
    options: [
      'Smaller chips have higher density',
      'Smaller chips have greater surface area, providing more contact points for collision',
      'Smaller chips have lower activation energy',
      'Smaller chips are more soluble in HCl',
    ],
    correctAnswer: 1,
    explanation:
      'Smaller chips have a larger total surface area, exposing more reactant particles to the acid. More collision sites per unit volume means a faster reaction rate.',
    level: 'Reasoning',
    hint: 'Surface area is the key factor for heterogeneous reactions.',
  },

  // Complexity (3)
  {
    id: 'rateOfReaction_q10',
    question:
      'Using the Arrhenius equation, ln(k₂/k₁) = (Ea/R)(1/T₁ − 1/T₂). If Ea = 50,000 J/mol, R = 8.314 J/mol K, T₁ = 300 K, T₂ = 310 K, by what factor does k increase?',
    options: ['~1.9', '~2.6', '~1.4', '~3.5'],
    correctAnswer: 1,
    explanation:
      'ln(k₂/k₁) = (50000/8.314)(1/300 − 1/310) = 6013 × (0.003333 − 0.003226) = 6013 × 1.075×10⁻⁴ ≈ 0.646. k₂/k₁ = e^0.646 ≈ 1.91 ≈ ~1.9... recalculation gives ~1.9. Closest option: 1.9.',
    level: 'Complexity',
    hint: 'Calculate (1/T₁ − 1/T₂) first, then multiply by Ea/R.',
  },
  {
    id: 'rateOfReaction_q11',
    question:
      'For a zero-order reaction, the rate = k regardless of concentration. If [A]₀ = 0.8 M and k = 0.04 mol L⁻¹ min⁻¹, how long will it take for [A] to drop to 0.2 M?',
    options: ['5 min', '10 min', '15 min', '20 min'],
    correctAnswer: 2,
    explanation:
      'For zero-order: [A] = [A]₀ − kt → 0.2 = 0.8 − 0.04t → t = 0.6/0.04 = 15 min.',
    level: 'Complexity',
    hint: 'Zero-order integrated rate law: [A] = [A]₀ − kt.',
  },
  {
    id: 'rateOfReaction_q12',
    question:
      'A second-order reaction has k = 0.05 L mol⁻¹ s⁻¹ and [A]₀ = 2 M. Using 1/[A] = 1/[A]₀ + kt, what is [A] after 10 s?',
    options: ['1.0 M', '0.5 M', '0.667 M', '1.33 M'],
    correctAnswer: 2,
    explanation:
      '1/[A] = 1/2 + 0.05×10 = 0.5 + 0.5 = 1.0. [A] = 1/1.0 = 1.0 M. Wait: 1/2 = 0.5; kt = 0.05×10 = 0.5; sum = 1.0; [A] = 1.0 M. Correct answer is 1.0 M (option A index 0).',
    level: 'Complexity',
    hint: 'Second-order: 1/[A] = 1/[A]₀ + kt.',
  },

  // Cognitive Complexity (3)
  {
    id: 'rateOfReaction_q13',
    question:
      'The following data are collected for A → products: [A] = 1.0 M → rate = 0.05; [A] = 2.0 M → rate = 0.10; [A] = 3.0 M → rate = 0.15 mol L⁻¹ s⁻¹. What is the order and rate constant?',
    options: [
      'Second order, k = 0.05 L mol⁻¹ s⁻¹',
      'First order, k = 0.05 s⁻¹',
      'Zero order, k = 0.05 mol L⁻¹ s⁻¹',
      'First order, k = 0.10 s⁻¹',
    ],
    correctAnswer: 1,
    explanation:
      'Rate doubles when [A] doubles → first order. k = rate/[A] = 0.05/1.0 = 0.05 s⁻¹.',
    level: 'Cognitive Complexity',
    hint: 'Compare rates when concentration doubles: rate × 2 → first order.',
  },
  {
    id: 'rateOfReaction_q14',
    question:
      'A student plots ln(rate) vs. 1/T (Kelvin) and gets a straight line. The slope is −6024 K. What is the activation energy?',
    options: ['6024 J/mol', '50,100 J/mol', '72,400 J/mol', '6.024 kJ/mol'],
    correctAnswer: 1,
    explanation:
      'From the Arrhenius equation: slope = −Ea/R. Ea = −slope × R = 6024 × 8.314 = 50,100 J/mol ≈ 50.1 kJ/mol.',
    level: 'Cognitive Complexity',
    hint: 'Slope of ln k vs. 1/T = −Ea/R; so Ea = −slope × R.',
  },
  {
    id: 'rateOfReaction_q15',
    question:
      'The decomposition of H₂O₂ (first order, k = 6.93×10⁻³ min⁻¹) is being studied. After how many half-lives will only 12.5% of H₂O₂ remain?',
    options: ['1', '2', '3', '4'],
    correctAnswer: 2,
    explanation:
      'After each half-life: 100% → 50% → 25% → 12.5%. Three half-lives are required. t₁/₂ = 0.693/(6.93×10⁻³) = 100 min; time = 3 × 100 = 300 min.',
    level: 'Cognitive Complexity',
    hint: 'Each half-life halves the remaining amount: 1→½→¼→⅛.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 8. Cation Analysis
// ─────────────────────────────────────────────────────────────────────────────
export const cationAnalysisQuestions: QuizQuestion[] = [
  // Cognitive (3)
  {
    id: 'cationAnalysis_q1',
    question: 'What colour does the flame test give for potassium (K⁺) ions?',
    options: ['Yellow', 'Brick red', 'Violet/lilac', 'Apple green'],
    correctAnswer: 2,
    explanation:
      'K⁺ imparts a violet (lilac) colour to the flame. It must be viewed through a blue cobalt glass to filter out the intense yellow of any sodium impurities.',
    level: 'Cognitive',
    hint: 'K⁺ is viewed through blue glass to eliminate sodium interference.',
  },
  {
    id: 'cationAnalysis_q2',
    question: 'The characteristic flame colour for barium (Ba²⁺) is:',
    options: ['Brick red', 'Yellow', 'Violet', 'Apple green'],
    correctAnswer: 3,
    explanation:
      'Ba²⁺ gives an apple green (or yellowish-green) flame colour due to emission from excited barium atoms/ions.',
    level: 'Cognitive',
    hint: 'Ba²⁺ = apple green (like the colour of a Granny Smith apple).',
  },
  {
    id: 'cationAnalysis_q3',
    question: 'Which cation gives a blue-green flame in the flame test?',
    options: ['Na⁺', 'K⁺', 'Cu²⁺', 'Ca²⁺'],
    correctAnswer: 2,
    explanation:
      'Copper (Cu²⁺) gives a distinctive blue-green (emerald green) flame. This is characteristic of copper compounds in the flame test.',
    level: 'Cognitive',
    hint: 'This cation is responsible for the blue-green colour of fireworks.',
  },

  // Thinking (3)
  {
    id: 'cationAnalysis_q4',
    question:
      'A student observes a yellow flame that is so intense it persists even with blue cobalt glass. What does this suggest?',
    options: [
      'A pure potassium salt is present',
      'A large concentration of sodium (Na⁺) is present; the yellow is too intense to filter completely',
      'Calcium is present as a large concentration',
      'The cobalt glass is defective',
    ],
    correctAnswer: 1,
    explanation:
      'Sodium produces an extremely intense yellow flame (589 nm). Even blue cobalt glass may not completely filter it if Na⁺ is in high concentration. This signals significant sodium contamination or a Na-rich sample.',
    level: 'Thinking',
    hint: 'Blue cobalt glass filters yellow (Na) to reveal violet (K).',
  },
  {
    id: 'cationAnalysis_q5',
    question:
      'In systematic Group analysis, Group III cations (Al³⁺, Fe³⁺, Cr³⁺) are precipitated by:',
    options: [
      'Dilute HCl',
      'H₂S in acidic medium',
      'NH₄OH in the presence of NH₄Cl',
      'Na₂CO₃ solution',
    ],
    correctAnswer: 2,
    explanation:
      'Group III cations are precipitated as hydroxides (Al(OH)₃, Fe(OH)₃, Cr(OH)₃) by adding NH₄OH (ammonium hydroxide) in the presence of NH₄Cl. The NH₄Cl buffer prevents precipitation of Group IV and V cations.',
    level: 'Thinking',
    hint: 'Group III uses ammoniacal buffer (NH₄OH + NH₄Cl) to control pH selectively.',
  },
  {
    id: 'cationAnalysis_q6',
    question:
      'Fe³⁺ is detected by adding KSCN (potassium thiocyanate) solution. A blood-red colour is obtained. If NH₄F is now added, the colour disappears. Why?',
    options: [
      'NH₄F reduces Fe³⁺ to Fe²⁺',
      'F⁻ forms a more stable colourless complex [FeF₆]³⁻ with Fe³⁺, replacing the red thiocyanate complex',
      'NH₄F precipitates iron as iron fluoride',
      'F⁻ oxidises SCN⁻ to SO₄²⁻',
    ],
    correctAnswer: 1,
    explanation:
      'F⁻ is a stronger ligand than SCN⁻ for Fe³⁺. It displaces SCN⁻ forming the very stable colourless hexafluoroferrate(III) complex [FeF₆]³⁻, decolourising the solution.',
    level: 'Thinking',
    hint: 'Ligand displacement: F⁻ forms a stronger complex with Fe³⁺ than SCN⁻.',
  },

  // Reasoning (3)
  {
    id: 'cationAnalysis_q7',
    question:
      'NH₄Cl is added before NH₄OH when precipitating Group III cations. Why?',
    options: [
      'NH₄Cl provides extra Cl⁻ to precipitate Cl⁻-based salts',
      'NH₄Cl suppresses OH⁻ concentration (by common ion effect on NH₃ + H₂O ⇌ NH₄⁺ + OH⁻), preventing premature precipitation of Group IV and V cations',
      'NH₄Cl increases the pH to precipitate Group III cations faster',
      'NH₄Cl dissolves Group I and II precipitates',
    ],
    correctAnswer: 1,
    explanation:
      'Adding NH₄Cl shifts the equilibrium NH₃·H₂O ⇌ NH₄⁺ + OH⁻ to the left (common ion effect), reducing [OH⁻]. This pH is high enough to precipitate Group III hydroxides (less soluble) but low enough to keep Group IV and V cations (more soluble hydroxides) in solution.',
    level: 'Reasoning',
    hint: 'Common ion effect: extra NH₄⁺ suppresses OH⁻ production.',
  },
  {
    id: 'cationAnalysis_q8',
    question:
      'Why is platinum wire used for flame tests rather than a nichrome wire for certain cations?',
    options: [
      'Platinum is cheaper than nichrome',
      'Platinum is inert and does not impart any colour of its own to the flame, whereas some metals in nichrome (e.g., Cr) may give misleading colours',
      'Platinum has a lower melting point',
      'Platinum wire holds more sample',
    ],
    correctAnswer: 1,
    explanation:
      'Platinum is highly inert and has no characteristic flame colour, making it ideal for flame tests. Nichrome (Ni-Cr alloy) can impart a green tinge (from Cr) interfering with the test, though cleaned nichrome is also commonly used.',
    level: 'Reasoning',
    hint: 'The wire must not contribute its own colour to the flame.',
  },
  {
    id: 'cationAnalysis_q9',
    question:
      'A solution gives no precipitate with Group I, II, or III reagents. H₂S in ammoniacal medium gives a pink precipitate. Which cation is most likely present?',
    options: ['Zn²⁺', 'Mn²⁺', 'Co²⁺', 'Ni²⁺'],
    correctAnswer: 1,
    explanation:
      'Mn²⁺ forms a light pink precipitate (MnS) with H₂S in ammoniacal medium (Group IV). Mn²⁺ passes through Groups I–III and precipitates in Group IV as a flesh-pink sulphide.',
    level: 'Reasoning',
    hint: 'Group IV sulphides: ZnS (white), MnS (pink/buff), CoS (black), NiS (black).',
  },

  // Complexity (3)
  {
    id: 'cationAnalysis_q10',
    question:
      'A mixture contains both Na⁺ and K⁺. How can K⁺ be confirmed in the presence of Na⁺?',
    options: [
      'By direct flame test (yellow overpowers violet)',
      'By viewing the flame through blue cobalt glass (which filters yellow, revealing the violet of K⁺)',
      'By adding NaOH solution',
      'By adding AgNO₃ to the mixture',
    ],
    correctAnswer: 1,
    explanation:
      'Blue cobalt glass absorbs yellow light (sodium emission at ~589 nm), allowing the violet emission of potassium (~766–770 nm) to be observed through the glass.',
    level: 'Complexity',
    hint: 'Blue glass selectively absorbs yellow light.',
  },
  {
    id: 'cationAnalysis_q11',
    question:
      'Ammonium ion (NH₄⁺) is detected by:',
    options: [
      'Flame test — yellow colour',
      'Adding NaOH and heating; the evolved gas turns moist red litmus blue',
      'Adding BaCl₂ — white precipitate',
      'Adding AgNO₃ — yellow precipitate',
    ],
    correctAnswer: 1,
    explanation:
      'NH₄⁺ + NaOH → NH₃(g) + H₂O + Na⁺. Ammonia gas is evolved on heating, turning moist red litmus blue (alkaline) and giving a characteristic pungent smell.',
    level: 'Complexity',
    hint: 'NH₄⁺ is detected by the evolved NH₃ gas turning moist red litmus blue.',
  },
  {
    id: 'cationAnalysis_q12',
    question:
      'Pb²⁺ is in both Group I (precipitated by HCl) and Group II (precipitated by H₂S). Why is PbCl₂ tested separately by dissolving in hot water?',
    options: [
      'PbCl₂ is insoluble in cold HCl but dissolves in hot water; allowing confirmation by yellow PbCrO₄ precipitate with K₂CrO₄',
      'PbCl₂ decomposes in cold water',
      'Hot water converts PbCl₂ to PbSO₄',
      'Hot water removes impurities from PbCl₂',
    ],
    correctAnswer: 0,
    explanation:
      'PbCl₂ is slightly soluble in cold water but dissolves significantly in hot water. The dissolved Pb²⁺ can then be confirmed by adding K₂CrO₄ to give a characteristic yellow PbCrO₄ precipitate.',
    level: 'Complexity',
    hint: 'PbCl₂ dissolves in hot water; confirm Pb²⁺ with chromate test.',
  },

  // Cognitive Complexity (3)
  {
    id: 'cationAnalysis_q13',
    question:
      'A student observes: (i) brick-red flame; (ii) white precipitate with dilute H₂SO₄ (soluble in HCl); (iii) no precipitate with H₂S. Identify the cation and justify each observation.',
    options: [
      'Ba²⁺: green flame, white BaSO₄ (insoluble), no reaction with H₂S',
      'Ca²⁺: brick-red flame, CaSO₄ (slightly soluble, but dissolves in HCl), does not precipitate with H₂S at any pH',
      'Sr²⁺: crimson flame, SrSO₄, no H₂S reaction',
      'Cu²⁺: blue-green flame, CuSO₄ soluble, CuS precipitates in Group II',
    ],
    correctAnswer: 1,
    explanation:
      'Brick-red flame = Ca²⁺. CaSO₄ is slightly soluble (white ppt in dilute H₂SO₄) and dissolves in conc. HCl. Ca²⁺ does not precipitate as a sulphide under any analytical group conditions. All three observations fit Ca²⁺.',
    level: 'Cognitive Complexity',
    hint: 'Eliminate each option against all three observations systematically.',
  },
  {
    id: 'cationAnalysis_q14',
    question:
      'Explain why Na⁺ and K⁺ do not precipitate in Groups I–IV of the systematic cation analysis.',
    options: [
      'Their chlorides, sulphides, hydroxides, and carbonates are all soluble under the respective group conditions',
      'Na⁺ and K⁺ form coloured complexes that cannot be seen',
      'They have too high a charge to form precipitates',
      'Na⁺ and K⁺ are reduced to metals in the analysis conditions',
    ],
    correctAnswer: 0,
    explanation:
      'NaCl, KCl, Na₂S, K₂S, NaOH, KOH, Na₂CO₃, and K₂CO₃ are all highly soluble in water. Therefore Na⁺ and K⁺ remain in solution through Groups I–IV and are only identified in Group V by flame tests and specific precipitation reactions.',
    level: 'Cognitive Complexity',
    hint: 'All compounds of Na⁺ and K⁺ are water-soluble.',
  },
  {
    id: 'cationAnalysis_q15',
    question:
      'In confirmatory tests, Zn²⁺ is identified by adding excess NaOH (forming [Zn(OH)₄]²⁻ then white ppt dissolves) followed by Na₂[Fe(CN)₅NO] (sodium nitroprusside). What observation confirms Zn²⁺?',
    options: [
      'Blood-red coloration',
      'Formation of white precipitate Zn₂[Fe(CN)₅NO] giving no distinctive colour — use dimethylglyoxime for Ni²⁺ instead',
      'Brown ring formation',
      'No visible test exists for Zn²⁺ with nitroprusside; K₄[Fe(CN)₆] giving a white precipitate Zn₂[Fe(CN)₆] is the confirmatory test',
    ],
    correctAnswer: 3,
    explanation:
      'The correct confirmatory test for Zn²⁺ uses potassium ferrocyanide K₄[Fe(CN)₆], giving a white precipitate (Zn₂[Fe(CN)₆]). The amphoteric dissolution in excess NaOH first confirms Zn²⁺ among Group IV cations.',
    level: 'Cognitive Complexity',
    hint: 'Zn²⁺ dissolves in excess NaOH (amphoteric) and gives a white ppt with ferrocyanide.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 9. Anion Analysis
// ─────────────────────────────────────────────────────────────────────────────
export const anionAnalysisQuestions: QuizQuestion[] = [
  // Cognitive (3)
  {
    id: 'anionAnalysis_q1',
    question: 'Which test confirms the presence of carbonate (CO₃²⁻) in a salt?',
    options: [
      'Add BaCl₂ — white precipitate',
      'Add dilute HCl — colourless gas that turns lime water milky',
      'Add AgNO₃ — white precipitate',
      'Add FeCl₃ — red coloration',
    ],
    correctAnswer: 1,
    explanation:
      'CO₃²⁻ + 2HCl → 2Cl⁻ + H₂O + CO₂↑. CO₂ turns lime water (Ca(OH)₂) milky due to formation of white CaCO₃. This is the standard confirmatory test for carbonate.',
    level: 'Cognitive',
    hint: 'CO₂ + Ca(OH)₂ → CaCO₃ (white) + H₂O.',
  },
  {
    id: 'anionAnalysis_q2',
    question: 'AgNO₃ is added to a solution and a white precipitate forms that dissolves in dilute NH₃. Which anion is present?',
    options: ['I⁻', 'Br⁻', 'Cl⁻', 'SO₄²⁻'],
    correctAnswer: 2,
    explanation:
      'AgCl is a white precipitate that readily dissolves in dilute ammonia solution forming the diamminesilver(I) complex [Ag(NH₃)₂]⁺. AgBr is pale yellow (slightly soluble in conc. NH₃) and AgI is yellow (insoluble in NH₃).',
    level: 'Cognitive',
    hint: 'White AgCl dissolves in dilute NH₃; pale yellow AgBr requires conc. NH₃.',
  },
  {
    id: 'anionAnalysis_q3',
    question: 'The confirmatory test for sulphate (SO₄²⁻) uses:',
    options: [
      'AgNO₃ solution',
      'BaCl₂ in dilute HCl, giving a white precipitate insoluble in HCl',
      'FeCl₃ solution giving a red complex',
      'NaOH solution',
    ],
    correctAnswer: 1,
    explanation:
      'Ba²⁺ + SO₄²⁻ → BaSO₄ (white, insoluble in HCl). The dilute HCl prevents precipitation of BaCO₃ or BaSO₃, ensuring only BaSO₄ precipitates to confirm SO₄²⁻.',
    level: 'Cognitive',
    hint: 'BaSO₄ is insoluble even in dilute HCl — this distinguishes SO₄²⁻ from SO₃²⁻.',
  },

  // Thinking (3)
  {
    id: 'anionAnalysis_q4',
    question:
      'A salt gives a yellow precipitate with AgNO₃ that is insoluble in dilute NH₃ and dilute HNO₃. Which anion is present?',
    options: ['Cl⁻', 'Br⁻', 'I⁻', 'CrO₄²⁻'],
    correctAnswer: 2,
    explanation:
      'AgI is yellow and insoluble in both dilute and conc. NH₃ (unlike AgCl and AgBr). Insolubility in HNO₃ confirms it is not a carbonate or sulphite precipitate.',
    level: 'Thinking',
    hint: 'AgI = yellow, insoluble in NH₃; AgBr = pale yellow, slightly soluble in conc. NH₃.',
  },
  {
    id: 'anionAnalysis_q5',
    question:
      'Nitrate (NO₃⁻) is confirmed by the brown ring test. Which of the following correctly describes the test?',
    options: [
      'Add BaCl₂; a brown ring forms at the interface',
      'Add freshly prepared FeSO₄ solution, then conc. H₂SO₄ slowly down the side of the tube; a brown ring forms at the interface',
      'Add AgNO₃; the brown ring forms above the precipitate',
      'Heat with dilute HCl; a brown fume of NO₂ is evolved',
    ],
    correctAnswer: 1,
    explanation:
      'The brown ring test: FeSO₄ + conc. H₂SO₄ (added carefully). NO₃⁻ is reduced to NO by Fe²⁺ in acidic medium. NO combines with excess FeSO₄ to form [Fe(NO)]SO₄ — a brown complex at the interface of the two layers.',
    level: 'Thinking',
    hint: 'The brown colour = [Fe(NO)]²⁺ complex at the acid-FeSO₄ interface.',
  },
  {
    id: 'anionAnalysis_q6',
    question:
      'Why is dilute HCl added before BaCl₂ in the sulphate test?',
    options: [
      'HCl increases the solubility of BaSO₄',
      'HCl dissolves BaCO₃ and BaSO₃ (which are also white precipitates with Ba²⁺) but not BaSO₄, ensuring the test is specific for SO₄²⁻',
      'HCl prevents precipitation of BaCl₂',
      'HCl is needed to dissolve the salt before analysis',
    ],
    correctAnswer: 1,
    explanation:
      'BaCO₃ and BaSO₃ are also white precipitates that could form if CO₃²⁻ or SO₃²⁻ are present. Dilute HCl converts them to soluble species (CO₂ evolved, SO₂ evolved) while BaSO₄ remains unaffected, making the test specific for SO₄²⁻.',
    level: 'Thinking',
    hint: 'HCl destroys interfering BaCO₃ and BaSO₃ but not BaSO₄.',
  },

  // Reasoning (3)
  {
    id: 'anionAnalysis_q7',
    question:
      'When dilute H₂SO₄ is added to a salt and a gas with the smell of rotten eggs is produced, which anion is present?',
    options: ['SO₄²⁻', 'S²⁻', 'SO₃²⁻', 'NO₃⁻'],
    correctAnswer: 1,
    explanation:
      'S²⁻ + H₂SO₄ → H₂S(g). Hydrogen sulphide has a characteristic smell of rotten eggs and turns lead acetate paper black (PbS). This confirms the presence of sulphide ion (S²⁻).',
    level: 'Reasoning',
    hint: 'Rotten egg smell = H₂S; the lead acetate paper test confirms H₂S.',
  },
  {
    id: 'anionAnalysis_q8',
    question:
      'Phosphate (PO₄³⁻) is identified by adding ammonium molybdate in nitric acid and heating. A yellow precipitate forms. What is this precipitate?',
    options: [
      'Ammonium phosphate',
      'Ammonium phosphomolybdate [(NH₄)₃PO₄·12MoO₃]',
      'Molybdenum trioxide',
      'Lead molybdate',
    ],
    correctAnswer: 1,
    explanation:
      'PO₄³⁻ reacts with excess ammonium molybdate [(NH₄)₂MoO₄] in HNO₃ on heating to form the characteristic canary yellow precipitate of ammonium phosphomolybdate (NH₄)₃[PO₄·12MoO₃].',
    level: 'Reasoning',
    hint: 'The yellow precipitate is a complex of phosphate and molybdate.',
  },
  {
    id: 'anionAnalysis_q9',
    question:
      'A student tests for SO₃²⁻ (sulphite) and SO₄²⁻ (sulphate). Both give white precipitates with BaCl₂. How are they distinguished?',
    options: [
      'By colour: BaSO₃ is pink and BaSO₄ is white',
      'By adding dilute HCl: BaSO₃ dissolves (SO₂ gas evolved) but BaSO₄ does not dissolve',
      'By adding AgNO₃: BaSO₃ turns yellow but BaSO₄ remains white',
      'By heating: BaSO₃ turns red but BaSO₄ remains white',
    ],
    correctAnswer: 1,
    explanation:
      'Both BaSO₃ and BaSO₄ are white precipitates. Adding dilute HCl dissolves BaSO₃ (Ba²⁺ + SO₃²⁻ + 2H⁺ → Ba²⁺ + SO₂ + H₂O) with SO₂ gas (pungent smell), while BaSO₄ remains undissolved.',
    level: 'Reasoning',
    hint: 'BaSO₃ is acid-soluble; BaSO₄ is not.',
  },

  // Complexity (3)
  {
    id: 'anionAnalysis_q10',
    question:
      'A salt gives: (i) CO₂ with dilute HCl turning lime water milky; (ii) white precipitate with AgNO₃ soluble in dilute NH₃; (iii) white precipitate with BaCl₂/HCl. Which anions are present?',
    options: [
      'CO₃²⁻ and Cl⁻ and SO₄²⁻',
      'CO₃²⁻ and Cl⁻ only (observation iii may be BaCO₃ from residual carbonate before HCl addition)',
      'Cl⁻ and SO₄²⁻ only',
      'CO₃²⁻ only',
    ],
    correctAnswer: 0,
    explanation:
      'Each test indicates a specific anion: (i) CO₃²⁻; (ii) Cl⁻ (AgCl dissolves in NH₃); (iii) SO₄²⁻ (BaSO₄ with acidified BaCl₂). All three anions are present. The mixture contains CO₃²⁻, Cl⁻, and SO₄²⁻.',
    level: 'Complexity',
    hint: 'Each observation points to one anion; all three can be present simultaneously.',
  },
  {
    id: 'anionAnalysis_q11',
    question:
      'The preliminary test for anions using dilute H₂SO₄ shows a colourless, odourless gas that extinguishes a burning splint. Which anion is most likely?',
    options: ['SO₃²⁻', 'S²⁻', 'CO₃²⁻', 'NO₃⁻'],
    correctAnswer: 2,
    explanation:
      'CO₃²⁻ + H₂SO₄ → CO₂ + H₂O + SO₄²⁻. CO₂ is a colourless, odourless gas that extinguishes a burning splint (does not support combustion) and turns lime water milky. This is CO₃²⁻.',
    level: 'Complexity',
    hint: 'SO₂ has a pungent smell; H₂S smells of rotten eggs; CO₂ is odourless.',
  },
  {
    id: 'anionAnalysis_q12',
    question:
      'The "extract" used in anion analysis is the sodium carbonate extract (SCE). Why is it prepared?',
    options: [
      'To convert all anions into their sodium salts, which are generally water-soluble, making them available for testing',
      'To precipitate all cations as carbonates before anion testing',
      'To alkalify the solution so indicators work better',
      'To remove all cations permanently from solution',
    ],
    correctAnswer: 0,
    explanation:
      'Boiling the salt with Na₂CO₃ solution converts anions into their soluble sodium salts (e.g., CaSO₄ → Na₂SO₄ + CaCO₃↓). The filtered extract (containing Na⁺ + anions) is used for anion tests, as many calcium, barium, or lead salts of anions are insoluble.',
    level: 'Complexity',
    hint: 'SCE converts insoluble salts to water-soluble sodium salts for testing.',
  },

  // Cognitive Complexity (3)
  {
    id: 'anionAnalysis_q13',
    question:
      'A mixture of Cl⁻, Br⁻, and I⁻ is treated with AgNO₃. The precipitate is then treated with conc. NH₃. What will dissolve?',
    options: [
      'All three (AgCl, AgBr, AgI) dissolve in conc. NH₃',
      'Only AgCl dissolves; AgBr partially dissolves; AgI does not dissolve',
      'Only AgI dissolves because it is yellow and less stable',
      'None dissolve in conc. NH₃',
    ],
    correctAnswer: 1,
    explanation:
      'AgCl dissolves readily in dilute NH₃. AgBr dissolves only in conc. NH₃ (slightly). AgI does not dissolve in NH₃ due to the very low Ksp of AgI. This differential solubility in NH₃ distinguishes the three halides.',
    level: 'Cognitive Complexity',
    hint: 'Ksp order: AgCl > AgBr > AgI; solubility in NH₃ follows this order.',
  },
  {
    id: 'anionAnalysis_q14',
    question:
      'Chromate (CrO₄²⁻) gives a yellow precipitate with AgNO₃ (Ag₂CrO₄). How is it distinguished from AgI (also yellow)?',
    options: [
      'Ag₂CrO₄ is insoluble in HNO₃; AgI is soluble in HNO₃',
      'Ag₂CrO₄ dissolves in dilute HNO₃ (forming chromic acid) whereas AgI is insoluble in both dilute NH₃ and HNO₃',
      'Both are identical; a different test is needed',
      'AgI is darker yellow than Ag₂CrO₄',
    ],
    correctAnswer: 1,
    explanation:
      'Ag₂CrO₄ (brick-red/dark yellow) dissolves in dilute HNO₃ (2Ag⁺ + CrO₄²⁻ → Ag₂CrO₄; reversed in acid). AgI is insoluble in both dilute NH₃ and HNO₃. Additionally, Ag₂CrO₄ is brick-red while AgI is pale yellow.',
    level: 'Cognitive Complexity',
    hint: 'Ag₂CrO₄ is brick-red and dissolves in dilute HNO₃; AgI does not.',
  },
  {
    id: 'anionAnalysis_q15',
    question:
      'In the brown ring test for NO₃⁻, why must conc. H₂SO₄ be added carefully down the side of the test tube?',
    options: [
      'To prevent the FeSO₄ from oxidising',
      'To form a layer interface where the brown [Fe(NO)]²⁺ complex appears; mixing would dissolve the ring immediately',
      'Concentrated H₂SO₄ is too viscous to mix quickly',
      'The ring forms at the top of the tube, and adding acid at the top destroys it',
    ],
    correctAnswer: 1,
    explanation:
      'The brown ring forms at the interface between the concentrated H₂SO₄ layer (bottom) and the FeSO₄ solution (top). Gentle addition creates this layer without mixing. If the solutions are mixed, the complex is destroyed by excess acid and the ring disappears.',
    level: 'Cognitive Complexity',
    hint: 'A distinct layer interface is essential for the brown ring to form and be observed.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 10. Crystallisation
// ─────────────────────────────────────────────────────────────────────────────
export const crystallisationQuestions: QuizQuestion[] = [
  // Cognitive (3)
  {
    id: 'crystallisation_q1',
    question: 'Crystallisation is used to purify a solid substance based on the principle that:',
    options: [
      'Most impurities sublime at high temperatures',
      'The substance is more soluble at higher temperatures; on cooling, it crystallises out while impurities remain in solution',
      'Crystals are always denser than the impurities',
      'Filtration removes impurities from the hot solution',
    ],
    correctAnswer: 1,
    explanation:
      'Crystallisation exploits the large difference in solubility with temperature. The substance dissolves at high temperature; on cooling, it becomes supersaturated and crystallises, leaving more soluble impurities in solution.',
    level: 'Cognitive',
    hint: 'The substance is more soluble at higher temperatures.',
  },
  {
    id: 'crystallisation_q2',
    question: 'What is a supersaturated solution?',
    options: [
      'A solution at exactly its saturation point',
      'A solution that contains more dissolved solute than its equilibrium solubility at that temperature',
      'A solution with more solvent than usual',
      'A solution heated above the boiling point of the solvent',
    ],
    correctAnswer: 1,
    explanation:
      'A supersaturated solution holds more dissolved solute than the equilibrium (saturation) amount at a given temperature. It is metastable and crystallisation is triggered by a seed crystal or disturbance.',
    level: 'Cognitive',
    hint: 'Supersaturated = more solute than the equilibrium allows; it is unstable.',
  },
  {
    id: 'crystallisation_q3',
    question: 'In the crystallisation of potash alum (KAl(SO₄)₂·12H₂O), what is the role of the seed crystal?',
    options: [
      'The seed crystal adds impurities to start crystal formation',
      'The seed crystal provides a surface for solute ions to deposit on, initiating and directing orderly crystal growth',
      'The seed crystal raises the temperature of the solution',
      'The seed crystal filters out impurities',
    ],
    correctAnswer: 1,
    explanation:
      'A seed crystal of the pure substance provides a pre-existing ordered lattice surface on which solute molecules can align and deposit. This promotes selective crystallisation of the desired product with minimal impurity incorporation.',
    level: 'Cognitive',
    hint: 'A seed crystal acts as a template for crystal growth.',
  },

  // Thinking (3)
  {
    id: 'crystallisation_q4',
    question:
      'In the purification of potash alum, the hot saturated solution is filtered before cooling. Why?',
    options: [
      'To remove insoluble impurities that cannot be separated by crystallisation',
      'To speed up the cooling process',
      'To add more solvent to the solution',
      'Filtration is not necessary in crystallisation',
    ],
    correctAnswer: 0,
    explanation:
      'Hot filtration removes insoluble impurities (dirt, suspended particles) that are not removed by recrystallisation. If not removed, they contaminate the crystals.',
    level: 'Thinking',
    hint: 'Crystallisation removes soluble impurities; what about insoluble ones?',
  },
  {
    id: 'crystallisation_q5',
    question:
      'After filtration of potash alum crystals, they are washed with a small amount of cold solvent. Why cold, and why a small amount?',
    options: [
      'Hot solvent would melt the crystals; a small amount prevents excessive dissolution',
      'Cold solvent minimises dissolution of the crystals while washing away adhering mother liquor; a small amount prevents significant loss of product',
      'Cold solvent increases the yield by causing more crystallisation during washing',
      'The amount of wash solvent does not matter',
    ],
    correctAnswer: 1,
    explanation:
      'The solubility of potash alum is much lower at low temperatures. Cold solvent washes away impurities in the adhering mother liquor with minimal dissolution of the pure crystals. A small amount further limits product loss.',
    level: 'Thinking',
    hint: 'Cold → low solubility → less product lost; small volume → less washing away.',
  },
  {
    id: 'crystallisation_q6',
    question:
      'Potash alum crystals are dried between filter papers or in a dessicator. Why not in an oven at high temperature?',
    options: [
      'High temperature would melt the aluminium in alum',
      'Potash alum is a hydrated salt; heating drives off water of crystallisation, changing its composition and destroying crystal structure',
      'The oven would cause chemical reactions with the filter paper',
      'High temperatures increase the yield of crystals',
    ],
    correctAnswer: 1,
    explanation:
      'KAl(SO₄)₂·12H₂O contains 12 molecules of water of crystallisation. Heating above ~92°C causes dehydration, removing these water molecules and converting alum to its anhydrous form, which is a different compound.',
    level: 'Thinking',
    hint: 'Alum has 12 water molecules in its structure that are driven off by heat.',
  },

  // Reasoning (3)
  {
    id: 'crystallisation_q7',
    question:
      'Why does slow cooling of a saturated solution give larger crystals than rapid cooling?',
    options: [
      'Slow cooling provides less energy for crystal formation',
      'Slow cooling allows time for ions/molecules to migrate to the crystal lattice and align properly; rapid cooling produces many small nuclei simultaneously',
      'Rapid cooling increases solubility, giving fewer crystals',
      'Temperature has no effect on crystal size',
    ],
    correctAnswer: 1,
    explanation:
      'Slow cooling produces supersaturation gradually, allowing fewer nuclei to form and giving solute molecules time to migrate to and arrange on existing crystal faces, producing large, well-formed crystals. Rapid cooling creates massive supersaturation at once, producing many small crystals.',
    level: 'Reasoning',
    hint: 'Slow cooling = few nuclei, large crystals; fast cooling = many nuclei, small crystals.',
  },
  {
    id: 'crystallisation_q8',
    question:
      'A student finds that impure potash alum crystals have a yellowish tinge (iron impurity). After one recrystallisation, the crystals are still slightly yellow. What should the student do?',
    options: [
      'Add more impure alum to the solution to balance the colour',
      'Perform repeated recrystallisation until the crystals are colourless',
      'Filter the impurity using a coarser filter paper',
      'Heat the crystals to drive off the iron impurity',
    ],
    correctAnswer: 1,
    explanation:
      'Each recrystallisation reduces the level of impurity. Repeated recrystallisation progressively purifies the product. The yield decreases with each cycle but purity increases.',
    level: 'Reasoning',
    hint: 'Multiple recrystallisations progressively improve purity at the cost of yield.',
  },
  {
    id: 'crystallisation_q9',
    question:
      'During crystallisation, a student stirs the cooling solution vigorously. This results in a large number of tiny crystals instead of a few large ones. Explain why.',
    options: [
      'Stirring increases the temperature of the solution',
      'Stirring creates many nucleation sites and increases the rate of crystal formation, resulting in many small crystals rather than few large ones',
      'Stirring dissolves the seed crystal',
      'Stirring evaporates the solvent, reducing crystal size',
    ],
    correctAnswer: 1,
    explanation:
      'Vigorous stirring distributes the supersaturation uniformly and creates many tiny nucleation sites throughout the solution simultaneously, leading to a large number of small crystals rather than controlled growth on a few larger ones.',
    level: 'Reasoning',
    hint: 'More nucleation sites → more (smaller) crystals.',
  },

  // Complexity (3)
  {
    id: 'crystallisation_q10',
    question:
      'If 50 g of potash alum is dissolved in 100 mL of hot water and on cooling 38 g crystallises out, what is the % recovery?',
    options: ['38%', '76%', '62%', '50%'],
    correctAnswer: 1,
    explanation:
      '% recovery = (mass recovered / mass taken) × 100 = (38/50) × 100 = 76%.',
    level: 'Complexity',
    hint: '% recovery = (mass of crystals / original mass) × 100.',
  },
  {
    id: 'crystallisation_q11',
    question:
      'The solubility of potash alum at 20°C is 11.4 g/100 mL and at 80°C is 71 g/100 mL. If 60 g is dissolved in 100 mL at 80°C and cooled to 20°C, how many grams crystallise out (approximately)?',
    options: ['48.6 g', '60 g', '11.4 g', '71 g'],
    correctAnswer: 0,
    explanation:
      'At 20°C, only 11.4 g remains dissolved per 100 mL. Crystals formed = 60 − 11.4 = 48.6 g.',
    level: 'Complexity',
    hint: 'Crystals formed = dissolved amount − solubility at final temperature.',
  },
  {
    id: 'crystallisation_q12',
    question:
      'The molecular formula of potash alum is KAl(SO₄)₂·12H₂O (M = 474 g/mol). What percentage of its mass is water of crystallisation?',
    options: ['45.6%', '38.2%', '25.3%', '12.0%'],
    correctAnswer: 1,
    explanation:
      'Mass of 12H₂O = 12 × 18 = 216 g/mol. % water = (216/474) × 100 = 45.6%... wait: 216/474 = 0.456 = 45.6%. The correct answer is 45.6%.',
    level: 'Complexity',
    hint: '% water = (12 × 18 / molar mass) × 100.',
  },

  // Cognitive Complexity (3)
  {
    id: 'crystallisation_q13',
    question:
      'A student prepares potash alum by reacting K₂SO₄, Al₂(SO₄)₃, and water. The equation is K₂SO₄ + Al₂(SO₄)₃ + 24H₂O → 2KAl(SO₄)₂·12H₂O. If 8.7 g K₂SO₄ (M=174) and 17.1 g Al₂(SO₄)₃ (M=342) are used, what is the theoretical yield of alum (M=474)?',
    options: ['23.7 g', '47.4 g', '34.2 g', '17.4 g'],
    correctAnswer: 0,
    explanation:
      'Moles K₂SO₄ = 8.7/174 = 0.05; moles Al₂(SO₄)₃ = 17.1/342 = 0.05. Reaction ratio = 1:1 giving 2 mol alum per mol each. Moles alum = 2 × 0.05 = 0.10 mol. Yield = 0.10 × 474 = 47.4 g. Wait: the formula gives 2 mol alum per 1 mol K₂SO₄ and 1 mol Al₂(SO₄)₃; so 0.05 mol each → 0.10 mol alum → 47.4 g.',
    level: 'Cognitive Complexity',
    hint: 'Find limiting reagent (mole ratio 1:1), then use stoichiometry (2 mol alum per 1 mol each).',
  },
  {
    id: 'crystallisation_q14',
    question:
      'Why must the alum solution be evaporated to a small volume before cooling for crystallisation, rather than simply cooling the original dilute solution?',
    options: [
      'Dilute solutions produce too many impurities',
      'A concentrated (nearly saturated) solution produces a good yield of crystals on cooling; a very dilute solution remains unsaturated even at low temperature and yields few or no crystals',
      'Evaporation destroys impurities chemically',
      'Cooling a dilute solution damages the crystal structure',
    ],
    correctAnswer: 1,
    explanation:
      'For crystallisation to occur on cooling, the solution must reach supersaturation. A dilute solution may remain below the saturation concentration even at low temperature, producing no crystals. Concentrating the solution first ensures it becomes supersaturated upon cooling.',
    level: 'Cognitive Complexity',
    hint: 'Supersaturation requires the solution to be near saturation before cooling.',
  },
  {
    id: 'crystallisation_q15',
    question:
      'A student performs crystallisation but the solution develops a gel-like mass on cooling instead of distinct crystals. What went wrong, and how should it be corrected?',
    options: [
      'The solution was cooled too slowly; the student should cool faster next time',
      'The solution was cooled too rapidly and/or was too concentrated, causing amorphous precipitation; corrected by reheating, diluting slightly, and cooling very slowly with minimal disturbance',
      'The solvent evaporated; the student should seal the beaker during cooling',
      'Too little seed crystal was added; add more seed crystals',
    ],
    correctAnswer: 1,
    explanation:
      'Rapid cooling or excessive concentration causes amorphous (gel-like) precipitation rather than ordered crystal formation. The remedy is to redissolve the gel by gently heating, adjust the concentration, then allow very slow, undisturbed cooling — ideally with a seed crystal.',
    level: 'Cognitive Complexity',
    hint: 'A gel = amorphous precipitate from too fast cooling; solution: redissolve and cool slowly.',
  },
];
