import React, { useState, useRef, useEffect } from 'react';
import {
  evaluateSanskritText,
  saveEvaluatedAssignment,
  getEvaluatedAssignmentHistory,
  deleteEvaluatedAssignment,
  SAMPLE_ASSIGNMENT_PRESETS,
  type EvaluatedAssignment,
  type SampleAssignmentPreset,
} from '../utils/sanskritAssignmentEvaluator';
import { playPronunciation } from '../utils/pronunciation';
import '../styles/sanskrit-assignment-evaluator.css';

export interface SanskritAssignmentEvaluatorProps {
  onNavigateView?: (view: any, lessonId?: string) => void;
  onBackToWorksheets?: () => void;
  onGoHome?: () => void;
}

const DIACRITIC_CHARS = ['।', '॥', 'ऽ', 'ः', 'ं', '्', 'ॐ', 'ऋ', 'ॠ', 'ज्ञ', 'त्र', 'श्र'];

export const SanskritAssignmentEvaluator: React.FC<SanskritAssignmentEvaluatorProps> = ({
  onNavigateView,
  onBackToWorksheets,
  onGoHome,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'results' | 'history'>('upload');

  // Input State
  const [studentName, setStudentName] = useState<string>('संस्कृत-जिज्ञासुः');
  const [gradeLevel, setGradeLevel] = useState<string>('Class 7 (Deepakam)');
  const [assignmentTitle, setAssignmentTitle] = useState<string>('वन्दे भारतमातरम् · अभ्यास-प्रश्नोत्तराणि');
  const [totalMarks, setTotalMarks] = useState<number>(20);
  const [transcribedText, setTranscribedText] = useState<string>(SAMPLE_ASSIGNMENT_PRESETS[0].sampleText);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(SAMPLE_ASSIGNMENT_PRESETS[0].handwrittenPreviewSvg);
  const [selectedPresetId, setSelectedPresetId] = useState<string>(SAMPLE_ASSIGNMENT_PRESETS[0].id);

  // Drag state
  const [isDragActive, setIsDragActive] = useState<boolean>(false);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);

  // Result State
  const [evaluatedResult, setEvaluatedResult] = useState<EvaluatedAssignment | null>(null);

  // History State
  const [historyList, setHistoryList] = useState<EvaluatedAssignment[]>([]);

  // Refs
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Load history on mount
  useEffect(() => {
    setHistoryList(getEvaluatedAssignmentHistory());
  }, []);

  // Handle preset selection
  const handleSelectPreset = (preset: SampleAssignmentPreset) => {
    setSelectedPresetId(preset.id);
    setAssignmentTitle(preset.titleSanskrit);
    setGradeLevel(preset.gradeLevel);
    setTotalMarks(preset.totalMarks);
    setTranscribedText(preset.sampleText);
    setUploadedImageUrl(preset.handwrittenPreviewSvg);
  };

  // Handle file upload
  const processUploadedFile = (file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setUploadedImageUrl(dataUrl);
      setSelectedPresetId('');
      // If student hasn't entered custom text, provide an initial Sanskrit OCR prompt template
      if (!transcribedText || transcribedText === SAMPLE_ASSIGNMENT_PRESETS[0].sampleText) {
        setTranscribedText(
          `१. वयम् भारतमातरं वदामहे ।\n२. तस्य मुकुटः हिमालय अस्ति ।\n३. ते बालकाः विद्यालये पठति ।\n४. रामेण सह सीता वनं गच्छति ।\n५. सत्यं वद, धर्मं चर ।`
        );
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processUploadedFile(e.dataTransfer.files[0]);
    }
  };

  // Insert Sanskrit diacritic into textarea at cursor
  const handleInsertChar = (char: string) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      setTranscribedText((prev) => prev + char);
      return;
    }
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const nextText = transcribedText.substring(0, start) + char + transcribedText.substring(end);
    setTranscribedText(nextText);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + char.length, start + char.length);
    }, 0);
  };

  // Evaluate action
  const handleRunEvaluation = () => {
    if (!transcribedText.trim()) return;
    setIsEvaluating(true);

    setTimeout(() => {
      const result = evaluateSanskritText(transcribedText, {
        studentName,
        gradeLevel,
        assignmentTitle,
        totalMarks,
        uploadedImageUrl: uploadedImageUrl || undefined,
      });

      setEvaluatedResult(result);
      saveEvaluatedAssignment(result);
      setHistoryList(getEvaluatedAssignmentHistory());
      setIsEvaluating(false);
      setActiveTab('results');

      // Play auspicious gentle bell effect
      playPronunciation('साधु');
    }, 600);
  };

  // Delete from history
  const handleDeleteHistoryItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteEvaluatedAssignment(id);
    setHistoryList(getEvaluatedAssignmentHistory());
    if (evaluatedResult?.id === id) {
      setEvaluatedResult(null);
    }
  };

  return (
    <div className="sae-container">
      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,application/pdf"
        style={{ display: 'none' }}
        onChange={(e) => {
          if (e.target.files?.[0]) processUploadedFile(e.target.files[0]);
        }}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: 'none' }}
        onChange={(e) => {
          if (e.target.files?.[0]) processUploadedFile(e.target.files[0]);
        }}
      />

      {/* Header Banner */}
      <header className="sae-header sae-no-print">
        <div className="sae-header-pattern" aria-hidden="true" />
        <div className="sae-header-top">
          <div className="sae-badge-pill">
            <span>✍️</span>
            <span>गुरुकुल-लिखित-मूल्याङ्कनम् · Sanskrit Assignment AI Evaluator</span>
          </div>

          <div className="sae-header-actions">
            {onBackToWorksheets && (
              <button type="button" className="sae-header-btn" onClick={onBackToWorksheets}>
                <span>📚</span>
                <span>Worksheets Catalog</span>
              </button>
            )}
            {onGoHome && (
              <button type="button" className="sae-header-btn" onClick={onGoHome}>
                <span>🏠</span>
                <span>Home</span>
              </button>
            )}
          </div>
        </div>

        <h1 className="sae-title-sanskrit">संस्कृत-हस्तलिखित-अभ्यास-मूल्याङ्कनम्</h1>
        <h2 className="sae-title-english">Written Sanskrit Assignment &amp; Handwriting Evaluator</h2>
        <p className="sae-header-desc">
          Upload a photo or scan of your handwritten Sanskrit homework, worksheet, or exam paper. Our Gurukul Parikshaka engine inspects Devanagari letterforms, verifies Pāṇinian subject-verb concord, detects case ending (विभक्ति) and sandhi slips, and generates an official printable evaluation marksheet with spoken Sanskrit audio explanations!
        </p>
      </header>

      {/* Tabs Bar */}
      <nav className="sae-tabs-bar sae-no-print" aria-label="Assignment Evaluator Navigation">
        <button
          type="button"
          className={`sae-tab-btn ${activeTab === 'upload' ? 'active' : ''}`}
          onClick={() => setActiveTab('upload')}
        >
          <span>📤</span>
          <span>Upload &amp; Configure (अपलोड् व चयनम्)</span>
        </button>

        {evaluatedResult && (
          <button
            type="button"
            className={`sae-tab-btn ${activeTab === 'results' ? 'active' : ''}`}
            onClick={() => setActiveTab('results')}
          >
            <span>📜</span>
            <span>Evaluation Report &amp; Marksheet (मूल्याङ्कन-पत्रम्)</span>
          </button>
        )}

        <button
          type="button"
          className={`sae-tab-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          <span>📂</span>
          <span>Saved Evaluations ({historyList.length})</span>
        </button>
      </nav>

      {/* TAB 1: UPLOAD & SETUP */}
      {activeTab === 'upload' && (
        <section className="sae-setup-grid sae-no-print" aria-label="Assignment Upload and Configuration">
          {/* Left Column: Upload & Image Inspection */}
          <div className="sae-card">
            <div className="sae-card-title">
              <span>१. हस्तलिखित-पत्रं योजयतु · Upload Written Homework</span>
              <span className="sae-card-badge">Image / PDF / Camera</span>
            </div>

            {/* Drag & Drop Zone */}
            <div
              className={`sae-dropzone ${isDragActive ? 'drag-active' : ''}`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragActive(true);
              }}
              onDragLeave={() => setIsDragActive(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <span className="sae-drop-icon">📄</span>
              <h3 className="sae-drop-heading">Drag &amp; Drop Written Sanskrit Assignment Photo</h3>
              <p className="sae-drop-sub">Supports PNG, JPG, JPEG, WEBP or PDF documents</p>

              <div className="sae-upload-options-row" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  className="sae-upload-action-btn"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <span>📁 Choose File</span>
                </button>
                <button
                  type="button"
                  className="sae-camera-action-btn"
                  onClick={() => cameraInputRef.current?.click()}
                >
                  <span>📸 Snap with Camera</span>
                </button>
              </div>
            </div>

            {/* Uploaded Preview */}
            {uploadedImageUrl && (
              <div className="sae-preview-pod">
                <img
                  src={uploadedImageUrl}
                  alt="Written Sanskrit Assignment Preview"
                  className="sae-preview-img"
                />
                <div className="sae-preview-footer">
                  <span>📸 Attached Assignment Document</span>
                  <button
                    type="button"
                    className="sae-remove-file-btn"
                    onClick={() => {
                      setUploadedImageUrl(null);
                      setSelectedPresetId('');
                    }}
                  >
                    Remove File
                  </button>
                </div>
              </div>
            )}

            {/* Quick Test Presets */}
            <div className="sae-presets-wrap">
              <h4 className="sae-presets-heading">
                <span>⚡</span>
                <span>Or Try Instantly with Sample Student Homework:</span>
              </h4>
              <div className="sae-presets-grid">
                {SAMPLE_ASSIGNMENT_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    className={`sae-preset-chip ${selectedPresetId === preset.id ? 'active' : ''}`}
                    onClick={() => handleSelectPreset(preset)}
                  >
                    <div className="sae-pc-title">{preset.titleSanskrit}</div>
                    <div className="sae-pc-sub">{preset.gradeLevel} · {preset.totalMarks}M</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Metadata & Transcribed Sanskrit Editor */}
          <div className="sae-card">
            <div className="sae-card-title">
              <span>२. विवरणं देवनागरी-पाठश्च · Details &amp; Transcript</span>
              <span className="sae-card-badge">Editable Devanagari</span>
            </div>

            {/* Metadata Fields */}
            <div className="sae-meta-row">
              <div className="sae-input-group">
                <label className="sae-input-label" htmlFor="student-name">
                  छात्रस्य नाम · Student Name
                </label>
                <input
                  id="student-name"
                  type="text"
                  className="sae-input-control"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="e.g. राहुलः (Rahul Sharma)"
                />
              </div>

              <div className="sae-input-group">
                <label className="sae-input-label" htmlFor="grade-level">
                  कक्षा / पाठ्यक्रमः · Class &amp; Curriculum
                </label>
                <select
                  id="grade-level"
                  className="sae-input-control"
                  value={gradeLevel}
                  onChange={(e) => setGradeLevel(e.target.value)}
                >
                  <option value="Class 6 (Deepakam / NCERT)">Class 6 (Deepakam / NCERT)</option>
                  <option value="Class 7 (Deepakam)">Class 7 (Deepakam)</option>
                  <option value="Class 8 (Deepakam 2)">Class 8 (Deepakam 2)</option>
                  <option value="Class 9 (Sharada / CBSE)">Class 9 (Sharada / CBSE)</option>
                  <option value="Class 10 (Shemushi / CBSE)">Class 10 (Shemushi / CBSE)</option>
                  <option value="Beginner Sanskrit Course">Beginner Sanskrit Course</option>
                  <option value="University / Open Gurukul">University / Open Gurukul</option>
                </select>
              </div>
            </div>

            <div className="sae-meta-row">
              <div className="sae-input-group">
                <label className="sae-input-label" htmlFor="assignment-title">
                  कार्य-शीर्षकम् · Assignment Title
                </label>
                <input
                  id="assignment-title"
                  type="text"
                  className="sae-input-control"
                  value={assignmentTitle}
                  onChange={(e) => setAssignmentTitle(e.target.value)}
                  placeholder="e.g. वन्दे भारतमातरम् अभ्यासः"
                />
              </div>

              <div className="sae-input-group">
                <label className="sae-input-label" htmlFor="total-marks">
                  पूर्णाङ्काः · Max Marks
                </label>
                <select
                  id="total-marks"
                  className="sae-input-control"
                  value={totalMarks}
                  onChange={(e) => setTotalMarks(Number(e.target.value))}
                >
                  <option value={10}>10 Marks</option>
                  <option value={20}>20 Marks (Standard)</option>
                  <option value={25}>25 Marks</option>
                  <option value={50}>50 Marks</option>
                  <option value={100}>100 Marks (Board Exam)</option>
                </select>
              </div>
            </div>

            {/* Quick Diacritics Toolbar */}
            <div className="sae-diacritics-bar" aria-label="Devanagari Diacritics Insert Bar">
              <span className="sae-diacritics-label">Quick Sanskrit Chars:</span>
              {DIACRITIC_CHARS.map((char) => (
                <button
                  key={char}
                  type="button"
                  className="sae-char-btn"
                  onClick={() => handleInsertChar(char)}
                  title={`Insert ${char}`}
                >
                  {char}
                </button>
              ))}
            </div>

            {/* Sanskrit Textarea */}
            <textarea
              ref={textareaRef}
              className="sae-textarea"
              value={transcribedText}
              onChange={(e) => setTranscribedText(e.target.value)}
              placeholder="Paste or type handwritten Sanskrit assignment text here..."
              rows={8}
            />

            {/* Action Bar */}
            <div className="sae-eval-action-bar">
              <button
                type="button"
                className="sae-primary-eval-btn"
                onClick={handleRunEvaluation}
                disabled={isEvaluating || !transcribedText.trim()}
              >
                <span>{isEvaluating ? '⏳ Analyzing Pāṇinian Rules...' : '✨ Evaluate Assignment · परीक्षणं कुरु'}</span>
                {!isEvaluating && <span>➔</span>}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* TAB 2: EVALUATION REPORT & MARKSHEET */}
      {activeTab === 'results' && evaluatedResult && (
        <section className="sae-results-card" aria-label="Official Gurukul Evaluation Results">
          {/* Top Banner Marksheet */}
          <div className="sae-score-banner sae-no-print">
            <div className="sae-score-left">
              <img
                src="/logo.jpg"
                alt="EdNet Gurukul Seal"
                className="sae-seal-crest"
              />
              <div className="sae-score-student-info">
                <h3>{evaluatedResult.assignmentTitle}</h3>
                <div className="sae-score-meta-tags">
                  <span><strong>छात्रः:</strong> {evaluatedResult.studentName}</span>
                  <span>•</span>
                  <span><strong>कक्षा:</strong> {evaluatedResult.gradeLevel}</span>
                  <span>•</span>
                  <span><strong>दिनाङ्कः:</strong> {new Date(evaluatedResult.timestamp).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="sae-score-badge-right">
              <div>
                <span className="sae-big-score-num">{evaluatedResult.obtainedMarks}</span>
                <span className="sae-score-denom">/{evaluatedResult.totalMarks}</span>
              </div>
              <div className="sae-grade-callout">
                <span className="sae-grade-sanskrit">{evaluatedResult.gradeSanskrit}</span>
                <span className="sae-grade-pct">{evaluatedResult.percentage}% Score Achieved</span>
              </div>
            </div>
          </div>

          {/* 4 Rubric Meters */}
          <div className="sae-rubric-grid sae-no-print">
            {/* 1. Orthography */}
            <div className="sae-rubric-card">
              <div>
                <div className="sae-rc-title-sa">{evaluatedResult.criteria.orthography.sanskritTitle}</div>
                <div className="sae-rc-title-en">{evaluatedResult.criteria.orthography.title}</div>
              </div>
              <div>
                <div className="sae-rc-meter-row">
                  <span className="sae-rc-score">
                    {evaluatedResult.criteria.orthography.score} / {evaluatedResult.criteria.orthography.maxScore}
                  </span>
                  <span className="sae-rc-pct">{evaluatedResult.criteria.orthography.percentage}%</span>
                </div>
                <div className="sae-progress-track">
                  <div
                    className="sae-progress-bar"
                    style={{ width: `${evaluatedResult.criteria.orthography.percentage}%` }}
                  />
                </div>
                <p className="sae-rc-comment">{evaluatedResult.criteria.orthography.comments}</p>
              </div>
            </div>

            {/* 2. Grammar & Concord */}
            <div className="sae-rubric-card">
              <div>
                <div className="sae-rc-title-sa">{evaluatedResult.criteria.grammar.sanskritTitle}</div>
                <div className="sae-rc-title-en">{evaluatedResult.criteria.grammar.title}</div>
              </div>
              <div>
                <div className="sae-rc-meter-row">
                  <span className="sae-rc-score">
                    {evaluatedResult.criteria.grammar.score} / {evaluatedResult.criteria.grammar.maxScore}
                  </span>
                  <span className="sae-rc-pct">{evaluatedResult.criteria.grammar.percentage}%</span>
                </div>
                <div className="sae-progress-track">
                  <div
                    className="sae-progress-bar"
                    style={{ width: `${evaluatedResult.criteria.grammar.percentage}%` }}
                  />
                </div>
                <p className="sae-rc-comment">{evaluatedResult.criteria.grammar.comments}</p>
              </div>
            </div>

            {/* 3. Comprehension & Semantics */}
            <div className="sae-rubric-card">
              <div>
                <div className="sae-rc-title-sa">{evaluatedResult.criteria.comprehension.sanskritTitle}</div>
                <div className="sae-rc-title-en">{evaluatedResult.criteria.comprehension.title}</div>
              </div>
              <div>
                <div className="sae-rc-meter-row">
                  <span className="sae-rc-score">
                    {evaluatedResult.criteria.comprehension.score} / {evaluatedResult.criteria.comprehension.maxScore}
                  </span>
                  <span className="sae-rc-pct">{evaluatedResult.criteria.comprehension.percentage}%</span>
                </div>
                <div className="sae-progress-track">
                  <div
                    className="sae-progress-bar"
                    style={{ width: `${evaluatedResult.criteria.comprehension.percentage}%` }}
                  />
                </div>
                <p className="sae-rc-comment">{evaluatedResult.criteria.comprehension.comments}</p>
              </div>
            </div>

            {/* 4. Handwriting & Presentation */}
            <div className="sae-rubric-card">
              <div>
                <div className="sae-rc-title-sa">{evaluatedResult.criteria.presentation.sanskritTitle}</div>
                <div className="sae-rc-title-en">{evaluatedResult.criteria.presentation.title}</div>
              </div>
              <div>
                <div className="sae-rc-meter-row">
                  <span className="sae-rc-score">
                    {evaluatedResult.criteria.presentation.score} / {evaluatedResult.criteria.presentation.maxScore}
                  </span>
                  <span className="sae-rc-pct">{evaluatedResult.criteria.presentation.percentage}%</span>
                </div>
                <div className="sae-progress-track">
                  <div
                    className="sae-progress-bar"
                    style={{ width: `${evaluatedResult.criteria.presentation.percentage}%` }}
                  />
                </div>
                <p className="sae-rc-comment">{evaluatedResult.criteria.presentation.comments}</p>
              </div>
            </div>
          </div>

          {/* Line-by-Line Corrections Table */}
          <div className="sae-corrections-section sae-no-print">
            <h3 className="sae-section-title">
              <span>🔍</span>
              <span>पद-संशोधनम् एवं पाणिनीय-नियमाः · Line-by-Line Corrections</span>
            </h3>
            <p className="sae-section-desc">
              Review specific word adjustments identified in your written submission, with Pāṇinian sutra citations and spoken audio corrections:
            </p>

            {evaluatedResult.corrections.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', background: '#f0fdf4', borderRadius: '12px', border: '1px solid #bbf7d0', color: '#166534' }}>
                <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>🎉</span>
                <strong>सर्वं शुद्धम्! No grammatical or orthography errors detected!</strong>
                <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.9rem' }}>
                  Flawless Sanskrit writing adhering to Pāṇinian rules and Devanagari orthography.
                </p>
              </div>
            ) : (
              <div className="sae-corrections-list">
                {evaluatedResult.corrections.map((corr) => (
                  <div key={corr.id} className="sae-corr-card">
                    <div className="sae-corr-header">
                      <span className="sae-corr-pill">{corr.categoryLabel}</span>
                      <span className="sae-corr-rule">{corr.paninianRule}</span>
                    </div>

                    <div className="sae-corr-diff-row">
                      <div className="sae-diff-block">
                        <span className="sae-diff-label student">Student Written:</span>
                        <span className="sae-diff-text student">{corr.studentSnippet}</span>
                      </div>

                      <div className="sae-diff-block">
                        <span className="sae-diff-label teacher">Corrected Sanskrit:</span>
                        <span className="sae-diff-text teacher">{corr.correctedSnippet}</span>
                      </div>

                      <button
                        type="button"
                        className="sae-audio-listen-btn"
                        onClick={() => playPronunciation(corr.audioText || corr.correctedSnippet)}
                        title={`Listen to correct pronunciation: ${corr.audioText}`}
                      >
                        <span>🔊 Listen</span>
                      </button>
                    </div>

                    <p className="sae-corr-explanation">
                      💡 <strong>व्याख्या (Explanation):</strong> {corr.explanation}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Insights Grid: Strengths & Next Steps */}
          <div className="sae-insights-grid sae-no-print">
            <div className="sae-insights-box strengths">
              <h4 className="sae-ib-title">
                <span>🌟</span>
                <span>विशेषाङ्काः (Strengths &amp; Commendations)</span>
              </h4>
              <ul className="sae-ib-list">
                {evaluatedResult.strengths.map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ul>
            </div>

            <div className="sae-insights-box actions">
              <h4 className="sae-ib-title">
                <span>🎯</span>
                <span>अभ्यास-परामर्शः (Targeted Practice Tips)</span>
              </h4>
              <ul className="sae-ib-list">
                {evaluatedResult.actionItems.map((a, idx) => (
                  <li key={idx}>{a}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Teacher Remarks Pod */}
          <div className="sae-teacher-remarks-pod sae-no-print">
            <div className="sae-guru-avatar">🪔</div>
            <div>
              <p className="sae-teacher-remarks-text">"{evaluatedResult.teacherRemarks}"</p>
              <div className="sae-teacher-seal-line">
                ✍️ {evaluatedResult.evaluatorSeal}
              </div>
            </div>
          </div>

          {/* Results Action Buttons */}
          <div className="sae-results-actions-bar sae-no-print">
            <button
              type="button"
              className="sae-print-btn"
              onClick={() => window.print()}
            >
              <span>🖨️ Print Official Marksheet / Save PDF</span>
            </button>

            {onNavigateView && (
              <button
                type="button"
                className="sae-secondary-btn"
                onClick={() => onNavigateView('grammar')}
              >
                <span>📐 Review Grammar Rules</span>
              </button>
            )}

            <button
              type="button"
              className="sae-secondary-btn"
              onClick={() => setActiveTab('upload')}
            >
              <span>🔄 Evaluate Another Assignment</span>
            </button>
          </div>

          {/* ==========================================================================
             PRINTABLE OFFICIAL MARKSHEET (Rendered for Print & Official View)
             ========================================================================== */}
          <div className="sae-printable-sheet" id="official-marksheet">
            <div className="sae-ps-header">
              <div className="sae-ps-brand">
                <img src="/logo.jpg" alt="EdNet Gurukul Crest" className="sae-ps-logo" />
                <div>
                  <h3 className="sae-ps-school-name">EdNet Learn Gurukul</h3>
                  <div className="sae-ps-school-sub">
                    CBSE Board Exam Curriculum · Sanskrit &amp; Vedic Studies Research Wing
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'right', fontSize: '0.85rem', color: '#475569' }}>
                <div><strong>प्रमाणपत्र-क्रमाङ्कः:</strong> {evaluatedResult.id.toUpperCase()}</div>
                <div><strong>दिनाङ्कः (Date):</strong> {new Date(evaluatedResult.timestamp).toLocaleDateString()}</div>
              </div>
            </div>

            <div className="sae-ps-title">
              <h2>संस्कृत-लिखित-कार्य-मूल्याङ्कन-पत्रम्</h2>
              <p>Official Written Sanskrit Assignment Evaluation Marksheet</p>
            </div>

            {/* Student & Exam Meta Table */}
            <table className="sae-ps-meta-table">
              <tbody>
                <tr>
                  <td className="sae-ps-meta-label">छात्रस्य नाम (Student Name):</td>
                  <td className="sae-ps-meta-val"><strong>{evaluatedResult.studentName}</strong></td>
                  <td className="sae-ps-meta-label">कक्षा (Class &amp; Section):</td>
                  <td className="sae-ps-meta-val">{evaluatedResult.gradeLevel}</td>
                </tr>
                <tr>
                  <td className="sae-ps-meta-label">कार्य-शीर्षकम् (Assignment):</td>
                  <td className="sae-ps-meta-val">{evaluatedResult.assignmentTitle}</td>
                  <td className="sae-ps-meta-label">अङ्काः (Total Marks):</td>
                  <td className="sae-ps-meta-val">
                    <strong>{evaluatedResult.obtainedMarks} / {evaluatedResult.totalMarks}</strong> ({evaluatedResult.percentage}%)
                  </td>
                </tr>
                <tr>
                  <td className="sae-ps-meta-label">श्रेणी (Awarded Grade):</td>
                  <td className="sae-ps-meta-val" colSpan={3}>
                    <strong style={{ color: '#b45309', fontSize: '1.05rem' }}>
                      {evaluatedResult.gradeSanskrit}
                    </strong>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Rubric Breakdown Table */}
            <table className="sae-ps-rubric-table">
              <thead>
                <tr>
                  <th>मूल्याङ्कन-मानदण्डः (Assessment Criterion)</th>
                  <th>पूर्णाङ्काः (Max)</th>
                  <th>प्राप्ताङ्काः (Obtained)</th>
                  <th>प्रतिशतम् (%)</th>
                  <th>परीक्षक-टिप्पणी (Teacher Remarks)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>वर्ण-विन्यासः व लिपिः</strong> (Orthography &amp; Script)</td>
                  <td>{evaluatedResult.criteria.orthography.maxScore}</td>
                  <td><strong>{evaluatedResult.criteria.orthography.score}</strong></td>
                  <td>{evaluatedResult.criteria.orthography.percentage}%</td>
                  <td>{evaluatedResult.criteria.orthography.comments}</td>
                </tr>
                <tr>
                  <td><strong>व्याकरणम् व पद-सङ्गतिः</strong> (Grammar &amp; Concord)</td>
                  <td>{evaluatedResult.criteria.grammar.maxScore}</td>
                  <td><strong>{evaluatedResult.criteria.grammar.score}</strong></td>
                  <td>{evaluatedResult.criteria.grammar.percentage}%</td>
                  <td>{evaluatedResult.criteria.grammar.comments}</td>
                </tr>
                <tr>
                  <td><strong>विषय-विस्तारः व भावार्थः</strong> (Comprehension &amp; Semantics)</td>
                  <td>{evaluatedResult.criteria.comprehension.maxScore}</td>
                  <td><strong>{evaluatedResult.criteria.comprehension.score}</strong></td>
                  <td>{evaluatedResult.criteria.comprehension.percentage}%</td>
                  <td>{evaluatedResult.criteria.comprehension.comments}</td>
                </tr>
                <tr>
                  <td><strong>हस्ताक्षर-सौष्ठवम् व स्वच्छता</strong> (Handwriting &amp; Presentation)</td>
                  <td>{evaluatedResult.criteria.presentation.maxScore}</td>
                  <td><strong>{evaluatedResult.criteria.presentation.score}</strong></td>
                  <td>{evaluatedResult.criteria.presentation.percentage}%</td>
                  <td>{evaluatedResult.criteria.presentation.comments}</td>
                </tr>
                <tr style={{ background: '#f8fafc', fontWeight: 'bold' }}>
                  <td>कुल-योगः (Grand Total)</td>
                  <td>{evaluatedResult.totalMarks}</td>
                  <td>{evaluatedResult.obtainedMarks}</td>
                  <td>{evaluatedResult.percentage}%</td>
                  <td>{evaluatedResult.letterGrade} Grade</td>
                </tr>
              </tbody>
            </table>

            {/* Teacher Remarks & Verification */}
            <div style={{ marginTop: '1.5rem', background: '#fffdf5', padding: '1rem', border: '1px solid #fde68a', borderRadius: '8px' }}>
              <div style={{ fontWeight: 700, color: '#92400e', marginBottom: '0.3rem' }}>आचार्य-परामर्शः (Head Instructor's Evaluation Note):</div>
              <p style={{ margin: 0, fontStyle: 'italic', color: '#1e293b' }}>"{evaluatedResult.teacherRemarks}"</p>
            </div>

            {/* Official Signatures */}
            <div className="sae-ps-signatures">
              <div className="sae-ps-sig-block">
                <div className="sae-ps-sig-line">परीक्षकस्य हस्ताक्षरम्<br />(Evaluator / Sanskrit Guru)</div>
              </div>
              <div className="sae-ps-sig-block">
                <div style={{ fontSize: '0.85rem', color: '#b45309', fontWeight: 800 }}>[ गुरुकुल-परीक्षा-मुद्रा ]</div>
                <div className="sae-ps-sig-line">EdNet Learn Gurukul Seal</div>
              </div>
              <div className="sae-ps-sig-block">
                <div className="sae-ps-sig-line">प्रधानाचार्यस्य हस्ताक्षरम्<br />(Principal / Academic Head)</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB 3: PAST EVALUATION HISTORY */}
      {activeTab === 'history' && (
        <section className="sae-card sae-no-print" aria-label="Assignment History">
          <div className="sae-card-title">
            <span>सञ्चित-मूल्याङ्कनानि · Evaluated Assignment History</span>
            <span className="sae-card-badge">{historyList.length} Saved Records</span>
          </div>

          {historyList.length === 0 ? (
            <div style={{ padding: '3rem 1rem', textAlign: 'center', color: '#64748b' }}>
              <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.75rem' }}>📭</span>
              <strong>No saved evaluations yet.</strong>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
                Upload or select a sample assignment to evaluate your first written Sanskrit submission!
              </p>
            </div>
          ) : (
            <div className="sae-history-list">
              {historyList.map((item) => (
                <div
                  key={item.id}
                  className="sae-history-item"
                  onClick={() => {
                    setEvaluatedResult(item);
                    setActiveTab('results');
                  }}
                >
                  <div className="sae-hi-left">
                    <span className="sae-hi-title">{item.assignmentTitle}</span>
                    <span className="sae-hi-date">
                      {item.studentName} • {item.gradeLevel} • {new Date(item.timestamp).toLocaleString()}
                    </span>
                  </div>

                  <div className="sae-hi-right">
                    <span className="sae-hi-score">
                      {item.obtainedMarks}/{item.totalMarks} ({item.percentage}%)
                    </span>
                    <span className="sae-badge-pill" style={{ background: '#ecfdf5', color: '#047857', border: 'none' }}>
                      {item.letterGrade}
                    </span>
                    <button
                      type="button"
                      className="sae-hi-del-btn"
                      onClick={(e) => handleDeleteHistoryItem(item.id, e)}
                      title="Delete this record"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default SanskritAssignmentEvaluator;
