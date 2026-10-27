import React, { useState, useMemo } from 'react';
import {
  MATRIX_ROOTS,
  MATRIX_PUZZLE_CHALLENGES,
  type MatrixRootItem,
  type VerbConjugationBlock,
} from '../data/dhatupathaMatrixData';
import { playPronunciation, stopPronunciation } from '../utils/pronunciation';
import { soundEffects } from '../utils/soundEffects';
import '../styles/dhatupatha-matrix.css';

interface DhatupathaMatrixConnectorProps {
  onSelectWord?: (word: string) => void;
  onGoHome?: () => void;
}

type MatrixMode = 'forge' | 'challenge';
type PersonKey = 'prathama' | 'madhyama' | 'uttama';
type NumberKey = 'singular' | 'dual' | 'plural';

export const DhatupathaMatrixConnector: React.FC<DhatupathaMatrixConnectorProps> = ({
  onSelectWord,
}) => {
  const [mode, setMode] = useState<MatrixMode>('challenge'); // Start with challenge puzzle arena as requested!

  // Forge Mode State
  const [selectedRootId, setSelectedRootId] = useState<string>('garj');
  const [person, setPerson] = useState<PersonKey>('prathama');
  const [selectedNumber, setSelectedNumber] = useState<NumberKey>('singular');

  // Challenge Mode State (20 fresh items)
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [selectedAffix, setSelectedAffix] = useState<string | null>(null);
  const [challengeResult, setChallengeResult] = useState<'correct' | 'wrong' | null>(null);
  const [showHint, setShowHint] = useState(false);

  // Active Root Item in Forge
  const activeRoot: MatrixRootItem = useMemo(() => {
    return MATRIX_ROOTS.find((r) => r.id === selectedRootId) || MATRIX_ROOTS[0];
  }, [selectedRootId]);

  // Current Conjugation Block in Forge
  const activeConjugation: VerbConjugationBlock = useMemo(() => {
    return activeRoot[person][selectedNumber];
  }, [activeRoot, person, selectedNumber]);

  // Handle Root Selection
  const handleSelectRoot = (rootId: string) => {
    setSelectedRootId(rootId);
    soundEffects.playPuzzleSnap();
  };

  // Handle Number Terminal Click
  const handleSelectNumber = (num: NumberKey) => {
    setSelectedNumber(num);
    soundEffects.playPuzzleSnap();
    const targetBlock = activeRoot[person][num];
    playPronunciation(targetBlock.sentence);
    if (onSelectWord) {
      onSelectWord(targetBlock.form);
    }
  };

  // Play spoken verb audio
  const handleSpeakVerb = (text: string) => {
    stopPronunciation();
    playPronunciation(text);
  };

  // ===================================================================
  // CHALLENGE MODE LOGIC (20 Fresh Diverse Roots)
  // ===================================================================
  const currentChallenge = MATRIX_PUZZLE_CHALLENGES[challengeIndex % MATRIX_PUZZLE_CHALLENGES.length];
  const challengeRoot = useMemo(() => {
    return MATRIX_ROOTS.find((r) => r.id === currentChallenge.rootId) || MATRIX_ROOTS[0];
  }, [currentChallenge.rootId]);

  const handlePickOption = (opt: { number: NumberKey; affix: string; sentence: string }) => {
    setSelectedAffix(opt.affix);
    soundEffects.playPuzzleSnap();

    if (opt.number === currentChallenge.targetNumber) {
      soundEffects.playSuccessDing();
      setChallengeResult('correct');
      setScore((s) => s + 100);
      setStreak((st) => st + 1);
      playPronunciation(currentChallenge.targetSentence);
      if (onSelectWord) {
        onSelectWord(currentChallenge.targetForm);
      }
    } else {
      soundEffects.playErrorBuzzer();
      setChallengeResult('wrong');
      setStreak(0);
    }
  };

  const handleNextChallenge = () => {
    setSelectedAffix(null);
    setChallengeResult(null);
    setShowHint(false);
    setChallengeIndex((prev) => (prev + 1) % MATRIX_PUZZLE_CHALLENGES.length);
  };

  return (
    <div className="dhatupatha-matrix-connector" id="dhatupatha-matrix">
      {/* Module Eyebrow & Title */}
      <header className="dmc-header">
        <div className="dmc-eyebrow">
          <span className="dmc-badge">PEDAGOGICAL DIVERSITY · 20 VERB DRILLS</span>
          <span className="dmc-tag">धातु-प्रत्यय योजकः · Dhatupatha Matrix</span>
        </div>
        <h2 className="dmc-title">The "Dhatupatha Matrix" Connector</h2>
        <p className="dmc-subtitle">
          Master diverse roots beyond the basics (गर्ज्, तप्, वर्ष्, मुष्, जृ, रक्ष्, रुह्, वद्, तॄ, कुप्, भष्, त्रस्, क्षल्, ज्वल्, यज्, याच्, त्यज्, अर्च्, लभ्) connecting base roots with singular (-ति / -ते), dual (-तः / -एते), and plural (-न्ति / -न्ते) terminal blocks dynamically.
        </p>

        {/* Mode Switcher */}
        <div className="dmc-mode-switcher" role="tablist" aria-label="Matrix Connector Modes">
          <button
            type="button"
            className={`dmc-mode-btn ${mode === 'challenge' ? 'active' : ''}`}
            onClick={() => {
              setMode('challenge');
              soundEffects.playPuzzleSnap();
            }}
          >
            <span>🧩</span>
            <span>20-Challenge Puzzle Arena</span>
          </button>
          <button
            type="button"
            className={`dmc-mode-btn ${mode === 'forge' ? 'active' : ''}`}
            onClick={() => {
              setMode('forge');
              soundEffects.playPuzzleSnap();
            }}
          >
            <span>⚡</span>
            <span>Modular Free-Forge Lab</span>
          </button>
        </div>
      </header>

      {/* ===================================================================
          MODE 1: 20-CHALLENGE PUZZLE ARENA (संयोजन-स्पर्धा)
          =================================================================== */}
      {mode === 'challenge' && (
        <section className="dmc-challenge-pod" aria-label="Puzzle Challenge Arena">
          {/* Top Bar with Score & Streak */}
          <div className="dmc-challenge-topbar">
            <div>
              <span className="dmc-badge" style={{ borderColor: '#f59e0b', color: '#f59e0b' }}>
                PUZZLE {challengeIndex + 1} OF {MATRIX_PUZZLE_CHALLENGES.length}
              </span>
            </div>
            <div className="dmc-challenge-stats">
              <span className="dmc-stat-pill dmc-stat-score">⭐ Score: {score}</span>
              <span className="dmc-stat-pill dmc-stat-streak">🔥 Streak: {streak}</span>
            </div>
          </div>

          {/* Mission Description */}
          <div className="dmc-challenge-mission">
            <h3 className="dmc-mission-title">{currentChallenge.title}</h3>
            <p className="dmc-mission-prompt">{currentChallenge.prompt}</p>
            <div className="dmc-mission-subject">
              {currentChallenge.meaning}
            </div>
          </div>

          {/* Snap Arena */}
          <div className="dmc-snap-arena">
            {/* Subject & Root */}
            <div className="dmc-snap-slot filled" title="Subject + Root">
              <span>{challengeRoot.subjectNoun.split(' ')[0]}</span>
            </div>
            <span style={{ fontSize: '1.5rem', color: '#94a3b8' }}>+</span>
            <div className="dmc-snap-slot filled" style={{ color: '#38bdf8', borderColor: '#38bdf8' }} title="Base Dhātu">
              <span>{challengeRoot.root}</span>
            </div>
            <span style={{ fontSize: '1.5rem', color: '#94a3b8' }}>+</span>
            {/* Terminal Block Slot */}
            <div className={`dmc-snap-slot ${selectedAffix ? 'filled' : ''}`} title="Terminal Block">
              <span>{selectedAffix || '? (प्रत्यय-खण्डः)'}</span>
            </div>
            <span style={{ fontSize: '1.5rem', color: '#94a3b8' }}>=</span>
            {/* Target Output */}
            <div className="dmc-snap-slot filled" style={{ borderColor: '#2dd4bf', color: '#2dd4bf', minWidth: '180px' }} title="Resulting Sentence">
              <span>{challengeResult === 'correct' ? currentChallenge.targetSentence : '...'}</span>
            </div>
          </div>

          {/* 3 Candidate Terminal Blocks: Singular, Dual, Plural */}
          <div style={{ textAlign: 'center', marginBottom: '0.75rem', color: '#94a3b8', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Choose the Matching Number Terminal Block:
          </div>
          <div className="dmc-snap-candidate-options">
            {currentChallenge.options.map((opt) => (
              <button
                type="button"
                key={opt.number}
                className={`dmc-candidate-btn ${selectedAffix === opt.affix ? 'selected' : ''}`}
                onClick={() => handlePickOption(opt)}
              >
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                  {opt.number === 'singular' ? '१. एकवचनम्' : opt.number === 'dual' ? '२. द्विवचनम्' : '३. बहुवचनम्'} ({opt.affix})
                </div>
                <div>{opt.sentence}</div>
              </button>
            ))}
          </div>

          {/* Feedback Display */}
          {challengeResult === 'correct' && (
            <div className="dmc-feedback-banner dmc-feedback-success">
              <div>
                <strong>🎉 साधु! Perfect Match!</strong>
                <p style={{ margin: '0.3rem 0 0', fontSize: '0.9rem' }}>{currentChallenge.explanation}</p>
              </div>
              <button
                type="button"
                className="dmc-action-btn-primary"
                onClick={handleNextChallenge}
              >
                Next Puzzle #{((challengeIndex + 1) % MATRIX_PUZZLE_CHALLENGES.length) + 1} ➜
              </button>
            </div>
          )}

          {challengeResult === 'wrong' && (
            <div className="dmc-feedback-banner dmc-feedback-error">
              <div>
                <strong>❌ Not quite matching the target number/person!</strong>
                <p style={{ margin: '0.3rem 0 0', fontSize: '0.9rem' }}>
                  {showHint ? currentChallenge.hint : 'Check the subject concord (Singular, Dual, or Plural) carefully.'}
                </p>
              </div>
              <button
                type="button"
                className="dmc-pill-btn"
                style={{ background: 'rgba(255,255,255,0.1)', color: '#ffffff' }}
                onClick={() => setShowHint(true)}
              >
                💡 Reveal Clue
              </button>
            </div>
          )}
        </section>
      )}

      {/* ===================================================================
          MODE 2: DYNAMIC CONNECTOR FORGE (स्वतन्त्र-संयोजनम्)
          =================================================================== */}
      {mode === 'forge' && (
        <section aria-label="Dynamic Verb Forge">
          {/* Controls Bar */}
          <div className="dmc-controls-bar">
            <div className="dmc-person-toggle">
              <span className="dmc-label">पुरुषः (Person):</span>
              <div className="dmc-pill-group">
                <button
                  type="button"
                  className={`dmc-pill-btn ${person === 'prathama' ? 'active' : ''}`}
                  onClick={() => {
                    setPerson('prathama');
                    soundEffects.playPuzzleSnap();
                  }}
                >
                  प्रथमपुरुषः (3rd)
                </button>
                <button
                  type="button"
                  className={`dmc-pill-btn ${person === 'madhyama' ? 'active' : ''}`}
                  onClick={() => {
                    setPerson('madhyama');
                    soundEffects.playPuzzleSnap();
                  }}
                >
                  मध्यमपुरुषः (2nd)
                </button>
                <button
                  type="button"
                  className={`dmc-pill-btn ${person === 'uttama' ? 'active' : ''}`}
                  onClick={() => {
                    setPerson('uttama');
                    soundEffects.playPuzzleSnap();
                  }}
                >
                  उत्तमपुरुषः (1st)
                </button>
              </div>
            </div>

            <div className="dmc-person-toggle">
              <span className="dmc-label">पदम् (Padam):</span>
              <span className="dmc-meta-chip" style={{ color: '#2dd4bf' }}>
                {activeRoot.padam}
              </span>
            </div>
          </div>

          {/* Dynamic Connector Arena */}
          <div className="dmc-connector-arena">
            {/* Left Station: Base Root Dock */}
            <div className="dmc-station-card">
              <div className="dmc-station-header">
                <span className="dmc-station-title">
                  <span className="dmc-socket-pin" aria-hidden="true" />
                  <span>धातु-कोष्ठः (Root Dock)</span>
                </span>
                <span className="dmc-meta-chip">{activeRoot.gana}</span>
              </div>

              <div className="dmc-root-display">
                <div className="dmc-root-symbol">{activeRoot.root}</div>
                <div className="dmc-root-translit">{activeRoot.baseTranslit}</div>
                <div className="dmc-root-meaning">{activeRoot.meaning}</div>
              </div>

              <div className="dmc-root-meta-chips">
                <span className="dmc-meta-chip">Stem: {activeRoot.stem}</span>
                <span className="dmc-meta-chip">Gana #{activeRoot.ganaNumber}</span>
                <span className="dmc-meta-chip">{activeRoot.subjectNoun}</span>
              </div>
            </div>

            {/* Middle: Energy Cable Conduit & Vikarana */}
            <div className="dmc-bus-conduit" aria-hidden="true">
              <div className="dmc-conduit-cable" />
              <div className="dmc-vikaran-badge">
                <span>⚡ + {activeRoot.vikaran} (विकरणम्)</span>
              </div>
              <div className="dmc-conduit-cable" />
            </div>

            {/* Right Station: Terminal Blocks (एक / द्वि / बहु) */}
            <div className="dmc-terminals-station">
              {/* Singular Terminal Block */}
              <button
                type="button"
                className={`dmc-terminal-block ${selectedNumber === 'singular' ? 'active' : ''}`}
                onClick={() => handleSelectNumber('singular')}
              >
                <div className="dmc-tb-left">
                  <span className="dmc-tb-name">एकवचनम् (Singular)</span>
                  <span className="dmc-tb-affix">{activeRoot[person].singular.affix}</span>
                  <span className="dmc-tb-pronoun">{activeRoot[person].singular.sentence}</span>
                </div>
                <div className="dmc-tb-indicator">
                  {selectedNumber === 'singular' && '✓'}
                </div>
              </button>

              {/* Dual Terminal Block */}
              <button
                type="button"
                className={`dmc-terminal-block ${selectedNumber === 'dual' ? 'active' : ''}`}
                onClick={() => handleSelectNumber('dual')}
              >
                <div className="dmc-tb-left">
                  <span className="dmc-tb-name">द्विवचनम् (Dual)</span>
                  <span className="dmc-tb-affix">{activeRoot[person].dual.affix}</span>
                  <span className="dmc-tb-pronoun">{activeRoot[person].dual.sentence}</span>
                </div>
                <div className="dmc-tb-indicator">
                  {selectedNumber === 'dual' && '✓'}
                </div>
              </button>

              {/* Plural Terminal Block */}
              <button
                type="button"
                className={`dmc-terminal-block ${selectedNumber === 'plural' ? 'active' : ''}`}
                onClick={() => handleSelectNumber('plural')}
              >
                <div className="dmc-tb-left">
                  <span className="dmc-tb-name">बहुवचनम् (Plural)</span>
                  <span className="dmc-tb-affix">{activeRoot[person].plural.affix}</span>
                  <span className="dmc-tb-pronoun">{activeRoot[person].plural.sentence}</span>
                </div>
                <div className="dmc-tb-indicator">
                  {selectedNumber === 'plural' && '✓'}
                </div>
              </button>
            </div>
          </div>

          {/* Fused Output Pod */}
          <div className="dmc-output-pod">
            <div className="dmc-output-header">
              <span className="dmc-output-tag">अभिनव-क्रियापदम् · Dynamically Forged Output</span>
              <button
                type="button"
                className="dmc-audio-btn"
                onClick={() => handleSpeakVerb(activeConjugation.sentence)}
                title="Hear Spoken Audio"
              >
                <span>🔊</span>
                <span>Listen ({activeConjugation.sentence})</span>
              </button>
            </div>

            {/* Fusion Formula */}
            <div className="dmc-fusion-formula">
              <span className="dmc-f-block dmc-f-root">{activeRoot.root} (धातु)</span>
              <span className="dmc-f-plus">+</span>
              <span className="dmc-f-block dmc-f-vikaran">{activeRoot.vikaran} (विकरण)</span>
              <span className="dmc-f-plus">+</span>
              <span className="dmc-f-block dmc-f-affix">{activeConjugation.affix} (प्रत्यय)</span>
              <span className="dmc-f-arrow">➜</span>
              <span className="dmc-f-block dmc-f-result">{activeConjugation.form}</span>
            </div>

            <div className="dmc-result-meta">
              <span className="dmc-meta-chip">Transliteration: {activeConjugation.translit}</span>
              <span className="dmc-meta-chip">Action: {activeConjugation.meaning}</span>
              <span className="dmc-meta-chip">Padam: {activeRoot.padam}</span>
            </div>

            {/* Example In Context */}
            <div className="dmc-context-sentence">
              <div>
                <div className="dmc-cs-sanskrit">{activeConjugation.sentence}।</div>
                <div className="dmc-cs-translit">{activeConjugation.translit}</div>
                <div className="dmc-cs-english">{activeRoot.englishAction}</div>
              </div>
              <button
                type="button"
                className="dmc-audio-btn"
                onClick={() => handleSpeakVerb(activeConjugation.sentence)}
              >
                <span>🔊</span>
                <span>Speak Sentence</span>
              </button>
            </div>

            {/* 3-Number Side-by-side Paradigm Strip */}
            <div className="dmc-paradigm-strip">
              <div
                className={`dmc-ps-col ${selectedNumber === 'singular' ? 'current' : ''}`}
                onClick={() => handleSelectNumber('singular')}
              >
                <div className="dmc-ps-title">१. एकवचनम् ({activeRoot[person].singular.affix})</div>
                <div className="dmc-ps-form">{activeRoot[person].singular.sentence}</div>
                <div className="dmc-ps-meaning">{activeRoot[person].singular.form}</div>
              </div>

              <div
                className={`dmc-ps-col ${selectedNumber === 'dual' ? 'current' : ''}`}
                onClick={() => handleSelectNumber('dual')}
              >
                <div className="dmc-ps-title">२. द्विवचनम् ({activeRoot[person].dual.affix})</div>
                <div className="dmc-ps-form">{activeRoot[person].dual.sentence}</div>
                <div className="dmc-ps-meaning">{activeRoot[person].dual.form}</div>
              </div>

              <div
                className={`dmc-ps-col ${selectedNumber === 'plural' ? 'current' : ''}`}
                onClick={() => handleSelectNumber('plural')}
              >
                <div className="dmc-ps-title">३. बहुवचनम् ({activeRoot[person].plural.affix})</div>
                <div className="dmc-ps-form">{activeRoot[person].plural.sentence}</div>
                <div className="dmc-ps-meaning">{activeRoot[person].plural.form}</div>
              </div>
            </div>
          </div>

          {/* Root Bank Grid */}
          <div className="dmc-root-bank">
            <div className="dmc-rb-header">
              <span>🌿 Select Root from Diverse Dhatupatha Bank (२० धातवः)</span>
            </div>
            <div className="dmc-roots-grid">
              {MATRIX_ROOTS.map((r) => (
                <button
                  type="button"
                  key={r.id}
                  className={`dmc-root-chip ${r.id === selectedRootId ? 'active' : ''}`}
                  onClick={() => handleSelectRoot(r.id)}
                >
                  <div className="dmc-rc-devanagari">{r.root}</div>
                  <div className="dmc-rc-english">{r.englishAction}</div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
