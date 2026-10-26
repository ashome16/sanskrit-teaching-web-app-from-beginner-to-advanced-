import React, { useState } from 'react';
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

type PathCategory = 'all' | 'beginners' | 'school' | 'scholars';

export const SegmentedLearningPaths: React.FC<SegmentedLearningPathsProps> = ({
  onOpenVarnamala,
  onOpenBoard,
  onOpenReader,
  onOpenGrammar,
  onOpenCbseGuide,
  onOpenWorksheets,
  onOpenQuiz,
  onOpenDhatupatha,
  onOpenCourse,
  onOpenVedicMaths,
  onOpenScienceLab,
}) => {
  const [activeFilter, setActiveFilter] = useState<PathCategory>('all');

  return (
    <section className="slp-section" id="learning-paths" aria-label="Targeted Sanskrit Learning Pathways">
      <div className="slp-header">
        <div className="slp-eyebrow">
          <span>🧭</span>
          <span>अध्ययन-मार्गाः · CHOOSE YOUR PATHWAY</span>
        </div>
        <h2 className="slp-title">
          Three Tailored Learning Paths · Built for Your Exact Goal
        </h2>
        <p className="slp-subtitle">
          Whether you are taking your very first step, preparing for 80-mark CBSE exams, or researching ancient Pāṇinian linguistics, start with a focused curriculum:
        </p>

        {/* Filter Pills */}
        <div className="slp-filters" role="tablist" aria-label="Filter Learning Paths">
          <button
            type="button"
            role="tab"
            aria-selected={activeFilter === 'all'}
            className={`slp-filter-pill${activeFilter === 'all' ? ' active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All 3 Pathways
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeFilter === 'beginners'}
            className={`slp-filter-pill${activeFilter === 'beginners' ? ' active' : ''}`}
            onClick={() => setActiveFilter('beginners')}
          >
            🌱 1. For Beginners &amp; Kids
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeFilter === 'school'}
            className={`slp-filter-pill${activeFilter === 'school' ? ' active' : ''}`}
            onClick={() => setActiveFilter('school')}
          >
            🎒 2. For School Students (CBSE 6–10)
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeFilter === 'scholars'}
            className={`slp-filter-pill${activeFilter === 'scholars' ? ' active' : ''}`}
            onClick={() => setActiveFilter('scholars')}
          >
            🏛️ 3. For Scholars &amp; Advanced
          </button>
        </div>
      </div>

      <div className="slp-cards-grid">
        {/* PATH 1: For Beginners & Kids */}
        {(activeFilter === 'all' || activeFilter === 'beginners') && (
          <div className="slp-card slp-card--beginners">
            <div className="slp-card-accent-bar slp-card-accent-bar--emerald" />
            <div className="slp-card-inner">
              <div className="slp-card-top">
                <span className="slp-card-badge slp-badge--emerald">Level 1 · Age 6+ &amp; Adult Beginners</span>
                <span className="slp-card-sanskrit">प्रारम्भिक-वर्गः</span>
              </div>

              <div className="slp-card-icon-title">
                <div className="slp-card-avatar slp-avatar--emerald" aria-hidden="true">🌱</div>
                <div>
                  <h3 className="slp-card-title">For Beginners &amp; Kids</h3>
                  <p className="slp-card-promise">Read &amp; speak your first Sanskrit words in 7 days</p>
                </div>
              </div>

              <p className="slp-card-desc">
                Zero prerequisites needed. Designed with playful visual cues, native pronunciation audio on every letter, and interactive syllable building to eliminate all fear of Sanskrit.
              </p>

              <div className="slp-modules-list">
                <h4 className="slp-modules-heading">Included Foundation Modules:</h4>
                <div className="slp-module-item" onClick={onOpenVarnamala} role="button" tabIndex={0} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpenVarnamala()}>
                  <span className="slp-mod-icon">🔤</span>
                  <div className="slp-mod-info">
                    <strong>Varṇamālā (Alphabet)</strong>
                    <span>13 Vowels, 33 Consonants with authentic 5 mouth articulation points</span>
                  </div>
                  <span className="slp-mod-arrow">➔</span>
                </div>

                <div className="slp-module-item" onClick={onOpenVarnamala} role="button" tabIndex={0} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpenVarnamala()}>
                  <span className="slp-mod-icon">🔡</span>
                  <div className="slp-mod-info">
                    <strong>Bārahkhaḍī (Syllable Chart)</strong>
                    <span>400+ Matra combinations (क, का, कि, की...) with 1-tap audio playback</span>
                  </div>
                  <span className="slp-mod-arrow">➔</span>
                </div>

                <div className="slp-module-item" onClick={onOpenBoard} role="button" tabIndex={0} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpenBoard()}>
                  <span className="slp-mod-icon">🧩</span>
                  <div className="slp-mod-info">
                    <strong>Basic Vocabulary (Jodo Studio)</strong>
                    <span>6,000+ interactive tile puzzles across animals, daily objects &amp; family</span>
                  </div>
                  <span className="slp-mod-arrow">➔</span>
                </div>

                <div className="slp-module-item" onClick={() => onOpenReader('gsde101')} role="button" tabIndex={0} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpenReader('gsde101')}>
                  <span className="slp-mod-icon">💬</span>
                  <div className="slp-mod-info">
                    <strong>Spoken Sanskrit &amp; Greetings</strong>
                    <span>Simple everyday dialogues, polite etiquette (नमो नमः, स्वागतम्) with audio</span>
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
                  🧩 Play Word Puzzles
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PATH 2: For School Students (CBSE & NCERT 6–10) */}
        {(activeFilter === 'all' || activeFilter === 'school') && (
          <div className="slp-card slp-card--school">
            <div className="slp-card-accent-bar slp-card-accent-bar--indigo" />
            <div className="slp-card-inner">
              <div className="slp-card-top">
                <span className="slp-card-badge slp-badge--indigo">Classes 6–10 · CBSE &amp; State Boards</span>
                <span className="slp-card-sanskrit">विद्यालय-वर्गः</span>
              </div>

              <div className="slp-card-icon-title">
                <div className="slp-card-avatar slp-avatar--indigo" aria-hidden="true">🎒</div>
                <div>
                  <h3 className="slp-card-title">For School Students</h3>
                  <p className="slp-card-promise">Master textbooks word-by-word &amp; score 95%+ in exams</p>
                </div>
              </div>

              <p className="slp-card-desc">
                Everything required to ace CBSE Sanskrit: word-by-word textbook translations, shloka anvaya breakdowns, solved chapter worksheets, and board exam question formation drills.
              </p>

              <div className="slp-modules-list">
                <h4 className="slp-modules-heading">Included Academic Curriculum:</h4>
                <div className="slp-module-item" onClick={() => onOpenReader('gsde101')} role="button" tabIndex={0} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpenReader('gsde101')}>
                  <span className="slp-mod-icon">📖</span>
                  <div className="slp-mod-info">
                    <strong>NCERT Classes 6–10 Readers</strong>
                    <span>Complete Class 7 &amp; 8 Deepakam and Class 9 Sharada with word-by-word audio</span>
                  </div>
                  <span className="slp-mod-arrow">➔</span>
                </div>

                <div className="slp-module-item" onClick={onOpenWorksheets || (() => onOpenReader('worksheets'))} role="button" tabIndex={0} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (onOpenWorksheets ? onOpenWorksheets() : onOpenReader('worksheets'))}>
                  <span className="slp-mod-icon">📑</span>
                  <div className="slp-mod-info">
                    <strong>Printable Chapter Worksheets</strong>
                    <span>Fill-in-the-blanks, Sandhi splits &amp; comprehension with teacher answer keys</span>
                  </div>
                  <span className="slp-mod-arrow">➔</span>
                </div>

                <div className="slp-module-item" onClick={onOpenQuiz} role="button" tabIndex={0} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpenQuiz?.()}>
                  <span className="slp-mod-icon">🎯</span>
                  <div className="slp-mod-info">
                    <strong>Diagnostic Quizzes &amp; Tests</strong>
                    <span>Timed practice on 7 Vibhaktis, Lakāra conjugations, Avyayas &amp; Pratyayas</span>
                  </div>
                  <span className="slp-mod-arrow">➔</span>
                </div>

                <div className="slp-module-item" onClick={onOpenCbseGuide} role="button" tabIndex={0} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpenCbseGuide?.()}>
                  <span className="slp-mod-icon">📘</span>
                  <div className="slp-mod-info">
                    <strong>80-Mark CBSE Exam Blueprint</strong>
                    <span>Question generation (किम्-पद), unseen prose, letter writing &amp; mock papers</span>
                  </div>
                  <span className="slp-mod-arrow">➔</span>
                </div>
              </div>

              <div className="slp-card-actions">
                <button
                  type="button"
                  className="slp-primary-btn slp-btn--indigo"
                  onClick={() => onOpenReader('gsde101')}
                  title="Open NCERT Deepakam Chapter 1"
                >
                  Start School Path ➔
                </button>
                {onOpenCbseGuide && (
                  <button
                    type="button"
                    className="slp-secondary-btn"
                    onClick={onOpenCbseGuide}
                    title="Open CBSE Exam Guide"
                  >
                    📘 Exam Blueprint
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* PATH 3: For Scholars & Advanced Learners */}
        {(activeFilter === 'all' || activeFilter === 'scholars') && (
          <div className="slp-card slp-card--scholars">
            <div className="slp-card-accent-bar slp-card-accent-bar--amber" />
            <div className="slp-card-inner">
              <div className="slp-card-top">
                <span className="slp-card-badge slp-badge--amber">Linguistics, Research &amp; Heritage</span>
                <span className="slp-card-sanskrit">विद्वत्-वर्गः</span>
              </div>

              <div className="slp-card-icon-title">
                <div className="slp-card-avatar slp-avatar--amber" aria-hidden="true">🏛️</div>
                <div>
                  <h3 className="slp-card-title">For Scholars &amp; Enthusiasts</h3>
                  <p className="slp-card-promise">Master generative Pāṇinian science &amp; mental Vedic math</p>
                </div>
              </div>

              <p className="slp-card-desc">
                For university researchers, adult polymaths, and shastric enthusiasts. Delve into the generative root mathematics of Pāṇini’s Aṣṭādhyāyī and ancient Indian computational sciences.
              </p>

              <div className="slp-modules-list">
                <h4 className="slp-modules-heading">Included Scholarly Tools:</h4>
                <div className="slp-module-item" onClick={onOpenDhatupatha || onOpenGrammar} role="button" tabIndex={0} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (onOpenDhatupatha || onOpenGrammar)()}>
                  <span className="slp-mod-icon">🌿</span>
                  <div className="slp-mod-info">
                    <strong>Dhātupāṭha Engine</strong>
                    <span>Reverse word deconstructor (गत्वा ➔ गम् + क्त्वा) &amp; 5-lakāra verb matrices</span>
                  </div>
                  <span className="slp-mod-arrow">➔</span>
                </div>

                <div className="slp-module-item" onClick={onOpenGrammar} role="button" tabIndex={0} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpenGrammar()}>
                  <span className="slp-mod-icon">📚</span>
                  <div className="slp-mod-info">
                    <strong>17 Grammar Masterclasses</strong>
                    <span>Deep investigations into Sandhi algorithms, Kāraka semantics, and Samāsa</span>
                  </div>
                  <span className="slp-mod-arrow">➔</span>
                </div>

                {onOpenCourse && (
                  <div className="slp-module-item" onClick={onOpenCourse} role="button" tabIndex={0} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpenCourse()}>
                    <span className="slp-mod-icon">🧠</span>
                    <div className="slp-mod-info">
                      <strong>Sanskrit Thinking (28 Lessons)</strong>
                      <span>Computational linguistics mapping Pāṇini to BNF grammars and cognitive science</span>
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
                    <span className="slp-mod-icon">⚡</span>
                    <div className="slp-mod-info">
                      <strong>Vaidic Gaṇitam &amp; Vijñāna Lab</strong>
                      <span>16 mental calculation Sutras, Baudhāyana geometry &amp; astronomical modeling</span>
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
                    🧠 28-Lesson Course
                  </button>
                )}
                {onOpenScienceLab && (
                  <button
                    type="button"
                    className="slp-secondary-btn"
                    onClick={onOpenScienceLab}
                    title="Launch Vijñāna Science Lab"
                  >
                    🔬 Vijñāna Lab
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SegmentedLearningPaths;
