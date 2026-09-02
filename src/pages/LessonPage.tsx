import React, { useMemo, useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAppStore } from '../store';
import { getLessonById, getQuizByLessonId, fetchLatestLessonById } from '../data/lessons';
import { TextToSpeechHandler } from '../utils/speech';
import { buildLessonSteps } from '../utils/lessonSteps';
import LessonStepView from '../components/LessonStepView';
import PronunciationPractice from '../components/PronunciationPractice';
import LessonVocabularyPanel from '../components/LessonVocabularyPanel';
import '../styles/lesson.css';
import '../styles/lesson-flow.css';
import '../styles/lesson-vocabulary.css';

const LessonPage: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { markLessonComplete, updateCurrentLesson, progress } = useAppStore();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [ttsHandler] = useState(new TextToSpeechHandler());
  const [selectedWord, setSelectedWord] = useState<{
    devanagari: string;
    transliteration: string;
    pronunciation: string;
  } | null>(null);
  const [showWordPractice, setShowWordPractice] = useState(false);

  const [lesson, setLesson] = useState(() => (lessonId ? getLessonById(lessonId) : null));
  const quiz = lessonId ? getQuizByLessonId(lessonId) : null;
  const isLessonCompleted = progress.lessonsCompleted.includes(lessonId || '');

  // Refresh from the cache-busted chapters.json fetch whenever the route's lesson changes.
  useEffect(() => {
    setLesson(lessonId ? getLessonById(lessonId) : null);
    if (!lessonId) return;
    let cancelled = false;
    fetchLatestLessonById(lessonId).then((fresh) => {
      if (!cancelled && fresh) setLesson(fresh);
    });
    return () => {
      cancelled = true;
    };
  }, [lessonId]);

  // Support both verse-based and legacy lessons
  const totalVerses = lesson?.verses?.length || 1;
  const isVerseBasedLesson = lesson?.verses && lesson.verses.length > 0;

  // Build steps for current verse (or entire lesson for legacy format)
  const steps = useMemo(
    () => (lesson ? buildLessonSteps(lesson, currentVerseIndex) : []),
    [lesson, currentVerseIndex]
  );

  // Reset to the first step whenever lesson or verse changes
  const [lastLessonId, setLastLessonId] = useState(lessonId);
  const [lastVerseIndex, setLastVerseIndex] = useState(currentVerseIndex);
  if (lessonId !== lastLessonId) {
    setLastLessonId(lessonId);
    setCurrentVerseIndex(0);
    setCurrentStepIndex(0);
  }
  if (currentVerseIndex !== lastVerseIndex) {
    setLastVerseIndex(currentVerseIndex);
    setCurrentStepIndex(0);
  }

  useEffect(() => {
    if (lesson) {
      updateCurrentLesson(lesson.id);
    }
  }, [lesson, updateCurrentLesson]);

  useEffect(() => {
    if (isLessonCompleted) {
      setShowCelebration(true);
      const timer = window.setTimeout(() => setShowCelebration(false), 3500);
      return () => window.clearTimeout(timer);
    }
  }, [isLessonCompleted]);

  if (!lesson || steps.length === 0) {
    return (
      <div className="lesson-error">
        <h2>Lesson not found</h2>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  const checklist = [
    {
      label: 'Read the lesson introduction',
      done:
        steps.slice(0, currentStepIndex).some((s) => s.type === 'introduction') ||
        isLessonCompleted,
    },
    {
      label: 'Practice pronunciation out loud',
      done:
        steps.slice(0, currentStepIndex).some((s) => s.type === 'sentence') ||
        isLessonCompleted,
    },
    {
      label: 'Review the meaning and examples',
      done: currentStep.type === 'checklist' || isLessonCompleted,
    },
    {
      label: quiz ? 'Take the quiz to test recall' : 'Finish the lesson',
      done: isLessonCompleted,
    },
  ];

  const clearWordPractice = () => {
    setShowWordPractice(false);
    setSelectedWord(null);
  };

  const handleNextStep = () => {
    const isChecklistStep = currentStep?.type === 'checklist';
    const isLastVerseChecklistStep = isChecklistStep && currentVerseIndex === totalVerses - 1;

    if (isChecklistStep && !isLastVerseChecklistStep && isVerseBasedLesson) {
      // Progress to next verse
      setCurrentVerseIndex((prev) => prev + 1);
    } else {
      // Normal step navigation
      setCurrentStepIndex((prevIndex) => Math.min(prevIndex + 1, steps.length - 1));
    }
    clearWordPractice();
  };

  const handlePreviousStep = () => {
    if (currentStepIndex > 0) {
      // Go to previous step in current verse
      setCurrentStepIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (currentVerseIndex > 0) {
      // Go to last step of previous verse
      setCurrentVerseIndex((prev) => prev - 1);
      // Set to last step index (will be set when steps rebuild)
      // This happens automatically due to useEffect
    }
    clearWordPractice();
  };

  const handleCompleteLesson = () => {
    // Only mark as complete if on last verse's checklist
    if (currentVerseIndex === totalVerses - 1 && currentStep?.type === 'checklist') {
      markLessonComplete(lesson.id);
      setShowCelebration(true);
    }
  };

  const handleStartQuiz = () => {
    if (quiz) {
      navigate(`/quiz/${quiz.id}`);
    }
  };

  return (
    <div className="lesson-page">
      <div className="lesson-header">
        <h1>{lesson.title}</h1>
        <div className="lesson-progress">
          {isVerseBasedLesson ? (
            <>
              Verse {currentVerseIndex + 1} of {totalVerses} • Step {currentStepIndex + 1} of {steps.length}
            </>
          ) : (
            <>
              Step {currentStepIndex + 1} of {steps.length}
            </>
          )}
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${isVerseBasedLesson
                  ? ((currentVerseIndex + currentStepIndex / steps.length) / totalVerses) * 100
                  : ((currentStepIndex + 1) / steps.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {showCelebration && (
        <div className="completion-banner" role="status" aria-live="polite">
          <span className="completion-badge">✓</span>
          <div>
            <strong>Lesson completed!</strong>
            <p>Great work. Your progress has been saved.</p>
          </div>
        </div>
      )}

      <div className="lesson-container">
        <main className="lesson-main">
          {/* key={currentStep.id} forces a full unmount/remount so the previous
              step's DOM is torn down entirely instead of lingering hidden. */}
          <LessonStepView
            key={currentStep.id}
            step={currentStep}
            ttsHandler={ttsHandler}
            checklist={currentStep.type === 'checklist' ? checklist : undefined}
            onWordSelected={(word) => {
              setSelectedWord(word);
              setShowWordPractice(true);
            }}
          />

          {showWordPractice && selectedWord && (
            <div className="word-practice-section">
              <div className="word-practice-header">
                <h3>🎤 Pronunciation Practice</h3>
                <button className="close-word-btn" onClick={() => setShowWordPractice(false)}>
                  ✕
                </button>
              </div>
              <PronunciationPractice
                content={{
                  type: 'pronunciation',
                  title: `Practice: ${selectedWord.transliteration}`,
                  description: `Learn to pronounce: ${selectedWord.devanagari}`,
                  data: {
                    devanagari: selectedWord.devanagari,
                    transliteration: selectedWord.transliteration,
                    pronunciation: selectedWord.pronunciation,
                  },
                }}
                ttsHandler={ttsHandler}
              />
            </div>
          )}
        </main>

        <aside className="lesson-sidebar">
          {isVerseBasedLesson && lesson.verses && (
            <div className="verse-selector">
              <h3>📖 Verses</h3>
              <ul>
                {lesson.verses.map((verse, index) => (
                  <li
                    key={verse.id}
                    className={`verse-item ${index === currentVerseIndex ? 'active' : ''} ${
                      index < currentVerseIndex ? 'completed' : ''
                    }`}
                    onClick={() => {
                      if (index <= currentVerseIndex) {
                        setCurrentVerseIndex(index);
                        setCurrentStepIndex(0);
                        clearWordPractice();
                      }
                    }}
                    title={`Verse ${index + 1}: ${verse.title}`}
                  >
                    <span className="verse-number">{index + 1}</span>
                    <span className="verse-title">{verse.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="content-list">
            <h3>Lesson Steps</h3>
            <ul>
              {steps.map((step, index) => (
                <li
                  key={step.id}
                  className={`content-item ${index === currentStepIndex ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentStepIndex(index);
                    clearWordPractice();
                  }}
                >
                  <span className="content-type">{step.type}</span>
                  <span className="content-title">{step.title}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="study-checklist">
            <h3>Study checklist</h3>
            <ul>
              {checklist.map((item) => (
                <li key={item.label} className={item.done ? 'done' : ''}>
                  <span>{item.done ? '✓' : '○'}</span>
                  {item.label}
                </li>
              ))}
            </ul>
          </div>

          {lesson && (
            <div className="lesson-vocabulary-wrapper">
              <LessonVocabularyPanel
                lesson={lesson}
                onWordClick={(word) => {
                  setSelectedWord({
                    devanagari: word.devanagari,
                    transliteration: word.transliteration,
                    pronunciation: word.meaning || word.transliteration,
                  });
                  setShowWordPractice(true);
                }}
              />
            </div>
          )}
        </aside>
      </div>

      <div className="lesson-controls">
        <button
          className="btn btn-secondary"
          onClick={handlePreviousStep}
          disabled={isFirstStep && currentVerseIndex === 0}
        >
          ← Previous
        </button>

        <div className="middle-controls">
          {isLessonCompleted && quiz && (
            <button className="btn btn-primary" onClick={handleStartQuiz}>
              Take Quiz →
            </button>
          )}
        </div>

        {isLastStep ? (
          currentVerseIndex === totalVerses - 1 ? (
            // Last step of last verse - show "Finish Lesson"
            <button
              className="btn btn-success"
              onClick={handleCompleteLesson}
              disabled={isLessonCompleted}
            >
              {isLessonCompleted ? '✓ Lesson Completed' : '✓ Finish Lesson'}
            </button>
          ) : (
            // Last step of non-final verse - show "Next Verse"
            <button className="btn btn-secondary" onClick={handleNextStep}>
              Next Verse →
            </button>
          )
        ) : (
          <button className="btn btn-secondary" onClick={handleNextStep}>
            Next →
          </button>
        )}
      </div>

      <Link to="/" className="back-link">
        ← Back to Lessons
      </Link>
    </div>
  );
};

export default LessonPage;
