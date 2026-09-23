import React, { useEffect, useRef, useState } from 'react';
import {
  ALL_VARNAMALA_LETTERS,
  getLetterMnemonic,
  type LetterMnemonic,
} from '../data/varnamalaMnemonics';
import { playPronunciation } from '../utils/pronunciation';

interface Point {
  x: number;
  y: number;
}

interface Stroke {
  points: Point[];
  color: string;
  width: number;
}

interface VarnamalaWritingPadProps {
  initialLetter?: string;
  onOpenWorksheets?: () => void;
}

const BRUSH_COLORS = [
  { id: 'saffron', hex: '#d97706', name: 'केसर-वर्णः (Saffron)' },
  { id: 'emerald', hex: '#059669', name: 'हरितम् (Peacock Emerald)' },
  { id: 'azure', hex: '#2563eb', name: 'नीलम् (Royal Blue)' },
  { id: 'ruby', hex: '#e11d48', name: 'रक्तम् (Ruby Rose)' },
  { id: 'purple', hex: '#9333ea', name: 'काषायम् (Magic Purple)' },
];

export const VarnamalaWritingPad: React.FC<VarnamalaWritingPadProps> = ({
  initialLetter = 'अ',
  onOpenWorksheets,
}) => {
  const [selectedLetter, setSelectedLetter] = useState<string>(initialLetter);
  const [brushColor, setBrushColor] = useState<string>(BRUSH_COLORS[0].hex);
  const [brushWidth, setBrushWidth] = useState<number>(10);
  const [showGuide, setShowGuide] = useState<boolean>(true);
  const [showRuling, setShowRuling] = useState<boolean>(true);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef<boolean>(false);
  const currentStrokeRef = useRef<Stroke | null>(null);

  const mnemonic: LetterMnemonic = getLetterMnemonic(selectedLetter) || ALL_VARNAMALA_LETTERS[0];

  // Filter letters by category
  const filteredLetters = ALL_VARNAMALA_LETTERS.filter((item) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'svara') return item.group === 'svara' || item.group === 'ayogavaha';
    if (activeCategory === 'sparsha') return item.group === 'sparsha';
    if (activeCategory === 'other') return item.group === 'antastha' || item.group === 'ushmana';
    return true;
  });

  // Re-draw canvas whenever strokes, guide, or letter changes
  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw all completed strokes with smooth round caps
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    strokes.forEach((stroke) => {
      if (stroke.points.length < 1) return;
      ctx.beginPath();
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.width;

      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
      }
      ctx.stroke();
    });

    // Draw current in-progress stroke if drawing
    if (currentStrokeRef.current && currentStrokeRef.current.points.length > 0) {
      const stroke = currentStrokeRef.current;
      ctx.beginPath();
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.width;

      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
      }
      ctx.stroke();
    }
  };

  // Setup resolution and redraw
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const rect = parent.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
    redrawCanvas();
  }, [strokes, selectedLetter]);

  // Pointer event handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.setPointerCapture(e.pointerId);

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    isDrawingRef.current = true;
    currentStrokeRef.current = {
      points: [{ x, y }],
      color: brushColor,
      width: brushWidth,
    };
    redrawCanvas();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || !currentStrokeRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    currentStrokeRef.current.points.push({ x, y });
    redrawCanvas();
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    if (canvas) {
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {
        // ignore pointer capture release error if already released
      }
    }
    isDrawingRef.current = false;
    if (currentStrokeRef.current && currentStrokeRef.current.points.length > 0) {
      setStrokes((prev) => [...prev, currentStrokeRef.current!]);
    }
    currentStrokeRef.current = null;
    redrawCanvas();
  };

  const handleUndo = () => {
    setStrokes((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setStrokes([]);
    setShowCelebration(false);
  };

  const handleCheckWriting = () => {
    if (strokes.length === 0) {
      alert('Draw or trace the letter first on the canvas!');
      return;
    }
    setShowCelebration(true);
    playPronunciation(mnemonic.letter);
    setTimeout(() => {
      playPronunciation(mnemonic.wordSan);
    }, 600);
  };

  const handleSelectLetter = (char: string) => {
    setSelectedLetter(char);
    setStrokes([]);
    setShowCelebration(false);
    playPronunciation(char);
  };

  return (
    <div className="v-writing-studio" aria-label="Interactive Sanskrit Writing & Tracing Studio">
      {/* Studio Header */}
      <div className="v-writing-header">
        <div className="v-writing-title-col">
          <span className="v-writing-pill">✍️ अक्षर-लेखन-शाला · Handwriting &amp; Tracing</span>
          <h3 className="v-writing-title">Interactive Sanskrit Writing Studio</h3>
          <p className="v-writing-subtitle">
            Follow the Pāṇinian calligraphy rules: draw body curves first, and cap with the top roof
            bar (शिरोरेखा) always last!
          </p>
        </div>

        {onOpenWorksheets && (
          <button
            type="button"
            className="v-tool-btn"
            onClick={onOpenWorksheets}
            style={{
              background: '#f0fdfa',
              borderColor: '#99f6e4',
              color: '#0f766e',
              fontWeight: 800,
            }}
          >
            📑 Open Printable Worksheets →
          </button>
        )}
      </div>

      {/* Category Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '0.4rem',
          marginBottom: '0.75rem',
          flexWrap: 'wrap',
        }}
        role="tablist"
      >
        <button
          type="button"
          className={`v-tool-btn${activeCategory === 'all' ? ' v-tool-btn--active' : ''}`}
          onClick={() => setActiveCategory('all')}
        >
          All Letters (समग्रम्)
        </button>
        <button
          type="button"
          className={`v-tool-btn${activeCategory === 'svara' ? ' v-tool-btn--active' : ''}`}
          onClick={() => setActiveCategory('svara')}
        >
          स्वराः (Vowels · 13)
        </button>
        <button
          type="button"
          className={`v-tool-btn${activeCategory === 'sparsha' ? ' v-tool-btn--active' : ''}`}
          onClick={() => setActiveCategory('sparsha')}
        >
          स्पर्श-वर्गाः (क to म · 25)
        </button>
        <button
          type="button"
          className={`v-tool-btn${activeCategory === 'other' ? ' v-tool-btn--active' : ''}`}
          onClick={() => setActiveCategory('other')}
        >
          अन्तःस्थाः / ऊष्माणः (य to ह)
        </button>
      </div>

      {/* Horizontal Letter Carousel */}
      <div className="v-letter-selector-strip" role="tablist" aria-label="Select letter to write">
        {filteredLetters.map((item) => {
          const isSelected = item.letter === selectedLetter;
          return (
            <button
              key={item.letter}
              type="button"
              className={`v-letter-chip${isSelected ? ' v-letter-chip--active' : ''}`}
              onClick={() => handleSelectLetter(item.letter)}
              title={`${item.letter} (${item.iast}) — ${item.wordSan} (${item.emoji})`}
              aria-selected={isSelected}
            >
              <span>{item.letter}</span>
            </button>
          );
        })}
      </div>

      {/* Main Workspace Layout */}
      <div className="v-workspace-grid">
        {/* Left: The Drawing Slate */}
        <div className="v-canvas-container">
          {/* Top Bar of Canvas */}
          <div className="v-canvas-top-bar">
            <div className="v-canvas-badge-info">
              <span className="v-badge-char">{mnemonic.letter}</span>
              <span className="v-badge-mnemonic">
                {mnemonic.emoji} {mnemonic.wordSan} ({mnemonic.wordEn} · {mnemonic.wordHi})
              </span>
            </div>
            <button
              type="button"
              className="v-audio-speak-btn"
              onClick={() => playPronunciation(mnemonic.letter)}
              title="Hear authentic pronunciation"
            >
              🔊 Pronounce "{mnemonic.letter}"
            </button>
          </div>

          {/* Canvas Wrapper */}
          <div className="v-canvas-wrap">
            {/* 3-Line Notebook Ruling Overlay */}
            {showRuling && (
              <div className="v-ruling-overlay" aria-hidden="true">
                <div className="v-rule-topbar" />
                <div className="v-rule-midline" />
                <div className="v-rule-baseline" />
              </div>
            )}

            {/* Ghost Template to Trace Over */}
            {showGuide && (
              <div className="v-ghost-letter" aria-hidden="true">
                {mnemonic.letter}
              </div>
            )}

            {/* Actual HTML5 Drawing Canvas */}
            <canvas
              ref={canvasRef}
              className="v-drawing-canvas"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onPointerLeave={handlePointerUp}
              aria-label={`Drawing slate for letter ${mnemonic.letter}`}
            />
          </div>

          {/* Bottom Palette & Controls Bar */}
          <div className="v-palette-bar">
            {/* Color Swatches */}
            <div className="v-color-swatches" aria-label="Select brush color">
              {BRUSH_COLORS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={`v-color-btn${brushColor === c.hex ? ' v-color-btn--active' : ''}`}
                  style={{ backgroundColor: c.hex }}
                  onClick={() => setBrushColor(c.hex)}
                  title={c.name}
                  aria-label={c.name}
                />
              ))}
            </div>

            {/* Tools Group */}
            <div className="v-tools-group">
              <button
                type="button"
                className={`v-tool-btn${brushWidth === 18 ? ' v-tool-btn--active' : ''}`}
                onClick={() => setBrushWidth(brushWidth === 10 ? 18 : 10)}
                title="Toggle brush thickness"
              >
                🖊️ {brushWidth === 18 ? 'Thick' : 'Medium'}
              </button>
              <button
                type="button"
                className={`v-tool-btn${showGuide ? ' v-tool-btn--active' : ''}`}
                onClick={() => setShowGuide(!showGuide)}
                title="Toggle template guide"
              >
                👁️ {showGuide ? 'Hide Guide' : 'Show Guide'}
              </button>
              <button
                type="button"
                className={`v-tool-btn${showRuling ? ' v-tool-btn--active' : ''}`}
                onClick={() => setShowRuling(!showRuling)}
                title="Toggle 3-line ruling"
              >
                📏 Lines
              </button>
              <button
                type="button"
                className="v-tool-btn"
                onClick={handleUndo}
                title="Undo last stroke"
                disabled={strokes.length === 0}
              >
                ↩️ Undo
              </button>
              <button
                type="button"
                className="v-tool-btn"
                onClick={handleClear}
                title="Clear slate"
              >
                🗑️ Clear
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Stroke Instructions & Check Button */}
        <div className="v-guide-sidebar">
          {/* Stroke Checklist Card */}
          <div className="v-stroke-card">
            <h4 className="v-stroke-card-title">
              <span>🎯</span> Stroke Order Guide ({mnemonic.letter})
            </h4>
            <ul className="v-stroke-steps-list">
              {mnemonic.strokeOrder.map((step, idx) => (
                <li key={idx} className="v-stroke-step-item">
                  <span className="v-stroke-step-num">0{idx + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>

            <div className="v-rule-callout">
              <strong>👑 Golden Rule:</strong> The body is drawn first from left to right. The top
              bar (शिरोरेखा) is <em>always drawn last</em> to roof the letter!
            </div>
          </div>

          {/* Check / Celebrate Action Button */}
          <button
            type="button"
            className="v-submit-check-btn"
            onClick={handleCheckWriting}
          >
            <span>🎉</span> Check My Writing (परीक्षणम्)
          </button>

          {/* Celebration Banner */}
          {showCelebration && (
            <div className="v-celebration-banner">
              <h5 className="v-celebration-title">✨ अति-उत्तमम्! Outstanding!</h5>
              <p className="v-celebration-sub">
                You wrote <strong>{mnemonic.letter}</strong> ({mnemonic.wordSan} {mnemonic.emoji})
                with great precision!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
