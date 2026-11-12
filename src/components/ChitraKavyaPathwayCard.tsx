import React, { useState } from 'react';
import { soundEffects } from '../utils/soundEffects';
import '../styles/chitra-kavya-card.css';
import { DESIKA_MATRIX, TOUR_POSITIONS, isKnightJump, ChitraVerseDiagram } from './TurangaBandhaChessboard';

export interface ChitraKavyaPathwayCardProps {
  onOpenScienceLab?: (segment?: string) => void;
  onOpenTurangaBandha?: () => void;
  onOpenGrammar?: () => void;
  onOpenCourse?: () => void;
}

const VERSE_929_GRID = [
  ['स्थि', 'रा', 'ग', 'सां', 'स', 'दा', 'रा', 'ध्या'],
  ['वि', 'ह', 'ता', 'क', 'त', 'ता', 'म', 'ता'],
  ['सत्', 'पा', 'दु', 'के', 'स', 'र', 'सा', 'मा'],
  ['र', 'ङ्ग', 'रा', 'ज', 'प', 'दं', 'न', 'य'],
];

// First 8 jumps of Deśika's tour → opening quarter of Verse 930: "स्थिता समयराजत्पा"
const MINI_GOAL = 8;
const DECODED_8 = ['स्थि', 'ता', 'स', 'म', 'य', 'रा', 'जत्', 'पा'];

export const ChitraKavyaPathwayCard: React.FC<ChitraKavyaPathwayCardProps> = ({
  onOpenTurangaBandha,
}) => {
  const [collected, setCollected] = useState(1); // horse starts on square 1 (स्थि)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean | null; text: string }>({ ok: null, text: 'Tap where the horse ♞ jumps next (look for the dotted squares).' });
  const [misses, setMisses] = useState(0);
  const won = collected >= MINI_GOAL;
  const here = TOUR_POSITIONS[collected - 1];
  const target = TOUR_POSITIONS[collected];

  const handleReset = () => {
    soundEffects.playPuzzleSnap();
    setCollected(1);
    setMisses(0);
    setMsg({ ok: null, text: 'Tap where the horse ♞ jumps next (look for the dotted squares).' });
  };

  const handleCellClick = (r: number, c: number) => {
    if (won) return;
    if (r === target.row && c === target.col) {
      soundEffects.playSuccessDing();
      const n = collected + 1;
      setCollected(n);
      setMisses(0);
      setMsg({ ok: true, text: n >= MINI_GOAL ? '🎉 You did it!' : `✅ Yes! You got “${DECODED_8[n - 1]}”. Find the next jump!` });
    } else {
      soundEffects.playPuzzleSnap();
      setMisses((m) => m + 1);
      setMsg({
        ok: false,
        text: isKnightJump(here, { row: r, col: c })
          ? '🤏 Good L-jump, but the poet’s horse went to another dotted square. Try again!'
          : '❌ The horse only jumps in an L: 2 squares, then 1 sideways.',
      });
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
                Two Poems in One: The Horse Puzzle (Chitra-Kāvya)
              </h3>
              <p className="ck-sanskrit-sub">
                तुरङ्गबन्धः · Read the rows → Verse 929 · Follow the horse ♞ → Verse 930
              </p>
              <p className="ck-desc">
                <strong>For kids:</strong> Long ago, Sanskrit poets hid a <em>second poem</em> inside a first one. Put the letters on a chessboard, let the chess horse jump in L-shapes, and the letters it lands on make a new poem! Can you follow the horse?
              </p>
              <p className="ck-desc" style={{ fontSize: '0.8rem', opacity: 0.85 }}>
                Same letters, new verse: hop the horse&rsquo;s L-jump through <strong>Verse 929</strong> to read <strong>Verse 930</strong> (वही अक्षर · अश्व की L-चाल · <strong>श्लोक ९२९ → ९३०</strong>).
              </p>

              <div className="ck-stepper-box">
                <div className="ck-stepper-header">
                  <span className="ck-stepper-label">
                    🎯 Goal: help the horse make {MINI_GOAL - 1} jumps · {collected} / {MINI_GOAL} syllables
                  </span>
                  <div className="ck-stepper-controls">
                    <button type="button" className="ck-stepper-btn" onClick={handleReset} title="Start over">↺ Start over</button>
                  </div>
                </div>
                <p className={`ck-feedback ${msg.ok === true ? 'ok' : msg.ok === false ? 'bad' : ''}`} aria-live="polite">
                  {won ? '🎉 विजयः! You decoded “स्थिता समयराजत्पा” — the first line of a hidden poem! Play the full game to find all 32.' : msg.text}
                  {!won && misses >= 2 && ' 💡 Hint: the yellow square.'}
                </p>
                <p style={{ fontSize: '0.82rem', margin: '0.4rem 0', color: '#475569' }}>
                  📖 <strong>The board (Verse 929) means:</strong> “O holy Sandals, please take me to the feet of Lord Raṅganātha.”
                  {won ? <><br />🔓 <strong>The secret poem (Verse 930) means:</strong> “The holy Sandals shine with gold and jewels, and they cool away the heat of our troubles.”</> : collected >= 4 ? <><br />🔒 Secret-poem clue: it is also about the holy Sandals — and how they shine!</> : null}
                </p>
                {won && <ChitraVerseDiagram steps={MINI_GOAL} />}
                <div className="ck-trail-text">
                  <span>Secret line: </span>
                  {DECODED_8.map((ch, idx) => (
                    <span key={idx} className={`ck-trail-chip ${idx === collected - 1 ? 'current' : ''}`} style={{ opacity: idx < collected ? 1 : 0.25 }}>
                      {idx < collected ? ch : '?'}
                    </span>
                  ))}
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
                  onOpenTurangaBandha?.();
                }}
                title="Play the interactive Chitra-Kāvya knight's-tour board (Turaṅga-Bandha)"
              >
                🎮 Play the full game (32 squares) ▶
              </button>

              <button
                type="button"
                className="ck-btn-secondary"
                onClick={() => setIsModalOpen(true)}
                title="View full verse breakdown, Sanskrit meaning, and historical analysis"
              >
                📜 How does it work?
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
                  const step = DESIKA_MATRIX[r][c];
                  const isCurrent = !won && here.row === r && here.col === c;
                  const isVisited = step <= collected;
                  const canJump = !won && step > collected && isKnightJump(here, { row: r, col: c });
                  const isHint = !won && misses >= 2 && target.row === r && target.col === c;

                  let cellClass = `ck-cell ${isLight ? 'light' : 'dark'}`;
                  if (isCurrent) cellClass += ' active-step';
                  else if (isVisited) cellClass += ' visited-step';
                  if (canJump) cellClass += ' can-jump';
                  if (isHint) cellClass += ' hint-step';

                  return (
                    <button
                      type="button"
                      key={`${r}-${c}`}
                      className={cellClass}
                      onClick={() => handleCellClick(r, c)}
                      aria-label={`Row ${r + 1}, column ${c + 1}: ${char}`}
                    >
                      <span className="ck-cell-char">{char}</span>
                      {isCurrent && <span className="ck-cell-step">♞</span>}
                      {!isCurrent && isVisited && <span className="ck-cell-step">#{step}</span>}
                    </button>
                  );
                })
              )}
            </div>

            <div className="ck-board-footer">
              <span>• = squares the horse can jump to</span>
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

            {/* How-it-works strip + L-move diagram (fills empty column space) */}
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', marginTop: '0.75rem', padding: '0.65rem 0.75rem', border: '1px solid #e2d3bd', borderRadius: '10px', background: '#fffdf9', color: '#5a3e1b', fontSize: '0.8rem', lineHeight: 1.45 }}>
              <div aria-label="Horse L-move diagram" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 18px)', gap: '2px', flexShrink: 0 }}>
                {[0,1,2,3,4,5,6,7,8,9,10,11].map((i) => {
                  const start = i === 0; const path = i === 3 || i === 6 || i === 9; const end = i === 10;
                  return (
                    <span key={i} style={{ width: 18, height: 18, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', border: '1px solid #e2d3bd', background: start || end ? '#fff' : path ? '#fbf3e6' : '#ffffff', borderColor: start ? '#b45309' : end ? '#15803d' : '#e2d3bd' }}>
                      {start ? '♞' : end ? '•' : ''}
                    </span>
                  );
                })}
              </div>
              <div>
                <strong>🧭 कथम् · How it works</strong>
                <ol style={{ margin: '0.25rem 0 0', paddingLeft: '1.1rem' }}>
                  <li>Read the 4 rows left→right: that is Verse 929.</li>
                  <li>The horse ♞ jumps in an <strong>L</strong>: 2 squares, then 1 sideways.</li>
                  <li>Write down each syllable it lands on → Verse 930 appears!</li>
                </ol>
                <p style={{ margin: '0.35rem 0 0', fontSize: '0.76rem', opacity: 0.85 }}>💡 Kids tip: count “one, two… turn!” with your finger before you tap.</p>
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

            <div style={{ background: '#fff7ed', border: '2px solid #f59e0b', borderRadius: '12px', padding: '1rem' }}>
              <h4 style={{ margin: '0 0 0.4rem', color: '#9a3412', fontSize: '1rem', fontWeight: 800 }}>🧒 How to play · कथं क्रीडामः?</h4>
              <ul style={{ margin: 0, paddingLeft: '1.1rem', fontSize: '0.88rem', color: '#431407', lineHeight: 1.6 }}>
                <li><strong>चित्रकाव्यम् (picture poetry):</strong> a poem whose letters are arranged in a picture or grid.</li>
                <li><strong>तुरङ्गबन्धः (the horse puzzle):</strong> the chess horse jumps in an L (2 squares + 1 sideways). Reading the letters it lands on gives a second poem!</li>
                <li><strong>Step 1:</strong> Look at the board — it holds Verse 929, row by row.</li>
                <li><strong>Step 2:</strong> Tap the square where the horse jumps next (dotted squares are possible L-jumps).</li>
                <li><strong>Step 3:</strong> Keep collecting syllables until the secret Verse 930 appears!</li>
              </ul>
            </div>

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
                स्थिता समयराजत्पा गताऽऽमदके गवि ।<br />
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
              {onOpenTurangaBandha && (
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    onOpenTurangaBandha();
                  }}
                  className="ck-btn-primary"
                  style={{ padding: '0.5rem 1.15rem', fontSize: '0.85rem' }}
                >
                  Play Knight’s Tour ➔
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
