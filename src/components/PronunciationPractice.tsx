import React, { useState } from 'react';
import type { LessonContent as LessonContentType } from '../types';
import { TextToSpeechHandler } from '../utils/speech';
import '../styles/pronunciation.css';

interface PronunciationPracticeProps {
  content: LessonContentType;
  ttsHandler: TextToSpeechHandler;
  onNext?: () => void;
  onPrevious?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

const PronunciationPractice: React.FC<PronunciationPracticeProps> = ({
  content,
  ttsHandler,
  onNext,
  onPrevious,
  isFirst,
  isLast,
}) => {
  const [practiceMode, setPracticeMode] = useState<'full' | 'syllable'>('full');
  const [showSyllableBreakdown, setShowSyllableBreakdown] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const expectedPronunciation = content.data.pronunciation || content.data.transliteration || '';

  const playReferenceAudio = () => {
    setIsSpeaking(true);
    ttsHandler.speak({
      text: expectedPronunciation,
      language: 'sa-IN',
      rate: practiceMode === 'syllable' ? 0.6 : 0.8,
      pitch: 1,
    });
    setTimeout(() => setIsSpeaking(false), 3000);
  };

  const getSyllables = (text: string): string[] => {
    // Simple Sanskrit syllable splitting
    return text.split(/[\s,।]/g).filter((s) => s.length > 0);
  };

  const syllables = getSyllables(expectedPronunciation);

  return (
    <div className="pronunciation-practice">
      <div className="header">
        <h2>{content.title}</h2>
        <p>{content.description}</p>
      </div>

      <div className="content-body">
        {/* Target Text */}
        {content.data.devanagari && (
          <div className="target-text">
            <div className="label">Pronounce this:</div>
            <div className="devanagari">{content.data.devanagari}</div>
            {content.data.transliteration && (
              <div className="transliteration">({content.data.transliteration})</div>
            )}
          </div>
        )}

        {/* Practice Mode Selector */}
        <div className="practice-mode-selector">
          <button
            className={`mode-btn ${practiceMode === 'full' ? 'active' : ''}`}
            onClick={() => setPracticeMode('full')}
          >
            🔊 Full Pronunciation
          </button>
          <button
            className={`mode-btn ${practiceMode === 'syllable' ? 'active' : ''}`}
            onClick={() => setPracticeMode('syllable')}
          >
            🔤 Word-by-Word
          </button>
        </div>

        {/* Reference Audio */}
        <div className="reference-audio">
          <button
            className={`btn btn-secondary ${isSpeaking ? 'speaking' : ''}`}
            onClick={playReferenceAudio}
            disabled={isSpeaking}
          >
            {isSpeaking ? '🎵 Playing...' : '🔊 Play Reference'}
          </button>
          {content.data.pronunciation && (
            <div className="pronunciation-guide">
              <div className="guide-label">📖 Pronunciation Guide:</div>
              <div className="guide-text">{content.data.pronunciation}</div>
            </div>
          )}
        </div>

        {/* Syllable Breakdown */}
        {showSyllableBreakdown && syllables.length > 1 && (
          <div className="syllable-breakdown">
            <h4>Break it down:</h4>
            <div className="syllables">
              {syllables.map((syl, idx) => (
                <div key={idx} className="syllable-item">
                  <div className="syllable-text">{syl}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Practice Instructions */}
        <div className="tip">
          <p><strong>💡 How to practice:</strong></p>
          <ol>
            <li>Listen to the <strong>Reference Pronunciation</strong></li>
            <li>Repeat it aloud slowly, a few times</li>
            <li>When you feel confident, move on to the next word or verse</li>
          </ol>
        </div>

        <div className="controls">
          <button
            className="btn btn-secondary"
            onClick={() => setShowSyllableBreakdown(!showSyllableBreakdown)}
          >
            {showSyllableBreakdown ? '▼ Hide' : '▶ Show'} Breakdown
          </button>
        </div>

        {/* In-practice navigation, mirrors the lesson controls at the bottom of the page */}
        {(onPrevious || onNext) && (
          <div className="practice-navigation">
            {onPrevious && (
              <button className="btn btn-secondary" onClick={onPrevious} disabled={isFirst}>
                ← Previous
              </button>
            )}
            {onNext && (
              <button className="btn btn-primary" onClick={onNext} disabled={isLast}>
                Next →
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PronunciationPractice;
