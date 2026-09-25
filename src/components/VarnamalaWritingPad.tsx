import React, { useEffect, useRef, useState } from 'react';
import {
  ALL_VARNAMALA_LETTERS,
  getLetterMnemonic,
  type LetterMnemonic,
} from '../data/varnamalaMnemonics';
import {
  getLetterStrokeAnimation,
  interpolateStrokePoints,
  type StrokePoint,
} from '../data/varnamalaStrokePaths';
import { playPronunciation } from '../utils/pronunciation';
import { soundEffects } from '../utils/soundEffects';
import {
  evaluateHandwriting,
  type AssessmentResult,
} from '../utils/handwritingEvaluator';

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
  onOpenWorksheets?: (category?: string) => void;
  onOpenPuzzle?: () => void;
  onSelectLetter?: (letter: string) => void;
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
  onOpenPuzzle,
  onSelectLetter,
}) => {
  const [selectedLetter, setSelectedLetter] = useState<string>(initialLetter || 'अ');
  const [brushColor, setBrushColor] = useState<string>(BRUSH_COLORS[0].hex);
  const [brushWidth, setBrushWidth] = useState<number>(10);
  const [showGuide, setShowGuide] = useState<boolean>(true);
  const [showRuling, setShowRuling] = useState<boolean>(true);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [assessment, setAssessment] = useState<AssessmentResult | null>(null);

  // Auto-Player State
  const [isPlayingDemo, setIsPlayingDemo] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [activeStrokeIndex, setActiveStrokeIndex] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [pointerStyle, setPointerStyle] = useState<'pencil' | 'finger'>('pencil');
  const [demoStatusMessage, setDemoStatusMessage] = useState<string | null>(null);
  const [animPointerPos, setAnimPointerPos] = useState<{
    x: number;
    y: number;
    isLifting: boolean;
  } | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const demoCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef<boolean>(false);
  const currentStrokeRef = useRef<Stroke | null>(null);

  // Animation controller refs
  const animationFrameIdRef = useRef<number | null>(null);
  const liftTimeoutRef = useRef<number | null>(null);
  const isPausedRef = useRef<boolean>(false);
  const playbackSpeedRef = useRef<number>(1.0);

  const demoStateRef = useRef<{
    strokeIndex: number;
    ptIndex: number;
    finePoints: StrokePoint[];
    completedStrokes: { points: StrokePoint[] }[];
    targetSingleStroke: number | null;
  }>({
    strokeIndex: 0,
    ptIndex: 0,
    finePoints: [],
    completedStrokes: [],
    targetSingleStroke: null,
  });

  // Keep ref sync with state for instantaneous speed updates
  useEffect(() => {
    playbackSpeedRef.current = playbackSpeed;
  }, [playbackSpeed]);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  // Keep selectedLetter in sync if initialLetter prop changes from reader
  useEffect(() => {
    if (initialLetter && initialLetter !== selectedLetter) {
      setSelectedLetter(initialLetter);
      setStrokes([]);
      setAssessment(null);
      stopDemo();
    }
  }, [initialLetter]);

  const rawMnemonic = getLetterMnemonic(selectedLetter) || ALL_VARNAMALA_LETTERS[0];
  const mnemonic: LetterMnemonic = {
    ...rawMnemonic,
    strokeOrder:
      Array.isArray(rawMnemonic?.strokeOrder) && rawMnemonic.strokeOrder.length > 0
        ? rawMnemonic.strokeOrder
        : [
            '1. Draw letter curves and body',
            '2. Draw vertical standing stem',
            '3. Draw top horizontal roof bar (शिरोरेखा) last',
          ],
  };

  const animData = getLetterStrokeAnimation(selectedLetter);

  // Filter letters by category
  const filteredLetters = ALL_VARNAMALA_LETTERS.filter((item) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'svara') return item.group === 'svara' || item.group === 'ayogavaha';
    if (activeCategory === 'sparsha') return item.group === 'sparsha';
    if (activeCategory === 'other') return item.group === 'antastha' || item.group === 'ushmana' || item.group === 'samyukta';
    return true;
  });

  // Next letter in sequence for quick progression
  const currentLetterIdx = ALL_VARNAMALA_LETTERS.findIndex((item) => item.letter === selectedLetter);
  const nextLetterItem =
    currentLetterIdx >= 0
      ? ALL_VARNAMALA_LETTERS[(currentLetterIdx + 1) % ALL_VARNAMALA_LETTERS.length]
      : null;

  // Re-draw user canvas whenever user strokes change
  const redrawCanvas = () => {
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (Array.isArray(strokes)) {
        for (const stroke of strokes) {
          if (!stroke || !Array.isArray(stroke.points) || stroke.points.length < 1) continue;
          const pts = stroke.points;
          if (!pts[0] || typeof pts[0].x !== 'number' || isNaN(pts[0].x)) continue;

          ctx.beginPath();
          ctx.strokeStyle = stroke.color || '#d97706';
          ctx.lineWidth = stroke.width || 10;

          ctx.moveTo(pts[0].x, pts[0].y);
          for (let i = 1; i < pts.length; i++) {
            if (pts[i] && typeof pts[i].x === 'number' && !isNaN(pts[i].x)) {
              ctx.lineTo(pts[i].x, pts[i].y);
            }
          }
          ctx.stroke();
        }
      }

      // Draw current in-progress user stroke
      if (
        currentStrokeRef.current &&
        Array.isArray(currentStrokeRef.current.points) &&
        currentStrokeRef.current.points.length > 0
      ) {
        const stroke = currentStrokeRef.current;
        const pts = stroke.points;
        if (pts[0] && typeof pts[0].x === 'number' && !isNaN(pts[0].x)) {
          ctx.beginPath();
          ctx.strokeStyle = stroke.color || '#d97706';
          ctx.lineWidth = stroke.width || 10;

          ctx.moveTo(pts[0].x, pts[0].y);
          for (let i = 1; i < pts.length; i++) {
            if (pts[i] && typeof pts[i].x === 'number' && !isNaN(pts[i].x)) {
              ctx.lineTo(pts[i].x, pts[i].y);
            }
          }
          ctx.stroke();
        }
      }
    } catch (err) {
      console.warn('Canvas redraw error safely caught:', err);
    }
  };

  // Re-draw demo canvas
  const redrawDemoCanvas = (currentPoints?: StrokePoint[]) => {
    try {
      const demoCanvas = demoCanvasRef.current;
      if (!demoCanvas) return;
      const ctx = demoCanvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, demoCanvas.width, demoCanvas.height);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'rgba(245, 158, 11, 0.45)';

      const dpr = window.devicePixelRatio || 1;
      const width = demoCanvas.width / dpr;
      const height = demoCanvas.height / dpr;

      if (Array.isArray(demoStateRef.current.completedStrokes)) {
        demoStateRef.current.completedStrokes.forEach((s) => {
          if (!s || !Array.isArray(s.points) || s.points.length < 1) return;
          ctx.beginPath();
          ctx.strokeStyle = '#f59e0b';
          ctx.lineWidth = 14;

          const p0x = (s.points[0].x / 100) * width;
          const p0y = (s.points[0].y / 100) * height;
          ctx.moveTo(p0x, p0y);

          for (let i = 1; i < s.points.length; i++) {
            ctx.lineTo((s.points[i].x / 100) * width, (s.points[i].y / 100) * height);
          }
          ctx.stroke();
        });
      }

      if (currentPoints && Array.isArray(currentPoints) && currentPoints.length > 0) {
        ctx.beginPath();
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 14;

        const p0x = (currentPoints[0].x / 100) * width;
        const p0y = (currentPoints[0].y / 100) * height;
        ctx.moveTo(p0x, p0y);

        for (let i = 1; i < currentPoints.length; i++) {
          ctx.lineTo((currentPoints[i].x / 100) * width, (currentPoints[i].y / 100) * height);
        }
        ctx.stroke();
      }
    } catch (err) {
      console.warn('Demo canvas redraw error safely caught:', err);
    }
  };

  // Setup resolution for both drawing canvas and demo canvas
  const updateCanvasDimensions = () => {
    try {
      const canvas = canvasRef.current;
      const demoCanvas = demoCanvasRef.current;
      if (!canvas || !canvas.parentElement) return;

      const parent = canvas.parentElement;
      const rect = parent.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      const targetWidth = Math.round(rect.width * dpr);
      const targetHeight = Math.round(rect.height * dpr);

      let changed = false;
      if (Math.abs(canvas.width - targetWidth) > 2 || Math.abs(canvas.height - targetHeight) > 2) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) ctx.scale(dpr, dpr);
        changed = true;
      }

      if (demoCanvas) {
        if (Math.abs(demoCanvas.width - targetWidth) > 2 || Math.abs(demoCanvas.height - targetHeight) > 2) {
          demoCanvas.width = targetWidth;
          demoCanvas.height = targetHeight;
          const demoCtx = demoCanvas.getContext('2d');
          if (demoCtx) demoCtx.scale(dpr, dpr);
          changed = true;
        }
      }

      if (changed) {
        redrawCanvas();
        redrawDemoCanvas();
      }
    } catch (err) {
      console.warn('Canvas sizing error safely handled:', err);
    }
  };

  // Mount & container resize listener
  useEffect(() => {
    // Initial size calculation once container layout settles
    const timer = window.setTimeout(() => {
      updateCanvasDimensions();
    }, 50);

    let rafId: number | null = null;
    const handleResize = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        updateCanvasDimensions();
      });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.clearTimeout(timer);
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  // Redraw user strokes when strokes array changes without wiping canvas backing buffer
  useEffect(() => {
    redrawCanvas();
  }, [strokes]);

  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
      if (liftTimeoutRef.current) clearTimeout(liftTimeoutRef.current);
    };
  }, []);

  // ==========================================
  // AUTO-PLAYER ANIMATION ENGINE
  // ==========================================

  const stopDemo = () => {
    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
      animationFrameIdRef.current = null;
    }
    if (liftTimeoutRef.current) {
      clearTimeout(liftTimeoutRef.current);
      liftTimeoutRef.current = null;
    }
    setIsPlayingDemo(false);
    setIsPaused(false);
    setActiveStrokeIndex(0);
    setAnimPointerPos(null);
    setDemoStatusMessage(null);

    // Clear demo canvas
    const demoCanvas = demoCanvasRef.current;
    if (demoCanvas) {
      const ctx = demoCanvas.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, demoCanvas.width, demoCanvas.height);
    }
    demoStateRef.current = {
      strokeIndex: 0,
      ptIndex: 0,
      finePoints: [],
      completedStrokes: [],
      targetSingleStroke: null,
    };
  };

  const runAnimationStep = () => {
    if (isPausedRef.current) return;

    const animData = getLetterStrokeAnimation(selectedLetter);
    const { strokeIndex, finePoints, targetSingleStroke } = demoStateRef.current;

    if (strokeIndex >= animData.strokes.length) {
      // Completed all strokes
      handleDemoFinished();
      return;
    }

    const currentStrokeData = animData.strokes[strokeIndex];
    const ptIndex = demoStateRef.current.ptIndex;

    if (ptIndex < finePoints.length) {
      // Draw in-progress segment
      const renderedPoints = finePoints.slice(0, ptIndex + 1);
      redrawDemoCanvas(renderedPoints);

      const currPt = finePoints[ptIndex];
      setAnimPointerPos({
        x: currPt.x,
        y: currPt.y,
        isLifting: false,
      });

      // Advance by step speed
      const stepIncrement = Math.max(1, Math.round(1.6 * playbackSpeedRef.current));
      demoStateRef.current.ptIndex = Math.min(finePoints.length, ptIndex + stepIncrement);

      animationFrameIdRef.current = requestAnimationFrame(runAnimationStep);
    } else {
      // Finished this stroke!
      demoStateRef.current.completedStrokes.push({
        points: [...finePoints],
      });
      redrawDemoCanvas();

      // Check if this was a single stroke request or the final stroke
      const isSingleTargetDone =
        targetSingleStroke !== null && currentStrokeData.strokeIndex === targetSingleStroke;
      const isLastStroke = strokeIndex + 1 >= animData.strokes.length;

      if (isSingleTargetDone || isLastStroke) {
        handleDemoFinished();
      } else {
        // Prepare next stroke with pencil lift-off animation
        const lastPt = finePoints[finePoints.length - 1];
        setAnimPointerPos({
          x: lastPt.x,
          y: lastPt.y,
          isLifting: true,
        });

        const nextStrokeIndex = strokeIndex + 1;
        demoStateRef.current.strokeIndex = nextStrokeIndex;
        const nextStroke = animData.strokes[nextStrokeIndex];
        demoStateRef.current.finePoints = interpolateStrokePoints(nextStroke.points, 16);
        demoStateRef.current.ptIndex = 0;

        setActiveStrokeIndex(nextStroke.strokeIndex);
        setDemoStatusMessage(
          `Stroke ${nextStroke.strokeIndex} of ${animData.strokes.length}: ${nextStroke.label}`
        );

        const liftDuration = Math.max(180, Math.round(340 / playbackSpeedRef.current));
        liftTimeoutRef.current = window.setTimeout(() => {
          if (!isPausedRef.current) {
            animationFrameIdRef.current = requestAnimationFrame(runAnimationStep);
          }
        }, liftDuration);
      }
    }
  };

  const handleDemoFinished = () => {
    setIsPlayingDemo(false);
    setActiveStrokeIndex(0);
    setDemoStatusMessage('✨ उत्कृष्टम्! Now it is your turn to trace!');
    try {
      playPronunciation(mnemonic.letter);
    } catch (e) {
      console.warn('Speech pronunciation unavailable:', e);
    }

    // Gently glide away pencil tip after a moment
    if (liftTimeoutRef.current) clearTimeout(liftTimeoutRef.current);
    liftTimeoutRef.current = window.setTimeout(() => {
      setAnimPointerPos(null);
    }, 1200);
  };

  const startDemo = (targetStroke: number | null = null) => {
    stopDemo();

    const animData = getLetterStrokeAnimation(selectedLetter);
    if (!animData || animData.strokes.length === 0) return;

    setIsPlayingDemo(true);
    setIsPaused(false);
    setAssessment(null);

    let initialIndex = 0;
    if (targetStroke !== null) {
      const foundIdx = animData.strokes.findIndex((s) => s.strokeIndex === targetStroke);
      if (foundIdx !== -1) initialIndex = foundIdx;
    }

    const firstStroke = animData.strokes[initialIndex];
    demoStateRef.current = {
      strokeIndex: initialIndex,
      ptIndex: 0,
      finePoints: interpolateStrokePoints(firstStroke.points, 16),
      completedStrokes: [],
      targetSingleStroke: targetStroke,
    };

    setActiveStrokeIndex(firstStroke.strokeIndex);
    setDemoStatusMessage(
      `Stroke ${firstStroke.strokeIndex} of ${animData.strokes.length}: ${firstStroke.label}`
    );

    // Position pointer at initial start point
    const p0 = firstStroke.points[0];
    setAnimPointerPos({
      x: p0.x,
      y: p0.y,
      isLifting: true,
    });

    const initialDelay = Math.max(150, Math.round(260 / playbackSpeedRef.current));
    liftTimeoutRef.current = window.setTimeout(() => {
      animationFrameIdRef.current = requestAnimationFrame(runAnimationStep);
    }, initialDelay);
  };

  const handleTogglePause = () => {
    if (!isPlayingDemo) return;
    if (isPaused) {
      setIsPaused(false);
      isPausedRef.current = false;
      animationFrameIdRef.current = requestAnimationFrame(runAnimationStep);
    } else {
      setIsPaused(true);
      isPausedRef.current = true;
      if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
      if (liftTimeoutRef.current) clearTimeout(liftTimeoutRef.current);
    }
  };

  const handlePlaySingleStroke = (strokeNumber: number) => {
    startDemo(strokeNumber);
  };

  // Pointer event handlers for user drawing
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      canvas.setPointerCapture(e.pointerId);
    } catch {
      // ignore InvalidPointerId if capture cannot be set
    }

    const rect = canvas.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);

    isDrawingRef.current = true;
    soundEffects.playStrokeChime();
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
    if (rect.width <= 0 || rect.height <= 0) return;
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);

    currentStrokeRef.current.points.push({ x, y });
    redrawCanvas();
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    if (canvas) {
      try {
        if (canvas.hasPointerCapture && canvas.hasPointerCapture(e.pointerId)) {
          canvas.releasePointerCapture(e.pointerId);
        }
      } catch {
        // ignore pointer capture release error if already released
      }
    }
    isDrawingRef.current = false;
    const finished = currentStrokeRef.current;
    currentStrokeRef.current = null;

    if (finished && Array.isArray(finished.points) && finished.points.length > 0) {
      // Store immutable clone so reference mutations cannot corrupt stroke history
      const strokeClone: Stroke = {
        points: finished.points.map((p) => ({ x: p.x, y: p.y })),
        color: finished.color,
        width: finished.width,
      };
      setStrokes((prev) => [...prev, strokeClone]);
    }
  };

  const handleUndo = () => {
    setStrokes((prev) => {
      const next = prev.slice(0, -1);
      if (next.length === 0) setAssessment(null);
      return next;
    });
  };

  const handleClear = () => {
    setStrokes([]);
    setAssessment(null);
    stopDemo();
  };

  const handleCheckWriting = () => {
    const canvas = canvasRef.current;
    const rect = canvas ? canvas.getBoundingClientRect() : null;
    const width = rect && rect.width > 0 ? rect.width : (canvas?.width || 400);
    const height = rect && rect.height > 0 ? rect.height : (canvas?.height || 400);

    const strokeAnim = animData || getLetterStrokeAnimation(selectedLetter);
    const result = evaluateHandwriting(strokes, width, height, strokeAnim, mnemonic);
    setAssessment(result);

    if (result.score >= 80) {
      soundEffects.playCelebrationChime();
    } else if (result.score >= 55) {
      soundEffects.playSuccessDing();
    } else {
      soundEffects.playEncouragementDing();
    }

    try {
      playPronunciation(mnemonic.letter);
      if (result.score >= 55) {
        setTimeout(() => {
          try {
            playPronunciation(mnemonic.wordSan);
          } catch {
            // ignore speech failure
          }
        }, 650);
      }
    } catch {
      // ignore speech failure
    }
  };

  const handleSelectLetter = (char: string) => {
    stopDemo();
    setSelectedLetter(char);
    setStrokes([]);
    setAssessment(null);
    onSelectLetter?.(char);
    soundEffects.playStrokeChime();
    try {
      playPronunciation(char);
    } catch {
      // ignore speech failure
    }
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
            onClick={() => onOpenWorksheets('varnamala')}
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
          स्वराः (Vowels · 15)
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

      {/* Animated Stroke Auto-Player Control Deck */}
      <div className="v-player-control-deck" aria-label="Stroke Auto-Player Controls">
        <div className="v-player-actions-row">
          {!isPlayingDemo ? (
            <button
              type="button"
              className="v-play-demo-btn"
              onClick={() => startDemo(null)}
              title="Watch animated stroke-by-stroke handwriting demo"
            >
              <span className="v-btn-icon">▶️</span>
              <span className="v-btn-text">Watch How to Write (लेखन-प्रदर्शनम्)</span>
            </button>
          ) : (
            <div className="v-player-running-group">
              <button
                type="button"
                className="v-player-action-btn v-btn-pause"
                onClick={handleTogglePause}
                title={isPaused ? 'Resume stroke animation' : 'Pause stroke animation'}
              >
                {isPaused ? '▶️ Resume' : '⏸️ Pause'}
              </button>
              <button
                type="button"
                className="v-player-action-btn v-btn-stop"
                onClick={stopDemo}
                title="Stop animation and trace freely"
              >
                ⏹️ Stop
              </button>
              <button
                type="button"
                className="v-player-action-btn v-btn-replay"
                onClick={() => startDemo(null)}
                title="Replay from stroke 1"
              >
                🔄 Replay
              </button>
            </div>
          )}

          {/* Live Demo Status Pill */}
          {demoStatusMessage && (
            <div className="v-demo-status-pill" role="status" aria-live="polite">
              <span className="v-status-dot" />
              <span>{demoStatusMessage}</span>
            </div>
          )}
        </div>

        {/* Speed & Pointer Style Options */}
        <div className="v-player-options-row">
          <div className="v-player-option-group">
            <span className="v-option-label">Speed:</span>
            {[0.75, 1.0, 1.5].map((spd) => (
              <button
                key={spd}
                type="button"
                className={`v-speed-chip${playbackSpeed === spd ? ' v-speed-chip--active' : ''}`}
                onClick={() => setPlaybackSpeed(spd)}
              >
                {spd === 0.75 ? '0.75x Slow' : spd === 1.0 ? '1x Normal' : '1.5x Fast'}
              </button>
            ))}
          </div>

          <div className="v-player-option-group">
            <span className="v-option-label">Pointer:</span>
            <button
              type="button"
              className={`v-speed-chip${pointerStyle === 'pencil' ? ' v-speed-chip--active' : ''}`}
              onClick={() => setPointerStyle('pencil')}
              title="Magic Cartoon Pencil"
            >
              ✏️ Pencil
            </button>
            <button
              type="button"
              className={`v-speed-chip${pointerStyle === 'finger' ? ' v-speed-chip--active' : ''}`}
              onClick={() => setPointerStyle('finger')}
              title="Guide Finger"
            >
              👆 Finger
            </button>
          </div>
        </div>
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
            <div className="v-canvas-audio-group">
              <button
                type="button"
                className="v-audio-speak-btn"
                onClick={() => {
                  soundEffects.playStrokeChime();
                  playPronunciation(mnemonic.letter);
                }}
                title={`Hear letter sound: ${mnemonic.letter}`}
              >
                🔊 Letter: {mnemonic.letter}
              </button>

              <button
                type="button"
                className="v-audio-speak-btn v-audio-speak-btn--word"
                onClick={() => {
                  soundEffects.playSuccessDing();
                  playPronunciation(mnemonic.wordSan);
                }}
                title={`Hear word pronunciation: ${mnemonic.wordSan}`}
              >
                🔊 Word: {mnemonic.wordSan}
              </button>

              {onOpenPuzzle && (
                <button
                  type="button"
                  className="v-puzzle-link-btn"
                  onClick={() => {
                    soundEffects.playSuccessDing();
                    onOpenPuzzle();
                  }}
                  title="Practice letters in interactive Jodo Tile Puzzle"
                >
                  🧩 Tile Puzzle →
                </button>
              )}
            </div>
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

            {/* Precise SVG Vector Stroke Guide Template */}
            {showGuide && (
              animData && animData.strokes.length > 0 ? (
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="v-guide-svg"
                  aria-hidden="true"
                >
                  {animData.strokes.map((stroke, sIdx) => {
                    const pts = stroke.points;
                    if (!pts || pts.length === 0) return null;
                    const d = pts.reduce((acc, pt, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`, '');
                    const p0 = pts[0];
                    const badges = ['①', '②', '③', '④', '⑤', '⑥'];
                    return (
                      <g key={sIdx}>
                        {/* Outer translucent guide path */}
                        <path
                          d={d}
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="11"
                          className="v-guide-stroke-outer"
                        />
                        {/* Inner dashed directional path */}
                        <path
                          d={d}
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.2"
                          strokeDasharray="2.5 2.5"
                          className="v-guide-stroke-inner"
                        />
                        {/* Numbered start point badge */}
                        <g className="v-guide-start-badge">
                          <circle cx={p0.x} cy={p0.y} r="3.6" fill="#f59e0b" stroke="#ffffff" strokeWidth="1" />
                          <text
                            x={p0.x}
                            y={p0.y + 1.2}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill="#ffffff"
                            fontSize="2.7"
                            fontWeight="bold"
                          >
                            {badges[sIdx] || sIdx + 1}
                          </text>
                        </g>
                      </g>
                    );
                  })}
                </svg>
              ) : (
                <div className="v-ghost-letter" aria-hidden="true">
                  {mnemonic.letter}
                </div>
              )
            )}

            {/* Automated Stroke Animation Canvas (Overlay Layer) */}
            <canvas ref={demoCanvasRef} className="v-demo-canvas" aria-hidden="true" />

            {/* Actual HTML5 User Drawing Canvas */}
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

            {/* Floating Animated Pencil / Finger Pointer */}
            {animPointerPos && (
              <div
                className={`v-animated-pointer${
                  animPointerPos.isLifting ? ' v-pointer--lifting' : ''
                }${pointerStyle === 'finger' ? ' v-pointer--finger' : ''}`}
                style={{
                  left: `${animPointerPos.x}%`,
                  top: `${animPointerPos.y}%`,
                }}
                aria-hidden="true"
              >
                <div className="v-pointer-glow-halo" />
                <span className="v-pointer-symbol">
                  {pointerStyle === 'pencil' ? '✏️' : '👆'}
                </span>
              </div>
            )}
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
              {(mnemonic?.strokeOrder || []).map((step, idx) => {
                const isCurrentStroke = isPlayingDemo && activeStrokeIndex === idx + 1;
                return (
                  <li
                    key={idx}
                    className={`v-stroke-step-item${
                      isCurrentStroke ? ' v-stroke-step-item--active' : ''
                    }`}
                  >
                    <div className="v-stroke-step-top">
                      <span className="v-stroke-step-num">
                        {isCurrentStroke ? '✍️ 0' + (idx + 1) : '0' + (idx + 1)}
                      </span>
                      <div className="v-step-btn-group">
                        <button
                          type="button"
                          className="v-step-demo-btn"
                          onClick={() => {
                            soundEffects.playStrokeChime();
                            handlePlaySingleStroke(idx + 1);
                          }}
                          title={`Watch stroke ${idx + 1} animation`}
                        >
                          ▶ Watch
                        </button>
                        <button
                          type="button"
                          className="v-step-audio-btn"
                          onClick={() => {
                            soundEffects.playSuccessDing();
                            playPronunciation(step);
                          }}
                          title={`Listen to step ${idx + 1} instructions`}
                        >
                          🔊 Step
                        </button>
                      </div>
                    </div>
                    <span className="v-stroke-step-text">{step}</span>
                  </li>
                );
              })}
            </ul>

            <div className="v-rule-callout">
              <strong>👑 Golden Rule:</strong> The body is drawn first from left to right. The top
              bar (शिरोरेखा) is <em>always drawn last</em> to roof the letter!
            </div>
          </div>

          {/* Check / Evaluate Action Button */}
          <button
            type="button"
            className="v-submit-check-btn"
            onClick={handleCheckWriting}
          >
            <span>✍️</span> Check My Writing (परीक्षणम्)
          </button>

          {/* Dynamic Handwriting Assessment Card */}
          {assessment && (
            <div
              className={`v-assessment-card v-assessment-card--${assessment.grade}`}
              role="region"
              aria-label="Handwriting Assessment Result"
            >
              <div className="v-assessment-header">
                <h5 className="v-assessment-title">
                  <span>{assessment.badgeEmoji}</span>
                  <span>{assessment.title}</span>
                </h5>
                <div
                  className="v-assessment-stars"
                  aria-label={`${assessment.stars} out of 5 stars`}
                >
                  {'⭐'.repeat(assessment.stars)}
                </div>
              </div>

              {/* Metrics pills: Score, Coverage, Precision, Stroke Count */}
              <div className="v-assessment-metrics">
                <span className="v-metric-pill">
                  🎯 Score: <strong>{assessment.score}%</strong>
                </span>
                <span className="v-metric-pill">
                  📐 Coverage: <strong>{assessment.coveragePct}%</strong>
                </span>
                <span className="v-metric-pill">
                  ✨ Precision: <strong>{assessment.precisionPct}%</strong>
                </span>
                <span className="v-metric-pill">
                  ✍️ Strokes: <strong>{assessment.strokeCount.message}</strong>
                </span>
              </div>

              {/* Pāṇinian Rule / Shirorekha Callout */}
              {assessment.shirorekhaCheck && (
                <div className="v-assessment-rule-callout">
                  <span>{assessment.shirorekhaCheck.message}</span>
                </div>
              )}

              <p className="v-assessment-feedback">{assessment.feedback}</p>

              <div className="v-assessment-tip">
                <strong>💡 Calligraphy Tip: </strong>
                <span>{assessment.calligraphyTip}</span>
              </div>

              {/* Quick Actions: Try Again, Watch Demo, Next Letter */}
              <div className="v-assessment-actions">
                <button
                  type="button"
                  className="v-assessment-btn"
                  onClick={handleClear}
                  title="Clear slate and practice this letter again"
                >
                  <span>🔄</span> Try Again
                </button>
                <button
                  type="button"
                  className="v-assessment-btn"
                  onClick={() => startDemo(null)}
                  title="Watch stroke animation demo"
                >
                  <span>▶️</span> Watch Demo
                </button>
                {nextLetterItem && (
                  <button
                    type="button"
                    className="v-assessment-btn v-assessment-btn--primary"
                    onClick={() => handleSelectLetter(nextLetterItem.letter)}
                    title={`Move to next letter (${nextLetterItem.letter})`}
                  >
                    <span>Next: {nextLetterItem.letter}</span> ➔
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
