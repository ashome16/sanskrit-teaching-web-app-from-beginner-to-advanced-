import React, { useState } from 'react';
import { LegalModals, type LegalModalType } from './LegalModals';
import '../styles/trust-and-methodology.css';

export const TrustAndMethodology: React.FC = () => {
  const [legalModal, setLegalModal] = useState<LegalModalType>(null);

  return (
    <section className="tam-section" id="trust-and-methodology" aria-label="About the Founders, Methodology & Safety Safeguards">
      <div className="tam-header">
        <div className="tam-eyebrow">
          <span>विश्वासः · TRUST</span>
        </div>
        <h2 className="tam-title">
          प्रामाणिकता · How We Teach
        </h2>
        <p className="tam-subtitle">Who builds it, how lessons work, and what we promise families.</p>
      </div>

      <div className="tam-grid">
        <div className="tam-card tam-card--founders">
          <h3 className="tam-card-title">Founders</h3>
          <p className="tam-card-lead">
            Led by <strong>Sesha K Penumallu</strong>, author of <em>Swar · स्वर</em> and <em>The Darśana Series</em>.
          </p>
          <ul className="tam-points-list">
            <li>Workbooks used by schools and homeschoolers.</li>
            <li>Research linking Pāṇini’s grammar with computational linguistics.</li>
          </ul>
        </div>

        <div className="tam-card tam-card--methodology">
          <h3 className="tam-card-title">Method · श्रवण-मनन-निदिध्यासनम्</h3>
          <div className="tam-method-steps">
            <div className="tam-ms-row"><span className="tam-ms-num">1</span><div><strong>Śravaṇa:</strong> <span>hear the sounds first.</span></div></div>
            <div className="tam-ms-row"><span className="tam-ms-num">2</span><div><strong>Manana:</strong> <span>build words from roots and tiles.</span></div></div>
            <div className="tam-ms-row"><span className="tam-ms-num">3</span><div><strong>Nididhyāsana:</strong> <span>read NCERT texts and shlokas.</span></div></div>
          </div>
        </div>

        <div className="tam-card tam-card--philosophy">
          <h3 className="tam-card-title">Curriculum</h3>
          <ul className="tam-points-list">
            <li>Follows NCERT <em>Deepakam</em> (Class 7–8) and <em>Sharada</em> (Class 9), CBSE-aligned.</li>
            <li>In step with NEP 2020; Vedic Maths as clear patterns.</li>
          </ul>
        </div>

        <div className="tam-card tam-card--safety">
          <h3 className="tam-card-title">Safety</h3>
          <ul className="tam-points-list">
            <li>No ads. Student data never sold.</li>
            <li>No auto-debit; free trial needs no card.</li>
            <li>Account &amp; site help: WhatsApp <strong>+91 9000335468</strong> · <code>care@ednetlearn.in</code></li>
          </ul>

          <div className="tam-legal-row">
            <button
              type="button"
              className="tam-legal-link"
              onClick={() => setLegalModal('privacy')}
            >
              Privacy Policy ➔
            </button>
            <span className="tam-legal-sep">•</span>
            <button
              type="button"
              className="tam-legal-link"
              onClick={() => setLegalModal('terms')}
            >
              Terms of Service ➔
            </button>
            <span className="tam-legal-sep">•</span>
            <button
              type="button"
              className="tam-legal-link"
              onClick={() => setLegalModal('refund')}
            >
              Refund Policy ➔
            </button>
          </div>
        </div>
      </div>

      {/* Render Legal Modals if open */}
      <LegalModals activeModal={legalModal} onClose={() => setLegalModal(null)} />
    </section>
  );
};

export default TrustAndMethodology;
