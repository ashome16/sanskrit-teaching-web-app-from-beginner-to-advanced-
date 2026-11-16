import React, { useState, useEffect } from 'react';
import {
  SUGRIVA_EXPEDITIONS,
  LANDMARK_QUESTS,
  COLLECTIBLE_CARDS_DECK,
  DIRECTION_RELICS,
  type CollectibleCard,
  type CardSuit,
} from '../data/sugrivaJourneyData';
import '../styles/sugriva-journey.css';

interface SugrivaStudioProps {
  onGoHome?: () => void;
  onOpenGamesHub?: () => void;
  onOpenIks?: () => void;
  onPlayAudio?: (text: string) => void;
}

type StudioTab = 'stage' | 'binder' | 'expeditions' | 'quests' | 'geodesy';

export const SugrivaJourneyStudio: React.FC<SugrivaStudioProps> = ({
  onGoHome,
  onOpenGamesHub,
  onOpenIks,
}) => {
  const [activeTab, setActiveTab] = useState<StudioTab>('stage');
  const [activeDirectionFilter] = useState<'all' | 'east' | 'south' | 'west' | 'north'>('all');

  // ---------------- Travel Stamina & Gameplay State ----------------
  const [travelStamina, setTravelStamina] = useState<number>(() => {
    if (typeof window === 'undefined') return 100;
    try {
      const saved = localStorage.getItem('sugriva-journey-stamina');
      return saved ? parseInt(saved, 10) : 100;
    } catch {
      return 100;
    }
  });

  // Collected Cards Deck (Set of card IDs: 'card-01' through 'card-12')
  const [collectedCardIds, setCollectedCardIds] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('sugriva-journey-collected-cards');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Vanara Scout Position on Board (starts at Kishkindha: x: 430, y: 390)
  const [scoutPos, setScoutPos] = useState<{ x: number; y: number; label: string }>({
    x: 430,
    y: 390,
    label: 'Kiṣkindhā Basecamp',
  });

  // Active Card Modal State
  const [modalCard, setModalCard] = useState<CollectibleCard | null>(null);
  const [modalCardFlipped, setModalCardFlipped] = useState<boolean>(false);
  const [modalSelectedOption, setModalSelectedOption] = useState<number | null>(null);
  const [staminaNotice, setStaminaNotice] = useState<string>('');

  // Folio Binder Filter
  const [folioSuitFilter, setFolioSuitFilter] = useState<CardSuit | 'all'>('all');
  const [binderCardFlipped, setBinderCardFlipped] = useState<Record<string, boolean>>({});

  // Quests solving state
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

  // Persistence
  useEffect(() => {
    try {
      localStorage.setItem('sugriva-journey-stamina', travelStamina.toString());
    } catch {
      // Ignore write errors
    }
  }, [travelStamina]);

  useEffect(() => {
    try {
      localStorage.setItem('sugriva-journey-collected-cards', JSON.stringify(collectedCardIds));
    } catch {
      // Ignore write errors
    }
  }, [collectedCardIds]);

  useEffect(() => {
    try {
      localStorage.setItem('sugriva-journey-solved-quests', JSON.stringify(solvedQuests));
    } catch {
      // Ignore write errors
    }
  }, [solvedQuests]);

  // Relic Unlocks Check
  const isSuitComplete = (suit: CardSuit) => {
    const cardsInSuit = COLLECTIBLE_CARDS_DECK.filter((c) => c.suit === suit);
    return cardsInSuit.every((c) => collectedCardIds.includes(c.id));
  };

  const unlockedRelics = {
    dakshina: isSuitComplete('dakshina'),
    purva: isSuitComplete('purva'),
    paschima: isSuitComplete('paschima'),
    uttara: isSuitComplete('uttara'),
  };

  // Rest at Ashram
  const handleRestAtAshram = () => {
    setTravelStamina(100);
    setScoutPos({ x: 430, y: 390, label: 'Kiṣkindhā Basecamp' });
    setStaminaNotice('Stamina restored to 100! Sage blessings replenish your journey.');
    setTimeout(() => setStaminaNotice(''), 4000);
  };

  // Click on a Map Trail Node
  const handleNodeClick = (card: CollectibleCard) => {
    const isCollected = collectedCardIds.includes(card.id);
    const hasRelicFastTravel = unlockedRelics[card.suit];
    const cost = hasRelicFastTravel ? 0 : card.staminaCost;

    if (!isCollected && travelStamina < cost) {
      setStaminaNotice(
        `Low Stamina! This difficult terrain requires ${cost} stamina. Rest at Kiṣkindhā Basecamp to replenish.`
      );
      setTimeout(() => setStaminaNotice(''), 5000);
      return;
    }

    // Move Scout Token
    setScoutPos({
      x: card.mapNode.x,
      y: card.mapNode.y,
      label: card.name,
    });

    // Deduct stamina if not already collected and no relic
    if (!isCollected && cost > 0) {
      setTravelStamina((prev) => Math.max(0, prev - cost));
    }

    // Open Card Modal
    setModalCard(card);
    setModalCardFlipped(isCollected);
    setModalSelectedOption(null);
  };

  // Submit Answer in Mystery Card Modal
  const handleModalOptionChoose = (optionIndex: number) => {
    if (!modalCard) return;
    setModalSelectedOption(optionIndex);

    if (optionIndex === modalCard.challenge.correctIndex) {
      // Mark as collected
      if (!collectedCardIds.includes(modalCard.id)) {
        setCollectedCardIds((prev) => [...prev, modalCard.id]);
      }
      // 3D Flip to back reveal
      setTimeout(() => {
        setModalCardFlipped(true);
      }, 700);
    }
  };

  const handleToggleCardFlipInModal = () => {
    setModalCardFlipped((prev) => !prev);
  };

  const handleToggleBinderCardFlip = (cardId: string) => {
    setBinderCardFlipped((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  const handleResetDeck = () => {
    if (window.confirm('Reset your collected cards and deck for Sugriva\'s Journey?')) {
      setCollectedCardIds([]);
      setTravelStamina(100);
      setScoutPos({ x: 430, y: 390, label: 'Kiṣkindhā Basecamp' });
    }
  };

  const handleSelectQuestOption = (questId: string, optionIndex: number) => {
    setSolvedQuests((prev) => ({
      ...prev,
      [questId]: optionIndex,
    }));
  };

  const handleResetQuests = () => {
    if (window.confirm('Reset your solved quests and badges for Sugriva\'s Journey?')) {
      setSolvedQuests({});
    }
  };

  // Metrics
  const collectedCardsCount = collectedCardIds.length;
  const totalDeckCards = COLLECTIBLE_CARDS_DECK.length;
  const solvedCount = Object.keys(solvedQuests).length;
  const totalQuests = LANDMARK_QUESTS.length;

  const staminaColorClass =
    travelStamina > 50 ? 'high' : travelStamina > 20 ? 'medium' : 'low';

  const displayedExpeditions =
    activeDirectionFilter === 'all'
      ? SUGRIVA_EXPEDITIONS
      : SUGRIVA_EXPEDITIONS.filter((e) => e.id === activeDirectionFilter);

  const displayedQuests =
    questDirectionFilter === 'all'
      ? LANDMARK_QUESTS
      : LANDMARK_QUESTS.filter((q) => q.direction === questDirectionFilter);

  const displayedFolioCards =
    folioSuitFilter === 'all'
      ? COLLECTIBLE_CARDS_DECK
      : COLLECTIBLE_CARDS_DECK.filter((c) => c.suit === folioSuitFilter);

  // Clean SVG Icons (Strictly ZERO EMOJIS)
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

  const CardsIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="7" width="16" height="14" rx="2" />
      <path d="M6 3h14a2 2 0 0 1 2 2v12" />
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

  const RefreshIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 2v6h6" />
      <path d="M21 12A9 9 0 0 0 6 5.3L3 8" />
      <path d="M21 22v-6h-6" />
      <path d="M3 12a9 9 0 0 0 15 6.7l3-2.7" />
    </svg>
  );

  const SatelliteIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m12.72-4.24a12 12 0 0 1 0 16.97m-16.96 0a12 12 0 0 1 0-16.97" />
    </svg>
  );

  return (
    <div className="sj-studio-container" role="main" aria-label="Sugriva's Global Directional Journey & Collectible Cards Studio">
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
            <span style={{ color: '#fbbf24', fontWeight: 700 }}>सुग्रीव-दिग्विजय · Sugrīva&apos;s Travel Quest</span>
          </nav>

          <div className="sj-hero-badge-wrap">
            <span className="sj-hero-kicker-badge">
              <span>Vālmīki Rāmāyaṇa · Kiṣkindhā-Kāṇḍa</span>
            </span>
            <span className="sj-hero-tag-pill">Collectible Travel Cards Game</span>
            <span className="sj-hero-tag-pill">3D Time-Shift Reveals</span>
            <span className="sj-hero-tag-pill">Aṣṭa-Diśā Geography</span>
          </div>

          <h1 className="sj-hero-title">
            सुग्रीव-दिग्विजय <span className="highlight-gold">· Sugrīva&apos;s Travel Quest</span>
          </h1>

          <p className="sj-hero-subtitle">
            Move your Vānara Scout along hand-illustrated trail nodes across the ancient world. 
            Solve poetic terrain riddles on Mystery Cards, flip them in 3D to reveal satellite counterparts and geological Time-Shifts, 
            and complete 4 cardinal suits to unlock legendary Direction Relics!
          </p>

          <div className="sj-hero-stats-bar">
            <div className="sj-stat-card">
              <span className="sj-stat-num" style={{ color: '#fbbf24' }}>
                {collectedCardsCount} / {totalDeckCards}
              </span>
              <span className="sj-stat-label">Cards in Collected Deck</span>
            </div>
            <div className="sj-stat-card">
              <span className="sj-stat-num">
                {Object.values(unlockedRelics).filter(Boolean).length} / 4
              </span>
              <span className="sj-stat-label">Direction Relics Unlocked</span>
            </div>
            <div className="sj-stat-card">
              <span className="sj-stat-num" style={{ color: travelStamina > 30 ? '#34d399' : '#f87171' }}>
                {travelStamina} / 100
              </span>
              <span className="sj-stat-label">Travel Stamina &amp; Rations</span>
            </div>
            <div className="sj-stat-card">
              <span className="sj-stat-num">
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
            className={`sj-tab-button${activeTab === 'stage' ? ' active' : ''}`}
            onClick={() => setActiveTab('stage')}
          >
            <MapIcon />
            <span>Parchment Travel Stage</span>
          </button>
          <button
            type="button"
            className={`sj-tab-button${activeTab === 'binder' ? ' active' : ''}`}
            onClick={() => setActiveTab('binder')}
          >
            <CardsIcon />
            <span>Folio Deck &amp; Relics</span>
            <span className="sj-tab-badge">{collectedCardsCount}/{totalDeckCards}</span>
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
            TAB 1: PARCHMENT TRAVEL STAGE (GRAPHIC GAMEPLAY)
            =================================================================== */}
        {activeTab === 'stage' && (
          <div>
            {/* Travel HUD: Stamina & Deck Quick Stats */}
            <div className="sj-travel-hud">
              <div className="sj-hud-stamina-wrap">
                <div className="sj-stamina-meter-box">
                  <div className="sj-stamina-label-row">
                    <span>Travel Stamina &amp; Ration</span>
                    <span className="sj-stamina-val-num">{travelStamina}/100</span>
                  </div>
                  <div className="sj-stamina-track" role="progressbar" aria-valuenow={travelStamina} aria-valuemin={0} aria-valuemax={100}>
                    <div className={`sj-stamina-fill ${staminaColorClass}`} style={{ width: `${travelStamina}%` }} />
                  </div>
                </div>

                <button
                  type="button"
                  className="sj-hud-action-btn"
                  onClick={handleRestAtAshram}
                  title="Rest at Kiṣkindhā Basecamp to restore Stamina to 100"
                >
                  <RefreshIcon />
                  <span>आश्रम-विरामः · Rest at Ashram</span>
                </button>
              </div>

              <div className="sj-hud-stamina-wrap">
                <button
                  type="button"
                  className="sj-deck-summary-pill"
                  onClick={() => setActiveTab('binder')}
                >
                  <CardsIcon />
                  <span>Collected Deck: {collectedCardsCount} / {totalDeckCards}</span>
                </button>
              </div>
            </div>

            {/* Stamina Notice Banner */}
            {staminaNotice && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1.5px solid #ef4444',
                color: '#fca5a5',
                borderRadius: '12px',
                padding: '0.85rem 1.25rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <span>{staminaNotice}</span>
                <button
                  type="button"
                  onClick={handleRestAtAshram}
                  style={{
                    background: '#ef4444',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0.3rem 0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Rest Now
                </button>
              </div>
            )}

            {/* Hand-Illustrated Parchment Stage */}
            <div className="sj-parchment-stage">
              <svg
                className="sj-stage-svg"
                viewBox="0 0 920 640"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Interactive Parchment Board with 12 Trail Nodes"
              >
                <defs>
                  <filter id="parchmentGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Ancient Meridian & Horizon Guides */}
                <line x1="60" y1="320" x2="860" y2="320" stroke="rgba(255, 255, 255, 0.08)" strokeDasharray="4 4" />
                <line x1="430" y1="40" x2="430" y2="600" stroke="rgba(245, 158, 11, 0.25)" strokeDasharray="6 4" />
                <text x="438" y="55" fill="#f59e0b" fontSize="9" fontWeight="800" opacity="0.75">
                  0° UJJAYINĪ PRIME MERIDIAN
                </text>

                {/* Trail Corridors Radiating from Kishkindha (x: 430, y: 390) */}
                {/* Dakshina (South) Trail */}
                <path d="M 430 390 L 430 340 L 440 440 L 450 550" className="sj-trail-path dakshina" />

                {/* Purva (East) Trail */}
                <path d="M 430 390 Q 500 320 570 260 T 670 310 T 790 380" className="sj-trail-path purva" />

                {/* Paschima (West) Trail */}
                <path d="M 430 390 Q 370 350 310 320 T 220 270 L 110 260" className="sj-trail-path paschima" />

                {/* Uttara (North) Trail */}
                <path d="M 430 390 L 450 160 L 460 95 L 470 35" className="sj-trail-path uttara" />

                {/* 12 Collectible Trail Nodes */}
                {COLLECTIBLE_CARDS_DECK.map((card) => {
                  const isCollected = collectedCardIds.includes(card.id);
                  const isCurrentScout = scoutPos.x === card.mapNode.x && scoutPos.y === card.mapNode.y;

                  return (
                    <g
                      key={card.id}
                      className="sj-board-node-g"
                      onClick={() => handleNodeClick(card)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Travel to ${card.name}`}
                    >
                      {/* Active Pulse Ring */}
                      {isCurrentScout && (
                        <circle
                          cx={card.mapNode.x}
                          cy={card.mapNode.y}
                          r="22"
                          fill="none"
                          stroke={card.suitColor}
                          strokeWidth="2"
                          opacity="0.8"
                        >
                          <animate attributeName="r" values="14;26;14" dur="2s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.9;0.2;0.9" dur="2s" repeatCount="indefinite" />
                        </circle>
                      )}

                      {/* Main Node Circle */}
                      <circle
                        cx={card.mapNode.x}
                        cy={card.mapNode.y}
                        r={isCollected ? 14 : 12}
                        className={`sj-node-ring${isCollected ? ' collected' : ''}`}
                        stroke={card.suitColor}
                      />

                      {/* Inner Emblem / Stamp */}
                      {isCollected ? (
                        <circle cx={card.mapNode.x} cy={card.mapNode.y} r="6" fill={card.suitColor} />
                      ) : (
                        <text
                          x={card.mapNode.x}
                          y={card.mapNode.y + 3.5}
                          textAnchor="middle"
                          fill="#f8fafc"
                          fontSize="9"
                          fontFamily="var(--sj-font-mono)"
                          fontWeight="800"
                        >
                          {card.cardNumber}
                        </text>
                      )}

                      {/* Node Label Text */}
                      <text
                        x={card.mapNode.x}
                        y={card.mapNode.y + 24}
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize="10"
                        fontWeight="700"
                        filter="drop-shadow(0 2px 4px rgba(0,0,0,0.9))"
                      >
                        {card.name}
                      </text>

                      {/* Stamina Cost Pill */}
                      {!isCollected && (
                        <text
                          x={card.mapNode.x}
                          y={card.mapNode.y - 18}
                          textAnchor="middle"
                          fill="#fbbf24"
                          fontSize="8.5"
                          fontFamily="var(--sj-font-mono)"
                          fontWeight="700"
                        >
                          -{card.staminaCost}⚡
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* ORIGIN: KISHKINDHA BASECAMP */}
                <g onClick={handleRestAtAshram} style={{ cursor: 'pointer' }}>
                  <circle cx="430" cy="390" r="18" fill="rgba(245, 158, 11, 0.25)" />
                  <circle cx="430" cy="390" r="10" fill="#f59e0b" stroke="#ffffff" strokeWidth="2.5" />
                  <text x="430" y="420" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="900" filter="drop-shadow(0 2px 4px #000)">
                    किष्किन्धा (Basecamp)
                  </text>
                </g>

                {/* ANIMATED VANARA SCOUT TOKEN */}
                <g
                  className="sj-vanara-token-g"
                  style={{
                    transform: `translate(${scoutPos.x}px, ${scoutPos.y}px)`,
                  }}
                >
                  <circle cx="0" cy="0" r="16" fill="rgba(245, 158, 11, 0.3)" className="sj-token-halo" />
                  {/* Clean SVG Vanara Scout Silhouette */}
                  <circle cx="0" cy="-6" r="6" fill="#f59e0b" stroke="#090d16" strokeWidth="1.5" />
                  <rect x="-4" y="0" width="8" height="10" rx="3" fill="#ea580c" />
                  <line x1="5" y1="-8" x2="7" y2="10" stroke="#fde68a" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="0" cy="0" r="1.5" fill="#ffffff" />
                </g>
              </svg>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 2: FOLIO BINDER VIEW & DECK SYNERGY RELICS
            =================================================================== */}
        {activeTab === 'binder' && (
          <div className="sj-folio-binder-section">
            <div className="sj-folio-header-row">
              <div className="sj-folio-title-wrap">
                <CardsIcon />
                <h3 className="sj-folio-h3">
                  Collected Cards Folio Deck ({collectedCardsCount} of {totalDeckCards})
                </h3>
              </div>

              <div className="sj-folio-filter-tabs" role="group" aria-label="Filter Folio by Suit">
                <button
                  type="button"
                  className={`sj-filter-chip${folioSuitFilter === 'all' ? ' active' : ''}`}
                  onClick={() => setFolioSuitFilter('all')}
                >
                  All Suits (12)
                </button>
                <button
                  type="button"
                  className={`sj-filter-chip${folioSuitFilter === 'dakshina' ? ' active' : ''}`}
                  onClick={() => setFolioSuitFilter('dakshina')}
                >
                  Dakshina ({COLLECTIBLE_CARDS_DECK.filter((c) => c.suit === 'dakshina' && collectedCardIds.includes(c.id)).length}/3)
                </button>
                <button
                  type="button"
                  className={`sj-filter-chip${folioSuitFilter === 'purva' ? ' active' : ''}`}
                  onClick={() => setFolioSuitFilter('purva')}
                >
                  Purva ({COLLECTIBLE_CARDS_DECK.filter((c) => c.suit === 'purva' && collectedCardIds.includes(c.id)).length}/3)
                </button>
                <button
                  type="button"
                  className={`sj-filter-chip${folioSuitFilter === 'paschima' ? ' active' : ''}`}
                  onClick={() => setFolioSuitFilter('paschima')}
                >
                  Paschima ({COLLECTIBLE_CARDS_DECK.filter((c) => c.suit === 'paschima' && collectedCardIds.includes(c.id)).length}/3)
                </button>
                <button
                  type="button"
                  className={`sj-filter-chip${folioSuitFilter === 'uttara' ? ' active' : ''}`}
                  onClick={() => setFolioSuitFilter('uttara')}
                >
                  Uttara ({COLLECTIBLE_CARDS_DECK.filter((c) => c.suit === 'uttara' && collectedCardIds.includes(c.id)).length}/3)
                </button>
                <button type="button" className="sj-badge-reset-btn" onClick={handleResetDeck}>
                  Reset Deck
                </button>
              </div>
            </div>

            {/* 4 Cardinal Direction Relic Cards (Synergy Unlocks) */}
            <div className="sj-relics-showcase-grid">
              {(['dakshina', 'purva', 'paschima', 'uttara'] as CardSuit[]).map((suitKey) => {
                const relic = DIRECTION_RELICS[suitKey];
                const isUnlocked = unlockedRelics[suitKey];

                return (
                  <div key={suitKey} className={`sj-relic-card${isUnlocked ? ' unlocked' : ''}`}>
                    <span className={`sj-relic-status-badge ${isUnlocked ? 'unlocked' : 'locked'}`}>
                      {isUnlocked ? 'Relic Unlocked · Fast Travel Active' : 'Locked · Collect All 3 Suit Cards'}
                    </span>
                    <h4 className="sj-relic-name">{relic.name}</h4>
                    <div style={{ fontSize: '0.82rem', color: relic.themeColor, fontWeight: 700, marginBottom: '0.35rem' }}>
                      {relic.nameSa}
                    </div>
                    <p className="sj-relic-desc">{relic.description}</p>
                    <div className="sj-relic-perk-pill">
                      <strong>Perk:</strong> {relic.fastTravelPerk}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Collected Cards Grid with 3D Flip */}
            <div className="sj-folio-cards-grid">
              {displayedFolioCards.map((card) => {
                const isCollected = collectedCardIds.includes(card.id);
                const isFlipped = binderCardFlipped[card.id] || false;

                return (
                  <div
                    key={card.id}
                    className="sj-binder-card-item"
                    onClick={() => handleToggleBinderCardFlip(card.id)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Toggle card ${card.name} 3D view`}
                  >
                    <div className={`sj-binder-card-inner${isFlipped ? ' is-flipped' : ''}`}>
                      {/* FRONT FACE */}
                      <div className="sj-binder-card-face sj-binder-card-front" style={{ borderColor: card.suitColor }}>
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: card.suitColor, textTransform: 'uppercase' }}>
                              {card.suit.toUpperCase()}
                            </span>
                            <span className="sj-cf-number-seal">{card.cardNumber}</span>
                          </div>
                          <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', margin: '0 0 0.25rem' }}>
                            {card.name}
                          </h4>
                          <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '0.75rem' }}>
                            {card.nameSa}
                          </div>

                          {/* Image preview or graphic canvas */}
                          <div style={{ height: '140px', borderRadius: '10px', overflow: 'hidden', background: '#0b1120', marginBottom: '0.75rem' }}>
                            {card.frontImage ? (
                              <img src={card.frontImage} alt={card.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: card.suitColor, fontSize: '0.85rem', fontWeight: 700, padding: '1rem', textAlign: 'center' }}>
                                {card.graphicDesc}
                              </div>
                            )}
                          </div>

                          <div style={{ background: '#fffbeb', color: '#78350f', padding: '0.65rem 0.85rem', borderRadius: '8px', fontSize: '0.76rem', fontStyle: 'italic', lineHeight: 1.4 }}>
                            &ldquo;{card.hint}&rdquo;
                          </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem', borderTop: '1px solid #1e293b' }}>
                          <span style={{ fontSize: '0.72rem', color: isCollected ? '#34d399' : '#64748b', fontWeight: 800 }}>
                            {isCollected ? 'COLLECTED' : 'UNCHARTED'}
                          </span>
                          <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Tap to Flip ➔</span>
                        </div>
                      </div>

                      {/* BACK FACE (Time-Shift Reveal) */}
                      <div className="sj-binder-card-face sj-binder-card-back" style={{ borderColor: card.suitColor }}>
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.72rem', color: '#38bdf8', fontWeight: 800 }}>
                              <SatelliteIcon /> TIME-SHIFT REVEAL
                            </span>
                            <span className="sj-cf-number-seal">{card.cardNumber}</span>
                          </div>

                          <div style={{ height: '120px', borderRadius: '10px', overflow: 'hidden', background: '#020617', marginBottom: '0.75rem' }}>
                            {card.backImage ? (
                              <img src={card.backImage} alt={`Satellite view of ${card.name}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8', fontSize: '0.8rem', padding: '0.75rem', textAlign: 'center' }}>
                                Satellite Topography · {card.modernMatch}
                              </div>
                            )}
                          </div>

                          <div style={{ background: 'rgba(2, 132, 199, 0.1)', border: '1px solid rgba(2, 132, 199, 0.3)', borderRadius: '6px', padding: '0.5rem', marginBottom: '0.5rem' }}>
                            <span style={{ display: 'block', fontSize: '0.65rem', textTransform: 'uppercase', color: '#38bdf8', fontWeight: 800 }}>
                              Modern Match
                            </span>
                            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ffffff' }}>
                              {card.modernMatch}
                            </span>
                          </div>

                          <div style={{ background: '#0b1120', border: '1px solid #1e293b', borderRadius: '6px', padding: '0.5rem' }}>
                            <span style={{ display: 'block', fontSize: '0.65rem', color: '#fbbf24', fontWeight: 800 }}>
                              Why It Changed?
                            </span>
                            <p style={{ fontSize: '0.74rem', color: '#cbd5e1', margin: 0, lineHeight: 1.4 }}>
                              {card.whyItChanged}
                            </p>
                          </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem', borderTop: '1px solid #1e293b' }}>
                          <span className="sj-collected-seal">
                            <CheckIcon /> In Deck
                          </span>
                          <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Tap to Flip ➔</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 3: THE 4 EXPEDITIONS SPOTLIGHT
            =================================================================== */}
        {activeTab === 'expeditions' && (
          <div className="sj-expeditions-grid">
            {displayedExpeditions.map((exp) => (
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
            TAB 4: LANDMARK QUESTS (16 RIDDLES)
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
                <div className="sj-progress-bar-wrap" role="progressbar" aria-valuenow={Math.round((solvedCount / totalQuests) * 100)} aria-valuemin={0} aria-valuemax={100}>
                  <div className="sj-progress-bar-fill" style={{ width: `${Math.round((solvedCount / totalQuests) * 100)}%` }} />
                </div>
                <button type="button" className="sj-badge-reset-btn" onClick={handleResetQuests}>
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
                            onClick={() => handleSelectQuestOption(quest.id, idx)}
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
            TAB 5: ANCIENT GEODESY & BHUGOLA
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

      {/* ===================================================================
          3D MYSTERY & COLLECTIBLE CARD MODAL
          =================================================================== */}
      {modalCard && (
        <div className="sj-card-modal-backdrop" onClick={() => setModalCard(null)}>
          <div className="sj-card-modal-container" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="sj-modal-close-btn"
              onClick={() => setModalCard(null)}
              aria-label="Close Card View"
            >
              <CrossIcon />
            </button>

            <div className="sj-3d-card-stage">
              <div className={`sj-3d-card-inner${modalCardFlipped ? ' is-flipped' : ''}`}>
                {/* ---------------- FRONT FACE ---------------- */}
                <div className={`sj-card-face sj-card-front ${modalCard.suit}`}>
                  <div className="sj-cf-header">
                    <div className={`sj-cf-suit-badge ${modalCard.suit}`}>
                      <CompassIcon />
                      <span>{modalCard.suitName}</span>
                    </div>
                    <span className="sj-cf-number-seal">{modalCard.cardNumber}</span>
                  </div>

                  <div className="sj-cf-visual-wrap">
                    {modalCard.frontImage ? (
                      <img
                        src={modalCard.frontImage}
                        alt={modalCard.name}
                        className="sj-cf-visual-img"
                      />
                    ) : (
                      <div className="sj-cf-visual-canvas-fallback">
                        <div className="sj-cf-fallback-icon">
                          <CompassIcon />
                        </div>
                        <span style={{ fontSize: '0.85rem', color: '#ffffff', fontWeight: 700 }}>
                          {modalCard.graphicDesc}
                        </span>
                      </div>
                    )}
                    <div className="sj-cf-name-scroll">
                      {modalCard.name}
                    </div>
                  </div>

                  <div className="sj-cf-bottom">
                    <div className="sj-cf-hint-scroll">
                      &ldquo;{modalCard.hint}&rdquo;
                    </div>

                    <div className="sj-cf-challenge-wrap">
                      <div style={{ fontSize: '0.78rem', color: '#cbd5e1', fontWeight: 700, marginBottom: '0.2rem' }}>
                        Travel Riddle: {modalCard.challenge.question}
                      </div>

                      {modalCard.challenge.options.map((opt, optIdx) => {
                        const isChosen = modalSelectedOption === optIdx;
                        const isCorrect = optIdx === modalCard.challenge.correctIndex;

                        return (
                          <button
                            key={optIdx}
                            type="button"
                            className={`sj-challenge-btn${isChosen && isCorrect ? ' correct' : ''}`}
                            onClick={() => handleModalOptionChoose(optIdx)}
                            disabled={collectedCardIds.includes(modalCard.id)}
                          >
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {collectedCardIds.includes(modalCard.id) && (
                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.75rem' }}>
                        <button
                          type="button"
                          className="sj-flip-toggle-btn"
                          onClick={handleToggleCardFlipInModal}
                        >
                          Flip to Time-Shift Reveal ➔
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* ---------------- BACK FACE: TIME-SHIFT REVEAL ---------------- */}
                <div className={`sj-card-face sj-card-back ${modalCard.suit}`}>
                  <div className="sj-cb-header">
                    <div className="sj-cb-title-wrap">
                      <SatelliteIcon />
                      <div>
                        <span className="sj-cb-title">Time-Shift Reveal</span>
                        <span className="sj-cb-subtitle">Ancient Land ➔ Modern Geography</span>
                      </div>
                    </div>
                    <span className="sj-cf-number-seal">{modalCard.cardNumber}</span>
                  </div>

                  <div className="sj-cb-visual-wrap">
                    {modalCard.backImage ? (
                      <img
                        src={modalCard.backImage}
                        alt={`Satellite view of ${modalCard.name}`}
                        className="sj-cb-visual-img"
                      />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020617', color: '#38bdf8', padding: '1rem', textAlign: 'center', fontSize: '0.82rem', fontWeight: 700 }}>
                        Satellite Topography View · {modalCard.satelliteTag}
                      </div>
                    )}
                  </div>

                  <div className="sj-cb-body">
                    <div>
                      <div className="sj-cb-match-box">
                        <span className="sj-cb-match-kicker">Modern Match</span>
                        <div className="sj-cb-match-val">{modalCard.modernMatch}</div>
                      </div>

                      <div className="sj-cb-why-box">
                        <span className="sj-cb-why-kicker">Why It Changed?</span>
                        <p className="sj-cb-why-text">{modalCard.whyItChanged}</p>
                      </div>
                    </div>

                    <div className="sj-cb-footer-bar">
                      <span className="sj-collected-seal">
                        <CheckIcon /> Collected to Deck!
                      </span>
                      <button
                        type="button"
                        className="sj-flip-toggle-btn"
                        onClick={handleToggleCardFlipInModal}
                      >
                        Flip to Clue ➔
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SugrivaJourneyStudio;
