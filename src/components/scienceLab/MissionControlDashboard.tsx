import React, { useState } from 'react';
import {
  CORE_MISSION_CARDS,
  getTodayChallenge,
  getLevelRankTitle,
  type MissionCardData,
  type ExplorerStats,
} from './missionControlData';
import { HowToPlayModal } from './HowToPlayModal';
import { ParentNotesModal } from './ParentNotesModal';
import { soundEffects } from '../../utils/soundEffects';
import { playPronunciation, stopPronunciation } from '../../utils/pronunciation';

interface MissionControlDashboardProps {
  explorerStats: ExplorerStats;
  onLaunchMission: (missionId: string) => void;
  onOpenPreschool: () => void;
  onOpenAdvancedLabs: () => void;
  onViewCatalog: () => void;
}

export const MissionControlDashboard: React.FC<MissionControlDashboardProps> = ({
  explorerStats,
  onLaunchMission,
  onOpenPreschool,
  onOpenAdvancedLabs,
  onViewCatalog,
}) => {
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('all');
  const [selectedHowToPlay, setSelectedHowToPlay] = useState<MissionCardData | null>(null);
  const [selectedParentNotes, setSelectedParentNotes] = useState<MissionCardData | null>(null);
  const [isBadgesTrayOpen, setIsBadgesTrayOpen] = useState(false);
  const [isSpeakingBodhi, setIsSpeakingBodhi] = useState(false);
  const [speechSpeed, setSpeechSpeed] = useState<'normal' | 'slow'>('normal');

  const todayChallenge = getTodayChallenge();
  const rankInfo = getLevelRankTitle(explorerStats.level);
  const totalPossibleStars = 24;
  const progressPercent = Math.min(100, Math.round((explorerStats.totalStars / totalPossibleStars) * 100));

  const filteredMissions = CORE_MISSION_CARDS.filter((m) => {
    if (selectedAgeGroup === 'all') return true;
    return m.ageGroup === selectedAgeGroup;
  });

  const handleSpeakBodhiGreeting = async () => {
    if (isSpeakingBodhi) {
      stopPronunciation();
      setIsSpeakingBodhi(false);
      return;
    }

    setIsSpeakingBodhi(true);
    soundEffects.playStrokeChime();
    try {
      const textToSpeak = 'नमस्ते अन्वेषक! एकम् अभियानं वृणु, विद्या-नक्षत्राणि च प्राप्नुहि!';
      await playPronunciation(textToSpeak, { rate: speechSpeed === 'slow' ? 0.75 : 1.0 });
    } catch {
      // Audio fallback
    } finally {
      setIsSpeakingBodhi(false);
    }
  };

  return (
    <div className="vl-mission-control-root" aria-label="Vijñāna Mission Control Dashboard">
      {/* Space Station Cockpit Hero Banner */}
      <header className="vl-mc-hero">
        <div className="vl-mc-hero-glow" aria-hidden="true" />

        <div className="vl-mc-hero-main">
          {/* Cockpit Status Header */}
          <div className="vl-mc-status-pill">
            <span className="vl-hud-blink">●</span>
            <span>VIJÑĀNA MISSION CONTROL // विज्ञान-अभियान-केन्द्रम्</span>
            <span className="vl-mc-system-ok">ONLINE · 8 MISSIONS READY</span>
          </div>

          <h1 className="vl-mc-title">
            Play First, Learn Second! 🚀
          </h1>

          {/* Bodhi Mission Controller Guide */}
          <div className="vl-mc-bodhi-guide">
            <div className="vl-mc-bodhi-avatar-wrap">
              <span className="vl-mc-bodhi-avatar">🧙‍♂️</span>
              <span className="vl-mc-bodhi-status-dot" title="Bodhi Controller Online" />
            </div>

            <div className="vl-mc-bodhi-bubble">
              <div className="vl-mc-bodhi-meta">
                <span className="vl-mc-bodhi-name">BODHI · MISSION CONTROLLER</span>
                <div className="vl-mc-bodhi-audio-controls">
                  <button
                    type="button"
                    className={`vl-mc-bodhi-audio-btn ${isSpeakingBodhi ? 'is-speaking' : ''}`}
                    onClick={handleSpeakBodhiGreeting}
                    aria-label={isSpeakingBodhi ? 'Stop speaking' : 'Listen to Bodhi greeting'}
                  >
                    <span>{isSpeakingBodhi ? '⏹️ Stop' : '🔊 Listen'}</span>
                    {isSpeakingBodhi && (
                      <span className="vl-mc-soundwave">
                        <span /><span /><span /><span />
                      </span>
                    )}
                  </button>
                  <button
                    type="button"
                    className="vl-mc-bodhi-speed-btn"
                    onClick={() => {
                      const next = speechSpeed === 'normal' ? 'slow' : 'normal';
                      setSpeechSpeed(next);
                      soundEffects.playStrokeChime();
                    }}
                    title="Toggle audio voice speed"
                  >
                    {speechSpeed === 'slow' ? '🐢 Slow' : '⚡ Normal'}
                  </button>
                </div>
              </div>

              <p className="vl-mc-bodhi-text">
                &ldquo;Namaste, Explorer! Choose a mission, conquer 3-minute scientific puzzles, and collect your Vidyā Stars!&rdquo;
              </p>
              <div className="vl-mc-bodhi-sa" lang="sa">
                नमस्ते अन्वेषक! एकम् अभियानं वृणु, विद्या-नक्षत्राणि च प्राप्नुहि!
              </div>
            </div>
          </div>

          {/* Telemetry & Progress Strip */}
          <div className="vl-mc-telemetry-bar">
            {/* Rank / Level */}
            <div className="vl-mc-telemetry-stat vl-mc-telemetry-stat--rank">
              <span className="vl-mc-stat-icon">🎖️</span>
              <div>
                <span className="vl-mc-stat-label">EXPLORER RANK</span>
                <span className="vl-mc-stat-value">Level {explorerStats.level}: {rankInfo.title}</span>
                <span className="vl-mc-stat-sa" lang="sa">{rankInfo.dev}</span>
              </div>
            </div>

            {/* Vidyā Stars */}
            <div className="vl-mc-telemetry-stat vl-mc-telemetry-stat--stars">
              <span className="vl-mc-stat-icon">⭐</span>
              <div>
                <span className="vl-mc-stat-label">VIDYĀ STARS</span>
                <span className="vl-mc-stat-value">{explorerStats.totalStars} / {totalPossibleStars} Stars</span>
                <div className="vl-mc-progress-track">
                  <div className="vl-mc-progress-bar" style={{ width: `${progressPercent}%` }} />
                </div>
              </div>
            </div>

            {/* Badges Button */}
            <button
              type="button"
              className="vl-mc-telemetry-stat vl-mc-telemetry-stat--badges"
              onClick={() => {
                soundEffects.playStrokeChime();
                setIsBadgesTrayOpen((prev) => !prev);
              }}
              title="Click to view all collectible science badges"
            >
              <span className="vl-mc-stat-icon">🏆</span>
              <div>
                <span className="vl-mc-stat-label">COLLECTED BADGES</span>
                <span className="vl-mc-stat-value">
                  {explorerStats.unlockedBadges.length} / {CORE_MISSION_CARDS.length} Badges
                </span>
                <span className="vl-mc-view-badges-cta">
                  {isBadgesTrayOpen ? '▲ Hide Badges' : '▼ View Showcase'}
                </span>
              </div>
            </button>
          </div>

          {/* Badges Showcase Drawer */}
          {isBadgesTrayOpen && (
            <div className="vl-mc-badges-tray" role="region" aria-label="Explorer Badges Showcase">
              <div className="vl-mc-badges-tray-header">
                <h3>🏆 Explorer Badges Showcase // विद्या-पदकानि</h3>
                <span className="vl-mc-badges-tray-sub">Complete 3-minute missions to unlock all 8 historical STEM badges!</span>
              </div>

              <div className="vl-mc-badges-grid">
                {CORE_MISSION_CARDS.map((mission) => {
                  const isUnlocked = explorerStats.unlockedBadges.includes(mission.badgeId);
                  const starsEarned = explorerStats.starsByGame[mission.id] || 0;

                  return (
                    <div
                      key={mission.badgeId}
                      className={`vl-mc-badge-item ${isUnlocked ? 'is-unlocked' : 'is-locked'}`}
                      style={{ '--badge-glow': mission.glow } as React.CSSProperties}
                    >
                      <div className="vl-mc-badge-icon-box">
                        <span className="vl-mc-badge-emoji">{mission.badgeIcon}</span>
                        {!isUnlocked && <span className="vl-mc-badge-lock">🔒</span>}
                      </div>
                      <div className="vl-mc-badge-name-text">{mission.badgeName}</div>
                      <div className="vl-mc-badge-sanskrit-text" lang="sa">{mission.badgeSanskrit}</div>
                      <div className="vl-mc-badge-status-line">
                        {isUnlocked ? (
                          <span className="vl-mc-badge-status-unlocked">
                            ✓ UNLOCKED ({starsEarned} ⭐)
                          </span>
                        ) : (
                          <span className="vl-mc-badge-status-locked">Play to Unlock</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 60-Second Daily Challenge Card */}
          <div className="vl-mc-daily-card">
            <div className="vl-mc-daily-left">
              <div className="vl-mc-daily-kicker">
                <span className="vl-hud-blink">⚡</span> 60-SECOND DAILY CHALLENGE // दैनिक-साधना
              </div>
              <h2 className="vl-mc-daily-title">{todayChallenge.title}</h2>
              <p className="vl-mc-daily-task">{todayChallenge.task}</p>
            </div>
            <div className="vl-mc-daily-right">
              <button
                type="button"
                className="vl-mc-daily-launch-btn"
                onClick={() => {
                  soundEffects.playCelebrationChime();
                  onLaunchMission(todayChallenge.targetGameId);
                }}
              >
                <span>🚀 Launch Challenge (+{todayChallenge.rewardStars} ⭐)</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Missions Section */}
      <main className="vl-mc-missions-section" aria-label="Vijñāna Missions">
        {/* Navigation & Filter Bar */}
        <div className="vl-mc-filters-bar">
          <div className="vl-mc-filter-buttons" role="tablist" aria-label="Filter missions by age group">
            <button
              type="button"
              className={`vl-mc-filter-btn ${selectedAgeGroup === 'all' ? 'is-active' : ''}`}
              onClick={() => {
                setSelectedAgeGroup('all');
                soundEffects.playStrokeChime();
              }}
            >
              <span>🌟</span> All 8 Missions
            </button>
            <button
              type="button"
              className={`vl-mc-filter-btn ${selectedAgeGroup === 'Ages 6–8' ? 'is-active' : ''}`}
              onClick={() => {
                setSelectedAgeGroup('Ages 6–8');
                soundEffects.playStrokeChime();
              }}
            >
              <span>🧸</span> Ages 6–8 (Junior)
            </button>
            <button
              type="button"
              className={`vl-mc-filter-btn ${selectedAgeGroup === 'Ages 8–11' ? 'is-active' : ''}`}
              onClick={() => {
                setSelectedAgeGroup('Ages 8–11');
                soundEffects.playStrokeChime();
              }}
            >
              <span>🎒</span> Ages 8–11 (Cadet)
            </button>
            <button
              type="button"
              className={`vl-mc-filter-btn ${selectedAgeGroup === 'Ages 11+' ? 'is-active' : ''}`}
              onClick={() => {
                setSelectedAgeGroup('Ages 11+');
                soundEffects.playStrokeChime();
              }}
            >
              <span>🔬</span> Ages 11+ (Commander)
            </button>
          </div>

          <div className="vl-mc-view-all-sims">
            <button
              type="button"
              className="vl-mc-catalog-switch-btn"
              onClick={onViewCatalog}
              title="View all 17 simulations in academic catalog format"
            >
              <span>🎴</span> View All 17 Academic Simulations ➔
            </button>
          </div>
        </div>

        {/* 8 Glowing Mission Cards Grid */}
        <div className="vl-mc-cards-grid">
          {filteredMissions.map((mission) => {
            const starsEarned = explorerStats.starsByGame[mission.id] || 0;
            const isCompleted = starsEarned > 0;
            const diffStars = Array.from({ length: 3 }, (_, i) => i < mission.difficulty ? '★' : '☆').join('');

            return (
              <article
                key={mission.id}
                className={`vl-mc-card ${isCompleted ? 'is-completed' : ''}`}
                style={{
                  '--card-tint': mission.tint,
                  '--card-ink': mission.ink,
                  '--card-glow': mission.glow,
                } as React.CSSProperties}
              >
                {/* Card Top Meta */}
                <div className="vl-mc-card-top">
                  <div className="vl-mc-card-icon-circle">
                    <span className="vl-mc-card-icon">{mission.icon}</span>
                  </div>

                  <div className="vl-mc-card-meta-right">
                    <div className="vl-mc-pills-row">
                      <span className="vl-mc-pill vl-mc-pill--age">{mission.ageRange}</span>
                      <span className="vl-mc-pill vl-mc-pill--subject">{mission.subject}</span>
                      <span className="vl-mc-pill vl-mc-pill--diff" title={`Difficulty: ${mission.difficulty}/3`}>
                        {diffStars}
                      </span>
                    </div>

                    <div className="vl-mc-stars-badge">
                      {isCompleted ? (
                        <span className="vl-mc-stars-won">
                          {Array.from({ length: starsEarned }, () => '⭐').join('')} Completed
                        </span>
                      ) : (
                        <span className="vl-mc-stars-ready">☆☆☆ Ready</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Titles */}
                <div className="vl-mc-card-titles">
                  <h3 className="vl-mc-card-kid-title">{mission.kidTitle}</h3>
                  <div className="vl-mc-card-sa-subtitle" lang="sa">
                    {mission.sanskritSubtitle}
                  </div>
                </div>

                {/* 1-Sentence Mission Goal */}
                <p className="vl-mc-card-goal">
                  🎯 <strong>Mission:</strong> {mission.missionGoal}
                </p>

                {/* Reward Preview */}
                <div className="vl-mc-card-reward-line">
                  <span className="vl-mc-reward-icon">{mission.badgeIcon}</span>
                  <span>Unlocks <strong>{mission.badgeName}</strong> badge + 3 Stars</span>
                </div>

                {/* Action Buttons (Touch-Friendly, 48px target) */}
                <div className="vl-mc-card-actions">
                  <button
                    type="button"
                    className="vl-mc-action-btn vl-mc-action-btn--launch"
                    onClick={() => {
                      soundEffects.playCelebrationChime();
                      onLaunchMission(mission.id);
                    }}
                  >
                    <span>▶️ Play Mission (3 min)</span>
                  </button>

                  <div className="vl-mc-action-sub-row">
                    <button
                      type="button"
                      className="vl-mc-action-btn vl-mc-action-btn--how"
                      onClick={() => {
                        soundEffects.playStrokeChime();
                        setSelectedHowToPlay(mission);
                      }}
                      title="See step-by-step how to play instructions"
                    >
                      ❓ How to Play
                    </button>

                    <button
                      type="button"
                      className="vl-mc-action-btn vl-mc-action-btn--notes"
                      onClick={() => {
                        soundEffects.playStrokeChime();
                        setSelectedParentNotes(mission);
                      }}
                      title="See CBSE/NCERT curriculum alignment and teacher notes"
                    >
                      📘 Parent Notes
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Gateway Banners */}
        <div className="vl-mc-gateways-grid">
          {/* Preschool Wonder Zone */}
          <div className="vl-mc-gateway-card vl-mc-gateway--preschool">
            <div className="vl-mc-gateway-icon">🧸</div>
            <div className="vl-mc-gateway-info">
              <span className="vl-mc-gateway-tag">FOR LITTLE EXPLORERS (AGES 2–6)</span>
              <h3>Preschool Wonder Playground (शिशु-वाटिका)</h3>
              <p>11 gentle tactile games: Shapes, Rainbow colors, Animal safari sounds, Orchard fruit picker, Moon phases &amp; 5 Elements story.</p>
            </div>
            <button
              type="button"
              className="vl-mc-gateway-btn"
              onClick={onOpenPreschool}
            >
              Enter Preschool ➔
            </button>
          </div>

          {/* Advanced Research Studios */}
          <div className="vl-mc-gateway-card vl-mc-gateway--advanced">
            <div className="vl-mc-gateway-icon">🏛️</div>
            <div className="vl-mc-gateway-info">
              <span className="vl-mc-gateway-tag">FOR SENIOR STUDENTS &amp; SCHOLARS</span>
              <h3>Advanced STEM Research Studios</h3>
              <p>Explore Agnibāṇa Rocketry, Ancient Temple Engineering, Ujjain 0° Prime Meridian Geodesy, and Chandaḥśāstra binary algorithms.</p>
            </div>
            <button
              type="button"
              className="vl-mc-gateway-btn"
              onClick={onOpenAdvancedLabs}
            >
              Explore Studios ➔
            </button>
          </div>
        </div>
      </main>

      {/* How To Play Modal */}
      {selectedHowToPlay && (
        <HowToPlayModal
          mission={selectedHowToPlay}
          isOpen={true}
          onClose={() => setSelectedHowToPlay(null)}
          onLaunch={() => onLaunchMission(selectedHowToPlay.id)}
        />
      )}

      {/* Parent Notes Modal */}
      {selectedParentNotes && (
        <ParentNotesModal
          mission={selectedParentNotes}
          isOpen={true}
          onClose={() => setSelectedParentNotes(null)}
        />
      )}
    </div>
  );
};
