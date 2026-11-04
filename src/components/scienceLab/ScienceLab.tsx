import React, { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import type { LabSegmentId } from './common';
import { soundEffects } from '../../utils/soundEffects';
import '../../styles/science-lab.css';
import '../../styles/mission-control.css';
import '../../styles/vedic-knowledge-system.css';
import { ScienceSparkModal } from './ScienceSparkModal';
import { ParentNotesModal } from './ParentNotesModal';
import { HowToPlayModal } from './HowToPlayModal';
import { playPronunciation, stopPronunciation } from '../../utils/pronunciation';
import {
  getExplorerStats,
  saveExplorerStats,
  getMissionCardById,
  type ExplorerStats,
  type MissionCardData,
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
const CitrakavyaStudio = lazy(() => import('./CitrakavyaStudio'));
const LabBodhiConsole = lazy(() => import('./LabBodhiConsole'));
import { BodhiWisdomCard } from '../BodhiWisdomCard';
import { RISHI_QUESTS } from './rishiQuests';
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
  {
    id: 'preschool-wonder',
    code: 'PRE-01',
    icon: '🌟',
    dev: 'शिशु-क्रीडा-वाटिका',
    title: 'Play 2 Learn: Free Preschool Games',
    subject: 'Living Map of India, Shapes, Colors, Animals, Counting, Bells & Stories',
    school: 'बाल-संस्कृत-प्रज्ञा (Ages 3–6)',
    category: 'life',
    level: 'preschool',
    levelLabel: 'Play 2 Learn',
    levelDev: 'शिशु-क्रीडा',
    ageRange: 'Ages 3–6 · +Next Level 6–10',
    gameType: '12 Preschool + 12 Next Level',
    blurb: 'Fun, safe activities for ages 3–6 that build early literacy, numeracy, and thinking skills (Shapes, Color Mixing, Fruit Orchard, Animal Safari, India Animal Map, Kids Yoga, Bugs, Birds, My Day, Action Play, Count 1–10 & Sacred Bells) plus 🚀 Next Level Games (Ages 6–10)!',
    tint: 'rgba(245, 158, 11, 0.16)',
    ink: '#fbbf24',
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
    levelLabel: 'Primary Explorers',
    levelDev: 'प्रारम्भिक',
    ageRange: 'Ages 8–10',
    gameType: 'Mass Conservation Game',
    blurb: 'Fire up the Viveka Scanner to look past everyday illusion (Asat) and see the invariant atoms underneath (Sat). Melt, boil and burn, and mass remains 100.000g constant.',
    tint: 'rgba(234, 179, 8, 0.12)',
    ink: '#fde047',
    glow: '#eab308',
  },
  {
    id: 'prakriti',
    code: 'SEC-03',
    icon: '🌿',
    dev: 'प्रकृति-जैवमण्डलम् · Tridoṣa',
    title: 'Nature Balance Game',
    subject: 'Cellular Homeostasis',
    school: 'Tridoṣa Engine (आयुर्वेद)',
    category: 'life',
    level: 'primary',
    levelLabel: 'Primary Explorers',
    levelDev: 'प्रारम्भिक',
    ageRange: 'Ages 8–10',
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
    level: 'middle',
    levelLabel: 'Middle Missions',
    levelDev: 'माध्यमिक',
    ageRange: 'Ages 11–14',
    gameType: 'Animal & Plant Taxonomy Game',
    blurb: 'Ancient 4-fold taxonomy engine paired with Sir J.C. Bose’s plant galvanometer probe, tracking real-time microvolt action potentials to electrical and tactile stimuli.',
    tint: 'rgba(249, 115, 22, 0.12)',
    ink: '#fb923c',
    glow: '#f97316',
  },
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
    levelLabel: 'Primary Explorers',
    levelDev: 'प्रारम्भिक',
    ageRange: 'Ages 8–10',
    gameType: 'Orbital Gravity Sandbox Game',
    blurb: 'Real-time orbit simulator. Master gravity with Sūrya, Pṛthivī and Candra: too slow and you crash, too fast and you escape. Track Candra through the 27 Nakṣatras.',
    tint: 'rgba(99, 102, 241, 0.12)',
    ink: '#a5b4fc',
    glow: '#6366f1',
  },
  {
    id: 'nada-brahman',
    code: 'SEC-07',
    icon: '🪕',
    dev: 'नाद-विहारः · Nāda',
    title: 'Sound Detective',
    subject: 'Harmonics & Cymatics',
    school: 'Nāda Brahman (सङ्गीत)',
    category: 'waves',
    level: 'middle',
    levelLabel: 'Middle Missions',
    levelDev: 'माध्यमिक',
    ageRange: 'Ages 11–14',
    gameType: 'Harmonics & Cymatic Sand Game',
    blurb: 'String resonance simulator. Pluck standing waves, shift across harmonics 1–5, calibrate the 22 Śrutis, and reveal 2D Chladni sand mandala nodal yantras.',
    tint: 'rgba(168, 85, 247, 0.12)',
    ink: '#c084fc',
    glow: '#a855f7',
  },
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
    levelLabel: 'Middle Missions',
    levelDev: 'माध्यमिक',
    ageRange: 'Ages 11–14',
    gameType: 'Atomic Molecule Builder Game',
    blurb: 'Forge matter from the smallest building blocks. Pair raw Paramāṇus into a Dvyaṇuka, then join three Dvyaṇukas into a Tryaṇuka, the first visible speck of reality.',
    tint: 'rgba(245, 158, 11, 0.12)',
    ink: '#fde047',
    glow: '#f59e0b',
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
    levelLabel: 'Middle Missions',
    levelDev: 'माध्यमिक',
    ageRange: 'Ages 11–14',
    gameType: 'Lunar Lander Simulation Game',
    blurb: 'Lunar landing sandbox. Circularise lunar orbit, execute precision soft-landing at Shiv Shakti Point, then tune LIBS laser pulses to detect sulphur and polar water ice.',
    tint: 'rgba(6, 182, 212, 0.12)',
    ink: '#38bdf8',
    glow: '#06b6d4',
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
    levelLabel: 'Middle Missions',
    levelDev: 'माध्यमिक',
    ageRange: 'Ages 11–14',
    gameType: 'Conservation of Energy Game',
    blurb: 'Quantum particle survival challenge. Gather a wild, scattered cloud into shape (Sṛṣṭi), hold it steady (Sthiti), then set off Laya. Not a single quantum of reality is lost.',
    tint: 'rgba(244, 63, 94, 0.12)',
    ink: '#fb7185',
    glow: '#f43f5e',
  },
  {
    id: 'agnibana',
    code: 'SEC-10',
    icon: '🚀',
    dev: 'अग्निबाण-क्रीडा',
    title: 'Rocket Builder · Agnibāṇa',
    subject: 'Aerospace Ballistics',
    school: 'Śukranīti & Mysore 1780',
    category: 'matter',
    level: 'middle',
    levelLabel: 'Middle Missions',
    levelDev: 'माध्यमिक',
    ageRange: 'Ages 12–14',
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
    title: 'Rope & Peg Geometry',
    subject: 'Rekhā-Gaṇita & Śulba',
    school: 'Śulba Sūtras & Conscious Cosmos',
    category: 'waves',
    level: 'middle',
    levelLabel: 'Middle Missions',
    levelDev: 'माध्यमिक',
    ageRange: 'Ages 9–14',
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
    title: 'Sound Shapes · Mantra Acoustics',
    subject: 'Harmonic Scale & Phonetic Physics',
    school: 'Sāma Veda & Taittirīya Saṃhitā',
    category: 'waves',
    level: 'middle',
    levelLabel: 'Middle Missions',
    levelDev: 'माध्यमिक',
    ageRange: 'Ages 9–14',
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
    title: 'Temple Tower Builder',
    subject: 'Dry Masonry & Sacred Fractals',
    school: 'Samarāṅgaṇa Sūtradhāra & Vāstu',
    category: 'matter',
    level: 'middle',
    levelLabel: 'Middle Missions',
    levelDev: 'माध्यमिक',
    ageRange: 'Ages 10–14',
    gameType: 'Seismic Engineering Game',
    blurb: 'Explore King Bhoja’s dry masonry seismic dissipative joints (Sandhi Bandhana), Kudavelli hydro-engineered sand-buffer foundations, and 8×8/9×9 Vāstupuruṣa Mandala fractal load architectures.',
    tint: 'rgba(217, 119, 6, 0.12)',
    ink: '#fbbf24',
    glow: '#d97706',
  },
  {
    id: 'rituparna',
    code: 'SEC-09',
    icon: '🌳',
    dev: 'ऋतुपर्ण-साङ्ख्यानम्',
    title: 'Count the Tree · Ṛtuparṇa',
    subject: 'Monte Carlo Statistics',
    school: 'Saṅkhyāna & Akṣahṛdaya',
    category: 'waves',
    level: 'high',
    levelLabel: 'Scholar Studio',
    levelDev: 'उच्च-शोध',
    ageRange: 'Ages 14+',
    gameType: 'Monte Carlo Sampling Game',
    blurb: 'Mahābhārata cluster sampling and Akṣa dice Monte Carlo grid. Roll random seeds across a 100-quadrat forest, calculating mean, standard error, and variance collapse.',
    tint: 'rgba(20, 184, 166, 0.12)',
    ink: '#2dd4bf',
    glow: '#14b8a6',
  },
  {
    id: 'kautilya',
    code: 'SEC-14',
    icon: '📜',
    dev: 'कौटिलीय-अर्थशास्त्रम्',
    title: 'Wise Kingdom · Kauṭilya',
    subject: 'Actuarial Risk & Demographics',
    school: 'Arthaśāstra (नीति-प्रशासनम्)',
    category: 'waves',
    level: 'high',
    levelLabel: 'Scholar Studio',
    levelDev: 'उच्च-शोध',
    ageRange: 'Ages 16+',
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
    title: 'Rhythm Patterns · Piṅgala',
    subject: 'Binary Permutations & Pascal Meru',
    school: 'Chandaḥśāstra (छन्दो-विज्ञानम्)',
    category: 'waves',
    level: 'high',
    levelLabel: 'Scholar Studio',
    levelDev: 'उच्च-शोध',
    ageRange: 'Ages 14+',
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
    title: 'Sun-Shadow Compass · Ujjain',
    subject: 'Geodesy, 0° Longitude & Temple Geometry',
    school: 'Sūrya Siddhānta & Varāhamihira (भूगोल-खगोलम्)',
    category: 'cosmos',
    level: 'high',
    levelLabel: 'Scholar Studio',
    levelDev: 'उच्च-शोध',
    ageRange: 'Ages 14+',
    gameType: 'Geodesy & Meridian Sandbox Game',
    blurb: 'Explore Ujjain (Avanti) as the world’s ancient Prime Meridian (0° Longitude) and its intersection with the Tropic of Cancer. Calculate the 29-minute Panchang offset, align with Mahakaleshwar & Mangalnath temples, and track the Tropic of Cancer southward drift to Dongla.',
    tint: 'rgba(14, 165, 233, 0.12)',
    ink: '#38bdf8',
    glow: '#0ea5e9',
  },
  {
    id: 'citrakavya',
    code: 'SEC-17',
    icon: '🔲',
    dev: 'चित्रकाव्य-शाला · विदग्धमुखमण्डनम्',
    title: 'Matrix of Mind · Citrakāvya',
    subject: '3×3 Syllable Grids, Lotus & Wheel Bandhas',
    school: 'Dharmadāsa & Bhāravi (चित्रकाव्यम्)',
    category: 'waves',
    level: 'middle',
    levelLabel: 'Middle & Scholar',
    levelDev: 'माध्यमिक-शोध',
    ageRange: 'Ages 10–18+',
    gameType: 'Constrained Poetics & Word Matrix Simulator',
    blurb: 'Decode ancient Sanskrit word grids: solve Dharmadāsa’s 19-question 3×3 Latin square puzzle with animated SVG vectors and sub-phonemic vowel extraction, and simulate Padma (Lotus), Cakra (Wheel), and Muraja (Drum) geometric bandhas.',
    tint: 'rgba(56, 189, 248, 0.14)',
    ink: '#38bdf8',
    glow: '#0284c7',
  },
];


const SEGMENT_IDS = new Set<string>(LAB_SEGMENTS.map((s) => s.id));
const HASH_ALIASES: Record<string, LabSegmentId> = {
  games: 'preschool-wonder',
  'games-section': 'preschool-wonder',
  play: 'preschool-wonder',
  'preschool-games': 'preschool-wonder',
  'stem-games': 'paramanu',
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
  citrakavya: 'citrakavya',
  'citra-kavya': 'citrakavya',
  'matrix-mind': 'citrakavya',
  'word-grid': 'citrakavya',
  vidagdha: 'citrakavya',
  bandha: 'citrakavya',
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
  onOpenPhilosophy?: () => void;
  onOpenGrammar?: () => void;
  onOpenVedicMaths?: () => void;
}

const LEVEL_STEPS: { id: LabLevel; num: string; label: string; ages: string }[] = [
  { id: 'all', num: '', label: 'All levels', ages: 'Full path' },
  { id: 'preschool', num: '1', label: 'Play 2 Learn: Free Preschool Games', ages: 'Ages 3–6' },
  { id: 'primary', num: '2', label: 'Primary Explorers', ages: 'Ages 6–10' },
  { id: 'middle', num: '3', label: 'Middle Missions', ages: 'Ages 9–14' },
  { id: 'high', num: '4', label: 'Scholar Studio', ages: 'Ages 14+' },
];

const CATEGORY_TABS: { id: LabCategory; label: string; icon: string }[] = [
  { id: 'all', label: 'All Domains', icon: '🌌' },
  { id: 'life', label: 'Living Nature', icon: '🌿' },
  { id: 'matter', label: 'Matter & Physics', icon: '⚛️' },
  { id: 'cosmos', label: 'Sky & Space', icon: '🪐' },
  { id: 'waves', label: 'Sound & Math', icon: '🪕' },
];

const CATEGORY_CHIP: Record<LabSegmentConfig['category'], string> = {
  matter: 'Matter', cosmos: 'Sky & Space', life: 'Living world', waves: 'Sound & Number',
};

const SimLoader = () => <div className="vl-loading">Loading the lab bench…</div>;

const ScienceLab: React.FC<ScienceLabProps> = ({
  initialSegment,
  onGoHome,
  onOpenResources,
  onOpenPhilosophy,
  onOpenGrammar,
  onOpenVedicMaths,
}) => {
  const [active, setActive] = useState<LabSegmentId>(() => {
    if (initialSegment && initialSegment !== 'catalog' && initialSegment !== 'iks' && SEGMENT_IDS.has(initialSegment)) return initialSegment as LabSegmentId;
    if (initialSegment && HASH_ALIASES[initialSegment]) return HASH_ALIASES[initialSegment];
    return readHash() || 'preschool-wonder';
  });
  const [preschoolActivity, setPreschoolActivity] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'mission-control' | 'workbench' | 'catalog'>(() => {
    if (!initialSegment || initialSegment === 'catalog' || initialSegment === 'iks') return 'catalog';
    return 'workbench';
  });
  const [isIksLightboxOpen, setIsIksLightboxOpen] = useState(false);
  const [explorerStats, setExplorerStats] = useState<ExplorerStats>(() => getExplorerStats());
  const [isScienceSparkOpen, setIsScienceSparkOpen] = useState(false);
  const [isParentNotesOpen, setIsParentNotesOpen] = useState(false);
  const [selectedHowToPlay, setSelectedHowToPlay] = useState<MissionCardData | null>(null);
  const [isSpeakingBodhiBriefing, setIsSpeakingBodhiBriefing] = useState(false);
  const [filterCat, setFilterCat] = useState<LabCategory>('all');
  const [filterLevel, setFilterLevel] = useState<LabLevel>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [heroSrc, setHeroSrc] = useState<string>('/images/vignana-lab-hero.webp');
  const [, setIsQuestMode] = useState(true);
  const [isQuestDirectoryOpen, setIsQuestDirectoryOpen] = useState(false);
  const catalogSectionRef = useRef<HTMLDivElement>(null);
  const simRef = useRef<HTMLDivElement>(null);
  const firstRun = useRef(true);


  const activeMissionCard = useMemo(() => getMissionCardById(active), [active]);

  const handleLaunchSim = (targetId: LabSegmentId) => {
    setActive(targetId);
    setPreschoolActivity(null);
    setViewMode('workbench');
    soundEffects.playCelebrationChime();
    window.requestAnimationFrame(() => {
      simRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const handleLaunchPreschoolActivity = (actId: string) => {
    setActive('preschool-wonder');
    setPreschoolActivity(actId);
    setViewMode('workbench');
    soundEffects.playCelebrationChime();
    window.requestAnimationFrame(() => {
      simRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const handleCompleteActiveMission = () => {
    soundEffects.playCelebrationChime();
    setExplorerStats((prev) => {
      const nextStarsByGame = { ...prev.starsByGame, [active]: 3 };
      const currentKeys = Object.keys(nextStarsByGame);
      const totalStars = currentKeys.reduce((acc, k) => acc + (nextStarsByGame[k] || 0), 0);
      const unlockedBadges = !activeMissionCard || prev.unlockedBadges.includes(activeMissionCard.badgeId)
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

  const handleSpeakBriefing = async () => {
    if (isSpeakingBodhiBriefing) {
      stopPronunciation();
      setIsSpeakingBodhiBriefing(false);
      return;
    }
    const text = activeMissionCard
      ? `${activeMissionCard.kidTitle}. ${activeMissionCard.missionGoal}`
      : `${seg.title}. ${seg.blurb}`;
    setIsSpeakingBodhiBriefing(true);
    try {
      await playPronunciation(text);
    } catch {
      // Audio fallback
    } finally {
      setIsSpeakingBodhiBriefing(false);
    }
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
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isIksLightboxOpen) {
        setIsIksLightboxOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isIksLightboxOpen]);

  useEffect(() => {
    const onHash = () => {
      const h = readHash();
      if (h) { setActive(h); setViewMode('workbench'); }
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const seg = LAB_SEGMENTS.find((s) => s.id === active)!;
  const quest = RISHI_QUESTS[active];

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
    setViewMode('workbench');
    soundEffects.playStrokeChime();
    window.requestAnimationFrame(() => {
      simRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  return (
    <div className="vl-page">
      {viewMode !== 'workbench' && (
        <div ref={catalogSectionRef} className="vl-hub">
          <header className="vl-hub-hero">
            <div className="vl-hub-topline">
              <div className="vl-hub-topline-left">
                {onGoHome && <button type="button" className="vl-hub-link" onClick={onGoHome}>◀ Home</button>}
                {onOpenResources && <button type="button" className="vl-hub-link" onClick={onOpenResources}>Toolkit</button>}
              </div>
              <div className="vl-hub-stars-badge" title="Total Vidyā Stars unlocked across all Vijñāna Lab quests">
                <span aria-hidden="true">⭐</span>
                <strong>{explorerStats.totalStars || 0}</strong> Vidyā Stars
                <span className="vl-hub-stars-sep">·</span>
                <span className="vl-hub-missions-count">🏆 {explorerStats.completedMissions?.length || 0}/17 Mastered</span>
              </div>
            </div>
            <div className="vl-hub-banner">
              <div className="vl-hub-banner-copy">
                <h1 className="vl-hub-title">
                  Vijñāna Lab <span lang="sa" className="vl-hub-title-dev">विज्ञान-प्रयोगशाला</span>
                </h1>
                <p className="vl-hub-tagline">Look. Learn from nature. Know with purpose.</p>
                <p className="vl-hub-range">Soft play shapes → Kauṭilya’s harvest · Ages 2–16+</p>
                <p className="vl-hub-sloka" lang="sa">प्रकृतिं पश्य, प्रकृतेः शिक्षस्व, प्रयोजनाय जानीहि।</p>
              </div>
              <div className="vl-hub-art-wrap">
                <img
                  className="vl-hub-art"
                  src={heroSrc}
                  onError={() => {
                    if (heroSrc.includes('.webp')) {
                      setHeroSrc('/images/vignana-lab-hero.jpg');
                    } else {
                      setHeroSrc('/images/gurukul-staircase-blackboard.jpg');
                    }
                  }}
                  alt="Children Exploring Bhāratīya Science · 2–16+ Yrs in open Gurukul garden pavilion"
                  width={1024}
                  height={665}
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
            <p className="vl-hub-lead">
              <em>Look at nature, learn from nature, know with purpose.</em> These games share the way Bhāratīya ṛṣis
              approached knowledge — by watching the world closely, treating nature as the first teacher, and seeking
              knowledge that serves life.
            </p>
            <ul className="vl-hub-pillars">
              <li><span aria-hidden="true">👁️</span><strong lang="sa">निरीक्षणम्</strong><b>Observation</b><small>Look and listen carefully before answering.</small></li>
              <li><span aria-hidden="true">🌿</span><strong lang="sa">प्रकृति-शिक्षा</strong><b>Learn from nature</b><small>Seasons, sky, sound and living things are the teachers.</small></li>
              <li><span aria-hidden="true">🎯</span><strong lang="sa">प्रयोजन-युक्त ज्ञानम्</strong><b>Purpose-driven knowledge</b><small>Every game asks: how does this help us live well?</small></li>
            </ul>

            {/* Vedic Indian Knowledge System Map */}
            <div className="vl-iks-showcase-strip" id="vedic-knowledge-system" aria-label="Vedic Indian Knowledge System (भारतीय ज्ञान परंपरा) Map">
              <div className="vl-iks-card-open">
                <div className="vl-iks-header-bar">
                  <div className="vl-iks-summary-left">
                    <span className="vl-iks-summary-icon" aria-hidden="true">🕉️</span>
                    <div>
                      <strong className="vl-iks-summary-title">Vedic Indian Knowledge System (भारतीय ज्ञान परंपरा)</strong>
                      <small className="vl-iks-summary-sub">Explore the 7 branches connecting ancient Indian sciences with our 16 STEM physics simulations</small>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="vl-iks-zoom-btn"
                    onClick={() => {
                      soundEffects.playCelebrationChime();
                      setIsIksLightboxOpen(true);
                    }}
                    title="Click to view full-screen high-resolution infographic"
                  >
                    <span>🔍 Enlarge Infographic</span>
                  </button>
                </div>
                <div className="vl-iks-details-body">
                  <div
                    className="vl-iks-img-wrap"
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      soundEffects.playCelebrationChime();
                      setIsIksLightboxOpen(true);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setIsIksLightboxOpen(true);
                      }
                    }}
                    title="Click to view full-screen high-resolution infographic"
                  >
                    <img
                      src="/images/vedic-indian-knowledge-system.jpg"
                      alt="Vedic Indian Knowledge System · भारतीय ज्ञान परंपरा — Seven Branches of Ancient Indian Sciences: Philosophy, Mathematics, Cosmology, History, Ayurveda, Architecture, and Grammar"
                      className="vl-iks-img"
                      width={1024}
                      height={571}
                      loading="lazy"
                    />
                    <div className="vl-iks-img-overlay">
                      <span className="vl-iks-img-pill">✨ 7 Pillars of Vedic Sciences · Tap to Enlarge HD</span>
                    </div>
                  </div>
                  <div className="vl-iks-branches-row">
                    <button
                      type="button"
                      className="vl-iks-branch-pill vl-iks-branch-pill--darshana"
                      onClick={() => (onOpenPhilosophy ? onOpenPhilosophy() : handleLaunchSim('paramanu'))}
                      title="Explore Nyāya, Vaiśeṣika, and the Six Systems of Indian Philosophy"
                    >
                      🧘 Philosophy · दर्शनम् (Nyāya &amp; Vaiśeṣika)
                    </button>
                    <button
                      type="button"
                      className="vl-iks-branch-pill vl-iks-branch-pill--ganita"
                      onClick={() => (onOpenVedicMaths ? onOpenVedicMaths() : handleLaunchSim('chandahshastra'))}
                      title="Launch Chandahshastra Piṅgala binary combinatorics, Baudhāyana geometry &amp; Vedic Mathematics"
                    >
                      📐 Mathematics · गणितम् (Baudhāyana &amp; Piṅgala)
                    </button>
                    <button
                      type="button"
                      className="vl-iks-branch-pill vl-iks-branch-pill--jyotisha"
                      onClick={() => handleLaunchSim('jyotisha')}
                      title="Launch Āryabhaṭa Celestial Orbit &amp; Heliocentric simulator"
                    >
                      🪐 Cosmology · ज्योतिषम् (Āryabhaṭa)
                    </button>
                    <button
                      type="button"
                      className="vl-iks-branch-pill vl-iks-branch-pill--itihasa"
                      onClick={() => handleLaunchSim('kautilya')}
                      title="Launch Kauṭilya Statecraft &amp; Saptāṅga Rajya simulation"
                    >
                      📜 History &amp; Statecraft · इतिहास (Kauṭilya)
                    </button>
                    <button
                      type="button"
                      className="vl-iks-branch-pill vl-iks-branch-pill--ayurveda"
                      onClick={() => handleLaunchSim('prakriti')}
                      title="Launch Suśruta Tridoṣa Equilibrium &amp; Prakṛti simulation"
                    >
                      🌿 Life &amp; Āyurveda · प्रकृति (Suśruta)
                    </button>
                    <button
                      type="button"
                      className="vl-iks-branch-pill vl-iks-branch-pill--vastu"
                      onClick={() => handleLaunchSim('temple-engineering')}
                      title="Launch Temple Engineering, Acoustics &amp; Vāstu Puruṣa simulation"
                    >
                      🏛️ Architecture · वास्तुशास्त्रम् (Vāstu)
                    </button>
                    <button
                      type="button"
                      className="vl-iks-branch-pill vl-iks-branch-pill--vyakarana"
                      onClick={() => (onOpenGrammar ? onOpenGrammar() : handleLaunchSim('chandahshastra'))}
                      title="Launch Pāṇinian Generative Grammar Engine"
                    >
                      🗣️ Linguistics · व्याकरणम् (Pāṇini)
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Popular Starting Quests across all 4 learning stages */}
            <div className="vl-hub-featured-strip">
              <div className="vl-hub-featured-header">
                <span className="vl-hub-feat-kicker">🌟 Popular Explorations</span>
                <h3 className="vl-hub-feat-heading">Recommended Starting Quests</h3>
              </div>
              <div className="vl-hub-featured-grid">
                <div
                  className="vl-hub-feat-card"
                  onClick={() => handleLaunchSim('preschool-wonder')}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleLaunchSim('preschool-wonder')}
                >
                  <div className="vl-hub-feat-icon">🌟</div>
                  <div className="vl-hub-feat-body">
                    <span className="vl-hub-feat-badge vl-badge--preschool">Stage 1 · Ages 2–6 · 24 Games</span>
                    <h4 className="vl-hub-feat-title">Wonder Playground &amp; Living India Map</h4>
                    <p className="vl-hub-feat-desc">The Spice Adventure, living India Map, animal safari, color mixing, and temple bells with gentle audio.</p>
                    <span className="vl-hub-feat-cta">Launch Playground ➔</span>
                  </div>
                </div>
                <div
                  className="vl-hub-feat-card"
                  onClick={() => handleLaunchSim('asato-ma')}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleLaunchSim('asato-ma')}
                >
                  <div className="vl-hub-feat-icon">🕯️</div>
                  <div className="vl-hub-feat-body">
                    <span className="vl-hub-feat-badge vl-badge--primary">Stage 2 · Ages 6–10 · Physics</span>
                    <h4 className="vl-hub-feat-title">Heat &amp; Matter Mystery (Mass Invariance)</h4>
                    <p className="vl-hub-feat-desc">Fire up the Viveka Scanner in the Rasaśāstra crucible. Melt, boil, and burn matter — mass stays constant.</p>
                    <span className="vl-hub-feat-cta">Launch Crucible ➔</span>
                  </div>
                </div>
                <div
                  className="vl-hub-feat-card"
                  onClick={() => handleLaunchSim('chandrayaan')}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleLaunchSim('chandrayaan')}
                >
                  <div className="vl-hub-feat-icon">🛰️</div>
                  <div className="vl-hub-feat-body">
                    <span className="vl-hub-feat-badge vl-badge--middle">Stage 3 · Ages 10–14 · Space</span>
                    <h4 className="vl-hub-feat-title">Chandrayaan Moon Mission</h4>
                    <p className="vl-hub-feat-desc">Execute soft touchdown at Shiv Shakti point, deploy Pragyan rover, and fire the LIBS laser spectrometer.</p>
                    <span className="vl-hub-feat-cta">Launch Moon Mission ➔</span>
                  </div>
                </div>
                <div
                  className="vl-hub-feat-card"
                  onClick={() => handleLaunchSim('vedic-geometry')}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleLaunchSim('vedic-geometry')}
                >
                  <div className="vl-hub-feat-icon">📐</div>
                  <div className="vl-hub-feat-body">
                    <span className="vl-hub-feat-badge vl-badge--scholar">Stage 4 · Ages 14+ · Geometry</span>
                    <h4 className="vl-hub-feat-title">Vedic Altar Mastery &amp; Rope Geometry</h4>
                    <p className="vl-hub-feat-desc">Build Śulba fire altars (Kūrma, Rathacakra, Śyena), solve transformation theorems, and explore cosmic geometry.</p>
                    <span className="vl-hub-feat-cta">Launch Altar Studio ➔</span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Dual Navigation Controls: Levels + Domains */}
          <div className="vl-filter-control-panel">
            <div className="vl-rail-group">
              <span className="vl-rail-label">Learning Level:</span>
              <nav className="vl-level-rail" aria-label="Learning levels">
                {LEVEL_STEPS.map((step) => {
                  const count = step.id === 'all'
                    ? LAB_SEGMENTS.filter((s) => filterCat === 'all' || s.category === filterCat).length
                    : LAB_SEGMENTS.filter((x) => x.level === step.id && (filterCat === 'all' || x.category === filterCat)).length;
                  return (
                    <button
                      key={step.id}
                      type="button"
                      className={`vl-level-step${filterLevel === step.id ? ' is-active' : ''}`}
                      aria-pressed={filterLevel === step.id}
                      onClick={() => { setFilterLevel(step.id); soundEffects.playStrokeChime(); }}
                    >
                      {step.num && <span className="vl-level-num">{step.num}</span>}
                      <span className="vl-level-text"><b>{step.label}</b><small>{step.ages} · {count}</small></span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="vl-rail-group">
              <span className="vl-rail-label">Scientific Domain:</span>
              <nav className="vl-cat-rail" aria-label="Scientific domains">
                {CATEGORY_TABS.map((cat) => {
                  const count = cat.id === 'all'
                    ? LAB_SEGMENTS.filter((s) => filterLevel === 'all' || s.level === filterLevel).length
                    : LAB_SEGMENTS.filter((s) => s.category === cat.id && (filterLevel === 'all' || s.level === filterLevel)).length;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      className={`vl-cat-chip${filterCat === cat.id ? ' is-active' : ''}`}
                      aria-pressed={filterCat === cat.id}
                      onClick={() => { setFilterCat(cat.id); soundEffects.playStrokeChime(); }}
                    >
                      <span aria-hidden="true">{cat.icon}</span>
                      <span>{cat.label}</span>
                      <small className="vl-cat-count">({count})</small>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          <div className="vl-hub-search-row">
            <div className="vl-hub-search">
              <span aria-hidden="true">🔍</span>
              <input type="text" placeholder="Search games, Sanskrit concepts, topics..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} aria-label="Search games" />
              {searchQuery && <button type="button" onClick={() => setSearchQuery('')} aria-label="Clear search">✕</button>}
            </div>
            <span className="vl-search-tally">
              Showing <strong>{visibleSegments.length}</strong> of {LAB_SEGMENTS.length} simulations
            </span>
          </div>

          {LEVEL_STEPS.filter((st) => st.id !== 'all' && (filterLevel === 'all' || filterLevel === st.id)).map((st) => {
            const games = visibleSegments.filter((x) => x.level === st.id);
            if (!games.length) return null;

            if (st.id === 'preschool') {
              return (
                <section key={st.id} className="vl-level-band vl-level-band--preschool" aria-label={st.label}>
                  <h2 className="vl-band-title">
                    <span className="vl-level-num">{st.num}</span> {st.label} <small>{st.ages} · 24 Interactive Games</small>
                  </h2>
                  <div className="vl-preschool-showcase">
                    <div className="vl-ps-header-row">
                      <div className="vl-ps-header-left">
                        <span className="vl-ps-badge">👶 24 Preschool Discovery Games · Ages 3–6</span>
                        <h3 className="vl-ps-title">
                          Play 2 Learn: Free Preschool Games <span className="vl-ps-title-sa" lang="sa">शिशु-क्रीडा-वाटिका</span>
                        </h3>
                        <p className="vl-ps-desc">
                          Fun, safe activities for ages 3–6 that build early literacy, numeracy, and thinking skills. Pure picture-and-sound sensory playground: Indian geometry (ज्यामिति), vibrant color mixing, friendly animals, storybook living India map, yoga poses, and orchard fruits.
                        </p>
                      </div>
                      <button
                        type="button"
                        className="vl-ps-launch-btn"
                        onClick={() => handleLaunchSim('preschool-wonder')}
                      >
                        <span>🚀 Enter Play 2 Learn: Free Preschool Games (25 Activities) ➔</span>
                      </button>
                    </div>

                    <div className="vl-ps-quick-bar">
                      <div className="vl-ps-quick-bar-heading">
                        <span>⚡ Quick Play Popular Preschool Games:</span>
                      </div>
                      <div className="vl-ps-activities-grid">
                        {[
                          { id: 'varnamala', icon: '🔤', sa: 'वर्णमाला', en: 'Varṇamālā Letter Garden' },
                          { id: 'shapes', icon: '🎨', sa: 'आकाराः', en: 'Shapes & Indian Geometry' },
                          { id: 'colors', icon: '🧪', sa: 'वर्ण-मेलनम्', en: 'Color Magic Cauldron' },
                          { id: 'fruits', icon: '🍎', sa: 'फल-सङ्ग्रहः', en: 'Orchard Fruit Picker' },
                          { id: 'animals', icon: '🐮', sa: 'पशु-ध्वनयः', en: 'Animal Safari & Sounds' },
                          { id: 'bharat', icon: '🗺️', sa: 'भारत-मानचित्रम्', en: 'Living Map of India' },
                          { id: 'yoga', icon: '🧘', sa: 'योगासनानि', en: 'Yoga Pose Match' },
                          { id: 'spices', icon: '🌶️', sa: 'उपस्कराः', en: 'Spice Aroma Adventure' },
                          { id: 'seasons', icon: '🌸', sa: 'ऋतवः', en: '6 Seasons & Months' },
                        ].map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            className="vl-ps-act-btn"
                            onClick={() => handleLaunchPreschoolActivity(item.id)}
                            title={`Play ${item.sa} (${item.en})`}
                          >
                            <span className="vl-ps-act-icon">{item.icon}</span>
                            <span className="vl-ps-act-body">
                              <strong className="vl-ps-act-en">{item.en}</strong>
                              <span className="vl-ps-act-sa" lang="sa">{item.sa}</span>
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              );
            }

            return (
              <section key={st.id} className="vl-level-band" aria-label={st.label}>
                <h2 className="vl-band-title"><span className="vl-level-num">{st.num}</span> {st.label} <small>{st.ages} · {games.length} simulations</small></h2>
                <div className="vl-band-grid">
                  {games.map((g) => (
                    <button key={g.id} type="button" className="vl-game-card" onClick={() => handleLaunchSim(g.id)} style={{ '--g-tint': g.tint, '--g-ink': g.ink } as React.CSSProperties}>
                      <span className="vl-game-icon" aria-hidden="true">{g.icon}</span>
                      <span className="vl-game-body">
                        <b className="vl-game-title">{g.title}</b>
                        <span className="vl-game-dev" lang="sa">{g.dev}</span>
                        {RISHI_QUESTS[g.id] && <span className="vl-game-goal">{RISHI_QUESTS[g.id].goal}</span>}
                        <span className="vl-game-chips">
                          <span>{g.ageRange}</span>
                          <span>{CATEGORY_CHIP[g.category]}</span>
                          {g.id === 'preschool-wonder' ? <span>24 activities (Map &amp; Spices)</span> : <span>⏱️ 3–5 min</span>}
                          {(explorerStats.starsByGame?.[g.id] ?? 0) > 0 && <span>⭐ {explorerStats.starsByGame[g.id]}</span>}
                        </span>
                      </span>
                      <span className="vl-game-play">Play ➔</span>
                    </button>
                  ))}
                </div>
              </section>
            );
          })}
          {visibleSegments.length === 0 && (
            <p className="vl-hub-empty">
              No games match your current filter. <button type="button" onClick={() => { setSearchQuery(''); setFilterLevel('all'); setFilterCat('all'); }}>Show all simulations</button>
            </p>
          )}

          {/* ================================================================
              EDUCATIONAL FRAMEWORK: COLLAPSIBLE CURRICULUM & STANDARDS MATRIX
              ================================================================ */}
          <details className="vl-curriculum-accordion">
            <summary className="vl-curriculum-summary">
              <span className="vl-cs-icon">📚</span>
              <span className="vl-cs-title">Science Lab Curriculum &amp; STEM Standards Matrix</span>
              <span className="vl-cs-badge">NCERT · CBSE · NEP 2020 · Ages 2–16+ (Click to Expand)</span>
            </summary>
            <div className="vl-curriculum-body">
              <section className="vl-seo-games-section" aria-label="About Vijñāna Science Lab Games and STEM Learning Levels">
                <div className="vl-sgs-header">
                  <div className="vl-sgs-badge">
                    <span>🔬</span>
                    <span>SCIENCE LAB CURRICULUM · विज्ञान-क्रीडा-शाला</span>
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
                  <span className="vl-slc-icon">🌟</span>
                  <div>
                    <span className="vl-slc-tag">LEVEL 1 · AGES 2–6</span>
                    <h3 className="vl-slc-title">Preschool Wonder Playground (शिशु-बोध)</h3>
                  </div>
                </div>
                <p className="vl-slc-desc">
                  Multisensory discovery games designed for young children. Explore the Living Map of India, spice rack aromas, gentle animals, color mixing, sacred temple bells, and nature cycles with joyful voice guidance.
                </p>
                <div className="vl-slc-games">
                  <strong>Featured Games:</strong>
                  <ul>
                    <li><strong>Living Map of Bhārata:</strong> Tap snowy peaks, desert camels, and dolphins.</li>
                    <li><strong>The Spice Adventure:</strong> 12 interactive spice cards with Amma&apos;s kadai sizzle.</li>
                    <li><strong>Color Mixing &amp; Shapes:</strong> Mix primary pigments and shape sacred altars.</li>
                  </ul>
                </div>
              </div>

              <div className="vl-sgs-level-card vl-slc--primary">
                <div className="vl-slc-top">
                  <span className="vl-slc-icon">🎒</span>
                  <div>
                    <span className="vl-slc-tag">LEVEL 2 · GRADES 3–5 (AGES 6–10)</span>
                    <h3 className="vl-slc-title">Primary School &amp; Hands-On Physics (प्रारम्भिक)</h3>
                  </div>
                </div>
                <p className="vl-slc-desc">
                  Elementary school science games that turn abstract textbook principles into tactile experiments. Learn mass conservation by boiling and freezing matter, steer planets with gravitational pulls, and construct interlocking temple stones.
                </p>
                <div className="vl-slc-games">
                  <strong>Featured Science Games:</strong>
                  <ul>
                    <li><strong>Heat &amp; Matter Mystery:</strong> Burn, melt, and evaporate matter while proving mass invariance (100.000g).</li>
                    <li><strong>Planet Pull Gravity Sandbox:</strong> Orbit Earth and Moon around the Sun without crashing or escaping.</li>
                    <li><strong>Prakṛti Biosphere:</strong> Slide temperature and moisture dials to balance cellular energy.</li>
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
                    <li><strong>Atom Builder:</strong> Combine individual atomic particles into dyads (Dvyaṇuka) and visible triads (Tryaṇuka).</li>
                    <li><strong>Chandrayaan Moon Mission:</strong> Execute thruster burns to soft-land on the Moon and fire LIBS laser spectroscopy.</li>
                    <li><strong>Agnibāṇa Rocketry:</strong> Tune propellant ratios (5:1:1 Agnicūrṇa) and launch angles to hit target coordinates.</li>
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
                    <li><strong>Sun-Shadow Compass &amp; Ujjain Geodesy:</strong> Compute longitude offsets, solar noon deviations, and the Tropic of Cancer drift.</li>
                    <li><strong>Ṛtuparṇa Sampling Lab:</strong> Roll Mahābhārata Akṣa dice to demonstrate the Law of Large Numbers and Monte Carlo sampling.</li>
                    <li><strong>Chandaḥśāstra Binary Permutations:</strong> Decode Piṅgala&apos;s binary trees, Pascal&apos;s triangle (Meruprastāra), and Fibonacci rhythms.</li>
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
                    <li><strong>Mantra Acoustics &amp; Sāma Veda Harmonics:</strong> Investigate physical harmonic series fractions and phonetics formants.</li>
                    <li><strong>Vedic Geometry Studio:</strong> Construct Sulba cord altars and explore transformation theorems.</li>
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
                      <td><strong>Heat &amp; Matter Mystery</strong></td>
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
                      <td><strong>Chaturyoni Creature Map</strong></td>
                      <td>Preschool to Primary</td>
                      <td>Vṛkṣāyurveda &amp; J.C. Bose</td>
                      <td>Plant Neurobiology &amp; Taxonomy</td>
                      <td>Action potential microvolt graphs &amp; 4-kingdom sort</td>
                    </tr>
                    <tr>
                      <td><strong>Planet Pull Gravity</strong></td>
                      <td>Primary &amp; Middle (Grades 3–6)</td>
                      <td>Āryabhaṭīya (खगोल-शास्त्रम्)</td>
                      <td>Gravitational Orbits &amp; Astronomy</td>
                      <td>N-body vector orbit thrust &amp; 27 Nakṣatra tracer</td>
                    </tr>
                    <tr>
                      <td><strong>Chandrayaan Moon Mission</strong></td>
                      <td>Middle School (Grades 6–9)</td>
                      <td>ISRO Chandrayaan-3 Mission</td>
                      <td>Lunar Trajectory &amp; Spectroscopy</td>
                      <td>Descent thruster braking &amp; LIBS mineral scanning</td>
                    </tr>
                    <tr>
                      <td><strong>Sound Detective Nāda</strong></td>
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
                      <td><strong>Sun-Shadow Ujjain Geodesy</strong></td>
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
          </div>
          </details>
        </div>
      )}

      {viewMode === 'workbench' && (
        <>
        <section id={active} ref={simRef} className="vl-segment vl-segment--mission-workbench" aria-labelledby={`vl-h-${active}`} data-testid="lab-segment" data-segment={active}>
        {/* Kid-Centric Mission Workbench Header — Trimmed & De-cluttered */}
        <div className="vl-wb-mission-header">
          <div className="vl-wb-nav-row">
            {/* Unified Hub Back Button */}
            <button
              type="button"
              className="vl-wb-return-btn"
              onClick={() => {
                setViewMode('catalog');
                soundEffects.playStrokeChime();
                catalogSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              title="Return to Games Directory (All 41 Games)"
            >
              <span aria-hidden="true">◀</span>
              <span>All Games Hub</span>
            </button>

            {/* Active Simulation Title & Stage */}
            <div className="vl-wb-active-mission-title">
              <span className="vl-wb-icon">{seg.icon}</span>
              <div className="vl-wb-title-box">
                <span className="vl-wb-sector-code">{seg.levelLabel} · {seg.ageRange}</span>
                <h2 id={`vl-h-${active}`} className="vl-wb-name">
                  {seg.title} <span className="vl-wb-dev" lang="sa">({seg.dev})</span>
                </h2>
              </div>
            </div>

            {/* In-workbench quick navigation bar */}
            <div className="vl-wb-quick-nav" aria-label="Quick simulation switcher">
              <button
                type="button"
                className="vl-wb-arrow-btn"
                onClick={() => handleNavigateLab(prevSeg.id)}
                title={`Previous: ${prevSeg.title}`}
                aria-label={`Previous: ${prevSeg.title}`}
              >
                ◀ Prev
              </button>
              <select
                id="vl-lab-switch"
                className="vl-wb-switcher-select"
                value={active}
                onChange={(e) => {
                  handleLaunchSim(e.target.value as LabSegmentId);
                  soundEffects.playStrokeChime();
                }}
                aria-label="Switch science simulation"
              >
                <optgroup label="Stage 1: Play 2 Learn: Free Preschool Games (Ages 3–6 · 25 Games)">
                  <option value="preschool-wonder">🌟 Play 2 Learn: Free Preschool Games (Ages 3–6 · 25 Activities)</option>
                </optgroup>
                <optgroup label="Stage 2: Primary Explorers (Ages 6–10)">
                  {LAB_SEGMENTS.filter((s) => s.level === 'primary').map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.icon} {s.title} ({s.ageRange})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Stage 3: Middle Missions (Ages 10–14)">
                  {LAB_SEGMENTS.filter((s) => s.level === 'middle').map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.icon} {s.title} ({s.ageRange})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Stage 4: Scholar Studio (Ages 14+)">
                  {LAB_SEGMENTS.filter((s) => s.level === 'high' || s.level === 'advanced').map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.icon} {s.title} ({s.ageRange})
                    </option>
                  ))}
                </optgroup>
              </select>
              <button
                type="button"
                className="vl-wb-arrow-btn"
                onClick={() => handleNavigateLab(nextSeg.id)}
                title={`Next: ${nextSeg.title}`}
                aria-label={`Next: ${nextSeg.title}`}
              >
                Next ▶
              </button>
            </div>

            {/* Action buttons — Trimmed without redundant Level Path */}
            <div className="vl-wb-actions-right">
              {(activeMissionCard || quest) && (
                <button
                  type="button"
                  className="vl-wb-spark-btn"
                  onClick={handleCompleteActiveMission}
                  title="Celebrate mission completion & unlock 3 Vidyā Stars!"
                >
                  <span>🎉 I did it! (+3 ⭐)</span>
                </button>
              )}
              {activeMissionCard && (
                <button
                  type="button"
                  className="vl-wb-btn-ghost"
                  onClick={() => {
                    soundEffects.playStrokeChime();
                    setSelectedHowToPlay(activeMissionCard);
                  }}
                  title="How to play this science mission"
                >
                  <span>❓ How to Play</span>
                </button>
              )}
              <button
                type="button"
                className="vl-wb-btn-ghost"
                onClick={() => {
                  soundEffects.playStrokeChime();
                  setIsParentNotesOpen(true);
                }}
                title="Curriculum alignment, civilizational history, and parent notes"
              >
                <span>📘 Parent Notes</span>
              </button>
            </div>
          </div>

          {/* Bodhi Clean 1-Line Mission Briefing Strip with Collapsible Ṛṣi Lens */}
          <div className="vl-wb-bodhi-briefing-box">
            {active !== 'preschool-wonder' && (
              <div className="vl-wb-bodhi-avatar-col">
                <span className="vl-wb-bodhi-emoji">🧙‍♂️</span>
                <span className="vl-wb-bodhi-tag">Bodhi</span>
              </div>
            )}
            <div className="vl-wb-bodhi-content-col">
              <div className="vl-wb-bodhi-main-row">
                <div className="vl-wb-bodhi-kicker">
                  <span className="vl-hud-blink">●</span> 3-min quest
                  <button
                    type="button"
                    className={`vl-wb-audio-btn ${isSpeakingBodhiBriefing ? 'is-speaking' : ''}`}
                    onClick={handleSpeakBriefing}
                    aria-label={isSpeakingBodhiBriefing ? 'Stop audio' : 'Listen to Bodhi'}
                  >
                    <span>{isSpeakingBodhiBriefing ? '⏹️ Stop' : '🔊 Listen'}</span>
                  </button>
                </div>

                <p className="vl-wb-bodhi-goal-text">
                  🎯 <strong>Mission:</strong> <span className="vl-wb-bodhi-goal-content">{quest?.goal || activeMissionCard?.missionGoal || seg.blurb}</span>
                </p>

                {activeMissionCard && (
                  <div className="vl-wb-reward-pill">
                    <span className="vl-wb-reward-icon">🏆</span>
                    <span className="vl-wb-reward-desc">
                      Reward: <strong className="vl-wb-reward-badge">{activeMissionCard.badgeName}</strong> ({activeMissionCard.badgeIcon}) +3 ⭐
                    </span>
                  </div>
                )}
              </div>

              {quest && (
                <details className="vl-wb-lens-toggle">
                  <summary className="vl-wb-lens-summary">
                    <span className="vl-wb-lens-summary-left">
                      <span className="vl-wb-lens-summary-icon">👁️</span>
                      <span>3 Steps &amp; Ṛṣi Lens (निरीक्षणम् · प्रकृति · प्रयोजनम्)</span>
                    </span>
                    <span className="vl-wb-lens-summary-tag">Tap to view ▾</span>
                  </summary>
                  <div className="vl-wb-lens-body">
                    <ol className="vl-quest-steps" aria-label="What to do">
                      {quest.steps.map((st, i) => (
                        <li key={i}>
                          <span className="vl-quest-step-num">{i + 1}</span>
                          <span className="vl-quest-step-text">{st}</span>
                        </li>
                      ))}
                    </ol>
                    <div className="vl-quest-lens" aria-label="Ṛṣi lens">
                      <span className="vl-quest-lens-item">
                        <b lang="sa" className="vl-quest-lens-label">निरीक्षणम्</b>
                        <span className="vl-quest-lens-desc">{quest.observe}</span>
                      </span>
                      <span className="vl-quest-lens-item">
                        <b lang="sa" className="vl-quest-lens-label">प्रकृति-शिक्षा</b>
                        <span className="vl-quest-lens-desc">{quest.nature}</span>
                      </span>
                      <span className="vl-quest-lens-item">
                        <b lang="sa" className="vl-quest-lens-label">प्रयोजनम्</b>
                        <span className="vl-quest-lens-desc">{quest.purpose}</span>
                      </span>
                    </div>
                  </div>
                </details>
              )}
            </div>
          </div>
        </div>

        {/* Immediate Pure Playable Simulation Canvas — Play First! */}
        <div className="vl-wb-playable-canvas">
          <Suspense fallback={<SimLoader />}>
            {active === 'preschool-wonder' && (
              <PreschoolWonderLab
                initialActivity={preschoolActivity}
                onNextLab={() => handleNavigateLab('asato-ma')}
                onBrowseMainLabs={() => {
                  setViewMode('catalog');
                  soundEffects.playStrokeChime();
                  catalogSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                onSelectMainLab={(targetId) => handleNavigateLab(targetId as LabSegmentId)}
              />
            )}
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
            {active === 'citrakavya' && <CitrakavyaStudio onNextLab={() => handleNavigateLab(nextSeg.id)} onPrevLab={() => handleNavigateLab(prevSeg.id)} />}
          </Suspense>
        </div>

        {/* Optional Expandable Ancient Civilizational Context for Scholars & Parents */}
        <details className="vl-wb-heritage-accordion">
          <summary className="vl-wb-heritage-summary">
            <span>📜</span>
            <span>Ancient Indian Scientific Heritage &amp; Darśana Context (Click to expand for scholars &amp; teachers)</span>
          </summary>
          <div className="vl-wb-heritage-content">
            <BodhiWisdomCard gameId={active} gameTitle={seg.title} />
          </div>
        </details>


        {/* ================================================================
            NEXT ADVENTURE GATEWAY (Clean, Level-Aware Progression)
            ================================================================ */}
        {active === 'preschool-wonder' ? (
          <section className="vl-preschool-gateway" aria-label="Preschool Next Adventure Gateway">
            <div className="vl-pgw-card">
              <div className="vl-pgw-header">
                <span className="vl-pgw-badge">🌟 MORE WONDER GAMES · शिशु-क्रीडा</span>
                <h3>Keep playing more games in the Wonder Playground:</h3>
              </div>
              <div className="vl-pgw-grid">
                {[
                  { id: 'shapes', icon: '🎨', sa: 'आकाराः', en: 'Shapes & Indian Geometry' },
                  { id: 'colors', icon: '🧪', sa: 'वर्ण-मेलनम्', en: 'Color Magic Cauldron' },
                  { id: 'fruits', icon: '🍎', sa: 'फल-सङ्ग्रहः', en: 'Orchard Fruit Picker' },
                  { id: 'animals', icon: '🐮', sa: 'पशु-ध्वनयः', en: 'Animal Safari & Sounds' },
                  { id: 'bharat', icon: '🗺️', sa: 'भारत-मानचित्रम्', en: 'Living Map of India' },
                  { id: 'yoga', icon: '🧘', sa: 'योगासनानि', en: 'Yoga Pose Match' },
                  { id: 'spices', icon: '🌶️', sa: 'उपस्कराः', en: 'Spice Aroma Adventure' },
                  { id: 'seasons', icon: '🌸', sa: 'ऋतवः', en: '6 Seasons & Months' },
                ].map((act) => (
                  <button
                    key={act.id}
                    type="button"
                    className="vl-pgw-btn"
                    onClick={() => {
                      setPreschoolActivity(act.id);
                      soundEffects.playStrokeChime();
                      simRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                  >
                    <span className="vl-pgw-icon">{act.icon}</span>
                    <span className="vl-pgw-text">
                      <strong className="vl-pgw-en">{act.en}</strong>
                      <small className="vl-pgw-sa" lang="sa">{act.sa}</small>
                    </span>
                  </button>
                ))}
              </div>

              <div className="vl-pgw-bottom-bar">
                <div className="vl-pgw-graduate-box">
                  <span className="vl-pgw-grad-badge">🎒 READY FOR BIGGER CHALLENGES?</span>
                  <p>Explore Primary School STEM (Ages 6–10): Heat &amp; Matter Mystery (Mass Invariance) or Planet Gravity Sandbox.</p>
                  <button
                    type="button"
                    className="vl-pgw-grad-btn"
                    onClick={() => handleNavigateLab('asato-ma')}
                  >
                    <span>🚀 Try Primary Lab: Heat &amp; Matter ➔</span>
                  </button>
                </div>
                <button
                  type="button"
                  className="vl-pgw-hub-btn"
                  onClick={() => {
                    setViewMode('catalog');
                    soundEffects.playStrokeChime();
                    catalogSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  <span>🎮 🧭 Browse All 41 Games Directory</span>
                </button>
              </div>
            </div>
          </section>
        ) : (
          <section className="vl-adventure-gateway" aria-label="Next science simulation">
            <div className="vl-ag-header">
              <div className="vl-ag-kicker-row">
                <span className="vl-ag-kicker">✨ NEXT ADVENTURE ON YOUR PATH</span>
                <span className="vl-ag-progress-pill">
                  Quest {currentIndex + 1} of {LAB_SEGMENTS.length}
                </span>
              </div>
              <h3 className="vl-ag-heading">
                Ready for your next science quest?
              </h3>
            </div>

            <div className="vl-ag-card">
              <div className="vl-ag-card-hero">
                <div className="vl-ag-icon-badge" aria-hidden="true">
                  <span className="vl-ag-big-icon">{nextSeg.icon}</span>
                  <span className="vl-ag-level-chip">{nextSeg.levelLabel}</span>
                </div>
                <div className="vl-ag-card-info">
                  <span className="vl-ag-dev" lang="sa">{nextSeg.dev}</span>
                  <h4 className="vl-ag-title">{nextSeg.title}</h4>
                  <div className="vl-ag-badges">
                    <span className="vl-ag-badge vl-ag-badge--age">🎯 {nextSeg.ageRange}</span>
                    <span className="vl-ag-badge vl-ag-badge--subj">🔬 {nextSeg.subject}</span>
                    <span className="vl-ag-badge vl-ag-badge--cat">🏷️ {CATEGORY_CHIP[nextSeg.category]}</span>
                    <span className="vl-ag-badge vl-ag-badge--time">⏱️ 3–5 min quest</span>
                  </div>
                  <p className="vl-ag-blurb">{nextSeg.blurb}</p>
                </div>
              </div>

              <div className="vl-ag-actions">
                <button
                  type="button"
                  className="vl-ag-launch-btn"
                  onClick={() => handleNavigateLab(nextSeg.id)}
                  aria-label={`Launch Next Simulation: ${nextSeg.title}`}
                >
                  <span>Launch Next Quest: {nextSeg.title}</span>
                  <span className="vl-ag-arrow" aria-hidden="true">➔</span>
                </button>

                <div className="vl-ag-sub-nav">
                  <button
                    type="button"
                    className="vl-ag-ghost-btn"
                    onClick={() => handleNavigateLab(prevSeg.id)}
                    title={`Previous simulation: ${prevSeg.title}`}
                  >
                    ◀ Prev: {prevSeg.title}
                  </button>
                  <button
                    type="button"
                    className="vl-ag-ghost-btn"
                    onClick={() => {
                      setViewMode('catalog');
                      soundEffects.playStrokeChime();
                      catalogSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    title="View full 17-lab curriculum"
                  >
                    🧭 All 17 Labs
                  </button>
                  <button
                    type="button"
                    className="vl-ag-ghost-btn"
                    onClick={() => simRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                    title="Scroll to top of current lab bench"
                  >
                    ▲ Top of Bench
                  </button>
                </div>
              </div>
            </div>

            {/* All 17 Simulations Navigation Grid — Clear, Non-Truncated Cards */}
            <div className="vl-ag-grid-wrap">
              <div className="vl-ag-grid-header">
                <span className="vl-ag-grid-kicker">📚 COMPLETE SCIENCE EXPEDITION</span>
                <h4>Explore All 17 Science Simulations:</h4>
              </div>
              <div className="vl-ag-cards-grid">
                {LAB_SEGMENTS.map((s, idx) => {
                  const isCurrent = s.id === active;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      className={`vl-ag-step-card${isCurrent ? ' is-active' : ''}`}
                      onClick={() => handleNavigateLab(s.id)}
                      aria-current={isCurrent ? 'page' : undefined}
                      title={`${idx + 1}. ${s.title} (${s.ageRange})`}
                    >
                      <span className="vl-ag-step-num">{idx + 1}</span>
                      <span className="vl-ag-step-icon" aria-hidden="true">{s.icon}</span>
                      <div className="vl-ag-step-text">
                        <b className="vl-ag-step-title">{s.title}</b>
                        <span className="vl-ag-step-meta">{s.ageRange} · {CATEGORY_CHIP[s.category]}</span>
                      </div>
                      {isCurrent && <span className="vl-ag-playing-badge">Now Playing</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        <Suspense fallback={<div className="vl-loading">Loading Bodhi Vijñāna Console…</div>}>
          {active !== 'preschool-wonder' && <LabBodhiConsole activeSegment={active} />}
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

      {!activeMissionCard && quest && isScienceSparkOpen && (
        <div className="vl-win-overlay" role="dialog" aria-label="Quest complete" onClick={() => setIsScienceSparkOpen(false)}>
          <div className="vl-win-card" onClick={(e) => e.stopPropagation()}>
            <div className="vl-win-stars">⭐⭐⭐</div>
            <h3>{quest.win}</h3>
            <p><b lang="sa">प्रयोजनम्</b> · {quest.purpose}</p>
            <div className="vl-win-btns">
              <button type="button" onClick={() => setIsScienceSparkOpen(false)}>Play again</button>
              <button type="button" className="is-primary" onClick={() => { setIsScienceSparkOpen(false); handleNavigateLab(nextSeg.id); }}>Next game ➔</button>
            </div>
          </div>
        </div>
      )}
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
            setViewMode('catalog');
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

      {/* How To Play Modal */}
      {selectedHowToPlay && (
        <HowToPlayModal
          mission={selectedHowToPlay}
          isOpen={true}
          onClose={() => setSelectedHowToPlay(null)}
          onLaunch={() => {
            handleLaunchSim(selectedHowToPlay.id as LabSegmentId);
            setSelectedHowToPlay(null);
          }}
        />
      )}

      {/* Lightbox for Vedic Knowledge System Infographic */}
      {isIksLightboxOpen && (
        <div
          className="vks-lightbox-backdrop"
          onClick={() => setIsIksLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Vedic Indian Knowledge System Fullscreen Infographic"
        >
          <div className="vks-lightbox-modal" onClick={(e) => e.stopPropagation()}>
            <div className="vks-lightbox-bar">
              <h3 className="vks-lightbox-title">
                VEDIC INDIAN KNOWLEDGE SYSTEM · भारतीय ज्ञान परंपरा
              </h3>
              <button
                type="button"
                className="vks-lightbox-close"
                onClick={() => setIsIksLightboxOpen(false)}
                aria-label="Close fullscreen view"
              >
                ✕
              </button>
            </div>
            <div className="vks-lightbox-content">
              <img
                src="/images/vedic-indian-knowledge-system.jpg"
                alt="Vedic Indian Knowledge System Fullscreen Infographic"
                className="vks-lightbox-img"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScienceLab;
