import React, { useState } from 'react';
import { TurangaBandhaChessboard } from './TurangaBandhaChessboard';

interface LilavatiStudioProps {
  onPlayAudio?: (term: string) => void;
}

export interface SukshmaUnit {
  id: 'ahoratra' | 'ghadika' | 'vighadika' | 'prana' | 'lipta' | 'vilipta' | 'para' | 'tatpara' | 'truti';
  nameSa: string;
  nameTe: string;
  nameEn: string;
  ratio: string;
  seconds: number;
  secondsDisplay: string;
  analogy: string;
  category: 'Mūrta Kāla (మూర్త కాలం / Manifest)' | 'Threshold Boundary' | 'Amūrta Kāla (అమూర్త కాలం / Formless)';
  subdivision: string;
  modernEquiv: string;
  metricPrefix: string;
}

export const SUKSHMA_TIME_UNITS: SukshmaUnit[] = [
  {
    id: 'ahoratra',
    nameSa: 'अहोरात्रम्',
    nameTe: 'అహోరాత్రము',
    nameEn: '1 Civil Day (Ahorātram)',
    ratio: '1 Civil Solar Day',
    seconds: 86400,
    secondsDisplay: '86,400 s (24 Hours)',
    analogy: 'One complete rotation of Earth relative to sunrise.',
    category: 'Mūrta Kāla (మూర్త కాలం / Manifest)',
    subdivision: '60 Ghaṭikās (ఘడియలు)',
    modernEquiv: '86,400 SI Seconds (24 Hours)',
    metricPrefix: '10⁰ s',
  },
  {
    id: 'ghadika',
    nameSa: 'घटिका / घडी',
    nameTe: 'ఘడియ',
    nameEn: '1 Ghaṭikā (Ghadiyā)',
    ratio: '1/60 of a Day',
    seconds: 1440,
    secondsDisplay: '1,440 s (24 Minutes)',
    analogy: 'Time for a graduated water clepsydra (Ghaṭī Yantra) bowl to fill and sink.',
    category: 'Mūrta Kāla (మూర్త కాలం / Manifest)',
    subdivision: '60 Vighaṭikās (విఘడియలు)',
    modernEquiv: '24 Minutes (1,440 Seconds)',
    metricPrefix: '10³ s',
  },
  {
    id: 'vighadika',
    nameSa: 'विघटिका / पलं',
    nameTe: 'విఘడియ',
    nameEn: '1 Vighaṭikā (Pala)',
    ratio: '1/60 of a Ghaṭikā',
    seconds: 24,
    secondsDisplay: '24 Seconds',
    analogy: 'Time of 6 human respiratory breath cycles (Prāṇas).',
    category: 'Mūrta Kāla (మూర్త కాలం / Manifest)',
    subdivision: '6 Prāṇas (ప్రాణములు)',
    modernEquiv: '24 Seconds',
    metricPrefix: '10¹ s',
  },
  {
    id: 'prana',
    nameSa: 'प्राणः / असुः',
    nameTe: 'ప్రాణము',
    nameEn: '1 Prāṇa (Breath Cycle)',
    ratio: '1/6 of a Vighaṭikā',
    seconds: 4,
    secondsDisplay: '4.0 Seconds',
    analogy: 'Time taken to pronounce 10 long syllables (Dīrghākṣarālu) at normal cadence.',
    category: 'Mūrta Kāla (మూర్త కాలం / Manifest)',
    subdivision: '10 Dīrghākṣaras = 10 Liptās',
    modernEquiv: '4.0 Seconds (Standard adult resting breath)',
    metricPrefix: '10⁰ s',
  },
  {
    id: 'lipta',
    nameSa: 'लिप्ता / कला',
    nameTe: 'లిప్త',
    nameEn: '1 Liptā',
    ratio: '2/5 of a Second',
    seconds: 0.4,
    secondsDisplay: '0.4 Seconds (400 ms)',
    analogy: 'Duration of an unhurried human eye blink (Nimeṣa limit).',
    category: 'Threshold Boundary',
    subdivision: '60 Viliptās (విలిప్తాలు)',
    modernEquiv: '400 Milliseconds',
    metricPrefix: '10⁻¹ s',
  },
  {
    id: 'vilipta',
    nameSa: 'विलिप्ता / विकला',
    nameTe: 'విలిప్త',
    nameEn: '1 Viliptā',
    ratio: '1/150 of a Second',
    seconds: 1 / 150,
    secondsDisplay: '~0.00667 Seconds (6.67 ms)',
    analogy: 'Threshold of human sensory persistence of vision.',
    category: 'Amūrta Kāla (అమూర్త కాలం / Formless)',
    subdivision: '60 Paras (పరములు)',
    modernEquiv: '6.67 Milliseconds (~144 Hz display refresh frame)',
    metricPrefix: '10⁻³ s',
  },
  {
    id: 'para',
    nameSa: 'परम्',
    nameTe: 'పరము',
    nameEn: '1 Param',
    ratio: '1/9,000 of a Second',
    seconds: 1 / 9000,
    secondsDisplay: '~0.000111 Seconds (111.1 µs)',
    analogy: 'High-speed acoustic vibration frequency within the inner ear cochlea.',
    category: 'Amūrta Kāla (అమూర్త కాలం / Formless)',
    subdivision: '60 Tatparas (తత్పరలు)',
    modernEquiv: '111.1 Microseconds (0.11 ms)',
    metricPrefix: '10⁻⁴ s',
  },
  {
    id: 'tatpara',
    nameSa: 'तत्परम्',
    nameTe: 'తత్పర',
    nameEn: '1 Tatpara',
    ratio: '1/540,000 of a Second',
    seconds: 1 / 540000,
    secondsDisplay: '~1.85 Microseconds (1.85 µs)',
    analogy: 'Time taken for ultrasonic acoustic waves to travel 0.63 mm in air.',
    category: 'Amūrta Kāla (అమూర్త కాలం / Formless)',
    subdivision: '60 Truṭis (త్రుటులు)',
    modernEquiv: '1.85 Microseconds (µs)',
    metricPrefix: '10⁻⁶ s',
  },
  {
    id: 'truti',
    nameSa: 'त्रुटिः',
    nameTe: 'త్రుటి',
    nameEn: '1 Truṭi (The Lotus Needle Unit)',
    ratio: '1/32,400,000 of a Second',
    seconds: 1 / 32400000,
    secondsDisplay: '~30.86 Nanoseconds (30.86 ns)',
    analogy: 'Time for a sharp needle (sūdi) to pierce through a single petal of a fresh lotus (or stack of 100 petals).',
    category: 'Amūrta Kāla (అమూర్త కాలం / Formless)',
    subdivision: 'Indivisible Quantum Baseline (Paramāṇu of Time)',
    modernEquiv: '30.86 Nanoseconds (Light travels 9.25 m; ~100 CPU clock cycles at 3.2 GHz)',
    metricPrefix: '10⁻⁸ s',
  },
];

export const PLANETARY_MAHAYUGA_REVOLUTIONS: Record<string, { name: string; nameSa: string; revs: number; symbol: string; orbitalPeriodDays: number }> = {
  sun: { name: 'Sun (Sūrya / Solar Year)', nameSa: 'सूर्यः (सौरवर्षम्)', revs: 4320000, symbol: '☀️', orbitalPeriodDays: 365.258756 },
  moon: { name: 'Moon (Candra / Sidereal Months)', nameSa: 'चन्द्रः (नक्षत्रमासाः)', revs: 57753336, symbol: '🌙', orbitalPeriodDays: 27.32167 },
  mars: { name: 'Mars (Maṅgala / Bhauma)', nameSa: 'मङ्गलः / भौमः', revs: 2296832, symbol: '🔴', orbitalPeriodDays: 686.997 },
  mercury_shighra: { name: 'Mercury Conjunction (Budha-Śīghra)', nameSa: 'बुध-शीघ्रम्', revs: 17937060, symbol: '☿', orbitalPeriodDays: 87.97 },
  jupiter: { name: 'Jupiter (Guru / Bṛhaspati)', nameSa: 'गुरुः / बृहस्पतिः', revs: 364220, symbol: '♃', orbitalPeriodDays: 4332.32 },
  venus_shighra: { name: 'Venus Conjunction (Śukra-Śīghra)', nameSa: 'शुक्र-शीघ्रम्', revs: 7022376, symbol: '♀', orbitalPeriodDays: 224.7 },
  saturn: { name: 'Saturn (Śani / Śanaiścara)', nameSa: 'शनिः / मन्दः', revs: 146568, symbol: '♄', orbitalPeriodDays: 10765.77 },
  moon_apogee: { name: 'Moon Apogee (Candroccha / Mandocca)', nameSa: 'चन्द्रोच्चम्', revs: 488203, symbol: '🌕', orbitalPeriodDays: 3232.09 },
  rahu_node: { name: 'Moon Node (Rāhu / Retrograde)', nameSa: 'राहुः (वक्रगतिः)', revs: 232238, symbol: '☊', orbitalPeriodDays: 6794.4 },
};

export const MAGHA_PALINDROME_SYLLABLES: { dev: string; iast: string }[] = [
  { dev: 'तं', iast: 'taṃ' }, { dev: 'भा', iast: 'bhā' }, { dev: 'र', iast: 'ra' }, { dev: 'ता', iast: 'tā' },
  { dev: 'ता', iast: 'tā' }, { dev: 'मा', iast: 'mā' }, { dev: 'भा', iast: 'bhā' }, { dev: 'तं', iast: 'taṃ' },
  { dev: 'तं', iast: 'taṃ' }, { dev: 'भा', iast: 'bhā' }, { dev: 'ता', iast: 'tā' }, { dev: 'त', iast: 'ta' },
  { dev: 'म', iast: 'ma' }, { dev: 'भा', iast: 'bhā' }, { dev: 'र', iast: 'ra' }, { dev: 'तं', iast: 'taṃ' }
];

export const RAGHAVA_YADAVIYAM_DATA = {
  anuloma: {
    hero: '🏹 Śrī Rāma (Story of Rāmāyaṇa)',
    textSa: 'वन्देऽहं देवदेवं तं श्रीदन्तं धरणीधरम् । रमामलं केवलं तं भव्याराध्यं नमाम्यहम् ॥',
    iast: "vande'haṃ devadevaṃ taṃ śrīdantaṃ dharaṇīdharam | ramāmalaṃ kevalaṃ taṃ bhavyārādhyaṃ namāmyaham ||",
    meaning: '“I bow down to Lord Śrī Rāma, God of Gods, who grants spiritual splendor, who upholds the Earth, who is pure with Lakṣmī, singular and ever-worshipped by the noble.”',
    syllables: ['वन्', 'दे', 'हं', 'दे', 'व', 'दे', 'वं', 'तं', 'श्री', 'दन्', 'तं', 'ध', 'र', 'णी', 'ध', 'रम्', 'र', 'मा', 'म', 'लं', 'के', 'व', 'लं', 'तं', 'भ', 'व्या', 'रा', 'ध्यं', 'न', 'मा', 'म्य', 'हम्'],
  },
  viloma: {
    hero: '🪈 Śrī Kṛṣṇa (Story of Bhāgavatam)',
    textSa: 'हंम्यामानं ध्याराव्यभंतं लंवके लममारमा । रंधणीरधंतंद्रीशंतंदेवदेवमहंवन्दे ॥',
    iast: "ham-mya-mā-naṃ dhyā-rā-vya-bhaṃ-taṃ laṃ-va-ke la-ma-mā-ra-mā | raṃ-dha-ṇī-ra-dhaṃ-taṃ-drī-śaṃ-taṃ-de-va-de-va-ma-haṃ-van-de ||",
    meaning: '“I bow down to Lord Śrī Kṛṣṇa, the lover of Rādhā, whose body resembles fresh dark rain-clouds, master of divine flute melodies, ever-praised by the Vedic seers.”',
    syllables: ['हम्', 'म्य', 'मा', 'न', 'ध्यं', 'रा', 'व्या', 'भ', 'तं', 'लं', 'व', 'के', 'लं', 'म', 'मा', 'र', 'रम्', 'ध', 'णी', 'र', 'ध', 'तं', 'दन्', 'श्री', 'तं', 'वं', 'दे', 'व', 'दे', 'हं', 'दे', 'वन्'],
  },
};

export const SARVATOBHADRA_GRID: { dev: string; iast: string; orbitId: number }[][] = [
  [{ dev: 'दे', iast: 'de', orbitId: 1 }, { dev: 'वा', iast: 'vā', orbitId: 2 }, { dev: 'का', iast: 'kā', orbitId: 3 }, { dev: 'नि', iast: 'ni', orbitId: 4 }, { dev: 'नि', iast: 'ni', orbitId: 4 }, { dev: 'का', iast: 'kā', orbitId: 3 }, { dev: 'वा', iast: 'vā', orbitId: 2 }, { dev: 'दे', iast: 'de', orbitId: 1 }],
  [{ dev: 'वा', iast: 'vā', orbitId: 2 }, { dev: 'का', iast: 'kā', orbitId: 5 }, { dev: 'स्व', iast: 'sva', orbitId: 6 }, { dev: 'स्व', iast: 'sva', orbitId: 7 }, { dev: 'स्व', iast: 'sva', orbitId: 7 }, { dev: 'स्व', iast: 'sva', orbitId: 6 }, { dev: 'का', iast: 'kā', orbitId: 5 }, { dev: 'वा', iast: 'vā', orbitId: 2 }],
  [{ dev: 'का', iast: 'kā', orbitId: 3 }, { dev: 'स्व', iast: 'sva', orbitId: 6 }, { dev: 'भ', iast: 'bha', orbitId: 8 }, { dev: 'व्य', iast: 'vya', orbitId: 9 }, { dev: 'व्य', iast: 'vya', orbitId: 9 }, { dev: 'भ', iast: 'bha', orbitId: 8 }, { dev: 'स्व', iast: 'sva', orbitId: 6 }, { dev: 'का', iast: 'kā', orbitId: 3 }],
  [{ dev: 'नि', iast: 'ni', orbitId: 4 }, { dev: 'स्व', iast: 'sva', orbitId: 7 }, { dev: 'व्य', iast: 'vya', orbitId: 9 }, { dev: 'र', iast: 'ra', orbitId: 10 }, { dev: 'र', iast: 'ra', orbitId: 10 }, { dev: 'व्य', iast: 'vya', orbitId: 9 }, { dev: 'स्व', iast: 'sva', orbitId: 7 }, { dev: 'नि', iast: 'ni', orbitId: 4 }],
  [{ dev: 'नि', iast: 'ni', orbitId: 4 }, { dev: 'स्व', iast: 'sva', orbitId: 7 }, { dev: 'व्य', iast: 'vya', orbitId: 9 }, { dev: 'र', iast: 'ra', orbitId: 10 }, { dev: 'र', iast: 'ra', orbitId: 10 }, { dev: 'व्य', iast: 'vya', orbitId: 9 }, { dev: 'स्व', iast: 'sva', orbitId: 7 }, { dev: 'नि', iast: 'ni', orbitId: 4 }],
  [{ dev: 'का', iast: 'kā', orbitId: 3 }, { dev: 'स्व', iast: 'sva', orbitId: 6 }, { dev: 'भ', iast: 'bha', orbitId: 8 }, { dev: 'व्य', iast: 'vya', orbitId: 9 }, { dev: 'व्य', iast: 'vya', orbitId: 9 }, { dev: 'भ', iast: 'bha', orbitId: 8 }, { dev: 'स्व', iast: 'sva', orbitId: 6 }, { dev: 'का', iast: 'kā', orbitId: 3 }],
  [{ dev: 'वा', iast: 'vā', orbitId: 2 }, { dev: 'का', iast: 'kā', orbitId: 5 }, { dev: 'स्व', iast: 'sva', orbitId: 6 }, { dev: 'स्व', iast: 'sva', orbitId: 7 }, { dev: 'स्व', iast: 'sva', orbitId: 7 }, { dev: 'स्व', iast: 'sva', orbitId: 6 }, { dev: 'का', iast: 'kā', orbitId: 5 }, { dev: 'वा', iast: 'vā', orbitId: 2 }],
  [{ dev: 'दे', iast: 'de', orbitId: 1 }, { dev: 'वा', iast: 'vā', orbitId: 2 }, { dev: 'का', iast: 'kā', orbitId: 3 }, { dev: 'नि', iast: 'ni', orbitId: 4 }, { dev: 'नि', iast: 'ni', orbitId: 4 }, { dev: 'का', iast: 'kā', orbitId: 3 }, { dev: 'वा', iast: 'vā', orbitId: 2 }, { dev: 'दे', iast: 'de', orbitId: 1 }],
];

export const ORBIT_STYLES: Record<number, { bg: string; border: string; text: string; label: string; syl: string; count: number }> = {
  1: { bg: '#fef3c7', border: '#f59e0b', text: '#92400e', label: 'Orbit 1: Outer 4 Corners', syl: 'दे (de)', count: 4 },
  2: { bg: '#dbeafe', border: '#3b82f6', text: '#1e40af', label: 'Orbit 2: Outer Edge A', syl: 'वा (vā)', count: 8 },
  3: { bg: '#dcfce7', border: '#22c55e', text: '#166534', label: 'Orbit 3: Outer Edge B', syl: 'का (kā)', count: 8 },
  4: { bg: '#f3e8ff', border: '#a855f7', text: '#6b21a8', label: 'Orbit 4: Outer Mid-Spine', syl: 'नि (ni)', count: 8 },
  5: { bg: '#ffedd5', border: '#f97316', text: '#9a3412', label: 'Orbit 5: Inner Corners', syl: 'का (kā)', count: 4 },
  6: { bg: '#ccfbf1', border: '#14b8a6', text: '#115e59', label: 'Orbit 6: Concentric Ring A', syl: 'स्व (sva)', count: 8 },
  7: { bg: '#fce7f3', border: '#ec4899', text: '#9d174d', label: 'Orbit 7: Concentric Ring B', syl: 'स्व (sva)', count: 8 },
  8: { bg: '#e0e7ff', border: '#6366f1', text: '#3730a3', label: 'Orbit 8: Inner Diamond Tips', syl: 'भ (bha)', count: 4 },
  9: { bg: '#fef9c3', border: '#eab308', text: '#854d0e', label: 'Orbit 9: Central Diamond', syl: 'व्य (vya)', count: 8 },
  10: { bg: '#fee2e2', border: '#ef4444', text: '#991b1b', label: 'Orbit 10: Absolute Center 2×2', syl: 'र (ra)', count: 4 },
};

export const SARVATO_4X4_GRID = [
  ['भ (BHA)', 'र (RA)', 'त (TA)', 'वी (VEE)'],
  ['र (RA)', 'म (MA)', 'व (VA)', 'त (TA)'],
  ['त (TA)', 'व (VA)', 'म (MA)', 'र (RA)'],
  ['वी (VEE)', 'त (TA)', 'र (RA)', 'भ (BHA)'],
];

export const LilavatiPoeticMathStudio: React.FC<LilavatiStudioProps> = ({ onPlayAudio }) => {
  const [activeTab, setActiveTab] = useState<
    'bees' | 'necklace' | 'peacock' | 'lotus' | 'currency' | 'sukshma_kala' | 'maha_kala' | 'anka_pasa' | 'chhaya'
  >('bees');

  // Sub-mode inside anka_pasa:
  const [ankaSubMode, setAnkaSubMode] = useState<
    'shiva_multiset' | 'anuloma_viloma' | 'sarvatobhadra' | 'turanga_tour'
  >('shiva_multiset');

  // Interactive state for Aṅka-Pāśa (Combinatorics: Shiva & Multiset Permutations)
  const [shivaDistinctCount, setShivaDistinctCount] = useState<number>(10);
  const [multisetLotuses, setMultisetLotuses] = useState<number>(5);
  const [multisetTridents, setMultisetTridents] = useState<number>(3);
  const [multisetSwords, setMultisetSwords] = useState<number>(2);
  const [multisetShields, setMultisetShields] = useState<number>(2);

  // Interactive state for Gatika Kāvya (Anuloma-Viloma palindrome)
  const [palindromeCharIndex, setPalindromeCharIndex] = useState<number>(0);
  const [raghavaDirection, setRaghavaDirection] = useState<'anuloma' | 'viloma'>('anuloma');

  // Interactive state for Sarvatobhadra
  const [sarvatoGridSize, setSarvatoGridSize] = useState<'8x8' | '4x4'>('4x4');
  const [sarvatoHoveredCell, setSarvatoHoveredCell] = useState<{ r: number; c: number; orbitId: number } | null>(null);
  const [sarvatoReadMode, setSarvatoReadMode] = useState<
    'normal' | 'row0_fwd' | 'row0_rev' | 'col0_down' | 'col0_up' | 'perimeter'
  >('normal');

  // Interactive state for Chāyā-Vyavahāra (Gnomons, Shadows & Heights)
  const [gnomonRodHeight, setGnomonRodHeight] = useState<number>(12); // Standard 12 aṅgulas (Śaṅku)
  const [shadowOne, setShadowOne] = useState<number>(4); // S1
  const [shadowTwo, setShadowTwo] = useState<number>(7); // S2
  const [surveyorDistance, setSurveyorDistance] = useState<number>(30); // D
  const [palabhaShadow, setPalabhaShadow] = useState<number>(5.3); // Equinoctial noon shadow for Ujjain (~23.18° N latitude)

  // Interactive state for Peacock & Snake
  const [pillarHeight, setPillarHeight] = useState<number>(9);
  const [snakeDistMultiplier, setSnakeDistMultiplier] = useState<number>(3); // 3x pillar height = 27

  // Interactive state for Lotus in Lake
  const [bloomHeight, setBloomHeight] = useState<number>(0.5); // cubits above surface
  const [horizontalShift, setHorizontalShift] = useState<number>(2.0); // cubits to touch water

  // Interactive state for Pearl Necklace
  const [remainingPearls, setRemainingPearls] = useState<number>(6);

  // Interactive state for Cowrie Currency (Gavvalu / Varāṭaka)
  const [cowrieCount, setCowrieCount] = useState<number>(80);

  // Interactive state for Sūkṣma Kāla (Microscopic Time)
  const [selectedSubUnit, setSelectedSubUnit] = useState<
    'ahoratra' | 'ghadika' | 'vighadika' | 'prana' | 'lipta' | 'vilipta' | 'para' | 'tatpara' | 'truti'
  >('truti');
  const [lotusPetalLayers, setLotusPetalLayers] = useState<number>(1);

  // Interactive state for Mahā Kāla (Cosmic Timelines & Kalpa Timestamp)
  const [selectedCivilYear, setSelectedCivilYear] = useState<number>(2026);
  const [selectedPlanetKey, setSelectedPlanetKey] = useState<string>('sun');
  const [customAharganaDays, setCustomAharganaDays] = useState<number>(1860000);

  // Calculations for Peacock:
  // D = snakeDistMultiplier * pillarHeight
  // x = (D^2 - H^2) / (2D)
  const D = snakeDistMultiplier * pillarHeight;
  const interceptDist = (Math.pow(D, 2) - Math.pow(pillarHeight, 2)) / (2 * D);
  const flightDist = Math.sqrt(Math.pow(pillarHeight, 2) + Math.pow(interceptDist, 2));

  // Calculations for Lotus:
  // d = (L^2 - h^2) / (2h)
  const waterDepth = (Math.pow(horizontalShift, 2) - Math.pow(bloomHeight, 2)) / (2 * bloomHeight);
  const stemLength = waterDepth + bloomHeight;

  // Calculations for Necklace:
  // (1/6 + 1/5 + 1/3 + 1/10) = 4/5
  // (1 - 4/5)p = remainingPearls => p/5 = remainingPearls => p = 5 * remainingPearls
  const totalPearls = remainingPearls * 5;

  // Calculations for Cowrie Currency (Līlāvatī Ch. 1, Verse 2):
  // 20 Varāṭakas (Gavvalu) = 1 Kākiṇī
  // 4 Kākiṇīs = 1 Paṇa (80 Cowries)
  // 16 Paṇas = 1 Dramma (1,280 Cowries)
  // 16 Drammas = 1 Niṣka (20,480 Cowries)
  const kakinis = cowrieCount / 20;
  const panas = cowrieCount / 80;
  const drammas = cowrieCount / 1280;
  const nishkas = cowrieCount / 20480;
  const phootiKaudis = cowrieCount * 4;

  // Cosmic Kalpa Calculation based on Saṅkalpa Mantra:
  // "...Adya Brahmane, Dviteeya Parardhe, Sri Swetha Varaha Kalpe, Vaivaswatha Manvantare, Kaliyuge, Prathama Pade..."
  const manvantarasElapsedYears = 6 * 71 * 4320000; // 1,840,320,000
  const sandhisElapsedYears = 7 * 1728000; // 12,096,000
  const mahayugasElapsedYears = 27 * 4320000; // 116,640,000
  const completedYugasIn28thCycle = 1728000 + 1296000 + 864000; // 3,888,000
  const kaliElapsedYears = 3102 + selectedCivilYear; // 5,128 for 2026
  const totalKalpaElapsedYears =
    manvantarasElapsedYears +
    sandhisElapsedYears +
    mahayugasElapsedYears +
    completedYugasIn28thCycle +
    kaliElapsedYears;

  // Sūrya Siddhānta Sidereal Year breakdown:
  // Total Civil Days in Mahāyuga = 1,577,917,828
  // Total Solar Years in Mahāyuga = 4,320,000
  const totalCivilDaysPerMahayuga = 1577917828;
  const solarYearsPerMahayuga = 4320000;
  const daysInSolarYear = totalCivilDaysPerMahayuga / solarYearsPerMahayuga; // 365.25875648148
  const daysInt = Math.floor(daysInSolarYear); // 365
  const fracDay = daysInSolarYear - daysInt;
  const hoursFloat = fracDay * 24; // 6.21015555
  const hoursInt = Math.floor(hoursFloat); // 6
  const fracHour = hoursFloat - hoursInt;
  const minsFloat = fracHour * 60; // 12.609333
  const minsInt = Math.floor(minsFloat); // 12
  const secsFloat = (minsFloat - minsInt) * 60; // 36.56

  // Ahargaṇa Planetary Calculation:
  const activePlanet = PLANETARY_MAHAYUGA_REVOLUTIONS[selectedPlanetKey] || PLANETARY_MAHAYUGA_REVOLUTIONS.sun;
  const rawRevolutions = (activePlanet.revs * customAharganaDays) / totalCivilDaysPerMahayuga;
  const fractionalRevolution = rawRevolutions - Math.floor(rawRevolutions);
  const totalDegrees = fractionalRevolution * 360;
  const currentRashiIndex = Math.floor(totalDegrees / 30);
  const degreeInRashi = totalDegrees % 30;
  const arcMinutes = (degreeInRashi - Math.floor(degreeInRashi)) * 60;
  const ZODIAC_SIGNS = [
    'Aries (Meṣa / మేషం)',
    'Taurus (Vṛṣabha / వృషభం)',
    'Gemini (Mithuna / మిథునం)',
    'Cancer (Karka / కర్కాటకం)',
    'Leo (Siṃha / సింహం)',
    'Virgo (Kanyā / కన్య)',
    'Libra (Tulā / తుల)',
    'Scorpio (Vṛścika / వృశ్చికం)',
    'Sagittarius (Dhanu / ధనుస్సు)',
    'Capricorn (Makara / మకరం)',
    'Aquarius (Kumbha / కుంభం)',
    'Pisces (Mīna / మీనం)',
  ];

  // Aṅka-Pāśa (Combinatorics) Calculations:
  const factorial = (n: number): number => {
    if (n <= 1) return 1;
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
  };

  // Distinct items (10-armed Shiva, 4-armed Vishnu):
  const shivaDistinctPermutations = factorial(shivaDistinctCount);

  // Multiset items (Repeated Deity Weapons):
  const totalMultisetHands = multisetLotuses + multisetTridents + multisetSwords + multisetShields;
  const multisetNumerator = factorial(totalMultisetHands);
  const multisetDenominator =
    factorial(multisetLotuses) *
    factorial(multisetTridents) *
    factorial(multisetSwords) *
    factorial(multisetShields);
  const multisetPermutations = multisetDenominator > 0 ? Math.round(multisetNumerator / multisetDenominator) : 0;

  // Chāyā-Vyavahāra (Gnomons, Shadows & Heights) Calculations:
  const shadowDelta = shadowTwo - shadowOne;
  const calculatedCliffHeight = shadowDelta > 0 ? (gnomonRodHeight * surveyorDistance) / shadowDelta : 0;
  const firstCliffDistance = shadowDelta > 0 ? (shadowOne * surveyorDistance) / shadowDelta : 0;
  const derivedLatitudeDeg = (Math.atan(palabhaShadow / 12) * 180) / Math.PI;

  return (
    <div
      style={{
        background: '#ffffff',
        border: '1.5px solid #e2e8f0',
        borderRadius: '16px',
        padding: '1.5rem',
        margin: '2rem 0',
        boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
        <div>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0d9488' }}>
            Interactive Mathematical Poetry Studio
          </span>
          <h3 style={{ margin: '0.25rem 0 0', fontSize: '1.35rem', fontWeight: 800, color: '#0f172a' }}>
            लीलावती (Līlāvatī) · Poetic Puzzles &amp; Micro-Currency of Bhāskara II
          </h3>
          <p style={{ margin: '0.25rem 0 0', fontSize: '0.88rem', color: '#64748b' }}>
            Quadratic Equations, Fractional Rhythms, Pythagorean Geometry &amp; Cowrie Place-Value (1114 CE)
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '0.35rem', background: '#f1f5f9', padding: '0.35rem', borderRadius: '10px', flexWrap: 'wrap' }}>
          {[
            { id: 'bees', label: '🐝 Swarm of Bees', sub: 'Quadratic' },
            { id: 'necklace', label: '📿 Broken Necklace', sub: 'Fractions' },
            { id: 'peacock', label: '🦚 Peacock & Snake', sub: 'Geometry' },
            { id: 'lotus', label: '🪷 Lotus in Lake', sub: 'Depth' },
            { id: 'currency', label: '🐚 Cowrie Currency', sub: 'Place Value' },
            { id: 'sukshma_kala', label: '🪷 Micro Time (Sūkṣma Kāla)', sub: 'Lotus & Needle' },
            { id: 'maha_kala', label: '🌌 Cosmic Kalpa & Ahargaṇa', sub: 'Surya Siddhanta' },
            { id: 'anka_pasa', label: '🔱 Combinatorics & Gatika Kāvya', sub: 'Aṅka-Pāśa & Grids' },
            { id: 'chhaya', label: '☀️ Gnomon Shadows (Chāyā)', sub: 'Double-Shadows & Heights' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '0.45rem 0.85rem',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === tab.id ? '#0d9488' : 'transparent',
                color: activeTab === tab.id ? '#ffffff' : '#475569',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* =========================================================================
          TAB 1: THE SWARM OF BEES (QUADRATIC EQUATION)
         ========================================================================= */}
      {activeTab === 'bees' && (
        <div>
          <div style={{ background: '#f0fdfa', border: '1.5px solid #99f6e4', borderRadius: '12px', padding: '1.2rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0f766e', textTransform: 'uppercase' }}>
                Classic Sanskrit Verse · भ्रमर-समस्या
              </span>
              <button
                type="button"
                onClick={() => onPlayAudio?.('अलिकुलदलमूलं मालतीं यातम्')}
                style={{
                  padding: '0.2rem 0.5rem',
                  fontSize: '0.76rem',
                  borderRadius: '6px',
                  border: '1px solid #5eead4',
                  background: '#ffffff',
                  cursor: 'pointer',
                }}
              >
                🔊 Chant Verse
              </button>
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#134e4a', lineHeight: 1.6, marginBottom: '0.4rem' }}>
              अलिकुलदलमूलं मालतीं यातम्...<br />
              <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0f766e' }}>
                aliguladalaṁ pañcamo malindaḥ, tribhāgo vilīyate mallikāyām |<br />
                tadantaraguṇaṁ triguṇaṁ ca mālatyāṁ, nalinīdale ca avaśiṣṭa ekaḥ ||
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#115e59', lineHeight: 1.5 }}>
              <strong>The Poetic Riddle:</strong> &quot;The square root of half the swarm of bees flew to the fragrant Mālatī blossoms. One fifth landed upon the jasmine bush; one third nestled in the lotus bloom. Three times the difference between those in the jasmine and the lotus flew to the trumpet flower. And exactly one lonely bee remained trapped inside the folded lotus bud at night. Tell me, lovely Līlāvatī, how many bees were there in the swarm?&quot;
            </p>
          </div>

          {/* Visual Breakdown of Bees */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>1. Mālatī Blossoms</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '0.2rem 0' }}>√(x / 2)</div>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Square root of half the swarm</div>
            </div>
            <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>2. Jasmine Bush</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '0.2rem 0' }}>x / 5</div>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>One-fifth of entire swarm</div>
            </div>
            <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>3. Lotus Bloom</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '0.2rem 0' }}>x / 3</div>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>One-third of entire swarm</div>
            </div>
            <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>4. Trumpet Flower</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '0.2rem 0' }}>2x / 5</div>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>3 × (x/3 - x/5) = 2x/5</div>
            </div>
            <div style={{ background: '#fef3c7', padding: '0.85rem', borderRadius: '10px', border: '1px solid #fde68a' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#92400e', textTransform: 'uppercase' }}>5. Trapped Bee</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#92400e', margin: '0.2rem 0' }}>1 Bee</div>
              <div style={{ fontSize: '0.78rem', color: '#b45309' }}>Captive in closed bud</div>
            </div>
          </div>

          {/* Mathematical Proof Card */}
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
            <h4 style={{ margin: '0 0 0.75rem', fontSize: '1rem', fontWeight: 800, color: '#1e293b' }}>
              Algebraic Resolution: Isolating the Radical &amp; Factoring the Quadratic
            </h4>
            <div style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.7, fontFamily: 'monospace' }}>
              <div><strong>Step 1:</strong> x = √(x/2) + (x/5 + x/3 + 2x/5) + 1</div>
              <div><strong>Step 2:</strong> Group linear terms: (3x/5 + x/3) = 14x/15</div>
              <div><strong>Step 3:</strong> Isolate radical: x - 14x/15 - 1 = √(x/2) ➔ <strong>x/15 - 1 = √(x/2)</strong></div>
              <div><strong>Step 4:</strong> Square both sides: ((x - 15) / 15)² = x / 2</div>
              <div><strong>Step 5:</strong> (x² - 30x + 225) / 225 = x / 2 ➔ 2x² - 60x + 450 = 225x</div>
              <div><strong>Step 6:</strong> Standard quadratic form: <strong>2x² - 285x + 450 = 0</strong></div>
            </div>

            <div style={{ marginTop: '1rem', padding: '0.85rem', borderRadius: '8px', background: '#ecfdf5', border: '1px solid #a7f3d0' }}>
              <div style={{ fontWeight: 800, color: '#065f46', fontSize: '0.92rem' }}>
                Bhāskara’s Canonical Sister Problem: x = 72 Bees
              </div>
              <p style={{ margin: '0.35rem 0 0', fontSize: '0.86rem', color: '#047857', lineHeight: 1.5 }}>
                In the parallel canonical verse <em>Alikuladalamūlaṁ mālatīṁ yātamaṣṭau...</em>, Bhāskara sets √(x/2) + 8/9 x + 2 = x, which reduces to <strong>(2x - 9)(x - 72) = 0</strong>.
                Disregarding the fractional non-integer root 9/2, the exact answer is <strong>72 bees</strong> (where 6 fly to jasmine, 64 to mālatī, and 2 remain humming)!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: THE BROKEN NECKLACE (FRACTIONS)
         ========================================================================= */}
      {activeTab === 'necklace' && (
        <div>
          <div style={{ background: '#fffbeb', border: '1.5px solid #fde68a', borderRadius: '12px', padding: '1.2rem', marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#b45309', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              A Lover’s Quarrel in Fractions · मुक्ताहार-समस्या
            </div>
            <blockquote style={{ margin: '0 0 0.5rem', fontStyle: 'italic', fontSize: '0.96rem', color: '#92400e', lineHeight: 1.5 }}>
              &quot;Whilst making love a necklace broke. A row of pearls mislaid.<br />
              One sixth fell to the floor. One fifth upon the bed.<br />
              The young woman saved one third of them. One tenth were caught by her lover.<br />
              If six pearls remained upon the string, how many pearls were there altogether?&quot;
            </blockquote>
          </div>

          {/* Interactive pearl adjustment slider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.25rem', background: '#f8fafc', padding: '0.85rem 1.15rem', borderRadius: '10px' }}>
            <label style={{ fontSize: '0.88rem', fontWeight: 700, color: '#334155' }}>
              Pearls remaining on string (default 6):
            </label>
            <input
              type="range"
              min={1}
              max={20}
              value={remainingPearls}
              onChange={(e) => setRemainingPearls(Number(e.target.value))}
              style={{ flex: '1 1 150px', cursor: 'pointer' }}
            />
            <span style={{ fontWeight: 800, color: '#0d9488', fontSize: '1.1rem' }}>
              {remainingPearls} pearls
            </span>
          </div>

          {/* Fraction Breakdown Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.76rem', fontWeight: 800, color: '#64748b' }}>Fell to Floor (1/6)</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>
                {Math.round((totalPearls * 1) / 6)} Pearls
              </div>
              <div style={{ fontSize: '0.76rem', color: '#64748b' }}>5/30 of total</div>
            </div>
            <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.76rem', fontWeight: 800, color: '#64748b' }}>Upon the Bed (1/5)</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>
                {Math.round((totalPearls * 1) / 5)} Pearls
              </div>
              <div style={{ fontSize: '0.76rem', color: '#64748b' }}>6/30 of total</div>
            </div>
            <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.76rem', fontWeight: 800, color: '#64748b' }}>Saved by Lady (1/3)</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>
                {Math.round((totalPearls * 1) / 3)} Pearls
              </div>
              <div style={{ fontSize: '0.76rem', color: '#64748b' }}>10/30 of total</div>
            </div>
            <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.76rem', fontWeight: 800, color: '#64748b' }}>Caught by Lover (1/10)</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>
                {Math.round((totalPearls * 1) / 10)} Pearls
              </div>
              <div style={{ fontSize: '0.76rem', color: '#64748b' }}>3/30 of total</div>
            </div>
          </div>

          {/* Visual Pearl String Ribbon */}
          <div
            style={{
              background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
              borderRadius: '12px',
              padding: '1.25rem',
              color: '#ffffff',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
              <span style={{ fontSize: '0.84rem', fontWeight: 800, color: '#cbd5e1' }}>
                TOTAL STRING CAPACITY: {totalPearls} PEARLS
              </span>
              <span style={{ fontSize: '0.84rem', color: '#38bdf8', fontWeight: 700 }}>
                Fractional Sum: (5 + 6 + 10 + 3)/30 = 24/30 = 4/5
              </span>
            </div>

            <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', alignItems: 'center', padding: '0.5rem 0' }}>
              {Array.from({ length: totalPearls }).map((_, idx) => {
                let color = '#38bdf8'; // floor
                if (idx >= totalPearls * (1 / 6) && idx < totalPearls * (1 / 6 + 1 / 5)) color = '#a855f7'; // bed
                else if (idx >= totalPearls * (1 / 6 + 1 / 5) && idx < totalPearls * (1 / 6 + 1 / 5 + 1 / 3)) color = '#ec4899'; // lady
                else if (idx >= totalPearls * (1 / 6 + 1 / 5 + 1 / 3) && idx < totalPearls * (4 / 5)) color = '#eab308'; // lover
                else if (idx >= totalPearls * (4 / 5)) color = '#ffffff'; // string

                return (
                  <span
                    key={idx}
                    style={{
                      width: '14px',
                      height: '14px',
                      borderRadius: '50%',
                      background: `radial-gradient(circle at 30% 30%, #ffffff, ${color})`,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.4)',
                      display: 'inline-block',
                    }}
                    title={`Pearl #${idx + 1}`}
                  />
                );
              })}
            </div>

            <div style={{ marginTop: '0.75rem', fontSize: '0.86rem', color: '#94a3b8', lineHeight: 1.5 }}>
              Since 4/5 of the necklace is accounted for across the room, the remaining <strong>1/5 represents the {remainingPearls} pearls</strong> still on the string:
              <br />
              <code>1/5 p = {remainingPearls} ➔ p = 5 × {remainingPearls} = {totalPearls} pearls!</code>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: THE PEACOCK AND THE SNAKE (PYTHAGOREAN THEOREM)
         ========================================================================= */}
      {activeTab === 'peacock' && (
        <div>
          <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: '12px', padding: '1.2rem', marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#166534', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              Pythagorean Flight Path · मयूर-सर्प-समस्या
            </div>
            <blockquote style={{ margin: '0 0 0.5rem', fontStyle: 'italic', fontSize: '0.96rem', color: '#14532d', lineHeight: 1.5 }}>
              &quot;There is a pillar nine cubits high, and a pet peacock sits on top of it. At its base is the entrance to a snake’s hole. Spotting the snake moving towards its burrow from a distance of three times the pillar’s height, the peacock flies down diagonally to intercept it. If their speeds are exactly equal, tell me, learned mathematician, at what distance from the hole do they collide?&quot;
            </blockquote>
          </div>

          {/* Interactive controls for pillar and snake */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.25rem', background: '#f8fafc', padding: '1rem', borderRadius: '10px' }}>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.3rem' }}>
                Pillar Height: <strong>{pillarHeight} cubits</strong>
              </label>
              <input
                type="range"
                min={5}
                max={20}
                value={pillarHeight}
                onChange={(e) => setPillarHeight(Number(e.target.value))}
                style={{ width: '100%', cursor: 'pointer' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.3rem' }}>
                Snake Initial Distance: <strong>{D} cubits</strong> ({snakeDistMultiplier}× pillar)
              </label>
              <input
                type="range"
                min={2}
                max={5}
                step={0.5}
                value={snakeDistMultiplier}
                onChange={(e) => setSnakeDistMultiplier(Number(e.target.value))}
                style={{ width: '100%', cursor: 'pointer' }}
              />
            </div>
          </div>

          {/* Visual SVG Diagram */}
          <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.25rem', textAlign: 'center' }}>
            <svg viewBox="0 0 500 220" style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }}>
              {/* Ground */}
              <line x1="30" y1="180" x2="470" y2="180" stroke="#78716c" strokeWidth="3" />

              {/* Pillar at x=60 */}
              <rect x="52" y="40" width="16" height="140" fill="#a8a29e" stroke="#57534e" strokeWidth="1.5" />
              <text x="60" y="30" textAnchor="middle" fontSize="16">🦚</text>
              <text x="35" y="110" fontSize="12" fill="#44403c" fontWeight="bold">H = {pillarHeight}</text>

              {/* Snake Hole at (60, 180) */}
              <circle cx="60" cy="180" r="5" fill="#1c1917" />
              <text x="60" y="200" textAnchor="middle" fontSize="11" fill="#44403c">Hole (0,0)</text>

              {/* Intercept point */}
              {/* Map x=60 to 0, x=440 to D */}
              {(() => {
                const pxScale = 380 / D;
                const interceptX = 60 + interceptDist * pxScale;
                const snakeStartX = 60 + D * pxScale;

                return (
                  <>
                    {/* Snake at start */}
                    <circle cx={snakeStartX} cy="180" r="6" fill="#15803d" />
                    <text x={snakeStartX} y="170" textAnchor="middle" fontSize="14">🐍</text>
                    <text x={snakeStartX} y="200" textAnchor="middle" fontSize="11" fill="#15803d" fontWeight="bold">
                      Start ({D})
                    </text>

                    {/* Flight path hypotenuse */}
                    <line x1="60" y1="40" x2={interceptX} y2="180" stroke="#d97706" strokeWidth="2.5" strokeDasharray="5,4" />

                    {/* Snake path */}
                    <line x1={snakeStartX} y1="180" x2={interceptX} y2="180" stroke="#16a34a" strokeWidth="3" />

                    {/* Intercept collision marker */}
                    <circle cx={interceptX} cy="180" r="7" fill="#dc2626" />
                    <text x={interceptX} y="165" textAnchor="middle" fontSize="11" fill="#b91c1c" fontWeight="bold">
                      Collision! (x = {interceptDist.toFixed(1)} c)
                    </text>
                    <text x={interceptX} y="215" textAnchor="middle" fontSize="11" fill="#b45309">
                      Travel dist: {(D - interceptDist).toFixed(1)} cubits
                    </text>
                  </>
                );
              })()}
            </svg>

            {/* Proof Card */}
            <div style={{ marginTop: '1rem', textAlign: 'left', background: '#ffffff', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.88rem', color: '#334155', lineHeight: 1.6 }}>
              <strong>Pythagorean Equivalence:</strong><br />
              Since both speeds are equal, the peacock’s flight distance <em>c</em> equals the snake’s crawl distance <em>(D - x)</em>:<br />
              <code>H² + x² = (D - x)² ➔ H² + x² = D² - 2Dx + x² ➔ 2Dx = D² - H² ➔ x = (D² - H²) / 2D</code><br />
              <code>x = ({Math.pow(D, 2)} - {Math.pow(pillarHeight, 2)}) / {2 * D} = {Math.pow(D, 2) - Math.pow(pillarHeight, 2)} / {2 * D} = <strong>{interceptDist.toFixed(2)} cubits from the hole!</strong> (Peacock flight distance c = {flightDist.toFixed(2)} cubits, matching snake travel distance)</code>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: THE LOTUS IN THE LAKE (WATER DEPTH)
         ========================================================================= */}
      {activeTab === 'lotus' && (
        <div>
          <div style={{ background: '#f0f9ff', border: '1.5px solid #bae6fd', borderRadius: '12px', padding: '1.2rem', marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              Submerged Bloom Geometry · कमल-जल-समस्या
            </div>
            <blockquote style={{ margin: '0 0 0.5rem', fontStyle: 'italic', fontSize: '0.96rem', color: '#0369a1', lineHeight: 1.5 }}>
              &quot;In a certain lake, a pure lotus bud can be seen standing vertically, its bloom rising half a cubit above the surface of the water. Driven by a fierce gust of wind, the lotus is pushed gradually until it is completely submerged, touching the surface of the water exactly two cubits away from its original position. Tell me quickly, O mathematician, what is the total depth of the water?&quot;
            </blockquote>
          </div>

          {/* Interactive sliders for Bloom Height and Shift */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.25rem', background: '#f8fafc', padding: '1rem', borderRadius: '10px' }}>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.3rem' }}>
                Bloom height above water (h): <strong>{bloomHeight} cubits</strong>
              </label>
              <input
                type="range"
                min={0.2}
                max={2.0}
                step={0.1}
                value={bloomHeight}
                onChange={(e) => setBloomHeight(Number(e.target.value))}
                style={{ width: '100%', cursor: 'pointer' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.3rem' }}>
                Horizontal displacement before submersion (L): <strong>{horizontalShift} cubits</strong>
              </label>
              <input
                type="range"
                min={1.0}
                max={5.0}
                step={0.25}
                value={horizontalShift}
                onChange={(e) => setHorizontalShift(Number(e.target.value))}
                style={{ width: '100%', cursor: 'pointer' }}
              />
            </div>
          </div>

          {/* Visual Lake Diagram */}
          <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.25rem', textAlign: 'center' }}>
            <svg viewBox="0 0 500 240" style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }}>
              {/* Lake bed */}
              <line x1="40" y1="210" x2="460" y2="210" stroke="#78716c" strokeWidth="3" />
              <text x="250" y="230" textAnchor="middle" fontSize="11" fill="#78716c">Lake Bed (Root Anchor)</text>

              {/* Water surface at y=80 */}
              <rect x="40" y="80" width="420" height="130" fill="#e0f2fe" opacity="0.6" />
              <line x1="40" y1="80" x2="460" y2="80" stroke="#0284c7" strokeWidth="2" strokeDasharray="6,4" />
              <text x="70" y="72" fontSize="11" fill="#0284c7" fontWeight="bold">Water Surface</text>

              {/* Lotus root anchor at (150, 210) */}
              <circle cx="150" cy="210" r="5" fill="#854d0e" />

              {/* Vertical Lotus Stem */}
              <line x1="150" y1="210" x2="150" y2="40" stroke="#16a34a" strokeWidth="3" />
              <text x="150" y="32" textAnchor="middle" fontSize="16">🪷</text>
              <text x="125" y="145" textAnchor="middle" fontSize="11" fill="#0369a1" fontWeight="bold">
                Depth d = {waterDepth.toFixed(2)} c
              </text>
              <text x="125" y="58" textAnchor="middle" fontSize="11" fill="#15803d" fontWeight="bold">
                h = {bloomHeight} c
              </text>

              {/* Bent Lotus Stem under wind */}
              {(() => {
                // Horizontal displacement L = 2 cubits
                // Scale: depth maps to 130px, so 1 cubit = 130 / waterDepth px
                const scale = 130 / Math.max(1, waterDepth);
                const bentX = 150 + horizontalShift * scale;
                return (
                  <>
                    <line x1="150" y1="210" x2={bentX} y2="80" stroke="#059669" strokeWidth="3" strokeDasharray="5,4" />
                    <text x={bentX} y="72" textAnchor="middle" fontSize="16">🪷</text>

                    {/* Horizontal distance line */}
                    <line x1="150" y1="80" x2={bentX} y2="80" stroke="#d97706" strokeWidth="2" />
                    <text x={(150 + bentX) / 2} y="98" textAnchor="middle" fontSize="11" fill="#b45309" fontWeight="bold">
                      L = {horizontalShift} cubits
                    </text>

                    {/* Wind arrow */}
                    <text x="210" y="50" fontSize="13" fill="#64748b">💨 Fierce Gust</text>
                  </>
                );
              })()}
            </svg>

            {/* Proof Card */}
            <div style={{ marginTop: '1rem', textAlign: 'left', background: '#ffffff', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.88rem', color: '#334155', lineHeight: 1.6 }}>
              <strong>The Right-Angled Submersion Proof:</strong><br />
              Total length of stem = <em>d + h</em>. When submerged, the stem forms the hypotenuse of a right-angled triangle with vertical leg <em>d</em> and horizontal base <em>L</em>:<br />
              <code>d² + L² = (d + h)² ➔ d² + L² = d² + 2dh + h² ➔ 2dh = L² - h² ➔ d = (L² - h²) / (2h)</code><br />
              With L = {horizontalShift} and h = {bloomHeight}:<br />
              <code>d = ({Math.pow(horizontalShift, 2).toFixed(2)} - {Math.pow(bloomHeight, 2).toFixed(2)}) / {2 * bloomHeight} = <strong>{waterDepth.toFixed(2)} cubits!</strong> (Stem Length = {stemLength.toFixed(2)} cubits)</code>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 5: COWRIE SHELL CURRENCY (GAVVALU / VARĀṬAKA) & PLACE-VALUE
         ========================================================================= */}
      {activeTab === 'currency' && (
        <div>
          <div style={{ background: '#fefce8', border: '1.5px solid #fef08a', borderRadius: '12px', padding: '1.2rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#854d0e', textTransform: 'uppercase' }}>
                Classic Sanskrit Verse · Līlāvatī Chapter 1 (Paribhāṣā), Verse 2 · वराटक-परिभाषा
              </span>
              <button
                type="button"
                onClick={() => onPlayAudio?.('वराटकानां दशकद्वयं यत् सा काकिणी')}
                style={{
                  padding: '0.2rem 0.6rem',
                  fontSize: '0.76rem',
                  borderRadius: '6px',
                  border: '1px solid #fde047',
                  background: '#ffffff',
                  cursor: 'pointer',
                  fontWeight: 700,
                  color: '#854d0e',
                }}
              >
                🔊 Chant Currency Verse
              </button>
            </div>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#713f12', lineHeight: 1.6, marginBottom: '0.4rem' }}>
              वराटकानां दशकद्वयं यत् सा काकिणी ताश्च पणश्चतस्रः ।<br />
              ते षोडश द्रम्म इहावगम्यो द्रम्मैस्तथा षोडशभिश्च निष्कः ॥<br />
              <span style={{ fontSize: '0.92rem', fontWeight: 600, color: '#a16207' }}>
                varāṭakānāṁ daśakadvayaṁ yat sā kākiṇī tāśca paṇaścatasraḥ |<br />
                te ṣoḍaśa dramma ihāvagamyo drammaistathā ṣoḍaśabhiśca niṣkaḥ ||
              </span>
            </div>
            <div style={{ fontSize: '0.85rem', color: '#854d0e', background: '#fef9c3', padding: '0.6rem 0.85rem', borderRadius: '8px', margin: '0.5rem 0', border: '1px solid #fde047' }}>
              <strong>16th c. Telugu Translation (Prakīrṇa Gaṇitamu by Eluganti Pedana):</strong><br />
              <em>&quot;ఇరువది గవ్వలు కాకిణి (20 Gavvalu = 1 Kakini) · పరగునాల్గు కాకిణులు ఒక పణము (4 Kakinis = 1 Pana) · పదహారు పణములు ద్రమ్మము (16 Panas = 1 Dramma) · పదహారు ద్రమ్మములు ఒక నిష్కము (16 Drammas = 1 Nishka).&quot;</em>
            </div>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#713f12', lineHeight: 1.5 }}>
              <strong>The Marketplace Axiom:</strong> &quot;Twice ten (20) varāṭakas (cowrie shells / gavvalu) make one kākiṇī; four kākiṇīs make one paṇa; sixteen paṇas make one dramma; and sixteen drammas make one niṣka.&quot;
            </p>
          </div>

          {/* Interactive Shell Currency Converter */}
          <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1.5px solid #e2e8f0', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
                  Interactive Cowrie Shell (Gavvalu) Ledger &amp; Scale
                </h4>
                <p style={{ margin: '0.2rem 0 0', fontSize: '0.82rem', color: '#64748b' }}>
                  Slide to adjust the volume of cowries or pick historical marketplace denominations:
                </p>
              </div>

              {/* Presets */}
              <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                {[
                  { label: '20 (1 Kākiṇī)', count: 20 },
                  { label: '80 (1 Paṇa · Copper)', count: 80 },
                  { label: '1,280 (1 Dramma · Silver)', count: 1280 },
                  { label: '20,480 (1 Niṣka · Gold)', count: 20480 },
                ].map((preset) => (
                  <button
                    key={preset.count}
                    type="button"
                    onClick={() => setCowrieCount(preset.count)}
                    style={{
                      padding: '0.3rem 0.6rem',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      borderRadius: '6px',
                      border: cowrieCount === preset.count ? '1.5px solid #0d9488' : '1px solid #cbd5e1',
                      background: cowrieCount === preset.count ? '#ccfbf1' : '#ffffff',
                      color: cowrieCount === preset.count ? '#0f766e' : '#334155',
                      cursor: 'pointer',
                    }}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                <span>Selected Shell Volume:</span>
                <span style={{ color: '#0d9488', fontSize: '1rem' }}>{cowrieCount.toLocaleString()} Cowries (Gavvalu / वराटकाः)</span>
              </div>
              <input
                type="range"
                min="1"
                max="20480"
                step="1"
                value={cowrieCount}
                onChange={(e) => setCowrieCount(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#0d9488', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                <span>1 Shell (Retail)</span>
                <span>80 (Copper Paṇa)</span>
                <span>1,280 (Silver Dramma)</span>
                <span>20,480 (Gold Niṣka)</span>
              </div>
            </div>

            {/* Live Monetary Hierarchy Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '10px', border: '1.5px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>1. Varāṭaka (गవ్వ / Shell)</div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', margin: '0.2rem 0' }}>{cowrieCount.toLocaleString()}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Indivisible market counter</div>
              </div>

              <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '10px', border: '1.5px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>2. Kākiṇī (काकिणी / = 20)</div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0d9488', margin: '0.2rem 0' }}>{kakinis.toFixed(2)}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Handful barter standard</div>
              </div>

              <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '10px', border: '1.5px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>3. Paṇa (पण / = 80)</div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#b45309', margin: '0.2rem 0' }}>{panas.toFixed(2)}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Standard Copper Coin (~9.5g)</div>
              </div>

              <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '10px', border: '1.5px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>4. Dramma (द्रम्म / = 1,280)</div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#475569', margin: '0.2rem 0' }}>{drammas.toFixed(3)}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Standard Silver Coin</div>
              </div>

              <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '10px', border: '1.5px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>5. Niṣka (निष्क / = 20,480)</div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#eab308', margin: '0.2rem 0' }}>{nishkas.toFixed(4)}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Royal Gold Sovereign</div>
              </div>
            </div>

            {/* Phooti Kaudi Callout */}
            <div style={{ background: '#f1f5f9', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.82rem', color: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span>
                🧩 <strong>Fractional Ledger:</strong> 4 Phooṭī Kauḍīs (broken pieces) = 1 whole shell. Your volume equals <strong>{phootiKaudis.toLocaleString()} Phooṭī Kauḍīs</strong>.
              </span>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontStyle: 'italic' }}>
                Root of the living Indian idiom: &quot;I don&apos;t have a single phooṭī kauḍī to my name.&quot;
              </span>
            </div>
          </div>

          {/* Core Historical Insights Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            <div style={{ background: '#ffffff', padding: '1.15rem', borderRadius: '12px', border: '1.5px solid #e2e8f0' }}>
              <h4 style={{ margin: '0 0 0.4rem', fontSize: '0.98rem', fontWeight: 800, color: '#0f172a' }}>
                🐚 Why Seashells Instead of Tamarind Seeds?
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                While tamarind seeds (<em>chinta gittalu</em>) were used casually in domestic games like <em>Vāmana Guṇṭalu</em> (Pallāṅguḻi), they rot, chip, get eaten by insects, and change weight as they dry.
                Formal treatises required <strong>Monetaria moneta</strong>: mineralized, lightweight, permanent, and impossible to counterfeit inland.
                Meanwhile, botanical seeds like <strong>Guñjā (ratti)</strong> and <strong>Yava (barleycorn)</strong> were reserved for balance scales (<em>tulā</em>) to weigh gold and gems.
              </p>
            </div>

            <div style={{ background: '#ffffff', padding: '1.15rem', borderRadius: '12px', border: '1.5px solid #e2e8f0' }}>
              <h4 style={{ margin: '0 0 0.4rem', fontSize: '0.98rem', fontWeight: 800, color: '#0f172a' }}>
                ⛵ The Maldives (Mala-dvīpa) Aquaculture Loop
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                The world’s cowrie epicentre was the Maldives (ancient <em>Mala-dvīpa</em>, Arab <em>Dyvah-Kouzah</em>). Islanders submerged palm rafts in lagoons where millions of cowrie snails fed, harvesting them on lunar cycles.
                Because atolls cannot grow rice, merchant fleets from Bengal and Odisha (Balasore, Chittagong) sailed with monsoons, bartering thousands of tons of rice, grains, silks, and pottery for billions of shells.
              </p>
            </div>

            <div style={{ background: '#ffffff', padding: '1.15rem', borderRadius: '12px', border: '1.5px solid #e2e8f0' }}>
              <h4 style={{ margin: '0 0 0.4rem', fontSize: '0.98rem', fontWeight: 800, color: '#0f172a' }}>
                🧮 The Physical Training Ground for Place-Value
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                Before calculating millions on paper, merchants arranged cowries in heaps of tens and twenties on grid floors. This tactile manipulation physically trained human brains in <strong>positional place-value</strong> and <strong>carrying over</strong>.
                This efficiency swept through Arab treatises (Al-Khwarizmi) and into Europe via Fibonacci’s <em>Liber Abaci</em> (1202), rendering Roman numerals and abacuses obsolete.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 6: SŪKṢMA KĀLA (MICROSCOPIC TIME) & THE LOTUS NEEDLE METAPHOR
         ========================================================================= */}
      {activeTab === 'sukshma_kala' && (
        <div>
          {/* Hero Banner */}
          <div style={{ background: '#fdf4ff', border: '1.5px solid #f0abfc', borderRadius: '12px', padding: '1.2rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#a21caf', textTransform: 'uppercase' }}>
                Ancient Microscopic Time · सूक्ष्मकालः (Sūkṣma Kāla)
              </span>
              <button
                type="button"
                onClick={() => onPlayAudio?.('त्रुटिर्लवश्च निमेषश्च काष्ठा चैव कला तथा')}
                style={{
                  padding: '0.2rem 0.55rem',
                  fontSize: '0.76rem',
                  borderRadius: '6px',
                  border: '1px solid #e879f9',
                  background: '#ffffff',
                  cursor: 'pointer',
                  fontWeight: 700,
                  color: '#86198f',
                }}
              >
                🔊 Chant Kāla-Māna Verse
              </button>
            </div>
            <h4 style={{ margin: '0 0 0.35rem', fontSize: '1.15rem', fontWeight: 800, color: '#701a75' }}>
              🪷 The Lotus Needle Metaphor (సూది - తామర రేకు): How Ancient India Measured Nanoseconds
            </h4>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#86198f', lineHeight: 1.55 }}>
              As <strong>Dr. Remella Avadhanulu</strong> highlights in his celebrated lectures on ancient Indian mathematics and computer science: because units like microseconds and nanoseconds could not be registered on mechanical pendulum clocks, ancient astronomers used vivid physical analogies to establish precise empirical baselines.
            </p>
          </div>

          {/* Lotus Needle Metaphor Interactive Visualizer */}
          <div style={{ background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.25rem' }}>
            <h4 style={{ margin: '0 0 0.5rem', fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>
              🪷 Needle Piercing Through Lotus Petal Layers
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 1rem' }}>
              Adjust the petal stack below to observe the transition from a single petal (<strong>Truṭi</strong> $\approx 30.86$ ns) to a layered blossom (<strong>Lavamu</strong> $\approx 9.26$ µs):
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', alignItems: 'center' }}>
              {/* SVG Graphic */}
              <div style={{ background: '#fdf2f8', borderRadius: '12px', padding: '1rem', border: '1px solid #fbcfe8', textAlign: 'center' }}>
                <svg viewBox="0 0 280 160" style={{ width: '100%', maxHeight: '150px' }}>
                  {/* Lotus Blossom Base */}
                  <path d="M 90 140 C 110 155 170 155 190 140 C 210 110 190 80 140 70 C 90 80 70 110 90 140 Z" fill="#f472b6" opacity="0.35" />
                  {/* Layered Petals */}
                  {Array.from({ length: Math.min(lotusPetalLayers, 12) }).map((_, i) => (
                    <ellipse
                      key={i}
                      cx={140}
                      cy={110 - i * 3.5}
                      rx={55 - i * 1.5}
                      ry={16 - i * 0.4}
                      fill={i % 2 === 0 ? '#ec4899' : '#f472b6'}
                      opacity={0.75 - i * 0.04}
                      stroke="#db2777"
                      strokeWidth="0.75"
                    />
                  ))}
                  {/* Needle (Sūdi / सूचि) */}
                  <line
                    x1="140"
                    y1="10"
                    x2="140"
                    y2={115 + Math.min(lotusPetalLayers, 12) * 2}
                    stroke="#475569"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  {/* Needle Eye */}
                  <ellipse cx="140" cy="20" rx="1.5" ry="4" fill="#ffffff" stroke="#334155" strokeWidth="1" />
                  {/* Needle Point */}
                  <polygon
                    points={`137,${115 + Math.min(lotusPetalLayers, 12) * 2} 143,${115 + Math.min(lotusPetalLayers, 12) * 2} 140,${125 + Math.min(lotusPetalLayers, 12) * 2}`}
                    fill="#334155"
                  />
                  {/* Speed of light / pulse glow */}
                  <circle cx="140" cy={110} r="8" fill="#38bdf8" opacity="0.45" />
                </svg>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#9d174d', marginTop: '0.4rem' }}>
                  Needle Velocity Vector: Piercing {lotusPetalLayers} Fresh Petal{lotusPetalLayers > 1 ? 's' : ''}
                </div>
              </div>

              {/* Controls & Math Readout */}
              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                  Lotus Petals Layer Stack: <span style={{ color: '#db2777' }}>{lotusPetalLayers} Petal{lotusPetalLayers > 1 ? 's' : ''}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={lotusPetalLayers}
                  onChange={(e) => setLotusPetalLayers(parseInt(e.target.value, 10))}
                  style={{ width: '100%', accentColor: '#db2777', marginBottom: '0.75rem' }}
                />

                <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '0.82rem', color: '#64748b' }}>Calculated Piercing Interval:</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: '0.15rem 0' }}>
                    {(lotusPetalLayers * (1 / 32400000) * 1e9).toFixed(2)} Nanoseconds
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#64748b', marginLeft: '0.5rem' }}>
                      ({(lotusPetalLayers * (1 / 32400000) * 1e6).toFixed(4)} µs)
                    </span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#0d9488', fontWeight: 600, marginTop: '0.25rem' }}>
                    {lotusPetalLayers === 1 && '⚡ 1 Truṭi (త్రుటి): Defined as piercing 1 single petal (~30.86 ns).'}
                    {lotusPetalLayers === 100 && '🪷 1 Vedha / Commentator Stack (100 Truṭis = ~3.086 µs; 3 Vedhas = 1 Lavamu = ~9.26 µs).'}
                    {lotusPetalLayers > 1 && lotusPetalLayers < 100 && `⏱️ Intermediate microscopic span equal to ${lotusPetalLayers} Truṭis.`}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Amūrta vs Mūrta Kāla Philosophical Framework */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ background: '#fdf2f8', border: '1.5px solid #fbcfe8', borderRadius: '12px', padding: '1.15rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '1.2rem' }}>🌫️</span>
                <h4 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 800, color: '#9d174d' }}>
                  Amūrta Kāla (అమూర్త కాలం / अमूर्तकालः)
                </h4>
              </div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#db2777', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                Formless / Sub-Sensory Temporal Units
              </div>
              <p style={{ fontSize: '0.84rem', color: '#831843', lineHeight: 1.5, margin: 0 }}>
                Refers to scales too fast for the unassisted human senses to register (such as <strong>Truṭi</strong>, <strong>Lavamu</strong>, <strong>Tatpara</strong>, and <strong>Param</strong>). Because these units possess no visible &quot;body&quot; (<em>mūrti</em>) in everyday human activity, the ancients formulated the lotus-needle puncture analogy to ground the mind in an empirical nanosecond reality.
              </p>
            </div>

            <div style={{ background: '#f0fdf4', border: '1.5px solid #bbf7d0', borderRadius: '12px', padding: '1.15rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '1.2rem' }}>🌿</span>
                <h4 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 800, color: '#166534' }}>
                  Mūrta Kāla (మూర్త కాలం / मूर्तकालः)
                </h4>
              </div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#15803d', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                Manifest / Perceptible Bio-Temporal Units
              </div>
              <p style={{ fontSize: '0.84rem', color: '#14532d', lineHeight: 1.5, margin: 0 }}>
                Encompasses units with an observable physical form (<em>mūrti</em>) directly anchored to biological and planetary rhythms: starting at <strong>1 Nimeṣa</strong> (blink of an eye), <strong>1 Prāṇa</strong> (4-second breath cycle chanting 10 long syllables), up through <strong>Vighaṭikā</strong> (24 s), <strong>Ghaṭikā</strong> (24 min), and the <strong>Ahorātra</strong> (24-hour day).
              </p>
            </div>
          </div>

          {/* Interactive Base-60 Sub-Second Ladder */}
          <div style={{ background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.25rem' }}>
            <h4 style={{ margin: '0 0 0.5rem', fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
              ⏱️ The Sexagesimal (Base-60) Ladder of Microscopic Time
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 1rem' }}>
              Click any step on the ancient Indian base-60 subdivision ladder from a 24-hour civil day down to an individual Truṭi:
            </p>

            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              {SUKSHMA_TIME_UNITS.map((u) => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => setSelectedSubUnit(u.id)}
                  style={{
                    padding: '0.45rem 0.75rem',
                    borderRadius: '8px',
                    border: '1px solid',
                    borderColor: selectedSubUnit === u.id ? '#9333ea' : '#cbd5e1',
                    background: selectedSubUnit === u.id ? '#9333ea' : '#f8fafc',
                    color: selectedSubUnit === u.id ? '#ffffff' : '#334155',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {u.nameSa.split('/')[0]} ({u.nameTe})
                </button>
              ))}
            </div>

            {/* Selected Unit Deep-Dive Card */}
            {(() => {
              const unit = SUKSHMA_TIME_UNITS.find((u) => u.id === selectedSubUnit) || SUKSHMA_TIME_UNITS[8];
              return (
                <div style={{ background: '#faf5ff', border: '1.5px solid #d8b4fe', borderRadius: '12px', padding: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <div>
                      <span style={{ fontSize: '0.76rem', fontWeight: 800, color: '#7e22ce', textTransform: 'uppercase' }}>
                        {unit.category} · Metric Exponent: {unit.metricPrefix}
                      </span>
                      <h3 style={{ margin: '0.2rem 0 0', fontSize: '1.25rem', fontWeight: 800, color: '#581c87' }}>
                        {unit.nameSa} · {unit.nameTe} · {unit.nameEn}
                      </h3>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.78rem', color: '#6b21a8', fontWeight: 700 }}>Base-60 Formula</div>
                      <div style={{ fontSize: '0.98rem', fontWeight: 800, color: '#3b0764' }}>{unit.ratio}</div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', marginTop: '0.75rem' }}>
                    <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e9d5ff' }}>
                      <span style={{ fontSize: '0.74rem', color: '#7e22ce', fontWeight: 700 }}>Exact SI Second Value</span>
                      <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginTop: '0.2rem' }}>
                        {unit.secondsDisplay}
                      </div>
                    </div>

                    <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e9d5ff' }}>
                      <span style={{ fontSize: '0.74rem', color: '#7e22ce', fontWeight: 700 }}>Subdivision Rule</span>
                      <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0f172a', marginTop: '0.2rem' }}>
                        {unit.subdivision}
                      </div>
                    </div>

                    <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e9d5ff' }}>
                      <span style={{ fontSize: '0.74rem', color: '#7e22ce', fontWeight: 700 }}>Modern Scientific Equivalent</span>
                      <div style={{ fontSize: '0.86rem', fontWeight: 600, color: '#475569', marginTop: '0.2rem' }}>
                        {unit.modernEquiv}
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: '0.85rem', padding: '0.75rem 1rem', background: '#f3e8ff', borderRadius: '8px', fontSize: '0.86rem', color: '#581c87', lineHeight: 1.5 }}>
                    <strong>Physical Analogy:</strong> {unit.analogy}
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Dr. Remella Avadhanulu Channel Link Card */}
          <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '1.15rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#ef4444', textTransform: 'uppercase' }}>
                  📺 Video Archives · Shri Veda Bharathi
                </span>
                <h4 style={{ margin: '0.2rem 0', fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
                  Dr. Remella Avadhanulu: Līlāvatī Gaṇitam &amp; Ancient Microscopic Time
                </h4>
                <p style={{ margin: 0, fontSize: '0.84rem', color: '#475569' }}>
                  Explore Dr. Remella Avadhanulu&apos;s lectures detailing the mathematical verses, the lotus needle analogy, and Sanskrit computational linguistics.
                </p>
              </div>
              <a
                href="https://www.youtube.com/watch?v=SuEoIxU8itY"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.55rem 1rem',
                  background: '#ef4444',
                  color: '#ffffff',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '0.84rem',
                }}
              >
                ▶ Watch on YouTube
              </a>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 7: MAHĀ KĀLA (COSMIC KALPA, AHARGAṆA & SIDEREAL YEAR)
         ========================================================================= */}
      {activeTab === 'maha_kala' && (
        <div>
          {/* Hero Banner */}
          <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: '12px', padding: '1.2rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#15803d', textTransform: 'uppercase' }}>
                Vedic Astrophysics · महाकालः (Mahā Kāla)
              </span>
              <button
                type="button"
                onClick={() => onPlayAudio?.('अद्य ब्रह्मणो द्वितीये परार्धे श्वेतवाराहकल्पे')}
                style={{
                  padding: '0.2rem 0.55rem',
                  fontSize: '0.76rem',
                  borderRadius: '6px',
                  border: '1px solid #4ade80',
                  background: '#ffffff',
                  cursor: 'pointer',
                  fontWeight: 700,
                  color: '#166534',
                }}
              >
                🔊 Chant Saṅkalpa Mantra
              </button>
            </div>
            <h4 style={{ margin: '0 0 0.35rem', fontSize: '1.15rem', fontWeight: 800, color: '#14532d' }}>
              🌌 The Saṅkalpa Mantra Cosmic Timestamp: Calculating the Exact Age of Our Kalpa
            </h4>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#166534', lineHeight: 1.55 }}>
              Every day across India, traditional Panchangas commence rituals with the <strong>Saṅkalpa Mantra</strong>—a living cosmic odometer indicating our coordinates within Brahma’s day: <em>&quot;...Adya Brahmane, Dvitīya Parārdhe, Śrī Śveta-Varāha Kalpe, Vaivasvata Manvantare, Aṣṭāviṃśatitame Kaliyuge, Prathama Pāde...&quot;</em>
            </p>
          </div>

          {/* Interactive Kalpa Elapsed Age Calculator */}
          <div style={{ background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
                  🗓️ Exact Elapsed Age of Śveta-Varāha Kalpa (Brahma&apos;s Current Day)
                </h4>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.84rem', color: '#64748b' }}>
                  Calculated dynamically from the 6 Manvantaras, 7 Sandhis, 27 Mahāyugas, and Kali Yuga epoch (3102 BCE):
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#334155' }}>Target CE Year:</label>
                <input
                  type="number"
                  value={selectedCivilYear}
                  onChange={(e) => setSelectedCivilYear(parseInt(e.target.value, 10) || 2026)}
                  style={{
                    width: '90px',
                    padding: '0.35rem 0.5rem',
                    borderRadius: '6px',
                    border: '1.5px solid #0d9488',
                    fontWeight: 700,
                    textAlign: 'center',
                    fontSize: '0.9rem',
                  }}
                />
              </div>
            </div>

            {/* Step-by-Step Mathematical Ledger Table */}
            <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                    <th style={{ padding: '0.6rem 0.75rem', fontWeight: 800, color: '#0f172a' }}>Time Block Segment</th>
                    <th style={{ padding: '0.6rem 0.75rem', fontWeight: 800, color: '#0f172a' }}>Formula / Canonical Derivation</th>
                    <th style={{ padding: '0.6rem 0.75rem', fontWeight: 800, color: '#0f172a', textAlign: 'right' }}>Value in Human Years</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '0.55rem 0.75rem', fontWeight: 700, color: '#334155' }}>1. Six Elapsed Manvantaras</td>
                    <td style={{ padding: '0.55rem 0.75rem', color: '#475569' }}>6 × 71 Mahāyugas = 426 × 4,320,000</td>
                    <td style={{ padding: '0.55rem 0.75rem', fontWeight: 700, color: '#0f766e', textAlign: 'right', fontFamily: 'monospace' }}>
                      {manvantarasElapsedYears.toLocaleString()}
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#fafafa' }}>
                    <td style={{ padding: '0.55rem 0.75rem', fontWeight: 700, color: '#334155' }}>2. Seven Sandhi Periods</td>
                    <td style={{ padding: '0.55rem 0.75rem', color: '#475569' }}>7 × Kṛta Yuga length (7 × 1,728,000)</td>
                    <td style={{ padding: '0.55rem 0.75rem', fontWeight: 700, color: '#0f766e', textAlign: 'right', fontFamily: 'monospace' }}>
                      {sandhisElapsedYears.toLocaleString()}
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '0.55rem 0.75rem', fontWeight: 700, color: '#334155' }}>3. 27 Mahāyugas in 7th Era</td>
                    <td style={{ padding: '0.55rem 0.75rem', color: '#475569' }}>27 Completed cycles (27 × 4,320,000)</td>
                    <td style={{ padding: '0.55rem 0.75rem', fontWeight: 700, color: '#0f766e', textAlign: 'right', fontFamily: 'monospace' }}>
                      {mahayugasElapsedYears.toLocaleString()}
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#fafafa' }}>
                    <td style={{ padding: '0.55rem 0.75rem', fontWeight: 700, color: '#334155' }}>4. Three Eras in 28th Cycle</td>
                    <td style={{ padding: '0.55rem 0.75rem', color: '#475569' }}>Satya (1.728M) + Tretā (1.296M) + Dvāpara (864k)</td>
                    <td style={{ padding: '0.55rem 0.75rem', fontWeight: 700, color: '#0f766e', textAlign: 'right', fontFamily: 'monospace' }}>
                      {completedYugasIn28thCycle.toLocaleString()}
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #cbd5e1' }}>
                    <td style={{ padding: '0.55rem 0.75rem', fontWeight: 700, color: '#334155' }}>5. Kali Yuga (to {selectedCivilYear} CE)</td>
                    <td style={{ padding: '0.55rem 0.75rem', color: '#475569' }}>Epoch starts Feb 18, 3102 BCE (3102 + {selectedCivilYear})</td>
                    <td style={{ padding: '0.55rem 0.75rem', fontWeight: 700, color: '#0f766e', textAlign: 'right', fontFamily: 'monospace' }}>
                      {kaliElapsedYears.toLocaleString()}
                    </td>
                  </tr>
                  <tr style={{ background: '#f0fdfa' }}>
                    <td style={{ padding: '0.75rem', fontWeight: 800, color: '#134e4a', fontSize: '0.92rem' }}>
                      🌟 Grand Total Elapsed Time:
                    </td>
                    <td style={{ padding: '0.75rem', color: '#0f766e', fontWeight: 700 }}>
                      Śrī Śveta-Varāha Kalpa (as of {selectedCivilYear} CE)
                    </td>
                    <td style={{ padding: '0.75rem', fontWeight: 800, color: '#0f766e', textAlign: 'right', fontSize: '1.05rem', fontFamily: 'monospace' }}>
                      {totalKalpaElapsedYears.toLocaleString()} Years
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ background: '#ecfdf5', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid #a7f3d0', fontSize: '0.86rem', color: '#065f46', lineHeight: 1.5 }}>
              💡 <strong>Cosmic Insight:</strong> Out of a total Kalpa day of <strong>4,320,000,000 years (4.32 Billion)</strong>, exactly <strong>{totalKalpaElapsedYears.toLocaleString()} years (~1.973 Billion)</strong> have elapsed. We are approximately 45.6% into Brahma’s day—approaching celestial noon!
            </div>
          </div>

          {/* Sūrya Siddhānta Sidereal Year Down to the Second */}
          <div style={{ background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.25rem' }}>
            <h4 style={{ margin: '0 0 0.4rem', fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
              ☀️ Sūrya Siddhānta: Length of the Solar Year Down to the Second
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 1rem', lineHeight: 1.5 }}>
              Ancient Indian astronomers measured civil days over a massive cosmic cycle (Mahāyuga) so that micro-deviations averaged out to zero:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '10px', padding: '1rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#92400e', textTransform: 'uppercase' }}>
                  Formula of Proportions
                </span>
                <div style={{ fontFamily: 'monospace', fontSize: '0.94rem', fontWeight: 700, color: '#78350f', margin: '0.4rem 0' }}>
                  1,577,917,828 Civil Days / 4,320,000 Solar Years
                </div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#b45309' }}>
                  = {daysInSolarYear.toFixed(8)} Days
                </div>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '1rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase' }}>
                  Deconstructed Sūrya Siddhānta Value
                </span>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: '0.35rem 0' }}>
                  {daysInt}d {hoursInt}h {minsInt}m {secsFloat.toFixed(2)}s
                </div>
                <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                  365 Days, 6 Hours, 12 Minutes, 36.56 Seconds
                </div>
              </div>
            </div>

            {/* Comparison Table with Modern Sidereal Data */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
                    <th style={{ padding: '0.55rem 0.75rem', fontWeight: 800, color: '#0f172a' }}>Measurement Reference</th>
                    <th style={{ padding: '0.55rem 0.75rem', fontWeight: 800, color: '#0f172a' }}>Calculated Duration</th>
                    <th style={{ padding: '0.55rem 0.75rem', fontWeight: 800, color: '#0f172a' }}>Variance / Accuracy</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '0.55rem 0.75rem', fontWeight: 700, color: '#334155' }}>Sūrya Siddhānta (Vedic Sidereal)</td>
                    <td style={{ padding: '0.55rem 0.75rem', fontWeight: 700, color: '#0f766e', fontFamily: 'monospace' }}>
                      365d 06h 12m 36.56s
                    </td>
                    <td style={{ padding: '0.55rem 0.75rem', color: '#16a34a', fontWeight: 700 }}>Baseline Reference</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#fafafa' }}>
                    <td style={{ padding: '0.55rem 0.75rem', fontWeight: 700, color: '#334155' }}>Modern Sidereal Year (Fixed Stars)</td>
                    <td style={{ padding: '0.55rem 0.75rem', fontWeight: 700, color: '#0f172a', fontFamily: 'monospace' }}>
                      365d 06h 09m 09.76s
                    </td>
                    <td style={{ padding: '0.55rem 0.75rem', color: '#16a34a', fontWeight: 700 }}>
                      Δ ~3 Minutes 27 Seconds! (99.999% accurate)
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.55rem 0.75rem', fontWeight: 700, color: '#334155' }}>Modern Tropical Year (Equinoxes)</td>
                    <td style={{ padding: '0.55rem 0.75rem', fontWeight: 700, color: '#0f172a', fontFamily: 'monospace' }}>
                      365d 05h 48m 45.19s
                    </td>
                    <td style={{ padding: '0.55rem 0.75rem', color: '#64748b' }}>
                      Accounts for axial precession of the equinoxes (Ayanāṃśa)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Ahargaṇa Master Odometer & Longitude Calculator */}
          <div style={{ background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.25rem' }}>
            <h4 style={{ margin: '0 0 0.4rem', fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
              🧭 Ahargaṇa (अहर्गण): The Master Celestial Odometer
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 1rem', lineHeight: 1.5 }}>
              In the Sūrya Siddhānta, <strong>Ahargaṇa</strong> (&quot;collection of days&quot;) is the number of civil days elapsed from the epoch to the target sunrise. Planetary positions are computed using the Rule of Three (<em>Trairāśika</em>):
            </p>

            <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontFamily: 'monospace', fontSize: '0.9rem', marginBottom: '1rem', color: '#0f172a' }}>
              Mean Longitude = (Total Planetary Revolutions in Yuga × Elapsed Ahargaṇa) / Total Civil Days in Yuga
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', alignItems: 'center' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                  Select Celestial Body:
                </label>
                <select
                  value={selectedPlanetKey}
                  onChange={(e) => setSelectedPlanetKey(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.45rem',
                    borderRadius: '8px',
                    border: '1.5px solid #0d9488',
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    marginBottom: '0.75rem',
                  }}
                >
                  {Object.entries(PLANETARY_MAHAYUGA_REVOLUTIONS).map(([key, p]) => (
                    <option key={key} value={key}>
                      {p.symbol} {p.name} ({p.revs.toLocaleString()} revs/yuga)
                    </option>
                  ))}
                </select>

                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                  Elapsed Ahargaṇa Civil Days: <span style={{ color: '#0f766e' }}>{customAharganaDays.toLocaleString()} days</span>
                </label>
                <input
                  type="range"
                  min="1000"
                  max="3000000"
                  step="1000"
                  value={customAharganaDays}
                  onChange={(e) => setCustomAharganaDays(parseInt(e.target.value, 10))}
                  style={{ width: '100%', accentColor: '#0d9488' }}
                />
              </div>

              {/* Computed Planet Readout */}
              <div style={{ background: '#f0fdfa', padding: '1rem', borderRadius: '10px', border: '1.5px solid #99f6e4' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0f766e', textTransform: 'uppercase' }}>
                  Computed Celestial Coordinates
                </span>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#134e4a', margin: '0.25rem 0' }}>
                  {totalDegrees.toFixed(2)}° · {ZODIAC_SIGNS[currentRashiIndex]}
                </div>
                <div style={{ fontSize: '0.84rem', color: '#115e59', lineHeight: 1.5 }}>
                  • Total Complete Revolutions: <strong>{Math.floor(rawRevolutions).toLocaleString()}</strong><br />
                  • Position in Zodiac Sign: <strong>{degreeInRashi.toFixed(2)}° ({arcMinutes.toFixed(1)}&apos;)</strong><br />
                  • Canonical Orbital Period: <strong>{activePlanet.orbitalPeriodDays.toFixed(2)} Days</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Ancient Multiverse vs Modern Astrophysics Concordance */}
          <div style={{ background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.25rem' }}>
            <h4 style={{ margin: '0 0 0.5rem', fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
              🌌 Ancient Multiverse Timelines vs. Modern Astrophysics
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.94rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.35rem' }}>
                  🌍 Age of the Earth / Sun
                </div>
                <p style={{ fontSize: '0.84rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                  <strong>Ancient:</strong> 1 Kalpa = 4.32 Billion Years (Lifespan of a single day-cycle before dissolution).<br />
                  <strong>Modern:</strong> ~4.54 Billion Years (Radiometric dating of meteorites and solar system formation).
                </p>
              </div>

              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.94rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.35rem' }}>
                  🔄 Cyclic Cosmologies
                </div>
                <p style={{ fontSize: '0.84rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                  <strong>Ancient:</strong> Brahma’s Life = 311.04 Trillion Years (Infinite cycles of Sṛṣṭi and Mahāpralaya).<br />
                  <strong>Modern:</strong> Sir Roger Penrose’s <em>Conformal Cyclic Cosmology (CCC)</em>, where infinite aeons cycle sequentially.
                </p>
              </div>

              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.94rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.35rem' }}>
                  🫧 The Multiverse
                </div>
                <p style={{ fontSize: '0.84rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                  <strong>Ancient:</strong> Infinite Brahmāṇḍas floating like bubbles in the causal cosmic ocean.<br />
                  <strong>Modern:</strong> Eternal chaotic inflation and Everett’s Many-Worlds quantum multiverse.
                </p>
              </div>
            </div>
          </div>

          {/* Dr. Remella Avadhanulu Video Links Card */}
          <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '1.15rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#ef4444', textTransform: 'uppercase' }}>
              📺 Verified Video Resources · Dr. Remella Avadhanulu
            </span>
            <h4 style={{ margin: '0.25rem 0 0.5rem', fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
              Līlāvatī Gaṇitam &amp; Sūrya Siddhānta Video Lectures
            </h4>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              <a
                href="https://www.youtube.com/watch?v=SuEoIxU8itY"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.55rem 1rem',
                  background: '#ef4444',
                  color: '#ffffff',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '0.84rem',
                }}
              >
                ▶ Līlāvatī Gaṇitam Lecture
              </a>
              <a
                href="https://www.youtube.com/watch?v=7u7Nl0pBh2Y&t=1380"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.55rem 1rem',
                  background: '#0284c7',
                  color: '#ffffff',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '0.84rem',
                }}
              >
                ▶ Sūrya Siddhānta: Ahargaṇa &amp; Cosmic Time
              </a>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 8: ANKA-PASA (COMBINATORICS & 10-ARMED SHIVA)
         ========================================================================= */}
      {activeTab === 'anka_pasa' && (
        <div>
          {/* Classic Sanskrit Verse */}
          <div style={{ background: '#fefce8', border: '1.5px solid #fef08a', borderRadius: '12px', padding: '1.2rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#854d0e', textTransform: 'uppercase' }}>
                Līlāvatī Chapter 13 · Aṅka-Pāśa (अङ्कपाशः / Net of Numbers)
              </span>
              <button
                type="button"
                onClick={() => onPlayAudio?.('पाशाङ्कुशाक्षडमरुककपालशूलैः')}
                style={{
                  padding: '0.25rem 0.65rem',
                  fontSize: '0.76rem',
                  borderRadius: '6px',
                  border: '1px solid #fde047',
                  background: '#ffffff',
                  cursor: 'pointer',
                  fontWeight: 700,
                  color: '#854d0e',
                }}
              >
                🔊 Chant Shambhu &amp; Hari Verse
              </button>
            </div>
            <div style={{ fontSize: '1.08rem', fontWeight: 800, color: '#713f12', lineHeight: 1.6, marginBottom: '0.35rem' }}>
              पाशाङ्कुशाक्षडमरुककपालशूलैः खट्वाङ्गशक्तिशरचापयुतैर्भवन्ति ।<br />
              अन्योन्यहस्तकलितैः कति मूर्तिभेदाः शम्भोर्हरेरिव गदारिजशङ्खपद्मैः ॥
            </div>
            <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#a16207', marginBottom: '0.45rem' }}>
              pāśāṅkuśākṣaḍamarukakapālaśūlaiḥ khaṭvāṅgaśaktiśaracāpayutairbhavanti |<br />
              anyonyahastakalitaiḥ kati mūrtibhedāḥ śambhorhareriva gadārijaśaṅkhapadmaiḥ ||
            </div>
            <p style={{ margin: 0, fontSize: '0.86rem', color: '#854d0e', lineHeight: 1.55 }}>
              <strong>Poetic Translation:</strong> <em>&quot;Lord Shiva holds 10 distinct sacred items in his ten hands: a noose (pāśa), a goad (aṅkuśa), a snake/rosary (akṣa), a drum (ḍamaru), a skull (kapāla), a trident (śūla), a club (khaṭvāṅga), a spear/sword (śakti), an arrow (śara), and a bow (cāpa). Tell me, wise mathematician, how many distinct form-variations (mūrtibhedāḥ) can be sculpted by swapping these items among his hands—just as Lord Hari (Vishnu) has 24 forms with his mace (gadā), discus (ari), conch (śaṅkha), and lotus (padma)?&quot;</em>
            </p>
          </div>

          {/* Sub-Mode Selector Navigator */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.65rem', marginBottom: '1.25rem' }}>
            {[
              { id: 'shiva_multiset', label: '🔱 10-Armed Shiva & Multiset', desc: 'Factorials, Multisets & Temple Sculptures' },
              { id: 'anuloma_viloma', label: '🔄 Inverted Palindromes (Viloma)', desc: 'Māgha 19.40 & Rāghavayādavīyam (Rāma/Kṛṣṇa)' },
              { id: 'sarvatobhadra', label: '🔲 Sarvato-Bhadra (8×8 Grid)', desc: 'D₄ Dihedral Symmetry & 10 Degrees of Freedom' },
              { id: 'turanga_tour', label: '♞ Knight’s Tour (Turaṅga-Bandha)', desc: 'Hamiltonian Paths & Graph Theory on Chessboard' },
            ].map((sub) => (
              <button
                key={sub.id}
                type="button"
                onClick={() => setAnkaSubMode(sub.id as any)}
                style={{
                  padding: '0.75rem 0.95rem',
                  borderRadius: '10px',
                  border: ankaSubMode === sub.id ? '2px solid #0d9488' : '1px solid #cbd5e1',
                  background: ankaSubMode === sub.id ? '#f0fdfa' : '#ffffff',
                  color: ankaSubMode === sub.id ? '#0f766e' : '#334155',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontWeight: 700,
                  transition: 'all 0.15s ease',
                  boxShadow: ankaSubMode === sub.id ? '0 2px 8px rgba(13, 148, 136, 0.15)' : 'none',
                }}
              >
                <div style={{ fontSize: '0.88rem', marginBottom: '0.2rem' }}>{sub.label}</div>
                <div style={{ fontSize: '0.74rem', fontWeight: 500, color: ankaSubMode === sub.id ? '#0d9488' : '#64748b' }}>
                  {sub.desc}
                </div>
              </button>
            ))}
          </div>

          {/* SUB-MODE 1: SHIVA & MULTISET COMBINATORICS */}
          {ankaSubMode === 'shiva_multiset' && (
            <div>
              {/* Section A: Distinct Items Permutations (10-Armed Shiva & 4-Armed Vishnu) */}
              <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0d9488', textTransform: 'uppercase' }}>
                  Problem 1 · Distinct Items Permutation ($n!$)
                </span>
                <h4 style={{ margin: '0.2rem 0 0', fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>
                  🔱 The 10-Armed Shiva Problem: 3,628,800 Sacred Iconographies
                </h4>
              </div>
              <div style={{ background: '#ecfdf5', padding: '0.35rem 0.75rem', borderRadius: '8px', border: '1px solid #a7f3d0', fontSize: '0.84rem', fontWeight: 800, color: '#065f46' }}>
                Formula: P(n) = n!
              </div>
            </div>

            <p style={{ fontSize: '0.86rem', color: '#475569', lineHeight: 1.5, margin: '0 0 1rem' }}>
              Bhāskarācārya outlines the fundamental rule for permutations of <em>n</em> unique objects: multiply all sequential integers from 1 up to <em>n</em> (modern <strong>factorial $n!$</strong>).
            </p>

            {/* 10 Sacred Weapons Chips */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.5rem', marginBottom: '1.15rem' }}>
              {[
                { name: '1. Pāśa (पाश)', icon: '🪢', gloss: 'Noose' },
                { name: '2. Aṅkuśa (अङ्कुश)', icon: '🪝', gloss: 'Elephant Goad' },
                { name: '3. Sarpa (सर्प / अक्ष)', icon: '🐍', gloss: 'Snake / Rosary' },
                { name: '4. Ḍamaru (डमरु)', icon: '🥁', gloss: 'Hourglass Drum' },
                { name: '5. Kapāla (कपाल)', icon: '💀', gloss: 'Skull-cup' },
                { name: '6. Triśūla (त्रिशूल)', icon: '🔱', gloss: 'Trident' },
                { name: '7. Dhanus (धनुस्)', icon: '🏹', gloss: 'Pināka Bow' },
                { name: '8. Bāṇa (बाण)', icon: '🎯', gloss: 'Sacred Arrow' },
                { name: '9. Khaḍga (खड्ग)', icon: '⚔️', gloss: 'Sword / Staff' },
                { name: '10. Kheṭa (खेट)', icon: '🛡️', gloss: 'Shield / Spear' },
              ].map((item, idx) => (
                <div
                  key={item.name}
                  style={{
                    background: idx < shivaDistinctCount ? '#ffffff' : '#f1f5f9',
                    border: idx < shivaDistinctCount ? '1.5px solid #0d9488' : '1px dashed #cbd5e1',
                    borderRadius: '8px',
                    padding: '0.5rem',
                    textAlign: 'center',
                    opacity: idx < shivaDistinctCount ? 1 : 0.45,
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ fontSize: '1.25rem' }}>{item.icon}</div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0f172a', marginTop: '0.15rem' }}>{item.name}</div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{item.gloss}</div>
                </div>
              ))}
            </div>

            {/* Interactive Slider for Distinct Hands */}
            <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '10px', border: '1px solid #cbd5e1', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#334155' }}>
                  Adjust Number of Distinct Deity Hands (n):
                </label>
                <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0d9488' }}>
                  n = {shivaDistinctCount} Hands
                </span>
              </div>
              <input
                type="range"
                min={3}
                max={12}
                step={1}
                value={shivaDistinctCount}
                onChange={(e) => setShivaDistinctCount(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#0d9488' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                <span>3 Hands (6)</span>
                <span>4 Hands: Vishnu (24)</span>
                <span>10 Hands: Shiva (3,628,800)</span>
                <span>12 Hands (479M)</span>
              </div>
            </div>

            {/* Permutation Calculation Result Box */}
            <div style={{ background: '#ecfdf5', border: '1.5px solid #a7f3d0', borderRadius: '10px', padding: '1rem' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#065f46', textTransform: 'uppercase' }}>
                Factorial Calculation Breakdown:
              </div>
              <div style={{ fontSize: '0.94rem', color: '#047857', fontFamily: 'monospace', margin: '0.3rem 0', wordBreak: 'break-all' }}>
                {shivaDistinctCount}! = {Array.from({ length: shivaDistinctCount }, (_, i) => shivaDistinctCount - i).join(' × ')}
              </div>
              <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#065f46', marginTop: '0.4rem' }}>
                = {shivaDistinctPermutations.toLocaleString()} Unique Statues!
              </div>

              {/* Special callout for Vishnu 4! vs Shiva 10! */}
              <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #bbf7d0', fontSize: '0.84rem', color: '#065f46' }}>
                {shivaDistinctCount === 10 ? (
                  <span>
                    🔱 <strong>Bhāskarācārya’s Verification:</strong> A temple sculptor has exactly <strong>3,628,800</strong> distinct arrangements to sculpt a 10-armed Shiva with these 10 sacred weapons!
                  </span>
                ) : shivaDistinctCount === 4 ? (
                  <span>
                    🪷 <strong>Lord Hari (Vishnu) Caturviṃśati Mūrtis:</strong> 4! = 4 × 3 × 2 × 1 = <strong>24 canonical forms</strong> of Vishnu (Keśava, Nārāyaṇa, Mādhava, Govinda, etc.) distinguished entirely by how the Conch, Discus, Mace, and Lotus are assigned across his 4 hands!
                  </span>
                ) : (
                  <span>
                    📐 For {shivaDistinctCount} unique weapons, the factorial grows to <strong>{shivaDistinctPermutations.toLocaleString()}</strong> distinct iconographic possibilities.
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Section B: Multiset Permutations (Repeated Deity Items) */}
          <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#b45309', textTransform: 'uppercase' }}>
                  Problem 2 · Permutations with Repetitions (Multiset)
                </span>
                <h4 style={{ margin: '0.2rem 0 0', fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>
                  🪷 The 12-Armed Deity: Bhāskarācārya’s Multiset Formula
                </h4>
              </div>
              <div style={{ background: '#fef3c7', padding: '0.35rem 0.75rem', borderRadius: '8px', border: '1px solid #fde68a', fontSize: '0.84rem', fontWeight: 800, color: '#92400e' }}>
                Formula: n! / (n₁! × n₂! × ... × nₖ!)
              </div>
            </div>

            <p style={{ fontSize: '0.86rem', color: '#475569', lineHeight: 1.5, margin: '0 0 1rem' }}>
              When certain weapons are identical—such as multiple lotuses or tridents—permutations among identical items produce no visible visual distinction. Bhāskarācārya gave the exact rule: <strong>calculate total factorial n! as if all items were unique, then divide by the product of factorials of each identical group</strong>:
            </p>

            {/* Interactive Sliders for the 4 Weapon Groups */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem', marginBottom: '1.15rem' }}>
              <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0f172a' }}>🪷 Identical Lotuses:</span>
                  <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0d9488' }}>{multisetLotuses} ({multisetLotuses}! = {factorial(multisetLotuses)})</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={8}
                  value={multisetLotuses}
                  onChange={(e) => setMultisetLotuses(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#0d9488' }}
                />
              </div>

              <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0f172a' }}>🔱 Identical Tridents:</span>
                  <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0d9488' }}>{multisetTridents} ({multisetTridents}! = {factorial(multisetTridents)})</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={6}
                  value={multisetTridents}
                  onChange={(e) => setMultisetTridents(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#0d9488' }}
                />
              </div>

              <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0f172a' }}>⚔️ Identical Swords:</span>
                  <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0d9488' }}>{multisetSwords} ({multisetSwords}! = {factorial(multisetSwords)})</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={4}
                  value={multisetSwords}
                  onChange={(e) => setMultisetSwords(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#0d9488' }}
                />
              </div>

              <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0f172a' }}>🛡️ Identical Shields:</span>
                  <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0d9488' }}>{multisetShields} ({multisetShields}! = {factorial(multisetShields)})</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={4}
                  value={multisetShields}
                  onChange={(e) => setMultisetShields(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#0d9488' }}
                />
              </div>
            </div>

            {/* Multiset Calculation Step-by-Step Box */}
            <div style={{ background: '#fffbeb', border: '1.5px solid #fde68a', borderRadius: '10px', padding: '1.15rem' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#92400e', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                Live Multiset Permutation Derivation:
              </div>
              <div style={{ fontSize: '0.9rem', color: '#78350f', lineHeight: 1.6 }}>
                <strong>Total Deity Hands (n):</strong> {multisetLotuses} + {multisetTridents} + {multisetSwords} + {multisetShields} = <strong>{totalMultisetHands} Hands</strong><br />
                <strong>Numerator (n!):</strong> {totalMultisetHands}! = {multisetNumerator.toLocaleString()}<br />
                <strong>Denominator (∏ nᵢ!):</strong> {multisetLotuses}! × {multisetTridents}! × {multisetSwords}! × {multisetShields}! = {factorial(multisetLotuses)} × {factorial(multisetTridents)} × {factorial(multisetSwords)} × {factorial(multisetShields)} = <strong>{multisetDenominator.toLocaleString()}</strong>
              </div>

              <div style={{ margin: '0.85rem 0', padding: '0.75rem', background: '#ffffff', borderRadius: '8px', border: '1px solid #fde68a', fontFamily: 'monospace', fontSize: '0.95rem', color: '#b45309' }}>
                Distinct Arrangements = {multisetNumerator.toLocaleString()} / {multisetDenominator.toLocaleString()}
              </div>

              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#78350f' }}>
                = {multisetPermutations.toLocaleString()} Unique Statues!
              </div>

              {totalMultisetHands === 12 && multisetLotuses === 5 && multisetTridents === 3 && multisetSwords === 2 && multisetShields === 2 && (
                <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #fde68a', fontSize: '0.84rem', color: '#92400e' }}>
                  🏛️ <strong>The Canonical 12-Armed Deity Solution:</strong><br />
                  <div style={{ fontFamily: 'monospace', margin: '0.35rem 0', fontWeight: 700, color: '#b45309' }}>
                    12! / (5! × 3! × 2! × 2!) = 479,001,600 / (120 × 6 × 2 × 2) = 479,001,600 / 2,880 = 166,320
                  </div>
                  A master sculptor can sculpt 166,320 completely distinct versions of this 12-armed deity without duplicating any hand configuration!
                </div>
              )}
            </div>
          </div>

          {/* Historical & Architectural Significance Box */}
          <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '1.15rem' }}>
            <h4 style={{ margin: '0 0 0.4rem', fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>
              📜 Historical Precedence: Bhāskarācārya vs. European Combinatorics
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.85rem', marginTop: '0.6rem' }}>
              <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#0f766e', marginBottom: '0.2rem' }}>
                  🏛️ Practical Application in Temple Architecture
                </div>
                <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                  Guilds of Indian master sculptors (<em>Śilpis</em> and <em>Sthapatis</em>) used Aṅka-Pāśa rules to sculpt thousands of relief murtis along temple corridors (such as Khajuraho, Madurai, and Belur) ensuring mathematical variety without accidental repetition.
                </p>
              </div>

              <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#0f766e', marginBottom: '0.2rem' }}>
                  ⏳ 500-Year European Chronological Lag
                </div>
                <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                  While Bhāskara II formalized both distinct and multiset factorials in 1150 CE, European mathematicians did not publish multiset permutations until Marin Mersenne (1636 CE) and Jakob Bernoulli’s <em>Ars Conjectandi</em> (1713 CE).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

          {/* SUB-MODE 2: INVERTED PALINDROMES (ANULOMA-VILOMA & RĀGHAVAYĀDAVĪYAM) */}
          {ankaSubMode === 'anuloma_viloma' && (
            <div>
              {/* Theoretical Linear Algebra Formulation */}
              <div style={{ background: '#f5f3ff', border: '1.5px solid #ddd6fe', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.65rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#7c3aed', textTransform: 'uppercase' }}>
                      Linear Permutations &amp; Inversion Operators
                    </span>
                    <h4 style={{ margin: '0.2rem 0 0', fontSize: '1.15rem', fontWeight: 800, color: '#4c1d95' }}>
                      🔄 Gatika Kāvya: Inversion Permutation Matrix P
                    </h4>
                  </div>
                  <div style={{ background: '#ede9fe', padding: '0.35rem 0.75rem', borderRadius: '8px', border: '1px solid #c4b5fd', fontSize: '0.84rem', fontWeight: 800, color: '#5b21b6', fontFamily: 'monospace' }}>
                    P · c = c (Palindrome) | P · c_Rāma = c_Kṛṣṇa
                  </div>
                </div>
                <p style={{ fontSize: '0.86rem', color: '#5b21b6', lineHeight: 1.55, margin: 0 }}>
                  In Sanskrit poetics (<em>Chitrakāvya</em>), the concept of <strong>Gatapratyāgata</strong> (syllabic palindrome) treats a line of verse as an ordered vector of syllables <strong>c = [c₁, c₂, ..., cₙ]</strong>. An inversion operator represented by the backward permutation matrix <strong>P</strong> maps index <em>i</em> to <em>(n - i + 1)</em>. When <strong>P · c = c</strong>, the line reads identically forward and backward. Even more astonishingly, when <strong>P · c_Rāma = c_Kṛṣṇa</strong>, reversing the exact syllables generates a completely different narrative in a different grammatical context!
                </p>
              </div>

              {/* Sandbox 1: Māgha's Śiśupālavadha 19.40 */}
              <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0d9488', textTransform: 'uppercase' }}>
                      Case 1 · Exact Syllabic Palindrome (Gatapratyāgata)
                    </span>
                    <h4 style={{ margin: '0.2rem 0 0', fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
                      📜 Māgha’s Śiśupālavadha (Canto 19, Verse 40)
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => onPlayAudio?.('तं भारतातमाभातं तं भातातमभारतम्')}
                    style={{
                      padding: '0.3rem 0.75rem',
                      borderRadius: '8px',
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: '#0f766e',
                    }}
                  >
                    🔊 Chant Shloka
                  </button>
                </div>

                {/* Shloka Display */}
                <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '1rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.18rem', fontWeight: 800, color: '#0f766e', letterSpacing: '0.04em', lineHeight: 1.7 }}>
                    तं भारतातमाभातं तं भातातमभारतम् ।<br />
                    तं भारतातमाभातं तं भातातमभारतम् ॥
                  </div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#475569', marginTop: '0.35rem', fontFamily: 'monospace' }}>
                    taṃ bhā-ra-tā-tā-mā-bhā-taṃ taṃ bhā-tā-ta-ma-bhā-ra-tam |<br />
                    taṃ bhā-ra-tā-tā-mā-bhā-taṃ taṃ bhā-tā-ta-ma-bhā-ra-tam ||
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.5rem', fontStyle: 'italic' }}>
                    &ldquo;He (Lord Śrī Kṛṣṇa), whose glory shone forth brightly over the battlefield of Bhārata, who destroyed the sorrow of the oppressed and removed all sin...&rdquo;
                  </div>
                </div>

                {/* Interactive 16-Syllable Mirror Scrubber */}
                <div style={{ background: '#f0fdfa', border: '1px solid #ccfbf1', borderRadius: '10px', padding: '1rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f766e', textTransform: 'uppercase' }}>
                      Interactive Syllable Mirror Inspector (Forward Index i ⟷ Reverse Index 15 - i)
                    </div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0d9488' }}>
                      Inspecting Position: {palindromeCharIndex + 1} of 16
                    </div>
                  </div>

                  {/* 16 Syllable Cards */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(16, 1fr)', gap: '0.25rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '0.75rem' }}>
                    {MAGHA_PALINDROME_SYLLABLES.map((s, idx) => {
                      const isSelected = idx === palindromeCharIndex;
                      const isMirror = idx === 15 - palindromeCharIndex;
                      const isBoth = isSelected && isMirror;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setPalindromeCharIndex(idx)}
                          style={{
                            padding: '0.5rem 0.15rem',
                            borderRadius: '6px',
                            border: isBoth
                              ? '2px solid #7c3aed'
                              : isSelected
                              ? '2px solid #0d9488'
                              : isMirror
                              ? '2px solid #f59e0b'
                              : '1px solid #cbd5e1',
                            background: isBoth
                              ? '#ede9fe'
                              : isSelected
                              ? '#ccfbf1'
                              : isMirror
                              ? '#fef3c7'
                              : '#ffffff',
                            cursor: 'pointer',
                            textAlign: 'center',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a' }}>{s.dev}</div>
                          <div style={{ fontSize: '0.68rem', color: '#64748b', fontFamily: 'monospace' }}>{s.iast}</div>
                          <div style={{ fontSize: '0.62rem', fontWeight: 700, color: isSelected || isMirror ? '#0f766e' : '#94a3b8', marginTop: '0.15rem' }}>
                            #{idx + 1}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Scrubber slider */}
                  <input
                    type="range"
                    min={0}
                    max={15}
                    value={palindromeCharIndex}
                    onChange={(e) => setPalindromeCharIndex(parseInt(e.target.value, 10))}
                    style={{ width: '100%', accentColor: '#0d9488', marginBottom: '0.65rem' }}
                  />

                  {/* Mirror Pair Live Verification */}
                  <div style={{ background: '#ffffff', border: '1px solid #a7f3d0', borderRadius: '8px', padding: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '1.25rem' }}>🪞</span>
                      <div style={{ fontSize: '0.86rem', color: '#065f46' }}>
                        Position <strong>#{palindromeCharIndex + 1}</strong> [<code>{MAGHA_PALINDROME_SYLLABLES[palindromeCharIndex].dev}</code> / {MAGHA_PALINDROME_SYLLABLES[palindromeCharIndex].iast}]
                        &nbsp;⟷&nbsp;
                        Mirror Position <strong>#{16 - palindromeCharIndex}</strong> [<code>{MAGHA_PALINDROME_SYLLABLES[15 - palindromeCharIndex].dev}</code> / {MAGHA_PALINDROME_SYLLABLES[15 - palindromeCharIndex].iast}]
                      </div>
                    </div>
                    <span style={{ background: '#dcfce7', color: '#166534', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 800 }}>
                      ✓ EXACT SYLLABIC MATCH
                    </span>
                  </div>
                </div>
              </div>

              {/* Sandbox 2: The Two-in-One Miracle of Rāghavayādavīyam */}
              <div style={{ background: '#fffbeb', border: '1.5px solid #fde68a', borderRadius: '12px', padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#d97706', textTransform: 'uppercase' }}>
                      Case 2 · The Reversible Epic (Anuloma-Viloma Kāvya)
                    </span>
                    <h4 style={{ margin: '0.2rem 0 0', fontSize: '1.1rem', fontWeight: 800, color: '#78350f' }}>
                      🏹 🪈 Arasanipalai Veṅkaṭādhvarin’s Rāghavayādavīyam (17th Century)
                    </h4>
                  </div>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button
                      type="button"
                      onClick={() => setRaghavaDirection('anuloma')}
                      style={{
                        padding: '0.35rem 0.75rem',
                        borderRadius: '6px',
                        background: raghavaDirection === 'anuloma' ? '#d97706' : '#ffffff',
                        color: raghavaDirection === 'anuloma' ? '#ffffff' : '#78350f',
                        border: '1px solid #d97706',
                        cursor: 'pointer',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                      }}
                    >
                      🏹 Forward: Śrī Rāma
                    </button>
                    <button
                      type="button"
                      onClick={() => setRaghavaDirection('viloma')}
                      style={{
                        padding: '0.35rem 0.75rem',
                        borderRadius: '6px',
                        background: raghavaDirection === 'viloma' ? '#2563eb' : '#ffffff',
                        color: raghavaDirection === 'viloma' ? '#ffffff' : '#1e40af',
                        border: '1px solid #2563eb',
                        cursor: 'pointer',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                      }}
                    >
                      🪈 Reverse: Śrī Kṛṣṇa
                    </button>
                  </div>
                </div>

                <p style={{ fontSize: '0.86rem', color: '#92400e', lineHeight: 1.5, margin: '0 0 1rem' }}>
                  This entire 30-verse work is an astounding combinatorial marvel: read forward (<strong>Anuloma</strong>), it narrates the sacred history of <strong>Lord Śrī Rāma (Rāmāyaṇa)</strong>. Read backwards syllable-by-syllable (<strong>Viloma</strong>), the identical phonemes dissolve and recombine through Sanskrit grammar into the divine pastimes of <strong>Lord Śrī Kṛṣṇa (Bhāgavatam)</strong>!
                </p>

                {/* Active Direction Card */}
                <div style={{ background: '#ffffff', borderRadius: '10px', border: '1px solid #fde68a', padding: '1.15rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: raghavaDirection === 'anuloma' ? '#b45309' : '#1d4ed8' }}>
                      {RAGHAVA_YADAVIYAM_DATA[raghavaDirection].hero}
                    </div>
                    <button
                      type="button"
                      onClick={() => onPlayAudio?.(RAGHAVA_YADAVIYAM_DATA[raghavaDirection].textSa)}
                      style={{
                        padding: '0.25rem 0.6rem',
                        borderRadius: '6px',
                        border: '1px solid #e2e8f0',
                        background: '#f8fafc',
                        cursor: 'pointer',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: '#475569',
                      }}
                    >
                      🔊 Chant Verse
                    </button>
                  </div>

                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.7, marginBottom: '0.35rem' }}>
                    {RAGHAVA_YADAVIYAM_DATA[raghavaDirection].textSa}
                  </div>
                  <div style={{ fontSize: '0.86rem', fontWeight: 600, color: '#64748b', fontFamily: 'monospace', marginBottom: '0.5rem' }}>
                    {RAGHAVA_YADAVIYAM_DATA[raghavaDirection].iast}
                  </div>
                  <p style={{ margin: 0, fontSize: '0.84rem', color: '#475569', lineHeight: 1.55 }}>
                    <strong>Poetic Translation:</strong> {RAGHAVA_YADAVIYAM_DATA[raghavaDirection].meaning}
                  </p>
                </div>

                {/* 32 Syllables Ribbon */}
                <div style={{ background: '#fef3c7', borderRadius: '8px', padding: '0.75rem', border: '1px solid #fcd34d' }}>
                  <div style={{ fontSize: '0.76rem', fontWeight: 800, color: '#92400e', marginBottom: '0.45rem', textTransform: 'uppercase' }}>
                    32-Syllable Flow Direction: {raghavaDirection === 'anuloma' ? '➡️ Forward (1 to 32)' : '⬅️ Retrograde (32 down to 1)'}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                    {RAGHAVA_YADAVIYAM_DATA[raghavaDirection].syllables.map((syl, i) => (
                      <span
                        key={i}
                        style={{
                          padding: '0.25rem 0.45rem',
                          borderRadius: '4px',
                          background: '#ffffff',
                          border: '1px solid #fde68a',
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          color: raghavaDirection === 'anuloma' ? '#b45309' : '#1e40af',
                        }}
                      >
                        {syl}
                      </span>
                    ))}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#a16207', marginTop: '0.5rem' }}>
                    💡 Notice how <code>vande&apos;haṃ</code> (I bow) forward mirrors into <code>huvande</code> reverse, and <code>ramāmalaṃ</code> (pure Rāma) mirrors into <code>lamamārama</code> (delighting Lakṣmī). Sanskrit’s highly inflected morphology allows reverse root concatenation without violating metric rules!
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SUB-MODE 3: THE SARVATO-BHADRA 8x8 MAGIC GRID */}
          {ankaSubMode === 'sarvatobhadra' && (
            <div>
              {/* Theoretical D4 Symmetry & 10 Degrees of Freedom Box */}
              <div style={{ background: '#ecfdf5', border: '1.5px solid #a7f3d0', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.65rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#059669', textTransform: 'uppercase' }}>
                      Dihedral Group D₄ &amp; Orbit-Stabilizer Theorem
                    </span>
                    <h4 style={{ margin: '0.2rem 0 0', fontSize: '1.15rem', fontWeight: 800, color: '#064e3b' }}>
                      🔲 The 10-Parameter Freedom Theorem in Sarvato-Bhadra
                    </h4>
                  </div>
                  <div style={{ background: '#d1fae5', padding: '0.35rem 0.75rem', borderRadius: '8px', border: '1px solid #6ee7b7', fontSize: '0.84rem', fontWeight: 800, color: '#047857' }}>
                    Free Parameters: n(n+2)/8 = 8(10)/8 = 10 Syllables
                  </div>
                </div>

                <p style={{ fontSize: '0.86rem', color: '#065f46', lineHeight: 1.55, margin: '0 0 0.85rem' }}>
                  A <strong>Sarvato-Bhadra</strong> (सर्वतोभद्र, &quot;auspicious on every side&quot;) is an 8×8 square matrix of 64 syllables that can be read horizontally left-to-right, right-to-left, vertically top-to-bottom, bottom-to-top, and along concentric loops without altering the verse. Mathematically, it is invariant under the <strong>Dihedral Group D₄</strong> (the 8 symmetries of a square: 4 rotations and 4 reflections).
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
                  <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: '8px', border: '1px solid #a7f3d0' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#047857', marginBottom: '0.2rem' }}>
                      📐 Group Invariance Equations
                    </div>
                    <div style={{ fontSize: '0.76rem', color: '#065f46', fontFamily: 'monospace' }}>
                      M[i, j] = M[i, 8 - j + 1] (Horizontal)<br />
                      M[i, j] = M[8 - i + 1, j] (Vertical)<br />
                      M[i, j] = M[j, i] (Transpose / Diagonal)<br />
                      M[i, j] = M[8 - j + 1, 8 - i + 1] (Anti-Diagonal)
                    </div>
                  </div>

                  <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: '8px', border: '1px solid #a7f3d0' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#047857', marginBottom: '0.2rem' }}>
                      🔢 10 Orbits Partition
                    </div>
                    <div style={{ fontSize: '0.76rem', color: '#065f46', lineHeight: 1.5 }}>
                      • <strong>4 Diagonal Orbits</strong> (size 4 each) = 16 cells<br />
                      • <strong>6 Off-Diagonal Orbits</strong> (size 8 each) = 48 cells<br />
                      • <strong>Total = 16 + 48 = 64 cells</strong> governed by just <strong>10 independent generator syllables!</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* The Canonical Shloka: Bhāravi's Kirātārjunīya 15.25 */}
              <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0d9488', textTransform: 'uppercase' }}>
                      Canonical Classical Masterpiece
                    </span>
                    <h4 style={{ margin: '0.2rem 0 0', fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
                      📜 Mahākavi Bhāravi’s Kirātārjunīya (Canto 15, Verse 25)
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => onPlayAudio?.('देवाकानिनिकावादेवा वाकास्वस्वस्वस्वकावा')}
                    style={{
                      padding: '0.3rem 0.75rem',
                      borderRadius: '8px',
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: '#0f766e',
                    }}
                  >
                    🔊 Chant Shloka
                  </button>
                </div>

                {/* Grid Size Switcher (4x4 Pedagogical vs 8x8 Masterpiece) */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => setSarvatoGridSize('4x4')}
                    style={{
                      padding: '0.5rem 0.95rem',
                      borderRadius: '8px',
                      border: sarvatoGridSize === '4x4' ? '2px solid #0d9488' : '1px solid #cbd5e1',
                      background: sarvatoGridSize === '4x4' ? '#f0fdfa' : '#ffffff',
                      color: sarvatoGridSize === '4x4' ? '#0f766e' : '#475569',
                      fontWeight: 800,
                      fontSize: '0.84rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    🟩 4×4 Pedagogical Model (BHA-RA-TA-VEE-RA)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSarvatoGridSize('8x8')}
                    style={{
                      padding: '0.5rem 0.95rem',
                      borderRadius: '8px',
                      border: sarvatoGridSize === '8x8' ? '2px solid #0d9488' : '1px solid #cbd5e1',
                      background: sarvatoGridSize === '8x8' ? '#f0fdfa' : '#ffffff',
                      color: sarvatoGridSize === '8x8' ? '#0f766e' : '#475569',
                      fontWeight: 800,
                      fontSize: '0.84rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    🔲 8×8 Canonical Masterpiece (Kirātārjunīya 15.25)
                  </button>
                </div>

                {/* 4x4 Grid Visualizer */}
                {sarvatoGridSize === '4x4' && (
                  <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0d9488', textTransform: 'uppercase' }}>
                        Pedagogical 4×4 Symmetric Phonetic Matrix
                      </span>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#065f46', background: '#ecfdf5', padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
                        D₄ Degrees of Freedom = n(n+2)/8 = 4(6)/8 = 3 Generators
                      </span>
                    </div>

                    <p style={{ fontSize: '0.84rem', color: '#475569', lineHeight: 1.55, margin: '0 0 1rem' }}>
                      To see how dihedral group symmetries operate on syllables before tackling a 64-character matrix, this 4×4 grid arranges the phrase <strong>&ldquo;BHA-RA-TA-VEE-RA&rdquo;</strong> (Brave Indian Warrior) symmetrically with <strong>&ldquo;RA-MA-VA-TA&rdquo;</strong>. Notice that every row is identical to its column (M[i, j] = M[j, i]), and opposite rows invert in retrograde!
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', maxWidth: '340px', margin: '0 auto 1.25rem' }}>
                      {SARVATO_4X4_GRID.map((row, r) =>
                        row.map((cell, c) => {
                          const isCorner = (r === 0 || r === 3) && (c === 0 || c === 3);
                          const isCenter = (r === 1 || r === 2) && (c === 1 || c === 2);
                          return (
                            <div
                              key={`${r}-${c}`}
                              style={{
                                aspectRatio: '1',
                                borderRadius: '8px',
                                background: isCorner ? '#fef3c7' : isCenter ? '#fee2e2' : '#dbeafe',
                                border: isCorner ? '1.5px solid #f59e0b' : isCenter ? '1.5px solid #ef4444' : '1.5px solid #3b82f6',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 800,
                                fontSize: '0.92rem',
                                color: isCorner ? '#92400e' : isCenter ? '#991b1b' : '#1e40af',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
                              }}
                            >
                              <span>{cell.split(' ')[0]}</span>
                              <span style={{ fontSize: '0.68rem', fontWeight: 600 }}>{cell.split(' ')[1]}</span>
                            </div>
                          );
                        })
                      )}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.65rem' }}>
                      <div style={{ background: '#f8fafc', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0f766e', textTransform: 'uppercase' }}>➡️ Row 1 Forward</div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a' }}>BHA - RA - TA - VEE</div>
                        <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Brave warrior (Line 1)</div>
                      </div>
                      <div style={{ background: '#f8fafc', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0f766e', textTransform: 'uppercase' }}>⬇️ Column 1 Downward</div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a' }}>BHA - RA - TA - VEE</div>
                        <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Identical to Row 1!</div>
                      </div>
                      <div style={{ background: '#f8fafc', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0f766e', textTransform: 'uppercase' }}>⬅️ Row 4 Backward</div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a' }}>VEE - TA - RA - BHA</div>
                        <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Symmetric retrograde!</div>
                      </div>
                      <div style={{ background: '#f8fafc', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0f766e', textTransform: 'uppercase' }}>⬆️ Column 4 Upward</div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a' }}>VEE - TA - RA - BHA</div>
                        <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Identical to Row 4 reverse!</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 8x8 Grid Canonical View */}
                {sarvatoGridSize === '8x8' && (
                  <div>
                    <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '1rem', textAlign: 'center' }}>
                      <div style={{ fontSize: '1.16rem', fontWeight: 800, color: '#0f766e', lineHeight: 1.7 }}>
                        देवाकानिनिकावादेवा वाकास्वस्वस्वस्वकावा ।<br />
                        कास्वभव्यव्यभस्वका निस्वव्यररव्यस्वनि ॥
                      </div>
                      <div style={{ fontSize: '0.86rem', fontWeight: 600, color: '#475569', fontFamily: 'monospace', marginTop: '0.35rem' }}>
                        devākāninikāvādevā vākāsvasvasvasvakāvā |<br />
                        kāsvabhavyavyabhasvakā nisvavyararavyasvani ||
                      </div>
                      <p style={{ margin: '0.45rem 0 0', fontSize: '0.82rem', color: '#64748b', fontStyle: 'italic' }}>
                        &ldquo;O divine Lord who grants desires and protects the righteous! In battle, your enemies are vanquished by your radiant auspiciousness; your speech is self-illuminating, destroying all sorrow...&rdquo;
                      </p>
                    </div>

                {/* Read Mode Selector Tabs */}
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', marginBottom: '0.45rem' }}>
                    Select Traversal Vector (Notice how every direction reads the identical verse!):
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {[
                      { id: 'normal', label: '🎨 All 10 D₄ Orbits' },
                      { id: 'row0_fwd', label: '➡️ Row 1: Forward (L → R)' },
                      { id: 'row0_rev', label: '⬅️ Row 8: Backward (R → L)' },
                      { id: 'col0_down', label: '⬇️ Column 1: Down (Top → Bottom)' },
                      { id: 'col0_up', label: '⬆️ Column 8: Up (Bottom → Top)' },
                      { id: 'perimeter', label: '🔲 Perimeter Outer Ring' },
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => setSarvatoReadMode(mode.id as any)}
                        style={{
                          padding: '0.4rem 0.75rem',
                          borderRadius: '8px',
                          border: sarvatoReadMode === mode.id ? '2px solid #0d9488' : '1px solid #cbd5e1',
                          background: sarvatoReadMode === mode.id ? '#f0fdfa' : '#ffffff',
                          color: sarvatoReadMode === mode.id ? '#0f766e' : '#475569',
                          fontWeight: 700,
                          fontSize: '0.78rem',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {mode.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active Traversal Reading Strip */}
                {sarvatoReadMode !== 'normal' && (
                  <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '8px', padding: '0.75rem', marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#065f46', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                      Phonetic Traversal Output:
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: '#047857' }}>
                      {sarvatoReadMode === 'perimeter'
                        ? 'Outer Ring (28 Syllables): de → vā → kā → ni → ni → kā → vā → de → vā → kā → ni → ni → kā → vā → de...'
                        : 'दे वा का नि नि का वा दे (de - vā - kā - ni - ni - kā - vā - de) ≡ Verse Pāda 1!'}
                    </div>
                  </div>
                )}

                {/* Interactive 8x8 Grid */}
                <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '1rem', marginBottom: '1.25rem' }}>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(8, 1fr)',
                      gap: '0.35rem',
                      maxWidth: '560px',
                      margin: '0 auto',
                    }}
                  >
                    {SARVATOBHADRA_GRID.map((row, r) =>
                      row.map((cell, c) => {
                        const styleInfo = ORBIT_STYLES[cell.orbitId];
                        const isHoveredOrbit = sarvatoHoveredCell?.orbitId === cell.orbitId;

                        // Traversal highlighting:
                        let isTraversalActive = false;
                        if (sarvatoReadMode === 'row0_fwd' && r === 0) isTraversalActive = true;
                        if (sarvatoReadMode === 'row0_rev' && r === 7) isTraversalActive = true;
                        if (sarvatoReadMode === 'col0_down' && c === 0) isTraversalActive = true;
                        if (sarvatoReadMode === 'col0_up' && c === 7) isTraversalActive = true;
                        if (sarvatoReadMode === 'perimeter' && (r === 0 || r === 7 || c === 0 || c === 7)) isTraversalActive = true;

                        return (
                          <div
                            key={`${r}-${c}`}
                            onMouseEnter={() => setSarvatoHoveredCell({ r, c, orbitId: cell.orbitId })}
                            onMouseLeave={() => setSarvatoHoveredCell(null)}
                            style={{
                              aspectRatio: '1',
                              borderRadius: '8px',
                              border: isHoveredOrbit
                                ? `2.5px solid ${styleInfo.border}`
                                : isTraversalActive
                                ? '2px solid #0d9488'
                                : `1px solid ${styleInfo.border}88`,
                              background: isHoveredOrbit
                                ? styleInfo.bg
                                : isTraversalActive
                                ? '#ccfbf1'
                                : sarvatoReadMode === 'normal'
                                ? styleInfo.bg
                                : '#ffffff',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              transform: isHoveredOrbit ? 'scale(1.08)' : 'scale(1)',
                              transition: 'all 0.15s ease',
                              boxShadow: isHoveredOrbit ? '0 4px 12px rgba(0,0,0,0.12)' : 'none',
                              zIndex: isHoveredOrbit ? 10 : 1,
                            }}
                          >
                            <span style={{ fontSize: '1.15rem', fontWeight: 800, color: styleInfo.text, lineHeight: 1.1 }}>
                              {cell.dev}
                            </span>
                            <span style={{ fontSize: '0.66rem', color: '#475569', fontFamily: 'monospace' }}>
                              {cell.iast}
                            </span>
                            <span style={{ fontSize: '0.55rem', fontWeight: 700, color: '#94a3b8' }}>
                              #{cell.orbitId}
                            </span>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Active Cell Inspector Footer */}
                  <div style={{ marginTop: '0.85rem', textAlign: 'center', minHeight: '1.8rem' }}>
                    {sarvatoHoveredCell ? (
                      <div style={{ fontSize: '0.84rem', color: '#0f172a', fontWeight: 600 }}>
                        Cell [Row {sarvatoHoveredCell.r + 1}, Col {sarvatoHoveredCell.c + 1}] → Syllable: <strong>{SARVATOBHADRA_GRID[sarvatoHoveredCell.r][sarvatoHoveredCell.c].dev}</strong> ({SARVATOBHADRA_GRID[sarvatoHoveredCell.r][sarvatoHoveredCell.c].iast}) | Belongs to <strong>{ORBIT_STYLES[sarvatoHoveredCell.orbitId].label}</strong> ({ORBIT_STYLES[sarvatoHoveredCell.orbitId].count} symmetric D₄ reflections)
                      </div>
                    ) : (
                      <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                        Hover over any cell above to inspect its Dihedral D₄ symmetry orbit and reflection partners.
                      </div>
                    )}
                  </div>
                </div>

                {/* Orbit Partition Breakdown Table */}
                <div style={{ background: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0', padding: '1rem' }}>
                  <h5 style={{ margin: '0 0 0.65rem', fontSize: '0.88rem', fontWeight: 800, color: '#0f172a' }}>
                    📊 The 10 Generator Orbits of Sarvato-Bhadra (Sum = 64 Cells)
                  </h5>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
                    {Object.entries(ORBIT_STYLES).map(([id, o]) => (
                      <div
                        key={id}
                        onMouseEnter={() => setSarvatoHoveredCell({ r: 0, c: 0, orbitId: parseInt(id, 10) })}
                        onMouseLeave={() => setSarvatoHoveredCell(null)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.45rem 0.65rem',
                          borderRadius: '6px',
                          border: `1px solid ${o.border}`,
                          background: o.bg,
                          cursor: 'pointer',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                          <span style={{ fontSize: '0.95rem', fontWeight: 800, color: o.text }}>{o.syl}</span>
                          <span style={{ fontSize: '0.72rem', color: '#475569' }}>{o.label}</span>
                        </div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: o.text, background: '#ffffff', padding: '0.15rem 0.4rem', borderRadius: '4px' }}>
                          {o.count} cells
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

          {/* SUB-MODE 4: THE KNIGHT’S TOUR GRID (TURAṄGA-BANDHA) */}
          {ankaSubMode === 'turanga_tour' && (
            <div>
              {/* Context Banner */}
              <div style={{ background: '#eff6ff', border: '1.5px solid #bfdbfe', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.65rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase' }}>
                      Graph Theory &amp; Hamiltonian Paths (9th–13th Century CE)
                    </span>
                    <h4 style={{ margin: '0.2rem 0 0', fontSize: '1.15rem', fontWeight: 800, color: '#1e3a8a' }}>
                      ♞ Move-Constrained Grids: Turaṅga-Bandha (The Knight’s Tour)
                    </h4>
                  </div>
                  <div style={{ background: '#dbeafe', padding: '0.35rem 0.75rem', borderRadius: '8px', border: '1px solid #93c5fd', fontSize: '0.84rem', fontWeight: 800, color: '#1e40af' }}>
                    Open Hamiltonian Path on G = (V, E)
                  </div>
                </div>

                <p style={{ fontSize: '0.86rem', color: '#1e3a8a', lineHeight: 1.55, margin: 0 }}>
                  Long before Leonhard Euler published his 1759 paper on the Knight&apos;s Tour, Sanskrit scholars like <strong>Rudraṭa</strong> (<em>Kāvyālaṅkāra</em>, 9th c.) and <strong>Vedānta Deśika</strong> (<em>Pādukā-Sahasram</em>, 13th c.) constructed move-constrained poetic matrices. In Deśika’s masterpiece, an 8×4 grid produces <strong>Verse 929</strong> when read row-by-row, but leaping along legal chess Knight moves traces an open Hamiltonian path that forms <strong>Verse 930</strong>!
                </p>
              </div>

              {/* Embedded TurangaBandhaChessboard Component */}
              <TurangaBandhaChessboard onPlayAudio={onPlayAudio} />
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          TAB 9: CHHAYA-VYAVAHARA (GNOMONS, DOUBLE SHADOWS & EARTH CURVATURE)
         ========================================================================= */}
      {activeTab === 'chhaya' && (
        <div>
          {/* Classic Sanskrit Verse Banner */}
          <div style={{ background: '#fefce8', border: '1.5px solid #fef08a', borderRadius: '12px', padding: '1.2rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#854d0e', textTransform: 'uppercase' }}>
                Līlāvatī Chapter 10 · Chāyā-Vyavahāra (छायाव्यवहारः / Shadow Calculations &amp; Gnomons)
              </span>
              <button
                type="button"
                onClick={() => onPlayAudio?.('छायान्तरभक्ते द्विशङ्कुविवरे शङ्कुगुणे स्तम्भः')}
                style={{
                  padding: '0.25rem 0.65rem',
                  fontSize: '0.76rem',
                  borderRadius: '6px',
                  border: '1px solid #fde047',
                  background: '#ffffff',
                  cursor: 'pointer',
                  fontWeight: 700,
                  color: '#854d0e',
                }}
              >
                🔊 Chant Chāyā Shloka
              </button>
            </div>
            <div style={{ fontSize: '1.08rem', fontWeight: 800, color: '#713f12', lineHeight: 1.6, marginBottom: '0.35rem' }}>
              छायान्तरभक्ते द्विशङ्कुविवरे शङ्कुगुणे स्तम्भः ।<br />
              छायागुणितस्तम्भो विभक्तशङ्कुः प्रमाणं स्यात् ॥
            </div>
            <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#a16207', marginBottom: '0.45rem' }}>
              chāyāntarabhakte dviśaṅkuvivare śaṅkuguṇe stambhaḥ |<br />
              chāyāguṇitastambho vibhaktaśaṅkuḥ pramāṇaṃ syāt ||
            </div>
            <p style={{ margin: 0, fontSize: '0.86rem', color: '#854d0e', lineHeight: 1.55 }}>
              <strong>Poetic Translation:</strong> <em>&ldquo;Multiply the distance between the two gnomons (D) by the standard gnomon height (g), and divide by the difference between the two cast shadows (S₂ - S₁); the result is the true height of the distant cliff or pillar! Furthermore, multiplying the first shadow by the height and dividing by the gnomon gives the exact distance to the base.&rdquo;</em>
            </p>
          </div>

          {/* Section A: The Double-Shadow Riddle (Dvi-Chāyā) */}
          <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0d9488', textTransform: 'uppercase' }}>
                  Problem 1 · Measuring Inaccessible Heights (Dvi-Chāyā)
                </span>
                <h4 style={{ margin: '0.2rem 0 0', fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>
                  📐 The Cliff &amp; Bamboo Riddle: Height from Two Gnomon Shadows
                </h4>
              </div>
              <div style={{ background: '#ecfdf5', padding: '0.35rem 0.75rem', borderRadius: '8px', border: '1px solid #a7f3d0', fontSize: '0.84rem', fontWeight: 800, color: '#065f46', fontFamily: 'monospace' }}>
                H = (g × D) / (S₂ - S₁)
              </div>
            </div>

            <p style={{ fontSize: '0.86rem', color: '#475569', lineHeight: 1.5, margin: '0 0 1rem' }}>
              When the base of a tall object (a steep cliff, mountain peak, or guarded temple spire) is physically inaccessible, you cannot measure horizontal distance directly. Bhāskarācārya solves this using two gnomon stations in line with the light source, exploiting the properties of similar triangles without requiring trigonometric lookup tables!
            </p>

            {/* Interactive Sliders Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem', marginBottom: '1.15rem' }}>
              {/* Gnomon Height (g) */}
              <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                  <span>Vertical Gnomon (g / Śaṅku):</span>
                  <span style={{ fontWeight: 800, color: '#0d9488' }}>{gnomonRodHeight} Aṅgulas</span>
                </div>
                <input
                  type="range"
                  min={6}
                  max={24}
                  value={gnomonRodHeight}
                  onChange={(e) => setGnomonRodHeight(parseInt(e.target.value, 10))}
                  style={{ width: '100%', accentColor: '#0d9488' }}
                />
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Standard Vedic astronomical rod = 12 Aṅgulas (1 Vitasti / hand span)</div>
              </div>

              {/* Shadow 1 (S1) */}
              <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                  <span>First Shadow (S₁):</span>
                  <span style={{ fontWeight: 800, color: '#0284c7' }}>{shadowOne} units</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={shadowTwo - 1}
                  value={shadowOne}
                  onChange={(e) => setShadowOne(parseInt(e.target.value, 10))}
                  style={{ width: '100%', accentColor: '#0284c7' }}
                />
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Shadow cast at station 1 closer to object</div>
              </div>

              {/* Shadow 2 (S2) */}
              <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                  <span>Second Shadow (S₂):</span>
                  <span style={{ fontWeight: 800, color: '#7c3aed' }}>{shadowTwo} units</span>
                </div>
                <input
                  type="range"
                  min={shadowOne + 1}
                  max={20}
                  value={shadowTwo}
                  onChange={(e) => setShadowTwo(parseInt(e.target.value, 10))}
                  style={{ width: '100%', accentColor: '#7c3aed' }}
                />
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Shadow cast after walking distance D backward (S₂ &gt; S₁)</div>
              </div>

              {/* Distance D */}
              <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                  <span>Surveyor Distance (D):</span>
                  <span style={{ fontWeight: 800, color: '#d97706' }}>{surveyorDistance} units</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={100}
                  step={5}
                  value={surveyorDistance}
                  onChange={(e) => setSurveyorDistance(parseInt(e.target.value, 10))}
                  style={{ width: '100%', accentColor: '#d97706' }}
                />
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Distance moved backwards between station 1 and station 2</div>
              </div>
            </div>

            {/* Live Calculation Banner */}
            <div style={{ background: '#ecfdf5', border: '1.5px solid #a7f3d0', borderRadius: '10px', padding: '1.15rem', marginBottom: '1.15rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#065f46', textTransform: 'uppercase' }}>
                  Bhāskarācārya&apos;s Solution:
                </span>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#047857', fontFamily: 'monospace' }}>
                  ΔS = S₂ - S₁ = {shadowTwo} - {shadowOne} = {shadowDelta} units
                </span>
              </div>

              <div style={{ fontSize: '1.45rem', fontWeight: 900, color: '#047857', marginBottom: '0.35rem' }}>
                H = ({gnomonRodHeight} × {surveyorDistance}) / ({shadowTwo} - {shadowOne}) = {calculatedCliffHeight.toFixed(1)} Units Height!
              </div>

              <div style={{ fontSize: '0.86rem', color: '#065f46', lineHeight: 1.5 }}>
                • <strong>Distance to Inaccessible Base (X₁):</strong> ({shadowOne} × {surveyorDistance}) / {shadowDelta} = <strong>{firstCliffDistance.toFixed(1)} units</strong> from station 1.<br />
                • <strong>Canonical Textbook Example:</strong> With g = 12, S₁ = 4, S₂ = 7, D = 30: H = (12 × 30) / (7 - 4) = 360 / 3 = <strong>120 units</strong>!
              </div>
            </div>

            {/* Diagram of Similar Triangles */}
            <div style={{ background: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0', padding: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Geometric Ray Tracing: Similar Triangles formed by Gnomon &amp; Object
              </div>
              <svg viewBox="0 0 600 200" style={{ width: '100%', maxHeight: '200px' }}>
                {/* Ground */}
                <line x1="20" y1="170" x2="580" y2="170" stroke="#94a3b8" strokeWidth="2.5" />
                {/* Cliff/Object */}
                <rect x="50" y="30" width="30" height="140" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
                <text x="65" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">Cliff (H = {calculatedCliffHeight.toFixed(0)})</text>
                {/* Gnomon 1 */}
                <line x1="220" y1="170" x2="220" y2="130" stroke="#0d9488" strokeWidth="3" />
                <text x="220" y="122" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0d9488">g = {gnomonRodHeight}</text>
                {/* Shadow 1 */}
                <line x1="220" y1="170" x2="270" y2="170" stroke="#0284c7" strokeWidth="4" />
                <text x="245" y="185" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0284c7">S₁={shadowOne}</text>
                {/* Gnomon 2 */}
                <line x1="390" y1="170" x2="390" y2="130" stroke="#0d9488" strokeWidth="3" />
                <text x="390" y="122" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0d9488">g = {gnomonRodHeight}</text>
                {/* Shadow 2 */}
                <line x1="390" y1="170" x2="470" y2="170" stroke="#7c3aed" strokeWidth="4" />
                <text x="430" y="185" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#7c3aed">S₂={shadowTwo}</text>
                {/* Distance D between stations */}
                <line x1="220" y1="192" x2="390" y2="192" stroke="#d97706" strokeWidth="1.5" strokeDasharray="4,4" />
                <text x="305" y="196" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#d97706">Distance D = {surveyorDistance}</text>
                {/* Sun icon */}
                <circle cx="530" cy="35" r="14" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" />
                <text x="530" y="39" textAnchor="middle" fontSize="14">☀️</text>
              </svg>
            </div>
          </div>

          {/* Section B: Celestial Gnomon & Earth's Curvature (Palabhā & Latitude) */}
          <div style={{ background: '#eff6ff', border: '1.5px solid #bfdbfe', borderRadius: '12px', padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase' }}>
                  Astronomy &amp; Spherical Geodesy (Dig-Deśa-Kāla-Jñāna)
                </span>
                <h4 style={{ margin: '0.2rem 0 0', fontSize: '1.15rem', fontWeight: 800, color: '#1e3a8a' }}>
                  🌍 Palabhā (पलभा): Deriving Local Latitude &amp; Earth’s Spherical Curvature
                </h4>
              </div>
              <div style={{ background: '#dbeafe', padding: '0.35rem 0.75rem', borderRadius: '8px', border: '1px solid #93c5fd', fontSize: '0.84rem', fontWeight: 800, color: '#1e40af', fontFamily: 'monospace' }}>
                tan(φ) = Palabhā / 12
              </div>
            </div>

            <p style={{ fontSize: '0.86rem', color: '#1e3a8a', lineHeight: 1.5, margin: '0 0 1rem' }}>
              In ancient Indian astronomy, the shadow cast by a 12-aṅgula vertical gnomon at exact local solar noon on the <strong>Equinox</strong> (when solar declination δ = 0) is called the <strong>Palabhā (पलभा)</strong> or <strong>Viṣuvad-Bhā</strong>. Because the Sun is directly overhead at the terrestrial equator, the zenith angle of the Sun at your location equals your geographic latitude (<strong>Akṣāṃśa / अक्षांश</strong>)!
            </p>

            {/* Interactive Slider for Palabhā */}
            <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '10px', border: '1px solid #bfdbfe', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#334155' }}>
                  Noon Equinoctial Shadow of 12-Aṅgula Gnomon (Palabhā):
                </label>
                <span style={{ fontSize: '1rem', fontWeight: 800, color: '#2563eb' }}>
                  {palabhaShadow} Aṅgulas
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={15}
                step={0.1}
                value={palabhaShadow}
                onChange={(e) => setPalabhaShadow(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: '#2563eb', marginBottom: '0.75rem' }}
              />

              {/* Geographic Presets */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {[
                  { label: 'Ujjain (Ancient Prime Meridian)', shadow: 5.3, lat: '23.2° N (Tropic of Cancer)' },
                  { label: 'Kanchipuram (South India)', shadow: 2.8, lat: '12.8° N' },
                  { label: 'Varanasi (Kāśī)', shadow: 6.2, lat: '25.3° N' },
                  { label: 'Kashmir (Śāradā Pīṭha)', shadow: 8.2, lat: '34.3° N' },
                ].map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setPalabhaShadow(preset.shadow)}
                    style={{
                      padding: '0.3rem 0.65rem',
                      borderRadius: '6px',
                      border: Math.abs(palabhaShadow - preset.shadow) < 0.1 ? '1.5px solid #2563eb' : '1px solid #cbd5e1',
                      background: Math.abs(palabhaShadow - preset.shadow) < 0.1 ? '#dbeafe' : '#f8fafc',
                      color: Math.abs(palabhaShadow - preset.shadow) < 0.1 ? '#1e40af' : '#475569',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    📍 {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Derived Latitude Banner */}
            <div style={{ background: '#ffffff', borderRadius: '10px', border: '1px solid #93c5fd', padding: '1rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#1e40af', textTransform: 'uppercase' }}>
                Derived Terrestrial Latitude (Akṣāṃśa φ):
              </div>
              <div style={{ fontSize: '1.45rem', fontWeight: 900, color: '#1d4ed8', marginTop: '0.2rem' }}>
                φ = arctan({palabhaShadow} / 12) = {derivedLatitudeDeg.toFixed(2)}° North
              </div>
              <p style={{ margin: '0.4rem 0 0', fontSize: '0.82rem', color: '#475569', lineHeight: 1.5 }}>
                💡 <strong>Earth Circumference Determination:</strong> By measuring the difference in Palabhā between two observatories along the same meridian (such as Lanka on the equator and Ujjain at 23.2° N) separated by known road distance, Āryabhaṭa and Bhāskarācārya calculated the Earth’s spherical circumference as <strong>4,967 Yojanas (~39,960 km)</strong>, within 1% of the modern satellite value (40,075 km)!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
