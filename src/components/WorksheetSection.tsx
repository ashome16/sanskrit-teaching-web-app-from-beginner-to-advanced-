import React, { useMemo, useState } from 'react';
import { WORKSHEETS, WORKSHEET_CATEGORIES, type Worksheet } from '../data/worksheetData';
import { useAuthStore } from '../store/authStore';
import '../styles/worksheet-section.css';

interface WorksheetSectionProps {
  onGoHome?: () => void;
  onOpenQuiz?: () => void;
  onOpenReader?: () => void;
}

const WorksheetSection: React.FC<WorksheetSectionProps> = ({
  onGoHome,
  onOpenQuiz,
  onOpenReader,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeWorksheet, setActiveWorksheet] = useState<Worksheet | null>(null);
  const [showAnswerKey, setShowAnswerKey] = useState<boolean>(false);
  const { isAdminLoggedIn } = useAuthStore();

  const visibleCategories = useMemo(
    () => WORKSHEET_CATEGORIES.filter((cat) => isAdminLoggedIn || cat.id !== 'grade8'),
    [isAdminLoggedIn]
  );

  const publicWorksheets = useMemo(
    () =>
      isAdminLoggedIn
        ? WORKSHEETS
        : WORKSHEETS.filter((ws) => ws.category !== 'grade8' && !ws.id.startsWith('ws-grade8-')),
    [isAdminLoggedIn]
  );

  const filteredWorksheets =
    selectedCategory === 'all'
      ? publicWorksheets
      : selectedCategory === 'deep_ch1'
      ? publicWorksheets.filter((ws) => ws.id.startsWith('ws-ch1'))
      : selectedCategory === 'deep_ch2'
      ? publicWorksheets.filter((ws) => ws.id.startsWith('ws-ch2'))
      : selectedCategory === 'deep_ch3'
      ? publicWorksheets.filter((ws) => ws.id.startsWith('ws-ch3'))
      : selectedCategory === 'deep_ch4'
      ? publicWorksheets.filter((ws) => ws.id.startsWith('ws-ch4'))
      : selectedCategory === 'deep_ch5'
      ? publicWorksheets.filter((ws) => ws.id.startsWith('ws-ch5'))
      : selectedCategory === 'deep_ch6'
      ? publicWorksheets.filter((ws) => ws.id.startsWith('ws-ch6'))
      : selectedCategory === 'deep_ch7'
      ? publicWorksheets.filter((ws) => ws.id.startsWith('ws-ch7'))
      : selectedCategory === 'deep_ch8'
      ? publicWorksheets.filter((ws) => ws.id.startsWith('ws-ch8'))
      : selectedCategory === 'deep_ch9'
      ? publicWorksheets.filter((ws) => ws.id.startsWith('ws-ch9'))
      : selectedCategory === 'deep_ch10'
      ? publicWorksheets.filter((ws) => ws.id.startsWith('ws-ch10'))
      : selectedCategory === 'deep_ch11'
      ? publicWorksheets.filter((ws) => ws.id.startsWith('ws-ch11'))
      : selectedCategory === 'deep_ch12'
      ? publicWorksheets.filter((ws) => ws.id.startsWith('ws-ch12'))
      : selectedCategory === 'deep_ch13'
      ? publicWorksheets.filter((ws) => ws.id.startsWith('ws-ch13'))
      : selectedCategory === 'deep_ch14'
      ? publicWorksheets.filter((ws) => ws.id.startsWith('ws-ch14'))
      : publicWorksheets.filter(
          (ws) =>
            ws.category === selectedCategory ||
            (selectedCategory === 'cbse_ch' &&
              (ws.id.startsWith('ws-ch1') ||
                ws.id.startsWith('ws-ch2') ||
                ws.id.startsWith('ws-ch3') ||
                ws.id.startsWith('ws-ch4') ||
                ws.id.startsWith('ws-ch5') ||
                ws.id.startsWith('ws-ch6') ||
                ws.id.startsWith('ws-ch7') ||
                ws.id.startsWith('ws-ch8') ||
                ws.id.startsWith('ws-ch9') ||
                ws.id.startsWith('ws-ch10') ||
                ws.id.startsWith('ws-ch11') ||
                ws.id.startsWith('ws-ch12') ||
                ws.id.startsWith('ws-ch13') ||
                ws.id.startsWith('ws-ch14')))
        );

  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="worksheet-section">
      {/* Top Header */}
      <header className="worksheet-header">
        <div className="worksheet-header-left">
          <img src="/logo.jpg" alt="Printable Sanskrit worksheets for CBSE school children | EdNet Learn Gurukul" className="worksheet-header-logo" />
          <div>
            <h2 className="worksheet-title">कार्यपत्रिकाः · Printable Sanskrit Worksheets</h2>
            <p className="worksheet-subtitle">
              CBSE Class 7 Sanskrit Deepakam · Grammar Drills · Vedic Mathematics Practice Papers
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.65rem' }}>
          {onOpenReader && (
            <button type="button" className="worksheet-toolbar-btn" onClick={onOpenReader}>
              📖 Deepakam Reader
            </button>
          )}
          {onOpenQuiz && (
            <button type="button" className="worksheet-toolbar-btn" onClick={onOpenQuiz}>
              🎯 Sanskrit Quiz
            </button>
          )}
          {onGoHome && (
            <button type="button" className="worksheet-toolbar-btn" onClick={onGoHome}>
              🏠 Back to Home
            </button>
          )}
        </div>
      </header>

      {/* Gallery View */}
      {!activeWorksheet ? (
        <>
          {/* Category Tabs */}
          <div className="worksheet-categories-bar">
            {visibleCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`worksheet-cat-pill${selectedCategory === cat.id ? ' active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Worksheet Cards Grid */}
          <div className="worksheet-grid">
            {filteredWorksheets.map((ws) => (
              <div key={ws.id} className="worksheet-card">
                <div className="worksheet-card-top">
                  <span className="worksheet-card-badge">{ws.grade}</span>
                  <span className="worksheet-card-marks">{ws.totalMarks} Marks</span>
                </div>

                <h3 className="worksheet-card-title">{ws.title}</h3>
                <p className="worksheet-card-desc">{ws.description}</p>

                <div className="worksheet-card-footer">
                  <span className="worksheet-card-time">⏱️ {ws.timeLimit}</span>
                  <button
                    type="button"
                    className="worksheet-view-btn"
                    onClick={() => {
                      setActiveWorksheet(ws);
                      setShowAnswerKey(false);
                    }}
                  >
                    <span>🖨️</span>
                    <span>View &amp; Print Sheet</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* Printable Paper View */
        <div className="worksheet-viewer">
          {/* Action Toolbar */}
          <div className="worksheet-viewer-toolbar">
            <button
              type="button"
              className="worksheet-toolbar-btn"
              onClick={() => setActiveWorksheet(null)}
            >
              ← Back to All Worksheets
            </button>

            <div style={{ display: 'flex', gap: '0.65rem' }}>
              <button
                type="button"
                className="worksheet-toolbar-btn"
                onClick={() => setShowAnswerKey(!showAnswerKey)}
                style={{
                  background: showAnswerKey ? '#dcfce7' : '#fff',
                  borderColor: showAnswerKey ? '#22c55e' : '#dfd3bf',
                  color: showAnswerKey ? '#15803d' : '#4b3e2e',
                }}
              >
                {showAnswerKey ? '✓ Hide Answer Key' : '👁️ Show Answer Key (Teacher Mode)'}
              </button>

              <button
                type="button"
                className="worksheet-print-primary-btn"
                onClick={handlePrint}
              >
                <span>🖨️</span>
                <span>Print / Save PDF (A4)</span>
              </button>
            </div>
          </div>

          {/* A4 Document Paper */}
          <div className="worksheet-paper" id="printable-worksheet">
            {/* Gurukul Official Header */}
            <div className="ws-paper-header">
              <div className="ws-paper-brand-row">
                <img src="/logo.jpg" alt="Printable Sanskrit worksheets for CBSE school children | EdNet Learn Gurukul" className="ws-paper-logo" />
                <div>
                  <div className="ws-paper-school-name">EdNet Learn Gurukul</div>
                  <div className="ws-paper-school-sub">
                    CBSE Board Exam Curriculum · Sanskrit &amp; Vedic Mathematics
                  </div>
                </div>
              </div>
              <h3 className="ws-paper-exam-title">{activeWorksheet.titleSanskrit}</h3>
              <div style={{ fontSize: '0.9rem', color: '#4b5563', fontWeight: 600 }}>
                {activeWorksheet.title} ({activeWorksheet.grade})
              </div>
            </div>

            {/* Student Fillable Meta Grid */}
            <div className="ws-paper-meta-grid">
              <div className="ws-paper-meta-item">
                <strong>छात्रस्य नाम (Student Name):</strong> ______________________
              </div>
              <div className="ws-paper-meta-item">
                <strong>क्रमाङ्कः (Roll No):</strong> ______
              </div>
              <div className="ws-paper-meta-item">
                <strong>दिनाङ्कः (Date):</strong> __________
              </div>
              <div className="ws-paper-meta-item">
                <strong>कक्षा / वर्गः (Class &amp; Sec):</strong> VII - ____
              </div>
              <div className="ws-paper-meta-item">
                <strong>समयः (Time):</strong> {activeWorksheet.timeLimit}
              </div>
              <div className="ws-paper-meta-item">
                <strong>पूर्णाङ्काः (Max Marks):</strong> {activeWorksheet.totalMarks}
              </div>
            </div>

            {/* Sections & Questions */}
            {activeWorksheet.sections.map((section, sIdx) => (
              <div key={sIdx} className="ws-paper-section">
                <div className="ws-paper-section-head">
                  <span className="ws-paper-section-title">
                    {section.sectionTitleSanskrit} · {section.sectionTitle}
                  </span>
                  <span className="ws-paper-section-marks">[{section.totalMarks} Marks]</span>
                </div>

                <div className="ws-paper-instructions">
                  {section.instructions}
                </div>

                <div className="ws-paper-q-list">
                  {section.questions.map((q) => (
                    <div key={q.num} className="ws-paper-q-item">
                      <div className="ws-paper-q-top">
                        <span className="ws-paper-q-text">
                          {q.num}. {q.question}
                        </span>
                        <span className="ws-paper-q-marks">[{q.marks}M]</span>
                      </div>

                      {q.options && q.options.length > 0 && (
                        <div className="ws-paper-q-options">
                          {q.options.map((opt, oIdx) => (
                            <div key={oIdx}>
                              ({String.fromCharCode(97 + oIdx)}) {opt}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Blank writing area for student answer */}
                      {!showAnswerKey && (
                        <div style={{ minHeight: q.type === 'short_ans' ? '42px' : '22px', borderBottom: '1px dotted #9ca3af', marginTop: '0.35rem', marginBottom: '0.2rem' }} />
                      )}

                      {/* Teacher Answer Key display */}
                      {showAnswerKey && (
                        <div className="ws-paper-answer-box">
                          <span className="ws-paper-answer-label">✓ उत्तरम् (Answer):</span>
                          <span>{q.answer}</span>
                          {q.explanation && (
                            <span style={{ display: 'block', fontSize: '0.78rem', color: '#047857', marginTop: '0.2rem' }}>
                              💡 {q.explanation}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Paper Footer note */}
            <div style={{ marginTop: '2rem', borderTop: '1px solid #e5e7eb', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#6b7280' }}>
              <span>EdNet Learn Gurukul · Support: care@ednetlearn.in</span>
              <span>शुभकामनाः · Best Wishes for CBSE Sanskrit Exams!</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default WorksheetSection;
