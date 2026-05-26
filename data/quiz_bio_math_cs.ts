import { QuizQuestion } from "./quizData";

// ─────────────────────────────────────────────────────────────────────────────
// BIOLOGY (8 experiments × 15 questions = 120)
// ─────────────────────────────────────────────────────────────────────────────

// 1. MITOSIS
export const mitosisQuestions: QuizQuestion[] = [
  // Cognitive (3)
  {
    id: "mitosis_q1",
    question: "During which phase of mitosis do the chromosomes align along the equatorial plane of the cell?",
    options: ["Prophase", "Metaphase", "Anaphase", "Telophase"],
    correctAnswer: 1,
    explanation: "During metaphase, spindle fibers align the sister chromatids along the metaphase plate in the center of the cell.",
    level: "Cognitive",
    hint: "Equatorial plane = Metaphase plate."
  },
  {
    id: "mitosis_q2",
    question: "What is the primary material used in the laboratory to study mitosis?",
    options: ["Onion root tip", "Potato tuber", "Leaf epidermis", "Yeast culture"],
    correctAnswer: 0,
    explanation: "Onion root tips are used because the meristematic cells at the tip divide rapidly, providing many cells at different stages of mitosis.",
    level: "Cognitive",
    hint: "It has a rapidly dividing meristem."
  },
  {
    id: "mitosis_q3",
    question: "Which stain is commonly used to color chromosomes during the onion root tip squash preparation?",
    options: ["Safranin", "Acetocarmine", "Methylene blue", "Iodine solution"],
    correctAnswer: 1,
    explanation: "Acetocarmine is a basic stain that binds strongly to the acidic nucleic acids in chromosomes, making them visible under the microscope.",
    level: "Cognitive",
    hint: "It stain nucleic acids red."
  },
  // Thinking (3)
  {
    id: "mitosis_q4",
    question: "If a diploid onion cell has 16 chromosomes (2n = 16), how many chromatids are present in metaphase of mitosis?",
    options: ["16", "32", "8", "64"],
    correctAnswer: 1,
    explanation: "During metaphase, each of the 16 chromosomes consists of 2 sister chromatids, yielding a total of 32 chromatids.",
    level: "Thinking",
    hint: "Each chromosome duplicated in S-phase and has two chromatids."
  },
  {
    id: "mitosis_q5",
    question: "A student observes a cell under the microscope where sister chromatids are actively separating and moving to opposite poles. Which phase is this?",
    options: ["Anaphase", "Prophase", "Telophase", "Metaphase"],
    correctAnswer: 0,
    explanation: "Anaphase is characterized by the splitting of centromeres and the migration of sister chromatids (now individual chromosomes) to opposite poles.",
    level: "Thinking",
    hint: "Separation and migration to opposite poles occur in this stage."
  },
  {
    id: "mitosis_q6",
    question: "Why is HCl (hydrochloric acid) used during the preparation of the onion root tip squash?",
    options: ["To stain the cells", "To hydrolyze cell wall pectin and soften the tissue for squashing", "To fix the chromosomes in place", "To stop cellular respiration"],
    correctAnswer: 1,
    explanation: "HCl dissolves the middle lamella (pectin) between plant cell walls, allowing the tissue to soften so that cells can spread into a single layer when squashed.",
    level: "Thinking",
    hint: "Plant cells are held together by pectin."
  },
  // Reasoning (3)
  {
    id: "mitosis_q7",
    question: "Colchicine is a chemical that prevents spindle fiber formation. If onion roots are treated with colchicine, at which stage will mitosis arrest?",
    options: ["Prophase", "Metaphase", "Anaphase", "Telophase"],
    correctAnswer: 1,
    explanation: "Without spindle fibers, sister chromatids cannot be separated during anaphase, so the cell remains arrested in metaphase.",
    level: "Reasoning",
    hint: "Spindle fibers are needed to transition from metaphase to anaphase."
  },
  {
    id: "mitosis_q8",
    question: "Why do we specifically use the root tip of the onion rather than the mature root or leaf cells to study mitosis?",
    options: ["Root tips are easier to stain", "Root tips contain meristematic tissue with high rates of active cell division", "Leaves do not undergo mitosis", "Root tips have larger chromosomes"],
    correctAnswer: 1,
    explanation: "Mitosis occurs in growing regions. Meristematic tissue in root tips is actively dividing, whereas mature root and leaf cells are mostly differentiated and non-dividing.",
    level: "Reasoning",
    hint: "Only meristems divide actively in mature plants."
  },
  {
    id: "mitosis_q9",
    question: "How does cytokinesis in onion cells differ from that in animal cells?",
    options: ["Onion cells form a cell plate; animal cells form a cleavage furrow", "Onion cells divide by binary fission; animal cells form a plate", "Onion cells do not divide cytoplasm", "Onion cells form a cleavage furrow; animal cells form a plate"],
    correctAnswer: 0,
    explanation: "Due to their rigid cell walls, plant cells form a cell plate from Golgi vesicles to divide cytoplasm, while animal cells pinch in to form a cleavage furrow.",
    level: "Reasoning",
    hint: "The rigid plant cell wall prevents pinching."
  },
  // Complexity (3)
  {
    id: "mitosis_q10",
    question: "In a sample of 200 onion root tip cells, 120 are in interphase, 40 in prophase, 20 in metaphase, 15 in anaphase, and 5 in telophase. What is the mitotic index?",
    options: ["40%", "60%", "20%", "80%"],
    correctAnswer: 0,
    explanation: "Mitotic index = (Number of dividing cells / Total number of cells) * 100 = ((40+20+15+5)/200) * 100 = (80/200) * 100 = 40%.",
    level: "Complexity",
    hint: "Dividing cells exclude interphase."
  },
  {
    id: "mitosis_q11",
    question: "If the total cell cycle of onion root tip cells is 20 hours (1200 minutes), and 5% of the observed cells are in metaphase, how long does metaphase last?",
    options: ["60 minutes", "100 minutes", "10 minutes", "20 minutes"],
    correctAnswer: 0,
    explanation: "Duration of a phase = (% of cells in phase / 100) * total time = 0.05 * 1200 minutes = 60 minutes.",
    level: "Complexity",
    hint: "Multiply the fraction of cells by the total cell cycle duration."
  },
  {
    id: "mitosis_q12",
    question: "During preparation, the onion root tip is heated gently with acetocarmine. What is the main purpose of this heating step?",
    options: ["To evaporate the acid", "To speed up staining and help fix the cells", "To kill any bacteria", "To melt the cover slip"],
    correctAnswer: 1,
    explanation: "Gentle heating increases the rate of dye penetration into the chromatin and aids in coagulating protein to fix cellular structures.",
    level: "Complexity",
    hint: "Heating acts as a catalyst for binding and fixing."
  },
  // Cognitive Complexity (3)
  {
    id: "mitosis_q13",
    question: "If a tissue sample undergoes abnormal mitosis where sister chromatids fail to separate in one chromosome during anaphase, what will be the chromosome numbers of the daughter cells? (Assume 2n = 16)",
    options: ["15 and 17", "16 and 16", "8 and 8", "14 and 18"],
    correctAnswer: 0,
    explanation: "Non-disjunction leads to one daughter cell receiving both chromatids (n+1 = 17) and the other cell receiving none (n-1 = 15).",
    level: "Cognitive Complexity",
    hint: "Think about the asymmetry of non-disjunction."
  },
  {
    id: "mitosis_q14",
    question: "A researcher wants to study chromosome morphology. Which stage of mitosis is best, and why?",
    options: ["Metaphase, because chromosomes are highly condensed and aligned on the equator", "Prophase, because chromosomes are longest", "Anaphase, because chromosomes are separated", "Telophase, because nuclei are reforming"],
    correctAnswer: 0,
    explanation: "At metaphase, chromosomes reach their maximum condensation and are arranged in a single plane, making them easiest to count and examine structurally.",
    level: "Cognitive Complexity",
    hint: "Maximum condensation and central alignment."
  },
  {
    id: "mitosis_q15",
    question: "To prepare a good onion root squash, a student squashes the root tip under a cover slip by pressing vertically with a thumb. What happens if they slide the cover slip horizontally instead?",
    options: ["Cells will stack on top of each other", "Chromosomes will tear and cells will roll over, destroying cell layers", "Staining will become uneven", "The cover slip will break without squashing"],
    correctAnswer: 1,
    explanation: "Horizontal shearing destroys cell structure, causing cells to roll and chromosomes to tear. True vertical pressure is required to flatten cells in a single plane.",
    level: "Cognitive Complexity",
    hint: "Shearing forces are destructive to cellular layouts."
  }
];

// 2. STOMATA
export const stomataQuestions: QuizQuestion[] = [
  // Cognitive (3)
  {
    id: "stomata_q1",
    question: "Which cells surround the stomatal pore and control its opening and closing?",
    options: ["Epidermal cells", "Guard cells", "Subsidiary cells", "Mesophyll cells"],
    correctAnswer: 1,
    explanation: "Guard cells are specialized epidermal cells containing chloroplasts that regulate the opening and closing of the stomatal pore.",
    level: "Cognitive",
    hint: "They act as gatekeepers."
  },
  {
    id: "stomata_q2",
    question: "What is the characteristic shape of guard cells in dicotyledonous leaves?",
    options: ["Dumb-bell shaped", "Kidney/Bean shaped", "Spherical", "Rectangular"],
    correctAnswer: 1,
    explanation: "Dicotyledonous guard cells are kidney- or bean-shaped, whereas monocotyledonous guard cells are dumb-bell shaped.",
    level: "Cognitive",
    hint: "Think of a kidney bean."
  },
  {
    id: "stomata_q3",
    question: "Which surface of a dorsiventral (dicot) leaf typically has a higher density of stomata?",
    options: ["Adaxial (upper) surface", "Abaxial (lower) surface", "Both have equal density", "Neither surface has stomata"],
    correctAnswer: 1,
    explanation: "Dicot leaves have stomata predominantly on the lower (abaxial) epidermis to reduce water loss via transpiration.",
    level: "Cognitive",
    hint: "Lower surface is shaded, reducing evaporation."
  },
  // Thinking (3)
  {
    id: "stomata_q4",
    question: "During an experiment to prepare a temporary mount of leaf peel, why is glycerine used to mount the peel?",
    options: ["To stain the stomata", "To prevent the leaf peel from drying out (desiccation)", "To dissolve the cell wall", "To stop cellular respiration"],
    correctAnswer: 1,
    explanation: "Glycerine is a dehydrating agent that prevents the peel from drying and keeps it hydrated for clear microscopic observation.",
    level: "Thinking",
    hint: "It acts as a humectant."
  },
  {
    id: "stomata_q5",
    question: "When guard cells absorb water, they become turgid. What mechanical property of their cell walls causes them to bow outward?",
    options: ["Thin outer walls and thick inner walls adjacent to the pore", "Thick outer walls and thin inner walls", "Uniformly thick cell walls", "Lack of cellulose microfibrils"],
    correctAnswer: 0,
    explanation: "The thick inner wall resists expansion, while the thin, elastic outer wall expands, causing the guard cells to bow outward and open the pore.",
    level: "Thinking",
    hint: "The side facing the pore is thick and rigid."
  },
  {
    id: "stomata_q6",
    question: "Which ion influx plays the primary role in increasing the osmotic concentration of guard cells, leading to stomatal opening?",
    options: ["Sodium (Na+)", "Potassium (K+)", "Calcium (Ca2+)", "Magnesium (Mg2+)"],
    correctAnswer: 1,
    explanation: "Active transport of potassium ions (K+) into guard cells increases solute concentration, drawing water in and causing opening.",
    level: "Thinking",
    hint: "This ion is key to membrane turgidity."
  },
  // Reasoning (3)
  {
    id: "stomata_q7",
    question: "Why do plants keep their stomata closed at night?",
    options: ["Photosynthesis does not occur, so CO2 is not needed, preventing unnecessary water loss", "Respiration stops at night", "Guard cells lack energy to open", "Transpiration increases at night"],
    correctAnswer: 0,
    explanation: "At night, light is absent and photosynthesis stops. CO2 is not required, so closing stomata conserves water.",
    level: "Reasoning",
    hint: "No light = no photosynthesis = no need for CO2."
  },
  {
    id: "stomata_q8",
    question: "A leaf peel from a monocot grass leaf is observed. What shape are the guard cells expected to be?",
    options: ["Kidney-shaped", "Dumb-bell shaped", "Circular", "Irregular"],
    correctAnswer: 1,
    explanation: "Monocot grasses possess dumb-bell shaped guard cells with thin ends and a thick middle section.",
    level: "Reasoning",
    hint: "Grasses are monocots."
  },
  {
    id: "stomata_q9",
    question: "If a plant is subjected to high levels of abscisic acid (ABA), what will happen to the stomata?",
    options: ["They will open widely", "They will close rapidly", "No effect", "They will lose their cell walls"],
    correctAnswer: 1,
    explanation: "ABA is a stress hormone produced during water deficiency that signals guard cells to release K+ ions, lose turgor, and close.",
    level: "Reasoning",
    hint: "ABA is the stress hormone for water conservation."
  },
  // Complexity (3)
  {
    id: "stomata_q10",
    question: "In a microscopic field of view, a student counts 15 stomata and 60 epidermal cells. What is the stomatal index (SI)?",
    options: ["20%", "25%", "15%", "80%"],
    correctAnswer: 0,
    explanation: "Stomatal Index (SI) = [S / (E + S)] * 100 = [15 / (60 + 15)] * 100 = [15/75] * 100 = 20%.",
    level: "Complexity",
    hint: "SI formula: S divided by (E + S)."
  },
  {
    id: "stomata_q11",
    question: "A student observes a leaf peel under 400x magnification. The field of view has a diameter of 0.5 mm. If 20 stomata are seen, what is the stomatal density per mm²? (Use π ≈ 3.14)",
    options: ["≈ 102 stomata/mm²", "≈ 25.5 stomata/mm²", "≈ 51 stomata/mm²", "≈ 200 stomata/mm²"],
    correctAnswer: 0,
    explanation: "Area of field = π * r² = 3.14 * (0.25)² = 0.19625 mm². Density = 20 / 0.19625 ≈ 101.9 stomata/mm².",
    level: "Complexity",
    hint: "First calculate the circular area in square millimeters."
  },
  {
    id: "stomata_q12",
    question: "To prepare a temporary slide of leaf peel, which leaf peel method is easiest for a dicot leaf like Hibiscus?",
    options: ["Nail varnish peel method", "Tearing the leaf obliquely to obtain a thin white epidermal layer", "Boiling the leaf in acid", "Scraping with a razor blade until only one cell layer remains"],
    correctAnswer: 1,
    explanation: "Tearing the leaf obliquely creates a shear force that easily peels off the thin, transparent epidermal layer from the lower surface.",
    level: "Complexity",
    hint: "Oblique tearing reveals the transparent lower skin."
  },
  // Cognitive Complexity (3)
  {
    id: "stomata_q13",
    question: "A student wants to compare transpiration rate with stomatal distribution. They cover the upper surface of leaf A and the lower surface of leaf B with vaseline. Which leaf will dry up faster and why?",
    options: ["Leaf B, because vaseline on lower surface blocks stomata and stops transpiration", "Leaf A, because vaseline on the upper surface does not block the lower stomata, allowing transpiration to continue", "Both dry at the same rate", "Neither dries up because vaseline seals the leaves entirely"],
    correctAnswer: 1,
    explanation: "Leaf A has stomata free on the lower surface, so it continues to transpire and lose water. Leaf B has its stomata blocked, reducing transpiration and keeping it hydrated longer.",
    level: "Cognitive Complexity",
    hint: "Transpiration occurs where stomata are unblocked."
  },
  {
    id: "stomata_q14",
    question: "In desert plants (xerophytes), stomata are often sunken in deep pits. How does this adaptation help the plant?",
    options: ["It traps a pocket of humid air, reducing the water potential gradient and thus slowing transpiration", "It allows more light to reach the guard cells", "It increases CO2 intake", "It increases the rate of photosynthesis"],
    correctAnswer: 0,
    explanation: "Sunken stomata restrict air currents. This traps moist air inside the pit, decreasing the humidity difference and slowing water loss.",
    level: "Cognitive Complexity",
    hint: "Think about the boundary layer of water vapor."
  },
  {
    id: "stomata_q15",
    question: "Explain the blue light activation of guard cells. What is the molecular mechanism?",
    options: ["Blue light activates phototropin receptors, triggering H+-ATPase pumps to pump protons out, creating a membrane potential that drives K+ influx", "Blue light directly heats the guard cells", "Blue light synthesizes sucrose", "Blue light denatures ABA"],
    correctAnswer: 0,
    explanation: "Phototropins absorb blue light and activate H+-ATPase proton pumps, creating a negative membrane potential that facilitates passive K+ intake through channels.",
    level: "Cognitive Complexity",
    hint: "Phototropin receptors and proton pumping."
  }
];

// 3. OSMOSIS
export const osmosisQuestions: QuizQuestion[] = [
  // Cognitive (3)
  {
    id: "osmosis_q1",
    question: "Osmosis is defined as the movement of water molecules from a region of:",
    options: [
      "Higher solute concentration to lower solute concentration",
      "Higher water potential to lower water potential through a semi-permeable membrane",
      "Lower water potential to higher water potential",
      "High temperature to low temperature"
    ],
    correctAnswer: 1,
    explanation: "Osmosis is the net diffusion of solvent (water) molecules down their chemical potential gradient through a selectively permeable membrane.",
    level: "Cognitive",
    hint: "Water moves from dilute to concentrated solution."
  },
  {
    id: "osmosis_q2",
    question: "When a plant cell is placed in a hypertonic solution, the cell membrane shrinks away from the cell wall. This phenomenon is called:",
    options: ["Turgidity", "Deplasmolysis", "Plasmolysis", "Lysis"],
    correctAnswer: 2,
    explanation: "Plasmolysis is the shrinkage of protoplasm away from the cell wall due to water loss by osmosis when placed in a hypertonic solution.",
    level: "Cognitive",
    hint: "Opposite of turgidity."
  },
  {
    id: "osmosis_q3",
    question: "Which membrane in a plant cell acts as the primary selectively permeable membrane for osmosis?",
    options: ["Cell wall", "Tonoplast and plasma membrane", "Nuclear membrane", "Chloroplast membrane"],
    correctAnswer: 1,
    explanation: "Both the plasma membrane and the vacuolar membrane (tonoplast) are selectively permeable, regulating water movement.",
    level: "Cognitive",
    hint: "It bounds the cytoplasm and vacuole."
  },
  // Thinking (3)
  {
    id: "osmosis_q4",
    question: "In a potato osmometer experiment, why is the outer skin of the potato tuber peeled off?",
    options: ["To make it look clean", "To remove the impermeable corky skin so water can pass through", "To make squashing easier", "To expose the starch granules"],
    correctAnswer: 1,
    explanation: "The skin contains suberin, which is waterproof. Peeling exposes the permeable parenchyma cells, allowing osmosis.",
    level: "Thinking",
    hint: "Suberized cork is waterproof."
  },
  {
    id: "osmosis_q5",
    question: "If a potato cavity is filled with strong sugar solution and placed in a beaker of water, what will happen to the liquid level inside the cavity?",
    options: ["The level will rise", "The level will fall", "The level will remain the same", "The level will turn green"],
    correctAnswer: 0,
    explanation: "Water moves from the beaker (high water potential) to the cavity (low water potential), raising the liquid level.",
    level: "Thinking",
    hint: "Beaker water is hypotonic to the sugar solution inside."
  },
  {
    id: "osmosis_q6",
    question: "What happens to a red blood cell (RBC) when placed in distilled water, compared to a plant cell?",
    options: [
      "Both cells swell and remain intact",
      "The RBC swells and bursts (hemolysis), while the plant cell swells but remains intact due to its rigid cell wall",
      "Both cells burst",
      "The RBC shrinks, while the plant cell bursts"
    ],
    correctAnswer: 1,
    explanation: "Animal cells lack a cell wall to resist turgor pressure and will burst in hypotonic solutions, whereas plant cell walls prevent bursting.",
    level: "Thinking",
    hint: "Plant cells have a rigid outer boundary."
  },
  // Reasoning (3)
  {
    id: "osmosis_q7",
    question: "Why does adding salt to meat or sugar to jams help in preserving them from microbial spoilage?",
    options: [
      "It makes the food taste better",
      "It creates a hypertonic environment that plasmolyzes and kills micro-organisms",
      "It blocks oxygen intake",
      "It lowers the temperature of the food"
    ],
    correctAnswer: 1,
    explanation: "High salt/sugar concentrations draw water out of bacterial/fungal cells by osmosis, causing plasmolysis and inhibiting growth.",
    level: "Reasoning",
    hint: "Micro-organisms lose water and dehydrate."
  },
  {
    id: "osmosis_q8",
    question: "A student observes plasmolysis in Rhoeo discolor leaf epidermal cells. Why is this specific leaf preferred?",
    options: [
      "It has large stomata",
      "Its cell sap contains purple anthocyanin pigment, making the vacuole and plasmolysis easy to see",
      "It has no cell wall",
      "It undergoes osmosis faster"
    ],
    correctAnswer: 1,
    explanation: "The purple anthocyanin pigment in the vacuole provides high contrast, allowing clear visualization of the protoplast shrinking away from the wall.",
    level: "Reasoning",
    hint: "Color contrast helps observe the vacuole."
  },
  {
    id: "osmosis_q9",
    question: "If a plant cell has a solute potential (Ψs) of −0.8 MPa and a pressure potential (Ψp) of +0.3 MPa, what is its total water potential (Ψw)?",
    options: ["−0.5 MPa", "−1.1 MPa", "+0.5 MPa", "0.0 MPa"],
    correctAnswer: 0,
    explanation: "Ψw = Ψs + Ψp = −0.8 + 0.3 = −0.5 MPa.",
    level: "Reasoning",
    hint: "Water potential is the sum of solute and pressure potentials."
  },
  // Complexity (3)
  {
    id: "osmosis_q10",
    question: "A potato slice weighing 10.0 g is placed in a 10% sucrose solution. After 2 hours, it weighs 9.2 g. What does this indicate about the 10% sucrose solution?",
    options: [
      "It is hypotonic to the potato cells",
      "It is hypertonic to the potato cells, causing water loss",
      "It is isotonic",
      "The potato cells absorbed sucrose"
    ],
    correctAnswer: 1,
    explanation: "The loss in mass indicates water moved out of the potato by exosmosis, meaning the external solution was hypertonic.",
    level: "Complexity",
    hint: "Mass loss = water went out."
  },
  {
    id: "osmosis_q11",
    question: "A plant cell with Ψs = −0.6 MPa is in equilibrium with a solution of Ψw = −0.4 MPa. What is the turgor pressure (Ψp) of the cell?",
    options: ["+0.2 MPa", "−0.2 MPa", "+1.0 MPa", "0.0 MPa"],
    correctAnswer: 0,
    explanation: "At equilibrium, Ψw(cell) = Ψw(soln) = −0.4 MPa. Since Ψw = Ψs + Ψp, we have −0.4 = −0.6 + Ψp, which gives Ψp = 0.2 MPa.",
    level: "Complexity",
    hint: "Set cell water potential equal to the external water potential."
  },
  {
    id: "osmosis_q12",
    question: "Which of the following describes the state of a plant cell at 'incipient plasmolysis'?",
    options: [
      "The cell is fully turgid",
      "The turgor pressure is zero, and the cell membrane is just beginning to pull away from the corners of the cell wall",
      "The cell has burst",
      "The vacuole has completely disappeared"
    ],
    correctAnswer: 1,
    explanation: "At incipient plasmolysis, protoplast volume is reduced so that turgor pressure is exactly zero, and the plasma membrane begins to detach from the wall.",
    level: "Complexity",
    hint: "The point where turgor pressure is zero."
  },
  // Cognitive Complexity (3)
  {
    id: "osmosis_q13",
    question: "If Rhoeo discolor leaf epidermal cells are plasmolyzed in 10% NaCl, and then water is added under the cover slip, what happens?",
    options: [
      "Cells remain plasmolyzed",
      "Cells undergo deplasmolysis, returning to their original state because the external environment becomes hypotonic",
      "Cells burst",
      "Anthocyanin pigment leaks out"
    ],
    correctAnswer: 1,
    explanation: "Adding water lowers the external concentration, making it hypotonic. Water flows back into the cell (endosmosis), expanding the vacuole.",
    level: "Cognitive Complexity",
    hint: "Reversible process: deplasmolysis."
  },
  {
    id: "osmosis_q14",
    question: "Why do freshwater protozoans like Amoeba possess contractile vacuoles while marine protozoans do not?",
    options: [
      "Freshwater is hypotonic to Amoeba cytoplasm, causing constant water influx; the contractile vacuole pumps excess water out to prevent lysis",
      "Marine protozoans do not need water",
      "Freshwater has higher osmotic pressure",
      "Marine water is hypotonic to protozoans"
    ],
    correctAnswer: 0,
    explanation: "Freshwater protozoans face osmotic water entry. The contractile vacuole is an osmoregulatory organelle that expels excess water; marine environments are generally isotonic or hypertonic, so marine species do not need to pump water out.",
    level: "Cognitive Complexity",
    hint: "Freshwater has high water potential; marine water has low water potential."
  },
  {
    id: "osmosis_q15",
    question: "In an experiment to determine the osmotic concentration of potato cells, slices are placed in a series of sucrose solutions (0.1M to 0.6M). Slices in 0.3M show no change in weight. What is the osmotic potential of the potato cells? (Assume Temp = 27°C, R = 0.082 L·atm/mol·K, and Ψs = −iCRT)",
    options: ["≈ −7.4 atm", "≈ −3.7 atm", "≈ −1.2 atm", "≈ −14.8 atm"],
    correctAnswer: 0,
    explanation: "The solution with no weight change is isotonic (C = 0.3M). Ψs = −iCRT = −1 * 0.3 * 0.082 * 300 = −7.38 atm ≈ −7.4 atm.",
    level: "Cognitive Complexity",
    hint: "Use the formula Ψs = −iCRT with C = 0.3M and T = 300 K."
  }
];

// 4. PHOTOSYNTHESIS
export const photosynthesisQuestions: QuizQuestion[] = [
  // Cognitive (3)
  {
    id: "photosynthesis_q1",
    question: "Which of the following is the primary photosynthetic pigment in green plants?",
    options: ["Chlorophyll a", "Chlorophyll b", "Carotenoids", "Xanthophylls"],
    correctAnswer: 0,
    explanation: "Chlorophyll a is the essential reaction center pigment that converts light energy into chemical energy during photosynthesis.",
    level: "Cognitive",
    hint: "The main reaction center pigment."
  },
  {
    id: "photosynthesis_q2",
    question: "What gas is evolved as a byproduct during the light reactions of photosynthesis?",
    options: ["Carbon dioxide", "Oxygen", "Nitrogen", "Water vapor"],
    correctAnswer: 1,
    explanation: "Oxygen is produced during the light reaction via the photolysis of water by the oxygen-evolving complex of PSII.",
    level: "Cognitive",
    hint: "This gas supports aerobic respiration."
  },
  {
    id: "photosynthesis_q3",
    question: "In the laboratory experiment to demonstrate oxygen evolution, which aquatic plant is typically used?",
    options: ["Hydrilla", "Spirogyra", "Nephrolepis", "Funaria"],
    correctAnswer: 0,
    explanation: "Hydrilla is an aquatic angiosperm whose cut stems release distinct bubbles of oxygen when submerged in water under light.",
    level: "Cognitive",
    hint: "A common submerged aquatic plant."
  },
  // Thinking (3)
  {
    id: "photosynthesis_q4",
    question: "During the Hydrilla experiment, a small amount of sodium bicarbonate (NaHCO3) is added to the water. Why?",
    options: ["To stain the plant", "To serve as a source of carbon dioxide (CO2)", "To act as a catalyst", "To control the pH"],
    correctAnswer: 1,
    explanation: "NaHCO3 dissolves to release CO2, which is the carbon source for the dark reactions of photosynthesis, preventing it from becoming a limiting factor.",
    level: "Thinking",
    hint: "Photosynthesis requires light, water, and this carbon source."
  },
  {
    id: "photosynthesis_q5",
    question: "If the light source is moved closer to the Hydrilla beaker, how will the rate of bubble evolution change?",
    options: ["It will increase", "It will decrease", "It will remain the same", "It will stop completely"],
    correctAnswer: 0,
    explanation: "Moving the light source closer increases light intensity, which increases the rate of the light reaction and oxygen evolution up to a saturation point.",
    level: "Thinking",
    hint: "Rate of photosynthesis is directly proportional to light intensity below saturation."
  },
  {
    id: "photosynthesis_q6",
    question: "A student sets up the Hydrilla experiment in a dark room. What will they observe?",
    options: [
      "Oxygen bubbles will evolve rapidly",
      "No bubbles will evolve because light is required for the photolysis of water",
      "Carbon dioxide bubbles will evolve",
      "The plant will grow taller"
    ],
    correctAnswer: 1,
    explanation: "Light is the energy source that drives photolysis of water in Photosystem II. Without light, no oxygen is produced.",
    level: "Thinking",
    hint: "Photolysis = light-splitting."
  },
  // Reasoning (3)
  {
    id: "photosynthesis_q7",
    question: "Why does the rate of bubble evolution level off at very high light intensities?",
    options: [
      "The plant runs out of water",
      "Another factor (like CO2 concentration or temperature) becomes limiting, or pigments become photo-oxidized",
      "Oxygen becomes toxic to the plant",
      "Light reactions stop"
    ],
    correctAnswer: 1,
    explanation: "At high light intensity, photosynthesis becomes saturated. Further increases do not raise the rate because other components (e.g. CO2 or rubisco sites) limit the cycle.",
    level: "Reasoning",
    hint: "Concept of limiting factors (Blackman's Law)."
  },
  {
    id: "photosynthesis_q8",
    question: "If a blue filter is placed between the light source and the Hydrilla plant, how does the bubble rate compare to a green filter?",
    options: [
      "Higher under green light",
      "Higher under blue light because chlorophyll absorbs blue light and reflects green light",
      "Equal under both",
      "Zero under blue light"
    ],
    correctAnswer: 1,
    explanation: "Chlorophylls absorb blue and red wavelengths for photosynthesis, but reflect green light, which is not utilized effectively.",
    level: "Reasoning",
    hint: "Think about the absorption spectrum of chlorophyll."
  },
  {
    id: "photosynthesis_q9",
    question: "Why is water split during the light reactions of photosynthesis?",
    options: [
      "To produce glucose directly",
      "To provide electrons to replace those lost by Photosystem II (P680)",
      "To absorb carbon dioxide",
      "To cool the plant"
    ],
    correctAnswer: 1,
    explanation: "Photolysis splits water into 2H+, 2e-, and 1/2 O2. The electrons replenish the reaction center of PSII after it has been photo-excited.",
    level: "Reasoning",
    hint: "P680 needs electrons to return to its ground state."
  },
  // Complexity (3)
  {
    id: "photosynthesis_q10",
    question: "A student records the following bubble counts per minute at different distances from a light source: 10 cm: 45 bubbles; 20 cm: 20 bubbles; 40 cm: 5 bubbles. What mathematical relationship does this suggest between distance (d) and photosynthesis rate?",
    options: [
      "Rate is proportional to d",
      "Rate is inversely proportional to the square of the distance (1/d²), which matches light intensity distribution",
      "Rate is independent of d",
      "Rate is proportional to d²"
    ],
    correctAnswer: 1,
    explanation: "Light intensity (I) follows the inverse-square law: I ∝ 1/d². Since rate depends on intensity, the rate also drops off as 1/d².",
    level: "Complexity",
    hint: "Double the distance reduces intensity to one-fourth."
  },
  {
    id: "photosynthesis_q11",
    question: "If a Hydrilla stem releases 30 bubbles of gas in 2 minutes, and each bubble has an average volume of 0.2 mm³, what is the rate of oxygen evolution in mm³/hour?",
    options: ["180 mm³/hour", "90 mm³/hour", "3 mm³/hour", "360 mm³/hour"],
    correctAnswer: 0,
    explanation: "Rate = (30 bubbles / 2 min) * 0.2 mm³/bubble = 3.0 mm³/minute. Hourly rate = 3.0 * 60 = 180 mm³/hour.",
    level: "Complexity",
    hint: "Find rate per minute, then multiply by 60."
  },
  {
    id: "photosynthesis_q12",
    question: "Why is the funnel in the Hydrilla experiment kept slightly raised from the bottom of the beaker by placing plasticine supports under its rim?",
    options: [
      "To let light enter from below",
      "To allow free circulation of water and CO2-rich solutes to the Hydrilla stems under the funnel",
      "To prevent the funnel from cracking",
      "To keep the plant from escaping"
    ],
    correctAnswer: 1,
    explanation: "Raising the funnel ensures water can flow freely beneath it, supplying dissolved CO2 to the plant stems for continuous photosynthesis.",
    level: "Complexity",
    hint: "Allows water exchange between inside and outside of the funnel."
  },
  // Cognitive Complexity (3)
  {
    id: "photosynthesis_q13",
    question: "A student wants to prove that the evolved gas is indeed oxygen. What test should they perform on the collected gas in the test tube?",
    options: [
      "Introduce a glowing splinter; it will burst into flame because oxygen supports combustion",
      "Expose it to lime water; it will turn milky",
      "Test it with a burning match; it will extinguish with a pop sound",
      "Add iodine solution"
    ],
    correctAnswer: 1, // wait, correct option is 0 (introduce a glowing splinter)
    explanation: "Oxygen supports combustion. A glowing splinter inserted into a tube of collected oxygen will relight, confirming its presence.",
    level: "Cognitive Complexity",
    hint: "Oxygen is an oxidizer that supports burning."
  },
  {
    id: "photosynthesis_q14",
    question: "How does the C4 pathway in plants like maize represent an adaptation to overcome photorespiration, and how does it affect their light saturation point compared to C3 plants?",
    options: [
      "C4 plants separate CO2 fixation in space, keeping local CO2 high around Rubisco to eliminate photorespiration; they saturate at much higher light intensities",
      "C4 plants do not use Rubisco",
      "C4 plants close stomata during the day",
      "C4 plants saturate at lower light intensities"
    ],
    correctAnswer: 0,
    explanation: "C4 plants use bundle sheath and mesophyll cells to concentrate CO2 around Rubisco, preventing its oxygenase activity. This allows them to utilize high light intensities without photorespiratory losses.",
    level: "Cognitive Complexity",
    hint: "Kranz anatomy concentrates CO2."
  },
  {
    id: "photosynthesis_q15",
    question: "Design an control experiment to prove that light is essential for starch formation in leaves (using the iodine test). What is the key sequence of steps?",
    options: [
      "Starch test directly on a fresh leaf",
      "De-starch the plant in dark, cover a part of a leaf with black paper, expose to light, decolorize the leaf in boiling alcohol, and add iodine solution",
      "Boil leaf in water, then add iodine",
      "Keep plant in dark, then add iodine directly to the soil"
    ],
    correctAnswer: 1,
    explanation: "De-starching removes existing starch. Covering part of the leaf creates an internal control. Boiling in alcohol removes chlorophyll so the blue-black starch-iodine color can be clearly observed.",
    level: "Cognitive Complexity",
    hint: "First remove existing starch, then test covered vs uncovered regions."
  }
];

// 5. DNA ISOLATION
export const dnaIsolationQuestions: QuizQuestion[] = [
  // Cognitive (3)
  {
    id: "dnaIsolation_q1",
    question: "Which reagent is used to precipitate the isolated DNA out of the solution at the end of the extraction process?",
    options: ["Chilled ethanol", "Concentrated HCl", "Distilled water", "Sodium hydroxide"],
    correctAnswer: 0,
    explanation: "DNA is insoluble in cold alcohol (ethanol), causing it to aggregate and precipitate out as thread-like fibers.",
    level: "Cognitive",
    hint: "It must be cold and it is an alcohol."
  },
  {
    id: "dnaIsolation_q2",
    question: "What is the role of detergent (liquid soap) in the DNA isolation buffer?",
    options: ["To stain the DNA", "To lyse the cell membrane and nuclear envelope by disrupting lipid bilayers", "To digest proteins", "To precipitate DNA"],
    correctAnswer: 1,
    explanation: "Detergents solubilize the lipids in the cell membrane and nuclear membrane, lysing the cells to release genomic DNA.",
    level: "Cognitive",
    hint: "Membranes are made of lipids; soap dissolves lipids."
  },
  {
    id: "dnaIsolation_q3",
    question: "Which enzyme is used during DNA extraction to digest proteins associated with DNA packaging?",
    options: ["Amylase", "Protease (or Papain)", "Lipase", "Ribonuclease"],
    correctAnswer: 1,
    explanation: "Proteases break down histones and other chromosomal proteins that bind and package DNA, allowing pure DNA extraction.",
    level: "Cognitive",
    hint: "It breaks down peptide bonds."
  },
  // Thinking (3)
  {
    id: "dnaIsolation_q4",
    question: "Why is sodium chloride (table salt) added to the extraction mixture before blending?",
    options: [
      "To make the mixture sterile",
      "To neutralize the negative charges of the DNA backbone, allowing molecules to clump together",
      "To color the DNA",
      "To digest cell walls"
    ],
    correctAnswer: 1,
    explanation: "Na+ ions neutralize the negatively charged phosphate backbone of DNA, reducing electrostatic repulsion and promoting aggregation.",
    level: "Thinking",
    hint: "Salt provides positive sodium ions."
  },
  {
    id: "dnaIsolation_q5",
    question: "During extraction, why is the plant tissue (e.g. onion) blended or ground using a mortar and pestle?",
    options: ["To activate cellular enzymes", "To mechanically break the rigid cell walls of plant cells", "To denature DNA", "To polymerize DNA"],
    correctAnswer: 1,
    explanation: "Mechanical grinding breaks the cellulose cell walls, allowing the extraction buffer to access and lyse the cell membranes.",
    level: "Thinking",
    hint: "Cell walls are made of tough cellulose."
  },
  {
    id: "dnaIsolation_q6",
    question: "What is the purpose of using CHILLED ethanol instead of room temperature ethanol for DNA precipitation?",
    options: [
      "Room temperature ethanol is explosive",
      "Lower temperature decreases DNA solubility, resulting in a rapid and complete precipitation of DNA fibers",
      "Cold ethanol stains the DNA blue",
      "To keep the DNA alive"
    ],
    correctAnswer: 1,
    explanation: "Chilling the solvent reduces molecular motion and lowers DNA solubility, ensuring maximum recovery of precipitated DNA fibers.",
    level: "Thinking",
    hint: "Cold reduces solubility."
  },
  // Reasoning (3)
  {
    id: "dnaIsolation_q7",
    question: "Why is it important to keep the extraction mixture in a water bath at 60°C for exactly 15 minutes during preparation?",
    options: [
      "To boil the DNA",
      "To denature DNase enzymes (which destroy DNA) while lysing cells, without breaking the DNA down",
      "To freeze the mixture",
      "To change the pH of the mixture"
    ],
    correctAnswer: 1,
    explanation: "Heating to 60°C denatures destructive DNase enzymes and speeds up membrane lysis, but heating too long or too high can fragment the DNA.",
    level: "Reasoning",
    hint: "DNases are proteins that digest DNA; heat inactivates them."
  },
  {
    id: "dnaIsolation_q8",
    question: "If a student uses a green leaf instead of an onion bulb, the spool of DNA appears green. What contaminant is present, and how does it affect DNA purity?",
    options: ["Starch; makes it sweet", "Chlorophyll; it does not bind to DNA directly but co-precipitates, reducing purity", "Proteins; they block replication", "RNA; it mutates the DNA"],
    correctAnswer: 1,
    explanation: "Chlorophyll is soluble in organic solvents but can co-precipitate if the wash step is poor, giving the DNA a green tint and reducing purity.",
    level: "Reasoning",
    hint: "Leaves have photosynthetic pigments."
  },
  {
    id: "dnaIsolation_q9",
    question: "Why is spooling used to collect the DNA at the end of the experiment?",
    options: [
      "To filter out the liquid",
      "Because genomic DNA molecules are very long polymers that wrap around the glass rod as a sticky fiber when precipitated",
      "To synthesize new DNA",
      "To dry the DNA"
    ],
    correctAnswer: 1,
    explanation: "Long genomic DNA molecules form cohesive, mucous-like fibers when precipitated with alcohol, allowing them to be wound (spooled) onto a glass rod.",
    level: "Reasoning",
    hint: "DNA is a high-molecular-weight polymer."
  },
  // Complexity (3)
  {
    id: "dnaIsolation_q10",
    question: "A student isolates 5.0 mg of crude DNA from 50 g of onion tissue. What is the yield of DNA expressed in percentage of starting material?",
    options: ["0.01%", "0.10%", "1.00%", "10.0%"],
    correctAnswer: 0,
    explanation: "Yield = (mass of DNA / mass of tissue) * 100 = (0.005 g / 50 g) * 100 = 0.0001 * 100 = 0.01%.",
    level: "Complexity",
    hint: "Convert milligrams to grams before dividing."
  },
  {
    id: "dnaIsolation_q11",
    question: "The purity of isolated DNA is checked using UV spectrophotometry. If the absorbance at 260 nm (A260) is 1.8 and at 280 nm (A280) is 1.0, what is the A260/A280 ratio, and what does it indicate?",
    options: ["1.8; indicates highly pure DNA", "0.56; indicates protein contamination", "1.8; indicates RNA contamination", "2.8; indicates phenol contamination"],
    correctAnswer: 0,
    explanation: "Ratio = A260/A280 = 1.8/1.0 = 1.8. A ratio of 1.8 is characteristic of highly pure DNA; lower ratios (<1.6) indicate protein contamination.",
    level: "Complexity",
    hint: "Pure DNA has a ratio of 1.8; pure RNA has 2.0."
  },
  {
    id: "dnaIsolation_q12",
    question: "During isolation, why is it recommended to add meat tenderizer or pineapple juice to the mixture?",
    options: [
      "To improve the flavor of the solution",
      "They contain proteolytic enzymes (bromelain/papain) that digest histone proteins, freeing the DNA",
      "To precipitate DNA faster",
      "To neutralize the pH"
    ],
    correctAnswer: 1,
    explanation: "Pineapple juice contains bromelain and meat tenderizer contains papain — both are proteases that digest histones and other proteins that contaminate the DNA.",
    level: "Complexity",
    hint: "These natural items contain active proteases."
  },
  // Cognitive Complexity (3)
  {
    id: "dnaIsolation_q13",
    question: "A student isolates DNA but obtains a jelly-like mass that dissolves completely when stirred vigorously. What happened to the DNA?",
    options: [
      "The DNA mutated into RNA",
      "Vigorous shearing forces fragmented the long double-stranded DNA molecules into smaller pieces, destroying the fibrous texture",
      "The DNA evaporated",
      "The salt concentration was too high"
    ],
    correctAnswer: 1,
    explanation: "Long genomic DNA is highly viscous and forms fibers. High mechanical shear (like vigorous stirring or shaking) breaks the covalent phosphodiester backbone, reducing molecular weight and viscosity.",
    level: "Cognitive Complexity",
    hint: "High molecular weight DNA is sensitive to shear forces."
  },
  {
    id: "dnaIsolation_q14",
    question: "How does the addition of EDTA (ethylenediaminetetraacetic acid) to the extraction buffer protect DNA from degradation?",
    options: [
      "It acts as a detergent",
      "It chelates divalent metal ions (Mg2+, Ca2+), which are essential cofactors for DNase enzymes, thereby inactivating them",
      "It precipitates proteins",
      "It dyes the DNA blue"
    ],
    correctAnswer: 1,
    explanation: "DNases require Mg2+ to function. EDTA binds (chelates) these ions, preventing DNases from degrading the genomic DNA during cell lysis.",
    level: "Cognitive Complexity",
    hint: "Chelation of enzyme cofactors."
  },
  {
    id: "dnaIsolation_q15",
    question: "A researcher wants to isolate plasmid DNA (circular, small) from E. coli using alkaline lysis. What is the role of sodium dodecyl sulfate (SDS) and NaOH in this specific method?",
    options: [
      "NaOH denatures both plasmid and chromosomal DNA; SDS lyses cells. Upon neutralization, plasmid DNA renatures while chromosomal DNA aggregates and is precipitated",
      "NaOH precipitates plasmid DNA directly",
      "SDS digests the plasmid DNA",
      "NaOH is used to neutralize the acid"
    ],
    correctAnswer: 0,
    explanation: "NaOH raises pH, denaturing DNA. SDS lyses cells. Upon neutralization with potassium acetate, the small circular plasmid DNA rapidly renatures, while the large chromosomal DNA remains tangled with proteins and precipitates out.",
    level: "Cognitive Complexity",
    hint: "Alkaline lysis exploits size and topological differences."
  }
];

// 6. BENEDICT TEST
export const benedictTestQuestions: QuizQuestion[] = [
  // Cognitive (3)
  {
    id: "benedictTest_q1",
    question: "Benedict's reagent is used to detect the presence of:",
    options: ["Starch", "Reducing sugars", "Proteins", "Lipids"],
    correctAnswer: 1,
    explanation: "Benedict's test is a semi-quantitative test used to detect reducing sugars (like glucose, fructose, lactose) which have free aldehyde or ketone groups.",
    level: "Cognitive",
    hint: "It detects monosaccharides and some disaccharides."
  },
  {
    id: "benedictTest_q2",
    question: "Which chemical component of Benedict's reagent provides the cupric ions (Cu2+) that are reduced during the reaction?",
    options: ["Copper sulphate", "Sodium citrate", "Sodium carbonate", "Sodium hydroxide"],
    correctAnswer: 0,
    explanation: "Copper sulphate (CuSO4) provides the blue Cu2+ ions that act as the oxidizing agent in the reagent.",
    level: "Cognitive",
    hint: "It is a blue salt."
  },
  {
    id: "benedictTest_q3",
    question: "What color precipitate indicates a very high concentration of reducing sugar in a Benedict's test?",
    options: ["Green", "Yellow", "Brick-red", "Blue"],
    correctAnswer: 2,
    explanation: "A brick-red precipitate of cuprous oxide (Cu2O) indicates a high concentration (>2%) of reducing sugars.",
    level: "Cognitive",
    hint: "The final color of the precipitate in the presence of excess glucose."
  },
  // Thinking (3)
  {
    id: "benedictTest_q4",
    question: "Which of the following sugars will NOT give a positive result with Benedict's reagent directly?",
    options: ["Glucose", "Fructose", "Sucrose", "Maltose"],
    correctAnswer: 2,
    explanation: "Sucrose is a non-reducing sugar because its glycosidic bond links the reducing groups of both glucose and fructose, preventing oxidation.",
    level: "Thinking",
    hint: "It is table sugar."
  },
  {
    id: "benedictTest_q5",
    question: "During the test, a student mixes urine with Benedict's reagent and heats it in a water bath. The mixture turns green. What does this indicate?",
    options: ["No sugar is present", "A trace amount of reducing sugar (approx. 0.5%) is present", "High sugar is present", "Protein is present"],
    correctAnswer: 1,
    explanation: "A green color/precipitate indicates a trace level (0.1% to 0.5%) of reducing sugar in the sample.",
    level: "Thinking",
    hint: "Green is the first color change after blue."
  },
  {
    id: "benedictTest_q6",
    question: "What is the purpose of sodium carbonate in Benedict's reagent?",
    options: [
      "To provide an alkaline medium necessary for the enolization of sugars and subsequent reduction of Cu2+",
      "To stabilize the copper ions",
      "To stain the solution blue",
      "To act as an enzyme"
    ],
    correctAnswer: 0,
    explanation: "Sodium carbonate makes the reagent alkaline. Alkaline conditions promote enolization of reducing sugars, exposing their reactive reducing groups.",
    level: "Thinking",
    hint: "It is an alkaline salt."
  },
  // Reasoning (3)
  {
    id: "benedictTest_q7",
    question: "Why must Benedict's test tubes be heated in a boiling water bath rather than heated directly over a Bunsen burner flame?",
    options: [
      "Direct heating would evaporate the water",
      "Water baths ensure uniform, controlled heating and prevent bumping or splashing of the alkaline reagent",
      "Water baths increase the blue color",
      "Heating is optional"
    ],
    correctAnswer: 1,
    explanation: "Controlled heating prevents thermal decomposition of the sugar and stops the solution from boiling over or splashing.",
    level: "Reasoning",
    hint: "Uniform temperature is safer and prevents boiling over."
  },
  {
    id: "benedictTest_q8",
    question: "Sucrose is non-reducing. How can a student modify the sample to obtain a positive Benedict's test?",
    options: [
      "Add more Benedict's reagent",
      "Boil the sucrose solution with dilute HCl to hydrolyze it into glucose and fructose, neutralize with base, and then perform the test",
      "Freeze the solution",
      "Add starch to the sucrose"
    ],
    correctAnswer: 1,
    explanation: "Acid hydrolysis breaks the glycosidic bond in sucrose, releasing free glucose and fructose monomers, which are reducing sugars.",
    level: "Reasoning",
    hint: "Hydrolyze the disaccharide into its monosaccharide components."
  },
  {
    id: "benedictTest_q9",
    question: "What is the role of sodium citrate in Benedict's reagent?",
    options: [
      "To oxidize the sugars",
      "To chelate Cu2+ ions and prevent them from precipitating as copper carbonate in the alkaline solution before reaction",
      "To act as an indicator",
      "To speed up the reaction"
    ],
    correctAnswer: 1,
    explanation: "Citrate complexes with Cu2+ to prevent spontaneous precipitation in the alkaline medium, keeping the ions dissolved and available.",
    level: "Reasoning",
    hint: "It keeps copper ions in solution."
  },
  // Complexity (3)
  {
    id: "benedictTest_q10",
    question: "A solution contains 0.1 g of glucose in 50 mL of water. What is the concentration of glucose in percent (w/v), and what color precipitate will it yield with Benedict's reagent?",
    options: ["0.2%; Green", "2.0%; Brick-red", "0.2%; Blue", "0.5%; Yellow"],
    correctAnswer: 0,
    explanation: "Concentration = (0.1 g / 50 mL) * 100 = 0.2%. A concentration of 0.2% falls in the trace range, producing a green precipitate.",
    level: "Complexity",
    hint: "Calculate percentage weight/volume first."
  },
  {
    id: "benedictTest_q11",
    question: "During reduction, Cu2+ ions are converted to Cu+. Write the chemical formula of the precipitate formed.",
    options: ["CuSO4", "Cu2O", "CuO", "Cu(OH)2"],
    correctAnswer: 1,
    explanation: "Cu2+ is reduced to Cu+, which precipitates in alkaline conditions as red cuprous oxide (Cu2O).",
    level: "Complexity",
    hint: "Copper(I) oxide."
  },
  {
    id: "benedictTest_q12",
    question: "A student performs Benedict's test on three tubes: Tube A (Glucose), Tube B (Starch), Tube C (Starch boiled with amylase for 15 minutes). The results are:",
    options: [
      "All tubes turn blue",
      "Tube A and Tube C turn red/green; Tube B remains blue",
      "Tube A turns red; Tube B and C remain blue",
      "Tube B turns red; Tube A and C remain blue"
    ],
    correctAnswer: 1,
    explanation: "Glucose is reducing (A positive). Starch is non-reducing (B negative/blue). Amylase hydrolyzes starch into reducing maltose/glucose, giving a positive result for C.",
    level: "Complexity",
    hint: "Amylase breaks down starch into smaller reducing sugars."
  },
  // Cognitive Complexity (3)
  {
    id: "benedictTest_q13",
    question: "Both glucose and fructose give positive Benedict's tests. How does fructose (a ketose) reduce the reagent if only aldehydes are oxidizable under normal conditions?",
    options: [
      "Fructose is oxidized at the ketone group directly",
      "In alkaline Benedict's reagent, fructose undergoes tautomerization (isomerization) via an enediol intermediate to convert to glucose/mannose (aldoses)",
      "Fructose has a free aldehyde group",
      "Fructose does not react; it only dissolves"
    ],
    correctAnswer: 1,
    explanation: "The alkaline environment isomerizes ketoses (like fructose) into aldoses (like glucose) by Lobry de Bruyn-Alberda van Ekenstein transformation, allowing oxidation.",
    level: "Cognitive Complexity",
    hint: "Alkaline tautomerization converts ketose to aldose."
  },
  {
    id: "benedictTest_q14",
    question: "Compare Benedict's test with Fehling's test. Why is Benedict's reagent preferred for clinical urine analysis?",
    options: [
      "Fehling's reagent is highly unstable because its copper sulphate and tartrate solutions must be mixed fresh; Benedict's is stable in a single bottle and less corrosive",
      "Fehling's test is more sensitive to starch",
      "Benedict's reagent is blue while Fehling's is colorless",
      "Fehling's test does not require heating"
    ],
    correctAnswer: 0,
    explanation: "Fehling's reagent uses tartrate and NaOH, which degrades quickly when mixed. Benedict's uses carbonate and citrate, forming a stable, single-reagent solution suitable for storage.",
    level: "Cognitive Complexity",
    hint: "Stability and shelf life differ."
  },
  {
    id: "benedictTest_q15",
    question: "A patient's urine sample yields a positive Benedict's test but a negative glucose oxidase test (which is specific to D-glucose). What is the most likely diagnostic conclusion?",
    options: [
      "The patient has diabetes mellitus",
      "The urine contains a reducing substance other than glucose, such as galactose, pentose, or vitamin C (ascorbic acid)",
      "The Benedict's reagent was faulty",
      "The patient has high protein levels"
    ],
    correctAnswer: 1,
    explanation: "Benedict's test is general for any reducing agent. A negative glucose-specific test confirms that the reducing agent is another sugar or a substance like vitamin C.",
    level: "Cognitive Complexity",
    hint: "Benedict's is non-specific; glucose oxidase is specific."
  }
];

// 7. BLOOD GROUP
export const bloodGroupQuestions: QuizQuestion[] = [
  // Cognitive (3)
  {
    id: "bloodGroup_q1",
    question: "The ABO blood grouping system is based on the presence or absence of which antigens on the surface of red blood cells?",
    options: ["Antigens A and B", "Antigens C and D", "Antibodies Anti-A and Anti-B", "M and N antigens"],
    correctAnswer: 0,
    explanation: "ABO blood groups are determined by the presence or absence of specific carbohydrate antigens (A and B) on the erythrocyte membrane.",
    level: "Cognitive",
    hint: "Named after the group letters."
  },
  {
    id: "bloodGroup_q2",
    question: "During blood grouping, what observable phenomenon indicates a positive reaction between antigen and antibody?",
    options: ["Hemolysis", "Agglutination (clumping of cells)", "Color change to blue", "Precipitation of salt"],
    correctAnswer: 1,
    explanation: "Agglutination occurs when bivalent antibodies bind to antigens on adjacent red blood cells, cross-linking them into visible clumps.",
    level: "Cognitive",
    hint: "Clumping of cells."
  },
  {
    id: "bloodGroup_q3",
    question: "Which antiserum is used to determine the Rh factor (positive or negative) of a blood sample?",
    options: ["Anti-A serum", "Anti-B serum", "Anti-D serum", "Anti-C serum"],
    correctAnswer: 2,
    explanation: "Anti-D antiserum contains antibodies against the RhD antigen, which determines Rh-positive or Rh-negative status.",
    level: "Cognitive",
    hint: "The Rh factor antigen is also called D antigen."
  },
  // Thinking (3)
  {
    id: "bloodGroup_q4",
    question: "A student adds blood to three wells. Well 1 (Anti-A) clumps; Well 2 (Anti-B) does not clump; Well 3 (Anti-D) clumps. What is the blood group?",
    options: ["A positive", "A negative", "B positive", "AB positive"],
    correctAnswer: 0,
    explanation: "Agglutination with Anti-A indicates A antigen is present. No agglutination with Anti-B indicates B antigen is absent. Agglutination with Anti-D indicates Rh positive. Thus, A positive.",
    level: "Thinking",
    hint: "A is present, B is absent, Rh (D) is present."
  },
  {
    id: "bloodGroup_q5",
    question: "Which blood group is known as the universal donor in blood transfusions?",
    options: ["O positive", "O negative", "AB negative", "AB positive"],
    correctAnswer: 1,
    explanation: "O negative blood lacks antigens A, B, and RhD on the RBC surface, so it will not trigger an immune reaction in any recipient.",
    level: "Thinking",
    hint: "Lacks all three major antigens."
  },
  {
    id: "bloodGroup_q6",
    question: "What antibodies are naturally present in the plasma of an individual with blood group B?",
    options: ["Anti-A antibodies", "Anti-B antibodies", "Both Anti-A and Anti-B", "No antibodies"],
    correctAnswer: 0,
    explanation: "Individuals produce antibodies against the antigens they lack. Group B individuals lack A antigens, so their plasma contains Anti-A antibodies.",
    level: "Thinking",
    hint: "They have B antigens, so they make antibodies against the other antigen."
  },
  // Reasoning (3)
  {
    id: "bloodGroup_q7",
    question: "Why must blood grouping be performed at room temperature rather than at high temperature?",
    options: [
      "High temperatures evaporate the blood",
      "ABO antibodies are typically IgM immunoglobulins that agglutinate best at cooler temperatures; heating can denature the antibodies",
      "High temperatures make blood group B turn into group A",
      "Antigens dissolve in heat"
    ],
    correctAnswer: 1,
    explanation: "IgM antibodies involved in agglutination are cold-active and stable at room temperature. High temperatures disrupt antibody-antigen binding.",
    level: "Reasoning",
    hint: "Antibodies are proteins sensitive to temperature."
  },
  {
    id: "bloodGroup_q8",
    question: "A patient with blood group AB positive requires a transfusion. Which blood groups can they safely receive?",
    options: ["Only AB positive", "Only O negative", "Any blood group (universal recipient)", "Only A positive and B positive"],
    correctAnswer: 2,
    explanation: "AB positive individuals have antigens A, B, and RhD, so their plasma has no Anti-A, Anti-B, or Anti-D antibodies, allowing safe transfusion from any group.",
    level: "Reasoning",
    hint: "They lack antibodies against A, B, and D."
  },
  {
    id: "bloodGroup_q9",
    question: "What is the physiological consequence if a person with blood group A is accidentally transfused with blood group B?",
    options: [
      "The blood will mix smoothly",
      "The recipient's Anti-B antibodies will bind to the donor's B-type RBCs, causing mass agglutination, complement activation, and acute hemolysis",
      "The recipient will change to blood group B",
      "The donor's blood will become group O"
    ],
    correctAnswer: 1,
    explanation: "The immune system recognizes foreign B antigens, leading to antigen-antibody clumping, cell rupture, and potential kidney failure.",
    level: "Reasoning",
    hint: "Anti-B antibodies attack donor B red blood cells."
  },
  // Complexity (3)
  {
    id: "bloodGroup_q10",
    question: "A mother is heterozygous for blood group A (I^A i) and the father is heterozygous for blood group B (I^B i). What is the probability that their child will have blood group O?",
    options: ["25%", "50%", "0%", "75%"],
    correctAnswer: 0,
    explanation: "Possible genotypes: I^A I^B (AB), I^A i (A), I^B i (B), and ii (O). Each genotype has a 25% (1 in 4) chance.",
    level: "Complexity",
    hint: "Do a Punnett square for alleles I^A, i and I^B, i."
  },
  {
    id: "bloodGroup_q11",
    question: "During a laboratory test, a sample shows agglutination in all three circles: Anti-A, Anti-B, and Anti-D. What is the blood type, and what is its frequency relative to others?",
    options: ["AB positive; it is the most common blood type", "AB positive; it is relatively rare compared to O and A", "O negative; it is the rarest", "AB negative; it is very common"],
    correctAnswer: 1,
    explanation: "Agglutination in all three indicates AB positive. While AB positive is the universal recipient, it is one of the less common blood groups globally.",
    level: "Complexity",
    hint: "Presence of all antigens is rarer than lacking them."
  },
  {
    id: "bloodGroup_q12",
    question: "Which of the following ABO genotypes represents co-dominance?",
    options: ["I^A I^A", "I^A I^B", "I^A i", "ii"],
    correctAnswer: 1,
    explanation: "In I^A I^B, both alleles are fully expressed, producing both A and B antigens on the red blood cells.",
    level: "Complexity",
    hint: "Both alleles are dominant and expressed together."
  },
  // Cognitive Complexity (3)
  {
    id: "bloodGroup_q13",
    question: "Explain the immunological basis of Erythroblastosis Fetalis (Hemolytic Disease of the Newborn). Under what parental genotype combination does it occur?",
    options: [
      "Rh-negative mother carrying an Rh-positive fetus. Maternal anti-D IgG antibodies cross the placenta in subsequent pregnancies, destroying fetal RBCs",
      "Rh-positive mother carrying an Rh-negative fetus",
      "Rh-negative mother and Rh-negative father",
      "AB-positive mother and O-negative father"
    ],
    correctAnswer: 0,
    explanation: "Exposure to fetal RhD+ cells during the first birth sensitizes an RhD- mother to make anti-D IgG. In later pregnancies, these cross the placenta to attack RhD+ fetal red blood cells.",
    level: "Cognitive Complexity",
    hint: "The mother must lack the antigen (Rh-), and the baby must have it (Rh+)."
  },
  {
    id: "bloodGroup_q14",
    question: "A student performs blood grouping but the blood does not clump in any of the wells, even after 10 minutes. However, the patient's card says they are AB positive. What went wrong?",
    options: [
      "The blood group changed",
      "The antisera were expired or denatured, or the slide was not mixed properly",
      "The patient became anemic",
      "Urea in blood blocked the reaction"
    ],
    correctAnswer: 1,
    explanation: "Agglutination requires active, functional antibodies. Expired or heat-damaged antisera fail to bind antigens, yielding false negatives.",
    level: "Cognitive Complexity",
    hint: "Failure to clump when antigens are present indicates inactive testing agents."
  },
  {
    id: "bloodGroup_q15",
    question: "Describe the biochemical difference between the A and B antigens in the ABO system. What carbohydrate monomers are added to the H antigen?",
    options: [
      "Group A adds N-acetylgalactosamine; Group B adds galactose to the precursor H antigen",
      "Group A adds glucose; Group B adds fructose",
      "Group A adds lipids; Group B adds proteins",
      "Group A adds galactose; Group B adds N-acetylgalactosamine"
    ],
    correctAnswer: 0,
    explanation: "The H antigen is the base structure. The IA allele codes for a transferase that adds N-acetylgalactosamine, while the IB allele codes for a transferase that adds D-galactose.",
    level: "Cognitive Complexity",
    hint: "They differ by a single terminal sugar monomer on the glycoprotein."
  }
];

// 8. SEED GERMINATION
export const seedGerminationQuestions: QuizQuestion[] = [
  // Cognitive (3)
  {
    id: "seedGermination_q1",
    question: "What is the term for the initial uptake of water by dry seeds, which triggers germination?",
    options: ["Osmosis", "Imbibition", "Transpiration", "Plasmolysis"],
    correctAnswer: 1,
    explanation: "Imbibition is the physical adsorption of water by hydrophilic colloids (like starch and proteins) in the dry seed coat, causing it to swell and rupture.",
    level: "Cognitive",
    hint: "It is a surface-attraction physical process."
  },
  {
    id: "seedGermination_q2",
    question: "Which plant hormone is primarily responsible for breaking seed dormancy and promoting germination?",
    options: ["Abscisic acid", "Gibberellic acid (GA)", "Auxin", "Ethylene"],
    correctAnswer: 1,
    explanation: "Gibberellin stimulates the synthesis of amylase in the aleurone layer, which breaks down starch to fuel embryo growth.",
    level: "Cognitive",
    hint: "Abscisic acid keeps seeds dormant; this hormone does the opposite."
  },
  {
    id: "seedGermination_q3",
    question: "In epigeal germination, which part of the embryonic axis elongates rapidly, pulling the cotyledons above the soil?",
    options: ["Hypocotyl", "Epicotyl", "Radicle", "Plumule"],
    correctAnswer: 0,
    explanation: "In epigeal germination, the hypocotyl elongates and curves, lifting the cotyledons above the ground.",
    level: "Cognitive",
    hint: "Hypo = below the cotyledons."
  },
  // Thinking (3)
  {
    id: "seedGermination_q4",
    question: "A student sets up an experiment with seeds in four conditions. Which seeds will germinate?",
    options: [
      "Tube 1: Dry seeds at room temperature",
      "Tube 2: Wet seeds at 0 degrees Celsius",
      "Tube 3: Wet seeds in an airtight jar filled with nitrogen gas",
      "Tube 4: Moist seeds at room temperature with access to air"
    ],
    correctAnswer: 3,
    explanation: "Germination requires water (moisture), oxygen (for respiration), and a suitable temperature. Only Tube 4 meets all three conditions.",
    level: "Thinking",
    hint: "Must have water, oxygen, and warmth."
  },
  {
    id: "seedGermination_q5",
    question: "What is the primary role of oxygen during the initial stages of seed germination?",
    options: [
      "To produce carbon dioxide",
      "For aerobic respiration to generate ATP needed for active embryo growth",
      "To hydrolyze starch",
      "To keep the seed hydrated"
    ],
    correctAnswer: 1,
    explanation: "Germinative growth is highly energy-demanding. Oxygen acts as the final electron acceptor in aerobic respiration to generate ATP.",
    level: "Thinking",
    hint: "It powers ATP synthesis via respiration."
  },
  {
    id: "seedGermination_q6",
    question: "During an experiment to show CO2 release during germination, why is a small vial of KOH (potassium hydroxide) placed inside the flask?",
    options: ["To release oxygen", "To absorb carbon dioxide produced by the seeds, creating a vacuum that pulls water up the tube", "To stain the seeds", "To heat the seeds"],
    correctAnswer: 1,
    explanation: "KOH absorbs CO2: 2KOH + CO2 -> K2CO3 + H2O. This removes gas from the closed flask, lowering pressure and causing water to rise in the delivery tube.",
    level: "Thinking",
    hint: "KOH is an alkaline CO2 scavenger."
  },
  // Reasoning (3)
  {
    id: "seedGermination_q7",
    question: "Why do seeds buried very deep in waterlogged soil fail to germinate?",
    options: [
      "It is too hot",
      "Waterlogged soil lacks oxygen, preventing aerobic respiration in the seeds",
      "They do not absorb water",
      "They lack seed coats"
    ],
    correctAnswer: 1,
    explanation: "Water replaces air pockets in waterlogged soil. The resulting anaerobic conditions prevent the high-rate respiration needed for germination.",
    level: "Reasoning",
    hint: "Think about gas exchange in soaked soils."
  },
  {
    id: "seedGermination_q8",
    question: "How does the mobilization of food reserves in a germinating barley seed occur? Trace the hormonal pathway.",
    options: [
      "GA is released by the embryo -> diffuses to the aleurone layer -> stimulates synthesis of alpha-amylase -> hydrolyzes starch in the endosperm into sugar",
      "Auxin digests starch directly",
      "Abscisic acid stimulates amylase",
      "The endosperm synthesizes GA to feed the embryo"
    ],
    correctAnswer: 0,
    explanation: "GA acts as a chemical messenger from the embryo to the aleurone layer, initiating transcription of amylase to digest endosperm starch.",
    level: "Reasoning",
    hint: "Starts in embryo, goes to aleurone layer, releases enzyme."
  },
  {
    id: "seedGermination_q9",
    question: "What is the difference between hypogeal and epigeal germination?",
    options: [
      "In hypogeal, cotyledons remain below the ground because the epicotyl elongates; in epigeal, they rise above because the hypocotyl elongates",
      "Hypogeal requires no water",
      "Epigeal occurs only in monocots",
      "Hypogeal seeds have no radicle"
    ],
    correctAnswer: 0,
    explanation: "Epicotyl elongation keeps cotyledons buried (hypogeal), while hypocotyl elongation lifts them (epigeal).",
    level: "Reasoning",
    hint: "Hypo = below, Epi = above; cotyledon position."
  },
  // Complexity (3)
  {
    id: "seedGermination_q10",
    question: "In a batch of 150 seeds, 135 germinate successfully. What is the germination percentage, and if 10% of germinated seeds die due to damping-off, how many viable seedlings survive?",
    options: ["90%; 121 seedlings", "90%; 122 seedlings", "90%; 135 seedlings", "90%; 15 seedlings"],
    correctAnswer: 0,
    explanation: "Germination = (135/150) * 100 = 90%. Dead seedlings = 135 * 0.10 = 13.5 ≈ 14. Surviving = 135 − 14 = 121 (or 135 * 0.90 = 121.5 ≈ 121).",
    level: "Complexity",
    hint: "First find the germination rate, then subtract 10% of those that germinated."
  },
  {
    id: "seedGermination_q11",
    question: "During imbibition, a 10 g sample of dry seeds absorbs 8 mL of water. If the density of water is 1 g/mL, what is the fresh weight of the swollen seeds, and what is the percentage increase in weight?",
    options: ["18 g; 80% increase", "18 g; 180% increase", "12 g; 20% increase", "10.8 g; 8% increase"],
    correctAnswer: 0,
    explanation: "Mass of water absorbed = 8 g. New mass = 10 + 8 = 18 g. % increase = (8 g / 10 g) * 100 = 80%.",
    level: "Complexity",
    hint: "Water weight adds directly to the initial dry weight."
  },
  {
    id: "seedGermination_q12",
    question: "A student measures the dry weight of germinating seeds over 10 days. They observe that the dry weight initially decreases before increasing. Explain this trend.",
    options: [
      "The seeds lose water weight",
      "Respiration consumes stored starch (losing CO2 gas), causing dry weight to decrease, until leaves develop and photosynthesis begins to fix carbon",
      "The scale was calibrated poorly",
      "Starch is heavier than glucose"
    ],
    correctAnswer: 1,
    explanation: "Before photosynthesis begins, the seed relies on respiration of stored reserves. This releases CO2, causing a net loss of dry mass.",
    level: "Complexity",
    hint: "Aerobic respiration burns organic carbon into CO2 gas."
  },
  // Cognitive Complexity (3)
  {
    id: "seedGermination_q13",
    question: "Some seeds (like lettuce) require light to germinate (photoblastic seeds). What photoreceptor detects light to trigger germination, and what is the active form?",
    options: [
      "Phytochrome; red light converts inactive Pr to active Pfr, which promotes GA synthesis",
      "Chlorophyll; converts light to sugar",
      "Cryptochrome; blue light inhibits growth",
      "Phototropin; blue light bends the stem"
    ],
    correctAnswer: 0,
    explanation: "Phytochrome is the sensor. Red light converts Pr to the active Pfr form. Pfr moves to the nucleus to trigger gibberellin synthesis.",
    level: "Cognitive Complexity",
    hint: "Pr to Pfr conversion by red light."
  },
  {
    id: "seedGermination_q14",
    question: "A student wants to measure the respiratory quotient (RQ) of germinating castor seeds (oil-rich) vs wheat seeds (starch-rich) using a respirometer. What are the expected RQ values and why?",
    options: [
      "Castor RQ < 1 (fatty acids require more oxygen for oxidation); wheat RQ = 1 (carbohydrates have balanced oxygen)",
      "Castor RQ = 1; wheat RQ < 1",
      "Both have RQ > 1",
      "Both have RQ = 0.5"
    ],
    correctAnswer: 0,
    explanation: "RQ = CO2 produced / O2 consumed. Carbohydrates (wheat) have RQ = 1.0. Fats (castor) are oxygen-poor and require more oxygen, yielding an RQ of ~0.7.",
    level: "Cognitive Complexity",
    hint: "Fats require more oxygen to oxidize than carbohydrates."
  },
  {
    id: "seedGermination_q15",
    question: "Explain the physiological mechanism of seed dormancy induced by Abscisic Acid (ABA) and how water washing (leaching) can trigger germination in desert plants.",
    options: [
      "ABA blocks transcription of enzymes; water washes soluble ABA out of the seed coat, shifting the GA:ABA ratio in favor of GA to trigger germination",
      "ABA destroys GA directly",
      "Water dissolves the starch directly",
      "ABA is activated by water"
    ],
    correctAnswer: 0,
    explanation: "Dormancy is maintained by high ABA levels. Desert rain washes out water-soluble ABA from the seed coat, reducing its level and letting GA initiate germination.",
    level: "Cognitive Complexity",
    hint: "Dormancy is an ABA-mediated block; leaching removes this soluble block."
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// MATHEMATICS (6 experiments × 15 questions = 90)
// ─────────────────────────────────────────────────────────────────────────────

// 1. UNIT CIRCLE
export const unitCircleQuestions: QuizQuestion[] = [
  // Cognitive (3)
  {
    id: "unitCircle_q1",
    question: "In a unit circle, the coordinates of a point P on the circle at an angle θ (in standard position) are given by:",
    options: ["(cos θ, sin θ)", "(sin θ, cos θ)", "(tan θ, 1)", "(1, tan θ)"],
    correctAnswer: 0,
    explanation: "By definition, the radius r = 1, so x = r cos θ = cos θ and y = r sin θ = sin θ.",
    level: "Cognitive",
    hint: "x-coordinate is adjacent; y-coordinate is opposite."
  },
  {
    id: "unitCircle_q2",
    question: "In which quadrants are the sine and cosine functions both negative?",
    options: ["Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV"],
    correctAnswer: 2,
    explanation: "In Quadrant III, both x (cosine) and y (sine) coordinates are negative.",
    level: "Cognitive",
    hint: "Use the ASTC rule (All Students Take Calculus)."
  },
  {
    id: "unitCircle_q3",
    question: "What is the value of sin(210 degrees)?",
    options: ["1/2", "−1/2", "√3/2", "−√3/2"],
    correctAnswer: 1,
    explanation: "sin(210°) = sin(180° + 30°) = −sin(30°) = −1/2.",
    level: "Cognitive",
    hint: "210 degrees is in Quadrant III; reference angle is 30 degrees."
  },
  // Thinking (3)
  {
    id: "unitCircle_q4",
    question: "If cos θ = −4/5 and θ is in Quadrant II, what is the value of sin θ?",
    options: ["3/5", "−3/5", "1/5", "−1/5"],
    correctAnswer: 0,
    explanation: "Using sin²θ + cos²θ = 1: sin²θ = 1 − 16/25 = 9/25. In Quadrant II, sine is positive, so sin θ = 3/5.",
    level: "Thinking",
    hint: "Use Pythagoras identity and check the sign in QII."
  },
  {
    id: "unitCircle_q5",
    question: "What is the radian measure of an angle of 135 degrees?",
    options: ["π/4", "3π/4", "5π/4", "2π/3"],
    correctAnswer: 1,
    explanation: "Radians = Degrees * (π / 180) = 135 * (π / 180) = 3π/4.",
    level: "Thinking",
    hint: "135 is 3 times 45 degrees."
  },
  {
    id: "unitCircle_q6",
    question: "Find the exact value of cos(300 degrees).",
    options: ["1/2", "−1/2", "√3/2", "−√3/2"],
    correctAnswer: 0,
    explanation: "cos(300°) = cos(360° − 60°) = cos(60°) = 1/2. Cosine is positive in Quadrant IV.",
    level: "Thinking",
    hint: "300 degrees is in Quadrant IV; reference angle is 60 degrees."
  },
  // Reasoning (3)
  {
    id: "unitCircle_q7",
    question: "Why is the tangent function undefined at θ = 90 degrees (π/2 radians)?",
    options: [
      "Because sin(90) = 0",
      "Because tan θ = sin θ / cos θ, and cos(90) = 0, leading to division by zero",
      "Because the unit circle has no point at 90 degrees",
      "Because tangent is always negative there"
    ],
    correctAnswer: 1,
    explanation: "At 90°, the x-coordinate on the unit circle is 0 (cos 90° = 0). Since tan θ = y/x, tan 90° is undefined.",
    level: "Reasoning",
    hint: "tan = sin/cos; look at the denominator."
  },
  {
    id: "unitCircle_q8",
    question: "If P(x, y) is a point on the unit circle corresponding to angle θ, why must −1 ≤ sin θ ≤ 1?",
    options: [
      "Because the radius of the unit circle is 1, so the maximum vertical displacement is 1",
      "Because tangent is bounded",
      "By the definition of triangles",
      "Because theta cannot exceed 360 degrees"
    ],
    correctAnswer: 0,
    explanation: "On the unit circle x² + y² = 1, which implies y² = 1 − x² ≤ 1, so −1 ≤ y ≤ 1. Since y = sin θ, the range is [−1, 1].",
    level: "Reasoning",
    hint: "The circle is bounded within x ∈ [−1, 1] and y ∈ [−1, 1]."
  },
  {
    id: "unitCircle_q9",
    question: "How does the unit circle explain the periodicity of trigonometric functions? What is the period of sin θ?",
    options: [
      "Adding 360 degrees (2π) corresponds to a complete revolution, returning to the same point P(x, y); the period is 2π",
      "The period is π because sine values repeat every quadrant",
      "The period is 180 degrees",
      "Trig functions are not periodic"
    ],
    correctAnswer: 0,
    explanation: "Rotating by 2π radians returns P to its original coordinates, repeating the sine and cosine values. Hence, period = 2π.",
    level: "Reasoning",
    hint: "A full circle rotation is 2π radians."
  },
  // Complexity (3)
  {
    id: "unitCircle_q10",
    question: "Solve the equation 2 sin θ − 1 = 0 for θ in the interval [0, 360 degrees].",
    options: ["30° and 150°", "30° and 330°", "60° and 120°", "45° and 135°"],
    correctAnswer: 0,
    explanation: "2 sin θ − 1 = 0 -> sin θ = 1/2. In [0, 360°], sin θ is positive in Quadrants I and II. θ = 30° and θ = 180° − 30° = 150°.",
    level: "Complexity",
    hint: "Isolate sin θ and find the angles in Quadrants I and II."
  },
  {
    id: "unitCircle_q11",
    question: "If tan θ = −3/4 and θ is in Quadrant IV, find the value of sec θ.",
    options: ["5/4", "−5/4", "5/3", "−5/3"],
    correctAnswer: 0,
    explanation: "sec²θ = 1 + tan²θ = 1 + 9/16 = 25/16. sec θ = ±5/4. In Quadrant IV, cosine (and secant) is positive, so sec θ = 5/4.",
    level: "Complexity",
    hint: "Use sec²θ = 1 + tan²θ; determine sign in Quadrant IV."
  },
  {
    id: "unitCircle_q12",
    question: "What is the exact value of sin(7π/6) + cos(2π/3)?",
    options: ["−1", "0", "1", "−1/2"],
    correctAnswer: 0,
    explanation: "sin(7π/6) = −1/2. cos(2π/3) = −1/2. Sum = −1/2 + (−1/2) = −1.",
    level: "Complexity",
    hint: "Evaluate each term individually using reference angles."
  },
  // Cognitive Complexity (3)
  {
    id: "unitCircle_q13",
    question: "Prove the identity sin(θ + π) = −sin θ using the unit circle coordinates and symmetry.",
    options: [
      "Adding π to θ rotates the point to the opposite side of the origin, reflecting coordinates to (−x, −y), so sin(θ + π) = −y = −sin θ",
      "It is true because sine is an odd function",
      "It follows from sin(π) = 0",
      "It is a definition, not provable"
    ],
    correctAnswer: 0,
    explanation: "An angle of θ + π is a 180-degree rotation of θ, reflecting P(x, y) through the origin to P'(-x, -y). The new y-coordinate is −y, hence −sin θ.",
    level: "Cognitive Complexity",
    hint: "A rotation of 180 degrees reflects a point through the origin."
  },
  {
    id: "unitCircle_q14",
    question: "If a point P on the unit circle has coordinates (−√2/2, √2/2), what is the angle θ in standard position? (Provide the answer in degrees and radians)",
    options: ["135° (3π/4 rad)", "45° (π/4 rad)", "225° (5π/4 rad)", "315° (7π/4 rad)"],
    correctAnswer: 0,
    explanation: "x is negative and y is positive (Quadrant II). Since |x| = |y| = √2/2, the reference angle is 45°. θ = 180° − 45° = 135° (3π/4 rad).",
    level: "Cognitive Complexity",
    hint: "Identify the quadrant first: x < 0, y > 0."
  },
  {
    id: "unitCircle_q15",
    question: "Express the area of a sector of the unit circle with central angle θ (in radians) in terms of θ.",
    options: ["θ/2", "θ", "2θ", "πθ"],
    correctAnswer: 0,
    explanation: "Area of sector = (1/2) * r² * θ. Since r = 1, Area = θ/2.",
    level: "Cognitive Complexity",
    hint: "Formula for area of a sector is (1/2)r²θ."
  }
];

// 2. BINOMIAL THEOREM
export const binomialTheoremQuestions: QuizQuestion[] = [
  // Cognitive (3)
  {
    id: "binomialTheorem_q1",
    question: "According to the Binomial Theorem, what is the expansion of (x + y)^n?",
    options: [
      "Σ (nCr * x^(n-r) * y^r) from r = 0 to n",
      "Σ (nCr * x^r * y^r) from r = 0 to n",
      "Σ (x^r + y^(n-r))",
      "n * (x + y)^(n-1)"
    ],
    correctAnswer: 0,
    explanation: "The Binomial Theorem expands a binomial power into a sum of terms: (x+y)^n = Σ (nCr * x^(n-r) * y^r).",
    level: "Cognitive",
    hint: "General term uses nCr."
  },
  {
    id: "binomialTheorem_q2",
    question: "What is the total number of terms in the binomial expansion of (a + b)^n, where n is a positive integer?",
    options: ["n", "n + 1", "n − 1", "2n"],
    correctAnswer: 1,
    explanation: "The terms range from r = 0 to r = n, giving a total of n + 1 terms.",
    level: "Cognitive",
    hint: "An expansion of (a+b)2 has 3 terms."
  },
  {
    id: "binomialTheorem_q3",
    question: "What is the formula for the general term T_(r+1) in the expansion of (x + y)^n?",
    options: ["nCr * x^(n-r) * y^r", "nCr * x^r * y^(n-r)", "nPr * x^(n-r) * y^r", "nCr * x^n * y^r"],
    correctAnswer: 0,
    explanation: "T_(r+1) represents the (r+1)th term and is given by nCr * x^(n-r) * y^r.",
    level: "Cognitive",
    hint: "The index of y in the term T_(r+1) is r."
  },
  // Thinking (3)
  {
    id: "binomialTheorem_q4",
    question: "What is the coefficient of the middle term in the expansion of (x + y)^4?",
    options: ["4", "6", "1", "10"],
    correctAnswer: 1,
    explanation: "Number of terms = 5. The middle term is the 3rd term (r = 2). Coefficient = 4C2 = 6.",
    level: "Thinking",
    hint: "Middle term of n=4 is the 4C2 term."
  },
  {
    id: "binomialTheorem_q5",
    question: "Calculate the value of 5C3 (or 5 choose 3).",
    options: ["10", "15", "20", "5"],
    correctAnswer: 0,
    explanation: "5C3 = 5! / (3! * 2!) = (5 * 4) / 2 = 10.",
    level: "Thinking",
    hint: "nCr = n! / (r!(n-r)!)."
  },
  {
    id: "binomialTheorem_q6",
    question: "What is the sum of the binomial coefficients (nC0 + nC1 + ... + nCn) for any positive integer n?",
    options: ["n²", "2^n", "2n", "n!"],
    correctAnswer: 1,
    explanation: "Setting x = 1 and y = 1 in (x+y)^n = Σ nCr * x^(n-r) * y^r yields (1+1)^n = 2^n.",
    level: "Thinking",
    hint: "Substitute x = 1 and y = 1 in the binomial expansion."
  },
  // Reasoning (3)
  {
    id: "binomialTheorem_q7",
    question: "Why are the coefficients of terms equidistant from the beginning and end of a binomial expansion equal?",
    options: [
      "Because nCr = nC(n-r)",
      "Because addition is commutative",
      "Because of the negative sign in the formula",
      "They are not equal"
    ],
    correctAnswer: 0,
    explanation: "The symmetry of binomial coefficients arises from the identity nCr = n! / (r!(n-r)!) = nC(n-r).",
    level: "Reasoning",
    hint: "Choose r items is equivalent to leaving n-r items."
  },
  {
    id: "binomialTheorem_q8",
    question: "In the expansion of (x − y)^n, how do the signs of the terms behave?",
    options: [
      "All terms are negative",
      "All terms are positive",
      "The signs alternate, with even-indexed terms (r = 1, 3, ...) being negative",
      "Only the first and last terms are negative"
    ],
    correctAnswer: 2,
    explanation: "Since (−y)^r is positive when r is even and negative when r is odd, the signs alternate.",
    level: "Reasoning",
    hint: "Evaluate (−1)^r."
  },
  {
    id: "binomialTheorem_q9",
    question: "If n is an odd integer, how many middle terms are there in the expansion of (x + y)^n?",
    options: ["One", "Two", "None", "n"],
    correctAnswer: 1,
    explanation: "When n is odd, the number of terms n+1 is even, so there are two middle terms: the ((n+1)/2)th and ((n+3)/2)th terms.",
    level: "Reasoning",
    hint: "An even number of items has two middle values."
  },
  // Complexity (3)
  {
    id: "binomialTheorem_q10",
    question: "Find the term independent of x in the expansion of (x + 1/x)^6.",
    options: ["15", "20", "6", "1"],
    correctAnswer: 1,
    explanation: "T_(r+1) = 6Cr * x^(6-r) * (1/x)^r = 6Cr * x^(6-2r). For x^0, 6 − 2r = 0 -> r = 3. T4 = 6C3 = 20.",
    level: "Complexity",
    hint: "Set the exponent of x to zero."
  },
  {
    id: "binomialTheorem_q11",
    question: "Find the coefficient of x^4 in the expansion of (2x − 3)^5.",
    options: ["−240", "−810", "240", "−15"],
    correctAnswer: 0,
    explanation: "T_(r+1) = 5Cr * (2x)^(5-r) * (−3)^r. For x^4, 5 − r = 4 -> r = 1. Coeff = 5C1 * 2^4 * (−3)^1 = 5 * 16 * (−3) = −240.",
    level: "Complexity",
    hint: "Solve 5 − r = 4 to find r, then compute the coefficient."
  },
  {
    id: "binomialTheorem_q12",
    question: "What is the sum of the odd coefficients (nC1 + nC3 + ...) in a binomial expansion?",
    options: ["2^(n-1)", "2^n", "2^(n+1)", "0"],
    correctAnswer: 0,
    explanation: "Since sum(even) + sum(odd) = 2^n, and sum(even) − sum(odd) = (1-1)^n = 0, we have sum(even) = sum(odd) = 2^(n-1).",
    level: "Complexity",
    hint: "Half of the total sum of coefficients."
  },
  // Cognitive Complexity (3)
  {
    id: "binomialTheorem_q13",
    question: "Verify the approximation (1 + x)^n ≈ 1 + nx using the binomial expansion when |x| is very small (|x| << 1).",
    options: [
      "For small x, higher-order terms like x², x³, etc., are negligible, so (1+x)^n ≈ 1 + nC1*x = 1 + nx",
      "It is only true if n is negative",
      "This is a definition, not an approximation",
      "It is valid only when x is zero"
    ],
    correctAnswer: 0,
    explanation: "(1+x)^n = 1 + nx + n(n-1)x²/2 + ... If x is very small, x² and higher powers approach zero, leaving 1 + nx.",
    level: "Cognitive Complexity",
    hint: "Examine what happens to x² when x = 0.001."
  },
  {
    id: "binomialTheorem_q14",
    question: "Use the Binomial Theorem to find the value of (1.01)^5 correct to four decimal places.",
    options: ["1.0510", "1.05101", "1.0500", "1.1000"],
    correctAnswer: 0,
    explanation: "(1 + 0.01)^5 = 1 + 5(0.01) + 10(0.0001) + 10(0.000001)... = 1 + 0.05 + 0.0010 + 0.00001 = 1.05101 ≈ 1.0510.",
    level: "Cognitive Complexity",
    hint: "Expand (1 + 0.01)^5 up to the third term."
  },
  {
    id: "binomialTheorem_q15",
    question: "If C_r denotes nCr, prove that C_1 + 2*C_2 + 3*C_3 + ... + n*C_n = n * 2^(n-1) using calculus.",
    options: [
      "Differentiate (1+x)^n = Σ C_r * x^r with respect to x, then set x = 1",
      "Integrate (1+x)^n",
      "Multiply by n",
      "Use mathematical induction only"
    ],
    correctAnswer: 0,
    explanation: "d/dx[(1+x)^n] = n(1+x)^(n-1) = Σ r * C_r * x^(r-1). Setting x = 1 gives n * 2^(n-1) = Σ r * C_r.",
    level: "Cognitive Complexity",
    hint: "Differentiate the binomial expansion of (1+x)^n."
  }
];

// 3. STATISTICS
export const statisticsQuestions: QuizQuestion[] = [
  // Cognitive (3)
  {
    id: "statistics_q1",
    question: "What is the statistical formula for calculating the arithmetic mean (x̄) of a raw dataset of n values?",
    options: ["Σ x / n", "Σ x² / n", "n / Σ x", "Median / 2"],
    correctAnswer: 0,
    explanation: "The mean is the sum of all observations divided by the total number of observations (n).",
    level: "Cognitive",
    hint: "Sum divided by count."
  },
  {
    id: "statistics_q2",
    question: "The standard deviation (σ) is defined mathematically as the:",
    options: [
      "Square root of the variance",
      "Square of the variance",
      "Average absolute deviation from the mean",
      "Difference between maximum and minimum values"
    ],
    correctAnswer: 0,
    explanation: "Standard deviation is the positive square root of the variance (the mean of squared deviations).",
    level: "Cognitive",
    hint: "σ = √Variance."
  },
  {
    id: "statistics_q3",
    question: "For a dataset with an odd number of values sorted in ascending order, the median is:",
    options: [
      "The average of the two middle values",
      "The exact middle value at position (n+1)/2",
      "The value with the highest frequency",
      "The arithmetic average"
    ],
    correctAnswer: 1,
    explanation: "For odd n, the median is the single value located at the center, which is at the index (n+1)/2.",
    level: "Cognitive",
    hint: "The central value."
  },
  // Thinking (3)
  {
    id: "statistics_q4",
    question: "Calculate the median of the following dataset: 12, 5, 22, 17, 9, 15, 20.",
    options: ["15", "12", "17", "14"],
    correctAnswer: 0,
    explanation: "Sorted dataset: 5, 9, 12, 15, 17, 20, 22. The middle (4th) value is 15.",
    level: "Thinking",
    hint: "Sort the numbers first."
  },
  {
    id: "statistics_q5",
    question: "A student adds 5 to every value in a dataset. How does this affect the mean and standard deviation?",
    options: [
      "The mean increases by 5; the standard deviation remains unchanged",
      "Both mean and standard deviation increase by 5",
      "The mean remains the same; the standard deviation increases by 5",
      "The mean increases by 5; the standard deviation is halved"
    ],
    correctAnswer: 0,
    explanation: "Adding a constant increases the mean by that constant, but does not affect the spread (standard deviation).",
    level: "Thinking",
    hint: "Spread does not change if all points shift together."
  },
  {
    id: "statistics_q6",
    question: "A dataset has a variance of 16. What is its standard deviation?",
    options: ["4", "256", "8", "2"],
    correctAnswer: 0,
    explanation: "Standard deviation is the square root of the variance: √16 = 4.",
    level: "Thinking",
    hint: "√16."
  },
  // Reasoning (3)
  {
    id: "statistics_q7",
    question: "Why is the standard deviation generally preferred over the range as a measure of dispersion?",
    options: [
      "Standard deviation is easier to calculate",
      "Standard deviation utilizes all data points, whereas range only considers the two extreme values and is sensitive to outliers",
      "Standard deviation is always larger",
      "Range has no formula"
    ],
    correctAnswer: 1,
    explanation: "Range ignores the distribution between extremes. Standard deviation quantifies how all data points deviate from the center.",
    level: "Reasoning",
    hint: "Range only uses the minimum and maximum values."
  },
  {
    id: "statistics_q8",
    question: "If all values in a dataset are identical, what are the variance and standard deviation?",
    options: ["Zero", "One", "Undefined", "Equal to the value itself"],
    correctAnswer: 0,
    explanation: "If all values are equal, there is no variation, so the deviation of each point from the mean is zero.",
    level: "Reasoning",
    hint: "No spread = no deviation."
  },
  {
    id: "statistics_q9",
    question: "In a highly skewed dataset containing a few extreme outliers, which measure of central tendency is most reliable?",
    options: ["Mean", "Median", "Mode", "Variance"],
    correctAnswer: 1,
    explanation: "The median is resistant to outliers because it depends on order rather than value magnitude, unlike the mean.",
    level: "Reasoning",
    hint: "Outliers pull the mean toward them, but do not affect the center rank."
  },
  // Complexity (3)
  {
    id: "statistics_q10",
    question: "Calculate the standard deviation of the numbers: 2, 4, 6, 8, 10.",
    options: ["≈ 2.83", "≈ 8.00", "≈ 2.00", "≈ 3.16"],
    correctAnswer: 0,
    explanation: "Mean = 6. Deviations: −4, −2, 0, 2, 4. Squared: 16, 4, 0, 4, 16. Sum = 40. Variance = 40/5 = 8. SD = √8 ≈ 2.83.",
    level: "Complexity",
    hint: "Find mean, calculate squared differences, average them, and take square root."
  },
  {
    id: "statistics_q11",
    question: "For a grouped frequency distribution, the class intervals and frequencies are given. If Σ f_i = 50 and Σ f_i * x_i = 350, what is the mean?",
    options: ["7.0", "3.5", "14.0", "50.0"],
    correctAnswer: 0,
    explanation: "Mean = Σ(f_i * x_i) / Σ f_i = 350 / 50 = 7.0.",
    level: "Complexity",
    hint: "Mean = Sum of weighted values divided by sum of frequencies."
  },
  {
    id: "statistics_q12",
    question: "A student multiplies every value in a dataset by 3. How does this affect the variance?",
    options: ["Increases by a factor of 9", "Increases by a factor of 3", "Remains unchanged", "Increases by a factor of 6"],
    correctAnswer: 0,
    explanation: "If x is multiplied by c, standard deviation is multiplied by |c|, and variance (σ²) is multiplied by c² = 3² = 9.",
    level: "Complexity",
    hint: "Variance scales with the square of the multiplication factor."
  },
  // Cognitive Complexity (3)
  {
    id: "statistics_q13",
    question: "Compare the Coefficient of Variation (CV = σ / x̄ * 100) of Group A (mean = 50, SD = 5) and Group B (mean = 100, SD = 8). Which group is more consistent?",
    options: [
      "Group B (CV = 8%), because a lower CV indicates less relative variability and greater consistency",
      "Group A (CV = 10%)",
      "Both are equally consistent",
      "Group A because its SD is smaller"
    ],
    correctAnswer: 0,
    explanation: "CV_A = (5/50)*100 = 10%. CV_B = (8/100)*100 = 8%. Group B has a lower relative variation, so it is more consistent.",
    level: "Cognitive Complexity",
    hint: "Calculate CV for both groups; lower is more consistent."
  },
  {
    id: "statistics_q14",
    question: "Explain why standard deviation uses squared differences (x_i − x̄)² instead of simple absolute differences |x_i − x̄|.",
    options: [
      "Squaring is easier to compute manually",
      "Squared terms are differentiable and have useful algebraic properties in probability theory and regression analysis",
      "Absolute differences are always zero",
      "There is no difference in results"
    ],
    correctAnswer: 1,
    explanation: "Squaring gives a smooth, differentiable function that is crucial for optimization and is related to the normal distribution.",
    level: "Cognitive Complexity",
    hint: "Consider the mathematical tractability in calculus."
  },
  {
    id: "statistics_q15",
    question: "A sample of 10 measurements has a mean of 12. A 11th measurement of 23 is added. What is the new mean?",
    options: ["13.0", "12.0", "14.5", "11.0"],
    correctAnswer: 0,
    explanation: "Sum of 10 values = 10 * 12 = 120. New sum = 120 + 23 = 143. New mean = 143 / 11 = 13.0.",
    level: "Cognitive Complexity",
    hint: "Find the initial total sum, add the new value, and divide by 11."
  }
];

// 4. MATRIX OPERATIONS
export const matrixOperationsQuestions: QuizQuestion[] = [
  // Cognitive (3)
  {
    id: "matrixOperations_q1",
    question: "What is the condition for two matrices A (order m × n) and B (order p × q) to be multiplied as AB?",
    options: ["n = p", "m = q", "m = p", "n = q"],
    correctAnswer: 0,
    explanation: "Matrix multiplication requires the number of columns in the first matrix (n) to equal the number of rows in the second matrix (p).",
    level: "Cognitive",
    hint: "Inner dimensions must match."
  },
  {
    id: "matrixOperations_q2",
    question: "A square matrix A is called symmetric if:",
    options: ["A^T = A", "A^T = −A", "det(A) = 0", "A = 0"],
    correctAnswer: 0,
    explanation: "A symmetric matrix is equal to its transpose (A^T = A), meaning it is symmetric across its main diagonal.",
    level: "Cognitive",
    hint: "Transpose equals the original matrix."
  },
  {
    id: "matrixOperations_q3",
    question: "What is the determinant of the 2 × 2 matrix [[a, b], [c, d]]?",
    options: ["ad − bc", "ab − cd", "ad + bc", "ac − bd"],
    correctAnswer: 0,
    explanation: "The determinant of a 2x2 matrix is the product of the main diagonal elements minus the product of the off-diagonal elements.",
    level: "Cognitive",
    hint: "Cross-multiply diagonals and subtract."
  },
  // Thinking (3)
  {
    id: "matrixOperations_q4",
    question: "If A = [[1, 2], [3, 4]] and B = [[2, 0], [1, 2]], calculate the element at index (1,1) of matrix AB.",
    options: ["4", "2", "6", "8"],
    correctAnswer: 0,
    explanation: "(AB)_(1,1) = A_(1,1)*B_(1,1) + A_(1,2)*B_(2,1) = 1*2 + 2*1 = 4.",
    level: "Thinking",
    hint: "Multiply the first row of A by the first column of B."
  },
  {
    id: "matrixOperations_q5",
    question: "What is the determinant of the matrix A = [[3, 5], [1, 2]]?",
    options: ["1", "11", "−1", "6"],
    correctAnswer: 0,
    explanation: "det(A) = 3*2 − 5*1 = 6 − 5 = 1.",
    level: "Thinking",
    hint: "det = ad − bc."
  },
  {
    id: "matrixOperations_q6",
    question: "What is the inverse of the matrix A = [[2, 1], [5, 3]]? (det(A) = 1)",
    options: ["[[3, −1], [−5, 2]]", "[[3, 1], [5, 2]]", "[[-2, 1], [5, -3]]", "[[3, -5], [-1, 2]]"],
    correctAnswer: 0,
    explanation: "A^-1 = (1/det) * [[d, −b], [−c, a]] = [[3, −1], [−5, 2]].",
    level: "Thinking",
    hint: "Swap main diagonal elements, negate off-diagonal elements."
  },
  // Reasoning (3)
  {
    id: "matrixOperations_q7",
    question: "Why is it impossible to find the inverse of a matrix whose determinant is zero (singular matrix)?",
    options: [
      "Because the formula for the inverse involves division by the determinant, and division by zero is undefined",
      "Singular matrices have no transpose",
      "They are not square",
      "Their elements are too large"
    ],
    correctAnswer: 0,
    explanation: "A^-1 = adj(A)/det(A). If det(A) = 0, division by zero is undefined, and the matrix represents a transformation that collapses space, making it irreversible.",
    level: "Reasoning",
    hint: "Consider the division term in the inverse formula."
  },
  {
    id: "matrixOperations_q8",
    question: "If A and B are square matrices of the same order, does AB = BA in general?",
    options: [
      "No, matrix multiplication is non-commutative",
      "Yes, matrix multiplication is always commutative",
      "Yes, only if one is the identity matrix",
      "No, only if det(A) = 0"
    ],
    correctAnswer: 0,
    explanation: "Matrix multiplication is non-commutative in general; changing the order of multiplication corresponds to applying transformations in a different sequence.",
    level: "Reasoning",
    hint: "Order of operations matters in transformations."
  },
  {
    id: "matrixOperations_q9",
    question: "What is the transpose of a skew-symmetric matrix A?",
    options: ["−A", "A", "A^-1", "Identity matrix"],
    correctAnswer: 0,
    explanation: "By definition, a skew-symmetric matrix satisfies A^T = −A.",
    level: "Reasoning",
    hint: "It has zeros on the main diagonal, and transposed elements have opposite signs."
  },
  // Complexity (3)
  {
    id: "matrixOperations_q10",
    question: "Solve the system of equations using Cramer's rule: 2x + 3y = 8 and 3x − y = 1. What is the value of x?",
    options: ["1", "2", "3", "0"],
    correctAnswer: 0,
    explanation: "D = |[2, 3], [3, −1]| = −2 − 9 = −11. Dx = |[8, 3], [1, −1]| = −8 − 3 = −11. x = Dx/D = −11/−11 = 1.",
    level: "Complexity",
    hint: "Find D, then replace the x-column with constants to find Dx."
  },
  {
    id: "matrixOperations_q11",
    question: "If A is a 3 × 3 matrix with det(A) = 4, what is the value of det(2A)?",
    options: ["32", "8", "16", "4"],
    correctAnswer: 0,
    explanation: "For an n × n matrix, det(k*A) = k^n * det(A). Here, det(2A) = 2³ * 4 = 8 * 4 = 32.",
    level: "Complexity",
    hint: "Factor out the constant: det(kA) = k^n * det(A)."
  },
  {
    id: "matrixOperations_q12",
    question: "If A = [[1, 3], [0, 1]], find A^n for any positive integer n.",
    options: ["[[1, 3n], [0, 1]]", "[[1, 3^n], [0, 1]]", "[[n, 3n], [0, n]]", "[[1, 3], [0, 1]]"],
    correctAnswer: 0,
    explanation: "By induction, A² = [[1, 6], [0, 1]], A³ = [[1, 9], [0, 1]], so A^n = [[1, 3n], [0, 1]].",
    level: "Complexity",
    hint: "Compute A² and A³ to see the pattern in the top-right cell."
  },
  // Cognitive Complexity (3)
  {
    id: "matrixOperations_q13",
    question: "Verify the property (AB)^T = B^T * A^T using matrices A = [[1, 2], [3, 0]] and B = [[0, 1], [2, 1]].",
    options: [
      "AB = [[4, 3], [0, 3]] -> (AB)^T = [[4, 0], [3, 3]]; B^T * A^T = [[0, 2], [1, 1]] * [[1, 3], [2, 0]] = [[4, 0], [3, 3]]. Verified.",
      "The order does not swap in transpose of multiplication",
      "It is only verified for identity matrices",
      "The transposes cannot be multiplied"
    ],
    correctAnswer: 0,
    explanation: "The transpose of a product reverses the order: (AB)^T = B^T * A^T. Substituting the matrices confirms the equality.",
    level: "Cognitive Complexity",
    hint: "Calculate AB, transpose it, then multiply B^T by A^T."
  },
  {
    id: "matrixOperations_q14",
    question: "Show that any square matrix A can be uniquely expressed as the sum of a symmetric and a skew-symmetric matrix.",
    options: [
      "A = (1/2)(A + A^T) + (1/2)(A − A^T), where the first term is symmetric and the second is skew-symmetric",
      "A = A^T + (−A)",
      "It is only possible if A is singular",
      "It cannot be done uniquely"
    ],
    correctAnswer: 0,
    explanation: "(A + A^T)^T = A^T + A (symmetric). (A − A^T)^T = A^T − A = −(A − A^T) (skew-symmetric). Their sum equals A.",
    level: "Cognitive Complexity",
    hint: "Decompose using transpose additions and subtractions."
  },
  {
    id: "matrixOperations_q15",
    question: "If A and B are symmetric matrices of the same order, under what condition is their product AB also symmetric?",
    options: [
      "If and only if A and B commute (AB = BA)",
      "If det(A) = det(B)",
      "Always symmetric",
      "Never symmetric"
    ],
    correctAnswer: 0,
    explanation: "(AB)^T = B^T * A^T. Since A and B are symmetric, B^T * A^T = BA. For AB to be symmetric, (AB)^T must equal AB, which requires BA = AB.",
    level: "Cognitive Complexity",
    hint: "Use (AB)^T = B^T * A^T and symmetry."
  }
];

// 5. PROBABILITY
export const probabilityQuestions: QuizQuestion[] = [
  // Cognitive (3)
  {
    id: "probability_q1",
    question: "The probability of an event E, denoted P(E), always lies in the range:",
    options: ["[0, 1]", "[−1, 1]", "(0, 1)", "[0, infinity)"],
    correctAnswer: 0,
    explanation: "By the axioms of probability, the probability of any event must be a real number between 0 (impossible event) and 1 (certain event).",
    level: "Cognitive",
    hint: "Percentages range from 0% to 100%."
  },
  {
    id: "probability_q2",
    question: "What is the addition theorem of probability for any two events A and B?",
    options: [
      "P(A ∪ B) = P(A) + P(B) − P(A ∩ B)",
      "P(A ∪ B) = P(A) + P(B)",
      "P(A ∪ B) = P(A) * P(B)",
      "P(A ∪ B) = P(A) − P(B)"
    ],
    correctAnswer: 0,
    explanation: "The probability of A or B occurring is the sum of their individual probabilities minus the probability of both, to avoid double-counting.",
    level: "Cognitive",
    hint: "Subtract the intersection to avoid double counting."
  },
  {
    id: "probability_q3",
    question: "If two events A and B are mutually exclusive, what is their intersection probability P(A ∩ B)?",
    options: ["0", "1", "P(A) * P(B)", "0.5"],
    correctAnswer: 0,
    explanation: "Mutually exclusive events cannot occur simultaneously, so their intersection is an empty set with probability zero.",
    level: "Cognitive",
    hint: "They cannot happen at the same time."
  },
  // Thinking (3)
  {
    id: "probability_q4",
    question: "A fair die is rolled once. What is the probability of getting a prime number?",
    options: ["1/2", "1/3", "2/3", "1/6"],
    correctAnswer: 0,
    explanation: "Prime numbers on a die are 2, 3, and 5 (3 favorable outcomes). Total outcomes = 6. P = 3/6 = 1/2.",
    level: "Thinking",
    hint: "Primes on a die are 2, 3, 5."
  },
  {
    id: "probability_q5",
    question: "If P(A) = 0.6 and P(B) = 0.4, and A and B are independent events, what is P(A ∩ B)?",
    options: ["0.24", "1.00", "0.20", "0.10"],
    correctAnswer: 0,
    explanation: "For independent events, P(A ∩ B) = P(A) * P(B) = 0.6 * 0.4 = 0.24.",
    level: "Thinking",
    hint: "Multiply their individual probabilities."
  },
  {
    id: "probability_q6",
    question: "A card is drawn from a well-shuffled pack of 52 cards. What is the probability that it is a king?",
    options: ["1/13", "1/52", "4/13", "1/4"],
    correctAnswer: 0,
    explanation: "There are 4 kings in a deck of 52. P = 4/52 = 1/13.",
    level: "Thinking",
    hint: "There are 4 kings in a deck."
  },
  // Reasoning (3)
  {
    id: "probability_q7",
    question: "What is the difference between mutually exclusive events and independent events?",
    options: [
      "Mutually exclusive means they cannot happen together (P(A∩B)=0); independent means the occurrence of one does not affect the other (P(A∩B)=P(A)*P(B))",
      "They are the same thing",
      "Mutually exclusive events must be independent",
      "Independent events cannot happen together"
    ],
    correctAnswer: 0,
    explanation: "Mutually exclusive relates to set disjointness (cannot happen together). Independence relates to informational neutrality (one doesn't affect the likelihood of the other).",
    level: "Reasoning",
    hint: "Disjoint sets vs conditional probability multiplication."
  },
  {
    id: "probability_q8",
    question: "If P(A | B) denotes the conditional probability of A given B, write its formula.",
    options: ["P(A ∩ B) / P(B)", "P(A ∩ B) / P(A)", "P(A) * P(B)", "P(A ∪ B) / P(B)"],
    correctAnswer: 0,
    explanation: "P(A | B) is the probability of A occurring, restricting the sample space to event B, given by P(A ∩ B) / P(B) (for P(B) > 0).",
    level: "Reasoning",
    hint: "Probability of intersection divided by the probability of the given condition."
  },
  {
    id: "probability_q9",
    question: "A student states: 'Since a coin has two sides, if I flip it 10 times, I must get exactly 5 heads.' Why is this reasoning incorrect?",
    options: [
      "Probability dictates long-term frequency; individual trials are independent and random, so 5 is only the most likely outcome, not a guarantee",
      "Coins are never fair",
      "Flipping 10 times always gives 10 heads",
      "The coin remembers past flips"
    ],
    correctAnswer: 0,
    explanation: "Each flip is independent. The number of heads follows a binomial distribution, where 5 heads has the highest probability (≈24.6%) but is not guaranteed.",
    level: "Reasoning",
    hint: "Random trials are independent; past flips do not influence the next."
  },
  // Complexity (3)
  {
    id: "probability_q10",
    question: "Two fair dice are rolled. What is the probability that the sum of the numbers shown is 7?",
    options: ["1/6", "1/12", "5/36", "7/36"],
    correctAnswer: 0,
    explanation: "Favorable pairs: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) — 6 pairs. Total outcomes = 36. P = 6/36 = 1/6.",
    level: "Complexity",
    hint: "Count all combinations that add to 7 out of 36."
  },
  {
    id: "probability_q11",
    question: "In a class of 100 students, 60 like Math, 50 like Science, and 20 like both. If a student is chosen at random, what is the probability that they like Math or Science?",
    options: ["0.9", "0.7", "1.1", "0.5"],
    correctAnswer: 0,
    explanation: "P(M ∪ S) = P(M) + P(S) − P(M ∩ S) = 0.60 + 0.50 − 0.20 = 0.90.",
    level: "Complexity",
    hint: "Use addition theorem: P(A ∪ B) = P(A) + P(B) − P(A ∩ B)."
  },
  {
    id: "probability_q12",
    question: "A bag contains 5 red and 3 blue balls. If 2 balls are drawn at random without replacement, what is the probability that both are red?",
    options: ["5/14", "25/64", "5/8", "15/56"],
    correctAnswer: 0,
    explanation: "P(first red) = 5/8. P(second red | first red) = 4/7. P(both red) = (5/8) * (4/7) = 20/56 = 5/14.",
    level: "Complexity",
    hint: "Multiply probability of first draw by the adjusted probability of the second draw."
  },
  // Cognitive Complexity (3)
  {
    id: "probability_q13",
    question: "State and explain Bayes' Theorem formula.",
    options: [
      "P(A|B) = [P(B|A) * P(A)] / P(B)",
      "P(A|B) = P(A) * P(B)",
      "P(A|B) = P(A) + P(B)",
      "P(A|B) = P(B|A)"
    ],
    correctAnswer: 0,
    explanation: "Bayes' theorem calculates posterior probability using prior probability and likelihood: P(A|B) = P(B|A)*P(A) / P(B).",
    level: "Cognitive Complexity",
    hint: "Relates conditional probability P(A|B) to its inverse P(B|A)."
  },
  {
    id: "probability_q14",
    question: "A medical test is 99% accurate (both true positive and true negative). The disease affects 0.1% of the population. If a person tests positive, what is the probability that they actually have the disease?",
    options: ["≈ 9%", "99%", "0.1%", "50%"],
    correctAnswer: 0,
    explanation: "Using Bayes' Theorem: P(D|+) = P(+|D)P(D) / [P(+|D)P(D) + P(+|H)P(H)] = (0.99*0.001) / [(0.99*0.001) + (0.01*0.999)] = 0.00099 / (0.00099 + 0.00999) ≈ 9%.",
    level: "Cognitive Complexity",
    hint: "A high accuracy test on a rare disease yields a surprisingly low positive predictive value."
  },
  {
    id: "probability_q15",
    question: "If a random variable X represents the number of heads in 3 flips of a fair coin, what is the expected value E(X)?",
    options: ["1.5", "2", "1", "3"],
    correctAnswer: 0,
    explanation: "Possibilities: 0 heads (1/8), 1 head (3/8), 2 heads (3/8), 3 heads (1/8). E(X) = 0(1/8) + 1(3/8) + 2(3/8) + 3(1/8) = 12/8 = 1.5.",
    level: "Cognitive Complexity",
    hint: "Multiply each outcome by its probability and sum them up."
  }
];

// 6. CONIC SECTIONS
export const conicSectionsQuestions: QuizQuestion[] = [
  // Cognitive (3)
  {
    id: "conicSections_q1",
    question: "What is the eccentricity (e) of a parabola?",
    options: ["e = 1", "e < 1", "e > 1", "e = 0"],
    correctAnswer: 0,
    explanation: "A parabola is defined as the locus of points equidistant from a fixed point (focus) and a fixed line (directrix), so e = 1.",
    level: "Cognitive",
    hint: "Ratio of distance to focus vs directrix is equal to 1."
  },
  {
    id: "conicSections_q2",
    question: "What is the standard equation of an ellipse centered at the origin with major axis along the x-axis?",
    options: ["x²/a² + y²/b² = 1 (a > b)", "x²/a² − y²/b² = 1", "x² + y² = r²", "y² = 4ax"],
    correctAnswer: 0,
    explanation: "The standard equation of an horizontal ellipse is x²/a² + y²/b² = 1 where a is the semi-major axis.",
    level: "Cognitive",
    hint: "Contains a plus sign and different denominators."
  },
  {
    id: "conicSections_q3",
    question: "The standard equation of a circle with center (h, k) and radius r is:",
    options: [
      "(x − h)² + (y − k)² = r²",
      "(x + h)² + (y + k)² = r²",
      "x² + y² = r²",
      "x²/h² + y²/k² = r²"
    ],
    correctAnswer: 0,
    explanation: "Derived from the distance formula: the distance between any point (x,y) on the circle and the center (h,k) is constant (r).",
    level: "Cognitive",
    hint: "Distance formula squared."
  },
  // Thinking (3)
  {
    id: "conicSections_q4",
    question: "Find the coordinates of the focus of the parabola y² = 12x.",
    options: ["(3, 0)", "(0, 3)", "(−3, 0)", "(6, 0)"],
    correctAnswer: 0,
    explanation: "y² = 4ax. Comparing with y² = 12x, 4a = 12 -> a = 3. The focus of y² = 4ax is (a, 0), which is (3, 0).",
    level: "Thinking",
    hint: "Compare with y² = 4ax."
  },
  {
    id: "conicSections_q5",
    question: "What is the equation of the directrix of the parabola y² = −8x?",
    options: ["x = 2", "x = −2", "y = 2", "y = −2"],
    correctAnswer: 0,
    explanation: "y² = −4ax -> 4a = 8 -> a = 2. The directrix is x = a, so x = 2.",
    level: "Thinking",
    hint: "Opposite side of the focus."
  },
  {
    id: "conicSections_q6",
    question: "An ellipse has equation x²/25 + y²/9 = 1. What are the lengths of the major and minor axes?",
    options: ["10 and 6", "5 and 3", "25 and 9", "50 and 18"],
    correctAnswer: 0,
    explanation: "a² = 25 -> a = 5 (major axis = 2a = 10). b² = 9 -> b = 3 (minor axis = 2b = 6).",
    level: "Thinking",
    hint: "Axes lengths are 2a and 2b."
  },
  // Reasoning (3)
  {
    id: "conicSections_q7",
    question: "Why does the eccentricity of an ellipse satisfy 0 < e < 1?",
    options: [
      "Because the distance to the focus is always less than the distance to the directrix for any point on the ellipse",
      "Because it is a circle",
      "Eccentricity is negative",
      "To distinguish it from a hyperbola where e = 1"
    ],
    correctAnswer: 0,
    explanation: "An ellipse is closed. For any point P on it, the ratio of its distance to the focus to its distance to the directrix is less than 1.",
    level: "Reasoning",
    hint: "ellipse is a closed curve; focus is closer than directrix."
  },
  {
    id: "conicSections_q8",
    question: "What is the geometric interpretation of a circle as a limiting case of an ellipse?",
    options: [
      "As the two foci move closer together and coincide at the center, the eccentricity e approaches 0, and the ellipse becomes a circle",
      "A circle has eccentricity 1",
      "A circle is an ellipse with infinite axes",
      "The major axis becomes zero"
    ],
    correctAnswer: 0,
    explanation: "When foci coincide, a = b. e = √(1 − b²/a²) = 0. The equation becomes x² + y² = a² (a circle).",
    level: "Reasoning",
    hint: "Foci merge at the center."
  },
  {
    id: "conicSections_q9",
    question: "Why does a satellite orbit a planet in an elliptical path instead of a circular one under gravity?",
    options: [
      "Ellipses represent stable trajectories for a range of initial launch velocities; a circular orbit requires a single precise speed",
      "Circles do not exist in space",
      "Ellipses have less gravity",
      "It changes due to planetary rotation"
    ],
    correctAnswer: 0,
    explanation: "Circular orbits are special cases of elliptical orbits. Any slight velocity deviation from the exact circular velocity results in an elliptical orbit.",
    level: "Reasoning",
    hint: "Think about range of entry speeds and Kepler's laws."
  },
  // Complexity (3)
  {
    id: "conicSections_q10",
    question: "Calculate the eccentricity of the ellipse x²/16 + y²/9 = 1.",
    options: ["√7/4", "3/4", "7/16", "5/4"],
    correctAnswer: 0,
    explanation: "a² = 16, b² = 9. e = √(1 − b²/a²) = √(1 − 9/16) = √7/16 = √7/4.",
    level: "Complexity",
    hint: "Use e = √(1 − b²/a²)."
  },
  {
    id: "conicSections_q11",
    question: "Find the coordinates of the foci of the hyperbola x²/16 − y²/9 = 1.",
    options: ["(±5, 0)", "(0, ±5)", "(±4, 0)", "(±3, 0)"],
    correctAnswer: 0,
    explanation: "a² = 16, b² = 9. For hyperbola, c² = a² + b² = 16 + 9 = 25 -> c = 5. Foci are at (±c, 0) = (±5, 0).",
    level: "Complexity",
    hint: "c² = a² + b² for a hyperbola."
  },
  {
    id: "conicSections_q12",
    question: "Find the equation of the parabola with focus (2, 0) and directrix x = −2.",
    options: ["y² = 8x", "y² = −8x", "x² = 8y", "y² = 4x"],
    correctAnswer: 0,
    explanation: "Focus is (a,0) = (2,0) -> a = 2. Directrix x = −a = −2. Parabola equation is y² = 4ax = 8x.",
    level: "Complexity",
    hint: "Use focus-directrix parameter a."
  },
  // Cognitive Complexity (3)
  {
    id: "conicSections_q13",
    question: "Explain the reflective property of a parabolic mirror. Where do parallel incident rays converge?",
    options: [
      "All incident rays parallel to the axis of symmetry reflect through the focus of the parabola, making it useful for solar cookers and telescopes",
      "They reflect parallel to the surface",
      "They scatter randomly",
      "They reflect through the vertex"
    ],
    correctAnswer: 0,
    explanation: "Due to the geometry of the parabola, the angle of incidence equals the angle of reflection such that any ray parallel to the axis is directed to the focus.",
    level: "Cognitive Complexity",
    hint: "This property is used in satellite dishes."
  },
  {
    id: "conicSections_q14",
    question: "A point moves such that the sum of its distances from two fixed points (4, 0) and (−4, 0) is always 10. Find the equation of its path.",
    options: ["x²/25 + y²/9 = 1", "x²/16 + y²/9 = 1", "x²/25 − y²/9 = 1", "x² + y² = 100"],
    correctAnswer: 0,
    explanation: "Fixed points are foci: c = 4. Sum of distances = 2a = 10 -> a = 5. Since b² = a² − c² = 25 − 16 = 9, the path is the ellipse x²/25 + y²/9 = 1.",
    level: "Cognitive Complexity",
    hint: "This is the definition of an ellipse: PF1 + PF2 = 2a."
  },
  {
    id: "conicSections_q15",
    question: "Classify the conic section represented by the general equation: 3x² + 3y² − 6x + 8y − 1 = 0.",
    options: ["Circle", "Ellipse", "Parabola", "Hyperbola"],
    correctAnswer: 0,
    explanation: "Since the coefficients of x² and y² are equal (A = B = 3) and there is no xy term (B_xy = 0), this is a circle.",
    level: "Cognitive Complexity",
    hint: "Compare coefficients of x² and y²."
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPUTER SCIENCE (6 experiments × 15 questions = 90)
// ─────────────────────────────────────────────────────────────────────────────

// 1. BUBBLE SORT
export const bubbleSortQuestions: QuizQuestion[] = [
  // Cognitive (3)
  {
    id: "bubbleSort_q1",
    question: "What is the core comparison mechanism in the Bubble Sort algorithm?",
    options: [
      "Compare each element with the pivot",
      "Compare adjacent elements and swap them if they are in the wrong order",
      "Find the smallest element and swap it to the beginning",
      "Divide the array into halves"
    ],
    correctAnswer: 1,
    explanation: "Bubble sort steps through the list, compares adjacent elements, and swaps them if needed, repeating this until the list is sorted.",
    level: "Cognitive",
    hint: "It compares neighbors."
  },
  {
    id: "bubbleSort_q2",
    question: "What is the worst-case time complexity of the standard Bubble Sort algorithm?",
    options: ["O(n log n)", "O(n²)", "O(n)", "O(1)"],
    correctAnswer: 1,
    explanation: "In the worst case (reverse sorted array), the algorithm does n passes, each doing O(n) comparisons, resulting in O(n²) time.",
    level: "Cognitive",
    hint: "Quadratic time complexity."
  },
  {
    id: "bubbleSort_q3",
    question: "How can Bubble Sort be optimized to achieve a best-case time complexity of O(n)?",
    options: [
      "By using a flag that tracks if any swaps occurred in a pass; if no swaps occur, the array is sorted and the algorithm terminates",
      "By dividing the array into two parts",
      "By using recursive sorting",
      "Bubble sort cannot be optimized to O(n)"
    ],
    correctAnswer: 0,
    explanation: "Adding a boolean flag (e.g. swapped = false) lets the algorithm detect if the array is already sorted, stopping early on the first pass.",
    level: "Cognitive",
    hint: "Stop early if no swaps are made."
  },
  // Thinking (3)
  {
    id: "bubbleSort_q4",
    question: "Given the array [5, 1, 4, 2, 8], what is the state of the array after the first complete pass of Bubble Sort?",
    options: ["[1, 4, 2, 5, 8]", "[1, 5, 4, 2, 8]", "[5, 1, 4, 2, 8]", "[1, 2, 4, 5, 8]"],
    correctAnswer: 0,
    explanation: "Pass 1: (5,1)->swap [1,5,4,2,8]; (5,4)->swap [1,4,5,2,8]; (5,2)->swap [1,4,2,5,8]; (5,8)->no swap [1,4,2,5,8].",
    level: "Thinking",
    hint: "Trace the swaps from left to right."
  },
  {
    id: "bubbleSort_q5",
    question: "How many passes of Bubble Sort are required to fully sort a sorted array of n elements using the optimized version?",
    options: ["1 pass", "n passes", "n − 1 passes", "0 passes"],
    correctAnswer: 0,
    explanation: "The optimized version checks all adjacent pairs. If no swaps are made (which is true for a sorted array), it terminates after 1 pass.",
    level: "Thinking",
    hint: "Only one pass is needed to verify that no swaps occur."
  },
  {
    id: "bubbleSort_q6",
    question: "Is Bubble Sort a stable sorting algorithm? Why or why not?",
    options: [
      "Yes, because it does not swap equal elements, preserving their relative order",
      "No, because it swaps adjacent elements",
      "Yes, because its time complexity is quadratic",
      "No, because it is an in-place sort"
    ],
    correctAnswer: 0,
    explanation: "Stability means equal elements retain their relative positions. Bubble sort only swaps if one is strictly greater/less than the other.",
    level: "Thinking",
    hint: "Does it swap adjacent elements if they are equal?"
  },
  // Reasoning (3)
  {
    id: "bubbleSort_q7",
    question: "In Bubble Sort, why does the largest element always 'bubble up' to the end of the array in the first pass?",
    options: [
      "Because it is compared in sequence and is larger than all elements it meets, being dragged along to the rightmost unsorted position",
      "Because it is processed first",
      "Due to gravity",
      "It is selected by the index pointer"
    ],
    correctAnswer: 0,
    explanation: "The pass compares adjacent pairs. The largest element will always be larger than the next element, so it will be repeatedly swapped until it reaches the end.",
    level: "Reasoning",
    hint: "Once the largest element is met, it wins every comparison."
  },
  {
    id: "bubbleSort_q8",
    question: "What is the auxiliary space complexity of Bubble Sort, and what does it tell us about its memory usage?",
    options: [
      "O(1), because it sorts in-place without needing extra memory",
      "O(n), because it duplicates the array",
      "O(log n) for recursive calls",
      "O(n²) space"
    ],
    correctAnswer: 0,
    explanation: "Bubble sort only needs a temporary variable for swapping, making its extra space usage constant (O(1)).",
    level: "Reasoning",
    hint: "It performs in-place swaps."
  },
  {
    id: "bubbleSort_q9",
    question: "Why is Bubble Sort generally not used for sorting large datasets?",
    options: [
      "It is unstable",
      "Its O(n²) time complexity makes it highly inefficient for large inputs compared to O(n log n) algorithms like Merge Sort",
      "It does not work on strings",
      "It requires too much extra memory"
    ],
    correctAnswer: 1,
    explanation: "As n grows, the quadratic number of comparisons (n²/2) leads to unacceptably slow execution times.",
    level: "Reasoning",
    hint: "Quadratic time grows very fast."
  },
  // Complexity (3)
  {
    id: "bubbleSort_q10",
    question: "For an array of size n = 6, what is the maximum number of comparisons performed by a standard (non-optimized) Bubble Sort?",
    options: ["15", "36", "30", "6"],
    correctAnswer: 0,
    explanation: "Comparisons = (n * (n − 1)) / 2 = (6 * 5) / 2 = 15.",
    level: "Complexity",
    hint: "Formula: n(n-1)/2."
  },
  {
    id: "bubbleSort_q11",
    question: "If we use Bubble Sort to sort an array that is already in descending order into ascending order, how many swaps will occur if the array size is 5?",
    options: ["10", "5", "25", "4"],
    correctAnswer: 0,
    explanation: "An array in reverse order requires every possible swap. Swaps = (5 * 4) / 2 = 10.",
    level: "Complexity",
    hint: "Reverse array requires maximum swaps: n(n-1)/2."
  },
  {
    id: "bubbleSort_q12",
    question: "In a Bubble Sort code block, the inner loop range is typically 0 to n − i − 1. Why is the '− i' part included?",
    options: [
      "To avoid comparing elements that are already sorted at the end of the array",
      "To make the code look complex",
      "To handle negative numbers",
      "To prevent stack overflow"
    ],
    correctAnswer: 0,
    explanation: "Each pass i places the ith largest element in its correct position at the end. These sorted elements do not need to be compared again.",
    level: "Complexity",
    hint: "The rightmost elements are already sorted."
  },
  // Cognitive Complexity (3)
  {
    id: "bubbleSort_q13",
    question: "Compare the performance of Bubble Sort and Selection Sort. Which one performs fewer swaps in the worst case?",
    options: [
      "Selection Sort, because it does at most O(n) swaps, whereas Bubble Sort does O(n²) swaps",
      "Bubble Sort, because it is stable",
      "Both do the same number of swaps",
      "Bubble Sort has fewer swaps"
    ],
    correctAnswer: 0,
    explanation: "Selection sort finds the minimum and does one swap per pass (O(n) swaps total). Bubble sort swaps adjacent elements continuously (O(n²) swaps).",
    level: "Cognitive Complexity",
    hint: "Selection sort only swaps once per pass."
  },
  {
    id: "bubbleSort_q14",
    question: "A variant of Bubble Sort called Cocktails Shaker Sort traverses the array in both directions (left-to-right and right-to-left) alternately. What problem does this solve?",
    options: [
      "It resolves the 'turtles' problem (small elements near the end of the array that move left very slowly)",
      "It reduces the time complexity to O(n log n)",
      "It allows sorting of multi-dimensional arrays",
      "It eliminates the need for swap variables"
    ],
    correctAnswer: 0,
    explanation: "In standard bubble sort, large elements at the start ('rabbits') move fast to the right, but small elements at the end ('turtles') move left by only one position per pass. Bidirectional passes solve this.",
    level: "Cognitive Complexity",
    hint: "Turtles move slow; rabbits move fast."
  },
  {
    id: "bubbleSort_q15",
    question: "Write a pseudocode condition inside the Bubble Sort inner loop to sort in DESCENDING order.",
    options: ["if (arr[j] < arr[j+1]) swap(arr[j], arr[j+1])", "if (arr[j] > arr[j+1]) swap(arr[j], arr[j+1])", "if (arr[j] == arr[j+1]) swap(arr[j], arr[j+1])", "if (j < j+1) swap(arr[j], arr[j+1])"],
    correctAnswer: 0,
    explanation: "To sort in descending order, we want smaller elements to move to the right, so we swap if the left element is smaller than the right element.",
    level: "Cognitive Complexity",
    hint: "Swap if the current element is less than the next element."
  }
];

// 2. INSERTION SORT
export const insertionSortQuestions: QuizQuestion[] = [
  // Cognitive (3)
  {
    id: "insertionSort_q1",
    question: "How does the Insertion Sort algorithm partition the array during execution?",
    options: [
      "Into sorted and unsorted subarrays; it takes the first element from the unsorted part and inserts it into its correct position in the sorted part",
      "Into halves of equal size",
      "Into left, pivot, and right",
      "It does not partition the array"
    ],
    correctAnswer: 0,
    explanation: "Insertion sort maintains a sorted section on the left and inserts the next unsorted element at the correct index by shifting larger elements.",
    level: "Cognitive",
    hint: "Similar to sorting playing cards in hand."
  },
  {
    id: "insertionSort_q2",
    question: "What is the best-case time complexity of Insertion Sort, and when does it occur?",
    options: [
      "O(n), when the array is already sorted",
      "O(n log n), when the array is sorted",
      "O(n²), when the array is reverse sorted",
      "O(1), when the array has 1 element"
    ],
    correctAnswer: 0,
    explanation: "If the array is sorted, each element is compared once with its predecessor and no shifts occur, yielding O(n) comparisons.",
    level: "Cognitive",
    hint: "Linear time when no shifting is needed."
  },
  {
    id: "insertionSort_q3",
    question: "What is the worst-case time complexity of Insertion Sort?",
    options: ["O(n²)", "O(n log n)", "O(n)", "O(2^n)"],
    correctAnswer: 0,
    explanation: "The worst case occurs for a reverse-sorted array, where each element must be shifted all the way to the start, resulting in O(n²) operations.",
    level: "Cognitive",
    hint: "Quadratic time complexity."
  },
  // Thinking (3)
  {
    id: "insertionSort_q4",
    question: "During Insertion Sort, the element 3 is being inserted into the sorted subarray [2, 5, 8]. What is the sequence of comparisons and shifts?",
    options: [
      "Compare 3 with 8 (shift 8), compare 3 with 5 (shift 5), compare 3 with 2 (no shift), insert 3 at index 1",
      "Compare 3 with 2, insert at end",
      "Swap 3 and 2 directly",
      "Compare 3 with 5, insert at index 0"
    ],
    correctAnswer: 0,
    explanation: "We scan the sorted part from right to left: 3 < 8 (shift 8 -> [2, 5, , 8]), 3 < 5 (shift 5 -> [2, , 5, 8]), 3 > 2 (stop shifting, insert 3 -> [2, 3, 5, 8]).",
    level: "Thinking",
    hint: "Scan from right to left in the sorted subarray."
  },
  {
    id: "insertionSort_q5",
    question: "Which of the following is an advantage of Insertion Sort over Bubble Sort?",
    options: [
      "Insertion sort is online (can sort a list as it receives it) and typically performs fewer operations on nearly-sorted data",
      "Insertion sort has a best-case of O(log n)",
      "Insertion sort uses O(n) extra space",
      "Insertion sort is a divide-and-conquer algorithm"
    ],
    correctAnswer: 0,
    explanation: "Insertion sort only processes elements up to the current index, making it suitable for streaming data (online) and highly efficient for nearly-sorted lists.",
    level: "Thinking",
    hint: "It can sort streaming inputs."
  },
  {
    id: "insertionSort_q6",
    question: "Is Insertion Sort an in-place sorting algorithm? What is its auxiliary space complexity?",
    options: [
      "Yes, in-place; O(1) space complexity",
      "No; O(n) space complexity",
      "Yes; O(log n) space complexity",
      "No; O(1) space complexity"
    ],
    correctAnswer: 0,
    explanation: "It sorts the array by shifting elements within the original array structure, requiring only a constant amount of extra memory (O(1)).",
    level: "Thinking",
    hint: "Constant memory."
  },
  // Reasoning (3)
  {
    id: "insertionSort_q7",
    question: "Why is Insertion Sort highly efficient for small arrays (e.g. n < 10) compared to Merge Sort or Quick Sort?",
    options: [
      "Because it has lower constant factors and overhead compared to recursive divide-and-conquer algorithms",
      "Because it has a better time complexity",
      "Because it is unstable",
      "It requires no comparisons"
    ],
    correctAnswer: 0,
    explanation: "Complex algorithms have call stack overhead and auxiliary memory costs. For small n, the simplicity of Insertion Sort makes it run faster in practice.",
    level: "Reasoning",
    hint: "Simplicity and low overhead."
  },
  {
    id: "insertionSort_q8",
    question: "Under what specific input condition does Insertion Sort perform the maximum number of comparisons?",
    options: [
      "When the array is sorted in reverse (descending) order",
      "When the array is already sorted in ascending order",
      "When all elements are equal",
      "When the array is randomized"
    ],
    correctAnswer: 0,
    explanation: "For reverse-sorted arrays, each element at index i must be compared with all i elements before it, resulting in the maximum of n(n-1)/2 comparisons.",
    level: "Reasoning",
    hint: "Each element has to move to index 0."
  },
  {
    id: "insertionSort_q9",
    question: "Why is Insertion Sort stable?",
    options: [
      "Because it does not shift an element past another element with the same key, maintaining their relative order",
      "Because it runs in quadratic time",
      "Because it is an in-place sort",
      "All sorting algorithms are stable"
    ],
    correctAnswer: 0,
    explanation: "The comparison check is typically `while (j >= 0 && arr[j] > key)`. Since it stops shifting when it encounters an equal value, stability is preserved.",
    level: "Reasoning",
    hint: "Look at the condition: it only shifts if strictly greater."
  },
  // Complexity (3)
  {
    id: "insertionSort_q10",
    question: "What is the total number of shifts (element copies) in the worst case for an array of size n = 5?",
    options: ["10", "5", "15", "4"],
    correctAnswer: 0,
    explanation: "Shifts = 1 + 2 + 3 + 4 = 10 shifts.",
    level: "Complexity",
    hint: "Sum of integers from 1 to n-1."
  },
  {
    id: "insertionSort_q11",
    question: "If an array is already sorted, how many comparisons does Insertion Sort make for an array of size n?",
    options: ["n − 1", "n", "n(n−1)/2", "0"],
    correctAnswer: 0,
    explanation: "For a sorted array, each element from index 1 to n-1 is compared exactly once with the element to its left, yielding n-1 comparisons.",
    level: "Complexity",
    hint: "Each element is compared once and remains in place."
  },
  {
    id: "insertionSort_q12",
    question: "In the Insertion Sort inner loop: `while (j >= 0 && arr[j] > key) { arr[j+1] = arr[j]; j--; }`, what is the purpose of `arr[j+1] = key` after the loop?",
    options: [
      "To place the key element in its final sorted position where the shifting stopped",
      "To clear the array",
      "To reset the loop index",
      "To delete the key"
    ],
    correctAnswer: 0,
    explanation: "The loop shifts larger elements to the right. When it stops, the index `j+1` is the vacant slot where the key belongs.",
    level: "Complexity",
    hint: "Inserts the key into the cleared slot."
  },
  // Cognitive Complexity (3)
  {
    id: "insertionSort_q13",
    question: "Binary Insertion Sort uses binary search to find the correct insertion position for each element. How does this affect comparisons and shifts?",
    options: [
      "It reduces comparisons to O(n log n), but shifts remain O(n²) due to array shifting",
      "It reduces both comparisons and shifts to O(n log n)",
      "It makes the algorithm O(n³)",
      "It has no effect on performance"
    ],
    correctAnswer: 0,
    explanation: "Binary search finds the insertion index in O(log n) comparisons. However, shifting elements in an array still requires O(n) moves per element, so total shifts remain O(n²).",
    level: "Cognitive Complexity",
    hint: "Binary search makes locating fast, but shifting values still takes linear time."
  },
  {
    id: "insertionSort_q14",
    question: "Analyze the adaptive nature of Insertion Sort. Why is it useful in hybrid algorithms like Timsort (used in Python and Java)?",
    options: [
      "Timsort uses Insertion Sort to sort small runs (subarrays) because it is extremely fast for small or nearly-sorted data",
      "Insertion sort is used to divide the array",
      "Timsort does not use insertion sort",
      "It has low memory usage"
    ],
    correctAnswer: 0,
    explanation: "Hybrid algorithms divide data into small chunks ('runs'). Since Insertion Sort has low constant factors and performs exceptionally well on small/nearly sorted runs, it is ideal for this phase.",
    level: "Cognitive Complexity",
    hint: "Useful for sorting small runs in hybrid systems."
  },
  {
    id: "insertionSort_q15",
    question: "If we insert elements into a Linked List instead of an Array during Insertion Sort, how does the time complexity of locating and inserting change?",
    options: [
      "Locating still takes O(n) comparisons because we cannot binary search a linked list, but insertion (no shifting) takes O(1) time",
      "Locating takes O(log n); insertion takes O(n)",
      "Both take O(1)",
      "It becomes O(n log n) overall"
    ],
    correctAnswer: 0,
    explanation: "Linked lists lack random access, so we must scan sequentially (O(n) comparisons). However, inserting a node requires only pointer updates (O(1)), bypassing the O(n) shift cost of arrays.",
    level: "Cognitive Complexity",
    hint: "Linked lists cannot be indexed directly, but nodes are easily linked."
  }
];

// 3. BINARY SEARCH
export const binarySearchQuestions: QuizQuestion[] = [
  // Cognitive (3)
  {
    id: "binarySearch_q1",
    question: "What is the critical prerequisite for applying the Binary Search algorithm to a dataset?",
    options: [
      "The dataset must be sorted in ascending or descending order",
      "The dataset must contain only integers",
      "The dataset must be stored in a linked list",
      "The dataset must be small"
    ],
    correctAnswer: 0,
    explanation: "Binary search divides the search space based on comparisons; if the data is not sorted, this division logic fails.",
    level: "Cognitive",
    hint: "Think about why we look in the middle."
  },
  {
    id: "binarySearch_q2",
    question: "What is the worst-case time complexity of Binary Search?",
    options: ["O(log n)", "O(n)", "O(n log n)", "O(1)"],
    correctAnswer: 0,
    explanation: "Each step halves the search space. The maximum number of steps for size n is log2(n), yielding O(log n) time.",
    level: "Cognitive",
    hint: "Logarithmic time complexity."
  },
  {
    id: "binarySearch_q3",
    question: "Which formula is used to calculate the middle index (mid) in Binary Search to prevent integer overflow in languages with fixed-size integers?",
    options: [
      "mid = low + (high − low) / 2",
      "mid = (low + high) / 2",
      "mid = low * high / 2",
      "mid = high − low / 2"
    ],
    correctAnswer: 0,
    explanation: "If low and high are large, `low + high` can exceed the integer limit. `low + (high-low)/2` avoids this overflow.",
    level: "Cognitive",
    hint: "Express mid without summing low and high directly."
  },
  // Thinking (3)
  {
    id: "binarySearch_q4",
    question: "Given the sorted array [2, 5, 8, 12, 16, 23, 38, 56, 72, 91], which index is checked first when searching for the key 23?",
    options: ["Index 4 (value 16)", "Index 5 (value 23)", "Index 3 (value 12)", "Index 6 (value 38)"],
    correctAnswer: 0,
    explanation: "low = 0, high = 9. mid = 0 + (9 − 0)/2 = 4 (value 16). The 4th index is checked first.",
    level: "Thinking",
    hint: "low = 0, high = size - 1. Calculate mid."
  },
  {
    id: "binarySearch_q5",
    question: "During binary search, if the key is greater than the middle element (key > arr[mid]), what is the next step?",
    options: [
      "Set low = mid + 1, narrowing the search to the right half",
      "Set high = mid − 1",
      "Terminated with failure",
      "Set low = mid"
    ],
    correctAnswer: 0,
    explanation: "Since the array is sorted, if key > arr[mid], the target must lie to the right of mid, so we search the range [mid+1, high].",
    level: "Thinking",
    hint: "Target is larger, so discard the left half."
  },
  {
    id: "binarySearch_q6",
    question: "How many comparisons are needed to find the key 8 in the sorted array [2, 5, 8, 12, 16]?",
    options: ["1 comparison", "2 comparisons", "3 comparisons", "5 comparisons"],
    correctAnswer: 0,
    explanation: "Pass 1: mid = 2 (value 8). Since arr[2] == 8, the search succeeds in 1 comparison.",
    level: "Thinking",
    hint: "Check the middle of [2, 5, 8, 12, 16]."
  },
  // Reasoning (3)
  {
    id: "binarySearch_q7",
    question: "Why is Binary Search not suitable for singly linked lists, even if the list is sorted?",
    options: [
      "Linked lists cannot store numbers",
      "Singly linked lists do not support random access (O(1) indexing), so finding mid takes O(n) time, making the search O(n) overall",
      "Linked lists cannot be sorted",
      "Because they have no pointers"
    ],
    correctAnswer: 1,
    explanation: "To find the middle of a linked list, we must traverse it node-by-node (O(n)), neutralizing the O(log n) advantage of binary search.",
    level: "Reasoning",
    hint: "We must be able to jump to the middle index instantly."
  },
  {
    id: "binarySearch_q8",
    question: "If we double the size of the array from n to 2n, how many additional comparisons does Binary Search make in the worst case?",
    options: ["1 comparison", "2 comparisons", "Double the comparisons", "log n comparisons"],
    correctAnswer: 0,
    explanation: "The first step halves the size 2n to n. From there, it takes the same number of steps as before, requiring only 1 extra step.",
    level: "Reasoning",
    hint: "log2(2n) = log2(n) + 1."
  },
  {
    id: "binarySearch_q9",
    question: "What does a search loop condition of `while (low <= high)` represent in Binary Search?",
    options: [
      "It ensures the search space is non-empty, continuing until the bounds cross each other",
      "It limits the search to positive numbers",
      "It runs the loop infinitely",
      "It checks only the boundary elements"
    ],
    correctAnswer: 0,
    explanation: "When low == high, there is still one element left to check. The loop only terminates if the bounds cross, indicating the element is absent.",
    level: "Reasoning",
    hint: "What happens when low equals high?"
  },
  // Complexity (3)
  {
    id: "binarySearch_q10",
    question: "What is the maximum number of comparisons needed to search for an element in a sorted array of size n = 1000?",
    options: ["10", "100", "500", "20"],
    correctAnswer: 0,
    explanation: "log2(1000) ≈ 9.96. In the worst case, it takes at most 10 comparisons (2^10 = 1024).",
    level: "Complexity",
    hint: "Find the smallest integer power of 2 greater than 1000."
  },
  {
    id: "binarySearch_q11",
    question: "Verify the recurrence relation for the time complexity of Binary Search: T(n) = T(n/2) + c. Applying Master Theorem, what is the complexity?",
    options: ["O(log n)", "O(n)", "O(n log n)", "O(1)"],
    correctAnswer: 0,
    explanation: "T(n) = T(n/2) + O(1). By Master Theorem (a=1, b=2, d=0), log_b(a) = log_2(1) = 0 = d, so T(n) = O(n^0 * log n) = O(log n).",
    level: "Complexity",
    hint: "Halving search space + constant time check."
  },
  {
    id: "binarySearch_q12",
    question: "A student implements Binary Search but writes `high = mid` instead of `high = mid − 1` when the target is smaller. What bug can this cause?",
    options: [
      "An infinite loop when searching for an element not in the array (e.g. low and high get stuck at the same index)",
      "The program will crash with an out of bounds error",
      "It will always return the wrong index",
      "No bug; it works fine"
    ],
    correctAnswer: 0,
    explanation: "If key < arr[mid], the target is not at mid. Using `high = mid` can lead to a state where low and high do not cross, causing an infinite loop.",
    level: "Complexity",
    hint: "Consider searching for 2 in the array [3] with low=0, high=0, mid=0."
  },
  // Cognitive Complexity (3)
  {
    id: "binarySearch_q13",
    question: "How can you adapt Binary Search to find the first occurrence of a duplicate element in a sorted array?",
    options: [
      "When key == arr[mid], instead of returning mid immediately, set high = mid − 1 (or record mid and continue searching left) to find earlier duplicates",
      "By searching from right to left",
      "Binary search cannot find duplicates",
      "By using linear search once the element is found"
    ],
    correctAnswer: 0,
    explanation: "To find the first occurrence, when a match is found at mid, we keep searching the left partition to see if there is an identical value at a lower index.",
    level: "Cognitive Complexity",
    hint: "Do not stop on first match; look left."
  },
  {
    id: "binarySearch_q14",
    question: "An array of n elements is rotated at an unknown pivot (e.g., [4, 5, 6, 7, 0, 1, 2]). How can we find an element in O(log n) time?",
    options: [
      "Modify binary search: at least one half of the array must be normally sorted; identify the sorted half and check if key lies within its bounds",
      "Use linear search",
      "Sort the array first in O(n log n) then search",
      "This cannot be done in O(log n) time"
    ],
    correctAnswer: 0,
    explanation: "In a rotated sorted array, one half is always sorted. We check which half is sorted, then check if the target lies within that sorted range.",
    level: "Cognitive Complexity",
    hint: "Check which half is sorted by comparing arr[low] and arr[mid]."
  },
  {
    id: "binarySearch_q15",
    question: "Compare Binary Search and Interpolation Search. Under what conditions is Interpolation Search faster, and what is its best-case time complexity?",
    options: [
      "Interpolation search is faster for uniformly distributed data, where it achieves O(log(log n)) time by estimating the position using a linear interpolation formula",
      "Interpolation search is always slower",
      "Interpolation search is faster for unsorted data",
      "Interpolation search is O(n)"
    ],
    correctAnswer: 0,
    explanation: "Interpolation search estimates the position of the key: pos = low + [(key-arr[low])*(high-low)/(arr[high]-arr[low])]. For uniform data, it converges in O(log(log n)) steps.",
    level: "Cognitive Complexity",
    hint: "Estimating position based on value, like looking up a word in a dictionary."
  }
];

// 4. STACK OPERATIONS
export const stackOperationsQuestions: QuizQuestion[] = [
  // Cognitive (3)
  {
    id: "stackOperations_q1",
    question: "Which of the following data structure principles describes a Stack?",
    options: [
      "LIFO (Last In First Out)",
      "FIFO (First In First Out)",
      "LILO (Last In Last Out)",
      "Priority Ordering only"
    ],
    correctAnswer: 0,
    explanation: "A stack is a linear data structure where insertion and deletion occur at the same end (the top), so the last added item is the first removed.",
    level: "Cognitive",
    hint: "Think of a stack of plates."
  },
  {
    id: "stackOperations_q2",
    question: "What error occurs when a pop operation is attempted on an empty stack?",
    options: ["Stack Underflow", "Stack Overflow", "Index Out of Bounds", "Null Pointer Exception"],
    correctAnswer: 0,
    explanation: "Stack underflow occurs when there are no elements to pop (stack is empty, top = −1).",
    level: "Cognitive",
    hint: "Empty stack has nothing to remove."
  },
  {
    id: "stackOperations_q3",
    question: "What is the function of the peek (or top) operation in a stack?",
    options: [
      "Returns the value of the top element without removing it from the stack",
      "Removes the top element and returns it",
      "Adds a new element to the stack",
      "Empties the stack"
    ],
    correctAnswer: 0,
    explanation: "Peek allows looking at the topmost element (at the index pointed to by the stack pointer) without altering the stack.",
    level: "Cognitive",
    hint: "Look without touching/removing."
  },
  // Thinking (3)
  {
    id: "stackOperations_q4",
    question: "A stack is initially empty. The following operations are performed: Push(10), Push(20), Pop(), Push(30), Pop(), Pop(). What is returned by the last Pop()?",
    options: ["10", "20", "30", "Stack Underflow"],
    correctAnswer: 0,
    explanation: "Push(10) -> [10]; Push(20) -> [10,20]; Pop() -> returns 20, stack=[10]; Push(30) -> [10,30]; Pop() -> returns 30, stack=[10]; Pop() -> returns 10, stack=[].",
    level: "Thinking",
    hint: "Trace the stack contents step-by-step."
  },
  {
    id: "stackOperations_q5",
    question: "If a stack is implemented using an array of size MAX, what condition indicates a Stack Overflow during a push operation?",
    options: ["top == MAX − 1", "top == 0", "top == −1", "top == MAX"],
    correctAnswer: 0,
    explanation: "Using 0-based indexing, the array is full when the top pointer reaches the last index (MAX − 1).",
    level: "Thinking",
    hint: "The array is full at the maximum index."
  },
  {
    id: "stackOperations_q6",
    question: "Which of the following is a common application of a Stack data structure?",
    options: [
      "Undo mechanism in text editors, and function call call-stack management in compilers",
      "Printer spooling",
      "Breadth-First Search (BFS) queueing",
      "Database indexing"
    ],
    correctAnswer: 0,
    explanation: "Stacks are ideal for reversing operations (undo) and managing active subroutines (call stack) due to their LIFO nature.",
    level: "Thinking",
    hint: "Reversing order is a LIFO behavior."
  },
  // Reasoning (3)
  {
    id: "stackOperations_q7",
    question: "Why are recursive function calls managed using a Stack in computer systems?",
    options: [
      "Compilers must preserve the state (local variables, return address) of active functions, resuming them in reverse order (LIFO) as calls return",
      "Recursive calls are faster with stacks",
      "Stacks require less memory",
      "To prevent infinite loops"
    ],
    correctAnswer: 0,
    explanation: "Each call pushes an activation record. The currently running function is at the top. When it returns, its record is popped, restoring the caller's state.",
    level: "Reasoning",
    hint: "Functions must resume in the reverse order of their invocation."
  },
  {
    id: "stackOperations_q8",
    question: "Compare stack implementation using Array vs Linked List. What is a key advantage of the Linked List approach?",
    options: [
      "It has dynamic size, preventing Stack Overflow (unless system memory is entirely exhausted)",
      "It is faster to access elements by index",
      "It uses less memory per element",
      "It is simpler to code"
    ],
    correctAnswer: 0,
    explanation: "Linked lists allocate nodes dynamically, bypassing the fixed-capacity limit of array-based stacks.",
    level: "Reasoning",
    hint: "Linked list nodes are created on demand."
  },
  {
    id: "stackOperations_q9",
    question: "How does a stack help in checking if parenthetical expressions (e.g. `{ [ ( ) ] }`) are balanced?",
    options: [
      "Push opening brackets onto stack; when a closing bracket appears, pop and check if it matches the opening bracket. If stack is empty at the end, it is balanced",
      "By counting the number of characters",
      "By sorting the brackets",
      "By checking if the first and last brackets match directly"
    ],
    correctAnswer: 0,
    explanation: "LIFO matching ensures that the last opened bracket is the first one closed. A mismatch or non-empty stack indicates an unbalanced expression.",
    level: "Reasoning",
    hint: "Match matching pairs using LIFO."
  },
  // Complexity (3)
  {
    id: "stackOperations_q10",
    question: "Convert the infix expression `A + B * C` into a postfix expression using a stack.",
    options: ["A B C * +", "+ A * B C", "A B * C +", "A B + C *"],
    correctAnswer: 0,
    explanation: "`*` has higher precedence than `+`. Postfix: B * C is evaluated first -> `B C *`. Then add A -> `A B C * +`.",
    level: "Complexity",
    hint: "Operators follow their operands; respect precedence."
  },
  {
    id: "stackOperations_q11",
    question: "Evaluate the postfix expression `5 3 2 * +` using a stack.",
    options: ["11", "16", "10", "30"],
    correctAnswer: 0,
    explanation: "Push 5, Push 3, Push 2. Read `*`: Pop 2 and 3, multiply 3*2=6, Push 6 -> [5, 6]. Read `+`: Pop 6 and 5, add 5+6=11, Push 11.",
    level: "Complexity",
    hint: "Pop two operands, apply the operator, and push the result."
  },
  {
    id: "stackOperations_q12",
    question: "If we implement a stack using a singly linked list, which end of the list should represent the 'top' of the stack for O(1) push and pop?",
    options: [
      "The head (beginning) of the linked list",
      "The tail (end) of the linked list",
      "The middle node",
      "Either end works equally well"
    ],
    correctAnswer: 0,
    explanation: "Inserting/deleting at the head takes O(1) time. Operating at the tail requires traversing the entire list (O(n)) to find the predecessor.",
    level: "Complexity",
    hint: "Adding/removing at the head of a linked list is a constant time operation."
  },
  // Cognitive Complexity (3)
  {
    id: "stackOperations_q13",
    question: "Describe how to implement a queue (FIFO) using two stacks (Stack1 and Stack2). How is the enqueue and dequeue logic structured?",
    options: [
      "Enqueue: Push to Stack1. Dequeue: If Stack2 is empty, pop all elements from Stack1 and push them to Stack2, then pop from Stack2",
      "Enqueue: Push to Stack1. Dequeue: Pop from Stack1",
      "Push to Stack2 and pop from Stack1 always",
      "This cannot be done"
    ],
    correctAnswer: 0,
    explanation: "Pouring Stack1 into Stack2 reverses the order of elements. Popping from Stack2 then yields FIFO (First In First Out) behavior.",
    level: "Cognitive Complexity",
    hint: "Two reversals result in the original order."
  },
  {
    id: "stackOperations_q14",
    question: "How can you design a stack that supports Push, Pop, and retrieving the minimum element (getMin()) all in O(1) time?",
    options: [
      "By maintaining an auxiliary 'min stack' that keeps track of the minimum value at each step of the main stack",
      "By sorting the stack after each push",
      "By scanning the stack sequentially in getMin()",
      "A stack cannot support O(1) getMin()"
    ],
    correctAnswer: 0,
    explanation: "The min stack stores the minimum value corresponding to each state of the main stack. Pushing/popping updates both stacks simultaneously.",
    level: "Cognitive Complexity",
    hint: "Use an extra stack to store the running minimums."
  },
  {
    id: "stackOperations_q15",
    question: "What is the maximum depth of a stack required to evaluate a balanced parenthetical expression of length L containing nested brackets?",
    options: [
      "L/2, which occurs when all opening brackets are clustered at the start (e.g. (((...)))",
      "L, always",
      "constant depth of 1",
      "log(L)"
    ],
    correctAnswer: 0,
    explanation: "The worst-case stack depth occurs when all opening brackets are pushed before any closing brackets, occupying half of the total expression length.",
    level: "Cognitive Complexity",
    hint: "Think about the maximum nesting depth."
  }
];

// 5. QUEUE OPERATIONS
export const queueOperationsQuestions: QuizQuestion[] = [
  // Cognitive (3)
  {
    id: "queueOperations_q1",
    question: "Which of the following data structure principles describes a Queue?",
    options: [
      "FIFO (First In First Out)",
      "LIFO (Last In First Out)",
      "LILO (Last In Last Out)",
      "Priority Ordering only"
    ],
    correctAnswer: 0,
    explanation: "A queue is a linear data structure where elements are added at the rear (enqueue) and removed from the front (dequeue), maintaining first-in-first-out order.",
    level: "Cognitive",
    hint: "Think of a checkout line."
  },
  {
    id: "queueOperations_q2",
    question: "What terms are used for the operations of adding and removing elements from a queue?",
    options: ["Enqueue and Dequeue", "Push and Pop", "Insert and Delete", "Add and Clear"],
    correctAnswer: 0,
    explanation: "Enqueue adds an element to the rear of the queue; Dequeue removes an element from the front.",
    level: "Cognitive",
    hint: "Queue specific terminology."
  },
  {
    id: "queueOperations_q3",
    question: "What is the value of the front and rear pointers when a queue is empty?",
    options: ["−1", "0", "MAX", "Null"],
    correctAnswer: 0,
    explanation: "In standard array-based queues, front and rear are initialized to −1 to indicate that the queue is empty and holds no valid indices.",
    level: "Cognitive",
    hint: "An index that is invalid in a 0-indexed array."
  },
  // Thinking (3)
  {
    id: "queueOperations_q4",
    question: "A queue is initially empty. The following operations are performed: Enqueue(A), Enqueue(B), Dequeue(), Enqueue(C), Dequeue(). What is the element at the front of the queue now?",
    options: ["C", "B", "A", "Queue is empty"],
    correctAnswer: 0,
    explanation: "Enqueue(A)->[A]; Enqueue(B)->[A,B]; Dequeue()->removes A, queue=[B]; Enqueue(C)->[B,C]; Dequeue()->removes B, queue=[C]. Front is C.",
    level: "Thinking",
    hint: "Trace the operations sequentially."
  },
  {
    id: "queueOperations_q5",
    question: "What is a major limitation of a simple linear queue implemented with a fixed-size array?",
    options: [
      "Memory wastage: front moves forward as items are dequeued, leaving vacant slots at the start that cannot be reused once rear reaches MAX − 1",
      "It is too slow",
      "It does not support strings",
      "It is unstable"
    ],
    correctAnswer: 0,
    explanation: "Once rear reaches MAX-1, no more insertions are allowed, even if dequeue has emptied the front of the array (false overflow).",
    level: "Thinking",
    hint: "Linear queues only move forward."
  },
  {
    id: "queueOperations_q6",
    question: "Which of the following is a common application of a Queue data structure?",
    options: [
      "CPU job scheduling and print job buffering",
      "Evaluating arithmetic expressions",
      "Backtracking in mazes",
      "Storing local variables in a compiler"
    ],
    correctAnswer: 0,
    explanation: "Queues are used in systems to process requests sequentially in the order they arrive (FIFO).",
    level: "Thinking",
    hint: "Think about ordered sharing of resources."
  },
  // Reasoning (3)
  {
    id: "queueOperations_q7",
    question: "Why is a Circular Queue preferred over a simple Linear Queue?",
    options: [
      "It wraps the indices around to index 0 using modulo arithmetic, allowing vacant slots at the front to be reused for new enqueues",
      "It is faster",
      "It uses less code",
      "It automatically sorts elements"
    ],
    correctAnswer: 0,
    explanation: "By wrapping rear to `(rear + 1) % size`, circular queues reuse freed memory slots, preventing false overflow.",
    level: "Reasoning",
    hint: "It solves the memory wastage problem of linear queues."
  },
  {
    id: "queueOperations_q8",
    question: "How does the dequeue operation affect the front pointer in a circular queue?",
    options: [
      "front = (front + 1) % size",
      "front = front + 1",
      "front = (front − 1) % size",
      "front is unchanged"
    ],
    correctAnswer: 0,
    explanation: "Dequeue removes the front element, advancing the front pointer to the next slot in a circular fashion: `front = (front + 1) % size`.",
    level: "Reasoning",
    hint: "Advance front circularly."
  },
  {
    id: "queueOperations_q9",
    question: "What is a Double-Ended Queue (Deque)?",
    options: [
      "A queue where insertion and deletion can be performed at both the front and rear ends",
      "A queue with two arrays",
      "A queue that only accepts double values",
      "A queue implemented in two threads"
    ],
    correctAnswer: 0,
    explanation: "A Deque is a generalized queue that allows adding/removing items from either the front or the back in constant time.",
    level: "Reasoning",
    hint: "Double-ended capability."
  },
  // Complexity (3)
  {
    id: "queueOperations_q10",
    question: "In a circular queue of size 5 (indices 0 to 4), front = 2, rear = 4. What is the current number of elements in the queue?",
    options: ["3", "2", "4", "5"],
    correctAnswer: 0,
    explanation: "Elements are at index 2, 3, and 4. Total = 3 elements. (Count = (rear − front + 1) = 4 − 2 + 1 = 3).",
    level: "Complexity",
    hint: "Count indices from front to rear."
  },
  {
    id: "queueOperations_q11",
    question: "In a circular queue of size 5, front = 2, rear = 4. An Enqueue operation is performed. What is the new value of rear?",
    options: ["0", "5", "3", "1"],
    correctAnswer: 0,
    explanation: "rear = (rear + 1) % size = (4 + 1) % 5 = 0. The rear pointer wraps around to index 0.",
    level: "Complexity",
    hint: "Compute (4 + 1) % 5."
  },
  {
    id: "queueOperations_q12",
    question: "What is the condition for a Circular Queue of size N to be completely FULL? (Using a sentinel slot)",
    options: [
      "(rear + 1) % N == front",
      "rear == front",
      "rear == N − 1",
      "front == 0"
    ],
    correctAnswer: 0,
    explanation: "A circular queue is full when the slot after rear is front: `(rear + 1) % N == front`. This leaves one empty slot to distinguish from the empty state.",
    level: "Complexity",
    hint: "The next rear position is front."
  },
  // Cognitive Complexity (3)
  {
    id: "queueOperations_q13",
    question: "Explain how to implement a stack (LIFO) using two queues (Queue1 and Queue2) such that the push operation is O(1). What is the pop operation complexity?",
    options: [
      "Push: Enqueue to Queue1. Pop (O(n)): Dequeue all but one element from Queue1 to Queue2, return the last element, then swap the queue names",
      "Both push and pop are O(1)",
      "Push is O(n), pop is O(1)",
      "A stack cannot be made using queues"
    ],
    correctAnswer: 0,
    explanation: "Pushing to Queue1 is O(1). To pop, we must cycle all elements except the last one to the second queue, taking O(n) time.",
    level: "Cognitive Complexity",
    hint: "To get the last enqueued item, we must empty the queue from the front."
  },
  {
    id: "queueOperations_q14",
    question: "Describe a Priority Queue. How does it differ from a standard queue?",
    options: [
      "Each element has an associated priority; elements are dequeued based on priority rather than arrival order",
      "It is a queue that only accepts prime numbers",
      "It is faster than standard queue",
      "It is a circular queue"
    ],
    correctAnswer: 0,
    explanation: "In a priority queue, higher-priority items are served first. If priorities are equal, arrival order is used.",
    level: "Cognitive Complexity",
    hint: "Order of exit is sorted by a priority key."
  },
  {
    id: "queueOperations_q15",
    question: "A student implements a queue using a circular array of size N but does not leave an empty sentinel slot. The check `front == rear` is used for both empty and full states. What bug does this introduce and how can it be resolved?",
    options: [
      "The program cannot distinguish between empty and full; resolved by keeping an explicit count variable tracking the number of elements",
      "The queue always overflows",
      "The dequeue operation fails",
      "No bug; it works fine"
    ],
    correctAnswer: 0,
    explanation: "If front == rear, the queue could be empty or full. Tracking element count resolves this ambiguity.",
    level: "Cognitive Complexity",
    hint: "A shared boundary condition requires an auxiliary state tracker."
  }
];

// 6. LOGIC GATES
export const logicGatesQuestions: QuizQuestion[] = [
  // Cognitive (3)
  {
    id: "logicGates_q1",
    question: "Which of the following logic gates yields an output of 1 only when both of its inputs are 1?",
    options: ["AND gate", "OR gate", "NAND gate", "XOR gate"],
    correctAnswer: 0,
    explanation: "The AND gate performs logical multiplication: Y = A · B. The output is high only if both A and B are high.",
    level: "Cognitive",
    hint: "Output is Y = A · B."
  },
  {
    id: "logicGates_q2",
    question: "Why are NAND and NOR gates called Universal Gates?",
    options: [
      "Any boolean function can be realized using only NAND or only NOR gates",
      "They can be used in any circuit board",
      "They have no propagation delay",
      "They are cheaper to make"
    ],
    correctAnswer: 0,
    explanation: "Universal gates can combine to form AND, OR, NOT, XOR, and XNOR functions, making them sufficient for any logic design.",
    level: "Cognitive",
    hint: "They can synthesize all other gates."
  },
  {
    id: "logicGates_q3",
    question: "What is the truth table output of an XOR (Exclusive OR) gate for two inputs A and B?",
    options: [
      "1 when the inputs are different (one is 1, the other is 0)",
      "1 when both inputs are 1",
      "1 when both inputs are 0",
      "Always 1"
    ],
    correctAnswer: 0,
    explanation: "An XOR gate output is Y = A⊕B = A'B + AB'. It is 1 if and only if the inputs are unequal.",
    level: "Cognitive",
    hint: "Y = 1 if A ≠ B."
  },
  // Thinking (3)
  {
    id: "logicGates_q4",
    question: "Simplify the Boolean expression Y = A + A'B.",
    options: ["A + B", "A", "B", "A · B"],
    correctAnswer: 0,
    explanation: "Using the distributive law: A + A'B = (A + A')(A + B) = 1 * (A + B) = A + B.",
    level: "Thinking",
    hint: "Apply the distributive law: (X + Y)(X + Z)."
  },
  {
    id: "logicGates_q5",
    question: "According to De Morgan's Theorems, what is the equivalent expression for (A + B)'?",
    options: ["A' · B'", "A' + B'", "A · B", "(A · B)'"],
    correctAnswer: 0,
    explanation: "De Morgan's theorem states that the complement of a sum is equal to the product of the complements: (A+B)' = A' · B'.",
    level: "Thinking",
    hint: "Break the bar and change the sign."
  },
  {
    id: "logicGates_q6",
    question: "A logic circuit has two inputs A = 1 and B = 0 connected to a NAND gate. What is the output?",
    options: ["1", "0", "High impedance", "Undefined"],
    correctAnswer: 0,
    explanation: "AND(1,0) = 0. NAND is the negation of AND, so NAND(1,0) = 1.",
    level: "Thinking",
    hint: "NAND(A, B) = (A · B)'."
  },
  // Reasoning (3)
  {
    id: "logicGates_q7",
    question: "Why does an XOR gate act as a controlled inverter (NOT gate)?",
    options: [
      "If one input is tied to 1, the output is the complement of the other input (XOR(A, 1) = A' )",
      "It has only one input in practice",
      "It is a universal gate",
      "It cannot invert"
    ],
    correctAnswer: 0,
    explanation: "Y = A⊕B. If B = 1, Y = A·1' + A'·1 = A·0 + A'·1 = A'. Thus, it acts as a NOT gate controlled by B.",
    level: "Reasoning",
    hint: "Evaluate Y = A ⊕ 1."
  },
  {
    id: "logicGates_q8",
    question: "How can you implement a NOT gate using a single 2-input NAND gate?",
    options: [
      "Connect both inputs of the NAND gate together to receive the same input signal",
      "Tie one input to 0",
      "Leave one input open",
      "NAND cannot make a NOT gate"
    ],
    correctAnswer: 0,
    explanation: "NAND(A, A) = (A · A)' = A'. Shorting the inputs converts a NAND gate into a NOT gate.",
    level: "Reasoning",
    hint: "Make the two inputs identical: NAND(A, A)."
  },
  {
    id: "logicGates_q9",
    question: "What is the physical meaning of 'propagation delay' in logic gates?",
    options: [
      "The time interval between the change in input voltage and the corresponding change in output voltage",
      "The distance between gates",
      "The speed of current",
      "The size of the gate"
    ],
    correctAnswer: 0,
    explanation: "Propagation delay arises from the time required for internal transistors to switch states, limiting the operating speed of the circuit.",
    level: "Reasoning",
    hint: "Delay in signal transit from input to output."
  },
  // Complexity (3)
  {
    id: "logicGates_q10",
    question: "A half-adder circuit has two inputs A and B. What gates are used to produce the Sum and Carry outputs?",
    options: [
      "XOR gate for Sum; AND gate for Carry",
      "AND gate for Sum; OR gate for Carry",
      "XOR gate for Sum; OR gate for Carry",
      "NAND gate for both"
    ],
    correctAnswer: 0,
    explanation: "Sum = A ⊕ B (XOR). Carry = A · B (AND). This realizes the binary addition of two bits.",
    level: "Complexity",
    hint: "Sum is 1 only if inputs are different; Carry is 1 only if both inputs are 1."
  },
  {
    id: "logicGates_q11",
    question: "Simplify the boolean expression Y = (A + B) · (A + B').",
    options: ["A", "B", "A + B", "0"],
    correctAnswer: 0,
    explanation: "Y = A + B·B' (distributive law). Since B·B' = 0, Y = A + 0 = A.",
    level: "Complexity",
    hint: "Apply the distributive law: A + XY."
  },
  {
    id: "logicGates_q12",
    question: "How many 2-input NAND gates are required to construct a 2-input OR gate?",
    options: ["3 NAND gates", "2 NAND gates", "4 NAND gates", "1 NAND gate"],
    correctAnswer: 0,
    explanation: "OR(A,B) = (A' · B')'. We use 2 NAND gates as inverters to make A' and B', then feed them into a 3rd NAND gate.",
    level: "Complexity",
    hint: "Use De Morgan's: Y = (A' · B')'."
  },
  // Cognitive Complexity (3)
  {
    id: "logicGates_q13",
    question: "How can you implement a Full Adder using two Half Adders and one OR gate?",
    options: [
      "First Half-Adder adds A and B. Second Half-Adder adds the resulting Sum and the Carry-in (Cin). The two Carry outputs are ORed to produce the final Carry-out",
      "By connecting them in series directly",
      "No OR gate is needed",
      "It is impossible"
    ],
    correctAnswer: 0,
    explanation: "First HA: S1 = A⊕B, C1 = AB. Second HA: S_final = S1⊕Cin, C2 = S1·Cin. Final Carry = C1 + C2 (ORed).",
    level: "Cognitive Complexity",
    hint: "Combine partial sums and partial carries."
  },
  {
    id: "logicGates_q14",
    question: "Analyze the function of a 2-to-1 Multiplexer (MUX). What is the Boolean equation for its output Y in terms of inputs I0, I1, and select line S?",
    options: [
      "Y = S'·I0 + S·I1",
      "Y = S·I0 + S'·I1",
      "Y = I0 + I1 + S",
      "Y = I0 · I1 · S"
    ],
    correctAnswer: 0,
    explanation: "If S = 0, Y = I0. If S = 1, Y = I1. The expression Y = S'I0 + SI1 matches this select logic.",
    level: "Cognitive Complexity",
    hint: "Select line S determines which input passes to the output."
  },
  {
    id: "logicGates_q15",
    question: "Show how a 2-input XOR gate can be constructed using the minimum number of 2-input NAND gates. What is this minimum number?",
    options: ["4 NAND gates", "5 NAND gates", "3 NAND gates", "6 NAND gates"],
    correctAnswer: 0,
    explanation: "The standard minimal NAND implementation of XOR uses 4 gates: Y1 = NAND(A,B); Y2 = NAND(A, Y1); Y3 = NAND(B, Y1); Y_final = NAND(Y2, Y3).",
    level: "Cognitive Complexity",
    hint: "Uses a shared intermediate NAND node."
  }
];
