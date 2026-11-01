import React from 'react';
import '../styles/gamification-showcase.css';

export interface GamificationShowcaseProps {
  onOpenQuiz?: () => void;
  onOpenCertificate?: () => void;
  onOpenRegister?: () => void;
}

export const GamificationShowcase: React.FC<GamificationShowcaseProps> = ({
  onOpenQuiz,
  onOpenCertificate,
  onOpenRegister,
}) => {
  const primary = onOpenRegister || onOpenQuiz;
  return (
    <section className="gam-band" id="gamification-system" aria-label="Daily practice and progress">
      <div className="gam-band-text">
        <h2 className="gam-band-title">प्रगतिः · Stay Motivated</h2>
        <p className="gam-band-sub">
          15 minutes a day builds a streak, unlocks ranks from शिष्यः to आचार्यः, and earns a verifiable certificate.
        </p>
      </div>
      <div className="gam-band-actions">
        {primary && (
          <button type="button" className="gam-band-btn" onClick={primary}>
            Start Your Streak
          </button>
        )}
        {onOpenCertificate && (
          <button type="button" className="gam-band-link" onClick={onOpenCertificate}>
            About the certificate →
          </button>
        )}
      </div>
    </section>
  );
};

export default GamificationShowcase;
