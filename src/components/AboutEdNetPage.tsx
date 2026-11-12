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
    <div className="about-page">
      <div className="about-container">
        {/* Topline Navigation */}
        <nav className="about-topbar" aria-label="About Page Top Navigation">
          <div className="about-topbar-left">
            {onGoHome && (
              <button type="button" className="about-nav-btn" onClick={onGoHome}>
                ← Home
              </button>
            )}
            {onOpenGurukul && (
              <button type="button" className="about-nav-btn" onClick={onOpenGurukul}>
                Gurukul
              </button>
            )}
            {onOpenScienceLab && (
              <button type="button" className="about-nav-btn" onClick={() => onOpenScienceLab?.()}>
                Vijñāna Lab
              </button>
            )}
            {onOpenIks && (
              <button type="button" className="about-nav-btn" onClick={onOpenIks}>
                IKS Think Labs
              </button>
            )}
            {onOpenCourse && (
              <button type="button" className="about-nav-btn" onClick={onOpenCourse}>
                Thinking Course
              </button>
            )}
          </div>
          <div className="about-topbar-right">
            <span className="about-nav-btn about-nav-btn--primary" style={{ cursor: 'default' }}>
              About EdNet Learn
            </span>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="about-hero">
          <span className="about-hero-kicker">
            About EdNet Learn · भारतीय ज्ञान परंपरा व आधुनिक विज्ञानम्
          </span>
          <h1 className="about-hero-title">Learn Through Play</h1>
          <p className="about-hero-subtitle">
            Exploring Indian Knowledge Systems, Creativity and Modern Science
          </p>
          <p className="about-hero-lead">
            EdNet Learn is a free, play-based learning platform that helps children and curious learners discover India’s knowledge traditions alongside modern science, creativity and technology.
          </p>
          <p className="about-hero-secondary">
            We believe learning works best when it feels like exploring. So instead of asking children to memorise, we invite them to question, experiment, play and find connections for themselves.
          </p>
        </header>

        {/* Mission & Vision Section */}
        <section className="about-mission-grid" aria-label="Mission and Vision">
          <div className="about-card">
            <span className="about-card-badge about-card-badge--mission">
              Foundation
            </span>
            <h2 className="about-card-title">Our Mission</h2>
            <p className="about-card-body">
              To make India’s rich intellectual heritage, from Sanskrit and mathematics to astronomy, language and science, accessible, engaging and free for every learner.
            </p>
          </div>

          <div className="about-card">
            <span className="about-card-badge about-card-badge--vision">
              Future
            </span>
            <h2 className="about-card-title">Our Vision</h2>
            <p className="about-card-body">
              A generation of children who are curious about the world, confident in their roots and comfortable with modern ideas. We want them to see that ancient wisdom and modern science are not opposites, but conversations across time.
            </p>
          </div>
        </section>

        {/* What You'll Find Here Section */}
        <section aria-label="What You Will Find Here">
          <div className="about-section-header">
            <span className="about-section-kicker">Core Learning Offerings</span>
            <h2 className="about-section-title">What You’ll Find Here</h2>
            <p className="about-section-sub">
              Six interactive learning disciplines where empirical inquiry, playful practice, and classical concepts converge.
            </p>
          </div>

          <div className="about-offerings-grid">
            {/* Sanskrit Learning */}
            <div className="about-offering-card">
              <div className="about-offering-top">
                <span className="about-offering-tag">Language &amp; Linguistics</span>
                <h3 className="about-offering-title">Sanskrit Learning (EdNet Gurukul)</h3>
                <p className="about-offering-desc">
                  Start with the Varṇamālā alphabet and over 400 Barakhadi syllables with audio. Move on to word puzzles, Pāṇinian grammar, the Dhātupāṭha verb engine and the NCERT Deepakam reader.
                </p>
              </div>
              {onOpenGurukul && (
                <button type="button" className="about-offering-btn" onClick={onOpenGurukul}>
                  Explore Gurukul →
                </button>
              )}
            </div>

            {/* Vedic Mathematics */}
            <div className="about-offering-card">
              <div className="about-offering-top">
                <span className="about-offering-tag">Mental Math &amp; Geometry</span>
                <h3 className="about-offering-title">Vedic Mathematics</h3>
                <p className="about-offering-desc">
                  Explore the 16 sutras, mental maths shortcuts, digital-root checks and Śulba geometry, and build real number sense along the way.
                </p>
              </div>
              {onOpenVedicMaths && (
                <button type="button" className="about-offering-btn" onClick={onOpenVedicMaths}>
                  Explore Vedic Maths →
                </button>
              )}
            </div>

            {/* Science & Discovery */}
            <div className="about-offering-card">
              <div className="about-offering-top">
                <span className="about-offering-tag">STEM Simulators</span>
                <h3 className="about-offering-title">Science and Discovery</h3>
                <p className="about-offering-desc">
                  Hands-on simulations on sound and vibration, atoms, geometry and astronomy, where concepts are tested rather than just read.
                </p>
              </div>
              {onOpenScienceLab && (
                <button type="button" className="about-offering-btn" onClick={() => onOpenScienceLab?.()}>
                  Explore Science Lab →
                </button>
              )}
            </div>

            {/* Indian Knowledge Systems */}
            <div className="about-offering-card">
              <div className="about-offering-top">
                <span className="about-offering-tag">Experiential Think Labs</span>
                <h3 className="about-offering-title">Indian Knowledge Systems (IKS)</h3>
                <p className="about-offering-desc">
                  Mathematics, astronomy, language, philosophy, Ayurveda and architecture, presented as ideas to explore and test, not just history to recall.
                </p>
              </div>
              {onOpenIks && (
                <button type="button" className="about-offering-btn" onClick={onOpenIks}>
                  Explore IKS Labs →
                </button>
              )}
            </div>

            {/* Games, Stories and Activities */}
            <div className="about-offering-card">
              <div className="about-offering-top">
                <span className="about-offering-tag">Interactive Play</span>
                <h3 className="about-offering-title">Games, Stories and Activities</h3>
                <p className="about-offering-desc">
                  More than 6,000 word puzzles, riddles, preschool games and stories that make practice feel like play.
                </p>
              </div>
              {onOpenPuzzles && (
                <button type="button" className="about-offering-btn" onClick={onOpenPuzzles}>
                  Explore Puzzles &amp; Games →
                </button>
              )}
            </div>

            {/* Worksheets, Quizzes and Resources */}
            <div className="about-offering-card">
              <div className="about-offering-top">
                <span className="about-offering-tag">Assessments &amp; Blueprint</span>
                <h3 className="about-offering-title">Worksheets, Quizzes &amp; Resources</h3>
                <p className="about-offering-desc">
                  Interactive worksheets, 39+ quiz sets, question banks and a CBSE Sanskrit guide for students, parents and teachers.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                {onOpenWorksheets && (
                  <button type="button" className="about-offering-btn" onClick={onOpenWorksheets}>
                    Worksheets →
                  </button>
                )}
                {onOpenQuiz && (
                  <button type="button" className="about-offering-btn" onClick={onOpenQuiz}>
                    Quizzes →
                  </button>
                )}
                {onOpenResources && (
                  <button type="button" className="about-offering-btn" onClick={onOpenResources}>
                    Study Vault →
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Our Approach Section */}
        <section aria-label="Our Pedagogical Approach">
          <div className="about-section-header">
            <span className="about-section-kicker">Pedagogy &amp; Philosophy</span>
            <h2 className="about-section-title">Our Approach</h2>
            <p className="about-section-sub">
              Learning grounded in play, driven by curiosity, and free from paywalls.
            </p>
          </div>

          <div className="about-pillars-grid">
            <div className="about-pillar-card">
              <div className="about-pillar-num">1</div>
              <h3 className="about-pillar-title">Play first</h3>
              <p className="about-pillar-desc">
                Games, puzzles and simulations come before rote learning. Children grasp principles faster when they interact directly.
              </p>
            </div>

            <div className="about-pillar-card">
              <div className="about-pillar-num">2</div>
              <h3 className="about-pillar-title">Curiosity over memorisation</h3>
              <p className="about-pillar-desc">
                We encourage &ldquo;why?&rdquo; and &ldquo;what if?&rdquo; at every step, cultivating critical thinking and independent reasoning.
              </p>
            </div>

            <div className="about-pillar-card">
              <div className="about-pillar-num">3</div>
              <h3 className="about-pillar-title">Tradition meets science</h3>
              <p className="about-pillar-desc">
                We connect classical knowledge with modern concepts so each deepens the other, highlighting continuous civilizational innovations.
              </p>
            </div>

            <div className="about-pillar-card">
              <div className="about-pillar-num">4</div>
              <h3 className="about-pillar-title">Free and open</h3>
              <p className="about-pillar-desc">
                Quality learning shouldn’t sit behind a paywall. Accessible tools empower every child, teacher, and family unconditionally.
              </p>
            </div>
          </div>
        </section>

        {/* Who It's For Section */}
        <section aria-label="Who EdNet Learn is For">
          <div className="about-section-header">
            <span className="about-section-kicker">Learner Communities</span>
            <h2 className="about-section-title">Who It’s For</h2>
            <p className="about-section-sub">
              Designed for diverse learning styles, home environments, and classrooms.
            </p>
          </div>

          <div className="about-audience-grid">
            <div className="about-audience-card">
              <h3 className="about-audience-title">Children</h3>
              <p className="about-audience-desc">
                Who learn best by doing, exploring, testing hypotheses, and playing with intuitive feedback.
              </p>
            </div>

            <div className="about-audience-card">
              <h3 className="about-audience-title">Parents</h3>
              <p className="about-audience-desc">
                Looking for meaningful, screen-time-worthy learning at home that connects modern STEM with rich cultural roots.
              </p>
            </div>

            <div className="about-audience-card">
              <h3 className="about-audience-title">Teachers &amp; Schools</h3>
              <p className="about-audience-desc">
                Who want ready-to-use activities, worksheets, CBSE exam blueprints, and curriculum-aligned quizzes.
              </p>
            </div>

            <div className="about-audience-card">
              <h3 className="about-audience-title">Lifelong Learners</h3>
              <p className="about-audience-desc">
                Curious about Sanskrit linguistics, Vedic computational methods, and India’s 5,000-year scientific legacy.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="about-story-card" aria-label="Our Story">
          <span className="about-story-kicker">Origin &amp; Inspiration</span>
          <h2 className="about-story-title">Our Story</h2>
          <p className="about-story-p">
            EdNet Learn began with a simple question: what if children could explore Sanskrit, Vedic mathematics, and ancient Indian sciences with the same curiosity, delight, and agency as their favourite games?
          </p>
          <p className="about-story-p">
            Founded by educator and researcher Sesha K Penumallu (author of <em>Swar · स्वर</em> and <em>The Darśana Series</em>), EdNet Learn was conceived to dismantle rote memorisation and bridge timeless civilizational knowledge with contemporary cognitive science. By treating Sanskrit grammar as a computational engine, Vedic mathematics as visual patterns, and ancient metallurgy and astronomy as hands-on inquiry labs, the platform turns timeless wisdom into an open playground for all minds.
          </p>
        </section>

        {/* Join Us (CTA) */}
        <section className="about-cta-card" aria-label="Join Us Call to Action">
          <h2 className="about-cta-title">Join Us</h2>
          <p className="about-cta-desc">
            Explore, play and discover at your own pace. Have feedback, ideas or resources to share? We’d love to hear from you.
          </p>

          <div className="about-cta-actions">
            {onGoHome && (
              <button type="button" className="about-cta-btn" onClick={onGoHome}>
                Start Exploring
              </button>
            )}
            <button
              type="button"
              className="about-cta-btn about-cta-btn--secondary"
              onClick={handleCopyEmail}
              title={`Copy email address: ${contactEmail}`}
            >
              Contact Us: {contactEmail}
            </button>
          </div>

          {copiedEmail && (
            <div className="about-copied-toast" role="status">
              ✓ Email address copied to clipboard: {contactEmail}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AboutEdNetPage;
