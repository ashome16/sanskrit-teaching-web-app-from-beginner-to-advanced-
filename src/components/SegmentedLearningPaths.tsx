import React from 'react';
import '../styles/segmented-learning-paths.css';

export interface SegmentedLearningPathsProps {
  onOpenVarnamala: () => void;
  onOpenBoard: () => void;
  onOpenReader: (lessonId?: string) => void;
  onOpenGrammar: () => void;
  onOpenCbseGuide?: () => void;
  onOpenWorksheets?: () => void;
  onOpenQuiz?: () => void;
  onOpenDhatupatha?: () => void;
  onOpenCourse?: () => void;
  onOpenVedicMaths?: () => void;
  onOpenScienceLab?: () => void;
}

/* -------------------------------------------------------------------------
   Drawn Vector Art Icons (Replacing Emojis with Classical Hand-Drawn Icons)
   ------------------------------------------------------------------------- */

const CompassIcon: React.FC = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="7" stroke="#92400e" strokeWidth="1.3" />
    <polygon points="8,3 10,8 8,7 6,8" fill="#b45309" />
    <polygon points="8,13 10,8 8,9 6,8" fill="#d97706" />
  </svg>
);

const SproutDrawnArt: React.FC = () => (
  <svg viewBox="0 0 40 40" width="36" height="36" fill="none" aria-hidden="true">
    <path d="M10 32 C12 28, 28 28, 30 32 C26 34, 14 34, 10 32 Z" fill="#a7f3d0" stroke="#059669" strokeWidth="1.5" />
    <path d="M20 30 C19.5 24, 20 18, 20.5 12" stroke="#059669" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M20 22 C14 20, 10 14, 11 9 C16 9, 19 14, 20 21" fill="#34d399" stroke="#047857" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M14 14 C17 17, 19 19, 20 20.5" stroke="#047857" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
    <path d="M20.5 17 C26 15, 30 9, 29 4 C24 4, 21 9, 20.5 16" fill="#10b981" stroke="#047857" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M26 9 C23 12, 21.5 14.5, 20.5 16" stroke="#ecfdf5" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
    <circle cx="28" cy="5" r="1.2" fill="#ecfdf5" />
  </svg>
);

const HeritageDrawnArt: React.FC = () => (
  <svg viewBox="0 0 40 40" width="36" height="36" fill="none" aria-hidden="true">
    <rect x="6" y="32" width="28" height="4" rx="1.5" fill="#fde68a" stroke="#b45309" strokeWidth="1.4" />
    <rect x="9" y="29" width="22" height="3" rx="1" fill="#fef3c7" stroke="#b45309" strokeWidth="1.2" />
    <rect x="10" y="17" width="3.5" height="12" rx="1" fill="#fef3c7" stroke="#b45309" strokeWidth="1.2" />
    <rect x="16" y="17" width="3.5" height="12" rx="1" fill="#fde68a" stroke="#b45309" strokeWidth="1.2" />
    <rect x="21" y="17" width="3.5" height="12" rx="1" fill="#fde68a" stroke="#b45309" strokeWidth="1.2" />
    <rect x="27" y="17" width="3.5" height="12" rx="1" fill="#fef3c7" stroke="#b45309" strokeWidth="1.2" />
    <rect x="7" y="14" width="26" height="3" rx="1" fill="#fde68a" stroke="#b45309" strokeWidth="1.2" />
    <path d="M8 14 C12 8, 28 8, 32 14 Z" fill="#fbbf24" stroke="#b45309" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M17 8 L20 4 L23 8 Z" fill="#d97706" stroke="#78350f" strokeWidth="1.2" />
    <circle cx="20" cy="3" r="1.5" fill="#f59e0b" stroke="#78350f" strokeWidth="1" />
  </svg>
);

const VarnamalaDrawnIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="4" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5" />
    <path d="M8 7 H16 M13 7 V17 M8 9.5 C8.5 8.5 11 8.5 11 11 C11 12.5 9.5 12.5 8.5 12.5 C10 12.5 11.5 12.5 11.5 14.5 C11.5 16.5 9 16.5 8 15.5 M10 12.5 H13" stroke="#065f46" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BarakhadiDrawnIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="4" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5" />
    <path d="M7 6 H17 M12 6 V18 M8 12 C8 9.5 16 9.5 16 12 C16 14.5 8 14.5 8 12 Z M17 6 V18" stroke="#065f46" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const PuzzleDrawnIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
    <path d="M6 4 H10 C10 5.5 11.5 6 12 6 C12.5 6 14 5.5 14 4 H18 C19.1 4 20 4.9 20 6 V10 C18.5 10 18 11.5 18 12 C18 12.5 18.5 14 20 14 V18 C20 19.1 19.1 20 18 20 H14 C14 18.5 12.5 18 12 18 C11.5 18 10 18.5 10 20 H6 C4.9 20 4 19.1 4 18 V14 C5.5 14 6 12.5 6 12 C6 11.5 5.5 10 4 10 V6 C4 4.9 4.9 4 6 4 Z" fill="#d1fae5" stroke="#059669" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const SpeechDrawnIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
    <path d="M4 6 C4 4.9 4.9 4 6 4 H15 C16.1 4 17 4.9 17 6 V12 C17 13.1 16.1 14 15 14 H10 L6 17 V14 H6 C4.9 14 4 13.1 4 12 Z" fill="#ecfdf5" stroke="#059669" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M8 8 H13 M8 10 H11" stroke="#047857" strokeWidth="1.3" strokeLinecap="round" />
    <path d="M17 8 C18.5 8.5 19.5 9.8 19.5 11.5 C19.5 12.8 18.8 14 17.7 14.6 L18.5 17.5 L15.5 16 C15 16.2 14.5 16.3 14 16.3" stroke="#10b981" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const DhatuDrawnIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
    <path d="M4 14 L7 14 L10 20 L15 5 H20" stroke="#b45309" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 8 C17 6, 20 7, 20 10 C18 11, 15 11, 14 8 Z" fill="#fde68a" stroke="#b45309" strokeWidth="1.2" strokeLinejoin="round" />
    <circle cx="12.5" cy="12.5" r="1.5" fill="#d97706" />
  </svg>
);

const GranthaDrawnIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
    <rect x="3" y="6" width="18" height="5" rx="1.5" fill="#fef3c7" stroke="#b45309" strokeWidth="1.3" />
    <rect x="3" y="13" width="18" height="5" rx="1.5" fill="#fde68a" stroke="#b45309" strokeWidth="1.3" />
    <path d="M8 5 V19 M16 5 V19" stroke="#92400e" strokeWidth="1.2" strokeDasharray="2 1" />
    <circle cx="12" cy="8.5" r="1" fill="#b45309" />
    <circle cx="12" cy="15.5" r="1" fill="#b45309" />
  </svg>
);

const LogicDrawnIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
    <circle cx="12" cy="5" r="2.5" fill="#fef3c7" stroke="#b45309" strokeWidth="1.4" />
    <circle cx="6" cy="14" r="2.5" fill="#fde68a" stroke="#b45309" strokeWidth="1.4" />
    <circle cx="18" cy="14" r="2.5" fill="#fde68a" stroke="#b45309" strokeWidth="1.4" />
    <circle cx="12" cy="19" r="2" fill="#fffbeb" stroke="#b45309" strokeWidth="1.2" />
    <path d="M10.5 7 L7.5 12 M13.5 7 L16.5 12 M7.5 16 L10.5 18 M16.5 16 L13.5 18" stroke="#d97706" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const YantraDrawnIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
    <polygon points="12,3 20,17 4,17" fill="#fef3c7" stroke="#b45309" strokeWidth="1.3" />
    <polygon points="12,21 4,7 20,7" stroke="#d97706" strokeWidth="1.3" opacity="0.8" />
    <circle cx="12" cy="12" r="2" fill="#b45309" />
  </svg>
);

export const SegmentedLearningPaths: React.FC<SegmentedLearningPathsProps> = ({
  onOpenVarnamala,
  onOpenBoard,
  onOpenReader,
  onOpenGrammar,
  onOpenCbseGuide: _cbse,
  onOpenWorksheets: _ws,
  onOpenQuiz: _quiz,
  onOpenDhatupatha,
  onOpenCourse,
  onOpenVedicMaths,
  onOpenScienceLab,
}) => {
  void _cbse; void _ws; void _quiz;
  return (
    <section className="slp-section" id="learning-paths" aria-label="Targeted Sanskrit Learning Pathways">
      <div className="slp-header">
        <div className="slp-eyebrow">
          <CompassIcon />
          <span>अध्ययन-मार्गाः · CHOOSE YOUR PATHWAY</span>
        </div>
        <p className="slp-subtitle">
          Whether you are taking your very first step, preparing for 80-mark CBSE exams, or researching ancient Pāṇinian linguistics, start with a focused curriculum:
        </p>
      </div>

      <div className="slp-cards-grid">
        {/* PATH 1: For Beginners & Kids */}
        <div className="slp-card slp-card--beginners">
          <div className="slp-card-accent-bar slp-card-accent-bar--emerald" />
          <div className="slp-card-inner">
            <div className="slp-card-top">
              <span className="slp-card-badge slp-badge--emerald">Level 1 · Age 6+ &amp; Adult Beginners</span>
              <span className="slp-card-sanskrit">प्रारम्भिक-वर्गः</span>
            </div>

            <div className="slp-card-icon-title">
              <div className="slp-card-avatar slp-avatar--emerald" aria-hidden="true">
                <SproutDrawnArt />
              </div>
              <div>
                <h3 className="slp-card-title">For Beginners &amp; Kids</h3>
                <p className="slp-card-promise">Read &amp; speak your first Sanskrit words in 7 days</p>
              </div>
            </div>

            <div className="slp-modules-list">
              <h4 className="slp-modules-heading">Included Foundation Modules:</h4>
              <div
                className="slp-module-item"
                onClick={onOpenVarnamala}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpenVarnamala()}
              >
                <span className="slp-mod-icon">
                  <VarnamalaDrawnIcon />
                </span>
                <div className="slp-mod-info">
                  <strong>Varṇamālā (Alphabet)</strong>
                  <span>13 Vowels, 33 Consonants &amp; 5 articulation points</span>
                </div>
                <span className="slp-mod-arrow">➔</span>
              </div>

              <div
                className="slp-module-item"
                onClick={onOpenVarnamala}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpenVarnamala()}
              >
                <span className="slp-mod-icon">
                  <BarakhadiDrawnIcon />
                </span>
                <div className="slp-mod-info">
                  <strong>Bārahkhaḍī (Syllable Chart)</strong>
                  <span>400+ Matra combinations with 1-tap audio</span>
                </div>
                <span className="slp-mod-arrow">➔</span>
              </div>

              <div
                className="slp-module-item"
                onClick={onOpenBoard}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpenBoard()}
              >
                <span className="slp-mod-icon">
                  <PuzzleDrawnIcon />
                </span>
                <div className="slp-mod-info">
                  <strong>Basic Vocabulary (Jodo Studio)</strong>
                  <span>6,000+ interactive puzzles &amp; daily vocabulary</span>
                </div>
                <span className="slp-mod-arrow">➔</span>
              </div>

              <div
                className="slp-module-item"
                onClick={() => onOpenReader('gsde101')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpenReader('gsde101')}
              >
                <span className="slp-mod-icon">
                  <SpeechDrawnIcon />
                </span>
                <div className="slp-mod-info">
                  <strong>Spoken Sanskrit &amp; Greetings</strong>
                  <span>Everyday spoken dialogues &amp; polite etiquette</span>
                </div>
                <span className="slp-mod-arrow">➔</span>
              </div>
            </div>

            <div className="slp-card-actions">
              <button
                type="button"
                className="slp-primary-btn slp-btn--emerald"
                onClick={onOpenVarnamala}
                title="Start Varṇamālā Alphabet Practice"
              >
                Start Beginner Path ➔
              </button>
              <button
                type="button"
                className="slp-secondary-btn"
                onClick={onOpenBoard}
                title="Play 6,000+ Word Jodo Puzzles"
              >
                Play Word Puzzles
              </button>
            </div>
          </div>
        </div>

        {/* PATH 2 (School Students) merged into homepage #ncert-curriculum section */}
        {/* PATH 3: For Scholars & Advanced Learners */}
        <div className="slp-card slp-card--scholars">
          <div className="slp-card-accent-bar slp-card-accent-bar--amber" />
          <div className="slp-card-inner">
            <div className="slp-card-top">
              <span className="slp-card-badge slp-badge--amber">Linguistics, Research &amp; Heritage</span>
              <span className="slp-card-sanskrit">विद्वत्-वर्गः</span>
            </div>

            <div className="slp-card-icon-title">
              <div className="slp-card-avatar slp-avatar--amber" aria-hidden="true">
                <HeritageDrawnArt />
              </div>
              <div>
                <h3 className="slp-card-title">For Scholars &amp; Enthusiasts</h3>
                <p className="slp-card-promise">Master generative Pāṇinian science &amp; mental Vedic math</p>
              </div>
            </div>

            <div className="slp-modules-list">
              <h4 className="slp-modules-heading">Included Scholarly Tools:</h4>
              <div
                className="slp-module-item"
                onClick={onOpenDhatupatha || onOpenGrammar}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (onOpenDhatupatha || onOpenGrammar)()}
              >
                <span className="slp-mod-icon">
                  <DhatuDrawnIcon />
                </span>
                <div className="slp-mod-info">
                  <strong>Dhātupāṭha Engine</strong>
                  <span>Root deconstructor &amp; 5-lakāra verb matrices</span>
                </div>
                <span className="slp-mod-arrow">➔</span>
              </div>

              <div
                className="slp-module-item"
                onClick={onOpenGrammar}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpenGrammar()}
              >
                <span className="slp-mod-icon">
                  <GranthaDrawnIcon />
                </span>
                <div className="slp-mod-info">
                  <strong>17 Grammar Masterclasses</strong>
                  <span>Sandhi algorithms, Kāraka semantics &amp; Samāsa</span>
                </div>
                <span className="slp-mod-arrow">➔</span>
              </div>

              {onOpenCourse && (
                <div
                  className="slp-module-item"
                  onClick={onOpenCourse}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpenCourse()}
                >
                  <span className="slp-mod-icon">
                    <LogicDrawnIcon />
                  </span>
                  <div className="slp-mod-info">
                    <strong>Sanskrit Thinking (28 Lessons)</strong>
                    <span>Pāṇinian BNF grammars &amp; cognitive linguistics</span>
                  </div>
                  <span className="slp-mod-arrow">➔</span>
                </div>
              )}

              {(onOpenVedicMaths || onOpenScienceLab) && (
                <div
                  className="slp-module-item"
                  onClick={onOpenScienceLab || onOpenVedicMaths}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (onOpenScienceLab || onOpenVedicMaths)!()}
                >
                  <span className="slp-mod-icon">
                    <YantraDrawnIcon />
                  </span>
                  <div className="slp-mod-info">
                    <strong>Vaidic Gaṇitam &amp; Vijñāna Lab</strong>
                    <span>16 mental Sutras, geometry &amp; astronomy</span>
                  </div>
                  <span className="slp-mod-arrow">➔</span>
                </div>
              )}
            </div>

            <div className="slp-card-actions">
              <button
                type="button"
                className="slp-primary-btn slp-btn--amber"
                onClick={onOpenDhatupatha || onOpenGrammar}
                title="Launch Dhātupāṭha Engine"
              >
                Explore Scholar Tools ➔
              </button>
              {onOpenCourse && (
                <button
                  type="button"
                  className="slp-secondary-btn"
                  onClick={onOpenCourse}
                  title="Launch 28-Lesson Course"
                >
                  28-Lesson Course
                </button>
              )}
              {onOpenScienceLab && (
                <button
                  type="button"
                  className="slp-secondary-btn"
                  onClick={onOpenScienceLab}
                  title="Launch Vijñāna Science Lab"
                >
                  Vijñāna Lab
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SegmentedLearningPaths;
