import React, { useEffect, useRef, useState } from 'react';
import type { SanskritWordBreakdown } from '../types/linguistics';
import { searchSanskritWords } from '../data/sanskrit-words';
import { extractLinguisticInfo } from '../utils/linguistics';
import { playPronunciation } from '../utils/pronunciation';
import {
  displayExamplesForAkshara,
  baseAksharaForExamples,
  devanagariOnly,
  isIndependentVowel,
} from '../data/vowelExamples';
import { isBarakhadiAkshara } from '../utils/barakhadiPhonetics';
import { iconForExampleWord } from '../data/exampleIcons';
import { getLetterMnemonic } from '../data/varnamalaMnemonics';
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
  onClose?: () => void;
  onSelectWord?: (word: string) => void;
}

// Strips whitespace/punctuation plus Devanagari digits, dashes, quotes, and symbols
// so only the clean word itself is analyzed.
const cleanWord = (value: string): string =>
  value.replace(/[\s।॥,;:!?()[\]{}<>'"“”‘’\-–—०-९\.\/\\=+#*~_`]+/g, '').trim();

const cleanMeaningText = (text: string): string => {
  if (!text) return '';
  return text
    .replace(/\s*\((Hindi|Hindi compound|Hindi oblique plural|oblique plural)\)/gi, '')
    .trim();
};

export const FAMOUS_SANSKRIT_QUOTES: Record<
  string,
  { shloka: string; source: string; translation: string }
> = {
  'अन्नम्': {
    shloka: 'अन्नाद् भवन्ति भूतानि पर्जन्यादन्नसम्भवः।\nयज्ञाद् भवति पर्जन्यो यज्ञः कर्मसमुद्भवः॥',
    source: 'श्रीमद्भगवद्गीता ३.१४',
    translation: 'From food all living beings subsist; food is born of rain; rain arises from sacrifice, and sacrifice from noble action.',
  },
  'अन्न': {
    shloka: 'अन्नाद् भवन्ति भूतानि पर्जन्यादन्नसम्भवः।\nयज्ञाद् भवति पर्जन्यो यज्ञः कर्मसमुद्भवः॥',
    source: 'श्रीमद्भगवद्गीता ३.१४',
    translation: 'From food all living beings subsist; food is born of rain; rain arises from sacrifice, and sacrifice from noble action.',
  },
  'ज्ञानम्': {
    shloka: 'न हि ज्ञानेन सदृशं पवित्रमिह विद्यते।\nतत्स्वयं योगसंसिद्धः कालेनात्मनि विन्दति॥',
    source: 'श्रीमद्भगवद्गीता ४.३८',
    translation: 'In this world there is nothing as purifying as knowledge; one perfected in yoga discovers it within in due course.',
  },
  'सत्यम्': {
    shloka: 'सत्यमेव जयते नानृतं सत्येन पन्था विततो देवयानः।',
    source: 'मुण्डकोपनिषद् ३.१.६',
    translation: 'Truth alone triumphs, not falsehood; through truth the divine path of the gods is unfolded.',
  },
  'विद्या': {
    shloka: 'विद्या ददाति विनयं विनयाद्याति पात्रताम्।\nपात्रत्वाद्धनमाप्नोति धनाद्धर्मं ततः सुखम्॥',
    source: 'हितोपदेशः',
    translation: 'Knowledge bestows humility, humility brings worthiness, worthiness yields wealth, wealth leads to righteousness, and righteousness brings true peace.',
  },
  'शान्तिः': {
    shloka: 'ॐ द्यौः शान्तिरन्तरिक्षं शान्तिः पृथिवी शान्तिरापः शान्तिरोषधयः शान्तिः।',
    source: 'शुक्ल-यजुर्वेदः ३६.१७',
    translation: 'May there be peace in the celestial realm, peace in space, peace on earth, peace in the waters, and peace in the herbs and trees.',
  },
  'मित्रम्': {
    shloka: 'उत्सवे व्यसने चैव दुर्भिक्षे राष्ट्रविप्लवे।\nराजद्वारे श्मशाने च यस्तिष्ठति स बान्धवः॥',
    source: 'हितोपदेशः',
    translation: 'He who stands by you in celebrations, in sorrow, during famine, during state turmoil, and in times of distress is a true friend.',
  },
  'सूर्यः': {
    shloka: 'आदित्यस्य नमस्कारान् ये कुर्वन्ति दिने दिने।\nआयुः प्रज्ञा बलं वीर्यं तेजस्तेषां च जायते॥',
    source: 'सूर्य-नमस्कार-श्लोकः',
    translation: 'Those who offer salutations to the Sun daily gain longevity, wisdom, inner strength, vitality, and radiant luster.',
  },
  'क्षत्रियः': {
    shloka: 'शौर्यं तेजो धृतिर्दाक्ष्यं युद्धे चाप्यपलायनम्।\nदानमीश्वरभावश्च क्षात्रं कर्म स्वभावजम्॥',
    source: 'श्रीमद्भगवद्गीता १८.४३',
    translation: 'Heroism, majesty, steadfastness, dexterity, never retreating in battle, generous giving, and noble leadership are the natural qualities of a Kshatriya.',
  },
};

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

const WordAnalyzerCard: React.FC<WordAnalyzerCardProps> = ({ selection, onClose, onSelectWord }) => {
  const [analysis, setAnalysis] = useState<{ word: SanskritWordBreakdown; isCustom: boolean } | null>(
    null
  );
  const [glosses, setGlosses] = useState<AnalyseRegistry>({});
  /** Letter whose “Words with this sound” list stays pinned while browsing examples. */
  const [soundAnchor, setSoundAnchor] = useState<string | null>(null);
  const [isSlowSpeech, setIsSlowSpeech] = useState(false);
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
      // Only auto-anchor the first letter when the selected token is actually a single letter or syllable!
      // For multi-letter words (like अन्नम्), do not force unrelated initial-letter words (like अश्वः, अग्निः).
      const isSingleLetterOrMatra =
        tip.length <= 2 || isBarakhadiAkshara(tip) || isIndependentVowel(tip);
      if (isSingleLetterOrMatra) {
        const hasExamples = displayExamplesForAkshara(tip).examples.length > 0;
        setSoundAnchor(
          hasExamples || isBarakhadiAkshara(tip) ? baseAksharaForExamples(tip) : null
        );
      } else {
        setSoundAnchor(null);
      }
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
  const rawMeaning = (word?.meaning || '').trim() || glossEnglish;
  const displayMeaning = cleanMeaningText(rawMeaning);

  const regionalGlosses = glossEntry?.languages
    ? Object.entries(glossEntry.languages).filter(([code, item]) => code !== 'en' && item?.meaning)
    : [];

  const famousQuote = word
    ? FAMOUS_SANSKRIT_QUOTES[word.devanagari] ||
      FAMOUS_SANSKRIT_QUOTES[cleanWord(word.devanagari)] ||
      (glossEntry ? FAMOUS_SANSKRIT_QUOTES[glossEntry.word] : undefined)
    : undefined;

  const exampleBundle = soundAnchor
    ? displayExamplesForAkshara(soundAnchor)
    : { examples: [], mode: 'exact' as const, rareNote: null };
  const pictureMnemonic = soundAnchor ? getLetterMnemonic(soundAnchor) : undefined;
  const vowelExamples = (() => {
    const base = exampleBundle.examples;
    if (!pictureMnemonic?.wordSan) return base;
    const picture = {
      word: pictureMnemonic.wordSan,
      gloss: pictureMnemonic.wordEn,
    };
    const rest = base.filter((item) => item.word !== pictureMnemonic.wordSan);
    return [picture, ...rest];
  })();
  const pictureWord = pictureMnemonic?.wordSan ?? null;
  const examplesMode = exampleBundle.mode;
  const rareNote = exampleBundle.rareNote;
  const relatedFamilyLetter = soundAnchor
    ? Array.from(devanagariOnly(soundAnchor))[0] ?? ''
    : '';

  const handleSpeak = (text: string) => {
    if (isSlowSpeech) {
      playPronunciation(text, { plainDevanagari: true, rate: 0.72 });
    } else {
      playPronunciation(text);
    }
  };

  const openExampleWord = (example: string) => {
    const result = findWord(example);
    setAnalysis(result);
    handleSpeak(example);
  };

  const handleInspectSyllable = (syllableText: string) => {
    handleSpeak(syllableText);
    const tip = devanagariOnly(cleanWord(syllableText));
    if (tip) {
      setSoundAnchor(baseAksharaForExamples(tip));
    }
  };

  return (
    <aside ref={cardRef} className="word-analyzer-card" aria-label="Sanskrit Word Analyzer">
      {/* Sleek Top Branding Bar */}
      <div className="wac-top-branding-bar">
        <div className="wac-branding-title-col">
          <div className="wac-branding-title">
            <span className="wac-branding-gem" aria-hidden="true">🪷</span>
            <span>शब्द-विश्लेषणम् · Word Analyzer</span>
          </div>
          <span className="wac-branding-sub">Live Morphology, Meaning &amp; Phonetics</span>
        </div>
        <div className="wac-branding-actions">
          <button
            type="button"
            className={`wac-speed-toggle-btn${isSlowSpeech ? ' active' : ''}`}
            onClick={() => setIsSlowSpeech(!isSlowSpeech)}
            title={isSlowSpeech ? 'Switch to Normal Speed (1.0x)' : 'Switch to Slow Phonetics (0.7x 🐢)'}
            aria-label="Toggle slow pronunciation"
          >
            {isSlowSpeech ? '🐢 0.7x' : '⚡ 1.0x'}
          </button>
          {onClose && (
            <button
              type="button"
              className="wac-close-card-btn"
              onClick={onClose}
              title="Close / Collapse Word Analyzer"
              aria-label="Close Word Analyzer"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {!word && (
        <div className="wac-empty-state">
          <div className="wac-empty-card">
            <h2 className="wac-empty-title">
              <span aria-hidden="true">🔍</span> Live Word &amp; Sound Inspector
            </h2>
            <p className="wac-empty-lead">
              Tap any Sanskrit word or letter in the textbook or alphabet table to inspect instant meaning, root breakdown, syllables, and audio.
            </p>

            <div className="wac-empty-samples-section">
              <span className="wac-empty-samples-label">Try a sample word:</span>
              <div className="wac-empty-samples-grid">
                {[
                  { word: 'अन्नम्', gloss: 'Food / Grain', icon: '🌾' },
                  { word: 'ज्ञानम्', gloss: 'Knowledge', icon: '📖' },
                  { word: 'शान्तिः', gloss: 'Peace', icon: '🕊️' },
                  { word: 'सूर्यः', gloss: 'Sun', icon: '☀️' },
                  { word: 'क्षत्रियः', gloss: 'Protector', icon: '🏹' },
                  { word: 'जलम्', gloss: 'Water', icon: '💧' },
                ].map((item) => (
                  <button
                    key={item.word}
                    type="button"
                    className="wac-sample-chip"
                    onClick={() => {
                      if (onSelectWord) {
                        onSelectWord(item.word);
                      } else {
                        openExampleWord(item.word);
                      }
                    }}
                  >
                    <span className="wac-sample-icon" aria-hidden="true">{item.icon}</span>
                    <span className="wac-sample-dev">{item.word}</span>
                    <span className="wac-sample-gloss">{item.gloss}</span>
                  </button>
                ))}
              </div>
            </div>

            <ul className="wac-empty-tips">
              <li>
                <span className="wac-empty-tip-label" aria-hidden="true">▶</span>
                <span>
                  <strong>Play all</strong> — hear every word on this page spoken in succession.
                </span>
              </li>
              <li>
                <span className="wac-empty-tip-label" aria-hidden="true">अ</span>
                <span>
                  <strong>Tap any word</strong> — this panel reveals अर्थः (meaning), grammar, and etymology.
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
                  onClick={() => handleSpeak(word.devanagari)}
                  aria-label={`Play pronunciation for ${word.devanagari}`}
                  title="Click to hear pronunciation"
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
                onClick={() => handleSpeak(word.devanagari)}
                aria-label={`Play pronunciation for ${word.devanagari}`}
                title={isSlowSpeech ? 'Hear slow pronunciation (0.7x)' : 'Hear pronunciation (1.0x)'}
              >
                🔊
              </button>
            </div>

            {/* Meaning — Positioned prominently at the top */}
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

          {/* Classical Verse Citation (Subhāṣita / Gītā / Upaniṣad) */}
          {famousQuote && (
            <section className="wac-section wac-quote-card">
              <div className="wac-quote-header">
                <span className="wac-quote-badge">आर्ष-वचनम् · Classical Verse</span>
                <span className="wac-quote-source">{famousQuote.source}</span>
              </div>
              <p className="wac-quote-shloka">{famousQuote.shloka}</p>
              <p className="wac-quote-translation">{famousQuote.translation}</p>
              <button
                type="button"
                className="wac-quote-speak-btn"
                onClick={() => handleSpeak(famousQuote.shloka)}
                title="Listen to Verse Recitation"
              >
                <span>🔊 Listen to Verse</span>
              </button>
            </section>
          )}

          {/* Grammatical Information — displayed as compact pills when inflection is detected */}
          {nounInflection && (nounInflection.gender || nounInflection.number || nounInflection.case !== undefined) && (
            <section className="wac-section wac-section--compact">
              <h3 className="wac-section-title">Vyakaran · Grammar (व्याकरणम्)</h3>
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

          {/* Etymology / Root & Suffix (व्युत्पत्तिः) */}
          {(word.etymology || glossEntry?.etymology || word.dhatu) && (
            <section className="wac-section wac-section--compact">
              <h3 className="wac-section-title">Etymology &amp; Root (व्युत्पत्तिः / धातुः)</h3>
              {word.dhatu && (
                <div className="wac-dhatu-badge-row">
                  <span className="wac-dhatu-chip">
                    धातुः: <strong>{word.dhatu.devanagari}</strong> ({word.dhatu.meaning})
                  </span>
                  {word.pratyayas && word.pratyayas.length > 0 && (
                    <span className="wac-pratyaya-chip">
                      प्रत्ययः: {word.pratyayas.map((p) => p.devanagari).join(', ')}
                    </span>
                  )}
                </div>
              )}
              <p className="wac-etymology">
                {word.etymology || glossEntry?.etymology}
              </p>
            </section>
          )}

          {/* Syllable Breakdown */}
          {word.syllables.length > 0 && (
            <section className="wac-section wac-section--compact">
              <h3 className="wac-section-title">Syllables (अक्षराणि)</h3>
              <div className="wac-syllables-grid">
                {word.syllables.map((syllable, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="wac-syllable-box"
                    onClick={() => handleInspectSyllable(syllable.devanagari)}
                    title={`Click to pronounce & inspect ${syllable.devanagari}`}
                  >
                    <div className="wac-syllable-dev">{syllable.devanagari}</div>
                    <div className="wac-syllable-translit">{syllable.transliteration}</div>
                  </button>
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
                  <button
                    key={idx}
                    type="button"
                    className="wac-conjunct-box"
                    onClick={() => handleInspectSyllable(conjunct.devanagari)}
                    title={`Click to inspect conjunct sound ${conjunct.devanagari}`}
                  >
                    <div className="wac-conjunct-dev">{conjunct.devanagari}</div>
                    <div className="wac-conjunct-components">
                      {conjunct.components.map((comp, i) => (
                        <span key={i} className="wac-conjunct-component">
                          {comp}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Letter / Akshara Explorer — Shown when browsing aksharas or inspecting syllables */}
          {soundAnchor && vowelExamples.length > 0 && (
            <section className="wac-section">
              <div className="wac-sound-anchor-header">
                <h3 className="wac-section-title">Words with this akṣara: <span className="wac-anchor-letter">{soundAnchor}</span></h3>
                <button
                  type="button"
                  className="wac-clear-anchor-btn"
                  onClick={() => setSoundAnchor(null)}
                  title="Close related words"
                >
                  ✕
                </button>
              </div>
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
                  Familiar words that use this exact letter sound. Tap to hear:
                </p>
              )}
              <div className="wac-vowel-examples">
                {vowelExamples.map((item) => {
                  const isPicture = pictureWord === item.word;
                  const isActive = word?.devanagari === item.word;
                  return (
                    <button
                      key={item.word}
                      type="button"
                      className={`wac-vowel-example-btn${isActive ? ' wac-vowel-example-btn--active' : ''}${isPicture ? ' wac-vowel-example-btn--picture' : ''}`}
                      onClick={() => openExampleWord(item.word)}
                      aria-label={`Hear word ${item.word}${item.gloss ? ` (${item.gloss})` : ''}`}
                      title={`Hear ${item.word}`}
                    >
                      <span className="wac-vowel-example-icon" aria-hidden="true">
                        {isPicture && pictureMnemonic?.emoji
                          ? pictureMnemonic.emoji
                          : iconForExampleWord(item.word)}
                      </span>
                      <span className="wac-vowel-example-text">
                        <span className="wac-vowel-example-dev">{item.word}</span>
                        <span className="wac-vowel-example-gloss">{item.gloss}</span>
                      </span>
                      <span className="wac-vowel-example-speak" aria-hidden="true">🔊</span>
                    </button>
                  );
                })}
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
