import React, { useState, useEffect, useRef } from 'react';

interface TurangaChessboardProps {
  onPlayAudio?: (term: string) => void;
}

// 4x8 Grid data for Vedānta Deśika's Pādukā Sahasram 929-930
// Rows 0..3 (4 Pādas of Verse 929), Cols 0..7 (8 syllables each)
// Matrix numbers indicate the chronological step (1..32) of the Knight's Tour
export const DESIKA_MATRIX: number[][] = [
  // Deśika's published tour (every consecutive step is a legal 2+1 knight jump).
  [1, 30, 9, 20, 3, 24, 11, 26],
  [16, 19, 2, 29, 10, 27, 4, 23],
  [31, 8, 17, 14, 21, 6, 25, 12],
  [18, 15, 32, 7, 28, 13, 22, 5],
];

export interface BoardCell {
  row: number;
  col: number;
  step: number;
  syl929: string;
  sylTrans929: string;
  pada929: number;
  syl930?: string;
  sylTrans930?: string;
  pada930?: number;
}

// Verse 929 Syllables in linear row-by-row layout (32 syllables)
const V929_SYLLABLES: { dev: string; trans: string }[] = [
  // Pāda 1: स्थिरागसां सदाराध्या (8)
  { dev: 'स्थि', trans: 'sthi' },
  { dev: 'रा', trans: 'rā' },
  { dev: 'ग', trans: 'ga' },
  { dev: 'सां', trans: 'sāṁ' },
  { dev: 'स', trans: 'sa' },
  { dev: 'दा', trans: 'dā' },
  { dev: 'रा', trans: 'rā' },
  { dev: 'ध्या', trans: 'dhyā' },
  // Pāda 2: विहताकततामता (8)
  { dev: 'वि', trans: 'vi' },
  { dev: 'ह', trans: 'ha' },
  { dev: 'ता', trans: 'tā' },
  { dev: 'क', trans: 'ka' },
  { dev: 'त', trans: 'ta' },
  { dev: 'ता', trans: 'tā' },
  { dev: 'म', trans: 'ma' },
  { dev: 'ता', trans: 'tā' },
  // Pāda 3: सत्पादुके सरसा मा (8)
  { dev: 'सत्', trans: 'sat' },
  { dev: 'पा', trans: 'pā' },
  { dev: 'दु', trans: 'du' },
  { dev: 'के', trans: 'ke' },
  { dev: 'स', trans: 'sa' },
  { dev: 'र', trans: 'ra' },
  { dev: 'सा', trans: 'sā' },
  { dev: 'मा', trans: 'mā' },
  // Pāda 4: रङ्गराजपदं नय (8)
  { dev: 'रं', trans: 'raṁ' },
  { dev: 'ग', trans: 'ga' },
  { dev: 'रा', trans: 'rā' },
  { dev: 'ज', trans: 'ja' },
  { dev: 'प', trans: 'pa' },
  { dev: 'दं', trans: 'daṁ' },
  { dev: 'न', trans: 'na' },
  { dev: 'य', trans: 'ya' },
];

// Verse 930 Syllables in chronological Knight Tour order (steps 1 to 32)
const V930_SYLLABLES: { dev: string; trans: string }[] = [
  // Pāda 1: स्थिता समयराजत्पा (8)
  { dev: 'स्थि', trans: 'sthi' },
  { dev: 'ता', trans: 'tā' },
  { dev: 'स', trans: 'sa' },
  { dev: 'म', trans: 'ma' },
  { dev: 'य', trans: 'ya' },
  { dev: 'रा', trans: 'rā' },
  { dev: 'जत्', trans: 'jat' },
  { dev: 'पा', trans: 'pā' },
  // Pāda 2: गताऽऽमदके गवि (8)
  { dev: 'ग', trans: 'ga' },
  { dev: 'ता', trans: 'tā' },
  { dev: 'ऽऽ', trans: 'ā' },
  { dev: 'म', trans: 'ma' },
  { dev: 'द', trans: 'da' },
  { dev: 'के', trans: 'ke' },
  { dev: 'ग', trans: 'ga' },
  { dev: 'वि', trans: 'vi' },
  // Pāda 3: दुरंहसां सन्नता (8) — syllables read off the grid by steps 17–24
  { dev: 'दु', trans: 'du' },
  { dev: 'रं', trans: 'raṁ' },
  { dev: 'ह', trans: 'ha' },
  { dev: 'सां', trans: 'sāṁ' },
  { dev: 'स', trans: 'sa' },
  { dev: 'न्न', trans: 'nna' },
  { dev: 'ता', trans: 'tā' },
  { dev: 'दा', trans: 'dā' },
  // Pāda 4: साध्या तापकरासरा (8) — steps 25–32
  { dev: 'सा', trans: 'sā' },
  { dev: 'ध्या', trans: 'dhyā' },
  { dev: 'ता', trans: 'tā' },
  { dev: 'प', trans: 'pa' },
  { dev: 'क', trans: 'ka' },
  { dev: 'रा', trans: 'rā' },
  { dev: 'स', trans: 'sa' },
  { dev: 'रा', trans: 'rā' },
];

const TurangaTourViewer: React.FC<TurangaChessboardProps> = ({ onPlayAudio }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1200); // ms per move
  const [viewMode, setViewMode] = useState<'knight_walk' | 'linear_929' | 'dual'>('knight_walk');
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Build 4x8 cell matrix
  const cells: BoardCell[][] = [];
  let linearIdx = 0;
  for (let r = 0; r < 4; r++) {
    const rowCells: BoardCell[] = [];
    for (let c = 0; c < 8; c++) {
      const step = DESIKA_MATRIX[r][c];
      const s929 = V929_SYLLABLES[linearIdx] || { dev: '', trans: '' };
      const s930 = V930_SYLLABLES[step - 1] || { dev: '', trans: '' };
      rowCells.push({
        row: r,
        col: c,
        step,
        syl929: s929.dev,
        sylTrans929: s929.trans,
        pada929: r + 1,
        syl930: s930.dev,
        sylTrans930: s930.trans,
        pada930: Math.floor((step - 1) / 8) + 1,
      });
      linearIdx++;
    }
    cells.push(rowCells);
  }

  // Find coordinates of current step
  let activeCoord = { row: 0, col: 0 };
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 8; c++) {
      if (DESIKA_MATRIX[r][c] === currentStep) {
        activeCoord = { row: r, col: c };
      }
    }
  }

  // Auto-play timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setTimeout(() => {
        setCurrentStep((prev) => {
          if (prev >= 32) {
            setIsPlaying(false);
            return 1;
          }
          return prev + 1;
        });
      }, playbackSpeed);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentStep, playbackSpeed]);

  const handleStepJump = (step: number) => {
    setIsPlaying(false);
    setCurrentStep(Math.max(1, Math.min(32, step)));
  };

  const handleNext = () => {
    setIsPlaying(false);
    setCurrentStep((prev) => (prev < 32 ? prev + 1 : 1));
  };

  const handlePrev = () => {
    setIsPlaying(false);
    setCurrentStep((prev) => (prev > 1 ? prev - 1 : 32));
  };

  // Traversed steps up to currentStep
  const visitedSteps = new Set<number>();
  for (let s = 1; s <= currentStep; s++) {
    visitedSteps.add(s);
  }

  // Current active cell data
  const activeCell = cells[activeCoord.row][activeCoord.col];

  // Syllables of Verse 930 accumulated so far
  const accumulated930 = V930_SYLLABLES.slice(0, currentStep);

  return (
    <div
      style={{
        background: '#ffffff',
        border: '1.5px solid #e2e8f0',
        borderRadius: '16px',
        padding: '1.5rem',
        margin: '2rem 0',
        boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
        <div>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#b45309' }}>
            Knight tour animation · for parents
          </span>
          <h3 style={{ margin: '0.25rem 0 0', fontSize: '1.35rem', fontWeight: 800, color: '#0f172a' }}>
            तुरङ्गबन्धः (Turaṅga-Bandha) · Watch the Knight’s Tour
          </h3>
          <p style={{ margin: '0.25rem 0 0', fontSize: '0.88rem', color: '#64748b' }}>
            Śrī Vedānta Deśika’s <em>Śrī Pādukā Sahasram</em> (14th c.) · Verses 929 &amp; 930 · 8×4 Matrix
          </p>
        </div>

        {/* View Mode Toggle */}
        <div style={{ display: 'flex', gap: '0.35rem', background: '#f8fafc', padding: '0.35rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
          <button
            type="button"
            onClick={() => setViewMode('knight_walk')}
            style={{
              padding: '0.35rem 0.75rem',
              borderRadius: '6px',
              border: 'none',
              background: viewMode === 'knight_walk' ? '#b45309' : 'transparent',
              color: viewMode === 'knight_walk' ? '#ffffff' : '#475569',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
            }}
          >
            ♞ Knight’s Walk (Verse 930)
          </button>
          <button
            type="button"
            onClick={() => setViewMode('linear_929')}
            style={{
              padding: '0.35rem 0.75rem',
              borderRadius: '6px',
              border: 'none',
              background: viewMode === 'linear_929' ? '#0284c7' : 'transparent',
              color: viewMode === 'linear_929' ? '#ffffff' : '#475569',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
            }}
          >
            📜 Linear Layout (Verse 929)
          </button>
          <button
            type="button"
            onClick={() => setViewMode('dual')}
            style={{
              padding: '0.35rem 0.75rem',
              borderRadius: '6px',
              border: 'none',
              background: viewMode === 'dual' ? '#4f46e5' : 'transparent',
              color: viewMode === 'dual' ? '#ffffff' : '#475569',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
            }}
          >
            ⚡ Dual Emergence
          </button>
        </div>
      </div>

      {/* Control bar: Play/Pause, Slider, Speeds */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
          background: '#fcfaf8',
          border: '1px solid #f1ebe5',
          borderRadius: '12px',
          padding: '0.85rem 1.15rem',
          marginBottom: '1.25rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            style={{
              padding: '0.45rem 1rem',
              borderRadius: '8px',
              border: 'none',
              background: isPlaying ? '#dc2626' : '#b45309',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            {isPlaying ? '⏸ Pause Tour' : '▶ Play Knight’s Walk'}
          </button>
          <button
            type="button"
            onClick={handlePrev}
            style={{
              padding: '0.45rem 0.75rem',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              background: '#ffffff',
              color: '#334155',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
            }}
            title="Previous step"
          >
            ⏮ Step Back
          </button>
          <button
            type="button"
            onClick={handleNext}
            style={{
              padding: '0.45rem 0.75rem',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              background: '#ffffff',
              color: '#334155',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
            }}
            title="Next step"
          >
            Step Forward ⏭
          </button>
          <button
            type="button"
            onClick={() => handleStepJump(1)}
            style={{
              padding: '0.45rem 0.65rem',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              background: '#ffffff',
              color: '#64748b',
              fontWeight: 600,
              fontSize: '0.82rem',
              cursor: 'pointer',
            }}
            title="Reset to step 1"
          >
            ↺ Reset
          </button>
        </div>

        {/* Step Slider & Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: '1 1 250px', justifyContent: 'flex-end' }}>
          <span style={{ fontSize: '0.86rem', fontWeight: 800, color: '#92400e', whiteSpace: 'nowrap' }}>
            Step {currentStep} of 32
          </span>
          <input
            type="range"
            min={1}
            max={32}
            value={currentStep}
            onChange={(e) => handleStepJump(Number(e.target.value))}
            style={{ flex: '1 1 120px', maxWidth: '200px', cursor: 'pointer' }}
          />
          <div style={{ display: 'flex', gap: '0.25rem' }}>
            {[
              { label: '0.8s', ms: 800 },
              { label: '1.2s', ms: 1200 },
              { label: '2.0s', ms: 2000 },
            ].map((spd) => (
              <button
                key={spd.ms}
                type="button"
                onClick={() => setPlaybackSpeed(spd.ms)}
                style={{
                  padding: '0.2rem 0.45rem',
                  borderRadius: '4px',
                  border: playbackSpeed === spd.ms ? '1.5px solid #b45309' : '1px solid #e2e8f0',
                  background: playbackSpeed === spd.ms ? '#fef3c7' : '#ffffff',
                  color: playbackSpeed === spd.ms ? '#92400e' : '#64748b',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                {spd.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CHESSBOARD GRID (8 columns x 4 rows) */}
      <div
        style={{
          background: 'linear-gradient(135deg, #2e1065 0%, #1e1b4b 50%, #0f172a 100%)',
          padding: '1.25rem',
          borderRadius: '16px',
          boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.4), 0 12px 28px rgba(0, 0, 0, 0.15)',
          margin: '1.25rem 0',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#e0e7ff', fontSize: '0.78rem', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '0.08em', padding: '0 0.5rem' }}>
          <span>HALF-CHESSBOARD (8×4 MATRIX · 32 CELLS)</span>
          <span>COLUMNS A – H (8 FILES)</span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 1fr)',
            gap: '6px',
            maxWidth: '100%',
          }}
        >
          {cells.map((rowCells, rIdx) =>
            rowCells.map((cell, cIdx) => {
              const isDark = (rIdx + cIdx) % 2 === 1;
              const isCurrent = cell.step === currentStep;
              const isVisited = visitedSteps.has(cell.step);
              const isHovered = hoveredCell?.row === rIdx && hoveredCell?.col === cIdx;

              // Square background styling
              let bg = isDark ? '#451a03' : '#d97706'; // Wood tones
              let border = isDark ? '1.5px solid #78350f' : '1.5px solid #f59e0b';
              let textColor = isDark ? '#fef3c7' : '#451a03';

              if (isCurrent) {
                bg = 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)';
                border = '3px solid #ffffff';
                textColor = '#451a03';
              } else if (isVisited && viewMode !== 'linear_929') {
                bg = isDark ? '#78350f' : '#b45309';
                textColor = '#fef3c7';
              }

              return (
                <button
                  key={`${rIdx}-${cIdx}`}
                  type="button"
                  onClick={() => handleStepJump(cell.step)}
                  onMouseEnter={() => setHoveredCell({ row: rIdx, col: cIdx })}
                  onMouseLeave={() => setHoveredCell(null)}
                  style={{
                    aspectRatio: '1 / 1',
                    borderRadius: '8px',
                    border,
                    background: bg,
                    color: textColor,
                    padding: '4px',
                    position: 'relative',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: isCurrent
                      ? '0 0 20px #fbbf24, 0 4px 12px rgba(0, 0, 0, 0.3)'
                      : isHovered
                      ? '0 0 10px rgba(255, 255, 255, 0.4)'
                      : 'none',
                    transform: isCurrent ? 'scale(1.06)' : isHovered ? 'scale(1.03)' : 'scale(1)',
                    transition: 'all 0.15s ease',
                    zIndex: isCurrent ? 10 : 1,
                  }}
                  title={`Square (${rIdx},${cIdx}) · Step #${cell.step} · Verse 929: ${cell.syl929} · Verse 930: ${cell.syl930}`}
                >
                  {/* Step badge */}
                  <span
                    style={{
                      position: 'absolute',
                      top: '3px',
                      left: '4px',
                      fontSize: '0.62rem',
                      fontWeight: 800,
                      opacity: isCurrent ? 1 : 0.8,
                      fontFamily: 'monospace',
                    }}
                  >
                    #{cell.step.toString().padStart(2, '0')}
                  </span>

                  {/* Knight piece on active square */}
                  {isCurrent && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '2px',
                        right: '4px',
                        fontSize: '1rem',
                        animation: 'bounce 0.8s infinite alternate',
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
                      }}
                      aria-label="Active Knight position"
                    >
                      ♞
                    </span>
                  )}

                  {/* Syllable display */}
                  <div style={{ textAlign: 'center', marginTop: '4px' }}>
                    <div
                      style={{
                        fontSize: '1.25rem',
                        fontWeight: 800,
                        lineHeight: 1.1,
                        textShadow: isCurrent ? '0 1px 2px rgba(0,0,0,0.2)' : 'none',
                      }}
                    >
                      {viewMode === 'linear_929' ? cell.syl929 : cell.syl930}
                    </div>
                    <div
                      style={{
                        fontSize: '0.66rem',
                        fontWeight: 700,
                        opacity: 0.85,
                        textTransform: 'uppercase',
                        marginTop: '1px',
                      }}
                    >
                      {viewMode === 'linear_929' ? cell.sylTrans929 : cell.sylTrans930}
                    </div>
                  </div>

                  {/* Dual indicator if in dual mode */}
                  {viewMode === 'dual' && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '2px',
                        fontSize: '0.58rem',
                        color: isDark ? '#fed7aa' : '#7c2d12',
                        fontWeight: 700,
                      }}
                    >
                      929: {cell.syl929}
                    </div>
                  )}
                </button>
              );
            })
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#c7d2fe', fontSize: '0.74rem', marginTop: '0.6rem', padding: '0 0.5rem' }}>
          <span>Pāda 1 (Row 1) · Pāda 2 (Row 2) · Pāda 3 (Row 3) · Pāda 4 (Row 4)</span>
          <span>Click any square to leap the knight immediately</span>
        </div>
      </div>

      {/* ACCUMULATED SYLLABLES RIBBON (Verse 930 Construction) */}
      <div
        style={{
          background: '#f8fafc',
          border: '1.5px solid #cbd5e1',
          borderRadius: '12px',
          padding: '1rem 1.25rem',
          margin: '1.25rem 0',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#334155' }}>
            Verse 930 Emergence Tracker (Step 1 through {currentStep}):
          </div>
          <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
            {currentStep}/32 Syllables Reconstructed ({Math.round((currentStep / 32) * 100)}%)
          </span>
        </div>

        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', minHeight: '38px', alignItems: 'center' }}>
          {accumulated930.map((s, idx) => {
            const stepNum = idx + 1;
            const isLatest = stepNum === currentStep;
            return (
              <span
                key={idx}
                style={{
                  padding: '0.2rem 0.5rem',
                  borderRadius: '6px',
                  background: isLatest ? '#fbbf24' : '#e0e7ff',
                  color: isLatest ? '#78350f' : '#3730a3',
                  fontWeight: 800,
                  fontSize: '0.92rem',
                  border: isLatest ? '1.5px solid #d97706' : '1px solid #c7d2fe',
                  boxShadow: isLatest ? '0 2px 8px rgba(251, 191, 36, 0.4)' : 'none',
                }}
                title={`Step ${stepNum}: ${s.trans}`}
              >
                {s.dev}
              </span>
            );
          })}
        </div>

        {/* Translation of current state */}
        <div style={{ marginTop: '0.65rem', fontSize: '0.86rem', color: '#475569', fontStyle: 'italic', lineHeight: 1.5 }}>
          {currentStep === 32 ? (
            <span style={{ color: '#065f46', fontWeight: 700 }}>
              ✓ Complete Verse 930 Reconstructed! &quot;The sandals protect those who shine with good conduct; they possess the deep brilliance of gold; they dispense boundless spiritual joy; they destroy the despair of the wicked...&quot;
            </span>
          ) : (
            <span>
              Currently spelling Pāda {Math.floor((currentStep - 1) / 8) + 1} of Verse 930. Next move will land on Step #{currentStep < 32 ? currentStep + 1 : 1}.
            </span>
          )}
        </div>
      </div>

      {/* SYNCHRONIZED COMPARISON PANELS (Verses 929 & 930) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem', marginTop: '1.25rem' }}>
        {/* Verse 929 Card */}
        <div
          style={{
            background: '#f0f9ff',
            border: '1.5px solid #bae6fd',
            borderRadius: '12px',
            padding: '1.15rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>
              Verse 929 · Linear Grid (Left-to-Right)
            </span>
            <button
              type="button"
              onClick={() => onPlayAudio?.('स्थिरागसां सदाराध्या विहताकततामता सत्पादुके सरसा मा रङ्गराजपदं नय')}
              style={{
                padding: '0.2rem 0.5rem',
                fontSize: '0.74rem',
                borderRadius: '6px',
                border: '1px solid #7dd3fc',
                background: '#ffffff',
                cursor: 'pointer',
              }}
            >
              🔊 Chant 929
            </button>
          </div>

          <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0369a1', lineHeight: 1.6, marginBottom: '0.5rem' }}>
            स्थिरागसां सदाराध्या विहताकततामता ।<br />
            सत्पादुके सरसा मा रङ्गराजपदं नय ॥ ९२९ ॥
          </div>

          <div style={{ fontSize: '0.82rem', color: '#0c4a6e', lineHeight: 1.5 }}>
            <strong>English:</strong> &quot;O sacred Sandals of the Supreme Brahman! You are eternally adorned by those who have committed unpardonable sins; you destroy all sorrow and unwanted miseries; you produce a sweet, musical sound. Please lead me to the eternal feet of Lord Rangaraja.&quot;
          </div>

          <div style={{ marginTop: '0.65rem', fontSize: '0.78rem', color: '#0369a1', background: '#ffffff', padding: '0.4rem 0.6rem', borderRadius: '6px', border: '1px solid #e0f2fe' }}>
            Active Linear Cell: <strong>Row {activeCoord.row + 1}, Col {activeCoord.col + 1}</strong> contains <strong>{activeCell.syl929}</strong> ({activeCell.sylTrans929}).
          </div>
        </div>

        {/* Verse 930 Card */}
        <div
          style={{
            background: '#fffbeb',
            border: '1.5px solid #fde68a',
            borderRadius: '12px',
            padding: '1.15rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#b45309', textTransform: 'uppercase' }}>
              Verse 930 · Knight’s Tour Emergence (Steps 1–32)
            </span>
            <button
              type="button"
              onClick={() => onPlayAudio?.('स्थिता समयराजत्पा गतामदके गवि दुरंहसां सन्नतादा साध्या तापकरासरा')}
              style={{
                padding: '0.2rem 0.5rem',
                fontSize: '0.74rem',
                borderRadius: '6px',
                border: '1px solid #fcd34d',
                background: '#ffffff',
                cursor: 'pointer',
              }}
            >
              🔊 Chant 930
            </button>
          </div>

          <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#92400e', lineHeight: 1.6, marginBottom: '0.5rem' }}>
            स्थिता समयराजत्पा गताऽऽमदके गवि ।<br />
            दुरंहसां सन्नतादा साध्या तापकरासरा ॥ ९३० ॥
          </div>

          <div style={{ fontSize: '0.82rem', color: '#78350f', lineHeight: 1.5 }}>
            <strong>English:</strong> &quot;The sandals protect those who shine with good conduct; they possess the deep brilliance of gold; they dispense boundless spiritual joy; they destroy the despair of the wicked; and the radiant rays of their gems have the power to instantly extinguish the burning heat of worldly suffering.&quot;
          </div>

          <div style={{ marginTop: '0.65rem', fontSize: '0.78rem', color: '#92400e', background: '#ffffff', padding: '0.4rem 0.6rem', borderRadius: '6px', border: '1px solid #fef3c7' }}>
            Active Knight Step: <strong>Step #{currentStep}</strong> lands on <strong>{activeCell.syl930}</strong> ({activeCell.sylTrans930}).
          </div>
        </div>
      </div>
    </div>
  );
};

// ───────────────────────── Play mode: "Reveal Verse 930" ─────────────────────────

/** (row, col) of every tour step, index 0 = step 1. */
export const TOUR_POSITIONS: { row: number; col: number }[] = (() => {
  const out: { row: number; col: number }[] = [];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 8; c++) out[DESIKA_MATRIX[r][c] - 1] = { row: r, col: c };
  return out;
})();

export const isKnightJump = (a: { row: number; col: number }, b: { row: number; col: number }) => {
  const dr = Math.abs(a.row - b.row);
  const dc = Math.abs(a.col - b.col);
  return (dr === 1 && dc === 2) || (dr === 2 && dc === 1);
};

type Feedback = { kind: 'idle' | 'right' | 'not_l' | 'other_l' | 'visited'; text: string };

const KnightPlayGame: React.FC<{ onWatch: () => void; onPlayAudio?: (t: string) => void }> = ({ onPlayAudio }) => {
  const [collected, setCollected] = useState(1); // step 1 is given: the horse starts there
  const [misses, setMisses] = useState(0);
  const [totalMisses, setTotalMisses] = useState(0);
  const [hint, setHint] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>({
    kind: 'idle',
    text: 'The horse ♞ is standing on स्थि. Tap the square where it jumps next!',
  });
  const [shake, setShake] = useState<string | null>(null);

  const won = collected >= 32;
  const here = TOUR_POSITIONS[collected - 1];
  const target = won ? null : TOUR_POSITIONS[collected];
  const visitedStep = (r: number, c: number) => DESIKA_MATRIX[r][c] <= collected;
  const showHint = hint || misses >= 3;

  const tap = (r: number, c: number) => {
    if (won) return;
    const step = DESIKA_MATRIX[r][c];
    if (target && r === target.row && c === target.col) {
      const syl = V930_SYLLABLES[step - 1];
      setCollected(step);
      setMisses(0);
      setHint(false);
      setFeedback({
        kind: 'right',
        text: step >= 32 ? 'You did it!' : `✅ Yes! You collected “${syl.dev}” (${syl.trans}). Now find the next jump.`,
      });
      return;
    }
    setMisses((m) => m + 1);
    setTotalMisses((m) => m + 1);
    setShake(`${r}-${c}`);
    setTimeout(() => setShake(null), 400);
    if (r === here.row && c === here.col) {
      setFeedback({ kind: 'visited', text: 'The horse is already standing here. Tap a square it can jump to.' });
    } else if (!isKnightJump(here, { row: r, col: c })) {
      setFeedback({ kind: 'not_l', text: '❌ A horse can’t go there. It always jumps in an L: 2 squares one way, then 1 square sideways. Look for the dotted squares.' });
    } else if (visitedStep(r, c)) {
      setFeedback({ kind: 'visited', text: '🔁 Good L-jump, but the horse already visited that square. It never lands on the same square twice!' });
    } else {
      setFeedback({ kind: 'other_l', text: '🤏 Good L-jump! But the poet’s horse chose a different dotted square. Try another one.' });
    }
  };

  const reset = () => {
    setCollected(1);
    setMisses(0);
    setTotalMisses(0);
    setHint(false);
    setFeedback({ kind: 'idle', text: 'The horse ♞ is standing on स्थि. Tap the square where it jumps next!' });
  };

  const fbColor = feedback.kind === 'right' ? '#166534' : feedback.kind === 'idle' ? '#334155' : '#b91c1c';
  const fbBg = feedback.kind === 'right' ? '#f0fdf4' : feedback.kind === 'idle' ? '#f8fafc' : '#fef2f2';

  return (
    <div>
      {/* Goal banner */}
      <div style={{ background: 'linear-gradient(135deg,#fff7ed,#fef3c7)', border: '2px solid #f59e0b', borderRadius: 14, padding: '0.9rem 1.1rem', marginBottom: '0.9rem' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.08em', color: '#b45309', textTransform: 'uppercase' }}>🎯 Your goal · लक्ष्यम्</div>
        <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginTop: 4 }}>
          Find the horse’s next square — collect all 32 syllables to unlock the secret Verse 930!
        </div>
        <div style={{ fontSize: '0.86rem', color: '#57534e', marginTop: 4 }}>
          The horse (तुरङ्गः) jumps in an <strong>L</strong>: 2 squares one way + 1 square sideways. Dotted squares (•) are the places it <em>can</em> jump. Only one is the poet’s path.
        </div>
      </div>

      {/* Progress */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.6rem' }}>
        <strong style={{ color: '#0f172a' }}>Syllables collected: {collected} / 32</strong>
        <div style={{ flex: 1, minWidth: 120, height: 10, background: '#e2e8f0', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{ width: `${(collected / 32) * 100}%`, height: '100%', background: '#f59e0b', transition: 'width .3s' }} />
        </div>
        <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Misses: {totalMisses}</span>
      </div>

      {/* Board */}
      <div role="grid" aria-label="Verse 929 board — tap the knight's next square" style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 3, maxWidth: 560, margin: '0 auto', userSelect: 'none' }}>
        {Array.from({ length: 4 }).map((_, r) =>
          Array.from({ length: 8 }).map((__, c) => {
            const syl = V929_SYLLABLES[r * 8 + c];
            const step = DESIKA_MATRIX[r][c];
            const isHere = r === here.row && c === here.col;
            const visited = step < collected || (won && step <= 32);
            const canJump = !won && isKnightJump(here, { row: r, col: c }) && step > collected;
            const isHint = showHint && target && r === target.row && c === target.col;
            const dark = (r + c) % 2 === 1;
            let bg = dark ? '#d6c3a5' : '#f5ecdc';
            if (visited) bg = '#bbf7d0';
            if (isHere && !won) bg = '#f59e0b';
            if (isHint) bg = '#fde047';
            return (
              <button
                key={`${r}-${c}`}
                type="button"
                onClick={() => tap(r, c)}
                aria-label={`Row ${r + 1}, column ${c + 1}: ${syl.dev}${visited ? ' (collected)' : ''}`}
                style={{
                  position: 'relative',
                  aspectRatio: '1 / 1',
                  border: isHint ? '3px solid #ca8a04' : canJump ? '2px dashed #b45309' : '1px solid rgba(0,0,0,0.08)',
                  borderRadius: 8,
                  background: bg,
                  cursor: won ? 'default' : 'pointer',
                  fontFamily: "'Noto Sans Devanagari', serif",
                  fontSize: 'clamp(0.85rem, 2.6vw, 1.25rem)',
                  fontWeight: 800,
                  color: '#1f2937',
                  padding: 0,
                  transform: shake === `${r}-${c}` ? 'translateX(-3px)' : 'none',
                  boxShadow: shake === `${r}-${c}` ? '0 0 0 3px #ef4444' : 'none',
                  transition: 'transform .1s, background .2s',
                }}
              >
                {isHere && !won ? '♞' : syl.dev}
                {isHere && !won && (
                  <span style={{ position: 'absolute', bottom: 2, left: 0, right: 0, fontSize: '0.6rem', fontWeight: 700 }}>{syl.dev}</span>
                )}
                {visited && !isHere && (
                  <span style={{ position: 'absolute', top: 1, right: 3, fontSize: '0.55rem', color: '#166534' }}>{step}</span>
                )}
                {canJump && !isHint && (
                  <span aria-hidden style={{ position: 'absolute', top: 2, left: 4, fontSize: '0.8rem', color: '#b45309' }}>•</span>
                )}
              </button>
            );
          })
        )}
      </div>

      {/* Feedback */}
      {!won && (
        <div aria-live="polite" style={{ marginTop: '0.8rem', padding: '0.7rem 0.9rem', borderRadius: 10, background: fbBg, color: fbColor, fontWeight: 600, fontSize: '0.92rem' }}>
          {feedback.text}
          {misses >= 3 && !hint && <span> 💡 Hint: the yellow square is the right one.</span>}
        </div>
      )}

      {/* Decoded line */}
      <div style={{ marginTop: '0.8rem', padding: '0.7rem 0.9rem', borderRadius: 10, border: '1px dashed #f59e0b', background: '#fffbeb' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#92400e', textTransform: 'uppercase' }}>Secret verse 930 so far</div>
        <div style={{ fontFamily: "'Noto Sans Devanagari', serif", fontSize: '1.15rem', fontWeight: 800, color: '#78350f', marginTop: 4, lineHeight: 1.7 }}>
          {V930_SYLLABLES.slice(0, collected).map((s, i) => (
            <span key={i}>
              {s.dev}
              {(i + 1) % 8 === 0 && i < 31 ? ' । ' : ''}
            </span>
          ))}
          {!won && <span style={{ color: '#d6d3d1' }}> {'_ '.repeat(Math.min(6, 32 - collected))}…</span>}
        </div>
        <div style={{ fontSize: '0.8rem', color: '#a16207', fontStyle: 'italic' }}>
          {V930_SYLLABLES.slice(0, collected).map((s) => s.trans).join('·')}
        </div>
      </div>

      {!won && (
        <div style={{ marginTop: '0.7rem', display: 'grid', gap: '0.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', fontSize: '0.85rem' }}>
          <div style={{ background: '#f8fafc', borderRadius: 10, padding: '0.55rem 0.7rem', border: '1px solid #e2e8f0' }}>
            <strong>📖 The board (Verse 929) means:</strong> “O holy Sandals, please take me to the feet of Lord Raṅganātha.”
          </div>
          <div style={{ background: '#fefce8', borderRadius: 10, padding: '0.55rem 0.7rem', border: '1px solid #fde68a' }}>
            <strong>🔒 Secret poem (Verse 930):</strong>{' '}
            {collected < 8 ? 'Collect 8 syllables to get a clue…'
              : collected < 16 ? 'Clue: it is also about the holy Sandals — and how they shine! Keep going…'
              : '“The holy Sandals shine with gold and jewels, and they cool away the heat of our troubles.” Finish all 32 to unlock the full verse!'}
          </div>
        </div>
      )}

      {/* Controls */}
      {!won && (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.8rem' }}>
          <button type="button" onClick={() => setHint(true)} style={btn('#fde68a', '#78350f')}>💡 Hint</button>
          <button type="button" onClick={reset} style={btn('#f1f5f9', '#334155')}>↺ Start over</button>
        </div>
      )}

      {/* Win */}
      {won && (
        <div role="status" style={{ marginTop: '1rem', padding: '1.1rem', borderRadius: 14, background: 'linear-gradient(135deg,#dcfce7,#fef9c3)', border: '2px solid #22c55e' }}>
          <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#166534' }}>🎉 विजयः! You unlocked Verse 930!</div>
          <p style={{ margin: '0.4rem 0', color: '#14532d' }}>
            Your horse visited all 32 squares, each one exactly once{totalMisses === 0 ? ' — with zero misses! 🏆' : ` (with ${totalMisses} miss${totalMisses === 1 ? '' : 'es'}).`}
          </p>
          <div style={{ display: 'grid', gap: '0.6rem', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))' }}>
            <div style={{ background: '#fff', borderRadius: 10, padding: '0.7rem' }}>
              <strong>Verse 929 — read the rows normally</strong>
              <div style={{ fontFamily: "'Noto Sans Devanagari', serif", fontWeight: 700 }}>स्थिरागसां सदाराध्या विहताकततामता ।<br />सत्पादुके सरसा मा रङ्गराजपदं नय ॥</div>
              <p style={{ margin: '0.3rem 0 0', fontSize: '0.85rem' }}>In simple words: “O holy Sandals, please take me to the feet of Lord Raṅganātha.”</p>
            </div>
            <div style={{ background: '#fff', borderRadius: 10, padding: '0.7rem' }}>
              <strong>Verse 930 — read along the horse’s jumps</strong>
              <div style={{ fontFamily: "'Noto Sans Devanagari', serif", fontWeight: 700 }}>स्थिता समयराजत्पा गताऽऽमदके गवि ।<br />दुरंहसां सन्नतादा साध्या तापकरासरा ॥</div>
              <p style={{ margin: '0.3rem 0 0', fontSize: '0.85rem' }}>In simple words: “The holy Sandals shine with gold and jewels, and they cool away the heat of our troubles.”</p>
            </div>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#166534', margin: '0.6rem 0' }}>
            Same 32 letters, two different poems! That is चित्रकाव्यम् — picture poetry.
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button type="button" onClick={reset} style={btn('#16a34a', '#fff')}>🔁 Play again</button>
            {onPlayAudio && (
              <button type="button" onClick={() => onPlayAudio('स्थिता समयराजत्पा गताऽऽमदके गवि दुरंहसां सन्नतादा साध्या तापकरासरा')} style={btn('#f59e0b', '#fff')}>
                🔊 Hear Verse 930
              </button>
            )}
          </div>
          <ChitraVerseDiagram />
        </div>
      )}
    </div>
  );
};


/** Clear 3-panel diagram: Verse 929 rows → knight L-path → Verse 930. */
export const ChitraVerseDiagram: React.FC<{ steps?: number }> = ({ steps = 32 }) => {
  const n = Math.max(2, Math.min(32, steps));
  const C = 34; // cell size
  const W = 8 * C, H = 4 * C;
  const pos = TOUR_POSITIONS.slice(0, n);
  const cellStyle = (hl: boolean): React.CSSProperties => ({
    border: '1px solid #e7d7b8', background: hl ? '#fef3c7' : '#fffdf7', fontFamily: "'Noto Sans Devanagari', serif",
    fontWeight: 700, fontSize: '0.78rem', textAlign: 'center', padding: '0.25rem 0', minWidth: 0,
  });
  const panel: React.CSSProperties = { background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '0.6rem', minWidth: 0 };
  const label: React.CSSProperties = { fontSize: '0.8rem', fontWeight: 800, color: '#78350f', marginBottom: '0.35rem' };
  const grid: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 0 };
  return (
    <figure style={{ margin: '1rem 0 0', padding: '0.8rem', borderRadius: 14, background: '#fdf8ee', border: '1px solid #ebdcc5' }} aria-label="Diagram: Verse 929 becomes Verse 930 along the knight's path">
      <figcaption style={{ fontWeight: 900, color: '#0f172a', marginBottom: '0.6rem', fontSize: '0.95rem' }}>
        🗺️ चित्रम् · Diagram — एकाः वर्णाः · अश्वः L-आकारेण कूर्दति · नूतनं काव्यम्
        <div style={{ fontWeight: 600, color: '#92400e', fontSize: '0.85rem' }}>Same letters · horse jumps in an L · new poem appears.</div>
      </figcaption>
      <div style={{ display: 'grid', gap: '0.6rem', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', alignItems: 'stretch' }}>
        <div style={panel}>
          <div style={label}>① श्लोकः ९२९ · Verse 929 — read each row →</div>
          <div style={grid}>
            {V929_SYLLABLES.map((s, i) => {
              const r = Math.floor(i / 8), c = i % 8;
              return <div key={i} style={cellStyle(DESIKA_MATRIX[r][c] <= n)}>{s.dev}</div>;
            })}
          </div>
        </div>
        <div style={panel}>
          <div style={label}>② तुरङ्गमार्गः · Knight path — steps 1…{n}</div>
          <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label={`Knight jumps 1 to ${n}`}>
            <defs>
              <marker id="ck-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M0,0 L10,5 L0,10 z" fill="#b45309" />
              </marker>
            </defs>
            {Array.from({ length: 32 }, (_, i) => {
              const r = Math.floor(i / 8), c = i % 8;
              return <rect key={i} x={c * C} y={r * C} width={C} height={C} fill={(r + c) % 2 ? '#f5e6c8' : '#fffdf7'} stroke="#e7d7b8" />;
            })}
            {pos.slice(1).map((p, i) => {
              const a = pos[i];
              const x1 = a.col * C + C / 2, y1 = a.row * C + C / 2, x2 = p.col * C + C / 2, y2 = p.row * C + C / 2;
              const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy), k = 11 / len;
              return <line key={i} x1={x1 + dx * k} y1={y1 + dy * k} x2={x2 - dx * k} y2={y2 - dy * k} stroke="#b45309" strokeWidth={1.6} strokeOpacity={0.75} markerEnd="url(#ck-arrow)" />;
            })}
            {pos.map((p, i) => (
              <g key={i}>
                <circle cx={p.col * C + C / 2} cy={p.row * C + C / 2} r={9} fill={i === 0 ? '#16a34a' : '#fff'} stroke="#b45309" />
                <text x={p.col * C + C / 2} y={p.row * C + C / 2 + 3.5} textAnchor="middle" fontSize="9.5" fontWeight="800" fill={i === 0 ? '#fff' : '#78350f'}>{i + 1}</text>
              </g>
            ))}
          </svg>
          <div style={{ fontSize: '0.72rem', color: '#64748b' }}>♞ 1 = start (स्थि). Each arrow is one L-jump (2 + 1).</div>
        </div>
        <div style={panel}>
          <div style={{ ...label, color: '#166534' }}>③ श्लोकः ९३० · Verse 930 — letters in jump order</div>
          <div style={grid}>
            {V930_SYLLABLES.map((s, i) => (
              <div key={i} style={{ ...cellStyle(false), background: i < n ? '#dcfce7' : '#f8fafc', color: i < n ? '#14532d' : '#cbd5e1' }}>
                {i < n ? s.dev : '?'}
              </div>
            ))}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.3rem' }}>Step 1 → square 1, step 2 → square 2 … read left to right.</div>
        </div>
      </div>
    </figure>
  );
};

const btn = (bg: string, color: string): React.CSSProperties => ({
  padding: '0.5rem 0.95rem',
  borderRadius: 999,
  border: 'none',
  background: bg,
  color,
  fontWeight: 800,
  fontSize: '0.88rem',
  cursor: 'pointer',
});

export const TurangaBandhaChessboard: React.FC<TurangaChessboardProps> = ({ onPlayAudio }) => {
  const [mode, setMode] = useState<'play' | 'watch'>('play');
  return (
    <div style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: 16, padding: '1.25rem', margin: '1.5rem 0', boxShadow: '0 10px 30px rgba(15,23,42,0.08)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.9rem' }}>
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#b45309', textTransform: 'uppercase', letterSpacing: '0.08em' }}>तुरङ्गबन्धः · The Horse Puzzle</div>
          <h3 style={{ margin: '0.2rem 0 0', fontSize: '1.3rem', fontWeight: 900, color: '#0f172a' }}>♞ Knight’s Tour Game: Reveal Verse 930</h3>
        </div>
      </div>
      {mode === 'play' ? (
        <>
          <KnightPlayGame onWatch={() => setMode('watch')} onPlayAudio={onPlayAudio} />
          <div style={{ marginTop: '0.9rem', textAlign: 'right' }}>
            <button type="button" onClick={() => setMode('watch')} style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '0.78rem', textDecoration: 'underline', cursor: 'pointer' }}>For parents: watch the full knight tour animation</button>
          </div>
        </>
      ) : (
        <>
          <button type="button" onClick={() => setMode('play')} style={btn('#fef3c7', '#78350f')}>← Back to the game</button>
          <TurangaTourViewer onPlayAudio={onPlayAudio} />
        </>
      )}
    </div>
  );
};
