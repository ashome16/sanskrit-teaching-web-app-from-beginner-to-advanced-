import React, { useState } from 'react';
import { playPronunciation, stopPronunciation } from '../utils/pronunciation';
import { soundEffects } from '../utils/soundEffects';
import '../styles/student-staircase-blackboard.css';

interface StudentStaircaseBlackboardProps {
  onOpenVarnamala: () => void;
  onOpenReader: (lessonId?: string) => void;
  onOpenGrammar: () => void;
  onOpenCbseGuide?: () => void;
  onOpenQuiz?: () => void;
  onOpenBodhi?: () => void;
}

export const StudentStaircaseBlackboard: React.FC<StudentStaircaseBlackboardProps> = ({
  onOpenVarnamala,
  onOpenReader,
  onOpenGrammar,
  onOpenCbseGuide,
  onOpenQuiz,
  onOpenBodhi,
}) => {
  const [isGreetingSpeaking, setIsGreetingSpeaking] = useState(false);
  const [activeHoverStep, setActiveHoverStep] = useState<number | null>(null);

  const handleNamasteGreeting = () => {
    stopPronunciation();
    soundEffects.playStrokeChime();
    setIsGreetingSpeaking(true);
    playPronunciation('हरिः ॐ! नमो नमः। स्वागतम्। Climb each step with reverence. The blackboard of wisdom awaits.');
    setTimeout(() => {
      setIsGreetingSpeaking(false);
    }, 5500);
  };

  const LEARNING_LINKS = [
    {
      id: 'varnamala',
      stepNum: '१',
      iconSvg: (
        <svg viewBox="0 0 24 24" className="ssb-doc-row-svg" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          <path d="M8 7h8M8 11h6" />
        </svg>
      ),
      sanskrit: 'वर्णमाला एवं अक्षराणि',
      english: 'Alphabet & Sounds',
      action: onOpenVarnamala,
      stepLabel: 'Step 1',
    },
    {
      id: 'sentences',
      stepNum: '२',
      iconSvg: (
        <svg viewBox="0 0 24 24" className="ssb-doc-row-svg" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M19 4v16M5 4v16" />
          <path d="M5 4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V4z" />
          <path d="M9 8h6M9 12h6M9 16h4" />
        </svg>
      ),
      sanskrit: 'सरल-वाक्यानि',
      english: 'Everyday Sentences',
      action: () => onOpenReader('simple-sentences'),
      stepLabel: 'Step 2',
    },
    {
      id: 'grammar',
      stepNum: '३',
      iconSvg: (
        <svg viewBox="0 0 24 24" className="ssb-doc-row-svg" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
          <path d="M13 13l6 6" />
        </svg>
      ),
      sanskrit: 'व्याकरणम्',
      english: 'Grammar',
      action: onOpenGrammar,
      stepLabel: 'Step 3',
    },
    {
      id: 'deepakam',
      stepNum: '४',
      iconSvg: (
        <svg viewBox="0 0 24 24" className="ssb-doc-row-svg" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 2c-.5 2.5-3 4-3 7 0 2.8 2.2 5 5 5s5-2.2 5-5c0-3-2.5-4.5-3-7z" />
          <path d="M6 18h12v3a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-3z" />
        </svg>
      ),
      sanskrit: 'दीपकम्',
      english: 'Deepakam Reader',
      action: () => onOpenReader(),
      stepLabel: 'Step 4',
    },
    {
      id: 'exams',
      stepNum: '५',
      iconSvg: (
        <svg viewBox="0 0 24 24" className="ssb-doc-row-svg" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
      sanskrit: 'परीक्षा-सिद्धिः',
      english: 'CBSE Exam Prep',
      action: () => {
        if (onOpenCbseGuide) onOpenCbseGuide();
        else if (onOpenQuiz) onOpenQuiz();
      },
      stepLabel: 'Step 5',
    },
  ];

  return (
    <section className="student-staircase-section" aria-label="Staircase of Learning towards Wisdom">
      {/* Eyebrow Header */}
      <div className="ssb-eyebrow">
        <span className="ssb-badge">ज्ञान-सोपानम् · THE STAIRCASE OF WISDOM</span>
        <span className="ssb-subtext">विद्या ददाति विनयम् · विनयाद्याति पात्रताम्</span>
      </div>

      {/* Parchment Antique Stage Frame */}
      <div className="ssb-antique-stage">
        {/* Subtle Decorative Tea-Stain Corners */}
        <div className="ssb-stain-corner ssb-stain-tl" aria-hidden="true" />
        <div className="ssb-stain-corner ssb-stain-tr" aria-hidden="true" />
        <div className="ssb-stain-corner ssb-stain-bl" aria-hidden="true" />
        <div className="ssb-stain-corner ssb-stain-br" aria-hidden="true" />

        {/* 2-Column Main Layout: Person Image on Left, Ancient Document Menu on Right */}
        <div className="ssb-parchment-grid">
          {/* LEFT SIDE: Person Climbing the Ancient Steps */}
          <div className="ssb-person-panel">
            {/* Top Motto Tablet on Left */}
            <div className="ssb-stone-tablet ssb-stone-tablet--left">
              <h2 className="ssb-tablet-title">NAMO NAMAHA - SWAGATAM</h2>
              <p className="ssb-tablet-quote">
                “Climb each step with reverence. The blackboard of wisdom awaits.”
              </p>
            </div>

            {/* Person Image Frame */}
            <div className="ssb-person-image-frame">
              <img
                src="/gurukul-student-staircase.jpg"
                alt="Young Indian student carrying palm-leaf manuscripts seen from behind ascending ancient stone staircase towards the sacred temple gateway"
                className="ssb-person-art-img"
                loading="lazy"
                onError={(e) => {
                  // Fallback to existing student blackboard asset if new image loading
                  const target = e.currentTarget;
                  if (!target.src.includes('gurukul-staircase-blackboard.jpg')) {
                    target.src = '/gurukul-staircase-blackboard.jpg';
                  }
                }}
              />
              {/* Warm Golden Sunrise Overlay Vignette */}
              <div className="ssb-person-sun-overlay" aria-hidden="true" />

              {/* Floating Stair Steps Progress Pill Rail */}
              <div className="ssb-stairs-chip-rail" aria-label="Ascending steps of learning">
                <div className={`ssb-step-pill ${activeHoverStep === 1 ? 'is-highlight' : ''}`}>
                  <span className="ssb-step-pill-num">१</span>
                  <span>ध्वनिः (Sound)</span>
                </div>
                <span className="ssb-step-rail-arrow">➜</span>
                <div className={`ssb-step-pill ${activeHoverStep === 2 ? 'is-highlight' : ''}`}>
                  <span className="ssb-step-pill-num">२</span>
                  <span>वाक्यम् (Sentences)</span>
                </div>
                <span className="ssb-step-rail-arrow">➜</span>
                <div className={`ssb-step-pill ${activeHoverStep === 3 ? 'is-highlight' : ''}`}>
                  <span className="ssb-step-pill-num">३</span>
                  <span>व्याकरणम् (Rules)</span>
                </div>
                <span className="ssb-step-rail-arrow">➜</span>
                <div className={`ssb-step-pill ${activeHoverStep === 4 ? 'is-highlight' : ''}`}>
                  <span className="ssb-step-pill-num">४</span>
                  <span>दीपकम् (Reader)</span>
                </div>
                <span className="ssb-step-rail-arrow">➜</span>
                <div className={`ssb-step-pill ${activeHoverStep === 5 ? 'is-highlight' : ''}`}>
                  <span className="ssb-step-pill-num">५</span>
                  <span>सिद्धिः (Mastery)</span>
                </div>
              </div>
            </div>

            {/* Bronze Medallion Seal (Bottom Left) */}
            <div
              className="ssb-bronze-medallion-badge"
              onClick={() => {
                if (onOpenBodhi) onOpenBodhi();
                else handleNamasteGreeting();
              }}
              role="button"
              tabIndex={0}
              title="Bodhi: Gurukul Guide · Click to open Bodhi mentor or hear traditional blessing"
            >
              <div className="ssb-medallion-circle">
                <div className="ssb-medallion-leaf-icon" aria-hidden="true">
                  🍃
                </div>
                <div className="ssb-medallion-curved-text-top">Bodhi बोधिः</div>
                <div className="ssb-medallion-curved-text-bottom">Gurukul Guide</div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: The Menu Displayed as the Document */}
          <div className="ssb-document-panel">
            {/* Top Stone Plaque Banner on Right */}
            <div className="ssb-stone-tablet ssb-stone-tablet--right">
              <div className="ssb-tablet-header-row">
                <div>
                  <h2 className="ssb-tablet-title">NAMO NAMAHA - SWAGATAM</h2>
                  <p className="ssb-tablet-quote">
                    “Climb each step with reverence. The blackboard of wisdom awaits.”
                  </p>
                </div>
                <button
                  type="button"
                  className={`ssb-namaste-chime-btn ${isGreetingSpeaking ? 'speaking' : ''}`}
                  onClick={handleNamasteGreeting}
                  title="Listen to Sanskrit Swagatam greeting chant"
                  aria-label="Listen greeting"
                >
                  <span aria-hidden="true">🙏</span>
                  <span className="ssb-chime-text">{isGreetingSpeaking ? 'Speaking...' : 'Chant'}</span>
                </button>
              </div>
            </div>

            {/* The Ancient Rolled Parchment Scroll Document */}
            <div className="ssb-parchment-scroll-card" role="region" aria-label="Sanskrit Study Curriculum Document">
              {/* Top Roll Cylinder of Ancient Scroll */}
              <div className="ssb-scroll-roll-top" aria-hidden="true">
                <div className="ssb-scroll-rod" />
                <div className="ssb-scroll-curled-edge" />
              </div>

              {/* Scroll Document Body */}
              <div className="ssb-scroll-document-body">
                <div className="ssb-scroll-rows-list">
                  {LEARNING_LINKS.map((link, idx) => (
                    <button
                      type="button"
                      key={link.id}
                      className="ssb-scroll-doc-row"
                      onClick={() => {
                        soundEffects.playPuzzleSnap();
                        link.action();
                      }}
                      onMouseEnter={() => setActiveHoverStep(idx + 1)}
                      onMouseLeave={() => setActiveHoverStep(null)}
                      title={`Open ${link.sanskrit} · ${link.english}`}
                    >
                      <div className="ssb-doc-row-left">
                        <div className="ssb-doc-icon-wrap" aria-hidden="true">
                          {link.iconSvg}
                        </div>
                        <div className="ssb-doc-titles">
                          <div className="ssb-doc-sanskrit">{link.sanskrit}</div>
                          <div className="ssb-doc-english">{link.english}</div>
                        </div>
                      </div>

                      <div className="ssb-doc-step-btn">
                        <span>{link.stepLabel}</span>
                        <span className="ssb-doc-arrow" aria-hidden="true">➔</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Bottom Roll Cylinder of Ancient Scroll */}
              <div className="ssb-scroll-roll-bottom" aria-hidden="true">
                <div className="ssb-scroll-curled-edge" />
                <div className="ssb-scroll-rod" />
              </div>
            </div>

            {/* Bottom Floating Accents & Care Link */}
            <div className="ssb-doc-footer-row">
              <button
                type="button"
                className="ssb-audio-relisten-pill"
                onClick={handleNamasteGreeting}
              >
                <span>🔊</span>
                <span>{isGreetingSpeaking ? 'उच्चारणं प्रवर्तते...' : 'Tap to hear: नमो नमः स्वागतम्'}</span>
              </button>

              <a
                href="https://wa.me/919000335468?text=Hello%20EdNet%20Gurukul%2C%20I%20have%20a%20question%20about%20the%20Sanskrit%20curriculum"
                target="_blank"
                rel="noopener noreferrer"
                className="ssb-learner-care-pill"
                title="Open Learner Care Desk on WhatsApp"
              >
                <span aria-hidden="true">💬</span>
                <span>Learner Care Desk</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

