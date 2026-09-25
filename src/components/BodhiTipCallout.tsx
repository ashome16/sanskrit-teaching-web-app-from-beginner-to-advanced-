import React, { useEffect, useRef, useState } from 'react';
import BodhiAvatar, { type BodhiMood } from './BodhiAvatar';
import { speakAsBodhi, type BodhiSpeechLang } from '../utils/pronunciation';
import '../styles/bodhi.css';

interface BodhiTipCalloutProps {
  mood?: BodhiMood;
  title?: string;
  sanskritTitle?: string;
  children: React.ReactNode;
  /** Sanskrit (Devanagari) word/phrase Bodhi pronounces with the hi-IN voice. */
  audioText?: string;
  /**
   * English tip text Bodhi reads aloud (en-IN voice). Defaults to children
   * when children is plain text.
   */
  speakableText?: string;
  className?: string;
}

export const BodhiTipCallout: React.FC<BodhiTipCalloutProps> = ({
  mood = 'scholar',
  title = "Bodhi's Study Note",
  sanskritTitle = 'बोधि-परामर्शः',
  children,
  audioText,
  speakableText,
  className = '',
}) => {
  const englishText = speakableText ?? (typeof children === 'string' ? children : undefined);
  const [speaking, setSpeaking] = useState<BodhiSpeechLang | null>(null);
  const stopRef = useRef<(() => void) | null>(null);

  const stop = () => {
    const fn = stopRef.current;
    stopRef.current = null;
    fn?.();
    setSpeaking(null);
  };

  useEffect(() => () => stop(), []);

  const speak = (text: string, lang: BodhiSpeechLang) => {
    // Tapping the active button again stops Bodhi.
    if (stopRef.current && speaking === lang) {
      stop();
      return;
    }
    stop();
    try {
      let fn: (() => void) | null = null;
      let finished = false;
      setSpeaking(lang);
      fn = speakAsBodhi(text, {
        lang,
        onEnd: () => {
          finished = true;
          if (fn !== null && stopRef.current !== fn) return;
          stopRef.current = null;
          setSpeaking(null);
        },
      });
      // speakAsBodhi can finish synchronously (no speech support / empty text).
      if (!finished) stopRef.current = fn;
    } catch {
      stopRef.current = null;
      setSpeaking(null);
    }
  };

  return (
    <aside className={`bodhi-tip-callout ${className}`} aria-label={title}>
      <div className="bodhi-callout-avatar">
        <BodhiAvatar mood={mood} size="sm" showHalo={false} isSpeaking={speaking !== null} />
      </div>
      <div className="bodhi-callout-content">
        <div className="bodhi-callout-label">
          <span>💡</span>
          <span>{title}</span>
          {sanskritTitle && <span style={{ color: '#ea580c', fontWeight: 700 }}>({sanskritTitle})</span>}
          {englishText && (
            <button
              type="button"
              className={`bodhi-tip-speak-btn ${speaking === 'en' ? 'is-speaking' : ''}`}
              onClick={() => speak(englishText, 'en')}
              title={speaking === 'en' ? 'Stop Bodhi' : 'Hear Bodhi read this tip'}
              aria-label={speaking === 'en' ? 'Stop Bodhi' : 'Hear Bodhi read this tip'}
              aria-pressed={speaking === 'en'}
            >
              {speaking === 'en' ? '⏹' : '🔊'}
            </button>
          )}
          {audioText && (
            <button
              type="button"
              className="bodhi-audio-pill"
              style={{ marginLeft: 'auto', padding: '0.1rem 0.5rem', fontSize: '0.7rem' }}
              onClick={() => speak(audioText, 'sa')}
              title={speaking === 'sa' ? 'Stop Bodhi' : `Listen to ${audioText}`}
            >
              {speaking === 'sa' ? '⏹' : '🔊'} {audioText}
            </button>
          )}
        </div>
        <div className="bodhi-callout-text">{children}</div>
      </div>
    </aside>
  );
};

export default BodhiTipCallout;
