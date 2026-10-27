export interface RootWordItem {
  id: string;
  root: string;
  transliteration: string;
  meaningEn: string;
  meaningHi: string;
  icon: string;
  gana: string;
  padam: 'परस्मैपदम्' | 'आत्मनेपदम्' | 'उभयपदम्';
  baseForm: string; // e.g. "पठ्"
  stem: string;     // e.g. "पठ"
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
  sanskrit: string;
  english: string;
  hindi?: string;
  category: 'two_words' | 'pronouns' | 'three_words' | 'questions' | 'nature';
  categoryLabel: string;
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
}

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

export const SIMPLE_SENTENCES_CATALOG: SimpleSentenceItem[] = [
  // Tier 1: Two Words
  {
    id: 's1-1',
    sanskrit: 'बालकः पठति।',
    english: 'The boy reads.',
    hindi: 'लड़का पढ़ता है।',
    category: 'two_words',
    categoryLabel: '१. द्विपद-वाक्यानि · Two Words',
    levelBadge: 'Foundation',
    words: [
      { devanagari: 'बालकः', meaning: 'The boy', role: 'subject', roleLabel: 'कर्ता (Subject)', rootOrStem: 'बालक (पुं० प्रथमा-एक०)' },
      { devanagari: 'पठति', meaning: 'reads', role: 'verb', roleLabel: 'क्रियापदम् (Verb)', rootOrStem: 'पठ् धातु (लट्० प्र०पु० एक०)' },
    ],
    grammarNote: 'Basic Sanskrit word order: Subject (कर्ता) comes first with visarga (:), followed by present tense verb ending in -ति (-ti).',
  },
  {
    id: 's1-2',
    sanskrit: 'बालिका लिखति।',
    english: 'The girl writes.',
    hindi: 'लड़की लिखती है।',
    category: 'two_words',
    categoryLabel: '१. द्विपद-वाक्यानि · Two Words',
    levelBadge: 'Foundation',
    words: [
      { devanagari: 'बालिका', meaning: 'The girl', role: 'subject', roleLabel: 'कर्ता (Subject)', rootOrStem: 'बालिका (स्त्री० प्रथमा-एक०)' },
      { devanagari: 'लिखति', meaning: 'writes', role: 'verb', roleLabel: 'क्रियापदम् (Verb)', rootOrStem: 'लिख् धातु (लट्० प्र०पु० एक०)' },
    ],
    grammarNote: 'Feminine singular names ending in -आ (आकारान्त) do not take a visarga (:) in प्रथमा-एकवचनम्.',
  },
  {
    id: 's1-3',
    sanskrit: 'अश्वः धावति।',
    english: 'The horse runs.',
    hindi: 'घोड़ा दौड़ता है।',
    category: 'two_words',
    categoryLabel: '१. द्विपद-वाक्यानि · Two Words',
    levelBadge: 'Foundation',
    words: [
      { devanagari: 'अश्वः', meaning: 'The horse', role: 'subject', roleLabel: 'कर्ता (Subject)', rootOrStem: 'अश्व (पुं०)' },
      { devanagari: 'धावति', meaning: 'runs', role: 'verb', roleLabel: 'क्रियापदम् (Verb)', rootOrStem: 'धाव् धातु' },
    ],
    grammarNote: 'धाव् (to run) ➔ धावति. The verb matches the singular subject in person and number.',
  },
  {
    id: 's1-4',
    sanskrit: 'गजः चलति।',
    english: 'The elephant walks.',
    hindi: 'हाथी चलता है।',
    category: 'two_words',
    categoryLabel: '१. द्विपद-वाक्यानि · Two Words',
    levelBadge: 'Foundation',
    words: [
      { devanagari: 'गजः', meaning: 'The elephant', role: 'subject', roleLabel: 'कर्ता (Subject)', rootOrStem: 'गज (पुं०)' },
      { devanagari: 'चलति', meaning: 'walks', role: 'verb', roleLabel: 'क्रियापदम् (Verb)', rootOrStem: 'चल् धातु' },
    ],
    grammarNote: 'चल् (to walk/move) ➔ चलति. A classic Vedic nature observation sentence.',
  },
  {
    id: 's1-5',
    sanskrit: 'मयूरः नृत्यति।',
    english: 'The peacock dances.',
    hindi: 'मोर नाचता है।',
    category: 'two_words',
    categoryLabel: '१. द्विपद-वाक्यानि · Two Words',
    levelBadge: 'Foundation',
    words: [
      { devanagari: 'मयूरः', meaning: 'The peacock', role: 'subject', roleLabel: 'कर्ता (Subject)', rootOrStem: 'मयूर (पुं०)' },
      { devanagari: 'नृत्यति', meaning: 'dances', role: 'verb', roleLabel: 'क्रियापदम् (Verb)', rootOrStem: 'नृत् धातु (४थी गण)' },
    ],
    grammarNote: 'नृत् root takes -य- vikarana in 4th gana ➔ नृत्यति (dances).',
  },
  {
    id: 's1-6',
    sanskrit: 'बालकाः क्रीडन्ति।',
    english: 'The boys play.',
    hindi: 'लड़के खेलते हैं।',
    category: 'two_words',
    categoryLabel: '१. द्विपद-वाक्यानि · Two Words',
    levelBadge: 'Foundation',
    words: [
      { devanagari: 'बालकाः', meaning: 'The boys (plural)', role: 'subject', roleLabel: 'कर्ता (Subject - Plural)', rootOrStem: 'बालक (पुं० प्रथमा-बहु०)' },
      { devanagari: 'क्रीडन्ति', meaning: 'play (plural)', role: 'verb', roleLabel: 'क्रियापदम् (Verb - Plural)', rootOrStem: 'क्रीड् धातु (-अन्ति)' },
    ],
    grammarNote: 'Notice the plural match: बालकः पठति (1 boy reads) ➔ बालकाः क्रीडन्ति (Many boys play). Ending changes from -ति to -न्ति!',
  },

  // Tier 2: Pronouns in Action
  {
    id: 's2-1',
    sanskrit: 'सः गच्छति।',
    english: 'He goes.',
    hindi: 'वह (लड़का) जाता है।',
    category: 'pronouns',
    categoryLabel: '२. सर्वनाम-वाक्यानि · Pronouns in Action',
    levelBadge: 'Conversational',
    words: [
      { devanagari: 'सः', meaning: 'He (masculine)', role: 'subject', roleLabel: 'सर्वनाम कर्ता (He)', rootOrStem: 'तद् (पुं० प्रथमा-एक०)' },
      { devanagari: 'गच्छति', meaning: 'goes', role: 'verb', roleLabel: 'क्रियापदम् (Verb)', rootOrStem: 'गम् ➔ गच्छति' },
    ],
    grammarNote: 'सः (Saḥ) means "He" in Sanskrit. Root गम् transforms to गच्छ- before adding -ति.',
  },
  {
    id: 's2-2',
    sanskrit: 'सा हसति।',
    english: 'She laughs / smiles.',
    hindi: 'वह (लड़की) हँसती है।',
    category: 'pronouns',
    categoryLabel: '२. सर्वनाम-वाक्यानि · Pronouns in Action',
    levelBadge: 'Conversational',
    words: [
      { devanagari: 'सा', meaning: 'She (feminine)', role: 'subject', roleLabel: 'सर्वनाम कर्ता (She)', rootOrStem: 'तद् (स्त्री० प्रथमा-एक०)' },
      { devanagari: 'हसति', meaning: 'laughs', role: 'verb', roleLabel: 'क्रियापदम् (Verb)', rootOrStem: 'हस् धातु' },
    ],
    grammarNote: 'सा (Sā) means "She" in Sanskrit. Used for feminine third-person singular.',
  },
  {
    id: 's2-3',
    sanskrit: 'त्वं पठसि।',
    english: 'You read.',
    hindi: 'तुम पढ़ते हो।',
    category: 'pronouns',
    categoryLabel: '२. सर्वनाम-वाक्यानि · Pronouns in Action',
    levelBadge: 'Conversational',
    words: [
      { devanagari: 'त्वम्', meaning: 'You (2nd person)', role: 'subject', roleLabel: 'मध्यमपुरुष कर्ता (You)', rootOrStem: 'युष्मद् शब्द' },
      { devanagari: 'पठसि', meaning: 'read', role: 'verb', roleLabel: 'क्रियापदम् (-सि ending)', rootOrStem: 'पठ् + सि' },
    ],
    grammarNote: 'Whenever the subject is त्वम् (You), the verb ALWAYS ends in -सि (-si)! त्वं गच्छसि, त्वं लिखसि, त्वं खादसि.',
  },
  {
    id: 's2-4',
    sanskrit: 'अहं लिखामि।',
    english: 'I write.',
    hindi: 'मैं लिखता हूँ।',
    category: 'pronouns',
    categoryLabel: '२. सर्वनाम-वाक्यानि · Pronouns in Action',
    levelBadge: 'Conversational',
    words: [
      { devanagari: 'अहम्', meaning: 'I (1st person)', role: 'subject', roleLabel: 'उत्तमपुरुष कर्ता (I)', rootOrStem: 'अस्मद् शब्द' },
      { devanagari: 'लिखामि', meaning: 'write', role: 'verb', roleLabel: 'क्रियापदम् (-आमि ending)', rootOrStem: 'लिख् + आमि' },
    ],
    grammarNote: 'Whenever the subject is अहम् (I), the verb ALWAYS ends in -आमि (-āmi)! अहं पठामि, अहं गच्छामि, अहं वदामि.',
  },
  {
    id: 's2-5',
    sanskrit: 'वयं क्रीडामः।',
    english: 'We play.',
    hindi: 'हम सब खेलते हैं।',
    category: 'pronouns',
    categoryLabel: '२. सर्वनाम-वाक्यानि · Pronouns in Action',
    levelBadge: 'Conversational',
    words: [
      { devanagari: 'वयम्', meaning: 'We (plural)', role: 'subject', roleLabel: 'उत्तमपुरुष बहुवचन (We)', rootOrStem: 'अस्मद् बहुवचन' },
      { devanagari: 'क्रीडामः', meaning: 'play', role: 'verb', roleLabel: 'क्रियापदम् (-आमः ending)', rootOrStem: 'क्रीड् + आमः' },
    ],
    grammarNote: 'वयम् (We) matches the first-person plural verb ending -आमः (-āmaḥ). वयं पठामः, वयं चलामः.',
  },

  // Tier 3: Three Words (Subject + Object + Verb)
  {
    id: 's3-1',
    sanskrit: 'बालकः पुस्तकं पठति।',
    english: 'The boy reads the book.',
    hindi: 'लड़का पुस्तक पढ़ता है।',
    category: 'three_words',
    categoryLabel: '३. त्रिपद-वाक्यानि · Subject, Object & Verb',
    levelBadge: 'Grammar Bridge',
    words: [
      { devanagari: 'बालकः', meaning: 'The boy', role: 'subject', roleLabel: 'कर्ता (Subject - 1st Case)' },
      { devanagari: 'पुस्तकम्', meaning: 'the book', role: 'object', roleLabel: 'कर्म (Object - 2nd Case / द्वितीया)' },
      { devanagari: 'पठति', meaning: 'reads', role: 'verb', roleLabel: 'क्रियापदम् (Verb)' },
    ],
    grammarNote: 'The Sanskrit Golden Rule of Sentences: Subject (कर्ता) ➔ Object (कर्म, usually ending in -म् / anusvara) ➔ Verb (क्रिया).',
  },
  {
    id: 's3-2',
    sanskrit: 'बालिका पत्रं लिखति।',
    english: 'The girl writes a letter.',
    hindi: 'लड़की पत्र लिखती है।',
    category: 'three_words',
    categoryLabel: '३. त्रिपद-वाक्यानि · Subject, Object & Verb',
    levelBadge: 'Grammar Bridge',
    words: [
      { devanagari: 'बालिका', meaning: 'The girl', role: 'subject', roleLabel: 'कर्ता (Subject)' },
      { devanagari: 'पत्रम्', meaning: 'a letter', role: 'object', roleLabel: 'कर्म (Object)' },
      { devanagari: 'लिखति', meaning: 'writes', role: 'verb', roleLabel: 'क्रियापदम् (Verb)' },
    ],
    grammarNote: 'पत्रम् (letter) is the object receiving the action of writing.',
  },
  {
    id: 's3-3',
    sanskrit: 'सः मधुरं फलं खादति।',
    english: 'He eats a sweet fruit.',
    hindi: 'वह मीठा फल खाता है।',
    category: 'three_words',
    categoryLabel: '३. त्रिपद-वाक्यानि · Subject, Object & Verb',
    levelBadge: 'Grammar Bridge',
    words: [
      { devanagari: 'सः', meaning: 'He', role: 'subject', roleLabel: 'कर्ता (Subject)' },
      { devanagari: 'मधुरम्', meaning: 'sweet', role: 'adjective', roleLabel: 'विशेषणम् (Adjective)' },
      { devanagari: 'फलम्', meaning: 'fruit', role: 'object', roleLabel: 'कर्म (Object)' },
      { devanagari: 'खादति', meaning: 'eats', role: 'verb', roleLabel: 'क्रियापदम् (Verb)' },
    ],
    grammarNote: 'Adjectives (विशेषणम्) match the noun in case, gender, and number: मधुरं फलम्.',
  },
  {
    id: 's3-4',
    sanskrit: 'सा जलं पिबति।',
    english: 'She drinks water.',
    hindi: 'वह पानी पीती है।',
    category: 'three_words',
    categoryLabel: '३. त्रिपद-वाक्यानि · Subject, Object & Verb',
    levelBadge: 'Grammar Bridge',
    words: [
      { devanagari: 'सा', meaning: 'She', role: 'subject', roleLabel: 'कर्ता (Subject)' },
      { devanagari: 'जलम्', meaning: 'water', role: 'object', roleLabel: 'कर्म (Object)' },
      { devanagari: 'पिबति', meaning: 'drinks', role: 'verb', roleLabel: 'क्रियापदम् (Verb)' },
    ],
    grammarNote: 'जलम् is neuter accusative singular (द्वितीया-एकवचनम्).',
  },
  {
    id: 's3-5',
    sanskrit: 'माता भोजनं पचति।',
    english: 'Mother cooks food.',
    hindi: 'माता भोजन पकाती हैं।',
    category: 'three_words',
    categoryLabel: '३. त्रिपद-वाक्यानि · Subject, Object & Verb',
    levelBadge: 'Grammar Bridge',
    words: [
      { devanagari: 'माता', meaning: 'Mother', role: 'subject', roleLabel: 'कर्ता (Subject)' },
      { devanagari: 'भोजनम्', meaning: 'food', role: 'object', roleLabel: 'कर्म (Object)' },
      { devanagari: 'पचति', meaning: 'cooks', role: 'verb', roleLabel: 'क्रियापदम् (Verb - पच् धातु)' },
    ],
    grammarNote: 'पच् (to cook) ➔ पचति. A sweet household sentence.',
  },

  // Tier 4: Daily Questions & Conversations
  {
    id: 's4-1',
    sanskrit: 'भवतः नाम किम्?',
    english: 'What is your name? (asking a male)',
    hindi: 'आपका नाम क्या है? (पुल्लिंग)',
    category: 'questions',
    categoryLabel: '४. दैनिक-सम्भाषणम् · Daily Questions & Conversations',
    levelBadge: 'Everyday Speech',
    words: [
      { devanagari: 'भवतः', meaning: 'Your (respectful masculine)', role: 'adjective', roleLabel: 'षष्ठी विभक्तिः (Your)' },
      { devanagari: 'नाम', meaning: 'name', role: 'subject', roleLabel: 'नामन् शब्द' },
      { devanagari: 'किम्', meaning: 'what', role: 'particle', roleLabel: 'प्रश्नार्थकम् (Question)' },
    ],
    grammarNote: 'The most essential Sanskrit greeting. To ask a female, say: भवत्याः नाम किम्? (Bhavatyāḥ nāma kim?).',
  },
  {
    id: 's4-2',
    sanskrit: 'मम नाम आनन्दः अस्ति।',
    english: 'My name is Ananda.',
    hindi: 'मेरा नाम आनंद है।',
    category: 'questions',
    categoryLabel: '४. दैनिक-सम्भाषणम् · Daily Questions & Conversations',
    levelBadge: 'Everyday Speech',
    words: [
      { devanagari: 'मम', meaning: 'My', role: 'adjective', roleLabel: 'षष्ठी विभक्तिः (My)' },
      { devanagari: 'नाम', meaning: 'name', role: 'subject', roleLabel: 'नामन्' },
      { devanagari: 'आनन्दः', meaning: 'Ananda', role: 'subject', roleLabel: 'विशेष्य (Proper noun)' },
      { devanagari: 'अस्ति', meaning: 'is', role: 'verb', roleLabel: 'अस् धातु (is)' },
    ],
    grammarNote: 'मम (Mama = My). You can reply: मम नाम [Your Name] अस्ति। (or simply मम नाम आनन्दः।)',
  },
  {
    id: 's4-3',
    sanskrit: 'त्वं कुत्र गच्छसि?',
    english: 'Where are you going?',
    hindi: 'तुम कहाँ जा रहे हो?',
    category: 'questions',
    categoryLabel: '४. दैनिक-सम्भाषणम् · Daily Questions & Conversations',
    levelBadge: 'Everyday Speech',
    words: [
      { devanagari: 'त्वम्', meaning: 'You', role: 'subject', roleLabel: 'कर्ता (You)' },
      { devanagari: 'कुत्र', meaning: 'where', role: 'adverb', roleLabel: 'अव्ययम् (Where)' },
      { devanagari: 'गच्छसि', meaning: 'go / are going', role: 'verb', roleLabel: 'क्रियापदम् (Go)' },
    ],
    grammarNote: 'कुत्र (kutra) is an undeclinable avyaya meaning "where".',
  },
  {
    id: 's4-4',
    sanskrit: 'अहं विद्यालयं गच्छामि।',
    english: 'I am going to school.',
    hindi: 'मैं विद्यालय जा रहा हूँ।',
    category: 'questions',
    categoryLabel: '४. दैनिक-सम्भाषणम् · Daily Questions & Conversations',
    levelBadge: 'Everyday Speech',
    words: [
      { devanagari: 'अहम्', meaning: 'I', role: 'subject', roleLabel: 'कर्ता (I)' },
      { devanagari: 'विद्यालयम्', meaning: 'to school', role: 'object', roleLabel: 'कर्म (Destination - 2nd case)' },
      { devanagari: 'गच्छामि', meaning: 'am going', role: 'verb', roleLabel: 'क्रियापदम् (Go)' },
    ],
    grammarNote: 'The destination of movement takes the 2nd case (द्वितीया): विद्यालयम्.',
  },
  {
    id: 's4-5',
    sanskrit: 'त्वं किं करोषि?',
    english: 'What are you doing?',
    hindi: 'तुम क्या कर रहे हो?',
    category: 'questions',
    categoryLabel: '४. दैनिक-सम्भाषणम् · Daily Questions & Conversations',
    levelBadge: 'Everyday Speech',
    words: [
      { devanagari: 'त्वम्', meaning: 'You', role: 'subject', roleLabel: 'कर्ता (You)' },
      { devanagari: 'किम्', meaning: 'what', role: 'particle', roleLabel: 'प्रश्नार्थकम् (What)' },
      { devanagari: 'करोषि', meaning: 'are doing', role: 'verb', roleLabel: 'कृ धातु (मध्यमपुरुषः)' },
    ],
    grammarNote: 'Root कृ (to do) ➔ करोषि for त्वम् (You). Reply: अहं पाठं पठामि (I am reading the lesson).',
  },

  // Tier 5: Living Nature & World
  {
    id: 's5-1',
    sanskrit: 'सूर्यः आकाशे उदयति।',
    english: 'The sun rises in the sky.',
    hindi: 'सूर्य आकाश में उगता है।',
    category: 'nature',
    categoryLabel: '५. प्रकृतिः एवं जगत् · Living Nature & World',
    levelBadge: 'Literary Expression',
    words: [
      { devanagari: 'सूर्यः', meaning: 'The sun', role: 'subject', roleLabel: 'कर्ता (Sun)' },
      { devanagari: 'आकाशे', meaning: 'in the sky', role: 'adverb', roleLabel: 'सप्तमी (Location - 7th Case)' },
      { devanagari: 'उदयति', meaning: 'rises', role: 'verb', roleLabel: 'क्रियापदम् (Rises)' },
    ],
    grammarNote: 'आकाशे is locative case (सप्तमी विभक्तिः), meaning "in the sky".',
  },
  {
    id: 's5-2',
    sanskrit: 'नदी वेगेन वहति।',
    english: 'The river flows swiftly.',
    hindi: 'नदी वेग से बहती है।',
    category: 'nature',
    categoryLabel: '५. प्रकृतिः एवं जगत् · Living Nature & World',
    levelBadge: 'Literary Expression',
    words: [
      { devanagari: 'नदी', meaning: 'The river', role: 'subject', roleLabel: 'कर्ता (River)' },
      { devanagari: 'वेगेन', meaning: 'swiftly / with speed', role: 'adverb', roleLabel: 'तृतीया (With speed - 3rd Case)' },
      { devanagari: 'वहति', meaning: 'flows', role: 'verb', roleLabel: 'क्रियापदम् (वहति - वह् धातु)' },
    ],
    grammarNote: 'वहति comes from root वह् (to flow / carry). वेगेन uses the 3rd case instrumental.',
  },
  {
    id: 's5-3',
    sanskrit: 'वृक्षः भूमौ तिष्ठति।',
    english: 'The tree stands on the earth.',
    hindi: 'पेड़ धरती पर खड़ा है।',
    category: 'nature',
    categoryLabel: '५. प्रकृतिः एवं जगत् · Living Nature & World',
    levelBadge: 'Literary Expression',
    words: [
      { devanagari: 'वृक्षः', meaning: 'The tree', role: 'subject', roleLabel: 'कर्ता (Tree)' },
      { devanagari: 'भूमौ', meaning: 'on the earth', role: 'adverb', roleLabel: 'सप्तमी (On earth)' },
      { devanagari: 'तिष्ठति', meaning: 'stands', role: 'verb', roleLabel: 'स्था ➔ तिष्ठति' },
    ],
    grammarNote: 'भूमौ is locative of भूमि (earth). तिष्ठति is from root स्था (to stand).',
  },
  {
    id: 's5-4',
    sanskrit: 'पुष्पाणि उद्याने विकसन्ति।',
    english: 'Flowers bloom in the garden.',
    hindi: 'बगीचे में फूल खिलते हैं।',
    category: 'nature',
    categoryLabel: '५. प्रकृतिः एवं जगत् · Living Nature & World',
    levelBadge: 'Literary Expression',
    words: [
      { devanagari: 'पुष्पाणि', meaning: 'Flowers (plural)', role: 'subject', roleLabel: 'नपुंसकलिङ्ग बहुवचनम्' },
      { devanagari: 'उद्याने', meaning: 'in the garden', role: 'adverb', roleLabel: 'सप्तमी (In garden)' },
      { devanagari: 'विकसन्ति', meaning: 'bloom (plural)', role: 'verb', roleLabel: 'वि + कस् धातु' },
    ],
    grammarNote: 'Neuter plural noun पुष्पाणि takes plural verb विकसन्ति (-न्ति).',
  },
];

export const SENTENCE_BUILDER_PUZZLES: SentencePuzzleItem[] = [
  {
    id: 'puz-1',
    english: 'The boy reads the book.',
    correctOrder: ['बालकः', 'पुस्तकम्', 'पठति।'],
    scrambled: ['पठति।', 'बालकः', 'पुस्तकम्'],
    hint: 'Subject (Boy) comes first, then Object (Book), then Action (Reads).',
    explanation: 'बालकः (कर्ता) + पुस्तकम् (कर्म) + पठति (क्रिया).',
  },
  {
    id: 'puz-2',
    english: 'The girl writes a letter.',
    correctOrder: ['बालिका', 'पत्रम्', 'लिखति।'],
    scrambled: ['पत्रम्', 'लिखति।', 'बालिका'],
    hint: 'Start with who is writing (Balika).',
    explanation: 'बालिका (कर्ता) + पत्रम् (कर्म) + लिखति (क्रिया).',
  },
  {
    id: 'puz-3',
    english: 'The horse runs swiftly.',
    correctOrder: ['अश्वः', 'तीव्रम्', 'धावति।'],
    scrambled: ['धावति।', 'तीव्रम्', 'अश्वः'],
    hint: 'Subject + Adverb + Verb.',
    explanation: 'अश्वः (Horse) + तीव्रम् (Swiftly) + धावति (Runs).',
  },
  {
    id: 'puz-4',
    english: 'I am reading a book.',
    correctOrder: ['अहम्', 'पुस्तकम्', 'पठामि।'],
    scrambled: ['पठामि।', 'अहम्', 'पुस्तकम्'],
    hint: 'When subject is अहम्, verb ends with -आमि.',
    explanation: 'अहम् (I) matches पठामि (-āmi ending).',
  },
  {
    id: 'puz-5',
    english: 'Where are you going?',
    correctOrder: ['त्वम्', 'कुत्र', 'गच्छसि?'],
    scrambled: ['गच्छसि?', 'त्वम्', 'कुत्र'],
    hint: 'Subject (You) + Question (Where) + Verb (Go).',
    explanation: 'त्वम् (You) + कुत्र (Where) + गच्छसि (Go).',
  },
  {
    id: 'puz-6',
    english: 'The sun rises in the sky.',
    correctOrder: ['सूर्यः', 'आकाशे', 'उदयति।'],
    scrambled: ['उदयति।', 'सूर्यः', 'आकाशे'],
    hint: 'Sun + in sky + rises.',
    explanation: 'सूर्यः (Sun) + आकाशे (In the sky) + उदयति (Rises).',
  },
  {
    id: 'puz-7',
    english: 'We play in the playground.',
    correctOrder: ['वयम्', 'क्रीडाङ्गणे', 'क्रीडामः।'],
    scrambled: ['क्रीडामः।', 'वयम्', 'क्रीडाङ्गणे'],
    hint: 'When subject is वयम् (We), verb ends with -आमः.',
    explanation: 'वयम् (We) matches क्रीडामः (-āmaḥ ending).',
  },
  {
    id: 'puz-8',
    english: 'The baby smiles and laughs.',
    correctOrder: ['शिशुः', 'सुन्दरम्', 'हसति।'],
    scrambled: ['हसति।', 'सुन्दरम्', 'शिशुः'],
    hint: 'Baby + charmingly + laughs.',
    explanation: 'शिशुः (Baby) + सुन्दरम् (Charmingly) + हसति (Laughs).',
  },
];
