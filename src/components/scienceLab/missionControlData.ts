/**
 * Vijñāna Lab Mission Control Data & Gamification Engine
 * Kid-friendly science missions, badges, Vidyā Stars, Science Sparks, and curriculum alignments.
 */

export interface ScienceSparkData {
  takeaway: string;
  challengeQuestion: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  sanskritWord: string;
  sanskritMeaning: string;
  audioText: string;
}

export interface ParentNotesData {
  overview: string;
  learningOutcomes: string[];
  cbseLinks: string[];
  homeInquiryPrompt: string;
}

export interface MissionCardData {
  id: string;
  code: string;
  icon: string;
  kidTitle: string;
  sanskritSubtitle: string;
  scholarlyTitle: string;
  subject: string;
  school: string;
  category: 'matter' | 'cosmos' | 'life' | 'waves';
  ageRange: string;
  ageGroup: 'Ages 6–8' | 'Ages 8–11' | 'Ages 11+';
  difficulty: 1 | 2 | 3;
  badgeId: string;
  badgeName: string;
  badgeIcon: string;
  badgeSanskrit: string;
  missionGoal: string;
  howToPlay: string[];
  tint: string;
  ink: string;
  glow: string;
  scienceSpark: ScienceSparkData;
  parentNotes: ParentNotesData;
}

export interface DailyChallenge {
  id: string;
  targetGameId: string;
  title: string;
  task: string;
  rewardStars: number;
}

export interface ExplorerStats {
  level: number;
  totalStars: number;
  starsByGame: Record<string, number>;
  unlockedBadges: string[];
  completedMissions: string[];
  dailyChallengeCompletedDate?: string;
}

export const STORAGE_KEY_EXPLORER = 'vijnana_mission_control_explorer_v1';

export const CORE_MISSION_CARDS: MissionCardData[] = [
  // 1. Atom Builder
  {
    id: 'paramanu',
    code: 'SEC-01',
    icon: '⚛️',
    kidTitle: 'Atom Builder: Make Matter!',
    sanskritSubtitle: 'परमाणु-निर्माणम् · Vaiśeṣika',
    scholarlyTitle: 'Paramāṇu Builder',
    subject: 'Physics & Chemistry',
    school: 'Vaiśeṣika Darśana (कणाद-परमाणुवादः)',
    category: 'matter',
    ageRange: 'Ages 9–14 · Grades 5–8',
    ageGroup: 'Ages 11+',
    difficulty: 2,
    badgeId: 'atom_architect',
    badgeName: 'Atom Architect',
    badgeIcon: '⚛️',
    badgeSanskrit: 'परमाणु-शिल्पी',
    missionGoal: 'Fuse raw atoms into dyads (Dvyaṇuka) and triads (Tryaṇuka) to build the visible universe!',
    howToPlay: [
      'Drag and pair two single Paramāṇu particles together to create a Dvyaṇuka (dyad).',
      'Join three Dvyaṇukas to form a Tryaṇuka, the smallest particle visible in a sunbeam.',
      'Check the mass spectrometer to verify atomic stability and complete the mission!'
    ],
    tint: 'rgba(245, 158, 11, 0.14)',
    ink: '#fde047',
    glow: '#f59e0b',
    scienceSpark: {
      takeaway: 'Everything in the universe is made of microscopic building blocks called atoms (Paramāṇu). In ancient Vaiśeṣika physics (6th century BCE), two atoms form a Dvyaṇuka, and three pairs form a visible Tryaṇuka speck of dust!',
      challengeQuestion: 'How many single atoms (Paramāṇus) are needed to make one visible Tryaṇuka speck?',
      options: ['2 single atoms', '4 single atoms', '6 single atoms (3 pairs)', '12 single atoms'],
      correctOptionIndex: 2,
      explanation: 'Super! 2 Paramāṇus make 1 Dvyaṇuka. Three Dvyaṇukas combine to form 1 Tryaṇuka (2 × 3 = 6 atoms)!',
      sanskritWord: 'परमाणुः (Paramāṇu)',
      sanskritMeaning: 'The indivisible atomic building block of all matter',
      audioText: 'परमाणुः',
    },
    parentNotes: {
      overview: "Introduces atomic theory through Sage Kaṇāda's Vaiśeṣika Darśana, which proposed atomic building blocks centuries before modern atomic chemistry.",
      learningOutcomes: [
        'Understand that all physical substances are made of microscopic particles.',
        'Visualize how chemical combination pairs simple atoms into compound molecules.',
        'Connect Indian scientific traditions with modern atomic numbers and mass.'
      ],
      cbseLinks: [
        'CBSE Class 8 Science Chapter 4: Materials: Metals and Non-Metals',
        'CBSE Class 9 Science Chapter 3: Atoms and Molecules'
      ],
      homeInquiryPrompt: 'Look at a sunny ray streaming into a dark room. Can you see tiny dust motes dancing in the light? That is the exact size Sage Kaṇāda called a Tryaṇuka!'
    }
  },

  // 2. Nature Balance Game
  {
    id: 'prakriti',
    code: 'SEC-03',
    icon: '🌿',
    kidTitle: 'Nature Balance Game',
    sanskritSubtitle: 'प्रकृति-जैवमण्डलम् · Tridoṣa',
    scholarlyTitle: 'Prakṛti Biosphere',
    subject: 'Biology & Ecology',
    school: 'Tridoṣa Engine (आयुर्वेद)',
    category: 'life',
    ageRange: 'Ages 6–10 · Grades 1–5',
    ageGroup: 'Ages 6–8',
    difficulty: 1,
    badgeId: 'nature_guardian',
    badgeName: 'Nature Guardian',
    badgeIcon: '🌿',
    badgeSanskrit: 'प्रकृति-रक्षकः',
    missionGoal: 'Balance Vāta (Wind), Pitta (Fire), and Kapha (Water/Earth) as seasons change to keep the organism healthy!',
    howToPlay: [
      'Observe the seasonal weather dial shifting from Summer to Monsoon to Winter.',
      'Adjust cooling moisture, shade, and nutrition sliders when heat or dryness spikes.',
      'Maintain the central Nāḍī pulse waveform in the green equilibrium zone.'
    ],
    tint: 'rgba(16, 185, 129, 0.14)',
    ink: '#34d399',
    glow: '#10b981',
    scienceSpark: {
      takeaway: 'Living ecosystems and human bodies stay healthy through dynamic equilibrium (homeostasis). When summer sun increases heat (Pitta), cooling water and shade restore natural harmony!',
      challengeQuestion: 'When scorching summer heat makes Pitta spike too high, which element restores balance?',
      options: ['More heat and spicy food 🔥', 'Cooling water and Kapha 💧', 'Dry wind and speed 💨', 'Heavy stone 🪨'],
      correctOptionIndex: 1,
      explanation: 'Exactly! Cooling fluids, hydration, and restful shade counterbalance excess heat to restore Samadoṣa.',
      sanskritWord: 'समदोषः (Samadoṣa)',
      sanskritMeaning: 'Dynamic equilibrium of vital life forces / Perfect bodily harmony',
      audioText: 'समदोषः',
    },
    parentNotes: {
      overview: 'Connects biological homeostasis, hydration, and ecosystem feedback loops with ancient Āyurvedic Tridoṣa principles.',
      learningOutcomes: [
        'Understand how living systems self-regulate against environmental stress.',
        'Learn the relationship between seasonal weather, body temperature, and hydration.',
        'Explore holistic wellness concepts preserved in classical Indian medicine.'
      ],
      cbseLinks: [
        'CBSE Class 7 Science Chapter 7: Weather, Climate and Adaptations of Animals',
        'CBSE Class 6 Science Chapter 9: The Living Organisms and their Surroundings'
      ],
      homeInquiryPrompt: 'Notice why you crave cold water and juicy melons in summer, but warm soup in winter. How does your body intuitively self-regulate?'
    }
  },

  // 3. Planet Pull: Gravity Playground
  {
    id: 'jyotisha',
    code: 'SEC-05',
    icon: '🪐',
    kidTitle: 'Planet Pull: Gravity Playground',
    sanskritSubtitle: 'गुरुत्व-कक्षा-क्रीडा · Jyotiṣa',
    scholarlyTitle: 'Jyotiṣa Gravity Sandbox',
    subject: 'Astronomy & Gravity',
    school: 'Āryabhaṭīya (खगोल-शास्त्र)',
    category: 'cosmos',
    ageRange: 'Ages 8–12 · Grades 3–6',
    ageGroup: 'Ages 8–11',
    difficulty: 2,
    badgeId: 'orbit_master',
    badgeName: 'Orbit Master',
    badgeIcon: '🪐',
    badgeSanskrit: 'कक्षा-नायकः',
    missionGoal: 'Launch Earth and Moon into a stable orbital velocity around the Sun without crashing or escaping!',
    howToPlay: [
      'Aim your launch vector arrow to set the initial speed and angle of the satellite.',
      'Balance forward momentum against the Sun’s gravitational pull.',
      'Track the Moon’s gentle spiral through the 27 Nakṣatras across the cosmic star map.'
    ],
    tint: 'rgba(99, 102, 241, 0.14)',
    ink: '#a5b4fc',
    glow: '#6366f1',
    scienceSpark: {
      takeaway: 'Gravity is the invisible cosmic glue pulling objects together! In Āryabhaṭa’s astronomy (499 CE), heavenly bodies pull on each other in an infinite gravitational dance.',
      challengeQuestion: 'What happens if an orbiting planet moves too slowly against the Sun’s gravitational pull?',
      options: ['It flies out into deep space', 'It spirals inward and crashes into the Sun', 'It stops in place like a parked car', 'It transforms into a shooting star'],
      correctOptionIndex: 1,
      explanation: 'Spot on! Without enough forward orbital velocity, gravity pulls the planet straight inward toward the star!',
      sanskritWord: 'गुरुत्वाकर्षणम् (Gurutvākarṣaṇam)',
      sanskritMeaning: 'Gravitational attraction / The pulling force of heavenly spheres',
      audioText: 'गुरुत्वाकर्षणम्',
    },
    parentNotes: {
      overview: 'Hands-on planetary mechanics illustrating gravitational force, orbital velocity, and planetary motions alongside Āryabhaṭa’s historic astronomical models.',
      learningOutcomes: [
        'Understand why planets and moons do not fall into their parent stars.',
        'Visualize gravitational attraction as an inverse-square force.',
        'Appreciate ancient Indian contributions to mathematical astronomy and time measurement.'
      ],
      cbseLinks: [
        'CBSE Class 8 Science Chapter 17: Stars and the Solar System',
        'CBSE Class 9 Science Chapter 10: Gravitation'
      ],
      homeInquiryPrompt: 'If you tie an eraser to a string and swing it in a circle, your hand acts like the Sun pulling on Earth. What happens if you let go of the string?'
    }
  },

  // 4. Pattern Weaver
  {
    id: 'srishti-sthiti-laya',
    code: 'SEC-08',
    icon: '🧵',
    kidTitle: 'Pattern Weaver',
    sanskritSubtitle: 'आरुणि-सृष्टि-तन्त्रम् · Āruṇi',
    scholarlyTitle: 'The Loom of Āruṇi',
    subject: 'Waves & Conservation',
    school: 'Satkāryavāda (साङ्ख्य & छान्दोग्य)',
    category: 'waves',
    ageRange: 'Ages 9–14 · Grades 5–8',
    ageGroup: 'Ages 11+',
    difficulty: 2,
    badgeId: 'pattern_weaver',
    badgeName: 'Pattern Weaver',
    badgeIcon: '🧵',
    badgeSanskrit: 'तन्त्र-विशारदः',
    missionGoal: 'Gather scattered energy quanta into shape, hold steady, and verify not a single speck of reality is lost!',
    howToPlay: [
      'Activate Sṛṣṭi (Creation) to gather free quantum particles into geometric symmetry.',
      'Engage Sthiti (Preservation) to maintain balanced resonance across the field.',
      'Initiate Laya (Transformation) and observe that total energy remains constant!'
    ],
    tint: 'rgba(244, 63, 94, 0.14)',
    ink: '#fb7185',
    glow: '#f43f5e',
    scienceSpark: {
      takeaway: 'Energy and matter can never be created from nothing or destroyed into nothingness. In Sage Āruṇi’s Satkāryavāda science, patterns shift forms, but total reality is conserved!',
      challengeQuestion: 'When water boils and evaporates into steam, has any water vanished from reality?',
      options: ['Yes, it disappeared forever', 'No, it changed phase into gas with the exact same mass', 'Only half the water is conserved', 'It turned into pure empty vacuum'],
      correctOptionIndex: 1,
      explanation: 'Awesome! Water molecules simply spread out into invisible gas—every single molecule continues to exist!',
      sanskritWord: 'सत्कार्यवादः (Satkāryavāda)',
      sanskritMeaning: 'The conservation principle: Nothing comes from nothing, and nothing is destroyed',
      audioText: 'सत्कार्यवादः',
    },
    parentNotes: {
      overview: 'Bridges conservation of energy and quantum field stability with the philosophical insights of the Chāndogya Upaniṣad.',
      learningOutcomes: [
        'Understand the fundamental scientific principle of Conservation of Energy.',
        'Distinguish between physical transformations and destruction.',
        'Explore how ancient Indian thinkers formulated principles of causality.'
      ],
      cbseLinks: [
        'CBSE Class 9 Science Chapter 11: Work and Energy',
        'CBSE Class 11 Physics Chapter 6: Work, Energy and Power'
      ],
      homeInquiryPrompt: 'When you burn wood in a campfire, where does the wood go? Does it vanish, or does it turn into invisible smoke, water vapor, and ash?'
    }
  },

  // 5. Sound Detective
  {
    id: 'nada-brahman',
    code: 'SEC-07',
    icon: '🪕',
    kidTitle: 'Sound Detective',
    sanskritSubtitle: 'नाद-विहारः · Cymatics',
    scholarlyTitle: 'Cosmic Sitār Tuning',
    subject: 'Sound & Cymatics',
    school: 'Nāda Brahman (सङ्गीत-शास्त्र)',
    category: 'waves',
    ageRange: 'Ages 6–11 · Grades 2–6',
    ageGroup: 'Ages 6–8',
    difficulty: 1,
    badgeId: 'sound_wizard',
    badgeName: 'Sound Wizard',
    badgeIcon: '🪕',
    badgeSanskrit: 'नाद-प्रवीणः',
    missionGoal: 'Tune vibrating strings, increase pitch frequencies, and uncover hidden Chladni sand mandalas!',
    howToPlay: [
      'Pluck the sitār string to generate physical sound vibrations.',
      'Slide the pitch frequency lever up and down across the 22 ancient Śrutis.',
      'Watch fine sand grains dance across the metal plate into symmetric geometric mandalas.'
    ],
    tint: 'rgba(168, 85, 247, 0.14)',
    ink: '#c084fc',
    glow: '#a855f7',
    scienceSpark: {
      takeaway: 'Sound is not just something you hear—it is a physical vibration that moves matter! High frequencies vibrate faster, pushing grains of sand into intricate geometric mandalas.',
      challengeQuestion: 'What happens to the sand patterns on a vibrating metal plate when you play higher musical notes?',
      options: ['The sand stops moving completely', 'The patterns become more intricate and geometric', 'All the sand falls off in a straight line', 'The sand turns into liquid'],
      correctOptionIndex: 1,
      explanation: 'Brilliant! Higher frequencies create more nodal vibration lines, producing fascinating geometric mandalas!',
      sanskritWord: 'नादब्रह्म (Nādabrahma)',
      sanskritMeaning: 'Primordial sound vibration / Physical resonance that generates form',
      audioText: 'नादब्रह्म',
    },
    parentNotes: {
      overview: 'Introduces acoustic wave mechanics, harmonics, and cymatics using the classical Indian 22-Śruti musical system.',
      learningOutcomes: [
        'Understand that sound is produced by vibrating objects and travels in waves.',
        'Observe the direct visual relationship between sound frequency and geometric patterns.',
        'Appreciate Indian classical music as a mathematical and physical acoustic science.'
      ],
      cbseLinks: [
        'CBSE Class 8 Science Chapter 13: Sound',
        'CBSE Class 9 Science Chapter 12: Sound'
      ],
      homeInquiryPrompt: 'Gently place your fingers on your throat while humming a low note, then a high note. Feel how much faster your vocal cords vibrate!'
    }
  },

  // 6. Heat & Matter Mystery
  {
    id: 'asato-ma',
    code: 'SEC-02',
    icon: '🕯️',
    kidTitle: 'Heat & Matter Mystery',
    sanskritSubtitle: 'पदार्थ-अवस्थाः · Rasaśāstra',
    scholarlyTitle: 'The Veil of Māyā',
    subject: 'Matter & Heat Conservation',
    school: 'Andha-Mūṣā Crucible (रसशास्त्र)',
    category: 'matter',
    ageRange: 'Ages 7–11 · Grades 3–6',
    ageGroup: 'Ages 8–11',
    difficulty: 1,
    badgeId: 'thermal_master',
    badgeName: 'Thermal Master',
    badgeIcon: '🕯️',
    badgeSanskrit: 'पदार्थ-वेत्ता',
    missionGoal: 'Heat, freeze, and transform matter in the sealed crucible while verifying the digital scale stays at 100.000g!',
    howToPlay: [
      'Turn on the burner to melt solid blocks into liquid, then vaporize into gas.',
      'Engage the Viveka Scanner to see through the illusion of disappearing matter.',
      'Observe the precision digital scale: mass stays locked at exactly 100.000 grams.'
    ],
    tint: 'rgba(234, 179, 8, 0.14)',
    ink: '#fde047',
    glow: '#eab308',
    scienceSpark: {
      takeaway: 'Matter changes appearances between solid, liquid, and gas, but inside a sealed crucible, every atom is conserved. Shifting states are Māyā (illusion), but invariant mass is Sat (truth)!',
      challengeQuestion: 'If 100 grams of ice completely melts into water inside a sealed bottle, what will it weigh on the scale?',
      options: ['50 grams', '85 grams', 'Exactly 100 grams', '150 grams'],
      correctOptionIndex: 2,
      explanation: 'Spot on! Melting changes the state of matter, but the number of molecules remains identical: 100.000 grams!',
      sanskritWord: 'अविनाशिता (Avināśitā)',
      sanskritMeaning: 'Indestructibility / Law of Conservation of Mass',
      audioText: 'अविनाशिता',
    },
    parentNotes: {
      overview: 'Demonstrates the Law of Conservation of Mass through closed-system crucible experiments (Andha-Mūṣā) drawn from ancient Rasaśāstra texts.',
      learningOutcomes: [
        'Identify the three primary states of matter (solid, liquid, gas).',
        'Learn that phase changes do not alter total mass in a closed system.',
        'Distinguish between superficial sensory impressions and empirical scientific measurements.'
      ],
      cbseLinks: [
        'CBSE Class 6 Science Chapter 4: Sorting Materials into Groups',
        'CBSE Class 9 Science Chapter 1: Matter in Our Surroundings'
      ],
      homeInquiryPrompt: 'Put ice cubes in a tightly sealed ziplock bag and weigh it before and after melting. Does the scale change? Try it at home!'
    }
  },

  // 7. Life Explorer Map
  {
    id: 'chaturyoni',
    code: 'SEC-04',
    icon: '🦢',
    kidTitle: 'Life Explorer Map',
    sanskritSubtitle: 'चतुर्योनि-प्राणिनः · Taxonomy',
    scholarlyTitle: 'Chaturyoni Spawn Map',
    subject: 'Life Science & Bio-Electricity',
    school: 'Vṛkṣāyurveda & J.C. Bose',
    category: 'life',
    ageRange: 'Ages 6–10 · Grades 1–5',
    ageGroup: 'Ages 6–8',
    difficulty: 1,
    badgeId: 'life_explorer',
    badgeName: 'Life Explorer',
    badgeIcon: '🦢',
    badgeSanskrit: 'जीव-अन्वेषकः',
    missionGoal: 'Explore 4 ancient life realms and attach Sir J.C. Bose’s electrical probe to measure living plant heartbeats!',
    howToPlay: [
      'Sort creatures into the 4 birth categories: Womb-born, Egg-born, Moisture-born, and Seed-born.',
      'Touch the Mimosa plant leaf with light, warmth, and gentle touch.',
      'Observe Sir J.C. Bose’s microvolt galvanometer chart spikes of electrical response.'
    ],
    tint: 'rgba(249, 115, 22, 0.14)',
    ink: '#fb923c',
    glow: '#f97316',
    scienceSpark: {
      takeaway: 'Ancient Indian taxonomy grouped living beings by birth method: Jarāyuja (mammals), Aṇḍaja (birds & reptiles), Svedaja (micro-life), and Udbhijja (sprouting plants). Indian scientist Sir J.C. Bose proved plants generate electrical impulses just like animal nerves!',
      challengeQuestion: 'Into which life category do deer, monkeys, elephants, and humans belong?',
      options: ['Aṇḍaja (Egg-born) 🥚', 'Jarāyuja (Womb-born mammals) 🦌', 'Udbhijja (Seed-born plants) 🌱', 'Svedaja (Moisture-born) 💧'],
      correctOptionIndex: 1,
      explanation: 'Super! Jarāyuja refers to viviparous mammals who develop in a mother’s womb and are nurtured with milk.',
      sanskritWord: 'चतुर्योनिः (Caturyoniḥ)',
      sanskritMeaning: 'The classical fourfold biological origin of all living creatures',
      audioText: 'चतुर्योनिः',
    },
    parentNotes: {
      overview: 'Integrates classical Indian biological taxonomy from the Upaniṣads with Sir Jagadish Chandra Bose’s pioneering plant electrophysiology.',
      learningOutcomes: [
        'Understand biological classification based on embryonic origin.',
        'Discover that plants actively sense and respond to their environment.',
        'Learn about Sir J.C. Bose’s historic inventions in bio-physics.'
      ],
      cbseLinks: [
        'CBSE Class 6 Science Chapter 9: Living Organisms and Surroundings',
        'CBSE Class 7 Science Chapter 1: Nutrition in Plants'
      ],
      homeInquiryPrompt: 'Have you ever seen a Touch-Me-Not plant fold its leaves? Why does it do that? Because electrical signals tell its cells to pump water away!'
    }
  },

  // 8. Moon Mission Launcher
  {
    id: 'chandrayaan',
    code: 'SEC-06',
    icon: '🛰️',
    kidTitle: 'Moon Mission Launcher',
    sanskritSubtitle: 'चन्द्रयान-प्रक्षेपः · Somayāna',
    scholarlyTitle: 'Somayāna Mission-03',
    subject: 'Spaceflight & Telemetry',
    school: 'ISRO Chandrayaan-3',
    category: 'cosmos',
    ageRange: 'Ages 8–14 · Grades 4–9',
    ageGroup: 'Ages 8–11',
    difficulty: 2,
    badgeId: 'space_captain',
    badgeName: 'Space Captain',
    badgeIcon: '🛰️',
    badgeSanskrit: 'अन्तरिक्ष-नायकः',
    missionGoal: 'Calculate retro-rocket thrust, brake orbital descent, and soft-land at the Lunar South Pole!',
    howToPlay: [
      'Enter lunar orbit and calculate the optimal descent angle.',
      'Fire the four retro-thruster throttle engines to eliminate horizontal and vertical velocity.',
      'Deploy the Pragyan rover and fire LIBS laser pulses to detect sulphur and polar water ice.'
    ],
    tint: 'rgba(6, 182, 212, 0.14)',
    ink: '#38bdf8',
    glow: '#06b6d4',
    scienceSpark: {
      takeaway: 'To touch down safely on the airless Moon, spacecraft use retro-rockets firing downward to cancel falling speed. India’s Chandrayaan-3 was the first spacecraft in human history to land on the Lunar South Pole!',
      challengeQuestion: 'Why cannot a lunar lander use giant parachutes to slow down on the Moon?',
      options: ['Parachutes are too heavy to carry into space', 'The Moon has no air or atmosphere to catch the parachute', 'The Moon is too cold for parachute fabric', 'Lunar gravity makes parachutes fly upwards'],
      correctOptionIndex: 1,
      explanation: 'Spot on! Parachutes need air resistance (atmospheric friction) to slow down. On the vacuum of the Moon, only retro-rocket thrust can brake the descent!',
      sanskritWord: 'सोमयानम् (Somayānam)',
      sanskritMeaning: 'Lunar spacecraft / Vehicle for exploring the Moon',
      audioText: 'सोमयानम्',
    },
    parentNotes: {
      overview: 'Simulates ISRO’s historic Chandrayaan-3 mission, teaching thrust vectors, gravity wells, deceleration physics, and planetary surface spectroscopy.',
      learningOutcomes: [
        'Understand gravity on the Moon (one-sixth of Earth gravity).',
        'Learn how Newton’s Third Law of Motion governs rocket deceleration in a vacuum.',
        'Celebrate Indian aerospace excellence and robotic lunar exploration.'
      ],
      cbseLinks: [
        'CBSE Class 8 Science Chapter 17: Stars and the Solar System',
        'CBSE Class 9 Science Chapter 9: Force and Laws of Motion'
      ],
      homeInquiryPrompt: 'If you can jump 1 foot high on Earth, how high could you jump on the Moon with 1/6th gravity? (Answer: 6 whole feet high!)'
    }
  }
];

export const DAILY_CHALLENGES: DailyChallenge[] = [
  {
    id: 'dc-1',
    targetGameId: 'paramanu',
    title: 'Atom Architect Challenge',
    task: 'Combine 2 Paramāṇus into a Dvyaṇuka and synthesize a visible Tryaṇuka speck!',
    rewardStars: 1,
  },
  {
    id: 'dc-2',
    targetGameId: 'prakriti',
    title: 'Ecosystem Equilibrium',
    task: 'Keep the biosphere Nāḍī waveform in perfect green harmony for 30 seconds!',
    rewardStars: 1,
  },
  {
    id: 'dc-3',
    targetGameId: 'jyotisha',
    title: 'Cosmic Orbit Pilot',
    task: 'Guide the satellite through 3 complete orbits around the Sun without escaping!',
    rewardStars: 1,
  },
  {
    id: 'dc-4',
    targetGameId: 'chandrayaan',
    title: 'Precision Moon Landing',
    task: 'Execute retro-thrust burns and touch down below 2.0 m/s at Shiv Shakti Point!',
    rewardStars: 1,
  },
  {
    id: 'dc-5',
    targetGameId: 'nada-brahman',
    title: 'Sand Mandala Discovery',
    task: 'Tune the sitār string to 440 Hz and reveal the 4-fold Chladni star mandala!',
    rewardStars: 1,
  },
];

export function getTodayChallenge(): DailyChallenge {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  return DAILY_CHALLENGES[dayOfYear % DAILY_CHALLENGES.length];
}

export function getExplorerStats(): ExplorerStats {
  if (typeof window === 'undefined') {
    return { level: 1, totalStars: 0, starsByGame: {}, unlockedBadges: [], completedMissions: [] };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY_EXPLORER);
    if (!raw) return { level: 1, totalStars: 0, starsByGame: {}, unlockedBadges: [], completedMissions: [] };
    const parsed = JSON.parse(raw) as ExplorerStats;
    // Calculate level based on totalStars
    const stars = parsed.totalStars || 0;
    parsed.level = calculateExplorerLevel(stars);
    return parsed;
  } catch {
    return { level: 1, totalStars: 0, starsByGame: {}, unlockedBadges: [], completedMissions: [] };
  }
}

export function saveExplorerStats(stats: ExplorerStats): void {
  if (typeof window === 'undefined') return;
  try {
    stats.level = calculateExplorerLevel(stats.totalStars);
    localStorage.setItem(STORAGE_KEY_EXPLORER, JSON.stringify(stats));
  } catch {}
}

export function calculateExplorerLevel(totalStars: number): number {
  if (totalStars >= 22) return 5; // Vidyā Ācārya (Grand Scientist)
  if (totalStars >= 16) return 4; // Gurukul Scientist
  if (totalStars >= 10) return 3; // Cosmic Ranger
  if (totalStars >= 4) return 2;  // Vidyā Cadet
  return 1;                       // Novice Explorer
}

export function getLevelRankTitle(level: number): { title: string; dev: string } {
  switch (level) {
    case 5:
      return { title: 'Vidyā Ācārya (Grand Scientist)', dev: 'विद्या-आचार्यः' };
    case 4:
      return { title: 'Gurukul Scientist', dev: 'गुरुकुल-वैज्ञानिकः' };
    case 3:
      return { title: 'Cosmic Ranger', dev: 'अन्तरिक्ष-रक्षकः' };
    case 2:
      return { title: 'Vidyā Cadet', dev: 'विद्या-शिष्यः' };
    default:
      return { title: 'Novice Explorer', dev: 'आरम्भिक-अन्वेषकः' };
  }
}

export function getMissionCardById(id: string): MissionCardData | undefined {
  return CORE_MISSION_CARDS.find((c) => c.id === id);
}
