import React, { useEffect, useRef, useState } from 'react';
import type { Lesson, LessonSentence } from '../types/chapters';
import { aksharaLabel, varnamalaLabel } from '../utils/barakhadiPhonetics';
import { playPronunciation, playSequence, stopPronunciation } from '../utils/pronunciation';
import { hasDevanagariLetter, isDandaOrVerseNumberToken } from '../utils/dandaSpeech';
import {
  loadAnalyseGlosses,
  lookupAnalyseGloss,
  englishMeaningFromGloss,
  type AnalyseRegistry,
} from '../utils/analyseGloss';
import { useAuthStore } from '../store/authStore';
import { canAccessAllChapters } from '../utils/premiumAccess';
import { Grade8SyllabusModal } from './Grade8SyllabusModal';
import { getLetterMnemonic } from '../data/varnamalaMnemonics';
import { VarnamalaWritingPad } from './VarnamalaWritingPad';
import { ErrorBoundary } from './ErrorBoundary';
import GunitaaksharaGuide from './GunitaaksharaGuide';
import { NumbersGuide } from './NumbersGuide';
import '../styles/textbook-reader.css';
import '../styles/varnamala-studio.css';

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
  onOpenQuiz?: () => void;
  onOpenWorksheets?: (category?: string) => void;
  onOpenPuzzle?: () => void;
  onOpenVoiceSettings?: () => void;
  onOpenCbseGuide?: () => void;
}

const cleanWord = (value: string): string =>
  value.replace(/[\s।॥,;:!?()[\]{}<>'"“”‘’\-–—०-९./\\=+#*~_`]+/g, '').trim();

type SectionJump = { index: number; label: string; kind?: string };

const buildSectionJumps = (lesson: Lesson | undefined): SectionJump[] => {
  if (!lesson?.sentences?.length) return [];
  const jumps: SectionJump[] = [];
  const isPrayerAllowed = lesson.id === 'gsde101' || lesson.id === 'grade8_prarthana';

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
    return ((activeLessonId === 'gsde101' || activeLessonId === 'grade8_prarthana') && (jump.label.includes('प्रार्थना') || jump.label.toLowerCase().includes('prayer'))) ? 'प्रार्थना' : 'पाठः';
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
}) => {
  const { isAdminLoggedIn, currentUser } = useAuthStore();
  const canReadAllChapters = canAccessAllChapters(currentUser, isAdminLoggedIn);
  const isGrade8Lesson = activeLessonId.startsWith('grade8_');
  const activeLesson = lessons.find((lesson) => lesson.id === activeLessonId);
  const isVarnamala = activeLessonId === 'varnamala';
  const isNumbers = activeLessonId === 'numbers';
  const isGroupedLesson = isVarnamala || isNumbers || activeLessonId === 'barakhadi';
  const showRomanTiles = activeLessonId === 'barakhadi' || activeLessonId === 'varnamala';
  const tileLabel = (letter: string) =>
    activeLessonId === 'varnamala' ? varnamalaLabel(letter) : aksharaLabel(letter);
  const [isChartOpen, setIsChartOpen] = useState(false);
  const [isSoundVideoOpen, setIsSoundVideoOpen] = useState(true);
  const [isSymbolsOpen, setIsSymbolsOpen] = useState(false);
  const [isGunitaOpen, setIsGunitaOpen] = useState(false);
  const [isGrade8SyllabusOpen, setIsGrade8SyllabusOpen] = useState(false);
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [playingLetter, setPlayingLetter] = useState<string | null>(null);
  const [playingGroupIdx, setPlayingGroupIdx] = useState<number | null>(null);
  const [varnamalaSubMode, setVarnamalaSubMode] = useState<'sound' | 'writing' | 'worksheets'>('sound');
  const [numbersSubMode, setNumbersSubMode] = useState<'interactive' | 'tiles'>('interactive');
  const [padSelectedLetter, setPadSelectedLetter] = useState<string>('अ');
  const [glosses, setGlosses] = useState<AnalyseRegistry>({});
  const stopPlayAllRef = useRef<(() => void) | null>(null);

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

  const stopPlayAll = () => {
    stopPlayAllRef.current?.();
    stopPlayAllRef.current = null;
    stopPronunciation();
    setIsPlayingAll(false);
    setPlayingLetter(null);
    setPlayingGroupIdx(null);
  };

  useEffect(() => () => {
    stopPlayAllRef.current?.();
    stopPronunciation();
  }, []);

  useEffect(() => {
    // New page / lesson: stop any running Play-all.
    stopPlayAllRef.current?.();
    stopPlayAllRef.current = null;
    stopPronunciation();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsPlayingAll((prev) => (prev ? false : prev));
    setPlayingLetter(null);
    setPlayingGroupIdx(null);
  }, [activeLessonId, sentenceNumber]);

  // Leaving Sound & Pictures (writing / worksheets) cancels playback.
  useEffect(() => {
    if (!isVarnamala) return;
    if (varnamalaSubMode === 'sound') return;
    stopPlayAllRef.current?.();
    stopPlayAllRef.current = null;
    stopPronunciation();
    setIsPlayingAll(false);
    setPlayingLetter(null);
    setPlayingGroupIdx(null);
  }, [isVarnamala, varnamalaSubMode]);

  const collectPlayAllItems = (): string[] => {
    if (isGroupedLesson && activeLesson) {
      return activeLesson.sentences.flatMap((group) => group.words || []);
    }
    // Daṇḍa / double daṇḍa / verse numbers are punctuation — never queue them for speech.
    if (sentence.words?.length) return sentence.words.filter((word) => !isDandaOrVerseNumberToken(word));
    // Fallback: split visible Sanskrit from the paragraph.
    return (sentence.sanskrit || '')
      .split(/\s+/)
      .map((part) => part.replace(/[॥।,;:!?—–\-…/()]+/g, ''))
      .filter((part) => hasDevanagariLetter(part));
  };

  const handlePlayAll = () => {
    if (isPlayingAll) {
      stopPlayAll();
      return;
    }
    const items = collectPlayAllItems();
    if (!items.length) return;
    setIsPlayingAll(true);
    setPlayingGroupIdx(null);
    stopPlayAllRef.current = playSequence(items, {
      gapMs: 240,
      onItem: (word) => setPlayingLetter(word),
      onDone: () => {
        stopPlayAllRef.current = null;
        setIsPlayingAll(false);
        setPlayingLetter(null);
        setPlayingGroupIdx(null);
      },
    });
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
    stopPlayAllRef.current = playSequence(words, {
      gapMs: 240,
      onItem: (word) => setPlayingLetter(word),
      onDone: () => {
        stopPlayAllRef.current = null;
        setIsPlayingAll(false);
        setPlayingLetter(null);
        setPlayingGroupIdx(null);
      },
    });
  };

  /** Tile / chip click: stop any Play-all, then forward to parent (speaks syllable). */
  const handleLetterActivate = (letter: string) => {
    stopPlayAll();
    onWordClick(letter);
  };
  const sectionJumps = buildSectionJumps(activeLesson);
  const currentJumpIndex = (() => {
    if (!sectionJumps.length) return 0;
    let best = sectionJumps[0].index;
    for (const jump of sectionJumps) {
      if (jump.index <= sentenceNumber - 1) best = jump.index;
    }
    return best;
  })();

  // Guests / expired see Class 8 as upcoming; trial + paid may read.
  if (isGrade8Lesson && !canReadAllChapters) {
    return (
      <section className="textbook-reader">
        <div className="textbook-cbse-banner textbook-grade8-upcoming-banner">
          <span className="textbook-cbse-pill" style={{ background: '#92400e', color: '#ffffff' }}>
            UPCOMING · शीघ्रम्
          </span>
          <span className="textbook-cbse-title">
            Class 8 Sanskrit (CBSE) is coming soon. Please continue with Class 7 Deepakam for now.
          </span>
        </div>
        <div className="textbook-grade8-upcoming-note">
          <p>
            अष्टमकक्षा-पाठ्यांशः शीघ्रम् एव उपलभ्यते। Class 8 chapters, quizzes, and worksheets will open here when ready.
            Class 7 remains fully available from the dashboard.
          </p>
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
            <span
              className={`textbook-grade-badge ${
                isGrade8Lesson
                  ? 'textbook-grade-badge--grade8'
                  : isGroupedLesson
                  ? 'textbook-grade-badge--foundations'
                  : 'textbook-grade-badge--grade7'
              }`}
            >
              {isGrade8Lesson ? 'CBSE Class 8' : isGroupedLesson ? 'मूल-संस्कृतम्' : 'CBSE Class 7'}
            </span>
            <select
              id="lesson-select"
              className="textbook-lesson-select"
              value={activeLessonId}
              onChange={(event) => {
                if (event.target.value === '__cbse_guide__' && onOpenCbseGuide) {
                  onOpenCbseGuide();
                } else {
                  onSelectLesson(event.target.value);
                }
              }}
              aria-label="Select Sanskrit chapter or lesson"
            >
              {/* Class 7 Lessons */}
              <optgroup label="CBSE Class 7 · दीपकम (सप्तमी कक्षा)">
                {lessons
                  .filter(
                    (lesson) =>
                      !lesson.id.startsWith('grade8_') &&
                      lesson.id !== 'samyukta' &&
                      lesson.id !== 'varnamala' &&
                      lesson.id !== 'numbers' &&
                      lesson.id !== 'barakhadi'
                  )
                  .map((lesson) => (
                    <option key={lesson.id} value={lesson.id}>
                      {lesson.title}
                    </option>
                  ))}
                {onOpenCbseGuide && (
                  <option value="__cbse_guide__">
                    📋 CBSE Class 7 Exam Guide &amp; Question Directives
                  </option>
                )}
              </optgroup>

              {/* Class 8 Lessons */}
              {lessons.some((lesson) => lesson.id.startsWith('grade8_')) && (
                <optgroup label="CBSE Class 8 · दीपकम (अष्टमी कक्षा)">
                  {lessons
                    .filter((lesson) => lesson.id.startsWith('grade8_'))
                    .map((lesson) => (
                      <option key={lesson.id} value={lesson.id}>
                        {lesson.title}
                      </option>
                    ))}
                  {onOpenCbseGuide && (
                    <option value="__cbse_guide__">
                      📋 CBSE Class 8 Exam Guide &amp; Question Directives
                    </option>
                  )}
                </optgroup>
              )}

              {/* Foundations (Alphabet & Numbers) */}
              {lessons.some(
                (lesson) =>
                  lesson.id === 'varnamala' ||
                  lesson.id === 'numbers' ||
                  lesson.id === 'barakhadi'
              ) && (
                <optgroup label="Foundations (मूल-संस्कृतम्)">
                  {lessons
                    .filter(
                      (lesson) =>
                        lesson.id === 'varnamala' ||
                        lesson.id === 'numbers' ||
                        lesson.id === 'barakhadi'
                    )
                    .map((lesson) => (
                      <option key={lesson.id} value={lesson.id}>
                        {lesson.title}
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
                title="Open CBSE Sanskrit Exam Blueprint & Question Paper Guide"
              >
                📋 CBSE Guide
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
            {onOpenQuiz && (
              <button
                type="button"
                className="textbook-action-chip textbook-action-chip--quiz"
                onClick={onOpenQuiz}
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

        {/* Quick Section Jump Chips */}
        {!isGroupedLesson && sectionJumps.length > 1 && (
          <div className="textbook-jump-row">
            <span className="textbook-jump-label">Jump:</span>
            <select
              id="section-jump"
              className="textbook-jump-select"
              value={String(currentJumpIndex)}
              onChange={(event) => onJumpToSentence(Number(event.target.value))}
              aria-label="Jump to lesson section"
            >
              {sectionJumps.map((jump) => (
                <option key={`${jump.index}-${jump.label}`} value={String(jump.index)}>
                  {jump.label}
                </option>
              ))}
            </select>
            <div className="textbook-jump-chips" aria-label="Quick sections">
              {sectionJumps.map((jump) => (
                <button
                  key={`chip-${jump.index}`}
                  type="button"
                  className={`textbook-jump-chip${currentJumpIndex === jump.index ? ' active' : ''}`}
                  onClick={() => onJumpToSentence(jump.index)}
                >
                  {getJumpChipLabel(jump, activeLessonId)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Compact Controls Strip: Audio Play + Paragraph Nav */}
        {!isGroupedLesson ? (
          <div className="textbook-controls-strip">
            <div className="textbook-controls-left">
              <button
                type="button"
                className={`textbook-playall-strip-btn${isPlayingAll ? ' active' : ''}`}
                onClick={handlePlayAll}
                aria-pressed={isPlayingAll}
                title="Hear every word spoken aloud in sequence"
              >
                {isPlayingAll ? '⏹ Stop' : '▶ Play all'}
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
                onClick={onPrevious}
                disabled={isFirstSentence}
                title="Previous paragraph / sentence (◀)"
              >
                ◀ Prev
              </button>
              <button
                type="button"
                className="textbook-strip-nav-btn"
                onClick={onNext}
                disabled={isLastSentence}
                title="Next paragraph / sentence (▶)"
              >
                Next ▶
              </button>
            </div>
          </div>
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
                className={`varnamala-mode-btn${varnamalaSubMode === 'sound' ? ' varnamala-mode-btn--active' : ''}`}
                onClick={() => setVarnamalaSubMode('sound')}
              >
                <span className="varnamala-mode-icon">🔊</span>
                <span>ध्वनि-फलकम् (Sound &amp; Pictures)</span>
              </button>
              <button
                type="button"
                className={`varnamala-mode-btn${varnamalaSubMode === 'writing' ? ' varnamala-mode-btn--active' : ''}`}
                onClick={() => setVarnamalaSubMode('writing')}
              >
                <span className="varnamala-mode-icon">✍️</span>
                <span>अक्षर-लेखनम् (Writing &amp; Tracing Studio)</span>
              </button>
              <button
                type="button"
                className={`varnamala-mode-btn${varnamalaSubMode === 'worksheets' ? ' varnamala-mode-btn--active' : ''}`}
                onClick={() => setVarnamalaSubMode('worksheets')}
              >
                <span className="varnamala-mode-icon">📑</span>
                <span>अभ्यास-पत्रिकाः (Printable Worksheets)</span>
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

          {isVarnamala && varnamalaSubMode === 'writing' && (
            <ErrorBoundary
              fallbackTitle="✍️ Writing Studio Ready"
              fallbackSubtitle="An unexpected issue occurred while rendering the handwriting slate. Tap below to reload the studio."
            >
              <VarnamalaWritingPad
                initialLetter={padSelectedLetter}
                onSelectLetter={(char) => {
                  setPadSelectedLetter(char);
                  onWordClick(char);
                }}
                onOpenWorksheets={onOpenWorksheets}
                onOpenPuzzle={onOpenPuzzle}
              />
            </ErrorBoundary>
          )}

          {isVarnamala && varnamalaSubMode === 'worksheets' && (
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

          {(!isVarnamala || varnamalaSubMode === 'sound') && (!isNumbers || numbersSubMode === 'tiles') && (
            <>
              {(isVarnamala || activeLessonId === 'barakhadi') && (
                <div className="varnamala-chart-toggle-wrap">
                  <button
                    type="button"
                    className="varnamala-chart-toggle"
                    onClick={() => setIsChartOpen((open) => !open)}
                    aria-expanded={isChartOpen}
                    aria-controls={`${activeLessonId}-chart-panel`}
                  >
                    {activeLessonId === 'barakhadi'
                      ? '🗺️ View बारहखड़ी Complete Chart'
                      : '🗺️ View Alphabet Pronunciation Reference Chart'}
                    <span className="varnamala-chart-toggle-arrow">{isChartOpen ? '▲' : '▼'}</span>
                  </button>
                  <div
                    id={`${activeLessonId}-chart-panel`}
                    className={`varnamala-chart-panel${isChartOpen ? ' varnamala-chart-panel--open' : ''}`}
                  >
                    <img
                      src={activeLessonId === 'barakhadi' ? './barakhadi-chart.png' : './image1.jpg'}
                      alt={activeLessonId === 'barakhadi' ? 'Complete बारहखड़ी Sanskrit matra chart for beginners' : 'Sanskrit pronunciation chart with Devanagari letters for learners'}
                      className="varnamala-chart-image"
                      loading="lazy"
                    />
                  </div>
                </div>
              )}

              {activeLessonId === 'barakhadi' && (
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
              )}

              {isVarnamala && (
                <div className="varnamala-chart-toggle-wrap" style={{ marginTop: '0.65rem' }}>
              <button
                type="button"
                className="varnamala-chart-toggle"
                onClick={() => setIsSoundVideoOpen((open) => !open)}
                aria-expanded={isSoundVideoOpen}
                style={{
                  background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)',
                  borderColor: '#c4b5fd',
                  color: '#5b21b6',
                  fontWeight: 700,
                }}
              >
                <span>🎥 Watch Video Masterclass: Sanskrit: The Science of Sound (ध्वनि-विज्ञानम्)</span>
                <span className="varnamala-chart-toggle-arrow">{isSoundVideoOpen ? '▲' : '▼'}</span>
              </button>
              {isSoundVideoOpen && (
                <div
                  style={{
                    marginTop: '0.75rem',
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
                      padding: '0.9rem 1.25rem',
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
                        Explore the neurological, vocal tract, and acoustic science behind Sanskrit phonetics.
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
            </div>
          )}
          {activeLesson.sentences.map((group, groupIdx) => (
            <div
              key={group.category || groupIdx}
              className={`varnamala-row varnamala-row--${groupIdx % 10}`}
            >
              <div className="varnamala-row-header">
                <span className="varnamala-row-label">{group.meaning || group.category}</span>
                <button
                  type="button"
                  className={`textbook-playrow-btn${isPlayingAll && playingGroupIdx === groupIdx ? ' textbook-playrow-btn--active' : ''}`}
                  onClick={() => handlePlayGroup(group.words || [], groupIdx)}
                  aria-label={
                    isPlayingAll && playingGroupIdx === groupIdx
                      ? `Stop playing ${group.meaning || group.category || 'this row'}`
                      : `Play all letters in ${group.meaning || group.category || 'this row'}`
                  }
                  aria-pressed={isPlayingAll && playingGroupIdx === groupIdx}
                  title={isPlayingAll && playingGroupIdx === groupIdx ? 'Stop this row' : 'Play this row'}
                >
                  {isPlayingAll && playingGroupIdx === groupIdx ? '⏹' : '▶'}
                </button>
              </div>
              <div className="varnamala-row-letters">
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
              <p className="varnamala-row-description">{group.sanskrit}</p>
            </div>
          ))}
            </>
          )}
        </div>
      ) : (
        <div className="textbook-sentence-block">
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
                              onClick={() => onWordClick(clean)}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(event) => {
                                if (event.key === 'Enter' || event.key === ' ') onWordClick(clean);
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
                <p className="textbook-glossary-subtitle">{sentence.sanskrit}</p>
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
                        onClick={() => onWordClick(word)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') onWordClick(word);
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
                      onClick={() => onWordClick(sentence.sanskrit)}
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
                {sentence.words.map((word, idx) => {
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
                  const cleaned = cleanWord(word);
                  const isSelected = Boolean(cleanActiveWord && cleaned === cleanActiveWord);
                  return (
                    <span
                      key={`${activeLessonId}-${sentenceNumber}-${idx}`}
                      className={`interactive-word${isSelected ? ' interactive-word--active' : ''}`}
                      onClick={() => onWordClick(word)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          onWordClick(word);
                        }
                      }}
                    >
                      {word}
                    </span>
                  );
                })}
              </p>

              {/* English Meaning Box — Prominently right below the Sanskrit text for immediate visibility */}
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
                        onClick={() => playPronunciation(cleanActiveWord)}
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
            </>
          )}
        </div>
      )}

      {/* End of Grade Lessons Completion & Exam Guide Banner */}
      {!isGroupedLesson && isLastSentence && onOpenCbseGuide && (
        <div className="textbook-grade-completion-guide" role="region" aria-label="CBSE Sanskrit Exam Blueprint & Guide">
          <div className="grade-guide-header">
            <span className="grade-guide-badge">
              {activeLessonId.startsWith('grade8_') ? 'CBSE Class 8 Sanskrit' : 'CBSE Class 7 Deepakam'}
            </span>
            <h4>📋 CBSE Sanskrit Exam Blueprint &amp; Question Directives</h4>
          </div>
          <p>
            {activeLessonId === 'gsde115'
              ? 'Congratulations on completing all 15 lessons of CBSE Class 7 Deepakam! Prepare for your school and board exams with standardized instruction formulas (निर्देशाः), 10 core question words (क-कार शब्दाः), and grammatical directives.'
              : activeLessonId === 'grade8_app1' || activeLessonId === 'grade8_ch13'
              ? 'Class 8 lessons completed! Master CBSE High School paper structure, अन्वय-पूरणम्, प्रश्ननिर्माणम्, and precision sentence corrections.'
              : 'Prepare for school exams: master question instruction keywords (एकपदेन, पूर्णवाक्येन, अन्वयः) and grammatical directives (कर्तृपदम्, क्रियापदम्) for this grade.'}
          </p>
          <button type="button" className="grade-guide-action-btn" onClick={onOpenCbseGuide}>
            📋 Open CBSE Sanskrit Exam Guide (Classes 7–10) ➔
          </button>
        </div>
      )}

      {!isGroupedLesson && (
        <div className="textbook-nav-buttons">
          <button
            type="button"
            className="textbook-nav-btn"
            onClick={onPrevious}
            disabled={isFirstSentence}
          >
            ◀ Previous
          </button>
          {isLastSentence && onOpenCbseGuide && (activeLessonId === 'gsde115' || activeLessonId === 'grade8_app1' || activeLessonId === 'grade8_ch13') ? (
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
              onClick={onNext}
              disabled={isLastSentence}
            >
              Next ▶
            </button>
          )}
        </div>
      )}

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
        isOpen={isGrade8SyllabusOpen}
        onClose={() => setIsGrade8SyllabusOpen(false)}
        onSelectLesson={(id) => onSelectLesson(id)}
        onOpenCbseGuide={onOpenCbseGuide}
      />
    </section>
  );
};

export default TextbookReader;