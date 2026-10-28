import React, { useState } from 'react';
import type { MissionCardData } from './missionControlData';
import { soundEffects } from '../../utils/soundEffects';
import { playPronunciation } from '../../utils/pronunciation';

interface ScienceSparkModalProps {
  mission: MissionCardData;
  isOpen: boolean;
  onClose: () => void;
  onNextMission?: () => void;
  onPlayAgain?: () => void;
  onReturnToDashboard?: () => void;
}

export const ScienceSparkModal: React.FC<ScienceSparkModalProps> = ({
  mission,
  isOpen,
  onClose,
  onNextMission,
  onPlayAgain,
  onReturnToDashboard,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  if (!isOpen) return null;

  const spark = mission.scienceSpark;

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === spark.correctOptionIndex) {
      soundEffects.playCelebrationChime();
    } else {
      soundEffects.playStrokeChime();
    }
  };

  const handlePronounce = async () => {
    setIsPlayingAudio(true);
    try {
      await playPronunciation(spark.audioText);
    } catch {
      // Fallback
    } finally {
      setIsPlayingAudio(false);
    }
  };

  return (
    <div className="vl-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="ssm-title">
      <div className="vl-spark-modal-card">
        {/* Celebration Header */}
        <div className="vl-smc-header" style={{ borderColor: mission.glow }}>
          <div className="vl-smc-stars-row" aria-label="3 Stars Earned">
            <span className="vl-smc-star vl-star--1">⭐</span>
            <span className="vl-smc-star vl-star--2">⭐</span>
            <span className="vl-smc-star vl-star--3">⭐</span>
          </div>
          <h2 id="ssm-title" className="vl-smc-title">
            MISSION COMPLETE!
          </h2>
          <p className="vl-smc-subtitle">
            You conquered <strong>{mission.kidTitle}</strong> ({mission.sanskritSubtitle})
          </p>
        </div>

        {/* Unlocked Badge Showcase */}
        <div className="vl-smc-badge-banner" style={{ background: mission.tint }}>
          <div className="vl-smc-badge-icon-wrap" style={{ borderColor: mission.glow }}>
            <span className="vl-smc-badge-big-icon">{mission.badgeIcon}</span>
          </div>
          <div className="vl-smc-badge-info">
            <span className="vl-smc-badge-pill">🏆 EXPLORER BADGE UNLOCKED</span>
            <h3 className="vl-smc-badge-name">{mission.badgeName}</h3>
            <span className="vl-smc-badge-sa" lang="sa">{mission.badgeSanskrit}</span>
          </div>
          <div className="vl-smc-vidya-reward">
            <span className="vl-smc-vidya-num">+3</span>
            <span className="vl-smc-vidya-label">VIDYĀ STARS</span>
          </div>
        </div>

        <div className="vl-smc-body">
          {/* 15-Second Science Spark */}
          <div className="vl-smc-spark-box">
            <div className="vl-smc-section-tag">
              <span>⚡</span> 15-SECOND SCIENCE SPARK // विज्ञान-स्फुलिङ्गः
            </div>
            <p className="vl-smc-takeaway">{spark.takeaway}</p>
          </div>

          {/* Sanskrit Science Word Discovery */}
          <div className="vl-smc-word-card">
            <div className="vl-smc-word-left">
              <span className="vl-smc-word-label">SANSKRIT SCIENCE WORD</span>
              <div className="vl-smc-word-sa" lang="sa">{spark.sanskritWord}</div>
              <div className="vl-smc-word-meaning">{spark.sanskritMeaning}</div>
            </div>
            <button
              type="button"
              className={`vl-smc-audio-btn ${isPlayingAudio ? 'is-playing' : ''}`}
              onClick={handlePronounce}
              title={`Listen to ${spark.audioText}`}
            >
              <span>{isPlayingAudio ? '🔊' : '🔉'}</span>
              <span>Listen</span>
            </button>
          </div>

          {/* Interactive Challenge Question */}
          <div className="vl-smc-quiz-box">
            <div className="vl-smc-section-tag">
              <span>🎯</span> SCIENCE CHALLENGE QUESTION
            </div>
            <p className="vl-smc-question-text">{spark.challengeQuestion}</p>

            <div className="vl-smc-options-grid">
              {spark.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === spark.correctOptionIndex;
                let btnClass = 'vl-smc-opt-btn';

                if (isAnswered) {
                  if (isCorrect) btnClass += ' is-correct';
                  else if (isSelected) btnClass += ' is-wrong';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    className={btnClass}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswered}
                  >
                    <span className="vl-smc-opt-letter">{String.fromCharCode(65 + idx)}</span>
                    <span className="vl-smc-opt-text">{option}</span>
                    {isAnswered && isCorrect && <span className="vl-smc-opt-icon">✓</span>}
                    {isAnswered && isSelected && !isCorrect && <span className="vl-smc-opt-icon">✗</span>}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <div className="vl-smc-explanation-banner">
                <span className="vl-smc-exp-icon">{selectedOption === spark.correctOptionIndex ? '🎉' : '💡'}</span>
                <span>{spark.explanation}</span>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="vl-smc-footer">
          {onReturnToDashboard && (
            <button
              type="button"
              className="vl-smc-btn vl-smc-btn--ghost"
              onClick={() => {
                soundEffects.playStrokeChime();
                onReturnToDashboard();
                onClose();
              }}
            >
              🚀 Mission Control
            </button>
          )}

          {onPlayAgain && (
            <button
              type="button"
              className="vl-smc-btn vl-smc-btn--ghost"
              onClick={() => {
                soundEffects.playStrokeChime();
                onPlayAgain();
                onClose();
              }}
            >
              🔄 Play Again
            </button>
          )}

          {onNextMission && (
            <button
              type="button"
              className="vl-smc-btn vl-smc-btn--primary"
              onClick={() => {
                soundEffects.playCelebrationChime();
                onNextMission();
                onClose();
              }}
            >
              Next Mission ➔
            </button>
          )}

          <button
            type="button"
            className="vl-smc-close-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};
