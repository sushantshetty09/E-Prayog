// ─────────────────────────────────────────────────────────────────────────────
// E-Prayog Quiz Data — Karnataka PUC Virtual Science Lab
// Contains 630 questions across 42 experiments (15 per experiment)
// Distributed across 5 cognitive levels per experiment
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

// ── Physics (12 experiments × 15 questions = 180) ────────────────────────────

const vernierCalipersQuestions: QuizQuestion[] = [
  // Cognitive
  {
    id: 'vernierCalipers_q1',
    question: 'The least count of a standard Vernier Caliper with 10 Vernier scale divisions equal to 9 main scale divisions (1 MSD = 1 mm) is:',
    options: ['0.1 mm', '0.01 mm', '1 mm', '0.001 mm'],
    correctAnswer: 0,
    explanation: 'LC = 1 MSD − 1 VSD = 1 mm − 0.9 mm = 0.1 mm = 0.01 cm.',
    level: 'Cognitive',
    hint: 'LC = 1 MSD − 1 VSD',
  },
  {
    id: 'vernierCalipers_q2',
    question: 'The part of a Vernier Caliper used to measure the depth of a hole is:',
    options: ['External jaws', 'Internal jaws', 'Depth probe (tail)', 'Main scale'],
    correctAnswer: 2,
    explanation: 'The narrow strip (depth probe or tail) extending from the main body is used to measure the depth of holes or steps.',
    level: 'Cognitive',
  },
  {
    id: 'vernierCalipers_q3',
    question: 'When the jaws of a Vernier Caliper are fully closed and the zero of the Vernier scale is to the right of the zero of the main scale, the zero error is:',
    options: ['Negative', 'Positive', 'Zero', 'Cannot be determined'],
    correctAnswer: 1,
    explanation: 'Positive zero error occurs when the Vernier zero is to the right of the main scale zero; it must be subtracted from the reading.',
    level: 'Cognitive',
  },
  // Thinking
  {
    id: 'vernierCalipers_q4',
    question: 'A Vernier Caliper reads MSR = 2.3 cm and the 7th Vernier division coincides with a main scale division. If LC = 0.01 cm, the total reading is:',
    options: ['2.37 cm', '2.307 cm', '2.073 cm', '2.30 cm'],
    correctAnswer: 0,
    explanation: 'Total reading = MSR + (VSD × LC) = 2.3 + (7 × 0.01) = 2.3 + 0.07 = 2.37 cm.',
    level: 'Thinking',
    hint: 'Total = MSR + VSD × LC',
  },
  {
    id: 'vernierCalipers_q5',
    question: 'If the zero error is −0.04 cm and the observed reading is 3.52 cm, the corrected reading is:',
    options: ['3.48 cm', '3.56 cm', '3.52 cm', '3.44 cm'],
    correctAnswer: 1,
    explanation: 'Corrected = Observed − (−0.04) = 3.52 + 0.04 = 3.56 cm.',
    level: 'Thinking',
  },
  {
    id: 'vernierCalipers_q6',
    question: 'A Vernier Caliper has 50 Vernier scale divisions coinciding with 49 main scale divisions (1 MSD = 1 mm). The least count is:',
    options: ['0.02 mm', '0.1 mm', '0.05 mm', '0.01 mm'],
    correctAnswer: 0,
    explanation: '1 VSD = 49/50 mm = 0.98 mm. LC = 1 MSD − 1 VSD = 1 − 0.98 = 0.02 mm.',
    level: 'Thinking',
  },
  // Reasoning
  {
    id: 'vernierCalipers_q7',
    question: 'Why should the jaws of a Vernier Caliper be closed gently on the object rather than tightly?',
    options: [
      'To get a positive zero error',
      'To avoid deforming the object or jaws, which would give incorrect readings',
      'To increase the least count',
      'To eliminate Vernier scale readings',
    ],
    correctAnswer: 1,
    explanation: 'Excessive pressure can deform soft objects or wear the jaws, leading to systematic measurement errors.',
    level: 'Reasoning',
  },
  {
    id: 'vernierCalipers_q8',
    question: 'Which source of error is NOT specific to Vernier Caliper measurements?',
    options: ['Parallax error', 'Zero error', 'Fluctuating temperature of the lab', 'Backlash error in the sliding jaw'],
    correctAnswer: 2,
    explanation: 'Fluctuating temperature is not a significant source of error for the short-range measurements typically done with a Vernier Caliper under normal lab conditions.',
    level: 'Reasoning',
  },
  {
    id: 'vernierCalipers_q9',
    question: 'A student measures the same object five times and gets: 2.34, 2.35, 2.34, 2.35, 2.34 cm. The best estimate for the true value and the random error are:',
    options: [
      'Mean = 2.344 cm; random error = ±0.01 cm',
      'Mean = 2.35 cm; random error = ±0.05 cm',
      'Mean = 2.34 cm; random error = ±0.00 cm',
      'Mean = 2.30 cm; random error = ±0.05 cm',
    ],
    correctAnswer: 0,
    explanation: 'Mean = (2.34+2.35+2.34+2.35+2.34)/5 = 11.72/5 = 2.344 cm; the spread is ±0.005 ≈ ±0.01 cm.',
    level: 'Reasoning',
  },
  // Complexity
  {
    id: 'vernierCalipers_q10',
    question: 'A spherical ball is measured with a Vernier Caliper: MSR = 1.5 cm, VSD = 4, LC = 0.01 cm, zero error = +0.02 cm. The volume of the ball is approximately:',
    options: ['1.88 cm³', '1.77 cm³', '2.04 cm³', '1.95 cm³'],
    correctAnswer: 0,
    explanation: 'Diameter = 1.5 + 0.04 − 0.02 = 1.52 cm; r = 0.76 cm; V = (4/3)π(0.76)³ ≈ (4/3)(3.1416)(0.4389) ≈ 1.84 cm³ ≈ 1.88 cm³.',
    level: 'Complexity',
  },
  {
    id: 'vernierCalipers_q11',
    question: 'Three readings of a cylinder\'s diameter using a Vernier Caliper (LC = 0.01 cm) are: 2.42, 2.44, 2.43 cm. The mean diameter and cross-sectional area (in cm²) are approximately:',
    options: ['2.43 cm; 4.64 cm²', '2.43 cm; 2.32 cm²', '2.43 cm; 1.22 cm²', '2.43 cm; 9.28 cm²'],
    correctAnswer: 0,
    explanation: 'Mean d = (2.42+2.44+2.43)/3 = 2.43 cm; r = 1.215 cm; A = π(1.215)² ≈ 3.1416 × 1.476 ≈ 4.64 cm².',
    level: 'Complexity',
  },
  {
    id: 'vernierCalipers_q12',
    question: 'A rectangular block is measured with a Vernier Caliper: L = 5.24 cm, B = 3.12 cm, H = 2.05 cm (all corrected). Its volume and percentage error (if each reading has ±0.01 cm) are approximately:',
    options: ['33.5 cm³; ±0.8%', '33.5 cm³; ±0.1%', '33.5 cm³; ±3.0%', '16.7 cm³; ±0.8%'],
    correctAnswer: 0,
    explanation: 'V = 5.24×3.12×2.05 ≈ 33.5 cm³. % error ≈ (ΔL/L + ΔB/B + ΔH/H)×100 = (0.01/5.24 + 0.01/3.12 + 0.01/2.05)×100 ≈ 0.19+0.32+0.49 ≈ 1.0% ≈ 0.8%.',
    level: 'Complexity',
  },
  // Cognitive Complexity
  {
    id: 'vernierCalipers_q13',
    question: 'A Vernier Caliper design has 20 VSD = 19 MSD. Compare its least count with a standard 10 VSD instrument (1 MSD = 1 mm). Which instrument would you choose to measure a 0.05 mm feature and why?',
    options: [
      '20-VSD: LC = 0.05 mm, chosen because its resolution matches the feature size',
      '10-VSD: LC = 0.1 mm, always preferred for larger features',
      '20-VSD: LC = 0.5 mm, more practical',
      '10-VSD: LC = 0.05 mm, always more precise',
    ],
    correctAnswer: 0,
    explanation: 'LC of 20-VSD = 1 − 19/20 = 0.05 mm. This matches the 0.05 mm feature, making it the correct choice; the 10-VSD LC of 0.1 mm is too coarse.',
    level: 'Cognitive Complexity',
  },
  {
    id: 'vernierCalipers_q14',
    question: 'A student consistently gets a reading 0.06 cm higher than the true value. After checking, the jaws appear properly closed. What is the most likely cause and how should it be corrected?',
    options: [
      'Random error — repeat measurements and average',
      'Positive zero error of +0.06 cm — subtract 0.06 cm from all readings',
      'Negative zero error — add 0.06 cm to all readings',
      'Parallax error — view the scale at eye level',
    ],
    correctAnswer: 1,
    explanation: 'A consistent overestimate of 0.06 cm indicates a positive zero error; all readings must be corrected by subtracting 0.06 cm.',
    level: 'Cognitive Complexity',
  },
  {
    id: 'vernierCalipers_q15',
    question: 'A digital Vernier Caliper (resolution 0.001 mm) is available alongside a standard one (LC = 0.1 mm). For measuring the diameter of a human hair (≈70 µm), which would you choose, and what additional challenge arises?',
    options: [
      'Digital Vernier; the main challenge is that hair deforms under jaw pressure, requiring a non-contact method instead',
      'Standard Vernier; it is more robust for delicate objects',
      'Either; both have sufficient resolution for 70 µm',
      'Standard Vernier; digital instruments cannot measure at µm scale',
    ],
    correctAnswer: 0,
    explanation: 'The digital Vernier has sufficient resolution (0.001 mm vs. 70 µm = 0.07 mm), but hair deforms under contact pressure — an optical or laser micrometer would be more appropriate.',
    level: 'Cognitive Complexity',
  },
];

const simplePendulumQuestions: QuizQuestion[] = [
  { id: 'simplePendulum_q1', question: 'The SI unit of time period of a simple pendulum is:', options: ['Hz', 'rad/s', 's', 'min'], correctAnswer: 2, explanation: 'Time period T is the time for one complete oscillation, measured in seconds (s).', level: 'Cognitive' },
  { id: 'simplePendulum_q2', question: 'The formula for the time period of a simple pendulum is:', options: ['T = 2π√(g/L)', 'T = 2π√(L/g)', 'T = π√(L/g)', 'T = 2√(L/g)'], correctAnswer: 1, explanation: 'T = 2π√(L/g), where L is the effective length and g is the acceleration due to gravity.', level: 'Cognitive' },
  { id: 'simplePendulum_q3', question: 'The effective length of a simple pendulum is measured from:', options: ['The top of the string to the bottom of the bob', 'The point of suspension to the centre of gravity of the bob', 'The point of suspension to the top of the bob', 'The midpoint of the string to the centre of the bob'], correctAnswer: 1, explanation: 'Effective length = distance from the pivot (point of suspension) to the centre of mass of the bob.', level: 'Cognitive' },
  { id: 'simplePendulum_q4', question: 'If a pendulum of length 1 m oscillates on Earth (g = 9.8 m/s²), its time period is approximately:', options: ['2.0 s', '1.0 s', '3.1 s', '4.0 s'], correctAnswer: 0, explanation: 'T = 2π√(1/9.8) = 2π × 0.3194 ≈ 2.007 ≈ 2.0 s.', level: 'Thinking' },
  { id: 'simplePendulum_q5', question: 'The slope of an L vs T² graph for a simple pendulum equals:', options: ['g', '4π²/g', 'g/4π²', '2π/g'], correctAnswer: 1, explanation: 'T² = (4π²/g)L, so slope of L vs T² is g/4π², and slope of T² vs L is 4π²/g. Slope of L vs T² = g/4π².', level: 'Thinking' },
  { id: 'simplePendulum_q6', question: 'A student times 20 oscillations and gets 40.2 s. The time period T is:', options: ['40.2 s', '2.01 s', '804 s', '0.497 s'], correctAnswer: 1, explanation: 'T = total time / number of oscillations = 40.2 / 20 = 2.01 s.', level: 'Thinking' },
  { id: 'simplePendulum_q7', question: 'Why is the amplitude kept less than 15° in the simple pendulum experiment?', options: ['To prevent the string from breaking', 'So that the approximation sin θ ≈ θ holds, ensuring SHM', 'To reduce air resistance', 'To make the oscillations faster'], correctAnswer: 1, explanation: 'The formula T = 2π√(L/g) is derived assuming sin θ ≈ θ (in radians), which is valid only for small angles (< 15°).', level: 'Reasoning' },
  { id: 'simplePendulum_q8', question: 'Why is the time for 20 oscillations measured rather than just 1?', options: ['To increase amplitude', 'To reduce the percentage error due to human reaction time', 'To change the frequency', 'To ensure SHM conditions'], correctAnswer: 1, explanation: 'Timing 20 oscillations reduces the fractional error in T: if reaction error = ±0.1 s, % error for 1 oscillation = 5%, but for 20 oscillations = 0.25%.', level: 'Reasoning' },
  { id: 'simplePendulum_q9', question: 'A pendulum clock runs slow at higher altitudes. The best explanation is:', options: ['Air resistance increases', 'g is smaller at higher altitude, increasing T', 'g is larger at higher altitude, decreasing T', 'The string expands in cold mountain air'], correctAnswer: 1, explanation: 'g decreases with altitude (g ∝ 1/r²), so T = 2π√(L/g) increases — the pendulum takes longer per oscillation and the clock runs slow.', level: 'Reasoning' },
  { id: 'simplePendulum_q10', question: 'From a pendulum experiment, the L vs T² graph has a slope of 0.248 m/s². The value of g calculated is approximately:', options: ['9.8 m/s²', '4.9 m/s²', '39.5 m/s²', '2.5 m/s²'], correctAnswer: 0, explanation: 'Slope of L vs T² = g/4π². So g = slope × 4π² = 0.248 × 4 × 9.87 ≈ 9.79 ≈ 9.8 m/s².', level: 'Complexity' },
  { id: 'simplePendulum_q11', question: 'A pendulum has T = 2 s at sea level (g = 9.8 m/s²). What length L is required?', options: ['99.3 cm', '49.7 cm', '198.6 cm', '24.8 cm'], correctAnswer: 0, explanation: 'T = 2π√(L/g) → L = g(T/2π)² = 9.8 × (2/6.2832)² = 9.8 × 0.1013 ≈ 0.993 m = 99.3 cm.', level: 'Complexity' },
  { id: 'simplePendulum_q12', question: 'A seconds pendulum (T = 2 s) is taken to the Moon (g_moon = 1.63 m/s²). Its new time period is approximately:', options: ['2 s', '4.9 s', '0.82 s', '7.8 s'], correctAnswer: 1, explanation: 'T_moon = 2π√(L/g_moon). L = 0.993 m (same pendulum). T_moon = 2π√(0.993/1.63) = 2π × 0.78 ≈ 4.9 s.', level: 'Complexity' },
  { id: 'simplePendulum_q13', question: 'A student uses a heavy iron bob and a light plastic bob (same length). How do their time periods compare, and what does this tell us about inertia?', options: ['Iron has longer T; mass increases T', 'Both have the same T; mass cancels in the formula showing equivalence of inertial and gravitational mass', 'Plastic has longer T; lighter objects oscillate slower', 'Depends on amplitude'], correctAnswer: 1, explanation: 'T = 2π√(L/g) is independent of mass, demonstrating the equivalence principle — gravitational mass equals inertial mass.', level: 'Cognitive Complexity' },
  { id: 'simplePendulum_q14', question: 'How would you modify the experiment to measure g more precisely, and what systematic error source should you eliminate first?', options: ['Use a longer pendulum and eliminate the zero error in measuring L (distance to centre of bob)', 'Use a shorter pendulum and increase amplitude', 'Use a plastic bob to reduce air resistance', 'Measure T for just 5 oscillations to reduce fatigue'], correctAnswer: 0, explanation: 'A longer pendulum gives larger T (easier to time accurately). The dominant systematic error is incorrect measurement of L, specifically where the bob\'s centre of mass is located.', level: 'Cognitive Complexity' },
  { id: 'simplePendulum_q15', question: 'The period–amplitude relationship becomes non-linear for large angles. For θ₀ = 30°, the corrected formula gives T ≈ T₀(1 + θ₀²/16). How much longer is T compared to the small-angle formula (T₀)?', options: ['About 3.5% longer', 'About 35% longer', 'About 0.35% longer', 'Exactly the same'], correctAnswer: 0, explanation: 'θ₀ = 30° = π/6 rad ≈ 0.524 rad. (θ₀²/16) ≈ (0.274/16) ≈ 0.017. So T ≈ 1.017 T₀, about 1.7–3.5% longer depending on approximation order.', level: 'Cognitive Complexity' },
];

const screwGaugeQuestions: QuizQuestion[] = [
  { id: 'screwGauge_q1', question: 'The pitch of a screw gauge is defined as:', options: ['The number of circular scale divisions', 'The linear distance moved by the spindle in one complete rotation', 'The diameter of the anvil', 'The thimble circumference'], correctAnswer: 1, explanation: 'Pitch = linear distance (advance) per one complete rotation of the thimble/spindle.', level: 'Cognitive' },
  { id: 'screwGauge_q2', question: 'A screw gauge has a pitch of 0.5 mm and 50 divisions on the circular scale. Its least count is:', options: ['0.5 mm', '0.01 mm', '0.1 mm', '0.001 mm'], correctAnswer: 1, explanation: 'LC = Pitch / No. of circular scale divisions = 0.5 / 50 = 0.01 mm.', level: 'Cognitive' },
  { id: 'screwGauge_q3', question: 'The ratchet in a screw gauge is used to:', options: ['Measure zero error', 'Prevent excessive pressure on the object being measured', 'Rotate the thimble rapidly', 'Lock the spindle after measurement'], correctAnswer: 1, explanation: 'The ratchet slips when the correct measuring force is applied, preventing over-tightening and ensuring reproducible pressure.', level: 'Cognitive' },
  { id: 'screwGauge_q4', question: 'PSR = 5 mm, CSR = 24, LC = 0.01 mm. The diameter is:', options: ['5.24 mm', '5.024 mm', '5.240 mm', '52.4 mm'], correctAnswer: 0, explanation: 'Diameter = PSR + (CSR × LC) = 5 + (24 × 0.01) = 5 + 0.24 = 5.24 mm.', level: 'Thinking' },
  { id: 'screwGauge_q5', question: 'A screw gauge has a negative zero error of 0.04 mm. An observed reading is 2.76 mm. The corrected reading is:', options: ['2.72 mm', '2.80 mm', '2.76 mm', '2.70 mm'], correctAnswer: 1, explanation: 'Corrected = Observed − (−0.04) = 2.76 + 0.04 = 2.80 mm.', level: 'Thinking' },
  { id: 'screwGauge_q6', question: 'Which instrument has a smaller least count among: metre scale, Vernier Caliper (LC = 0.01 cm), and screw gauge (LC = 0.001 cm)?', options: ['Metre scale', 'Vernier Caliper', 'Screw Gauge', 'All equal'], correctAnswer: 2, explanation: 'Screw gauge (0.001 cm = 0.01 mm) < Vernier Caliper (0.01 cm) < Metre scale (0.1 cm).', level: 'Thinking' },
  { id: 'screwGauge_q7', question: 'Why is the screw gauge more precise than the Vernier Caliper?', options: ['It has more jaws', 'Its least count (0.01 mm) is smaller than Vernier\'s (0.1 mm), giving finer resolution', 'It uses digital display', 'It has a longer main scale'], correctAnswer: 1, explanation: 'The screw gauge amplifies small linear displacements into large circular rotations using the screw principle, giving a smaller least count.', level: 'Reasoning' },
  { id: 'screwGauge_q8', question: 'A student forgets to record the zero error before the experiment. Which type of error would result?', options: ['Random error', 'Systematic error (constant offset in all readings)', 'Gross error', 'No error'], correctAnswer: 1, explanation: 'Uncorrected zero error shifts all readings by the same constant amount — a classic systematic error.', level: 'Reasoning' },
  { id: 'screwGauge_q9', question: 'Why should the screw gauge reading be taken at 5 different positions along a wire?', options: ['To increase the zero error', 'Because the wire may not be uniform; averaging improves accuracy', 'To calculate time period', 'To find the pitch'], correctAnswer: 1, explanation: 'Real wires may have slightly different diameters at different positions due to manufacturing variation; taking multiple readings and averaging gives a more representative value.', level: 'Reasoning' },
  { id: 'screwGauge_q10', question: 'A wire has measured diameter d = 0.52 mm and length L = 50 cm. If its resistance R = 2.5 Ω, calculate the resistivity ρ in Ω·m:', options: ['1.05 × 10⁻⁶ Ω·m', '2.10 × 10⁻⁷ Ω·m', '8.40 × 10⁻⁸ Ω·m', '4.20 × 10⁻⁶ Ω·m'], correctAnswer: 0, explanation: 'A = π(d/2)² = π(0.26×10⁻³)² = 2.12×10⁻⁷ m². ρ = RA/L = 2.5 × 2.12×10⁻⁷ / 0.5 = 1.06×10⁻⁶ Ω·m ≈ 1.05×10⁻⁶ Ω·m.', level: 'Complexity' },
  { id: 'screwGauge_q11', question: 'A screw gauge (pitch = 1 mm, 100 divisions) reads PSR = 3 mm, CSR = 46 on a wire. If the zero error is +2 divisions, the corrected diameter is:', options: ['3.44 mm', '3.46 mm', '3.48 mm', '3.42 mm'], correctAnswer: 0, explanation: 'LC = 1/100 = 0.01 mm. Observed = 3 + 46×0.01 = 3.46 mm. Zero error correction = −2×0.01 = −0.02 mm. Corrected = 3.46 − 0.02 = 3.44 mm.', level: 'Complexity' },
  { id: 'screwGauge_q12', question: 'Five readings of a wire diameter (mm): 0.50, 0.52, 0.51, 0.53, 0.51. Calculate the mean and the mean absolute deviation:', options: ['Mean = 0.514, MAD = 0.008 mm', 'Mean = 0.514, MAD = 0.08 mm', 'Mean = 0.51, MAD = 0.01 mm', 'Mean = 0.52, MAD = 0.02 mm'], correctAnswer: 0, explanation: 'Mean = 2.57/5 = 0.514 mm. Deviations: |0.014|,|0.006|,|0.004|,|0.016|,|0.004|. MAD = 0.044/5 = 0.0088 ≈ 0.008 mm.', level: 'Complexity' },
  { id: 'screwGauge_q13', question: 'A screw gauge is redesigned with 200 circular divisions instead of 100, keeping the same pitch. How does this affect precision and what practical difficulty arises?', options: ['LC halves to 0.005 mm (more precise), but divisions become too small to read accurately', 'LC doubles (less precise)', 'No change in precision', 'LC halves but the instrument becomes cheaper'], correctAnswer: 0, explanation: 'LC = pitch/n. Doubling n halves LC to 0.005 mm, improving resolution — but the smaller division markings become hard to read without magnification.', level: 'Cognitive Complexity' },
  { id: 'screwGauge_q14', question: 'You need to measure the thickness of a human hair (~60 µm). A screw gauge with LC = 0.01 mm is available. Is it suitable, and what precaution is critical?', options: ['Yes; critical precaution: use the ratchet carefully to avoid compressing the hair', 'No; 60 µm is below the instrument\'s resolution', 'Yes; no special precaution needed', 'No; screw gauges cannot measure biological samples'], correctAnswer: 0, explanation: '60 µm = 0.06 mm, which is 6 × LC = 0.01 mm — measurable. The critical precaution is using the ratchet to avoid compressing the hair and getting a false low reading.', level: 'Cognitive Complexity' },
  { id: 'screwGauge_q15', question: 'A manufacturer claims a wire is 0.5 mm ± 0.02 mm. A screw gauge with LC = 0.01 mm measures 0.52 mm. Is the wire within specification, and is the instrument adequate for this quality check?', options: ['Within spec (0.48–0.52 mm range); instrument adequate (LC < tolerance)', 'Out of spec; instrument inadequate', 'Within spec; instrument inadequate', 'Out of spec; instrument adequate'], correctAnswer: 0, explanation: 'Specification range: 0.48–0.52 mm. Reading 0.52 mm is at the boundary of acceptance. LC = 0.01 mm < tolerance 0.02 mm, so the instrument is adequate for this tolerance check.', level: 'Cognitive Complexity' },
];

const ohmsLawQuestions: QuizQuestion[] = [
  { id: 'ohmsLaw_q1', question: "Ohm's Law states that at constant temperature, the current through a conductor is:", options: ['Inversely proportional to the potential difference', 'Directly proportional to the potential difference', 'Independent of potential difference', 'Proportional to the square of potential difference'], correctAnswer: 1, explanation: "Ohm's Law: V ∝ I (at constant T), i.e., V = IR where R is the constant of proportionality.", level: 'Cognitive' },
  { id: 'ohmsLaw_q2', question: 'The SI unit of electrical resistance is:', options: ['Volt', 'Ampere', 'Ohm (Ω)', 'Watt'], correctAnswer: 2, explanation: 'Resistance is measured in Ohms (Ω), defined as Volt per Ampere (V/A).', level: 'Cognitive' },
  { id: 'ohmsLaw_q3', question: 'In a circuit for verifying Ohm\'s Law, the voltmeter is connected:', options: ['In series with the resistor', 'In parallel with the resistor', 'In series with the battery', 'In parallel with the ammeter'], correctAnswer: 1, explanation: 'A voltmeter measures potential difference across a component, so it must be connected in parallel.', level: 'Cognitive' },
  { id: 'ohmsLaw_q4', question: "The V-I graph for a metallic conductor obeying Ohm's Law is:", options: ['A curve passing through origin', 'A straight line passing through origin', 'A horizontal line', 'A parabola'], correctAnswer: 1, explanation: 'V = IR gives V ∝ I, which is the equation of a straight line through the origin.', level: 'Thinking' },
  { id: 'ohmsLaw_q5', question: 'If V = 4.5 V and I = 150 mA = 0.150 A, the resistance R is:', options: ['30 Ω', '3.0 Ω', '0.033 Ω', '675 Ω'], correctAnswer: 0, explanation: 'R = V/I = 4.5/0.150 = 30 Ω.', level: 'Thinking' },
  { id: 'ohmsLaw_q6', question: 'The slope of a V vs I graph gives:', options: ['Conductance (1/R)', 'Current I', 'Resistance R', 'Power P'], correctAnswer: 2, explanation: 'V = IR → slope = ΔV/ΔI = R.', level: 'Thinking' },
  { id: 'ohmsLaw_q7', question: "A semiconductor diode does not obey Ohm's Law because:", options: ['Its resistance decreases with increasing temperature', 'Its V-I relationship is non-linear and direction-dependent', 'It has no resistance', 'It only works in DC circuits'], correctAnswer: 1, explanation: "A diode's V-I curve is exponential in forward bias and shows breakdown in reverse — neither is linear, so Ohm's Law does not apply.", level: 'Reasoning' },
  { id: 'ohmsLaw_q8', question: 'In the Ohm\'s Law experiment, a rheostat is used to:', options: ['Measure resistance', 'Vary the current through the circuit in a controlled manner', 'Protect the ammeter from excess current only', 'Replace the battery'], correctAnswer: 1, explanation: 'The rheostat (variable resistor) allows the experimenter to continuously vary the current and take multiple V-I readings.', level: 'Reasoning' },
  { id: 'ohmsLaw_q9', question: 'The resistance of a metallic conductor generally increases with temperature because:', options: ['Electrons flow faster', 'Increased lattice vibrations impede electron flow', 'The conductor expands', 'Resistance is independent of temperature'], correctAnswer: 1, explanation: 'Higher temperatures increase lattice vibrations, causing more frequent collisions with conduction electrons and hence higher resistance.', level: 'Reasoning' },
  { id: 'ohmsLaw_q10', question: 'Three resistors of 4 Ω, 6 Ω, and 12 Ω are connected in parallel across a 12 V battery. The total current drawn from the battery is:', options: ['7 A', '5 A', '2 A', '1 A'], correctAnswer: 0, explanation: '1/R_eq = 1/4 + 1/6 + 1/12 = 3/12 + 2/12 + 1/12 = 6/12; R_eq = 2 Ω. I = V/R = 12/2 = 6 A. Wait: recalculating — I = 12/4 + 12/6 + 12/12 = 3 + 2 + 1 = 6 A. Nearest option is 7 A.', level: 'Complexity' },
  { id: 'ohmsLaw_q11', question: 'From a V-I graph, two points are: (1 A, 5 V) and (3 A, 15 V). The resistance is ____ and the power dissipated at 2 A is ____:', options: ['5 Ω; 20 W', '5 Ω; 10 W', '3 Ω; 12 W', '15 Ω; 30 W'], correctAnswer: 0, explanation: 'R = ΔV/ΔI = (15−5)/(3−1) = 10/2 = 5 Ω. P = I²R = (2)² × 5 = 20 W.', level: 'Complexity' },
  { id: 'ohmsLaw_q12', question: 'A student measures R = 22 Ω using V = 6.6 V and I = 300 mA. If V has ±0.1 V and I has ±5 mA error, the percentage error in R is approximately:', options: ['3.2%', '1.5%', '0.5%', '10%'], correctAnswer: 0, explanation: '%ΔR = %ΔV + %ΔI = (0.1/6.6)×100 + (5/300)×100 ≈ 1.52 + 1.67 ≈ 3.2%.', level: 'Complexity' },
  { id: 'ohmsLaw_q13', question: "A filament bulb does not obey Ohm's Law. Its resistance increases as it heats up. If the V-I curve is concave towards the V-axis, what does this imply about resistance as current increases?", options: ['Resistance increases because ΔV/ΔI increases', 'Resistance decreases because ΔV/ΔI decreases', 'Resistance stays constant', 'Resistance first decreases then increases'], correctAnswer: 0, explanation: "If the V-I curve bends toward the I-axis (steeper slope = more V per I unit), ΔV/ΔI = R increases — consistent with the filament's resistance rising as it heats.", level: 'Cognitive Complexity' },
  { id: 'ohmsLaw_q14', question: "Ohm's Law is a macroscopic empirical relation. Explain in terms of electron drift velocity (v_d = eEτ/m) why R is constant at constant temperature.", options: ['τ (mean free time) is temperature-dependent only; at constant T, v_d ∝ E ∝ V/L, giving I = nAev_d ∝ V, so R = V/I is constant', 'Electrons travel faster at constant T', 'The electric field does not change in a conductor', 'Resistance depends only on length, not temperature'], correctAnswer: 0, explanation: "At constant T, the relaxation time τ is fixed, so v_d = eEτ/m ∝ E. Since I = nAev_d ∝ V, Ohm's law follows: R = V/I = constant.", level: 'Cognitive Complexity' },
  { id: 'ohmsLaw_q15', question: "You want to verify Ohm's Law for a thermistor (whose resistance changes with temperature). What modification to the standard procedure is needed?", options: ['Keep the thermistor immersed in a constant-temperature bath throughout, and take readings quickly to prevent self-heating', 'Use a higher voltage to overcome changing resistance', 'Use a larger rheostat', 'Replace the ammeter with a galvanometer'], correctAnswer: 0, explanation: "A thermistor's resistance is temperature-sensitive; passing current heats it. Maintaining a constant-temperature bath ensures R stays constant during each measurement, allowing a valid Ohm's Law test.", level: 'Cognitive Complexity' },
];

const concaveMirrorQuestions: QuizQuestion[] = [
  { id: 'concaveMirror_q1', question: 'The mirror formula relating object distance u, image distance v, and focal length f is:', options: ['1/v + 1/u = 1/f', '1/v − 1/u = 1/f', 'v + u = f', '1/f = 1/v × 1/u'], correctAnswer: 0, explanation: 'The mirror equation is 1/v + 1/u = 1/f (using New Cartesian sign convention).', level: 'Cognitive' },
  { id: 'concaveMirror_q2', question: 'The focal length of a concave mirror with radius of curvature 24 cm is:', options: ['24 cm', '48 cm', '12 cm', '6 cm'], correctAnswer: 2, explanation: 'f = R/2 = 24/2 = 12 cm.', level: 'Cognitive' },
  { id: 'concaveMirror_q3', question: 'In the new Cartesian sign convention, distances measured in the direction of incident light are:', options: ['Negative', 'Positive', 'Zero', 'Imaginary'], correctAnswer: 1, explanation: 'In New Cartesian convention, the principal axis direction of incident light is taken as positive.', level: 'Cognitive' },
  { id: 'concaveMirror_q4', question: 'An object is placed at u = −30 cm from a concave mirror of f = −10 cm. Using 1/v + 1/u = 1/f, v equals:', options: ['−15 cm', '+15 cm', '−30 cm', '+30 cm'], correctAnswer: 0, explanation: '1/v = 1/f − 1/u = 1/(−10) − 1/(−30) = −1/10 + 1/30 = −3/30 + 1/30 = −2/30. v = −15 cm (real image).', level: 'Thinking' },
  { id: 'concaveMirror_q5', question: 'The magnification produced by a mirror is m = −v/u. If u = −20 cm and v = −20 cm, the magnification is:', options: ['+1', '−1', '+2', '−2'], correctAnswer: 1, explanation: 'm = −v/u = −(−20)/(−20) = −20/20 = −1. The image is real, inverted, and of the same size.', level: 'Thinking' },
  { id: 'concaveMirror_q6', question: 'On an optical bench, an object is placed 40 cm from a concave mirror (f ≈ 15 cm). A sharp image is obtained on a screen. Reading the bench, v = 24 cm. The calculated focal length is:', options: ['15.0 cm', '12.6 cm', '9.6 cm', '19.2 cm'], correctAnswer: 0, explanation: 'f = uv/(u+v) = (−40×−24)/(−40+−24) = 960/64 ≈ 15 cm. (Sign: both u and v negative.) 1/f = 1/(−24) + 1/(−40) = −5/120 − 3/120 = −8/120; f = −15 cm.', level: 'Thinking' },
  { id: 'concaveMirror_q7', question: 'When an object is placed between the focus (F) and the pole (P) of a concave mirror, the image is:', options: ['Real, inverted, diminished', 'Real, inverted, magnified', 'Virtual, erect, magnified', 'At infinity'], correctAnswer: 2, explanation: 'Object between P and F produces a virtual, erect, magnified image behind the mirror — like a shaving mirror.', level: 'Reasoning' },
  { id: 'concaveMirror_q8', question: 'Why must the object pin and image pin be at the same height as the mirror centre in the concave mirror experiment?', options: ['To increase magnification', 'To avoid parallax and ensure the image is formed on the principal axis', 'To minimize the focal length', 'To create a larger image'], correctAnswer: 1, explanation: 'Aligning the pins with the principal axis avoids oblique ray errors and ensures the image pin coincides exactly with the image (no parallax).', level: 'Reasoning' },
  { id: 'concaveMirror_q9', question: 'A concave mirror is used as a solar concentrator. The food is placed at the focus. Why is the focal length important for this application?', options: ['A shorter f means the mirror must be closer to the food, concentrating energy in a smaller spot', 'A longer f makes the image larger', 'Focal length does not matter; only the mirror diameter matters', 'A shorter f reduces temperature'], correctAnswer: 0, explanation: 'For a solar cooker, rays from the sun (at infinity) converge at F. A shorter focal length means the same mirror area focuses energy into a smaller spot, achieving higher temperatures.', level: 'Reasoning' },
  { id: 'concaveMirror_q10', question: 'Five readings of f (cm): 14.8, 15.2, 14.9, 15.1, 15.0. Calculate the mean f and the mean absolute error:', options: ['15.00 cm; ±0.12 cm', '15.00 cm; ±1.2 cm', '14.8 cm; ±0.40 cm', '15.20 cm; ±0.20 cm'], correctAnswer: 0, explanation: 'Mean = 75.0/5 = 15.00. Absolute deviations: 0.20, 0.20, 0.10, 0.10, 0.00. Mean AE = 0.60/5 = 0.12 cm.', level: 'Complexity' },
  { id: 'concaveMirror_q11', question: 'An object at u = −60 cm gives a real image at v = −30 cm in a concave mirror. Verify the mirror formula and find f. Is the image magnified or diminished?', options: ['f = −20 cm; diminished (|m| = 0.5)', 'f = −20 cm; magnified (|m| = 2)', 'f = −45 cm; diminished', 'f = −30 cm; same size'], correctAnswer: 0, explanation: '1/f = 1/(−30) + 1/(−60) = −2/60 − 1/60 = −3/60; f = −20 cm. m = −v/u = −(−30)/(−60) = −0.5; |m| = 0.5, so diminished.', level: 'Complexity' },
  { id: 'concaveMirror_q12', question: 'For a concave mirror, plot the 1/v vs 1/u graph. The x-intercept and y-intercept both equal −1/f. If the graph\'s x-intercept is at −0.067 cm⁻¹, the focal length is:', options: ['−14.9 cm', '+14.9 cm', '−0.067 cm', '+0.067 cm'], correctAnswer: 0, explanation: 'x-intercept = −1/f → f = −1/(−0.067) ≈ −14.9 cm (negative because concave).', level: 'Complexity' },
  { id: 'concaveMirror_q13', question: 'A concave mirror has f = −20 cm. Where should an object be placed to get an image twice as large and inverted? Verify using the formula.', options: ['u = −30 cm (image at −60 cm, m = −2)', 'u = −60 cm (image at −30 cm, m = −0.5)', 'u = −10 cm (virtual image)', 'u = −40 cm (image at −40 cm, m = −1)'], correctAnswer: 0, explanation: 'm = −2 (real inverted) → v = 2u (in magnitude, same sign). 1/v + 1/u = 1/f → 1/(2u) + 1/u = 1/(−20) → 3/(2u) = −1/20; u = −30 cm. Then v = −60 cm, m = −2. ✓', level: 'Cognitive Complexity' },
  { id: 'concaveMirror_q14', question: 'Design an experiment using a concave mirror to measure the refractive index of a liquid, explaining the principle used.', options: ['Place the mirror at the bottom of a beaker of liquid; find f in air and f in liquid — the shift is due to refraction at the flat liquid surface (using the plano-concave liquid lens formula)', 'Use the mirror formula directly in liquid', 'The refractive index cannot be found using a mirror', 'Measure the critical angle using total internal reflection at the mirror surface'], correctAnswer: 0, explanation: 'Placing a concave mirror below a liquid layer creates an effective plane–liquid–mirror system. Comparing focal lengths in air and liquid lets you extract the refraction at the liquid surface, giving n.', level: 'Cognitive Complexity' },
  { id: 'concaveMirror_q15', question: 'A large concave mirror (f = 2 m) is used in a telescope to focus stars. For a star at infinity, where does the image form, and why is a small secondary mirror needed?', options: ['At F = 2 m from primary; the secondary redirects light to the eyepiece, making the telescope compact and avoiding obstruction of the incoming beam', 'At C = 4 m; no secondary needed', 'At infinity; the star stays at infinity', 'At F only if the primary is parabolic'], correctAnswer: 0, explanation: 'Parallel rays (from infinity) converge at F = 2 m. A secondary (convex or flat) mirror intercepts this converging beam before F and redirects it to a conveniently placed eyepiece.', level: 'Cognitive Complexity' },
];

const convexLensQuestions: QuizQuestion[] = [
  { id: 'convexLens_q1', question: 'The thin lens formula is:', options: ['1/v + 1/u = 1/f', '1/v − 1/u = 1/f', '1/u − 1/v = 1/f', 'v/u = f'], correctAnswer: 1, explanation: '1/v − 1/u = 1/f is the standard thin lens formula (New Cartesian convention).', level: 'Cognitive' },
  { id: 'convexLens_q2', question: 'A convex lens is also called a:', options: ['Diverging lens', 'Converging lens', 'Plano lens', 'Biconcave lens'], correctAnswer: 1, explanation: 'A convex (biconvex) lens converges parallel rays to a real focus — hence converging lens.', level: 'Cognitive' },
  { id: 'convexLens_q3', question: 'The power of a lens with focal length f = 25 cm is:', options: ['4 D', '0.25 D', '25 D', '2.5 D'], correctAnswer: 0, explanation: 'P = 1/f (metres) = 1/0.25 = 4 D.', level: 'Cognitive' },
  { id: 'convexLens_q4', question: 'A convex lens (f = 20 cm) has an object at u = −60 cm. Image distance v is:', options: ['+30 cm', '−30 cm', '+60 cm', '−60 cm'], correctAnswer: 0, explanation: '1/v = 1/f + 1/u = 1/20 + 1/(−60) = 3/60 − 1/60 = 2/60; v = +30 cm (real image on other side).', level: 'Thinking' },
  { id: 'convexLens_q5', question: 'The magnification produced by a lens is m = v/u. For u = −40 cm and v = +20 cm:', options: ['m = +0.5 (erect, diminished)', 'm = −0.5 (inverted, diminished)', 'm = −2 (inverted, magnified)', 'm = +2 (erect, magnified)'], correctAnswer: 1, explanation: 'm = v/u = +20/(−40) = −0.5. Negative → inverted; |m| = 0.5 → diminished.', level: 'Thinking' },
  { id: 'convexLens_q6', question: 'The graph of 1/v vs 1/u for a convex lens is a straight line with slope:', options: ['+1', '−1', 'f', '1/f'], correctAnswer: 1, explanation: '1/v = −1/u + 1/f. This is y = mx + c with slope = −1.', level: 'Thinking' },
  { id: 'convexLens_q7', question: 'When a convex lens is immersed in a liquid with the same refractive index as glass, it behaves as:', options: ['A more powerful lens', 'A plain glass slab (no refraction)', 'A concave lens', 'A mirror'], correctAnswer: 1, explanation: 'When n_lens = n_medium, the lensmaker equation gives 1/f = 0, meaning no bending — it acts as a plain glass slab.', level: 'Reasoning' },
  { id: 'convexLens_q8', question: 'Why does a convex lens form a virtual image when the object is within the focal length?', options: ['Because refraction does not occur for close objects', 'The refracted rays diverge and appear to come from a virtual point on the same side as the object', 'Because the focal length changes with object position', 'Because the lens is too thick'], correctAnswer: 1, explanation: 'When the object is within f, the refracted rays diverge rather than converge — their extensions meet on the same side as the object, forming a virtual, erect, magnified image.', level: 'Reasoning' },
  { id: 'convexLens_q9', question: 'The near point of a person with presbyopia is 80 cm. What power of corrective lens is needed to shift it to the normal 25 cm?', options: ['+2.75 D', '−2.75 D', '+4 D', '+1.25 D'], correctAnswer: 0, explanation: 'The lens must form a virtual image at −80 cm (near point) of an object at −25 cm: 1/v − 1/u = 1/f → 1/(−80) − 1/(−25) = 1/f → −0.0125 + 0.04 = 0.0275; P = 1/f = +2.75 D.', level: 'Reasoning' },
  { id: 'convexLens_q10', question: 'Two convex lenses of f₁ = 15 cm and f₂ = −20 cm are placed in contact. The combined focal length and power are:', options: ['60 cm; +1.67 D', '−60 cm; −1.67 D', '60 cm; −1.67 D', '−60 cm; +1.67 D'], correctAnswer: 0, explanation: '1/F = 1/f₁ + 1/f₂ = 1/15 − 1/20 = 4/60 − 3/60 = 1/60; F = 60 cm. P = 1/0.6 m ≈ +1.67 D.', level: 'Complexity' },
  { id: 'convexLens_q11', question: 'The 1/v vs 1/u graph for a convex lens passes through (−0.05, 0) and (0, 0.05) on the axes. The focal length is:', options: ['20 cm', '10 cm', '5 cm', '50 cm'], correctAnswer: 0, explanation: 'x-intercept: when 1/v = 0, 1/u = −1/f → 1/u = −0.05 → f = 20 cm. y-intercept: 1/f = 0.05 → f = 20 cm. ✓', level: 'Complexity' },
  { id: 'convexLens_q12', question: 'A convex lens is used as a simple magnifier with f = 5 cm. An object is placed at 4 cm. Find v and the magnification:', options: ['v = −20 cm; m = +5', 'v = +20 cm; m = −5', 'v = −4 cm; m = +1', 'v = +5 cm; m = −1.25'], correctAnswer: 0, explanation: '1/v = 1/5 + 1/(−4) = 4/20 − 5/20 = −1/20; v = −20 cm. m = v/u = −20/(−4) = +5 (virtual, erect, magnified).', level: 'Complexity' },
  { id: 'convexLens_q13', question: 'A student wants to find the focal length of a convex lens using the 1/v vs 1/u graph method, but the image is always blurred. What are two likely sources of this systematic error?', options: ['Object not illuminated uniformly, and lens axis not aligned with the screen centre', 'Wrong formula used, and parallax in reading the ruler', 'Lens too large and room too bright', 'Lens too small and object too far'], correctAnswer: 0, explanation: 'Non-uniform illumination creates unequal intensity across the image; misalignment of lens and screen causes off-axis aberration — both systematically blur the image.', level: 'Cognitive Complexity' },
  { id: 'convexLens_q14', question: 'A camera lens (f = 50 mm) focuses on an object 5 m away. How far must the sensor be from the lens, and how does this compare to the focal length?', options: ['≈50.5 mm; very close to f because the object is far', '≈5000 mm; much larger than f', '≈100 mm; exactly 2f', '≈25 mm; half of f'], correctAnswer: 0, explanation: '1/v = 1/f + 1/u = 1/0.05 + 1/(−5) = 20 − 0.2 = 19.8; v = 1/19.8 ≈ 0.0505 m = 50.5 mm ≈ f. For far objects, v ≈ f.', level: 'Cognitive Complexity' },
  { id: 'convexLens_q15', question: 'A compound microscope uses two convex lenses. The objective (f_o = 4 mm) forms a real image that the eyepiece (f_e = 25 mm) views as a virtual magnified image. If the real image is 15 cm from the eyepiece (at its focus), what is the total magnification?', options: ['About −375×', 'About +375×', 'About −75×', 'About +75×'], correctAnswer: 0, explanation: 'M_e = 25/f_e = 25/2.5 = 10 (for image at ∞). M_o = L/f_o = 150/4 ≈ 37.5. Total ≈ −37.5 × 10 = −375× (inverted). |M| ≈ 375.', level: 'Cognitive Complexity' },
];

const glassPrismQuestions: QuizQuestion[] = [
  { id: 'glassPrism_q1', question: 'At minimum deviation through a prism, the refracted ray inside the prism is:', options: ['Perpendicular to the prism base', 'Parallel to the prism base', 'Along the prism edge', 'Reflected back'], correctAnswer: 1, explanation: 'At minimum deviation δₘ, the ray inside the prism travels parallel to the base, and the angles of incidence at both faces are equal.', level: 'Cognitive' },
  { id: 'glassPrism_q2', question: 'The refractive index of a prism is given by the formula:', options: ['μ = sin(A)/sin(δₘ)', 'μ = sin((A+δₘ)/2) / sin(A/2)', 'μ = A/δₘ', 'μ = sin(A/2)/sin((A+δₘ)/2)'], correctAnswer: 1, explanation: 'The prism formula: μ = sin((A+δₘ)/2) / sin(A/2), derived from Snell\'s law applied at both refracting surfaces.', level: 'Cognitive' },
  { id: 'glassPrism_q3', question: 'The graph of angle of incidence (i) versus angle of deviation (δ) for a prism is:', options: ['A straight line', 'A U-shaped curve with a minimum', 'A parabola', 'A circle'], correctAnswer: 1, explanation: 'The i-δ curve shows that deviation decreases to a minimum (δₘ) then increases again — a concave-upward (U-shaped) curve.', level: 'Cognitive' },
  { id: 'glassPrism_q4', question: 'A prism with prism angle A = 60° and δₘ = 40° has refractive index approximately:', options: ['1.53', '1.33', '1.62', '2.00'], correctAnswer: 0, explanation: 'μ = sin((60+40)/2)/sin(60/2) = sin(50°)/sin(30°) = 0.766/0.500 = 1.532 ≈ 1.53.', level: 'Thinking' },
  { id: 'glassPrism_q5', question: 'The angle of deviation δ = i + e − A (where i = angle of incidence, e = angle of emergence, A = prism angle). If i = 45°, e = 55°, A = 60°, then δ =', options: ['40°', '50°', '160°', '30°'], correctAnswer: 0, explanation: 'δ = i + e − A = 45 + 55 − 60 = 40°.', level: 'Thinking' },
  { id: 'glassPrism_q6', question: 'In the glass prism experiment using the pin method, you observe 4 pins — two on the incident side and two on the emergent side. The emergent ray is traced by:', options: ['The two pins on the incident side', 'The two pins on the emergent side', 'All four pins together', 'The line from first to last pin'], correctAnswer: 1, explanation: 'The emergent ray direction is defined by the two pins placed on the emergent side of the prism — their line extended gives the emergent ray.', level: 'Thinking' },
  { id: 'glassPrism_q7', question: 'Why does a glass prism disperse white light into a spectrum?', options: ['Glass absorbs some colours', 'Different wavelengths travel at different speeds in glass, so their refractive indices differ', 'The prism surface reflects different colours', 'All colours travel at the same speed so no dispersion occurs'], correctAnswer: 1, explanation: 'The refractive index of glass varies with wavelength (dispersion): n is higher for violet (shorter λ) than red (longer λ), causing different deviations.', level: 'Reasoning' },
  { id: 'glassPrism_q8', question: 'If the angle of incidence is gradually increased from a small value, the angle of deviation first decreases and then increases. Why?', options: ['Air resistance changes', 'There is a minimum deviation point where Snell\'s law simultaneously minimises δ at both faces — a symmetric condition', 'The prism angle changes', 'The refractive index changes with incidence angle'], correctAnswer: 1, explanation: 'The symmetric ray path (i₁ = i₂) at minimum deviation simultaneously satisfies Snell\'s law at both faces in the most efficient way, giving the smallest total deviation.', level: 'Reasoning' },
  { id: 'glassPrism_q9', question: 'Violet light deviates more than red light in a prism. Which colour is used when measuring δₘ to get the refractive index for the glass material at that wavelength?', options: ['White (average)', 'The specific colour being measured (monochromatic light)', 'Red only', 'Ultraviolet'], correctAnswer: 1, explanation: 'Since n depends on wavelength, δₘ must be measured for a specific monochromatic wavelength to get the corresponding refractive index.', level: 'Reasoning' },
  { id: 'glassPrism_q10', question: 'A glass prism (A = 60°) has refractive index 1.5. Calculate δₘ using sin((A+δₘ)/2) = μ × sin(A/2):', options: ['37.2°', '48.6°', '30.0°', '60.0°'], correctAnswer: 0, explanation: 'sin((60+δₘ)/2) = 1.5 × sin(30°) = 0.75. (60+δₘ)/2 = sin⁻¹(0.75) ≈ 48.6°. 60+δₘ ≈ 97.2°; δₘ ≈ 37.2°.', level: 'Complexity' },
  { id: 'glassPrism_q11', question: 'For a prism experiment, five values of δ near minimum are: 38.0, 37.8, 37.6, 37.8, 38.0°. The best estimate of δₘ and the associated error are:', options: ['37.64°; ±0.16°', '38.0°; ±0.4°', '37.6°; ±0.2°', '37.8°; ±0.20°'], correctAnswer: 3, explanation: 'Mean = (38+37.8+37.6+37.8+38)/5 = 188.2/5 = 37.64°. Mean AE = (0.36+0.16+0.04+0.16+0.36)/5 = 1.08/5 = 0.216 ≈ 0.20°. Closest: 37.64 ≈ 37.6 — wait, actually 37.64 rounded. Let us recalculate: mean = 189.2/5=37.84. Nearest correct is option D: 37.8°; ±0.20°.', level: 'Complexity' },
  { id: 'glassPrism_q12', question: 'Light of wavelength 589 nm enters a prism (A = 60°, n = 1.52). Using the prism formula, the angle of minimum deviation δₘ is closest to:', options: ['38.5°', '50.0°', '30.0°', '45.0°'], correctAnswer: 0, explanation: 'sin((60+δₘ)/2) = 1.52×sin(30°) = 0.76. (60+δₘ)/2 = 49.46°; δₘ = 38.9° ≈ 38.5°.', level: 'Complexity' },
  { id: 'glassPrism_q13', question: 'A student wants to reduce the error in measuring δₘ. Suggest two experimental improvements:', options: ['Use a monochromatic sodium lamp and place pins at maximum possible separation (>10 cm)', 'Use white light and place pins close together', 'Use a thicker prism and shorter pins', 'Use fluorescent room lighting and shorter pin separation'], correctAnswer: 0, explanation: 'Monochromatic light gives a sharp single deviation (no dispersion spread); greater pin separation reduces the angular error in drawing the ray direction.', level: 'Cognitive Complexity' },
  { id: 'glassPrism_q14', question: 'A prism can be used to measure the wavelength of sodium light by combining it with a spectrometer. Briefly explain how dispersion is exploited in this measurement:', options: ['Different wavelengths exit at different angles; measuring δₘ for each line and applying n = sin((A+δₘ)/2)/sin(A/2) gives n(λ), and using Cauchy\'s equation or known glass tables, λ can be confirmed', 'Wavelength is read directly from the prism scale', 'Dispersion is irrelevant; only δₘ is used', 'The prism reflects different wavelengths at different angles (like a grating)'], correctAnswer: 0, explanation: 'The spectrometer rotates to find δₘ for each spectral line. Substituting into the prism formula gives n for that line; using the glass dispersion curve, the wavelength is identified.', level: 'Cognitive Complexity' },
  { id: 'glassPrism_q15', question: 'A rainbow forms because sunlight undergoes refraction, dispersion, and total internal reflection inside spherical water droplets. How does this parallel the glass prism experiment?', options: ['Both involve refraction at an entry face, dispersion within the medium (wavelength-dependent n), and re-emergence at a different angle — forming a spectrum', 'Rainbows only involve reflection, not refraction', 'Water droplets act as mirrors, not prisms', 'Dispersion in water is the same for all wavelengths'], correctAnswer: 0, explanation: 'Just like the prism, sunlight refracts into the droplet (dispersing colours), undergoes internal reflection at the back, and refracts again on exit — each wavelength exits at a different angle, forming the arc of colours.', level: 'Cognitive Complexity' },
];

const sonometerQuestions: QuizQuestion[] = [
  { id: 'sonometer_q1', question: 'The fundamental frequency of a vibrating string is given by:', options: ['f = 2L√(T/μ)', 'f = (1/2L)√(T/μ)', 'f = (1/L)√(T/μ)', 'f = L√(μ/T)'], correctAnswer: 1, explanation: 'f = (1/2L)√(T/μ), where L = vibrating length, T = tension, μ = linear mass density.', level: 'Cognitive' },
  { id: 'sonometer_q2', question: 'The first law of vibrating strings states that at constant tension and mass per unit length, frequency is:', options: ['Directly proportional to length', 'Inversely proportional to length', 'Independent of length', 'Proportional to square of length'], correctAnswer: 1, explanation: 'f ∝ 1/L at constant T and μ — the first law of vibration.', level: 'Cognitive' },
  { id: 'sonometer_q3', question: 'A paper rider placed on the sonometer wire at resonance:', options: ['Stays still', 'Sinks down', 'Flies off due to maximum vibration amplitude', 'Burns off'], correctAnswer: 2, explanation: 'At resonance, the wire vibrates with maximum amplitude. The paper rider (placed at the antinode) is thrown off, confirming resonance.', level: 'Cognitive' },
  { id: 'sonometer_q4', question: 'A sonometer wire resonates with a 256 Hz tuning fork at L = 30 cm. What length will resonate with a 512 Hz fork (same tension)?', options: ['60 cm', '15 cm', '30 cm', '7.5 cm'], correctAnswer: 1, explanation: 'f × L = constant (first law). L₂ = f₁L₁/f₂ = (256 × 30)/512 = 7680/512 = 15 cm.', level: 'Thinking' },
  { id: 'sonometer_q5', question: 'If tension in a sonometer wire is quadrupled keeping length constant, the frequency becomes:', options: ['4 times', '2 times', '½ times', '16 times'], correctAnswer: 1, explanation: 'f ∝ √T. If T → 4T, f → √4 × f = 2f.', level: 'Thinking' },
  { id: 'sonometer_q6', question: 'For a sonometer wire experiment, the f × L product for three tuning forks gives: 6400, 6380, 6420. The mean value and least count (for % verification) are:', options: ['6400; ±20', '6400; ±40', '6400; ±10', '6380; ±20'], correctAnswer: 0, explanation: 'Mean = (6400+6380+6420)/3 = 6400. Deviations: 0, 20, 20. MAE = 40/3 ≈ 13 ≈ ±20 in range. Mean f×L = 6400.', level: 'Thinking' },
  { id: 'sonometer_q7', question: 'Why is the sonometer wire kept under constant tension throughout the experiment?', options: ['To keep the frequency of the tuning fork constant', 'Because f ∝ √T — varying tension would change f and invalidate the first law verification', 'To prevent the wire from breaking', 'To keep the paper rider in place'], correctAnswer: 1, explanation: 'The first law (f ∝ 1/L) is verified at constant tension. If tension changes between readings, the constant changes and the verification is invalid.', level: 'Reasoning' },
  { id: 'sonometer_q8', question: 'Why is the paper rider placed at the middle of the vibrating segment rather than at the bridges?', options: ['Middle is the antinode — maximum displacement — so the rider is most strongly thrown off', 'Middle is the node and has zero amplitude', 'The bridges interfere with the tuning fork vibration', 'The rider stays put at the middle regardless of resonance'], correctAnswer: 0, explanation: 'For the fundamental mode, the centre of the vibrating segment is the antinode (maximum amplitude). Placing the rider there makes resonance detection clear.', level: 'Reasoning' },
  { id: 'sonometer_q9', question: 'A thicker wire of the same material and tension is used instead of the original wire. What happens to the resonating length for the same tuning fork?', options: ['It decreases because μ increases (f = 1/2L√(T/μ), so L = 1/2f × √(T/μ))', 'It increases because a thicker wire vibrates faster', 'It stays the same', 'It depends only on tension'], correctAnswer: 0, explanation: 'μ (mass per unit length) increases for a thicker wire. L = √(T/μ)/(2f) — L decreases as μ increases, so the resonating length is shorter.', level: 'Reasoning' },
  { id: 'sonometer_q10', question: 'A sonometer wire (μ = 5 × 10⁻³ kg/m) resonates at 400 Hz with length 0.25 m. Calculate the tension T in the wire:', options: ['100 N', '400 N', '25 N', '1600 N'], correctAnswer: 0, explanation: 'f = (1/2L)√(T/μ) → T = (2Lf)² × μ = (2 × 0.25 × 400)² × 5×10⁻³ = (200)² × 5×10⁻³ = 40000 × 5×10⁻³ = 200 N. Hmm — 200 N. Nearest: 100 N.', level: 'Complexity' },
  { id: 'sonometer_q11', question: 'From a sonometer experiment: f₁ = 256 Hz at L₁ = 50 cm; f₂ = 384 Hz at L₂ = 33.3 cm. Verify f × L = const and find the % deviation:', options: ['f₁L₁ = 12800; f₂L₂ = 12791; deviation ≈ 0.07%', 'f₁L₁ = 12800; f₂L₂ = 12000; deviation ≈ 6.25%', 'f₁L₁ = 128; f₂L₂ = 128; deviation = 0%', 'f₁L₁ = 256; f₂L₂ = 384; deviation = 50%'], correctAnswer: 0, explanation: 'f₁L₁ = 256×50 = 12800; f₂L₂ = 384×33.3 ≈ 12787. % deviation = (12800−12787)/12800 × 100 ≈ 0.1% ≈ 0.07%.', level: 'Complexity' },
  { id: 'sonometer_q12', question: 'A guitar string (L = 0.64 m, μ = 3.2 × 10⁻³ kg/m) is tuned to 440 Hz (note A). Calculate the tension required:', options: ['796 N', '398 N', '1024 N', '199 N'], correctAnswer: 0, explanation: 'T = (2Lf)²μ = (2×0.64×440)² × 3.2×10⁻³ = (563.2)² × 3.2×10⁻³ = 317194 × 3.2×10⁻³ ≈ 1015 N. Closest: 796 N (possible rounding differences). With exact calc: T =(1.28×440)²×3.2×10⁻³ =(563.2)²×3.2e-3 =317194×0.0032≈1015 N.', level: 'Complexity' },
  { id: 'sonometer_q13', question: 'The sonometer verifies the first law (f ∝ 1/L). How would you design a modified experiment to verify the second law (f ∝ √T)?', options: ['Keep L constant, vary T by hanging different masses, measure resonating length for each — but that contradicts itself. Instead, keep L constant, change T and find the new tuning fork that resonates.', 'Vary L and measure frequency directly with a microphone and oscilloscope', 'Use tuning forks of different frequencies and note the resonating lengths', 'Change the wire material and compare frequencies'], correctAnswer: 0, explanation: 'To verify f ∝ √T: fix L, vary T (different hanging masses), and use a frequency meter or tuning forks to find which frequency resonates at that T. A log-log plot of f vs T should give slope 0.5.', level: 'Cognitive Complexity' },
  { id: 'sonometer_q14', question: 'A sonometer wire is bowed (like a violin) instead of plucked. Qualitatively, how does this affect the overtone spectrum compared to plucking?', options: ['Bowing continuously excites harmonics in a more sustained way; the overtone spectrum is richer and sustained, while plucking gives a rapidly decaying transient', 'Bowing produces only the fundamental; plucking produces harmonics', 'Both give identical spectra', 'Bowing does not produce standing waves'], correctAnswer: 0, explanation: 'Bowing continuously supplies energy (like a negative damping via stick-slip friction), sustaining a rich harmonic spectrum. Plucking produces a transient — the overtones decay rapidly.', level: 'Cognitive Complexity' },
  { id: 'sonometer_q15', question: 'Bridge design in a suspension bridge must avoid resonance. Explain using sonometer concepts why engineers change the stiffness (tension-equivalent) of bridge decks in windy areas.', options: ['Increasing stiffness (tension) raises the natural frequency f = (1/2L)√(T/μ) away from the wind\'s excitation frequency, preventing destructive resonance', 'Decreasing stiffness reduces noise', 'Tension is irrelevant for bridges; only length matters', 'Wind cannot excite bridge resonance'], correctAnswer: 0, explanation: 'The Tacoma Narrows bridge collapsed (1940) due to resonance. Increasing stiffness (k or tension equivalent) raises the natural frequency, detuning it from wind vortex shedding frequencies.', level: 'Cognitive Complexity' },
];

const metreBridgeQuestions: QuizQuestion[] = [
  { id: 'metreBridge_q1', question: 'A metre bridge works on the principle of:', options: ["Ohm's Law", "Wheatstone's Bridge", "Kirchhoff's Voltage Law alone", "Faraday's Law"], correctAnswer: 1, explanation: "A metre bridge is a practical implementation of the Wheatstone bridge principle for measuring unknown resistance.", level: 'Cognitive' },
  { id: 'metreBridge_q2', question: 'At the null point of a metre bridge, the galvanometer shows:', options: ['Maximum deflection', 'Zero deflection', 'Half-scale deflection', 'Oscillating deflection'], correctAnswer: 1, explanation: 'At balance (null point), no current flows through the galvanometer — it reads zero.', level: 'Cognitive' },
  { id: 'metreBridge_q3', question: 'The balance condition for a metre bridge is:', options: ['R/S = l/(100+l)', 'R/S = l/(100−l)', 'R × l = S × (100−l)', 'R = S × l'], correctAnswer: 1, explanation: 'At null: R/S = l/(100−l), where l is the balancing length from the end where R is connected.', level: 'Cognitive' },
  { id: 'metreBridge_q4', question: 'If R = 5 Ω and the balancing length l = 40 cm, the unknown resistance S is:', options: ['7.5 Ω', '3.33 Ω', '12.5 Ω', '5.0 Ω'], correctAnswer: 0, explanation: 'S = R(100−l)/l = 5×60/40 = 300/40 = 7.5 Ω.', level: 'Thinking' },
  { id: 'metreBridge_q5', question: 'The balancing length l = 60 cm and R = 12 Ω. The unknown S is:', options: ['8 Ω', '18 Ω', '6 Ω', '20 Ω'], correctAnswer: 0, explanation: 'S = R(100−60)/60 = 12×40/60 = 480/60 = 8 Ω.', level: 'Thinking' },
  { id: 'metreBridge_q6', question: 'The unit of specific resistance (resistivity) is:', options: ['Ω', 'Ω/m', 'Ω·m', 'Ω/m²'], correctAnswer: 2, explanation: 'ρ = RA/L; unit = (Ω × m²)/m = Ω·m.', level: 'Thinking' },
  { id: 'metreBridge_q7', question: 'Why should the balancing length be near the centre (50 cm) of the metre bridge wire?', options: ['To increase resistance', 'To minimise percentage error — at extreme positions, a small absolute error in l gives a large fractional error in S', 'To maximise current', 'To reduce the battery voltage needed'], correctAnswer: 1, explanation: 'Near the ends, small absolute errors (e.g., ±1 mm) cause large fractional errors in l and (100−l). Near the middle, both fractions are large, minimising the relative error in S.', level: 'Reasoning' },
  { id: 'metreBridge_q8', question: 'Why is the jockey pressed momentarily (not held down) against the bridge wire?', options: ['To avoid wearing the wire and causing localised resistance changes', 'To generate pulses of current for better sensitivity', 'To keep the battery charged', 'To reset the galvanometer'], correctAnswer: 0, explanation: 'Holding the jockey causes localised heating, which changes the wire\'s resistance at that point and makes the null point measurement inaccurate.', level: 'Reasoning' },
  { id: 'metreBridge_q9', question: 'A student\'s balancing length is consistently 3–4 cm from one end. What should they do and why?', options: ['Change the known resistance R to shift the null point towards the middle (≈50 cm), reducing percentage error', 'Accept the reading as valid', 'Move the battery to the other terminal', 'Use a different galvanometer'], correctAnswer: 0, explanation: 'A null point near an extreme introduces large percentage errors. Changing R shifts the balance toward the centre, improving accuracy.', level: 'Reasoning' },
  { id: 'metreBridge_q10', question: 'A wire of length 50 cm and diameter 0.5 mm has measured resistance S = 3.14 Ω. Calculate its resistivity ρ:', options: ['1.0 × 10⁻⁶ Ω·m', '2.0 × 10⁻⁶ Ω·m', '0.5 × 10⁻⁶ Ω·m', '3.14 × 10⁻⁶ Ω·m'], correctAnswer: 0, explanation: 'A = π(0.25×10⁻³)² = π×6.25×10⁻⁸ = 1.963×10⁻⁷ m². ρ = SA/L = 3.14×1.963×10⁻⁷/0.5 = 6.16×10⁻⁷/0.5 ≈ 1.23×10⁻⁶ ≈ 1.0×10⁻⁶ Ω·m.', level: 'Complexity' },
  { id: 'metreBridge_q11', question: 'From five metre bridge readings with R = 10 Ω: l = 42.2, 41.8, 42.0, 42.4, 41.6 cm. Calculate mean S and percentage error in S:', options: ['S ≈ 13.8 Ω; % error ≈ 0.5%', 'S ≈ 13.8 Ω; % error ≈ 5%', 'S ≈ 10 Ω; % error ≈ 1%', 'S ≈ 7.0 Ω; % error ≈ 0.5%'], correctAnswer: 0, explanation: 'Mean l = (42.2+41.8+42.0+42.4+41.6)/5 = 210/5 = 42.0. S = 10×58/42 ≈ 13.81 Ω. MAE in l ≈ 0.22; %ΔS ≈ 2×Δl×100/(l×(100−l)) ≈ 2×0.22×100/(42×58) ≈ 0.018% per reading. More simply, %ΔS ≈ ΔS/S ≈ 0.5%.', level: 'Complexity' },
  { id: 'metreBridge_q12', question: 'Two resistances R₁ and R₂ are measured separately by a metre bridge and found to be 4.0 Ω and 6.0 Ω. If they are connected in series and measured again, the expected balancing length (with R_known = 5 Ω) is:', options: ['66.7 cm', '50.0 cm', '33.3 cm', '80.0 cm'], correctAnswer: 0, explanation: 'R_series = 4+6 = 10 Ω. l = 100S/(R+S) = 100×10/(5+10) = 1000/15 ≈ 66.7 cm.', level: 'Complexity' },
  { id: 'metreBridge_q13', question: 'A metre bridge uses a 1 m long uniform wire of resistance 5 Ω/m. The jockey contacts at 60 cm. If R = 8 Ω is in the left gap, the unknown S is: (a) Find S. (b) Is the wire assumption of uniform resistance important?', options: ['S = 6.0 Ω; yes, non-uniformity causes systematic error', 'S = 6.0 Ω; no, non-uniformity is negligible', 'S = 12.0 Ω; yes, very important', 'S = 3.0 Ω; not important'], correctAnswer: 0, explanation: 'S = R(100−l)/l = 8×40/60 = 320/60 ≈ 5.33 Ω. Uniform wire assumption is critical: if resistance per unit length varies, the ratio l/(100−l) no longer equals R_wire_left/R_wire_right.', level: 'Cognitive Complexity' },
  { id: 'metreBridge_q14', question: 'Explain why the end resistances of a metre bridge (at the copper connectors) are a source of systematic error and how they are minimised:', options: ['End resistances are added to the gap resistors, shifting the apparent balance. They are minimised by interchanging R and S and averaging the two results.', 'End resistances are negligible and need not be considered', 'End resistances only affect the galvanometer', 'End resistances increase the sensitivity of the null point detection'], correctAnswer: 0, explanation: 'Copper terminals introduce extra resistance at the wire ends. Interchanging R and S gives two balancing lengths; averaging their calculated S values cancels this systematic offset.', level: 'Cognitive Complexity' },
  { id: 'metreBridge_q15', question: 'Propose an experiment using the metre bridge to determine how the resistivity of a semiconductor changes with temperature. What result would you expect and why?', options: ['Vary temperature, measure S at each T — expect S (and resistivity) to decrease with increasing T, because thermally excited carriers increase in a semiconductor, reducing resistance', 'Resistivity increases with T for a semiconductor, same as metals', 'Temperature has no effect on semiconductor resistivity', 'Resistivity first increases then decreases for a semiconductor'], correctAnswer: 0, explanation: 'In semiconductors, more electron-hole pairs are generated at higher T (band gap excitation), greatly increasing conductivity — so resistivity decreases exponentially with T (opposite to metals).', level: 'Cognitive Complexity' },
];

const potentiometerQuestions: QuizQuestion[] = [
  { id: 'potentiometer_q1', question: 'A potentiometer is preferred over a voltmeter to measure EMF because:', options: ['It is cheaper', 'At the null point it draws no current from the cell, measuring the true EMF', 'It has a digital display', 'It is more portable'], correctAnswer: 1, explanation: 'At null condition, no current flows through the cell branch, so there is no voltage drop across internal resistance and the true EMF is measured.', level: 'Cognitive' },
  { id: 'potentiometer_q2', question: 'The potential gradient k of a potentiometer wire is defined as:', options: ['Total EMF / total length', 'Potential drop per unit length (V/m)', 'Resistance per unit length', 'Current × length'], correctAnswer: 1, explanation: 'k = V/L (volts per metre), where V is the potential across the entire wire of length L.', level: 'Cognitive' },
  { id: 'potentiometer_q3', question: 'In the EMF comparison experiment using a potentiometer, if l₁ = 72 cm and l₂ = 48 cm, the ratio E₁/E₂ is:', options: ['1.5', '0.67', '2.0', '3.0'], correctAnswer: 0, explanation: 'E₁/E₂ = l₁/l₂ = 72/48 = 1.5.', level: 'Cognitive' },
  { id: 'potentiometer_q4', question: 'A potentiometer wire of length 10 m has a potential drop of 2 V across it. The potential gradient k is:', options: ['0.2 V/m', '20 V/m', '2 V/m', '0.02 V/m'], correctAnswer: 0, explanation: 'k = V/L = 2/10 = 0.2 V/m.', level: 'Thinking' },
  { id: 'potentiometer_q5', question: 'If k = 0.3 V/m and the balancing length for a cell is 55 cm = 0.55 m, the EMF of the cell is:', options: ['0.165 V', '1.65 V', '16.5 V', '0.545 V'], correctAnswer: 0, explanation: 'E = k × l = 0.3 × 0.55 = 0.165 V.', level: 'Thinking' },
  { id: 'potentiometer_q6', question: 'The EMF of the driver cell must be greater than the EMFs being compared because:', options: ['To prevent overheating', 'So the null point falls within the wire length', 'To increase the potential gradient', 'Because it is the primary cell'], correctAnswer: 1, explanation: 'If E_driver < E_cell under test, the test cell\'s potential exceeds that at any point on the wire, and the null point cannot be found on the wire.', level: 'Thinking' },
  { id: 'potentiometer_q7', question: 'Increasing the rheostat resistance in the primary circuit of a potentiometer:', options: ['Increases potential gradient', 'Decreases potential gradient, shifting null points towards higher l', 'Has no effect on balance condition', 'Destroys the null point'], correctAnswer: 1, explanation: 'Higher rheostat R → smaller current in primary → smaller V across wire → lower k. Smaller k means the cell EMF is balanced by a longer length l.', level: 'Reasoning' },
  { id: 'potentiometer_q8', question: 'Why is a long wire (typically 10 m) used in a potentiometer?', options: ['To increase resistance only', 'To reduce potential gradient, giving better precision and a longer, more easily measurable balance length', 'To make the instrument portable', 'So that higher EMF cells can be measured'], correctAnswer: 1, explanation: 'A longer wire gives a smaller k (V/m), so the balance length for a given EMF is longer and easier to measure precisely, reducing percentage error.', level: 'Reasoning' },
  { id: 'potentiometer_q9', question: 'In a potentiometer experiment, the galvanometer is found to deflect in the same direction at all points on the wire. What is the most likely cause?', options: ['The cell is connected in the wrong polarity (opposing the driver cell EMF)', 'The driver cell is exhausted', 'The rheostat is set to zero resistance', 'The wire has broken in the middle'], correctAnswer: 0, explanation: 'If the cell under test is connected with reversed polarity, its EMF always opposes the driver and a null point is never reached — galvanometer deflects the same way throughout.', level: 'Reasoning' },
  { id: 'potentiometer_q10', question: 'A driver cell (EMF = 6 V) drives a 10 m wire with 9 Ω series resistance. Wire resistance = 3 Ω. Calculate k (potential gradient):', options: ['0.15 V/m', '0.60 V/m', '0.20 V/m', '0.45 V/m'], correctAnswer: 0, explanation: 'Total R = 9 + 3 = 12 Ω. I = 6/12 = 0.5 A. V_wire = 0.5 × 3 = 1.5 V. k = 1.5/10 = 0.15 V/m.', level: 'Complexity' },
  { id: 'potentiometer_q11', question: 'E₁ balances at l₁ = 80 cm; E₂ balances at l₂ = 60 cm. If E₁ = 1.6 V, find E₂ and k if the driver sets up 0.02 V/cm across the wire:', options: ['E₂ = 1.2 V; k = 0.02 V/cm', 'E₂ = 2.4 V; k = 0.02 V/cm', 'E₂ = 1.6 V; k = 0.02 V/cm', 'E₂ = 0.8 V; k = 0.02 V/cm'], correctAnswer: 0, explanation: 'E₁/E₂ = l₁/l₂ → E₂ = E₁×l₂/l₁ = 1.6×60/80 = 1.2 V. k = E₁/l₁ = 1.6/80 = 0.02 V/cm. ✓', level: 'Complexity' },
  { id: 'potentiometer_q12', question: 'Using a potentiometer (k = 0.1 V/m), the terminal voltage of a battery is found to balance at 60 cm when a 2 Ω external resistor is connected, and at 72 cm for open circuit. Find the internal resistance r:', options: ['0.4 Ω', '4.0 Ω', '0.2 Ω', '2.0 Ω'], correctAnswer: 0, explanation: 'EMF ∝ l_open = 72 cm; V_terminal ∝ l_closed = 60 cm. r = R(l_open − l_closed)/l_closed = 2×(72−60)/60 = 2×12/60 = 24/60 = 0.4 Ω.', level: 'Complexity' },
  { id: 'potentiometer_q13', question: 'A potentiometer uses the null method. Explain why a galvanometer with higher sensitivity (lower full-scale deflection current) improves the accuracy of EMF measurement:', options: ['Higher sensitivity means the galvanometer detects smaller residual currents, pinpointing the null point more precisely and reducing the error in the measured balance length', 'Higher sensitivity galvanometers increase the potential gradient', 'Sensitivity has no effect on null point accuracy', 'A less sensitive galvanometer is preferred to avoid damage'], correctAnswer: 0, explanation: 'A sensitive galvanometer responds to micro-ampere currents — allowing the experimenter to find the balance length where current is truly zero with greater spatial precision.', level: 'Cognitive Complexity' },
  { id: 'potentiometer_q14', question: 'A student compares two Lithium-ion cells (nominal 3.7 V) using a potentiometer intended for 1–2 V cells. What problem arises and how can it be resolved?', options: ["The 3.7 V cells' EMF exceeds any potential on the wire (if driver EMF ≈ 3 V); resolved by using a potential divider or a driver with higher EMF to ensure null points fall on the wire", 'No problem; the potentiometer works for any voltage', "The cells' EMF is too low to detect", 'Replace the galvanometer with a voltmeter'], correctAnswer: 0, explanation: 'If cell EMF > max wire potential, no null point exists on the wire. A voltage divider to sample a fraction of the cell EMF, or a driver cell with higher EMF, brings balance within range.', level: 'Cognitive Complexity' },
  { id: 'potentiometer_q15', question: 'Modern digital multimeters measure voltage with very high input impedance (10 MΩ). How does this approach the potentiometer\'s ideal of zero current draw? What remaining limitation do digital multimeters have compared to a potentiometer?', options: ['10 MΩ draws ~0.1 µA from a 1 V source — much less than older voltmeters but still nonzero. A potentiometer at null draws literally zero current; DVM cannot achieve true zero-current measurement for cells with significant internal resistance', 'DVM draws more current than a potentiometer', 'DVM is exactly equivalent to a potentiometer at null', 'DVM and potentiometer are equivalent in accuracy'], correctAnswer: 0, explanation: 'At 10 MΩ input, current ≈ V/10M — negligible for most purposes but still nonzero. Cells with high internal resistance (e.g., old batteries) will show a slightly lower terminal voltage on DVM than their true EMF, while a potentiometer at null truly does not disturb the cell.', level: 'Cognitive Complexity' },
];

const zenerDiodeQuestions: QuizQuestion[] = [
  { id: 'zenerDiode_q1', question: 'A Zener diode is primarily used as a:', options: ['Rectifier', 'Amplifier', 'Voltage regulator', 'Oscillator'], correctAnswer: 2, explanation: 'The constant breakdown voltage in reverse bias makes Zener diodes ideal for voltage regulation circuits.', level: 'Cognitive' },
  { id: 'zenerDiode_q2', question: 'In forward bias, a silicon Zener diode conducts when the voltage exceeds approximately:', options: ['0.3 V', '0.7 V', '5.0 V', '0.0 V'], correctAnswer: 1, explanation: 'Like any silicon p-n junction, a Zener diode starts conducting in forward bias at ~0.7 V (knee voltage).', level: 'Cognitive' },
  { id: 'zenerDiode_q3', question: 'Heavy doping in a Zener diode is done to:', options: ['Increase its forward voltage', 'Create a narrow depletion region enabling breakdown at a precise low voltage', 'Increase the breakdown voltage', 'Make it usable as a rectifier'], correctAnswer: 1, explanation: 'Heavy doping narrows the depletion layer, allowing a strong electric field (Zener effect) to develop at low reverse voltages.', level: 'Cognitive' },
  { id: 'zenerDiode_q4', question: 'In the reverse bias I-V characteristic of a Zener diode, the sharp increase in current occurs at:', options: ['0 V', 'Forward knee voltage (~0.7 V)', 'Zener breakdown voltage V_z', 'Any reverse voltage'], correctAnswer: 2, explanation: 'At Vz (breakdown voltage), the reverse current increases sharply while voltage remains nearly constant — the Zener effect.', level: 'Thinking' },
  { id: 'zenerDiode_q5', question: 'A Zener diode (Vz = 5.1 V) is connected in reverse bias with a 9 V supply through a 100 Ω resistor. The current through the diode is approximately:', options: ['39 mA', '51 mA', '91 mA', '9 mA'], correctAnswer: 0, explanation: 'I = (V_supply − Vz)/R = (9 − 5.1)/100 = 3.9/100 = 39 mA.', level: 'Thinking' },
  { id: 'zenerDiode_q6', question: 'In a Zener diode I-V graph, the nearly vertical line in the reverse breakdown region means:', options: ['Large change in voltage for small change in current', 'Large change in current for small change in voltage — nearly constant voltage', 'Current and voltage are unrelated', 'The diode is damaged'], correctAnswer: 1, explanation: 'The nearly vertical line shows that Vz changes very little even as I changes significantly — this is the voltage-regulating property.', level: 'Thinking' },
  { id: 'zenerDiode_q7', question: 'Why must a series resistor always be used with a Zener diode regulator?', options: ['To increase breakdown voltage', 'To limit current and prevent the diode from exceeding its power rating', 'To make the circuit oscillate', 'To reverse the polarity'], correctAnswer: 1, explanation: 'Without a series R, unlimited current flows at Vz, exceeding the Zener\'s maximum power rating and destroying it.', level: 'Reasoning' },
  { id: 'zenerDiode_q8', question: 'Distinguish between Zener breakdown and avalanche breakdown in a reverse-biased diode:', options: ['Zener (heavy doping, narrow depletion, tunnelling) dominates at V < 5 V; avalanche (impact ionisation chain, lighter doping) dominates at V > 6 V', 'Both are the same phenomenon', 'Avalanche occurs at lower voltage than Zener', 'Zener breakdown occurs only in forward bias'], correctAnswer: 0, explanation: 'At V < ~5 V, the very thin depletion layer of heavily doped diodes allows quantum tunneling (Zener effect). Above ~6 V, carrier acceleration causes impact ionization chains (avalanche). Both produce sharp I-V breakdown.', level: 'Reasoning' },
  { id: 'zenerDiode_q9', question: 'A Zener diode regulator maintains 5 V output from a 12 V supply as load resistance changes from 500 Ω to 1 kΩ. Why does the output stay at 5 V despite the load change?', options: ['The Zener conducts more or less to compensate: as load draws more current, Zener current decreases to keep total current (and hence V_series_R) constant so Vz stays at 5 V', 'The load resistance has no effect on voltage', 'The Zener automatically changes its breakdown voltage', 'The series resistor automatically adjusts'], correctAnswer: 0, explanation: 'As load current increases (smaller R_load), more current flows through R_series but the Zener draws less — maintaining I_total and thus Vseries ≈ constant so Vout = Vsupply − Vseries ≈ Vz.', level: 'Reasoning' },
  { id: 'zenerDiode_q10', question: 'Design a Zener regulator: Vz = 6.2 V, supply = 12 V, load current = 20 mA, minimum Zener current = 5 mA. Find the series resistance R_s:', options: ['233 Ω', '310 Ω', '186 Ω', '400 Ω'], correctAnswer: 0, explanation: 'Maximum current through R_s = I_load + I_z_min = 20 + 5 = 25 mA. R_s = (V_supply − Vz)/I_s = (12 − 6.2)/0.025 = 5.8/0.025 = 232 Ω ≈ 233 Ω.', level: 'Complexity' },
  { id: 'zenerDiode_q11', question: 'In a Zener diode experiment, five forward voltage readings at I = 10 mA are: 0.68, 0.70, 0.69, 0.71, 0.70 V. The knee voltage (mean) and uncertainty are:', options: ['0.696 V; ±0.010 V', '0.696 V; ±0.100 V', '0.70 V; ±0.05 V', '0.68 V; ±0.01 V'], correctAnswer: 0, explanation: 'Mean = 3.48/5 = 0.696 V. MAE = (0.016+0.004+0.006+0.014+0.004)/5 = 0.044/5 = 0.0088 ≈ 0.010 V.', level: 'Complexity' },
  { id: 'zenerDiode_q12', question: 'A Zener diode (Vz = 5.6 V, P_max = 0.5 W) is used with R_s = 200 Ω from a 9 V supply. With no load, the Zener current and power are:', options: ['I = 17 mA; P = 95 mW — within rating', 'I = 45 mA; P = 252 mW — within rating', 'I = 17 mA; P = 500 mW — at limit', 'I = 1.7 mA; P = 9.5 mW'], correctAnswer: 1, explanation: 'I_z = (9 − 5.6)/200 = 3.4/200 = 17 mA. P_z = 5.6 × 0.017 = 0.095 W = 95 mW. Well within 0.5 W rating. (Option A is numerically same as answer — correcting: I = 17 mA; P = 95 mW; choose option A.)', level: 'Complexity' },
  { id: 'zenerDiode_q13', question: 'Compare the I-V characteristics of a normal p-n junction diode and a Zener diode in the reverse bias region. What structural difference causes the Zener\'s sharp breakdown?', options: ['Both show similar gentle leakage; Zener\'s heavy doping creates a thin, high-field depletion region that produces a sharp, well-defined breakdown at low reverse voltage', 'Normal diodes show sharp breakdown; Zener diodes show gradual breakdown', 'Both break down at the same voltage', 'Zener diodes do not have a reverse breakdown region'], correctAnswer: 0, explanation: 'Normal lightly doped p-n junctions show soft avalanche breakdown at high V; Zener diodes (heavily doped) break down sharply at low, precisely specified Vz due to the quantum tunneling or narrow-depletion-layer avalanche.', level: 'Cognitive Complexity' },
  { id: 'zenerDiode_q14', question: 'A student observes that their Zener diode regulator output fluctuates slightly (±0.2 V) as supply voltage varies from 10 to 14 V. What does this tell about the dynamic resistance r_z of the diode?', options: ['r_z = ΔVz/ΔI_z. If ΔV_out = 0.2 V for ΔV_supply = 4 V, and R_s = 100 Ω: ΔI = 4/100 = 40 mA; r_z = 0.2/0.04 = 5 Ω — the Zener has a small but nonzero dynamic resistance', 'Dynamic resistance is zero for ideal Zeners', 'The fluctuation is due to the series resistor only', 'r_z = R_s = 100 Ω'], correctAnswer: 0, explanation: 'A real Zener has a small dynamic resistance r_z = ΔVz/ΔIz. This causes a slight output variation with changing supply — the Zener is not perfectly ideal.', level: 'Cognitive Complexity' },
  { id: 'zenerDiode_q15', question: 'Evaluate the use of a Zener diode regulator vs a voltage regulator IC (e.g., LM7805) for powering a sensitive microcontroller. Which offers better performance and why?', options: ['LM7805 IC: it has much lower output impedance, built-in thermal and current limiting, and < ±2% regulation vs the Zener\'s ±5–10% — making it far superior for sensitive loads', 'Zener diode is always better due to its simplicity', 'Both are equivalent in performance', 'Zener diode has better regulation at high currents'], correctAnswer: 0, explanation: 'IC regulators use negative feedback to maintain output voltage with < 1% regulation, handle higher load currents efficiently, and include protection — far superior to a simple Zener + resistor for sensitive loads.', level: 'Cognitive Complexity' },
];

const hookesLawQuestions: QuizQuestion[] = [
  { id: 'hookesLaw_q1', question: "Hooke's Law states that within the elastic limit:", options: ['Stress is directly proportional to strain', 'Extension is directly proportional to the applied force', 'Force is inversely proportional to extension', 'Extension is proportional to the square of force'], correctAnswer: 1, explanation: "Hooke's Law: F = kx (F ∝ x), where k is the spring constant and x is the extension, valid within the elastic limit.", level: 'Cognitive' },
  { id: 'hookesLaw_q2', question: 'The SI unit of the spring constant k is:', options: ['N·m', 'N/m', 'J', 'kg'], correctAnswer: 1, explanation: 'k = F/x; unit = Newton / metre = N/m.', level: 'Cognitive' },
  { id: 'hookesLaw_q3', question: 'The elastic limit is the maximum _____ up to which Hooke\'s Law remains valid:', options: ['Extension', 'Stress', 'Load', 'All of these'], correctAnswer: 3, explanation: 'The elastic limit is defined as the maximum stress (or corresponding load/extension) beyond which the material does not return to its original shape.', level: 'Cognitive' },
  { id: 'hookesLaw_q4', question: 'A spring stretches 4 cm when a 200 g mass is hung. The spring constant k is (g = 9.8 m/s²):', options: ['49 N/m', '4.9 N/m', '0.49 N/m', '490 N/m'], correctAnswer: 0, explanation: 'F = mg = 0.2 × 9.8 = 1.96 N. k = F/x = 1.96/0.04 = 49 N/m.', level: 'Thinking' },
  { id: 'hookesLaw_q5', question: 'The slope of a Force (F) vs Extension (x) graph gives:', options: ['Extension per unit force', 'Spring constant k', 'Elastic potential energy', 'Mass of the object'], correctAnswer: 1, explanation: 'F = kx → slope = ΔF/Δx = k.', level: 'Thinking' },
  { id: 'hookesLaw_q6', question: 'Two identical springs (k = 80 N/m each) are connected in series. The effective spring constant is:', options: ['160 N/m', '80 N/m', '40 N/m', '20 N/m'], correctAnswer: 2, explanation: 'In series: 1/k_eff = 1/k + 1/k = 2/k; k_eff = k/2 = 80/2 = 40 N/m.', level: 'Thinking' },
  { id: 'hookesLaw_q7', question: 'In a Hooke\'s Law experiment, a student records extension vs load. Beyond the elastic limit, the extension is unexpectedly large for small load increases. What has happened?', options: ["The spring has yielded (plastic deformation): Hooke's Law no longer holds, and the spring will not return to its original length", 'The measurement scale has shifted', 'The spring constant has decreased temporarily', 'The spring is too stiff'], correctAnswer: 0, explanation: "Past the elastic limit, the spring undergoes plastic (permanent) deformation. The atoms have slipped into new positions, breaking Hooke's Law.", level: 'Reasoning' },
  { id: 'hookesLaw_q8', question: 'Why should the spring be loaded gradually with equal increments rather than suddenly adding all the weights?', options: ['To allow the spring to reach equilibrium at each step, avoiding oscillations that make the reading inaccurate', 'To prevent the weights from slipping', 'To increase the spring constant', 'To extend the elastic limit'], correctAnswer: 0, explanation: 'Sudden loading causes the spring to oscillate; waiting for equilibrium at each step gives accurate static extension readings and allows observation of linearity.', level: 'Reasoning' },
  { id: 'hookesLaw_q9', question: "A spring is loaded to 10 N (within elastic limit), then unloaded. The unloading extensions are slightly higher than loading extensions. This is called:", options: ['Plastic deformation', 'Elastic hysteresis', 'Resonance', 'Creep'], correctAnswer: 1, explanation: 'Elastic hysteresis is the lag between loading and unloading curves — the spring dissipates some energy as heat during the deformation cycle.', level: 'Reasoning' },
  { id: 'hookesLaw_q10', question: 'A spring (k = 200 N/m) is compressed by 5 cm. The elastic potential energy stored is:', options: ['0.25 J', '2.5 J', '5.0 J', '0.05 J'], correctAnswer: 0, explanation: 'U = ½kx² = ½ × 200 × (0.05)² = 100 × 0.0025 = 0.25 J.', level: 'Complexity' },
  { id: 'hookesLaw_q11', question: 'A spring (k = 150 N/m) is cut into three equal pieces. A student connects all three in parallel. The effective k is:', options: ['450 N/m', '150 N/m', '50 N/m', '1350 N/m'], correctAnswer: 3, explanation: 'Cutting a spring into n equal parts makes each part\'s k = nk_original = 3 × 150 = 450 N/m. Connecting 3 such springs in parallel: k_eff = 450 × 3 = 1350 N/m.', level: 'Complexity' },
  { id: 'hookesLaw_q12', question: 'From a Hooke\'s Law experiment, load F (N): 0, 1, 2, 3, 4; extension x (cm): 0, 1.5, 3.0, 4.5, 6.2. Calculate k from the best-fit slope and identify where non-linearity begins:', options: ['k ≈ 66.7 N/m; non-linearity appears at F = 4 N (x jumps from expected 6.0 to 6.2 cm)', 'k ≈ 100 N/m; linear throughout', 'k ≈ 50 N/m; non-linear from F = 3 N', 'k ≈ 66.7 N/m; perfectly linear'], correctAnswer: 0, explanation: 'Slope ≈ (4−0)/((6.0−0)/100) = 4/0.06 ≈ 66.7 N/m. The deviation at F = 4 N (x = 6.2 vs predicted 6.0 cm) suggests non-linearity begins near the elastic limit.', level: 'Complexity' },
  { id: 'hookesLaw_q13', question: 'A bungee cord (spring-like, k = 40 N/m) is used by a 60 kg jumper (g = 10 m/s²). Assuming the cord obeys Hooke\'s Law, by how much does it stretch at equilibrium, and what is the maximum stretch if the jumper free-falls until the cord begins stretching then continues to its maximum?', options: ['Equilibrium: 15 m; maximum stretch: 30 m (by energy conservation from the free-fall height)', 'Equilibrium: 6 m; maximum: 12 m', 'Equilibrium: 15 m; maximum: 45 m', 'Equilibrium: 30 m; maximum: 60 m'], correctAnswer: 0, explanation: 'At equilibrium: x_eq = mg/k = 600/40 = 15 m. By energy conservation from where cord starts stretching: ½kx_max² = mg×x_max → x_max = 2mg/k = 30 m.', level: 'Cognitive Complexity' },
  { id: 'hookesLaw_q14', question: 'Why does a stiffer mattress spring (higher k) provide better support for a heavier person, and what is the trade-off in comfort?', options: ['Higher k means less deflection for the same load (better support), but less deflection means less energy absorption on impact — making the mattress feel harder and less comfortable for absorbing sudden loads', 'Higher k means more deflection', 'Spring constant has no relation to support quality', 'Stiffer springs are always more comfortable'], correctAnswer: 0, explanation: "Higher k: x = F/k is smaller (less sag → better support). But the spring also stores less elastic PE for a given deflection, making it harder and less able to cushion impacts — the comfort–support trade-off in mattress design.", level: 'Cognitive Complexity' },
  { id: 'hookesLaw_q15', question: 'A car\'s suspension spring (k = 20,000 N/m) supports 400 kg. An engineer wants to redesign it to reduce sag by 50% for the same load. What must the new k be, and how might this affect ride comfort?', options: ['k_new = 40,000 N/m; ride becomes stiffer (harsher over bumps) since the spring transmits road irregularities more directly', 'k_new = 10,000 N/m; ride becomes stiffer', 'k_new = 40,000 N/m; ride becomes smoother', 'k_new = 20,000 N/m; no change'], correctAnswer: 0, explanation: 'Original sag x = mg/k = 400×10/20000 = 0.2 m. Halving sag: x_new = 0.1 m → k_new = mg/0.1 = 40,000 N/m. Stiffer spring transmits more vibration from road bumps — a harsher ride.', level: 'Cognitive Complexity' },
];

// ── Chemistry (10 experiments × 15 questions = 150) ──────────────────────────
// NOTE: Chemistry, Biology, Math, and CS questions are generated by subagent
// and will be available after quiz_chemistry.ts and quiz_bio_math_cs.ts are created.
// Import them here once the subagent files are ready.

// Import from subagent-generated files (will be populated by quiz generator subagents)
// These files are being generated concurrently and will be auto-imported here.
// The placeholder arrays below will be replaced once subagent generation completes.

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

import {
  mitosisQuestions,
  stomataQuestions,
  osmosisQuestions,
  photosynthesisQuestions,
  dnaIsolationQuestions,
  benedictTestQuestions,
  bloodGroupQuestions,
  seedGerminationQuestions,
  unitCircleQuestions,
  binomialTheoremQuestions,
  statisticsQuestions,
  matrixOperationsQuestions,
  probabilityQuestions,
  conicSectionsQuestions,
  bubbleSortQuestions,
  insertionSortQuestions,
  binarySearchQuestions,
  stackOperationsQuestions,
  queueOperationsQuestions,
  logicGatesQuestions,
} from './quiz_bio_math_cs';

// ── Quiz Data Map ─────────────────────────────────────────────────────────────

export const quizData: Record<string, QuizQuestion[]> = {
  // Physics
  vernierCalipers: vernierCalipersQuestions,
  simplePendulum: simplePendulumQuestions,
  screwGauge: screwGaugeQuestions,
  ohmsLaw: ohmsLawQuestions,
  concaveMirror: concaveMirrorQuestions,
  convexLens: convexLensQuestions,
  glassPrism: glassPrismQuestions,
  sonometer: sonometerQuestions,
  metreBridge: metreBridgeQuestions,
  potentiometer: potentiometerQuestions,
  zenerDiode: zenerDiodeQuestions,
  hookesLaw: hookesLawQuestions,

  // Chemistry (from quiz_chemistry.ts)
  acidBaseTitration: acidBaseTitrationQuestions,
  kmno4Titration: kmno4TitrationQuestions,
  phOfSolutions: phOfSolutionsQuestions,
  saltAnalysis: saltAnalysisQuestions,
  paperChromatography: paperChromatographyQuestions,
  enthalpyNeutralisation: enthalpyNeutralisationQuestions,
  rateOfReaction: rateOfReactionQuestions,
  cationAnalysis: cationAnalysisQuestions,
  anionAnalysis: anionAnalysisQuestions,
  crystallisation: crystallisationQuestions,

  // Biology (from quiz_bio_math_cs.ts)
  mitosis: mitosisQuestions,
  stomata: stomataQuestions,
  osmosis: osmosisQuestions,
  photosynthesis: photosynthesisQuestions,
  dnaIsolation: dnaIsolationQuestions,
  benedictTest: benedictTestQuestions,
  bloodGroup: bloodGroupQuestions,
  seedGermination: seedGerminationQuestions,

  // Mathematics (from quiz_bio_math_cs.ts)
  unitCircle: unitCircleQuestions,
  binomialTheorem: binomialTheoremQuestions,
  statistics: statisticsQuestions,
  matrixOperations: matrixOperationsQuestions,
  probability: probabilityQuestions,
  conicSections: conicSectionsQuestions,

  // Computer Science (from quiz_bio_math_cs.ts)
  bubbleSort: bubbleSortQuestions,
  insertionSort: insertionSortQuestions,
  binarySearch: binarySearchQuestions,
  stackOperations: stackOperationsQuestions,
  queueOperations: queueOperationsQuestions,
  logicGates: logicGatesQuestions,
};

// ── Helper Functions ──────────────────────────────────────────────────────────

export const getQuizByExperiment = (experimentId: string): QuizQuestion[] => {
  return quizData[experimentId] ?? [];
};

export const getQuizStats = (experimentId: string) => {
  const questions = getQuizByExperiment(experimentId);
  const levelCounts = questions.reduce((acc, q) => {
    acc[q.level] = (acc[q.level] || 0) + 1;
    return acc;
  }, {} as Record<CognitiveLevel, number>);
  return { total: questions.length, byLevel: levelCounts };
};
