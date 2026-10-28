import React, { useState } from 'react';
import { LegalModals, type LegalModalType } from './LegalModals';
import '../styles/trust-and-methodology.css';

export const TrustAndMethodology: React.FC = () => {
  const [legalModal, setLegalModal] = useState<LegalModalType>(null);

  return (
    <section className="tam-section" id="trust-and-methodology" aria-label="About the Founders, Methodology & Safety Safeguards">
      <div className="tam-header">
        <div className="tam-eyebrow">
          <span>🏛️</span>
          <span>विश्वासः एवं कार्यपद्धतिः · TRANSPARENCY &amp; TRUST</span>
        </div>
        <h2 className="tam-title">
          Built on Authentic Resources &amp; Structured Lessons
        </h2>
        <p className="tam-subtitle">
          EdNet Learn Gurukul is an educational initiative dedicated to revitalizing Sanskrit and ancient Indian mathematics through evidence-based pedagogy. Here is who we are, how we teach, and our commitments to parents and schools:
        </p>
      </div>

      <div className="tam-grid">
        {/* Column 1: Academic Leadership & Founders */}
        <div className="tam-card tam-card--founders">
          <div className="tam-card-top">
            <span className="tam-card-badge tam-badge--amber">Academic Stewardship</span>
            <span className="tam-card-icon" aria-hidden="true">👨‍🏫</span>
          </div>
          <h3 className="tam-card-title">About the Founders &amp; Acharyas</h3>
          <p className="tam-card-lead">
            Guided by <strong>Sesha K Penumallu</strong>, author of <em>Swar · स्वर — Sanskrit Workbook</em> and <em>The Darśana Series</em>, in collaboration with traditional Sanskrit Acharyas and computational linguists.
          </p>
          <ul className="tam-points-list">
            <li>
              <strong>Classically Grounded:</strong> Authored print and digital workbooks actively used by school students and homeschoolers across India and abroad.
            </li>
            <li>
              <strong>Computational Linguistics Bridge:</strong> Researching the mathematical intersections of Pāṇini’s <em>Aṣṭādhyāyī</em> with modern Backus-Naur Form (BNF) computer grammars.
            </li>
            <li>
              <strong>Human Touch Guarantee:</strong> Real Sanskrit teachers personally review student compositions, worksheets, and queries submitted via WhatsApp.
            </li>
          </ul>
        </div>

        {/* Column 2: 3-Stage Teaching Methodology */}
        <div className="tam-card tam-card--methodology">
          <div className="tam-card-top">
            <span className="tam-card-badge tam-badge--emerald">Pedagogical Cycle</span>
            <span className="tam-card-icon" aria-hidden="true">🔄</span>
          </div>
          <h3 className="tam-card-title">Our 3-Stage Gurukul Methodology</h3>
          <p className="tam-card-lead">
            We replace rote memorization with the classical Indian tripartite learning cycle (श्रवण-मनन-निदिध्यासनम्):
          </p>
          <div className="tam-method-steps">
            <div className="tam-ms-row">
              <span className="tam-ms-num">1</span>
              <div>
                <strong>Śravaṇa (Acoustic Phonetics):</strong>
                <span>Master sound before script. Learn the 5 vocal articulation zones with authentic native audio.</span>
              </div>
            </div>
            <div className="tam-ms-row">
              <span className="tam-ms-num">2</span>
              <div>
                <strong>Manana (Visual Word Construction):</strong>
                <span>Assemble words like Lego blocks using 6,000+ Jodo tile puzzles and Dhātupāṭha root deconstruction.</span>
              </div>
            </div>
            <div className="tam-ms-row">
              <span className="tam-ms-num">3</span>
              <div>
                <strong>Nididhyāsana (Textual Mastery &amp; Application):</strong>
                <span>Read authentic NCERT stories, untangle shloka word orders (Anvaya), and ace CBSE question formats.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: Curriculum Philosophy & NEP 2020 */}
        <div className="tam-card tam-card--philosophy">
          <div className="tam-card-top">
            <span className="tam-card-badge tam-badge--indigo">Curriculum Standards</span>
            <span className="tam-card-icon" aria-hidden="true">🇮🇳</span>
          </div>
          <h3 className="tam-card-title">Curriculum Philosophy &amp; NEP 2020</h3>
          <p className="tam-card-lead">
            Aligned with India&apos;s <strong>National Education Policy (NEP 2020)</strong> promoting multi-disciplinary heritage learning, linguistic computational thinking, and joy in foundational literacy.
          </p>
          <ul className="tam-points-list">
            <li>
              <strong>100% CBSE Aligned:</strong> Full line-by-line coverage of NCERT Class 7 &amp; 8 <em>Deepakam</em> and Class 9 <em>Sharada</em>.
            </li>
            <li>
              <strong>Pattern-Based Math:</strong> 16 Vedic Mathematics sutras taught as structured algebraic short-cuts rather than magic tricks.
            </li>
            <li>
              <strong>Trilingual Support:</strong> Every shloka and vocabulary term provides parallel English and Hindi meanings for effortless comprehension.
            </li>
          </ul>
        </div>

        {/* Column 4: Parent & School Safety Safeguards */}
        <div className="tam-card tam-card--safety">
          <div className="tam-card-top">
            <span className="tam-card-badge tam-badge--rose">Student Safety &amp; Trust</span>
            <span className="tam-card-icon" aria-hidden="true">🛡️</span>
          </div>
          <h3 className="tam-card-title">Parent &amp; School Safety Guarantees</h3>
          <p className="tam-card-lead">
            We hold student trust to the highest standard. Our platform is engineered from the ground up for safe, distraction-free study:
          </p>
          <div className="tam-safety-tags">
            <div className="tam-st-item">
              <span className="tst-icon">🚫</span>
              <div>
                <strong>Zero Advertisements</strong>
                <span>No banners, pop-ups, or commercial sponsorships inside learning zones.</span>
              </div>
            </div>
            <div className="tam-st-item">
              <span className="tst-icon">🔒</span>
              <div>
                <strong>Student Privacy Protected</strong>
                <span>COPPA/GDPR aligned. No selling of student data, phone numbers, or analytics.</span>
              </div>
            </div>
            <div className="tam-st-item">
              <span className="tst-icon">💳</span>
              <div>
                <strong>No Auto-Debit / Recurring Charges</strong>
                <span>14-day free access requires zero card details. Renewals are strictly one-time manual payments.</span>
              </div>
            </div>
            <div className="tam-st-item">
              <span className="tst-icon">💬</span>
              <div>
                <strong>Verified Support Contact</strong>
                <span>Dedicated Acharya desk — Contact: Message at <strong>+91 9000335468 (Only WhatsApp)</strong> or Email: <code>admin@ednetlearn.in</code> / <code>care@ednetlearn.in</code>.</span>
              </div>
            </div>
          </div>

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
