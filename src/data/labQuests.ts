export type LabQuestDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface QuestStep {
  id: string;
  label: string;
  sanskritLabel?: string;
  isCompleted: boolean;
}

export interface LabQuest {
  id: string;
  labId: string; // matches LabSegmentId, e.g. 'nada-brahman', 'paramanu', 'jyotisha', 'chandrayaan'
  title: string;
  titleSa: string;
  difficulty: LabQuestDifficulty;
  durationMinutes: number; // typically 3
  prompt: string; // Direct mission prompt as requested
  vedicLore: string; // Historical & philosophical background
  sutraQuote: {
    sa: string;
    en: string;
    source: string;
  };
  steps: QuestStep[];
  hints: string[];
  rewardXP: number;
  badge: {
    icon: string;
    title: string;
  };
  presetData?: Record<string, unknown>;
}

export const LAB_QUESTS: Record<string, LabQuest[]> = {
  // =========================================================================
  // 1. Cosmic Sitār Tuning (Nāda Brahman)
  // =========================================================================
  'nada-brahman': [
    {
      id: 'quest-nada-1',
      labId: 'nada-brahman',
      title: 'Resonance of Gāyatrī Chhanda',
      titleSa: 'गायत्री-च्छन्दः संनादः',
      difficulty: 'Beginner',
      durationMinutes: 3,
      prompt:
        'Tune the Cosmic Sitār to find the harmonic resonance of the sacred Gāyatrī meter! Select the 3rd harmonic (Tejas / Fire mode, n = 3), tighten string tension to calibrate the standing wave frequency to Pañcama / G4 (392–440 Hz), and switch to Cymatics to observe the 24-node solar mandala.',
      vedicLore:
        'The Gāyatrī meter consists of 24 syllables (3 octaves of 8 syllables each) aligned with the diurnal course of Sūrya. In Nāda yoga, the 3rd harmonic embodies Tejas (luminous fire and intellectual illumination).',
      sutraQuote: {
        sa: 'तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॥',
        en: 'May the glorious solar splendor inspire and illuminate our intellect.',
        source: 'Rigveda 3.62.10 (Gāyatrī Sūtra)',
      },
      steps: [
        {
          id: 'step-1',
          label: 'Select Harmonic Mode n = 3 (Tejas / Fire)',
          sanskritLabel: 'तृतीय-हार्मोनिक (तेजस्)',
          isCompleted: false,
        },
        {
          id: 'step-2',
          label: 'Calibrate String Tension between 30 N and 45 N (Frequency 380–440 Hz)',
          sanskritLabel: 'तन्तु-सन्नाहः (३०-४५ न्यूटन)',
          isCompleted: false,
        },
        {
          id: 'step-3',
          label: 'Switch Visualizer to 2D Chladni Cymatics Mode',
          sanskritLabel: 'नाद-मण्डलम् (क्लाद्नी)',
          isCompleted: false,
        },
      ],
      hints: [
        'Click the "n = 3 (rūpa / tejas)" harmonic button on the left panel.',
        'Drag the Tension slider rightward until the frequency readout shows around 400–440 Hz.',
        'Click the "Cymatics" view button under the string canvas to see the sand nodal mandala.',
      ],
      rewardXP: 150,
      badge: {
        icon: '☀️',
        title: 'Gāyatrī Harmonic Master',
      },
      presetData: {
        n: 3,
        T: 36,
        visualMode: 'cymatics',
      },
    },
    {
      id: 'quest-nada-2',
      labId: 'nada-brahman',
      title: 'Bharata Muni’s 22-Śruti Calibration',
      titleSa: 'भरतमुनेः सारणा-चतुष्टयी',
      difficulty: 'Intermediate',
      durationMinutes: 3,
      prompt:
        'Perform the ancient Śaraṇā Catuṣṭayī twin-vīṇā experiment from Bharata Muni’s Nāṭyaśāstra! Switch to Śaraṇā Mode and step through all 4 microtonal shifts to isolate the Pramāṇa Śruti (the microtonal comma).',
      vedicLore:
        'In the 2nd century BCE, Bharata Muni calibrated 22 distinct microtonal intervals (Śrutis) using two identical 9-string harps: the fixed Dhruvā-Vīṇā and the movable Calā-Vīṇā. By lowering the Calā string step by step, the acoustic beats vanished and revealed the fundamental building block of Indian modal music.',
      sutraQuote: {
        sa: 'श्रूयते इति श्रुतिः — द्वौ वीणौ समतन्त्र्यौ कृत्वा ॥',
        en: 'That which is heard is Śruti — having taken two identically tuned vīṇās...',
        source: 'Nāṭyaśāstra 28.24',
      },
      steps: [
        {
          id: 'step-1',
          label: 'Switch String Visualizer to "Śaraṇā (22 Śrutis)" Mode',
          sanskritLabel: 'सारणा-दृश्यम्',
          isCompleted: false,
        },
        {
          id: 'step-2',
          label: 'Advance through all 4 calibration shifts (Step 0 to Step 4)',
          sanskritLabel: 'चतस्रः सारणाः',
          isCompleted: false,
        },
        {
          id: 'step-3',
          label: 'Toggle Audio ON to hear the acoustic microtonal interference beats',
          sanskritLabel: 'नाद-ध्वनि-श्रवणम्',
          isCompleted: false,
        },
      ],
      hints: [
        'Click the "Śaraṇā (22 Śrutis)" tab in the visual mode switcher.',
        'Use the "Next Shift →" button to move through Prathamā, Dvitīyā, Tṛtīyā, and Caturthī Śaraṇā.',
        'Toggle the "Audio ON" button to hear how the acoustic beat frequency slows down.',
      ],
      rewardXP: 200,
      badge: {
        icon: '🪕',
        title: '22-Śruti Geometer',
      },
      presetData: {
        visualMode: 'sarana',
        saranaStep: 4,
      },
    },
    {
      id: 'quest-nada-3',
      labId: 'nada-brahman',
      title: 'Anāhata Drone (The Cosmic Oṃkāra)',
      titleSa: 'अनाहत-नादः (प्रणव-संनादः)',
      difficulty: 'Advanced',
      durationMinutes: 3,
      prompt:
        'Tune the fundamental string ($n = 1$, Ākāśa / Space) to the sacred earth frequency of 136.1 Hz (C#3 — the frequency of the cosmic year and Praṇava). Maximize amplitude and engage audio to experience the pure unmanifest sound vibration.',
      vedicLore:
        'The Māṇḍūkya Upaniṣad describes Oṃ as the acoustic substratum of the four states of consciousness (Jāgrat, Svapna, Suṣupti, Turīya). When the fundamental string resonates at 136.1 Hz, the physical acoustic vibration synchronizes with the circadian rhythm.',
      sutraQuote: {
        sa: 'ओमित्येतदक्षरमिदं सर्वं तस्योपव्याख्यानम् ॥',
        en: 'The syllable Oṃ is all this universe; its explanation follows.',
        source: 'Māṇḍūkya Upaniṣad 1.1',
      },
      steps: [
        {
          id: 'step-1',
          label: 'Select Fundamental Harmonic Mode n = 1 (Ākāśa / Space)',
          sanskritLabel: 'मूल-हार्मोनिक (आकाश)',
          isCompleted: false,
        },
        {
          id: 'step-2',
          label: 'Adjust String Tension to achieve ~130–140 Hz (Target: 136.1 Hz)',
          sanskritLabel: '१३६.१ हर्ट्ज़-सन्नाहः',
          isCompleted: false,
        },
        {
          id: 'step-3',
          label: 'Set Amplitude above 80% and engage audio tone',
          sanskritLabel: 'उच्च-आयामः एवं ध्वनिः',
          isCompleted: false,
        },
      ],
      hints: [
        'Select harmonic n = 1.',
        'Set the Tension slider around 18–22 N to reach 136 Hz.',
        'Move the Amplitude slider to 85% or higher and click "Audio ON".',
      ],
      rewardXP: 175,
      badge: {
        icon: '🕉️',
        title: 'Anāhata Resonance Master',
      },
      presetData: {
        n: 1,
        T: 20,
        amp: 90,
      },
    },
  ],

  // =========================================================================
  // 2. Paramāṇu Builder (Atomic Crucible)
  // =========================================================================
  paramanu: [
    {
      id: 'quest-paramanu-1',
      labId: 'paramanu',
      title: 'Birth of the Binary Dvyaṇuka',
      titleSa: 'द्व्यणुक-सृष्टिः',
      difficulty: 'Beginner',
      durationMinutes: 3,
      prompt:
        'Forge the universe’s first molecular dyad! According to Sage Kaṇāda’s Vaiśeṣika Sūtra, isolated atoms cannot form tangible matter. Drag and combine two raw Pṛthivī (Earth) Paramāṇus into a stable Dvyaṇuka.',
      vedicLore:
        'Sage Kaṇāda postulated around 600 BCE that single Paramāṇus possess spherical indivisible geometry (Parimaṇḍala), but are imperceptible to senses. Only through pairwise adṛṣṭa-driven association do they form Dvyaṇukas (dyads).',
      sutraQuote: {
        sa: 'कारणगुणपूर्वकाः कार्यगुणा दृष्टाः ॥',
        en: 'The qualities of the effect are preceded by the inherent qualities of the cause.',
        source: 'Vaiśeṣika Sūtra 2.1.24',
      },
      steps: [
        {
          id: 'step-1',
          label: 'Summon two Pṛthivī (Earth) Paramāṇus into the crucible',
          sanskritLabel: 'द्वौ पृथिवी-परमाणू',
          isCompleted: false,
        },
        {
          id: 'step-2',
          label: 'Bring atoms within 42px bonding radius to trigger fusion',
          sanskritLabel: 'संयोग-संस्कारः',
          isCompleted: false,
        },
        {
          id: 'step-3',
          label: 'Verify that a stable 2-atom Dvyaṇuka is formed',
          sanskritLabel: 'द्व्यणुक-सिद्धिः',
          isCompleted: false,
        },
      ],
      hints: [
        'Click on the Pṛthivī (brown) icon on the left elemental tray twice to spawn two atoms.',
        'Drag one atom directly on top of the other until the golden fusion flash ignites.',
        'Or use the quick "Summon Dvyaṇuka" button under the crucible.',
      ],
      rewardXP: 150,
      badge: {
        icon: '⚛️',
        title: 'Dvyaṇuka Alchemist',
      },
    },
    {
      id: 'quest-paramanu-2',
      labId: 'paramanu',
      title: 'The Sunbeam Trasareṇu (Tryaṇuka)',
      titleSa: 'जालसूर्य-मरीचिस्थं त्रसरेणुः',
      difficulty: 'Intermediate',
      durationMinutes: 3,
      prompt:
        'Forge a Tryaṇuka (त्रसरेणु) by combining three Dvyaṇukas (6 atoms)! Witness the historic threshold where microscopic atoms cross over into macroscopic reality—dancing as a visible dust mote in a beam of sunlight.',
      vedicLore:
        'The Nyāya-Vaiśeṣika school established that 3 Dvyaṇukas (totalling 6 Paramāṇus) form a Tryaṇuka or Trasareṇu. This is the smallest unit of matter having magnitude (Mahattva) that can reflect sunlight through a window lattice.',
      sutraQuote: {
        sa: 'जालसूर्य-मरीचिस्थं यत्सूक्ष्मं दृश्यते रजः । तस्य षष्ठो भवेद्भागः परमाणुः स उच्यते ॥',
        en: 'The smallest visible dust particle in a sunbeam — one-sixth of that is called a Paramāṇu.',
        source: 'Manu Smṛti 8.132 & Kaṇāda',
      },
      steps: [
        {
          id: 'step-1',
          label: 'Produce three binary Dvyaṇukas in the crucible',
          sanskritLabel: 'त्रीणि द्व्यणुकाणि',
          isCompleted: false,
        },
        {
          id: 'step-2',
          label: 'Combine the three Dvyaṇukas into a triad Tryaṇuka',
          sanskritLabel: 'त्र्यणुक-संश्लेषणम्',
          isCompleted: false,
        },
        {
          id: 'step-3',
          label: 'Observe the Trasareṇu dancing in the golden sunbeam chamber',
          sanskritLabel: 'सूर्य-मरीचि-प्रकाशनम्',
          isCompleted: false,
        },
      ],
      hints: [
        'Forge 3 separate dyads (Dvyaṇukas) or click "Forge Tryaṇuka in Sunbeam".',
        'Watch the golden sunbeam window appear on the right with the 6-atom golden particle.',
        'Listen for the Trasareṇu chime confirming macroscopic manifestation.',
      ],
      rewardXP: 200,
      badge: {
        icon: '☀️',
        title: 'Trasareṇu Visionary',
      },
    },
    {
      id: 'quest-paramanu-3',
      labId: 'paramanu',
      title: 'Pīlupāka Thermal Metamorphosis',
      titleSa: 'पीलुपाक-प्रक्रिया (अग्नि-संस्कारः)',
      difficulty: 'Advanced',
      durationMinutes: 3,
      prompt:
        'Demonstrate Sage Kaṇāda’s Pīlupāka theory of chemical transformation! Heat raw unbaked clay atoms with Tejas (Fire) energy to cause atomic dissociation and re-aggregation into permanent terracotta ceramic.',
      vedicLore:
        'The Vaiśeṣikas championed Pīlupāka (atomic heating), arguing that when an earthen pot is baked in a kiln, the intense fire disintegrates it down to raw Paramāṇus, transforms their inherent color and hardness, and re-assembles them anew.',
      sutraQuote: {
        sa: 'रूपादिमत्त्वाच्चाभौतिकत्वम् — पाकाभिनिर्वृत्तिः ॥',
        en: 'Through heat-induced transformation (Pāka), new elemental qualities are permanently fixed.',
        source: 'Vaiśeṣika Sūtra 7.1.6',
      },
      steps: [
        {
          id: 'step-1',
          label: 'Place Pṛthivī (Earth) atoms into the crucible',
          sanskritLabel: 'पृथिवी-परमाणु-निक्षेपः',
          isCompleted: false,
        },
        {
          id: 'step-2',
          label: 'Engage Tejas thermal energy above 800°C',
          sanskritLabel: 'तेजस्-तापनम् (>८००°C)',
          isCompleted: false,
        },
        {
          id: 'step-3',
          label: 'Trigger Pīlupāka reorganization to bake the terracotta ceramic',
          sanskritLabel: 'पीलुपाक-सिद्धिः',
          isCompleted: false,
        },
      ],
      hints: [
        'Add Earth atoms and click the "Pīlupāka Heat Crucible" toggle.',
        'Watch the atomic bonds vibrate rapidly and change color from dark brown to red-orange terracotta.',
        'Listen for the steam hiss and thermal chime.',
      ],
      rewardXP: 175,
      badge: {
        icon: '🔥',
        title: 'Pīlupāka Master',
      },
    },
  ],

  // =========================================================================
  // 3. Jyotiṣa Gravity Sandbox (Orbital Mechanics)
  // =========================================================================
  jyotisha: [
    {
      id: 'quest-jyotisha-1',
      labId: 'jyotisha',
      title: 'The 3-Body Lunar Harmony',
      titleSa: 'त्रि-पिण्ड-गुरुत्वाकर्षणम्',
      difficulty: 'Beginner',
      durationMinutes: 3,
      prompt:
        'Master the gravitational balance between Sūrya, Pṛthivī, and Candra! Adjust orbital velocity so the Moon stably circles Earth for 2 full lunar months without being pulled into the Sun or ejected into deep space.',
      vedicLore:
        'Āryabhaṭa I explained in 499 CE that celestial bodies do not move on crystal spheres; their orbits arise from constant velocity combined with mutual gravitational attraction (Ākarṣaṇa-śakti), tracking Candra through the 27 Nakṣatras.',
      sutraQuote: {
        sa: 'चन्द्रो जलमर्कोऽग्निर्मृद्भूश्छायापि या तमस्तद्धि ॥',
        en: 'The Moon is water, the Sun is fire, the Earth is soil, and darkness is Earth’s shadow.',
        source: 'Āryabhaṭīya, Golapāda 37',
      },
      steps: [
        {
          id: 'step-1',
          label: 'Set Earth orbital velocity to stable solar orbit (1.00 AU/yr)',
          sanskritLabel: 'सूर्य-परिक्रमण-वेगः',
          isCompleted: false,
        },
        {
          id: 'step-2',
          label: 'Tune Lunar velocity so Candra does not collide with Earth',
          sanskritLabel: 'चन्द्र-कक्षा-सन्तुलनम्',
          isCompleted: false,
        },
        {
          id: 'step-3',
          label: 'Maintain stable 3-body system through 27 Nakṣatra transits',
          sanskritLabel: '२७ नक्षत्र-सञ्चारः',
          isCompleted: false,
        },
      ],
      hints: [
        'Keep Earth’s speed slider near 1.0x to maintain an almost circular orbit.',
        'Adjust the Moon velocity slider carefully so its orbit doesn’t become an eccentric escape hyperbola.',
        'Watch the Nakṣatra indicator on the orbital ring cycle from Aśvinī to Revatī.',
      ],
      rewardXP: 180,
      badge: {
        icon: '🪐',
        title: 'Gravitational Geometer',
      },
    },
  ],

  // =========================================================================
  // 4. Somayāna Mission-03 (Chandrayaan-3)
  // =========================================================================
  chandrayaan: [
    {
      id: 'quest-chandrayaan-1',
      labId: 'chandrayaan',
      title: 'Touchdown at Shiv Shakti Point',
      titleSa: 'शिव-शक्ति-बिन्दु-स्पर्शः',
      difficulty: 'Intermediate',
      durationMinutes: 3,
      prompt:
        'Execute reverse thruster burns on the Vikram lander to decelerate from 1.6 km/s orbital velocity to a soft 0.8 m/s vertical descent. Land safely within 15 meters of Shiv Shakti Point at the lunar south pole!',
      vedicLore:
        'On August 23, 2023, Bharat became the first nation to soft-land on the lunar south pole. The landing site was officially named Shiv Shakti Point, symbolizing the union of pure consciousness (Shiva) and scientific dynamism (Shakti).',
      sutraQuote: {
        sa: 'सोमयानेन सिद्धा विजययात्रा — शिव-शक्ति-बिन्दौ प्रतिष्ठितम् ॥',
        en: 'By the lunar craft the expedition succeeded, established at Shiv Shakti Point.',
        source: 'ISRO Chandrayaan-3 Dedication',
      },
      steps: [
        {
          id: 'step-1',
          label: 'Fire 800N throttleable thrusters to initiate rough braking',
          sanskritLabel: 'मन्द-गति-प्रणोदनम्',
          isCompleted: false,
        },
        {
          id: 'step-2',
          label: 'Align laser altimeter and reduce vertical velocity below 1.5 m/s',
          sanskritLabel: 'लम्ब-वेग-नियन्त्रणम्',
          isCompleted: false,
        },
        {
          id: 'step-3',
          label: 'Deploy Pragyan rover at Shiv Shakti Point',
          sanskritLabel: 'प्रज्ञान-रोवऱ्-अवतरणम्',
          isCompleted: false,
        },
      ],
      hints: [
        'Use short pulses of the main thruster to bleed off horizontal velocity.',
        'Keep the descent rate under 2.0 m/s as altitude drops below 100 meters.',
        'Engage hover hazard avoidance before final touchdown.',
      ],
      rewardXP: 200,
      badge: {
        icon: '🛰️',
        title: 'Somayāna Commander',
      },
    },
  ],

  // =========================================================================
  // 5. Chandaḥśāstra Matrix (Piṅgala Binary Lab)
  // =========================================================================
  chandahshastra: [
    {
      id: 'quest-chandah-1',
      labId: 'chandahshastra',
      title: 'Piṅgala’s Binary Anuṣṭubh',
      titleSa: 'पिङ्गल-द्वि-आधारी-प्रस्तारः',
      difficulty: 'Beginner',
      durationMinutes: 3,
      prompt:
        'Decode the binary architecture of Sanskrit poetry! Use Ācārya Piṅgala’s binary combinatorial algorithm (Laghu = 0, Guru = 1) to generate the 8-syllable Pāda of the Anuṣṭubh meter in the Meru Prastāra.',
      vedicLore:
        'Circa 300 BCE, Piṅgala invented binary numbers (Rūpa and Śūnya), combinatorial binomial coefficients (Meru Prastāra / Pascal’s triangle), and exponential algorithms in his Chandaḥśāstra centuries before modern computing.',
      sutraQuote: {
        sa: 'धीश्रीस्त्रीम् — लः समुद्रः गः पर्वतः ॥',
        en: 'Laghu is 1 mora; Guru is 2 morae. Light syllable is 0; heavy is 1.',
        source: 'Chandaḥśāstra 1.1–1.3',
      },
      steps: [
        {
          id: 'step-1',
          label: 'Set meter length to 8 syllables (Anuṣṭubh Pāda)',
          sanskritLabel: '८ अक्षर-पादः (अनुष्टुभ्)',
          isCompleted: false,
        },
        {
          id: 'step-2',
          label: 'Construct binary sequence for Pathyā cadence (०११० / Laghu-Guru)',
          sanskritLabel: 'पथ्या-लक्षणम्',
          isCompleted: false,
        },
        {
          id: 'step-3',
          label: 'Verify binary index row in Piṅgala’s Meru Prastāra pyramid',
          sanskritLabel: 'मेरु-प्रस्तार-परीक्षणम्',
          isCompleted: false,
        },
      ],
      hints: [
        'Select the Anuṣṭubh preset (8 syllables).',
        'Toggle syllables 5, 6, 7 to match the classic śloka cadence (Laghu-Guru-Guru).',
        'Observe how the decimal index corresponds to the binary representation.',
      ],
      rewardXP: 175,
      badge: {
        icon: '📜',
        title: 'Piṅgala Cryptographer',
      },
    },
  ],

  // =========================================================================
  // 6. Vedic Geometry Lab (Rekhā-Gaṇita / Śulba Sūtra)
  // =========================================================================
  'vedic-geometry': [
    {
      id: 'quest-geometry-1',
      labId: 'vedic-geometry',
      title: 'Squaring the Fire Altar',
      titleSa: 'गार्हपत्य-चयन-समीकरणम्',
      difficulty: 'Intermediate',
      durationMinutes: 3,
      prompt:
        'Perform Baudhāyana’s celebrated geometric transformation! Using only rope and pegs (Rajju-śāstra), convert a circular Gārhapatya fire altar into an exact square Śyena (Falcon) altar with identical area.',
      vedicLore:
        'Baudhāyana’s Śulba Sūtra (800 BCE) provided the world’s first geometric algorithms for area-preserving shape conversions, including the Pythagorean theorem and computing the square root of 2 to 5 decimal places.',
      sutraQuote: {
        sa: 'दीर्घचतुरश्रस्याक्ष्णया रज्जुः पार्श्वमानी तिर्यङ्मानी च यत्पृथग्भूते कुरुतस्तदुभयं करोति ॥',
        en: 'The diagonal cord of a rectangle produces both areas that its horizontal and vertical sides make separately.',
        source: 'Baudhāyana Śulba Sūtra 1.48',
      },
      steps: [
        {
          id: 'step-1',
          label: 'Select Circular Altar archetype (Gārhapatya)',
          sanskritLabel: 'मण्डलाकार-वेदी',
          isCompleted: false,
        },
        {
          id: 'step-2',
          label: 'Apply Baudhāyana’s Cord Transformation ratio (13/15 r)',
          sanskritLabel: 'रज्जु-समीकरणम्',
          isCompleted: false,
        },
        {
          id: 'step-3',
          label: 'Verify exact area conservation between circle and square',
          sanskritLabel: 'क्षेत्रफल-साम्यम्',
          isCompleted: false,
        },
      ],
      hints: [
        'Select archetype 1 (Gārhapatya Fire Altar).',
        'Click the "Square the Circle" transformation action button.',
        'Observe how the chord radius maps directly into the diagonal of the falcon square.',
      ],
      rewardXP: 180,
      badge: {
        icon: '📐',
        title: 'Śulba Sūtra Architect',
      },
    },
  ],
};

/** Get all available quests for a specific lab sector */
export function getQuestsForLab(labId: string): LabQuest[] {
  return LAB_QUESTS[labId] || [];
}

/** Get total quests across all lab sectors */
export function getAllQuests(): LabQuest[] {
  return Object.values(LAB_QUESTS).flat();
}
