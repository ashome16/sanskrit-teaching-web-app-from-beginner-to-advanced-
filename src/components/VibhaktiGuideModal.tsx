import React, { useEffect, useState } from 'react';
import { VIBHAKTI_CASES, BALAKA_VIBHAKTI_DATA } from '../data/vibhakti';
import '../styles/vibhakti-guide.css';

interface VibhaktiGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VibhaktiGuideModal: React.FC<VibhaktiGuideModalProps> = ({ isOpen, onClose }) => {
  const [selectedCase, setSelectedCase] = useState(1);
  const [nounMode, setNounMode] = useState<'balaka' | 'rama'>('balaka');

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
          The 8 noun cases (Vibhakti) of Sanskrit, at a glance.
        </p>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          <button
            type="button"
            style={{
              padding: '0.35rem 0.75rem',
              borderRadius: '8px',
              border: nounMode === 'balaka' ? '1.5px solid #059669' : '1px solid #d1d5db',
              background: nounMode === 'balaka' ? '#ecfdf5' : '#f9fafb',
              color: nounMode === 'balaka' ? '#065f46' : '#4b5563',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
            }}
            onClick={() => setNounMode('balaka')}
          >
            🌟 बालक (Bālaka)
          </button>
          <button
            type="button"
            style={{
              padding: '0.35rem 0.75rem',
              borderRadius: '8px',
              border: nounMode === 'rama' ? '1.5px solid #059669' : '1px solid #d1d5db',
              background: nounMode === 'rama' ? '#ecfdf5' : '#f9fafb',
              color: nounMode === 'rama' ? '#065f46' : '#4b5563',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
            }}
            onClick={() => setNounMode('rama')}
          >
            🕉️ राम (Rāma)
          </button>
        </div>

        <ul className="vibhakti-case-list">
          {nounMode === 'balaka'
            ? BALAKA_VIBHAKTI_DATA.map((item) => (
                <li
                  key={item.number}
                  className={`vibhakti-case-row${selectedCase === item.number ? ' selected' : ''}`}
                  onClick={() => setSelectedCase(item.number)}
                >
                  <span className="vibhakti-case-number">{item.number}</span>
                  <div className="vibhakti-case-text">
                    <span className="vibhakti-case-name">
                      {item.sanskrit} ({item.iast})
                    </span>
                    <span className="vibhakti-case-role">{item.roleSanskrit} — {item.role}</span>
                    <span className="vibhakti-case-description">
                      Indicator: <strong>{item.englishIndicator}</strong> · Suffix: <code>{item.singularSuffixDeva} ({item.singularSuffixIast})</code>
                    </span>
                  </div>
                  {selectedCase === item.number && (
                    <div className="vibhakti-case-example">
                      <strong>{item.exampleWord}</strong>
                      <span>{item.sentence} ({item.sentenceMeaning})</span>
                    </div>
                  )}
                </li>
              ))
            : VIBHAKTI_CASES.map((item) => (
                <li
                  key={item.number}
                  className={`vibhakti-case-row${selectedCase === item.number ? ' selected' : ''}`}
                  onClick={() => setSelectedCase(item.number)}
                >
                  <span className="vibhakti-case-number">{item.number}</span>
                  <div className="vibhakti-case-text">
                    <span className="vibhakti-case-name">
                      {item.sanskrit} ({item.iast})
                    </span>
                    <span className="vibhakti-case-role">{item.role}</span>
                    <span className="vibhakti-case-description">{item.description}</span>
                  </div>
                  {selectedCase === item.number && (
                    <div className="vibhakti-case-example">
                      <strong>{item.form}</strong>
                      <span>{item.template}</span>
                    </div>
                  )}
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
};

export default VibhaktiGuideModal;