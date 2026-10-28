import React from 'react';
import type { MissionCardData } from './missionControlData';
import { soundEffects } from '../../utils/soundEffects';

interface ParentNotesModalProps {
  mission: MissionCardData;
  isOpen: boolean;
  onClose: () => void;
}

export const ParentNotesModal: React.FC<ParentNotesModalProps> = ({
  mission,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const notes = mission.parentNotes;

  return (
    <div className="vl-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="pnm-title">
      <div className="vl-parent-notes-card">
        {/* Header */}
        <div className="vl-pnm-header">
          <div className="vl-pnm-kicker">
            <span>📘</span> PARENT &amp; TEACHER CURRICULUM GUIDE
          </div>
          <h2 id="pnm-title" className="vl-pnm-title">
            {mission.kidTitle}
          </h2>
          <div className="vl-pnm-subtitle">
            <span>{mission.sanskritSubtitle}</span> · <span>{mission.subject}</span> · <span>{mission.ageRange}</span>
          </div>
        </div>

        <div className="vl-pnm-body">
          {/* Scientific Overview */}
          <section className="vl-pnm-section">
            <h3 className="vl-pnm-section-heading">🔬 Scientific &amp; Heritage Overview</h3>
            <p className="vl-pnm-text">{notes.overview}</p>
          </section>

          {/* Key Learning Outcomes */}
          <section className="vl-pnm-section">
            <h3 className="vl-pnm-section-heading">🎯 Key Learning Competencies</h3>
            <ul className="vl-pnm-list">
              {notes.learningOutcomes.map((outcome, idx) => (
                <li key={idx}>
                  <span className="vl-pnm-check">✓</span>
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* CBSE & NCERT Alignment */}
          <section className="vl-pnm-section">
            <h3 className="vl-pnm-section-heading">📜 Curriculum Alignment (CBSE &amp; NCERT)</h3>
            <div className="vl-pnm-cbse-grid">
              {notes.cbseLinks.map((link, idx) => (
                <div key={idx} className="vl-pnm-cbse-chip">
                  <span>🏛️</span>
                  <span>{link}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Home / Classroom Inquiry Prompt */}
          <section className="vl-pnm-section vl-pnm-section--prompt">
            <h3 className="vl-pnm-section-heading">💡 Home &amp; Classroom Inquiry Prompt</h3>
            <p className="vl-pnm-prompt-text">
              &ldquo;{notes.homeInquiryPrompt}&rdquo;
            </p>
          </section>
        </div>

        {/* Modal Footer */}
        <div className="vl-pnm-footer">
          <button
            type="button"
            className="vl-pnm-close-cta"
            onClick={() => {
              soundEffects.playStrokeChime();
              onClose();
            }}
          >
            Got it, Let&apos;s Play!
          </button>

          <button
            type="button"
            className="vl-pnm-x-btn"
            onClick={onClose}
            aria-label="Close parent notes"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};
