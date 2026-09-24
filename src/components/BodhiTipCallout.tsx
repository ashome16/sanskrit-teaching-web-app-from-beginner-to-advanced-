import React from 'react';
import BodhiAvatar, { type BodhiMood } from './BodhiAvatar';
import { playPronunciation } from '../utils/pronunciation';
import '../styles/bodhi.css';

interface BodhiTipCalloutProps {
  mood?: BodhiMood;
  title?: string;
  sanskritTitle?: string;
  children: React.ReactNode;
  audioText?: string;
  className?: string;
}

export const BodhiTipCallout: React.FC<BodhiTipCalloutProps> = ({
  mood = 'scholar',
  title = "Bodhi's Study Note",
  sanskritTitle = 'बोधि-परामर्शः',
  children,
  audioText,
  className = '',
}) => {
  const handleAudio = () => {
    if (audioText) {
      try {
        playPronunciation(audioText);
      } catch {}
    }
  };

  return (
    <aside className={`bodhi-tip-callout ${className}`} aria-label={title}>
      <div className="bodhi-callout-avatar">
        <BodhiAvatar mood={mood} size="sm" showHalo={false} />
      </div>
      <div className="bodhi-callout-content">
        <div className="bodhi-callout-label">
          <span>💡</span>
          <span>{title}</span>
          {sanskritTitle && <span style={{ color: '#ea580c', fontWeight: 700 }}>({sanskritTitle})</span>}
          {audioText && (
            <button
              type="button"
              className="bodhi-audio-pill"
              style={{ marginLeft: 'auto', padding: '0.1rem 0.5rem', fontSize: '0.7rem' }}
              onClick={handleAudio}
              title={`Listen to ${audioText}`}
            >
              🔊 {audioText}
            </button>
          )}
        </div>
        <div className="bodhi-callout-text">{children}</div>
      </div>
    </aside>
  );
};

export default BodhiTipCallout;
