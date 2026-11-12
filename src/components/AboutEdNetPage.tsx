import React, { useState } from 'react';
import '../styles/about-ednet.css';

export interface AboutEdNetPageProps {
  onGoHome?: () => void;
  onOpenScienceLab?: (segment?: string) => void;
  onOpenIks?: () => void;
  onOpenVedicMaths?: () => void;
  onOpenGurukul?: () => void;
  onOpenPuzzles?: () => void;
  onOpenWorksheets?: () => void;
  onOpenQuiz?: () => void;
  onOpenResources?: () => void;
  onOpenCourse?: () => void;
}

export const AboutEdNetPage: React.FC<AboutEdNetPageProps> = ({
  onGoHome,
  onOpenScienceLab,
  onOpenIks,
  onOpenVedicMaths,
  onOpenGurukul,
  onOpenPuzzles,
  onOpenWorksheets,
  onOpenQuiz,
  onOpenResources,
  onOpenCourse,
}) => {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const contactEmail = 'contact@ednetlearn.in';

  const handleCopyEmail = () => {
    try {
      navigator.clipboard.writeText(contactEmail);
      setCopiedEmail(contactEmail);
      setTimeout(() => setCopiedEmail(null), 3000);
    } catch {
      window.location.href = `mailto:${contactEmail}`;
    }
  };

  return (
    <div className="about-pdf-page">
      <div className="about-pdf-container">

        {/* Topline Navigation */}
        <nav className="about-pdf-topbar" aria-label="About Page Top Navigation">
          <div className="about-pdf-topbar-left">
            {onGoHome && (
              <button type="button" className="about-topbar-link" onClick={onGoHome}>
                ← Home
              </button>
            )}
            {onOpenGurukul && (
              <button type="button" className="about-topbar-link" onClick={onOpenGurukul}>
                Gurukul
              </button>
            )}
            {onOpenScienceLab && (
              <button type="button" className="about-topbar-link" onClick={() => onOpenScienceLab?.()}>
                Vijñāna Lab
              </button>
            )}
            {onOpenIks && (
              <button type="button" className="about-topbar-link" onClick={onOpenIks}>
                IKS Think Labs
              </button>
            )}
            {onOpenVedicMaths && (
              <button type="button" className="about-topbar-link" onClick={onOpenVedicMaths}>
                Vedic Maths
              </button>
            )}
            {onOpenCourse && (
              <button type="button" className="about-topbar-link" onClick={onOpenCourse}>
                Thinking Course
              </button>
            )}
          </div>
          <div className="about-pdf-topbar-right">
            <span className="about-topbar-pill">About EdNet Learn</span>
          </div>
        </nav>

        {/* ============================================================ */}
        {/* PAGE 1: HERO HEADER WITH MANDALA & BOOK ARTWORK             */}
        {/* ============================================================ */}
        <header className="about-hero-banner" role="banner">
          <div className="about-hero-content">
            <div className="about-hero-kicker">EDNET LEARN | ABOUT US</div>
            <h1 className="about-hero-title">About EdNet<br />Learn.</h1>
            <p className="about-hero-tagline">Learn Through Play.</p>
            <p className="about-hero-sub">
              Discovering India’s knowledge traditions alongside modern science, creativity and technology.
            </p>
          </div>

          <div className="about-hero-graphic" aria-hidden="true">
            {/* Concentric rings & Golden Book radiating Surya / Sri Yantra Mandala */}
            <svg viewBox="0 0 320 320" className="about-mandala-svg">
              <defs>
                <radialGradient id="mandalaGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#f7f3ea" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Concentric decorative background circles */}
              <circle cx="210" cy="130" r="140" fill="none" stroke="#d5c8b5" strokeWidth="1.2" opacity="0.6" />
              <circle cx="210" cy="130" r="105" fill="none" stroke="#ccbc9e" strokeWidth="1.2" opacity="0.7" />
              <circle cx="210" cy="130" r="70" fill="none" stroke="#ba9e74" strokeWidth="1.5" opacity="0.8" />
              <circle cx="210" cy="130" r="60" fill="url(#mandalaGlow)" />

              {/* Ambient dots */}
              <circle cx="90" cy="60" r="3.5" fill="#d97706" opacity="0.7" />
              <circle cx="75" cy="205" r="3" fill="#d97706" opacity="0.6" />
              <circle cx="125" cy="265" r="2.5" fill="#d97706" opacity="0.5" />

              {/* Radiating 16-point Geometric Mandala Star */}
              <g transform="translate(210, 130)">
                {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((deg) => (
                  <path
                    key={deg}
                    d="M 0 -52 L 9 -34 L 0 -18 L -9 -34 Z"
                    fill="none"
                    stroke="#e58b37"
                    strokeWidth="1.2"
                    transform={`rotate(${deg})`}
                  />
                ))}
                {/* Secondary inner ring */}
                {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                  <circle
                    key={deg}
                    cx="0"
                    cy="-32"
                    r="2"
                    fill="#fbbf24"
                    transform={`rotate(${deg})`}
                  />
                ))}
                <circle cx="0" cy="0" r="22" fill="none" stroke="#f59e0b" strokeWidth="1.8" />
                <circle cx="0" cy="0" r="14" fill="#e58b37" opacity="0.3" stroke="#fbbf24" strokeWidth="1.5" />
                <circle cx="0" cy="0" r="6" fill="#fbbf24" />
              </g>

              {/* Open Golden Book Base */}
              <g transform="translate(160, 190)">
                {/* Left Page */}
                <path
                  d="M 12 18 C 28 8, 44 8, 49 14 L 49 68 C 44 62, 28 62, 12 72 Z"
                  fill="#fef3c7"
                  stroke="#e58b37"
                  strokeWidth="2"
                />
                <line x1="20" y1="26" x2="42" y2="22" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="20" y1="36" x2="42" y2="32" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="20" y1="46" x2="42" y2="42" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="20" y1="56" x2="42" y2="52" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" />

                {/* Right Page */}
                <path
                  d="M 51 14 C 56 8, 72 8, 88 18 L 88 72 C 72 62, 56 62, 51 68 Z"
                  fill="#fef3c7"
                  stroke="#e58b37"
                  strokeWidth="2"
                />
                <line x1="58" y1="22" x2="80" y2="26" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="58" y1="32" x2="80" y2="36" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="58" y1="42" x2="80" y2="46" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="58" y1="52" x2="80" y2="56" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" />

                {/* Spine */}
                <line x1="50" y1="12" x2="50" y2="69" stroke="#b45309" strokeWidth="2.5" />
              </g>
            </svg>
          </div>
        </header>

        {/* ============================================================ */}
        {/* PAGE 1: INTRO, MISSION, VISION & "CONVERSATION ACROSS TIME"  */}
        {/* ============================================================ */}
        <section className="about-section about-intro-section" aria-label="Mission and Vision">
          <p className="about-lead-p">
            EdNet Learn is a <strong>free, play-based learning platform</strong> that helps children and curious learners discover India’s knowledge traditions alongside modern science, creativity and technology.
          </p>
          <p className="about-secondary-p">
            We believe learning works best when it feels like exploring. Instead of asking children to memorise, we invite them to question, experiment, play and find connections for themselves.
          </p>

          <div className="about-mission-block">
            <h2 className="about-heading-underlined">Our Mission</h2>
            <p className="about-mission-text">
              To make India’s rich intellectual heritage, from Sanskrit and mathematics to astronomy, language and science, <strong>accessible, engaging and free</strong> for every learner.
            </p>
          </div>

          <div className="about-vision-block">
            <h2 className="about-heading-underlined">Our Vision</h2>
            <p className="about-vision-text">
              A generation of children who are curious about the world, confident in their roots and comfortable with modern ideas. We want them to see that ancient wisdom and modern science are not opposites, but conversations across time.
            </p>
          </div>

          {/* Infographic: "a conversation across time" */}
          <div className="about-conversation-card" aria-label="A Conversation Across Time Infographic">
            <div className="about-conversation-content">
              {/* Left: India's Knowledge Traditions (Palm leaf manuscript Pothi) */}
              <div className="about-tradition-node">
                <div className="about-tradition-icon-box" aria-hidden="true">
                  <svg viewBox="0 0 160 100" className="about-pothi-svg">
                    {/* Dark wooden binding plate base */}
                    <rect x="18" y="72" width="124" height="10" rx="3" fill="#3a2517" />
                    {/* Palm leaf leaves stacked */}
                    <rect x="24" y="60" width="112" height="11" rx="2" fill="#d9b47a" stroke="#a3763c" strokeWidth="1" />
                    <rect x="22" y="48" width="116" height="11" rx="2" fill="#e2c592" stroke="#a3763c" strokeWidth="1" />
                    <rect x="24" y="36" width="112" height="11" rx="2" fill="#ead3a7" stroke="#a3763c" strokeWidth="1" />
                    {/* Top wooden binding plate */}
                    <rect x="18" y="24" width="124" height="11" rx="3" fill="#e8c792" stroke="#a3763c" strokeWidth="1.2" />

                    {/* Sūtra cord binding holes & sacred red cords */}
                    <circle cx="48" cy="29" r="3.5" fill="#b91c1c" />
                    <line x1="48" y1="20" x2="48" y2="82" stroke="#b91c1c" strokeWidth="2.5" />
                    <circle cx="112" cy="29" r="3.5" fill="#b91c1c" />
                    <line x1="112" y1="20" x2="112" y2="82" stroke="#b91c1c" strokeWidth="2.5" />

                    {/* Script markings on cover */}
                    <line x1="58" y1="29" x2="78" y2="29" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
                    <line x1="84" y1="29" x2="102" y2="29" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="about-node-label">India’s knowledge traditions</div>
              </div>

              {/* Center: Golden dashed bridge "a conversation across time" */}
              <div className="about-bridge-node">
                <svg viewBox="0 0 240 60" className="about-bridge-svg" aria-hidden="true">
                  <path
                    d="M 15 50 Q 120 5, 225 50"
                    fill="none"
                    stroke="#e58b37"
                    strokeWidth="2.5"
                    strokeDasharray="5,6"
                  />
                  <circle cx="15" cy="50" r="4" fill="#e58b37" />
                  <circle cx="50" cy="30" r="3" fill="#e58b37" />
                  <circle cx="85" cy="18" r="3" fill="#e58b37" />
                  <circle cx="120" cy="14" r="4.5" fill="#f59e0b" />
                  <circle cx="155" cy="18" r="3" fill="#e58b37" />
                  <circle cx="190" cy="30" r="3" fill="#e58b37" />
                  <circle cx="225" cy="50" r="4" fill="#e58b37" />
                </svg>
                <div className="about-bridge-text">a conversation across time</div>
              </div>

              {/* Right: Modern Science (Atomic structure with orbital rings) */}
              <div className="about-science-node">
                <div className="about-science-icon-box" aria-hidden="true">
                  <svg viewBox="0 0 110 110" className="about-atom-svg">
                    {/* Orbital ellipses */}
                    <ellipse cx="55" cy="55" rx="42" ry="16" fill="none" stroke="#257868" strokeWidth="2.5" />
                    <ellipse cx="55" cy="55" rx="42" ry="16" fill="none" stroke="#257868" strokeWidth="2.5" transform="rotate(60 55 55)" />
                    <ellipse cx="55" cy="55" rx="42" ry="16" fill="none" stroke="#257868" strokeWidth="2.5" transform="rotate(120 55 55)" />

                    {/* Orbiting particles */}
                    <circle cx="97" cy="55" r="4" fill="#e58b37" />
                    <circle cx="34" cy="20" r="4" fill="#e58b37" />
                    <circle cx="34" cy="90" r="4" fill="#e58b37" />

                    {/* Nucleus cluster */}
                    <circle cx="55" cy="55" r="7" fill="#e58b37" />
                    <circle cx="51" cy="53" r="3.5" fill="#fbbf24" />
                  </svg>
                </div>
                <div className="about-node-label">Modern science</div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* PAGE 2: WHAT YOU'LL FIND HERE (6 DISCIPLINE ROWS)           */}
        {/* ============================================================ */}
        <section className="about-section" aria-label="What You'll Find Here">
          <h2 className="about-heading-underlined">What You’ll Find Here</h2>

          <div className="about-offerings-list">
            {/* 1. Sanskrit Learning (EdNet Gurukul) */}
            <article className="about-offering-row">
              <div className="about-icon-circle about-icon-circle--teal" aria-hidden="true">
                {/* Speech Bubble Icon */}
                <svg viewBox="0 0 24 24" className="about-row-svg">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" fill="white" />
                  <line x1="8" y1="10" x2="16" y2="10" stroke="#247869" strokeWidth="1.8" strokeLinecap="round" />
                  <line x1="8" y1="13.5" x2="14" y2="13.5" stroke="#247869" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>
              <div className="about-offering-text">
                <h3 className="about-offering-title">Sanskrit Learning (EdNet Gurukul)</h3>
                <p className="about-offering-body">
                  Start with the Varṇamālā alphabet and over 400 Barakhadi syllables with audio. Move on to word puzzles, Pāṇinian grammar, the Dhātupāṭha verb engine and the NCERT Deepakam reader.
                </p>
              </div>
              {onOpenGurukul && (
                <button type="button" className="about-jump-btn" onClick={onOpenGurukul} aria-label="Open Gurukul">
                  Explore Gurukul →
                </button>
              )}
            </article>

            {/* 2. Vedic Mathematics */}
            <article className="about-offering-row">
              <div className="about-icon-circle about-icon-circle--coral" aria-hidden="true">
                {/* + - × = Math Operators */}
                <svg viewBox="0 0 24 24" className="about-row-svg">
                  <line x1="4.5" y1="6.5" x2="10.5" y2="6.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <line x1="7.5" y1="3.5" x2="7.5" y2="9.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <line x1="14" y1="6.5" x2="19.5" y2="6.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <line x1="5.5" y1="14" x2="9.5" y2="18" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <line x1="9.5" y1="14" x2="5.5" y2="18" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <line x1="14" y1="14.5" x2="19.5" y2="14.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <line x1="14" y1="18" x2="19.5" y2="18" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div className="about-offering-text">
                <h3 className="about-offering-title">Vedic Mathematics</h3>
                <p className="about-offering-body">
                  Explore the 16 sutras, mental maths shortcuts, digital-root checks and Śulba geometry, and build real number sense along the way.
                </p>
              </div>
              {onOpenVedicMaths && (
                <button type="button" className="about-jump-btn" onClick={onOpenVedicMaths} aria-label="Open Vedic Mathematics">
                  Open Maths →
                </button>
              )}
            </article>

            {/* 3. Science and Discovery */}
            <article className="about-offering-row">
              <div className="about-icon-circle about-icon-circle--blue" aria-hidden="true">
                {/* Sine / Vibration Harmonic Wave */}
                <svg viewBox="0 0 24 24" className="about-row-svg">
                  <path d="M 2 12 Q 6 3, 9 12 T 16 12 T 22 12" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
                </svg>
              </div>
              <div className="about-offering-text">
                <h3 className="about-offering-title">Science and Discovery</h3>
                <p className="about-offering-body">
                  Hands-on simulations on sound and vibration, atoms, geometry and astronomy, where concepts are tested rather than just read.
                </p>
              </div>
              {onOpenScienceLab && (
                <button type="button" className="about-jump-btn" onClick={() => onOpenScienceLab?.()} aria-label="Open Vijñāna Lab">
                  Launch Lab →
                </button>
              )}
            </article>

            {/* 4. Indian Knowledge Systems */}
            <article className="about-offering-row">
              <div className="about-icon-circle about-icon-circle--amber" aria-hidden="true">
                {/* 12-Ray Radiant Surya Sun */}
                <svg viewBox="0 0 24 24" className="about-row-svg">
                  <circle cx="12" cy="12" r="4.2" fill="white" />
                  {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                    <line
                      key={deg}
                      x1="12"
                      y1="4.5"
                      x2="12"
                      y2="2"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      transform={`rotate(${deg} 12 12)`}
                    />
                  ))}
                </svg>
              </div>
              <div className="about-offering-text">
                <h3 className="about-offering-title">Indian Knowledge Systems</h3>
                <p className="about-offering-body">
                  Mathematics, astronomy, language, philosophy, Ayurveda and architecture, presented as ideas to explore and test, not just history to recall.
                </p>
              </div>
              {onOpenIks && (
                <button type="button" className="about-jump-btn" onClick={onOpenIks} aria-label="Open IKS Think Labs">
                  Explore IKS →
                </button>
              )}
            </article>

            {/* 5. Games, Stories and Activities */}
            <article className="about-offering-row">
              <div className="about-icon-circle about-icon-circle--purple" aria-hidden="true">
                {/* Gaming Die / Activity Pips */}
                <svg viewBox="0 0 24 24" className="about-row-svg">
                  <rect x="4" y="4" width="16" height="16" rx="3.5" fill="none" stroke="white" strokeWidth="2" />
                  <circle cx="8" cy="8" r="1.4" fill="white" />
                  <circle cx="16" cy="8" r="1.4" fill="white" />
                  <circle cx="12" cy="12" r="1.4" fill="white" />
                  <circle cx="8" cy="16" r="1.4" fill="white" />
                  <circle cx="16" cy="16" r="1.4" fill="white" />
                </svg>
              </div>
              <div className="about-offering-text">
                <h3 className="about-offering-title">Games, Stories and Activities</h3>
                <p className="about-offering-body">
                  More than 6,000 word puzzles, riddles, preschool games and stories that make practice feel like play.
                </p>
              </div>
              {onOpenPuzzles && (
                <button type="button" className="about-jump-btn" onClick={onOpenPuzzles} aria-label="Open Puzzles">
                  Play Puzzles →
                </button>
              )}
            </article>

            {/* 6. Worksheets, Quizzes and Resources */}
            <article className="about-offering-row">
              <div className="about-icon-circle about-icon-circle--forest" aria-hidden="true">
                {/* Document / Worksheet Checklist */}
                <svg viewBox="0 0 24 24" className="about-row-svg">
                  <path d="M6 3h8l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" fill="white" />
                  <polyline points="14 3 14 8 19 8" fill="none" stroke="#24453b" strokeWidth="1.6" />
                  <line x1="8" y1="12" x2="16" y2="12" stroke="#24453b" strokeWidth="1.8" strokeLinecap="round" />
                  <line x1="8" y1="15.5" x2="16" y2="15.5" stroke="#24453b" strokeWidth="1.8" strokeLinecap="round" />
                  <line x1="8" y1="19" x2="13" y2="19" stroke="#24453b" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>
              <div className="about-offering-text">
                <h3 className="about-offering-title">Worksheets, Quizzes and Resources</h3>
                <p className="about-offering-body">
                  Interactive worksheets, 39+ quiz sets, question banks and a CBSE Sanskrit guide for students, parents and teachers.
                </p>
              </div>
              <div className="about-jump-btn-group">
                {onOpenWorksheets && (
                  <button type="button" className="about-jump-btn" onClick={onOpenWorksheets} aria-label="Open Worksheets">
                    Worksheets →
                  </button>
                )}
                {onOpenQuiz && (
                  <button type="button" className="about-jump-btn" onClick={onOpenQuiz} aria-label="Open Quizzes">
                    Quizzes →
                  </button>
                )}
                {onOpenResources && (
                  <button type="button" className="about-jump-btn" onClick={onOpenResources} aria-label="Open Free Resources">
                    Resources →
                  </button>
                )}
              </div>
            </article>
          </div>
        </section>

        {/* ============================================================ */}
        {/* PAGE 2: OUR APPROACH (4 NUMBERED PILLARS)                    */}
        {/* ============================================================ */}
        <section className="about-section" aria-label="Our Approach">
          <h2 className="about-heading-underlined">Our Approach</h2>

          <div className="about-pillars-grid">
            {/* Pillar 1 */}
            <div className="about-pillar-card">
              <div className="about-pillar-badge about-pillar-badge--teal">1</div>
              <h3 className="about-pillar-name">Play first</h3>
              <p className="about-pillar-desc">
                Games, puzzles and simulations come before rote learning.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="about-pillar-card">
              <div className="about-pillar-badge about-pillar-badge--coral">2</div>
              <h3 className="about-pillar-name">Curiosity over memorisation</h3>
              <p className="about-pillar-desc">
                We encourage “why?” and “what if?” at every step.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="about-pillar-card">
              <div className="about-pillar-badge about-pillar-badge--blue">3</div>
              <h3 className="about-pillar-name">Tradition meets science</h3>
              <p className="about-pillar-desc">
                Classical knowledge and modern concepts deepen each other.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="about-pillar-card">
              <div className="about-pillar-badge about-pillar-badge--amber">4</div>
              <h3 className="about-pillar-name">Free and open</h3>
              <p className="about-pillar-desc">
                Quality learning should not sit behind a paywall.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* PAGE 3: WHO IT'S FOR (4 AUDIENCES)                          */}
        {/* ============================================================ */}
        <section className="about-section" aria-label="Who It's For">
          <h2 className="about-heading-underlined">Who It’s For</h2>

          <div className="about-audience-grid">
            {/* Audience 1: Children */}
            <div className="about-audience-card">
              <div className="about-audience-circle about-audience-circle--teal" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="about-audience-svg">
                  <circle cx="12" cy="7" r="4" fill="white" />
                  <path d="M4 21v-2a6 6 0 0 1 12 0v2" fill="white" />
                </svg>
              </div>
              <h3 className="about-audience-title">Children</h3>
              <p className="about-audience-desc">
                who learn best by doing, exploring and playing.
              </p>
            </div>

            {/* Audience 2: Parents */}
            <div className="about-audience-card">
              <div className="about-audience-circle about-audience-circle--coral" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="about-audience-svg">
                  {/* Parent & Child */}
                  <circle cx="8" cy="7" r="3.2" fill="white" />
                  <path d="M2 20v-1.5a4.5 4.5 0 0 1 9 0V20" fill="white" />
                  <circle cx="16" cy="10" r="2.8" fill="white" />
                  <path d="M12.5 20v-1a3.5 3.5 0 0 1 7 0V20" fill="white" />
                </svg>
              </div>
              <h3 className="about-audience-title">Parents</h3>
              <p className="about-audience-desc">
                looking for meaningful, screen-time-worthy learning at home.
              </p>
            </div>

            {/* Audience 3: Teachers and schools */}
            <div className="about-audience-card">
              <div className="about-audience-circle about-audience-circle--blue" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="about-audience-svg">
                  {/* Chalkboard / Easel */}
                  <rect x="4" y="4" width="16" height="11" rx="1.5" fill="none" stroke="white" strokeWidth="2" />
                  <line x1="7" y1="8" x2="13" y2="8" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                  <line x1="7" y1="11" x2="17" y2="11" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                  <line x1="6" y1="15" x2="4" y2="21" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <line x1="18" y1="15" x2="20" y2="21" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="about-audience-title">Teachers and schools</h3>
              <p className="about-audience-desc">
                who want ready-to-use activities, worksheets and quizzes.
              </p>
            </div>

            {/* Audience 4: Lifelong learners */}
            <div className="about-audience-card">
              <div className="about-audience-circle about-audience-circle--purple" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="about-audience-svg">
                  {/* Graduation Cap / Open Book */}
                  <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" fill="white" />
                  <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" fill="white" />
                </svg>
              </div>
              <h3 className="about-audience-title">Lifelong learners</h3>
              <p className="about-audience-desc">
                curious about Sanskrit and India’s scientific heritage.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* PAGE 3: OUR STORY + INTERSPERSED TEAM STUDIO PHOTOGRAPH     */}
        {/* ============================================================ */}
        <section className="about-section about-story-section" aria-label="Our Story">
          <h2 className="about-heading-underlined">Our Story</h2>

          <div className="about-story-editorial">
            {/* Real Studio Photo */}
            <div className="about-story-photo-box">
              <img
                src="/images/ednet-learn-team-studio.webp"
                alt="EdNet Learn studio workspace: researchers, educators and developers collaborating over Sanskrit and STEM games"
                className="about-story-photo"
                loading="lazy"
              />
              <figcaption className="about-story-photo-caption">
                The EdNet Learn collaborative research studio in Bengaluru · bringing Sanskrit, Vedic mathematics, and interactive science simulations to life.
              </figcaption>
            </div>

            {/* Story Callout Card with Orange Accent Border */}
            <div className="about-story-callout">
              <p className="about-story-italic">
                “EdNet Learn began with a simple question: what if children could learn Sanskrit and science the way they learn their favourite game?”
              </p>
              <p className="about-story-body">
                Founded by educator and researcher Sesha K Penumallu (author of <em>Swar · स्वर</em> and <em>The Darśana Series</em>), EdNet Learn was conceived to dismantle rote memorisation and bridge timeless civilizational knowledge with contemporary cognitive science. By treating Sanskrit grammar as a computational engine, Vedic mathematics as visual patterns, and ancient metallurgy and astronomy as hands-on inquiry labs, the platform turns timeless wisdom into an open playground for all minds.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* PAGE 3: EXPLORE, PLAY AND DISCOVER (BOTTOM CTA BANNER)       */}
        {/* ============================================================ */}
        <section className="about-cta-banner" aria-label="Explore, play and discover">
          <div className="about-cta-text-side">
            <h2 className="about-cta-heading">Explore, play and discover.</h2>
            <p className="about-cta-sub">
              At your own pace, on your own curiosity. Visit <strong>ednetlearn.in</strong>
            </p>
            <div className="about-cta-contact-row">
              <span className="about-cta-contact-label">Feedback, ideas or resources to share?</span>
              <button
                type="button"
                className="about-cta-contact-btn"
                onClick={handleCopyEmail}
                title="Copy contact email"
              >
                Contact: {contactEmail}
              </button>
              {copiedEmail && (
                <span className="about-cta-copied-pill" role="status">
                  ✓ Copied
                </span>
              )}
            </div>
          </div>

          <div className="about-cta-graphic-side">
            {/* Golden concentric rings with Play Icon Button */}
            <button
              type="button"
              className="about-cta-play-btn"
              onClick={onGoHome}
              title="Start exploring EdNet Learn"
              aria-label="Start exploring EdNet Learn"
            >
              <svg viewBox="0 0 140 140" className="about-cta-play-svg">
                {/* Concentric rings */}
                <circle cx="70" cy="70" r="64" fill="none" stroke="#255547" strokeWidth="1.5" opacity="0.6" />
                <circle cx="70" cy="70" r="50" fill="none" stroke="#2f6655" strokeWidth="1.5" opacity="0.7" />
                {/* Golden Play Disc */}
                <circle cx="70" cy="70" r="36" fill="#e58b37" />
                {/* Play Triangle */}
                <polygon points="64,55 84,70 64,85" fill="#18342c" />
              </svg>
            </button>
          </div>
        </section>

        {/* Publication footer tag */}
        <footer className="about-pdf-footer">
          <span>EdNet Learn | ednetlearn.in</span>
          {onGoHome && (
            <button type="button" className="about-footer-back-link" onClick={onGoHome}>
              Back to Home ↑
            </button>
          )}
        </footer>

      </div>
    </div>
  );
};

export default AboutEdNetPage;
