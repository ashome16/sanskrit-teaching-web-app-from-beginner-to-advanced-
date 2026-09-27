import React, { useState, useEffect, useMemo } from 'react';
import { COURSE_MODULES, type CourseLesson } from '../data/sanskritThinkingCourseData';

export interface SanskritGrandExamProps {
  onSelectLessonById?: (lessonId: string) => void;
  onOpenCertificate?: () => void;
  onGoToCurriculum?: () => void;
}

export interface ExamQuestionItem {
  id: string;
  moduleIndex: number;
  moduleNumber: number;
  moduleTitleDevanagari: string;
  moduleTitleEnglish: string;
  moduleThemeColor: string;
  lessonId: string;
  lessonNumber: string;
  lessonTitleDevanagari: string;
  lessonTitleEnglish: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  sutraReference?: { devanagari: string; iast: string; meaning: string };
}

export const SanskritGrandExam: React.FC<SanskritGrandExamProps> = ({
  onSelectLessonById,
  onOpenCertificate,
  onGoToCurriculum
}) => {
  // Build the complete 28-question exam bank dynamically from the 28 curriculum lessons
  const questions: ExamQuestionItem[] = useMemo(() => {
    const list: ExamQuestionItem[] = [];
    COURSE_MODULES.forEach((mod, modIdx) => {
      mod.lessons.forEach((lesson: CourseLesson) => {
        list.push({
          id: `exam-q-${lesson.id}`,
          moduleIndex: modIdx,
          moduleNumber: mod.moduleNumber,
          moduleTitleDevanagari: mod.titleDevanagari,
          moduleTitleEnglish: mod.titleEnglish,
          moduleThemeColor: mod.themeColor,
          lessonId: lesson.id,
          lessonNumber: lesson.lessonNumber,
          lessonTitleDevanagari: lesson.titleDevanagari,
          lessonTitleEnglish: lesson.titleEnglish,
          prompt: lesson.practice.quickQuiz.prompt,
          options: lesson.practice.quickQuiz.options,
          correctIndex: lesson.practice.quickQuiz.correctIndex,
          explanation: lesson.practice.quickQuiz.explanation,
          sutraReference: lesson.ruleMechanics.sutraReference
        });
      });
    });
    return list;
  }, []);

  // Mode: 'exam' (test first, grade at end) vs 'practice' (instant explanation on select)
  const [examMode, setExamMode] = useState<'exam' | 'practice'>('exam');
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>(() => {
    try {
      const saved = localStorage.getItem('stc_grand_exam_answers');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(() => {
    try {
      return localStorage.getItem('stc_grand_exam_submitted') === 'true';
    } catch {
      return false;
    }
  });
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [showReviewFilter, setShowReviewFilter] = useState<'all' | 'incorrect' | 'flagged'>('all');

  // Elapsed timer
  useEffect(() => {
    if (!isTimerRunning || isSubmitted) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning, isSubmitted]);

  // Persist answers
  const handleSelectAnswer = (qIndex: number, optionIdx: number) => {
    if (isSubmitted) return;
    const nextAnswers = { ...userAnswers, [qIndex]: optionIdx };
    setUserAnswers(nextAnswers);
    try {
      localStorage.setItem('stc_grand_exam_answers', JSON.stringify(nextAnswers));
    } catch {
      /* ignore */
    }
  };

  const toggleFlag = (qIndex: number) => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [qIndex]: !prev[qIndex]
    }));
  };

  const handleSubmitExam = () => {
    setIsSubmitted(true);
    setIsTimerRunning(false);
    try {
      localStorage.setItem('stc_grand_exam_submitted', 'true');
      const score = questions.reduce((acc, q, idx) => {
        return acc + (userAnswers[idx] === q.correctIndex ? 1 : 0);
      }, 0);
      const percent = Math.round((score / questions.length) * 100);
      const grade =
        percent >= 90
          ? 'महामहोपाध्यायः (Summa Cum Laude)'
          : percent >= 75
          ? 'पण्डितः (Magna Cum Laude)'
          : percent >= 60
          ? 'अध्येता (Cum Laude)'
          : 'जिज्ञासुः (Seeker)';
      localStorage.setItem('stc_grand_exam_score', `${score}/${questions.length}`);
      localStorage.setItem('stc_grand_exam_percent', `${percent}%`);
      localStorage.setItem('stc_grand_exam_grade', grade);
      localStorage.setItem('stc_grand_exam_date', new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }));
    } catch {
      /* ignore */
    }
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleRetakeExam = () => {
    if (!window.confirm('Are you sure you want to reset and retake the Grand Assessment Exam?')) return;
    setUserAnswers({});
    setFlaggedQuestions({});
    setIsSubmitted(false);
    setCurrentIdx(0);
    setTimerSeconds(0);
    setIsTimerRunning(true);
    try {
      localStorage.removeItem('stc_grand_exam_answers');
      localStorage.removeItem('stc_grand_exam_submitted');
    } catch {
      /* ignore */
    }
  };

  const handleEndorseCertificate = () => {
    // Ensure credentials saved
    const score = questions.reduce((acc, q, idx) => {
      return acc + (userAnswers[idx] === q.correctIndex ? 1 : 0);
    }, 0);
    const percent = Math.round((score / questions.length) * 100);
    const grade =
      percent >= 90
        ? 'महामहोपाध्यायः (Summa Cum Laude)'
        : percent >= 75
        ? 'पण्डितः (Magna Cum Laude)'
        : percent >= 60
        ? 'अध्येता (Cum Laude)'
        : 'जिज्ञासुः (Seeker)';
    try {
      localStorage.setItem('stc_grand_exam_score', `${score}/${questions.length}`);
      localStorage.setItem('stc_grand_exam_percent', `${percent}%`);
      localStorage.setItem('stc_grand_exam_grade', grade);
      localStorage.setItem('stc_grand_exam_date', new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }));
    } catch {
      /* ignore */
    }
    onOpenCertificate?.();
  };

  // Calculations
  const answeredCount = Object.keys(userAnswers).length;
  const flaggedCount = Object.values(flaggedQuestions).filter(Boolean).length;
  const currentQuestion = questions[currentIdx];

  const totalScore = useMemo(() => {
    return questions.reduce((acc, q, idx) => {
      return acc + (userAnswers[idx] === q.correctIndex ? 1 : 0);
    }, 0);
  }, [questions, userAnswers]);

  const scorePercentage = Math.round((totalScore / questions.length) * 100);

  // Performance tier
  const performanceTier = useMemo(() => {
    if (scorePercentage >= 90) {
      return {
        titleDevanagari: 'महामहोपाध्यायः',
        titleEnglish: 'Grand Scholar of Sanskrit Logic (Summa Cum Laude)',
        badgeColor: '#b45309',
        bgColor: '#fef3c7',
        borderColor: '#f59e0b',
        sealEmoji: '🌟',
        description: 'Flawless cognitive synthesis across phonetics, binary matrices, grammatical engines, and Darśana epistemology.'
      };
    }
    if (scorePercentage >= 75) {
      return {
        titleDevanagari: 'पण्डितः / पण्डिता',
        titleEnglish: 'Distinguished Sanskrit Scholar (Magna Cum Laude)',
        badgeColor: '#0f766e',
        bgColor: '#ccfbf1',
        borderColor: '#14b8a6',
        sealEmoji: '🥈',
        description: 'Exemplary command of Sanskrit computational morphology, vibhakti mapping, and structural worldview.'
      };
    }
    if (scorePercentage >= 60) {
      return {
        titleDevanagari: 'अध्येता',
        titleEnglish: 'Proficient Cognitive Practitioner (Cum Laude)',
        badgeColor: '#1d4ed8',
        bgColor: '#dbeafe',
        borderColor: '#3b82f6',
        sealEmoji: '🥉',
        description: 'Strong foundational grasp of the Sanskrit way of thinking with clear fluency in core rules.'
      };
    }
    return {
      titleDevanagari: 'जिज्ञासुः',
      titleEnglish: 'Diligent Inquirer & Student of Knowledge',
      badgeColor: '#4b5563',
      bgColor: '#f3f4f6',
      borderColor: '#9ca3af',
      sealEmoji: '🌱',
      description: 'You have traversed the entire curriculum. Review flagged concepts and retake the assessment to earn scholarly honors.'
    };
  }, [scorePercentage]);

  // Per-module breakdown
  const moduleBreakdown = useMemo(() => {
    return COURSE_MODULES.map((mod) => {
      const modQuestions = questions.filter((q) => q.moduleNumber === mod.moduleNumber);
      const modCorrect = modQuestions.filter((q) => {
        const qIdx = questions.findIndex((orig) => orig.id === q.id);
        return userAnswers[qIdx] === q.correctIndex;
      }).length;
      const modPercent = Math.round((modCorrect / modQuestions.length) * 100);
      return {
        moduleNumber: mod.moduleNumber,
        titleDevanagari: mod.titleDevanagari,
        titleEnglish: mod.titleEnglish,
        correct: modCorrect,
        total: modQuestions.length,
        percentage: modPercent,
        themeColor: mod.themeColor
      };
    });
  }, [questions, userAnswers]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ maxWidth: '1040px', margin: '0 auto', paddingBottom: '3rem' }}>
      {/* Top Banner Card */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #4338ca 100%)',
          borderRadius: '16px',
          padding: '2rem 2.25rem',
          color: '#ffffff',
          boxShadow: '0 10px 25px -5px rgba(30, 27, 75, 0.3)',
          marginBottom: '2rem',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'absolute', right: '-20px', bottom: '-20px', fontSize: '9rem', opacity: 0.08, pointerEvents: 'none', userSelect: 'none' }}>
          ॐ
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', position: 'relative', zIndex: 1 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255, 255, 255, 0.15)', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              <span>🏆</span>
              <span>Official Capstone Evaluation · महा-मूल्याङ्कनम्</span>
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 900, margin: '0 0 0.4rem', fontFamily: 'serif', letterSpacing: '0.02em' }}>
              सम्पूर्ण-महा-मूल्याङ्कनम्
            </h1>
            <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#c7d2fe', marginBottom: '0.5rem' }}>
              Grand Course Assessment Exam: Sanskrit as a Way of Thinking
            </div>
            <p style={{ margin: 0, fontSize: '0.92rem', color: '#e0e7ff', maxWidth: '680px', lineHeight: 1.55 }}>
              Test your comprehensive mastery over all <strong>6 Core Modules (28 Lessons)</strong>. Answer rigorous multiple-choice questions examining acoustic phonetics, Pāṇinian sūtras, binary combinatorial logic, kāraka case mapping, and Darśana epistemology.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.6rem' }}>
            {onGoToCurriculum && (
              <button
                type="button"
                onClick={onGoToCurriculum}
                style={{
                  background: 'rgba(255, 255, 255, 0.12)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: '#ffffff',
                  padding: '0.4rem 0.85rem',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                ← Return to Lessons
              </button>
            )}
            <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '0.45rem 0.85rem', borderRadius: '8px', fontSize: '0.86rem', display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
              <span>⏱️ Timer:</span>
              <span style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '0.96rem' }}>{formatTime(timerSeconds)}</span>
            </div>
          </div>
        </div>

        {/* Mode Selector & Quick Summary */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255, 255, 255, 0.15)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: '#c7d2fe', fontWeight: 600 }}>Mode:</span>
            <div style={{ display: 'inline-flex', background: 'rgba(0,0,0,0.25)', padding: '3px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)' }}>
              <button
                type="button"
                onClick={() => setExamMode('exam')}
                style={{
                  background: examMode === 'exam' ? '#ffffff' : 'transparent',
                  color: examMode === 'exam' ? '#1e1b4b' : '#c7d2fe',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.25rem 0.75rem',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                📝 Official Exam
              </button>
              <button
                type="button"
                onClick={() => setExamMode('practice')}
                style={{
                  background: examMode === 'practice' ? '#ffffff' : 'transparent',
                  color: examMode === 'practice' ? '#1e1b4b' : '#c7d2fe',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.25rem 0.75rem',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                💡 Study Drill (Instant Keys)
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', fontSize: '0.88rem' }}>
            <div>
              <span style={{ color: '#a5b4fc' }}>Answered: </span>
              <strong>{answeredCount} / {questions.length}</strong>
            </div>
            {flaggedCount > 0 && (
              <div>
                <span style={{ color: '#fed7aa' }}>Flagged: </span>
                <strong>🚩 {flaggedCount}</strong>
              </div>
            )}
            {isSubmitted && (
              <div style={{ background: '#dcfce7', color: '#166534', padding: '0.2rem 0.65rem', borderRadius: '9999px', fontWeight: 800, fontSize: '0.8rem' }}>
                ✓ Score: {totalScore}/{questions.length} ({scorePercentage}%)
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RESULT VIEW IF SUBMITTED */}
      {isSubmitted && (
        <div
          style={{
            background: '#ffffff',
            borderRadius: '16px',
            border: `2px solid ${performanceTier.borderColor}`,
            padding: '2rem',
            marginBottom: '2.5rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: performanceTier.bgColor, border: `2px solid ${performanceTier.borderColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>
                {performanceTier.sealEmoji}
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: performanceTier.badgeColor, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Gurukul Examination Result · परीक्षा-फलम्
                </div>
                <h2 style={{ fontSize: '1.65rem', fontWeight: 900, color: '#0f172a', margin: '0.15rem 0' }}>
                  {performanceTier.titleDevanagari} ({performanceTier.titleEnglish})
                </h2>
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', maxWidth: '580px' }}>
                  {performanceTier.description}
                </p>
              </div>
            </div>

            <div style={{ textAlign: 'right', background: '#f8fafc', padding: '0.85rem 1.4rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700 }}>Total Assessment Score</div>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: performanceTier.badgeColor, lineHeight: 1.1 }}>
                {totalScore} <span style={{ fontSize: '1.1rem', color: '#94a3b8' }}>/ {questions.length}</span>
              </div>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#334155' }}>
                {scorePercentage}% Mastery Rating
              </div>
            </div>
          </div>

          {/* Module-by-Module Diagnostic Radar */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.75rem' }}>
              📊 Diagnostic Competency by Module:
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.85rem' }}>
              {moduleBreakdown.map((m) => (
                <div key={m.moduleNumber} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f172a' }}>
                      Mod {m.moduleNumber}: {m.titleDevanagari}
                    </span>
                    <span style={{ fontSize: '0.82rem', fontWeight: 800, color: m.percentage >= 80 ? '#15803d' : m.percentage >= 60 ? '#b45309' : '#b91c1c' }}>
                      {m.correct}/{m.total} ({m.percentage}%)
                    </span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${m.percentage}%`,
                        height: '100%',
                        background: m.percentage >= 80 ? '#22c55e' : m.percentage >= 60 ? '#f59e0b' : '#ef4444',
                        borderRadius: '9999px',
                        transition: 'width 0.4s ease'
                      }}
                    />
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '0.35rem' }}>
                    {m.titleEnglish}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Result Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={handleEndorseCertificate}
                style={{
                  background: '#b45309',
                  border: '1.5px solid #92400e',
                  color: '#ffffff',
                  padding: '0.65rem 1.4rem',
                  borderRadius: '10px',
                  fontWeight: 800,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 10px rgba(180, 83, 9, 0.25)'
                }}
              >
                <span>📜</span>
                <span>Endorse Honors on Gurukul Certificate</span>
              </button>

              <button
                type="button"
                onClick={handleRetakeExam}
                style={{
                  background: '#ffffff',
                  border: '1.5px solid #cbd5e1',
                  color: '#334155',
                  padding: '0.65rem 1.25rem',
                  borderRadius: '10px',
                  fontWeight: 800,
                  fontSize: '0.92rem',
                  cursor: 'pointer'
                }}
              >
                🔄 Retake Assessment
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>Filter Review:</span>
              <button
                type="button"
                onClick={() => setShowReviewFilter('all')}
                style={{
                  background: showReviewFilter === 'all' ? '#1e293b' : '#f1f5f9',
                  color: showReviewFilter === 'all' ? '#ffffff' : '#475569',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.3rem 0.65rem',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                All 28
              </button>
              <button
                type="button"
                onClick={() => setShowReviewFilter('incorrect')}
                style={{
                  background: showReviewFilter === 'incorrect' ? '#b91c1c' : '#fee2e2',
                  color: showReviewFilter === 'incorrect' ? '#ffffff' : '#991b1b',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.3rem 0.65rem',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Missed ({questions.length - totalScore})
              </button>
              <button
                type="button"
                onClick={() => setShowReviewFilter('flagged')}
                style={{
                  background: showReviewFilter === 'flagged' ? '#c2410c' : '#ffedd5',
                  color: showReviewFilter === 'flagged' ? '#ffffff' : '#9a3412',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.3rem 0.65rem',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Flagged (🚩 {flaggedCount})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QUESTION NAVIGATOR GRID */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '1.25rem',
          marginBottom: '1.75rem',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.86rem', fontWeight: 800, color: '#334155' }}>
            🧭 Question Navigator (२८ प्रश्नाः):
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.76rem', color: '#64748b' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#0f766e' }} /> Answered
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#f97316' }} /> Flagged 🚩
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#e2e8f0' }} /> Unanswered
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(32px, 1fr))', gap: '0.45rem' }}>
          {questions.map((q, idx) => {
            const isAnswered = userAnswers[idx] !== undefined;
            const isFlagged = !!flaggedQuestions[idx];
            const isActive = currentIdx === idx;
            const isCorrect = isSubmitted && userAnswers[idx] === q.correctIndex;
            const isWrong = isSubmitted && isAnswered && !isCorrect;

            let bgColor = '#f8fafc';
            let textColor = '#475569';
            let borderColor = '#cbd5e1';

            if (isSubmitted) {
              if (isCorrect) {
                bgColor = '#dcfce7';
                textColor = '#166534';
                borderColor = '#86efac';
              } else if (isWrong) {
                bgColor = '#fee2e2';
                textColor = '#991b1b';
                borderColor = '#fca5a5';
              }
            } else {
              if (isAnswered) {
                bgColor = '#0f766e';
                textColor = '#ffffff';
                borderColor = '#0f766e';
              }
              if (isFlagged) {
                borderColor = '#f97316';
                if (!isAnswered) {
                  bgColor = '#ffedd5';
                  textColor = '#c2410c';
                }
              }
            }

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => setCurrentIdx(idx)}
                style={{
                  height: '36px',
                  borderRadius: '6px',
                  border: isActive ? '2.5px solid #2563eb' : `1.5px solid ${borderColor}`,
                  background: bgColor,
                  color: textColor,
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.15s ease',
                  boxShadow: isActive ? '0 0 0 3px rgba(37, 99, 235, 0.25)' : 'none'
                }}
              >
                {idx + 1}
                {isFlagged && (
                  <span style={{ position: 'absolute', top: '-4px', right: '-4px', fontSize: '0.65rem' }}>
                    🚩
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ACTIVE QUESTION CARD */}
      {currentQuestion && (
        <div
          style={{
            background: '#ffffff',
            borderRadius: '16px',
            border: '1.5px solid #e2e8f0',
            padding: '2rem',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
            marginBottom: '1.5rem'
          }}
        >
          {/* Question Breadcrumb & Flag */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ background: '#ede9fe', color: '#5b21b6', padding: '0.2rem 0.65rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 800 }}>
                Mod {currentQuestion.moduleNumber}: {currentQuestion.moduleTitleDevanagari}
              </span>
              <span style={{ background: '#f1f5f9', color: '#334155', padding: '0.2rem 0.65rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700 }}>
                Lesson {currentQuestion.lessonNumber}: {currentQuestion.lessonTitleDevanagari}
              </span>
              {onSelectLessonById && (
                <button
                  type="button"
                  onClick={() => onSelectLessonById(currentQuestion.lessonId)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#0f766e',
                    fontSize: '0.76rem',
                    fontWeight: 800,
                    textDecoration: 'underline',
                    cursor: 'pointer'
                  }}
                >
                  📖 View Lesson
                </button>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <button
                type="button"
                onClick={() => toggleFlag(currentIdx)}
                style={{
                  background: flaggedQuestions[currentIdx] ? '#ffedd5' : '#f8fafc',
                  border: flaggedQuestions[currentIdx] ? '1.5px solid #f97316' : '1px solid #cbd5e1',
                  color: flaggedQuestions[currentIdx] ? '#c2410c' : '#64748b',
                  borderRadius: '8px',
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <span>🚩</span>
                <span>{flaggedQuestions[currentIdx] ? 'Flagged for Review' : 'Flag Question'}</span>
              </button>
              <span style={{ fontSize: '0.84rem', fontWeight: 800, color: '#475569' }}>
                Q {currentIdx + 1} of {questions.length}
              </span>
            </div>
          </div>

          {/* Question Text */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.5, margin: 0 }}>
              {currentQuestion.prompt}
            </h3>
          </div>

          {/* Sutra Reference If Present */}
          {currentQuestion.sutraReference && (
            <div style={{ background: '#fef3c7', border: '1px solid #fde68a', borderRadius: '8px', padding: '0.6rem 0.9rem', marginBottom: '1.25rem', fontSize: '0.85rem', color: '#92400e' }}>
              📜 <strong>Canonical Pāṇinian Sūtra:</strong> {currentQuestion.sutraReference.devanagari} ({currentQuestion.sutraReference.iast}) — {currentQuestion.sutraReference.meaning}
            </div>
          )}

          {/* Options List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {currentQuestion.options.map((opt, optIdx) => {
              const isSelected = userAnswers[currentIdx] === optIdx;
              const isCorrect = currentQuestion.correctIndex === optIdx;
              const showResult = isSubmitted || examMode === 'practice';

              let optBg = '#ffffff';
              let optBorder = '#e2e8f0';
              let optColor = '#1e293b';

              if (showResult && isSelected && isCorrect) {
                optBg = '#dcfce7';
                optBorder = '#22c55e';
                optColor = '#15803d';
              } else if (showResult && isSelected && !isCorrect) {
                optBg = '#fee2e2';
                optBorder = '#ef4444';
                optColor = '#b91c1c';
              } else if (showResult && isCorrect) {
                optBg = '#f0fdf4';
                optBorder = '#86efac';
                optColor = '#166534';
              } else if (isSelected) {
                optBg = '#f0fdfa';
                optBorder = '#0f766e';
                optColor = '#0f766e';
              }

              return (
                <button
                  key={optIdx}
                  type="button"
                  disabled={isSubmitted}
                  onClick={() => handleSelectAnswer(currentIdx, optIdx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.9rem 1.15rem',
                    borderRadius: '10px',
                    border: `1.5px solid ${optBorder}`,
                    background: optBg,
                    color: optColor,
                    cursor: isSubmitted ? 'default' : 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                    boxShadow: isSelected ? '0 2px 6px rgba(0, 0, 0, 0.05)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span
                      style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        border: isSelected ? '2px solid currentColor' : '1.5px solid #cbd5e1',
                        background: isSelected ? 'currentColor' : '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 900,
                        color: isSelected ? '#ffffff' : '#64748b',
                        flexShrink: 0
                      }}
                    >
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span style={{ fontSize: '0.96rem', fontWeight: isSelected ? 800 : 500, lineHeight: 1.4 }}>
                      {opt}
                    </span>
                  </div>

                  {showResult && (
                    <span style={{ fontSize: '1rem', fontWeight: 900 }}>
                      {isCorrect ? '✓' : isSelected ? '✗' : ''}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation if Practice Mode or Submitted */}
          {(isSubmitted || (examMode === 'practice' && userAnswers[currentIdx] !== undefined)) && (
            <div
              style={{
                marginTop: '1.25rem',
                background: '#f8fafc',
                border: '1.5px solid #e2e8f0',
                borderRadius: '10px',
                padding: '1rem 1.25rem',
                fontSize: '0.9rem',
                color: '#334155',
                lineHeight: 1.55
              }}
            >
              <div style={{ fontWeight: 800, color: '#0f766e', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span>💡</span>
                <span>Pāṇinian Logic &amp; Rule Explanation:</span>
              </div>
              <p style={{ margin: 0 }}>{currentQuestion.explanation}</p>
            </div>
          )}

          {/* Stepper Controls Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid #f1f5f9', flexWrap: 'wrap', gap: '0.75rem' }}>
            <button
              type="button"
              disabled={currentIdx === 0}
              onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
              style={{
                background: '#ffffff',
                border: '1.5px solid #cbd5e1',
                padding: '0.55rem 1.25rem',
                borderRadius: '8px',
                fontSize: '0.88rem',
                fontWeight: 800,
                color: currentIdx === 0 ? '#94a3b8' : '#334155',
                cursor: currentIdx === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              ← Previous Question
            </button>

            <div style={{ display: 'flex', gap: '0.6rem' }}>
              {!isSubmitted ? (
                <button
                  type="button"
                  onClick={handleSubmitExam}
                  style={{
                    background: answeredCount === questions.length ? '#047857' : '#0f766e',
                    border: '1.5px solid #065f46',
                    padding: '0.55rem 1.35rem',
                    borderRadius: '8px',
                    fontSize: '0.88rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(15, 118, 110, 0.2)'
                  }}
                >
                  {answeredCount === questions.length ? '✓ Submit Final Exam' : `Submit Exam (${answeredCount}/${questions.length} answered)`}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleEndorseCertificate}
                  style={{
                    background: '#b45309',
                    border: '1.5px solid #92400e',
                    padding: '0.55rem 1.35rem',
                    borderRadius: '8px',
                    fontSize: '0.88rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    cursor: 'pointer'
                  }}
                >
                  📜 View Certificate
                </button>
              )}

              <button
                type="button"
                disabled={currentIdx === questions.length - 1}
                onClick={() => setCurrentIdx((prev) => Math.min(questions.length - 1, prev + 1))}
                style={{
                  background: '#2563eb',
                  border: '1.5px solid #1d4ed8',
                  padding: '0.55rem 1.35rem',
                  borderRadius: '8px',
                  fontSize: '0.88rem',
                  fontWeight: 800,
                  color: '#ffffff',
                  cursor: currentIdx === questions.length - 1 ? 'not-allowed' : 'pointer',
                  opacity: currentIdx === questions.length - 1 ? 0.5 : 1
                }}
              >
                Next Question →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SanskritGrandExam;
