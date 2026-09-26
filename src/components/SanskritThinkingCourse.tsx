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

/** Sidebar / nav label for an addendum unit. */
const addendumPartLabel = (art: DarshanaAddendumArticle): string =>
  art.partLabel || (art.partNumber === 0 ? 'Prologue' : `Part ${art.partNumber}`);

/**
 * Course deep links (hash on /course):
 *   #mantras                 → Mantras & Ślokas unit
 *   #mantra-<id>             → Mantras & Ślokas unit, scrolled to that verse
 *   #addendum-<id|slug>      → any addendum unit
 *   #lesson-<id>             → a curriculum lesson (e.g. #lesson-c-6-1)
 */
const parseCourseHash = (): { addendumId?: string; lessonId?: string; anchor?: string } => {
  if (typeof window === 'undefined') return {};
  const h = decodeURIComponent((window.location.hash || '').replace(/^#/, '')).trim();
  if (!h) return {};
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
  const hasPaid = hasPaidAccess(currentUser, isAdminLoggedIn);
  const [hashTarget] = useState(parseCourseHash);
  const inTrial = hasPremiumAccess(currentUser, isAdminLoggedIn) && !hasPaid;

  // View mode: 'curriculum' (28 Lessons) vs 'addendum' (4 Foundational Essays)
  const [viewMode, setViewMode] = useState<'curriculum' | 'addendum'>(
    hashTarget.addendumId || initialAddendumId ? 'addendum' : hashTarget.lessonId ? 'curriculum' : initialMode
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

  const progressPercent = Math.round((completedLessonIds.size / allLessons.length) * 100);

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

          <div>
            {hasPaid ? (
              <span className="stc-sub-pill stc-sub-pill--active">
                ⭐ ₹200 Active Access · Worksheets &amp; Answer Keys Unlocked
              </span>
            ) : inTrial ? (
              <span className="stc-sub-pill stc-sub-pill--trial" onClick={onOpenPayment} style={{ cursor: 'pointer' }}>
                🎁 14-Day Free Trial · All 28 Lessons Open · Tap to Unlock Downloads (₹200)
              </span>
            ) : (
              <span className="stc-sub-pill stc-sub-pill--guest" onClick={onOpenRegister} style={{ cursor: 'pointer' }}>
                ✨ Free Trial Available · Sign In / Register (₹200 One-Time Access)
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
            <span className="stc-progress-label">
              Course Progress: {completedLessonIds.size} / {allLessons.length} Lessons
            </span>
            <div className="stc-progress-bar-wrap" aria-label={`Course progress ${progressPercent}%`}>
              <div className="stc-progress-bar-fill" style={{ width: `${progressPercent}%` }} />
            </div>
            <span className="stc-progress-percent">{progressPercent}%</span>
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

        {/* Course View Mode Switcher (Curriculum vs Addendum) */}
        <div className="stc-view-selector" role="tablist" aria-label="Course section selector">
          <button
            type="button"
            role="tab"
            aria-selected={viewMode === 'curriculum'}
            className={`stc-view-tab-btn ${viewMode === 'curriculum' ? 'active' : ''}`}
            onClick={() => setViewMode('curriculum')}
          >
            <span>📚</span>
            <span>28 Course Curriculum Lessons (२८ पाठाः)</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={viewMode === 'addendum'}
            className={`stc-view-tab-btn ${viewMode === 'addendum' ? 'active' : ''}`}
            onClick={() => setViewMode('addendum')}
          >
            <span>🪔</span>
            <span>Course Addendum: Prologue, Mantras &amp; Ślokas, 4 Foundational Essays (अनुबन्धाः)</span>
          </button>
        </div>

        {viewMode === 'curriculum' ? (
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
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#6d28d9' }}>
                    Pāṇinian Sūtra Canonical Rule:
                  </span>
                  <div className="stc-sutra-sanskrit">{currentLesson.ruleMechanics.sutraReference.devanagari}</div>
                  <div style={{ fontSize: '0.82rem', color: '#5b21b6' }}>{currentLesson.ruleMechanics.sutraReference.iast}</div>
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
                    <span>🔒</span> Unlock Downloads (₹200)
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
          /* Course Addendum: 4 Foundational Essays Layout */
          <div className="stc-addendum-container">
            {/* Addendum Sidebar Navigation */}
            <aside className="stc-addendum-sidebar">
              <h3 className="stc-addendum-sidebar-title">षड्दर्शनानि साङ्ख्यं च</h3>
              <p className="stc-addendum-sidebar-desc">
                Foundational essays on the 6 Darśanas, cosmic taxonomy, self-discovery, and the evolution of Vedic mathematics.
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
                    <div className="stc-addendum-part-tag">
                      {addendumPartLabel(art)} · {art.readingTimeMinutes} min
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
                  <span>{currentAddendum.partLabel ? `Companion · ${currentAddendum.partLabel}` : currentAddendum.partNumber === 0 ? 'Prologue · The Study Covenant' : `Part ${currentAddendum.partNumber} of 5`}</span>
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
                      <div className="stc-sutra-sanskrit">{sutra.sanskrit}</div>
                      <div className="stc-sutra-translit">{sutra.transliteration}</div>
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
      </div>
    </div>
  );
};

export default SanskritThinkingCourse;
