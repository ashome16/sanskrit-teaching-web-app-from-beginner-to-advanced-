import React, { useMemo } from 'react';
import type { Lesson } from '../types';
import type { LessonVocabularyItem } from '../utils/lessonVocabulary';
import { extractLessonVocabulary } from '../utils/lessonVocabulary';
import '../styles/lesson-vocabulary.css';

interface LessonVocabularyPanelProps {
  lesson: Lesson;
  onWordClick?: (word: LessonVocabularyItem) => void;
}

const LessonVocabularyPanel: React.FC<LessonVocabularyPanelProps> = ({ lesson, onWordClick }) => {
  const vocabulary = useMemo(() => extractLessonVocabulary(lesson), [lesson]);

  const [expandedWord, setExpandedWord] = React.useState<string | null>(null);

  const toggleWord = (wordId: string) => {
    setExpandedWord(expandedWord === wordId ? null : wordId);
  };

  if (!vocabulary || vocabulary.length === 0) {
    return (
      <div className="lesson-vocabulary-panel">
        <h3>📚 Lesson Vocabulary</h3>
        <p className="empty-message">No Sanskrit words found in this lesson.</p>
      </div>
    );
  }

  return (
    <div className="lesson-vocabulary-panel">
      <h3>📚 Lesson Vocabulary ({vocabulary.length})</h3>
      <p className="vocab-intro">Click on any word to learn more</p>

      <div className="vocabulary-list">
        {vocabulary.map((word) => (
          <div key={word.id} className="vocabulary-item">
            <div
              className="vocab-header"
              onClick={() => {
                toggleWord(word.id);
                onWordClick?.(word);
              }}
            >
              <div className="vocab-main">
                <div className="vocab-devanagari">{word.devanagari}</div>
                <div className="vocab-transliteration">{word.transliteration}</div>
              </div>
              <div className="vocab-meta">
                <span className="vocab-frequency">{word.frequency}x</span>
                <span className="vocab-toggle">{expandedWord === word.id ? '▼' : '▶'}</span>
              </div>
            </div>

            {expandedWord === word.id && (
              <div className="vocab-details">
                {word.meaning && (
                  <div className="detail-row">
                    <span className="detail-label">Meaning:</span>
                    <span className="detail-value">{word.meaning}</span>
                  </div>
                )}
                <div className="detail-row">
                  <span className="detail-label">Context:</span>
                  <span className="detail-value detail-context">{word.context}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Appears:</span>
                  <span className="detail-value">{word.frequency} time(s)</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="vocab-footer">
        <p className="vocab-tip">
          💡 Tip: Click on words while reading the lesson to practice pronunciation
        </p>
      </div>
    </div>
  );
};

export default LessonVocabularyPanel;
