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
        <div className="gurukul-footer-top">
          {/* Brand & Mission Column */}
          <div className="footer-col footer-col--brand">
            <div className="footer-brand-header">
              <img
                src="/logo.jpg"
                alt="EdNet Learn Gurukul online Sanskrit classes and Vedic maths for kids"
                className="footer-brand-logo"
                loading="lazy"
              />
              <div>
                <h3 className="footer-brand-name">EdNet Learn Gurukul</h3>
                <span className="footer-brand-tagline">संस्कृत-शिक्षणम् · CBSE / NCERT Deepakam</span>
              </div>
            </div>

            <p className="footer-mission-text">
              An enlightened digital Gurukul dedicated to revitalizing Sanskrit learning and ancient Indian mathematics through intuitive, interactive pedagogy for school learners and lifelong enthusiasts.
            </p>

            <div className="footer-shloka-box">
              <div className="footer-shloka-sanskrit">भाषासु मुख्या मधुरा दिव्या गीर्वाणभारती ।</div>
              <div className="footer-shloka-trans">
                &ldquo;Among all tongues, the divine language of Sanskrit is foremost, sweet, and eternal.&rdquo;
              </div>
            </div>
          </div>


          {/* Learning Paths */}
          <div className="footer-col">
            <h4 className="footer-col-title">Learning Paths</h4>
            <ul className="footer-nav-list">
              <li>
                <button
                  type="button"
                  className="footer-nav-btn"
                  onClick={onOpenVarnamala}
                >
                  Beginner · Varṇamālā &amp; first steps
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-nav-btn"
                  onClick={() => onOpenReader && onOpenReader('gsde101')}
                >
                  Intermediate · CBSE Deepakam Class 7
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-nav-btn"
                  onClick={onOpenGrammar}
                >
                  Advanced · Vyākaraṇa &amp; shlokas
                </button>
              </li>
            </ul>
          </div>

          {/* Academic Curriculum Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Curriculum &amp; Texts</h4>
            <ul className="footer-nav-list">
              <li>
                <button
                  type="button"
                  className="footer-nav-btn"
                  onClick={() => onOpenReader && onOpenReader('gsde101')}
                >
                  📖 CBSE Class 7 'दीपकम' (Chapters 1–15)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-nav-btn"
                  onClick={onOpenVarnamala}
                >
                  🔤 Varṇamālā Audio Alphabet
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-nav-btn"
                  onClick={onOpenGrammar}
                >
                  📚 Vyākaraṇa (Noun &amp; Verb Tables)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-nav-btn"
                  onClick={onOpenVedicMaths}
                >
                  ⚡ वैदिक-गणितम् (16 Vedic Sutras)
                </button>
              </li>
            </ul>
          </div>

          {/* Interactive Tools & Practice */}
          <div className="footer-col">
            <h4 className="footer-col-title">Interactive Studios</h4>
            <ul className="footer-nav-list">
              <li>
                <button
                  type="button"
                  className="footer-nav-btn"
                  onClick={onOpenBoard}
                >
                  🧩 जोडो · Tile Puzzle Studio (2,209 Puzzles)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-nav-btn"
                  onClick={onOpenQuiz}
                >
                  🎯 प्रश्नोत्तरी · Chapter Quizzes
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-nav-btn"
                  onClick={onOpenWorksheets}
                >
                  📑 कार्यपत्रिकाः · Printable Worksheets
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-nav-btn"
                  onClick={onOpenFAQ}
                >
                  ❓ Gurukul FAQ &amp; 14-Day Free Trial
                </button>
              </li>
            </ul>
          </div>

          {/* Student Support & Help Desk */}
          <div className="footer-col footer-col--support">
            <h4 className="footer-col-title">Support &amp; Academic Help</h4>
            <p className="footer-support-intro">
              Have questions regarding CBSE syllabus alignment, subscriptions, or worksheets? Reach our student desk directly:
            </p>

            <div className="footer-contact-cards">
              <div className="footer-contact-card">
                <span className="contact-icon">📧</span>
                <div className="contact-info">
                  <span className="contact-label">Learner &amp; Parent Care:</span>
                  <a href="mailto:care@ednetlearn.in" className="contact-link">
                    care@ednetlearn.in
                  </a>
                </div>
                <button
                  type="button"
                  className="contact-copy-btn"
                  onClick={() => copyToClipboard('care@ednetlearn.in')}
                  title="Copy email to clipboard"
                >
                  {copiedEmail === 'care@ednetlearn.in' ? '✓ Copied' : 'Copy'}
                </button>
              </div>

              <div className="footer-contact-card">
                <span className="contact-icon">🏛️</span>
                <div className="contact-info">
                  <span className="contact-label">Administration &amp; Schools:</span>
                  <a href="mailto:admin@ednetlearn.in" className="contact-link">
                    admin@ednetlearn.in
                  </a>
                </div>
                <button
                  type="button"
                  className="contact-copy-btn"
                  onClick={() => copyToClipboard('admin@ednetlearn.in')}
                  title="Copy email to clipboard"
                >
                  {copiedEmail === 'admin@ednetlearn.in' ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            </div>

            <div className="footer-trust-pills">
              <span className="trust-pill" title="CBSE Board Exam Aligned">
                🛡️ CBSE Class 7 Aligned
              </span>
              <span className="trust-pill" title="National Education Policy 2020 Compliant">
                🇮🇳 NEP 2020 Compliant
              </span>
              <span className="trust-pill" title="Safe & Encrypted Payments">
                🔒 100% Secure Checkout
              </span>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="gurukul-footer-bottom">
          <div className="footer-copyright">
            © {new Date().getFullYear()} <strong>EdNet Learn Gurukul</strong> (ednetlearn.in). All rights reserved.
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
