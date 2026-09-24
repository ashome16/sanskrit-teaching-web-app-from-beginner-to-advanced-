import React, { useEffect, useMemo, useState } from 'react';
import { WORKSHEETS, type Worksheet } from '../data/worksheetData';
import { useAuthStore } from '../store/authStore';
import { canDownloadContent, getDownloadGateReason } from '../utils/premiumAccess';
import { PAID_FEATURE_GATE } from '../utils/paidFeatureGateCopy';
import { downloadWorksheet } from '../utils/contentDownload';
import '../styles/worksheet-section.css';

export interface WorksheetSectionProps {
  initialCategory?: string;
  onGoHome?: () => void;
  onOpenQuiz?: () => void;
  onOpenReader?: () => void;
}

type WorksheetMenuLevel = 'varnamala' | 'ncert' | 'grammar' | 'vedic_maths' | 'all';

interface LevelMenuOption {
  id: WorksheetMenuLevel;
  title: string;
  sanskrit: string;
  icon: string;
  desc: string;
  badge: string;
}

const LEVEL_MENU_OPTIONS: LevelMenuOption[] = [
  {
    id: 'varnamala',
    title: 'Alphabet & Syllables',
    sanskrit: 'वर्णमाला (Alphabet & Syllables)',
    icon: '🔤',
    desc: 'Vowels, Consonants, Conjuncts & Word Synthesis',
    badge: '4 Worksheets',
  },
  {
    id: 'ncert',
    title: 'NCERT Chapter-Based',
    sanskrit: 'पाठ-आधारितम् (Class 7 & 8)',
    icon: '📚',
    desc: 'CBSE Deepakam Curriculum Chapter-by-Chapter',
    badge: '14 Chapters · 100+ Sheets',
  },
  {
    id: 'grammar',
    title: 'Grammar Practice',
    sanskrit: 'व्याकरणम् (Vyākaraṇa)',
    icon: '📐',
    desc: 'Sandhi, Karaka, Dhatu, Vibhakti & Suffixes',
    badge: '10 Worksheets',
  },
  {
    id: 'vedic_maths',
    title: 'Vedic Maths Drills',
    sanskrit: 'वैदिक-गणितम् (Vedic Maths)',
    icon: '⚡',
    desc: 'Mental Calculations, Sutras & Speed Drills',
    badge: '4 Drills',
  },
  {
    id: 'all',
    title: 'All Worksheets',
    sanskrit: 'समग्र-पत्राणि (All Worksheets)',
    icon: '📑',
    desc: 'Full Sanskrit Worksheet Repository',
    badge: '180+ Sheets',
  },
];

const CHAPTER_SUBFILTERS = [
  { id: 'all_chapters', label: 'All Chapters (समग्र-पाठाः)' },
  { id: 'deep_ch1', label: 'Ch 1: वन्दे भारतमातरम्' },
  { id: 'deep_ch2', label: 'Ch 2: नित्यं पिबामः सुभाषितरसम्' },
  { id: 'deep_ch3', label: 'Ch 3: मित्राय नमः' },
  { id: 'deep_ch4', label: 'Ch 4: आम्लं द्राक्षाफलम्' },
  { id: 'deep_ch5', label: 'Ch 5: सेवा हि परमो धर्मः' },
  { id: 'deep_ch6', label: 'Ch 6: श्लोकान्त्याक्षरी' },
  { id: 'deep_ch7', label: 'Ch 7: ईशावास्यम् इदम्' },
  { id: 'deep_ch8', label: 'Ch 8: हितं मनोहारि च' },
  { id: 'deep_ch9', label: 'Ch 9: अन्नाद् भवन्ति भूतानि' },
  { id: 'deep_ch10', label: 'Ch 10: दशमः कः?' },
  { id: 'deep_ch11', label: 'Ch 11: द्वीपोऽण्डमानः' },
  { id: 'deep_ch12', label: 'Ch 12: वीराङ्गना पन्नाधाया' },
  { id: 'deep_ch13', label: 'Ch 13: वर्णमात्रा-परिचयः' },
  { id: 'deep_ch14', label: 'Ch 14: शब्दरूपाणि' },
];

const resolveInitialTrack = (cat?: string): { level: WorksheetMenuLevel; subfilter: string } => {
  if (!cat || cat === 'all') return { level: 'all', subfilter: 'all_chapters' };
  if (cat === 'varnamala') return { level: 'varnamala', subfilter: 'all_chapters' };
  if (cat === 'grammar') return { level: 'grammar', subfilter: 'all_chapters' };
  if (cat === 'vedic_maths') return { level: 'vedic_maths', subfilter: 'all_chapters' };
  if (cat === 'cbse_ch') return { level: 'ncert', subfilter: 'all_chapters' };
  if (cat.startsWith('deep_ch') || cat === 'grade8') return { level: 'ncert', subfilter: cat };
  return { level: 'all', subfilter: 'all_chapters' };
};

const WorksheetSection: React.FC<WorksheetSectionProps> = ({
  initialCategory = 'all',
  onGoHome,
  onOpenQuiz,
  onOpenReader,
}) => {
  const initialResolved = useMemo(() => resolveInitialTrack(initialCategory), [initialCategory]);
  const [activeLevel, setActiveLevel] = useState<WorksheetMenuLevel>(initialResolved.level);
  const [selectedChapterSubfilter, setSelectedChapterSubfilter] = useState<string>(
    initialResolved.subfilter
  );
  const [activeWorksheet, setActiveWorksheet] = useState<Worksheet | null>(null);
  const [showAnswerKey, setShowAnswerKey] = useState<boolean>(false);
  const [showUpgradePrompt, setShowUpgradePrompt] = useState<boolean>(false);
  const { isAdminLoggedIn, currentUser, openAuthModal, openPaymentModal } = useAuthStore();
  const canDownload = canDownloadContent(currentUser, isAdminLoggedIn);
  const gateReason = getDownloadGateReason(currentUser, isAdminLoggedIn);

  // Sync state if initialCategory changes externally
  useEffect(() => {
    const resolved = resolveInitialTrack(initialCategory);
    setActiveLevel(resolved.level);
    setSelectedChapterSubfilter(resolved.subfilter);
  }, [initialCategory]);

  const publicWorksheets = useMemo(
    () =>
      isAdminLoggedIn
        ? WORKSHEETS
        : WORKSHEETS.filter((ws) => ws.category !== 'grade8' && !ws.id.startsWith('ws-grade8-')),
    [isAdminLoggedIn]
  );

  const filteredWorksheets = useMemo(() => {
    if (activeLevel === 'varnamala') {
      return publicWorksheets.filter((ws) => ws.category === 'varnamala');
    }
    if (activeLevel === 'grammar') {
      return publicWorksheets.filter((ws) => ws.category === 'grammar');
    }
    if (activeLevel === 'vedic_maths') {
      return publicWorksheets.filter((ws) => ws.category === 'vedic_maths');
    }
    if (activeLevel === 'ncert') {
      if (selectedChapterSubfilter === 'all_chapters') {
        return publicWorksheets.filter(
          (ws) =>
            ws.category === 'cbse_ch' ||
            ws.id.startsWith('ws-ch') ||
            (isAdminLoggedIn && (ws.category === 'grade8' || ws.id.startsWith('ws-grade8-')))
        );
      }
      if (selectedChapterSubfilter === 'grade8') {
        return publicWorksheets.filter(
          (ws) => ws.category === 'grade8' || ws.id.startsWith('ws-grade8-')
        );
      }
      const match = selectedChapterSubfilter.match(/deep_ch(\d+)/);
      if (match) {
        const num = match[1];
        return publicWorksheets.filter(
          (ws) => ws.id === `ws-ch${num}` || ws.id.startsWith(`ws-ch${num}-`)
        );
      }
      return publicWorksheets.filter((ws) => ws.category === selectedChapterSubfilter);
    }
    // 'all'
    return publicWorksheets;
  }, [activeLevel, selectedChapterSubfilter, publicWorksheets, isAdminLoggedIn]);

  const currentLevelOption = useMemo(
    () => LEVEL_MENU_OPTIONS.find((opt) => opt.id === activeLevel) || LEVEL_MENU_OPTIONS[0],
    [activeLevel]
  );

  const requireDownloadAccess = (): boolean => {
    if (canDownload) {
      setShowUpgradePrompt(false);
      return true;
    }
    setShowUpgradePrompt(true);
    if (gateReason === 'guest') {
      openAuthModal('register');
    } else {
      openPaymentModal('unlock_paid_features');
    }
    return false;
  };

  const handlePrint = () => {
    if (!requireDownloadAccess()) return;
    window.print();
  };

  const handleDownload = () => {
    if (!activeWorksheet) return;
    if (!requireDownloadAccess()) return;
    downloadWorksheet(activeWorksheet, showAnswerKey);
  };

  const handleToggleAnswerKey = () => {
    if (showAnswerKey) {
      setShowAnswerKey(false);
      return;
    }
    if (!requireDownloadAccess()) return;
    setShowAnswerKey(true);
  };

  return (
    <section className="worksheet-section">
      {/* Top Header */}
      <header className="worksheet-header">
        <div className="worksheet-header-left">
          <img
            src="/logo.jpg"
            alt="Printable Sanskrit worksheets for CBSE school children | EdNet Learn Gurukul"
            className="worksheet-header-logo"
          />
          <div>
            <h2 className="worksheet-title">कार्यपत्रिकाः · Printable Sanskrit Worksheets</h2>
            <p className="worksheet-subtitle">
              Alphabet &amp; Syllables (वर्णमाला) · CBSE Class 7 &amp; 8 Deepakam · Grammar Drills · Vedic Maths
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
          {/* Level / Curriculum Track Menu Selector */}
          <div className="worksheet-menu-grid" role="tablist" aria-label="Curriculum Level Selector">
            {LEVEL_MENU_OPTIONS.map((lvl) => {
              const isActive = activeLevel === lvl.id;
              return (
                <button
                  key={lvl.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`worksheet-menu-card${isActive ? ' worksheet-menu-card--active' : ''}`}
                  onClick={() => setActiveLevel(lvl.id)}
                >
                  <div className="worksheet-menu-top">
                    <span className="worksheet-menu-icon">{lvl.icon}</span>
                    <span className="worksheet-menu-badge">{lvl.badge}</span>
                  </div>
                  <h3 className="worksheet-menu-title">{lvl.title}</h3>
                  <div className="worksheet-menu-sanskrit">{lvl.sanskrit}</div>
                  <p className="worksheet-menu-desc">{lvl.desc}</p>
                </button>
              );
            })}
          </div>

          {/* Sub-bar for NCERT chapters when NCERT level is active */}
          {activeLevel === 'ncert' && (
            <div className="worksheet-chapter-subbar">
              <div className="worksheet-chapter-subbar-header">
                <span className="worksheet-chapter-subbar-title">
                  📖 Select NCERT Deepakam Chapter (पाठं चिनोतु):
                </span>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  Showing {filteredWorksheets.length} practice sheet{filteredWorksheets.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="worksheet-chapter-pills" role="tablist">
                {CHAPTER_SUBFILTERS.map((ch) => (
                  <button
                    key={ch.id}
                    type="button"
                    role="tab"
                    aria-selected={selectedChapterSubfilter === ch.id}
                    className={`worksheet-chapter-pill${
                      selectedChapterSubfilter === ch.id ? ' active' : ''
                    }`}
                    onClick={() => setSelectedChapterSubfilter(ch.id)}
                  >
                    {ch.label}
                  </button>
                ))}
                {isAdminLoggedIn && (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={selectedChapterSubfilter === 'grade8'}
                    className={`worksheet-chapter-pill${
                      selectedChapterSubfilter === 'grade8' ? ' active' : ''
                    }`}
                    onClick={() => setSelectedChapterSubfilter('grade8')}
                  >
                    🪕 Grade 8 (अष्टमकक्षा)
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Active Level Summary Banner */}
          <div className="worksheet-active-summary-banner">
            <div>
              <strong>
                {currentLevelOption.icon} {currentLevelOption.title}
              </strong>{' '}
              — {currentLevelOption.desc}
            </div>
            <div style={{ fontWeight: 700, color: '#0f766e' }}>
              {filteredWorksheets.length} worksheet{filteredWorksheets.length !== 1 ? 's' : ''}{' '}
              available
            </div>
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

            <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                className={`worksheet-toolbar-btn${canDownload || showAnswerKey ? '' : ' locked'}`}
                onClick={handleToggleAnswerKey}
                title={
                  canDownload || showAnswerKey
                    ? 'Toggle teacher answer key'
                    : 'Paid access required for answer keys'
                }
                style={{
                  background: showAnswerKey ? '#dcfce7' : '#fff',
                  borderColor: showAnswerKey ? '#22c55e' : '#dfd3bf',
                  color: showAnswerKey ? '#15803d' : '#4b3e2e',
                }}
              >
                {showAnswerKey
                  ? '✓ Hide Answer Key'
                  : canDownload
                  ? '👁️ Show Answer Key (Teacher Mode)'
                  : '🔒 Answer Key (Paid)'}
              </button>

              <button
                type="button"
                className={`worksheet-download-btn${canDownload ? '' : ' locked'}`}
                onClick={handleDownload}
                title={canDownload ? 'Download printable HTML worksheet' : 'Paid access required to download'}
              >
                <span>{canDownload ? '⬇️' : '🔒'}</span>
                <span>{canDownload ? 'Download Worksheet' : 'Download (Paid)'}</span>
              </button>

              <button
                type="button"
                className={`worksheet-print-primary-btn${canDownload ? '' : ' locked'}`}
                onClick={handlePrint}
                title={canDownload ? 'Print or save as PDF' : 'Paid access required to print'}
              >
                <span>{canDownload ? '🖨️' : '🔒'}</span>
                <span>Print / Save PDF (A4)</span>
              </button>
            </div>
          </div>

          {showUpgradePrompt && !canDownload && (
            <div className="worksheet-upgrade-banner" role="status">
              <div>
                <strong>
                  {gateReason === 'guest'
                    ? PAID_FEATURE_GATE.bannerTitleGuest
                    : gateReason === 'trial'
                    ? PAID_FEATURE_GATE.bannerTitleTrial
                    : PAID_FEATURE_GATE.bannerTitleExpired}
                </strong>
                <p>
                  {gateReason === 'guest'
                    ? PAID_FEATURE_GATE.bannerBodyGuest
                    : gateReason === 'trial'
                    ? PAID_FEATURE_GATE.bannerBodyTrial
                    : PAID_FEATURE_GATE.bannerBodyExpired}
                </p>
              </div>
              <div className="worksheet-upgrade-actions">
                {gateReason === 'guest' ? (
                  <button type="button" className="worksheet-print-primary-btn" onClick={() => openAuthModal('register')}>
                    {PAID_FEATURE_GATE.ctaGuest}
                  </button>
                ) : (
                  <button type="button" className="worksheet-print-primary-btn" onClick={() => openPaymentModal('unlock_paid_features')}>
                    {PAID_FEATURE_GATE.ctaSubscribe}
                  </button>
                )}
                <button type="button" className="worksheet-toolbar-btn" onClick={() => setShowUpgradePrompt(false)}>
                  Dismiss
                </button>
              </div>
            </div>
          )}

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
