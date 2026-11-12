import React from 'react';
import type { LabSegmentId } from './common';
import type { LabCategory } from './ScienceLab';

interface GamePictogramProps {
  id: LabSegmentId;
  className?: string;
}

/**
 * Rich, bespoke pictorial mini-illustrations for each Vijñāna Lab game/simulation.
 * Replaces generic emoji icons with content-specific small graphic artwork.
 */
export const LabGamePictogram: React.FC<GamePictogramProps> = ({ id, className = '' }) => {
  switch (id) {
    case 'preschool-wonder':
      return (
        <svg viewBox="0 0 64 64" className={`vl-pict-svg ${className}`} aria-hidden="true">
          <defs>
            <linearGradient id="pw-bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="50%" stopColor="#fde68a" />
              <stop offset="100%" stopColor="#fed7aa" />
            </linearGradient>
            <linearGradient id="pw-kite" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#fb923c" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="14" fill="url(#pw-bg)" />
          {/* Rainbow arc */}
          <path d="M10 46 A22 22 0 0 1 54 46" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" opacity="0.85" />
          <path d="M13 46 A19 19 0 0 1 51 46" fill="none" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" opacity="0.85" />
          <path d="M16 46 A16 16 0 0 1 48 46" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" opacity="0.85" />
          <path d="M19 46 A13 13 0 0 1 45 46" fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" opacity="0.85" />
          {/* Sun */}
          <circle cx="18" cy="18" r="7" fill="#f59e0b" />
          <circle cx="18" cy="18" r="4.5" fill="#fef08a" />
          {/* Flying Kite */}
          <polygon points="44,12 53,21 44,32 35,21" fill="url(#pw-kite)" stroke="#ffffff" strokeWidth="1.5" />
          <line x1="44" y1="12" x2="44" y2="32" stroke="#fef08a" strokeWidth="1.2" />
          <path d="M35 21 Q44 24 53 21" fill="none" stroke="#fef08a" strokeWidth="1.2" />
          {/* Green hills & lotus */}
          <path d="M4 52 Q20 42 36 50 T60 48 L60 60 L4 60 Z" fill="#10b981" />
          <path d="M32 45 C29 49 27 54 32 56 C37 54 35 49 32 45 Z" fill="#ec4899" />
          <path d="M26 48 C25 52 28 55 32 56 C30 52 28 49 26 48 Z" fill="#f472b6" />
          <path d="M38 48 C39 52 36 55 32 56 C34 52 36 49 38 48 Z" fill="#f472b6" />
        </svg>
      );

    case 'asato-ma':
      return (
        <svg viewBox="0 0 64 64" className={`vl-pict-svg ${className}`} aria-hidden="true">
          <defs>
            <linearGradient id="am-bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1e1b4b" />
              <stop offset="100%" stopColor="#31102f" />
            </linearGradient>
            <linearGradient id="am-fire" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#ea580c" />
              <stop offset="60%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#fef08a" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="14" fill="url(#am-bg)" />
          {/* Balance beam at top */}
          <line x1="16" y1="14" x2="48" y2="14" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
          <polygon points="32,9 29,14 35,14" fill="#fde047" />
          {/* Crucible vessel (Andha-Mūṣā) */}
          <path d="M20 26 L44 26 L40 44 C39 48 25 48 24 44 Z" fill="#334155" stroke="#fbbf24" strokeWidth="2" />
          <ellipse cx="32" cy="26" rx="12" ry="3.5" fill="#f59e0b" stroke="#fde047" strokeWidth="1.2" />
          {/* Invariant atoms inside crucible */}
          <circle cx="28" cy="35" r="2.5" fill="#38bdf8" />
          <circle cx="36" cy="35" r="2.5" fill="#38bdf8" />
          <circle cx="32" cy="40" r="2.5" fill="#fde047" />
          {/* Rising steam/sparkles */}
          <circle cx="27" cy="20" r="1.8" fill="#fef08a" opacity="0.9" />
          <circle cx="32" cy="18" r="2.2" fill="#38bdf8" opacity="0.9" />
          <circle cx="37" cy="20" r="1.8" fill="#fef08a" opacity="0.9" />
          {/* Flame underneath */}
          <path d="M22 55 C24 47 29 46 32 42 C35 46 40 47 42 55 C38 57 26 57 22 55 Z" fill="url(#am-fire)" />
        </svg>
      );

    case 'prakriti':
      return (
        <svg viewBox="0 0 64 64" className={`vl-pict-svg ${className}`} aria-hidden="true">
          <defs>
            <linearGradient id="pk-bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#064e3b" />
              <stop offset="100%" stopColor="#0f766e" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="14" fill="url(#pk-bg)" />
          {/* Tridosha triangle halo */}
          <circle cx="32" cy="30" r="21" fill="none" stroke="#34d399" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6" />
          {/* Sun (Pitta) */}
          <circle cx="16" cy="17" r="5" fill="#fbbf24" />
          {/* Water drop (Kapha) */}
          <path d="M48 12 C45 17 44 19 44 21 A4 4 0 0 0 52 21 C52 19 51 17 48 12 Z" fill="#38bdf8" />
          {/* Lush Biosphere Tree */}
          <circle cx="32" cy="26" r="11" fill="#10b981" />
          <circle cx="25" cy="29" r="8" fill="#059669" />
          <circle cx="39" cy="29" r="8" fill="#34d399" />
          <path d="M30 46 L30 33 L34 33 L34 46 Z" fill="#d97706" />
          {/* Nadi Pulse waveform at bottom */}
          <path d="M8 53 L20 53 L24 47 L28 57 L32 45 L36 55 L40 50 L44 53 L56 53" fill="none" stroke="#fde047" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'chaturyoni':
      return (
        <svg viewBox="0 0 64 64" className={`vl-pict-svg ${className}`} aria-hidden="true">
          <defs>
            <linearGradient id="cy-bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#065f46" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="14" fill="url(#cy-bg)" />
          {/* Sensitive plant stem & compound leaves */}
          <path d="M22 52 Q24 34 28 18" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" />
          <ellipse cx="17" cy="26" rx="6" ry="2.8" transform="rotate(-25 17 26)" fill="#22c55e" />
          <ellipse cx="16" cy="34" rx="6" ry="2.8" transform="rotate(-20 16 34)" fill="#22c55e" />
          <ellipse cx="33" cy="25" rx="6" ry="2.8" transform="rotate(25 33 25)" fill="#4ade80" />
          <ellipse cx="32" cy="33" rx="6" ry="2.8" transform="rotate(20 32 33)" fill="#4ade80" />
          {/* J.C. Bose Galvanometer dial */}
          <circle cx="46" cy="40" r="12" fill="#0f172a" stroke="#fb923c" strokeWidth="2" />
          <path d="M38 42 A8 8 0 0 1 54 42" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
          <line x1="46" y1="43" x2="51" y2="34" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" />
          <circle cx="46" cy="43" r="2" fill="#fde047" />
          {/* Probe wire */}
          <path d="M25 38 Q32 46 34 42" fill="none" stroke="#fde047" strokeWidth="1.5" strokeDasharray="2 2" />
          {/* Bio-electric spark */}
          <polygon points="28,12 24,19 29,19 26,25 33,17 28,17" fill="#fde047" />
        </svg>
      );

    case 'jyotisha':
      return (
        <svg viewBox="0 0 64 64" className={`vl-pict-svg ${className}`} aria-hidden="true">
          <defs>
            <linearGradient id="jy-bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#090d16" />
              <stop offset="100%" stopColor="#1e1b4b" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="14" fill="url(#jy-bg)" />
          {/* Stars */}
          <circle cx="12" cy="14" r="1.2" fill="#fef08a" />
          <circle cx="52" cy="12" r="1.5" fill="#e0e7ff" />
          <circle cx="14" cy="50" r="1.2" fill="#e0e7ff" />
          {/* Orbital ellipses */}
          <ellipse cx="32" cy="32" rx="24" ry="13" transform="rotate(-22 32 32)" fill="none" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="3 2" />
          <ellipse cx="32" cy="32" rx="15" ry="8" transform="rotate(-22 32 32)" fill="none" stroke="#38bdf8" strokeWidth="1.2" opacity="0.7" />
          {/* Sun (Surya) */}
          <circle cx="32" cy="32" r="8" fill="#f59e0b" />
          <circle cx="32" cy="32" r="5.5" fill="#fef08a" />
          {/* Earth (Prthivi) */}
          <circle cx="49" cy="24" r="4.5" fill="#38bdf8" stroke="#bae6fd" strokeWidth="1" />
          <path d="M47 22 Q49 24 48 26" fill="none" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" />
          {/* Moon (Candra) */}
          <circle cx="55" cy="18" r="2.2" fill="#f8fafc" />
        </svg>
      );

    case 'nada-brahman':
      return (
        <svg viewBox="0 0 64 64" className={`vl-pict-svg ${className}`} aria-hidden="true">
          <defs>
            <linearGradient id="nb-bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2e1065" />
              <stop offset="100%" stopColor="#4c1d95" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="14" fill="url(#nb-bg)" />
          {/* Chladni Cymatic Mandala plate */}
          <circle cx="32" cy="32" r="22" fill="#1e1b4b" stroke="#fbbf24" strokeWidth="1.8" />
          <polygon points="32,12 37,26 52,32 37,38 32,52 27,38 12,32 27,26" fill="none" stroke="#c084fc" strokeWidth="1.5" />
          <circle cx="32" cy="32" r="10" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />
          {/* Standing wave sinusoid across center */}
          <path d="M10 32 Q21 16 32 32 T54 32" fill="none" stroke="#fde047" strokeWidth="2.4" />
          <path d="M10 32 Q21 48 32 32 T54 32" fill="none" stroke="#f472b6" strokeWidth="2" opacity="0.85" />
          <circle cx="32" cy="32" r="3" fill="#fef08a" />
        </svg>
      );

    case 'paramanu':
      return (
        <svg viewBox="0 0 64 64" className={`vl-pict-svg ${className}`} aria-hidden="true">
          <defs>
            <linearGradient id="pm-bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="14" fill="url(#pm-bg)" />
          {/* Atomic orbits */}
          <ellipse cx="32" cy="32" rx="24" ry="10" transform="rotate(30 32 32)" fill="none" stroke="#38bdf8" strokeWidth="1.5" opacity="0.7" />
          <ellipse cx="32" cy="32" rx="24" ry="10" transform="rotate(-30 32 32)" fill="none" stroke="#f59e0b" strokeWidth="1.5" opacity="0.7" />
          <ellipse cx="32" cy="32" rx="24" ry="10" transform="rotate(90 32 32)" fill="none" stroke="#a855f7" strokeWidth="1.5" opacity="0.7" />
          {/* Bond triangle (Tryanuka) */}
          <polygon points="32,19 20,40 44,40" fill="none" stroke="#fde047" strokeWidth="2" />
          {/* 3 Paramanu spheres */}
          <circle cx="32" cy="19" r="6" fill="#f59e0b" stroke="#fef08a" strokeWidth="1.5" />
          <circle cx="20" cy="40" r="6" fill="#0ea5e9" stroke="#bae6fd" strokeWidth="1.5" />
          <circle cx="44" cy="40" r="6" fill="#ec4899" stroke="#fbcfe8" strokeWidth="1.5" />
          <circle cx="32" cy="33" r="3" fill="#fef08a" />
        </svg>
      );

    case 'chandrayaan':
      return (
        <svg viewBox="0 0 64 64" className={`vl-pict-svg ${className}`} aria-hidden="true">
          <defs>
            <linearGradient id="ch-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#020617" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="14" fill="url(#ch-bg)" />
          {/* Lunar South Pole surface */}
          <path d="M0 48 Q18 42 32 47 T64 45 L64 64 L0 64 Z" fill="#64748b" />
          <ellipse cx="18" cy="53" rx="6" ry="2.2" fill="#475569" />
          <ellipse cx="48" cy="54" rx="7" ry="2.5" fill="#475569" />
          {/* Thruster plumes */}
          <polygon points="26,38 23,47 29,47" fill="#38bdf8" opacity="0.85" />
          <polygon points="38,38 35,47 41,47" fill="#38bdf8" opacity="0.85" />
          {/* Vikram Lander gold body */}
          <polygon points="23,22 41,22 44,36 20,36" fill="#f59e0b" stroke="#fef08a" strokeWidth="1.5" />
          {/* Solar panel & dish */}
          <rect x="14" y="24" width="6" height="10" rx="1" fill="#0284c7" stroke="#7dd3fc" strokeWidth="1" />
          <path d="M28 22 A4 4 0 0 1 36 22" fill="#e2e8f0" />
          {/* Landing legs */}
          <line x1="22" y1="36" x2="17" y2="45" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
          <line x1="42" y1="36" x2="47" y2="45" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
          {/* LIBS Laser beam */}
          <line x1="32" y1="36" x2="32" y2="51" stroke="#22d3ee" strokeWidth="2" strokeDasharray="2 2" />
          <circle cx="32" cy="51" r="2.5" fill="#22d3ee" />
        </svg>
      );

    case 'srishti-sthiti-laya':
      return (
        <svg viewBox="0 0 64 64" className={`vl-pict-svg ${className}`} aria-hidden="true">
          <defs>
            <linearGradient id="sl-bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3b0764" />
              <stop offset="100%" stopColor="#831843" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="14" fill="url(#sl-bg)" />
          {/* Cosmic Loom warp & weft threads */}
          <path d="M10 20 C24 10, 40 30, 54 20" fill="none" stroke="#f472b6" strokeWidth="2" />
          <path d="M10 32 C24 22, 40 42, 54 32" fill="none" stroke="#fde047" strokeWidth="2.5" />
          <path d="M10 44 C24 34, 40 54, 54 44" fill="none" stroke="#38bdf8" strokeWidth="2" />
          {/* Vertical harmonic loom bars */}
          <line x1="20" y1="12" x2="20" y2="52" stroke="#ffffff" strokeWidth="1" opacity="0.35" />
          <line x1="32" y1="12" x2="32" y2="52" stroke="#ffffff" strokeWidth="1" opacity="0.35" />
          <line x1="44" y1="12" x2="44" y2="52" stroke="#ffffff" strokeWidth="1" opacity="0.35" />
          {/* Central conserved seed/node */}
          <circle cx="32" cy="32" r="7" fill="#f43f5e" stroke="#fef08a" strokeWidth="2" />
          <circle cx="32" cy="32" r="3" fill="#fef08a" />
        </svg>
      );

    case 'agnibana':
      return (
        <svg viewBox="0 0 64 64" className={`vl-pict-svg ${className}`} aria-hidden="true">
          <defs>
            <linearGradient id="ab-bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#450a0a" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="14" fill="url(#ab-bg)" />
          {/* Ballistic trajectory arc */}
          <path d="M10 52 Q28 10 56 38" fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="3 3" />
          {/* Rocket exhaust flame */}
          <path d="M22 42 L11 53 L27 47 Z" fill="#f97316" />
          <path d="M23 43 L15 50 L26 46 Z" fill="#fef08a" />
          {/* Bamboo stabilizer pole */}
          <line x1="34" y1="30" x2="12" y2="52" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" />
          {/* Hammered iron rocket casing */}
          <g transform="translate(36, 26) rotate(-45)">
            <rect x="-12" y="-5" width="22" height="10" rx="2" fill="#94a3b8" stroke="#f8fafc" strokeWidth="1.2" />
            <polygon points="10,-5 19,0 10,5" fill="#ef4444" stroke="#fca5a5" strokeWidth="1" />
            <line x1="-6" y1="-5" x2="-6" y2="5" stroke="#fbbf24" strokeWidth="1.5" />
            <line x1="2" y1="-5" x2="2" y2="5" stroke="#fbbf24" strokeWidth="1.5" />
          </g>
        </svg>
      );

    case 'vedic-geometry':
      return (
        <svg viewBox="0 0 64 64" className={`vl-pict-svg ${className}`} aria-hidden="true">
          <defs>
            <linearGradient id="vg-bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#451a03" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="14" fill="url(#vg-bg)" />
          {/* Circle-to-Square Sulba construction */}
          <circle cx="32" cy="32" r="19" fill="none" stroke="#38bdf8" strokeWidth="1.6" strokeDasharray="3 2" />
          <rect x="16" y="16" width="32" height="32" fill="rgba(245, 158, 11, 0.18)" stroke="#fbbf24" strokeWidth="2" />
          {/* Diagonal Rajju cord */}
          <line x1="16" y1="48" x2="48" y2="16" stroke="#fde047" strokeWidth="2.2" />
          {/* Right triangle highlight */}
          <polygon points="16,48 48,48 48,16" fill="rgba(251, 191, 36, 0.22)" />
          {/* 4 Golden Sanku Pegs at corners */}
          <circle cx="16" cy="16" r="3" fill="#fef08a" stroke="#d97706" strokeWidth="1.2" />
          <circle cx="48" cy="16" r="3" fill="#fef08a" stroke="#d97706" strokeWidth="1.2" />
          <circle cx="16" cy="48" r="3" fill="#fef08a" stroke="#d97706" strokeWidth="1.2" />
          <circle cx="48" cy="48" r="3" fill="#fef08a" stroke="#d97706" strokeWidth="1.2" />
        </svg>
      );

    case 'mantra-acoustics':
      return (
        <svg viewBox="0 0 64 64" className={`vl-pict-svg ${className}`} aria-hidden="true">
          <defs>
            <linearGradient id="ma-bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1e1b4b" />
              <stop offset="100%" stopColor="#581c87" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="14" fill="url(#ma-bg)" />
          {/* Temple Bell / Conch resonance */}
          <path d="M22 14 C16 14 14 22 14 28 L11 33 L29 33 L26 28 C26 22 24 14 20 14 Z" fill="#fbbf24" stroke="#fef08a" strokeWidth="1.4" />
          <circle cx="20" cy="35" r="2.5" fill="#fde047" />
          {/* Acoustic propagating wave arcs */}
          <path d="M34 20 A12 12 0 0 1 34 36" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
          <path d="M40 16 A18 18 0 0 1 40 40" fill="none" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" />
          <path d="M46 12 A24 24 0 0 1 46 44" fill="none" stroke="#f472b6" strokeWidth="2" strokeLinecap="round" />
          {/* Saptak harmonic bars at bottom */}
          <rect x="12" y="48" width="4" height="8" rx="1" fill="#f43f5e" />
          <rect x="19" y="45" width="4" height="11" rx="1" fill="#fb923c" />
          <rect x="26" y="42" width="4" height="14" rx="1" fill="#facc15" />
          <rect x="33" y="46" width="4" height="10" rx="1" fill="#4ade80" />
          <rect x="40" y="43" width="4" height="13" rx="1" fill="#38bdf8" />
          <rect x="47" y="40" width="4" height="16" rx="1" fill="#c084fc" />
        </svg>
      );

    case 'temple-engineering':
      return (
        <svg viewBox="0 0 64 64" className={`vl-pict-svg ${className}`} aria-hidden="true">
          <defs>
            <linearGradient id="te-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e1b4b" />
              <stop offset="100%" stopColor="#451a03" />
            </linearGradient>
            <linearGradient id="te-stone" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="14" fill="url(#te-bg)" />
          {/* Kalasha & Amalaka crown */}
          <polygon points="32,7 29,13 35,13" fill="#fef08a" />
          <ellipse cx="32" cy="15" rx="7" ry="2.5" fill="#f59e0b" stroke="#fef08a" strokeWidth="1" />
          {/* Stepped Sikhara tower with interlocking stones */}
          <path d="M23 18 L41 18 L45 44 L19 44 Z" fill="url(#te-stone)" stroke="#fde68a" strokeWidth="1.2" />
          <line x1="21" y1="26" x2="43" y2="26" stroke="#78350f" strokeWidth="1.5" />
          <line x1="20" y1="35" x2="44" y2="35" stroke="#78350f" strokeWidth="1.5" />
          {/* Garbhagriha doorway */}
          <rect x="28" y="34" width="8" height="10" rx="2" fill="#1e1b4b" stroke="#fef08a" strokeWidth="1" />
          {/* Plinth & Seismic Sand- Cushion wave */}
          <rect x="13" y="44" width="38" height="6" rx="1.5" fill="#b45309" stroke="#fde68a" strokeWidth="1" />
          <path d="M10 55 Q18 51 26 55 T42 55 T54 55" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'rituparna':
      return (
        <svg viewBox="0 0 64 64" className={`vl-pict-svg ${className}`} aria-hidden="true">
          <defs>
            <linearGradient id="rp-bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#042f2e" />
              <stop offset="100%" stopColor="#115e59" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="14" fill="url(#rp-bg)" />
          {/* Vibhitaka Tree canopy */}
          <circle cx="28" cy="26" r="14" fill="#10b981" />
          <circle cx="20" cy="30" r="10" fill="#059669" />
          <circle cx="36" cy="30" r="10" fill="#34d399" />
          <rect x="25" y="38" width="6" height="14" fill="#92400e" />
          {/* Sampling Quadrat Highlight Box */}
          <rect x="18" y="16" width="18" height="18" fill="rgba(254, 240, 138, 0.2)" stroke="#fde047" strokeWidth="1.8" strokeDasharray="3 2" />
          {/* Golden fruits/leaves inside quadrat */}
          <circle cx="23" cy="21" r="2" fill="#fde047" />
          <circle cx="31" cy="24" r="2" fill="#fde047" />
          <circle cx="25" cy="29" r="2" fill="#fde047" />
          {/* Aksa Die at bottom right */}
          <rect x="40" y="38" width="16" height="16" rx="3.5" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.8" />
          <circle cx="45" cy="43" r="1.6" fill="#78350f" />
          <circle cx="51" cy="43" r="1.6" fill="#78350f" />
          <circle cx="48" cy="46" r="1.6" fill="#dc2626" />
          <circle cx="45" cy="49" r="1.6" fill="#78350f" />
          <circle cx="51" cy="49" r="1.6" fill="#78350f" />
        </svg>
      );

    case 'kautilya':
      return (
        <svg viewBox="0 0 64 64" className={`vl-pict-svg ${className}`} aria-hidden="true">
          <defs>
            <linearGradient id="kt-bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#422006" />
              <stop offset="100%" stopColor="#713f12" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="14" fill="url(#kt-bg)" />
          {/* Royal Palm-Leaf Scroll */}
          <rect x="12" y="14" width="40" height="24" rx="4" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
          <line x1="18" y1="21" x2="36" y2="21" stroke="#92400e" strokeWidth="2" strokeLinecap="round" />
          <line x1="18" y1="26" x2="32" y2="26" stroke="#92400e" strokeWidth="2" strokeLinecap="round" />
          <line x1="18" y1="31" x2="34" y2="31" stroke="#92400e" strokeWidth="2" strokeLinecap="round" />
          {/* Gold Seal Chakra on scroll */}
          <circle cx="44" cy="26" r="5" fill="#d97706" stroke="#fde047" strokeWidth="1.2" />
          {/* Saptanga Balance & Coins at bottom */}
          <path d="M16 49 L48 49 L43 56 L21 56 Z" fill="#fbbf24" stroke="#fef08a" strokeWidth="1.2" />
          <circle cx="24" cy="45" r="3.5" fill="#fde047" stroke="#b45309" strokeWidth="1" />
          <circle cx="32" cy="44" r="3.5" fill="#fde047" stroke="#b45309" strokeWidth="1" />
          <circle cx="40" cy="45" r="3.5" fill="#fde047" stroke="#b45309" strokeWidth="1" />
        </svg>
      );

    case 'chandahshastra':
      return (
        <svg viewBox="0 0 64 64" className={`vl-pict-svg ${className}`} aria-hidden="true">
          <defs>
            <linearGradient id="cs-bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3b0764" />
              <stop offset="100%" stopColor="#1e1b4b" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="14" fill="url(#cs-bg)" />
          {/* Meruprastara (Pascal's Binomial Pyramid) cells */}
          {/* Row 1 */}
          <rect x="27" y="10" width="10" height="9" rx="2" fill="#f59e0b" stroke="#fef08a" strokeWidth="1.2" />
          {/* Row 2 */}
          <rect x="21" y="21" width="10" height="9" rx="2" fill="#c084fc" stroke="#f3e8ff" strokeWidth="1" />
          <rect x="33" y="21" width="10" height="9" rx="2" fill="#c084fc" stroke="#f3e8ff" strokeWidth="1" />
          {/* Row 3 */}
          <rect x="15" y="32" width="10" height="9" rx="2" fill="#38bdf8" stroke="#e0f2fe" strokeWidth="1" />
          <rect x="27" y="32" width="10" height="9" rx="2" fill="#f43f5e" stroke="#ffe4e6" strokeWidth="1.2" />
          <rect x="39" y="32" width="10" height="9" rx="2" fill="#38bdf8" stroke="#e0f2fe" strokeWidth="1" />
          {/* Binary Laghu (|) and Guru (S) rhythm symbols at bottom */}
          <line x1="18" y1="47" x2="18" y2="55" stroke="#fde047" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M26 48 C29 46 31 49 28 51 C25 53 27 56 30 54" fill="none" stroke="#38bdf8" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="37" y1="47" x2="37" y2="55" stroke="#fde047" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M44 48 C47 46 49 49 46 51 C43 53 45 56 48 54" fill="none" stroke="#38bdf8" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );

    case 'ujjain-geodesy':
      return (
        <svg viewBox="0 0 64 64" className={`vl-pict-svg ${className}`} aria-hidden="true">
          <defs>
            <linearGradient id="ug-bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0c4a6e" />
              <stop offset="100%" stopColor="#1e1b4b" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="14" fill="url(#ug-bg)" />
          {/* Globe with 0 deg Ujjain Prime Meridian & Tropic of Cancer */}
          <circle cx="32" cy="36" r="18" fill="#0284c7" stroke="#7dd3fc" strokeWidth="1.5" />
          <ellipse cx="32" cy="36" rx="8" ry="18" fill="none" stroke="#fde047" strokeWidth="2" />
          <line x1="14" y1="31" x2="50" y2="31" stroke="#f97316" strokeWidth="1.8" strokeDasharray="3 2" />
          {/* Sanku Gnomon pillar at top */}
          <polygon points="32,12 29,24 35,24" fill="#fbbf24" stroke="#fef08a" strokeWidth="1" />
          {/* Zenith Sun */}
          <circle cx="48" cy="14" r="5" fill="#fde047" />
          {/* Intersection beacon at Ujjain */}
          <circle cx="32" cy="31" r="3.5" fill="#ef4444" stroke="#fef08a" strokeWidth="1.5" />
        </svg>
      );

    case 'citrakavya':
    default:
      return (
        <svg viewBox="0 0 64 64" className={`vl-pict-svg ${className}`} aria-hidden="true">
          <defs>
            <linearGradient id="ck-bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="14" fill="url(#ck-bg)" />
          {/* Padma Lotus petals behind matrix */}
          <circle cx="32" cy="32" r="23" fill="none" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="2 2" />
          {/* 3x3 Syllable Matrix Grid */}
          <rect x="14" y="14" width="36" height="36" rx="5" fill="#1e293b" stroke="#fbbf24" strokeWidth="2" />
          <line x1="26" y1="14" x2="26" y2="50" stroke="#38bdf8" strokeWidth="1.5" />
          <line x1="38" y1="14" x2="38" y2="50" stroke="#38bdf8" strokeWidth="1.5" />
          <line x1="14" y1="26" x2="50" y2="26" stroke="#38bdf8" strokeWidth="1.5" />
          <line x1="14" y1="38" x2="50" y2="38" stroke="#38bdf8" strokeWidth="1.5" />
          {/* Glowing nodes along symmetry paths */}
          <circle cx="20" cy="20" r="3" fill="#38bdf8" />
          <circle cx="32" cy="20" r="3" fill="#f472b6" />
          <circle cx="44" cy="20" r="3" fill="#38bdf8" />
          <circle cx="20" cy="32" r="3" fill="#f472b6" />
          <circle cx="32" cy="32" r="4" fill="#fde047" />
          <circle cx="44" cy="32" r="3" fill="#f472b6" />
          <circle cx="20" cy="44" r="3" fill="#38bdf8" />
          <circle cx="32" cy="44" r="3" fill="#f472b6" />
          <circle cx="44" cy="44" r="3" fill="#38bdf8" />
        </svg>
      );
  }
};

/**
 * Pictorial mini-graphics for Preschool Quick-Play Activity buttons
 */
export const PreschoolActivityPictogram: React.FC<{ id: string; className?: string }> = ({ id, className = '' }) => {
  switch (id) {
    case 'varnamala':
      return (
        <svg viewBox="0 0 48 48" className={`vl-pict-svg ${className}`} aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
          <circle cx="24" cy="24" r="15" fill="#fde68a" />
          <text x="24" y="30" textAnchor="middle" fill="#b45309" fontSize="20" fontWeight="900" fontFamily="Noto Sans Devanagari, sans-serif">अ</text>
        </svg>
      );
    case 'shapes':
      return (
        <svg viewBox="0 0 48 48" className={`vl-pict-svg ${className}`} aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5" />
          <polygon points="24,8 35,26 13,26" fill="#f59e0b" />
          <rect x="10" y="24" width="14" height="14" rx="2" fill="#ef4444" />
          <circle cx="32" cy="31" r="7.5" fill="#10b981" />
        </svg>
      );
    case 'colors':
      return (
        <svg viewBox="0 0 48 48" className={`vl-pict-svg ${className}`} aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#fae8ff" stroke="#c084fc" strokeWidth="1.5" />
          <circle cx="20" cy="20" r="9" fill="#ef4444" opacity="0.85" />
          <circle cx="28" cy="20" r="9" fill="#facc15" opacity="0.85" />
          <circle cx="24" cy="28" r="9" fill="#3b82f6" opacity="0.85" />
        </svg>
      );
    case 'fruits':
      return (
        <svg viewBox="0 0 48 48" className={`vl-pict-svg ${className}`} aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#dcfce7" stroke="#4ade80" strokeWidth="1.5" />
          {/* Mango & Apple */}
          <circle cx="20" cy="27" r="9" fill="#ef4444" />
          <path d="M20 18 Q23 13 26 15" fill="none" stroke="#15803d" strokeWidth="2.2" strokeLinecap="round" />
          <ellipse cx="31" cy="28" rx="7" ry="9" transform="rotate(20 31 28)" fill="#f59e0b" />
        </svg>
      );
    case 'animals':
      return (
        <svg viewBox="0 0 48 48" className={`vl-pict-svg ${className}`} aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#ffedd5" stroke="#fb923c" strokeWidth="1.5" />
          {/* Friendly elephant / calf face */}
          <ellipse cx="14" cy="24" rx="5" ry="8" fill="#94a3b8" />
          <ellipse cx="34" cy="24" rx="5" ry="8" fill="#94a3b8" />
          <circle cx="24" cy="24" r="10" fill="#cbd5e1" />
          <circle cx="20" cy="22" r="1.8" fill="#0f172a" />
          <circle cx="28" cy="22" r="1.8" fill="#0f172a" />
          <path d="M22 26 Q24 36 28 35" fill="none" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case 'bharat':
      return (
        <svg viewBox="0 0 48 48" className={`vl-pict-svg ${className}`} aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
          {/* Stylized India peninsula diamond/triangle */}
          <polygon points="24,7 36,20 24,41 13,20" fill="#f97316" stroke="#ffffff" strokeWidth="1.5" />
          <polygon points="16,20 32,20 24,39" fill="#10b981" />
          <circle cx="24" cy="22" r="3" fill="#3b82f6" />
        </svg>
      );
    case 'yoga':
      return (
        <svg viewBox="0 0 48 48" className={`vl-pict-svg ${className}`} aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#f3e8ff" stroke="#a855f7" strokeWidth="1.5" />
          <circle cx="24" cy="14" r="4.5" fill="#7e22ce" />
          <path d="M14 26 Q24 18 34 26" fill="none" stroke="#9333ea" strokeWidth="3" strokeLinecap="round" />
          <path d="M24 19 L24 31" stroke="#7e22ce" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M15 35 Q24 29 33 35" fill="none" stroke="#7e22ce" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );
    case 'spices':
      return (
        <svg viewBox="0 0 48 48" className={`vl-pict-svg ${className}`} aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#fef2f2" stroke="#f87171" strokeWidth="1.5" />
          {/* Masala Dabba brass spice bowls */}
          <circle cx="24" cy="24" r="15" fill="#fbbf24" stroke="#b45309" strokeWidth="1.5" />
          <circle cx="24" cy="24" r="4.5" fill="#ef4444" />
          <circle cx="24" cy="14" r="4" fill="#f59e0b" />
          <circle cx="33" cy="19" r="4" fill="#10b981" />
          <circle cx="33" cy="29" r="4" fill="#78350f" />
          <circle cx="24" cy="34" r="4" fill="#eab308" />
          <circle cx="15" cy="29" r="4" fill="#dc2626" />
          <circle cx="15" cy="19" r="4" fill="#16a34a" />
        </svg>
      );
    case 'vishva':
      return (
        <svg viewBox="0 0 48 48" className={`vl-pict-svg ${className}`} aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5" />
          <circle cx="24" cy="24" r="14" fill="#0284c7" />
          <path d="M16 17 Q22 14 28 19 Q31 25 25 32 Q18 29 16 17 Z" fill="#22c55e" />
          <path d="M12 31 Q24 27 36 31" fill="none" stroke="#bae6fd" strokeWidth="2" />
        </svg>
      );
    case 'festivals':
      return (
        <svg viewBox="0 0 48 48" className={`vl-pict-svg ${className}`} aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
          {/* Glowing Diya lamp */}
          <path d="M12 28 Q24 40 36 28 Z" fill="#b45309" stroke="#78350f" strokeWidth="1.5" />
          <path d="M24 12 C20 18 20 24 24 27 C28 24 28 18 24 12 Z" fill="#f97316" />
          <path d="M24 16 C22 20 22 24 24 26 C26 24 26 20 24 16 Z" fill="#fef08a" />
        </svg>
      );
    case 'insects':
      return (
        <svg viewBox="0 0 48 48" className={`vl-pict-svg ${className}`} aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#dcfce7" stroke="#4ade80" strokeWidth="1.5" />
          {/* Butterfly wings */}
          <ellipse cx="17" cy="20" rx="8" ry="6" transform="rotate(-25 17 20)" fill="#f472b6" />
          <ellipse cx="31" cy="20" rx="8" ry="6" transform="rotate(25 31 20)" fill="#f472b6" />
          <ellipse cx="18" cy="30" rx="6" ry="5" transform="rotate(20 18 30)" fill="#fbbf24" />
          <ellipse cx="30" cy="30" rx="6" ry="5" transform="rotate(-20 30 30)" fill="#fbbf24" />
          <rect x="22.5" y="14" width="3" height="20" rx="1.5" fill="#1e293b" />
        </svg>
      );
    case 'birds':
      return (
        <svg viewBox="0 0 48 48" className={`vl-pict-svg ${className}`} aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#dbeafe" stroke="#60a5fa" strokeWidth="1.5" />
          {/* Green parrot silhouette */}
          <ellipse cx="24" cy="26" rx="9" ry="11" fill="#22c55e" />
          <circle cx="24" cy="15" r="7" fill="#4ade80" />
          <polygon points="30,13 37,16 30,19" fill="#ef4444" />
          <circle cx="26" cy="14" r="1.5" fill="#0f172a" />
        </svg>
      );
    case 'flowers':
      return (
        <svg viewBox="0 0 48 48" className={`vl-pict-svg ${className}`} aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#fce7f3" stroke="#f472b6" strokeWidth="1.5" />
          <circle cx="24" cy="14" r="6" fill="#ec4899" />
          <circle cx="34" cy="24" r="6" fill="#f472b6" />
          <circle cx="24" cy="34" r="6" fill="#ec4899" />
          <circle cx="14" cy="24" r="6" fill="#f472b6" />
          <circle cx="24" cy="24" r="5.5" fill="#facc15" />
        </svg>
      );
    case 'moon':
      return (
        <svg viewBox="0 0 48 48" className={`vl-pict-svg ${className}`} aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
          <path d="M28 12 A12 12 0 1 0 36 32 A9 9 0 1 1 28 12 Z" fill="#fef08a" />
          <circle cx="15" cy="16" r="1.5" fill="#ffffff" />
          <circle cx="35" cy="16" r="1.8" fill="#fde047" />
        </svg>
      );
    case 'day':
      return (
        <svg viewBox="0 0 48 48" className={`vl-pict-svg ${className}`} aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#ffedd5" stroke="#fb923c" strokeWidth="1.5" />
          <circle cx="24" cy="28" r="10" fill="#f59e0b" />
          <path d="M6 32 Q24 26 42 32 L42 42 L6 42 Z" fill="#10b981" />
        </svg>
      );
    case 'months':
      return (
        <svg viewBox="0 0 48 48" className={`vl-pict-svg ${className}`} aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1.5" />
          <rect x="10" y="12" width="28" height="26" rx="4" fill="#ffffff" stroke="#0284c7" strokeWidth="1.8" />
          <rect x="10" y="12" width="28" height="8" rx="3" fill="#0284c7" />
          <circle cx="18" cy="26" r="2.2" fill="#f59e0b" />
          <circle cx="24" cy="26" r="2.2" fill="#10b981" />
          <circle cx="30" cy="26" r="2.2" fill="#ec4899" />
          <circle cx="18" cy="32" r="2.2" fill="#3b82f6" />
          <circle cx="24" cy="32" r="2.2" fill="#a855f7" />
          <circle cx="30" cy="32" r="2.2" fill="#ef4444" />
        </svg>
      );
    case 'work':
      return (
        <svg viewBox="0 0 48 48" className={`vl-pict-svg ${className}`} aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#ecfccb" stroke="#84cc16" strokeWidth="1.5" />
          {/* Clay pot & golden wheat ear */}
          <path d="M18 22 L30 22 L33 34 C33 38 15 38 15 34 Z" fill="#d97706" stroke="#92400e" strokeWidth="1.5" />
          <ellipse cx="24" cy="22" rx="6" ry="2.2" fill="#fbbf24" />
          <path d="M24 20 L24 10" stroke="#15803d" strokeWidth="2.2" strokeLinecap="round" />
          <ellipse cx="21" cy="14" rx="3" ry="1.8" transform="rotate(-30 21 14)" fill="#22c55e" />
          <ellipse cx="27" cy="14" rx="3" ry="1.8" transform="rotate(30 27 14)" fill="#22c55e" />
        </svg>
      );
    case 'actions':
      return (
        <svg viewBox="0 0 48 48" className={`vl-pict-svg ${className}`} aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#dcfce7" stroke="#22c55e" strokeWidth="1.5" />
          {/* Playful bouncing ball & star motion */}
          <circle cx="24" cy="24" r="11" fill="#f97316" stroke="#ffffff" strokeWidth="1.5" />
          <path d="M15 19 Q24 26 33 19" fill="none" stroke="#fef08a" strokeWidth="2" />
          <path d="M15 29 Q24 22 33 29" fill="none" stroke="#fef08a" strokeWidth="2" />
        </svg>
      );
    case 'relations':
      return (
        <svg viewBox="0 0 48 48" className={`vl-pict-svg ${className}`} aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#fce7f3" stroke="#f472b6" strokeWidth="1.5" />
          <circle cx="16" cy="20" r="4.5" fill="#0284c7" />
          <path d="M10 34 A6 6 0 0 1 22 34 Z" fill="#38bdf8" />
          <circle cx="32" cy="20" r="4.5" fill="#db2777" />
          <path d="M26 34 A6 6 0 0 1 38 34 Z" fill="#f472b6" />
          <circle cx="24" cy="24" r="3.5" fill="#d97706" />
          <path d="M19 35 A5 5 0 0 1 29 35 Z" fill="#fbbf24" />
        </svg>
      );
    case 'counting':
      return (
        <svg viewBox="0 0 48 48" className={`vl-pict-svg ${className}`} aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.5" />
          <circle cx="15" cy="18" r="6" fill="#f59e0b" />
          <text x="15" y="21" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="900">१</text>
          <circle cx="33" cy="18" r="6" fill="#10b981" />
          <text x="33" y="21" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="900">२</text>
          <circle cx="24" cy="32" r="6" fill="#ec4899" />
          <text x="24" y="35" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="900">३</text>
        </svg>
      );
    case 'instruments':
      return (
        <svg viewBox="0 0 48 48" className={`vl-pict-svg ${className}`} aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
          {/* Golden Temple Bell */}
          <path d="M24 10 C18 10 15 18 15 26 L12 31 L36 31 L33 26 C33 18 30 10 24 10 Z" fill="#f59e0b" stroke="#b45309" strokeWidth="1.5" />
          <circle cx="24" cy="34" r="3" fill="#b45309" />
        </svg>
      );
    case 'vahanas':
      return (
        <svg viewBox="0 0 48 48" className={`vl-pict-svg ${className}`} aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
          {/* Peacock feather crest */}
          <ellipse cx="24" cy="24" rx="10" ry="13" fill="#10b981" />
          <ellipse cx="24" cy="23" rx="6" ry="8" fill="#0284c7" />
          <circle cx="24" cy="22" r="3.5" fill="#1e1b4b" />
          <circle cx="24" cy="22" r="1.5" fill="#fde047" />
        </svg>
      );
    case 'jungle':
      return (
        <svg viewBox="0 0 48 48" className={`vl-pict-svg ${className}`} aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
          {/* Lion mane & crown */}
          <circle cx="24" cy="25" r="13" fill="#d97706" />
          <circle cx="24" cy="25" r="9.5" fill="#fbbf24" />
          <circle cx="21" cy="23" r="1.5" fill="#1e293b" />
          <circle cx="27" cy="23" r="1.5" fill="#1e293b" />
          <polygon points="22,26 26,26 24,29" fill="#92400e" />
        </svg>
      );
    case 'story':
      return (
        <svg viewBox="0 0 48 48" className={`vl-pict-svg ${className}`} aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
          {/* Open storybook with 5 element orbs */}
          <path d="M10 16 Q17 14 24 17 Q31 14 38 16 L38 34 Q31 32 24 35 Q17 32 10 34 Z" fill="#ffffff" stroke="#059669" strokeWidth="1.8" />
          <line x1="24" y1="17" x2="24" y2="35" stroke="#059669" strokeWidth="1.5" />
          <circle cx="17" cy="22" r="2.2" fill="#ef4444" />
          <circle cx="31" cy="22" r="2.2" fill="#38bdf8" />
          <circle cx="17" cy="28" r="2.2" fill="#10b981" />
          <circle cx="31" cy="28" r="2.2" fill="#f59e0b" />
        </svg>
      );
    case 'seasons':
    default:
      return (
        <svg viewBox="0 0 48 48" className={`vl-pict-svg ${className}`} aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#ecfeff" stroke="#06b6d4" strokeWidth="1.5" />
          <circle cx="17" cy="18" r="6" fill="#f59e0b" />
          <path d="M24 30 A6 6 0 0 1 36 30 A4 4 0 0 1 38 37 L22 37 A4 4 0 0 1 24 30 Z" fill="#38bdf8" />
          <circle cx="16" cy="33" r="4.5" fill="#ec4899" />
          <circle cx="16" cy="33" r="2" fill="#fef08a" />
        </svg>
      );
  }
};

/**
 * Pictorial mini-graphics for Domain Filter Chips
 */
export const LabDomainPictogram: React.FC<{ id: LabCategory; className?: string }> = ({ id, className = '' }) => {
  switch (id) {
    case 'all':
      return (
        <svg viewBox="0 0 24 24" className={`vl-pict-inline ${className}`} aria-hidden="true">
          <circle cx="7" cy="7" r="4" fill="#f59e0b" />
          <circle cx="17" cy="7" r="4" fill="#10b981" />
          <circle cx="7" cy="17" r="4" fill="#38bdf8" />
          <circle cx="17" cy="17" r="4" fill="#a855f7" />
        </svg>
      );
    case 'life':
      return (
        <svg viewBox="0 0 24 24" className={`vl-pict-inline ${className}`} aria-hidden="true">
          <path d="M17 4 C10 4 5 9 5 16 C5 18 6 19 6 19 C6 19 7 20 9 20 C16 20 20 14 20 7 Z" fill="#10b981" />
          <path d="M6 19 Q12 13 17 7" fill="none" stroke="#ecfdf5" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'matter':
      return (
        <svg viewBox="0 0 24 24" className={`vl-pict-inline ${className}`} aria-hidden="true">
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(30 12 12)" fill="none" stroke="#f59e0b" strokeWidth="1.8" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(-30 12 12)" fill="none" stroke="#38bdf8" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="3" fill="#ef4444" />
        </svg>
      );
    case 'cosmos':
      return (
        <svg viewBox="0 0 24 24" className={`vl-pict-inline ${className}`} aria-hidden="true">
          <circle cx="12" cy="12" r="6" fill="#6366f1" />
          <ellipse cx="12" cy="12" rx="11" ry="4" transform="rotate(-20 12 12)" fill="none" stroke="#fbbf24" strokeWidth="2" />
        </svg>
      );
    case 'waves':
    default:
      return (
        <svg viewBox="0 0 24 24" className={`vl-pict-inline ${className}`} aria-hidden="true">
          <path d="M2 12 Q6 4 10 12 T18 12 T22 12" fill="none" stroke="#a855f7" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="6" cy="8" r="2" fill="#f43f5e" />
          <circle cx="14" cy="16" r="2" fill="#38bdf8" />
        </svg>
      );
  }
};

/**
 * Pictorial mini-graphics for the 3 Core Pillars (Observation, Learn from Nature, Purpose)
 */
export const LabPillarPictogram: React.FC<{ id: 'observe' | 'nature' | 'purpose'; className?: string }> = ({ id, className = '' }) => {
  switch (id) {
    case 'observe':
      return (
        <svg viewBox="0 0 36 36" className={`vl-pict-pillar ${className}`} aria-hidden="true">
          <rect width="36" height="36" rx="10" fill="#e0f2fe" />
          <path d="M5 18 Q18 7 31 18 Q18 29 5 18 Z" fill="#ffffff" stroke="#0284c7" strokeWidth="2" />
          <circle cx="18" cy="18" r="5" fill="#0284c7" />
          <circle cx="18" cy="18" r="2" fill="#fef08a" />
        </svg>
      );
    case 'nature':
      return (
        <svg viewBox="0 0 36 36" className={`vl-pict-pillar ${className}`} aria-hidden="true">
          <rect width="36" height="36" rx="10" fill="#dcfce7" />
          <circle cx="18" cy="15" r="8" fill="#10b981" />
          <circle cx="13" cy="18" r="6" fill="#059669" />
          <circle cx="23" cy="18" r="6" fill="#34d399" />
          <rect x="16.5" y="22" width="3" height="8" rx="1" fill="#92400e" />
        </svg>
      );
    case 'purpose':
    default:
      return (
        <svg viewBox="0 0 36 36" className={`vl-pict-pillar ${className}`} aria-hidden="true">
          <rect width="36" height="36" rx="10" fill="#fef3c7" />
          <circle cx="18" cy="18" r="11" fill="#ef4444" />
          <circle cx="18" cy="18" r="7.5" fill="#ffffff" />
          <circle cx="18" cy="18" r="4" fill="#f59e0b" />
        </svg>
      );
  }
};

/**
 * Pictorial mini-graphics for the 7 Vedic IKS Branches
 */
export const IksBranchPictogram: React.FC<{
  branch: 'darshana' | 'ganita' | 'jyotisha' | 'itihasa' | 'ayurveda' | 'vastu' | 'vyakarana';
  className?: string;
}> = ({ branch, className = '' }) => {
  switch (branch) {
    case 'darshana':
      return (
        <svg viewBox="0 0 24 24" className={`vl-pict-inline ${className}`} aria-hidden="true">
          <circle cx="12" cy="7" r="3.5" fill="#c084fc" />
          <circle cx="7" cy="16" r="3.5" fill="#38bdf8" />
          <circle cx="17" cy="16" r="3.5" fill="#fbbf24" />
          <polygon points="12,7 7,16 17,16" fill="none" stroke="#f8fafc" strokeWidth="1.5" />
        </svg>
      );
    case 'ganita':
      return (
        <svg viewBox="0 0 24 24" className={`vl-pict-inline ${className}`} aria-hidden="true">
          <polygon points="4,19 19,19 19,5" fill="rgba(251, 146, 60, 0.35)" stroke="#fb923c" strokeWidth="2" />
          <rect x="15" y="15" width="4" height="4" fill="none" stroke="#fde047" strokeWidth="1.4" />
        </svg>
      );
    case 'jyotisha':
      return (
        <svg viewBox="0 0 24 24" className={`vl-pict-inline ${className}`} aria-hidden="true">
          <circle cx="12" cy="12" r="5" fill="#fbbf24" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(-25 12 12)" fill="none" stroke="#22d3ee" strokeWidth="1.8" />
        </svg>
      );
    case 'itihasa':
      return (
        <svg viewBox="0 0 24 24" className={`vl-pict-inline ${className}`} aria-hidden="true">
          <rect x="4" y="5" width="16" height="14" rx="2.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.6" />
          <line x1="8" y1="10" x2="16" y2="10" stroke="#854d0e" strokeWidth="1.8" />
          <line x1="8" y1="14" x2="14" y2="14" stroke="#854d0e" strokeWidth="1.8" />
        </svg>
      );
    case 'ayurveda':
      return (
        <svg viewBox="0 0 24 24" className={`vl-pict-inline ${className}`} aria-hidden="true">
          <path d="M12 3 C7 8 6 14 12 20 C18 14 17 8 12 3 Z" fill="#34d399" />
          <path d="M5 12 C7 16 10 18 12 20 C8 19 4 16 5 12 Z" fill="#10b981" />
          <path d="M19 12 C17 16 14 18 12 20 C16 19 20 16 19 12 Z" fill="#10b981" />
        </svg>
      );
    case 'vastu':
      return (
        <svg viewBox="0 0 24 24" className={`vl-pict-inline ${className}`} aria-hidden="true">
          <polygon points="12,3 5,11 19,11" fill="#fbbf24" />
          <rect x="7" y="11" width="10" height="8" fill="#d97706" />
          <rect x="4" y="19" width="16" height="2.5" fill="#fde08a" />
        </svg>
      );
    case 'vyakarana':
    default:
      return (
        <svg viewBox="0 0 24 24" className={`vl-pict-inline ${className}`} aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="4" fill="#f43f5e" />
          <path d="M7 12 L17 12 M12 7 L12 17" stroke="#fef08a" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
  }
};
