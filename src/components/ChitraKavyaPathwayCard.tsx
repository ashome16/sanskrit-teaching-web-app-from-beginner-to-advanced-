import React, { useState } from 'react';
import { soundEffects } from '../utils/soundEffects';
import '../styles/chitra-kavya-card.css';

export interface ChitraKavyaPathwayCardProps {
  onOpenScienceLab?: (segment?: string) => void;
  onOpenGrammar?: () => void;
  onOpenCourse?: () => void;
}

interface TourStep {
  r: number;
  c: number;
  step: number;
  char: string;
}

const VERSE_929_GRID = [
  ['स्थि', 'रा', 'ग', 'सां', 'स', 'दा', 'रा', 'ध्या'],
  ['वि', 'ह', 'ता', 'क', 'त', 'ता', 'म', 'ता'],
  ['सत्', 'पा', 'दु', 'के', 'स', 'र', 'सा', 'मा'],
  ['र', 'ङ्ग', 'रा', 'ज', 'प', 'दं', 'न', 'य'],
];

// The first 8 moves forming the opening hemistich of Verse 930: "स्थिता समयराजत्पा..."
const TOUR_STEPS: TourStep[] = [
  { r: 0, c: 0, step: 1, char: 'स्थि' },
  { r: 1, c: 2, step: 2, char: 'ता' },
  { r: 2, c: 4, step: 3, char: 'स' },
  { r: 1, c: 6, step: 4, char: 'म' },
  { r: 3, c: 7, step: 5, char: 'य' },
  { r: 3, c: 1, step: 6, char: 'रा' },
  { r: 3, c: 3, step: 7, char: 'जत्' },
  { r: 2, c: 1, step: 8, char: 'पा' },
];

export const ChitraKavyaPathwayCard: React.FC<ChitraKavyaPathwayCardProps> = ({
  onOpenScienceLab,
}) => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeStep = TOUR_STEPS[currentStepIdx];

  const handleNextStep = () => {
    soundEffects.playPuzzleSnap();
    setCurrentStepIdx((prev) => (prev + 1) % TOUR_STEPS.length);
  };

  const handleReset = () => {
    soundEffects.playPuzzleSnap();
    setCurrentStepIdx(0);
  };

  const handleCellClick = (r: number, c: number) => {
    const matchIdx = TOUR_STEPS.findIndex((s) => s.r === r && s.c === c);
    if (matchIdx !== -1) {
      soundEffects.playSuccessDing();
      setCurrentStepIdx(matchIdx);
    } else {
      soundEffects.playPuzzleSnap();
    }
  };

  return (
    <>
      <div className="home-pathway-card home-pathway-card--chitrakavya" aria-label="Chitra-Kavya & The Knight's Tour">
        <div className="ck-card-layout">
          {/* Left Column: Information, Stepper & CTAs */}
          <div className="ck-card-left">
            <div>
              <div className="ck-badge-row">
                <span className="ck-badge-primary">
                  🎨 चित्र-काव्यम् · SANSKRIT PICTURE POETRY
                </span>
                <span className="ck-badge-secondary">
                  Ancient Geometry &amp; Word Puzzles
                </span>
              </div>

              <h3 className="ck-title">
                Chitra-Kavya: The Art of Visual Sanskrit Puzzles
              </h3>
              <p className="ck-sanskrit-sub">
                चित्र-काव्यम् · Verses Shaped into Sacred Geometry, Lotuses &amp; Puzzle Grids
              </p>
              <p className="ck-desc">
                In classical Sanskrit, poets arranged letters into geometric pictures—sculpting words into blooming lotuses (पद्म), temple wheels (चक्र), and interlocking puzzle grids. Reading along these geometric paths unlocks hidden prayers, like the famous 14th-century &ldquo;Knight&rsquo;s Move&rdquo; puzzle below, where following a chess knight&rsquo;s path through <strong>Verse 929</strong> reveals the secret <strong>Verse 930</strong>!
              </p>

              {/* Interactive Move Stepper */}
              <div className="ck-stepper-box">
                <div className="ck-stepper-header">
                  <span className="ck-stepper-label">
                    ♞ Move {activeStep.step} of 8: Jump to [{activeStep.char}]
                  </span>
                  <div className="ck-stepper-controls">
                    <button
                      type="button"
                      className="ck-stepper-btn"
                      onClick={handleReset}
                      title="Reset to step 1"
                    >
                      ↺ Reset
                    </button>
                    <button
                      type="button"
                      className="ck-stepper-btn"
                      onClick={handleNextStep}
                      title="Advance to next knight jump"
                    >
                      Next Jump ➔
                    </button>
                  </div>
                </div>

                <div className="ck-trail-text">
                  <span>Decoded: </span>
                  {TOUR_STEPS.map((s, idx) => {
                    const isPassed = idx <= currentStepIdx;
                    const isCurrent = idx === currentStepIdx;
                    return (
                      <span
                        key={idx}
                        className={`ck-trail-chip ${isCurrent ? 'current' : ''}`}
                        style={{ opacity: isPassed ? 1 : 0.35 }}
                      >
                        {s.char}
                      </span>
                    );
                  })}
                  <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
                    ➔ &ldquo;स्थिता समयराजत्पा...&rdquo;
                  </span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="ck-cta-row">
              <button
                type="button"
                className="ck-btn-primary"
                onClick={() => {
                  soundEffects.playSuccessDing();
                  if (onOpenScienceLab) {
                    onOpenScienceLab('chandahshastra');
                  }
                }}
                title="Open the interactive Chitra-Kavya & Chandas Lab in Vijñāna Lab"
              >
                🎮 Play Chitra-Kavya in Vijñāna Lab ▶
              </button>

              <button
                type="button"
                className="ck-btn-secondary"
                onClick={() => setIsModalOpen(true)}
                title="View full verse breakdown, Sanskrit meaning, and historical analysis"
              >
                📜 Learn How Chitra-Kavya Works
              </button>
            </div>
          </div>

          {/* Right Column: 4x8 Mini Chessboard & Reference Painting */}
          <div className="ck-card-right">
            <div className="ck-right-header">
              <span className="ck-right-caption">
                Verse 929 Syllable Grid
              </span>
              <span className="ck-right-badge">
                32 Syllables · Visual Matrix
              </span>
            </div>

            {/* 4x8 Interactive Grid */}
            <div className="ck-chessboard" role="grid" aria-label="Verse 929 Syllable Grid">
              {VERSE_929_GRID.map((row, r) =>
                row.map((char, c) => {
                  const isLight = (r + c) % 2 === 0;
                  const stepMatch = TOUR_STEPS.find((s) => s.r === r && s.c === c);
                  const isCurrent = activeStep.r === r && activeStep.c === c;
                  const isVisited = stepMatch && stepMatch.step <= activeStep.step;

                  let cellClass = `ck-cell ${isLight ? 'light' : 'dark'}`;
                  if (isCurrent) cellClass += ' active-step';
                  else if (isVisited) cellClass += ' visited-step';

                  return (
                    <div
                      key={`${r}-${c}`}
                      className={cellClass}
                      onClick={() => handleCellClick(r, c)}
                      title={`Row ${r + 1}, Col ${c + 1}: ${char}${stepMatch ? ` (Knight Step #${stepMatch.step})` : ''}`}
                    >
                      <span className="ck-cell-char">{char}</span>
                      {stepMatch && (
                        <span className="ck-cell-step">
                          {isCurrent ? '♞' : `#${stepMatch.step}`}
                        </span>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            <div className="ck-board-footer">
              <span>Tap squares to follow the path</span>
              <span>Verse 929 ➔ Reveals Verse 930</span>
            </div>

            {/* Reference Thumbnail Row */}
            <div className="ck-ref-row">
              <img
                src="/images/chitra-kavya-knight-tour.jpg"
                alt="Kangra Pahari miniature depicting Indian Gurukul scholar studying Chitra-kavya on palm leaf"
                className="ck-ref-thumb"
                onClick={() => setIsModalOpen(true)}
                title="Click to expand reference Kangra miniature artwork"
              />
              <div className="ck-ref-info">
                <strong>Classical Pahari-Kangra Miniature</strong>
                Ancient Gurukul scholar deciphering the 32-syllable Turanga matrix under sacred banyan tree.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Deep-Dive Breakdown */}
      {isModalOpen && (
        <div
          className="pvs-modal-backdrop"
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="pvs-modal-inner"
            style={{ maxWidth: '680px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="pvs-modal-close"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close modal"
            >
              ✕
            </button>

            <div>
              <span className="pvs-eyebrow" style={{ marginBottom: '0.35rem' }}>
                चित्र-काव्यम् · SANSKRIT PICTURE POETRY
              </span>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#2b2118', margin: '0 0 0.35rem' }}>
                Chitra-Kavya: Sacred Geometry in Sanskrit Poetry
              </h3>
              <p style={{ fontSize: '0.84rem', color: '#64748b', margin: 0 }}>
                Solving visual, spatial, and combinatorial puzzles with Sanskrit verses (c. 9th–14th Century).
              </p>
            </div>

            <img
              src="/images/chitra-kavya-knight-tour.jpg"
              alt="Pahari Miniature of Chitra-kavya Gurukul Scholar"
              className="pvs-modal-img"
            />

            {/* Introductory Explanation of Chitra-Kavya */}
            <div style={{ background: '#fdfbf7', border: '1px solid #ebdcc5', borderRadius: '12px', padding: '1.15rem' }}>
              <h4 style={{ margin: '0 0 0.5rem', color: '#78350f', fontSize: '1rem', fontWeight: 800 }}>
                🎨 What is Chitra-Kavya? (चित्र-काव्यम्)
              </h4>
              <p style={{ fontSize: '0.84rem', color: '#475569', lineHeight: 1.55, margin: '0 0 0.85rem' }}>
                In classical Sanskrit literature, <strong>Chitra-Kavya</strong> (literally &ldquo;picture poetry&rdquo;) is an art form where verses are deliberately constrained to form intricate visual shapes called <em>Bandhas</em>. Instead of merely writing lines, the syllables overlap at precise coordinates to form dual meanings, geometrical emblems, and mathematical puzzles:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.65rem' }}>
                  <strong style={{ fontSize: '0.8rem', color: '#b45309' }}>🪷 Padma-bandha (Lotus):</strong>
                  <p style={{ fontSize: '0.74rem', color: '#64748b', margin: '0.2rem 0 0', lineHeight: 1.35 }}>
                    Verses bloom across petals, connecting to an anchor syllable at the flower&rsquo;s central hub.
                  </p>
                </div>
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.65rem' }}>
                  <strong style={{ fontSize: '0.8rem', color: '#b45309' }}>🎡 Chakra-bandha (Wheel):</strong>
                  <p style={{ fontSize: '0.74rem', color: '#64748b', margin: '0.2rem 0 0', lineHeight: 1.35 }}>
                    Syllables radiate outward as chariot spokes, encoding the author&rsquo;s hidden signature along the rim.
                  </p>
                </div>
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.65rem' }}>
                  <strong style={{ fontSize: '0.8rem', color: '#b45309' }}>🥁 Muraja-bandha (Drum):</strong>
                  <p style={{ fontSize: '0.74rem', color: '#64748b', margin: '0.2rem 0 0', lineHeight: 1.35 }}>
                    Verses criss-cross diagonally like the tightening leather cords of a traditional mridangam drum.
                  </p>
                </div>
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.65rem' }}>
                  <strong style={{ fontSize: '0.8rem', color: '#b45309' }}>♟️ Turanga-bandha (Knight):</strong>
                  <p style={{ fontSize: '0.74rem', color: '#64748b', margin: '0.2rem 0 0', lineHeight: 1.35 }}>
                    The pinnacle of matrix poetry: letters visited by chess knight jumps spell a completely new verse!
                  </p>
                </div>
              </div>
            </div>

            <div style={{ background: '#fdf8ee', border: '1px solid #ebdcc5', borderRadius: '10px', padding: '1rem' }}>
              <h4 style={{ margin: '0 0 0.4rem', color: '#78350f', fontSize: '0.92rem' }}>
                Featured Example: Verse 929 (Read Straight Across):
              </h4>
              <p style={{ fontFamily: "'Noto Sans Devanagari', serif", fontWeight: 700, margin: '0 0 0.35rem', color: '#1e293b' }}>
                स्थिरागसां सदाराध्या विहताकततामता ।<br />
                सत्पादुके सरसा मा रङ्गराजपदं नय ॥ ९२९ ॥
              </p>
              <p style={{ fontSize: '0.8rem', color: '#574636', margin: 0, lineHeight: 1.45 }}>
                <em>&ldquo;O Divine Padukas! Adored even by those who have committed deep-rooted sins, destroying grief and obstacles, producing a melodious sound—please lead me safely to the lotus feet of Lord Ranganatha.&rdquo;</em>
              </p>
            </div>

            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '1rem' }}>
              <h4 style={{ margin: '0 0 0.4rem', color: '#166534', fontSize: '0.92rem' }}>
                Hidden Verse 930 (Unlocked by Knight&rsquo;s L-Shaped Jumps):
              </h4>
              <p style={{ fontFamily: "'Noto Sans Devanagari', serif", fontWeight: 700, margin: '0 0 0.35rem', color: '#14532d' }}>
                स्थिता समयराजत्पा गतरामादके गवि ।<br />
                दुरंहसां सन्नतादा साध्या तापकरासरा ॥ ९३० ॥
              </p>
              <p style={{ fontSize: '0.8rem', color: '#166534', margin: 0, lineHeight: 1.45 }}>
                <em>&ldquo;Stationed firmly in the realm of righteousness, protecting the spiritual rays radiating from divine wisdom; sheltering those burdened by worldly sins, you readily quench the searing afflictions of life.&rdquo;</em>
              </p>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.85rem' }}>
              <p style={{ fontSize: '0.8rem', color: '#334155', margin: 0, lineHeight: 1.45 }}>
                <strong>Donald Knuth (The Art of Computer Programming, Vol. 4B):</strong><br />
                <em>&ldquo;The first known examples of the Knight&rsquo;s Tour occur in early Indian works on poetics... Vedānta Deśika composed a famous verse in his Pāduka-Sahasram where an entire second verse emerges from a knight&rsquo;s tour on the first.&rdquo;</em>
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.65rem' }}>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '999px',
                  border: '1px solid #cbd5e1',
                  background: '#f8fafc',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                }}
              >
                Close
              </button>
              {onOpenScienceLab && (
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    onOpenScienceLab('chandahshastra');
                  }}
                  className="ck-btn-primary"
                  style={{ padding: '0.5rem 1.15rem', fontSize: '0.85rem' }}
                >
                  Open in Vijñāna Lab ➔
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChitraKavyaPathwayCard;
