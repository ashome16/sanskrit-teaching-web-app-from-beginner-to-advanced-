// Interactive Root Words, 200 Everyday Sanskrit Sentences & Tiles Puzzle Library

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

export type SentenceCategoryKey =
  | 'etiquette'
  | 'identity'
  | 'daily_actions'
  | 'commands'
  | 'possession'
  | 'time_weather'
  | 'food'
  | 'tenses'
  | 'plurals'
  | 'wisdom'
  | 'questions'
  | 'locations'
  | 'adjectives'
  | 'hobbies'
  | 'rules'
  | 'connectors'
  | 'wellness'
  | 'nature_animals'
  | 'intentions'
  | 'conversation';

export interface SimpleSentenceItem {
  id: string;
  num: number;
  sanskrit: string;
  transliteration: string;
  english: string;
  hindi?: string;
  category: SentenceCategoryKey;
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
  {
    "key": "etiquette",
    "labelDev": "१. शिष्टाचारः",
    "labelEn": "Greetings & Etiquette",
    "icon": "🙏",
    "count": 10
  },
  {
    "key": "identity",
    "labelDev": "२. परिचयः",
    "labelEn": "Introductions & Identity",
    "icon": "👤",
    "count": 10
  },
  {
    "key": "daily_actions",
    "labelDev": "३. दैनिकक्रियाः",
    "labelEn": "Simple Daily Actions",
    "icon": "🚶",
    "count": 10
  },
  {
    "key": "commands",
    "labelDev": "४. आज्ञाप्रयोगाः",
    "labelEn": "Classroom & Commands",
    "icon": "🗣️",
    "count": 10
  },
  {
    "key": "possession",
    "labelDev": "५. सम्बन्धः",
    "labelEn": "Possession & Family",
    "icon": "🏡",
    "count": 10
  },
  {
    "key": "time_weather",
    "labelDev": "६. समयः वातावरणं च",
    "labelEn": "Time & Weather",
    "icon": "☀️",
    "count": 10
  },
  {
    "key": "food",
    "labelDev": "७. भोजनम्",
    "labelEn": "Food & Dining",
    "icon": "🍲",
    "count": 10
  },
  {
    "key": "tenses",
    "labelDev": "८. भूत-भविष्यत्-कालाः",
    "labelEn": "Past & Future Actions",
    "icon": "⏳",
    "count": 10
  },
  {
    "key": "plurals",
    "labelDev": "९. द्विवचन-बहुवचनम्",
    "labelEn": "Duals & Plurals",
    "icon": "👥",
    "count": 10
  },
  {
    "key": "wisdom",
    "labelDev": "१०. सुभाषितानि",
    "labelEn": "Proverbs & Wisdom",
    "icon": "🪔",
    "count": 10
  },
  {
    "key": "questions",
    "labelDev": "११. प्रश्नोत्तराणि",
    "labelEn": "Questions & Inquiries",
    "icon": "❓",
    "count": 10
  },
  {
    "key": "locations",
    "labelDev": "१२. स्थाननिर्देशः",
    "labelEn": "Location & Placement",
    "icon": "📍",
    "count": 10
  },
  {
    "key": "adjectives",
    "labelDev": "१३. विशेषणानि",
    "labelEn": "Basic Adjectives",
    "icon": "🎨",
    "count": 10
  },
  {
    "key": "hobbies",
    "labelDev": "१४. रुचिः सामर्थ्यं च",
    "labelEn": "Hobbies & Abilities",
    "icon": "🎯",
    "count": 10
  },
  {
    "key": "rules",
    "labelDev": "१५. अनुरोधः नियमाः च",
    "labelEn": "Rules & Etiquette",
    "icon": "📜",
    "count": 10
  },
  {
    "key": "connectors",
    "labelDev": "१६. अव्ययप्रयोगाः",
    "labelEn": "Connectors & Clauses",
    "icon": "🔗",
    "count": 10
  },
  {
    "key": "wellness",
    "labelDev": "१७. स्वास्थ्यम्",
    "labelEn": "Health & Wellness",
    "icon": "🩺",
    "count": 10
  },
  {
    "key": "nature_animals",
    "labelDev": "१८. प्रकृतिः पशवः च",
    "labelEn": "Nature & Animals",
    "icon": "🦌",
    "count": 10
  },
  {
    "key": "intentions",
    "labelDev": "१९. इच्छा-भूतकालः",
    "labelEn": "Intentions & Past Forms",
    "icon": "🏹",
    "count": 10
  },
  {
    "key": "conversation",
    "labelDev": "२०. लघु सम्भाषणम्",
    "labelEn": "Spoken Sanskrit Idioms",
    "icon": "💬",
    "count": 10
  }
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

// 200 Progressive Everyday Sanskrit Sentences (Categorized into 20 thematic groups)
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
        "meaning": "हरिः",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "ॐ",
        "meaning": "ॐ",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Traditional Vedic and classical greeting / polite inquiry."
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
        "meaning": "सुप्रभातम्",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Traditional Vedic and classical greeting / polite inquiry."
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
        "meaning": "शुभरात्रिः",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Traditional Vedic and classical greeting / polite inquiry."
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
        "meaning": "धन्यवादः",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Traditional Vedic and classical greeting / polite inquiry."
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
        "meaning": "स्वागतम्",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Traditional Vedic and classical greeting / polite inquiry."
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
        "meaning": "क्षम्यताम्",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Traditional Vedic and classical greeting / polite inquiry."
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
        "roleLabel": "अव्ययम्"
      }
    ],
    "grammarNote": "Traditional Vedic and classical greeting / polite inquiry."
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
        "meaning": "Let it be",
        "role": "verb",
        "roleLabel": "अस् लोट् प्रथम०"
      }
    ],
    "grammarNote": "Traditional Vedic and classical greeting / polite inquiry."
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
        "meaning": "श्रीमन्",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Traditional Vedic and classical greeting / polite inquiry."
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
        "meaning": "मान्ये",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Traditional Vedic and classical greeting / polite inquiry."
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
        "meaning": "भवतः",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "नाम",
        "meaning": "So / Indeed",
        "role": "particle",
        "roleLabel": "अव्ययम्"
      },
      {
        "devanagari": "किम्",
        "meaning": "What?",
        "role": "adverb",
        "roleLabel": "प्रश्नवाचकम्"
      }
    ],
    "grammarNote": "Personal introductions, pronouns, and polite addresses."
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
        "meaning": "भवत्याः",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "नाम",
        "meaning": "So / Indeed",
        "role": "particle",
        "roleLabel": "अव्ययम्"
      },
      {
        "devanagari": "किम्",
        "meaning": "What?",
        "role": "adverb",
        "roleLabel": "प्रश्नवाचकम्"
      }
    ],
    "grammarNote": "Personal introductions, pronouns, and polite addresses."
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
        "meaning": "My",
        "role": "particle",
        "roleLabel": "षष्ठी-एकवचनम्"
      },
      {
        "devanagari": "नाम",
        "meaning": "So / Indeed",
        "role": "particle",
        "roleLabel": "अव्ययम्"
      },
      {
        "devanagari": "देवः",
        "meaning": "देवः",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Personal introductions, pronouns, and polite addresses."
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
        "meaning": "भवन्तः",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "के",
        "meaning": "के",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Personal introductions, pronouns, and polite addresses."
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
        "roleLabel": "अस्मद् प्रथमा"
      },
      {
        "devanagari": "छात्रः",
        "meaning": "छात्रः",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "अस्मि",
        "meaning": "am",
        "role": "verb",
        "roleLabel": "अस् लट् उत्तम०"
      }
    ],
    "grammarNote": "Personal introductions, pronouns, and polite addresses."
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
        "roleLabel": "अस्मद् प्रथमा"
      },
      {
        "devanagari": "छात्रा",
        "meaning": "छात्रा",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "अस्मि",
        "meaning": "am",
        "role": "verb",
        "roleLabel": "अस् लट् उत्तम०"
      }
    ],
    "grammarNote": "Personal introductions, pronouns, and polite addresses."
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
        "meaning": "This",
        "role": "subject",
        "roleLabel": "पुं० प्रथमा"
      },
      {
        "devanagari": "मम",
        "meaning": "My",
        "role": "particle",
        "roleLabel": "षष्ठी-एकवचनम्"
      },
      {
        "devanagari": "मित्रम्",
        "meaning": "मित्रम्",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Personal introductions, pronouns, and polite addresses."
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
        "meaning": "कः",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Personal introductions, pronouns, and polite addresses."
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
        "meaning": "का",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Personal introductions, pronouns, and polite addresses."
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
        "roleLabel": "स्थानवाचकम्"
      },
      {
        "devanagari": "असि",
        "meaning": "are",
        "role": "verb",
        "roleLabel": "अस् लट् मध्यम०"
      }
    ],
    "grammarNote": "Personal introductions, pronouns, and polite addresses."
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
        "roleLabel": "अस्मद् प्रथमा"
      },
      {
        "devanagari": "पठामि",
        "meaning": "read / study (I)",
        "role": "verb",
        "roleLabel": "पठ् लट् उत्तम०"
      }
    ],
    "grammarNote": "Present tense (लट् लकारः) matching singular and plural subjects."
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
        "meaning": "लिखसि",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Present tense (लट् लकारः) matching singular and plural subjects."
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
        "meaning": "खादति",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Present tense (लट् लकारः) matching singular and plural subjects."
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
        "meaning": "पिबति",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Present tense (लट् लकारः) matching singular and plural subjects."
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
        "meaning": "Boy",
        "role": "subject",
        "roleLabel": "पुं० प्रथमा"
      },
      {
        "devanagari": "धावति",
        "meaning": "runs",
        "role": "verb",
        "roleLabel": "धाव् लट् प्रथम०"
      }
    ],
    "grammarNote": "Present tense (लट् लकारः) matching singular and plural subjects."
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
        "meaning": "Girl",
        "role": "subject",
        "roleLabel": "स्त्री० प्रथमा"
      },
      {
        "devanagari": "हसति",
        "meaning": "हसति",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Present tense (लट् लकारः) matching singular and plural subjects."
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
        "roleLabel": "अस्मद् प्रथमा"
      },
      {
        "devanagari": "गच्छामि",
        "meaning": "go (I)",
        "role": "verb",
        "roleLabel": "गम् लट् उत्तम०"
      }
    ],
    "grammarNote": "Present tense (लट् लकारः) matching singular and plural subjects."
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
        "meaning": "come (you)",
        "role": "verb",
        "roleLabel": "आ+गम् लट् मध्यम०"
      }
    ],
    "grammarNote": "Present tense (लट् लकारः) matching singular and plural subjects."
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
        "meaning": "This",
        "role": "subject",
        "roleLabel": "पुं० प्रथमा"
      },
      {
        "devanagari": "उपविशति",
        "meaning": "sits down",
        "role": "verb",
        "roleLabel": "उप+विश् लट्"
      }
    ],
    "grammarNote": "Present tense (लट् लकारः) matching singular and plural subjects."
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
        "meaning": "उत्तिष्ठति",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Present tense (लट् लकारः) matching singular and plural subjects."
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
        "roleLabel": "अव्ययम्"
      },
      {
        "devanagari": "आगच्छ",
        "meaning": "आगच्छ",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Imperative commands and gentle instructions (लोट् लकारः)."
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
        "roleLabel": "अव्ययम्"
      },
      {
        "devanagari": "गच्छ",
        "meaning": "Go! (order)",
        "role": "verb",
        "roleLabel": "गम् लोट् मध्यम०"
      }
    ],
    "grammarNote": "Imperative commands and gentle instructions (लोट् लकारः)."
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
        "meaning": "पुस्तकम्",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "उद्घाटय",
        "meaning": "उद्घाटय",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Imperative commands and gentle instructions (लोट् लकारः)."
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
        "meaning": "मया",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "सह",
        "meaning": "सह",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "सम्भाषस्व",
        "meaning": "सम्भाषस्व",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Imperative commands and gentle instructions (लोट् लकारः)."
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
        "roleLabel": "चतुर्थी (सम्प्रदानम्)"
      },
      {
        "devanagari": "उत्तरं",
        "meaning": "उत्तरं",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "यच्छ",
        "meaning": "यच्छ",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Imperative commands and gentle instructions (लोट् लकारः)."
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
        "meaning": "उच्चैः",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "वद",
        "meaning": "Speak! (order)",
        "role": "verb",
        "roleLabel": "वद् लोट् मध्यम०"
      }
    ],
    "grammarNote": "Imperative commands and gentle instructions (लोट् लकारः)."
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
        "meaning": "मां",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "मा",
        "meaning": "Do not",
        "role": "particle",
        "roleLabel": "निषेधार्थक-अव्ययम्"
      },
      {
        "devanagari": "विस्मर",
        "meaning": "विस्मर",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Imperative commands and gentle instructions (लोट् लकारः)."
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
        "meaning": "ध्यानं",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "ददातु",
        "meaning": "ददातु",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Imperative commands and gentle instructions (लोट् लकारः)."
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
        "meaning": "Picture / Art",
        "role": "subject",
        "roleLabel": "नपुंसक प्रथमा"
      },
      {
        "devanagari": "पश्य",
        "meaning": "पश्य",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Imperative commands and gentle instructions (लोट् लकारः)."
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
        "meaning": "इदानीं",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "लिखतु",
        "meaning": "लिखतु",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Imperative commands and gentle instructions (लोट् लकारः)."
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
        "roleLabel": "प्रथमा (एतद्)"
      },
      {
        "devanagari": "मम",
        "meaning": "My",
        "role": "particle",
        "roleLabel": "षष्ठी-एकवचनम्"
      },
      {
        "devanagari": "गृहम्",
        "meaning": "गृहम्",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Genitive case (षष्ठी विभक्तिः) showing possession, family, and origin."
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
        "meaning": "My",
        "role": "particle",
        "roleLabel": "षष्ठी-एकवचनम्"
      },
      {
        "devanagari": "माता",
        "meaning": "Mother",
        "role": "subject",
        "roleLabel": "मातृ प्रथमा"
      },
      {
        "devanagari": "अस्ति",
        "meaning": "is / exists",
        "role": "verb",
        "roleLabel": "अस् लट् प्रथम०"
      }
    ],
    "grammarNote": "Genitive case (षष्ठी विभक्तिः) showing possession, family, and origin."
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
        "meaning": "तव",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "भ्राता",
        "meaning": "Brother",
        "role": "subject",
        "roleLabel": "भ्रातृ प्रथमा"
      },
      {
        "devanagari": "कुत्र",
        "meaning": "Where?",
        "role": "adverb",
        "roleLabel": "स्थानवाचकम्"
      }
    ],
    "grammarNote": "Genitive case (षष्ठी विभक्तिः) showing possession, family, and origin."
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
        "roleLabel": "स्त्री० प्रथमा"
      },
      {
        "devanagari": "मम",
        "meaning": "My",
        "role": "particle",
        "roleLabel": "षष्ठी-एकवचनम्"
      },
      {
        "devanagari": "भगिनी",
        "meaning": "Sister",
        "role": "subject",
        "roleLabel": "स्त्री० प्रथमा"
      }
    ],
    "grammarNote": "Genitive case (षष्ठी विभक्तिः) showing possession, family, and origin."
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
        "roleLabel": "षष्ठी-एकवचनम्"
      },
      {
        "devanagari": "पिता",
        "meaning": "पिता",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "वैद्यः",
        "meaning": "वैद्यः",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Genitive case (षष्ठी विभक्तिः) showing possession, family, and origin."
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
        "meaning": "तस्याः",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "गृहं",
        "meaning": "Home / House",
        "role": "object",
        "roleLabel": "कर्म (द्वितीया)"
      },
      {
        "devanagari": "विशालम्",
        "meaning": "विशालम्",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Genitive case (षष्ठी विभक्तिः) showing possession, family, and origin."
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
        "meaning": "तव",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "पुस्तकम्",
        "meaning": "पुस्तकम्",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Genitive case (षष्ठी विभक्तिः) showing possession, family, and origin."
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
        "meaning": "वृक्षस्य",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "फलानि",
        "meaning": "फलानि",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "सन्ति",
        "meaning": "are (plural)",
        "role": "verb",
        "roleLabel": "अस् लट् बहु०"
      }
    ],
    "grammarNote": "Genitive case (षष्ठी विभक्तिः) showing possession, family, and origin."
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
        "roleLabel": "षष्ठी (नदी)"
      },
      {
        "devanagari": "जलं",
        "meaning": "Water",
        "role": "subject",
        "roleLabel": "नपुंसक प्रथमा"
      },
      {
        "devanagari": "शीतलम्",
        "meaning": "शीतलम्",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Genitive case (षष्ठी विभक्तिः) showing possession, family, and origin."
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
        "roleLabel": "अस्मद् प्रथमा"
      },
      {
        "devanagari": "भवता",
        "meaning": "भवता",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "सह",
        "meaning": "सह",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "अस्मि",
        "meaning": "am",
        "role": "verb",
        "roleLabel": "अस् लट् उत्तम०"
      }
    ],
    "grammarNote": "Genitive case (षष्ठी विभक्तिः) showing possession, family, and origin."
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
        "meaning": "इदानीं",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "कः",
        "meaning": "कः",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "समयः",
        "meaning": "समयः",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Time, days of the week, and nature/weather descriptions."
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
        "meaning": "अद्य",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "रविवासरः",
        "meaning": "रविवासरः",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "अस्ति",
        "meaning": "is / exists",
        "role": "verb",
        "roleLabel": "अस् लट् प्रथम०"
      }
    ],
    "grammarNote": "Time, days of the week, and nature/weather descriptions."
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
        "roleLabel": "अव्ययम्"
      },
      {
        "devanagari": "सोमवासरः",
        "meaning": "सोमवासरः",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Time, days of the week, and nature/weather descriptions."
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
        "meaning": "ह्यः",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "शनिवासरः",
        "meaning": "शनिवासरः",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "आसीत्",
        "meaning": "had / was",
        "role": "verb",
        "roleLabel": "अस् लङ् लकारः"
      }
    ],
    "grammarNote": "Time, days of the week, and nature/weather descriptions."
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
        "meaning": "अद्य",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "सूर्यः",
        "meaning": "सूर्यः",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "प्रखरः",
        "meaning": "प्रखरः",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "अस्ति",
        "meaning": "is / exists",
        "role": "verb",
        "roleLabel": "अस् लट् प्रथम०"
      }
    ],
    "grammarNote": "Time, days of the week, and nature/weather descriptions."
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
        "meaning": "मेघः",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "वर्षति",
        "meaning": "वर्षति",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Time, days of the week, and nature/weather descriptions."
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
        "meaning": "शीतलः",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "वायुः",
        "meaning": "Air / Wind",
        "role": "subject",
        "roleLabel": "पुं० प्रथमा"
      },
      {
        "devanagari": "वहति",
        "meaning": "वहति",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Time, days of the week, and nature/weather descriptions."
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
        "meaning": "अद्य",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "शैत्यम्",
        "meaning": "शैत्यम्",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "अस्ति",
        "meaning": "is / exists",
        "role": "verb",
        "roleLabel": "अस् लट् प्रथम०"
      }
    ],
    "grammarNote": "Time, days of the week, and nature/weather descriptions."
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
        "meaning": "सायङ्कालः",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "अभवत्",
        "meaning": "अभवत्",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Time, days of the week, and nature/weather descriptions."
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
        "meaning": "कदा",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "गमिष्यसि",
        "meaning": "गमिष्यसि",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Time, days of the week, and nature/weather descriptions."
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
        "meaning": "Meal",
        "role": "object",
        "roleLabel": "कर्म (द्वितीया)"
      },
      {
        "devanagari": "सिद्धं",
        "meaning": "सिद्धं",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "किम्",
        "meaning": "What?",
        "role": "adverb",
        "roleLabel": "प्रश्नवाचकम्"
      }
    ],
    "grammarNote": "Dining expressions and dative construction with रोचते (appeals to me)."
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
        "roleLabel": "अस्मद् प्रथमा"
      },
      {
        "devanagari": "बुभुक्षितः",
        "meaning": "बुभुक्षितः",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "अस्मि",
        "meaning": "am",
        "role": "verb",
        "roleLabel": "अस् लट् उत्तम०"
      }
    ],
    "grammarNote": "Dining expressions and dative construction with रोचते (appeals to me)."
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
        "meaning": "Meal",
        "role": "object",
        "roleLabel": "कर्म (द्वितीया)"
      },
      {
        "devanagari": "कृतवती",
        "meaning": "कृतवती",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "किम्",
        "meaning": "What?",
        "role": "adverb",
        "roleLabel": "प्रश्नवाचकम्"
      }
    ],
    "grammarNote": "Dining expressions and dative construction with रोचते (appeals to me)."
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
        "roleLabel": "चतुर्थी (सम्प्रदानम्)"
      },
      {
        "devanagari": "ओदनं",
        "meaning": "ओदनं",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "रोचते",
        "meaning": "appeals / pleases",
        "role": "verb",
        "roleLabel": "रुच् लट् आत्मनेपदम्"
      }
    ],
    "grammarNote": "Dining expressions and dative construction with रोचते (appeals to me)."
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
        "roleLabel": "नपुंसक प्रथमा"
      },
      {
        "devanagari": "ददातु",
        "meaning": "ददातु",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Dining expressions and dative construction with रोचते (appeals to me)."
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
        "role": "object",
        "roleLabel": "कर्म (द्वितीया)"
      },
      {
        "devanagari": "मधुरं",
        "meaning": "Sweetly",
        "role": "adverb",
        "roleLabel": "क्रियाविशेषणम्"
      },
      {
        "devanagari": "भवति",
        "meaning": "occurs / happens",
        "role": "verb",
        "roleLabel": "भू लट् प्रथम०"
      }
    ],
    "grammarNote": "Dining expressions and dative construction with रोचते (appeals to me)."
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
        "meaning": "फलानि",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "स्वास्थ्यकराणि",
        "meaning": "स्वास्थ्यकराणि",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Dining expressions and dative construction with रोचते (appeals to me)."
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
        "meaning": "अल्पाहारः",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "लवणयुक्तः",
        "meaning": "लवणयुक्तः",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "अस्ति",
        "meaning": "is / exists",
        "role": "verb",
        "roleLabel": "अस् लट् प्रथम०"
      }
    ],
    "grammarNote": "Dining expressions and dative construction with रोचते (appeals to me)."
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
        "roleLabel": "अस्मद् प्रथमा"
      },
      {
        "devanagari": "चायं",
        "meaning": "चायं",
        "role": "particle",
        "roleLabel": "पदम्"
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
    "grammarNote": "Dining expressions and dative construction with रोचते (appeals to me)."
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
        "meaning": "कुर्वती",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "असि",
        "meaning": "are",
        "role": "verb",
        "roleLabel": "अस् लट् मध्यम०"
      }
    ],
    "grammarNote": "Dining expressions and dative construction with रोचते (appeals to me)."
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
        "roleLabel": "पुं० प्रथमा"
      },
      {
        "devanagari": "श्वः",
        "meaning": "Tomorrow",
        "role": "adverb",
        "roleLabel": "अव्ययम्"
      },
      {
        "devanagari": "आगमिष्यति",
        "meaning": "आगमिष्यति",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Past active participles (-क्तवतु) and simple future tense (लृट् लकारः)."
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
        "roleLabel": "अस्मद् प्रथमा"
      },
      {
        "devanagari": "पाठं",
        "meaning": "पाठं",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "पठितवान्",
        "meaning": "पठितवान्",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Past active participles (-क्तवतु) and simple future tense (लृट् लकारः)."
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
        "meaning": "कृतवती",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Past active participles (-क्तवतु) and simple future tense (लृट् लकारः)."
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
        "meaning": "They",
        "role": "subject",
        "roleLabel": "तद् पुं० बहु०"
      },
      {
        "devanagari": "क्रीडाङ्गणं",
        "meaning": "क्रीडाङ्गणं",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "गतवन्तः",
        "meaning": "गतवन्तः",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Past active participles (-क्तवतु) and simple future tense (लृट् लकारः)."
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
        "meaning": "We",
        "role": "subject",
        "roleLabel": "अस्मद् प्रथमा बहु०"
      },
      {
        "devanagari": "चित्रपटं",
        "meaning": "चित्रपटं",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "द्रक्ष्यामः",
        "meaning": "द्रक्ष्यामः",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Past active participles (-क्तवतु) and simple future tense (लृट् लकारः)."
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
        "roleLabel": "स्थानवाचकम्"
      },
      {
        "devanagari": "आसीः",
        "meaning": "आसीः",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Past active participles (-क्तवतु) and simple future tense (लृट् लकारः)."
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
        "meaning": "गुरुः",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "ज्ञानं",
        "meaning": "ज्ञानं",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "दत्तवान्",
        "meaning": "दत्तवान्",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Past active participles (-क्तवतु) and simple future tense (लृट् लकारः)."
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
        "roleLabel": "अस्मद् प्रथमा"
      },
      {
        "devanagari": "धनं",
        "meaning": "Money / Wealth",
        "role": "subject",
        "roleLabel": "नपुंसक प्रथमा"
      },
      {
        "devanagari": "दास्यामि",
        "meaning": "दास्यामि",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Past active participles (-क्तवतु) and simple future tense (लृट् लकारः)."
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
        "meaning": "हसितवान्",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Past active participles (-क्तवतु) and simple future tense (लृट् लकारः)."
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
        "meaning": "वृक्षात्",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "पत्रं",
        "meaning": "पत्रं",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "अपतत्",
        "meaning": "अपतत्",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Past active participles (-क्तवतु) and simple future tense (लृट् लकारः)."
  },
  {
    "id": "s-81",
    "num": 81,
    "sanskrit": "बालकौ क्रीडतः।",
    "transliteration": "Bālakau krīḍataḥ.",
    "english": "Two boys are playing.",
    "category": "plurals",
    "categoryLabel": "९. द्विवचन-बहुवचनम्",
    "categoryEn": "Duals & Plurals",
    "levelBadge": "Numbers & Agreement",
    "words": [
      {
        "devanagari": "बालकौ",
        "meaning": "बालकौ",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "क्रीडतः",
        "meaning": "क्रीडतः",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Dual forms (द्विवचनम्) and plural agreements in actions."
  },
  {
    "id": "s-82",
    "num": 82,
    "sanskrit": "कन्ये नृत्यताः।",
    "transliteration": "Kanye nṛtyataḥ.",
    "english": "Two girls are dancing.",
    "category": "plurals",
    "categoryLabel": "९. द्विवचन-बहुवचनम्",
    "categoryEn": "Duals & Plurals",
    "levelBadge": "Numbers & Agreement",
    "words": [
      {
        "devanagari": "कन्ये",
        "meaning": "कन्ये",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "नृत्यताः",
        "meaning": "नृत्यताः",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Dual forms (द्विवचनम्) and plural agreements in actions."
  },
  {
    "id": "s-83",
    "num": 83,
    "sanskrit": "अहं द्वे पुस्तके पठामि।",
    "transliteration": "Ahaṁ dve pustake paṭhāmi.",
    "english": "I am reading two books.",
    "category": "plurals",
    "categoryLabel": "९. द्विवचन-बहुवचनम्",
    "categoryEn": "Duals & Plurals",
    "levelBadge": "Numbers & Agreement",
    "words": [
      {
        "devanagari": "अहं",
        "meaning": "I",
        "role": "subject",
        "roleLabel": "अस्मद् प्रथमा"
      },
      {
        "devanagari": "द्वे",
        "meaning": "द्वे",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "पुस्तके",
        "meaning": "पुस्तके",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "पठामि",
        "meaning": "read / study (I)",
        "role": "verb",
        "roleLabel": "पठ् लट् उत्तम०"
      }
    ],
    "grammarNote": "Dual forms (द्विवचनम्) and plural agreements in actions."
  },
  {
    "id": "s-84",
    "num": 84,
    "sanskrit": "छात्राः प्रश्नं पृच्छन्ति।",
    "transliteration": "Chātrāḥ praśnaṁ pṛcchanti.",
    "english": "The students are asking questions.",
    "category": "plurals",
    "categoryLabel": "९. द्विवचन-बहुवचनम्",
    "categoryEn": "Duals & Plurals",
    "levelBadge": "Numbers & Agreement",
    "words": [
      {
        "devanagari": "छात्राः",
        "meaning": "छात्राः",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "प्रश्नं",
        "meaning": "प्रश्नं",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "पृच्छन्ति",
        "meaning": "पृच्छन्ति",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Dual forms (द्विवचनम्) and plural agreements in actions."
  },
  {
    "id": "s-85",
    "num": 85,
    "sanskrit": "वयं भारते वसामः।",
    "transliteration": "Vayaṁ bhārate vasāmaḥ.",
    "english": "We live in India.",
    "category": "plurals",
    "categoryLabel": "९. द्विवचन-बहुवचनम्",
    "categoryEn": "Duals & Plurals",
    "levelBadge": "Numbers & Agreement",
    "words": [
      {
        "devanagari": "वयं",
        "meaning": "We",
        "role": "subject",
        "roleLabel": "अस्मद् प्रथमा बहु०"
      },
      {
        "devanagari": "भारते",
        "meaning": "भारते",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "वसामः",
        "meaning": "वसामः",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Dual forms (द्विवचनम्) and plural agreements in actions."
  },
  {
    "id": "s-86",
    "num": 86,
    "sanskrit": "पुष्पाणि विकसन्ति।",
    "transliteration": "Puṣpāni vikasanti.",
    "english": "The flowers are blooming.",
    "category": "plurals",
    "categoryLabel": "९. द्विवचन-बहुवचनम्",
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
        "meaning": "विकसन्ति",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Dual forms (द्विवचनम्) and plural agreements in actions."
  },
  {
    "id": "s-87",
    "num": 87,
    "sanskrit": "यूयं कुत्र गच्छथ?",
    "transliteration": "Yūyaṁ kutra gacchatha?",
    "english": "Where are you all going?",
    "category": "plurals",
    "categoryLabel": "९. द्विवचन-बहुवचनम्",
    "categoryEn": "Duals & Plurals",
    "levelBadge": "Numbers & Agreement",
    "words": [
      {
        "devanagari": "यूयं",
        "meaning": "You all",
        "role": "subject",
        "roleLabel": "युष्मद् बहुवचनम्"
      },
      {
        "devanagari": "कुत्र",
        "meaning": "Where?",
        "role": "adverb",
        "roleLabel": "स्थानवाचकम्"
      },
      {
        "devanagari": "गच्छथ",
        "meaning": "गच्छथ",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Dual forms (द्विवचनम्) and plural agreements in actions."
  },
  {
    "id": "s-88",
    "num": 88,
    "sanskrit": "खगाः आकाशे उड्डयन्ते।",
    "transliteration": "Khagāḥ ākāśe uḍḍayante.",
    "english": "Birds fly in the sky.",
    "category": "plurals",
    "categoryLabel": "९. द्विवचन-बहुवचनम्",
    "categoryEn": "Duals & Plurals",
    "levelBadge": "Numbers & Agreement",
    "words": [
      {
        "devanagari": "खगाः",
        "meaning": "Birds (plural)",
        "role": "subject",
        "roleLabel": "पुं० बहुवचनम्"
      },
      {
        "devanagari": "आकाशे",
        "meaning": "In the sky",
        "role": "adverb",
        "roleLabel": "सप्तमी (आकाश)"
      },
      {
        "devanagari": "उड्डयन्ते",
        "meaning": "उड्डयन्ते",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Dual forms (द्विवचनम्) and plural agreements in actions."
  },
  {
    "id": "s-89",
    "num": 89,
    "sanskrit": "अश्वाः वेगेन धावन्ति।",
    "transliteration": "Aśvāḥ vegena dhāvanti.",
    "english": "The horses run fast.",
    "category": "plurals",
    "categoryLabel": "९. द्विवचन-बहुवचनम्",
    "categoryEn": "Duals & Plurals",
    "levelBadge": "Numbers & Agreement",
    "words": [
      {
        "devanagari": "अश्वाः",
        "meaning": "अश्वाः",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "वेगेन",
        "meaning": "Fast / With speed",
        "role": "adverb",
        "roleLabel": "तृतीया (क्रियाविशेषणम्)"
      },
      {
        "devanagari": "धावन्ति",
        "meaning": "धावन्ति",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Dual forms (द्विवचनम्) and plural agreements in actions."
  },
  {
    "id": "s-90",
    "num": 90,
    "sanskrit": "ते मन्दं चलन्ति।",
    "transliteration": "Te mandaṁ calanti.",
    "english": "They walk slowly.",
    "category": "plurals",
    "categoryLabel": "९. द्विवचन-बहुवचनम्",
    "categoryEn": "Duals & Plurals",
    "levelBadge": "Numbers & Agreement",
    "words": [
      {
        "devanagari": "ते",
        "meaning": "They",
        "role": "subject",
        "roleLabel": "तद् पुं० बहु०"
      },
      {
        "devanagari": "मन्दं",
        "meaning": "Slowly",
        "role": "adverb",
        "roleLabel": "क्रियाविशेषणम्"
      },
      {
        "devanagari": "चलन्ति",
        "meaning": "चलन्ति",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Dual forms (द्विवचनम्) and plural agreements in actions."
  },
  {
    "id": "s-91",
    "num": 91,
    "sanskrit": "सत्यं वद, धर्मं चर।",
    "transliteration": "Satyaṁ vada, dharmaṁ cara.",
    "english": "Speak the truth. Live with integrity.",
    "category": "wisdom",
    "categoryLabel": "१०. सुभाषितानि",
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
        "meaning": "धर्मं",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "चर",
        "meaning": "चर",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Timeless Subhashita wisdom, ethics, and cultural maxims."
  },
  {
    "id": "s-92",
    "num": 92,
    "sanskrit": "विद्वान् सर्वत्र पूज्यते।",
    "transliteration": "Vidvān sarvatra pūjyate.",
    "english": "A scholar is worshipped everywhere.",
    "category": "wisdom",
    "categoryLabel": "१०. सुभाषितानि",
    "categoryEn": "Proverbs & Wisdom",
    "levelBadge": "Timeless Wisdom",
    "words": [
      {
        "devanagari": "विद्वान्",
        "meaning": "विद्वान्",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "सर्वत्र",
        "meaning": "सर्वत्र",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "पूज्यते",
        "meaning": "पूज्यते",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Timeless Subhashita wisdom, ethics, and cultural maxims."
  },
  {
    "id": "s-93",
    "num": 93,
    "sanskrit": "लोभात् पापं प्रजायते।",
    "transliteration": "Lobhāt pāpaṁ prajāyate.",
    "english": "Greed gives rise to sin.",
    "category": "wisdom",
    "categoryLabel": "१०. सुभाषितानि",
    "categoryEn": "Proverbs & Wisdom",
    "levelBadge": "Timeless Wisdom",
    "words": [
      {
        "devanagari": "लोभात्",
        "meaning": "लोभात्",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "पापं",
        "meaning": "पापं",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "प्रजायते",
        "meaning": "प्रजायते",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Timeless Subhashita wisdom, ethics, and cultural maxims."
  },
  {
    "id": "s-94",
    "num": 94,
    "sanskrit": "त्वं मम आनन्दः असि।",
    "transliteration": "Tvaṁ mama ānandaḥ asi.",
    "english": "You are my happiness.",
    "category": "wisdom",
    "categoryLabel": "१०. सुभाषितानि",
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
        "meaning": "My",
        "role": "particle",
        "roleLabel": "षष्ठी-एकवचनम्"
      },
      {
        "devanagari": "आनन्दः",
        "meaning": "आनन्दः",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "असि",
        "meaning": "are",
        "role": "verb",
        "roleLabel": "अस् लट् मध्यम०"
      }
    ],
    "grammarNote": "Timeless Subhashita wisdom, ethics, and cultural maxims."
  },
  {
    "id": "s-95",
    "num": 95,
    "sanskrit": "कालः सर्वं विरोपयति।",
    "transliteration": "Kālaḥ sarvaṁ viropayati.",
    "english": "Time heals all wounds.",
    "category": "wisdom",
    "categoryLabel": "१०. सुभाषितानि",
    "categoryEn": "Proverbs & Wisdom",
    "levelBadge": "Timeless Wisdom",
    "words": [
      {
        "devanagari": "कालः",
        "meaning": "कालः",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "सर्वं",
        "meaning": "All / Everything",
        "role": "subject",
        "roleLabel": "नपुंसक प्रथमा"
      },
      {
        "devanagari": "विरोपयति",
        "meaning": "विरोपयति",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Timeless Subhashita wisdom, ethics, and cultural maxims."
  },
  {
    "id": "s-96",
    "num": 96,
    "sanskrit": "एतदपि गमिष्यति।",
    "transliteration": "Etadapi gamiṣyati.",
    "english": "This, too, shall pass.",
    "category": "wisdom",
    "categoryLabel": "१०. सुभाषितानि",
    "categoryEn": "Proverbs & Wisdom",
    "levelBadge": "Timeless Wisdom",
    "words": [
      {
        "devanagari": "एतदपि",
        "meaning": "एतदपि",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "गमिष्यति",
        "meaning": "गमिष्यति",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Timeless Subhashita wisdom, ethics, and cultural maxims."
  },
  {
    "id": "s-97",
    "num": 97,
    "sanskrit": "रामो बलवान् अस्ति।",
    "transliteration": "Rāmo balavān asti.",
    "english": "Rama is strong.",
    "category": "wisdom",
    "categoryLabel": "१०. सुभाषितानि",
    "categoryEn": "Proverbs & Wisdom",
    "levelBadge": "Timeless Wisdom",
    "words": [
      {
        "devanagari": "रामो",
        "meaning": "रामो",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "बलवान्",
        "meaning": "बलवान्",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "अस्ति",
        "meaning": "is / exists",
        "role": "verb",
        "roleLabel": "अस् लट् प्रथम०"
      }
    ],
    "grammarNote": "Timeless Subhashita wisdom, ethics, and cultural maxims."
  },
  {
    "id": "s-98",
    "num": 98,
    "sanskrit": "सत्यमेव जयते।",
    "transliteration": "Satyameva jayate.",
    "english": "Truth alone triumphs.",
    "category": "wisdom",
    "categoryLabel": "१०. सुभाषितानि",
    "categoryEn": "Proverbs & Wisdom",
    "levelBadge": "Timeless Wisdom",
    "words": [
      {
        "devanagari": "सत्यमेव",
        "meaning": "सत्यमेव",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "जयते",
        "meaning": "जयते",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Timeless Subhashita wisdom, ethics, and cultural maxims."
  },
  {
    "id": "s-99",
    "num": 99,
    "sanskrit": "ज्ञानं परमं भूषणम्।",
    "transliteration": "Jñānaṁ paramaṁ bhūṣaṇam.",
    "english": "Knowledge is the highest ornament.",
    "category": "wisdom",
    "categoryLabel": "१०. सुभाषितानि",
    "categoryEn": "Proverbs & Wisdom",
    "levelBadge": "Timeless Wisdom",
    "words": [
      {
        "devanagari": "ज्ञानं",
        "meaning": "ज्ञानं",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "परमं",
        "meaning": "Supreme / Ultimate",
        "role": "adjective",
        "roleLabel": "विशेषणम्"
      },
      {
        "devanagari": "भूषणम्",
        "meaning": "भूषणम्",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Timeless Subhashita wisdom, ethics, and cultural maxims."
  },
  {
    "id": "s-100",
    "num": 100,
    "sanskrit": "अहं संस्कृतं वदामि।",
    "transliteration": "Ahaṁ saṁskṛtaṁ vadāmi.",
    "english": "I speak Sanskrit.",
    "category": "wisdom",
    "categoryLabel": "१०. सुभाषितानि",
    "categoryEn": "Proverbs & Wisdom",
    "levelBadge": "Timeless Wisdom",
    "words": [
      {
        "devanagari": "अहं",
        "meaning": "I",
        "role": "subject",
        "roleLabel": "अस्मद् प्रथमा"
      },
      {
        "devanagari": "संस्कृतं",
        "meaning": "Sanskrit",
        "role": "object",
        "roleLabel": "कर्म (द्वितीया)"
      },
      {
        "devanagari": "वदामि",
        "meaning": "वदामि",
        "role": "particle",
        "roleLabel": "पदम्"
      }
    ],
    "grammarNote": "Timeless Subhashita wisdom, ethics, and cultural maxims."
  },
  {
    "id": "s-101",
    "num": 101,
    "sanskrit": "एतत् किम् अस्ति?",
    "transliteration": "Etat kim asti?",
    "english": "What is this?",
    "category": "questions",
    "categoryLabel": "११. प्रश्नोत्तराणि",
    "categoryEn": "Questions & Inquiries",
    "levelBadge": "Questions",
    "words": [
      {
        "devanagari": "एतत्",
        "meaning": "This (neuter)",
        "role": "subject",
        "roleLabel": "प्रथमा (एतद्)"
      },
      {
        "devanagari": "किम्",
        "meaning": "What?",
        "role": "adverb",
        "roleLabel": "प्रश्नवाचकम्"
      },
      {
        "devanagari": "अस्ति",
        "meaning": "is / exists",
        "role": "verb",
        "roleLabel": "अस् लट् प्रथम०"
      }
    ],
    "grammarNote": "Interrogative sentences using कः/का/किम्, कुत्र, किमर्थम्, and कथम्."
  },
  {
    "id": "s-102",
    "num": 102,
    "sanskrit": "भवान् कथम् अस्ति?",
    "transliteration": "Bhavān katham asti?",
    "english": "How are you? (to a male)",
    "category": "questions",
    "categoryLabel": "११. प्रश्नोत्तराणि",
    "categoryEn": "Questions & Inquiries",
    "levelBadge": "Questions",
    "words": [
      {
        "devanagari": "भवान्",
        "meaning": "You (male respectful)",
        "role": "subject",
        "roleLabel": "भवत् पुं० प्रथमा"
      },
      {
        "devanagari": "कथम्",
        "meaning": "How?",
        "role": "adverb",
        "roleLabel": "प्रश्नवाचकम्"
      },
      {
        "devanagari": "अस्ति",
        "meaning": "is / exists",
        "role": "verb",
        "roleLabel": "अस् लट् प्रथम०"
      }
    ],
    "grammarNote": "Interrogative sentences using कः/का/किम्, कुत्र, किमर्थम्, and कथम्."
  },
  {
    "id": "s-103",
    "num": 103,
    "sanskrit": "भवती कथम् अस्ति?",
    "transliteration": "Bhavatī katham asti?",
    "english": "How are you? (to a female)",
    "category": "questions",
    "categoryLabel": "११. प्रश्नोत्तराणि",
    "categoryEn": "Questions & Inquiries",
    "levelBadge": "Questions",
    "words": [
      {
        "devanagari": "भवती",
        "meaning": "You (female respectful)",
        "role": "subject",
        "roleLabel": "भवत् स्त्री० प्रथमा"
      },
      {
        "devanagari": "कथम्",
        "meaning": "How?",
        "role": "adverb",
        "roleLabel": "प्रश्नवाचकम्"
      },
      {
        "devanagari": "अस्ति",
        "meaning": "is / exists",
        "role": "verb",
        "roleLabel": "अस् लट् प्रथम०"
      }
    ],
    "grammarNote": "Interrogative sentences using कः/का/किम्, कुत्र, किमर्थम्, and कथम्."
  },
  {
    "id": "s-104",
    "num": 104,
    "sanskrit": "किं कष्टम् अस्ति?",
    "transliteration": "Kiṁ kaṣṭam asti?",
    "english": "Is it difficult?",
    "category": "questions",
    "categoryLabel": "११. प्रश्नोत्तराणि",
    "categoryEn": "Questions & Inquiries",
    "levelBadge": "Questions",
    "words": [
      {
        "devanagari": "किं",
        "meaning": "किं",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "कष्टम्",
        "meaning": "Difficult / Trouble",
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
    "grammarNote": "Interrogative sentences using कः/का/किम्, कुत्र, किमर्थम्, and कथम्."
  },
  {
    "id": "s-105",
    "num": 105,
    "sanskrit": "मार्गः कुत्र अस्ति?",
    "transliteration": "Mārgaḥ kutra asti?",
    "english": "Where is the way/road?",
    "category": "questions",
    "categoryLabel": "११. प्रश्नोत्तराणि",
    "categoryEn": "Questions & Inquiries",
    "levelBadge": "Questions",
    "words": [
      {
        "devanagari": "मार्गः",
        "meaning": "Way / Path / Road",
        "role": "subject",
        "roleLabel": "पुं० प्रथमा-एक०"
      },
      {
        "devanagari": "कुत्र",
        "meaning": "Where?",
        "role": "adverb",
        "roleLabel": "स्थानवाचकम्"
      },
      {
        "devanagari": "अस्ति",
        "meaning": "is / exists",
        "role": "verb",
        "roleLabel": "अस् लट् प्रथम०"
      }
    ],
    "grammarNote": "Interrogative sentences using कः/का/किम्, कुत्र, किमर्थम्, and कथम्."
  },
  {
    "id": "s-106",
    "num": 106,
    "sanskrit": "त्वं किमर्थं हससि?",
    "transliteration": "Tvaṁ kimarthaṁ hasasi?",
    "english": "Why are you laughing?",
    "category": "questions",
    "categoryLabel": "११. प्रश्नोत्तराणि",
    "categoryEn": "Questions & Inquiries",
    "levelBadge": "Questions",
    "words": [
      {
        "devanagari": "त्वं",
        "meaning": "You",
        "role": "subject",
        "roleLabel": "युष्मद् प्रथमा"
      },
      {
        "devanagari": "किमर्थं",
        "meaning": "Why? / What for?",
        "role": "adverb",
        "roleLabel": "कारणवाचकम्"
      },
      {
        "devanagari": "हससि",
        "meaning": "laugh (you)",
        "role": "verb",
        "roleLabel": "हस् लट् मध्यम०"
      }
    ],
    "grammarNote": "Interrogative sentences using कः/का/किम्, कुत्र, किमर्थम्, and कथम्."
  },
  {
    "id": "s-107",
    "num": 107,
    "sanskrit": "सः कस्य भ्राता?",
    "transliteration": "Saḥ kasya bhrātā?",
    "english": "Whose brother is he?",
    "category": "questions",
    "categoryLabel": "११. प्रश्नोत्तराणि",
    "categoryEn": "Questions & Inquiries",
    "levelBadge": "Questions",
    "words": [
      {
        "devanagari": "सः",
        "meaning": "He",
        "role": "subject",
        "roleLabel": "तद् पुं० प्रथमा"
      },
      {
        "devanagari": "कस्य",
        "meaning": "Whose?",
        "role": "particle",
        "roleLabel": "किम् षष्ठी-एक०"
      },
      {
        "devanagari": "भ्राता",
        "meaning": "Brother",
        "role": "subject",
        "roleLabel": "भ्रातृ प्रथमा"
      }
    ],
    "grammarNote": "Interrogative sentences using कः/का/किम्, कुत्र, किमर्थम्, and कथम्."
  },
  {
    "id": "s-108",
    "num": 108,
    "sanskrit": "सा कस्य भगिनी?",
    "transliteration": "Sā kasya bhaginī?",
    "english": "Whose sister is she?",
    "category": "questions",
    "categoryLabel": "११. प्रश्नोत्तराणि",
    "categoryEn": "Questions & Inquiries",
    "levelBadge": "Questions",
    "words": [
      {
        "devanagari": "सा",
        "meaning": "She",
        "role": "subject",
        "roleLabel": "तद् स्त्री० प्रथमा"
      },
      {
        "devanagari": "कस्य",
        "meaning": "Whose?",
        "role": "particle",
        "roleLabel": "किम् षष्ठी-एक०"
      },
      {
        "devanagari": "भगिनी",
        "meaning": "Sister",
        "role": "subject",
        "roleLabel": "स्त्री० प्रथमा"
      }
    ],
    "grammarNote": "Interrogative sentences using कः/का/किम्, कुत्र, किमर्थम्, and कथम्."
  },
  {
    "id": "s-109",
    "num": 109,
    "sanskrit": "अस्य मूल्यं किम्?",
    "transliteration": "Asya mūlyaṁ kim?",
    "english": "What is its price?",
    "category": "questions",
    "categoryLabel": "११. प्रश्नोत्तराणि",
    "categoryEn": "Questions & Inquiries",
    "levelBadge": "Questions",
    "words": [
      {
        "devanagari": "अस्य",
        "meaning": "Of this / Its",
        "role": "particle",
        "roleLabel": "इदम् षष्ठी-एक०"
      },
      {
        "devanagari": "मूल्यं",
        "meaning": "Price / Cost / Value",
        "role": "subject",
        "roleLabel": "नपुंसक प्रथमा"
      },
      {
        "devanagari": "किम्",
        "meaning": "What?",
        "role": "adverb",
        "roleLabel": "प्रश्नवाचकम्"
      }
    ],
    "grammarNote": "Interrogative sentences using कः/का/किम्, कुत्र, किमर्थम्, and कथम्."
  },
  {
    "id": "s-110",
    "num": 110,
    "sanskrit": "पुनः वदतु कृपया।",
    "transliteration": "Punaḥ vadatu kṛpayā.",
    "english": "Please say it again.",
    "category": "questions",
    "categoryLabel": "११. प्रश्नोत्तराणि",
    "categoryEn": "Questions & Inquiries",
    "levelBadge": "Questions",
    "words": [
      {
        "devanagari": "पुनः",
        "meaning": "Again",
        "role": "adverb",
        "roleLabel": "अव्ययम्"
      },
      {
        "devanagari": "वदतु",
        "meaning": "Please say / speak",
        "role": "verb",
        "roleLabel": "वद् लोट् प्रथम०"
      },
      {
        "devanagari": "कृपया",
        "meaning": "Please / Kindly",
        "role": "adverb",
        "roleLabel": "अव्ययम्"
      }
    ],
    "grammarNote": "Interrogative sentences using कः/का/किम्, कुत्र, किमर्थम्, and कथम्."
  },
  {
    "id": "s-111",
    "num": 111,
    "sanskrit": "उत्पीठिकायां पुस्तकं वर्तते।",
    "transliteration": "Utpīṭhikāyām pustakaṁ vartate.",
    "english": "The book is on the table.",
    "category": "locations",
    "categoryLabel": "१२. स्थाननिर्देशः",
    "categoryEn": "Location & Placement",
    "levelBadge": "Spatial & Cases",
    "words": [
      {
        "devanagari": "उत्पीठिकायां",
        "meaning": "On the table",
        "role": "adverb",
        "roleLabel": "सप्तमी (उत्पीठिका)"
      },
      {
        "devanagari": "पुस्तकं",
        "meaning": "Book",
        "role": "subject",
        "roleLabel": "नपुंसक प्रथमा"
      },
      {
        "devanagari": "वर्तते",
        "meaning": "is / exists / lies",
        "role": "verb",
        "roleLabel": "वृत् लट् आत्मनेपदम्"
      }
    ],
    "grammarNote": "Locative case (सप्तमी) and spatial adverbs: पुरतः (front), पृष्ठतः (behind), अधः (under), उपरि (above)."
  },
  {
    "id": "s-112",
    "num": 112,
    "sanskrit": "स्यूते धनं नास्ति।",
    "transliteration": "Syūte dhanaṁ nāsti.",
    "english": "There is no money in the bag.",
    "category": "locations",
    "categoryLabel": "१२. स्थाननिर्देशः",
    "categoryEn": "Location & Placement",
    "levelBadge": "Spatial & Cases",
    "words": [
      {
        "devanagari": "स्यूते",
        "meaning": "In the bag",
        "role": "adverb",
        "roleLabel": "सप्तमी (स्यूत)"
      },
      {
        "devanagari": "धनं",
        "meaning": "Money / Wealth",
        "role": "subject",
        "roleLabel": "नपुंसक प्रथमा"
      },
      {
        "devanagari": "नास्ति",
        "meaning": "is not (न + अस्ति)",
        "role": "verb",
        "roleLabel": "क्रियापदम्"
      }
    ],
    "grammarNote": "Locative case (सप्तमी) and spatial adverbs: पुरतः (front), पृष्ठतः (behind), अधः (under), उपरि (above)."
  },
  {
    "id": "s-113",
    "num": 113,
    "sanskrit": "गृहस्य पुरतः वृक्षः अस्ति।",
    "transliteration": "Gṛhasya purataḥ vṛkṣaḥ asti.",
    "english": "There is a tree in front of the house.",
    "category": "locations",
    "categoryLabel": "१२. स्थाननिर्देशः",
    "categoryEn": "Location & Placement",
    "levelBadge": "Spatial & Cases",
    "words": [
      {
        "devanagari": "गृहस्य",
        "meaning": "Of the house",
        "role": "particle",
        "roleLabel": "षष्ठी-एकवचनम्"
      },
      {
        "devanagari": "पुरतः",
        "meaning": "In front of",
        "role": "adverb",
        "roleLabel": "अव्ययम्"
      },
      {
        "devanagari": "वृक्षः",
        "meaning": "Tree",
        "role": "subject",
        "roleLabel": "पुं० प्रथमा-एक०"
      },
      {
        "devanagari": "अस्ति",
        "meaning": "is / exists",
        "role": "verb",
        "roleLabel": "अस् लट् प्रथम०"
      }
    ],
    "grammarNote": "Locative case (सप्तमी) and spatial adverbs: पुरतः (front), पृष्ठतः (behind), अधः (under), उपरि (above)."
  },
  {
    "id": "s-114",
    "num": 114,
    "sanskrit": "विद्यालयस्य पृष्ठतः क्रीडाङ्गणम्।",
    "transliteration": "Vidyālayasya pṛṣṭhataḥ krīḍāṅgaṇam.",
    "english": "The playground is behind the school.",
    "category": "locations",
    "categoryLabel": "१२. स्थाननिर्देशः",
    "categoryEn": "Location & Placement",
    "levelBadge": "Spatial & Cases",
    "words": [
      {
        "devanagari": "विद्यालयस्य",
        "meaning": "Of the school",
        "role": "particle",
        "roleLabel": "षष्ठी-एकवचनम्"
      },
      {
        "devanagari": "पृष्ठतः",
        "meaning": "Behind",
        "role": "adverb",
        "roleLabel": "अव्ययम्"
      },
      {
        "devanagari": "क्रीडाङ्गणम्",
        "meaning": "Playground",
        "role": "subject",
        "roleLabel": "नपुंसक प्रथमा"
      }
    ],
    "grammarNote": "Locative case (सप्तमी) and spatial adverbs: पुरतः (front), पृष्ठतः (behind), अधः (under), उपरि (above)."
  },
  {
    "id": "s-115",
    "num": 115,
    "sanskrit": "नद्याः समीपे आपणः अस्ति।",
    "transliteration": "Nadyāḥ samīpe āpaṇaḥ asti.",
    "english": "There is a shop near the river.",
    "category": "locations",
    "categoryLabel": "१२. स्थाननिर्देशः",
    "categoryEn": "Location & Placement",
    "levelBadge": "Spatial & Cases",
    "words": [
      {
        "devanagari": "नद्याः",
        "meaning": "Of the river",
        "role": "particle",
        "roleLabel": "षष्ठी (नदी)"
      },
      {
        "devanagari": "समीपे",
        "meaning": "Near / Close to",
        "role": "adverb",
        "roleLabel": "सप्तमी / अव्ययम्"
      },
      {
        "devanagari": "आपणः",
        "meaning": "Shop / Market",
        "role": "subject",
        "roleLabel": "पुं० प्रथमा-एक०"
      },
      {
        "devanagari": "अस्ति",
        "meaning": "is / exists",
        "role": "verb",
        "roleLabel": "अस् लट् प्रथम०"
      }
    ],
    "grammarNote": "Locative case (सप्तमी) and spatial adverbs: पुरतः (front), पृष्ठतः (behind), अधः (under), उपरि (above)."
  },
  {
    "id": "s-116",
    "num": 116,
    "sanskrit": "नगरात् दूरं गच्छ।",
    "transliteration": "Nagarāt dūraṁ gaccha.",
    "english": "Go far from the city.",
    "category": "locations",
    "categoryLabel": "१२. स्थाननिर्देशः",
    "categoryEn": "Location & Placement",
    "levelBadge": "Spatial & Cases",
    "words": [
      {
        "devanagari": "नगरात्",
        "meaning": "From the city",
        "role": "particle",
        "roleLabel": "पञ्चमी (अपादानम्)"
      },
      {
        "devanagari": "दूरं",
        "meaning": "Far away",
        "role": "adverb",
        "roleLabel": "अव्ययम्"
      },
      {
        "devanagari": "गच्छ",
        "meaning": "Go! (order)",
        "role": "verb",
        "roleLabel": "गम् लोट् मध्यम०"
      }
    ],
    "grammarNote": "Locative case (सप्तमी) and spatial adverbs: पुरतः (front), पृष्ठतः (behind), अधः (under), उपरि (above)."
  },
  {
    "id": "s-117",
    "num": 117,
    "sanskrit": "वृक्षस्य अधः पथिकः उपविशति।",
    "transliteration": "Vṛkṣasya adhaḥ pathikaḥ upaviśati.",
    "english": "The traveler sits under the tree.",
    "category": "locations",
    "categoryLabel": "१२. स्थाननिर्देशः",
    "categoryEn": "Location & Placement",
    "levelBadge": "Spatial & Cases",
    "words": [
      {
        "devanagari": "वृक्षस्य",
        "meaning": "वृक्षस्य",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "अधः",
        "meaning": "Under / Below",
        "role": "adverb",
        "roleLabel": "अव्ययम्"
      },
      {
        "devanagari": "पथिकः",
        "meaning": "Traveler / Wayfarer",
        "role": "subject",
        "roleLabel": "पुं० प्रथमा"
      },
      {
        "devanagari": "उपविशति",
        "meaning": "sits down",
        "role": "verb",
        "roleLabel": "उप+विश् लट्"
      }
    ],
    "grammarNote": "Locative case (सप्तमी) and spatial adverbs: पुरतः (front), पृष्ठतः (behind), अधः (under), उपरि (above)."
  },
  {
    "id": "s-118",
    "num": 118,
    "sanskrit": "आकाशस्य उपरि खगाः सन्ति।",
    "transliteration": "Ākāśasya upari khagāḥ santi.",
    "english": "Birds are high up in the sky.",
    "category": "locations",
    "categoryLabel": "१२. स्थाननिर्देशः",
    "categoryEn": "Location & Placement",
    "levelBadge": "Spatial & Cases",
    "words": [
      {
        "devanagari": "आकाशस्य",
        "meaning": "Of the sky",
        "role": "particle",
        "roleLabel": "षष्ठी (आकाश)"
      },
      {
        "devanagari": "उपरि",
        "meaning": "Above / High up",
        "role": "adverb",
        "roleLabel": "अव्ययम्"
      },
      {
        "devanagari": "खगाः",
        "meaning": "Birds (plural)",
        "role": "subject",
        "roleLabel": "पुं० बहुवचनम्"
      },
      {
        "devanagari": "सन्ति",
        "meaning": "are (plural)",
        "role": "verb",
        "roleLabel": "अस् लट् बहु०"
      }
    ],
    "grammarNote": "Locative case (सप्तमी) and spatial adverbs: पुरतः (front), पृष्ठतः (behind), अधः (under), उपरि (above)."
  },
  {
    "id": "s-119",
    "num": 119,
    "sanskrit": "अहं कोष्ठे अस्मि।",
    "transliteration": "Ahaṁ koṣṭhe asmi.",
    "english": "I am in the room.",
    "category": "locations",
    "categoryLabel": "१२. स्थाननिर्देशः",
    "categoryEn": "Location & Placement",
    "levelBadge": "Spatial & Cases",
    "words": [
      {
        "devanagari": "अहं",
        "meaning": "I",
        "role": "subject",
        "roleLabel": "अस्मद् प्रथमा"
      },
      {
        "devanagari": "कोष्ठे",
        "meaning": "In the room",
        "role": "adverb",
        "roleLabel": "सप्तमी (कोष्ठ)"
      },
      {
        "devanagari": "अस्मि",
        "meaning": "am",
        "role": "verb",
        "roleLabel": "अस् लट् उत्तम०"
      }
    ],
    "grammarNote": "Locative case (सप्तमी) and spatial adverbs: पुरतः (front), पृष्ठतः (behind), अधः (under), उपरि (above)."
  },
  {
    "id": "s-120",
    "num": 120,
    "sanskrit": "सः देहल्यां वसति।",
    "transliteration": "Saḥ dehalyāṁ vasati.",
    "english": "He lives in Delhi.",
    "category": "locations",
    "categoryLabel": "१२. स्थाननिर्देशः",
    "categoryEn": "Location & Placement",
    "levelBadge": "Spatial & Cases",
    "words": [
      {
        "devanagari": "सः",
        "meaning": "He",
        "role": "subject",
        "roleLabel": "तद् पुं० प्रथमा"
      },
      {
        "devanagari": "देहल्यां",
        "meaning": "In Delhi",
        "role": "adverb",
        "roleLabel": "सप्तमी (देहलि)"
      },
      {
        "devanagari": "वसति",
        "meaning": "lives / resides",
        "role": "verb",
        "roleLabel": "वस् लट् प्रथम०"
      }
    ],
    "grammarNote": "Locative case (सप्तमी) and spatial adverbs: पुरतः (front), पृष्ठतः (behind), अधः (under), उपरि (above)."
  },
  {
    "id": "s-121",
    "num": 121,
    "sanskrit": "एषः मार्गः सरलः अस्ति।",
    "transliteration": "Eṣaḥ mārgaḥ saralaḥ asti.",
    "english": "This path is straight/easy.",
    "category": "adjectives",
    "categoryLabel": "१३. विशेषणानि",
    "categoryEn": "Basic Adjectives",
    "levelBadge": "Descriptions",
    "words": [
      {
        "devanagari": "एषः",
        "meaning": "This",
        "role": "subject",
        "roleLabel": "पुं० प्रथमा"
      },
      {
        "devanagari": "मार्गः",
        "meaning": "Way / Path / Road",
        "role": "subject",
        "roleLabel": "पुं० प्रथमा-एक०"
      },
      {
        "devanagari": "सरलः",
        "meaning": "Straight / Simple",
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
    "grammarNote": "Qualitative adjectives (विशेषणानि) agreeing in gender, number, and case with the noun."
  },
  {
    "id": "s-122",
    "num": 122,
    "sanskrit": "तद् वस्त्रं रक्तवर्णं वर्तते।",
    "transliteration": "Tad vastraṁ raktavarṇaṁ vartate.",
    "english": "That cloth is red.",
    "category": "adjectives",
    "categoryLabel": "१३. विशेषणानि",
    "categoryEn": "Basic Adjectives",
    "levelBadge": "Descriptions",
    "words": [
      {
        "devanagari": "तद्",
        "meaning": "That",
        "role": "subject",
        "roleLabel": "तद् नपुंसक प्रथमा"
      },
      {
        "devanagari": "वस्त्रं",
        "meaning": "Cloth / Garment",
        "role": "subject",
        "roleLabel": "नपुंसक प्रथमा"
      },
      {
        "devanagari": "रक्तवर्णं",
        "meaning": "Red colored",
        "role": "adjective",
        "roleLabel": "विशेषणम्"
      },
      {
        "devanagari": "वर्तते",
        "meaning": "is / exists / lies",
        "role": "verb",
        "roleLabel": "वृत् लट् आत्मनेपदम्"
      }
    ],
    "grammarNote": "Qualitative adjectives (विशेषणानि) agreeing in gender, number, and case with the noun."
  },
  {
    "id": "s-123",
    "num": 123,
    "sanskrit": "अयं बालकः चतुरः अस्ति।",
    "transliteration": "Ayaṁ bālakaḥ caturaḥ asti.",
    "english": "This boy is clever.",
    "category": "adjectives",
    "categoryLabel": "१३. विशेषणानि",
    "categoryEn": "Basic Adjectives",
    "levelBadge": "Descriptions",
    "words": [
      {
        "devanagari": "अयं",
        "meaning": "This (male)",
        "role": "subject",
        "roleLabel": "इदम् पुं० प्रथमा"
      },
      {
        "devanagari": "बालकः",
        "meaning": "Boy",
        "role": "subject",
        "roleLabel": "पुं० प्रथमा"
      },
      {
        "devanagari": "चतुरः",
        "meaning": "Clever / Smart",
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
    "grammarNote": "Qualitative adjectives (विशेषणानि) agreeing in gender, number, and case with the noun."
  },
  {
    "id": "s-124",
    "num": 124,
    "sanskrit": "इयं बालिका शान्ता अस्ति।",
    "transliteration": "Iyaṁ bālikā śāntā asti.",
    "english": "This girl is calm.",
    "category": "adjectives",
    "categoryLabel": "१३. विशेषणानि",
    "categoryEn": "Basic Adjectives",
    "levelBadge": "Descriptions",
    "words": [
      {
        "devanagari": "इयं",
        "meaning": "This (female)",
        "role": "subject",
        "roleLabel": "इदम् स्त्री० प्रथमा"
      },
      {
        "devanagari": "बालिका",
        "meaning": "Girl",
        "role": "subject",
        "roleLabel": "स्त्री० प्रथमा"
      },
      {
        "devanagari": "शान्ता",
        "meaning": "Calm / Peaceful",
        "role": "adjective",
        "roleLabel": "विशेषणम् (स्त्री०)"
      },
      {
        "devanagari": "अस्ति",
        "meaning": "is / exists",
        "role": "verb",
        "roleLabel": "अस् लट् प्रथम०"
      }
    ],
    "grammarNote": "Qualitative adjectives (विशेषणानि) agreeing in gender, number, and case with the noun."
  },
  {
    "id": "s-125",
    "num": 125,
    "sanskrit": "एतत् फलम् अतीव मधुरम्।",
    "transliteration": "Etat phalam atīva madhuram.",
    "english": "This fruit is very sweet.",
    "category": "adjectives",
    "categoryLabel": "१३. विशेषणानि",
    "categoryEn": "Basic Adjectives",
    "levelBadge": "Descriptions",
    "words": [
      {
        "devanagari": "एतत्",
        "meaning": "This (neuter)",
        "role": "subject",
        "roleLabel": "प्रथमा (एतद्)"
      },
      {
        "devanagari": "फलम्",
        "meaning": "Fruit",
        "role": "subject",
        "roleLabel": "नपुंसक प्रथमा"
      },
      {
        "devanagari": "अतीव",
        "meaning": "Very / Extremely",
        "role": "adverb",
        "roleLabel": "क्रियाविशेषणम्"
      },
      {
        "devanagari": "मधुरम्",
        "meaning": "Sweet",
        "role": "adjective",
        "roleLabel": "विशेषणम्"
      }
    ],
    "grammarNote": "Qualitative adjectives (विशेषणानि) agreeing in gender, number, and case with the noun."
  },
  {
    "id": "s-126",
    "num": 126,
    "sanskrit": "सः वृद्धः पुरुषः अस्ति।",
    "transliteration": "Saḥ vṛddhaḥ puruṣaḥ asti.",
    "english": "He is an old man.",
    "category": "adjectives",
    "categoryLabel": "१३. विशेषणानि",
    "categoryEn": "Basic Adjectives",
    "levelBadge": "Descriptions",
    "words": [
      {
        "devanagari": "सः",
        "meaning": "He",
        "role": "subject",
        "roleLabel": "तद् पुं० प्रथमा"
      },
      {
        "devanagari": "वृद्धः",
        "meaning": "Old / Aged",
        "role": "adjective",
        "roleLabel": "विशेषणम् (पुं०)"
      },
      {
        "devanagari": "पुरुषः",
        "meaning": "Man",
        "role": "subject",
        "roleLabel": "पुं० प्रथमा"
      },
      {
        "devanagari": "अस्ति",
        "meaning": "is / exists",
        "role": "verb",
        "roleLabel": "अस् लट् प्रथम०"
      }
    ],
    "grammarNote": "Qualitative adjectives (विशेषणानि) agreeing in gender, number, and case with the noun."
  },
  {
    "id": "s-127",
    "num": 127,
    "sanskrit": "अत्र महान् उत्सवः अस्ति।",
    "transliteration": "Atra mahān utsavaḥ asti.",
    "english": "There is a grand festival here.",
    "category": "adjectives",
    "categoryLabel": "१३. विशेषणानि",
    "categoryEn": "Basic Adjectives",
    "levelBadge": "Descriptions",
    "words": [
      {
        "devanagari": "अत्र",
        "meaning": "Here",
        "role": "adverb",
        "roleLabel": "अव्ययम्"
      },
      {
        "devanagari": "महान्",
        "meaning": "Great / Grand",
        "role": "adjective",
        "roleLabel": "विशेषणम् (महत्)"
      },
      {
        "devanagari": "उत्सवः",
        "meaning": "Festival / Celebration",
        "role": "subject",
        "roleLabel": "पुं० प्रथमा"
      },
      {
        "devanagari": "अस्ति",
        "meaning": "is / exists",
        "role": "verb",
        "roleLabel": "अस् लट् प्रथम०"
      }
    ],
    "grammarNote": "Qualitative adjectives (विशेषणानि) agreeing in gender, number, and case with the noun."
  },
  {
    "id": "s-128",
    "num": 128,
    "sanskrit": "जलं उष्णं मा अस्तु।",
    "transliteration": "Jalaṁ uṣṇaṁ mā astu.",
    "english": "Let the water not be hot.",
    "category": "adjectives",
    "categoryLabel": "१३. विशेषणानि",
    "categoryEn": "Basic Adjectives",
    "levelBadge": "Descriptions",
    "words": [
      {
        "devanagari": "जलं",
        "meaning": "Water",
        "role": "subject",
        "roleLabel": "नपुंसक प्रथमा"
      },
      {
        "devanagari": "उष्णं",
        "meaning": "Hot / Warm",
        "role": "adjective",
        "roleLabel": "विशेषणम्"
      },
      {
        "devanagari": "मा",
        "meaning": "Do not",
        "role": "particle",
        "roleLabel": "निषेधार्थक-अव्ययम्"
      },
      {
        "devanagari": "अस्तु",
        "meaning": "Let it be",
        "role": "verb",
        "roleLabel": "अस् लोट् प्रथम०"
      }
    ],
    "grammarNote": "Qualitative adjectives (विशेषणानि) agreeing in gender, number, and case with the noun."
  },
  {
    "id": "s-129",
    "num": 129,
    "sanskrit": "एषा कथा लघ्वी अस्ति।",
    "transliteration": "Eṣā kathā laghvī asti.",
    "english": "This story is short.",
    "category": "adjectives",
    "categoryLabel": "१३. विशेषणानि",
    "categoryEn": "Basic Adjectives",
    "levelBadge": "Descriptions",
    "words": [
      {
        "devanagari": "एषा",
        "meaning": "This (female)",
        "role": "subject",
        "roleLabel": "स्त्री० प्रथमा"
      },
      {
        "devanagari": "कथा",
        "meaning": "Story / Tale",
        "role": "subject",
        "roleLabel": "स्त्री० प्रथमा"
      },
      {
        "devanagari": "लघ्वी",
        "meaning": "Short / Light",
        "role": "adjective",
        "roleLabel": "विशेषणम् (लघु स्त्री०)"
      },
      {
        "devanagari": "अस्ति",
        "meaning": "is / exists",
        "role": "verb",
        "roleLabel": "अस् लट् प्रथम०"
      }
    ],
    "grammarNote": "Qualitative adjectives (विशेषणानि) agreeing in gender, number, and case with the noun."
  },
  {
    "id": "s-130",
    "num": 130,
    "sanskrit": "पर्वतः अतीव उन्नतः अस्ति।",
    "transliteration": "Parvataḥ atīva unnataḥ asti.",
    "english": "The mountain is very high.",
    "category": "adjectives",
    "categoryLabel": "१३. विशेषणानि",
    "categoryEn": "Basic Adjectives",
    "levelBadge": "Descriptions",
    "words": [
      {
        "devanagari": "पर्वतः",
        "meaning": "Mountain",
        "role": "subject",
        "roleLabel": "पुं० प्रथमा"
      },
      {
        "devanagari": "अतीव",
        "meaning": "Very / Extremely",
        "role": "adverb",
        "roleLabel": "क्रियाविशेषणम्"
      },
      {
        "devanagari": "उन्नतः",
        "meaning": "High / Lofty / Tall",
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
    "grammarNote": "Qualitative adjectives (विशेषणानि) agreeing in gender, number, and case with the noun."
  },
  {
    "id": "s-131",
    "num": 131,
    "sanskrit": "मह्यम् एतत् चित्रं रोचते।",
    "transliteration": "Mahyam etat citraṁ rocate.",
    "english": "I like this picture.",
    "category": "hobbies",
    "categoryLabel": "१४. रुचिः सामर्थ्यं च",
    "categoryEn": "Hobbies & Abilities",
    "levelBadge": "Interests & Skills",
    "words": [
      {
        "devanagari": "मह्यम्",
        "meaning": "To me",
        "role": "particle",
        "roleLabel": "चतुर्थी (सम्प्रदानम्)"
      },
      {
        "devanagari": "एतत्",
        "meaning": "This (neuter)",
        "role": "subject",
        "roleLabel": "प्रथमा (एतद्)"
      },
      {
        "devanagari": "चित्रं",
        "meaning": "Picture / Art",
        "role": "subject",
        "roleLabel": "नपुंसक प्रथमा"
      },
      {
        "devanagari": "रोचते",
        "meaning": "appeals / pleases",
        "role": "verb",
        "roleLabel": "रुच् लट् आत्मनेपदम्"
      }
    ],
    "grammarNote": "Expressing interests with रुच्यर्थे चतुर्थी (मह्यम्/भवते रोचते) and infinitives (-तुमुन्: तरितुम्, वक्तुम्)."
  },
  {
    "id": "s-132",
    "num": 132,
    "sanskrit": "किं भवते क्रीडा रोचते?",
    "transliteration": "Kiṁ bhavate krīḍā rocate?",
    "english": "Do you like sports? (to a male)",
    "category": "hobbies",
    "categoryLabel": "१४. रुचिः सामर्थ्यं च",
    "categoryEn": "Hobbies & Abilities",
    "levelBadge": "Interests & Skills",
    "words": [
      {
        "devanagari": "किं",
        "meaning": "किं",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "भवते",
        "meaning": "To you (male)",
        "role": "particle",
        "roleLabel": "चतुर्थी-एकवचनम्"
      },
      {
        "devanagari": "क्रीडा",
        "meaning": "Sports / Play / Game",
        "role": "subject",
        "roleLabel": "स्त्री० प्रथमा"
      },
      {
        "devanagari": "रोचते",
        "meaning": "appeals / pleases",
        "role": "verb",
        "roleLabel": "रुच् लट् आत्मनेपदम्"
      }
    ],
    "grammarNote": "Expressing interests with रुच्यर्थे चतुर्थी (मह्यम्/भवते रोचते) and infinitives (-तुमुन्: तरितुम्, वक्तुम्)."
  },
  {
    "id": "s-133",
    "num": 133,
    "sanskrit": "सा मधुरं गायति।",
    "transliteration": "Sā madhuraṁ gāyati.",
    "english": "She sings sweetly.",
    "category": "hobbies",
    "categoryLabel": "१४. रुचिः सामर्थ्यं च",
    "categoryEn": "Hobbies & Abilities",
    "levelBadge": "Interests & Skills",
    "words": [
      {
        "devanagari": "सा",
        "meaning": "She",
        "role": "subject",
        "roleLabel": "तद् स्त्री० प्रथमा"
      },
      {
        "devanagari": "मधुरं",
        "meaning": "Sweetly",
        "role": "adverb",
        "roleLabel": "क्रियाविशेषणम्"
      },
      {
        "devanagari": "गायति",
        "meaning": "sings",
        "role": "verb",
        "roleLabel": "गै लट् प्रथम०"
      }
    ],
    "grammarNote": "Expressing interests with रुच्यर्थे चतुर्थी (मह्यम्/भवते रोचते) and infinitives (-तुमुन्: तरितुम्, वक्तुम्)."
  },
  {
    "id": "s-134",
    "num": 134,
    "sanskrit": "अहं तरितुं शक्नोमि।",
    "transliteration": "Ahaṁ tarituṁ śaknomi.",
    "english": "I can swim.",
    "category": "hobbies",
    "categoryLabel": "१४. रुचिः सामर्थ्यं च",
    "categoryEn": "Hobbies & Abilities",
    "levelBadge": "Interests & Skills",
    "words": [
      {
        "devanagari": "अहं",
        "meaning": "I",
        "role": "subject",
        "roleLabel": "अस्मद् प्रथमा"
      },
      {
        "devanagari": "तरितुं",
        "meaning": "To swim",
        "role": "verb",
        "roleLabel": "तुमुन्-प्रत्ययः (तॄ)"
      },
      {
        "devanagari": "शक्नोमि",
        "meaning": "can / am able (I)",
        "role": "verb",
        "roleLabel": "शक् लट् उत्तम०"
      }
    ],
    "grammarNote": "Expressing interests with रुच्यर्थे चतुर्थी (मह्यम्/भवते रोचते) and infinitives (-तुमुन्: तरितुम्, वक्तुम्)."
  },
  {
    "id": "s-135",
    "num": 135,
    "sanskrit": "त्वं संस्कृतं वक्तुं शक्नोषि।",
    "transliteration": "Tvaṁ saṁskṛtaṁ vaktuṁ śaknoṣi.",
    "english": "You can speak Sanskrit.",
    "category": "hobbies",
    "categoryLabel": "१४. रुचिः सामर्थ्यं च",
    "categoryEn": "Hobbies & Abilities",
    "levelBadge": "Interests & Skills",
    "words": [
      {
        "devanagari": "त्वं",
        "meaning": "You",
        "role": "subject",
        "roleLabel": "युष्मद् प्रथमा"
      },
      {
        "devanagari": "संस्कृतं",
        "meaning": "Sanskrit",
        "role": "object",
        "roleLabel": "कर्म (द्वितीया)"
      },
      {
        "devanagari": "वक्तुं",
        "meaning": "To speak",
        "role": "verb",
        "roleLabel": "तुमुन्-प्रत्ययः (वच्)"
      },
      {
        "devanagari": "शक्नोषि",
        "meaning": "can / are able (you)",
        "role": "verb",
        "roleLabel": "शक् लट् मध्यम०"
      }
    ],
    "grammarNote": "Expressing interests with रुच्यर्थे चतुर्थी (मह्यम्/भवते रोचते) and infinitives (-तुमुन्: तरितुम्, वक्तुम्)."
  },
  {
    "id": "s-136",
    "num": 136,
    "sanskrit": "सः सुन्दरं लिखति।",
    "transliteration": "Saḥ sundaraṁ likhati.",
    "english": "He writes beautifully.",
    "category": "hobbies",
    "categoryLabel": "१४. रुचिः सामर्थ्यं च",
    "categoryEn": "Hobbies & Abilities",
    "levelBadge": "Interests & Skills",
    "words": [
      {
        "devanagari": "सः",
        "meaning": "He",
        "role": "subject",
        "roleLabel": "तद् पुं० प्रथमा"
      },
      {
        "devanagari": "सुन्दरं",
        "meaning": "Beautifully",
        "role": "adverb",
        "roleLabel": "क्रियाविशेषणम्"
      },
      {
        "devanagari": "लिखति",
        "meaning": "writes",
        "role": "verb",
        "roleLabel": "लिख् लट् प्रथम०"
      }
    ],
    "grammarNote": "Expressing interests with रुच्यर्थे चतुर्थी (मह्यम्/भवते रोचते) and infinitives (-तुमुन्: तरितुम्, वक्तुम्)."
  },
  {
    "id": "s-137",
    "num": 137,
    "sanskrit": "अहं प्रतिदिनं व्यायामं करोमि।",
    "transliteration": "Ahaṁ pratidinaṁ vyāyāmaṁ karomi.",
    "english": "I exercise every day.",
    "category": "hobbies",
    "categoryLabel": "१४. रुचिः सामर्थ्यं च",
    "categoryEn": "Hobbies & Abilities",
    "levelBadge": "Interests & Skills",
    "words": [
      {
        "devanagari": "अहं",
        "meaning": "I",
        "role": "subject",
        "roleLabel": "अस्मद् प्रथमा"
      },
      {
        "devanagari": "प्रतिदिनं",
        "meaning": "Every day / Daily",
        "role": "adverb",
        "roleLabel": "अव्ययम्"
      },
      {
        "devanagari": "व्यायामं",
        "meaning": "Exercise",
        "role": "object",
        "roleLabel": "कर्म (द्वितीया)"
      },
      {
        "devanagari": "करोमि",
        "meaning": "do / make (I)",
        "role": "verb",
        "roleLabel": "कृ लट् उत्तम०"
      }
    ],
    "grammarNote": "Expressing interests with रुच्यर्थे चतुर्थी (मह्यम्/भवते रोचते) and infinitives (-तुमुन्: तरितुम्, वक्तुम्)."
  },
  {
    "id": "s-138",
    "num": 138,
    "sanskrit": "तस्य पठनं सम्यक् अस्ति।",
    "transliteration": "Tasya paṭhanaṁ samyak asti.",
    "english": "His reading is good.",
    "category": "hobbies",
    "categoryLabel": "१४. रुचिः सामर्थ्यं च",
    "categoryEn": "Hobbies & Abilities",
    "levelBadge": "Interests & Skills",
    "words": [
      {
        "devanagari": "तस्य",
        "meaning": "His",
        "role": "particle",
        "roleLabel": "षष्ठी-एकवचनम्"
      },
      {
        "devanagari": "पठनं",
        "meaning": "Study / Reading",
        "role": "subject",
        "roleLabel": "ल्युट्"
      },
      {
        "devanagari": "सम्यक्",
        "meaning": "Good / Well / Properly",
        "role": "adverb",
        "roleLabel": "अव्ययम्"
      },
      {
        "devanagari": "अस्ति",
        "meaning": "is / exists",
        "role": "verb",
        "roleLabel": "अस् लट् प्रथम०"
      }
    ],
    "grammarNote": "Expressing interests with रुच्यर्थे चतुर्थी (मह्यम्/भवते रोचते) and infinitives (-तुमुन्: तरितुम्, वक्तुम्)."
  },
  {
    "id": "s-139",
    "num": 139,
    "sanskrit": "वयं भ्रमणं कर्तुम् इच्छामः।",
    "transliteration": "Vayaṁ bhramaṇaṁ kartum icchāmaḥ.",
    "english": "We want to travel.",
    "category": "hobbies",
    "categoryLabel": "१४. रुचिः सामर्थ्यं च",
    "categoryEn": "Hobbies & Abilities",
    "levelBadge": "Interests & Skills",
    "words": [
      {
        "devanagari": "वयं",
        "meaning": "We",
        "role": "subject",
        "roleLabel": "अस्मद् प्रथमा बहु०"
      },
      {
        "devanagari": "भ्रमणं",
        "meaning": "Traveling / Wandering",
        "role": "object",
        "roleLabel": "कर्म (द्वितीया)"
      },
      {
        "devanagari": "कर्तुम्",
        "meaning": "To do",
        "role": "verb",
        "roleLabel": "तुमुन्-प्रत्ययः (कृ)"
      },
      {
        "devanagari": "इच्छामः",
        "meaning": "wish / desire (we)",
        "role": "verb",
        "roleLabel": "इष् लट् उत्तम बहु०"
      }
    ],
    "grammarNote": "Expressing interests with रुच्यर्थे चतुर्थी (मह्यम्/भवते रोचते) and infinitives (-तुमुन्: तरितुम्, वक्तुम्)."
  },
  {
    "id": "s-140",
    "num": 140,
    "sanskrit": "बालकाः कन्दुकक्रीडां क्रीडन्ति।",
    "transliteration": "Bālakāḥ kandukakrīḍāṁ krīḍanti.",
    "english": "The boys are playing football/ball games.",
    "category": "hobbies",
    "categoryLabel": "१४. रुचिः सामर्थ्यं च",
    "categoryEn": "Hobbies & Abilities",
    "levelBadge": "Interests & Skills",
    "words": [
      {
        "devanagari": "बालकाः",
        "meaning": "Boys (plural)",
        "role": "subject",
        "roleLabel": "पुं० बहुवचनम्"
      },
      {
        "devanagari": "कन्दुकक्रीडां",
        "meaning": "Ball game / Football",
        "role": "object",
        "roleLabel": "कर्म (द्वितीया)"
      },
      {
        "devanagari": "क्रीडन्ति",
        "meaning": "play (plural)",
        "role": "verb",
        "roleLabel": "क्रीड् लट् बहु०"
      }
    ],
    "grammarNote": "Expressing interests with रुच्यर्थे चतुर्थी (मह्यम्/भवते रोचते) and infinitives (-तुमुन्: तरितुम्, वक्तुम्)."
  },
  {
    "id": "s-141",
    "num": 141,
    "sanskrit": "शीघ्रं कार्यं समापय।",
    "transliteration": "Śīghraṁ kāryaṁ samāpaya.",
    "english": "Finish the work quickly.",
    "category": "rules",
    "categoryLabel": "१५. अनुरोधः नियमाः च",
    "categoryEn": "Rules & Etiquette",
    "levelBadge": "Guidelines & Conduct",
    "words": [
      {
        "devanagari": "शीघ्रं",
        "meaning": "Quickly / Fast",
        "role": "adverb",
        "roleLabel": "क्रियाविशेषणम्"
      },
      {
        "devanagari": "कार्यं",
        "meaning": "Work / Task",
        "role": "object",
        "roleLabel": "कर्म (द्वितीया)"
      },
      {
        "devanagari": "समापय",
        "meaning": "Finish! (order)",
        "role": "verb",
        "roleLabel": "सं+आप् णिच् लोट्"
      }
    ],
    "grammarNote": "Classroom etiquette, negative imperatives with मा (मा कुरु, मा वद), and polite requests."
  },
  {
    "id": "s-142",
    "num": 142,
    "sanskrit": "असत्यं मा वद।",
    "transliteration": "Asatyaṁ mā vada.",
    "english": "Do not speak lies.",
    "category": "rules",
    "categoryLabel": "१५. अनुरोधः नियमाः च",
    "categoryEn": "Rules & Etiquette",
    "levelBadge": "Guidelines & Conduct",
    "words": [
      {
        "devanagari": "असत्यं",
        "meaning": "Untruth / Lie",
        "role": "object",
        "roleLabel": "कर्म (द्वितीया)"
      },
      {
        "devanagari": "मा",
        "meaning": "Do not",
        "role": "particle",
        "roleLabel": "निषेधार्थक-अव्ययम्"
      },
      {
        "devanagari": "वद",
        "meaning": "Speak! (order)",
        "role": "verb",
        "roleLabel": "वद् लोट् मध्यम०"
      }
    ],
    "grammarNote": "Classroom etiquette, negative imperatives with मा (मा कुरु, मा वद), and polite requests."
  },
  {
    "id": "s-143",
    "num": 143,
    "sanskrit": "अत्र उपविशतु कृपया।",
    "transliteration": "Atra upaviśatu kṛpayā.",
    "english": "Please sit here.",
    "category": "rules",
    "categoryLabel": "१५. अनुरोधः नियमाः च",
    "categoryEn": "Rules & Etiquette",
    "levelBadge": "Guidelines & Conduct",
    "words": [
      {
        "devanagari": "अत्र",
        "meaning": "Here",
        "role": "adverb",
        "roleLabel": "अव्ययम्"
      },
      {
        "devanagari": "उपविशतु",
        "meaning": "Please sit",
        "role": "verb",
        "roleLabel": "उप+विश् लोट् प्रथम०"
      },
      {
        "devanagari": "कृपया",
        "meaning": "Please / Kindly",
        "role": "adverb",
        "roleLabel": "अव्ययम्"
      }
    ],
    "grammarNote": "Classroom etiquette, negative imperatives with मा (मा कुरु, मा वद), and polite requests."
  },
  {
    "id": "s-144",
    "num": 144,
    "sanskrit": "द्वारं पिधत्स्व।",
    "transliteration": "Dvāraṁ pidhatsva.",
    "english": "Close the door.",
    "category": "rules",
    "categoryLabel": "१५. अनुरोधः नियमाः च",
    "categoryEn": "Rules & Etiquette",
    "levelBadge": "Guidelines & Conduct",
    "words": [
      {
        "devanagari": "द्वारं",
        "meaning": "Door",
        "role": "object",
        "roleLabel": "कर्म (द्वितीया)"
      },
      {
        "devanagari": "पिधत्स्व",
        "meaning": "Close! (order)",
        "role": "verb",
        "roleLabel": "अपि+धा लोट् आत्मने०"
      }
    ],
    "grammarNote": "Classroom etiquette, negative imperatives with मा (मा कुरु, मा वद), and polite requests."
  },
  {
    "id": "s-145",
    "num": 145,
    "sanskrit": "मन्दं मन्दं चल।",
    "transliteration": "Mandaṁ mandaṁ cala.",
    "english": "Walk very slowly.",
    "category": "rules",
    "categoryLabel": "१५. अनुरोधः नियमाः च",
    "categoryEn": "Rules & Etiquette",
    "levelBadge": "Guidelines & Conduct",
    "words": [
      {
        "devanagari": "मन्दं",
        "meaning": "Slowly",
        "role": "adverb",
        "roleLabel": "क्रियाविशेषणम्"
      },
      {
        "devanagari": "मन्दं",
        "meaning": "Slowly",
        "role": "adverb",
        "roleLabel": "क्रियाविशेषणम्"
      },
      {
        "devanagari": "चल",
        "meaning": "Walk! / Move!",
        "role": "verb",
        "roleLabel": "चल् लोट् मध्यम०"
      }
    ],
    "grammarNote": "Classroom etiquette, negative imperatives with मा (मा कुरु, मा वद), and polite requests."
  },
  {
    "id": "s-146",
    "num": 146,
    "sanskrit": "कोलाहलं मा कुरु।",
    "transliteration": "Kolāhalaṁ mā kuru.",
    "english": "Do not make noise.",
    "category": "rules",
    "categoryLabel": "१५. अनुरोधः नियमाः च",
    "categoryEn": "Rules & Etiquette",
    "levelBadge": "Guidelines & Conduct",
    "words": [
      {
        "devanagari": "कोलाहलं",
        "meaning": "Noise / Clamour",
        "role": "object",
        "roleLabel": "कर्म (द्वितीया)"
      },
      {
        "devanagari": "मा",
        "meaning": "Do not",
        "role": "particle",
        "roleLabel": "निषेधार्थक-अव्ययम्"
      },
      {
        "devanagari": "कुरु",
        "meaning": "Do! (order)",
        "role": "verb",
        "roleLabel": "कृ लोट् मध्यम०"
      }
    ],
    "grammarNote": "Classroom etiquette, negative imperatives with मा (मा कुरु, मा वद), and polite requests."
  },
  {
    "id": "s-147",
    "num": 147,
    "sanskrit": "परिश्रमं कुरु।",
    "transliteration": "Pariśramaṁ kuru.",
    "english": "Do hard work.",
    "category": "rules",
    "categoryLabel": "१५. अनुरोधः नियमाः च",
    "categoryEn": "Rules & Etiquette",
    "levelBadge": "Guidelines & Conduct",
    "words": [
      {
        "devanagari": "परिश्रमं",
        "meaning": "Hard work / Diligence",
        "role": "object",
        "roleLabel": "कर्म (द्वितीया)"
      },
      {
        "devanagari": "कुरु",
        "meaning": "Do! (order)",
        "role": "verb",
        "roleLabel": "कृ लोट् मध्यम०"
      }
    ],
    "grammarNote": "Classroom etiquette, negative imperatives with मा (मा कुरु, मा वद), and polite requests."
  },
  {
    "id": "s-148",
    "num": 148,
    "sanskrit": "स्वच्छं जलं पिब।",
    "transliteration": "Svacchaṁ jalaṁ piba.",
    "english": "Drink clean water.",
    "category": "rules",
    "categoryLabel": "१५. अनुरोधः नियमाः च",
    "categoryEn": "Rules & Etiquette",
    "levelBadge": "Guidelines & Conduct",
    "words": [
      {
        "devanagari": "स्वच्छं",
        "meaning": "Clean / Pure",
        "role": "adjective",
        "roleLabel": "विशेषणम्"
      },
      {
        "devanagari": "जलं",
        "meaning": "Water",
        "role": "subject",
        "roleLabel": "नपुंसक प्रथमा"
      },
      {
        "devanagari": "पिब",
        "meaning": "Drink! (order)",
        "role": "verb",
        "roleLabel": "पा लोट् मध्यम०"
      }
    ],
    "grammarNote": "Classroom etiquette, negative imperatives with मा (मा कुरु, मा वद), and polite requests."
  },
  {
    "id": "s-149",
    "num": 149,
    "sanskrit": "अत्र धूमपानं निषिद्धम्।",
    "transliteration": "Atra dhūmapānaṁ niṣiddham.",
    "english": "Smoking is prohibited here.",
    "category": "rules",
    "categoryLabel": "१५. अनुरोधः नियमाः च",
    "categoryEn": "Rules & Etiquette",
    "levelBadge": "Guidelines & Conduct",
    "words": [
      {
        "devanagari": "अत्र",
        "meaning": "Here",
        "role": "adverb",
        "roleLabel": "अव्ययम्"
      },
      {
        "devanagari": "धूमपानं",
        "meaning": "Smoking",
        "role": "subject",
        "roleLabel": "नपुंसक प्रथमा"
      },
      {
        "devanagari": "निषिद्धम्",
        "meaning": "Prohibited / Forbidden",
        "role": "adjective",
        "roleLabel": "विशेषणम्"
      }
    ],
    "grammarNote": "Classroom etiquette, negative imperatives with मा (मा कुरु, मा वद), and polite requests."
  },
  {
    "id": "s-150",
    "num": 150,
    "sanskrit": "समयपालनं कुरुत।",
    "transliteration": "Samayapālanaṁ kuruta.",
    "english": "Follow punctuality.",
    "category": "rules",
    "categoryLabel": "१५. अनुरोधः नियमाः च",
    "categoryEn": "Rules & Etiquette",
    "levelBadge": "Guidelines & Conduct",
    "words": [
      {
        "devanagari": "समयपालनं",
        "meaning": "Punctuality",
        "role": "object",
        "roleLabel": "कर्म (द्वितीया)"
      },
      {
        "devanagari": "कुरुत",
        "meaning": "Do! (plural order)",
        "role": "verb",
        "roleLabel": "कृ लोट् मध्यम बहु०"
      }
    ],
    "grammarNote": "Classroom etiquette, negative imperatives with मा (मा कुरु, मा वद), and polite requests."
  },
  {
    "id": "s-151",
    "num": 151,
    "sanskrit": "अहं पठामि यतः परीक्षा अस्ति।",
    "transliteration": "Ahaṁ paṭhāmi yataḥ parīkṣā asti.",
    "english": "I am studying because there is an exam.",
    "category": "connectors",
    "categoryLabel": "१६. अव्ययप्रयोगाः",
    "categoryEn": "Connectors & Clauses",
    "levelBadge": "Complex Syntax",
    "words": [
      {
        "devanagari": "अहं",
        "meaning": "I",
        "role": "subject",
        "roleLabel": "अस्मद् प्रथमा"
      },
      {
        "devanagari": "पठामि",
        "meaning": "read / study (I)",
        "role": "verb",
        "roleLabel": "पठ् लट् उत्तम०"
      },
      {
        "devanagari": "यतः",
        "meaning": "Because / Since",
        "role": "particle",
        "roleLabel": "हेत्वर्थे अव्ययम्"
      },
      {
        "devanagari": "परीक्षा",
        "meaning": "Examination",
        "role": "subject",
        "roleLabel": "स्त्री० प्रथमा"
      },
      {
        "devanagari": "अस्ति",
        "meaning": "is / exists",
        "role": "verb",
        "roleLabel": "अस् लट् प्रथम०"
      }
    ],
    "grammarNote": "Compound clauses using causal अव्यय markers: यतः... अतः, यदि... तर्हि, and gerunds (-क्त्वा: गत्वा)."
  },
  {
    "id": "s-152",
    "num": 152,
    "sanskrit": "वृष्टिः भवति, अतः अहं न गच्छामि।",
    "transliteration": "Vṛṣṭiḥ bhavati, ataḥ ahaṁ na gacchāmi.",
    "english": "It is raining, therefore I am not going.",
    "category": "connectors",
    "categoryLabel": "१६. अव्ययप्रयोगाः",
    "categoryEn": "Connectors & Clauses",
    "levelBadge": "Complex Syntax",
    "words": [
      {
        "devanagari": "वृष्टिः",
        "meaning": "Rain",
        "role": "subject",
        "roleLabel": "स्त्री० प्रथमा"
      },
      {
        "devanagari": "भवति",
        "meaning": "occurs / happens",
        "role": "verb",
        "roleLabel": "भू लट् प्रथम०"
      },
      {
        "devanagari": "अतः",
        "meaning": "Therefore / Hence",
        "role": "particle",
        "roleLabel": "परिणामवाचक-अव्ययम्"
      },
      {
        "devanagari": "अहं",
        "meaning": "I",
        "role": "subject",
        "roleLabel": "अस्मद् प्रथमा"
      },
      {
        "devanagari": "न",
        "meaning": "Not",
        "role": "particle",
        "roleLabel": "निषेधार्थक-अव्ययम्"
      },
      {
        "devanagari": "गच्छामि",
        "meaning": "go (I)",
        "role": "verb",
        "roleLabel": "गम् लट् उत्तम०"
      }
    ],
    "grammarNote": "Compound clauses using causal अव्यय markers: यतः... अतः, यदि... तर्हि, and gerunds (-क्त्वा: गत्वा)."
  },
  {
    "id": "s-153",
    "num": 153,
    "sanskrit": "यदि त्वं आगच्छसि, तर्हि अहं आगमिष्यामि।",
    "transliteration": "Yadi tvaṁ āgacchasi, tarhi ahaṁ āgamiṣyāmi.",
    "english": "If you come, then I will come.",
    "category": "connectors",
    "categoryLabel": "१६. अव्ययप्रयोगाः",
    "categoryEn": "Connectors & Clauses",
    "levelBadge": "Complex Syntax",
    "words": [
      {
        "devanagari": "यदि",
        "meaning": "If",
        "role": "particle",
        "roleLabel": "शर्तवाचक-अव्ययम्"
      },
      {
        "devanagari": "त्वं",
        "meaning": "You",
        "role": "subject",
        "roleLabel": "युष्मद् प्रथमा"
      },
      {
        "devanagari": "आगच्छसि",
        "meaning": "come (you)",
        "role": "verb",
        "roleLabel": "आ+गम् लट् मध्यम०"
      },
      {
        "devanagari": "तर्हि",
        "meaning": "Then",
        "role": "particle",
        "roleLabel": "अव्ययम्"
      },
      {
        "devanagari": "अहं",
        "meaning": "I",
        "role": "subject",
        "roleLabel": "अस्मद् प्रथमा"
      },
      {
        "devanagari": "आगमिष्यामि",
        "meaning": "will come (I)",
        "role": "verb",
        "roleLabel": "आ+गम् लृट् उत्तम०"
      }
    ],
    "grammarNote": "Compound clauses using causal अव्यय markers: यतः... अतः, यदि... तर्हि, and gerunds (-क्त्वा: गत्वा)."
  },
  {
    "id": "s-154",
    "num": 154,
    "sanskrit": "रामः लक्ष्मणः च भ्रातरौ।",
    "transliteration": "Rāmaḥ lakṣmaṇaḥ ca bhrātarau.",
    "english": "Rama and Lakshmana are brothers.",
    "category": "connectors",
    "categoryLabel": "१६. अव्ययप्रयोगाः",
    "categoryEn": "Connectors & Clauses",
    "levelBadge": "Complex Syntax",
    "words": [
      {
        "devanagari": "रामः",
        "meaning": "Rama",
        "role": "subject",
        "roleLabel": "पुं० प्रथमा"
      },
      {
        "devanagari": "लक्ष्मणः",
        "meaning": "Lakshmana",
        "role": "subject",
        "roleLabel": "पुं० प्रथमा"
      },
      {
        "devanagari": "च",
        "meaning": "And",
        "role": "particle",
        "roleLabel": "समुच्चयार्थक-अव्ययम्"
      },
      {
        "devanagari": "भ्रातरौ",
        "meaning": "Two brothers (dual)",
        "role": "subject",
        "roleLabel": "भ्रातृ द्विवचनम्"
      }
    ],
    "grammarNote": "Compound clauses using causal अव्यय markers: यतः... अतः, यदि... तर्हि, and gerunds (-क्त्वा: गत्वा)."
  },
  {
    "id": "s-155",
    "num": 155,
    "sanskrit": "सः पठति अपि क्रीडति अपि।",
    "transliteration": "Saḥ paṭhati api krīḍati api.",
    "english": "He studies as well as plays.",
    "category": "connectors",
    "categoryLabel": "१६. अव्ययप्रयोगाः",
    "categoryEn": "Connectors & Clauses",
    "levelBadge": "Complex Syntax",
    "words": [
      {
        "devanagari": "सः",
        "meaning": "He",
        "role": "subject",
        "roleLabel": "तद् पुं० प्रथमा"
      },
      {
        "devanagari": "पठति",
        "meaning": "reads",
        "role": "verb",
        "roleLabel": "पठ् लट् प्रथम०"
      },
      {
        "devanagari": "अपि",
        "meaning": "Also / As well",
        "role": "particle",
        "roleLabel": "अव्ययम्"
      },
      {
        "devanagari": "क्रीडति",
        "meaning": "plays",
        "role": "verb",
        "roleLabel": "क्रीड् लट् प्रथम०"
      },
      {
        "devanagari": "अपि",
        "meaning": "Also / As well",
        "role": "particle",
        "roleLabel": "अव्ययम्"
      }
    ],
    "grammarNote": "Compound clauses using causal अव्यय markers: यतः... अतः, यदि... तर्हि, and gerunds (-क्त्वा: गत्वा)."
  },
  {
    "id": "s-156",
    "num": 156,
    "sanskrit": "अहं गृहं गत्वा भोजनं करोमि।",
    "transliteration": "Ahaṁ gṛhaṁ gatvā bhojanaṁ karomi.",
    "english": "Having gone home, I will eat.",
    "category": "connectors",
    "categoryLabel": "१६. अव्ययप्रयोगाः",
    "categoryEn": "Connectors & Clauses",
    "levelBadge": "Complex Syntax",
    "words": [
      {
        "devanagari": "अहं",
        "meaning": "I",
        "role": "subject",
        "roleLabel": "अस्मद् प्रथमा"
      },
      {
        "devanagari": "गृहं",
        "meaning": "Home / House",
        "role": "object",
        "roleLabel": "कर्म (द्वितीया)"
      },
      {
        "devanagari": "गत्वा",
        "meaning": "Having gone",
        "role": "verb",
        "roleLabel": "क्त्वा-प्रत्ययः (गम्)"
      },
      {
        "devanagari": "भोजनं",
        "meaning": "Meal",
        "role": "object",
        "roleLabel": "कर्म (द्वितीया)"
      },
      {
        "devanagari": "करोमि",
        "meaning": "do / make (I)",
        "role": "verb",
        "roleLabel": "कृ लट् उत्तम०"
      }
    ],
    "grammarNote": "Compound clauses using causal अव्यय markers: यतः... अतः, यदि... तर्हि, and gerunds (-क्त्वा: गत्वा)."
  },
  {
    "id": "s-157",
    "num": 157,
    "sanskrit": "पुस्तकं विना पठनं न भवति।",
    "transliteration": "Pustakaṁ vinā paṭhanaṁ na bhavati.",
    "english": "Studying cannot happen without a book.",
    "category": "connectors",
    "categoryLabel": "१६. अव्ययप्रयोगाः",
    "categoryEn": "Connectors & Clauses",
    "levelBadge": "Complex Syntax",
    "words": [
      {
        "devanagari": "पुस्तकं",
        "meaning": "Book",
        "role": "subject",
        "roleLabel": "नपुंसक प्रथमा"
      },
      {
        "devanagari": "विना",
        "meaning": "Without",
        "role": "particle",
        "roleLabel": "अव्ययम्"
      },
      {
        "devanagari": "पठनं",
        "meaning": "Study / Reading",
        "role": "subject",
        "roleLabel": "ल्युट्"
      },
      {
        "devanagari": "न",
        "meaning": "Not",
        "role": "particle",
        "roleLabel": "निषेधार्थक-अव्ययम्"
      },
      {
        "devanagari": "भवति",
        "meaning": "occurs / happens",
        "role": "verb",
        "roleLabel": "भू लट् प्रथम०"
      }
    ],
    "grammarNote": "Compound clauses using causal अव्यय markers: यतः... अतः, यदि... तर्हि, and gerunds (-क्त्वा: गत्वा)."
  },
  {
    "id": "s-158",
    "num": 158,
    "sanskrit": "यथा राजा, तथा प्रजा।",
    "transliteration": "Yathā rājā, tathā prajā.",
    "english": "As the king, so the subjects.",
    "category": "connectors",
    "categoryLabel": "१६. अव्ययप्रयोगाः",
    "categoryEn": "Connectors & Clauses",
    "levelBadge": "Complex Syntax",
    "words": [
      {
        "devanagari": "यथा",
        "meaning": "Just as",
        "role": "particle",
        "roleLabel": "सादृश्य-अव्ययम्"
      },
      {
        "devanagari": "राजा",
        "meaning": "King",
        "role": "subject",
        "roleLabel": "राजन् प्रथमा"
      },
      {
        "devanagari": "तथा",
        "meaning": "So / Similarly",
        "role": "particle",
        "roleLabel": "सादृश्य-अव्ययम्"
      },
      {
        "devanagari": "प्रजा",
        "meaning": "Subjects / People",
        "role": "subject",
        "roleLabel": "स्त्री० प्रथमा"
      }
    ],
    "grammarNote": "Compound clauses using causal अव्यय markers: यतः... अतः, यदि... तर्हि, and gerunds (-क्त्वा: गत्वा)."
  },
  {
    "id": "s-159",
    "num": 159,
    "sanskrit": "सा पठितुं विद्यालयं गच्छति।",
    "transliteration": "Sā paṭhituṁ vidyālayaṁ gacchati.",
    "english": "She goes to school to study.",
    "category": "connectors",
    "categoryLabel": "१६. अव्ययप्रयोगाः",
    "categoryEn": "Connectors & Clauses",
    "levelBadge": "Complex Syntax",
    "words": [
      {
        "devanagari": "सा",
        "meaning": "She",
        "role": "subject",
        "roleLabel": "तद् स्त्री० प्रथमा"
      },
      {
        "devanagari": "पठितुं",
        "meaning": "To study",
        "role": "verb",
        "roleLabel": "तुमुन् (पठ्)"
      },
      {
        "devanagari": "विद्यालयं",
        "meaning": "To school",
        "role": "object",
        "roleLabel": "कर्म (स्थानम्)"
      },
      {
        "devanagari": "गच्छति",
        "meaning": "goes",
        "role": "verb",
        "roleLabel": "गम् लट् प्रथम०"
      }
    ],
    "grammarNote": "Compound clauses using causal अव्यय markers: यतः... अतः, यदि... तर्हि, and gerunds (-क्त्वा: गत्वा)."
  },
  {
    "id": "s-160",
    "num": 160,
    "sanskrit": "अहं जानामि यत् त्वं चतुरः असि।",
    "transliteration": "Ahaṁ jānāmi yat tvaṁ caturaḥ asi.",
    "english": "I know that you are clever.",
    "category": "connectors",
    "categoryLabel": "१६. अव्ययप्रयोगाः",
    "categoryEn": "Connectors & Clauses",
    "levelBadge": "Complex Syntax",
    "words": [
      {
        "devanagari": "अहं",
        "meaning": "I",
        "role": "subject",
        "roleLabel": "अस्मद् प्रथमा"
      },
      {
        "devanagari": "जानामि",
        "meaning": "know (I)",
        "role": "verb",
        "roleLabel": "ज्ञा लट् उत्तम०"
      },
      {
        "devanagari": "यत्",
        "meaning": "That",
        "role": "particle",
        "roleLabel": "अव्ययम्"
      },
      {
        "devanagari": "त्वं",
        "meaning": "You",
        "role": "subject",
        "roleLabel": "युष्मद् प्रथमा"
      },
      {
        "devanagari": "चतुरः",
        "meaning": "Clever / Smart",
        "role": "adjective",
        "roleLabel": "विशेषणम् (पुं०)"
      },
      {
        "devanagari": "असि",
        "meaning": "are",
        "role": "verb",
        "roleLabel": "अस् लट् मध्यम०"
      }
    ],
    "grammarNote": "Compound clauses using causal अव्यय markers: यतः... अतः, यदि... तर्हि, and gerunds (-क्त्वा: गत्वा)."
  },
  {
    "id": "s-161",
    "num": 161,
    "sanskrit": "मम शिरोवेदना अस्ति।",
    "transliteration": "Mama śirovedanā asti.",
    "english": "I have a headache.",
    "category": "wellness",
    "categoryLabel": "१७. स्वास्थ्यम्",
    "categoryEn": "Health & Wellness",
    "levelBadge": "Body & Ayurveda",
    "words": [
      {
        "devanagari": "मम",
        "meaning": "My",
        "role": "particle",
        "roleLabel": "षष्ठी-एकवचनम्"
      },
      {
        "devanagari": "शिरोवेदना",
        "meaning": "Headache",
        "role": "subject",
        "roleLabel": "स्त्री० प्रथमा"
      },
      {
        "devanagari": "अस्ति",
        "meaning": "is / exists",
        "role": "verb",
        "roleLabel": "अस् लट् प्रथम०"
      }
    ],
    "grammarNote": "Ayurvedic health, wellness conditions, bodily duals (नेत्रे), and gentle recovery wishes."
  },
  {
    "id": "s-162",
    "num": 162,
    "sanskrit": "भवान् औषधं स्वीकृतवान् किम्?",
    "transliteration": "Bhavān auṣadhaṁ svīkṛtavān kim?",
    "english": "Have you taken the medicine? (to a male)",
    "category": "wellness",
    "categoryLabel": "१७. स्वास्थ्यम्",
    "categoryEn": "Health & Wellness",
    "levelBadge": "Body & Ayurveda",
    "words": [
      {
        "devanagari": "भवान्",
        "meaning": "You (male respectful)",
        "role": "subject",
        "roleLabel": "भवत् पुं० प्रथमा"
      },
      {
        "devanagari": "औषधं",
        "meaning": "Medicine",
        "role": "object",
        "roleLabel": "कर्म (द्वितीया)"
      },
      {
        "devanagari": "स्वीकृतवान्",
        "meaning": "Accepted / Taken (past)",
        "role": "verb",
        "roleLabel": "क्तवतु-प्रत्ययः"
      },
      {
        "devanagari": "किम्",
        "meaning": "What?",
        "role": "adverb",
        "roleLabel": "प्रश्नवाचकम्"
      }
    ],
    "grammarNote": "Ayurvedic health, wellness conditions, bodily duals (नेत्रे), and gentle recovery wishes."
  },
  {
    "id": "s-163",
    "num": 163,
    "sanskrit": "तस्य नेत्रे रक्तायते।",
    "transliteration": "Tasya netre raktāyate.",
    "english": "His eyes are red.",
    "category": "wellness",
    "categoryLabel": "१७. स्वास्थ्यम्",
    "categoryEn": "Health & Wellness",
    "levelBadge": "Body & Ayurveda",
    "words": [
      {
        "devanagari": "तस्य",
        "meaning": "His",
        "role": "particle",
        "roleLabel": "षष्ठी-एकवचनम्"
      },
      {
        "devanagari": "नेत्रे",
        "meaning": "Two eyes (dual)",
        "role": "subject",
        "roleLabel": "नपुंसक द्विवचनम्"
      },
      {
        "devanagari": "रक्तायते",
        "meaning": "become red / turn red",
        "role": "verb",
        "roleLabel": "नामधातु लट्"
      }
    ],
    "grammarNote": "Ayurvedic health, wellness conditions, bodily duals (नेत्रे), and gentle recovery wishes."
  },
  {
    "id": "s-164",
    "num": 164,
    "sanskrit": "स्वास्थ्यं परमं धनम् अस्ति।",
    "transliteration": "Svāsthyaṁ paramaṁ dhanaṁ asti.",
    "english": "Health is the ultimate wealth.",
    "category": "wellness",
    "categoryLabel": "१७. स्वास्थ्यम्",
    "categoryEn": "Health & Wellness",
    "levelBadge": "Body & Ayurveda",
    "words": [
      {
        "devanagari": "स्वास्थ्यं",
        "meaning": "Health / Well-being",
        "role": "subject",
        "roleLabel": "नपुंसक प्रथमा"
      },
      {
        "devanagari": "परमं",
        "meaning": "Supreme / Ultimate",
        "role": "adjective",
        "roleLabel": "विशेषणम्"
      },
      {
        "devanagari": "धनम्",
        "meaning": "धनम्",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "अस्ति",
        "meaning": "is / exists",
        "role": "verb",
        "roleLabel": "अस् लट् प्रथम०"
      }
    ],
    "grammarNote": "Ayurvedic health, wellness conditions, bodily duals (नेत्रे), and gentle recovery wishes."
  },
  {
    "id": "s-165",
    "num": 165,
    "sanskrit": "अहं क्लान्तः अस्मि।",
    "transliteration": "Ahaṁ klāntaḥ asmi.",
    "english": "I am tired (male).",
    "category": "wellness",
    "categoryLabel": "१७. स्वास्थ्यम्",
    "categoryEn": "Health & Wellness",
    "levelBadge": "Body & Ayurveda",
    "words": [
      {
        "devanagari": "अहं",
        "meaning": "I",
        "role": "subject",
        "roleLabel": "अस्मद् प्रथमा"
      },
      {
        "devanagari": "क्लान्तः",
        "meaning": "Tired / Fatigued",
        "role": "adjective",
        "roleLabel": "विशेषणम् (पुं०)"
      },
      {
        "devanagari": "अस्मि",
        "meaning": "am",
        "role": "verb",
        "roleLabel": "अस् लट् उत्तम०"
      }
    ],
    "grammarNote": "Ayurvedic health, wellness conditions, bodily duals (नेत्रे), and gentle recovery wishes."
  },
  {
    "id": "s-166",
    "num": 166,
    "sanskrit": "सा अस्वस्था अस्ति।",
    "transliteration": "Sā asvasthā asti.",
    "english": "She is unwell.",
    "category": "wellness",
    "categoryLabel": "१७. स्वास्थ्यम्",
    "categoryEn": "Health & Wellness",
    "levelBadge": "Body & Ayurveda",
    "words": [
      {
        "devanagari": "सा",
        "meaning": "She",
        "role": "subject",
        "roleLabel": "तद् स्त्री० प्रथमा"
      },
      {
        "devanagari": "अस्वस्था",
        "meaning": "Unwell / Sick",
        "role": "adjective",
        "roleLabel": "विशेषणम् (स्त्री०)"
      },
      {
        "devanagari": "अस्ति",
        "meaning": "is / exists",
        "role": "verb",
        "roleLabel": "अस् लट् प्रथम०"
      }
    ],
    "grammarNote": "Ayurvedic health, wellness conditions, bodily duals (नेत्रे), and gentle recovery wishes."
  },
  {
    "id": "s-167",
    "num": 167,
    "sanskrit": "शीघ्रं स्वस्थः भवतु।",
    "transliteration": "Śīghraṁ svasthaḥ bhavatu.",
    "english": "Get well soon.",
    "category": "wellness",
    "categoryLabel": "१७. स्वास्थ्यम्",
    "categoryEn": "Health & Wellness",
    "levelBadge": "Body & Ayurveda",
    "words": [
      {
        "devanagari": "शीघ्रं",
        "meaning": "Quickly / Fast",
        "role": "adverb",
        "roleLabel": "क्रियाविशेषणम्"
      },
      {
        "devanagari": "स्वस्थः",
        "meaning": "Healthy / Well",
        "role": "adjective",
        "roleLabel": "विशेषणम् (पुं०)"
      },
      {
        "devanagari": "भवतु",
        "meaning": "Let it be",
        "role": "verb",
        "roleLabel": "भू लोट् प्रथम०"
      }
    ],
    "grammarNote": "Ayurvedic health, wellness conditions, bodily duals (नेत्रे), and gentle recovery wishes."
  },
  {
    "id": "s-168",
    "num": 168,
    "sanskrit": "तस्य दन्तः चलति।",
    "transliteration": "Tasya dantaḥ calati.",
    "english": "His tooth is loose.",
    "category": "wellness",
    "categoryLabel": "१७. स्वास्थ्यम्",
    "categoryEn": "Health & Wellness",
    "levelBadge": "Body & Ayurveda",
    "words": [
      {
        "devanagari": "तस्य",
        "meaning": "His",
        "role": "particle",
        "roleLabel": "षष्ठी-एकवचनम्"
      },
      {
        "devanagari": "दन्तः",
        "meaning": "Tooth",
        "role": "subject",
        "roleLabel": "पुं० प्रथमा"
      },
      {
        "devanagari": "चलति",
        "meaning": "moves / is loose",
        "role": "verb",
        "roleLabel": "चल् लट् प्रथम०"
      }
    ],
    "grammarNote": "Ayurvedic health, wellness conditions, bodily duals (नेत्रे), and gentle recovery wishes."
  },
  {
    "id": "s-169",
    "num": 169,
    "sanskrit": "अहं सम्यक् निद्रां कृतवान्।",
    "transliteration": "Ahaṁ samyak nidrāṁ kṛtavān.",
    "english": "I slept well.",
    "category": "wellness",
    "categoryLabel": "१७. स्वास्थ्यम्",
    "categoryEn": "Health & Wellness",
    "levelBadge": "Body & Ayurveda",
    "words": [
      {
        "devanagari": "अहं",
        "meaning": "I",
        "role": "subject",
        "roleLabel": "अस्मद् प्रथमा"
      },
      {
        "devanagari": "सम्यक्",
        "meaning": "Good / Well / Properly",
        "role": "adverb",
        "roleLabel": "अव्ययम्"
      },
      {
        "devanagari": "निद्रां",
        "meaning": "Sleep",
        "role": "object",
        "roleLabel": "कर्म (द्वितीया)"
      },
      {
        "devanagari": "कृतवान्",
        "meaning": "Did (male past)",
        "role": "verb",
        "roleLabel": "क्तवतु (कृ)"
      }
    ],
    "grammarNote": "Ayurvedic health, wellness conditions, bodily duals (नेत्रे), and gentle recovery wishes."
  },
  {
    "id": "s-170",
    "num": 170,
    "sanskrit": "शुद्धः वायुः आरोग्याय आवश्यकः।",
    "transliteration": "Śuddhaḥ vāyuḥ ārogyāya āvaśyakaḥ.",
    "english": "Clean air is necessary for health.",
    "category": "wellness",
    "categoryLabel": "१७. स्वास्थ्यम्",
    "categoryEn": "Health & Wellness",
    "levelBadge": "Body & Ayurveda",
    "words": [
      {
        "devanagari": "शुद्धः",
        "meaning": "Pure / Clean",
        "role": "adjective",
        "roleLabel": "विशेषणम् (पुं०)"
      },
      {
        "devanagari": "वायुः",
        "meaning": "Air / Wind",
        "role": "subject",
        "roleLabel": "पुं० प्रथमा"
      },
      {
        "devanagari": "आरोग्याय",
        "meaning": "For good health",
        "role": "particle",
        "roleLabel": "चतुर्थी (आरोग्य)"
      },
      {
        "devanagari": "आवश्यकः",
        "meaning": "Essential / Necessary",
        "role": "adjective",
        "roleLabel": "विशेषणम् (पुं०)"
      }
    ],
    "grammarNote": "Ayurvedic health, wellness conditions, bodily duals (नेत्रे), and gentle recovery wishes."
  },
  {
    "id": "s-171",
    "num": 171,
    "sanskrit": "सिंहः वने गर्जति।",
    "transliteration": "Siṁhaḥ vane garjati.",
    "english": "The lion roars in the forest.",
    "category": "nature_animals",
    "categoryLabel": "१८. प्रकृतिः पशवः च",
    "categoryEn": "Nature & Animals",
    "levelBadge": "Vedic Ecology",
    "words": [
      {
        "devanagari": "सिंहः",
        "meaning": "Lion",
        "role": "subject",
        "roleLabel": "पुं० प्रथमा"
      },
      {
        "devanagari": "वने",
        "meaning": "In the forest",
        "role": "adverb",
        "roleLabel": "सप्तमी (वन)"
      },
      {
        "devanagari": "गर्जति",
        "meaning": "roars",
        "role": "verb",
        "roleLabel": "गर्ज लट् प्रथम०"
      }
    ],
    "grammarNote": "Vedic animal kingdom and environmental verbs: गर्जति, ददाति, विकसति, गुञ्जन्ति, शोभन्ते."
  },
  {
    "id": "s-172",
    "num": 172,
    "sanskrit": "धेनुः दुग्धं ददाति।",
    "transliteration": "Dhenuḥ dugdhaṁ dadāti.",
    "english": "The cow gives milk.",
    "category": "nature_animals",
    "categoryLabel": "१८. प्रकृतिः पशवः च",
    "categoryEn": "Nature & Animals",
    "levelBadge": "Vedic Ecology",
    "words": [
      {
        "devanagari": "धेनुः",
        "meaning": "Cow",
        "role": "subject",
        "roleLabel": "उकारान्त स्त्री०"
      },
      {
        "devanagari": "दुग्धं",
        "meaning": "Milk",
        "role": "object",
        "roleLabel": "कर्म (द्वितीया)"
      },
      {
        "devanagari": "ददाति",
        "meaning": "gives",
        "role": "verb",
        "roleLabel": "दा लट् प्रथम०"
      }
    ],
    "grammarNote": "Vedic animal kingdom and environmental verbs: गर्जति, ददाति, विकसति, गुञ्जन्ति, शोभन्ते."
  },
  {
    "id": "s-173",
    "num": 173,
    "sanskrit": "गजः मन्दं चलति।",
    "transliteration": "Gajaḥ mandaṁ calati.",
    "english": "The elephant walks slowly.",
    "category": "nature_animals",
    "categoryLabel": "१८. प्रकृतिः पशवः च",
    "categoryEn": "Nature & Animals",
    "levelBadge": "Vedic Ecology",
    "words": [
      {
        "devanagari": "गजः",
        "meaning": "Elephant",
        "role": "subject",
        "roleLabel": "पुं० प्रथमा"
      },
      {
        "devanagari": "मन्दं",
        "meaning": "Slowly",
        "role": "adverb",
        "roleLabel": "क्रियाविशेषणम्"
      },
      {
        "devanagari": "चलति",
        "meaning": "moves / is loose",
        "role": "verb",
        "roleLabel": "चल् लट् प्रथम०"
      }
    ],
    "grammarNote": "Vedic animal kingdom and environmental verbs: गर्जति, ददाति, विकसति, गुञ्जन्ति, शोभन्ते."
  },
  {
    "id": "s-174",
    "num": 174,
    "sanskrit": "मयूरः वर्षाकाले नृत्यति।",
    "transliteration": "Mayūraḥ varṣākāle nṛtyati.",
    "english": "The peacock dances in the rainy season.",
    "category": "nature_animals",
    "categoryLabel": "१८. प्रकृतिः पशवः च",
    "categoryEn": "Nature & Animals",
    "levelBadge": "Vedic Ecology",
    "words": [
      {
        "devanagari": "मयूरः",
        "meaning": "Peacock",
        "role": "subject",
        "roleLabel": "पुं० प्रथमा"
      },
      {
        "devanagari": "वर्षाकाले",
        "meaning": "In rainy season",
        "role": "adverb",
        "roleLabel": "सप्तमी-एकवचनम्"
      },
      {
        "devanagari": "नृत्यति",
        "meaning": "dances",
        "role": "verb",
        "roleLabel": "नृत् लट् प्रथम०"
      }
    ],
    "grammarNote": "Vedic animal kingdom and environmental verbs: गर्जति, ददाति, विकसति, गुञ्जन्ति, शोभन्ते."
  },
  {
    "id": "s-175",
    "num": 175,
    "sanskrit": "वृक्षाः अस्मभ्यं छायां यच्छन्ति।",
    "transliteration": "Vṛkṣāḥ asmabhyaṁ chāyāṁ yacchanti.",
    "english": "Trees give shade to us.",
    "category": "nature_animals",
    "categoryLabel": "१८. प्रकृतिः पशवः च",
    "categoryEn": "Nature & Animals",
    "levelBadge": "Vedic Ecology",
    "words": [
      {
        "devanagari": "वृक्षाः",
        "meaning": "Trees (plural)",
        "role": "subject",
        "roleLabel": "पुं० बहुवचनम्"
      },
      {
        "devanagari": "अस्मभ्यं",
        "meaning": "To us",
        "role": "particle",
        "roleLabel": "चतुर्थी बहुवचनम्"
      },
      {
        "devanagari": "छायां",
        "meaning": "Shade / Shadow",
        "role": "object",
        "roleLabel": "कर्म (द्वितीया)"
      },
      {
        "devanagari": "यच्छन्ति",
        "meaning": "give (plural)",
        "role": "verb",
        "roleLabel": "दा लट् बहुवचनम्"
      }
    ],
    "grammarNote": "Vedic animal kingdom and environmental verbs: गर्जति, ददाति, विकसति, गुञ्जन्ति, शोभन्ते."
  },
  {
    "id": "s-176",
    "num": 176,
    "sanskrit": "तडागे कमलं विकसति।",
    "transliteration": "Taḍāge kamalaṁ vikasati.",
    "english": "The lotus blooms in the pond.",
    "category": "nature_animals",
    "categoryLabel": "१८. प्रकृतिः पशवः च",
    "categoryEn": "Nature & Animals",
    "levelBadge": "Vedic Ecology",
    "words": [
      {
        "devanagari": "तडागे",
        "meaning": "In the pond / lake",
        "role": "adverb",
        "roleLabel": "सप्तमी (तडाग)"
      },
      {
        "devanagari": "कमलं",
        "meaning": "Lotus",
        "role": "subject",
        "roleLabel": "नपुंसक प्रथमा"
      },
      {
        "devanagari": "विकसति",
        "meaning": "blooms",
        "role": "verb",
        "roleLabel": "वि+कस् लट् प्रथम०"
      }
    ],
    "grammarNote": "Vedic animal kingdom and environmental verbs: गर्जति, ददाति, विकसति, गुञ्जन्ति, शोभन्ते."
  },
  {
    "id": "s-177",
    "num": 177,
    "sanskrit": "शशकः वेगेन धावति।",
    "transliteration": "Śaśakaḥ vegena dhāvati.",
    "english": "The rabbit runs fast.",
    "category": "nature_animals",
    "categoryLabel": "१८. प्रकृतिः पशवः च",
    "categoryEn": "Nature & Animals",
    "levelBadge": "Vedic Ecology",
    "words": [
      {
        "devanagari": "शशकः",
        "meaning": "Rabbit / Hare",
        "role": "subject",
        "roleLabel": "पुं० प्रथमा"
      },
      {
        "devanagari": "वेगेन",
        "meaning": "Fast / With speed",
        "role": "adverb",
        "roleLabel": "तृतीया (क्रियाविशेषणम्)"
      },
      {
        "devanagari": "धावति",
        "meaning": "runs",
        "role": "verb",
        "roleLabel": "धाव् लट् प्रथम०"
      }
    ],
    "grammarNote": "Vedic animal kingdom and environmental verbs: गर्जति, ददाति, विकसति, गुञ्जन्ति, शोभन्ते."
  },
  {
    "id": "s-178",
    "num": 178,
    "sanskrit": "कूर्दति वानरः वृक्षे।",
    "transliteration": "Kūrdati vānaraḥ vṛkṣe.",
    "english": "The monkey jumps on the tree.",
    "category": "nature_animals",
    "categoryLabel": "१८. प्रकृतिः पशवः च",
    "categoryEn": "Nature & Animals",
    "levelBadge": "Vedic Ecology",
    "words": [
      {
        "devanagari": "कूर्दति",
        "meaning": "jumps / leaps",
        "role": "verb",
        "roleLabel": "कूर्द् लट् प्रथम०"
      },
      {
        "devanagari": "वानरः",
        "meaning": "Monkey",
        "role": "subject",
        "roleLabel": "पुं० प्रथमा"
      },
      {
        "devanagari": "वृक्षे",
        "meaning": "On the tree",
        "role": "adverb",
        "roleLabel": "सप्तमी (वृक्ष)"
      }
    ],
    "grammarNote": "Vedic animal kingdom and environmental verbs: गर्जति, ददाति, विकसति, गुञ्जन्ति, शोभन्ते."
  },
  {
    "id": "s-179",
    "num": 179,
    "sanskrit": "भ्रमराः पुष्पे गुञ्जन्ति।",
    "transliteration": "Bhramarāḥ puṣpe guñjanti.",
    "english": "Bees buzz on the flower.",
    "category": "nature_animals",
    "categoryLabel": "१८. प्रकृतिः पशवः च",
    "categoryEn": "Nature & Animals",
    "levelBadge": "Vedic Ecology",
    "words": [
      {
        "devanagari": "भ्रमराः",
        "meaning": "Bees (plural)",
        "role": "subject",
        "roleLabel": "पुं० बहुवचनम्"
      },
      {
        "devanagari": "पुष्पे",
        "meaning": "On the flower",
        "role": "adverb",
        "roleLabel": "सप्तमी (पुष्प)"
      },
      {
        "devanagari": "गुञ्जन्ति",
        "meaning": "buzz / hum (plural)",
        "role": "verb",
        "roleLabel": "गुञ्ज् लट् बहु०"
      }
    ],
    "grammarNote": "Vedic animal kingdom and environmental verbs: गर्जति, ददाति, विकसति, गुञ्जन्ति, शोभन्ते."
  },
  {
    "id": "s-180",
    "num": 180,
    "sanskrit": "आकाशे तारकाः शोभन्ते।",
    "transliteration": "Ākāśe tārakāḥ śobhante.",
    "english": "Stars look beautiful in the sky.",
    "category": "nature_animals",
    "categoryLabel": "१८. प्रकृतिः पशवः च",
    "categoryEn": "Nature & Animals",
    "levelBadge": "Vedic Ecology",
    "words": [
      {
        "devanagari": "आकाशे",
        "meaning": "In the sky",
        "role": "adverb",
        "roleLabel": "सप्तमी (आकाश)"
      },
      {
        "devanagari": "तारकाः",
        "meaning": "Stars (plural)",
        "role": "subject",
        "roleLabel": "स्त्री० बहुवचनम्"
      },
      {
        "devanagari": "शोभन्ते",
        "meaning": "shine / look beautiful",
        "role": "verb",
        "roleLabel": "शुभ् लट् आत्मने बहु०"
      }
    ],
    "grammarNote": "Vedic animal kingdom and environmental verbs: गर्जति, ददाति, विकसति, गुञ्जन्ति, शोभन्ते."
  },
  {
    "id": "s-181",
    "num": 181,
    "sanskrit": "अहं शिक्षकः भवितुम् इच्छामि।",
    "transliteration": "Ahaṁ śikṣakaḥ bhavitum icchāmi.",
    "english": "I want to become a teacher.",
    "category": "intentions",
    "categoryLabel": "१९. इच्छा-भूतकालः",
    "categoryEn": "Intentions & Past Forms",
    "levelBadge": "Advanced Verb Tenses",
    "words": [
      {
        "devanagari": "अहं",
        "meaning": "I",
        "role": "subject",
        "roleLabel": "अस्मद् प्रथमा"
      },
      {
        "devanagari": "शिक्षकः",
        "meaning": "Teacher (male)",
        "role": "subject",
        "roleLabel": "विधेयम् (पुं०)"
      },
      {
        "devanagari": "भवितुम्",
        "meaning": "To become",
        "role": "verb",
        "roleLabel": "तुमुन् (भू)"
      },
      {
        "devanagari": "इच्छामि",
        "meaning": "desire / want (I)",
        "role": "verb",
        "roleLabel": "इष् लट् उत्तम०"
      }
    ],
    "grammarNote": "Intentional verbs with इच्छामि, past perfect compounds (गतवान् आसीत्), and past habitual स्म."
  },
  {
    "id": "s-182",
    "num": 182,
    "sanskrit": "सः आपणं गतवान् आसीत्।",
    "transliteration": "Saḥ āpaṇaṁ gatavān āsīt.",
    "english": "He had gone to the shop.",
    "category": "intentions",
    "categoryLabel": "१९. इच्छा-भूतकालः",
    "categoryEn": "Intentions & Past Forms",
    "levelBadge": "Advanced Verb Tenses",
    "words": [
      {
        "devanagari": "सः",
        "meaning": "He",
        "role": "subject",
        "roleLabel": "तद् पुं० प्रथमा"
      },
      {
        "devanagari": "आपणं",
        "meaning": "To the shop",
        "role": "object",
        "roleLabel": "कर्म (स्थानम्)"
      },
      {
        "devanagari": "गतवान्",
        "meaning": "Went (male past)",
        "role": "verb",
        "roleLabel": "क्तवतु (गम्)"
      },
      {
        "devanagari": "आसीत्",
        "meaning": "had / was",
        "role": "verb",
        "roleLabel": "अस् लङ् लकारः"
      }
    ],
    "grammarNote": "Intentional verbs with इच्छामि, past perfect compounds (गतवान् आसीत्), and past habitual स्म."
  },
  {
    "id": "s-183",
    "num": 183,
    "sanskrit": "वयं श्वः परीक्षां लेखिष्यामः।",
    "transliteration": "Vayaṁ śvaḥ parīkṣāṁ lekhiṣyāmaḥ.",
    "english": "We will write the exam tomorrow.",
    "category": "intentions",
    "categoryLabel": "१९. इच्छा-भूतकालः",
    "categoryEn": "Intentions & Past Forms",
    "levelBadge": "Advanced Verb Tenses",
    "words": [
      {
        "devanagari": "वयं",
        "meaning": "We",
        "role": "subject",
        "roleLabel": "अस्मद् प्रथमा बहु०"
      },
      {
        "devanagari": "श्वः",
        "meaning": "Tomorrow",
        "role": "adverb",
        "roleLabel": "अव्ययम्"
      },
      {
        "devanagari": "परीक्षां",
        "meaning": "परीक्षां",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "लेखिष्यामः",
        "meaning": "will write (we)",
        "role": "verb",
        "roleLabel": "लिख् लृट् उत्तम बहु०"
      }
    ],
    "grammarNote": "Intentional verbs with इच्छामि, past perfect compounds (गतवान् आसीत्), and past habitual स्म."
  },
  {
    "id": "s-184",
    "num": 184,
    "sanskrit": "त्वं मम सन्देशं प्राप्तवान् किम्?",
    "transliteration": "Tvaṁ mama sandeśaṁ prāptavān kim?",
    "english": "Did you receive my message?",
    "category": "intentions",
    "categoryLabel": "१९. इच्छा-भूतकालः",
    "categoryEn": "Intentions & Past Forms",
    "levelBadge": "Advanced Verb Tenses",
    "words": [
      {
        "devanagari": "त्वं",
        "meaning": "You",
        "role": "subject",
        "roleLabel": "युष्मद् प्रथमा"
      },
      {
        "devanagari": "मम",
        "meaning": "My",
        "role": "particle",
        "roleLabel": "षष्ठी-एकवचनम्"
      },
      {
        "devanagari": "सन्देशं",
        "meaning": "Message",
        "role": "object",
        "roleLabel": "कर्म (द्वितीया)"
      },
      {
        "devanagari": "प्राप्तवान्",
        "meaning": "Received / Got (past)",
        "role": "verb",
        "roleLabel": "प्र+आप् क्तवतु"
      },
      {
        "devanagari": "किम्",
        "meaning": "What?",
        "role": "adverb",
        "roleLabel": "प्रश्नवाचकम्"
      }
    ],
    "grammarNote": "Intentional verbs with इच्छामि, past perfect compounds (गतवान् आसीत्), and past habitual स्म."
  },
  {
    "id": "s-185",
    "num": 185,
    "sanskrit": "सा गृहकार्यं समापितवती।",
    "transliteration": "Sā gṛhakāryaṁ samāpitavatī.",
    "english": "She completed her homework.",
    "category": "intentions",
    "categoryLabel": "१९. इच्छा-भूतकालः",
    "categoryEn": "Intentions & Past Forms",
    "levelBadge": "Advanced Verb Tenses",
    "words": [
      {
        "devanagari": "सा",
        "meaning": "She",
        "role": "subject",
        "roleLabel": "तद् स्त्री० प्रथमा"
      },
      {
        "devanagari": "गृहकार्यं",
        "meaning": "Homework",
        "role": "object",
        "roleLabel": "कर्म (द्वितीया)"
      },
      {
        "devanagari": "समापितवती",
        "meaning": "Completed (female past)",
        "role": "verb",
        "roleLabel": "सं+आप् णिच् क्तवतु स्त्री०"
      }
    ],
    "grammarNote": "Intentional verbs with इच्छामि, past perfect compounds (गतवान् आसीत्), and past habitual स्म."
  },
  {
    "id": "s-186",
    "num": 186,
    "sanskrit": "ते सत्यं ज्ञातवन्तः।",
    "transliteration": "Te satyaṁ jñātavantaḥ.",
    "english": "They came to know the truth.",
    "category": "intentions",
    "categoryLabel": "१९. इच्छा-भूतकालः",
    "categoryEn": "Intentions & Past Forms",
    "levelBadge": "Advanced Verb Tenses",
    "words": [
      {
        "devanagari": "ते",
        "meaning": "They",
        "role": "subject",
        "roleLabel": "तद् पुं० बहु०"
      },
      {
        "devanagari": "सत्यं",
        "meaning": "Truth",
        "role": "object",
        "roleLabel": "कर्म (द्वितीया)"
      },
      {
        "devanagari": "ज्ञातवन्तः",
        "meaning": "Came to know (plural past)",
        "role": "verb",
        "roleLabel": "ज्ञा क्तवतु बहु०"
      }
    ],
    "grammarNote": "Intentional verbs with इच्छामि, past perfect compounds (गतवान् आसीत्), and past habitual स्म."
  },
  {
    "id": "s-187",
    "num": 187,
    "sanskrit": "अहं तत्र न गमिष्यामि।",
    "transliteration": "Ahaṁ tatra na gamiṣyāmi.",
    "english": "I will not go there.",
    "category": "intentions",
    "categoryLabel": "१९. इच्छा-भूतकालः",
    "categoryEn": "Intentions & Past Forms",
    "levelBadge": "Advanced Verb Tenses",
    "words": [
      {
        "devanagari": "अहं",
        "meaning": "I",
        "role": "subject",
        "roleLabel": "अस्मद् प्रथमा"
      },
      {
        "devanagari": "तत्र",
        "meaning": "There",
        "role": "adverb",
        "roleLabel": "अव्ययम्"
      },
      {
        "devanagari": "न",
        "meaning": "Not",
        "role": "particle",
        "roleLabel": "निषेधार्थक-अव्ययम्"
      },
      {
        "devanagari": "गमिष्यामि",
        "meaning": "will go (I)",
        "role": "verb",
        "roleLabel": "गम् लृट् उत्तम०"
      }
    ],
    "grammarNote": "Intentional verbs with इच्छामि, past perfect compounds (गतवान् आसीत्), and past habitual स्म."
  },
  {
    "id": "s-188",
    "num": 188,
    "sanskrit": "माता भोजनं पचति स्म।",
    "transliteration": "Mātā bhojanaṁ pacati sma.",
    "english": "Mother used to cook / was cooking food.",
    "category": "intentions",
    "categoryLabel": "१९. इच्छा-भूतकालः",
    "categoryEn": "Intentions & Past Forms",
    "levelBadge": "Advanced Verb Tenses",
    "words": [
      {
        "devanagari": "माता",
        "meaning": "Mother",
        "role": "subject",
        "roleLabel": "मातृ प्रथमा"
      },
      {
        "devanagari": "भोजनं",
        "meaning": "Meal",
        "role": "object",
        "roleLabel": "कर्म (द्वितीया)"
      },
      {
        "devanagari": "पचति",
        "meaning": "cooks",
        "role": "verb",
        "roleLabel": "पच् लट् प्रथम०"
      },
      {
        "devanagari": "स्म",
        "meaning": "used to (past indicator)",
        "role": "particle",
        "roleLabel": "भूतकाल-अव्ययम्"
      }
    ],
    "grammarNote": "Intentional verbs with इच्छामि, past perfect compounds (गतवान् आसीत्), and past habitual स्म."
  },
  {
    "id": "s-189",
    "num": 189,
    "sanskrit": "बालकः रोदनं कृतवान्।",
    "transliteration": "Bālakaḥ rodanaṁ kṛtavān.",
    "english": "The boy cried.",
    "category": "intentions",
    "categoryLabel": "१९. इच्छा-भूतकालः",
    "categoryEn": "Intentions & Past Forms",
    "levelBadge": "Advanced Verb Tenses",
    "words": [
      {
        "devanagari": "बालकः",
        "meaning": "Boy",
        "role": "subject",
        "roleLabel": "पुं० प्रथमा"
      },
      {
        "devanagari": "रोदनं",
        "meaning": "Crying / Weeping",
        "role": "object",
        "roleLabel": "कर्म (द्वितीया)"
      },
      {
        "devanagari": "कृतवान्",
        "meaning": "Did (male past)",
        "role": "verb",
        "roleLabel": "क्तवतु (कृ)"
      }
    ],
    "grammarNote": "Intentional verbs with इच्छामि, past perfect compounds (गतवान् आसीत्), and past habitual स्म."
  },
  {
    "id": "s-190",
    "num": 190,
    "sanskrit": "यूयं कथं विस्मृतवन्तः?",
    "transliteration": "Yūyaṁ kathaṁ vismṛtavantaḥ?",
    "english": "How did you all forget?",
    "category": "intentions",
    "categoryLabel": "१९. इच्छा-भूतकालः",
    "categoryEn": "Intentions & Past Forms",
    "levelBadge": "Advanced Verb Tenses",
    "words": [
      {
        "devanagari": "यूयं",
        "meaning": "You all",
        "role": "subject",
        "roleLabel": "युष्मद् बहुवचनम्"
      },
      {
        "devanagari": "कथं",
        "meaning": "कथं",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "विस्मृतवन्तः",
        "meaning": "Forgot (plural past)",
        "role": "verb",
        "roleLabel": "वि+स्मृ क्तवतु बहु०"
      }
    ],
    "grammarNote": "Intentional verbs with इच्छामि, past perfect compounds (गतवान् आसीत्), and past habitual स्म."
  },
  {
    "id": "s-191",
    "num": 191,
    "sanskrit": "चिन्ता मा कुरु।",
    "transliteration": "Cintā mā kuru.",
    "english": "Do not worry.",
    "category": "conversation",
    "categoryLabel": "२०. लघु सम्भाषणम्",
    "categoryEn": "Spoken Sanskrit Idioms",
    "levelBadge": "Fluid Dialogue",
    "words": [
      {
        "devanagari": "चिन्ता",
        "meaning": "Worry / Anxiety",
        "role": "object",
        "roleLabel": "कर्म (द्वितीया)"
      },
      {
        "devanagari": "मा",
        "meaning": "Do not",
        "role": "particle",
        "roleLabel": "निषेधार्थक-अव्ययम्"
      },
      {
        "devanagari": "कुरु",
        "meaning": "Do! (order)",
        "role": "verb",
        "roleLabel": "कृ लोट् मध्यम०"
      }
    ],
    "grammarNote": "Natural spoken Sanskrit conversation idioms for everyday warmth and fluency."
  },
  {
    "id": "s-192",
    "num": 192,
    "sanskrit": "सर्वं कुशलं वा?",
    "transliteration": "Sarvaṁ kuśalaṁ vā?",
    "english": "Is everything fine?",
    "category": "conversation",
    "categoryLabel": "२०. लघु सम्भाषणम्",
    "categoryEn": "Spoken Sanskrit Idioms",
    "levelBadge": "Fluid Dialogue",
    "words": [
      {
        "devanagari": "सर्वं",
        "meaning": "All / Everything",
        "role": "subject",
        "roleLabel": "नपुंसक प्रथमा"
      },
      {
        "devanagari": "कुशलं",
        "meaning": "Well / Fine / Auspicious",
        "role": "adjective",
        "roleLabel": "विशेषणम्"
      },
      {
        "devanagari": "वा",
        "meaning": "or? / is it?",
        "role": "particle",
        "roleLabel": "प्रश्नवाचक-अव्ययम्"
      }
    ],
    "grammarNote": "Natural spoken Sanskrit conversation idioms for everyday warmth and fluency."
  },
  {
    "id": "s-193",
    "num": 193,
    "sanskrit": "अहं शीघ्रं आगच्छामि।",
    "transliteration": "Ahaṁ śīghraṁ āgacchāmi.",
    "english": "I am coming quickly.",
    "category": "conversation",
    "categoryLabel": "२०. लघु सम्भाषणम्",
    "categoryEn": "Spoken Sanskrit Idioms",
    "levelBadge": "Fluid Dialogue",
    "words": [
      {
        "devanagari": "अहं",
        "meaning": "I",
        "role": "subject",
        "roleLabel": "अस्मद् प्रथमा"
      },
      {
        "devanagari": "शीघ्रं",
        "meaning": "Quickly / Fast",
        "role": "adverb",
        "roleLabel": "क्रियाविशेषणम्"
      },
      {
        "devanagari": "आगच्छामि",
        "meaning": "am coming",
        "role": "verb",
        "roleLabel": "आ+गम् लट् उत्तम०"
      }
    ],
    "grammarNote": "Natural spoken Sanskrit conversation idioms for everyday warmth and fluency."
  },
  {
    "id": "s-194",
    "num": 194,
    "sanskrit": "एषः मम अपराधः नास्ति।",
    "transliteration": "Eṣaḥ mama aparādhaḥ nāsti.",
    "english": "This is not my fault.",
    "category": "conversation",
    "categoryLabel": "२०. लघु सम्भाषणम्",
    "categoryEn": "Spoken Sanskrit Idioms",
    "levelBadge": "Fluid Dialogue",
    "words": [
      {
        "devanagari": "एषः",
        "meaning": "This",
        "role": "subject",
        "roleLabel": "पुं० प्रथमा"
      },
      {
        "devanagari": "मम",
        "meaning": "My",
        "role": "particle",
        "roleLabel": "षष्ठी-एकवचनम्"
      },
      {
        "devanagari": "अपराधः",
        "meaning": "Fault / Mistake / Crime",
        "role": "subject",
        "roleLabel": "पुं० प्रथमा"
      },
      {
        "devanagari": "नास्ति",
        "meaning": "is not (न + अस्ति)",
        "role": "verb",
        "roleLabel": "क्रियापदम्"
      }
    ],
    "grammarNote": "Natural spoken Sanskrit conversation idioms for everyday warmth and fluency."
  },
  {
    "id": "s-195",
    "num": 195,
    "sanskrit": "भवतः साहाय्यं आवश्यकम्।",
    "transliteration": "Bhavataḥ sāhāyyaṁ āvaśyakam.",
    "english": "Your help is needed.",
    "category": "conversation",
    "categoryLabel": "२०. लघु सम्भाषणम्",
    "categoryEn": "Spoken Sanskrit Idioms",
    "levelBadge": "Fluid Dialogue",
    "words": [
      {
        "devanagari": "भवतः",
        "meaning": "भवतः",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "साहाय्यं",
        "meaning": "Help / Assistance",
        "role": "subject",
        "roleLabel": "नपुंसक प्रथमा"
      },
      {
        "devanagari": "आवश्यकम्",
        "meaning": "Required / Needed",
        "role": "adjective",
        "roleLabel": "विशेषणम्"
      }
    ],
    "grammarNote": "Natural spoken Sanskrit conversation idioms for everyday warmth and fluency."
  },
  {
    "id": "s-196",
    "num": 196,
    "sanskrit": "भवतु, नाम।",
    "transliteration": "Bhavatu, nāma.",
    "english": "Let it be so / Alright.",
    "category": "conversation",
    "categoryLabel": "२०. लघु सम्भाषणम्",
    "categoryEn": "Spoken Sanskrit Idioms",
    "levelBadge": "Fluid Dialogue",
    "words": [
      {
        "devanagari": "भवतु",
        "meaning": "Let it be",
        "role": "verb",
        "roleLabel": "भू लोट् प्रथम०"
      },
      {
        "devanagari": "नाम",
        "meaning": "So / Indeed",
        "role": "particle",
        "roleLabel": "अव्ययम्"
      }
    ],
    "grammarNote": "Natural spoken Sanskrit conversation idioms for everyday warmth and fluency."
  },
  {
    "id": "s-197",
    "num": 197,
    "sanskrit": "अहं तं न जानामि।",
    "transliteration": "Ahaṁ taṁ na jānāmi.",
    "english": "I do not know him.",
    "category": "conversation",
    "categoryLabel": "२०. लघु सम्भाषणम्",
    "categoryEn": "Spoken Sanskrit Idioms",
    "levelBadge": "Fluid Dialogue",
    "words": [
      {
        "devanagari": "अहं",
        "meaning": "I",
        "role": "subject",
        "roleLabel": "अस्मद् प्रथमा"
      },
      {
        "devanagari": "तं",
        "meaning": "Him",
        "role": "object",
        "roleLabel": "तद् द्वितीया-एक०"
      },
      {
        "devanagari": "न",
        "meaning": "Not",
        "role": "particle",
        "roleLabel": "निषेधार्थक-अव्ययम्"
      },
      {
        "devanagari": "जानामि",
        "meaning": "know (I)",
        "role": "verb",
        "roleLabel": "ज्ञा लट् उत्तम०"
      }
    ],
    "grammarNote": "Natural spoken Sanskrit conversation idioms for everyday warmth and fluency."
  },
  {
    "id": "s-198",
    "num": 198,
    "sanskrit": "एतत् सत्यं भाति।",
    "transliteration": "Etat satyaṁ bhāti.",
    "english": "This seems true.",
    "category": "conversation",
    "categoryLabel": "२०. लघु सम्भाषणम्",
    "categoryEn": "Spoken Sanskrit Idioms",
    "levelBadge": "Fluid Dialogue",
    "words": [
      {
        "devanagari": "एतत्",
        "meaning": "This (neuter)",
        "role": "subject",
        "roleLabel": "प्रथमा (एतद्)"
      },
      {
        "devanagari": "सत्यं",
        "meaning": "Truth",
        "role": "object",
        "roleLabel": "कर्म (द्वितीया)"
      },
      {
        "devanagari": "भाति",
        "meaning": "seems / appears / shines",
        "role": "verb",
        "roleLabel": "भा लट् प्रथम०"
      }
    ],
    "grammarNote": "Natural spoken Sanskrit conversation idioms for everyday warmth and fluency."
  },
  {
    "id": "s-199",
    "num": 199,
    "sanskrit": "वयम् एकत्रीभवामः।",
    "transliteration": "Vayaṁ ekatrībhavāmaḥ.",
    "english": "Let us gather together.",
    "category": "conversation",
    "categoryLabel": "२०. लघु सम्भाषणम्",
    "categoryEn": "Spoken Sanskrit Idioms",
    "levelBadge": "Fluid Dialogue",
    "words": [
      {
        "devanagari": "वयम्",
        "meaning": "वयम्",
        "role": "particle",
        "roleLabel": "पदम्"
      },
      {
        "devanagari": "एकत्रीभवामः",
        "meaning": "gather together (we)",
        "role": "verb",
        "roleLabel": "एकत्री+भू लट् उत्तम बहु०"
      }
    ],
    "grammarNote": "Natural spoken Sanskrit conversation idioms for everyday warmth and fluency."
  },
  {
    "id": "s-200",
    "num": 200,
    "sanskrit": "पुनर्मिलामः।",
    "transliteration": "Punarmilāmaḥ.",
    "english": "See you again / Goodbye.",
    "category": "conversation",
    "categoryLabel": "२०. लघु सम्भाषणम्",
    "categoryEn": "Spoken Sanskrit Idioms",
    "levelBadge": "Fluid Dialogue",
    "words": [
      {
        "devanagari": "पुनर्मिलामः",
        "meaning": "See you again / Let us meet again",
        "role": "verb",
        "roleLabel": "पुनर् + मिल् लट् उत्तम बहु०"
      }
    ],
    "grammarNote": "Natural spoken Sanskrit conversation idioms for everyday warmth and fluency."
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

// Puzzles generated from all 200 Sentences for practice mode
export const SENTENCES_200_PUZZLES: SentencePuzzleItem[] = [
  {
    "id": "puz-200-1",
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
    "id": "puz-200-2",
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
    "id": "puz-200-3",
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
    "id": "puz-200-4",
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
    "id": "puz-200-5",
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
    "id": "puz-200-6",
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
    "id": "puz-200-7",
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
    "id": "puz-200-8",
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
    "id": "puz-200-9",
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
    "id": "puz-200-10",
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
    "id": "puz-200-11",
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
    "id": "puz-200-12",
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
    "id": "puz-200-13",
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
    "id": "puz-200-14",
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
    "id": "puz-200-15",
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
    "id": "puz-200-16",
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
    "id": "puz-200-17",
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
    "id": "puz-200-18",
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
    "id": "puz-200-19",
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
    "id": "puz-200-20",
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
    "id": "puz-200-21",
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
    "id": "puz-200-22",
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
    "id": "puz-200-23",
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
    "id": "puz-200-24",
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
    "id": "puz-200-25",
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
    "id": "puz-200-26",
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
    "id": "puz-200-27",
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
    "id": "puz-200-28",
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
    "id": "puz-200-29",
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
    "id": "puz-200-30",
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
    "id": "puz-200-31",
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
    "id": "puz-200-32",
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
    "id": "puz-200-33",
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
    "id": "puz-200-34",
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
    "id": "puz-200-35",
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
    "id": "puz-200-36",
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
    "id": "puz-200-37",
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
    "id": "puz-200-38",
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
    "id": "puz-200-39",
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
    "id": "puz-200-40",
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
    "id": "puz-200-41",
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
    "id": "puz-200-42",
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
    "id": "puz-200-43",
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
    "id": "puz-200-44",
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
    "id": "puz-200-45",
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
    "id": "puz-200-46",
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
    "id": "puz-200-47",
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
    "id": "puz-200-48",
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
    "id": "puz-200-49",
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
    "id": "puz-200-50",
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
    "id": "puz-200-51",
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
    "id": "puz-200-52",
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
    "id": "puz-200-53",
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
    "id": "puz-200-54",
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
    "id": "puz-200-55",
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
    "id": "puz-200-56",
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
    "id": "puz-200-57",
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
    "id": "puz-200-58",
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
    "id": "puz-200-59",
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
    "id": "puz-200-60",
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
    "id": "puz-200-61",
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
    "id": "puz-200-62",
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
    "id": "puz-200-63",
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
    "id": "puz-200-64",
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
    "id": "puz-200-65",
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
    "id": "puz-200-66",
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
    "id": "puz-200-67",
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
    "id": "puz-200-68",
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
    "id": "puz-200-69",
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
    "id": "puz-200-70",
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
    "id": "puz-200-71",
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
    "id": "puz-200-72",
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
    "id": "puz-200-73",
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
    "id": "puz-200-74",
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
    "id": "puz-200-75",
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
    "id": "puz-200-76",
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
    "id": "puz-200-77",
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
    "id": "puz-200-78",
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
    "id": "puz-200-79",
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
    "id": "puz-200-80",
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
    "id": "puz-200-81",
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
    "id": "puz-200-82",
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
    "id": "puz-200-83",
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
    "id": "puz-200-84",
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
    "id": "puz-200-85",
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
    "id": "puz-200-86",
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
    "id": "puz-200-87",
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
    "id": "puz-200-88",
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
    "id": "puz-200-89",
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
    "id": "puz-200-90",
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
    "id": "puz-200-91",
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
    "id": "puz-200-92",
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
    "id": "puz-200-93",
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
    "id": "puz-200-94",
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
    "id": "puz-200-95",
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
    "id": "puz-200-96",
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
    "id": "puz-200-97",
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
    "id": "puz-200-98",
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
    "id": "puz-200-99",
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
    "id": "puz-200-100",
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
  },
  {
    "id": "puz-200-101",
    "english": "What is this?",
    "correctOrder": [
      "एतत्",
      "किम्",
      "अस्ति?"
    ],
    "scrambled": [
      "अस्ति?",
      "किम्",
      "एतत्"
    ],
    "hint": "Etat kim asti?",
    "explanation": "एतत् किम् अस्ति? (What is this?)",
    "category": "questions"
  },
  {
    "id": "puz-200-102",
    "english": "How are you? (to a male)",
    "correctOrder": [
      "भवान्",
      "कथम्",
      "अस्ति?"
    ],
    "scrambled": [
      "अस्ति?",
      "कथम्",
      "भवान्"
    ],
    "hint": "Bhavān katham asti?",
    "explanation": "भवान् कथम् अस्ति? (How are you? (to a male))",
    "category": "questions"
  },
  {
    "id": "puz-200-103",
    "english": "How are you? (to a female)",
    "correctOrder": [
      "भवती",
      "कथम्",
      "अस्ति?"
    ],
    "scrambled": [
      "अस्ति?",
      "कथम्",
      "भवती"
    ],
    "hint": "Bhavatī katham asti?",
    "explanation": "भवती कथम् अस्ति? (How are you? (to a female))",
    "category": "questions"
  },
  {
    "id": "puz-200-104",
    "english": "Is it difficult?",
    "correctOrder": [
      "किं",
      "कष्टम्",
      "अस्ति?"
    ],
    "scrambled": [
      "अस्ति?",
      "कष्टम्",
      "किं"
    ],
    "hint": "Kiṁ kaṣṭam asti?",
    "explanation": "किं कष्टम् अस्ति? (Is it difficult?)",
    "category": "questions"
  },
  {
    "id": "puz-200-105",
    "english": "Where is the way/road?",
    "correctOrder": [
      "मार्गः",
      "कुत्र",
      "अस्ति?"
    ],
    "scrambled": [
      "अस्ति?",
      "कुत्र",
      "मार्गः"
    ],
    "hint": "Mārgaḥ kutra asti?",
    "explanation": "मार्गः कुत्र अस्ति? (Where is the way/road?)",
    "category": "questions"
  },
  {
    "id": "puz-200-106",
    "english": "Why are you laughing?",
    "correctOrder": [
      "त्वं",
      "किमर्थं",
      "हससि?"
    ],
    "scrambled": [
      "हससि?",
      "किमर्थं",
      "त्वं"
    ],
    "hint": "Tvaṁ kimarthaṁ hasasi?",
    "explanation": "त्वं किमर्थं हससि? (Why are you laughing?)",
    "category": "questions"
  },
  {
    "id": "puz-200-107",
    "english": "Whose brother is he?",
    "correctOrder": [
      "सः",
      "कस्य",
      "भ्राता?"
    ],
    "scrambled": [
      "भ्राता?",
      "कस्य",
      "सः"
    ],
    "hint": "Saḥ kasya bhrātā?",
    "explanation": "सः कस्य भ्राता? (Whose brother is he?)",
    "category": "questions"
  },
  {
    "id": "puz-200-108",
    "english": "Whose sister is she?",
    "correctOrder": [
      "सा",
      "कस्य",
      "भगिनी?"
    ],
    "scrambled": [
      "भगिनी?",
      "कस्य",
      "सा"
    ],
    "hint": "Sā kasya bhaginī?",
    "explanation": "सा कस्य भगिनी? (Whose sister is she?)",
    "category": "questions"
  },
  {
    "id": "puz-200-109",
    "english": "What is its price?",
    "correctOrder": [
      "अस्य",
      "मूल्यं",
      "किम्?"
    ],
    "scrambled": [
      "किम्?",
      "मूल्यं",
      "अस्य"
    ],
    "hint": "Asya mūlyaṁ kim?",
    "explanation": "अस्य मूल्यं किम्? (What is its price?)",
    "category": "questions"
  },
  {
    "id": "puz-200-110",
    "english": "Please say it again.",
    "correctOrder": [
      "पुनः",
      "वदतु",
      "कृपया।"
    ],
    "scrambled": [
      "कृपया।",
      "वदतु",
      "पुनः"
    ],
    "hint": "Punaḥ vadatu kṛpayā.",
    "explanation": "पुनः वदतु कृपया। (Please say it again.)",
    "category": "questions"
  },
  {
    "id": "puz-200-111",
    "english": "The book is on the table.",
    "correctOrder": [
      "उत्पीठिकायां",
      "पुस्तकं",
      "वर्तते।"
    ],
    "scrambled": [
      "वर्तते।",
      "पुस्तकं",
      "उत्पीठिकायां"
    ],
    "hint": "Utpīṭhikāyām pustakaṁ vartate.",
    "explanation": "उत्पीठिकायां पुस्तकं वर्तते। (The book is on the table.)",
    "category": "locations"
  },
  {
    "id": "puz-200-112",
    "english": "There is no money in the bag.",
    "correctOrder": [
      "स्यूते",
      "धनं",
      "नास्ति।"
    ],
    "scrambled": [
      "नास्ति।",
      "धनं",
      "स्यूते"
    ],
    "hint": "Syūte dhanaṁ nāsti.",
    "explanation": "स्यूते धनं नास्ति। (There is no money in the bag.)",
    "category": "locations"
  },
  {
    "id": "puz-200-113",
    "english": "There is a tree in front of the house.",
    "correctOrder": [
      "गृहस्य",
      "पुरतः",
      "वृक्षः",
      "अस्ति।"
    ],
    "scrambled": [
      "अस्ति।",
      "वृक्षः",
      "पुरतः",
      "गृहस्य"
    ],
    "hint": "Gṛhasya purataḥ vṛkṣaḥ asti.",
    "explanation": "गृहस्य पुरतः वृक्षः अस्ति। (There is a tree in front of the house.)",
    "category": "locations"
  },
  {
    "id": "puz-200-114",
    "english": "The playground is behind the school.",
    "correctOrder": [
      "विद्यालयस्य",
      "पृष्ठतः",
      "क्रीडाङ्गणम्।"
    ],
    "scrambled": [
      "क्रीडाङ्गणम्।",
      "पृष्ठतः",
      "विद्यालयस्य"
    ],
    "hint": "Vidyālayasya pṛṣṭhataḥ krīḍāṅgaṇam.",
    "explanation": "विद्यालयस्य पृष्ठतः क्रीडाङ्गणम्। (The playground is behind the school.)",
    "category": "locations"
  },
  {
    "id": "puz-200-115",
    "english": "There is a shop near the river.",
    "correctOrder": [
      "नद्याः",
      "समीपे",
      "आपणः",
      "अस्ति।"
    ],
    "scrambled": [
      "अस्ति।",
      "आपणः",
      "समीपे",
      "नद्याः"
    ],
    "hint": "Nadyāḥ samīpe āpaṇaḥ asti.",
    "explanation": "नद्याः समीपे आपणः अस्ति। (There is a shop near the river.)",
    "category": "locations"
  },
  {
    "id": "puz-200-116",
    "english": "Go far from the city.",
    "correctOrder": [
      "नगरात्",
      "दूरं",
      "गच्छ।"
    ],
    "scrambled": [
      "गच्छ।",
      "दूरं",
      "नगरात्"
    ],
    "hint": "Nagarāt dūraṁ gaccha.",
    "explanation": "नगरात् दूरं गच्छ। (Go far from the city.)",
    "category": "locations"
  },
  {
    "id": "puz-200-117",
    "english": "The traveler sits under the tree.",
    "correctOrder": [
      "वृक्षस्य",
      "अधः",
      "पथिकः",
      "उपविशति।"
    ],
    "scrambled": [
      "उपविशति।",
      "पथिकः",
      "अधः",
      "वृक्षस्य"
    ],
    "hint": "Vṛkṣasya adhaḥ pathikaḥ upaviśati.",
    "explanation": "वृक्षस्य अधः पथिकः उपविशति। (The traveler sits under the tree.)",
    "category": "locations"
  },
  {
    "id": "puz-200-118",
    "english": "Birds are high up in the sky.",
    "correctOrder": [
      "आकाशस्य",
      "उपरि",
      "खगाः",
      "सन्ति।"
    ],
    "scrambled": [
      "सन्ति।",
      "खगाः",
      "उपरि",
      "आकाशस्य"
    ],
    "hint": "Ākāśasya upari khagāḥ santi.",
    "explanation": "आकाशस्य उपरि खगाः सन्ति। (Birds are high up in the sky.)",
    "category": "locations"
  },
  {
    "id": "puz-200-119",
    "english": "I am in the room.",
    "correctOrder": [
      "अहं",
      "कोष्ठे",
      "अस्मि।"
    ],
    "scrambled": [
      "अस्मि।",
      "कोष्ठे",
      "अहं"
    ],
    "hint": "Ahaṁ koṣṭhe asmi.",
    "explanation": "अहं कोष्ठे अस्मि। (I am in the room.)",
    "category": "locations"
  },
  {
    "id": "puz-200-120",
    "english": "He lives in Delhi.",
    "correctOrder": [
      "सः",
      "देहल्यां",
      "वसति।"
    ],
    "scrambled": [
      "वसति।",
      "देहल्यां",
      "सः"
    ],
    "hint": "Saḥ dehalyāṁ vasati.",
    "explanation": "सः देहल्यां वसति। (He lives in Delhi.)",
    "category": "locations"
  },
  {
    "id": "puz-200-121",
    "english": "This path is straight/easy.",
    "correctOrder": [
      "एषः",
      "मार्गः",
      "सरलः",
      "अस्ति।"
    ],
    "scrambled": [
      "अस्ति।",
      "सरलः",
      "मार्गः",
      "एषः"
    ],
    "hint": "Eṣaḥ mārgaḥ saralaḥ asti.",
    "explanation": "एषः मार्गः सरलः अस्ति। (This path is straight/easy.)",
    "category": "adjectives"
  },
  {
    "id": "puz-200-122",
    "english": "That cloth is red.",
    "correctOrder": [
      "तद्",
      "वस्त्रं",
      "रक्तवर्णं",
      "वर्तते।"
    ],
    "scrambled": [
      "वर्तते।",
      "रक्तवर्णं",
      "वस्त्रं",
      "तद्"
    ],
    "hint": "Tad vastraṁ raktavarṇaṁ vartate.",
    "explanation": "तद् वस्त्रं रक्तवर्णं वर्तते। (That cloth is red.)",
    "category": "adjectives"
  },
  {
    "id": "puz-200-123",
    "english": "This boy is clever.",
    "correctOrder": [
      "अयं",
      "बालकः",
      "चतुरः",
      "अस्ति।"
    ],
    "scrambled": [
      "अस्ति।",
      "चतुरः",
      "बालकः",
      "अयं"
    ],
    "hint": "Ayaṁ bālakaḥ caturaḥ asti.",
    "explanation": "अयं बालकः चतुरः अस्ति। (This boy is clever.)",
    "category": "adjectives"
  },
  {
    "id": "puz-200-124",
    "english": "This girl is calm.",
    "correctOrder": [
      "इयं",
      "बालिका",
      "शान्ता",
      "अस्ति।"
    ],
    "scrambled": [
      "अस्ति।",
      "शान्ता",
      "बालिका",
      "इयं"
    ],
    "hint": "Iyaṁ bālikā śāntā asti.",
    "explanation": "इयं बालिका शान्ता अस्ति। (This girl is calm.)",
    "category": "adjectives"
  },
  {
    "id": "puz-200-125",
    "english": "This fruit is very sweet.",
    "correctOrder": [
      "एतत्",
      "फलम्",
      "अतीव",
      "मधुरम्।"
    ],
    "scrambled": [
      "मधुरम्।",
      "अतीव",
      "फलम्",
      "एतत्"
    ],
    "hint": "Etat phalam atīva madhuram.",
    "explanation": "एतत् फलम् अतीव मधुरम्। (This fruit is very sweet.)",
    "category": "adjectives"
  },
  {
    "id": "puz-200-126",
    "english": "He is an old man.",
    "correctOrder": [
      "सः",
      "वृद्धः",
      "पुरुषः",
      "अस्ति।"
    ],
    "scrambled": [
      "अस्ति।",
      "पुरुषः",
      "वृद्धः",
      "सः"
    ],
    "hint": "Saḥ vṛddhaḥ puruṣaḥ asti.",
    "explanation": "सः वृद्धः पुरुषः अस्ति। (He is an old man.)",
    "category": "adjectives"
  },
  {
    "id": "puz-200-127",
    "english": "There is a grand festival here.",
    "correctOrder": [
      "अत्र",
      "महान्",
      "उत्सवः",
      "अस्ति।"
    ],
    "scrambled": [
      "अस्ति।",
      "उत्सवः",
      "महान्",
      "अत्र"
    ],
    "hint": "Atra mahān utsavaḥ asti.",
    "explanation": "अत्र महान् उत्सवः अस्ति। (There is a grand festival here.)",
    "category": "adjectives"
  },
  {
    "id": "puz-200-128",
    "english": "Let the water not be hot.",
    "correctOrder": [
      "जलं",
      "उष्णं",
      "मा",
      "अस्तु।"
    ],
    "scrambled": [
      "अस्तु।",
      "मा",
      "उष्णं",
      "जलं"
    ],
    "hint": "Jalaṁ uṣṇaṁ mā astu.",
    "explanation": "जलं उष्णं मा अस्तु। (Let the water not be hot.)",
    "category": "adjectives"
  },
  {
    "id": "puz-200-129",
    "english": "This story is short.",
    "correctOrder": [
      "एषा",
      "कथा",
      "लघ्वी",
      "अस्ति।"
    ],
    "scrambled": [
      "अस्ति।",
      "लघ्वी",
      "कथा",
      "एषा"
    ],
    "hint": "Eṣā kathā laghvī asti.",
    "explanation": "एषा कथा लघ्वी अस्ति। (This story is short.)",
    "category": "adjectives"
  },
  {
    "id": "puz-200-130",
    "english": "The mountain is very high.",
    "correctOrder": [
      "पर्वतः",
      "अतीव",
      "उन्नतः",
      "अस्ति।"
    ],
    "scrambled": [
      "अस्ति।",
      "उन्नतः",
      "अतीव",
      "पर्वतः"
    ],
    "hint": "Parvataḥ atīva unnataḥ asti.",
    "explanation": "पर्वतः अतीव उन्नतः अस्ति। (The mountain is very high.)",
    "category": "adjectives"
  },
  {
    "id": "puz-200-131",
    "english": "I like this picture.",
    "correctOrder": [
      "मह्यम्",
      "एतत्",
      "चित्रं",
      "रोचते।"
    ],
    "scrambled": [
      "रोचते।",
      "चित्रं",
      "एतत्",
      "मह्यम्"
    ],
    "hint": "Mahyam etat citraṁ rocate.",
    "explanation": "मह्यम् एतत् चित्रं रोचते। (I like this picture.)",
    "category": "hobbies"
  },
  {
    "id": "puz-200-132",
    "english": "Do you like sports? (to a male)",
    "correctOrder": [
      "किं",
      "भवते",
      "क्रीडा",
      "रोचते?"
    ],
    "scrambled": [
      "रोचते?",
      "क्रीडा",
      "भवते",
      "किं"
    ],
    "hint": "Kiṁ bhavate krīḍā rocate?",
    "explanation": "किं भवते क्रीडा रोचते? (Do you like sports? (to a male))",
    "category": "hobbies"
  },
  {
    "id": "puz-200-133",
    "english": "She sings sweetly.",
    "correctOrder": [
      "सा",
      "मधुरं",
      "गायति।"
    ],
    "scrambled": [
      "गायति।",
      "मधुरं",
      "सा"
    ],
    "hint": "Sā madhuraṁ gāyati.",
    "explanation": "सा मधुरं गायति। (She sings sweetly.)",
    "category": "hobbies"
  },
  {
    "id": "puz-200-134",
    "english": "I can swim.",
    "correctOrder": [
      "अहं",
      "तरितुं",
      "शक्नोमि।"
    ],
    "scrambled": [
      "शक्नोमि।",
      "तरितुं",
      "अहं"
    ],
    "hint": "Ahaṁ tarituṁ śaknomi.",
    "explanation": "अहं तरितुं शक्नोमि। (I can swim.)",
    "category": "hobbies"
  },
  {
    "id": "puz-200-135",
    "english": "You can speak Sanskrit.",
    "correctOrder": [
      "त्वं",
      "संस्कृतं",
      "वक्तुं",
      "शक्नोषि।"
    ],
    "scrambled": [
      "शक्नोषि।",
      "वक्तुं",
      "संस्कृतं",
      "त्वं"
    ],
    "hint": "Tvaṁ saṁskṛtaṁ vaktuṁ śaknoṣi.",
    "explanation": "त्वं संस्कृतं वक्तुं शक्नोषि। (You can speak Sanskrit.)",
    "category": "hobbies"
  },
  {
    "id": "puz-200-136",
    "english": "He writes beautifully.",
    "correctOrder": [
      "सः",
      "सुन्दरं",
      "लिखति।"
    ],
    "scrambled": [
      "लिखति।",
      "सुन्दरं",
      "सः"
    ],
    "hint": "Saḥ sundaraṁ likhati.",
    "explanation": "सः सुन्दरं लिखति। (He writes beautifully.)",
    "category": "hobbies"
  },
  {
    "id": "puz-200-137",
    "english": "I exercise every day.",
    "correctOrder": [
      "अहं",
      "प्रतिदिनं",
      "व्यायामं",
      "करोमि।"
    ],
    "scrambled": [
      "करोमि।",
      "व्यायामं",
      "प्रतिदिनं",
      "अहं"
    ],
    "hint": "Ahaṁ pratidinaṁ vyāyāmaṁ karomi.",
    "explanation": "अहं प्रतिदिनं व्यायामं करोमि। (I exercise every day.)",
    "category": "hobbies"
  },
  {
    "id": "puz-200-138",
    "english": "His reading is good.",
    "correctOrder": [
      "तस्य",
      "पठनं",
      "सम्यक्",
      "अस्ति।"
    ],
    "scrambled": [
      "अस्ति।",
      "सम्यक्",
      "पठनं",
      "तस्य"
    ],
    "hint": "Tasya paṭhanaṁ samyak asti.",
    "explanation": "तस्य पठनं सम्यक् अस्ति। (His reading is good.)",
    "category": "hobbies"
  },
  {
    "id": "puz-200-139",
    "english": "We want to travel.",
    "correctOrder": [
      "वयं",
      "भ्रमणं",
      "कर्तुम्",
      "इच्छामः।"
    ],
    "scrambled": [
      "इच्छामः।",
      "कर्तुम्",
      "भ्रमणं",
      "वयं"
    ],
    "hint": "Vayaṁ bhramaṇaṁ kartum icchāmaḥ.",
    "explanation": "वयं भ्रमणं कर्तुम् इच्छामः। (We want to travel.)",
    "category": "hobbies"
  },
  {
    "id": "puz-200-140",
    "english": "The boys are playing football/ball games.",
    "correctOrder": [
      "बालकाः",
      "कन्दुकक्रीडां",
      "क्रीडन्ति।"
    ],
    "scrambled": [
      "क्रीडन्ति।",
      "कन्दुकक्रीडां",
      "बालकाः"
    ],
    "hint": "Bālakāḥ kandukakrīḍāṁ krīḍanti.",
    "explanation": "बालकाः कन्दुकक्रीडां क्रीडन्ति। (The boys are playing football/ball games.)",
    "category": "hobbies"
  },
  {
    "id": "puz-200-141",
    "english": "Finish the work quickly.",
    "correctOrder": [
      "शीघ्रं",
      "कार्यं",
      "समापय।"
    ],
    "scrambled": [
      "समापय।",
      "कार्यं",
      "शीघ्रं"
    ],
    "hint": "Śīghraṁ kāryaṁ samāpaya.",
    "explanation": "शीघ्रं कार्यं समापय। (Finish the work quickly.)",
    "category": "rules"
  },
  {
    "id": "puz-200-142",
    "english": "Do not speak lies.",
    "correctOrder": [
      "असत्यं",
      "मा",
      "वद।"
    ],
    "scrambled": [
      "वद।",
      "मा",
      "असत्यं"
    ],
    "hint": "Asatyaṁ mā vada.",
    "explanation": "असत्यं मा वद। (Do not speak lies.)",
    "category": "rules"
  },
  {
    "id": "puz-200-143",
    "english": "Please sit here.",
    "correctOrder": [
      "अत्र",
      "उपविशतु",
      "कृपया।"
    ],
    "scrambled": [
      "कृपया।",
      "उपविशतु",
      "अत्र"
    ],
    "hint": "Atra upaviśatu kṛpayā.",
    "explanation": "अत्र उपविशतु कृपया। (Please sit here.)",
    "category": "rules"
  },
  {
    "id": "puz-200-144",
    "english": "Close the door.",
    "correctOrder": [
      "द्वारं",
      "पिधत्स्व।"
    ],
    "scrambled": [
      "पिधत्स्व।",
      "द्वारं"
    ],
    "hint": "Dvāraṁ pidhatsva.",
    "explanation": "द्वारं पिधत्स्व। (Close the door.)",
    "category": "rules"
  },
  {
    "id": "puz-200-145",
    "english": "Walk very slowly.",
    "correctOrder": [
      "मन्दं",
      "मन्दं",
      "चल।"
    ],
    "scrambled": [
      "चल।",
      "मन्दं",
      "मन्दं"
    ],
    "hint": "Mandaṁ mandaṁ cala.",
    "explanation": "मन्दं मन्दं चल। (Walk very slowly.)",
    "category": "rules"
  },
  {
    "id": "puz-200-146",
    "english": "Do not make noise.",
    "correctOrder": [
      "कोलाहलं",
      "मा",
      "कुरु।"
    ],
    "scrambled": [
      "कुरु।",
      "मा",
      "कोलाहलं"
    ],
    "hint": "Kolāhalaṁ mā kuru.",
    "explanation": "कोलाहलं मा कुरु। (Do not make noise.)",
    "category": "rules"
  },
  {
    "id": "puz-200-147",
    "english": "Do hard work.",
    "correctOrder": [
      "परिश्रमं",
      "कुरु।"
    ],
    "scrambled": [
      "कुरु।",
      "परिश्रमं"
    ],
    "hint": "Pariśramaṁ kuru.",
    "explanation": "परिश्रमं कुरु। (Do hard work.)",
    "category": "rules"
  },
  {
    "id": "puz-200-148",
    "english": "Drink clean water.",
    "correctOrder": [
      "स्वच्छं",
      "जलं",
      "पिब।"
    ],
    "scrambled": [
      "पिब।",
      "जलं",
      "स्वच्छं"
    ],
    "hint": "Svacchaṁ jalaṁ piba.",
    "explanation": "स्वच्छं जलं पिब। (Drink clean water.)",
    "category": "rules"
  },
  {
    "id": "puz-200-149",
    "english": "Smoking is prohibited here.",
    "correctOrder": [
      "अत्र",
      "धूमपानं",
      "निषिद्धम्।"
    ],
    "scrambled": [
      "निषिद्धम्।",
      "धूमपानं",
      "अत्र"
    ],
    "hint": "Atra dhūmapānaṁ niṣiddham.",
    "explanation": "अत्र धूमपानं निषिद्धम्। (Smoking is prohibited here.)",
    "category": "rules"
  },
  {
    "id": "puz-200-150",
    "english": "Follow punctuality.",
    "correctOrder": [
      "समयपालनं",
      "कुरुत।"
    ],
    "scrambled": [
      "कुरुत।",
      "समयपालनं"
    ],
    "hint": "Samayapālanaṁ kuruta.",
    "explanation": "समयपालनं कुरुत। (Follow punctuality.)",
    "category": "rules"
  },
  {
    "id": "puz-200-151",
    "english": "I am studying because there is an exam.",
    "correctOrder": [
      "अहं",
      "पठामि",
      "यतः",
      "परीक्षा",
      "अस्ति।"
    ],
    "scrambled": [
      "अस्ति।",
      "परीक्षा",
      "यतः",
      "पठामि",
      "अहं"
    ],
    "hint": "Ahaṁ paṭhāmi yataḥ parīkṣā asti.",
    "explanation": "अहं पठामि यतः परीक्षा अस्ति। (I am studying because there is an exam.)",
    "category": "connectors"
  },
  {
    "id": "puz-200-152",
    "english": "It is raining, therefore I am not going.",
    "correctOrder": [
      "वृष्टिः",
      "भवति,",
      "अतः",
      "अहं",
      "न",
      "गच्छामि।"
    ],
    "scrambled": [
      "गच्छामि।",
      "न",
      "अहं",
      "अतः",
      "भवति,",
      "वृष्टिः"
    ],
    "hint": "Vṛṣṭiḥ bhavati, ataḥ ahaṁ na gacchāmi.",
    "explanation": "वृष्टिः भवति, अतः अहं न गच्छामि। (It is raining, therefore I am not going.)",
    "category": "connectors"
  },
  {
    "id": "puz-200-153",
    "english": "If you come, then I will come.",
    "correctOrder": [
      "यदि",
      "त्वं",
      "आगच्छसि,",
      "तर्हि",
      "अहं",
      "आगमिष्यामि।"
    ],
    "scrambled": [
      "आगमिष्यामि।",
      "अहं",
      "तर्हि",
      "आगच्छसि,",
      "त्वं",
      "यदि"
    ],
    "hint": "Yadi tvaṁ āgacchasi, tarhi ahaṁ āgamiṣyāmi.",
    "explanation": "यदि त्वं आगच्छसि, तर्हि अहं आगमिष्यामि। (If you come, then I will come.)",
    "category": "connectors"
  },
  {
    "id": "puz-200-154",
    "english": "Rama and Lakshmana are brothers.",
    "correctOrder": [
      "रामः",
      "लक्ष्मणः",
      "च",
      "भ्रातरौ।"
    ],
    "scrambled": [
      "भ्रातरौ।",
      "च",
      "लक्ष्मणः",
      "रामः"
    ],
    "hint": "Rāmaḥ lakṣmaṇaḥ ca bhrātarau.",
    "explanation": "रामः लक्ष्मणः च भ्रातरौ। (Rama and Lakshmana are brothers.)",
    "category": "connectors"
  },
  {
    "id": "puz-200-155",
    "english": "He studies as well as plays.",
    "correctOrder": [
      "सः",
      "पठति",
      "अपि",
      "क्रीडति",
      "अपि।"
    ],
    "scrambled": [
      "अपि।",
      "क्रीडति",
      "अपि",
      "पठति",
      "सः"
    ],
    "hint": "Saḥ paṭhati api krīḍati api.",
    "explanation": "सः पठति अपि क्रीडति अपि। (He studies as well as plays.)",
    "category": "connectors"
  },
  {
    "id": "puz-200-156",
    "english": "Having gone home, I will eat.",
    "correctOrder": [
      "अहं",
      "गृहं",
      "गत्वा",
      "भोजनं",
      "करोमि।"
    ],
    "scrambled": [
      "करोमि।",
      "भोजनं",
      "गत्वा",
      "गृहं",
      "अहं"
    ],
    "hint": "Ahaṁ gṛhaṁ gatvā bhojanaṁ karomi.",
    "explanation": "अहं गृहं गत्वा भोजनं करोमि। (Having gone home, I will eat.)",
    "category": "connectors"
  },
  {
    "id": "puz-200-157",
    "english": "Studying cannot happen without a book.",
    "correctOrder": [
      "पुस्तकं",
      "विना",
      "पठनं",
      "न",
      "भवति।"
    ],
    "scrambled": [
      "भवति।",
      "न",
      "पठनं",
      "विना",
      "पुस्तकं"
    ],
    "hint": "Pustakaṁ vinā paṭhanaṁ na bhavati.",
    "explanation": "पुस्तकं विना पठनं न भवति। (Studying cannot happen without a book.)",
    "category": "connectors"
  },
  {
    "id": "puz-200-158",
    "english": "As the king, so the subjects.",
    "correctOrder": [
      "यथा",
      "राजा,",
      "तथा",
      "प्रजा।"
    ],
    "scrambled": [
      "प्रजा।",
      "तथा",
      "राजा,",
      "यथा"
    ],
    "hint": "Yathā rājā, tathā prajā.",
    "explanation": "यथा राजा, तथा प्रजा। (As the king, so the subjects.)",
    "category": "connectors"
  },
  {
    "id": "puz-200-159",
    "english": "She goes to school to study.",
    "correctOrder": [
      "सा",
      "पठितुं",
      "विद्यालयं",
      "गच्छति।"
    ],
    "scrambled": [
      "गच्छति।",
      "विद्यालयं",
      "पठितुं",
      "सा"
    ],
    "hint": "Sā paṭhituṁ vidyālayaṁ gacchati.",
    "explanation": "सा पठितुं विद्यालयं गच्छति। (She goes to school to study.)",
    "category": "connectors"
  },
  {
    "id": "puz-200-160",
    "english": "I know that you are clever.",
    "correctOrder": [
      "अहं",
      "जानामि",
      "यत्",
      "त्वं",
      "चतुरः",
      "असि।"
    ],
    "scrambled": [
      "असि।",
      "चतुरः",
      "त्वं",
      "यत्",
      "जानामि",
      "अहं"
    ],
    "hint": "Ahaṁ jānāmi yat tvaṁ caturaḥ asi.",
    "explanation": "अहं जानामि यत् त्वं चतुरः असि। (I know that you are clever.)",
    "category": "connectors"
  },
  {
    "id": "puz-200-161",
    "english": "I have a headache.",
    "correctOrder": [
      "मम",
      "शिरोवेदना",
      "अस्ति।"
    ],
    "scrambled": [
      "अस्ति।",
      "शिरोवेदना",
      "मम"
    ],
    "hint": "Mama śirovedanā asti.",
    "explanation": "मम शिरोवेदना अस्ति। (I have a headache.)",
    "category": "wellness"
  },
  {
    "id": "puz-200-162",
    "english": "Have you taken the medicine? (to a male)",
    "correctOrder": [
      "भवान्",
      "औषधं",
      "स्वीकृतवान्",
      "किम्?"
    ],
    "scrambled": [
      "किम्?",
      "स्वीकृतवान्",
      "औषधं",
      "भवान्"
    ],
    "hint": "Bhavān auṣadhaṁ svīkṛtavān kim?",
    "explanation": "भवान् औषधं स्वीकृतवान् किम्? (Have you taken the medicine? (to a male))",
    "category": "wellness"
  },
  {
    "id": "puz-200-163",
    "english": "His eyes are red.",
    "correctOrder": [
      "तस्य",
      "नेत्रे",
      "रक्तायते।"
    ],
    "scrambled": [
      "रक्तायते।",
      "नेत्रे",
      "तस्य"
    ],
    "hint": "Tasya netre raktāyate.",
    "explanation": "तस्य नेत्रे रक्तायते। (His eyes are red.)",
    "category": "wellness"
  },
  {
    "id": "puz-200-164",
    "english": "Health is the ultimate wealth.",
    "correctOrder": [
      "स्वास्थ्यं",
      "परमं",
      "धनम्",
      "अस्ति।"
    ],
    "scrambled": [
      "अस्ति।",
      "धनम्",
      "परमं",
      "स्वास्थ्यं"
    ],
    "hint": "Svāsthyaṁ paramaṁ dhanaṁ asti.",
    "explanation": "स्वास्थ्यं परमं धनम् अस्ति। (Health is the ultimate wealth.)",
    "category": "wellness"
  },
  {
    "id": "puz-200-165",
    "english": "I am tired (male).",
    "correctOrder": [
      "अहं",
      "क्लान्तः",
      "अस्मि।"
    ],
    "scrambled": [
      "अस्मि।",
      "क्लान्तः",
      "अहं"
    ],
    "hint": "Ahaṁ klāntaḥ asmi.",
    "explanation": "अहं क्लान्तः अस्मि। (I am tired (male).)",
    "category": "wellness"
  },
  {
    "id": "puz-200-166",
    "english": "She is unwell.",
    "correctOrder": [
      "सा",
      "अस्वस्था",
      "अस्ति।"
    ],
    "scrambled": [
      "अस्ति।",
      "अस्वस्था",
      "सा"
    ],
    "hint": "Sā asvasthā asti.",
    "explanation": "सा अस्वस्था अस्ति। (She is unwell.)",
    "category": "wellness"
  },
  {
    "id": "puz-200-167",
    "english": "Get well soon.",
    "correctOrder": [
      "शीघ्रं",
      "स्वस्थः",
      "भवतु।"
    ],
    "scrambled": [
      "भवतु।",
      "स्वस्थः",
      "शीघ्रं"
    ],
    "hint": "Śīghraṁ svasthaḥ bhavatu.",
    "explanation": "शीघ्रं स्वस्थः भवतु। (Get well soon.)",
    "category": "wellness"
  },
  {
    "id": "puz-200-168",
    "english": "His tooth is loose.",
    "correctOrder": [
      "तस्य",
      "दन्तः",
      "चलति।"
    ],
    "scrambled": [
      "चलति।",
      "दन्तः",
      "तस्य"
    ],
    "hint": "Tasya dantaḥ calati.",
    "explanation": "तस्य दन्तः चलति। (His tooth is loose.)",
    "category": "wellness"
  },
  {
    "id": "puz-200-169",
    "english": "I slept well.",
    "correctOrder": [
      "अहं",
      "सम्यक्",
      "निद्रां",
      "कृतवान्।"
    ],
    "scrambled": [
      "कृतवान्।",
      "निद्रां",
      "सम्यक्",
      "अहं"
    ],
    "hint": "Ahaṁ samyak nidrāṁ kṛtavān.",
    "explanation": "अहं सम्यक् निद्रां कृतवान्। (I slept well.)",
    "category": "wellness"
  },
  {
    "id": "puz-200-170",
    "english": "Clean air is necessary for health.",
    "correctOrder": [
      "शुद्धः",
      "वायुः",
      "आरोग्याय",
      "आवश्यकः।"
    ],
    "scrambled": [
      "आवश्यकः।",
      "आरोग्याय",
      "वायुः",
      "शुद्धः"
    ],
    "hint": "Śuddhaḥ vāyuḥ ārogyāya āvaśyakaḥ.",
    "explanation": "शुद्धः वायुः आरोग्याय आवश्यकः। (Clean air is necessary for health.)",
    "category": "wellness"
  },
  {
    "id": "puz-200-171",
    "english": "The lion roars in the forest.",
    "correctOrder": [
      "सिंहः",
      "वने",
      "गर्जति।"
    ],
    "scrambled": [
      "गर्जति।",
      "वने",
      "सिंहः"
    ],
    "hint": "Siṁhaḥ vane garjati.",
    "explanation": "सिंहः वने गर्जति। (The lion roars in the forest.)",
    "category": "nature_animals"
  },
  {
    "id": "puz-200-172",
    "english": "The cow gives milk.",
    "correctOrder": [
      "धेनुः",
      "दुग्धं",
      "ददाति।"
    ],
    "scrambled": [
      "ददाति।",
      "दुग्धं",
      "धेनुः"
    ],
    "hint": "Dhenuḥ dugdhaṁ dadāti.",
    "explanation": "धेनुः दुग्धं ददाति। (The cow gives milk.)",
    "category": "nature_animals"
  },
  {
    "id": "puz-200-173",
    "english": "The elephant walks slowly.",
    "correctOrder": [
      "गजः",
      "मन्दं",
      "चलति।"
    ],
    "scrambled": [
      "चलति।",
      "मन्दं",
      "गजः"
    ],
    "hint": "Gajaḥ mandaṁ calati.",
    "explanation": "गजः मन्दं चलति। (The elephant walks slowly.)",
    "category": "nature_animals"
  },
  {
    "id": "puz-200-174",
    "english": "The peacock dances in the rainy season.",
    "correctOrder": [
      "मयूरः",
      "वर्षाकाले",
      "नृत्यति।"
    ],
    "scrambled": [
      "नृत्यति।",
      "वर्षाकाले",
      "मयूरः"
    ],
    "hint": "Mayūraḥ varṣākāle nṛtyati.",
    "explanation": "मयूरः वर्षाकाले नृत्यति। (The peacock dances in the rainy season.)",
    "category": "nature_animals"
  },
  {
    "id": "puz-200-175",
    "english": "Trees give shade to us.",
    "correctOrder": [
      "वृक्षाः",
      "अस्मभ्यं",
      "छायां",
      "यच्छन्ति।"
    ],
    "scrambled": [
      "यच्छन्ति।",
      "छायां",
      "अस्मभ्यं",
      "वृक्षाः"
    ],
    "hint": "Vṛkṣāḥ asmabhyaṁ chāyāṁ yacchanti.",
    "explanation": "वृक्षाः अस्मभ्यं छायां यच्छन्ति। (Trees give shade to us.)",
    "category": "nature_animals"
  },
  {
    "id": "puz-200-176",
    "english": "The lotus blooms in the pond.",
    "correctOrder": [
      "तडागे",
      "कमलं",
      "विकसति।"
    ],
    "scrambled": [
      "विकसति।",
      "कमलं",
      "तडागे"
    ],
    "hint": "Taḍāge kamalaṁ vikasati.",
    "explanation": "तडागे कमलं विकसति। (The lotus blooms in the pond.)",
    "category": "nature_animals"
  },
  {
    "id": "puz-200-177",
    "english": "The rabbit runs fast.",
    "correctOrder": [
      "शशकः",
      "वेगेन",
      "धावति।"
    ],
    "scrambled": [
      "धावति।",
      "वेगेन",
      "शशकः"
    ],
    "hint": "Śaśakaḥ vegena dhāvati.",
    "explanation": "शशकः वेगेन धावति। (The rabbit runs fast.)",
    "category": "nature_animals"
  },
  {
    "id": "puz-200-178",
    "english": "The monkey jumps on the tree.",
    "correctOrder": [
      "कूर्दति",
      "वानरः",
      "वृक्षे।"
    ],
    "scrambled": [
      "वृक्षे।",
      "वानरः",
      "कूर्दति"
    ],
    "hint": "Kūrdati vānaraḥ vṛkṣe.",
    "explanation": "कूर्दति वानरः वृक्षे। (The monkey jumps on the tree.)",
    "category": "nature_animals"
  },
  {
    "id": "puz-200-179",
    "english": "Bees buzz on the flower.",
    "correctOrder": [
      "भ्रमराः",
      "पुष्पे",
      "गुञ्जन्ति।"
    ],
    "scrambled": [
      "गुञ्जन्ति।",
      "पुष्पे",
      "भ्रमराः"
    ],
    "hint": "Bhramarāḥ puṣpe guñjanti.",
    "explanation": "भ्रमराः पुष्पे गुञ्जन्ति। (Bees buzz on the flower.)",
    "category": "nature_animals"
  },
  {
    "id": "puz-200-180",
    "english": "Stars look beautiful in the sky.",
    "correctOrder": [
      "आकाशे",
      "तारकाः",
      "शोभन्ते।"
    ],
    "scrambled": [
      "शोभन्ते।",
      "तारकाः",
      "आकाशे"
    ],
    "hint": "Ākāśe tārakāḥ śobhante.",
    "explanation": "आकाशे तारकाः शोभन्ते। (Stars look beautiful in the sky.)",
    "category": "nature_animals"
  },
  {
    "id": "puz-200-181",
    "english": "I want to become a teacher.",
    "correctOrder": [
      "अहं",
      "शिक्षकः",
      "भवितुम्",
      "इच्छामि।"
    ],
    "scrambled": [
      "इच्छामि।",
      "भवितुम्",
      "शिक्षकः",
      "अहं"
    ],
    "hint": "Ahaṁ śikṣakaḥ bhavitum icchāmi.",
    "explanation": "अहं शिक्षकः भवितुम् इच्छामि। (I want to become a teacher.)",
    "category": "intentions"
  },
  {
    "id": "puz-200-182",
    "english": "He had gone to the shop.",
    "correctOrder": [
      "सः",
      "आपणं",
      "गतवान्",
      "आसीत्।"
    ],
    "scrambled": [
      "आसीत्।",
      "गतवान्",
      "आपणं",
      "सः"
    ],
    "hint": "Saḥ āpaṇaṁ gatavān āsīt.",
    "explanation": "सः आपणं गतवान् आसीत्। (He had gone to the shop.)",
    "category": "intentions"
  },
  {
    "id": "puz-200-183",
    "english": "We will write the exam tomorrow.",
    "correctOrder": [
      "वयं",
      "श्वः",
      "परीक्षां",
      "लेखिष्यामः।"
    ],
    "scrambled": [
      "लेखिष्यामः।",
      "परीक्षां",
      "श्वः",
      "वयं"
    ],
    "hint": "Vayaṁ śvaḥ parīkṣāṁ lekhiṣyāmaḥ.",
    "explanation": "वयं श्वः परीक्षां लेखिष्यामः। (We will write the exam tomorrow.)",
    "category": "intentions"
  },
  {
    "id": "puz-200-184",
    "english": "Did you receive my message?",
    "correctOrder": [
      "त्वं",
      "मम",
      "सन्देशं",
      "प्राप्तवान्",
      "किम्?"
    ],
    "scrambled": [
      "किम्?",
      "प्राप्तवान्",
      "सन्देशं",
      "मम",
      "त्वं"
    ],
    "hint": "Tvaṁ mama sandeśaṁ prāptavān kim?",
    "explanation": "त्वं मम सन्देशं प्राप्तवान् किम्? (Did you receive my message?)",
    "category": "intentions"
  },
  {
    "id": "puz-200-185",
    "english": "She completed her homework.",
    "correctOrder": [
      "सा",
      "गृहकार्यं",
      "समापितवती।"
    ],
    "scrambled": [
      "समापितवती।",
      "गृहकार्यं",
      "सा"
    ],
    "hint": "Sā gṛhakāryaṁ samāpitavatī.",
    "explanation": "सा गृहकार्यं समापितवती। (She completed her homework.)",
    "category": "intentions"
  },
  {
    "id": "puz-200-186",
    "english": "They came to know the truth.",
    "correctOrder": [
      "ते",
      "सत्यं",
      "ज्ञातवन्तः।"
    ],
    "scrambled": [
      "ज्ञातवन्तः।",
      "सत्यं",
      "ते"
    ],
    "hint": "Te satyaṁ jñātavantaḥ.",
    "explanation": "ते सत्यं ज्ञातवन्तः। (They came to know the truth.)",
    "category": "intentions"
  },
  {
    "id": "puz-200-187",
    "english": "I will not go there.",
    "correctOrder": [
      "अहं",
      "तत्र",
      "न",
      "गमिष्यामि।"
    ],
    "scrambled": [
      "गमिष्यामि।",
      "न",
      "तत्र",
      "अहं"
    ],
    "hint": "Ahaṁ tatra na gamiṣyāmi.",
    "explanation": "अहं तत्र न गमिष्यामि। (I will not go there.)",
    "category": "intentions"
  },
  {
    "id": "puz-200-188",
    "english": "Mother used to cook / was cooking food.",
    "correctOrder": [
      "माता",
      "भोजनं",
      "पचति",
      "स्म।"
    ],
    "scrambled": [
      "स्म।",
      "पचति",
      "भोजनं",
      "माता"
    ],
    "hint": "Mātā bhojanaṁ pacati sma.",
    "explanation": "माता भोजनं पचति स्म। (Mother used to cook / was cooking food.)",
    "category": "intentions"
  },
  {
    "id": "puz-200-189",
    "english": "The boy cried.",
    "correctOrder": [
      "बालकः",
      "रोदनं",
      "कृतवान्।"
    ],
    "scrambled": [
      "कृतवान्।",
      "रोदनं",
      "बालकः"
    ],
    "hint": "Bālakaḥ rodanaṁ kṛtavān.",
    "explanation": "बालकः रोदनं कृतवान्। (The boy cried.)",
    "category": "intentions"
  },
  {
    "id": "puz-200-190",
    "english": "How did you all forget?",
    "correctOrder": [
      "यूयं",
      "कथं",
      "विस्मृतवन्तः?"
    ],
    "scrambled": [
      "विस्मृतवन्तः?",
      "कथं",
      "यूयं"
    ],
    "hint": "Yūyaṁ kathaṁ vismṛtavantaḥ?",
    "explanation": "यूयं कथं विस्मृतवन्तः? (How did you all forget?)",
    "category": "intentions"
  },
  {
    "id": "puz-200-191",
    "english": "Do not worry.",
    "correctOrder": [
      "चिन्ता",
      "मा",
      "कुरु।"
    ],
    "scrambled": [
      "कुरु।",
      "मा",
      "चिन्ता"
    ],
    "hint": "Cintā mā kuru.",
    "explanation": "चिन्ता मा कुरु। (Do not worry.)",
    "category": "conversation"
  },
  {
    "id": "puz-200-192",
    "english": "Is everything fine?",
    "correctOrder": [
      "सर्वं",
      "कुशलं",
      "वा?"
    ],
    "scrambled": [
      "वा?",
      "कुशलं",
      "सर्वं"
    ],
    "hint": "Sarvaṁ kuśalaṁ vā?",
    "explanation": "सर्वं कुशलं वा? (Is everything fine?)",
    "category": "conversation"
  },
  {
    "id": "puz-200-193",
    "english": "I am coming quickly.",
    "correctOrder": [
      "अहं",
      "शीघ्रं",
      "आगच्छामि।"
    ],
    "scrambled": [
      "आगच्छामि।",
      "शीघ्रं",
      "अहं"
    ],
    "hint": "Ahaṁ śīghraṁ āgacchāmi.",
    "explanation": "अहं शीघ्रं आगच्छामि। (I am coming quickly.)",
    "category": "conversation"
  },
  {
    "id": "puz-200-194",
    "english": "This is not my fault.",
    "correctOrder": [
      "एषः",
      "मम",
      "अपराधः",
      "नास्ति।"
    ],
    "scrambled": [
      "नास्ति।",
      "अपराधः",
      "मम",
      "एषः"
    ],
    "hint": "Eṣaḥ mama aparādhaḥ nāsti.",
    "explanation": "एषः मम अपराधः नास्ति। (This is not my fault.)",
    "category": "conversation"
  },
  {
    "id": "puz-200-195",
    "english": "Your help is needed.",
    "correctOrder": [
      "भवतः",
      "साहाय्यं",
      "आवश्यकम्।"
    ],
    "scrambled": [
      "आवश्यकम्।",
      "साहाय्यं",
      "भवतः"
    ],
    "hint": "Bhavataḥ sāhāyyaṁ āvaśyakam.",
    "explanation": "भवतः साहाय्यं आवश्यकम्। (Your help is needed.)",
    "category": "conversation"
  },
  {
    "id": "puz-200-196",
    "english": "Let it be so / Alright.",
    "correctOrder": [
      "भवतु,",
      "नाम।"
    ],
    "scrambled": [
      "नाम।",
      "भवतु,"
    ],
    "hint": "Bhavatu, nāma.",
    "explanation": "भवतु, नाम। (Let it be so / Alright.)",
    "category": "conversation"
  },
  {
    "id": "puz-200-197",
    "english": "I do not know him.",
    "correctOrder": [
      "अहं",
      "तं",
      "न",
      "जानामि।"
    ],
    "scrambled": [
      "जानामि।",
      "न",
      "तं",
      "अहं"
    ],
    "hint": "Ahaṁ taṁ na jānāmi.",
    "explanation": "अहं तं न जानामि। (I do not know him.)",
    "category": "conversation"
  },
  {
    "id": "puz-200-198",
    "english": "This seems true.",
    "correctOrder": [
      "एतत्",
      "सत्यं",
      "भाति।"
    ],
    "scrambled": [
      "भाति।",
      "सत्यं",
      "एतत्"
    ],
    "hint": "Etat satyaṁ bhāti.",
    "explanation": "एतत् सत्यं भाति। (This seems true.)",
    "category": "conversation"
  },
  {
    "id": "puz-200-199",
    "english": "Let us gather together.",
    "correctOrder": [
      "वयम्",
      "एकत्रीभवामः।"
    ],
    "scrambled": [
      "एकत्रीभवामः।",
      "वयम्"
    ],
    "hint": "Vayaṁ ekatrībhavāmaḥ.",
    "explanation": "वयम् एकत्रीभवामः। (Let us gather together.)",
    "category": "conversation"
  },
  {
    "id": "puz-200-200",
    "english": "See you again / Goodbye.",
    "correctOrder": [
      "पुनर्मिलामः।"
    ],
    "scrambled": [
      "पुनर्मिलामः।"
    ],
    "hint": "Punarmilāmaḥ.",
    "explanation": "पुनर्मिलामः। (See you again / Goodbye.)",
    "category": "conversation"
  }
];

// Alias for backwards compatibility
export const SENTENCES_100_PUZZLES: SentencePuzzleItem[] = SENTENCES_200_PUZZLES;

// Default builder puzzles collection
export const SENTENCE_BUILDER_PUZZLES: SentencePuzzleItem[] = [
  ...FOUNDATIONAL_TILE_PUZZLES,
  ...SENTENCES_200_PUZZLES,
];
