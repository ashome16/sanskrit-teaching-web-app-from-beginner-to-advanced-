import React, { useState } from 'react';
import type { LessonContent } from '../types';
import { TextToSpeechHandler } from '../utils/speech';
import '../styles/lesson-flow.css';

interface LessonFlowSelectorProps {
  content: LessonContent[];
  currentIndex: number;
  onSelectContent: (index: number) => void;
  onWordSelected?: (word: {
    devanagari: string;
    transliteration: string;
    pronunciation: string;
  }) => void;
  ttsHandler: TextToSpeechHandler;
}

const LessonFlowSelector: React.FC<LessonFlowSelectorProps> = ({
  content,
  currentIndex,
  onSelectContent,
  onWordSelected,
  ttsHandler,
}) => {
  const [isNarrating, setIsNarrating] = useState(false);
  const [showWordDetails, setShowWordDetails] = useState(false);
  const [selectedWord, setSelectedWord] = useState<{
    devanagari: string;
    transliteration: string;
    pronunciation: string;
  } | null>(null);

  // Filter to show only non-pronunciation content items (main lesson pages)
  const mainContent = content.filter((item) => item.type !== 'pronunciation');
  const mainContentIndex = mainContent.findIndex((_, idx) => {
    // Find corresponding index in main content
    const originalIndex = content.findIndex(
      (c) => c.title === mainContent[idx]?.title && c.type === mainContent[idx]?.type
    );
    return originalIndex === currentIndex;
  });

  const currentMainContent = mainContent[mainContentIndex] || mainContent[0];

  const handleNarrate = () => {
    if (isNarrating) {
      ttsHandler.stop();
      setIsNarrating(false);
      return;
    }

    setIsNarrating(true);

    // Narrate the content based on type
    let textToNarrate = '';

    if (currentMainContent.data.text) {
      textToNarrate = currentMainContent.data.text;
    } else if (currentMainContent.data.meaning) {
      textToNarrate = currentMainContent.data.meaning;
    } else if (currentMainContent.data.transliteration) {
      textToNarrate = currentMainContent.data.transliteration;
    }

    if (textToNarrate) {
      ttsHandler.speak({
        text: textToNarrate,
        language: 'en-US',
        rate: 0.9,
      });

      // Reset narration state after speech ends (approximate)
      setTimeout(() => setIsNarrating(false), textToNarrate.length * 50 + 500);
    }
  };

  // Parse and make words interactive
  const renderInteractiveText = (text: string) => {
    if (!text) return text;

    // Split by whitespace and punctuation but keep them
    const parts = text.split(/(\s+|[।,।।])/);

    return parts.map((part, idx) => {
      // Skip whitespace and punctuation
      if (!part || /^[\s।,।।]+$/.test(part)) {
        return <span key={idx}>{part}</span>;
      }

      return (
        <span
          key={idx}
          className="interactive-word"
          onClick={() => {
            // Try to extract word info
            const wordInfo = {
              devanagari: part,
              transliteration: part, // In real scenario, this would be looked up
              pronunciation: `Pronounced as: ${part}`,
            };
            setSelectedWord(wordInfo);
            setShowWordDetails(true);
            if (onWordSelected) {
              onWordSelected(wordInfo);
            }
          }}
        >
          {part}
        </span>
      );
    });
  };

  return (
    <div className="lesson-flow-selector">
      {/* Page Selector */}
      <div className="page-selector">
        <h3>📄 Lesson Pages</h3>
        <div className="pages-grid">
          {mainContent.map((item, idx) => (
            <button
              key={idx}
              className={`page-btn ${
                mainContent[mainContentIndex]?.title === item.title ? 'active' : ''
              }`}
              onClick={() => {
                const actualIndex = content.findIndex(
                  (c) => c.title === item.title && c.type === item.type
                );
                onSelectContent(actualIndex);
              }}
            >
              <div className="page-icon">
                {item.type === 'pdf'
                  ? '📑'
                  : item.type === 'video'
                  ? '🎥'
                  : item.type === 'audio'
                  ? '🔊'
                  : '📖'}
              </div>
              <div className="page-title">{item.title}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Content Display */}
      <div className="lesson-content-display">
        {/* Header with Narration */}
        <div className="content-header">
          <div className="content-title-section">
            <h2>{currentMainContent.title}</h2>
            <p className="content-description">{currentMainContent.description}</p>
          </div>
          <button
            className={`narrate-btn ${isNarrating ? 'playing' : ''}`}
            onClick={handleNarrate}
            title={isNarrating ? 'Stop narration' : 'Play narration'}
          >
            {isNarrating ? '⏹️ Stop' : '🔊 Narrate'}
          </button>
        </div>

        {/* Main Content Display */}
        <div className="content-box">
          {currentMainContent.data.devanagari && (
            <div className="devanagari-section">
              <div className="section-label">📖 Devanagari Text</div>
              <div className="devanagari-text">
                {currentMainContent.data.devanagari}
              </div>
            </div>
          )}

          {currentMainContent.data.transliteration && (
            <div className="transliteration-section">
              <div className="section-label">🔤 Transliteration</div>
              <div className="transliteration-text">
                {currentMainContent.data.transliteration}
              </div>
            </div>
          )}

          {currentMainContent.data.text && (
            <div className="text-section">
              <div className="section-label">📝 Content</div>
              <div className="interactive-content">
                {renderInteractiveText(currentMainContent.data.text)}
              </div>
            </div>
          )}

          {currentMainContent.data.meaning && (
            <div className="meaning-section">
              <div className="section-label">💡 Meaning</div>
              <div className="meaning-text">{currentMainContent.data.meaning}</div>
            </div>
          )}

          {currentMainContent.data.examples && currentMainContent.data.examples.length > 0 && (
            <div className="examples-section">
              <div className="section-label">📌 Examples</div>
              <ul className="examples-list">
                {currentMainContent.data.examples.map((example, idx) => (
                  <li key={idx} className="example-item">
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Word Selection Indicator */}
        {selectedWord && showWordDetails && (
          <div className="word-selection-panel">
            <div className="word-selection-header">
              <span>Selected Word</span>
              <button
                className="close-btn"
                onClick={() => setShowWordDetails(false)}
              >
                ✕
              </button>
            </div>
            <div className="word-details">
              <div className="word-devanagari">{selectedWord.devanagari}</div>
              <div className="word-transliteration">{selectedWord.transliteration}</div>
              <p className="word-hint">
                💡 Tip: Ready for pronunciation practice! Scroll down to practice this word.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonFlowSelector;
