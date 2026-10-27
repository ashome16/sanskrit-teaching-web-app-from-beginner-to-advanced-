import React, { useState, useMemo } from 'react';
import {
  ROOT_WORDS_LIST,
  SIMPLE_SENTENCES_CATALOG,
  SENTENCE_CATEGORIES,
  FOUNDATIONAL_TILE_PUZZLES,
  SENTENCES_200_PUZZLES,
  type RootWordItem,
  type SimpleSentenceItem,
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
type PuzzlePack = 'foundation' | 'all_200';

export const SimpleSentencesStudio: React.FC<SimpleSentencesStudioProps> = ({
  onSelectWord,
  onGoHome,
  onOpenNextLesson,
}) => {
  const [activeTab, setActiveTab] = useState<StudioTab>('roots');

  // Root words state (Tab 1)
  const [selectedRootId, setSelectedRootId] = useState<string>('path');
  const [person, setPerson] = useState<'prathama' | 'madhyama' | 'uttama'>('prathama');
  const [number, setNumber] = useState<'singular' | 'dual' | 'plural'>('singular');
  const [showFullTable, setShowFullTable] = useState(false);

  // 200 Sentences state (Tab 2)
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Sentence puzzle game state (Tab 3)
  const [puzzlePack, setPuzzlePack] = useState<PuzzlePack>('foundation');
  const [puzzleCategoryFilter, setPuzzleCategoryFilter] = useState<string>('all');
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [placedTiles, setPlacedTiles] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [customPuzzle, setCustomPuzzle] = useState<SentencePuzzleItem | null>(null);

  // Root selection
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

  // Filter 100 sentences by category & search query
  const filteredSentences = useMemo(() => {
    return SIMPLE_SENTENCES_CATALOG.filter((item) => {
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      if (!matchCat) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        item.sanskrit.toLowerCase().includes(q) ||
        item.transliteration.toLowerCase().includes(q) ||
        item.english.toLowerCase().includes(q) ||
        (item.hindi && item.hindi.toLowerCase().includes(q)) ||
        item.words.some((w) => w.devanagari.includes(q) || w.meaning.toLowerCase().includes(q))
      );
    });
  }, [selectedCategory, searchQuery]);

  // Active puzzles list for the puzzle game (Tab 3)
  const activePuzzleList = useMemo<SentencePuzzleItem[]>(() => {
    if (customPuzzle) {
      return [customPuzzle];
    }
    if (puzzlePack === 'foundation') {
      return FOUNDATIONAL_TILE_PUZZLES;
    }
    if (puzzleCategoryFilter === 'all') {
      return SENTENCES_200_PUZZLES;
    }
    return SENTENCES_200_PUZZLES.filter((p) => p.category === puzzleCategoryFilter);
  }, [customPuzzle, puzzlePack, puzzleCategoryFilter]);

  const currentPuzzle = useMemo<SentencePuzzleItem>(() => {
    if (customPuzzle) return customPuzzle;
    if (activePuzzleList.length === 0) return FOUNDATIONAL_TILE_PUZZLES[0];
    return activePuzzleList[puzzleIndex % activePuzzleList.length];
  }, [customPuzzle, activePuzzleList, puzzleIndex]);

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
    const next = [...placedTiles];
    next.splice(index, 1);
    setPlacedTiles(next);
    setIsCorrect(false);
  };

  const handleNextPuzzle = () => {
    soundEffects.playPuzzleSnap();
    if (customPuzzle) {
      setCustomPuzzle(null);
    }
    setPuzzleIndex((prev) => prev + 1);
    setPlacedTiles([]);
    setIsCorrect(false);
  };

  const handleSpeak = (text: string) => {
    stopPronunciation();
    playPronunciation(text);
  };

  // Launch any sentence directly into Tab 3 Tiles Puzzle!
  const handleLaunchTilePuzzle = (s: SimpleSentenceItem) => {
    soundEffects.playPuzzleSnap();
    const tokens = s.sanskrit.split(/\s+/).filter(Boolean);
    const scrambled = [...tokens];
    if (scrambled.length > 1) {
      scrambled.reverse();
      if (scrambled[0] === tokens[0] && scrambled.length > 2) {
        const tmp = scrambled[0];
        scrambled[0] = scrambled[1];
        scrambled[1] = tmp;
      }
    }
    const newPuzzle: SentencePuzzleItem = {
      id: `custom-${s.num}`,
      english: s.english,
      correctOrder: tokens,
      scrambled,
      hint: `${s.transliteration}`,
      explanation: `${s.sanskrit} (${s.english})`,
      category: s.category,
    };
    setCustomPuzzle(newPuzzle);
    setPlacedTiles([]);
    setIsCorrect(false);
    setActiveTab('practice');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="simple-sentences-studio">
      {/* Studio Header */}
      <header className="sss-header">
        <div className="sss-eyebrow">
          <span className="sss-badge">LEVEL 3 · INTERMEDIATE SANSKRIT</span>
          <span className="sss-tag">सरल-वाक्यानि & धातवः</span>
        </div>
        <h1 className="sss-title">Root Words, 200 Everyday Sentences &amp; Tiles Puzzle</h1>
        <p className="sss-subtitle">
          Master the building blocks of spoken Sanskrit: forge verbs from core roots (धातवः), explore 200 authentic everyday sentences across 20 vital themes, and master syntax with the interactive tiles puzzle game.
        </p>

        {/* 3 Step Navigation Tabs */}
        <div className="sss-nav-tabs">
          <button
            type="button"
            className={`sss-nav-tab ${activeTab === 'roots' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('roots');
              soundEffects.playPuzzleSnap();
            }}
          >
            <span className="snt-num">१</span>
            <div className="snt-text">
              <strong>धातवः · Root Words</strong>
              <span>Interactive Verb Forge</span>
            </div>
          </button>

          <button
            type="button"
            className={`sss-nav-tab ${activeTab === 'sentences' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('sentences');
              soundEffects.playPuzzleSnap();
            }}
          >
            <span className="snt-num">२</span>
            <div className="snt-text">
              <strong>सरल-वाक्यानि · 200 Sentences</strong>
              <span>20 Categorized Themes</span>
            </div>
          </button>

          <button
            type="button"
            className={`sss-nav-tab ${activeTab === 'practice' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('practice');
              soundEffects.playPuzzleSnap();
            }}
          >
            <span className="snt-num">३</span>
            <div className="snt-text">
              <strong>वाक्याभ्यासः · Tiles Puzzle</strong>
              <span>Foundational &amp; 200 Packs</span>
            </div>
          </button>
        </div>
      </header>

      {/* ===================================================================
          TAB 1: ROOT WORDS & VERB FORGE (धातवः)
          =================================================================== */}
      {activeTab === 'roots' && (
        <section className="sss-section sss-roots-section" aria-label="Root Words Explorer">
          <div className="sss-building-block-banner">
            <div className="sss-bb-left">
              <span className="sss-bb-icon">🌿</span>
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
                          <span>Singular (1)</span>
                        </button>
                        <button
                          type="button"
                          className={`sfc-toggle-btn ${number === 'dual' ? 'active' : ''}`}
                          onClick={() => { setNumber('dual'); soundEffects.playPuzzleSnap(); }}
                        >
                          <strong>द्विवचनम्</strong>
                          <span>Dual (2)</span>
                        </button>
                        <button
                          type="button"
                          className={`sfc-toggle-btn ${number === 'plural' ? 'active' : ''}`}
                          onClick={() => { setNumber('plural'); soundEffects.playPuzzleSnap(); }}
                        >
                          <strong>बहुवचनम्</strong>
                          <span>Plural (3+)</span>
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
                  <span>Ready to explore 200 practical everyday phrases?</span>
                  <button
                    type="button"
                    className="sss-primary-btn"
                    onClick={() => {
                      setActiveTab('sentences');
                      soundEffects.playPuzzleSnap();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    Step 2: Explore 200 Sentences Studio ➔
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===================================================================
          TAB 2: 200 SANSKRIT EVERYDAY SENTENCES (सरल-वाक्यानि)
          =================================================================== */}
      {activeTab === 'sentences' && (
        <section className="sss-section sss-sentences-section" aria-label="200 Simple Sentences Catalog">
          {/* Controls Bar */}
          <div className="sss-sentences-controls">
            <div className="sss-cat-chips">
              <button
                type="button"
                className={`sss-cat-chip ${selectedCategory === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('all')}
              >
                All 200 Sentences (२००)
              </button>
              {SENTENCE_CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  className={`sss-cat-chip ${selectedCategory === cat.key ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.key)}
                >
                  {cat.icon} {cat.labelDev} ({cat.count})
                </button>
              ))}
            </div>

            <div className="sss-search-box">
              <span aria-hidden="true">🔍</span>
              <input
                type="text"
                placeholder="Search Sanskrit, English, or grammar..."
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
            <span className="legend-pill pill-other">🟣 अव्ययम् / विशेषणम् (Adverb / Particle)</span>
            <span className="legend-count-info">
              Showing <strong>{filteredSentences.length}</strong> of 200 sentences
            </span>
          </div>

          {/* Sentences Grid */}
          <div className="sss-sentences-grid">
            {filteredSentences.map((s) => (
              <div key={s.id} className="sss-sentence-card">
                <div className="ssc-top">
                  <div className="ssc-num-cat">
                    <span className="ssc-index-badge">#{s.num}</span>
                    <span className="ssc-category-badge">{s.categoryLabel}</span>
                  </div>
                  <div className="ssc-top-actions">
                    <span className="ssc-level-badge">{s.levelBadge}</span>
                    <button
                      type="button"
                      className="ssc-tile-try-btn"
                      onClick={() => handleLaunchTilePuzzle(s)}
                      title="Assemble this sentence in the Tiles Puzzle game"
                    >
                      🧩 Assemble in Puzzle
                    </button>
                  </div>
                </div>

                <div className="ssc-body">
                  {/* Sanskrit sentence with audio button */}
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

                  <p className="ssc-translit-text"><em>{s.transliteration}</em></p>
                  <p className="ssc-english-text">&ldquo;{s.english}&rdquo;</p>
                  {s.hindi && <p className="ssc-hindi-text">हिन्दी : {s.hindi}</p>}

                  {/* Word-by-word Breakdown */}
                  <div className="ssc-words-breakdown">
                    <span className="breakdown-label">Word Anatomy (पदच्छेदः):</span>
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
              <h3>Test your sentence ordering skills in the Tiles Puzzle</h3>
              <p>Practice with the moved foundational 25 sentences pack or test your skills across all 200 everyday sentences!</p>
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
          TAB 3: SENTENCE ASSEMBLY PRACTICE (वाक्याभ्यासः · TILES PUZZLE)
          =================================================================== */}
      {activeTab === 'practice' && (
        <section className="sss-section sss-practice-section" aria-label="Sentence Assembly Practice">
          <div className="sss-puzzle-shell">
            {/* Additional Feature Notice Bar */}
            <div className="sss-feature-callout">
              <span className="sfc-spark">✨</span>
              <div className="sfc-info">
                <strong>Additional Feature: Tiles Puzzle Assembly Game</strong>
                <p>
                  Foundational beginner sentences have been moved into this dedicated interactive tile arena. Choose a puzzle pack below or assemble any sentence!
                </p>
              </div>
            </div>

            {/* Pack Switcher Toolbar */}
            <div className="sss-puzzle-pack-bar">
              <div className="sppb-tabs">
                <button
                  type="button"
                  className={`sppb-tab ${puzzlePack === 'foundation' && !customPuzzle ? 'active' : ''}`}
                  onClick={() => {
                    setCustomPuzzle(null);
                    setPuzzlePack('foundation');
                    setPuzzleIndex(0);
                    setPlacedTiles([]);
                    setIsCorrect(false);
                    soundEffects.playPuzzleSnap();
                  }}
                >
                  🎓 Foundational Pack (25 Sentences)
                </button>
                <button
                  type="button"
                  className={`sppb-tab ${puzzlePack === 'all_200' && !customPuzzle ? 'active' : ''}`}
                  onClick={() => {
                    setCustomPuzzle(null);
                    setPuzzlePack('all_200');
                    setPuzzleIndex(0);
                    setPlacedTiles([]);
                    setIsCorrect(false);
                    soundEffects.playPuzzleSnap();
                  }}
                >
                  🌟 200 Sentences Practice Pack
                </button>
              </div>

              {puzzlePack === 'all_200' && !customPuzzle && (
                <div className="sppb-cat-select">
                  <label htmlFor="puzzle-cat">Topic Filter: </label>
                  <select
                    id="puzzle-cat"
                    value={puzzleCategoryFilter}
                    onChange={(e) => {
                      setPuzzleCategoryFilter(e.target.value);
                      setPuzzleIndex(0);
                      setPlacedTiles([]);
                      setIsCorrect(false);
                    }}
                    className="sppb-dropdown"
                  >
                    <option value="all">All 20 Categories (२० विषयाः)</option>
                    {SENTENCE_CATEGORIES.map((c) => (
                      <option key={c.key} value={c.key}>
                        {c.labelDev} ({c.labelEn})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Custom Puzzle Banner if launched from 100 sentences catalog */}
            {customPuzzle && (
              <div className="sss-custom-puzzle-banner">
                <span>🎯 Practicing custom sentence from catalog: <strong>&ldquo;{customPuzzle.english}&rdquo;</strong></span>
                <button
                  type="button"
                  className="scpb-exit-btn"
                  onClick={() => {
                    setCustomPuzzle(null);
                    setPlacedTiles([]);
                    setIsCorrect(false);
                  }}
                >
                  Back to Standard Puzzles ×
                </button>
              </div>
            )}

            <div className="sss-puzzle-meta">
              <span className="spm-badge">
                {customPuzzle
                  ? 'CUSTOM SENTENCE PUZZLE'
                  : `PUZZLE ${(puzzleIndex % activePuzzleList.length) + 1} OF ${activePuzzleList.length}`}
              </span>
              <span className="spm-score">⭐ Score: {score} pts</span>
            </div>

            <div className="sss-puzzle-card">
              <div className="spc-prompt-box">
                <span className="spc-target-label">Assemble this sentence in Sanskrit:</span>
                <h3 className="spc-target-english">&ldquo;{currentPuzzle.english}&rdquo;</h3>
                <span className="spc-hint">💡 Pronunciation Guide: {currentPuzzle.hint}</span>
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
            Proceed to Saraswati Prarthana (Chapter 1) ➔
          </button>
        )}
      </footer>
    </div>
  );
};
