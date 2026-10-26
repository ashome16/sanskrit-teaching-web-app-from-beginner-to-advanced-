import React, { useState, useRef } from 'react';
import {
  transliterateToDevanagari,
  evaluateSanskritAnswer,
} from '../utils/sanskritTransliteration';
import { SanskritKeyboard } from './SanskritKeyboard';
import { playPronunciation } from '../utils/pronunciation';
import '../styles/sanskrit-keyboard.css';

export interface SanskritInputBoxProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  label?: string;
  expectedAnswer?: string;
  showCheckButton?: boolean;
  multiline?: boolean;
  rows?: number;
  className?: string;
  initialKeyboardOpen?: boolean;
  onCorrect?: () => void;
}

export const SanskritInputBox: React.FC<SanskritInputBoxProps> = ({
  value,
  onChange,
  placeholder = 'Type Sanskrit here (e.g. namaste -> नमस्ते) or open keyboard...',
  label,
  expectedAnswer,
  showCheckButton = false,
  multiline = false,
  rows = 2,
  className = '',
  initialKeyboardOpen = false,
  onCorrect,
}) => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(initialKeyboardOpen);
  const [isPhonetic, setIsPhonetic] = useState(true);
  const [checkResult, setCheckResult] = useState<{
    isMatch: boolean;
    similarityPct: number;
    feedback: string;
  } | null>(null);
  const [hasCopied, setHasCopied] = useState(false);

  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  // Handle typing inside text field with live phonetic transliteration
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const rawVal = e.target.value;
    if (isPhonetic) {
      const converted = transliterateToDevanagari(rawVal);
      onChange(converted);
    } else {
      onChange(rawVal);
    }
    if (checkResult) setCheckResult(null);
  };

  // Virtual keyboard key click
  const handleVirtualKeyPress = (char: string) => {
    const el = inputRef.current;
    if (!el) {
      onChange(value + char);
      return;
    }

    const start = el.selectionStart || value.length;
    const end = el.selectionEnd || value.length;
    const nextVal = value.substring(0, start) + char + value.substring(end);
    onChange(nextVal);

    // Reposition cursor right after inserted character
    setTimeout(() => {
      if (el) {
        el.focus();
        el.setSelectionRange(start + char.length, start + char.length);
      }
    }, 0);
  };

  // Virtual keyboard backspace
  const handleVirtualBackspace = () => {
    const el = inputRef.current;
    if (!el || value.length === 0) {
      onChange(value.slice(0, -1));
      return;
    }

    const start = el.selectionStart || value.length;
    const end = el.selectionEnd || value.length;

    if (start !== end) {
      const nextVal = value.substring(0, start) + value.substring(end);
      onChange(nextVal);
      setTimeout(() => {
        el.focus();
        el.setSelectionRange(start, start);
      }, 0);
    } else if (start > 0) {
      const nextVal = value.substring(0, start - 1) + value.substring(start);
      onChange(nextVal);
      setTimeout(() => {
        el.focus();
        el.setSelectionRange(start - 1, start - 1);
      }, 0);
    }
  };

  // Clear input
  const handleClear = () => {
    onChange('');
    setCheckResult(null);
    if (inputRef.current) inputRef.current.focus();
  };

  // Speak / Pronounce
  const handleListen = () => {
    if (!value.trim()) return;
    playPronunciation(value);
  };

  // Copy to clipboard
  const handleCopy = async () => {
    if (!value.trim()) return;
    try {
      await navigator.clipboard.writeText(value);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 1800);
    } catch {}
  };

  // Check against expected answer
  const handleCheck = () => {
    if (!expectedAnswer) return;
    const res = evaluateSanskritAnswer(value, expectedAnswer);
    setCheckResult(res);
    if (res.isMatch && onCorrect) {
      onCorrect();
    }
  };

  return (
    <div className={`sanskrit-input-container ${className}`}>
      {/* Header with tool buttons */}
      <div className="sanskrit-input-header">
        {label && (
          <span className="sanskrit-input-label">
            <span>✍️</span>
            <span>{label}</span>
          </span>
        )}

        <div className="sanskrit-input-tools">
          {/* Phonetic mode toggle */}
          <button
            type="button"
            className={`sanskrit-tool-btn${isPhonetic ? ' sanskrit-tool-btn--active' : ''}`}
            onClick={() => setIsPhonetic((prev) => !prev)}
            title={
              isPhonetic
                ? 'Phonetic English typing is ON (e.g. namaste -> नमस्ते). Click to turn OFF.'
                : 'Phonetic typing is OFF. Click to turn ON.'
            }
          >
            <span>🔤</span>
            <span>{isPhonetic ? 'Phonetic: ON' : 'Phonetic: OFF'}</span>
          </button>

          {/* Virtual Keyboard toggle */}
          <button
            type="button"
            className={`sanskrit-tool-btn${isKeyboardOpen ? ' sanskrit-tool-btn--active' : ''}`}
            onClick={() => setIsKeyboardOpen((prev) => !prev)}
            title="Toggle On-Screen Sanskrit Keyboard (संस्कृत-कुञ्चिका)"
          >
            <span>⌨️</span>
            <span>{isKeyboardOpen ? 'Hide Keyboard' : 'Sanskrit Keyboard'}</span>
          </button>

          {/* Pronounce */}
          {value.trim() && (
            <button
              type="button"
              className="sanskrit-tool-btn"
              onClick={handleListen}
              title="Listen to typed Sanskrit pronunciation"
              aria-label="Listen to Sanskrit pronunciation"
            >
              <span>🔊</span>
              <span>Listen</span>
            </button>
          )}

          {/* Copy */}
          {value.trim() && (
            <button
              type="button"
              className="sanskrit-tool-btn"
              onClick={handleCopy}
              title="Copy Sanskrit text to clipboard"
            >
              <span>{hasCopied ? '✓' : '📋'}</span>
              <span>{hasCopied ? 'Copied' : 'Copy'}</span>
            </button>
          )}

          {/* Clear */}
          {value.trim() && (
            <button
              type="button"
              className="sanskrit-tool-btn"
              onClick={handleClear}
              title="Clear text"
            >
              <span>✕</span>
            </button>
          )}

          {/* Check Answer Button */}
          {showCheckButton && expectedAnswer && (
            <button
              type="button"
              className="sanskrit-tool-btn"
              style={{ background: '#dcfce7', color: '#166534', borderColor: '#86efac' }}
              onClick={handleCheck}
              title="Check answer against expected solution"
            >
              <span>✓</span>
              <span>Check Answer</span>
            </button>
          )}
        </div>
      </div>

      {/* Input / Textarea Field */}
      <div className="sanskrit-input-wrapper">
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            className="sanskrit-text-field"
            value={value}
            onChange={handleInputChange}
            placeholder={placeholder}
            rows={rows}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            className="sanskrit-text-field"
            value={value}
            onChange={handleInputChange}
            placeholder={placeholder}
          />
        )}
      </div>

      {/* Hint helper */}
      {isPhonetic && (
        <span className="sanskrit-phonetic-badge">
          <span>💡 Type phonetically:</span>
          <code>namaste</code> ➔ <strong>नमस्ते</strong>,{' '}
          <code>raamaH</code> ➔ <strong>रामः</strong>,{' '}
          <code>gacchati</code> ➔ <strong>गच्छति</strong>
        </span>
      )}

      {/* Verification Result Feedback Strip */}
      {checkResult && (
        <div
          className={`sanskrit-feedback-strip ${
            checkResult.isMatch
              ? 'sanskrit-feedback-strip--match'
              : checkResult.similarityPct >= 60
              ? 'sanskrit-feedback-strip--partial'
              : 'sanskrit-feedback-strip--mismatch'
          }`}
        >
          <span>{checkResult.feedback}</span>
          {expectedAnswer && !checkResult.isMatch && (
            <span style={{ fontSize: '0.74rem', opacity: 0.9 }}>
              Expected: <strong>{expectedAnswer}</strong>
            </span>
          )}
        </div>
      )}

      {/* Virtual Sanskrit Keyboard */}
      {isKeyboardOpen && (
        <SanskritKeyboard
          onKeyPress={handleVirtualKeyPress}
          onBackspace={handleVirtualBackspace}
          onClear={handleClear}
          onClose={() => setIsKeyboardOpen(false)}
          isPhoneticActive={isPhonetic}
          onTogglePhonetic={() => setIsPhonetic((prev) => !prev)}
        />
      )}
    </div>
  );
};

export default SanskritInputBox;
