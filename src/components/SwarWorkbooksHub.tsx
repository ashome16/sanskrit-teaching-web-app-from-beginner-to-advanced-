import React, { Suspense, lazy } from 'react';
import { SWAR_SECTIONS } from '../data/swarBook';
import { downloadWorkbook } from '../utils/workbookDownload';
import { useAuthStore } from '../store/authStore';
import { hasPaidAccess } from '../utils/premiumAccess';

const WorkbookPreviews = lazy(() => import('./WorkbookPreviews'));

export interface SwarWorkbooksHubProps {
  onSwitchToQuizzes: () => void;
  onSwitchToWriting: () => void;
  onSwitchToSound: () => void;
  onOpenWorksheets: (category?: string) => void;
  onOpenFlashcards?: () => void;
  onOpenChart?: () => void;
  onOpenVideo?: () => void;
  onOpenCertificate?: () => void;
  onOpenBarakhadi?: () => void;
}

const SwarWorkbooksHub: React.FC<SwarWorkbooksHubProps> = ({
  onSwitchToQuizzes,
  onSwitchToWriting,
  onSwitchToSound,
  onOpenWorksheets,
  onOpenFlashcards,
  onOpenChart,
  onOpenVideo,
  onOpenCertificate,
  onOpenBarakhadi,
}) => {
  const { currentUser, isAdminLoggedIn } = useAuthStore();
  const isPaidMember = hasPaidAccess(currentUser, isAdminLoggedIn);

  return (
    <div className="swar-workbooks-hub" role="region" aria-label="Swar and Workbooks Learning Hub">
      {/* Hero Presentation Header */}
      <div className="swar-hub-hero">
        <div className="swar-hub-hero-badge">
          <span>📚 अभ्यास-पुस्तिकाः व सामग्री</span>
          <span>·</span>
          <span>The Darśana Foundation Series</span>
        </div>
        <h2 className="swar-hub-hero-title">
          स्वर &amp; अभ्यास-पुस्तिका केन्द्रम् · Swar, Workbooks &amp; Materials Hub
        </h2>
        <p className="swar-hub-hero-desc">
          Everything for foundational Sanskrit learning clubbed together: printed workbooks, spoken audio guides,
          interactive chapter-by-chapter review quizzes, handwriting tracing slates, and classroom-tested printable worksheets.
        </p>

        {/* Quick Hub Navigation Pills */}
        <div className="swar-hub-quick-pills">
          <button
            type="button"
            className="swar-quick-pill swar-quick-pill--quiz"
            onClick={onSwitchToQuizzes}
            title="Take the 9 interactive Swar review quiz sets (pages 23–24)"
          >
            <span className="swar-pill-icon">🎯</span>
            <span>Swar Quizzes (9 Sets)</span>
            <span className="swar-pill-tag">Review Test</span>
          </button>
          <button
            type="button"
            className="swar-quick-pill swar-quick-pill--writing"
            onClick={onSwitchToWriting}
            title="Practice Devanagari stroke order on interactive tracing slate"
          >
            <span className="swar-pill-icon">✍️</span>
            <span>Writing Tracing Slate</span>
          </button>
          <button
            type="button"
            className="swar-quick-pill swar-quick-pill--sound"
            onClick={onSwitchToSound}
            title="Listen to all vowel and consonant audio tiles"
          >
            <span className="swar-pill-icon">🔊</span>
            <span>Alphabet Sound Board</span>
          </button>
          <button
            type="button"
            className="swar-quick-pill swar-quick-pill--worksheets"
            onClick={() => onOpenWorksheets('varnamala')}
            title="Open printable alphabet & syllables worksheets"
          >
            <span className="swar-pill-icon">📑</span>
            <span>Printable Worksheets</span>
          </button>
          {onOpenCertificate && (
            <button
              type="button"
              className="swar-quick-pill swar-quick-pill--cert"
              onClick={onOpenCertificate}
              title="Claim your Darśana Series Certificate of Completion"
            >
              <span className="swar-pill-icon">🏅</span>
              <span>Claim Certificate</span>
            </button>
          )}
        </div>
      </div>

      {/* Featured Primary Spotlight: Swar Sanskrit Workbook */}
      <div className="swar-spotlight-card">
        <div className="swar-spotlight-ribbon">⭐ Primary Foundational Workbook</div>
        <div className="swar-spotlight-grid">
          <div className="swar-spotlight-visual">
            <div className="swar-book-mockup">
              <img
                src="/downloads/previews/basic-p1-sm.webp"
                alt="Swar Sanskrit Workbook Cover"
                className="swar-book-cover-img"
                width={200}
                height={280}
              />
              <span className="swar-book-page-badge">28 Pages · Vector PDF</span>
            </div>
          </div>

          <div className="swar-spotlight-content">
            <div className="swar-spotlight-kicker">
              <span>The Darśana Series by Sesha K Penumallu</span>
              <span>·</span>
              <span className="swar-tag-active">Active Curriculum</span>
            </div>
            <h3 className="swar-spotlight-title">
              Swar · स्वर — Sanskrit Workbook
            </h3>
            <p className="swar-spotlight-summary">
              The foundational workbook introducing Sanskrit vowels (ह्रस्व &amp; दीर्घ स्वराः), first vocabulary
              (जलम्, फलम्, पुष्पम्), counting digits 1–10 (सङ्ख्याः), conversation greetings, colours (वर्णाः),
              and sentence construction with the Review Test on pages 23–24.
            </p>

            {/* Clubbed Quizzes Integration Bar */}
            <div className="swar-clubbed-quizzes-box">
              <div className="swar-cq-header">
                <span className="swar-cq-icon">🎯</span>
                <div>
                  <h4 className="swar-cq-title">Corresponding Practice Quizzes (pp. 23–24)</h4>
                  <p className="swar-cq-sub">
                    Directly clubbed with this workbook: 9 interactive test sets with instant scoring, hints, and book page citations.
                  </p>
                </div>
              </div>
              <div className="swar-cq-sets-chips">
                <span className="swar-cq-chip">A: Meanings (12 Qs)</span>
                <span className="swar-cq-chip">B: Sanskrit Words (12 Qs)</span>
                <span className="swar-cq-chip">C: Verbs (पठामि/पठसि)</span>
                <span className="swar-cq-chip">D: Pronouns (सः/सा/तत्)</span>
                <span className="swar-cq-chip">E: Numbers 1–10</span>
                <span className="swar-cq-chip">Match Pairs Game</span>
                <span className="swar-cq-chip">🔊 Listening Drills</span>
                <span className="swar-cq-chip">Subhāṣita Saying</span>
              </div>
              <div className="swar-cq-actions">
                <button
                  type="button"
                  className="swar-cq-primary-cta"
                  onClick={onSwitchToQuizzes}
                >
                  🎯 Launch Swar Review Quizzes (9 Sets) →
                </button>
                {onOpenCertificate && (
                  <button
                    type="button"
                    className="swar-cq-cert-cta"
                    onClick={onOpenCertificate}
                  >
                    🏅 Certificate Exam (Score 70% to Download)
                  </button>
                )}
              </div>
            </div>

            {/* Actions: Download & Audio */}
            <div className="swar-spotlight-actions">
              <button
                type="button"
                className={`swar-btn-download${isPaidMember ? '' : ' locked'}`}
                onClick={() => downloadWorkbook('sanskrit-basic-workbook.pdf')}
                title={isPaidMember ? 'Download full printable 28-page PDF' : 'Paid membership required to download printable vector PDF'}
              >
                {isPaidMember ? '⬇️ Download Workbook (PDF)' : '🔒 Download Workbook (Members)'}
              </button>
              <button
                type="button"
                className="swar-btn-outline"
                onClick={onSwitchToWriting}
              >
                ✍️ Handwriting Tracing Slate
              </button>
              <button
                type="button"
                className="swar-btn-outline"
                onClick={onSwitchToSound}
              >
                🔊 Audio Pronunciation Grid
              </button>
            </div>
          </div>
        </div>

        {/* Section Mapping Grid */}
        <div className="swar-sections-preview">
          <div className="swar-sections-label">📖 Book Curriculum Breakdown:</div>
          <div className="swar-sections-chips">
            {SWAR_SECTIONS.map((sec) => (
              <div key={sec.id} className="swar-section-pill">
                <span className="swar-sec-id">{sec.label.split('·')[0].trim()}</span>
                <span className="swar-sec-title">{sec.label.split('·')[1]?.trim() || sec.label}</span>
                <span className="swar-sec-pages">{sec.pages}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Curriculum Workbooks Suite & Online Previews */}
      <div className="swar-suite-section">
        <div className="swar-suite-header">
          <div>
            <span className="swar-suite-tag">Complete Darśana Library</span>
            <h3 className="swar-suite-title">
              📚 Browse All 7 Workbooks &amp; Spoken Audio Guides
            </h3>
            <p className="swar-suite-desc">
              Flip through pages, listen to Sanskrit &amp; bilingual recitation recordings, and practice matching curriculum exercises.
            </p>
          </div>
        </div>

        {/* Embedded Interactive Workbook Previews */}
        <Suspense fallback={<div className="swar-loading-box">Loading interactive workbook flipbooks…</div>}>
          <WorkbookPreviews />
        </Suspense>
      </div>

      {/* Foundational Learning Materials Grid */}
      <div className="swar-materials-section">
        <div className="swar-materials-header">
          <div>
            <span className="swar-materials-tag">अध्ययन-सामग्री · Study Material</span>
            <h3 className="swar-materials-title">
              📑 Clubbed Foundation Materials &amp; Classroom Practice
            </h3>
            <p className="swar-materials-desc">
              Reinforce what you learn in the Swar workbook with printable worksheets, flashcards, and phonetic anatomy guides.
            </p>
          </div>
        </div>

        <div className="swar-materials-grid">
          {/* Material 1: WS-V01 */}
          <div
            className="swar-material-card"
            role="button"
            tabIndex={0}
            onClick={() => onOpenWorksheets('varnamala')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenWorksheets('varnamala');
              }
            }}
          >
            <div className="swar-mat-icon">🔤</div>
            <div className="swar-mat-body">
              <span className="swar-mat-badge">Worksheet WS-V01</span>
              <h4 className="swar-mat-title">स्वर-परिचयः · Vowels Masterclass</h4>
              <p className="swar-mat-text">
                Short vs. long vowels (ह्रस्व/दीर्घ), stroke orders, animal words, and fill-in sequence drills.
              </p>
              <span className="swar-mat-cta">Open Worksheet →</span>
            </div>
          </div>

          {/* Material 2: WS-V02 */}
          <div
            className="swar-material-card"
            role="button"
            tabIndex={0}
            onClick={() => onOpenWorksheets('varnamala')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenWorksheets('varnamala');
              }
            }}
          >
            <div className="swar-mat-icon">🎯</div>
            <div className="swar-mat-body">
              <span className="swar-mat-badge">Worksheet WS-V02</span>
              <h4 className="swar-mat-title">स्पर्श-व्यञ्जनानि · 5 Consonant Varnas</h4>
              <p className="swar-mat-text">
                5 consonant families (क to प), articulation places, unvoiced vs voiced aspiration exercises.
              </p>
              <span className="swar-mat-cta">Open Worksheet →</span>
            </div>
          </div>

          {/* Material 3: Printable Flashcards */}
          <div
            className="swar-material-card"
            role="button"
            tabIndex={0}
            onClick={onOpenFlashcards}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenFlashcards?.();
              }
            }}
          >
            <div className="swar-mat-icon">🎴</div>
            <div className="swar-mat-body">
              <span className="swar-mat-badge">Printable PDF</span>
              <h4 className="swar-mat-title">वर्णमाला Flashcards Kit</h4>
              <p className="swar-mat-text">
                High-resolution printable flashcards with Devanagari letters, English transliteration, and animal illustrations.
              </p>
              <span className="swar-mat-cta">Download Flashcards Kit 📥</span>
            </div>
          </div>

          {/* Material 4: Articulation Anatomy Chart */}
          <div
            className="swar-material-card"
            role="button"
            tabIndex={0}
            onClick={onOpenChart}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenChart?.();
              }
            }}
          >
            <div className="swar-mat-icon">🗺️</div>
            <div className="swar-mat-body">
              <span className="swar-mat-badge">Visual Chart</span>
              <h4 className="swar-mat-title">उच्चारण-तालिका · Articulation Map</h4>
              <p className="swar-mat-text">
                Anatomic vocal tract diagram detailing throat (कण्ठ), palate (तालु), teeth (दन्त), and lips (ओष्ठ).
              </p>
              <span className="swar-mat-cta">View Articulation Map 🔍</span>
            </div>
          </div>
        </div>

        {/* Bottom Switcher Actions */}
        <div className="swar-materials-footer-actions">
          {onOpenBarakhadi && (
            <button
              type="button"
              className="swar-footer-action-btn swar-footer-action-btn--amber"
              onClick={onOpenBarakhadi}
            >
              <span>🔡</span> Open बारहखड़ी · Guṇintālu 400+ Grid →
            </button>
          )}
          {onOpenVideo && (
            <button
              type="button"
              className="swar-footer-action-btn swar-footer-action-btn--purple"
              onClick={onOpenVideo}
            >
              <span>🎥</span> Science of Sanskrit Sound Video
            </button>
          )}
          <button
            type="button"
            className="swar-footer-action-btn swar-footer-action-btn--teal"
            onClick={onSwitchToQuizzes}
          >
            <span>🎯</span> Go to Swar Review Quizzes (pp. 23–24) →
          </button>
        </div>
      </div>
    </div>
  );
};

export default SwarWorkbooksHub;
