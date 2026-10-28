import React from 'react';
import type { MissionCardData } from './missionControlData';
import { soundEffects } from '../../utils/soundEffects';

interface HowToPlayModalProps {
  mission: MissionCardData;
  isOpen: boolean;
  onClose: () => void;
  onLaunch: () => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({
  mission,
  isOpen,
  onClose,
  onLaunch,
}) => {
  if (!isOpen) return null;

  return (
    <div className="vl-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="htpm-title">
      <div className="vl-htp-modal-card">
        <div className="vl-htp-header" style={{ borderColor: mission.glow }}>
          <div className="vl-htp-icon-wrap" style={{ background: mission.tint }}>
            <span className="vl-htp-big-icon">{mission.icon}</span>
          </div>
          <div className="vl-htp-header-text">
            <span className="vl-htp-kicker">MISSION BRIEFING // उद्बोधनम्</span>
            <h2 id="htpm-title" className="vl-htp-title">
              How to Play: {mission.kidTitle}
            </h2>
            <div className="vl-htp-subtitle">
              <span>{mission.sanskritSubtitle}</span> · <span>{mission.ageRange}</span>
            </div>
          </div>
        </div>

        <div className="vl-htp-body">
          {/* Mission Goal */}
          <div className="vl-htp-goal-banner">
            <span className="vl-htp-goal-tag">🎯 YOUR 3-MINUTE MISSION</span>
            <p className="vl-htp-goal-text">{mission.missionGoal}</p>
          </div>

          {/* Steps */}
          <div className="vl-htp-steps-list">
            {mission.howToPlay.map((step, idx) => (
              <div key={idx} className="vl-htp-step-item">
                <div className="vl-htp-step-num">{idx + 1}</div>
                <div className="vl-htp-step-text">{step}</div>
              </div>
            ))}
          </div>

          {/* Reward Preview */}
          <div className="vl-htp-reward-preview">
            <span>🏆 Reward upon completion: <strong>{mission.badgeName} Badge ({mission.badgeSanskrit})</strong> + <strong>3 Vidyā Stars ⭐</strong></span>
          </div>
        </div>

        <div className="vl-htp-footer">
          <button
            type="button"
            className="vl-htp-cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="button"
            className="vl-htp-launch-btn"
            onClick={() => {
              soundEffects.playCelebrationChime();
              onLaunch();
              onClose();
            }}
          >
            ▶️ Launch Mission (3 min)
          </button>
        </div>
      </div>
    </div>
  );
};
