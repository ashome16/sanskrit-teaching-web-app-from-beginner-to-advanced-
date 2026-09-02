import React from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../store';
import { LESSONS, getLessonsByLevel } from '../data/lessons';
import '../styles/pages.css';

const Home: React.FC = () => {
  const { progress } = useAppStore();
  const beginnerLessons = getLessonsByLevel('beginner');
  const intermediateLessons = getLessonsByLevel('intermediate');
  const advancedLessons = getLessonsByLevel('advanced');

  const getCompletionPercentage = () => {
    return Math.round((progress.lessonsCompleted.length / LESSONS.length) * 100);
  };

  const recommendedLesson =
    LESSONS.find((lesson) => !progress.lessonsCompleted.includes(lesson.id)) ||
    LESSONS[LESSONS.length - 1];

  const dailyChallenges = [
    {
      phrase: 'अभ्यासः परं श्रेयः',
      meaning: 'Practice is the highest good.',
      focus: 'Repeat the lesson aloud 3 times and then review the meaning.',
    },
    {
      phrase: 'ज्ञानं ब्रह्म',
      meaning: 'Knowledge is Brahman.',
      focus: 'Focus on pronunciation and the deeper meaning of the verse.',
    },
    {
      phrase: 'सत्यम् शिवम् सुंदरम्',
      meaning: 'The truth is auspicious and beautiful.',
      focus: 'Read slowly, match the sounds, and notice the rhythm.',
    },
  ];

  const dailyChallenge =
    dailyChallenges[new Date().getDate() % dailyChallenges.length];

  const weeklyPlan = [
    {
      day: 'Mon',
      objective: 'Review the lesson text and pronunciation',
      lesson: beginnerLessons[0] || LESSONS[0],
    },
    {
      day: 'Tue',
      objective: 'Practice a short mantra aloud',
      lesson: beginnerLessons[1] || LESSONS[1] || LESSONS[0],
    },
    {
      day: 'Wed',
      objective: 'Complete a quiz checkpoint',
      lesson: beginnerLessons[2] || LESSONS[2] || LESSONS[0],
    },
    {
      day: 'Thu',
      objective: 'Study one new Sanskrit word group',
      lesson: beginnerLessons[3] || LESSONS[3] || LESSONS[0],
    },
    {
      day: 'Fri',
      objective: 'Revisit the previous lesson and retell the meaning',
      lesson: LESSONS[Math.min(progress.lessonsCompleted.length, LESSONS.length - 1)] || LESSONS[0],
    },
    {
      day: 'Sat',
      objective: 'Take a quiz and review errors',
      lesson: recommendedLesson,
    },
    {
      day: 'Sun',
      objective: 'Choose one lesson to review and improve fluency',
      lesson: recommendedLesson,
    },
  ];

  const roadmap = [
    {
      level: 'beginner',
      title: 'Beginner Foundation',
      description: 'Devanagari basics, simple prayers, and pronunciation rhythm.',
      lessons: beginnerLessons,
    },
    {
      level: 'intermediate',
      title: 'Intermediate Growth',
      description: 'Verb forms, grammar patterns, and more complex passages.',
      lessons: intermediateLessons,
    },
    {
      level: 'advanced',
      title: 'Advanced Mastery',
      description: 'Deeper recitation, interpretation, and sustained fluency.',
      lessons: advancedLessons,
    },
  ] as const;

  return (
    <div className="home">
      <header className="hero">
        <h1>Sanskrit Learning Journey</h1>
        <p>From Beginner to Advanced</p>
      </header>

      <section className="progress-summary">
        <div className="stat">
          <span className="stat-value">{progress.totalPoints}</span>
          <span className="stat-label">Total Points</span>
        </div>
        <div className="stat">
          <span className="stat-value">{progress.lessonsCompleted.length}</span>
          <span className="stat-label">Lessons Completed</span>
        </div>
        <div className="stat">
          <span className="stat-value">{getCompletionPercentage()}%</span>
          <span className="stat-label">Overall Progress</span>
        </div>
      </section>

      <section className="overview-panel">
        <div className="focus-card">
          <span className="eyebrow">Next up</span>
          <h3>{recommendedLesson.title}</h3>
          <p>{recommendedLesson.description}</p>
          <Link to={`/lesson/${recommendedLesson.id}`} className="btn btn-primary">
            Continue lesson
          </Link>
        </div>

        <div className="focus-card streak-card">
          <span className="eyebrow">Learning streak</span>
          <div className="streak-value">{progress.streak}</div>
          <p>
            {progress.streak > 0
              ? 'You are building a strong daily rhythm. Keep it going!'
              : 'Complete any lesson or quiz today to start your streak.'}
          </p>
        </div>
      </section>

      <section className="daily-challenge">
        <div className="challenge-copy">
          <span className="eyebrow">Daily challenge</span>
          <h3>{dailyChallenge.phrase}</h3>
          <p className="challenge-meaning">{dailyChallenge.meaning}</p>
          <p>{dailyChallenge.focus}</p>
        </div>

        <div className="challenge-actions">
          <ul className="challenge-tips">
            <li>Read the phrase slowly</li>
            <li>Repeat the sound aloud</li>
            <li>Review the lesson meaning</li>
          </ul>
          <Link to={`/lesson/${recommendedLesson.id}`} className="btn btn-secondary">
            Practice now
          </Link>
        </div>
      </section>

      <section className="weekly-plan">
        <div className="section-heading">
          <span className="eyebrow">Weekly plan</span>
          <h2>Study rhythm for the next 7 days</h2>
        </div>

        <div className="week-grid">
          {weeklyPlan.map((item, index) => {
            const isDone = index < progress.lessonsCompleted.length;
            return (
              <div
                key={item.day}
                className={`week-item ${isDone ? 'done' : ''}`}
              >
                <div className="week-day">{item.day}</div>
                <h3>{item.objective}</h3>
                <p>{item.lesson.title}</p>
                <span>{isDone ? 'Completed' : 'Planned'}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="roadmap-panel">
        <div className="section-heading">
          <span className="eyebrow">Course roadmap</span>
          <h2>Beginner to Advanced Path</h2>
        </div>

        <div className="roadmap-grid">
          {roadmap.map((stage) => {
            const completedCount = stage.lessons.filter((lesson) =>
              progress.lessonsCompleted.includes(lesson.id)
            ).length;
            const progressPercent =
              stage.lessons.length > 0
                ? Math.round((completedCount / stage.lessons.length) * 100)
                : 0;

            return (
              <div key={stage.level} className="roadmap-card">
                <div className="roadmap-header">
                  <span className={`level-badge level-${stage.level}`}>
                    {stage.level}
                  </span>
                  <span className="roadmap-percent">{progressPercent}%</span>
                </div>
                <h3>{stage.title}</h3>
                <p>{stage.description}</p>
                <div className="roadmap-progress-bar">
                  <div
                    className="roadmap-progress-fill"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="roadmap-meta">
                  {completedCount} / {stage.lessons.length} lessons completed
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="lessons-container">
        {beginnerLessons.length > 0 && (
          <LessonSection
            title="Beginner Level"
            lessons={beginnerLessons}
            completedLessons={progress.lessonsCompleted}
          />
        )}
        {intermediateLessons.length > 0 && (
          <LessonSection
            title="Intermediate Level"
            lessons={intermediateLessons}
            completedLessons={progress.lessonsCompleted}
          />
        )}
        {advancedLessons.length > 0 && (
          <LessonSection
            title="Advanced Level"
            lessons={advancedLessons}
            completedLessons={progress.lessonsCompleted}
          />
        )}
      </div>

      <section className="action-buttons">
        <Link to="/progress" className="btn btn-primary">
          View Progress
        </Link>
      </section>
    </div>
  );
};

interface LessonSectionProps {
  title: string;
  lessons: typeof LESSONS;
  completedLessons: string[];
}

const LessonSection: React.FC<LessonSectionProps> = ({
  title,
  lessons,
  completedLessons,
}) => {
  return (
    <section className="lesson-section">
      <h2>{title}</h2>
      <div className="lesson-grid">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className={`lesson-card ${
              completedLessons.includes(lesson.id) ? 'completed' : ''
            }`}
          >
            <div className="lesson-card-header">
              <h3>{lesson.title}</h3>
              {completedLessons.includes(lesson.id) && (
                <span className="completion-badge">✓</span>
              )}
            </div>
            <p className="lesson-description">{lesson.description}</p>
            <div className="lesson-meta">
              <span className="duration">⏱️ {lesson.duration} min</span>
            </div>
            <Link
              to={`/lesson/${lesson.id}`}
              className="btn btn-secondary"
            >
              {completedLessons.includes(lesson.id) ? 'Review' : 'Start'}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Home;
