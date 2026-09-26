import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  getSavedShantiVoiceName,
  listShantiVoices,
  pickShantiVoice,
  reciteShantiMantra,
  setSavedShantiVoiceName,
} from '../utils/shantiMantraSpeech';
import { whenVoicesReady } from '../utils/speechPlatform';
import { SAHA_NAVAVATU, type MantraText } from '../data/mantrasShlokas';
import '../styles/shanti-mantra.css';

interface ShantiMantraPlayerProps {
  /** Which mantra / śloka to show and recite (default: ओं सह नाववतु). */
  mantra?: MantraText;
  /** Show the word-by-word meanings (collapsed by default). */
  showWordMeanings?: boolean;
  /** Optional heading above the verse (default: the mantra's own title when `mantra` is passed). */
  title?: string;
  source?: string;
  /** Optional DOM id (deep-link anchor). */
  id?: string;
}

/**
 * Mantra recitation player — ओं सह नाववतु by default, or any MantraText:
 * its own calm recitation voice, line-by-line highlight, per-line replay,
 * full recitation, stop, and a Hindi voice picker.
 */
const ShantiMantraPlayer: React.FC<ShantiMantraPlayerProps> = ({
  mantra,
  showWordMeanings = true,
  title,
  source,
  id,
}) => {
  const text = mantra || SAHA_NAVAVATU;
  const lines = text.lines;
  const heading = title ?? (mantra ? `${text.titleDevanagari} · ${text.titleEnglish}` : undefined);
  const sourceLabel = source ?? text.source;
  const wordMeanings = text.wordMeanings || [];
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
    (only?: number[]) => {
      stopRef.current?.();
      setNoVoice(false);
      setPlaying(true);
      const stopFn = reciteShantiMantra({
        mantraLines: lines,
        lines: only,
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
    [voiceName, lines],
  );

  const onVoiceChange = (name: string) => {
    setVoiceName(name);
    setSavedShantiVoiceName(name);
    stop();
  };

  const autoVoice = pickShantiVoice(voices, '');
  const currentVoice = voices.find((v) => v.name === voiceName);

  return (
    <div className="shanti-player" lang="sa" id={id}>
      {heading && <div className="shanti-title">{heading}</div>}

      <ol className="shanti-lines" aria-label={`${text.titleEnglish} — tap a line to hear it`}>
        {lines.map((line, i) => (
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
            🔊 Recite full {mantra && mantra.id !== SAHA_NAVAVATU.id ? 'verse' : 'mantra'}
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
        <span className="shanti-source">{sourceLabel}</span>
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

      <p className="shanti-translation" lang="en">“{text.translation}”</p>

      {showWordMeanings && wordMeanings.length > 0 && (
        <details className="shanti-words" lang="en">
          <summary>Word-by-word meaning (पदार्थः)</summary>
          <dl>
            {wordMeanings.map(([dev, iast, meaning]) => (
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
