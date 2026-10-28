import React, { useState } from 'react';
import { LegalModals, type LegalModalType } from './LegalModals';
import '../styles/footer.css';

export interface FooterProps {
  onOpenReader?: (lessonId?: string) => void;
  onOpenBoard?: () => void;
  onOpenVarnamala?: () => void;
  onOpenGrammar?: () => void;
  onOpenVedicMaths?: () => void;
  onOpenQuiz?: () => void;
  onOpenWorksheets?: () => void;
  onOpenFAQ?: () => void;
  onOpenPhilosophy?: () => void;
  onOpenCbseGuide?: () => void;
  onOpenDhatupatha?: () => void;
  onOpenBodhi?: () => void;
  onOpenResources?: () => void;
  onOpenRoadmap?: () => void;
  onOpenCourse?: () => void;
  onOpenScienceLab?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenReader,
  onOpenBoard,
  onOpenVarnamala,
  onOpenGrammar,
  onOpenVedicMaths,
  onOpenQuiz,
  onOpenWorksheets,
  onOpenFAQ,
  onOpenPhilosophy,
  onOpenCbseGuide,
  onOpenDhatupatha,
  onOpenBodhi,
  onOpenResources,
  onOpenRoadmap,
  onOpenCourse,
  onOpenScienceLab,
}) => {
  const [legalModal, setLegalModal] = useState<LegalModalType>(null);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(text);
    setTimeout(() => setCopiedEmail(null), 2500);
  };

  return (
    <>
      <footer className="gurukul-footer" aria-label="Website Footer">
        {/* Subtle Golden Vedic Aura Top Trim */}
        <div className="gurukul-footer-glow" aria-hidden="true" />

        <div className="gurukul-footer-top">
          {/* Column 1: Brand & Gurukul Seal */}
          <div className="footer-col footer-col--brand">
            <div className="footer-brand-header">
              <div className="footer-brand-logo-frame">
                <img
                  src="/logo.jpg"
                  alt="EdNet Learn Gurukul Official Seal"
                  className="footer-brand-logo"
                  width={56}
                  height={56}
                  loading="lazy"
                />
              </div>
              <div className="footer-brand-meta">
                <div className="footer-seal-badge">
                  <span>🏛️</span>
                  <span>OFFICIAL GURUKUL</span>
                </div>
                <h3 className="footer-brand-name">EdNet Learn Gurukul</h3>
                <span className="footer-brand-tagline" lang="sa">विद्ययाऽमृतमश्नुते · सा विद्या या विमुक्तये</span>
              </div>
            </div>

            <p className="footer-mission-text">
              An enlightened digital Gurukul dedicated to revitalizing Sanskrit learning, CBSE syllabus &amp; ancient Indian mathematics through intuitive, interactive pedagogy.
            </p>

            <div className="footer-shloka-box">
              <div className="footer-shloka-header">
                <span className="footer-shloka-icon">📜</span>
                <span className="footer-shloka-sanskrit">भाषासु मुख्या मधुरा दिव्या गीर्वाणभारती ।</span>
              </div>
              <div className="footer-shloka-trans">
                &ldquo;Among all tongues, the divine language of Sanskrit is foremost, sweet, and eternal.&rdquo;
              </div>
            </div>

            <div className="footer-trust-chips">
              <span className="footer-trust-chip">🛡️ NCERT Deepakam · NEP / CBSE</span>
              <span className="footer-trust-chip">🔒 100% Secure &amp; Verified</span>
            </div>
          </div>

          {/* Column 2: Curriculum & Texts */}
          <div className="footer-col footer-col--curriculum">
            <div className="footer-col-header">
              <span className="footer-col-accent">✦</span>
              <h4 className="footer-col-title">Curriculum &amp; Texts</h4>
            </div>
            <ul className="footer-nav-list">
              <li>
                <button
                  type="button"
                  className="footer-nav-btn"
                  onClick={() => onOpenReader && onOpenReader('gsde101')}
                >
                  <span className="nav-btn-icon">📖</span>
                  <span className="nav-btn-text">Deepakam · दीपकम् (Classes 7–9)</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-nav-btn"
                  onClick={onOpenVarnamala}
                >
                  <span className="nav-btn-icon">🔤</span>
                  <span className="nav-btn-text">वर्णमाला · Alphabet &amp; Sounds</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-nav-btn"
                  onClick={onOpenGrammar}
                >
                  <span className="nav-btn-icon">📚</span>
                  <span className="nav-btn-text">व्याकरणम् · Pāṇinian Grammar</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-nav-btn"
                  onClick={onOpenDhatupatha}
                >
                  <span className="nav-btn-icon">🌿</span>
                  <span className="nav-btn-text">धातुपाठः · 2,000+ Verb Roots</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-nav-btn"
                  onClick={onOpenCbseGuide}
                >
                  <span className="nav-btn-icon">📘</span>
                  <span className="nav-btn-text">CBSE Sanskrit Exam Guide</span>
                </button>
              </li>
              {onOpenRoadmap && (
                <li>
                  <button
                    type="button"
                    className="footer-nav-btn"
                    onClick={onOpenRoadmap}
                  >
                    <span className="nav-btn-icon">🧭</span>
                    <span className="nav-btn-text">Beginner's Roadmap · Start Here</span>
                  </button>
                </li>
              )}
              {onOpenCourse && (
                <li>
                  <button
                    type="button"
                    className="footer-nav-btn"
                    onClick={onOpenCourse}
                  >
                    <span className="nav-btn-icon">🧠</span>
                    <span className="nav-btn-text">संस्कृत-चिन्तनम् · Master Course</span>
                  </button>
                </li>
              )}
              {onOpenResources && (
                <li>
                  <button
                    type="button"
                    className="footer-nav-btn"
                    onClick={onOpenResources}
                  >
                    <span className="nav-btn-icon">🌐</span>
                    <span className="nav-btn-text">साधनानि · Learning Vault</span>
                  </button>
                </li>
              )}
              <li>
                <a
                  href="https://koshashri-dc.ac.in/search/catalog/1/10?searchTerm=%E0%A4%85"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-nav-btn"
                  title="Open Koshashri Sanskrit Dictionary"
                >
                  <span className="nav-btn-icon">📖</span>
                  <span className="nav-btn-text">कोशश्रीः · Sanskrit Dictionary</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Interactive Studios & Labs */}
          <div className="footer-col footer-col--studios">
            <div className="footer-col-header">
              <span className="footer-col-accent">✦</span>
              <h4 className="footer-col-title">Studios &amp; Labs</h4>
            </div>
            <ul className="footer-nav-list">
              <li>
                <button
                  type="button"
                  className="footer-nav-btn"
                  onClick={onOpenVedicMaths}
                >
                  <span className="nav-btn-icon">⚡</span>
                  <span className="nav-btn-text">वैदिक-गणितम् · Vedic Maths</span>
                </button>
              </li>
              {onOpenScienceLab && (
                <li>
                  <button
                    type="button"
                    className="footer-nav-btn"
                    onClick={onOpenScienceLab}
                  >
                    <span className="nav-btn-icon">🔬</span>
                    <span className="nav-btn-text">विज्ञान-प्रयोगशाला · Vijñāna Lab</span>
                  </button>
                </li>
              )}
              <li>
                <button
                  type="button"
                  className="footer-nav-btn"
                  onClick={onOpenBoard}
                >
                  <span className="nav-btn-icon">🧩</span>
                  <span className="nav-btn-text">जोडो · Sanskrit Word Puzzles</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-nav-btn"
                  onClick={onOpenQuiz}
                >
                  <span className="nav-btn-icon">🎯</span>
                  <span className="nav-btn-text">प्रश्नोत्तरी · Chapter Quizzes</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-nav-btn"
                  onClick={onOpenWorksheets}
                >
                  <span className="nav-btn-icon">📑</span>
                  <span className="nav-btn-text">कार्यपत्रिकाः · Worksheets</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-nav-btn"
                  onClick={onOpenPhilosophy}
                >
                  <span className="nav-btn-icon">🪔</span>
                  <span className="nav-btn-text">दर्शनम् · Philosophy &amp; AI</span>
                </button>
              </li>
              {onOpenBodhi && (
                <li>
                  <button
                    type="button"
                    className="footer-nav-btn"
                    onClick={onOpenBodhi}
                  >
                    <span className="nav-btn-icon">✨</span>
                    <span className="nav-btn-text">बोधिः · 24/7 AI Gurukul Guide</span>
                  </button>
                </li>
              )}
              <li>
                <button
                  type="button"
                  className="footer-nav-btn"
                  onClick={onOpenFAQ}
                >
                  <span className="nav-btn-icon">❓</span>
                  <span className="nav-btn-text">Gurukul FAQ &amp; Pricing</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Student Support & Community */}
          <div className="footer-col footer-col--support">
            <div className="footer-col-header">
              <span className="footer-col-accent">✦</span>
              <h4 className="footer-col-title">Academic Support</h4>
            </div>

            <p className="footer-support-intro">
              Direct assistance for CBSE syllabus, doubts, or membership queries:
            </p>

            <div className="footer-contact-cards">
              <div className="footer-contact-card footer-contact-card--whatsapp">
                <div className="contact-icon-wrapper contact-icon-wrapper--whatsapp">
                  <span className="contact-icon">💬</span>
                </div>
                <div className="contact-info">
                  <span className="contact-label">WhatsApp Helpline</span>
                  <a
                    href="https://wa.me/919000335468"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link contact-link--whatsapp"
                  >
                    +91 9000335468
                  </a>
                  <span className="contact-note">Only WhatsApp · Quick support</span>
                </div>
                <a
                  href="https://wa.me/919000335468"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-chat-btn"
                  title="Message on WhatsApp"
                >
                  Chat ➔
                </a>
              </div>

              <div className="footer-contact-card">
                <div className="contact-icon-wrapper">
                  <span className="contact-icon">📧</span>
                </div>
                <div className="contact-info">
                  <span className="contact-label">Learner &amp; Parent Care</span>
                  <a href="mailto:care@ednetlearn.in" className="contact-link">
                    care@ednetlearn.in
                  </a>
                </div>
                <button
                  type="button"
                  className={`contact-copy-btn${copiedEmail === 'care@ednetlearn.in' ? ' contact-copy-btn--copied' : ''}`}
                  onClick={() => copyToClipboard('care@ednetlearn.in')}
                  title="Copy email to clipboard"
                >
                  {copiedEmail === 'care@ednetlearn.in' ? '✓ Copied' : 'Copy'}
                </button>
              </div>

              <div className="footer-contact-card">
                <div className="contact-icon-wrapper">
                  <span className="contact-icon">🏛️</span>
                </div>
                <div className="contact-info">
                  <span className="contact-label">Schools &amp; Administration</span>
                  <a href="mailto:admin@ednetlearn.in" className="contact-link">
                    admin@ednetlearn.in
                  </a>
                </div>
                <button
                  type="button"
                  className={`contact-copy-btn${copiedEmail === 'admin@ednetlearn.in' ? ' contact-copy-btn--copied' : ''}`}
                  onClick={() => copyToClipboard('admin@ednetlearn.in')}
                  title="Copy email to clipboard"
                >
                  {copiedEmail === 'admin@ednetlearn.in' ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            </div>

            <div className="footer-helpdesk-status">
              <span className="helpdesk-indicator-dot" />
              <span className="helpdesk-status-text">Support desk active · Mon–Sat (IST)</span>
            </div>

            <div className="footer-social-section">
              <span className="footer-social-label">Gurukul Community</span>
              <div className="footer-social-row">
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-pill footer-social-pill--youtube"
                  title="Watch Vedic Maths Tricks on YouTube"
                >
                  <span className="social-pill-icon">▶️</span>
                  <span>YouTube Shorts</span>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-pill footer-social-pill--instagram"
                  title="Follow Sanskrit Word of the Day on Instagram"
                >
                  <span className="social-pill-icon">📸</span>
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Ornate Divider with Sanskrit Emblem */}
        <div className="footer-divider-ornament">
          <div className="ornament-line" />
          <span className="ornament-symbol">✦ · ॐ · ✦</span>
          <div className="ornament-line" />
        </div>

        {/* Footer Bottom Bar */}
        <div className="gurukul-footer-bottom">
          <div className="footer-copyright">
            <div>
              © {new Date().getFullYear()} <strong>EdNet Learn Gurukul</strong> (ednetlearn.in). All rights reserved.
            </div>
            <div className="footer-tagline-motto">
              विद्या ददाति विनयं विनयाद्याति पात्रताम्
            </div>
          </div>

          <div className="footer-legal-links">
            <button
              type="button"
              className="footer-legal-btn"
              onClick={() => setLegalModal('terms')}
            >
              Terms of Service
            </button>
            <span className="legal-sep">·</span>
            <button
              type="button"
              className="footer-legal-btn"
              onClick={() => setLegalModal('privacy')}
            >
              Privacy Policy
            </button>
            <span className="legal-sep">·</span>
            <button
              type="button"
              className="footer-legal-btn"
              onClick={() => setLegalModal('refund')}
            >
              Refund &amp; Cancellation Policy
            </button>
          </div>
        </div>
      </footer>

      {/* Trust & Compliance Modals */}
      <LegalModals activeModal={legalModal} onClose={() => setLegalModal(null)} />
    </>
  );
};

export default Footer;
