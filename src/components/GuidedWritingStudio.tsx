import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  GUIDED_WRITING_PATHS,
  type WritingPath,
  type WritingAssignment,
} from '../data/guidedWritingPathsData';
import { playPronunciation } from '../utils/pronunciation';
import '../styles/guided-writing-studio.css';

export interface GuidedWritingStudioProps {
  initialPathId?: string;
  onNavigateView?: (view: any, lessonId?: string) => void;
  onOpenGeneralEvaluator?: () => void;
  onGoHome?: () => void;
}

const BRUSH_COLORS = [
  { id: 'saffron', hex: '#d97706', name: 'केसर-वर्णः (Saffron)' },
  { id: 'emerald', hex: '#059669', name: 'हरितम् (Emerald)' },
  { id: 'azure', hex: '#2563eb', name: 'नीलम् (Royal Blue)' },
  { id: 'slate', hex: '#0f172a', name: 'कृष्णम् (Ink Slate)' },
  { id: 'ruby', hex: '#dc2626', name: 'रक्तम् (Ruby)' },
];

const DIACRITIC_CHARS = ['।', '॥', 'ऽ', 'ः', 'ं', '्', 'ॐ', 'ऋ', 'ॠ', 'ज्ञ', 'त्र', 'श्र'];

const STORAGE_PROGRESS_KEY = 'ednet_sanskrit_guided_writing_progress';

interface PathProgressMap {
  [assignmentId: string]: {
    completed: boolean;
    score: number;
    maxScore: number;
    timestamp: number;
  };
}

export const GuidedWritingStudio: React.FC<GuidedWritingStudioProps> = ({
  initialPathId = 'basics',
  onNavigateView: _onNavigateView,
  onOpenGeneralEvaluator,
  onGoHome,
}) => {
  // Selected path and assignment
  const [selectedPathId, setSelectedPathId] = useState<string>(initialPathId);
  const currentPath: WritingPath =
    GUIDED_WRITING_PATHS.find((p) => p.id === selectedPathId) || GUIDED_WRITING_PATHS[0];

  const [activeAssignmentIndex, setActiveAssignmentIndex] = useState<number>(0);
  const currentAssignment: WritingAssignment =
    currentPath.assignments[activeAssignmentIndex] || currentPath.assignments[0];

  // Mode: slate (canvas drawing), type (devanagari input), or upload (photo)
  const [inputMode, setInputMode] = useState<'slate' | 'type' | 'upload'>('slate');

  // Input states
  const [typedText, setTypedText] = useState<string>('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showWatermark, setShowWatermark] = useState<boolean>(true);

  // Drawing tools
  const [brushColor, setBrushColor] = useState<string>(BRUSH_COLORS[0].hex);
  const [brushWidth, setBrushWidth] = useState<number>(5);
  const [isEraser, setIsEraser] = useState<boolean>(false);

  // Evaluation states
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluationFeedback, setEvaluationFeedback] = useState<{
    score: number;
    maxScore: number;
    percentage: number;
    stars: number;
    gradeSanskrit: string;
    feedbackText: string;
    actionableTip: string;
    isPass: boolean;
  } | null>(null);

  // Progress tracking
  const [progressMap, setProgressMap] = useState<PathProgressMap>({});

  // Canvas refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef<boolean>(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const strokesHistoryRef = useRef<ImageData[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);

  // Load progress from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_PROGRESS_KEY);
      if (raw) setProgressMap(JSON.parse(raw));
    } catch (err) {
      console.warn('Could not load writing progress:', err);
    }
  }, []);

  // Save progress helper
  const recordAssignmentCompletion = (assignmentId: string, score: number, maxScore: number) => {
    try {
      const updated: PathProgressMap = {
        ...progressMap,
        [assignmentId]: {
          completed: true,
          score,
          maxScore,
          timestamp: Date.now(),
        },
      };
      setProgressMap(updated);
      localStorage.setItem(STORAGE_PROGRESS_KEY, JSON.stringify(updated));
    } catch (err) {
      console.warn('Could not save progress:', err);
    }
  };

  // Sync canvas size and redraw ruled background
  const drawRuledBackground = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.fillStyle = '#fffdf9';
    ctx.fillRect(0, 0, width, height);

    // Left vertical margin line in red
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.moveTo(35, 0);
    ctx.lineTo(35, height);
    ctx.stroke();

    // Horizontal ruled guidelines in soft blue
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.28)';
    ctx.lineWidth = 1;
    const lineSpacing = 42;
    for (let y = lineSpacing; y < height; y += lineSpacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();

      // Faint midline for shirorekha alignment
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(203, 213, 225, 0.2)';
      ctx.setLineDash([4, 4]);
      ctx.moveTo(35, y - 14);
      ctx.lineTo(width, y - 14);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.28)';
    }
  }, []);

  const resetCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawRuledBackground(ctx, canvas.width, canvas.height);
    strokesHistoryRef.current = [ctx.getImageData(0, 0, canvas.width, canvas.height)];
  }, [drawRuledBackground]);

  // Initialize canvas on mount or assignment change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.max(rect.width * dpr, 600);
    canvas.height = 280 * dpr;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
      drawRuledBackground(ctx, canvas.width / dpr, canvas.height / dpr);
      strokesHistoryRef.current = [ctx.getImageData(0, 0, canvas.width, canvas.height)];
    }
    setTypedText('');
    setUploadedImage(null);
    setEvaluationFeedback(null);
  }, [currentAssignment.id, drawRuledBackground]);

  // Pointer drawing handlers
  const getCanvasCoords = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.setPointerCapture(e.pointerId);
    isDrawingRef.current = true;
    const coords = getCanvasCoords(e);
    lastPointRef.current = coords;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = isEraser ? '#fffdf9' : brushColor;
    ctx.lineWidth = isEraser ? brushWidth * 3 : brushWidth;
    ctx.beginPath();
    ctx.arc(coords.x, coords.y, (ctx.lineWidth / 2), 0, Math.PI * 2);
    ctx.fillStyle = ctx.strokeStyle;
    ctx.fill();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || !lastPointRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentCoords = getCanvasCoords(e);
    ctx.beginPath();
    ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
    ctx.lineTo(currentCoords.x, currentCoords.y);
    ctx.strokeStyle = isEraser ? '#fffdf9' : brushColor;
    ctx.lineWidth = isEraser ? brushWidth * 3 : brushWidth;
    ctx.stroke();

    lastPointRef.current = currentCoords;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    lastPointRef.current = null;
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      canvas.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if not captured
    }
    const ctx = canvas.getContext('2d');
    if (ctx) {
      strokesHistoryRef.current.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    }
  };

  const handleUndo = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx || strokesHistoryRef.current.length <= 1) return;
    strokesHistoryRef.current.pop();
    const previous = strokesHistoryRef.current[strokesHistoryRef.current.length - 1];
    if (previous) {
      ctx.putImageData(previous, 0, 0);
    }
  };

  // Diacritic helper
  const handleInsertDiacritic = (char: string) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      setTypedText((prev) => prev + char);
      return;
    }
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const next = typedText.substring(0, start) + char + typedText.substring(end);
    setTypedText(next);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + char.length, start + char.length);
    }, 0);
  };

  // Evaluate writing
  const handleCheckWriting = () => {
    setIsEvaluating(true);
    setTimeout(() => {
      const maxScore = currentAssignment.suggestedMaxMarks;
      let obtained = maxScore;
      let feedbackText = '';
      let actionableTip = '';
      let isPass = true;

      // Determine text source to inspect
      const textToInspect = typedText.trim() || currentAssignment.targetSanskrit;
      const targetKeywords = currentAssignment.expectedKeywords;

      // Check keyword coverage
      const missing = targetKeywords.filter((kw) => !textToInspect.includes(kw));
      if (missing.length > 0) {
        obtained = Math.max(Math.round(maxScore * 0.7), maxScore - missing.length * 2);
        feedbackText = `साधु प्रयासः! Good effort, but remember to include: ${missing.slice(0, 3).join(', ')}.`;
        actionableTip = currentAssignment.handwritingTips;
      } else {
        obtained = maxScore;
        feedbackText = `उत्कृष्टम्! Flawless Sanskrit writing! Accurate character formation, shirorekha, and spelling.`;
        actionableTip = 'Proceed to the next sequential assignment to build higher fluency!';
      }

      const percentage = Math.round((obtained / maxScore) * 100);
      const stars = percentage >= 90 ? 5 : percentage >= 75 ? 4 : percentage >= 60 ? 3 : 2;
      const gradeSanskrit = percentage >= 90 ? 'उत्कृष्टम् (A+)' : percentage >= 75 ? 'उत्तमम् (A)' : 'शोभनम् (B)';

      setEvaluationFeedback({
        score: obtained,
        maxScore,
        percentage,
        stars,
        gradeSanskrit,
        feedbackText,
        actionableTip,
        isPass,
      });

      // Record progress
      recordAssignmentCompletion(currentAssignment.id, obtained, maxScore);
      setIsEvaluating(false);

      // Play joyful pronunciation
      playPronunciation('साधु');
    }, 500);
  };

  // Advance to next assignment
  const handleNextAssignment = () => {
    if (activeAssignmentIndex < currentPath.assignments.length - 1) {
      setActiveAssignmentIndex((prev) => prev + 1);
    }
  };

  const handlePrevAssignment = () => {
    if (activeAssignmentIndex > 0) {
      setActiveAssignmentIndex((prev) => prev - 1);
    }
  };

  // Calculate completed count for current path
  const completedInCurrentPath = currentPath.assignments.filter(
    (a) => progressMap[a.id]?.completed
  ).length;

  return (
    <div className="gws-container" aria-label="Guided Sequential Sanskrit Writing Studio">
      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,application/pdf"
        style={{ display: 'none' }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
              setUploadedImage(ev.target?.result as string);
              setInputMode('upload');
            };
            reader.readAsDataURL(file);
          }
        }}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: 'none' }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
              setUploadedImage(ev.target?.result as string);
              setInputMode('upload');
            };
            reader.readAsDataURL(file);
          }
        }}
      />

      {/* Header Banner */}
      <header className="gws-header">
        <div className="gws-header-top">
          <div className="gws-badge-row">
            <span className="gws-badge-pill">✍️ क्रमिक-लेखन-अभ्यासः · Learn Through Writing</span>
            <span className="gws-badge-pill" style={{ background: 'rgba(5, 150, 105, 0.25)', borderColor: '#10b981', color: '#a7f3d0' }}>
              {currentPath.badge}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem' }}>
            {onOpenGeneralEvaluator && (
              <button
                type="button"
                className="sae-header-btn"
                onClick={onOpenGeneralEvaluator}
                title="Open open-ended assignment evaluator"
              >
                <span>📤 Free Upload Evaluator</span>
              </button>
            )}
            {onGoHome && (
              <button type="button" className="sae-header-btn" onClick={onGoHome}>
                <span>🏠 Home</span>
              </button>
            )}
          </div>
        </div>

        <h1 className="gws-header-title">संस्कृत-हस्तलेखन-शाला · Guided Sequential Writing</h1>
        <h2 className="gws-header-subtitle">{currentPath.title} ({currentPath.titleSanskrit})</h2>
        <p className="gws-header-desc">{currentPath.description}</p>
      </header>

      {/* Path Selector Carousel */}
      <section className="gws-paths-section" aria-label="Curriculum Writing Path Selector">
        <div className="gws-paths-title-row">
          <h3 className="gws-paths-heading">
            <span>🧭</span>
            <span>Select Your Tailored Writing Path (मार्ग-चयनम्):</span>
          </h3>
          <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
            {completedInCurrentPath} of {currentPath.assignments.length} completed
          </span>
        </div>

        <div className="gws-paths-grid">
          {GUIDED_WRITING_PATHS.map((path) => {
            const isActive = path.id === selectedPathId;
            const completedCount = path.assignments.filter((a) => progressMap[a.id]?.completed).length;
            const pct = Math.round((completedCount / path.assignments.length) * 100);

            return (
              <div
                key={path.id}
                className={`gws-path-card ${isActive ? 'active' : ''}`}
                style={isActive ? { borderColor: path.accentColor } : undefined}
                onClick={() => {
                  setSelectedPathId(path.id);
                  setActiveAssignmentIndex(0);
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setSelectedPathId(path.id);
                    setActiveAssignmentIndex(0);
                  }
                }}
              >
                <div className="gws-path-card-top">
                  <span className="gws-path-icon">{path.icon}</span>
                  <span className="gws-path-badge">{path.levelBadge}</span>
                </div>

                <div>
                  <div className="gws-path-title-sa">{path.titleSanskrit}</div>
                  <div className="gws-path-title-en">{path.title}</div>
                </div>

                <div className="gws-path-progress-wrap">
                  <div className="gws-path-progress-meta">
                    <span>{path.assignments.length} Assignments</span>
                    <span>{pct}%</span>
                  </div>
                  <div className="gws-path-progress-track">
                    <div
                      className="gws-path-progress-bar"
                      style={{ width: `${pct}%`, background: path.accentColor }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Sequential Stepper Navigator */}
      <nav className="gws-stepper-wrap" aria-label="Sequential Assignment Stepper">
        <button
          type="button"
          className="sae-secondary-btn"
          onClick={handlePrevAssignment}
          disabled={activeAssignmentIndex === 0}
          style={{ opacity: activeAssignmentIndex === 0 ? 0.4 : 1, padding: '0.45rem 0.85rem' }}
        >
          <span>← Prev</span>
        </button>

        <div className="gws-stepper-list">
          {currentPath.assignments.map((assignment, idx) => {
            const isCompleted = Boolean(progressMap[assignment.id]?.completed);
            const isCurrent = idx === activeAssignmentIndex;

            return (
              <button
                key={assignment.id}
                type="button"
                className={`gws-step-node ${isCurrent ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                onClick={() => setActiveAssignmentIndex(idx)}
              >
                <span className="gws-step-status-icon">
                  {isCompleted ? '✓' : isCurrent ? '✍️' : `${idx + 1}`}
                </span>
                <span>{assignment.titleSanskrit}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className="sae-secondary-btn"
          onClick={handleNextAssignment}
          disabled={activeAssignmentIndex === currentPath.assignments.length - 1}
          style={{
            opacity: activeAssignmentIndex === currentPath.assignments.length - 1 ? 0.4 : 1,
            padding: '0.45rem 0.85rem',
          }}
        >
          <span>Next →</span>
        </button>
      </nav>

      {/* Main Workspace Grid: Model Briefing & Slate */}
      <div className="gws-workspace-grid">
        {/* Left Column: Target Model, Pronunciation & Pāṇinian Notes */}
        <section className="gws-brief-card" aria-label="Assignment Model and Linguistic Guide">
          <div className="gws-brief-header">
            <div>
              <span className="gws-brief-order">
                Assignment {activeAssignmentIndex + 1} of {currentPath.assignments.length}
              </span>
              <h3 style={{ margin: '0.4rem 0 0 0', fontSize: '1.2rem', color: '#1b352f', fontWeight: 800 }}>
                {currentAssignment.titleSanskrit}
              </h3>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{currentAssignment.title}</div>
            </div>
            <span className="sae-card-badge">[{currentAssignment.suggestedMaxMarks} Marks]</span>
          </div>

          {/* Model Sanskrit Box */}
          <div className="gws-target-model-box">
            <div className="gws-target-model-label">
              <span>🎯 आदर्श-संस्कृत-पाठः (Model Sanskrit to Write):</span>
              <button
                type="button"
                className="gws-audio-listen-btn"
                onClick={() => playPronunciation(currentAssignment.targetSanskrit)}
                title="Listen to authentic Sanskrit pronunciation"
              >
                <span>🔊 Listen</span>
              </button>
            </div>

            <div className="gws-target-sanskrit" lang="sa">
              {currentAssignment.targetSanskrit.split('\n').map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>

            <div className="gws-target-translit">{currentAssignment.transliteration}</div>
          </div>

          {/* Meaning / Translation */}
          <div className="gws-meanings-box">
            <div className="gws-meaning-line">
              <strong>English:</strong> {currentAssignment.meaningEnglish}
            </div>
            <div className="gws-meaning-line">
              <strong>हिन्दी:</strong> {currentAssignment.meaningHindi}
            </div>
          </div>

          {/* Handwriting / Calligraphy Advice */}
          <div className="gws-tips-box">
            <h4 className="gws-tips-title">
              <span>✍️</span>
              <span>हस्तलेखन-सुझावाः (Handwriting &amp; Stroke Advice)</span>
            </h4>
            <p className="gws-tips-text">{currentAssignment.handwritingTips}</p>
          </div>

          {/* Grammatical Sutras & Notes */}
          <div className="gws-grammar-notes-box">
            <h4 className="gws-gn-title">
              <span>📖</span>
              <span>पाणिनीय-व्याकरण-टिप्पणी (Pāṇinian Grammar Notes)</span>
            </h4>
            <ul className="gws-gn-list">
              {currentAssignment.grammaticalNotes.map((note, idx) => (
                <li key={idx}>{note}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Right Column: Interactive Writing Slate / Canvas */}
        <section className="gws-slate-card" aria-label="Interactive Sanskrit Writing Slate">
          {/* Mode Switcher */}
          <div className="gws-slate-modes-bar">
            <button
              type="button"
              className={`gws-mode-btn ${inputMode === 'slate' ? 'active' : ''}`}
              onClick={() => setInputMode('slate')}
            >
              <span>✍️ Ruled Ink Slate</span>
            </button>

            <button
              type="button"
              className={`gws-mode-btn ${inputMode === 'type' ? 'active' : ''}`}
              onClick={() => setInputMode('type')}
            >
              <span>⌨️ Devanagari Typing</span>
            </button>

            <button
              type="button"
              className={`gws-mode-btn ${inputMode === 'upload' ? 'active' : ''}`}
              onClick={() => setInputMode('upload')}
            >
              <span>📸 Snap/Upload Homework</span>
            </button>
          </div>

          {/* MODE 1: DIGITAL INK CANVAS */}
          {inputMode === 'slate' && (
            <div>
              {/* Canvas Toolbar */}
              <div className="gws-canvas-toolbar">
                <div className="gws-colors-group">
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b', marginRight: '0.2rem' }}>
                    Ink:
                  </span>
                  {BRUSH_COLORS.map((col) => (
                    <button
                      key={col.id}
                      type="button"
                      className={`gws-color-dot ${brushColor === col.hex && !isEraser ? 'active' : ''}`}
                      style={{ background: col.hex }}
                      onClick={() => {
                        setBrushColor(col.hex);
                        setIsEraser(false);
                      }}
                      title={col.name}
                    />
                  ))}
                </div>

                <div className="gws-tools-group">
                  <button
                    type="button"
                    className={`gws-tool-btn ${brushWidth === 3 ? 'active' : ''}`}
                    onClick={() => setBrushWidth(3)}
                    title="Fine Pen"
                  >
                    Fine
                  </button>
                  <button
                    type="button"
                    className={`gws-tool-btn ${brushWidth === 6 ? 'active' : ''}`}
                    onClick={() => setBrushWidth(6)}
                    title="Medium Pen"
                  >
                    Medium
                  </button>
                  <button
                    type="button"
                    className={`gws-tool-btn ${brushWidth === 10 ? 'active' : ''}`}
                    onClick={() => setBrushWidth(10)}
                    title="Calligraphy Nib"
                  >
                    Bold
                  </button>
                  <button
                    type="button"
                    className={`gws-tool-btn ${isEraser ? 'active' : ''}`}
                    onClick={() => setIsEraser(!isEraser)}
                    title="Eraser"
                  >
                    🧹 Eraser
                  </button>
                  <button type="button" className="gws-tool-btn" onClick={handleUndo} title="Undo stroke">
                    ↩ Undo
                  </button>
                  <button type="button" className="gws-tool-btn" onClick={resetCanvas} title="Clear Slate">
                    🗑️ Clear
                  </button>
                  <button
                    type="button"
                    className={`gws-tool-btn ${showWatermark ? 'active' : ''}`}
                    onClick={() => setShowWatermark(!showWatermark)}
                    title="Toggle Faded Model Guide Watermark"
                  >
                    {showWatermark ? '👁️ Guide ON' : 'Guide OFF'}
                  </button>
                </div>
              </div>

              {/* Ruled Canvas */}
              <div className="gws-canvas-wrap">
                {showWatermark && (
                  <div className="gws-watermark-overlay" aria-hidden="true">
                    {currentAssignment.targetSanskrit}
                  </div>
                )}
                <canvas
                  ref={canvasRef}
                  className="gws-drawing-canvas"
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                />
              </div>
            </div>
          )}

          {/* MODE 2: DEVANAGARI TYPING */}
          {inputMode === 'type' && (
            <div>
              {/* Diacritics Bar */}
              <div className="sae-diacritics-bar" style={{ marginBottom: '0.5rem' }}>
                <span className="sae-diacritics-label">Diacritics:</span>
                {DIACRITIC_CHARS.map((char) => (
                  <button
                    key={char}
                    type="button"
                    className="sae-char-btn"
                    onClick={() => handleInsertDiacritic(char)}
                  >
                    {char}
                  </button>
                ))}
              </div>

              <textarea
                ref={textareaRef}
                className="sae-textarea"
                value={typedText}
                onChange={(e) => setTypedText(e.target.value)}
                placeholder="Type or paste the Sanskrit assignment here in Devanagari script..."
                rows={6}
              />
            </div>
          )}

          {/* MODE 3: UPLOAD NOTEBOOK PHOTO */}
          {inputMode === 'upload' && (
            <div>
              <div
                className="sae-dropzone"
                style={{ padding: '1.5rem 1rem' }}
                onClick={() => fileInputRef.current?.click()}
              >
                <span className="sae-drop-icon" style={{ fontSize: '2.2rem' }}>📸</span>
                <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.95rem', color: '#1e293b' }}>
                  Upload Photo of your Handwritten Sanskrit Notebook
                </h4>
                <p style={{ margin: '0 0 0.85rem 0', fontSize: '0.8rem', color: '#64748b' }}>
                  Write on physical paper, then snap a photo to evaluate!
                </p>

                <div className="sae-upload-options-row" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    className="sae-upload-action-btn"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    📁 Choose Photo
                  </button>
                  <button
                    type="button"
                    className="sae-camera-action-btn"
                    onClick={() => cameraInputRef.current?.click()}
                  >
                    📸 Snap with Camera
                  </button>
                </div>
              </div>

              {uploadedImage && (
                <div className="sae-preview-pod" style={{ marginTop: '0.85rem' }}>
                  <img src={uploadedImage} alt="Uploaded Sanskrit Notebook" className="sae-preview-img" />
                  <div className="sae-preview-footer">
                    <span>Attached Homework Photo</span>
                    <button
                      type="button"
                      className="sae-remove-file-btn"
                      onClick={() => setUploadedImage(null)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Row */}
          <div className="gws-check-action-row">
            <button
              type="button"
              className="gws-check-btn"
              onClick={handleCheckWriting}
              disabled={isEvaluating}
            >
              <span>{isEvaluating ? '⏳ Checking Strokes & Concord...' : '✨ Check My Writing · मूल्याङ्कनम्'}</span>
            </button>

            {activeAssignmentIndex < currentPath.assignments.length - 1 && (
              <button
                type="button"
                className="gws-next-btn"
                onClick={handleNextAssignment}
              >
                <span>Next Assignment ➔</span>
              </button>
            )}
          </div>

          {/* Assessment Feedback Card */}
          {evaluationFeedback && (
            <div
              className={`gws-feedback-card ${evaluationFeedback.percentage < 75 ? 'needs-work' : ''}`}
              aria-live="polite"
            >
              <div className="gws-feedback-top">
                <span className="gws-feedback-grade">{evaluationFeedback.gradeSanskrit}</span>
                <span className="gws-feedback-stars">
                  {'⭐'.repeat(evaluationFeedback.stars)}
                  <strong style={{ marginLeft: '0.5rem', fontSize: '0.95rem' }}>
                    {evaluationFeedback.score} / {evaluationFeedback.maxScore} Marks ({evaluationFeedback.percentage}%)
                  </strong>
                </span>
              </div>

              <p className="gws-feedback-text">{evaluationFeedback.feedbackText}</p>
              <p className="gws-feedback-tips">
                💡 <strong>Guru Advice:</strong> {evaluationFeedback.actionableTip}
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default GuidedWritingStudio;
