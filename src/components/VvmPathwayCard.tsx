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
    category: 'Indian Contributions to Science',
    weightage: '40% Exam Weightage',
    question: 'Which ancient Indian treatise contains the earliest geometric formulation relating the diagonal and sides of a rectangle (popularized later as the Pythagorean theorem)?',
    options: [
      'Baudhāyana Śulba Sūtras (c. 800 BCE)',
      'Caraka Saṃhitā (Ayurvedic Medicine)',
      'Arthaśāstra of Kauṭilya',
      'Nāṭyaśāstra of Bharata Muni',
    ],
    correctIndex: 0,
    explanation: 'Baudhāyana Śulba Sūtra (1.48) states: "The diagonal of a rectangle produces both areas which its length and breadth produce separately" — documented centuries before Greek geometry.',
  },
  {
    id: 2,
    label: 'Q2 · Biography',
    category: 'Eminent Indian Scientists',
    weightage: '40% Exam Weightage',
    question: 'Which experimental breakthrough earned Sir C.V. Raman the Nobel Prize in Physics in 1930?',
    options: [
      'Inelastic scattering of photons by molecules (Raman Effect)',
      'Discovery of cosmic ray cascades in the upper atmosphere',
      'Plant neuro-electrical response instrumentation',
      'Thermionic emission equations in vacuum tubes',
    ],
    correctIndex: 0,
    explanation: 'In 1928, Raman demonstrated that monochromatic light scattered by liquids shifts in frequency due to molecular vibrational energy transitions — honored annually on National Science Day (Feb 28).',
  },
  {
    id: 3,
    label: 'Q3 · NCERT Science',
    category: 'NCERT Curriculum (Classes 6–11)',
    weightage: '50% Exam Weightage',
    question: 'A concave mirror produces a real, inverted image of the exact same size as the object. Where must the object be located?',
    options: [
      'At the Centre of Curvature (C = 2f)',
      'At the Principal Focus (F)',
      'Between the Principal Focus and the Mirror Pole',
      'Beyond the Centre of Curvature at infinity',
    ],
    correctIndex: 0,
    explanation: 'When placed at C (radius R = 2f), incident rays reflect symmetrically across the principal axis to form a real, inverted image with magnification m = -1 at the exact same distance.',
  },
];

export const VvmPathwayCard: React.FC<VvmPathwayCardProps> = ({ onOpenVvm }) => {
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

      <div className="vvm-card-layout">
        {/* Left Column: National Talent Search Overview & 3 Pillars */}
        <div className="vvm-card-left">
          <div>
            <div className="vvm-badge-row">
              <span className="vvm-badge-primary">
                <svg viewBox="0 0 16 16" width="12" height="12" fill="none" aria-hidden="true">
                  <circle cx="8" cy="8" r="6" stroke="#5eead4" strokeWidth="1.4" />
                  <circle cx="8" cy="8" r="2" fill="#5eead4" />
                </svg>
                VIBHA · NCERT · NCSM Aligned
              </span>
              <span className="vvm-badge-secondary">Classes 6–11 (Junior &amp; Senior Tracks)</span>
              <span className="vvm-badge-secondary">Free National Exam Prep</span>
            </div>

            <p className="vvm-card-kicker">विद्यार्थी विज्ञान मंथन · National Talent Search</p>
            <h3 className="vvm-card-title">VVM 2026–27 Science &amp; Heritage Hub</h3>
            <p className="vvm-card-desc">
              India&apos;s premier national digital science talent examination. Master ancient Indian contributions to science, biographies of eminent Indian scientists, rigorous NCERT science, and analytical deduction.
            </p>
          </div>

          {/* The 3 Core Evaluation Pillars */}
          <div className="vvm-pillars-grid">
            <div
              className="vvm-pillar-card"
              onClick={() => onOpenVvm('heritage')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpenVvm('heritage')}
              title="Click to explore Indian Heritage &amp; Biographies"
            >
              <div className="vvm-pillar-tag">
                <span>Heritage &amp; Bio</span>
                <span className="vvm-pillar-tag-pct">40%</span>
              </div>
              <strong className="vvm-pillar-title">Indian Science &amp; Biographies</strong>
              <p className="vvm-pillar-desc">Kaṇāda, Āryabhaṭa, Suśruta, Baudhāyana, C.V. Raman, J.C. Bose &amp; Sarabhai</p>
            </div>

            <div
              className="vvm-pillar-card"
              onClick={() => onOpenVvm('ncert')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpenVvm('ncert')}
              title="Click to view NCERT Syllabus Breakdown"
            >
              <div className="vvm-pillar-tag">
                <span>NCERT Science</span>
                <span className="vvm-pillar-tag-pct">50%</span>
              </div>
              <strong className="vvm-pillar-title">Classes 6–11 Curriculum</strong>
              <p className="vvm-pillar-desc">Concept mastery across Physics, Chemistry, Biology &amp; Mathematics</p>
            </div>

            <div
              className="vvm-pillar-card"
              onClick={() => onOpenVvm('logic')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpenVvm('logic')}
              title="Click to practice Logical Reasoning"
            >
              <div className="vvm-pillar-tag">
                <span>Aptitude</span>
                <span className="vvm-pillar-tag-pct">10%</span>
              </div>
              <strong className="vvm-pillar-title">Logical &amp; Mental Reasoning</strong>
              <p className="vvm-pillar-desc">Deductive patterns, analytical problem-solving &amp; scientific temper</p>
            </div>
          </div>

          {/* Bottom Action CTAs */}
          <div className="vvm-cta-row">
            <button
              type="button"
              className="vvm-btn-primary"
              onClick={() => onOpenVvm('quiz')}
              title="Launch the 30-Question VVM Mock Exam"
            >
              Start 30-Question VVM Mock Test ➔
            </button>
            <button
              type="button"
              className="vvm-btn-secondary"
              onClick={() => onOpenVvm('blueprint')}
              title="View full examination syllabus blueprint"
            >
              Syllabus Blueprint &amp; Marks Split
            </button>
            <button
              type="button"
              className="vvm-btn-secondary"
              onClick={() => onOpenVvm('heritage')}
              title="Read Indian Science Pioneers study notes"
            >
              Indian Science Pioneers Notes
            </button>
          </div>
        </div>

        {/* Right Column: Interactive VVM Mock Question Teaser */}
        <div className="vvm-card-right">
          <div className="vvm-quiz-header">
            <span className="vvm-quiz-kicker">Sample VVM Challenge Question</span>
            <span className="vvm-quiz-weightage">{currentQ.weightage}</span>
          </div>

          {/* Switcher Navigation */}
          <div className="vvm-quiz-nav" role="tablist" aria-label="Sample VVM Questions">
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

          {/* Question Text */}
          <p className="vvm-question-text">{currentQ.question}</p>

          {/* Options */}
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

          {/* Feedback & Explanation */}
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
    </div>
  );
};

export default VvmPathwayCard;
