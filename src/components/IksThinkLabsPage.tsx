import React, { useState, useMemo, useEffect } from 'react';
import '../styles/iks-think-labs.css';
import { IksLabGraphic } from './scienceLab/IksLabSchematics';

export interface IksLabItem {
  id: string;
  url: string;
  title: string;
  devTitle: string;
  iastTitle: string;
  category: 'all' | 'astronomy' | 'metallurgy' | 'mathematics' | 'ecology' | 'medicine' | 'workbook';
  categoryLabel: string;
  categoryDev: string;
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
  {
    id: 'konark',
    url: '/konark-think-lab/',
    title: 'Konark Sun Temple Chariot Wheel',
    devTitle: 'कोणारार्क-सूर्यचक्रम्',
    iastTitle: 'Koṇārka Sūrya-Cakram',
    category: 'astronomy',
    categoryLabel: 'Astronomy & Time',
    categoryDev: 'सौर-कालज्ञानम्',
    domain: 'Solar Shadows, Ghaṭikā Reckoning & Azimuth Angles',
    code: 'AST-01',
    accentColor: '#d97706',
    glowColor: 'rgba(217, 119, 6, 0.25)',
    tagline: 'Decode 24 cosmic spokes into precise sub-hourly solar time.',
    coreConcepts: ['Solar Azimuth & Altitude', '24 Spokes Timekeeping (8 Praharas)', 'Solstice Shadow Drift', 'Equinox Meridian Transit'],
    historicalSource: 'Sūrya Siddhānta & Kalinga Architectural Canons (1250 CE)',
    curriculumLink: 'CBSE Class 7 Science: Motion and Time & Light Shadows',
    inquiryPrompt: 'How can the width of a single carved stone spoke shadow reveal time down to a fraction of a ghaṭikā (24 minutes)?',
    recommendedGrade: 'Class 7–10',
    badgeName: 'Sūrya-Cakra Master',
  },
  {
    id: 'patina',
    url: '/patina-think-lab/',
    title: 'Delhi Iron Pillar Passivation Film',
    devTitle: 'लौहस्तम्भ-संक्षारण-रोधः',
    iastTitle: 'Lauha-Stambha Saṅkṣāraṇa-Rodhaḥ',
    category: 'metallurgy',
    categoryLabel: 'Metallurgy & Materials',
    categoryDev: 'लोहशास्त्रम्',
    domain: 'Corrosion Passivation & Solid-State Chemistry',
    code: 'MET-01',
    accentColor: '#0284c7',
    glowColor: 'rgba(2, 132, 199, 0.25)',
    tagline: 'Why has a 6-ton wrought iron pillar resisted rust for over 1,600 years?',
    coreConcepts: ['High-Phosphorus Slag Chemistry', 'Catalytic δ-FeOOH (Misawite) Film', 'Microstructural Heterogeneity', 'Passive Oxide Protective Barrier'],
    historicalSource: 'Gupta Metallurgical Inscription & Rasaratnākara (c. 400 CE)',
    curriculumLink: 'CBSE Class 7 Science: Physical and Chemical Changes (Rusting)',
    inquiryPrompt: 'Test different humidity, slag phosphorus levels, and oxide layers to see what halts rust in humid monsoon air.',
    recommendedGrade: 'Class 7–10',
    badgeName: 'Lauha-Stambha Chemist',
  },
  {
    id: 'cipher',
    url: '/cipher-think-lab/',
    title: 'Kaṭapayādi Alphanumeric Cipher',
    devTitle: 'कटपयादि-सङ्केतमाला',
    iastTitle: 'Kaṭapayādi Saṅketa-Mālā',
    category: 'mathematics',
    categoryLabel: 'Mathematics & Cryptography',
    categoryDev: 'गणित-कूटलेखनम्',
    domain: 'Hashing Algorithms, Pi Expansion & Binary Metrics',
    code: 'MTH-01',
    accentColor: '#7c3aed',
    glowColor: 'rgba(124, 58, 237, 0.25)',
    tagline: 'Encode mathematical constants and astronomical tables inside rhythmic poetry.',
    coreConcepts: ['Consonant-to-Digit Hashing', 'Mādhava 31-Decimal π Shloka', 'Aṅkānāṃ Vāmato Gatiḥ (Right-to-Left)', 'Piṅgala Binary Prosody'],
    historicalSource: 'Mādhava of Saṅgamagrāma & Sadratnamāla (c. 1380 CE)',
    curriculumLink: 'CBSE Class 7 Mathematics: Integers, Decimals & Cryptographic Patterns',
    inquiryPrompt: 'Type any Sanskrit word or shloka and decipher its concealed numerical code—or encode your own secrets into meter!',
    recommendedGrade: 'Class 6–10',
    badgeName: 'Kaṭapayādi Cryptographer',
  },
  {
    id: 'biodome',
    url: '/biodome-think-lab/',
    title: 'Prakṛti Closed-Loop Bio-Dome',
    devTitle: 'प्रकृति-मण्डलम्',
    iastTitle: 'Prakṛti Closed-Loop Biosphere',
    category: 'ecology',
    categoryLabel: 'Ecology & Biosphere',
    categoryDev: 'पारिस्थितिकी',
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
    id: 'uddalaka',
    url: '/uddalaka-think-lab/',
    title: 'Sage Uddālaka Empirical Mind Lab',
    devTitle: 'उद्दालक-आरुणि-प्रत्यक्ष-शाला',
    iastTitle: 'Uddālaka Āruṇi Pratyakṣa-Śālā',
    category: 'medicine',
    categoryLabel: 'Medicine, Mind & Biology',
    categoryDev: 'आयुर्वेद व मन',
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
    id: 'cosmic-alignment',
    url: '/cosmic-alignment-lab/',
    title: 'Cosmic Alignment & Pañcāṅga Lab',
    devTitle: 'खगोल-सङ्क्रमणम्',
    iastTitle: 'Pañcāṅga & Nakṣatra Dynamics',
    category: 'astronomy',
    categoryLabel: 'Astronomy & Time',
    categoryDev: 'सौर-कालज्ञानम्',
    domain: 'Celestial Coordinates, Lunar Phases & Equinoctial Precession',
    code: 'AST-02',
    accentColor: '#0284c7',
    glowColor: 'rgba(2, 132, 199, 0.25)',
    tagline: 'Master how 27 nakṣatras and 30 tithis generate the classical Indian lunar-solar calendar.',
    coreConcepts: ['27 Nakṣatras (13° 20′ Segments)', '30 Tithis (12° Sun-Moon Angular Difference)', 'Ayanāṃśa & Precession of Equinoxes', 'Solar Ingress (Saṅkrānti) & Seasons'],
    historicalSource: 'Vedāṅga Jyotiṣa (Lagadha) & Āryabhaṭīya (499 CE)',
    curriculumLink: 'CBSE Class 7 Social Science & Physics: Planetary Motions & Seasons',
    inquiryPrompt: 'Why does the Moon take ~29.5 days to cycle phases while taking ~27.3 days to orbit Earth? Track the synodic vs sidereal gap in real time.',
    recommendedGrade: 'Class 7–12',
    badgeName: 'Jyotiṣa Khagola-Vid',
  },
  {
    id: 'stepwell',
    url: '/stepwell-think-lab/',
    title: 'Rani ki Vav Stepwell Hydraulics',
    devTitle: 'वाव्-जल-स्थापत्यम्',
    iastTitle: 'Stepwell Microclimate & Geothermal Cooling',
    category: 'metallurgy',
    categoryLabel: 'Metallurgy & Materials',
    categoryDev: 'लोहशास्त्रम्',
    domain: 'Passive Subterranean Cooling, Fractal Steps & Aquifer Recharge',
    code: 'MET-02',
    accentColor: '#0d9488',
    glowColor: 'rgba(13, 148, 136, 0.25)',
    tagline: 'Ancient Indian subterranean architectural marvels operating without electricity.',
    coreConcepts: ['Subterranean Geothermal Heat Sink', 'Evaporative Microclimate Cooling (6–8°C Drop)', 'Hydraulic Fractal Silt Settling', 'Aquifer Table Filtration'],
    historicalSource: 'Aparājitapṛcchā & Rani ki Vav (Patan, Gujarat, 1063 CE)',
    curriculumLink: 'CBSE Class 7 Science: Heat & Water: A Precious Resource',
    inquiryPrompt: 'Descend 7 subterranean pavilion tiers in 45°C summer heat: observe ambient humidity rise and temperature plummet to 28°C.',
    recommendedGrade: 'Class 7–10',
    badgeName: 'Vāstu Sthāpatya Master',
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
    domain: 'Hyper-Eutectoid Crucible Steel & Carbon Nanotubes',
    code: 'MET-03',
    accentColor: '#ea580c',
    glowColor: 'rgba(234, 88, 12, 0.25)',
    tagline: 'The legendary south Indian steel that gave birth to Damascus blades and modern metallurgy.',
    coreConcepts: ['Sealed Clay Crucible Pyrotechnology', 'Hyper-Eutectoid Carbon Absorption (1.5% C)', 'Spheroidized Cementite Micro-Bands', 'Carbon Nanotube Encapsulation'],
    historicalSource: 'Rasaratnasamuccaya & Tamil Sangam Ukku (c. 300 BCE)',
    curriculumLink: 'CBSE Class 7 Science: Physical & Chemical Changes, Heat Transfer',
    inquiryPrompt: 'Heat magnetite iron ore with Cassia auriculata leaves inside a sealed crucible to 1,400°C: discover how carbon dissolves without burning!',
    recommendedGrade: 'Class 7–11',
    badgeName: 'Ukku Crucible Smelter',
  },
  {
    id: 'susruta',
    url: '/susruta-think-lab/',
    title: 'Suśruta Surgical & Biomimetic Tools',
    devTitle: 'सुश्रुत-शस्त्र-यन्त्र-विज्ञानम्',
    iastTitle: 'Suśruta Yantra & Śastra Design',
    category: 'medicine',
    categoryLabel: 'Medicine, Mind & Biology',
    categoryDev: 'आयुर्वेद व मन',
    domain: '101+ Biomimetic Instruments & Reconstructive Flap Rhinoplasty',
    code: 'MED-02',
    accentColor: '#be123c',
    glowColor: 'rgba(190, 18, 60, 0.25)',
    tagline: 'The Father of Surgery: biomimetic forceps inspired by animals and living tissue reconstructive flaps.',
    coreConcepts: ['101 Yantras (Forceps modeled on falcon, lion, heron jaws)', '20 Śastras (Razor-sharp scalpels & lancets)', 'Forehead Pedicle Flap Rhinoplasty (Living Vascular Supply)', 'Aseptic Cautery with Kṣāra & Agni'],
    historicalSource: 'Suśruta Saṃhitā Sūtrasthāna (c. 600 BCE)',
    curriculumLink: 'CBSE Class 7 Science: Nutrition & Animal/Human Anatomy',
    inquiryPrompt: 'Perform step-by-step reconstruction of an injured nasal pyramid using Suśruta’s forehead flap: maintain blood supply through the pedicle.',
    recommendedGrade: 'Class 7–12',
    badgeName: 'Suśruta Surgeon',
  },
  {
    id: 'govardhan',
    url: '/govardhan-soil-lab/',
    title: 'Govardhan Soil Ecology Lab',
    devTitle: 'गोवर्धन-मृत्तिका-पारिस्थितिकी',
    iastTitle: 'Soil Horizons & Microbial Biology',
    category: 'ecology',
    categoryLabel: 'Ecology & Biosphere',
    categoryDev: 'पारिस्थितिकी',
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
    categoryLabel: 'Ecology & Biosphere',
    categoryDev: 'पारिस्थितिकी',
    domain: 'Ancient Indian Meteorology, Cloud Science & Sowing Calendars',
    code: 'ECO-03',
    accentColor: '#0284c7',
    glowColor: 'rgba(2, 132, 199, 0.25)',
    tagline: 'Ancient Indian meteorological agronomy: forecast monsoon rains from wind direction and cloud formations.',
    coreConcepts: ['4 Major Cloud Classes (Āvarta, Saṃvarta, Puṣkara, Droṇa)', 'Wind Vane Observations & Monsoon Predictions', 'Organic Seed Preservation with Cow Dung Ash & Milk', 'Soil Moistering & Intercropping Schedules'],
    historicalSource: 'Kṛṣi-Parāśara & Bṛhat Saṃhitā (Varāhamihira)',
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
    categoryLabel: 'Ecology & Biosphere',
    categoryDev: 'पारिस्थितिकी',
    domain: 'Indigenous Landraces, Genetic Diversity & Climate Resilience',
    code: 'ECO-04',
    accentColor: '#16a34a',
    glowColor: 'rgba(22, 163, 74, 0.25)',
    tagline: 'Why preserving 100,000+ indigenous Indian rice varieties protects humanity from climate shocks.',
    coreConcepts: ['Saline-Resistant Pokkali Rice of Kerala', 'Submergence-Tolerant Flood Landraces', 'Drought-Resilient Millets (Rāgī, Bājrā, Jowār)', 'Heirloom Open-Pollinated Seed Banks vs Hybrid Monoculture'],
    historicalSource: 'Caraka Saṃhitā (Śūkadānya Varga) & Traditional Seed Keepers',
    curriculumLink: 'CBSE Class 7 Science: Nutrition in Plants & Reproduction in Plants',
    inquiryPrompt: 'Simulate a coastal cyclone flood: test hybrid seed crops against indigenous Pokkali landraces to see which harvest survives!',
    recommendedGrade: 'Class 7–10',
    badgeName: 'Bīja-Rakṣaka Seed Guardian',
  },
  {
    id: 'iks-workbook',
    url: '/iks-experiential-workbook/',
    title: 'Class 7 IKS Experiential Science Workbook',
    devTitle: 'सप्तम-कक्षा-प्रयोग-पुस्तिका',
    iastTitle: 'CBSE Experiential Science Guide',
    category: 'workbook',
    categoryLabel: 'Workbooks & Assessments',
    categoryDev: 'पुस्तिका व प्रश्नोत्तरी',
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
          Fourteen standalone, curriculum-linked experiential STEM inquiry sandboxes connecting classical Indian scientific
          pioneers (Kaṇāda, Āryabhaṭa, Suśruta, Varāhamihira, Mādhava, Uddālaka) with modern NCERT Class 7–10 science curricula.
          Experiment with solar shadow trigonometry, 1,600-year rust prevention chemistry, binary prosody, closed-loop ecosystems,
          and living tissue flap surgery.
        </p>

        <div className="iks-stats-pills">
          <div className="iks-stat-pill">
            <strong>3</strong> Astronomy &amp; Time
          </div>
          <div className="iks-stat-pill">
            <strong>3</strong> Metallurgy &amp; Chemistry
          </div>
          <div className="iks-stat-pill">
            <strong>1</strong> Binary &amp; Cryptography
          </div>
          <div className="iks-stat-pill">
            <strong>3</strong> Ecology &amp; Soil
          </div>
          <div className="iks-stat-pill">
            <strong>2</strong> Medicine &amp; Surgery
          </div>
          <div className="iks-stat-pill">
            <strong>2</strong> Workbooks &amp; Quizzes
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
            All Think Labs (14)
          </button>
          <button
            type="button"
            className={`iks-tab-btn ${selectedCat === 'astronomy' ? 'is-active' : ''}`}
            onClick={() => setSelectedCat('astronomy')}
          >
            Astronomy &amp; Time (खगोल)
          </button>
          <button
            type="button"
            className={`iks-tab-btn ${selectedCat === 'metallurgy' ? 'is-active' : ''}`}
            onClick={() => setSelectedCat('metallurgy')}
          >
            Metallurgy &amp; Materials (लोहशास्त्र)
          </button>
          <button
            type="button"
            className={`iks-tab-btn ${selectedCat === 'mathematics' ? 'is-active' : ''}`}
            onClick={() => setSelectedCat('mathematics')}
          >
            Mathematics &amp; Codes (गणित)
          </button>
          <button
            type="button"
            className={`iks-tab-btn ${selectedCat === 'ecology' ? 'is-active' : ''}`}
            onClick={() => setSelectedCat('ecology')}
          >
            Ecology &amp; Soil (प्रकृति व कृषि)
          </button>
          <button
            type="button"
            className={`iks-tab-btn ${selectedCat === 'medicine' ? 'is-active' : ''}`}
            onClick={() => setSelectedCat('medicine')}
          >
            Medicine &amp; Mind (आयुर्वेद व मन)
          </button>
          <button
            type="button"
            className={`iks-tab-btn ${selectedCat === 'workbook' ? 'is-active' : ''}`}
            onClick={() => setSelectedCat('workbook')}
          >
            Workbooks &amp; Quizzes (पुस्तिका)
          </button>
        </div>

        <div className="iks-search-row">
          <div className="iks-search-input-wrap">
            <span className="iks-search-icon" aria-hidden="true">Search:</span>
            <input
              type="text"
              className="iks-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by concept, Sanskrit keyword, or chapter..."
              aria-label="Search IKS Think Labs"
            />
            {searchQuery && (
              <button
                type="button"
                className="iks-search-clear"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search query"
              >
                Clear
              </button>
            )}
          </div>
          <div className="iks-results-meta">
            Showing <strong>{filteredLabs.length}</strong> of {IKS_LABS_CATALOG.length} Think Labs
          </div>
        </div>
      </section>

      {/* Grid of Cards (No emojis) */}
      <main className="iks-cards-grid" aria-label="IKS Think Labs Catalog">
        {filteredLabs.map((lab) => (
          <article
            key={lab.id}
            id={`iks-lab-${lab.id}`}
            className="iks-card"
            style={{
              ['--card-accent' as any]: lab.accentColor,
              ['--card-glow' as any]: lab.glowColor,
            }}
          >
            <div className="iks-card-top-accent" />
            
            <div>
              <div className="iks-card-header">
                <div className="iks-card-icon-wrap" aria-label={lab.code}>
                  <span className="iks-card-code-text">{lab.code}</span>
                </div>
                <div className="iks-card-header-tags">
                  <span className="iks-card-grade-tag">{lab.recommendedGrade}</span>
                  <span className="iks-card-cat-badge">{lab.categoryLabel}</span>
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
              <a
                href={lab.url}
                className="iks-card-launch-btn"
                title={`Launch ${lab.title} in full screen`}
              >
                <span>Launch Lab</span>
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </article>
        ))}
      </main>

      {/* Bottom Callout Section (No emojis) */}
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
