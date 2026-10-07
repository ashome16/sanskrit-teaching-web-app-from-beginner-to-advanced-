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
    'bees' | 'necklace' | 'peacock' | 'lotus' | 'currency' | 'sukshma_kala' | 'maha_kala' | 'anka_pasa' | 'chhaya' | 'bijaganita' | 'yantra_goladhyaya'
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

  // Interactive state for Dual-City Geodesy (Lanka vs Ujjain / Earth Circumference)
  const [geodesyPreset, setGeodesyPreset] = useState<'lanka_ujjain' | 'ujjain_kashmir' | 'custom'>('lanka_ujjain');
  const [geodesyLat1, setGeodesyLat1] = useState<number>(0.0); // Lanka (Equator)
  const [geodesyLat2, setGeodesyLat2] = useState<number>(23.2); // Ujjain
  const [geodesyDistanceYojanas, setGeodesyDistanceYojanas] = useState<number>(320);

  // Interactive state for Bījagaṇita Algebra (Signed Arithmetic & Zero)
  const [bijaOp, setBijaOp] = useState<'+' | '-' | '*' | '/' | 'sqrt'>('*');
  const [bijaValA, setBijaValA] = useState<number>(5);
  const [bijaSignA, setBijaSignA] = useState<'dhana' | 'rina'>('rina'); // -5
  const [bijaValB, setBijaValB] = useState<number>(3);
  const [bijaSignB, setBijaSignB] = useState<'dhana' | 'rina'>('rina'); // -3
  const [bijaSqrtInput, setBijaSqrtInput] = useState<number>(-25);
  const [bijaKhaharaAdd, setBijaKhaharaAdd] = useState<number>(100);

  // Interactive state for Seasonal Solar Tilt (Krānti) & Solstice Shadow Tracking
  const [seasonalSolarLongitude, setSeasonalSolarLongitude] = useState<number>(90); // 90° = Summer Solstice (Karka Saṅkrānti)
  const [seasonalObserverLat, setSeasonalObserverLat] = useState<number>(23.2); // Ujjain (~23.18° N)

  // Interactive state for Leaping Monkeys (Quadratic Equations with Dual Real Roots)
  const [monkeyDivisor, setMonkeyDivisor] = useState<number>(8); // 1/8th squared
  const [monkeysOnHill, setMonkeysOnHill] = useState<number>(12); // 12 on hill
  const [customQuadA, setCustomQuadA] = useState<number>(1);
  const [customQuadB, setCustomQuadB] = useState<number>(-4);
  const [customQuadC, setCustomQuadC] = useState<number>(-12);

  // Interactive state for Tab 11: Yantra-Golādhyāya & Nīlakaṇṭha Heliocentrism
  const [yantraSubMode, setYantraSubMode] = useState<
    'yantras' | 'nilakantha_orbit' | 'tatkaliki_calculus' | 'katapayadi' | 'ayana_chalana' | 'golabandha_jesuit'
  >('yantras');
  const [selectedYantra, setSelectedYantra] = useState<'samrat' | 'jai_prakash' | 'ram'>('samrat');
  const [samratHourAngle, setSamratHourAngle] = useState<number>(10.5); // 10:30 AM
  const [jaiPrakashAzimuth, setJaiPrakashAzimuth] = useState<number>(135); // 135° SE
  const [jaiPrakashAltitude, setJaiPrakashAltitude] = useState<number>(48); // 48° elevation
  const [ramZenithAngle, setRamZenithAngle] = useState<number>(35); // 35° zenith distance

  // Nīlakaṇṭha Geo-Heliocentric Simulator state
  const [cosmicModel, setCosmicModel] = useState<'nilakantha' | 'geocentric' | 'heliocentric'>('nilakantha');
  const [orbitAnimTime, setOrbitAnimTime] = useState<number>(45); // angle in degrees 0-360
  const [selectedPlanetKeyOrbit, setSelectedPlanetKeyOrbit] = useState<'mercury' | 'venus' | 'mars' | 'jupiter' | 'saturn'>('mars');

  // Bhāskara II Instantaneous Velocity & Mādhava Series
  const [calculusThetaDeg, setCalculusThetaDeg] = useState<number>(30); // 30°
  const [calculusDeltaDeg, setCalculusDeltaDeg] = useState<number>(1.0); // 1.0°
  const [madhavaTermCount, setMadhavaTermCount] = useState<number>(5);
  const [useMadhavaCorrection, setUseMadhavaCorrection] = useState<boolean>(true);

  // Interactive state for Kaṭapayādi Cryptography
  const [katapayadiPreset, setKatapayadiPreset] = useState<'pi_madhava' | 'sin_radius' | 'narayaneeyam' | 'raga_kanakangi' | 'raga_harikambhoji' | 'custom'>('pi_madhava');
  const [customKatapayadiInput, setCustomKatapayadiInput] = useState<string>('गोपीभाग्यमधुव्रातः');
  const [selectedMelakartaNum, setSelectedMelakartaNum] = useState<number>(15); // Default to Māyāmāḷavagauḷa (#15)
  const [mvtX1Deg, setMvtX1Deg] = useState<number>(20);
  const [mvtX2Deg, setMvtX2Deg] = useState<number>(40);

  // Interactive state for Kuṭṭaka (The Pulverizer) & Planetary Synchronization
  const [kuttakaM1, setKuttakaM1] = useState<number>(15);
  const [kuttakaM2, setKuttakaM2] = useState<number>(22);
  const [kuttakaR1, setKuttakaR1] = useState<number>(3);
  const [kuttakaR2, setKuttakaR2] = useState<number>(7);

  // Interactive state for Yuktibhāṣā Circle Area Integration
  const [circleSlicesN, setCircleSlicesN] = useState<number>(16);
  const [circleRadiusR, setCircleRadiusR] = useState<number>(10);

  // Interactive state for Precession of the Equinoxes (Ayana-Calana)
  const [precessionYear, setPrecessionYear] = useState<number>(2026);
  const [precessionModel, setPrecessionModel] = useState<'surya_siddhanta' | 'modern'>('modern');

  // Interactive state for Golabandha & Jesuit Transmission
  const [matsyaSeparation, setMatsyaSeparation] = useState<number>(50); // px distance between circle centers
  const [parallaxZenithDeg, setParallaxZenithDeg] = useState<number>(45); // Zenith distance for topocentric parallax
  const [jesuitTimelineStep, setJesuitTimelineStep] = useState<number>(2); // 0 to 4

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
  const akshaKarna = Math.sqrt(144 + palabhaShadow * palabhaShadow);
  const derivedSinTheta = akshaKarna > 0 ? palabhaShadow / akshaKarna : 0;
  const derivedLatitudeDeg = (Math.atan(palabhaShadow / 12) * 180) / Math.PI;

  // Dual-City Geodesy (Lanka vs Ujjain / Earth Circumference):
  const deltaLatitudeDeg = Math.abs(geodesyLat2 - geodesyLat1);
  const computedCircumferenceYojanas = deltaLatitudeDeg > 0 ? (geodesyDistanceYojanas * 360) / deltaLatitudeDeg : 0;
  const computedDiameterYojanas = computedCircumferenceYojanas > 0 ? computedCircumferenceYojanas / Math.PI : 0;
  const computedCircumferenceKm = computedCircumferenceYojanas * 8.045;
  const computedDiameterKm = computedDiameterYojanas * 8.045;

  // Bījagaṇita Calculations:
  const numA = bijaSignA === 'dhana' ? bijaValA : -bijaValA;
  const numB = bijaSignB === 'dhana' ? bijaValB : -bijaValB;
  let bijaResultNum: number | string = 0;
  let bijaResultDesc = '';
  if (bijaOp === '+') {
    bijaResultNum = numA + numB;
    bijaResultDesc = `(${numA >= 0 ? `+${numA}` : numA}) + (${numB >= 0 ? `+${numB}` : numB}) = ${bijaResultNum >= 0 ? `+${bijaResultNum}` : bijaResultNum}`;
  } else if (bijaOp === '-') {
    bijaResultNum = numA - numB;
    bijaResultDesc = `(${numA >= 0 ? `+${numA}` : numA}) - (${numB >= 0 ? `+${numB}` : numB}) = ${bijaResultNum >= 0 ? `+${bijaResultNum}` : bijaResultNum}`;
  } else if (bijaOp === '*') {
    bijaResultNum = numA * numB;
    bijaResultDesc = `(${numA >= 0 ? `+${numA}` : numA}) × (${numB >= 0 ? `+${numB}` : numB}) = ${bijaResultNum >= 0 ? `+${bijaResultNum}` : bijaResultNum}`;
  } else if (bijaOp === '/') {
    if (numB === 0) {
      bijaResultNum = 'Khahara (खहर / ∞)';
      bijaResultDesc = `${numA} / 0 = Khahara (Infinity)`;
    } else {
      bijaResultNum = Number((numA / numB).toFixed(2));
      bijaResultDesc = `(${numA >= 0 ? `+${numA}` : numA}) ÷ (${numB >= 0 ? `+${numB}` : numB}) = ${bijaResultNum}`;
    }
  }

  // Seasonal Solar Tilt (Krānti) & Solstice Shadows:
  const obliquityDeg = 24.0; // Ancient Indian standard maximum tilt (Krānti-Pāta)
  const obliquityRad = (obliquityDeg * Math.PI) / 180;
  const solarLongRad = (seasonalSolarLongitude * Math.PI) / 180;
  const sinDeclination = Math.sin(solarLongRad) * Math.sin(obliquityRad);
  const declinationRad = Math.asin(sinDeclination);
  const declinationDeg = (declinationRad * 180) / Math.PI;
  const zenithDistanceDeg = seasonalObserverLat - declinationDeg;
  const zenithDistanceRad = (zenithDistanceDeg * Math.PI) / 180;
  const seasonalShadowLength = 12 * Math.tan(Math.abs(zenithDistanceRad));
  const isZeroShadowDay = Math.abs(zenithDistanceDeg) < 0.6;
  const currentRashiForSeason = ZODIAC_SIGNS[Math.floor((seasonalSolarLongitude % 360) / 30)] || ZODIAC_SIGNS[0];

  // Leaping Monkeys Quadratic Riddle: (x / k)^2 + m = x => x^2 - k^2 x + k^2 m = 0
  const kSquared = monkeyDivisor * monkeyDivisor;
  const monkeyQuadB = -kSquared;
  const monkeyQuadC = kSquared * monkeysOnHill;
  const monkeyDisc = monkeyQuadB * monkeyQuadB - 4 * 1 * monkeyQuadC;
  const monkeyRoot1 = monkeyDisc >= 0 ? (-monkeyQuadB + Math.sqrt(monkeyDisc)) / 2 : 0;
  const monkeyRoot2 = monkeyDisc >= 0 ? (-monkeyQuadB - Math.sqrt(monkeyDisc)) / 2 : 0;

  // Custom Quadratic Solver (Śrīdhara's Method): ax^2 + bx + c = 0
  const customDisc = customQuadB * customQuadB - 4 * customQuadA * customQuadC;
  const customRoot1 = customQuadA !== 0 && customDisc >= 0 ? (-customQuadB + Math.sqrt(customDisc)) / (2 * customQuadA) : null;
  const customRoot2 = customQuadA !== 0 && customDisc >= 0 ? (-customQuadB - Math.sqrt(customDisc)) / (2 * customQuadA) : null;

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
            { id: 'chhaya', label: '☀️ Gnomon Shadows (Chāyā)', sub: 'Double-Shadows & Latitude' },
            { id: 'bijaganita', label: '🧮 Bījagaṇita Algebra', sub: 'Ṛṇa, Dhana & Khahara' },
            { id: 'yantra_goladhyaya', label: '🔭 Observatories & Heliocentrism', sub: 'Yantras & Nīlakaṇṭha' },
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

            {/* Derived Latitude Banner & Akṣa-Karṇa Triangle */}
            <div style={{ background: '#ffffff', borderRadius: '10px', border: '1px solid #93c5fd', padding: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#1e40af', textTransform: 'uppercase' }}>
                    Derived Terrestrial Latitude (Akṣāṃśa θ):
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#1d4ed8', marginTop: '0.2rem' }}>
                    θ = {derivedLatitudeDeg.toFixed(2)}° North
                  </div>
                  <div style={{ fontSize: '0.84rem', color: '#334155', marginTop: '0.35rem', lineHeight: 1.5 }}>
                    • <strong>Vertical Altitude (Gnomon):</strong> 12 Aṅgulas<br />
                    • <strong>Horizontal Base (Palabhā):</strong> {palabhaShadow} Aṅgulas<br />
                    • <strong>Hypotenuse (Akṣa-Karṇa):</strong> √(12² + {palabhaShadow}²) = <strong>{akshaKarna.toFixed(2)} Aṅgulas</strong><br />
                    • <strong>Native Indian Sine (Akṣa-Jyā):</strong> sin(θ) = Palabhā / Akṣa-Karṇa = {palabhaShadow} / {akshaKarna.toFixed(2)} = <strong>{derivedSinTheta.toFixed(4)}</strong>
                  </div>
                </div>

                {/* SVG Triangle of Akṣa-Karṇa */}
                <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                    Akṣa-Karṇa (अक्षकर्ण) Right-Angle Geometry
                  </div>
                  <svg viewBox="0 0 220 120" style={{ width: '100%', maxHeight: '110px' }}>
                    {/* Triangle */}
                    <polygon points="30,100 190,100 30,20" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
                    {/* Vertical: Gnomon = 12 */}
                    <text x="18" y="65" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0369a1">12</text>
                    {/* Base: Palabha */}
                    <text x="110" y="114" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0284c7">Palabhā = {palabhaShadow}</text>
                    {/* Hypotenuse: Aksha Karna */}
                    <text x="125" y="50" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#7c3aed" transform="rotate(-26, 125, 50)">
                      Karṇa = {akshaKarna.toFixed(1)}
                    </text>
                    {/* Angle theta arc */}
                    <path d="M 60,100 A 30,30 0 0,0 55,87" fill="none" stroke="#d97706" strokeWidth="2" />
                    <text x="70" y="93" fontSize="10" fontWeight="bold" fill="#d97706">θ={derivedLatitudeDeg.toFixed(1)}°</text>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Section C: Earth Curvature & Dual-City Geodesy (Paridhi & Vyāsa) */}
          <div style={{ background: '#f0fdf4', border: '1.5px solid #bbf7d0', borderRadius: '12px', padding: '1.25rem', marginTop: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#16a34a', textTransform: 'uppercase' }}>
                  Spherical Geodesy · Bhūgola (भूगोल) &amp; Meridian Arc Measurement
                </span>
                <h4 style={{ margin: '0.2rem 0 0', fontSize: '1.15rem', fontWeight: 800, color: '#14532d' }}>
                  🌍 Calculating Earth&apos;s Spherical Circumference &amp; Diameter (Vyāsa)
                </h4>
              </div>
              <div style={{ background: '#dcfce7', padding: '0.35rem 0.75rem', borderRadius: '8px', border: '1px solid #86efac', fontSize: '0.84rem', fontWeight: 800, color: '#166534', fontFamily: 'monospace' }}>
                Circumference = (Distance × 360°) / Δθ
              </div>
            </div>

            <p style={{ fontSize: '0.86rem', color: '#166534', lineHeight: 1.5, margin: '0 0 1rem' }}>
              In the <em>Sūrya Siddhānta</em> and Bhāskarācārya&apos;s <em>Golādhyāya</em>, the Earth is established as a suspended sphere (<em>Bhūgola</em>). If two observers set up 12-aṅgula gnomons along the same longitudinal meridian at different latitudes at equinoctial noon, the difference in latitude (Δθ) equals the angular arc subtended at the Earth&apos;s core! Knowing the overland distance in Yojanas, a simple Rule of Three yields the Earth&apos;s total circumference and diameter.
            </p>

            {/* Presets */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
              {[
                {
                  id: 'lanka_ujjain',
                  label: '🏛️ Lanka (Equator, 0° N) to Ujjain (Tropic of Cancer, 23.2° N)',
                  lat1: 0.0,
                  lat2: 23.2,
                  dist: 320,
                  sub: 'Ancient Prime Meridian (Yāmyottara-Rekhā) · 320 Yojanas',
                },
                {
                  id: 'ujjain_kashmir',
                  label: '🏔️ Ujjain (23.2° N) to Kashmir / Śāradā Pīṭha (34.3° N)',
                  lat1: 23.2,
                  lat2: 34.3,
                  dist: 153,
                  sub: 'Northern Observatory Meridian · 153 Yojanas',
                },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setGeodesyPreset(p.id as any);
                    setGeodesyLat1(p.lat1);
                    setGeodesyLat2(p.lat2);
                    setGeodesyDistanceYojanas(p.dist);
                  }}
                  style={{
                    padding: '0.45rem 0.8rem',
                    borderRadius: '8px',
                    border: geodesyPreset === p.id ? '1.5px solid #16a34a' : '1px solid #cbd5e1',
                    background: geodesyPreset === p.id ? '#dcfce7' : '#ffffff',
                    color: geodesyPreset === p.id ? '#14532d' : '#334155',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <div>{p.label}</div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{p.sub}</div>
                </button>
              ))}
            </div>

            {/* Sliders for Geodesy */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem', marginBottom: '1rem' }}>
              <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                  <span>Station 1 Latitude (θ₁):</span>
                  <span style={{ fontWeight: 800, color: '#16a34a' }}>{geodesyLat1.toFixed(1)}° N</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={60}
                  step={0.5}
                  value={geodesyLat1}
                  onChange={(e) => {
                    setGeodesyPreset('custom');
                    setGeodesyLat1(parseFloat(e.target.value));
                  }}
                  style={{ width: '100%', accentColor: '#16a34a' }}
                />
              </div>

              <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                  <span>Station 2 Latitude (θ₂):</span>
                  <span style={{ fontWeight: 800, color: '#0284c7' }}>{geodesyLat2.toFixed(1)}° N</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={60}
                  step={0.5}
                  value={geodesyLat2}
                  onChange={(e) => {
                    setGeodesyPreset('custom');
                    setGeodesyLat2(parseFloat(e.target.value));
                  }}
                  style={{ width: '100%', accentColor: '#0284c7' }}
                />
              </div>

              <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                  <span>Overland Distance (Yojanas):</span>
                  <span style={{ fontWeight: 800, color: '#d97706' }}>{geodesyDistanceYojanas} Yojanas</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={800}
                  step={10}
                  value={geodesyDistanceYojanas}
                  onChange={(e) => {
                    setGeodesyPreset('custom');
                    setGeodesyDistanceYojanas(parseInt(e.target.value, 10));
                  }}
                  style={{ width: '100%', accentColor: '#d97706' }}
                />
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>1 Yojana ≈ 8.045 km (Indian astronomical standard)</div>
              </div>
            </div>

            {/* Geodesy Calculation Result Banner */}
            <div style={{ background: '#ffffff', borderRadius: '10px', border: '1.5px solid #86efac', padding: '1.15rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#166534', textTransform: 'uppercase' }}>
                  Spherical Geodesic Solution:
                </span>
                <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#15803d', fontFamily: 'monospace' }}>
                  Δθ = |{geodesyLat2.toFixed(1)}° - {geodesyLat1.toFixed(1)}°| = {deltaLatitudeDeg.toFixed(1)}°
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1rem', marginTop: '0.5rem' }}>
                <div style={{ background: '#f0fdf4', padding: '0.85rem', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                  <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#166534', textTransform: 'uppercase' }}>
                    Calculated Circumference (Paridhi):
                  </div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#15803d', marginTop: '0.2rem' }}>
                    {computedCircumferenceYojanas.toFixed(1)} Yojanas
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#166534', marginTop: '0.2rem' }}>
                    ≈ <strong>{computedCircumferenceKm.toFixed(0)} km</strong> (Satellite: 40,075 km)
                  </div>
                </div>

                <div style={{ background: '#f0fdf4', padding: '0.85rem', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                  <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#166534', textTransform: 'uppercase' }}>
                    Calculated Earth Diameter (Vyāsa):
                  </div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#15803d', marginTop: '0.2rem' }}>
                    {computedDiameterYojanas.toFixed(1)} Yojanas
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#166534', marginTop: '0.2rem' }}>
                    ≈ <strong>{computedDiameterKm.toFixed(0)} km</strong> (Satellite mean: 12,742 km)
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '0.85rem', fontSize: '0.84rem', color: '#166534', lineHeight: 1.5 }}>
                🏆 <strong>Bhāskarācārya&apos;s Canonical Measure in Golādhyāya:</strong> Earth&apos;s diameter was computed as exactly <strong>1,581 Yojanas</strong> and circumference as <strong>4,967 Yojanas (~39,960 km)</strong>. Converted using 1 Yojana = 8.045 km, his diameter is <strong>12,719 km</strong>—achieving <strong>99.82% concordance</strong> with NASA satellite metrics (12,742 km) centuries before modern space geodesy!
              </div>
            </div>
          </div>

          {/* Section D: Obliquity of the Ecliptic (Krānti) & Seasonal Shadow Tracker */}
          <div style={{ background: '#fffbeb', border: '1.5px solid #fde68a', borderRadius: '12px', padding: '1.25rem', marginTop: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#b45309', textTransform: 'uppercase' }}>
                  Seasonal Gnomon Dynamics · Krānti-Pāta (क्रांतिपातः / Obliquity = 24°)
                </span>
                <h4 style={{ margin: '0.2rem 0 0', fontSize: '1.15rem', fontWeight: 800, color: '#78350f' }}>
                  ☀️ Obliquity of the Ecliptic &amp; Seasonal Shadow Shifts
                </h4>
              </div>
              <div style={{ background: '#fef3c7', padding: '0.35rem 0.75rem', borderRadius: '8px', border: '1px solid #fcd34d', fontSize: '0.84rem', fontWeight: 800, color: '#92400e', fontFamily: 'monospace' }}>
                sin(δ) = sin(λ) × sin(24°) · Z = θ - δ
              </div>
            </div>

            <p style={{ fontSize: '0.86rem', color: '#78350f', lineHeight: 1.5, margin: '0 0 1rem' }}>
              Ancient Indian astronomers understood that the Sun does not travel along the celestial equator, but on an inclined path (the ecliptic) tilted at <strong>Krānti-Pāta (ε = 24°)</strong>. Because of this axial obliquity, the solar declination (<strong>δ / Krānti</strong>) and the noon shadow of a 12-aṅgula gnomon shift dynamically every day across the tropical year.
            </p>

            {/* Solstice & Equinox Presets */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1rem' }}>
              {[
                { label: '🌻 Summer Solstice (Karka Saṅkrānti)', lon: 90, desc: 'λ = 90° · Max North Tilt (+24°) · Shortest Shadow' },
                { label: '🍂 Autumnal Equinox (Tulā Saṅkrānti)', lon: 180, desc: 'λ = 180° · Zero Tilt (0°) · Shadow = Palabhā' },
                { label: '❄️ Winter Solstice (Makara Saṅkrānti)', lon: 270, desc: 'λ = 270° · Max South Tilt (-24°) · Longest Shadow' },
                { label: '🌸 Vernal Equinox (Meṣa Saṅkrānti)', lon: 0, desc: 'λ = 0° · Zero Tilt (0°) · Shadow = Palabhā' },
              ].map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setSeasonalSolarLongitude(preset.lon)}
                  style={{
                    padding: '0.4rem 0.75rem',
                    borderRadius: '8px',
                    border: seasonalSolarLongitude === preset.lon ? '1.5px solid #b45309' : '1px solid #cbd5e1',
                    background: seasonalSolarLongitude === preset.lon ? '#fef3c7' : '#ffffff',
                    color: seasonalSolarLongitude === preset.lon ? '#92400e' : '#334155',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <div>{preset.label}</div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b' }}>{preset.desc}</div>
                </button>
              ))}
            </div>

            {/* Sliders for Seasonal Tracking */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem', marginBottom: '1rem' }}>
              {/* Solar Longitude (λ) */}
              <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '10px', border: '1px solid #fde68a' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                  <span>Solar Celestial Longitude (λ / Sāyana):</span>
                  <span style={{ fontWeight: 800, color: '#d97706' }}>{seasonalSolarLongitude}°</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={359}
                  step={1}
                  value={seasonalSolarLongitude}
                  onChange={(e) => setSeasonalSolarLongitude(parseInt(e.target.value, 10))}
                  style={{ width: '100%', accentColor: '#d97706' }}
                />
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                  Current Zodiac Station: <strong>{currentRashiForSeason}</strong>
                </div>
              </div>

              {/* Observer Latitude (θ) */}
              <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '10px', border: '1px solid #fde68a' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                  <span>Observer Latitude (Akṣāṃśa θ):</span>
                  <span style={{ fontWeight: 800, color: '#0284c7' }}>{seasonalObserverLat.toFixed(1)}° N</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={45}
                  step={0.5}
                  value={seasonalObserverLat}
                  onChange={(e) => setSeasonalObserverLat(parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: '#0284c7' }}
                />
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                  Ujjain = 23.2° N · Equator = 0° · Kashmir = 34.3° N
                </div>
              </div>
            </div>

            {/* Seasonal Shadow Output Banner */}
            <div style={{ background: '#ffffff', borderRadius: '10px', border: '1.5px solid #fcd34d', padding: '1.15rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '0.85rem' }}>
                <div style={{ background: '#fefce8', padding: '0.85rem', borderRadius: '8px', border: '1px solid #fef08a' }}>
                  <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#854d0e', textTransform: 'uppercase' }}>
                    Solar Declination (Krānti δ):
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: declinationDeg >= 0 ? '#15803d' : '#b45309', marginTop: '0.2rem' }}>
                    {declinationDeg >= 0 ? `+${declinationDeg.toFixed(2)}° (North)` : `${declinationDeg.toFixed(2)}° (South)`}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#854d0e', marginTop: '0.2rem' }}>
                    sin(δ) = sin({seasonalSolarLongitude}°) × sin(24°) = {sinDeclination.toFixed(4)}
                  </div>
                </div>

                <div style={{ background: '#fefce8', padding: '0.85rem', borderRadius: '8px', border: '1px solid #fef08a' }}>
                  <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#854d0e', textTransform: 'uppercase' }}>
                    Solar Zenith Distance (Z):
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#78350f', marginTop: '0.2rem' }}>
                    Z = {zenithDistanceDeg.toFixed(2)}°
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#854d0e', marginTop: '0.2rem' }}>
                    Z = θ - δ = {seasonalObserverLat.toFixed(1)}° - ({declinationDeg.toFixed(1)}°)
                  </div>
                </div>

                <div style={{ background: isZeroShadowDay ? '#ecfdf5' : '#fefce8', padding: '0.85rem', borderRadius: '8px', border: isZeroShadowDay ? '1.5px solid #a7f3d0' : '1px solid #fef08a' }}>
                  <div style={{ fontSize: '0.76rem', fontWeight: 700, color: isZeroShadowDay ? '#065f46' : '#854d0e', textTransform: 'uppercase' }}>
                    Noon Shadow Length (S):
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: isZeroShadowDay ? '#059669' : '#0f172a', marginTop: '0.2rem' }}>
                    {isZeroShadowDay ? '0.0 Aṅgulas!' : `${seasonalShadowLength.toFixed(2)} Aṅgulas`}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: isZeroShadowDay ? '#065f46' : '#854d0e', marginTop: '0.2rem' }}>
                    S = 12 × tan(|Z|) · {zenithDistanceDeg >= 0 ? 'Shadow points North' : 'Shadow points South'}
                  </div>
                </div>
              </div>

              {isZeroShadowDay && (
                <div style={{ marginTop: '0.85rem', background: '#ecfdf5', padding: '0.75rem', borderRadius: '8px', border: '1px solid #a7f3d0', fontSize: '0.84rem', color: '#065f46' }}>
                  ☀️ <strong>Zero Shadow Day (शून्यछाया दिवस)!</strong> Because the observer latitude ({seasonalObserverLat.toFixed(1)}°) matches the Sun&apos;s tropical declination ({declinationDeg.toFixed(1)}°), the Sun is directly vertical at the zenith at solar noon. The 12-aṅgula gnomon casts zero shadow—a phenomenon celebrated annually at the Tropic of Cancer in Ujjain!
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 10: 🧮 BĪJAGAṆITA ALGEBRA (Ṛṇa, Dhana & Khahara)
          ========================================================================= */}
      {activeTab === 'bijaganita' && (
        <div>
          {/* Sanskrit Banner */}
          <div style={{ background: '#fdf2f8', border: '1.5px solid #fbcfe8', borderRadius: '12px', padding: '1.2rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#9d174d', textTransform: 'uppercase' }}>
                Bījagaṇita (बीजगणितम्) · Signed Numbers &amp; Division by Zero (1150 CE)
              </span>
              <button
                type="button"
                onClick={() => onPlayAudio?.('ऋणयोः स्वयोः घाते स्वम् ऋणस्वयोः घाते ऋणम्')}
                style={{
                  padding: '0.25rem 0.65rem',
                  fontSize: '0.76rem',
                  borderRadius: '6px',
                  border: '1px solid #f472b6',
                  background: '#ffffff',
                  cursor: 'pointer',
                  fontWeight: 700,
                  color: '#9d174d',
                }}
              >
                🔊 Chant Bījagaṇita Axiom
              </button>
            </div>
            <div style={{ fontSize: '1.08rem', fontWeight: 800, color: '#831843', lineHeight: 1.6, marginBottom: '0.35rem' }}>
              ऋणयोः स्वयोर्घाते स्वं स्याद् ऋणस्वयोर्वधे ऋणम् ।<br />
              ऋणं शोधितं स्वं भवति स्वं च ऋणम् ॥
            </div>
            <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#be185d', marginBottom: '0.45rem' }}>
              ṛṇayoḥ svayorghāte svaṃ syād ṛṇasvayorvadhe ṛṇam |<br />
              ṛṇaṃ śodhitaṃ svaṃ bhavati svaṃ ca ṛṇam ||
            </div>
            <p style={{ margin: 0, fontSize: '0.86rem', color: '#9d174d', lineHeight: 1.55 }}>
              <strong>Poetic Translation:</strong> <em>&ldquo;The product of two debts (negatives) or two wealths (positives) is wealth (positive). The product of a debt and wealth is a debt. When subtracting, subtract a debt by turning it into wealth, and subtract wealth by turning it into debt!&rdquo;</em>
            </p>
          </div>

          {/* Section 1: Wealth & Debt Interactive Arithmetic Lab */}
          <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#ec4899', textTransform: 'uppercase' }}>
                  Axiomatic Operations
                </span>
                <h4 style={{ margin: '0.2rem 0 0', fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>
                  💰 Dhana (Wealth / +) &amp; Ṛṇa (Debt / -) Calculator
                </h4>
              </div>
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                {(['+', '-', '*', '/'] as const).map((op) => (
                  <button
                    key={op}
                    type="button"
                    onClick={() => setBijaOp(op)}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      border: bijaOp === op ? '2px solid #db2777' : '1px solid #cbd5e1',
                      background: bijaOp === op ? '#fdf2f8' : '#ffffff',
                      color: bijaOp === op ? '#be185d' : '#475569',
                      fontSize: '1rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                    }}
                  >
                    {op === '*' ? '×' : op === '/' ? '÷' : op}
                  </button>
                ))}
              </div>
            </div>

            <p style={{ fontSize: '0.86rem', color: '#475569', lineHeight: 1.5, margin: '0 0 1rem' }}>
              While European algebra considered negative numbers &ldquo;fictitious&rdquo; or &ldquo;absurd&rdquo; until the 17th century, Bhāskarācārya formulated them using the intuitive economic model of assets (<em>Dhana</em>) and liabilities (<em>Ṛṇa</em>).
            </p>

            {/* Operands Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1.15rem' }}>
              {/* Operand A */}
              <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#334155' }}>Operand A (First Quantity):</span>
                  <span style={{ fontSize: '1rem', fontWeight: 800, color: bijaSignA === 'dhana' ? '#16a34a' : '#dc2626' }}>
                    {bijaSignA === 'dhana' ? `+${bijaValA} (Wealth)` : `-${bijaValA} (Debt)`}
                  </span>
                </div>
                {/* Sign Selector */}
                <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.65rem' }}>
                  <button
                    type="button"
                    onClick={() => setBijaSignA('dhana')}
                    style={{
                      flex: 1,
                      padding: '0.35rem',
                      borderRadius: '6px',
                      border: bijaSignA === 'dhana' ? '1.5px solid #16a34a' : '1px solid #cbd5e1',
                      background: bijaSignA === 'dhana' ? '#dcfce7' : '#f8fafc',
                      color: bijaSignA === 'dhana' ? '#166534' : '#475569',
                      fontWeight: 700,
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                    }}
                  >
                    🪙 Dhana (Wealth / +)
                  </button>
                  <button
                    type="button"
                    onClick={() => setBijaSignA('rina')}
                    style={{
                      flex: 1,
                      padding: '0.35rem',
                      borderRadius: '6px',
                      border: bijaSignA === 'rina' ? '1.5px solid #dc2626' : '1px solid #cbd5e1',
                      background: bijaSignA === 'rina' ? '#fee2e2' : '#f8fafc',
                      color: bijaSignA === 'rina' ? '#991b1b' : '#475569',
                      fontWeight: 700,
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                    }}
                  >
                    📜 Ṛṇa (Debt / -)
                  </button>
                </div>
                <input
                  type="range"
                  min={1}
                  max={20}
                  value={bijaValA}
                  onChange={(e) => setBijaValA(parseInt(e.target.value, 10))}
                  style={{ width: '100%', accentColor: bijaSignA === 'dhana' ? '#16a34a' : '#dc2626' }}
                />
              </div>

              {/* Operand B */}
              <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#334155' }}>Operand B (Second Quantity):</span>
                  <span style={{ fontSize: '1rem', fontWeight: 800, color: bijaSignB === 'dhana' ? '#16a34a' : '#dc2626' }}>
                    {bijaSignB === 'dhana' ? `+${bijaValB} (Wealth)` : `-${bijaValB} (Debt)`}
                  </span>
                </div>
                {/* Sign Selector */}
                <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.65rem' }}>
                  <button
                    type="button"
                    onClick={() => setBijaSignB('dhana')}
                    style={{
                      flex: 1,
                      padding: '0.35rem',
                      borderRadius: '6px',
                      border: bijaSignB === 'dhana' ? '1.5px solid #16a34a' : '1px solid #cbd5e1',
                      background: bijaSignB === 'dhana' ? '#dcfce7' : '#f8fafc',
                      color: bijaSignB === 'dhana' ? '#166534' : '#475569',
                      fontWeight: 700,
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                    }}
                  >
                    🪙 Dhana (Wealth / +)
                  </button>
                  <button
                    type="button"
                    onClick={() => setBijaSignB('rina')}
                    style={{
                      flex: 1,
                      padding: '0.35rem',
                      borderRadius: '6px',
                      border: bijaSignB === 'rina' ? '1.5px solid #dc2626' : '1px solid #cbd5e1',
                      background: bijaSignB === 'rina' ? '#fee2e2' : '#f8fafc',
                      color: bijaSignB === 'rina' ? '#991b1b' : '#475569',
                      fontWeight: 700,
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                    }}
                  >
                    📜 Ṛṇa (Debt / -)
                  </button>
                </div>
                <input
                  type="range"
                  min={0}
                  max={20}
                  value={bijaValB}
                  onChange={(e) => setBijaValB(parseInt(e.target.value, 10))}
                  style={{ width: '100%', accentColor: bijaSignB === 'dhana' ? '#16a34a' : '#dc2626' }}
                />
              </div>
            </div>

            {/* Result Box */}
            <div style={{ background: '#fdf2f8', border: '1.5px solid #fbcfe8', borderRadius: '10px', padding: '1.15rem', marginBottom: '1.15rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#9d174d', textTransform: 'uppercase' }}>
                  Bījagaṇita Axiom Result:
                </span>
                <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#be185d', fontFamily: 'monospace' }}>
                  {bijaResultDesc}
                </span>
              </div>

              <div style={{ fontSize: '1.55rem', fontWeight: 900, color: typeof bijaResultNum === 'number' && bijaResultNum < 0 ? '#dc2626' : '#15803d', marginTop: '0.2rem' }}>
                Result = {typeof bijaResultNum === 'number' ? (bijaResultNum >= 0 ? `+${bijaResultNum} (Dhana / Wealth)` : `${bijaResultNum} (Ṛṇa / Debt)`) : bijaResultNum}
              </div>

              {/* Economic Metaphor Explanation */}
              <div style={{ marginTop: '0.65rem', fontSize: '0.86rem', color: '#831843', lineHeight: 1.5 }}>
                {bijaOp === '*' && bijaSignA === 'rina' && bijaSignB === 'rina' && (
                  <span>
                    💡 <strong>The Magic of Negatives:</strong> <em>&ldquo;(-a) × (-b) = +(ab)&rdquo;</em> — Negating a debt or removing a liability represents an economic asset! In Indian algebra, reversing a debt vector yields positive wealth.
                  </span>
                )}
                {bijaOp === '-' && bijaSignB === 'rina' && (
                  <span>
                    💡 <strong>Subtracting a Debt:</strong> <em>&ldquo;(+a) - (-b) = a + b&rdquo;</em> — If someone forgives or cancels a debt of ₹{bijaValB} that you owe, your personal net worth increases by ₹{bijaValB}!
                  </span>
                )}
                {bijaOp === '+' && bijaSignA === 'rina' && bijaSignB === 'rina' && (
                  <span>
                    💡 <strong>Accumulating Debts:</strong> <em>&ldquo;(-a) + (-b) = -(a+b)&rdquo;</em> — Adding two debts together simply produces a larger total debt liability.
                  </span>
                )}
                {bijaOp === '*' && ((bijaSignA === 'dhana' && bijaSignB === 'rina') || (bijaSignA === 'rina' && bijaSignB === 'dhana')) && (
                  <span>
                    💡 <strong>Debt Multiplier:</strong> <em>&ldquo;(+a) × (-b) = -(ab)&rdquo;</em> — Scaling an asset by a negative debt factor results in an overall debt liability.
                  </span>
                )}
                {bijaOp === '/' && bijaValB === 0 && (
                  <span>
                    🌌 <strong>Division by Zero:</strong> When you divide any finite quantity by zero, it does not blow up into an error—it expands into the infinite cosmic reservoir called <strong>Khahara (खहर)</strong>!
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: The Radical / Square Root Breakthrough (Kṛteḥ Asambhavāt) */}
          <div style={{ background: '#fffbeb', border: '1.5px solid #fde68a', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#b45309', textTransform: 'uppercase' }}>
                  The Boundary of Real Numbers · Precursor to Imaginary Numbers (i)
                </span>
                <h4 style={{ margin: '0.2rem 0 0', fontSize: '1.15rem', fontWeight: 800, color: '#78350f' }}>
                  📐 The Square Root Breakthrough: Kṛteḥ Asambhavāt (कृतेः असम्भवात्)
                </h4>
              </div>
              <div style={{ background: '#fef3c7', padding: '0.35rem 0.75rem', borderRadius: '8px', border: '1px solid #fcd34d', fontSize: '0.84rem', fontWeight: 800, color: '#92400e', fontFamily: 'monospace' }}>
                (+x)² = +x² &amp; (-x)² = +x² ⟹ √(-x²) ∉ ℝ
              </div>
            </div>

            <p style={{ fontSize: '0.86rem', color: '#78350f', lineHeight: 1.5, margin: '0 0 1rem' }}>
              Bhāskarācārya formulated a profound law in the <em>Bījagaṇita</em>: <em>&ldquo;A positive number has two square roots (positive and negative). However, a negative number cannot have any real square root, because it is not a square (kṛteḥ asambhavāt).&rdquo;</em>
            </p>

            {/* Interactive Square Root Tester */}
            <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '10px', border: '1px solid #fde68a', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#334155' }}>
                  Select Quantity to Evaluate Square Root:
                </span>
                <span style={{ fontSize: '1.1rem', fontWeight: 900, color: bijaSqrtInput < 0 ? '#dc2626' : '#15803d' }}>
                  x = {bijaSqrtInput}
                </span>
              </div>
              <input
                type="range"
                min={-100}
                max={100}
                step={1}
                value={bijaSqrtInput}
                onChange={(e) => setBijaSqrtInput(parseInt(e.target.value, 10))}
                style={{ width: '100%', accentColor: bijaSqrtInput < 0 ? '#dc2626' : '#15803d', marginBottom: '0.75rem' }}
              />

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {[25, 49, 100, -16, -25, -64].map((presetVal) => (
                  <button
                    key={presetVal}
                    type="button"
                    onClick={() => setBijaSqrtInput(presetVal)}
                    style={{
                      padding: '0.3rem 0.65rem',
                      borderRadius: '6px',
                      border: bijaSqrtInput === presetVal ? '1.5px solid #b45309' : '1px solid #cbd5e1',
                      background: bijaSqrtInput === presetVal ? '#fef3c7' : '#f8fafc',
                      color: bijaSqrtInput === presetVal ? '#92400e' : '#475569',
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Test x = {presetVal}
                  </button>
                ))}
              </div>
            </div>

            {/* Evaluation Banner */}
            {bijaSqrtInput >= 0 ? (
              <div style={{ background: '#ecfdf5', border: '1.5px solid #a7f3d0', borderRadius: '10px', padding: '1rem' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#065f46', textTransform: 'uppercase' }}>
                  Real Dual Square Root:
                </div>
                <div style={{ fontSize: '1.45rem', fontWeight: 900, color: '#047857', marginTop: '0.2rem' }}>
                  √({bijaSqrtInput}) = ± {Math.sqrt(bijaSqrtInput).toFixed(2)}
                </div>
                <p style={{ margin: '0.35rem 0 0', fontSize: '0.84rem', color: '#065f46', lineHeight: 1.5 }}>
                  Both (+{Math.sqrt(bijaSqrtInput).toFixed(2)})² and (-{Math.sqrt(bijaSqrtInput).toFixed(2)})² equal +{bijaSqrtInput}.
                </p>
              </div>
            ) : (
              <div style={{ background: '#fef2f2', border: '1.5px solid #fecaca', borderRadius: '10px', padding: '1rem' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#991b1b', textTransform: 'uppercase' }}>
                  कृतेः असम्भवात् (Kṛteḥ Asambhavāt) · Real Square Root Does Not Exist!
                </div>
                <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#dc2626', marginTop: '0.2rem' }}>
                  √({bijaSqrtInput}) = Non-Existent in Real Arithmetic! (Modern Complex: ± {Math.sqrt(Math.abs(bijaSqrtInput)).toFixed(2)} i)
                </div>
                <p style={{ margin: '0.4rem 0 0', fontSize: '0.84rem', color: '#991b1b', lineHeight: 1.5 }}>
                  Bhāskarācārya noted: <em>&ldquo;Since the square of an asset is positive and the square of a debt is also positive, a negative number cannot be a square. Therefore, no real number multiplied by itself can equal a negative debt!&rdquo;</em> This profound insight anticipated the discovery of imaginary numbers (<strong>i = √-1</strong>) by 400 years!
                </p>
              </div>
            )}
          </div>

          {/* Section 3: Khaharā Rāśiḥ (Infinity & Lord Viṣṇu Invariance) */}
          <div style={{ background: '#f5f3ff', border: '1.5px solid #ddd6fe', borderRadius: '12px', padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#6d28d9', textTransform: 'uppercase' }}>
                  Mathematical Infinity &amp; Cosmic Metaphysics (Bījagaṇita 1.20)
                </span>
                <h4 style={{ margin: '0.2rem 0 0', fontSize: '1.15rem', fontWeight: 800, color: '#4c1d95' }}>
                  🌌 Khaharā Rāśiḥ (खहर): Division by Zero &amp; The Invariant Viṣṇu
                </h4>
              </div>
              <div style={{ background: '#ede9fe', padding: '0.35rem 0.75rem', borderRadius: '8px', border: '1px solid #c4b5fd', fontSize: '0.84rem', fontWeight: 800, color: '#5b21b6', fontFamily: 'monospace' }}>
                a / 0 = ∞ · (∞ ± k = ∞)
              </div>
            </div>

            <p style={{ fontSize: '0.86rem', color: '#4c1d95', lineHeight: 1.5, margin: '0 0 1rem' }}>
              When a finite positive or negative quantity is divided by cipher (zero), Bhāskarācārya terms the result <strong>Khahara</strong> (खहर — &ldquo;divided by Kha/Sky/Zero&rdquo;). He establishes that adding or subtracting finite numbers from Khahara does not alter it, offering one of the most famous verses in the history of mathematics:
            </p>

            <div style={{ background: '#ffffff', borderRadius: '10px', border: '1px solid #c4b5fd', padding: '1rem', marginBottom: '1rem' }}>
              <div style={{ fontSize: '1.02rem', fontWeight: 800, color: '#5b21b6', lineHeight: 1.6, marginBottom: '0.3rem' }}>
                अस्मिन् विकारः खहरे न राशावपि प्रविष्टेष्वपि निःसृतेषु ।<br />
                बहुष्वपि स्याल्लयसृष्टिकालेऽनन्तेऽच्युते भूतगणेषु यद्वत् ॥
              </div>
              <div style={{ fontSize: '0.84rem', fontWeight: 600, color: '#7c3aed', marginBottom: '0.4rem' }}>
                asmin vikāraḥ khahare na rāśāvapi praviṣṭeṣvapi niḥsṛteṣu |<br />
                bahuṣvapi syāllayasṛṣṭikāle&apos;nante&apos;cyute bhūtagaṇeṣu yadvat ||
              </div>
              <p style={{ margin: 0, fontSize: '0.84rem', color: '#4c1d95', lineHeight: 1.55 }}>
                <em>&ldquo;In this Khahara quantity, there is no change or variation even if many quantities enter it or are taken away from it—just as in the infinite, immutable Lord Viṣṇu (Acyuta), there is no change when countless beings and universes enter Him at cosmic dissolution (Laya) or emerge from Him at the dawn of creation (Sṛṣṭi).&rdquo;</em>
              </p>
            </div>

            {/* Interactive Addition to Infinity Slider */}
            <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '10px', border: '1px solid #ddd6fe' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#334155' }}>
                  Add / Subtract Finite Quantity (k) from Khahara (∞):
                </span>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#6d28d9' }}>
                  k = {bijaKhaharaAdd}
                </span>
              </div>
              <input
                type="range"
                min={-1000}
                max={1000}
                step={50}
                value={bijaKhaharaAdd}
                onChange={(e) => setBijaKhaharaAdd(parseInt(e.target.value, 10))}
                style={{ width: '100%', accentColor: '#6d28d9', marginBottom: '0.75rem' }}
              />

              <div style={{ background: '#ede9fe', padding: '0.85rem', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#5b21b6' }}>
                  Khahara (∞) {bijaKhaharaAdd >= 0 ? `+ ${bijaKhaharaAdd}` : `- ${Math.abs(bijaKhaharaAdd)}`} = Khahara (∞)
                </div>
                <div style={{ fontSize: '0.8rem', color: '#6d28d9', marginTop: '0.2rem' }}>
                  Invariance Axiom: ∞ ± k = ∞ (Infinite reservoir remains unchanging)
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Solving Quadratic Equations with Dual Real Roots (The Leaping Monkeys Riddle) */}
          <div style={{ background: '#fefce8', border: '1.5px solid #fef08a', borderRadius: '12px', padding: '1.25rem', marginTop: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#854d0e', textTransform: 'uppercase' }}>
                  Bījagaṇita Varga-Samīkaraṇa · Dual Real Roots &amp; Śrīdhara&apos;s Method
                </span>
                <h4 style={{ margin: '0.2rem 0 0', fontSize: '1.15rem', fontWeight: 800, color: '#713f12' }}>
                  🐒 The Leaping Monkeys Riddle: Dual Positive Real Solutions
                </h4>
              </div>
              <div style={{ background: '#fef9c3', padding: '0.35rem 0.75rem', borderRadius: '8px', border: '1px solid #fde047', fontSize: '0.84rem', fontWeight: 800, color: '#854d0e', fontFamily: 'monospace' }}>
                (x/8)² + 12 = x ⟹ x = 48 or 16
              </div>
            </div>

            {/* Shloka Box */}
            <div style={{ background: '#ffffff', borderRadius: '10px', border: '1px solid #fef08a', padding: '1rem', marginBottom: '1rem' }}>
              <div style={{ fontSize: '1.02rem', fontWeight: 800, color: '#713f12', lineHeight: 1.6, marginBottom: '0.3rem' }}>
                यूथाष्टमांशस्य च वर्गमुक्ताः क्रीडन्ति कान्तारगताः कपीन्द्राः ।<br />
                द्वादश दृश्यन्ते कलहायमानास्ततो वद द्युतिन् यूथप्रमाणम् ॥
              </div>
              <p style={{ margin: '0.35rem 0 0', fontSize: '0.86rem', color: '#854d0e', lineHeight: 1.55 }}>
                <strong>The Riddle:</strong> <em>&ldquo;One-eighth of the total number of monkeys in a troop squared are frolicking joyfully in the grove; the remaining twelve monkeys are seen chattering and screeching on the hill. Tell me, wise mathematician, how many monkeys are in the troop altogether?&rdquo;</em>
              </p>
            </div>

            {/* Interactive Sliders for Riddle Parameters */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem', marginBottom: '1rem' }}>
              <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '10px', border: '1px solid #fef08a' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                  <span>Troop Fraction (1/k):</span>
                  <span style={{ fontWeight: 800, color: '#854d0e' }}>1/{monkeyDivisor}th</span>
                </div>
                <input
                  type="range"
                  min={4}
                  max={12}
                  value={monkeyDivisor}
                  onChange={(e) => setMonkeyDivisor(parseInt(e.target.value, 10))}
                  style={{ width: '100%', accentColor: '#854d0e' }}
                />
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Canonical Riddle: k = 8 (one-eighth squared)</div>
              </div>

              <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '10px', border: '1px solid #fef08a' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                  <span>Remaining Monkeys on Hill (m):</span>
                  <span style={{ fontWeight: 800, color: '#d97706' }}>{monkeysOnHill} monkeys</span>
                </div>
                <input
                  type="range"
                  min={6}
                  max={30}
                  value={monkeysOnHill}
                  onChange={(e) => setMonkeysOnHill(parseInt(e.target.value, 10))}
                  style={{ width: '100%', accentColor: '#d97706' }}
                />
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Canonical Riddle: m = 12 screaming on the hill</div>
              </div>
            </div>

            {/* Śrīdhara's Method Proof Breakdown */}
            <div style={{ background: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0', padding: '1rem', marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#b45309', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                📐 Śrīdhara&apos;s Quadratic Method (Completing the Square by Multiplying by 4a):
              </div>
              <div style={{ fontSize: '0.82rem', color: '#334155', fontFamily: 'monospace', lineHeight: 1.7 }}>
                1. Set up equation: (x / {monkeyDivisor})² + {monkeysOnHill} = x<br />
                2. Clear fraction by multiplying by {kSquared}: x² - {kSquared}x + {monkeyQuadC} = 0<br />
                3. Quadratic coefficients: a = 1, b = {monkeyQuadB}, c = {monkeyQuadC}<br />
                4. Discriminant: D = b² - 4ac = ({monkeyQuadB})² - 4(1)({monkeyQuadC}) = {monkeyQuadB * monkeyQuadB} - {4 * monkeyQuadC} = <strong>{monkeyDisc} = ({Math.sqrt(monkeyDisc)}²)</strong><br />
                5. Roots: x = [-b ± √D] / 2a = [{Math.abs(monkeyQuadB)} ± {Math.sqrt(monkeyDisc)}] / 2
              </div>

              {/* Dual Solution Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem', marginTop: '0.85rem' }}>
                <div style={{ background: '#ecfdf5', padding: '0.85rem', borderRadius: '8px', border: '1.5px solid #a7f3d0' }}>
                  <div style={{ fontSize: '0.76rem', fontWeight: 800, color: '#065f46', textTransform: 'uppercase' }}>
                    Root 1 (Positive Addition):
                  </div>
                  <div style={{ fontSize: '1.45rem', fontWeight: 900, color: '#047857', marginTop: '0.2rem' }}>
                    x₁ = ({Math.abs(monkeyQuadB)} + {Math.sqrt(monkeyDisc)}) / 2 = {monkeyRoot1} Monkeys
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#065f46', marginTop: '0.25rem' }}>
                    ✓ Verification: ({monkeyRoot1}/{monkeyDivisor})² + {monkeysOnHill} = {Math.pow(monkeyRoot1/monkeyDivisor, 2)} + {monkeysOnHill} = {monkeyRoot1}!
                  </div>
                </div>

                <div style={{ background: '#ecfdf5', padding: '0.85rem', borderRadius: '8px', border: '1.5px solid #a7f3d0' }}>
                  <div style={{ fontSize: '0.76rem', fontWeight: 800, color: '#065f46', textTransform: 'uppercase' }}>
                    Root 2 (Positive Subtraction):
                  </div>
                  <div style={{ fontSize: '1.45rem', fontWeight: 900, color: '#047857', marginTop: '0.2rem' }}>
                    x₂ = ({Math.abs(monkeyQuadB)} - {Math.sqrt(monkeyDisc)}) / 2 = {monkeyRoot2} Monkeys
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#065f46', marginTop: '0.25rem' }}>
                    ✓ Verification: ({monkeyRoot2}/{monkeyDivisor})² + {monkeysOnHill} = {Math.pow(monkeyRoot2/monkeyDivisor, 2)} + {monkeysOnHill} = {monkeyRoot2}!
                  </div>
                </div>
              </div>

              <p style={{ margin: '0.85rem 0 0', fontSize: '0.84rem', color: '#854d0e', lineHeight: 1.5 }}>
                💡 <strong>Bhāskarācārya&apos;s Epistemological Discovery:</strong> Prior mathematicians often stopped after calculating the first root. Bhāskara explicitly proves that both 48 and 16 monkeys are legitimate physical solutions satisfying the conditions of the poem.
              </p>
            </div>

            {/* Custom Quadratic & Negative Roots Commentary */}
            <div style={{ background: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0', padding: '1rem' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#7c3aed', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                Custom Quadratic Explorer &amp; Bhāskara&apos;s Negative Root (Ṛṇa) Doctrine
              </div>
              <p style={{ fontSize: '0.82rem', color: '#475569', margin: '0 0 0.75rem' }}>
                Test quadratic equations where one of the roots is negative (e.g., ax² + bx + c = 0):
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.65rem', marginBottom: '0.85rem' }}>
                <div>
                  <label style={{ fontSize: '0.76rem', fontWeight: 700, color: '#334155' }}>Coefficient a:</label>
                  <input
                    type="number"
                    value={customQuadA}
                    onChange={(e) => setCustomQuadA(parseInt(e.target.value, 10) || 1)}
                    style={{ width: '100%', padding: '0.35rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.82rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.76rem', fontWeight: 700, color: '#334155' }}>Coefficient b:</label>
                  <input
                    type="number"
                    value={customQuadB}
                    onChange={(e) => setCustomQuadB(parseInt(e.target.value, 10) || 0)}
                    style={{ width: '100%', padding: '0.35rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.82rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.76rem', fontWeight: 700, color: '#334155' }}>Coefficient c:</label>
                  <input
                    type="number"
                    value={customQuadC}
                    onChange={(e) => setCustomQuadC(parseInt(e.target.value, 10) || 0)}
                    style={{ width: '100%', padding: '0.35rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.82rem' }}
                  />
                </div>
              </div>

              {customDisc >= 0 && customRoot1 !== null && customRoot2 !== null ? (
                <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                  <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a' }}>
                    Roots: x₁ = {customRoot1.toFixed(2)}, x₂ = {customRoot2.toFixed(2)}
                  </div>
                  {(customRoot1 < 0 || customRoot2 < 0) && (
                    <div style={{ marginTop: '0.4rem', fontSize: '0.8rem', color: '#991b1b', lineHeight: 1.5 }}>
                      📜 <strong>Bhāskara&apos;s Ruling on Negative Roots:</strong> <em>&ldquo;When a root evaluates to a negative number (Ṛṇa), it is mathematically true as a directional vector, retrograde distance, or financial debt. However, if the question pertains to counting physical monkeys, people, or ages, the negative solution must be discarded as non-viable in physical reality.&rdquo;</em>
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ background: '#fef2f2', padding: '0.75rem', borderRadius: '8px', border: '1px solid #fecaca', fontSize: '0.82rem', color: '#991b1b' }}>
                  Discriminant D = {customDisc} &lt; 0 ⟹ Roots are complex numbers (Kṛteḥ Asambhavāt)!
                </div>
              )}
            </div>
          </div>

          {/* Section 5: Kuṭṭaka (The Pulverizer) & Planetary Synchronization */}
          {(() => {
            const gcdCalc = (a: number, b: number): { g: number; valli: number[] } => {
              let x = Math.abs(a), y = Math.abs(b);
              const q: number[] = [];
              while (y !== 0) {
                q.push(Math.floor(x / y));
                const rem = x % y;
                x = y;
                y = rem;
              }
              return { g: x, valli: q };
            };
            const { g, valli } = gcdCalc(kuttakaM1, kuttakaM2);
            const offsetDiff = kuttakaR2 - kuttakaR1;
            const isSolvable = offsetDiff % g === 0;
            const lcm = (kuttakaM1 * kuttakaM2) / (g || 1);
            let minAhargana: number | null = null;
            if (isSolvable) {
              const maxSearch = lcm * 2;
              for (let k = 0; k <= maxSearch / kuttakaM1; k++) {
                const cand = kuttakaM1 * k + kuttakaR1;
                if (((cand - kuttakaR2) % kuttakaM2 + kuttakaM2) % kuttakaM2 === 0) {
                  minAhargana = cand;
                  break;
                }
              }
            }

            return (
              <div style={{ background: '#f0fdfa', border: '1.5px solid #99f6e4', borderRadius: '12px', padding: '1.25rem', marginTop: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0d9488', textTransform: 'uppercase' }}>
                      Linear Diophantine Algorithm · कुट्टकगणितम्
                    </span>
                    <h4 style={{ margin: '0.2rem 0 0', fontSize: '1.15rem', fontWeight: 800, color: '#134e4a' }}>
                      🌌 Kuṭṭaka (The Pulverizer) &amp; Planetary Alignment Engine
                    </h4>
                  </div>
                  <div style={{ background: '#ccfbf1', padding: '0.35rem 0.75rem', borderRadius: '8px', border: '1px solid #5eead4', fontSize: '0.84rem', fontWeight: 800, color: '#0f766e', fontFamily: 'monospace' }}>
                    ax - by = c ⟹ x ≡ r₁ (mod m₁), x ≡ r₂ (mod m₂)
                  </div>
                </div>

                <p style={{ fontSize: '0.84rem', color: '#115e59', lineHeight: 1.55, margin: '0 0 0.85rem' }}>
                  Introduced by <strong>Āryabhaṭa (499 CE)</strong> and expanded by <strong>Bhāskara II</strong> and Kerala astronomers (Citrabhānu c. 1530 CE), <em>Kuṭṭaka</em> (&ldquo;the pulverizer&rdquo;) grinds down coefficients via mutual division to solve linear indeterminate equations, synchronizing celestial planetary cycles across centuries.
                </p>

                {/* Preset Scenarios */}
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  {[
                    { m1: 15, m2: 22, r1: 3, r2: 7, label: '🌟 Canonical Vedic Puzzle (m₁=15, m₂=22)' },
                    { m1: 88, m2: 225, r1: 10, r2: 25, label: '🪐 Mercury-Venus Alignment' },
                    { m1: 12, m2: 30, r1: 2, r2: 8, label: '☀️ Jupiter-Saturn Conjunction' },
                  ].map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setKuttakaM1(p.m1);
                        setKuttakaM2(p.m2);
                        setKuttakaR1(p.r1);
                        setKuttakaR2(p.r2);
                      }}
                      style={{
                        fontSize: '0.74rem',
                        padding: '0.3rem 0.6rem',
                        borderRadius: '6px',
                        border: '1px solid #99f6e4',
                        background: '#ffffff',
                        color: '#0f766e',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                {/* Sliders / Inputs */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccfbf1' }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.2rem' }}>
                      Planet A Orbit (m₁): <strong style={{ color: '#0d9488' }}>{kuttakaM1} days</strong>
                    </div>
                    <input
                      type="range"
                      min={3}
                      max={60}
                      value={kuttakaM1}
                      onChange={(e) => setKuttakaM1(parseInt(e.target.value, 10))}
                      style={{ width: '100%', accentColor: '#0d9488' }}
                    />
                    <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '0.2rem' }}>
                      Current Offset (r₁): <input type="number" min={0} max={kuttakaM1 - 1} value={kuttakaR1} onChange={(e) => setKuttakaR1(parseInt(e.target.value, 10) || 0)} style={{ width: '50px', padding: '0.2rem' }} /> days
                    </div>
                  </div>

                  <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccfbf1' }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.2rem' }}>
                      Planet B Orbit (m₂): <strong style={{ color: '#0f766e' }}>{kuttakaM2} days</strong>
                    </div>
                    <input
                      type="range"
                      min={3}
                      max={60}
                      value={kuttakaM2}
                      onChange={(e) => setKuttakaM2(parseInt(e.target.value, 10))}
                      style={{ width: '100%', accentColor: '#0f766e' }}
                    />
                    <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '0.2rem' }}>
                      Current Offset (r₂): <input type="number" min={0} max={kuttakaM2 - 1} value={kuttakaR2} onChange={(e) => setKuttakaR2(parseInt(e.target.value, 10) || 0)} style={{ width: '50px', padding: '0.2rem' }} /> days
                    </div>
                  </div>
                </div>

                {/* Pulverizer Output Box */}
                <div style={{ background: '#ffffff', borderRadius: '10px', border: '1px solid #99f6e4', padding: '1rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>1. Solvability Test:</div>
                      <div style={{ fontSize: '0.84rem', color: '#334155' }}>
                        gcd({kuttakaM1}, {kuttakaM2}) = <strong>{g}</strong>. Offset gap c = {kuttakaR2} - {kuttakaR1} = {offsetDiff}.<br />
                        {isSolvable ? (
                          <span style={{ color: '#059669', fontWeight: 700 }}>✓ Solvable ({offsetDiff} is divisible by {g})</span>
                        ) : (
                          <span style={{ color: '#dc2626', fontWeight: 700 }}>✗ Incompatible alignment (gcd does not divide gap)</span>
                        )}
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>2. Vallī (Quotient Chain):</div>
                      <div style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: '#0f766e' }}>
                        [{valli.join(', ')}]
                      </div>
                      <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Mutual Euclidean division sequence</span>
                    </div>
                  </div>

                  {isSolvable && minAhargana !== null ? (
                    <div style={{ background: '#ecfdf5', padding: '0.85rem', borderRadius: '8px', border: '1.5px solid #6ee7b7' }}>
                      <div style={{ fontSize: '0.76rem', fontWeight: 800, color: '#065f46', textTransform: 'uppercase' }}>
                        🎯 Synchronized Alignment Ahargaṇa (Elapsed Days):
                      </div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#047857', marginTop: '0.2rem' }}>
                        x = {minAhargana} Days
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#065f46', marginTop: '0.25rem' }}>
                        ✓ Planet A: {minAhargana} mod {kuttakaM1} = {minAhargana % kuttakaM1} (Target: {kuttakaR1}) · Total completed orbits = {Math.floor(minAhargana / kuttakaM1)}<br />
                        ✓ Planet B: {minAhargana} mod {kuttakaM2} = {minAhargana % kuttakaM2} (Target: {kuttakaR2}) · Total completed orbits = {Math.floor(minAhargana / kuttakaM2)}
                      </div>
                    </div>
                  ) : (
                    <div style={{ background: '#fef2f2', padding: '0.75rem', borderRadius: '8px', color: '#b91c1c', fontSize: '0.8rem' }}>
                      No whole integer day alignment exists for these orbital parameters!
                    </div>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* =========================================================================
          TAB 11: YANTRA-GOLĀDHYĀYA, NĪLAKAṆṬHA HELIOCENTRISM & CALCULUS
         ========================================================================= */}
      {activeTab === 'yantra_goladhyaya' && (() => {
        // Calculations for Sub-mode 1: Monumental Yantras
        const samratDeltaHours = samratHourAngle - 12;
        const samratHourAngleDeg = samratDeltaHours * 15;
        const samratRadius = 27; // meters
        const samratArcShift2s = ((2 * Math.PI * samratRadius) / 43200) * 1000; // in mm (~3.93 mm)
        const samratShadowDisp = Math.abs(samratRadius * Math.tan((Math.abs(samratHourAngleDeg) * Math.PI) / 180));
        const samratAharganaFrac = (samratHourAngle / 24).toFixed(4);

        const jaiZenithDistDeg = Math.max(0, 90 - jaiPrakashAltitude);
        const jaiAzimuthRad = (jaiPrakashAzimuth * Math.PI) / 180;
        const jaiShadowRadius = (jaiZenithDistDeg / 90) * 75; // px from bowl center
        const jaiShadowX = 100 + jaiShadowRadius * Math.sin(jaiAzimuthRad);
        const jaiShadowY = 100 - jaiShadowRadius * Math.cos(jaiAzimuthRad);

        const ramZenithRad = (ramZenithAngle * Math.PI) / 180;
        const ramFloorShadow = (12 * Math.tan(ramZenithRad)).toFixed(1);
        const ramWallShadow = ramZenithAngle > 45 ? (12 * (1 - 1 / Math.tan(ramZenithRad))).toFixed(1) : '0.0';
        const ramVikshepaEst = (Math.sin(ramZenithRad) * 5.1).toFixed(2);

        // Calculations for Sub-mode 2: Nīlakaṇṭha Orbits
        const ORBIT_PLANETS: Record<
          'mercury' | 'venus' | 'mars' | 'jupiter' | 'saturn',
          { nameSa: string; nameEn: string; color: string; rSun: number; periodDays: number; elongationLimit?: string }
        > = {
          mercury: { nameSa: 'बुध (Budha)', nameEn: 'Mercury', color: '#0284c7', rSun: 35, periodDays: 88, elongationLimit: '28°' },
          venus: { nameSa: 'शुक्र (Śukra)', nameEn: 'Venus', color: '#eab308', rSun: 55, periodDays: 225, elongationLimit: '47°' },
          mars: { nameSa: 'मङ्गल (Maṅgala)', nameEn: 'Mars', color: '#ef4444', rSun: 75, periodDays: 687 },
          jupiter: { nameSa: 'गुरु (Guru)', nameEn: 'Jupiter', color: '#f97316', rSun: 95, periodDays: 4333 },
          saturn: { nameSa: 'शनि (Śani)', nameEn: 'Saturn', color: '#a855f7', rSun: 115, periodDays: 10759 },
        };

        const activePlanet = ORBIT_PLANETS[selectedPlanetKeyOrbit];
        const thetaSunRad = (orbitAnimTime * Math.PI) / 180;
        const sunDist = 70;
        const sunX = 160 + sunDist * Math.cos(thetaSunRad);
        const sunY = 160 + sunDist * Math.sin(thetaSunRad);

        const planetAngleRad = thetaSunRad * (365.25 / activePlanet.periodDays);
        let planetX = 160;
        let planetY = 160;
        if (cosmicModel === 'nilakantha') {
          // Planet orbits Sun; Sun orbits Earth
          planetX = sunX + activePlanet.rSun * Math.cos(planetAngleRad);
          planetY = sunY + activePlanet.rSun * Math.sin(planetAngleRad);
        } else if (cosmicModel === 'geocentric') {
          // Deferent and epicycle around Earth
          const defX = 160 + (sunDist + 20) * Math.cos(thetaSunRad);
          const defY = 160 + (sunDist + 20) * Math.sin(thetaSunRad);
          planetX = defX + (activePlanet.rSun * 0.45) * Math.cos(planetAngleRad * 2);
          planetY = defY + (activePlanet.rSun * 0.45) * Math.sin(planetAngleRad * 2);
        } else {
          // Modern Heliocentric: Sun at center
          planetX = 160 + (activePlanet.rSun + 20) * Math.cos(planetAngleRad);
          planetY = 160 + (activePlanet.rSun + 20) * Math.sin(planetAngleRad);
        }

        // Earth-to-Planet vector angle from Earth-to-Sun
        const earthSunVecX = sunX - 160;
        const earthSunVecY = sunY - 160;
        const earthPlanetVecX = planetX - 160;
        const earthPlanetVecY = planetY - 160;
        const dotProd = earthSunVecX * earthPlanetVecX + earthSunVecY * earthPlanetVecY;
        const magES = Math.sqrt(earthSunVecX * earthSunVecX + earthSunVecY * earthSunVecY);
        const magEP = Math.sqrt(earthPlanetVecX * earthPlanetVecX + earthPlanetVecY * earthPlanetVecY);
        const elongationDeg = Math.acos(Math.max(-1, Math.min(1, dotProd / (magES * magEP)))) * (180 / Math.PI);

        // Calculations for Sub-mode 3: Calculus & Mādhava Series
        const calcThetaRad = (calculusThetaDeg * Math.PI) / 180;
        const calcDeltaRad = (calculusDeltaDeg * Math.PI) / 180;
        const finiteDiffQuotient = (Math.sin(calcThetaRad + calcDeltaRad) - Math.sin(calcThetaRad)) / calcDeltaRad;
        const analyticalCos = Math.cos(calcThetaRad);
        const diffError = Math.abs(finiteDiffQuotient - analyticalCos);

        // Mādhava Pi series
        let madhavaRawSum = 0;
        for (let k = 1; k <= madhavaTermCount; k++) {
          const sign = k % 2 === 1 ? 1 : -1;
          madhavaRawSum += sign * (1 / (2 * k - 1));
        }
        const piRaw = 4 * madhavaRawSum;
        const madhavaTailCorr = (madhavaTermCount) / (4 * Math.pow(madhavaTermCount, 2) + 1);
        const signCorr = madhavaTermCount % 2 === 1 ? -1 : 1;
        const piCorrected = 4 * (madhavaRawSum + signCorr * madhavaTailCorr);
        const truePi = Math.PI;

        // Parameśvara Mean Value Theorem (1431 CE) Calculations
        const mvtX1Rad = (mvtX1Deg * Math.PI) / 180;
        const mvtX2Rad = (mvtX2Deg * Math.PI) / 180;
        const mvtDeltaRad = mvtX2Rad - mvtX1Rad;
        const mvtSecantSlope = Math.abs(mvtDeltaRad) > 1e-6 ? (Math.sin(mvtX2Rad) - Math.sin(mvtX1Rad)) / mvtDeltaRad : Math.cos(mvtX1Rad);
        const mvtMidpointRad = (mvtX1Rad + mvtX2Rad) / 2;
        const mvtMidpointDeg = (mvtX1Deg + mvtX2Deg) / 2;
        const mvtTangentSlope = Math.cos(mvtMidpointRad);
        const mvtEndpointSlope = Math.cos(mvtX1Rad);
        const mvtMidpointError = Math.abs(mvtSecantSlope - mvtTangentSlope);
        const mvtEndpointError = Math.abs(mvtSecantSlope - mvtEndpointSlope);

        // Melakarta Algorithmic Division
        const MELAKARTA_NAMES: Record<number, string> = {
          1: 'Kanakāṅgī', 2: 'Ratnāṅgī', 3: 'Gānamūrti', 4: 'Vanaspati', 5: 'Mānavatī', 6: 'Tānarūpī',
          7: 'Senāvatī', 8: 'Hanumatodi', 9: 'Dhenukā', 10: 'Nāṭakapriyā', 11: 'Kokilapriyā', 12: 'Rūpavatī',
          13: 'Gāyakapriyā', 14: 'Vakuḷābharaṇam', 15: 'Māyāmāḷavagauḷa', 16: 'Cakravākam', 17: 'Sūryakāntam', 18: 'Hāṭakāmbharī',
          19: 'Jhaṅkāradhvani', 20: 'Naṭabhairavī', 21: 'Kīravāṇī', 22: 'Kharaharapriyā', 23: 'Gaurīmanoharī', 24: 'Varuṇapriyā',
          25: 'Mārarañjanī', 26: 'Cārukeśī', 27: 'Sārasāṅgī', 28: 'Harikāmbhoji', 29: 'Dhīraśaṅkarābharaṇa', 30: 'Nāganandinī',
          31: 'Yāgapriyā', 32: 'Rāgavardhanī', 33: 'Gāṅgeyabhūṣaṇī', 34: 'Vāgadhīśvarī', 35: 'Śūlinī', 36: 'Calanāṭa',
          37: 'Sālagam', 38: 'Jalārṇavam', 39: 'Jhālavarāḷi', 40: 'Navanītam', 41: 'Pāvani', 42: 'Raghupriyā',
          43: 'Gavāmbhodhi', 44: 'Bhavapriyā', 45: 'Śubhapantuvarāḷi', 46: 'Ṣaḍvidhamārgiṇī', 47: 'Suvarṇāṅgī', 48: 'Divyamaṇi',
          49: 'Dhavalāmbharī', 50: 'Nāmanārāyaṇī', 51: 'Kāmavardhanī', 52: 'Rāmapriyā', 53: 'Gamanāśrama', 54: 'Viśvambharī',
          55: 'Śyāmalāṅgī', 56: 'Ṣaṇmukhapriyā', 57: 'Siṃhendramadhyamam', 58: 'Hemavatī', 59: 'Dharmavatī', 60: 'Nītīmati',
          61: 'Kāntāmaṇi', 62: 'Ṛṣabhapriyā', 63: 'Latāṅgī', 64: 'Vācaspati', 65: 'Mechakalyāṇī', 66: 'Citrāmbarī',
          67: 'Sucaritrā', 68: 'Jyotiṣsvarūpiṇī', 69: 'Dhātuvardhanī', 70: 'Nāsikābhūṣaṇī', 71: 'Kosalam', 72: 'Rasikapriyā',
        };
        const melaMaType = selectedMelakartaNum <= 36 ? 'Ma₁ (Śuddha Madhyama)' : 'Ma₂ (Prati Madhyama)';
        const melaChakraNum = Math.ceil(selectedMelakartaNum / 6);
        const CHAKRA_NAMES = [
          'Indu (1)', 'Netra (2)', 'Agni (3)', 'Veda (4)', 'Bāṇa (5)', 'Ṛtu (6)',
          'Ṛṣi (7)', 'Vasu (8)', 'Brahmā (9)', 'Diśi (10)', 'Rudra (11)', 'Āditya (12)',
        ];
        const melaChakraName = CHAKRA_NAMES[melaChakraNum - 1] || `Chakra ${melaChakraNum}`;
        const melaRiGaIndex = ((melaChakraNum - 1) % 6) + 1;
        const RIGA_COMBOS = [
          { r: 'R₁ (Śuddha Ri)', g: 'G₁ (Śuddha Ga)', short: 'R₁-G₁' },
          { r: 'R₁ (Śuddha Ri)', g: 'G₂ (Sādhāraṇa Ga)', short: 'R₁-G₂' },
          { r: 'R₁ (Śuddha Ri)', g: 'G₃ (Antara Ga)', short: 'R₁-G₃' },
          { r: 'R₂ (Catuśśruti Ri)', g: 'G₂ (Sādhāraṇa Ga)', short: 'R₂-G₂' },
          { r: 'R₂ (Catuśśruti Ri)', g: 'G₃ (Antara Ga)', short: 'R₂-G₃' },
          { r: 'R₃ (Ṣaṭśruti Ri)', g: 'G₃ (Antara Ga)', short: 'R₃-G₃' },
        ];
        const melaRiGa = RIGA_COMBOS[melaRiGaIndex - 1];
        const melaDhaNiIndex = ((selectedMelakartaNum - 1) % 6) + 1;
        const DHANI_COMBOS = [
          { d: 'D₁ (Śuddha Dha)', n: 'N₁ (Śuddha Ni)', short: 'D₁-N₁' },
          { d: 'D₁ (Śuddha Dha)', n: 'N₂ (Kaiśikī Ni)', short: 'D₁-N₂' },
          { d: 'D₁ (Śuddha Dha)', n: 'N₃ (Kākalī Ni)', short: 'D₁-N₃' },
          { d: 'D₂ (Catuśśruti Dha)', n: 'N₂ (Kaiśikī Ni)', short: 'D₂-N₂' },
          { d: 'D₂ (Catuśśruti Dha)', n: 'N₃ (Kākalī Ni)', short: 'D₂-N₃' },
          { d: 'D₃ (Ṣaṭśruti Dha)', n: 'N₃ (Kākalī Ni)', short: 'D₃-N₃' },
        ];
        const melaDhaNi = DHANI_COMBOS[melaDhaNiIndex - 1];
        const melaRagaName = MELAKARTA_NAMES[selectedMelakartaNum] || `Mela #${selectedMelakartaNum}`;

        // Kaṭapayādi Preset Data
        const KATAPAYADI_PRESETS: Record<
          'pi_madhava' | 'sin_radius' | 'narayaneeyam' | 'raga_kanakangi' | 'raga_harikambhoji' | 'custom',
          { title: string; verseSa: string; verseIast: string; explanation: string; digits: string; resultDisplay: string }
        > = {
          pi_madhava: {
            title: 'Mādhava’s Circumference for 10¹¹ Diameter ⟹ π to 11 Decimals',
            verseSa: 'विबुधनेत्रगजाहिहुताशनत्रिगुणवेदभवारणपुण्यशीलदिन...',
            verseIast: 'vibudha-netra-gajāhi-hutāśana-tri-guṇa-veda-bha-vāraṇa-puṇya-śīla-dina...',
            explanation: 'Circumference of circle with d = 10¹¹: vi(4)-bu(3)-dha(9)-ne(0)-tra(2)-ga(3)-ja(8)-hi(8)-hu(8)-tā(6)-śa(5)... Reversing digits: 314159265359!',
            digits: '4, 3, 9, 0, 2, 3, 8, 8, 3, 3, 6, 4, 0, 0, 7, 1, 4, 1, 4, 2, 1, 5, 1, 3',
            resultDisplay: 'π = 3.14159265359 (Accurate to 11 decimal places!)',
          },
          sin_radius: {
            title: 'Trigonometric Sine Baseline Radius (R = 3438\')',
            verseSa: 'श्रेष्ठं नाम वरिष्ठानाम्',
            verseIast: 'śreṣṭhaṃ nāma variṣṭhānām',
            explanation: 'Total circle = 21,600 arcminutes. Radius R = 21,600 / 2π = 3438\'. Decrypted digits reversed yield 3438 arcminutes.',
            digits: '8, 3, 4, 3',
            resultDisplay: 'R = 3438\' (Standard Baseline Radius in Āryabhaṭīya & Yuktibhāṣā)',
          },
          narayaneeyam: {
            title: 'Nārāyaṇīyam Cosmic Completion Timestamp (1586 CE)',
            verseSa: 'आयुरारोग्यसौख्यम्',
            verseIast: 'ā-yu-rā-ro-gya-sau-khyam',
            explanation: 'Final benediction of Melpathūr Nārāyaṇa Bhaṭṭathiri’s Nārāyaṇīyam at Guruvāyūr: "Long life, good health, and supreme happiness". Syllables decode to ā(0)-yu(1)-rā(2)-ro(2)-gya(1)-sau(7)-khyam(1). Inverted (Aṅkānāṃ Vāmato Gatiḥ), it yields Kali Day 1,712,210 ⟹ Sunday, 8/9 December 1586 CE!',
            digits: '0, 1, 2, 2, 1, 7, 1',
            resultDisplay: 'Kali Day 1,712,210 ⟹ Sunday, 8/9 December 1586 CE (Historic Completion Timestamp)',
          },
          raga_kanakangi: {
            title: 'Carnatic Melakarta Raga #1 (Kanakāṅgī)',
            verseSa: 'कनकाङ्गी',
            verseIast: 'Ka-na-kā-ṅgī',
            explanation: 'First two consonants: Ka = 1, Na = 0. Reversing digits (Aṅkānāṃ Vāmato Gatiḥ) yields 01 ⟹ 1st Melakarta parent scale!',
            digits: '1, 0',
            resultDisplay: 'Rāga Number = 01 (1st Melakarta Scale)',
          },
          raga_harikambhoji: {
            title: 'Carnatic Melakarta Raga #28 (Harikāmbhoji)',
            verseSa: 'हरिकाम्भोजी',
            verseIast: 'Ha-ri-kā-mbho-jī',
            explanation: 'First two consonants: Ha = 8, Ri = 2. Reversing digits yields 28 ⟹ 28th Melakarta parent scale!',
            digits: '8, 2',
            resultDisplay: 'Rāga Number = 28 (28th Melakarta Scale)',
          },
          custom: {
            title: 'Gopī-Bhāgya Devotional Hymn (π/10 to 32 Decimal Places)',
            verseSa: 'गोपीभाग्यमधुव्रातः शृङ्गीशोदधिसन्धिगः । खलजीवितखाताव गलहालासोधरः ॥',
            verseIast: 'gopībhāgyamadhuvrātaḥ śṛṅgīśodadhisandhigaḥ | khalajīvitakhātāva galahālāsodharaḥ ||',
            explanation: 'Dual-meaning poem praising Krishna/Shiva that simultaneously encrypts π/10 = 0.3141592653589793238462643383279... down to 32 decimal places!',
            digits: '3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3, 2, 3, 8, 4, 6, 2, 6, 4, 3, 3, 8, 3, 2, 7, 9',
            resultDisplay: 'π/10 = 0.3141592653589793238462643383279...',
          },
        };

        const parseDevanagariKatapayadi = (text: string): number[] => {
          const charMap: Record<string, number> = {
            'क': 1, 'ख': 2, 'ग': 3, 'घ': 4, 'ङ': 5, 'च': 6, 'छ': 7, 'ज': 8, 'झ': 9, 'ञ': 0,
            'ट': 1, 'ठ': 2, 'ड': 3, 'ढ': 4, 'ण': 5, 'त': 6, 'थ': 7, 'द': 8, 'ध': 9, 'न': 0,
            'प': 1, 'फ': 2, 'ब': 3, 'भ': 4, 'म': 5,
            'य': 1, 'र': 2, 'ल': 3, 'व': 4, 'श': 5, 'ष': 6, 'स': 7, 'ह': 8, 'ळ': 9,
          };
          const digits: number[] = [];
          const chars = Array.from(text);
          for (let i = 0; i < chars.length; i++) {
            const c = chars[i];
            if (charMap[c] !== undefined) {
              if (i + 1 < chars.length && chars[i + 1] === '्') {
                continue;
              }
              digits.push(charMap[c]);
            }
          }
          return digits;
        };

        const parsedCustomDigits = parseDevanagariKatapayadi(customKatapayadiInput);
        const activeKata = katapayadiPreset === 'custom' && customKatapayadiInput !== KATAPAYADI_PRESETS.custom.verseSa
          ? {
              title: 'Custom User Kaṭapayādi Verse / Phrase',
              verseSa: customKatapayadiInput || '(Empty)',
              verseIast: 'Custom Sanskrit text input',
              explanation: `Decoded using the classic rules: vowels ignore/zero, conjunct consonants take trailing consonant. Reverse result: ${[...parsedCustomDigits].reverse().join('')}`,
              digits: parsedCustomDigits.length > 0 ? parsedCustomDigits.join(', ') : 'None detected',
              resultDisplay: parsedCustomDigits.length > 0 ? `Reversed Number = ${[...parsedCustomDigits].reverse().join('')}` : 'Enter Sanskrit text above',
            }
          : KATAPAYADI_PRESETS[katapayadiPreset];

        // Calculations for Precession of the Equinoxes (Ayana-Calana)
        const precessionRateArcsec = precessionModel === 'surya_siddhanta' ? 54 : 50.29;
        const yearsFromEpoch = precessionYear - 285; // Chitra Paksha Zero Ayanamsha Epoch (~285 CE)
        const currentAyanamshaDeg = yearsFromEpoch * (precessionRateArcsec / 3600);
        const ayanamshaNormalized = ((currentAyanamshaDeg % 360) + 360) % 360;
        const fullPrecessionPeriod = Math.round((360 * 3600) / precessionRateArcsec);

        // Zodiac signs for Vernal Equinox drift:
        const zodiacSigns = [
          { nameSa: 'मेष (Meṣa)', nameEn: 'Aries', startDeg: 0 },
          { nameSa: 'मीन (Mīna)', nameEn: 'Pisces', startDeg: 330 },
          { nameSa: 'कुम्भ (Kumbha)', nameEn: 'Aquarius', startDeg: 300 },
          { nameSa: 'मकर (Makara)', nameEn: 'Capricorn', startDeg: 270 },
          { nameSa: 'धनुः (Dhanus)', nameEn: 'Sagittarius', startDeg: 240 },
          { nameSa: 'वृश्चिक (Vṛścika)', nameEn: 'Scorpio', startDeg: 210 },
          { nameSa: 'तुला (Tulā)', nameEn: 'Libra', startDeg: 180 },
          { nameSa: 'कन्या (Kanyā)', nameEn: 'Virgo', startDeg: 150 },
          { nameSa: 'सिंह (Siṃha)', nameEn: 'Leo', startDeg: 120 },
          { nameSa: 'कर्क (Karka)', nameEn: 'Cancer', startDeg: 90 },
          { nameSa: 'मिथुन (Mithuna)', nameEn: 'Gemini', startDeg: 60 },
          { nameSa: 'वृषभ (Vṛṣabha)', nameEn: 'Taurus', startDeg: 30 },
        ];
        const equinoxSiderealLong = ((360 - (currentAyanamshaDeg % 360)) + 360) % 360;
        const currentSign = zodiacSigns.find(s => equinoxSiderealLong >= s.startDeg && equinoxSiderealLong < s.startDeg + 30) || zodiacSigns[1];

        // Calculations for Golabandha (Matsya & Parallax)
        const matsyaR = 60;
        const halfDist = matsyaSeparation / 2;
        const matsyaHalfHeight = halfDist < matsyaR ? Math.sqrt(matsyaR * matsyaR - halfDist * halfDist) : 0;

        const moonP0Deg = 0.95; // ~57 arcminutes
        const pZenithRad = (parallaxZenithDeg * Math.PI) / 180;
        const totalParallaxDeg = moonP0Deg * Math.sin(pZenithRad);
        const lambanaLongShift = (totalParallaxDeg * Math.cos(pZenithRad * 0.7)).toFixed(2);
        const natiLatShift = (totalParallaxDeg * Math.sin(pZenithRad * 0.7)).toFixed(2);

        return (
          <div>
            {/* Sub-mode Switcher */}
            <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
              {[
                { id: 'yantras', label: '🏛️ Monumental Yantras (Jantar Mantar)', sub: 'Samrāt, Jai Prakash & Rām' },
                { id: 'nilakantha_orbit', label: '☀️ Nīlakaṇṭha Geo-Heliocentrism (1501 CE)', sub: 'Tantrasaṅgraha Orbits' },
                { id: 'tatkaliki_calculus', label: '⚡ Tātkālikī Gati & Mādhava Series', sub: 'Differential Calculus & π' },
                { id: 'katapayadi', label: '🔠 Kaṭapayādi Poetic Cipher', sub: 'Mādhava π to 11 Decimals' },
                { id: 'ayana_chalana', label: '🔄 Ayana-Calana (Precession of Equinoxes)', sub: 'Surya Siddhanta vs Kerala' },
                { id: 'golabandha_jesuit', label: '🧭 Golabandha & Jesuit Transmission', sub: 'Matsya Projection & 1582 Reform' },
              ].map((sub) => (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => setYantraSubMode(sub.id as any)}
                  style={{
                    padding: '0.5rem 0.95rem',
                    borderRadius: '8px',
                    border: yantraSubMode === sub.id ? '2px solid #0284c7' : '1px solid #cbd5e1',
                    background: yantraSubMode === sub.id ? '#0284c7' : '#f8fafc',
                    color: yantraSubMode === sub.id ? '#ffffff' : '#334155',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {sub.label}
                </button>
              ))}
            </div>

            {/* SUB-MODE 1: MONUMENTAL YANTRAS */}
            {yantraSubMode === 'yantras' && (
              <div>
                <div style={{ background: '#f0f9ff', border: '1.5px solid #bae6fd', borderRadius: '12px', padding: '1.2rem', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0369a1', textTransform: 'uppercase' }}>
                      Architectural Instrumentation · यन्त्रमन्त्राणि
                    </span>
                    <div style={{ display: 'flex', gap: '0.35rem' }}>
                      {[
                        { id: 'samrat', label: '📐 Bṛhat Samrāt Yantra' },
                        { id: 'jai_prakash', label: '🥣 Jai Prakash Yantra' },
                        { id: 'ram', label: '🏛️ Rām Yantra' },
                      ].map((y) => (
                        <button
                          key={y.id}
                          type="button"
                          onClick={() => setSelectedYantra(y.id as any)}
                          style={{
                            padding: '0.35rem 0.7rem',
                            borderRadius: '6px',
                            border: 'none',
                            background: selectedYantra === y.id ? '#0284c7' : '#e0f2fe',
                            color: selectedYantra === y.id ? '#ffffff' : '#0369a1',
                            fontWeight: 700,
                            fontSize: '0.78rem',
                            cursor: 'pointer',
                          }}
                        >
                          {y.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <h4 style={{ margin: '0 0 0.4rem', fontSize: '1.2rem', fontWeight: 800, color: '#0c4a6e' }}>
                    {selectedYantra === 'samrat' && 'Bṛhat Samrāt Yantra · The Supreme Equinoctial Gnomon (2-Second Accuracy)'}
                    {selectedYantra === 'jai_prakash' && 'Jai Prakash Yantra · Concave Hemispherical Sky Mirror (Direct Reading)'}
                    {selectedYantra === 'ram' && 'Rām Yantra · Twin Cylindrical Inclination & Vikṣepa Meter'}
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.86rem', color: '#0369a1', lineHeight: 1.55 }}>
                    {selectedYantra === 'samrat' && 'Standing 27 meters tall, the giant stone gnomon is aligned precisely with the Earth\'s rotational axis pointing to the celestial North Pole. Flanked by massive curved marble quadrants, its shadow shifts at ~4 mm every 2 seconds, giving astronomers the fractional Ahargaṇa needed for differential calculus velocity updates!'}
                    {selectedYantra === 'jai_prakash' && 'A sunken pair of hollow hemispherical marble bowls dug into the earth. Overhead wires intersect at a center brass plate. The shadow falling on the curved marble directly performs stereographic spherical trigonometry, outputting local altitude, azimuth, and zodiac signs simultaneously without calculations.'}
                    {selectedYantra === 'ram' && 'Twin roofless cylindrical stone structures featuring a vertical central pillar whose height equals the structure radius. Calibrated radial stone pathways allow observers to step right up to the pillar shadow to measure celestial altitude and isolate latitudinal deviation (Vikṣepa).'}
                  </p>
                </div>

                {/* Interactive Controls & Diagram for Selected Yantra */}
                {selectedYantra === 'samrat' && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                    <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.1rem' }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                        ☀️ Local Solar Time Simulation: {Math.floor(samratHourAngle)}:{String(Math.round((samratHourAngle % 1) * 60)).padStart(2, '0')} {samratHourAngle < 12 ? 'AM' : 'PM'}
                      </div>
                      <input
                        type="range"
                        min={6.0}
                        max={18.0}
                        step={0.1}
                        value={samratHourAngle}
                        onChange={(e) => setSamratHourAngle(parseFloat(e.target.value))}
                        style={{ width: '100%', accentColor: '#0284c7', marginBottom: '1rem' }}
                      />

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.6rem', fontSize: '0.8rem' }}>
                        <div style={{ background: '#f8fafc', padding: '0.6rem', borderRadius: '6px' }}>
                          <span style={{ color: '#64748b' }}>Time from Solar Noon:</span><br />
                          <strong style={{ color: '#0f172a' }}>{samratDeltaHours >= 0 ? `+${samratDeltaHours.toFixed(2)}` : samratDeltaHours.toFixed(2)} hrs</strong>
                        </div>
                        <div style={{ background: '#f8fafc', padding: '0.6rem', borderRadius: '6px' }}>
                          <span style={{ color: '#64748b' }}>Hour Angle (H):</span><br />
                          <strong style={{ color: '#0f172a' }}>{samratHourAngleDeg.toFixed(1)}°</strong>
                        </div>
                        <div style={{ background: '#f8fafc', padding: '0.6rem', borderRadius: '6px' }}>
                          <span style={{ color: '#64748b' }}>Quadrant Arc Shift (2s):</span><br />
                          <strong style={{ color: '#0284c7' }}>{samratArcShift2s.toFixed(2)} mm (~4 mm!)</strong>
                        </div>
                        <div style={{ background: '#f8fafc', padding: '0.6rem', borderRadius: '6px' }}>
                          <span style={{ color: '#64748b' }}>Diurnal Ahargaṇa Fraction:</span><br />
                          <strong style={{ color: '#059669', fontFamily: 'monospace' }}>+{samratAharganaFrac} day</strong>
                        </div>
                      </div>

                      <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#ecfdf5', borderRadius: '8px', border: '1px solid #a7f3d0', fontSize: '0.78rem', color: '#065f46' }}>
                        💡 <strong>Why 27 Meters High?</strong> Earth rotates at 360° per 86,400 seconds (1° every 4 minutes). On a standard 12-inch desk gnomon, 2 seconds shifts the shadow by only ~0.04 mm (invisible). On a 27-meter quadrant, the shadow travels <strong>{samratArcShift2s.toFixed(1)} millimeters</strong> in 2 seconds—making microsecond-level diurnal time tracking legible to the naked eye!
                      </div>
                    </div>

                    {/* SVG Visualization of Samrāt Yantra */}
                    <div style={{ background: '#0f172a', borderRadius: '12px', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="280" height="200" viewBox="0 0 280 200">
                        {/* Ground */}
                        <line x1="20" y1="180" x2="260" y2="180" stroke="#475569" strokeWidth="2" />
                        {/* Triangular Gnomon Wall */}
                        <polygon points="40,180 240,180 240,40" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
                        <line x1="40" y1="180" x2="240" y2="40" stroke="#38bdf8" strokeWidth="3" />
                        <text x="130" y="95" fill="#38bdf8" fontSize="10" transform="rotate(-35, 130, 95)" fontWeight="700">Gnomon Axis (27° Lat)</text>
                        {/* Curved Marble Quadrant */}
                        <path d="M 140,180 A 100,100 0 0 0 240,100" fill="none" stroke="#f8fafc" strokeWidth="4" />
                        <text x="180" y="165" fill="#f8fafc" fontSize="9">Marble Quadrant</text>
                        {/* Sun Ray & Shadow */}
                        {(() => {
                          const shadowX = 140 + Math.min(90, Math.max(10, (samratHourAngle - 6) * 8.5));
                          return (
                            <>
                              <circle cx={40 + (samratHourAngle - 6) * 16} cy="25" r="9" fill="#facc15" />
                              <line x1={40 + (samratHourAngle - 6) * 16} y1="25" x2={shadowX} y2="180" stroke="#fde047" strokeDasharray="3 3" opacity="0.6" />
                              <line x1={shadowX} y1="172" x2={shadowX} y2="188" stroke="#ef4444" strokeWidth="3" />
                              <text x={shadowX - 25} y="196" fill="#ef4444" fontSize="9" fontWeight="800">Shadow: {samratShadowDisp.toFixed(1)}m</text>
                            </>
                          );
                        })()}
                      </svg>
                      <div style={{ color: '#94a3b8', fontSize: '0.74rem', marginTop: '0.3rem', textAlign: 'center' }}>
                        Cross-sectional geometry of Bṛhat Samrāt Yantra (Jaipur)
                      </div>
                    </div>
                  </div>
                )}

                {selectedYantra === 'jai_prakash' && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                    <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.1rem' }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                        🧭 Celestial Coordinate Targeting
                      </div>
                      <div style={{ marginBottom: '0.8rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#475569', marginBottom: '0.2rem' }}>
                          <span>Target Azimuth (Digamsha):</span>
                          <strong style={{ color: '#0284c7' }}>{jaiPrakashAzimuth}°</strong>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={360}
                          value={jaiPrakashAzimuth}
                          onChange={(e) => setJaiPrakashAzimuth(parseInt(e.target.value, 10))}
                          style={{ width: '100%', accentColor: '#0284c7' }}
                        />
                      </div>

                      <div style={{ marginBottom: '0.8rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#475569', marginBottom: '0.2rem' }}>
                          <span>Target Altitude (Unnatamsha):</span>
                          <strong style={{ color: '#059669' }}>{jaiPrakashAltitude}°</strong>
                        </div>
                        <input
                          type="range"
                          min={10}
                          max={90}
                          value={jaiPrakashAltitude}
                          onChange={(e) => setJaiPrakashAltitude(parseInt(e.target.value, 10))}
                          style={{ width: '100%', accentColor: '#059669' }}
                        />
                      </div>

                      <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '8px', fontSize: '0.8rem', lineHeight: 1.6 }}>
                        <div><strong>Zenith Distance (Natāmśa):</strong> 90° - {jaiPrakashAltitude}° = <span style={{ color: '#0284c7' }}>{jaiZenithDistDeg}°</span></div>
                        <div><strong>Inverted Hemisphere Mapping:</strong> Zenith is at bowl center; horizon is at bowl rim.</div>
                        <div><strong>Direct Readout:</strong> As shadow touches the inscribed marble curves, observers read Zodiac Longitude (Rāśi) and Anomaly (Śīghra) directly!</div>
                      </div>
                    </div>

                    {/* SVG Bowl Diagram */}
                    <div style={{ background: '#0f172a', borderRadius: '12px', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="220" height="220" viewBox="0 0 200 200">
                        {/* Outer Bowl Rim */}
                        <circle cx="100" cy="100" r="85" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
                        {/* Concentric Altitude Rings */}
                        <circle cx="100" cy="100" r="60" fill="none" stroke="#475569" strokeDasharray="2 2" />
                        <circle cx="100" cy="100" r="35" fill="none" stroke="#475569" strokeDasharray="2 2" />
                        <circle cx="100" cy="100" r="10" fill="none" stroke="#475569" strokeDasharray="2 2" />
                        {/* Crosswires */}
                        <line x1="15" y1="100" x2="185" y2="100" stroke="#94a3b8" strokeWidth="1" />
                        <line x1="100" y1="15" x2="100" y2="185" stroke="#94a3b8" strokeWidth="1" />
                        {/* Center Ring Plate */}
                        <circle cx="100" cy="100" r="5" fill="#fbbf24" stroke="#d97706" />
                        {/* Shadow of Center Plate */}
                        <circle cx={jaiShadowX} cy={jaiShadowY} r="6" fill="#ef4444" opacity="0.8" />
                        <line x1="100" y1="100" x2={jaiShadowX} y2={jaiShadowY} stroke="#f87171" strokeDasharray="2 2" />
                        <text x="100" y="12" fill="#94a3b8" fontSize="8" textAnchor="middle">N (0°)</text>
                        <text x="195" y="103" fill="#94a3b8" fontSize="8">E (90°)</text>
                        <text x="100" y="196" fill="#94a3b8" fontSize="8" textAnchor="middle">S (180°)</text>
                        <text x="5" y="103" fill="#94a3b8" fontSize="8">W (270°)</text>
                      </svg>
                      <div style={{ color: '#94a3b8', fontSize: '0.74rem', marginTop: '0.3rem', textAlign: 'center' }}>
                        Shadow coordinate ({jaiShadowX.toFixed(0)}, {jaiShadowY.toFixed(0)}) inside concave marble hemisphere
                      </div>
                    </div>
                  </div>
                )}

                {selectedYantra === 'ram' && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                    <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.1rem' }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                        🏛️ Cylindrical Pillar &amp; Latitudinal Deviation (Vikṣepa)
                      </div>
                      <div style={{ marginBottom: '0.8rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#475569', marginBottom: '0.2rem' }}>
                          <span>Zenith Angle of Celestial Body:</span>
                          <strong style={{ color: '#a855f7' }}>{ramZenithAngle}°</strong>
                        </div>
                        <input
                          type="range"
                          min={5}
                          max={75}
                          value={ramZenithAngle}
                          onChange={(e) => setRamZenithAngle(parseInt(e.target.value, 10))}
                          style={{ width: '100%', accentColor: '#a855f7' }}
                        />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.6rem', fontSize: '0.8rem' }}>
                        <div style={{ background: '#f8fafc', padding: '0.6rem', borderRadius: '6px' }}>
                          <span style={{ color: '#64748b' }}>Floor Shadow Length:</span><br />
                          <strong style={{ color: '#0f172a' }}>{ramFloorShadow} units</strong>
                        </div>
                        <div style={{ background: '#f8fafc', padding: '0.6rem', borderRadius: '6px' }}>
                          <span style={{ color: '#64748b' }}>Wall Shadow Height:</span><br />
                          <strong style={{ color: '#a855f7' }}>{ramWallShadow} units</strong>
                        </div>
                        <div style={{ background: '#f8fafc', padding: '0.6rem', borderRadius: '6px', gridColumn: 'span 2' }}>
                          <span style={{ color: '#64748b' }}>Derived Orbital Inclination (Vikṣepa):</span><br />
                          <strong style={{ color: '#059669', fontSize: '0.95rem' }}>β ≈ {ramVikshepaEst}° from Ecliptic</strong>
                        </div>
                      </div>

                      <p style={{ margin: '0.75rem 0 0', fontSize: '0.78rem', color: '#64748b', lineHeight: 1.5 }}>
                        The twin cylindrical structures have 30 triangular floor sectors separated by equal gaps, enabling astronomers to walk along graduated radial stone planks to read planetary coordinates without distortion.
                      </p>
                    </div>

                    {/* SVG Diagram of Ram Yantra */}
                    <div style={{ background: '#0f172a', borderRadius: '12px', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="240" height="180" viewBox="0 0 240 180">
                        {/* Cylinder Walls */}
                        <line x1="30" y1="60" x2="30" y2="150" stroke="#cbd5e1" strokeWidth="4" />
                        <line x1="210" y1="60" x2="210" y2="150" stroke="#cbd5e1" strokeWidth="4" />
                        <line x1="30" y1="150" x2="210" y2="150" stroke="#64748b" strokeWidth="2" />
                        {/* Center Pillar */}
                        <rect x="116" y="70" width="8" height="80" fill="#f8fafc" stroke="#94a3b8" />
                        {/* Shadow Ray */}
                        {(() => {
                          const shadowX = 120 + Math.min(80, Math.tan(ramZenithRad) * 60);
                          return (
                            <>
                              <circle cx={120 - Math.sin(ramZenithRad) * 110} cy={20} r="8" fill="#facc15" />
                              <line x1={120} y1="70" x2={shadowX} y2="150" stroke="#c084fc" strokeWidth="2.5" />
                              <line x1={120} y1="150" x2={shadowX} y2="150" stroke="#a855f7" strokeWidth="4" />
                              <text x={shadowX + 5} y="145" fill="#c084fc" fontSize="9" fontWeight="700">Shadow: {ramFloorShadow}</text>
                            </>
                          );
                        })()}
                      </svg>
                      <div style={{ color: '#94a3b8', fontSize: '0.74rem', marginTop: '0.3rem', textAlign: 'center' }}>
                        Rām Yantra central gnomon pillar shadow casting
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* SUB-MODE 2: NĪLAKAṆṬHA GEO-HELIOCENTRIC ORBITS */}
            {yantraSubMode === 'nilakantha_orbit' && (
              <div>
                <div style={{ background: '#fefce8', border: '1.5px solid #fef08a', borderRadius: '12px', padding: '1.2rem', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#854d0e', textTransform: 'uppercase' }}>
                      Kerala School Heliocentrism (1501 CE) · तन्त्रसङ्ग्रहः
                    </span>
                    <span style={{ background: '#fef08a', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800, color: '#713f12' }}>
                      87 Years Before Tycho Brahe (1588 CE)
                    </span>
                  </div>
                  <h4 style={{ margin: '0 0 0.4rem', fontSize: '1.2rem', fontWeight: 800, color: '#713f12' }}>
                    शीघ्रोच्चो भास्करः प्रोक्तः · The Mean Sun as the Center of Planetary Orbits
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.86rem', color: '#854d0e', lineHeight: 1.55 }}>
                    In 1501 CE, Nīlakaṇṭha Somayāji proved in the <em>Tantrasaṅgraha</em> that Mercury, Venus, Mars, Jupiter, and Saturn do not orbit the Earth—they orbit the Sun, and the Sun carries their entire family around the Earth! This unified the Manda (elliptical) and Śīghra (solar anomaly) corrections into a single vector space, eliminating Ptolemy&apos;s equant.
                  </p>
                </div>

                {/* Model Selector & Controls */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                  <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.1rem' }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#334155', marginBottom: '0.6rem' }}>
                      Select Cosmological Model:
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem', marginBottom: '1rem' }}>
                      {[
                        { id: 'nilakantha', label: '☀️ Nīlakaṇṭha (1501 CE)' },
                        { id: 'geocentric', label: '🌍 Ptolemy Geocentric' },
                        { id: 'heliocentric', label: '🌌 Modern Heliocentric' },
                      ].map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setCosmicModel(m.id as any)}
                          style={{
                            padding: '0.45rem 0.3rem',
                            borderRadius: '6px',
                            border: 'none',
                            background: cosmicModel === m.id ? '#854d0e' : '#fef9c3',
                            color: cosmicModel === m.id ? '#ffffff' : '#854d0e',
                            fontWeight: 700,
                            fontSize: '0.74rem',
                            cursor: 'pointer',
                          }}
                        >
                          {m.label}
                        </button>
                      ))}
                    </div>

                    <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#334155', marginBottom: '0.5rem' }}>
                      Select Orbiting Planet:
                    </div>
                    <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                      {(Object.keys(ORBIT_PLANETS) as Array<keyof typeof ORBIT_PLANETS>).map((key) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setSelectedPlanetKeyOrbit(key)}
                          style={{
                            padding: '0.3rem 0.6rem',
                            borderRadius: '6px',
                            border: 'none',
                            background: selectedPlanetKeyOrbit === key ? ORBIT_PLANETS[key].color : '#f1f5f9',
                            color: selectedPlanetKeyOrbit === key ? '#ffffff' : '#475569',
                            fontWeight: 700,
                            fontSize: '0.76rem',
                            cursor: 'pointer',
                          }}
                        >
                          {ORBIT_PLANETS[key].nameSa}
                        </button>
                      ))}
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#475569', marginBottom: '0.2rem' }}>
                        <span>Orbital Epoch / Time Angle:</span>
                        <strong style={{ color: '#854d0e' }}>{orbitAnimTime}°</strong>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={360}
                        step={2}
                        value={orbitAnimTime}
                        onChange={(e) => setOrbitAnimTime(parseInt(e.target.value, 10))}
                        style={{ width: '100%', accentColor: '#854d0e' }}
                      />
                    </div>

                    <div style={{ background: '#fefce8', padding: '0.75rem', borderRadius: '8px', border: '1px solid #fef08a', fontSize: '0.78rem', lineHeight: 1.55 }}>
                      <div><strong>Planet:</strong> {activePlanet.nameSa} ({activePlanet.nameEn})</div>
                      <div><strong>Orbital Period:</strong> {activePlanet.periodDays} Days</div>
                      {activePlanet.elongationLimit && (
                        <div><strong>Maximum Solar Elongation:</strong> <span style={{ color: '#0284c7', fontWeight: 800 }}>{activePlanet.elongationLimit}</span></div>
                      )}
                      <div><strong>Current Angle from Sun:</strong> <span style={{ color: '#d97706', fontWeight: 800 }}>{elongationDeg.toFixed(1)}°</span></div>
                      <div style={{ marginTop: '0.4rem', color: '#713f12' }}>
                        📜 <em>In Yuktibhāṣā (1530 CE), Jyeṣṭhadeva proved that anchoring the planets directly to the Sun turns non-linear latitudinal perturbations (Vikṣepa) into smooth, predictable conic sections!</em>
                      </div>
                    </div>
                  </div>

                  {/* SVG Celestial Orbit Visualizer */}
                  <div style={{ background: '#090d16', borderRadius: '12px', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="320" height="320" viewBox="0 0 320 320">
                      {/* Fixed Anchor at Center */}
                      {cosmicModel === 'heliocentric' ? (
                        <>
                          <circle cx="160" cy="160" r="12" fill="#facc15" stroke="#f59e0b" strokeWidth="2" />
                          <text x="160" y="163" fill="#78350f" fontSize="7" fontWeight="800" textAnchor="middle">☀️ SUN</text>
                        </>
                      ) : (
                        <>
                          <circle cx="160" cy="160" r="10" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2" />
                          <text x="160" y="163" fill="#ffffff" fontSize="7" fontWeight="800" textAnchor="middle">🌍 EARTH</text>
                        </>
                      )}

                      {/* Deferent / Sun Orbit */}
                      {cosmicModel !== 'heliocentric' && (
                        <circle cx="160" cy="160" r={sunDist} fill="none" stroke="#eab308" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
                      )}

                      {/* Moving Sun (in Nīlakaṇṭha & Geocentric) */}
                      {cosmicModel !== 'heliocentric' && (
                        <>
                          <circle cx={sunX} cy={sunY} r="10" fill="#facc15" stroke="#f59e0b" strokeWidth="2" />
                          <text x={sunX} y={sunY + 3} fill="#78350f" fontSize="6" fontWeight="800" textAnchor="middle">☀️ SUN</text>
                        </>
                      )}

                      {/* Orbit of Planet around Sun (Nīlakaṇṭha) */}
                      {cosmicModel === 'nilakantha' && (
                        <circle cx={sunX} cy={sunY} r={activePlanet.rSun} fill="none" stroke={activePlanet.color} strokeWidth="1" strokeDasharray="2 2" opacity="0.7" />
                      )}

                      {/* Moving Planet */}
                      <circle cx={planetX} cy={planetY} r="6" fill={activePlanet.color} stroke="#ffffff" strokeWidth="1.5" />
                      <text x={planetX} y={planetY - 9} fill={activePlanet.color} fontSize="8" fontWeight="800" textAnchor="middle">
                        {activePlanet.nameSa.split(' ')[0]}
                      </text>

                      {/* Sightline Vector from Earth to Planet */}
                      {cosmicModel !== 'heliocentric' && (
                        <line x1="160" y1="160" x2={planetX} y2={planetY} stroke="#ffffff" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
                      )}
                    </svg>
                    <div style={{ color: '#94a3b8', fontSize: '0.74rem', marginTop: '0.3rem', textAlign: 'center' }}>
                      {cosmicModel === 'nilakantha' && 'Nīlakaṇṭha 1501 CE: Five planets orbit the Sun; Sun orbits stationary Earth.'}
                      {cosmicModel === 'geocentric' && 'Ptolemy: Epicycle rolling on deferent around Earth.'}
                      {cosmicModel === 'heliocentric' && 'Modern Heliocentric: Earth and planets orbit Sun.'}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SUB-MODE 3: TĀTKĀLIKĪ GATI & MĀDHAVA SERIES */}
            {yantraSubMode === 'tatkaliki_calculus' && (
              <div>
                <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '1.2rem', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>
                      Infinitesimal Calculus &amp; Infinite Power Series · अवकलनं कलनशास्त्रं च
                    </span>
                    <span style={{ background: '#e0f2fe', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800, color: '#0369a1' }}>
                      Bhāskara II (1150 CE) &amp; Mādhava (1340 CE)
                    </span>
                  </div>
                  <h4 style={{ margin: '0 0 0.4rem', fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                    तात्कालिकी गतिः · Instantaneous Differential Velocity &amp; Mādhava&apos;s Rational Corrections for π
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.86rem', color: '#475569', lineHeight: 1.55 }}>
                    Five centuries before Newton and Leibniz, Bhāskarācārya formulated instantaneous velocity as the derivative of the sine chord: <strong>δ(sin θ) ≈ cos θ · δθ</strong>, and recognized that at orbital turning points (retrogrades &amp; eclipse peaks), instantaneous velocity equals zero. Later, Mādhava derived the infinite series for π with rational end-correction terms yielding 11 decimal places!
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                  {/* Part A: Bhāskara's Differential Motion */}
                  <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.1rem' }}>
                    <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                      ⚡ Part A: Bhāskarācārya&apos;s Differential Derivative: d/dθ(sin θ) = cos θ
                    </div>
                    <div style={{ marginBottom: '0.8rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#475569', marginBottom: '0.2rem' }}>
                        <span>Angle θ:</span>
                        <strong style={{ color: '#0284c7' }}>{calculusThetaDeg}°</strong>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={90}
                        value={calculusThetaDeg}
                        onChange={(e) => setCalculusThetaDeg(parseInt(e.target.value, 10))}
                        style={{ width: '100%', accentColor: '#0284c7' }}
                      />
                    </div>

                    <div style={{ marginBottom: '0.8rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#475569', marginBottom: '0.2rem' }}>
                        <span>Infinitesimal Increment δθ:</span>
                        <strong style={{ color: '#059669' }}>{calculusDeltaDeg.toFixed(2)}°</strong>
                      </div>
                      <input
                        type="range"
                        min={0.01}
                        max={10.0}
                        step={0.05}
                        value={calculusDeltaDeg}
                        onChange={(e) => setCalculusDeltaDeg(parseFloat(e.target.value))}
                        style={{ width: '100%', accentColor: '#059669' }}
                      />
                    </div>

                    <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '8px', fontSize: '0.8rem', lineHeight: 1.6 }}>
                      <div><strong>Finite Difference [sin(θ+δθ) - sin(θ)] / δθ:</strong> <span style={{ fontFamily: 'monospace', color: '#0284c7' }}>{finiteDiffQuotient.toFixed(6)}</span></div>
                      <div><strong>Analytical Cosine cos(θ):</strong> <span style={{ fontFamily: 'monospace', color: '#059669' }}>{analyticalCos.toFixed(6)}</span></div>
                      <div><strong>Difference Error:</strong> <span style={{ fontFamily: 'monospace', color: diffError < 0.001 ? '#16a34a' : '#d97706' }}>{diffError.toFixed(6)}</span></div>
                      {calculusThetaDeg === 90 && (
                        <div style={{ marginTop: '0.4rem', color: '#dc2626', fontWeight: 800 }}>
                          🛑 At θ = 90° (Orbital Apogee / Maximum Eclipse): cos(90°) = 0 ⟹ Instantaneous Velocity vanishes (Fermat&apos;s Theorem 500 years early!).
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Part B: Mādhava's Infinite Series for Pi */}
                  <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.1rem' }}>
                    <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                      ♾️ Part B: Mādhava&apos;s Infinite Series &amp; Rational Correction for π
                    </div>
                    <div style={{ marginBottom: '0.8rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#475569', marginBottom: '0.2rem' }}>
                        <span>Number of Terms (n):</span>
                        <strong style={{ color: '#a855f7' }}>{madhavaTermCount}</strong>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={25}
                        value={madhavaTermCount}
                        onChange={(e) => setMadhavaTermCount(parseInt(e.target.value, 10))}
                        style={{ width: '100%', accentColor: '#a855f7' }}
                      />
                    </div>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#334155', cursor: 'pointer', marginBottom: '0.8rem' }}>
                      <input
                        type="checkbox"
                        checked={useMadhavaCorrection}
                        onChange={(e) => setUseMadhavaCorrection(e.target.checked)}
                        style={{ accentColor: '#a855f7' }}
                      />
                      <span>Apply Mādhava&apos;s Rational Tail Correction: <strong style={{ fontFamily: 'monospace' }}>C_n = n / (4n² + 1)</strong></span>
                    </label>

                    <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '8px', fontSize: '0.8rem', lineHeight: 1.6 }}>
                      <div><strong>Raw Gregory-Leibniz Sum:</strong> <span style={{ fontFamily: 'monospace', color: '#dc2626' }}>{piRaw.toFixed(7)}</span> (Error: {Math.abs(piRaw - truePi).toFixed(5)})</div>
                      <div><strong>Mādhava Corrected Sum:</strong> <span style={{ fontFamily: 'monospace', color: '#16a34a', fontWeight: 800 }}>{piCorrected.toFixed(7)}</span> (Error: {Math.abs(piCorrected - truePi).toFixed(7)})</div>
                      <div><strong>True π:</strong> <span style={{ fontFamily: 'monospace', color: '#0f172a' }}>{truePi.toFixed(7)}</span></div>
                      <div style={{ marginTop: '0.4rem', fontSize: '0.74rem', color: '#64748b' }}>
                        💡 Without correction, 10 terms gives π ≈ 3.04 (terrible!). With Mādhava&apos;s tail factor, just 10 terms yields 3.1415926 (sub-part-per-million accuracy)!
                      </div>
                    </div>
                  </div>

                  {/* Part C: Parameśvara's Mean Value Theorem (1431 CE) */}
                  <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.1rem', gridColumn: '1 / -1' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.6rem' }}>
                      <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#0f172a' }}>
                        📉 Part C: Parameśvara&apos;s Pre-Calculus Mean Value Theorem (1431 CE Siddhānta-Dīpikā)
                      </div>
                      <span style={{ background: '#ecfdf5', color: '#059669', fontSize: '0.72rem', fontWeight: 800, padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                        Secant Slope = Tangent at Midpoint c = (x₁ + x₂)/2
                      </span>
                    </div>

                    <p style={{ fontSize: '0.78rem', color: '#475569', lineHeight: 1.55, margin: '0 0 0.8rem' }}>
                      To track the non-linear acceleration of the Moon approaching perigee for eclipse syzygy, <strong>Vaṭaśśeri Parameśvara (1431 CE)</strong> proved that the finite change in Sine is bounded by the Cosine evaluated at the exact midpoint: <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#0284c7' }}>sin(x₂) - sin(x₁) ≈ (x₂ - x₁) · cos((x₁ + x₂)/2)</span>. This anticipates Cauchy&apos;s 19th-century Mean Value Theorem by over 400 years and eliminates first-order O(Δx) error!
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '0.8rem' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#475569', marginBottom: '0.2rem' }}>
                          <span>Start Anomaly Angle x₁:</span>
                          <strong style={{ color: '#0284c7' }}>{mvtX1Deg}°</strong>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={70}
                          value={mvtX1Deg}
                          onChange={(e) => {
                            const val = parseInt(e.target.value, 10);
                            setMvtX1Deg(val);
                            if (val >= mvtX2Deg) setMvtX2Deg(val + 5);
                          }}
                          style={{ width: '100%', accentColor: '#0284c7' }}
                        />
                      </div>

                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#475569', marginBottom: '0.2rem' }}>
                          <span>End Anomaly Angle x₂:</span>
                          <strong style={{ color: '#059669' }}>{mvtX2Deg}°</strong>
                        </div>
                        <input
                          type="range"
                          min={mvtX1Deg + 1}
                          max={90}
                          value={mvtX2Deg}
                          onChange={(e) => setMvtX2Deg(parseInt(e.target.value, 10))}
                          style={{ width: '100%', accentColor: '#059669' }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.6rem', background: '#f8fafc', padding: '0.8rem', borderRadius: '8px', fontSize: '0.78rem', lineHeight: 1.6 }}>
                      <div>
                        <strong>Secant Slope [sin(x₂) - sin(x₁)] / Δx:</strong>
                        <div style={{ fontFamily: 'monospace', color: '#0f172a', fontWeight: 800 }}>{mvtSecantSlope.toFixed(6)}</div>
                      </div>
                      <div>
                        <strong>Parameśvara Midpoint cos(c) at {mvtMidpointDeg.toFixed(1)}°:</strong>
                        <div style={{ fontFamily: 'monospace', color: '#16a34a', fontWeight: 800 }}>{mvtTangentSlope.toFixed(6)}</div>
                        <span style={{ fontSize: '0.7rem', color: '#16a34a' }}>Error: {mvtMidpointError.toFixed(6)} (O(Δx²) quadratic accuracy!)</span>
                      </div>
                      <div>
                        <strong>Naive Endpoint cos(x₁) at {mvtX1Deg}°:</strong>
                        <div style={{ fontFamily: 'monospace', color: '#dc2626' }}>{mvtEndpointSlope.toFixed(6)}</div>
                        <span style={{ fontSize: '0.7rem', color: '#dc2626' }}>Error: {mvtEndpointError.toFixed(6)} (O(Δx) massive 1st-order error)</span>
                      </div>
                    </div>
                  </div>

                  {/* Part D: Jyeṣṭhadeva's Yuktibhāṣā (1530 CE) Circle Area via Infinite Triangle Integration */}
                  {(() => {
                    const N = circleSlicesN;
                    const R = circleRadiusR;
                    const circumference = 2 * Math.PI * R;
                    const exactArea = Math.PI * R * R;
                    // Inscribed regular N-gon area: N * (1/2 * 2R sin(pi/N) * R cos(pi/N)) = (N / 2) * R^2 * sin(2*pi / N)
                    const inscribedArea = (N / 2) * (R * R) * Math.sin((2 * Math.PI) / N);
                    const diffArea = Math.abs(exactArea - inscribedArea);
                    const accuracyPct = ((1 - diffArea / exactArea) * 100).toFixed(4);
                    const sliceArc = circumference / N;
                    const apothem = R * Math.cos(Math.PI / N);
                    const halfCircumference = Math.PI * R;

                    return (
                      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.1rem', gridColumn: '1 / -1', marginTop: '0.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.6rem' }}>
                          <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#0f172a' }}>
                            🍕 Part D: Jyeṣṭhadeva&apos;s Yuktibhāṣā (1530 CE) — Circle Area via Infinite Triangle Integration
                          </div>
                          <span style={{ background: '#e0f2fe', color: '#0369a1', fontSize: '0.72rem', fontWeight: 800, padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                            A = lim(N→∞) Σ ½ · (C/N) · R = ½ C R = π R²
                          </span>
                        </div>

                        <p style={{ fontSize: '0.78rem', color: '#475569', lineHeight: 1.55, margin: '0 0 0.8rem' }}>
                          In Chapter 6 of the <em>Gaṇita-Yuktibhāṣā</em>, <strong>Jyeṣṭhadeva</strong> provides the world&apos;s first analytical proof for the area of a circle by decomposing it into <em>N</em> infinitesimal triangular wedges. By unrolling and interlocking the sectors alternately, they form a rectangle of width <strong style={{ color: '#0284c7' }}>½ C = πR</strong> and height <strong style={{ color: '#059669' }}>R</strong>. As <em>N → ∞</em>, chord base <em>ds → C/N</em> and apothem <em>h → R</em>, yielding exact Riemann integration 150 years before calculus was formalized in Europe!
                        </p>

                        {/* Interactive Controls */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '0.8rem' }}>
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#475569', marginBottom: '0.2rem' }}>
                              <span>Number of Infinitesimal Slices (N):</span>
                              <strong style={{ color: '#0284c7' }}>{circleSlicesN} wedges</strong>
                            </div>
                            <input
                              type="range"
                              min={4}
                              max={128}
                              step={4}
                              value={circleSlicesN}
                              onChange={(e) => setCircleSlicesN(parseInt(e.target.value, 10))}
                              style={{ width: '100%', accentColor: '#0284c7' }}
                            />
                            <div style={{ display: 'flex', gap: '0.3rem', marginTop: '0.3rem', flexWrap: 'wrap' }}>
                              {[4, 8, 16, 32, 64, 128].map((s) => (
                                <button
                                  key={s}
                                  type="button"
                                  onClick={() => setCircleSlicesN(s)}
                                  style={{
                                    fontSize: '0.68rem',
                                    padding: '0.15rem 0.4rem',
                                    borderRadius: '4px',
                                    border: '1px solid #cbd5e1',
                                    background: circleSlicesN === s ? '#0284c7' : '#f8fafc',
                                    color: circleSlicesN === s ? '#ffffff' : '#334155',
                                    cursor: 'pointer',
                                    fontWeight: 700,
                                  }}
                                >
                                  N={s}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#475569', marginBottom: '0.2rem' }}>
                              <span>Radius R (Vyāsārdha):</span>
                              <strong style={{ color: '#059669' }}>R = {circleRadiusR}</strong>
                            </div>
                            <input
                              type="range"
                              min={1}
                              max={50}
                              value={circleRadiusR}
                              onChange={(e) => setCircleRadiusR(parseInt(e.target.value, 10))}
                              style={{ width: '100%', accentColor: '#059669' }}
                            />
                            <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.35rem' }}>
                              Circumference C = 2πR = {circumference.toFixed(2)} | Half-C = πR = {halfCircumference.toFixed(2)}
                            </div>
                          </div>
                        </div>

                        {/* Integration Metrics & Limit Breakdown */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.6rem', background: '#f8fafc', padding: '0.8rem', borderRadius: '8px', fontSize: '0.78rem', lineHeight: 1.6, marginBottom: '0.8rem' }}>
                          <div>
                            <strong>Exact Circle Area (π R²):</strong>
                            <div style={{ fontFamily: 'monospace', color: '#0f172a', fontWeight: 800 }}>{exactArea.toFixed(4)}</div>
                            <span style={{ fontSize: '0.7rem', color: '#64748b' }}>½ × Circumference × R</span>
                          </div>
                          <div>
                            <strong>N-gon Riemann Sum A_N:</strong>
                            <div style={{ fontFamily: 'monospace', color: '#0284c7', fontWeight: 800 }}>{inscribedArea.toFixed(4)}</div>
                            <span style={{ fontSize: '0.7rem', color: '#0284c7' }}>Accuracy: {accuracyPct}%</span>
                          </div>
                          <div>
                            <strong>Wedge Dimensions:</strong>
                            <div style={{ fontFamily: 'monospace', color: '#059669', fontWeight: 800 }}>
                              Base ds = {sliceArc.toFixed(3)}, Apothem h = {apothem.toFixed(3)}
                            </div>
                            <span style={{ fontSize: '0.7rem', color: '#059669' }}>As N→∞, h → R ({R})</span>
                          </div>
                          <div>
                            <strong>Discrepancy (ΔA):</strong>
                            <div style={{ fontFamily: 'monospace', color: diffArea < 0.05 ? '#16a34a' : '#d97706', fontWeight: 800 }}>
                              {diffArea.toFixed(5)}
                            </div>
                            <span style={{ fontSize: '0.7rem', color: '#64748b' }}>O(1/N²) second-order convergence</span>
                          </div>
                        </div>

                        {/* Visual SVG Diagram: Circle Sectors + Interlocked Rectangular Strip */}
                        <div style={{ background: '#f1f5f9', borderRadius: '8px', padding: '0.8rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#334155', textAlign: 'center' }}>
                            Geometric Transformation: Circular Dissection ➔ Interlocked Rectangular Prism
                          </div>
                          <div style={{ width: '100%', overflowX: 'auto', display: 'flex', justifyContent: 'center' }}>
                            <svg width="480" height="150" viewBox="0 0 480 150" style={{ maxWidth: '100%', height: 'auto' }}>
                              {/* Left: Sliced Circle */}
                              <g transform="translate(80, 75)">
                                <circle cx="0" cy="0" r="60" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
                                {Array.from({ length: Math.min(N, 64) }).map((_, i) => {
                                  const angleStep = (2 * Math.PI) / Math.min(N, 64);
                                  const a1 = i * angleStep;
                                  const a2 = (i + 1) * angleStep;
                                  const x1 = 60 * Math.cos(a1);
                                  const y1 = 60 * Math.sin(a1);
                                  const x2 = 60 * Math.cos(a2);
                                  const y2 = 60 * Math.sin(a2);
                                  const isEven = i % 2 === 0;
                                  return (
                                    <path
                                      key={i}
                                      d={`M 0 0 L ${x1.toFixed(1)} ${y1.toFixed(1)} A 60 60 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)} Z`}
                                      fill={isEven ? '#38bdf8' : '#818cf8'}
                                      fillOpacity="0.45"
                                      stroke="#0284c7"
                                      strokeWidth="0.75"
                                    />
                                  );
                                })}
                                <circle cx="0" cy="0" r="2.5" fill="#0f172a" />
                                <text x="0" y="72" textAnchor="middle" fontSize="9" fontWeight="700" fill="#475569">
                                  Circle (R={R}, N={N})
                                </text>
                              </g>

                              {/* Arrow */}
                              <g transform="translate(185, 75)">
                                <path d="M 0 0 L 25 0 M 20 -4 L 25 0 L 20 4" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                <text x="12" y="-8" textAnchor="middle" fontSize="8" fontWeight="800" fill="#0284c7">
                                  Unroll
                                </text>
                              </g>

                              {/* Right: Alternating Triangular Strip forming Rectangle */}
                              <g transform="translate(230, 25)">
                                {(() => {
                                  const dispW = 220;
                                  const dispH = 65;
                                  const dispN = Math.min(N, 32);
                                  const sliceW = dispW / dispN;
                                  return (
                                    <>
                                      <rect x="0" y="10" width={dispW} height={dispH} fill="#f8fafc" stroke="#94a3b8" strokeDasharray="3,3" strokeWidth="1" />
                                      {Array.from({ length: dispN }).map((_, i) => {
                                        const sx = i * sliceW;
                                        const isEven = i % 2 === 0;
                                        const pathD = isEven
                                          ? `M ${sx} ${10 + dispH} L ${sx + sliceW / 2} 10 L ${sx + sliceW} ${10 + dispH} Z`
                                          : `M ${sx} 10 L ${sx + sliceW / 2} ${10 + dispH} L ${sx + sliceW} 10 Z`;
                                        return (
                                          <path
                                            key={i}
                                            d={pathD}
                                            fill={isEven ? '#38bdf8' : '#818cf8'}
                                            fillOpacity="0.55"
                                            stroke="#4338ca"
                                            strokeWidth="0.8"
                                          />
                                        );
                                      })}
                                      {/* Dimension Labels */}
                                      <text x={dispW / 2} y="5" textAnchor="middle" fontSize="9" fontWeight="800" fill="#0369a1">
                                        Width = ½ C = πR ({halfCircumference.toFixed(1)})
                                      </text>
                                      <text x={dispW + 8} y={10 + dispH / 2} fontSize="9" fontWeight="800" fill="#059669" alignmentBaseline="middle">
                                        Height = R ({R})
                                      </text>
                                      <text x={dispW / 2} y={dispH + 24} textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#334155">
                                        Rectangle Area = (πR) × R = πR² ({exactArea.toFixed(1)})
                                      </text>
                                    </>
                                  );
                                })()}
                              </g>
                            </svg>
                          </div>
                        </div>

                        {/* Sanskrit Shloka from Yuktibhāṣā Chapter 6 */}
                        <div style={{ marginTop: '0.8rem', background: '#f0fdf4', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #bbf7d0', fontSize: '0.78rem' }}>
                          <strong style={{ color: '#166534' }}>📜 Yuktibhāṣā Chapter 6 (Paridhi-Kṣetra-Pramāṇa):</strong>
                          <div style={{ fontStyle: 'italic', color: '#14532d', margin: '0.2rem 0' }}>
                            &ldquo;समवृत्तपरिधेश्छिद्रं समभागैर्विभज्यते । तदर्धं व्यासार्धगुणं वृत्तक्षेत्रफलं भवेत् ॥&rdquo;
                          </div>
                          <div style={{ color: '#15803d', fontSize: '0.74rem' }}>
                            <em>&ldquo;Divide the circumference of the circle into equal microscopic segments. Half the circumference multiplied by the semi-diameter is the exact area of the circular plane.&rdquo;</em>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}

            {/* SUB-MODE 4: KAṬAPAYĀDI POETIC CIPHER */}
            {yantraSubMode === 'katapayadi' && (
              <div>
                <div style={{ background: '#fdf4ff', border: '1.5px solid #f0abfc', borderRadius: '12px', padding: '1.2rem', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#c026d3', textTransform: 'uppercase' }}>
                      Alphanumeric Mnemonic Cryptography · कटपयादि-सङ्केतः
                    </span>
                    <span style={{ background: '#fae8ff', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800, color: '#a21caf' }}>
                      Aṅkānāṃ Vāmato Gatiḥ (Numbers Proceed Right-to-Left)
                    </span>
                  </div>
                  <h4 style={{ margin: '0 0 0.4rem', fontSize: '1.2rem', fontWeight: 800, color: '#86198f' }}>
                    Kaṭapayādi · Encoding Cosmic Constants &amp; 11-Decimal π in Metrical Verse
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.86rem', color: '#a21caf', lineHeight: 1.55 }}>
                    To preserve massive floating-point numbers across centuries without copying errors, Indian mathematicians mapped Sanskrit consonants to digits 0–9. By chanting melodious hymns, scholars transmitted high-precision constants—such as Mādhava&apos;s 11-decimal π or the 72 Melakarta musical scales—flawlessly across millennia.
                  </p>
                </div>

                {/* Preset Selector */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                  <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.1rem' }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#334155', marginBottom: '0.6rem' }}>
                      Select Canonical Kaṭapayādi Cipher Shloka:
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.4rem', marginBottom: '1rem' }}>
                      {[
                        { id: 'pi_madhava', label: '🥧 Mādhava π (11 Decimals)' },
                        { id: 'sin_radius', label: '📐 Sine Radius R = 3438\'' },
                        { id: 'narayaneeyam', label: '⏳ Nārāyaṇīyam Date (1586 CE)' },
                        { id: 'raga_kanakangi', label: '🎵 Rāga #1 Kanakāṅgī' },
                        { id: 'raga_harikambhoji', label: '🎶 Rāga #28 Harikāmbhoji' },
                        { id: 'custom', label: '📜 Gopī-Bhāgya / Custom' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setKatapayadiPreset(item.id as any)}
                          style={{
                            padding: '0.45rem 0.4rem',
                            borderRadius: '6px',
                            border: 'none',
                            background: katapayadiPreset === item.id ? '#c026d3' : '#fae8ff',
                            color: katapayadiPreset === item.id ? '#ffffff' : '#a21caf',
                            fontWeight: 700,
                            fontSize: '0.74rem',
                            cursor: 'pointer',
                          }}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>

                    {katapayadiPreset === 'custom' && (
                      <div style={{ background: '#fdf4ff', border: '1px solid #e879f9', borderRadius: '8px', padding: '0.75rem', marginBottom: '0.85rem' }}>
                        <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#86198f', display: 'block', marginBottom: '0.35rem' }}>
                          ✍️ Interactive Verse / Phrase Input (Edit or enter Sanskrit text):
                        </label>
                        <input
                          type="text"
                          value={customKatapayadiInput}
                          onChange={(e) => setCustomKatapayadiInput(e.target.value)}
                          placeholder="Type Devanagari Sanskrit phrase (e.g., गोपीभाग्यमधुव्रातः)..."
                          style={{
                            width: '100%',
                            padding: '0.45rem 0.6rem',
                            borderRadius: '6px',
                            border: '1px solid #d946ef',
                            fontSize: '0.84rem',
                            fontFamily: 'monospace',
                            color: '#701a75',
                            background: '#ffffff',
                            outline: 'none',
                            boxSizing: 'border-box',
                          }}
                        />
                      </div>
                    )}

                    {/* Shloka Card */}
                    <div style={{ background: '#fdf4ff', border: '1px solid #f0abfc', borderRadius: '10px', padding: '1rem', marginBottom: '0.85rem' }}>
                      <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#86198f', marginBottom: '0.2rem' }}>
                        {activeKata.title}
                      </div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#701a75', lineHeight: 1.6, marginBottom: '0.35rem' }}>
                        {activeKata.verseSa}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#a21caf', fontStyle: 'italic', marginBottom: '0.5rem' }}>
                        {activeKata.verseIast}
                      </div>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#475569', lineHeight: 1.5 }}>
                        {activeKata.explanation}
                      </p>
                    </div>

                    {/* Step-by-Step Decryption Box */}
                    <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                        1. Direct Forward Syllable-to-Digit Extraction:
                      </div>
                      <div style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: '#0f172a', background: '#ffffff', padding: '0.4rem', borderRadius: '6px', border: '1px solid #cbd5e1', marginBottom: '0.6rem', wordBreak: 'break-all' }}>
                        {activeKata.digits}
                      </div>

                      <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                        2. Right-to-Left Reversal (Aṅkānāṃ Vāmato Gatiḥ):
                      </div>
                      <div style={{ fontFamily: 'monospace', fontSize: '1rem', fontWeight: 900, color: '#c026d3', background: '#fae8ff', padding: '0.5rem', borderRadius: '6px', border: '1px solid #f0abfc' }}>
                        {activeKata.resultDisplay}
                      </div>
                    </div>
                  </div>

                  {/* Kaṭapayādi Matrix Grid Table */}
                  <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.1rem' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                      🗺️ The 4-Row Master Cipher Matrix
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', fontSize: '0.76rem', borderCollapse: 'collapse', textAlign: 'center' }}>
                        <thead>
                          <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                            <th style={{ padding: '0.4rem', color: '#475569' }}>Digit</th>
                            <th style={{ padding: '0.4rem', color: '#0284c7' }}>क-वर्ग (Ka)</th>
                            <th style={{ padding: '0.4rem', color: '#059669' }}>ट-वर्ग (Ṭa)</th>
                            <th style={{ padding: '0.4rem', color: '#d97706' }}>प-वर्ग (Pa)</th>
                            <th style={{ padding: '0.4rem', color: '#a855f7' }}>य-वर्ग (Ya)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { d: 1, c1: 'क (ka)', c2: 'ट (ṭa)', c3: 'प (pa)', c4: 'य (ya)' },
                            { d: 2, c1: 'ख (kha)', c2: 'ठ (ṭha)', c3: 'फ (pha)', c4: 'र (ra)' },
                            { d: 3, c1: 'ग (ga)', c2: 'ड (ḍa)', c3: 'ब (ba)', c4: 'ल (la)' },
                            { d: 4, c1: 'घ (gha)', c2: 'ढ (ḍha)', c3: 'भ (bha)', c4: 'व (va)' },
                            { d: 5, c1: 'ङ (ṅa)', c2: 'ण (ṇa)', c3: 'म (ma)', c4: 'श (śa)' },
                            { d: 6, c1: 'च (ca)', c2: 'त (ta)', c3: '-', c4: 'ष (ṣa)' },
                            { d: 7, c1: 'छ (cha)', c2: 'थ (tha)', c3: '-', c4: 'स (sa)' },
                            { d: 8, c1: 'ज (ja)', c2: 'द (da)', c3: '-', c4: 'ह (ha)' },
                            { d: 9, c1: 'झ (jha)', c2: 'ध (dha)', c3: '-', c4: 'ळ (ḷa)' },
                            { d: 0, c1: 'ञ (ña)', c2: 'न (na)', c3: '-', c4: 'क्ष / स्वर (kṣa/vowels)' },
                          ].map((row) => (
                            <tr key={row.d} style={{ borderBottom: '1px solid #f1f5f9' }}>
                              <td style={{ padding: '0.35rem', fontWeight: 800, color: '#0f172a', background: '#f8fafc' }}>{row.d}</td>
                              <td style={{ padding: '0.35rem', color: '#0369a1' }}>{row.c1}</td>
                              <td style={{ padding: '0.35rem', color: '#047857' }}>{row.c2}</td>
                              <td style={{ padding: '0.35rem', color: '#b45309' }}>{row.c3}</td>
                              <td style={{ padding: '0.35rem', color: '#7e22ce' }}>{row.c4}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div style={{ marginTop: '0.75rem', fontSize: '0.74rem', color: '#64748b', lineHeight: 1.5 }}>
                      <strong>Golden Decoding Rules:</strong> (1) Conjoint consonants (e.g. <em>kya</em>, <em>stha</em>): only the final consonant counts. (2) Standalone vowels carry zero or are bypassed. (3) Numbers always read backwards (<em>Aṅkānāṃ Vāmato Gatiḥ</em>).
                    </div>
                  </div>
                </div>

                {/* Interactive Melakarta Raga Swara Division Calculator */}
                <div style={{ background: '#ffffff', border: '1px solid #f0abfc', borderRadius: '12px', padding: '1.1rem', marginTop: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.6rem' }}>
                    <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#86198f' }}>
                      🎵 Carnatic Melakarta Raga Svara Decoder · The Algorithmic Division Formula
                    </div>
                    <span style={{ background: '#fae8ff', color: '#a21caf', fontSize: '0.74rem', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: '4px' }}>
                      Venkatamakhin (1660 CE) · 72 Janaka Ragas
                    </span>
                  </div>

                  <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.55, margin: '0 0 0.85rem' }}>
                    Once a rāga&apos;s name is hashed to its index number <strong style={{ color: '#c026d3' }}>N (1..72)</strong> via Kaṭapayādi, the seven musical notes (svaras: <span style={{ fontFamily: 'monospace' }}>Sa, Ri, Ga, Ma, Pa, Dha, Ni</span>) are extracted deterministically through modular arithmetic:
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#475569', marginBottom: '0.2rem' }}>
                        <span>Select Melakarta Index (N):</span>
                        <strong style={{ color: '#c026d3', fontSize: '0.95rem' }}>#{selectedMelakartaNum} · {melaRagaName}</strong>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={72}
                        value={selectedMelakartaNum}
                        onChange={(e) => setSelectedMelakartaNum(parseInt(e.target.value, 10))}
                        style={{ width: '100%', accentColor: '#c026d3' }}
                      />
                      <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', marginTop: '0.4rem' }}>
                        {[
                          { num: 1, label: '#1 Kanakāṅgī' },
                          { num: 8, label: '#8 Hanumatodi' },
                          { num: 15, label: '#15 Māyāmāḷavagauḷa' },
                          { num: 22, label: '#22 Kharaharapriyā' },
                          { num: 28, label: '#28 Harikāmbhoji' },
                          { num: 29, label: '#29 Dhīraśaṅkarābharaṇa' },
                          { num: 65, label: '#65 Mechakalyāṇī' },
                        ].map((m) => (
                          <button
                            key={m.num}
                            type="button"
                            onClick={() => setSelectedMelakartaNum(m.num)}
                            style={{
                              fontSize: '0.7rem',
                              padding: '0.2rem 0.4rem',
                              borderRadius: '4px',
                              border: selectedMelakartaNum === m.num ? '1px solid #c026d3' : '1px solid #e2e8f0',
                              background: selectedMelakartaNum === m.num ? '#fae8ff' : '#f8fafc',
                              color: selectedMelakartaNum === m.num ? '#86198f' : '#64748b',
                              fontWeight: selectedMelakartaNum === m.num ? 700 : 500,
                              cursor: 'pointer',
                            }}
                          >
                            {m.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Step-by-step Division Breakdown */}
                    <div style={{ background: '#fdf4ff', padding: '0.8rem', borderRadius: '8px', border: '1px solid #f5d0fe', fontSize: '0.78rem', lineHeight: 1.6 }}>
                      <div><strong>1. Madhyama (Ma) Isolation:</strong> N {selectedMelakartaNum <= 36 ? '≤ 36' : '> 36'} ⟹ <span style={{ color: '#c026d3', fontWeight: 800 }}>{melaMaType}</span></div>
                      <div><strong>2. Chakra Ceiling Division ⌈N/6⌉:</strong> ⌈{selectedMelakartaNum}/6⌉ = {melaChakraNum} ({melaChakraName}) ⟹ <span style={{ color: '#0284c7', fontWeight: 800 }}>{melaRiGa.r} + {melaRiGa.g}</span></div>
                      <div><strong>3. Remainder Modulo ((N-1) mod 6)+1:</strong> Remainder = {melaDhaNiIndex} ⟹ <span style={{ color: '#059669', fontWeight: 800 }}>{melaDhaNi.d} + {melaDhaNi.n}</span></div>
                    </div>
                  </div>

                  {/* Complete Svara Scale Pill */}
                  <div style={{ background: '#f8fafc', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700 }}>
                      Complete 7-Svara Scale (Arohana / Avarohana):
                    </div>
                    <div style={{ fontFamily: 'monospace', fontSize: '0.92rem', fontWeight: 900, color: '#0f172a', background: '#ffffff', padding: '0.35rem 0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                      Sa — <span style={{ color: '#0284c7' }}>{melaRiGa.short.split('-')[0]}</span> — <span style={{ color: '#0284c7' }}>{melaRiGa.short.split('-')[1]}</span> — <span style={{ color: '#c026d3' }}>{selectedMelakartaNum <= 36 ? 'M₁' : 'M₂'}</span> — Pa — <span style={{ color: '#059669' }}>{melaDhaNi.short.split('-')[0]}</span> — <span style={{ color: '#059669' }}>{melaDhaNi.short.split('-')[1]}</span> — Ṡ
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SUB-MODE 5: AYANA-CALANA (PRECESSION OF THE EQUINOXES) */}
            {yantraSubMode === 'ayana_chalana' && (
              <div>
                <div style={{ background: '#f0fdf4', border: '1.5px solid #bbf7d0', borderRadius: '12px', padding: '1.2rem', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#16a34a', textTransform: 'uppercase' }}>
                      Axial Precession &amp; Millennial Calibration · अयनचलनम् अयनांशश्च
                    </span>
                    <span style={{ background: '#dcfce7', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800, color: '#15803d' }}>
                      ~25,772-Year Great Cosmic Year
                    </span>
                  </div>
                  <h4 style={{ margin: '0 0 0.4rem', fontSize: '1.2rem', fontWeight: 800, color: '#14532d' }}>
                    Ayana-Calana · The Earth&apos;s Cosmic Wobble &amp; The Evolution from Pendulum to Full Circle
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.86rem', color: '#15803d', lineHeight: 1.55 }}>
                    Like a giant spinning top, the Earth&apos;s rotational axis slowly traces a circular cone in space over 25,772 years. Early Indian texts modeled this as a ±27° libration pendulum (Āndolana, yielding 54&quot;/yr). By 1501 CE, Nīlakaṇṭha and Kerala astronomers compared millennium-old star charts against their own observations and proved the equinox completes a continuous 360° circle, updating Ayanāṃśa to modern astrophysical precision (~50.29&quot;/yr).
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                  <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.1rem' }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#334155', marginBottom: '0.6rem' }}>
                      Select Precession Calculation Model:
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.4rem', marginBottom: '1rem' }}>
                      <button
                        type="button"
                        onClick={() => setPrecessionModel('surya_siddhanta')}
                        style={{
                          padding: '0.45rem',
                          borderRadius: '6px',
                          border: 'none',
                          background: precessionModel === 'surya_siddhanta' ? '#16a34a' : '#f0fdf4',
                          color: precessionModel === 'surya_siddhanta' ? '#ffffff' : '#16a34a',
                          fontWeight: 700,
                          fontSize: '0.76rem',
                          cursor: 'pointer',
                        }}
                      >
                        Sūrya Siddhānta (54&quot;/yr · 600 rev/Yuga)
                      </button>
                      <button
                        type="button"
                        onClick={() => setPrecessionModel('modern')}
                        style={{
                          padding: '0.45rem',
                          borderRadius: '6px',
                          border: 'none',
                          background: precessionModel === 'modern' ? '#16a34a' : '#f0fdf4',
                          color: precessionModel === 'modern' ? '#ffffff' : '#16a34a',
                          fontWeight: 700,
                          fontSize: '0.76rem',
                          cursor: 'pointer',
                        }}
                      >
                        Kerala / Modern (50.29&quot;/yr · 360° Circle)
                      </button>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#475569', marginBottom: '0.2rem' }}>
                        <span>Target Historical / Future Year:</span>
                        <strong style={{ color: '#16a34a' }}>{precessionYear > 0 ? `${precessionYear} CE` : `${Math.abs(precessionYear)} BCE`}</strong>
                      </div>
                      <input
                        type="range"
                        min={-3000}
                        max={3000}
                        step={25}
                        value={precessionYear}
                        onChange={(e) => setPrecessionYear(parseInt(e.target.value, 10))}
                        style={{ width: '100%', accentColor: '#16a34a' }}
                      />
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748b' }}>
                        <span>3000 BCE (Vedic Kṛttikā)</span>
                        <span>285 CE (Aries 0°)</span>
                        <span>3000 CE (Aquarius)</span>
                      </div>
                    </div>

                    {/* Precession Outputs */}
                    <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.8rem', lineHeight: 1.6 }}>
                      <div><strong>Annual Precession Rate:</strong> <span style={{ fontFamily: 'monospace', color: '#16a34a' }}>{precessionRateArcsec}&quot; arcsec/year</span></div>
                      <div><strong>Full Precession Cycle:</strong> <span style={{ fontFamily: 'monospace', color: '#0f172a' }}>{fullPrecessionPeriod.toLocaleString()} Years</span></div>
                      <div><strong>Ayanāṃśa Offset (from 285 CE Epoch):</strong> <span style={{ fontFamily: 'monospace', color: '#0284c7', fontWeight: 800 }}>+{ayanamshaNormalized.toFixed(2)}° ({Math.floor(ayanamshaNormalized)}° {Math.round((ayanamshaNormalized % 1) * 60)}&apos;)</span></div>
                      <div><strong>Vernal Equinox Constellation:</strong> <span style={{ color: '#d97706', fontWeight: 800 }}>{currentSign.nameSa} ({currentSign.nameEn})</span></div>
                      <div style={{ marginTop: '0.4rem', fontSize: '0.74rem', color: '#475569', lineHeight: 1.5 }}>
                        📜 <strong>Historical Evidence:</strong> In the <em>Śatapatha Brāhmaṇa</em> (~2500 BCE), the vernal equinox occurred in Kṛttikā (Taurus / Pleiades). By Āryabhaṭa’s time (499 CE), it had precessed to Aśvinī (Aries). In 2026 CE, it sits at ~24.3° in Revatī (Pisces), moving steadily toward Kumbha (Aquarius)!
                      </div>
                    </div>
                  </div>

                  {/* SVG Celestial Wobble Cone */}
                  <div style={{ background: '#090d16', borderRadius: '12px', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="260" height="260" viewBox="0 0 260 260">
                      {/* Ecliptic Pole Center */}
                      <circle cx="130" cy="130" r="3" fill="#fbbf24" />
                      <text x="130" y="122" fill="#fbbf24" fontSize="8" fontWeight="800" textAnchor="middle">Ecliptic North Pole</text>

                      {/* 25,772-Year Precession Circle */}
                      <circle cx="130" cy="130" r="80" fill="none" stroke="#334155" strokeWidth="2" strokeDasharray="3 3" />

                      {/* Major Pole Stars on Precession Path */}
                      <circle cx="130" cy="50" r="4" fill="#38bdf8" />
                      <text x="130" y="42" fill="#38bdf8" fontSize="8" fontWeight="800" textAnchor="middle">Polaris (Today)</text>

                      <circle cx="205" cy="100" r="4" fill="#a78bfa" />
                      <text x="210" y="102" fill="#a78bfa" fontSize="7" textAnchor="start">Thuban (3000 BCE)</text>

                      <circle cx="130" cy="210" r="5" fill="#f43f5e" />
                      <text x="130" y="222" fill="#f43f5e" fontSize="8" fontWeight="800" textAnchor="middle">Vega (12,000 CE)</text>

                      {/* Dynamic Earth Axis Pointer for Selected Year */}
                      {(() => {
                        const poleAngleRad = ((yearsFromEpoch / fullPrecessionPeriod) * 2 * Math.PI) - (Math.PI / 2);
                        const poleX = 130 + 80 * Math.cos(poleAngleRad);
                        const poleY = 130 + 80 * Math.sin(poleAngleRad);
                        return (
                          <>
                            <line x1="130" y1="130" x2={poleX} y2={poleY} stroke="#facc15" strokeWidth="2" strokeDasharray="2 2" />
                            <circle cx={poleX} cy={poleY} r="6" fill="#facc15" stroke="#ffffff" strokeWidth="1.5" />
                            <text x={poleX} y={poleY > 130 ? poleY + 14 : poleY - 9} fill="#facc15" fontSize="8" fontWeight="900" textAnchor="middle">
                              Axis in {precessionYear}
                            </text>
                          </>
                        );
                      })()}
                    </svg>
                    <div style={{ color: '#94a3b8', fontSize: '0.74rem', marginTop: '0.3rem', textAlign: 'center' }}>
                      Earth rotational axis tracing the ~25,772-year circle around the Ecliptic North Pole
                    </div>
                  </div>
                </div>

                {/* Realignment of the Vākya Calendar for Southwest Monsoon (Eḍavappāti) */}
                <div style={{ background: '#ffffff', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '1.1rem', marginTop: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '1.1rem' }}>🌧️</span>
                    <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#166534' }}>
                      Ayana-Calana &amp; The Southwest Monsoon (Eḍavappāti / ഇടवപ്പാति) Realignment
                    </div>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#374151', lineHeight: 1.6, margin: '0 0 0.75rem' }}>
                    In Kerala, agricultural survival depended entirely on the timely arrival of the Southwest Monsoon (<em>Eḍavappāti</em>, hitting the coast around June 1–5 in mid-<em>Eḍavam</em> / Taurus). The ancient 4th-century <em>Vākya</em> calendar of Vararuci tracked planetary motions relative to fixed stars (<strong>Nirayana</strong>). However, weather systems and the Intertropical Convergence Zone (ITCZ) depend on the seasonal Sun (<strong>Sāyana</strong> / tropical year: 365.2422 days), which finishes ~20.4 minutes shorter than the sidereal year (365.2564 days).
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
                    <div style={{ background: '#f0fdf4', padding: '0.75rem', borderRadius: '8px', border: '1px solid #dcfce7' }}>
                      <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#15803d', marginBottom: '0.2rem' }}>
                        ⚠️ The 14-Day Seasonal Drift Crisis
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#475569', lineHeight: 1.5 }}>
                        Every 71.6 years, the true seasons shift backward by 1 day relative to fixed stars. Over 1,000 years (from Vararuci to 1400 CE), the uncorrected Vākya calendar drifted by nearly <strong>14 full days</strong>! Farmers relying on archaic sidereal dates risked seeding paddy either too early (scorched by dry summer heat) or too late (drowned in flash monsoon torrents).
                      </div>
                    </div>

                    <div style={{ background: '#f0fdf4', padding: '0.75rem', borderRadius: '8px', border: '1px solid #dcfce7' }}>
                      <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#15803d', marginBottom: '0.2rem' }}>
                        🔭 Parameśvara&apos;s 55-Year Empirical Vigil (1431 CE)
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#475569', lineHeight: 1.5 }}>
                        On the banks of the Nīlā river, Parameśvara observed eclipses and solstices for 55 continuous years (1393–1448 CE), establishing <em>Dṛk-Gaṇita-Aikya</em> (दृग्गणितैक्य—concordance of calculation and observed sky). His <em>Dṛggaṇita</em> corrected the planetary parameters to match empirical nature.
                      </div>
                    </div>

                    <div style={{ background: '#f0fdf4', padding: '0.75rem', borderRadius: '8px', border: '1px solid #dcfce7' }}>
                      <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#15803d', marginBottom: '0.2rem' }}>
                        ⚙️ The Rolling Ayanāṃśa Correction
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#475569', lineHeight: 1.5 }}>
                        Kerala astronomers subtracted Ayanāṃśa from Nirayana solar longitudes: <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#16a34a' }}>λ_Sāyana = λ_Nirayana - Ayanāṃśa</span>. This isolated the Sun&apos;s true tropical declination (Krānti), predicting the thermodynamic monsoon onset to the exact week!
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SUB-MODE 6: GOLABANDHA & JESUIT TRANSMISSION */}
            {yantraSubMode === 'golabandha_jesuit' && (
              <div>
                <div style={{ background: '#eff6ff', border: '1.5px solid #bfdbfe', borderRadius: '12px', padding: '1.2rem', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#1d4ed8', textTransform: 'uppercase' }}>
                      Yuktibhāṣā Spherical Projections &amp; The European Pipeline · गोलबन्धः सङ्क्रमणं च
                    </span>
                    <span style={{ background: '#dbeafe', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800, color: '#1e40af' }}>
                      Cochin ➔ Collegio Romano (1582 CE)
                    </span>
                  </div>
                  <h4 style={{ margin: '0 0 0.4rem', fontSize: '1.2rem', fontWeight: 800, color: '#1e3a8a' }}>
                    Golabandha · Jyeṣṭhadeva’s 3D-to-2D Spherical Proofs &amp; The Jesuit Conduit
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.86rem', color: '#1e40af', lineHeight: 1.55 }}>
                    In <em>Gaṇita-Yuktibhāṣā</em> (1530 CE), Jyeṣṭhadeva detailed the mathematics of flattening the 3D celestial sphere onto flat paper using <em>Matsya</em> (vesica piscis) orthogonal intersections and resolving topocentric parallax (<em>Lambana</em> &amp; <em>Nati</em>). Concurrently, Jesuit missionaries in Cochin and Goa gathered these astronomical texts, transmitting high-precision solar parameters to Christopher Clavius for the 1582 Gregorian calendar reform.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                  {/* Part 1: Matsya Vesica Piscis Simulator */}
                  <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.1rem' }}>
                    <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                      🐟 Part A: The Matsya (Fish) Orthogonal Projection Construction
                    </div>
                    <div style={{ marginBottom: '0.8rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#475569', marginBottom: '0.2rem' }}>
                        <span>Distance Between Circle Centers:</span>
                        <strong style={{ color: '#0284c7' }}>{matsyaSeparation} px</strong>
                      </div>
                      <input
                        type="range"
                        min={20}
                        max={100}
                        value={matsyaSeparation}
                        onChange={(e) => setMatsyaSeparation(parseInt(e.target.value, 10))}
                        style={{ width: '100%', accentColor: '#0284c7' }}
                      />
                    </div>

                    <div style={{ background: '#0f172a', borderRadius: '10px', padding: '0.75rem', display: 'flex', justifyContent: 'center' }}>
                      <svg width="220" height="150" viewBox="0 0 220 150">
                        {/* Circle 1 */}
                        <circle cx={110 - halfDist} cy="75" r={matsyaR} fill="rgba(56, 189, 248, 0.15)" stroke="#38bdf8" strokeWidth="1.5" />
                        {/* Circle 2 */}
                        <circle cx={110 + halfDist} cy="75" r={matsyaR} fill="rgba(56, 189, 248, 0.15)" stroke="#38bdf8" strokeWidth="1.5" />
                        {/* Line connecting centers */}
                        <line x1={110 - halfDist} y1="75" x2={110 + halfDist} y2="75" stroke="#94a3b8" strokeDasharray="2 2" />
                        <circle cx={110 - halfDist} cy="75" r="3" fill="#ffffff" />
                        <circle cx={110 + halfDist} cy="75" r="3" fill="#ffffff" />
                        {/* Perpendicular Bisector (Mouth to Tail) */}
                        {matsyaHalfHeight > 0 && (
                          <>
                            <line x1="110" y1={75 - matsyaHalfHeight - 10} x2="110" y2={75 + matsyaHalfHeight + 10} stroke="#f43f5e" strokeWidth="2" />
                            <circle cx="110" cy={75 - matsyaHalfHeight} r="4" fill="#f43f5e" />
                            <circle cx="110" cy={75 + matsyaHalfHeight} r="4" fill="#f43f5e" />
                            <text x="115" y={75 - matsyaHalfHeight + 3} fill="#f43f5e" fontSize="7" fontWeight="800">Mouth (Mukha)</text>
                            <text x="115" y={75 + matsyaHalfHeight + 3} fill="#f43f5e" fontSize="7" fontWeight="800">Tail (Puccha)</text>
                          </>
                        )}
                      </svg>
                    </div>
                    <div style={{ marginTop: '0.65rem', fontSize: '0.76rem', color: '#475569', lineHeight: 1.5 }}>
                      By overlapping two equal circles, the lenticular intersection forms a &ldquo;fish&rdquo; (Matsya). The line connecting mouth and tail generates an exact perpendicular bisector, used by Jyeṣṭhadeva to construct cardinal axes on flat palm leaves without protractors!
                    </div>
                  </div>

                  {/* Part 2: Topocentric Parallax (Lambana & Nati) */}
                  <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.1rem' }}>
                    <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                      🌑 Part B: Topocentric Parallax (Lambana &amp; Nati)
                    </div>
                    <div style={{ marginBottom: '0.8rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#475569', marginBottom: '0.2rem' }}>
                        <span>Zenith Distance of Celestial Body (Z):</span>
                        <strong style={{ color: '#059669' }}>{parallaxZenithDeg}°</strong>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={90}
                        value={parallaxZenithDeg}
                        onChange={(e) => setParallaxZenithDeg(parseInt(e.target.value, 10))}
                        style={{ width: '100%', accentColor: '#059669' }}
                      />
                    </div>

                    <div style={{ background: '#f8fafc', padding: '0.8rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.8rem', lineHeight: 1.6 }}>
                      <div><strong>Total Angular Parallax (Δθ = P₀ sin Z):</strong> <span style={{ fontFamily: 'monospace', color: '#0f172a', fontWeight: 800 }}>{totalParallaxDeg.toFixed(2)}° ({Math.round(totalParallaxDeg * 60)}&apos;)</span></div>
                      <div><strong>Longitudinal Shift (Lambana / लम्बनम्):</strong> <span style={{ fontFamily: 'monospace', color: '#0284c7', fontWeight: 800 }}>+{lambanaLongShift}°</span> (Shifts Eclipse Conjunction Time!)</div>
                      <div><strong>Latitudinal Shift (Nati / नतिः):</strong> <span style={{ fontFamily: 'monospace', color: '#dc2626', fontWeight: 800 }}>+{natiLatShift}°</span> (Alters Eclipse Magnitude!)</div>
                    </div>
                    <div style={{ marginTop: '0.65rem', fontSize: '0.76rem', color: '#475569', lineHeight: 1.5 }}>
                      Because an observer sits on Earth&apos;s surface (Bhūpṛṣṭha) rather than its center (Bhūgarbha), the Moon appears displaced toward the horizon. Jyeṣṭhadeva decomposed this 3D vector into 2D orthogonal axes, predicting eclipse contact (Sparśa) down to the minute.
                    </div>
                  </div>
                </div>

                {/* Part 3: The Jesuit Transmission Pipeline Stepper */}
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.15rem' }}>
                  <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.6rem' }}>
                    🚢 Part C: The Jesuit Knowledge Transmission Timeline (1498–1687 CE)
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.4rem', marginBottom: '1rem' }}>
                    {[
                      { step: 0, label: '1498–1579: Cochin Base' },
                      { step: 1, label: '1581: Ricci Letters' },
                      { step: 2, label: '1582: Gregorian Reform' },
                      { step: 3, label: '1635: Cavalieri Indivisibles' },
                      { step: 4, label: '1667–1687: Calculus Series' },
                    ].map((item) => (
                      <button
                        key={item.step}
                        type="button"
                        onClick={() => setJesuitTimelineStep(item.step)}
                        style={{
                          padding: '0.45rem',
                          borderRadius: '6px',
                          border: 'none',
                          background: jesuitTimelineStep === item.step ? '#1d4ed8' : '#eff6ff',
                          color: jesuitTimelineStep === item.step ? '#ffffff' : '#1d4ed8',
                          fontWeight: 700,
                          fontSize: '0.74rem',
                          cursor: 'pointer',
                        }}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  {/* Timeline Description Card */}
                  <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '0.9rem', fontSize: '0.82rem', color: '#1e3a8a', lineHeight: 1.6 }}>
                    {jesuitTimelineStep === 0 && (
                      <>
                        <strong>📍 Step 1: The Portuguese &amp; Jesuit Epicenter in Cochin (1498–1579 CE):</strong><br />
                        Following Vasco da Gama’s arrival in Calicut, Cochin became the primary Portuguese royal headquarters and the direct geographical center of the Kerala School of Astronomy. By 1579, the Jesuit Order had established the Jesuit College of Cochin, chosen specifically for their scholars’ rigorous mathematics and linguistics training.
                      </>
                    )}
                    {jesuitTimelineStep === 1 && (
                      <>
                        <strong>✉️ Step 2: Matteo Ricci’s Documented 1581 Letter from Cochin:</strong><br />
                        Matteo Ricci, the star mathematics pupil of Christopher Clavius in Rome, arrived in Goa and Cochin (1578–1582). In an explicit 1581 letter preserved in the Jesuit archives in Rome, Ricci wrote to Father Maffei that he was seeking to acquire astronomical books from local Brahmins to decode their seasonal time calculations (<em>&ldquo;scritti da un bramano della computatione dei tempi&rdquo;</em>).
                      </>
                    )}
                    {jesuitTimelineStep === 2 && (
                      <>
                        <strong>📅 Step 3: Christopher Clavius &amp; The 1582 Gregorian Calendar Reform:</strong><br />
                        Headed by Clavius at the Collegio Romano, Pope Gregory XIII overhauled the drifting Julian calendar. Clavius’s newly adopted tropical year parameters matched Indian astronomical almanacs (Panchāṅgas) down to fractional seconds, resolving the Easter liturgical crisis and maritime navigation tables along the Cape Route.
                      </>
                    )}
                    {jesuitTimelineStep === 3 && (
                      <>
                        <strong>⚡ Step 4: Dispatches to Mersenne &amp; Cavalieri’s Indivisibles (1635 CE):</strong><br />
                        Jesuit dispatches from the East were collected by Father Marin Mersenne in Paris—the scientific clearinghouse connecting Fermat, Descartes, Pascal, and Galileo. In 1635, Bonaventura Cavalieri published his <em>Geometria Indivisibilibus</em>, using infinitesimal slicing identical to Jyeṣṭhadeva&apos;s <em>Yukti</em> slicing without the traditional Euclidean Greek proofs.
                      </>
                    )}
                    {jesuitTimelineStep === 4 && (
                      <>
                        <strong>♾️ Step 5: The Emergence of Modern Calculus Power Series (1667–1687 CE):</strong><br />
                        Shortly thereafter, James Gregory (1667), Isaac Newton (1669), and Gottfried Leibniz (1673) published the infinite series for sine, cosine, and π—matching Mādhava’s 14th-century formulas. Leibniz famously corresponded directly with Jesuit missionaries in India seeking their mathematical manuscripts, completing the global transmission loop.
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })()}
    </div>
  );
};
