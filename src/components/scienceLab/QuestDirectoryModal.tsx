import React from 'react';
import { LAB_QUESTS, getAllQuests, type LabQuest } from '../../data/labQuests';

interface QuestDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectQuest: (labId: string, questId: string) => void;
  activeLabId: string;
}

const STORAGE_KEY = 'gurukul_completed_quests_v1';

export const QuestDirectoryModal: React.FC<QuestDirectoryModalProps> = ({
  isOpen,
  onClose,
  onSelectQuest,
  activeLabId,
}) => {
  if (!isOpen) return null;

  const allQuests = getAllQuests();
  let completedIds: string[] = [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) completedIds = JSON.parse(raw);
  } catch {
    completedIds = [];
  }

  const completedCount = allQuests.filter((q) => completedIds.includes(q.id)).length;
  const labKeys = Object.keys(LAB_QUESTS);

  return (
    <div className="vl-quest-directory-scrim" role="dialog" aria-modal="true" aria-label="Reality Sandbox Quests">
      <div className="vl-quest-directory-backdrop" onClick={onClose} />
      <div className="vl-quest-directory-panel">
        <div className="vl-quest-directory-head">
          <div>
            <span className="vl-quest-directory-badge">🧭 लक्ष्य-सारणी · QUEST ARCHIVE</span>
            <h3 className="vl-quest-directory-title">Reality Sandbox 3-Minute Quests</h3>
            <p className="vl-quest-directory-sub">
              Master ancient Indian scientific principles across atomic physics, cymatics, cosmology, and mathematics through curated gamified missions.
            </p>
          </div>
          <button
            type="button"
            className="vl-quest-directory-close"
            onClick={onClose}
            aria-label="Close Quest Directory"
          >
            ×
          </button>
        </div>

        {/* Global Progress Bar */}
        <div className="vl-quest-directory-progress-bar-wrap">
          <div className="vl-quest-directory-progress-meta">
            <span>Overall Mission Mastery:</span>
            <strong>{completedCount} of {allQuests.length} Quests Conquered ({Math.round((completedCount / allQuests.length) * 100)}%)</strong>
          </div>
          <div className="vl-quest-directory-progress-track">
            <div
              className="vl-quest-directory-progress-fill"
              style={{ width: `${(completedCount / allQuests.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Sectors & Quests Grid */}
        <div className="vl-quest-directory-sectors">
          {labKeys.map((labKey) => {
            const labQuests = LAB_QUESTS[labKey] || [];
            const isCurrentSector = labKey === activeLabId;

            return (
              <div key={labKey} className={`vl-quest-sector-card${isCurrentSector ? ' is-current' : ''}`}>
                <div className="vl-quest-sector-head">
                  <span className="vl-quest-sector-name">
                    {isCurrentSector ? '📍 ' : ''}Sector: {labKey.toUpperCase()}
                  </span>
                  <span className="vl-quest-sector-count">{labQuests.length} Quests</span>
                </div>

                <div className="vl-quest-sector-items">
                  {labQuests.map((q: LabQuest) => {
                    const isDone = completedIds.includes(q.id);

                    return (
                      <button
                        key={q.id}
                        type="button"
                        className={`vl-quest-directory-item${isDone ? ' is-conquered' : ''}`}
                        onClick={() => {
                          onSelectQuest(q.labId, q.id);
                          onClose();
                        }}
                      >
                        <div className="vl-quest-directory-item-left">
                          <span className="vl-quest-item-badge-icon">{q.badge.icon}</span>
                          <div>
                            <div className="vl-quest-item-title-row">
                              <span className="vl-quest-item-title">{q.title}</span>
                              <span className="vl-quest-item-diff">{q.difficulty}</span>
                            </div>
                            <p className="vl-quest-item-prompt">{q.prompt}</p>
                          </div>
                        </div>

                        <div className="vl-quest-directory-item-right">
                          <span className="vl-quest-item-time">⏱️ {q.durationMinutes}m</span>
                          <span className={`vl-quest-item-status${isDone ? ' done' : ''}`}>
                            {isDone ? '✓ Conquered' : 'Start Quest →'}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
