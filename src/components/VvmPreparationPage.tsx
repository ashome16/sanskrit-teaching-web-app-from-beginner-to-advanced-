import React, { useState, useEffect } from 'react';
import '../styles/vvm-prep.css';

export interface VvmPreparationPageProps {
  onGoHome?: () => void;
  onOpenScienceLab?: (segment?: string) => void;
  onOpenIks?: () => void;
  onOpenVedicMaths?: () => void;
  onOpenResources?: () => void;
  onOpenQuiz?: () => void;
  initialTab?: VvmTab;
}

export type VvmTab = 'blueprint' | 'heritage' | 'scientists' | 'ncert' | 'logic' | 'quiz' | 'journey';

interface QuizQuestion {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const VVM_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: 'Indian Contributions to Science',
    question: 'In the Vaiśeṣika system of Indian philosophy, which ancient sage formulated the atomic theory describing indivisible particles called "Paramaṇu"?',
    options: ['Acharya Kanada', 'Sage Kapila', 'Rishi Patanjali', 'Sage Gautama'],
    correctIndex: 0,
    explanation: 'Acharya Kanada (c. 6th century BCE) founded the Vaisheshika school and propounded that all physical matter consists of indestructible, indivisible particles termed "Paramāṇu" that combine in dyads (dvyaṇuka) and triads (tryaṇuka).',
  },
  {
    id: 2,
    category: 'Indian Contributions to Science',
    question: 'The renowned rustless Delhi Iron Pillar at Qutub complex has withstood corrosion for over 1600 years primarily due to the formation of which protective passive layer?',
    options: ['Misawite (crystalline iron oxyhydroxide film)', 'Galvanized zinc oxide layer', 'Chromium oxide passive alloy', 'Pure magnetite surface burnishing'],
    correctIndex: 0,
    explanation: 'Metallurgical analysis by Indian scientists revealed that high phosphorus content and lack of sulfur/manganese in ancient bloomery wrought iron catalyzed a protective catalytic layer of "misawite" (δ-FeOOH) that shields the metal from atmospheric corrosion.',
  },
  {
    id: 3,
    category: 'Indian Contributions to Science',
    question: 'Which ancient surgical text describes over 120 surgical instruments (Yantras & Śastras) as well as the world\'s earliest techniques of rhinoplasty (plastic surgery)?',
    options: ['Suśruta Saṁhitā', 'Caraka Saṁhitā', 'Aṣṭāṅga Hṛdayam', 'Mādhava Nidāna'],
    correctIndex: 0,
    explanation: 'Acharya Sushruta (father of surgery) authored the Suśruta Saṁhitā, detailing intricate surgical procedures including forehead pedicle flap rhinoplasty, cataract couch surgery, bone setting, and 121 precision surgical instruments.',
  },
  {
    id: 4,
    category: 'Indian Contributions to Science',
    question: 'In the 5th century CE treatise Āryabhaṭīya, Āryabhaṭa correctly asserted that:',
    options: [
      'The Earth rotates daily on its own axis and planetary orbits are elliptical/epicyclic',
      'The Earth is completely stationary at the center of the firmament',
      'Solar eclipses occur when the demon Rahu swallows the Sun',
      'The speed of sound is faster than the speed of light'
    ],
    correctIndex: 0,
    explanation: 'Aryabhata explicitly stated in Goladhyaya that the apparent daily motion of stars is caused by Earth\'s axial rotation ("Like a person in a moving boat sees stationary trees moving backwards, so do stars appear to move westward due to Earth rotating eastward").',
  },
  {
    id: 5,
    category: 'Indian Contributions to Science',
    question: 'Which medieval school of Indian mathematics in Kerala developed infinite power series approximations for Pi (π), sine, and cosine nearly 250 years before Newton and Leibniz?',
    options: ['Kerala School of Astronomy and Mathematics (Madhava of Sangamagrama)', 'Ujjain Observatory School', 'Pataliputra Academy', 'Nalanda Mahavihara'],
    correctIndex: 0,
    explanation: 'Madhava of Sangamagrama (c. 1340–1425 CE) and successors like Nilakantha Somayaji in Kerala developed infinite series for π, arctan, and trigonometric functions (the Madhava-Leibniz and Madhava-Gregory series).',
  },
  {
    id: 6,
    category: 'Biographies of Eminent Indian Scientists',
    question: 'Anna Mani (1918–2001), one of India\'s most celebrated women in science, made pioneering national contributions in:',
    options: [
      'Meteorological instrumentation, atmospheric ozone profiling & solar/wind radiation mapping',
      'Discovery of deep underground diamond deposits',
      'Synthesis of synthetic nylon polymers',
      'Designing heavy steam locomotives for railways'
    ],
    correctIndex: 0,
    explanation: 'Anna Mani was a premier meteorologist who worked under C.V. Raman and later IMD, indigenously fabricating nearly 100 meteorological instruments, the ozonesonde, and publishing standard solar and wind energy resource manuals for India.',
  },
  {
    id: 7,
    category: 'Biographies of Eminent Indian Scientists',
    question: 'Dr. Asima Chatterjee (1917–2006), the first woman to receive a Doctorate of Science from an Indian university, is world-famous for her work on:',
    options: [
      'Alkaloids and medicinal phytochemistry, developing the anti-epileptic drug Ayush-56',
      'First quantum radar and supersonic stealth materials',
      'Nuclear reactor core moderation using heavy water',
      'Seismological mapping of the Deccan Plateau'
    ],
    correctIndex: 0,
    explanation: 'Asima Chatterjee made milestone breakthroughs in alkaloid chemistry, researching Vinca alkaloids from Madagascar periwinkle and developing the anti-epileptic formulation Ayush-56 as well as anti-malarial therapies.',
  },
  {
    id: 8,
    category: 'Biographies of Eminent Indian Scientists',
    question: 'Prof. Rohini Godbole (1952–2024), renowned theoretical physicist at IISc Bengaluru, was a global leader in which frontier scientific domain?',
    options: [
      'Collider physics, top quark phenomenology, and the Higgs boson searches at CERN',
      'Deep ocean geothermal vents mapping',
      'Plant cytology and pollen tube germination',
      'Radioactive carbon dating of Vedic pottery'
    ],
    correctIndex: 0,
    explanation: 'Rohini Godbole was a distinguished particle phenomenologist whose computations on photon colliders and top-quark / Higgs physics played an instrumental role in searches at CERN Large Hadron Collider.',
  },
  {
    id: 9,
    category: 'Biographies of Eminent Indian Scientists',
    question: 'Sir C.V. Raman was awarded the Nobel Prize in Physics in 1930 for which discovery made on February 28, 1928 (celebrated as National Science Day)?',
    options: [
      'The Raman Effect: Inelastic scattering of photons by molecular energy states',
      'Discovery of the cosmic microwave background radiation',
      'Discovery of nuclear magnetic resonance (NMR)',
      'Formulation of the theory of general relativity'
    ],
    correctIndex: 0,
    explanation: 'The Raman Effect demonstrated that when light traverses a transparent chemical compound, a small fraction of the scattered light exhibits modified wavelengths characteristic of the molecules, proving optical inelastic scattering.',
  },
  {
    id: 10,
    category: 'Biographies of Eminent Indian Scientists',
    question: 'The Saha Ionization Equation, which explains the spectral classification of stars based on thermal ionization equilibrium, was formulated by:',
    options: ['Prof. Meghnad Saha', 'Dr. Homi Jehangir Bhabha', 'Acharya P.C. Ray', 'Prof. Satyendra Nath Bose'],
    correctIndex: 0,
    explanation: 'Meghnad Saha (1920) linked thermal ionization of gaseous atoms to temperature and pressure, providing the fundamental key to decoding stellar temperatures and spectral types in modern astrophysics.',
  },
  {
    id: 11,
    category: 'NCERT Science & Mathematics',
    question: 'When white light passes through a glass prism, which colour of the visible spectrum undergoes the maximum deviation (bending)?',
    options: ['Violet', 'Red', 'Yellow', 'Green'],
    correctIndex: 0,
    explanation: 'Violet light has the shortest wavelength in the visible spectrum and travels slowest in glass, resulting in the highest refractive index and consequently the greatest angle of deviation.',
  },
  {
    id: 12,
    category: 'NCERT Science & Mathematics',
    question: 'What is the pH value of a completely neutral aqueous solution at 25°C (such as pure distilled water)?',
    options: ['pH 7.0', 'pH 1.0', 'pH 14.0', 'pH 0.0'],
    correctIndex: 0,
    explanation: 'At 25°C, pure water has equal concentrations of H⁺ and OH⁻ ions (1 × 10⁻⁷ mol/L), yielding a neutral pH of 7.',
  },
  {
    id: 13,
    category: 'NCERT Science & Mathematics',
    question: 'In vascular plants, which complex permanent tissue is responsible for the unidirectional upward transport of water and dissolved minerals from roots to leaves?',
    options: ['Xylem', 'Phloem', 'Parenchyma', 'Collenchyma'],
    correctIndex: 0,
    explanation: 'Xylem vessels and tracheids transport water and dissolved minerals upward from the soil via root pressure and transpirational pull, whereas phloem translocates soluble organic sugars bidirectionally.',
  },
  {
    id: 14,
    category: 'NCERT Science & Mathematics',
    question: 'According to Ohm\'s Law, for a conductor at constant temperature, the electric current (I) flowing through it is directly proportional to:',
    options: ['The potential difference (V) applied across its terminals', 'The square of its resistance (R²)', 'The ambient air pressure', 'The mass of the conductor'],
    correctIndex: 0,
    explanation: 'Ohm\'s Law states V = I · R; at a constant physical state and temperature, the electric current passing through a conductor is proportional to the potential difference across its ends.',
  },
  {
    id: 15,
    category: 'NCERT Science & Mathematics',
    question: 'In geometry, what is the sum of the interior angles of a regular hexagon (6-sided polygon)?',
    options: ['720°', '540°', '360°', '1080°'],
    correctIndex: 0,
    explanation: 'The sum of interior angles of any n-sided polygon is given by (n − 2) × 180°. For a hexagon: (6 − 2) × 180° = 4 × 180° = 720° (each interior angle is 120°).',
  },
  {
    id: 16,
    category: 'NCERT Science & Mathematics',
    question: 'An object is dropped from a height of 20 m above the ground. Neglecting air friction and taking g = 10 m/s², how long does it take to hit the ground?',
    options: ['2.0 seconds', '1.0 second', '4.0 seconds', '3.5 seconds'],
    correctIndex: 0,
    explanation: 'Using the kinematic equation s = ut + ½gt² with initial velocity u = 0: 20 = 0 + ½(10)t² ⇒ 20 = 5t² ⇒ t² = 4 ⇒ t = 2 seconds.',
  },
  {
    id: 17,
    category: 'Logic & Analytical Reasoning',
    question: 'Find the next number in the series: 3, 7, 15, 31, 63, ?',
    options: ['127', '125', '128', '119'],
    correctIndex: 0,
    explanation: 'The pattern is multiply by 2 and add 1 (or 2^(n+1) - 1): 3×2+1=7, 7×2+1=15, 15×2+1=31, 31×2+1=63, 63×2+1 = 127.',
  },
  {
    id: 18,
    category: 'Logic & Analytical Reasoning',
    question: 'In a code language, if "VARAHAMIHIRA" is coded based on the ancient Katapayadi cipher where each consonant maps to 1–9 and 0, how were astronomical and mathematical constants traditionally preserved in Sanskrit verses?',
    options: [
      'As metric poetical verses with syllable-to-number mappings read right-to-left (aṅkānāṁ vāmato gatiḥ)',
      'As randomized acoustic hums without numerical values',
      'Exclusively through knotted ropes (quipu)',
      'Through Roman numerals chiseled into stone only'
    ],
    correctIndex: 0,
    explanation: 'The Kaṭapayādi cipher assigned consonants numbers from 1 to 9 and 0, enabling mathematicians like Madhava and Aryabhata to write easy-to-remember poetic verses that decoded directly into high-precision astronomical tables.',
  },
  {
    id: 19,
    category: 'Logic & Analytical Reasoning',
    question: 'A student starts walking East for 10 meters, turns left and walks 15 meters, then turns left again and walks 10 meters. In which direction and distance is the student from the starting point?',
    options: ['15 meters North', '15 meters South', '20 meters East', '10 meters West'],
    correctIndex: 0,
    explanation: 'East 10m (+x), left turn is North 15m (+y), another left turn is West 10m (-x). The x-displacement is 10 - 10 = 0; the remaining displacement is 15 meters North.',
  },
  {
    id: 20,
    category: 'Logic & Analytical Reasoning',
    question: 'Statement 1: All scientists are keen observers. Statement 2: All keen observers make systematic hypotheses. Conclusion: All scientists make systematic hypotheses. Is this deduction valid?',
    options: [
      'Valid (Valid categorical syllogism of form: All A are B, All B are C, hence All A are C)',
      'Invalid (Fallacy of undistributed middle)',
      'Cannot be determined without empirical testing',
      'Invalid because some scientists work without hypotheses'
    ],
    correctIndex: 0,
    explanation: 'This is a classical Barbara-form categorical syllogism (All A are B, All B are C ∴ All A are C), which is logically valid.',
  },
  {
    id: 21,
    category: 'Indian Contributions to Science',
    question: 'Ancient Indian metallurgists at Zawar (Rajasthan) achieved a world milestone in extractive metallurgy by developing the earliest industrial process for smelting which volatile metal using inverted retort furnaces?',
    options: [
      'Zinc (Zn) distillation via downward condensation (Tiryak-pātana-yantra)',
      'Pure Titanium extraction',
      'Liquid Mercury condensation only',
      'Aluminum electrolysis'
    ],
    correctIndex: 0,
    explanation: 'Zinc boils at 907°C and oxidizes immediately in open air. Medieval Indian metallurgists at Zawar invented the world’s first industrial downward condensation retorts (tiryak-patana) centuries before William Champion patented zinc smelting in England in 1738.',
  },
  {
    id: 22,
    category: 'Indian Contributions to Science',
    question: 'Which monumental classical Indian medical text authored by Acharya Charaka establishes the foundational principles of internal medicine (Kāyacikitsā), etiology, and pharmacological therapeutics?',
    options: ['Caraka Saṁhitā', 'Suśruta Saṁhitā', 'Kāśyapa Saṁhitā', 'Rasaratnasamuccaya'],
    correctIndex: 0,
    explanation: 'The Caraka Saṁhitā is the foundational text of internal medicine (Kāyacikitsā) in Ayurveda, detailing the Tridosha balance (Vāta, Pitta, Kapha), pharmacological classification of medicinal herbs, and dietetics.',
  },
  {
    id: 23,
    category: 'Indian Contributions to Science',
    question: 'In the 6th-century encyclopedic treatise Bṛhat Saṁhitā, polymath Varāhamihira dedicated an entire chapter (Dakārgala) to which applied scientific discipline?',
    options: [
      'Groundwater hydrology and botanical water-divining indicators (Dakārgala)',
      'Deep-sea submarine construction',
      'Hot air balloon navigation',
      'Electric battery voltaic piles'
    ],
    correctIndex: 0,
    explanation: 'Varāhamihira’s Dakārgala chapter in Bṛhat Saṁhitā provides systematic empirical correlation between specific surface flora, termite mounds (Vālmīka), soil types, and subterranean aquifers for digging wells.',
  },
  {
    id: 24,
    category: 'Biographies of Eminent Indian Scientists',
    question: 'Dr. E.K. Janaki Ammal (1897–1984), the first Indian woman to obtain a Ph.D. in Botany, made groundbreaking national contributions to:',
    options: [
      'Cytogenetics and breeding indigenous high-yield sweet sugarcane hybrids at Sugarcane Breeding Institute Coimbatore',
      'Synthesizing artificial plastics',
      'Designing rocket propulsion nozzles',
      'Mapping Antarctic ice sheets'
    ],
    correctIndex: 0,
    explanation: 'Dr. Janaki Ammal did pioneering cytogenetic research, cross-breeding Saccharum officinarum with wild grasses to create high-yielding sugarcane hybrids that made India self-sufficient in sugar production.',
  },
  {
    id: 25,
    category: 'Biographies of Eminent Indian Scientists',
    question: 'Dr. Vikram Sarabhai (1919–1971), universally revered as the Father of the Indian Space Program, founded which pioneer institutions in India?',
    options: [
      'Physical Research Laboratory (PRL), ISRO, and Indian Institute of Management (IIM) Ahmedabad',
      'Bhabha Atomic Research Centre',
      'National Chemical Laboratory Pune',
      'Tata Memorial Hospital'
    ],
    correctIndex: 0,
    explanation: 'Vikram Sarabhai established the Physical Research Laboratory (PRL) in Ahmedabad, founded ISRO, set up the Thumba Equatorial Rocket Launching Station (TERLS) in Kerala, and co-founded IIM Ahmedabad.',
  },
  {
    id: 26,
    category: 'Biographies of Eminent Indian Scientists',
    question: 'Prof. C.R. Rao (1920–2023), one of the world’s most celebrated mathematical statisticians, received the 2023 International Prize in Statistics primarily for formulation of:',
    options: [
      'Cramér–Rao Bound and the Rao–Blackwell Theorem',
      'Quantum Chromodynamics Equations',
      'Theory of General Relativity',
      'Penicillin Antibiotic Synthesis'
    ],
    correctIndex: 0,
    explanation: 'C.R. Rao published his monumental 1945 paper establishing the Cramér–Rao Lower Bound (minimum variance for estimators) and Rao–Blackwellization, which revolutionized statistical inference, signal processing, and machine learning.',
  },
  {
    id: 27,
    category: 'NCERT Science & Mathematics',
    question: 'When 10 grams of calcium carbonate (CaCO₃) is heated strongly in a closed vessel, it decomposes into calcium oxide (CaO) and carbon dioxide (CO₂). If 5.6 grams of CaO is produced, what mass of CO₂ is released, verifying the Law of Conservation of Mass?',
    options: ['4.4 grams', '5.6 grams', '10.0 grams', '2.2 grams'],
    correctIndex: 0,
    explanation: 'By the Law of Conservation of Mass, Mass of Reactants = Mass of Products. Mass of CaCO₃ (10 g) = Mass of CaO (5.6 g) + Mass of CO₂ ⇒ Mass of CO₂ = 10 - 5.6 = 4.4 grams.',
  },
  {
    id: 28,
    category: 'NCERT Science & Mathematics',
    question: 'A rocket of mass 1000 kg ejects propellant gas at an exhaust velocity of 2000 m/s at a steady rate of 5 kg/s. What is the thrust force exerted on the rocket?',
    options: ['10,000 N', '20,000 N', '5,000 N', '1,000 N'],
    correctIndex: 0,
    explanation: 'Thrust Force F = (dm/dt) × v_exhaust = 5 kg/s × 2000 m/s = 10,000 N, demonstrating Newton’s Third Law of Motion and Conservation of Linear Momentum.',
  },
  {
    id: 29,
    category: 'Logic & Analytical Reasoning',
    question: 'At 3:15, what is the exact angle between the hour hand and the minute hand of a standard 12-hour analog clock?',
    options: ['7.5 degrees', '0 degrees', '15 degrees', '30 degrees'],
    correctIndex: 0,
    explanation: 'At 3:15, the minute hand is exactly on 3 (90° from 12). The hour hand advances 0.5° every minute. In 15 minutes, it moves 15 × 0.5° = 7.5° past the 3 mark. The angle between them is 7.5°.',
  },
  {
    id: 30,
    category: 'Logic & Analytical Reasoning',
    question: 'In a school cohort of 100 students preparing for VVM: 60 participate in Science Labs, 50 participate in Vedic Maths, and 20 participate in both. How many students participate in neither?',
    options: ['10 students', '20 students', '15 students', '30 students'],
    correctIndex: 0,
    explanation: 'Using the principle of inclusion-exclusion: N(A ∪ B) = N(A) + N(B) - N(A ∩ B) = 60 + 50 - 20 = 90. Therefore, students in neither = 100 - 90 = 10 students.',
  },
];

export const VvmPreparationPage: React.FC<VvmPreparationPageProps> = ({
  onGoHome,
  onOpenScienceLab,
  onOpenIks,
  onOpenVedicMaths,
  onOpenResources,
  onOpenQuiz,
  initialTab,
}) => {
  const [activeTab, setActiveTab] = useState<VvmTab>(() => {
    if (initialTab) return initialTab;
    if (typeof window !== 'undefined' && window.location.hash) {
      const h = window.location.hash.replace('#', '') as VvmTab;
      if (['blueprint', 'heritage', 'scientists', 'ncert', 'logic', 'quiz', 'journey'].includes(h)) {
        return h;
      }
    }
    return 'blueprint';
  });

  useEffect(() => {
    const handleHash = () => {
      const h = window.location.hash.replace('#', '') as VvmTab;
      if (['blueprint', 'heritage', 'scientists', 'ncert', 'logic', 'quiz', 'journey'].includes(h)) {
        setActiveTab(h);
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleTabClick = (tab: VvmTab) => {
    setActiveTab(tab);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#${tab}`);
    }
  };
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  const handleSelectAnswer = (questionId: number, optionIndex: number) => {
    if (selectedAnswers[questionId] !== undefined) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
  };

  const calculateScore = () => {
    let score = 0;
    VVM_QUIZ_QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const currentScore = calculateScore();

  return (
    <div className="vvm-page">
      <div className="vvm-container">

        {/* Topbar / Breadcrumb Navigation */}
        <nav className="vvm-topbar" aria-label="VVM Breadcrumb Navigation">
          <div className="vvm-topbar-left">
            {onGoHome && (
              <button type="button" className="vvm-topbar-btn" onClick={onGoHome}>
                ← Home (गृहम्)
              </button>
            )}
            {onOpenScienceLab && (
              <button type="button" className="vvm-topbar-btn" onClick={() => onOpenScienceLab('catalog')}>
                Science Simulations (विज्ञान-प्रयोगशाला)
              </button>
            )}
            {onOpenIks && (
              <button type="button" className="vvm-topbar-btn" onClick={onOpenIks}>
                IKS Think Labs (भारतीय ज्ञान परंपरा)
              </button>
            )}
            {onOpenVedicMaths && (
              <button type="button" className="vvm-topbar-btn" onClick={onOpenVedicMaths}>
                Vedic Maths (वैदिक-गणितम्)
              </button>
            )}
            {onOpenQuiz && (
              <button type="button" className="vvm-topbar-btn" onClick={onOpenQuiz}>
                Quiz Arena (प्रश्नोत्तरी)
              </button>
            )}
            {onOpenResources && (
              <button type="button" className="vvm-topbar-btn" onClick={onOpenResources}>
                Free Resources (साधनानि)
              </button>
            )}
          </div>
          <a
            href="https://vvm.org.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="vvm-topbar-portal-link"
            title="Open official Vidyarthi Vigyan Manthan registration portal"
          >
            <span>Official Portal · vvm.org.in ↗</span>
          </a>
        </nav>

        {/* Hero Section */}
        <header className="vvm-hero">
          <div className="vvm-hero-badge">
            <span>National Talent Search · Classes 6–11</span>
          </div>
          <h1 className="vvm-hero-title">
            Vidyarthi Vigyan Manthan (VVM) Preparation Hub
            <span className="vvm-hero-title-sa">विद्यार्थी विज्ञान मंथन २०२६-२०२७</span>
          </h1>
          <p className="vvm-hero-lead">
            India’s largest national science talent search exam jointly organized by <strong>Vijnana Bharati (VIBHA)</strong> in association with <strong>Vigyan Prasar (DST, Govt. of India)</strong> and <strong>NCERT</strong>. EdNet Learn provides comprehensive study modules bridging Indian scientific heritage, biographies of Indian scientists, and interactive NCERT science simulations.
          </p>

          <div className="vvm-hero-metrics">
            <div className="vvm-metric-card">
              <div className="vvm-metric-value">100 MCQs</div>
              <div className="vvm-metric-label">100 Marks · 90 Minutes</div>
            </div>
            <div className="vvm-metric-card">
              <div className="vvm-metric-value">40% Heritage</div>
              <div className="vvm-metric-label">Indian Contributions &amp; Biographies</div>
            </div>
            <div className="vvm-metric-card">
              <div className="vvm-metric-value">60% Science</div>
              <div className="vvm-metric-label">NCERT Curriculum &amp; Logic</div>
            </div>
            <div className="vvm-metric-card">
              <div className="vvm-metric-value">13+ Languages</div>
              <div className="vvm-metric-label">Sanskrit, Hindi, English &amp; Regional</div>
            </div>
          </div>
        </header>

        {/* Nav Tabs */}
        <nav className="vvm-tabs-nav" aria-label="VVM Study Sections">
          <button
            type="button"
            className={`vvm-tab-btn${activeTab === 'blueprint' ? ' active' : ''}`}
            onClick={() => handleTabClick('blueprint')}
          >
            <span>Exam Blueprint</span>
            <span className="vvm-tab-badge">Level 1</span>
          </button>
          <button
            type="button"
            className={`vvm-tab-btn${activeTab === 'heritage' ? ' active' : ''}`}
            onClick={() => handleTabClick('heritage')}
          >
            <span>Indian Science Heritage</span>
            <span className="vvm-tab-badge">20%</span>
          </button>
          <button
            type="button"
            className={`vvm-tab-btn${activeTab === 'scientists' ? ' active' : ''}`}
            onClick={() => handleTabClick('scientists')}
          >
            <span>Indian Scientists</span>
            <span className="vvm-tab-badge">20%</span>
          </button>
          <button
            type="button"
            className={`vvm-tab-btn${activeTab === 'ncert' ? ' active' : ''}`}
            onClick={() => handleTabClick('ncert')}
          >
            <span>NCERT Science &amp; Maths</span>
            <span className="vvm-tab-badge">50%</span>
          </button>
          <button
            type="button"
            className={`vvm-tab-btn${activeTab === 'logic' ? ' active' : ''}`}
            onClick={() => handleTabClick('logic')}
          >
            <span>Logic &amp; Reasoning</span>
            <span className="vvm-tab-badge">10%</span>
          </button>
          <button
            type="button"
            className={`vvm-tab-btn${activeTab === 'quiz' ? ' active' : ''}`}
            onClick={() => handleTabClick('quiz')}
          >
            <span>30-Q Mock Test</span>
            <span className="vvm-tab-badge">{answeredCount}/{VVM_QUIZ_QUESTIONS.length}</span>
          </button>
          <button
            type="button"
            className={`vvm-tab-btn${activeTab === 'journey' ? ' active' : ''}`}
            onClick={() => handleTabClick('journey')}
          >
            <span>Competition Stages &amp; Awards</span>
          </button>
        </nav>

        {/* TAB 1: BLUEPRINT */}
        {activeTab === 'blueprint' && (
          <section className="vvm-section" aria-labelledby="bp-heading">
            <div className="vvm-section-header">
              <div className="vvm-section-kicker">Official Level-1 Structure</div>
              <h2 id="bp-heading" className="vvm-section-title">VVM Exam Pattern &amp; Weightage Blueprint</h2>
              <p className="vvm-section-desc">
                The school-level examination (Level 1) is conducted on a dedicated digital mobile/desktop app. It consists of two timed sections with negative marking safeguards.
              </p>
            </div>

            <div className="vvm-blueprint-grid">
              <div className="vvm-blueprint-card vvm-blueprint-card--a">
                <div className="vvm-blueprint-card-head">
                  <span className="vvm-bp-tag vvm-bp-tag--a">Section A</span>
                  <span className="vvm-bp-weight">40 Marks · 30 Mins</span>
                </div>
                <h3>Indian Heritage &amp; Scientist Biographies</h3>
                <ul className="vvm-blueprint-sublist">
                  <li className="vvm-blueprint-subitem">
                    <span className="vvm-subitem-badge">20 Questions</span>
                    <div className="vvm-subitem-text">
                      <strong>Indian Contributions to Science (20%)</strong>
                      <span>From Vedic astronomy and metallurgy to traditional medicine and architecture.</span>
                    </div>
                  </li>
                  <li className="vvm-blueprint-subitem">
                    <span className="vvm-subitem-badge">20 Questions</span>
                    <div className="vvm-subitem-text">
                      <strong>Life Stories of Eminent Indian Scientists (20%)</strong>
                      <span>Special study booklets released by VIBHA (e.g. Anna Mani, Asima Chatterjee, Rohini Godbole).</span>
                    </div>
                  </li>
                </ul>
                <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0 }}>
                  <em>Note: Section A closes after 30 minutes; students cannot return to Section A once Section B begins.</em>
                </p>
              </div>

              <div className="vvm-blueprint-card vvm-blueprint-card--b">
                <div className="vvm-blueprint-card-head">
                  <span className="vvm-bp-tag vvm-bp-tag--b">Section B</span>
                  <span className="vvm-bp-weight">60 Marks · 60 Mins</span>
                </div>
                <h3>NCERT Curriculum &amp; Analytical Reasoning</h3>
                <ul className="vvm-blueprint-sublist">
                  <li className="vvm-blueprint-subitem">
                    <span className="vvm-subitem-badge">50 Questions</span>
                    <div className="vvm-subitem-text">
                      <strong>NCERT Science and Mathematics (50%)</strong>
                      <span>Questions tailored to the student&apos;s registered class level (Classes 6 to 11).</span>
                    </div>
                  </li>
                  <li className="vvm-blueprint-subitem">
                    <span className="vvm-subitem-badge">10 Questions</span>
                    <div className="vvm-subitem-text">
                      <strong>Logic and Analytical Reasoning (10%)</strong>
                      <span>Series completion, spatial deduction, patterns, and mathematical reasoning.</span>
                    </div>
                  </li>
                </ul>
                <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0 }}>
                  <em>Total Exam: 100 Objective Questions · 100 Marks · 90 Minutes Total Duration.</em>
                </p>
              </div>
            </div>

            {/* 30-Question VVM Mock Test Engine Blueprint */}
            <div className="vvm-blueprint-card" style={{ marginTop: '1.5rem', background: '#ffffff', border: '1.5px solid #2dd4bf' }}>
              <div className="vvm-blueprint-card-head">
                <span className="vvm-bp-tag vvm-bp-tag--a">EdNet Practice Engine</span>
                <span className="vvm-bp-weight">30 Questions · 120 Marks · 30 Mins</span>
              </div>
              <h3 style={{ margin: '0.35rem 0 0.5rem', color: '#0f766e' }}>The 30-Question VVM Mini-Mock Blueprint</h3>
              <p style={{ fontSize: '0.86rem', color: '#334155', margin: '0 0 1rem', lineHeight: 1.5 }}>
                Configured strictly to mirror the real VVM Level-I exam structure, marking scheme, and qualification thresholds:
              </p>

              <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
                  <thead>
                    <tr style={{ background: '#f0fdfa', borderBottom: '2px solid #14b8a6', textAlign: 'left', color: '#0f766e' }}>
                      <th style={{ padding: '0.55rem 0.75rem' }}>Mock Section</th>
                      <th style={{ padding: '0.55rem 0.75rem' }}>Topic Area</th>
                      <th style={{ padding: '0.55rem 0.75rem' }}>Questions</th>
                      <th style={{ padding: '0.55rem 0.75rem' }}>Marks</th>
                      <th style={{ padding: '0.55rem 0.75rem' }}>Negative Marking</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '0.55rem 0.75rem' }}><strong>Part A (Qualifier)</strong></td>
                      <td style={{ padding: '0.55rem 0.75rem' }}>Indian Contributions to Science</td>
                      <td style={{ padding: '0.55rem 0.75rem' }}>6 Qs</td>
                      <td style={{ padding: '0.55rem 0.75rem' }}>24 Marks</td>
                      <td style={{ padding: '0.55rem 0.75rem', color: '#166534' }}>None (0)</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '0.55rem 0.75rem' }}><strong>Part A (Qualifier)</strong></td>
                      <td style={{ padding: '0.55rem 0.75rem' }}>Tri-Shakti Biographies (Mani, Chatterjee, Godbole)</td>
                      <td style={{ padding: '0.55rem 0.75rem' }}>6 Qs</td>
                      <td style={{ padding: '0.55rem 0.75rem' }}>24 Marks</td>
                      <td style={{ padding: '0.55rem 0.75rem', color: '#166534' }}>None (0)</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '0.55rem 0.75rem' }}><strong>Part B (Core)</strong></td>
                      <td style={{ padding: '0.55rem 0.75rem' }}>NCERT Science &amp; Mathematics (Class-Specific)</td>
                      <td style={{ padding: '0.55rem 0.75rem' }}>15 Qs</td>
                      <td style={{ padding: '0.55rem 0.75rem' }}>60 Marks</td>
                      <td style={{ padding: '0.55rem 0.75rem', color: '#dc2626' }}>-1 Mark per wrong answer</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '0.55rem 0.75rem' }}><strong>Part B (Core)</strong></td>
                      <td style={{ padding: '0.55rem 0.75rem' }}>Logic &amp; Reasoning</td>
                      <td style={{ padding: '0.55rem 0.75rem' }}>3 Qs</td>
                      <td style={{ padding: '0.55rem 0.75rem' }}>12 Marks</td>
                      <td style={{ padding: '0.55rem 0.75rem', color: '#dc2626' }}>-1 Mark per wrong answer</td>
                    </tr>
                    <tr style={{ background: '#f8fafc', fontWeight: 800, color: '#0f172a' }}>
                      <td style={{ padding: '0.65rem 0.75rem' }}>Total</td>
                      <td style={{ padding: '0.65rem 0.75rem' }}>Full 30-Minute Mini-Mock</td>
                      <td style={{ padding: '0.65rem 0.75rem' }}>30 Qs</td>
                      <td style={{ padding: '0.65rem 0.75rem' }}>120 Marks</td>
                      <td style={{ padding: '0.65rem 0.75rem' }}>Part B evaluated only if Part A ≥ 50%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style={{ background: '#fef3c7', border: '1px solid #fde68a', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '0.82rem', color: '#92400e', lineHeight: 1.5 }}>
                <strong>VVM Section A Qualifier Rule:</strong> Part B is evaluated only if a student scores at least 50% in Part A (minimum 24 out of 48 marks in Indian Contributions &amp; Tri-Shakti Biographies). No negative marking in Part A encourages full attempt of heritage questions!
              </div>
            </div>

            <div className="vvm-ncert-callout">
              <div className="vvm-ncert-callout-text">
                <h4>Registered Student Cohorts</h4>
                <p>
                  <strong>Junior Group:</strong> Classes 6, 7, and 8 (NCERT syllabus up to current class level).<br />
                  <strong>Senior Group:</strong> Classes 9, 10, and 11 (Foundational physics, chemistry, biology &amp; mathematics).
                </p>
              </div>
              <button
                type="button"
                className="vvm-heritage-lab-btn"
                style={{ width: 'auto' }}
                onClick={() => setActiveTab('quiz')}
              >
                <span>Take VVM Practice Test →</span>
              </button>
            </div>
          </section>
        )}

        {/* TAB 2: HERITAGE */}
        {activeTab === 'heritage' && (
          <section className="vvm-section" aria-labelledby="heritage-heading">
            <div className="vvm-section-header">
              <div className="vvm-section-kicker">Section A Study Guide (20% Weightage)</div>
              <h2 id="heritage-heading" className="vvm-section-title">Indian Contributions to Science (ICS)</h2>
              <p className="vvm-section-desc">
                Key concepts and historical scientific milestones detailed in the official VIBHA study material. Explore these hands-on through EdNet’s interactive labs.
              </p>
            </div>

            <div className="vvm-heritage-grid">
              <div className="vvm-heritage-card">
                <div className="vvm-heritage-card-top">
                  <span className="vvm-heritage-domain">Physics &amp; Atomism</span>
                  <span className="vvm-subitem-badge">Vaiśeṣika</span>
                </div>
                <h4>Acharya Kanada &amp; Paramaṇu Theory</h4>
                <p>
                  Kanada postulated that the material universe is formed of indivisible, eternal particles called <em>Paramāṇu</em>. Two paramāṇus form a <em>dvyaṇuka</em> (dyad), and three dyads combine to form a <em>tryaṇuka</em> (triad), which is perceptible by the senses.
                </p>
                <div className="vvm-heritage-takeaway">
                  <strong>Key VVM Point:</strong> Pre-dates Democritus and Dalton; classified 9 basic substances (Dravyas) including space (Ākāśa) and time (Kāla).
                </div>
                {onOpenScienceLab && (
                  <button type="button" className="vvm-heritage-lab-btn" onClick={() => onOpenScienceLab('paramanu')}>
                    Launch Paramanu Simulation →
                  </button>
                )}
              </div>

              <div className="vvm-heritage-card">
                <div className="vvm-heritage-card-top">
                  <span className="vvm-heritage-domain">Metallurgy</span>
                  <span className="vvm-subitem-badge">Rasashastra</span>
                </div>
                <h4>Delhi Iron Pillar &amp; Wootz Crucible Steel</h4>
                <p>
                  The 4th-century CE Iron Pillar of Delhi (weighing over 6 tonnes) resists corrosion due to a thin catalytic film of <em>misawite</em> formed by ancient forge-welding of high-phosphorus bloomery iron. Southern India pioneered Wootz crucible steel (<em>Ukku</em>), globally prized for legendary Damascus blades.
                </p>
                <div className="vvm-heritage-takeaway">
                  <strong>Key VVM Point:</strong> Demonstrates advanced smelting, lack of corrosive sulfur/manganese, and crucible temperature control above 1400°C.
                </div>
                {onOpenIks && (
                  <button type="button" className="vvm-heritage-lab-btn" onClick={onOpenIks}>
                    Explore Wootz &amp; Patina Labs →
                  </button>
                )}
              </div>

              <div className="vvm-heritage-card">
                <div className="vvm-heritage-card-top">
                  <span className="vvm-heritage-domain">Surgery &amp; Medicine</span>
                  <span className="vvm-subitem-badge">Āyurveda</span>
                </div>
                <h4>Sushruta Saṁhitā &amp; Surgical Science</h4>
                <p>
                  Acharya Sushruta is recognized as the Father of Surgery. His treatise describes over 120 precision surgical tools (Yantras &amp; Śastras), dissection on cadavers, cataract couching, kidney stone extraction, and the world’s first forehead-flap rhinoplasty.
                </p>
                <div className="vvm-heritage-takeaway">
                  <strong>Key VVM Point:</strong> Charaka focused on internal medicine (Kāyacikitsā) and Tridosha balance; Sushruta specialized in surgery (Śalyatantra).
                </div>
                {onOpenIks && (
                  <button type="button" className="vvm-heritage-lab-btn" onClick={onOpenIks}>
                    View Susruta Surgical Kit Lab →
                  </button>
                )}
              </div>

              <div className="vvm-heritage-card">
                <div className="vvm-heritage-card-top">
                  <span className="vvm-heritage-domain">Astronomy</span>
                  <span className="vvm-subitem-badge">Jyotiṣa</span>
                </div>
                <h4>Aryabhata, Varahamihira &amp; Bhaskara</h4>
                <p>
                  Aryabhata (476 CE) calculated the solar year to 365.258 days, proved Earth’s axial rotation, and determined π ≈ 3.1416. Bhaskaracharya (1150 CE) in <em>Siddhānta Śiromaṇi</em> described gravity as an attractive force (<em>Ākarṣaṇa Śakti</em>) keeping the planets in orbital balance.
                </p>
                <div className="vvm-heritage-takeaway">
                  <strong>Key VVM Point:</strong> Eclipses were explained scientifically as lunar and terrestrial shadows, debunking mythical Rahu-Ketu consumption.
                </div>
                {onOpenIks && (
                  <button type="button" className="vvm-heritage-lab-btn" onClick={onOpenIks}>
                    Explore Konark Solar Lab →
                  </button>
                )}
              </div>

              <div className="vvm-heritage-card">
                <div className="vvm-heritage-card-top">
                  <span className="vvm-heritage-domain">Mathematics</span>
                  <span className="vvm-subitem-badge">Śulba Sūtras</span>
                </div>
                <h4>Geometry of Altars &amp; Kerala Calculus</h4>
                <p>
                  Baudhayana’s Śulba Sūtra (c. 800 BCE) enunciated the diagonal theorem (known later as the Pythagorean theorem) for fire altars. In the 14th century, Madhava of Kerala derived infinite series for π, sine, and cosine 250 years before Western calculus.
                </p>
                <div className="vvm-heritage-takeaway">
                  <strong>Key VVM Point:</strong> Ancient India contributed zero (Śūnya), decimal place-value, and algebraic indeterminate equations (Kuṭṭaka).
                </div>
                {onOpenVedicMaths && (
                  <button type="button" className="vvm-heritage-lab-btn" onClick={onOpenVedicMaths}>
                    Launch Vedic Maths Studio →
                  </button>
                )}
              </div>

              <div className="vvm-heritage-card">
                <div className="vvm-heritage-card-top">
                  <span className="vvm-heritage-domain">Civil Engineering</span>
                  <span className="vvm-subitem-badge">Vāstu &amp; Hydrology</span>
                </div>
                <h4>Harappan Town Planning &amp; Stepwells</h4>
                <p>
                  The Indus-Saraswati civilization at Dholavira and Mohenjo-daro featured sophisticated covered drainage, standardized burnt bricks in 1:2:4 ratio, Lothal tidal dockyard with lock gates, and cascading stepwells (Baolis) for arid rainwater harvesting.
                </p>
                <div className="vvm-heritage-takeaway">
                  <strong>Key VVM Point:</strong> Demonstrates early standardization of weights/measures, grid civil planning, and conservation hydrology.
                </div>
                {onOpenIks && (
                  <button type="button" className="vvm-heritage-lab-btn" onClick={onOpenIks}>
                    Explore Stepwell Water Lab →
                  </button>
                )}
              </div>
            </div>
          </section>
        )}

        {/* TAB 3: SCIENTISTS */}
        {activeTab === 'scientists' && (
          <section className="vvm-section" aria-labelledby="scientists-heading">
            <div className="vvm-section-header">
              <div className="vvm-section-kicker">Section A Qualifier (20% Weightage)</div>
              <h2 id="scientists-heading" className="vvm-section-title">Tri-Shakti: Featured Indian Women Scientists (VVM 2026–27)</h2>
              <p className="vvm-section-desc">
                Dive into the inspiring life journeys and research milestones of the three featured Indian women scientists for VVM 2026–27: Dr. Anna Mani (The Weather Woman of India), Dr. Asima Chatterjee (Organic Chemistry &amp; Phytomedicine), and Prof. Rohini Godbole (Theoretical Particle Physics &amp; CERN LHC Higgs Boson).
              </p>
            </div>

            <div className="vvm-scientists-grid">
              <div className="vvm-scientist-card">
                <div className="vvm-scientist-header">
                  <h3 className="vvm-scientist-name">Anna Mani</h3>
                  <div className="vvm-scientist-dates">1918 – 2001 · Atmospheric Physics &amp; Instrumentation</div>
                </div>
                <div className="vvm-scientist-field">Deputy Director General, India Meteorological Department (IMD)</div>
                <p className="vvm-scientist-desc">
                  A pioneer who worked with C.V. Raman studying spectroscopy of diamonds. At IMD Pune, she standardized and indigenously manufactured over 100 weather instruments, designed the ozonesonde for upper atmospheric ozone measurement, and mapped India&apos;s solar/wind energy resources.
                </p>
                <div className="vvm-scientist-milestones">
                  <strong>VVM Exam Focus:</strong>
                  Indigenous weather instruments · Ozonesonde · Solar radiation handbooks · Women in STEM leadership.
                </div>
              </div>

              <div className="vvm-scientist-card">
                <div className="vvm-scientist-header">
                  <h3 className="vvm-scientist-name">Dr. Asima Chatterjee</h3>
                  <div className="vvm-scientist-dates">1917 – 2006 · Organic Chemistry &amp; Phytomedicine</div>
                </div>
                <div className="vvm-scientist-field">Calcutta University · First Indian Woman D.Sc.</div>
                <p className="vvm-scientist-desc">
                  Pioneered natural products chemistry, investigating vinca alkaloids, coumarins, and terpenoids. She formulated the Ayurvedic anti-epileptic drug <em>Ayush-56</em> from Marsilea quadrifolia and developed clinically effective anti-malarial compounds.
                </p>
                <div className="vvm-scientist-milestones">
                  <strong>VVM Exam Focus:</strong>
                  Ayush-56 formulation · Alkaloid isolation · First woman president of Indian Science Congress Association (1975).
                </div>
              </div>

              <div className="vvm-scientist-card">
                <div className="vvm-scientist-header">
                  <h3 className="vvm-scientist-name">Prof. Rohini Godbole</h3>
                  <div className="vvm-scientist-dates">1952 – 2024 · Theoretical Particle Physics</div>
                </div>
                <div className="vvm-scientist-field">Centre for High Energy Physics, IISc Bengaluru</div>
                <p className="vvm-scientist-desc">
                  An internationally acclaimed particle theorist who worked on the Standard Model, supersymmetry, and top quark physics. Her computations guided experimental searches at the Large Hadron Collider (CERN), leading to the discovery of the Higgs boson.
                </p>
                <div className="vvm-scientist-milestones">
                  <strong>VVM Exam Focus:</strong>
                  Higgs boson search phenomenology · Linear Collider physics · Padma Shri (2019) · Champion of gender equity in science.
                </div>
              </div>

              <div className="vvm-scientist-card">
                <div className="vvm-scientist-header">
                  <h3 className="vvm-scientist-name">Jagadish Chandra Bose</h3>
                  <div className="vvm-scientist-dates">1858 – 1937 · Biophysics &amp; Wireless Telecommunications</div>
                </div>
                <div className="vvm-scientist-field">Founder, Bose Institute Kolkata</div>
                <p className="vvm-scientist-desc">
                  Pioneer of 60 GHz millimetre waves, horn antennas, and semiconductor crystal detectors. He invented the <em>Crescograph</em>, measuring microscopic plant growth and demonstrating that plant tissues possess electrical response mechanisms similar to animal nervous systems.
                </p>
                <div className="vvm-scientist-milestones">
                  <strong>VVM Exam Focus:</strong>
                  Galena crystal receiver · Millimetre waves · Crescograph · Refusal to patent discoveries (open science advocate).
                </div>
              </div>

              <div className="vvm-scientist-card">
                <div className="vvm-scientist-header">
                  <h3 className="vvm-scientist-name">Sir C.V. Raman</h3>
                  <div className="vvm-scientist-dates">1888 – 1970 · Optical Physics</div>
                </div>
                <div className="vvm-scientist-field">Nobel Prize in Physics (1930) · Bharat Ratna (1954)</div>
                <p className="vvm-scientist-desc">
                  Discovered the Raman Effect on February 28, 1928, showing that photons scattered by transparent molecules undergo changes in frequency corresponding to molecular vibration states. This established Raman spectroscopy, used globally in chemistry, pharmaceuticals, and materials science.
                </p>
                <div className="vvm-scientist-milestones">
                  <strong>VVM Exam Focus:</strong>
                  Raman Effect · National Science Day (Feb 28) · First Asian scientist to win a Nobel Prize in science.
                </div>
              </div>

              <div className="vvm-scientist-card">
                <div className="vvm-scientist-header">
                  <h3 className="vvm-scientist-name">Prof. Meghnad Saha</h3>
                  <div className="vvm-scientist-dates">1893 – 1956 · Astrophysics &amp; Nuclear Physics</div>
                </div>
                <div className="vvm-scientist-field">Founder, Saha Institute of Nuclear Physics</div>
                <p className="vvm-scientist-desc">
                  Formulated the Saha Ionization Equation (1920), which correlates the degree of thermal ionization in stars with temperature and pressure. This equation unlocked modern astrophysics by enabling scientists to determine the temperature, pressure, and chemical composition of distant stars.
                </p>
                <div className="vvm-scientist-milestones">
                  <strong>VVM Exam Focus:</strong>
                  Saha Ionization Equation · Stellar spectroscopy · River valley project planning (Damodar Valley Corporation).
                </div>
              </div>

              <div className="vvm-scientist-card">
                <div className="vvm-scientist-header">
                  <h3 className="vvm-scientist-name">Satyendra Nath Bose</h3>
                  <div className="vvm-scientist-dates">1894 – 1974 · Quantum Mechanics &amp; Mathematical Physics</div>
                </div>
                <div className="vvm-scientist-field">University of Calcutta &amp; Dhaka University</div>
                <p className="vvm-scientist-desc">
                  Derived Planck’s quantum radiation law without reference to classical electrodynamics, founding Bose-Einstein statistics. Albert Einstein extended his paper to predict the Bose-Einstein Condensate (BEC). In his honour, all particles with integer spin are named <em>Bosons</em>.
                </p>
                <div className="vvm-scientist-milestones">
                  <strong>VVM Exam Focus:</strong>
                  Bose-Einstein Statistics · Bosons (named by Paul Dirac) · Bose-Einstein Condensate (5th state of matter).
                </div>
              </div>

              <div className="vvm-scientist-card">
                <div className="vvm-scientist-header">
                  <h3 className="vvm-scientist-name">Homi Jehangir Bhabha</h3>
                  <div className="vvm-scientist-dates">1909 – 1966 · Nuclear &amp; Cosmic Ray Physics</div>
                </div>
                <div className="vvm-scientist-field">Father of the Indian Nuclear Program · Founder, TIFR &amp; BARC</div>
                <p className="vvm-scientist-desc">
                  Pioneered research on electron-positron scattering (Bhabha Scattering) and formulated India’s strategic three-stage nuclear power program to utilize the nation’s vast monazite thorium reserves in fast breeder reactors.
                </p>
                <div className="vvm-scientist-milestones">
                  <strong>VVM Exam Focus:</strong>
                  Bhabha Scattering · Three-stage nuclear energy blueprint · Establishment of TIFR and Atomic Energy Commission.
                </div>
              </div>

              <div className="vvm-scientist-card">
                <div className="vvm-scientist-header">
                  <h3 className="vvm-scientist-name">Srinivasa Ramanujan</h3>
                  <div className="vvm-scientist-dates">1887 – 1920 · Pure Mathematics &amp; Number Theory</div>
                </div>
                <div className="vvm-scientist-field">Fellow of the Royal Society · Trinity College Cambridge</div>
                <p className="vvm-scientist-desc">
                  Discovered nearly 3,900 mathematical identities, infinite series for 1/π, partition formulas with G.H. Hardy, and mock theta functions. His work continues to inspire modern breakthroughs in string theory, black hole physics, and crystallography.
                </p>
                <div className="vvm-scientist-milestones">
                  <strong>VVM Exam Focus:</strong>
                  National Mathematics Day (Dec 22) · Ramanujan-Hardy taxi number 1729 (1³ + 12³ = 9³ + 10³) · Partition function.
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB 4: NCERT BRIDGES */}
        {activeTab === 'ncert' && (
          <section className="vvm-section" aria-labelledby="ncert-heading">
            <div className="vvm-section-header">
              <div className="vvm-section-kicker">Section B Study Guide (50% Weightage)</div>
              <h2 id="ncert-heading" className="vvm-section-title">NCERT Science &amp; Mathematics Modules</h2>
              <p className="vvm-section-desc">
                Section B accounts for half of your total score. Prepare key NCERT Class 6–10 concepts through EdNet Learn’s interactive virtual laboratories.
              </p>
            </div>

            <div className="vvm-ncert-callout">
              <div className="vvm-ncert-callout-text">
                <h4>Hands-On Experimentation Beats Rote Memorization</h4>
                <p>
                  VVM test questions evaluate conceptual clarity, variable manipulation, and experimental observations. Test your hypotheses using these 6 high-yield simulation labs:
                </p>
              </div>
            </div>

            <div className="vvm-ncert-grid">
              <div className="vvm-sim-card">
                <span className="vvm-sim-card-tag">Physics · Class 7–10</span>
                <h5>Ray Optics &amp; Prism Dispersion</h5>
                <p>Experiment with reflection, refraction, focal length, convex/concave lens image formation, and Snell&apos;s law.</p>
                {onOpenScienceLab && (
                  <button type="button" className="vvm-sim-link-btn" onClick={() => onOpenScienceLab('optics')}>
                    Open Optics Lab →
                  </button>
                )}
              </div>

              <div className="vvm-sim-card">
                <span className="vvm-sim-card-tag">Physics · Class 9</span>
                <h5>Simple Pendulum &amp; Gravitation</h5>
                <p>Explore periodic motion, time period T = 2π√(L/g), amplitude independence, and gravity variations.</p>
                {onOpenScienceLab && (
                  <button type="button" className="vvm-sim-link-btn" onClick={() => onOpenScienceLab('pendulum')}>
                    Open Pendulum Lab →
                  </button>
                )}
              </div>

              <div className="vvm-sim-card">
                <span className="vvm-sim-card-tag">Physics · Class 10</span>
                <h5>Ohm&apos;s Law &amp; Circuit Resistors</h5>
                <p>Verify V = I · R with virtual ammeters and voltmeters. Configure series and parallel resistor networks.</p>
                {onOpenScienceLab && (
                  <button type="button" className="vvm-sim-link-btn" onClick={() => onOpenScienceLab('ohm')}>
                    Open Ohm&apos;s Law Lab →
                  </button>
                )}
              </div>

              <div className="vvm-sim-card">
                <span className="vvm-sim-card-tag">Chemistry · Class 7 &amp; 10</span>
                <h5>Acids, Bases &amp; pH Indicator Scale</h5>
                <p>Titrate strong/weak acids and bases. Observe colour transitions with litmus, methyl orange, and phenolphthalein.</p>
                {onOpenScienceLab && (
                  <button type="button" className="vvm-sim-link-btn" onClick={() => onOpenScienceLab('ph-titration')}>
                    Open pH Titration Lab →
                  </button>
                )}
              </div>

              <div className="vvm-sim-card">
                <span className="vvm-sim-card-tag">Physics · Class 9</span>
                <h5>Archimedes Buoyancy &amp; Density</h5>
                <p>Measure buoyant upthrust, fluid displacement, relative density, and conditions for floating vs. sinking.</p>
                {onOpenScienceLab && (
                  <button type="button" className="vvm-sim-link-btn" onClick={() => onOpenScienceLab('buoyancy')}>
                    Open Buoyancy Lab →
                  </button>
                )}
              </div>

              <div className="vvm-sim-card">
                <span className="vvm-sim-card-tag">Mathematics · Class 6–10</span>
                <h5>Vedic Sutras &amp; Mental Mathematics</h5>
                <p>Master 16 Vedic calculation sutras (Ekādhikena Pūrveṇa, Ūrdhva Tiryagbhyām) for rapid mental multiplication.</p>
                {onOpenVedicMaths && (
                  <button type="button" className="vvm-sim-link-btn" onClick={onOpenVedicMaths}>
                    Open Vedic Maths Studio →
                  </button>
                )}
              </div>
            </div>

            {/* Class-wise NCERT Curriculum Roadmap */}
            <div className="vvm-ncert-roadmap" style={{ marginTop: '2.5rem' }}>
              <div className="vvm-section-header">
                <div className="vvm-section-kicker">Curriculum Mapping</div>
                <h3 className="vvm-section-title" style={{ fontSize: '1.45rem' }}>NCERT Class-Wise Science &amp; Mathematics Focus</h3>
                <p className="vvm-section-desc">
                  VVM questions are strictly aligned with your registered class level. Master these core themes from your NCERT science and maths textbooks:
                </p>
              </div>

              <div className="vvm-cohort-grid">
                <div className="vvm-cohort-card">
                  <div className="vvm-cohort-badge junior">Junior Group · Classes 6, 7 &amp; 8</div>
                  <ul className="vvm-cohort-topics">
                    <li><strong>Class 6:</strong> Motion &amp; Distances, Light, Shadows &amp; Reflections, Electricity &amp; Circuits, Components of Food, Living Organisms, Fractions &amp; Number Lines.</li>
                    <li><strong>Class 7:</strong> Heat &amp; Temperature, Acids, Bases &amp; Salts, Physical &amp; Chemical Changes, Motion &amp; Time, Electric Current &amp; Its Effects, Light, Plant Nutrition &amp; Respiration.</li>
                    <li><strong>Class 8:</strong> Force &amp; Pressure, Friction, Sound, Chemical Effects of Electric Current, Light &amp; Vision, Microorganisms, Algebraic Expressions &amp; Mensuration.</li>
                  </ul>
                </div>

                <div className="vvm-cohort-card">
                  <div className="vvm-cohort-badge senior">Senior Group · Classes 9, 10 &amp; 11</div>
                  <ul className="vvm-cohort-topics">
                    <li><strong>Class 9:</strong> Laws of Motion, Universal Gravitation, Work &amp; Energy, Sound, Matter in Our Surroundings, Atoms &amp; Molecules, Cell &amp; Tissues, Number Systems, Polynomials.</li>
                    <li><strong>Class 10:</strong> Light Reflection &amp; Refraction, Human Eye, Electricity, Magnetic Effects, Chemical Reactions, Carbon Compounds, Life Processes, Control &amp; Coordination, Heredity.</li>
                    <li><strong>Class 11:</strong> Units &amp; Dimensions, Kinematics, Laws of Motion, Work Energy &amp; Power, Thermodynamics, Atomic Structure, Chemical Bonding, Cell Biology, Coordinate Geometry.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Official Study Material Download Reference */}
            <div className="vvm-official-downloads-box">
              <div className="vvm-odb-header">
                <h4>Official VVM 2026–27 Study Resources &amp; Booklets</h4>
                <p>
                  VIBHA provides dedicated preparation booklets for Section A in digital format on the official registration portal.
                </p>
              </div>
              <div className="vvm-odb-grid">
                <div className="vvm-odb-item">
                  <strong>1. Indian Contributions to Science (ICS)</strong>
                  <span>Official text compiled by VIBHA covering ancient to modern Indian scientific heritage.</span>
                  <a href="https://vvm.org.in/" target="_blank" rel="noopener noreferrer" className="vvm-odb-link">
                    Download from vvm.org.in ↗
                  </a>
                </div>
                <div className="vvm-odb-item">
                  <strong>2. Life Stories of Eminent Indian Scientists</strong>
                  <span>Dedicated booklets on Anna Mani, Asima Chatterjee, and contemporary pioneers.</span>
                  <a href="https://vvm.org.in/" target="_blank" rel="noopener noreferrer" className="vvm-odb-link">
                    Download from vvm.org.in ↗
                  </a>
                </div>
                <div className="vvm-odb-item">
                  <strong>3. VVM Dedicated Exam Mobile App</strong>
                  <span>App available on Android Play Store and iOS for Mock practice and final exam.</span>
                  <a href="https://vvm.org.in/" target="_blank" rel="noopener noreferrer" className="vvm-odb-link">
                    Get App Instructions ↗
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB 5: LOGIC */}
        {activeTab === 'logic' && (
          <section className="vvm-section" aria-labelledby="logic-heading">
            <div className="vvm-section-header">
              <div className="vvm-section-kicker">Section B Study Guide (10% Weightage)</div>
              <h2 id="logic-heading" className="vvm-section-title">Logic &amp; Analytical Reasoning Guide</h2>
              <p className="vvm-section-desc">
                Section B includes 10 questions testing spatial, analytical, and relational logic. Master the fundamental patterns asked in VVM exams.
              </p>
            </div>

            <div className="vvm-heritage-grid">
              <div className="vvm-heritage-card">
                <div className="vvm-heritage-card-top">
                  <span className="vvm-heritage-domain">Pattern Recognition</span>
                  <span className="vvm-subitem-badge">Series</span>
                </div>
                <h4>Number &amp; Letter Series Completion</h4>
                <p>
                  Look for prime number sequences, arithmetic differences with changing step sizes, alternating powers (n² + 1, n³ - 1), or Fibonacci-type recurrences where each term is the sum of preceding numbers.
                </p>
                <div className="vvm-heritage-takeaway">
                  <strong>Example:</strong> 2, 6, 12, 20, 30, <strong>42</strong> (Pattern: differences are +4, +6, +8, +10, +12).
                </div>
              </div>

              <div className="vvm-heritage-card">
                <div className="vvm-heritage-card-top">
                  <span className="vvm-heritage-domain">Spatial Deduction</span>
                  <span className="vvm-subitem-badge">Geometry</span>
                </div>
                <h4>Mirror Reflections &amp; Folded Paper</h4>
                <p>
                  In mirror images, left and right invert while vertical orientation stays unchanged. In water reflections, top and bottom invert while horizontal orientation stays fixed. Check asymmetry on letter shapes (P, R, F, S).
                </p>
                <div className="vvm-heritage-takeaway">
                  <strong>Example:</strong> Inverting dice faces: opposite sides of a standard die always sum to 7 (1 ↔ 6, 2 ↔ 5, 3 ↔ 4).
                </div>
              </div>

              <div className="vvm-heritage-card">
                <div className="vvm-heritage-card-top">
                  <span className="vvm-heritage-domain">Cryptic Encodings</span>
                  <span className="vvm-subitem-badge">Ciphers</span>
                </div>
                <h4>Letter Shifts &amp; Ancient Kaṭapayādi</h4>
                <p>
                  Coding problems frequently use Caesar shifts (+3, -2), reverse alphabet mappings (A ↔ Z, B ↔ Y), or historical Indian syllable-digit rules where consonants correspond to digits 0–9.
                </p>
                <div className="vvm-heritage-takeaway">
                  <strong>Example:</strong> If DELHI is coded as 4-5-12-8-9, then INDIA is 9-14-4-9-1 (alphabetical position).
                </div>
              </div>

              <div className="vvm-heritage-card">
                <div className="vvm-heritage-card-top">
                  <span className="vvm-heritage-domain">Relational Logic</span>
                  <span className="vvm-subitem-badge">Blood Relations</span>
                </div>
                <h4>Family Trees &amp; Direction Navigation</h4>
                <p>
                  Map direction problems on a Cartesian grid (+y North, -y South, +x East, -x West). For family relations, map generations on tiered horizontal levels and mark gender indicators (+ / -).
                </p>
                <div className="vvm-heritage-takeaway">
                  <strong>Tip:</strong> Always sketch vectors: walking East then turning left takes you North; turning right takes you South.
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB 6: MOCK QUIZ */}
        {activeTab === 'quiz' && (
          <section className="vvm-section" aria-labelledby="quiz-heading">
            <div className="vvm-section-header">
              <div className="vvm-section-kicker">Interactive Practice Test</div>
              <h2 id="quiz-heading" className="vvm-section-title">VVM 30-Question Diagnostic Mock Quiz</h2>
              <p className="vvm-section-desc">
                Test your knowledge across all four pillars: Indian Contributions to Science, Eminent Scientists, NCERT Principles, and Analytical Logic. Select an answer to reveal instant explanations.
              </p>
            </div>

            <div className="vvm-quiz-status-bar">
              <div>
                <strong>Answered:</strong> {answeredCount} / {VVM_QUIZ_QUESTIONS.length} Questions
              </div>
              <div className="vvm-quiz-score-pill">
                Current Score: {currentScore} / {VVM_QUIZ_QUESTIONS.length} ({answeredCount > 0 ? Math.round((currentScore / answeredCount) * 100) : 0}%)
              </div>
              {answeredCount > 0 && (
                <button type="button" className="vvm-quiz-reset-btn" onClick={handleResetQuiz}>
                  Reset Quiz ↺
                </button>
              )}
            </div>

            <div className="vvm-quiz-container">
              {VVM_QUIZ_QUESTIONS.map((q, idx) => {
                const userChoice = selectedAnswers[q.id];
                const isAnswered = userChoice !== undefined;

                return (
                  <div key={q.id} className="vvm-question-card">
                    <div className="vvm-q-meta">
                      <span className="vvm-q-category">{q.category}</span>
                      <span className="vvm-q-index">Question {idx + 1} of {VVM_QUIZ_QUESTIONS.length}</span>
                    </div>
                    <div className="vvm-q-text">{q.question}</div>

                    <div className="vvm-options-grid">
                      {q.options.map((opt, optIdx) => {
                        let btnClass = 'vvm-option-btn';
                        if (isAnswered) {
                          if (optIdx === q.correctIndex) {
                            btnClass += optIdx === userChoice ? ' selected-correct' : ' reveal-correct';
                          } else if (optIdx === userChoice) {
                            btnClass += ' selected-incorrect';
                          }
                        }

                        const optionLetters = ['A', 'B', 'C', 'D'];

                        return (
                          <button
                            key={opt}
                            type="button"
                            className={btnClass}
                            onClick={() => handleSelectAnswer(q.id, optIdx)}
                            disabled={isAnswered}
                          >
                            <span className="vvm-opt-letter">{optionLetters[optIdx]}</span>
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {isAnswered && (
                      <div className="vvm-q-explanation">
                        <strong>Explanation:</strong>
                        <span>{q.explanation}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* TAB 7: JOURNEY & AWARDS */}
        {activeTab === 'journey' && (
          <section className="vvm-section" aria-labelledby="journey-heading">
            <div className="vvm-section-header">
              <div className="vvm-section-kicker">Multi-Tier Competition Pathway</div>
              <h2 id="journey-heading" className="vvm-section-title">The 4-Stage VVM Competition Journey</h2>
              <p className="vvm-section-desc">
                From your school classroom to India’s premier atomic research centers and space laboratories.
              </p>
            </div>

            <div className="vvm-timeline">
              <div className="vvm-timeline-node">
                <span className="vvm-timeline-step-badge">Stage 1 · November</span>
                <h4>School-Level Examination (Level 1)</h4>
                <p>
                  Conducted digitally on the VVM mobile app or computer browser in school premises or home. Top 20 rankers from each class in every state qualify for the prestigious State Camp (minimum qualifying criteria apply).
                </p>
              </div>

              <div className="vvm-timeline-node">
                <span className="vvm-timeline-step-badge">Stage 2 · December – January</span>
                <h4>State Level Camp (Level 2 - SLC)</h4>
                <p>
                  A 2-day residential science camp featuring hands-on science experiments, analytical problem-solving, situational reasoning, and audio-visual challenges. Top 2 students from each class in each state qualify for the National Camp.
                </p>
              </div>

              <div className="vvm-timeline-node">
                <span className="vvm-timeline-step-badge">Stage 3 · May</span>
                <h4>National Camp (Level 3 - NLC)</h4>
                <p>
                  A 2-day mega science immersion hosted at premier scientific institutions (such as BARC Mumbai, IISc Bengaluru, or IITs). Students engage with distinguished scientists, undertake lab tasks, and are tested on creative innovation.
                </p>
              </div>

              <div className="vvm-timeline-node">
                <span className="vvm-timeline-step-badge">Stage 4 · Ongoing</span>
                <h4>Himalayan Darshan, Bhaskara Scholarships &amp; Mentorship</h4>
                <p>
                  National winners (Himalayans) receive substantial cash awards, the prestigious Bhaskara Scholarship, and exclusive 1-year research mentorship with exposure visits to DRDO, ISRO, CSIR, and national laboratories.
                </p>
              </div>
            </div>

            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <a
                href="https://vvm.org.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="vvm-topbar-portal-link"
                style={{ fontSize: '0.95rem', padding: '0.65rem 1.4rem' }}
              >
                <span>Visit Official VVM Portal (vvm.org.in) to Register ↗</span>
              </a>
            </div>
          </section>
        )}

      </div>
    </div>
  );
};

export default VvmPreparationPage;

