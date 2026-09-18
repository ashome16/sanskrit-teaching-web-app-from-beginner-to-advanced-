/**
 * Vibhakti (noun case) reference data shared by the header guide and the Word Analyzer.
 */

export interface VibhaktiCase {
  number: number;
  sanskrit: string;
  iast: string;
  role: string;
  description: string;
  form: string;
  template: string;
}

export const VIBHAKTI_CASES: VibhaktiCase[] = [
  { number: 1, sanskrit: 'प्रथमा', iast: 'Prathamā', role: 'Subject', description: 'Who is doing it', form: 'रामः', template: 'रामः पठति।' },
  { number: 2, sanskrit: 'द्वितीया', iast: 'Dvitīyā', role: 'Object', description: 'Receiving the action', form: 'रामम्', template: 'सीता रामम् पश्यति।' },
  { number: 3, sanskrit: 'तृतीया', iast: 'Tṛtīyā', role: 'Instrument', description: 'By / With something', form: 'रामेण', template: 'रामेण सह गच्छामि।' },
  { number: 4, sanskrit: 'चतुर्थी', iast: 'Caturthī', role: 'Purpose', description: 'For / To someone', form: 'रामाय', template: 'रामाय फलम्।' },
  { number: 5, sanskrit: 'पञ्चमी', iast: 'Pañcamī', role: 'Source', description: 'From somewhere', form: 'रामात्', template: 'रामात् पत्रम्।' },
  { number: 6, sanskrit: 'षष्ठी', iast: 'Ṣaṣṭhī', role: 'Possession', description: "Of / Someone's", form: 'रामस्य', template: 'रामस्य पुस्तकम्।' },
  { number: 7, sanskrit: 'सप्तमी', iast: 'Saptamī', role: 'Location', description: 'In / On / At a place', form: 'रामे', template: 'रामे विश्वासः।' },
  { number: 8, sanskrit: 'सम्बोधन', iast: 'Sambodhana', role: 'Calling', description: 'Speaking to someone', form: 'हे राम', template: 'हे राम, आगच्छ।' },
];

export interface VibhaktiBalakaItem {
  number: number;
  sanskrit: string;
  iast: string;
  caseName: string;
  role: string;
  roleSanskrit: string;
  englishIndicator: string;
  singularSuffixDeva: string;
  singularSuffixIast: string;
  exampleWord: string;
  exampleWordIast: string;
  wordMeaning: string;
  sentence: string;
  sentenceIast: string;
  sentenceMeaning: string;
  explanation: string;
  kickerNote?: string;
}

export const BALAKA_VIBHAKTI_DATA: VibhaktiBalakaItem[] = [
  {
    number: 1,
    sanskrit: 'प्रथमा विभक्ति',
    iast: 'Prathamā Vibhakti',
    caseName: 'Nominative Case',
    role: 'The Subject (The doer of the action)',
    roleSanskrit: 'कर्ता (Kartā)',
    englishIndicator: 'No preposition (The / A)',
    singularSuffixDeva: '-ः',
    singularSuffixIast: '-aḥ',
    exampleWord: 'बालकः',
    exampleWordIast: 'Bālakaḥ',
    wordMeaning: 'The boy',
    sentence: 'बालकः पठति।',
    sentenceIast: 'Bālakaḥ paṭhati.',
    sentenceMeaning: 'The boy reads.',
    explanation: "'बालकः' is the कर्ता (Subject) performing the action of reading (पठति). The masculine singular takes the visarga suffix -ः (-aḥ).",
    kickerNote: 'Primary agent directly linked to the verb',
  },
  {
    number: 2,
    sanskrit: 'द्वितीया विभक्ति',
    iast: 'Dvitīyā Vibhakti',
    caseName: 'Accusative Case',
    role: 'The Direct Object (Recipient or target of the action)',
    roleSanskrit: 'कर्मन् (Karman)',
    englishIndicator: 'To / Whom / What',
    singularSuffixDeva: '-म्',
    singularSuffixIast: '-am',
    exampleWord: 'बालकम्',
    exampleWordIast: 'Bālakam',
    wordMeaning: 'To the boy / the boy (as object)',
    sentence: 'जनकः बालकम् पश्यति।',
    sentenceIast: 'Janakaḥ bālakam paśyati.',
    sentenceMeaning: 'Father sees the boy.',
    explanation: "'बालकम्' is the कर्मन् (Object) towards whom Father's sight is directed. Marked by anusvāra/makāra suffix -म् (-am).",
    kickerNote: 'The direct target or recipient of the action',
  },
  {
    number: 3,
    sanskrit: 'तृतीया विभक्ति',
    iast: 'Tṛtīyā Vibhakti',
    caseName: 'Instrumental Case',
    role: 'The Instrument / Means / Companion (With whom or by what means)',
    roleSanskrit: 'करणम् (Karaṇam)',
    englishIndicator: 'By / With',
    singularSuffixDeva: '-एण',
    singularSuffixIast: '-ena',
    exampleWord: 'बालकेन',
    exampleWordIast: 'Bālakena',
    wordMeaning: 'By / With the boy',
    sentence: 'शिक्षकः बालकेन सह गच्छति।',
    sentenceIast: 'Śikṣakaḥ bālakena saha gacchati.',
    sentenceMeaning: 'The teacher goes with the boy.',
    explanation: "'बालकेन' denotes either the instrument or companion (सहयोगे तृतीया). Marked by the suffix -एण (-ena).",
    kickerNote: 'Denotes means, agency, or accompaniment (सह)',
  },
  {
    number: 4,
    sanskrit: 'चतुर्थी विभक्ति',
    iast: 'Caturthī Vibhakti',
    caseName: 'Dative Case',
    role: 'The Recipient / Purpose (For whom something is given or done)',
    roleSanskrit: 'सम्प्रदानम् (Sampradānam)',
    englishIndicator: 'For / To',
    singularSuffixDeva: '-ाय',
    singularSuffixIast: '-āya',
    exampleWord: 'बालकाय',
    exampleWordIast: 'Bālakāya',
    wordMeaning: 'For / To the boy',
    sentence: 'माता बालकाय फलम् ददाति।',
    sentenceIast: 'Mātā bālakāya phalam dadāti.',
    sentenceMeaning: 'Mother gives a fruit to/for the boy.',
    explanation: "'बालकाय' represents the recipient of the gift (दानस्य कर्मणा यमभिप्रैति स सम्प्रदानम्). Marked by suffix -ाय (-āya).",
    kickerNote: 'Used whenever something is given (दा धातु) or for a dedicated purpose',
  },
  {
    number: 5,
    sanskrit: 'पञ्चमी विभक्ति',
    iast: 'Pañcamī Vibhakti',
    caseName: 'Ablative Case',
    role: 'Separation or Origin (Where something moves away from)',
    roleSanskrit: 'अपादानम् (Apādānam)',
    englishIndicator: 'From',
    singularSuffixDeva: '-आत्',
    singularSuffixIast: '-āt',
    exampleWord: 'बालकात्',
    exampleWordIast: 'Bālakāt',
    wordMeaning: 'From the boy',
    sentence: 'कन्दुकः बालकात् पतति।',
    sentenceIast: 'Kandukaḥ bālakāt patati.',
    sentenceMeaning: 'The ball falls from the boy.',
    explanation: "'बालकात्' denotes the fixed starting point from which separation occurs (ध्रुवमपायेऽपादानम्). Marked by suffix -आत् (-āt).",
    kickerNote: 'Indicates physical separation, departure, fear, or source',
  },
  {
    number: 6,
    sanskrit: 'षष्ठी विभक्ति',
    iast: 'Ṣaṣṭhī Vibhakti',
    caseName: 'Genitive Case',
    role: 'Possession or Relationship (Connects two nouns together)',
    roleSanskrit: 'सम्बन्धः (Sambandhaḥ)',
    englishIndicator: "Of / 's",
    singularSuffixDeva: '-स्य',
    singularSuffixIast: '-asya',
    exampleWord: 'बालकस्य',
    exampleWordIast: 'Bālakasya',
    wordMeaning: "Of the boy / Boy's",
    sentence: 'एतत् बालकस्य पुस्तकम्।',
    sentenceIast: 'Etat bālakasya pustakam.',
    sentenceMeaning: "This is the boy's book.",
    explanation: "'बालकस्य' shows belonging or relationship. (Not technically a Kāraka because it links noun-to-noun rather than directly to the verb). Marked by suffix -स्य (-asya).",
    kickerNote: 'Expresses ownership or familial/social connection',
  },
  {
    number: 7,
    sanskrit: 'सप्तमी विभक्ति',
    iast: 'Saptamī Vibhakti',
    caseName: 'Locative Case',
    role: 'The Location or Time (Where or when the action takes place)',
    roleSanskrit: 'अधिकरणम् (Adhikaraṇam)',
    englishIndicator: 'In / On / At',
    singularSuffixDeva: '-ए',
    singularSuffixIast: '-e',
    exampleWord: 'बालके',
    exampleWordIast: 'Bālake',
    wordMeaning: 'In / On the boy',
    sentence: 'बालके उत्तमः गुणः अस्ति।',
    sentenceIast: 'Bālake uttamaḥ guṇaḥ asti.',
    sentenceMeaning: 'A good quality exists in the boy.',
    explanation: "'बालके' signifies the physical or metaphorical locus/base of an action or attribute (आधारोऽधिकरणम्). Marked by suffix -ए (-e).",
    kickerNote: 'Answers the questions "Where?" or "In/on what?"',
  },
  {
    number: 8,
    sanskrit: 'सम्बोधन विभक्ति',
    iast: 'Sambodhana Vibhakti',
    caseName: 'Vocative Case',
    role: 'Addressing or calling out to someone',
    roleSanskrit: 'आह्वानम् (Āhvānam)',
    englishIndicator: 'O! / Hey!',
    singularSuffixDeva: 'हे ... !',
    singularSuffixIast: 'He ... !',
    exampleWord: 'हे बालक!',
    exampleWordIast: 'He bālaka!',
    wordMeaning: 'O Boy!',
    sentence: 'हे बालक! अत्र आगच्छ।',
    sentenceIast: 'He bālaka! atra āgaccha.',
    sentenceMeaning: 'O Boy! Come here.',
    explanation: "'हे बालक!' is used to address someone directly. Notice that the masculine singular drops the final visarga (बालकः becomes हे बालक!).",
    kickerNote: 'Drops the visarga in masculine -a stems; preceded by interjection हे',
  },
];

export interface MemoryTrickRow {
  number: number;
  caseName: string;
  sanskritCase: string;
  englishIndicator: string;
  suffixSound: string;
  suffixDeva: string;
  exampleWord: string;
  exampleWordIast: string;
  sentenceExample: string;
}

export const VIBHAKTI_MEMORY_TRICK_TABLE: MemoryTrickRow[] = [
  {
    number: 1,
    caseName: '1. Prathama',
    sanskritCase: 'प्रथमा',
    englishIndicator: '(Subject)',
    suffixSound: '-aḥ',
    suffixDeva: '-ः',
    exampleWord: 'बालकः',
    exampleWordIast: 'Bālakaḥ',
    sentenceExample: 'बालकः पठति (The boy reads)',
  },
  {
    number: 2,
    caseName: '2. Dvitiya',
    sanskritCase: 'द्वितीया',
    englishIndicator: 'To / Object',
    suffixSound: '-am',
    suffixDeva: '-म्',
    exampleWord: 'बालकम्',
    exampleWordIast: 'Bālakam',
    sentenceExample: 'जनकः बालकम् पश्यति (Father sees the boy)',
  },
  {
    number: 3,
    caseName: '3. Tritiya',
    sanskritCase: 'तृतीया',
    englishIndicator: 'By / With',
    suffixSound: '-ena',
    suffixDeva: '-एण',
    exampleWord: 'बालकेन',
    exampleWordIast: 'Bālakena',
    sentenceExample: 'शिक्षकः बालकेन सह गच्छति (Teacher goes with boy)',
  },
  {
    number: 4,
    caseName: '4. Chaturthi',
    sanskritCase: 'चतुर्थी',
    englishIndicator: 'For / To',
    suffixSound: '-āya',
    suffixDeva: '-ाय',
    exampleWord: 'बालकाय',
    exampleWordIast: 'Bālakāya',
    sentenceExample: 'माता बालकाय फलम् ददाति (Mother gives fruit for boy)',
  },
  {
    number: 5,
    caseName: '5. Panchami',
    sanskritCase: 'पञ्चमी',
    englishIndicator: 'From',
    suffixSound: '-āt',
    suffixDeva: '-आत्',
    exampleWord: 'बालकात्',
    exampleWordIast: 'Bālakāt',
    sentenceExample: 'कन्दुकः बालकात् पतति (Ball falls from boy)',
  },
  {
    number: 6,
    caseName: '6. Shashti',
    sanskritCase: 'षष्ठी',
    englishIndicator: "Of / 's",
    suffixSound: '-asya',
    suffixDeva: '-स्य',
    exampleWord: 'बालकस्य',
    exampleWordIast: 'Bālakasya',
    sentenceExample: 'एतत् बालकस्य पुस्तकम् (This is boy\'s book)',
  },
  {
    number: 7,
    caseName: '7. Saptami',
    sanskritCase: 'सप्तमी',
    englishIndicator: 'In / On / At',
    suffixSound: '-e',
    suffixDeva: '-ए',
    exampleWord: 'बालके',
    exampleWordIast: 'Bālake',
    sentenceExample: 'बालके उत्तमः गुणः अस्ति (Good quality is in boy)',
  },
  {
    number: 8,
    caseName: '8. Sambodhana',
    sanskritCase: 'सम्बोधन',
    englishIndicator: 'O! / Hey!',
    suffixSound: 'He ... !',
    suffixDeva: 'हे ... !',
    exampleWord: 'हे बालक!',
    exampleWordIast: 'He bālaka!',
    sentenceExample: 'हे बालक! अत्र आगच्छ (O Boy! Come here)',
  },
];

const CASE_NAME_BY_NUMBER: Record<number, string> = Object.fromEntries(
  VIBHAKTI_CASES.map((item) => [item.number, item.iast])
);

/** Formats a raw case value (e.g. 6 or "1/2") into its traditional label, e.g. "6 - Ṣaṣṭhī". */
export const formatCaseLabel = (value: number | string): string => {
  const raw = String(value).trim();
  if (!raw) return raw;

  const names = raw
    .split('/')
    .map((part) => part.trim())
    .map((part) => CASE_NAME_BY_NUMBER[Number(part)] ?? part);

  return `${raw} - ${names.join(' / ')}`;
};
