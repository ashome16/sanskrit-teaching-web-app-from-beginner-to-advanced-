import React from 'react';
import '../styles/legal-modals.css';

export type LegalModalType = 'terms' | 'privacy' | 'refund' | null;

interface LegalModalsProps {
  activeModal: LegalModalType;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalsProps> = ({ activeModal, onClose }) => {
  if (!activeModal) return null;

  return (
    <div className="legal-modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="legal-modal-container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="legal-modal-close-btn"
          onClick={onClose}
          aria-label="Close dialog"
        >
          ×
        </button>

        {activeModal === 'terms' && (
          <div className="legal-modal-body">
            <span className="legal-modal-badge">Legal Documentation</span>
            <h2 id="legal-modal-title" className="legal-modal-title">Terms of Service</h2>
            <p className="legal-modal-updated">Last Updated: September 2026 · EdNet Learn Gurukul</p>

            <section className="legal-modal-section">
              <h3>1. Acceptance of Terms</h3>
              <p>
                By accessing and using <strong>EdNet Learn Gurukul</strong> (ednetlearn.in), you agree to comply with and be bound by these Terms of Service. If you do not agree with any part of these terms, please refrain from using our learning portal.
              </p>
            </section>

            <section className="legal-modal-section">
              <h3>2. Educational Purpose &amp; Curriculum Alignment</h3>
              <p>
                EdNet Learn Gurukul provides digital educational tools, interactive puzzles, pronunciation models, and study guides aligned with the Central Board of Secondary Education (CBSE) Class 7 Sanskrit curriculum (NCERT 'दीपकम') and ancient Indian Vedic Mathematics. Content is curated strictly for academic enrichment and self-paced learning.
              </p>
            </section>

            <section className="legal-modal-section">
              <h3>3. User Accounts &amp; Free Trial</h3>
              <p>
                Learners may register for an account to save learning progress across devices. All new registered learners receive an unrestricted 14-day free trial. You agree to provide accurate information during registration and maintain the confidentiality of your credentials.
              </p>
            </section>

            <section className="legal-modal-section">
              <h3>4. Intellectual Property</h3>
              <p>
                All original learning software, interactive puzzle algorithms, Vedic math engines, audio synthesis scripts, and interface designs are the intellectual property of EdNet Learn. Educational text and shlokas are utilized under fair educational use in harmony with traditional heritage preservation.
              </p>
            </section>

            <section className="legal-modal-section">
              <h3>5. Contact &amp; Grievance Redressal</h3>
              <p>
                For any administrative inquiries or terms-related questions, please contact our legal desk at{' '}
                <a href="mailto:admin@ednetlearn.in">admin@ednetlearn.in</a>.
              </p>
            </section>
          </div>
        )}

        {activeModal === 'privacy' && (
          <div className="legal-modal-body">
            <span className="legal-modal-badge">Data Protection</span>
            <h2 id="legal-modal-title" className="legal-modal-title">Privacy Policy</h2>
            <p className="legal-modal-updated">Last Updated: September 2026 · EdNet Learn Gurukul</p>

            <section className="legal-modal-section">
              <h3>1. Commitment to Student Privacy</h3>
              <p>
                At <strong>EdNet Learn Gurukul</strong>, safeguarding the privacy of students, parents, and educators is paramount. We do not sell, rent, or trade your personal data with third-party advertisers.
              </p>
            </section>

            <section className="legal-modal-section">
              <h3>2. Information We Collect</h3>
              <ul>
                <li><strong>Account Data:</strong> Name, email address, and grade level provided voluntarily during signup.</li>
                <li><strong>Learning Progress:</strong> Completed chapters, quiz scores, puzzle milestones, and reading timestamps to personalize study paths.</li>
                <li><strong>Device &amp; Performance:</strong> Browser type and anonymous analytics to maintain server uptime and optimize audio loading.</li>
              </ul>
            </section>

            <section className="legal-modal-section">
              <h3>3. Payment Information Security</h3>
              <p>
                Payment processing for Gurukul memberships is performed securely via encrypted gateways (UPI, GPay, Apple Pay, Net Banking, and Debit/Credit Cards). EdNet Learn does not store your bank credentials, UPI PINs, or CVVs on our servers.
              </p>
            </section>

            <section className="legal-modal-section">
              <h3>4. Data Retention &amp; Deletion</h3>
              <p>
                You may request complete deletion of your account and learning records at any time by emailing{' '}
                <a href="mailto:care@ednetlearn.in">care@ednetlearn.in</a>.
              </p>
            </section>
          </div>
        )}

        {activeModal === 'refund' && (
          <div className="legal-modal-body">
            <span className="legal-modal-badge">Consumer Protection</span>
            <h2 id="legal-modal-title" className="legal-modal-title">Refund &amp; Cancellation Policy</h2>
            <p className="legal-modal-updated">Last Updated: September 2026 · EdNet Learn Gurukul</p>

            <section className="legal-modal-section">
              <h3>1. 14-Day Risk-Free Trial</h3>
              <p>
                We believe in 100% transparency. Every learner receives a full <strong>14-day free trial</strong> with complete access to all 15 Deepakam textbook chapters, 2,200+ Jodo puzzles, Vedic mathematics masterclass, and printable worksheets without entering credit card details upfront.
              </p>
            </section>

            <section className="legal-modal-section">
              <h3>2. 7-Day Money-Back Guarantee</h3>
              <p>
                If you purchase an Annual Gurukul Pass or Monthly Plan and find that our portal does not meet your academic expectations, you are eligible for a <strong>full refund within 7 days</strong> of the transaction date. No questions asked.
              </p>
            </section>

            <section className="legal-modal-section">
              <h3>3. Refund Processing Time</h3>
              <p>
                Approved refunds are initiated within 24 to 48 hours and credited back to your original payment method (UPI, Bank Account, or Card) within 5 to 7 business days as per standard banking protocols.
              </p>
            </section>

            <section className="legal-modal-section">
              <h3>4. How to Request a Refund</h3>
              <p>
                Simply send an email with your registered email ID and payment transaction reference to{' '}
                <a href="mailto:care@ednetlearn.in">care@ednetlearn.in</a> with subject <em>"Refund Request"</em>. Our student care team will assist you promptly.
              </p>
            </section>
          </div>
        )}

        <div className="legal-modal-footer">
          <button type="button" className="legal-modal-confirm-btn" onClick={onClose}>
            Close &amp; Return to Gurukul
          </button>
        </div>
      </div>
    </div>
  );
};
