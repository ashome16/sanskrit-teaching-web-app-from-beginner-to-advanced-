import React, { useState, useMemo, useCallback } from 'react';
import { soundEffects } from '../../utils/soundEffects';
import { playPronunciation } from '../../utils/pronunciation';
import '../../styles/citrakavya-studio.css';

// ---------------------------------------------------------------------------
// TYPES & DATA STRUCTURES
// ---------------------------------------------------------------------------

export type StudioTab = 'grid3x3' | 'padma' | 'cakra' | 'muraja' | 'epistemic';

export interface MatrixCell {
  id: string; // e.g. '00', '01'
  r: number;
  c: number;
  char: string;
  iast: string;
  cons: string;
  vowel: string;
  meaning: string;
}

export type RiddleCategory = 'all' | 'linear' | 'shift' | 'particle' | 'subphoneme';

export interface DharmadasaRiddle {
  id: number;
  title: string;
  sanskritRiddle: string;
  meaning: string;
  answerDev: string;
  answerIast: string;
  answerMeaning: string;
  targetPath: string[]; // Cell IDs in order, e.g. ['01', '02']
  subPhonemeTarget?: boolean; // True if requires extracting vowel
  extractionCellId?: string; // Cell ID from which to extract
  extractedChar?: string;
  hint: string;
  category: 'linear' | 'shift' | 'particle' | 'subphoneme';
  direction: string;
}

// 3x3 Latin Square Syllable Grid from Vidagdhamukhamandana
// [ vī, hā, rī ]
// [ hā, rī, vī ]
// [ rī, vī, hā ]
export const MATRIX_3X3: MatrixCell[][] = [
  [
    { id: '00', r: 0, c: 0, char: 'वी', iast: 'vī', cons: 'v (व्)', vowel: 'ī (ई)', meaning: 'Bird / Winged traveler; hero; speed' },
    { id: '01', r: 0, c: 1, char: 'हा', iast: 'hā', cons: 'h (ह्)', vowel: 'ā (आ)', meaning: 'Exclamation of grief / wonder; Gandharva' },
    { id: '02', r: 0, c: 2, char: 'री', iast: 'rī', cons: 'r (र्)', vowel: 'ī (ई)', meaning: 'Stream / speed; roar; motion' },
  ],
  [
    { id: '10', r: 1, c: 0, char: 'हा', iast: 'hā', cons: 'h (ह्)', vowel: 'ā (आ)', meaning: 'Grief; alas!' },
    { id: '11', r: 1, c: 1, char: 'री', iast: 'rī', cons: 'r (र्)', vowel: 'ī (ई)', meaning: 'Flow / oozing / motion' },
    { id: '12', r: 1, c: 2, char: 'वी', iast: 'vī', cons: 'v (व्)', vowel: 'ī (ई)', meaning: 'Hero root / celestial bird' },
  ],
  [
    { id: '20', r: 2, c: 0, char: 'री', iast: 'rī', cons: 'r (र्)', vowel: 'ī (ई)', meaning: 'Stream / roar / motion' },
    { id: '21', r: 2, c: 1, char: 'वी', iast: 'vī', cons: 'v (व्)', vowel: 'ī (ई)', meaning: 'Valor / champion' },
    { id: '22', r: 2, c: 2, char: 'हा', iast: 'hā', cons: 'h (ह्)', vowel: 'ā (आ)', meaning: 'Surprise / alas' },
  ],
];

// 19 Dharmadāsa Riddles
export const DHARMADASA_RIDDLES: DharmadasaRiddle[] = [
  {
    id: 1,
    title: 'Chest Ornaments (हाराः)',
    sanskritRiddle: 'कण्ठस्य भूषणं किं स्यात्? (What adorns the royal chest?)',
    meaning: 'Necklaces and pearl garlands worn by monarchs.',
    answerDev: 'हाराः',
    answerIast: 'Hārāḥ',
    answerMeaning: 'Necklaces / Pearl garlands',
    targetPath: ['01', '02'],
    hint: 'Trace linear traversal across Row 0: from [0,1] हा to [0,2] री.',
    category: 'linear',
    direction: 'Row 0 Horizontal (0,1 ➔ 0,2)',
  },
  {
    id: 2,
    title: 'Fearless in Battle (वीराः)',
    sanskritRiddle: 'सङ्ग्रामे निर्भयाः के स्युः? (Who stand fearless on the battlefield?)',
    meaning: 'Champions, warriors and heroes of valor.',
    answerDev: 'वीराः',
    answerIast: 'Vīrāḥ',
    answerMeaning: 'Valiant heroes / Champions',
    targetPath: ['00', '02'],
    hint: 'Jump across Row 0 from [0,0] वी to [0,2] री.',
    category: 'shift',
    direction: 'Row 0 Leap (0,0 ➔ 0,2)',
  },
  {
    id: 3,
    title: 'Expression of Sorrow (हा)',
    sanskritRiddle: 'शोकस्य उद्गारः कः? (What is the pure exclamation of grief?)',
    meaning: 'The raw Sanskrit interjection of anguish and grief ("Alas!").',
    answerDev: 'हा',
    answerIast: 'Hā',
    answerMeaning: 'Alas! (Exclamation of sorrow)',
    targetPath: ['01'],
    hint: 'Single cell particle at [0,1] हा.',
    category: 'particle',
    direction: 'Single Node [0,1]',
  },
  {
    id: 4,
    title: "Vishnu's Beloved (ई / लक्ष्मीः)",
    sanskritRiddle: 'विष्णोः वल्लभा का? (Who is the eternal consort of Lord Viṣṇu?)',
    meaning: 'Goddess Lakṣmī, designated in Ekākṣara-kośa lexicons by the single long vowel "ई".',
    answerDev: 'ई (लक्ष्मीः)',
    answerIast: 'Ī (Lakṣmī)',
    answerMeaning: 'Goddess Lakṣmī (Sacred vowel name)',
    targetPath: ['00'],
    subPhonemeTarget: true,
    extractionCellId: '00',
    extractedChar: 'ई',
    hint: 'Turn on "Sub-Phonemic Tool (वर्ण-विश्लेषणम्)", tap [0,0] वी, and extract the long vowel "ई"!',
    category: 'subphoneme',
    direction: 'Sub-Phonemic Extraction from [0,0] वी (v + ī)',
  },
  {
    id: 5,
    title: 'Remover of Sin / Lord (हरिः)',
    sanskritRiddle: 'पाप-हर्ता कः? (Who takes away the darkness of all sins?)',
    meaning: 'Lord Hari (Lord Viṣṇu / Kṛṣṇa) who relieves worldly burdens.',
    answerDev: 'हरिः',
    answerIast: 'Hariḥ',
    answerMeaning: 'Lord Hari / Viṣṇu',
    targetPath: ['01', '11'],
    hint: 'Trace diagonal down: from [0,1] हा to [1,1] री.',
    category: 'linear',
    direction: 'Diagonal Traverse (0,1 ➔ 1,1)',
  },
  {
    id: 6,
    title: 'Adversary / Enemy (वैरी)',
    sanskritRiddle: 'विरोध-युक्तः कः? (Who opposes with malice in battle?)',
    meaning: 'The rival, foe, or enemy (Vairī).',
    answerDev: 'वैरी',
    answerIast: 'Vairī',
    answerMeaning: 'Enemy / Adversary',
    targetPath: ['00', '11'],
    hint: 'Shift from [0,0] वी to center [1,1] री.',
    category: 'shift',
    direction: 'Diagonal Vector (0,0 ➔ 1,1)',
  },
  {
    id: 7,
    title: 'King of Beasts / Lion (हरी)',
    sanskritRiddle: 'मृगेन्द्रः कः? (Who is the supreme king of the jungle?)',
    meaning: 'The lion (Hari / Harī), royal predator of the forest.',
    answerDev: 'हरी',
    answerIast: 'Harī',
    answerMeaning: 'Lion / King of beasts',
    targetPath: ['10', '11'],
    hint: 'Trace across Row 1: from [1,0] हा to [1,1] री.',
    category: 'linear',
    direction: 'Row 1 Horizontal (1,0 ➔ 1,1)',
  },
  {
    id: 8,
    title: 'Winged Bird of the Sky (वी)',
    sanskritRiddle: 'गगने गन्ता कः? (What creature roams the sky in ancient lexicons?)',
    meaning: 'A bird (Vī = पक्षी in Amarakōśa and Vedic lexicons).',
    answerDev: 'वी',
    answerIast: 'Vī',
    answerMeaning: 'Bird / Winged creature',
    targetPath: ['00'],
    hint: 'Single syllable root at [0,0] वी.',
    category: 'particle',
    direction: 'Single Node [0,0]',
  },
  {
    id: 9,
    title: 'Pure Quenching Water (वारि)',
    sanskritRiddle: 'तृषा-शमनं जीवनं किम्? (What is the pure nectar that quenches thirst?)',
    meaning: 'Water (Vāri), life-giving fluid of nature.',
    answerDev: 'वारि',
    answerIast: 'Vāri',
    answerMeaning: 'Water / Life nectar',
    targetPath: ['21', '20'],
    hint: 'Trace right-to-left along Row 2: from [2,1] वी to [2,0] री.',
    category: 'linear',
    direction: 'Row 2 Reverse (2,1 ➔ 2,0)',
  },
  {
    id: 10,
    title: 'Pleasure Garden & Stroll (विहारः)',
    sanskritRiddle: 'आनन्द-भ्रमणं किम्? (What is the delightful stroll or pleasure park?)',
    meaning: 'Recreation, promenade, or royal sanctuary (Vihāra).',
    answerDev: 'विहारः',
    answerIast: 'Vihāraḥ',
    answerMeaning: 'Promenade / Garden stroll',
    targetPath: ['00', '01', '02'],
    hint: 'Complete 3-node traversal of entire Row 0: [0,0] वी ➔ [0,1] हा ➔ [0,2] री.',
    category: 'linear',
    direction: 'Row 0 Full Span (0,0 ➔ 0,1 ➔ 0,2)',
  },
  {
    id: 11,
    title: 'Swift Flowing Stream (री)',
    sanskritRiddle: 'स्रवन्ती गतिः का? (What represents constant fluid motion in Sanskrit roots?)',
    meaning: 'Streaming motion / oozing current (√री गति-शोषणयोः).',
    answerDev: 'री',
    answerIast: 'Rī',
    answerMeaning: 'Flowing current / Stream',
    targetPath: ['02'],
    hint: 'Single node at [0,2] री.',
    category: 'particle',
    direction: 'Single Node [0,2]',
  },
  {
    id: 12,
    title: 'Resounding Cry / Roar (रावः)',
    sanskritRiddle: 'वन-मध्ये महानादः कः? (What is the great resounding cry in the forest?)',
    meaning: 'The roaring call of the lion or jackal (Rāva).',
    answerDev: 'रावः',
    answerIast: 'Rāvaḥ',
    answerMeaning: 'Roar / Resounding cry',
    targetPath: ['20', '21'],
    hint: 'Trace across Row 2: from [2,0] री to [2,1] वी.',
    category: 'linear',
    direction: 'Row 2 Horizontal (2,0 ➔ 2,1)',
  },
  {
    id: 13,
    title: 'The Great Dissolver / Lord Śiva (हरः)',
    sanskritRiddle: 'त्रिपुर-दहनः कः? (Who consumes the ego and burns the three cities?)',
    meaning: 'Lord Śiva (Hara), the transformer and dissolver of delusion.',
    answerDev: 'हरः',
    answerIast: 'Haraḥ',
    answerMeaning: 'Lord Śiva / The Dissolver',
    targetPath: ['22', '20'],
    hint: 'Hop across Row 2: from [2,2] हा to [2,0] री.',
    category: 'shift',
    direction: 'Row 2 Leap (2,2 ➔ 2,0)',
  },
  {
    id: 14,
    title: 'Inside the Valiant Champion (वीरे)',
    sanskritRiddle: 'शूर-पुरुषे किं तिष्ठति? (What resides within the courageous hero?)',
    meaning: 'In the valiant warrior (Locative case singular: Vīre).',
    answerDev: 'वीरे',
    answerIast: 'Vīre',
    answerMeaning: 'In the hero (Locative)',
    targetPath: ['12', '11'],
    hint: 'Shift from [1,2] वी to center [1,1] री.',
    category: 'linear',
    direction: 'Row 1 Inward (1,2 ➔ 1,1)',
  },
  {
    id: 15,
    title: 'Enchanting Heart-Captor (हारी)',
    sanskritRiddle: 'चित्त-आकर्षकः कः? (Who steals or captivates the observer’s heart?)',
    meaning: 'Enchanting, captivating, or winning (Hārī).',
    answerDev: 'हारी',
    answerIast: 'Hārī',
    answerMeaning: 'Captivating / Heart-stealer',
    targetPath: ['22', '20'],
    hint: 'Connect [2,2] हा to [2,0] री.',
    category: 'shift',
    direction: 'Row 2 Leap (2,2 ➔ 2,0)',
  },
  {
    id: 16,
    title: 'Garland Received with Honor (हारम्)',
    sanskritRiddle: 'पूजायां किं समर्प्यते? (What is offered around the neck in reverence?)',
    meaning: 'A sacred garland / necklace (Accusative case: Hāram).',
    answerDev: 'हारम्',
    answerIast: 'Hāram',
    answerMeaning: 'Sacred necklace (Accusative)',
    targetPath: ['10', '11'],
    hint: 'Trace Row 1: [1,0] हा ➔ [1,1] री.',
    category: 'linear',
    direction: 'Row 1 Horizontal (1,0 ➔ 1,1)',
  },
  {
    id: 17,
    title: 'The Elite Army of Heroes (वीराः)',
    sanskritRiddle: 'राज-रक्षकाः के? (Who protect the realm with their swords?)',
    meaning: 'The battalion of fearless warriors (Vīrāḥ).',
    answerDev: 'वीराः',
    answerIast: 'Vīrāḥ',
    answerMeaning: 'Heroic protectors',
    targetPath: ['21', '11'],
    hint: 'Trace vertical upward: from [2,1] वी to [1,1] री.',
    category: 'linear',
    direction: 'Column 1 Vertical (2,1 ➔ 1,1)',
  },
  {
    id: 18,
    title: 'The Celestial Gandharva (हा-हा)',
    sanskritRiddle: 'देव-गायकानां प्रमुखः कः? (Who is the celebrated celestial songster of Indra’s court?)',
    meaning: 'Hāhā (हाहा), the celestial Gandharva singer in Sanskrit mythology.',
    answerDev: 'हा-हा',
    answerIast: 'Hā-hā',
    answerMeaning: 'Gandharva celestial singer',
    targetPath: ['01', '10'],
    hint: 'Connect [0,1] हा to [1,0] हा across the diagonal edge.',
    category: 'shift',
    direction: 'Diagonal Shift (0,1 ➔ 1,0)',
  },
  {
    id: 19,
    title: 'The Primordial Goddess of Fortune (ई / श्रीः)',
    sanskritRiddle: 'सर्व-सम्पदां मूला का? (Who is the root mother of cosmic fortune and light?)',
    meaning: 'Goddess Lakṣmī / Śrī, extracted via the sacred vowel from the center hero syllable.',
    answerDev: 'ई (श्रीः)',
    answerIast: 'Ī (Śrī)',
    answerMeaning: 'Mother Lakṣmī / Cosmic Fortune',
    targetPath: ['12'],
    subPhonemeTarget: true,
    extractionCellId: '12',
    extractedChar: 'ई',
    hint: 'Activate "Sub-Phonemic Tool", select [1,2] वी, and extract the long vowel "ई"!',
    category: 'subphoneme',
    direction: 'Sub-Phonemic Extraction from [1,2] वी (v + ī)',
  },
];

// ---------------------------------------------------------------------------
// PADMA-BANDHA (LOTUS SIMULATOR) DATA
// ---------------------------------------------------------------------------

export interface LotusPetal {
  petalIndex: number;
  angleDeg: number;
  innerNode: string;
  tipNode: string;
  outerConnector: string;
  label: string;
}

export const LOTUS_PETALS: LotusPetal[] = [
  { petalIndex: 0, angleDeg: 0, innerNode: 'वि', tipNode: 'का', outerConnector: 'सि', label: 'Petal 1 (East)' },
  { petalIndex: 1, angleDeg: 45, innerNode: 'क', tipNode: 'ञ्जा', outerConnector: 'रु', label: 'Petal 2 (NE)' },
  { petalIndex: 2, angleDeg: 90, innerNode: 'ण', tipNode: 'चा', outerConnector: 'रु', label: 'Petal 3 (North)' },
  { petalIndex: 3, angleDeg: 135, innerNode: 'लो', tipNode: 'च', outerConnector: 'ना', label: 'Petal 4 (NW)' },
  { petalIndex: 4, angleDeg: 180, innerNode: 'वि', tipNode: 'का', outerConnector: 'सि', label: 'Petal 5 (West)' },
  { petalIndex: 5, angleDeg: 225, innerNode: 'क', tipNode: 'ञ्जा', outerConnector: 'रु', label: 'Petal 6 (SW)' },
  { petalIndex: 6, angleDeg: 270, innerNode: 'ण', tipNode: 'चा', outerConnector: 'रु', label: 'Petal 7 (South)' },
  { petalIndex: 7, angleDeg: 315, innerNode: 'लो', tipNode: 'च', outerConnector: 'ना', label: 'Petal 8 (SE)' },
];

// ---------------------------------------------------------------------------
// CAKRA-BANDHA (WHEEL SIMULATOR) DATA
// ---------------------------------------------------------------------------

export const CAKRA_SPOKES = [
  { id: 1, angle: 0, text: 'सा - रा - का - रा', name: 'Spoke 1 (East · Indra)', signature: 'Invoking Eternal Radiance' },
  { id: 2, angle: 45, text: 'म - हा - क - रा', name: 'Spoke 2 (North-East · Īśāna)', signature: 'The Great Hand of Compassion' },
  { id: 3, angle: 90, text: 'ता - रा - धा - रा', name: 'Spoke 3 (North · Kubera)', signature: 'Stream of Star Jewels' },
  { id: 4, angle: 135, text: 'य - श - स्क - री', name: 'Spoke 4 (North-West · Vāyu)', signature: 'Bestower of Immortal Renown' },
  { id: 5, angle: 180, text: 'सा - रा - का - रा', name: 'Spoke 5 (West · Varuṇa)', signature: 'The Form of Pure Essence' },
  { id: 6, angle: 225, text: 'म - हा - क - रा', name: 'Spoke 6 (South-West · Nirṛti)', signature: 'The Shield Against Tribulation' },
  { id: 7, angle: 270, text: 'ता - रा - धा - रा', name: 'Spoke 7 (South · Yama)', signature: 'Sovereign Sustainer of Cosmic Law' },
  { id: 8, angle: 315, text: 'य - श - स्क - री', name: 'Spoke 8 (South-East · Agni)', signature: 'Blazing Splendor of Truth' },
];

// ---------------------------------------------------------------------------
// MURAJA-BANDHA (DRUM LATTICE) DATA
// ---------------------------------------------------------------------------

export const MURAJA_ROWS = [
  ['स', 'र', 'ला', 'ब', 'हु', 'ला', 'भा', 'ति'],
  ['का', 'व्य', 'ली', 'ला', 'म', 'नो', 'ह', 'रा'],
  ['भा', 'सु', 'रा', 'सु', 'म', 'न', 'स्का', 'ना'],
  ['ति', 'भा', 'ला', 'हु', 'ब', 'ला', 'र', 'स'],
];

// ---------------------------------------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------------------------------------

export interface CitrakavyaStudioProps {
  onNextLab?: () => void;
  onPrevLab?: () => void;
}

export const CitrakavyaStudio: React.FC<CitrakavyaStudioProps> = ({ onNextLab, onPrevLab }) => {
  const [activeTab, setActiveTab] = useState<StudioTab>('grid3x3');

  // Mode 1: 3x3 Grid State
  const [activeRiddleId, setActiveRiddleId] = useState<number>(1);
  const [selectedPath, setSelectedPath] = useState<string[]>([]);
  const [solvedRiddles, setSolvedRiddles] = useState<Set<number>>(new Set());
  const [filterCategory, setFilterCategory] = useState<RiddleCategory>('all');
  const [subPhonemeMode, setSubPhonemeMode] = useState<boolean>(false);
  const [extractedVowel, setExtractedVowel] = useState<string | null>(null);
  const [activeExtractionCell, setActiveExtractionCell] = useState<string | null>(null);
  const [inspectionCell, setInspectionCell] = useState<MatrixCell | null>(null);

  // Mode 2: Lotus State
  const [activePetal, setActivePetal] = useState<number | null>(0);
  const [lotusTracing, setLotusTracing] = useState<boolean>(false);

  // Mode 3: Wheel State
  const [wheelRotation, setWheelRotation] = useState<number>(0);
  const [activeSpokeId, setActiveSpokeId] = useState<number | null>(1);
  const [wheelViewMode, setWheelViewMode] = useState<'all' | 'hub' | 'spokes' | 'rim'>('all');

  // Mode 4: Drum State
  const [drumCordMode, setDrumCordMode] = useState<'both' | 'cordA' | 'cordB'>('both');
  const [isDrumPlaying, setIsDrumPlaying] = useState<boolean>(false);

  // Current active riddle object
  const currentRiddle = useMemo(() => {
    return DHARMADASA_RIDDLES.find((r) => r.id === activeRiddleId) || DHARMADASA_RIDDLES[0];
  }, [activeRiddleId]);

  // Filtered riddles list
  const filteredRiddles = useMemo(() => {
    if (filterCategory === 'all') return DHARMADASA_RIDDLES;
    return DHARMADASA_RIDDLES.filter((r) => r.category === filterCategory);
  }, [filterCategory]);

  // Handle cell click on 3x3 matrix
  const handleCellClick = useCallback(
    (cell: MatrixCell) => {
      soundEffects.playPuzzleSnap();
      playPronunciation(cell.char, { plainDevanagari: true });
      setInspectionCell(cell);

      if (subPhonemeMode) {
        setActiveExtractionCell(cell.id);
        return;
      }

      // Check if already in path
      if (selectedPath.includes(cell.id)) {
        // Remove cell or reset
        setSelectedPath((prev) => prev.filter((id) => id !== cell.id));
        return;
      }

      const nextPath = [...selectedPath, cell.id];
      setSelectedPath(nextPath);

      // Validate against current riddle
      if (currentRiddle.subPhonemeTarget) {
        // Needs sub-phoneme extraction tool
        return;
      }

      const isMatch =
        nextPath.length === currentRiddle.targetPath.length &&
        nextPath.every((val, idx) => val === currentRiddle.targetPath[idx]);

      if (isMatch) {
        // Solved!
        soundEffects.playVictoryFanfare();
        setSolvedRiddles((prev) => new Set(prev).add(currentRiddle.id));
      } else if (nextPath.length >= currentRiddle.targetPath.length) {
        // Wrong path length
        soundEffects.playErrorBuzzer();
      }
    },
    [currentRiddle, selectedPath, subPhonemeMode]
  );

  // Sub-phoneme extraction click
  const handleExtractVowel = useCallback(
    (vowelChar: string) => {
      soundEffects.playSuccessDing();
      setExtractedVowel(vowelChar);
      playPronunciation(vowelChar, { plainDevanagari: true });

      if (
        currentRiddle.subPhonemeTarget &&
        currentRiddle.extractedChar === vowelChar &&
        activeExtractionCell === currentRiddle.extractionCellId
      ) {
        soundEffects.playVictoryFanfare();
        setSolvedRiddles((prev) => new Set(prev).add(currentRiddle.id));
      }
    },
    [currentRiddle, activeExtractionCell]
  );

  // Auto demonstration of riddle path
  const handleDemonstrateRiddle = useCallback(
    (riddle: DharmadasaRiddle) => {
      setActiveRiddleId(riddle.id);
      setSelectedPath(riddle.targetPath);
      soundEffects.playStrokeChime();
      if (riddle.subPhonemeTarget) {
        setSubPhonemeMode(true);
        setActiveExtractionCell(riddle.extractionCellId || '00');
        setExtractedVowel(riddle.extractedChar || 'ई');
      } else {
        setSubPhonemeMode(false);
      }
    },
    []
  );

  // Clear path
  const handleClearPath = useCallback(() => {
    setSelectedPath([]);
    setExtractedVowel(null);
    soundEffects.playStrokeChime();
  }, []);

  // Lotus auto tour
  const handleAutoTraceLotus = useCallback(() => {
    setLotusTracing(true);
    let p = 0;
    setActivePetal(0);
    soundEffects.playTempleBell();
    const interval = setInterval(() => {
      p++;
      if (p >= LOTUS_PETALS.length) {
        clearInterval(interval);
        setLotusTracing(false);
      } else {
        setActivePetal(p);
        soundEffects.playStrokeChime();
      }
    }, 800);
  }, []);

  // Animate drum playback
  const handlePlayDrum = useCallback(() => {
    setIsDrumPlaying(true);
    soundEffects.playMridangaBeat();
    let step = 0;
    const interval = setInterval(() => {
      step++;
      soundEffects.playMridangaBeat();
      if (step >= 8) {
        clearInterval(interval);
        setIsDrumPlaying(false);
      }
    }, 350);
  }, []);

  return (
    <div className="cks-container" role="main" aria-label="Citrakāvya Master Studio">
      {/* Studio Header Banner */}
      <header className="cks-header">
        <div className="cks-header-badge">
          <span>🔲</span>
          <span>MATHEMATICAL POETICS · चित्रकाव्य-शाला</span>
        </div>
        <h1 className="cks-title">
          The Matrix of Mind
          <span className="cks-title-dev">· विदग्धमुखमण्डनम् एवं बन्ध-दर्शनम्</span>
        </h1>
        <p className="cks-subtitle">
          Long before computer scientists formulated constrained text matrices or newspaper crosswords were born,
          ancient Indian masters treated Sanskrit as an algorithmic canvas. Explore Dharmadāsa’s 19-question 3×3 Latin
          square syllable grid, dynamic vector overlays, sub-phonemic vowel extraction, and sacred geometric bandhas.
        </p>

        {/* Mode Navigation Tabs */}
        <nav className="cks-tabs" aria-label="Citrakāvya Exploration Modes">
          <button
            type="button"
            className={`cks-tab-btn${activeTab === 'grid3x3' ? ' active' : ''}`}
            onClick={() => {
              setActiveTab('grid3x3');
              soundEffects.playStrokeChime();
            }}
          >
            <span>🔲</span>
            <span>3×3 Grid Sandbox</span>
            <span className="cks-tab-badge">19 Riddles</span>
          </button>
          <button
            type="button"
            className={`cks-tab-btn${activeTab === 'padma' ? ' active' : ''}`}
            onClick={() => {
              setActiveTab('padma');
              soundEffects.playStrokeChime();
            }}
          >
            <span>🌸</span>
            <span>Padma-bandha (Lotus)</span>
            <span className="cks-tab-badge">8-Petals</span>
          </button>
          <button
            type="button"
            className={`cks-tab-btn${activeTab === 'cakra' ? ' active' : ''}`}
            onClick={() => {
              setActiveTab('cakra');
              soundEffects.playStrokeChime();
            }}
          >
            <span>☸️</span>
            <span>Cakra-bandha (Wheel)</span>
            <span className="cks-tab-badge">8-Spokes</span>
          </button>
          <button
            type="button"
            className={`cks-tab-btn${activeTab === 'muraja' ? ' active' : ''}`}
            onClick={() => {
              setActiveTab('muraja');
              soundEffects.playStrokeChime();
            }}
          >
            <span>🪘</span>
            <span>Muraja-bandha (Drum)</span>
            <span className="cks-tab-badge">Lattice</span>
          </button>
          <button
            type="button"
            className={`cks-tab-btn${activeTab === 'epistemic' ? ' active' : ''}`}
            onClick={() => {
              setActiveTab('epistemic');
              soundEffects.playStrokeChime();
            }}
          >
            <span>📜</span>
            <span>Algorithmic Code</span>
            <span className="cks-tab-badge">Darśana</span>
          </button>
        </nav>
      </header>

      {/* ====================================================================
          TAB 1: 3x3 GRID SANDBOX (Dharmadāsa 19-Question Master Matrix)
          ==================================================================== */}
      {activeTab === 'grid3x3' && (
        <div className="cks-grid-workspace">
          {/* Left Column: Interactive Grid Board & Tooling */}
          <div className="cks-board-card">
            <div className="cks-board-toolbar">
              <div className="cks-score-pill">
                <span>🌟</span>
                <span>
                  {solvedRiddles.size} / 19 Solved ({Math.round((solvedRiddles.size / 19) * 100)}%)
                </span>
              </div>
              <button
                type="button"
                className={`cks-tool-toggle${subPhonemeMode ? ' active' : ''}`}
                onClick={() => {
                  setSubPhonemeMode((prev) => !prev);
                  soundEffects.playStrokeChime();
                }}
                title="Toggle Sub-Phonemic Extraction Tool (Split Syllables into Consonant + Vowel)"
              >
                <span>🔬</span>
                <span>{subPhonemeMode ? 'Sub-Phoneme Tool: ON' : 'Sub-Phoneme Tool'}</span>
              </button>
            </div>

            {/* 3x3 Interactive Grid Stage with SVG Vector Arrows */}
            <div className="cks-grid-stage">
              {/* Dynamic SVG Vector Overlay */}
              <svg className="cks-svg-overlay" viewBox="0 0 380 380" aria-hidden="true">
                <defs>
                  <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#0284c7" />
                  </marker>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="glow" />
                    <feComposite in="SourceGraphic" in2="glow" operator="over" />
                  </filter>
                </defs>

                {/* Draw arrows between selected path nodes */}
                {selectedPath.length > 1 &&
                  selectedPath.map((cellId, idx) => {
                    if (idx === selectedPath.length - 1) return null;
                    const nextId = selectedPath[idx + 1];
                    const r1 = parseInt(cellId[0], 10);
                    const c1 = parseInt(cellId[1], 10);
                    const r2 = parseInt(nextId[0], 10);
                    const c2 = parseInt(nextId[1], 10);

                    // Cell centers in 380px square: (gap=12, padding, cell size ~112px)
                    const x1 = c1 * 124 + 66;
                    const y1 = r1 * 124 + 66;
                    const x2 = c2 * 124 + 66;
                    const y2 = r2 * 124 + 66;

                    return (
                      <g key={`${cellId}-${nextId}`}>
                        <line
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke="#38bdf8"
                          strokeWidth="8"
                          strokeLinecap="round"
                          opacity="0.45"
                          filter="url(#glow)"
                        />
                        <line
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke="#0284c7"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeDasharray="6 3"
                          markerEnd="url(#arrow)"
                        />
                      </g>
                    );
                  })}
              </svg>

              {/* 3x3 Matrix Cell Buttons */}
              <div className="cks-matrix-3x3" role="grid" aria-label="3x3 Dharmadāsa Sanskrit Syllable Grid">
                {MATRIX_3X3.flat().map((cell) => {
                  const isSelected = selectedPath.includes(cell.id);
                  const stepIndex = selectedPath.indexOf(cell.id);
                  const isTargetHint = currentRiddle.targetPath.includes(cell.id);
                  const isExtractionActive = activeExtractionCell === cell.id;

                  return (
                    <button
                      key={cell.id}
                      type="button"
                      className={`cks-cell${isSelected ? ' selected' : ''}${isTargetHint && selectedPath.length === 0 ? ' target-hint' : ''}${isExtractionActive ? ' solved-glow' : ''}`}
                      onClick={() => handleCellClick(cell)}
                      aria-label={`Row ${cell.r + 1}, Column ${cell.c + 1}: Syllable ${cell.char} (${cell.iast})`}
                    >
                      <span className="cks-cell-coord">[{cell.r},{cell.c}]</span>
                      {isSelected && <span className="cks-cell-step-num">{stepIndex + 1}</span>}
                      <span className="cks-cell-dev">{cell.char}</span>
                      <span className="cks-cell-iast">{cell.iast}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sub-Phonemic Extraction Drawer */}
            {subPhonemeMode && (
              <div className="cks-phoneme-drawer">
                <div className="cks-phoneme-title">
                  <span>🔬</span>
                  <span>
                    Sub-Phonemic Extraction Lens: {activeExtractionCell ? `Splitting Cell [${activeExtractionCell}]` : 'Tap any cell above'}
                  </span>
                </div>
                {activeExtractionCell ? (
                  <div>
                    <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.82rem', color: '#475569' }}>
                      Isolating base consonant and long vowel components according to Pāṇinian phonology (माहेश्वर-सूत्राणि):
                    </p>
                    <div className="cks-phoneme-chips">
                      <button
                        type="button"
                        className="cks-phoneme-chip"
                        onClick={() => soundEffects.playStrokeChime()}
                      >
                        <span>Consonant:</span>
                        <strong>
                          {activeExtractionCell.endsWith('0') || activeExtractionCell === '12' || activeExtractionCell === '21'
                            ? 'v (व्)'
                            : activeExtractionCell === '01' || activeExtractionCell === '10' || activeExtractionCell === '22'
                            ? 'h (ह्)'
                            : 'r (र्)'}
                        </strong>
                      </button>
                      <button
                        type="button"
                        className={`cks-phoneme-chip${extractedVowel === 'ई' ? ' active-extract' : ''}`}
                        onClick={() => handleExtractVowel('ई')}
                        title="Click to isolate long vowel 'ई' (Goddess Lakṣmī)"
                      >
                        <span>Vowel:</span>
                        <strong style={{ fontSize: '1.1rem', color: '#0284c7' }}>ī (ई)</strong>
                        <span>👈 Extract!</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <p style={{ margin: 0, fontSize: '0.82rem', color: '#64748b' }}>
                    Click on cell [0,0] वी to decompose into <code>v (व्)</code> + <code>ī (ई)</code> for Riddle #4 (Lakṣmī).
                  </p>
                )}
              </div>
            )}

            {/* Current Traversal Trail Bar */}
            <div className="cks-trail-bar">
              <div className="cks-trail-text">
                <span>Selected Traversal:</span>
                <span className="cks-trail-spelling">
                  {selectedPath.length > 0
                    ? selectedPath
                        .map((id) => {
                          const r = parseInt(id[0], 10);
                          const c = parseInt(id[1], 10);
                          return MATRIX_3X3[r][c].char;
                        })
                        .join(' ➔ ')
                    : 'None'}
                </span>
                {extractedVowel && (
                  <span style={{ color: '#059669', fontWeight: 800 }}> + [Extracted {extractedVowel}]</span>
                )}
              </div>
              <div className="cks-trail-actions">
                <button type="button" className="cks-mini-btn" onClick={handleClearPath}>
                  Reset Path
                </button>
                <button
                  type="button"
                  className="cks-mini-btn"
                  onClick={() => handleDemonstrateRiddle(currentRiddle)}
                  title="Auto-demonstrate correct vector traversal for this riddle"
                >
                  Show Vector
                </button>
              </div>
            </div>

            {/* Syllable Inspector Card */}
            {inspectionCell && (
              <div style={{ marginTop: '0.8rem', padding: '0.6rem 0.8rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.78rem' }}>
                <strong>Cell [{inspectionCell.r},{inspectionCell.c}] Inspector:</strong> Syllable <code>{inspectionCell.char}</code> ({inspectionCell.iast}) = {inspectionCell.cons} + {inspectionCell.vowel}. <em>{inspectionCell.meaning}</em>
              </div>
            )}
          </div>

          {/* Right Column: Riddle / Clue Matrix Dashboard */}
          <div className="cks-clue-card">
            <div className="cks-clue-header">
              <div className="cks-clue-badge">
                <span>🎯</span>
                <span>DHARMADĀSA’S RIDDLES ({solvedRiddles.size}/19)</span>
              </div>
              <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                Select a riddle to solve or trace
              </span>
            </div>

            {/* Category Filters */}
            <div className="cks-filter-row">
              <button
                type="button"
                className={`cks-filter-chip${filterCategory === 'all' ? ' active' : ''}`}
                onClick={() => setFilterCategory('all')}
              >
                All (19)
              </button>
              <button
                type="button"
                className={`cks-filter-chip${filterCategory === 'linear' ? ' active' : ''}`}
                onClick={() => setFilterCategory('linear')}
              >
                Linear Rows & Cols
              </button>
              <button
                type="button"
                className={`cks-filter-chip${filterCategory === 'shift' ? ' active' : ''}`}
                onClick={() => setFilterCategory('shift')}
              >
                Shift Transversals
              </button>
              <button
                type="button"
                className={`cks-filter-chip${filterCategory === 'particle' ? ' active' : ''}`}
                onClick={() => setFilterCategory('particle')}
              >
                Particles
              </button>
              <button
                type="button"
                className={`cks-filter-chip${filterCategory === 'subphoneme' ? ' active' : ''}`}
                onClick={() => setFilterCategory('subphoneme')}
              >
                Sub-Phonemic
              </button>
            </div>

            {/* Active Riddle Spotlight Box */}
            <div className="cks-active-riddle-box">
              <div className="cks-arb-kicker">
                Riddle #{currentRiddle.id} · {currentRiddle.direction}
                {solvedRiddles.has(currentRiddle.id) && (
                  <span style={{ float: 'right', color: '#059669', fontWeight: 900 }}>✓ SOLVED!</span>
                )}
              </div>
              <div className="cks-arb-question">{currentRiddle.title}</div>
              <div className="cks-arb-sanskrit-riddle">"{currentRiddle.sanskritRiddle}"</div>
              <div className="cks-arb-meaning">{currentRiddle.meaning}</div>
              <div className="cks-arb-hint">
                <strong>Clue & Path:</strong> {currentRiddle.hint}
              </div>
            </div>

            {/* 19 Questions Scrollable List */}
            <div className="cks-riddles-list" role="list">
              {filteredRiddles.map((riddle) => {
                const isSolved = solvedRiddles.has(riddle.id);
                const isActive = riddle.id === activeRiddleId;

                return (
                  <div
                    key={riddle.id}
                    className={`cks-riddle-item${isActive ? ' active-item' : ''}${isSolved ? ' solved' : ''}`}
                    onClick={() => {
                      setActiveRiddleId(riddle.id);
                      setSelectedPath([]);
                      setExtractedVowel(null);
                      soundEffects.playStrokeChime();
                    }}
                    role="listitem"
                    tabIndex={0}
                  >
                    <div className="cks-ri-left">
                      <span className="cks-ri-num">{isSolved ? '✓' : riddle.id}</span>
                      <span className="cks-ri-title">{riddle.title}</span>
                    </div>
                    <div className="cks-ri-answer">
                      {isSolved ? (
                        <span>{riddle.answerDev} ({riddle.answerIast})</span>
                      ) : (
                        <span style={{ color: '#94a3b8', fontSize: '0.74rem' }}>Tap to Solve →</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          TAB 2: PADMA-BANDHA (LOTUS SIMULATOR)
          ==================================================================== */}
      {activeTab === 'padma' && (
        <div className="cks-lotus-stage">
          <div style={{ maxWidth: '800px', textAlign: 'center', marginBottom: '1.2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', margin: '0 0 0.4rem 0' }}>
              🌸 Padma-bandha: The 8-Petal Lotus Bloom Grid
            </h2>
            <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.55 }}>
              In classical Sanskrit Mahākāvyas (such as Bhāravi’s <em>Kirātārjunīya</em> 15.14 and Māgha’s <em>Śiśupālavadha</em>),
              an entire four-line stanza maps into the geometric anatomy of a lotus. The verse reads outward from the center
              core (कर्णिका), traverses petal nodes to the tip, cycles into the adjacent petal, and returns symmetrically to the center!
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              className={`cks-tab-btn${lotusTracing ? ' active' : ''}`}
              onClick={handleAutoTraceLotus}
              disabled={lotusTracing}
            >
              <span>🌸</span>
              <span>{lotusTracing ? 'Tracing Petal Loops...' : 'Auto-Trace All 8 Petal Loops'}</span>
            </button>
          </div>

          {/* Interactive SVG Lotus Diagram */}
          <svg className="cks-lotus-svg" viewBox="-250 -250 500 500" aria-label="8-Petal Lotus Visual Verse">
            <defs>
              <radialGradient id="lotusGlow" cx="0" cy="0" r="70%">
                <stop offset="0%" stopColor="#fef3c7" />
                <stop offset="100%" stopColor="#fed7aa" />
              </radialGradient>
            </defs>

            {/* Connecting Circle Rings */}
            <circle cx="0" cy="0" r="60" fill="none" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="4 4" />
            <circle cx="0" cy="0" r="140" fill="none" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="4 4" />
            <circle cx="0" cy="0" r="210" fill="none" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="4 4" />

            {/* 8 Petal Shapes & Nodes */}
            {LOTUS_PETALS.map((petal) => {
              const rad = (petal.angleDeg * Math.PI) / 180;
              const isSelected = activePetal === petal.petalIndex;

              // Node coordinates
              const x1 = Math.cos(rad) * 90;
              const y1 = Math.sin(rad) * 90;
              const x2 = Math.cos(rad) * 160;
              const y2 = Math.sin(rad) * 160;
              const x3 = Math.cos(rad) * 215;
              const y3 = Math.sin(rad) * 215;

              return (
                <g key={petal.petalIndex}>
                  {/* Petal Outline Path */}
                  <path
                    d={`M 0 0 Q ${x1 * 1.3} ${y1 * 0.7} ${x2} ${y2} Q ${x1 * 0.7} ${y1 * 1.3} 0 0`}
                    fill={isSelected ? 'rgba(56, 189, 248, 0.18)' : 'rgba(254, 242, 242, 0.45)'}
                    stroke={isSelected ? '#0284c7' : '#cbd5e1'}
                    strokeWidth={isSelected ? 3 : 1.5}
                    onClick={() => {
                      setActivePetal(petal.petalIndex);
                      soundEffects.playStrokeChime();
                    }}
                    style={{ cursor: 'pointer', transition: 'all 0.25s ease' }}
                  />

                  {/* Inner Node */}
                  <g className="cks-lotus-node" onClick={() => setActivePetal(petal.petalIndex)}>
                    <circle cx={x1} cy={y1} r="18" fill="#ffffff" stroke={isSelected ? '#0284c7' : '#93c5fd'} strokeWidth="2" />
                    <text x={x1} y={y1}>{petal.innerNode}</text>
                  </g>

                  {/* Tip Node */}
                  <g className="cks-lotus-node" onClick={() => setActivePetal(petal.petalIndex)}>
                    <circle cx={x2} cy={y2} r="18" fill="#ffffff" stroke={isSelected ? '#f59e0b' : '#cbd5e1'} strokeWidth="2" />
                    <text x={x2} y={y2}>{petal.tipNode}</text>
                  </g>

                  {/* Filament Connector */}
                  <g className="cks-lotus-node" onClick={() => setActivePetal(petal.petalIndex)}>
                    <circle cx={x3} cy={y3} r="16" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
                    <text x={x3} y={y3} style={{ fontSize: '11px', fill: '#64748b' }}>{petal.outerConnector}</text>
                  </g>
                </g>
              );
            })}

            {/* Central Pericarp / Core (कर्णिका) */}
            <g className="cks-lotus-node cks-lotus-core" onClick={() => soundEffects.playTempleBell()}>
              <circle cx="0" cy="0" r="38" fill="url(#lotusGlow)" stroke="#f59e0b" strokeWidth="3" filter="drop-shadow(0 0 10px rgba(245, 158, 11, 0.4))" />
              <text x="0" y="0">भा</text>
            </g>
          </svg>

          {/* Active Petal Reader Controls */}
          {activePetal !== null && (
            <div style={{ marginTop: '1.2rem', padding: '1rem 1.4rem', background: '#f8fafc', borderRadius: '14px', border: '1px solid #bfdbfe', maxWidth: '640px', width: '100%', textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                {LOTUS_PETALS[activePetal].label} Traversal Path
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.4rem' }}>
                भा (Core) ➔ {LOTUS_PETALS[activePetal].innerNode} ➔ {LOTUS_PETALS[activePetal].tipNode} ➔ {LOTUS_PETALS[activePetal].outerConnector}
              </div>
              <p style={{ fontSize: '0.86rem', color: '#475569', margin: 0 }}>
                Notice how the central seed syllable <strong>'भा'</strong> anchors all 8 petals simultaneously, forming 4
                symmetrical couplets that read consistently in forward and reflected geometric loops!
              </p>
            </div>
          )}
        </div>
      )}

      {/* ====================================================================
          TAB 3: CAKRA-BANDHA (CHARIOT WHEEL SIMULATOR)
          ==================================================================== */}
      {activeTab === 'cakra' && (
        <div className="cks-wheel-stage">
          <div style={{ maxWidth: '800px', textAlign: 'center', marginBottom: '1.2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', margin: '0 0 0.4rem 0' }}>
              ☸️ Cakra-bandha: The 8-Spoke Rotary Chariot Wheel
            </h2>
            <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.55 }}>
              Verses are constructed like a solar chariot wheel (रथाङ्ग-चक्रम्). The central Hub (नाभि) anchors the deity,
              the 8 radial Spokes (अराः) carry invocations or the poet’s hidden signature (प्रशस्ति), and the circular
              Outer Rim (नेमि) wraps 32 syllables in flawless Anuṣṭubh meter!
            </p>
          </div>

          {/* Rotary Wheel Controls */}
          <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              type="button"
              className={`cks-filter-chip${wheelViewMode === 'all' ? ' active' : ''}`}
              onClick={() => setWheelViewMode('all')}
            >
              Show Complete Wheel
            </button>
            <button
              type="button"
              className={`cks-filter-chip${wheelViewMode === 'hub' ? ' active' : ''}`}
              onClick={() => setWheelViewMode('hub')}
            >
              Inspect Hub (नाभि)
            </button>
            <button
              type="button"
              className={`cks-filter-chip${wheelViewMode === 'spokes' ? ' active' : ''}`}
              onClick={() => setWheelViewMode('spokes')}
            >
              Inspect 8 Spokes (अराः)
            </button>
            <button
              type="button"
              className={`cks-filter-chip${wheelViewMode === 'rim' ? ' active' : ''}`}
              onClick={() => setWheelViewMode('rim')}
            >
              Inspect Outer Rim (नेमि)
            </button>
          </div>

          {/* SVG Wheel Diagram */}
          <svg
            className="cks-wheel-svg"
            viewBox="-250 -250 500 500"
            style={{ transform: `rotate(${wheelRotation}deg)`, transition: 'transform 0.4s ease' }}
            aria-label="Cakra-bandha Chariot Wheel"
          >
            {/* Outer Rim Double Ring */}
            <circle cx="0" cy="0" r="230" fill="none" stroke="#0284c7" strokeWidth="6" />
            <circle cx="0" cy="0" r="215" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 3" />
            <circle cx="0" cy="0" r="200" fill="rgba(240, 249, 255, 0.4)" stroke="#93c5fd" strokeWidth="2" />

            {/* 8 Spokes */}
            {CAKRA_SPOKES.map((spoke) => {
              const rad = (spoke.angle * Math.PI) / 180;
              const x2 = Math.cos(rad) * 200;
              const y2 = Math.sin(rad) * 200;
              const isSelected = activeSpokeId === spoke.id;

              return (
                <g key={spoke.id}>
                  <line
                    x1="0"
                    y1="0"
                    x2={x2}
                    y2={y2}
                    stroke={isSelected ? '#f59e0b' : '#94a3b8'}
                    strokeWidth={isSelected ? 5 : 2.5}
                    onClick={() => {
                      setActiveSpokeId(spoke.id);
                      soundEffects.playStrokeChime();
                    }}
                    style={{ cursor: 'pointer' }}
                  />
                  {/* Spoke label tag */}
                  <circle
                    cx={x2 * 0.65}
                    cy={y2 * 0.65}
                    r="12"
                    fill={isSelected ? '#f59e0b' : '#ffffff'}
                    stroke="#0284c7"
                    strokeWidth="1.5"
                    style={{ cursor: 'pointer' }}
                    onClick={() => setActiveSpokeId(spoke.id)}
                  />
                </g>
              );
            })}

            {/* Hub (नाभि) */}
            <circle cx="0" cy="0" r="45" fill="linear-gradient(#fde047, #f59e0b)" stroke="#b45309" strokeWidth="4" />
            <text x="0" y="0" textAnchor="middle" dominantBaseline="central" fontSize="22" fontWeight="900" fill="#78350f" style={{ fontFamily: 'Noto Sans Devanagari' }}>
              रा
            </text>
          </svg>

          {/* Spoke Inspector Info */}
          {activeSpokeId && (
            <div style={{ marginTop: '1.2rem', padding: '1rem 1.4rem', background: '#f8fafc', borderRadius: '14px', border: '1px solid #bfdbfe', maxWidth: '640px', width: '100%', textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                {CAKRA_SPOKES[activeSpokeId - 1].name}
              </div>
              <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.3rem' }}>
                रा (Hub) ➔ {CAKRA_SPOKES[activeSpokeId - 1].text}
              </div>
              <p style={{ fontSize: '0.86rem', color: '#475569', margin: '0 0 0.8rem 0' }}>
                <strong>Encoded Meaning / Praśasti:</strong> {CAKRA_SPOKES[activeSpokeId - 1].signature}
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                <button
                  type="button"
                  className="cks-mini-btn"
                  onClick={() => setWheelRotation((prev) => prev + 45)}
                >
                  Rotate Wheel 45° ↻
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ====================================================================
          TAB 4: MURAJA-BANDHA (MRIDANGAM DRUM LATTICE)
          ==================================================================== */}
      {activeTab === 'muraja' && (
        <div className="cks-muraja-stage">
          <div style={{ maxWidth: '800px', margin: '0 auto 1.2rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', margin: '0 0 0.4rem 0' }}>
              🪘 Muraja-bandha: The Mridangam Drum Lattice
            </h2>
            <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.55 }}>
              The Muraja is the classical double-sided Indian drum whose parchment heads are laced by crisscrossing leather
              cords (वरत्रा). In Muraja-bandha, reading horizontally across the 4 rows produces the first stanza, while
              tracing the zigzag diagonal cord reflections constructs the second stanza with mathematical precision!
            </p>
          </div>

          {/* Drum Audio & Mode Controls */}
          <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', marginBottom: '1.2rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className={`cks-tab-btn${isDrumPlaying ? ' active' : ''}`}
              onClick={handlePlayDrum}
              disabled={isDrumPlaying}
            >
              <span>🥁</span>
              <span>{isDrumPlaying ? 'Playing Mridanga Beat...' : 'Play Rhythm Beat'}</span>
            </button>
            <button
              type="button"
              className={`cks-filter-chip${drumCordMode === 'both' ? ' active' : ''}`}
              onClick={() => setDrumCordMode('both')}
            >
              Both Cord Networks
            </button>
            <button
              type="button"
              className={`cks-filter-chip${drumCordMode === 'cordA' ? ' active' : ''}`}
              onClick={() => setDrumCordMode('cordA')}
            >
              Cord A (Zig-Zag Down ↘)
            </button>
            <button
              type="button"
              className={`cks-filter-chip${drumCordMode === 'cordB' ? ' active' : ''}`}
              onClick={() => setDrumCordMode('cordB')}
            >
              Cord B (Zig-Zag Up ↗)
            </button>
          </div>

          {/* 8x4 Muraja Lattice */}
          <div className="cks-muraja-lattice">
            {MURAJA_ROWS.map((row, rIdx) =>
              row.map((char, cIdx) => {
                const isCordA = (rIdx + cIdx) % 2 === 0;
                const isCordB = (rIdx + cIdx) % 2 === 1;
                const isIntersect = rIdx === 1 && (cIdx === 2 || cIdx === 5);

                return (
                  <div
                    key={`${rIdx}-${cIdx}`}
                    className={`cks-muraja-cell${isIntersect ? ' intersection' : isCordA && (drumCordMode === 'cordA' || drumCordMode === 'both') ? ' path-a' : isCordB && (drumCordMode === 'cordB' || drumCordMode === 'both') ? ' path-b' : ''}`}
                    onClick={() => {
                      soundEffects.playMridangaBeat();
                      playPronunciation(char, { plainDevanagari: true });
                    }}
                  >
                    <div style={{ fontSize: '0.62rem', color: '#94a3b8', marginBottom: '2px' }}>
                      R{rIdx + 1}:C{cIdx + 1}
                    </div>
                    <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0f172a', fontFamily: 'Noto Sans Devanagari' }}>
                      {char}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Explanation Footer */}
          <div style={{ maxWidth: '780px', margin: '0 auto', background: '#f8fafc', padding: '1rem 1.4rem', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '0.86rem', color: '#334155', lineHeight: 1.55 }}>
            <strong>How the Mathematical Lattice Works:</strong>
            <ul style={{ margin: '0.4rem 0 0 1.2rem', padding: 0 }}>
              <li><strong>Horizontal Traversal:</strong> Reading rows 1 to 4 sequentially recites Pāda 1: <em>"सरला बहुला भाति काव्यलीला मनोहरा..."</em></li>
              <li><strong>Diagonal Cord Traversal:</strong> Weaving down and up through the golden-yellow cells (Cord A) and cyan cells (Cord B) stitches together an entirely distinct second poem from the identical 32 syllables without altering a single character!</li>
            </ul>
          </div>
        </div>
      )}

      {/* ====================================================================
          TAB 5: EPISTEMIC & MATHEMATICAL CODE SYNTHESIS
          ==================================================================== */}
      {activeTab === 'epistemic' && (
        <div className="cks-epistemic-grid">
          <div className="cks-epistemic-card">
            <h4><span>🔲</span> 1. Latin Squares &amp; Cyclic Permutations</h4>
            <p>
              Dharmadāsa’s 3×3 matrix is an authentic <strong>Latin square</strong> of order 3 over the alphabet{' '}
              <code>{'{ vī, hā, rī }'}</code>. Every row and column contains each syllable exactly once, forming a cyclic
              group ℤ₃ under modular addition.
            </p>
            <div className="cks-code-block">
              Row 0: [ vī, hā, rī ] (Shift 0)<br />
              Row 1: [ hā, rī, vī ] (Shift 1)<br />
              Row 2: [ rī, vī, hā ] (Shift 2)
            </div>
          </div>

          <div className="cks-epistemic-card">
            <h4><span>🔄</span> 2. Dihedral Symmetry Group D₄</h4>
            <p>
              In Sarvatobhadra, Cakra, and Padma bandhas, the verse remains invariant under 8 distinct spatial operations:
              4 rotations (0°, 90°, 180°, 270°) and 4 reflections (horizontal, vertical, and two diagonals).
            </p>
            <div className="cks-code-block">
              Rotations: R(0°), R(90°), R(180°), R(270°)<br />
              Reflections: V(x), H(y), D1(x=y), D2(x=-y)
            </div>
          </div>

          <div className="cks-epistemic-card">
            <h4><span>🕸️</span> 3. Hamiltonian Graph Traversal</h4>
            <p>
              The poet formulates language as a directed graph G = (V, E), where each syllable is a vertex and valid
              grammatical sequence forms a Hamiltonian path visiting every node without breaking poetic meter (Chandaḥ).
            </p>
            <div className="cks-code-block">
              Vertices |V| = 32 (Anuṣṭubh)<br />
              Path: Visits nodes subject to metric weight constraints (Laghu/Guru)
            </div>
          </div>

          <div className="cks-epistemic-card">
            <h4><span>🔬</span> 4. Pāṇinian Sub-Phonemic Atoms</h4>
            <p>
              Unlike European languages where syllables are indivisible printing units, Sanskrit recognizes{' '}
              <strong>Akṣaras</strong> as composable algebraic graphs: Consonant (Vyañjana) ⊕ Vowel (Svara). Splitting{' '}
              <code>vī ➔ v + ī</code> allows extracting isolated divine designations like Goddess Lakṣmī.
            </p>
            <div className="cks-code-block">
              Akṣara(vī) = Consonant(v) ⊕ Vowel(ī)<br />
              Ekākṣara Lexicon: 'ई' = Goddess Lakṣmī
            </div>
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      {(onNextLab || onPrevLab) && (
        <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
          {onPrevLab && (
            <button
              type="button"
              className="cks-mini-btn"
              onClick={onPrevLab}
              style={{ padding: '0.65rem 1.2rem', fontSize: '0.85rem' }}
            >
              ← Previous Laboratory
            </button>
          )}
          {onNextLab && (
            <button
              type="button"
              className="cks-tab-btn active"
              onClick={onNextLab}
              style={{ padding: '0.65rem 1.4rem', fontSize: '0.92rem', marginLeft: 'auto' }}
            >
              <span>🚀</span>
              <span>Next Laboratory ➔</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CitrakavyaStudio;
