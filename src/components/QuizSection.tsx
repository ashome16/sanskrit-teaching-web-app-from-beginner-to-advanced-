import React, { useState, useMemo } from 'react';
import { QUIZ_CATEGORIES, QUIZ_QUESTIONS, type QuizQuestionItem } from '../data/quizData';
import { playPronunciation } from '../utils/pronunciation';
import { useAppStore } from '../store';
import { useAuthStore } from '../store/authStore';
import '../styles/quiz-section.css';

interface QuizSectionProps {
  onGoHome?: () => void;
  onOpenWorksheets?: () => void;
  onOpenReader?: () => void;
}

const QuizSection: React.FC<QuizSectionProps> = ({
  onGoHome,
  onOpenWorksheets,
  onOpenReader,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestionItem[] | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [score, setScore] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [showReview, setShowReview] = useState<boolean>(false);

  const { recordQuizAttempt } = useAppStore();
  const { isAdminLoggedIn } = useAuthStore();

  const visibleCategories = useMemo(
    () =>
      QUIZ_CATEGORIES.filter((cat) => isAdminLoggedIn || !cat.id.startsWith('grade8')),
    [isAdminLoggedIn]
  );

  const publicQuestions = useMemo(
    () =>
      isAdminLoggedIn
        ? QUIZ_QUESTIONS
        : QUIZ_QUESTIONS.filter((q) => !String(q.category).startsWith('grade8')),
    [isAdminLoggedIn]
  );

  const filteredQuestions = useMemo(() => {
    if (selectedCategory === 'all') return publicQuestions;
    if (selectedCategory === 'deep_ch1') {
      return publicQuestions.filter(
        (q) => q.chapterRef?.includes('Chapter 1') || q.chapterRef?.includes('वन्दे भारतमातरम्')
      );
    }
    if (selectedCategory === 'deep_ch2') {
      return publicQuestions.filter(
        (q) => q.category === 'deep_ch2' || q.chapterRef?.includes('Chapter 2') || q.chapterRef?.includes('नित्यं पिबाम')
      );
    }
    if (selectedCategory === 'deep_ch3') {
      return publicQuestions.filter(
        (q) => q.category === 'deep_ch3' || q.chapterRef?.includes('Chapter 3') || q.chapterRef?.includes('मित्राय नमः')
      );
    }
    if (selectedCategory === 'deep_ch4') {
      return publicQuestions.filter(
        (q) => q.category === 'deep_ch4' || q.chapterRef?.includes('Chapter 4') || q.chapterRef?.includes('द्राक्षाफलम्')
      );
    }
    if (selectedCategory === 'deep_ch5') {
      return publicQuestions.filter(
        (q) => q.category === 'deep_ch5' || q.chapterRef?.includes('Chapter 5') || q.chapterRef?.includes('सेवा हि परमो धर्मः')
      );
    }
    if (selectedCategory === 'deep_ch6') {
      return publicQuestions.filter(
        (q) => q.category === 'deep_ch6' || q.chapterRef?.includes('Chapter 6') || q.chapterRef?.includes('श्लोकान्त्याक्षरीम्')
      );
    }
    if (selectedCategory === 'deep_ch7') {
      return publicQuestions.filter(
        (q) => q.category === 'deep_ch7' || q.chapterRef?.includes('Chapter 7') || q.chapterRef?.includes('ईशावास्यम्')
      );
    }
    if (selectedCategory === 'deep_ch8') {
      return publicQuestions.filter(
        (q) => q.category === 'deep_ch8' || q.chapterRef?.includes('Chapter 8') || q.chapterRef?.includes('हितं मनोहारि')
      );
    }
    if (selectedCategory === 'deep_ch9') {
      return publicQuestions.filter(
        (q) => q.category === 'deep_ch9' || q.chapterRef?.includes('Chapter 9') || q.chapterRef?.includes('अन्नाद् भवन्ति')
      );
    }
    if (selectedCategory === 'deep_ch10') {
      return publicQuestions.filter(
        (q) => q.category === 'deep_ch10' || q.chapterRef?.includes('Chapter 10') || q.chapterRef?.includes('दशमः कः')
      );
    }
    if (selectedCategory === 'deep_ch11') {
      return publicQuestions.filter(
        (q) => q.category === 'deep_ch11' || q.chapterRef?.includes('Chapter 11') || q.chapterRef?.includes('द्वीपोऽण्डमानः') || q.chapterRef?.includes('अण्डमान')
      );
    }
    if (selectedCategory === 'deep_ch12') {
      return publicQuestions.filter(
        (q) => q.category === 'deep_ch12' || q.chapterRef?.includes('Chapter 12') || q.chapterRef?.includes('पन्नाधाया')
      );
    }
    if (selectedCategory === 'deep_ch13') {
      return publicQuestions.filter(
        (q) => q.category === 'deep_ch13' || q.chapterRef?.includes('वर्णमात्रा')
      );
    }
    if (selectedCategory === 'deep_ch14') {
      return publicQuestions.filter(
        (q) => q.category === 'deep_ch14' || q.chapterRef?.includes('शब्दरूपाणि')
      );
    }
    return publicQuestions.filter(
      (q) =>
        q.category === selectedCategory ||
        (selectedCategory === 'cbse_deepakam' &&
          (q.category === 'deep_ch1' ||
            q.category === 'deep_ch2' ||
            q.category === 'deep_ch3' ||
            q.category === 'deep_ch4' ||
            q.category === 'deep_ch5' ||
            q.category === 'deep_ch6' ||
            q.category === 'deep_ch7' ||
            q.category === 'deep_ch8' ||
            q.category === 'deep_ch9' ||
            q.category === 'deep_ch10' ||
            q.category === 'deep_ch11' ||
            q.category === 'deep_ch12' ||
            q.category === 'deep_ch13' ||
            q.category === 'deep_ch14'))
    );
  }, [selectedCategory, publicQuestions]);

  const availableSubQuizzes = useMemo(() => {
    const list: { title: string; count: number }[] = [];
    const seen = new Set<string>();
    filteredQuestions.forEach((q) => {
      if (q.subCategory && !seen.has(q.subCategory)) {
        seen.add(q.subCategory);
        const count = filteredQuestions.filter((item) => item.subCategory === q.subCategory).length;
        list.push({ title: q.subCategory, count });
      }
    });
    return list;
  }, [filteredQuestions]);

  const startSpecificQuiz = (subCategoryTitle: string) => {
    const specificQuestions = publicQuestions.filter((q) => q.subCategory === subCategoryTitle);
    if (specificQuestions.length === 0) return;
    setActiveQuestions(specificQuestions);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setUserAnswers({});
    setScore(0);
    setIsCompleted(false);
    setShowReview(false);
  };

  const startQuiz = (count: number) => {
    const pool = [...filteredQuestions].sort(() => 0.5 - Math.random());
    const selected = pool.slice(0, Math.min(count, pool.length));
    setActiveQuestions(selected);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setUserAnswers({});
    setScore(0);
    setIsCompleted(false);
    setShowReview(false);
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswerChecked) return;
    setSelectedOption(idx);
    setIsAnswerChecked(true);

    if (!activeQuestions) return;
    const currentQ = activeQuestions[currentIndex];
    setUserAnswers((prev) => ({ ...prev, [currentQ.id]: idx }));

    if (idx === currentQ.correctIndex) {
      setScore((prev) => prev + currentQ.points);
    }
  };

  const handleNext = () => {
    if (!activeQuestions) return;
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      setIsCompleted(true);
      const attempt = {
        id: 'quiz_' + Date.now(),
        quizId: selectedCategory,
        userId: 'current_user',
        timestamp: Date.now(),
        score: score + (selectedOption === activeQuestions[currentIndex].correctIndex ? activeQuestions[currentIndex].points : 0),
        totalPoints: activeQuestions.length * 10,
        answers: activeQuestions.map((q) => ({
          questionId: q.id,
          userAnswer: q.options[userAnswers[q.id]] || '',
          correct: userAnswers[q.id] === q.correctIndex,
          points: userAnswers[q.id] === q.correctIndex ? q.points : 0,
        })),
      };
      recordQuizAttempt(attempt);
    }
  };

  const currentQ = activeQuestions ? activeQuestions[currentIndex] : null;

  return (
    <section className="quiz-section">
      {/* Top Header */}
      <header className="quiz-header">
        <div className="quiz-header-left">
          <img src="/logo.jpg" alt="Sanskrit and Vedic Maths quiz practice for school children" className="quiz-header-logo" />
          <div>
            <h2 className="quiz-title">प्रश्नोत्तरी · Sanskrit &amp; Vedic Maths Quiz</h2>
            <p className="quiz-subtitle">
              CBSE Class 7 Deepakam Exam Prep · Vyākaraṇa Grammar · Vedic Mental Maths
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.65rem' }}>
          {onOpenReader && (
            <button type="button" className="quiz-home-btn" onClick={onOpenReader}>
              📖 Deepakam Reader
            </button>
          )}
          {onOpenWorksheets && (
            <button type="button" className="quiz-home-btn" onClick={onOpenWorksheets}>
              📑 Printable Worksheets
            </button>
          )}
          {onGoHome && (
            <button type="button" className="quiz-home-btn" onClick={onGoHome}>
              🏠 Back to Home
            </button>
          )}
        </div>
      </header>

      {/* View 1: Quiz Home / Mode Picker */}
      {!activeQuestions ? (
        <>
          {/* Category Filter Bar */}
          <div className="quiz-categories-bar">
            {visibleCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`quiz-cat-pill${selectedCategory === cat.id ? ' active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Individual Chapter / Topic Quizzes (if available) */}
          {availableSubQuizzes.length > 0 && (
            <div style={{ marginBottom: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#2b2118', margin: 0 }}>
                  📋 Individual Practice Quizzes ({availableSubQuizzes.length} Available)
                </h3>
                <span style={{ fontSize: '0.85rem', color: '#78350f', fontWeight: 700 }}>
                  Select any quiz to test 5 specific MCQs
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '0.85rem' }}>
                {availableSubQuizzes.map((sq) => (
                  <button
                    key={sq.title}
                    type="button"
                    onClick={() => startSpecificQuiz(sq.title)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.85rem 1.15rem',
                      background: '#fff',
                      border: '1.5px solid #ebdcc5',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#b3472f';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(179, 71, 47, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#ebdcc5';
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.04)';
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#1f2937', lineHeight: 1.35 }}>
                        {sq.title}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#b3472f', fontWeight: 700, marginTop: '0.25rem' }}>
                        🎯 {sq.count} Questions · 50 Points
                      </div>
                    </div>
                    <span style={{ fontSize: '1.2rem', color: '#b3472f', marginLeft: '0.5rem', flexShrink: 0 }}>➔</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Mode Cards */}
          <div className="quiz-modes-grid">
            <div className="quiz-mode-card" onClick={() => startQuiz(5)}>
              <span className="quiz-mode-icon">⚡</span>
              <h3 className="quiz-mode-title">Quick 5-Question Sprint</h3>
              <p className="quiz-mode-desc">
                Ideal for a rapid 3-minute test on your phone or between classes. Earn points and maintain your daily streak!
              </p>
              <span className="quiz-mode-action-btn">Start Sprint (5 Questions) ➔</span>
            </div>

            <div className="quiz-mode-card" onClick={() => startQuiz(10)}>
              <span className="quiz-mode-icon">🎯</span>
              <h3 className="quiz-mode-title">10-Question CBSE Board Exam Drill</h3>
              <p className="quiz-mode-desc">
                Balanced mix of shloka anvaya, sandhi rules, vibhakti identification, and Sanskrit vocabulary.
              </p>
              <span className="quiz-mode-action-btn">Start Exam Drill (10 Questions) ➔</span>
            </div>

            <div className="quiz-mode-card" onClick={() => startQuiz(filteredQuestions.length)}>
              <span className="quiz-mode-icon">🏆</span>
              <h3 className="quiz-mode-title">Master Challenge (All Questions)</h3>
              <p className="quiz-mode-desc">
                Comprehensive challenge covering all available questions in {selectedCategory === 'all' ? 'all categories' : 'this topic'}.
              </p>
              <span className="quiz-mode-action-btn">
                Start All ({filteredQuestions.length} Questions) ➔
              </span>
            </div>
          </div>
        </>
      ) : isCompleted ? (
        /* View 3: Quiz Results & Review */
        <div className="quiz-result-container">
          <div className="quiz-result-icon">
            {score >= activeQuestions.length * 8 ? '🎉' : score >= activeQuestions.length * 5 ? '🌟' : '📚'}
          </div>
          <h3 className="quiz-result-title">
            {score >= activeQuestions.length * 8
              ? 'अति उत्तमम्! · Outstanding Performance!'
              : score >= activeQuestions.length * 5
              ? 'उत्तमम्! · Well Done!'
              : 'अभ्यासः करणीयः · Keep Practicing!'}
          </h3>
          <p className="quiz-result-subtitle">
            You completed the quiz with {Math.round((score / (activeQuestions.length * 10)) * 100)}% accuracy.
          </p>

          <div className="quiz-score-circle">
            <span className="quiz-score-num">{score}</span>
            <span className="quiz-score-total">/ {activeQuestions.length * 10} Points</span>
          </div>

          <div className="quiz-result-actions">
            <button
              type="button"
              className="quiz-retry-btn"
              onClick={() => startQuiz(activeQuestions.length)}
            >
              🔄 Retake Quiz
            </button>
            <button
              type="button"
              className="quiz-review-toggle-btn"
              onClick={() => setShowReview(!showReview)}
            >
              {showReview ? 'Hide Answer Review' : '📝 Review All Answers'}
            </button>
            <button
              type="button"
              className="quiz-review-toggle-btn"
              onClick={() => setActiveQuestions(null)}
            >
              Select Another Topic
            </button>
          </div>

          {/* Detailed Question Review */}
          {showReview && (
            <div style={{ marginTop: '2rem', textAlign: 'left' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1f2937', marginBottom: '1rem' }}>
                Detailed Question Review:
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {activeQuestions.map((q, idx) => {
                  const userAns = userAnswers[q.id];
                  const isCorrect = userAns === q.correctIndex;
                  return (
                    <div
                      key={q.id}
                      style={{
                        padding: '1rem 1.25rem',
                        borderRadius: '10px',
                        border: `1.5px solid ${isCorrect ? '#86efac' : '#fca5a5'}`,
                        background: isCorrect ? '#f0fdf4' : '#fef2f2',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                        <span style={{ fontWeight: 800, fontSize: '0.9rem', color: isCorrect ? '#166534' : '#991b1b' }}>
                          Q{idx + 1}. {q.categoryLabel}
                        </span>
                        <span style={{ fontWeight: 700, fontSize: '0.8rem', color: isCorrect ? '#166534' : '#991b1b' }}>
                          {isCorrect ? '✓ Correct (+10)' : '✗ Incorrect (0)'}
                        </span>
                      </div>
                      <p style={{ fontWeight: 700, color: '#1f2937', margin: '0 0 0.5rem', fontSize: '0.95rem' }}>
                        {q.question}
                      </p>
                      {q.questionSanskrit && (
                        <p style={{ color: '#7f231c', fontWeight: 700, margin: '0 0 0.5rem', fontSize: '0.92rem' }}>
                          {q.questionSanskrit}
                        </p>
                      )}
                      <div style={{ fontSize: '0.88rem', color: '#374151', margin: '0.35rem 0' }}>
                        <strong>Your answer:</strong>{' '}
                        {userAns !== undefined ? q.options[userAns] : 'Skipped'}
                      </div>
                      {!isCorrect && (
                        <div style={{ fontSize: '0.88rem', color: '#15803d', fontWeight: 700, margin: '0.2rem 0' }}>
                          <strong>Correct answer:</strong> {q.options[q.correctIndex]}
                        </div>
                      )}
                      <div style={{ marginTop: '0.45rem', fontSize: '0.82rem', color: '#6b7280', fontStyle: 'italic' }}>
                        💡 {q.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* View 2: Active Question Flow */
        currentQ && (
          <div className="quiz-active-box">
            {/* Progress Row */}
            <div className="quiz-progress-row">
              <span>
                Question {currentIndex + 1} of {activeQuestions.length}
              </span>
              <span>Score: {score} Points</span>
            </div>

            <div className="quiz-progress-bar-bg">
              <div
                className="quiz-progress-bar-fill"
                style={{ width: `${((currentIndex + 1) / activeQuestions.length) * 100}%` }}
              />
            </div>

            {/* Question Meta */}
            <div className="quiz-question-meta">
              <span className="quiz-question-badge">
                {currentQ.chapterRef || currentQ.categoryLabel}
              </span>
              <span className="quiz-question-points">+{currentQ.points} Pts</span>
            </div>

            {/* Questions Text */}
            <h3 className="quiz-question-text">{currentQ.question}</h3>
            {currentQ.questionSanskrit && (
              <p className="quiz-question-sanskrit">
                <span>{currentQ.questionSanskrit}</span>
                <button
                  type="button"
                  className="quiz-audio-btn"
                  onClick={() => playPronunciation(currentQ.questionSanskrit || '')}
                  title="Hear pronunciation"
                >
                  🔊
                </button>
              </p>
            )}

            {/* Options List */}
            <div className="quiz-options-list">
              {currentQ.options.map((opt, idx) => {
                const letters = ['A', 'B', 'C', 'D'];
                const isSelected = selectedOption === idx;
                let btnClass = 'quiz-option-btn';
                if (isAnswerChecked) {
                  if (idx === currentQ.correctIndex) {
                    btnClass += ' correct';
                  } else if (isSelected) {
                    btnClass += ' incorrect';
                  }
                } else if (isSelected) {
                  btnClass += ' selected';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    className={btnClass}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswerChecked}
                  >
                    <span className="quiz-option-letter">{letters[idx]}</span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Explanation Box on Answer */}
            {isAnswerChecked && (
              <div
                className={`quiz-explanation-card${
                  selectedOption !== currentQ.correctIndex ? ' incorrect-box' : ''
                }`}
              >
                <div className="quiz-explanation-title">
                  {selectedOption === currentQ.correctIndex ? '✓ Correct! व्याख्या (Explanation):' : '✗ Incorrect. सही उत्तर व्याख्या:'}
                </div>
                <p className="quiz-explanation-text">{currentQ.explanation}</p>
              </div>
            )}

            {/* Controls */}
            <div className="quiz-controls-row">
              <button
                type="button"
                className="quiz-skip-btn"
                onClick={() => setActiveQuestions(null)}
              >
                Quit Quiz
              </button>

              {isAnswerChecked && (
                <button
                  type="button"
                  className="quiz-next-btn"
                  onClick={handleNext}
                >
                  {currentIndex < activeQuestions.length - 1 ? 'Next Question ➔' : 'View Results ➔'}
                </button>
              )}
            </div>
          </div>
        )
      )}
    </section>
  );
};

export default QuizSection;
