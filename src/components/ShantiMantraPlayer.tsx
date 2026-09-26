import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  SHANTI_MANTRA_LINES,
  SHANTI_MANTRA_SOURCE,
  SHANTI_MANTRA_TRANSLATION,
  SHANTI_WORD_MEANINGS,
  getSavedShantiVoiceName,
  listShantiVoices,
  pickShantiVoice,
  reciteShantiMantra,
  setSavedShantiVoiceName,
} from '../utils/shantiMantraSpeech';
import { whenVoicesReady } from '../utils/speechPlatform';
import '../styles/shanti-mantra.css';

interface ShantiMantraPlayerProps {
  /** Show the word-by-word meanings (collapsed by default). */
  showWordMeanings?: boolean;
  /** Optional heading above the verse. */
  title?: string;
  source?: string;
}

/**
 * ओं सह नाववतु — Śānti mantra with its own calm recitation voice,
 * line-by-line highlight, per-line replay, stop, and a Hindi voice picker.
 */
const ShantiMantraPlayer: React.FC<ShantiMantraPlayerProps> = ({
  showWordMeanings = true,
  title,
  source = SHANTI_MANTRA_SOURCE,
}) => {
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceName, setVoiceName] = useState<string>(() =>
    typeof window === 'undefined' ? '' : getSavedShantiVoiceName(),
  );
  const [noVoice, setNoVoice] = useState(false);
  const stopRef = useRef<(() => void) | null>(null);
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  // Load voices (Chrome/Edge fill the list only after voiceschanged).
  useEffect(() => {
    if (!supported) return;
    const synth = window.speechSynthesis;
    const refresh = () => setVoices(listShantiVoices(synth.getVoices()));
    void whenVoicesReady().then(refresh);
    synth.addEventListener('voiceschanged', refresh);
    return () => synth.removeEventListener('voiceschanged', refresh);
  }, [supported]);

  // Stop when leaving the page.
  useEffect(() => () => stopRef.current?.(), []);

  const stop = useCallback(() => {
    stopRef.current?.();
    stopRef.current = null;
    setPlaying(false);
    setActiveLine(null);
  }, []);

  const play = useCallback(
    (lines?: number[]) => {
      stopRef.current?.();
      setNoVoice(false);
      setPlaying(true);
      const stopFn = reciteShantiMantra({
        lines,
        voiceName: voiceName || undefined,
        onLine: (i) => setActiveLine(i),
        onNoVoice: () => setNoVoice(true),
        onEnd: () => {
          if (stopRef.current === stopFn) stopRef.current = null;
          setPlaying(false);
          setActiveLine(null);
        },
      });
      stopRef.current = stopFn;
    },
    [voiceName],
  );

  const onVoiceChange = (name: string) => {
    setVoiceName(name);
    setSavedShantiVoiceName(name);
    stop();
  };

  const autoVoice = pickShantiVoice(voices, '');
  const currentVoice = voices.find((v) => v.name === voiceName);

  return (
    <div className="shanti-player" lang="sa">
      {title && <div className="shanti-title">{title}</div>}

      <ol className="shanti-lines" aria-label="Śānti mantra — tap a line to hear it">
        {SHANTI_MANTRA_LINES.map((line, i) => (
          <li key={i} className={`shanti-line${activeLine === i ? ' is-active' : ''}`}>
            <button
              type="button"
              className="shanti-line-btn"
              onClick={() => play([i])}
              aria-label={`Play line ${i + 1}: ${line.iast}`}
              aria-current={activeLine === i ? 'true' : undefined}
              disabled={!supported}
            >
              <span className="shanti-line-dev">{line.devanagari}</span>
              <span className="shanti-line-iast" lang="sa-Latn">{line.iast}</span>
              <span className="shanti-line-en" lang="en">{line.meaning}</span>
            </button>
          </li>
        ))}
      </ol>

      <div className="shanti-controls" lang="en">
        {playing ? (
          <button type="button" className="shanti-btn shanti-btn--stop" onClick={stop}>
            ■ Stop
          </button>
        ) : (
          <button type="button" className="shanti-btn" onClick={() => play()} disabled={!supported}>
            🔊 Recite full mantra
          </button>
        )}
        {voices.length > 0 && (
          <label className="shanti-voice">
            <span>Voice</span>
            <select value={currentVoice ? voiceName : ''} onChange={(e) => onVoiceChange(e.target.value)}>
              <option value="">Auto{autoVoice ? ` — ${autoVoice.name}` : ''}</option>
              {voices.map((v) => (
                <option key={`${v.name}-${v.lang}`} value={v.name}>
                  {v.name} ({v.lang})
                </option>
              ))}
            </select>
          </label>
        )}
        <span className="shanti-source">{source}</span>
      </div>

      {supported && (noVoice || (voices.length === 0 && playing)) && (
        <p className="shanti-note" lang="en">
          No Hindi voice was found on this device, so the browser may use a default voice. On Windows:
          Settings → Time &amp; language → Speech → Add voices → Hindi. On Mac: System Settings →
          Accessibility → Spoken Content → System voice → Manage Voices → Hindi (Lekha).
        </p>
      )}
      {!supported && (
        <p className="shanti-note" lang="en">This browser does not support speech playback.</p>
      )}

      <p className="shanti-translation" lang="en">“{SHANTI_MANTRA_TRANSLATION}”</p>

      {showWordMeanings && (
        <details className="shanti-words" lang="en">
          <summary>Word-by-word meaning (पदार्थः)</summary>
          <dl>
            {SHANTI_WORD_MEANINGS.map(([dev, iast, meaning]) => (
              <div key={iast} className="shanti-word">
                <dt>
                  <span lang="sa">{dev}</span> <em lang="sa-Latn">{iast}</em>
                </dt>
                <dd>{meaning}</dd>
              </div>
            ))}
          </dl>
        </details>
      )}
    </div>
  );
};

export default ShantiMantraPlayer;
