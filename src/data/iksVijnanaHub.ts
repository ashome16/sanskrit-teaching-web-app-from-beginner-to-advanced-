/**
 * Combined Indian Knowledge Systems + Vijñāna Lab directory.
 * Organised by the IKS subjects on the homepage infographic, plus science areas.
 * Used on the hub page, homepage entry, and in-lab related-reading strip.
 */

export interface IksHubLink {
  href: string;
  label: string;
  kind: 'reading' | 'lab' | 'think-lab' | 'resource';
}

export interface IksHubSubject {
  id: string;
  sa: string;
  en: string;
  blurb: string;
  readings: IksHubLink[];
  labs: IksHubLink[];
  thinkLabs: IksHubLink[];
}

export const IKS_HUB_PATH = '/iks/';
export const VIJNANA_LAB_PATH = '/vignana-lab/';

export const IKS_HUB_SUBJECTS: IksHubSubject[] = [
  {
    id: 'darsana',
    sa: 'दर्शनम्',
    en: 'Philosophy (Darśana)',
    blurb: 'Nyāya, Vaiśeṣika, Sāṅkhya, Yoga, Mīmāṁsā and Vedānta — how we know, and how matter is built.',
    readings: [
      { href: '/philosophy/', label: 'Philosophy: six Darśanas', kind: 'reading' },
      { href: '/course/', label: 'Sanskrit as a way of thinking', kind: 'reading' },
    ],
    labs: [
      { href: '/vignana-lab/#paramanu', label: 'Atom Builder (Paramāṇu · Vaiśeṣika)', kind: 'lab' },
      { href: '/vignana-lab/#srishti-sthiti-laya', label: 'Loom of Āruṇi (Sṛṣṭi-Sthiti-Laya)', kind: 'lab' },
    ],
    thinkLabs: [
      { href: '/uddalaka-think-lab/', label: 'Uddālaka’s food and mind inquiry', kind: 'think-lab' },
    ],
  },
  {
    id: 'ganita',
    sa: 'गणितम्',
    en: 'Mathematics (Gaṇita)',
    blurb: 'Śulba geometry, Vedic arithmetic, Piṅgala combinatorics, and Ṛtuparṇa’s sampling.',
    readings: [
      { href: '/vedic-mathematics/', label: 'Vedic Mathematics', kind: 'reading' },
      { href: '/indian-mathematics/', label: 'Indian Mathematics studio', kind: 'reading' },
    ],
    labs: [
      { href: '/vignana-lab/#vedic-geometry', label: 'Vedic Geometry', kind: 'lab' },
      { href: '/vignana-lab/#chandahshastra', label: 'Piṅgala Chandaḥśāstra', kind: 'lab' },
      { href: '/vignana-lab/#rituparna', label: 'Count the Tree (Ṛtuparṇa)', kind: 'lab' },
    ],
    thinkLabs: [
      { href: '/cipher-think-lab/', label: 'Kaṭapayādi cipher', kind: 'think-lab' },
    ],
  },
  {
    id: 'jyotisha',
    sa: 'ज्योतिषम्',
    en: 'Cosmology & Astronomy (Jyotiṣa)',
    blurb: 'Orbits, shadows, meridians, and lunar flight — from the Sūrya Siddhānta to Chandrayaan.',
    readings: [
      { href: '/indian-knowledge-systems/', label: 'Indian Knowledge Systems overview', kind: 'reading' },
    ],
    labs: [
      { href: '/vignana-lab/#jyotisha', label: 'Jyotiṣa Gravity Sandbox', kind: 'lab' },
      { href: '/vignana-lab/#ujjain-geodesy', label: 'Ujjain sun-shadow compass', kind: 'lab' },
      { href: '/vignana-lab/#chandrayaan', label: 'Moon Mission Launcher', kind: 'lab' },
    ],
    thinkLabs: [
      { href: '/konark-think-lab/', label: 'Konark Sun Temple chariot wheel', kind: 'think-lab' },
      { href: '/cosmic-alignment-lab/', label: 'Cosmic alignment lab', kind: 'think-lab' },
    ],
  },
  {
    id: 'itihasa',
    sa: 'इतिहास-पुराणम्',
    en: 'History (Itihāsa)',
    blurb: 'Civilisational memory, dharma, and stories that still teach method and judgement.',
    readings: [
      { href: '/panchatantra/', label: 'Pañcatantra and nīti', kind: 'reading' },
      { href: '/jambudvipa/', label: 'Jambudvīpa and the seven dvīpas', kind: 'reading' },
      { href: '/sugriva-journey/', label: 'Sugrīva’s journey', kind: 'reading' },
    ],
    labs: [
      { href: '/vignana-lab/#rituparna', label: 'Ṛtuparṇa’s canopy count (Mahābhārata)', kind: 'lab' },
    ],
    thinkLabs: [],
  },
  {
    id: 'arthashastra',
    sa: 'अर्थशास्त्रम्',
    en: 'Statecraft (Arthaśāstra)',
    blurb: 'Kauṭilya’s quantitative administration: treasury, census, risk, and the seven-limb state.',
    readings: [
      { href: '/philosophy/', label: 'Philosophy and polity context', kind: 'reading' },
    ],
    labs: [
      { href: '/vignana-lab/#kautilya', label: 'Wise Kingdom (Kauṭilya)', kind: 'lab' },
    ],
    thinkLabs: [],
  },
  {
    id: 'dhanurveda',
    sa: 'धनुर्वेदः',
    en: 'Martial Arts & Warfare (Dhanurveda)',
    blurb: 'Fire-arrows, casings, and the metallurgy behind historic Indian rocketry and steel.',
    readings: [
      { href: '/indian-knowledge-systems/', label: 'Indian Knowledge Systems overview', kind: 'reading' },
    ],
    labs: [
      { href: '/vignana-lab/#agnibana', label: 'Rocket Builder (Agnibāṇa)', kind: 'lab' },
    ],
    thinkLabs: [
      { href: '/wootz-think-lab/', label: 'Wootz crucible steel (Ukku)', kind: 'think-lab' },
    ],
  },
  {
    id: 'ayurveda',
    sa: 'आयुर्वेदः',
    en: 'Āyurveda & Biology',
    blurb: 'Doṣa balance, kinds of birth, surgery, and the living body as a measurable system.',
    readings: [
      { href: '/philosophy/', label: 'Philosophy and the living body', kind: 'reading' },
    ],
    labs: [
      { href: '/vignana-lab/#prakriti', label: 'Prakṛti Biosphere', kind: 'lab' },
      { href: '/vignana-lab/#chaturyoni', label: 'Chaturyoni life map', kind: 'lab' },
    ],
    thinkLabs: [
      { href: '/susruta-think-lab/', label: 'Suśruta surgery think lab', kind: 'think-lab' },
      { href: '/uddalaka-think-lab/', label: 'Uddālaka fasting and mind', kind: 'think-lab' },
      { href: '/biodome-think-lab/', label: 'Biodome think lab', kind: 'think-lab' },
    ],
  },
  {
    id: 'vastu',
    sa: 'वास्तुशास्त्रम्',
    en: 'Architecture (Vāstu)',
    blurb: 'Temple engineering, dry masonry, water architecture, and solar alignment.',
    readings: [
      { href: '/indian-knowledge-systems/', label: 'Indian Knowledge Systems overview', kind: 'reading' },
    ],
    labs: [
      { href: '/vignana-lab/#temple-engineering', label: 'Temple Engineering Lab', kind: 'lab' },
    ],
    thinkLabs: [
      { href: '/stepwell-think-lab/', label: 'Rani ki Vav stepwell hydraulics', kind: 'think-lab' },
      { href: '/konark-think-lab/', label: 'Konark chariot wheel', kind: 'think-lab' },
    ],
  },
  {
    id: 'vyakarana',
    sa: 'व्याकरणम्',
    en: 'Grammar & Linguistics (Vyākaraṇa)',
    blurb: 'Pāṇini’s rule system, metre, sound, and picture-poetry as structured language.',
    readings: [
      { href: '/grammar/', label: 'Pāṇinian grammar studio', kind: 'reading' },
      { href: '/dhatupatha/', label: 'Dhātupāṭha', kind: 'reading' },
    ],
    labs: [
      { href: '/vignana-lab/#nada-brahman', label: 'Nāda Brahman (cosmic sitār)', kind: 'lab' },
      { href: '/vignana-lab/#mantra-acoustics', label: 'Mantra acoustics', kind: 'lab' },
      { href: '/vignana-lab/#chandahshastra', label: 'Piṅgala Chandaḥśāstra', kind: 'lab' },
      { href: '/vignana-lab/#citrakavya', label: 'Citrakāvya matrix of mind', kind: 'lab' },
    ],
    thinkLabs: [
      { href: '/cipher-think-lab/', label: 'Kaṭapayādi number-words', kind: 'think-lab' },
    ],
  },
  {
    id: 'physics',
    sa: 'पदार्थ-विज्ञानम्',
    en: 'Physics & Matter',
    blurb: 'Heat, mass, atoms, and the loom of creation, stay, and dissolution.',
    readings: [
      { href: '/philosophy/', label: 'Vaiśeṣika and related Darśanas', kind: 'reading' },
    ],
    labs: [
      { href: '/vignana-lab/#asato-ma', label: 'Heat & Matter Mystery', kind: 'lab' },
      { href: '/vignana-lab/#paramanu', label: 'Atom Builder', kind: 'lab' },
      { href: '/vignana-lab/#srishti-sthiti-laya', label: 'Loom of Āruṇi', kind: 'lab' },
    ],
    thinkLabs: [],
  },
  {
    id: 'chemistry',
    sa: 'रसशास्त्रम्',
    en: 'Chemistry & Metallurgy',
    blurb: 'Fire-powder, rustless iron, and crucible steel — rasaśāstra meeting the lab bench.',
    readings: [
      { href: '/indian-knowledge-systems/', label: 'Indian Knowledge Systems overview', kind: 'reading' },
    ],
    labs: [
      { href: '/vignana-lab/#asato-ma', label: 'Heat & Matter Mystery', kind: 'lab' },
      { href: '/vignana-lab/#agnibana', label: 'Agnibāṇa chemistry and rockets', kind: 'lab' },
    ],
    thinkLabs: [
      { href: '/patina-think-lab/', label: 'Delhi Iron Pillar passivation', kind: 'think-lab' },
      { href: '/wootz-think-lab/', label: 'Wootz crucible steel', kind: 'think-lab' },
    ],
  },
  {
    id: 'agriculture',
    sa: 'कृषि-भूमि-विज्ञानम्',
    en: 'Agriculture & Soil',
    blurb: 'Soil, crops, and food sovereignty — Govardhan, Kṛṣi, and Anna-Svarāj.',
    readings: [
      { href: '/indian-knowledge-systems/', label: 'Indian Knowledge Systems overview', kind: 'reading' },
    ],
    labs: [],
    thinkLabs: [
      { href: '/govardhan-soil-lab/', label: 'Govardhan soil lab', kind: 'think-lab' },
      { href: '/krishi-think-lab/', label: 'Kṛṣi think lab', kind: 'think-lab' },
      { href: '/food-sovereignty-lab/', label: 'Anna-Svarāj (food sovereignty)', kind: 'think-lab' },
    ],
  },
];

export const IKS_HUB_RESOURCES: IksHubLink[] = [
  { href: '/iks/', label: 'IKS & Vijñāna Lab hub', kind: 'resource' },
  { href: '/vignana-lab/#catalog', label: 'All Vijñāna Lab games', kind: 'resource' },
  { href: '/iks-experiential-workbook/', label: 'IKS experiential workbook', kind: 'resource' },
  { href: '/wonders-science-quiz/', label: 'Wonders of science quiz', kind: 'resource' },
  { href: '/indian-knowledge-systems/', label: 'Indian Knowledge Systems landing', kind: 'resource' },
  { href: '/vignana-lab/#preschool-wonder', label: 'Play 2 Learn: Free Preschool Games', kind: 'resource' },
];

/** Lab game id -> subjects that point at it (for in-lab related reading). */
export function subjectsForLab(labId: string): IksHubSubject[] {
  const needle = `#${labId}`;
  return IKS_HUB_SUBJECTS.filter((s) => s.labs.some((l) => l.href.endsWith(needle) || l.href.includes(needle)));
}

export function subjectById(id: string): IksHubSubject | undefined {
  return IKS_HUB_SUBJECTS.find((s) => s.id === id);
}
