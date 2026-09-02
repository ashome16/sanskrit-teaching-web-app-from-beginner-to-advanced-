import React, { useState } from 'react';
import type { Lesson, LessonSentence } from '../types/chapters';
import '../styles/textbook-reader.css';

interface TextbookReaderProps {
  lessons: Lesson[];
  activeLessonId: string;
  onSelectLesson: (lessonId: string) => void;
  sentence: LessonSentence;
  sentenceNumber: number;
  totalSentences: number;
  onWordClick: (word: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirstSentence: boolean;
  isLastSentence: boolean;
}

const TextbookReader: React.FC<TextbookReaderProps> = ({
  lessons,
  activeLessonId,
  onSelectLesson,
  sentence,
  sentenceNumber,
  totalSentences,
  onWordClick,
  onNext,
  onPrevious,
  isFirstSentence,
  isLastSentence,
}) => {
  const activeLesson = lessons.find((lesson) => lesson.id === activeLessonId);
  const isVarnamala = activeLessonId === 'varnamala';
  const isGroupedLesson = isVarnamala || activeLessonId === 'numbers';
  const [isChartOpen, setIsChartOpen] = useState(false);

  return (
    <section className="textbook-reader">
      <div className="textbook-lesson-select-row">
        <label htmlFor="lesson-select" className="textbook-lesson-select-label">
          Select Lesson
        </label>
        <select
          id="lesson-select"
          className="textbook-lesson-select"
          value={activeLessonId}
          onChange={(event) => onSelectLesson(event.target.value)}
        >
          {lessons.map((lesson) => (
            <option key={lesson.id} value={lesson.id}>
              {lesson.title}
            </option>
          ))}
        </select>
      </div>

      <header className="textbook-reader-header">
        <h2>{activeLesson?.title}</h2>
        {activeLesson && (
          <p className="textbook-reader-source">Source Material: {activeLesson.fileName}</p>
        )}
        {!isGroupedLesson && (
          <span className="textbook-reader-progress">
            Paragraph {sentenceNumber} of {totalSentences}
          </span>
        )}
      </header>

      {isGroupedLesson && activeLesson ? (
        <div className="varnamala-groups">
          {isVarnamala && (
            <div className="varnamala-chart-toggle-wrap">
              <button
                type="button"
                className="varnamala-chart-toggle"
                onClick={() => setIsChartOpen((open) => !open)}
                aria-expanded={isChartOpen}
                aria-controls="varnamala-chart-panel"
              >
                🗺️ View Alphabet Pronunciation Reference Chart
                <span className="varnamala-chart-toggle-arrow">{isChartOpen ? '▲' : '▼'}</span>
              </button>
              <div
                id="varnamala-chart-panel"
                className={`varnamala-chart-panel${isChartOpen ? ' varnamala-chart-panel--open' : ''}`}
              >
                <img
                  src="./image1.jpg"
                  alt="Sanskrit Pronunciation Chart"
                  className="varnamala-chart-image"
                  loading="lazy"
                />
              </div>
            </div>
          )}
          {activeLesson.sentences.map((group, groupIdx) => (
            <div
              key={group.category || groupIdx}
              className={`varnamala-row varnamala-row--${groupIdx % 10}`}
            >
              <div className="varnamala-row-header">
                <span className="varnamala-row-label">{group.meaning || group.category}</span>
              </div>
              <div className="varnamala-row-letters">
                {group.words.map((letter, letterIdx) => (
                  <button
                    key={`${activeLessonId}-${groupIdx}-${letterIdx}`}
                    type="button"
                    className="varnamala-letter-btn"
                    onClick={() => onWordClick(letter)}
                    aria-label={`Play pronunciation for ${letter}`}
                  >
                    {letter}
                  </button>
                ))}
              </div>
              <p className="varnamala-row-description">{group.sanskrit}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="textbook-sentence-block">
          <p className="textbook-sentence-sanskrit">
            {sentence.words.map((word, idx) => (
              <span
                key={`${activeLessonId}-${sentenceNumber}-${idx}`}
                className="interactive-word"
                onClick={() => onWordClick(word)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    onWordClick(word);
                  }
                }}
              >
                {word}
              </span>
            ))}
          </p>
          <p className="textbook-sentence-meaning">{sentence.meaning}</p>
          {sentence.paragraphTranslation && (
            <div className="textbook-paragraph-translation">
              <span className="textbook-paragraph-translation-label">English Paragraph Meaning</span>
              <p className="textbook-paragraph-translation-text">{sentence.paragraphTranslation}</p>
            </div>
          )}
        </div>
      )}

      {!isGroupedLesson && (
        <div className="textbook-nav-buttons">
          <button
            type="button"
            className="textbook-nav-btn"
            onClick={onPrevious}
            disabled={isFirstSentence}
          >
            ◀ Previous
          </button>
          <button
            type="button"
            className="textbook-nav-btn"
            onClick={onNext}
            disabled={isLastSentence}
          >
            Next ▶
          </button>
        </div>
      )}
    </section>
  );
};

export default TextbookReader;


