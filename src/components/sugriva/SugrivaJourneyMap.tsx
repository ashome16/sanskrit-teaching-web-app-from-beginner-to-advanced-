import React from 'react';
import type { CollectibleCard, CardSuit } from '../../data/sugrivaJourneyData';

/**
 * Illustrated journey map for Sugrīva's Journey.
 * Pure presentation: node positions, costs and click handlers come from the
 * existing game data/logic in SugrivaJourneyStudio. Terrain is a stylised scene
 * (not a survey map) arranged around those same node coordinates.
 */

export const SUIT_THEME: Record<CardSuit, { main: string; light: string; deep: string; sa: string; en: string }> = {
  dakshina: { main: '#10b981', light: '#a7f3d0', deep: '#065f46', sa: 'दक्षिण', en: 'South' },
  purva: { main: '#f59e0b', light: '#fde68a', deep: '#92400e', sa: 'पूर्व', en: 'East' },
  paschima: { main: '#f43f5e', light: '#fecdd3', deep: '#881337', sa: 'पश्चिम', en: 'West' },
  uttara: { main: '#38bdf8', light: '#bae6fd', deep: '#075985', sa: 'उत्तर', en: 'North' },
};

const BASE = { x: 430, y: 390 };

const TRAILS: Record<CardSuit, string> = {
  dakshina: 'M 430 390 L 430 340 L 440 440 L 450 550',
  purva: 'M 430 390 Q 500 320 570 260 T 670 310 T 790 380',
  paschima: 'M 430 390 Q 370 350 310 320 T 220 270 L 110 260',
  uttara: 'M 430 390 L 450 160 L 460 95 L 470 35',
};

// Deterministic star field
const STARS: Array<[number, number, number]> = Array.from({ length: 46 }, (_, i) => {
  const x = (i * 197 + 37) % 920;
  const y = (i * 89 + 11) % 150;
  const r = 0.6 + ((i * 7) % 5) * 0.28;
  return [x, y, r];
});

const Tree: React.FC<{ x: number; y: number; s?: number; c?: string }> = ({ x, y, s = 1, c = '#166534' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x="-1.2" y="0" width="2.4" height="6" fill="#3f2a14" />
    <path d="M0 -14 L8 2 L-8 2 Z" fill={c} />
    <path d="M0 -20 L6 -6 L-6 -6 Z" fill={c} opacity="0.9" />
  </g>
);

const Palm: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} stroke="#14532d" strokeLinecap="round">
    <path d="M0 0 Q2 -9 1 -18" stroke="#6b4423" strokeWidth="2" fill="none" />
    <path d="M1 -18 Q-7 -20 -11 -14 M1 -18 Q9 -21 12 -14 M1 -18 Q-4 -25 -9 -25 M1 -18 Q6 -26 11 -24" strokeWidth="2.2" fill="none" stroke="#22c55e" />
  </g>
);

interface MapProps {
  cards: CollectibleCard[];
  collectedCardIds: string[];
  scoutPos: { x: number; y: number; label: string };
  onNodeClick: (card: CollectibleCard) => void;
  onRest: () => void;
}

export const SugrivaJourneyMap: React.FC<MapProps> = ({ cards, collectedCardIds, scoutPos, onNodeClick, onRest }) => {
  const suitDone = (suit: CardSuit) =>
    cards.filter((c) => c.suit === suit).every((c) => collectedCardIds.includes(c.id));

  return (
    <svg
      className="sj-stage-svg sjm-svg"
      viewBox="0 0 920 640"
      xmlns="http://www.w3.org/2000/svg"
      role="group"
      aria-label="Illustrated map: Kiṣkindhā at the centre with trails to the East, South, West and North"
    >
      <defs>
        <linearGradient id="sjmSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a1330" />
          <stop offset="45%" stopColor="#10224a" />
          <stop offset="100%" stopColor="#0b1a3a" />
        </linearGradient>
        <radialGradient id="sjmAurora" cx="50%" cy="0%" r="60%">
          <stop offset="0%" stopColor="#5eead4" stopOpacity="0.35" />
          <stop offset="55%" stopColor="#818cf8" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#0a1330" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sjmSea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0e4c6e" />
          <stop offset="100%" stopColor="#082f49" />
        </linearGradient>
        <linearGradient id="sjmLand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b5a3a" />
          <stop offset="45%" stopColor="#4d6b3a" />
          <stop offset="100%" stopColor="#3f5e34" />
        </linearGradient>
        <linearGradient id="sjmDesert" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d6a15a" />
          <stop offset="100%" stopColor="#b7793a" />
        </linearGradient>
        <linearGradient id="sjmSnow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
        <linearGradient id="sjmRock" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
        <radialGradient id="sjmSunWest" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fdba74" />
          <stop offset="60%" stopColor="#f97316" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sjmSunEast" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="55%" stopColor="#fbbf24" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sjmBaseGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fde68a" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sjmHaze" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10224a" stopOpacity="0" />
          <stop offset="50%" stopColor="#94a3b8" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#3b5a3a" stopOpacity="0" />
        </linearGradient>
        <pattern id="sjmWaves" width="38" height="16" patternUnits="userSpaceOnUse">
          <path d="M2 10 q7 -6 14 0 t14 0" fill="none" stroke="#7dd3fc" strokeOpacity="0.22" strokeWidth="1.3" />
        </pattern>
        <filter id="sjmSoft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        <filter id="sjmGrain" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0.08" />
          </feComponentTransfer>
        </filter>
        <filter id="sjmText" x="-20%" y="-50%" width="140%" height="200%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.4" floodColor="#020617" floodOpacity="0.95" />
        </filter>
      </defs>

      {/* Sky + aurora + stars */}
      <rect width="920" height="640" fill="url(#sjmSky)" />
      <rect width="920" height="260" fill="url(#sjmAurora)" className="sjm-aurora" />
      <g className="sjm-stars">
        {STARS.map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="#e0f2fe" opacity={0.35 + (i % 4) * 0.15} className={i % 3 === 0 ? 'sjm-twinkle' : undefined} />
        ))}
      </g>

      {/* Suns: rising in the East, setting in the West */}
      <circle cx="878" cy="210" r="70" fill="url(#sjmSunEast)" className="sjm-sun" />
      <circle cx="878" cy="210" r="16" fill="#fef3c7" />
      <circle cx="40" cy="222" r="70" fill="url(#sjmSunWest)" className="sjm-sun" />
      <circle cx="40" cy="222" r="15" fill="#fdba74" />

      {/* Oceans */}
      <rect x="0" y="230" width="920" height="410" fill="url(#sjmSea)" />
      <rect x="0" y="230" width="920" height="410" fill="url(#sjmWaves)" className="sjm-waves" />

      {/* Main land: northern plains + peninsula */}
      <path
        d="M0 150 L920 150 L920 238 C 840 252 760 286 700 322 C 660 348 632 400 600 462 C 572 520 520 560 470 588 C 446 600 428 598 410 584 C 360 548 316 512 280 470 C 258 440 240 380 258 344 C 236 316 190 300 120 292 C 70 286 30 290 0 296 Z"
        fill="url(#sjmLand)"
        stroke="#d6b77a"
        strokeOpacity="0.45"
        strokeWidth="2"
      />
      {/* Coast foam */}
      <path
        d="M920 238 C 840 252 760 286 700 322 C 660 348 632 400 600 462 C 572 520 520 560 470 588 C 446 600 428 598 410 584 C 360 548 316 512 280 470 C 258 440 240 380 258 344 C 236 316 190 300 120 292 C 70 286 30 290 0 296"
        fill="none"
        stroke="#e0f2fe"
        strokeOpacity="0.25"
        strokeWidth="5"
        strokeDasharray="2 7"
      />

      <rect x="0" y="134" width="920" height="40" fill="url(#sjmHaze)" />

      {/* West: desert dunes and sunset ridge */}
      <path d="M60 296 C 110 250 170 236 250 250 C 300 258 320 286 300 300 C 240 296 170 296 120 292 C 90 290 70 292 60 296 Z" fill="url(#sjmDesert)" opacity="0.9" />
      <path d="M140 270 q22 -10 44 0 M200 262 q18 -8 36 0 M110 284 q16 -7 32 0" stroke="#fde68a" strokeOpacity="0.5" strokeWidth="1.6" fill="none" />
      <path d="M40 272 L80 232 L100 250 L122 220 L150 262 L170 250 L196 280 Z" fill="#7c2d12" opacity="0.9" />
      <path d="M80 232 L92 244 L100 250 M122 220 L134 238" stroke="#fb923c" strokeOpacity="0.6" strokeWidth="1.5" fill="none" />

      {/* North: Himalayan range */}
      <g>
        <path d="M250 205 L300 150 L330 172 L372 112 L410 160 L452 98 L488 150 L520 116 L566 168 L604 130 L650 190 L700 160 L760 210 Z" fill="url(#sjmRock)" />
        <path d="M372 112 L388 132 L378 132 L366 124 Z M452 98 L470 124 L456 120 L444 112 Z M520 116 L536 136 L522 134 L512 126 Z M604 130 L620 150 L606 148 L596 140 Z" fill="url(#sjmSnow)" />
        <path d="M300 150 L312 164 L294 160 Z M700 160 L716 176 L698 172 Z" fill="url(#sjmSnow)" opacity="0.9" />
        <path d="M410 70 L440 28 L470 64 L500 22 L530 66 Z" fill="#475569" opacity="0.85" />
        <path d="M440 28 L452 44 L438 42 Z M500 22 L514 40 L498 38 Z" fill="#f1f5f9" />
      </g>

      {/* Rivers */}
      <path d="M500 196 C 540 230 590 250 630 278 C 650 292 662 304 672 320" stroke="#38bdf8" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.85" />
      <path d="M672 320 l14 6 M672 320 l6 12 M672 320 l-4 13" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
      <path d="M330 190 C 300 214 270 236 246 260 C 236 272 228 284 222 300" stroke="#38bdf8" strokeWidth="3.5" fill="none" strokeLinecap="round" opacity="0.85" />
      <path d="M222 300 l-10 8 M222 300 l2 12 M222 300 l10 9" stroke="#38bdf8" strokeWidth="2.2" strokeLinecap="round" opacity="0.8" />

      {/* Central: Vindhya hills */}
      <path d="M320 352 Q 360 322 400 344 Q 430 318 470 342 Q 510 320 556 348 Q 520 360 470 356 Q 420 362 380 358 Q 345 360 320 352 Z" fill="#5b4632" opacity="0.9" />

      {/* South: Daṇḍaka forest */}
      <g opacity="0.95">
        {[[380, 440], [400, 470], [470, 432], [490, 462], [420, 496], [470, 500], [360, 470], [510, 488], [395, 520], [500, 520], [450, 476], [520, 440]].map(([x, y], i) => (
          <Tree key={i} x={x} y={y} s={0.9 + (i % 3) * 0.15} c={i % 2 ? '#15803d' : '#166534'} />
        ))}
      </g>

      {/* Shoal stones off the southern tip */}
      <g fill="#cbd5e1" opacity="0.7">
        {[[436, 598], [444, 608], [452, 616], [446, 626], [458, 632]].map(([x, y], i) => (
          <ellipse key={i} cx={x} cy={y} rx="4.5" ry="2.6" />
        ))}
      </g>

      {/* East: island in the eastern sea */}
      <path d="M760 392 C 770 370 810 366 826 384 C 836 398 812 410 788 408 C 772 406 756 402 760 392 Z" fill="#4d7c3a" stroke="#fde68a" strokeOpacity="0.4" />
      <Palm x={784} y={392} s={0.9} />
      <Palm x={808} y={390} s={0.75} />

      {/* Kiṣkindhā: rocky hills with a cave */}
      <g onClick={onRest} style={{ cursor: 'pointer' }} role="button" tabIndex={0} aria-label="Kiṣkindhā basecamp: rest to restore stamina"
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onRest(); }}>
        <circle cx={BASE.x} cy={BASE.y} r="46" fill="url(#sjmBaseGlow)" className="sjm-base-glow" />
        <path d="M396 404 L412 376 L424 388 L436 368 L452 392 L466 380 L476 404 Z" fill="#78716c" stroke="#fde68a" strokeOpacity="0.5" />
        <path d="M424 404 Q 432 388 440 404 Z" fill="#1c1917" />
        <text x={BASE.x - 40} y={BASE.y + 6} textAnchor="end" className="sjm-base-label" filter="url(#sjmText)">किष्किन्धा</text>
        <text x={BASE.x - 40} y={BASE.y + 18} textAnchor="end" className="sjm-base-sub" filter="url(#sjmText)">Kiṣkindhā · Basecamp</text>
      </g>

      {/* Trails */}
      {(Object.keys(TRAILS) as CardSuit[]).map((suit) => (
        <g key={suit}>
          <path d={TRAILS[suit]} fill="none" stroke={SUIT_THEME[suit].main} strokeOpacity={suitDone(suit) ? 0.55 : 0.28} strokeWidth="9" strokeLinecap="round" filter="url(#sjmSoft)" />
          <path d={TRAILS[suit]} fill="none" stroke={SUIT_THEME[suit].light} strokeWidth="3" strokeLinecap="round" strokeDasharray="2 9" className="sjm-march" />
        </g>
      ))}

      {/* Location markers */}
      {cards.map((card) => {
        const t = SUIT_THEME[card.suit];
        const isCollected = collectedCardIds.includes(card.id);
        const isHere = scoutPos.x === card.mapNode.x && scoutPos.y === card.mapNode.y;
        const { x, y } = card.mapNode;
        const labelW = card.name.length * 5.4 + 14;
        return (
          <g
            key={card.id}
            className={`sjm-node${isCollected ? ' is-collected' : ''}`}
            onClick={() => onNodeClick(card)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onNodeClick(card); } }}
            role="button"
            tabIndex={0}
            aria-label={`${card.cardNumber} ${card.name}${isCollected ? ', collected' : `, costs ${card.staminaCost} stamina`}`}
          >
            <circle cx={x} cy={y} r="20" fill={t.main} opacity="0.35" filter="url(#sjmSoft)" className="sjm-node-glow" />
            {isHere && <circle cx={x} cy={y} r="18" fill="none" stroke={t.light} strokeWidth="2" className="sjm-here-ring" />}
            <circle cx={x} cy={y} r="13" fill={isCollected ? t.main : '#0f172a'} stroke={t.light} strokeWidth="2.5" />
            <circle cx={x} cy={y} r="9.5" fill="none" stroke={isCollected ? '#fffbeb' : t.main} strokeOpacity="0.7" strokeWidth="1" strokeDasharray="2 2" />
            {isCollected ? (
              <path d={`M${x - 5} ${y} l3.5 3.8 l6.5 -7.5`} fill="none" stroke="#fffbeb" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <text x={x} y={y + 3.6} textAnchor="middle" className="sjm-node-num">{card.cardNumber}</text>
            )}
            <rect x={x - labelW / 2} y={y + 17} width={labelW} height="15" rx="7.5" fill="#0b1229" fillOpacity="0.82" stroke={t.main} strokeOpacity="0.6" />
            <text x={x} y={y + 28} textAnchor="middle" className="sjm-node-label">{card.name}</text>
            {!isCollected && (
              <g>
                {(() => {
                  const top = y < 60;
                  const px = top ? x + 17 : x - 20;
                  const py = top ? y - 6.5 : y - 31;
                  return (
                    <>
                      <rect x={px} y={py} width="40" height="13" rx="6.5" fill="#451a03" stroke="#fbbf24" strokeWidth="0.9" />
                      <text x={px + 20} y={py + 9.5} textAnchor="middle" className="sjm-node-cost">−{card.staminaCost}</text>
                    </>
                  );
                })()}
              </g>
            )}
          </g>
        );
      })}

      {/* Vānara scout token */}
      <g className="sj-vanara-token-g" style={{ transform: `translate(${scoutPos.x}px, ${scoutPos.y}px)` }} aria-hidden="true">
        <circle r="17" fill="#fbbf24" opacity="0.28" className="sjm-token-halo" />
        <path d="M6 8 C 16 10 16 -2 10 -4" stroke="#b45309" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <ellipse cx="0" cy="5" rx="6" ry="7" fill="#c2410c" />
        <circle cx="0" cy="-6" r="7" fill="#d97706" stroke="#451a03" strokeWidth="1.2" />
        <circle cx="-7" cy="-7" r="2.6" fill="#d97706" stroke="#451a03" strokeWidth="1" />
        <circle cx="7" cy="-7" r="2.6" fill="#d97706" stroke="#451a03" strokeWidth="1" />
        <ellipse cx="0" cy="-4.5" rx="4.4" ry="3.6" fill="#fde68a" />
        <circle cx="-1.8" cy="-6.5" r="0.95" fill="#1c1917" />
        <circle cx="1.8" cy="-6.5" r="0.95" fill="#1c1917" />
        <path d="M-1.6 -3.2 q1.6 1.2 3.2 0" stroke="#78350f" strokeWidth="0.9" fill="none" strokeLinecap="round" />
      </g>

      {/* Compass rose (in the western sea) */}
      <g transform="translate(92 545)" className="sjm-compass" aria-hidden="true">
        <circle r="50" fill="#0b1229" fillOpacity="0.7" stroke="#d6b77a" strokeOpacity="0.7" strokeWidth="1.5" />
        <circle r="36" fill="none" stroke="#d6b77a" strokeOpacity="0.35" strokeDasharray="2 3" />
        <path d="M0 -40 L7 0 L0 40 L-7 0 Z" fill="#fde68a" />
        <path d="M-40 0 L0 -7 L40 0 L0 7 Z" fill="#f59e0b" opacity="0.85" />
        <path d="M0 -40 L7 0 L0 0 Z M0 40 L-7 0 L0 0 Z" fill="#b45309" />
        <circle r="4" fill="#7c2d12" stroke="#fde68a" />
        <text y="-54" textAnchor="middle" className="sjm-compass-label">उत्तर</text>
        <text y="66" textAnchor="middle" className="sjm-compass-label">दक्षिण</text>
        <text x="58" y="4" textAnchor="start" className="sjm-compass-label">पूर्व</text>
        <text x="-58" y="4" textAnchor="end" className="sjm-compass-label">पश्चिम</text>
      </g>

      {/* Edge direction banners */}
      <g className="sjm-edge" aria-hidden="true">
        <text x="905" y="300" textAnchor="end" className="sjm-edge-label" filter="url(#sjmText)">पूर्व · East</text>
        <text x="14" y="200" textAnchor="start" className="sjm-edge-label" filter="url(#sjmText)">पश्चिम · West</text>
        <text x="250" y="40" textAnchor="middle" className="sjm-edge-label" filter="url(#sjmText)">उत्तर · North</text>
        <text x="640" y="622" textAnchor="middle" className="sjm-edge-label" filter="url(#sjmText)">दक्षिण · South</text>
      </g>

      {/* Parchment grain + vignette */}
      <rect width="920" height="640" filter="url(#sjmGrain)" pointerEvents="none" />
      <rect width="920" height="640" fill="none" stroke="#020617" strokeOpacity="0.55" strokeWidth="26" pointerEvents="none" />
    </svg>
  );
};

export default SugrivaJourneyMap;
