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
          Stay Motivated with Streaks, Badges &amp; Official Certification
        </h2>
        <p className="gam-subtitle">
          Sanskrit learning doesn&apos;t have to feel solitary or dry. Build a consistent daily habit, unlock 5 classical proficiency ranks, and earn certificates recognized by schools and scholars:
        </p>
      </div>

      <div className="gam-grid">
        {/* Card 1: Daily Streaks & Multipliers */}
        <div className="gam-card gam-card--streak">
          <div className="gam-card-header">
            <span className="gam-card-icon" aria-hidden="true">🔥</span>
            <div>
              <h3 className="gam-card-title">Daily Learning Streaks</h3>
              <span className="gam-card-sub">दिनचर्या-क्रमः · 15 Mins / Day</span>
            </div>
          </div>
          <p className="gam-card-desc">
            Consistency is the secret of language mastery. Practice any lesson, syllable audio, or puzzle for just 15 minutes each day to protect your streak flame.
          </p>
          <div className="gam-streak-meter">
            <div className="gam-sm-item active">
              <span className="gsm-flame">🔥</span>
              <span className="gsm-day">Day 1</span>
              <span className="gsm-bonus">Base</span>
            </div>
            <div className="gam-sm-arrow">➔</div>
            <div className="gam-sm-item active">
              <span className="gsm-flame">🔥</span>
              <span className="gsm-day">Day 3</span>
              <span className="gsm-bonus">1.5×</span>
            </div>
            <div className="gam-sm-arrow">➔</div>
            <div className="gam-sm-item active">
              <span className="gsm-flame">🔥</span>
              <span className="gsm-day">Day 5</span>
              <span className="gsm-bonus">2.0×</span>
            </div>
            <div className="gam-sm-arrow">➔</div>
            <div className="gam-sm-item active highlight">
              <span className="gsm-flame">⚡</span>
              <span className="gsm-day">Day 8+</span>
              <span className="gsm-bonus">3.0× Multiplier</span>
            </div>
          </div>
          <div className="gam-card-footer">
            <span className="gam-badge-pill">✓ Saved across all devices automatically</span>
          </div>
          {onOpenRegister && (
            <button
              type="button"
              className="gam-action-btn gam-btn--amber"
              onClick={onOpenRegister}
            >
              Start Streak with 14-Day Free Access ➔
            </button>
          )}
        </div>

        {/* Card 2: 5 Sanskrit Proficiency Levels */}
        <div className="gam-card gam-card--levels">
          <div className="gam-card-header">
            <span className="gam-card-icon" aria-hidden="true">🎖️</span>
            <div>
              <h3 className="gam-card-title">5 Classical Proficiency Levels</h3>
              <span className="gam-card-sub">पाण्डित्य-स्तराः · Clear Milestone Progression</span>
            </div>
          </div>
          <p className="gam-card-desc">
            Progress naturally from a curious beginner to a confident shastric scholar through clear, verifiable skill milestones:
          </p>
          <div className="gam-levels-list">
            <div className="gam-level-row">
              <span className="gl-badge gl-badge--1">Level 1</span>
              <div className="gl-info">
                <strong>शिष्यः (Śiṣya) · Beginner Novice</strong>
                <span>Recognizes 13 vowels, 33 consonants &amp; 5 mouth articulation points</span>
              </div>
            </div>
            <div className="gam-level-row">
              <span className="gl-badge gl-badge--2">Level 2</span>
              <div className="gl-info">
                <strong>विद्यार्थी (Vidyārthī) · Word Weaver</strong>
                <span>Forms words with 400+ matras &amp; solves 50+ Jodo tile puzzles</span>
              </div>
            </div>
            <div className="gam-level-row">
              <span className="gl-badge gl-badge--3">Level 3</span>
              <div className="gl-info">
                <strong>उपाध्यायः (Upādhyāya) · Text Reader</strong>
                <span>Reads NCERT chapters independently with line-by-line audio &amp; anvaya</span>
              </div>
            </div>
            <div className="gam-level-row">
              <span className="gl-badge gl-badge--4">Level 4</span>
              <div className="gl-info">
                <strong>पण्डितः (Paṇḍita) · Grammar Virtuoso</strong>
                <span>Masters all 7 Vibhaktis, Lakāra conjugations &amp; deconstructs verb roots</span>
              </div>
            </div>
            <div className="gam-level-row">
              <span className="gl-badge gl-badge--5">Level 5</span>
              <div className="gl-info">
                <strong>आचार्यः (Ācārya) · Shastric Polymath</strong>
                <span>Comprehends Pāṇinian logic, Vedic mathematics &amp; philosophical treatises</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Achievement Badges & Quizzes */}
        <div className="gam-card gam-card--badges">
          <div className="gam-card-header">
            <span className="gam-card-icon" aria-hidden="true">🏆</span>
            <div>
              <h3 className="gam-card-title">Collectible Achievement Badges</h3>
              <span className="gam-card-sub">सिद्धि-पदकानि · Earn as You Learn</span>
            </div>
          </div>
          <p className="gam-card-desc">
            Unlock collectible Gurukul crests as you master topics, complete chapters, and score high on CBSE worksheets:
          </p>
          <div className="gam-badges-tray">
            <div className="gam-badge-item" title="Akṣara Master: Completed full Varṇamālā phonetics">
              <span className="gbi-icon">🔤</span>
              <span className="gbi-title">Akṣara Master</span>
              <span className="gbi-sub">Alphabet</span>
            </div>
            <div className="gam-badge-item" title="Jodo Shata-Pada: Solved 100 word tile puzzles">
              <span className="gbi-icon">🧩</span>
              <span className="gbi-title">Word Builder</span>
              <span className="gbi-sub">100 Tiles</span>
            </div>
            <div className="gam-badge-item" title="Vibhakti Valiant: Scored 100% on 7 case endings">
              <span className="gbi-icon">🌿</span>
              <span className="gbi-title">Case Virtuoso</span>
              <span className="gbi-sub">7 Vibhaktis</span>
            </div>
            <div className="gam-badge-item" title="Deepakam Scholar: Completed Class 7 Reader">
              <span className="gbi-icon">📖</span>
              <span className="gbi-title">Text Scholar</span>
              <span className="gbi-sub">NCERT 6–8</span>
            </div>
            <div className="gam-badge-item" title="Vedic Ganita: Mastered 16 calculation sutras">
              <span className="gbi-icon">⚡</span>
              <span className="gbi-title">Vedic Sage</span>
              <span className="gbi-sub">16 Sutras</span>
            </div>
            <div className="gam-badge-item" title="Dhātupāṭha Seeker: Deconstructed 25 complex roots">
              <span className="gbi-icon">🔍</span>
              <span className="gbi-title">Root Alchemist</span>
              <span className="gbi-sub">25 Dhātus</span>
            </div>
          </div>
          {onOpenQuiz && (
            <button
              type="button"
              className="gam-action-btn gam-btn--emerald"
              onClick={onOpenQuiz}
            >
              Take Weekly Challenge Quiz ➔
            </button>
          )}
        </div>

        {/* Card 4: Official Certificate of Completion */}
        <div className="gam-card gam-card--certificate">
          <div className="gam-card-header">
            <span className="gam-card-icon" aria-hidden="true">📜</span>
            <div>
              <h3 className="gam-card-title">Verifiable Gurukul Certificate</h3>
              <span className="gam-card-sub">प्रमाणपत्रम् · Recognized for Portfolios &amp; School</span>
            </div>
          </div>
          <p className="gam-card-desc">
            Complete the 28-lesson Sanskrit Thinking course or the Swar Sanskrit Workbook series, pass the comprehensive certification assessment with 70%+, and generate your personalized, verifiable certificate of completion.
          </p>
          <div className="gam-cert-preview">
            <div className="gcp-frame">
              <span className="gcp-crest">🪷</span>
              <div className="gcp-title">Certificate of Sanskrit Completion</div>
              <div className="gcp-subtitle">EdNet Learn Gurukul · The Darśana Series</div>
              <div className="gcp-qr">✦ Verifiable Credential QR Code ✦</div>
            </div>
          </div>
          {onOpenCertificate && (
            <button
              type="button"
              className="gam-action-btn gam-btn--indigo"
              onClick={onOpenCertificate}
            >
              View Certificate Portal ➔
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default GamificationShowcase;
