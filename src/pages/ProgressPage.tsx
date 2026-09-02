import React from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../store';
import { LESSONS } from '../data/lessons';
import '../styles/progress.css';

const ProgressPage: React.FC = () => {
  const { progress, resetProgress } = useAppStore();

  const calculateStats = () => {
    const totalLessons = LESSONS.length;
    const completedLessons = progress.lessonsCompleted.length;
    const completionPercentage = (completedLessons / totalLessons) * 100;

    const totalQuizzes = progress.quizzesCompleted.length;
    const averageScore =
      totalQuizzes > 0
        ? Math.round(
            progress.quizzesCompleted.reduce(
              (sum, attempt) => sum + (attempt.score / attempt.totalPoints) * 100,
              0
            ) / totalQuizzes
          )
        : 0;

    const lastActivityDate = new Date(progress.lastActivityDate);
    const daysAgo = Math.floor(
      (Date.now() - progress.lastActivityDate) / (1000 * 60 * 60 * 24)
    );

    return {
      totalLessons,
      completedLessons,
      completionPercentage,
      totalQuizzes,
      averageScore,
      lastActivityDate,
      daysAgo,
    };
  };

  const stats = calculateStats();
  const nextLesson =
    LESSONS.find((lesson) => !progress.lessonsCompleted.includes(lesson.id)) ||
    LESSONS[LESSONS.length - 1];

  const handleResetProgress = () => {
    if (
      window.confirm(
        'Are you sure you want to reset all progress? This cannot be undone.'
      )
    ) {
      resetProgress();
    }
  };

  return (
    <div className="progress-page">
      <h1>Your Learning Progress</h1>

      <section className="stats-overview">
        <div className="stat-card">
          <div className="stat-number">{stats.completedLessons}</div>
          <div className="stat-label">Lessons Completed</div>
          <div className="stat-subtext">
            of {stats.totalLessons} total lessons
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-number">{stats.completionPercentage.toFixed(0)}%</div>
          <div className="stat-label">Completion Rate</div>
          <div className="progress-bar-small">
            <div
              className="progress-fill"
              style={{ width: `${stats.completionPercentage}%` }}
            />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-number">{stats.totalQuizzes}</div>
          <div className="stat-label">Quizzes Taken</div>
          {stats.totalQuizzes > 0 && (
            <div className="stat-subtext">
              Average Score: {stats.averageScore}%
            </div>
          )}
        </div>

        <div className="stat-card">
          <div className="stat-number">{progress.totalPoints}</div>
          <div className="stat-label">Total Points Earned</div>
        </div>
      </section>

      <section className="focus-panel">
        <div className="focus-card">
          <span className="eyebrow">Current streak</span>
          <div className="streak-value">{progress.streak} days</div>
          <p>Practice each day to keep your momentum building.</p>
        </div>

        <div className="focus-card">
          <span className="eyebrow">Next goal</span>
          <h3>{nextLesson.title}</h3>
          <p>{nextLesson.description}</p>
          <Link to={`/lesson/${nextLesson.id}`} className="btn btn-primary">
            Start next lesson
          </Link>
        </div>
      </section>

      <section className="lesson-progress">
        <h2>Lesson Progress</h2>
        <div className="lesson-list">
          {LESSONS.map((lesson) => {
            const isCompleted = progress.lessonsCompleted.includes(lesson.id);
            return (
              <div
                key={lesson.id}
                className={`lesson-progress-item ${isCompleted ? 'completed' : ''}`}
              >
                <div className="lesson-status">
                  {isCompleted ? (
                    <span className="status-badge">✓</span>
                  ) : (
                    <span className="status-badge incomplete">○</span>
                  )}
                </div>
                <div className="lesson-info">
                  <h3>{lesson.title}</h3>
                  <p>{lesson.description}</p>
                  <span className={`level-badge level-${lesson.level}`}>
                    {lesson.level}
                  </span>
                </div>
                <div className="lesson-action">
                  <Link
                    to={`/lesson/${lesson.id}`}
                    className="btn btn-small"
                  >
                    {isCompleted ? 'Review' : 'Start'}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="quiz-history">
        <h2>Recent Quiz Attempts</h2>
        {progress.quizzesCompleted.length === 0 ? (
          <p className="no-data">No quizzes taken yet. Start a lesson and take the quiz!</p>
        ) : (
          <div className="quiz-list">
            {progress.quizzesCompleted.slice(-10).reverse().map((attempt) => (
              <div key={attempt.id} className="quiz-item">
                <div className="quiz-info">
                  <h4>Quiz {attempt.quizId}</h4>
                  <p className="quiz-date">
                    {new Date(attempt.timestamp).toLocaleDateString()}
                  </p>
                </div>
                <div className="quiz-score">
                  <div className="score-text">
                    {attempt.score}/{attempt.totalPoints}
                  </div>
                  <div className="score-percentage">
                    {Math.round((attempt.score / attempt.totalPoints) * 100)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="last-activity">
        <p className="activity-text">
          Last activity: {stats.daysAgo === 0 ? 'Today' : `${stats.daysAgo} days ago`}
        </p>
      </section>

      <div className="action-buttons">
        <Link to="/" className="btn btn-primary">
          Continue Learning
        </Link>
        <button
          className="btn btn-danger"
          onClick={handleResetProgress}
        >
          Reset All Progress
        </button>
      </div>
    </div>
  );
};

export default ProgressPage;
