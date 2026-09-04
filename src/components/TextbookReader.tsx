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
  onJumpToSentence: (index: number) => void;
  isFirstSentence: boolean;
  isLastSentence: boolean;
}

type SectionJump = { index: number; label: string };

const buildSectionJumps = (lesson: Lesson | undefined): SectionJump[] => {
  if (!lesson?.sentences?.length) return [];
  const jumps: SectionJump[] = [{ index: 0, label: 'पाठः · Lesson text' }];
  lesson.sentences.forEach((item, index) => {
    if (item.kind === 'glossary-header') {
      jumps.push({ index, label: 'शब्दार्थ · Word meanings' });
    } else if (item.kind === 'exercise-header') {
      const short = (item.sanskrit || 'Exercise').replace(/\s+/g, ' ').trim();
      // Skip the main umbrella title if numbered sections follow — keep all headers
      jumps.push({ index, label: short.length > 42 ? `${short.slice(0, 40)}…` : short });
    }
  });
  return jumps;
};

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
  onJumpToSentence,
  isFirstSentence,
  isLastSentence,
}) => {
  const activeLesson = lessons.find((lesson) => lesson.id === activeLessonId);
  const isVarnamala = activeLessonId === 'varnamala';
  const isGroupedLesson = isVarnamala || activeLessonId === 'numbers' || activeLessonId === 'barakhadi';
  const [isChartOpen, setIsChartOpen] = useState(false);
  const sectionJumps = buildSectionJumps(activeLesson);
  const currentJumpIndex = (() => {
    if (!sectionJumps.length) return 0;
    let best = sectionJumps[0].index;
    for (const jump of sectionJumps) {
      if (jump.index <= sentenceNumber - 1) best = jump.index;
    }
    return best;
  })();

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

      {!isGroupedLesson && sectionJumps.length > 1 && (
        <div className="textbook-jump-row">
          <label htmlFor="section-jump" className="textbook-lesson-select-label">
            Jump to
          </label>
          <select
            id="section-jump"
            className="textbook-lesson-select textbook-jump-select"
            value={String(currentJumpIndex)}
            onChange={(event) => onJumpToSentence(Number(event.target.value))}
          >
            {sectionJumps.map((jump) => (
              <option key={`${jump.index}-${jump.label}`} value={String(jump.index)}>
                {jump.label}
              </option>
            ))}
          </select>
          <div className="textbook-jump-chips" aria-label="Quick sections">
            {sectionJumps.map((jump) => (
              <button
                key={`chip-${jump.index}`}
                type="button"
                className={`textbook-jump-chip${currentJumpIndex === jump.index ? ' active' : ''}`}
                onClick={() => onJumpToSentence(jump.index)}
              >
                {jump.label.startsWith('१') || jump.label.startsWith('२') || jump.label.startsWith('३')
                  || jump.label.startsWith('४') || jump.label.startsWith('५') || jump.label.startsWith('६')
                  || jump.label.startsWith('७') || jump.label.startsWith('८')
                  ? jump.label.split(' ')[0]
                  : jump.label.startsWith('शब्दार्थ')
                    ? 'शब्दार्थ'
                    : jump.label.startsWith('वयम् अभ्यास')
                      ? 'अभ्यास'
                      : jump.label.startsWith('पाठ')
                        ? 'पाठः'
                        : jump.label.split('·')[0].trim().slice(0, 10)}
              </button>
            ))}
          </div>
        </div>
      )}

      <header className="textbook-reader-header">
        <h2>{activeLesson?.title}</h2>
        {activeLesson && (
          <p className="textbook-reader-source">Source Material: {activeLesson.fileName}</p>
        )}
        {activeLessonId === 'barakhadi' && (
          <p className="textbook-glossary-hint" style={{ marginTop: '.35rem' }}>
            Tap any अक्षर to hear it. Rows follow क का कि की… कं कः.
          </p>
        )}
        {!isGroupedLesson && (
          <span className="textbook-reader-progress">
            {sentence.kind?.startsWith('glossary') || sentence.kind?.startsWith('exercise')
              ? `Exercise · ${sentenceNumber} of ${totalSentences}`
              : `Paragraph ${sentenceNumber} of ${totalSentences}`}
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
          {(sentence.kind === 'exercise-header' || sentence.kind === 'exercise-qa' || sentence.kind === 'exercise-note') ? (
            <div className={`textbook-glossary-card textbook-exercise-card${sentence.kind === 'exercise-header' ? ' textbook-glossary-card--header' : ''}`}>
              {sentence.kind === 'exercise-header' ? (
                <>
                  <p className="textbook-glossary-title">{sentence.sanskrit}</p>
                  <p className="textbook-glossary-subtitle">{sentence.meaning}</p>
                </>
              ) : sentence.kind === 'exercise-qa' ? (
                <>
                  <div className="textbook-glossary-pair">
                    <span className="textbook-glossary-label">प्रश्न</span>
                    <p className="textbook-exercise-q">
                      {sentence.words.length > 0 && sentence.sanskrit.length < 80 ? (
                        sentence.sanskrit
                      ) : (
                        sentence.sanskrit
                      )}
                    </p>
                  </div>
                  <div className="textbook-glossary-pair">
                    <span className="textbook-glossary-label">{sentence.answer_label || 'उत्तरम्'}</span>
                    <div className="textbook-glossary-arth">
                      <p className="textbook-glossary-arth-sa">
                        {(sentence.answer_sanskrit || sentence.sanskrit_gloss || '').split(/(\s+)/).map((part, idx) => {
                          const clean = part.replace(/[॥।,;:!?—–\-…\/()]+/g, '');
                          const isWord = /[\u0900-\u097F]/.test(clean);
                          if (!isWord) return <span key={idx}>{part}</span>;
                          return (
                            <span
                              key={idx}
                              className="interactive-word"
                              onClick={() => onWordClick(clean)}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(event) => {
                                if (event.key === 'Enter' || event.key === ' ') onWordClick(clean);
                              }}
                            >
                              {part}
                            </span>
                          );
                        })}
                      </p>
                      {sentence.meaning ? <p className="textbook-glossary-arth-en">{sentence.meaning}</p> : null}
                    </div>
                  </div>
                </>
              ) : (
                <p className="textbook-glossary-subtitle">{sentence.sanskrit}</p>
              )}
            </div>
          ) : (sentence.kind === 'glossary' || sentence.kind === 'glossary-header') ? (
            <div className={`textbook-glossary-card${sentence.kind === 'glossary-header' ? ' textbook-glossary-card--header' : ''}`}>
              {sentence.kind === 'glossary-header' ? (
                <>
                  <p className="textbook-glossary-title">
                    {sentence.words.map((word, idx) => (
                      <span
                        key={`${activeLessonId}-gh-${idx}`}
                        className="interactive-word"
                        onClick={() => onWordClick(word)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') onWordClick(word);
                        }}
                      >
                        {word}
                      </span>
                    ))}
                  </p>
                  <p className="textbook-glossary-subtitle">{sentence.meaning}</p>
                  <p className="textbook-glossary-hint">शब्द tap → अर्थ below. Then Analyse on the right.</p>
                </>
              ) : (
                <>
                  <div className="textbook-glossary-pair">
                    <span className="textbook-glossary-label">शब्द</span>
                    <button
                      type="button"
                      className="textbook-glossary-shabd"
                      onClick={() => onWordClick(sentence.sanskrit)}
                    >
                      {sentence.sanskrit}
                    </button>
                  </div>
                  <div className="textbook-glossary-pair">
                    <span className="textbook-glossary-label">अर्थ</span>
                    <div className="textbook-glossary-arth">
                      {sentence.sanskrit_gloss ? (
                        <p className="textbook-glossary-arth-sa">{sentence.sanskrit_gloss}</p>
                      ) : null}
                      {sentence.meaning ? (
                        <p className="textbook-glossary-arth-en">{sentence.meaning}</p>
                      ) : null}
                      {sentence.hindi_gloss ? (
                        <p className="textbook-glossary-arth-hi">{sentence.hindi_gloss}</p>
                      ) : null}
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
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
            </>
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


