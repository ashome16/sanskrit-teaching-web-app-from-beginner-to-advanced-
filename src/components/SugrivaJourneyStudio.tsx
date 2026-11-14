import React, { useState, useEffect } from 'react';
import {
  VEDIC_DIRECTIONS,
  SUGRIVA_EXPEDITIONS,
  LANDMARK_QUESTS,
  type VedicDirection,
  type ExpeditionCheckpoint,
} from '../data/sugrivaJourneyData';
import '../styles/sugriva-journey.css';

interface SugrivaStudioProps {
  onGoHome?: () => void;
  onOpenGamesHub?: () => void;
  onOpenIks?: () => void;
  onPlayAudio?: (text: string) => void;
}

type StudioTab = 'map' | 'expeditions' | 'quests' | 'geodesy';

export const SugrivaJourneyStudio: React.FC<SugrivaStudioProps> = ({
  onGoHome,
  onOpenGamesHub,
  onOpenIks,
}) => {
  const [activeTab, setActiveTab] = useState<StudioTab>('map');
  const [activeDirectionFilter, setActiveDirectionFilter] = useState<'all' | 'east' | 'south' | 'west' | 'north'>('all');
  const [selectedDirection, setSelectedDirection] = useState<VedicDirection>(VEDIC_DIRECTIONS[0]);
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<ExpeditionCheckpoint>(
    SUGRIVA_EXPEDITIONS[0].checkpoints[2] // Yavadvipa by default
  );

  // Quests solving state with localStorage persistence
  const [solvedQuests, setSolvedQuests] = useState<Record<string, number>>(() => {
    if (typeof window === 'undefined') return {};
    try {
      const saved = localStorage.getItem('sugriva-journey-solved-quests');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [questDirectionFilter, setQuestDirectionFilter] = useState<'all' | 'east' | 'south' | 'west' | 'north'>('all');

  useEffect(() => {
    try {
      localStorage.setItem('sugriva-journey-solved-quests', JSON.stringify(solvedQuests));
    } catch {
      // Ignore localStorage write errors
    }
  }, [solvedQuests]);

  const handleSelectOption = (questId: string, optionIndex: number) => {
    setSolvedQuests((prev) => ({
      ...prev,
      [questId]: optionIndex,
    }));
  };

  const handleResetProgress = () => {
    if (window.confirm('Reset your solved quests and badges for Sugriva\'s Journey?')) {
      setSolvedQuests({});
    }
  };

  const solvedCount = Object.keys(solvedQuests).length;
  const totalQuests = LANDMARK_QUESTS.length;
  const progressPercent = Math.round((solvedCount / totalQuests) * 100);

  // Filtered expeditions & checkpoints
  const displayedExpeditions =
    activeDirectionFilter === 'all'
      ? SUGRIVA_EXPEDITIONS
      : SUGRIVA_EXPEDITIONS.filter((e) => e.id === activeDirectionFilter);

  const displayedQuests =
    questDirectionFilter === 'all'
      ? LANDMARK_QUESTS
      : LANDMARK_QUESTS.filter((q) => q.direction === questDirectionFilter);

  // Clean SVG Icons
  const CompassIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );

  const MapIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
      <line x1="8" y1="2" x2="8" y2="18" />
      <line x1="16" y1="6" x2="16" y2="22" />
    </svg>
  );

  const ShieldIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );

  const BookIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );

  const CheckIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );

  const CrossIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );

  return (
    <div className="sj-studio-container" role="main" aria-label="Sugriva's Global Directional Journey Studio">
      {/* ---------------- HERO HEADER ---------------- */}
      <header className="sj-hero-section">
        <div className="sj-hero-inner">
          <nav className="sj-nav-breadcrumb" aria-label="Breadcrumb navigation">
            {onGoHome && (
              <button type="button" className="sj-nav-back-btn" onClick={onGoHome}>
                <span>Home</span>
              </button>
            )}
            {onOpenGamesHub && (
              <button type="button" className="sj-nav-back-btn" onClick={onOpenGamesHub}>
                <span>Sanskrit Games</span>
              </button>
            )}
            {onOpenIks && (
              <button type="button" className="sj-nav-back-btn" onClick={onOpenIks}>
                <span>IKS Sciences</span>
              </button>
            )}
            <span style={{ color: '#64748b' }}>/</span>
            <span style={{ color: '#fbbf24', fontWeight: 700 }}>सुग्रीव-दिग्विजय · Sugrīva&apos;s Journey</span>
          </nav>

          <div className="sj-hero-badge-wrap">
            <span className="sj-hero-kicker-badge">
              <span>Vālmīki Rāmāyaṇa · Kiṣkindhā-Kāṇḍa</span>
            </span>
            <span className="sj-hero-tag-pill">Sargas 40–43 · Bhūgola-Vidyā</span>
            <span className="sj-hero-tag-pill">Aṣṭa-Diśā Geography</span>
            <span className="sj-hero-tag-pill">Decoupled Epic Studio</span>
          </div>

          <h1 className="sj-hero-title">
            सुग्रीव-दिग्विजय <span className="highlight-gold">· Sugrīva&apos;s Global Journey</span>
          </h1>

          <p className="sj-hero-subtitle">
            Explore ancient Indian directional astronomy and world geography from the epic search for Sītā. 
            Follow the 4 cardinal search parties dispatched from Kiṣkindhā across sacred rivers, towering mountain passes, 
            and far-flung ocean archipelagos from Yavadvīpa to the Arctic horizons of Uttarakuru.
          </p>

          <div className="sj-hero-stats-bar">
            <div className="sj-stat-card">
              <span className="sj-stat-num">4</span>
              <span className="sj-stat-label">Cardinal Expeditions (दिशः)</span>
            </div>
            <div className="sj-stat-card">
              <span className="sj-stat-num">8</span>
              <span className="sj-stat-label">Vedic Directions &amp; Dikpālas</span>
            </div>
            <div className="sj-stat-card">
              <span className="sj-stat-num">16</span>
              <span className="sj-stat-label">Landmark Quests &amp; Verses</span>
            </div>
            <div className="sj-stat-card">
              <span className="sj-stat-num" style={{ color: '#34d399' }}>
                {solvedCount} / {totalQuests}
              </span>
              <span className="sj-stat-label">Explorer Badges Unlocked</span>
            </div>
          </div>
        </div>
      </header>

      {/* ---------------- NAVIGATION TABS ---------------- */}
      <nav className="sj-nav-tabs-wrapper" aria-label="Studio sections">
        <div className="sj-nav-tabs-inner">
          <button
            type="button"
            className={`sj-tab-button${activeTab === 'map' ? ' active' : ''}`}
            onClick={() => setActiveTab('map')}
          >
            <MapIcon />
            <span>World Map &amp; Expeditions</span>
          </button>
          <button
            type="button"
            className={`sj-tab-button${activeTab === 'expeditions' ? ' active' : ''}`}
            onClick={() => setActiveTab('expeditions')}
          >
            <CompassIcon />
            <span>The 4 Vanguard Squads</span>
          </button>
          <button
            type="button"
            className={`sj-tab-button${activeTab === 'quests' ? ' active' : ''}`}
            onClick={() => setActiveTab('quests')}
          >
            <ShieldIcon />
            <span>Landmark Quests</span>
            <span className="sj-tab-badge">{solvedCount}/{totalQuests}</span>
          </button>
          <button
            type="button"
            className={`sj-tab-button${activeTab === 'geodesy' ? ' active' : ''}`}
            onClick={() => setActiveTab('geodesy')}
          >
            <BookIcon />
            <span>Ancient Geodesy &amp; Bhūgola</span>
          </button>
        </div>
      </nav>

      <main className="sj-main-layout">
        {/* ===================================================================
            TAB 1: INTERACTIVE SVG MAP & COMPASS
            =================================================================== */}
        {activeTab === 'map' && (
          <div className="sj-map-grid">
            <div className="sj-map-canvas-card">
              <div className="sj-map-header">
                <div className="sj-map-title-wrap">
                  <h3 className="sj-map-h3">Bhūgola-Maṇḍala · Global Search Vectors</h3>
                </div>
                <div className="sj-map-filter-group" role="group" aria-label="Filter Map by Direction">
                  <button
                    type="button"
                    className={`sj-filter-chip${activeDirectionFilter === 'all' ? ' active' : ''}`}
                    onClick={() => setActiveDirectionFilter('all')}
                  >
                    All Corridors
                  </button>
                  <button
                    type="button"
                    className={`sj-filter-chip${activeDirectionFilter === 'east' ? ' active' : ''}`}
                    onClick={() => setActiveDirectionFilter('east')}
                  >
                    East (Vinata)
                  </button>
                  <button
                    type="button"
                    className={`sj-filter-chip${activeDirectionFilter === 'south' ? ' active' : ''}`}
                    onClick={() => setActiveDirectionFilter('south')}
                  >
                    South (Hanuman)
                  </button>
                  <button
                    type="button"
                    className={`sj-filter-chip${activeDirectionFilter === 'west' ? ' active' : ''}`}
                    onClick={() => setActiveDirectionFilter('west')}
                  >
                    West (Sushena)
                  </button>
                  <button
                    type="button"
                    className={`sj-filter-chip${activeDirectionFilter === 'north' ? ' active' : ''}`}
                    onClick={() => setActiveDirectionFilter('north')}
                  >
                    North (Shatabali)
                  </button>
                </div>
              </div>

              <div className="sj-svg-map-wrapper">
                <svg
                  className="sj-interactive-svg"
                  viewBox="0 0 900 620"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Ancient Indian Geodesy Map for Sugriva's Journey"
                >
                  <defs>
                    <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#1e293b" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#0b1120" stopOpacity="1" />
                    </radialGradient>
                    <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Lat / Long Coordinate Grid Lines */}
                  <line x1="50" y1="150" x2="850" y2="150" className="sj-svg-grid-line" />
                  <line x1="50" y1="310" x2="850" y2="310" className="sj-svg-grid-line" />
                  <line x1="50" y1="470" x2="850" y2="470" className="sj-svg-grid-line" />
                  <line x1="200" y1="40" x2="200" y2="580" className="sj-svg-grid-line" />
                  <line x1="450" y1="40" x2="450" y2="580" className="sj-svg-meridian-prime" />
                  <line x1="700" y1="40" x2="700" y2="580" className="sj-svg-grid-line" />

                  {/* Meridian & Equator Labels */}
                  <text x="455" y="55" fill="#f59e0b" fontSize="10" fontWeight="700" opacity="0.8">
                    0° UJJAYINĪ PRIME MERIDIAN (मध्यरेखा)
                  </text>
                  <text x="65" y="325" fill="#38bdf8" fontSize="10" fontWeight="700" opacity="0.8">
                    TROPIC OF CANCER (कर्क-रेखा)
                  </text>

                  {/* Decorative Cardinal Rings */}
                  <circle cx="450" cy="380" r="80" stroke="rgba(245, 158, 11, 0.15)" strokeWidth="1" strokeDasharray="3 3" />
                  <circle cx="450" cy="380" r="160" stroke="rgba(245, 158, 11, 0.1)" strokeWidth="1" strokeDasharray="4 4" />
                  <circle cx="450" cy="380" r="260" stroke="rgba(245, 158, 11, 0.06)" strokeWidth="1" strokeDasharray="5 5" />

                  {/* EAST EXPEDITION VECTOR (Gold) */}
                  {(activeDirectionFilter === 'all' || activeDirectionFilter === 'east') && (
                    <g className="sj-vector-east">
                      <path
                        d="M 450 380 Q 520 320 590 305 T 680 360 T 740 375 L 810 330"
                        className="sj-svg-path-vector east"
                      />
                      <circle cx="810" cy="330" r="12" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
                      <text x="750" y="315" fill="#fbbf24" fontSize="11" fontWeight="800">
                        उदयगिरि (Udayagiri)
                      </text>
                    </g>
                  )}

                  {/* SOUTH EXPEDITION VECTOR (Emerald) */}
                  {(activeDirectionFilter === 'all' || activeDirectionFilter === 'south') && (
                    <g className="sj-vector-south">
                      <path
                        d="M 450 380 L 470 340 L 470 410 L 460 480 L 430 530 L 465 565"
                        className="sj-svg-path-vector south"
                      />
                      <circle cx="465" cy="565" r="12" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="3 3" />
                      <text x="480" y="570" fill="#34d399" fontSize="11" fontWeight="800">
                        महेन्द्रगिरि (Mahendra) ➔ Laṅkā
                      </text>
                    </g>
                  )}

                  {/* WEST EXPEDITION VECTOR (Indigo) */}
                  {(activeDirectionFilter === 'all' || activeDirectionFilter === 'west') && (
                    <g className="sj-vector-west">
                      <path
                        d="M 450 380 Q 380 330 300 350 T 230 310 T 180 280 L 110 290"
                        className="sj-svg-path-vector west"
                      />
                      <circle cx="110" cy="290" r="12" fill="none" stroke="#818cf8" strokeWidth="2" strokeDasharray="3 3" />
                      <text x="60" y="275" fill="#a5b4fc" fontSize="11" fontWeight="800">
                        अस्तगिरि (Astagiri)
                      </text>
                    </g>
                  )}

                  {/* NORTH EXPEDITION VECTOR (Sky) */}
                  {(activeDirectionFilter === 'all' || activeDirectionFilter === 'north') && (
                    <g className="sj-vector-north">
                      <path
                        d="M 450 380 L 440 210 L 450 155 L 470 110 L 495 75 L 460 30"
                        className="sj-svg-path-vector north"
                      />
                      <circle cx="460" cy="30" r="12" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
                      <text x="475" y="35" fill="#7dd3fc" fontSize="11" fontWeight="800">
                        मेरु &amp; उत्तरकुरु (Meru)
                      </text>
                    </g>
                  )}

                  {/* Checkpoints Interactive Nodes */}
                  {displayedExpeditions.flatMap((exp) =>
                    exp.checkpoints.map((cp) => {
                      const isSelected = selectedCheckpoint.id === cp.id;
                      const dotColor =
                        exp.id === 'east'
                          ? '#f59e0b'
                          : exp.id === 'south'
                          ? '#10b981'
                          : exp.id === 'west'
                          ? '#818cf8'
                          : '#38bdf8';

                      return (
                        <g
                          key={cp.id}
                          className="sj-node-circle"
                          onClick={() => setSelectedCheckpoint(cp)}
                          role="button"
                          tabIndex={0}
                          aria-label={`Inspect landmark ${cp.nameEn}`}
                        >
                          {isSelected && (
                            <circle
                              cx={cp.svgX}
                              cy={cp.svgY}
                              r="14"
                              fill="none"
                              stroke={dotColor}
                              strokeWidth="2"
                              opacity="0.8"
                            >
                              <animate
                                attributeName="r"
                                values="8;18;8"
                                dur="2s"
                                repeatCount="indefinite"
                              />
                              <animate
                                attributeName="opacity"
                                values="0.9;0.2;0.9"
                                dur="2s"
                                repeatCount="indefinite"
                              />
                            </circle>
                          )}
                          <circle
                            cx={cp.svgX}
                            cy={cp.svgY}
                            r={isSelected ? 7 : 5}
                            fill={dotColor}
                            stroke="#0f172a"
                            strokeWidth="2"
                          />
                          <text
                            x={cp.svgX + 8}
                            y={cp.svgY - 6}
                            fill="#f8fafc"
                            fontSize="9"
                            fontWeight="700"
                            filter="drop-shadow(0 1px 2px rgba(0,0,0,0.8))"
                          >
                            {cp.nameEn.split(' ')[0]}
                          </text>
                        </g>
                      );
                    })
                  )}

                  {/* ORIGIN: KISHKINDHA / PRASRAVANA HILL */}
                  <g>
                    <circle cx="450" cy="380" r="16" fill="rgba(245, 158, 11, 0.25)" />
                    <circle cx="450" cy="380" r="8" className="sj-node-origin" />
                    <text x="465" y="395" fill="#f59e0b" fontSize="12" fontWeight="900" filter="drop-shadow(0 2px 4px #000)">
                      किष्किन्धा (Kiṣkindhā Center)
                    </text>
                  </g>
                </svg>
              </div>
            </div>

            {/* SIDE CONTROLLER: AṢṬA-DIŚĀ COMPASS & ACTIVE LANDMARK */}
            <div className="sj-side-panel">
              <div className="sj-panel-box">
                <div className="sj-box-header">
                  <span className="sj-box-title">अष्टदिक्-यन्त्रम् · 8 Vedic Directions</span>
                  <CompassIcon />
                </div>

                <div className="sj-compass-outer" role="region" aria-label="Asta-Disa Compass Dial">
                  <div className="sj-compass-ring" />
                  <div className="sj-compass-hub">
                    <span className="sj-compass-hub-sa">दिशः</span>
                    <span className="sj-compass-hub-en">Diśā</span>
                  </div>

                  {/* 8 Direction Clickable Nodes */}
                  <button
                    type="button"
                    className={`sj-compass-dir-node sj-dir-n${selectedDirection.id === 'uttara' ? ' active' : ''}`}
                    onClick={() => {
                      setSelectedDirection(VEDIC_DIRECTIONS.find((d) => d.id === 'uttara')!);
                      setActiveDirectionFilter('north');
                    }}
                    title="उत्तर (North) - Kubera"
                  >
                    <span>उ</span>
                    <span style={{ fontSize: '0.5rem' }}>0°</span>
                  </button>
                  <button
                    type="button"
                    className={`sj-compass-dir-node sj-dir-ne${selectedDirection.id === 'ishana' ? ' active' : ''}`}
                    onClick={() => setSelectedDirection(VEDIC_DIRECTIONS.find((d) => d.id === 'ishana')!)}
                    title="ईशान (North-East) - Shiva"
                  >
                    <span>ई</span>
                  </button>
                  <button
                    type="button"
                    className={`sj-compass-dir-node sj-dir-e${selectedDirection.id === 'purva' ? ' active' : ''}`}
                    onClick={() => {
                      setSelectedDirection(VEDIC_DIRECTIONS.find((d) => d.id === 'purva')!);
                      setActiveDirectionFilter('east');
                    }}
                    title="पूर्व (East) - Indra"
                  >
                    <span>पू</span>
                    <span style={{ fontSize: '0.5rem' }}>90°</span>
                  </button>
                  <button
                    type="button"
                    className={`sj-compass-dir-node sj-dir-se${selectedDirection.id === 'agneya' ? ' active' : ''}`}
                    onClick={() => setSelectedDirection(VEDIC_DIRECTIONS.find((d) => d.id === 'agneya')!)}
                    title="आग्नेय (South-East) - Agni"
                  >
                    <span>आ</span>
                  </button>
                  <button
                    type="button"
                    className={`sj-compass-dir-node sj-dir-s${selectedDirection.id === 'dakshina' ? ' active' : ''}`}
                    onClick={() => {
                      setSelectedDirection(VEDIC_DIRECTIONS.find((d) => d.id === 'dakshina')!);
                      setActiveDirectionFilter('south');
                    }}
                    title="दक्षिण (South) - Yama"
                  >
                    <span>द</span>
                    <span style={{ fontSize: '0.5rem' }}>180°</span>
                  </button>
                  <button
                    type="button"
                    className={`sj-compass-dir-node sj-dir-sw${selectedDirection.id === 'nairrtya' ? ' active' : ''}`}
                    onClick={() => setSelectedDirection(VEDIC_DIRECTIONS.find((d) => d.id === 'nairrtya')!)}
                    title="नैऋत्य (South-West) - Nirriti"
                  >
                    <span>नै</span>
                  </button>
                  <button
                    type="button"
                    className={`sj-compass-dir-node sj-dir-w${selectedDirection.id === 'pascima' ? ' active' : ''}`}
                    onClick={() => {
                      setSelectedDirection(VEDIC_DIRECTIONS.find((d) => d.id === 'pascima')!);
                      setActiveDirectionFilter('west');
                    }}
                    title="पश्चिम (West) - Varuna"
                  >
                    <span>प</span>
                    <span style={{ fontSize: '0.5rem' }}>270°</span>
                  </button>
                  <button
                    type="button"
                    className={`sj-compass-dir-node sj-dir-nw${selectedDirection.id === 'vayavya' ? ' active' : ''}`}
                    onClick={() => setSelectedDirection(VEDIC_DIRECTIONS.find((d) => d.id === 'vayavya')!)}
                    title="वायव्य (North-West) - Vayu"
                  >
                    <span>वा</span>
                  </button>
                </div>

                <div className="sj-compass-active-info">
                  <div className="sj-cai-head">
                    <span className="sj-cai-title">{selectedDirection.nameSa}</span>
                    <span className="sj-cai-meta">
                      {selectedDirection.degree}° · {selectedDirection.dikpala}
                    </span>
                  </div>
                  <p className="sj-cai-desc">{selectedDirection.summary}</p>
                </div>
              </div>

              {/* ACTIVE LANDMARK CARD */}
              <div className="sj-active-landmark-card">
                <div className="sj-alc-kicker">Selected Landmark from Map</div>
                <div className="sj-alc-name">{selectedCheckpoint.nameSa}</div>
                <div className="sj-alc-loc">{selectedCheckpoint.modernLocation}</div>
                <p className="sj-alc-desc">{selectedCheckpoint.desc}</p>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 2: THE 4 EXPEDITIONS SPOTLIGHT
            =================================================================== */}
        {activeTab === 'expeditions' && (
          <div className="sj-expeditions-grid">
            {SUGRIVA_EXPEDITIONS.map((exp) => (
              <article key={exp.id} className={`sj-exp-card theme-${exp.id}`}>
                <div className="sj-exp-header">
                  <div className="sj-exp-kicker-row">
                    <span className={`sj-exp-dir-tag ${exp.id}`}>{exp.directionEn.split('·')[0]}</span>
                    <span className="sj-exp-sarga">{exp.sargaCitation.split('·')[1]}</span>
                  </div>
                  <h3 className="sj-exp-title">{exp.directionSa}</h3>
                  <p className="sj-exp-commander-lead">
                    <strong>Leader:</strong> {exp.commander} ({exp.squadStrength})
                  </p>
                </div>

                <div className="sj-exp-body">
                  <p className="sj-exp-brief">{exp.brief}</p>

                  <div className="sj-shloka-box">
                    <div className="sj-shloka-sa">{exp.shlokaSa}</div>
                    <div className="sj-shloka-translit">{exp.shlokaTranslit}</div>
                    <p className="sj-shloka-meaning">{exp.shlokaMeaning}</p>
                  </div>

                  <div className="sj-checkpoints-list">
                    <strong style={{ fontSize: '0.8rem', color: '#f8fafc', textTransform: 'uppercase' }}>
                      Key Geographic Route:
                    </strong>
                    {exp.checkpoints.map((cp) => (
                      <div key={cp.id} className="sj-cp-item">
                        <span className={`sj-cp-dot ${exp.id}`} />
                        <div className="sj-cp-text-wrap">
                          <strong>{cp.nameSa}</strong>
                          <span>{cp.modernLocation}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="sj-terminal-highlight">
                    <div className="sj-terminal-title">Terminal Peak: {exp.terminalLandmark.nameSa}</div>
                    <p className="sj-terminal-desc">{exp.terminalLandmark.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* ===================================================================
            TAB 3: LANDMARK QUESTS (16 RIDDLES)
            =================================================================== */}
        {activeTab === 'quests' && (
          <div>
            <div className="sj-quest-section-header">
              <div className="sj-quest-progress-box">
                <div className="sj-progress-info">
                  <span className="sj-progress-label">Quests Solved</span>
                  <span className="sj-progress-count">
                    {solvedCount} / {totalQuests}
                  </span>
                </div>
                <div className="sj-progress-bar-wrap" role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100}>
                  <div className="sj-progress-bar-fill" style={{ width: `${progressPercent}%` }} />
                </div>
                <button type="button" className="sj-badge-reset-btn" onClick={handleResetProgress}>
                  Reset Progress
                </button>
              </div>

              <div className="sj-map-filter-group" role="group" aria-label="Filter Quests by Direction">
                <button
                  type="button"
                  className={`sj-filter-chip${questDirectionFilter === 'all' ? ' active' : ''}`}
                  onClick={() => setQuestDirectionFilter('all')}
                >
                  All (16)
                </button>
                <button
                  type="button"
                  className={`sj-filter-chip${questDirectionFilter === 'east' ? ' active' : ''}`}
                  onClick={() => setQuestDirectionFilter('east')}
                >
                  East (4)
                </button>
                <button
                  type="button"
                  className={`sj-filter-chip${questDirectionFilter === 'south' ? ' active' : ''}`}
                  onClick={() => setQuestDirectionFilter('south')}
                >
                  South (4)
                </button>
                <button
                  type="button"
                  className={`sj-filter-chip${questDirectionFilter === 'west' ? ' active' : ''}`}
                  onClick={() => setQuestDirectionFilter('west')}
                >
                  West (4)
                </button>
                <button
                  type="button"
                  className={`sj-filter-chip${questDirectionFilter === 'north' ? ' active' : ''}`}
                  onClick={() => setQuestDirectionFilter('north')}
                >
                  North (4)
                </button>
              </div>
            </div>

            <div className="sj-quests-grid">
              {displayedQuests.map((quest) => {
                const userChoice = solvedQuests[quest.id];
                const isAnswered = typeof userChoice === 'number';
                const isCorrect = userChoice === quest.correctOptionIndex;

                return (
                  <article key={quest.id} className={`sj-quest-card${isCorrect ? ' solved' : ''}`}>
                    <div className="sj-quest-top-bar">
                      <span className="sj-quest-num-badge">
                        Quest {quest.questNumber} · {quest.direction.toUpperCase()}
                      </span>
                      <span className="sj-quest-source">{quest.shlokaSource}</span>
                    </div>

                    <h3 className="sj-quest-title-sa">{quest.titleSa}</h3>
                    <div className="sj-quest-title-en">{quest.titleEn}</div>

                    <div className="sj-quest-shloka-card">
                      <div className="sj-q-shloka-sa">{quest.shlokaSa}</div>
                      <div className="sj-q-shloka-translit">{quest.shlokaTranslit}</div>
                    </div>

                    <p className="sj-quest-prompt">{quest.questionText}</p>

                    <div className="sj-options-stack" role="radiogroup" aria-label="Quest options">
                      {quest.options.map((opt, idx) => {
                        let btnClass = 'sj-option-btn';
                        if (isAnswered) {
                          if (idx === quest.correctOptionIndex) {
                            btnClass += ' selected-correct';
                          } else if (idx === userChoice) {
                            btnClass += ' selected-wrong';
                          }
                        }

                        return (
                          <button
                            key={idx}
                            type="button"
                            className={btnClass}
                            onClick={() => handleSelectOption(quest.id, idx)}
                            disabled={isCorrect}
                            role="radio"
                            aria-checked={userChoice === idx}
                          >
                            <span>{opt}</span>
                            {isAnswered && idx === quest.correctOptionIndex && (
                              <span className="sj-option-status-tag correct">Correct</span>
                            )}
                            {isAnswered && idx === userChoice && idx !== quest.correctOptionIndex && (
                              <span className="sj-option-status-tag wrong">Incorrect</span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {isAnswered && (
                      <div className="sj-quest-feedback-box">
                        {isCorrect && (
                          <div className="sj-badge-celebration-pill">
                            <CheckIcon />
                            <span>Explorer Badge Earned: {quest.badgeEarned}</span>
                          </div>
                        )}
                        <p className="sj-feedback-explanation">{quest.explanation}</p>
                        <div className="sj-grammar-callout">
                          <strong>Sanskrit Grammar Note:</strong> {quest.sanskritGrammarNote}
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>

            {/* BADGES VAULT DISPLAY */}
            <div className="sj-badges-vault">
              <div className="sj-bv-title">
                <span>Vānara Senānī Explorer Badges Vault ({solvedCount} of {totalQuests})</span>
                <ShieldIcon />
              </div>
              <div className="sj-badges-grid">
                {LANDMARK_QUESTS.map((q) => {
                  const unlocked = solvedQuests[q.id] === q.correctOptionIndex;
                  return (
                    <div key={q.id} className={`sj-badge-chip${unlocked ? ' unlocked' : ''}`}>
                      <div className="sj-badge-icon-box">
                        {unlocked ? <CheckIcon /> : <CrossIcon />}
                      </div>
                      <span>{q.badgeEarned}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 4: ANCIENT GEODESY & BHUGOLA
            =================================================================== */}
        {activeTab === 'geodesy' && (
          <article className="sj-geodesy-article">
            <div className="sj-article-kicker">Indian Knowledge Systems (IKS) · Bhūgola-Vidyā</div>
            <h2 className="sj-article-title">The Scientific Geodesy of Vālmīki Rāmāyaṇa</h2>

            <p className="sj-article-lead">
              Centuries before modern satellite cartography, the <em>Kiṣkindhā-Kāṇḍa</em> preserved a rigorous, 
              hemispheric understanding of continental landmasses, trade corridors, and oceanic boundaries. 
              When Śrī Rāma marveled at Sugrīva&apos;s encyclopedic mastery of the earth, Sugrīva explained that 
              fleeing across all oceans and mountain barriers while being pursued by Vālī made him personally map 
              every kingdom, river mouth, and continental edge.
            </p>

            <div className="sj-grid-2col">
              <div className="sj-info-tile">
                <h4 className="sj-info-tile-h4">1. The Four Terminal Peaks (चत्वारः सीमान्त-पर्वताः)</h4>
                <p>
                  Sugrīva defines the limits of human traversal through four monumental horizon mountains: 
                  <strong> Udayagiri</strong> (Eastern Dawn Mountain), <strong>Mahendragiri</strong> (Southern Promontory), 
                  <strong> Astagiri</strong> (Western Sunset Mountain), and <strong>Mount Meru</strong> (Northern Axis). 
                  These correspond directly to the solar quadrant boundaries standardized later by Āryabhaṭa and Bhāskarācārya.
                </p>
              </div>

              <div className="sj-info-tile">
                <h4 className="sj-info-tile-h4">2. Maritime Trade Corridors to Southeast Asia</h4>
                <p>
                  The explicit mention of <strong>Yavadvīpa</strong> (Java) with its seven kingdoms, Suvarṇadvīpa (Sumatra), 
                  and the Lohita Sāgara proves that ancient Indian mariners had charted regular trans-oceanic monsoon 
                  routes across the Bay of Bengal into the Indonesian archipelago long before Western navigators reached these waters.
                </p>
              </div>

              <div className="sj-info-tile">
                <h4 className="sj-info-tile-h4">3. Trans-Himalayan Migration Corridors</h4>
                <p>
                  The Northern party describes the narrow <strong>Krauñca-randhra</strong> defile, Lake Mānasa (Manasarovar), 
                  and the petrifying waters of river Śailodā in the Tarim basin. It records the Arctic phenomenon of perpetual 
                  sunlight during summer in <strong>Uttarakuru</strong>, reflecting firsthand observations by early Himalayan explorers.
                </p>
              </div>

              <div className="sj-info-tile">
                <h4 className="sj-info-tile-h4">4. Peninsular Precision of the South</h4>
                <p>
                  The southern traversal aligns step-by-step with peninsular geography: Vindhya range, Narmada, Godavari, 
                  Krishna, Kaveri delta, sandalwood-rich Malaya hills, and the exact coastal promontory of Mahendragiri 
                  where the land narrows to meet the southern ocean toward Lanka.
                </p>
              </div>
            </div>

            <h3 style={{ color: '#ffffff', fontSize: '1.2rem', fontWeight: 800, marginTop: '2rem' }}>
              Textual Geography vs. Modern Geographic Concordance
            </h3>

            <div className="sj-comparison-table-wrap">
              <table className="sj-comparison-table">
                <thead>
                  <tr>
                    <th>Direction &amp; Sarga</th>
                    <th>Commander</th>
                    <th>Epic Landmark in Sanskrit</th>
                    <th>Modern Geographic Identification</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>East</strong> · Sarga 40</td>
                    <td>Vinata (विनतः)</td>
                    <td>यवद्वीप (Yavadvīpa) &amp; सुवर्णद्वीप</td>
                    <td>Java, Sumatra &amp; Indonesian Archipelago</td>
                  </tr>
                  <tr>
                    <td><strong>East</strong> · Sarga 40</td>
                    <td>Vinata</td>
                    <td>उदयगिरि (Udayagiri) &amp; सौमनस</td>
                    <td>Far-Eastern Sunrise Meridian / Pacific Rim</td>
                  </tr>
                  <tr>
                    <td><strong>South</strong> · Sarga 41</td>
                    <td>Aṅgada &amp; Hanumān</td>
                    <td>विन्ध्य-नर्मदा &amp; कावेरी</td>
                    <td>Vindhya Rift Valley &amp; Kaveri Peninsular Delta</td>
                  </tr>
                  <tr>
                    <td><strong>South</strong> · Sarga 41</td>
                    <td>Aṅgada &amp; Hanumān</td>
                    <td>मलयगिरि &amp; महेन्द्रगिरि</td>
                    <td>Cardamom/Western Ghats &amp; Southernmost Cape</td>
                  </tr>
                  <tr>
                    <td><strong>West</strong> · Sarga 42</td>
                    <td>Suṣeṇa (सुषेणः)</td>
                    <td>सौराष्ट्र &amp; सिन्धु-सागर-सङ्गम</td>
                    <td>Gujarat Peninsula &amp; Indus River Delta</td>
                  </tr>
                  <tr>
                    <td><strong>West</strong> · Sarga 42</td>
                    <td>Suṣeṇa</td>
                    <td>अस्तगिरि (Mount Astagiri)</td>
                    <td>Western Sunset Mountain Rim / Arabian Sea</td>
                  </tr>
                  <tr>
                    <td><strong>North</strong> · Sarga 43</td>
                    <td>Śatabali (शतबलिः)</td>
                    <td>हिमवान्, कैलास &amp; क्रौञ्चरन्ध्र</td>
                    <td>Himalayas, Mt. Kailash &amp; Lipulekh/Mana High Pass</td>
                  </tr>
                  <tr>
                    <td><strong>North</strong> · Sarga 43</td>
                    <td>Śatabali</td>
                    <td>मेरु &amp; उत्तरकुरु (Uttarakuru)</td>
                    <td>Pamir Knot &amp; High Eurasian / Arctic Polar Region</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>
        )}
      </main>
    </div>
  );
};

export default SugrivaJourneyStudio;
