/**
 * Official Vidyarthi Vigyan Manthan (VVM) 2026–27
 * Junior Group (Classes 6–8) — 30-Question Diagnostic Mock Exam
 * Exam ID: VVM-2026-JR-MOCK-01
 */

export type VvmSectionType = 'Part A' | 'Part B';

export type VvmCategoryType =
  | 'Indian Contributions to Science'
  | 'Tri-Shakti Biographies'
  | 'NCERT Science & Maths'
  | 'Logic & Reasoning';

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
  durationMinutes: number;
  rules: VvmMockRules;
  questions: VvmMockQuestion[];
}

export const VVM_2026_JR_MOCK_RULES: VvmMockRules = {
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

export const VVM_2026_JR_MOCK_01: VvmMockExam = {
  examId: "VVM-2026-JR-MOCK-01",
  title: "VVM 2026–27 Science & Heritage 30-Q Mock (Classes 6–8)",
  durationMinutes: 30,
  rules: VVM_2026_JR_MOCK_RULES,
  questions: VVM_2026_JR_MOCK_QUESTIONS,
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

export function calculateVvmJuniorScore(answers: Record<number, number>): VvmScoreSummary {
  let partAAttempted = 0;
  let partACorrect = 0;
  let partAIncorrect = 0;
  let partAScore = 0;

  let partBAttempted = 0;
  let partBCorrect = 0;
  let partBIncorrect = 0;
  let partBScore = 0;

  for (const q of VVM_2026_JR_MOCK_QUESTIONS) {
    const userChoice = answers[q.id];
    if (userChoice === undefined) continue;

    if (q.section === 'Part A') {
      partAAttempted++;
      if (userChoice === q.correctIndex) {
        partACorrect++;
        partAScore += 4;
      } else {
        partAIncorrect++;
        // 0 negative marks in Part A
      }
    } else {
      partBAttempted++;
      if (userChoice === q.correctIndex) {
        partBCorrect++;
        partBScore += 4;
      } else {
        partBIncorrect++;
        partBScore -= 1; // -1 negative mark in Part B
      }
    }
  }

  const isPartAQualified = partAScore >= VVM_2026_JR_MOCK_RULES.partA.cutoffMarks;
  const totalAttempted = partAAttempted + partBAttempted;
  const totalUnanswered = VVM_2026_JR_MOCK_QUESTIONS.length - totalAttempted;
  // If Part A is qualified, total score includes Part B; otherwise Part B is not added to official rank score
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
