/**
 * भारतीय-गणित-परम्परा · The Living Tradition of Indian Mathematics
 * Comprehensive Chronological Lineage, Historiographical Disclaimer & Epistemological Framework
 *
 * Strictly zero emojis. Uses clean SVG / Unicode academic symbols and formatted mathematical typography.
 */

export interface HistoriographicalPrinciple {
  id: string;
  orderNumber: number;
  sanskritTitle: string;
  transliteration: string;
  englishTitle: string;
  tagline: string;
  coreThesis: string;
  detailedAnalysis: string[];
  historicalEvidences: string[];
  epistemicImpact: string;
}

export interface EpistemologicalDimension {
  id: string;
  dimensionNumber: number;
  title: string;
  sanskritConcept: string;
  westernApproachTitle: string;
  westernApproachDesc: string;
  indianApproachTitle: string;
  indianApproachDesc: string;
  keyDifferentiators: string[];
  pedagogicalImpact: string;
  illustrativeExample: {
    title: string;
    description: string;
    indianMethod: string;
    westernContrast: string;
  };
}

export interface SanskritVerse {
  sourceText: string;
  author: string;
  approxDate: string;
  verseDevanagari: string;
  verseIast: string;
  wordByWord: { sanskrit: string; iast: string; meaning: string }[];
  translation: string;
  mathematicalSignificance: string;
}

export interface MathematicalBreakthrough {
  id: string;
  title: string;
  sanskritTerm: string;
  modernEquivalent: string;
  description: string;
  formulaDisplay?: string;
  mathematicalDerivation?: string[];
  historicalSignificance: string;
}

export interface IndianMathEra {
  id: string;
  eraNumber: number;
  slug: string;
  titleSa: string;
  titleIast: string;
  titleEn: string;
  approxPeriod: string;
  centuryLabel: string;
  geographicCenters: string[];
  keyPolymaths: string[];
  primaryTexts: string[];
  overview: string;
  philosophicalContext: string;
  featuredVerse: SanskritVerse;
  breakthroughs: MathematicalBreakthrough[];
  epistemicEvolution: string;
  interactiveDemoId?: 'baudhayana' | 'pingala' | 'jaina' | 'bakhshali' | 'aryabhata' | 'bhaskara1' | 'brahmagupta' | 'mahavira' | 'bhaskara2' | 'narayana' | 'kerala' | 'ramanujan';
}

/**
 * SECTION 0: MANDATORY FOUNDATIONAL DISCLAIMER
 * Epistemic & Historiographical Framework on Textual Preservation vs Concept Antiquity
 */
export const INDIAN_MATH_DISCLAIMER = {
  headerSanskrit: '॥ कालक्रम-निर्णयः मौखिकपरम्परा च ॥',
  headerIast: 'Kālakrama-Nirṇayaḥ Maukhika-Paramparā Ca',
  headerEnglish: 'The Principle of Textual Preservation vs. Conceptual Origin',
  disclaimerNotice:
    'CRITICAL HISTORIOGRAPHICAL AXIOM: In evaluating the historical development of Indian mathematics, the chronological age of surviving physical manuscripts or their archaeological retrieval dates does NOT determine the origin date of the underlying mathematical concepts. Indian civilization sustained an unbroken, millenary oral and mnemonic culture (Śruti-Smṛti Paramparā) where scientific treatises, algorithmic formulas, and geometric theorems were composed in strict metrical Sanskrit verses and transmitted through living teacher-disciple lineages for centuries—and in some traditions millennia—before being committed to perishable physical materials. Extant palm-leaf (Tālapatra) and birch-bark (Bhūrjapatra) folios represent periodic manual recopyings necessitated by tropical decay, not the initial moment of intellectual discovery. Our objective is to chronicle the unbroken, organic continuity (Avicchinna-Paramparā) of Indian mathematical contributions, while contrasting its constructive, algorithmic epistemology with modern Western formal axiomatic systems.',
  fourPillars: [
    {
      id: 'oral-transmission',
      orderNumber: 1,
      sanskritTitle: 'मौखिक-परम्परा सूत्र-सङ्ग्रहश्च',
      transliteration: 'Maukhika-Paramparā Sūtra-Saṅgrahaśca',
      englishTitle: 'Mnemonic Orality & Sūtra Compression',
      tagline: 'Scientific knowledge was codified for mental recitation and rapid auditory recall long before parchment storage.',
      coreThesis:
        'Ancient Indian scientific treatises were deliberately formulated as metered mnemonic verses (Sūtras and Ślokas in meters like Anuṣṭubh, Āryā, and Śārdūlavikrīḍita) optimized for cognitive retention, audio recitation, and mental calculation without reliance on paper or apparatus.',
      detailedAnalysis: [
        'A mathematical or astronomical theorem was held in working memory across unbroken generations of Gurus and Śiṣyas. Written transcription was historically regarded as a secondary, auxiliary storage safeguard rather than the primary vehicle of learning.',
        'Western philological models that measure the birth of a science strictly by the carbon date of an unearthed physical manuscript systematically undercount the antiquity of oral mathematical lineages by several centuries or millennia.',
        'The extreme compression of Sūtras (brevity, unambiguous clarity, essence-only formulation) was engineered specifically so that a complete computational manual could be recited and cross-checked mentally in daily pedagogical practice.'
      ],
      historicalEvidences: [
        'The Baudhāyana Śulba Sūtra: Complex geometric altar constructions, Pythagorean triples, and irrational square root expansions were chanted as part of Vedic ritual geometry centuries before written compilation.',
        'Pāṇinian Generative Grammar (Aṣṭādhyāyī): A 4,000-rule algorithmic formal grammar memorized entirely through linked phonetic chains with embedded checksum markers.',
        'Āryabhaṭīya: All 121 verses containing spherical trigonometry, place-value tables, and planetary kinematic algorithms were recited verbatim by fifth-century students at Kusumapura.'
      ],
      epistemicImpact:
        'The date of an extant manuscript provides only a terminus ante quem (the latest possible date before which the theorem was already established), never an invention ceiling.'
    },
    {
      id: 'tropical-perishability',
      orderNumber: 2,
      sanskritTitle: 'तालपत्र-नाशशीलता पुनर्लेखन-चक्रञ्च',
      transliteration: 'Tālapatra-Nāśaśīlatā Punarlekhana-Cakrañca',
      englishTitle: 'Tropical Perishability & Cyclical Recopying',
      tagline: 'Organic plant media decay within a few centuries in monsoonal climates, requiring perpetual recopying cycles.',
      coreThesis:
        'Unlike the arid sands of Egypt or Mesopotamia where clay cuneiform tablets and stone stelae survived undisturbed for thousands of years, the primary Indian writing substrates were organic Tālapatra (palm leaves) and Bhūrjapatra (Himalayan birch bark), which naturally perish within 300 to 500 years in tropical monsoon humidity.',
      detailedAnalysis: [
        'High humidity, monsoonal rains, fungal mildew, and insect pests (silverfish and bookworms) destroyed organic leaves unless they were continuously hand-recopied by dedicated scribal lineages every few centuries.',
        'An extant palm-leaf manuscript bearing a scribal colophon of 1450 CE or 1600 CE almost invariably represents the latest surviving copy of a text whose original composition dates to the classical or ancient era.',
        'When political upheavals, foreign invasions, or famines broke the unbroken recopying chain in university centers (such as Nalanda, Vikramashila, or Valabhi), entire libraries of mathematical literature vanished, leaving only surviving citations in later secondary commentaries.'
      ],
      historicalEvidences: [
        'Kerala School manuscripts: Mathematical analysis treatises from Mādhava and Parameśvara were preserved through cyclical recopying in hereditary Brahmin illams (homes) across Malabar.',
        'The Bakhshālī Manuscript: Written on birch bark in cold, dry northern conditions near Peshawar, surviving by sheer environmental anomaly when tropical counterparts perished.',
        'Scribal colophons: Medieval manuscripts frequently include prayers asking readers to forgive copying slips caused by crumbling older leaf originals.'
      ],
      epistemicImpact:
        'Equating surviving paper/leaf age with conceptual origin commits an ecological category error, conflating botanical longevity with intellectual antiquity.'
    },
    {
      id: 'archaeological-floor',
      orderNumber: 3,
      sanskritTitle: 'कालसीमावादः (Terminus Ante Quem)',
      transliteration: 'Kālasīmāvādaḥ (Terminus Ante Quem)',
      englishTitle: 'Archaeological Floor vs. Invention Ceiling',
      tagline: 'Physical discovery marks the moment a concept was already deeply ubiquitous, not the moment it was conceived.',
      coreThesis:
        'In historical archaeology and philology, physical artifacts establish a terminus ante quem—an undeniable chronological floor proving that the mathematical method was already mature, recognized, and used in everyday practice by that date.',
      detailedAnalysis: [
        'When the Bakhshālī Manuscript folios were radiocarbon dated by Oxford University to between 224 and 383 CE, some modern popular accounts mistakenly labeled this the date when zero was invented.',
        'In historical fact, the Bakhshālī text is a routine, practical handbook for merchants containing arithmetic rules for profit, loss, barter, and interest. Routine everyday computational manuals never introduce novel theoretical breakthroughs; they use established standards.',
        'The presence of standardized dot-zero symbols and advanced fractional arithmetic in a practical merchant manual confirms that the decimal place-value system was deeply integrated into Indian society centuries before the manuscript was inscribed.'
      ],
      historicalEvidences: [
        'Bakhshālī Manuscript (3rd/4th century CE): Demonstrates established usage of the śūnya-bindu dot zero.',
        'Chaturbhuj Temple Inscription at Gwalior (876 CE): Explicitly records zero in land grants (270 cubits) and flower offerings (50 garlands), representing routine epigraphic administration, not a mathematical symposium.',
        'Baudhāyana Śulba Sūtra: Formulates Pythagorean triples as ancient tradition (iti vijñāyate - "so it is traditionally known"), explicitly acknowledging centuries of prior geometric mastery.'
      ],
      epistemicImpact:
        'Archaeological artifacts authenticate the minimum baseline of antiquity. The living intellectual tradition always precedes the surviving artifact.'
    },
    {
      id: 'unbroken-continuity',
      orderNumber: 4,
      sanskritTitle: 'अविच्छिन्न-परम्परा',
      transliteration: 'Avicchinna-Paramparā',
      englishTitle: 'The Unbroken Continuity of Indian Mathematics',
      tagline: 'A cumulative, self-revising scientific continuum spanning over three millennia across the subcontinent.',
      coreThesis:
        'Indian mathematics was not a series of accidental, isolated flashes of individual brilliance, but an unbroken, cumulative, highly rigorous scientific tradition in which successive masters systematically read, verified, critiqued, and generalized the works of their predecessors.',
      detailedAnalysis: [
        'Āryabhaṭa I (499 CE) built upon Vedic and Jaina computational foundations. Bhāskara I (629 CE) wrote detailed commentaries and refined sine algorithms. Brahmagupta (628 CE) formalized zero and negatives while critiquing planetary parameters.',
        'Mahāvīra (850 CE) advanced pure arithmetic and combinatorics. Bhāskara II (1150 CE) integrated these into the Chakravāla method and differential velocity calculations.',
        'The Kerala School (14th–16th century CE) extended Bhāskarācārya’s infinitesimal ideas into infinite series expansions for trigonometric functions and π, culminating in Jyeṣṭhadeva’s Yuktibhāṣā—the world’s first formal calculus treatise.'
      ],
      historicalEvidences: [
        'Direct textual lineages: Explicit commentary chains such as Āryabhaṭīyabhāṣya by Bhāskara I and Tantrasaṅgraha-vyākhyā by Nīlakaṇṭha.',
        'National geographic spread: Scientific centers flourished across Karnataka (Mahāvīra), Rajasthan/Gujarat (Brahmagupta), Maharashtra (Bhāskarācārya), Bihar (Āryabhaṭa), and Kerala (Mādhava).',
        'Modern continuity: Srinivasa Ramanujan’s modular equations and mock theta functions directly continue the intuitive combinatorial and series-expansion traditions of Indian masters.'
      ],
      epistemicImpact:
        'Understanding Indian mathematics requires tracing this unbroken evolutionary chain of ideas rather than viewing historical epochs in fragmented isolation.'
    }
  ] as HistoriographicalPrinciple[]
};

/**
 * SECTION 1: EPISTEMOLOGICAL & PHILOSOPHICAL COMPARATIVE FRAMEWORK
 * Deep Contrast: Ancient Indian Gaṇita vs. Modern Western Mathematics
 */
export const EPISTEMOLOGICAL_COMPARISONS: EpistemologicalDimension[] = [
  {
    id: 'epistemic-foundation',
    dimensionNumber: 1,
    title: 'Epistemic Foundation: Pramāṇa & Upapatti vs. Axiomatic Formalism',
    sanskritConcept: 'प्रमाण-शास्त्रम् उपपत्तिश्च · Pramāṇa-Śāstram Upapattiśca',
    westernApproachTitle: 'Euclidean & Hilbertian Axiomatic Deductivism',
    westernApproachDesc:
      'Truth is defined purely as formal deductive consistency within an arbitrary axiomatic system. Axioms are postulated without need for empirical or computational grounding. A theorem is valid if it avoids internal syntactic contradiction, irrespective of whether the mathematical objects correspond to observable physical reality or can be computed.',
    indianApproachTitle: 'Pramāṇa-Based Constructive Validation (Upapatti)',
    indianApproachDesc:
      'Mathematics is anchored in classical Indian epistemology (Nyāya-Vaiśeṣika Pramāṇa-śāstra). Validation requires Pratyakṣa (direct observation / perceptual evidence), Anumāna (rigorous logical inference), and Upapatti (demonstrative proof / algorithmic rationale). Proof is not an abstract axiomatic ceremony, but a demonstration intended to generate unshakeable conviction (Pratīti) and eliminate doubt (Saṃśaya-nivṛtti).',
    keyDifferentiators: [
      'Western proofs prioritize non-contradiction from arbitrary premises; Indian Upapatti prioritizes experiential conviction and constructive computational verifiability.',
      'Indian mathematics rejects purely formal axioms that lack physical or computational referents in nature (Ṛta).',
      'Upapatti frequently integrates geometric visual demonstrations (Kṣetra-gatôpapatti) with step-by-step arithmetic verification.'
    ],
    pedagogicalImpact:
      'Students in the Indian tradition learned by constructing and verifying algorithms themselves, rather than memorizing abstract deductive chains divorced from calculation.',
    illustrativeExample: {
      title: 'Validation of the Pythagorean Relationship',
      description: 'How the diagonal property of a right rectangle is established.',
      indianMethod:
        'Baudhāyana and Bhāskara II demonstrate the theorem through direct area rearrangement (Upapatti): dissecting squares into four congruent triangles and a central square, declaring "Paśya!" ("Behold!"). The visual geometry and algebraic area identity confirm each other directly.',
      westernContrast:
        'Euclid Book I, Proposition 47 constructs an intricate deductive proof utilizing 46 preceding axiomatic propositions, prioritizing deductive sequence over direct intuitive perception.'
    }
  },
  {
    id: 'objective-and-worldview',
    dimensionNumber: 2,
    title: 'Objective & Purpose: Cosmic Harmony & Utility vs. Pure Abstraction',
    sanskritConcept: 'ऋत-ज्ञानम् लाघवञ्च · Ṛta-Jñānam Lāghavañca',
    westernApproachTitle: 'Utilitarian Technoscience & Detached Formalism',
    westernApproachDesc:
      'Modern mathematics is split between pure structural classification (abstract mathematics pursued for intellectual aesthetic detachment) and applied technocratic engineering (industrial simulation, finance, military cryptography, game theory).',
    indianApproachTitle: 'Triple Purpose: Cosmic Alignment, Sacred Geometry, and Cognitive Economy',
    indianApproachDesc:
      'Mathematics served three integrated, sacred and practical aims: (1) Adhyātma & Kāla-Cakra (understanding cosmic time and celestial laws via Jyotiṣa), (2) Yajñaśālā Vāstu (sacred geometric transformations maintaining area invariants in altars), and (3) Lāghava (economy of thought and lightning mental computation).',
    keyDifferentiators: [
      'In India, studying mathematics was considered an act of discerning the underlying cosmic order (Ṛta) operating across the universe.',
      'Geometry was dynamic and transformational: converting circles to squares and squares to circles while rigorously conserving total area.',
      'Lāghava (parsimony and brevity) was revered: the shortest, most elegant computational route was actively sought to reduce human cognitive fatigue.'
    ],
    pedagogicalImpact:
      'Mathematics was never seen as dry or alienating; it was woven into astronomy, music, temple architecture, and spiritual philosophy.',
    illustrativeExample: {
      title: 'Sacred Altar Transformation (Śyena-citi)',
      description: 'Preserving area invariants across geometric transformations.',
      indianMethod:
        'The falcon-shaped fire altar (Śyena-citi) required an exact surface area of 7.5 square Puruṣas across five complex layers of bricks, demanding precise geometric transformations between squares, circles, trapezoids, and triangles without loss of area.',
      westernContrast:
        'Classical Greek geometry treated "squaring the circle" as an unsolvable theoretical dilemma with straightedge and compass, remaining largely detached from constructive brick-masonry applications.'
    }
  },
  {
    id: 'algorithmic-constructivism',
    dimensionNumber: 3,
    title: 'Methodology: Algorithmic Constructivism vs. Non-Constructive Existence',
    sanskritConcept: 'करणम् विधिः च · Karaṇam Vidhiḥ Ca',
    westernApproachTitle: 'Acceptance of Non-Constructive Existence Proofs',
    westernApproachDesc:
      'Standard Western mathematics freely accepts proofs by contradiction (Reductio ad Absurdum) that assert the existence of a mathematical object without providing any computational algorithm or recipe to produce or approximate it.',
    indianApproachTitle: 'Strict Algorithmic & Constructive Realism',
    indianApproachDesc:
      'Indian mathematics is uncompromisingly algorithmic (Karaṇa / Prakriyā). An existence claim is considered epistemologically vacant unless accompanied by a constructive procedure (Vidhi) that allows any practitioner to calculate the precise numerical solution step by step.',
    keyDifferentiators: [
      'Rejection of non-constructive assertions: Every theorem is embodied in a computable algorithm.',
      'Focus on exact integer solutions: Development of groundbreaking algorithmic engines like Kuṭṭaka (the pulverizer) and Chakravāla (the cyclic method).',
      'Optimization for iterative convergence: Successive approximation algorithms for square roots, sine values, and planetary positions.'
    ],
    pedagogicalImpact:
      'Nurtured extraordinary computational power; algorithms could be executed rapidly on small sand-boards (Pāṭī) or mentally.',
    illustrativeExample: {
      title: 'Solving Second-Order Indeterminate Equations (Nx² + 1 = y²)',
      description: 'Misattributed to John Pell by Euler; fully solved by Indian masters centuries earlier.',
      indianMethod:
        'Brahmagupta formulated the Bhāvanā composition identity in 628 CE. Bhāskara II perfected it into the Chakravāla algorithm in 1150 CE—a deterministic, finite cyclic algorithm that finds the smallest integer solutions (e.g. for N = 61: x = 226,153,980, y = 1,766,319,049).',
      westernContrast:
        'Pierre de Fermat posed N = 61 as an unsolved challenge to European mathematicians in 1657. European mathematics lacked a constructive general solution until Lagrange published one in 1768.'
    }
  },
  {
    id: 'linguistic-encoding',
    dimensionNumber: 4,
    title: 'Language & Notation: Metered Verses & Word-Numerals vs. 2D Typography',
    sanskritConcept: 'छन्दः-बद्ध-सूत्राणि अक्षराङ्काः च · Chandaḥ-Baddha-Sūtrāṇi Akṣarāṅkāḥ Ca',
    westernApproachTitle: 'Two-Dimensional Silent Symbolic Orthography',
    westernApproachDesc:
      'Modern mathematics relies heavily on a specialized typographical symbol language (x, y, z, ∑, ∫, ∂, ∈, ∀) designed for silent, two-dimensional paper reading. It cannot be easily recited orally or memorized through rhythm.',
    indianApproachTitle: 'Acoustic Mnemonic Verses with Dynamic Numeral Ciphers',
    indianApproachDesc:
      'Mathematical algorithms were composed in musical Sanskrit meters (Anuṣṭubh, Āryā) designed to be sung and committed to memory. Numbers were represented using ingenious linguistic ciphers: Bhūtasaṅkhyā (object-numerals) and Kaṭapayādi (alphanumeric phonetic code).',
    keyDifferentiators: [
      'Bhūtasaṅkhyā: Numbers encoded through cultural concepts (Netra / eyes = 2, Veda = 4, Agni / sacred fires = 3, Kha / sky = 0).',
      'Kaṭapayādi: Consonant cipher where ka, ṭa, pa, ya represent 1, etc., allowing complex mathematical constants to be embedded seamlessly into poetic hymns and devotional literature.',
      'Acoustic resonance: Reading mathematics aloud engaged both auditory and analytical cognition simultaneously.'
    ],
    pedagogicalImpact:
      'Mathematicians could retain entire astronomical libraries in memory while travelling or debating, without needing trunks of reference volumes.',
    illustrativeExample: {
      title: 'Encoding π to 32 Decimal Places as a Hymn to Lord Kṛṣṇa',
      description: 'The Kaṭapayādi cipher converting mathematics into sublime poetry.',
      indianMethod:
        'Verse: "Gopībhāgya madhuvrāta śṛṅgiśodhadhidhigaḥ..." When decoded using the Kaṭapayādi letter-number key, this devotional verse to Kṛṣṇa reveals the value of π/10 to 32 decimal places: 0.31415926535897932384626433832795...',
      westernContrast:
        'Modern mathematics records π as a raw sequence of digits or symbolic Greek letter π, devoid of linguistic resonance or mnemonic memorability.'
    }
  },
  {
    id: 'error-verification',
    dimensionNumber: 5,
    title: 'Verification Architecture: Self-Checking Digital Roots vs. Post-Hoc Re-Calculation',
    sanskritConcept: 'नवाङ्क-शोधक-पद्धतिः · Navāṅka-Śodhaka-Paddhatiḥ',
    westernApproachTitle: 'Full Step-by-Step Re-evaluation',
    westernApproachDesc:
      'Checking an arithmetic or algebraic calculation in modern Western schooling typically requires repeating the entire multi-step process from scratch or relying on an external electronic calculating device.',
    indianApproachTitle: 'Embedded Digital Root Checksums (Bījāṅka / Navāṅka)',
    indianApproachDesc:
      'Indian mathematics integrated instant modular checksum algorithms—chiefly Navāṅka (casting out nines) and Bījāṅka (digital root reduction modulo 9). Every major operation (addition, subtraction, multiplication, division, squaring) contained an immediate parallel single-digit verification check.',
    keyDifferentiators: [
      'Single-step verification: The digital root of the product must equal the product of the digital roots of the factors modulo 9.',
      'Instantaneous error catch: Catches clerical or mental slips within two seconds without recomputing the entire multi-digit calculation.',
      'Pervasive pedagogical habit: Children in traditional Gurukuls verified every calculation on their sand-boards as an involuntary reflex.'
    ],
    pedagogicalImpact:
      'Eliminated calculation anxiety and gave practitioners rock-solid confidence in mental arithmetic.',
    illustrativeExample: {
      title: 'Verifying 487 × 629 = 306,323',
      description: 'Instant Navāṅka verification.',
      indianMethod:
        'Bījāṅka of 487 = 4 + 8 + 7 = 19 → 1 + 9 = 10 → 1. Bījāṅka of 629 = 6 + 2 + 9 = 17 → 1 + 7 = 8. Product of roots: 1 × 8 = 8. Bījāṅka of result 306,323 = 3 + 0 + 6 + 3 + 2 + 3 = 17 → 8. Both roots equal 8; the calculation is verified.',
      westernContrast:
        'The Western schoolchild must re-execute the full 3×3 grid of 9 partial products and column additions to confirm accuracy.'
    }
  },
  {
    id: 'holistic-integration',
    dimensionNumber: 6,
    title: 'Interdisciplinary Synthesis: Unified Knowledge Web vs. Hyper-Specialized Silos',
    sanskritConcept: 'विद्या-समन्वयः · Vidyā-Samanvayaḥ',
    westernApproachTitle: 'Compartmentalized Academic Silos',
    westernApproachDesc:
      'Modern academia draws rigid boundaries separating pure mathematics from applied mathematics, linguistics, music theory, astronomy, philosophy, and theology.',
    indianApproachTitle: 'Organic Symphony of the Six Vedāṅgas',
    indianApproachDesc:
      'Mathematics was an integral branch of a seamless intellectual ecosystem. Pāṇinian grammar (Vyākaraṇa) provided formal rewrite rules and algebraic variables; metrics (Chandaḥ) generated binary sequences and permutations; astronomy (Jyotiṣa) drove spherical trigonometry and calculus; philosophy (Nyāya) governed logic.',
    keyDifferentiators: [
      'Pingala formulated binary combinatorics while studying poetic meter (Chandaḥśāstra).',
      'Āryabhaṭa, Brahmagupta, and Bhāskara II were simultaneously astronomical observers and pure mathematicians.',
      'Philosophical debates on the nature of reality directly shaped the understanding of Śūnya (zero/void) and Ananta (infinity).'
    ],
    pedagogicalImpact:
      'Scholars were versatile polymaths with broad holistic insight rather than hyper-specialized technicians.',
    illustrativeExample: {
      title: 'Pingala’s Binary Combinatorics Born from Poetic Meter',
      description: 'How prosody birthed binary mathematics.',
      indianMethod:
        'While classifying poetic meters into short (Laghu = 0) and long (Guru = 1) syllables, Ācārya Piṅgala (c. 300 BCE) invented the binary numeral system, combinatorial permutations (Prastāra), Pascal’s Triangle (Meru-prastāra), and the Fibonacci sequence (Mātrā-meru).',
      westernContrast:
        'In the West, binary numbers were formally published by Gottfried Wilhelm Leibniz in 1703 CE, framed as a novelty in pure algebraic arithmetic detached from poetic meter.'
    }
  }
];

/**
 * SECTION 2: THE SEQUENTIAL CHRONOLOGICAL LINEAGE
 * 12 Exhaustive Historical Eras with Texts, Polymaths, Sūtras, and Breakthroughs
 */
export const INDIAN_MATH_ERAS: IndianMathEra[] = [
  {
    id: 'era-1-vedic-sulba',
    eraNumber: 1,
    slug: 'vedic-sulba-sutras',
    titleSa: 'वैदिक-शुल्बसूत्र-युगम्',
    titleIast: 'Vaidika-Śulbasūtra-Yugam',
    titleEn: 'Vedic & Śulba Sūtras: Sacred Geometry & Area Invariants',
    approxPeriod: 'c. 1000 BCE – 500 BCE (or earlier)',
    centuryLabel: '1st Millennium BCE',
    geographicCenters: ['Gangetic Plain', 'Kuru-Pañcāla', 'Vidiśā'],
    keyPolymaths: ['Baudhāyana', 'Āpastamba', 'Kātyāyana', 'Mānava'],
    primaryTexts: ['Baudhāyana Śulba Sūtra', 'Āpastamba Śulba Sūtra', 'Kātyāyana Śulba Sūtra', 'Taittirīya Saṃhitā'],
    overview:
      'The Śulba Sūtras represent the world’s oldest recorded manuals of geometric construction, area transformation, and irrational number approximation. Embedded in the Kalpa-vedāṅga, they provided exact mathematical algorithms for erecting sacred fire altars (Citīs) with rigid area constraints.',
    philosophicalContext:
      'Altar construction was an earthly realization of cosmic harmony. The universe is governed by Ṛta (cosmic order), and physical structures must mirror this mathematical precision. Sacrificial altars had to be enlarged or morphed in shape without altering their sacred total area.',
    featuredVerse: {
      sourceText: 'Baudhāyana Śulba Sūtra (1.48)',
      author: 'Ācārya Baudhāyana',
      approxDate: 'c. 800 BCE',
      verseDevanagari:
        'दीर्घचतुरश्रस्याक्ष्णया रज्जुः पार्श्वमानी तिर्यङ् मानी च ।\nयत् पृथग् भूते कुरुतस्तदुभयं करोति ॥',
      verseIast:
        'dīrghacaturaśrasyākṣṇayā rajjuḥ pārśvamānī tiryaṅmānī ca |\nyat pṛthag bhūte kurutastadubhayaṃ karoti ||',
      wordByWord: [
        { sanskrit: 'दीर्घचतुरश्रस्य', iast: 'dīrghacaturaśrasya', meaning: 'of a rectangle' },
        { sanskrit: 'अक्ष्णया रज्जुः', iast: 'akṣṇayā rajjuḥ', meaning: 'the diagonal rope' },
        { sanskrit: 'पार्श्वमानी', iast: 'pārśvamānī', meaning: 'the flank (length) measure' },
        { sanskrit: 'तिर्यङ् मानी', iast: 'tiryaṅmānī', meaning: 'the transverse (width) measure' },
        { sanskrit: 'च', iast: 'ca', meaning: 'and' },
        { sanskrit: 'यत् पृथग् भूते', iast: 'yat pṛthag bhūte', meaning: 'what individually produced' },
        { sanskrit: 'कुरुतः', iast: 'kurutaḥ', meaning: 'they both produce' },
        { sanskrit: 'तद् उभयं', iast: 'tad ubhayaṃ', meaning: 'that combined (sum)' },
        { sanskrit: 'करोति', iast: 'karoti', meaning: 'it produces' }
      ],
      translation:
        'The diagonal rope of an oblong (rectangle) produces by itself an area equal to the sum of the areas produced separately by its length and its breadth.',
      mathematicalSignificance:
        'The earliest explicit formulation of the so-called Pythagorean Theorem in human history (c² = a² + b²), documented centuries before Pythagoras of Samos.'
    },
    breakthroughs: [
      {
        id: 'baudhayana-theorem',
        title: 'Baudhāyana Diagonal Theorem',
        sanskritTerm: 'अक्ष्णया-रज्जु-प्रमेयम् (Akṣṇayā-rajju-prameyam)',
        modernEquivalent: 'Pythagorean Theorem (c² = a² + b²)',
        description:
          'Proved for both squares (c² = 2a²) and general rectangles (c² = a² + b²), accompanied by practical rope-stretching algorithms.',
        formulaDisplay: 'c² = a² + b²',
        historicalSignificance:
          'Used to generate integral Pythagorean triples: (3, 4, 5), (5, 12, 13), (7, 24, 25), (8, 15, 17), (12, 35, 37).'
      },
      {
        id: 'sqrt2-approximation',
        title: 'Rational Approximation of the Square Root of 2',
        sanskritTerm: 'द्विक-करणी (Dvika-karaṇī)',
        modernEquivalent: 'Rational approximation: √2 ≈ 577/408 ≈ 1.4142156...',
        description:
          'Formula: √2 ≈ 1 + 1/3 + 1/(3×4) - 1/(3×4×34) = 577/408. Accurate to five decimal places (error less than 0.00014%).',
        formulaDisplay: '√2 ≈ 1 + 1/3 + 1/(3·4) - 1/(3·4·34) = 577/408 ≈ 1.4142156',
        historicalSignificance:
          'Demonstrates that Vedic geometers recognized the irrational nature of √2 and designed rapid fractional correction algorithms.'
      },
      {
        id: 'squaring-the-circle',
        title: 'Circling the Square & Squaring the Circle',
        sanskritTerm: 'मण्डल-करणम् चतुरश्र-करणम् च (Maṇḍala-karaṇam Caturaśra-karaṇam Ca)',
        modernEquivalent: 'Geometric Area Equivalence & π approximations',
        description:
          'Step-by-step compass-and-rope algorithms to construct a circle having an area equal to a given square and vice-versa.',
        formulaDisplay: 'Area(Square) = Area(Circle) -> a² ≈ π r²',
        historicalSignificance:
          'Required for constructing circular Gārhapatya altars with the exact same area as square Āhavanīya altars.'
      }
    ],
    epistemicEvolution:
      'Established the core Indian mathematical trait: constructive, hands-on spatial algorithms rather than detached propositional syllogisms.',
    interactiveDemoId: 'baudhayana'
  },
  {
    id: 'era-2-pingala-combinatorics',
    eraNumber: 2,
    slug: 'pingala-binary-combinatorics',
    titleSa: 'पिङ्गल-च्छन्दःशास्त्र-युगम्',
    titleIast: 'Piṅgala-Chandaḥśāstra-Yugam',
    titleEn: 'Piṅgala: Binary Arithmetic, Combinatorics & Pascal’s Triangle',
    approxPeriod: 'c. 300 BCE – 200 BCE',
    centuryLabel: '3rd–2nd Century BCE',
    geographicCenters: ['Pāṭaliputra', 'Taxila', 'Ujjayinī'],
    keyPolymaths: ['Ācārya Piṅgala', 'Virahāṅka (commentator)', 'Halāyudha (commentator)'],
    primaryTexts: ['Chandaḥśāstra', 'Mṛtasañjīvanī (Halāyudha commentary)'],
    overview:
      'Ācārya Piṅgala’s Chandaḥśāstra is a foundational monument of discrete mathematics and theoretical computer science. In analyzing Sanskrit poetic meters, Piṅgala developed the binary numeral system, combinatorial expansion matrices, Pascal’s Triangle, and the Fibonacci sequence.',
    philosophicalContext:
      'Sanskrit poetry is defined by rhythmic cadence—alternating light (Laghu, 1 mora) and heavy (Guru, 2 morae) syllables. Piṅgala sought an exhaustive mathematical science to catalogue every conceivable metrical permutation for any verse length n.',
    featuredVerse: {
      sourceText: 'Chandaḥśāstra (8.28–31)',
      author: 'Ācārya Piṅgala',
      approxDate: 'c. 300 BCE',
      verseDevanagari:
        'द्विकौ द्वौ । रूपे शून्यम् । द्विः शून्ये । तावदर्धे तद्गुणितम् ॥',
      verseIast:
        'dvikau dvau | rūpe śūnyam | dviḥ śūnye | tāvadardhe tadguṇitam ||',
      wordByWord: [
        { sanskrit: 'द्विकौ', iast: 'dvikau', meaning: 'two pairs / base two' },
        { sanskrit: 'द्वौ', iast: 'dvau', meaning: 'two' },
        { sanskrit: 'रूपे', iast: 'rūpe', meaning: 'when one is subtracted' },
        { sanskrit: 'शून्यम्', iast: 'śūnyam', meaning: 'write a zero' },
        { sanskrit: 'द्विः शून्ये', iast: 'dviḥ śūnye', meaning: 'multiply by two for zero' },
        { sanskrit: 'तावदर्धे', iast: 'tāvadardhe', meaning: 'halving successively' },
        { sanskrit: 'तद्गुणितम्', iast: 'tadguṇitam', meaning: 'multiplied accordingly' }
      ],
      translation:
        'To compute 2ⁿ: Halve the number if even and note; if odd, subtract one and write zero. Multiply by two and square successively.',
      mathematicalSignificance:
        'The world’s first formal binary exponentiation algorithm (computing 2ⁿ in O(log n) steps), fundamental to modern computer science.'
    },
    breakthroughs: [
      {
        id: 'binary-numeral-system',
        title: 'The Binary System (Laghu & Guru)',
        sanskritTerm: 'लघु-गुरु-प्रस्तारः (Laghu-Guru-Prastāraḥ)',
        modernEquivalent: 'Binary Base-2 Numeral System (0 and 1)',
        description:
          'Laghu (short syllable) treated as 0; Guru (long syllable) treated as 1. Every meter of length n maps to a unique binary integer from 0 to 2ⁿ - 1.',
        formulaDisplay: 'Meter Sequence {L, G, L, G} <-> Binary 0101₂ = 5₁₀',
        historicalSignificance:
          'Formulated binary representation over 2,000 years prior to Leibniz’s 1703 publication.'
      },
      {
        id: 'meru-prastara',
        title: 'Meru-Prastāra (The Staircase of Mount Meru)',
        sanskritTerm: 'मेरु-प्रस्तारः (Meru-Prastāraḥ)',
        modernEquivalent: 'Pascal’s Triangle & Binomial Coefficients',
        description:
          'Pyramidal grid where each entry equals the sum of the two numbers above it. Gives the combinatorial count ⁿCᵣ of meters having r long syllables out of n total.',
        formulaDisplay: 'ⁿCᵣ = ⁿ⁻¹Cᵣ₋₁ + ⁿ⁻¹Cᵣ',
        historicalSignificance:
          'Preceded Blaise Pascal (1654 CE) by over eighteen centuries; commentary by Halāyudha detailed the exact visual triangle.'
      },
      {
        id: 'matra-meru',
        title: 'Mātrā-Meru (Musical Mora Sequence)',
        sanskritTerm: 'मात्रा-मेरुः (Mātrā-Meruḥ)',
        modernEquivalent: 'Fibonacci Sequence: F(n) = F(n-1) + F(n-2)',
        description:
          'Enumerating the number of metric patterns possible for a given total count of beats (mātrās). Generates: 1, 1, 2, 3, 5, 8, 13, 21, 34...',
        formulaDisplay: 'F(n) = F(n - 1) + F(n - 2)',
        historicalSignificance:
          'Documented by Piṅgala and elaborated by Virahāṅka (c. 600 CE) and Hemacandra (1150 CE), long before Leonardo of Pisa (Fibonacci, 1202 CE).'
      }
    ],
    epistemicEvolution:
      'Demonstrated that abstract combinatorial mathematics could emerge directly from the aesthetic rhythms of poetry and music.',
    interactiveDemoId: 'pingala'
  },
  {
    id: 'era-3-jaina-mathematics',
    eraNumber: 3,
    slug: 'jaina-infinity-combinatorics',
    titleSa: 'जैन-गणित-परम्परा',
    titleIast: 'Jaina-Gaṇita-Paramparā',
    titleEn: 'Jaina Mathematics: Transfinite Infinities & Combinatorics',
    approxPeriod: 'c. 500 BCE – 200 CE',
    centuryLabel: '5th BCE – 2nd Century CE',
    geographicCenters: ['Magadha', 'Vallabhī', 'Ujjain', 'Śravaṇabelagola'],
    keyPolymaths: ['Bhadrabāhu', 'Umāsvāti', 'Yativṛṣabha'],
    primaryTexts: ['Sūryaprajñapti', 'Bhagavatī Sūtra', 'Sthānāṅga Sūtra', 'Anuyogadwāra Sūtra'],
    overview:
      'Jaina philosophers freed mathematics from exclusive subservience to sacrificial rituals, investigating pure mathematical structures for cosmological description. They made pioneering breakthroughs in the classification of transfinite infinities, set theory precursors, combinations, and laws of indices.',
    philosophicalContext:
      'Jaina ontology classifies the cosmos into infinite time, infinite space, and infinite souls. Understanding the karmic journey demanded a rigorous taxonomy of the immense: distinguishing between what can be counted, what cannot be counted yet is finite, and what is truly boundless.',
    featuredVerse: {
      sourceText: 'Sthānāṅga Sūtra (Sūtra 747)',
      author: 'Jaina Canonical Tradition',
      approxDate: 'c. 300 BCE',
      verseDevanagari:
        'संख्येया असंख्येया अनन्ता च राशयः ।\nअनन्तः पुनर्द्विविधः—एकतोऽनन्तः सर्वतोऽनन्तश्च ॥',
      verseIast:
        'saṅkhyeyā asaṅkhyeyā anantā ca rāśayaḥ |\nanantaḥ punardvividhaḥ—ekato\'nantaḥ sarvato\'nantaśca ||',
      wordByWord: [
        { sanskrit: 'संख्येयाः', iast: 'saṅkhyeyāḥ', meaning: 'enumerable (countable/finite)' },
        { sanskrit: 'असंख्येयाः', iast: 'asaṅkhyeyāḥ', meaning: 'innumerable (uncountably large)' },
        { sanskrit: 'अनन्ताः', iast: 'anantāḥ', meaning: 'infinite quantities' },
        { sanskrit: 'च राशयः', iast: 'ca rāśayaḥ', meaning: 'and categories/heaps' },
        { sanskrit: 'अनन्तः', iast: 'anantaḥ', meaning: 'the infinite' },
        { sanskrit: 'पुनर्द्विविधः', iast: 'punardvividhaḥ', meaning: 'is further of two kinds' },
        { sanskrit: 'एकतोऽनन्तः', iast: 'ekato\'nantaḥ', meaning: 'infinite in one direction' },
        { sanskrit: 'सर्वतोऽनन्तश्च', iast: 'sarvato\'nantaśca', meaning: 'and infinite in all directions' }
      ],
      translation:
        'Numbers are categorized as Enumerable (finite), Innumerable, and Infinite. The infinite is further distinguished as infinite in one dimension (like a ray) and infinite in all dimensions (like space).',
      mathematicalSignificance:
        'The earliest conceptual distinction between different orders and dimensions of infinity, foreshadowing Georg Cantor’s 19th-century transfinite set theory.'
    },
    breakthroughs: [
      {
        id: 'taxonomy-of-infinities',
        title: 'Classification of Transfinite Infinities',
        sanskritTerm: 'अनन्त-विभागः (Ananta-Vibhāgaḥ)',
        modernEquivalent: 'Transfinite Set Cardinals (ℵ₀, ℵ₁, Continuum)',
        description:
          'Distinguished five types of infinity: Nāma (name), Sthāpanā (representation), Dravya (substance), Kṣetra (spatial), and Bhāva (modal), proving that infinities are not all identical in magnitude.',
        formulaDisplay: 'Saṅkhyeya (Finite) < Asaṅkhyeya (Vast) < Ananta (Infinite Orders)',
        historicalSignificance:
          'Over two millennia before Georg Cantor (1874 CE) proved that infinity comes in different sizes.'
      },
      {
        id: 'jaina-combinatorics',
        title: 'General Combinatorial Formula (Vikalpa)',
        sanskritTerm: 'विकल्प-गणितम् (Vikalpa-Gaṇitam)',
        modernEquivalent: 'Combinations Formula: ⁿCᵣ = n! / (r!(n - r)!)',
        description:
          'The Bhagavatī Sūtra formulates explicit rules to compute combinations of n objects taken 1, 2, 3... at a time without listing.',
        formulaDisplay: 'ⁿCᵣ = [n(n - 1)(n - 2)...(n - r + 1)] / [1 · 2 · 3...· r]',
        historicalSignificance:
          'Earliest general algebraic algorithm for combinations, applied to philosophical atomistic permutations.'
      },
      {
        id: 'laws-of-indices',
        title: 'Operations on Powers & Indices',
        sanskritTerm: 'घाताङ्क-नियमाः (Ghātāṅka-Niyamāḥ)',
        modernEquivalent: 'Laws of Indices: aᵐ · aⁿ = aᵐ⁺ⁿ, (aᵐ)ⁿ = aᵐⁿ',
        description:
          'The Anuyogadwāra Sūtra outlines successive squaring (varga), square rooting (varga-mūla), and the arithmetic laws governing exponential quantities.',
        formulaDisplay: 'aᵐ · aⁿ = aᵐ⁺ⁿ',
        historicalSignificance:
          'Allowed cosmological calculations involving astronomical quantities exceeding 10¹⁴⁰.'
      }
    ],
    epistemicEvolution:
      'Transformed Indian mathematics from sacrificial geometry into an abstract cosmological science exploring transfinite numbers.',
    interactiveDemoId: 'jaina'
  },
  {
    id: 'era-4-bakhshali-era',
    eraNumber: 4,
    slug: 'bakhshali-zero-and-algebra',
    titleSa: 'बख्शाली-ग्रन्थ-युगम्',
    titleIast: 'Bakhśālī-Grantha-Yugam',
    titleEn: 'The Bakhshālī Manuscript: Zero, Fractions & Commercial Algebra',
    approxPeriod: 'c. 224 CE – 383 CE (Oxford Radiocarbon Dating)',
    centuryLabel: '3rd–4th Century CE',
    geographicCenters: ['Gāndhāra', 'Taxila', 'Bakhshālī (near Peshawar)'],
    keyPolymaths: ['Anonymous Gāndhāran Merchant-Mathematicians', 'Śāradā Scribes'],
    primaryTexts: ['Bakhshālī Manuscript (Bodleian Library MS. Birch bark)'],
    overview:
      'Discovered in 1881 in Bakhshali (modern Pakistan), this birch-bark codex is the oldest surviving physical mathematical manuscript in South Asia. In 2017, Oxford University radiocarbon dated folios to 224–383 CE, confirming early physical use of the solid dot zero (śūnya-bindu).',
    philosophicalContext:
      'The text is a practical computational manual for merchants, civil administrators, and financial reckoners along the Silk Road. It demonstrates that the decimal place-value system was not merely a monastic theory, but the standard commercial language of trade.',
    featuredVerse: {
      sourceText: 'Bakhshālī Manuscript (Folio 56v)',
      author: 'Unknown Northern Polymath',
      approxDate: 'c. 3rd Century CE',
      verseDevanagari:
        'अकृते द्विगुणे शेषे छेदो रूपेण संयुतः ।\nतद्वर्गदलसंश्लिष्टहृतशेषं विशोधयेत् ॥',
      verseIast:
        'akṛte dviguṇe śeṣe chedo rūpeṇa saṃyutaḥ |\ntadvargadalasaṃśliṣṭahṛtaśeṣaṃ viśodhayet ||',
      wordByWord: [
        { sanskrit: 'अकृते', iast: 'akṛte', meaning: 'for a non-square number (A = a² + r)' },
        { sanskrit: 'द्विगुणे', iast: 'dviguṇe', meaning: 'doubled' },
        { sanskrit: 'शेषे', iast: 'śeṣe', meaning: 'remainder r' },
        { sanskrit: 'छेदः', iast: 'chedaḥ', meaning: 'divisor 2a' },
        { sanskrit: 'रूपेण', iast: 'rūpeṇa', meaning: 'with unit/integer part' },
        { sanskrit: 'संयुतः', iast: 'saṃyutaḥ', meaning: 'combined: a + r/(2a)' },
        { sanskrit: 'तद्वर्गदल', iast: 'tadvargadala', meaning: 'half the square of that correction' },
        { sanskrit: 'विशोधयेत्', iast: 'viśodhayet', meaning: 'should be subtracted' }
      ],
      translation:
        'For a non-square quantity: Divide the remainder by twice the nearest integer square root. Add this to the root. From this, subtract the square of that fractional correction divided by twice the new sum.',
      mathematicalSignificance:
        'An extraordinarily sophisticated iterative quadratic formula for approximating square roots of non-square numbers, yielding values identical to modern second-order Taylor approximations.'
    },
    breakthroughs: [
      {
        id: 'bakhshali-dot-zero',
        title: 'The Śūnya-Bindu (Solid Dot Zero)',
        sanskritTerm: 'शून्य-बिन्दुः (Śūnya-Binduḥ)',
        modernEquivalent: 'Place-Value Zero Symbol (0)',
        description:
          'Folios prominently feature a bold dot (•) functioning both as a positional zero (empty place marker) and as an algebraic unknown.',
        formulaDisplay: 'Position: 105 <-> [1][•][5]',
        historicalSignificance:
          'Oxford University radiocarbon dating confirmed these dots date between 224 and 383 CE, pushing back physical evidence of the zero symbol by half a millennium.'
      },
      {
        id: 'quadratic-sqrt-algorithm',
        title: 'High-Precision Square Root Algorithm',
        sanskritTerm: 'अकृत-पद-साधनम् (Akṛta-Pada-Sādhanam)',
        modernEquivalent: '√A ≈ a + r/(2a) - (r/2a)² / 2(a + r/2a)',
        description:
          'For A = a² + r, computes square root with quadratic error suppression: e.g. computes √41 ≈ 6.403124... (true value 6.40312423...).',
        formulaDisplay: '√A ≈ a + r/(2a) - [r/(2a)]² / [2(a + r/(2a))]',
        historicalSignificance:
          'Surpasses Greek Heron’s first-order formula, achieving rapid quadratic convergence.'
      },
      {
        id: 'negative-numbers-cross',
        title: 'Negative Numbers & Sign Conventions',
        sanskritTerm: 'ऋण-सङ्केतः (Ṛṇa-Saṅketaḥ)',
        modernEquivalent: 'Negative Numbers (e.g. 7+ denoted -7)',
        description:
          'Negative quantities explicitly marked by a cross (+) placed after the number, tracking debts, deficit balances, and algebraic subtraction.',
        formulaDisplay: '12 + <-> -12 (Negative 12)',
        historicalSignificance:
          'Proves routine operational use of negative numbers in Asian commerce centuries before Europe recognized negative quantities as valid numbers.'
      }
    ],
    epistemicEvolution:
      'Established empirical physical proof that the place-value decimal system and zero were active in everyday merchant computation by the 3rd century CE.',
    interactiveDemoId: 'bakhshali'
  },
  {
    id: 'era-5-aryabhata-revolution',
    eraNumber: 5,
    slug: 'aryabhata-kusumapura-revolution',
    titleSa: 'आर्यभटीय-क्रान्ति-युगम्',
    titleIast: 'Āryabhaṭīya-Krānti-Yugam',
    titleEn: 'Āryabhaṭa I: The Kusumapura Revolution & Trigonometry',
    approxPeriod: '476 CE – 550 CE (Āryabhaṭīya composed in 499 CE)',
    centuryLabel: '5th–6th Century CE',
    geographicCenters: ['Kusumapura (Pāṭaliputra / modern Patna)', 'Ujjayinī'],
    keyPolymaths: ['Āryabhaṭa I (composed treatise at age 23 in 499 CE)'],
    primaryTexts: ['Āryabhaṭīya (Gītikāpāda, Gaṇitapāda, Kālakriyāpāda, Golapāda)', 'Arya-Siddhānta (lost)'],
    overview:
      'Āryabhaṭa I is universally acclaimed as the father of classical Indian astronomy and algebra. In 121 compact verses, he formulated the decimal place-value system, calculated π to four decimal places explicitly stating it is an approximation, created sine tables, and invented the Kuṭṭaka algorithm for indeterminate equations.',
    philosophicalContext:
      'Āryabhaṭa was a revolutionary thinker who dared to propose that the Earth rotates daily on its axis (Bhū-bhramaṇa) while the stars are stationary. He removed astrological superstition from eclipses, proving they are caused by the geometric shadows of the Earth and Moon.',
    featuredVerse: {
      sourceText: 'Āryabhaṭīya (Gaṇitapāda, Verse 10)',
      author: 'Āryabhaṭa I',
      approxDate: '499 CE',
      verseDevanagari:
        'चतुरधिकं शतमष्टगुणं द्वाषष्टिस्तथा सहस्राणाम् ।\nअयुतद्वयविष्कम्भस्यासन्नो वृत्तपरिणाहः ॥',
      verseIast:
        'caturadhikaṃ śatamaṣṭaguṇaṃ dvāṣaṣṭistathā sahasrāṇām |\nayutadvayaviṣkambhasyāsanno vṛttapariṇāhaḥ ||',
      wordByWord: [
        { sanskrit: 'चतुरधिकं शतम्', iast: 'caturadhikaṃ śatam', meaning: 'one hundred plus four (104)' },
        { sanskrit: 'अष्टगुणम्', iast: 'aṣṭaguṇam', meaning: 'multiplied by eight (832)' },
        { sanskrit: 'द्वाषष्टिः तथा', iast: 'dvāṣaṣṭiḥ tathā', meaning: 'sixty-two and' },
        { sanskrit: 'सहस्राणाम्', iast: 'sahasrāṇām', meaning: 'thousands (62,000 + 832 = 62,832)' },
        { sanskrit: 'अयुतद्वय', iast: 'ayutadvaya', meaning: 'two ayutas = 2 × 10,000 = 20,000' },
        { sanskrit: 'विष्कम्भस्य', iast: 'viṣkambhasya', meaning: 'of a diameter' },
        { sanskrit: 'आसन्नः', iast: 'āsannaḥ', meaning: 'is the approximate' },
        { sanskrit: 'वृत्तपरिणाहः', iast: 'vṛttapariṇāhaḥ', meaning: 'circumference of a circle' }
      ],
      translation:
        'Add 4 to 100, multiply by 8, and add 62,000: this gives 62,832 as the approximate circumference of a circle whose diameter is 20,000.',
      mathematicalSignificance:
        'Computes π ≈ 62832 / 20000 = 3.1416. Critically, Āryabhaṭa uses the word "āsanna" (approaching / approximate), revealing he understood that π cannot be expressed as an exact rational ratio—foreshadowing the irrationality of π.'
    },
    breakthroughs: [
      {
        id: 'place-value-definition',
        title: 'Decimal Place-Value Axiom',
        sanskritTerm: 'स्थानात् स्थानं दशगुणं स्यात् (Sthānāt sthānaṃ daśaguṇaṃ syāt)',
        modernEquivalent: 'Base-10 Positional Value',
        description:
          'Gaṇitapāda Verse 2 states: "From place to place, each is ten times the previous." Standardized naming of powers of ten up to 10¹⁸.',
        formulaDisplay: 'Value = ∑ dᵢ · 10ⁱ',
        historicalSignificance:
          'Codified the definitive decimal place-value system that revolutionized world arithmetic.'
      },
      {
        id: 'pi-approximation',
        title: 'Precision Approximation of π',
        sanskritTerm: 'आसन्न-परिणाहः (Āsanna-Pariṇāhaḥ)',
        modernEquivalent: 'π ≈ 3.1416 (Irrationality recognized)',
        description:
          'Circumference / Diameter = 62,832 / 20,000 = 3.1416. Marked explicitly as āsanna (approximate).',
        formulaDisplay: 'π = C / D ≈ 62832 / 20000 = 3.1416',
        historicalSignificance:
          'The most accurate value of π in the ancient world, recognized as intrinsically inexact.'
      },
      {
        id: 'sine-table-jya',
        title: 'Trigonometric Sine Tables (Jyā & Koṭijyā)',
        sanskritTerm: 'ज्या-कोटिज्या-सारिणी (Jyā-Koṭijyā-Sāriṇī)',
        modernEquivalent: 'Sine and Cosine Functions',
        description:
          'Defined Jyā (half-chord) for 24 arcs of a quadrant in steps of 3°45\' with radius R = 3438\'. Computed via first and second differences: Δ²(Jyā).',
        formulaDisplay: 'Jyā(θ) = R · sin(θ),  Koṭijyā(θ) = R · cos(θ)',
        historicalSignificance:
          'The Sanskrit word "Jyā" was translated into Arabic as "Jiba" (transcribed as "Jaib" - fold/bay), which Latin translators rendered as "Sinus" (bay/curve), giving the modern word "Sine".'
      },
      {
        id: 'kuttaka-algorithm',
        title: 'Kuṭṭaka: The Pulverizer',
        sanskritTerm: 'कुट्टक-गणितम् (Kuṭṭaka-Gaṇitam)',
        modernEquivalent: 'General Solution for Linear Diophantine Equations (by - ax = c)',
        description:
          'A recursive division algorithm to solve indeterminate linear integer equations, essential for calculating planetary mean positions and conjunction cycles.',
        formulaDisplay: 'ax + c = by  (x, y ∈ ℤ)',
        historicalSignificance:
          'Anticipated the Extended Euclidean Algorithm and Bachet’s 1612 European method by more than 1,100 years.'
      }
    ],
    epistemicEvolution:
      'Merged terrestrial mathematics with celestial orbital physics, establishing trigonometry and indeterminate analysis as core disciplines.',
    interactiveDemoId: 'aryabhata'
  },
  {
    id: 'era-6-varahamihira-bhaskara1',
    eraNumber: 6,
    slug: 'varahamihira-bhaskara1-trigonometry',
    titleSa: 'वराहमिहिर-भास्कर-प्रथम-युगम्',
    titleIast: 'Varāhamihira-Bhāskara-Prathama-Yugam',
    titleEn: 'Varāhamihira & Bhāskara I: Rational Sine Formula & Commentaries',
    approxPeriod: '505 CE – 680 CE',
    centuryLabel: '6th–7th Century CE',
    geographicCenters: ['Ujjayinī (Avanti)', 'Vallabhī (Saurashtra)', 'Asmaka'],
    keyPolymaths: ['Varāhamihira (505–587 CE)', 'Bhāskara I (600–680 CE)'],
    primaryTexts: ['Pañcasiddhāntikā', 'Bṛhat Saṃhitā', 'Mahābhāskarīya', 'Laghubhāskarīya', 'Āryabhaṭīyabhāṣya'],
    overview:
      'Varāhamihira unified the five older astronomical schools and expanded combinatorics. Bhāskara I authored the earliest surviving commentary on Āryabhaṭa and formulated the miraculous rational sine approximation formula—evaluating sine without infinite series with an error under 1.9%.',
    philosophicalContext:
      'This era deepened the commentary tradition (Bhāṣya). Mathematical knowledge was scrutinized through rigorous peer critique, testing earlier planetary models against observational sky coordinates (Dṛk-gaṇita).',
    featuredVerse: {
      sourceText: 'Mahābhāskarīya (Chapter 7, Verses 17–19)',
      author: 'Bhāskara I',
      approxDate: '629 CE',
      verseDevanagari:
        'मख्यादिरहितं कर्म वक्ष्यते तत्त्वनिश्चयम् ।\nभाज्यः पञ्चदशांशेन शोध्याद् भागादि यद्भवेत् ॥\nखखाष्टकेषु गुणाद् बाहुफलं स्याद् विनापि ज्याम् ॥',
      verseIast:
        'makhyādirahitaṃ karma vakṣyate tattvaniścayam |\nbhājyaḥ pañcadaśāṃśena śodhyād bhāgādi yadbhavet ||\nkhakhāṣṭakeṣu guṇād bāhuphalaṃ syād vināpi jyām ||',
      wordByWord: [
        { sanskrit: 'मख्यादि-रहितम्', iast: 'makhyādi-rahitam', meaning: 'without needing the table of sines' },
        { sanskrit: 'कर्म वक्ष्यते', iast: 'karma vakṣyate', meaning: 'the method is now proclaimed' },
        { sanskrit: 'तत्त्व-निश्चयम्', iast: 'tattva-niścayam', meaning: 'with absolute accuracy' },
        { sanskrit: 'खखाष्टकेषु', iast: 'khakhāṣṭakeṣu', meaning: 'into 40,500 (kha=0, kha=0, aṣṭa=8, i.e. 40500)' },
        { sanskrit: 'विनापि ज्याम्', iast: 'vināpi jyām', meaning: 'even without a sine table' }
      ],
      translation:
        'I proclaim the determination of the sine without using the table of sine differences. For an angle θ in degrees: multiply 4θ(180 - θ) by R, and divide by 40,500 - θ(180 - θ). This gives the sine with astonishing precision.',
      mathematicalSignificance:
        'The celebrated Bhāskara I rational sine formula: sin(x) ≈ 16x(π - x) / [5π² - 4x(π - x)]. Its maximum relative error is less than 1.9% across the entire range 0 ≤ x ≤ π!'
    },
    breakthroughs: [
      {
        id: 'bhaskara-sine-formula',
        title: 'Bhāskara I’s Rational Sine Approximation',
        sanskritTerm: 'अ-ज्या-दोर्गुण-साधनम् (A-jyā-dorguṇa-sādhanam)',
        modernEquivalent: 'sin(x) ≈ 16x(π - x) / [5π² - 4x(π - x)]',
        description:
          'Evaluates trigonometric sine directly using a rational fraction rather than polynomial or series expansions. Maximum error is only 0.0016!',
        formulaDisplay: 'sin(θ°) ≈ [4θ(180 - θ)] / [40500 - θ(180 - θ)]',
        historicalSignificance:
          'A triumph of classical approximation theory; remained unsurpassed in computational elegance until modern computer chips.'
      },
      {
        id: 'varahamihira-identities',
        title: 'Trigonometric & Combinatorial Identities',
        sanskritTerm: 'त्रिकोणमिति-समन्वयः (Trikoṇamiti-Samanvayaḥ)',
        modernEquivalent: 'sin²(x) + cos²(x) = 1,  sin(x) = cos(90° - x)',
        description:
          'Systematized fundamental trigonometric identities in the Pañcasiddhāntikā alongside Pascal’s triangle expansions for six-fold perfume blend combinatorics.',
        formulaDisplay: 'sin²(θ) + cos²(θ) = 1',
        historicalSignificance:
          'Transformed trigonometry into an analytical branch indispensable for eclipse computing.'
      }
    ],
    epistemicEvolution:
      'Proved that complex transcendental curves like sine could be approximated with rational algebraic fractions.',
    interactiveDemoId: 'bhaskara1'
  },
  {
    id: 'era-7-brahmagupta-algebra',
    eraNumber: 7,
    slug: 'brahmagupta-algebra-and-zero',
    titleSa: 'ब्रह्मगुप्त-बीजगणित-युगम्',
    titleIast: 'Brahmagupta-Bījagaṇita-Yugam',
    titleEn: 'Brahmagupta: Formalization of Zero, Negatives & Indeterminate Equations',
    approxPeriod: '598 CE – 668 CE (Brāhmasphuṭasiddhānta composed in 628 CE)',
    centuryLabel: '7th Century CE',
    geographicCenters: ['Bhinmāl (Rajasthan)', 'Ujjayinī (Madhya Pradesh)'],
    keyPolymaths: ['Brahmagupta (born 598 CE, royal astronomer at Bhinmāl)'],
    primaryTexts: ['Brāhmasphuṭasiddhānta (BSS, 628 CE)', 'Khaṇḍakhādyaka (665 CE)'],
    overview:
      'Brahmagupta is a towering titan in the history of world mathematics. In Chapter 18 of the Brāhmasphuṭasiddhānta, he became the first person in history to define zero as an independent number with its own complete arithmetic rules, formalize signed arithmetic (+ and -), invent the Bhāvanā composition law, and discover the cyclic quadrilateral area formula.',
    philosophicalContext:
      'Brahmagupta viewed numbers not merely as geometric lengths (like the Greeks), but as abstract algebraic entities representing debts (Kṣaya / Ṛṇa), fortunes (Dhana), and void/neutrality (Kha / Śūnya). This shift birthed modern algebra.',
    featuredVerse: {
      sourceText: 'Brāhmasphuṭasiddhānta (Chapter 18, Verses 30 & 33)',
      author: 'Brahmagupta',
      approxDate: '628 CE',
      verseDevanagari:
        'ऋणयोर्धनयोर्घातो धनं भवति तद्रूपम् ।\nशून्यविशोधने धनमृणमृणं धनं भवति ॥\nखं खगुणं खं खहृतं खं धनर्णयोः खेन संयुतमविकारम् ॥',
      verseIast:
        'ṛṇayordhanayorghāto dhanaṃ bhavati tadrūpam |\nśūnyaviśodhane dhanamṛṇamṛṇaṃ dhanaṃ bhavati ||\nkhaṃ khaguṇaṃ khaṃ khahṛtaṃ khaṃ dhanarṇayoḥ khena saṃyutamavikāram ||',
      wordByWord: [
        { sanskrit: 'ऋणयोः', iast: 'ṛṇayoḥ', meaning: 'of two negative numbers (debts)' },
        { sanskrit: 'घातो धनं भवति', iast: 'ghāto dhanaṃ bhavati', meaning: 'the product is positive (fortune)' },
        { sanskrit: 'तद्रूपम्', iast: 'tadrūpam', meaning: 'likewise for positives' },
        { sanskrit: 'खं खगुणम्', iast: 'khaṃ khaguṇam', meaning: 'zero multiplied by zero is zero' },
        { sanskrit: 'खहृतम्', iast: 'khahṛtam', meaning: 'divided by zero' },
        { sanskrit: 'अविकारम्', iast: 'avikāram', meaning: 'remains unchanged when added to zero' }
      ],
      translation:
        'The product of two debts (negatives) is a fortune (positive). The product of zero and a number is zero. Zero subtracted from a quantity leaves it unchanged. A debt subtracted from zero becomes a fortune.',
      mathematicalSignificance:
        'The world’s first complete systematic arithmetic of zero and signed negative numbers: (-a) × (-b) = +ab,  a - 0 = a,  0 - (-b) = +b.'
    },
    breakthroughs: [
      {
        id: 'systematic-zero-and-negatives',
        title: 'Axiomatic Arithmetic of Zero & Signed Numbers',
        sanskritTerm: 'धन-ऋण-शून्य-परिकर्म (Dhana-Ṛṇa-Śūnya-Parikarma)',
        modernEquivalent: 'Axioms of Zero and Negative Integers',
        description:
          'Established that 0 is not merely a place-holder, but a full mathematical entity obeying arithmetic: a + 0 = a, a × 0 = 0, (-a) × (-b) = ab.',
        formulaDisplay: '(-a) · (-b) = +ab,   a + 0 = a,   a - 0 = a',
        historicalSignificance:
          'Europe resisted negative numbers as "absurd" and "fictitious" until the late 17th century; Brahmagupta mastered them in 628 CE.'
      },
      {
        id: 'brahmagupta-quadrilateral',
        title: 'Area of a Cyclic Quadrilateral',
        sanskritTerm: 'चतुर्भुज-क्षेत्रफल-सूत्रम् (Caturbhuja-Kṣetraphala-Sūtram)',
        modernEquivalent: 'Brahmagupta’s Formula: Area = √[(s - a)(s - b)(s - c)(s - d)]',
        description:
          'For a cyclic quadrilateral with sides a, b, c, d and semi-perimeter s: exact formula for area, circumradius, and diagonals.',
        formulaDisplay: 'Area = √[(s - a)(s - b)(s - c)(s - d)]  where s = (a + b + c + d)/2',
        historicalSignificance:
          'The most beautiful geometric area formula of antiquity, generalizing Heron’s triangle formula.'
      },
      {
        id: 'bhavana-composition-identity',
        title: 'Bhāvanā Composition & Pell’s Equation',
        sanskritTerm: 'भावना-पद्धतिः (Bhāvanā-Paddhatiḥ)',
        modernEquivalent: 'Brahmagupta’s Identity for Nx² + 1 = y²',
        description:
          'Identity: (x₁² - Ny₁²)(x₂² - Ny₂²) = (x₁x₂ ± Ny₁y₂)² - N(x₁y₂ ± x₂y₁)². Allows generating infinite solutions from one root.',
        formulaDisplay: '(a² + Nb²)(c² + Nd²) = (ac - Nbd)² + N(ad + bc)²',
        historicalSignificance:
          'Solved 1,000 years before European mathematicians; Euler mistakenly named it after John Pell, who never worked on it.'
      }
    ],
    epistemicEvolution:
      'Elevated zero and negative quantities from commercial metaphors into foundational mathematical entities.',
    interactiveDemoId: 'brahmagupta'
  },
  {
    id: 'era-8-mahavira-sridhara',
    eraNumber: 8,
    slug: 'mahavira-sridhara-pure-math',
    titleSa: 'महावीर-श्रीधर-युगम्',
    titleIast: 'Mahāvīra-Śrīdhara-Yugam',
    titleEn: 'Mahāvīra & Śrīdhara: Pure Arithmetic, Fractions & Quadratic Formula',
    approxPeriod: '850 CE – 950 CE',
    centuryLabel: '9th–10th Century CE',
    geographicCenters: ['Mānyakheṭa (Karnataka - Rashtrakuta Empire)', 'Bengal / Gujarat'],
    keyPolymaths: ['Mahāvīrācārya (c. 850 CE)', 'Śrīdharācārya (c. 870–930 CE)'],
    primaryTexts: ['Gaṇitasārasaṅgraha (Mahāvīra)', 'Pāṭīgaṇita (Śrīdhara)', 'Triśatikā (Śrīdhara)'],
    overview:
      'Mahāvīrācārya authored the Gaṇitasārasaṅgraha—the first major Indian treatise devoted exclusively to pure mathematics, completely detached from astronomical calculations. Śrīdhara codified the standard quadratic formula method still taught in high schools worldwide today.',
    philosophicalContext:
      'Patronized by the enlightened Rashtrakuta King Amoghavarsha I, Mahāvīra sought a universal textbook for students, merchants, and engineers, organizing mathematical topics systematically from simple fractions to higher combinatorics.',
    featuredVerse: {
      sourceText: 'Triśatikā / Pāṭīgaṇita',
      author: 'Śrīdharācārya',
      approxDate: 'c. 900 CE',
      verseDevanagari:
        'चतुराहतोपहस्तै रूपैः पक्षद्वयं गुणयेत् ।\nपूर्वाव्यक्तस्य कृतेः समं रूपं क्षिपेदुभयोः ॥',
      verseIast:
        'caturāhatopahastai rūpaiḥ pakṣadvayaṃ guṇayet |\npūrvāvyaktasya kṛteḥ samaṃ rūpaṃ kṣipedubhayoḥ ||',
      wordByWord: [
        { sanskrit: 'चतुराहत', iast: 'caturāhata', meaning: 'multiplied by four' },
        { sanskrit: 'उपहस्तैः', iast: 'upahastaiḥ', meaning: 'by the coefficient of the unknown (4a)' },
        { sanskrit: 'पक्षद्वयं गुणयेत्', iast: 'pakṣadvayaṃ guṇayet', meaning: 'multiply both sides of the equation' },
        { sanskrit: 'पूर्वाव्यक्तस्य कृतेः', iast: 'pūrvāvyaktasya kṛteḥ', meaning: 'the square of the coefficient of middle term (b²)' },
        { sanskrit: 'उभयोः क्षिपेत्', iast: 'ubhayoḥ kṣipet', meaning: 'add to both sides' }
      ],
      translation:
        'Multiply both sides of the quadratic equation by four times the coefficient of the square of the unknown (4a); add to both sides the square of the coefficient of the middle unknown (b²); then take the square root.',
      mathematicalSignificance:
        'The world-famous Śrīdharācārya Method for solving the general quadratic equation ax² + bx + c = 0, completing the square to yield x = (-b ± √(b² - 4ac)) / (2a).'
    },
    breakthroughs: [
      {
        id: 'sridhara-quadratic-rule',
        title: 'Śrīdharācārya’s Quadratic Formula',
        sanskritTerm: 'द्विघात-समीकरण-विधिः (Dvighāta-Samīkaraṇa-Vidhiḥ)',
        modernEquivalent: 'Quadratic Formula: x = (-b ± √(b² - 4ac)) / (2a)',
        description:
          'Complete algorithmic formulation of the quadratic root solution by completing the square.',
        formulaDisplay: 'x = [-b ± √(b² - 4ac)] / (2a)',
        historicalSignificance:
          'Cited by Bhāskara II in Bījagaṇita as the definitive classical solution of quadratic algebra.'
      },
      {
        id: 'mahavira-unit-fractions',
        title: 'Unit Fraction Decompositions',
        sanskritTerm: 'भाग-जातिः (Bhāga-Jātiḥ)',
        modernEquivalent: 'Fraction Decomposition & Egyptian Fractions',
        description:
          'Comprehensive algorithmic methods to express any rational fraction as a sum of unit fractions with unit numerators 1/n.',
        formulaDisplay: 'p / q = 1/a₁ + 1/a₂ + ... + 1/aₖ',
        historicalSignificance:
          'Systematized fraction arithmetic across nine distinct fraction categories (Kalā-savarṇa).'
      },
      {
        id: 'mahavira-zero-division-insight',
        title: 'Refinement of Zero Operations',
        sanskritTerm: 'शून्य-परिकर्म-शोधः (Śūnya-Parikarma-Śodhaḥ)',
        modernEquivalent: 'Division by Zero Analysis',
        description:
          'Corrected Brahmagupta’s early formulation by stating that any finite number multiplied by zero is zero, but a number divided by zero remains unyielding/infinite.',
        formulaDisplay: 'a · 0 = 0,   a / 0 -> Ananta / Khahara',
        historicalSignificance:
          'Paved the way for Bhāskara II’s definition of Khahara (infinity).'
      }
    ],
    epistemicEvolution:
      'Established pure mathematics as an autonomous, rigorous scientific discipline detached from astronomy.',
    interactiveDemoId: 'mahavira'
  },
  {
    id: 'era-9-bhaskara2-calculus-precursors',
    eraNumber: 9,
    slug: 'bhaskara2-chakravala-and-calculus',
    titleSa: 'भास्कराचार्य-सिद्धान्तशिरोमणि-युगम्',
    titleIast: 'Bhāskarācārya-Siddhāntaśiromaṇi-Yugam',
    titleEn: 'Bhāskara II: Siddhānta-Śiromaṇi, Chakravāla & Calculus Precursors',
    approxPeriod: '1114 CE – 1185 CE (Siddhānta-Śiromaṇi completed in 1150 CE)',
    centuryLabel: '12th Century CE',
    geographicCenters: ['Bijāpur / Pāṭan', 'Ujjayinī', 'Sahyādri Mountains (Maharashtra)'],
    keyPolymaths: ['Bhāskara II (Bhāskarācārya, born 1114 CE)'],
    primaryTexts: ['Siddhānta-Śiromaṇi (Līlāvatī, Bījagaṇita, Grahagaṇita, Golādhyāya)', 'Karaṇakutūhala'],
    overview:
      'Bhāskara II represents the pinnacle of classical medieval Indian mathematics. His masterpiece Siddhānta-Śiromaṇi contains Līlāvatī (poetic arithmetic) and Bījagaṇita (algebra). He invented the breathtaking Chakravāla (cyclic) method for solving Pell’s equation and formulated early differential calculus concepts: instantaneous velocity and vanishing differentials at stationary points.',
    philosophicalContext:
      'Bhāskarācārya brought warmth, poetry, and narrative charm to mathematics. In Līlāvatī, he frames complex problems as playful riddles addressed to his daughter Līlāvatī, featuring swarms of bees, peacocks on pillars, and lotus blooms swaying in lake waters.',
    featuredVerse: {
      sourceText: 'Siddhānta-Śiromaṇi (Golādhyāya, Spandādhikāra)',
      author: 'Bhāskarācārya',
      approxDate: '1150 CE',
      verseDevanagari:
        'बिम्बार्धस्य चरदलस्य यत् स्यात् तात्कालिकी गतिः ।\nतत्र स्थितस्य विवरं न भवति तद् गतिविदारितम् ॥',
      verseIast:
        'bimbārdhasya caradalasya yat syāt tātkālikī gatiḥ |\ntatra sthitasya vivaraṃ na bhavati tad gatividāritam ||',
      wordByWord: [
        { sanskrit: 'तात्कालिकी गतिः', iast: 'tātkālikī gatiḥ', meaning: 'instantaneous motion / velocity (v = dθ/dt)' },
        { sanskrit: 'विवरं न भवति', iast: 'vivaraṃ na bhavati', meaning: 'the difference/differential vanishes (d(f) = 0)' },
        { sanskrit: 'तत्र स्थितस्य', iast: 'tatra sthitasya', meaning: 'at that peak position (extremum)' }
      ],
      translation:
        'The instantaneous motion (Tātkālikī Gati) of a planet is the change during an infinitesimal moment. When a planet reaches the peak of its motion (its apogee), the differential rate of change vanishes to zero.',
      mathematicalSignificance:
        'Direct precursor to differential calculus: states that at a maximum or stationary point of a function, the derivative vanishes (df/dx = 0), pre-dating Fermat’s theorem and Rolle’s theorem by 500 years!'
    },
    breakthroughs: [
      {
        id: 'chakravala-algorithm',
        title: 'The Chakravāla Cyclic Algorithm',
        sanskritTerm: 'चक्रवाल-पद्धतिः (Chakravāla-Paddhatiḥ)',
        modernEquivalent: 'Algorithm for Indeterminate Quadratic Equations (Nx² + 1 = y²)',
        description:
          'A deterministic cyclic algorithm that solves Nx² + 1 = y² for any integer N, finding solutions that defeat brute-force searching.',
        formulaDisplay: 'Nx² + 1 = y²  (e.g. for N = 61: x = 226,153,980, y = 1,766,319,049)',
        historicalSignificance:
          'Described by Hermann Hankel (1874) as "the finest thing achieved in the theory of numbers before Lagrange (1768)."'
      },
      {
        id: 'instantaneous-velocity',
        title: 'Tātkālikī Gati (Instantaneous Velocity)',
        sanskritTerm: 'तात्कालिकी गतिः (Tātkālikī Gatiḥ)',
        modernEquivalent: 'Derivative: v(t) = dθ / dt',
        description:
          'Distinguished sthūla-gati (average velocity over a day) from sūkṣma / tātkālikī gati (instantaneous velocity during an infinitesimal time interval δt).',
        formulaDisplay: 'v = lim(δt → 0) [δθ / δt] = dθ / dt',
        historicalSignificance:
          'Formulated differential calculus concepts 500 years before Newton and Leibniz.'
      },
      {
        id: 'khahara-infinity',
        title: 'Khahara (Division by Zero = Infinite Quantity)',
        sanskritTerm: 'खहर-राशिः (Khahara-Rāśiḥ)',
        modernEquivalent: 'a / 0 -> infinity (Infinite Quantity)',
        description:
          'Bījagaṇita states: "A quantity divided by zero is Khahara (an infinite quantity). Just as infinite Brahman is unaffected by creation or dissolution, an infinite quantity is unchanged by adding or subtracting finite numbers."',
        formulaDisplay: 'a / 0 = infinity,   infinity ± k = infinity',
        historicalSignificance:
          'Earliest clear formulation of the properties of mathematical infinity under addition and subtraction.'
      }
    ],
    epistemicEvolution:
      'Bridged algebra with infinitesimal analysis, laying the conceptual groundwork for the Kerala School’s formal calculus.',
    interactiveDemoId: 'bhaskara2'
  },
  {
    id: 'era-10-narayana-pandita',
    eraNumber: 10,
    slug: 'narayana-pandita-combinatorics',
    titleSa: 'नारायण-पण्डित-गणितकौमुदी-युगम्',
    titleIast: 'Nārāyaṇa-Paṇḍita-Gaṇitakaumudī-Yugam',
    titleEn: 'Nārāyaṇa Paṇḍita: Magic Squares, Permutations & Partition Theory',
    approxPeriod: '1340 CE – 1400 CE (Gaṇitakaumudī completed in 1356 CE)',
    centuryLabel: '14th Century CE',
    geographicCenters: ['Banāras (Vārāṇasī)', 'Kāśī'],
    keyPolymaths: ['Nārāyaṇa Paṇḍita (c. 1340–1400 CE)'],
    primaryTexts: ['Gaṇitakaumudī (1356 CE)', 'Bījagaṇitāvataṃsa'],
    overview:
      'Nārāyaṇa Paṇḍita was an extraordinary medieval mathematician who made groundbreaking advances in combinatorics, systematic permutation generation algorithms (lexicographical ordering), pan-diagonal magic squares (Bhadra-gaṇita), and generalized indeterminate equations.',
    philosophicalContext:
      'Writing during a period of intense cultural transition, Nārāyaṇa Paṇḍita sought to preserve and expand the crown jewels of Indian arithmetic and algebra, dedicating Chapter 14 of Gaṇitakaumudī entirely to magic squares and combinatorial puzzles.',
    featuredVerse: {
      sourceText: 'Gaṇitakaumudī (Chapter 14, Bhadra-gaṇita)',
      author: 'Nārāyaṇa Paṇḍita',
      approxDate: '1356 CE',
      verseDevanagari:
        'अङ्कैर्विविधैर्गुणिते पङ्क्तौ पङ्क्तौ समं भवेत् ।\nसर्वदिक्षु समं रूपं भद्रगणितमुच्यते ॥',
      verseIast:
        'aṅkairvividhairguṇite paṅktau paṅktau samaṃ bhavet |\nsarvadikṣu samaṃ rūpaṃ bhadragaṇitamucyate ||',
      wordByWord: [
        { sanskrit: 'अङ्कैः विविधैः', iast: 'aṅkaiḥ vividhaiḥ', meaning: 'with diverse numbers' },
        { sanskrit: 'पङ्क्तौ पङ्क्तौ', iast: 'paṅktau paṅktau', meaning: 'in every row and column' },
        { sanskrit: 'समं भवेत्', iast: 'samaṃ bhavet', meaning: 'the sum becomes identical' },
        { sanskrit: 'सर्वदिक्षु', iast: 'sarvadikṣu', meaning: 'in all directions (including diagonals)' },
        { sanskrit: 'भद्रगणितम्', iast: 'bhadragaṇitam', meaning: 'magic squares / auspicious mathematics' }
      ],
      translation:
        'When distinct numbers are arranged such that their sum across every row, column, and diagonal is identical in all directions, it is termed Bhadragaṇita (the mathematics of magic squares).',
      mathematicalSignificance:
        'Provides deterministic algorithms to construct pan-diagonal, doubly-even, and singly-even magic squares of any order n, anticipating modern matrix algebra.'
    },
    breakthroughs: [
      {
        id: 'systematic-permutations',
        title: 'Lexicographic Permutation Algorithm',
        sanskritTerm: 'प्रस्तार-क्रम-पद्धतिः (Prastāra-Krama-Paddhatiḥ)',
        modernEquivalent: 'Lexicographical Generation of Permutations',
        description:
          'The first systematic algorithm in world literature to generate all n! permutations of a set in exact lexicographical order without repetition or omission.',
        formulaDisplay: 'Total Permutations = n!',
        historicalSignificance:
          'Published over three centuries before European mathematicians like Trotter and Johnson formulated permutation algorithms in the 1960s.'
      },
      {
        id: 'pan-diagonal-magic-squares',
        title: 'Pan-Diagonal Magic Squares (Bhadragaṇita)',
        sanskritTerm: 'भद्र-गणितम् (Bhadra-Gaṇitam)',
        modernEquivalent: 'Pan-Diagonal Magic Squares & Matrix Invariants',
        description:
          'Exhaustive rules for constructing 4×4 pan-diagonal squares where rows, columns, main diagonals, and broken diagonals all yield the exact same magic constant (e.g. sum = 34).',
        formulaDisplay: 'Magic Constant M(n) = n(n² + 1) / 2',
        historicalSignificance:
          'Represented the world’s most advanced systematic combinatorial matrix study of its era.'
      },
      {
        id: 'extended-indeterminate-equations',
        title: 'Higher-Degree Indeterminate Equations',
        sanskritTerm: 'कुट्टक-भावना-विस्तारः (Kuṭṭaka-Bhāvanā-Vistāraḥ)',
        modernEquivalent: 'Generalized Diophantine Systems',
        description:
          'Generalized Bhāskara II’s Chakravāla to higher-degree polynomial equations and systems with multiple unknowns.',
        formulaDisplay: 'ax + by + cz = d,   y² = Nx² + c',
        historicalSignificance:
          'Maintained the vital northern continuity of Indian algebra alongside the rising Kerala School in the south.'
      }
    ],
    epistemicEvolution:
      'Turned combinatorics into a full algorithmic science, pioneering matrix invariants and systematic permutation trees.',
    interactiveDemoId: 'narayana'
  },
  {
    id: 'era-11-kerala-school-calculus',
    eraNumber: 11,
    slug: 'kerala-school-birth-of-calculus',
    titleSa: 'केरलीय-गणित-परम्परा (कलन-शास्त्रस्य जननी)',
    titleIast: 'Keralīya-Gaṇita-Paramparā (Kalana-Śāstrasya Jananī)',
    titleEn: 'The Kerala School: Infinite Series, Analysis & The Birth of Calculus',
    approxPeriod: '1350 CE – 1600 CE',
    centuryLabel: '14th–16th Century CE',
    geographicCenters: ['Saṅgamagrāma (Irinjalakuda, Kerala)', 'Nīlā River Basin (Bharathapuzha)', 'Tirūr', 'Cochin'],
    keyPolymaths: [
      'Mādhava of Saṅgamagrāma (1340–1425 CE)',
      'Parameśvara of Vadaśśeri (1380–1460 CE)',
      'Dāmodara (15th c. CE)',
      'Nīlakaṇṭha Somayājī (1444–1544 CE)',
      'Jyeṣṭhadeva (1500–1610 CE)'
    ],
    primaryTexts: [
      'Veṇvāroha (Mādhava)',
      'Drg-gaṇita (Parameśvara)',
      'Tantrasaṅgraha (Nīlakaṇṭha, 1501 CE)',
      'Āryabhaṭīyabhāṣya (Nīlakaṇṭha)',
      'Yuktibhāṣā (Jyeṣṭhadeva, 1530 CE)'
    ],
    overview:
      'The Kerala School represents one of the most stunning chapters in the entire history of human science. Flourishing along the banks of the Bharathapuzha river, Mādhava and his lineage developed infinite series expansions for trigonometric functions, power series for π, differentiation, integration, and fast-converging remainder correction terms—founding mathematical analysis 300 years before Gregory, Leibniz, and Newton.',
    philosophicalContext:
      'Kerala astronomers sought absolute sidereal precision for celestial navigation and temple calendars (Dṛk-siddha - matching direct observation). Recognizing the inadequacy of discrete chord tables, Mādhava conceived the circle as an infinite-sided polygon, integrating infinitesimal arc segments (Cāpa) through limit processes.',
    featuredVerse: {
      sourceText: 'Tantrasaṅgraha / Yuktibhāṣā (Mādhava’s Infinite Series for π)',
      author: 'Mādhava of Saṅgamagrāma (cited by Jyeṣṭhadeva)',
      approxDate: 'c. 1400 CE',
      verseDevanagari:
        'व्यासे वारिधिनिहते रूपहृते व्याससागराभिहते ।\nत्रिशरादिविषमसंख्याभक्तमृणं स्वं पृथक् क्रमात् कुर्यात् ॥',
      verseIast:
        'vyāse vāridhinihate rūpahṛte vyāsasāgarābhihate |\ntriśarādiviṣamasaṅkhyābhaktamṛṇaṃ svaṃ pṛthak kramāt kuryāt ||',
      wordByWord: [
        { sanskrit: 'व्यासे वारिधिनिहते', iast: 'vyāse vāridhinihate', meaning: 'diameter multiplied by 4 (vāridhi = 4 oceans)' },
        { sanskrit: 'रूपहृते', iast: 'rūpahṛte', meaning: 'divided by 1 (first term)' },
        { sanskrit: 'व्याससागराभिहते', iast: 'vyāsasāgarābhihate', meaning: 'diameter multiplied by 4' },
        { sanskrit: 'त्रिशरादि', iast: 'tri-śarādi', meaning: 'by odd numbers: 3, 5 (śara = 5 arrows), etc.' },
        { sanskrit: 'विषमसंख्याभक्तम्', iast: 'viṣamasaṅkhyābhaktam', meaning: 'divided by odd numbers' },
        { sanskrit: 'ऋणं स्वं पृथक् क्रमात्', iast: 'ṛṇaṃ svaṃ pṛthak kramāt', meaning: 'subtracted and added alternately' }
      ],
      translation:
        'Multiply the diameter by 4 and divide by 1. Separately multiply the diameter by 4 and divide by the odd numbers 3, 5, 7... and alternately subtract and add them. The result is the exact circumference of the circle.',
      mathematicalSignificance:
        'The world’s first infinite series for π: C = 4D(1 - 1/3 + 1/5 - 1/7 + ...), or π/4 = 1 - 1/3 + 1/5 - 1/7 + ... Formulated by Mādhava in 1400 CE, three centuries before James Gregory (1671 CE) and Gottfried Leibniz (1673 CE).'
    },
    breakthroughs: [
      {
        id: 'madhava-leibniz-series',
        title: 'Mādhava-Leibniz Series for π & Arctangent',
        sanskritTerm: 'माधव-वृत्तपरिधि-श्रेणी (Mādhava-Vṛttaparidhi-Śreṇī)',
        modernEquivalent: 'arctan(x) = x - x³/3 + x⁵/5 - x⁷/7 + ...  and  π/4 = ∑ (-1)ⁿ / (2n + 1)',
        description:
          'Derived the general arctangent power series and the specific π series, providing rapid-convergence correction terms Fₙ(n) to compute π to 11 and 13 decimal places.',
        formulaDisplay: 'π/4 = 1 - 1/3 + 1/5 - 1/7 + 1/9 - ... ± Remainder(n)',
        historicalSignificance:
          'Proves that infinite series and calculus analysis originated in Kerala centuries before European rediscovery.'
      },
      {
        id: 'madhava-newton-sine-series',
        title: 'Mādhava-Newton Power Series for Sine & Cosine',
        sanskritTerm: 'माधव-ज्या-कोटिज्या-श्रेणी (Mādhava-Jyā-Koṭijyā-Śreṇī)',
        modernEquivalent: 'sin(x) = x - x³/3! + x⁵/5! - x⁷/7! + ...',
        description:
          'Expanded sine and cosine into infinite Taylor-Maclaurin series expansions over 250 years before Isaac Newton and Brook Taylor.',
        formulaDisplay: 'sin(x) = x - x³/3! + x⁵/5! - x⁷/7! + ...,   cos(x) = 1 - x²/2! + x⁴/4! - x⁶/6! + ...',
        historicalSignificance:
          'Represented the first true power series expansions for transcendental trigonometric functions in history.'
      },
      {
        id: 'yuktibhasa-calculus-text',
        title: 'Yuktibhāṣā: The World’s First Calculus Textbook',
        sanskritTerm: 'युक्तिभाषा (Yuktibhāṣā)',
        modernEquivalent: 'Foundational Textbook of Differential & Integral Calculus',
        description:
          'Authored by Jyeṣṭhadeva in Malayalam and Sanskrit (c. 1530 CE), it provides systematic geometric derivations (Upapatti) for all series, limit processes, and integration of xⁿ dx.',
        formulaDisplay: '∫ xⁿ dx = xⁿ⁺¹ / (n + 1)  (Samākalanam via Saṅkalita)',
        historicalSignificance:
          'Pre-dates European calculus treatises by over a century, providing explicit visual and algebraic proofs.'
      },
      {
        id: 'nilakantha-heliocentric-model',
        title: 'Nīlakaṇṭha’s Quasi-Heliocentric Planetary Model',
        sanskritTerm: 'तन्त्रसङ्ग्रह-ग्रहगति-प्रतिरूपकम् (Tantrasaṅgraha-Grahagati-Pratirūpakam)',
        modernEquivalent: 'Tychonic Planetary Model (Planets orbit Sun, Sun orbits Earth)',
        description:
          'In 1501 CE, Nīlakaṇṭha proved that the inner planets (Mercury, Venus) and outer planets (Mars, Jupiter, Saturn) orbit the Sun, which in turn revolves around the Earth.',
        formulaDisplay: 'Planetary Equation: Heliocentric coordinates mapped to geocentric observations',
        historicalSignificance:
          'Formulated 87 years before Tycho Brahe (1588 CE) and mathematically superior to contemporary European models.'
      }
    ],
    epistemicEvolution:
      'Transformed Indian mathematics into modern mathematical analysis, inventing infinite series and the fundamentals of calculus.',
    interactiveDemoId: 'kerala'
  },
  {
    id: 'era-12-modern-bridges',
    eraNumber: 12,
    slug: 'modern-resurgence-ramanujan',
    titleSa: 'आधुनिक-पुनर्जागरण-युगम्',
    titleIast: 'Ādhunika-Punarjāgaraṇa-Yugam',
    titleEn: 'Modern Resurgence: Rāmānujan, Vedic Mathematics & Global Frontiers',
    approxPeriod: '1887 CE – Present',
    centuryLabel: '19th–21st Century CE',
    geographicCenters: ['Kumbakonam / Madras', 'Cambridge (Trinity College)', 'Puri Govardhan Math', 'Bengal / Roorkee'],
    keyPolymaths: [
      'Śrīnivāsa Rāmānujan (1887–1920)',
      'Swami Bhāratī Kṛṣṇa Tīrtha (1884–1960)',
      'P. C. Mahalanobis (1893–1972)',
      'C. R. Rao (1920–2023)',
      'Harish-Chandra (1923–1983)',
      'Manjul Bhargava (Fields Medalist 2014)',
      'Akshay Venkatesh (Fields Medalist 2018)'
    ],
    primaryTexts: [
      'Ramanujan’s Notebooks & Lost Notebook',
      'Vedic Mathematics (Swami Bharati Krishna Tirtha, 1965)',
      'Sankhyā: The Indian Journal of Statistics',
      'Higher Composition Laws (Manjul Bhargava)'
    ],
    overview:
      'The modern era witnessed the explosive global resurgence of Indian mathematical genius. Srinivasa Ramanujan’s uncanny intuition unlocked mock theta functions, partition asymptotics, and infinite series for 1/π. Swami Bharati Krishna Tirtha reconstructed 16 Vedic mental calculation sutras, while modern giants continue pioneering fields from statistics to Fields Medal-winning algebraic number theory.',
    philosophicalContext:
      'Ramanujan famously stated: "An equation for me has no meaning unless it expresses a thought of God." His work proved that the ancient Indian tradition of deep intuitive pattern recognition, meditative absorption, and holistic mathematical synthesis remains vibrantly alive.',
    featuredVerse: {
      sourceText: 'Ramanujan’s Formula for 1/π (1914)',
      author: 'Śrīnivāsa Rāmānujan',
      approxDate: '1914 CE',
      verseDevanagari:
        '॥ अनन्त-श्रेणी-समाधानम् ॥\n१/π = (२√२ / ९८०१) ∑ [(४k)!(११०३ + २६३९०k) / ((k!)⁴ ३९६⁴ᵏ)]',
      verseIast:
        '|| Ananta-Śreṇī-Samādhānam ||\n1/π = (2√2 / 9801) ∑ [(4k)!(1103 + 26390k) / ((k!)⁴ 396⁴ᵏ)]',
      wordByWord: [
        { sanskrit: '१/π', iast: '1/π', meaning: 'reciprocal of pi' },
        { sanskrit: 'अनन्त-श्रेणी', iast: 'ananta-śreṇī', meaning: 'hyper-convergent infinite series' },
        { sanskrit: '२६३९०k', iast: '26390k', meaning: 'Ramanujan modular term' }
      ],
      translation:
        'The hyper-convergent infinite series for 1/π, where each successive term delivers 8 additional correct decimal places of π.',
      mathematicalSignificance:
        'Used in modern supercomputers to compute billions of digits of π; established the foundation for modern elliptic modular function algorithms.'
    },
    breakthroughs: [
      {
        id: 'ramanujan-pi-series',
        title: 'Hyper-Convergent Series for 1/π',
        sanskritTerm: 'रामानुजन्-अनन्त-श्रेणी (Rāmānujan-Ananta-Śreṇī)',
        modernEquivalent: 'Elliptic Modular Series for 1/π',
        description:
          'Formula: 1/π = (2√2 / 9801) ∑ [(4k)!(1103 + 26390k) / ((k!)⁴ 396⁴ᵏ)]. First term alone yields π correct to 6 decimal places.',
        formulaDisplay: '1/π = (2√2 / 9801) ∑ₖ₌₀^∞ [(4k)!(1103 + 26390k)] / [(k!)⁴ · 396⁴ᵏ]',
        historicalSignificance:
          'Revolutionized computational number theory and supercomputer algorithm benchmarks.'
      },
      {
        id: 'ramanujan-hardy-taxicab',
        title: 'Partition Asymptotics & The Taxicab Number (1729)',
        sanskritTerm: 'विभाजन-सिद्धान्तः (Vibhājana-Siddhāntaḥ)',
        modernEquivalent: 'Hardy-Ramanujan Partition Formula: p(n) ~ exp(π√(2n/3)) / (4n√3)',
        description:
          '1729 is the smallest number expressible as the sum of two positive cubes in two different ways: 1729 = 1³ + 12³ = 9³ + 10³.',
        formulaDisplay: '1729 = 1³ + 12³ = 9³ + 10³',
        historicalSignificance:
          'Sparked modern modular forms and string theory compactification mathematics.'
      },
      {
        id: 'vedic-maths-sutras',
        title: 'The 16 Vedic Mathematics Sūtras',
        sanskritTerm: 'षोडश-वैदिक-सूत्राणि (Ṣoḍaśa-Vaidika-Sūtrāṇi)',
        modernEquivalent: 'Mental Arithmetic Algorithms & VLSI Multiplier Architectures',
        description:
          'Reconstructed by Jagadguru Swami Bharati Krishna Tirtha (1884–1960). Algorithms like Ūrdhva-Tiryagbhyām and Nikhilam power today’s fastest, low-power VLSI microchip digital signal processors.',
        formulaDisplay: 'Ūrdhva-Tiryagbhyām: Cross-and-vertical parallel convolution',
        historicalSignificance:
          'Eradicated math anxiety for millions while accelerating modern cryptographic microchip designs.'
      },
      {
        id: 'modern-fields-medals',
        title: 'Bhargava’s Higher Composition Laws & 21st-Century Indian Math',
        sanskritTerm: 'उच्चतर-भावना-सिद्धान्तः (Uccatara-Bhāvanā-Siddhāntaḥ)',
        modernEquivalent: 'Manjul Bhargava Fields Medal (2014) on Gauss & Brahmagupta Laws',
        description:
          'Princeton mathematician Manjul Bhargava generalized Brahmagupta’s 628 CE Bhāvanā identity to cubic and quartic rings, earning the 2014 Fields Medal.',
        formulaDisplay: '2×2×2 Cubes <-> Higher Composition Laws on Rings',
        historicalSignificance:
          'Direct proof of the living unbroken continuum of Indian mathematical methods inspiring highest 21st-century accolades.'
      }
    ],
    epistemicEvolution:
      'Unified ancient intuitive Sūtras with modern quantum, algorithmic, and algebraic number theory.',
    interactiveDemoId: 'ramanujan'
  }
];
