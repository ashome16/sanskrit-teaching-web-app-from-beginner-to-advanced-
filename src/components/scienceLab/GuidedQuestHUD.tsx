import React, { useState, useEffect, useRef } from 'react';
import { getQuestsForLab } from '../../data/labQuests';
import { soundEffects } from '../../utils/soundEffects';

interface GuidedQuestHUDProps {
  labId: string;
  labTitle: string;
  onApplyPreset?: (presetData: Record<string, unknown>) => void;
  onOpenAllQuestsModal?: () => void;
}

const STORAGE_KEY = 'gurukul_completed_quests_v1';

export const GuidedQuestHUD: React.FC<GuidedQuestHUDProps> = ({
  labId,
  labTitle,
  onApplyPreset,
  onOpenAllQuestsModal,
}) => {
  const quests = getQuestsForLab(labId);

  // Active quest selection
  const [activeQuestIdx, setActiveQuestIdx] = useState(0);
  const quest = quests[activeQuestIdx] || null;

  // Step completion state
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  // 3-minute Countdown timer state
  const [secondsRemaining, setSecondsRemaining] = useState(180); // 3 minutes
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const timerRef = useRef<number | null>(null);

  // Bodhi Hint drawer
  const [hintIndex, setHintIndex] = useState<number | null>(null);

  // Lore / Sutra expansion
  const [isLoreExpanded, setIsLoreExpanded] = useState(false);

  // Completion celebratory modal
  const [isCompletedModalOpen, setIsCompletedModalOpen] = useState(false);
  const [completedQuestList, setCompletedQuestList] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Reset steps & timer when switching quests
  useEffect(() => {
    if (!quest) return;
    setCompletedSteps({});
    setSecondsRemaining(quest.durationMinutes * 60);
    setIsTimerRunning(true);
    setHintIndex(null);
  }, [quest?.id]);

  // Timer interval
  useEffect(() => {
    if (!isTimerRunning) {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = window.setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          if (timerRef.current !== null) {
            window.clearInterval(timerRef.current);
            timerRef.current = null;
          }
          soundEffects.playEncouragementDing();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isTimerRunning]);

  if (!quest) {
    return (
      <div className="vl-quest-hud vl-quest-hud--empty">
        <div className="vl-quest-hud-empty-text">
          <span>🕹️ Open Sandbox Mode active for <strong>{labTitle}</strong>.</span>
        </div>
      </div>
    );
  }

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleToggleStep = (stepId: string) => {
    const isNowDone = !completedSteps[stepId];
    setCompletedSteps((prev) => ({ ...prev, [stepId]: isNowDone }));
    if (isNowDone) {
      soundEffects.playSuccessDing();
    }
  };

  const completedCount = quest.steps.filter((s) => completedSteps[s.id]).length;
  const isAllStepsDone = quest.steps.length > 0 && completedCount === quest.steps.length;
  const isQuestFinished = completedQuestList.includes(quest.id);

  const handleFinishQuest = () => {
    soundEffects.playCelebrationChime();
    setIsTimerRunning(false);

    // Save into localStorage
    const updated = Array.from(new Set([...completedQuestList, quest.id]));
    setCompletedQuestList(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // quota or private mode
    }

    setIsCompletedModalOpen(true);
  };

  const handleCycleHint = () => {
    soundEffects.playStrokeChime();
    setHintIndex((prev) => {
      if (prev === null) return 0;
      return (prev + 1) % quest.hints.length;
    });
  };

  const handleApplyPresetAction = () => {
    if (quest.presetData && onApplyPreset) {
      soundEffects.playPuzzleSnap();
      onApplyPreset(quest.presetData);
    }
  };

  return (
    <div className="vl-quest-hud" role="region" aria-label={`3-Minute Quest: ${quest.title}`}>
      {/* HUD Header */}
      <div className="vl-quest-hud-top">
        <div className="vl-quest-hud-left">
          <div className="vl-quest-badge-row">
            <span className="vl-quest-tag">🎯 GUIDED QUEST MODE</span>
            <span className="vl-quest-difficulty">{quest.difficulty}</span>
            <span className="vl-quest-duration">⏱️ {quest.durationMinutes}-MIN CHALLENGE</span>
            {isQuestFinished && <span className="vl-quest-completed-badge">✓ COMPLETED</span>}
          </div>
          <h3 className="vl-quest-title">
            {quest.title} <span className="vl-quest-title-sa">{quest.titleSa}</span>
          </h3>
        </div>

        {/* Quest Navigation & 3-Min Timer */}
        <div className="vl-quest-hud-right">
          <div className={`vl-quest-timer-box${secondsRemaining < 30 ? ' is-urgent' : ''}`}>
            <span className="vl-quest-timer-icon">⏱️</span>
            <span className="vl-quest-timer-digits">{formatTime(secondsRemaining)}</span>
            <button
              type="button"
              className="vl-quest-timer-toggle"
              onClick={() => setIsTimerRunning((prev) => !prev)}
              title={isTimerRunning ? 'Pause timer' : 'Resume timer'}
              aria-label="Pause or resume timer"
            >
              {isTimerRunning ? '⏸' : '▶'}
            </button>
          </div>

          {/* Quest Selector Buttons */}
          <div className="vl-quest-selector-pills">
            {quests.map((q, idx) => (
              <button
                key={q.id}
                type="button"
                className={`vl-quest-selector-pill${idx === activeQuestIdx ? ' is-active' : ''}${completedQuestList.includes(q.id) ? ' is-conquered' : ''}`}
                onClick={() => setActiveQuestIdx(idx)}
                title={`Switch to Quest ${idx + 1}: ${q.title}`}
              >
                Q{idx + 1} {completedQuestList.includes(q.id) ? '✓' : ''}
              </button>
            ))}
            {onOpenAllQuestsModal && (
              <button
                type="button"
                className="vl-quest-selector-pill vl-quest-selector-pill--archive"
                onClick={onOpenAllQuestsModal}
                title="Browse full 3-minute quest archive across all sectors"
              >
                🧭 All Quests
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Direct Mission Prompt Banner */}
      <div className="vl-quest-prompt-banner">
        <div className="vl-quest-prompt-icon" aria-hidden="true">📜</div>
        <div className="vl-quest-prompt-content">
          <div className="vl-quest-prompt-kicker">DIRECT MISSION OBJECTIVE:</div>
          <p className="vl-quest-prompt-text">{quest.prompt}</p>
        </div>
      </div>

      {/* Interactive Step Checklist */}
      <div className="vl-quest-steps-box">
        <div className="vl-quest-steps-head">
          <span className="vl-quest-steps-title">
            📋 Mission Verification Checklist ({completedCount}/{quest.steps.length} Complete):
          </span>
          <div className="vl-quest-steps-progress-bar">
            <div
              className="vl-quest-steps-progress-fill"
              style={{ width: `${(completedCount / quest.steps.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="vl-quest-steps-grid">
          {quest.steps.map((step) => {
            const isDone = Boolean(completedSteps[step.id]);
            return (
              <button
                key={step.id}
                type="button"
                className={`vl-quest-step-item${isDone ? ' is-done' : ''}`}
                onClick={() => handleToggleStep(step.id)}
              >
                <span className="vl-quest-step-checkbox" aria-hidden="true">
                  {isDone ? '✓' : '○'}
                </span>
                <span className="vl-quest-step-text">
                  {step.label}
                  {step.sanskritLabel && (
                    <span className="vl-quest-step-sa"> ({step.sanskritLabel})</span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Hints & Action Toolbar */}
      <div className="vl-quest-action-toolbar">
        <div className="vl-quest-action-left">
          <button
            type="button"
            className="vl-quest-tool-btn"
            onClick={handleCycleHint}
            title="Get a hint from Bodhi"
          >
            💡 Bodhi Clue {hintIndex !== null ? `(${hintIndex + 1}/${quest.hints.length})` : ''}
          </button>

          <button
            type="button"
            className="vl-quest-tool-btn vl-quest-tool-btn--lore"
            onClick={() => setIsLoreExpanded((prev) => !prev)}
            title="Read Vedic civilizational background"
          >
            📖 Vedic Lore &amp; Sūtra {isLoreExpanded ? '▴' : '▾'}
          </button>

          {quest.presetData && onApplyPreset && (
            <button
              type="button"
              className="vl-quest-tool-btn vl-quest-tool-btn--preset"
              onClick={handleApplyPresetAction}
              title="Pre-calibrate the sandbox near the mission target"
            >
              ⚡ Setup Environment
            </button>
          )}
        </div>

        <div className="vl-quest-action-right">
          <button
            type="button"
            className={`vl-quest-verify-btn${isAllStepsDone ? ' is-ready' : ''}`}
            onClick={handleFinishQuest}
            disabled={!isAllStepsDone}
            title={isAllStepsDone ? 'Claim your Quest Victory & Badge!' : 'Complete all steps to finish the quest'}
          >
            {isAllStepsDone ? '🎉 Claim Victory & Badge' : `Verify Objective (${completedCount}/${quest.steps.length})`}
          </button>
        </div>
      </div>

      {/* Bodhi Clue Box (Expandable) */}
      {hintIndex !== null && (
        <div className="vl-quest-hint-bubble" role="status">
          <span className="vl-quest-hint-avatar">🧠 Bodhi:</span>
          <span className="vl-quest-hint-text">{quest.hints[hintIndex]}</span>
          <button
            type="button"
            className="vl-quest-hint-close"
            onClick={() => setHintIndex(null)}
            aria-label="Close clue"
          >
            ×
          </button>
        </div>
      )}

      {/* Vedic Lore & Sutra Drawer (Expandable) */}
      {isLoreExpanded && (
        <div className="vl-quest-lore-drawer">
          <div className="vl-quest-sutra-card">
            <span className="vl-quest-sutra-quote">“{quest.sutraQuote.sa}”</span>
            <span className="vl-quest-sutra-meaning">{quest.sutraQuote.en}</span>
            <span className="vl-quest-sutra-source">— {quest.sutraQuote.source}</span>
          </div>
          <p className="vl-quest-lore-text">{quest.vedicLore}</p>
        </div>
      )}

      {/* Quest Celebration Victory Modal */}
      {isCompletedModalOpen && (
        <div className="vl-quest-modal-scrim" role="dialog" aria-modal="true">
          <div className="vl-quest-modal-card">
            <div className="vl-quest-modal-badge-icon" aria-hidden="true">
              {quest.badge.icon}
            </div>
            <span className="vl-quest-modal-congrats">जयतु विज्ञानम् · QUEST CONQUERED!</span>
            <h4 className="vl-quest-modal-title">{quest.title}</h4>
            <p className="vl-quest-modal-badge-name">
              Unlocked Badge: <strong>{quest.badge.title}</strong>
            </p>
            <div className="vl-quest-modal-reward">
              <span className="vl-quest-reward-pill">⭐ +{quest.rewardXP} Vidya XP</span>
              <span className="vl-quest-reward-pill">
                ⏱️ Completed in {formatTime(quest.durationMinutes * 60 - secondsRemaining)}
              </span>
            </div>
            <p className="vl-quest-modal-desc">
              You have successfully unraveled the scientific principles of {quest.titleSa} in the Reality Sandbox!
            </p>
            <div className="vl-quest-modal-actions">
              {activeQuestIdx < quests.length - 1 ? (
                <button
                  type="button"
                  className="vl-btn vl-btn--gold"
                  onClick={() => {
                    setIsCompletedModalOpen(false);
                    setActiveQuestIdx((curr) => curr + 1);
                  }}
                >
                  Next Quest: {quests[activeQuestIdx + 1].title} →
                </button>
              ) : (
                <button
                  type="button"
                  className="vl-btn vl-btn--gold"
                  onClick={() => setIsCompletedModalOpen(false)}
                >
                  Explore Free Sandbox 🚀
                </button>
              )}
              <button
                type="button"
                className="vl-btn vl-btn--cyber-ghost"
                onClick={() => setIsCompletedModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
