import React, { useState } from 'react';
import { soundEffects } from '../utils/soundEffects';
import type { VvmTab } from './VvmPreparationPage';
import '../styles/vvm-pathway-card.css';

export interface VvmPathwayCardProps {
  onOpenVvm: (tab?: VvmTab) => void;
}

interface SampleVvmQuestion {
  id: number;
  label: string;
  category: string;
  weightage: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const SAMPLE_VVM_QUESTIONS: SampleVvmQuestion[] = [
  {
    id: 1,
    label: 'Q1 · Heritage',
    category: 'Indian Contributions to Science (20% Weightage)',
    weightage: 'Section A · 20% Weightage',
    question: 'Which ancient Indian mathematician formulated the rules for arithmetic operations involving zero and negative numbers in the Brāhmasphuṭasiddhānta?',
    options: [
      'Āryabhaṭa',
      'Brahmagupta',
      'Bhāskara II',
      'Varāhamihira',
    ],
    correctIndex: 1,
    explanation: 'Brahmagupta (628 CE) was the first mathematician in world history to establish complete formal arithmetic rules for zero and negative integers ("A debt minus zero is a debt, zero times anything is zero").',
  },
  {
    id: 2,
    label: 'Q2 · Tri-Shakti',
    category: 'Tri-Shakti Scientist Biographies (20% Weightage)',
    weightage: 'Section A · 20% Weightage',
    question: 'Dr. Anna Mani made foundational contributions to Indian meteorology primarily through designing instruments to measure which atmospheric parameters?',
    options: [
      'Seismic waves and ocean salinity',
      'Solar radiation, ozone, and wind energy',
      'Cosmic rays and radio galaxies',
      'Monsoon cloud seeding chemicals',
    ],
    correctIndex: 1,
    explanation: 'Known as "The Weather Woman of India," Dr. Anna Mani standardized over 100 weather instruments at IMD Pune, developed the indigenous ozonesonde for ozone measurements, and authored definitive handbooks on solar radiation and wind energy.',
  },
  {
    id: 3,
    label: 'Q3 · NCERT Science',
    category: 'NCERT Science & Maths Booster (50% Weightage)',
    weightage: 'Section B · 50% Weightage',
    question: 'When white light passes through a glass prism, it splits into seven colours. Which colour bends the least?',
    options: [
      'Violet',
      'Blue',
      'Green',
      'Red',
    ],
    correctIndex: 3,
    explanation: 'Red light has the longest wavelength in the visible spectrum and travels fastest through glass, experiencing the lowest refractive index and thus refracting (bending) the least.',
  },
  {
    id: 4,
    label: 'Q4 · Logic',
    category: 'Logic & Mental Aptitude (10% Weightage)',
    weightage: 'Section B · 10% Weightage',
    question: 'Find the next number in the Virahāṅka–Fibonacci sequence: 1, 2, 3, 5, 8, 13, ?',
    options: [
      '18',
      '20',
      '21',
      '24',
    ],
    correctIndex: 2,
    explanation: 'In this additive integer sequence (formulated by Sanskrit prosodist Ācārya Virahāṅka in c. 600 CE to calculate poetic mātrā combinations), each term is the sum of the preceding two: 8 + 13 = 21.',
  },
];

export const VvmPathwayCard: React.FC<VvmPathwayCardProps> = ({ onOpenVvm }) => {
  const [activeLeftView, setActiveLeftView] = useState<'modules' | 'blueprint'>('modules');
  const [activeQIndex, setActiveQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  const currentQ = SAMPLE_VVM_QUESTIONS[activeQIndex];
  const selectedOption = selectedAnswers[currentQ.id];
  const isAnswered = selectedOption !== undefined;
  const isCorrect = selectedOption === currentQ.correctIndex;

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    const isAnsCorrect = idx === currentQ.correctIndex;
    setSelectedAnswers((prev) => ({ ...prev, [currentQ.id]: idx }));

    if (isAnsCorrect) {
      soundEffects.playSuccessDing();
    } else {
      soundEffects.playPuzzleSnap();
    }
  };

  return (
    <div className="home-pathway-card--vvm" id="vvm-talent-search" aria-label="Vidyarthi Vigyan Manthan National Talent Search">
      {/* Background Watermark SVG Illustration */}
      <div className="vvm-card-art-bg" aria-hidden="true">
        <svg viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="70" stroke="#2dd4bf" strokeWidth="1.5" strokeDasharray="4 4" />
          <ellipse cx="100" cy="100" rx="90" ry="35" stroke="#5eead4" strokeWidth="1.2" transform="rotate(30 100 100)" />
          <ellipse cx="100" cy="100" rx="90" ry="35" stroke="#5eead4" strokeWidth="1.2" transform="rotate(-30 100 100)" />
          <circle cx="100" cy="100" r="14" fill="#fde68a" />
        </svg>
      </div>

      <div className="vvm-card-inner-wrap">
        {/* ------------------------------------------------------------------
            1. Hero & Section Overview Copy
            ------------------------------------------------------------------ */}
        <div className="vvm-hero-header">
          <div className="vvm-badge-row">
            <span className="vvm-badge-primary">
              <svg viewBox="0 0 16 16" width="12" height="12" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="6" stroke="#5eead4" strokeWidth="1.4" />
                <circle cx="8" cy="8" r="2" fill="#5eead4" />
              </svg>
              विद्यार्थी विज्ञान मंथन · National Talent Search
            </span>
            <span className="vvm-badge-secondary">VIBHA · NCERT · NCSM Aligned</span>
            <span className="vvm-badge-secondary">Free National Exam Prep</span>
          </div>

          <h3 className="vvm-card-title">VVM 2026–27 Science &amp; Heritage Hub</h3>
          <p className="vvm-card-subheading">
            Bridge ancient Indian scientific heritage with modern NCERT concepts for Classes 6–11.
          </p>
          <p className="vvm-card-overview">
            Prepare for India&apos;s largest digital science talent search through interactive exploration, biography quests, and timed practice tests. Our VVM 2026–27 Hub breaks down the official curriculum into bite-sized modules—connecting traditional Indian knowledge systems with school-level science, mathematics, and logical reasoning.
          </p>

          {/* Quick Stats Pills */}
          <div className="vvm-stats-pills-row">
            <span className="vvm-stat-pill">
              <span>Classes 6–11</span>
              <strong>Class-wise tracks</strong>
            </span>
            <span className="vvm-stat-pill highlight">
              <span>40% Heritage &amp; Bio</span>
              <strong>Section A Qualifier</strong>
            </span>
            <span className="vvm-stat-pill">
              <span>50% NCERT + 10% Logic</span>
              <strong>Section B Core</strong>
            </span>
            <span className="vvm-stat-pill">
              <span>30-Q Interactive Mock</span>
              <strong>Timed practice sets</strong>
            </span>
          </div>
        </div>

        {/* ------------------------------------------------------------------
            Main Split: (Modules / Blueprint on Left) + (Quiz Teaser on Right)
            ------------------------------------------------------------------ */}
        <div className="vvm-main-split">
          {/* Left Column */}
          <div className="vvm-col-left">
            {/* Toggle View: Core Learning Modules vs Mock Blueprint */}
            <div className="vvm-view-toggle" role="tablist" aria-label="VVM Content View Toggle">
              <button
                type="button"
                className={`vvm-toggle-btn${activeLeftView === 'modules' ? ' active' : ''}`}
                onClick={() => setActiveLeftView('modules')}
                role="tab"
                aria-selected={activeLeftView === 'modules'}
              >
                Core Learning Modules (4 Tracks)
              </button>
              <button
                type="button"
                className={`vvm-toggle-btn${activeLeftView === 'blueprint' ? ' active' : ''}`}
                onClick={() => setActiveLeftView('blueprint')}
                role="tab"
                aria-selected={activeLeftView === 'blueprint'}
              >
                30-Question Exam Blueprint &amp; Cutoff Rule
              </button>
            </div>

            {/* View A: The 4 Core Modules */}
            {activeLeftView === 'modules' && (
              <div className="vvm-modules-grid">
                {/* Module 1 */}
                <div
                  className="vvm-module-card"
                  onClick={() => onOpenVvm('heritage')}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpenVvm('heritage')}
                  title="Explore Module 1: Indian Contributions to Science"
                >
                  <div className="vvm-mod-top">
                    <span className="vvm-mod-badge">20% Weightage</span>
                    <span className="vvm-mod-sec">Section A Qualifier</span>
                  </div>
                  <h4 className="vvm-mod-title">Module 1: Indian Contributions to Science</h4>
                  <p className="vvm-mod-summary">Discover India&apos;s scientific breakthroughs from ancient times to modern era.</p>
                  <ul className="vvm-mod-bullets">
                    <li><strong>Mathematics &amp; Astronomy:</strong> Baudhāyana Śulba geometry, Āryabhaṭa planetary models, Brahmagupta zero rules.</li>
                    <li><strong>Metallurgy &amp; Chemistry:</strong> Rust-resistant Delhi iron pillar, Zawar zinc distillation, Rasashastra.</li>
                    <li><strong>Ayurveda &amp; Ecology:</strong> Suśruta surgical tools, Caraka holistic health, traditional water harvesting.</li>
                  </ul>
                  <div className="vvm-mod-activity">
                    <strong>Play Activity:</strong> Timeline Matcher &amp; Artifact Explorer — Connect ancient texts to modern scientific laws.
                  </div>
                </div>

                {/* Module 2 */}
                <div
                  className="vvm-module-card"
                  onClick={() => onOpenVvm('scientists')}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpenVvm('scientists')}
                  title="Explore Module 2: Tri-Shakti Scientist Biographies"
                >
                  <div className="vvm-mod-top">
                    <span className="vvm-mod-badge">20% Weightage</span>
                    <span className="vvm-mod-sec">Section A Qualifier</span>
                  </div>
                  <h4 className="vvm-mod-title">Module 2: Tri-Shakti Scientist Biographies</h4>
                  <p className="vvm-mod-summary">Life journeys &amp; milestones of the 3 featured Indian women scientists for VVM 2026–27:</p>
                  <ul className="vvm-mod-bullets">
                    <li><strong>Anna Mani (Weather Woman of India):</strong> Meteorological instruments, ozone ozonesonde &amp; solar radiation.</li>
                    <li><strong>Asima Chatterjee:</strong> Organic chemistry, medicinal plants, anti-epileptic Ayush-56 &amp; anti-malarials.</li>
                    <li><strong>Rohini Godbole:</strong> Theoretical particle physics, CERN LHC Higgs boson research, Women in STEM.</li>
                  </ul>
                  <div className="vvm-mod-activity">
                    <strong>Play Activity:</strong> Scientist Story Cards &amp; Fact-Flash Quizzes — Master key dates, institutes &amp; discoveries.
                  </div>
                </div>

                {/* Module 3 */}
                <div
                  className="vvm-module-card"
                  onClick={() => onOpenVvm('ncert')}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpenVvm('ncert')}
                  title="Explore Module 3: NCERT Science & Maths Booster"
                >
                  <div className="vvm-mod-top">
                    <span className="vvm-mod-badge">50% Weightage</span>
                    <span className="vvm-mod-sec">Section B Core</span>
                  </div>
                  <h4 className="vvm-mod-title">Module 3: NCERT Science &amp; Maths Booster</h4>
                  <p className="vvm-mod-summary">Class-specific concept refreshers aligned strictly with NCERT Physics, Chemistry, Biology &amp; Maths.</p>
                  <ul className="vvm-mod-bullets">
                    <li><strong>Junior Group (Classes 6–8):</strong> Motion, light, electricity, substance separation, cell biology &amp; numbers.</li>
                    <li><strong>Senior Group (Classes 9–11):</strong> Atoms &amp; molecules, laws of motion, life processes, organic chemistry &amp; PCM/PCB.</li>
                  </ul>
                  <div className="vvm-mod-activity">
                    <strong>Play Activity:</strong> Vijñāna Lab Simulations — Test formulas &amp; visualise science concepts before attempting MCQs.
                  </div>
                </div>

                {/* Module 4 */}
                <div
                  className="vvm-module-card"
                  onClick={() => onOpenVvm('logic')}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpenVvm('logic')}
                  title="Explore Module 4: Logic & Mental Aptitude"
                >
                  <div className="vvm-mod-top">
                    <span className="vvm-mod-badge">10% Weightage</span>
                    <span className="vvm-mod-sec">Section B Core</span>
                  </div>
                  <h4 className="vvm-mod-title">Module 4: Logic &amp; Mental Aptitude</h4>
                  <p className="vvm-mod-summary">Sharpen analytical deduction, mathematical aptitude &amp; pattern recognition without rote learning.</p>
                  <ul className="vvm-mod-bullets">
                    <li><strong>Key Skills:</strong> Number &amp; alphabet series, cryptarithmetic, mirror &amp; water images, direction sense.</li>
                    <li><strong>Data Reasoning:</strong> Venn diagrams, syllogisms, sequence puzzles &amp; scientific temper problem sets.</li>
                  </ul>
                  <div className="vvm-mod-activity">
                    <strong>Play Activity:</strong> Interactive Reasoning Drills — Fast deduction challenges with timer &amp; digital-root checks.
                  </div>
                </div>
              </div>
            )}

            {/* View B: The 30-Question Blueprint Table */}
            {activeLeftView === 'blueprint' && (
              <div className="vvm-blueprint-panel">
                <div className="vvm-bp-table-wrap">
                  <table className="vvm-bp-table">
                    <thead>
                      <tr>
                        <th>Mock Section</th>
                        <th>Topic Area</th>
                        <th>Questions</th>
                        <th>Marks</th>
                        <th>Negative Marking</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>Part A (Qualifier)</strong></td>
                        <td>Indian Contributions to Science</td>
                        <td>6 Qs</td>
                        <td>24 Marks</td>
                        <td>None (0)</td>
                      </tr>
                      <tr>
                        <td><strong>Part A (Qualifier)</strong></td>
                        <td>Tri-Shakti Biographies (Mani, Chatterjee, Godbole)</td>
                        <td>6 Qs</td>
                        <td>24 Marks</td>
                        <td>None (0)</td>
                      </tr>
                      <tr>
                        <td><strong>Part B (Core)</strong></td>
                        <td>NCERT Science &amp; Mathematics (Class-Specific)</td>
                        <td>15 Qs</td>
                        <td>60 Marks</td>
                        <td>-1 Mark per wrong</td>
                      </tr>
                      <tr>
                        <td><strong>Part B (Core)</strong></td>
                        <td>Logic &amp; Reasoning</td>
                        <td>3 Qs</td>
                        <td>12 Marks</td>
                        <td>-1 Mark per wrong</td>
                      </tr>
                      <tr className="total-row">
                        <td><strong>Total Exam</strong></td>
                        <td>Full 30-Minute Mini-Mock</td>
                        <td><strong>30 Qs</strong></td>
                        <td><strong>120 Marks</strong></td>
                        <td>Section A: 0 · Section B: -1</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="vvm-bp-rule-box">
                  <strong>Official Qualifier Rule (Section A Cutoff):</strong>
                  Part B is evaluated ONLY if a candidate scores ≥ 50% in Part A (at least 24 out of 48 marks across Indian Contributions and Tri-Shakti Biographies). Mastering Section A is the essential prerequisite for national rank qualification!
                </div>
              </div>
            )}
          </div>

          {/* Right Column: 4 Sample Questions Quiz Teaser */}
          <div className="vvm-col-right">
            <div className="vvm-quiz-header">
              <span className="vvm-quiz-kicker">Sample Questions for 30-Q Mock Preview</span>
              <span className="vvm-quiz-weightage">{currentQ.weightage}</span>
            </div>

            {/* 4 Question Selector Tabs */}
            <div className="vvm-quiz-nav" role="tablist" aria-label="Sample VVM Preview Questions">
              {SAMPLE_VVM_QUESTIONS.map((q, idx) => (
                <button
                  key={q.id}
                  type="button"
                  className={`vvm-quiz-nav-btn${activeQIndex === idx ? ' active' : ''}`}
                  onClick={() => setActiveQIndex(idx)}
                  role="tab"
                  aria-selected={activeQIndex === idx}
                >
                  {q.label}
                </button>
              ))}
            </div>

            {/* Question Category & Text */}
            <div className="vvm-question-category">{currentQ.category}</div>
            <p className="vvm-question-text">{currentQ.question}</p>

            {/* Options List */}
            <div className="vvm-options-list" role="radiogroup" aria-label="Question Options">
              {currentQ.options.map((opt, optIdx) => {
                let optClass = 'vvm-option-btn';
                if (isAnswered) {
                  if (optIdx === currentQ.correctIndex) {
                    optClass += ' correct';
                  } else if (optIdx === selectedOption) {
                    optClass += ' incorrect';
                  }
                }
                const letter = String.fromCharCode(65 + optIdx);

                return (
                  <button
                    key={optIdx}
                    type="button"
                    className={optClass}
                    onClick={() => handleSelectOption(optIdx)}
                    disabled={isAnswered}
                    role="radio"
                    aria-checked={selectedOption === optIdx}
                  >
                    <span className="vvm-option-letter">{letter}</span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Feedback & In-Depth Explanation */}
            {isAnswered && (
              <div className={`vvm-feedback-box ${isCorrect ? 'correct' : 'incorrect'}`}>
                <div className="vvm-feedback-title">
                  {isCorrect ? (
                    <span>Correct Answer · Verified VVM Concept</span>
                  ) : (
                    <span>Concept Review · Key Learning Point</span>
                  )}
                </div>
                <p className="vvm-feedback-text">{currentQ.explanation}</p>
              </div>
            )}
          </div>
        </div>

        {/* ------------------------------------------------------------------
            Bottom Action Bar (CTAs)
            ------------------------------------------------------------------ */}
        <div className="vvm-cta-row">
          <button
            type="button"
            className="vvm-btn-primary"
            onClick={() => onOpenVvm('quiz')}
            title="Launch the Full 30-Question Timed VVM Mock Exam"
          >
            Start 30-Question VVM Mock Test ➔
          </button>
          <button
            type="button"
            className="vvm-btn-secondary"
            onClick={() => onOpenVvm('blueprint')}
            title="Open Detailed Examination Blueprint and Weightage"
          >
            Syllabus Blueprint &amp; Marks Split
          </button>
          <button
            type="button"
            className="vvm-btn-secondary"
            onClick={() => onOpenVvm('heritage')}
            title="Open Module 1 Notes on Indian Contributions to Science"
          >
            Indian Contributions to Science Notes
          </button>
          <button
            type="button"
            className="vvm-btn-secondary"
            onClick={() => onOpenVvm('scientists')}
            title="Open Module 2 Notes on Tri-Shakti Women Scientists"
          >
            Tri-Shakti Biographies (Mani, Chatterjee, Godbole)
          </button>
        </div>
      </div>
    </div>
  );
};

export default VvmPathwayCard;
