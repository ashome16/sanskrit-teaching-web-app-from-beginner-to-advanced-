import React, { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import type { LabSegmentId } from './common';
import { soundEffects } from '../../utils/soundEffects';
import '../../styles/science-lab.css';
import '../../styles/mission-control.css';
import { MissionControlDashboard } from './MissionControlDashboard';
import { ScienceSparkModal } from './ScienceSparkModal';
import { ParentNotesModal } from './ParentNotesModal';
import {
  getExplorerStats,
  saveExplorerStats,
  getMissionCardById,
  type ExplorerStats,
} from './missionControlData';

const PreschoolWonderLab = lazy(() => import('./PreschoolWonderLab'));
const ParamanuBuilder = lazy(() => import('./ParamanuBuilder'));
const PrakritiBalance = lazy(() => import('./PrakritiBalance'));
const JyotishaOrbit = lazy(() => import('./JyotishaOrbit'));
const SrishtiLoom = lazy(() => import('./SrishtiLoom'));
const NadaBrahman = lazy(() => import('./NadaBrahman'));
const AsatoMa = lazy(() => import('./AsatoMa'));
const Chaturyoni = lazy(() => import('./Chaturyoni'));
const Chandrayaan = lazy(() => import('./Chandrayaan'));
const RituparnaSampling = lazy(() => import('./RituparnaSampling'));
const AgnibanaRocketLab = lazy(() => import('./AgnibanaRocketLab'));
const VedicGeometryLab = lazy(() => import('./VedicGeometryLab'));
const MantraAcousticsLab = lazy(() => import('./MantraAcousticsLab'));
const TempleEngineeringLab = lazy(() => import('./TempleEngineeringLab'));
const KautilyaStatecraft = lazy(() => import('./KautilyaStatecraft'));
const ChandahshastraLab = lazy(() => import('./ChandahshastraLab'));
const UjjainGeodesyStudio = lazy(() => import('../UjjainGeodesyStudio'));
const LabBodhiConsole = lazy(() => import('./LabBodhiConsole'));
import { BodhiWisdomCard } from '../BodhiWisdomCard';
import { GuidedQuestHUD } from './GuidedQuestHUD';
import { QuestDirectoryModal } from './QuestDirectoryModal';

export type LabCategory = 'all' | 'matter' | 'cosmos' | 'life' | 'waves';
export type LabLevel = 'all' | 'preschool' | 'primary' | 'middle' | 'high' | 'advanced';

export interface LabSegmentConfig {
  id: LabSegmentId;
  code: string;
  icon: string;
  dev: string;
  title: string;
  subject: string;
  school: string;
  category: 'matter' | 'cosmos' | 'life' | 'waves';
  level: 'preschool' | 'primary' | 'middle' | 'high' | 'advanced';
  levelLabel: string;
  levelDev: string;
  ageRange: string;
  gameType: string;
  blurb: string;
  tint: string;
  ink: string;
  glow: string;
}

const LAB_SEGMENTS: LabSegmentConfig[] = [
  // 0. Preschool Wonder Zone (Ages 2–6)
  {
    id: 'preschool-wonder',
    code: 'PRE-01',
    icon: '🧸',
    dev: 'शिशु-क्रीडा-वाटिका',
    title: 'Preschool Wonder Playground',
    subject: 'Shapes, Colors, Animals, Fruits, Counting, Bells, Moon & Story',
    school: 'बाल-संस्कृत-प्रज्ञा (Ages 2–6)',
    category: 'life',
    level: 'preschool',
    levelLabel: 'Preschool & Kindergarten',
    levelDev: 'शिशु-कक्षा',
    ageRange: 'Ages 2–6 · Toddlers & Little Explorers',
    gameType: '11 Tactile Preschool Wonder Games',
    blurb: 'Gentle hands-on playground for toddlers: Shapes, Rainbow Color Mixing, Animal Safari Sounds, Orchard Fruit Picker, Count 1-10 with Sacred Friends, Sacred Instruments, Moon Phases, Day Routine, Seasons, Divine Vāhanas, and the 5 Friends bilingual story!',
    tint: 'rgba(245, 158, 11, 0.16)',
    ink: '#fbbf24',
    glow: '#f59e0b',
  },

  // 1. Matter & The Elementary Crucible
  {
    id: 'paramanu',
    code: 'SEC-01',
    icon: '⚛️',
    dev: 'परमाणु-निर्माणम् · Vaiśeṣika',
    title: 'Atom Builder: Make Matter!',
    subject: 'Atomic Crucible',
    school: 'Vaiśeṣika (वैशेषिक)',
    category: 'matter',
    level: 'middle',
    levelLabel: 'Middle School',
    levelDev: 'माध्यमिक',
    ageRange: 'Grades 6–8 · Ages 11–14',
    gameType: 'Atomic Molecule Builder Game',
    blurb: 'Forge matter from the smallest building blocks. Pair raw Paramāṇus into a Dvyaṇuka, then join three Dvyaṇukas into a Tryaṇuka, the first visible speck of reality.',
    tint: 'rgba(245, 158, 11, 0.12)',
    ink: '#fde047',
    glow: '#f59e0b',
  },
  {
    id: 'asato-ma',
    code: 'SEC-02',
    icon: '🕯️',
    dev: 'पदार्थ-अवस्थाः · Rasaśāstra',
    title: 'Heat & Matter Mystery',
    subject: 'Mass Invariance',
    school: 'Andha-Mūṣā Crucible (रसशास्त्र)',
    category: 'matter',
    level: 'primary',
    levelLabel: 'Primary School',
    levelDev: 'प्रारम्भिक',
    ageRange: 'Grades 3–5 · Ages 8–10',
    gameType: 'Mass Conservation Game',
    blurb: 'Fire up the Viveka Scanner to look past everyday illusion (Asat) and see the invariant atoms underneath (Sat). Melt, boil and burn, and mass remains 100.000g constant.',
    tint: 'rgba(234, 179, 8, 0.12)',
    ink: '#fde047',
    glow: '#eab308',
  },

  // 2. Biology & Life Systems (All Biology Labs Sequenced Together!)
  {
    id: 'prakriti',
    code: 'SEC-03',
    icon: '🌿',
    dev: 'प्रकृति-जैवमण्डलम् · Tridoṣa',
    title: 'Nature Balance Game',
    subject: 'Cellular Homeostasis',
    school: 'Tridoṣa Engine (आयुर्वेद)',
    category: 'life',
    level: 'middle',
    levelLabel: 'Middle School',
    levelDev: 'माध्यमिक',
    ageRange: 'Grades 6–8 · Ages 11–14',
    gameType: 'Biosphere Ecosystem Game',
    blurb: 'Elemental survival sandbox. Control the seasons, heat and moisture to bring Vāta, Pitta and Kapha into dynamic balance with real-time Nāḍī waveform feedback.',
    tint: 'rgba(16, 185, 129, 0.12)',
    ink: '#34d399',
    glow: '#10b981',
  },
  {
    id: 'chaturyoni',
    code: 'SEC-04',
    icon: '🦢',
    dev: 'चतुर्योनि-प्राणिनः · Taxonomy',
    title: 'Life Explorer Map',
    subject: 'Bio-Galvanometry',
    school: 'Vṛkṣāyurveda & J.C. Bose',
    category: 'life',
    level: 'primary',
    levelLabel: 'Primary School',
    levelDev: 'प्रारम्भिक',
    ageRange: 'Grades 3–5 · Ages 8–11',
    gameType: 'Animal & Plant Taxonomy Game',
    blurb: 'Ancient 4-fold taxonomy engine paired with Sir J.C. Bose’s plant galvanometer probe, tracking real-time microvolt action potentials to electrical and tactile stimuli.',
    tint: 'rgba(249, 115, 22, 0.12)',
    ink: '#fb923c',
    glow: '#f97316',
  },

  // 3. Cosmos & Planetary Motion
  {
    id: 'jyotisha',
    code: 'SEC-05',
    icon: '🪐',
    dev: 'गुरुत्व-कक्षा-क्रीडा · Jyotiṣa',
    title: 'Planet Pull: Gravity Playground',
    subject: 'Orbital Mechanics',
    school: 'Āryabhaṭīya (खगोल-शास्त्र)',
    category: 'cosmos',
    level: 'primary',
    levelLabel: 'Primary School',
    levelDev: 'प्रारम्भिक',
    ageRange: 'Grades 3–6 · Ages 8–12',
    gameType: 'Orbital Gravity Sandbox Game',
    blurb: 'Real-time orbit simulator. Master gravity with Sūrya, Pṛthivī and Candra: too slow and you crash, too fast and you escape. Track Candra through the 27 Nakṣatras.',
    tint: 'rgba(99, 102, 241, 0.12)',
    ink: '#a5b4fc',
    glow: '#6366f1',
  },
  {
    id: 'chandrayaan',
    code: 'SEC-06',
    icon: '🛰️',
    dev: 'चन्द्रयान-प्रक्षेपः · Somayāna',
    title: 'Moon Mission Launcher',
    subject: 'Lunar Telemetry',
    school: 'ISRO Chandrayaan-3',
    category: 'cosmos',
    level: 'middle',
    levelLabel: 'Middle School',
    levelDev: 'माध्यमिक',
    ageRange: 'Grades 6–9 · Ages 11–15',
    gameType: 'Lunar Lander Simulation Game',
    blurb: 'Lunar landing sandbox. Circularise lunar orbit, execute precision soft-landing at Shiv Shakti Point, then tune LIBS laser pulses to detect sulphur and polar water ice.',
    tint: 'rgba(6, 182, 212, 0.12)',
    ink: '#38bdf8',
    glow: '#06b6d4',
  },

  // 4. Harmonics, Conservation & Aerospace
  {
    id: 'nada-brahman',
    code: 'SEC-07',
    icon: '🪕',
    dev: 'नाद-विहारः · Nāda',
    title: 'Sound Detective',
    subject: 'Harmonics & Cymatics',
    school: 'Nāda Brahman (सङ्गीत)',
    category: 'waves',
    level: 'primary',
    levelLabel: 'Primary School',
    levelDev: 'प्रारम्भिक',
    ageRange: 'Grades 3–6 · Ages 8–12',
    gameType: 'Harmonics & Cymatic Sand Game',
    blurb: 'String resonance simulator. Pluck standing waves, shift across harmonics 1–5, calibrate the 22 Śrutis, and reveal 2D Chladni sand mandala nodal yantras.',
    tint: 'rgba(168, 85, 247, 0.12)',
    ink: '#c084fc',
    glow: '#a855f7',
  },
  {
    id: 'srishti-sthiti-laya',
    code: 'SEC-08',
    icon: '🧵',
    dev: 'आरुणि-सृष्टि-तन्त्रम् · Āruṇi',
    title: 'Pattern Weaver',
    subject: 'Conservation Field',
    school: 'Satkāryavāda (साङ्ख्य)',
    category: 'waves',
    level: 'middle',
    levelLabel: 'Middle School',
    levelDev: 'माध्यमिक',
    ageRange: 'Grades 6–8 · Ages 11–14',
    gameType: 'Conservation of Energy Game',
    blurb: 'Quantum particle survival challenge. Gather a wild, scattered cloud into shape (Sṛṣṭi), hold it steady (Sthiti), then set off Laya. Not a single quantum of reality is lost.',
    tint: 'rgba(244, 63, 94, 0.12)',
    ink: '#fb7185',
    glow: '#f43f5e',
  },
  {
    id: 'rituparna',
    code: 'SEC-09',
    icon: '🌳',
    dev: 'ऋतुपर्ण-साङ्ख्यानम्',
    title: 'Ṛtuparṇa Sampling Lab',
    subject: 'Monte Carlo Statistics',
    school: 'Saṅkhyāna & Akṣahṛdaya',
    category: 'waves',
    level: 'high',
    levelLabel: 'High School',
    levelDev: 'उच्च-माध्यमिक',
    ageRange: 'Grades 9–12 · Ages 14–18',
    gameType: 'Monte Carlo Sampling Game',
    blurb: 'Mahābhārata cluster sampling and Akṣa dice Monte Carlo grid. Roll random seeds across a 100-quadrat forest, calculating mean, standard error, and variance collapse.',
    tint: 'rgba(20, 184, 166, 0.12)',
    ink: '#2dd4bf',
    glow: '#14b8a6',
  },
  {
    id: 'agnibana',
    code: 'SEC-10',
    icon: '🚀',
    dev: 'अग्निबाण-क्रीडा',
    title: 'Agnibāṇa Rocketry',
    subject: 'Aerospace Ballistics',
    school: 'Śukranīti & Mysore 1780',
    category: 'matter',
    level: 'middle',
    levelLabel: 'Middle to High School',
    levelDev: 'माध्यमिक-उच्च',
    ageRange: 'Grades 7–10 · Ages 12–16',
    gameType: 'Rocket Ballistics Simulation Game',
    blurb: 'Master the Śukranīti 5:1:1 Agnicūrṇa propellant ratio, configure hammered iron casings sustaining 80 atm, tune artillery elevation angles, and trace ballistic flight arcs.',
    tint: 'rgba(239, 68, 68, 0.12)',
    ink: '#f87171',
    glow: '#ef4444',
  },
  {
    id: 'vedic-geometry',
    code: 'SEC-11',
    icon: '📐',
    dev: 'जीवन्त-रेखागणितम्',
    title: 'The Living Geometry of the Gurukul',
    subject: 'Rekhā-Gaṇita & Śulba',
    school: 'Śulba Sūtras & Conscious Cosmos',
    category: 'waves',
    level: 'primary',
    levelLabel: 'Primary & Middle School',
    levelDev: 'प्रारम्भिक-मध्यम',
    ageRange: 'Grades 4–8 · Ages 9–14',
    gameType: 'Living Shape Morpher Game',
    blurb: 'Explore how Sanskrit root actions encode living geometry. Features the Conscious Cosmos documentary masterclass, interactive 8-archetype shape morpher, and the universal actions of rotation and extension.',
    tint: 'rgba(245, 158, 11, 0.12)',
    ink: '#fde047',
    glow: '#f59e0b',
  },
  {
    id: 'mantra-acoustics',
    code: 'SEC-12',
    icon: '🎶',
    dev: 'मन्त्राकौस्टिक्स् · पदार्थस्य वाक्',
    title: 'Mantra Acoustics & The Language of Matter',
    subject: 'Harmonic Scale & Phonetic Physics',
    school: 'Sāma Veda & Taittirīya Saṃhitā',
    category: 'waves',
    level: 'primary',
    levelLabel: 'Primary to Scholar',
    levelDev: 'प्रारम्भिक-शोध',
    ageRange: 'Grades 4+ · Ages 9+',
    gameType: 'Acoustic Resonance Lab Game',
    blurb: 'Sound discovered as a physical law: the natural Harmonic Series (1/2, 1/3, 1/4... 1/7), Saptak vs. Solfège, Sāma Veda animal resonances, Chandas Mātrā decoupling, and the Chamakam square number code.',
    tint: 'rgba(168, 85, 247, 0.12)',
    ink: '#c084fc',
    glow: '#a855f7',
  },
  {
    id: 'temple-engineering',
    code: 'SEC-13',
    icon: '🏛️',
    dev: 'शिल्प-स्थापत्य-विज्ञानम्',
    title: 'The Masters of Stone: Ancient Temple Engineering',
    subject: 'Dry Masonry & Sacred Fractals',
    school: 'Samarāṅgaṇa Sūtradhāra & Vāstu',
    category: 'matter',
    level: 'primary',
    levelLabel: 'Primary to High School',
    levelDev: 'प्रारम्भिक-उच्च',
    ageRange: 'Grades 4–10 · Ages 9–16',
    gameType: 'Seismic Engineering Game',
    blurb: 'Explore King Bhoja’s dry masonry seismic dissipative joints (Sandhi Bandhana), Kudavelli hydro-engineered sand-buffer foundations, and 8×8/9×9 Vāstupuruṣa Mandala fractal load architectures.',
    tint: 'rgba(217, 119, 6, 0.12)',
    ink: '#fbbf24',
    glow: '#d97706',
  },
  {
    id: 'kautilya',
    code: 'SEC-14',
    icon: '📜',
    dev: 'कौटिलीय-अर्थशास्त्रम्',
    title: 'Kauṭilya Quantitative Statecraft',
    subject: 'Actuarial Risk & Demographics',
    school: 'Arthaśāstra (नीति-प्रशासनम्)',
    category: 'waves',
    level: 'advanced',
    levelLabel: 'Advanced Scholar',
    levelDev: 'विद्वत्-शोध',
    ageRange: 'Grade 11+ & Research · Ages 16+',
    gameType: 'Quantitative Economics Sandbox',
    blurb: 'Explore Mauryan quantitative administration: balance the 7 organic Saptāṅga state limbs, audit village demographics with Gopas, and price tiered maritime loan risk from 15% to 240%.',
    tint: 'rgba(245, 158, 11, 0.12)',
    ink: '#fde047',
    glow: '#f59e0b',
  },
  {
    id: 'chandahshastra',
    code: 'SEC-15',
    icon: '🪘',
    dev: 'पिङ्गलस्य छन्दःशास्त्रम्',
    title: 'Chandaḥśāstra Combinatorics',
    subject: 'Binary Permutations & Pascal Meru',
    school: 'Chandaḥśāstra (छन्दो-विज्ञानम्)',
    category: 'waves',
    level: 'high',
    levelLabel: 'High School & Scholar',
    levelDev: 'उच्च-शोध',
    ageRange: 'Grades 9–12+ · Ages 14+',
    gameType: 'Binary Permutation Game',
    blurb: 'Step into Piṅgala’s binary universe: compose acoustic Laghu and Guru beats, decode rows via Naṣṭa & Uddiṣṭa, and climb the Meruprastāra binomial pyramid and Fibonacci Mātrāmeru.',
    tint: 'rgba(192, 132, 252, 0.12)',
    ink: '#e879f9',
    glow: '#c084fc',
  },
  {
    id: 'ujjain-geodesy',
    code: 'SEC-16',
    icon: '🏛️',
    dev: 'उज्जयिनी-मध्यरेखा-विज्ञानम्',
    title: 'The Ancient Prime Meridian & Temple Geodesy',
    subject: 'Geodesy, 0° Longitude & Temple Geometry',
    school: 'Sūrya Siddhānta & Varāhamihira (भूगोल-खगोलम्)',
    category: 'cosmos',
    level: 'high',
    levelLabel: 'High School',
    levelDev: 'उच्च-माध्यमिक',
    ageRange: 'Grades 9–12 · Ages 14–18',
    gameType: 'Geodesy & Meridian Sandbox Game',
    blurb: 'Explore Ujjain (Avanti) as the world’s ancient Prime Meridian (0° Longitude) and its intersection with the Tropic of Cancer. Calculate the 29-minute Panchang offset, align with Mahakaleshwar & Mangalnath temples, and track the Tropic of Cancer southward drift to Dongla.',
    tint: 'rgba(14, 165, 233, 0.12)',
    ink: '#38bdf8',
    glow: '#0ea5e9',
  },
];


const SEGMENT_IDS = new Set<string>(LAB_SEGMENTS.map((s) => s.id));
const HASH_ALIASES: Record<string, LabSegmentId> = {
  'atom-builder': 'paramanu',
  'atom': 'paramanu',
  'nature-balance': 'prakriti',
  'planet-pull': 'jyotisha',
  'gravity': 'jyotisha',
  'pattern-weaver': 'srishti-sthiti-laya',
  'sound-detective': 'nada-brahman',
  'heat-matter': 'asato-ma',
  'life-explorer': 'chaturyoni',
  'moon-mission': 'chandrayaan',
  'preschool-wonder': 'preschool-wonder',
  preschool: 'preschool-wonder',
  toddler: 'preschool-wonder',
  shapes: 'preschool-wonder',
  vahanas: 'preschool-wonder',
  somayana: 'chandrayaan',
  'soma-yana': 'chandrayaan',
  sampling: 'rituparna',
  sankhyana: 'rituparna',
  'rituparna-sampling': 'rituparna',
  agnibana: 'agnibana',
  fireworks: 'agnibana',
  rocket: 'agnibana',
  diwali: 'agnibana',
  deepavali: 'agnibana',
  geometry: 'vedic-geometry',
  'vedic-geometry': 'vedic-geometry',
  'rekha-ganita': 'vedic-geometry',
  'rekhaganita': 'vedic-geometry',
  shulba: 'vedic-geometry',
  sulba: 'vedic-geometry',
  'conscious-cosmos': 'vedic-geometry',
  mantra: 'mantra-acoustics',
  'mantra-acoustics': 'mantra-acoustics',
  acoustics: 'mantra-acoustics',
  saptak: 'mantra-acoustics',
  chamakam: 'mantra-acoustics',
  temple: 'temple-engineering',
  'temple-engineering': 'temple-engineering',
  'masters-of-stone': 'temple-engineering',
  'sandhi-bandhana': 'temple-engineering',
  'dry-masonry': 'temple-engineering',
  vastu: 'temple-engineering',
  vastupurusha: 'temple-engineering',
  architecture: 'temple-engineering',
  kautilya: 'kautilya',
  arthashastra: 'kautilya',
  statecraft: 'kautilya',
  saptanga: 'kautilya',
  gopa: 'kautilya',
  chandas: 'chandahshastra',
  chandahshastra: 'chandahshastra',
  pingala: 'chandahshastra',
  meru: 'chandahshastra',
  meruprastara: 'chandahshastra',
  matrameru: 'chandahshastra',
  nasta: 'chandahshastra',
  uddishta: 'chandahshastra',
  ujjain: 'ujjain-geodesy',
  'ujjain-geodesy': 'ujjain-geodesy',
  'prime-meridian': 'ujjain-geodesy',
  meridian: 'ujjain-geodesy',
  madhyarekha: 'ujjain-geodesy',
  geodesy: 'ujjain-geodesy',
  mahakal: 'ujjain-geodesy',
  mangalnath: 'ujjain-geodesy',
  dongla: 'ujjain-geodesy',
};
const readHash = (): LabSegmentId | null => {
  try {
    const h = window.location.hash.replace(/^#/, '');
    if (SEGMENT_IDS.has(h)) return h as LabSegmentId;
    if (HASH_ALIASES[h]) return HASH_ALIASES[h];
    return null;
  } catch {
    return null;
  }
};

export interface ScienceLabProps {
  initialSegment?: string | null;
  onGoHome?: () => void;
  onOpenResources?: () => void;
}

const SimLoader = () => <div className="vl-loading">Loading the lab bench…</div>;

const ScienceLab: React.FC<ScienceLabProps> = ({ initialSegment, onGoHome, onOpenResources }) => {
  const [active, setActive] = useState<LabSegmentId>(() => {
    if (initialSegment && SEGMENT_IDS.has(initialSegment)) return initialSegment as LabSegmentId;
    if (initialSegment && HASH_ALIASES[initialSegment]) return HASH_ALIASES[initialSegment];
    return readHash() || 'paramanu';
  });
  const [viewMode, setViewMode] = useState<'mission-control' | 'workbench' | 'catalog'>(() => {
    const h = readHash();
    if (h || initialSegment) return 'workbench';
    return 'mission-control';
  });
  const [explorerStats, setExplorerStats] = useState<ExplorerStats>(() => getExplorerStats());
  const [isScienceSparkOpen, setIsScienceSparkOpen] = useState(false);
  const [isParentNotesOpen, setIsParentNotesOpen] = useState(false);
  const [filterCat, setFilterCat] = useState<LabCategory>('all');
  const [filterLevel, setFilterLevel] = useState<LabLevel>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isQuestMode, setIsQuestMode] = useState(true);
  const [isQuestDirectoryOpen, setIsQuestDirectoryOpen] = useState(false);
  const [featuredIdx, setFeaturedIdx] = useState<number>(0);
  const [isGradeAccordionOpen, setIsGradeAccordionOpen] = useState<boolean>(true);
  const [isFeaturesAccordionOpen, setIsFeaturesAccordionOpen] = useState<boolean>(true);
  const catalogSectionRef = useRef<HTMLDivElement>(null);
  const simRef = useRef<HTMLDivElement>(null);
  const firstRun = useRef(true);

  const FEATURED_SIMS = useMemo(
    () => [
      {
        id: 'paramanu',
        gradeBadge: 'AGES 9–14 · PHYSICS & CHEMISTRY',
        title: '⚛️ Atom Builder: Make Matter!',
        bannerArt: '⚛️ 🔬 ⚡ 🔥 🧪',
        bannerGradient: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)',
        desc: 'Forge matter from the smallest building blocks. Pair raw Paramāṇus into Dvyaṇukas, then join three Dvyaṇukas into a visible Tryaṇuka speck of reality.',
        cta: 'Launch mission',
      },
      {
        id: 'prakriti',
        gradeBadge: 'AGES 6–10 · BIOLOGY & ECOLOGY',
        title: '🌿 Nature Balance Game',
        bannerArt: '🌿 🧬 💧 ☀️ 🌬️',
        bannerGradient: 'linear-gradient(135deg, #064e3b 0%, #059669 100%)',
        desc: 'Keep the ecosystem alive! Balance Vāta, Pitta and Kapha under changing seasons with real-time Nāḍī pulse waveform feedback.',
        cta: 'Launch mission',
      },
      {
        id: 'chandrayaan',
        gradeBadge: 'AGES 8–14 · SPACE EXPLORATION',
        title: '🛰️ Moon Mission Launcher',
        bannerArt: '🛰️ 🌕 🚀 📡 🇮🇳',
        bannerGradient: 'linear-gradient(135deg, #0f172a 0%, #0284c7 100%)',
        desc: 'Simulate ISRO Chandrayaan-3 lunar lander trajectory. Calculate retro-rocket thrust, track Moon coordinates, and achieve soft touchdown on the Lunar South Pole.',
        cta: 'Launch mission',
      },
      {
        id: 'jyotisha',
        gradeBadge: 'AGES 8–12 · ASTRONOMY & GRAVITY',
        title: '🪐 Planet Pull: Gravity Playground',
        bannerArt: '🪐 ☀️ 🌍 🌙 ⭐',
        bannerGradient: 'linear-gradient(135deg, #31104b 0%, #7c3aed 100%)',
        desc: 'Real-time orbital gravity simulator based on Āryabhaṭīya. Pilot satellites around Sūrya, Pṛthivī and Candra through the 27 sacred Nakṣatras.',
        cta: 'Launch mission',
      },
      {
        id: 'preschool-wonder',
        gradeBadge: 'AGES 2–6 · PRESCHOOL WONDER',
        title: '🧸 Preschool Wonder Playground',
        bannerArt: '🧸 🎨 🐮 🌙 🍎',
        bannerGradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
        desc: 'Gentle hands-on tactile discovery for little hands: Shapes, Rainbow Colors, Real Animal Sounds, Orchard Fruit Picker, Moon Phases, and the 5 Elements tale!',
        cta: 'Launch playground',
      },
      {
        id: 'agnibana',
        gradeBadge: 'GRADES 9–12 · AEROSPACE',
        title: '🚀 Agnibāṇa Rocket Propulsion',
        bannerArt: '🚀 🔥 💨 🎯 💥',
        bannerGradient: 'linear-gradient(135deg, #7c2d12 0%, #ea580c 100%)',
        desc: 'Calculate multi-stage propellant mass ratio, Isp specific impulse, and atmospheric drag to launch an ancient Agni rocket into low-earth orbit.',
        cta: 'Launch studio',
      },
    ],
    []
  );

  const activeMissionCard = useMemo(() => getMissionCardById(active), [active]);

  const handleLaunchSim = (targetId: LabSegmentId) => {
    setActive(targetId);
    setViewMode('workbench');
    soundEffects.playCelebrationChime();
    window.requestAnimationFrame(() => {
      simRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const handleCompleteActiveMission = () => {
    if (!activeMissionCard) return;
    soundEffects.playCelebrationChime();
    setExplorerStats((prev) => {
      const nextStarsByGame = { ...prev.starsByGame, [active]: 3 };
      const currentKeys = Object.keys(nextStarsByGame);
      const totalStars = currentKeys.reduce((acc, k) => acc + (nextStarsByGame[k] || 0), 0);
      const unlockedBadges = prev.unlockedBadges.includes(activeMissionCard.badgeId)
        ? prev.unlockedBadges
        : [...prev.unlockedBadges, activeMissionCard.badgeId];
      const completedMissions = prev.completedMissions.includes(active)
        ? prev.completedMissions
        : [...prev.completedMissions, active];

      const updated: ExplorerStats = {
        ...prev,
        totalStars,
        starsByGame: nextStarsByGame,
        unlockedBadges,
        completedMissions,
      };
      saveExplorerStats(updated);
      return updated;
    });
    setIsScienceSparkOpen(true);
  };

  const visibleSegments = useMemo<LabSegmentConfig[]>(() => {
    return LAB_SEGMENTS.filter((s) => {
      // Category filter
      if (filterCat !== 'all' && s.category !== filterCat) return false;
      // Level filter
      if (filterLevel !== 'all' && s.level !== filterLevel) return false;
      // Keyword search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matches =
          s.title.toLowerCase().includes(q) ||
          s.dev.includes(q) ||
          s.code.toLowerCase().includes(q) ||
          s.subject.toLowerCase().includes(q) ||
          s.school.toLowerCase().includes(q) ||
          s.gameType.toLowerCase().includes(q) ||
          s.levelLabel.toLowerCase().includes(q) ||
          s.blurb.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [filterCat, filterLevel, searchQuery]);

  // Keep /vignana-lab#segment in the address bar so every segment is a deep link.
  useEffect(() => {
    try {
      const currentPath = window.location.pathname.replace(/\/+$/, '');
      const basePath = currentPath === '/science-lab' ? '/science-lab' : '/vignana-lab';
      const url = `${basePath}#${active}`;
      const onLab = currentPath === '/vignana-lab' || currentPath === '/science-lab' || currentPath === '/vijnana-lab';
      if (!onLab) window.history.pushState({ view: 'science-lab' }, '', url);
      else if (window.location.hash !== `#${active}`) window.history.replaceState({ view: 'science-lab' }, '', url);
    } catch {
      /* ignore */
    }
    const shouldScroll = !firstRun.current || !!initialSegment || !!readHash();
    firstRun.current = false;
    if (shouldScroll) {
      const t = window.setTimeout(() => simRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
      return () => window.clearTimeout(t);
    }
    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useEffect(() => {
    const onHash = () => {
      const h = readHash();
      if (h) setActive(h);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const seg = LAB_SEGMENTS.find((s) => s.id === active)!;

  const currentIndex = useMemo(() => {
    const idx = LAB_SEGMENTS.findIndex((s) => s.id === active);
    return idx >= 0 ? idx : 0;
  }, [active]);

  const prevSeg = useMemo(() => {
    const idx = currentIndex > 0 ? currentIndex - 1 : LAB_SEGMENTS.length - 1;
    return LAB_SEGMENTS[idx];
  }, [currentIndex]);

  const nextSeg = useMemo(() => {
    const idx = currentIndex < LAB_SEGMENTS.length - 1 ? currentIndex + 1 : 0;
    return LAB_SEGMENTS[idx];
  }, [currentIndex]);

  const handleNavigateLab = (targetId: LabSegmentId) => {
    setActive(targetId);
    window.requestAnimationFrame(() => {
      simRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  return (
    <div className="vl-page">
      {/* Primary Vijñāna Lab View Mode Switcher */}
      <div className="psw-view-toggle-btns" role="tablist" style={{ justifyContent: 'center', margin: '1rem auto 1.5rem', maxWidth: 840, padding: '0 1rem' }}>
        <button
          type="button"
          className={`psw-view-mode-pill ${viewMode === 'mission-control' ? 'is-active' : ''}`}
          onClick={() => {
            setViewMode('mission-control');
            soundEffects.playStrokeChime();
          }}
        >
          <span>🚀</span> Mission Control (8 Games)
        </button>
        <button
          type="button"
          className={`psw-view-mode-pill ${viewMode === 'workbench' ? 'is-active' : ''}`}
          onClick={() => {
            setViewMode('workbench');
            soundEffects.playStrokeChime();
            simRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
        >
          <span>🕹️</span> Workbench: {seg.code}
        </button>
        <button
          type="button"
          className={`psw-view-mode-pill ${viewMode === 'catalog' ? 'is-active' : ''}`}
          onClick={() => {
            setViewMode('catalog');
            soundEffects.playStrokeChime();
            catalogSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
        >
          <span>🎴</span> Academic Catalog (17 Sims)
        </button>
      </div>

      {viewMode === 'mission-control' && (
        <MissionControlDashboard
          explorerStats={explorerStats}
          onLaunchMission={(id) => handleLaunchSim(id as LabSegmentId)}
          onOpenPreschool={() => handleLaunchSim('preschool-wonder')}
          onOpenAdvancedLabs={() => handleLaunchSim('agnibana')}
          onViewCatalog={() => {
            setViewMode('catalog');
            soundEffects.playStrokeChime();
          }}
        />
      )}

      {viewMode === 'catalog' && (
        <>
          <header className="vl-hero">
            <div className="vl-hero-glow" aria-hidden="true" />
            <div className="vl-hero-text">
              <h1 className="vl-title">
                VIJÑĀNA PLAY LAB <span className="vl-title-badge">PROYOG</span> · <span lang="sa" className="vl-title-dev">विज्ञान-प्रयोगशाला</span>
              </h1>
              <p className="vl-lead">
                Boot up the ultimate reality &amp; science play lab. Explore ancient atomic physics, orbital planetary gravity, cymatic sand harmonics, and aerospace metallurgy through 16 interactive sandboxes from preschool wonder to scholar research. Decode Sanskrit sūtras and conquer each scientific challenge.
              </p>
              <div className="vl-btn-row">
                <button
                  type="button"
                  className={`vl-btn ${isQuestMode ? 'vl-btn--gold' : 'vl-btn--cyber'}`}
                  onClick={() => setIsQuestMode((prev) => !prev)}
                  title="Toggle between 3-Minute Guided Quests and Open Sandbox Mode"
                >
                  {isQuestMode ? '🎯 GUIDED QUEST MODE: ON' : '🕹️ FREE SANDBOX MODE'}
                </button>
                <button
                  type="button"
                  className="vl-btn vl-btn--cyber-ghost"
                  onClick={() => setIsQuestDirectoryOpen(true)}
                  title="Browse all 3-minute gamified quests across reality sandboxes"
                >
                  🧭 QUEST DIRECTORY
                </button>
                {onGoHome && <button type="button" className="vl-btn vl-btn--cyber" onClick={onGoHome}>◀ MAIN HUB</button>}
                {onOpenResources && <button type="button" className="vl-btn vl-btn--cyber-ghost" onClick={onOpenResources}>साधनानि · TOOLKIT ⚙️</button>}
              </div>
            </div>
            <div className="vl-hero-art" aria-hidden="true">
              <svg viewBox="0 0 220 160">
                <defs>
                  <radialGradient id="cyberSun" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="1" />
                    <stop offset="50%" stopColor="#0284c7" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#082f49" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="neonBeam" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="50%" stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#f43f5e" />
                  </linearGradient>
                </defs>
                <circle cx="110" cy="80" r="70" fill="none" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="110" cy="80" r="45" fill="none" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="1" />
                <circle cx="110" cy="80" r="22" fill="url(#cyberSun)" />
                <line x1="110" y1="5" x2="110" y2="155" stroke="rgba(56, 189, 248, 0.25)" strokeWidth="1" strokeDasharray="2 4" />
                <line x1="15" y1="80" x2="205" y2="80" stroke="rgba(56, 189, 248, 0.25)" strokeWidth="1" strokeDasharray="2 4" />
                <ellipse cx="110" cy="80" rx="80" ry="32" fill="none" stroke="url(#neonBeam)" strokeWidth="1.5" strokeDasharray="8 6" transform="rotate(-18 110 80)" />
                <circle cx="180" cy="68" r="5" fill="#38bdf8" />
                <path d="M 20 135 Q 45 110 70 135 T 120 135 T 170 135 T 205 135" fill="none" stroke="#2dd4bf" strokeWidth="2" opacity="0.85" />
              </svg>
            </div>
          </header>

      {/* ================================================================
          1. PhET IMPACT METRIC BANNER (REFERENCE IMAGE 2)
          ================================================================ */}
      <div className="vl-phet-impact-banner">
        <div className="vl-pib-metric">
          <span className="vl-pib-dot">●</span> OVER <strong>17+ INTERACTIVE REALITY SIMULATIONS</strong> DELIVERED
        </div>
        <div className="vl-pib-tag">
          <span>🌐</span> 100% Free Open Educational Portal · Sanskrit STEM Gurukul
        </div>
      </div>

      {/* ================================================================
          2. PhET PASTEL SUBJECT SQUIRCLES ROW (REFERENCE IMAGE 2)
          ================================================================ */}
      <div className="vl-phet-squircles-row" role="tablist" aria-label="Subject domains">
        <button
          type="button"
          className={`vl-phet-squircle vl-psq--preschool${filterLevel === "preschool" ? " is-active" : ""}`}
          onClick={() => {
            setFilterLevel("preschool");
            setFilterCat("all");
            setViewMode("catalog");
            soundEffects.playStrokeChime();
          }}
        >
          <div className="vl-psq-icon-wrap">🧸</div>
          <span className="vl-psq-title-en">Preschool</span>
          <span className="vl-psq-title-sa">शिशु-वाटिका</span>
          <span className="vl-psq-count-badge">11 Games</span>
        </button>

        <button
          type="button"
          className={`vl-phet-squircle vl-psq--physics${filterCat === "matter" ? " is-active" : ""}`}
          onClick={() => {
            setFilterCat("matter");
            setFilterLevel("all");
            setViewMode("catalog");
            soundEffects.playStrokeChime();
          }}
        >
          <div className="vl-psq-icon-wrap">⚛️</div>
          <span className="vl-psq-title-en">Physics</span>
          <span className="vl-psq-title-sa">पदार्थ-विज्ञानम्</span>
          <span className="vl-psq-count-badge">4 Sandboxes</span>
        </button>

        <button
          type="button"
          className={`vl-phet-squircle vl-psq--cosmos${filterCat === "cosmos" ? " is-active" : ""}`}
          onClick={() => {
            setFilterCat("cosmos");
            setFilterLevel("all");
            setViewMode("catalog");
            soundEffects.playStrokeChime();
          }}
        >
          <div className="vl-psq-icon-wrap">🪐</div>
          <span className="vl-psq-title-en">Earth & Space</span>
          <span className="vl-psq-title-sa">खगोल-शास्त्रम्</span>
          <span className="vl-psq-count-badge">3 Sandboxes</span>
        </button>

        <button
          type="button"
          className={`vl-phet-squircle vl-psq--life${filterCat === "life" ? " is-active" : ""}`}
          onClick={() => {
            setFilterCat("life");
            setFilterLevel("all");
            setViewMode("catalog");
            soundEffects.playStrokeChime();
          }}
        >
          <div className="vl-psq-icon-wrap">🌿</div>
          <span className="vl-psq-title-en">Biology</span>
          <span className="vl-psq-title-sa">जीव-प्रकृतिः</span>
          <span className="vl-psq-count-badge">2 Sandboxes</span>
        </button>

        <button
          type="button"
          className={`vl-phet-squircle vl-psq--math${filterCat === "waves" ? " is-active" : ""}`}
          onClick={() => {
            setFilterCat("waves");
            setFilterLevel("all");
            setViewMode("catalog");
            soundEffects.playStrokeChime();
          }}
        >
          <div className="vl-psq-icon-wrap">📐</div>
          <span className="vl-psq-title-en">Math & Waves</span>
          <span className="vl-psq-title-sa">गणित-नादः</span>
          <span className="vl-psq-count-badge">5 Sandboxes</span>
        </button>

        <button
          type="button"
          className={`vl-phet-squircle vl-psq--statecraft${filterCat === "all" && filterLevel === "all" ? " is-active" : ""}`}
          onClick={() => {
            setFilterCat("all");
            setFilterLevel("all");
            setViewMode("catalog");
            soundEffects.playStrokeChime();
          }}
        >
          <div className="vl-psq-icon-wrap">🏛️</div>
          <span className="vl-psq-title-en">All Sandboxes</span>
          <span className="vl-psq-title-sa">सर्व-विज्ञानम्</span>
          <span className="vl-psq-count-badge">17 Simulations</span>
        </button>
      </div>

      {/* ================================================================
          3. Code.org FEATURED ACTIVITY CAROUSEL (REFERENCE IMAGE 1)
          ================================================================ */}
      <section className="vl-code-carousel-section" aria-label="Featured Sanskrit STEM Sandboxes">
        <div className="vl-code-header-row">
          <div>
            <h2 className="vl-code-title">Join the Sanskrit STEM & Reality Movement</h2>
            <p className="vl-code-sub">
              Every one-hour interactive simulation below teaches something real. Browse by grade, topic, or whatever your class is ready for.
            </p>
          </div>
          <button
            type="button"
            className="vl-code-browse-btn"
            onClick={() => {
              setViewMode("catalog");
              catalogSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            Browse all 17 simulations ➔
          </button>
        </div>

        <div className="vl-code-carousel-wrapper">
          <button
            type="button"
            className="vl-code-nav-arrow"
            onClick={() => setFeaturedIdx((i) => (i > 0 ? i - 1 : FEATURED_SIMS.length - 1))}
            aria-label="Previous featured simulations"
          >
            ←
          </button>

          <div className="vl-code-cards-grid">
            {[0, 1, 2].map((offset) => {
              const item = FEATURED_SIMS[(featuredIdx + offset) % FEATURED_SIMS.length];
              return (
                <article key={item.id} className="vl-code-activity-card">
                  <span className="vl-cac-grade">{item.gradeBadge}</span>
                  <h3 className="vl-cac-title">{item.title}</h3>
                  <div className="vl-cac-banner" style={{ background: item.bannerGradient }}>
                    <span>{item.bannerArt}</span>
                  </div>
                  <p className="vl-cac-desc">{item.desc}</p>
                  <button
                    type="button"
                    className="vl-cac-cta"
                    onClick={() => handleLaunchSim(item.id as LabSegmentId)}
                  >
                    {item.cta} ➔
                  </button>
                </article>
              );
            })}
          </div>

          <button
            type="button"
            className="vl-code-nav-arrow"
            onClick={() => setFeaturedIdx((i) => (i + 1) % FEATURED_SIMS.length)}
            aria-label="Next featured simulations"
          >
            →
          </button>
        </div>

        <div className="vl-code-dots-row">
          {FEATURED_SIMS.map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              className={`vl-code-dot${dotIdx === featuredIdx ? " is-active" : ""}`}
              onClick={() => setFeaturedIdx(dotIdx)}
              aria-label={`Go to featured slide ${dotIdx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ================================================================
          4. PhET SIMULATION CATALOG WITH FACETED SIDEBAR (REFERENCE IMAGE 3)
          ================================================================ */}
      <div ref={catalogSectionRef} className="vl-phet-catalog-section" aria-label="Simulations Catalog">
        {/* Top Breadcrumbs & Search Bar */}
        <div className="vl-phet-top-nav-bar">
          <div className="vl-phet-crumbs-row">
            <span className="vl-phet-crumb-chip">HTML5 / WebAudio ✓</span>
            {filterLevel !== "all" && (
              <span className="vl-phet-crumb-chip">
                Level: {filterLevel} <button type="button" onClick={() => setFilterLevel("all")}>✕</button>
              </span>
            )}
            {filterCat !== "all" && (
              <span className="vl-phet-crumb-chip">
                Topic: {filterCat} <button type="button" onClick={() => setFilterCat("all")}>✕</button>
              </span>
            )}
            {searchQuery && (
              <span className="vl-phet-crumb-chip">
                &quot;{searchQuery}&quot; <button type="button" onClick={() => setSearchQuery("")}>✕</button>
              </span>
            )}
          </div>

          <div className="psw-view-toggle-btns" role="tablist" style={{ margin: '0 0.5rem' }}>
            <button
              type="button"
              className="psw-view-mode-pill"
              onClick={() => {
                setViewMode('mission-control');
                soundEffects.playStrokeChime();
              }}
            >
              <span>🚀</span> Mission Control
            </button>
            <button
              type="button"
              className="psw-view-mode-pill is-active"
              onClick={() => {
                soundEffects.playStrokeChime();
                catalogSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              <span>🎴</span> Catalog Grid ({visibleSegments.length})
            </button>
            <button
              type="button"
              className="psw-view-mode-pill"
              onClick={() => {
                setViewMode('workbench');
                soundEffects.playStrokeChime();
                simRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              <span>🕹️</span> Workbench: {seg.code}
            </button>
          </div>

          <div className="vl-search-box" style={{ maxWidth: 320, margin: 0 }}>
            <span className="vl-search-icon" aria-hidden="true">🔍</span>
            <input
              type="text"
              className="vl-search-input"
              placeholder="Search simulations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search simulations"
            />
            {searchQuery && (
              <button
                type="button"
                className="vl-search-clear"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* PhET Two-Column Layout */}
        <div className="vl-phet-layout-row">
          {/* Left Faceted Sidebar */}
          <aside className="vl-phet-sidebar" aria-label="Simulation Filters">
            <div className="vl-phet-sb-header">
              <span className="vl-phet-sb-title">Filters</span>
              <button
                type="button"
                className="vl-phet-clear-btn"
                onClick={() => {
                  setFilterCat("all");
                  setFilterLevel("all");
                  setSearchQuery("");
                }}
              >
                Clear Filters
              </button>
            </div>

            <div className="vl-phet-filter-group">
              <span className="vl-phet-fg-title">Subjects</span>
              <label className="vl-phet-tree-item">
                <input
                  type="checkbox"
                  checked={filterLevel === "preschool"}
                  onChange={(e) => setFilterLevel(e.target.checked ? "preschool" : "all")}
                />
                <span>🧸 Preschool Wonder (11)</span>
              </label>
              <label className="vl-phet-tree-item">
                <input
                  type="checkbox"
                  checked={filterCat === "matter"}
                  onChange={(e) => setFilterCat(e.target.checked ? "matter" : "all")}
                />
                <span>⚛️ Matter & Atoms (Physics)</span>
              </label>
              <label className="vl-phet-tree-item">
                <input
                  type="checkbox"
                  checked={filterCat === "cosmos"}
                  onChange={(e) => setFilterCat(e.target.checked ? "cosmos" : "all")}
                />
                <span>🪐 Cosmos & Space (Astronomy)</span>
              </label>
              <label className="vl-phet-tree-item">
                <input
                  type="checkbox"
                  checked={filterCat === "life"}
                  onChange={(e) => setFilterCat(e.target.checked ? "life" : "all")}
                />
                <span>🌿 Life & Ecology (Biology)</span>
              </label>
              <label className="vl-phet-tree-item">
                <input
                  type="checkbox"
                  checked={filterCat === "waves"}
                  onChange={(e) => setFilterCat(e.target.checked ? "waves" : "all")}
                />
                <span>📐 Waves & Math (Cymatics)</span>
              </label>
            </div>

            <div className="vl-phet-filter-group">
              <button
                type="button"
                className="vl-phet-accordion-btn"
                onClick={() => setIsGradeAccordionOpen((o) => !o)}
              >
                <span>Grade Level</span>
                <span>{isGradeAccordionOpen ? "−" : "+"}</span>
              </button>
              {isGradeAccordionOpen && (
                <div style={{ paddingTop: "0.45rem" }}>
                  <label className="vl-phet-tree-item">
                    <input
                      type="checkbox"
                      checked={filterLevel === "preschool"}
                      onChange={(e) => setFilterLevel(e.target.checked ? "preschool" : "all")}
                    />
                    <span>Preschool (Ages 2–6)</span>
                  </label>
                  <label className="vl-phet-tree-item">
                    <input
                      type="checkbox"
                      checked={filterLevel === "primary"}
                      onChange={(e) => setFilterLevel(e.target.checked ? "primary" : "all")}
                    />
                    <span>Primary (Grades 3–5)</span>
                  </label>
                  <label className="vl-phet-tree-item">
                    <input
                      type="checkbox"
                      checked={filterLevel === "middle"}
                      onChange={(e) => setFilterLevel(e.target.checked ? "middle" : "all")}
                    />
                    <span>Middle (Grades 6–8)</span>
                  </label>
                  <label className="vl-phet-tree-item">
                    <input
                      type="checkbox"
                      checked={filterLevel === "high"}
                      onChange={(e) => setFilterLevel(e.target.checked ? "high" : "all")}
                    />
                    <span>High School (Grades 9–12)</span>
                  </label>
                </div>
              )}
            </div>

            <div className="vl-phet-filter-group">
              <button
                type="button"
                className="vl-phet-accordion-btn"
                onClick={() => setIsFeaturesAccordionOpen((o) => !o)}
              >
                <span>Inclusive Features</span>
                <span>{isFeaturesAccordionOpen ? "−" : "+"}</span>
              </button>
              {isFeaturesAccordionOpen && (
                <div style={{ paddingTop: "0.45rem" }}>
                  <label className="vl-phet-tree-item">
                    <input type="checkbox" defaultChecked />
                    <span>🔊 Sanskrit Audio Speech</span>
                  </label>
                  <label className="vl-phet-tree-item">
                    <input type="checkbox" defaultChecked />
                    <span>👆 Direct Touch Controls</span>
                  </label>
                  <label className="vl-phet-tree-item">
                    <input type="checkbox" defaultChecked />
                    <span>🎯 3-Min Guided Quests</span>
                  </label>
                  <label className="vl-phet-tree-item">
                    <input type="checkbox" defaultChecked />
                    <span>📜 Sūtra Translation</span>
                  </label>
                </div>
              )}
            </div>
          </aside>

          {/* Right Simulation Grid */}
          <div className="vl-phet-catalog-grid">
            {visibleSegments.map((s) => {
              const isPreschool = s.level === "preschool";
              const isCurrent = s.id === active;
              const isNewSim =
                s.id === "preschool-wonder" ||
                s.id === "agnibana" ||
                s.id === "chandrayaan" ||
                s.id === "mantra-acoustics";

              return (
                <div
                  key={s.id}
                  className={`vl-phet-sim-card${isCurrent ? " is-active-sim" : ""}`}
                  onClick={() => handleLaunchSim(s.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleLaunchSim(s.id);
                  }}
                >
                  <div className="vl-psc-thumb" style={{ background: s.tint, color: s.ink }}>
                    {isNewSim && <span className="vl-psc-ribbon-new">NEW!</span>}
                    <span>{s.icon}</span>
                  </div>

                  <div className="vl-psc-body">
                    <span className="vl-psc-sector-tag">
                      {s.code} · {s.ageRange}
                    </span>
                    <h3 className="vl-psc-title">{s.title}</h3>
                    <div className="vl-psc-sa" lang="sa">
                      {s.dev}
                    </div>

                    <div className="vl-psc-badges-row">
                      <span className="vl-psc-badge">HTML5</span>
                      <span className="vl-psc-badge">⌨️</span>
                      <span className="vl-psc-badge">🔊</span>
                      <span className="vl-psc-badge">👆</span>
                      {isPreschool && (
                        <span
                          className="vl-psc-badge"
                          style={{ background: "#fef3c7", color: "#92400e", fontWeight: 900 }}
                        >
                          11 Games
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      </>
      )}

      {viewMode === 'workbench' && (
        <>
        <section id={active} ref={simRef} className="vl-segment" aria-labelledby={`vl-h-${active}`} data-testid="lab-segment" data-segment={active}>
        {/* In-Workbench Return Navigation Bar */}
        <div className="vl-workbench-phet-nav">
          <button
            type="button"
            className="vl-wpn-back-btn"
            style={{ background: '#f59e0b', color: '#1e1b4b' }}
            onClick={() => {
              setViewMode('mission-control');
              soundEffects.playStrokeChime();
            }}
          >
            🚀 Mission Control (8 Games)
          </button>
          <button
            type="button"
            className="vl-wpn-back-btn"
            onClick={() => {
              setViewMode('catalog');
              soundEffects.playStrokeChime();
              catalogSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          >
            🎴 All 17 Simulations
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 900, color: '#0f172a' }}>
            <span>{seg.icon}</span>
            <span>Active Sandbox: <strong>{seg.code} · {seg.title} ({seg.dev})</strong></span>
          </div>
          {activeMissionCard && (
            <button
              type="button"
              className="vl-btn vl-btn--gold"
              style={{ padding: '0.45rem 1rem', fontSize: '0.82rem', fontWeight: 800 }}
              onClick={handleCompleteActiveMission}
            >
              🎉 Spark Science (+3 ⭐)
            </button>
          )}
          {activeMissionCard && (
            <button
              type="button"
              className="vl-btn vl-btn--cyber-ghost"
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem' }}
              onClick={() => setIsParentNotesOpen(true)}
            >
              📘 Parent Notes
            </button>
          )}
          <button
            type="button"
            className="vl-btn vl-btn--cyber-ghost"
            style={{ padding: '0.45rem 1rem', fontSize: '0.82rem' }}
            onClick={() => setIsQuestDirectoryOpen(true)}
          >
            🧭 Quest Directory
          </button>
        </div>

        {/* Top Quick-Navigation HUD Bar */}
        <nav className="vl-lab-bench-nav" aria-label="Sector navigation bar">
          <button
            type="button"
            className="vl-lab-nav-btn vl-lab-nav-btn--prev"
            onClick={() => handleNavigateLab(prevSeg.id)}
            title={`Previous Lab: ${prevSeg.code} ${prevSeg.title}`}
          >
            <span className="vl-nav-arrow" aria-hidden="true">◀</span>
            <span className="vl-nav-meta">
              <span className="vl-nav-dir">PREV LAB</span>
              <span className="vl-nav-label">{prevSeg.icon} {prevSeg.code} · {prevSeg.title}</span>
            </span>
          </button>

          <div className="vl-lab-nav-status">
            <div className="vl-nav-badge">
              <span className="vl-hud-blink">●</span> SECTOR {String(currentIndex + 1).padStart(2, '0')} / {String(LAB_SEGMENTS.length).padStart(2, '0')}
            </div>
            <div className="vl-nav-pills-row" role="tablist" aria-label="Direct sector jump">
              {LAB_SEGMENTS.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  className={`vl-nav-step-dot${s.id === active ? ' is-active' : ''}`}
                  onClick={() => handleNavigateLab(s.id)}
                  title={`${s.code}: ${s.title} (${s.dev})`}
                  aria-label={`Jump to ${s.code} ${s.title}`}
                >
                  <span className="vl-step-num">{idx + 1}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="vl-lab-nav-btn vl-lab-nav-btn--next"
            onClick={() => handleNavigateLab(nextSeg.id)}
            title={`Next Lab: ${nextSeg.code} ${nextSeg.title}`}
          >
            <span className="vl-nav-meta vl-nav-meta--right">
              <span className="vl-nav-dir">NEXT LAB ➔</span>
              <span className="vl-nav-label">{nextSeg.icon} {nextSeg.code} · {nextSeg.title}</span>
            </span>
            <span className="vl-nav-arrow" aria-hidden="true">▶</span>
          </button>
        </nav>

        {/* Workbench Quick Tier Jump Bar */}
        <div className="vl-workbench-quick-tiers" role="navigation" aria-label="Quick Educational Tier Jump">
          <span className="vl-wqt-label">TIER JUMP:</span>
          <button
            type="button"
            className={`vl-wqt-pill vl-wqt-pill--preschool${seg.level === 'preschool' ? ' is-active' : ''}`}
            onClick={() => handleNavigateLab('preschool-wonder')}
            title="Jump to Preschool Wonder Playground (Shapes, Moon, Seasons, Vāhanas)"
          >
            🧸 Preschool (Ages 3–6)
          </button>
          <button
            type="button"
            className={`vl-wqt-pill vl-wqt-pill--primary${seg.level === 'primary' ? ' is-active' : ''}`}
            onClick={() => handleNavigateLab('jyotisha')}
            title="Jump to Primary Planetary Orbit Gravity"
          >
            🎒 Primary (Grades 3–5)
          </button>
          <button
            type="button"
            className={`vl-wqt-pill vl-wqt-pill--middle${seg.level === 'middle' ? ' is-active' : ''}`}
            onClick={() => handleNavigateLab('chandrayaan')}
            title="Jump to Middle School Chandrayaan Lander"
          >
            🔬 Middle (Grades 6–8)
          </button>
          <button
            type="button"
            className={`vl-wqt-pill vl-wqt-pill--high${seg.level === 'high' || seg.level === 'advanced' ? ' is-active' : ''}`}
            onClick={() => handleNavigateLab('paramanu')}
            title="Jump to High School Atom Synthesizer"
          >
            🚀 Advanced (Atoms / Rockets)
          </button>
        </div>

        {/* Biological Continuum Track Banner for Life Sciences */}
        {seg.category === 'life' && active !== 'preschool-wonder' && (
          <div className="vl-bio-continuum-banner" role="region" aria-label="Life Sciences Continuum Track">
            <div className="vl-bio-continuum-title">
              <span className="vl-hud-blink">●</span> BIOLOGICAL CONTINUUM TRACK // जीव-विज्ञान-परम्परा (CELLULAR ➔ ORGANISMAL)
            </div>
            <div className="vl-bio-continuum-steps">
              <button
                type="button"
                className={`vl-bio-step${active === 'prakriti' ? ' is-current' : ' is-done'}`}
                onClick={() => handleNavigateLab('prakriti')}
              >
                <span className="vl-bio-step-num">STAGE 1 · SEC-03</span>
                <span className="vl-bio-step-name">🌿 Prakṛti Biosphere</span>
                <span className="vl-bio-step-sub">Sub-Cellular Homeostasis &amp; Tridoṣa Ion Balance</span>
              </button>

              <div className="vl-bio-step-connector" aria-hidden="true">
                ──(Scaling to Organism)──▶
              </div>

              <button
                type="button"
                className={`vl-bio-step${active === 'chaturyoni' ? ' is-current' : ''}`}
                onClick={() => handleNavigateLab('chaturyoni')}
              >
                <span className="vl-bio-step-num">STAGE 2 · SEC-04</span>
                <span className="vl-bio-step-name">🦢 Chaturyoni Spawn Map</span>
                <span className="vl-bio-step-sub">Whole-Organism Taxonomy &amp; Plant Galvanometry</span>
              </button>
            </div>
          </div>
        )}

        <h2 id={`vl-h-${active}`} className="vl-seg-title" style={{ color: seg.ink }}>
          <span aria-hidden="true">{seg.icon}</span> {seg.title} <span className="vl-seg-dev" lang="sa">{seg.dev}</span>
        </h2>

        {/* Bodhi Wisdom & Civilizational Context Card */}
        <div style={{ marginBottom: '1.75rem' }}>
          <BodhiWisdomCard gameId={active} gameTitle={seg.title} />
        </div>

        {/* Guided Quest Mode HUD (3-Minute Gamified Missions) */}
        {isQuestMode && active !== 'preschool-wonder' && (
          <GuidedQuestHUD
            labId={active}
            labTitle={seg.title}
            onOpenAllQuestsModal={() => setIsQuestDirectoryOpen(true)}
          />
        )}

        <Suspense fallback={<SimLoader />}>
          {active === 'preschool-wonder' && <PreschoolWonderLab onNextLab={() => handleNavigateLab(nextSeg.id)} />}
          {active === 'paramanu' && <ParamanuBuilder onNextLab={() => handleNavigateLab(nextSeg.id)} />}
          {active === 'asato-ma' && <AsatoMa />}
          {active === 'prakriti' && <PrakritiBalance onNextLab={() => handleNavigateLab(nextSeg.id)} />}
          {active === 'chaturyoni' && <Chaturyoni onNextLab={() => handleNavigateLab(nextSeg.id)} />}
          {active === 'jyotisha' && <JyotishaOrbit />}
          {active === 'chandrayaan' && <Chandrayaan />}
          {active === 'nada-brahman' && <NadaBrahman />}
          {active === 'srishti-sthiti-laya' && <SrishtiLoom />}
          {active === 'rituparna' && <RituparnaSampling />}
          {active === 'agnibana' && <AgnibanaRocketLab />}
          {active === 'vedic-geometry' && <VedicGeometryLab onNextLab={() => handleNavigateLab(nextSeg.id)} />}
          {active === 'mantra-acoustics' && <MantraAcousticsLab onNextLab={() => handleNavigateLab(nextSeg.id)} />}
          {active === 'temple-engineering' && <TempleEngineeringLab onNextLab={() => handleNavigateLab(nextSeg.id)} />}
          {active === 'kautilya' && <KautilyaStatecraft onNextLab={() => handleNavigateLab(nextSeg.id)} />}
          {active === 'chandahshastra' && <ChandahshastraLab onNextLab={() => handleNavigateLab(nextSeg.id)} />}
          {active === 'ujjain-geodesy' && <UjjainGeodesyStudio onNextLab={() => handleNavigateLab(nextSeg.id)} />}
        </Suspense>


        {/* Bottom Next Lab Gateway Card */}
        <div className="vl-next-lab-gateway" style={{ '--next-glow': nextSeg.glow, '--next-ink': nextSeg.ink, '--next-tint': nextSeg.tint } as React.CSSProperties}>
          <div className="vl-nlg-header">
            <div className="vl-nlg-kicker">
              <span className="vl-hud-blink">●</span> SECTOR {seg.code} SIMULATION BENCH // NEXT EXPEDITION AVAILABLE
            </div>
            <div className="vl-nlg-title-row">
              <h3 className="vl-nlg-heading">
                Ready for the Next Vijñāna Exploration?
              </h3>
              <span className="vl-nlg-counter">
                {currentIndex + 1} of {LAB_SEGMENTS.length} Sectors Explored
              </span>
            </div>
          </div>

          <div className="vl-nlg-card">
            <div className="vl-nlg-card-left">
              <div className="vl-nlg-icon-circle">
                <span className="vl-nlg-big-icon" aria-hidden="true">{nextSeg.icon}</span>
                <span className="vl-nlg-code-badge">{nextSeg.code}</span>
              </div>
              <div className="vl-nlg-card-details">
                <div className="vl-nlg-dev" lang="sa">{nextSeg.dev}</div>
                <h4 className="vl-nlg-lab-title">{nextSeg.title}</h4>
                <div className="vl-nlg-tags">
                  <span className="vl-nlg-tag vl-nlg-tag--subj">{nextSeg.subject}</span>
                  <span className="vl-nlg-tag vl-nlg-tag--school">ARCHIVE // {nextSeg.school}</span>
                  <span className="vl-nlg-tag vl-nlg-tag--cat">{nextSeg.category.toUpperCase()}</span>
                </div>
                <p className="vl-nlg-blurb">{nextSeg.blurb}</p>
              </div>
            </div>

            <div className="vl-nlg-card-actions">
              <button
                type="button"
                className="vl-btn vl-btn--cyber vl-btn--nlg-proceed"
                onClick={() => handleNavigateLab(nextSeg.id)}
                aria-label={`Enter Next Lab: ${nextSeg.title}`}
              >
                <span>ENTER NEXT LAB: {nextSeg.title}</span>
                <span className="vl-nlg-arrow-icon" aria-hidden="true">➔</span>
              </button>

              <div className="vl-nlg-sub-row">
                <button
                  type="button"
                  className="vl-nlg-sub-btn"
                  onClick={() => handleNavigateLab(prevSeg.id)}
                >
                  ◀ Previous Lab: {prevSeg.code}
                </button>
                <button
                  type="button"
                  className="vl-nlg-sub-btn"
                  onClick={() => simRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                >
                  ▲ Back to Top
                </button>
              </div>
            </div>
          </div>

          {/* All Sectors Grid Strip */}
          <div className="vl-nlg-strip-wrap">
            <span className="vl-nlg-strip-title">EXPLORE ALL {LAB_SEGMENTS.length} SCIENCE SECTORS:</span>
            <div className="vl-nlg-strip">
              {LAB_SEGMENTS.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  className={`vl-nlg-strip-btn${s.id === active ? ' is-current' : ''}`}
                  onClick={() => handleNavigateLab(s.id)}
                  title={`${s.code}: ${s.title}`}
                >
                  <span className="vl-nlg-strip-idx">{idx + 1}</span>
                  <span className="vl-nlg-strip-icon">{s.icon}</span>
                  <span className="vl-nlg-strip-code">{s.code}</span>
                  <span className="vl-nlg-strip-name">{s.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <Suspense fallback={<div className="vl-loading">Loading Bodhi Vijñāna Console…</div>}>
          <LabBodhiConsole activeSegment={active} />
        </Suspense>

        {/* Floating Mission Complete Button */}
        {activeMissionCard && (
          <button
            type="button"
            className="vl-wb-mission-complete-dock"
            onClick={handleCompleteActiveMission}
            title="Complete 3-Minute Mission & Unlock Vidyā Stars"
          >
            <span>🎉</span>
            <span>Complete Mission &amp; Spark Science (+3 ⭐)</span>
          </button>
        )}
      </section>

      {/* ================================================================
          SEO SECTION: SCIENCE LAB GAMES ACROSS ALL LEARNING LEVELS
          ================================================================ */}
      <section className="vl-seo-games-section" aria-label="About Vijñāna Science Lab Games and STEM Learning Levels">
        <div className="vl-sgs-header">
          <div className="vl-sgs-badge">
            <span>🔬</span>
            <span>SCIENCE LAB GAMES · विज्ञान-क्रीडा-शाला</span>
          </div>
          <h2 className="vl-sgs-title">
            Science Lab Games: Interactive Sanskrit STEM Sandboxes Across All Learning Levels
          </h2>
          <p className="vl-sgs-lead">
            Welcome to the <strong>Vijñāna Science Lab</strong> — a living virtual laboratory combining classical Indian scientific inquiries (पदार्थ, खगोल, आयुर्वेद, छन्दस्, शुल्ब) with modern empirical physics, biology, aerospace engineering, and computational mathematics. Designed for children, school students, and scholars, every simulation operates as an experiential, gamified sandbox.
          </p>
        </div>

        {/* 5-Level Educational Progression Grid */}
        <div className="vl-sgs-levels-grid">
          <div className="vl-sgs-level-card vl-slc--preschool">
            <div className="vl-slc-top">
              <span className="vl-slc-icon">🧸</span>
              <div>
                <span className="vl-slc-tag">LEVEL 1 · AGES 3–7</span>
                <h3 className="vl-slc-title">Preschool &amp; Early Explorer (शिशु-बोध)</h3>
              </div>
            </div>
            <p className="vl-slc-desc">
              Multisensory discovery games designed for young children. Explore the five natural elements (पञ्चमहाभूतानि), discover animals and plants through the Chaturyoni taxonomy, pluck vibrating strings to see sand mandalas, and observe seasonal water and sunlight cycles.
            </p>
            <div className="vl-slc-games">
              <strong>Featured Science Games:</strong>
              <ul>
                <li><strong>Cosmic Sitār Tuning:</strong> Pluck strings to watch acoustic waves form geometric Chladni sand mandalas.</li>
                <li><strong>Prakṛti Biosphere:</strong> Slide temperature and water dials to balance cellular energy.</li>
                <li><strong>Chaturyoni Creature Map:</strong> Match animals into egg-born, womb-born, and sprout-born life families.</li>
              </ul>
            </div>
          </div>

          <div className="vl-sgs-level-card vl-slc--primary">
            <div className="vl-slc-top">
              <span className="vl-slc-icon">🎒</span>
              <div>
                <span className="vl-slc-tag">LEVEL 2 · GRADES 3–5 (AGES 8–10)</span>
                <h3 className="vl-slc-title">Primary School &amp; Hands-On Physics (प्रारम्भिक)</h3>
              </div>
            </div>
            <p className="vl-slc-desc">
              Elementary school science games that turn abstract textbook principles into tactile experiments. Learn mass conservation by boiling and freezing matter, steer planets with gravitational pulls, and construct interlocking temple stones.
            </p>
            <div className="vl-slc-games">
              <strong>Featured Science Games:</strong>
              <ul>
                <li><strong>The Veil of Māyā:</strong> Burn, melt, and evaporate materials while the digital scale proves mass is invariant (100.000g).</li>
                <li><strong>Jyotiṣa Gravity Sandbox:</strong> Orbit Earth and Moon around the Sun without crashing or flying off.</li>
                <li><strong>Living Geometry of the Gurukul:</strong> Morph shapes with rotation and extension using ancient rope geometry.</li>
                <li><strong>Ancient Temple Engineering:</strong> Test King Bhoja&apos;s dry masonry joints under earthquake vibrations.</li>
              </ul>
            </div>
          </div>

          <div className="vl-sgs-level-card vl-slc--middle">
            <div className="vl-slc-top">
              <span className="vl-slc-icon">🔬</span>
              <div>
                <span className="vl-slc-tag">LEVEL 3 · GRADES 6–8 (AGES 11–14)</span>
                <h3 className="vl-slc-title">Middle School &amp; CBSE/NCERT Alignment (माध्यमिक)</h3>
              </div>
            </div>
            <p className="vl-slc-desc">
              Directly aligned with middle school CBSE science syllabus: atomic theory, rocketry, motion laws, cellular biology, and lunar space science.
            </p>
            <div className="vl-slc-games">
              <strong>Featured Science Games:</strong>
              <ul>
                <li><strong>Paramāṇu Builder:</strong> Combine individual atomic particles into dyads (Dvyaṇuka) and visible triads (Tryaṇuka).</li>
                <li><strong>Somayāna Mission-03 (Chandrayaan):</strong> Execute thruster burns to land on the Moon&apos;s South Pole and fire LIBS laser spectroscopy.</li>
                <li><strong>Agnibāṇa Rocketry:</strong> Tune propellant ratios (5:1:1 Agnicūrṇa) and launch angles to hit target coordinates.</li>
                <li><strong>The Loom of Āruṇi:</strong> Master quantum energy conservation and particle fields in real time.</li>
              </ul>
            </div>
          </div>

          <div className="vl-sgs-level-card vl-slc--high">
            <div className="vl-slc-top">
              <span className="vl-slc-icon">🚀</span>
              <div>
                <span className="vl-slc-tag">LEVEL 4 · GRADES 9–12 (AGES 14–18)</span>
                <h3 className="vl-slc-title">High School STEM &amp; Mathematical Physics (उच्च-माध्यमिक)</h3>
              </div>
            </div>
            <p className="vl-slc-desc">
              Rigorous high school physics, astronomical geodesy, probability theory, and computer science foundations.
            </p>
            <div className="vl-slc-games">
              <strong>Featured Science Games:</strong>
              <ul>
                <li><strong>Ancient Prime Meridian &amp; Geodesy:</strong> Compute longitude offsets, solar noon deviations, and the Tropic of Cancer drift at Ujjain.</li>
                <li><strong>Ṛtuparṇa Sampling Lab:</strong> Roll Mahābhārata Akṣa dice to demonstrate the Law of Large Numbers and Monte Carlo sampling.</li>
                <li><strong>Chandaḥśāstra Binary Permutations:</strong> Decode Piṅgala&apos;s binary trees, Pascal&apos;s triangle (Meruprastāra), and Fibonacci sequences.</li>
              </ul>
            </div>
          </div>

          <div className="vl-sgs-level-card vl-slc--advanced">
            <div className="vl-slc-top">
              <span className="vl-slc-icon">🏛️</span>
              <div>
                <span className="vl-slc-tag">LEVEL 5 · COLLEGE &amp; RESEARCH (GRADE 11+)</span>
                <h3 className="vl-slc-title">Advanced Scholar &amp; Epistemological Lab (विद्वत्-शोध)</h3>
              </div>
            </div>
            <p className="vl-slc-desc">
              University-level mathematical modeling, structural dynamics, comparative philosophy of science, and computational quantitative statecraft.
            </p>
            <div className="vl-slc-games">
              <strong>Featured Science Games:</strong>
              <ul>
                <li><strong>Kauṭilya Quantitative Statecraft:</strong> Balance 7-limb Saptāṅga state dynamics and calculate maritime risk actuarial tables.</li>
                <li><strong>Mantra Acoustics &amp; Sāma Veda Harmonics:</strong> Investigate physical harmonic series fractions and the Chamakam square number matrices.</li>
                <li><strong>Pāṇinian &amp; Vaiśeṣika Computational Semantics:</strong> Bridge ancient Indian atomism with modern quantum theory.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Curriculum Alignment & Science Features Matrix */}
        <div className="vl-sgs-table-wrap">
          <h3 className="vl-sgs-table-title">Science Lab Games Curriculum &amp; STEM Standards Matrix</h3>
          <div className="vl-sgs-table-responsive">
            <table className="vl-sgs-table">
              <thead>
                <tr>
                  <th scope="col">Game / Sandbox</th>
                  <th scope="col">Target Level</th>
                  <th scope="col">Sanskrit Discipline</th>
                  <th scope="col">Modern STEM Concept</th>
                  <th scope="col">Interactive Game Mechanics</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Paramāṇu Builder</strong></td>
                  <td>Middle School (Grades 6–8)</td>
                  <td>Vaiśeṣika Darśana (कणाद-परमाणुवादः)</td>
                  <td>Atomic Theory, Molecule Synthesis</td>
                  <td>Drag-and-combine particles into Dvyaṇuka &amp; Tryaṇuka</td>
                </tr>
                <tr>
                  <td><strong>The Veil of Māyā</strong></td>
                  <td>Primary (Grades 3–5)</td>
                  <td>Andha-Mūṣā (रसशास्त्र &amp; सत्कार्यवाद)</td>
                  <td>Law of Conservation of Mass</td>
                  <td>Burn, boil and melt matter with invariant 100g readout</td>
                </tr>
                <tr>
                  <td><strong>Prakṛti Biosphere</strong></td>
                  <td>Preschool to Grade 2</td>
                  <td>Āyurveda (त्रिदोष-सिद्धान्तः)</td>
                  <td>Cellular Homeostasis &amp; Ecology</td>
                  <td>Real-time temperature, moisture &amp; seasonal sliders</td>
                </tr>
                <tr>
                  <td><strong>Chaturyoni Spawn Map</strong></td>
                  <td>Preschool to Primary</td>
                  <td>Vṛkṣāyurveda &amp; J.C. Bose</td>
                  <td>Plant Neurobiology &amp; Taxonomy</td>
                  <td>Action potential microvolt graphs &amp; 4-kingdom sort</td>
                </tr>
                <tr>
                  <td><strong>Jyotiṣa Gravity Sandbox</strong></td>
                  <td>Primary &amp; Middle (Grades 3–6)</td>
                  <td>Āryabhaṭīya (खगोल-शास्त्रम्)</td>
                  <td>Gravitational Orbits &amp; Astronomy</td>
                  <td>N-body vector orbit thrust &amp; 27 Nakṣatra tracer</td>
                </tr>
                <tr>
                  <td><strong>Somayāna Mission-03</strong></td>
                  <td>Middle School (Grades 6–9)</td>
                  <td>ISRO Chandrayaan-3 Mission</td>
                  <td>Lunar Trajectory &amp; Spectroscopy</td>
                  <td>Descent thruster braking &amp; LIBS mineral scanning</td>
                </tr>
                <tr>
                  <td><strong>Cosmic Sitār Tuning</strong></td>
                  <td>Preschool to All Ages</td>
                  <td>Nāda Brahman &amp; Gandharva Veda</td>
                  <td>Acoustics &amp; Chladni Cymatics</td>
                  <td>Pluck strings, tune 22 Śrutis &amp; form sand mandalas</td>
                </tr>
                <tr>
                  <td><strong>Agnibāṇa Rocketry</strong></td>
                  <td>Middle to High School</td>
                  <td>Śukranīti (अग्निबाण-शास्त्रम्)</td>
                  <td>Aerospace Ballistics &amp; Combustion</td>
                  <td>Chemical propellant ratio tuning &amp; arc projection</td>
                </tr>
                <tr>
                  <td><strong>Ancient Prime Meridian</strong></td>
                  <td>High School (Grades 9–12)</td>
                  <td>Sūrya Siddhānta &amp; Varāhamihira</td>
                  <td>Geodesy &amp; 0° Prime Meridian</td>
                  <td>Panchang offset calculations &amp; Tropic of Cancer drift</td>
                </tr>
                <tr>
                  <td><strong>Chandaḥśāstra Combinatorics</strong></td>
                  <td>High School &amp; Scholar</td>
                  <td>Piṅgala Chandaḥśāstra</td>
                  <td>Binary Trees &amp; Pascal Triangle</td>
                  <td>Mātrā beat generation, Meruprastāra &amp; Fibonacci</td>
                </tr>
                <tr>
                  <td><strong>Kauṭilya Statecraft</strong></td>
                  <td>Advanced Scholar (College+)</td>
                  <td>Arthaśāstra (नीति-प्रशासनम्)</td>
                  <td>Quantitative Economics &amp; Risk</td>
                  <td>Actuarial interest models &amp; Saptāṅga balance matrix</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Benefits for Parents, Teachers & Schools */}
        <div className="vl-sgs-features-row">
          <div className="vl-sgs-feature-col">
            <span className="vl-sfc-icon">🛡️</span>
            <h4>100% Kid-Safe &amp; Ad-Free</h4>
            <p>Zero advertisements, zero third-party tracking, and fully compliant with student privacy protections. Pure educational exploration.</p>
          </div>
          <div className="vl-sgs-feature-col">
            <span className="vl-sfc-icon">⚡</span>
            <h4>60 FPS WebGL Simulations</h4>
            <p>Runs smoothly on laptops, tablets, and smartphones without downloading any app or plugins. Accessible directly through any web browser.</p>
          </div>
          <div className="vl-sgs-feature-col">
            <span className="vl-sfc-icon">🇮🇳</span>
            <h4>Aligned with NEP 2020</h4>
            <p>Embodies the National Education Policy (NEP 2020) vision of integrating Indian Knowledge Systems (IKS) with rigorous modern empirical STEM inquiry.</p>
          </div>
        </div>
      </section>

      {/* Floating Bottom Quick-Dock Bar */}
      <aside className="vl-floating-dock" aria-label="Quick lab switcher">
        <button
          type="button"
          className="vl-dock-btn vl-dock-btn--prev"
          onClick={() => handleNavigateLab(prevSeg.id)}
          title={`Previous: ${prevSeg.code} ${prevSeg.title}`}
        >
          <span className="vl-dock-arrow" aria-hidden="true">◀</span>
          <span className="vl-dock-text">{prevSeg.icon} {prevSeg.code}</span>
        </button>

        <div className="vl-dock-current">
          <span className="vl-dock-pulse" aria-hidden="true" />
          <span className="vl-dock-curr-code">{seg.code}</span>
          <span className="vl-dock-curr-title">{seg.icon} {seg.title}</span>
          <span className="vl-dock-curr-count">({currentIndex + 1}/{LAB_SEGMENTS.length})</span>
        </div>

        <button
          type="button"
          className="vl-dock-btn vl-dock-btn--next"
          onClick={() => handleNavigateLab(nextSeg.id)}
          title={`Next: ${nextSeg.code} ${nextSeg.title}`}
        >
          <span className="vl-dock-text">Next: {nextSeg.icon} {nextSeg.code}</span>
          <span className="vl-dock-arrow" aria-hidden="true">➔</span>
        </button>
      </aside>
      </>
      )}

      <p className="vl-footnote">
        Content note: the lab uses “traditionally”, “attributed to” and “preserved in” on purpose. Old texts and modern science
        ask different questions; where we compare them, the comparison is labelled.
      </p>

      {/* 3-Minute Reality Sandbox Quests Archive Modal */}
      <QuestDirectoryModal
        isOpen={isQuestDirectoryOpen}
        onClose={() => setIsQuestDirectoryOpen(false)}
        onSelectQuest={(targetLabId) => {
          handleNavigateLab(targetLabId as LabSegmentId);
          setIsQuestMode(true);
          setViewMode('workbench');
        }}
        activeLabId={active}
      />

      {/* Post-Mission Celebration & Science Spark Modal */}
      {activeMissionCard && (
        <ScienceSparkModal
          mission={activeMissionCard}
          isOpen={isScienceSparkOpen}
          onClose={() => setIsScienceSparkOpen(false)}
          onNextMission={() => {
            handleNavigateLab(nextSeg.id);
            setViewMode('workbench');
          }}
          onPlayAgain={() => {
            setIsScienceSparkOpen(false);
          }}
          onReturnToDashboard={() => {
            setViewMode('mission-control');
          }}
        />
      )}

      {/* Parent & Teacher Notes Modal */}
      {activeMissionCard && (
        <ParentNotesModal
          mission={activeMissionCard}
          isOpen={isParentNotesOpen}
          onClose={() => setIsParentNotesOpen(false)}
        />
      )}
    </div>
  );
};

export default ScienceLab;
