import React, { useEffect, useRef, useState } from 'react';
import type { Lesson, LessonSentence } from '../types/chapters';
import { aksharaLabel, varnamalaLabel } from '../utils/barakhadiPhonetics';
import { playPronunciation, playSequence, stopPronunciation } from '../utils/pronunciation';
import {
  loadAnalyseGlosses,
  lookupAnalyseGloss,
  englishMeaningFromGloss,
  type AnalyseRegistry,
} from '../utils/analyseGloss';
import { useAuthStore } from '../store/authStore';
import { Grade8SyllabusModal } from './Grade8SyllabusModal';
import '../styles/textbook-reader.css';

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
  onOpenWorksheets?: () => void;
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
}) => {
  const { isAdminLoggedIn } = useAuthStore();
  const isGrade8Lesson = activeLessonId.startsWith('grade8_');
  const activeLesson = lessons.find((lesson) => lesson.id === activeLessonId);
  const isVarnamala = activeLessonId === 'varnamala';
  const isGroupedLesson = isVarnamala || activeLessonId === 'numbers' || activeLessonId === 'barakhadi';
  const showRomanTiles = activeLessonId === 'barakhadi' || activeLessonId === 'varnamala';
  const tileLabel = (letter: string) =>
    activeLessonId === 'varnamala' ? varnamalaLabel(letter) : aksharaLabel(letter);
  const [isChartOpen, setIsChartOpen] = useState(false);
  const [isSoundVideoOpen, setIsSoundVideoOpen] = useState(true);
  const [isSymbolsOpen, setIsSymbolsOpen] = useState(false);
  const [isGrade8SyllabusOpen, setIsGrade8SyllabusOpen] = useState(false);
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [glosses, setGlosses] = useState<AnalyseRegistry>({});
  const stopPlayAllRef = useRef<(() => void) | null>(null);

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
  }, [activeLessonId, sentenceNumber]);

  const collectPlayAllItems = (): string[] => {
    if (isGroupedLesson && activeLesson) {
      return activeLesson.sentences.flatMap((group) => group.words || []);
    }
    if (sentence.words?.length) return [...sentence.words];
    // Fallback: split visible Sanskrit from the paragraph.
    return (sentence.sanskrit || '')
      .split(/\s+/)
      .map((part) => part.replace(/[॥।,;:!?—–\-…/()]+/g, ''))
      .filter((part) => /[\u0900-\u097F]/.test(part));
  };

  const handlePlayAll = () => {
    if (isPlayingAll) {
      stopPlayAll();
      return;
    }
    const items = collectPlayAllItems();
    if (!items.length) return;
    setIsPlayingAll(true);
    stopPlayAllRef.current = playSequence(items, {
      gapMs: 240,
      onDone: () => {
        stopPlayAllRef.current = null;
        setIsPlayingAll(false);
      },
    });
  };

  const handlePlayGroup = (words: string[]) => {
    stopPlayAll();
    if (!words.length) return;
    setIsPlayingAll(true);
    stopPlayAllRef.current = playSequence(words, {
      gapMs: 240,
      onDone: () => {
        stopPlayAllRef.current = null;
        setIsPlayingAll(false);
      },
    });
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

  // Public visitors should not see Class 8 content (admin preview only).
  if (isGrade8Lesson && !isAdminLoggedIn) {
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
      {activeLessonId.startsWith('gsde') && (
        <div className="textbook-cbse-banner">
          <span className="textbook-cbse-pill">CBSE Board Exam Aligned</span>
          <span className="textbook-cbse-title">
            NCERT Class 7 Sanskrit · दीपकम (Deepakam)
            {activeLesson?.page_numbers ? ` · पाठः पृष्ठानि (Pages ${activeLesson.page_numbers})` : ''}
          </span>
        </div>
      )}
      {activeLessonId === 'grade8_prarthana' && (
        <div className="textbook-cbse-banner" style={{ background: 'linear-gradient(90deg, #f0fdf4 0%, #eff6ff 100%)', borderColor: '#86efac' }}>
          <span className="textbook-cbse-pill" style={{ background: '#059669', color: '#ffffff' }}>CBSE Class 8 Sanskrit</span>
          <span className="textbook-cbse-title">NCERT Class 8 Sanskrit · प्रार्थना — सरस्वतीप्रार्थना (मङ्गलाचरणम्)</span>
        </div>
      )}
      {activeLessonId === 'grade8_ch1' && (
        <div className="textbook-cbse-banner" style={{ background: 'linear-gradient(90deg, #f0fdf4 0%, #eff6ff 100%)', borderColor: '#86efac' }}>
          <span className="textbook-cbse-pill" style={{ background: '#059669', color: '#ffffff' }}>CBSE Class 8 Sanskrit</span>
          <span className="textbook-cbse-title">NCERT Class 8 Sanskrit · प्रथमः पाठः — संगच्छध्वं संवदध्वम् (Pages 1–9)</span>
        </div>
      )}
      {activeLessonId === 'grade8_ch2' && (
        <div className="textbook-cbse-banner" style={{ background: 'linear-gradient(90deg, #f0fdf4 0%, #eff6ff 100%)', borderColor: '#86efac' }}>
          <span className="textbook-cbse-pill" style={{ background: '#059669', color: '#ffffff' }}>CBSE Class 8 Sanskrit</span>
          <span className="textbook-cbse-title">NCERT Class 8 Sanskrit · द्वितीयः पाठः — अल्पानामपि वस्तूनां संहतिः कार्यसाधिका (Pages 10–22)</span>
        </div>
      )}
      {activeLessonId === 'grade8_ch3' && (
        <div className="textbook-cbse-banner" style={{ background: 'linear-gradient(90deg, #fefce8 0%, #eff6ff 100%)', borderColor: '#fde047' }}>
          <span className="textbook-cbse-pill" style={{ background: '#d97706', color: '#ffffff' }}>CBSE Class 8 Sanskrit</span>
          <span className="textbook-cbse-title">NCERT Class 8 Sanskrit · तृतीयः पाठः — सुभाषितरसं पीत्वा जीवनं सफलं कुरु (Pages 24–35)</span>
        </div>
      )}
      {activeLessonId === 'grade8_ch4' && (
        <div className="textbook-cbse-banner" style={{ background: 'linear-gradient(90deg, #fff7ed 0%, #eff6ff 100%)', borderColor: '#fdba74' }}>
          <span className="textbook-cbse-pill" style={{ background: '#ea580c', color: '#ffffff' }}>CBSE Class 8 Sanskrit</span>
          <span className="textbook-cbse-title">NCERT Class 8 Sanskrit · चतुर्थः पाठः — प्रणम्यो देशभक्तोऽयं गोपबन्धुर्महामनाः (Pages 36–44)</span>
        </div>
      )}
      {activeLessonId === 'grade8_ch5' && (
        <div className="textbook-cbse-banner" style={{ background: 'linear-gradient(90deg, #faf5ff 0%, #eff6ff 100%)', borderColor: '#d8b4fe' }}>
          <span className="textbook-cbse-pill" style={{ background: '#9333ea', color: '#ffffff' }}>CBSE Class 8 Sanskrit</span>
          <span className="textbook-cbse-title">NCERT Class 8 Sanskrit · पञ्चमः पाठः — गीता सुगीता कर्तव्या (Pages 49–58)</span>
        </div>
      )}
      {activeLessonId === 'grade8_ch6' && (
        <div className="textbook-cbse-banner" style={{ background: 'linear-gradient(90deg, #f0fdf4 0%, #eff6ff 100%)', borderColor: '#86efac' }}>
          <span className="textbook-cbse-pill" style={{ background: '#16a34a', color: '#ffffff' }}>CBSE Class 8 Sanskrit</span>
          <span className="textbook-cbse-title">NCERT Class 8 Sanskrit · षष्ठः पाठः — डिजिभारतम्-युगपरिवर्तनम् (Pages 61–66)</span>
        </div>
      )}
      {activeLessonId === 'grade8_ch7' && (
        <div className="textbook-cbse-banner" style={{ background: 'linear-gradient(90deg, #eff6ff 0%, #faf5ff 100%)', borderColor: '#bfdbfe' }}>
          <span className="textbook-cbse-pill" style={{ background: '#2563eb', color: '#ffffff' }}>CBSE Class 8 Sanskrit</span>
          <span className="textbook-cbse-title">NCERT Class 8 Sanskrit · सप्तमः पाठः — मञ्जुलमञ्जूषा सुन्दरसुरभाषा (Pages 75–83)</span>
        </div>
      )}
      {activeLessonId === 'grade8_ch8' && (
        <div className="textbook-cbse-banner" style={{ background: 'linear-gradient(90deg, #ecfdf5 0%, #f0fdf4 100%)', borderColor: '#a7f3d0' }}>
          <span className="textbook-cbse-pill" style={{ background: '#059669', color: '#ffffff' }}>CBSE Class 8 Sanskrit</span>
          <span className="textbook-cbse-title">NCERT Class 8 Sanskrit · अष्टमः पाठः — पश्यत कोणमैशान्यं भारतस्य मनोहरम् (Pages 85–88)</span>
        </div>
      )}
      {activeLessonId === 'grade8_ch9' && (
        <div className="textbook-cbse-banner" style={{ background: 'linear-gradient(90deg, #fefce8 0%, #f0fdf4 100%)', borderColor: '#fde047' }}>
          <span className="textbook-cbse-pill" style={{ background: '#ca8a04', color: '#ffffff' }}>CBSE Class 8 Sanskrit</span>
          <span className="textbook-cbse-title">NCERT Class 8 Sanskrit · नवमः पाठः — कोऽरुक्? कोऽरुक्? कोऽरुक्? (Pages 97–105)</span>
        </div>
      )}
      {activeLessonId === 'grade8_ch10' && (
        <div className="textbook-cbse-banner" style={{ background: 'linear-gradient(90deg, #fdf2f8 0%, #eff6ff 100%)', borderColor: '#fbcfe8' }}>
          <span className="textbook-cbse-pill" style={{ background: '#db2777', color: '#ffffff' }}>CBSE Class 8 Sanskrit</span>
          <span className="textbook-cbse-title">NCERT Class 8 Sanskrit · दशमः पाठः — सन्निमित्ते वरं त्यागः (क-भागः) (Pages 111–122)</span>
        </div>
      )}
      {activeLessonId === 'grade8_ch11' && (
        <div className="textbook-cbse-banner" style={{ background: 'linear-gradient(90deg, #fdf4ff 0%, #eff6ff 100%)', borderColor: '#f0abfc' }}>
          <span className="textbook-cbse-pill" style={{ background: '#c026d3', color: '#ffffff' }}>CBSE Class 8 Sanskrit</span>
          <span className="textbook-cbse-title">NCERT Class 8 Sanskrit · एकादशः पाठः — सन्निमित्ते वरं त्यागः (ख-भागः) (Pages 124–135)</span>
        </div>
      )}
      {activeLessonId === 'grade8_ch12' && (
        <div className="textbook-cbse-banner" style={{ background: 'linear-gradient(90deg, #f0fdf4 0%, #eff6ff 100%)', borderColor: '#86efac' }}>
          <span className="textbook-cbse-pill" style={{ background: '#15803d', color: '#ffffff' }}>CBSE Class 8 Sanskrit</span>
          <span className="textbook-cbse-title">NCERT Class 8 Sanskrit · द्वादशः पाठः — सम्यग्वर्णप्रयोगेण ब्रह्मलोके महीयते (Pages 137–145)</span>
        </div>
      )}
      {activeLessonId === 'grade8_ch13' && (
        <div className="textbook-cbse-banner" style={{ background: 'linear-gradient(90deg, #ecfeff 0%, #f0fdfa 100%)', borderColor: '#67e8f9' }}>
          <span className="textbook-cbse-pill" style={{ background: '#0891b2', color: '#ffffff' }}>CBSE Class 8 Sanskrit</span>
          <span className="textbook-cbse-title">NCERT Class 8 Sanskrit · त्रयोदशः पाठः — वर्णोच्चारण-शिक्षा १ (Pages 146–156)</span>
        </div>
      )}
      {activeLessonId === 'grade8_app1' && (
        <div className="textbook-cbse-banner" style={{ background: 'linear-gradient(90deg, #fef3c7 0%, #ede9fe 100%)', borderColor: '#f59e0b' }}>
          <span className="textbook-cbse-pill" style={{ background: '#b45309', color: '#ffffff' }}>CBSE Class 8 Sanskrit</span>
          <span className="textbook-cbse-title">NCERT Class 8 Sanskrit · परिशिष्टम् १ — व्याकरणम् (Pages 159–165)</span>
        </div>
      )}

      <div className="textbook-toolbar-row">
        <button
          type="button"
          className="textbook-tool-btn textbook-tool-btn--symbols"
          onClick={() => setIsSymbolsOpen(true)}
          title="Sanskrit Punctuation & Orthographic Symbols Reference Guide"
        >
          📜 चिह्न-परिचयः (Symbols Guide)
        </button>
        {activeLessonId === 'grade8_prarthana' && (
          <>
            <button
              type="button"
              className="textbook-tool-btn textbook-tool-btn--syllabus"
              onClick={() => setIsGrade8SyllabusOpen(true)}
              title="Grade 8 Complete Syllabus & Table of Contents (पाठानुक्रमणिका)"
            >
              📜 पाठानुक्रमणिका (Class 8 Syllabus)
            </button>
            {onOpenQuiz && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--quiz"
                onClick={onOpenQuiz}
                title="Go to Grade 8 Saraswati Prarthana Quizzes"
              >
                🎯 2 Quizzes (10 Qs)
              </button>
            )}

          </>
        )}
        {activeLessonId === 'grade8_ch1' && (
          <>
            <button
              type="button"
              className="textbook-tool-btn textbook-tool-btn--syllabus"
              onClick={() => setIsGrade8SyllabusOpen(true)}
              title="Grade 8 Complete Syllabus & Table of Contents (पाठानुक्रमणिका)"
            >
              📜 पाठानुक्रमणिका (Class 8 Syllabus)
            </button>
            {onOpenQuiz && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--quiz"
                onClick={onOpenQuiz}
                title="Go to Grade 8 Chapter 1 Quizzes (2 Quizzes · 8 questions)"
              >
                🎯 2 Quizzes (8 Qs)
              </button>
            )}
            {onOpenWorksheets && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--ws"
                onClick={onOpenWorksheets}
                title="Go to Grade 8 Chapter 1 Worksheets (5 Sheets · संगच्छध्वं)"
              >
                📑 5 Worksheets (Vedic · Loṭ · आम्/न)
              </button>
            )}
          </>
        )}
        {activeLessonId === 'grade8_ch2' && (
          <>
            <button
              type="button"
              className="textbook-tool-btn textbook-tool-btn--syllabus"
              onClick={() => setIsGrade8SyllabusOpen(true)}
              title="Grade 8 Complete Syllabus & Table of Contents (पाठानुक्रमणिका)"
            >
              📜 पाठानुक्रमणिका (Class 8 Syllabus)
            </button>
            {onOpenQuiz && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--quiz"
                onClick={onOpenQuiz}
                title="Go to Grade 8 Chapter 2 Quizzes"
              >
                🎯 3 Quizzes (15 Qs)
              </button>
            )}
            {onOpenWorksheets && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--ws"
                onClick={onOpenWorksheets}
                title="Go to Grade 8 Chapter 2 Printable Worksheet"
              >
                📑 Grade 8 Chapter 2 Worksheet
              </button>
            )}
          </>
        )}
        {activeLessonId === 'grade8_ch3' && (
          <>
            <button
              type="button"
              className="textbook-tool-btn textbook-tool-btn--syllabus"
              onClick={() => setIsGrade8SyllabusOpen(true)}
              title="Grade 8 Complete Syllabus & Table of Contents (पाठानुक्रमणिका)"
            >
              📜 पाठानुक्रमणिका (Class 8 Syllabus)
            </button>
            {onOpenQuiz && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--quiz"
                onClick={onOpenQuiz}
                title="Go to Grade 8 Chapter 3 Quizzes"
              >
                🎯 4 Quizzes (21 Qs)
              </button>
            )}
            {onOpenWorksheets && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--ws"
                onClick={onOpenWorksheets}
                title="Go to Grade 8 Printable Worksheets"
              >
                📑 Grade 8 Worksheets
              </button>
            )}
          </>
        )}
        {activeLessonId === 'grade8_ch4' && (
          <>
            <button
              type="button"
              className="textbook-tool-btn textbook-tool-btn--syllabus"
              onClick={() => setIsGrade8SyllabusOpen(true)}
              title="Grade 8 Complete Syllabus & Table of Contents (पाठानुक्रमणिका)"
            >
              📜 पाठानुक्रमणिका (Class 8 Syllabus)
            </button>
            {onOpenQuiz && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--quiz"
                onClick={onOpenQuiz}
                title="Go to Grade 8 Chapter 4 Quizzes"
              >
                🎯 4 Quizzes (20 Qs)
              </button>
            )}
            {onOpenWorksheets && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--ws"
                onClick={onOpenWorksheets}
                title="Go to Grade 8 Chapter 4 Printable Worksheets"
              >
                📑 5 Worksheets (Humanitarian Service & Biography)
              </button>
            )}
          </>
        )}
        {activeLessonId === 'grade8_ch5' && (
          <>
            <button
              type="button"
              className="textbook-tool-btn textbook-tool-btn--syllabus"
              onClick={() => setIsGrade8SyllabusOpen(true)}
              title="Grade 8 Complete Syllabus & Table of Contents (पाठानुक्रमणिका)"
            >
              📜 पाठानुक्रमणिका (Class 8 Syllabus)
            </button>
            {onOpenQuiz && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--quiz"
                onClick={onOpenQuiz}
                title="Go to Grade 8 Chapter 5 Quizzes"
              >
                🎯 2 Quizzes (10 Qs)
              </button>
            )}
            {onOpenWorksheets && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--ws"
                onClick={onOpenWorksheets}
                title="Go to Grade 8 Chapter 5 Printable Worksheets"
              >
                📑 5 Worksheets (Bhagavad Gita Wisdom)
              </button>
            )}
          </>
        )}
        {activeLessonId === 'grade8_ch6' && (
          <>
            <button
              type="button"
              className="textbook-tool-btn textbook-tool-btn--syllabus"
              onClick={() => setIsGrade8SyllabusOpen(true)}
              title="Grade 8 Complete Syllabus & Table of Contents (पाठानुक्रमणिका)"
            >
              📜 पाठानुक्रमणिका (Class 8 Syllabus)
            </button>
            {onOpenQuiz && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--quiz"
                onClick={onOpenQuiz}
                title="Go to Grade 8 Chapter 6 Quizzes"
              >
                🎯 2 Quizzes (10 Qs)
              </button>
            )}
            {onOpenWorksheets && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--ws"
                onClick={onOpenWorksheets}
                title="Go to Grade 8 Chapter 6 Printable Worksheets"
              >
                📑 2 Worksheets (Digital India & Passive Voice)
              </button>
            )}
          </>
        )}
        {activeLessonId === 'grade8_ch7' && (
          <>
            <button
              type="button"
              className="textbook-tool-btn textbook-tool-btn--syllabus"
              onClick={() => setIsGrade8SyllabusOpen(true)}
              title="Grade 8 Complete Syllabus & Table of Contents (पाठानुक्रमणिका)"
            >
              📜 पाठानुक्रमणिका (Class 8 Syllabus)
            </button>
            {onOpenQuiz && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--quiz"
                onClick={onOpenQuiz}
                title="Go to Grade 8 Chapter 7 Quizzes"
              >
                🎯 2 Quizzes (8 Qs)
              </button>
            )}
            {onOpenWorksheets && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--ws"
                onClick={onOpenWorksheets}
                title="Go to Grade 8 Chapter 7 Printable Worksheets"
              >
                📑 5 Worksheets (Sanskrit Glory & Verses)
              </button>
            )}
          </>
        )}
        {activeLessonId === 'grade8_ch8' && (
          <>
            <button
              type="button"
              className="textbook-tool-btn textbook-tool-btn--syllabus"
              onClick={() => setIsGrade8SyllabusOpen(true)}
              title="Grade 8 Complete Syllabus & Table of Contents (पाठानुक्रमणिका)"
            >
              📜 पाठानुक्रमणिका (Class 8 Syllabus)
            </button>
            {onOpenQuiz && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--quiz"
                onClick={onOpenQuiz}
                title="Go to Grade 8 Chapter 8 Quizzes"
              >
                🎯 2 Quizzes (8 Qs)
              </button>
            )}
            {onOpenWorksheets && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--ws"
                onClick={onOpenWorksheets}
                title="Go to Grade 8 Chapter 8 Printable Worksheets"
              >
                📑 5 Worksheets (Seven Sisters & Geography)
              </button>
            )}
          </>
        )}
        {activeLessonId === 'grade8_ch9' && (
          <>
            <button
              type="button"
              className="textbook-tool-btn textbook-tool-btn--syllabus"
              onClick={() => setIsGrade8SyllabusOpen(true)}
              title="Grade 8 Complete Syllabus & Table of Contents (पाठानुक्रमणिका)"
            >
              📜 पाठानुक्रमणिका (Class 8 Syllabus)
            </button>
            {onOpenQuiz && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--quiz"
                onClick={onOpenQuiz}
                title="Go to Grade 8 Chapter 9 Quizzes"
              >
                🎯 2 Quizzes (8 Qs)
              </button>
            )}
            {onOpenWorksheets && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--ws"
                onClick={onOpenWorksheets}
                title="Go to Grade 8 Chapter 9 Printable Worksheets"
              >
                📑 5 Worksheets (Ayurveda & Health Rules)
              </button>
            )}
          </>
        )}
        {activeLessonId === 'grade8_ch10' && (
          <>
            <button
              type="button"
              className="textbook-tool-btn textbook-tool-btn--syllabus"
              onClick={() => setIsGrade8SyllabusOpen(true)}
              title="Grade 8 Complete Syllabus & Table of Contents (पाठानुक्रमणिका)"
            >
              📜 पाठानुक्रमणिका (Class 8 Syllabus)
            </button>
            {onOpenQuiz && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--quiz"
                onClick={onOpenQuiz}
                title="Go to Grade 8 Chapter 10 Quizzes"
              >
                🎯 2 Quizzes (8 Qs)
              </button>
            )}
            {onOpenWorksheets && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--ws"
                onClick={onOpenWorksheets}
                title="Go to Grade 8 Chapter 10 Printable Worksheets"
              >
                📑 5 Worksheets (Viravara Story & Past Tense)
              </button>
            )}
          </>
        )}
        {activeLessonId === 'grade8_ch11' && (
          <>
            <button
              type="button"
              className="textbook-tool-btn textbook-tool-btn--syllabus"
              onClick={() => setIsGrade8SyllabusOpen(true)}
              title="Grade 8 Complete Syllabus & Table of Contents (पाठानुक्रमणिका)"
            >
              📜 पाठानुक्रमणिका (Class 8 Syllabus)
            </button>
            {onOpenQuiz && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--quiz"
                onClick={onOpenQuiz}
                title="Go to Grade 8 Chapter 11 Quizzes"
              >
                🎯 2 Quizzes (8 Qs)
              </button>
            )}
            {onOpenWorksheets && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--ws"
                onClick={onOpenWorksheets}
                title="Go to Grade 8 Chapter 11 Printable Worksheets"
              >
                📑 5 Worksheets (Voice Conversion & Hitopadesha)
              </button>
            )}
          </>
        )}
        {activeLessonId === 'grade8_ch12' && (
          <>
            <button
              type="button"
              className="textbook-tool-btn textbook-tool-btn--syllabus"
              onClick={() => setIsGrade8SyllabusOpen(true)}
              title="Grade 8 Complete Syllabus & Table of Contents (पाठानुक्रमणिका)"
            >
              📜 पाठानुक्रमणिका (Class 8 Syllabus)
            </button>
            {onOpenQuiz && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--quiz"
                onClick={onOpenQuiz}
                title="Go to Grade 8 Chapter 12 Quizzes"
              >
                🎯 2 Quizzes (8 Qs)
              </button>
            )}
            {onOpenWorksheets && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--ws"
                onClick={onOpenWorksheets}
                title="Go to Grade 8 Chapter 12 Printable Worksheets"
              >
                📑 5 Worksheets (Pronunciation & Shiksha)
              </button>
            )}
          </>
        )}
        {activeLessonId === 'grade8_ch13' && (
          <>
            <button
              type="button"
              className="textbook-tool-btn textbook-tool-btn--syllabus"
              onClick={() => setIsGrade8SyllabusOpen(true)}
              title="Grade 8 Complete Syllabus & Table of Contents (पाठानुक्रमणिका)"
            >
              📜 पाठानुक्रमणिका (Class 8 Syllabus)
            </button>
            {onOpenQuiz && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--quiz"
                onClick={onOpenQuiz}
                title="Go to Grade 8 Chapter 13 Quizzes"
              >
                🎯 2 Quizzes (10 Qs)
              </button>
            )}
            {onOpenWorksheets && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--ws"
                onClick={onOpenWorksheets}
                title="Go to Grade 8 Chapter 13 Printable Worksheets"
              >
                📑 5 Worksheets (Voice Anatomy & Sthana-Karana)
              </button>
            )}
          </>
        )}
        {activeLessonId === 'grade8_app1' && (
          <>
            <button
              type="button"
              className="textbook-tool-btn textbook-tool-btn--syllabus"
              onClick={() => setIsGrade8SyllabusOpen(true)}
              title="Grade 8 Complete Syllabus & Table of Contents (पाठानुक्रमणिका)"
            >
              📜 पाठानुक्रमणिका (Class 8 Syllabus)
            </button>
            {onOpenQuiz && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--quiz"
                onClick={onOpenQuiz}
                title="Go to Grade 8 Appendix 1 Grammar Quizzes"
              >
                🎯 2 Quizzes (10 Qs)
              </button>
            )}
            {onOpenWorksheets && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--ws"
                onClick={onOpenWorksheets}
                title="Go to Grade 8 Appendix 1 Printable Worksheets"
              >
                📑 5 Worksheets (Grammar & Sandhi)
              </button>
            )}
          </>
        )}
        {activeLessonId === 'gsde101' && (
          <>
            {onOpenQuiz && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--quiz"
                onClick={onOpenQuiz}
                title="Go to Chapter 1 MCQs & Grammar Quizzes (35 questions)"
              >
                🎯 7 Quizzes
              </button>
            )}
            {onOpenWorksheets && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--ws"
                onClick={onOpenWorksheets}
                title="Go to Chapter 1 Printable Worksheets & Teacher Keys"
              >
                📑 7 Worksheets
              </button>
            )}
          </>
        )}
        {activeLessonId === 'gsde102' && (
          <>
            {onOpenQuiz && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--quiz"
                onClick={onOpenQuiz}
                title="Go to Chapter 2 MCQs & Grammar Quizzes (35 questions)"
              >
                🎯 7 Quizzes
              </button>
            )}
            {onOpenWorksheets && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--ws"
                onClick={onOpenWorksheets}
                title="Go to Chapter 2 Printable Worksheets & Teacher Keys"
              >
                📑 7 Worksheets
              </button>
            )}
          </>
        )}
        {activeLessonId === 'gsde103' && (
          <>
            {onOpenQuiz && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--quiz"
                onClick={onOpenQuiz}
                title="Go to Chapter 3 MCQs & Grammar Quizzes (35 questions)"
              >
                🎯 7 Quizzes
              </button>
            )}
            {onOpenWorksheets && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--ws"
                onClick={onOpenWorksheets}
                title="Go to Chapter 3 Printable Worksheets & Teacher Keys"
              >
                📑 7 Worksheets
              </button>
            )}
          </>
        )}
        {activeLessonId === 'gsde104' && (
          <>
            {onOpenQuiz && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--quiz"
                onClick={onOpenQuiz}
                title="Go to Chapter 4 MCQs & Grammar Quizzes (35 questions)"
              >
                🎯 7 Quizzes
              </button>
            )}
            {onOpenWorksheets && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--ws"
                onClick={onOpenWorksheets}
                title="Go to Chapter 4 Printable Worksheets & Teacher Keys"
              >
                📑 7 Worksheets
              </button>
            )}
          </>
        )}
        {activeLessonId === 'gsde105' && (
          <>
            {onOpenQuiz && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--quiz"
                onClick={onOpenQuiz}
                title="Go to Chapter 5 MCQs & Grammar Quizzes (35 questions)"
              >
                🎯 7 Quizzes
              </button>
            )}
            {onOpenWorksheets && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--ws"
                onClick={onOpenWorksheets}
                title="Go to Chapter 5 Printable Worksheets & Teacher Keys"
              >
                📑 7 Worksheets
              </button>
            )}
          </>
        )}
        {activeLessonId === 'gsde106' && (
          <>
            {onOpenQuiz && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--quiz"
                onClick={onOpenQuiz}
                title="Go to Chapter 6 MCQs & Grammar Quizzes (35 questions)"
              >
                🎯 7 Quizzes
              </button>
            )}
            {onOpenWorksheets && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--ws"
                onClick={onOpenWorksheets}
                title="Go to Chapter 6 Printable Worksheets & Teacher Keys"
              >
                📑 7 Worksheets
              </button>
            )}
          </>
        )}
        {activeLessonId === 'gsde107' && (
          <>
            {onOpenQuiz && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--quiz"
                onClick={onOpenQuiz}
                title="Go to Chapter 7 MCQs & Grammar Quizzes (35 questions)"
              >
                🎯 7 Quizzes
              </button>
            )}
            {onOpenWorksheets && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--ws"
                onClick={onOpenWorksheets}
                title="Go to Chapter 7 Printable Worksheets & Teacher Keys"
              >
                📑 8 Worksheets
              </button>
            )}
          </>
        )}
        {activeLessonId === 'gsde108' && (
          <>
            {onOpenQuiz && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--quiz"
                onClick={onOpenQuiz}
                title="Go to Chapter 8 MCQs & Grammar Quizzes (35 questions)"
              >
                🎯 7 Quizzes
              </button>
            )}
            {onOpenWorksheets && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--ws"
                onClick={onOpenWorksheets}
                title="Go to Chapter 8 Printable Worksheets & Teacher Keys"
              >
                📑 7 Worksheets
              </button>
            )}
          </>
        )}
        {activeLessonId === 'gsde109' && (
          <>
            {onOpenQuiz && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--quiz"
                onClick={onOpenQuiz}
                title="Go to Chapter 9 MCQs & Grammar Quizzes (35 questions)"
              >
                🎯 7 Quizzes
              </button>
            )}
            {onOpenWorksheets && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--ws"
                onClick={onOpenWorksheets}
                title="Go to Chapter 9 Printable Worksheets & Teacher Keys"
              >
                📑 7 Worksheets
              </button>
            )}
          </>
        )}
        {activeLessonId === 'gsde110' && (
          <>
            {onOpenQuiz && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--quiz"
                onClick={onOpenQuiz}
                title="Go to Chapter 10 MCQs & Grammar Quizzes (35 questions)"
              >
                🎯 7 Quizzes
              </button>
            )}
            {onOpenWorksheets && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--ws"
                onClick={onOpenWorksheets}
                title="Go to Chapter 10 Printable Worksheets & Teacher Keys"
              >
                📑 7 Worksheets
              </button>
            )}
          </>
        )}
        {activeLessonId === 'gsde111' && (
          <>
            {onOpenQuiz && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--quiz"
                onClick={onOpenQuiz}
                title="Go to Chapter 11 MCQs & Grammar Quizzes (35 questions)"
              >
                🎯 7 Quizzes
              </button>
            )}
            {onOpenWorksheets && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--ws"
                onClick={onOpenWorksheets}
                title="Go to Chapter 11 Printable Worksheets & Teacher Keys"
              >
                📑 7 Worksheets
              </button>
            )}
          </>
        )}
        {activeLessonId === 'gsde112' && (
          <>
            {onOpenQuiz && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--quiz"
                onClick={onOpenQuiz}
                title="Go to Chapter 12 MCQs & Grammar Quizzes (35 questions)"
              >
                🎯 7 Quizzes
              </button>
            )}
            {onOpenWorksheets && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--ws"
                onClick={onOpenWorksheets}
                title="Go to Chapter 12 Printable Worksheets & Teacher Keys"
              >
                📑 7 Worksheets
              </button>
            )}
          </>
        )}
        {activeLessonId === 'gsde113' && (
          <>
            {onOpenQuiz && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--quiz"
                onClick={onOpenQuiz}
                title="Go to Supplementary Lesson MCQs & Grammar Quizzes (35 questions)"
              >
                🎯 7 Quizzes
              </button>
            )}
            {onOpenWorksheets && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--ws"
                onClick={onOpenWorksheets}
                title="Go to Supplementary Lesson Printable Worksheets & Teacher Keys"
              >
                📑 7 Worksheets
              </button>
            )}
          </>
        )}
        {activeLessonId === 'gsde114' && (
          <>
            {onOpenQuiz && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--quiz"
                onClick={onOpenQuiz}
                title="Go to Appendix 1 MCQs & Grammar Quizzes (35 questions)"
              >
                🎯 7 Quizzes
              </button>
            )}
            {onOpenWorksheets && (
              <button
                type="button"
                className="textbook-tool-btn textbook-tool-btn--ws"
                onClick={onOpenWorksheets}
                title="Go to Appendix 1 Printable Worksheets & Teacher Keys"
              >
                📑 7 Worksheets
              </button>
            )}
          </>
        )}
      </div>

      <div className="textbook-lesson-select-row">
        <label htmlFor="lesson-select" className="textbook-lesson-select-label">
          Select Lesson
        </label>
        <select
          id="lesson-select"
          className="textbook-lesson-select"
          value={activeLessonId}
          onChange={(event) => onSelectLesson(event.target.value)}
        >
          {lessons
            .filter((lesson) => lesson.id !== 'samyukta')
            .map((lesson) => (
            <option key={lesson.id} value={lesson.id}>
              {lesson.title}
            </option>
          ))}
        </select>
      </div>

      {!isGroupedLesson && sectionJumps.length > 1 && (
        <div className="textbook-jump-row">
          <label htmlFor="section-jump" className="textbook-lesson-select-label">
            Jump to
          </label>
          <select
            id="section-jump"
            className="textbook-lesson-select textbook-jump-select"
            value={String(currentJumpIndex)}
            onChange={(event) => onJumpToSentence(Number(event.target.value))}
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
                {jump.index === 0
                  ? ((activeLessonId === 'gsde101' || activeLessonId === 'grade8_prarthana') && (jump.label.includes('प्रार्थना') || jump.label.toLowerCase().includes('prayer')) ? 'प्रार्थना' : 'पाठः')
                  : jump.label.includes('शब्दार्थ')
                    ? 'शब्दार्थ'
                    : jump.label.includes('अभ्यास')
                      ? 'अभ्यास'
                      : jump.kind === 'exercise-header' && (/^[०-९1-9१-९]/.test(jump.label))
                        ? jump.label.split(' ')[0]
                        : jump.label.includes('भौगोलिक')
                          ? 'भूगोलः'
                          : jump.label.includes('कारागार')
                            ? 'कारागारः'
                            : jump.label.includes('पर्यटन')
                              ? 'पर्यटनम्'
                              : jump.label.includes('जलक्रीडा')
                                ? 'जलक्रीडा'
                                : jump.label.includes('आजीविका')
                                  ? 'आजीविका'
                                  : jump.label.includes('प्रशस्ति')
                                    ? 'प्रशस्तिः'
                                    : jump.label.includes('संवाद')
                                      ? 'संवादः'
                                      : jump.label.includes('गीत')
                                        ? 'गीतम्'
                                        : jump.label.includes('मन्त्र')
                                          ? 'मन्त्राः'
                                          : jump.label.includes('परियोजना')
                                            ? 'परियोजना'
                                            : jump.label.includes('श्लोक')
                                  ? 'श्लोक'
                                  : jump.label.includes('कथा')
                                    ? 'कथा'
                                    : jump.label.includes('दृश्य')
                                      ? (jump.label.match(/दृश्यम्\s*([०-९1-9१-९]+)/) ? `दृश्य ${jump.label.match(/दृश्यम्\s*([०-९1-9१-९]+)/)![1]}` : 'दृश्यम्')
                                      : jump.label.includes('नाटक')
                                        ? 'नाटकम्'
                                        : jump.label.includes('ग्रन्थ')
                                          ? 'ग्रन्थ-परिचयः'
                                          : jump.label.includes('सूक्त')
                                            ? 'सूक्तयः'
                                            : jump.label.includes('द्रव्य') || jump.label.includes('रसायन') || jump.label.includes('विज्ञान')
                                              ? 'विज्ञानम्'
                                              : jump.label.includes('स्तोत्र')
                                                ? 'स्तोत्रम्'
                                                : jump.label.includes('अवधेय')
                                                  ? 'अवधेयम्'
                                                  : jump.label.includes('पूरण')
                                                    ? 'पूरणशब्दाः'
                                                    : jump.label.includes('सङ्ख्या')
                                                      ? 'सङ्ख्याः'
                                                      : jump.label.includes('लङ्-लकार')
                                                        ? 'लङ्-लकारः'
                                                      : jump.label.includes('वर्णमात्रा') || jump.label.includes('मात्रा-परिचय')
                                                        ? 'वर्णमात्रा'
                                                      : jump.label.includes('कुक्कुट') || jump.label.includes('चाष')
                                                        ? 'ध्वनि-मात्रा'
                                                      : jump.label.includes('कार्यकलाप')
                                                        ? 'कार्यकलापः'
                                                      : jump.label.includes('गणना')
                                                        ? 'मात्रा-गणना'
                                                      : jump.label.includes('व्यूह') || jump.label.includes('सप्ताङ्ग')
                                                        ? 'व्यूहरचना'
                                                      : jump.label.includes('विस्तार') || jump.label.includes('पुराण')
                                                        ? 'विस्तारः'
                                                        : jump.label.includes('लाभ')
                                                          ? 'लाभाः'
                                                          : jump.label.includes('स्वास्थ्य') || jump.label.includes('नियम')
                                                            ? 'स्वास्थ्य'
                                        : jump.label.includes('पृष्ठम् ५६') || jump.label.includes('पृष्ठ ५६')
                                          ? 'पृष्ठ ५६'
                                          : jump.label.includes('पृष्ठम् ३८') || jump.label.includes('पृष्ठ ३८') || jump.label.includes('Page 38')
                                            ? 'पृष्ठ ३८'
                                            : jump.label.split('·')[0].trim().slice(0, 10)}
              </button>
            ))}
          </div>
        </div>
      )}

      <header className="textbook-reader-header">
        <h2>{activeLesson?.title}</h2>
        {activeLesson && (
          <p className="textbook-reader-source">Source Material: {activeLesson.fileName}</p>
        )}
        {activeLessonId === 'varnamala' && (
          <p className="textbook-glossary-hint" style={{ marginTop: '.35rem' }}>
            Click on any syllable (akṣara (अक्षर)) to listen to audio pronunciation.
          </p>
        )}
        {activeLessonId === 'barakhadi' && (
          <p className="textbook-glossary-hint" style={{ marginTop: '.35rem' }}>
            Tap any letter to hear it. Kid spellings keep look-alikes clear (tt vs t, shh vs sh).
          </p>
        )}

        <div className="textbook-playall-row">
          <button
            type="button"
            className={`textbook-playall-btn${isPlayingAll ? ' textbook-playall-btn--active' : ''}`}
            onClick={handlePlayAll}
            aria-pressed={isPlayingAll}
          >
            {isPlayingAll
              ? '⏹ Stop'
              : activeLessonId === 'barakhadi'
                ? '▶ Play all letters'
                : '▶ Play all'}
          </button>
          <span className="textbook-glossary-hint">
            {activeLessonId === 'barakhadi'
              ? 'Hear every akṣara in बारहखड़ी, row by row.'
              : isGroupedLesson
                ? 'Hear every letter on this chart, in order.'
                : 'Hear every word on this page, in order.'}
          </span>
        </div>
        {!isGroupedLesson && (
          <span className="textbook-reader-progress">
            {sentence.kind?.startsWith('glossary') || sentence.kind?.startsWith('exercise')
              ? `Exercise · ${sentenceNumber} of ${totalSentences}`
              : `Paragraph ${sentenceNumber} of ${totalSentences}`}
          </span>
        )}
      </header>

      {isGroupedLesson && activeLesson ? (
        <div className="varnamala-groups">
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
                  className="textbook-playrow-btn"
                  onClick={() => handlePlayGroup(group.words || [])}
                  aria-label={`Play all letters in ${group.meaning || group.category || 'this row'}`}
                  title="Play this row"
                >
                  ▶
                </button>
              </div>
              <div className="varnamala-row-letters">
                {group.words.map((letter, letterIdx) => {
                  const isExtraAnunasika = letter === 'अँ';
                  return (
                  <button
                    key={`${activeLessonId}-${groupIdx}-${letterIdx}`}
                    type="button"
                    className={`varnamala-letter-btn${showRomanTiles ? ' barakhadi-letter-btn' : ''}${isExtraAnunasika ? ' varnamala-letter-btn--extra' : ''}`}
                    onClick={() => onWordClick(letter)}
                    aria-label={`Play pronunciation for ${letter}${isExtraAnunasika ? ' (optional, for later)' : ''}${showRomanTiles ? ` (${tileLabel(letter)})` : ''}`}
                    title={isExtraAnunasika ? 'Candrabindu — optional for beginners, learn later' : undefined}
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
                          const isWord = /[\u0900-\u097F]/.test(clean);
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
                    {sentence.words.map((word, idx) => (
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

              {sentence.meaning && (
                <div className="textbook-sentence-meaning-box">
                  <span className="textbook-meaning-tag">अनुवादः · English Translation</span>
                  <p className="textbook-sentence-meaning">{sentence.meaning}</p>
                </div>
              )}
              {sentence.paragraphTranslation && (
                <div className="textbook-paragraph-translation">
                  <span className="textbook-paragraph-translation-label">हिन्दी अनुवादः · Hindi Meaning</span>
                  <p className="textbook-paragraph-translation-text">{sentence.paragraphTranslation}</p>
                </div>
              )}
            </>
          )}
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
          <button
            type="button"
            className="textbook-nav-btn"
            onClick={onNext}
            disabled={isLastSentence}
          >
            Next ▶
          </button>
        </div>
      )}

      {isSymbolsOpen && (
        <div
          className="symbols-modal-overlay"
          onClick={() => setIsSymbolsOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="symbols-modal-content" onClick={(e) => e.stopPropagation()}>
            <header className="symbols-modal-header">
              <div>
                <h3>संस्कृत-विरामचिह्नानि · Sanskrit Symbols Reference</h3>
                <p>Essential orthographic and punctuation symbols in classical Sanskrit</p>
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

            <footer className="symbols-modal-footer">
              <span>Tip: In classical texts and manuscripts, Daṇḍa (।) and Dvi-daṇḍa (॥) demarcate syntactic boundaries and poetic half/full verses.</span>
            </footer>
          </div>
        </div>
      )}

      <Grade8SyllabusModal
        isOpen={isGrade8SyllabusOpen}
        onClose={() => setIsGrade8SyllabusOpen(false)}
        onSelectLesson={(id) => onSelectLesson(id)}
      />
    </section>
  );
};

export default TextbookReader;