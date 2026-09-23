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
          {/* Brand & Mission Column */}
          <div className="footer-col footer-col--brand">
            <div className="footer-brand-header">
              <div className="footer-brand-logo-frame">
                <img
                  src="/logo.jpg"
                  alt="EdNet Learn Gurukul online Sanskrit learning"
                  className="footer-brand-logo"
                  loading="lazy"
                />
              </div>
              <div className="footer-brand-meta">
                <h3 className="footer-brand-name">EdNet Learn Gurukul</h3>
                <span className="footer-brand-tagline">संस्कृत-शिक्षणम् · CBSE / NCERT Deepakam</span>
              </div>
            </div>

            <p className="footer-mission-text">
              An enlightened digital Gurukul dedicated to revitalizing Sanskrit learning and ancient Indian mathematics through intuitive, interactive pedagogy for school learners and lifelong enthusiasts.
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
              <span className="footer-trust-chip">🛡️ CBSE Class 7 Aligned</span>
              <span className="footer-trust-chip">🇮🇳 NEP 2020 Compliant</span>
              <span className="footer-trust-chip">🔒 100% Secure Checkout</span>
            </div>
          </div>

          {/* Academic Curriculum Links */}
          <div className="footer-col">
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
                  <span className="nav-btn-text">CBSE Class 7 'दीपकम' (1–15)</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-nav-btn"
                  onClick={onOpenVarnamala}
                >
                  <span className="nav-btn-icon">🔤</span>
                  <span className="nav-btn-text">वर्णमाला · Alphabet &amp; Syllables</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-nav-btn"
                  onClick={onOpenGrammar}
                >
                  <span className="nav-btn-icon">📚</span>
                  <span className="nav-btn-text">व्याकरणम् · Noun &amp; Verb Tables</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-nav-btn"
                  onClick={onOpenDhatupatha}
                >
                  <span className="nav-btn-icon">🌿</span>
                  <span className="nav-btn-text">धातुपाठः · Dhātupāṭha Studio</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-nav-btn"
                  onClick={onOpenVedicMaths}
                >
                  <span className="nav-btn-icon">⚡</span>
                  <span className="nav-btn-text">वैदिक-गणितम् · 16 Vedic Sūtras</span>
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
            </ul>
          </div>

          {/* Interactive Studios */}
          <div className="footer-col">
            <div className="footer-col-header">
              <span className="footer-col-accent">✦</span>
              <h4 className="footer-col-title">Interactive Studios</h4>
            </div>
            <ul className="footer-nav-list">
              <li>
                <button
                  type="button"
                  className="footer-nav-btn"
                  onClick={onOpenBoard}
                >
                  <span className="nav-btn-icon">🧩</span>
                  <span className="nav-btn-text">जोडो · Tile Puzzle Studio</span>
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
                  <span className="nav-btn-text">कार्यपत्रिकाः · Printable Worksheets</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-nav-btn"
                  onClick={onOpenDhatupatha}
                >
                  <span className="nav-btn-icon">🔍</span>
                  <span className="nav-btn-text">पद-विच्छेदकः · Deconstructor</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-nav-btn"
                  onClick={onOpenPhilosophy}
                >
                  <span className="nav-btn-icon">🪔</span>
                  <span className="nav-btn-text">दर्शनम् · Gurukul Philosophy</span>
                </button>
              </li>
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

          {/* Learning Paths */}
          <div className="footer-col">
            <div className="footer-col-header">
              <span className="footer-col-accent">✦</span>
              <h4 className="footer-col-title">Learning Paths</h4>
            </div>
            <ul className="footer-nav-list">
              <li>
                <button
                  type="button"
                  className="footer-nav-btn"
                  onClick={onOpenVarnamala}
                >
                  <span className="nav-btn-icon">🌱</span>
                  <span className="nav-btn-text">Beginner: Letters &amp; Sounds</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-nav-btn"
                  onClick={() => onOpenReader && onOpenReader('gsde101')}
                >
                  <span className="nav-btn-icon">🌿</span>
                  <span className="nav-btn-text">Intermediate: Deepakam Texts</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-nav-btn"
                  onClick={onOpenGrammar}
                >
                  <span className="nav-btn-icon">🌳</span>
                  <span className="nav-btn-text">Advanced: Grammar &amp; Shlokas</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-nav-btn"
                  onClick={onOpenDhatupatha}
                >
                  <span className="nav-btn-icon">📜</span>
                  <span className="nav-btn-text">सिद्धान्त-मञ्जरी · Grammar Articles</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-nav-btn"
                  onClick={onOpenVedicMaths}
                >
                  <span className="nav-btn-icon">🔢</span>
                  <span className="nav-btn-text">Speed Maths &amp; Mental Sutras</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Student Support & Help Desk */}
          <div className="footer-col footer-col--support">
            <div className="footer-col-header">
              <span className="footer-col-accent">✦</span>
              <h4 className="footer-col-title">Academic Support</h4>
            </div>
            <p className="footer-support-intro">
              Have questions regarding CBSE syllabus alignment, subscriptions, or worksheets? Contact our desk:
            </p>

            <div className="footer-contact-cards">
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
                  <span className="contact-label">Administration &amp; Schools</span>
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
