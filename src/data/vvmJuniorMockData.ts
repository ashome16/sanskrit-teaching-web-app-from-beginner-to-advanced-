/**
 * Official Vidyarthi Vigyan Manthan (VVM) 2026–27 Mock Exam Datasets
 * - Junior Group (Classes 6–8): Exam ID VVM-2026-JR-MOCK-01
 * - Senior Group (Classes 9–11): Exam ID VVM-2026-SR-MOCK-01
 */

export type VvmSectionType = 'Part A' | 'Part B';

export type VvmCategoryType =
  | 'Indian Contributions to Science'
  | 'Tri-Shakti Biographies'
  | 'NCERT Science & Maths'
  | 'Logic & Reasoning';

export type VvmCohort = 'junior' | 'senior';

export interface VvmMockQuestion {
  id: number;
  section: VvmSectionType;
  category: VvmCategoryType;
  question: string;
  options: string[];
  rawOptions: string[];
  correctOption: 'A' | 'B' | 'C' | 'D';
  correctIndex: number; // 0 for A, 1 for B, 2 for C, 3 for D
  explanation: string;
  marksCorrect: number; // +4
  marksIncorrect: number; // 0 for Part A, -1 for Part B
}

export interface VvmMockRules {
  partA: {
    questionsCount: number;
    marksPerCorrect: number;
    negativeMarks: number;
    qualifyingPercentage: number;
    cutoffMarks: number;
    maxMarks: number;
  };
  partB: {
    questionsCount: number;
    marksPerCorrect: number;
    negativeMarks: number;
    maxMarks: number;
  };
  totalQuestions: number;
  totalMaxMarks: number;
  durationMinutes: number;
}

export interface VvmMockExam {
  examId: string;
  title: string;
  cohort: VvmCohort;
  cohortLabel: string;
  durationMinutes: number;
  rules: VvmMockRules;
  questions: VvmMockQuestion[];
}

export const VVM_2026_MOCK_RULES: VvmMockRules = {
  partA: {
    questionsCount: 12,
    marksPerCorrect: 4,
    negativeMarks: 0,
    qualifyingPercentage: 50,
    cutoffMarks: 24, // 50% of 48
    maxMarks: 48,
  },
  partB: {
    questionsCount: 18,
    marksPerCorrect: 4,
    negativeMarks: -1,
    maxMarks: 72,
  },
  totalQuestions: 30,
  totalMaxMarks: 120,
  durationMinutes: 30,
};

export const VVM_2026_JR_MOCK_RULES = VVM_2026_MOCK_RULES;
export const VVM_2026_SR_MOCK_RULES = VVM_2026_MOCK_RULES;

export const VVM_2026_JR_MOCK_QUESTIONS: VvmMockQuestion[] = [
  {
    id: 1,
    section: "Part A",
    category: "Indian Contributions to Science",
    question: "Which ancient Indian text contains geometric rules for constructing fire altars (Vedis), including an early statement of the Pythagorean theorem?",
    options: ["Caraka Saṃhitā", "Śulba Sūtras", "Arthaśāstra", "Rasaratnākara"],
    rawOptions: ["A) Caraka Saṃhitā", "B) Śulba Sūtras", "C) Arthaśāstra", "D) Rasaratnākara"],
    correctOption: "B",
    correctIndex: 1,
    explanation: "Baudhāyana's Śulba Sūtras (c. 800 BCE) detail geometric constructions for Vedic altars and state the diagonal relationship of a rectangle.",
    marksCorrect: 4,
    marksIncorrect: 0,
  },
  {
    id: 2,
    section: "Part A",
    category: "Indian Contributions to Science",
    question: "Ancient Indian metallurgists pioneered the distillation of which metal at Zawar in Rajasthan centuries before Europe?",
    options: ["Aluminium", "Titanium", "Zinc", "Platinum"],
    rawOptions: ["A) Aluminium", "B) Titanium", "C) Zinc", "D) Platinum"],
    correctOption: "C",
    correctIndex: 2,
    explanation: "Zawar in Rajasthan is the world's oldest known site for industrial-scale downward distillation of metallic zinc.",
    marksCorrect: 4,
    marksIncorrect: 0,
  },
  {
    id: 3,
    section: "Part A",
    category: "Indian Contributions to Science",
    question: "In his treatise Āryabhaṭīya, Āryabhaṭa accurately explained that lunar eclipses occur due to:",
    options: ["Clouds blocking the Moon", "The shadow of the Earth falling on the Moon", "The Sun moving behind Mars", "Cooling of the Moon's surface"],
    rawOptions: ["A) Clouds blocking the Moon", "B) The shadow of the Earth falling on the Moon", "C) The Sun moving behind Mars", "D) Cooling of the Moon's surface"],
    correctOption: "B",
    correctIndex: 1,
    explanation: "Āryabhaṭa correctly deduced that the Moon shines by reflected sunlight and eclipses are caused by shadows cast by the Earth and Moon.",
    marksCorrect: 4,
    marksIncorrect: 0,
  },
  {
    id: 4,
    section: "Part A",
    category: "Indian Contributions to Science",
    question: "Which ancient Indian scholar is revered as the 'Father of Surgery' and described over 120 surgical instruments in his Saṃhitā?",
    options: ["Suśruta", "Patañjali", "Kaṇāda", "Varāhamihira"],
    rawOptions: ["A) Suśruta", "B) Patañjali", "C) Kaṇāda", "D) Varāhamihira"],
    correctOption: "A",
    correctIndex: 0,
    explanation: "Suśruta authored the Suśruta Saṃhitā, detailing rhinoplasty, cataract surgery, and precise surgical tools.",
    marksCorrect: 4,
    marksIncorrect: 0,
  },
  {
    id: 5,
    section: "Part A",
    category: "Indian Contributions to Science",
    question: "The famous rust-resistant Iron Pillar near the Qutub Minar in Delhi owes its corrosion resistance primarily to a protective layer containing:",
    options: ["Chromium and Nickel", "Phosphorus (Misawite)", "Lead and Tin", "Copper Sulphate"],
    rawOptions: ["A) Chromium and Nickel", "B) Phosphorus (Misawite)", "C) Lead and Tin", "D) Copper Sulphate"],
    correctOption: "B",
    correctIndex: 1,
    explanation: "High phosphorus content in the wrought iron formed a passive crystalline iron-hydrogen-phosphate hydrate (misawite) layer.",
    marksCorrect: 4,
    marksIncorrect: 0,
  },
  {
    id: 6,
    section: "Part A",
    category: "Indian Contributions to Science",
    question: "Which Indian philosopher proposed the atomic theory of matter (Paramāṇu) in the Vaiśeṣika Sūtra?",
    options: ["Kapila", "Kaṇāda", "Gautama", "Jaimini"],
    rawOptions: ["A) Kapila", "B) Kaṇāda", "C) Gautama", "D) Jaimini"],
    correctOption: "B",
    correctIndex: 1,
    explanation: "Maharshi Kaṇāda theorized that all physical matter is composed of indivisible eternal particles called Paramāṇu.",
    marksCorrect: 4,
    marksIncorrect: 0,
  },
  {
    id: 7,
    section: "Part A",
    category: "Tri-Shakti Biographies",
    question: "Dr. Anna Mani is fondly known as the 'Weather Woman of India'. Under which Nobel Laureate did she begin her research career in Bengaluru?",
    options: ["Homi J. Bhabha", "C. V. Raman", "Vikram Sarabhai", "S. Chandrasekhar"],
    rawOptions: ["A) Homi J. Bhabha", "B) C. V. Raman", "C) Vikram Sarabhai", "D) S. Chandrasekhar"],
    correctOption: "B",
    correctIndex: 1,
    explanation: "Anna Mani worked under Sir C. V. Raman at the Indian Institute of Science (IISc), studying the spectroscopy of diamonds and rubies.",
    marksCorrect: 4,
    marksIncorrect: 0,
  },
  {
    id: 8,
    section: "Part A",
    category: "Tri-Shakti Biographies",
    question: "Which specialized meteorological instrument did Anna Mani develop to measure atmospheric ozone levels in India?",
    options: ["Barograph", "Ozonesonde", "Seismometer", "Hygrometer"],
    rawOptions: ["A) Barograph", "B) Ozonesonde", "C) Seismometer", "D) Hygrometer"],
    correctOption: "B",
    correctIndex: 1,
    explanation: "Anna Mani standardized and developed the Indian ozonesonde, enabling accurate vertical measurements of atmospheric ozone.",
    marksCorrect: 4,
    marksIncorrect: 0,
  },
  {
    id: 9,
    section: "Part A",
    category: "Tri-Shakti Biographies",
    question: "Dr. Asima Chatterjee became the first woman to receive a Doctorate of Science (D.Sc.) from an Indian university in 1944. Her primary research field was:",
    options: ["Astrophysics", "Organic Chemistry & Medicinal Plants", "Nuclear Engineering", "Marine Biology"],
    rawOptions: ["A) Astrophysics", "B) Organic Chemistry & Medicinal Plants", "C) Nuclear Engineering", "D) Marine Biology"],
    correctOption: "B",
    correctIndex: 1,
    explanation: "Asima Chatterjee pioneered research on vinca alkaloids and developed anti-epileptic (Ayush-56) and anti-malarial drugs from Indian herbs.",
    marksCorrect: 4,
    marksIncorrect: 0,
  },
  {
    id: 10,
    section: "Part A",
    category: "Tri-Shakti Biographies",
    question: "Ayush-56, an anti-epileptic drug developed by Dr. Asima Chatterjee, was isolated from which medicinal plant?",
    options: ["Marsilea minuta (Sunsuniya)", "Azadirachta indica (Neem)", "Ocimum tenuiflorum (Tulsi)", "Curcuma longa (Turmeric)"],
    rawOptions: ["A) Marsilea minuta (Sunsuniya)", "B) Azadirachta indica (Neem)", "C) Ocimum tenuiflorum (Tulsi)", "D) Curcuma longa (Turmeric)"],
    correctOption: "A",
    correctIndex: 0,
    explanation: "Ayush-56 was formulated from Marsilea minuta after years of phytochemical research by Asima Chatterjee's team.",
    marksCorrect: 4,
    marksIncorrect: 0,
  },
  {
    id: 11,
    section: "Part A",
    category: "Tri-Shakti Biographies",
    question: "Prof. Rohini Godbole made internationally acclaimed contributions to which branch of physics?",
    options: ["Acoustics", "Theoretical Particle Physics", "Solid State Cryogenics", "Fluid Mechanics"],
    rawOptions: ["A) Acoustics", "B) Theoretical Particle Physics", "C) Solid State Cryogenics", "D) Fluid Mechanics"],
    correctOption: "B",
    correctIndex: 1,
    explanation: "Rohini Godbole was a leading theoretical particle physicist known for her work on the Standard Model, Higgs boson, and collider phenomenology.",
    marksCorrect: 4,
    marksIncorrect: 0,
  },
  {
    id: 12,
    section: "Part A",
    category: "Tri-Shakti Biographies",
    question: "Which landmark book co-edited by Rohini Godbole highlights the life stories of nearly 100 Indian women scientists?",
    options: ["Wings of Fire", "Lilavati's Daughters", "The Discovery of India", "Vigyan Katha"],
    rawOptions: ["A) Wings of Fire", "B) Lilavati's Daughters", "C) The Discovery of India", "D) Vigyan Katha"],
    correctOption: "B",
    correctIndex: 1,
    explanation: "Published by the Indian Academy of Sciences, 'Lilavati's Daughters' was co-edited by Rohini Godbole and Ram Ramaswamy.",
    marksCorrect: 4,
    marksIncorrect: 0,
  },
  {
    id: 13,
    section: "Part B",
    category: "NCERT Science & Maths",
    question: "Which vitamin is synthesized in the human skin when exposed to morning sunlight?",
    options: ["Vitamin A", "Vitamin B12", "Vitamin C", "Vitamin D"],
    rawOptions: ["A) Vitamin A", "B) Vitamin B12", "C) Vitamin C", "D) Vitamin D"],
    correctOption: "D",
    correctIndex: 3,
    explanation: "Ultraviolet B rays from sunlight trigger Vitamin D synthesis in the skin, essential for calcium absorption.",
    marksCorrect: 4,
    marksIncorrect: -1,
  },
  {
    id: 14,
    section: "Part B",
    category: "NCERT Science & Maths",
    question: "A car travels 120 km in 2 hours and then 180 km in 3 hours. What is its average speed for the entire journey?",
    options: ["50 km/h", "60 km/h", "65 km/h", "75 km/h"],
    rawOptions: ["A) 50 km/h", "B) 60 km/h", "C) 65 km/h", "D) 75 km/h"],
    correctOption: "B",
    correctIndex: 1,
    explanation: "Total distance = 120 + 180 = 300 km; Total time = 2 + 3 = 5 hours; Average speed = 300 / 5 = 60 km/h.",
    marksCorrect: 4,
    marksIncorrect: -1,
  },
  {
    id: 15,
    section: "Part B",
    category: "NCERT Science & Maths",
    question: "Which method is best suited to separate a mixture of iron filings and sulphur powder?",
    options: ["Filtration", "Magnetic separation", "Evaporation", "Decantation"],
    rawOptions: ["A) Filtration", "B) Magnetic separation", "C) Evaporation", "D) Decantation"],
    correctOption: "B",
    correctIndex: 1,
    explanation: "Iron is magnetic while sulphur is non-magnetic, allowing clean separation using a magnet.",
    marksCorrect: 4,
    marksIncorrect: -1,
  },
  {
    id: 16,
    section: "Part B",
    category: "NCERT Science & Maths",
    question: "In plant cells, which organelle is responsible for photosynthesis?",
    options: ["Mitochondria", "Ribosome", "Chloroplast", "Vacuole"],
    rawOptions: ["A) Mitochondria", "B) Ribosome", "C) Chloroplast", "D) Vacuole"],
    correctOption: "C",
    correctIndex: 2,
    explanation: "Chloroplasts contain chlorophyll, which traps solar energy to convert carbon dioxide and water into glucose.",
    marksCorrect: 4,
    marksIncorrect: -1,
  },
  {
    id: 17,
    section: "Part B",
    category: "NCERT Science & Maths",
    question: "What is the value of (-15) × (-4) + (-20)?",
    options: ["-80", "40", "80", "-40"],
    rawOptions: ["A) -80", "B) 40", "C) 80", "D) -40"],
    correctOption: "B",
    correctIndex: 1,
    explanation: "(-15) × (-4) = +60; then 60 + (-20) = 40.",
    marksCorrect: 4,
    marksIncorrect: -1,
  },
  {
    id: 18,
    section: "Part B",
    category: "NCERT Science & Maths",
    question: "Which gas turns lime water milky when bubbled through it?",
    options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
    rawOptions: ["A) Oxygen", "B) Nitrogen", "C) Carbon dioxide", "D) Hydrogen"],
    correctOption: "C",
    correctIndex: 2,
    explanation: "Carbon dioxide reacts with calcium hydroxide (lime water) to form an insoluble white precipitate of calcium carbonate.",
    marksCorrect: 4,
    marksIncorrect: -1,
  },
  {
    id: 19,
    section: "Part B",
    category: "NCERT Science & Maths",
    question: "Which type of mirror is always used as a rear-view mirror in vehicles because it gives a wider field of view?",
    options: ["Plane mirror", "Concave mirror", "Convex mirror", "Cylindrical mirror"],
    rawOptions: ["A) Plane mirror", "B) Concave mirror", "C) Convex mirror", "D) Cylindrical mirror"],
    correctOption: "C",
    correctIndex: 2,
    explanation: "A convex mirror always forms an erect, diminished image and covers a wider area behind the vehicle.",
    marksCorrect: 4,
    marksIncorrect: -1,
  },
  {
    id: 20,
    section: "Part B",
    category: "NCERT Science & Maths",
    question: "If the perimeter of a square is 48 cm, what is its area?",
    options: ["12 sq. cm", "96 sq. cm", "144 sq. cm", "192 sq. cm"],
    rawOptions: ["A) 12 sq. cm", "B) 96 sq. cm", "C) 144 sq. cm", "D) 192 sq. cm"],
    correctOption: "C",
    correctIndex: 2,
    explanation: "Side = 48 / 4 = 12 cm; Area = 12 × 12 = 144 sq. cm.",
    marksCorrect: 4,
    marksIncorrect: -1,
  },
  {
    id: 21,
    section: "Part B",
    category: "NCERT Science & Maths",
    question: "Sound cannot travel through which of the following media?",
    options: ["Steel rod", "Pure water", "Air", "Vacuum"],
    rawOptions: ["A) Steel rod", "B) Pure water", "C) Air", "D) Vacuum"],
    correctOption: "D",
    correctIndex: 3,
    explanation: "Sound is a mechanical wave that requires a material medium (solid, liquid, or gas) to propagate.",
    marksCorrect: 4,
    marksIncorrect: -1,
  },
  {
    id: 22,
    section: "Part B",
    category: "NCERT Science & Maths",
    question: "Which microorganism is used in the production of alcohol and bread?",
    options: ["Lactobacillus", "Yeast", "Amoeba", "Rhizobium"],
    rawOptions: ["A) Lactobacillus", "B) Yeast", "C) Amoeba", "D) Rhizobium"],
    correctOption: "B",
    correctIndex: 1,
    explanation: "Yeast respires anaerobically to produce ethanol and carbon dioxide, which makes dough rise.",
    marksCorrect: 4,
    marksIncorrect: -1,
  },
  {
    id: 23,
    section: "Part B",
    category: "NCERT Science & Maths",
    question: "Which non-metal is liquid at room temperature?",
    options: ["Mercury", "Bromine", "Iodine", "Chlorine"],
    rawOptions: ["A) Mercury", "B) Bromine", "C) Iodine", "D) Chlorine"],
    correctOption: "B",
    correctIndex: 1,
    explanation: "Bromine is the only non-metal that exists as a liquid at standard room temperature (Mercury is a metal).",
    marksCorrect: 4,
    marksIncorrect: -1,
  },
  {
    id: 24,
    section: "Part B",
    category: "NCERT Science & Maths",
    question: "Solve for x: 3x - 7 = 2x + 5",
    options: ["x = 2", "x = 12", "x = -2", "x = 10"],
    rawOptions: ["A) x = 2", "B) x = 12", "C) x = -2", "D) x = 10"],
    correctOption: "B",
    correctIndex: 1,
    explanation: "3x - 2x = 5 + 7, which gives x = 12.",
    marksCorrect: 4,
    marksIncorrect: -1,
  },
  {
    id: 25,
    section: "Part B",
    category: "NCERT Science & Maths",
    question: "Which blood vessels carry oxygen-rich blood away from the heart to the rest of the body?",
    options: ["Veins", "Arteries", "Capillaries", "Venules"],
    rawOptions: ["A) Veins", "B) Arteries", "C) Capillaries", "D) Venules"],
    correctOption: "B",
    correctIndex: 1,
    explanation: "Arteries have thick elastic walls to carry oxygenated blood under high pressure away from the heart.",
    marksCorrect: 4,
    marksIncorrect: -1,
  },
  {
    id: 26,
    section: "Part B",
    category: "NCERT Science & Maths",
    question: "The SI unit of pressure is:",
    options: ["Newton", "Joule", "Pascal", "Watt"],
    rawOptions: ["A) Newton", "B) Joule", "C) Pascal", "D) Watt"],
    correctOption: "C",
    correctIndex: 2,
    explanation: "Pressure is force per unit area (N/m²), named Pascal (Pa) after Blaise Pascal.",
    marksCorrect: 4,
    marksIncorrect: -1,
  },
  {
    id: 27,
    section: "Part B",
    category: "NCERT Science & Maths",
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    rawOptions: ["A) 0", "B) 1", "C) 2", "D) 3"],
    correctOption: "C",
    correctIndex: 2,
    explanation: "2 is the smallest prime number and the only even prime number.",
    marksCorrect: 4,
    marksIncorrect: -1,
  },
  {
    id: 28,
    section: "Part B",
    category: "Logic & Reasoning",
    question: "Find the missing term in the series: 2, 6, 12, 20, 30, ?",
    options: ["36", "40", "42", "44"],
    rawOptions: ["A) 36", "B) 40", "C) 42", "D) 44"],
    correctOption: "C",
    correctIndex: 2,
    explanation: "The pattern follows n(n+1): 1×2=2, 2×3=6, 3×4=12, 4×5=20, 5×6=30, so 6×7 = 42.",
    marksCorrect: 4,
    marksIncorrect: -1,
  },
  {
    id: 29,
    section: "Part B",
    category: "Logic & Reasoning",
    question: "If 'ATOM' is coded as 'BUPN', how is 'CELL' coded in the same language?",
    options: ["DFMM", "BDKK", "CFMM", "DENN"],
    rawOptions: ["A) DFMM", "B) BDKK", "C) CFMM", "D) DENN"],
    correctOption: "A",
    correctIndex: 0,
    explanation: "Each letter is shifted forward by +1 in the alphabet: C→D, E→F, L→M, L→M.",
    marksCorrect: 4,
    marksIncorrect: -1,
  },
  {
    id: 30,
    section: "Part B",
    category: "Logic & Reasoning",
    question: "Rohan walks 5 km North, turns right and walks 3 km, then turns right again and walks 5 km. Which direction is he facing now?",
    options: ["North", "South", "East", "West"],
    rawOptions: ["A) North", "B) South", "C) East", "D) West"],
    correctOption: "B",
    correctIndex: 1,
    explanation: "Facing North → turns right (East) → turns right again (South).",
    marksCorrect: 4,
    marksIncorrect: -1,
  },
];

export const VVM_2026_SR_MOCK_QUESTIONS: VvmMockQuestion[] = [
  {
    id: 1,
    section: "Part A",
    category: "Indian Contributions to Science",
    question: "In the Kerala School of Astronomy and Mathematics, who discovered the infinite series expansion for π (Madhava–Leibniz series) in the 14th century?",
    options: ["Nīlakaṇṭha Somayājī", "Mādhava of Saṅgamagrāma", "Parameśvara", "Jyeṣṭhadeva"],
    rawOptions: ["A) Nīlakaṇṭha Somayājī", "B) Mādhava of Saṅgamagrāma", "C) Parameśvara", "D) Jyeṣṭhadeva"],
    correctOption: "B",
    correctIndex: 1,
    explanation: "Mādhava of Saṅgamagrāma pioneered infinite series approximations for trigonometric functions and π centuries before European calculus.",
    marksCorrect: 4,
    marksIncorrect: 0,
  },
  {
    id: 2,
    section: "Part A",
    category: "Indian Contributions to Science",
    question: "Which ancient Indian alchemical treatise by Nāgārjuna systematically classifies minerals, mercury compounds, and laboratory apparatus (Yantras)?",
    options: ["Rasaratnākara", "Līlāvatī", "Bṛhat Saṃhitā", "Sūrya Siddhānta"],
    rawOptions: ["A) Rasaratnākara", "B) Līlāvatī", "C) Bṛhat Saṃhitā", "D) Sūrya Siddhānta"],
    correctOption: "A",
    correctIndex: 0,
    explanation: "Rasaratnākara details extraction of metals, distillation techniques, and medicinal preparations using purified mercury and minerals.",
    marksCorrect: 4,
    marksIncorrect: 0,
  },
  {
    id: 3,
    section: "Part A",
    category: "Indian Contributions to Science",
    question: "Wootz steel, renowned globally for making Damascus blades, was produced in ancient South India using which specialized technique?",
    options: ["Open-hearth blast smelting", "Crucible carburization of wrought iron", "Electrolysis of iron ore", "Bessemer converter process"],
    rawOptions: ["A) Open-hearth blast smelting", "B) Crucible carburization of wrought iron", "C) Electrolysis of iron ore", "D) Bessemer converter process"],
    correctOption: "B",
    correctIndex: 1,
    explanation: "Wootz steel was created by heating wrought iron with carbon-rich organic matter inside sealed clay crucibles.",
    marksCorrect: 4,
    marksIncorrect: 0,
  },
  {
    id: 4,
    section: "Part A",
    category: "Indian Contributions to Science",
    question: "Who authored the 'Tantrasaṅgraha' (1500 CE) and proposed a quasi-heliocentric planetary model where Mercury, Venus, Mars, Jupiter, and Saturn orbit the Sun?",
    options: ["Brahmagupta", "Nīlakaṇṭha Somayājī", "Bhāskara I", "Śrīdharācārya"],
    rawOptions: ["A) Brahmagupta", "B) Nīlakaṇṭha Somayājī", "C) Bhāskara I", "D) Śrīdharācārya"],
    correctOption: "B",
    correctIndex: 1,
    explanation: "Nīlakaṇṭha Somayājī revised planetary latitudes in Tantrasaṅgraha, presenting a model similar to the later Tychonic system.",
    marksCorrect: 4,
    marksIncorrect: 0,
  },
  {
    id: 5,
    section: "Part A",
    category: "Indian Contributions to Science",
    question: "The Chakravala method, an optimal cyclic algorithm for solving indeterminate quadratic equations (Pell's equation: Nx² + 1 = y²), was perfected by:",
    options: ["Bhāskara II", "Pingala", "Halāyudha", "Mahāvīra"],
    rawOptions: ["A) Bhāskara II", "B) Pingala", "C) Halāyudha", "D) Mahāvīra"],
    correctOption: "A",
    correctIndex: 0,
    explanation: "Bhāskara II refined Jayadeva's Chakravala method in his Bījagaṇita to find minimal integer solutions.",
    marksCorrect: 4,
    marksIncorrect: 0,
  },
  {
    id: 6,
    section: "Part A",
    category: "Indian Contributions to Science",
    question: "Which traditional Indian water-harvesting architecture in Gujarat and Rajasthan utilizes subterranean stepped wells to minimize evaporation?",
    options: ["Suranga", "Vav / Baoli", "Zabo", "Ahar-Pyne"],
    rawOptions: ["A) Suranga", "B) Vav / Baoli", "C) Zabo", "D) Ahar-Pyne"],
    correctOption: "B",
    correctIndex: 1,
    explanation: "Stepwells (Vavs in Gujarat, Baolis in Rajasthan) access deep groundwater tables while keeping water cool and shaded.",
    marksCorrect: 4,
    marksIncorrect: 0,
  },
  {
    id: 7,
    section: "Part A",
    category: "Tri-Shakti Biographies",
    question: "Dr. Anna Mani established a network of radiation measuring stations across India and authored two landmark reference books on:",
    options: ["Monsoon Oceanography", "Solar Radiation and Wind Energy over India", "Himalayan Glaciology", "Ionospheric Radio Propagation"],
    rawOptions: ["A) Monsoon Oceanography", "B) Solar Radiation and Wind Energy over India", "C) Himalayan Glaciology", "D) Ionospheric Radio Propagation"],
    correctOption: "B",
    correctIndex: 1,
    explanation: "Anna Mani published 'The Handbook of Solar Radiation Data for India' and 'Wind Energy Data for India', laying the foundation for renewable energy.",
    marksCorrect: 4,
    marksIncorrect: 0,
  },
  {
    id: 8,
    section: "Part A",
    category: "Tri-Shakti Biographies",
    question: "Which national honour was awarded to Dr. Anna Mani in 1987 by the Indian National Science Academy (INSA) for her meteorological contributions?",
    options: ["Shanti Swarup Bhatnagar Prize", "K. R. Ramanathan Medal", "Meghnad Saha Medal", "Aryabhata Medal"],
    rawOptions: ["A) Shanti Swarup Bhatnagar Prize", "B) K. R. Ramanathan Medal", "C) Meghnad Saha Medal", "D) Aryabhata Medal"],
    correctOption: "B",
    correctIndex: 1,
    explanation: "INSA awarded Anna Mani the K. R. Ramanathan Medal in 1987 for her lifetime contributions to atmospheric sciences.",
    marksCorrect: 4,
    marksIncorrect: 0,
  },
  {
    id: 9,
    section: "Part A",
    category: "Tri-Shakti Biographies",
    question: "Dr. Asima Chatterjee conducted seminal structural and stereochemical studies on which class of plant-derived alkaloids?",
    options: ["Opium alkaloids", "Indole and Vinca alkaloids", "Tropane alkaloids", "Purine alkaloids"],
    rawOptions: ["A) Opium alkaloids", "B) Indole and Vinca alkaloids", "C) Tropane alkaloids", "D) Purine alkaloids"],
    correctOption: "B",
    correctIndex: 1,
    explanation: "Asima Chatterjee elucidated the structures and stereochemistry of indole alkaloids from Rauvolfia and Vinca species.",
    marksCorrect: 4,
    marksIncorrect: 0,
  },
  {
    id: 10,
    section: "Part A",
    category: "Tri-Shakti Biographies",
    question: "In 1975, Dr. Asima Chatterjee achieved a historic milestone in Indian science by becoming the first woman elected as:",
    options: ["Director of CSIR", "General President of the Indian Science Congress", "Chairperson of ISRO", "President of INSA"],
    rawOptions: ["A) Director of CSIR", "B) General President of the Indian Science Congress", "C) Chairperson of ISRO", "D) President of INSA"],
    correctOption: "B",
    correctIndex: 1,
    explanation: "She presided over the 62nd session of the Indian Science Congress in 1975, the first woman to hold the office.",
    marksCorrect: 4,
    marksIncorrect: 0,
  },
  {
    id: 11,
    section: "Part A",
    category: "Tri-Shakti Biographies",
    question: "Prof. Rohini Godbole's theoretical research on 'hadronic structure of high-energy photons' was crucial for designing experiments at:",
    options: ["LIGO Gravitational Observatory", "Large Hadron Collider (LHC) & future e+e- colliders", "James Webb Space Telescope", "ITER Fusion Reactor"],
    rawOptions: ["A) LIGO Gravitational Observatory", "B) Large Hadron Collider (LHC) & future e+e- colliders", "C) James Webb Space Telescope", "D) ITER Fusion Reactor"],
    correctOption: "B",
    correctIndex: 1,
    explanation: "Her calculations on photon-photon interactions and parton distributions directly informed collider physics at CERN's LHC and linear colliders.",
    marksCorrect: 4,
    marksIncorrect: 0,
  },
  {
    id: 12,
    section: "Part A",
    category: "Tri-Shakti Biographies",
    question: "In recognition of her contributions to science and France–India scientific collaboration, Prof. Rohini Godbole was awarded which French civilian distinction in 2021?",
    options: ["Legion of Honour", "Ordre National du Mérite", "Ordre des Palmes Académiques", "Prix Marie Curie"],
    rawOptions: ["A) Legion of Honour", "B) Ordre National du Mérite", "C) Ordre des Palmes Académiques", "D) Prix Marie Curie"],
    correctOption: "B",
    correctIndex: 1,
    explanation: "France conferred the Ordre National du Mérite on Rohini Godbole in 2021, alongside India's Padma Shri in 2019.",
    marksCorrect: 4,
    marksIncorrect: 0,
  },
  {
    id: 13,
    section: "Part B",
    category: "NCERT Science & Maths",
    question: "A body of mass 4 kg is moving with a velocity of 5 m/s. What is its kinetic energy?",
    options: ["20 J", "40 J", "50 J", "100 J"],
    rawOptions: ["A) 20 J", "B) 40 J", "C) 50 J", "D) 100 J"],
    correctOption: "C",
    correctIndex: 2,
    explanation: "KE = (1/2)mv² = 0.5 × 4 × 5² = 2 × 25 = 50 J.",
    marksCorrect: 4,
    marksIncorrect: -1,
  },
  {
    id: 14,
    section: "Part B",
    category: "NCERT Science & Maths",
    question: "Which functional group is present in ethanoic acid (CH₃COOH)?",
    options: ["Aldehyde (-CHO)", "Ketone (>C=O)", "Carboxylic acid (-COOH)", "Alcohol (-OH)"],
    rawOptions: ["A) Aldehyde (-CHO)", "B) Ketone (>C=O)", "C) Carboxylic acid (-COOH)", "D) Alcohol (-OH)"],
    correctOption: "C",
    correctIndex: 2,
    explanation: "Ethanoic acid contains the -COOH (carboxyl) functional group.",
    marksCorrect: 4,
    marksIncorrect: -1,
  },
  {
    id: 15,
    section: "Part B",
    category: "NCERT Science & Maths",
    question: "During aerobic respiration in human muscle cells, pyruvate is broken down into carbon dioxide and water inside which organelle?",
    options: ["Cytoplasm", "Mitochondria", "Golgi apparatus", "Endoplasmic reticulum"],
    rawOptions: ["A) Cytoplasm", "B) Mitochondria", "C) Golgi apparatus", "D) Endoplasmic reticulum"],
    correctOption: "B",
    correctIndex: 1,
    explanation: "The Krebs cycle and oxidative phosphorylation occur inside mitochondria, yielding ATP, CO₂, and H₂O.",
    marksCorrect: 4,
    marksIncorrect: -1,
  },
  {
    id: 16,
    section: "Part B",
    category: "NCERT Science & Maths",
    question: "If the roots of the quadratic equation x² - 5x + k = 0 are equal, what is the value of k?",
    options: ["25", "25/4", "5/2", "-25/4"],
    rawOptions: ["A) 25", "B) 25/4", "C) 5/2", "D) -25/4"],
    correctOption: "B",
    correctIndex: 1,
    explanation: "For equal roots, discriminant b² - 4ac = 0 → (-5)² - 4(1)(k) = 0 → 25 = 4k → k = 25/4.",
    marksCorrect: 4,
    marksIncorrect: -1,
  },
  {
    id: 17,
    section: "Part B",
    category: "NCERT Science & Maths",
    question: "Two resistors of 6 Ω and 3 Ω are connected in parallel across a 6 V battery. What is the total current drawn from the battery?",
    options: ["0.67 A", "2 A", "3 A", "9 A"],
    rawOptions: ["A) 0.67 A", "B) 2 A", "C) 3 A", "D) 9 A"],
    correctOption: "C",
    correctIndex: 2,
    explanation: "1/R_eq = 1/6 + 1/3 = 3/6 = 1/2 → R_eq = 2 Ω. Current I = V / R_eq = 6 / 2 = 3 A.",
    marksCorrect: 4,
    marksIncorrect: -1,
  },
  {
    id: 18,
    section: "Part B",
    category: "NCERT Science & Maths",
    question: "Which chemical compound is commonly known as Plaster of Paris?",
    options: ["CaSO₄ · 2H₂O", "CaSO₄ · ½H₂O", "CaCO₃", "CaOCl₂"],
    rawOptions: ["A) CaSO₄ · 2H₂O", "B) CaSO₄ · ½H₂O", "C) CaCO₃", "D) CaOCl₂"],
    correctOption: "B",
    correctIndex: 1,
    explanation: "Calcium sulphate hemihydrate (CaSO₄ · ½H₂O) is obtained by heating gypsum at 373 K.",
    marksCorrect: 4,
    marksIncorrect: -1,
  },
  {
    id: 19,
    section: "Part B",
    category: "NCERT Science & Maths",
    question: "Which plant hormone promotes cell division and is found in high concentrations in fruits and seeds?",
    options: ["Abscisic acid", "Cytokinin", "Ethylene", "Gibberellin"],
    rawOptions: ["A) Abscisic acid", "B) Cytokinin", "C) Ethylene", "D) Gibberellin"],
    correctOption: "B",
    correctIndex: 1,
    explanation: "Cytokinins stimulate rapid cell division (cytokinesis) in actively growing plant tissues.",
    marksCorrect: 4,
    marksIncorrect: -1,
  },
  {
    id: 20,
    section: "Part B",
    category: "NCERT Science & Maths",
    question: "What is the value of sin² 30° + cos² 30° + tan 45°?",
    options: ["1", "1.5", "2", "2.5"],
    rawOptions: ["A) 1", "B) 1.5", "C) 2", "D) 2.5"],
    correctOption: "C",
    correctIndex: 2,
    explanation: "Using the identity sin²θ + cos²θ = 1 and tan 45° = 1, the sum is 1 + 1 = 2.",
    marksCorrect: 4,
    marksIncorrect: -1,
  },
  {
    id: 21,
    section: "Part B",
    category: "NCERT Science & Maths",
    question: "An object is placed at the centre of curvature (C) of a concave mirror. The image formed is:",
    options: ["Virtual, erect, and magnified", "Real, inverted, and of the same size", "Real, inverted, and diminished", "Virtual, inverted, and at infinity"],
    rawOptions: ["A) Virtual, erect, and magnified", "B) Real, inverted, and of the same size", "C) Real, inverted, and diminished", "D) Virtual, inverted, and at infinity"],
    correctOption: "B",
    correctIndex: 1,
    explanation: "When an object is placed at C of a concave mirror, a real and inverted image of equal size forms at C.",
    marksCorrect: 4,
    marksIncorrect: -1,
  },
  {
    id: 22,
    section: "Part B",
    category: "NCERT Science & Maths",
    question: "According to Avogadro's law, 1 mole of any ideal gas at STP (273.15 K, 1 bar) occupies approximately:",
    options: ["11.2 L", "22.7 L", "24.0 L", "44.8 L"],
    rawOptions: ["A) 11.2 L", "B) 22.7 L", "C) 24.0 L", "D) 44.8 L"],
    correctOption: "B",
    correctIndex: 1,
    explanation: "At IUPAC STP (1 bar, 273.15 K), the molar volume of an ideal gas is 22.71 L (22.4 L at 1 atm).",
    marksCorrect: 4,
    marksIncorrect: -1,
  },
  {
    id: 23,
    section: "Part B",
    category: "NCERT Science & Maths",
    question: "In Mendel's dihybrid cross (RrYy × RrYy), what is the phenotypic ratio of offspring in the F2 generation?",
    options: ["3 : 1", "1 : 2 : 1", "9 : 3 : 3 : 1", "9 : 7"],
    rawOptions: ["A) 3 : 1", "B) 1 : 2 : 1", "C) 9 : 3 : 3 : 1", "D) 9 : 7"],
    correctOption: "C",
    correctIndex: 2,
    explanation: "Independent assortment of two traits yields a 9:3:3:1 F2 phenotypic ratio.",
    marksCorrect: 4,
    marksIncorrect: -1,
  },
  {
    id: 24,
    section: "Part B",
    category: "NCERT Science & Maths",
    question: "Find the 10th term of the Arithmetic Progression (AP): 7, 13, 19, 25, ...",
    options: ["55", "61", "67", "73"],
    rawOptions: ["A) 55", "B) 61", "C) 67", "D) 73"],
    correctOption: "B",
    correctIndex: 1,
    explanation: "a = 7, d = 6; a₁₀ = a + (10 - 1)d = 7 + 9(6) = 7 + 54 = 61.",
    marksCorrect: 4,
    marksIncorrect: -1,
  },
  {
    id: 25,
    section: "Part B",
    category: "NCERT Science & Maths",
    question: "Which phenomenon explains why the sky appears blue during a clear day?",
    options: ["Total internal reflection", "Dispersion of light", "Rayleigh scattering of shorter wavelengths", "Refraction through atmosphere"],
    rawOptions: ["A) Total internal reflection", "B) Dispersion of light", "C) Rayleigh scattering of shorter wavelengths", "D) Refraction through atmosphere"],
    correctOption: "C",
    correctIndex: 2,
    explanation: "Fine air molecules scatter shorter blue wavelengths much more strongly than longer red wavelengths.",
    marksCorrect: 4,
    marksIncorrect: -1,
  },
  {
    id: 26,
    section: "Part B",
    category: "NCERT Science & Maths",
    question: "Which metal is extracted from its sulphide ore (ZnS) by roasting followed by reduction with carbon?",
    options: ["Sodium", "Zinc", "Aluminium", "Gold"],
    rawOptions: ["A) Sodium", "B) Zinc", "C) Aluminium", "D) Gold"],
    correctOption: "B",
    correctIndex: 1,
    explanation: "Zinc blende (ZnS) is roasted to ZnO and then reduced with coke (carbon) to obtain metallic zinc.",
    marksCorrect: 4,
    marksIncorrect: -1,
  },
  {
    id: 27,
    section: "Part B",
    category: "NCERT Science & Maths",
    question: "A fair die is thrown once. What is the probability of getting a prime number?",
    options: ["1/6", "1/3", "1/2", "2/3"],
    rawOptions: ["A) 1/6", "B) 1/3", "C) 1/2", "D) 2/3"],
    correctOption: "C",
    correctIndex: 2,
    explanation: "Prime numbers on a die are {2, 3, 5} (3 outcomes out of 6), so P = 3/6 = 1/2.",
    marksCorrect: 4,
    marksIncorrect: -1,
  },
  {
    id: 28,
    section: "Part B",
    category: "Logic & Reasoning",
    question: "In a certain code, 'VIGYAN' is written as 'WJIZBO'. How is 'SHAKTI' written in that code?",
    options: ["TIBLUJ", "TIBLVJ", "THBLUJ", "UJCMVK"],
    rawOptions: ["A) TIBLUJ", "B) TIBLVJ", "C) THBLUJ", "D) UJCMVK"],
    correctOption: "A",
    correctIndex: 0,
    explanation: "Every letter advances by +1: S→T, H→I, A→B, K→L, T→U, I→J.",
    marksCorrect: 4,
    marksIncorrect: -1,
  },
  {
    id: 29,
    section: "Part B",
    category: "Logic & Reasoning",
    question: "Pointing to a photograph, Meera said, 'He is the only son of my grandfather's only daughter.' How is the person in the photograph related to Meera?",
    options: ["Uncle", "Brother", "Cousin", "Father"],
    rawOptions: ["A) Uncle", "B) Brother", "C) Cousin", "D) Father"],
    correctOption: "B",
    correctIndex: 1,
    explanation: "Grandfather's only daughter is Meera's mother; her only son is Meera's brother.",
    marksCorrect: 4,
    marksIncorrect: -1,
  },
  {
    id: 30,
    section: "Part B",
    category: "Logic & Reasoning",
    question: "Find the next term in the alphanumeric series: B2D, E4H, H8L, K16P, ?",
    options: ["N32T", "M32S", "N24T", "O32U"],
    rawOptions: ["A) N32T", "B) M32S", "C) N24T", "D) O32U"],
    correctOption: "A",
    correctIndex: 0,
    explanation: "First letters (+3): B, E, H, K, N; Numbers (×2): 2, 4, 8, 16, 32; Last letters (+4): D, H, L, P, T.",
    marksCorrect: 4,
    marksIncorrect: -1,
  },
];

export const VVM_2026_JR_MOCK_01: VvmMockExam = {
  examId: "VVM-2026-JR-MOCK-01",
  title: "VVM 2026–27 Science & Heritage 30-Q Mock (Classes 6–8)",
  cohort: 'junior',
  cohortLabel: 'Junior Group (Classes 6–8)',
  durationMinutes: 30,
  rules: VVM_2026_MOCK_RULES,
  questions: VVM_2026_JR_MOCK_QUESTIONS,
};

export const VVM_2026_SR_MOCK_01: VvmMockExam = {
  examId: "VVM-2026-SR-MOCK-01",
  title: "VVM 2026–27 Science & Heritage 30-Q Mock (Classes 9–11)",
  cohort: 'senior',
  cohortLabel: 'Senior Group (Classes 9–11)',
  durationMinutes: 30,
  rules: VVM_2026_MOCK_RULES,
  questions: VVM_2026_SR_MOCK_QUESTIONS,
};

export const VVM_MOCK_EXAMS: Record<VvmCohort, VvmMockExam> = {
  junior: VVM_2026_JR_MOCK_01,
  senior: VVM_2026_SR_MOCK_01,
};

export interface VvmScoreSummary {
  totalAttempted: number;
  totalUnanswered: number;
  partAAttempted: number;
  partACorrect: number;
  partAIncorrect: number;
  partAScore: number; // max 48 (+4 each, 0 neg)
  isPartAQualified: boolean; // partAScore >= 24
  partBAttempted: number;
  partBCorrect: number;
  partBIncorrect: number;
  partBScore: number; // max 72 (+4 correct, -1 incorrect)
  totalScore: number; // Part A + Part B (or only Part A if not qualified)
  maxPossibleScore: number; // 120
}

export function calculateVvmScoreForQuestions(
  questions: VvmMockQuestion[],
  answers: Record<number, number>
): VvmScoreSummary {
  let partAAttempted = 0;
  let partACorrect = 0;
  let partAIncorrect = 0;
  let partAScore = 0;

  let partBAttempted = 0;
  let partBCorrect = 0;
  let partBIncorrect = 0;
  let partBScore = 0;

  for (const q of questions) {
    const userChoice = answers[q.id];
    if (userChoice === undefined) continue;

    if (q.section === 'Part A') {
      partAAttempted++;
      if (userChoice === q.correctIndex) {
        partACorrect++;
        partAScore += 4;
      } else {
        partAIncorrect++;
      }
    } else {
      partBAttempted++;
      if (userChoice === q.correctIndex) {
        partBCorrect++;
        partBScore += 4;
      } else {
        partBIncorrect++;
        partBScore -= 1;
      }
    }
  }

  const isPartAQualified = partAScore >= VVM_2026_MOCK_RULES.partA.cutoffMarks;
  const totalAttempted = partAAttempted + partBAttempted;
  const totalUnanswered = questions.length - totalAttempted;
  const totalScore = isPartAQualified ? (partAScore + partBScore) : partAScore;

  return {
    totalAttempted,
    totalUnanswered,
    partAAttempted,
    partACorrect,
    partAIncorrect,
    partAScore,
    isPartAQualified,
    partBAttempted,
    partBCorrect,
    partBIncorrect,
    partBScore,
    totalScore,
    maxPossibleScore: 120,
  };
}

export function calculateVvmCohortScore(
  cohort: VvmCohort,
  answers: Record<number, number>
): VvmScoreSummary {
  const questions = cohort === 'senior' ? VVM_2026_SR_MOCK_QUESTIONS : VVM_2026_JR_MOCK_QUESTIONS;
  return calculateVvmScoreForQuestions(questions, answers);
}

export function calculateVvmJuniorScore(answers: Record<number, number>): VvmScoreSummary {
  return calculateVvmScoreForQuestions(VVM_2026_JR_MOCK_QUESTIONS, answers);
}

export function calculateVvmSeniorScore(answers: Record<number, number>): VvmScoreSummary {
  return calculateVvmScoreForQuestions(VVM_2026_SR_MOCK_QUESTIONS, answers);
}
