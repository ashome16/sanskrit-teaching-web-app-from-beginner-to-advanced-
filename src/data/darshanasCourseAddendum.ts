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
    subtitle: "The 25 Tattvas: Mapping the Architecture of Reality with the Precision of a Cosmic Software Programmer",
    readingTimeMinutes: 12,
    kicker: 'Course Addendum · Part 3 of 4 · Cosmology & Taxonomy',
    summary:
      'If Vedanta is the poetic, non-dual climax of Indian philosophy, Sankhya Darshan is its rigorous, mathematical blueprint. Founded by Sage Kapila, Sankhya literally means "to enumerate," "to calculate," or "to define through numbers." Rather than relying on mystical assertions, Sankhya maps the architecture of reality with the cold, diagnostic precision of a cosmic software programmer.',
    sections: [
      {
        heading: 'The Rigorous Mathematical Blueprint',
        subheading: 'Sage Kapila and the Software Architecture of Existence',
        paragraphs: [
          'If Vedanta is the poetic, non-dual climax of Indian philosophy, Sankhya Darshan is its rigorous, mathematical blueprint. Founded by Sage Kapila, the word Sankhya literally means "to enumerate," "to calculate," or "to define through numbers."',
          'Rather than relying on mystical assertions, Sankhya maps the architecture of reality with the cold, diagnostic precision of a cosmic software programmer.',
          'Sankhya posits that the entire universe—from a dense block of granite to the most subtle, fleeting human thought—is an evolutionary dance between two ultimate, uncreated realities: Purusha (Pure, silent witness consciousness) and Prakriti (Primordial, unmanifested matter/energy).',
          'To explain how the universe transforms from unmanifested potential into the tangible world, Sankhya outlines a strict taxonomic descent of 25 Tattvas (cosmic principles or elements).',
        ],
        callout: {
          title: 'The Algorithmic Essence',
          text: '“सम्यक् ख्यायते प्रकाश्यते वस्तुतत्त्वम् अनया इति साङ्ख्यम्” — Sankhya maps the cosmos not through mythological personification, but through precise numerical taxonomy and cause-and-effect invariants.',
          type: 'scientific',
        },
      },
      {
        heading: 'The Primordial Binary: Purusha and Prakriti',
        subheading: 'Consciousness, Unmanifest Nature, and the Three Guṇas',
        paragraphs: [
          'Before counting begins, Sankhya establishes a foundational dualism. Reality is divided into two distinct, eternal principles:',
          '1. Purusha (Consciousness): The ultimate, unattached Seer. It possesses no qualities, performs no actions, and undergoes no changes. It is pure, contentless consciousness that simply witnesses reality. It is numbered as the First Tattva.',
          '2. Prakriti (Primordial Nature): The ultimate Seen. It is the unmanifested matrix of all physical, energetic, and mental phenomena. It is unconscious but possesses boundless dynamic potential. It is numbered as the Second Tattva.',
          'In its primal state, Prakriti is perfectly balanced by three fundamental cosmic forces or cords known as the Gunas:',
          '• Sattva: The force of light, equilibrium, purity, and intelligence.',
          '• Rajas: The force of kinetic energy, passion, motion, and change.',
          '• Tamas: The force of inertia, darkness, mass, and stability.',
          'Evolution (Sristi) begins the moment the silent presence of Purusha disturbs the equilibrium of Prakriti’s three Gunas—acting like a magnet drawing iron filings into a distinct, complex pattern.',
        ],
      },
      {
        heading: 'The Internal Instrument (Antaḥkaraṇa)',
        subheading: 'The First Differentiation of Intellect and Ego',
        paragraphs: [
          '3. Mahat / Buddhi (Cosmic Intelligence): The first product of evolution. It is the capacity to discern, judge, and hold universal intelligence.',
          '4. Ahamkara (The Ego/I-maker): The principle of individuation. It takes the universal insights of Buddhi and claims them, creating the concept of "I," "me," and "mine."',
          'From Ahamkara, the evolutionary path splits into two parallel streams based on the dominant Guna: the subjective path of consciousness/perception (driven by Sattva) and the objective path of physical matter (driven by Tamas).',
        ],
      },
      {
        heading: 'The Subjective Stream (Sattva-Dominant)',
        subheading: 'Mind, The Five Senses, and Five Organs of Action',
        paragraphs: [
          '5. Manas (The Lower Mind): The central sensory processing unit. It coordinates sensory inputs and motor outputs.',
          '6–10. Jnanendriyas (Five Sensory Organs): The faculties of perception—hearing (ears), touching (skin), seeing (eyes), tasting (tongue), and smelling (nose).',
          '11–15. Karmendriyas (Five Organs of Action): The faculties of physical interaction—speaking (mouth), grasping (hands), locomoting (feet), excreting (anus), and procreating (genitals).',
        ],
        table: {
          headers: ['Cognitive Sense (Jñānendriya)', 'Faculty / Organ', 'Executive Action (Karmendriya)', 'Operational Instrument'],
          rows: [
            ['Śrotra (Hearing)', 'Ears / Acoustic perception', 'Vāk (Speaking)', 'Mouth / Vocal apparatus'],
            ['Tvak (Touching)', 'Skin / Tactile perception', 'Pāṇi (Grasping)', 'Hands / Manual dexterity'],
            ['Cakṣus (Seeing)', 'Eyes / Visual perception', 'Pāda (Locomotion)', 'Feet / Physical movement'],
            ['Rasana (Tasting)', 'Tongue / Gustatory perception', 'Pāyu (Excretion)', 'Excretory organs'],
            ['Ghrāṇa (Smelling)', 'Nose / Olfactory perception', 'Upastha (Generation)', 'Generative organs'],
          ],
        },
      },
      {
        heading: 'The Objective Stream (Tamas-Dominant)',
        subheading: 'Quantum Blueprints (Tanmātras) and Physical Elements (Mahābhūtas)',
        paragraphs: [
          '16–20. Tanmatras (Subtle Vibrational Elements): The quantum blueprints of matter. They are the pure potentials of sensory experience—sound (Shabda), touch (Sparsha), form (Rupa), taste (Rasa), and smell (Gandha).',
          '21–25. Mahabhutas (Gross Physical Elements): The final, densest crystallization of matter that forms our physical world—space/ether (Akasha), air (Vayu), fire (Agni), water (Jala), and earth (Prithvi).',
        ],
        sutras: [
          {
            sanskrit: 'मूलप्रकृतिरविकृतिर्महदाद्याः प्रकृतिविकृतयः सप्त । षोडशकस्तु विकारो न प्रकृतिर्न विकृतिः पुरुषः ॥',
            transliteration: 'mūla-prakṛtir avikṛtir mahad-ādyāḥ prakṛti-vikṛtayaḥ sapta | ṣoḍaśakas tu vikāro na prakṛtir na vikṛtiḥ puruṣaḥ',
            meaning: 'Primordial Nature is unevolved; the seven beginning with Mahat are both cause and effect; the sixteen are modifications only; Purusha is neither cause nor effect.',
            source: 'Īśvarakṛṣṇa, Sāṅkhya Kārikā 3',
          },
        ],
      },
      {
        heading: 'The Mathematical Implications of Sankhya',
        subheading: 'From Mythological Metaphor to Quantitative Taxonomy',
        paragraphs: [
          'By defining the universe as an exact sequence of 25 distinct categories, Sankhya fundamentally shifted Indian thought away from mythological explanations and toward quantitative analysis.',
          'It proved that the physical universe is not chaotic; it is a highly ordered, structured system governed by cause and effect (Satkaryavada). If you know the exact composition of the cause, you can mathematically predict the nature of the effect.',
          'This precise, structured taxonomy of matter laid the conceptual foundation for ancient Indian sciences, including Ayurveda and, most notably, the evolution of structural mathematics.',
        ],
        callout: {
          title: 'The Predictive Architecture',
          text: '“Because matter is quantitatively mapped, ancient India approached mathematics not as an abstract human fiction, but as the literal structural blueprint of nature.”',
          type: 'insight',
        },
      },
    ],
    keyTakeaways: [
      'Sankhya literally means "to enumerate" or "to define through numbers"—mapping reality with the precision of a cosmic software programmer.',
      'The cosmos evolves from the interaction of Purusha (pure witness consciousness) and Prakriti (unmanifest matter/energy governed by Sattva, Rajas, and Tamas).',
      'The 25 Tattvas cleanly descend: Purusha (1), Prakriti (2), Mahat (3), Ahamkara (4), the internal sensory stream (5–15), the subtle Tanmatras (16–20), and the gross Mahabhutas (21–25).',
      'Satkaryavada (causal conservation) and quantitative taxonomy directly catalyzed Indian structural mathematics and Ayurveda.',
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
    titleEnglish: 'Evolution of Vedic Mathematics: Math as Structure, Vibration as the Brick',
    subtitle: 'Cosmology, the Śulba Sūtras, and Acoustic Standing Waves: The Blueprint of Cosmic Creation',
    readingTimeMinutes: 14,
    kicker: 'Course Addendum · Part 4 of 4 · Sacred Geometry & Cymatics',
    summary:
      'By mapping the cosmos through the 25 concrete categories of the Tattva system, Sankhya Darshan established a monumental premise: the universe is structured numerically, logically, and predictably. This structural worldview directly birthed the evolution of Vedic mathematics—where geometry provides the cosmic framework, and acoustic vibration serves as the material brick.',
    sections: [
      {
        heading: 'The Foundational Premise',
        subheading: 'Mathematics as the Living Cosmic Blueprint',
        paragraphs: [
          'By mapping the cosmos through the 25 concrete categories of the Tattva system, Sankhya Darshan established a monumental premise: the universe is structured numerically, logically, and predictably. This structural worldview directly birthed the evolution of Vedic mathematics.',
          'In this traditional scientific paradigm, mathematics is not an arbitrary, human-made language used to measure dead matter. Instead, mathematics is recognized as the underlying geometric blueprint of reality, while subtle, acoustic frequencies—vibrations—act as the fundamental bricks that occupy that structural frame.',
        ],
        callout: {
          title: 'The Core Equation',
          text: '“गणितं विन्यासः, स्पन्दनं च शिला” — Mathematics is the invariant geometric matrix; vibrational frequency is the energetic brick filling that structural frame.',
          type: 'cosmological',
        },
      },
      {
        heading: 'The Mathematical Canopy: The Śulba Sūtras and Sacrificial Altars',
        subheading: 'Ancient Geometry as Cosmological Simulation',
        paragraphs: [
          'The earliest formal expression of this mathematical cosmology is found in the Sulba Sutras (appendices to the Vedic literature dating back to the 1st millennium BCE). The word Sulba refers to a measuring chord or rope. These texts are the world\'s oldest manuals for structural geometry, detailing the design and construction of complex fire altars (Agnicayana).',
          'To the ancient Vedic rishis, building an altar was a precise cosmological simulation. If the cosmos was structured according to exact numerical principles, then a physical structure built on those exact ratios would act as a resonant antenna, harmonizing the earth with cosmic forces.',
          'This requirement for absolute geometric perfection led to several groundbreaking mathematical discoveries centuries before their Western counterparts:',
          '• The "Pythagorean" Theorem: Formulated explicitly by Sage Baudhayana long before Pythagoras: "The rope stretched along the length of the diagonal produces an area which the vertical and horizontal sides make together."',
          '• Squaring the Circle: Developing highly sophisticated fractional approximations to construct circular altars that possessed the exact same surface area as square altars.',
          '• Irrational Numbers: Calculating the square root of 2 (√2) to a stunning degree of five decimal precision: 1 + 1/3 + 1/(3·4) - 1/(3·4·34) ≈ 1.4142156...',
        ],
        sutras: [
          {
            sanskrit: 'दीर्घचतुरश्रस्याक्ष्णया रज्जुः पार्श्वमानी तिर्यङ्ग्मानी च यत्पृथग्भूते कुरुतस्तदुभयं करोति ॥',
            transliteration: 'dīrghasyākṣṇayā rajjuḥ pārśvamānī tiryaṅmānī ca yatpṛthagbhūte kurutastadubhayaṃ karoti',
            meaning: 'The diagonal rope of an oblong produces both areas which the flanking length and transverse breadth produce separately.',
            source: 'Baudhāyana Śulba Sūtra 1.48 (Centuries before Pythagoras)',
          },
        ],
      },
      {
        heading: 'Math as the Structure: The Geometric Matrix',
        subheading: 'Invariant Spatial Laws Preceding Physical Matter',
        paragraphs: [
          'In this Vedic synthesis, geometry represents the unchanging, static framework of space—the architectural rules of the universe.',
          'Just as Sankhya asserts that Mahat (universal intelligence) precedes the creation of physical matter, Vedic mathematics asserts that geometric relationships exist before physical objects do. The empty space of the universe is not a vacuum; it is an invisible matrix of mathematical symmetry.',
          'When we plot a geometric form—like the precise concentric triangles of a Yantra or the exact layout of a Sulba Sutras fire altar—we are tracing the invariant lines of cosmic stress. Math is the structural skeleton of the cosmos.',
        ],
        table: {
          headers: ['Geometric Matrix (Math)', 'Frequency Modulation (Vibration)', 'Physical Reality (Matter)'],
          rows: [
            ['The invariant spatial laws of the cosmic framework', 'The dynamic, oscillating energy acting as material bricks', 'The dense, visible world of the 25 Tattvas'],
            ['Rekhā-Gaṇita / Sacred Geometry (Śulba Sūtras)', 'Śabda / Tanmātras / Chanted Chandas Harmonics', 'Crystallized physical elements (Mahābhūtas)'],
          ],
        },
      },
      {
        heading: 'Vibration as the Brick: The Tanmātras and Acoustic Materialism',
        subheading: 'Standing Waves of Energy Oscillating Across Densities',
        paragraphs: [
          'If mathematics provides the empty, structural matrix, what fills it to create dense, physical matter? Sankhya answers this through the concept of the Tanmatras—the subtle, vibrational potencies that precede the gross physical elements.',
          'The primary Tanmatra is Shabda (sound or vibrational frequency). In Vedic physics, matter is not composed of hard, static marbles. Instead, it is composed of standing waves of energy oscillating at different frequencies.',
          '• High Frequencies, Subtle Matter: Frequencies that are incredibly rapid and fine express themselves as thoughts, intelligence, and the sensory mind.',
          '• Low Frequencies, Dense Matter: Frequencies that slow down, condensing into heavy standing waves, express themselves as dense physical matter like water or earth.',
          'Therefore, vibration is the brick. A physical object is simply a specific frequency of acoustic energy locked inside a specific mathematical structure.',
        ],
        callout: {
          title: 'Acoustic Standing Waves',
          text: '“In Vedic physics, matter is not made of static hard marbles. Matter is standing waves of sound energy locked inside geometric coordinates.”',
          type: 'scientific',
        },
      },
      {
        heading: 'Visualizing Sound Form: Cymatics and the Vedic Paradigm',
        subheading: 'Sound Frequencies Ordering Matter into Sacred Symmetry',
        paragraphs: [
          'This relationship can be perfectly understood through the modern science of cymatics, where sound frequencies are passed through a physical medium (like sand on a metal plate). At random frequencies, the sand is chaotic. But the moment a precise, harmonic frequency is played, the sand instantly arranges itself into beautiful, flawless geometric patterns.',
          'The sound frequency (the vibration) acts as the literal brick, while the resulting pattern demonstrates the underlying mathematical matrix (the structure). Change the frequency, and the physical geometry changes instantly.',
        ],
      },
      {
        heading: 'The Unified Equation of Reality',
        subheading: 'Navigating, Altering, and Transcending Materiality',
        paragraphs: [
          'The evolution of Vedic mathematics, fueled by the analytical division of Sankhya, culminated in a breathtakingly modern realization: the universe is a living continuum of mathematical geometry and energetic vibration.',
          'By understanding the mathematical laws of the universe (Math as Structure) and mastering the sonic, vibrational keys of mantras and elements (Vibration as the Brick), the ancient thinkers believed they could navigate, alter, and ultimately transcend material reality entirely—returning the mind back up the ladder of the 25 Tattvas to rest in pure, eternal consciousness.',
        ],
        callout: {
          title: 'The Ultimate Synthesis',
          text: '“By understanding the geometry of space (Math as Structure) and mastering the resonant keys of sound (Vibration as Brick), consciousness ascends the 25 Tattvas back to its native unconditioned source.”',
          type: 'insight',
        },
      },
    ],
    keyTakeaways: [
      'Mathematics in Vedic thought is the underlying geometric blueprint of reality, not a detached artificial tool.',
      'Acoustic frequencies (vibrations / Tanmatras) act as the material bricks that fill spatial geometric matrices.',
      'The Sulba Sutras anticipated the Pythagorean theorem, irrational number approximations (√2 to five decimal places), and squaring the circle.',
      'Modern cymatics proves the Vedic premise: vibrational sound frequencies directly crystallize chaotic matter into symmetrical geometric order.',
      'Mastering the math of structure and the frequency of vibration allows consciousness to transcend material entrapment and rest in Purusha.',
    ],
  },
];
