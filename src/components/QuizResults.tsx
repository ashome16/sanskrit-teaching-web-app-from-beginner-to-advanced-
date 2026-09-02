import React from 'react';
import { Link } from 'react-router-dom';
import type { Quiz, QuizQuestion as QuizQuestionType } from '../types';
import { calculateQuizScore } from '../utils/storage';
import '../styles/quiz-results.css';

interface QuizResultsProps {
  quiz: Quiz;
  result: ReturnType<typeof calculateQuizScore>;
  userAnswers: { [key: string]: string };
  questions: QuizQuestionType[];
  onRetry: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({
  result,
  userAnswers,
  questions,
  onRetry,
}) => {
  const getQuestionResult = (question: QuizQuestionType) => {
    const userAnswer = userAnswers[question.id] || '';
    let isCorrect = false;

    if (Array.isArray(question.correctAnswer)) {
      isCorrect = question.correctAnswer.some(
        (answer) =>
          answer.toLowerCase().trim() === userAnswer.toLowerCase().trim()
      );
    } else {
      isCorrect =
        question.correctAnswer.toLowerCase().trim() ===
        userAnswer.toLowerCase().trim();
    }

    return { isCorrect, userAnswer };
  };

  return (
    <div className="quiz-results">
      <div className="results-header">
        <h1>Quiz Complete!</h1>

        <div
          className={`score-card ${result.passed ? 'passed' : 'failed'}`}
        >
          <div className="score-display">
            <div className="score-number">{result.score}</div>
            <div className="score-divider">/</div>
            <div className="score-total">{result.totalPoints}</div>
          </div>
          <div className="score-percentage">{result.percentage}%</div>
          <div className="score-status">
            {result.passed ? '✓ Passed' : '✗ Try Again'}
          </div>
        </div>
      </div>

      <div className="results-feedback">
        <p>{result.feedback}</p>
      </div>

      <div className="results-details">
        <h2>Question Review</h2>
        <div className="questions-review">
          {questions.map((question, index) => {
            const { isCorrect, userAnswer } = getQuestionResult(question);
            return (
              <div
                key={question.id}
                className={`question-review ${isCorrect ? 'correct' : 'incorrect'}`}
              >
                <div className="question-number">
                  <span className="number">Q{index + 1}</span>
                  <span className={`status ${isCorrect ? 'correct' : 'incorrect'}`}>
                    {isCorrect ? '✓' : '✗'}
                  </span>
                </div>

                <div className="question-content">
                  <h3>{question.question}</h3>

                  {question.type === 'multiple-choice' && (
                    <div className="answer-info">
                      <p>
                        <strong>Your answer:</strong> {userAnswer || 'Not answered'}
                      </p>
                      <p>
                        <strong>Correct answer:</strong>{' '}
                        {Array.isArray(question.correctAnswer)
                          ? question.correctAnswer.join(' or ')
                          : question.correctAnswer}
                      </p>
                    </div>
                  )}

                  {question.type === 'short-answer' && (
                    <div className="answer-info">
                      <p>
                        <strong>Your answer:</strong> {userAnswer || 'Not answered'}
                      </p>
                      <p>
                        <strong>Correct answer:</strong>{' '}
                        {Array.isArray(question.correctAnswer)
                          ? question.correctAnswer.join(' or ')
                          : question.correctAnswer}
                      </p>
                    </div>
                  )}

                  {question.type === 'pronunciation' && (
                    <div className="answer-info">
                      <p>
                        <strong>Your pronunciation:</strong>{' '}
                        {userAnswer || 'Not recorded'}
                      </p>
                      <p>
                        <strong>Target pronunciation:</strong>{' '}
                        {question.correctAnswer}
                      </p>
                    </div>
                  )}

                  <p className="explanation">
                    <strong>Explanation:</strong> {question.explanation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="results-actions">
        <button className="btn btn-primary" onClick={onRetry}>
          Retake Quiz
        </button>
        <Link to="/" className="btn btn-secondary">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default QuizResults;
