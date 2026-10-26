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
  'अद्': {
    devanagari: 'अद्',
    transliteration: 'ad',
    meaning: 'to eat, to consume, to nourish',
    class: 2,
    description: 'Adādi-gaṇa root verb meaning "to eat" or "to nourish"',
    examples: ['अत्ति (He/She eats)', 'अत्तः (They two eat)', 'अदन्ति (They eat)'],
  },
  'क्षि': {
    devanagari: 'क्षि',
    transliteration: 'kṣi',
    meaning: 'to rule, to protect, to abide',
    class: 1,
    description: 'Root verb meaning "to protect", origin of क्षत्रिय (warrior)',
    examples: ['क्षयति (He rules / protects)'],
  },
  'शम्': {
    devanagari: 'शम्',
    transliteration: 'śam',
    meaning: 'to be calm, pacified, peaceful',
    class: 4,
    description: 'Root verb meaning "to be at peace", origin of शान्ति',
    examples: ['शाम्यति (He becomes peaceful)'],
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
  {
    id: 'word-annam',
    devanagari: 'अन्नम्',
    transliteration: 'annam',
    meaning: 'Food, grain, nourishment, physical sustenance',
    partOfSpeech: 'noun',
    syllables: [
      { devanagari: 'अ', transliteration: 'a', iotype: 'vowel' },
      { devanagari: 'न्नम्', transliteration: 'nnam', iotype: 'consonant' },
    ],
    conjunctConsonants: [
      {
        devanagari: 'न्न',
        transliteration: 'nna',
        components: ['न्', 'न'],
        description: 'Double dental nasal conjunct: n + na',
      },
    ],
    dhatu: COMMON_DHATUS['अद्'],
    pratyayas: [
      {
        devanagari: 'क्त',
        transliteration: 'kta',
        type: 'nominal',
        meaning: 'past passive participle (कर्मणि क्त)',
      },
    ],
    nounInflection: {
      gender: 'neuter',
      number: 'singular',
      case: 1,
      meaning: 'nominative / accusative neuter singular',
    },
    etymology: 'धातुः अद् (ad - भक्षणे) + प्रत्ययः क्त (कर्मणि) ➔ अन्नम् (अद्यते इति अन्नम् - that which sustains life)',
    examples: [
      'अन्नाद् भवन्ति भूतानि पर्जन्यादन्नसम्भवः। (From food all living beings arise - Gita 3.14)',
      'उष्णम् अन्नम् अस्ति। (The food is warm and nourishing.)',
      'अन्नं बहु कुर्वीत तद् व्रतम्। (Grow food in abundance; that is the sacred vow - Taittiriya Upanishad)',
    ],
  },
  {
    id: 'word-jnanam',
    devanagari: 'ज्ञानम्',
    transliteration: 'jñānam',
    meaning: 'Knowledge, wisdom, discernment, consciousness',
    partOfSpeech: 'noun',
    syllables: [
      { devanagari: 'ज्ञा', transliteration: 'jñā', iotype: 'consonant' },
      { devanagari: 'नम्', transliteration: 'nam', iotype: 'consonant' },
    ],
    conjunctConsonants: [
      {
        devanagari: 'ज्ञ',
        transliteration: 'jña',
        components: ['ज्', 'ञ'],
        description: 'Palatal conjunct: j + ña',
      },
    ],
    dhatu: COMMON_DHATUS['ज्ञा'],
    pratyayas: [
      {
        devanagari: 'ल्युट्',
        transliteration: 'lyuṭ (ana)',
        type: 'nominal',
        meaning: 'action/state noun suffix (भावे ल्युट्)',
      },
    ],
    nounInflection: {
      gender: 'neuter',
      number: 'singular',
      case: 1,
      meaning: 'nominative / accusative neuter singular',
    },
    etymology: 'ज्ञा (to know) + ल्युट् (ana) ➔ ज्ञानम् (the act of knowing / divine realization)',
    examples: [
      'न हि ज्ञानेन सदृशं पवित्रमिह विद्यते। (There is nothing in this world as purifying as knowledge - Gita 4.38)',
      'ज्ञानं परमं बलम्। (Knowledge is supreme strength.)',
    ],
  },
  {
    id: 'word-kshatriyah',
    devanagari: 'क्षत्रियः',
    transliteration: 'kṣatriyaḥ',
    meaning: 'Protector, ruler, warrior of righteousness',
    partOfSpeech: 'noun',
    syllables: [
      { devanagari: 'क्ष', transliteration: 'kṣa', iotype: 'consonant' },
      { devanagari: 'त्रि', transliteration: 'tri', iotype: 'consonant' },
      { devanagari: 'यः', transliteration: 'yaḥ', iotype: 'consonant' },
    ],
    conjunctConsonants: [
      {
        devanagari: 'क्ष',
        transliteration: 'kṣa',
        components: ['क्', 'ष'],
        description: 'Velar + retroflex conjunct: k + ṣa',
      },
      {
        devanagari: 'त्र',
        transliteration: 'tra',
        components: ['त्', 'र'],
        description: 'Dental + liquid conjunct: t + ra',
      },
    ],
    dhatu: COMMON_DHATUS['क्षि'],
    nounInflection: {
      gender: 'masculine',
      number: 'singular',
      case: 1,
      meaning: 'nominative masculine singular',
    },
    etymology: 'क्षातात् त्रायते इति क्षत्रियः (One who shields others from injury and protects the weak)',
    examples: [
      'क्षत्रियस्य धर्मः प्रजापालनम्। (The duty of a righteous ruler is protection of the people.)',
    ],
  },
  {
    id: 'word-trishulam',
    devanagari: 'त्रिशूलम्',
    transliteration: 'triśūlam',
    meaning: 'Trident (symbolizing mastery over the 3 Gunas: Sattva, Rajas, Tamas)',
    partOfSpeech: 'noun',
    syllables: [
      { devanagari: 'त्रि', transliteration: 'tri', iotype: 'consonant' },
      { devanagari: 'शू', transliteration: 'śū', iotype: 'consonant' },
      { devanagari: 'लम्', transliteration: 'lam', iotype: 'consonant' },
    ],
    conjunctConsonants: [
      {
        devanagari: 'त्र',
        transliteration: 'tra',
        components: ['त्', 'र'],
        description: 'Conjunct: t + ra',
      },
    ],
    nounInflection: {
      gender: 'neuter',
      number: 'singular',
      case: 1,
      meaning: 'nominative neuter singular',
    },
    etymology: 'त्रि (three) + शूलम् (sharp points) ➔ त्रिशूलम्',
    examples: [
      'शिवस्य हस्ते त्रिशूलम् अस्ति। (In Shiva\'s hand is the trident.)',
    ],
  },
  {
    id: 'word-shriphalam',
    devanagari: 'श्रीफलम्',
    transliteration: 'śrīphalam',
    meaning: 'Sacred coconut (auspicious offering symbolizing purity)',
    partOfSpeech: 'noun',
    syllables: [
      { devanagari: 'श्री', transliteration: 'śrī', iotype: 'consonant' },
      { devanagari: 'फ', transliteration: 'pha', iotype: 'consonant' },
      { devanagari: 'लम्', transliteration: 'lam', iotype: 'consonant' },
    ],
    conjunctConsonants: [
      {
        devanagari: 'श्र',
        transliteration: 'śra',
        components: ['श्', 'र'],
        description: 'Palatal sibilant + liquid: ś + ra',
      },
    ],
    nounInflection: {
      gender: 'neuter',
      number: 'singular',
      case: 1,
      meaning: 'nominative neuter singular',
    },
    etymology: 'श्री (sacred prosperity / Lakshmi) + फलम् (fruit) ➔ श्रीफलम् (coconut / bilva fruit)',
    examples: [
      'पूजायां श्रीफलं समर्पयति। (In worship, he offers the sacred coconut.)',
    ],
  },
  {
    id: 'word-shanti',
    devanagari: 'शान्तिः',
    transliteration: 'śāntiḥ',
    meaning: 'Peace, tranquility, cessation of disturbance',
    partOfSpeech: 'noun',
    syllables: [
      { devanagari: 'शान्', transliteration: 'śān', iotype: 'consonant' },
      { devanagari: 'तिः', transliteration: 'tiḥ', iotype: 'consonant' },
    ],
    conjunctConsonants: [
      {
        devanagari: 'न्त',
        transliteration: 'nta',
        components: ['न्', 'त'],
        description: 'Dental nasal + dental stop: n + ta',
      },
    ],
    dhatu: COMMON_DHATUS['शम्'],
    nounInflection: {
      gender: 'feminine',
      number: 'singular',
      case: 1,
      meaning: 'nominative feminine singular',
    },
    etymology: 'शम् (to be calm) + क्तिन् (ti) ➔ शान्तिः (profound inner tranquility)',
    examples: [
      'ॐ शान्तिः शान्तिः शान्तिः। (May peace reign in body, mind, and cosmos.)',
    ],
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
