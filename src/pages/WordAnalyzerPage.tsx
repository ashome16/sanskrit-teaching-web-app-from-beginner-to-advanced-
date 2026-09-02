import React, { useEffect, useMemo, useState } from 'react';
import WordAnalyzer, { type ExternalWordSelection } from '../components/WordAnalyzer';
import { getDeepakamLessons, getLessonSanskritText } from '../data/lessons';
import '../styles/pages.css';
import '../styles/word-analyzer.css';

const WORD_SPLIT_REGEX = /([\s।॥,;:!?()[\]{}<>]+)/;

const WordAnalyzerPage: React.FC = () => {
  const deepakamLessons = useMemo(() => getDeepakamLessons(), []);
  const [selectedLessonId, setSelectedLessonId] = useState(deepakamLessons[0]?.id || '');
  const [activeWord, setActiveWord] = useState('');
  const [externalSelection, setExternalSelection] = useState<ExternalWordSelection | null>(null);

  const selectedLesson = deepakamLessons.find((lesson) => lesson.id === selectedLessonId);
  const chapterText = selectedLesson ? getLessonSanskritText(selectedLesson) : '';

  const analyzeWord = (word: string) => {
    if (!word.trim()) {
      return;
    }

    setActiveWord(word);
    setExternalSelection({ text: word, nonce: Date.now(), speak: true });
  };

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection()?.toString().trim() || '';
      if (!selection || selection === activeWord || !/[\u0900-\u097F]/.test(selection)) {
        return;
      }

      setActiveWord(selection);
      setExternalSelection({ text: selection, nonce: Date.now() });
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => document.removeEventListener('selectionchange', handleSelectionChange);
  }, [activeWord]);

  const renderChapterText = () =>
    chapterText.split('\n').map((line, lineIndex) => (
      <p key={`${line}-${lineIndex}`} className="lesson-reader-line">
        {line.split(WORD_SPLIT_REGEX).map((token, tokenIndex) => {
          const isWord = /[\u0900-\u097F]/.test(token) && !/^[\s।॥,;:!?()[\]{}<>]+$/.test(token);

          return isWord ? (
            <span
              key={`${token}-${tokenIndex}`}
              className={`interactive-word${activeWord === token ? ' active-word' : ''}`}
              onClick={() => analyzeWord(token)}
            >
              {token}
            </span>
          ) : (
            <span key={`${token}-${tokenIndex}`}>{token}</span>
          );
        })}
      </p>
    ));

  return (
    <div className="page-container word-analyzer-page">
      <div className="analyzer-page-layout">
        <section className="lesson-reader-panel">
          <h2>Chapter Text</h2>
          <select
            className="lesson-reader-select"
            value={selectedLessonId}
            onChange={(event) => setSelectedLessonId(event.target.value)}
          >
            {deepakamLessons.map((lesson) => (
              <option key={lesson.id} value={lesson.id}>
                {lesson.title}
              </option>
            ))}
          </select>
          <div className="lesson-reader-text">{renderChapterText()}</div>
          <p className="lesson-reader-hint">Click a word or select a Sanskrit phrase to analyze it.</p>
        </section>
        <WordAnalyzer externalSelection={externalSelection} />
      </div>
    </div>
  );
};

export default WordAnalyzerPage;
