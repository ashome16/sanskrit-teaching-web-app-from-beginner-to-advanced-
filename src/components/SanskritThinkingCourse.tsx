import React, { useState, useEffect, useMemo } from 'react';
import {
  COURSE_MODULES,
  SANSKRIT_THINKING_COURSE_METADATA,
  type CourseLesson,
  type CourseModule,
} from '../data/sanskritThinkingCourseData';
import { useAuthStore } from '../store/authStore';
import { hasPaidAccess, hasPremiumAccess } from '../utils/premiumAccess';
import { playPronunciation } from '../utils/pronunciation';
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
}) => {
  const { currentUser, isAdminLoggedIn } = useAuthStore();
  const hasPaid = hasPaidAccess(currentUser, isAdminLoggedIn);
  const inTrial = hasPremiumAccess(currentUser, isAdminLoggedIn) && !hasPaid;

  // Flatten all lessons for easy sequential indexing
  const allLessons = useMemo(() => {
    return COURSE_MODULES.flatMap((m) => m.lessons);
  }, []);

  // Active module & lesson state
  const [activeModuleId, setActiveModuleId] = useState<string>(() => {
    if (initialLessonId) {
      const found = COURSE_MODULES.find((m) => m.lessons.some((l) => l.id === initialLessonId));
      if (found) return found.id;
    }
    return COURSE_MODULES[0].id;
  });

  const [activeLessonId, setActiveLessonId] = useState<string>(() => {
    if (initialLessonId && allLessons.some((l) => l.id === initialLessonId)) {
      return initialLessonId;
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

  // Active worksheet modal state
  const [activeWorksheetModalLesson, setActiveWorksheetModalLesson] = useState<CourseLesson | null>(null);

  // Current active lesson object
  const currentLesson: CourseLesson = useMemo(() => {
    return allLessons.find((l) => l.id === activeLessonId) || allLessons[0];
  }, [allLessons, activeLessonId]);

  // Current active module object
  const currentModule: CourseModule = useMemo(() => {
    return COURSE_MODULES.find((m) => m.lessons.some((l) => l.id === currentLesson.id)) || COURSE_MODULES[0];
  }, [currentLesson]);

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

  const handleSelectLesson = (lesson: CourseLesson) => {
    setActiveLessonId(lesson.id);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleAudioPlay = (term: string) => {
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

        {/* Main Two-Column Layout */}
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

              <div className="stc-audio-chips-grid">
                {currentLesson.soundPractice.audioTerms.map((term, idx) => (
                  <div key={idx} className="stc-audio-chip-card">
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

        {/* Modal: Printable Worksheet & Answer Key Preview */}
        {activeWorksheetModalLesson && (
          <div className="stc-modal-overlay" onClick={() => setActiveWorksheetModalLesson(null)}>
            <div className="stc-modal-card" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="stc-modal-close"
                onClick={() => setActiveWorksheetModalLesson(null)}
                aria-label="Close modal"
              >
                ✕
              </button>

              <div style={{ textAlign: 'center', marginBottom: '1.5rem', borderBottom: '2px solid #f1ece1', paddingBottom: '1rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#b45309', textTransform: 'uppercase' }}>
                  EdNet Learn Gurukul · Official Study Worksheet
                </span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#134e4a', margin: '0.25rem 0' }}>
                  {activeWorksheetModalLesson.titleDevanagari} ({activeWorksheetModalLesson.titleEnglish})
                </h3>
                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
                  Lesson {activeWorksheetModalLesson.lessonNumber} · {activeWorksheetModalLesson.practice.worksheetSummary}
                </div>
              </div>

              <div style={{ background: '#fdfbf7', border: '1px solid #e7dfd3', borderRadius: 10, padding: '1.25rem', marginBottom: '1.5rem' }}>
                <h4 style={{ margin: '0 0 0.5rem', color: '#78350f' }}>📋 Lesson Drill &amp; Self-Check:</h4>
                <p style={{ margin: '0 0 0.75rem', fontWeight: 700 }}>{activeWorksheetModalLesson.practice.quickQuiz.prompt}</p>
                <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '0.75rem 1rem', borderRadius: 8, color: '#065f46' }}>
                  <strong>Verified Answer Key:</strong> {activeWorksheetModalLesson.practice.quickQuiz.options[activeWorksheetModalLesson.practice.quickQuiz.correctIndex]}
                  <p style={{ margin: '0.35rem 0 0', fontSize: '0.85rem' }}>{activeWorksheetModalLesson.practice.quickQuiz.explanation}</p>
                </div>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: '1.25rem', marginBottom: '1.5rem' }}>
                <h4 style={{ margin: '0 0 0.5rem', color: '#1e293b' }}>🧠 Thinking Connection Exercise:</h4>
                <p style={{ margin: '0 0 0.5rem', fontSize: '0.9rem', color: '#475569' }}>
                  In your study notebook, write a 3-sentence synthesis answering:
                </p>
                <blockquote style={{ margin: 0, paddingLeft: '1rem', borderLeft: '3px solid #7c3aed', color: '#4c1d95', fontStyle: 'italic' }}>
                  "{activeWorksheetModalLesson.thinkingConnection.bridgeExplanation}"
                </blockquote>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="stc-crumb-btn"
                  onClick={() => window.print()}
                >
                  🖨️ Print Worksheet
                </button>
                <button
                  type="button"
                  className="stc-worksheet-btn stc-worksheet-btn--unlocked"
                  onClick={() => setActiveWorksheetModalLesson(null)}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SanskritThinkingCourse;
