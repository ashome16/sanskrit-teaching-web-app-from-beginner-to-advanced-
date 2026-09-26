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
  /** Open multi-role Voice Studio modal */
  onOpenVoiceSettings?: () => void;
}

/**
 * Mantra recitation player — ओं सह नाववतु by default, or any MantraText:
 * Features:
 * 1. Web Speech API Vedic recitation with line-by-line highlight, per-line replay, voice picker.
 * 2. Dedicated Swami Dhyanananda traditional chanting mode (audio.com embed / self-hosted MP3).
 * 3. Voice Studio shortcut for customized Windows/Mac voice configuration.
 */
const ShantiMantraPlayer: React.FC<ShantiMantraPlayerProps> = ({
  mantra,
  showWordMeanings = true,
  title,
  source,
  id,
  onOpenVoiceSettings,
}) => {
  const text = mantra || SAHA_NAVAVATU;
  const isSahaNavavatu = !mantra || mantra.id === SAHA_NAVAVATU.id;
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

  // Mode: 'speech' (Web Speech API) vs 'swami' (Swami Dhyanananda's audio.com recitation)
  const [mode, setMode] = useState<'speech' | 'swami'>('speech');
  const [showEmbed, setShowEmbed] = useState(false);

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

      {/* Recitation Mode Switcher (for Saha Nāvavatu) */}
      {isSahaNavavatu && (
        <div className="shanti-mode-switcher" role="tablist" aria-label="Audio Recitation Source">
          <button
            type="button"
            className={`shanti-mode-btn${mode === 'speech' ? ' shanti-mode-btn--active' : ''}`}
            onClick={() => {
              setMode('speech');
            }}
            role="tab"
            aria-selected={mode === 'speech'}
          >
            🤖 Vedic Speech Engine
          </button>
          <button
            type="button"
            className={`shanti-mode-btn${mode === 'swami' ? ' shanti-mode-btn--active' : ''}`}
            onClick={() => {
              stop();
              setMode('swami');
            }}
            role="tab"
            aria-selected={mode === 'swami'}
          >
            🎙️ Swami Dhyanananda (Audio.com / MP3)
          </button>
        </div>
      )}

      {/* Swami Dhyanananda Recitation Panel */}
      {isSahaNavavatu && mode === 'swami' && (
        <div className="shanti-swami-panel">
          <div className="shanti-swami-header">
            <span className="shanti-swami-title">
              Swami Dhyanananda · Authentic Vedic Recitation (Slow tempo with pause for repetition)
            </span>
            <span className="shanti-swami-badge">Free to Use</span>
          </div>

          <p className="shanti-swami-note">
            Traditional recitation of Taittirīya Upaniṣad 2.2 / Kaṭha Upaniṣad Śānti-pāṭha.
            Recorded slowly with space for disciple repetition.
          </p>

          {/* HTML5 Native Audio Player (checks local public/audio/ first) */}
          <audio
            className="shanti-swami-audio"
            controls
            preload="metadata"
            src="/audio/sahana-navavatu.mp3"
          >
            Your browser does not support the audio element.
          </audio>

          <div className="shanti-swami-links">
            <button
              type="button"
              className="shanti-swami-link"
              onClick={() => setShowEmbed((prev) => !prev)}
            >
              {showEmbed ? '▼ Hide Audio.com Player' : '▶ Show Audio.com Embed Player'}
            </button>
            <span>·</span>
            <a
              href="https://audio.com/swami-dhyanananda/audio/sahana-lf-slow"
              target="_blank"
              rel="noopener noreferrer"
              className="shanti-swami-link"
            >
              🎧 Open on Audio.com ↗
            </a>
          </div>

          {showEmbed && (
            <iframe
              className="shanti-embed-frame"
              src="https://audio.com/swami-dhyanananda/audio/sahana-lf-slow"
              title="Swami Dhyanananda Saha Nāvavatu Recitation"
              allow="autoplay"
              sandbox="allow-scripts allow-same-origin allow-presentation"
            />
          )}

          <p className="shanti-swami-note">
            💡 <em>Offline &amp; zero-tracking hosting:</em> To host this audio directly without third-party cookies,
            download the MP3 from Audio.com and place it as <code>public/audio/sahana-navavatu.mp3</code>.
          </p>
        </div>
      )}

      {/* Synchronized Verse Lines (interactive in both modes) */}
      <ol className="shanti-lines" aria-label={`${text.titleEnglish} — tap a line to hear it`}>
        {lines.map((line, i) => (
          <li key={i} className={`shanti-line${activeLine === i ? ' is-active' : ''}`}>
            <button
              type="button"
              className="shanti-line-btn"
              onClick={() => {
                if (mode === 'swami') {
                  // Switch to speech engine for per-line recitation
                  setMode('speech');
                }
                play([i]);
              }}
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

      {/* Recitation Controls */}
      <div className="shanti-controls" lang="en">
        {playing ? (
          <button type="button" className="shanti-btn shanti-btn--stop" onClick={stop}>
            ■ Stop
          </button>
        ) : (
          <button
            type="button"
            className="shanti-btn"
            onClick={() => {
              if (mode === 'swami') setMode('speech');
              play();
            }}
            disabled={!supported}
          >
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

        {onOpenVoiceSettings && (
          <button
            type="button"
            className="shanti-voice-gear-btn"
            onClick={onOpenVoiceSettings}
            title="Configure Mantra chanting speed and system voices"
          >
            ⚙️ Voice Studio
          </button>
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
