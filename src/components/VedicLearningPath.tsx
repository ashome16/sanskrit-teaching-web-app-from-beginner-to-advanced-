import React from 'react';
import { VEDIC_LEARNING_PATH, type VedicPathStep } from '../data/vedicLearningPath';
import '../styles/vedic-learning-path.css';

interface VedicLearningPathProps {
  heading: React.ReactNode;
  intro?: React.ReactNode;
  /** Called on a plain left-click; the href (/vedic-maths#anchor) is the fallback. */
  onOpen: (anchor: string, event: React.MouseEvent<HTMLAnchorElement>) => void;
  id?: string;
}

const isPlainClick = (e: React.MouseEvent) => !(e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0);

/** Numbered Numbers → Vedic Maths path, rendered from the shared VEDIC_LEARNING_PATH list. */
export const VedicLearningPath: React.FC<VedicLearningPathProps> = ({ heading, intro, onOpen, id }) => {
  const total = VEDIC_LEARNING_PATH.length;
  const handle = (anchor: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isPlainClick(e)) return;
    onOpen(anchor, e);
  };
  return (
    <nav className="vpath" aria-label="Numbers to Vedic Maths learning path" id={id}>
      <h3 className="vpath-title">{heading}</h3>
      {intro && <p className="vpath-intro">{intro}</p>}
      <ol className="vpath-steps">
        {VEDIC_LEARNING_PATH.map((step: VedicPathStep, idx) => (
          <li key={step.anchor} className="vpath-step">
            <span className="vpath-step-num" aria-hidden="true">{idx + 1}</span>
            <div className="vpath-step-body">
              <a
                className="vpath-step-link"
                href={`/vedic-maths#${step.anchor}`}
                data-vpath-anchor={step.anchor}
                onClick={handle(step.anchor)}
              >
                <span className="vpath-step-label">Step {idx + 1} of {total}</span>
                <strong className="vpath-step-title">{step.title}</strong>
                <span className="vpath-step-sa">{step.sanskrit}</span>
              </a>
              <p className="vpath-step-learn">
                <span className="vpath-step-learn-label">What you’ll learn:</span> {step.learn}
              </p>
              {step.solver && (
                <a
                  className="vpath-step-try"
                  href={`/vedic-maths#solver-${step.solver}`}
                  data-vpath-anchor={`solver-${step.solver}`}
                  onClick={handle(`solver-${step.solver}`)}
                >
                  ▶ Try the interactive solver
                </a>
              )}
            </div>
            {idx < total - 1 && <span className="vpath-arrow" aria-hidden="true">↓</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default VedicLearningPath;
