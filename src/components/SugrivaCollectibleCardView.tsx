import React from 'react';
import type { CollectibleCard } from '../data/sugrivaJourneyData';

interface CardViewProps {
  card: CollectibleCard;
  isBack?: boolean;
}

// Direction initial map
const SUIT_INITIALS: Record<string, string> = {
  dakshina: 'S',
  purva: 'E',
  paschima: 'W',
  uttara: 'N',
};

const SUIT_NAMES: Record<string, { title: string; subtitle: string; theme: string }> = {
  dakshina: { title: 'Dakshina', subtitle: 'The Southern Trail', theme: '#059669' },
  purva: { title: 'Purva', subtitle: 'The Eastern Trail', theme: '#d97706' },
  paschima: { title: 'Paschima', subtitle: 'The Western Trail', theme: '#ea580c' },
  uttara: { title: 'Uttara', subtitle: 'The Northern Trail', theme: '#0284c7' },
};

/**
 * Procedural Art Landscape SVGs for Cards 04-12
 */
const ThematicTerrainArt: React.FC<{ cardId: string }> = ({ cardId }) => {
  switch (cardId) {
    case 'card-04': // Magadha Plains (Middle Gangetic Plain)
      return (
        <svg viewBox="0 0 400 240" className="sj-procedural-svg" aria-label="Magadha alluvial plains and riverboats">
          <defs>
            <linearGradient id="sky04" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="40%" stopColor="#fed7aa" />
              <stop offset="100%" stopColor="#86efac" />
            </linearGradient>
            <linearGradient id="ganga" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>
          <rect width="400" height="240" fill="url(#sky04)" />
          {/* Distant alluvial floodplains */}
          <path d="M 0 140 Q 120 120 240 135 T 400 130 L 400 240 L 0 240 Z" fill="#15803d" opacity="0.85" />
          {/* Winding Ganga River */}
          <path d="M 0 170 Q 150 150 250 180 T 400 160 L 400 240 L 0 240 Z" fill="url(#ganga)" />
          {/* Ancient Riverboat */}
          <path d="M 170 185 Q 210 185 240 180 Q 230 195 180 195 Z" fill="#78350f" />
          <line x1="205" y1="185" x2="205" y2="155" stroke="#78350f" strokeWidth="2.5" />
          <polygon points="205,158 230,170 205,178" fill="#fef3c7" opacity="0.9" />
          {/* Vanara Scout on Riverbank Overlook */}
          <path d="M 50 160 Q 90 150 130 180 L 130 240 L 0 240 L 0 190 Z" fill="#166534" />
          <circle cx="85" cy="155" r="7" fill="#ea580c" />
          <rect x="82" y="162" width="6" height="12" rx="2" fill="#c2410c" />
          <line x1="90" y1="156" x2="92" y2="175" stroke="#fbbf24" strokeWidth="2" />
        </svg>
      );

    case 'card-05': // Ganga-Sagara Maze (Sundarbans Delta)
      return (
        <svg viewBox="0 0 400 240" className="sj-procedural-svg" aria-label="Sundarbans mangrove delta labyrinth">
          <defs>
            <linearGradient id="sky05" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#bae6fd" />
              <stop offset="100%" stopColor="#0f766e" />
            </linearGradient>
          </defs>
          <rect width="400" height="240" fill="url(#sky05)" />
          {/* Braided delta tidal channels */}
          <path d="M 0 130 C 80 120 120 160 200 140 C 280 120 320 150 400 135 L 400 240 L 0 240 Z" fill="#0284c7" />
          {/* Mangrove islands */}
          <path d="M 20 150 Q 80 140 120 170 Q 70 190 20 175 Z" fill="#14532d" />
          <path d="M 160 160 Q 230 145 280 165 Q 250 190 170 180 Z" fill="#15803d" />
          <path d="M 290 140 Q 360 135 390 160 Q 340 180 295 160 Z" fill="#14532d" />
          {/* Mangrove stilt roots silhouette */}
          <line x1="60" y1="165" x2="50" y2="185" stroke="#713f12" strokeWidth="2" />
          <line x1="75" y1="168" x2="80" y2="190" stroke="#713f12" strokeWidth="2" />
          <line x1="200" y1="165" x2="195" y2="185" stroke="#713f12" strokeWidth="2" />
          {/* Scout on Overlook Tree */}
          <circle cx="340" cy="135" r="7" fill="#ea580c" />
          <rect x="337" y="142" width="6" height="12" rx="2" fill="#c2410c" />
        </svg>
      );

    case 'card-06': // Yavadvipa Isle (Java & Sumatra)
      return (
        <svg viewBox="0 0 400 240" className="sj-procedural-svg" aria-label="Volcanic peaks of Yavadvipa">
          <defs>
            <linearGradient id="sky06" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="40%" stopColor="#fdba74" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>
          <rect width="400" height="240" fill="url(#sky06)" />
          {/* Twin Volcanoes */}
          <polygon points="120,80 40,210 200,210" fill="#475569" />
          <polygon points="260,95 190,210 330,210" fill="#334155" />
          {/* Volcanic Smoke plumes */}
          <path d="M 120 78 Q 115 50 135 35 Q 120 20 130 10" stroke="rgba(255,255,255,0.7)" strokeWidth="4" fill="none" strokeLinecap="round" />
          {/* Ocean Waves */}
          <rect x="0" y="180" width="400" height="60" fill="#0369a1" />
          <path d="M 0 190 Q 50 185 100 190 T 200 190 T 300 190 T 400 190 L 400 240 L 0 240 Z" fill="#0284c7" opacity="0.8" />
          {/* Scout on Coastal Rocks */}
          <path d="M 0 180 Q 50 170 80 240 L 0 240 Z" fill="#1e293b" />
          <circle cx="45" cy="180" r="7" fill="#ea580c" />
          <rect x="42" y="187" width="6" height="12" rx="2" fill="#c2410c" />
        </svg>
      );

    case 'card-07': // Saurashtra Harbor (Gulf of Kutch & Tidal Bays)
      return (
        <svg viewBox="0 0 400 240" className="sj-procedural-svg" aria-label="Saurashtra ancient stone wharf and salt flats">
          <defs>
            <linearGradient id="sky07" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffedd5" />
              <stop offset="60%" stopColor="#fed7aa" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>
          <rect width="400" height="240" fill="url(#sky07)" />
          {/* Tidal Sea & Salt flats */}
          <rect x="0" y="140" width="400" height="100" fill="#0284c7" />
          <path d="M 0 150 Q 100 135 250 155 T 400 145 L 400 180 L 0 180 Z" fill="#e2e8f0" opacity="0.75" />
          {/* Ancient Stone Wharf / Seawall */}
          <rect x="180" y="150" width="160" height="40" fill="#78350f" rx="3" />
          <rect x="190" y="145" width="40" height="8" fill="#92400e" />
          <rect x="250" y="145" width="40" height="8" fill="#92400e" />
          {/* Scout on Rampart */}
          <circle cx="210" cy="133" r="7" fill="#ea580c" />
          <rect x="207" y="140" width="6" height="11" rx="2" fill="#c2410c" />
          <line x1="215" y1="134" x2="217" y2="152" stroke="#fbbf24" strokeWidth="2" />
        </svg>
      );

    case 'card-08': // Sindhu Delta (Indus Estuary & Dunes)
      return (
        <svg viewBox="0 0 400 240" className="sj-procedural-svg" aria-label="Sindhu turquoise delta and dunes">
          <defs>
            <linearGradient id="sky08" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="50%" stopColor="#fed7aa" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>
          <rect width="400" height="240" fill="url(#sky08)" />
          {/* Rolling Desert Dunes */}
          <path d="M 0 120 Q 90 90 180 130 T 360 120 L 400 140 L 400 240 L 0 240 Z" fill="#f59e0b" />
          {/* Broad Turquoise Delta Channel */}
          <path d="M 0 170 Q 140 140 260 190 L 400 175 L 400 240 L 0 240 Z" fill="#06b6d4" />
          {/* Dune Crest Foreground */}
          <path d="M 0 200 Q 120 180 220 220 L 0 240 Z" fill="#d97706" />
          {/* Scout atop Dune */}
          <circle cx="160" cy="115" r="7" fill="#ea580c" />
          <rect x="157" y="122" width="6" height="11" rx="2" fill="#c2410c" />
        </svg>
      );

    case 'card-09': // Astachala Ridge (Sunset Peaks of the West)
      return (
        <svg viewBox="0 0 400 240" className="sj-procedural-svg" aria-label="Astachala western ridge and setting sun">
          <defs>
            <linearGradient id="sky09" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4c1d95" />
              <stop offset="40%" stopColor="#b91c1c" />
              <stop offset="70%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#fde047" />
            </linearGradient>
          </defs>
          <rect width="400" height="240" fill="url(#sky09)" />
          {/* Giant Setting Sun */}
          <circle cx="200" cy="150" r="55" fill="#fef08a" opacity="0.95" />
          {/* Sea Horizon */}
          <rect x="0" y="170" width="400" height="70" fill="#0f172a" />
          {/* Jagged Makran Ridge Silhouette */}
          <polygon points="0,240 0,165 60,130 110,160 170,120 220,155 300,105 360,150 400,135 400,240" fill="#090d16" />
          {/* Scout on Highest Ridge */}
          <circle cx="300" cy="95" r="7" fill="#f59e0b" />
          <rect x="297" y="102" width="6" height="11" rx="2" fill="#ea580c" />
          <line x1="305" y1="96" x2="307" y2="114" stroke="#fde68a" strokeWidth="2" />
        </svg>
      );

    case 'card-10': // Himavat Fortress (The Himalayas)
      return (
        <svg viewBox="0 0 400 240" className="sj-procedural-svg" aria-label="Himalayan towering snow peaks">
          <defs>
            <linearGradient id="sky10" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="50%" stopColor="#7dd3fc" />
              <stop offset="100%" stopColor="#f0f9ff" />
            </linearGradient>
          </defs>
          <rect width="400" height="240" fill="url(#sky10)" />
          {/* Mountain Peaks */}
          <polygon points="120,40 30,220 210,220" fill="#0f172a" />
          <polygon points="120,40 75,130 150,130" fill="#ffffff" />
          <polygon points="260,25 170,220 350,220" fill="#1e293b" />
          <polygon points="260,25 210,120 295,120" fill="#ffffff" />
          <polygon points="360,60 300,220 400,220" fill="#0f172a" />
          <polygon points="360,60 330,140 385,140" fill="#ffffff" />
          {/* Glacial Blue Lake */}
          <path d="M 0 190 Q 180 170 400 190 L 400 240 L 0 240 Z" fill="#38bdf8" />
          {/* Scout on Snowy Crest */}
          <circle cx="85" cy="180" r="7" fill="#ea580c" />
          <rect x="82" y="187" width="6" height="11" rx="2" fill="#c2410c" />
          <line x1="90" y1="181" x2="92" y2="200" stroke="#fbbf24" strokeWidth="2" />
        </svg>
      );

    case 'card-11': // Uttarakuru Steppe (Tibetan & Eurasian Steppes)
      return (
        <svg viewBox="0 0 400 240" className="sj-procedural-svg" aria-label="Uttarakuru endless grassland and steppe">
          <defs>
            <linearGradient id="sky11" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e3a8a" />
              <stop offset="40%" stopColor="#60a5fa" />
              <stop offset="80%" stopColor="#bfdbfe" />
            </linearGradient>
          </defs>
          <rect width="400" height="240" fill="url(#sky11)" />
          {/* Distant Snow Mountains */}
          <polygon points="60,110 20,150 100,150" fill="#e2e8f0" />
          <polygon points="160,95 110,150 210,150" fill="#ffffff" />
          <polygon points="290,105 240,150 340,150" fill="#e2e8f0" />
          {/* Rolling Golden Grassland */}
          <path d="M 0 140 Q 120 120 250 145 T 400 135 L 400 240 L 0 240 Z" fill="#ca8a04" />
          <path d="M 0 170 Q 160 150 300 175 T 400 165 L 400 240 L 0 240 Z" fill="#a16207" />
          {/* Sailoda River ribbon */}
          <path d="M 120 155 Q 220 175 350 240" stroke="#38bdf8" strokeWidth="5" fill="none" opacity="0.8" />
          {/* Scout Watching Horizon */}
          <circle cx="90" cy="145" r="7" fill="#ea580c" />
          <rect x="87" y="152" width="6" height="11" rx="2" fill="#c2410c" />
        </svg>
      );

    case 'card-12': // Somagiri Crown (Arctic Aurora Borealis)
      return (
        <svg viewBox="0 0 400 240" className="sj-procedural-svg" aria-label="Somagiri polar mountain and dancing aurora ribbons">
          <defs>
            <linearGradient id="sky12" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#030712" />
              <stop offset="60%" stopColor="#064e3b" />
              <stop offset="100%" stopColor="#022c22" />
            </linearGradient>
          </defs>
          <rect width="400" height="240" fill="url(#sky12)" />
          {/* Glowing Green & Violet Aurora Ribbons */}
          <path d="M 0 50 Q 100 20 200 60 T 400 30" stroke="#4ade80" strokeWidth="18" fill="none" opacity="0.65" strokeLinecap="round" />
          <path d="M 20 70 Q 140 40 260 80 T 400 50" stroke="#a855f7" strokeWidth="14" fill="none" opacity="0.55" strokeLinecap="round" />
          <path d="M 0 95 Q 120 65 240 105 T 400 75" stroke="#22d3ee" strokeWidth="10" fill="none" opacity="0.5" strokeLinecap="round" />
          {/* Somagiri Frozen Crystalline Peak */}
          <polygon points="200,80 80,240 320,240" fill="#0f172a" />
          <polygon points="200,80 150,150 250,150" fill="#e0f2fe" opacity="0.85" />
          {/* Floating Ice Shoals */}
          <rect x="0" y="210" width="400" height="30" fill="#020617" />
          <rect x="40" y="215" width="60" height="10" rx="3" fill="#bae6fd" opacity="0.7" />
          <rect x="280" y="218" width="80" height="8" rx="3" fill="#bae6fd" opacity="0.7" />
          {/* Scout Bathed in Aurora Light */}
          <circle cx="200" cy="70" r="7" fill="#4ade80" />
          <rect x="197" y="77" width="6" height="11" rx="2" fill="#15803d" />
        </svg>
      );

    default:
      return (
        <div style={{ width: '100%', height: '100%', background: '#0b1120', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
          Ancient Terrain View
        </div>
      );
  }
};

/**
 * Procedural Front Card Face for Cards 04-12
 */
export const ProceduralCardFront: React.FC<{ card: CollectibleCard }> = ({ card }) => {
  const suitMeta = SUIT_NAMES[card.suit] || { title: card.suit, subtitle: 'The Ancient Trail', theme: card.suitColor };
  const initial = SUIT_INITIALS[card.suit] || 'D';

  return (
    <div className={`sj-procedural-card-front sj-border-${card.suit}`}>
      {/* Top Header Pill */}
      <div className="sj-pcf-header">
        <div className="sj-pcf-compass-seal" style={{ borderColor: card.suitColor }}>
          <span className="sj-pcf-compass-initial">{initial}</span>
        </div>
        <div className="sj-pcf-title-block">
          <span className="sj-pcf-suit-title" style={{ color: card.suitColor }}>
            {suitMeta.title}
          </span>
          <span className="sj-pcf-suit-subtitle">{suitMeta.subtitle}</span>
        </div>
        <div className="sj-pcf-number-seal">{card.cardNumber}</div>
      </div>

      {/* Hanging Name Ribbon Banner */}
      <div className="sj-pcf-name-banner">
        <span className="sj-pcf-name-primary">{card.name}</span>
        <span className="sj-pcf-name-sa">{card.nameSa.split('(')[0].trim()}</span>
      </div>

      {/* Center Thematic Terrain Art */}
      <div className="sj-pcf-art-viewport">
        <ThematicTerrainArt cardId={card.id} />
      </div>

      {/* Bottom Clue Scroll */}
      <div className="sj-pcf-clue-scroll">
        <p className="sj-pcf-hint-text">&ldquo;{card.hint}&rdquo;</p>
        <div className="sj-pcf-lotus-ornament" aria-hidden="true">
          <svg width="28" height="14" viewBox="0 0 40 20" fill="none">
            <path d="M 20 2 C 16 9 12 14 6 16 C 12 17 17 14 20 18 C 23 14 28 17 34 16 C 28 14 24 9 20 2 Z" fill="#d97706" />
            <circle cx="20" cy="11" r="2" fill="#fbbf24" />
          </svg>
        </div>
      </div>
    </div>
  );
};

/**
 * Procedural Back Card Face: Time-Shift Reveal
 */
export const ProceduralCardBack: React.FC<{ card: CollectibleCard }> = ({ card }) => {
  return (
    <div className={`sj-procedural-card-back sj-border-${card.suit}`}>
      {/* Top Header */}
      <div className="sj-pcb-header">
        <div className="sj-pcb-satellite-crest">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="3" />
            <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m12.72-4.24a12 12 0 0 1 0 16.97m-16.96 0a12 12 0 0 1 0-16.97" />
          </svg>
        </div>
        <div className="sj-pcb-title-block">
          <span className="sj-pcb-main-title">Time-Shift Reveal</span>
          <span className="sj-pcb-subtitle">Ancient Land → Modern Geography</span>
        </div>
        <div className="sj-pcf-number-seal">{card.cardNumber}</div>
      </div>

      {/* Satellite Topography Graphic Area */}
      <div className="sj-pcb-satellite-viewport">
        <svg viewBox="0 0 360 160" className="sj-sat-viewport-svg" aria-label="Satellite elevation radar grid">
          <rect width="360" height="160" fill="#020617" />
          {/* Radar elevation contours */}
          <circle cx="180" cy="80" r="130" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="1" fill="none" />
          <circle cx="180" cy="80" r="90" stroke="rgba(56, 189, 248, 0.25)" strokeWidth="1" strokeDasharray="3 3" fill="none" />
          <circle cx="180" cy="80" r="50" stroke="rgba(56, 189, 248, 0.35)" strokeWidth="1" fill="none" />
          <circle cx="180" cy="80" r="20" stroke="#38bdf8" strokeWidth="1.5" fill="none" />
          {/* Crosshairs */}
          <line x1="180" y1="10" x2="180" y2="150" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="1" />
          <line x1="30" y1="80" x2="330" y2="80" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="1" />
          {/* Satellite tag overlay */}
          <text x="180" y="145" textAnchor="middle" fill="#38bdf8" fontSize="9.5" fontFamily="monospace" fontWeight="700">
            {card.satelliteTag}
          </text>
        </svg>
      </div>

      {/* Body Information */}
      <div className="sj-pcb-body">
        {/* Modern Match Pill */}
        <div className="sj-pcb-match-box">
          <span className="sj-pcb-match-label">Modern Match</span>
          <div className="sj-pcb-match-value">{card.modernMatch}</div>
        </div>

        {/* Why It Changed Box */}
        <div className="sj-pcb-why-box">
          <span className="sj-pcb-why-label">Why It Changed?</span>
          <p className="sj-pcb-why-text">{card.whyItChanged}</p>
        </div>

        {/* Bottom Seal Pill */}
        <div className="sj-pcb-collected-pill">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>Collected!</span>
        </div>
      </div>
    </div>
  );
};

/**
 * Universal Card Face Renderer:
 * If frontImage/backImage exist (Cards 01, 02, 03), render full-bleed artwork cleanly.
 * Otherwise, render the bespoke procedural card face (Cards 04-12).
 */
export const SugrivaCardFace: React.FC<CardViewProps> = ({ card, isBack = false }) => {
  if (isBack) {
    if (card.backImage) {
      return (
        <img
          src={card.backImage}
          alt={`Time-Shift Reveal for ${card.name}`}
          className="sj-card-full-art"
        />
      );
    }
    return <ProceduralCardBack card={card} />;
  }

  if (card.frontImage) {
    return (
      <img
        src={card.frontImage}
        alt={card.name}
        className="sj-card-full-art"
      />
    );
  }
  return <ProceduralCardFront card={card} />;
};
