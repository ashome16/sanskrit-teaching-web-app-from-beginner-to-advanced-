import React, { useState } from 'react';
import { playPronunciation } from '../utils/pronunciation';
import '../styles/tool-interactive-demos.css';

export interface ToolInteractiveDemosProps {
  onOpenDhatupatha?: () => void;
  onOpenBoard?: () => void;
  onOpenGrammar?: () => void;
}

interface DeconstructItem {
  id: string;
  word: string;
  transliteration: string;
  prefix?: string;
  root: string;
  rootMeaning: string;
  suffix: string;
  suffixType: string;
  combinedMeaning: string;
  sutra: string;
}

const DECONSTRUCT_SAMPLES: DeconstructItem[] = [
  {
    id: 'gatva',
    word: 'गत्वा',
    transliteration: 'gatvā',
    root: 'गम् (gam)',
    rootMeaning: 'to go (गतौ)',
    suffix: 'क्त्वा (ktvā)',
    suffixType: 'Absolutive Participle (पूर्वकालिकः)',
    combinedMeaning: 'Having gone / After going',
    sutra: 'समानकर्तृकयोः पूर्वकाले (Pāṇini 3.4.21)',
  },
  {
    id: 'pathitum',
    word: 'पठितुम्',
    transliteration: 'paṭhitum',
    root: 'पठ् (paṭh)',
    rootMeaning: 'to read / study (व्यक्तायां वाचि)',
    suffix: 'तुमुन् (tumun)',
    suffixType: 'Infinitive of Purpose (हेत्वर्थकः)',
    combinedMeaning: 'In order to read / To study',
    sutra: 'तुमुन्ण्वुलौ क्रियायां क्रियार्थायाम् (Pāṇini 3.3.10)',
  },
  {
    id: 'vihrtya',
    word: 'विहृत्य',
    transliteration: 'vihṛtya',
    prefix: 'वि- (vi- prefix)',
    root: 'हृ (hṛ)',
    rootMeaning: 'to wander / roam (हरति)',
    suffix: 'ल्यप् (lyap)',
    suffixType: 'Prefix + Absolutive (ल्यबादेशः)',
    combinedMeaning: 'Having wandered / Strolled about',
    sutra: 'समासेऽनञ्पूर्वे क्त्वो ल्यप् (Pāṇini 7.1.37)',
  },
  {
    id: 'bhavati',
    word: 'भवति',
    transliteration: 'bhavati',
    root: 'भू (bhū)',
    rootMeaning: 'to be / exist (सत्तायाम्)',
    suffix: 'लट् (शप् + तिप्)',
    suffixType: 'Present Tense (लट्-लकारः, प्रथमपुरुषः, एकवचनम्)',
    combinedMeaning: 'He / She / It becomes or exists',
    sutra: 'सार्वधातुकार्धधातुकयोः (Pāṇini 7.3.84: ओ ➔ अव्)',
  },
];

interface JodoPuzzleSample {
  id: string;
  prompt: string;
  meaning: string;
  tiles: string[];
  solvedWord: string;
  transliteration: string;
  icon: string;
}

const JODO_SAMPLES: JodoPuzzleSample[] = [
  {
    id: 'vidya',
    prompt: 'Snap the syllables to assemble the Sanskrit word for Knowledge:',
    meaning: 'Knowledge / True Wisdom (विद्या)',
    tiles: ['वि', 'द्या'],
    solvedWord: 'विद्या',
    transliteration: 'vidyā',
    icon: '🪷',
  },
  {
    id: 'pustakam',
    prompt: 'Build the Sanskrit word for Textbook / Book:',
    meaning: 'Book / Granthah (पुस्तकम्)',
    tiles: ['पु', 'स्त', 'कम्'],
    solvedWord: 'पुस्तकम्',
    transliteration: 'pustakam',
    icon: '📖',
  },
  {
    id: 'mitram',
    prompt: 'Build the word for Loyal Companion / Friend:',
    meaning: 'Friend / Companion (मित्रम्)',
    tiles: ['मि', 'त्रम्'],
    solvedWord: 'मित्रम्',
    transliteration: 'mitram',
    icon: '🤝',
  },
];

export const ToolInteractiveDemos: React.FC<ToolInteractiveDemosProps> = ({
  onOpenDhatupatha,
  onOpenBoard,
  onOpenGrammar,
}) => {
  const [activeTab, setActiveTab] = useState<'dhatupatha' | 'jodo' | 'videos'>('dhatupatha');
  
  // Dhātupāṭha Deconstructor State
  const [selectedWord, setSelectedWord] = useState<DeconstructItem>(DECONSTRUCT_SAMPLES[0]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Jodo Mini Game State
  const [currentJodoIdx, setCurrentJodoIdx] = useState(0);
  const [selectedTiles, setSelectedTiles] = useState<string[]>([]);
  const [jodoSolved, setJodoSolved] = useState(false);

  const currentJodo = JODO_SAMPLES[currentJodoIdx];

  const handlePlayWord = (text: string) => {
    setIsPlayingAudio(true);
    playPronunciation(text);
    setTimeout(() => setIsPlayingAudio(false), 1500);
  };

  const handleTileClick = (tile: string) => {
    if (jodoSolved) return;
    if (selectedTiles.includes(tile)) {
      setSelectedTiles(selectedTiles.filter((t) => t !== tile));
      return;
    }
    const next = [...selectedTiles, tile];
    setSelectedTiles(next);

    if (next.join('') === currentJodo.tiles.join('')) {
      setJodoSolved(true);
      playPronunciation(currentJodo.solvedWord);
    }
  };

  const handleNextJodo = () => {
    setSelectedTiles([]);
    setJodoSolved(false);
    setCurrentJodoIdx((prev) => (prev + 1) % JODO_SAMPLES.length);
  };

  return (
    <section className="tid-section" id="tool-demos" aria-label="Interactive Product Demonstrations">
      <div className="tid-header">
        <div className="tid-eyebrow">
          <span>🎬</span>
          <span>INTERACTIVE PRODUCT PREVIEWS</span>
        </div>
        <h2 className="tid-title">
          See the Tools in Action Before You Sign Up
        </h2>
        <p className="tid-subtitle">
          Don&apos;t just read about our technology—experience the Dhātupāṭha Reverse Word Deconstructor and Jodo Tile Studio directly in your browser:
        </p>

        {/* Studio Switcher Tabs */}
        <div className="tid-tabs" role="tablist" aria-label="Tool Demonstration Tabs">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'dhatupatha'}
            className={`tid-tab-btn${activeTab === 'dhatupatha' ? ' active' : ''}`}
            onClick={() => setActiveTab('dhatupatha')}
          >
            🌿 1. Dhātupāṭha Word Deconstructor
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'jodo'}
            className={`tid-tab-btn${activeTab === 'jodo' ? ' active' : ''}`}
            onClick={() => setActiveTab('jodo')}
          >
            🧩 2. Jodo 6,000+ Word Tile Puzzle
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'videos'}
            className={`tid-tab-btn${activeTab === 'videos' ? ' active' : ''}`}
            onClick={() => setActiveTab('videos')}
          >
            🎥 3. Video Demonstrations (30s)
          </button>
        </div>
      </div>

      {/* TAB 1: Dhātupāṭha Reverse Word Deconstructor Live Preview */}
      {activeTab === 'dhatupatha' && (
        <div className="tid-demo-box tid-demo-box--dhatupatha">
          <div className="tid-demo-controls">
            <span className="tid-control-label">Select a Sanskrit word to deconstruct:</span>
            <div className="tid-sample-pills">
              {DECONSTRUCT_SAMPLES.map((sample) => (
                <button
                  key={sample.id}
                  type="button"
                  className={`tid-sample-pill${selectedWord.id === sample.id ? ' active' : ''}`}
                  onClick={() => {
                    setSelectedWord(sample);
                    handlePlayWord(sample.word);
                  }}
                >
                  <span className="tsp-dev">{sample.word}</span>
                  <span className="tsp-iast">({sample.transliteration})</span>
                </button>
              ))}
            </div>
          </div>

          <div className="tid-flowchart-card">
            <div className="tid-fc-header">
              <div className="tid-fc-word-wrap">
                <span className="tid-fc-dev">{selectedWord.word}</span>
                <span className="tid-fc-iast">{selectedWord.transliteration}</span>
                <button
                  type="button"
                  className={`tid-fc-audio-btn${isPlayingAudio ? ' playing' : ''}`}
                  onClick={() => handlePlayWord(selectedWord.word)}
                  title="Hear authentic Sanskrit pronunciation"
                >
                  {isPlayingAudio ? '🔊 Playing...' : '🔊 Listen'}
                </button>
              </div>
              <span className="tid-fc-badge">Pāṇinian Derivation Flowchart</span>
            </div>

            {/* Visual Step-by-Step Flowchart */}
            <div className="tid-fc-diagram">
              {selectedWord.prefix && (
                <>
                  <div className="tid-fc-node tid-fc-node--prefix">
                    <span className="tid-fc-node-tag">Prefix (उपसर्गः)</span>
                    <strong className="tid-fc-node-val">{selectedWord.prefix}</strong>
                    <span className="tid-fc-node-sub">Directional modifier</span>
                  </div>
                  <span className="tid-fc-plus">+</span>
                </>
              )}

              <div className="tid-fc-node tid-fc-node--root">
                <span className="tid-fc-node-tag">Generative Root (धातुः)</span>
                <strong className="tid-fc-node-val">{selectedWord.root}</strong>
                <span className="tid-fc-node-sub">{selectedWord.rootMeaning}</span>
              </div>

              <span className="tid-fc-plus">+</span>

              <div className="tid-fc-node tid-fc-node--suffix">
                <span className="tid-fc-node-tag">Suffix (प्रत्ययः)</span>
                <strong className="tid-fc-node-val">{selectedWord.suffix}</strong>
                <span className="tid-fc-node-sub">{selectedWord.suffixType}</span>
              </div>

              <span className="tid-fc-arrow">➔</span>

              <div className="tid-fc-node tid-fc-node--result">
                <span className="tid-fc-node-tag">Final Word (पदम्)</span>
                <strong className="tid-fc-node-val">{selectedWord.word}</strong>
                <span className="tid-fc-node-meaning">"{selectedWord.combinedMeaning}"</span>
              </div>
            </div>

            <div className="tid-fc-sutra-footer">
              <span className="tid-sutra-icon">📜</span>
              <span><strong>Governing Pāṇinian Rule:</strong> {selectedWord.sutra}</span>
            </div>
          </div>

          <div className="tid-demo-footer">
            <span className="tid-footer-hint">✨ The full Dhātupāṭha Engine supports 2,000+ verb roots, 5 Lakāra matrices, and instant Kṛt/Taddhita derivations.</span>
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              {onOpenDhatupatha && (
                <button
                  type="button"
                  className="tid-action-btn tid-btn--emerald"
                  onClick={onOpenDhatupatha}
                >
                  Launch Dhātupāṭha Engine ➔
                </button>
              )}
              {onOpenGrammar && (
                <button
                  type="button"
                  className="tid-action-btn tid-btn--indigo"
                  onClick={onOpenGrammar}
                >
                  Explore Grammar Rules ➔
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Jodo Tile Studio Live Preview */}
      {activeTab === 'jodo' && (
        <div className="tid-demo-box tid-demo-box--jodo">
          <div className="tid-jodo-game-card">
            <div className="tid-jodo-header">
              <span className="tid-jodo-badge">30-Second Interactive Mini-Puzzle</span>
              <span className="tid-jodo-step">Puzzle {currentJodoIdx + 1} of {JODO_SAMPLES.length}</span>
            </div>

            <p className="tid-jodo-prompt">{currentJodo.prompt}</p>

            {/* Tile Assemble Zone */}
            <div className="tid-jodo-stage">
              <div className={`tid-jodo-slot${jodoSolved ? ' solved' : ''}`}>
                {selectedTiles.length === 0 ? (
                  <span className="tid-jodo-placeholder">Tap tiles below in correct order...</span>
                ) : (
                  <span className="tid-jodo-assembled">
                    {selectedTiles.join('')}
                  </span>
                )}
              </div>

              {jodoSolved && (
                <div className="tid-jodo-success-banner">
                  <span className="tjs-icon" aria-hidden="true">{currentJodo.icon}</span>
                  <div className="tjs-info">
                    <strong>उत्तमम्! Correct! {currentJodo.solvedWord} ({currentJodo.transliteration})</strong>
                    <span>Meaning: {currentJodo.meaning}</span>
                  </div>
                  <button type="button" className="tid-jodo-next-btn" onClick={handleNextJodo}>
                    Next Word ➔
                  </button>
                </div>
              )}
            </div>

            {/* Clickable Tiles */}
            <div className="tid-jodo-tiles-tray">
              {currentJodo.tiles.map((tile, i) => {
                const isSelected = selectedTiles.includes(tile);
                return (
                  <button
                    key={`${tile}-${i}`}
                    type="button"
                    className={`tid-jodo-tile${isSelected ? ' selected' : ''}`}
                    onClick={() => handleTileClick(tile)}
                    disabled={jodoSolved}
                  >
                    <span className="tjt-char">{tile}</span>
                    <span className="tjt-sub">Tap to add</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="tid-demo-footer">
            <span className="tid-footer-hint">🧩 Jodo Studio features 6,000+ word puzzles across 7 categories: Animals, Body, Culture, Grammar, Maths, Map &amp; Nature.</span>
            {onOpenBoard && (
              <button
                type="button"
                className="tid-action-btn tid-btn--amber"
                onClick={onOpenBoard}
              >
                Play All 6,000+ Words in Jodo Studio ➔
              </button>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: Video Demonstrations */}
      {activeTab === 'videos' && (
        <div className="tid-demo-box tid-demo-box--videos">
          <div className="tid-videos-grid">
            {/* Video 1: Science of Sound */}
            <div className="tid-video-card">
              <div className="tid-video-player-wrap">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/tkvYjNZSsZA?start=32&rel=0"
                  title="Sanskrit: The Science of Sound Masterclass"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="tid-iframe"
                />
              </div>
              <div className="tid-video-info">
                <span className="tid-video-tag">Phonetics Masterclass</span>
                <h4 className="tid-video-title">Sanskrit: The Science of Sound (ध्वनि-विज्ञानम्)</h4>
                <p className="tid-video-desc">
                  Explore the 5 vocal articulation points (Kaṇṭha to Oṣṭha), mouth biomechanics, and acoustic resonance of the Sanskrit Varṇamālā.
                </p>
              </div>
            </div>

            {/* Video 2: Vedic Math Single-Line Arithmetic */}
            <div className="tid-video-card">
              <div className="tid-video-player-wrap">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/bp9m53Tp6xg?rel=0"
                  title="Vedic Mathematics Mental Calculation Masterclass"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="tid-iframe"
                />
              </div>
              <div className="tid-video-info">
                <span className="tid-video-tag">Speed Math Demo</span>
                <h4 className="tid-video-title">16 Vedic Mathematics Sutras in Action</h4>
                <p className="tid-video-desc">
                  Watch how Ekādhikena Pūrveṇa and Ūrdhva-Tiryagbhyām calculate large multiplications and squares in a single written line.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ToolInteractiveDemos;
