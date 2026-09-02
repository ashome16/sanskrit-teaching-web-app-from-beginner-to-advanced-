import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAppStore } from '../store';
import { QUIZZES } from '../data/lessons';
import { calculateQuizScore, formatQuizAttempt } from '../utils/storage';
import QuizQuestion from '../components/QuizQuestion';
import QuizResults from '../components/QuizResults';
import '../styles/quiz.css';

const QuizPage: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const { recordQuizAttempt, userId } = useAppStore();

  const quiz = QUIZZES.find((q) => q.id === quizId);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [quizResult, setQuizResult] = useState<ReturnType<typeof calculateQuizScore> | null>(null);

  if (!quiz) {
    return (
      <div className="quiz-error">
        <h2>Quiz not found</h2>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

  const handleAnswerChange = (answer: string) => {
    setUserAnswers({
      ...userAnswers,
      [currentQuestion.id]: answer,
    });
  };

  const handleNextQuestion = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitQuiz = () => {
    const result = calculateQuizScore(quiz.questions, userAnswers);
    setQuizResult(result);

    // Record the quiz attempt
    const attempt = formatQuizAttempt(
      quiz.id,
      userId,
      quiz.questions,
      userAnswers
    );
    recordQuizAttempt(attempt);

    setSubmitted(true);
  };

  if (submitted && quizResult) {
    return (
      <QuizResults
        quiz={quiz}
        result={quizResult}
        userAnswers={userAnswers}
        questions={quiz.questions}
        onRetry={() => {
          setUserAnswers({});
          setCurrentQuestionIndex(0);
          setSubmitted(false);
          setQuizResult(null);
        }}
      />
    );
  }

  return (
    <div className="quiz-page">
      <div className="quiz-header">
        <h1>{quiz.title}</h1>
        <p>{quiz.description}</p>
        <div className="quiz-progress">
          Question {currentQuestionIndex + 1} of {quiz.questions.length}
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="quiz-container">
        <QuizQuestion
          question={currentQuestion}
          answer={userAnswers[currentQuestion.id] || ''}
          onAnswerChange={handleAnswerChange}
        />
      </div>

      <div className="quiz-controls">
        <button
          className="btn btn-secondary"
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          ← Previous
        </button>

        <div className="middle-controls">
          {isLastQuestion ? (
            <button
              className="btn btn-success"
              onClick={handleSubmitQuiz}
            >
              Submit Quiz
            </button>
          ) : (
            <button
              className="btn btn-secondary"
              onClick={handleNextQuestion}
            >
              Next Question →
            </button>
          )}
        </div>

        <button
          className="btn btn-text"
          onClick={() => navigate('/')}
        >
          Exit
        </button>
      </div>

      <Link to="/" className="back-link">
        ← Back to Home
      </Link>
    </div>
  );
};

export default QuizPage;
