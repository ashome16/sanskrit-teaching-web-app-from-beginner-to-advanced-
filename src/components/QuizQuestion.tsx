import React, { useState } from 'react';
import type { QuizQuestion as QuizQuestionType } from '../types';
import {
  SpeechHandler,
  TextToSpeechHandler,
  calculatePronunciationAccuracy,
} from '../utils/speech';
import type { SpeechRecognitionResult } from '../utils/speech';
import '../styles/quiz-question.css';

interface QuizQuestionProps {
  question: QuizQuestionType;
  answer: string;
  onAnswerChange: (answer: string) => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  answer,
  onAnswerChange,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [showPronunciation, setShowPronunciation] = useState(false);

  const speechHandler = new SpeechHandler();
  const ttsHandler = new TextToSpeechHandler();

  const handleMultipleChoiceChange = (option: string) => {
    onAnswerChange(option);
  };

  const handleShortAnswerChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    onAnswerChange(event.target.value);
  };

  const handleStartPronunciationRecording = () => {
    setTranscript('');
    setAccuracy(null);
    setIsListening(true);

    speechHandler.startListening(
      (result: SpeechRecognitionResult) => {
        setTranscript(result.transcript);

        if (result.isFinal) {
          const acc = calculatePronunciationAccuracy(
            result.transcript,
            question.correctAnswer as string
          );
          setAccuracy(acc);

          if (acc >= 70) {
            onAnswerChange(result.transcript);
          }

          setIsListening(false);
        }
      },
      (error: string) => {
        console.error('Speech recognition error:', error);
        setIsListening(false);
      }
    );
  };

  const handleStopPronunciationRecording = () => {
    speechHandler.stopListening();
    setIsListening(false);
  };

  const handleListenToQuestion = () => {
    ttsHandler.speak({
      text: question.question,
      language: 'en-US',
    });
  };

  return (
    <div className={`quiz-question type-${question.type}`}>
      <div className="question-header">
        <h2>{question.question}</h2>
        <span className="points">+{question.points} points</span>
      </div>

      <div className="question-body">
        {question.type === 'multiple-choice' && (
          <div className="options">
            {question.options?.map((option, index) => (
              <label key={index} className="option">
                <input
                  type="radio"
                  name="option"
                  value={option}
                  checked={answer === option}
                  onChange={() => handleMultipleChoiceChange(option)}
                />
                <span className="option-text">{option}</span>
              </label>
            ))}
          </div>
        )}

        {question.type === 'short-answer' && (
          <div className="short-answer">
            <textarea
              value={answer}
              onChange={handleShortAnswerChange}
              placeholder="Type your answer here..."
              rows={4}
            />
          </div>
        )}

        {question.type === 'pronunciation' && (
          <div className="pronunciation-question">
            <div className="pronunciation-controls">
              <button
                className="btn btn-secondary"
                onClick={handleListenToQuestion}
              >
                🔊 Listen to Question
              </button>
            </div>

            {!showPronunciation ? (
              <button
                className="btn btn-primary"
                onClick={() => setShowPronunciation(true)}
              >
                🎤 Record Your Answer
              </button>
            ) : (
              <div className="recording-controls">
                <button
                  className={`btn btn-primary ${isListening ? 'listening' : ''}`}
                  onClick={
                    isListening
                      ? handleStopPronunciationRecording
                      : handleStartPronunciationRecording
                  }
                >
                  {isListening ? '🎤 Listening...' : '🎤 Start Recording'}
                </button>
              </div>
            )}

            {transcript && (
              <div className="pronunciation-result">
                <div className="transcript">
                  <span className="label">You said:</span>
                  <p>{transcript}</p>
                </div>

                {accuracy !== null && (
                  <div className="accuracy-display">
                    <div className="accuracy-score">
                      <span className={accuracy >= 70 ? 'good' : 'needs-work'}>
                        {Math.round(accuracy)}% match
                      </span>
                    </div>
                    {accuracy >= 70 && (
                      <p className="acceptance">✓ Answer accepted!</p>
                    )}
                    {accuracy < 70 && (
                      <p className="try-again">Try again for a better match.</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizQuestion;
