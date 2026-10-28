import React from 'react';
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
}) => {
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
    <section className="student-staircase-section" aria-label="Sanskrit Study Curriculum Pathways">
      {/* Parchment Antique Stage Frame */}
      <div className="ssb-antique-stage">
        {/* Subtle Decorative Tea-Stain Corners */}
        <div className="ssb-stain-corner ssb-stain-tl" aria-hidden="true" />
        <div className="ssb-stain-corner ssb-stain-tr" aria-hidden="true" />
        <div className="ssb-stain-corner ssb-stain-bl" aria-hidden="true" />
        <div className="ssb-stain-corner ssb-stain-br" aria-hidden="true" />

        {/* 2-Column Main Layout: Pure Person Image on Left, Ancient Rolled Document Menu on Right */}
        <div className="ssb-parchment-grid">
          {/* LEFT SIDE: Person Climbing the Ancient Steps */}
          <div className="ssb-person-panel">
            <div className="ssb-person-image-frame">
              <img
                src="/gurukul-student-staircase.jpg"
                alt="Student climbing the ancient temple staircase towards wisdom"
                className="ssb-person-art-img"
                loading="lazy"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('gurukul-staircase-blackboard.jpg')) {
                    target.src = '/gurukul-staircase-blackboard.jpg';
                  }
                }}
              />
              <div className="ssb-person-sun-overlay" aria-hidden="true" />
            </div>
          </div>

          {/* RIGHT SIDE: The Menu Displayed as the Document */}
          <div className="ssb-document-panel">
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
                  {LEARNING_LINKS.map((link) => (
                    <button
                      type="button"
                      key={link.id}
                      className="ssb-scroll-doc-row"
                      onClick={() => {
                        soundEffects.playPuzzleSnap();
                        link.action();
                      }}
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
          </div>
        </div>
      </div>
    </section>
  );
};
