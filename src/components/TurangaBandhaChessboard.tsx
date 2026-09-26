import React, { useState, useEffect, useRef } from 'react';

interface TurangaChessboardProps {
  onPlayAudio?: (term: string) => void;
}

// 4x8 Grid data for Vedānta Deśika's Pādukā Sahasram 929-930
// Rows 0..3 (4 Pādas of Verse 929), Cols 0..7 (8 syllables each)
// Matrix numbers indicate the chronological step (1..32) of the Knight's Tour
export const DESIKA_MATRIX: number[][] = [
  [1, 16, 21, 26, 3, 18, 23, 28],
  [20, 25, 2, 17, 22, 27, 4, 15],
  [9, 32, 13, 6, 11, 30, 7, 24],
  [12, 5, 10, 31, 8, 29, 14, 19],
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
  // Pāda 3: दुरंहसामसन्नता (8)
  { dev: 'दु', trans: 'du' },
  { dev: 'रं', trans: 'raṁ' },
  { dev: 'ह', trans: 'ha' },
  { dev: 'सां', trans: 'sāṁ' },
  { dev: 'म', trans: 'ma' },
  { dev: 'स', trans: 'sa' },
  { dev: 'न्न', trans: 'nna' },
  { dev: 'ता', trans: 'tā' },
  // Pāda 4: दा साध्या तापकरासरा (8)
  { dev: 'दा', trans: 'dā' },
  { dev: 'सा', trans: 'sā' },
  { dev: 'ध्या', trans: 'dhyā' },
  { dev: 'ता', trans: 'tā' },
  { dev: 'प', trans: 'pa' },
  { dev: 'क', trans: 'ka' },
  { dev: 'रा', trans: 'rā' },
  { dev: 'स', trans: 'sa' },
];

export const TurangaBandhaChessboard: React.FC<TurangaChessboardProps> = ({ onPlayAudio }) => {
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
            Interactive Half-Chessboard Matrix
          </span>
          <h3 style={{ margin: '0.25rem 0 0', fontSize: '1.35rem', fontWeight: 800, color: '#0f172a' }}>
            तुरङ्गबन्धः (Turaṅga-Bandha) · The Knight’s Tour Simulator
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
              onClick={() => onPlayAudio?.('स्थिता समयराजत्पा गतामदके गवि दुरंहसामसन्नतादा साध्या तापकरासरा')}
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
            दुरंहसामसन्नतादा साध्या तापकरासरा ॥ ९३० ॥
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
