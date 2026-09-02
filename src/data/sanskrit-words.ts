/**
 * Sanskrit Word Dictionary with Linguistic Breakdowns
 * Contains common Sanskrit words with their linguistic analysis
 */

import type { SanskritWordBreakdown, Dhatu, Upasarga, Pratyaya } from '../types/linguistics';

// Common root words (Dhātu)
export const COMMON_DHATUS: Record<string, Dhatu> = {
  'पठ': {
    devanagari: 'पठ',
    transliteration: 'paṭh',
    meaning: 'to read, to study',
    class: 1,
    description: 'Root verb meaning "to read" or "to study"',
    examples: ['पठामि (I read)', 'पठसि (You read)', 'पठति (He/She reads)'],
  },
  'वद': {
    devanagari: 'वद',
    transliteration: 'vad',
    meaning: 'to speak, to say',
    class: 1,
    description: 'Root verb meaning "to speak" or "to say"',
    examples: ['वदामि (I speak)', 'वदसि (You speak)', 'वदति (He/She speaks)'],
  },
  'ज्ञा': {
    devanagari: 'ज्ञा',
    transliteration: 'jñā',
    meaning: 'to know',
    class: 9,
    description: 'Root verb meaning "to know" or "to understand"',
    examples: ['जानामि (I know)', 'जानासि (You know)', 'जानाति (He/She knows)'],
  },
  'गच्छ': {
    devanagari: 'गच्छ',
    transliteration: 'gacc',
    meaning: 'to go',
    class: 1,
    description: 'Root verb meaning "to go"',
    examples: ['गच्छामि (I go)', 'गच्छसि (You go)', 'गच्छति (He/She goes)'],
  },
  'कृ': {
    devanagari: 'कृ',
    transliteration: 'kṛ',
    meaning: 'to do, to make',
    class: 8,
    description: 'Root verb meaning "to do" or "to make"',
    examples: ['करोमि (I do)', 'करोषि (You do)', 'करोति (He/She does)'],
  },
  'भू': {
    devanagari: 'भू',
    transliteration: 'bhū',
    meaning: 'to be, to exist',
    class: 1,
    description: 'Root verb meaning "to be" or "to exist"',
    examples: ['भवामि (I am)', 'भवसि (You are)', 'भवति (He/She is)'],
  },
  'अस्': {
    devanagari: 'अस्',
    transliteration: 'as',
    meaning: 'to be',
    class: 2,
    description: 'Root verb meaning "to be" (variant of भू)',
    examples: ['अस्मि (I am)', 'असि (You are)', 'अस्ति (He/She is)'],
  },
  'नम्': {
    devanagari: 'नम्',
    transliteration: 'nam',
    meaning: 'to bow, to salute',
    class: 1,
    description: 'Root verb meaning "to bow" or "to salute"',
    examples: ['नमामि (I bow)', 'नमसि (You bow)', 'नमति (He/She bows)'],
  },
  'शृ': {
    devanagari: 'शृ',
    transliteration: 'śṛ',
    meaning: 'to serve, to protect',
    class: 5,
    description: 'Root verb meaning "to serve" or "to protect"',
    examples: ['शृणोमि (I hear)', 'शृणोषि (You hear)', 'शृणोति (He/She hears)'],
  },
  'दृश्': {
    devanagari: 'दृश्',
    transliteration: 'dṛś',
    meaning: 'to see, to look',
    class: 1,
    description: 'Root verb meaning "to see" or "to look"',
    examples: ['पश्यामि (I see)', 'पश्यसि (You see)', 'पश्यति (He/She sees)'],
  },
};

// Common prefixes (Upasargas)
export const COMMON_UPASARGAS: Record<string, Upasarga> = {
  'आ': {
    devanagari: 'आ',
    transliteration: 'ā',
    meaning: 'to, toward, up to',
    examples: ['आगच्छति (comes)', 'आसेदति (approaches)'],
  },
  'अति': {
    devanagari: 'अति',
    transliteration: 'ati',
    meaning: 'beyond, across, over',
    examples: ['अतिक्रमति (crosses)', 'अतिगच्छति (goes beyond)'],
  },
  'उप': {
    devanagari: 'उप',
    transliteration: 'upa',
    meaning: 'near, towards, under',
    examples: ['उपगच्छति (approaches)', 'उपविशति (sits near)'],
  },
  'प्र': {
    devanagari: 'प्र',
    transliteration: 'pra',
    meaning: 'forward, forth',
    examples: ['प्रगच्छति (goes forth)', 'प्रयाति (departs)'],
  },
  'परि': {
    devanagari: 'परि',
    transliteration: 'pari',
    meaning: 'around, about',
    examples: ['परिक्रमति (goes around)', 'परिचरति (attends)'],
  },
  'नि': {
    devanagari: 'नि',
    transliteration: 'ni',
    meaning: 'down, in, into',
    examples: ['निगच्छति (comes down)', 'निवसति (dwells)'],
  },
  'अब': {
    devanagari: 'अब',
    transliteration: 'aba',
    meaning: 'away, off',
    examples: ['अभ्यागच्छति (comes toward)'],
  },
};

// Common suffixes (Pratyayas)
export const COMMON_PRATYAYAS: Record<string, Pratyaya> = {
  'अ': {
    devanagari: 'अ',
    transliteration: 'a',
    type: 'nominal',
    meaning: 'masculine nominalized form',
    examples: ['गच्छ + अ = गच्छ (going)'],
  },
  'अन्': {
    devanagari: 'अन्',
    transliteration: 'an',
    type: 'nominal',
    meaning: 'neuter nominalized form',
    examples: ['कर + अन् = कर्म (work)'],
  },
  'इ': {
    devanagari: 'इ',
    transliteration: 'i',
    type: 'nominal',
    meaning: 'feminine nominalized form',
    examples: ['गति (going, movement)'],
  },
  'ता': {
    devanagari: 'ता',
    transliteration: 'tā',
    type: 'nominal',
    meaning: 'abstract noun forming -ness or -ity',
    examples: ['नर (man) + ता = नरता (manhood)'],
  },
  'त्व': {
    devanagari: 'त्व',
    transliteration: 'tv',
    type: 'nominal',
    meaning: 'abstract noun forming -ness or -hood',
    examples: ['देव (god) + त्व = देवत्व (godhood)'],
  },
  'य': {
    devanagari: 'य',
    transliteration: 'ya',
    type: 'adjectival',
    meaning: 'adjectival suffix forming adjectives',
    examples: ['नर (man) + य = नरय (manly)'],
  },
};

// Sample Sanskrit words with complete breakdown
export const SANSKRIT_WORDS_DICTIONARY: SanskritWordBreakdown[] = [
  {
    id: 'word-saraswati',
    devanagari: 'सरस्वति',
    transliteration: 'Saraswati',
    meaning: 'Goddess of knowledge, learning, and arts',
    partOfSpeech: 'noun',
    syllables: [
      { devanagari: 'स', transliteration: 'sa', iotype: 'consonant' },
      { devanagari: 'र', transliteration: 'ra', iotype: 'consonant' },
      { devanagari: 'स्', transliteration: 's', iotype: 'consonant' },
      { devanagari: 'व', transliteration: 'va', iotype: 'consonant' },
      { devanagari: 'ति', transliteration: 'ti', iotype: 'consonant' },
    ],
    conjunctConsonants: [
      {
        devanagari: 'र्स्',
        transliteration: 'rs',
        components: ['र्', 'स्'],
        description: 'Conjunct consonant: ra + sa',
      },
    ],
    dhatu: {
      devanagari: 'सृ',
      transliteration: 'sṛ',
      meaning: 'to flow',
      class: 5,
    },
    pratyayas: [
      {
        devanagari: 'इ',
        transliteration: 'i',
        type: 'nominal',
        meaning: 'feminine nominalized form',
      },
    ],
    nounInflection: {
      gender: 'feminine',
      number: 'singular',
      case: 1,
      meaning: 'nominative case (subject)',
    },
    etymology: 'From सृ (sṛ) meaning "to flow", indicating the flow of knowledge',
    examples: [
      'सरस्वति देवी है। (Saraswati is a goddess.)',
      'सरस्वति को नमस्कार। (Salutations to Saraswati.)',
    ],
  },
  {
    id: 'word-namaste',
    devanagari: 'नमस्ते',
    transliteration: 'Namaste',
    meaning: 'Salutation/greeting - literally "I bow to you"',
    partOfSpeech: 'noun',
    syllables: [
      { devanagari: 'न', transliteration: 'na', iotype: 'consonant' },
      { devanagari: 'म्', transliteration: 'm', iotype: 'consonant' },
      { devanagari: 'स्', transliteration: 's', iotype: 'consonant' },
      { devanagari: 'ते', transliteration: 'te', iotype: 'consonant' },
    ],
    conjunctConsonants: [
      {
        devanagari: 'न्म्',
        transliteration: 'nm',
        components: ['न्', 'म्'],
        description: 'Conjunct consonant: na + ma',
      },
      {
        devanagari: 'स्त्',
        transliteration: 'st',
        components: ['स्', 'त्'],
        description: 'Conjunct consonant: sa + ta',
      },
    ],
    dhatu: COMMON_DHATUS['नम्'],
    pratyayas: [
      {
        devanagari: 'ते',
        transliteration: 'te',
        type: 'nominal',
        meaning: 'dative case suffix',
      },
    ],
    verbInflection: {
      tense: 'present',
      person: '1st',
      number: 'singular',
      meaning: 'I bow',
    },
    etymology: 'नमस् (namas) = salutation/bowing + ते (te) = to you (dative)',
    examples: [
      'नमस्ते! (Hello/Goodbye - formal greeting)',
      'सब को नमस्ते। (Salutations to all.)',
    ],
  },
  {
    id: 'word-vidya',
    devanagari: 'विद्या',
    transliteration: 'Vidyā',
    meaning: 'Knowledge, learning, science, education',
    partOfSpeech: 'noun',
    syllables: [
      { devanagari: 'वि', transliteration: 'vi', iotype: 'consonant' },
      { devanagari: 'द्', transliteration: 'd', iotype: 'consonant' },
      { devanagari: 'या', transliteration: 'yā', iotype: 'consonant' },
    ],
    conjunctConsonants: [
      {
        devanagari: 'द्य',
        transliteration: 'dy',
        components: ['द्', 'य'],
        description: 'Conjunct consonant: da + ya',
      },
    ],
    dhatu: {
      devanagari: 'विद्',
      transliteration: 'vid',
      meaning: 'to know',
      class: 2,
    },
    pratyayas: [
      {
        devanagari: 'या',
        transliteration: 'yā',
        type: 'nominal',
        meaning: 'feminine nominalized form',
      },
    ],
    nounInflection: {
      gender: 'feminine',
      number: 'singular',
      case: 1,
    },
    etymology: 'From विद् (vid) meaning "to know", with feminine suffix या',
    examples: [
      'विद्या शक्ति है। (Knowledge is power.)',
      'विद्यार्थी को विद्या प्रिय है। (The student loves knowledge.)',
    ],
  },
  {
    id: 'word-putra',
    devanagari: 'पुत्र',
    transliteration: 'Putra',
    meaning: 'Son, child',
    partOfSpeech: 'noun',
    syllables: [
      { devanagari: 'पु', transliteration: 'pu', iotype: 'consonant' },
      { devanagari: 'त्र', transliteration: 'tra', iotype: 'conjunct' },
    ],
    conjunctConsonants: [
      {
        devanagari: 'त्र',
        transliteration: 'tra',
        components: ['त्', 'र'],
        description: 'Conjunct consonant: ta + ra',
      },
    ],
    nounInflection: {
      gender: 'masculine',
      number: 'singular',
      case: 1,
    },
    examples: [
      'यह मेरा पुत्र है। (This is my son.)',
      'पुत्र का नाम राम है। (The son\'s name is Rama.)',
    ],
  },
  {
    id: 'word-gacchati',
    devanagari: 'गच्छति',
    transliteration: 'Gacchati',
    meaning: 'He/She/It goes',
    partOfSpeech: 'verb',
    syllables: [
      { devanagari: 'ग', transliteration: 'ga', iotype: 'consonant' },
      { devanagari: 'च्छ', transliteration: 'cch', iotype: 'consonant' },
      { devanagari: 'ति', transliteration: 'ti', iotype: 'consonant' },
    ],
    conjunctConsonants: [
      {
        devanagari: 'च्छ',
        transliteration: 'cch',
        components: ['च्', 'छ'],
        description: 'Conjunct consonant: cha + cha',
      },
    ],
    dhatu: COMMON_DHATUS['गच्छ'],
    pratyayas: [
      {
        devanagari: 'ति',
        transliteration: 'ti',
        type: 'verbal',
        meaning: '3rd person singular present tense',
      },
    ],
    verbInflection: {
      tense: 'present',
      person: '3rd',
      number: 'singular',
      mood: 'indicative',
      meaning: 'he/she/it goes',
    },
    examples: [
      'राम गच्छति। (Rama goes.)',
      'वह विद्यालय गच्छति। (She goes to school.)',
    ],
  },

  // Chapter 1 (गसदे १०१ - वन्दे भारतमातरम्) inflected vocabulary
  {
    id: 'word-ch1-akashavanyam',
    devanagari: 'आकाशवाण्यां',
    transliteration: 'ākāśavāṇyāṃ',
    meaning: 'On the radio / All India Radio',
    partOfSpeech: 'noun',
    syllables: [],
    conjunctConsonants: [],
    nounInflection: {
      gender: 'feminine',
      number: 'singular',
      case: 7,
      meaning: 'locative case (on/at the radio)',
    },
    examples: [
      'वयं आकाशवाण्यां गीतं शृणुमः। (We hear the song on the radio.)',
      'आकाशवाण्यां वार्ताः प्रसरन्ति। (News spreads via the radio.)',
    ],
  },
  {
    id: 'word-ch1-samskrtam',
    devanagari: 'संस्कृतं',
    transliteration: 'saṃskṛtaṃ',
    meaning: 'Sanskrit language / refined',
    partOfSpeech: 'noun',
    syllables: [],
    conjunctConsonants: [],
    nounInflection: {
      gender: 'neuter',
      number: 'singular',
      case: '1/2',
      meaning: 'nominative/accusative case (subject or object)',
    },
    examples: [
      'एतत् गीतं संस्कृतं बाङ्ग्ला च भाषाद्वये वर्तते। (This song exists in two languages: Sanskrit and Bengali.)',
    ],
  },
  {
    id: 'word-ch1-bangla',
    devanagari: 'बाङ्ग्ला',
    transliteration: 'bāṅglā',
    meaning: 'Bengali language',
    partOfSpeech: 'noun',
    syllables: [],
    conjunctConsonants: [],
    nounInflection: {
      gender: 'feminine',
      number: 'singular',
      case: 1,
      meaning: 'nominative case (subject)',
    },
  },
  {
    id: 'word-ch1-bhashadvaye',
    devanagari: 'भाषाद्वये',
    transliteration: 'bhāṣādvaye',
    meaning: 'In both languages',
    partOfSpeech: 'noun',
    syllables: [],
    conjunctConsonants: [],
    nounInflection: {
      gender: 'neuter',
      number: 'singular',
      case: 7,
      meaning: 'locative case (in both languages)',
    },
    examples: [
      'गीतं भाषाद्वये मुद्रितम् अस्ति। (The song is printed in both languages.)',
    ],
  },
  {
    id: 'word-ch1-bharatamatuh',
    devanagari: 'भारतमातुः',
    transliteration: 'bhāratamātuḥ',
    meaning: 'Of Mother India',
    partOfSpeech: 'noun',
    syllables: [],
    conjunctConsonants: [],
    nounInflection: {
      gender: 'feminine',
      number: 'singular',
      case: 6,
      meaning: 'genitive case (of Mother India)',
    },
    examples: [
      'अस्मिन् गीते भारतमातुः वर्णनम् अस्ति। (In this song, there is a description of Mother India.)',
      'वयं भारतमातुः सेवां कुर्मः। (We serve Mother India.)',
    ],
  },
  {
    id: 'word-ch1-svarupasya',
    devanagari: 'स्वरूपस्य',
    transliteration: 'svarūpasya',
    meaning: 'Of the true form / nature',
    partOfSpeech: 'noun',
    syllables: [],
    conjunctConsonants: [],
    nounInflection: {
      gender: 'neuter',
      number: 'singular',
      case: 6,
      meaning: 'genitive case (of the true form)',
    },
    examples: [
      'भारतमातुः स्वरूपस्य रम्यं वर्णनम्। (A beautiful description of Mother India\'s true form.)',
      'तस्य स्वरूपस्य ज्ञानं आवश्यकम्। (Knowledge of its true nature is necessary.)',
    ],
  },
  {
    id: 'word-ch1-ramyam',
    devanagari: 'रम्यं',
    transliteration: 'ramyaṃ',
    meaning: 'Beautiful / delightful',
    partOfSpeech: 'adjective',
    syllables: [],
    conjunctConsonants: [],
    nounInflection: {
      gender: 'neuter',
      number: 'singular',
      case: '1/2',
      meaning: 'nominative/accusative case (subject or object)',
    },
  },
  {
    id: 'word-ch1-varnanam',
    devanagari: 'वर्णनम्',
    transliteration: 'varṇanam',
    meaning: 'Description',
    partOfSpeech: 'noun',
    syllables: [],
    conjunctConsonants: [],
    nounInflection: {
      gender: 'neuter',
      number: 'singular',
      case: 1,
      meaning: 'nominative case (subject)',
    },
  },
];

/**
 * Search for Sanskrit words in the dictionary
 */
export const searchSanskritWords = (query: string): SanskritWordBreakdown[] => {
  const queryLower = query.toLowerCase();
  return SANSKRIT_WORDS_DICTIONARY.filter(
    (word) =>
      word.devanagari.includes(query) ||
      word.transliteration.toLowerCase().includes(queryLower) ||
      word.meaning.toLowerCase().includes(queryLower)
  );
};

/**
 * Get a Sanskrit word by ID
 */
export const getSanskritWordById = (id: string): SanskritWordBreakdown | undefined => {
  return SANSKRIT_WORDS_DICTIONARY.find((word) => word.id === id);
};

/**
 * Get all Sanskrit words (for listing/browsing)
 */
export const getAllSanskritWords = (): SanskritWordBreakdown[] => {
  return SANSKRIT_WORDS_DICTIONARY;
};
