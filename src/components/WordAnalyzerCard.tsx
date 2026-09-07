import React, { useEffect, useState } from 'react';
import type { SanskritWordBreakdown } from '../types/linguistics';
import { searchSanskritWords } from '../data/sanskrit-words';
import { extractLinguisticInfo } from '../utils/linguistics';
import { playPronunciation } from '../utils/pronunciation';
import { examplesForAkshara, baseAksharaForExamples } from '../data/vowelExamples';
import { formatCaseLabel } from '../data/vibhakti';
import {
  loadAnalyseGlosses,
  lookupAnalyseGloss,
  englishMeaningFromGloss,
  type AnalyseEntry,
  type AnalyseRegistry,
} from '../utils/analyseGloss';
import '../styles/word-analyzer-card.css';

export interface WordSelection {
  text: string;
  nonce: number;
}

interface WordAnalyzerCardProps {
  selection: WordSelection | null;
}

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
  const [glosses, setGlosses] = useState<AnalyseRegistry>({});
  /** Letter whose “Words with this sound” list stays pinned while browsing examples. */
  const [soundAnchor, setSoundAnchor] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadAnalyseGlosses().then((data) => {
      if (!cancelled) setGlosses(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Click-to-analyze: whenever a word is clicked in the reader panel, populate and analyze instantly
  useEffect(() => {
    if (selection?.text.trim()) {
      const cleaned = cleanWord(selection.text);
      const result = findWord(selection.text);
      setAnalysis(result);
      setInputValue(cleaned);
      setSoundAnchor(examplesForAkshara(cleaned).length > 0 ? baseAksharaForExamples(cleaned) : null);
    }
  }, [selection?.nonce]);

  // Reset selection state when navigating sentences (selection becomes null)
  useEffect(() => {
    if (!selection) {
      setAnalysis(null);
      setInputValue('');
      setSoundAnchor(null);
    }
  }, [selection]);

  const handleInputSubmit = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    // Step A: exact glossary match short-circuits to clean data; Step B falls back to
    // live syllable/conjunct analysis for any word outside the local dictionary.
    const cleaned = cleanWord(trimmed);
    const result = findWord(trimmed);
    setAnalysis(result);
    setSoundAnchor(examplesForAkshara(cleaned).length > 0 ? baseAksharaForExamples(cleaned) : null);
  };

  const word = analysis?.word;
  const isCustom = analysis?.isCustom ?? false;
  const nounInflection = word?.nounInflection;
  const glossEntry: AnalyseEntry | undefined = word
    ? lookupAnalyseGloss(glosses, word.devanagari)
    : undefined;
  const glossEnglish = glossEntry ? englishMeaningFromGloss(glossEntry) : '';
  const displayMeaning = (word?.meaning || '').trim() || glossEnglish;
  const regionalGlosses = glossEntry?.languages
    ? Object.entries(glossEntry.languages).filter(([code, item]) => code !== 'en' && item?.meaning)
    : [];
  const vowelExamples = soundAnchor ? examplesForAkshara(soundAnchor) : [];
  const openExampleWord = (example: string) => {
    // Keep soundAnchor so the related-words list does not disappear.
    const result = findWord(example);
    setAnalysis(result);
    setInputValue(cleanWord(example));
    playPronunciation(example);
  };

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
              onClick={() => playPronunciation(word.devanagari)}
              aria-label={`Play pronunciation for ${word.devanagari}`}
            >
              {word.devanagari}
            </button>
            <button
              type="button"
              className="wac-speaker-btn"
              onClick={() => playPronunciation(word.devanagari)}
              aria-label={`Play pronunciation for ${word.devanagari}`}
              title="Play pronunciation"
            >
              🔊
            </button>
          </div>

          {vowelExamples.length > 0 && (
            <section className="wac-section">
              <h3 className="wac-section-title">Words with this sound</h3>
              <p className="wac-placeholder" style={{ marginBottom: '.5rem' }}>
                Tap a familiar word to hear this sound inside it. The list stays while you browse.
              </p>
              <div className="wac-vowel-examples">
                {vowelExamples.map((item) => (
                  <button
                    key={item.word}
                    type="button"
                    className={`wac-vowel-example-btn${word?.devanagari === item.word ? ' wac-vowel-example-btn--active' : ''}`}
                    onClick={() => openExampleWord(item.word)}
                  >
                    <span className="wac-vowel-example-dev">{item.word}</span>
                    <span className="wac-vowel-example-gloss">{item.gloss}</span>
                  </button>
                ))}
              </div>
            </section>
          )}

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
            </div>
          </section>

          {/* Meaning — from dictionary entry or sealed analyse.json glosses */}
          <section className="wac-section">
            <h3 className="wac-section-title">Meaning</h3>
            {displayMeaning || glossEntry?.sanskrit_gloss ? (
              <div className="wac-meaning-block">
                {displayMeaning ? <p className="wac-meaning-english">{displayMeaning}</p> : null}
                {glossEntry?.sanskrit_gloss ? (
                  <p className="wac-meaning-sanskrit">
                    <span className="wac-meaning-lang">संस्कृतम्</span>
                    {glossEntry.sanskrit_gloss}
                  </p>
                ) : null}
                {regionalGlosses.map(([code, item]) => (
                  <p key={code} className="wac-meaning-regional">
                    <span className="wac-meaning-lang">{item.label}</span>
                    {item.meaning}
                  </p>
                ))}
              </div>
            ) : (
              <p className="wac-placeholder">No meaning yet for this word. Add it in analyse.json.</p>
            )}
          </section>

          {/* Section 4: Etymology */}
          <section className="wac-section">
            <h3 className="wac-section-title">Etymology</h3>
            <p className="wac-etymology">
              {word.etymology
                || glossEntry?.etymology
                || glossEntry?.grammar
                || 'Etymology details unavailable for custom input.'}
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
