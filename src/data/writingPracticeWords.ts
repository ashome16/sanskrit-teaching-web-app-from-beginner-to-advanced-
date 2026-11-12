import { STROKE_VOCABULARY } from './strokeVocabulary';
export type PracticeWord = { word: string; transliteration: string; gloss: string; theme: string };
const themes: Record<string, string[]> = {
  Animals: ['अश्वः', 'उष्ट्रः', 'कुञ्जरः', 'बकः', 'भल्लूकः', 'मयूरः', 'शुकः', 'सर्पः', 'हंसः'],
  Nature: ['अग्निः', 'अरण्यम्', 'आकाशः', 'उद्यानम्', 'उदयः', 'चन्द्रः', 'जलम्', 'तरुः', 'नदी', 'नक्षत्रम्', 'पत्रम्', 'पुष्पम्', 'लता', 'वृक्षः', 'सूर्यः', 'समुद्रः'],
  Everyday: ['छत्रम्', 'छात्रः', 'चषकः', 'चित्रम्', 'पटः', 'पाठः', 'दीपः', 'नेत्रम्', 'नौका', 'बालः', 'भवनम्', 'माता', 'मित्रम्', 'माला', 'यानम्', 'लेखनी', 'हस्तः'],
  Food: ['अन्नम्', 'आम्रम्', 'इक्षुः', 'जम्बूः', 'फलम्', 'श्रीफलम्'],
  Ideas: ['आनन्दः', 'उत्सवः', 'ज्ञानम्', 'योगः', 'शान्तिः', 'क्षमा', 'जिज्ञासा', 'श्रमः', 'श्रद्धा'],
};
const vocabulary = Object.values(STROKE_VOCABULARY).flat();
export const WRITING_PRACTICE_WORDS: PracticeWord[] = Object.entries(themes).flatMap(([theme, words]) =>
  words.flatMap(word => { const found = vocabulary.find(entry => entry.word === word); return found ? [{ ...found, theme }] : []; })
);
export const assignmentPracticeWords = (text: string): PracticeWord[] => [...new Set(text.normalize('NFC').split(/[\s।॥,;:!?]+/).filter(word => /[\u0900-\u097f]/.test(word)))].map(word => {
  const entry = vocabulary.find(item => item.word === word);
  return { word, transliteration: entry?.transliteration ?? '', gloss: entry?.gloss ?? 'From the current model passage', theme: 'Assignment' };
});

// These are writing progressions, not claims of append-only word derivation.
const chain = (theme: string, entries: [string, string, string][]): PracticeWord[] => entries.map(([word, transliteration, gloss]) => ({ word, transliteration, gloss, theme }));
export const WRITING_CHAINS: PracticeWord[] = [
  ...chain('Chain स', [
    ['स', 'sa', 'The letter sa'], ['सः', 'saḥ', 'He'],
    ['सत्य', 'satya', 'True (adjective stem)'], ['सत्यम्', 'satyam', 'Truth'],
    ['सत्यवान्', 'satyavān', 'A truthful person'], ['सत्यवादिनः', 'satyavādinaḥ', 'Truth-speakers (plural)'],
    ['सत्यवादी जनः', 'satyavādī janaḥ', 'A truthful person (a short phrase)'],
  ]),
  ...chain('Chain न', [
    ['न', 'na', 'Not / no'], ['नरः', 'naraḥ', 'Man / person'], ['नगरम्', 'nagaram', 'City'],
    ['नगराणि', 'nagarāṇi', 'Cities'], ['नगराधिपः', 'nagarādhipaḥ', 'City ruler'], ['नगराधिपतिः', 'nagarādhipatiḥ', 'Lord of the city'],
  ]),
  ...chain('Chain मा', [
    ['मा', 'mā', 'Do not'], ['माता', 'mātā', 'Mother'], ['मातुलः', 'mātulaḥ', 'Maternal uncle'],
    ['मातुलानी', 'mātulānī', 'Maternal uncle’s wife'], ['मातृभूमिः', 'mātṛbhūmiḥ', 'Motherland'],
    ['मातृभूम्यै नमः', 'mātṛbhūmyai namaḥ', 'Salutation to the motherland (a short phrase)'],
  ]),
];
// Count spoken syllables (vowel-bearing units), not code points or separate mātrās.
// Final consonants म् / न् do not add a syllable; forms without endings are practice stems.
export const SYLLABLE_PRACTICE_WORDS: PracticeWord[] = [
  ...chain('1 syllable', [['च','ca','And'],['न','na','Not'],['मा','mā','Do not']]),
  ...chain('2 syllables', [['जल','jala','Water (practice stem)'],['वन','vana','Forest (practice stem)'],['गज','gaja','Elephant (practice stem)']]),
  ...chain('3 syllables', [['कमल','kamala','Lotus (practice stem)'],['नगर','nagara','City (practice stem)'],['पुस्तक','pustaka','Book (practice stem)']]),
  ...chain('4 syllables', [['हिमालय','himālaya','Himalayas (practice stem)'],['विद्यालय','vidyālaya','School (practice stem)'],['उपवन','upavana','Garden (practice stem)'],['परमात्मन्','paramātman','Supreme Self (practice stem)']]),
  ...chain('5 syllables', [['महाभारत','mahābhārata','Mahābhārata (practice stem)'],['पुस्तकालय','pustakālaya','Library (practice stem)'],['वातावरण','vātāvaraṇa','Environment (practice stem)']]),
  ...chain('6 syllables', [['विश्वविद्यालय','viśvavidyālaya','University (practice stem)']]),
];
