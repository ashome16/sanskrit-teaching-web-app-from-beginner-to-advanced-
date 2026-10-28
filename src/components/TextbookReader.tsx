import React, { useEffect, useRef, useState } from 'react';
import type { Lesson, LessonSentence } from '../types/chapters';
import { aksharaLabel, varnamalaLabel } from '../utils/barakhadiPhonetics';
import {
  isShlokaOrVerseText,
  playLessonText,
  playPronunciation,
  playSequence,
  speakAsBodhi,
  stopPronunciation,
} from '../utils/pronunciation';
import { setBarakhadiSpeechContext } from '../utils/macBarakhadiSpeech';
import { hasDevanagariLetter, isDandaOrVerseNumberToken } from '../utils/dandaSpeech';
import { readerSpeechItems, readerTokens } from '../utils/readerTokens';
import {
  loadAnalyseGlosses,
  lookupAnalyseGloss,
  englishMeaningFromGloss,
  type AnalyseRegistry,
} from '../utils/analyseGloss';
import { useAuthStore } from '../store/authStore';
import { canAccessAllChapters, isFreeTrialOpenLesson, canAccessChapter } from '../utils/premiumAccess';
import { Grade8SyllabusModal } from './Grade8SyllabusModal';
import { BodhiAvatar } from './BodhiAvatar';
import { GRADE_7_SYLLABUS } from '../data/grade7Syllabus';
import { GRADE_9_SYLLABUS } from '../data/grade9Syllabus';
import { getLetterMnemonic } from '../data/varnamalaMnemonics';
import { VarnamalaWritingPad } from './VarnamalaWritingPad';
import { ErrorBoundary } from './ErrorBoundary';
import GunitaaksharaGuide from './GunitaaksharaGuide';
import { NumbersGuide } from './NumbersGuide';
import { SimpleSentencesStudio } from './SimpleSentencesStudio';
import { getTextbookMetaForLesson } from '../utils/textbookCovers';
import VarnamalaFlashcardDownloadModal from './VarnamalaFlashcardDownloadModal';
import ParagraphWordMatchTest from './ParagraphWordMatchTest';
import SwarReviewPractice from './SwarReviewPractice';
import SwarWorkbooksHub from './SwarWorkbooksHub';
import '../styles/textbook-reader.css';
import '../styles/varnamala-studio.css';

export const VALID_VARNAMALA_SUBMODES = ['sound', 'writing', 'quizzes', 'workbooks', 'worksheets'] as const;
export type VarnamalaSubMode = (typeof VALID_VARNAMALA_SUBMODES)[number];

export const isValidVarnamalaSubMode = (mode: unknown): mode is VarnamalaSubMode =>
  typeof mode === 'string' && (VALID_VARNAMALA_SUBMODES as readonly string[]).includes(mode);

interface TextbookReaderProps {
  lessons: Lesson[];
  activeLessonId: string;
  onSelectLesson: (lessonId: string) => void;
  sentence: LessonSentence;
  sentenceNumber: number;
  totalSentences: number;
  activeWord?: string;
  onWordClick: (word: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  onJumpToSentence: (index: number) => void;
  isFirstSentence: boolean;
  isLastSentence: boolean;
  onOpenQuiz?: (categoryOrAnchor?: string) => void;
  onOpenWorksheets?: (category?: string) => void;
  onOpenPuzzle?: (category?: string) => void;
  onOpenVoiceSettings?: () => void;
  onOpenCbseGuide?: () => void;
  /** Opens the बारहखड़ी lesson (deep link /barakhadi); access rules applied by the parent. */
  onOpenBarakhadi?: () => void;
  initialVarnamalaSubMode?: VarnamalaSubMode;
  onOpenCertificate?: () => void;
  onOpenBodhi?: () => void;
  onOpenGames?: () => void;
}

const cleanWord = (value: string): string =>
  value.replace(/[\s।॥,;:!?()[\]{}<>'"“”‘’\-–—०-९./\\=+#*~_`]+/g, '').trim();

type SectionJump = { index: number; label: string; kind?: string };

const buildSectionJumps = (lesson: Lesson | undefined): SectionJump[] => {
  if (!lesson?.sentences?.length) return [];
  const jumps: SectionJump[] = [];
  const isPrayerAllowed =
    lesson.id === 'gsde101' ||
    lesson.id === 'grade8_prarthana' ||
    lesson.id === 'grade9_prarthana';

  lesson.sentences.forEach((item, index) => {
    if (item.kind === 'section-header' || item.kind === 'chapter-header') {
      let label = 'पाठः · Lesson text';
      if (isPrayerAllowed && (item.sanskrit?.includes('प्रार्थना') || item.meaning?.toLowerCase().includes('prayer'))) {
        label = 'प्रार्थना · Prayer';
      } else if (item.sanskrit) {
        const short = item.sanskrit.replace(/\s+/g, ' ').trim();
        const sanitized = isPrayerAllowed ? short : short.replace(/प्रार्थना/g, 'पाठः').replace(/Prayer/gi, 'Lesson');
        label = sanitized.length > 42 ? `${sanitized.slice(0, 40)}…` : sanitized;
      }
      jumps.push({ index, label, kind: item.kind });
    } else if (item.kind === 'glossary-header') {
      jumps.push({ index, label: 'शब्दार्थ · Word meanings', kind: item.kind });
    } else if (item.kind === 'exercise-header') {
      const short = (item.sanskrit || 'Exercise').replace(/\s+/g, ' ').trim();
      jumps.push({ index, label: short.length > 42 ? `${short.slice(0, 40)}…` : short, kind: item.kind });
    }
  });
  if (!jumps.length || jumps[0].index !== 0) {
    jumps.unshift({ index: 0, label: isPrayerAllowed ? 'प्रार्थना · Prayer' : 'पाठः · Lesson text', kind: 'section-header' });
  }
  return jumps;
};

const getJumpChipLabel = (jump: SectionJump, activeLessonId: string): string => {
  if (jump.index === 0) {
    return ((activeLessonId === 'gsde101' || activeLessonId === 'grade8_prarthana' || activeLessonId === 'grade9_prarthana') && (jump.label.includes('प्रार्थना') || jump.label.toLowerCase().includes('prayer'))) ? 'प्रार्थना' : 'पाठः';
  }
  if (jump.label.includes('शब्दार्थ')) return 'शब्दार्थ';
  if (jump.label.includes('अभ्यास')) return 'अभ्यास';
  if (jump.kind === 'exercise-header' && (/^[०-९1-9१-९]/.test(jump.label))) {
    return jump.label.split(' ')[0];
  }
  if (jump.label.includes('भौगोलिक')) return 'भूगोलः';
  if (jump.label.includes('कारागार')) return 'कारागारः';
  if (jump.label.includes('पर्यटन')) return 'पर्यटनम्';
  if (jump.label.includes('जलक्रीडा')) return 'जलक्रीडा';
  if (jump.label.includes('आजीविका')) return 'आजीविका';
  if (jump.label.includes('प्रशस्ति')) return 'प्रशस्तिः';
  if (jump.label.includes('संवाद')) return 'संवादः';
  if (jump.label.includes('गीत')) return 'गीतम्';
  if (jump.label.includes('मन्त्र')) return 'मन्त्राः';
  if (jump.label.includes('परियोजना')) return 'परियोजना';
  if (jump.label.includes('श्लोक')) return 'श्लोक';
  if (jump.label.includes('कथा')) return 'कथा';
  if (jump.label.includes('दृश्य')) {
    const match = jump.label.match(/दृश्यम्\s*([०-९1-9१-९]+)/);
    return match ? `दृश्य ${match[1]}` : 'दृश्यम्';
  }
  if (jump.label.includes('नाटक')) return 'नाटकम्';
  if (jump.label.includes('ग्रन्थ')) return 'ग्रन्थ-परिचयः';
  if (jump.label.includes('सूक्त')) return 'सूक्तयः';
  if (jump.label.includes('द्रव्य') || jump.label.includes('रसायन') || jump.label.includes('विज्ञान')) return 'विज्ञानम्';
  if (jump.label.includes('स्तोत्र')) return 'स्तोत्रम्';
  if (jump.label.includes('अवधेय')) return 'अवधेयम्';
  if (jump.label.includes('पूरण')) return 'पूरणशब्दाः';
  if (jump.label.includes('सङ्ख्या')) return 'सङ्ख्याः';
  if (jump.label.includes('लङ्-लकार')) return 'लङ्-लकारः';
  if (jump.label.includes('वर्णमात्रा') || jump.label.includes('मात्रा-परिचय')) return 'वर्णमात्रा';
  if (jump.label.includes('कुक्कुट') || jump.label.includes('चाष')) return 'ध्वनि-मात्रा';
  if (jump.label.includes('कार्यकलाप')) return 'कार्यकलापः';
  if (jump.label.includes('गणना')) return 'मात्रा-गणना';
  if (jump.label.includes('व्यूह') || jump.label.includes('सप्ताङ्ग')) return 'व्यूहरचना';
  if (jump.label.includes('विस्तार') || jump.label.includes('पुराण')) return 'विस्तारः';
  if (jump.label.includes('लाभ')) return 'लाभाः';
  if (jump.label.includes('स्वास्थ्य') || jump.label.includes('नियम')) return 'स्वास्थ्य';
  if (jump.label.includes('पृष्ठम् ५६') || jump.label.includes('पृष्ठ ५६')) return 'पृष्ठ ५६';
  if (jump.label.includes('पृष्ठम् ३८') || jump.label.includes('पृष्ठ ३८') || jump.label.includes('Page 38')) return 'पृष्ठ ३८';
  return jump.label.split('·')[0].trim().slice(0, 10);
};


type StudyJump = { index: number; label: string; hint: string; heading: string };

const lessonTrack = (id: string): 'gsde' | 'grade8' | 'grade9' | null => {
  if (id.startsWith('grade8_')) return 'grade8';
  if (id.startsWith('grade9_')) return 'grade9';
  if (id.startsWith('gsde')) return 'gsde';
  return null;
};

/** Short link text taken from the lesson's own section heading. */
const glossaryLinkLabel = (heading: string): string => {
  if (heading.includes('शब्दार्थाः')) return 'शब्दार्थाः';
  if (heading.includes('शब्दार्थ')) return 'शब्दार्थः';
  return 'शब्दार्थः';
};

const exerciseLinkLabel = (sentences: LessonSentence[], start: number): string => {
  const blob = sentences.slice(start, start + 12).map((item) => item.sanskrit || '').join('\n');
  if (blob.includes('अभ्यासकार्यम्')) return 'अभ्यासकार्यम्';
  if (blob.includes('अभ्यास-समाधानम्')) return 'अभ्यास-समाधानम्';
  if (blob.includes('अभ्यासाः')) return 'अभ्यासाः';
  if (blob.includes('अभ्यास')) return 'अभ्यासः';
  return 'अभ्यासः';
};

const findStudyJumps = (lesson: Lesson | undefined): { glossary?: StudyJump; exercise?: StudyJump } => {
  if (!lesson?.sentences?.length) return {};
  const glossaryAt = lesson.sentences.findIndex(
    (item) => item.kind === 'glossary-header' || item.kind === 'glossary',
  );
  const exerciseAt = lesson.sentences.findIndex(
    (item) => item.kind === 'exercise-header' || (item.kind || '').startsWith('exercise'),
  );
  const out: { glossary?: StudyJump; exercise?: StudyJump } = {};
  if (glossaryAt >= 0) {
    const heading = (lesson.sentences[glossaryAt].sanskrit || '').replace(/\s+/g, ' ').trim();
    out.glossary = {
      index: glossaryAt,
      label: glossaryLinkLabel(heading),
      hint: 'Word meanings',
      heading: heading || 'शब्दार्थः',
    };
  }
  if (exerciseAt >= 0) {
    const heading = (lesson.sentences[exerciseAt].sanskrit || '').replace(/\s+/g, ' ').trim();
    out.exercise = {
      index: exerciseAt,
      label: exerciseLinkLabel(lesson.sentences, exerciseAt),
      hint: 'Exercises',
      heading: heading || 'अभ्यासः',
    };
  }
  return out;
};

interface SanskritSymbolItem {
  symbol: string;
  name: string;
  role: string;
  description: string;
  example: string;
}

const SANSKRIT_SYMBOLS: SanskritSymbolItem[] = [
  {
    symbol: '।',
    name: 'दण्डः (Daṇḍa)',
    role: 'पूर्णविरामः · Single Bar',
    description: 'Marks the end of a prose sentence, or the end of the first half (प्रथमार्ध / pāda) of a metric verse.',
    example: 'समुद्रः भारतमातुः चरणौ प्रक्षालयति।'
  },
  {
    symbol: '॥',
    name: 'द्वि-दण्डः (Dvi-daṇḍa)',
    role: 'महाविरामः · Double Bar',
    description: 'Marks the completion of an entire metric stanza (श्लोक), hymn, or major thematic section.',
    example: 'वन्दे मातरम्॥ सुजलां सुफलां मलयजशीतलाम्॥'
  },
  {
    symbol: 'ऽ',
    name: 'अवग्रहः (Avagraha)',
    role: 'अकार-लोपः · Elided Vowel',
    description: 'Denotes the elision of short "अ" when fused after words ending in "ए" or "ओ" (पूर्वरूप-सन्धि).',
    example: 'कोऽपि (कः + अपि), सोऽपि (सः + अपि)'
  },
  {
    symbol: 'ं',
    name: 'अनुस्वारः (Anusvāra)',
    role: 'नासिक्य-ध्वनिः · Nasal Resonance',
    description: 'Pure nasal resonance placed over a syllable. Represents "म्" before consonants in running text.',
    example: 'भारतम्, वन्दे, धर्मम्'
  },
  {
    symbol: 'ः',
    name: 'विसर्गः (Visarga)',
    role: 'कण्ठ्य-श्वासः · Glottal Aspiration',
    description: 'Two vertical dots creating a soft breath aspiration echoing the preceding vowel (रामः → ramaha).',
    example: 'रामः, सूर्यः, प्रातः'
  },
  {
    symbol: '्',
    name: 'हलन्तः / विरामः (Halanta / Virāma)',
    role: 'स्वर-लोपः · Pure Consonant',
    description: 'Cancels the default short "a" vowel of a consonant letter, creating a pure half-consonant.',
    example: 'क्, त्, म्, पठनम्'
  },
  {
    symbol: 'ँ',
    name: 'अनुनासिकः / चन्द्रबिन्दुः (Chandrabindu)',
    role: 'नासिक्य-स्वरः · Nasalized Vowel',
    description: 'Nasalizes the vowel itself through both mouth and nose simultaneously.',
    example: 'हँस, अँ'
  },
  {
    symbol: 'ॐ',
    name: 'प्रणवः / ओंकारः (Praṇava / Oṁkāra)',
    role: 'परब्रह्म-प्रतीकम् · Sacred Syllable Om',
    description: 'The primordial sacred acoustic icon of Sanskrit and Vedic literature (अ + उ + म्).',
    example: 'ॐ शान्तिः शान्तिः शान्तिः॥'
  }
];

interface MatraRow {
  vowel: string;
  matraSymbol: string;
  matraName: string;
  example: string;
  transliteration: string;
}

/** Sanskrit vowel signs (mātrās) with क as the combination base. */
const SANSKRIT_MATRAS: MatraRow[] = [
  { vowel: 'अ', matraSymbol: '(None / Inherent)', matraName: 'Akāra', example: 'क', transliteration: "ka (short 'a')" },
  { vowel: 'आ', matraSymbol: '◌ा', matraName: 'Ākāra', example: 'का', transliteration: "kā (long 'aa')" },
  { vowel: 'इ', matraSymbol: '◌ि', matraName: 'Ikāra', example: 'कि', transliteration: "ki (short 'i')" },
  { vowel: 'ई', matraSymbol: '◌ी', matraName: 'Īkāra', example: 'की', transliteration: "kī (long 'ee')" },
  { vowel: 'उ', matraSymbol: '◌ु', matraName: 'Ukāra', example: 'कु', transliteration: "ku (short 'u')" },
  { vowel: 'ऊ', matraSymbol: '◌ू', matraName: 'Ūkāra', example: 'कू', transliteration: "kū (long 'oo')" },
  { vowel: 'ऋ', matraSymbol: '◌ृ', matraName: 'Ṛkāra', example: 'कृ', transliteration: "kṛ (vocalic 'ri')" },
  { vowel: 'ॠ', matraSymbol: '◌ॄ', matraName: 'Ṝkāra', example: 'कॄ', transliteration: "kṝ (long vocalic 'ree')" },
  { vowel: 'ऌ', matraSymbol: '◌ॢ', matraName: 'Ḷkāra', example: 'कॢ', transliteration: "kḷ (vocalic 'li')" },
  { vowel: 'ए', matraSymbol: '◌े', matraName: 'Ekāra', example: 'के', transliteration: "ke (sound of 'ay')" },
  { vowel: 'ऐ', matraSymbol: '◌ै', matraName: 'Aikāra', example: 'कै', transliteration: "kai (sound of 'ai')" },
  { vowel: 'ओ', matraSymbol: '◌ो', matraName: 'Okāra', example: 'को', transliteration: "ko (sound of 'oh')" },
  { vowel: 'औ', matraSymbol: '◌ौ', matraName: 'Aukāra', example: 'कौ', transliteration: "kau (sound of 'ow')" },
];

interface DependentModifierRow {
  symbol: string;
  name: string;
  function: string;
  example: string;
  transliteration: string;
}

/** Dependent orthographic modifiers used with vowels / consonants. */
const DEPENDENT_MODIFIERS: DependentModifierRow[] = [
  { symbol: '◌ं', name: 'Anusvāra', function: 'Nasalizes the vowel', example: 'कं', transliteration: 'kaṃ' },
  { symbol: '◌ः', name: 'Visarga', function: 'Adds a soft breath/echo sound', example: 'कः', transliteration: 'kaḥ' },
  { symbol: '◌्', name: 'Halanta / Virāma', function: "Mutes the inherent 'a' sound", example: 'क्', transliteration: 'k (pure consonant)' },
];

type VarnamalaCategoryFilter = 'all' | 'vowels' | 'vargas' | 'semivowels' | 'sibilants' | 'ayogavaha' | 'conjuncts';

interface VarnamalaGroupMetadata {
  title: string;
  articulation: string;
  description: string;
  count: string;
  layoutClass: string;
  isVarga?: boolean;
}

const getVarnamalaGroupMeta = (groupIdx: number): VarnamalaGroupMetadata => {
  switch (groupIdx) {
    case 0:
      return {
        title: 'स्वराः · Vowels (Vocalic Resonance)',
        articulation: 'स्वतन्त्र-ध्वनयः · Independent Vocals',
        description: 'ह्रस्व-दीर्घ-प्लुत-भेदाः · 13 pure vocal sounds uttered freely without oral contact or obstruction.',
        count: '१३ वर्णाः',
        layoutClass: 'varnamala-row-letters--svara',
      };
    case 1:
      return {
        title: 'क-वर्गः · Velars (कण्ठ्य)',
        articulation: 'स्थानम्: कण्ठः · Throat / Guttural',
        description: 'उच्चारण-स्थानम् कण्ठः · Articulated at the soft palate (velum) in the back of the throat.',
        count: '५ वर्णाः',
        layoutClass: 'varnamala-row-letters--varga',
        isVarga: true,
      };
    case 2:
      return {
        title: 'च-वर्गः · Palatals (तालव्य)',
        articulation: 'स्थानम्: तालु · Hard Palate',
        description: 'उच्चारण-स्थानम् तालु · Flat surface of the tongue contacts the hard palate roof.',
        count: '५ वर्णाः',
        layoutClass: 'varnamala-row-letters--varga',
        isVarga: true,
      };
    case 3:
      return {
        title: 'ट-वर्गः · Retroflexes (मूर्धन्य)',
        articulation: 'स्थानम्: मूर्धा · Alveolar Ridge / Cerebral',
        description: 'उच्चारण-स्थानम् मूर्धा · Tongue tip curls back and taps the hard upper alveolar ridge.',
        count: '५ वर्णाः',
        layoutClass: 'varnamala-row-letters--varga',
        isVarga: true,
      };
    case 4:
      return {
        title: 'त-वर्गः · Dentals (दन्त्य)',
        articulation: 'स्थानम्: दन्ताः · Upper Teeth',
        description: 'उच्चारण-स्थानम् दन्ताः · Tip of the tongue touches the back of the upper front teeth.',
        count: '५ वर्णाः',
        layoutClass: 'varnamala-row-letters--varga',
        isVarga: true,
      };
    case 5:
      return {
        title: 'प-वर्गः · Labials (ओष्ठ्य)',
        articulation: 'स्थानम्: ओष्ठौ · Lips',
        description: 'उच्चारण-स्थानम् ओष्ठौ · Bilabial sounds formed by closing and releasing both lips.',
        count: '५ वर्णाः',
        layoutClass: 'varnamala-row-letters--varga',
        isVarga: true,
      };
    case 6:
      return {
        title: 'अन्तःस्थाः · Semivowels (Liquid Transitions)',
        articulation: 'मध्यस्थाः · Semi-Vocalic (In-Between)',
        description: 'ध्वनि-संक्रमणम् · Smooth acoustic bridge between pure vowels and obstructive consonants (य, र, ल, व).',
        count: '४ वर्णाः',
        layoutClass: 'varnamala-row-letters--quad',
      };
    case 7:
      return {
        title: 'ऊष्माणः · Sibilants & Aspirate (Warm Breath)',
        articulation: 'वायु-घर्षणम् · Fricatives & Breath',
        description: 'घर्षण-ध्वनयः · Airflow forced through narrow vocal channels producing warm hissing and aspiration (श, ष, स, ह).',
        count: '४ वर्णाः',
        layoutClass: 'varnamala-row-letters--quad',
      };
    case 8:
      return {
        title: 'अयोगवाहाः · Dependent Modifiers',
        articulation: 'पराश्रिताः · Attached Resonances',
        description: 'अयोगवाहाः ध्वनयः · Pure nasal humming (ं Anusvāra), gentle vowel echo (ः Visarga), and nasalized vowel (ँ Candrabindu).',
        count: '३ वर्णाः',
        layoutClass: 'varnamala-row-letters--tri',
      };
    case 9:
      return {
        title: 'संयुक्ताक्षराणि · Primary Conjuncts',
        articulation: 'विशिष्ट-संयोगाः · Classic Ligatures',
        description: 'अक्षर-संयोगः · Fundamental dual-consonant ligatures essential for authentic Sanskrit reading (क्ष, ज्ञ, त्र, श्र).',
        count: '४ वर्णाः',
        layoutClass: 'varnamala-row-letters--quad',
      };
    default:
      return {
        title: '',
        articulation: '',
        description: '',
        count: '',
        layoutClass: '',
      };
  }
};



interface PhysicalPageBreakdown {
  bookName: string;
  totalRange: string;
  textPages: string;
  glossaryPages: string;
  exercisePages: string;
}

const DEEPAKAM_CLASS7_PAGES: Record<string, PhysicalPageBreakdown> = {
  gsde101: { bookName: 'NCERT Deepakam (Class 7)', totalRange: '1–7', textPages: '1–3', glossaryPages: '4', exercisePages: '5–7' },
  gsde102: { bookName: 'NCERT Deepakam (Class 7)', totalRange: '15–27', textPages: '15–20', glossaryPages: '21', exercisePages: '22–27' },
  gsde103: { bookName: 'NCERT Deepakam (Class 7)', totalRange: '29–38', textPages: '29–31', glossaryPages: '32', exercisePages: '33–38' },
  gsde104: { bookName: 'NCERT Deepakam (Class 7)', totalRange: '39–45', textPages: '39–41', glossaryPages: '42', exercisePages: '43–45' },
  gsde105: { bookName: 'NCERT Deepakam (Class 7)', totalRange: '47–56', textPages: '47–50', glossaryPages: '51', exercisePages: '52–56' },
  gsde106: { bookName: 'NCERT Deepakam (Class 7)', totalRange: '57–70', textPages: '57–63', glossaryPages: '64', exercisePages: '65–70' },
  gsde107: { bookName: 'NCERT Deepakam (Class 7)', totalRange: '71–84', textPages: '71–75', glossaryPages: '76', exercisePages: '77–84' },
  gsde108: { bookName: 'NCERT Deepakam (Class 7)', totalRange: '85–95', textPages: '85–90', glossaryPages: '91', exercisePages: '92–95' },
  gsde109: { bookName: 'NCERT Deepakam (Class 7)', totalRange: '96–103', textPages: '96–98', glossaryPages: '99', exercisePages: '100–103' },
  gsde110: { bookName: 'NCERT Deepakam (Class 7)', totalRange: '104–114', textPages: '104–107', glossaryPages: '108', exercisePages: '109–114' },
  gsde111: { bookName: 'NCERT Deepakam (Class 7)', totalRange: '115–126', textPages: '115–119', glossaryPages: '120', exercisePages: '121–126' },
  gsde112: { bookName: 'NCERT Deepakam (Class 7)', totalRange: '127–136', textPages: '127–130', glossaryPages: '131', exercisePages: '132–136' },
  gsde113: { bookName: 'NCERT Deepakam (Class 7)', totalRange: '137–148', textPages: '137–148', glossaryPages: '144', exercisePages: '145–148' },
  gsde114: { bookName: 'NCERT Deepakam (Class 7)', totalRange: '149–158', textPages: '149–158', glossaryPages: '150', exercisePages: '151–158' },
  gsde115: { bookName: 'NCERT Deepakam (Class 7)', totalRange: '159–170', textPages: '159–170', glossaryPages: '160', exercisePages: '161–170' },
};

const getPhysicalPageBreakdown = (lesson: Lesson | undefined): PhysicalPageBreakdown | null => {
  if (!lesson) return null;
  if (DEEPAKAM_CLASS7_PAGES[lesson.id]) {
    return DEEPAKAM_CLASS7_PAGES[lesson.id];
  }
  if (lesson.page_numbers) {
    const isGrade8 = lesson.id.startsWith('grade8');
    const isGrade9 = lesson.id.startsWith('grade9');
    const bookName = isGrade8
      ? 'NCERT Ruchira / Sanskrit (Class 8)'
      : isGrade9
        ? 'NCERT Shemushi / Sanskrit (Class 9)'
        : 'NCERT Sanskrit Textbook';
    return {
      bookName,
      totalRange: lesson.page_numbers,
      textPages: lesson.page_numbers,
      glossaryPages: lesson.page_numbers,
      exercisePages: lesson.page_numbers,
    };
  }
  return null;
};

const getBlockPhysicalPage = (breakdown: PhysicalPageBreakdown | null, kind: string | undefined): string => {
  if (!breakdown) return '';
  if (kind?.startsWith('glossary')) {
    return `Page ${breakdown.glossaryPages} · शब्दार्थाः (Word Meanings)`;
  }
  if (kind?.startsWith('exercise')) {
    return `Page ${breakdown.exercisePages} · अभ्यास-समाधानम् (Exercise Solutions)`;
  }
  return `Page ${breakdown.textPages} · मूल-पाठः (Text Extract)`;
};

const CHAPTER_QUIZ_MAPPING: Record<string, string> = {
  gsde101: 'cbse_deepakam',
  gsde102: 'deep_ch2',
  gsde103: 'deep_ch3',
  gsde104: 'deep_ch4',
  gsde105: 'deep_ch5',
  gsde106: 'deep_ch6',
  gsde107: 'deep_ch7',
  gsde108: 'deep_ch8',
  gsde109: 'deep_ch9',
  gsde110: 'deep_ch10',
  gsde111: 'deep_ch11',
  gsde112: 'deep_ch12',
  gsde113: 'deep_ch13',
  gsde114: 'deep_ch14',
  gsde115: 'deep_ch14',
  grade8_ch1: 'grade8_ch1',
  grade8_ch2: 'grade8_ch2',
  grade8_ch3: 'grade8_ch3',
  grade8_ch4: 'grade8_ch4',
  grade9_ch1: 'grade9_ch1',
  grade9_ch2: 'grade9_ch2',
  grade9_ch3: 'grade9_ch3',
  grade9_ch4: 'grade9_ch4',
  grade9_ch5: 'grade9_ch5',
  grade9_ch6: 'grade9_ch6',
  grade9_ch7: 'grade9_ch7',
  grade9_ch8: 'grade9_ch8',
  grade9_ch9: 'grade9_ch9',
  grade9_ch10: 'grade9_ch10',
  grade9_ch11: 'grade9_ch11',
  grade9_ch12: 'grade9_ch12',
};

const CHAPTER_WORKSHEET_MAPPING: Record<string, string> = {
  gsde101: 'cbse_ch',
  gsde102: 'deep_ch2',
  gsde103: 'deep_ch3',
  gsde104: 'cbse_ch',
  gsde105: 'cbse_ch',
  gsde106: 'cbse_ch',
  gsde107: 'cbse_ch',
  gsde108: 'deep_ch8',
  gsde109: 'deep_ch9',
  gsde110: 'deep_ch10',
  gsde111: 'deep_ch11',
  gsde112: 'deep_ch12',
  gsde113: 'deep_ch13',
  gsde114: 'deep_ch14',
  gsde115: 'deep_ch14',
};

const getChapterPdfUrl = (lessonId: string): string => {
  if (lessonId.startsWith('gsde')) {
    return '/downloads/CBSE_Class7_Sanskrit_Deepakam_Master_Question_Bank.pdf';
  }
  return '/downloads/CBSE_Sanskrit_Blueprint_Mock_Exam_Kit.pdf';
};

const TextbookReader: React.FC<TextbookReaderProps> = ({
  lessons,
  activeLessonId,
  onSelectLesson,
  sentence,
  sentenceNumber,
  totalSentences,
  activeWord = '',
  onWordClick,
  onNext,
  onPrevious,
  onJumpToSentence,
  isFirstSentence,
  isLastSentence,
  onOpenQuiz,
  onOpenWorksheets,
  onOpenPuzzle,
  onOpenVoiceSettings,
  onOpenCbseGuide,
  onOpenBarakhadi,
  initialVarnamalaSubMode,
  onOpenCertificate,
  onOpenBodhi,
  onOpenGames,
}) => {
  const { isAdminLoggedIn, currentUser, openAuthModal } = useAuthStore();
  const canReadAllChapters = canAccessAllChapters(currentUser, isAdminLoggedIn);
  const isGrade8Lesson = activeLessonId.startsWith('grade8_');
  const isGrade9Lesson = activeLessonId.startsWith('grade9_');
  const activeLesson = lessons.find((lesson) => lesson.id === activeLessonId);
  const pageBreakdown = getPhysicalPageBreakdown(activeLesson);
  const currentChapterQuizCat = CHAPTER_QUIZ_MAPPING[activeLessonId] || 'cbse_deepakam';
  const currentChapterWsCat = CHAPTER_WORKSHEET_MAPPING[activeLessonId] || 'cbse_ch';
  const chapterPdfUrl = activeLesson?.pdf_guide_url || getChapterPdfUrl(activeLessonId);
  const isVarnamala = activeLessonId === 'varnamala';
  const isNumbers = activeLessonId === 'numbers';
  const isSimpleSentences = activeLessonId === 'simple-sentences';
  const isGroupedLesson = isVarnamala || isNumbers || isSimpleSentences || activeLessonId === 'barakhadi';
  const showRomanTiles = activeLessonId === 'barakhadi' || activeLessonId === 'varnamala';
  const tileLabel = (letter: string) =>
    activeLessonId === 'varnamala' ? varnamalaLabel(letter) : aksharaLabel(letter);
  const [isChartOpen, setIsChartOpen] = useState(false);
  const [isFlashcardDownloadOpen, setIsFlashcardDownloadOpen] = useState(false);
  const [isSoundVideoOpen, setIsSoundVideoOpen] = useState(false);
  const [isSymbolsOpen, setIsSymbolsOpen] = useState(false);
  const [isGunitaOpen, setIsGunitaOpen] = useState(false);
  const [isGrade8SyllabusOpen, setIsGrade8SyllabusOpen] = useState(false);
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  /** Lesson paragraphs only. Grouped charts (Varṇamālā / Numbers / बारहखड़ी) stay on isPlayingAll. */
  const [playAllPhase, setPlayAllPhase] = useState<'idle' | 'playing' | 'paused'>('idle');
  /** Set true only when all words of the final paragraph in a lesson have fully finished playing. */
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [playingLetter, setPlayingLetter] = useState<string | null>(null);
  /** Lesson Play all: display index of the word being spoken (highlight follows the voice). */
  const [playingTokenIdx, setPlayingTokenIdx] = useState<number | null>(null);
  const [playingGroupIdx, setPlayingGroupIdx] = useState<number | null>(null);
  const [varnamalaSubMode, setVarnamalaSubMode] = useState<VarnamalaSubMode>(() =>
    isValidVarnamalaSubMode(initialVarnamalaSubMode) ? initialVarnamalaSubMode : 'sound'
  );
  const [simpleSentencesTab, setSimpleSentencesTab] = useState<'roots' | 'matrix' | 'relative-sketch' | 'sentences' | 'practice'>('roots');

  useEffect(() => {
    if (initialVarnamalaSubMode && isValidVarnamalaSubMode(initialVarnamalaSubMode)) {
      setVarnamalaSubMode(initialVarnamalaSubMode);
    }
  }, [initialVarnamalaSubMode]);

  const effectiveVarnamalaSubMode: VarnamalaSubMode = isValidVarnamalaSubMode(varnamalaSubMode)
    ? varnamalaSubMode
    : 'sound';
  const [varnamalaCategoryFilter, setVarnamalaCategoryFilter] = useState<VarnamalaCategoryFilter>('all');
  const [numbersSubMode, setNumbersSubMode] = useState<'interactive' | 'tiles'>('interactive');
  const [padSelectedLetter, setPadSelectedLetter] = useState<string>('अ');
  const [glosses, setGlosses] = useState<AnalyseRegistry>({});
  const stopPlayAllRef = useRef<(() => void) | null>(null);
  /** Word index inside the current paragraph. Pause resumes here (replays the cut-off word). */
  const paragraphIndexRef = useRef(0);
  /** Set only when Play all itself moves to the next paragraph, so that navigation does not cancel it. */
  const continueAfterAdvanceRef = useRef(false);
  /** Section jump while paused: change the card, keep Pause. Do not speak. */
  const stayPausedOnJumpRef = useRef(false);
  /** Replay from the first card after Bodhi's line has stopped. */
  const replayFromStartRef = useRef(false);
  const [replayTick, setReplayTick] = useState(0);
  const endBodhiStopRef = useRef<(() => void) | null>(null);
  const [isGrade7SyllabusOpen, setIsGrade7SyllabusOpen] = useState(false);
  const [isGrade9SyllabusOpen, setIsGrade9SyllabusOpen] = useState(false);
  const beginLessonParagraphRef = useRef<(fromIndex: number) => void>(() => {});
  /** Letter shown in the mobile "now playing" chip after a single tile tap. */
  const [tapPlayingLetter, setTapPlayingLetter] = useState<string | null>(null);
  const tapChipTimerRef = useRef<number | null>(null);

  const clearTapChip = () => {
    if (tapChipTimerRef.current !== null) {
      window.clearInterval(tapChipTimerRef.current);
      tapChipTimerRef.current = null;
    }
    setTapPlayingLetter(null);
  };

  /**
   * Show the floating chip for a tapped tile while its audio plays. Read-only:
   * watches speechSynthesis.speaking (never touches playback). Minimum ~1.6s so
   * MP3-backed tiles still get a glimpse; hard cap 8s.
   */
  const showTapChip = (letter: string) => {
    if (typeof window === 'undefined') return;
    if (tapChipTimerRef.current !== null) window.clearInterval(tapChipTimerRef.current);
    setTapPlayingLetter(letter);
    let elapsed = 0;
    tapChipTimerRef.current = window.setInterval(() => {
      elapsed += 250;
      const synth = window.speechSynthesis;
      const busy = !!synth && (synth.speaking || synth.pending);
      if ((elapsed > 1600 && !busy) || elapsed > 8000) {
        if (tapChipTimerRef.current !== null) window.clearInterval(tapChipTimerRef.current);
        tapChipTimerRef.current = null;
        setTapPlayingLetter(null);
      }
    }, 250);
  };

  useEffect(() => () => {
    if (tapChipTimerRef.current !== null) window.clearInterval(tapChipTimerRef.current);
  }, []);

  const handleOpenWorksheetsDefault = () => {
    onOpenWorksheets?.();
  };

  useEffect(() => {
    let cancelled = false;
    loadAnalyseGlosses().then((data) => {
      if (!cancelled) setGlosses(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const cleanActiveWord = activeWord ? cleanWord(activeWord) : '';
  const activeGloss = cleanActiveWord ? lookupAnalyseGloss(glosses, cleanActiveWord) : undefined;
  const activeEnglishMeaning = activeGloss ? englishMeaningFromGloss(activeGloss) : '';
  const activeHindiMeaning = activeGloss?.languages?.hi?.meaning || '';

  /** Stop speechSynthesis and drop any utterances still queued by the sequence. */
  const cancelSpeechNow = () => {
    stopPlayAllRef.current?.();
    stopPlayAllRef.current = null;
    stopPronunciation();
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  const stopPlayAll = () => {
    continueAfterAdvanceRef.current = false;
    cancelSpeechNow();
    setIsPlayingAll(false);
    setPlayAllPhase('idle');
    paragraphIndexRef.current = 0;
    setPlayingLetter(null);
    setPlayingGroupIdx(null);
    clearTapChip();
  };

  useEffect(() => () => {
    stopPlayAllRef.current?.();
    stopPronunciation();
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, []);

  // Mac-only बारहखड़ी speech overrides apply only while this lesson is on screen.
  useEffect(() => {
    setBarakhadiSpeechContext(activeLessonId === 'barakhadi');
    return () => setBarakhadiSpeechContext(false);
  }, [activeLessonId]);

  useEffect(() => {
    // Play all finished a paragraph and asked to open the next one. Do not cancel.
    if (continueAfterAdvanceRef.current) {
      continueAfterAdvanceRef.current = false;
      setLessonCompleted(false);
      beginLessonParagraphRef.current(0);
      return;
    }
    // A शब्दार्थ / अभ्यास jump while paused only moves the card.
    if (stayPausedOnJumpRef.current) {
      stayPausedOnJumpRef.current = false;
      paragraphIndexRef.current = 0;
      setPlayAllPhase('paused');
      setIsPlayingAll(false);
      return;
    }
    // Lesson change, or the student moved paragraphs: stop. Do not resume or skip.
    setLessonCompleted(false);
    stopPlayAllRef.current?.();
    stopPlayAllRef.current = null;
    stopPronunciation();
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsPlayingAll((prev) => (prev ? false : prev));
    setPlayAllPhase('idle');
    paragraphIndexRef.current = 0;
    setPlayingLetter(null);
    setPlayingTokenIdx(null);
    setPlayingGroupIdx(null);
    clearTapChip();
  }, [activeLessonId, sentenceNumber]);

  const atLessonEnd = !isGroupedLesson && totalSentences > 0 && sentenceNumber === totalSentences;
  const showEndGuide = atLessonEnd && (lessonCompleted || playAllPhase === 'idle');

  useEffect(() => {
    // Bodhi only speaks celebration when the lesson is ACTUALLY completed (all words of final paragraph finished)!
    if (replayFromStartRef.current || !lessonCompleted || playAllPhase !== 'idle') {
      endBodhiStopRef.current?.();
      endBodhiStopRef.current = null;
      return;
    }
    const stop = speakAsBodhi('साधु। अयं पाठः समाप्तः।');
    endBodhiStopRef.current = stop;
    return () => {
      stop();
      if (endBodhiStopRef.current === stop) endBodhiStopRef.current = null;
    };
  }, [lessonCompleted, playAllPhase, activeLessonId]);

  useEffect(() => {
    if (!replayFromStartRef.current) return;
    if (sentenceNumber !== 1) {
      replayFromStartRef.current = false;
      return;
    }
    replayFromStartRef.current = false;
    beginLessonParagraphRef.current(0);
  }, [replayTick, sentenceNumber]);

  // Leaving Sound & Pictures (writing / worksheets) cancels playback.
  useEffect(() => {
    if (!isVarnamala) return;
    if (effectiveVarnamalaSubMode === 'sound') return;
    stopPlayAllRef.current?.();
    stopPlayAllRef.current = null;
    stopPronunciation();
    setIsPlayingAll(false);
    setPlayAllPhase('idle');
    paragraphIndexRef.current = 0;
    setPlayingLetter(null);
    setPlayingGroupIdx(null);
    clearTapChip();
  }, [isVarnamala, effectiveVarnamalaSubMode]);

  /**
   * Every word of the paragraph in reading order (इति, च, न … included), each
   * with its display index. Daṇḍas, verse numbers and English glosses are not spoken.
   */
  const speechItemsFromSentence = (item: LessonSentence) => readerSpeechItems(readerTokens(item));

  const collectPlayAllItems = (): string[] => {
    if (isGroupedLesson && activeLesson) {
      return activeLesson.sentences.flatMap((group) => group.words || []);
    }
    return speechItemsFromSentence(sentence).map((item) => item.text);
  };

  /**
   * Speak the current paragraph from `fromIndex` (lesson reader only).
   * Digits go through playSequence({ sanskritCardinals }) — the same path as a
   * single lesson word. Daṇḍa tokens are already filtered out.
   * When the paragraph finishes, open the next one and keep going.
   * Stops at the end of this lesson (does not enter the next lesson).
   */
  const beginLessonParagraph = (fromIndex: number) => {
    if (isGroupedLesson) return;
    setLessonCompleted(false);
    const items = speechItemsFromSentence(sentence);
    const start = Math.max(0, fromIndex);
    setPlayAllPhase('playing');
    setIsPlayingAll(true);
    setPlayingGroupIdx(null);
    setPlayingTokenIdx(null);
    if (start >= items.length) {
      if (sentenceNumber < totalSentences) {
        continueAfterAdvanceRef.current = true;
        paragraphIndexRef.current = 0;
        onJumpToSentence(sentenceNumber);
        return;
      }
      stopPlayAllRef.current = null;
      paragraphIndexRef.current = 0;
      setPlayAllPhase('idle');
      setIsPlayingAll(false);
      setPlayingLetter(null);
      setPlayingTokenIdx(null);
      setLessonCompleted(true);
      return;
    }
    const slice = items.slice(start);
    stopPlayAllRef.current?.();
    stopPlayAllRef.current = null;
    const isShloka = isShlokaOrVerseText(sentence?.sanskrit || '');
    stopPlayAllRef.current = playSequence(slice.map((item) => item.text), {
      gapMs: isShloka ? 420 : 240,
      rate: isShloka ? 0.68 : undefined,
      sanskritCardinals: true,
      onItem: (word, _index, sourceIndex) => {
        // Pause / resume replays this exact word.
        paragraphIndexRef.current = start + sourceIndex;
        setPlayingLetter(word);
        setPlayingTokenIdx(slice[sourceIndex]?.tokenIndex ?? null);
      },
      onDone: () => {
        stopPlayAllRef.current = null;
        if (sentenceNumber < totalSentences) {
          continueAfterAdvanceRef.current = true;
          paragraphIndexRef.current = 0;
          onJumpToSentence(sentenceNumber);
          return;
        }
        paragraphIndexRef.current = 0;
        setPlayAllPhase('idle');
        setIsPlayingAll(false);
        setPlayingLetter(null);
        setPlayingTokenIdx(null);
        setPlayingGroupIdx(null);
        setLessonCompleted(true);
      },
    });
  };
  beginLessonParagraphRef.current = beginLessonParagraph;

  const pauseLessonPlayAll = () => {
    // Stay on this paragraph. Do not open the next section.
    continueAfterAdvanceRef.current = false;
    cancelSpeechNow();
    setIsPlayingAll(false);
    setPlayAllPhase('paused');
    setPlayingLetter(null);
    setPlayingGroupIdx(null);
  };

  /** Student moved by hand: cancel speech and do not auto-advance. */
  const stopLessonPlaybackForNav = () => {
    continueAfterAdvanceRef.current = false;
    if (playAllPhase === 'idle' && !isPlayingAll) return;
    cancelSpeechNow();
    setPlayAllPhase('idle');
    setIsPlayingAll(false);
    paragraphIndexRef.current = 0;
    setPlayingLetter(null);
    setPlayingGroupIdx(null);
  };

  const goReaderNext = () => {
    stopLessonPlaybackForNav();
    onNext();
  };
  const goReaderPrevious = () => {
    stopLessonPlaybackForNav();
    onPrevious();
  };
  const jumpReaderSection = (index: number) => {
    stopLessonPlaybackForNav();
    onJumpToSentence(index);
  };

  /**
   * शब्दार्थ / अभ्यास links. Play all keeps going (it continues from that
   * section). Only Pause stops it.
   */
  const jumpStudySection = (index: number) => {
    const same = index === sentenceNumber - 1;
    if (playAllPhase === 'playing') {
      stopPlayAllRef.current?.();
      stopPlayAllRef.current = null;
      stopPronunciation();
      paragraphIndexRef.current = 0;
      if (same) {
        beginLessonParagraph(0);
        return;
      }
      continueAfterAdvanceRef.current = true;
      onJumpToSentence(index);
      return;
    }
    if (playAllPhase === 'paused') {
      paragraphIndexRef.current = 0;
      if (same) return;
      stayPausedOnJumpRef.current = true;
      onJumpToSentence(index);
      return;
    }
    if (!same) onJumpToSentence(index);
  };

  const replayLessonFromStart = () => {
    setLessonCompleted(false);
    endBodhiStopRef.current?.();
    if (sentenceNumber <= 1) {
      replayFromStartRef.current = true;
      setReplayTick((tick) => tick + 1);
      return;
    }
    continueAfterAdvanceRef.current = true;
    paragraphIndexRef.current = 0;
    onJumpToSentence(0);
  };

  const handlePlayAll = () => {
    if (isGroupedLesson) {
      if (isPlayingAll) {
        stopPlayAll();
        return;
      }
      const items = collectPlayAllItems();
      if (!items.length) return;
      setIsPlayingAll(true);
      setPlayingGroupIdx(null);
      const isShloka = isShlokaOrVerseText(sentence?.sanskrit || '');
      stopPlayAllRef.current = playSequence(items, {
        gapMs: isShloka ? 420 : 240,
        rate: isShloka ? 0.68 : undefined,
        sanskritCardinals: false,
        onItem: (word) => setPlayingLetter(word),
        onDone: () => {
          stopPlayAllRef.current = null;
          setIsPlayingAll(false);
          setPlayingLetter(null);
          setPlayingGroupIdx(null);
        },
      });
      return;
    }
    if (playAllPhase === 'playing') {
      pauseLessonPlayAll();
      return;
    }
    if (playAllPhase === 'paused') {
      beginLessonParagraph(paragraphIndexRef.current);
      return;
    }
    setLessonCompleted(false);
    paragraphIndexRef.current = 0;
    beginLessonParagraph(0);
  };

  const handlePlayGroup = (words: string[], groupIdx: number) => {
    // Toggle Stop when the same row is already playing.
    if (isPlayingAll && playingGroupIdx === groupIdx) {
      stopPlayAll();
      return;
    }
    stopPlayAll();
    if (!words.length) return;
    setIsPlayingAll(true);
    setPlayingGroupIdx(groupIdx);
    const isShloka = isShlokaOrVerseText(words.join(' '));
    stopPlayAllRef.current = playSequence(words, {
      gapMs: isShloka ? 420 : 240,
      rate: isShloka ? 0.68 : undefined,
      onItem: (word) => setPlayingLetter(word),
      onDone: () => {
        stopPlayAllRef.current = null;
        setIsPlayingAll(false);
        setPlayingLetter(null);
        setPlayingGroupIdx(null);
      },
    });
  };

  /** A manual word tap ends Play all so that one word can play. Next Play all starts this paragraph over. */
  const handleSpokenWord = (word: string) => {
    if (playAllPhase !== 'idle' || isPlayingAll) {
      stopPlayAll();
    }
    onWordClick(word);
  };

  /** Tile / chip click: stop any Play-all, then forward to parent (speaks syllable). */
  const handleLetterActivate = (letter: string) => {
    stopPlayAll();
    handleSpokenWord(letter);
    if (isVarnamala) showTapChip(letter);
  };

  // Mobile / narrow "now playing" chip: Play-all letter wins over a single tap.
  const nowPlayingLetter = isVarnamala && effectiveVarnamalaSubMode === 'sound'
    ? (isPlayingAll && playingLetter ? playingLetter : tapPlayingLetter)
    : null;
  const nowPlayingMnemonic = nowPlayingLetter ? getLetterMnemonic(nowPlayingLetter) : undefined;
  /** Paragraph words in reading order. Shown and spoken from the same list. */
  const lessonTokens = !isGroupedLesson && sentence ? readerTokens(sentence) : [];
  const speakingTokenIdx = !isGroupedLesson && playAllPhase === 'playing' ? playingTokenIdx : null;
  const currentSpeakingToken =
    speakingTokenIdx !== null && lessonTokens[speakingTokenIdx] ? lessonTokens[speakingTokenIdx] : '';
  const currentSpeakingClean = currentSpeakingToken ? cleanWord(currentSpeakingToken) : '';
  const currentSpeakingGloss = currentSpeakingClean
    ? lookupAnalyseGloss(glosses, currentSpeakingClean) || lookupAnalyseGloss(glosses, currentSpeakingToken)
    : undefined;
  const currentSpeakingMeaning = currentSpeakingGloss ? englishMeaningFromGloss(currentSpeakingGloss) : '';
  const studyJumps = isGroupedLesson ? {} : findStudyJumps(activeLesson);
  const nextLessonInTrack = (() => {
    const track = lessonTrack(activeLessonId);
    if (!track) return undefined;
    const family = lessons.filter((item) => lessonTrack(item.id) === track);
    const at = family.findIndex((item) => item.id === activeLessonId);
    if (at < 0 || at >= family.length - 1) return undefined;
    return family[at + 1];
  })();
  const sectionJumps = buildSectionJumps(activeLesson);
  /**
   * Skip to already jumps to शब्दार्थ / अभ्यास. Hide those same targets in the
   * older chip row so a lesson that already had them (Class 8 lesson 1 has both)
   * does not draw the link twice. Other chips stay. Skip to itself stays.
   */
  const chipJumps = (() => {
    const covered = new Set<number>();
    if (studyJumps.glossary) covered.add(studyJumps.glossary.index);
    if (studyJumps.exercise) covered.add(studyJumps.exercise.index);
    const seen = new Set<string>();
    return sectionJumps.filter((jump) => {
      if (covered.has(jump.index)) return false;
      if (studyJumps.glossary && jump.kind === 'glossary-header') return false;
      const label = getJumpChipLabel(jump, activeLessonId);
      if (studyJumps.glossary && label === 'शब्दार्थ') return false;
      if (label === 'पाठः' || label === 'शब्दार्थ' || label === 'प्रार्थना' || label === 'अभ्यास') {
        if (seen.has(label)) return false;
        seen.add(label);
      }
      return true;
    });
  })();
  const currentJumpIndex = (() => {
    if (!chipJumps.length) return 0;
    let best = chipJumps[0].index;
    for (const jump of chipJumps) {
      if (jump.index <= sentenceNumber - 1) best = jump.index;
    }
    return best;
  })();

  // Free trial open lessons (foundations + opening invocations & Chapter 1 in all grades) are open to everyone.
  // Subsequent chapters require an account (free 14-day trial registration).
  const isLessonAccessible = canAccessChapter(activeLessonId, currentUser, isAdminLoggedIn);
  if (!isLessonAccessible) {
    const gradeLabel = isGrade9Lesson
      ? 'शारदा (Class 9)'
      : isGrade8Lesson
      ? 'Deepakam 8th grade · दीपकम'
      : 'Class 7 Deepakam · दीपकम';
    return (
      <section className="textbook-reader">
        <div className="textbook-cbse-banner textbook-grade8-upcoming-banner">
          <span className="textbook-cbse-pill" style={{ background: '#1e3a8a', color: '#ffffff' }}>
            ACCOUNT REQUIRED · लेखा आवश्यकः
          </span>
          <span className="textbook-cbse-title">
            {gradeLabel} advanced lessons are open to everyone with a free account.
          </span>
        </div>
        <div className="textbook-grade8-upcoming-note">
          <p>
            You are exploring under our free trial preview! The beginning modules (Alphabet, Barakhadi, Samyukta, Numbers) and the opening invocations &amp; Chapter 1 across all grades (Class 7, 8, and 9) are completely free to explore. Sign in or register for free below to unlock all remaining chapters.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => openAuthModal('login')}
              style={{
                background: '#4338ca',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '0.6rem 1.25rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              🔐 Sign In
            </button>
            <button
              type="button"
              onClick={() => openAuthModal('register')}
              style={{
                background: '#059669',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '0.6rem 1.25rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              ✨ Create Free Account
            </button>
            <button
              type="button"
              onClick={() => onSelectLesson('gsde101')}
              style={{
                background: '#f1f5f9',
                color: '#334155',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                padding: '0.6rem 1rem',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              📖 Read Class 7 Ch 1 (Free Trial)
            </button>
            <button
              type="button"
              onClick={() => onSelectLesson('grade8_prarthana')}
              style={{
                background: '#fef3c7',
                color: '#92400e',
                border: '1px solid #fde68a',
                borderRadius: '8px',
                padding: '0.6rem 1rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              🪕 Read Class 8 Prarthana (Free Trial)
            </button>
            <button
              type="button"
              onClick={() => onSelectLesson('grade9_prarthana')}
              style={{
                background: '#ede9fe',
                color: '#5b21b6',
                border: '1px solid #ddd6fe',
                borderRadius: '8px',
                padding: '0.6rem 1rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              🌸 Read Class 9 Prarthana (Free Trial)
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="textbook-reader">
      {/* Sleek Unified Top Header */}
      <header className="textbook-top-bar">
        <div className="textbook-top-row">
          <div className="textbook-lesson-picker">
            <button
              type="button"
              className="textbook-cover-avatar-btn"
              onClick={() => {
                if (isGrade9Lesson) setIsGrade9SyllabusOpen(true);
                else if (isGrade8Lesson) setIsGrade8SyllabusOpen(true);
                else if (!isGroupedLesson) setIsGrade7SyllabusOpen(true);
              }}
              title={`View ${getTextbookMetaForLesson(activeLessonId).bookTitleSa} Table of Contents (पाठानुक्रमणिका)`}
              aria-label="View Syllabus"
            >
              <img
                src={getTextbookMetaForLesson(activeLessonId).coverUrl}
                alt={getTextbookMetaForLesson(activeLessonId).alt}
                className="textbook-cover-avatar-img"
              />
            </button>
            <span
              className={`textbook-grade-badge ${
                isGrade9Lesson
                  ? 'textbook-grade-badge--grade9'
                  : isGrade8Lesson
                  ? 'textbook-grade-badge--grade8'
                  : isGroupedLesson
                  ? 'textbook-grade-badge--foundations'
                  : 'textbook-grade-badge--grade7'
              }`}
            >
              {isGrade9Lesson
                ? 'शारदा'
                : isGrade8Lesson
                ? 'Deepakam 8th'
                : isGroupedLesson
                ? 'मूल-संस्कृतम्'
                : 'Deepakam 7th'}
            </span>
            <select
              id="lesson-select"
              className="textbook-lesson-select"
              value={activeLessonId}
              onChange={(event) => {
                stopLessonPlaybackForNav();
                if (event.target.value === '__cbse_guide__' && onOpenCbseGuide) {
                  onOpenCbseGuide();
                } else {
                  onSelectLesson(event.target.value);
                }
              }}
              aria-label="Select Sanskrit chapter or lesson"
            >
              {/* Class 7 Lessons */}
              <optgroup label="Deepakam 7th grade · दीपकम (सप्तमी कक्षा)">
                {lessons
                  .filter(
                    (lesson) =>
                      !lesson.id.startsWith('grade8_') &&
                      !lesson.id.startsWith('grade9_') &&
                      lesson.id !== 'samyukta' &&
                      lesson.id !== 'varnamala' &&
                      lesson.id !== 'numbers' &&
                      lesson.id !== 'barakhadi' &&
                      lesson.id !== 'simple-sentences'
                  )
                  .map((lesson) => {
                    const isTrialOpen = isFreeTrialOpenLesson(lesson.id);
                    const isLocked = !canReadAllChapters && !isTrialOpen;
                    return (
                      <option key={lesson.id} value={lesson.id}>
                        {lesson.title}{isTrialOpen && !canReadAllChapters ? ' · 🎁 Free Trial' : isLocked ? ' · 🔒 Account' : ''}
                      </option>
                    );
                  })}
                {onOpenCbseGuide && (
                  <option value="__cbse_guide__">
                    📋 CBSE Class 7 Exam Guide &amp; Question Directives
                  </option>
                )}
              </optgroup>

              {/* Class 8 Lessons */}
              {lessons.some((lesson) => lesson.id.startsWith('grade8_')) && (
                <optgroup label="Deepakam 8th grade · दीपकम (अष्टमी कक्षा)">
                  {lessons
                    .filter((lesson) => lesson.id.startsWith('grade8_'))
                    .map((lesson) => {
                      const isTrialOpen = isFreeTrialOpenLesson(lesson.id);
                      const isLocked = !canReadAllChapters && !isTrialOpen;
                      return (
                        <option key={lesson.id} value={lesson.id}>
                          {lesson.title}{isTrialOpen && !canReadAllChapters ? ' · 🎁 Free Trial' : isLocked ? ' · 🔒 Account' : ''}
                        </option>
                      );
                    })}
                  {onOpenCbseGuide && (
                    <option value="__cbse_guide__">
                      📋 CBSE Class 8 Exam Guide &amp; Question Directives
                    </option>
                  )}
                </optgroup>
              )}

              {/* Class 9 Lessons */}
              {lessons.some((lesson) => lesson.id.startsWith('grade9_')) && (
                <optgroup label="शारदा (नवमी कक्षा)">
                  {lessons
                    .filter((lesson) => lesson.id.startsWith('grade9_'))
                    .map((lesson) => {
                      const isTrialOpen = isFreeTrialOpenLesson(lesson.id);
                      const isLocked = !canReadAllChapters && !isTrialOpen;
                      return (
                        <option key={lesson.id} value={lesson.id}>
                          {lesson.title}{isTrialOpen && !canReadAllChapters ? ' · 🎁 Free Trial' : isLocked ? ' · 🔒 Account' : ''}
                        </option>
                      );
                    })}
                  {onOpenCbseGuide && (
                    <option value="__cbse_guide__">
                      📋 CBSE Class 9 Exam Guide &amp; Question Directives
                    </option>
                  )}
                </optgroup>
              )}

              {/* Foundations (Alphabet, Barakhadi, Samyukta, Numbers, Simple Sentences & Verb Matrix) */}
              {lessons.some(
                (lesson) =>
                  lesson.id === 'varnamala' ||
                  lesson.id === 'numbers' ||
                  lesson.id === 'barakhadi' ||
                  lesson.id === 'samyukta' ||
                  lesson.id === 'simple-sentences'
              ) && (
                <optgroup label="Foundations (मूल-संस्कृतम् · 🎁 Free Trial Open)">
                  {lessons
                    .filter(
                      (lesson) =>
                        lesson.id === 'varnamala' ||
                        lesson.id === 'numbers' ||
                        lesson.id === 'barakhadi' ||
                        lesson.id === 'samyukta' ||
                        lesson.id === 'simple-sentences'
                    )
                    .map((lesson) => (
                      <option key={lesson.id} value={lesson.id}>
                        {lesson.title}{!canReadAllChapters ? ' · 🎁 Free Trial' : ''}
                      </option>
                    ))}
                </optgroup>
              )}
            </select>
          </div>

          <div className="textbook-quick-tools" role="toolbar" aria-label="Quick Study Tools">
            <button
              type="button"
              className="textbook-action-chip"
              onClick={() => {
                setSimpleSentencesTab('matrix');
                onSelectLesson('simple-sentences');
              }}
              title="Interactive Dhatupatha Matrix Connector: Match roots with singular, dual, and plural terminal blocks"
            >
              ⚡ Dhatupatha Matrix
            </button>
            <button
              type="button"
              className="textbook-action-chip"
              onClick={() => {
                setSimpleSentencesTab('relative-sketch');
                onSelectLesson('simple-sentences');
              }}
              title="Pencil-Sketch Relative Clause Matcher: Visual riddle puzzles connecting यत्र with तत्र"
            >
              ✏️ Sketch Matcher
            </button>
            <button
              type="button"
              className="textbook-action-chip"
              onClick={() => setIsSymbolsOpen(true)}
              title="Sanskrit Symbols, Mātrās & Punctuation Reference Guide"
            >
              📜 चिह्न-परिचयः (Symbols)
            </button>
            {onOpenVoiceSettings && (
              <button
                type="button"
                className="textbook-action-chip"
                onClick={onOpenVoiceSettings}
                title="Adjust reading voice, speed, or select system voices"
              >
                🔊 Voice Studio
              </button>
            )}
            {onOpenCbseGuide && (
              <button
                type="button"
                className="textbook-action-chip"
                onClick={onOpenCbseGuide}
                title="Open CBSE Exam Guide"
              >
                📋 CBSE Exam Guide
              </button>
            )}
            {!isGrade8Lesson && !isGrade9Lesson && !isGroupedLesson && (
              <button
                type="button"
                className="textbook-action-chip textbook-action-chip--syllabus"
                onClick={() => setIsGrade7SyllabusOpen(true)}
                title="Grade 7 Complete Syllabus & Table of Contents (पाठानुक्रमणिका)"
              >
                📜 पाठानुक्रमणिका (Syllabus)
              </button>
            )}
            {isGrade8Lesson && (
              <button
                type="button"
                className="textbook-action-chip textbook-action-chip--syllabus"
                onClick={() => setIsGrade8SyllabusOpen(true)}
                title="Grade 8 Complete Syllabus & Table of Contents (पाठानुक्रमणिका)"
              >
                📜 पाठानुक्रमणिका (Syllabus)
              </button>
            )}
            {isGrade9Lesson && (
              <button
                type="button"
                className="textbook-action-chip textbook-action-chip--syllabus"
                onClick={() => setIsGrade9SyllabusOpen(true)}
                title="Grade 9 Complete Syllabus & Table of Contents (पाठानुक्रमणिका)"
              >
                📜 पाठानुक्रमणिका (Syllabus)
              </button>
            )}
            {onOpenQuiz && (
              <button
                type="button"
                className="textbook-action-chip textbook-action-chip--quiz"
                onClick={() => onOpenQuiz(currentChapterQuizCat)}
                title="Go to Chapter Quizzes & MCQs"
              >
                🎯 Quizzes
              </button>
            )}
            {onOpenWorksheets && (
              <button
                type="button"
                className="textbook-action-chip textbook-action-chip--ws"
                onClick={handleOpenWorksheetsDefault}
                title="Go to Printable Worksheets & Teacher Keys"
              >
                📑 Worksheets
              </button>
            )}
          </div>
        </div>

        {/* Unified Resource Bundling & Physical Page Mapping Bar */}
        {!isGroupedLesson && pageBreakdown && (
          <div className="textbook-unified-resource-bar" role="region" aria-label="Physical textbook reference and learning resources">
            <div className="textbook-page-mapping-pill" title={`${pageBreakdown.bookName} physical print pages`}>
              <span className="page-pill-icon">📖</span>
              <span><strong>{pageBreakdown.bookName}</strong>: Pages <strong>{pageBreakdown.totalRange}</strong></span>
            </div>
            <div className="textbook-chapter-tools">
              {activeLessonId === 'gsde109' && onOpenPuzzle && (
                <button
                  type="button"
                  className="chapter-tool-btn chapter-tool-btn--game"
                  onClick={() => onOpenPuzzle('cat_deepakam_sciences')}
                  title="Match 22 Ancient Vedic Sciences & Professions from Page 96"
                  style={{
                    background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
                    color: '#ffffff',
                    border: '1px solid #a78bfa',
                    boxShadow: '0 2px 8px rgba(124, 58, 237, 0.25)',
                    fontWeight: 700,
                  }}
                >
                  <span>🔬</span>
                  <span>Vedic Sciences Game</span>
                </button>
              )}
              {onOpenQuiz && (
                <button
                  type="button"
                  className="chapter-tool-btn chapter-tool-btn--quiz"
                  onClick={() => onOpenQuiz(currentChapterQuizCat)}
                  title={`Launch 10-Question Interactive Quiz for ${activeLesson?.title || 'Chapter'}`}
                >
                  <span>🎯</span>
                  <span>10-Q Quiz</span>
                </button>
              )}
              {onOpenWorksheets && (
                <button
                  type="button"
                  className="chapter-tool-btn chapter-tool-btn--ws"
                  onClick={() => onOpenWorksheets(currentChapterWsCat)}
                  title={`Printable Worksheets for ${activeLesson?.title || 'Chapter'}`}
                >
                  <span>📑</span>
                  <span>Worksheets</span>
                </button>
              )}
              {chapterPdfUrl && (
                <a
                  href={chapterPdfUrl}
                  download
                  className="chapter-tool-btn chapter-tool-btn--dl"
                  title="Download Solved NCERT Deepakam Chapter PDF Guide"
                >
                  <span>📥</span>
                  <span>Solved PDF</span>
                </a>
              )}
              <a
                href={`https://koshashri-dc.ac.in/search/catalog/1/10?searchTerm=${encodeURIComponent(
                  activeLesson?.title?.split(' ')[0] || 'अ'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="chapter-tool-btn chapter-tool-btn--dict"
                title="Search word meanings in Koshashri Sanskrit-English Dictionary"
              >
                <span>🔍</span>
                <span>Dictionary ↗</span>
              </a>
            </div>
          </div>
        )}

        {/* Quick Section Jump Chips */}
        {!isGroupedLesson && chipJumps.length > 1 && (
          <div className="textbook-jump-row">
            <span className="textbook-jump-label">Jump:</span>
            <select
              id="section-jump"
              className="textbook-jump-select"
              value={String(currentJumpIndex)}
              onChange={(event) => jumpReaderSection(Number(event.target.value))}
              aria-label="Jump to lesson section"
            >
              {chipJumps.map((jump) => (
                <option key={`${jump.index}-${jump.label}`} value={String(jump.index)}>
                  {jump.label}
                </option>
              ))}
            </select>
            <div className="textbook-jump-chips" aria-label="Quick sections">
              {chipJumps.map((jump) => (
                <button
                  key={`chip-${jump.index}`}
                  type="button"
                  className={`textbook-jump-chip${currentJumpIndex === jump.index ? ' active' : ''}`}
                  onClick={() => jumpReaderSection(jump.index)}
                >
                  {getJumpChipLabel(jump, activeLessonId)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Compact Controls Strip: Audio Play + Paragraph Nav */}
        {!isGroupedLesson ? (
          <>
          <div className="textbook-controls-strip">
            <div className="textbook-controls-left">
              <button
                type="button"
                className={`textbook-playall-strip-btn${playAllPhase === 'playing' ? ' active' : ''}`}
                onClick={handlePlayAll}
                aria-pressed={playAllPhase === 'playing'}
                title={
                  playAllPhase === 'playing'
                    ? 'Pause. Stays on this paragraph and does not skip ahead.'
                    : playAllPhase === 'paused'
                      ? 'Resume from the word that was paused, then continue through this lesson.'
                      : 'Play this paragraph, then each following one, until the lesson ends.'
                }
              >
                {playAllPhase === 'playing'
                  ? '⏸ Pause'
                  : playAllPhase === 'paused'
                    ? '▶ Resume'
                    : '▶ Play all'}
              </button>
              <span className="textbook-progress-badge">
                {sentence.kind?.startsWith('glossary') || sentence.kind?.startsWith('exercise')
                  ? `Exercise ${sentenceNumber} of ${totalSentences}`
                  : `Paragraph ${sentenceNumber} of ${totalSentences}`}
              </span>
            </div>
            <div className="textbook-strip-nav">
              <button
                type="button"
                className="textbook-strip-nav-btn"
                onClick={goReaderPrevious}
                disabled={isFirstSentence}
                title="Previous paragraph / sentence (◀)"
              >
                ◀ Prev
              </button>
              <button
                type="button"
                className="textbook-strip-nav-btn"
                onClick={goReaderNext}
                disabled={isLastSentence}
                title="Next paragraph / sentence (▶)"
              >
                Next ▶
              </button>
            </div>
          </div>
          {studyJumps.glossary || studyJumps.exercise ? (
            <div className="textbook-study-jumps" aria-label="Jump to word meanings or exercises">
              <span className="textbook-jump-label">Skip to:</span>
              {studyJumps.glossary ? (
                <button
                  type="button"
                  className={`textbook-study-jump${sentenceNumber - 1 === studyJumps.glossary.index ? ' active' : ''}`}
                  onClick={() => jumpStudySection(studyJumps.glossary!.index)}
                  title={studyJumps.glossary.heading}
                >
                  {studyJumps.glossary.label}
                  <span className="textbook-study-jump-hint">{studyJumps.glossary.hint}</span>
                </button>
              ) : null}
              {studyJumps.exercise ? (
                <button
                  type="button"
                  className={`textbook-study-jump${sentenceNumber - 1 === studyJumps.exercise.index ? ' active' : ''}`}
                  onClick={() => jumpStudySection(studyJumps.exercise!.index)}
                  title={studyJumps.exercise.heading}
                >
                  {studyJumps.exercise.label}
                  <span className="textbook-study-jump-hint">{studyJumps.exercise.hint}</span>
                </button>
              ) : null}
            </div>
          ) : null}
          </>
        ) : (
          <div className="textbook-controls-strip">
            <div className="textbook-controls-left">
              <button
                type="button"
                className={`textbook-playall-strip-btn${isPlayingAll ? ' active' : ''}`}
                onClick={handlePlayAll}
                aria-pressed={isPlayingAll}
              >
                {isPlayingAll
                  ? '⏹ Stop'
                  : activeLessonId === 'barakhadi'
                  ? '▶ Play all letters'
                  : '▶ Play all'}
              </button>
              <span className="textbook-glossary-hint" style={{ margin: 0, fontSize: '0.82rem' }}>
                {activeLessonId === 'barakhadi'
                  ? 'Hear every akṣara in बारहखड़ी, row by row.'
                  : activeLessonId === 'varnamala'
                  ? 'Hear every letter in order. Row ▶ plays one group.'
                  : 'Hear every letter on this chart, in order.'}
              </span>
            </div>
          </div>
        )}
      </header>

      {isGroupedLesson && activeLesson ? (
        <div className="varnamala-groups">
          {isVarnamala && (
            <nav className="varnamala-studio-nav" aria-label="Alphabet &amp; Syllables Study Modes">
              <button
                type="button"
                className={`varnamala-mode-btn${effectiveVarnamalaSubMode === 'sound' ? ' varnamala-mode-btn--active' : ''}`}
                onClick={() => setVarnamalaSubMode('sound')}
              >
                <span className="varnamala-mode-icon">🔊</span>
                <span>ध्वनि-फलकम् (Sound &amp; Audio)</span>
              </button>
              <button
                type="button"
                className={`varnamala-mode-btn${effectiveVarnamalaSubMode === 'writing' ? ' varnamala-mode-btn--active' : ''}`}
                onClick={() => setVarnamalaSubMode('writing')}
              >
                <span className="varnamala-mode-icon">✍️</span>
                <span>अक्षर-लेखनम् (Writing Studio)</span>
              </button>
              <button
                type="button"
                className={`varnamala-mode-btn${effectiveVarnamalaSubMode === 'quizzes' ? ' varnamala-mode-btn--active' : ''}`}
                onClick={() => setVarnamalaSubMode('quizzes')}
              >
                <span className="varnamala-mode-icon">🎯</span>
                <span>स्वर-प्रश्नोत्तरी (Swar Quizzes &amp; Review)</span>
              </button>
              <button
                type="button"
                className={`varnamala-mode-btn${effectiveVarnamalaSubMode === 'workbooks' ? ' varnamala-mode-btn--active' : ''}`}
                onClick={() => setVarnamalaSubMode('workbooks')}
              >
                <span className="varnamala-mode-icon">📚</span>
                <span>अभ्यास-पुस्तिकाः व सामग्री (Workbooks &amp; Materials)</span>
              </button>
              <button
                type="button"
                className={`varnamala-mode-btn${effectiveVarnamalaSubMode === 'worksheets' ? ' varnamala-mode-btn--active' : ''}`}
                onClick={() => setVarnamalaSubMode('worksheets')}
              >
                <span className="varnamala-mode-icon">📑</span>
                <span>अभ्यास-पत्रिकाः (Worksheets)</span>
              </button>
              {onOpenBarakhadi && (
                <button
                  type="button"
                  className="varnamala-mode-btn"
                  onClick={onOpenBarakhadi}
                  style={{
                    background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
                    color: '#92400e',
                    border: '1.5px solid #f59e0b',
                    fontWeight: 700,
                  }}
                  title="Switch to 400+ Syllables Grid (क का कि की ...)"
                >
                  <span className="varnamala-mode-icon">🔡</span>
                  <span>बारहखड़ी · Guṇintālu (400+ Grid) →</span>
                </button>
              )}
            </nav>
          )}

          {activeLessonId === 'barakhadi' && (
            <nav className="varnamala-studio-nav" aria-label="Barakhadi Studio Modes">
              <button
                type="button"
                className="varnamala-mode-btn varnamala-mode-btn--active"
              >
                <span className="varnamala-mode-icon">🔡</span>
                <span>बारहखड़ी · Guṇintālu (400+ Syllables Grid)</span>
              </button>
              <button
                type="button"
                className="varnamala-mode-btn"
                onClick={() => onSelectLesson('varnamala')}
                style={{
                  background: 'linear-gradient(135deg, #e0f2fe, #bae6fd)',
                  color: '#0369a1',
                  border: '1.5px solid #38bdf8',
                  fontWeight: 700,
                }}
              >
                <span className="varnamala-mode-icon">🔤</span>
                <span>← वर्णमाला (Basic Alphabet)</span>
              </button>
            </nav>
          )}



          {isNumbers && (
            <nav className="varnamala-studio-nav" aria-label="Sanskrit Numbers Study Modes">
              <button
                type="button"
                className={`varnamala-mode-btn${numbersSubMode === 'interactive' ? ' varnamala-mode-btn--active' : ''}`}
                onClick={() => setNumbersSubMode('interactive')}
              >
                <span className="varnamala-mode-icon">🌟</span>
                <span>संख्या-मार्गदर्शकः (Numbers Masterclass Guide)</span>
              </button>
              <button
                type="button"
                className={`varnamala-mode-btn${numbersSubMode === 'tiles' ? ' varnamala-mode-btn--active' : ''}`}
                onClick={() => setNumbersSubMode('tiles')}
              >
                <span className="varnamala-mode-icon">🔲</span>
                <span>संख्या-फलकम् (1-100 Audio Grid)</span>
              </button>
            </nav>
          )}

          {isNumbers && numbersSubMode === 'interactive' && (
            <ErrorBoundary
              fallbackTitle="🔢 Numbers Guide Ready"
              fallbackSubtitle="An unexpected issue occurred while rendering the Numbers Masterclass. Tap below to reload."
            >
              <NumbersGuide onSelectWord={handleLetterActivate} />
            </ErrorBoundary>
          )}

          {isSimpleSentences && (
            <ErrorBoundary
              fallbackTitle="💬 Simple Sentences & Root Words Studio Ready"
              fallbackSubtitle="An unexpected issue occurred while rendering the Simple Sentences Studio. Tap below to reload."
            >
              <SimpleSentencesStudio
                initialTab={simpleSentencesTab}
                onSelectWord={handleLetterActivate}
                onOpenNextLesson={() => onSelectLesson('gsde101')}
              />
            </ErrorBoundary>
          )}

          {isVarnamala && effectiveVarnamalaSubMode === 'writing' && (
            <ErrorBoundary
              fallbackTitle="✍️ Writing Studio Ready"
              fallbackSubtitle="An unexpected issue occurred while rendering the handwriting slate. Tap below to reload the studio."
            >
              <VarnamalaWritingPad
                initialLetter={padSelectedLetter}
                onSelectLetter={(char) => {
                  setPadSelectedLetter(char);
                  handleSpokenWord(char);
                }}
                onOpenWorksheets={onOpenWorksheets}
                onOpenPuzzle={onOpenPuzzle}
              />
            </ErrorBoundary>
          )}

          {isVarnamala && effectiveVarnamalaSubMode === 'worksheets' && (
            <div
              className="v-writing-studio"
              style={{ padding: '1.75rem', textAlign: 'center' }}
            >
              <span className="v-writing-pill">📑 अभ्यास-सञ्चिका · Worksheets</span>
              <h3 className="v-writing-title" style={{ margin: '0.5rem 0' }}>
                Alphabet &amp; Syllables Printable Worksheets
              </h3>
              <p className="v-writing-subtitle" style={{ maxWidth: '650px', margin: '0 auto 1.5rem' }}>
                Reinforce letter recognition, stroke order, vowel classifications, and consonant
                families with classroom-tested practice sheets.
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '1rem',
                  textAlign: 'left',
                  marginBottom: '1.5rem',
                }}
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => onOpenWorksheets?.('varnamala')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onOpenWorksheets?.('varnamala');
                    }
                  }}
                  style={{
                    background: '#f8fafc',
                    border: '1.5px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.18s ease',
                  }}
                >
                  <span style={{ fontSize: '1.5rem' }}>🔤</span>
                  <h4 style={{ margin: '0.4rem 0 0.2rem', fontSize: '1rem', fontWeight: 800 }}>
                    WS-V01: स्वर-परिचयः
                  </h4>
                  <p style={{ margin: '0 0 0.5rem', fontSize: '0.8rem', color: '#64748b' }}>
                    Vowels, short vs. long sounds, animal words, sequence drills.
                  </p>
                  <span style={{ fontSize: '0.78rem', color: '#0f766e', fontWeight: 700 }}>
                    Open Worksheet →
                  </span>
                </div>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => onOpenWorksheets?.('varnamala')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onOpenWorksheets?.('varnamala');
                    }
                  }}
                  style={{
                    background: '#f8fafc',
                    border: '1.5px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.18s ease',
                  }}
                >
                  <span style={{ fontSize: '1.5rem' }}>🎯</span>
                  <h4 style={{ margin: '0.4rem 0 0.2rem', fontSize: '1rem', fontWeight: 800 }}>
                    WS-V02: स्पर्श-व्यञ्जनानि
                  </h4>
                  <p style={{ margin: '0 0 0.5rem', fontSize: '0.8rem', color: '#64748b' }}>
                    5 consonant families (क to प), articulation points, aspiration.
                  </p>
                  <span style={{ fontSize: '0.78rem', color: '#0f766e', fontWeight: 700 }}>
                    Open Worksheet →
                  </span>
                </div>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => onOpenWorksheets?.('varnamala')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onOpenWorksheets?.('varnamala');
                    }
                  }}
                  style={{
                    background: '#f8fafc',
                    border: '1.5px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.18s ease',
                  }}
                >
                  <span style={{ fontSize: '1.5rem' }}>💨</span>
                  <h4 style={{ margin: '0.4rem 0 0.2rem', fontSize: '1rem', fontWeight: 800 }}>
                    WS-V03: अन्तःस्थाः ऊष्माणश्च
                  </h4>
                  <p style={{ margin: '0 0 0.5rem', fontSize: '0.8rem', color: '#64748b' }}>
                    Semi-vowels, sibilants (श, ष, स), Anusvāra &amp; Visarga echoes.
                  </p>
                  <span style={{ fontSize: '0.78rem', color: '#0f766e', fontWeight: 700 }}>
                    Open Worksheet →
                  </span>
                </div>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => onOpenWorksheets?.('varnamala')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onOpenWorksheets?.('varnamala');
                    }
                  }}
                  style={{
                    background: '#f8fafc',
                    border: '1.5px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.18s ease',
                  }}
                >
                  <span style={{ fontSize: '1.5rem' }}>🧩</span>
                  <h4 style={{ margin: '0.4rem 0 0.2rem', fontSize: '1rem', fontWeight: 800 }}>
                    WS-V04: अक्षर-संयोजनम्
                  </h4>
                  <p style={{ margin: '0 0 0.5rem', fontSize: '0.8rem', color: '#64748b' }}>
                    Word synthesis addition (ग + ज + ः = गजः) and phonetic breakdown.
                  </p>
                  <span style={{ fontSize: '0.78rem', color: '#0f766e', fontWeight: 700 }}>
                    Open Worksheet →
                  </span>
                </div>
              </div>
              {onOpenWorksheets && (
                <button
                  type="button"
                  className="v-submit-check-btn"
                  onClick={() => onOpenWorksheets('varnamala')}
                  style={{ maxWidth: '380px', margin: '0 auto' }}
                >
                  <span>📑</span> Open All Alphabet &amp; Syllables Worksheets Laboratory →
                </button>
              )}
            </div>
          )}

          {isVarnamala && effectiveVarnamalaSubMode === 'quizzes' && (
            <div className="swar-quizzes-studio-wrap">
              <div className="swar-quizzes-header-banner">
                <div className="swar-quizzes-header-info">
                  <span className="swar-quizzes-badge">🎯 स्वर-प्रश्नोत्तरी · Swar Quizzes &amp; Review</span>
                  <h3 className="swar-quizzes-title">
                    Basic Swar &amp; Alphabet Quizzes (From Swar Workbook pp. 23–24)
                  </h3>
                  <p className="swar-quizzes-desc">
                    Reinforce letter recognition, word meanings, verb endings, pronouns, and numbers with instant answers, audio pronunciation, and book page references.
                  </p>
                </div>
                <div className="swar-quizzes-header-actions">
                  <button
                    type="button"
                    className="swar-header-pill-btn"
                    onClick={() => setVarnamalaSubMode('workbooks')}
                  >
                    📚 Workbooks &amp; Materials Hub
                  </button>
                  <button
                    type="button"
                    className="swar-header-pill-btn"
                    onClick={() => setVarnamalaSubMode('writing')}
                  >
                    ✍️ Tracing Slate
                  </button>
                  <button
                    type="button"
                    className="swar-header-pill-btn"
                    onClick={() => setVarnamalaSubMode('sound')}
                  >
                    🔊 Sound Board
                  </button>
                  {onOpenCertificate && (
                    <button
                      type="button"
                      className="swar-header-cert-btn"
                      onClick={onOpenCertificate}
                    >
                      🏅 Claim Certificate
                    </button>
                  )}
                </div>
              </div>

              <ErrorBoundary
                fallbackTitle="🎯 Swar Quizzes Ready"
                fallbackSubtitle="An unexpected issue occurred while rendering Swar Review Practice. Tap below to reload."
              >
                <SwarReviewPractice
                  onOpenCertificate={onOpenCertificate}
                  onOpenBodhi={onOpenBodhi}
                  onOpenWorksheets={() => setVarnamalaSubMode('worksheets')}
                  onOpenPuzzles={onOpenPuzzle}
                  onOpenGames={onOpenGames}
                  onOpenWorkbooks={() => setVarnamalaSubMode('workbooks')}
                  onOpenWritingPad={() => setVarnamalaSubMode('writing')}
                  onOpenSoundBoard={() => setVarnamalaSubMode('sound')}
                />
              </ErrorBoundary>
            </div>
          )}

          {isVarnamala && effectiveVarnamalaSubMode === 'workbooks' && (
            <ErrorBoundary
              fallbackTitle="📚 Swar &amp; Workbooks Hub Ready"
              fallbackSubtitle="An unexpected issue occurred while rendering the workbooks hub. Tap below to reload."
            >
              <SwarWorkbooksHub
                onSwitchToQuizzes={() => setVarnamalaSubMode('quizzes')}
                onSwitchToWriting={() => setVarnamalaSubMode('writing')}
                onSwitchToSound={() => setVarnamalaSubMode('sound')}
                onOpenWorksheets={(cat) => (onOpenWorksheets ? onOpenWorksheets(cat || 'varnamala') : setVarnamalaSubMode('worksheets'))}
                onOpenFlashcards={() => setIsFlashcardDownloadOpen(true)}
                onOpenChart={() => setIsChartOpen(true)}
                onOpenVideo={() => setIsSoundVideoOpen(true)}
                onOpenCertificate={onOpenCertificate}
                onOpenBarakhadi={onOpenBarakhadi}
              />
            </ErrorBoundary>
          )}

          {(!isVarnamala || effectiveVarnamalaSubMode === 'sound' || !['writing', 'worksheets', 'quizzes', 'workbooks'].includes(effectiveVarnamalaSubMode)) && (!isNumbers || numbersSubMode === 'tiles') && !isSimpleSentences && (
            <>
              {isVarnamala && (
                <div className="varnamala-hub-section" role="region" aria-label="Alphabet Learning Hub &amp; Tools">
                  <div className="varnamala-hub-card-grid">
                    <button
                      type="button"
                      className={`varnamala-hub-card${isChartOpen ? ' varnamala-hub-card--active' : ''}`}
                      onClick={() => {
                        setIsChartOpen((open) => !open);
                        if (!isChartOpen) setIsSoundVideoOpen(false);
                      }}
                      aria-expanded={isChartOpen}
                      aria-controls="varnamala-chart-panel"
                    >
                      <div className="varnamala-hub-card-icon" aria-hidden="true">🗺️</div>
                      <div className="varnamala-hub-card-body">
                        <div className="varnamala-hub-card-title">उच्चारण-तालिका</div>
                        <div className="varnamala-hub-card-desc">Phonetic Articulation Chart</div>
                      </div>
                      <span className="varnamala-hub-card-pill">{isChartOpen ? 'Hide ▲' : 'View ▼'}</span>
                    </button>

                    <button
                      type="button"
                      className="varnamala-hub-card"
                      onClick={() => setIsFlashcardDownloadOpen(true)}
                    >
                      <div className="varnamala-hub-card-icon" aria-hidden="true">📥</div>
                      <div className="varnamala-hub-card-body">
                        <div className="varnamala-hub-card-title">मुद्रण-पत्राणि</div>
                        <div className="varnamala-hub-card-desc">Print Flashcards &amp; PDF</div>
                      </div>
                      <span className="varnamala-hub-card-pill varnamala-hub-card-pill--green">Download 🖨️</span>
                    </button>

                    <button
                      type="button"
                      className={`varnamala-hub-card${isSoundVideoOpen ? ' varnamala-hub-card--active' : ''}`}
                      onClick={() => {
                        setIsSoundVideoOpen((open) => !open);
                        if (!isSoundVideoOpen) setIsChartOpen(false);
                      }}
                      aria-expanded={isSoundVideoOpen}
                    >
                      <div className="varnamala-hub-card-icon" aria-hidden="true">🎥</div>
                      <div className="varnamala-hub-card-body">
                        <div className="varnamala-hub-card-title">ध्वनि-विज्ञानम्</div>
                        <div className="varnamala-hub-card-desc">Science of Sound Video</div>
                      </div>
                      <span className="varnamala-hub-card-pill varnamala-hub-card-pill--purple">{isSoundVideoOpen ? 'Hide ▲' : 'Watch ▶'}</span>
                    </button>

                    {onOpenBarakhadi && (
                      <button
                        type="button"
                        className="varnamala-hub-card varnamala-hub-card--barakhadi"
                        onClick={onOpenBarakhadi}
                        title="Open बारहखड़ी Studio (400+ Syllables with Indian Voice Audio)"
                      >
                        <div className="varnamala-hub-card-icon" aria-hidden="true">🔡</div>
                        <div className="varnamala-hub-card-body">
                          <div className="varnamala-hub-card-title">बारहखड़ी Studio</div>
                          <div className="varnamala-hub-card-desc">400+ Syllables Audio Grid</div>
                        </div>
                        <span className="varnamala-hub-card-pill varnamala-hub-card-pill--amber">Open →</span>
                      </button>
                    )}
                  </div>

                  {isChartOpen && (
                    <div id="varnamala-chart-panel" className="varnamala-chart-panel varnamala-chart-panel--open" style={{ marginTop: '0.85rem' }}>
                      <img
                        src="./image1.jpg"
                        alt="Sanskrit pronunciation chart with Devanagari letters for learners"
                        className="varnamala-chart-image"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {isSoundVideoOpen && (
                    <div
                      style={{
                        marginTop: '0.85rem',
                        background: '#ffffff',
                        borderRadius: '14px',
                        border: '1px solid #ddd6fe',
                        overflow: 'hidden',
                        boxShadow: '0 4px 14px rgba(91, 33, 182, 0.08)',
                      }}
                    >
                      <div
                        style={{
                          position: 'relative',
                          width: '100%',
                          paddingBottom: '56.25%',
                          height: 0,
                          background: '#090d16',
                        }}
                      >
                        <iframe
                          src="https://www.youtube-nocookie.com/embed/tkvYjNZSsZA?start=32&rel=0"
                          title="Sanskrit: The Science of Sound"
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            border: 0,
                          }}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      </div>
                      <div
                        style={{
                          padding: '0.85rem 1.25rem',
                          background: '#faf5ff',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                          gap: '0.5rem',
                          borderTop: '1px solid #ede9fe',
                        }}
                      >
                        <div style={{ fontSize: '0.85rem', color: '#5b21b6', lineHeight: 1.45 }}>
                          <strong>Sanskrit: The Science of Sound</strong> · Video by <em>Conscious Cosmos</em>
                          <br />
                          <span style={{ color: '#6b7280', fontSize: '0.78rem' }}>
                            Explore the vocal tract biomechanics, acoustic resonance, and phonological precision of Sanskrit (Śikṣā).
                          </span>
                        </div>
                        <a
                          href="https://www.youtube.com/watch?v=tkvYjNZSsZA&t=32s"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontSize: '0.8rem',
                            color: '#6d28d9',
                            fontWeight: 700,
                            textDecoration: 'underline',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          Open on YouTube ↗
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Phonetic Category Quick-Filter Strip */}
                  <div className="varnamala-filter-bar" role="tablist" aria-label="Filter Alphabet by Category">
                    <span className="varnamala-filter-title">वर्ग-चयनम् · Category:</span>
                    <div className="varnamala-filter-scroll">
                      <button
                        type="button"
                        role="tab"
                        aria-selected={varnamalaCategoryFilter === 'all'}
                        className={`varnamala-filter-chip${varnamalaCategoryFilter === 'all' ? ' varnamala-filter-chip--active' : ''}`}
                        onClick={() => setVarnamalaCategoryFilter('all')}
                      >
                        <span className="varnamala-filter-icon" aria-hidden="true">🌟</span>
                        <span className="varnamala-filter-text">सर्वे वर्णाः (All)</span>
                        <span className="varnamala-filter-count">46</span>
                      </button>

                      <button
                        type="button"
                        role="tab"
                        aria-selected={varnamalaCategoryFilter === 'vowels'}
                        className={`varnamala-filter-chip${varnamalaCategoryFilter === 'vowels' ? ' varnamala-filter-chip--active' : ''}`}
                        onClick={() => setVarnamalaCategoryFilter('vowels')}
                      >
                        <span className="varnamala-filter-icon" aria-hidden="true">🔤</span>
                        <span className="varnamala-filter-text">स्वराः (Vowels)</span>
                        <span className="varnamala-filter-count">13</span>
                      </button>

                      <button
                        type="button"
                        role="tab"
                        aria-selected={varnamalaCategoryFilter === 'vargas'}
                        className={`varnamala-filter-chip${varnamalaCategoryFilter === 'vargas' ? ' varnamala-filter-chip--active' : ''}`}
                        onClick={() => setVarnamalaCategoryFilter('vargas')}
                      >
                        <span className="varnamala-filter-icon" aria-hidden="true">🎯</span>
                        <span className="varnamala-filter-text">स्पर्शाः (5 Vargas)</span>
                        <span className="varnamala-filter-count">25</span>
                      </button>

                      <button
                        type="button"
                        role="tab"
                        aria-selected={varnamalaCategoryFilter === 'semivowels'}
                        className={`varnamala-filter-chip${varnamalaCategoryFilter === 'semivowels' ? ' varnamala-filter-chip--active' : ''}`}
                        onClick={() => setVarnamalaCategoryFilter('semivowels')}
                      >
                        <span className="varnamala-filter-icon" aria-hidden="true">🌊</span>
                        <span className="varnamala-filter-text">अन्तःस्थाः (Semivowels)</span>
                        <span className="varnamala-filter-count">4</span>
                      </button>

                      <button
                        type="button"
                        role="tab"
                        aria-selected={varnamalaCategoryFilter === 'sibilants'}
                        className={`varnamala-filter-chip${varnamalaCategoryFilter === 'sibilants' ? ' varnamala-filter-chip--active' : ''}`}
                        onClick={() => setVarnamalaCategoryFilter('sibilants')}
                      >
                        <span className="varnamala-filter-icon" aria-hidden="true">💨</span>
                        <span className="varnamala-filter-text">ऊष्माणः (Sibilants)</span>
                        <span className="varnamala-filter-count">4</span>
                      </button>

                      <button
                        type="button"
                        role="tab"
                        aria-selected={varnamalaCategoryFilter === 'ayogavaha'}
                        className={`varnamala-filter-chip${varnamalaCategoryFilter === 'ayogavaha' ? ' varnamala-filter-chip--active' : ''}`}
                        onClick={() => setVarnamalaCategoryFilter('ayogavaha')}
                      >
                        <span className="varnamala-filter-icon" aria-hidden="true">💎</span>
                        <span className="varnamala-filter-text">अयोगवाहाः (Modifiers)</span>
                        <span className="varnamala-filter-count">3</span>
                      </button>

                      <button
                        type="button"
                        role="tab"
                        aria-selected={varnamalaCategoryFilter === 'conjuncts'}
                        className={`varnamala-filter-chip${varnamalaCategoryFilter === 'conjuncts' ? ' varnamala-filter-chip--active' : ''}`}
                        onClick={() => setVarnamalaCategoryFilter('conjuncts')}
                      >
                        <span className="varnamala-filter-icon" aria-hidden="true">🧩</span>
                        <span className="varnamala-filter-text">संयुक्ताक्षराणि (Conjuncts)</span>
                        <span className="varnamala-filter-count">4</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeLessonId === 'barakhadi' && (
                <>
                  <div className="varnamala-chart-toggle-wrap">
                    <button
                      type="button"
                      className="varnamala-chart-toggle"
                      onClick={() => setIsChartOpen((open) => !open)}
                      aria-expanded={isChartOpen}
                      aria-controls="barakhadi-chart-panel"
                    >
                      🗺️ View बारहखड़ी Complete Chart
                      <span className="varnamala-chart-toggle-arrow">{isChartOpen ? '▲' : '▼'}</span>
                    </button>
                    <div
                      id="barakhadi-chart-panel"
                      className={`varnamala-chart-panel${isChartOpen ? ' varnamala-chart-panel--open' : ''}`}
                    >
                      <img
                        src="./barakhadi-chart.png"
                        alt="Complete बारहखड़ी Sanskrit matra chart for beginners"
                        className="varnamala-chart-image"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <div className="varnamala-chart-toggle-wrap" style={{ marginTop: '0.65rem' }}>
                    <button
                      type="button"
                      className="varnamala-chart-toggle"
                      onClick={() => setIsFlashcardDownloadOpen(true)}
                      style={{
                        background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
                        borderColor: '#10b981',
                        color: '#065f46',
                        fontWeight: 700,
                      }}
                    >
                      <span>🖨️ Download / Print Flashcards &amp; PDF (वर्णमाला एवं बारहखड़ी)</span>
                      <span className="varnamala-chart-toggle-arrow">📥</span>
                    </button>
                  </div>

                  <div className="varnamala-chart-toggle-wrap" style={{ marginTop: '0.65rem' }}>
                    <button
                      type="button"
                      className="varnamala-chart-toggle"
                      onClick={() => setIsGunitaOpen((open) => !open)}
                      aria-expanded={isGunitaOpen}
                      style={{
                        background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
                        borderColor: '#f59e0b',
                        color: '#9a3412',
                        fontWeight: 700,
                      }}
                    >
                      <span>📜 Guṇitākṣarāṇi (गुणिताक्षराणि) Symbols &amp; Exceptions Guide</span>
                      <span className="varnamala-chart-toggle-arrow">{isGunitaOpen ? '▲' : '▼'}</span>
                    </button>
                    {isGunitaOpen && (
                      <div style={{ marginTop: '1rem' }}>
                        <GunitaaksharaGuide />
                      </div>
                    )}
                  </div>
                </>
              )}

              {activeLesson.sentences.map((group, groupIdx) => {
                if (isVarnamala) {
                  const isVisible =
                    varnamalaCategoryFilter === 'all' ||
                    (varnamalaCategoryFilter === 'vowels' && groupIdx === 0) ||
                    (varnamalaCategoryFilter === 'vargas' && groupIdx >= 1 && groupIdx <= 5) ||
                    (varnamalaCategoryFilter === 'semivowels' && groupIdx === 6) ||
                    (varnamalaCategoryFilter === 'sibilants' && groupIdx === 7) ||
                    (varnamalaCategoryFilter === 'ayogavaha' && groupIdx === 8) ||
                    (varnamalaCategoryFilter === 'conjuncts' && groupIdx === 9);

                  if (!isVisible) return null;
                }

                const groupMeta = isVarnamala ? getVarnamalaGroupMeta(groupIdx) : null;
                const isFirstVargaShown =
                  isVarnamala &&
                  groupMeta?.isVarga &&
                  (groupIdx === 1 || (varnamalaCategoryFilter === 'vargas' && groupIdx === 1));

                return (
                  <div
                    key={group.category || groupIdx}
                    className={`varnamala-row varnamala-row--${groupIdx % 10}${groupMeta?.isVarga ? ' varnamala-row--varga' : ''}`}
                  >
                    <div className="varnamala-row-header">
                      <div className="varnamala-row-header-title-wrap">
                        <div className="varnamala-row-header-top">
                          <span className="varnamala-row-label">
                            {groupMeta?.title || group.meaning || group.category}
                          </span>
                          {groupMeta?.articulation && (
                            <span className="varnamala-row-badge">{groupMeta.articulation}</span>
                          )}
                          {groupMeta?.count && (
                            <span className="varnamala-row-count-badge">{groupMeta.count}</span>
                          )}
                        </div>
                        {groupMeta?.description && (
                          <p className="varnamala-row-subtext">{groupMeta.description}</p>
                        )}
                      </div>
                      <button
                        type="button"
                        className={`textbook-playrow-btn${isPlayingAll && playingGroupIdx === groupIdx ? ' textbook-playrow-btn--active' : ''}`}
                        onClick={() => handlePlayGroup(group.words || [], groupIdx)}
                        aria-label={
                          isPlayingAll && playingGroupIdx === groupIdx
                            ? `Stop playing ${groupMeta?.title || group.meaning || 'this row'}`
                            : `Play all letters in ${groupMeta?.title || group.meaning || 'this row'}`
                        }
                        aria-pressed={isPlayingAll && playingGroupIdx === groupIdx}
                        title={isPlayingAll && playingGroupIdx === groupIdx ? 'Stop this row' : 'Play all letters in this row'}
                      >
                        <span className="playrow-icon">{isPlayingAll && playingGroupIdx === groupIdx ? '⏹' : '▶'}</span>
                        <span className="playrow-text">{isPlayingAll && playingGroupIdx === groupIdx ? 'Stop' : 'Play all'}</span>
                      </button>
                    </div>

                    {isFirstVargaShown && (
                      <div className="varnamala-varga-columns-guide" aria-hidden="true">
                        <div className="varga-guide-col">
                          <span className="varga-guide-badge">१st · अघोष</span>
                          <strong>अल्पप्राण</strong>
                          <small>Unvoiced Soft</small>
                        </div>
                        <div className="varga-guide-col">
                          <span className="varga-guide-badge">२nd · अघोष</span>
                          <strong>महाप्राण</strong>
                          <small>Unvoiced Aspirate</small>
                        </div>
                        <div className="varga-guide-col">
                          <span className="varga-guide-badge">३rd · घोष</span>
                          <strong>अल्पप्राण</strong>
                          <small>Voiced Soft</small>
                        </div>
                        <div className="varga-guide-col">
                          <span className="varga-guide-badge">४th · घोष</span>
                          <strong>महाप्राण</strong>
                          <small>Voiced Aspirate</small>
                        </div>
                        <div className="varga-guide-col">
                          <span className="varga-guide-badge">५th · नासिक्य</span>
                          <strong>अनुनासिक</strong>
                          <small>Nasal Voiced</small>
                        </div>
                      </div>
                    )}

                    <div className={`varnamala-row-letters ${groupMeta?.layoutClass || ''}`}>
                      {group.words.map((letter, letterIdx) => {
                        const isExtraAnunasika = letter === 'अँ';
                        const mnemonic = isVarnamala ? getLetterMnemonic(letter) : undefined;

                        if (isVarnamala && mnemonic) {
                          const isPlayHighlight = playingLetter === letter;
                          return (
                            <div
                              key={`${activeLessonId}-${groupIdx}-${letterIdx}`}
                              role="button"
                              tabIndex={0}
                              className={`varnamala-bouncy-card${isPlayHighlight ? ' varnamala-bouncy-card--playing' : ''}`}
                              onClick={() => handleLetterActivate(letter)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  handleLetterActivate(letter);
                                }
                              }}
                              aria-label={`Letter ${letter} (${tileLabel(letter)}). Click to hear syllable; picture chip speaks the word.`}
                              title={`Hear ${letter} · Picture word: ${mnemonic.wordSan} (${mnemonic.wordEn})`}
                              aria-current={isPlayHighlight ? 'true' : undefined}
                            >
                              <span className="v-card-akshara">{letter}</span>
                              {showRomanTiles ? (
                                <small className="v-card-roman">{tileLabel(letter)}</small>
                              ) : null}
                              <button
                                type="button"
                                className="v-card-mnemonic-badge"
                                aria-label={`Hear picture word ${mnemonic.wordSan} (${mnemonic.wordEn})`}
                                title={mnemonic.hoverNote || `Hear ${mnemonic.wordSan} — ${mnemonic.wordEn}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  stopPlayAll();
                                  playPronunciation(mnemonic.wordSan);
                                  showTapChip(letter);
                                }}
                              >
                                <span className="v-card-mnemonic-emoji" aria-hidden="true">{mnemonic.emoji}</span>
                                <span className="v-card-mnemonic-word">{mnemonic.wordSan}</span>
                                <span className="v-card-mnemonic-speak" aria-hidden="true">🔊</span>
                              </button>
                              <span
                                className="v-card-trace-btn"
                                role="button"
                                tabIndex={0}
                                title={`Trace & write ${letter}`}
                                aria-label={`Trace and write ${letter}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setPadSelectedLetter(letter);
                                  setVarnamalaSubMode('writing');
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setPadSelectedLetter(letter);
                                    setVarnamalaSubMode('writing');
                                  }
                                }}
                              >
                                ✍️
                              </span>
                            </div>
                          );
                        }

                        const isPlayHighlight = playingLetter === letter;
                        return (
                          <button
                            key={`${activeLessonId}-${groupIdx}-${letterIdx}`}
                            type="button"
                            className={`varnamala-letter-btn${showRomanTiles ? ' barakhadi-letter-btn' : ''}${isExtraAnunasika ? ' varnamala-letter-btn--extra' : ''}${isPlayHighlight ? ' varnamala-letter-btn--playing' : ''}`}
                            onClick={() => handleLetterActivate(letter)}
                            aria-label={`Play pronunciation for ${letter}${isExtraAnunasika ? ' (optional, for later)' : ''}${showRomanTiles ? ` (${tileLabel(letter)})` : ''}`}
                            title={isExtraAnunasika ? 'Candrabindu — optional for beginners, learn later' : undefined}
                            aria-current={isPlayHighlight ? 'true' : undefined}
                          >
                            <span className="barakhadi-dev">{letter}</span>
                            {showRomanTiles ? (
                              <small className="barakhadi-roman">{tileLabel(letter)}</small>
                            ) : null}
                            {isExtraAnunasika ? (
                              <small className="varnamala-letter-note">extra · later</small>
                            ) : null}
                          </button>
                        );
                      })}
                    </div>
                    {!groupMeta && <p className="varnamala-row-description">{group.sanskrit}</p>}
                  </div>
                );
              })}
            </>
          )}
        </div>
      ) : (
        <div className="textbook-sentence-block">
          {pageBreakdown && (
            <div className="textbook-block-page-tag" title={`Refer to physical book: ${pageBreakdown.bookName}`}>
              <span className="block-page-icon">📖</span>
              <span className="block-page-book">{pageBreakdown.bookName}:</span>
              <span className="block-page-number">{getBlockPhysicalPage(pageBreakdown, sentence.kind)}</span>
            </div>
          )}
          {(sentence.kind === 'exercise-header' || sentence.kind === 'exercise-qa' || sentence.kind === 'exercise-note') ? (
            <div className={`textbook-glossary-card textbook-exercise-card${sentence.kind === 'exercise-header' ? ' textbook-glossary-card--header' : ''}`}>
              {sentence.kind === 'exercise-header' ? (
                <>
                  <p className="textbook-glossary-title">{sentence.sanskrit}</p>
                  <p className="textbook-glossary-subtitle">{sentence.meaning}</p>
                  {sentence.hindi_gloss ? (
                    <p className="textbook-glossary-arth-hi" style={{ marginTop: '.25rem' }}>
                      {sentence.hindi_gloss}
                    </p>
                  ) : null}
                </>
              ) : sentence.kind === 'exercise-qa' ? (
                <>
                  <div className="textbook-glossary-pair">
                    <span className="textbook-glossary-label">प्रश्न</span>
                    <p className="textbook-exercise-q">
                      {sentence.words.length > 0 && sentence.sanskrit.length < 80 ? (
                        sentence.sanskrit
                      ) : (
                        sentence.sanskrit
                      )}
                    </p>
                  </div>
                  <div className="textbook-glossary-pair">
                    <span className="textbook-glossary-label">{sentence.answer_label || 'उत्तरम्'}</span>
                    <div className="textbook-glossary-arth">
                      <p className="textbook-glossary-arth-sa">
                        {(sentence.answer_sanskrit || sentence.sanskrit_gloss || '').split(/(\s+)/).map((part, idx) => {
                          const clean = part.replace(/[॥।,;:!?—–\-…/()]+/g, '');
                          const isWord = hasDevanagariLetter(clean);
                          if (!isWord) return <span key={idx}>{part}</span>;
                          return (
                            <span
                              key={idx}
                              className="interactive-word"
                              onClick={() => handleSpokenWord(clean)}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(event) => {
                                if (event.key === 'Enter' || event.key === ' ') handleSpokenWord(clean);
                              }}
                            >
                              {part}
                            </span>
                          );
                        })}
                      </p>
                      {sentence.meaning ? <p className="textbook-glossary-arth-en">{sentence.meaning}</p> : null}
                      {sentence.hindi_gloss ? <p className="textbook-glossary-arth-hi">{sentence.hindi_gloss}</p> : null}
                    </div>
                  </div>
                </>
              ) : (
                <div className="textbook-exercise-note-wrap">
                  <div className="textbook-glossary-pair" style={{ marginTop: 0 }}>
                    <span className="textbook-glossary-label">📝 पाठ्य-टिप्पणी · Context &amp; Notes</span>
                    <p className="textbook-exercise-note-text">
                      {lessonTokens.length > 0 ? (
                        lessonTokens.map((word, idx) => {
                          const hasLetter = hasDevanagariLetter(word);
                          if (isDandaOrVerseNumberToken(word) || !hasLetter) {
                            return (
                              <span
                                key={`${activeLessonId}-${sentenceNumber}-en-${idx}`}
                                className="textbook-punct-mark"
                                aria-hidden={isDandaOrVerseNumberToken(word)}
                              >
                                {word}
                              </span>
                            );
                          }
                          const cleaned = cleanWord(word);
                          const isSpeaking = idx === speakingTokenIdx;
                          const isSelected = speakingTokenIdx !== null
                            ? isSpeaking
                            : Boolean(cleanActiveWord && cleaned === cleanActiveWord);
                          return (
                            <span
                              key={`${activeLessonId}-${sentenceNumber}-en-${idx}`}
                              data-token-index={idx}
                              className={`interactive-word${isSelected ? ' interactive-word--active' : ''}${isSpeaking ? ' interactive-word--speaking' : ''}`}
                              onClick={() => handleSpokenWord(word)}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(event) => {
                                if (event.key === 'Enter' || event.key === ' ') {
                                  handleSpokenWord(word);
                                }
                              }}
                            >
                              {word}
                              {isSpeaking && currentSpeakingMeaning ? (
                                <span className="speaking-word-gloss-tooltip" aria-hidden="true">
                                  {currentSpeakingMeaning}
                                </span>
                              ) : null}
                            </span>
                          );
                        })
                      ) : (
                        sentence.sanskrit
                      )}
                    </p>
                  </div>
                  {sentence.meaning && (
                    <div className="textbook-glossary-pair">
                      <span className="textbook-glossary-label">📖 अनुवादः · English Translation</span>
                      <div className="textbook-glossary-arth">
                        <p className="textbook-glossary-arth-en">{sentence.meaning}</p>
                      </div>
                    </div>
                  )}
                  {(sentence.paragraphTranslation || sentence.hindi_gloss) && (
                    <div className="textbook-glossary-pair">
                      <span className="textbook-glossary-label" style={{ color: '#c2410c' }}>
                        🇮🇳 हिन्दी-भावार्थः · Hindi Translation
                      </span>
                      <div className="textbook-glossary-arth">
                        <p className="textbook-glossary-arth-hi">
                          {sentence.paragraphTranslation || sentence.hindi_gloss}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (sentence.kind === 'glossary' || sentence.kind === 'glossary-header') ? (
            <div className={`textbook-glossary-card${sentence.kind === 'glossary-header' ? ' textbook-glossary-card--header' : ''}`}>
              {sentence.kind === 'glossary-header' ? (
                <>
                  <p className="textbook-glossary-title">
                    {sentence.words.map((word, idx) => isDandaOrVerseNumberToken(word) ? (
                      <span key={`${activeLessonId}-gh-${idx}`} className="textbook-punct-mark" aria-hidden="true">
                        {word}
                      </span>
                    ) : (
                      <span
                        key={`${activeLessonId}-gh-${idx}`}
                        className="interactive-word"
                        onClick={() => handleSpokenWord(word)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') handleSpokenWord(word);
                        }}
                      >
                        {word}
                      </span>
                    ))}
                  </p>
                  <p className="textbook-glossary-subtitle">{sentence.meaning}</p>
                  <p className="textbook-glossary-hint">शब्द tap → अर्थ below. Then Analyse on the right.</p>
                </>
              ) : (
                <>
                  <div className="textbook-glossary-pair">
                    <span className="textbook-glossary-label">शब्द</span>
                    <button
                      type="button"
                      className="textbook-glossary-shabd"
                      onClick={() => handleSpokenWord(sentence.sanskrit)}
                    >
                      {sentence.sanskrit}
                    </button>
                  </div>
                  <div className="textbook-glossary-pair">
                    <span className="textbook-glossary-label">अर्थ</span>
                    <div className="textbook-glossary-arth">
                      {sentence.sanskrit_gloss ? (
                        <p className="textbook-glossary-arth-sa">{sentence.sanskrit_gloss}</p>
                      ) : null}
                      {sentence.meaning ? (
                        <p className="textbook-glossary-arth-en">{sentence.meaning}</p>
                      ) : null}
                      {sentence.hindi_gloss ? (
                        <p className="textbook-glossary-arth-hi">{sentence.hindi_gloss}</p>
                      ) : null}
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <p className="textbook-sentence-sanskrit">
                {lessonTokens.map((word, idx) => {
                  // । ॥ (and verse numbers like ॥१॥) stay visible but are not clickable words.
                  if (isDandaOrVerseNumberToken(word)) {
                    return (
                      <span
                        key={`${activeLessonId}-${sentenceNumber}-${idx}`}
                        className="textbook-punct-mark"
                        aria-hidden="true"
                      >
                        {word}
                      </span>
                    );
                  }
                  // While Play all speaks, only the word being spoken is lit (repeats light in order).
                  if (!hasDevanagariLetter(word) && !/[०-९]/.test(word)) {
                    return (
                      <span key={`${activeLessonId}-${sentenceNumber}-${idx}`} className="textbook-punct-mark">
                        {word}
                      </span>
                    );
                  }
                  const cleaned = cleanWord(word);
                  const isSpeaking = idx === speakingTokenIdx;
                  const isSelected = speakingTokenIdx !== null
                    ? isSpeaking
                    : Boolean(cleanActiveWord && cleaned === cleanActiveWord);
                  return (
                    <span
                      key={`${activeLessonId}-${sentenceNumber}-${idx}`}
                      data-token-index={idx}
                      className={`interactive-word${isSelected ? ' interactive-word--active' : ''}${isSpeaking ? ' interactive-word--speaking' : ''}`}
                      onClick={() => handleSpokenWord(word)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          handleSpokenWord(word);
                        }
                      }}
                    >
                      {word}
                      {isSpeaking && currentSpeakingMeaning ? (
                        <span className="speaking-word-gloss-tooltip" aria-hidden="true">
                          {currentSpeakingMeaning}
                        </span>
                      ) : null}
                    </span>
                  );
                })}
              </p>

              {/* English Meaning Box — Clean translation without distracting English word highlights */}
              {sentence.meaning && (
                <div className="textbook-sentence-meaning-box" role="region" aria-label="English Translation">
                  <div className="textbook-meaning-header">
                    <span className="textbook-meaning-tag">📖 अनुवादः · English Translation</span>
                  </div>
                  <p className="textbook-sentence-meaning">{sentence.meaning}</p>
                </div>
              )}

              {/* Hindi Translation if available */}
              {sentence.paragraphTranslation && (
                <div className="textbook-paragraph-translation">
                  <span className="textbook-paragraph-translation-label">हिन्दी अनुवादः · Hindi Meaning</span>
                  <p className="textbook-paragraph-translation-text">{sentence.paragraphTranslation}</p>
                </div>
              )}

              {/* Special Interactive Match Game for Class 7 Deepakam Ch 9 Paragraph 3 */}
              {sentence.sanskrit?.includes('गणितज्ञाः') && onOpenPuzzle && (
                <div
                  className="textbook-special-activity-card"
                  style={{
                    marginTop: '1.25rem',
                    padding: '1.15rem 1.35rem',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 50%, #e0e7ff 100%)',
                    border: '2px solid #8b5cf6',
                    boxShadow: '0 4px 16px rgba(124, 58, 237, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    flexWrap: 'wrap',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <span style={{ fontSize: '2.4rem', lineHeight: 1 }} aria-hidden="true">🔬</span>
                    <div>
                      <span
                        style={{
                          display: 'inline-block',
                          background: '#7c3aed',
                          color: '#ffffff',
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          padding: '2px 8px',
                          borderRadius: '999px',
                          marginBottom: '0.25rem',
                          letterSpacing: '0.04em',
                        }}
                      >
                        DEEPAKAM CH 9 · PARAGRAPH 3 INTERACTIVE GAME
                      </span>
                      <div style={{ fontWeight: 800, fontSize: '1rem', color: '#4c1d95', lineHeight: 1.3 }}>
                        वैदिक-विज्ञानानि व्यवसायाः च · Match the 22 Ancient Sciences &amp; Professions
                      </div>
                      <div style={{ fontSize: '0.84rem', color: '#5b21b6', marginTop: '0.2rem' }}>
                        Mathematicians, Astronomers, Geologists, Technologists, Physicians, Chemists &amp; more with child-friendly English references!
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpenPuzzle('cat_deepakam_sciences')}
                    style={{
                      padding: '0.7rem 1.4rem',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
                      color: '#ffffff',
                      border: 'none',
                      fontWeight: 800,
                      fontSize: '0.92rem',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(124, 58, 237, 0.35)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <span>🎮 Play Matching Game ➔</span>
                  </button>
                </div>
              )}

              {/* Instant Inline Word Meaning Bar — Reads right on the same page with 0 scrolling */}
              {cleanActiveWord && (
                <div className="textbook-inline-meaning-bar" role="region" aria-label="Selected word meaning">
                  <div className="textbook-inline-meaning-header">
                    <div className="textbook-inline-word-info">
                      <span className="textbook-inline-tag">शब्दार्थः · Word Meaning</span>
                      <span className="textbook-inline-dev">{cleanActiveWord}</span>
                      <button
                        type="button"
                        className="textbook-inline-sound-btn"
                        onClick={() => (isGroupedLesson ? playPronunciation(cleanActiveWord) : playLessonText(cleanActiveWord))}
                        title={`Listen to ${cleanActiveWord}`}
                        aria-label={`Listen to ${cleanActiveWord}`}
                      >
                        🔊
                      </button>
                    </div>
                    {activeGloss?.grammar && (
                      <span className="textbook-inline-grammar">{activeGloss.grammar}</span>
                    )}
                  </div>
                  <div className="textbook-inline-meaning-body">
                    {activeEnglishMeaning ? (
                      <p className="textbook-inline-en">
                        <span className="textbook-inline-lang-lbl">English:</span> {activeEnglishMeaning}
                      </p>
                    ) : null}
                    {activeHindiMeaning ? (
                      <p className="textbook-inline-hi">
                        <span className="textbook-inline-lang-lbl">हिन्दी:</span> {activeHindiMeaning}
                      </p>
                    ) : null}
                    {activeGloss?.sanskrit_gloss ? (
                      <p className="textbook-inline-sa">
                        <span className="textbook-inline-lang-lbl">संस्कृतम्:</span> {activeGloss.sanskrit_gloss}
                      </p>
                    ) : null}
                  </div>
                </div>
              )}

              {/* Word-to-Word Match Test: Kids relate Sanskrit words to English meanings before moving on */}
              <ParagraphWordMatchTest
                sentence={sentence}
                sentenceNumber={sentenceNumber}
                totalSentences={totalSentences}
                activeLessonId={activeLessonId}
                glosses={glosses}
                onNext={onNext}
                isLastSentence={isLastSentence}
                onOpenQuiz={onOpenQuiz ? () => onOpenQuiz() : undefined}
              />
            </>
          )}
        </div>
      )}

      {/* End of Grade Lessons Completion & Exam Guide Banner */}
      {!isGroupedLesson && isLastSentence && onOpenCbseGuide && (
        <div className="textbook-grade-completion-guide" role="region" aria-label="CBSE Sanskrit Exam Blueprint & Guide">
          <div className="grade-guide-header">
            <span className="grade-guide-badge">
              {activeLessonId.startsWith('grade9_')
                ? 'शारदा · Class 9'
                : activeLessonId.startsWith('grade8_')
                ? 'Deepakam 8th grade · दीपकम'
                : 'Deepakam 7th grade · दीपकम'}
            </span>
            <h4>📋 CBSE Sanskrit Exam Blueprint &amp; Question Directives</h4>
          </div>
          <p>
            {activeLessonId === 'gsde115'
              ? 'Congratulations on completing all 15 Deepakam Class 7 lessons! Prepare for your school and board exams with standardized instruction formulas (निर्देशाः), 10 core question words (क-कार शब्दाः), and grammatical directives.'
              : activeLessonId === 'grade9_ch3'
              ? 'Class 9 chapters completed! Master CBSE High School paper structure, अन्वय-पूरणम्, प्रश्ननिर्माणम्, and precision sentence corrections.'
              : activeLessonId === 'grade8_app1' || activeLessonId === 'grade8_ch13'
              ? 'Class 8 lessons completed! Master CBSE High School paper structure, अन्वय-पूरणम्, प्रश्ननिर्माणम्, and precision sentence corrections.'
              : 'Prepare for school exams: master question instruction keywords (एकपदेन, पूर्णवाक्येन, अन्वयः) and grammatical directives (कर्तृपदम्, क्रियापदम्) for this grade.'}
          </p>
          <button type="button" className="grade-guide-action-btn" onClick={onOpenCbseGuide}>
            📋 Open CBSE Sanskrit Exam Guide (Classes 7–10) ➔
          </button>
        </div>
      )}

      {/* Chapter Practice & Resource Hub Card */}
      {!isGroupedLesson && (
        <div className="textbook-chapter-bundle-card" role="region" aria-label="Chapter Resources and Practice Hub">
          <div className="chapter-bundle-header">
            <span className="chapter-bundle-badge">Chapter Resource Hub</span>
            <h3 className="chapter-bundle-title">📚 {activeLesson?.title || 'Chapter Practice & Resources'}</h3>
            <p className="chapter-bundle-subtitle">
              Master this chapter with interactive 10-question quizzes, printable worksheets, complete NCERT solutions, and authentic dictionary lookups.
            </p>
          </div>
          <div className="chapter-bundle-grid">
            <div className="chapter-bundle-item">
              <span className="bundle-item-icon">🎯</span>
              <div className="bundle-item-content">
                <h4>10-Question Chapter Quiz</h4>
                <p>Test comprehension with instant scoring, timer, and detailed answer explanations.</p>
                {onOpenQuiz && (
                  <button
                    type="button"
                    className="bundle-action-btn bundle-action-btn--quiz"
                    onClick={() => onOpenQuiz(currentChapterQuizCat)}
                  >
                    Start 10-Q Quiz ➔
                  </button>
                )}
              </div>
            </div>

            <div className="chapter-bundle-item">
              <span className="bundle-item-icon">📑</span>
              <div className="bundle-item-content">
                <h4>Printable Worksheets</h4>
                <p>Word meanings, Sandhi breakdowns, shabdroop fill-ins, and classroom tests.</p>
                {onOpenWorksheets && (
                  <button
                    type="button"
                    className="bundle-action-btn bundle-action-btn--ws"
                    onClick={() => onOpenWorksheets(currentChapterWsCat)}
                  >
                    Open Worksheets ➔
                  </button>
                )}
              </div>
            </div>

            {activeLessonId === 'gsde109' && onOpenPuzzle && (
              <div
                className="chapter-bundle-item"
                style={{
                  border: '2px solid #8b5cf6',
                  background: 'linear-gradient(135deg, rgba(245, 243, 255, 0.95), rgba(238, 242, 255, 0.95))',
                }}
              >
                <span className="bundle-item-icon">🔬</span>
                <div className="bundle-item-content">
                  <span
                    style={{
                      background: '#7c3aed',
                      color: '#fff',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: '999px',
                      display: 'inline-block',
                      marginBottom: '6px',
                    }}
                  >
                    Interactive Match · Page 96
                  </span>
                  <h4>वैदिक-विज्ञानानि व्यवसायाः च Match</h4>
                  <p>Match the 22 ancient Sanskrit sciences, astronomers, and scholars from Paragraph 3 with modern English references!</p>
                  <button
                    type="button"
                    className="bundle-action-btn"
                    style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)', color: '#fff' }}
                    onClick={() => onOpenPuzzle('cat_deepakam_sciences')}
                  >
                    🎮 Play Sciences Match Game ➔
                  </button>
                </div>
              </div>
            )}

            {chapterPdfUrl && (
              <div className="chapter-bundle-item">
                <span className="bundle-item-icon">📥</span>
                <div className="bundle-item-content">
                  <h4>NCERT Solved Study Guide</h4>
                  <p>Curated 45-page question bank with verse translations and grammatical notes.</p>
                  <a
                    href={chapterPdfUrl}
                    download
                    className="bundle-action-btn bundle-action-btn--dl"
                  >
                    Download PDF Guide ⬇
                  </a>
                </div>
              </div>
            )}

            <div className="chapter-bundle-item">
              <span className="bundle-item-icon">🔍</span>
              <div className="bundle-item-content">
                <h4>Koshashri Sanskrit Dictionary</h4>
                <p>Look up roots, dhātus, and lexical meanings in the authoritative lexicon.</p>
                <a
                  href={`https://koshashri-dc.ac.in/search/catalog/1/10?searchTerm=${encodeURIComponent(
                    activeLesson?.title?.split(' ')[0] || 'अ'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bundle-action-btn bundle-action-btn--dict"
                >
                  Explore Dictionary ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {!isGroupedLesson && (
        <div className="textbook-nav-buttons">
          <button
            type="button"
            className="textbook-nav-btn"
            onClick={goReaderPrevious}
            disabled={isFirstSentence}
          >
            ◀ Previous
          </button>
          {isLastSentence && onOpenCbseGuide && (activeLessonId === 'gsde115' || activeLessonId === 'grade8_app1' || activeLessonId === 'grade8_ch13' || activeLessonId === 'grade9_ch3') ? (
            <button
              type="button"
              className="textbook-nav-btn textbook-nav-btn--guide"
              onClick={onOpenCbseGuide}
              title="Open CBSE Sanskrit Exam Guide"
            >
              📋 CBSE Exam Guide ➔
            </button>
          ) : (
            <button
              type="button"
              className="textbook-nav-btn"
              onClick={goReaderNext}
              disabled={isLastSentence}
            >
              Next ▶
            </button>
          )}
        </div>
      )}

      {showEndGuide ? (
        <aside className="textbook-end-guide" aria-label="Bodhi, what to read next">
          <BodhiAvatar mood="celebrate" size="sm" isSpeaking={playAllPhase !== 'paused'} />
          <div className="textbook-end-guide-copy">
            <p className="textbook-end-guide-line">साधु। अयं पाठः समाप्तः।</p>
            <p className="textbook-end-guide-en">This lesson is finished. What next?</p>
            <div className="textbook-end-guide-actions">
              {nextLessonInTrack ? (
                <button
                  type="button"
                  className="textbook-end-guide-btn"
                  onClick={() => onSelectLesson(nextLessonInTrack.id)}
                  title={nextLessonInTrack.title}
                >
                  अग्रिमः पाठः
                  <span>{nextLessonInTrack.title}</span>
                </button>
              ) : null}
              {studyJumps.glossary ? (
                <button
                  type="button"
                  className="textbook-end-guide-btn"
                  onClick={() => jumpStudySection(studyJumps.glossary!.index)}
                  title={studyJumps.glossary.heading}
                >
                  {studyJumps.glossary.label}
                  <span>{studyJumps.glossary.hint}</span>
                </button>
              ) : null}
              {studyJumps.exercise ? (
                <button
                  type="button"
                  className="textbook-end-guide-btn"
                  onClick={() => jumpStudySection(studyJumps.exercise!.index)}
                  title={studyJumps.exercise.heading}
                >
                  {studyJumps.exercise.label}
                  <span>{studyJumps.exercise.hint}</span>
                </button>
              ) : null}
              <button type="button" className="textbook-end-guide-btn" onClick={replayLessonFromStart}>
                पुनः शृणु
                <span>Replay</span>
              </button>
            </div>
          </div>
        </aside>
      ) : null}

      {isSymbolsOpen && (
        <div
          className="symbols-modal-overlay"
          onClick={() => setIsSymbolsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="symbols-modal-title"
        >
          <div className="symbols-modal-content symbols-modal-content--wide" onClick={(e) => e.stopPropagation()}>
            <header className="symbols-modal-header">
              <div>
                <h3 id="symbols-modal-title">संस्कृत-चिह्नानि · Sanskrit Symbols Reference</h3>
                <p>Mātrās (vowel signs), dependent modifiers, and classical punctuation marks</p>
              </div>
              <button
                type="button"
                className="symbols-modal-close"
                onClick={() => setIsSymbolsOpen(false)}
                aria-label="Close symbols reference"
              >
                ✕
              </button>
            </header>

            <div className="symbols-modal-body">
              <section className="symbols-section" aria-labelledby="matras-heading">
                <h4 id="matras-heading" className="symbols-section-title">
                  स्वर-मात्राः · Sanskrit Vowel Signs (Mātrās)
                </h4>
                <p className="symbols-section-intro">
                  When a vowel joins a consonant, it usually appears as a dependent <strong>mātrā</strong> (मात्रा)
                  rather than its independent letter form. Combinations below use <strong>क</strong> as the base.
                  Click an example to hear it.
                </p>
                <div className="symbols-table-scroll">
                  <table className="symbols-table symbols-table--matras">
                    <thead>
                      <tr>
                        <th>Sanskrit Vowel</th>
                        <th>Matra Symbol</th>
                        <th>Matra Name</th>
                        <th>Combination (with क)</th>
                        <th>Transliteration / Sound</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SANSKRIT_MATRAS.map((row) => (
                        <tr key={row.vowel}>
                          <td className="symbol-glyph symbol-glyph--vowel">{row.vowel}</td>
                          <td className="symbol-matra-cell">
                            <span className="symbol-matra-glyph">{row.matraSymbol}</span>
                          </td>
                          <td className="symbol-name-col">
                            <span className="symbol-dev-name">{row.matraName}</span>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="symbol-example-play"
                              onClick={() => playPronunciation(row.example)}
                              title={`Listen to ${row.example}`}
                              aria-label={`Listen to ${row.example}`}
                            >
                              <span className="symbol-example-dev">{row.example}</span>
                              <span className="symbol-audio-btn" aria-hidden="true">🔊</span>
                            </button>
                          </td>
                          <td>
                            <span className="symbol-sound-note">{row.transliteration}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="symbols-section" aria-labelledby="modifiers-heading">
                <h4 id="modifiers-heading" className="symbols-section-title">
                  Dependent Modifiers
                </h4>
                <p className="symbols-section-intro">
                  These marks attach to letters to change nasalization, aspiration, or to mute the inherent vowel.
                </p>
                <div className="symbols-table-scroll">
                  <table className="symbols-table symbols-table--modifiers">
                    <thead>
                      <tr>
                        <th>Modifier Symbol</th>
                        <th>Symbol Name</th>
                        <th>Function</th>
                        <th>Example</th>
                        <th>Transliteration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {DEPENDENT_MODIFIERS.map((row) => (
                        <tr key={row.symbol}>
                          <td className="symbol-matra-cell">
                            <span className="symbol-matra-glyph">{row.symbol}</span>
                          </td>
                          <td className="symbol-name-col">
                            <span className="symbol-dev-name">{row.name}</span>
                          </td>
                          <td>
                            <p className="symbol-desc-text">{row.function}</p>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="symbol-example-play"
                              onClick={() => playPronunciation(row.example)}
                              title={`Listen to ${row.example}`}
                              aria-label={`Listen to ${row.example}`}
                            >
                              <span className="symbol-example-dev">{row.example}</span>
                              <span className="symbol-audio-btn" aria-hidden="true">🔊</span>
                            </button>
                          </td>
                          <td>
                            <span className="symbol-sound-note">{row.transliteration}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="symbols-section" aria-labelledby="punct-heading">
                <h4 id="punct-heading" className="symbols-section-title">
                  विरामचिह्नानि · Punctuation & Sacred Marks
                </h4>
                <div className="symbols-table-scroll">
                  <table className="symbols-table">
                    <thead>
                      <tr>
                        <th>चिह्नम्</th>
                        <th>नाम व कार्यम्</th>
                        <th>विवरणम् (Role)</th>
                        <th>उदाहरणम् (Example)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SANSKRIT_SYMBOLS.map((item) => (
                        <tr key={item.symbol}>
                          <td className="symbol-glyph">{item.symbol}</td>
                          <td className="symbol-name-col">
                            <span className="symbol-dev-name">{item.name}</span>
                            <span className="symbol-role-badge">{item.role}</span>
                          </td>
                          <td>
                            <p className="symbol-desc-text">{item.description}</p>
                          </td>
                          <td>
                            <div className="symbol-example-box">
                              <span>{item.example}</span>
                              <button
                                type="button"
                                className="symbol-audio-btn"
                                onClick={() => playPronunciation(item.example)}
                                title="Listen"
                                aria-label={`Listen to ${item.example}`}
                              >
                                🔊
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>

            <footer className="symbols-modal-footer">
              <span>
                Tip: Mātrās turn independent vowels into dependent signs on consonants (क् + आ = का).
                Daṇḍa (।) and Dvi-daṇḍa (॥) mark prose / verse boundaries. For interactive practice, open
                Guṇitākṣarāṇi on the Varṇamālā page.
              </span>
            </footer>
          </div>
        </div>
      )}

      <Grade8SyllabusModal
        isOpen={isGrade7SyllabusOpen}
        onClose={() => setIsGrade7SyllabusOpen(false)}
        onSelectLesson={(id) => onSelectLesson(id)}
        onOpenCbseGuide={onOpenCbseGuide}
        syllabus={GRADE_7_SYLLABUS}
        gradeBadge="सप्तमकक्षा-पाठ्यक्रमः · Deepakam 7th grade · दीपकम"
        intro="Index of the Class 7 Deepakam lessons in this reader: chapters, extra study, and the two grammar appendices."
        coreLessonCount={12}
        appendixCount={2}
        pageSpan="1–15"
        pageStatSuffix="Deepakam lessons"
        searchPlaceholder="🔍 Search Class 7 chapter, theme, or grammar (e.g. वन्दे भारतमातरम्, लट्)..."
        lessonIdPrefix="gsde"
        knownLessonIds={lessons.map((item) => item.id)}
        accessGated={false}
        examTitle="CBSE Class 7 Sanskrit Exam Guide & Question Directives"
        examBlurb="The same CBSE Sanskrit exam guide used with this reader: question words, section instructions, and how the paper grows from Class 7."
      />
      <Grade8SyllabusModal
        isOpen={isGrade8SyllabusOpen}
        onClose={() => setIsGrade8SyllabusOpen(false)}
        onSelectLesson={(id) => onSelectLesson(id)}
        onOpenCbseGuide={onOpenCbseGuide}
      />
      <Grade8SyllabusModal
        isOpen={isGrade9SyllabusOpen}
        onClose={() => setIsGrade9SyllabusOpen(false)}
        onSelectLesson={(id) => onSelectLesson(id)}
        onOpenCbseGuide={onOpenCbseGuide}
        syllabus={GRADE_9_SYLLABUS}
        gradeBadge="नवमकक्षा-पाठ्यक्रमः · शारदा (NEP, CBSE exam)"
        intro="Index of the Class 9 Sharda lessons in this reader, including the prayer, twelve chapters, and grammar appendices."
        coreLessonCount={12}
        appendixCount={4}
        pageSpan="Page iii to 244"
        searchPlaceholder="🔍 Search Class 9 chapter, page, or grammar (e.g. समास, वन्दे मातरम्)..."
        lessonIdPrefix="grade9_"
        knownLessonIds={lessons.map((item) => item.id)}
        accessGated
        accountNote="Class 9 lessons, worksheets, and quizzes are open to everyone with an account. Sign in or register for free to start learning!"
        examTitle="CBSE Class 9 Sanskrit Exam Guide & Question Directives"
        examBlurb="The same CBSE Sanskrit exam guide used with this reader: question words, section instructions, and board-pattern practice."
      />
      <VarnamalaFlashcardDownloadModal
        isOpen={isFlashcardDownloadOpen}
        onClose={() => setIsFlashcardDownloadOpen(false)}
        initialMode={activeLessonId === 'barakhadi' ? 'barakhadi' : 'varnamala'}
      />
      {nowPlayingLetter ? (
        <div className="varna-now-playing" role="status" aria-live="polite">
          <span className="varna-now-playing__pulse" aria-hidden="true">🔊</span>
          <span className="varna-now-playing__letter">{nowPlayingLetter}</span>
          {nowPlayingMnemonic ? (
            <span className="varna-now-playing__word">
              <span className="varna-now-playing__emoji" aria-hidden="true">{nowPlayingMnemonic.emoji}</span>
              <span className="varna-now-playing__san">{nowPlayingMnemonic.wordSan}</span>
              <span className="varna-now-playing__en">{nowPlayingMnemonic.wordEn}</span>
            </span>
          ) : (
            <span className="varna-now-playing__word">
              <span className="varna-now-playing__en">{tileLabel(nowPlayingLetter)}</span>
            </span>
          )}
        </div>
      ) : null}
    </section>
  );
};

export default TextbookReader;