import React, { useState, useRef, useEffect } from 'react';
import {
  GUIDED_WRITING_PATHS,
  type WritingPath,
  type WritingAssignment,
} from '../data/guidedWritingPathsData';
import { playPronunciation, playSanskritPassage } from '../utils/pronunciation';
import '../styles/guided-writing-studio.css';
import { WritingPracticeBoard } from './WritingPracticeBoard';

export interface GuidedWritingStudioProps {
  initialPathId?: string;
  onNavigateView?: (view: any, lessonId?: string) => void;
  onOpenGeneralEvaluator?: () => void;
  onGoHome?: () => void;
}

const WRITING_PATHS = GUIDED_WRITING_PATHS.filter(path => !['grade7', 'grade8'].includes(path.id));

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
  onOpenGeneralEvaluator: _onOpenGeneralEvaluator,
  onGoHome: _onGoHome,
}) => {
  // Selected path and assignment
  const [selectedPathId, setSelectedPathId] = useState<string>(WRITING_PATHS.some(p => p.id === initialPathId) ? initialPathId : 'basics');
  const currentPath: WritingPath =
    WRITING_PATHS.find((p) => p.id === selectedPathId) || WRITING_PATHS[0];

  const [activeAssignmentIndex, setActiveAssignmentIndex] = useState<number>(0);
  const currentAssignment: WritingAssignment =
    currentPath.assignments[activeAssignmentIndex] || currentPath.assignments[0];

  // Mode: slate (canvas drawing), type (devanagari input), or upload (photo)
  const [inputMode, setInputMode] = useState<'slate' | 'type' | 'upload'>('slate');

  // Input states
  const [typedText, setTypedText] = useState<string>('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [hasPracticeInk, setHasPracticeInk] = useState(false);
  const [practiceNotice, setPracticeNotice] = useState('');

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

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);

  const stopModelAudioRef = useRef<(() => void) | null>(null);

  // Do not keep reading the previous model after navigating or leaving the studio.
  useEffect(() => () => {
    stopModelAudioRef.current?.();
    stopModelAudioRef.current = null;
  }, [selectedPathId, currentAssignment.id, currentAssignment.targetSanskrit]);

  const listenToModel = () => {
    stopModelAudioRef.current?.();
    stopModelAudioRef.current = playSanskritPassage(currentAssignment.targetSanskrit);
  };

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

  useEffect(() => {
    setTypedText(''); setUploadedImage(null); setEvaluationFeedback(null);
    setHasPracticeInk(false); setPracticeNotice('');
  }, [currentAssignment.id]);

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
    setEvaluationFeedback(null);
    if (inputMode === 'slate') {
      setPracticeNotice(hasPracticeInk ? 'Practice completed on this page. Compare your letters and mātrās with the model. No automatic handwriting score is assigned.' : 'Trace or copy a word before marking practice complete.');
      return;
    }
    if (inputMode === 'upload') {
      setPracticeNotice(uploadedImage ? 'Your image is ready to compare with the model. This guided practice does not automatically recognise or grade handwriting.' : 'Add a photo of your writing first.');
      return;
    }
    if (!typedText.trim()) { setPracticeNotice('Type your own Sanskrit text before checking the keywords.'); return; }
    setPracticeNotice('');
    setIsEvaluating(true);
    setTimeout(() => {
      const maxScore = currentAssignment.suggestedMaxMarks;
      let obtained = maxScore;
      let feedbackText = '';
      let actionableTip = '';
      let isPass = true;

      // Determine text source to inspect
      const textToInspect = typedText.trim();
      const targetKeywords = currentAssignment.expectedKeywords;

      // Check keyword coverage
      const missing = targetKeywords.filter((kw) => !textToInspect.includes(kw));
      if (missing.length > 0) {
        obtained = Math.max(Math.round(maxScore * 0.7), maxScore - missing.length * 2);
        feedbackText = `साधु प्रयासः! Good effort, but remember to include: ${missing.slice(0, 3).join(', ')}.`;
        actionableTip = currentAssignment.handwritingTips;
      } else {
        obtained = maxScore;
        feedbackText = `साधु! The expected keywords are present. This text check does not assess handwriting, stroke formation or complete grammar.`;
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

      <div className="gws-compact-paths">
        <label>Writing path <select value={selectedPathId} onChange={e => { setSelectedPathId(e.target.value); setActiveAssignmentIndex(0); }}>
          {WRITING_PATHS.map(path => <option key={path.id} value={path.id}>{path.title}</option>)}
        </select></label>
        <span>{completedInCurrentPath} of {currentPath.assignments.length} typed assignments completed</span>
      </div>

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
                onClick={listenToModel}
                title="Listen to the Sanskrit model, sentence by sentence"
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
              <span>Trace &amp; Copy Notebook</span>
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

          {inputMode === 'slate' && (
            <WritingPracticeBoard key={currentAssignment.id} modelText={currentAssignment.targetSanskrit} onInkChange={setHasPracticeInk} />
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
                  Write on paper, then add a photo for side-by-side review.
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
              <span>{isEvaluating ? 'Checking keywords…' : inputMode === 'type' ? 'Check typed keywords' : 'Review my practice'}</span>
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
          {practiceNotice && <p role="status" className="gws-practice-notice">{practiceNotice}</p>}
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
