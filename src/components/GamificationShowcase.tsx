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
  return (
    <section className="gam-section" id="gamification-system" aria-label="Learning Streaks, Badges, and Sanskrit Proficiency Levels">
      <div className="gam-header">
        <div className="gam-eyebrow">
          <span>🏆</span>
          <span>प्रगति-सोपानम् · MOTIVATION &amp; RETENTION</span>
        </div>
        <h2 className="gam-title">
          Stay Motivated: Streaks, Badges &amp; Certification
        </h2>
        <p className="gam-subtitle">
          Build a 15-minute daily habit, unlock 5 classical ranks, and earn verified school credentials.
        </p>
      </div>

      <div className="gam-grid">
        {/* Card 1: Daily Streaks & Multipliers */}
        <div className="gam-card gam-card--streak">
          <div className="gam-card-header">
            <span className="gam-card-icon" aria-hidden="true">🔥</span>
            <div>
              <h3 className="gam-card-title">Daily Streaks</h3>
              <span className="gam-card-sub">दिनचर्या · 15 Mins / Day</span>
            </div>
          </div>
          <div className="gam-streak-meter">
            <div className="gam-sm-item active">
              <span className="gsm-flame">🔥</span>
              <span className="gsm-day">Day 1</span>
              <span className="gsm-bonus">Base</span>
            </div>
            <div className="gam-sm-item active">
              <span className="gsm-flame">🔥</span>
              <span className="gsm-day">Day 3</span>
              <span className="gsm-bonus">1.5×</span>
            </div>
            <div className="gam-sm-item active">
              <span className="gsm-flame">🔥</span>
              <span className="gsm-day">Day 5</span>
              <span className="gsm-bonus">2.0×</span>
            </div>
            <div className="gam-sm-item active highlight">
              <span className="gsm-flame">⚡</span>
              <span className="gsm-day">Day 8+</span>
              <span className="gsm-bonus">3.0×</span>
            </div>
          </div>
          <div className="gam-card-meta">
            <span>✓ Auto-saved across devices</span>
          </div>
          {onOpenRegister && (
            <button
              type="button"
              className="gam-action-btn gam-btn--amber"
              onClick={onOpenRegister}
            >
              Start 14-Day Streak ➔
            </button>
          )}
        </div>

        {/* Card 2: 5 Sanskrit Proficiency Levels */}
        <div className="gam-card gam-card--levels">
          <div className="gam-card-header">
            <span className="gam-card-icon" aria-hidden="true">🎖️</span>
            <div>
              <h3 className="gam-card-title">5 Classical Ranks</h3>
              <span className="gam-card-sub">पाण्डित्य-स्तराः · Milestones</span>
            </div>
          </div>
          <div className="gam-levels-list">
            <div className="gam-level-row">
              <span className="gl-badge gl-badge--1">L1</span>
              <div className="gl-info">
                <strong>शिष्यः (Śiṣya)</strong>
                <span>Alphabet &amp; Phonetics</span>
              </div>
            </div>
            <div className="gam-level-row">
              <span className="gl-badge gl-badge--2">L2</span>
              <div className="gl-info">
                <strong>विद्यार्थी (Vidyārthī)</strong>
                <span>400+ Matras &amp; Words</span>
              </div>
            </div>
            <div className="gam-level-row">
              <span className="gl-badge gl-badge--3">L3</span>
              <div className="gl-info">
                <strong>उपाध्यायः (Upādhyāya)</strong>
                <span>NCERT Reader &amp; Audio</span>
              </div>
            </div>
            <div className="gam-level-row">
              <span className="gl-badge gl-badge--4">L4</span>
              <div className="gl-info">
                <strong>पण्डितः (Paṇḍita)</strong>
                <span>7 Vibhaktis &amp; Verbs</span>
              </div>
            </div>
            <div className="gam-level-row">
              <span className="gl-badge gl-badge--5">L5</span>
              <div className="gl-info">
                <strong>आचार्यः (Ācārya)</strong>
                <span>Pāṇinian &amp; Vedics</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Achievement Badges & Quizzes */}
        <div className="gam-card gam-card--badges">
          <div className="gam-card-header">
            <span className="gam-card-icon" aria-hidden="true">🏆</span>
            <div>
              <h3 className="gam-card-title">Milestone Badges</h3>
              <span className="gam-card-sub">सिद्धि-पदकानि · Earn as You Learn</span>
            </div>
          </div>
          <div className="gam-badges-tray">
            <div className="gam-badge-item" title="Akṣara Master: Completed full Varṇamālā phonetics">
              <span className="gbi-icon">🔤</span>
              <span className="gbi-title">Akṣara</span>
              <span className="gbi-sub">Alphabet</span>
            </div>
            <div className="gam-badge-item" title="Jodo Shata-Pada: Solved 100 word tile puzzles">
              <span className="gbi-icon">🧩</span>
              <span className="gbi-title">Jodo</span>
              <span className="gbi-sub">100 Tiles</span>
            </div>
            <div className="gam-badge-item" title="Vibhakti Valiant: Scored 100% on 7 case endings">
              <span className="gbi-icon">🌿</span>
              <span className="gbi-title">Vibhakti</span>
              <span className="gbi-sub">7 Cases</span>
            </div>
            <div className="gam-badge-item" title="Deepakam Scholar: Completed Class 7 Reader">
              <span className="gbi-icon">📖</span>
              <span className="gbi-title">Reader</span>
              <span className="gbi-sub">NCERT 6–8</span>
            </div>
            <div className="gam-badge-item" title="Vedic Ganita: Mastered 16 calculation sutras">
              <span className="gbi-icon">⚡</span>
              <span className="gbi-title">Sage</span>
              <span className="gbi-sub">16 Sūtras</span>
            </div>
            <div className="gam-badge-item" title="Dhātupāṭha Seeker: Deconstructed 25 complex roots">
              <span className="gbi-icon">🔍</span>
              <span className="gbi-title">Dhātu</span>
              <span className="gbi-sub">25 Roots</span>
            </div>
          </div>
          {onOpenQuiz && (
            <button
              type="button"
              className="gam-action-btn gam-btn--emerald"
              onClick={onOpenQuiz}
            >
              Weekly Challenge ➔
            </button>
          )}
        </div>

        {/* Card 4: Official Certificate of Completion */}
        <div className="gam-card gam-card--certificate">
          <div className="gam-card-header">
            <span className="gam-card-icon" aria-hidden="true">📜</span>
            <div>
              <h3 className="gam-card-title">Verifiable Certificate</h3>
              <span className="gam-card-sub">प्रमाणपत्रम् · School &amp; Portfolio</span>
            </div>
          </div>
          <div className="gam-cert-preview">
            <div className="gcp-frame">
              <span className="gcp-crest">🪷</span>
              <div className="gcp-title">Certificate of Sanskrit Completion</div>
              <div className="gcp-subtitle">EdNet Learn Gurukul · Darśana Series</div>
              <div className="gcp-qr">✦ Verifiable QR Credential (70%+ Score) ✦</div>
            </div>
          </div>
          {onOpenCertificate && (
            <button
              type="button"
              className="gam-action-btn gam-btn--indigo"
              onClick={onOpenCertificate}
            >
              Certificate Portal ➔
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default GamificationShowcase;
