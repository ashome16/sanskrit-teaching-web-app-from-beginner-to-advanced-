import React, { useEffect, useState } from 'react';
import { VIBHAKTI_CASES } from '../data/vibhakti';
import '../styles/vibhakti-guide.css';

interface VibhaktiGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VibhaktiGuideModal: React.FC<VibhaktiGuideModalProps> = ({ isOpen, onClose }) => {
  const [selectedCase, setSelectedCase] = useState(1);
  // Escape key closes the guide, same as clicking the backdrop or the close button.
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="vibhakti-modal-overlay"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="vibhakti-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="vibhakti-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="vibhakti-modal-header">
          <h2 id="vibhakti-modal-title">Vibhakti / Case Helper Guide</h2>
          <button
            type="button"
            className="vibhakti-modal-close"
            onClick={onClose}
            aria-label="Close Vibhakti Guide"
          >
            ✕
          </button>
        </header>

        <p className="vibhakti-modal-subtitle">
          The 7 noun cases (Vibhakti) of Sanskrit, at a glance.
        </p>

        <ul className="vibhakti-case-list">
          {VIBHAKTI_CASES.map((item) => (
            <li key={item.number} className={`vibhakti-case-row${selectedCase === item.number ? ' selected' : ''}`} onClick={() => setSelectedCase(item.number)}>
              <span className="vibhakti-case-number">{item.number}</span>
              <div className="vibhakti-case-text">
                <span className="vibhakti-case-name">
                  {item.sanskrit} ({item.iast})
                </span>
                <span className="vibhakti-case-role">{item.role}</span>
                <span className="vibhakti-case-description">{item.description}</span>
              </div>
              {selectedCase === item.number && <div className="vibhakti-case-example"><strong>{item.form}</strong><span>{item.template}</span></div>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VibhaktiGuideModal;
