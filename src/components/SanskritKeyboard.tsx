import React, { useState } from 'react';
import {
  SANSKRIT_KEYBOARD_LAYOUT,
  SANSKRIT_QUICK_PHRASES,
} from '../utils/sanskritTransliteration';
import '../styles/sanskrit-keyboard.css';

export interface SanskritKeyboardProps {
  onKeyPress: (char: string) => void;
  onBackspace: () => void;
  onClear: () => void;
  onClose?: () => void;
  isPhoneticActive?: boolean;
  onTogglePhonetic?: () => void;
}

export const SanskritKeyboard: React.FC<SanskritKeyboardProps> = ({
  onKeyPress,
  onBackspace,
  onClear,
  onClose,
  isPhoneticActive,
  onTogglePhonetic,
}) => {
  const [activeTab, setActiveTab] = useState<string>('swara');

  const currentCategory =
    SANSKRIT_KEYBOARD_LAYOUT.find((cat) => cat.id === activeTab) ||
    SANSKRIT_KEYBOARD_LAYOUT[0];

  return (
    <div className="skb-container" role="region" aria-label="Sanskrit Virtual Keyboard">
      {/* Header bar */}
      <div className="skb-header">
        <div className="skb-title">
          <span>⌨️</span>
          <span>संस्कृत-कुञ्चिका · Sanskrit Virtual Keyboard</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          {onTogglePhonetic && (
            <button
              type="button"
              className={`sanskrit-tool-btn${isPhoneticActive ? ' sanskrit-tool-btn--active' : ''}`}
              onClick={onTogglePhonetic}
              title="Phonetic typing converts English keys into Devanagari (e.g. namaste -> नमस्ते)"
            >
              <span>🔤</span>
              <span>{isPhoneticActive ? 'Phonetic: ON' : 'Phonetic: OFF'}</span>
            </button>
          )}
          {onClose && (
            <button
              type="button"
              className="skb-close-btn"
              onClick={onClose}
              title="Close Keyboard"
              aria-label="Close Sanskrit Keyboard"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="skb-tabs-row" role="tablist">
        {SANSKRIT_KEYBOARD_LAYOUT.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={`skb-tab-btn${activeTab === cat.id ? ' skb-tab-btn--active' : ''}`}
            onClick={() => setActiveTab(cat.id)}
            role="tab"
            aria-selected={activeTab === cat.id}
          >
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Keys Grid */}
      <div className="skb-keys-grid">
        {currentCategory.keys.map((keyChar, idx) => {
          const isMatra = currentCategory.id === 'matra';
          const isSpecial = ['्', 'ं', 'ः', 'ँ', 'ऽ', '।', '॥'].includes(keyChar);
          let keyClass = 'skb-key';
          if (isMatra) keyClass += ' skb-key--matra';
          if (isSpecial) keyClass += ' skb-key--special';

          return (
            <button
              key={`${keyChar}-${idx}`}
              type="button"
              className={keyClass}
              onClick={() => onKeyPress(keyChar)}
              title={`Type ${keyChar}`}
            >
              {keyChar}
            </button>
          );
        })}
      </div>

      {/* Actions Row */}
      <div className="skb-actions-row">
        <button
          type="button"
          className="skb-action-key"
          onClick={() => onKeyPress('्')}
          title="हलन्त (Virama) - creates conjunct / half letter"
        >
          <span>् हलन्त</span>
        </button>
        <button
          type="button"
          className="skb-action-key"
          onClick={() => onKeyPress('ं')}
          title="अनुस्वार (Anusvara)"
        >
          <span>ं अनुस्वार</span>
        </button>
        <button
          type="button"
          className="skb-action-key"
          onClick={() => onKeyPress('ः')}
          title="विसर्ग (Visarga)"
        >
          <span>ः विसर्ग</span>
        </button>
        <button
          type="button"
          className="skb-action-key skb-action-key--space"
          onClick={() => onKeyPress(' ')}
          title="Space"
        >
          <span>␣ Space</span>
        </button>
        <button
          type="button"
          className="skb-action-key"
          onClick={onBackspace}
          title="Backspace"
        >
          <span>⌫ Backspace</span>
        </button>
        <button
          type="button"
          className="skb-action-key"
          onClick={onClear}
          title="Clear entire text"
        >
          <span>🗑️ Clear</span>
        </button>
      </div>

      {/* Quick Phrases */}
      <div className="skb-quick-row">
        <span style={{ fontSize: '0.7rem', color: '#8a7f72', fontWeight: 700, paddingRight: '0.2rem', whiteSpace: 'nowrap' }}>
          Quick:
        </span>
        {SANSKRIT_QUICK_PHRASES.map((qp) => (
          <button
            key={qp.dev}
            type="button"
            className="skb-quick-chip"
            onClick={() => {
              for (const ch of qp.dev) {
                onKeyPress(ch);
              }
            }}
            title={qp.en}
          >
            {qp.dev}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SanskritKeyboard;
