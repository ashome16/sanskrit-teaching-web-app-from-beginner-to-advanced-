// Interactive Root Words, 100 Everyday Sanskrit Sentences & Tiles Puzzle Library

export interface RootWordItem {
  id: string;
  root: string;
  transliteration: string;
  meaningEn: string;
  meaningHi: string;
  icon: string;
  gana: string;
  padam: 'परस्मैपदम्' | 'आत्मनेपदम्' | 'उभयपदम्';
  baseForm: string;
  stem: string;
  conjugations: {
    prathama: { singular: string; dual: string; plural: string; subject: string; translation: string };
    madhyama: { singular: string; dual: string; plural: string; subject: string; translation: string };
    uttama: { singular: string; dual: string; plural: string; subject: string; translation: string };
  };
  sampleSentence: {
    sanskrit: string;
    english: string;
    breakdown: string;
  };
}

export interface SimpleSentenceWord {
  devanagari: string;
  meaning: string;
  role: 'subject' | 'object' | 'verb' | 'adverb' | 'adjective' | 'particle';
  roleLabel: string;
  rootOrStem?: string;
}

export interface SimpleSentenceItem {
  id: string;
  num: number;
  sanskrit: string;
  transliteration: string;
  english: string;
  hindi?: string;
  category:
    | 'etiquette'
    | 'identity'
    | 'daily_actions'
    | 'commands'
    | 'possession'
    | 'time_weather'
    | 'food'
    | 'tenses'
    | 'plurals'
    | 'wisdom';
  categoryLabel: string;
  categoryEn: string;
  levelBadge: string;
  words: SimpleSentenceWord[];
  grammarNote: string;
}

export interface SentencePuzzleItem {
  id: string;
  english: string;
  correctOrder: string[];
  scrambled: string[];
  hint: string;
  explanation: string;
  category?: string;
}

export const SENTENCE_CATEGORIES = [
  { key: 'etiquette', labelDev: '१. शिष्टाचारः', labelEn: 'Greetings & Etiquette', icon: '🙏', count: 10 },
  { key: 'identity', labelDev: '२. परिचयः', labelEn: 'Introductions & Identity', icon: '👤', count: 10 },
  { key: 'daily_actions', labelDev: '३. दैनिकक्रियाः', labelEn: 'Simple Daily Actions', icon: '🚶', count: 10 },
  { key: 'commands', labelDev: '४. आज्ञाप्रयोगाः', labelEn: 'Classroom & Commands', icon: '🗣️', count: 10 },
  { key: 'possession', labelDev: '५. सम्बन्धः', labelEn: 'Possession & Family', icon: '🏡', count: 10 },
  { key: 'time_weather', labelDev: '६. समयः वातावरणं च', labelEn: 'Time & Weather', icon: '☀️', count: 10 },
  { key: 'food', labelDev: '७. भोजनम्', labelEn: 'Food & Dining', icon: '🍲', count: 10 },
  { key: 'tenses', labelDev: '८. भूत-भविष्यत्', labelEn: 'Past & Future Tenses', icon: '⏳', count: 10 },
  { key: 'plurals', labelDev: '९. द्विवचन-बहुवचन', labelEn: 'Duals & Plurals', icon: '👥', count: 10 },
  { key: 'wisdom', labelDev: '१०. सुभाषितानि', labelEn: 'Proverbs & Wisdom', icon: '🪔', count: 10 },
] as const;

export const ROOT_WORDS_LIST: RootWordItem[] = [
  {
    id: 'path',
    root: 'पठ्',
    transliteration: 'paṭh',
    meaningEn: 'to read / study',
    meaningHi: 'पढ़ना',
    icon: '📖',
    gana: 'भ्वादिगणः (१)',
    padam: 'परस्मैपदम्',
    baseForm: 'पठ्',
    stem: 'पठ',
    conjugations: {
      prathama: { singular: 'पठति', dual: 'पठतः', plural: 'पठन्ति', subject: 'सः / सा / बालकः', translation: 'reads' },
      madhyama: { singular: 'पठसि', dual: 'पठथः', plural: 'पठथ', subject: 'त्वम्', translation: 'you read' },
      uttama: { singular: 'पठामि', dual: 'पठावः', plural: 'पठामः', subject: 'अहम्', translation: 'I read' },
    },
    sampleSentence: {
      sanskrit: 'बालकः पुस्तकं पठति।',
      english: 'The boy reads the book.',
      breakdown: 'बालकः (Boy) + पुस्तकम् (Book) + पठति (Reads)',
    },
  },
  {
    id: 'likh',
    root: 'लिख्',
    transliteration: 'likh',
    meaningEn: 'to write',
    meaningHi: 'लिखना',
    icon: '✍️',
    gana: 'तुदादिगणः (६)',
    padam: 'परस्मैपदम्',
    baseForm: 'लिख्',
    stem: 'लिख',
    conjugations: {
      prathama: { singular: 'लिखति', dual: 'लिखतः', plural: 'लिखन्ति', subject: 'सः / सा / बालिका', translation: 'writes' },
      madhyama: { singular: 'लिखसि', dual: 'लिखथः', plural: 'लिखथ', subject: 'त्वम्', translation: 'you write' },
      uttama: { singular: 'लिखामि', dual: 'लिखावः', plural: 'लिखामः', subject: 'अहम्', translation: 'I write' },
    },
    sampleSentence: {
      sanskrit: 'बालिका पत्रं लिखति।',
      english: 'The girl writes a letter.',
      breakdown: 'बालिका (Girl) + पत्रम् (Letter) + लिखति (Writes)',
    },
  },
  {
    id: 'gam',
    root: 'गम् (गच्छ्)',
    transliteration: 'gam (gacch)',
    meaningEn: 'to go',
    meaningHi: 'जाना',
    icon: '🚶',
    gana: 'भ्वादिगणः (१)',
    padam: 'परस्मैपदम्',
    baseForm: 'गम्',
    stem: 'गच्छ',
    conjugations: {
      prathama: { singular: 'गच्छति', dual: 'गच्छतः', plural: 'गच्छन्ति', subject: 'सः / सा / छात्रः', translation: 'goes' },
      madhyama: { singular: 'गच्छसि', dual: 'गच्छथः', plural: 'गच्छथ', subject: 'त्वम्', translation: 'you go' },
      uttama: { singular: 'गच्छामि', dual: 'गच्छावः', plural: 'गच्छामः', subject: 'अहम्', translation: 'I go' },
    },
    sampleSentence: {
      sanskrit: 'छात्रः विद्यालयं गच्छति।',
      english: 'The student goes to school.',
      breakdown: 'छात्रः (Student) + विद्यालयम् (School) + गच्छति (Goes)',
    },
  },
  {
    id: 'khad',
    root: 'खाद्',
    transliteration: 'khād',
    meaningEn: 'to eat',
    meaningHi: 'खाना',
    icon: '🍎',
    gana: 'भ्वादिगणः (१)',
    padam: 'परस्मैपदम्',
    baseForm: 'खाद्',
    stem: 'खाद',
    conjugations: {
      prathama: { singular: 'खादति', dual: 'खादतः', plural: 'खादन्ति', subject: 'सः / सा', translation: 'eats' },
      madhyama: { singular: 'खादसि', dual: 'खादथः', plural: 'खादथ', subject: 'त्वम्', translation: 'you eat' },
      uttama: { singular: 'खादामि', dual: 'खादावः', plural: 'खादामः', subject: 'अहम्', translation: 'I eat' },
    },
    sampleSentence: {
      sanskrit: 'बालकः मधुरं फलं खादति।',
      english: 'The boy eats a sweet fruit.',
      breakdown: 'बालकः (Boy) + मधुरम् (Sweet) + फलम् (Fruit) + खादति (Eats)',
    },
  },
  {
    id: 'pa',
    root: 'पा (पिब्)',
    transliteration: 'pā (pib)',
    meaningEn: 'to drink',
    meaningHi: 'पीना',
    icon: '🥛',
    gana: 'भ्वादिगणः (१)',
    padam: 'परस्मैपदम्',
    baseForm: 'पा',
    stem: 'पिब',
    conjugations: {
      prathama: { singular: 'पिबति', dual: 'पिबतः', plural: 'पिबन्ति', subject: 'सः / सा', translation: 'drinks' },
      madhyama: { singular: 'पिबसि', dual: 'पिबथः', plural: 'पिबथ', subject: 'त्वम्', translation: 'you drink' },
      uttama: { singular: 'पिबामि', dual: 'पिबावः', plural: 'पिबामः', subject: 'अहम्', translation: 'I drink' },
    },
    sampleSentence: {
      sanskrit: 'सा शीतलम् जलं पिबति।',
      english: 'She drinks cool water.',
      breakdown: 'सा (She) + शीतलम् (Cool) + जलम् (Water) + पिबति (Drinks)',
    },
  },
  {
    id: 'dhav',
    root: 'धाव्',
    transliteration: 'dhāv',
    meaningEn: 'to run',
    meaningHi: 'दौड़ना',
    icon: '🐎',
    gana: 'भ्वादिगणः (१)',
    padam: 'परस्मैपदम्',
    baseForm: 'धाव्',
    stem: 'धाव',
    conjugations: {
      prathama: { singular: 'धावति', dual: 'धावतः', plural: 'धावन्ति', subject: 'अश्वः / सः', translation: 'runs' },
      madhyama: { singular: 'धावसि', dual: 'धावथः', plural: 'धावथ', subject: 'त्वम्', translation: 'you run' },
      uttama: { singular: 'धावामि', dual: 'धावावः', plural: 'धावामः', subject: 'अहम्', translation: 'I run' },
    },
    sampleSentence: {
      sanskrit: 'तीव्रम् अश्वः धावति।',
      english: 'The horse runs swiftly.',
      breakdown: 'तीव्रम् (Swiftly) + अश्वः (Horse) + धावति (Runs)',
    },
  },
  {
    id: 'krid',
    root: 'क्रीड्',
    transliteration: 'krīḍ',
    meaningEn: 'to play',
    meaningHi: 'खेलना',
    icon: '⚽',
    gana: 'भ्वादिगणः (१)',
    padam: 'परस्मैपदम्',
    baseForm: 'क्रीड्',
    stem: 'क्रीड',
    conjugations: {
      prathama: { singular: 'क्रीडति', dual: 'क्रीडतः', plural: 'क्रीडन्ति', subject: 'बालकः / बालकाः', translation: 'plays' },
      madhyama: { singular: 'क्रीडसि', dual: 'क्रीडथः', plural: 'क्रीडथ', subject: 'त्वम्', translation: 'you play' },
      uttama: { singular: 'क्रीडामि', dual: 'क्रीडावः', plural: 'क्रीडामः', subject: 'अहम् / वयम्', translation: 'I / we play' },
    },
    sampleSentence: {
      sanskrit: 'वयं क्रीडाङ्गणे क्रीडामः।',
      english: 'We play in the playground.',
      breakdown: 'वयम् (We) + क्रीडाङ्गणे (In playground) + क्रीडामः (Play)',
    },
  },
  {
    id: 'has',
    root: 'हस्',
    transliteration: 'has',
    meaningEn: 'to laugh / smile',
    meaningHi: 'हँसना',
    icon: '😄',
    gana: 'भ्वादिगणः (१)',
    padam: 'परस्मैपदम्',
    baseForm: 'हस्',
    stem: 'हस',
    conjugations: {
      prathama: { singular: 'हसति', dual: 'हसतः', plural: 'हसन्ति', subject: 'शिशुः / सा', translation: 'laughs' },
      madhyama: { singular: 'हससि', dual: 'हसथः', plural: 'हसथ', subject: 'त्वम्', translation: 'you laugh' },
      uttama: { singular: 'हसामि', dual: 'हसावः', plural: 'हसामः', subject: 'अहम्', translation: 'I laugh' },
    },
    sampleSentence: {
      sanskrit: 'सुन्दरः शिशुः हसति।',
      english: 'The charming baby laughs.',
      breakdown: 'सुन्दरः (Charming) + शिशुः (Baby) + हसति (Laughs)',
    },
  },
  {
    id: 'vad',
    root: 'वद्',
    transliteration: 'vad',
    meaningEn: 'to speak / say',
    meaningHi: 'बोलना',
    icon: '🗣️',
    gana: 'भ्वादिगणः (१)',
    padam: 'परस्मैपदम्',
    baseForm: 'वद्',
    stem: 'वद',
    conjugations: {
      prathama: { singular: 'वदति', dual: 'वदतः', plural: 'वदन्ति', subject: 'सः / सा', translation: 'speaks' },
      madhyama: { singular: 'वदसि', dual: 'वदथः', plural: 'वदथ', subject: 'त्वम्', translation: 'you speak' },
      uttama: { singular: 'वदामि', dual: 'वदावः', plural: 'वदामः', subject: 'अहम्', translation: 'I speak' },
    },
    sampleSentence: {
      sanskrit: 'सत्यं प्रियं च वदामि।',
      english: 'I speak truth and kindness.',
      breakdown: 'सत्यम् (Truth) + प्रियम् (Pleasant) + च (And) + वदामि (I speak)',
    },
  },
  {
    id: 'drsh',
    root: 'दृश् (पश्)',
    transliteration: 'dṛś (paś)',
    meaningEn: 'to see / look',
    meaningHi: 'देखना',
    icon: '👁️',
    gana: 'भ्वादिगणः (१)',
    padam: 'परस्मैपदम्',
    baseForm: 'दृश्',
    stem: 'पश्य',
    conjugations: {
      prathama: { singular: 'पश्यति', dual: 'पश्यतः', plural: 'पश्यन्ति', subject: 'सः / सा', translation: 'sees' },
      madhyama: { singular: 'पश्यसि', dual: 'पश्यथः', plural: 'पश्यथ', subject: 'त्वम्', translation: 'you see' },
      uttama: { singular: 'पश्यामि', dual: 'पश्यावः', plural: 'पश्यामः', subject: 'अहम्', translation: 'I see' },
    },
    sampleSentence: {
      sanskrit: 'अहं सुन्दरं मयूरं पश्यामि।',
      english: 'I see a beautiful peacock.',
      breakdown: 'अहम् (I) + सुन्दरम् (Beautiful) + मयूरम् (Peacock) + पश्यामि (See)',
    },
  },
  {
    id: 'nam',
    root: 'नम्',
    transliteration: 'nam',
    meaningEn: 'to bow / salute',
    meaningHi: 'प्रणाम करना',
    icon: '🙏',
    gana: 'भ्वादिगणः (१)',
    padam: 'परस्मैपदम्',
    baseForm: 'नम्',
    stem: 'नम',
    conjugations: {
      prathama: { singular: 'नमति', dual: 'नमतः', plural: 'नमन्ति', subject: 'शिष्यः / सः', translation: 'bows / salutes' },
      madhyama: { singular: 'नमसि', dual: 'नमथः', plural: 'नमथ', subject: 'त्वम्', translation: 'you bow' },
      uttama: { singular: 'नमामि', dual: 'नमावः', plural: 'नमामः', subject: 'अहम्', translation: 'I bow / salute' },
    },
    sampleSentence: {
      sanskrit: 'शिष्यः गुरुं नमति।',
      english: 'The student salutes the teacher.',
      breakdown: 'शिष्यः (Student) + गुरुम् (Teacher) + नमति (Salutes)',
    },
  },
  {
    id: 'stha',
    root: 'स्था (तिष्ठ्)',
    transliteration: 'sthā (tiṣṭh)',
    meaningEn: 'to stand / stay',
    meaningHi: 'खड़े होना / ठहरना',
    icon: '🌳',
    gana: 'भ्वादिगणः (१)',
    padam: 'परस्मैपदम्',
    baseForm: 'स्था',
    stem: 'तिष्ठ',
    conjugations: {
      prathama: { singular: 'तिष्ठति', dual: 'तिष्ठतः', plural: 'तिष्ठन्ति', subject: 'वृक्षः / सः', translation: 'stands' },
      madhyama: { singular: 'तिष्ठसि', dual: 'तिष्ठथः', plural: 'तिष्ठथ', subject: 'त्वम्', translation: 'you stand' },
      uttama: { singular: 'तिष्ठामि', dual: 'तिष्ठावः', plural: 'तिष्ठामः', subject: 'अहम्', translation: 'I stand' },
    },
    sampleSentence: {
      sanskrit: 'विशालः वृक्षः भूमौ तिष्ठति।',
      english: 'The grand tree stands upon the earth.',
      breakdown: 'विशालः (Grand) + वृक्षः (Tree) + भूमौ (On earth) + तिष्ठति (Stands)',
    },
  },
  {
    id: 'kr',
    root: 'कृ',
    transliteration: 'kṛ',
    meaningEn: 'to do / make',
    meaningHi: 'करना',
    icon: '⚙️',
    gana: 'तनादिगणः (८)',
    padam: 'उभयपदम्',
    baseForm: 'कृ',
    stem: 'करो / कुरु',
    conjugations: {
      prathama: { singular: 'करोति', dual: 'कुरुतः', plural: 'कुर्वन्ति', subject: 'सः / सा', translation: 'does' },
      madhyama: { singular: 'करोषि', dual: 'कुरुथः', plural: 'कुरुथ', subject: 'त्वम्', translation: 'you do' },
      uttama: { singular: 'करोमि', dual: 'कुर्वः', plural: 'कुर्मः', subject: 'अहम्', translation: 'I do' },
    },
    sampleSentence: {
      sanskrit: 'त्वं किं करोषि? अहं कार्यं करोमि।',
      english: 'What are you doing? I am doing work.',
      breakdown: 'त्वम् (You) + किम् (What) + करोषि (Do)? अहम् (I) + कार्यम् (Work) + करोमि (Do).',
    },
  },
  {
    id: 'bhu',
    root: 'भू',
    transliteration: 'bhū',
    meaningEn: 'to be / become',
    meaningHi: 'होना',
    icon: '🌟',
    gana: 'भ्वादिगणः (१)',
    padam: 'परस्मैपदम्',
    baseForm: 'भू',
    stem: 'भव',
    conjugations: {
      prathama: { singular: 'भवति', dual: 'भवतः', plural: 'भवन्ति', subject: 'सः / सा / आनन्दः', translation: 'is / becomes' },
      madhyama: { singular: 'भवसि', dual: 'भवथः', plural: 'भवथ', subject: 'त्वम्', translation: 'you are / become' },
      uttama: { singular: 'भवामि', dual: 'भवावः', plural: 'भवामः', subject: 'अहम्', translation: 'I am / become' },
    },
    sampleSentence: {
      sanskrit: 'सर्वत्र शान्तिः भवतु।',
      english: 'May peace prevail everywhere.',
      breakdown: 'सर्वत्र (Everywhere) + शान्तिः (Peace) + भवतु (May it be).',
    },
  },
];

// 100 Progressive Everyday Sanskrit Sentences (Categorized into 10 groups)
export const SIMPLE_SENTENCES_CATALOG: SimpleSentenceItem[] = [
  {
    "id": "s-1",
    "num": 1,
    "sanskrit": "हरिः ॐ।",
    "transliteration": "Hariḥ om.",
    "english": "Hello. / Greetings.",
    "category": "etiquette",
    "categoryLabel": "१. शिष्टाचारः",
    "categoryEn": "Greetings & Etiquette",
    "levelBadge": "Etiquette",
    "words": [
      {
        "devanagari": "हरिः",
        "meaning": "Lord / Divine",
        "role": "subject",
        "roleLabel": "कर्ता / सम्बोधनम्"
      },
      {
        "devanagari": "ॐ",
        "meaning": "Sacred syllable OM",
        "role": "particle",
        "roleLabel": "प्रणव-अव्ययम्"
      }
    ],
    "grammarNote": "Traditional Vedic greeting acknowledging the divinity in everyone."
  },
  {
    "id": "s-2",
    "num": 2,
    "sanskrit": "सुप्रभातम्।",
    "transliteration": "Suprabhātam.",
    "english": "Good morning.",
    "category": "etiquette",
    "categoryLabel": "१. शिष्टाचारः",
    "categoryEn": "Greetings & Etiquette",
    "levelBadge": "Etiquette",
    "words": [
      {
        "devanagari": "सुप्रभातम्",
        "meaning": "Good morning",
        "role": "particle",
        "roleLabel": "मङ्गलवाचक-अव्ययम्"
      }
    ],
    "grammarNote": "Classical morning salutation: सु (good/auspicious) + प्रभातम् (dawn)."
  },
  {
    "id": "s-3",
    "num": 3,
    "sanskrit": "शुभरात्रिः।",
    "transliteration": "Śubharātriḥ.",
    "english": "Good night.",
    "category": "etiquette",
    "categoryLabel": "१. शिष्टाचारः",
    "categoryEn": "Greetings & Etiquette",
    "levelBadge": "Etiquette",
    "words": [
      {
        "devanagari": "शुभरात्रिः",
        "meaning": "Good night",
        "role": "particle",
        "roleLabel": "मङ्गलवाचक-पदम्"
      }
    ],
    "grammarNote": "Compound: शुभ (auspicious) + रात्रिः (night). Used at bedtime."
  },
  {
    "id": "s-4",
    "num": 4,
    "sanskrit": "धन्यवादः।",
    "transliteration": "Dhanyavādaḥ.",
    "english": "Thank you.",
    "category": "etiquette",
    "categoryLabel": "१. शिष्टाचारः",
    "categoryEn": "Greetings & Etiquette",
    "levelBadge": "Etiquette",
    "words": [
      {
        "devanagari": "धन्यवादः",
        "meaning": "Thank you",
        "role": "particle",
        "roleLabel": "कृतज्ञता-पदम्"
      }
    ],
    "grammarNote": "Expression of gratitude: धन्य (blessed) + वादः (words/utterance)."
  },
  {
    "id": "s-5",
    "num": 5,
    "sanskrit": "स्वागतम्।",
    "transliteration": "Svāgatam.",
    "english": "Welcome.",
    "category": "etiquette",
    "categoryLabel": "१. शिष्टाचारः",
    "categoryEn": "Greetings & Etiquette",
    "levelBadge": "Etiquette",
    "words": [
      {
        "devanagari": "स्वागतम्",
        "meaning": "Welcome",
        "role": "particle",
        "roleLabel": "अभिनन्दनम्"
      }
    ],
    "grammarNote": "Traditional hospitality greeting: सु (well) + आगतम् (arrived)."
  },
  {
    "id": "s-6",
    "num": 6,
    "sanskrit": "क्षम्यताम्।",
    "transliteration": "Kṣamyatām.",
    "english": "Excuse me / Forgive me.",
    "category": "etiquette",
    "categoryLabel": "१. शिष्टाचारः",
    "categoryEn": "Greetings & Etiquette",
    "levelBadge": "Etiquette",
    "words": [
      {
        "devanagari": "क्षम्यताम्",
        "meaning": "Please forgive / Excuse me",
        "role": "verb",
        "roleLabel": "कर्मणि लोट् (Passive Imperative)"
      }
    ],
    "grammarNote": "Polite passive imperative: क्षम् धातु in कर्मणि लोट् (May it be pardoned)."
  },
  {
    "id": "s-7",
    "num": 7,
    "sanskrit": "कृपया।",
    "transliteration": "Kṛpayā.",
    "english": "Please.",
    "category": "etiquette",
    "categoryLabel": "१. शिष्टाचारः",
    "categoryEn": "Greetings & Etiquette",
    "levelBadge": "Etiquette",
    "words": [
      {
        "devanagari": "कृपया",
        "meaning": "Please / Kindly",
        "role": "adverb",
        "roleLabel": "अव्ययम् (तृतीया)"
      }
    ],
    "grammarNote": "Instrumental case (तृतीया) of कृपा (grace/kindness) used as an adverb for \"please\"."
  },
  {
    "id": "s-8",
    "num": 8,
    "sanskrit": "अस्तु।",
    "transliteration": "Astu.",
    "english": "Okay / Let it be.",
    "category": "etiquette",
    "categoryLabel": "१. शिष्टाचारः",
    "categoryEn": "Greetings & Etiquette",
    "levelBadge": "Etiquette",
    "words": [
      {
        "devanagari": "अस्तु",
        "meaning": "Let it be / Okay",
        "role": "verb",
        "roleLabel": "अस् धातु लोट्० प्र०पु०"
      }
    ],
    "grammarNote": "Imperative third-person form of अस् (to be): \"Let it be so\"."
  },
  {
    "id": "s-9",
    "num": 9,
    "sanskrit": "श्रीमन्!",
    "transliteration": "Śrīman!",
    "english": "Sir!",
    "category": "etiquette",
    "categoryLabel": "१. शिष्टाचारः",
    "categoryEn": "Greetings & Etiquette",
    "levelBadge": "Etiquette",
    "words": [
      {
        "devanagari": "श्रीमन्",
        "meaning": "Respected Sir",
        "role": "particle",
        "roleLabel": "सम्बोधनम् (पुं०)"
      }
    ],
    "grammarNote": "Vocative singular form (सम्बोधनम्) of the respectful masculine stem श्रीमत्."
  },
  {
    "id": "s-10",
    "num": 10,
    "sanskrit": "मान्ये!",
    "transliteration": "Mānye!",
    "english": "Madam!",
    "category": "etiquette",
    "categoryLabel": "१. शिष्टाचारः",
    "categoryEn": "Greetings & Etiquette",
    "levelBadge": "Etiquette",
    "words": [
      {
        "devanagari": "मान्ये",
        "meaning": "Respected Madam",
        "role": "particle",
        "roleLabel": "सम्बोधनम् (स्त्री०)"
      }
    ],
    "grammarNote": "Vocative singular form (सम्बोधनम्) of the respectful feminine stem मान्या."
  },
  {
    "id": "s-11",
    "num": 11,
    "sanskrit": "भवतः नाम किम्?",
    "transliteration": "Bhavataḥ nāma kim?",
    "english": "What is your name? (to a male)",
    "category": "identity",
    "categoryLabel": "२. परिचयः",
    "categoryEn": "Introductions & Identity",
    "levelBadge": "Identity",
    "words": [
      {
        "devanagari": "भवतः",
        "meaning": "Your (male)",
        "role": "particle",
        "roleLabel": "षष्ठी-विभक्तिः (सम्बन्धः)"
      },
      {
        "devanagari": "नाम",
        "meaning": "Name",
        "role": "subject",
        "roleLabel": "प्रथमा (विशेष्यम्)"
      },
      {
        "devanagari": "किम्",
        "meaning": "What?",
        "role": "adverb",
        "roleLabel": "प्रश्नवाचक-अव्ययम्"
      }
    ],
    "grammarNote": "Genitive भवतः (your) addressed specifically to a male person."
  },
  {
    "id": "s-12",
    "num": 12,
    "sanskrit": "भवत्याः नाम किम्?",
    "transliteration": "Bhavatyāḥ nāma kim?",
    "english": "What is your name? (to a female)",
    "category": "identity",
    "categoryLabel": "२. परिचयः",
    "categoryEn": "Introductions & Identity",
    "levelBadge": "Identity",
    "words": [
      {
        "devanagari": "भवत्याः",
        "meaning": "Your (female)",
        "role": "particle",
        "roleLabel": "षष्ठी-विभक्तिः (स्त्री०)"
      },
      {
        "devanagari": "नाम",
        "meaning": "Name",
        "role": "subject",
        "roleLabel": "प्रथमा (विशेष्यम्)"
      },
      {
        "devanagari": "किम्",
        "meaning": "What?",
        "role": "adverb",
        "roleLabel": "प्रश्नवाचक-अव्ययम्"
      }
    ],
    "grammarNote": "Genitive भवत्याः (your) addressed specifically to a female person."
  },
  {
    "id": "s-13",
    "num": 13,
    "sanskrit": "मम नाम देवः।",
    "transliteration": "Mama nāma devaḥ.",
    "english": "My name is Deva.",
    "category": "identity",
    "categoryLabel": "२. परिचयः",
    "categoryEn": "Introductions & Identity",
    "levelBadge": "Identity",
    "words": [
      {
        "devanagari": "मम",
        "meaning": "My / Mine",
        "role": "particle",
        "roleLabel": "षष्ठी-विभक्तिः (अस्मद्)"
      },
      {
        "devanagari": "नाम",
        "meaning": "Name",
        "role": "subject",
        "roleLabel": "प्रथमा (विशेष्यम्)"
      },
      {
        "devanagari": "देवः",
        "meaning": "Deva",
        "role": "subject",
        "roleLabel": "प्रथमा-एकवचनम् (नाम)"
      }
    ],
    "grammarNote": "मम (my, षष्ठी) + नाम (name, नपुं०) + देवः (name in प्रथमा)."
  },
  {
    "id": "s-14",
    "num": 14,
    "sanskrit": "भवन्तः के?",
    "transliteration": "Bhavantaḥ ke?",
    "english": "Who are you? (plural/respectful)",
    "category": "identity",
    "categoryLabel": "२. परिचयः",
    "categoryEn": "Introductions & Identity",
    "levelBadge": "Identity",
    "words": [
      {
        "devanagari": "भवन्तः",
        "meaning": "You all (respectful)",
        "role": "subject",
        "roleLabel": "प्रथमा-बहुवचनम्"
      },
      {
        "devanagari": "के",
        "meaning": "Who? (plural)",
        "role": "adverb",
        "roleLabel": "प्रश्नवाचक बहुवचनम्"
      }
    ],
    "grammarNote": "Plural respectful inquiry: भवन्तः (You all/Honoured ones) + के (who?)."
  },
  {
    "id": "s-15",
    "num": 15,
    "sanskrit": "अहं छात्रः अस्मि।",
    "transliteration": "Ahaṁ chātraḥ asmi.",
    "english": "I am a student (male).",
    "category": "identity",
    "categoryLabel": "२. परिचयः",
    "categoryEn": "Introductions & Identity",
    "levelBadge": "Identity",
    "words": [
      {
        "devanagari": "अहं",
        "meaning": "I",
        "role": "subject",
        "roleLabel": "कर्ता (अस्मद् प्रथमा)"
      },
      {
        "devanagari": "छात्रः",
        "meaning": "Male student",
        "role": "subject",
        "roleLabel": "विधेय-विशेषणम् (पुं०)"
      },
      {
        "devanagari": "अस्मि",
        "meaning": "am",
        "role": "verb",
        "roleLabel": "अस् धातु लट् उत्तम०"
      }
    ],
    "grammarNote": "First person agreement: अहम् (I) pairs with अस्मि (am). छात्रः indicates a male student."
  },
  {
    "id": "s-16",
    "num": 16,
    "sanskrit": "अहं छात्रा अस्मि।",
    "transliteration": "Ahaṁ chātrā asmi.",
    "english": "I am a student (female).",
    "category": "identity",
    "categoryLabel": "२. परिचयः",
    "categoryEn": "Introductions & Identity",
    "levelBadge": "Identity",
    "words": [
      {
        "devanagari": "अहं",
        "meaning": "I",
        "role": "subject",
        "roleLabel": "कर्ता (अस्मद् प्रथमा)"
      },
      {
        "devanagari": "छात्रा",
        "meaning": "Female student",
        "role": "subject",
        "roleLabel": "विधेय-विशेषणम् (स्त्री०)"
      },
      {
        "devanagari": "अस्मि",
        "meaning": "am",
        "role": "verb",
        "roleLabel": "अस् धातु लट् उत्तम०"
      }
    ],
    "grammarNote": "छात्रा with long -आ represents the feminine student form."
  },
  {
    "id": "s-17",
    "num": 17,
    "sanskrit": "एषः मम मित्रम्।",
    "transliteration": "Eṣaḥ mama mitram.",
    "english": "This is my friend.",
    "category": "identity",
    "categoryLabel": "२. परिचयः",
    "categoryEn": "Introductions & Identity",
    "levelBadge": "Identity",
    "words": [
      {
        "devanagari": "एषः",
        "meaning": "This one (male)",
        "role": "subject",
        "roleLabel": "एतद् पुं० प्रथमा"
      },
      {
        "devanagari": "मम",
        "meaning": "My / Mine",
        "role": "particle",
        "roleLabel": "षष्ठी-विभक्तिः (अस्मद्)"
      },
      {
        "devanagari": "मित्रम्",
        "meaning": "Friend",
        "role": "subject",
        "roleLabel": "नपुंसक प्रथमा"
      }
    ],
    "grammarNote": "मित्रम् (friend) is grammatically neuter in classical Sanskrit regardless of gender."
  },
  {
    "id": "s-18",
    "num": 18,
    "sanskrit": "सः कः?",
    "transliteration": "Saḥ kaḥ?",
    "english": "Who is he?",
    "category": "identity",
    "categoryLabel": "२. परिचयः",
    "categoryEn": "Introductions & Identity",
    "levelBadge": "Identity",
    "words": [
      {
        "devanagari": "सः",
        "meaning": "He",
        "role": "subject",
        "roleLabel": "तद् पुं० प्रथमा"
      },
      {
        "devanagari": "कः",
        "meaning": "Who? (male)",
        "role": "adverb",
        "roleLabel": "किम् पुं० प्रथमा"
      }
    ],
    "grammarNote": "Masculine pronoun inquiry: सः (he) + कः (who?)."
  },
  {
    "id": "s-19",
    "num": 19,
    "sanskrit": "सा का?",
    "transliteration": "Sā kā?",
    "english": "Who is she?",
    "category": "identity",
    "categoryLabel": "२. परिचयः",
    "categoryEn": "Introductions & Identity",
    "levelBadge": "Identity",
    "words": [
      {
        "devanagari": "सा",
        "meaning": "She",
        "role": "subject",
        "roleLabel": "तद् स्त्री० प्रथमा"
      },
      {
        "devanagari": "का",
        "meaning": "Who? (female)",
        "role": "adverb",
        "roleLabel": "किम् स्त्री० प्रथमा"
      }
    ],
    "grammarNote": "Feminine pronoun inquiry: सा (she) + का (who?)."
  },
  {
    "id": "s-20",
    "num": 20,
    "sanskrit": "त्वं कुत्र असि?",
    "transliteration": "Tvaṁ kutra asi?",
    "english": "Where are you?",
    "category": "identity",
    "categoryLabel": "२. परिचयः",
    "categoryEn": "Introductions & Identity",
    "levelBadge": "Identity",
    "words": [
      {
        "devanagari": "त्वं",
        "meaning": "You",
        "role": "subject",
        "roleLabel": "युष्मद् प्रथमा"
      },
      {
        "devanagari": "कुत्र",
        "meaning": "Where?",
        "role": "adverb",
        "roleLabel": "स्थानवाचक-अव्ययम्"
      },
      {
        "devanagari": "असि",
        "meaning": "are",
        "role": "verb",
        "roleLabel": "अस् धातु लट् मध्यम०"
      }
    ],
    "grammarNote": "Second person singular matching: त्वम् (you) pairs with असि (are)."
  },
  {
    "id": "s-21",
    "num": 21,
    "sanskrit": "अहं पठामि।",
    "transliteration": "Ahaṁ paṭhāmi.",
    "english": "I read / study.",
    "category": "daily_actions",
    "categoryLabel": "३. दैनिकक्रियाः",
    "categoryEn": "Simple Daily Actions",
    "levelBadge": "Actions",
    "words": [
      {
        "devanagari": "अहं",
        "meaning": "I",
        "role": "subject",
        "roleLabel": "कर्ता (अस्मद् प्रथमा)"
      },
      {
        "devanagari": "पठामि",
        "meaning": "read / study (I)",
        "role": "verb",
        "roleLabel": "पठ् लट् उत्तम०"
      }
    ],
    "grammarNote": "Present tense (लट् लकारः) matching subject and verb person-endings: अहम् ➔ -आमि, त्वम् ➔ -सि, सः/सा/बालकः ➔ -ति."
  },
  {
    "id": "s-22",
    "num": 22,
    "sanskrit": "त्वं लिखसि।",
    "transliteration": "Tvaṁ likhasi.",
    "english": "You write.",
    "category": "daily_actions",
    "categoryLabel": "३. दैनिकक्रियाः",
    "categoryEn": "Simple Daily Actions",
    "levelBadge": "Actions",
    "words": [
      {
        "devanagari": "त्वं",
        "meaning": "You",
        "role": "subject",
        "roleLabel": "युष्मद् प्रथमा"
      },
      {
        "devanagari": "लिखसि",
        "meaning": "write (you)",
        "role": "verb",
        "roleLabel": "लिख् लट् मध्यम०"
      }
    ],
    "grammarNote": "Present tense (लट् लकारः) matching subject and verb person-endings: अहम् ➔ -आमि, त्वम् ➔ -सि, सः/सा/बालकः ➔ -ति."
  },
  {
    "id": "s-23",
    "num": 23,
    "sanskrit": "सः खादति।",
    "transliteration": "Saḥ khādati.",
    "english": "He eats.",
    "category": "daily_actions",
    "categoryLabel": "३. दैनिकक्रियाः",
    "categoryEn": "Simple Daily Actions",
    "levelBadge": "Actions",
    "words": [
      {
        "devanagari": "सः",
        "meaning": "He",
        "role": "subject",
        "roleLabel": "तद् पुं० प्रथमा"
      },
      {
        "devanagari": "खादति",
        "meaning": "eats",
        "role": "verb",
        "roleLabel": "खाद् लट् प्रथम०"
      }
    ],
    "grammarNote": "Present tense (लट् लकारः) matching subject and verb person-endings: अहम् ➔ -आमि, त्वम् ➔ -सि, सः/सा/बालकः ➔ -ति."
  },
  {
    "id": "s-24",
    "num": 24,
    "sanskrit": "सा पिबति।",
    "transliteration": "Sā pibati.",
    "english": "She drinks.",
    "category": "daily_actions",
    "categoryLabel": "३. दैनिकक्रियाः",
    "categoryEn": "Simple Daily Actions",
    "levelBadge": "Actions",
    "words": [
      {
        "devanagari": "सा",
        "meaning": "She",
        "role": "subject",
        "roleLabel": "तद् स्त्री० प्रथमा"
      },
      {
        "devanagari": "पिबति",
        "meaning": "drinks",
        "role": "verb",
        "roleLabel": "पा/पिब् लट् प्रथम०"
      }
    ],
    "grammarNote": "Present tense (लट् लकारः) matching subject and verb person-endings: अहम् ➔ -आमि, त्वम् ➔ -सि, सः/सा/बालकः ➔ -ति."
  },
  {
    "id": "s-25",
    "num": 25,
    "sanskrit": "बालकः धावति।",
    "transliteration": "Bālakaḥ dhāvati.",
    "english": "The boy runs.",
    "category": "daily_actions",
    "categoryLabel": "३. दैनिकक्रियाः",
    "categoryEn": "Simple Daily Actions",
    "levelBadge": "Actions",
    "words": [
      {
        "devanagari": "बालकः",
        "meaning": "The boy",
        "role": "subject",
        "roleLabel": "कर्ता (पुं० प्रथमा)"
      },
      {
        "devanagari": "धावति",
        "meaning": "runs",
        "role": "verb",
        "roleLabel": "धाव् लट् प्रथम०"
      }
    ],
    "grammarNote": "Present tense (लट् लकारः) matching subject and verb person-endings: अहम् ➔ -आमि, त्वम् ➔ -सि, सः/सा/बालकः ➔ -ति."
  },
  {
    "id": "s-26",
    "num": 26,
    "sanskrit": "बालिका हसति।",
    "transliteration": "Bālikā hasati.",
    "english": "The girl laughs.",
    "category": "daily_actions",
    "categoryLabel": "३. दैनिकक्रियाः",
    "categoryEn": "Simple Daily Actions",
    "levelBadge": "Actions",
    "words": [
      {
        "devanagari": "बालिका",
        "meaning": "The girl",
        "role": "subject",
        "roleLabel": "कर्ता (स्त्री० प्रथमा)"
      },
      {
        "devanagari": "हसति",
        "meaning": "laughs",
        "role": "verb",
        "roleLabel": "हस् लट् प्रथम०"
      }
    ],
    "grammarNote": "Present tense (लट् लकारः) matching subject and verb person-endings: अहम् ➔ -आमि, त्वम् ➔ -सि, सः/सा/बालकः ➔ -ति."
  },
  {
    "id": "s-27",
    "num": 27,
    "sanskrit": "अहं गच्छामि।",
    "transliteration": "Ahaṁ gacchāmi.",
    "english": "I am going.",
    "category": "daily_actions",
    "categoryLabel": "३. दैनिकक्रियाः",
    "categoryEn": "Simple Daily Actions",
    "levelBadge": "Actions",
    "words": [
      {
        "devanagari": "अहं",
        "meaning": "I",
        "role": "subject",
        "roleLabel": "कर्ता (अस्मद् प्रथमा)"
      },
      {
        "devanagari": "गच्छामि",
        "meaning": "am going",
        "role": "verb",
        "roleLabel": "गम् लट् उत्तम०"
      }
    ],
    "grammarNote": "Present tense (लट् लकारः) matching subject and verb person-endings: अहम् ➔ -आमि, त्वम् ➔ -सि, सः/सा/बालकः ➔ -ति."
  },
  {
    "id": "s-28",
    "num": 28,
    "sanskrit": "त्वं आगच्छसि।",
    "transliteration": "Tvaṁ āgacchasi.",
    "english": "You are coming.",
    "category": "daily_actions",
    "categoryLabel": "३. दैनिकक्रियाः",
    "categoryEn": "Simple Daily Actions",
    "levelBadge": "Actions",
    "words": [
      {
        "devanagari": "त्वं",
        "meaning": "You",
        "role": "subject",
        "roleLabel": "युष्मद् प्रथमा"
      },
      {
        "devanagari": "आगच्छसि",
        "meaning": "are coming",
        "role": "verb",
        "roleLabel": "आ+गम् लट् मध्यम०"
      }
    ],
    "grammarNote": "Present tense (लट् लकारः) matching subject and verb person-endings: अहम् ➔ -आमि, त्वम् ➔ -सि, सः/सा/बालकः ➔ -ति."
  },
  {
    "id": "s-29",
    "num": 29,
    "sanskrit": "एषः उपविशति।",
    "transliteration": "Eṣaḥ upaviśati.",
    "english": "This person sits.",
    "category": "daily_actions",
    "categoryLabel": "३. दैनिकक्रियाः",
    "categoryEn": "Simple Daily Actions",
    "levelBadge": "Actions",
    "words": [
      {
        "devanagari": "एषः",
        "meaning": "This one (male)",
        "role": "subject",
        "roleLabel": "एतद् पुं० प्रथमा"
      },
      {
        "devanagari": "उपविशति",
        "meaning": "sits down",
        "role": "verb",
        "roleLabel": "उप+विश् लट् प्रथम०"
      }
    ],
    "grammarNote": "Present tense (लट् लकारः) matching subject and verb person-endings: अहम् ➔ -आमि, त्वम् ➔ -सि, सः/सा/बालकः ➔ -ति."
  },
  {
    "id": "s-30",
    "num": 30,
    "sanskrit": "सः उत्तिष्ठति।",
    "transliteration": "Saḥ uttiṣṭhati.",
    "english": "He stands up.",
    "category": "daily_actions",
    "categoryLabel": "३. दैनिकक्रियाः",
    "categoryEn": "Simple Daily Actions",
    "levelBadge": "Actions",
    "words": [
      {
        "devanagari": "सः",
        "meaning": "He",
        "role": "subject",
        "roleLabel": "तद् पुं० प्रथमा"
      },
      {
        "devanagari": "उत्तिष्ठति",
        "meaning": "stands up",
        "role": "verb",
        "roleLabel": "उद्+स्था लट् प्रथम०"
      }
    ],
    "grammarNote": "Present tense (लट् लकारः) matching subject and verb person-endings: अहम् ➔ -आमि, त्वम् ➔ -सि, सः/सा/बालकः ➔ -ति."
  },
  {
    "id": "s-31",
    "num": 31,
    "sanskrit": "अत्र आगच्छ।",
    "transliteration": "Atra āgaccha.",
    "english": "Come here.",
    "category": "commands",
    "categoryLabel": "४. आज्ञाप्रयोगाः",
    "categoryEn": "Classroom & Commands",
    "levelBadge": "Commands",
    "words": [
      {
        "devanagari": "अत्र",
        "meaning": "Here",
        "role": "adverb",
        "roleLabel": "अव्ययम् (स्थानम्)"
      },
      {
        "devanagari": "आगच्छ",
        "meaning": "Come! (order)",
        "role": "verb",
        "roleLabel": "आ+गम् लोट् मध्यम०"
      }
    ],
    "grammarNote": "Imperative mood (लोट् लकारः) used for instructions, classroom commands, and polite requests."
  },
  {
    "id": "s-32",
    "num": 32,
    "sanskrit": "तत्र गच्छ।",
    "transliteration": "Tatra gaccha.",
    "english": "Go there.",
    "category": "commands",
    "categoryLabel": "४. आज्ञाप्रयोगाः",
    "categoryEn": "Classroom & Commands",
    "levelBadge": "Commands",
    "words": [
      {
        "devanagari": "तत्र",
        "meaning": "There",
        "role": "adverb",
        "roleLabel": "अव्ययम् (स्थानम्)"
      },
      {
        "devanagari": "गच्छ",
        "meaning": "Go! (order)",
        "role": "verb",
        "roleLabel": "गम् लोट् मध्यम०"
      }
    ],
    "grammarNote": "Imperative mood (लोट् लकारः) used for instructions, classroom commands, and polite requests."
  },
  {
    "id": "s-33",
    "num": 33,
    "sanskrit": "पुस्तकम् उद्घाटय।",
    "transliteration": "Pustakam udghāṭaya.",
    "english": "Open the book.",
    "category": "commands",
    "categoryLabel": "४. आज्ञाप्रयोगाः",
    "categoryEn": "Classroom & Commands",
    "levelBadge": "Commands",
    "words": [
      {
        "devanagari": "पुस्तकम्",
        "meaning": "Book",
        "role": "object",
        "roleLabel": "कर्म (द्वितीया)"
      },
      {
        "devanagari": "उद्घाटय",
        "meaning": "Open! (order)",
        "role": "verb",
        "roleLabel": "उद्+घट् णिच् लोट्"
      }
    ],
    "grammarNote": "Imperative mood (लोट् लकारः) used for instructions, classroom commands, and polite requests."
  },
  {
    "id": "s-34",
    "num": 34,
    "sanskrit": "मया सह सम्भाषस्व।",
    "transliteration": "Mayā saha sambhāṣasva.",
    "english": "Talk to me.",
    "category": "commands",
    "categoryLabel": "४. आज्ञाप्रयोगाः",
    "categoryEn": "Classroom & Commands",
    "levelBadge": "Commands",
    "words": [
      {
        "devanagari": "मया",
        "meaning": "With me",
        "role": "particle",
        "roleLabel": "तृतीया-एकवचनम्"
      },
      {
        "devanagari": "सह",
        "meaning": "Along with",
        "role": "particle",
        "roleLabel": "सहार्थे अव्ययम्"
      },
      {
        "devanagari": "सम्भाषस्व",
        "meaning": "Converse / Speak",
        "role": "verb",
        "roleLabel": "सम्+भाष् लोट् आत्मने०"
      }
    ],
    "grammarNote": "Imperative mood (लोट् लकारः) used for instructions, classroom commands, and polite requests."
  },
  {
    "id": "s-35",
    "num": 35,
    "sanskrit": "मह्यम् उत्तरं यच्छ।",
    "transliteration": "Mahyam uttaraṁ yaccha.",
    "english": "Give me an answer.",
    "category": "commands",
    "categoryLabel": "४. आज्ञाप्रयोगाः",
    "categoryEn": "Classroom & Commands",
    "levelBadge": "Commands",
    "words": [
      {
        "devanagari": "मह्यम्",
        "meaning": "To me",
        "role": "particle",
        "roleLabel": "चतुर्थी-विभक्तिः (सम्प्रदानम्)"
      },
      {
        "devanagari": "उत्तरं",
        "meaning": "Answer",
        "role": "object",
        "roleLabel": "कर्म (द्वितीया)"
      },
      {
        "devanagari": "यच्छ",
        "meaning": "Give! (order)",
        "role": "verb",
        "roleLabel": "दा/यच्छ् लोट् मध्यम०"
      }
    ],
    "grammarNote": "Imperative mood (लोट् लकारः) used for instructions, classroom commands, and polite requests."
  },
  {
    "id": "s-36",
    "num": 36,
    "sanskrit": "उच्चैः वद।",
    "transliteration": "Uccaiḥ vada.",
    "english": "Speak loudly.",
    "category": "commands",
    "categoryLabel": "४. आज्ञाप्रयोगाः",
    "categoryEn": "Classroom & Commands",
    "levelBadge": "Commands",
    "words": [
      {
        "devanagari": "उच्चैः",
        "meaning": "Loudly / High",
        "role": "adverb",
        "roleLabel": "क्रियाविशेषणम्"
      },
      {
        "devanagari": "वद",
        "meaning": "Speak! (order)",
        "role": "verb",
        "roleLabel": "वद् लोट् मध्यम०"
      }
    ],
    "grammarNote": "Imperative mood (लोट् लकारः) used for instructions, classroom commands, and polite requests."
  },
  {
    "id": "s-37",
    "num": 37,
    "sanskrit": "मां मा विस्मर।",
    "transliteration": "Māṁ mā vismara.",
    "english": "Don't forget me.",
    "category": "commands",
    "categoryLabel": "४. आज्ञाप्रयोगाः",
    "categoryEn": "Classroom & Commands",
    "levelBadge": "Commands",
    "words": [
      {
        "devanagari": "मां",
        "meaning": "Me",
        "role": "object",
        "roleLabel": "कर्म (द्वितीया-एक०)"
      },
      {
        "devanagari": "मा",
        "meaning": "Do not",
        "role": "particle",
        "roleLabel": "निषेधार्थक-अव्ययम्"
      },
      {
        "devanagari": "विस्मर",
        "meaning": "Forget",
        "role": "verb",
        "roleLabel": "वि+स्मृ लोट् मध्यम०"
      }
    ],
    "grammarNote": "Imperative mood (लोट् लकारः) used for instructions, classroom commands, and polite requests."
  },
  {
    "id": "s-38",
    "num": 38,
    "sanskrit": "ध्यानं ददातु।",
    "transliteration": "Dhyānaṁ dadātu.",
    "english": "Please pay attention.",
    "category": "commands",
    "categoryLabel": "४. आज्ञाप्रयोगाः",
    "categoryEn": "Classroom & Commands",
    "levelBadge": "Commands",
    "words": [
      {
        "devanagari": "ध्यानं",
        "meaning": "Attention",
        "role": "object",
        "roleLabel": "कर्म (द्वितीया)"
      },
      {
        "devanagari": "ददातु",
        "meaning": "Please give",
        "role": "verb",
        "roleLabel": "दा लोट् प्रथम० (आदर)"
      }
    ],
    "grammarNote": "Imperative mood (लोट् लकारः) used for instructions, classroom commands, and polite requests."
  },
  {
    "id": "s-39",
    "num": 39,
    "sanskrit": "चित्रं पश्य।",
    "transliteration": "Citraṁ paśya.",
    "english": "Look at the picture.",
    "category": "commands",
    "categoryLabel": "४. आज्ञाप्रयोगाः",
    "categoryEn": "Classroom & Commands",
    "levelBadge": "Commands",
    "words": [
      {
        "devanagari": "चित्रं",
        "meaning": "Picture / Visual",
        "role": "object",
        "roleLabel": "कर्म (द्वितीया)"
      },
      {
        "devanagari": "पश्य",
        "meaning": "Look / See! (order)",
        "role": "verb",
        "roleLabel": "दृश्/पश्य् लोट् मध्यम०"
      }
    ],
    "grammarNote": "Imperative mood (लोट् लकारः) used for instructions, classroom commands, and polite requests."
  },
  {
    "id": "s-40",
    "num": 40,
    "sanskrit": "इदानीं लिखतु।",
    "transliteration": "Idānīṁ likhatu.",
    "english": "Write now.",
    "category": "commands",
    "categoryLabel": "४. आज्ञाप्रयोगाः",
    "categoryEn": "Classroom & Commands",
    "levelBadge": "Commands",
    "words": [
      {
        "devanagari": "इदानीं",
        "meaning": "Now / At present",
        "role": "adverb",
        "roleLabel": "कालवाचक-अव्ययम्"
      },
      {
        "devanagari": "लिखतु",
        "meaning": "Please write",
        "role": "verb",
        "roleLabel": "लिख् लोट् प्रथम० (आदर)"
      }
    ],
    "grammarNote": "Imperative mood (लोट् लकारः) used for instructions, classroom commands, and polite requests."
  },
  {
    "id": "s-41",
    "num": 41,
    "sanskrit": "एतत् मम गृहम्।",
    "transliteration": "Etat mama gṛham.",
    "english": "This is my house.",
    "category": "possession",
    "categoryLabel": "५. सम्बन्धः",
    "categoryEn": "Possession & Family",
    "levelBadge": "Relationships",
    "words": [
      {
        "devanagari": "एतत्",
        "meaning": "This (neuter)",
        "role": "subject",
        "roleLabel": "एतद् नपुंसक प्रथमा"
      },
      {
        "devanagari": "मम",
        "meaning": "My / Mine",
        "role": "particle",
        "roleLabel": "षष्ठी-विभक्तिः (अस्मद्)"
      },
      {
        "devanagari": "गृहम्",
        "meaning": "House / Home",
        "role": "subject",
        "roleLabel": "विशेष्यम् (नपुंसक)"
      }
    ],
    "grammarNote": "Genitive case (षष्ठी विभक्तिः) expressing possession, origin, and family relationships."
  },
  {
    "id": "s-42",
    "num": 42,
    "sanskrit": "मम माता अस्ति।",
    "transliteration": "Mama mātā asti.",
    "english": "I have a mother.",
    "category": "possession",
    "categoryLabel": "५. सम्बन्धः",
    "categoryEn": "Possession & Family",
    "levelBadge": "Relationships",
    "words": [
      {
        "devanagari": "मम",
        "meaning": "My / Mine",
        "role": "particle",
        "roleLabel": "षष्ठी-विभक्तिः (अस्मद्)"
      },
      {
        "devanagari": "माता",
        "meaning": "Mother",
        "role": "subject",
        "roleLabel": "मातृ प्रथमा-एक०"
      },
      {
        "devanagari": "अस्ति",
        "meaning": "is / exists",
        "role": "verb",
        "roleLabel": "अस् लट् प्रथम०"
      }
    ],
    "grammarNote": "Genitive case (षष्ठी विभक्तिः) expressing possession, origin, and family relationships."
  },
  {
    "id": "s-43",
    "num": 43,
    "sanskrit": "तव भ्राता कुत्र?",
    "transliteration": "Tava bhrātā kutra?",
    "english": "Where is your brother?",
    "category": "possession",
    "categoryLabel": "५. सम्बन्धः",
    "categoryEn": "Possession & Family",
    "levelBadge": "Relationships",
    "words": [
      {
        "devanagari": "तव",
        "meaning": "Your / Yours",
        "role": "particle",
        "roleLabel": "षष्ठी-विभक्तिः (युष्मद्)"
      },
      {
        "devanagari": "भ्राता",
        "meaning": "Brother",
        "role": "subject",
        "roleLabel": "भ्रातृ प्रथमा-एक०"
      },
      {
        "devanagari": "कुत्र",
        "meaning": "Where?",
        "role": "adverb",
        "roleLabel": "स्थानवाचक-अव्ययम्"
      }
    ],
    "grammarNote": "Genitive case (षष्ठी विभक्तिः) expressing possession, origin, and family relationships."
  },
  {
    "id": "s-44",
    "num": 44,
    "sanskrit": "एषा मम भगिनी।",
    "transliteration": "Eṣā mama bhaginī.",
    "english": "This is my sister.",
    "category": "possession",
    "categoryLabel": "५. सम्बन्धः",
    "categoryEn": "Possession & Family",
    "levelBadge": "Relationships",
    "words": [
      {
        "devanagari": "एषा",
        "meaning": "This (female)",
        "role": "subject",
        "roleLabel": "एतद् स्त्री० प्रथमा"
      },
      {
        "devanagari": "मम",
        "meaning": "My / Mine",
        "role": "particle",
        "roleLabel": "षष्ठी-विभक्तिः (अस्मद्)"
      },
      {
        "devanagari": "भगिनी",
        "meaning": "Sister",
        "role": "subject",
        "roleLabel": "स्त्री० प्रथमा-एक०"
      }
    ],
    "grammarNote": "Genitive case (षष्ठी विभक्तिः) expressing possession, origin, and family relationships."
  },
  {
    "id": "s-45",
    "num": 45,
    "sanskrit": "तस्य पिता वैद्यः।",
    "transliteration": "Tasya pitā vaidyaḥ.",
    "english": "His father is a doctor.",
    "category": "possession",
    "categoryLabel": "५. सम्बन्धः",
    "categoryEn": "Possession & Family",
    "levelBadge": "Relationships",
    "words": [
      {
        "devanagari": "तस्य",
        "meaning": "His",
        "role": "particle",
        "roleLabel": "षष्ठी-विभक्तिः (तद् पुं०)"
      },
      {
        "devanagari": "पिता",
        "meaning": "Father",
        "role": "subject",
        "roleLabel": "पितृ प्रथमा-एक०"
      },
      {
        "devanagari": "वैद्यः",
        "meaning": "Doctor / Physician",
        "role": "subject",
        "roleLabel": "विधेयम् (पुं०)"
      }
    ],
    "grammarNote": "Genitive case (षष्ठी विभक्तिः) expressing possession, origin, and family relationships."
  },
  {
    "id": "s-46",
    "num": 46,
    "sanskrit": "तस्याः गृहं विशालम्।",
    "transliteration": "Tasyāḥ gṛhaṁ viśālam.",
    "english": "Her house is large.",
    "category": "possession",
    "categoryLabel": "५. सम्बन्धः",
    "categoryEn": "Possession & Family",
    "levelBadge": "Relationships",
    "words": [
      {
        "devanagari": "तस्याः",
        "meaning": "Her / Hers",
        "role": "particle",
        "roleLabel": "षष्ठी-विभक्तिः (तद् स्त्री०)"
      },
      {
        "devanagari": "गृहं",
        "meaning": "House / Home",
        "role": "subject",
        "roleLabel": "विशेष्यम् (नपुंसक)"
      },
      {
        "devanagari": "विशालम्",
        "meaning": "Spacious / Large",
        "role": "adjective",
        "roleLabel": "विशेषणम् (नपुंसक)"
      }
    ],
    "grammarNote": "Genitive case (षष्ठी विभक्तिः) expressing possession, origin, and family relationships."
  },
  {
    "id": "s-47",
    "num": 47,
    "sanskrit": "किं तव पुस्तकम्?",
    "transliteration": "Kiṁ tava pustakam?",
    "english": "Is this your book?",
    "category": "possession",
    "categoryLabel": "५. सम्बन्धः",
    "categoryEn": "Possession & Family",
    "levelBadge": "Relationships",
    "words": [
      {
        "devanagari": "किं",
        "meaning": "किं",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "तव",
        "meaning": "Your / Yours",
        "role": "particle",
        "roleLabel": "षष्ठी-विभक्तिः (युष्मद्)"
      },
      {
        "devanagari": "पुस्तकम्",
        "meaning": "Book",
        "role": "object",
        "roleLabel": "कर्म (द्वितीया)"
      }
    ],
    "grammarNote": "Genitive case (षष्ठी विभक्तिः) expressing possession, origin, and family relationships."
  },
  {
    "id": "s-48",
    "num": 48,
    "sanskrit": "वृक्षस्य फलानि सन्ति।",
    "transliteration": "Vṛkṣasya phalāni santi.",
    "english": "The tree has fruits.",
    "category": "possession",
    "categoryLabel": "५. सम्बन्धः",
    "categoryEn": "Possession & Family",
    "levelBadge": "Relationships",
    "words": [
      {
        "devanagari": "वृक्षस्य",
        "meaning": "Of the tree",
        "role": "particle",
        "roleLabel": "षष्ठी-विभक्तिः (वृक्ष)"
      },
      {
        "devanagari": "फलानि",
        "meaning": "Fruits (plural)",
        "role": "subject",
        "roleLabel": "प्रथमा-बहुवचनम्"
      },
      {
        "devanagari": "सन्ति",
        "meaning": "are / exist (plural)",
        "role": "verb",
        "roleLabel": "अस् लट् प्रथम बहु०"
      }
    ],
    "grammarNote": "Genitive case (षष्ठी विभक्तिः) expressing possession, origin, and family relationships."
  },
  {
    "id": "s-49",
    "num": 49,
    "sanskrit": "नद्याः जलं शीतलम्।",
    "transliteration": "Nadyāḥ jalaṁ śītalam.",
    "english": "The river's water is cold.",
    "category": "possession",
    "categoryLabel": "५. सम्बन्धः",
    "categoryEn": "Possession & Family",
    "levelBadge": "Relationships",
    "words": [
      {
        "devanagari": "नद्याः",
        "meaning": "Of the river",
        "role": "particle",
        "roleLabel": "षष्ठी-विभक्तिः (नदी)"
      },
      {
        "devanagari": "जलं",
        "meaning": "Water",
        "role": "subject",
        "roleLabel": "प्रथमा-एकवचनम्"
      },
      {
        "devanagari": "शीतलम्",
        "meaning": "Cool / Cold",
        "role": "adjective",
        "roleLabel": "विशेषणम् (शीतल)"
      }
    ],
    "grammarNote": "Genitive case (षष्ठी विभक्तिः) expressing possession, origin, and family relationships."
  },
  {
    "id": "s-50",
    "num": 50,
    "sanskrit": "अहं भवता सह अस्मि।",
    "transliteration": "Ahaṁ bhavatā saha asmi.",
    "english": "I am with you.",
    "category": "possession",
    "categoryLabel": "५. सम्बन्धः",
    "categoryEn": "Possession & Family",
    "levelBadge": "Relationships",
    "words": [
      {
        "devanagari": "अहं",
        "meaning": "I",
        "role": "subject",
        "roleLabel": "कर्ता (अस्मद् प्रथमा)"
      },
      {
        "devanagari": "भवता",
        "meaning": "With you (respectful)",
        "role": "particle",
        "roleLabel": "भवत् तृतीया-एक०"
      },
      {
        "devanagari": "सह",
        "meaning": "Along with",
        "role": "particle",
        "roleLabel": "सहार्थे अव्ययम्"
      },
      {
        "devanagari": "अस्मि",
        "meaning": "am",
        "role": "verb",
        "roleLabel": "अस् धातु लट् उत्तम०"
      }
    ],
    "grammarNote": "Genitive case (षष्ठी विभक्तिः) expressing possession, origin, and family relationships."
  },
  {
    "id": "s-51",
    "num": 51,
    "sanskrit": "इदानीं कः समयः?",
    "transliteration": "Idānīṁ kaḥ samayaḥ?",
    "english": "What time is it now?",
    "category": "time_weather",
    "categoryLabel": "६. समयः वातावरणं च",
    "categoryEn": "Time & Weather",
    "levelBadge": "Time & Nature",
    "words": [
      {
        "devanagari": "इदानीं",
        "meaning": "Now / At present",
        "role": "adverb",
        "roleLabel": "कालवाचक-अव्ययम्"
      },
      {
        "devanagari": "कः",
        "meaning": "Who? (male)",
        "role": "adverb",
        "roleLabel": "किम् पुं० प्रथमा"
      },
      {
        "devanagari": "समयः",
        "meaning": "समयः",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Time and weather markers: अद्य (today), श्वः (tomorrow), ह्यः (yesterday), and weather verbs."
  },
  {
    "id": "s-52",
    "num": 52,
    "sanskrit": "अद्य रविवासरः अस्ति।",
    "transliteration": "Adya ravivāsaraḥ asti.",
    "english": "Today is Sunday.",
    "category": "time_weather",
    "categoryLabel": "६. समयः वातावरणं च",
    "categoryEn": "Time & Weather",
    "levelBadge": "Time & Nature",
    "words": [
      {
        "devanagari": "अद्य",
        "meaning": "Today",
        "role": "adverb",
        "roleLabel": "कालवाचक-अव्ययम्"
      },
      {
        "devanagari": "रविवासरः",
        "meaning": "Sunday",
        "role": "subject",
        "roleLabel": "प्रथमा-एकवचनम्"
      },
      {
        "devanagari": "अस्ति",
        "meaning": "is / exists",
        "role": "verb",
        "roleLabel": "अस् लट् प्रथम०"
      }
    ],
    "grammarNote": "Time and weather markers: अद्य (today), श्वः (tomorrow), ह्यः (yesterday), and weather verbs."
  },
  {
    "id": "s-53",
    "num": 53,
    "sanskrit": "श्वः सोमवासरः।",
    "transliteration": "Śvaḥ somavāsaraḥ.",
    "english": "Tomorrow is Monday.",
    "category": "time_weather",
    "categoryLabel": "६. समयः वातावरणं च",
    "categoryEn": "Time & Weather",
    "levelBadge": "Time & Nature",
    "words": [
      {
        "devanagari": "श्वः",
        "meaning": "Tomorrow",
        "role": "adverb",
        "roleLabel": "कालवाचक-अव्ययम्"
      },
      {
        "devanagari": "सोमवासरः",
        "meaning": "Monday",
        "role": "subject",
        "roleLabel": "प्रथमा-एकवचनम्"
      }
    ],
    "grammarNote": "Time and weather markers: अद्य (today), श्वः (tomorrow), ह्यः (yesterday), and weather verbs."
  },
  {
    "id": "s-54",
    "num": 54,
    "sanskrit": "ह्यः शनिवासरः आसीत्।",
    "transliteration": "Hyaḥ śanivāsaraḥ āsīt.",
    "english": "Yesterday was Saturday.",
    "category": "time_weather",
    "categoryLabel": "६. समयः वातावरणं च",
    "categoryEn": "Time & Weather",
    "levelBadge": "Time & Nature",
    "words": [
      {
        "devanagari": "ह्यः",
        "meaning": "Yesterday",
        "role": "adverb",
        "roleLabel": "कालवाचक-अव्ययम्"
      },
      {
        "devanagari": "शनिवासरः",
        "meaning": "Saturday",
        "role": "subject",
        "roleLabel": "प्रथमा-एकवचनम्"
      },
      {
        "devanagari": "आसीत्",
        "meaning": "was",
        "role": "verb",
        "roleLabel": "अस् लङ् लकारः (भूतकाल)"
      }
    ],
    "grammarNote": "Time and weather markers: अद्य (today), श्वः (tomorrow), ह्यः (yesterday), and weather verbs."
  },
  {
    "id": "s-55",
    "num": 55,
    "sanskrit": "अद्य सूर्यः प्रखरः अस्ति।",
    "transliteration": "Adya sūryaḥ prakharaḥ asti.",
    "english": "Today the sun is bright.",
    "category": "time_weather",
    "categoryLabel": "६. समयः वातावरणं च",
    "categoryEn": "Time & Weather",
    "levelBadge": "Time & Nature",
    "words": [
      {
        "devanagari": "अद्य",
        "meaning": "Today",
        "role": "adverb",
        "roleLabel": "कालवाचक-अव्ययम्"
      },
      {
        "devanagari": "सूर्यः",
        "meaning": "Sun",
        "role": "subject",
        "roleLabel": "पुं० प्रथमा-एक०"
      },
      {
        "devanagari": "प्रखरः",
        "meaning": "Intense / Bright",
        "role": "adjective",
        "roleLabel": "विशेषणम् (पुं०)"
      },
      {
        "devanagari": "अस्ति",
        "meaning": "is / exists",
        "role": "verb",
        "roleLabel": "अस् लट् प्रथम०"
      }
    ],
    "grammarNote": "Time and weather markers: अद्य (today), श्वः (tomorrow), ह्यः (yesterday), and weather verbs."
  },
  {
    "id": "s-56",
    "num": 56,
    "sanskrit": "मेघः वर्षति।",
    "transliteration": "Meghaḥ varṣati.",
    "english": "The cloud is raining.",
    "category": "time_weather",
    "categoryLabel": "६. समयः वातावरणं च",
    "categoryEn": "Time & Weather",
    "levelBadge": "Time & Nature",
    "words": [
      {
        "devanagari": "मेघः",
        "meaning": "Cloud",
        "role": "subject",
        "roleLabel": "पुं० प्रथमा-एक०"
      },
      {
        "devanagari": "वर्षति",
        "meaning": "rains",
        "role": "verb",
        "roleLabel": "वृष् लट् प्रथम०"
      }
    ],
    "grammarNote": "Time and weather markers: अद्य (today), श्वः (tomorrow), ह्यः (yesterday), and weather verbs."
  },
  {
    "id": "s-57",
    "num": 57,
    "sanskrit": "शीतलः वायुः वहति।",
    "transliteration": "Śītalaḥ vāyuḥ vahati.",
    "english": "Cold wind is blowing.",
    "category": "time_weather",
    "categoryLabel": "६. समयः वातावरणं च",
    "categoryEn": "Time & Weather",
    "levelBadge": "Time & Nature",
    "words": [
      {
        "devanagari": "शीतलः",
        "meaning": "Cool / Cold",
        "role": "adjective",
        "roleLabel": "विशेषणम् (पुं०)"
      },
      {
        "devanagari": "वायुः",
        "meaning": "Wind",
        "role": "subject",
        "roleLabel": "पुं० प्रथमा-एक०"
      },
      {
        "devanagari": "वहति",
        "meaning": "blows / flows",
        "role": "verb",
        "roleLabel": "वह् लट् प्रथम०"
      }
    ],
    "grammarNote": "Time and weather markers: अद्य (today), श्वः (tomorrow), ह्यः (yesterday), and weather verbs."
  },
  {
    "id": "s-58",
    "num": 58,
    "sanskrit": "अद्य शैत्यम् अस्ति।",
    "transliteration": "Adya śaityam asti.",
    "english": "It is cold today.",
    "category": "time_weather",
    "categoryLabel": "६. समयः वातावरणं च",
    "categoryEn": "Time & Weather",
    "levelBadge": "Time & Nature",
    "words": [
      {
        "devanagari": "अद्य",
        "meaning": "Today",
        "role": "adverb",
        "roleLabel": "कालवाचक-अव्ययम्"
      },
      {
        "devanagari": "शैत्यम्",
        "meaning": "Coldness / Chill",
        "role": "subject",
        "roleLabel": "नपुंसक प्रथमा"
      },
      {
        "devanagari": "अस्ति",
        "meaning": "is / exists",
        "role": "verb",
        "roleLabel": "अस् लट् प्रथम०"
      }
    ],
    "grammarNote": "Time and weather markers: अद्य (today), श्वः (tomorrow), ह्यः (yesterday), and weather verbs."
  },
  {
    "id": "s-59",
    "num": 59,
    "sanskrit": "सायङ्कालः अभवत्।",
    "transliteration": "Sāyaṅkālaḥ abhavat.",
    "english": "It has become evening.",
    "category": "time_weather",
    "categoryLabel": "६. समयः वातावरणं च",
    "categoryEn": "Time & Weather",
    "levelBadge": "Time & Nature",
    "words": [
      {
        "devanagari": "सायङ्कालः",
        "meaning": "Evening time",
        "role": "subject",
        "roleLabel": "पुं० प्रथमा-एक०"
      },
      {
        "devanagari": "अभवत्",
        "meaning": "became / occurred",
        "role": "verb",
        "roleLabel": "भू लङ् प्रथम० (भूतकाल)"
      }
    ],
    "grammarNote": "Time and weather markers: अद्य (today), श्वः (tomorrow), ह्यः (yesterday), and weather verbs."
  },
  {
    "id": "s-60",
    "num": 60,
    "sanskrit": "कदा गमिष्यसि?",
    "transliteration": "Kadā gamiṣyasi?",
    "english": "When will you go?",
    "category": "time_weather",
    "categoryLabel": "६. समयः वातावरणं च",
    "categoryEn": "Time & Weather",
    "levelBadge": "Time & Nature",
    "words": [
      {
        "devanagari": "कदा",
        "meaning": "When?",
        "role": "adverb",
        "roleLabel": "कालवाचक-प्रश्नवाचकम्"
      },
      {
        "devanagari": "गमिष्यसि",
        "meaning": "will go (you)",
        "role": "verb",
        "roleLabel": "गम् लृट् मध्यम० (भविष्यत्)"
      }
    ],
    "grammarNote": "Time and weather markers: अद्य (today), श्वः (tomorrow), ह्यः (yesterday), and weather verbs."
  },
  {
    "id": "s-61",
    "num": 61,
    "sanskrit": "भोजनं सिद्धं किम्?",
    "transliteration": "Bhojanaṁ siddhaṁ kim?",
    "english": "Is the food ready?",
    "category": "food",
    "categoryLabel": "७. भोजनम्",
    "categoryEn": "Food & Dining",
    "levelBadge": "Daily Life",
    "words": [
      {
        "devanagari": "भोजनं",
        "meaning": "Meal / Food",
        "role": "subject",
        "roleLabel": "प्रथमा/द्वितीया"
      },
      {
        "devanagari": "सिद्धं",
        "meaning": "Ready / Prepared",
        "role": "adjective",
        "roleLabel": "विशेषणम् (नपुंसक)"
      },
      {
        "devanagari": "किम्",
        "meaning": "What?",
        "role": "adverb",
        "roleLabel": "प्रश्नवाचक-अव्ययम्"
      }
    ],
    "grammarNote": "Dining vocabulary and dative (मह्यम् रोचते - appeals to me) taste constructions."
  },
  {
    "id": "s-62",
    "num": 62,
    "sanskrit": "अहं बुभुक्षितः अस्मि।",
    "transliteration": "Ahaṁ bubhukṣitaḥ asmi.",
    "english": "I am hungry (male).",
    "category": "food",
    "categoryLabel": "७. भोजनम्",
    "categoryEn": "Food & Dining",
    "levelBadge": "Daily Life",
    "words": [
      {
        "devanagari": "अहं",
        "meaning": "I",
        "role": "subject",
        "roleLabel": "कर्ता (अस्मद् प्रथमा)"
      },
      {
        "devanagari": "बुभुक्षितः",
        "meaning": "Hungry (male)",
        "role": "adjective",
        "roleLabel": "विशेषणम् (पुं०)"
      },
      {
        "devanagari": "अस्मि",
        "meaning": "am",
        "role": "verb",
        "roleLabel": "अस् धातु लट् उत्तम०"
      }
    ],
    "grammarNote": "Dining vocabulary and dative (मह्यम् रोचते - appeals to me) taste constructions."
  },
  {
    "id": "s-63",
    "num": 63,
    "sanskrit": "भोजनं कृतवती किम्?",
    "transliteration": "Bhojanaṁ kṛtavatī kim?",
    "english": "Have you eaten? (to a female)",
    "category": "food",
    "categoryLabel": "७. भोजनम्",
    "categoryEn": "Food & Dining",
    "levelBadge": "Daily Life",
    "words": [
      {
        "devanagari": "भोजनं",
        "meaning": "Meal / Food",
        "role": "subject",
        "roleLabel": "प्रथमा/द्वितीया"
      },
      {
        "devanagari": "कृतवती",
        "meaning": "Done / Eaten (fem past)",
        "role": "verb",
        "roleLabel": "कृ + क्तवतु स्त्री०"
      },
      {
        "devanagari": "किम्",
        "meaning": "What?",
        "role": "adverb",
        "roleLabel": "प्रश्नवाचक-अव्ययम्"
      }
    ],
    "grammarNote": "Dining vocabulary and dative (मह्यम् रोचते - appeals to me) taste constructions."
  },
  {
    "id": "s-64",
    "num": 64,
    "sanskrit": "मह्यम् ओदनं रोचते।",
    "transliteration": "Mahyam odanaṁ rocate.",
    "english": "I like rice.",
    "category": "food",
    "categoryLabel": "७. भोजनम्",
    "categoryEn": "Food & Dining",
    "levelBadge": "Daily Life",
    "words": [
      {
        "devanagari": "मह्यम्",
        "meaning": "To me",
        "role": "particle",
        "roleLabel": "चतुर्थी-विभक्तिः (सम्प्रदानम्)"
      },
      {
        "devanagari": "ओदनं",
        "meaning": "Cooked rice",
        "role": "object",
        "roleLabel": "कर्म (द्वितीया)"
      },
      {
        "devanagari": "रोचते",
        "meaning": "appeals / pleases",
        "role": "verb",
        "roleLabel": "रुच् लट् आत्मनेपदम्"
      }
    ],
    "grammarNote": "Dining vocabulary and dative (मह्यम् रोचते - appeals to me) taste constructions."
  },
  {
    "id": "s-65",
    "num": 65,
    "sanskrit": "जलं ददातु।",
    "transliteration": "Jalaṁ dadātu.",
    "english": "Please give water.",
    "category": "food",
    "categoryLabel": "७. भोजनम्",
    "categoryEn": "Food & Dining",
    "levelBadge": "Daily Life",
    "words": [
      {
        "devanagari": "जलं",
        "meaning": "Water",
        "role": "subject",
        "roleLabel": "प्रथमा-एकवचनम्"
      },
      {
        "devanagari": "ददातु",
        "meaning": "Please give",
        "role": "verb",
        "roleLabel": "दा लोट् प्रथम० (आदर)"
      }
    ],
    "grammarNote": "Dining vocabulary and dative (मह्यम् रोचते - appeals to me) taste constructions."
  },
  {
    "id": "s-66",
    "num": 66,
    "sanskrit": "दुग्धं मधुरं भवति।",
    "transliteration": "Dugdhaṁ madhuraṁ bhavati.",
    "english": "Milk is sweet.",
    "category": "food",
    "categoryLabel": "७. भोजनम्",
    "categoryEn": "Food & Dining",
    "levelBadge": "Daily Life",
    "words": [
      {
        "devanagari": "दुग्धं",
        "meaning": "Milk",
        "role": "subject",
        "roleLabel": "नपुंसक प्रथमा"
      },
      {
        "devanagari": "मधुरं",
        "meaning": "Sweet",
        "role": "adjective",
        "roleLabel": "विशेषणम्"
      },
      {
        "devanagari": "भवति",
        "meaning": "is / becomes",
        "role": "verb",
        "roleLabel": "भू लट् प्रथम०"
      }
    ],
    "grammarNote": "Dining vocabulary and dative (मह्यम् रोचते - appeals to me) taste constructions."
  },
  {
    "id": "s-67",
    "num": 67,
    "sanskrit": "फलानि स्वास्थ्यकराणि।",
    "transliteration": "Phalāni svāsthyakarāṇi.",
    "english": "Fruits are healthy.",
    "category": "food",
    "categoryLabel": "७. भोजनम्",
    "categoryEn": "Food & Dining",
    "levelBadge": "Daily Life",
    "words": [
      {
        "devanagari": "फलानि",
        "meaning": "Fruits (plural)",
        "role": "subject",
        "roleLabel": "प्रथमा-बहुवचनम्"
      },
      {
        "devanagari": "स्वास्थ्यकराणि",
        "meaning": "Healthy / Health-giving",
        "role": "adjective",
        "roleLabel": "विशेषणम् (बहुवचन)"
      }
    ],
    "grammarNote": "Dining vocabulary and dative (मह्यम् रोचते - appeals to me) taste constructions."
  },
  {
    "id": "s-68",
    "num": 68,
    "sanskrit": "अल्पाहारः लवणयुक्तः अस्ति।",
    "transliteration": "Alpāhāraḥ lavaṇayuktaḥ asti.",
    "english": "The breakfast is salty.",
    "category": "food",
    "categoryLabel": "७. भोजनम्",
    "categoryEn": "Food & Dining",
    "levelBadge": "Daily Life",
    "words": [
      {
        "devanagari": "अल्पाहारः",
        "meaning": "Breakfast / Snack",
        "role": "subject",
        "roleLabel": "पुं० प्रथमा-एक०"
      },
      {
        "devanagari": "लवणयुक्तः",
        "meaning": "Salty / With salt",
        "role": "adjective",
        "roleLabel": "विशेषणम्"
      },
      {
        "devanagari": "अस्ति",
        "meaning": "is / exists",
        "role": "verb",
        "roleLabel": "अस् लट् प्रथम०"
      }
    ],
    "grammarNote": "Dining vocabulary and dative (मह्यम् रोचते - appeals to me) taste constructions."
  },
  {
    "id": "s-69",
    "num": 69,
    "sanskrit": "अहं चायं न पिबामि।",
    "transliteration": "Ahaṁ cāyaṁ na pibāmi.",
    "english": "I do not drink tea.",
    "category": "food",
    "categoryLabel": "७. भोजनम्",
    "categoryEn": "Food & Dining",
    "levelBadge": "Daily Life",
    "words": [
      {
        "devanagari": "अहं",
        "meaning": "I",
        "role": "subject",
        "roleLabel": "कर्ता (अस्मद् प्रथमा)"
      },
      {
        "devanagari": "चायं",
        "meaning": "Tea",
        "role": "object",
        "roleLabel": "कर्म (द्वितीया)"
      },
      {
        "devanagari": "न",
        "meaning": "Not",
        "role": "particle",
        "roleLabel": "निषेधार्थक-अव्ययम्"
      },
      {
        "devanagari": "पिबामि",
        "meaning": "पिबामि",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Dining vocabulary and dative (मह्यम् रोचते - appeals to me) taste constructions."
  },
  {
    "id": "s-70",
    "num": 70,
    "sanskrit": "किं कुर्वती असि?",
    "transliteration": "Kiṁ kurvatī asi?",
    "english": "What are you doing? (to a female)",
    "category": "food",
    "categoryLabel": "७. भोजनम्",
    "categoryEn": "Food & Dining",
    "levelBadge": "Daily Life",
    "words": [
      {
        "devanagari": "किं",
        "meaning": "किं",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "कुर्वती",
        "meaning": "Doing (female)",
        "role": "adjective",
        "roleLabel": "कृ शतृ स्त्रीलिङ्ग"
      },
      {
        "devanagari": "असि",
        "meaning": "are",
        "role": "verb",
        "roleLabel": "अस् धातु लट् मध्यम०"
      }
    ],
    "grammarNote": "Dining vocabulary and dative (मह्यम् रोचते - appeals to me) taste constructions."
  },
  {
    "id": "s-71",
    "num": 71,
    "sanskrit": "रामः श्वः आगमिष्यति।",
    "transliteration": "Rāmaḥ śvaḥ āgamiṣyati.",
    "english": "Rama will come tomorrow.",
    "category": "tenses",
    "categoryLabel": "८. भूत-भविष्यत्-कालाः",
    "categoryEn": "Past & Future Actions",
    "levelBadge": "Tenses",
    "words": [
      {
        "devanagari": "रामः",
        "meaning": "Rama",
        "role": "subject",
        "roleLabel": "कर्ता (पुं० प्रथमा)"
      },
      {
        "devanagari": "श्वः",
        "meaning": "Tomorrow",
        "role": "adverb",
        "roleLabel": "कालवाचक-अव्ययम्"
      },
      {
        "devanagari": "आगमिष्यति",
        "meaning": "will come",
        "role": "verb",
        "roleLabel": "आ+गम् लृट् प्रथम० (भविष्यत्)"
      }
    ],
    "grammarNote": "Active past participles (-क्तवतु: पठितवान् / कृतवती) and simple future tense (लृट्: आगमिष्यति / दास्यामि)."
  },
  {
    "id": "s-72",
    "num": 72,
    "sanskrit": "अहं पाठं पठितवान्।",
    "transliteration": "Ahaṁ pāṭhaṁ paṭhitavān.",
    "english": "I read the lesson (male, past).",
    "category": "tenses",
    "categoryLabel": "८. भूत-भविष्यत्-कालाः",
    "categoryEn": "Past & Future Actions",
    "levelBadge": "Tenses",
    "words": [
      {
        "devanagari": "अहं",
        "meaning": "I",
        "role": "subject",
        "roleLabel": "कर्ता (अस्मद् प्रथमा)"
      },
      {
        "devanagari": "पाठं",
        "meaning": "Lesson / Chapter",
        "role": "object",
        "roleLabel": "कर्म (द्वितीया)"
      },
      {
        "devanagari": "पठितवान्",
        "meaning": "read (male past)",
        "role": "verb",
        "roleLabel": "पठ् + क्तवतु पुं०"
      }
    ],
    "grammarNote": "Active past participles (-क्तवतु: पठितवान् / कृतवती) and simple future tense (लृट्: आगमिष्यति / दास्यामि)."
  },
  {
    "id": "s-73",
    "num": 73,
    "sanskrit": "सा कार्यं कृतवती।",
    "transliteration": "Sā kāryaṁ kṛtavatī.",
    "english": "She did the work.",
    "category": "tenses",
    "categoryLabel": "८. भूत-भविष्यत्-कालाः",
    "categoryEn": "Past & Future Actions",
    "levelBadge": "Tenses",
    "words": [
      {
        "devanagari": "सा",
        "meaning": "She",
        "role": "subject",
        "roleLabel": "तद् स्त्री० प्रथमा"
      },
      {
        "devanagari": "कार्यं",
        "meaning": "Work / Task",
        "role": "object",
        "roleLabel": "कर्म (द्वितीया)"
      },
      {
        "devanagari": "कृतवती",
        "meaning": "Done / Eaten (fem past)",
        "role": "verb",
        "roleLabel": "कृ + क्तवतु स्त्री०"
      }
    ],
    "grammarNote": "Active past participles (-क्तवतु: पठितवान् / कृतवती) and simple future tense (लृट्: आगमिष्यति / दास्यामि)."
  },
  {
    "id": "s-74",
    "num": 74,
    "sanskrit": "ते क्रीडाङ्गणं गतवन्तः।",
    "transliteration": "Te krīḍāṅgaṇaṁ gatavantaḥ.",
    "english": "They went to the playground.",
    "category": "tenses",
    "categoryLabel": "८. भूत-भविष्यत्-कालाः",
    "categoryEn": "Past & Future Actions",
    "levelBadge": "Tenses",
    "words": [
      {
        "devanagari": "ते",
        "meaning": "They (male)",
        "role": "subject",
        "roleLabel": "तद् पुं० बहुवचनम्"
      },
      {
        "devanagari": "क्रीडाङ्गणं",
        "meaning": "Playground",
        "role": "object",
        "roleLabel": "स्थानम् (द्वितीया)"
      },
      {
        "devanagari": "गतवन्तः",
        "meaning": "went (plural past)",
        "role": "verb",
        "roleLabel": "गम् + क्तवतु बहु०"
      }
    ],
    "grammarNote": "Active past participles (-क्तवतु: पठितवान् / कृतवती) and simple future tense (लृट्: आगमिष्यति / दास्यामि)."
  },
  {
    "id": "s-75",
    "num": 75,
    "sanskrit": "वयं चित्रपटं द्रक्ष्यामः।",
    "transliteration": "Vayaṁ citrapaṭaṁ drakṣyāmaḥ.",
    "english": "We will watch a movie.",
    "category": "tenses",
    "categoryLabel": "८. भूत-भविष्यत्-कालाः",
    "categoryEn": "Past & Future Actions",
    "levelBadge": "Tenses",
    "words": [
      {
        "devanagari": "वयं",
        "meaning": "We all",
        "role": "subject",
        "roleLabel": "अस्मद् प्रथमा बहु०"
      },
      {
        "devanagari": "चित्रपटं",
        "meaning": "Movie / Cinema",
        "role": "object",
        "roleLabel": "कर्म (द्वितीया)"
      },
      {
        "devanagari": "द्रक्ष्यामः",
        "meaning": "will see / watch (we)",
        "role": "verb",
        "roleLabel": "दृश् लृट् उत्तम बहु०"
      }
    ],
    "grammarNote": "Active past participles (-क्तवतु: पठितवान् / कृतवती) and simple future tense (लृट्: आगमिष्यति / दास्यामि)."
  },
  {
    "id": "s-76",
    "num": 76,
    "sanskrit": "त्वं कुत्र आसीः?",
    "transliteration": "Tvaṁ kutra āsīḥ?",
    "english": "Where were you?",
    "category": "tenses",
    "categoryLabel": "८. भूत-भविष्यत्-कालाः",
    "categoryEn": "Past & Future Actions",
    "levelBadge": "Tenses",
    "words": [
      {
        "devanagari": "त्वं",
        "meaning": "You",
        "role": "subject",
        "roleLabel": "युष्मद् प्रथमा"
      },
      {
        "devanagari": "कुत्र",
        "meaning": "Where?",
        "role": "adverb",
        "roleLabel": "स्थानवाचक-अव्ययम्"
      },
      {
        "devanagari": "आसीः",
        "meaning": "were (you)",
        "role": "verb",
        "roleLabel": "अस् लङ् मध्यम०"
      }
    ],
    "grammarNote": "Active past participles (-क्तवतु: पठितवान् / कृतवती) and simple future tense (लृट्: आगमिष्यति / दास्यामि)."
  },
  {
    "id": "s-77",
    "num": 77,
    "sanskrit": "गुरुः ज्ञानं दत्तवान्।",
    "transliteration": "Guruḥ jñānaṁ dattavān.",
    "english": "The teacher gave knowledge.",
    "category": "tenses",
    "categoryLabel": "८. भूत-भविष्यत्-कालाः",
    "categoryEn": "Past & Future Actions",
    "levelBadge": "Tenses",
    "words": [
      {
        "devanagari": "गुरुः",
        "meaning": "Guru / Teacher",
        "role": "subject",
        "roleLabel": "कर्ता (उकारान्त पुं०)"
      },
      {
        "devanagari": "ज्ञानं",
        "meaning": "Knowledge / Wisdom",
        "role": "subject",
        "roleLabel": "नपुंसक प्रथमा"
      },
      {
        "devanagari": "दत्तवान्",
        "meaning": "gave (past male)",
        "role": "verb",
        "roleLabel": "दा + क्तवतु पुं०"
      }
    ],
    "grammarNote": "Active past participles (-क्तवतु: पठितवान् / कृतवती) and simple future tense (लृट्: आगमिष्यति / दास्यामि)."
  },
  {
    "id": "s-78",
    "num": 78,
    "sanskrit": "अहं धनं दास्यामि।",
    "transliteration": "Ahaṁ dhanaṁ dāsyāmi.",
    "english": "I will give money.",
    "category": "tenses",
    "categoryLabel": "८. भूत-भविष्यत्-कालाः",
    "categoryEn": "Past & Future Actions",
    "levelBadge": "Tenses",
    "words": [
      {
        "devanagari": "अहं",
        "meaning": "I",
        "role": "subject",
        "roleLabel": "कर्ता (अस्मद् प्रथमा)"
      },
      {
        "devanagari": "धनं",
        "meaning": "Money / Wealth",
        "role": "object",
        "roleLabel": "कर्म (द्वितीया)"
      },
      {
        "devanagari": "दास्यामि",
        "meaning": "will give (I)",
        "role": "verb",
        "roleLabel": "दा लृट् उत्तम०"
      }
    ],
    "grammarNote": "Active past participles (-क्तवतु: पठितवान् / कृतवती) and simple future tense (लृट्: आगमिष्यति / दास्यामि)."
  },
  {
    "id": "s-79",
    "num": 79,
    "sanskrit": "किं त्वं हसितवान्?",
    "transliteration": "Kiṁ tvaṁ hasitavān?",
    "english": "Did you laugh?",
    "category": "tenses",
    "categoryLabel": "८. भूत-भविष्यत्-कालाः",
    "categoryEn": "Past & Future Actions",
    "levelBadge": "Tenses",
    "words": [
      {
        "devanagari": "किं",
        "meaning": "किं",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "त्वं",
        "meaning": "You",
        "role": "subject",
        "roleLabel": "युष्मद् प्रथमा"
      },
      {
        "devanagari": "हसितवान्",
        "meaning": "laughed (past male)",
        "role": "verb",
        "roleLabel": "हस् + क्तवतु"
      }
    ],
    "grammarNote": "Active past participles (-क्तवतु: पठितवान् / कृतवती) and simple future tense (लृट्: आगमिष्यति / दास्यामि)."
  },
  {
    "id": "s-80",
    "num": 80,
    "sanskrit": "वृक्षात् पत्रं अपतत्।",
    "transliteration": "Vṛkṣāt patraṁ apatat.",
    "english": "A leaf fell from the tree.",
    "category": "tenses",
    "categoryLabel": "८. भूत-भविष्यत्-कालाः",
    "categoryEn": "Past & Future Actions",
    "levelBadge": "Tenses",
    "words": [
      {
        "devanagari": "वृक्षात्",
        "meaning": "From the tree",
        "role": "particle",
        "roleLabel": "पञ्चमी (अपादानम्)"
      },
      {
        "devanagari": "पत्रं",
        "meaning": "Leaf",
        "role": "subject",
        "roleLabel": "नपुंसक प्रथमा"
      },
      {
        "devanagari": "अपतत्",
        "meaning": "fell (past)",
        "role": "verb",
        "roleLabel": "पत् लङ् प्रथम०"
      }
    ],
    "grammarNote": "Active past participles (-क्तवतु: पठितवान् / कृतवती) and simple future tense (लृट्: आगमिष्यति / दास्यामि)."
  },
  {
    "id": "s-81",
    "num": 81,
    "sanskrit": "बालकौ क्रीडतः।",
    "transliteration": "Bālakau krīḍataḥ.",
    "english": "Two boys are playing.",
    "category": "plurals",
    "categoryLabel": "९. द्विवचन-बहुवचन-प्रयोगाः",
    "categoryEn": "Duals & Plurals",
    "levelBadge": "Numbers & Agreement",
    "words": [
      {
        "devanagari": "बालकौ",
        "meaning": "Two boys",
        "role": "subject",
        "roleLabel": "कर्ता (द्विवचनम्)"
      },
      {
        "devanagari": "क्रीडतः",
        "meaning": "play (two people)",
        "role": "verb",
        "roleLabel": "क्रीड् लट् द्विवचनम्"
      }
    ],
    "grammarNote": "Dual (द्विवचनम्: बालकौ क्रीडतः) and plural (बहुवचनम्: छात्राः पृच्छन्ति) agreements."
  },
  {
    "id": "s-82",
    "num": 82,
    "sanskrit": "कन्ये नृत्यताः।",
    "transliteration": "Kanye nṛtyataḥ.",
    "english": "Two girls are dancing.",
    "category": "plurals",
    "categoryLabel": "९. द्विवचन-बहुवचन-प्रयोगाः",
    "categoryEn": "Duals & Plurals",
    "levelBadge": "Numbers & Agreement",
    "words": [
      {
        "devanagari": "कन्ये",
        "meaning": "Two girls",
        "role": "subject",
        "roleLabel": "कर्ता (स्त्री० द्विवचनम्)"
      },
      {
        "devanagari": "नृत्यताः",
        "meaning": "dance (two people)",
        "role": "verb",
        "roleLabel": "नृत् लट् द्विवचनम्"
      }
    ],
    "grammarNote": "Dual (द्विवचनम्: बालकौ क्रीडतः) and plural (बहुवचनम्: छात्राः पृच्छन्ति) agreements."
  },
  {
    "id": "s-83",
    "num": 83,
    "sanskrit": "अहं द्वे पुस्तके पठामि।",
    "transliteration": "Ahaṁ dve pustake paṭhāmi.",
    "english": "I am reading two books.",
    "category": "plurals",
    "categoryLabel": "९. द्विवचन-बहुवचन-प्रयोगाः",
    "categoryEn": "Duals & Plurals",
    "levelBadge": "Numbers & Agreement",
    "words": [
      {
        "devanagari": "अहं",
        "meaning": "I",
        "role": "subject",
        "roleLabel": "कर्ता (अस्मद् प्रथमा)"
      },
      {
        "devanagari": "द्वे",
        "meaning": "Two (neuter/fem)",
        "role": "adjective",
        "roleLabel": "संख्या-द्विवचनम्"
      },
      {
        "devanagari": "पुस्तके",
        "meaning": "Two books",
        "role": "object",
        "roleLabel": "कर्म (द्विवचनम्)"
      },
      {
        "devanagari": "पठामि",
        "meaning": "read / study (I)",
        "role": "verb",
        "roleLabel": "पठ् लट् उत्तम०"
      }
    ],
    "grammarNote": "Dual (द्विवचनम्: बालकौ क्रीडतः) and plural (बहुवचनम्: छात्राः पृच्छन्ति) agreements."
  },
  {
    "id": "s-84",
    "num": 84,
    "sanskrit": "छात्राः प्रश्नं पृच्छन्ति।",
    "transliteration": "Chātrāḥ praśnaṁ pṛcchanti.",
    "english": "The students are asking questions.",
    "category": "plurals",
    "categoryLabel": "९. द्विवचन-बहुवचन-प्रयोगाः",
    "categoryEn": "Duals & Plurals",
    "levelBadge": "Numbers & Agreement",
    "words": [
      {
        "devanagari": "छात्राः",
        "meaning": "Students (plural)",
        "role": "subject",
        "roleLabel": "कर्ता (बहुवचनम्)"
      },
      {
        "devanagari": "प्रश्नं",
        "meaning": "Question",
        "role": "object",
        "roleLabel": "कर्म (द्वितीया)"
      },
      {
        "devanagari": "पृच्छन्ति",
        "meaning": "ask (plural)",
        "role": "verb",
        "roleLabel": "प्रच्छ् लट् बहुवचनम्"
      }
    ],
    "grammarNote": "Dual (द्विवचनम्: बालकौ क्रीडतः) and plural (बहुवचनम्: छात्राः पृच्छन्ति) agreements."
  },
  {
    "id": "s-85",
    "num": 85,
    "sanskrit": "वयं भारते वसामः।",
    "transliteration": "Vayaṁ bhārate vasāmaḥ.",
    "english": "We live in India.",
    "category": "plurals",
    "categoryLabel": "९. द्विवचन-बहुवचन-प्रयोगाः",
    "categoryEn": "Duals & Plurals",
    "levelBadge": "Numbers & Agreement",
    "words": [
      {
        "devanagari": "वयं",
        "meaning": "We all",
        "role": "subject",
        "roleLabel": "अस्मद् प्रथमा बहु०"
      },
      {
        "devanagari": "भारते",
        "meaning": "In India",
        "role": "adverb",
        "roleLabel": "सप्तमी (अधिकरणम्)"
      },
      {
        "devanagari": "वसामः",
        "meaning": "live / reside (we)",
        "role": "verb",
        "roleLabel": "वस् लट् उत्तम बहु०"
      }
    ],
    "grammarNote": "Dual (द्विवचनम्: बालकौ क्रीडतः) and plural (बहुवचनम्: छात्राः पृच्छन्ति) agreements."
  },
  {
    "id": "s-86",
    "num": 86,
    "sanskrit": "पुष्पाणि विकसन्ति।",
    "transliteration": "Puṣpāni vikasanti.",
    "english": "The flowers are blooming.",
    "category": "plurals",
    "categoryLabel": "९. द्विवचन-बहुवचन-प्रयोगाः",
    "categoryEn": "Duals & Plurals",
    "levelBadge": "Numbers & Agreement",
    "words": [
      {
        "devanagari": "पुष्पाणि",
        "meaning": "पुष्पाणि",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "विकसन्ति",
        "meaning": "bloom (plural)",
        "role": "verb",
        "roleLabel": "वि+कस् लट् बहु०"
      }
    ],
    "grammarNote": "Dual (द्विवचनम्: बालकौ क्रीडतः) and plural (बहुवचनम्: छात्राः पृच्छन्ति) agreements."
  },
  {
    "id": "s-87",
    "num": 87,
    "sanskrit": "यूयं कुत्र गच्छथ?",
    "transliteration": "Yūyaṁ kutra gacchatha?",
    "english": "Where are you all going?",
    "category": "plurals",
    "categoryLabel": "९. द्विवचन-बहुवचन-प्रयोगाः",
    "categoryEn": "Duals & Plurals",
    "levelBadge": "Numbers & Agreement",
    "words": [
      {
        "devanagari": "यूयं",
        "meaning": "You all",
        "role": "subject",
        "roleLabel": "युष्मद् प्रथमा बहु०"
      },
      {
        "devanagari": "कुत्र",
        "meaning": "Where?",
        "role": "adverb",
        "roleLabel": "स्थानवाचक-अव्ययम्"
      },
      {
        "devanagari": "गच्छथ",
        "meaning": "go (you all)",
        "role": "verb",
        "roleLabel": "गम् लट् मध्यम बहु०"
      }
    ],
    "grammarNote": "Dual (द्विवचनम्: बालकौ क्रीडतः) and plural (बहुवचनम्: छात्राः पृच्छन्ति) agreements."
  },
  {
    "id": "s-88",
    "num": 88,
    "sanskrit": "खगाः आकाशे उड्डयन्ते।",
    "transliteration": "Khagāḥ ākāśe uḍḍayante.",
    "english": "Birds fly in the sky.",
    "category": "plurals",
    "categoryLabel": "९. द्विवचन-बहुवचन-प्रयोगाः",
    "categoryEn": "Duals & Plurals",
    "levelBadge": "Numbers & Agreement",
    "words": [
      {
        "devanagari": "खगाः",
        "meaning": "Birds (plural)",
        "role": "subject",
        "roleLabel": "कर्ता (पुं० बहुवचनम्)"
      },
      {
        "devanagari": "आकाशे",
        "meaning": "In the sky",
        "role": "adverb",
        "roleLabel": "सप्तमी (अधिकरणम्)"
      },
      {
        "devanagari": "उड्डयन्ते",
        "meaning": "fly (plural)",
        "role": "verb",
        "roleLabel": "उद्+डी लट् आत्मने बहु०"
      }
    ],
    "grammarNote": "Dual (द्विवचनम्: बालकौ क्रीडतः) and plural (बहुवचनम्: छात्राः पृच्छन्ति) agreements."
  },
  {
    "id": "s-89",
    "num": 89,
    "sanskrit": "अश्वाः वेगेन धावन्ति।",
    "transliteration": "Aśvāḥ vegena dhāvanti.",
    "english": "The horses run fast.",
    "category": "plurals",
    "categoryLabel": "९. द्विवचन-बहुवचन-प्रयोगाः",
    "categoryEn": "Duals & Plurals",
    "levelBadge": "Numbers & Agreement",
    "words": [
      {
        "devanagari": "अश्वाः",
        "meaning": "Horses (plural)",
        "role": "subject",
        "roleLabel": "कर्ता (पुं० बहुवचनम्)"
      },
      {
        "devanagari": "वेगेन",
        "meaning": "With speed / Swiftly",
        "role": "adverb",
        "roleLabel": "तृतीया (क्रियाविशेषणम्)"
      },
      {
        "devanagari": "धावन्ति",
        "meaning": "run (plural)",
        "role": "verb",
        "roleLabel": "धाव् लट् बहुवचनम्"
      }
    ],
    "grammarNote": "Dual (द्विवचनम्: बालकौ क्रीडतः) and plural (बहुवचनम्: छात्राः पृच्छन्ति) agreements."
  },
  {
    "id": "s-90",
    "num": 90,
    "sanskrit": "ते मन्दं चलन्ति।",
    "transliteration": "Te mandaṁ calanti.",
    "english": "They walk slowly.",
    "category": "plurals",
    "categoryLabel": "९. द्विवचन-बहुवचन-प्रयोगाः",
    "categoryEn": "Duals & Plurals",
    "levelBadge": "Numbers & Agreement",
    "words": [
      {
        "devanagari": "ते",
        "meaning": "They (male)",
        "role": "subject",
        "roleLabel": "तद् पुं० बहुवचनम्"
      },
      {
        "devanagari": "मन्दं",
        "meaning": "Slowly",
        "role": "adverb",
        "roleLabel": "क्रियाविशेषणम्"
      },
      {
        "devanagari": "चलन्ति",
        "meaning": "walk / move (plural)",
        "role": "verb",
        "roleLabel": "चल् लट् बहुवचनम्"
      }
    ],
    "grammarNote": "Dual (द्विवचनम्: बालकौ क्रीडतः) and plural (बहुवचनम्: छात्राः पृच्छन्ति) agreements."
  },
  {
    "id": "s-91",
    "num": 91,
    "sanskrit": "सत्यं वद, धर्मं चर।",
    "transliteration": "Satyaṁ vada, dharmaṁ cara.",
    "english": "Speak the truth. Live with integrity.",
    "category": "wisdom",
    "categoryLabel": "१०. सुभाषितानि गुणाः च",
    "categoryEn": "Proverbs & Wisdom",
    "levelBadge": "Timeless Wisdom",
    "words": [
      {
        "devanagari": "सत्यं",
        "meaning": "Truth",
        "role": "object",
        "roleLabel": "कर्म (द्वितीया)"
      },
      {
        "devanagari": "वद",
        "meaning": "Speak! (order)",
        "role": "verb",
        "roleLabel": "वद् लोट् मध्यम०"
      },
      {
        "devanagari": "धर्मं",
        "meaning": "Righteousness / Dharma",
        "role": "object",
        "roleLabel": "कर्म (द्वितीया)"
      },
      {
        "devanagari": "चर",
        "meaning": "Practice / Walk",
        "role": "verb",
        "roleLabel": "चर् लोट् मध्यम०"
      }
    ],
    "grammarNote": "Timeless Sanskrit wisdom (सुभाषितम्) capturing dharma, truth, knowledge, and inner strength."
  },
  {
    "id": "s-92",
    "num": 92,
    "sanskrit": "विद्वान् सर्वत्र पूज्यते।",
    "transliteration": "Vidvān sarvatra pūjyate.",
    "english": "A scholar is worshipped everywhere.",
    "category": "wisdom",
    "categoryLabel": "१०. सुभाषितानि गुणाः च",
    "categoryEn": "Proverbs & Wisdom",
    "levelBadge": "Timeless Wisdom",
    "words": [
      {
        "devanagari": "विद्वान्",
        "meaning": "Wise scholar",
        "role": "subject",
        "roleLabel": "विद्वस् पुं० प्रथमा"
      },
      {
        "devanagari": "सर्वत्र",
        "meaning": "Everywhere",
        "role": "adverb",
        "roleLabel": "स्थानवाचक-अव्ययम्"
      },
      {
        "devanagari": "पूज्यते",
        "meaning": "is honoured / worshipped",
        "role": "verb",
        "roleLabel": "पूज् कर्मणि लट्"
      }
    ],
    "grammarNote": "Timeless Sanskrit wisdom (सुभाषितम्) capturing dharma, truth, knowledge, and inner strength."
  },
  {
    "id": "s-93",
    "num": 93,
    "sanskrit": "लोभात् पापं प्रजायते।",
    "transliteration": "Lobhāt pāpaṁ prajāyate.",
    "english": "Greed gives rise to sin.",
    "category": "wisdom",
    "categoryLabel": "१०. सुभाषितानि गुणाः च",
    "categoryEn": "Proverbs & Wisdom",
    "levelBadge": "Timeless Wisdom",
    "words": [
      {
        "devanagari": "लोभात्",
        "meaning": "From greed",
        "role": "particle",
        "roleLabel": "पञ्चमी (अपादानम्)"
      },
      {
        "devanagari": "पापं",
        "meaning": "Sin / Misfortune",
        "role": "subject",
        "roleLabel": "नपुंसक प्रथमा"
      },
      {
        "devanagari": "प्रजायते",
        "meaning": "is born / arises",
        "role": "verb",
        "roleLabel": "प्र+जन् लट्"
      }
    ],
    "grammarNote": "Timeless Sanskrit wisdom (सुभाषितम्) capturing dharma, truth, knowledge, and inner strength."
  },
  {
    "id": "s-94",
    "num": 94,
    "sanskrit": "त्वं मम आनन्दः असि।",
    "transliteration": "Tvaṁ mama ānandaḥ asi.",
    "english": "You are my happiness.",
    "category": "wisdom",
    "categoryLabel": "१०. सुभाषितानि गुणाः च",
    "categoryEn": "Proverbs & Wisdom",
    "levelBadge": "Timeless Wisdom",
    "words": [
      {
        "devanagari": "त्वं",
        "meaning": "You",
        "role": "subject",
        "roleLabel": "युष्मद् प्रथमा"
      },
      {
        "devanagari": "मम",
        "meaning": "My / Mine",
        "role": "particle",
        "roleLabel": "षष्ठी-विभक्तिः (अस्मद्)"
      },
      {
        "devanagari": "आनन्दः",
        "meaning": "Joy / Bliss",
        "role": "subject",
        "roleLabel": "विधेयम् (पुं०)"
      },
      {
        "devanagari": "असि",
        "meaning": "are",
        "role": "verb",
        "roleLabel": "अस् धातु लट् मध्यम०"
      }
    ],
    "grammarNote": "Timeless Sanskrit wisdom (सुभाषितम्) capturing dharma, truth, knowledge, and inner strength."
  },
  {
    "id": "s-95",
    "num": 95,
    "sanskrit": "कालः सर्वं विरोपयति।",
    "transliteration": "Kālaḥ sarvaṁ viropayati.",
    "english": "Time heals all wounds.",
    "category": "wisdom",
    "categoryLabel": "१०. सुभाषितानि गुणाः च",
    "categoryEn": "Proverbs & Wisdom",
    "levelBadge": "Timeless Wisdom",
    "words": [
      {
        "devanagari": "कालः",
        "meaning": "Time",
        "role": "subject",
        "roleLabel": "कर्ता (पुं० प्रथमा)"
      },
      {
        "devanagari": "सर्वं",
        "meaning": "All / Everything",
        "role": "object",
        "roleLabel": "कर्म (द्वितीया)"
      },
      {
        "devanagari": "विरोपयति",
        "meaning": "heals / closes wounds",
        "role": "verb",
        "roleLabel": "वि+रुह् णिच् लट्"
      }
    ],
    "grammarNote": "Timeless Sanskrit wisdom (सुभाषितम्) capturing dharma, truth, knowledge, and inner strength."
  },
  {
    "id": "s-96",
    "num": 96,
    "sanskrit": "एतदपि गमिष्यति।",
    "transliteration": "Etadapi gamiṣyati.",
    "english": "This, too, shall pass.",
    "category": "wisdom",
    "categoryLabel": "१०. सुभाषितानि गुणाः च",
    "categoryEn": "Proverbs & Wisdom",
    "levelBadge": "Timeless Wisdom",
    "words": [
      {
        "devanagari": "एतदपि",
        "meaning": "This too",
        "role": "subject",
        "roleLabel": "एतत् + अपि (अव्ययम्)"
      },
      {
        "devanagari": "गमिष्यति",
        "meaning": "will pass / go",
        "role": "verb",
        "roleLabel": "गम् लृट् प्रथम०"
      }
    ],
    "grammarNote": "Timeless Sanskrit wisdom (सुभाषितम्) capturing dharma, truth, knowledge, and inner strength."
  },
  {
    "id": "s-97",
    "num": 97,
    "sanskrit": "रामो बलवान् अस्ति।",
    "transliteration": "Rāmo balavān asti.",
    "english": "Rama is strong.",
    "category": "wisdom",
    "categoryLabel": "१०. सुभाषितानि गुणाः च",
    "categoryEn": "Proverbs & Wisdom",
    "levelBadge": "Timeless Wisdom",
    "words": [
      {
        "devanagari": "रामो",
        "meaning": "Rama",
        "role": "subject",
        "roleLabel": "कर्ता (सन्धिरूपम्)"
      },
      {
        "devanagari": "बलवान्",
        "meaning": "Strong / Powerful",
        "role": "adjective",
        "roleLabel": "विशेषणम् (पुं०)"
      },
      {
        "devanagari": "अस्ति",
        "meaning": "is / exists",
        "role": "verb",
        "roleLabel": "अस् लट् प्रथम०"
      }
    ],
    "grammarNote": "Timeless Sanskrit wisdom (सुभाषितम्) capturing dharma, truth, knowledge, and inner strength."
  },
  {
    "id": "s-98",
    "num": 98,
    "sanskrit": "सत्यमेव जयते।",
    "transliteration": "Satyameva jayate.",
    "english": "Truth alone triumphs.",
    "category": "wisdom",
    "categoryLabel": "१०. सुभाषितानि गुणाः च",
    "categoryEn": "Proverbs & Wisdom",
    "levelBadge": "Timeless Wisdom",
    "words": [
      {
        "devanagari": "सत्यमेव",
        "meaning": "Truth alone",
        "role": "subject",
        "roleLabel": "सत्यम् + एव (अव्ययम्)"
      },
      {
        "devanagari": "जयते",
        "meaning": "triumphs / is victorious",
        "role": "verb",
        "roleLabel": "जि लट् आत्मनेपदम्"
      }
    ],
    "grammarNote": "Timeless Sanskrit wisdom (सुभाषितम्) capturing dharma, truth, knowledge, and inner strength."
  },
  {
    "id": "s-99",
    "num": 99,
    "sanskrit": "ज्ञानं परमं भूषणम्।",
    "transliteration": "Jñānaṁ paramaṁ bhūṣaṇam.",
    "english": "Knowledge is the highest ornament.",
    "category": "wisdom",
    "categoryLabel": "१०. सुभाषितानि गुणाः च",
    "categoryEn": "Proverbs & Wisdom",
    "levelBadge": "Timeless Wisdom",
    "words": [
      {
        "devanagari": "ज्ञानं",
        "meaning": "Knowledge / Wisdom",
        "role": "subject",
        "roleLabel": "नपुंसक प्रथमा"
      },
      {
        "devanagari": "परमं",
        "meaning": "Supreme / Highest",
        "role": "adjective",
        "roleLabel": "विशेषणम्"
      },
      {
        "devanagari": "भूषणम्",
        "meaning": "Ornament / Jewel",
        "role": "subject",
        "roleLabel": "विधेयम्"
      }
    ],
    "grammarNote": "Timeless Sanskrit wisdom (सुभाषितम्) capturing dharma, truth, knowledge, and inner strength."
  },
  {
    "id": "s-100",
    "num": 100,
    "sanskrit": "अहं संस्कृतं वदामि।",
    "transliteration": "Ahaṁ saṁskṛtaṁ vadāmi.",
    "english": "I speak Sanskrit.",
    "category": "wisdom",
    "categoryLabel": "१०. सुभाषितानि गुणाः च",
    "categoryEn": "Proverbs & Wisdom",
    "levelBadge": "Timeless Wisdom",
    "words": [
      {
        "devanagari": "अहं",
        "meaning": "I",
        "role": "subject",
        "roleLabel": "कर्ता (अस्मद् प्रथमा)"
      },
      {
        "devanagari": "संस्कृतं",
        "meaning": "Sanskrit",
        "role": "object",
        "roleLabel": "कर्म (द्वितीया)"
      },
      {
        "devanagari": "वदामि",
        "meaning": "speak (I)",
        "role": "verb",
        "roleLabel": "वद् लट् उत्तम०"
      }
    ],
    "grammarNote": "Timeless Sanskrit wisdom (सुभाषितम्) capturing dharma, truth, knowledge, and inner strength."
  }
];

// Foundational 25-Sentence Tile Puzzles (Moved from Main Studio as an additional feature in the puzzle game)
export const FOUNDATIONAL_TILE_PUZZLES: SentencePuzzleItem[] = [
  {
    "id": "fnd-1",
    "english": "The boy reads.",
    "correctOrder": [
      "बालकः",
      "पठति।"
    ],
    "scrambled": [
      "पठति।",
      "बालकः"
    ],
    "hint": "Subject (Boy) comes first, then Action (Reads).",
    "explanation": "बालकः (Boy) + पठति (Reads). Basic 2-word sentence.",
    "category": "foundation"
  },
  {
    "id": "fnd-2",
    "english": "The girl writes.",
    "correctOrder": [
      "बालिका",
      "लिखति।"
    ],
    "scrambled": [
      "लिखति।",
      "बालिका"
    ],
    "hint": "Start with who is writing (Balika).",
    "explanation": "बालिका (Girl) + लिखति (Writes).",
    "category": "foundation"
  },
  {
    "id": "fnd-3",
    "english": "The horse runs.",
    "correctOrder": [
      "अश्वः",
      "धावति।"
    ],
    "scrambled": [
      "धावति।",
      "अश्वः"
    ],
    "hint": "Horse + runs.",
    "explanation": "अश्वः (Horse) + धावति (Runs).",
    "category": "foundation"
  },
  {
    "id": "fnd-4",
    "english": "The elephant walks.",
    "correctOrder": [
      "गजः",
      "चलति।"
    ],
    "scrambled": [
      "चलति।",
      "गजः"
    ],
    "hint": "Elephant + walks.",
    "explanation": "गजः (Elephant) + चलति (Walks).",
    "category": "foundation"
  },
  {
    "id": "fnd-5",
    "english": "The peacock dances.",
    "correctOrder": [
      "मयूरः",
      "नृत्यति।"
    ],
    "scrambled": [
      "नृत्यति।",
      "मयूरः"
    ],
    "hint": "Peacock + dances.",
    "explanation": "मयूरः (Peacock) + नृत्यति (Dances).",
    "category": "foundation"
  },
  {
    "id": "fnd-6",
    "english": "The boys play.",
    "correctOrder": [
      "बालकाः",
      "क्रीडन्ति।"
    ],
    "scrambled": [
      "क्रीडन्ति।",
      "बालकाः"
    ],
    "hint": "Plural subject takes plural ending -अन्ति.",
    "explanation": "बालकाः (Boys) + क्रीडन्ति (Play).",
    "category": "foundation"
  },
  {
    "id": "fnd-7",
    "english": "I read.",
    "correctOrder": [
      "अहम्",
      "पठामि।"
    ],
    "scrambled": [
      "पठामि।",
      "अहम्"
    ],
    "hint": "When subject is अहम्, verb ends with -आमि.",
    "explanation": "अहम् (I) pairs with पठामि.",
    "category": "foundation"
  },
  {
    "id": "fnd-8",
    "english": "You write.",
    "correctOrder": [
      "त्वम्",
      "लिखसि।"
    ],
    "scrambled": [
      "लिखसि।",
      "त्वम्"
    ],
    "hint": "When subject is त्वम्, verb ends with -सि.",
    "explanation": "त्वम् (You) pairs with लिखसि.",
    "category": "foundation"
  },
  {
    "id": "fnd-9",
    "english": "He eats.",
    "correctOrder": [
      "सः",
      "खादति।"
    ],
    "scrambled": [
      "खादति।",
      "सः"
    ],
    "hint": "सः (He) + verb in -ति.",
    "explanation": "सः (He) pairs with खादति (Eats).",
    "category": "foundation"
  },
  {
    "id": "fnd-10",
    "english": "She drinks.",
    "correctOrder": [
      "सा",
      "पिबति।"
    ],
    "scrambled": [
      "पिबति।",
      "सा"
    ],
    "hint": "सा (She) + verb in -ति.",
    "explanation": "सा (She) pairs with पिबति (Drinks).",
    "category": "foundation"
  },
  {
    "id": "fnd-11",
    "english": "We go.",
    "correctOrder": [
      "वयम्",
      "गच्छामः।"
    ],
    "scrambled": [
      "गच्छामः।",
      "वयम्"
    ],
    "hint": "वयम् (We) pairs with -आमः.",
    "explanation": "वयम् (We) pairs with गच्छामः (Go).",
    "category": "foundation"
  },
  {
    "id": "fnd-12",
    "english": "You all read.",
    "correctOrder": [
      "यूयम्",
      "पठथ।"
    ],
    "scrambled": [
      "पठथ।",
      "यूयम्"
    ],
    "hint": "यूयम् (You all) pairs with -थ.",
    "explanation": "यूयम् (You all) pairs with पठथ (Read).",
    "category": "foundation"
  },
  {
    "id": "fnd-13",
    "english": "The boy reads the book.",
    "correctOrder": [
      "बालकः",
      "पुस्तकम्",
      "पठति।"
    ],
    "scrambled": [
      "पठति।",
      "बालकः",
      "पुस्तकम्"
    ],
    "hint": "Subject (Boy) ➔ Object (Book) ➔ Verb (Reads).",
    "explanation": "बालकः (कर्ता) + पुस्तकम् (कर्म) + पठति (क्रिया).",
    "category": "foundation"
  },
  {
    "id": "fnd-14",
    "english": "The girl writes a letter.",
    "correctOrder": [
      "बालिका",
      "पत्रम्",
      "लिखति।"
    ],
    "scrambled": [
      "पत्रम्",
      "लिखति।",
      "बालिका"
    ],
    "hint": "Subject ➔ Object ➔ Verb.",
    "explanation": "बालिका (कर्ता) + पत्रम् (कर्म) + लिखति (क्रिया).",
    "category": "foundation"
  },
  {
    "id": "fnd-15",
    "english": "The horse runs swiftly.",
    "correctOrder": [
      "अश्वः",
      "तीव्रम्",
      "धावति।"
    ],
    "scrambled": [
      "धावति।",
      "तीव्रम्",
      "अश्वः"
    ],
    "hint": "Subject ➔ Adverb ➔ Verb.",
    "explanation": "अश्वः (Horse) + तीव्रम् (Swiftly) + धावति (Runs).",
    "category": "foundation"
  },
  {
    "id": "fnd-16",
    "english": "I drink water.",
    "correctOrder": [
      "अहम्",
      "जलम्",
      "पिबामि।"
    ],
    "scrambled": [
      "पिबामि।",
      "अहम्",
      "जलम्"
    ],
    "hint": "I + water + drink.",
    "explanation": "अहम् (I) + जलम् (Water) + पिबामि (Drink).",
    "category": "foundation"
  },
  {
    "id": "fnd-17",
    "english": "Where are you going?",
    "correctOrder": [
      "त्वम्",
      "कुत्र",
      "गच्छसि?"
    ],
    "scrambled": [
      "गच्छसि?",
      "त्वम्",
      "कुत्र"
    ],
    "hint": "Subject ➔ Question ➔ Verb.",
    "explanation": "त्वम् (You) + कुत्र (Where) + गच्छसि (Go).",
    "category": "foundation"
  },
  {
    "id": "fnd-18",
    "english": "What is your name?",
    "correctOrder": [
      "भवतः",
      "नाम",
      "किम्?"
    ],
    "scrambled": [
      "किम्?",
      "भवतः",
      "नाम"
    ],
    "hint": "Your ➔ Name ➔ What.",
    "explanation": "भवतः (Your) + नाम (Name) + किम् (What).",
    "category": "foundation"
  },
  {
    "id": "fnd-19",
    "english": "My name is Deva.",
    "correctOrder": [
      "मम",
      "नाम",
      "देवः।"
    ],
    "scrambled": [
      "देवः।",
      "मम",
      "नाम"
    ],
    "hint": "My ➔ Name ➔ Deva.",
    "explanation": "मम (My) + नाम (Name) + देवः (Deva).",
    "category": "foundation"
  },
  {
    "id": "fnd-20",
    "english": "The sun rises in the sky.",
    "correctOrder": [
      "सूर्यः",
      "आकाशे",
      "उदयति।"
    ],
    "scrambled": [
      "उदयति।",
      "सूर्यः",
      "आकाशे"
    ],
    "hint": "Sun ➔ in sky ➔ rises.",
    "explanation": "सूर्यः (Sun) + आकाशे (In the sky) + उदयति (Rises).",
    "category": "foundation"
  },
  {
    "id": "fnd-21",
    "english": "The flowers bloom in the garden.",
    "correctOrder": [
      "पुष्पाणि",
      "उद्याने",
      "विकसन्ति।"
    ],
    "scrambled": [
      "विकसन्ति।",
      "पुष्पाणि",
      "उद्याने"
    ],
    "hint": "Flowers ➔ in garden ➔ bloom.",
    "explanation": "पुष्पाणि (Flowers) + उद्याने (In garden) + विकसन्ति (Bloom).",
    "category": "foundation"
  },
  {
    "id": "fnd-22",
    "english": "We play in the playground.",
    "correctOrder": [
      "वयम्",
      "क्रीडाङ्गणे",
      "क्रीडामः।"
    ],
    "scrambled": [
      "क्रीडामः।",
      "वयम्",
      "क्रीडाङ्गणे"
    ],
    "hint": "We ➔ in playground ➔ play.",
    "explanation": "वयम् (We) + क्रीडाङ्गणे (Playground) + क्रीडामः (Play).",
    "category": "foundation"
  },
  {
    "id": "fnd-23",
    "english": "The baby laughs charmingly.",
    "correctOrder": [
      "शिशुः",
      "सुन्दरम्",
      "हसति।"
    ],
    "scrambled": [
      "हसति।",
      "सुन्दरम्",
      "शिशुः"
    ],
    "hint": "Baby ➔ charmingly ➔ laughs.",
    "explanation": "शिशुः (Baby) + सुन्दरम् (Charmingly) + हसति (Laughs).",
    "category": "foundation"
  },
  {
    "id": "fnd-24",
    "english": "Truth alone triumphs.",
    "correctOrder": [
      "सत्यम्",
      "एव",
      "जयते।"
    ],
    "scrambled": [
      "जयते।",
      "सत्यम्",
      "एव"
    ],
    "hint": "Truth ➔ alone ➔ triumphs.",
    "explanation": "सत्यम् (Truth) + एव (Alone) + जयते (Triumphs).",
    "category": "foundation"
  },
  {
    "id": "fnd-25",
    "english": "I speak Sanskrit.",
    "correctOrder": [
      "अहम्",
      "संस्कृतम्",
      "वदामि।"
    ],
    "scrambled": [
      "वदामि।",
      "अहम्",
      "संस्कृतम्"
    ],
    "hint": "I ➔ Sanskrit ➔ speak.",
    "explanation": "अहम् (I) + संस्कृतम् (Sanskrit) + वदामि (Speak).",
    "category": "foundation"
  }
];

// Puzzles generated from the 100 Sentences for practice mode
export const SENTENCES_100_PUZZLES: SentencePuzzleItem[] = [
  {
    "id": "puz-100-1",
    "english": "Hello. / Greetings.",
    "correctOrder": [
      "हरिः",
      "ॐ।"
    ],
    "scrambled": [
      "ॐ।",
      "हरिः"
    ],
    "hint": "Hariḥ om.",
    "explanation": "हरिः ॐ। (Hello. / Greetings.)",
    "category": "etiquette"
  },
  {
    "id": "puz-100-2",
    "english": "Good morning.",
    "correctOrder": [
      "सुप्रभातम्।"
    ],
    "scrambled": [
      "सुप्रभातम्।"
    ],
    "hint": "Suprabhātam.",
    "explanation": "सुप्रभातम्। (Good morning.)",
    "category": "etiquette"
  },
  {
    "id": "puz-100-3",
    "english": "Good night.",
    "correctOrder": [
      "शुभरात्रिः।"
    ],
    "scrambled": [
      "शुभरात्रिः।"
    ],
    "hint": "Śubharātriḥ.",
    "explanation": "शुभरात्रिः। (Good night.)",
    "category": "etiquette"
  },
  {
    "id": "puz-100-4",
    "english": "Thank you.",
    "correctOrder": [
      "धन्यवादः।"
    ],
    "scrambled": [
      "धन्यवादः।"
    ],
    "hint": "Dhanyavādaḥ.",
    "explanation": "धन्यवादः। (Thank you.)",
    "category": "etiquette"
  },
  {
    "id": "puz-100-5",
    "english": "Welcome.",
    "correctOrder": [
      "स्वागतम्।"
    ],
    "scrambled": [
      "स्वागतम्।"
    ],
    "hint": "Svāgatam.",
    "explanation": "स्वागतम्। (Welcome.)",
    "category": "etiquette"
  },
  {
    "id": "puz-100-6",
    "english": "Excuse me / Forgive me.",
    "correctOrder": [
      "क्षम्यताम्।"
    ],
    "scrambled": [
      "क्षम्यताम्।"
    ],
    "hint": "Kṣamyatām.",
    "explanation": "क्षम्यताम्। (Excuse me / Forgive me.)",
    "category": "etiquette"
  },
  {
    "id": "puz-100-7",
    "english": "Please.",
    "correctOrder": [
      "कृपया।"
    ],
    "scrambled": [
      "कृपया।"
    ],
    "hint": "Kṛpayā.",
    "explanation": "कृपया। (Please.)",
    "category": "etiquette"
  },
  {
    "id": "puz-100-8",
    "english": "Okay / Let it be.",
    "correctOrder": [
      "अस्तु।"
    ],
    "scrambled": [
      "अस्तु।"
    ],
    "hint": "Astu.",
    "explanation": "अस्तु। (Okay / Let it be.)",
    "category": "etiquette"
  },
  {
    "id": "puz-100-9",
    "english": "Sir!",
    "correctOrder": [
      "श्रीमन्!"
    ],
    "scrambled": [
      "श्रीमन्!"
    ],
    "hint": "Śrīman!",
    "explanation": "श्रीमन्! (Sir!)",
    "category": "etiquette"
  },
  {
    "id": "puz-100-10",
    "english": "Madam!",
    "correctOrder": [
      "मान्ये!"
    ],
    "scrambled": [
      "मान्ये!"
    ],
    "hint": "Mānye!",
    "explanation": "मान्ये! (Madam!)",
    "category": "etiquette"
  },
  {
    "id": "puz-100-11",
    "english": "What is your name? (to a male)",
    "correctOrder": [
      "भवतः",
      "नाम",
      "किम्?"
    ],
    "scrambled": [
      "किम्?",
      "नाम",
      "भवतः"
    ],
    "hint": "Bhavataḥ nāma kim?",
    "explanation": "भवतः नाम किम्? (What is your name? (to a male))",
    "category": "identity"
  },
  {
    "id": "puz-100-12",
    "english": "What is your name? (to a female)",
    "correctOrder": [
      "भवत्याः",
      "नाम",
      "किम्?"
    ],
    "scrambled": [
      "किम्?",
      "नाम",
      "भवत्याः"
    ],
    "hint": "Bhavatyāḥ nāma kim?",
    "explanation": "भवत्याः नाम किम्? (What is your name? (to a female))",
    "category": "identity"
  },
  {
    "id": "puz-100-13",
    "english": "My name is Deva.",
    "correctOrder": [
      "मम",
      "नाम",
      "देवः।"
    ],
    "scrambled": [
      "देवः।",
      "नाम",
      "मम"
    ],
    "hint": "Mama nāma devaḥ.",
    "explanation": "मम नाम देवः। (My name is Deva.)",
    "category": "identity"
  },
  {
    "id": "puz-100-14",
    "english": "Who are you? (plural/respectful)",
    "correctOrder": [
      "भवन्तः",
      "के?"
    ],
    "scrambled": [
      "के?",
      "भवन्तः"
    ],
    "hint": "Bhavantaḥ ke?",
    "explanation": "भवन्तः के? (Who are you? (plural/respectful))",
    "category": "identity"
  },
  {
    "id": "puz-100-15",
    "english": "I am a student (male).",
    "correctOrder": [
      "अहं",
      "छात्रः",
      "अस्मि।"
    ],
    "scrambled": [
      "अस्मि।",
      "छात्रः",
      "अहं"
    ],
    "hint": "Ahaṁ chātraḥ asmi.",
    "explanation": "अहं छात्रः अस्मि। (I am a student (male).)",
    "category": "identity"
  },
  {
    "id": "puz-100-16",
    "english": "I am a student (female).",
    "correctOrder": [
      "अहं",
      "छात्रा",
      "अस्मि।"
    ],
    "scrambled": [
      "अस्मि।",
      "छात्रा",
      "अहं"
    ],
    "hint": "Ahaṁ chātrā asmi.",
    "explanation": "अहं छात्रा अस्मि। (I am a student (female).)",
    "category": "identity"
  },
  {
    "id": "puz-100-17",
    "english": "This is my friend.",
    "correctOrder": [
      "एषः",
      "मम",
      "मित्रम्।"
    ],
    "scrambled": [
      "मित्रम्।",
      "मम",
      "एषः"
    ],
    "hint": "Eṣaḥ mama mitram.",
    "explanation": "एषः मम मित्रम्। (This is my friend.)",
    "category": "identity"
  },
  {
    "id": "puz-100-18",
    "english": "Who is he?",
    "correctOrder": [
      "सः",
      "कः?"
    ],
    "scrambled": [
      "कः?",
      "सः"
    ],
    "hint": "Saḥ kaḥ?",
    "explanation": "सः कः? (Who is he?)",
    "category": "identity"
  },
  {
    "id": "puz-100-19",
    "english": "Who is she?",
    "correctOrder": [
      "सा",
      "का?"
    ],
    "scrambled": [
      "का?",
      "सा"
    ],
    "hint": "Sā kā?",
    "explanation": "सा का? (Who is she?)",
    "category": "identity"
  },
  {
    "id": "puz-100-20",
    "english": "Where are you?",
    "correctOrder": [
      "त्वं",
      "कुत्र",
      "असि?"
    ],
    "scrambled": [
      "असि?",
      "कुत्र",
      "त्वं"
    ],
    "hint": "Tvaṁ kutra asi?",
    "explanation": "त्वं कुत्र असि? (Where are you?)",
    "category": "identity"
  },
  {
    "id": "puz-100-21",
    "english": "I read / study.",
    "correctOrder": [
      "अहं",
      "पठामि।"
    ],
    "scrambled": [
      "पठामि।",
      "अहं"
    ],
    "hint": "Ahaṁ paṭhāmi.",
    "explanation": "अहं पठामि। (I read / study.)",
    "category": "daily_actions"
  },
  {
    "id": "puz-100-22",
    "english": "You write.",
    "correctOrder": [
      "त्वं",
      "लिखसि।"
    ],
    "scrambled": [
      "लिखसि।",
      "त्वं"
    ],
    "hint": "Tvaṁ likhasi.",
    "explanation": "त्वं लिखसि। (You write.)",
    "category": "daily_actions"
  },
  {
    "id": "puz-100-23",
    "english": "He eats.",
    "correctOrder": [
      "सः",
      "खादति।"
    ],
    "scrambled": [
      "खादति।",
      "सः"
    ],
    "hint": "Saḥ khādati.",
    "explanation": "सः खादति। (He eats.)",
    "category": "daily_actions"
  },
  {
    "id": "puz-100-24",
    "english": "She drinks.",
    "correctOrder": [
      "सा",
      "पिबति।"
    ],
    "scrambled": [
      "पिबति।",
      "सा"
    ],
    "hint": "Sā pibati.",
    "explanation": "सा पिबति। (She drinks.)",
    "category": "daily_actions"
  },
  {
    "id": "puz-100-25",
    "english": "The boy runs.",
    "correctOrder": [
      "बालकः",
      "धावति।"
    ],
    "scrambled": [
      "धावति।",
      "बालकः"
    ],
    "hint": "Bālakaḥ dhāvati.",
    "explanation": "बालकः धावति। (The boy runs.)",
    "category": "daily_actions"
  },
  {
    "id": "puz-100-26",
    "english": "The girl laughs.",
    "correctOrder": [
      "बालिका",
      "हसति।"
    ],
    "scrambled": [
      "हसति।",
      "बालिका"
    ],
    "hint": "Bālikā hasati.",
    "explanation": "बालिका हसति। (The girl laughs.)",
    "category": "daily_actions"
  },
  {
    "id": "puz-100-27",
    "english": "I am going.",
    "correctOrder": [
      "अहं",
      "गच्छामि।"
    ],
    "scrambled": [
      "गच्छामि।",
      "अहं"
    ],
    "hint": "Ahaṁ gacchāmi.",
    "explanation": "अहं गच्छामि। (I am going.)",
    "category": "daily_actions"
  },
  {
    "id": "puz-100-28",
    "english": "You are coming.",
    "correctOrder": [
      "त्वं",
      "आगच्छसि।"
    ],
    "scrambled": [
      "आगच्छसि।",
      "त्वं"
    ],
    "hint": "Tvaṁ āgacchasi.",
    "explanation": "त्वं आगच्छसि। (You are coming.)",
    "category": "daily_actions"
  },
  {
    "id": "puz-100-29",
    "english": "This person sits.",
    "correctOrder": [
      "एषः",
      "उपविशति।"
    ],
    "scrambled": [
      "उपविशति।",
      "एषः"
    ],
    "hint": "Eṣaḥ upaviśati.",
    "explanation": "एषः उपविशति। (This person sits.)",
    "category": "daily_actions"
  },
  {
    "id": "puz-100-30",
    "english": "He stands up.",
    "correctOrder": [
      "सः",
      "उत्तिष्ठति।"
    ],
    "scrambled": [
      "उत्तिष्ठति।",
      "सः"
    ],
    "hint": "Saḥ uttiṣṭhati.",
    "explanation": "सः उत्तिष्ठति। (He stands up.)",
    "category": "daily_actions"
  },
  {
    "id": "puz-100-31",
    "english": "Come here.",
    "correctOrder": [
      "अत्र",
      "आगच्छ।"
    ],
    "scrambled": [
      "आगच्छ।",
      "अत्र"
    ],
    "hint": "Atra āgaccha.",
    "explanation": "अत्र आगच्छ। (Come here.)",
    "category": "commands"
  },
  {
    "id": "puz-100-32",
    "english": "Go there.",
    "correctOrder": [
      "तत्र",
      "गच्छ।"
    ],
    "scrambled": [
      "गच्छ।",
      "तत्र"
    ],
    "hint": "Tatra gaccha.",
    "explanation": "तत्र गच्छ। (Go there.)",
    "category": "commands"
  },
  {
    "id": "puz-100-33",
    "english": "Open the book.",
    "correctOrder": [
      "पुस्तकम्",
      "उद्घाटय।"
    ],
    "scrambled": [
      "उद्घाटय।",
      "पुस्तकम्"
    ],
    "hint": "Pustakam udghāṭaya.",
    "explanation": "पुस्तकम् उद्घाटय। (Open the book.)",
    "category": "commands"
  },
  {
    "id": "puz-100-34",
    "english": "Talk to me.",
    "correctOrder": [
      "मया",
      "सह",
      "सम्भाषस्व।"
    ],
    "scrambled": [
      "सम्भाषस्व।",
      "सह",
      "मया"
    ],
    "hint": "Mayā saha sambhāṣasva.",
    "explanation": "मया सह सम्भाषस्व। (Talk to me.)",
    "category": "commands"
  },
  {
    "id": "puz-100-35",
    "english": "Give me an answer.",
    "correctOrder": [
      "मह्यम्",
      "उत्तरं",
      "यच्छ।"
    ],
    "scrambled": [
      "यच्छ।",
      "उत्तरं",
      "मह्यम्"
    ],
    "hint": "Mahyam uttaraṁ yaccha.",
    "explanation": "मह्यम् उत्तरं यच्छ। (Give me an answer.)",
    "category": "commands"
  },
  {
    "id": "puz-100-36",
    "english": "Speak loudly.",
    "correctOrder": [
      "उच्चैः",
      "वद।"
    ],
    "scrambled": [
      "वद।",
      "उच्चैः"
    ],
    "hint": "Uccaiḥ vada.",
    "explanation": "उच्चैः वद। (Speak loudly.)",
    "category": "commands"
  },
  {
    "id": "puz-100-37",
    "english": "Don't forget me.",
    "correctOrder": [
      "मां",
      "मा",
      "विस्मर।"
    ],
    "scrambled": [
      "विस्मर।",
      "मा",
      "मां"
    ],
    "hint": "Māṁ mā vismara.",
    "explanation": "मां मा विस्मर। (Don't forget me.)",
    "category": "commands"
  },
  {
    "id": "puz-100-38",
    "english": "Please pay attention.",
    "correctOrder": [
      "ध्यानं",
      "ददातु।"
    ],
    "scrambled": [
      "ददातु।",
      "ध्यानं"
    ],
    "hint": "Dhyānaṁ dadātu.",
    "explanation": "ध्यानं ददातु। (Please pay attention.)",
    "category": "commands"
  },
  {
    "id": "puz-100-39",
    "english": "Look at the picture.",
    "correctOrder": [
      "चित्रं",
      "पश्य।"
    ],
    "scrambled": [
      "पश्य।",
      "चित्रं"
    ],
    "hint": "Citraṁ paśya.",
    "explanation": "चित्रं पश्य। (Look at the picture.)",
    "category": "commands"
  },
  {
    "id": "puz-100-40",
    "english": "Write now.",
    "correctOrder": [
      "इदानीं",
      "लिखतु।"
    ],
    "scrambled": [
      "लिखतु।",
      "इदानीं"
    ],
    "hint": "Idānīṁ likhatu.",
    "explanation": "इदानीं लिखतु। (Write now.)",
    "category": "commands"
  },
  {
    "id": "puz-100-41",
    "english": "This is my house.",
    "correctOrder": [
      "एतत्",
      "मम",
      "गृहम्।"
    ],
    "scrambled": [
      "गृहम्।",
      "मम",
      "एतत्"
    ],
    "hint": "Etat mama gṛham.",
    "explanation": "एतत् मम गृहम्। (This is my house.)",
    "category": "possession"
  },
  {
    "id": "puz-100-42",
    "english": "I have a mother.",
    "correctOrder": [
      "मम",
      "माता",
      "अस्ति।"
    ],
    "scrambled": [
      "अस्ति।",
      "माता",
      "मम"
    ],
    "hint": "Mama mātā asti.",
    "explanation": "मम माता अस्ति। (I have a mother.)",
    "category": "possession"
  },
  {
    "id": "puz-100-43",
    "english": "Where is your brother?",
    "correctOrder": [
      "तव",
      "भ्राता",
      "कुत्र?"
    ],
    "scrambled": [
      "कुत्र?",
      "भ्राता",
      "तव"
    ],
    "hint": "Tava bhrātā kutra?",
    "explanation": "तव भ्राता कुत्र? (Where is your brother?)",
    "category": "possession"
  },
  {
    "id": "puz-100-44",
    "english": "This is my sister.",
    "correctOrder": [
      "एषा",
      "मम",
      "भगिनी।"
    ],
    "scrambled": [
      "भगिनी।",
      "मम",
      "एषा"
    ],
    "hint": "Eṣā mama bhaginī.",
    "explanation": "एषा मम भगिनी। (This is my sister.)",
    "category": "possession"
  },
  {
    "id": "puz-100-45",
    "english": "His father is a doctor.",
    "correctOrder": [
      "तस्य",
      "पिता",
      "वैद्यः।"
    ],
    "scrambled": [
      "वैद्यः।",
      "पिता",
      "तस्य"
    ],
    "hint": "Tasya pitā vaidyaḥ.",
    "explanation": "तस्य पिता वैद्यः। (His father is a doctor.)",
    "category": "possession"
  },
  {
    "id": "puz-100-46",
    "english": "Her house is large.",
    "correctOrder": [
      "तस्याः",
      "गृहं",
      "विशालम्।"
    ],
    "scrambled": [
      "विशालम्।",
      "गृहं",
      "तस्याः"
    ],
    "hint": "Tasyāḥ gṛhaṁ viśālam.",
    "explanation": "तस्याः गृहं विशालम्। (Her house is large.)",
    "category": "possession"
  },
  {
    "id": "puz-100-47",
    "english": "Is this your book?",
    "correctOrder": [
      "किं",
      "तव",
      "पुस्तकम्?"
    ],
    "scrambled": [
      "पुस्तकम्?",
      "तव",
      "किं"
    ],
    "hint": "Kiṁ tava pustakam?",
    "explanation": "किं तव पुस्तकम्? (Is this your book?)",
    "category": "possession"
  },
  {
    "id": "puz-100-48",
    "english": "The tree has fruits.",
    "correctOrder": [
      "वृक्षस्य",
      "फलानि",
      "सन्ति।"
    ],
    "scrambled": [
      "सन्ति।",
      "फलानि",
      "वृक्षस्य"
    ],
    "hint": "Vṛkṣasya phalāni santi.",
    "explanation": "वृक्षस्य फलानि सन्ति। (The tree has fruits.)",
    "category": "possession"
  },
  {
    "id": "puz-100-49",
    "english": "The river's water is cold.",
    "correctOrder": [
      "नद्याः",
      "जलं",
      "शीतलम्।"
    ],
    "scrambled": [
      "शीतलम्।",
      "जलं",
      "नद्याः"
    ],
    "hint": "Nadyāḥ jalaṁ śītalam.",
    "explanation": "नद्याः जलं शीतलम्। (The river's water is cold.)",
    "category": "possession"
  },
  {
    "id": "puz-100-50",
    "english": "I am with you.",
    "correctOrder": [
      "अहं",
      "भवता",
      "सह",
      "अस्मि।"
    ],
    "scrambled": [
      "अस्मि।",
      "सह",
      "भवता",
      "अहं"
    ],
    "hint": "Ahaṁ bhavatā saha asmi.",
    "explanation": "अहं भवता सह अस्मि। (I am with you.)",
    "category": "possession"
  },
  {
    "id": "puz-100-51",
    "english": "What time is it now?",
    "correctOrder": [
      "इदानीं",
      "कः",
      "समयः?"
    ],
    "scrambled": [
      "समयः?",
      "कः",
      "इदानीं"
    ],
    "hint": "Idānīṁ kaḥ samayaḥ?",
    "explanation": "इदानीं कः समयः? (What time is it now?)",
    "category": "time_weather"
  },
  {
    "id": "puz-100-52",
    "english": "Today is Sunday.",
    "correctOrder": [
      "अद्य",
      "रविवासरः",
      "अस्ति।"
    ],
    "scrambled": [
      "अस्ति।",
      "रविवासरः",
      "अद्य"
    ],
    "hint": "Adya ravivāsaraḥ asti.",
    "explanation": "अद्य रविवासरः अस्ति। (Today is Sunday.)",
    "category": "time_weather"
  },
  {
    "id": "puz-100-53",
    "english": "Tomorrow is Monday.",
    "correctOrder": [
      "श्वः",
      "सोमवासरः।"
    ],
    "scrambled": [
      "सोमवासरः।",
      "श्वः"
    ],
    "hint": "Śvaḥ somavāsaraḥ.",
    "explanation": "श्वः सोमवासरः। (Tomorrow is Monday.)",
    "category": "time_weather"
  },
  {
    "id": "puz-100-54",
    "english": "Yesterday was Saturday.",
    "correctOrder": [
      "ह्यः",
      "शनिवासरः",
      "आसीत्।"
    ],
    "scrambled": [
      "आसीत्।",
      "शनिवासरः",
      "ह्यः"
    ],
    "hint": "Hyaḥ śanivāsaraḥ āsīt.",
    "explanation": "ह्यः शनिवासरः आसीत्। (Yesterday was Saturday.)",
    "category": "time_weather"
  },
  {
    "id": "puz-100-55",
    "english": "Today the sun is bright.",
    "correctOrder": [
      "अद्य",
      "सूर्यः",
      "प्रखरः",
      "अस्ति।"
    ],
    "scrambled": [
      "अस्ति।",
      "प्रखरः",
      "सूर्यः",
      "अद्य"
    ],
    "hint": "Adya sūryaḥ prakharaḥ asti.",
    "explanation": "अद्य सूर्यः प्रखरः अस्ति। (Today the sun is bright.)",
    "category": "time_weather"
  },
  {
    "id": "puz-100-56",
    "english": "The cloud is raining.",
    "correctOrder": [
      "मेघः",
      "वर्षति।"
    ],
    "scrambled": [
      "वर्षति।",
      "मेघः"
    ],
    "hint": "Meghaḥ varṣati.",
    "explanation": "मेघः वर्षति। (The cloud is raining.)",
    "category": "time_weather"
  },
  {
    "id": "puz-100-57",
    "english": "Cold wind is blowing.",
    "correctOrder": [
      "शीतलः",
      "वायुः",
      "वहति।"
    ],
    "scrambled": [
      "वहति।",
      "वायुः",
      "शीतलः"
    ],
    "hint": "Śītalaḥ vāyuḥ vahati.",
    "explanation": "शीतलः वायुः वहति। (Cold wind is blowing.)",
    "category": "time_weather"
  },
  {
    "id": "puz-100-58",
    "english": "It is cold today.",
    "correctOrder": [
      "अद्य",
      "शैत्यम्",
      "अस्ति।"
    ],
    "scrambled": [
      "अस्ति।",
      "शैत्यम्",
      "अद्य"
    ],
    "hint": "Adya śaityam asti.",
    "explanation": "अद्य शैत्यम् अस्ति। (It is cold today.)",
    "category": "time_weather"
  },
  {
    "id": "puz-100-59",
    "english": "It has become evening.",
    "correctOrder": [
      "सायङ्कालः",
      "अभवत्।"
    ],
    "scrambled": [
      "अभवत्।",
      "सायङ्कालः"
    ],
    "hint": "Sāyaṅkālaḥ abhavat.",
    "explanation": "सायङ्कालः अभवत्। (It has become evening.)",
    "category": "time_weather"
  },
  {
    "id": "puz-100-60",
    "english": "When will you go?",
    "correctOrder": [
      "कदा",
      "गमिष्यसि?"
    ],
    "scrambled": [
      "गमिष्यसि?",
      "कदा"
    ],
    "hint": "Kadā gamiṣyasi?",
    "explanation": "कदा गमिष्यसि? (When will you go?)",
    "category": "time_weather"
  },
  {
    "id": "puz-100-61",
    "english": "Is the food ready?",
    "correctOrder": [
      "भोजनं",
      "सिद्धं",
      "किम्?"
    ],
    "scrambled": [
      "किम्?",
      "सिद्धं",
      "भोजनं"
    ],
    "hint": "Bhojanaṁ siddhaṁ kim?",
    "explanation": "भोजनं सिद्धं किम्? (Is the food ready?)",
    "category": "food"
  },
  {
    "id": "puz-100-62",
    "english": "I am hungry (male).",
    "correctOrder": [
      "अहं",
      "बुभुक्षितः",
      "अस्मि।"
    ],
    "scrambled": [
      "अस्मि।",
      "बुभुक्षितः",
      "अहं"
    ],
    "hint": "Ahaṁ bubhukṣitaḥ asmi.",
    "explanation": "अहं बुभुक्षितः अस्मि। (I am hungry (male).)",
    "category": "food"
  },
  {
    "id": "puz-100-63",
    "english": "Have you eaten? (to a female)",
    "correctOrder": [
      "भोजनं",
      "कृतवती",
      "किम्?"
    ],
    "scrambled": [
      "किम्?",
      "कृतवती",
      "भोजनं"
    ],
    "hint": "Bhojanaṁ kṛtavatī kim?",
    "explanation": "भोजनं कृतवती किम्? (Have you eaten? (to a female))",
    "category": "food"
  },
  {
    "id": "puz-100-64",
    "english": "I like rice.",
    "correctOrder": [
      "मह्यम्",
      "ओदनं",
      "रोचते।"
    ],
    "scrambled": [
      "रोचते।",
      "ओदनं",
      "मह्यम्"
    ],
    "hint": "Mahyam odanaṁ rocate.",
    "explanation": "मह्यम् ओदनं रोचते। (I like rice.)",
    "category": "food"
  },
  {
    "id": "puz-100-65",
    "english": "Please give water.",
    "correctOrder": [
      "जलं",
      "ददातु।"
    ],
    "scrambled": [
      "ददातु।",
      "जलं"
    ],
    "hint": "Jalaṁ dadātu.",
    "explanation": "जलं ददातु। (Please give water.)",
    "category": "food"
  },
  {
    "id": "puz-100-66",
    "english": "Milk is sweet.",
    "correctOrder": [
      "दुग्धं",
      "मधुरं",
      "भवति।"
    ],
    "scrambled": [
      "भवति।",
      "मधुरं",
      "दुग्धं"
    ],
    "hint": "Dugdhaṁ madhuraṁ bhavati.",
    "explanation": "दुग्धं मधुरं भवति। (Milk is sweet.)",
    "category": "food"
  },
  {
    "id": "puz-100-67",
    "english": "Fruits are healthy.",
    "correctOrder": [
      "फलानि",
      "स्वास्थ्यकराणि।"
    ],
    "scrambled": [
      "स्वास्थ्यकराणि।",
      "फलानि"
    ],
    "hint": "Phalāni svāsthyakarāṇi.",
    "explanation": "फलानि स्वास्थ्यकराणि। (Fruits are healthy.)",
    "category": "food"
  },
  {
    "id": "puz-100-68",
    "english": "The breakfast is salty.",
    "correctOrder": [
      "अल्पाहारः",
      "लवणयुक्तः",
      "अस्ति।"
    ],
    "scrambled": [
      "अस्ति।",
      "लवणयुक्तः",
      "अल्पाहारः"
    ],
    "hint": "Alpāhāraḥ lavaṇayuktaḥ asti.",
    "explanation": "अल्पाहारः लवणयुक्तः अस्ति। (The breakfast is salty.)",
    "category": "food"
  },
  {
    "id": "puz-100-69",
    "english": "I do not drink tea.",
    "correctOrder": [
      "अहं",
      "चायं",
      "न",
      "पिबामि।"
    ],
    "scrambled": [
      "पिबामि।",
      "न",
      "चायं",
      "अहं"
    ],
    "hint": "Ahaṁ cāyaṁ na pibāmi.",
    "explanation": "अहं चायं न पिबामि। (I do not drink tea.)",
    "category": "food"
  },
  {
    "id": "puz-100-70",
    "english": "What are you doing? (to a female)",
    "correctOrder": [
      "किं",
      "कुर्वती",
      "असि?"
    ],
    "scrambled": [
      "असि?",
      "कुर्वती",
      "किं"
    ],
    "hint": "Kiṁ kurvatī asi?",
    "explanation": "किं कुर्वती असि? (What are you doing? (to a female))",
    "category": "food"
  },
  {
    "id": "puz-100-71",
    "english": "Rama will come tomorrow.",
    "correctOrder": [
      "रामः",
      "श्वः",
      "आगमिष्यति।"
    ],
    "scrambled": [
      "आगमिष्यति।",
      "श्वः",
      "रामः"
    ],
    "hint": "Rāmaḥ śvaḥ āgamiṣyati.",
    "explanation": "रामः श्वः आगमिष्यति। (Rama will come tomorrow.)",
    "category": "tenses"
  },
  {
    "id": "puz-100-72",
    "english": "I read the lesson (male, past).",
    "correctOrder": [
      "अहं",
      "पाठं",
      "पठितवान्।"
    ],
    "scrambled": [
      "पठितवान्।",
      "पाठं",
      "अहं"
    ],
    "hint": "Ahaṁ pāṭhaṁ paṭhitavān.",
    "explanation": "अहं पाठं पठितवान्। (I read the lesson (male, past).)",
    "category": "tenses"
  },
  {
    "id": "puz-100-73",
    "english": "She did the work.",
    "correctOrder": [
      "सा",
      "कार्यं",
      "कृतवती।"
    ],
    "scrambled": [
      "कृतवती।",
      "कार्यं",
      "सा"
    ],
    "hint": "Sā kāryaṁ kṛtavatī.",
    "explanation": "सा कार्यं कृतवती। (She did the work.)",
    "category": "tenses"
  },
  {
    "id": "puz-100-74",
    "english": "They went to the playground.",
    "correctOrder": [
      "ते",
      "क्रीडाङ्गणं",
      "गतवन्तः।"
    ],
    "scrambled": [
      "गतवन्तः।",
      "क्रीडाङ्गणं",
      "ते"
    ],
    "hint": "Te krīḍāṅgaṇaṁ gatavantaḥ.",
    "explanation": "ते क्रीडाङ्गणं गतवन्तः। (They went to the playground.)",
    "category": "tenses"
  },
  {
    "id": "puz-100-75",
    "english": "We will watch a movie.",
    "correctOrder": [
      "वयं",
      "चित्रपटं",
      "द्रक्ष्यामः।"
    ],
    "scrambled": [
      "द्रक्ष्यामः।",
      "चित्रपटं",
      "वयं"
    ],
    "hint": "Vayaṁ citrapaṭaṁ drakṣyāmaḥ.",
    "explanation": "वयं चित्रपटं द्रक्ष्यामः। (We will watch a movie.)",
    "category": "tenses"
  },
  {
    "id": "puz-100-76",
    "english": "Where were you?",
    "correctOrder": [
      "त्वं",
      "कुत्र",
      "आसीः?"
    ],
    "scrambled": [
      "आसीः?",
      "कुत्र",
      "त्वं"
    ],
    "hint": "Tvaṁ kutra āsīḥ?",
    "explanation": "त्वं कुत्र आसीः? (Where were you?)",
    "category": "tenses"
  },
  {
    "id": "puz-100-77",
    "english": "The teacher gave knowledge.",
    "correctOrder": [
      "गुरुः",
      "ज्ञानं",
      "दत्तवान्।"
    ],
    "scrambled": [
      "दत्तवान्।",
      "ज्ञानं",
      "गुरुः"
    ],
    "hint": "Guruḥ jñānaṁ dattavān.",
    "explanation": "गुरुः ज्ञानं दत्तवान्। (The teacher gave knowledge.)",
    "category": "tenses"
  },
  {
    "id": "puz-100-78",
    "english": "I will give money.",
    "correctOrder": [
      "अहं",
      "धनं",
      "दास्यामि।"
    ],
    "scrambled": [
      "दास्यामि।",
      "धनं",
      "अहं"
    ],
    "hint": "Ahaṁ dhanaṁ dāsyāmi.",
    "explanation": "अहं धनं दास्यामि। (I will give money.)",
    "category": "tenses"
  },
  {
    "id": "puz-100-79",
    "english": "Did you laugh?",
    "correctOrder": [
      "किं",
      "त्वं",
      "हसितवान्?"
    ],
    "scrambled": [
      "हसितवान्?",
      "त्वं",
      "किं"
    ],
    "hint": "Kiṁ tvaṁ hasitavān?",
    "explanation": "किं त्वं हसितवान्? (Did you laugh?)",
    "category": "tenses"
  },
  {
    "id": "puz-100-80",
    "english": "A leaf fell from the tree.",
    "correctOrder": [
      "वृक्षात्",
      "पत्रं",
      "अपतत्।"
    ],
    "scrambled": [
      "अपतत्।",
      "पत्रं",
      "वृक्षात्"
    ],
    "hint": "Vṛkṣāt patraṁ apatat.",
    "explanation": "वृक्षात् पत्रं अपतत्। (A leaf fell from the tree.)",
    "category": "tenses"
  },
  {
    "id": "puz-100-81",
    "english": "Two boys are playing.",
    "correctOrder": [
      "बालकौ",
      "क्रीडतः।"
    ],
    "scrambled": [
      "क्रीडतः।",
      "बालकौ"
    ],
    "hint": "Bālakau krīḍataḥ.",
    "explanation": "बालकौ क्रीडतः। (Two boys are playing.)",
    "category": "plurals"
  },
  {
    "id": "puz-100-82",
    "english": "Two girls are dancing.",
    "correctOrder": [
      "कन्ये",
      "नृत्यताः।"
    ],
    "scrambled": [
      "नृत्यताः।",
      "कन्ये"
    ],
    "hint": "Kanye nṛtyataḥ.",
    "explanation": "कन्ये नृत्यताः। (Two girls are dancing.)",
    "category": "plurals"
  },
  {
    "id": "puz-100-83",
    "english": "I am reading two books.",
    "correctOrder": [
      "अहं",
      "द्वे",
      "पुस्तके",
      "पठामि।"
    ],
    "scrambled": [
      "पठामि।",
      "पुस्तके",
      "द्वे",
      "अहं"
    ],
    "hint": "Ahaṁ dve pustake paṭhāmi.",
    "explanation": "अहं द्वे पुस्तके पठामि। (I am reading two books.)",
    "category": "plurals"
  },
  {
    "id": "puz-100-84",
    "english": "The students are asking questions.",
    "correctOrder": [
      "छात्राः",
      "प्रश्नं",
      "पृच्छन्ति।"
    ],
    "scrambled": [
      "पृच्छन्ति।",
      "प्रश्नं",
      "छात्राः"
    ],
    "hint": "Chātrāḥ praśnaṁ pṛcchanti.",
    "explanation": "छात्राः प्रश्नं पृच्छन्ति। (The students are asking questions.)",
    "category": "plurals"
  },
  {
    "id": "puz-100-85",
    "english": "We live in India.",
    "correctOrder": [
      "वयं",
      "भारते",
      "वसामः।"
    ],
    "scrambled": [
      "वसामः।",
      "भारते",
      "वयं"
    ],
    "hint": "Vayaṁ bhārate vasāmaḥ.",
    "explanation": "वयं भारते वसामः। (We live in India.)",
    "category": "plurals"
  },
  {
    "id": "puz-100-86",
    "english": "The flowers are blooming.",
    "correctOrder": [
      "पुष्पाणि",
      "विकसन्ति।"
    ],
    "scrambled": [
      "विकसन्ति।",
      "पुष्पाणि"
    ],
    "hint": "Puṣpāni vikasanti.",
    "explanation": "पुष्पाणि विकसन्ति। (The flowers are blooming.)",
    "category": "plurals"
  },
  {
    "id": "puz-100-87",
    "english": "Where are you all going?",
    "correctOrder": [
      "यूयं",
      "कुत्र",
      "गच्छथ?"
    ],
    "scrambled": [
      "गच्छथ?",
      "कुत्र",
      "यूयं"
    ],
    "hint": "Yūyaṁ kutra gacchatha?",
    "explanation": "यूयं कुत्र गच्छथ? (Where are you all going?)",
    "category": "plurals"
  },
  {
    "id": "puz-100-88",
    "english": "Birds fly in the sky.",
    "correctOrder": [
      "खगाः",
      "आकाशे",
      "उड्डयन्ते।"
    ],
    "scrambled": [
      "उड्डयन्ते।",
      "आकाशे",
      "खगाः"
    ],
    "hint": "Khagāḥ ākāśe uḍḍayante.",
    "explanation": "खगाः आकाशे उड्डयन्ते। (Birds fly in the sky.)",
    "category": "plurals"
  },
  {
    "id": "puz-100-89",
    "english": "The horses run fast.",
    "correctOrder": [
      "अश्वाः",
      "वेगेन",
      "धावन्ति।"
    ],
    "scrambled": [
      "धावन्ति।",
      "वेगेन",
      "अश्वाः"
    ],
    "hint": "Aśvāḥ vegena dhāvanti.",
    "explanation": "अश्वाः वेगेन धावन्ति। (The horses run fast.)",
    "category": "plurals"
  },
  {
    "id": "puz-100-90",
    "english": "They walk slowly.",
    "correctOrder": [
      "ते",
      "मन्दं",
      "चलन्ति।"
    ],
    "scrambled": [
      "चलन्ति।",
      "मन्दं",
      "ते"
    ],
    "hint": "Te mandaṁ calanti.",
    "explanation": "ते मन्दं चलन्ति। (They walk slowly.)",
    "category": "plurals"
  },
  {
    "id": "puz-100-91",
    "english": "Speak the truth. Live with integrity.",
    "correctOrder": [
      "सत्यं",
      "वद,",
      "धर्मं",
      "चर।"
    ],
    "scrambled": [
      "चर।",
      "धर्मं",
      "वद,",
      "सत्यं"
    ],
    "hint": "Satyaṁ vada, dharmaṁ cara.",
    "explanation": "सत्यं वद, धर्मं चर। (Speak the truth. Live with integrity.)",
    "category": "wisdom"
  },
  {
    "id": "puz-100-92",
    "english": "A scholar is worshipped everywhere.",
    "correctOrder": [
      "विद्वान्",
      "सर्वत्र",
      "पूज्यते।"
    ],
    "scrambled": [
      "पूज्यते।",
      "सर्वत्र",
      "विद्वान्"
    ],
    "hint": "Vidvān sarvatra pūjyate.",
    "explanation": "विद्वान् सर्वत्र पूज्यते। (A scholar is worshipped everywhere.)",
    "category": "wisdom"
  },
  {
    "id": "puz-100-93",
    "english": "Greed gives rise to sin.",
    "correctOrder": [
      "लोभात्",
      "पापं",
      "प्रजायते।"
    ],
    "scrambled": [
      "प्रजायते।",
      "पापं",
      "लोभात्"
    ],
    "hint": "Lobhāt pāpaṁ prajāyate.",
    "explanation": "लोभात् पापं प्रजायते। (Greed gives rise to sin.)",
    "category": "wisdom"
  },
  {
    "id": "puz-100-94",
    "english": "You are my happiness.",
    "correctOrder": [
      "त्वं",
      "मम",
      "आनन्दः",
      "असि।"
    ],
    "scrambled": [
      "असि।",
      "आनन्दः",
      "मम",
      "त्वं"
    ],
    "hint": "Tvaṁ mama ānandaḥ asi.",
    "explanation": "त्वं मम आनन्दः असि। (You are my happiness.)",
    "category": "wisdom"
  },
  {
    "id": "puz-100-95",
    "english": "Time heals all wounds.",
    "correctOrder": [
      "कालः",
      "सर्वं",
      "विरोपयति।"
    ],
    "scrambled": [
      "विरोपयति।",
      "सर्वं",
      "कालः"
    ],
    "hint": "Kālaḥ sarvaṁ viropayati.",
    "explanation": "कालः सर्वं विरोपयति। (Time heals all wounds.)",
    "category": "wisdom"
  },
  {
    "id": "puz-100-96",
    "english": "This, too, shall pass.",
    "correctOrder": [
      "एतदपि",
      "गमिष्यति।"
    ],
    "scrambled": [
      "गमिष्यति।",
      "एतदपि"
    ],
    "hint": "Etadapi gamiṣyati.",
    "explanation": "एतदपि गमिष्यति। (This, too, shall pass.)",
    "category": "wisdom"
  },
  {
    "id": "puz-100-97",
    "english": "Rama is strong.",
    "correctOrder": [
      "रामो",
      "बलवान्",
      "अस्ति।"
    ],
    "scrambled": [
      "अस्ति।",
      "बलवान्",
      "रामो"
    ],
    "hint": "Rāmo balavān asti.",
    "explanation": "रामो बलवान् अस्ति। (Rama is strong.)",
    "category": "wisdom"
  },
  {
    "id": "puz-100-98",
    "english": "Truth alone triumphs.",
    "correctOrder": [
      "सत्यमेव",
      "जयते।"
    ],
    "scrambled": [
      "जयते।",
      "सत्यमेव"
    ],
    "hint": "Satyameva jayate.",
    "explanation": "सत्यमेव जयते। (Truth alone triumphs.)",
    "category": "wisdom"
  },
  {
    "id": "puz-100-99",
    "english": "Knowledge is the highest ornament.",
    "correctOrder": [
      "ज्ञानं",
      "परमं",
      "भूषणम्।"
    ],
    "scrambled": [
      "भूषणम्।",
      "परमं",
      "ज्ञानं"
    ],
    "hint": "Jñānaṁ paramaṁ bhūṣaṇam.",
    "explanation": "ज्ञानं परमं भूषणम्। (Knowledge is the highest ornament.)",
    "category": "wisdom"
  },
  {
    "id": "puz-100-100",
    "english": "I speak Sanskrit.",
    "correctOrder": [
      "अहं",
      "संस्कृतं",
      "वदामि।"
    ],
    "scrambled": [
      "वदामि।",
      "संस्कृतं",
      "अहं"
    ],
    "hint": "Ahaṁ saṁskṛtaṁ vadāmi.",
    "explanation": "अहं संस्कृतं वदामि। (I speak Sanskrit.)",
    "category": "wisdom"
  }
];

// Default builder puzzles collection
export const SENTENCE_BUILDER_PUZZLES: SentencePuzzleItem[] = [
  ...FOUNDATIONAL_TILE_PUZZLES,
  ...SENTENCES_100_PUZZLES,
];
