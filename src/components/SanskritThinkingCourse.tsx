import React, { useState, useEffect, useMemo } from 'react';
import {
  COURSE_MODULES,
  SANSKRIT_THINKING_COURSE_METADATA,
  type CourseLesson,
  type CourseModule,
} from '../data/sanskritThinkingCourseData';
import {
  DARSHANAS_COURSE_ADDENDUM,
  type DarshanaAddendumArticle,
} from '../data/darshanasCourseAddendum';
import { useAuthStore } from '../store/authStore';
import { hasPaidAccess, hasPremiumAccess } from '../utils/premiumAccess';
import { playPronunciation } from '../utils/pronunciation';
import { findShantiLineIndex, isShantiMantraText, reciteShantiMantra } from '../utils/shantiMantraSpeech';
import ShantiMantraPlayer from './ShantiMantraPlayer';
import { MANTRAS_ADDENDUM_ID, MANTRAS_BY_ID, MANTRAS_COURSE_HASH } from '../data/mantrasShlokas';
import { getCourseLessonWorksheet } from '../data/courseWorksheetsData';
import {
  PingalaPrastaraTruthTable,
  PingalaNastamUddistamCodec,
  PingalaMeruPyramid,
} from './PingalaInteractiveTools';
import { TurangaBandhaChessboard } from './TurangaBandhaChessboard';
import { LilavatiPoeticMathStudio } from './LilavatiPoeticMathStudio';
import { CymaticsHarmonicsStudio } from './CymaticsHarmonicsStudio';
import SanskritFlashcardStudio from './SanskritFlashcardStudio';
import SanskritGrandExam from './SanskritGrandExam';

/** Sidebar / nav label for an addendum unit. */
const addendumPartLabel = (art: DarshanaAddendumArticle): string =>
  art.partLabel || (art.partNumber === 0 ? 'Prologue' : `Part ${art.partNumber}`);

/**
 * Course deep links (hash on /course):
 *   #mantras                 → Mantras & Ślokas unit
 *   #mantra-<id>             → Mantras & Ślokas unit, scrolled to that verse
 *   #addendum-<id|slug>      → any addendum unit
 *   #lesson-<id>             → a curriculum lesson (e.g. #lesson-c-6-1)
 *   #flashcards              → Cognitive Flashcards Studio
 *   #exam                    → Grand Assessment Exam
 */
const parseCourseHash = (): { addendumId?: string; lessonId?: string; anchor?: string; mode?: 'curriculum' | 'addendum' | 'flashcards' | 'exam' } => {
  if (typeof window === 'undefined') return {};
  const h = decodeURIComponent((window.location.hash || '').replace(/^#/, '')).trim();
  if (!h) return {};
  if (h === 'flashcards' || h === 'cards' || h === 'flashcard-studio') return { mode: 'flashcards' };
  if (h === 'exam' || h === 'assessment' || h === 'grand-exam') return { mode: 'exam' };
  if (h === MANTRAS_COURSE_HASH) return { addendumId: MANTRAS_ADDENDUM_ID };
  if (h.startsWith('mantra-')) return { addendumId: MANTRAS_ADDENDUM_ID, anchor: h };
  if (h.startsWith('lesson-')) return { lessonId: h.slice('lesson-'.length) };
  if (h.startsWith('addendum-')) {
    const key = h.slice('addendum-'.length);
    const art = DARSHANAS_COURSE_ADDENDUM.find((a) => a.id === h || a.id === key || a.slug === key);
    if (art) return { addendumId: art.id };
  }
  return {};
};

import '../styles/sanskrit-thinking-course.css';

export interface SanskritThinkingCourseProps {
  onGoHome?: () => void;
  onOpenReader?: (chapterId?: string) => void;
  onOpenVarnamala?: () => void;
  onOpenGrammar?: (topic?: any, articleId?: string | null) => void;
  onOpenDhatupatha?: () => void;
  onOpenVedicMaths?: () => void;
  onOpenPhilosophy?: () => void;
  onOpenWorksheets?: () => void;
  onOpenQuiz?: () => void;
  onOpenBoard?: () => void;
  onOpenCbseGuide?: () => void;
  onOpenRegister?: () => void;
  onOpenPayment?: () => void;
  initialLessonId?: string;
  initialMode?: 'curriculum' | 'addendum';
  initialAddendumId?: string;
  onOpenVoiceSettings?: () => void;
}

export const SanskritThinkingCourse: React.FC<SanskritThinkingCourseProps> = ({
  onGoHome,
  onOpenReader,
  onOpenVarnamala,
  onOpenGrammar,
  onOpenDhatupatha,
  onOpenVedicMaths,
  onOpenPhilosophy,
  onOpenWorksheets,
  onOpenQuiz,
  onOpenBoard,
  onOpenCbseGuide,
  onOpenRegister,
  onOpenPayment,
  initialLessonId,
  initialMode = 'curriculum',
  initialAddendumId,
  onOpenVoiceSettings,
}) => {
  const { currentUser, isAdminLoggedIn } = useAuthStore();
  // Admin fast-pass override (via ?admin=1, #admin, or top toolbar toggle)
  const [isAdminOverride, setIsAdminOverride] = useState<boolean>(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const hash = window.location.hash.toLowerCase();
      if (urlParams.get('admin') === '1' || urlParams.get('admin') === 'true' || hash.includes('admin')) {
        localStorage.setItem('stc_admin_override', 'true');
        return true;
      }
      return localStorage.getItem('stc_admin_override') === 'true';
    } catch {
      return false;
    }
  });

  const isEffectiveAdmin = isAdminLoggedIn || isAdminOverride;
  const hasPaid = hasPaidAccess(currentUser, isEffectiveAdmin);
  const [hashTarget] = useState(parseCourseHash);
  const inTrial = hasPremiumAccess(currentUser, isEffectiveAdmin) && !hasPaid;
  const [isAdminDeckOpen, setIsAdminDeckOpen] = useState<boolean>(true);


  // View mode: 'curriculum' (28 Lessons), 'addendum' (Prologue, Mantras, Masterclasses), 'flashcards' (Cognitive Flashcards), 'exam' (Grand Assessment)
  const [viewMode, setViewMode] = useState<'curriculum' | 'addendum' | 'flashcards' | 'exam'>(
    hashTarget.mode || (hashTarget.addendumId || initialAddendumId ? 'addendum' : hashTarget.lessonId ? 'curriculum' : initialMode)
  );
  const [activeAddendumId, setActiveAddendumId] = useState<string>(
    hashTarget.addendumId || initialAddendumId || DARSHANAS_COURSE_ADDENDUM[0].id
  );

  const openAddendum = (addendumId: string) => {
    setViewMode('addendum');
    setActiveAddendumId(addendumId);
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  // Scroll to the deep-linked unit / verse once it has rendered.
  useEffect(() => {
    if (!hashTarget.addendumId && !initialAddendumId && !hashTarget.lessonId) return;
    const t = setTimeout(() => {
      const el =
        (hashTarget.anchor && document.getElementById(hashTarget.anchor)) ||
        document.querySelector('.stc-addendum-article, .stc-lesson-main, main');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep a shareable hash for the Mantras & Ślokas unit (after the parent's URL sync).
  useEffect(() => {
    const t = setTimeout(() => {
    try {
      const onCourse = /^\/(course|sanskrit-thinking|sanskrit-as-a-way-of-thinking|samskrta-cintanam)\/?$/.test(window.location.pathname);
      if (!onCourse) return;
      const wantMantras = viewMode === 'addendum' && activeAddendumId === MANTRAS_ADDENDUM_ID;
      const hash = window.location.hash.replace(/^#/, '');
      const isMantraHash = hash === MANTRAS_COURSE_HASH || hash.startsWith('mantra-');
      if (wantMantras && !isMantraHash) {
        window.history.replaceState(window.history.state, '', `${window.location.pathname}#${MANTRAS_COURSE_HASH}`);
      } else if (!wantMantras && isMantraHash) {
        window.history.replaceState(window.history.state, '', window.location.pathname);
      }
    } catch {
      /* ignore */
    }
    }, 0);
    return () => clearTimeout(t);
  }, [viewMode, activeAddendumId]);

  // Flatten all lessons for easy sequential indexing
  const allLessons = useMemo(() => {
    return COURSE_MODULES.flatMap((m) => m.lessons);
  }, []);

  // Active module & lesson state
  const [activeModuleId, setActiveModuleId] = useState<string>(() => {
    const wantLesson = hashTarget.lessonId || initialLessonId;
    if (wantLesson) {
      const found = COURSE_MODULES.find((m) => m.lessons.some((l) => l.id === wantLesson));
      if (found) return found.id;
    }
    return COURSE_MODULES[0].id;
  });

  const [activeLessonId, setActiveLessonId] = useState<string>(() => {
    const wantLesson = hashTarget.lessonId || initialLessonId;
    if (wantLesson && allLessons.some((l) => l.id === wantLesson)) {
      return wantLesson;
    }
    return COURSE_MODULES[0].lessons[0].id;
  });

  // Track completed lessons in localStorage
  const [completedLessonIds, setCompletedLessonIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('stc_completed_lessons');
      if (saved) return new Set(JSON.parse(saved));
    } catch {}
    return new Set<string>();
  });

  // Track completed masterclasses (addenda) in localStorage
  const [completedAddendumIds, setCompletedAddendumIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('stc_completed_addenda');
      if (saved) return new Set(JSON.parse(saved));
    } catch {}
    return new Set<string>();
  });

  // Gurukul Certificate Modal & Student Name state
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [studentName, setStudentName] = useState(() => {
    try {
      return localStorage.getItem('stc_student_name') || (currentUser?.fullName || 'विद्वान् / विदुषी');
    } catch {
      return currentUser?.fullName || 'विद्वान् / विदुषी';
    }
  });

  // Quiz state per lesson: { [lessonId]: selectedOptionIndex }
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number | null>>({});

  // Active worksheet modal state & answer key toggle
  const [activeWorksheetModalLesson, setActiveWorksheetModalLesson] = useState<CourseLesson | null>(null);
  const [showAnswerKeyInModal, setShowAnswerKeyInModal] = useState(false);

  // In-lesson interactive drills accordion state: { [lessonId]: boolean }
  const [showInteractiveDrills, setShowInteractiveDrills] = useState<Record<string, boolean>>({});

  // Sequential listen & repeat playback state
  const [isPlayingSequence, setIsPlayingSequence] = useState(false);
  const [activeAudioIndex, setActiveAudioIndex] = useState<number | null>(null);

  // Current active lesson object
  const currentLesson: CourseLesson = useMemo(() => {
    return allLessons.find((l) => l.id === activeLessonId) || allLessons[0];
  }, [allLessons, activeLessonId]);

  // Current active module object
  const currentModule: CourseModule = useMemo(() => {
    return COURSE_MODULES.find((m) => m.lessons.some((l) => l.id === currentLesson.id)) || COURSE_MODULES[0];
  }, [currentLesson]);

  // Stop audio sequence if switching lessons
  const stopSequence = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingSequence(false);
    setActiveAudioIndex(null);
  };

  useEffect(() => {
    stopSequence();
  }, [activeLessonId]);

  // Play sequential recitation for all audio terms in the lesson
  const playSequence = (terms: { devanagari: string }[]) => {
    if (isPlayingSequence) {
      stopSequence();
      return;
    }
    if (!terms || terms.length === 0) return;
    setIsPlayingSequence(true);
    let idx = 0;

    const playNext = () => {
      if (idx >= terms.length) {
        setIsPlayingSequence(false);
        setActiveAudioIndex(null);
        return;
      }
      setActiveAudioIndex(idx);
      const term = terms[idx].devanagari;
      const shantiLine = findShantiLineIndex(term);
      if (shantiLine >= 0) {
        reciteShantiMantra({ lines: [shantiLine] });
      } else {
        playPronunciation(term);
      }
      idx++;
      setTimeout(playNext, 2400);
    };

    playNext();
  };

  // Sync active module when lesson changes
  useEffect(() => {
    if (currentModule.id !== activeModuleId) {
      setActiveModuleId(currentModule.id);
    }
  }, [currentModule, activeModuleId]);

  // Save progress
  const toggleLessonComplete = (lessonId: string) => {
    setCompletedLessonIds((prev) => {
      const next = new Set(prev);
      if (next.has(lessonId)) {
        next.delete(lessonId);
      } else {
        next.add(lessonId);
      }
      try {
        localStorage.setItem('stc_completed_lessons', JSON.stringify(Array.from(next)));
      } catch {}
      return next;
    });
  };

  // Save addendum / masterclass progress
  const toggleAddendumComplete = (addendumId: string) => {
    setCompletedAddendumIds((prev) => {
      const next = new Set(prev);
      if (next.has(addendumId)) {
        next.delete(addendumId);
      } else {
        next.add(addendumId);
      }
      try {
        localStorage.setItem('stc_completed_addenda', JSON.stringify(Array.from(next)));
      } catch {}
      return next;
    });
  };

  const progressPercent = Math.round((completedLessonIds.size / allLessons.length) * 100);
  const addendaProgressPercent = Math.round((completedAddendumIds.size / DARSHANAS_COURSE_ADDENDUM.length) * 100);
  const totalCompleted = completedLessonIds.size + completedAddendumIds.size;
  const totalItems = allLessons.length + DARSHANAS_COURSE_ADDENDUM.length;
  const overallProgressPercent = Math.round((totalCompleted / totalItems) * 100);

  const currentIndex = allLessons.findIndex((l) => l.id === currentLesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const currentAddendum: DarshanaAddendumArticle = useMemo(() => {
    return (
      DARSHANAS_COURSE_ADDENDUM.find((a) => a.id === activeAddendumId) ||
      DARSHANAS_COURSE_ADDENDUM[0]
    );
  }, [activeAddendumId]);

  const currentAddendumIndex = useMemo(() => {
    return DARSHANAS_COURSE_ADDENDUM.findIndex((a) => a.id === currentAddendum.id);
  }, [currentAddendum]);

  const prevAddendum = currentAddendumIndex > 0 ? DARSHANAS_COURSE_ADDENDUM[currentAddendumIndex - 1] : null;
  const nextAddendum =
    currentAddendumIndex < DARSHANAS_COURSE_ADDENDUM.length - 1
      ? DARSHANAS_COURSE_ADDENDUM[currentAddendumIndex + 1]
      : null;

  const handleSelectLesson = (lesson: CourseLesson) => {
    stopSequence();
    setActiveLessonId(lesson.id);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleSelectLessonById = (lessonId: string) => {
    const targetModule = COURSE_MODULES.find((m) => m.lessons.some((l) => l.id === lessonId));
    const targetLesson = allLessons.find((l) => l.id === lessonId);
    if (targetModule && targetLesson) {
      setActiveModuleId(targetModule.id);
      handleSelectLesson(targetLesson);
      setViewMode('curriculum');
    }
  };

  const handleAdminCompleteAllLessons = () => {
    const allIds = new Set(allLessons.map((l) => l.id));
    setCompletedLessonIds(allIds);
    try {
      localStorage.setItem('stc_completed_lessons', JSON.stringify(Array.from(allIds)));
    } catch {}
  };

  const handleAdminCompleteAllAddenda = () => {
    const allIds = new Set(DARSHANAS_COURSE_ADDENDUM.map((a) => a.id));
    setCompletedAddendumIds(allIds);
    try {
      localStorage.setItem('stc_completed_addenda', JSON.stringify(Array.from(allIds)));
    } catch {}
  };

  const handleAdminPerfectExam = () => {
    try {
      const perfect: Record<number, number> = {};
      allLessons.forEach((l, idx) => {
        perfect[idx] = l.practice.quickQuiz.correctIndex;
      });
      localStorage.setItem('stc_grand_exam_answers', JSON.stringify(perfect));
      localStorage.setItem('stc_grand_exam_submitted', 'true');
      localStorage.setItem('stc_grand_exam_score', `${allLessons.length}/${allLessons.length}`);
      localStorage.setItem('stc_grand_exam_percent', '100%');
      localStorage.setItem('stc_grand_exam_grade', 'महामहोपाध्यायः (Summa Cum Laude)');
      localStorage.setItem('stc_grand_exam_date', new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }));
    } catch {}
    setIsCertificateModalOpen(true);
  };

  const handleAdminResetAll = () => {
    if (!window.confirm('Reset all course progress (lessons, addenda, exam)?')) return;
    setCompletedLessonIds(new Set());
    setCompletedAddendumIds(new Set());
    setQuizAnswers({});
    try {
      localStorage.removeItem('stc_completed_lessons');
      localStorage.removeItem('stc_completed_addenda');
      localStorage.removeItem('stc_grand_exam_answers');
      localStorage.removeItem('stc_grand_exam_submitted');
      localStorage.removeItem('stc_grand_exam_score');
      localStorage.removeItem('stc_grand_exam_percent');
      localStorage.removeItem('stc_grand_exam_grade');
      localStorage.removeItem('stc_grand_exam_date');
    } catch {}
  };


  const handleAudioPlay = (term: string) => {
    stopSequence();
    // Śānti-mantra lines (ओं सह नाववतु …) use the dedicated recitation voice:
    // whole phrase with spaces kept, no daṇḍa spoken, calm rate.
    const shantiLine = findShantiLineIndex(term);
    if (shantiLine >= 0) {
      reciteShantiMantra({ lines: [shantiLine] });
      return;
    }
    playPronunciation(term);
  };

  const handleQuizSelect = (lessonId: string, optIndex: number) => {
    setQuizAnswers((prev) => ({ ...prev, [lessonId]: optIndex }));
    // Auto mark complete if correct
    if (optIndex === currentLesson.practice.quickQuiz.correctIndex) {
      if (!completedLessonIds.has(lessonId)) {
        toggleLessonComplete(lessonId);
      }
    }
  };

  const handleWorksheetDownloadClick = (lesson: CourseLesson) => {
    if (hasPaid) {
      setActiveWorksheetModalLesson(lesson);
      return;
    }
    if (!currentUser) {
      onOpenRegister?.();
    } else {
      onOpenPayment?.();
    }
  };

  const handleLinkedResourceClick = (res: { targetView: string; param?: string }) => {
    switch (res.targetView) {
      case 'course-addendum':
        if (res.param) openAddendum(res.param);
        break;
      case 'varnamala':
        onOpenVarnamala?.();
        break;
      case 'reader':
        onOpenReader?.(res.param);
        break;
      case 'grammar':
        if (res.param && res.param.startsWith('article:')) {
          onOpenGrammar?.('article', res.param.replace('article:', ''));
        } else if (res.param && res.param.startsWith('topic:')) {
          onOpenGrammar?.(res.param.replace('topic:', ''));
        } else {
          onOpenGrammar?.();
        }
        break;
      case 'dhatupatha':
        onOpenDhatupatha?.();
        break;
      case 'vedic-maths':
        onOpenVedicMaths?.();
        break;
      case 'philosophy':
        onOpenPhilosophy?.();
        break;
      case 'worksheets':
        onOpenWorksheets?.();
        break;
      case 'quiz':
        onOpenQuiz?.();
        break;
      case 'board':
        onOpenBoard?.();
        break;
      case 'home':
        onGoHome?.();
        break;
      case 'cbse-guide':
        onOpenCbseGuide?.();
        break;
      default:
        break;
    }
  };

  return (
    <div className="stc-page">
      <div className="stc-container">
        {/* Top Navigation & Status */}
        <div className="stc-top-bar">
          <div className="stc-nav-crumbs">
            {onGoHome && (
              <button type="button" className="stc-crumb-btn" onClick={onGoHome}>
                ← Gurukul Campus
              </button>
            )}
            {onOpenPhilosophy && (
              <button type="button" className="stc-crumb-btn" onClick={onOpenPhilosophy}>
                📜 Darśana Essays
              </button>
            )}
            {onOpenVedicMaths && (
              <button type="button" className="stc-crumb-btn" onClick={onOpenVedicMaths}>
                🧮 Vedic Maths
              </button>
            )}
            {onOpenReader && (
              <button type="button" className="stc-crumb-btn" onClick={() => onOpenReader()}>
                📖 Deepakam Reader
              </button>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            {/* Admin Fast-Pass Access Switch */}
            <button
              type="button"
              className="stc-crumb-btn"
              style={{
                background: isEffectiveAdmin ? '#fef3c7' : '#f8fafc',
                borderColor: isEffectiveAdmin ? '#d97706' : '#cbd5e1',
                color: isEffectiveAdmin ? '#92400e' : '#475569',
                fontWeight: 800
              }}
              onClick={() => {
                const next = !isAdminOverride;
                setIsAdminOverride(next);
                try {
                  localStorage.setItem('stc_admin_override', next ? 'true' : 'false');
                } catch {}
              }}
              title="Toggle Course Administrator Fast-Pass (Quick-jump to any lesson, complete all progress, bypass gates)"
            >
              <span>{isEffectiveAdmin ? '🛡️ Admin: Active' : '🛡️ Admin Access'}</span>
            </button>

            <button
              type="button"
              className="stc-crumb-btn"
              style={{ background: '#fef3c7', borderColor: '#d97706', color: '#92400e' }}
              onClick={() => setIsCertificateModalOpen(true)}
              title="View and customize your official Gurukul Certificate of Completion"
            >
              <span>📜</span>
              <span>Course Certificate</span>
            </button>

            {hasPaid ? (
              <span className="stc-sub-pill stc-sub-pill--active">
                ⭐ Full Access Active · Worksheets &amp; Answer Keys Unlocked
              </span>
            ) : inTrial ? (
              <span className="stc-sub-pill stc-sub-pill--trial">
                🎁 Free Trial · All 28 Lessons Open
              </span>
            ) : currentUser ? (
              <span className="stc-sub-pill stc-sub-pill--guest" onClick={onOpenPayment} style={{ cursor: 'pointer' }}>
                🔒 Free trial ended · Pay ₹200 once to unlock downloads
              </span>
            ) : (
              <span className="stc-sub-pill stc-sub-pill--guest" onClick={onOpenRegister} style={{ cursor: 'pointer' }}>
                ✨ Sign In / Register to save progress
              </span>
            )}
          </div>
        </div>

        {/* Hero Section */}
        <header className="stc-hero">
          <span className="stc-hero-kicker">Gurukul Structured Curriculum · सम्पूर्ण-पाठ्यक्रमः</span>
          <h1 className="stc-hero-title">{SANSKRIT_THINKING_COURSE_METADATA.titleDevanagari}</h1>
          <div className="stc-hero-subtitle">{SANSKRIT_THINKING_COURSE_METADATA.titleEnglish}</div>
          <p className="stc-hero-intro">{SANSKRIT_THINKING_COURSE_METADATA.introduction}</p>

          <div className="stc-progress-box">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span className="stc-progress-label">
                Course Progress: {completedLessonIds.size} / {allLessons.length} Lessons ({progressPercent}%) · {completedAddendumIds.size} / {DARSHANAS_COURSE_ADDENDUM.length} Masterclasses ({addendaProgressPercent}%)
              </span>
              <button
                type="button"
                className="stc-crumb-btn"
                style={{ fontSize: '0.78rem', padding: '0.2rem 0.65rem', background: 'rgba(255, 255, 255, 0.2)', color: '#ffffff', borderColor: 'rgba(255, 255, 255, 0.4)' }}
                onClick={() => setIsCertificateModalOpen(true)}
              >
                📜 Certificate
              </button>
            </div>
            <div className="stc-progress-bar-wrap" aria-label={`Overall progress ${overallProgressPercent}%`}>
              <div className="stc-progress-bar-fill" style={{ width: `${overallProgressPercent}%` }} />
            </div>
            <span className="stc-progress-percent">{overallProgressPercent}% Total</span>
          </div>
        </header>

        {/* 5-Step Formula Ribbon */}
        <div className="stc-formula-ribbon">
          {SANSKRIT_THINKING_COURSE_METADATA.fiveStepFormula.map((step, idx) => (
            <div key={idx} className="stc-formula-step">
              <span className="stc-formula-step-num">
                {idx === 0 ? '💡' : idx === 1 ? '🔊' : idx === 2 ? '📐' : idx === 3 ? '✍️' : '🧠'}
              </span>
              <div>
                <div className="stc-formula-step-title">{step.step} ({step.sanskrit})</div>
                <div className="stc-formula-step-sub">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Course Admin Fast-Pass Deck */}
        {isEffectiveAdmin && (
          <div
            style={{
              background: '#fffbeb',
              border: '2px solid #f59e0b',
              borderRadius: '14px',
              padding: '1rem 1.25rem',
              marginBottom: '1.5rem',
              boxShadow: '0 4px 15px rgba(245, 158, 11, 0.15)',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: isAdminDeckOpen ? '0.85rem' : 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ fontSize: '1.25rem' }}>🛡️</span>
                <div>
                  <div style={{ fontWeight: 900, color: '#92400e', fontSize: '0.94rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Course Admin Fast-Pass Deck · आचार्य-द्रुत-नियन्त्रणम्
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#b45309' }}>
                    Full unrestricted bypass: Jump to any lesson, auto-solve exam, toggle 100% progress, and download keys.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setIsAdminDeckOpen((prev) => !prev)}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #d97706',
                    color: '#92400e',
                    borderRadius: '6px',
                    padding: '0.25rem 0.65rem',
                    fontSize: '0.76rem',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  {isAdminDeckOpen ? '▲ Collapse Deck' : '▼ Expand Admin Deck'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAdminOverride(false);
                    try { localStorage.removeItem('stc_admin_override'); } catch {}
                  }}
                  style={{
                    background: '#fee2e2',
                    border: '1px solid #fca5a5',
                    color: '#991b1b',
                    borderRadius: '6px',
                    padding: '0.25rem 0.65rem',
                    fontSize: '0.76rem',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                  title="Exit Admin Mode"
                >
                  Exit Admin
                </button>
              </div>
            </div>

            {isAdminDeckOpen && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingTop: '0.5rem', borderTop: '1px solid #fde68a' }}>
                {/* Row 1: Direct Lesson Jumper Dropdown */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <label htmlFor="stc-admin-jump" style={{ fontSize: '0.82rem', fontWeight: 800, color: '#78350f', whiteSpace: 'nowrap' }}>
                    ⚡ Instant Jumper:
                  </label>
                  <select
                    id="stc-admin-jump"
                    value={viewMode === 'curriculum' ? `lesson-${activeLessonId}` : viewMode === 'addendum' ? `addendum-${activeAddendumId}` : viewMode}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === 'flashcards') {
                        setViewMode('flashcards');
                      } else if (val === 'exam') {
                        setViewMode('exam');
                      } else if (val.startsWith('lesson-')) {
                        handleSelectLessonById(val.replace('lesson-', ''));
                      } else if (val.startsWith('addendum-')) {
                        openAddendum(val.replace('addendum-', ''));
                      }
                    }}
                    style={{
                      flex: '1 1 280px',
                      padding: '0.45rem 0.75rem',
                      borderRadius: '8px',
                      border: '1.5px solid #d97706',
                      background: '#ffffff',
                      color: '#0f172a',
                      fontSize: '0.86rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    <option value="" disabled>Select any unit to jump immediately...</option>
                    <optgroup label="Interactive Studios & Evaluation">
                      <option value="flashcards">🗂️ Cognitive Flashcard Studio (चिन्तन-मञ्जूषा)</option>
                      <option value="exam">🏆 Grand Assessment Exam (महा-मूल्याङ्कनम् - 28 Questions)</option>
                    </optgroup>
                    {COURSE_MODULES.map((m) => (
                      <optgroup key={m.id} label={`Module ${m.moduleNumber}: ${m.titleDevanagari} (${m.titleEnglish})`}>
                        {m.lessons.map((l) => (
                          <option key={l.id} value={`lesson-${l.id}`}>
                            Lesson {l.lessonNumber}: {l.titleDevanagari} ({l.titleEnglish})
                          </option>
                        ))}
                      </optgroup>
                    ))}
                    <optgroup label="Masterclasses & Addenda (11 Units)">
                      {DARSHANAS_COURSE_ADDENDUM.map((a) => (
                        <option key={a.id} value={`addendum-${a.id}`}>
                          {a.partLabel || `Part ${a.partNumber}`}: {a.titleDevanagari} ({a.titleEnglish})
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                {/* Row 2: 1-Click Fast-Pass Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#78350f' }}>
                    Admin Actions:
                  </span>

                  <button
                    type="button"
                    onClick={handleAdminCompleteAllLessons}
                    style={{
                      background: '#dcfce7',
                      border: '1px solid #86efac',
                      color: '#15803d',
                      borderRadius: '8px',
                      padding: '0.35rem 0.75rem',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                    title="Mark all 28 curriculum lessons as completed"
                  >
                    ✓ Complete All 28 Lessons
                  </button>

                  <button
                    type="button"
                    onClick={handleAdminCompleteAllAddenda}
                    style={{
                      background: '#dcfce7',
                      border: '1px solid #86efac',
                      color: '#15803d',
                      borderRadius: '8px',
                      padding: '0.35rem 0.75rem',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                    title="Mark all 11 masterclasses as completed"
                  >
                    ✓ Complete All 11 Masterclasses
                  </button>

                  <button
                    type="button"
                    onClick={handleAdminPerfectExam}
                    style={{
                      background: '#ede9fe',
                      border: '1px solid #c4b5fd',
                      color: '#5b21b6',
                      borderRadius: '8px',
                      padding: '0.35rem 0.75rem',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                    title="Auto-solve grand exam with 100% and endorse Summa Cum Laude on Certificate"
                  >
                    🌟 100% Perfect Grand Exam
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsCertificateModalOpen(true)}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #d97706',
                      color: '#92400e',
                      borderRadius: '8px',
                      padding: '0.35rem 0.75rem',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                    title="Open official Gurukul certificate"
                  >
                    📜 Open Certificate
                  </button>

                  <button
                    type="button"
                    onClick={handleAdminResetAll}
                    style={{
                      background: '#fee2e2',
                      border: '1px solid #fca5a5',
                      color: '#991b1b',
                      borderRadius: '8px',
                      padding: '0.35rem 0.75rem',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      marginLeft: 'auto'
                    }}
                    title="Reset all progress back to zero"
                  >
                    🔄 Reset All Progress
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Course View Mode Switcher (Curriculum vs Addendum vs Flashcards vs Exam) */}
        <div className="stc-view-selector" role="tablist" aria-label="Course section selector">

          <button
            type="button"
            role="tab"
            aria-selected={viewMode === 'curriculum'}
            className={`stc-view-tab-btn ${viewMode === 'curriculum' ? 'active' : ''}`}
            onClick={() => setViewMode('curriculum')}
          >
            <span>📚</span>
            <span>28 Lessons (२८ पाठाः)</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={viewMode === 'addendum'}
            className={`stc-view-tab-btn ${viewMode === 'addendum' ? 'active' : ''}`}
            onClick={() => setViewMode('addendum')}
          >
            <span>🪔</span>
            <span>Addenda &amp; Masterclasses (अनुबन्धाः)</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={viewMode === 'flashcards'}
            className={`stc-view-tab-btn ${viewMode === 'flashcards' ? 'active' : ''}`}
            onClick={() => setViewMode('flashcards')}
          >
            <span>🗂️</span>
            <span>Cognitive Flashcards (चिन्तन-मञ्जूषा)</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={viewMode === 'exam'}
            className={`stc-view-tab-btn ${viewMode === 'exam' ? 'active' : ''}`}
            onClick={() => setViewMode('exam')}
          >
            <span>🏆</span>
            <span>Grand Assessment Exam (महा-मूल्याङ्कनम्)</span>
          </button>
        </div>

        {viewMode === 'flashcards' ? (
          <SanskritFlashcardStudio
            isAdmin={isEffectiveAdmin}
            onPlayAudio={handleAudioPlay}
            onOpenLesson={handleSelectLessonById}
          />
        ) : viewMode === 'exam' ? (
          <SanskritGrandExam
            isAdmin={isEffectiveAdmin}
            onSelectLessonById={handleSelectLessonById}
            onOpenCertificate={() => setIsCertificateModalOpen(true)}
            onGoToCurriculum={() => setViewMode('curriculum')}
          />
        ) : viewMode === 'curriculum' ? (

          /* Main Two-Column Layout */
          <div className="stc-layout">

          {/* Module Navigation Sidebar */}
          <aside className="stc-sidebar">
            <h2 className="stc-sidebar-title">
              <span>6 Modules · षड्-विभागाः</span>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>28 Lessons</span>
            </h2>

            {COURSE_MODULES.map((module) => {
              const isOpen = activeModuleId === module.id;
              const moduleCompletedCount = module.lessons.filter((l) => completedLessonIds.has(l.id)).length;

              return (
                <div key={module.id} className="stc-module-group">
                  <button
                    type="button"
                    className={`stc-module-header ${isOpen ? 'active' : ''}`}
                    onClick={() => setActiveModuleId(module.id)}
                  >
                    <div className="stc-module-header-left">
                      <span className="stc-module-icon">{module.icon}</span>
                      <div>
                        <div className="stc-module-name">{module.titleDevanagari}</div>
                        <div className="stc-module-badge">
                          Module {module.moduleNumber} · {moduleCompletedCount}/{module.lessons.length} done
                        </div>
                      </div>
                    </div>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{isOpen ? '▲' : '▼'}</span>
                  </button>

                  {isOpen && (
                    <div className="stc-lesson-list">
                      {module.lessons.map((lesson) => {
                        const isCurrent = lesson.id === currentLesson.id;
                        const isDone = completedLessonIds.has(lesson.id);

                        return (
                          <button
                            key={lesson.id}
                            type="button"
                            className={`stc-lesson-btn ${isCurrent ? 'active' : ''}`}
                            onClick={() => handleSelectLesson(lesson)}
                          >
                            <span>
                              <strong>{lesson.lessonNumber}</strong> {lesson.titleDevanagari}
                            </span>
                            {isDone && <span className="stc-lesson-btn-check" title="Completed">✓</span>}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </aside>

          {/* Active Lesson View */}
          <main className="stc-content">
            <header className="stc-lesson-header">
              <span className="stc-lesson-kicker">
                Module {currentModule.moduleNumber} · {currentModule.titleEnglish} · Lesson {currentLesson.lessonNumber}
              </span>
              <h2 className="stc-lesson-main-title">{currentLesson.titleDevanagari}</h2>
              <div className="stc-lesson-sub-title">{currentLesson.titleEnglish}</div>
              <p className="stc-lesson-lead">{currentLesson.shortDescription}</p>
            </header>

            {/* STEP 1: The Idea (धारणा) */}
            <section className="stc-step-section stc-step--idea" aria-labelledby="step-idea">
              <div className="stc-step-section-header">
                <span className="stc-step-badge">Step 1</span>
                <h3 id="step-idea" className="stc-step-title">💡 The Idea (धारणा) — {currentLesson.ideaConcept.heading}</h3>
              </div>
              <p style={{ fontWeight: 700, color: '#134e4a', fontSize: '1.05rem', margin: '0 0 0.85rem' }}>
                {currentLesson.ideaConcept.summary}
              </p>
              {currentLesson.ideaConcept.body.map((p, idx) => (
                <p key={idx} style={{ lineHeight: 1.6, color: '#334155', margin: '0 0 0.75rem' }}>{p}</p>
              ))}
              <div className="stc-idea-takeaway">
                🔑 <strong>Key Takeaway:</strong> {currentLesson.ideaConcept.keyTakeaway}
              </div>
            </section>

            {/* STEP 2: The Sound (ध्वनिः) */}
            <section className="stc-step-section stc-step--sound" aria-labelledby="step-sound">
              <div className="stc-step-section-header">
                <span className="stc-step-badge">Step 2</span>
                <h3 id="step-sound" className="stc-step-title">🔊 The Sound (ध्वनिः) — Listen &amp; Repeat</h3>
              </div>

              <p style={{ margin: '0 0 0.5rem', color: '#78350f', fontWeight: 600 }}>
                Listen to each acoustic vibration, pay attention to the place of articulation, and repeat aloud with your full chest voice:
              </p>

              {/* Sequential Chanting Controls */}
              <div className="stc-sound-header-controls">
                <button
                  type="button"
                  className={`stc-play-all-btn ${isPlayingSequence ? 'playing' : ''}`}
                  onClick={() => playSequence(currentLesson.soundPractice.audioTerms)}
                  aria-label="Play all audio terms in sequence"
                >
                  {isPlayingSequence ? '⏹️ Stop Playback' : '▶️ Play All in Sequence (श्रवण-माला)'}
                </button>
                <span className="stc-sound-subtext">
                  {isPlayingSequence
                    ? 'Continuous chanting active · listen and repeat aloud!'
                    : 'Listen one-by-one or chant continuously in sequence'}
                </span>
              </div>

              <div className="stc-audio-chips-grid">
                {currentLesson.soundPractice.audioTerms.map((term, idx) => (
                  <div
                    key={idx}
                    className={`stc-audio-chip-card ${activeAudioIndex === idx ? 'active-term' : ''}`}
                  >
                    <div>
                      <div className="stc-chip-devanagari">{term.devanagari}</div>
                      <div className="stc-chip-iast">{term.iast}</div>
                      <div className="stc-chip-meaning">{term.meaning}</div>
                    </div>
                    <button
                      type="button"
                      className="stc-audio-play-btn"
                      onClick={() => handleAudioPlay(term.devanagari)}
                      title={`Listen to pronunciation of ${term.devanagari}`}
                      aria-label={`Play audio for ${term.devanagari}`}
                    >
                      🔊
                    </button>
                  </div>
                ))}
              </div>

              <div className="stc-phonetic-box">
                <p style={{ margin: '0 0 0.35rem', fontWeight: 700 }}>🗣️ Phonetic Placement Guide:</p>
                <p style={{ margin: '0 0 0.45rem' }}>{currentLesson.soundPractice.phoneticInstructions}</p>
                <p style={{ margin: 0, fontStyle: 'italic', fontSize: '0.85rem' }}>
                  💡 Recitation Tip: {currentLesson.soundPractice.recitationTips}
                </p>
              </div>
            </section>

            {/* STEP 3: The Rule (विधिः) */}
            <section className="stc-step-section stc-step--rule" aria-labelledby="step-rule">
              <div className="stc-step-section-header">
                <span className="stc-step-badge">Step 3</span>
                <h3 id="step-rule" className="stc-step-title">📐 The Rule (विधिः) — {currentLesson.ruleMechanics.title}</h3>
              </div>

              {currentLesson.ruleMechanics.formula && (
                <div style={{ background: '#eef2ff', border: '1px solid #c7d2fe', padding: '0.75rem 1rem', borderRadius: 8, fontWeight: 800, color: '#3730a3', margin: '0 0 1rem' }}>
                  ⚡ Morphological Formula: {currentLesson.ruleMechanics.formula}
                </div>
              )}

              {currentLesson.ruleMechanics.explanation?.map((exp, idx) => (
                <p key={idx} style={{ lineHeight: 1.6, color: '#1e293b', margin: '0 0 0.75rem' }}>{exp}</p>
              ))}

              {currentLesson.ruleMechanics.tableData && (
                <div className="stc-table-wrapper">
                  <table className="stc-table">
                    <thead>
                      <tr>
                        {currentLesson.ruleMechanics.tableData.headers.map((h, i) => (
                          <th key={i}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {currentLesson.ruleMechanics.tableData.rows.map((row, rIdx) => (
                        <tr key={rIdx}>
                          {row.map((cell, cIdx) => (
                            <td key={cIdx}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {currentLesson.ruleMechanics.sutraReference && (
                <div className="stc-sutra-callout">
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#6d28d9' }}>
                        Pāṇinian Sūtra Canonical Rule:
                      </span>
                      <div className="stc-sutra-sanskrit">{currentLesson.ruleMechanics.sutraReference.devanagari}</div>
                      <div style={{ fontSize: '0.82rem', color: '#5b21b6' }}>{currentLesson.ruleMechanics.sutraReference.iast}</div>
                    </div>
                    <button
                      type="button"
                      className="stc-audio-play-btn"
                      style={{ flexShrink: 0, marginTop: '0.25rem', background: '#ede9fe', borderColor: '#c4b5fd' }}
                      onClick={() => handleAudioPlay(currentLesson.ruleMechanics.sutraReference!.devanagari)}
                      title="Listen to canonical sūtra recitation"
                      aria-label={`Play audio for ${currentLesson.ruleMechanics.sutraReference.devanagari}`}
                    >
                      🔊
                    </button>
                  </div>
                  <div className="stc-sutra-meaning">“{currentLesson.ruleMechanics.sutraReference.meaning}”</div>
                </div>
              )}
            </section>

            {/* STEP 4: Practice (अभ्यासः) */}
            <section className="stc-step-section stc-step--practice" aria-labelledby="step-practice">
              <div className="stc-step-section-header">
                <span className="stc-step-badge">Step 4</span>
                <h3 id="step-practice" className="stc-step-title">✍️ Practice (अभ्यासः) — Interactive Drill &amp; Worksheets</h3>
              </div>

              {/* Interactive Quick Quiz */}
              <div className="stc-quiz-box">
                <div className="stc-quiz-prompt">
                  Check Your Understanding: {currentLesson.practice.quickQuiz.prompt}
                </div>
                <div className="stc-quiz-options">
                  {currentLesson.practice.quickQuiz.options.map((opt, optIdx) => {
                    const selected = quizAnswers[currentLesson.id];
                    const isPicked = selected === optIdx;
                    const isCorrect = optIdx === currentLesson.practice.quickQuiz.correctIndex;
                    let optClass = 'stc-quiz-opt-btn';
                    if (selected !== undefined && selected !== null) {
                      if (isCorrect) optClass += ' correct';
                      else if (isPicked) optClass += ' wrong';
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        className={optClass}
                        onClick={() => handleQuizSelect(currentLesson.id, optIdx)}
                      >
                        <span>{String.fromCharCode(65 + optIdx)}.</span> {opt}
                        {isEffectiveAdmin && isCorrect && (
                          <span style={{ marginLeft: 'auto', background: '#dcfce7', color: '#166534', padding: '0.15rem 0.45rem', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800 }}>
                            Key ✓
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>


                {quizAnswers[currentLesson.id] !== undefined && quizAnswers[currentLesson.id] !== null && (
                  <div
                    className={`stc-quiz-feedback ${
                      quizAnswers[currentLesson.id] === currentLesson.practice.quickQuiz.correctIndex ? 'success' : 'error'
                    }`}
                  >
                    {quizAnswers[currentLesson.id] === currentLesson.practice.quickQuiz.correctIndex ? (
                      <div>
                        <strong>✓ साधु साधु! (Correct!)</strong> {currentLesson.practice.quickQuiz.explanation}
                      </div>
                    ) : (
                      <div>
                        <strong>पुनः प्रयतताम् (Try again):</strong> {currentLesson.practice.quickQuiz.explanation}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Expandable In-Lesson Practice Drills */}
              {(() => {
                const wsData = getCourseLessonWorksheet(
                  currentLesson.id,
                  currentLesson.lessonNumber,
                  currentLesson.titleDevanagari,
                  currentLesson.titleEnglish,
                  currentLesson.ideaConcept.heading,
                  currentLesson.ruleMechanics.title,
                  currentLesson.practice.quickQuiz.prompt,
                  currentLesson.practice.quickQuiz.options,
                  currentLesson.practice.quickQuiz.correctIndex,
                  currentLesson.practice.quickQuiz.explanation,
                  currentLesson.thinkingConnection.bridgeExplanation
                );
                const isDrillOpen = Boolean(showInteractiveDrills[currentLesson.id]);

                return (
                  <div className="stc-drills-toggle-row">
                    <button
                      type="button"
                      className="stc-drills-toggle-btn"
                      onClick={() =>
                        setShowInteractiveDrills((prev) => ({
                          ...prev,
                          [currentLesson.id]: !prev[currentLesson.id]
                        }))
                      }
                      aria-expanded={isDrillOpen}
                    >
                      <span>
                        📋 {isDrillOpen ? 'Hide' : 'Explore'} Lesson {currentLesson.lessonNumber} Practice Drills &amp; Exercises (अभ्यास-विस्तारः)
                      </span>
                      <span>{isDrillOpen ? '▲ Close' : '▼ View 4 Sections'}</span>
                    </button>

                    {isDrillOpen && (
                      <div className="stc-drills-panel">
                        {wsData.sections.map((sec, secIdx) => (
                          <div key={secIdx} className="stc-drill-section-box">
                            <div className="stc-drill-sec-header">
                              <span className="stc-drill-sec-title">
                                {sec.sectionTitleDevanagari} ({sec.sectionTitleEnglish})
                              </span>
                              <span className="stc-drill-marks-badge">{sec.totalMarks} Marks</span>
                            </div>
                            <p style={{ margin: '0 0 0.5rem', fontSize: '0.82rem', color: '#64748b', fontStyle: 'italic' }}>
                              {sec.instructions}
                            </p>
                            {sec.questions.map((q, qIdx) => (
                              <div key={qIdx} className="stc-drill-q-card">
                                <div className="stc-drill-q-prompt">
                                  {q.questionNumber}. {q.promptDevanagari}
                                </div>
                                <div className="stc-drill-q-eng">{q.promptEnglish}</div>
                                {q.optionsOrHints && (
                                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', margin: '0.35rem 0' }}>
                                    {q.optionsOrHints.map((opt, oIdx) => (
                                      <span key={oIdx} style={{ background: '#ffffff', border: '1px solid #cbd5e1', padding: '0.2rem 0.55rem', borderRadius: 4, fontSize: '0.78rem' }}>
                                        {opt}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Gated Worksheet Download Card */}
              <div className="stc-worksheet-gate-card">
                <div className="stc-worksheet-gate-left">
                  <div className="stc-worksheet-gate-title">
                    <span>📄</span>
                    <span>Download Lesson {currentLesson.lessonNumber} Worksheet &amp; Answer Key</span>
                  </div>
                  <p className="stc-worksheet-gate-desc">{currentLesson.practice.worksheetSummary}</p>
                </div>

                {hasPaid ? (
                  <button
                    type="button"
                    className="stc-worksheet-btn stc-worksheet-btn--unlocked"
                    onClick={() => handleWorksheetDownloadClick(currentLesson)}
                  >
                    <span>📥</span> View &amp; Print Worksheet
                  </button>
                ) : (
                  <button
                    type="button"
                    className="stc-worksheet-btn"
                    onClick={() => handleWorksheetDownloadClick(currentLesson)}
                  >
                    <span>🔒</span> {inTrial ? 'Downloads unlock after your trial' : currentUser ? 'Unlock Downloads (₹200 once)' : 'Sign in to download'}
                  </button>
                )}
              </div>
            </section>

            {/* STEP 5: Thinking Connection (चिन्तन-सेतुः) */}
            <section className="stc-step-section stc-step--thinking" aria-labelledby="step-thinking">
              <div className="stc-step-section-header">
                <span className="stc-step-badge">Step 5</span>
                <h3 id="step-thinking" className="stc-step-title">🧠 The Thinking Connection (चिन्तन-सेतुः)</h3>
              </div>

              <span className="stc-thinking-badge">{currentLesson.thinkingConnection.badgeLabel}</span>
              <div className="stc-thinking-heading">{currentLesson.thinkingConnection.heading}</div>
              <p className="stc-thinking-bridge">{currentLesson.thinkingConnection.bridgeExplanation}</p>
              <div className="stc-thinking-insight">
                💡 <strong>Modern Perspective:</strong> {currentLesson.thinkingConnection.modernInsight}
              </div>
            </section>

            {/* Linked Gurukul Platform Resources */}
            {currentLesson.linkedResources.length > 0 && (
              <div className="stc-resources-shelf">
                <div className="stc-resources-shelf-title">
                  <span>🔗</span>
                  <span>Related Gurukul Modules (Practice in Depth):</span>
                </div>
                <div className="stc-resources-links">
                  {currentLesson.linkedResources.map((res, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="stc-res-link-btn"
                      onClick={() => handleLinkedResourceClick(res)}
                    >
                      <span>{res.label}</span>
                      <span className="stc-res-badge">{res.badge}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Capstone Completion Callout for Lesson 6.4 */}
            {currentLesson.id === 'c-6-4' && (
              <div
                style={{
                  background: 'linear-gradient(135deg, #fefce8 0%, #fef3c7 100%)',
                  border: '2px solid #f59e0b',
                  borderRadius: '16px',
                  padding: '1.75rem',
                  margin: '1.75rem 0',
                  textAlign: 'center',
                  boxShadow: '0 10px 25px -5px rgba(245, 158, 11, 0.2)'
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '0.4rem' }}>🎓</div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#78350f', margin: '0 0 0.5rem' }}>
                  अभिनन्दनम्! You Have Reached the Capstone Synthesis
                </h3>
                <p style={{ color: '#92400e', maxWidth: '640px', margin: '0 auto 1.25rem', lineHeight: 1.6, fontSize: '0.94rem' }}>
                  You have traveled the complete arc from acoustic vibration (Śikṣā) and orthography (Devanāgarī) to morphological derivation (Pāṇini), syntactic disassembly (Anvaya), and contemplative vision (Darśana). You are eligible for the official Gurukul Certificate of Sanskrit Cognitive Mastery!
                </p>
                <button
                  type="button"
                  className="stc-crumb-btn"
                  style={{
                    background: '#b45309',
                    color: '#ffffff',
                    fontWeight: 800,
                    padding: '0.75rem 1.6rem',
                    fontSize: '1rem',
                    borderColor: '#92400e',
                    boxShadow: '0 4px 14px rgba(180, 83, 9, 0.35)'
                  }}
                  onClick={() => setIsCertificateModalOpen(true)}
                >
                  📜 Open &amp; Customize Your Gurukul Certificate
                </button>
              </div>
            )}

            {/* Mark as Done & Navigation Row */}
            <div className="stc-nav-buttons-row">
              <button
                type="button"
                className="stc-nav-prev-btn"
                disabled={!prevLesson}
                onClick={() => prevLesson && handleSelectLesson(prevLesson)}
              >
                ← Previous ({prevLesson?.lessonNumber || 'Start'})
              </button>

              <button
                type="button"
                className="stc-crumb-btn"
                style={{
                  background: completedLessonIds.has(currentLesson.id) ? '#ecfdf5' : '#ffffff',
                  color: completedLessonIds.has(currentLesson.id) ? '#065f46' : '#1e293b',
                  borderColor: completedLessonIds.has(currentLesson.id) ? '#10b981' : '#cbd5e1',
                  padding: '0.6rem 1.25rem'
                }}
                onClick={() => toggleLessonComplete(currentLesson.id)}
              >
                {completedLessonIds.has(currentLesson.id) ? '✓ Marked as Completed' : '○ Mark Lesson as Complete'}
              </button>

              <button
                type="button"
                className="stc-nav-next-btn"
                disabled={!nextLesson}
                onClick={() => nextLesson && handleSelectLesson(nextLesson)}
              >
                Next ({nextLesson?.lessonNumber || 'End'}) →
              </button>
            </div>
          </main>
        </div>
        ) : (
          /* Course Addendum: 11 Masterclasses & Foundational Units Layout */
          <div className="stc-addendum-container">
            {/* Addendum Sidebar Navigation */}
            <aside className="stc-addendum-sidebar">
              <h3 className="stc-addendum-sidebar-title">षड्दर्शनानि महा-पाठाश्च</h3>
              <p className="stc-addendum-sidebar-desc">
                Unabridged masterclasses on the 6 Darśanas, Sacred Geometry &amp; Cymatics, Tagore's Genius, Piṅgala's Binary System, Turaṅga-Bandha, and Līlāvatī's Poetic Mathematics.
              </p>
              <div className="stc-addendum-nav-list">
                {DARSHANAS_COURSE_ADDENDUM.map((art) => (
                  <button
                    key={art.id}
                    type="button"
                    className={`stc-addendum-nav-btn ${art.id === currentAddendum.id ? 'active' : ''}`}
                    onClick={() => {
                      setActiveAddendumId(art.id);
                      window.scrollTo({ top: 380, behavior: 'smooth' });
                    }}
                  >
                    <div className="stc-addendum-part-tag" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>{addendumPartLabel(art)} · {art.readingTimeMinutes} min</span>
                      {completedAddendumIds.has(art.id) && (
                        <span style={{ color: '#16a34a', fontWeight: 800, fontSize: '0.85rem' }} title="Masterclass completed">✓</span>
                      )}
                    </div>
                    <div className="stc-addendum-nav-title">{art.titleEnglish}</div>
                  </button>
                ))}
              </div>
              <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #f1ece1' }}>
                <button
                  type="button"
                  className="stc-crumb-btn"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => setViewMode('curriculum')}
                >
                  ← Return to 28 Lessons
                </button>
              </div>
            </aside>

            {/* Addendum Main Article */}
            <main className="stc-addendum-article" tabIndex={-1}>
              <header className="stc-addendum-article-header">
                <span className="stc-addendum-kicker">{currentAddendum.kicker}</span>
                <h1 className="stc-addendum-title-dev">{currentAddendum.titleDevanagari}</h1>
                <h2 className="stc-addendum-title-eng">{currentAddendum.titleEnglish}</h2>
                <div className="stc-addendum-sub">{currentAddendum.subtitle}</div>
                <div className="stc-addendum-meta-row">
                  <span>⏱️ {currentAddendum.readingTimeMinutes} min deep read</span>
                  <span>•</span>
                  <span>{currentAddendum.partLabel ? `Companion · ${currentAddendum.partLabel}` : currentAddendum.partNumber === 0 ? 'Prologue · The Study Covenant' : `Part ${currentAddendum.partNumber} of 9`}</span>
                  <span>•</span>
                  <span>Self-Discovery &amp; Universal Phenomenon</span>
                </div>
              </header>

              <div className="stc-addendum-summary-box">
                <strong>Summary &amp; Central Thesis:</strong> {currentAddendum.summary}
              </div>

              {currentAddendum.heroImage && (
                <figure className="stc-addendum-hero-figure" style={{ margin: '1.75rem auto 2rem', maxWidth: '820px', textAlign: 'center' }}>
                  <img
                    src={currentAddendum.heroImage.src}
                    alt={currentAddendum.heroImage.alt}
                    style={{
                      display: 'block',
                      width: '100%',
                      maxHeight: '620px',
                      objectFit: 'contain',
                      borderRadius: '16px',
                      boxShadow: '0 12px 36px rgba(15, 23, 42, 0.16)'
                    }}
                    loading="eager"
                  />
                  {currentAddendum.heroImage.caption && (
                    <figcaption style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.65rem', fontStyle: 'italic', lineHeight: 1.45 }}>
                      {currentAddendum.heroImage.caption}
                    </figcaption>
                  )}
                </figure>
              )}

              {currentAddendum.sections.map((sec, sIdx) => (
                <section key={sIdx} className="stc-addendum-section" id={sec.anchorId}>
                  <h3 className="stc-addendum-sec-h2">{sec.heading}</h3>
                  {sec.subheading && <div className="stc-addendum-sec-sub">{sec.subheading}</div>}
                  {sec.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="stc-addendum-para">{p}</p>
                  ))}

                  {sec.sutras && sec.sutras.map((sutra, suIdx) => sutra.mantraId && MANTRAS_BY_ID[sutra.mantraId] ? (
                    <ShantiMantraPlayer key={`${currentAddendum.id}-${suIdx}`} mantra={MANTRAS_BY_ID[sutra.mantraId]} onOpenVoiceSettings={onOpenVoiceSettings} />
                  ) : isShantiMantraText(sutra.sanskrit) ? (
                    <ShantiMantraPlayer key={`${currentAddendum.id}-${suIdx}`} onOpenVoiceSettings={onOpenVoiceSettings} />
                  ) : (
                    <div key={suIdx} className="stc-sutra-box">
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
                        <div>
                          <div className="stc-sutra-sanskrit">{sutra.sanskrit}</div>
                          <div className="stc-sutra-translit">{sutra.transliteration}</div>
                        </div>
                        <button
                          type="button"
                          className="stc-audio-play-btn"
                          style={{ flexShrink: 0, marginTop: '0.25rem' }}
                          onClick={() => handleAudioPlay(sutra.sanskrit)}
                          title="Listen to sūtra recitation"
                          aria-label={`Play audio for ${sutra.sanskrit}`}
                        >
                          🔊
                        </button>
                      </div>
                      <div className="stc-sutra-meaning">"{sutra.meaning}"</div>
                      <div className="stc-sutra-source">— {sutra.source}</div>
                    </div>
                  ))}

                  {sec.addendumLink && (
                    <div style={{ margin: '1rem 0' }}>
                      <button
                        type="button"
                        className="stc-crumb-btn"
                        onClick={() => openAddendum(sec.addendumLink!.addendumId)}
                      >
                        {sec.addendumLink.label} ➔
                      </button>
                    </div>
                  )}

                  {sec.callout && (
                    <div className={`stc-callout-box stc-callout--${sec.callout.type}`}>
                      <div className="stc-callout-title">
                        <span>
                          {sec.callout.type === 'philosophical'
                            ? '🪔'
                            : sec.callout.type === 'scientific'
                            ? '🔬'
                            : sec.callout.type === 'cosmological'
                            ? '🌌'
                            : '💡'}
                        </span>
                        <span>{sec.callout.title}</span>
                      </div>
                      <div style={{ fontStyle: 'italic' }}>{sec.callout.text}</div>
                    </div>
                  )}

                  {sec.image && (
                    <figure className="stc-addendum-figure">
                      <img
                        src={sec.image.src}
                        alt={sec.image.alt}
                        className="stc-addendum-img"
                        loading="lazy"
                      />
                      {sec.image.caption && (
                        <figcaption className="stc-addendum-figcaption">
                          {sec.image.caption}
                        </figcaption>
                      )}
                    </figure>
                  )}

                  {sec.diagram && (
                    <div className="stc-diagram-container" style={{ margin: '1.5rem 0' }}>
                      <div className="stc-diagram-header">
                        <span className="stc-diagram-badge">{sec.diagramTitle || '🧬 VĀK ARCHITECTURAL FLOW'}</span>
                        <span className="stc-diagram-sub">Descent of Consciousness into Form</span>
                      </div>
                      <pre className="stc-addendum-diagram">{sec.diagram}</pre>
                    </div>
                  )}

                  {sec.table && (
                    <div className="stc-table-wrapper" style={{ margin: '1.5rem 0' }}>
                      <table className="stc-table">
                        <thead>
                          <tr>
                            {sec.table.headers.map((th, hIdx) => (
                              <th key={hIdx}>{th}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {sec.table.rows.map((row, rIdx) => (
                            <tr key={rIdx}>
                              {row.map((td, dIdx) => (
                                <td key={dIdx}>{td}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </section>
              ))}

              {/* Interactive Computing & Strategy Studios for Masterclasses */}
              {currentAddendum.id === 'addendum-pingala-binary-blueprint' && (
                <div style={{ margin: '2.5rem 0' }}>
                  <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#7c3aed', background: '#f5f3ff', padding: '0.25rem 0.75rem', borderRadius: '9999px', border: '1px solid #ddd6fe' }}>
                      Interactive Computing Laboratory
                    </span>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1e1b4b', margin: '0.5rem 0 0.25rem' }}>
                      Ācārya Piṅgala’s Combinatorial Engine
                    </h3>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', maxWidth: '650px', margin: '0 auto' }}>
                      Experiment with the binary truth table generator (Prastāra), test bi-directional decimal-binary conversions (Naṣṭam &amp; Uddiṣṭam), and explore Pascal’s triangle (Meru Prastāra).
                    </p>
                  </div>
                  <PingalaPrastaraTruthTable onPlayAudio={handleAudioPlay} />
                  <PingalaNastamUddistamCodec />
                  <PingalaMeruPyramid />
                </div>
              )}

              {currentAddendum.id === 'addendum-turanga-bandha-knights-tour' && (
                <div style={{ margin: '2.5rem 0' }}>
                  <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#c2410c', background: '#fff7ed', padding: '0.25rem 0.75rem', borderRadius: '9999px', border: '1px solid #ffedd5' }}>
                      Interactive Chaturaṅga Laboratory
                    </span>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#431407', margin: '0.5rem 0 0.25rem' }}>
                      Turaṅga-Bandha Knight’s Tour Simulator
                    </h3>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', maxWidth: '650px', margin: '0 auto' }}>
                      Navigate an 8×4 Sanskrit chessboard through valid Knight jumps and watch Vedānta Deśika’s second verse (Pādukā Sahasram 930) assemble in real time!
                    </p>
                  </div>
                  <TurangaBandhaChessboard onPlayAudio={handleAudioPlay} />
                </div>
              )}

              {currentAddendum.id === 'addendum-lilavati-poetic-equation' && (
                <div style={{ margin: '2.5rem 0' }}>
                  <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0369a1', background: '#f0f9ff', padding: '0.25rem 0.75rem', borderRadius: '9999px', border: '1px solid #e0f2fe' }}>
                      Interactive Poetic Mathematics Studio
                    </span>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0c4a6e', margin: '0.5rem 0 0.25rem' }}>
                      Bhāskarāchārya’s Riddle Solver
                    </h3>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', maxWidth: '650px', margin: '0 auto' }}>
                      Adjust parameters to solve the Swarm of Bees quadratic, Pearl Necklace fractions, Sliding Peacock Pythagorean flight, and Submerged Lotus water depth.
                    </p>
                  </div>
                  <LilavatiPoeticMathStudio onPlayAudio={handleAudioPlay} />
                </div>
              )}

              {currentAddendum.id === 'addendum-cymatics-music-of-matter' && (
                <div style={{ margin: '2.5rem 0' }}>
                  <CymaticsHarmonicsStudio onPlayAudio={handleAudioPlay} />
                </div>
              )}

              <div className="stc-takeaways-card">
                <div className="stc-takeaways-title">
                  <span>📌</span>
                  <span>Key Takeaways &amp; Cognitive Architecture:</span>
                </div>
                <ul className="stc-takeaways-list">
                  {currentAddendum.keyTakeaways.map((point, kIdx) => (
                    <li key={kIdx}>{point}</li>
                  ))}
                </ul>
              </div>

              {/* Masterclass Completion Button */}
              <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0 1.25rem' }}>
                <button
                  type="button"
                  className="stc-crumb-btn"
                  style={{
                    background: completedAddendumIds.has(currentAddendum.id) ? '#ecfdf5' : '#ffffff',
                    color: completedAddendumIds.has(currentAddendum.id) ? '#065f46' : '#1e293b',
                    borderColor: completedAddendumIds.has(currentAddendum.id) ? '#10b981' : '#cbd5e1',
                    padding: '0.65rem 1.6rem',
                    fontSize: '0.95rem',
                    fontWeight: 800
                  }}
                  onClick={() => toggleAddendumComplete(currentAddendum.id)}
                >
                  {completedAddendumIds.has(currentAddendum.id) ? '✓ Masterclass Marked as Completed' : '○ Mark Masterclass as Complete'}
                </button>
              </div>

              <div className="stc-addendum-nav-row">
                <button
                  type="button"
                  className="stc-nav-prev-btn"
                  disabled={!prevAddendum}
                  onClick={() => {
                    if (prevAddendum) {
                      setActiveAddendumId(prevAddendum.id);
                      window.scrollTo({ top: 380, behavior: 'smooth' });
                    }
                  }}
                >
                  ← Previous {prevAddendum ? `(${addendumPartLabel(prevAddendum)})` : ''}
                </button>

                <button
                  type="button"
                  className="stc-crumb-btn"
                  onClick={() => setViewMode('curriculum')}
                >
                  Return to 28 Lessons
                </button>

                <button
                  type="button"
                  className="stc-nav-next-btn"
                  disabled={!nextAddendum}
                  onClick={() => {
                    if (nextAddendum) {
                      setActiveAddendumId(nextAddendum.id);
                      window.scrollTo({ top: 380, behavior: 'smooth' });
                    }
                  }}
                >
                  Next {nextAddendum ? `(${addendumPartLabel(nextAddendum)})` : ''} →
                </button>
              </div>
            </main>
          </div>
        )}

        {/* Modal: Comprehensive Gurukul Printable Study Worksheet & Answer Key */}
        {activeWorksheetModalLesson && (() => {
          const ws = getCourseLessonWorksheet(
            activeWorksheetModalLesson.id,
            activeWorksheetModalLesson.lessonNumber,
            activeWorksheetModalLesson.titleDevanagari,
            activeWorksheetModalLesson.titleEnglish,
            activeWorksheetModalLesson.ideaConcept.heading,
            activeWorksheetModalLesson.ruleMechanics.title,
            activeWorksheetModalLesson.practice.quickQuiz.prompt,
            activeWorksheetModalLesson.practice.quickQuiz.options,
            activeWorksheetModalLesson.practice.quickQuiz.correctIndex,
            activeWorksheetModalLesson.practice.quickQuiz.explanation,
            activeWorksheetModalLesson.thinkingConnection.bridgeExplanation
          );

          return (
            <div className="stc-modal-overlay" onClick={() => setActiveWorksheetModalLesson(null)}>
              <div className="stc-modal-card stc-worksheet-modal" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  className="stc-modal-close stc-print-hide"
                  onClick={() => setActiveWorksheetModalLesson(null)}
                  aria-label="Close modal"
                >
                  ✕
                </button>

                {/* Printable Official Worksheet Header */}
                <div className="stc-ws-header-sheet">
                  <div className="stc-ws-crest">
                    गुरुकुल-पाठ्यक्रमः · EdNet Learn Sanskrit Thinking Academy
                  </div>
                  <h2 className="stc-ws-title-dev">
                    {ws.worksheetTitleDevanagari}
                  </h2>
                  <div className="stc-ws-title-eng">
                    {ws.worksheetTitleEnglish}
                  </div>
                  <div style={{ fontSize: '0.86rem', color: '#64748b' }}>
                    {ws.subtitle}
                  </div>

                  {/* Student Metadata Table */}
                  <div className="stc-ws-meta-row-grid">
                    <div className="stc-ws-meta-cell">
                      <strong>छात्रस्य नाम (Student Name):</strong> ___________________________
                    </div>
                    <div className="stc-ws-meta-cell">
                      <strong>दिनाङ्कः (Date):</strong> ____________
                    </div>
                    <div className="stc-ws-meta-cell">
                      <strong>पूर्णाङ्काः (Max Marks):</strong> {ws.maxMarks} ({ws.durationMinutes} min)
                    </div>
                  </div>
                </div>

                {/* Learning Outcomes */}
                <div className="stc-ws-outcomes-card">
                  <strong style={{ display: 'block', marginBottom: '0.35rem' }}>
                    🎯 अधिगम-उद्देश्यानि (Core Learning Outcomes Tested):
                  </strong>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', lineHeight: 1.5 }}>
                    {ws.learningOutcomes.map((lo, lIdx) => (
                      <li key={lIdx}>{lo}</li>
                    ))}
                  </ul>
                </div>

                {/* 4 Sections of the Worksheet */}
                {ws.sections.map((section, sIdx) => (
                  <div key={sIdx} className="stc-ws-section-wrapper">
                    <div className="stc-ws-section-banner">
                      <span className="stc-ws-sec-name">
                        {section.sectionTitleDevanagari} ({section.sectionTitleEnglish})
                      </span>
                      <span className="stc-drill-marks-badge">
                        अङ्काः (Marks): {section.totalMarks}
                      </span>
                    </div>

                    <p className="stc-ws-sec-instr">{section.instructions}</p>

                    {section.questions.map((q, qIdx) => (
                      <div key={qIdx} className="stc-ws-q-block">
                        <div className="stc-ws-q-top">
                          <span className="stc-ws-q-title">
                            प्रश्नः {q.questionNumber}. {q.promptDevanagari}
                          </span>
                          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0f766e' }}>
                            [{q.marks} Marks]
                          </span>
                        </div>
                        <div className="stc-ws-q-eng-sub">{q.promptEnglish}</div>

                        {q.optionsOrHints && (
                          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', margin: '0.4rem 0' }}>
                            {q.optionsOrHints.map((opt, oIdx) => (
                              <span
                                key={oIdx}
                                style={{
                                  background: '#f8fafc',
                                  border: '1px solid #cbd5e1',
                                  padding: '0.25rem 0.65rem',
                                  borderRadius: 4,
                                  fontSize: '0.82rem'
                                }}
                              >
                                ({String.fromCharCode(65 + oIdx)}) {opt}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="stc-ws-writein-area">
                          <div className="stc-ws-writein-line" />
                          <div className="stc-ws-writein-line" />
                        </div>
                      </div>
                    ))}
                  </div>
                ))}

                {/* Contemplative Synthesis Box */}
                {ws.contemplativePrompt && (
                  <div className="stc-ws-section-wrapper">
                    <div className="stc-ws-section-banner" style={{ borderLeftColor: '#7c3aed' }}>
                      <span className="stc-ws-sec-name">
                        चिन्तन-सेतुः · स्वाध्याय-मन्थनम् (Deep Contemplative Reflection)
                      </span>
                      <span className="stc-drill-marks-badge" style={{ background: '#f5f3ff', color: '#6d28d9', borderColor: '#ddd6fe' }}>
                        अङ्काः (Marks): 5
                      </span>
                    </div>
                    <div className="stc-ws-q-block">
                      <div className="stc-ws-q-title">
                        {ws.contemplativePrompt.promptDevanagari}
                      </div>
                      <div className="stc-ws-q-eng-sub">
                        {ws.contemplativePrompt.promptEnglish}
                      </div>
                      <ul style={{ fontSize: '0.82rem', color: '#64748b', margin: '0.35rem 0 0.75rem', paddingLeft: '1.25rem' }}>
                        {ws.contemplativePrompt.guidingQuestions.map((gq, gIdx) => (
                          <li key={gIdx}>{gq}</li>
                        ))}
                      </ul>
                      <div className="stc-ws-writein-area">
                        <div className="stc-ws-writein-line" />
                        <div className="stc-ws-writein-line" />
                        <div className="stc-ws-writein-line" />
                        <div className="stc-ws-writein-line" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Evaluation Rubric Grid */}
                <div className="stc-ws-rubric-box">
                  <strong style={{ fontSize: '0.88rem', color: '#78350f' }}>
                    📊 मूल्याङ्कन-सारणी (Teacher / Self-Assessment Grading Grid):
                  </strong>
                  <table className="stc-ws-rubric-table">
                    <thead>
                      <tr>
                        <th>विभागः क (Acoustics)</th>
                        <th>विभागः ख (Morphology)</th>
                        <th>विभागः ग (Syntax)</th>
                        <th>विभागः घ (Contemplation)</th>
                        <th>सम्पूर्ण-अङ्काः (Total)</th>
                        <th>श्रेणी (Grade)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>___ / 5</td>
                        <td>___ / 8</td>
                        <td>___ / 7</td>
                        <td>___ / 5</td>
                        <td><strong>___ / 25</strong></td>
                        <td>A+ / A / B</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Verified Answer Key & Model Answers (Toggleable) */}
                <div className="stc-print-hide" style={{ margin: '1.5rem 0' }}>
                  <button
                    type="button"
                    className="stc-crumb-btn"
                    style={{
                      background: showAnswerKeyInModal ? '#dcfce7' : '#f8fafc',
                      color: showAnswerKeyInModal ? '#166534' : '#1e293b',
                      borderColor: showAnswerKeyInModal ? '#86efac' : '#cbd5e1',
                      padding: '0.65rem 1.25rem',
                      fontWeight: 800,
                      width: '100%',
                      justifyContent: 'center'
                    }}
                    onClick={() => setShowAnswerKeyInModal((prev) => !prev)}
                  >
                    {showAnswerKeyInModal ? '▲ Hide Verified Answer Key' : '👁️ View Verified Answer Key & Model Solutions (उत्तर-पत्रिका)'}
                  </button>
                </div>

                {showAnswerKeyInModal && (
                  <div className="stc-ws-answer-key-section">
                    <div className="stc-ws-ak-title">
                      <span>✓</span>
                      <span>सम्पूर्ण-उत्तर-पत्रिका (Official Verified Answer Key &amp; Explanations):</span>
                    </div>

                    {ws.sections.map((section, secIdx) => (
                      <div key={secIdx} style={{ marginBottom: '1rem' }}>
                        <div style={{ fontWeight: 800, color: '#166534', fontSize: '0.9rem', marginBottom: '0.4rem' }}>
                          {section.sectionTitleDevanagari} ({section.sectionTitleEnglish}):
                        </div>
                        {section.questions.map((q, qIdx) => (
                          <div key={qIdx} className="stc-ws-ak-item">
                            <div>
                              <span className="stc-ws-ak-q-num">Q{q.questionNumber}:</span>
                              <span className="stc-ws-ak-answer">{q.answer}</span>
                            </div>
                            <div className="stc-ws-ak-expl">💡 {q.explanation}</div>
                          </div>
                        ))}
                      </div>
                    ))}

                    {ws.contemplativePrompt && (
                      <div style={{ marginTop: '1rem', borderTop: '1px solid #bbf7d0', paddingTop: '0.75rem' }}>
                        <strong style={{ color: '#166534', fontSize: '0.88rem' }}>
                          🧠 Model Contemplative Reflection (आदर्श-चिन्तनम्):
                        </strong>
                        <p style={{ margin: '0.35rem 0 0', fontSize: '0.85rem', color: '#1e293b', lineHeight: 1.5, fontStyle: 'italic' }}>
                          "{ws.contemplativePrompt.modelReflection}"
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Modal Footer Action Buttons */}
                <div
                  className="stc-print-hide"
                  style={{
                    display: 'flex',
                    gap: '0.75rem',
                    justifyContent: 'flex-end',
                    flexWrap: 'wrap',
                    marginTop: '1.5rem',
                    borderTop: '1px solid #e2e8f0',
                    paddingTop: '1rem'
                  }}
                >
                  <button
                    type="button"
                    className="stc-crumb-btn"
                    onClick={() => window.print()}
                    style={{ padding: '0.6rem 1.25rem', background: '#0f766e', color: '#ffffff', borderColor: '#0f766e' }}
                  >
                    🖨️ Print Complete Worksheet
                  </button>
                  <button
                    type="button"
                    className="stc-worksheet-btn stc-worksheet-btn--unlocked"
                    onClick={() => {
                      setActiveWorksheetModalLesson(null);
                      setShowAnswerKeyInModal(false);
                    }}
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Modal: Official Gurukul Certificate of Sanskrit Cognitive Mastery */}
        {isCertificateModalOpen && (
          <div className="stc-modal-overlay" onClick={() => setIsCertificateModalOpen(false)}>
            <div className="stc-cert-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="stc-cert-top-bar stc-print-hide">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.35rem' }}>📜</span>
                  <div>
                    <div style={{ fontWeight: 800, color: '#78350f', fontSize: '0.96rem' }}>
                      Official Gurukul Certificate of Completion
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                      संस्कृत-चिन्तन-प्रमाणपत्रम् · Verified Credential
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <button
                    type="button"
                    className="stc-crumb-btn"
                    style={{ background: '#047857', color: '#ffffff', borderColor: '#065f46', fontWeight: 800 }}
                    onClick={() => window.print()}
                  >
                    🖨️ Print / Save as PDF
                  </button>
                  <button
                    type="button"
                    className="stc-modal-close"
                    onClick={() => setIsCertificateModalOpen(false)}
                    aria-label="Close certificate modal"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="stc-cert-scroll-wrap">
                {/* Student Name Editor (Print-hidden) */}
                <div
                  className="stc-print-hide"
                  style={{
                    background: '#f8fafc',
                    border: '1.5px solid #e2e8f0',
                    borderRadius: '10px',
                    padding: '0.85rem 1.25rem',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '0.75rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flex: '1 1 280px' }}>
                    <label htmlFor="stc-cert-name" style={{ fontSize: '0.86rem', fontWeight: 800, color: '#334155', whiteSpace: 'nowrap' }}>
                      Recipient Name:
                    </label>
                    <input
                      id="stc-cert-name"
                      type="text"
                      value={studentName}
                      onChange={(e) => {
                        const val = e.target.value;
                        setStudentName(val);
                        try { localStorage.setItem('stc_student_name', val); } catch {}
                      }}
                      placeholder="Enter recipient name"
                      style={{
                        flex: 1,
                        padding: '0.45rem 0.85rem',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.94rem',
                        fontWeight: 700,
                        color: '#0f172a'
                      }}
                    />
                  </div>
                  <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                    💡 Customize your name to display on the official parchment.
                  </span>
                </div>

                {/* THE PARCHMENT SHEET */}
                <div className="stc-cert-parchment">
                  {/* Classical Vedic Corners */}
                  <div className="stc-cert-corner stc-cert-corner--tl">⚜</div>
                  <div className="stc-cert-corner stc-cert-corner--tr">⚜</div>
                  <div className="stc-cert-corner stc-cert-corner--bl">⚜</div>
                  <div className="stc-cert-corner stc-cert-corner--br">⚜</div>

                  <div className="stc-cert-watermark">ॐ</div>

                  <div className="stc-cert-inner-border">
                    {/* Gurukul Seal & Header */}
                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ fontSize: '0.82rem', fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#92400e', marginBottom: '0.25rem' }}>
                        ॥ ॐ श्री गुरुभ्यो नमः ॥
                      </div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#78350f', fontStyle: 'italic', marginBottom: '0.75rem' }}>
                        विद्ययाऽमृतमश्नुते · विद्या ददाति विनयं विनयाद्याति पात्रताम्
                      </div>
                      <h1 className="stc-cert-main-title" style={{ fontFamily: 'serif', fontSize: '2.1rem', fontWeight: 900, color: '#78350f', margin: '0.25rem 0', letterSpacing: '0.02em' }}>
                        संस्कृत-चिन्तन-प्रमाणपत्रम्
                      </h1>
                      <div style={{ fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#b45309' }}>
                        Gurukul Certificate of Sanskrit Cognitive Mastery
                      </div>
                    </div>

                    <div style={{ width: '80px', height: '2px', background: '#b45309', margin: '0.75rem auto 1.25rem' }} />

                    <div style={{ fontStyle: 'italic', fontSize: '0.98rem', color: '#451a03', marginBottom: '0.4rem' }}>
                      This is to certify with academic and contemplative honor that
                    </div>

                    {/* Recipient Name in Regal Typography */}
                    <div className="stc-cert-recipient" style={{ fontFamily: 'Georgia, serif', fontSize: '2.25rem', fontWeight: 800, color: '#1e3a8a', padding: '0.4rem 0', textDecoration: 'underline double #b45309', margin: '0.4rem 0 0.85rem' }}>
                      {studentName || 'विद्वान् / विदुषी'}
                    </div>

                    <p style={{ maxWidth: '680px', margin: '0 auto 1.4rem', lineHeight: 1.65, color: '#334155', fontSize: '0.94rem' }}>
                      has diligently studied and successfully demonstrated mastery over the complete curriculum of
                      <strong> संस्कृत-चिन्तनम् (Sanskrit as a Way of Thinking)</strong>, spanning all 6 Core Modules (28 Lessons) and 11 Advanced Masterclasses in Pāṇinian Grammatical Mechanics, Computational Binary Logic, Chaturaṅga Strategy, and Classical Darśana Epistemology.
                    </p>

                    {/* 6 Pedagogical Pillars Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.65rem', maxWidth: '750px', margin: '0 auto 1.6rem', textAlign: 'left' }}>
                      <div style={{ background: '#fdf6ec', border: '1px solid #fed7aa', padding: '0.5rem 0.65rem', borderRadius: '6px', fontSize: '0.75rem' }}>
                        <strong style={{ color: '#9a3412', display: 'block' }}>1. ध्वनिः (Śikṣā)</strong>
                        Acoustic calibration &amp; articulation points
                      </div>
                      <div style={{ background: '#fdf6ec', border: '1px solid #fed7aa', padding: '0.5rem 0.65rem', borderRadius: '6px', fontSize: '0.75rem' }}>
                        <strong style={{ color: '#9a3412', display: 'block' }}>2. लिपिः (Orthography)</strong>
                        Devanāgarī abugida &amp; syllable duration
                      </div>
                      <div style={{ background: '#fdf6ec', border: '1px solid #fed7aa', padding: '0.5rem 0.65rem', borderRadius: '6px', fontSize: '0.75rem' }}>
                        <strong style={{ color: '#9a3412', display: 'block' }}>3. विधिः (Grammar)</strong>
                        Pāṇinian sūtras, dhātus, &amp; sandhi logic
                      </div>
                      <div style={{ background: '#fdf6ec', border: '1px solid #fed7aa', padding: '0.5rem 0.65rem', borderRadius: '6px', fontSize: '0.75rem' }}>
                        <strong style={{ color: '#9a3412', display: 'block' }}>4. वाक्यम् (Syntax)</strong>
                        Kārakas, vibhaktis &amp; anvaya synthesis
                      </div>
                      <div style={{ background: '#fdf6ec', border: '1px solid #fed7aa', padding: '0.5rem 0.65rem', borderRadius: '6px', fontSize: '0.75rem' }}>
                        <strong style={{ color: '#9a3412', display: 'block' }}>5. तर्कः (Science)</strong>
                        Piṅgala binary logic &amp; Vedic maths
                      </div>
                      <div style={{ background: '#fdf6ec', border: '1px solid #fed7aa', padding: '0.5rem 0.65rem', borderRadius: '6px', fontSize: '0.75rem' }}>
                        <strong style={{ color: '#9a3412', display: 'block' }}>6. दर्शनम् (Vision)</strong>
                        6 Darśanas &amp; Upaniṣadic contemplation
                      </div>
                    </div>

                    {/* Authentication Row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid #fed7aa', paddingTop: '1.25rem', marginTop: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                      <div style={{ textAlign: 'left', fontSize: '0.8rem', color: '#64748b' }}>
                        <div><strong>Verification Code:</strong> STC-GK-{(studentName || 'LEARNER').slice(0, 3).toUpperCase()}-2026</div>
                        <div><strong>Curriculum Progress:</strong> {completedLessonIds.size}/28 Lessons · {completedAddendumIds.size}/11 Masterclasses</div>
                        {typeof window !== 'undefined' && localStorage.getItem('stc_grand_exam_score') && (
                          <div style={{ color: '#92400e', fontWeight: 700, margin: '0.15rem 0' }}>
                            <strong>Grand Assessment Exam:</strong> {localStorage.getItem('stc_grand_exam_score')} ({localStorage.getItem('stc_grand_exam_percent')}) · {localStorage.getItem('stc_grand_exam_grade')}
                          </div>
                        )}
                        <div><strong>Awarded on:</strong> {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                      </div>

                      {/* Golden Embossed Seal Motif */}
                      <div style={{ width: '85px', height: '85px', borderRadius: '50%', border: '3px solid #b45309', background: 'radial-gradient(circle, #fef3c7 20%, #fde68a 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(180, 83, 9, 0.25)', flexShrink: 0, margin: '0 auto' }}>
                        <span style={{ fontSize: '1.4rem' }}>ॐ</span>
                        <span style={{ fontSize: '0.58rem', fontWeight: 800, color: '#92400e', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          GURUKUL SEAL
                        </span>
                      </div>

                      <div style={{ textAlign: 'right', fontSize: '0.82rem', color: '#451a03' }}>
                        <div style={{ fontFamily: 'cursive', fontSize: '1.15rem', color: '#78350f', borderBottom: '1px solid #b45309', paddingBottom: '0.25rem', marginBottom: '0.25rem' }}>
                          आचार्यः सोमदेवः
                        </div>
                        <div><strong>Academic Council / परीक्षा-संसद्</strong></div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Sanskrit Cognitive Studies Center</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SanskritThinkingCourse;
