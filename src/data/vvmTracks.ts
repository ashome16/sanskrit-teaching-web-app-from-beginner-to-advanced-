/**
 * VVM 2026–27 Hub syllabus dataset.
 *
 * Source: exam pattern, class-by-class Module 3 & 4 copy, and the
 * ready-to-use JSON tracks object provided for the class switcher.
 * JSON topic lists are kept as `module3Topics` / `module4Skills`.
 * The fuller Module 3 & 4 prose lists are kept alongside as
 * `module3TopicsFull` / `module4SkillsFull`.
 */

export type VvmTrackId =
  | 'class-6'
  | 'class-7'
  | 'class-8'
  | 'class-9'
  | 'class-10'
  | 'class-11-pcm'
  | 'class-11-pcb';

export type VvmClassTab = 6 | 7 | 8 | 9 | 10 | 11;
export type VvmStream = 'pcm' | 'pcb';

export interface VvmSectionA {
  heritage: number;
  triShakti: number;
}

export interface VvmSectionB {
  core: number;
  logic: number;
  subjects: string[];
}

export interface VvmTrack {
  id: VvmTrackId;
  label: string;
  classNumber: VvmClassTab;
  stream?: VvmStream;
  badgeSplit: string;
  sectionA: VvmSectionA;
  sectionB: VvmSectionB;
  module1Focus: string;
  module3Topics: Record<string, string[]>;
  module3TopicsFull: Record<string, string[]>;
  module4Skills: string[];
  module4SkillsFull: string[];
  module4QuestionCount: 12 | 15;
  coreQuestionsPerSubject: 12 | 15;
}

export const VVM_CLASS_TABS: VvmClassTab[] = [6, 7, 8, 9, 10, 11];

export const VVM_TRI_SHAKTI = [
  'Anna Mani',
  'Asima Chatterjee',
  'Rohini Godbole',
] as const;

/** Official Level-I exam pattern (2026–27), used across all classes. */
export const VVM_EXAM_PATTERN = {
  sectionAPercent: 40,
  sectionALabel: 'Section A (40% — Common Themes, Grade-Scaled Difficulty)',
  module1: {
    percent: 20,
    questions: 20,
    title: 'Indian Contributions to Science',
    studyMaterial:
      'VVM Study Material — Chapters 1–7 & 9–12, scaled by class band',
  },
  module2: {
    percent: 20,
    questions: 20,
    title: 'Life Stories of Tri-Shakti',
    note: 'Common across Classes 6–11; Level-I tests all three scientists.',
  },
  sectionBPercent: 60,
  sectionBLabel: 'Section B (60% — Class & Stream Specific)',
  classes6to10: {
    corePercent: 48,
    logicPercent: 12,
    questionsPerCoreSubject: 12,
    logicQuestions: 12,
    subjects: ['Physics', 'Chemistry', 'Biology', 'Mathematics'] as const,
  },
  class11: {
    corePercent: 45,
    logicPercent: 15,
    questionsPerCoreSubject: 15,
    logicQuestions: 15,
  },
} as const;

const BADGE_6_TO_10 =
  '40% Heritage & Tri-Shakti (Section A) | 48% NCERT Science & Maths + 12% Logic (Section B)';

const BADGE_CLASS_11 =
  '40% Heritage & Tri-Shakti (Section A) | 45% Stream Core + 15% Logic (Section B)';

const SECTION_A_20_20: VvmSectionA = { heritage: 20, triShakti: 20 };

const SECTION_B_6_TO_10: VvmSectionB = {
  core: 48,
  logic: 12,
  subjects: ['Physics', 'Chemistry', 'Biology', 'Mathematics'],
};

export const VVM_TRACKS: Record<VvmTrackId, VvmTrack> = {
  'class-6': {
    id: 'class-6',
    label: 'Class 6',
    classNumber: 6,
    badgeSplit: BADGE_6_TO_10,
    sectionA: SECTION_A_20_20,
    sectionB: SECTION_B_6_TO_10,
    module1Focus:
      'Ancient Indian Astronomy, Harappan Town Planning, Zero & Number Systems, Traditional Water Harvesting',
    module3Topics: {
      Physics: [
        'Motion & Measurement',
        'Light & Shadows',
        'Electricity & Circuits',
        'Magnets',
        'Rain, Thunder & Lightning',
      ],
      Chemistry: [
        'Materials Around Us',
        'Separation of Substances',
        'Temperature',
        'States of Water',
      ],
      Biology: [
        'Diversity in Living World',
        'Components of Food',
        'Living vs Non-Living',
      ],
      Mathematics: [
        'Number System',
        'Factors & Multiples',
        'Fractions & Decimals',
        'Ratio & Proportion',
        'Basic Geometry & Mensuration',
      ],
    },
    module3TopicsFull: {
      Physics: [
        'Motion & Measurement',
        'Light, Shadows & Reflections',
        'Electricity & Circuits',
        'Fun with Magnets',
        'Rain, Thunder & Lightning',
      ],
      Chemistry: [
        'Materials Around Us',
        'Separation of Substances',
        'Temperature & Its Measurement',
        'Journey Through States of Water',
      ],
      Biology: [
        'Diversity in the Living World',
        'Mindful Eating & Components of Food',
        'Living Creatures & Their Characteristics',
      ],
      Mathematics: [
        'Number System',
        'Factors & Multiples',
        'Fractions & Decimals',
        'Ratio & Proportion',
        'Basic Geometry',
        'Mensuration',
        'Introduction to Algebra',
        'Symmetry & Patterns',
      ],
    },
    module4Skills: [
      'Number & Alphabet Series',
      'Mirror & Water Images',
      'Simple Cryptarithmetic',
      'Direction Sense',
      'Symmetry Puzzles',
    ],
    module4SkillsFull: [
      'Number & alphabet series',
      'Odd one out',
      'Mirror & water images',
      'Simple cryptarithmetic',
      'Basic coding-decoding',
      'Direction sense',
      'Symmetry puzzles',
    ],
    module4QuestionCount: 12,
    coreQuestionsPerSubject: 12,
  },

  'class-7': {
    id: 'class-7',
    label: 'Class 7',
    classNumber: 7,
    badgeSplit: BADGE_6_TO_10,
    sectionA: SECTION_A_20_20,
    sectionB: SECTION_B_6_TO_10,
    module1Focus:
      'Sulba Geometry, Medicinal Plants & Ayurveda, Metallurgy in Ancient India, Indian Calendars',
    module3Topics: {
      Physics: [
        'Motion & Time',
        'Light & Reflection',
        'Electric Current & Electromagnets',
        'Winds & Storms',
      ],
      Chemistry: [
        'Heat Transfer',
        'Acids, Bases & Salts',
        'Physical & Chemical Changes',
        'Wastewater Story',
      ],
      Biology: [
        'Nutrition in Plants & Animals',
        'Respiration',
        'Transportation',
        'Plant Reproduction',
        'Forests',
      ],
      Mathematics: [
        'Integers & Rational Numbers',
        'Simple Equations',
        'Triangles & Congruence',
        'Comparing Quantities',
        'Perimeter & Area',
      ],
    },
    module3TopicsFull: {
      Physics: [
        'Motion & Time (Distance-Time Graphs, Pendulum)',
        'Light (Reflection, Real/Virtual Images, Prism)',
        'Electric Current & Its Effects (Fuses, Electromagnets)',
        'Winds, Storms & Cyclones',
      ],
      Chemistry: [
        'Heat & Temperature Transfer',
        'Acids, Bases & Salts',
        'Physical & Chemical Changes',
        'Wastewater Story',
      ],
      Biology: [
        'Nutrition in Plants & Animals',
        'Respiration in Organisms',
        'Transportation in Animals & Plants',
        'Reproduction in Plants',
        'Forests: Our Lifeline',
      ],
      Mathematics: [
        'Integers',
        'Fractions & Decimals',
        'Rational Numbers',
        'Simple Linear Equations',
        'Lines & Angles',
        'Triangles & Congruence',
        'Comparing Quantities (Percentage, Profit & Loss, Simple Interest)',
        'Perimeter & Area',
        'Data Handling',
      ],
    },
    module4Skills: [
      'Alphanumeric Series',
      'Blood Relations',
      'Venn Diagrams',
      'Clocks & Calendars',
      'Figure Counting',
    ],
    module4SkillsFull: [
      'Alphanumeric series',
      'Blood relations',
      'Venn diagrams',
      'Clocks & calendars',
      'Figure counting',
      'Analogy',
      'Basic grid puzzles',
    ],
    module4QuestionCount: 12,
    coreQuestionsPerSubject: 12,
  },

  'class-8': {
    id: 'class-8',
    label: 'Class 8',
    classNumber: 8,
    badgeSplit: BADGE_6_TO_10,
    sectionA: SECTION_A_20_20,
    sectionB: SECTION_B_6_TO_10,
    module1Focus:
      "Delhi Iron Pillar & Zinc Distillation, Aryabhata's Planetary Models, Susruta's Surgical Instruments",
    module3Topics: {
      Physics: [
        'Force & Pressure',
        'Friction',
        'Sound',
        'Chemical Effects of Current',
        'Light & Human Eye',
      ],
      Chemistry: [
        'Coal & Petroleum',
        'Combustion & Flame',
        'Metals & Non-Metals',
        'Synthetic Fibres',
      ],
      Biology: [
        'Crop Production',
        'Microorganisms',
        'Cell Structure',
        'Animal Reproduction',
        'Adolescence',
      ],
      Mathematics: [
        'Linear Equations',
        'Quadrilaterals',
        'Squares & Cubes',
        'Algebraic Identities',
        'Mensuration (2D/3D)',
      ],
    },
    module3TopicsFull: {
      Physics: [
        'Force & Pressure',
        'Friction',
        'Sound (Amplitude, Frequency, Pitch)',
        'Chemical Effects of Electric Current',
        'Some Natural Phenomena (Lightning & Earthquakes)',
        'Light (Laws of Reflection, Kaleidoscope, Human Eye)',
      ],
      Chemistry: [
        'Coal & Petroleum',
        'Combustion & Flame',
        'Synthetic Fibres & Plastics',
        'Metals & Non-Metals',
      ],
      Biology: [
        'Crop Production & Management',
        'Microorganisms: Friend & Foe',
        'Conservation of Plants & Animals',
        'Reproduction in Animals',
        'Reaching the Age of Adolescence',
        'Cell Structure & Functions',
      ],
      Mathematics: [
        'Rational Numbers',
        'Linear Equations in One Variable',
        'Understanding Quadrilaterals',
        'Squares & Square Roots',
        'Cubes & Cube Roots',
        'Comparing Quantities (Compound Interest)',
        'Algebraic Expressions & Identities',
        'Factorization',
        'Mensuration (2D & 3D)',
        'Exponents & Powers',
        'Direct & Inverse Proportions',
      ],
    },
    module4Skills: [
      'Cryptarithmetic',
      'Coding-Decoding',
      'Cubes & Dice',
      'Paper Folding',
      'Syllogisms',
    ],
    module4SkillsFull: [
      'Cryptarithmetic (alphametics)',
      'Coding-decoding',
      'Cubes & dice',
      'Paper folding/cutting',
      'Mathematical operations',
      'Syllogisms',
      'Analytical grid puzzles',
    ],
    module4QuestionCount: 12,
    coreQuestionsPerSubject: 12,
  },

  'class-9': {
    id: 'class-9',
    label: 'Class 9',
    classNumber: 9,
    badgeSplit: BADGE_6_TO_10,
    sectionA: SECTION_A_20_20,
    sectionB: SECTION_B_6_TO_10,
    module1Focus:
      "Brahmagupta's Zero & Cyclic Quadrilaterals, Rasashastra Alchemy, Caraka's Holistic Medicine",
    module3Topics: {
      Physics: [
        'Motion',
        'Force & Laws of Motion',
        'Gravitation & Floatation',
        'Work & Energy',
        'Sound',
      ],
      Chemistry: [
        'Matter in Surroundings',
        'Pure & Impure Matter',
        'Atoms & Molecules',
        'Structure of Atom',
      ],
      Biology: [
        'Cell & Cell Division',
        'Plant & Animal Tissues',
        'Improvement in Food Resources',
      ],
      Mathematics: [
        'Real Numbers',
        'Polynomials',
        'Coordinate Geometry',
        'Triangles, Quadrilaterals & Circles',
        "Heron's Formula & Statistics",
      ],
    },
    module3TopicsFull: {
      Physics: [
        'Motion (Equations & Graphs)',
        'Force & Laws of Motion',
        'Gravitation',
        "Floatation & Archimedes' Principle",
        'Work & Energy',
        'Sound (Echo, Sonar, Ultrasound)',
      ],
      Chemistry: [
        'Matter in Our Surroundings',
        'Is Matter Around Us Pure',
        'Atoms & Molecules (Mole Concept)',
        'Structure of the Atom',
      ],
      Biology: [
        'The Fundamental Unit of Life (Cell & Cell Division)',
        'Plant & Animal Tissues',
        'Improvement in Food Resources (Crop & Animal Husbandry)',
      ],
      Mathematics: [
        'Number Systems (Real Numbers)',
        'Polynomials (Factor & Remainder Theorems)',
        'Coordinate Geometry',
        'Linear Equations in Two Variables',
        "Euclid's Geometry",
        'Lines, Angles, Triangles, Quadrilaterals & Circles',
        "Heron's Formula & Brahmagupta's Rule",
        'Surface Areas & Volumes',
        'Statistics & Basic Probability',
      ],
    },
    module4Skills: [
      'Seating Arrangements',
      'Logical Inequalities',
      'Input-Output Series',
      'Figure Matrices',
      'Data Sufficiency',
    ],
    module4SkillsFull: [
      'Linear & circular seating arrangements',
      'Syllogisms',
      'Logical inequalities',
      'Input-output sequences',
      'Figure matrices',
      'Spatial visualization',
      'Data sufficiency',
    ],
    module4QuestionCount: 12,
    coreQuestionsPerSubject: 12,
  },

  'class-10': {
    id: 'class-10',
    label: 'Class 10',
    classNumber: 10,
    badgeSplit: BADGE_6_TO_10,
    sectionA: SECTION_A_20_20,
    sectionB: SECTION_B_6_TO_10,
    module1Focus:
      'Kerala School of Mathematics, Bhaskara II & Calculus Precursors, Modern Indian Scientific Institutions',
    module3Topics: {
      Physics: [
        'Light: Reflection & Refraction',
        'Human Eye',
        'Electricity',
        'Magnetic Effects of Current',
      ],
      Chemistry: [
        'Chemical Reactions',
        'Acids, Bases & Salts',
        'Metals & Non-Metals',
        'Carbon & Its Compounds',
      ],
      Biology: [
        'Life Processes',
        'Control & Coordination',
        'Reproduction',
        'Heredity',
        'Our Environment',
      ],
      Mathematics: [
        'Number Theory',
        'Quadratic Equations & AP',
        'Trigonometry',
        'Coordinate Geometry',
        'Surface Areas, Volumes & Probability',
      ],
    },
    module3TopicsFull: {
      Physics: [
        'Light — Reflection & Refraction (Mirrors & Lenses)',
        'The Human Eye & The Colourful World',
        "Electricity (Ohm's Law, Circuits, Power)",
        'Magnetic Effects of Electric Current',
      ],
      Chemistry: [
        'Chemical Reactions & Equations',
        'Acids, Bases & Salts',
        'Metals & Non-Metals',
        'Carbon & Its Compounds (Functional Groups, Homologous Series)',
      ],
      Biology: [
        'Life Processes (Nutrition, Respiration, Transportation, Excretion)',
        'Control & Coordination',
        'How Do Organisms Reproduce',
        'Heredity & Evolution',
        'Our Environment',
      ],
      Mathematics: [
        'Real Numbers (Number Theory)',
        'Polynomials',
        'Pair of Linear Equations',
        'Quadratic Equations',
        'Arithmetic Progressions',
        'Coordinate Geometry',
        'Triangles & Circles',
        'Introduction to Trigonometry & Applications',
        'Areas Related to Circles',
        'Surface Areas & Volumes',
        'Statistics & Probability',
      ],
    },
    module4Skills: [
      'Critical Path Puzzles',
      'Binary Logic',
      'Games & Tournaments',
      'Logical Connectives',
      'Data Sufficiency',
    ],
    module4SkillsFull: [
      'Critical path puzzles',
      'Binary logic',
      'Games & tournaments',
      'Logical connectives',
      'Complex cryptarithmetic',
      'Data sufficiency',
      'Sequential reasoning',
    ],
    module4QuestionCount: 12,
    coreQuestionsPerSubject: 12,
  },

  'class-11-pcm': {
    id: 'class-11-pcm',
    label: 'Class 11 (PCM)',
    classNumber: 11,
    stream: 'pcm',
    badgeSplit: BADGE_CLASS_11,
    sectionA: SECTION_A_20_20,
    sectionB: {
      core: 45,
      logic: 15,
      subjects: ['Physics', 'Chemistry', 'Mathematics'],
    },
    module1Focus:
      'Siddhantic Astronomy, Indian Atomic & Space Pioneers, Mathematical Logic in Ancient Texts',
    module3Topics: {
      Physics: [
        'Units & Kinematics',
        'Laws of Motion & Work-Energy',
        'Rotational Motion & Gravitation',
        'Thermodynamics & Fluids',
        'Oscillations & Waves',
      ],
      Chemistry: [
        'Mole Concept & Atomic Structure',
        'Periodicity & Bonding',
        'Thermodynamics & Equilibrium',
        'Redox & General Organic Chemistry',
        'Hydrocarbons',
      ],
      Mathematics: [
        'Sets & Trigonometry',
        'Complex Numbers & Quadratics',
        'Permutations, Combinations & Binomial',
        'Sequences, Straight Lines & Conics',
        'Limits, Derivatives & Probability',
      ],
    },
    module3TopicsFull: {
      Physics: [
        'Units & Measurements',
        'Kinematics (1D & 2D)',
        'Laws of Motion',
        'Work, Energy & Power',
        'Rotational Motion',
        'Gravitation',
        'Mechanical Properties of Solids & Fluids',
        'Thermal Properties',
        'Thermodynamics',
        'Kinetic Theory',
        'Oscillations & Waves',
      ],
      Chemistry: [
        'Some Basic Concepts of Chemistry',
        'Structure of Atom',
        'Classification of Elements & Periodicity',
        'Chemical Bonding',
        'Thermodynamics',
        'Equilibrium',
        'Redox Reactions',
        'Organic Chemistry — Basic Principles & Techniques',
        'Hydrocarbons',
      ],
      Mathematics: [
        'Sets, Relations & Functions',
        'Trigonometric Functions',
        'Complex Numbers & Quadratic Equations',
        'Permutations & Combinations',
        'Binomial Theorem',
        'Sequences & Series (AP/GP)',
        'Straight Lines & Conic Sections',
        'Limits & Derivatives',
        'Statistics & Probability',
      ],
    },
    module4Skills: [
      'Combinatorial Puzzles',
      'Conditional Logic',
      'Data Interpretation',
      'Spatial Matrices',
      'Analytical Deduction',
    ],
    module4SkillsFull: [
      'Advanced analytical reasoning',
      'Combinatorics-based puzzles',
      'Logical deductions',
      'Data interpretation',
      'Spatial matrices',
      'Conditional logic',
    ],
    module4QuestionCount: 15,
    coreQuestionsPerSubject: 15,
  },

  'class-11-pcb': {
    id: 'class-11-pcb',
    label: 'Class 11 (PCB)',
    classNumber: 11,
    stream: 'pcb',
    badgeSplit: BADGE_CLASS_11,
    sectionA: SECTION_A_20_20,
    sectionB: {
      core: 45,
      logic: 15,
      subjects: ['Physics', 'Chemistry', 'Biology'],
    },
    module1Focus:
      'Ayurvedic Pharmacology & Botany, Indian Contributions to Meteorology & Particle Physics, Ecology Texts',
    module3Topics: {
      Physics: [
        'Units & Kinematics',
        'Laws of Motion & Work-Energy',
        'Rotational Motion & Gravitation',
        'Thermodynamics & Fluids',
        'Oscillations & Waves',
      ],
      Chemistry: [
        'Mole Concept & Atomic Structure',
        'Periodicity & Bonding',
        'Thermodynamics & Equilibrium',
        'Redox & General Organic Chemistry',
        'Hydrocarbons',
      ],
      Biology: [
        'Plant & Animal Kingdoms',
        'Morphology & Anatomy',
        'Cell, Biomolecules & Cell Division',
        'Plant Physiology',
        'Human Physiology',
      ],
    },
    module3TopicsFull: {
      Physics: [
        'Units & Measurements',
        'Kinematics (1D & 2D)',
        'Laws of Motion',
        'Work, Energy & Power',
        'Rotational Motion',
        'Gravitation',
        'Mechanical Properties of Solids & Fluids',
        'Thermal Properties',
        'Thermodynamics',
        'Kinetic Theory',
        'Oscillations & Waves',
      ],
      Chemistry: [
        'Some Basic Concepts of Chemistry',
        'Structure of Atom',
        'Classification of Elements & Periodicity',
        'Chemical Bonding',
        'Thermodynamics',
        'Equilibrium',
        'Redox Reactions',
        'Organic Chemistry — Basic Principles & Techniques',
        'Hydrocarbons',
      ],
      Biology: [
        'Diversity in Living World (Plant & Animal Kingdoms)',
        'Structural Organisation in Plants & Animals',
        'Cell Structure & Biomolecules',
        'Cell Cycle & Division',
        'Plant Physiology (Photosynthesis, Respiration, Growth)',
        'Human Physiology (Breathing, Circulation, Excretion, Locomotion, Neural & Chemical Coordination)',
      ],
    },
    module4Skills: [
      'Analytical Deduction',
      'Data Interpretation',
      'Conditional Logic',
      'Spatial Matrices',
      'Syllogisms & Sets',
    ],
    module4SkillsFull: [
      'Advanced analytical reasoning',
      'Combinatorics-based puzzles',
      'Logical deductions',
      'Data interpretation',
      'Spatial matrices',
      'Conditional logic',
      'Syllogisms & Sets',
    ],
    module4QuestionCount: 15,
    coreQuestionsPerSubject: 15,
  },
};

export function getVvmTrackId(classTab: VvmClassTab, stream: VvmStream = 'pcm'): VvmTrackId {
  if (classTab === 11) {
    return stream === 'pcb' ? 'class-11-pcb' : 'class-11-pcm';
  }
  return `class-${classTab}` as VvmTrackId;
}

export function getVvmTrack(classTab: VvmClassTab, stream: VvmStream = 'pcm'): VvmTrack {
  return VVM_TRACKS[getVvmTrackId(classTab, stream)];
}
