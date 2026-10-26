import React, { useState, useEffect, useRef } from 'react';
import { useAccessibilityStore, type FontSizeScale } from '../utils/accessibilityStore';

export const AccessibilityToolbar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const {
    fontSize,
    highContrast,
    englishFirst,
    reduceMotion,
    readingLineHeight,
    setFontSize,
    increaseFontSize,
    decreaseFontSize,
    toggleHighContrast,
    toggleEnglishFirst,
    toggleReduceMotion,
    toggleReadingLineHeight,
    resetAll,
  } = useAccessibilityStore();

  // Global keyboard shortcuts (Alt+A for modal, Alt+E for englishFirst, Alt+C for highContrast)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in form inputs
      const tag = (e.target as HTMLElement)?.tagName;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) return;

      if (e.altKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        setIsModalOpen((prev) => !prev);
      } else if (e.altKey && (e.key === 'e' || e.key === 'E')) {
        e.preventDefault();
        toggleEnglishFirst();
      } else if (e.altKey && (e.key === 'c' || e.key === 'C')) {
        e.preventDefault();
        toggleHighContrast();
      } else if (e.key === 'Escape' && isModalOpen) {
        e.preventDefault();
        setIsModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, toggleEnglishFirst, toggleHighContrast]);

  // Focus management when modal opens
  useEffect(() => {
    if (isModalOpen) {
      setTimeout(() => {
        closeBtnRef.current?.focus();
      }, 50);
    }
  }, [isModalOpen]);

  const fontSizeLabels: Record<FontSizeScale, string> = {
    normal: '100%',
    large: '115%',
    xlarge: '130%',
  };

  return (
    <>
      {/* Quick Toolbar in Header */}
      <div className="a11y-toolbar-wrap" role="group" aria-label="Accessibility and display settings">
        {/* Font scaler quick buttons */}
        <button
          type="button"
          className="a11y-quick-btn"
          onClick={decreaseFontSize}
          disabled={fontSize === 'normal'}
          title="Decrease font size"
          aria-label="Decrease text size"
          style={{ opacity: fontSize === 'normal' ? 0.45 : 1 }}
        >
          <span style={{ fontSize: '0.72rem', fontWeight: 800 }}>A-</span>
        </button>
        <span
          style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', minWidth: '32px', textAlign: 'center' }}
          aria-label={`Current font scale is ${fontSizeLabels[fontSize]}`}
        >
          {fontSizeLabels[fontSize]}
        </span>
        <button
          type="button"
          className="a11y-quick-btn"
          onClick={increaseFontSize}
          disabled={fontSize === 'xlarge'}
          title="Increase font size"
          aria-label="Increase text size"
          style={{ opacity: fontSize === 'xlarge' ? 0.45 : 1 }}
        >
          <span style={{ fontSize: '0.86rem', fontWeight: 800 }}>A+</span>
        </button>

        {/* English-First Mode quick toggle */}
        <button
          type="button"
          className={`a11y-quick-btn${englishFirst ? ' active' : ''}`}
          onClick={toggleEnglishFirst}
          title="Toggle English-First Mode for parents & beginners (Shortcut: Alt+E)"
          aria-label={`English-First Mode is ${englishFirst ? 'Enabled' : 'Disabled'}. Press to toggle.`}
          aria-pressed={englishFirst}
        >
          <span aria-hidden="true">🌐</span>
          <span>English-First</span>
          {englishFirst && <span className="a11y-badge">ON</span>}
        </button>

        {/* High-Contrast Mode quick toggle */}
        <button
          type="button"
          className={`a11y-quick-btn a11y-quick-btn--contrast${highContrast ? ' active' : ''}`}
          onClick={toggleHighContrast}
          title="Toggle High Contrast Mode WCAG AAA (Shortcut: Alt+C)"
          aria-label={`High Contrast Mode is ${highContrast ? 'Enabled' : 'Disabled'}. Press to toggle.`}
          aria-pressed={highContrast}
        >
          <span aria-hidden="true">🌓</span>
          <span className="sr-only">High Contrast</span>
          {highContrast && <span className="a11y-badge">AAA</span>}
        </button>

        {/* Open Comprehensive Settings Dialog */}
        <button
          type="button"
          className="a11y-quick-btn"
          onClick={() => setIsModalOpen(true)}
          title="Open Display & Accessibility Options (Shortcut: Alt+A)"
          aria-label="Open Display and Accessibility settings dialog"
          aria-haspopup="dialog"
          aria-expanded={isModalOpen}
        >
          <span aria-hidden="true">♿</span>
          <span>Display</span>
        </button>
      </div>

      {/* Comprehensive Accessibility & Display Modal Dialog */}
      {isModalOpen && (
        <div
          className="a11y-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="a11y-modal-heading"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <div className="a11y-modal-dialog" ref={modalRef}>
            <div className="a11y-modal-header">
              <h2 id="a11y-modal-heading" className="a11y-modal-title">
                <span aria-hidden="true">♿</span>
                <span>Display &amp; Accessibility Options</span>
              </h2>
              <button
                ref={closeBtnRef}
                type="button"
                className="a11y-modal-close-btn"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close accessibility settings"
              >
                ✕
              </button>
            </div>

            <div className="a11y-modal-body">
              {/* English-First Mode Setting */}
              <div className="a11y-setting-card">
                <div className="a11y-setting-header">
                  <div className="a11y-setting-info">
                    <span className="a11y-setting-title">
                      <span aria-hidden="true">🌐</span>
                      <span>English-First Mode (Parents &amp; Beginners)</span>
                    </span>
                    <p className="a11y-setting-desc">
                      Prioritizes English titles, everyday descriptions, and layman glosses first, keeping Devanagari script as secondary subtitles. Ideal for school parents assisting students and adult beginners.
                    </p>
                  </div>
                  <label className="a11y-switch" aria-label="Toggle English-First Mode">
                    <input
                      type="checkbox"
                      checked={englishFirst}
                      onChange={toggleEnglishFirst}
                    />
                    <span className="a11y-slider" />
                  </label>
                </div>
              </div>

              {/* High Contrast Mode Setting */}
              <div className="a11y-setting-card">
                <div className="a11y-setting-header">
                  <div className="a11y-setting-info">
                    <span className="a11y-setting-title">
                      <span aria-hidden="true">🌓</span>
                      <span>High Contrast Mode (WCAG AAA)</span>
                    </span>
                    <p className="a11y-setting-desc">
                      Replaces soft background grays with crisp pure white, sharpens body text to solid ink-black, adds 2px high-visibility borders, underlines all hyperlinks, and adds vibrant focus rings.
                    </p>
                  </div>
                  <label className="a11y-switch" aria-label="Toggle High Contrast Mode">
                    <input
                      type="checkbox"
                      checked={highContrast}
                      onChange={toggleHighContrast}
                    />
                    <span className="a11y-slider" />
                  </label>
                </div>
              </div>

              {/* Font Size Scaling Setting */}
              <div className="a11y-setting-card">
                <div className="a11y-setting-info">
                  <span className="a11y-setting-title">
                    <span aria-hidden="true">🔤</span>
                    <span>Text &amp; UI Font Size Scale</span>
                  </span>
                  <p className="a11y-setting-desc">
                    Scale up typography across reader lessons, grammatical tables, and puzzle boards.
                  </p>
                </div>
                <div className="a11y-options-group" role="group" aria-label="Choose font size">
                  {(['normal', 'large', 'xlarge'] as FontSizeScale[]).map((scale) => (
                    <button
                      key={scale}
                      type="button"
                      className={`a11y-option-btn${fontSize === scale ? ' active' : ''}`}
                      onClick={() => setFontSize(scale)}
                      aria-pressed={fontSize === scale}
                    >
                      {scale === 'normal' && '100% · Normal'}
                      {scale === 'large' && '115% · Large'}
                      {scale === 'xlarge' && '130% · Extra Large'}
                    </button>
                  ))}
                </div>
                <div
                  style={{
                    padding: '0.65rem 0.85rem',
                    background: '#f8fafc',
                    borderRadius: '8px',
                    border: '1px dashed #cbd5e1',
                    fontSize: fontSize === 'xlarge' ? '1.15rem' : fontSize === 'large' ? '1.02rem' : '0.9rem',
                    color: '#334155',
                  }}
                >
                  <strong>Preview:</strong> विद्या ददाति विनयं विनयाद्याति पात्रताम् ।
                  <div style={{ fontSize: '0.82em', color: '#64748b' }}>
                    <em>Knowledge bestows humility; from humility comes worthiness.</em>
                  </div>
                </div>
              </div>

              {/* Reading Spacing & Line Height */}
              <div className="a11y-setting-card">
                <div className="a11y-setting-header">
                  <div className="a11y-setting-info">
                    <span className="a11y-setting-title">
                      <span aria-hidden="true">📖</span>
                      <span>Relaxed Reading Line Height</span>
                    </span>
                    <p className="a11y-setting-desc">
                      Expands line spacing and word gaps to reduce visual crowding in dense commentary and grammar rules.
                    </p>
                  </div>
                  <label className="a11y-switch" aria-label="Toggle Relaxed Line Height">
                    <input
                      type="checkbox"
                      checked={readingLineHeight === 'relaxed'}
                      onChange={toggleReadingLineHeight}
                    />
                    <span className="a11y-slider" />
                  </label>
                </div>
              </div>

              {/* Reduced Motion Setting */}
              <div className="a11y-setting-card">
                <div className="a11y-setting-header">
                  <div className="a11y-setting-info">
                    <span className="a11y-setting-title">
                      <span aria-hidden="true">🎬</span>
                      <span>Reduced Motion &amp; Transitions</span>
                    </span>
                    <p className="a11y-setting-desc">
                      Disables rotating crest animations, 3D card tilt effects, and rapid transitions.
                    </p>
                  </div>
                  <label className="a11y-switch" aria-label="Toggle Reduced Motion">
                    <input
                      type="checkbox"
                      checked={reduceMotion}
                      onChange={toggleReduceMotion}
                    />
                    <span className="a11y-slider" />
                  </label>
                </div>
              </div>

              {/* Keyboard Navigation Shortcuts Reference */}
              <div className="a11y-setting-card" style={{ background: '#f8fafc' }}>
                <span className="a11y-setting-title" style={{ marginBottom: '0.4rem' }}>
                  <span aria-hidden="true">⌨️</span>
                  <span>Keyboard Navigation Shortcuts</span>
                </span>
                <table className="a11y-shortcuts-table">
                  <tbody>
                    <tr>
                      <td><kbd className="a11y-kbd">Tab</kbd> / <kbd className="a11y-kbd">Shift+Tab</kbd></td>
                      <td>Navigate between links, buttons, and puzzle tiles</td>
                    </tr>
                    <tr>
                      <td><kbd className="a11y-kbd">Enter</kbd> / <kbd className="a11y-kbd">Space</kbd></td>
                      <td>Activate button or trigger audio pronunciation</td>
                    </tr>
                    <tr>
                      <td><kbd className="a11y-kbd">Alt + A</kbd> (or <kbd className="a11y-kbd">Option + A</kbd>)</td>
                      <td>Open this Display &amp; Accessibility Dialog</td>
                    </tr>
                    <tr>
                      <td><kbd className="a11y-kbd">Alt + E</kbd> (or <kbd className="a11y-kbd">Option + E</kbd>)</td>
                      <td>Quick toggle English-First Mode</td>
                    </tr>
                    <tr>
                      <td><kbd className="a11y-kbd">Alt + C</kbd> (or <kbd className="a11y-kbd">Option + C</kbd>)</td>
                      <td>Quick toggle High Contrast Mode</td>
                    </tr>
                    <tr>
                      <td><kbd className="a11y-kbd">/</kbd> or <kbd className="a11y-kbd">Ctrl/Cmd + K</kbd></td>
                      <td>Open Global Search modal</td>
                    </tr>
                    <tr>
                      <td><kbd className="a11y-kbd">Escape</kbd></td>
                      <td>Close any open modal, dialog, or popup</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="a11y-modal-footer">
              <button
                type="button"
                className="a11y-reset-btn"
                onClick={resetAll}
                title="Reset all accessibility settings to standard defaults"
              >
                Reset to Standard Defaults
              </button>
              <button
                type="button"
                className="a11y-done-btn"
                onClick={() => setIsModalOpen(false)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccessibilityToolbar;
