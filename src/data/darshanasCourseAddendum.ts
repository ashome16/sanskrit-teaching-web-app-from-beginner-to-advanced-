/**
 * COURSE ADDENDUM DATA
 * 
 * Title: षड्दर्शनानि साङ्ख्यं च — तत्त्वमीमांसा, आत्मसाक्षात्कारः, वैदिकगणितस्य च विकासः
 * Subtitle: Foundations of Reality: The Six Darśanas, Sāṅkhya Taxonomy, and Vedic Mathematics
 * 
 * 4 Comprehensive Parts:
 * Part 1: The Shad Darshanas – The Six Luminescent Pathways to Reality
 * Part 2: The Singular Foundation – Self-Discovery and Universal Phenomenon
 * Part 3: Quantitative Enumeration of Matter – Sankhya Darshan's Tattva System
 * Part 4: Evolution of Vedic Mathematics – Math as Structure, Vibration as Brick
 */

export interface DarshanaSutra {
  sanskrit: string;
  transliteration: string;
  meaning: string;
  source: string;
}

export interface DarshanaSection {
  heading: string;
  subheading?: string;
  paragraphs: string[];
  callout?: {
    title: string;
    text: string;
    type: 'philosophical' | 'scientific' | 'cosmological' | 'insight';
  };
  table?: {
    headers: string[];
    rows: string[][];
  };
  sutras?: DarshanaSutra[];
}

export interface DarshanaAddendumArticle {
  id: string;
  partNumber: number;
  slug: string;
  titleDevanagari: string;
  titleEnglish: string;
  subtitle: string;
  readingTimeMinutes: number;
  kicker: string;
  summary: string;
  sections: DarshanaSection[];
  keyTakeaways: string[];
}

export const DARSHANAS_COURSE_ADDENDUM: DarshanaAddendumArticle[] = [
  // ==========================================
  // PART 1: THE SHAD DARSHANAS
  // ==========================================
  {
    id: 'addendum-part-1-shad-darshanas',
    partNumber: 1,
    slug: 'shad-darshanas-pathways-to-reality',
    titleDevanagari: 'षड्दर्शनानि — षड्दीप्तमार्गाः',
    titleEnglish: 'The Shad Darshanas: The Six Luminescent Pathways to Reality',
    subtitle: 'The Systematic Dismantling of Illusion to Perceive the Baseline Architecture of Existence',
    readingTimeMinutes: 9,
    kicker: 'Course Addendum · Part 1 of 4 · Epistemology & Ontology',
    summary:
      'For millennia, classical Indian thought has approached reality not as a dogmatic belief, but as an empirical science of perception. Derived from the root dṛś ("to see"), the six orthodox Darśanas operate as three symbiotic pairs of lenses—from Nyāya’s rigorous logic and Vaiśeṣika’s atomic physics, to Sāṅkhya’s cosmic taxonomy and Yoga’s psychophysical mechanics, culminating in Mīmāṃsā’s acoustic duty and Vedānta’s non-dual realization.',
    sections: [
      {
        heading: 'Instruments of Vision, Not Passive Theories',
        subheading: 'The Etymology and Teleology of Darśana',
        paragraphs: [
          'For millennia, the Indian subcontinent has harbored a profound obsession: the systematic dismantling of illusion to perceive the baseline architecture of existence. This intellectual and spiritual quest crystalized into the Shad Darshanas (षड्दर्शनानि)—the six orthodox (Āstika) schools of classical Indian philosophy.',
          'Derived from the Sanskrit verbal root dṛś (दृश्, meaning "to see" or "to perceive"), a Darśana is not a passive academic hypothesis or speculative theology. It is an "instrument of direct vision" (दृश्यते अनेन इति दर्शनम्). It is a precision-engineered cognitive lens designed to perceive ultimate reality (Tattva), dissolve fundamental suffering (Duḥkha-nivṛtti), and engineer the liberation (Mokṣa) of human consciousness.',
          'These six systems do not compete as hostile dogmas; rather, they operate as three symbiotic pairs. Each pair provides a complementary methodology—ranging from rigorous formal logic and atomic physics to psycho-spiritual mechanics and metaphysical synthesis. Together, they form a cohesive, multi-layered spectrum of inquiry that approaches the cosmos simultaneously from the physical, the logical, the psychological, and the transcendent planes.',
        ],
        callout: {
          title: 'The Core Definition of Darśana',
          text: '“दृश्यते अनेन इति दर्शनम्” — That through which Reality is directly seen, apprehended, and verified in conscious experience.',
          type: 'philosophical',
        },
      },
      {
        heading: 'Pair 1: The Analytical Systems — Nyāya and Vaiśeṣika',
        subheading: 'Epistemology (How We Know) and Ontology (What Exists)',
        paragraphs: [
          'The first pair establishes the foundational rules of verification. Before the intellect can dare to contemplate the unmanifest absolute, it must ensure that its instruments of perception, deduction, and linguistic meaning are entirely free of defect.',
          'Nyāya (The School of Logic): Codified by Sage Akṣapāda Gautama in the Nyāya Sūtras, Nyāya is the bedrock of Indian logical realism. It asserts that human suffering is born of ignorance (Mithyā-jñāna), which can only be eradicated through flawless, verifiable knowledge (Tattva-jñāna). Nyāya introduces an exhaustive 16-category system of dialectical inquiry (Padārthas like Pramāṇa, Prameya, Saṃśaya, and Tarka) and pioneers a rigorous four-factor epistemology. It validates truth strictly through Pramāṇas (valid means of knowledge): Direct Perception (Pratyakṣa), Inference (Anumāna), Analogical Comparison (Upamāna), and Valid Verbal Testimony (Śabda). Nyāya establishes that unassailable, disciplined logic is the irreplaceable first step toward inner liberation.',
          'Vaiśeṣika (Atomistic Pluralism): Founded by Sage Kaṇāda (traditionally depicted as picking up scattered grains in fields to contemplate the smallest units of matter), Vaiśeṣika complements Nyāya’s epistemological engine by turning its gaze to the physical universe. Centuries before Democritus, Kaṇāda formulated a thorough atomic cosmology.',
          'Vaiśeṣika posits that the entire physical universe is reducible to Paramāṇu (परमाणु — indivisible, dimensionless, indestructible point-particles of matter). These eternal atoms are animated and assembled by an unseen cosmic dynamic principle (Adṛṣṭa). Vaiśeṣika systematically categorizes the entire knowable cosmos into seven Padārthas (categories of reality): Substance (Dravya), Quality (Guṇa), Action (Karma), Universality (Sāmānya), Particularity (Viśeṣa — from which the school derives its name), Inherence (Samavāya), and Non-existence (Abhāva). By understanding the precise mathematical mechanics of matter, the conscious observer learns to disentangle its identity from physical substrate.',
        ],
        table: {
          headers: ['Category (Padārtha)', 'Definition', 'Physical & Cognitive Function'],
          rows: [
            ['Dravya (द्रव्य)', 'Substance', '9 foundational substances: 5 elements (Earth, Water, Fire, Air, Space) + Time, Space, Soul (Ātman), and Mind (Manas)'],
            ['Guṇa (गुण)', 'Quality / Attribute', '24 distinct qualities residing in substances (color, taste, number, dimension, conjunction, velocity)'],
            ['Karma (कर्म)', 'Motion / Dynamic Action', 'Physical displacement and activity (upward, downward, contraction, expansion, locomotion)'],
            ['Sāmānya (सामान्य)', 'Generality / Universal', 'The common essence that unites particulars into classes (e.g. cowness in all cows, mass in matter)'],
            ['Viśeṣa (विशेष)', 'Particularity / Individuation', 'The ultimate discriminator distinguishing individual eternal atoms and liberated souls'],
            ['Samavāya (समवाय)', 'Inseparable Inherence', 'The eternal, indivisible relation binding whole and parts, quality and substance (e.g. fire and heat)'],
            ['Abhāva (अभाव)', 'Non-Existence / Negation', 'Recognized as an objective reality: prior absence, destruction, absolute negation, and mutual exclusion'],
          ],
        },
      },
      {
        heading: 'Pair 2: The Experiential Systems — Sāṅkhya and Yoga',
        subheading: 'Internal Mechanics of Consciousness, Matter, and the Psyche',
        paragraphs: [
          'The second pair shifts inquiry from external objects and logical categories to the deep interior mechanics of consciousness, the human mind, and evolutionary biology.',
          'Sāṅkhya (The Dualistic Enumeration): Founded by Sage Kapila, Sāṅkhya is an intensely analytical, rationalist system that maps the cosmos through numbers, components, and cause-and-effect sequences. Rejecting the necessity of an interventionist creator deity, Sāṅkhya models the cosmos through a profound dualism: Puruṣa (pure, unattached, uncaused witness-consciousness) and Prakṛti (primordial, dynamic, unmanifested nature composed of the three Guṇas).',
          'Sāṅkhya enumerates the 25 Tattvas (cosmic principles) through which the universe evolves when Puruṣa casts its proximity upon Prakṛti. It represents humanity’s earliest evolutionary blueprint explaining how spirit becomes entangled in the software and hardware of matter.',
          'Yoga (The Psychophysical Disciplines): Codified by Sage Patañjali in the Yoga Sūtras, Yoga accepts the theoretical cosmology and 25 Tattvas of Sāṅkhya, but transforms it into an empirical, experimental laboratory. Recognizing that intellectual understanding alone cannot shatter psychological suffering, Yoga provides the practical methodology to directly experience the independence of Puruṣa from Prakṛti.',
          'Through the Eight Limbs of Yoga (Aṣṭāṅga Yoga)—spanning ethical restraints (Yama), internal observances (Niyama), physical posture (Āsana), breath regulation (Prāṇāyāma), sensory withdrawal (Pratyāhāra), focused concentration (Dhāraṇā), unbroken meditative contemplation (Dhyāna), and transcendental absorption (Samādhi)—Yoga systematically quietens the fluctuating waves of the mental apparatus (Citta-vṛtti-nirodha). It is the empirical technology used to realize the freedom that Sāṅkhya mathematically maps.',
        ],
        sutras: [
          {
            sanskrit: 'योगश्चित्तवृत्तिनिरोधः ॥',
            transliteration: 'yogaś citta-vṛtti-nirodhaḥ',
            meaning: 'Yoga is the intentional stilling of the fluctuating modifications of the mind-field.',
            source: 'Patañjali Yoga Sūtra 1.2',
          },
          {
            sanskrit: 'तदा द्रष्टुः स्वरूपेऽवस्थानम् ॥',
            transliteration: 'tadā draṣṭuḥ sva-rūpe \'vasthānam',
            meaning: 'Then the Witness (Puruṣa) rests established in its own true, unconditioned nature.',
            source: 'Patañjali Yoga Sūtra 1.3',
          },
        ],
      },
      {
        heading: 'Pair 3: The Transcendent Systems — Mīmāṃsā and Vedānta',
        subheading: 'Acoustic Duty and Non-Dual Realization of the Absolute',
        paragraphs: [
          'The final pair returns directly to the source wellspring of Indian civilization—the Vedic texts—progressing from righteous action in human life to the final realization of non-dual reality.',
          'Mīmāṃsā (Ritualistic Hermeneutics / Pūrva Mīmāṃsā): Founded by Sage Jaimini, Mīmāṃsā focuses on the Karma-Kāṇḍa (the action and ritual sections of the Vedas). It is a school of immense linguistic sophistication, investigating the acoustic eternity of sound, the nature of duty (Dharma), and sentence interpretation. Mīmāṃsā argues that the cosmos is uncreated and cyclical, sustained by the precise execution of Vedic sound frequencies and sacrificial action. By harmonizing one’s actions with cosmic rhythm, an individual exhausts karmic debt and upholds cosmic equilibrium (Ṛta).',
          'Vedānta (The Upanishadic Apex / Uttara Mīmāṃsā): Codified by Sage Bādarāyaṇa in the Brahma Sūtras and expounded by Adi Śaṅkara, Rāmānuja, and Madhva, Vedānta shifts inquiry to the Jñāna-Kāṇḍa (the wisdom section of the Upaniṣads). Vedānta transcends physical rituals, logic, and dualistic models to reveal the singular, non-dual foundation of reality.',
          'In Advaita Vedānta, the ultimate truth is captured in the great Mahāvākyas: the individual self (Ātman) is fundamentally identical to the infinite, non-dual substratum of existence (Brahman). The perceived multiplicity of the universe is an apparent superimposition (Māyā / Vivarta). Liberation is not the acquisition of something new, but the sudden, unshakeable awakening to who one has always been.',
        ],
        callout: {
          title: 'The Vedāntic Equation',
          text: '“ब्रह्म सत्यं जगन्मिथ्या जीवो ब्रह्मैव नापरः” — Brahman alone is the ultimate unchanging reality; the empirical world is transient and context-dependent; the individual soul is none other than Brahman itself.',
          type: 'insight',
        },
      },
      {
        heading: 'The Progressive Staircase of Human Inquiry',
        subheading: 'How Six Distinct Perspectives Form One Unified Path',
        paragraphs: [
          'Though these six Darśanas appear distinct on the surface—some emphasizing syllogistic inference, others atomic physics, others dualistic evolution, and still others non-dual transcendence—they are neither contradictory nor fragmented. Classical tradition visualizes them as a calibrated, progressive staircase of human understanding:',
          '1. You sharpen the instrument of the intellect with Nyāya logic, eliminating cognitive bias and invalid deduction.',
          '2. You deconstruct physical matter with Vaiśeṣika, understanding that the sensory universe is composed of atomic configurations.',
          '3. You map the 25 evolutionary layers of mind, ego, and senses with Sāṅkhya, discerning the difference between conscious observer and mechanical nature.',
          '4. You apply the experimental psychophysical tools of Yoga to quieten the nervous system and experience pure consciousness directly.',
          '5. You execute your duty with Mīmāṃsā, harmonizing speech and action with cosmic order.',
          '6. And finally, you dissolve all artificial boundaries in Vedānta, resting in the singular, undivided ground of existence.',
        ],
      },
    ],
    keyTakeaways: [
      'A Darśana is an active "instrument of seeing," calibrated to eliminate suffering and produce direct realization.',
      'The six orthodox systems operate as three symbiotic pairs: Logic/Physics (Nyāya/Vaiśeṣika), Psychology/Practice (Sāṅkhya/Yoga), and Action/Realization (Mīmāṃsā/Vedānta).',
      'Rather than mutually contradictory beliefs, they constitute a progressive epistemological ladder from atomic physical analysis to unitive consciousness.',
    ],
  },

  // ==========================================
  // PART 2: THE SINGULAR FOUNDATION
  // ==========================================
  {
    id: 'addendum-part-2-singular-foundation',
    partNumber: 2,
    slug: 'singular-foundation-self-discovery-universal-phenomenon',
    titleDevanagari: 'एकमेवाद्वितीयम् — आत्मसाक्षात्कारश्च वैश्विकप्रपञ्चश्च',
    titleEnglish: 'The Singular Foundation: Self-Discovery and Universal Phenomenon',
    subtitle: 'How Looking Inward Through Self-Realization Discloses the Singular Architecture of the Cosmos',
    readingTimeMinutes: 10,
    kicker: 'Course Addendum · Part 2 of 4 · Metaphysics & Epistemology',
    summary:
      'While the Shad Darshanas utilize vastly different entry points—ranging from the atomic materialism of Vaisheshika to the fierce logic of Nyaya—they are not competing ideologies. Instead, they represent a unified, multi-tiered assault on human ignorance with a singular objective: the elimination of suffering through the experiential discovery of a solitary, foundational reality.',
    sections: [
      {
        heading: 'The Inseparable Cosmos and Mind',
        subheading: 'Why Cosmology and Psychology Are One',
        paragraphs: [
          'While the Shad Darshanas utilize vastly different entry points—ranging from the atomic materialism of Vaisheshika to the fierce logic of Nyaya—they are not competing ideologies. Instead, they represent a unified, multi-tiered assault on human ignorance. They share a singular, radical objective: the elimination of suffering through the experiential discovery of a solitary, foundational reality.',
          'In the Western philosophical tradition, cosmology (the study of the universe) and psychology (the study of the mind) are frequently treated as distinct disciplines. In classical Indian thought, they are fundamentally inseparable. The macrocosm of the universe is mirrored entirely within the microcosm of the human individual. Therefore, the quest to understand the ultimate reality of the cosmos inevitably resolves into an intense journey of personal self-discovery.',
        ],
        callout: {
          title: 'The Microcosm-Macrocosm Axiom',
          text: 'The macrocosm of the universe is mirrored entirely within the microcosm of the human individual. To understand the cosmos, one must decode the conscious observer.',
          type: 'cosmological',
        },
      },
      {
        heading: 'The Architecture of Illusion: Why We Suffer',
        subheading: 'Avidyā and the Systemic Error in Perception',
        paragraphs: [
          'At the core of all six orthodox systems lies a shared diagnostic premise: human suffering (Duḥkha) is not an intrinsic property of existence, but a systemic error in perception.',
          'We experience pain, anxiety, and limitation because we misidentify ourselves. We mistake the transient instruments of existence—our physical bodies, our fluctuating thoughts, our societal egos, and our sensory cravings—for our true, unchanging identity.',
          'This state of fundamental ignorance (Avidyā) creates a false fracture in reality, splitting a unified universe into a chaotic matrix of "me" versus "not-me."',
          'To heal this fracture, the Darshanas do not ask for blind faith. They demand an active, experimental dismantling of this illusion. By systematically peeling back the layers of what we are not, the baseline foundation of what we are naturally reveals itself.',
        ],
        callout: {
          title: 'The Root Diagnostic',
          text: '“अविद्यास्मितारागद्वेषाभिनिवेशाः क्लेशाः” — Fundamental ignorance (Avidyā) splits the indivisible continuum into the false friction of me vs not-me, generating all suffering.',
          type: 'philosophical',
        },
      },
      {
        heading: 'The Inward Mirror: Mapping the Self to the Cosmos',
        subheading: 'Three Stages of Inward Navigation',
        paragraphs: [
          'The bridge between self-discovery and the universal phenomenon is built on a profound metaphysical law: the fundamental structural mechanics of the universe can be accessed directly by looking inward. Each school provides a unique methodology to navigate this inward path, mapping the micro-macrocosm connection:',
          '• From Atoms to Detachment: In Vaiśeṣika, when an individual understands that the physical body is merely a temporary collection of cosmic atoms (Paramāṇu) governed by universal laws, the personal ego begins to dissolve. The realization that "I am not this flesh, but the consciousness witnessing its atomic dance" brings profound liberation.',
          '• From Cognition to Pure Witness: In Sāṅkhya and Yoga, self-discovery is treated as an exact psychological science. By tracking the evolutionary descent of matter, the seeker learns to separate Prakṛti (the physical body, mind, and thoughts) from Puruṣa (pure, unattached consciousness). Yoga provides the experiential technology to quiet the mind’s ripples, allowing the individual to rest in the silent depths of the true Self.',
          '• From Individual Soul to Cosmic Absolute: This inward journey reaches its absolute zenith in Vedānta. Vedānta declares that the deepest, innermost core of an individual—the Ātman (the true Soul)—is not separate, isolated, or finite. It is entirely identical to Brahman, the singular, uncaused, infinite foundation of the entire cosmos.',
        ],
        sutras: [
          {
            sanskrit: 'अयमात्मा ब्रह्म ॥',
            transliteration: 'ayam ātmā brahma',
            meaning: 'This individual Self (Atman) is identical to the ultimate cosmic reality (Brahman).',
            source: 'Māṇḍūkya Upaniṣad 1.2',
          },
        ],
      },
      {
        heading: 'The Discovery of the Singular Foundation',
        subheading: 'The Collapse of Multiplicity into the Screen of Being',
        paragraphs: [
          'When self-discovery is pushed to its logical and experiential limits across these schools, the seeker breaks through the illusion of multiplicity. They discover the Universal Phenomenon: a singular foundation that underlies all changing forms.',
          'This singular foundation is described not as a vacuum of nothingness, but as a boundless ocean of consciousness. It is the silent, unmoving screen upon which the cinematic masterpiece of the universe is projected.',
          'Matter changes, stars collapse, bodies age, and thoughts flicker by, but the foundational screen remains entirely untouched, pristine, and eternal.',
        ],
        table: {
          headers: ['Cosmic Dimension', 'Individual Dimension', 'Experiential Realization'],
          rows: [
            ['Brahman (The Infinite Reality underlying the entire universe)', 'Ātman (The Unchanging Core of the human individual)', 'The individual soul is fundamentally identical to cosmic reality.'],
            ['Prakṛti (The Primordial Energy forming all physical matter)', 'Puruṣa (The Silent Witness observing sensory & mental states)', 'Consciousness is the sovereign witness, disentangled from mechanical nature.'],
            ['Universal Cosmos (Macrocosm)', 'Individual Being (Microcosm)', 'The ultimate realization that the Individual and the Cosmic are fundamentally ONE.'],
          ],
        },
      },
      {
        heading: 'Liberation: The Ultimate Awakening',
        subheading: 'The Drop Recognizing Itself as the Entire Ocean',
        paragraphs: [
          'In this traditional framework, self-discovery is not an intellectual pastime or an emotional coping mechanism. It is a total, irreversible transformation of consciousness known as Mokṣa or Kaivalya (liberation).',
          'When the seeker realizes that their true identity is identical to the singular foundation of the universe, the fear of death, limitation, and lack vanishes entirely.',
          'You no longer see yourself as a fragile drop of water desperately fighting to survive in a hostile world. You realize that you are the entire ocean, momentarily expressing itself as a drop.',
          'The quest to understand outer reality ends precisely where it began: in the silent, luminous depths of your own being.',
        ],
        callout: {
          title: 'The Culmination',
          text: '“You are not a drop in the ocean fighting to survive; you are the entire ocean expressing itself momentarily as a drop.”',
          type: 'insight',
        },
      },
    ],
    keyTakeaways: [
      'Cosmology and psychology are fundamentally inseparable in Indian philosophy; the macrocosm is mirrored in the human microcosm.',
      'Suffering (Duḥkha) is a systemic error in perception (Avidyā) born from misidentifying temporary instruments for our true identity.',
      'Vaiśeṣika dissolves bodily ego through atomic physics; Sāṅkhya & Yoga separate mechanical mind from pure witness; Vedānta reveals the identity of Ātman and Brahman.',
      'Mokṣa (liberation) is the awakening that you are not a fragile drop fighting reality, but the infinite ocean of being itself.',
    ],
  },

  // ==========================================
  // PART 3: QUANTITATIVE ENUMERATION OF MATTER
  // ==========================================
  {
    id: 'addendum-part-3-sankhya-tattvas',
    partNumber: 3,
    slug: 'quantitative-enumeration-of-matter-sankhya-tattvas',
    titleDevanagari: 'साङ्ख्यदर्शनम् — तत्त्वानां संख्यात्मकं वर्गीकरणम्',
    titleEnglish: "Quantitative Enumeration of Matter: Sankhya Darshan's Tattva System",
    subtitle: 'The 25 Principles of Cosmic Evolution: From Pure Witness to Gross Elements',
    readingTimeMinutes: 12,
    kicker: 'Course Addendum · Part 3 of 4 · Cosmology & Taxonomy',
    summary:
      'Sāṅkhya is humanity’s first systematic, computational taxonomy of the universe. Named after Saṅkhyā (precise calculation, rigorous enumeration), Sage Kapila’s system models how unmanifest nature (Prakṛti) undergoes algorithmic phase-shifts when illuminated by pure witness consciousness (Puruṣa). Learn the precise mechanics of the 25 Tattvas: the three Guṇas, the emergence of cosmic intelligence (Mahat), individuation (Ahaṅkāra), the 11 senses, the 5 quantum potentials (Tanmātras), and the 5 physical elements (Mahābhūtas).',
    sections: [
      {
        heading: 'Saṅkhyā: The Science of Exact Enumeration',
        subheading: 'Why Kapila’s Philosophy is Built on Number',
        paragraphs: [
          'The word Sāṅkhya (साङ्ख्य) derives from the Sanskrit root saṅkhyā (संख्या), meaning "number," "enumeration," "precise calculation," or "discriminative discernment" (सम्यक् ख्यायते प्रकाश्यते वस्तुतत्त्वम् अनया). Sāṅkhya is neither a speculative myth nor an emotional theology; it is a cold, rigorous, algorithmic inventory of reality.',
          'Founded by Sage Kapila (celebrated in the Śrīmad Bhāgavatam and the Gītā as the foremost among seers: "सिद्धेषु कपिलो मुनिः"), Sāṅkhya asserted over 2,500 years ago that nature is governed by immutable laws of conservation. Long before Antoine Lavoisier formulated the conservation of mass, Sāṅkhya established the doctrine of Satkāryavāda (सत्कार्यवाद) — the principle that nothing can be produced from non-existence, and nothing that exists can be utterly destroyed. The effect pre-exists in the cause; evolution (Pariṇāma) is merely the explicit manifestation of what was previously implicit.',
        ],
        sutras: [
          {
            sanskrit: 'असदकरणादुपादानग्रहणात् सर्वसम्भवाभावात् । शक्तस्य शक्यकरणात् कारणभावाच्च सत्कार्यम् ॥',
            transliteration: 'asad-akaraṇād upādāna-grahaṇāt sarva-sambhavābhāvāt | śaktasya śakya-karaṇāt kāraṇa-bhāvācca sat-kāryam',
            meaning: 'The effect exists in the cause beforehand: because what is non-existent cannot be brought into being; because specific materials must be selected; because everything cannot come from everything; because a cause produces only what it is capable of producing; and because the effect is of the very nature of its cause.',
            source: 'Īśvarakṛṣṇa, Sāṅkhya Kārikā 9',
          },
        ],
      },
      {
        heading: 'The Cosmic Duality: Puruṣa and Prakṛti',
        subheading: 'The Static Witness and the Dynamic Energy Field',
        paragraphs: [
          'Sāṅkhya posits that everything in existence can be categorized into two foundational, eternal entities:',
          '1. Puruṣa (पुरुष — The Pure Witness): Infinite, uncaused, eternal, without qualities, inactive, and unattached. Puruṣa is pure consciousness itself. It does not act, create, or modify; it is the silent, changeless witness (Sākṣī) of all phenomena.',
          '2. Mūlaprakṛti (मूलप्रकृति — Primordial Nature): Unmanifest, dynamic, eternal, and non-conscious potentiality. Prakṛti is the primordial substance of all physical, biological, and psychological realities. It is the cosmic matrix of energy and matter.',
          'In its primordial unmanifest state (Avyakta), Prakṛti exists in complete equilibrium (Sāmyāvasthā) among its three constituent qualities or dynamic strings called the Guṇas:',
          '• Sattva (सत्त्व): The principle of lightness, illumination, clarity, and harmony.',
          '• Rajas (रजस्): The principle of movement, passion, excitation, and kinetic energy.',
          '• Tamas (तमस्): The principle of heaviness, inertia, obstruction, and mass.',
          'So long as the three Guṇas remain in perfect balance, there is no universe—only dormant potentiality. But when Puruṣa casts its conscious proximity upon Prakṛti (like a light shining upon a sleeping dancer), the equilibrium of the Guṇas is perturbed. Rajas begins to churn, Sattva illuminates, Tamas condenses—and the cascade of cosmic evolution begins.',
        ],
      },
      {
        heading: 'The Evolutionary Cascade of the 25 Tattvas',
        subheading: 'The Algorithmic Descent from Mind to Matter',
        paragraphs: [
          'Sāṅkhya maps the descent of reality across 25 exact levels (Tattvas):',
          '• Tattva 1: Puruṣa (Pure Consciousness)',
          '• Tattva 2: Mūlaprakṛti (Unmanifest Primordial Energy)',
          '• Tattva 3: Mahat / Buddhi (Cosmic Intellect): The very first evolute of Prakṛti. It is the cosmic principle of ordering, decision, and discriminative wisdom. In the human being, it manifests as the intellect (Buddhi), which reflects consciousness.',
          '• Tattva 4: Ahaṅkāra (The Individuation Principle / The "I-Maker"): Born from Buddhi, this is the cosmic and psychological force that creates boundaries, dividing the universe into "self" and "other". Ahaṅkāra then branches into three evolutionary streams under the influence of the three Guṇas:',
          'A. Sāttvika Stream (Cognitive & Internal Faculty):',
          '  - Tattva 5: Manas (The Sensory-Coordination Mind / Central Processing Unit)',
          '  - Tattvas 6–10: The 5 Jñānendriyas (Sense Organs of Perception): Hearing (Śrotra), Touch (Tvak), Sight (Cakṣus), Taste (Rasana), and Smell (Ghrāṇa).',
          '  - Tattvas 11–15: The 5 Karmendriyas (Organs of Dynamic Action): Speech (Vāk), Grasping/Hands (Pāṇi), Locomotion/Feet (Pāda), Elimination (Pāyu), and Generation/Reproduction (Upastha).',
          'B. Tāmasika Stream (Quantum Potentials & Gross Matter):',
          '  - Tattvas 16–20: The 5 Tanmātras (Subtle Vibrational Potentials): These are the proto-elemental, quantum-level vibrational essences: Sound-potential (Śabda), Touch/Thermal-potential (Sparśa), Form/Luminous-potential (Rūpa), Flavor/Fluid-potential (Rasa), and Odor/Solid-potential (Gandha).',
          '  - Tattvas 21–25: The 5 Mahābhūtas (Gross Physical Elements): Formed by the compounding and precipitation of the Tanmātras:',
          '    * Ākāśa (Space / Ether): Evolved from Śabda-tanmātra; property is sound / vibration.',
          '    * Vāyu (Air / Gas): Evolved from Śabda + Sparśa; properties are sound and tactile movement.',
          '    * Tejas / Agni (Fire / Plasma): Evolved from Śabda + Sparśa + Rūpa; properties are sound, touch, and luminous form.',
          '    * Āpas / Jala (Water / Liquid): Evolved from Śabda + Sparśa + Rūpa + Rasa; properties are sound, touch, form, and taste/fluidity.',
          '    * Pṛthvī (Earth / Solid): Evolved from all five Tanmātras; properties are sound, touch, form, taste, and mass/solidity.',
          'C. Rājasika Stream (The Kinetic Engine): Rajas acts as the catalytic, driving energy that powers both the Sāttvika cognitive emergence and the Tāmasika material precipitation.',
        ],
        table: {
          headers: ['Tattva Class', 'Count', 'Names / Principles', 'Nature in Evolution'],
          rows: [
            ['Neither Cause nor Effect', '1', 'Puruṣa (Pure Witness Consciousness)', 'Unchanging observer, transcendent, uncaused'],
            ['Cause Only (Prakṛti)', '1', 'Mūlaprakṛti (Avyakta / Primordial Matrix)', 'The root material cause of all manifestation, uncaused itself'],
            ['Both Cause and Effect', '7', 'Mahat, Ahaṅkāra, 5 Tanmātras (Śabda, Sparśa, Rūpa, Rasa, Gandha)', 'Evolved from previous stage; evolves into subsequent stage'],
            ['Effect Only (Vikāra)', '16', 'Manas, 5 Jñānendriyas, 5 Karmendriyas, 5 Mahābhūtas', 'Final terminal products; do not produce further cosmic principles'],
          ],
        },
      },
      {
        heading: 'Sāṅkhya as an Computational Architecture',
        subheading: 'Why this Model Underpins Indian Mathematics and Science',
        paragraphs: [
          'Notice the extraordinary computational symmetry of this model: the universe is not made of arbitrary divine fiats, but is a 25-node state-machine. Physical matter (the 5 elements) is not the starting point of existence; it is the 25th terminal output of an information pipeline that begins in pure informational potential (Prakṛti) and passes through intelligence (Buddhi), data routing (Manas), and vibrational quantization (Tanmātras).',
          'Because the entire physical universe was understood to be quantitatively enumerated through exact components, Indian thinkers were naturally primed for mathematics. If the universe is structured in numerical taxonomies (Tattvas), then the language of geometry and arithmetic is not an artificial human invention—it is the literal source code of nature.',
        ],
      },
    ],
    keyTakeaways: [
      'Sāṅkhya means "rigorous enumeration" and establishes Satkāryavāda—the conservation of mass-energy where the effect pre-exists in the cause.',
      'The 25 Tattvas cleanly map consciousness (Puruṣa), primordial nature (Prakṛti), cosmic intelligence (Buddhi), individuation (Ahaṅkāra), the 11 senses, the 5 quantum Tanmātras, and the 5 gross Mahābhūtas.',
      'Gross matter is the final output of an information-processing pipeline, providing the philosophical foundation for mathematical physics in ancient India.',
    ],
  },

  // ==========================================
  // PART 4: EVOLUTION OF VEDIC MATHEMATICS
  // ==========================================
  {
    id: 'addendum-part-4-vedic-mathematics-vibration',
    partNumber: 4,
    slug: 'evolution-vedic-mathematics-math-structure-vibration-brick',
    titleDevanagari: 'वैदिकगणितस्य विकासः — गणितं विन्यासः, स्पन्दनं च शिला',
    titleEnglish: 'Evolution of Vedic Mathematics: Math as Structure, Vibration as Brick',
    subtitle: 'From the Sulba Sutras to Quantum Standing Waves: How Geometry and Acoustic Resonance Built the Cosmos',
    readingTimeMinutes: 14,
    kicker: 'Course Addendum · Part 4 of 4 · Geometry, Cymatics & Speed Algorithms',
    summary:
      'How did Sāṅkhya’s quantitative enumeration of matter translate into the world’s most advanced early mathematics? The answer lies in a stunning civilizational synthesis: Mathematics is the geometric architecture of the universe, and acoustic vibration (Nāda / Śabda) is its physical brick. Explore the sacred geometry of the Śulba Sūtras, Baudhāyana’s diagonal theorem, the acoustic standing waves of Vedic meters (Chandas), the invention of Śūnya (zero), the Kaṭapayādi cipher, and the pattern-recognition algorithms of the 16 Vedic Mathematics sūtras.',
    sections: [
      {
        heading: 'The Foundational Thesis: Structure and Brick',
        subheading: 'Mathematics as Geometry, Vibration as Substance',
        paragraphs: [
          'If Sāṅkhya provided ancient India with its quantitative taxonomy of matter, Vedic mathematics provided the architectural execution. At the heart of this ancient system lies an insight that resonates directly with 21st-century theoretical physics: Mathematics is the geometric scaffolding of the cosmos, while acoustic vibration is its material brick.',
          'Modern string theory and quantum field theory propose that the fundamental building blocks of nature are not hard little billiard balls, but one-dimensional vibrational modes of energy. A particle is merely a specific frequency of standing wave resonating within multi-dimensional geometric manifolds.',
          'Thousands of years earlier, the Vedic Ṛṣis articulated this identical principle: Reality manifests from Śabda-Brahman (शब्दब्रह्म — vibration as the ultimate source). When vibration crystallizes into physical form, it follows the strict laws of Rekhā-Gaṇita (geometry) and Saṅkhyā (number).',
        ],
        callout: {
          title: 'The Central Synthesis',
          text: '“गणितं विन्यासः, स्पन्दनं च शिला” — Geometry provides the structural coordinates of space; vibrational frequency (Nāda/Spanda) provides the energetic substance filling those coordinates.',
          type: 'cosmological',
        },
      },
      {
        heading: 'The Geometry of Fire: The Śulba Sūtras',
        subheading: 'Baudhāyana, Āpastamba, and the Sacred Geometry of Altars',
        paragraphs: [
          'The earliest explicit treatises on Indian geometry are the Śulba Sūtras (शुल्बसूत्राणि), composed by master geometers such as Baudhāyana (c. 800 BCE), Āpastamba (c. 600 BCE), and Kātyāyana. The word Śulba means "rope" or "measuring cord," signifying the physical instrument used to measure space with millimeter precision.',
          'These texts were not created for commercial surveying, but for constructing the sacred Vedic fire altars (Citīs / Vedis). Each altar—such as the celebrated Śyena-citi (the massive falcon-shaped altar designed to carry human prayer into the infinite)—had to be constructed with absolute geometric and mathematical rigor:',
          '• The total surface area of the altar was fixed at exactly 7.5 square puruṣas (a traditional unit of measure).',
          '• The altar had to be built in exactly five layers of fired bricks, with exactly 200 bricks per layer, so that no two bricks in adjacent layers shared a joint (combating shear stress thousands of years before modern civil engineering).',
          '• In subsequent rituals, the area of the altar had to be systematically increased by exactly 1 square puruṣa without altering the proportions of the falcon’s wings, body, and tail.',
          'This engineering challenge required the invention of advanced geometric transformations: converting a square into a circle of identical area, converting a rectangle into a square, and calculating the exact diagonal ratio of right-angled triangles.',
        ],
        sutras: [
          {
            sanskrit: 'दीर्घचतुरश्रस्याक्ष्णया रज्जुः पार्श्वमानी तिर्यङ्ग्मानी च यत्पृथग्भूते कुरुतस्तदुभयं करोति ॥',
            transliteration: 'dīrghasyākṣṇayā rajjuḥ pārśvamānī tiryaṅmānī ca yatpṛthagbhūte kurutastadubhayaṃ karoti',
            meaning: 'The diagonal rope of an oblong (rectangle) produces both areas which the flanking length and transverse breadth produce separately.',
            source: 'Baudhāyana Śulba Sūtra 1.48 (Centuries before Pythagoras)',
          },
        ],
      },
      {
        heading: 'Calculating the Incalculable: The Square Root of 2',
        subheading: 'Precision Approximations 2,800 Years Ago',
        paragraphs: [
          'To construct an altar whose area doubled that of a square, the Śulba geometers needed to calculate the diagonal of a unit square: $\\sqrt{2}$. Because $\\sqrt{2}$ is an irrational number that cannot be expressed as a simple fraction, Baudhāyana formulated an astonishingly elegant fractional series:',
          '$$\\sqrt{2} \\approx 1 + \\frac{1}{3} + \\frac{1}{3 \\times 4} - \\frac{1}{3 \\times 4 \\times 34}$$',
          'Let us compute this value:',
          '$$1 + 0.333333 + 0.083333 - 0.00245098 = 1.4142156...$$',
          'The true modern value of $\\sqrt{2}$ is $1.4142135...$. Baudhāyana’s formula is accurate to five decimal places (error less than 0.00015%), devised without electronic calculators, purely through geometric cord-stretch manipulation and proportional intuition.',
        ],
      },
      {
        heading: 'Vibration as the Brick: Standing Waves and Chandas',
        subheading: 'Acoustic Harmonics as Physical Substrate (Ancient Cymatics)',
        paragraphs: [
          'While the Śulba Sūtras laid the geometric structure, the recitation of the Vedic mantras during construction provided the acoustic brick.',
          'In Vedic cosmology, chanting is not decorative singing; it is the physical excitation of space through precise frequency modulation. The Vedic meters (Chandas) are structured on exact mathematical arithmetic sequences:',
          '• Gāyatrī: 24 syllables (3 triplets of 8)',
          '• Uṣṇikh: 28 syllables',
          '• Anuṣṭubh: 32 syllables (4 quartets of 8)',
          '• Bṛhatī: 36 syllables',
          '• Paṅkti: 40 syllables',
          '• Triṣṭubh: 44 syllables (4 hendecasyllables of 11)',
          '• Jagatī: 48 syllables (4 dodecasyllables of 12)',
          'Notice the step-size: each meter expands by exactly +4 syllables. This is an arithmetic progression (AP) with common difference $d = 4$.',
          'When these meters are recited with Vedic pitch accents (Udātta [raised pitch], Anudātta [lower pitch], and Svarita [circumflex slide]), they generate acoustic standing waves in the enclosed space of the ritual grounds. In modern physics, Ernst Chladni (1756–1827) and Hans Jenny proved via cymatics that when sand or particulate matter is placed on a vibrating metal plate and exposed to pure sound frequencies, the particles automatically organize into geometric mandalas, concentric rings, and symmetrical crystalline lattices.',
          'The Vedic Ṛṣis understood this intuitively: sound is not immaterial. Sound carries kinetic mass-displacement potential. Chanted vibration is the unseen brick that settles matter into sacred geometric alignment.',
        ],
      },
      {
        heading: 'The Three Great Mathematical Breakthroughs',
        subheading: 'Zero (Śūnya), Place-Value, and Cryptographic Ciphers',
        paragraphs: [
          'Out of this fertile marriage between Sāṅkhyan taxonomy and Vedic geometry emerged three monumental contributions to global civilization:',
          '1. The Discovery of Śūnya (Zero): In the West, zero was feared for centuries as a terrifying vacuum or demonic void ("horror vacui"). But in ancient India, because of Vedāntic and Buddhist contemplation of Śūnyatā and Sāṅkhya’s unmanifest Prakṛti (Avyakta), zero was embraced as the fertile, unconditioned matrix from which all numbers emerge. Zero is not "nothing"; it is the balanced, pregnant stillness from which all positive and negative values differentiate: $0 = (+x) + (-x)$.',
          '2. The Decimal Place-Value System (Daśaguṇottara Saṅkhyā): By pairing the nine digits ($1$ through $9$) with zero ($0$), Indian mathematicians created a place-value notation where a number’s position determines its magnitude by powers of ten. This liberated mathematics from the cumbersome, uncomputable Roman numerals ($MCMXCIX$), enabling humanity to calculate astronomical orbits, compound interest, and algorithms.',
          '3. The Kaṭapayādi Alphanumeric Encryption Cipher: Indian astronomers and mathematicians needed a way to preserve massive trigonometric sine tables and astronomical orbits (like the value of $\\pi$ or planetary velocities) across centuries without paper. They invented the Kaṭapayādi cipher, mapping consonants to digits. A geometer could compose an evocative, devotionally beautiful poem that, when decoded through the cipher, yielded $\\pi$ to 32 decimal places!',
        ],
        table: {
          headers: ['Cipher Digit', 'Ka-Group', 'Ta-Group', 'Pa-Group', 'Ya-Group'],
          rows: [
            ['1', 'क (ka)', 'ट (ṭa)', 'प (pa)', 'य (ya)'],
            ['2', 'ख (kha)', 'ठ (ṭha)', 'फ (pha)', 'र (ra)'],
            ['3', 'ग (ga)', 'ड (ḍa)', 'ब (ba)', 'ल (la)'],
            ['4', 'घ (gha)', 'ढ (ḍha)', 'भ (bha)', 'व (va)'],
            ['5', 'ङ (ṅa)', 'ण (ṇa)', 'म (ma)', 'श (śa)'],
            ['6', 'च (ca)', 'त (ta)', '—', 'ष (ṣa)'],
            ['7', 'छ (cha)', 'थ (tha)', '—', 'स (sa)'],
            ['8', 'ज (ja)', 'द (da)', '—', 'ह (ha)'],
            ['9', 'झ (jha)', 'ध (dha)', '—', '—'],
            ['0', 'ञ (ña)', 'न (na)', '—', '—'],
          ],
        },
      },
      {
        heading: 'Vedic Mathematics: The 16 Sūtras of Natural Pattern Recognition',
        subheading: 'Heuristics of the Mind, Not Mechanical Drudgery',
        paragraphs: [
          'In the 20th century, Svāmī Bhāratī Kṛṣṇa Tīrtha reconstructed the 16 Sūtras of Vedic Mathematics. While Western academic mathematics often treats arithmetic as mechanical brute-force calculation, Vedic mathematics treats calculation as holistic pattern recognition.',
          'The 16 sūtras mirror the operational mechanics of the human brain:',
          '• एकाधिकेन पूर्वेण (Ekādhikena Pūrveṇa — "By one more than the previous one"): Used for instant squaring of numbers ending in 5, recurring decimal expansion, and polynomial factoring.',
          '• निखिलं नवतश्चरमं दशतः (Nikhilam Navataścaramam Daśataḥ — "All from 9 and the last from 10"): Used for ultra-fast multiplication near base powers of 10 ($100, 1000, 10000$).',
          '• ऊर्ध्वतिर्यग्भ्याम् (Ūrdhva-Tiryagbhyām — "Vertically and crosswise"): A universal algorithm that performs multi-digit multiplication, division, and matrix operations in a single mental line, identical to modern digital signal processing (DSP) convolution algorithms.',
          '• परावर्त्य योजयेत् (Parāvartya Yojayet — "Transpose and apply"): Instant algebraic root solving and polynomial division.',
        ],
        callout: {
          title: 'The Holistic Architecture',
          text: 'Vedic mathematics does not force the human brain to mimic a silicon calculator. It teaches the mind to recognize the harmonious geometric symmetries already latent within numerical relationships.',
          type: 'insight',
        },
      },
    ],
    keyTakeaways: [
      'Vedic science established that geometry provides the cosmic scaffolding, while acoustic vibrational standing waves provide the physical substance.',
      'The Śulba Sūtras documented the Pythagorean theorem and calculated the square root of 2 accurately to five decimal places centuries before Classical Greece.',
      'Vedic Chandas (poetic meters) expand in exact arithmetic progressions ($d = 4$), generating acoustic cymatic resonances that crystallize space into sacred geometry.',
      'The invention of zero (Śūnya), decimal place-value, the Kaṭapayādi cipher, and the 16 Vedic Math sūtras transformed mathematics from rote computation into an intuitive art of cosmic pattern recognition.',
    ],
  },
];
