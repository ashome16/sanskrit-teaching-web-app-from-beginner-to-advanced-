import React, { useState, useMemo } from 'react';
import {
  ROOT_WORDS_LIST,
  SIMPLE_SENTENCES_CATALOG,
  SENTENCE_BUILDER_PUZZLES,
  type RootWordItem,
  type SentencePuzzleItem,
} from '../data/simpleSentencesData';
import { playPronunciation, stopPronunciation } from '../utils/pronunciation';
import { soundEffects } from '../utils/soundEffects';
import '../styles/simple-sentences.css';

interface SimpleSentencesStudioProps {
  onSelectWord?: (word: string) => void;
  onGoHome?: () => void;
  onOpenNextLesson?: () => void;
}

type StudioTab = 'roots' | 'sentences' | 'practice';

export const SimpleSentencesStudio: React.FC<SimpleSentencesStudioProps> = ({
  onSelectWord,
  onGoHome,
  onOpenNextLesson,
}) => {
  const [activeTab, setActiveTab] = useState<StudioTab>('roots');

  // Root words state
  const [selectedRootId, setSelectedRootId] = useState<string>('path');
  const [person, setPerson] = useState<'prathama' | 'madhyama' | 'uttama'>('prathama');
  const [number, setNumber] = useState<'singular' | 'dual' | 'plural'>('singular');
  const [showFullTable, setShowFullTable] = useState(false);

  // Sentences state
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Sentence puzzle game state
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [placedTiles, setPlacedTiles] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);

  const selectedRoot = useMemo<RootWordItem>(() => {
    return ROOT_WORDS_LIST.find((r) => r.id === selectedRootId) || ROOT_WORDS_LIST[0];
  }, [selectedRootId]);

  // Dynamically constructed verb for the selected Root + Person + Number
  const forgedVerb = useMemo(() => {
    const conj = selectedRoot.conjugations[person];
    const verb = conj[number];
    const subject =
      person === 'prathama'
        ? number === 'singular'
          ? 'सः / सा / बालकः'
          : number === 'dual'
          ? 'तौ / बालिके'
          : 'ते / बालकाः'
        : person === 'madhyama'
        ? number === 'singular'
          ? 'त्वम्'
          : number === 'dual'
          ? 'युवाम्'
          : 'यूयम्'
        : number === 'singular'
        ? 'अहम्'
        : number === 'dual'
        ? 'आवाम्'
        : 'वयम्';

    const ending =
      person === 'prathama'
        ? number === 'singular'
          ? '-ति (-ti)'
          : number === 'dual'
          ? '-तः (-taḥ)'
          : '-न्ति (-nti)'
        : person === 'madhyama'
        ? number === 'singular'
          ? '-सि (-si)'
          : number === 'dual'
          ? '-थः (-thaḥ)'
          : '-थ (-tha)'
        : number === 'singular'
        ? '-आमि (-āmi)'
        : number === 'dual'
        ? '-आवः (-āvaḥ)'
        : '-आमः (-āmaḥ)';

    return { verb, subject, ending };
  }, [selectedRoot, person, number]);

  const filteredSentences = useMemo(() => {
    return SIMPLE_SENTENCES_CATALOG.filter((item) => {
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      if (!matchCat) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        item.sanskrit.toLowerCase().includes(q) ||
        item.english.toLowerCase().includes(q) ||
        (item.hindi && item.hindi.toLowerCase().includes(q))
      );
    });
  }, [selectedCategory, searchQuery]);

  const currentPuzzle = useMemo<SentencePuzzleItem>(() => {
    return SENTENCE_BUILDER_PUZZLES[puzzleIndex % SENTENCE_BUILDER_PUZZLES.length];
  }, [puzzleIndex]);

  // Remaining tiles for the puzzle
  const availableTiles = useMemo(() => {
    const copy = [...currentPuzzle.scrambled];
    for (const placed of placedTiles) {
      const idx = copy.indexOf(placed);
      if (idx >= 0) copy.splice(idx, 1);
    }
    return copy;
  }, [currentPuzzle, placedTiles]);

  const handleTileClick = (tile: string) => {
    soundEffects.playPuzzleSnap();
    const next = [...placedTiles, tile];
    setPlacedTiles(next);

    if (next.length === currentPuzzle.correctOrder.length) {
      const isMatch = next.every((t, i) => t === currentPuzzle.correctOrder[i]);
      if (isMatch) {
        setIsCorrect(true);
        setScore((s) => s + 10);
        soundEffects.playSuccessDing();
        playPronunciation(currentPuzzle.correctOrder.join(' '));
      } else {
        soundEffects.playEncouragementDing();
      }
    }
  };

  const handleRemoveTile = (index: number) => {
    soundEffects.playPuzzleSnap();
    const copy = [...placedTiles];
    copy.splice(index, 1);
    setPlacedTiles(copy);
    setIsCorrect(false);
  };

  const handleNextPuzzle = () => {
    soundEffects.playPuzzleSnap();
    setPlacedTiles([]);
    setIsCorrect(false);
    setPuzzleIndex((prev) => prev + 1);
  };

  const handleSpeak = (text: string) => {
    stopPronunciation();
    playPronunciation(text);
  };

  return (
    <div className="simple-sentences-studio">
      {/* Studio Header Banner */}
      <header className="sss-header">
        <div className="sss-eyebrow">
          <span className="sss-badge">LEVEL 3 · INTERMEDIATE MILESTONE</span>
          <span className="sss-tag">सोपान-३ : सरल-संस्कृतम्</span>
        </div>
        <h1 className="sss-title">
          सरल-वाक्यानि एवं धातवः · Root Words &amp; Simple Sentences
        </h1>
        <p className="sss-subtitle">
          Master the living building blocks of Sanskrit: discover how actions originate in verbal roots (धातवः),
          assemble present-tense verbs, and express yourself with clear everyday sentences.
        </p>

        {/* 3 Main View Tabs */}
        <nav className="sss-nav-tabs" role="tablist" aria-label="Studio Modes">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'roots'}
            className={`sss-nav-tab ${activeTab === 'roots' ? 'active' : ''}`}
            onClick={() => setActiveTab('roots')}
          >
            <span className="sss-tab-icon">🌱</span>
            <span className="sss-tab-text">
              <strong>१. धातवः · Root Words &amp; Verb Builder</strong>
              <small>The seed of every Sanskrit action</small>
            </span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'sentences'}
            className={`sss-nav-tab ${activeTab === 'sentences' ? 'active' : ''}`}
            onClick={() => setActiveTab('sentences')}
          >
            <span className="sss-tab-icon">💬</span>
            <span className="sss-tab-text">
              <strong>२. सरल-वाक्यानि · Sentence Studio</strong>
              <small>25+ progressive everyday sentences</small>
            </span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'practice'}
            className={`sss-nav-tab ${activeTab === 'practice' ? 'active' : ''}`}
            onClick={() => setActiveTab('practice')}
          >
            <span className="sss-tab-icon">🧩</span>
            <span className="sss-tab-text">
              <strong>३. वाक्याभ्यासः · Sentence Assembly Game</strong>
              <small>Interactive puzzle tile challenge</small>
            </span>
          </button>
        </nav>
      </header>

      {/* ===================================================================
          TAB 1: ROOT WORDS & VERB FORGE (धातवः)
          =================================================================== */}
      {activeTab === 'roots' && (
        <section className="sss-section sss-roots-section" aria-label="Root Words Explorer">
          {/* Conceptual Blueprint Banner */}
          <div className="sss-blueprint-banner">
            <div className="sss-bb-left">
              <span className="sss-bb-icon">⚡</span>
              <div>
                <h3 className="sss-bb-title">How Sanskrit Verbs Are Forged (क्रियापद-निर्माणम्)</h3>
                <p className="sss-bb-desc">
                  Every Sanskrit verb comes from a <strong>धातु (Dhātu / Verbal Root)</strong>. Attach a person-ending (प्रत्यय) to bring the action to life!
                </p>
              </div>
            </div>
            <div className="sss-bb-formula">
              <span className="formula-chip root-chip">धातु (Root)</span>
              <span className="formula-op">+</span>
              <span className="formula-chip stem-chip">विकरण (Stem)</span>
              <span className="formula-op">+</span>
              <span className="formula-chip ending-chip">ति/तः/अन्ति (Ending)</span>
              <span className="formula-op">=</span>
              <span className="formula-chip verb-chip">क्रियापदम् (Living Verb)</span>
            </div>
          </div>

          <div className="sss-roots-layout">
            {/* Left: Root Word Selector Grid */}
            <div className="sss-roots-sidebar">
              <div className="sss-sidebar-head">
                <h4>Core Daily Roots ({ROOT_WORDS_LIST.length})</h4>
                <small>Select any root to forge its verbs:</small>
              </div>
              <div className="sss-roots-grid">
                {ROOT_WORDS_LIST.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    className={`sss-root-card ${selectedRootId === r.id ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedRootId(r.id);
                      soundEffects.playPuzzleSnap();
                    }}
                  >
                    <span className="src-icon">{r.icon}</span>
                    <strong className="src-name">{r.root}</strong>
                    <span className="src-trans">{r.transliteration}</span>
                    <span className="src-mean">{r.meaningEn}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Interactive Verb Forge Studio */}
            <div className="sss-roots-main">
              <div className="sss-forge-card">
                <div className="sfc-header">
                  <div className="sfc-root-identity">
                    <span className="sfc-large-icon">{selectedRoot.icon}</span>
                    <div>
                      <div className="sfc-badge-row">
                        <span className="sfc-badge">{selectedRoot.gana}</span>
                        <span className="sfc-badge">{selectedRoot.padam}</span>
                      </div>
                      <h2 className="sfc-root-title">
                        {selectedRoot.root} · <span className="sfc-en-title">{selectedRoot.meaningEn}</span>
                      </h2>
                      <span className="sfc-hi-title">हिन्दी : {selectedRoot.meaningHi}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="sss-sound-btn"
                    onClick={() => handleSpeak(selectedRoot.root)}
                    title={`Hear root sound: ${selectedRoot.root}`}
                  >
                    🔊 Hear Root
                  </button>
                </div>

                {/* Interactive Controls */}
                <div className="sfc-controls-box">
                  <h4 className="sfc-box-label">Forge Verb in Present Tense (लट्-लकारः · वर्तमानकालः)</h4>

                  <div className="sfc-selectors-row">
                    {/* Person Selector */}
                    <div className="sfc-control-group">
                      <label className="sfc-label">1. Choose Person (पुरुषः):</label>
                      <div className="sfc-btn-toggle-group">
                        <button
                          type="button"
                          className={`sfc-toggle-btn ${person === 'prathama' ? 'active' : ''}`}
                          onClick={() => { setPerson('prathama'); soundEffects.playPuzzleSnap(); }}
                        >
                          <strong>प्रथमपुरुषः</strong>
                          <span>3rd Person (सः/सा)</span>
                        </button>
                        <button
                          type="button"
                          className={`sfc-toggle-btn ${person === 'madhyama' ? 'active' : ''}`}
                          onClick={() => { setPerson('madhyama'); soundEffects.playPuzzleSnap(); }}
                        >
                          <strong>मध्यमपुरुषः</strong>
                          <span>2nd Person (त्वम्)</span>
                        </button>
                        <button
                          type="button"
                          className={`sfc-toggle-btn ${person === 'uttama' ? 'active' : ''}`}
                          onClick={() => { setPerson('uttama'); soundEffects.playPuzzleSnap(); }}
                        >
                          <strong>उत्तमपुरुषः</strong>
                          <span>1st Person (अहम्)</span>
                        </button>
                      </div>
                    </div>

                    {/* Number Selector */}
                    <div className="sfc-control-group">
                      <label className="sfc-label">2. Choose Number (वचनम्):</label>
                      <div className="sfc-btn-toggle-group">
                        <button
                          type="button"
                          className={`sfc-toggle-btn ${number === 'singular' ? 'active' : ''}`}
                          onClick={() => { setNumber('singular'); soundEffects.playPuzzleSnap(); }}
                        >
                          <strong>एकवचनम्</strong>
                          <span>1 person</span>
                        </button>
                        <button
                          type="button"
                          className={`sfc-toggle-btn ${number === 'dual' ? 'active' : ''}`}
                          onClick={() => { setNumber('dual'); soundEffects.playPuzzleSnap(); }}
                        >
                          <strong>द्विवचनम्</strong>
                          <span>2 persons</span>
                        </button>
                        <button
                          type="button"
                          className={`sfc-toggle-btn ${number === 'plural' ? 'active' : ''}`}
                          onClick={() => { setNumber('plural'); soundEffects.playPuzzleSnap(); }}
                        >
                          <strong>बहुवचनम्</strong>
                          <span>3+ persons</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Assembled Result Showcase */}
                  <div className="sfc-result-stage">
                    <div className="sfc-result-parts">
                      <span className="res-subject">{forgedVerb.subject}</span>
                      <span className="res-plus">+</span>
                      <span className="res-root">{selectedRoot.root}</span>
                      <span className="res-plus">+</span>
                      <span className="res-ending">{forgedVerb.ending}</span>
                      <span className="res-arrow">➔</span>
                      <span className="res-verb-highlight">{forgedVerb.verb}</span>
                    </div>

                    <div className="sfc-result-action-bar">
                      <button
                        type="button"
                        className="sfc-speak-verb-btn"
                        onClick={() => handleSpeak(`${forgedVerb.subject} ${forgedVerb.verb}`)}
                      >
                        🔊 Hear: {forgedVerb.subject} {forgedVerb.verb}
                      </button>
                      <span className="sfc-meaning-pill">
                        Meaning: <em>{forgedVerb.subject} {forgedVerb.verb}</em>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Exemplar Sentence Card */}
                <div className="sfc-sentence-preview">
                  <div className="sfc-sp-left">
                    <span className="sfc-sp-tag">🌟 Living Sentence Example:</span>
                    <p className="sfc-sp-sanskrit">{selectedRoot.sampleSentence.sanskrit}</p>
                    <p className="sfc-sp-english">{selectedRoot.sampleSentence.english}</p>
                    <span className="sfc-sp-breakdown">{selectedRoot.sampleSentence.breakdown}</span>
                  </div>
                  <button
                    type="button"
                    className="sfc-sp-speak-btn"
                    onClick={() => handleSpeak(selectedRoot.sampleSentence.sanskrit)}
                    title="Pronounce sentence"
                  >
                    🔊 Hear Sentence
                  </button>
                </div>

                {/* Full 3x3 Table Toggle */}
                <div className="sfc-table-toggle-row">
                  <button
                    type="button"
                    className="sfc-toggle-table-btn"
                    onClick={() => setShowFullTable((prev) => !prev)}
                  >
                    {showFullTable ? '▲ Hide Full 9-Form Grid' : '▼ View Complete 9-Form Conjugation Grid (लट् लकारः)'}
                  </button>
                </div>

                {showFullTable && (
                  <div className="sfc-full-grid">
                    <table className="sfc-table">
                      <thead>
                        <tr>
                          <th>पुरुषः (Person)</th>
                          <th>एकवचनम् (Singular)</th>
                          <th>द्विवचनम् (Dual)</th>
                          <th>बहुवचनम् (Plural)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><strong>प्रथमपुरुषः (3rd)</strong></td>
                          <td>
                            <button type="button" onClick={() => handleSpeak(selectedRoot.conjugations.prathama.singular)}>
                              🔊 {selectedRoot.conjugations.prathama.singular}
                            </button>
                          </td>
                          <td>
                            <button type="button" onClick={() => handleSpeak(selectedRoot.conjugations.prathama.dual)}>
                              🔊 {selectedRoot.conjugations.prathama.dual}
                            </button>
                          </td>
                          <td>
                            <button type="button" onClick={() => handleSpeak(selectedRoot.conjugations.prathama.plural)}>
                              🔊 {selectedRoot.conjugations.prathama.plural}
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td><strong>मध्यमपुरुषः (2nd)</strong></td>
                          <td>
                            <button type="button" onClick={() => handleSpeak(selectedRoot.conjugations.madhyama.singular)}>
                              🔊 {selectedRoot.conjugations.madhyama.singular}
                            </button>
                          </td>
                          <td>
                            <button type="button" onClick={() => handleSpeak(selectedRoot.conjugations.madhyama.dual)}>
                              🔊 {selectedRoot.conjugations.madhyama.dual}
                            </button>
                          </td>
                          <td>
                            <button type="button" onClick={() => handleSpeak(selectedRoot.conjugations.madhyama.plural)}>
                              🔊 {selectedRoot.conjugations.madhyama.plural}
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td><strong>उत्तमपुरुषः (1st)</strong></td>
                          <td>
                            <button type="button" onClick={() => handleSpeak(selectedRoot.conjugations.uttama.singular)}>
                              🔊 {selectedRoot.conjugations.uttama.singular}
                            </button>
                          </td>
                          <td>
                            <button type="button" onClick={() => handleSpeak(selectedRoot.conjugations.uttama.dual)}>
                              🔊 {selectedRoot.conjugations.uttama.dual}
                            </button>
                          </td>
                          <td>
                            <button type="button" onClick={() => handleSpeak(selectedRoot.conjugations.uttama.plural)}>
                              🔊 {selectedRoot.conjugations.uttama.plural}
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Step Forward CTA */}
                <div className="sfc-footer-cta">
                  <span>Ready to combine roots into full everyday phrases?</span>
                  <button
                    type="button"
                    className="sss-primary-btn"
                    onClick={() => {
                      setActiveTab('sentences');
                      soundEffects.playPuzzleSnap();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    Step 2: Explore Simple Sentences Studio ➔
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===================================================================
          TAB 2: SIMPLE SENTENCES STUDIO (सरल-वाक्यानि)
          =================================================================== */}
      {activeTab === 'sentences' && (
        <section className="sss-section sss-sentences-section" aria-label="Simple Sentences Catalog">
          {/* Controls Bar */}
          <div className="sss-sentences-controls">
            <div className="sss-cat-chips">
              <button
                type="button"
                className={`sss-cat-chip ${selectedCategory === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('all')}
              >
                All Sentences ({SIMPLE_SENTENCES_CATALOG.length})
              </button>
              <button
                type="button"
                className={`sss-cat-chip ${selectedCategory === 'two_words' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('two_words')}
              >
                १. द्विपद (2 Words)
              </button>
              <button
                type="button"
                className={`sss-cat-chip ${selectedCategory === 'pronouns' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('pronouns')}
              >
                २. सर्वनाम (Pronouns)
              </button>
              <button
                type="button"
                className={`sss-cat-chip ${selectedCategory === 'three_words' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('three_words')}
              >
                ३. त्रिपद (Subject-Object-Verb)
              </button>
              <button
                type="button"
                className={`sss-cat-chip ${selectedCategory === 'questions' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('questions')}
              >
                ४. सम्भाषणम् (Daily Speech)
              </button>
              <button
                type="button"
                className={`sss-cat-chip ${selectedCategory === 'nature' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('nature')}
              >
                ५. प्रकृतिः (Nature)
              </button>
            </div>

            <div className="sss-search-box">
              <span aria-hidden="true">🔍</span>
              <input
                type="text"
                placeholder="Search Sanskrit or English word..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="sss-search-input"
              />
              {searchQuery && (
                <button type="button" onClick={() => setSearchQuery('')} className="sss-clear-search">
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Grammar Color Legend */}
          <div className="sss-legend-bar">
            <span className="legend-title">Grammar Roles:</span>
            <span className="legend-pill pill-subject">🔵 कर्ता (Subject)</span>
            <span className="legend-pill pill-object">🟢 कर्म (Object)</span>
            <span className="legend-pill pill-verb">🟠 क्रियापदम् (Verb)</span>
            <span className="legend-pill pill-other">🟣 विशेषणम् / अव्ययम् (Other)</span>
          </div>

          {/* Sentences Grid */}
          <div className="sss-sentences-grid">
            {filteredSentences.map((s) => (
              <div key={s.id} className="sss-sentence-card">
                <div className="ssc-top">
                  <span className="ssc-category-badge">{s.categoryLabel}</span>
                  <span className="ssc-level-badge">{s.levelBadge}</span>
                </div>

                <div className="ssc-body">
                  {/* Sanskrit sentence with interactive word pills */}
                  <div className="ssc-sanskrit-row">
                    <p className="ssc-sanskrit-text">{s.sanskrit}</p>
                    <button
                      type="button"
                      className="ssc-audio-btn"
                      onClick={() => handleSpeak(s.sanskrit)}
                      title={`Hear pronunciation: ${s.sanskrit}`}
                    >
                      🔊
                    </button>
                  </div>

                  <p className="ssc-english-text">{s.english}</p>
                  {s.hindi && <p className="ssc-hindi-text">हिन्दी : {s.hindi}</p>}

                  {/* Word-by-word Breakdown */}
                  <div className="ssc-words-breakdown">
                    <span className="breakdown-label">Word Anatomy:</span>
                    <div className="breakdown-pills">
                      {s.words.map((w, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className={`ssc-word-pill role-${w.role}`}
                          onClick={() => {
                            handleSpeak(w.devanagari);
                            onSelectWord?.(w.devanagari);
                          }}
                          title={`Click to hear & analyze: ${w.devanagari} (${w.meaning})`}
                        >
                          <span className="swp-dev">{w.devanagari}</span>
                          <span className="swp-mean">{w.meaning}</span>
                          <span className="swp-role">{w.roleLabel}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Grammar Insight */}
                  <div className="ssc-note-box">
                    <span className="note-icon">💡</span>
                    <span className="note-text">{s.grammarNote}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA to practice */}
          <div className="sss-footer-banner">
            <div>
              <h3>Test your sentence ordering skills</h3>
              <p>Try assembling Sanskrit sentences tile by tile in the interactive puzzle game!</p>
            </div>
            <button
              type="button"
              className="sss-primary-btn"
              onClick={() => {
                setActiveTab('practice');
                soundEffects.playPuzzleSnap();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Play Sentence Assembly Game ➔
            </button>
          </div>
        </section>
      )}

      {/* ===================================================================
          TAB 3: SENTENCE ASSEMBLY PRACTICE (वाक्याभ्यासः)
          =================================================================== */}
      {activeTab === 'practice' && (
        <section className="sss-section sss-practice-section" aria-label="Sentence Assembly Practice">
          <div className="sss-puzzle-shell">
            <div className="sss-puzzle-meta">
              <span className="spm-badge">PUZZLE {puzzleIndex + 1} OF {SENTENCE_BUILDER_PUZZLES.length}</span>
              <span className="spm-score">⭐ Score: {score} pts</span>
            </div>

            <div className="sss-puzzle-card">
              <div className="spc-prompt-box">
                <span className="spc-target-label">Assemble this sentence in Sanskrit:</span>
                <h3 className="spc-target-english">&ldquo;{currentPuzzle.english}&rdquo;</h3>
                <span className="spc-hint">💡 Hint: {currentPuzzle.hint}</span>
              </div>

              {/* Formed Sentence Workspace */}
              <div className="spc-workspace-area">
                <span className="spc-ws-tag">Your Assembled Sentence:</span>
                <div className="spc-slots-rack">
                  {placedTiles.length === 0 ? (
                    <div className="spc-empty-slot-guide">
                      Tap the cream tiles below in correct Sanskrit word order (Subject ➔ Object ➔ Verb)
                    </div>
                  ) : (
                    placedTiles.map((tile, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className="spc-placed-tile"
                        onClick={() => handleRemoveTile(idx)}
                        title="Click to remove from sentence"
                      >
                        <span className="spt-word">{tile}</span>
                        <span className="spt-remove-x">×</span>
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* Scrambled Tile Rack */}
              <div className="spc-tiles-dock">
                <span className="spc-dock-tag">अक्षराणि / शब्दाः · Tap to place:</span>
                <div className="spc-tiles-grid">
                  {availableTiles.map((tile, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="spc-available-tile"
                      onClick={() => handleTileClick(tile)}
                    >
                      {tile}
                    </button>
                  ))}
                </div>
              </div>

              {/* Correct Feedback Banner */}
              {isCorrect && (
                <div className="spc-celebration-banner">
                  <div className="scb-left">
                    <span className="scb-icon">🎉</span>
                    <div>
                      <h4 className="scb-title">उत्तमम्! Perfectly Assembled!</h4>
                      <p className="scb-sentence">{currentPuzzle.correctOrder.join(' ')}</p>
                      <span className="scb-expl">{currentPuzzle.explanation}</span>
                    </div>
                  </div>
                  <div className="scb-actions">
                    <button
                      type="button"
                      className="sss-sound-btn"
                      onClick={() => handleSpeak(currentPuzzle.correctOrder.join(' '))}
                    >
                      🔊 Hear
                    </button>
                    <button
                      type="button"
                      className="sss-primary-btn"
                      onClick={handleNextPuzzle}
                    >
                      Next Sentence ➔
                    </button>
                  </div>
                </div>
              )}

              {/* Action Toolbar */}
              <div className="spc-actions-row">
                <button
                  type="button"
                  className="spc-reset-btn"
                  onClick={() => {
                    setPlacedTiles([]);
                    setIsCorrect(false);
                    soundEffects.playPuzzleSnap();
                  }}
                  disabled={placedTiles.length === 0}
                >
                  🔄 Reset Tiles
                </button>

                <button
                  type="button"
                  className="spc-skip-btn"
                  onClick={handleNextPuzzle}
                >
                  Skip to Next ➔
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer Return Links */}
      <footer className="sss-footer">
        {onGoHome && (
          <button type="button" className="sss-footer-link" onClick={onGoHome}>
            🏠 Back to Gurukul Home
          </button>
        )}
        {onOpenNextLesson && (
          <button type="button" className="sss-footer-link primary" onClick={onOpenNextLesson}>
            Proceed to NCERT Deepakam Chapter 1 ➔
          </button>
        )}
      </footer>
    </div>
  );
};
