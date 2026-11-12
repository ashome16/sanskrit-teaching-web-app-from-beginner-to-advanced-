import React, { useState, useMemo, useEffect } from 'react';
import '../styles/iks-think-labs.css';
import { IksLabGraphic } from './scienceLab/IksLabSchematics';
import { IKS_LAB_QUIZZES } from '../data/iksQuizzesData';

export interface IksLabItem {
  id: string;
  url: string;
  title: string;
  devTitle: string;
  iastTitle: string;
  category: 'all' | 'metallurgy' | 'astronomy' | 'mathematics' | 'ecology' | 'medicine' | 'workbook';
  categoryLabel: string;
  categoryDev: string;
  unitNumber: number;
  unitName: string;
  orderIndex: number;
  requiredPoints: number;
  domain: string;
  code: string;
  accentColor: string;
  glowColor: string;
  tagline: string;
  coreConcepts: string[];
  historicalSource: string;
  curriculumLink: string;
  inquiryPrompt: string;
  recommendedGrade: string;
  badgeName: string;
}

export const IKS_LABS_CATALOG: IksLabItem[] = [
  /* ==========================================================================
     UNIT 1: METALLURGY & MATERIAL SCIENCES (धातुशास्त्रम् व रसशास्त्रम्)
     ========================================================================== */
  {
    id: 'patina',
    url: '/patina-think-lab/',
    title: 'Delhi Iron Pillar Passivation Film',
    devTitle: 'लौहस्तम्भ-संक्षारण-रोधः',
    iastTitle: 'Lauha-Stambha Saṅkṣāraṇa-Rodhaḥ',
    category: 'metallurgy',
    categoryLabel: 'Metallurgy & Materials',
    categoryDev: 'लोहशास्त्रम्',
    unitNumber: 1,
    unitName: 'Unit 1: Metallurgy & Material Sciences (धातुशास्त्रम् व रसशास्त्रम्)',
    orderIndex: 1,
    requiredPoints: 0,
    domain: 'Corrosion Passivation & Solid-State Chemistry',
    code: 'MET-01',
    accentColor: '#0284c7',
    glowColor: 'rgba(2, 132, 199, 0.25)',
    tagline: 'Dhātu-Śāstra mastery: Why has a 6-ton solid-state wrought iron pillar resisted rust for over 1,600 years?',
    coreConcepts: ['High-Phosphorus Slag Chemistry', 'Catalytic δ-FeOOH (Misawite) Film', 'Dhātu-Śāstra & Rasaśāstra Classifications', 'Solid-State Wrought Iron Smelting'],
    historicalSource: 'Gupta Metallurgical Inscription, Rasaratna Samuccaya & Rasaratnākara (c. 400 CE)',
    curriculumLink: 'CBSE Class 7 Science: Physical and Chemical Changes (Corrosion & Rusting)',
    inquiryPrompt: 'Test different humidity, slag phosphorus levels, and oxide layers to see what catalytically forms the protective misawite barrier.',
    recommendedGrade: 'Class 7–10',
    badgeName: 'Lauha-Stambha Chemist',
  },
  {
    id: 'wootz',
    url: '/wootz-think-lab/',
    title: 'Wootz Crucible Steel (Ukku)',
    devTitle: 'उक्कु-लोह-धातुकर्म',
    iastTitle: 'Wootz Crucible Metallurgy',
    category: 'metallurgy',
    categoryLabel: 'Metallurgy & Materials',
    categoryDev: 'लोहशास्त्रम्',
    unitNumber: 1,
    unitName: 'Unit 1: Metallurgy & Material Sciences (धातुशास्त्रम् व रसशास्त्रम्)',
    orderIndex: 2,
    requiredPoints: 100,
    domain: 'Hyper-Eutectoid Crucible Steel & Carbon Nanotubes',
    code: 'MET-02',
    accentColor: '#ea580c',
    glowColor: 'rgba(234, 88, 12, 0.25)',
    tagline: 'High-temperature refractory crucibles (Mūṣā >1200°C) producing Damascus steel blades and carbon nanotubes.',
    coreConcepts: ['Sealed Clay Crucible Pyrotechnology', 'Hyper-Eutectoid Carbon Absorption (1.5% C)', 'Spheroidized Cementite Micro-Bands', 'Kautilya Arthaśāstra Ākarādhyakṣa (Mining)'],
    historicalSource: 'Rasaratna Samuccaya & Tamil Sangam Ukku (c. 300 BCE)',
    curriculumLink: 'CBSE Class 7 Science: Physical & Chemical Changes, Heat Transfer',
    inquiryPrompt: 'Heat magnetite iron ore with Cassia auriculata leaves inside a sealed crucible to 1,400°C: discover how carbon dissolves without burning!',
    recommendedGrade: 'Class 7–11',
    badgeName: 'Ukku Crucible Smelter',
  },
  {
    id: 'stepwell',
    url: '/stepwell-think-lab/',
    title: 'Rani ki Vav Stepwell Hydraulics',
    devTitle: 'वाव्-जल-स्थापत्यम्',
    iastTitle: 'Stepwell Microclimate & Geothermal Cooling',
    category: 'metallurgy',
    categoryLabel: 'Metallurgy & Hydraulics',
    categoryDev: 'लोहशास्त्रम् व स्थापत्यम्',
    unitNumber: 1,
    unitName: 'Unit 1: Metallurgy & Material Sciences (धातुशास्त्रम् व रसशास्त्रम्)',
    orderIndex: 3,
    requiredPoints: 200,
    domain: 'Passive Subterranean Cooling, Hydraulic Lime & Aquifer Recharge',
    code: 'MET-03',
    accentColor: '#0d9488',
    glowColor: 'rgba(13, 148, 136, 0.25)',
    tagline: 'Subterranean architectural marvels operating passive microclimate cooling without electricity.',
    coreConcepts: ['Subterranean Geothermal Heat Sink', 'Evaporative Microclimate Cooling (42°C → 24°C)', 'Hydraulic Fractal Silt Settling', 'Vajralepa Hydraulic Lime Mortar'],
    historicalSource: 'Aparājitapṛcchā & Rani ki Vav (Patan, Gujarat, 1063 CE)',
    curriculumLink: 'CBSE Class 7 Science: Heat & Water: A Precious Resource',
    inquiryPrompt: 'Descend 7 subterranean pavilion tiers in 45°C summer heat: observe ambient humidity rise and temperature plummet to 24°C.',
    recommendedGrade: 'Class 7–10',
    badgeName: 'Vāstu Sthāpatya Master',
  },

  /* ==========================================================================
     UNIT 2: ASTRONOMY & SOLAR TIMEKEEPING (सौर-कालज्ञानम्)
     ========================================================================== */
  {
    id: 'konark',
    url: '/konark-think-lab/',
    title: 'Konark Sun Temple Chariot Wheel',
    devTitle: 'कोणारार्क-सूर्यचक्रम्',
    iastTitle: 'Koṇārka Sūrya-Cakram',
    category: 'astronomy',
    categoryLabel: 'Astronomy & Time',
    categoryDev: 'सौर-कालज्ञानम्',
    unitNumber: 2,
    unitName: 'Unit 2: Astronomy & Solar Timekeeping (सौर-कालज्ञानम्)',
    orderIndex: 4,
    requiredPoints: 300,
    domain: 'Solar Shadows, Ghaṭikā Reckoning & Azimuth Angles',
    code: 'AST-01',
    accentColor: '#d97706',
    glowColor: 'rgba(217, 119, 6, 0.25)',
    tagline: 'Decode 24 cosmic spokes into precise sub-hourly solar time and praharas.',
    coreConcepts: ['Solar Azimuth & Altitude', '24 Spokes Timekeeping (8 Praharas)', 'Solstice Shadow Drift', 'Equinox Meridian Transit'],
    historicalSource: 'Sūrya Siddhānta & Kalinga Architectural Canons (1250 CE)',
    curriculumLink: 'CBSE Class 7 Science: Motion and Time & Light Shadows',
    inquiryPrompt: 'How can the width of a single carved stone spoke shadow reveal time down to a fraction of a ghaṭikā (24 minutes)?',
    recommendedGrade: 'Class 7–10',
    badgeName: 'Sūrya-Cakra Master',
  },
  {
    id: 'cosmic-alignment',
    url: '/cosmic-alignment-lab/',
    title: 'Cosmic Alignment & Pañcāṅga Lab',
    devTitle: 'खगोल-सङ्क्रमणम्',
    iastTitle: 'Pañcāṅga & Nakṣatra Dynamics',
    category: 'astronomy',
    categoryLabel: 'Astronomy & Time',
    categoryDev: 'सौर-कालज्ञानम्',
    unitNumber: 2,
    unitName: 'Unit 2: Astronomy & Solar Timekeeping (सौर-कालज्ञानम्)',
    orderIndex: 5,
    requiredPoints: 400,
    domain: 'Celestial Coordinates, Lunar Phases & Equinoctial Precession',
    code: 'AST-02',
    accentColor: '#0284c7',
    glowColor: 'rgba(2, 132, 199, 0.25)',
    tagline: 'Master how 27 nakṣatras and 30 tithis generate the classical Indian lunar-solar calendar.',
    coreConcepts: ['27 Nakṣatras (13° 20′ Segments)', '30 Tithis (12° Sun-Moon Angular Difference)', 'Ayanāṁśa & Precession of Equinoxes', 'Solar Ingress (Saṅkrānti) & Seasons'],
    historicalSource: 'Vedāṅga Jyotiṣa (Lagadha) & Āryabhaṭīya (499 CE)',
    curriculumLink: 'CBSE Class 7 Social Science & Physics: Planetary Motions & Seasons',
    inquiryPrompt: 'Why does the Moon take ~29.5 days to cycle phases while taking ~27.3 days to orbit Earth? Track the synodic vs sidereal gap in real time.',
    recommendedGrade: 'Class 7–12',
    badgeName: 'Jyotiṣa Khagola-Vid',
  },

  /* ==========================================================================
     UNIT 3: MATHEMATICS & CRYPTOGRAPHY (गणित-कूटलेखनम्)
     ========================================================================== */
  {
    id: 'cipher',
    url: '/cipher-think-lab/',
    title: 'Kaṭapayādi Alphanumeric Cipher',
    devTitle: 'कटपयादि-सङ्केतमाला',
    iastTitle: 'Kaṭapayādi Saṅketa-Mālā',
    category: 'mathematics',
    categoryLabel: 'Mathematics & Cryptography',
    categoryDev: 'गणित-कूटलेखनम्',
    unitNumber: 3,
    unitName: 'Unit 3: Mathematics & Cryptography (गणित-कूटलेखनम्)',
    orderIndex: 6,
    requiredPoints: 500,
    domain: 'Hashing Algorithms, Pi Expansion & Binary Metrics',
    code: 'MTH-01',
    accentColor: '#7c3aed',
    glowColor: 'rgba(124, 58, 237, 0.25)',
    tagline: 'Encode mathematical constants and astronomical tables inside rhythmic poetry.',
    coreConcepts: ['Consonant-to-Digit Hashing', 'Mādhava 31-Decimal π Shloka', 'Aṅkānāṁ Vāmato Gatiḥ (Right-to-Left)', 'Piṅgala Binary Prosody'],
    historicalSource: 'Mādhava of Saṅgamagrāma & Sadratnamāla (c. 1380 CE)',
    curriculumLink: 'CBSE Class 7 Mathematics: Integers, Decimals & Cryptographic Patterns',
    inquiryPrompt: 'Type any Sanskrit word or shloka and decipher its concealed numerical code—or encode your own secrets into meter!',
    recommendedGrade: 'Class 6–10',
    badgeName: 'Kaṭapayādi Cryptographer',
  },

  /* ==========================================================================
     UNIT 4: ECOLOGY, SOIL & AGRICULTURAL METEOROLOGY (प्रकृति, मृत्तिका व कृषि)
     ========================================================================== */
  {
    id: 'biodome',
    url: '/biodome-think-lab/',
    title: 'Prakṛti Closed-Loop Bio-Dome',
    devTitle: 'प्रकृति-मण्डलम्',
    iastTitle: 'Prakṛti Closed-Loop Biosphere',
    category: 'ecology',
    categoryLabel: 'Ecology & Biosphere',
    categoryDev: 'पारिस्थितिकी',
    unitNumber: 4,
    unitName: 'Unit 4: Ecology, Soil & Agricultural Meteorology (प्रकृति व कृषि)',
    orderIndex: 7,
    requiredPoints: 600,
    domain: 'Trophic Equilibria, Feedback Loops & 5 Mahābhūtas',
    code: 'ECO-01',
    accentColor: '#059669',
    glowColor: 'rgba(5, 150, 105, 0.25)',
    tagline: 'Balance sunlight, soil microbes, plant canopy, and consumers in a sealed biodome.',
    coreConcepts: ['Trophic Pyramids (Producers to Apex Predators)', 'Oxygen/CO₂ Equilibrium', 'Microbial Decomposition & Humus', 'Ecosystem Resilience & Shocks'],
    historicalSource: 'Bhagavad Gītā 3.14 (अन्नाद् भवन्ति भूतानि) & Chāndogya Upaniṣad',
    curriculumLink: 'CBSE Class 7 Science: Forests Our Lifeline & Soil',
    inquiryPrompt: 'Adjust rainfall, temperature, and apex predator density: can you keep the biosphere thriving without runaway collapse?',
    recommendedGrade: 'Class 7–9',
    badgeName: 'Prakṛti Ecologist',
  },
  {
    id: 'govardhan',
    url: '/govardhan-soil-lab/',
    title: 'Govardhan Soil Ecology Lab',
    devTitle: 'गोवर्धन-मृत्तिका-पारिस्थितिकी',
    iastTitle: 'Soil Horizons & Microbial Biology',
    category: 'ecology',
    categoryLabel: 'Ecology & Soil',
    categoryDev: 'पारिस्थितिकी',
    unitNumber: 4,
    unitName: 'Unit 4: Ecology, Soil & Agricultural Meteorology (प्रकृति व कृषि)',
    orderIndex: 8,
    requiredPoints: 700,
    domain: 'Soil Horizons, Water Percolation & Mycorrhizal Networks',
    code: 'ECO-02',
    accentColor: '#65a30d',
    glowColor: 'rgba(101, 163, 13, 0.25)',
    tagline: 'Explore soil as a sacred, living bio-sponge instead of inert dirt.',
    coreConcepts: ['Soil Horizons (O, A Humus, B Mineral, C Regolith)', 'Percolation Rate vs Water Retention Capacity', 'Earthworms & Soil Aeration', 'Hill Watershed Recharge Architecture'],
    historicalSource: 'Śrīmad Bhāgavatam 10.24 (Govardhana-Pūjā) & Kṛṣi-Parāśara',
    curriculumLink: 'CBSE Class 7 Science: Soil & Water',
    inquiryPrompt: 'Compare sand, clay, and loam horizons under heavy downpours: measure percolation rates and prevent soil erosion.',
    recommendedGrade: 'Class 7–9',
    badgeName: 'Mṛttikā Soil Biologist',
  },
  {
    id: 'krishi',
    url: '/krishi-think-lab/',
    title: 'Kṛṣi-Parāśara Agricultural Science',
    devTitle: 'कृषि-पराशर-विज्ञानम्',
    iastTitle: 'Ancient Meteorology & Agronomy',
    category: 'ecology',
    categoryLabel: 'Ecology & Meteorology',
    categoryDev: 'पारिस्थितिकी',
    unitNumber: 4,
    unitName: 'Unit 4: Ecology, Soil & Agricultural Meteorology (प्रकृति व कृषि)',
    orderIndex: 9,
    requiredPoints: 800,
    domain: 'Ancient Indian Meteorology, Cloud Science & Sowing Calendars',
    code: 'ECO-03',
    accentColor: '#0284c7',
    glowColor: 'rgba(2, 132, 199, 0.25)',
    tagline: 'Ancient Indian meteorological agronomy: forecast monsoon rains from wind direction and cloud formations.',
    coreConcepts: ['4 Major Cloud Classes (Āvarta, Saṁvarta, Puṣkara, Droṇa)', 'Wind Vane Observations & Monsoon Predictions', 'Droṇa-Māna Rain Gauge Calibration', 'Soil Moistering & Intercropping Schedules'],
    historicalSource: 'Kṛṣi-Parāśara & Bṛhat Saṁhitā (Varāhamihira)',
    curriculumLink: 'CBSE Class 7 Science: Weather, Climate & Adaptations',
    inquiryPrompt: 'Read wind direction on Pauṣa month morning: predict which cloud type will bring bountiful rain for the Kharif paddy crop.',
    recommendedGrade: 'Class 7–10',
    badgeName: 'Kṛṣi Meteorologist',
  },
  {
    id: 'food-sovereignty',
    url: '/food-sovereignty-lab/',
    title: 'Anna-Svarāj Heirloom Seed Conservation',
    devTitle: 'अन्न-स्वराज्यम्',
    iastTitle: 'Heirloom Seed Diversity & Resilience',
    category: 'ecology',
    categoryLabel: 'Ecology & Seeds',
    categoryDev: 'पारिस्थितिकी',
    unitNumber: 4,
    unitName: 'Unit 4: Ecology, Soil & Agricultural Meteorology (प्रकृति व कृषि)',
    orderIndex: 10,
    requiredPoints: 900,
    domain: 'Indigenous Landraces, Genetic Diversity & Climate Resilience',
    code: 'ECO-04',
    accentColor: '#16a34a',
    glowColor: 'rgba(22, 163, 74, 0.25)',
    tagline: 'Why preserving 100,000+ indigenous Indian rice varieties protects humanity from climate shocks.',
    coreConcepts: ['Saline-Resistant Pokkali Rice of Kerala', 'Submergence-Tolerant Flood Landraces', 'Drought-Resilient Millets (Rāgī, Bājrā, Jowār)', 'Heirloom Open-Pollinated Seed Banks vs Hybrid Monoculture'],
    historicalSource: 'Caraka Saṁhitā (Śūkadānya Varga) & Traditional Seed Keepers',
    curriculumLink: 'CBSE Class 7 Science: Nutrition in Plants & Reproduction in Plants',
    inquiryPrompt: 'Simulate a coastal cyclone flood: test hybrid seed crops against indigenous Pokkali landraces to see which harvest survives!',
    recommendedGrade: 'Class 7–10',
    badgeName: 'Bīja-Rakṣaka Seed Guardian',
  },

  /* ==========================================================================
     UNIT 5: MEDICINE, COGNITIVE EPISTEMOLOGY & SURGERY (आयुर्वेद व मन)
     ========================================================================== */
  {
    id: 'uddalaka',
    url: '/uddalaka-think-lab/',
    title: 'Sage Uddālaka Empirical Mind Lab',
    devTitle: 'उद्दालक-आरुणि-प्रत्यक्ष-शाला',
    iastTitle: 'Uddālaka Āruṇi Pratyakṣa-Śālā',
    category: 'medicine',
    categoryLabel: 'Medicine, Mind & Biology',
    categoryDev: 'आयुर्वेद व मन',
    unitNumber: 5,
    unitName: 'Unit 5: Medicine, Cognitive Epistemology & Surgery (आयुर्वेद व मन)',
    orderIndex: 11,
    requiredPoints: 1000,
    domain: 'Empirical Epistemology & Metabolic Neurobiology',
    code: 'MED-01',
    accentColor: '#db2777',
    glowColor: 'rgba(219, 39, 119, 0.25)',
    tagline: 'The world’s first recorded cognitive scientist: salt in water & the 15-day fasting test.',
    coreConcepts: ['Dissolution & Pervasive Essence (Tat Tvam Asi)', '15-Day Fasting Memory Degradation', 'Subtle Food Transformation into Mind (Manas)', 'Pratyakṣa (Empirical Verification)'],
    historicalSource: 'Chāndogya Upaniṣad 6.1–6.16 (c. 800 BCE)',
    curriculumLink: 'CBSE Class 7 Science: Nutrition in Animals & Scientific Method',
    inquiryPrompt: 'Simulate Śvetaketu’s daily fast: track blood glucose, ketone bodies, and Veda recitation memory retention over 15 days.',
    recommendedGrade: 'Class 7–10',
    badgeName: 'Uddālaka Inquirer',
  },
  {
    id: 'susruta',
    url: '/susruta-think-lab/',
    title: 'Suśruta Surgical & Biomimetic Tools',
    devTitle: 'सुश्रुत-शस्त्र-यन्त्र-विज्ञानम्',
    iastTitle: 'Suśruta Yantra & Śastra Design',
    category: 'medicine',
    categoryLabel: 'Medicine & Surgery',
    categoryDev: 'आयुर्वेद व शल्यशास्त्रम्',
    unitNumber: 5,
    unitName: 'Unit 5: Medicine, Cognitive Epistemology & Surgery (आयुर्वेद व मन)',
    orderIndex: 12,
    requiredPoints: 1100,
    domain: '101+ Biomimetic Instruments & Reconstructive Flap Rhinoplasty',
    code: 'MED-02',
    accentColor: '#be123c',
    glowColor: 'rgba(190, 18, 60, 0.25)',
    tagline: 'The Father of Surgery: biomimetic forceps inspired by animals and living tissue reconstructive flaps.',
    coreConcepts: ['101 Yantras (Forceps modeled on falcon, lion, heron jaws)', '20 Śastras (Razor-sharp scalpels & lancets)', 'Forehead Pedicle Flap Rhinoplasty (Living Vascular Supply)', 'Aseptic Cautery with Kṣāra & Agni'],
    historicalSource: 'Suśruta Saṁhitā Sūtrasthāna (c. 600 BCE)',
    curriculumLink: 'CBSE Class 7 Science: Nutrition & Animal/Human Anatomy',
    inquiryPrompt: 'Perform step-by-step reconstruction of an injured nasal pyramid using Suśruta’s forehead flap: maintain blood supply through the pedicle.',
    recommendedGrade: 'Class 7–12',
    badgeName: 'Suśruta Surgeon',
  },

  /* ==========================================================================
     UNIT 6: CAPSTONE FIELD JOURNAL & ASSESSMENT (पुस्तिका व महा-प्रश्नोत्तरी)
     ========================================================================== */
  {
    id: 'iks-workbook',
    url: '/iks-experiential-workbook/',
    title: 'Class 7 IKS Experiential Science Workbook',
    devTitle: 'सप्तम-कक्षा-प्रयोग-पुस्तिका',
    iastTitle: 'CBSE Experiential Science Guide',
    category: 'workbook',
    categoryLabel: 'Workbooks & Assessments',
    categoryDev: 'पुस्तिका व प्रश्नोत्तरी',
    unitNumber: 6,
    unitName: 'Unit 6: Capstone Field Journal & Assessment (पुस्तिका व महा-प्रश्नोत्तरी)',
    orderIndex: 13,
    requiredPoints: 1200,
    domain: 'Comprehensive NCERT Class 7 Science Hands-On Companion',
    code: 'WBK-01',
    accentColor: '#4338ca',
    glowColor: 'rgba(67, 56, 202, 0.25)',
    tagline: 'Printable and interactive laboratory worksheets connecting CBSE Class 7 chapters with Indian scientific heritage.',
    coreConcepts: ['15 Chapter-Aligned Inquiry Worksheets', 'Hands-On Kitchen & Garden Science Experiments', 'Observation Logbook & Data Graphing Tables', 'Pramāṇa Scientific Method Rubrics'],
    historicalSource: 'NCERT Class 7 Science Textbook & NEP 2020 IKS Integration Guidelines',
    curriculumLink: 'Complete CBSE Class 7 Science Syllabus (All 18 Chapters)',
    inquiryPrompt: 'Download or complete hands-on observation sheets with step-by-step illustrations, hypothesis prompts, and teacher evaluation keys.',
    recommendedGrade: 'Class 7 (Ages 11–13)',
    badgeName: 'IKS Scholar',
  },
  {
    id: 'wonders-quiz',
    url: '/wonders-science-quiz/',
    title: 'Wonders of Indian Science Quiz',
    devTitle: 'भारतीय-विज्ञान-कौतुक-प्रश्नोत्तरी',
    iastTitle: 'Mastery Assessment & Trivia Challenge',
    category: 'workbook',
    categoryLabel: 'Workbooks & Assessments',
    categoryDev: 'पुस्तिका व प्रश्नोत्तरी',
    unitNumber: 6,
    unitName: 'Unit 6: Capstone Field Journal & Assessment (पुस्तिका व महा-प्रश्नोत्तरी)',
    orderIndex: 14,
    requiredPoints: 1300,
    domain: 'Formative Assessment Across Ancient Indian Science & Technology',
    code: 'WBK-02',
    accentColor: '#ca8a04',
    glowColor: 'rgba(202, 138, 4, 0.25)',
    tagline: 'Put your scientific inquiry to the test across 14 civilizations discoveries and win Vidyā Stars.',
    coreConcepts: ['14 Dynamic Heritage STEM Question Sets', 'Instant Misconception Feedback & Citations', 'Vidyā Stars & Explorer Badges', 'Leaderboard & Mastery Streak Tracking'],
    historicalSource: 'Classical Texts of Aryabhata, Sushruta, Kanada, Varahamihira, Madhava',
    curriculumLink: 'CBSE / NEP 2020 Formative Heritage STEM Assessment',
    inquiryPrompt: 'Test yourself on sundials, metallurgy, binary prosody, surgical instruments, and soil horizons with immediate scored feedback.',
    recommendedGrade: 'Class 6–12',
    badgeName: 'Vijñāna Champion',
  },
];

const STORAGE_KEY_PROGRESS = 'iks_learning_path_v1';

interface IksProgressState {
  unlockedLabIds: string[];
  masteredLabIds: string[];
  points: number;
  isTeacherMode: boolean;
}

const DEFAULT_PROGRESS: IksProgressState = {
  unlockedLabIds: ['patina'], // First lab (Patina) is unlocked by default
  masteredLabIds: [],
  points: 0,
  isTeacherMode: false,
};

function getStoredProgress(): IksProgressState {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROGRESS);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw);
    return {
      unlockedLabIds: Array.isArray(parsed.unlockedLabIds) && parsed.unlockedLabIds.length ? parsed.unlockedLabIds : ['patina'],
      masteredLabIds: Array.isArray(parsed.masteredLabIds) ? parsed.masteredLabIds : [],
      points: typeof parsed.points === 'number' ? parsed.points : 0,
      isTeacherMode: Boolean(parsed.isTeacherMode),
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

function saveStoredProgress(state: IksProgressState) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(state));
  } catch {}
}

function calculateTier(points: number): { title: string; dev: string } {
  if (points >= 1100) return { title: 'Tier 4: Vidyā Ācārya (Grand Scientist)', dev: 'विद्या-आचार्य' };
  if (points >= 600) return { title: 'Tier 3: Siddhānta Scientist', dev: 'सिद्धान्त-विद्' };
  if (points >= 200) return { title: 'Tier 2: Dhātu & Rasa Apprentice', dev: 'धातु-विद्यार्थी' };
  return { title: 'Tier 1: Novice Inquirer', dev: 'आरम्भक' };
}

interface IksThinkLabsPageProps {
  onGoHome?: () => void;
  onOpenScienceLab?: () => void;
  onOpenResources?: () => void;
}

export const IksThinkLabsPage: React.FC<IksThinkLabsPageProps> = ({
  onGoHome,
  onOpenScienceLab,
  onOpenResources,
}) => {
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [progress, setProgress] = useState<IksProgressState>(() => getStoredProgress());
  
  // Interactive Quiz Modal State
  const [activeQuizLabId, setActiveQuizLabId] = useState<string | null>(null);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);

  useEffect(() => {
    try {
      const path = window.location.pathname.replace(/\/+$/, '');
      const matched = IKS_LABS_CATALOG.find(
        (l) => l.url.replace(/\/+$/, '') === path || path.endsWith(l.id)
      );
      if (matched) {
        setTimeout(() => {
          const el = document.getElementById(`iks-lab-${matched.id}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            el.classList.add('iks-card--targeted');
          }
        }, 250);
      }
    } catch {}
  }, []);

  const handleToggleTeacherMode = (enableTeacher: boolean) => {
    setProgress((prev) => {
      const updated = { ...prev, isTeacherMode: enableTeacher };
      saveStoredProgress(updated);
      return updated;
    });
  };

  const handleOpenQuiz = (labId: string) => {
    setActiveQuizLabId(labId);
    setCurrentQIndex(0);
    setSelectedOptionIdx(null);
    setIsAnswerChecked(false);
    setQuizScore(0);
    setIsQuizCompleted(false);
  };

  const handleCloseQuiz = () => {
    setActiveQuizLabId(null);
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswerChecked || !activeQuizLabId) return;
    const quiz = IKS_LAB_QUIZZES[activeQuizLabId];
    if (!quiz) return;
    const currentQ = quiz.questions[currentQIndex];

    setSelectedOptionIdx(idx);
    setIsAnswerChecked(true);

    const isCorrect = idx === currentQ.correctIdx;
    if (isCorrect) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (!activeQuizLabId) return;
    const quiz = IKS_LAB_QUIZZES[activeQuizLabId];
    if (!quiz) return;

    if (currentQIndex < quiz.questions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedOptionIdx(null);
      setIsAnswerChecked(false);
    } else {
      // Quiz complete!
      setIsQuizCompleted(true);
      const finalScore = quizScore + (selectedOptionIdx === quiz.questions[currentQIndex].correctIdx ? 0 : 0);
      const passed = finalScore >= 2;

      if (passed) {
        setProgress((prev) => {
          const isNewlyMastered = !prev.masteredLabIds.includes(activeQuizLabId);
          const newMastered = isNewlyMastered ? [...prev.masteredLabIds, activeQuizLabId] : prev.masteredLabIds;
          const newPoints = isNewlyMastered ? prev.points + 100 : prev.points;

          // Unlock next sequential lab
          const currentIndex = IKS_LABS_CATALOG.findIndex((l) => l.id === activeQuizLabId);
          const nextLab = IKS_LABS_CATALOG[currentIndex + 1];
          const newUnlocked = nextLab && !prev.unlockedLabIds.includes(nextLab.id)
            ? [...prev.unlockedLabIds, nextLab.id]
            : prev.unlockedLabIds;

          const updated: IksProgressState = {
            ...prev,
            masteredLabIds: newMastered,
            unlockedLabIds: newUnlocked,
            points: newPoints,
          };
          saveStoredProgress(updated);
          return updated;
        });
      }
    }
  };

  const currentQuizData = activeQuizLabId ? IKS_LAB_QUIZZES[activeQuizLabId] : null;

  const filteredLabs = useMemo(() => {
    return IKS_LABS_CATALOG.filter((lab) => {
      const matchesCat = selectedCat === 'all' || lab.category === selectedCat;
      if (!matchesCat) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        lab.title.toLowerCase().includes(q) ||
        lab.devTitle.toLowerCase().includes(q) ||
        lab.iastTitle.toLowerCase().includes(q) ||
        lab.domain.toLowerCase().includes(q) ||
        lab.tagline.toLowerCase().includes(q) ||
        lab.curriculumLink.toLowerCase().includes(q) ||
        lab.coreConcepts.some((c) => c.toLowerCase().includes(q))
      );
    });
  }, [selectedCat, searchQuery]);

  const masteredCount = progress.masteredLabIds.length;
  const progressPercent = Math.min(100, Math.round((masteredCount / IKS_LABS_CATALOG.length) * 100));
  const currentTier = calculateTier(progress.points);

  return (
    <div className="iks-portal-page">
      {/* Topline Navigation (No emojis) */}
      <nav className="iks-topbar" aria-label="IKS Portal Navigation">
        <div className="iks-topbar-left">
          {onGoHome && (
            <button type="button" className="iks-nav-btn" onClick={onGoHome}>
              Home
            </button>
          )}
          {onOpenScienceLab && (
            <button type="button" className="iks-nav-btn iks-nav-btn--primary" onClick={onOpenScienceLab}>
              Vijñāna Lab Hub
            </button>
          )}
          {onOpenResources && (
            <button type="button" className="iks-nav-btn" onClick={onOpenResources}>
              Toolkit
            </button>
          )}
        </div>
        <div className="iks-topbar-right">
          <span className="iks-badge-pill" title="Aligned with National Education Policy (NEP 2020) Indian Knowledge Systems">
            NEP 2020 · IKS Experiential
          </span>
          <span className="iks-badge-pill" title="Class 7 & High School Inquiry Labs">
            14 Active Labs
          </span>
        </div>
      </nav>

      {/* Hero Section (No emojis) */}
      <header className="iks-hero">
        <div className="iks-hero-kicker">
          <span>भारतीय ज्ञान परंपरा · Indian Knowledge Systems (IKS)</span>
        </div>
        <h1 className="iks-hero-title">
          IKS Experiential Think Labs
          <span lang="sa" className="iks-hero-title-dev">
            अनुभवात्मक विचार-शाला · १४ अनुसंधानानि
          </span>
        </h1>

        {/* User-Requested Taglines (No emojis) */}
        <div className="iks-taglines-block">
          <p className="iks-tagline-primary">
            <strong>Observe. Question. Discover.</strong>
          </p>
          <p className="iks-taglines-secondary">
            Explore nature · Understand the universe · Explore the cosmos · Understand creation.
          </p>
        </div>

        <p className="iks-hero-desc">
          Fourteen sequential, curriculum-linked STEM inquiry sandboxes connecting classical Indian scientific
          traditions (Dhātu-Śāstra metallurgy, Kaṇāda, Āryabhaṭa, Suśruta, Varāhamihira, Mādhava, Uddālaka) with modern NCERT Class 7–10 science curricula.
          Earn Vidyā Points, pass inquiry mastery checks, and unlock the civilizational pathway from ancient pyrotechnology to celestial coordinate astronomy.
        </p>

        {/* ==========================================================================
           SEQUENTIAL PROGRESSION & KHAN ACADEMY STYLE HUD
           ========================================================================== */}
        <div className="iks-progression-hud" aria-label="Student Learning Pathway Progress">
          <div className="iks-progression-top">
            <div className="iks-progression-stats">
              <span className="iks-points-badge" title="Total Vidyā Points earned through lab quizzes">
                <span>Vidyā Score:</span>
                <strong>{progress.points} Pts</strong>
              </span>
              <span className="iks-mastery-count-badge" title="Labs Mastered">
                <span>Mastered:</span>
                <strong>{masteredCount} / 14 Labs</strong>
              </span>
              <span className="iks-tier-pill" title="Current Academic Rank">
                <span>{currentTier.title}</span>
              </span>
            </div>

            <div className="iks-mode-toggle-wrap">
              <button
                type="button"
                className={`iks-mode-btn ${!progress.isTeacherMode ? 'is-active' : ''}`}
                onClick={() => handleToggleTeacherMode(false)}
                title="Student Pathway: Unlock labs sequentially by earning points"
              >
                Student Path (Sequential)
              </button>
              <button
                type="button"
                className={`iks-mode-btn ${progress.isTeacherMode ? 'is-active' : ''}`}
                onClick={() => handleToggleTeacherMode(true)}
                title="Teacher Mode: All labs unlocked for classroom presentation and testing"
              >
                Teacher Mode (All Unlocked)
              </button>
            </div>
          </div>

          <div className="iks-progress-bar-wrap" aria-label={`Progress: ${progressPercent}% completed`}>
            <div className="iks-progress-bar-fill" style={{ width: `${progressPercent}%` }} />
          </div>

          <div className="iks-progression-subtext">
            <span>
              {progress.isTeacherMode
                ? 'Teacher Mode Active: All 14 Think Labs accessible for review and teaching.'
                : 'Complete each lab inquiry quiz (score ≥ 2/3) to earn +100 Vidyā Points and unlock the next level.'}
            </span>
            <strong>{progressPercent}% Complete</strong>
          </div>
        </div>

        <div className="iks-stats-pills">
          <div className="iks-stat-pill">
            <strong>3</strong> Metallurgy &amp; Materials (Unit 1)
          </div>
          <div className="iks-stat-pill">
            <strong>2</strong> Astronomy &amp; Time (Unit 2)
          </div>
          <div className="iks-stat-pill">
            <strong>1</strong> Cryptography &amp; Math (Unit 3)
          </div>
          <div className="iks-stat-pill">
            <strong>4</strong> Ecology &amp; Soil (Unit 4)
          </div>
          <div className="iks-stat-pill">
            <strong>2</strong> Medicine &amp; Surgery (Unit 5)
          </div>
          <div className="iks-stat-pill">
            <strong>2</strong> Capstone Workbooks (Unit 6)
          </div>
        </div>
      </header>

      {/* Filter and Search Controls (No emojis) */}
      <section className="iks-controls-card" aria-label="Filter and Search IKS Labs">
        <div className="iks-filter-tabs">
          <button
            type="button"
            className={`iks-tab-btn ${selectedCat === 'all' ? 'is-active' : ''}`}
            onClick={() => setSelectedCat('all')}
          >
            All Think Labs (14 Sequential)
          </button>
          <button
            type="button"
            className={`iks-tab-btn ${selectedCat === 'metallurgy' ? 'is-active' : ''}`}
            onClick={() => setSelectedCat('metallurgy')}
          >
            Unit 1: Metallurgy (धातुशास्त्र)
          </button>
          <button
            type="button"
            className={`iks-tab-btn ${selectedCat === 'astronomy' ? 'is-active' : ''}`}
            onClick={() => setSelectedCat('astronomy')}
          >
            Unit 2: Astronomy (सौर-काल)
          </button>
          <button
            type="button"
            className={`iks-tab-btn ${selectedCat === 'mathematics' ? 'is-active' : ''}`}
            onClick={() => setSelectedCat('mathematics')}
          >
            Unit 3: Mathematics (गणित)
          </button>
          <button
            type="button"
            className={`iks-tab-btn ${selectedCat === 'ecology' ? 'is-active' : ''}`}
            onClick={() => setSelectedCat('ecology')}
          >
            Unit 4: Ecology &amp; Soil (प्रकृति व कृषि)
          </button>
          <button
            type="button"
            className={`iks-tab-btn ${selectedCat === 'medicine' ? 'is-active' : ''}`}
            onClick={() => setSelectedCat('medicine')}
          >
            Unit 5: Medicine &amp; Surgery (आयुर्वेद)
          </button>
          <button
            type="button"
            className={`iks-tab-btn ${selectedCat === 'workbook' ? 'is-active' : ''}`}
            onClick={() => setSelectedCat('workbook')}
          >
            Unit 6: Workbooks &amp; Quizzes (पुस्तिका)
          </button>
        </div>

        <div className="iks-search-row">
          <div className="iks-search-input-wrap">
            <span className="iks-search-icon" aria-hidden="true">Search:</span>
            <input
              type="text"
              className="iks-search-input"
              placeholder="Search by topic, source (Rasaratna Samuccaya, Suśruta, Āryabhaṭa), or concept..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search IKS Labs"
            />
          </div>

          <div className="iks-results-meta">
            Showing <strong>{filteredLabs.length}</strong> of {IKS_LABS_CATALOG.length} Think Labs
          </div>
        </div>
      </section>

      {/* Grid of Cards (No emojis) */}
      <main className="iks-cards-grid" aria-label="IKS Think Labs Catalog">
        {filteredLabs.map((lab) => {
          const isUnlocked = progress.isTeacherMode || progress.unlockedLabIds.includes(lab.id);
          const isMastered = progress.masteredLabIds.includes(lab.id);

          return (
            <article
              key={lab.id}
              id={`iks-lab-${lab.id}`}
              className={`iks-card ${!isUnlocked ? 'is-locked' : ''} ${isMastered ? 'is-mastered' : ''}`}
              style={{
                ['--card-accent' as any]: lab.accentColor,
                ['--card-glow' as any]: lab.glowColor,
              }}
            >
              <div className="iks-card-top-accent" />
              
              <div>
                {!isUnlocked && (
                  <div className="iks-locked-indicator-banner">
                    <span>Locked · Pass previous lab quiz to unlock</span>
                    <button
                      type="button"
                      className="iks-locked-quick-unlock"
                      onClick={() => handleToggleTeacherMode(true)}
                    >
                      Unlock All (Teacher)
                    </button>
                  </div>
                )}

                <div className="iks-card-header">
                  <div className="iks-card-icon-wrap" aria-label={lab.code}>
                    <span className="iks-card-code-text">{lab.code}</span>
                  </div>
                  <div className="iks-card-header-tags">
                    <span className="iks-card-grade-tag">{lab.recommendedGrade}</span>
                    {isMastered ? (
                      <span className="iks-card-badge-chip is-mastered">✓ Mastered (+100 Pts)</span>
                    ) : isUnlocked ? (
                      <span className="iks-card-badge-chip is-active">Level {lab.orderIndex} · Unlocked</span>
                    ) : (
                      <span className="iks-card-badge-chip is-locked">Level {lab.orderIndex} · Locked</span>
                    )}
                  </div>
                </div>

                <div className="iks-card-titles">
                  <span lang="sa" className="iks-card-dev-title">{lab.devTitle}</span>
                  <span className="iks-card-iast-title">{lab.iastTitle}</span>
                  <h2 className="iks-card-main-title">{lab.title}</h2>
                </div>

                <p className="iks-card-tagline">{lab.tagline}</p>

                <div className="iks-card-concepts" aria-label="Core Scientific Concepts">
                  {lab.coreConcepts.map((concept, idx) => (
                    <span key={idx} className="iks-card-concept-pill">
                      {concept}
                    </span>
                  ))}
                </div>

                {/* High-Definition Bespoke Vector Schematic (Zero Emojis) */}
                <div className="iks-card-schematic-wrap" aria-label={`${lab.title} scientific schematic`}>
                  <IksLabGraphic id={lab.id} />
                </div>

                <div className="iks-card-inquiry-box">
                  <span className="iks-card-inquiry-label">Inquiry Question</span>
                  <p style={{ margin: 0 }}>{lab.inquiryPrompt}</p>
                </div>

                <div className="iks-card-meta-list">
                  <div className="iks-card-meta-item">
                    <strong>Curricular Alignment:</strong> {lab.curriculumLink}
                  </div>
                  <div className="iks-card-meta-item">
                    <strong>Source:</strong> {lab.historicalSource}
                  </div>
                </div>
              </div>

              <div className="iks-card-footer">
                <span className="iks-card-badge-chip">
                  {lab.badgeName}
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                  {/* Take Mastery Quiz Button */}
                  <button
                    type="button"
                    className={`iks-card-quiz-btn ${isMastered ? 'is-mastered' : ''}`}
                    onClick={() => handleOpenQuiz(lab.id)}
                    title={isMastered ? 'Review completed quiz' : 'Take 3-question mastery check to earn points and unlock next lab'}
                  >
                    {isMastered ? '✓ Review Quiz' : 'Mastery Quiz (+100 Pts)'}
                  </button>

                  {/* Launch Lab Button */}
                  {isUnlocked ? (
                    <a
                      href={lab.url}
                      className="iks-card-launch-btn"
                      title={`Launch ${lab.title} in full screen`}
                    >
                      <span>Launch Lab</span>
                      <span aria-hidden="true">&rarr;</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      className="iks-card-launch-btn"
                      style={{ background: '#94a3b8', cursor: 'not-allowed', opacity: 0.75 }}
                      onClick={() => alert(`Level ${lab.orderIndex} is currently locked in Student Sequential Mode.\n\nPass the preceding lab's Mastery Quiz or switch to Teacher Mode in the top header to preview immediately.`)}
                    >
                      <span>Locked</span>
                      <span aria-hidden="true">🔒</span>
                    </button>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </main>

      {/* ==========================================================================
         INTERACTIVE INQUIRY MASTERY QUIZ MODAL
         ========================================================================== */}
      {activeQuizLabId && currentQuizData && (
        <div className="iks-quiz-overlay" role="dialog" aria-modal="true" aria-label="IKS Mastery Quiz">
          <div className="iks-quiz-modal">
            <div className="iks-quiz-header">
              <div className="iks-quiz-header-text">
                <span className="iks-quiz-unit-kicker">{currentQuizData.unitTitle}</span>
                <h3>{currentQuizData.labTitle} · Mastery Quiz</h3>
              </div>
              <button
                type="button"
                className="iks-quiz-close-btn"
                onClick={handleCloseQuiz}
                aria-label="Close Quiz"
              >
                ✕
              </button>
            </div>

            <div className="iks-quiz-body">
              {!isQuizCompleted ? (
                <div>
                  <div className="iks-quiz-progress-text">
                    <span>Question {currentQIndex + 1} of {currentQuizData.questions.length}</span>
                    <span>Discipline: {currentQuizData.discipline}</span>
                  </div>

                  <p className="iks-quiz-prompt">
                    {currentQuizData.questions[currentQIndex].prompt}
                  </p>

                  <div className="iks-quiz-options-grid">
                    {currentQuizData.questions[currentQIndex].options.map((option, idx) => {
                      const isSelected = selectedOptionIdx === idx;
                      const isCorrect = idx === currentQuizData.questions[currentQIndex].correctIdx;

                      let btnClass = 'iks-quiz-option-btn';
                      if (isAnswerChecked) {
                        if (isCorrect) btnClass += ' is-correct';
                        else if (isSelected) btnClass += ' is-wrong';
                      }

                      return (
                        <button
                          key={idx}
                          type="button"
                          className={btnClass}
                          onClick={() => handleSelectOption(idx)}
                          disabled={isAnswerChecked}
                        >
                          <strong style={{ marginRight: '0.4rem' }}>{['A', 'B', 'C', 'D'][idx]}.</strong>
                          {option}
                        </button>
                      );
                    })}
                  </div>

                  {isAnswerChecked && (
                    <div className="iks-quiz-explanation">
                      <strong>
                        {selectedOptionIdx === currentQuizData.questions[currentQIndex].correctIdx
                          ? '✓ Correct Scientific Rationale:'
                          : 'Explanation & Historical Evidence:'}
                      </strong>
                      <p style={{ margin: 0 }}>
                        {currentQuizData.questions[currentQIndex].explanation}
                      </p>
                    </div>
                  )}

                  <div className="iks-quiz-actions">
                    {isAnswerChecked && (
                      <button
                        type="button"
                        className="iks-quiz-next-btn"
                        onClick={handleNextQuestion}
                      >
                        {currentQIndex < currentQuizData.questions.length - 1 ? 'Next Question →' : 'View Results →'}
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="iks-quiz-score-card">
                  <h4 className="iks-quiz-score-title">
                    {quizScore >= 2 ? 'Unit Mastery Check Passed!' : 'Inquiry Completed'}
                  </h4>
                  <div className="iks-quiz-score-num">
                    {quizScore} / {currentQuizData.questions.length} Correct
                  </div>
                  <p className="iks-quiz-score-desc">
                    {quizScore >= 2
                      ? `Congratulations! You scored ${quizScore}/${currentQuizData.questions.length}. You have earned +100 Vidyā Points and unlocked the next experiential think lab on your sequential learning pathway!`
                      : `You scored ${quizScore}/${currentQuizData.questions.length}. Review the scientific principles and retry to score at least 2/3 to unlock the next unit.`}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
                    <button
                      type="button"
                      className="iks-quiz-next-btn"
                      onClick={handleCloseQuiz}
                    >
                      {quizScore >= 2 ? 'Continue Learning Pathway →' : 'Return to Catalog'}
                    </button>
                    {quizScore < 2 && (
                      <button
                        type="button"
                        className="iks-card-quiz-btn"
                        onClick={() => handleOpenQuiz(activeQuizLabId)}
                      >
                        Retry Quiz
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer Callout */}
      <footer className="iks-hub-callout">
        <div className="iks-hub-callout-text">
          <h3>Looking for Core Physics &amp; Chemistry Simulators?</h3>
          <p>
            Explore our foundational Vedic science engines in the main Vijñāna Lab: Kaṇāda Paramāṇu particle synthesis,
            Jyotiṣa Gravity Sandbox, Prakṛti Biosphere, The Loom of Āruṇi, and Somayāna Mission-03.
          </p>
        </div>
        <div className="iks-hub-callout-actions">
          {onOpenScienceLab && (
            <button type="button" className="iks-nav-btn iks-nav-btn--gold" onClick={onOpenScienceLab}>
              Launch Vijñāna Lab Hub &rarr;
            </button>
          )}
          {onGoHome && (
            <button type="button" className="iks-nav-btn" onClick={onGoHome}>
              Return to Home
            </button>
          )}
        </div>
      </footer>
    </div>
  );
};

export default IksThinkLabsPage;
