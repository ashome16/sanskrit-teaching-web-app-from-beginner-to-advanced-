export interface VyakaranaModule {
  id: string;
  moduleNumber: number;
  title: string;
  titleSa: string;
  summary: string;
  lessonIds: string[];
  emoji: string;
  color: string;
  badge: string;
}

export interface VyakaranaLesson {
  id: string;
  lessonNumber: number;
  moduleId: string;
  title: string;
  titleSa: string;
  file: string;
  emoji: string;
  summary: string;
  keyConcepts: string[];
  suggestedPractice: string;
  interactiveStudioTopic?: 'vibhakti' | 'linga-vachana' | 'numbers' | 'dhatupatha' | 'sound-teams' | 'science-of-sound' | 'samyukta';
  interactiveStudioLabel?: string;
}

export const VYAKARANA_MODULES: VyakaranaModule[] = [
  {
    id: 'module-1',
    moduleNumber: 1,
    title: 'Foundations & Phonetics',
    titleSa: 'वर्ण-विचारः (Phonetics & Script)',
    summary: 'The physical architecture of sound: Devanāgarī script, 13 vowels, 33 consonants across 5 vocal places, and the distinction between roots and nominal stems.',
    lessonIds: ['lesson-1', 'lesson-2', 'lesson-3'],
    emoji: '🔤',
    color: '#0284c7',
    badge: 'Module 1',
  },
  {
    id: 'module-2',
    moduleNumber: 2,
    title: 'Noun Declensions (Śabda-Rūpa)',
    titleSa: 'शब्द-रूपाणि (Nominal Declensions)',
    summary: 'Mastering the 8 cases (Vibhaktis), 3 numbers, and canonical paradigms for masculine and feminine nouns.',
    lessonIds: ['lesson-4', 'lesson-5', 'lesson-6'],
    emoji: '🏛️',
    color: '#047857',
    badge: 'Module 2',
  },
  {
    id: 'module-3',
    moduleNumber: 3,
    title: 'Verb Conjugations (Dhātu-Rūpa)',
    titleSa: 'धातु-रूपाणि (Verbal Conjugations)',
    summary: 'Igniting action: Present tense (Laṭ Lakāra), the universal ti-taḥ-anti formula, and the philosophical alignment of 3 Persons and Numbers.',
    lessonIds: ['lesson-7', 'lesson-8'],
    emoji: '⚡',
    color: '#d97706',
    badge: 'Module 3',
  },
  {
    id: 'module-4',
    moduleNumber: 4,
    title: 'Sentence Construction & Syntax',
    titleSa: 'वाक्य-रचना सम्भाषणं च (Syntax & Dialogues)',
    summary: 'Bringing it all together: Subject-Verb agreement in active voice (Kartari Prayoga), essential indeclinables (Avyayas), and everyday spoken dialogues.',
    lessonIds: ['lesson-9', 'lesson-10'],
    emoji: '🗣️',
    color: '#7c3aed',
    badge: 'Module 4',
  },
];

export const VYAKARANA_LESSONS: VyakaranaLesson[] = [
  {
    id: 'lesson-1',
    lessonNumber: 1,
    moduleId: 'module-1',
    title: 'Lesson 1: Introduction to Devanāgarī & Vowels (Svara)',
    titleSa: 'देवनागरी-स्वर-परिचयः',
    file: 'grammar/course/lesson-1.txt',
    emoji: '🕉️',
    summary: 'The Devanāgarī script, Shirorekha, 13 core vowels (Short, Long, Diphthongs), and the two modifiers (Anusvāra & Visarga).',
    keyConcepts: ['Devanāgarī', 'Shirorekha', 'Hrasva (Short)', 'Dīrgha (Long)', 'Samyukta (Diphthong)', 'Anusvāra', 'Visarga'],
    suggestedPractice: 'Write each vowel 5 times with top Shirorekha last; practice alternating short vs long vowels (अ vs आ, इ vs ई).',
    interactiveStudioTopic: 'sound-teams',
    interactiveStudioLabel: 'Explore Sound Teams Articulation',
  },
  {
    id: 'lesson-2',
    lessonNumber: 2,
    moduleId: 'module-1',
    title: 'Lesson 2: Consonants (Vyañjana) & Pronunciation Places (Sthāna)',
    titleSa: 'व्यञ्जनानि उच्चारण-स्थानानि च',
    file: 'grammar/course/lesson-2.txt',
    emoji: '🗣️',
    summary: 'The 25 grouped consonants across 5 anatomical vocal places (Throat to Lips), breath dynamics (Alpaprāṇa vs Mahāprāṇa), semivowels, and sibilants.',
    keyConcepts: ['5 Vocal Places (Kaṇṭha to Oṣṭha)', '5 Vargas (Ka, Ca, Ṭa, Ta, Pa)', 'Alpaprāṇa vs Mahāprāṇa', 'Antaḥstha (Semivowels)', 'Ūṣman (Sibilants)'],
    suggestedPractice: 'Chant down the 5 Vargas (क-च-ट-त-प) feeling the outward progression; check breath puffs with hand.',
    interactiveStudioTopic: 'science-of-sound',
    interactiveStudioLabel: 'Watch Science of Sound Masterclass',
  },
  {
    id: 'lesson-3',
    lessonNumber: 3,
    moduleId: 'module-1',
    title: 'Lesson 3: The Concept of Roots (Dhātu) and Nouns (Prātipadika)',
    titleSa: 'धातु-प्रातिपदिक-अवधारणा',
    file: 'grammar/course/lesson-3.txt',
    emoji: '🧬',
    summary: 'The generative architecture of Sanskrit: Verbal roots (Dhātu), crude nominal stems (Prātipadika), the rule "Never use a raw word in a sentence", and Upasarga prefixes.',
    keyConcepts: ['Dhātu (Verbal Root)', 'Prātipadika (Nominal Base)', 'Pada (Inflected Word)', 'Upasarga (22 Prefixes)', 'Apadaṁ na prayuñjīta'],
    suggestedPractice: 'Identify root vs nominal stem in words like √खाद् vs वृक्ष, and observe how prefixes transform √गम्.',
    interactiveStudioTopic: 'dhatupatha',
    interactiveStudioLabel: 'Explore Pāṇinian Dhātupāṭha Studio',
  },
  {
    id: 'lesson-4',
    lessonNumber: 4,
    moduleId: 'module-2',
    title: 'Lesson 4: Introduction to Vibhakti (The 8 Cases)',
    titleSa: 'विभक्ति-परिचयः (कारकाणि च)',
    file: 'grammar/course/lesson-4.txt',
    emoji: '🏛️',
    summary: 'Why Sanskrit does not rely on rigid word order: The 8 Vibhaktis, Kāraka semantic roles (Doer, Object, Means, Recipient, Source, Relation, Location, Address), and 3 Numbers.',
    keyConcepts: ['Word Scrambling Freedom', '8 Vibhaktis', 'Kārakas (Kartā, Karma, Karaṇa...)', 'Singular, Dual, Plural (24 Cells)'],
    suggestedPractice: 'Match each English prepositional question ("From where?", "Whose?", "With what?") to its Sanskrit case.',
    interactiveStudioTopic: 'vibhakti',
    interactiveStudioLabel: 'Open Interactive Vibhakti Guide',
  },
  {
    id: 'lesson-5',
    lessonNumber: 5,
    moduleId: 'module-2',
    title: "Lesson 5: Masculine Nouns Ending in 'a' (Akārānta Pulliṅga)",
    titleSa: 'अकारान्त-पुंल्लिङ्गः (बालक-शब्दः)',
    file: 'grammar/course/lesson-5.txt',
    emoji: '👦',
    summary: 'The master paradigm: बालक (Bālaka - boy). All 8 cases in Singular, Dual, and Plural; dual-column symmetry; unlocking thousands of masculine nouns.',
    keyConcepts: ['Akārānta Pulliṅga', 'Bālaka Paradigm', 'Dual Column Symmetry (-au, -ābhyām, -ayoḥ)', 'Universal Noun Application'],
    suggestedPractice: 'Chant the Bālaka table aloud rhythmically; decline गज (elephant) and वृक्ष (tree) into Case 3 and Case 5.',
    interactiveStudioTopic: 'vibhakti',
    interactiveStudioLabel: 'Practice Bālaka in Vibhakti Lab',
  },
  {
    id: 'lesson-6',
    lessonNumber: 6,
    moduleId: 'module-2',
    title: "Lesson 6: Feminine Nouns Ending in 'ā' and 'ī' (Ākārānta / Īkārānta Strīliṅga)",
    titleSa: 'आकारान्त-ईकारान्त-स्त्रीलिङ्गौ (लता नदी च)',
    file: 'grammar/course/lesson-6.txt',
    emoji: '🌸',
    summary: 'Mastering feminine noun declensions with लता (Latā - vine) and नदी (Nadī - river); key differences with masculine endings (no visarga in Latā singular).',
    keyConcepts: ['Ākārānta Strīliṅga (Latā)', 'Īkārānta Strīliṅga (Nadī)', 'Feminine Dual (-e, -yau)', 'Case 3 Plural (-bhiḥ)'],
    suggestedPractice: 'Decline बालिका (girl) following Latā; decline जननी (mother) following Nadī.',
    interactiveStudioTopic: 'linga-vachana',
    interactiveStudioLabel: 'Open Gender & Number Studio',
  },
  {
    id: 'lesson-7',
    lessonNumber: 7,
    moduleId: 'module-3',
    title: 'Lesson 7: Introduction to Present Tense (Laṭ Lakāra)',
    titleSa: 'लट् लकारः (वर्तमान-कालः)',
    file: 'grammar/course/lesson-7.txt',
    emoji: '⚡',
    summary: 'The 10 Lakāras, present indicative tense (Laṭ Lakāra), the universal ti-taḥ-anti chant formula, and conjugating √पठ्, √गम्, √लिख्, √खाद्.',
    keyConcepts: ['10 Lakāras', 'Laṭ Lakāra (Present Tense)', 'ti-taḥ-anti formula', 'Vowel lengthening in first person (-āmi)'],
    suggestedPractice: 'Recite ti-taḥ-anti / si-thaḥ-tha / mi-vaḥ-maḥ 3 times; conjugate √पठ् for all 9 forms.',
    interactiveStudioTopic: 'dhatupatha',
    interactiveStudioLabel: 'Conjugate in Dhātupāṭha Studio',
  },
  {
    id: 'lesson-8',
    lessonNumber: 8,
    moduleId: 'module-3',
    title: 'Lesson 8: The Three Persons (Puruṣa) and Numbers (Vacana)',
    titleSa: 'त्रयः पुरुषाः त्रीणि वचनानि च',
    file: 'grammar/course/lesson-8.txt',
    emoji: '👥',
    summary: 'Why Sanskrit reverses English person order (Prathama = He/She/Nouns, Madhyama = You, Uttama = I/We); pronoun alignment and full 9-sentence harmony.',
    keyConcepts: ['Prathama Puruṣa (3rd Person)', 'Madhyama Puruṣa (2nd Person)', 'Uttama Puruṣa (1st Person)', 'Pronouns (Saḥ/Tau/Te, Tvam, Aham)'],
    suggestedPractice: 'Pair each pronoun with its verb: सः पठति, त्वं पठसि, अहं पठामि, वयं पठामः.',
    interactiveStudioTopic: 'linga-vachana',
    interactiveStudioLabel: 'Test Pronoun Agreement',
  },
  {
    id: 'lesson-9',
    lessonNumber: 9,
    moduleId: 'module-4',
    title: 'Lesson 9: Basic Subject-Verb Agreement (Kartari Prayoga)',
    titleSa: 'कर्तरि प्रयोगः (वाक्य-रचना)',
    file: 'grammar/course/lesson-9.txt',
    emoji: '✍️',
    summary: 'Active voice syntax rules: Subject in Case 1, Verb matching Subject in Person and Number, Direct Object in Case 2, and why verbs have no gender.',
    keyConcepts: ['Kartari Prayoga', 'Golden Rules of Agreement', 'Genderless Verbs', 'Dvitīyā Object', 'Daṇḍa (।) Punctuation'],
    suggestedPractice: 'Compose 5 Sanskrit sentences using Subject + Object + Verb (e.g. बालकः पुस्तकं पठति).',
  },
  {
    id: 'lesson-10',
    lessonNumber: 10,
    moduleId: 'module-4',
    title: 'Lesson 10: Introduction to Avyayas (Indeclinables) and Simple Dialogues',
    titleSa: 'अव्ययानि सम्भाषणं च (Daily Dialogues)',
    file: 'grammar/course/lesson-10.txt',
    emoji: '🗣️',
    summary: 'Words that never change form: spatial, question, and connecting Avyayas (अत्र, तत्र, कुत्र, अपि, च, सह); 4 everyday dialogues for conversational fluency; course completion!',
    keyConcepts: ['Avyaya Definition', 'Spatial & Question Words', 'च (and) & सह (with)', 'Everyday Sanskrit Dialogues', 'Course Milestone'],
    suggestedPractice: 'Roleplay the greeting dialogue with a friend: "भवतः नाम किम्? मम नाम... भवान् कथम् अस्ति?"',
  },
];

export const getLessonById = (id: string): VyakaranaLesson | undefined => {
  return VYAKARANA_LESSONS.find((l) => l.id === id);
};

export const getNextLesson = (currentId: string): VyakaranaLesson | undefined => {
  const index = VYAKARANA_LESSONS.findIndex((l) => l.id === currentId);
  if (index >= 0 && index < VYAKARANA_LESSONS.length - 1) {
    return VYAKARANA_LESSONS[index + 1];
  }
  return undefined;
};

export const getPrevLesson = (currentId: string): VyakaranaLesson | undefined => {
  const index = VYAKARANA_LESSONS.findIndex((l) => l.id === currentId);
  if (index > 0) {
    return VYAKARANA_LESSONS[index - 1];
  }
  return undefined;
};
