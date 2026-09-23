import React, { useEffect, useRef, useState } from 'react';
import type { SanskritWordBreakdown } from '../types/linguistics';
import { searchSanskritWords } from '../data/sanskrit-words';
import { extractLinguisticInfo } from '../utils/linguistics';
import { playPronunciation } from '../utils/pronunciation';
import {
  displayExamplesForAkshara,
  baseAksharaForExamples,
  devanagariOnly,
} from '../data/vowelExamples';
import { isBarakhadiAkshara } from '../utils/barakhadiPhonetics';
import { iconForExampleWord } from '../data/exampleIcons';
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

// Strips whitespace/punctuation plus Devanagari digits, dashes, quotes, and symbols
// so only the clean word itself is analyzed.
const cleanWord = (value: string): string =>
  value.replace(/[\s।॥,;:!?()[\]{}<>'"“”‘’\-–—०-९\.\/\\=+#*~_`]+/g, '').trim();

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
  const [analysis, setAnalysis] = useState<{ word: SanskritWordBreakdown; isCustom: boolean } | null>(
    null
  );
  const [glosses, setGlosses] = useState<AnalyseRegistry>({});
  /** Letter whose “Words with this sound” list stays pinned while browsing examples. */
  const [soundAnchor, setSoundAnchor] = useState<string | null>(null);
  const cardRef = useRef<HTMLElement>(null);

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
      const tip = devanagariOnly(cleaned);
      // Keep barakhadi tiles anchored even when examples are scarce (rare matras).
      const hasExamples = displayExamplesForAkshara(tip).examples.length > 0;
      setSoundAnchor(
        hasExamples || isBarakhadiAkshara(tip) ? baseAksharaForExamples(tip) : null
      );
    }
  }, [selection?.nonce]);

  // Auto-scroll the analyzer card back to top whenever a new word is selected
  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.scrollTop = 0;
    }
  }, [selection?.nonce]);

  // Reset selection state when navigating sentences (selection becomes null)
  useEffect(() => {
    if (!selection) {
      setAnalysis(null);
      setSoundAnchor(null);
    }
  }, [selection]);

  const word = analysis?.word;
  const nounInflection = word?.nounInflection;
  const glossEntry: AnalyseEntry | undefined = word
    ? lookupAnalyseGloss(glosses, word.devanagari)
    : undefined;
  const glossEnglish = glossEntry ? englishMeaningFromGloss(glossEntry) : '';
  const displayMeaning = (word?.meaning || '').trim() || glossEnglish;
  const regionalGlosses = glossEntry?.languages
    ? Object.entries(glossEntry.languages).filter(([code, item]) => code !== 'en' && item?.meaning)
    : [];
  // Letter-tile anchors only — never first letter of a Deepakam word.
  const exampleBundle = soundAnchor
    ? displayExamplesForAkshara(soundAnchor)
    : { examples: [], mode: 'exact' as const, rareNote: null };
  const vowelExamples = exampleBundle.examples;
  const examplesMode = exampleBundle.mode;
  const rareNote = exampleBundle.rareNote;
  const relatedFamilyLetter = soundAnchor
    ? Array.from(devanagariOnly(soundAnchor))[0] ?? ''
    : '';
  const openExampleWord = (example: string) => {
    // Keep soundAnchor so the related-words list does not disappear.
    const result = findWord(example);
    setAnalysis(result);
    playPronunciation(example);
  };

  return (
    <aside ref={cardRef} className="word-analyzer-card">
      {!word && (
        <div className="wac-empty-state">
          <div className="wac-empty-card">
            <h2 className="wac-empty-title">Word analysis · शब्द-विश्लेषणम्</h2>
            <p className="wac-empty-lead">
              Tap any Sanskrit word on the left to see meaning, grammar, and sound here.
            </p>
            <ul className="wac-empty-tips">
              <li>
                <span className="wac-empty-tip-label" aria-hidden="true">▶</span>
                <span>
                  <strong>Play all</strong> — hear every word on this page, in order
                  (green button above the text).
                </span>
              </li>
              <li>
                <span className="wac-empty-tip-label" aria-hidden="true">अ</span>
                <span>
                  <strong>Click a word</strong> — this panel shows अर्थः (meaning),
                  pronunciation, and related forms.
                </span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {word && (
        <div className="wac-content">
          {/* Top Sticky Header & Meaning: Always visible without scrolling */}
          <div className="wac-pinned-meaning-header">
            <div className="wac-header wac-header-flex">
              <div className="wac-title-wrap">
                <button
                  type="button"
                  className="wac-devanagari-btn"
                  onClick={() => playPronunciation(word.devanagari)}
                  aria-label={`Play pronunciation for ${word.devanagari}`}
                >
                  {word.devanagari}
                </button>
                {word.transliteration && (
                  <span className="wac-transliteration">{word.transliteration}</span>
                )}
              </div>
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

            {/* Meaning — Positioned at the top of the card */}
            <section className="wac-section wac-section--meaning">
              <div className="wac-meaning-header-row">
                <span className="wac-meaning-tag">अर्थः · Meaning</span>
                {glossEntry?.grammar && (
                  <span className="wac-grammar-badge" title="Grammar">{glossEntry.grammar}</span>
                )}
              </div>
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
                <p className="wac-placeholder">No meaning available yet for this word.</p>
              )}
            </section>
          </div>

          {/* Grammatical Information — displayed as compact pills when inflection is detected */}
          {nounInflection && (nounInflection.gender || nounInflection.number || nounInflection.case !== undefined) && (
            <section className="wac-section wac-section--compact">
              <h3 className="wac-section-title">Grammar (व्याकरणम्)</h3>
              <div className="wac-grammar-pills">
                {nounInflection.gender && (
                  <div className="wac-grammar-pill">
                    <span className="wac-pill-label">Gender</span>
                    <span className="wac-pill-val">{nounInflection.gender}</span>
                  </div>
                )}
                {nounInflection.number && (
                  <div className="wac-grammar-pill">
                    <span className="wac-pill-label">Number</span>
                    <span className="wac-pill-val">{nounInflection.number}</span>
                  </div>
                )}
                {nounInflection.case !== undefined && (
                  <div className="wac-grammar-pill">
                    <span className="wac-pill-label">Case</span>
                    <span className="wac-pill-val">{formatCaseLabel(nounInflection.case)}</span>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Syllable Breakdown */}
          {word.syllables.length > 0 && (
            <section className="wac-section wac-section--compact">
              <h3 className="wac-section-title">Syllables (अक्षराणि)</h3>
              <div className="wac-syllables-grid">
                {word.syllables.map((syllable, idx) => (
                  <div key={idx} className="wac-syllable-box">
                    <div className="wac-syllable-dev">{syllable.devanagari}</div>
                    <div className="wac-syllable-translit">{syllable.transliteration}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Conjunct Consonants — Only shown if conjuncts exist */}
          {word.conjunctConsonants.length > 0 && (
            <section className="wac-section wac-section--compact">
              <h3 className="wac-section-title">Conjunct Consonants (संयुक्ताक्षर)</h3>
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
            </section>
          )}

          {/* Letter / Akshara Explorer — Shown when browsing aksharas */}
          {soundAnchor && vowelExamples.length > 0 && (
            <section className="wac-section">
              <h3 className="wac-section-title">Words with this akṣara</h3>
              {examplesMode === 'related' ? (
                <>
                  {rareNote ? (
                    <p className="wac-placeholder" style={{ marginBottom: '.35rem' }}>
                      {rareNote}
                    </p>
                  ) : null}
                  <p className="wac-placeholder" style={{ marginBottom: '.5rem' }}>
                    Related {relatedFamilyLetter}-family words (in real words{' '}
                    {relatedFamilyLetter} is written {relatedFamilyLetter}् before a consonant).
                  </p>
                </>
              ) : (
                <p className="wac-placeholder" style={{ marginBottom: '.5rem' }}>
                  Familiar words that use this exact letter. Click on words to hear them.
                </p>
              )}
              <div className="wac-vowel-examples">
                {vowelExamples.map((item) => (
                  <button
                    key={item.word}
                    type="button"
                    className={`wac-vowel-example-btn${word?.devanagari === item.word ? ' wac-vowel-example-btn--active' : ''}`}
                    onClick={() => openExampleWord(item.word)}
                  >
                    <span className="wac-vowel-example-icon" aria-hidden="true">{iconForExampleWord(item.word)}</span>
                    <span className="wac-vowel-example-text">
                      <span className="wac-vowel-example-dev">{item.word}</span>
                      <span className="wac-vowel-example-gloss">{item.gloss}</span>
                    </span>
                  </button>
                ))}
              </div>
            </section>
          )}

          {soundAnchor && vowelExamples.length === 0 && isBarakhadiAkshara(soundAnchor) && (
            <section className="wac-section">
              <h3 className="wac-section-title">Words with this akṣara</h3>
              <p className="wac-placeholder">
                Rare akṣara — few everyday Sanskrit words use this exact letter. Learn the sound first.
              </p>
            </section>
          )}

          {/* Etymology — Only shown if available */}
          {(word.etymology || glossEntry?.etymology) && (
            <section className="wac-section wac-section--compact">
              <h3 className="wac-section-title">Etymology (व्युत्पत्तिः)</h3>
              <p className="wac-etymology">
                {word.etymology || glossEntry?.etymology}
              </p>
            </section>
          )}

          {/* Contextual Examples — Only shown if available */}
          {word.examples && word.examples.length > 0 && (
            <section className="wac-section wac-section--compact">
              <h3 className="wac-section-title">Contextual Examples</h3>
              <ul className="wac-examples-list">
                {word.examples.map((example, idx) => (
                  <li key={idx}>{example}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </aside>
  );
};

export default WordAnalyzerCard;
