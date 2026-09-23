import React, { useEffect, useState } from 'react';
import type { DhatuEntry } from '../types/linguistics';
import { loadDhatupatha } from '../utils/dhatupatha';
import { playPronunciation } from '../utils/pronunciation';
import {
  LAKARAS,
  type LakaraId,
  deriveConjugationTable,
  getKrtParticiples,
  deconstructWord,
  type DeconstructionResult,
  PRATYAYA_QUIZ_SET,
  PERSON_LABELS,
  NUMBER_LABELS,
} from '../utils/paninianEngine';
import DhatupathaBrowser from './DhatupathaBrowser';
import DhatupathaArticles from './DhatupathaArticles';
import '../styles/dhatupatha.css';

type StudioMode = 'deconstructor' | 'generator' | 'library' | 'quiz' | 'articles';

type PaninianStudioProps = {
  onGoBack?: () => void;
};

const SUGGESTED_DECON_WORDS = [
  'समूपागच्छति',
  'गत्वा',
  'पठितुम्',
  'भवति',
  'गच्छति',
  'अपठत्',
  'गमिष्यति',
  'आगत्य',
  'कृत्वा',
  'कर्तुम्',
  'पठेत्',
  'पठन्तु',
  'लेखिष्यति',
  'भवन्ति',
];

const PaninianStudio: React.FC<PaninianStudioProps> = ({ onGoBack }) => {
  const [mode, setMode] = useState<StudioMode>('deconstructor');
  const [dhatuLibrary, setDhatuLibrary] = useState<DhatuEntry[]>([]);

  // Deconstructor state
  const [deconInput, setDeconInput] = useState('गत्वा');
  const [deconResult, setDeconResult] = useState<DeconstructionResult | null>(null);

  // Generator state
  const [selectedDhatuId, setSelectedDhatuId] = useState('path');
  const [activeLakara, setActiveLakara] = useState<LakaraId | 'krt'>('lat');

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    loadDhatupatha().then((data) => {
      setDhatuLibrary(data);
      // Run initial deconstruction
      const res = deconstructWord('गत्वा', data);
      setDeconResult(res);
    });
  }, []);

  const handleDeconstruct = (wordToAnalyze?: string) => {
    const target = (wordToAnalyze || deconInput).trim();
    if (!target) return;
    const res = deconstructWord(target, dhatuLibrary);
    setDeconResult(res);
  };

  const handleSelectSuggestion = (word: string) => {
    setDeconInput(word);
    handleDeconstruct(word);
  };

  // Resolve selected Dhatu for generator
  const currentDhatu =
    dhatuLibrary.find((d) => (d.id || '').toLowerCase() === selectedDhatuId.toLowerCase()) ||
    dhatuLibrary.find((d) => d.devanagari === 'पठ्') ||
    dhatuLibrary[0] ||
    ({
      id: 'path',
      devanagari: 'पठ्',
      transliteration: 'paṭh',
      meaning: 'to read, to study',
      meaning_hi: 'पढ़ना',
      gana: 1,
      gana_name: 'bhvādi',
      padam: 'parasmaipada',
      examples: ['पठति', 'पठसि', 'पठामि'],
    } as DhatuEntry);

  const activeLakaraInfo = LAKARAS.find((l) => l.id === activeLakara);
  const conjugationTable =
    activeLakara !== 'krt' ? deriveConjugationTable(currentDhatu, activeLakara) : null;
  const krtParticiples = activeLakara === 'krt' ? getKrtParticiples(currentDhatu) : null;

  // Quiz handlers
  const currentQuestion = PRATYAYA_QUIZ_SET[quizIndex];
  const handleSelectQuizOption = (opt: string) => {
    if (selectedOption !== null) return; // already answered
    setSelectedOption(opt);
    setShowExplanation(true);
    if (opt === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (quizIndex < PRATYAYA_QUIZ_SET.length - 1) {
      setQuizIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      // restart
      setQuizIndex(0);
      setSelectedOption(null);
      setShowExplanation(false);
      setScore(0);
    }
  };

  return (
    <div className="dp-studio" aria-label="Pāṇinian Dhātupāṭha Studio">
      {/* Studio Navigation Banner */}
      <header className="dp-studio-header">
        <div className="dp-studio-title-row">
          <div>
            <h2 className="dp-studio-main-title">
              🕉️ पाणिनीय-धातुपाठ-प्रयोगशाला
            </h2>
            <p className="dp-studio-subtitle">
              Pāṇinian Derivation Engine, Word Deconstructor &amp; 5-Lakāra Conjugation Studio
            </p>
          </div>
          {onGoBack && (
            <button type="button" className="grammar-back" onClick={onGoBack}>
              ← Back to Grammar Shelf
            </button>
          )}
        </div>

        {/* 4 Core Modes Switcher */}
        <nav className="dp-studio-nav" aria-label="Studio sub-modules">
          <button
            type="button"
            className={`dp-studio-tab${mode === 'deconstructor' ? ' dp-studio-tab--active' : ''}`}
            onClick={() => setMode('deconstructor')}
          >
            <span className="dp-tab-icon">🔍</span>
            <span className="dp-tab-text">पद-विश्लेषणम् (Deconstructor)</span>
          </button>
          <button
            type="button"
            className={`dp-studio-tab${mode === 'generator' ? ' dp-studio-tab--active' : ''}`}
            onClick={() => setMode('generator')}
          >
            <span className="dp-tab-icon">⚙️</span>
            <span className="dp-tab-text">रूप-साधकम् (5-Lakāra Generator)</span>
          </button>
          <button
            type="button"
            className={`dp-studio-tab${mode === 'quiz' ? ' dp-studio-tab--active' : ''}`}
            onClick={() => setMode('quiz')}
          >
            <span className="dp-tab-icon">🎮</span>
            <span className="dp-tab-text">प्रत्यय-अभ्यासः (Pratyaya Challenge)</span>
          </button>
          <button
            type="button"
            className={`dp-studio-tab${mode === 'library' ? ' dp-studio-tab--active' : ''}`}
            onClick={() => setMode('library')}
          >
            <span className="dp-tab-icon">📖</span>
            <span className="dp-tab-text">धातुपाठ-सूची (Root Library)</span>
          </button>
          <button
            type="button"
            className={`dp-studio-tab${mode === 'articles' ? ' dp-studio-tab--active' : ''}`}
            onClick={() => setMode('articles')}
          >
            <span className="dp-tab-icon">📜</span>
            <span className="dp-tab-text">सिद्धान्त-मञ्जरी (Articles &amp; Guides)</span>
          </button>
        </nav>
      </header>

      {/* ================================================================= */}
      {/* MODE 1: WORD DECONSTRUCTOR (पद-विश्लेषणम्) */}
      {/* ================================================================= */}
      {mode === 'deconstructor' && (
        <section className="dp-section" aria-label="Word Deconstructor">
          <div className="dp-decon-searchbox">
            <h3 className="dp-section-heading">
              🔍 पद-विश्लेषणम् · Sanskrit Word Deconstruction Engine
            </h3>
            <p className="dp-section-desc">
              Type any Sanskrit verb or participle (or pick a sample below) to deconstruct it into its
              Pāṇinian formula: <strong>Root (धातु) + Vikaraṇa + Suffix (प्रत्यय)</strong>.
            </p>

            <form
              className="dp-decon-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleDeconstruct();
              }}
            >
              <input
                type="text"
                className="dp-decon-input"
                placeholder="Enter Sanskrit word, e.g. गत्वा, पठितुम्, भवति, अपठत्, गमिष्यति..."
                value={deconInput}
                onChange={(e) => setDeconInput(e.target.value)}
              />
              <button type="submit" className="dp-decon-submit">
                Analyze Word (विश्लेषणम्)
              </button>
            </form>

            <div className="dp-suggestions-row">
              <span className="dp-suggestions-label">Try school samples:</span>
              {SUGGESTED_DECON_WORDS.map((w) => (
                <button
                  type="button"
                  key={w}
                  className="dp-suggestion-chip"
                  onClick={() => handleSelectSuggestion(w)}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>

          {/* Deconstruction Result Card */}
          {deconResult && (
            <article className="dp-decon-card">
              <div className="dp-decon-header">
                <div>
                  <span className="dp-decon-badge">{deconResult.grammaticalLabel}</span>
                  <h4 className="dp-decon-result-word">
                    {deconResult.query}
                    <button
                      type="button"
                      className="dp-audio-inline"
                      onClick={() => playPronunciation(deconResult.query)}
                      title={`Listen to ${deconResult.query}`}
                    >
                      🔊
                    </button>
                  </h4>
                </div>
                <div className="dp-decon-translations">
                  <div className="dp-trans-en">
                    <strong>Meaning:</strong> {deconResult.englishTranslation}
                  </div>
                  <div className="dp-trans-hi">
                    <strong>हिन्दी:</strong> {deconResult.hindiTranslation}
                  </div>
                </div>
              </div>

              {/* Visual Formula Pill */}
              <div className="dp-formula-banner">
                <span className="dp-formula-tag">Pāṇinian Derivation Formula:</span>
                <div className="dp-formula-chips">
                  {deconResult.formula.prefix && (
                    <>
                      <span className="dp-chip-prefix">
                        उपसर्ग: {deconResult.formula.prefix}
                      </span>
                      <span className="dp-formula-op">+</span>
                    </>
                  )}
                  <span className="dp-chip-root">
                    धातु: {deconResult.formula.root}
                  </span>
                  {deconResult.formula.vikarana && (
                    <>
                      <span className="dp-formula-op">+</span>
                      <span className="dp-chip-vikarana">
                        विकरण: {deconResult.formula.vikarana}
                      </span>
                    </>
                  )}
                  <span className="dp-formula-op">+</span>
                  <span className="dp-chip-suffix">
                    प्रत्यय: {deconResult.formula.suffix}
                  </span>
                  <span className="dp-formula-arrow">➔</span>
                  <span className="dp-chip-result">{deconResult.formula.result}</span>
                </div>
              </div>

              {/* Linguistic Details Grid */}
              <div className="dp-decon-details-grid">
                <div className="dp-detail-col">
                  <strong>मूल-धातु (Verbal Root):</strong>
                  <div style={{ fontSize: '1.15rem', color: '#0f766e', fontWeight: 700, margin: '0.2rem 0' }}>
                    {deconResult.rootDevanagari} ({deconResult.rootIast})
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#57534e' }}>
                    Root meaning: {deconResult.rootMeaningEn} {deconResult.rootMeaningHi ? `(${deconResult.rootMeaningHi})` : ''}
                    {deconResult.gana ? ` · Gaṇa ${deconResult.gana}` : ''}
                  </div>
                </div>

                <div className="dp-detail-col">
                  <strong>Pāṇinian Rule / Sūtra Reference:</strong>
                  <div style={{ fontStyle: 'italic', color: '#92400e', marginTop: '0.2rem', fontSize: '0.92rem' }}>
                    {deconResult.paniniSutra || 'General Pāṇinian morphological synthesis'}
                  </div>
                  {deconResult.notes && (
                    <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.3rem' }}>
                      💡 {deconResult.notes}
                    </div>
                  )}
                </div>
              </div>

              {/* Example Usage Sentence */}
              <div className="dp-example-box">
                <div className="dp-example-sa">
                  📖 <strong>वाक्ये प्रयोगः (Example):</strong> {deconResult.exampleUsage}
                  <button
                    type="button"
                    className="dp-audio-inline"
                    onClick={() => playPronunciation(deconResult.exampleUsage)}
                    title="Listen to sentence"
                  >
                    🔊
                  </button>
                </div>
                <div className="dp-example-en">{deconResult.exampleMeaning}</div>
              </div>

              <div className="dp-card-actions">
                <button
                  type="button"
                  className="dp-action-btn"
                  onClick={() => {
                    const found = dhatuLibrary.find(
                      (d) => d.devanagari === deconResult.rootDevanagari
                    );
                    if (found?.id) setSelectedDhatuId(found.id);
                    setMode('generator');
                  }}
                >
                  ⚙️ View Complete 5-Lakāra Conjugation for {deconResult.rootDevanagari} →
                </button>
              </div>
            </article>
          )}
        </section>
      )}

      {/* ================================================================= */}
      {/* MODE 2: 5-LAKĀRA CONJUGATION GENERATOR (रूप-साधकम्) */}
      {/* ================================================================= */}
      {mode === 'generator' && (
        <section className="dp-section" aria-label="5-Lakāra Conjugation Generator">
          <div className="dp-generator-controls">
            <div className="dp-control-row">
              <label htmlFor="root-select" className="dp-control-label">
                Select Verbal Root (धातु):
              </label>
              <select
                id="root-select"
                className="dp-select"
                value={selectedDhatuId}
                onChange={(e) => setSelectedDhatuId(e.target.value)}
              >
                {dhatuLibrary.map((d) => (
                  <option key={d.id || d.devanagari} value={d.id || d.devanagari}>
                    {d.devanagari} ({d.transliteration}) — {d.meaning} [Gaṇa {d.gana || 1}]
                  </option>
                ))}
              </select>
            </div>

            {/* Lakāra Navigation Tabs */}
            <div className="dp-lakara-tabs" role="tablist" aria-label="Select Lakāra or Participles">
              {LAKARAS.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  role="tab"
                  aria-selected={activeLakara === l.id}
                  className={`dp-lakara-tab${activeLakara === l.id ? ' dp-lakara-tab--active' : ''}`}
                  onClick={() => setActiveLakara(l.id)}
                >
                  <span className="dp-lakara-tab-sa">{l.nameSa}</span>
                  <span className="dp-lakara-tab-en">{l.nameEn.split(' ')[0]}</span>
                </button>
              ))}
              <button
                type="button"
                role="tab"
                aria-selected={activeLakara === 'krt'}
                className={`dp-lakara-tab${activeLakara === 'krt' ? ' dp-lakara-tab--active' : ''}`}
                onClick={() => setActiveLakara('krt')}
              >
                <span className="dp-lakara-tab-sa">कृदन्ताः (Participles)</span>
                <span className="dp-lakara-tab-en">क्त / तुमुन् / क्त्वा</span>
              </button>
            </div>
          </div>

          {/* Root Info Bar */}
          <div className="dp-root-infobar">
            <div className="dp-root-title">
              <span className="dp-root-bold">{currentDhatu.devanagari}</span>
              <span className="dp-root-iast">({currentDhatu.transliteration})</span>
              <span className="dp-root-tag">Gaṇa {currentDhatu.gana || 1} ({currentDhatu.gana_name || 'bhvādi'})</span>
              <span className="dp-root-tag">{currentDhatu.padam || 'parasmaipada'}</span>
              <button
                type="button"
                className="dp-audio-inline"
                onClick={() => playPronunciation(currentDhatu.devanagari)}
                title={`Listen to root ${currentDhatu.devanagari}`}
              >
                🔊
              </button>
            </div>
            <div className="dp-root-meaning">
              <strong>Meaning:</strong> {currentDhatu.meaning} {currentDhatu.meaning_hi ? `(${currentDhatu.meaning_hi})` : ''}
            </div>
          </div>

          {/* 3×3 Conjugation Table */}
          {activeLakara !== 'krt' && conjugationTable && activeLakaraInfo && (
            <div className="dp-table-wrapper">
              <div className="dp-lakara-meta-banner">
                <div>
                  <strong>{activeLakaraInfo.nameSa}</strong> ({activeLakaraInfo.nameEn}) · <em>{activeLakaraInfo.tenseCategory}</em>
                </div>
                <div style={{ fontSize: '0.85rem', color: '#92400e' }}>
                  📜 {activeLakaraInfo.paniniSutra}
                </div>
              </div>

              <div className="dp-table-scroll">
                <table className="dp-matrix-table" aria-label={`Conjugation of ${currentDhatu.devanagari} in ${activeLakaraInfo.nameSa}`}>
                  <thead>
                    <tr>
                      <th scope="col" style={{ width: '22%' }}>पुरुष (Person)</th>
                      {NUMBER_LABELS.map((num) => (
                        <th scope="col" key={num.sa} style={{ width: '26%' }}>
                          {num.sa}
                          <span className="dp-th-sub">{num.en}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {conjugationTable.map((row, pIdx) => (
                      <tr key={PERSON_LABELS[pIdx].sa}>
                        <th scope="row" className="dp-row-header">
                          {PERSON_LABELS[pIdx].sa}
                          <span className="dp-th-sub">{PERSON_LABELS[pIdx].en}</span>
                        </th>
                        {row.map((cell) => (
                          <td key={cell.full} className="dp-cell">
                            <div className="dp-cell-word-row">
                              <span className="dp-cell-word">{cell.full}</span>
                              <button
                                type="button"
                                className="dp-audio-mini"
                                onClick={() => playPronunciation(cell.full)}
                                title={`Pronounce ${cell.full}`}
                              >
                                🔊
                              </button>
                            </div>
                            <div className="dp-cell-meaning">{cell.meaningHi}</div>
                            <div className="dp-cell-formula">
                              <span className="dp-f-root">{cell.rootPart}</span>
                              <span className="dp-f-suffix">+{cell.suffixPart}</span>
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="dp-table-legend">
                <span>💡 <strong>Color Breakdown:</strong> <span className="dp-legend-root">Root (धातु)</span> + <span className="dp-legend-suffix">Tiṅ Suffix (प्रत्यय)</span>. Tap 🔊 on any cell to practice accurate Vedic pronunciation.</span>
              </div>
            </div>
          )}

          {/* Kṛt Participles Cards */}
          {activeLakara === 'krt' && krtParticiples && (
            <div className="dp-krt-container">
              <h4 className="dp-krt-title">
                कृदन्ताः · Essential Verbal Participles for {currentDhatu.devanagari}
              </h4>
              <p className="dp-krt-subtitle">
                Suffixes attached directly to verbal roots to form indeclinable gerunds, infinitives, and participles.
              </p>

              <div className="dp-krt-grid">
                {krtParticiples.map((k) => (
                  <article key={k.suffixCode} className="dp-krt-card">
                    <div className="dp-krt-header">
                      <span className="dp-krt-suffix-pill">{k.suffixName}</span>
                      <button
                        type="button"
                        className="dp-audio-inline"
                        onClick={() => playPronunciation(k.devanagariForm)}
                        title={`Listen to ${k.devanagariForm}`}
                      >
                        🔊
                      </button>
                    </div>

                    <div className="dp-krt-form-display">
                      <span className="dp-krt-word">{k.devanagariForm}</span>
                    </div>

                    <div className="dp-krt-formula-line">
                      <span className="dp-f-root">{k.rootPart}</span> + <span className="dp-f-suffix">{k.suffixPart}</span> = <strong>{k.devanagariForm}</strong>
                    </div>

                    <div className="dp-krt-meanings">
                      <div><strong>English:</strong> {k.meaningEn}</div>
                      <div><strong>हिन्दी:</strong> {k.meaningHi}</div>
                    </div>

                    <div className="dp-krt-rule">
                      📜 {k.paniniRule}
                    </div>

                    <div className="dp-krt-example">
                      📖 {k.exampleSentence}
                      <div className="dp-krt-ex-sub">{k.exampleTranslation}</div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* ================================================================= */}
      {/* MODE 3: PRATYAYA PRACTICE QUIZ (प्रत्यय-अभ्यासः) */}
      {/* ================================================================= */}
      {mode === 'quiz' && (
        <section className="dp-section" aria-label="Interactive Pratyaya Challenge">
          <div className="dp-quiz-card">
            <div className="dp-quiz-top-row">
              <span className="dp-quiz-badge">
                Question {quizIndex + 1} of {PRATYAYA_QUIZ_SET.length}
              </span>
              <span className="dp-quiz-score">
                Score: <strong>{score} / {quizIndex + (selectedOption !== null ? 1 : 0)}</strong>
              </span>
            </div>

            <h3 className="dp-quiz-prompt">{currentQuestion.prompt}</h3>
            <p className="dp-quiz-hi-prompt">{currentQuestion.hindiPrompt}</p>

            <div className="dp-quiz-formula-box">
              <span className="dp-quiz-formula-text">{currentQuestion.formula}</span>
            </div>

            <div className="dp-quiz-options-grid">
              {currentQuestion.options.map((opt) => {
                let btnStyle = 'dp-quiz-opt';
                if (selectedOption !== null) {
                  if (opt === currentQuestion.correctAnswer) {
                    btnStyle += ' dp-quiz-opt--correct';
                  } else if (opt === selectedOption) {
                    btnStyle += ' dp-quiz-opt--incorrect';
                  }
                }
                return (
                  <button
                    key={opt}
                    type="button"
                    className={btnStyle}
                    disabled={selectedOption !== null}
                    onClick={() => handleSelectQuizOption(opt)}
                  >
                    <span className="dp-quiz-opt-text">{opt}</span>
                    {selectedOption !== null && opt === currentQuestion.correctAnswer && (
                      <span className="dp-opt-icon">✓</span>
                    )}
                    {selectedOption !== null && opt === selectedOption && opt !== currentQuestion.correctAnswer && (
                      <span className="dp-opt-icon">✕</span>
                    )}
                  </button>
                );
              })}
            </div>

            {showExplanation && (
              <div className="dp-quiz-explanation-box">
                <div className="dp-exp-title">
                  {selectedOption === currentQuestion.correctAnswer
                    ? '🎉 साधु! Correct Answer!'
                    : '💡 Incorrect — Check Pāṇini Rule:'}
                </div>
                <p className="dp-exp-text">{currentQuestion.explanation}</p>
                <div className="dp-exp-example">
                  <strong>Example:</strong> {currentQuestion.example}
                  <button
                    type="button"
                    className="dp-audio-inline"
                    onClick={() => playPronunciation(currentQuestion.example)}
                    title="Listen to sentence"
                  >
                    🔊
                  </button>
                </div>
                <button
                  type="button"
                  className="dp-quiz-next-btn"
                  onClick={handleNextQuestion}
                >
                  {quizIndex < PRATYAYA_QUIZ_SET.length - 1 ? 'Next Question →' : 'Restart Challenge 🔄'}
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ================================================================= */}
      {/* MODE 4: DHĀTUPĀṬHA ROOT BROWSER & GAṆA LIBRARY */}
      {/* ================================================================= */}
      {mode === 'library' && (
        <section className="dp-section" aria-label="Dhātupāṭha Root Library">
          <div style={{ marginBottom: '1rem' }}>
            <h3 className="dp-section-heading">📖 धातुपाठ-सूची · Complete Canonical Library</h3>
            <p className="dp-section-desc">
              Browse 1,300+ authentic roots categorized across the 10 classical Gaṇas (भ्वादि, अदादि, जुहोत्यादि, etc.) with verified voice and English/Hindi meanings.
            </p>
          </div>
          <DhatupathaBrowser />
        </section>
      )}

      {/* ================================================================= */}
      {/* MODE 5: DESCRIPTIVE ARTICLES & GRAMMAR TREATISES */}
      {/* ================================================================= */}
      {mode === 'articles' && (
        <DhatupathaArticles
          onDeconstructWord={(word) => {
            setDeconInput(word);
            handleDeconstruct(word);
            setMode('deconstructor');
            window.scrollTo({ top: 100, behavior: 'smooth' });
          }}
          onGenerateDhatu={(dhatuId) => {
            setSelectedDhatuId(dhatuId);
            setMode('generator');
            window.scrollTo({ top: 100, behavior: 'smooth' });
          }}
        />
      )}
    </div>
  );
};

export default PaninianStudio;
