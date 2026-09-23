/**
 * Pāṇinian Morphological Derivation & Deconstruction Engine
 * Implements:
 * 1. Guṇa & Vṛddhi vowel gradations
 * 2. 5 Core CBSE Lakāras (लट्, लृट्, लङ्, लोट्, विधिलिङ्)
 * 3. Kṛt Participle Generator (क्त्वा, तुमुन्, ल्यप्, क्त, शतृ)
 * 4. Word Deconstructor (Input word ➔ Root + Suffix + Meaning + Sūtra)
 * 5. Interactive Practice Challenges
 */

import type { DhatuEntry } from '../types/linguistics';
import { PERSON_LABELS, NUMBER_LABELS } from './latForms';

export { PERSON_LABELS, NUMBER_LABELS };

export type LakaraId = 'lat' | 'lrt' | 'lang' | 'lot' | 'vidhiling';

export interface LakaraInfo {
  id: LakaraId;
  nameSa: string;
  nameEn: string;
  tenseCategory: string;
  description: string;
  paniniSutra: string;
  example: string;
}

export const LAKARAS: LakaraInfo[] = [
  {
    id: 'lat',
    nameSa: 'लट्-लकारः',
    nameEn: 'Present Tense (Indicative)',
    tenseCategory: 'वर्तमान काल',
    description: 'Used for ongoing or habitual actions happening now.',
    paniniSutra: 'वर्तमाने लट् (३.२.१२३)',
    example: 'सः पुस्तकं पठति। (He reads a book.)',
  },
  {
    id: 'lrt',
    nameSa: 'लृट्-लकारः',
    nameEn: 'Simple Future Tense',
    tenseCategory: 'भविष्यत् काल',
    description: 'Used for future events that will happen.',
    paniniSutra: 'लृट् शेषे च (३.३.१३)',
    example: 'सः श्वः गमिष्यति। (He will go tomorrow.)',
  },
  {
    id: 'lang',
    nameSa: 'लङ्-लकारः',
    nameEn: 'Past Imperfect Tense',
    tenseCategory: 'भूतकाल (अनद्यतन)',
    description: 'Used for past actions with augment prefix अ- (अडागम).',
    paniniSutra: 'अनद्यतने लङ् (३.२.१११)',
    example: 'सः पाठम् अपठत्। (He studied the lesson.)',
  },
  {
    id: 'lot',
    nameSa: 'लोट्-लकारः',
    nameEn: 'Imperative / Command Mood',
    tenseCategory: 'आज्ञा / प्रार्थना',
    description: 'Used for orders, commands, wishes, and prayers.',
    paniniSutra: 'लोट् च (३.३.१६२)',
    example: 'त्वं सत्यं वद। (You speak the truth!)',
  },
  {
    id: 'vidhiling',
    nameSa: 'विधिलिङ्-लकारः',
    nameEn: 'Potential / Optative Mood',
    tenseCategory: 'विधि / सम्भावना',
    description: 'Used for advice, duty, possibility, or "should / ought to".',
    paniniSutra: 'विधिनिमन्त्रणामन्त्रणाधीष्टसंप्रश्नप्रार्थनेषु लिङ् (३.३.१६१)',
    example: 'छात्रः परिश्रमं कुर्यात्। (A student should work hard.)',
  },
];

export interface ConjugationCell {
  full: string;
  rootPart: string;
  vikaranaPart?: string;
  suffixPart: string;
  meaningEn: string;
  meaningHi: string;
}

export type ConjugationTable3x3 = [
  [ConjugationCell, ConjugationCell, ConjugationCell], // 3rd Person (प्रथम पुरुष: sg, du, pl)
  [ConjugationCell, ConjugationCell, ConjugationCell], // 2nd Person (मध्यम पुरुष: sg, du, pl)
  [ConjugationCell, ConjugationCell, ConjugationCell], // 1st Person (उत्तम पुरुष: sg, du, pl)
];

export interface KrtFormEntry {
  suffixName: string;
  suffixCode: string;
  devanagariForm: string;
  rootPart: string;
  suffixPart: string;
  meaningEn: string;
  meaningHi: string;
  paniniRule: string;
  exampleSentence: string;
  exampleTranslation: string;
}

export interface DeconstructionResult {
  query: string;
  matched: boolean;
  rootDevanagari: string;
  rootIast: string;
  rootMeaningEn: string;
  rootMeaningHi?: string;
  gana?: number;
  ganaName?: string;
  morphologyType: 'tinanta' | 'krdanta';
  grammaticalLabel: string;
  paniniSutra?: string;
  formula: {
    prefix?: string;
    root: string;
    vikarana?: string;
    suffix: string;
    result: string;
  };
  englishTranslation: string;
  hindiTranslation: string;
  notes?: string;
  exampleUsage: string;
  exampleMeaning: string;
}

// =========================================================================
// 1. Core Known Conjugation Models for Common Roots (5 Lakāras)
// =========================================================================

interface ParadigmData {
  root: string;
  lat: [[string, string, string], [string, string, string], [string, string, string]];
  lrt: [[string, string, string], [string, string, string], [string, string, string]];
  lang: [[string, string, string], [string, string, string], [string, string, string]];
  lot: [[string, string, string], [string, string, string], [string, string, string]];
  vidhiling: [[string, string, string], [string, string, string], [string, string, string]];
  krt: {
    ktva?: string;
    tumun?: string;
    lyap?: string;
    kta?: string;
    shatr?: string;
  };
}

const COMMON_PARADIGMS: Record<string, ParadigmData> = {
  path: {
    root: 'पठ्',
    lat: [
      ['पठति', 'पठतः', 'पठन्ति'],
      ['पठसि', 'पठथः', 'पठथ'],
      ['पठामि', 'पठावः', 'पठामः'],
    ],
    lrt: [
      ['पठिष्यति', 'पठिष्यतः', 'पठिष्यन्ति'],
      ['पठिष्यसि', 'पठिष्यथः', 'पठिष्यथ'],
      ['पठिष्यामि', 'पठिष्यावः', 'पठिष्यामः'],
    ],
    lang: [
      ['अपठत्', 'अपठताम्', 'अपठन्'],
      ['अपठः', 'अपठतम्', 'अपठत'],
      ['अपठम्', 'अपठाव', 'अपठाम'],
    ],
    lot: [
      ['पठतु', 'पठताम्', 'पठन्तु'],
      ['पठ', 'पठतम्', 'पठत'],
      ['पठानि', 'पठाव', 'पठाम'],
    ],
    vidhiling: [
      ['पठेत्', 'पठेताम्', 'पठेयुः'],
      ['पठेः', 'पठेतम्', 'पठेत'],
      ['पठेयम्', 'पठेव', 'पठेम'],
    ],
    krt: {
      ktva: 'पठित्वा',
      tumun: 'पठितुम्',
      lyap: 'संपठ्य',
      kta: 'पठितः / पठिता / पठितम्',
      shatr: 'पठन् / पठन्ती',
    },
  },
  gam: {
    root: 'गम्',
    lat: [
      ['गच्छति', 'गच्छतः', 'गच्छन्ति'],
      ['गच्छसि', 'गच्छथः', 'गच्छथ'],
      ['गच्छामि', 'गच्छावः', 'गच्छामः'],
    ],
    lrt: [
      ['गमिष्यति', 'गमिष्यतः', 'गमिष्यन्ति'],
      ['गमिष्यसि', 'गमिष्यथः', 'गमिष्यथ'],
      ['गमिष्यामि', 'गमिष्यावः', 'गमिष्यामः'],
    ],
    lang: [
      ['अगच्छत्', 'अगच्छताम्', 'अगच्छन्'],
      ['अगच्छः', 'अगच्छतम्', 'अगच्छत'],
      ['अगच्छम्', 'अगच्छाव', 'अगच्छाम'],
    ],
    lot: [
      ['गच्छतु', 'गच्छताम्', 'गच्छन्तु'],
      ['गच्छ', 'गच्छतम्', 'गच्छत'],
      ['गच्छानि', 'गच्छाव', 'गच्छाम'],
    ],
    vidhiling: [
      ['गच्छेत्', 'गच्छेताम्', 'गच्छेयुः'],
      ['गच्छेः', 'गच्छेतम्', 'गच्छेत'],
      ['गच्छेयम्', 'गच्छेव', 'गच्छेम'],
    ],
    krt: {
      ktva: 'गत्वा',
      tumun: 'गन्तुम्',
      lyap: 'आगत्य',
      kta: 'गतः / गता / गतम्',
      shatr: 'गच्छन् / गच्छन्ती',
    },
  },
  bhu: {
    root: 'भू',
    lat: [
      ['भवति', 'भवतः', 'भवन्ति'],
      ['भवसि', 'भवथः', 'भवथ'],
      ['भवामि', 'भवावः', 'भवामः'],
    ],
    lrt: [
      ['भविष्यति', 'भविष्यतः', 'भविष्यन्ति'],
      ['भविष्यसि', 'भविष्यथः', 'भविष्यथ'],
      ['भविष्यामि', 'भविष्यावः', 'भविष्यामः'],
    ],
    lang: [
      ['अभवत्', 'अभवताम्', 'अभवन्'],
      ['अभवः', 'अभवतम्', 'अभवत'],
      ['अभवम्', 'अभवाव', 'अभवाम'],
    ],
    lot: [
      ['भवतु', 'भवताम्', 'भवन्तु'],
      ['भव', 'भवतम्', 'भवत'],
      ['भवानि', 'भवाव', 'भवाम'],
    ],
    vidhiling: [
      ['भवेत्', 'भवेताम्', 'भवेयुः'],
      ['भवेः', 'भवेतम्', 'भवेत'],
      ['भवेयम्', 'भवेव', 'भवेम'],
    ],
    krt: {
      ktva: 'भूत्वा',
      tumun: 'भवितुम्',
      lyap: 'संभूय',
      kta: 'भूतः / भूता / भूतम्',
      shatr: 'भवन् / भवन्ती',
    },
  },
  likh: {
    root: 'लिख्',
    lat: [
      ['लिखति', 'लिखतः', 'लिखन्ति'],
      ['लिखसि', 'लिखथः', 'लिखथ'],
      ['लिखामि', 'लिखावः', 'लिखामः'],
    ],
    lrt: [
      ['लेखिष्यति', 'लेखिष्यतः', 'लेखिष्यन्ति'],
      ['लेखिष्यसि', 'लेखिष्यथः', 'लेखिष्यथ'],
      ['लेखिष्यामि', 'लेखिष्यावः', 'लेखिष्यामः'],
    ],
    lang: [
      ['अलिखत्', 'अलिखताम्', 'अलिखन्'],
      ['अलिखः', 'अलिखतम्', 'अलिखत'],
      ['अलिखम्', 'अलिखाव', 'अलिखाम'],
    ],
    lot: [
      ['लिखतु', 'लिखताम्', 'लिखन्तु'],
      ['लिख', 'लिखतम्', 'लिखत'],
      ['लिखानि', 'लिखाव', 'लिखाम'],
    ],
    vidhiling: [
      ['लिखेत्', 'लिखेताम्', 'लिखेयुः'],
      ['लिखेः', 'लिखेतम्', 'लिखेत'],
      ['लिखेयम्', 'लिखेव', 'लिखेम'],
    ],
    krt: {
      ktva: 'लिखित्वा',
      tumun: 'लेखितुम्',
      lyap: 'विलिख्य',
      kta: 'लिखितः / लिखिता / लिखितम्',
      shatr: 'लिखन् / लिखन्ती',
    },
  },
  kr: {
    root: 'कृ',
    lat: [
      ['करोति', 'कुरुतः', 'कुर्वन्ति'],
      ['करोषि', 'कुरुथः', 'कुरुथ'],
      ['करोमि', 'कुर्वः', 'कुर्मः'],
    ],
    lrt: [
      ['करिष्यति', 'करिष्यतः', 'करिष्यन्ति'],
      ['करिष्यसि', 'करिष्यथः', 'करिष्यथ'],
      ['करिष्यामि', 'करिष्यावः', 'करिष्यामः'],
    ],
    lang: [
      ['अकरोत्', 'अकुरुताम्', 'अकुर्वन्'],
      ['अकरोः', 'अकुरुतम्', 'अकुरुत'],
      ['अकरवम्', 'अकुर्व', 'अकुर्म'],
    ],
    lot: [
      ['करोतु', 'कुरुताम्', 'कुर्वन्तु'],
      ['कुरु', 'कुरुतम्', 'कुरुत'],
      ['करवाणि', 'करवाव', 'करवाम'],
    ],
    vidhiling: [
      ['कुर्यात्', 'कुर्याताम्', 'कुर्युः'],
      ['कुर्याः', 'कुर्यातम्', 'कुर्यात'],
      ['कुर्याम्', 'कुर्याव', 'कुर्याम'],
    ],
    krt: {
      ktva: 'कृत्वा',
      tumun: 'कर्तुम्',
      lyap: 'प्रकृत्य / उपकृत्य',
      kta: 'कृतः / कृता / कृतम्',
      shatr: 'कुर्वन् / कुर्वती',
    },
  },
  as: {
    root: 'अस्',
    lat: [
      ['अस्ति', 'स्तः', 'सन्ति'],
      ['असि', 'स्थः', 'स्थ'],
      ['अस्मि', 'स्वः', 'स्मः'],
    ],
    lrt: [
      ['भविष्यति', 'भविष्यतः', 'भविष्यन्ति'],
      ['भविष्यसि', 'भविष्यथः', 'भविष्यथ'],
      ['भविष्यामि', 'भविष्यावः', 'भविष्यामः'],
    ],
    lang: [
      ['आसीत्', 'आस्ताम्', 'आसन्'],
      ['आसीः', 'आस्तम्', 'आस्त'],
      ['आसम्', 'आस्व', 'आस्म'],
    ],
    lot: [
      ['अस्तु', 'स्ताम्', 'सन्तु'],
      ['एधि', 'स्तम्', 'स्त'],
      ['असानि', 'असाव', 'असाम'],
    ],
    vidhiling: [
      ['स्यात्', 'स्याताम्', 'स्युः'],
      ['स्याः', 'स्यातम्', 'स्यात'],
      ['स्याम्', 'स्याव', 'स्याम'],
    ],
    krt: {
      ktva: 'भूत्वा',
      tumun: 'भवितुम्',
      lyap: 'संभूय',
      kta: 'भूतः / भूता / भूतम्',
      shatr: 'सन् / सती',
    },
  },
  drsh: {
    root: 'दृश्',
    lat: [
      ['पश्यति', 'पश्यतः', 'पश्यन्ति'],
      ['पश्यसि', 'पश्यथः', 'पश्यथ'],
      ['पश्यामि', 'पश्यावः', 'पश्यामः'],
    ],
    lrt: [
      ['द्रक्ष्यति', 'द्रक्ष्यतः', 'द्रक्ष्यन्ति'],
      ['द्रक्ष्यसि', 'द्रक्ष्यथः', 'द्रक्ष्यथ'],
      ['द्रक्ष्यामि', 'द्रक्ष्यावः', 'द्रक्ष्यामः'],
    ],
    lang: [
      ['अपश्यत्', 'अपश्यताम्', 'अपश्यन्'],
      ['अपश्यः', 'अपश्यतम्', 'अपश्यत'],
      ['अपश्यम्', 'अपश्याव', 'अपश्याम'],
    ],
    lot: [
      ['पश्यतु', 'पश्यताम्', 'पश्यन्तु'],
      ['पश्य', 'पश्यतम्', 'पश्यत'],
      ['पश्यानि', 'पश्याव', 'पश्याम'],
    ],
    vidhiling: [
      ['पश्येत्', 'पश्येताम्', 'पश्येयुः'],
      ['पश्येः', 'पश्येतम्', 'पश्येत'],
      ['पश्येयम्', 'पश्येव', 'पश्येम'],
    ],
    krt: {
      ktva: 'दृष्ट्वा',
      tumun: 'द्रष्टुम्',
      lyap: 'संदृश्य',
      kta: 'दृष्टः / दृष्टा / दृष्टम्',
      shatr: 'पश्यन् / पश्यन्ती',
    },
  },
  stha: {
    root: 'स्था',
    lat: [
      ['तिष्ठति', 'तिष्ठतः', 'तिष्ठन्ति'],
      ['तिष्ठसि', 'तिष्ठथः', 'तिष्ठथ'],
      ['तिष्ठामि', 'तिष्ठावः', 'तिष्ठामः'],
    ],
    lrt: [
      ['स्थास्यति', 'स्थास्यतः', 'स्थास्यन्ति'],
      ['स्थास्यसि', 'स्थास्यथः', 'स्थास्यथ'],
      ['स्थास्यामि', 'स्थास्यावः', 'स्थास्यामः'],
    ],
    lang: [
      ['अतिष्ठत्', 'अतिष्ठताम्', 'अतिष्ठन्'],
      ['अतिष्ठः', 'अतिष्ठतम्', 'अतिष्ठत'],
      ['अतिष्ठम्', 'अतिष्ठाव', 'अतिष्ठाम'],
    ],
    lot: [
      ['तिष्ठतु', 'तिष्ठताम्', 'तिष्ठन्तु'],
      ['तिष्ठ', 'तिष्ठतम्', 'तिष्ठत'],
      ['तिष्ठानि', 'तिष्ठाव', 'तिष्ठाम'],
    ],
    vidhiling: [
      ['तिष्ठेत्', 'तिष्ठेताम्', 'तिष्ठेयुः'],
      ['तिष्ठेः', 'तिष्ठेतम्', 'तिष्ठेत'],
      ['तिष्ठेयम्', 'तिष्ठेव', 'तिष्ठेम'],
    ],
    krt: {
      ktva: 'स्थित्वा',
      tumun: 'स्थातुम्',
      lyap: 'उत्तस्थौ / प्रस्थाय',
      kta: 'स्थितः / स्थिता / स्थितम्',
      shatr: 'तिष्ठन् / तिष्ठन्ती',
    },
  },
  da: {
    root: 'दा',
    lat: [
      ['यच्छति', 'यच्छतः', 'यच्छन्ति'],
      ['यच्छसि', 'यच्छथः', 'यच्छथ'],
      ['यच्छामि', 'यच्छावः', 'यच्छामः'],
    ],
    lrt: [
      ['दास्यति', 'दास्यतः', 'दास्यन्ति'],
      ['दास्यसि', 'दास्यथः', 'दास्यथ'],
      ['दास्यामि', 'दास्यावः', 'दास्यामः'],
    ],
    lang: [
      ['अयच्छत्', 'अयच्छताम्', 'अयच्छन्'],
      ['अयच्छः', 'अयच्छतम्', 'अयच्छत'],
      ['अयच्छम्', 'अयच्छाव', 'अयच्छाम'],
    ],
    lot: [
      ['यच्छतु', 'यच्छताम्', 'यच्छन्तु'],
      ['यच्छ', 'यच्छतम्', 'यच्छत'],
      ['यच्छानि', 'यच्छाव', 'यच्छाम'],
    ],
    vidhiling: [
      ['यच्छेत्', 'यच्छेताम्', 'यच्छेयुः'],
      ['यच्छेः', 'यच्छेतम्', 'यच्छेत'],
      ['यच्छेयम्', 'यच्छेव', 'यच्छेम'],
    ],
    krt: {
      ktva: 'दत्त्वा',
      tumun: 'दातुम्',
      lyap: 'प्रदाय / आदाय',
      kta: 'दत्तः / दत्ता / दत्तम्',
      shatr: 'यच्छन् / यच्छन्ती',
    },
  },
  pa: {
    root: 'पा',
    lat: [
      ['पिबति', 'पिबतः', 'पिबन्ति'],
      ['पिबसि', 'पिबथः', 'पिबथ'],
      ['पिबामि', 'पिबावः', 'पिबामः'],
    ],
    lrt: [
      ['पास्यति', 'पास्यतः', 'पास्यन्ति'],
      ['पास्यसि', 'पास्यथः', 'पास्यथ'],
      ['पास्यामि', 'पास्यावः', 'पास्यामः'],
    ],
    lang: [
      ['अपिबत्', 'अपिबताम्', 'अपिबन्'],
      ['अपिबः', 'अपिबतम्', 'अपिबत'],
      ['अपिबम्', 'अपिबाव', 'अपिबाम'],
    ],
    lot: [
      ['पिबतु', 'पिबताम्', 'पिबन्तु'],
      ['पिब', 'पिबतम्', 'पिबत'],
      ['पिबानि', 'पिबाव', 'पिबाम'],
    ],
    vidhiling: [
      ['पिबेत्', 'पिबेताम्', 'पिबेयुः'],
      ['पिबेः', 'पिबेतम्', 'पिबेत'],
      ['पिबेयम्', 'पिबेव', 'पिबेम'],
    ],
    krt: {
      ktva: 'पीत्वा',
      tumun: 'पातुम्',
      lyap: 'निपीय',
      kta: 'पीतः / पीता / पीतम्',
      shatr: 'पिबन् / पिबन्ती',
    },
  },
  vad: {
    root: 'वद्',
    lat: [
      ['वदति', 'वदतः', 'वदन्ति'],
      ['वदसि', 'वदथः', 'वदथ'],
      ['वदामि', 'वदावः', 'वदामः'],
    ],
    lrt: [
      ['वदिष्यति', 'वदिष्यतः', 'वदिष्यन्ति'],
      ['वदिष्यसि', 'वदिष्यथः', 'वदिष्यथ'],
      ['वदिष्यामि', 'वदिष्यावः', 'वदिष्यामः'],
    ],
    lang: [
      ['अवदत्', 'अवदताम्', 'अवदन्'],
      ['अवदः', 'अवदतम्', 'अवदत'],
      ['अवदम्', 'अवदाव', 'अवदाम'],
    ],
    lot: [
      ['वदतु', 'वदताम्', 'वदन्तु'],
      ['वद', 'वदतम्', 'वदत'],
      ['वदानि', 'वदाव', 'वदाम'],
    ],
    vidhiling: [
      ['वदेत्', 'वदेताम्', 'वदेयुः'],
      ['वदेः', 'वदेतम्', 'वदेत'],
      ['वदेयम्', 'वदेव', 'वदेम'],
    ],
    krt: {
      ktva: 'उदित्वा',
      tumun: 'वदितुम्',
      lyap: 'संवाद्य',
      kta: 'उदितः / उदिता / उदितम्',
      shatr: 'वदन् / वदन्ती',
    },
  },
  nam: {
    root: 'नम्',
    lat: [
      ['नमति', 'नमतः', 'नमन्ति'],
      ['नमसि', 'नमथः', 'नमथ'],
      ['नमामि', 'नमावः', 'नमामः'],
    ],
    lrt: [
      ['नंस्यति', 'नंस्यतः', 'नंस्यन्ति'],
      ['नंस्यसि', 'नंस्यथः', 'नंस्यथ'],
      ['नंष्यामि', 'नंष्यावः', 'नंष्यामः'],
    ],
    lang: [
      ['अनमत्', 'अनमताम्', 'अनमन्'],
      ['अनमः', 'अनमतम्', 'अनमत'],
      ['अनमम्', 'अनमाव', 'अनमाम'],
    ],
    lot: [
      ['नमतु', 'नमताम्', 'नमन्तु'],
      ['नम', 'नमतम्', 'नमत'],
      ['नमानि', 'नमाव', 'नमाम'],
    ],
    vidhiling: [
      ['नमेत्', 'नमेताम्', 'नमेयुः'],
      ['नमेः', 'नमेतम्', 'नमेत'],
      ['नमेयम्', 'नमेव', 'नमेम'],
    ],
    krt: {
      ktva: 'नत्वा',
      tumun: 'नन्तुम्',
      lyap: 'प्रणम्य',
      kta: 'नतः / नता / नतम्',
      shatr: 'नमन् / नमन्ती',
    },
  },
};

// =========================================================================
// 2. Thematic Derivation Engine for Generic Roots
// =========================================================================

const THEMATIC_ENDINGS: Record<
  LakaraId,
  [[string, string, string], [string, string, string], [string, string, string]]
> = {
  lat: [
    ['ति', 'तः', 'न्ति'],
    ['सि', 'थः', 'थ'],
    ['ामि', 'ावः', 'ामः'],
  ],
  lrt: [
    ['ष्यति', 'ष्यतः', 'ष्यन्ति'],
    ['ष्यसि', 'ष्यथः', 'ष्यथ'],
    ['ष्यामि', 'ष्यावः', 'ष्यामः'],
  ],
  lang: [
    ['त्', 'ताम्', 'न्'],
    ['ः', 'तम्', 'त'],
    ['म्', 'ाव', 'ाम'],
  ],
  lot: [
    ['तु', 'ताम्', 'न्तु'],
    ['', 'तम्', 'त'],
    ['ानि', 'ाव', 'ाम'],
  ],
  vidhiling: [
    ['ेत्', 'ेताम्', 'ेयुः'],
    ['ेः', 'ेतम्', 'ेत'],
    ['ेयम्', 'ेव', 'ेम'],
  ],
};

/** Get the primary stem for a root. Checks example forms or computes regular thematic stem. */
function getThematicStem(entry: DhatuEntry): string {
  const ex = entry.examples?.[0];
  if (ex && ex.endsWith('ति')) {
    return ex.slice(0, -2);
  }
  if (ex && ex.endsWith('ते')) {
    return ex.slice(0, -2);
  }
  // Strip virama
  const clean = entry.devanagari.replace(/्$/, '');
  return clean;
}

export function deriveConjugationTable(
  entry: DhatuEntry,
  lakara: LakaraId
): ConjugationTable3x3 {
  const id = entry.id?.toLowerCase() || '';
  const paradigm = COMMON_PARADIGMS[id];

  // If we have a verified paradigm, use it
  if (paradigm && paradigm[lakara]) {
    const raw = paradigm[lakara];
    const rootName = entry.devanagari;
    const meaning = entry.meaning;

    return raw.map((row, pIdx) =>
      row.map((fullVal, nIdx) => {
        const pLabel = PERSON_LABELS[pIdx].en;
        const nLabel = NUMBER_LABELS[nIdx].en;
        const personHindi = pIdx === 0 ? 'वह / वे' : pIdx === 1 ? 'तुम' : 'मैं / हम';

        return {
          full: fullVal,
          rootPart: rootName,
          suffixPart: fullVal.replace(new RegExp(`^${rootName}`), '') || fullVal,
          meaningEn: `${pLabel} ${nLabel}: (${meaning})`,
          meaningHi: `${personHindi} (${entry.meaning_hi || meaning})`,
        };
      })
    ) as ConjugationTable3x3;
  }

  // Generic Thematic Generator
  const stem = getThematicStem(entry);
  const endings = THEMATIC_ENDINGS[lakara];
  const isPast = lakara === 'lang';
  const prefix = isPast ? 'अ' : '';

  return endings.map((row, pIdx) =>
    row.map((end, nIdx) => {
      let full = prefix + stem + end;
      if (lakara === 'lrt') {
        // e.g. stem + इ + ष्यति
        full = prefix + stem + 'ि' + end;
      }
      return {
        full,
        rootPart: entry.devanagari,
        suffixPart: end,
        meaningEn: `${PERSON_LABELS[pIdx].en} ${NUMBER_LABELS[nIdx].en}`,
        meaningHi: `${PERSON_LABELS[pIdx].short} ${NUMBER_LABELS[nIdx].short}`,
      };
    })
  ) as ConjugationTable3x3;
}

export function getKrtParticiples(entry: DhatuEntry): KrtFormEntry[] {
  const id = entry.id?.toLowerCase() || '';
  const p = COMMON_PARADIGMS[id]?.krt;

  const ktvaForm = p?.ktva || `${entry.devanagari.replace(/्$/, '')}ित्वा`;
  const tumunForm = p?.tumun || `${entry.devanagari.replace(/्$/, '')}ितुम्`;
  const lyapForm = p?.lyap || `सम्${entry.devanagari}य`;
  const ktaForm = p?.kta || `${entry.devanagari.replace(/्$/, '')}ितः`;
  const shatrForm = p?.shatr || `${getThematicStem(entry)}न्`;

  return [
    {
      suffixName: 'क्त्वा (ktvā)',
      suffixCode: 'ktva',
      devanagariForm: ktvaForm,
      rootPart: entry.devanagari,
      suffixPart: 'क्त्वा',
      meaningEn: `Having ${entry.meaning} (Past gerund)`,
      meaningHi: `${entry.meaning_hi || entry.meaning} करके (पूर्वकालिक)`,
      paniniRule: 'समानकर्तृकयोः पूर्वकाले (३.४.२१) — Indicates action done before the main verb.',
      exampleSentence: `सः कार्यं ${ktvaForm} सन्तुष्टः अभवत्।`,
      exampleTranslation: `Having ${entry.meaning}, he became content.`,
    },
    {
      suffixName: 'तुमुन् (tumun)',
      suffixCode: 'tumun',
      devanagariForm: tumunForm,
      rootPart: entry.devanagari,
      suffixPart: 'तुमुन्',
      meaningEn: `In order to ${entry.meaning} (Infinitive of purpose)`,
      meaningHi: `${entry.meaning_hi || entry.meaning} करने के लिए (प्रयोजन)`,
      paniniRule: 'तुमुन्ण्वुलौ क्रियायां क्रियार्थायाम् (३.३.१०) — Expresses intention or purpose.',
      exampleSentence: `सः ${tumunForm} इच्छति।`,
      exampleTranslation: `He wishes to ${entry.meaning}.`,
    },
    {
      suffixName: 'ल्यप् (lyap)',
      suffixCode: 'lyap',
      devanagariForm: lyapForm,
      rootPart: entry.devanagari,
      suffixPart: 'ल्यप् (उपसर्गयुक्त)',
      meaningEn: `Having ${entry.meaning} (used when a prefix is present)`,
      meaningHi: `उपसर्ग के साथ पूर्वकालिक क्रिया (करके)`,
      paniniRule: 'समासेऽनञ्पूर्वे क्त्वो ल्यप् (७.१.३७) — Replaces ktvā when verb has Upasarga.',
      exampleSentence: `सः गुरुं ${lyapForm} आशीर्वादं प्राप्नोति।`,
      exampleTranslation: `Having approached with reverence, he receives blessings.`,
    },
    {
      suffixName: 'क्त (kta)',
      suffixCode: 'kta',
      devanagariForm: ktaForm,
      rootPart: entry.devanagari,
      suffixPart: 'क्त',
      meaningEn: `Past Passive Participle (Was ${entry.meaning})`,
      meaningHi: `भूतकालिक कृदन्त (कर्मणि / भावे)`,
      paniniRule: 'क्तक्तवतू निष्ठा (१.१.२६) — Used for completed past events.',
      exampleSentence: `तेन पाठः ${ktaForm.split(' ')[0]}।`,
      exampleTranslation: `The lesson was studied by him.`,
    },
    {
      suffixName: 'शतृ (śatṛ)',
      suffixCode: 'shatr',
      devanagariForm: shatrForm,
      rootPart: entry.devanagari,
      suffixPart: 'शतृ',
      meaningEn: `While doing / continuous (Present active participle)`,
      meaningHi: `वर्तमानकालिक कृदन्त (करते हुए)`,
      paniniRule: 'लटः शतृशानचावप्रथमासमानाधिकरणे (३.२.१२४) — Simultaneous active action.',
      exampleSentence: `बालकः ${shatrForm.split(' ')[0]} हसति।`,
      exampleTranslation: `The boy smiles while performing the action.`,
    },
  ];
}

// =========================================================================
// 3. Word Deconstruction Index & Engine
// =========================================================================

interface DeconSeed {
  root: string;
  iast: string;
  meaningEn: string;
  meaningHi: string;
  gana?: number;
  type: 'tinanta' | 'krdanta';
  label: string;
  formula: { prefix?: string; root: string; vikarana?: string; suffix: string; result: string };
  translationEn: string;
  translationHi: string;
  sutra?: string;
  notes?: string;
  exampleUsage: string;
  exampleMeaning: string;
}

const DECONSTRUCTION_INDEX: Record<string, DeconSeed> = {
  गत्वा: {
    root: 'गम्',
    iast: 'gam',
    meaningEn: 'to go',
    meaningHi: 'जाना',
    gana: 1,
    type: 'krdanta',
    label: 'पूर्वकालिक कृदन्त (Indeclinable Past Participle)',
    formula: { root: 'गम्', suffix: 'क्त्वा', result: 'गत्वा' },
    translationEn: 'Having gone (after going)',
    translationHi: 'जाकर / जाने के बाद',
    sutra: 'समानकर्तृकयोः पूर्वकाले (३.४.२१) & अनुदात्तोपदेश… (६.४.३७ म-लोप)',
    notes: 'The final म् of root गम् is elided before क्त्वा per Pāṇini 6.4.37.',
    exampleUsage: 'बालकः विद्यालयं गत्वा पाठं पठति।',
    exampleMeaning: 'The boy studies the lesson after going to school.',
  },
  पठितुम्: {
    root: 'पठ्',
    iast: 'paṭh',
    meaningEn: 'to read, to study',
    meaningHi: 'पढ़ना',
    gana: 1,
    type: 'krdanta',
    label: 'तुमुन्-प्रत्ययान्तः (Infinitive of Purpose)',
    formula: { root: 'पठ्', vikarana: 'इट् (इ)', suffix: 'तुमुन्', result: 'पठितुम्' },
    translationEn: 'In order to read (to study)',
    translationHi: 'पढ़ने के लिए',
    sutra: 'तुमुन्ण्वुलौ क्रियायां क्रियार्थायाम् (३.३.१०) & आर्धधातुकस्येड् वलादेः (७.२.३५)',
    notes: 'Root पठ् is Set (वेट्/सेट्), so augment इट् (इ) is inserted before suffix तुमुन्.',
    exampleUsage: 'सः पुस्तकं पठितुम् इच्छति।',
    exampleMeaning: 'He wants to read the book.',
  },
  गन्तुम्: {
    root: 'गम्',
    iast: 'gam',
    meaningEn: 'to go',
    meaningHi: 'जाना',
    gana: 1,
    type: 'krdanta',
    label: 'तुमुन्-प्रत्ययान्तः (Infinitive of Purpose)',
    formula: { root: 'गम्', suffix: 'तुमुन्', result: 'गन्तुम्' },
    translationEn: 'In order to go',
    translationHi: 'जाने के लिए',
    sutra: 'तुमुन्ण्वुलौ क्रियायां क्रियार्थायाम् (३.३.१०) & मोऽनुस्वारः (८.३.२३)',
    notes: 'Final म् transforms to dental न् before dental त् of suffix तुमुन्.',
    exampleUsage: 'सः गृहं गन्तुम् उद्यतः अस्ति।',
    exampleMeaning: 'He is ready to go home.',
  },
  पठित्वा: {
    root: 'पठ्',
    iast: 'paṭh',
    meaningEn: 'to read, to study',
    meaningHi: 'पढ़ना',
    gana: 1,
    type: 'krdanta',
    label: 'क्त्वा-प्रत्ययान्तः (Gerund)',
    formula: { root: 'पठ्', vikarana: 'इट् (इ)', suffix: 'क्त्वा', result: 'पठित्वा' },
    translationEn: 'Having read',
    translationHi: 'पढ़कर',
    sutra: 'समानकर्तृकयोः पूर्वकाले (३.४.२१)',
    exampleUsage: 'सः पाठं पठित्वा क्रीडति।',
    exampleMeaning: 'He plays after reading the lesson.',
  },
  आगत्य: {
    root: 'गम्',
    iast: 'gam',
    meaningEn: 'to go (with prefix आ = to come)',
    meaningHi: 'आना',
    gana: 1,
    type: 'krdanta',
    label: 'ल्यप्-प्रत्ययान्तः (Prefixed Gerund)',
    formula: { prefix: 'आ', root: 'गम्', suffix: 'ल्यप्', result: 'आगत्य' },
    translationEn: 'Having arrived / Having come',
    translationHi: 'आकर / पहुँचकर',
    sutra: 'समासेऽनञ्पूर्वे क्त्वो ल्यप् (७.१.३७) & ह्रस्वस्य पिति कृति तुक् (६.१.७१)',
    notes: 'When a verbal root is prefixed with an Upasarga (आ-), suffix क्त्वा is replaced by ल्यप्.',
    exampleUsage: 'माता गृहम् आगत्य भोजनं पचति।',
    exampleMeaning: 'Mother cooks food after arriving home.',
  },
  भवति: {
    root: 'भू',
    iast: 'bhū',
    meaningEn: 'to be, to become',
    meaningHi: 'होना',
    gana: 1,
    type: 'tinanta',
    label: 'लट्-लकारः (Present), प्रथम पुरुष, एकवचन',
    formula: { root: 'भू (➔ भो)', vikarana: 'शप् (अ)', suffix: 'तिप् (ति)', result: 'भवति' },
    translationEn: 'He / She / It becomes or is',
    translationHi: 'वह होता है',
    sutra: 'सार्वधातुकार्धधातुकयोः (७.३.८४ Guṇa: ऊ➔ओ) & एचोऽयवायावः (६.१.७८ भो+अ=भव्)',
    notes: 'Root vowel ऊ gets Guṇa to ओ. Then Sandhi transforms भो + अ to भव्.',
    exampleUsage: 'विद्या विनयेन शोभते, सत्यं जयति, धर्मः भवति।',
    exampleMeaning: 'Virtue shines through humility; truth conquers; righteousness prevails.',
  },
  भवन्ति: {
    root: 'भू',
    iast: 'bhū',
    meaningEn: 'to be, to become',
    meaningHi: 'होना',
    gana: 1,
    type: 'tinanta',
    label: 'लट्-लकारः (Present), प्रथम पुरुष, बहुवचन',
    formula: { root: 'भू', vikarana: 'शप् (अ)', suffix: 'झि (अन्ति)', result: 'भवन्ति' },
    translationEn: 'They become / They are',
    translationHi: 'वे होते हैं',
    sutra: 'झोऽन्तः (७.१.३)',
    exampleUsage: 'सर्वे मानवाः सुखी भवन्तु, सर्वे सन्तु निरामयाः।',
    exampleMeaning: 'May all beings be happy; may all be free from illness.',
  },
  पठति: {
    root: 'पठ्',
    iast: 'paṭh',
    meaningEn: 'to read, to study',
    meaningHi: 'पढ़ना',
    gana: 1,
    type: 'tinanta',
    label: 'लट्-लकारः (Present), प्रथम पुरुष, एकवचन',
    formula: { root: 'पठ्', vikarana: 'शप् (अ)', suffix: 'तिप् (ति)', result: 'पठति' },
    translationEn: 'He / She reads',
    translationHi: 'वह पढ़ता / पढ़ती है',
    sutra: 'तिप्तस्झिसिप्थस्थमिब्वस्मस्ताताञ्झथासाथांध्वमिड्वहिमहिङ् (३.४.७८)',
    exampleUsage: 'छात्रः संस्कृतं पठति।',
    exampleMeaning: 'The student reads Sanskrit.',
  },
  अपठत्: {
    root: 'पठ्',
    iast: 'paṭh',
    meaningEn: 'to read, to study',
    meaningHi: 'पढ़ना',
    gana: 1,
    type: 'tinanta',
    label: 'लङ्-लकारः (Past), प्रथम पुरुष, एकवचन',
    formula: { prefix: 'अ (अडागम)', root: 'पठ्', vikarana: 'शप् (अ)', suffix: 'तिप् ➔ त्', result: 'अपठत्' },
    translationEn: 'He / She read (past)',
    translationHi: 'उसने पढ़ा',
    sutra: 'लुङ्लङ्ऌङ्क्ष्वडभ्युदात्तः (६.४.७१)',
    notes: 'Past tense prefix अ- (अडागम) is attached to the beginning of the verbal base.',
    exampleUsage: 'ह्यः छात्रः पुस्तकालयम् अपठत्।',
    exampleMeaning: 'Yesterday the student studied in the library.',
  },
  गमिष्यति: {
    root: 'गम्',
    iast: 'gam',
    meaningEn: 'to go',
    meaningHi: 'जाना',
    gana: 1,
    type: 'tinanta',
    label: 'लृट्-लकारः (Future), प्रथम पुरुष, एकवचन',
    formula: { root: 'गम्', vikarana: 'इट् + स्य (➔ इष्य)', suffix: 'ति', result: 'गमिष्यति' },
    translationEn: 'He / She will go',
    translationHi: 'वह जाएगा / जाएगी',
    sutra: 'लृट् शेषे च (३.३.१३) & आदेशप्रत्यययोः (८.३.५९ स➔ष)',
    notes: 'The future tense marker स्य transforms to ष resonance due to preceding vowel इ.',
    exampleUsage: 'सः रविवासरे काशीं गमिष्यति।',
    exampleMeaning: 'He will go to Varanasi on Sunday.',
  },
  गच्छति: {
    root: 'गम्',
    iast: 'gam',
    meaningEn: 'to go',
    meaningHi: 'जाना',
    gana: 1,
    type: 'tinanta',
    label: 'लट्-लकारः (Present), प्रथम पुरुष, एकवचन',
    formula: { root: 'गम् (➔ गच्छ)', vikarana: 'शप् (अ)', suffix: 'तिप् (ति)', result: 'गच्छति' },
    translationEn: 'He / She / It goes',
    translationHi: 'वह जाता / जाती है',
    sutra: 'इषुगमियमां छः (७.३.७७ gam ➔ gacch) & तिप्तस्झि… (३.४.७८)',
    notes: 'The root गम् substitutes into गच्छ before Śit affixes like शप् (अ).',
    exampleUsage: 'बालकः प्रतिदिनं विद्यालयं गच्छति।',
    exampleMeaning: 'The boy goes to school every day.',
  },
  समूपागच्छति: {
    root: 'गम्',
    iast: 'gam',
    meaningEn: 'to go (with prefixes सम् + उप + आ = to approach completely / reach closely)',
    meaningHi: 'सम्पूर्ण रूप से निकट आना / पास पहुँचना',
    gana: 1,
    type: 'tinanta',
    label: 'लट्-लकारः (Present), प्रथम पुरुष, एकवचन (सोपसर्ग तिङन्तः)',
    formula: {
      prefix: 'सम् + उप + आ (समूपा-)',
      root: 'गम् (➔ गच्छ)',
      vikarana: 'शप् (अ)',
      suffix: 'तिप् (ति)',
      result: 'समूपागच्छति',
    },
    translationEn: 'He / She / It approaches completely (reaches closely)',
    translationHi: 'वह पूर्ण रूप से समीप आता है',
    sutra: 'उपसर्गाः प्रादयः (१.४.५८) & इषुगमियमां छः (७.३.७७) & अकः सवर्णे दीर्घः (६.१.१०१)',
    notes: 'Modular assembly: 3 Upasargas (सम् + उप + आ fuse smoothly by Sandhi into समूपा-) + root गम् (mutates to present-stem गच्छ-) + Vikaraṇa spacer शप् (अ) + Pratyaya तिप् (ति).',
    exampleUsage: 'विद्वान् शिष्यं प्रेम्णा समूपागच्छति।',
    exampleMeaning: 'The wise teacher affectionately approaches close to the student.',
  },
  लेखिष्यति: {
    root: 'लिख्',
    iast: 'likh',
    meaningEn: 'to write',
    meaningHi: 'लिखना',
    gana: 6,
    type: 'tinanta',
    label: 'लृट्-लकारः (Future), प्रथम पुरुष, एकवचन',
    formula: { root: 'लिख् (➔ लेख्)', vikarana: 'इष्य', suffix: 'ति', result: 'लेखिष्यति' },
    translationEn: 'He / She will write',
    translationHi: 'वह लिखेगा / लिखेगी',
    sutra: 'पुगन्तलघूपधस्य च (७.३.८६ — Guṇa: इ➔ए in light penultimate syllable)',
    exampleUsage: 'छात्रः परीक्षायां सुन्दरं लेखिष्यति।',
    exampleMeaning: 'The student will write beautifully in the exam.',
  },
  कृत्वा: {
    root: 'कृ',
    iast: 'kṛ',
    meaningEn: 'to do, to make',
    meaningHi: 'करना',
    gana: 8,
    type: 'krdanta',
    label: 'क्त्वा-प्रत्ययान्तः (Gerund)',
    formula: { root: 'कृ', suffix: 'क्त्वा', result: 'कृत्वा' },
    translationEn: 'Having done / After doing',
    translationHi: 'करके / करने के बाद',
    sutra: 'समानकर्तृकयोः पूर्वकाले (३.४.२१)',
    exampleUsage: 'सः गृहकार्यं कृत्वा क्रीडनाय गच्छति।',
    exampleMeaning: 'He goes to play after doing homework.',
  },
  कर्तुम्: {
    root: 'कृ',
    iast: 'kṛ',
    meaningEn: 'to do, to make',
    meaningHi: 'करना',
    gana: 8,
    type: 'krdanta',
    label: 'तुमुन्-प्रत्ययान्तः (Infinitive)',
    formula: { root: 'कृ (➔ कर्)', suffix: 'तुमुन्', result: 'कर्तुम्' },
    translationEn: 'In order to do / To do',
    translationHi: 'करने के लिए',
    sutra: 'सार्वधातुकार्धधातुकयोः (७.३.८४ — Guṇa: ऋ➔अर्)',
    notes: 'The vowel ऋ of root कृ undergoes Guṇa to अर् before suffix तुमुन्.',
    exampleUsage: 'सः देशसेवा कर्तुम् उद्यतः अस्ति।',
    exampleMeaning: 'He is dedicated to serve the nation.',
  },
  पठेत्: {
    root: 'पठ्',
    iast: 'paṭh',
    meaningEn: 'to read, to study',
    meaningHi: 'पढ़ना',
    gana: 1,
    type: 'tinanta',
    label: 'विधिलिङ्-लकारः (Potential/Should), प्रथम पुरुष, एकवचन',
    formula: { root: 'पठ्', vikarana: 'शप् + यासुट्', suffix: 'ईत् (➔ एत्)', result: 'पठेत्' },
    translationEn: 'One should read / He might read',
    translationHi: 'उसे पढ़ना चाहिए',
    sutra: 'विधिनिमन्त्रणा… (३.३.१६१)',
    exampleUsage: 'सदा धर्मं चरेत्, सत्यं वदेत्, विद्यां च पठेत्।',
    exampleMeaning: 'One should always walk in righteousness, speak truth, and acquire knowledge.',
  },
  पठन्तु: {
    root: 'पठ्',
    iast: 'paṭh',
    meaningEn: 'to read, to study',
    meaningHi: 'पढ़ना',
    gana: 1,
    type: 'tinanta',
    label: 'लोट्-लकारः (Imperative), प्रथम पुरुष, बहुवचन',
    formula: { root: 'पठ्', vikarana: 'शप् (अ)', suffix: 'न्तु', result: 'पठन्तु' },
    translationEn: 'Let them read! / May they study!',
    translationHi: 'वे सब पढ़ें (आज्ञा)',
    sutra: 'लोट् च (३.३.१६२)',
    exampleUsage: 'सर्वे बालकाः ध्यानेन पठन्तु।',
    exampleMeaning: 'Let all boys study attentively.',
  },
};

/** Deconstruct an entered Sanskrit token into root, suffix, and grammatical formula. */
export function deconstructWord(
  query: string,
  dhatuLibrary: DhatuEntry[] = []
): DeconstructionResult {
  const clean = query.trim().replace(/[\s।॥,;:!?()[\]{}<>'"“”‘’\-–—०-९./\\=+#*~_`]+/g, '');

  if (!clean) {
    return {
      query,
      matched: false,
      rootDevanagari: '—',
      rootIast: '—',
      rootMeaningEn: 'Please enter a Sanskrit word to deconstruct.',
      morphologyType: 'tinanta',
      grammaticalLabel: 'Unknown',
      formula: { root: '—', suffix: '—', result: '—' },
      englishTranslation: '—',
      hindiTranslation: '—',
      exampleUsage: '—',
      exampleMeaning: '—',
    };
  }

  // 1. Direct match in curated school index
  if (DECONSTRUCTION_INDEX[clean]) {
    const seed = DECONSTRUCTION_INDEX[clean];
    return {
      query: clean,
      matched: true,
      rootDevanagari: seed.root,
      rootIast: seed.iast,
      rootMeaningEn: seed.meaningEn,
      rootMeaningHi: seed.meaningHi,
      gana: seed.gana,
      morphologyType: seed.type,
      grammaticalLabel: seed.label,
      paniniSutra: seed.sutra,
      formula: seed.formula,
      englishTranslation: seed.translationEn,
      hindiTranslation: seed.translationHi,
      notes: seed.notes,
      exampleUsage: seed.exampleUsage,
      exampleMeaning: seed.exampleMeaning,
    };
  }

  // 2. Dynamic Algorithmic Deconstruction
  // Suffix checks:
  // -त्वा (ktvā)
  if (clean.endsWith('त्वा')) {
    const rootGuess = clean.slice(0, -4) + '्';
    const match = dhatuLibrary.find((d) => d.devanagari === rootGuess || clean.startsWith(d.devanagari.replace(/्$/, '')));
    return {
      query: clean,
      matched: true,
      rootDevanagari: match?.devanagari || rootGuess,
      rootIast: match?.transliteration || 'root',
      rootMeaningEn: match?.meaning || 'verbal action',
      rootMeaningHi: match?.meaning_hi || 'क्रिया',
      gana: match?.gana,
      morphologyType: 'krdanta',
      grammaticalLabel: 'क्त्वा-प्रत्ययान्तः (पूर्वकालिक कृदन्त)',
      paniniSutra: 'समानकर्तृकयोः पूर्वकाले (३.४.२१)',
      formula: { root: match?.devanagari || rootGuess, suffix: 'क्त्वा', result: clean },
      englishTranslation: `Having ${match?.meaning || 'done the action'}`,
      hindiTranslation: `${match?.meaning_hi || 'कार्य'} करके`,
      exampleUsage: `सः कार्यं ${clean} सन्तुष्टः अभवत्।`,
      exampleMeaning: `Having completed the action, he became pleased.`,
    };
  }

  // -तुम् / -ितुम् (tumun)
  if (clean.endsWith('तुम्')) {
    const rootGuess = clean.slice(0, -4).replace(/ि$/, '') + '्';
    const match = dhatuLibrary.find((d) => d.devanagari === rootGuess || clean.startsWith(d.devanagari.replace(/्$/, '')));
    return {
      query: clean,
      matched: true,
      rootDevanagari: match?.devanagari || rootGuess,
      rootIast: match?.transliteration || 'root',
      rootMeaningEn: match?.meaning || 'verbal action',
      rootMeaningHi: match?.meaning_hi || 'क्रिया',
      gana: match?.gana,
      morphologyType: 'krdanta',
      grammaticalLabel: 'तुमुन्-प्रत्ययान्तः (प्रयोजनार्थक कृदन्त)',
      paniniSutra: 'तुमुन्ण्वुलौ क्रियायां क्रियार्थायाम् (३.३.१०)',
      formula: { root: match?.devanagari || rootGuess, suffix: 'तुमुन्', result: clean },
      englishTranslation: `In order to ${match?.meaning || 'perform action'}`,
      hindiTranslation: `${match?.meaning_hi || 'कार्य'} करने के लिए`,
      exampleUsage: `सः ${clean} इच्छति।`,
      exampleMeaning: `He desires to perform the action.`,
    };
  }

  // Finite Verb heuristics (-ति, -न्ति, -सि, -ामि, etc.)
  if (clean.endsWith('ति')) {
    const base = clean.slice(0, -2);
    const match = dhatuLibrary.find(
      (d) => d.examples?.includes(clean) || clean.startsWith(d.devanagari.replace(/्$/, ''))
    );
    return {
      query: clean,
      matched: true,
      rootDevanagari: match?.devanagari || base + '्',
      rootIast: match?.transliteration || 'verb',
      rootMeaningEn: match?.meaning || 'to perform action',
      rootMeaningHi: match?.meaning_hi || 'करना',
      gana: match?.gana || 1,
      morphologyType: 'tinanta',
      grammaticalLabel: 'लट्-लकारः (Present), प्रथम पुरुष, एकवचन',
      paniniSutra: 'वर्तमाने लट् (३.२.१२३)',
      formula: { root: match?.devanagari || base + '्', vikarana: 'शप् (अ)', suffix: 'तिप् (ति)', result: clean },
      englishTranslation: `He / She ${match?.meaning || 'performs action'}`,
      hindiTranslation: `वह ${match?.meaning_hi || 'कार्य'} करता / करती है`,
      exampleUsage: `छात्रः ${clean}।`,
      exampleMeaning: `The student performs the action.`,
    };
  }

  // Fallback
  return {
    query: clean,
    matched: false,
    rootDevanagari: clean,
    rootIast: clean,
    rootMeaningEn: 'General Sanskrit token',
    morphologyType: 'tinanta',
    grammaticalLabel: 'Unrecognized inflected form',
    formula: { root: clean, suffix: '?', result: clean },
    englishTranslation: `Word: ${clean}`,
    hindiTranslation: `शब्द: ${clean}`,
    notes: 'Try searching one of our verified school samples: गत्वा, पठितुम्, भवति, अपठत्, गमिष्यति, आगत्य, कृत्वा.',
    exampleUsage: `${clean} वाक्ये प्रयुज्यते।`,
    exampleMeaning: `Used in Sanskrit context.`,
  };
}

// =========================================================================
// 4. Interactive Pratyaya Practice / Quiz Questions
// =========================================================================

export interface PratyayaQuestion {
  id: string;
  prompt: string;
  hindiPrompt: string;
  formula: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  example: string;
}

export const PRATYAYA_QUIZ_SET: PratyayaQuestion[] = [
  {
    id: 'pq_1',
    prompt: 'Which suffix converts a verb into "having done" (e.g. "having read" / "पढ़कर")?',
    hindiPrompt: 'पूर्वकालिक क्रिया (करके) दर्शाने के लिए कौन-सा प्रत्यय प्रयुक्त होता है?',
    formula: 'पठ् + [ ? ] = पठित्वा',
    options: ['तुमुन्', 'क्त्वा', 'ल्यप्', 'शतृ'],
    correctAnswer: 'क्त्वा',
    explanation: 'Pāṇini Sūtra ३.४.२१ (समानकर्तृकयोः पूर्वकाले): Suffix क्त्वा expresses an action done prior to the principal action.',
    example: 'सः पुस्तकं पठित्वा शयनं करोति। (Having read the book, he sleeps.)',
  },
  {
    id: 'pq_2',
    prompt: 'Which suffix expresses intention or purpose ("in order to go" / "जाने के लिए")?',
    hindiPrompt: 'प्रयोजन या उद्देश्य (के लिए) दर्शाने के लिए कौन-सा प्रत्यय आता है?',
    formula: 'गम् + [ ? ] = गन्तुम्',
    options: ['क्त', 'क्त्वा', 'तुमुन्', 'शानच्'],
    correctAnswer: 'तुमुन्',
    explanation: 'Pāṇini Sūtra ३.३.१० (तुमुन्ण्वुलौ क्रियायां क्रियार्थायाम्): Suffix तुमुन् forms the infinitive of purpose ("in order to").',
    example: 'सः ग्रामं गन्तुम् इच्छति। (He desires to go to the village.)',
  },
  {
    id: 'pq_3',
    prompt: 'When a verbal root is prefixed with an Upasarga (like आ-), what suffix replaces क्त्वा?',
    hindiPrompt: 'जब धातु से पहले कोई उपसर्ग जुड़ा हो, तो क्त्वा के स्थान पर कौन-सा प्रत्यय लगता है?',
    formula: 'आ + गम् + [ ? ] = आगत्य',
    options: ['ल्यप्', 'तुमुन्', 'क्तवतु', 'तव्यत्'],
    correctAnswer: 'ल्यप्',
    explanation: 'Pāṇini Sūtra ७.१.३७ (समासेऽनञ्पूर्वे क्त्वो ल्यप्): If the root has a prefix, क्त्वा is replaced by ल्यप् (ending in -य).',
    example: 'छात्रा विद्यालयम् आगत्य नमन्ति। (Having arrived at school, students bow respectfully.)',
  },
  {
    id: 'pq_4',
    prompt: 'What is the correct 3rd Person Singular Future (लृट्-लकार) form of पठ्?',
    hindiPrompt: 'पठ् धातु का लृट्-लकार (भविष्यत् काल), प्रथम पुरुष, एकवचन रूप क्या है?',
    formula: 'पठ् + स्य (लृट्) + ति = [ ? ]',
    options: ['पठति', 'अपठत्', 'पठिष्यति', 'पठेत्'],
    correctAnswer: 'पठिष्यति',
    explanation: 'Root पठ् is a Set root; it receives augment इट् (इ), causing स्य to resonant as ष्य (पठ् + इ + ष्य + ति = पठिष्यति).',
    example: 'बालकः श्वः पुस्तकं पठिष्यति। (The boy will read the book tomorrow.)',
  },
  {
    id: 'pq_5',
    prompt: 'What past tense prefix (augment) is added at the beginning of verbs in लङ्-लकारः?',
    hindiPrompt: 'लङ्-लकार (भूतकाल) में धातु के आरम्भ में कौन-सा आगम जुड़ता है?',
    formula: '[ ? ] + पठ् + त् = अपठत्',
    options: ['आ-', 'अ-', 'इ-', 'वि-'],
    correctAnswer: 'अ-',
    explanation: 'Pāṇini Sūtra ६.४.७१ (लुङ्लङ्ऌङ्क्ष्वडभ्युदात्तः): Augment अ- (अडागम) is prefixed to verb roots in the imperfect past (लङ्).',
    example: 'सः पाठम् अपठत्। (He read the lesson.)',
  },
  {
    id: 'pq_6',
    prompt: 'In Pāṇinian grammar, what vowel transformation (Guṇa) occurs when root भू meets the present suffix?',
    hindiPrompt: 'भू धातु में सार्वधातुक प्रत्यय मिलने पर कौन-सा गुण परिवर्तन होता है?',
    formula: 'भू ➔ [ ? ] + अ + ति = भवति',
    options: ['भा', 'भो', 'भी', 'भव्'],
    correctAnswer: 'भो',
    explanation: 'Pāṇini Sūtra ७.३.८४ (सार्वधातुकार्धधातुकयोः): Radical vowel ऊ undergoes Guṇa to ओ (भो). Then भो + अ undergoes Sandhi (६.१.७८) to become भव् + ति = भवति.',
    example: 'सत्यं जयति, धर्मः भवति। (Truth triumphs; righteousness becomes.)',
  },
];
