import React, { useEffect, useState } from 'react';
import type { SanskritWordBreakdown } from '../types/linguistics';
import { searchSanskritWords } from '../data/sanskrit-words';
import { extractLinguisticInfo } from '../utils/linguistics';
import { playPronunciation } from '../utils/pronunciation';
import { formatCaseLabel } from '../data/vibhakti';
import '../styles/word-analyzer-card.css';

export interface WordSelection {
  text: string;
  nonce: number;
}

interface WordAnalyzerCardProps {
  selection: WordSelection | null;
}

// Preset playback speeds offered next to the speaker icon.
const SPEED_PRESETS = [0.5, 0.75, 1] as const;

// Strips whitespace/punctuation plus Devanagari digits and hyphens (e.g. the
// numbers guide's "० - शून्यम्" button labels) so only the word itself is analyzed.
const cleanWord = (value: string): string =>
  value.replace(/[\s।॥,;:!?()[\]{}<>'"“”‘’\-०-९]+/g, '').trim();

const createCustomWord = (value: string): SanskritWordBreakdown => {
  const devanagari = cleanWord(value) || value.trim();
  const analysis = extractLinguisticInfo(devanagari, '');

  return {
    id: `custom-${devanagari}`,
    devanagari,
    transliteration: analysis.transliteration || devanagari,
    meaning: '',
    partOfSpeech: 'noun',
    syllables: analysis.syllables || [],
    conjunctConsonants: analysis.conjunctConsonants || [],
    examples: [],
  };
};

const findWord = (value: string): { word: SanskritWordBreakdown; isCustom: boolean } | null => {
  const word = cleanWord(value);
  if (!word) return null;
  const exactMatch = searchSanskritWords(word).find((entry) => entry.devanagari === word);
  return exactMatch
    ? { word: exactMatch, isCustom: false }
    : { word: createCustomWord(word), isCustom: true };
};

const WordAnalyzerCard: React.FC<WordAnalyzerCardProps> = ({ selection }) => {
  const [inputValue, setInputValue] = useState('');
  const [analysis, setAnalysis] = useState<{ word: SanskritWordBreakdown; isCustom: boolean } | null>(
    null
  );
  const [speechRate, setSpeechRate] = useState<number>(1);

  // Click-to-analyze: whenever a word is clicked in the reader panel, populate and analyze instantly
  useEffect(() => {
    if (selection?.text.trim()) {
      const result = findWord(selection.text);
      setAnalysis(result);
      setInputValue(cleanWord(selection.text));
    }
  }, [selection?.nonce]);

  // Reset selection state when navigating sentences (selection becomes null)
  useEffect(() => {
    if (!selection) {
      setAnalysis(null);
      setInputValue('');
    }
  }, [selection]);

  const handleInputSubmit = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    // Step A: exact glossary match short-circuits to clean data; Step B falls back to
    // live syllable/conjunct analysis for any word outside the local dictionary.
    const result = findWord(trimmed);
    setAnalysis(result);
  };

  const word = analysis?.word;
  const isCustom = analysis?.isCustom ?? false;
  const nounInflection = word?.nounInflection;

  return (
    <aside className="word-analyzer-card">
      <div className="wac-search-bar">
        <label htmlFor="wac-search-input" className="wac-search-label">
          Sanskrit Word Search
        </label>
        <div className="wac-input-row">
          <span className="wac-input-icon" aria-hidden="true">
            🔍
          </span>
          <input
            id="wac-search-input"
            type="text"
            className="wac-input"
            placeholder="Type any Sanskrit word to analyze…"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleInputSubmit();
              }
            }}
          />
          <button type="button" className="wac-input-btn" onClick={handleInputSubmit}>
            Analyze Word
          </button>
        </div>
      </div>

      {!word && (
        <div className="wac-empty-state">
          Click any Sanskrit word in the reading panel to see its analysis here.
        </div>
      )}

      {word && (
        <div className="wac-content">
          {/* Top header */}
          <div className="wac-header wac-header-flex">
            <button
              type="button"
              className="wac-devanagari-btn"
              onClick={() => playPronunciation(word.devanagari, speechRate)}
              aria-label={`Play pronunciation for ${word.devanagari}`}
            >
              {word.devanagari}
            </button>
            <button
              type="button"
              className="wac-speaker-btn"
              onClick={() => playPronunciation(word.devanagari, speechRate)}
              aria-label={`Play pronunciation for ${word.devanagari}`}
              title="Play pronunciation"
            >
              🔊
            </button>
            <div className="wac-speed-controls" role="group" aria-label="Playback speed">
              {SPEED_PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  className={`wac-speed-btn${speechRate === preset ? ' wac-speed-btn--active' : ''}`}
                  onClick={() => setSpeechRate(preset)}
                  aria-pressed={speechRate === preset}
                >
                  {preset}x
                </button>
              ))}
            </div>
          </div>

          {/* Section 1: Syllable Breakdown */}
          <section className="wac-section">
            <h3 className="wac-section-title">Syllable Breakdown (Akṣaras)</h3>
            {word.syllables.length > 0 ? (
              <div className="wac-syllables-grid">
                {word.syllables.map((syllable, idx) => (
                  <div key={idx} className="wac-syllable-box">
                    <div className="wac-syllable-dev">{syllable.devanagari}</div>
                    <div className="wac-syllable-translit">{syllable.transliteration}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="wac-placeholder">No syllable data available for this input.</p>
            )}
          </section>

          {/* Section 2: Conjunct Consonants */}
          <section className="wac-section">
            <h3 className="wac-section-title">Conjunct Consonants (Samyuktākṣara)</h3>
            {word.conjunctConsonants.length > 0 ? (
              <div className="wac-conjunct-list">
                {word.conjunctConsonants.map((conjunct, idx) => (
                  <div key={idx} className="wac-conjunct-box">
                    <div className="wac-conjunct-dev">{conjunct.devanagari}</div>
                    <div className="wac-conjunct-components">
                      {conjunct.components.map((comp, i) => (
                        <span key={i} className="wac-conjunct-component">
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="wac-placeholder">No conjunct consonants detected in this word.</p>
            )}
          </section>

          {/* Section 3: Grammatical Information Grid */}
          <section className="wac-section">
            <h3 className="wac-section-title">Grammatical Information</h3>
            <div className="wac-grammar-grid">
              <div className="wac-grammar-box">
                <div className="wac-grammar-label">Gender</div>
                <div className="wac-grammar-value">
                  {nounInflection?.gender ??
                    (isCustom ? 'Unavailable for custom input' : '—')}
                </div>
              </div>
              <div className="wac-grammar-box">
                <div className="wac-grammar-label">Number</div>
                <div className="wac-grammar-value">
                  {nounInflection?.number ??
                    (isCustom ? 'Unavailable for custom input' : '—')}
                </div>
              </div>
              <div className="wac-grammar-box">
                <div className="wac-grammar-label">Case</div>
                <div className="wac-grammar-value">
                  {nounInflection?.case !== undefined
                    ? formatCaseLabel(nounInflection.case)
                    : (isCustom ? 'Unavailable for custom input' : '—')}
                </div>
              </div>
              <div className="wac-grammar-box">
                <div className="wac-grammar-label">Core Word Meaning</div>
                <div className="wac-grammar-value">
                  {word.meaning ||
                    (isCustom ? 'Grammatical details unavailable for custom input' : '—')}
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Etymology */}
          <section className="wac-section">
            <h3 className="wac-section-title">Etymology</h3>
            <p className="wac-etymology">
              {word.etymology || 'Etymology details unavailable for custom input.'}
            </p>
          </section>

          {/* Section 5: Contextual Examples */}
          <section className="wac-section">
            <h3 className="wac-section-title">Contextual Examples</h3>
            {word.examples && word.examples.length > 0 ? (
              <ul className="wac-examples-list">
                {word.examples.map((example, idx) => (
                  <li key={idx}>{example}</li>
                ))}
              </ul>
            ) : (
              <p className="wac-placeholder">No contextual examples available for custom input.</p>
            )}
          </section>
        </div>
      )}
    </aside>
  );
};

export default WordAnalyzerCard;
