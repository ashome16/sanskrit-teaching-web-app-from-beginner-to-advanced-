/**
 * VVM 2026–27 Level-II (State-Level Camp) prep-hub data.
 *
 * The examStage, qualificationRule, campWindow, totals, components, and
 * classBands objects below are the ready-to-use JSON provided for this hub,
 * stored verbatim. Fuller Module A–E copy is kept alongside.
 *
 * Official 2026–27 calendar and qualification facts used in the UI are taken
 * from the VVM 2026–27 brochure. Component marks and durations have not been
 * published in a 2026–27 SLC evaluation scheme on vvm.org.in; they match the
 * last published official scheme (2025–26). See VVM_L2_VERIFICATION.
 */

export type VvmLevel2BandId = '6-7' | '8-9' | '10-11';
export type VvmLevel2Stream = 'pcm' | 'pcb';
export type VvmLevel2ComponentId = 'est' | 'aosat' | 'icast' | 'iks' | 'oob';

export interface VvmLevel2Component {
  id: VvmLevel2ComponentId;
  code: string;
  title: string;
  weightagePercent: number;
  marks: number;
  durationMinutes: number;
  format: string;
}

export interface VvmLevel2ClassBand {
  id: VvmLevel2BandId;
  label: string;
  icastTheme: string;
  icastThemeOfficial: string;
  icastKeywords: string[];
  icastPrepCopy: string;
  estFocus: string[];
  estChecklist: string[];
}

export interface VvmLevel2AosatQuestion {
  id: string;
  prompt: string;
  options?: string[];
  answerGuide?: string;
}

export interface VvmLevel2CrosswordClue {
  id: string;
  clue: string;
  answer?: string;
}

export interface VvmLevel2Worksheet {
  id: string;
  title: string;
  steps: string[];
  printHref?: string;
}

export interface VvmLevel2McqItem {
  id: string;
  prompt: string;
  options: string[];
  correctIndexes: number[];
}

export interface VvmLevel2LabExercise {
  id: string;
  title: string;
  prompt: string;
}

export interface VvmLevel2IksQuizItem {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
}

export interface VvmLevel2LogicPuzzle {
  id: string;
  kind: 'sudoku' | 'kakuro' | 'crossword';
  title: string;
  durationMinutes: number;
}

/** Verbatim JSON provided for the Level-II class-band switcher and blueprint. */
export const VVM_LEVEL2_JSON = {
  examStage: 'Level-II: State-Level Camp (SLC)',
  qualificationRule: 'Top 25 rankers per class per state from Level-I',
  campWindow: 'December 27, 2026 – January 17, 2027',
  totalMarks: 100,
  totalDurationMinutes: 220,
  components: [
    {
      id: 'est',
      code: 'EST',
      title: 'Experimental Skill Test',
      weightagePercent: 40,
      marks: 40,
      durationMinutes: 120,
      format: 'Hands-on lab tasks in Physics, Chemistry, Biology & Math (30 mins each)',
    },
    {
      id: 'aosat',
      code: 'AOSAT',
      title: 'Application Oriented Science Aptitude Test',
      weightagePercent: 20,
      marks: 20,
      durationMinutes: 20,
      format: 'Scenario, graph & real-world application MCQs across PCMB',
    },
    {
      id: 'icast',
      code: 'ICAST',
      title: 'Indian Contributions to Science & Technology',
      weightagePercent: 20,
      marks: 20,
      durationMinutes: 20,
      format: '10 MCQs + 10-word scientific crossword puzzle',
    },
    {
      id: 'iks',
      code: 'IKS-AV',
      title: 'Indian Knowledge Systems Video Test',
      weightagePercent: 10,
      marks: 10,
      durationMinutes: 40,
      format: '15–20 min documentary screening + 20 min observation test',
    },
    {
      id: 'oob',
      code: 'OOB',
      title: 'Out-of-Box Activity',
      weightagePercent: 10,
      marks: 10,
      durationMinutes: 20,
      format: 'Timed Sudoku, Kakuro, or Analytical Crossword',
    },
  ] as VvmLevel2Component[],
  classBands: {
    '6-7': {
      label: 'Classes 6 & 7',
      icastTheme: 'Hydrology & Traditional Indian Water Systems',
      icastKeywords: ['Baolis', 'Khadin', 'Johad', 'Kallanai Dam', 'Lothal Dockyard', 'Varahamihira'],
      estFocus: [
        'Irregular solid volume & density',
        'Food nutrient tests (starch, protein, fat)',
        'Natural acid-base indicators',
        'Simple electric circuits & plane mirror reflection',
      ],
    },
    '8-9': {
      label: 'Classes 8 & 9',
      icastTheme: 'Ethnobotany & Indian Medicinal Flora',
      icastKeywords: ['Vrikshayurveda', 'Charaka Samhita', 'Asima Chatterjee', 'Janaki Ammal', 'Marsilea minuta'],
      estFocus: [
        'Archimedes principle & relative density',
        'Displacement reactions & pH paper testing',
        'Microscope slide preparation (plant & animal cells)',
        'Simple pendulum & geometric constructions',
      ],
    },
    '10-11': {
      label: 'Classes 10 & 11 (PCM / PCB)',
      icastTheme: 'Astrophysics in the Indian Context',
      icastKeywords: ['Aryabhata', 'Jantar Mantar', 'Meghnad Saha', 'Chandrasekhar Limit', 'GMRT', 'Aditya-L1'],
      estFocus: [
        'Vernier calipers & screw gauge measurements',
        'Concave mirror & convex lens focal length',
        'Salt/functional group analysis & titration',
        'Stomatal index, mitosis slides & clinometer trigonometry',
      ],
    },
  },
} as const;

export const VVM_L2_BAND_IDS: VvmLevel2BandId[] = ['6-7', '8-9', '10-11'];

/** Official 2026–27 calendar and qualification, from the VVM brochure. */
export const VVM_L2_OFFICIAL_CALENDAR = {
  level1Window: '16–21 November 2026',
  level1ByClass: [
    { classes: 'Classes 6 and 7', dates: '16 or 19 November 2026' },
    { classes: 'Classes 8 and 9', dates: '17 or 20 November 2026' },
    { classes: 'Classes 10 and 11', dates: '18 or 21 November 2026' },
  ],
  level1LoginHours: '10:00 AM – 6:00 PM (90 minutes; one login)',
  level1Ends: '21 November 2026',
  level1Result: '30 November 2026',
  slcDates: [
    '27 December 2026',
    '3 January 2027',
    '10 January 2027',
    '17 January 2027',
  ],
  slcDatesOfficialLine: '27th December, 2026 and 03rd, 10th, 17th January, 2027 (any one day)',
  qualificationOfficial: 'The top 25 rankers from each class for every state',
  nationalCampAnnounce: '28 February 2027',
  brochureUrl: 'https://sif.vvm.org.in/pdf/Brochure2026-27.pdf',
  officialSiteUrl: 'https://vvm.org.in/',
} as const;

/** Last published official SLC evaluation scheme (2025–26). No 2026–27 PDF was posted on vvm.org.in when this page was prepared. */
export const VVM_L2_PUBLISHED_SCHEME = {
  yearLabel: '2025–26',
  url: 'https://vvm.org.in/assets/pdf/home/vvmslc-2025-26-evaluation-scheme.pdf',
  totalMarks: 100,
  durationNote: 'The total exam duration at the SLC will be around 4 hours.',
  estPerSubjectOfficial: '20+5 min for each subject, i.e. a total of 120 minutes',
  iksOfficial: 'A video of 15–20 minutes, based on Indian Knowledge Systems, will be screened. Students will be given 20 minutes to answer the questions',
  icastOfficialThemes: {
    '6-7': 'Hydrology',
    '8-9': 'Ethnobotany',
    '10-11': 'Astrophysics in the Indian context',
  } as Record<VvmLevel2BandId, string>,
} as const;

export const VVM_L2_ATTRIBUTION =
  'Component marks and durations are shown as published in the official VVM State-Level Camp evaluation scheme for 2025–26. A 2026–27 scheme had not been posted on vvm.org.in when this page was prepared.';

export const VVM_L2_BANDS: Record<VvmLevel2BandId, VvmLevel2ClassBand> = {
  '6-7': {
    id: '6-7',
    label: VVM_LEVEL2_JSON.classBands['6-7'].label,
    icastTheme: VVM_LEVEL2_JSON.classBands['6-7'].icastTheme,
    icastThemeOfficial: VVM_L2_PUBLISHED_SCHEME.icastOfficialThemes['6-7'],
    icastKeywords: [...VVM_LEVEL2_JSON.classBands['6-7'].icastKeywords],
    icastPrepCopy:
      "Classes 6–7 (Hydrology & Water Heritage): Stepwells (Baolis), Khadin & Johad rainwater systems, Lothal dockyard engineering, Grand Anicut (Kallanai Dam), Varahamihira's Brihat Samhita groundwater indicators.",
    estFocus: [...VVM_LEVEL2_JSON.classBands['6-7'].estFocus],
    estChecklist: [
      'Measuring volume of irregular solids',
      'Testing food samples for starch/protein/fat',
      'Identifying acids/bases with natural indicators (turmeric/china rose)',
      'Building series/parallel circuits',
      'Verifying reflection laws with plane mirrors',
      'Geometric area/perimeter verification',
    ],
  },
  '8-9': {
    id: '8-9',
    label: VVM_LEVEL2_JSON.classBands['8-9'].label,
    icastTheme: VVM_LEVEL2_JSON.classBands['8-9'].icastTheme,
    icastThemeOfficial: VVM_L2_PUBLISHED_SCHEME.icastOfficialThemes['8-9'],
    icastKeywords: [...VVM_LEVEL2_JSON.classBands['8-9'].icastKeywords],
    icastPrepCopy:
      "Classes 8–9 (Ethnobotany & Traditional Medicine): Vrikshayurveda (Surapala), Charaka Samhita & Sushruta Samhita medicinal flora, Asima Chatterjee's Marsilea minuta & Alstonia research, Janaki Ammal's sugarcane & cytogenetics work, GI-tagged Indian medicinal crops.",
    estFocus: [...VVM_LEVEL2_JSON.classBands['8-9'].estFocus],
    estChecklist: [
      "Measuring density & Archimedes' upthrust",
      'Flame tests & displacement reactions',
      'Preparing temporary stained slides (onion peel/cheek cells) & microscope identification',
      "Verifying Ohm's law basics / simple pendulum time period",
      "Constructing cyclic quadrilaterals & verifying Euler's formula",
    ],
  },
  '10-11': {
    id: '10-11',
    label: VVM_LEVEL2_JSON.classBands['10-11'].label,
    icastTheme: VVM_LEVEL2_JSON.classBands['10-11'].icastTheme,
    icastThemeOfficial: VVM_L2_PUBLISHED_SCHEME.icastOfficialThemes['10-11'],
    icastKeywords: [...VVM_LEVEL2_JSON.classBands['10-11'].icastKeywords],
    icastPrepCopy:
      "Classes 10–11 (Astrophysics in the Indian Context): Jantar Mantar observatories, Aryabhata & Bhaskara II planetary algorithms, Meghnad Saha's ionization equation, Subrahmanyan Chandrasekhar's limit, Vainu Bappu, Govind Swarup (GMRT), and ISRO missions (Aditya-L1, Chandrayaan-3, AstroSat).",
    estFocus: [...VVM_LEVEL2_JSON.classBands['10-11'].estFocus],
    estChecklist: [
      'Finding focal length of concave mirror/convex lens',
      'Tracing refraction through a glass slab/prism',
      'Salt/functional-group identification & titration basics',
      'Stomatal index / mitosis slide identification',
      'Vernier caliper & screw gauge zero-error measurements',
      'Trigonometric height-and-distance clinometer tasks',
    ],
  },
};

export const VVM_L2_MODULE_COPY = {
  est: {
    title: 'Module A: Experimental Skill Test (EST — 40% Weightage)',
    whatStudentsDo:
      'Rotate through 4 lab stations (Physics, Chemistry, Biology, Math — 30 mins each), perform an activity with real apparatus, record observations, plot graphs, and answer viva/worksheet questions.',
  },
  icast: {
    title: 'Module B: ICAST — Indian Contributions & Crossword Drills (20% Weightage)',
    format: '10 objective questions + a 10-word scientific crossword puzzle.',
  },
  aosat: {
    title: 'Module C: AOSAT — Application-Oriented Science Aptitude (20% Weightage)',
    howItDiffers:
      'Zero direct memory recall. Questions present an experimental setup, graph, or real-life scenario (e.g., why a boat rises slightly when moving from a river into the sea, or interpreting enzyme activity curves) and test multi-step deduction.',
    siteFeatureIdea:
      'Offer 20-minute timed "AOSAT Mini-Sprints" (20 questions) that emphasize graph reading, unit conversions, and experimental error analysis.',
  },
  iks: {
    title: 'Module D: IKS Audio-Visual Comprehension (10% Weightage)',
    howToTrain:
      'Embed 15-minute curated science documentaries (e.g., on Indian metallurgy, traditional textiles/dyes, or Indian space history) followed by a locked 10-question quiz that only unlocks after the video finishes—replicating the exact 15-min watch + 20-min test SLC environment.',
  },
  oob: {
    title: 'Module E: Out-of-Box Logic Arena (10% Weightage)',
    howToTrain:
      'Daily 20-minute interactive 6×6 / 9×9 Sudoku, Kakuro, and Science Cryptic Crosswords with a countdown timer.',
  },
} as const;

/**
 * Slots for content packs still to come (AOSAT questions, ICAST clues,
 * EST worksheets, multi-correct drills, virtual labs, IKS video + quiz,
 * and Logic Arena puzzles). Leave these empty until those packs arrive.
 */
export const VVM_L2_CONTENT_SLOTS: {
  aosatQuestions: Record<VvmLevel2BandId, VvmLevel2AosatQuestion[]>;
  icastCrosswordClues: Record<VvmLevel2BandId, VvmLevel2CrosswordClue[]>;
  estWorksheets: Record<VvmLevel2BandId, VvmLevel2Worksheet[]>;
  multiCorrectDrills: Record<VvmLevel2BandId, VvmLevel2McqItem[]>;
  virtualLabExercises: Record<VvmLevel2BandId, VvmLevel2LabExercise[]>;
  iksDocumentary: {
    videoSrc?: string;
    title?: string;
    durationMinutes?: number;
    quiz: VvmLevel2IksQuizItem[];
  } | null;
  logicArenaPuzzles: VvmLevel2LogicPuzzle[];
} = {
  aosatQuestions: { '6-7': [], '8-9': [], '10-11': [] },
  icastCrosswordClues: { '6-7': [], '8-9': [], '10-11': [] },
  estWorksheets: { '6-7': [], '8-9': [], '10-11': [] },
  multiCorrectDrills: { '6-7': [], '8-9': [], '10-11': [] },
  virtualLabExercises: { '6-7': [], '8-9': [], '10-11': [] },
  iksDocumentary: null,
  logicArenaPuzzles: [],
};

export function isLevel1LastMinuteWindow(now: Date = new Date()): boolean {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Calcutta',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now);
  const year = parts.find((p) => p.type === 'year')?.value;
  const month = parts.find((p) => p.type === 'month')?.value;
  const day = parts.find((p) => p.type === 'day')?.value;
  const key = `${year}-${month}-${day}`;
  return key === '2026-11-20' || key === '2026-11-21';
}

export function getVvmLevel2Band(id: VvmLevel2BandId): VvmLevel2ClassBand {
  return VVM_L2_BANDS[id];
}
