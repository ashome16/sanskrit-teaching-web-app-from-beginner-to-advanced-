import React from 'react';

export interface IksLabGraphicProps {
  id: string;
  className?: string;
  _compact?: boolean;
}

/* ==========================================================================
   1. KONARK: Sūrya-Cakra Chariot Wheel (AST-01)
   ========================================================================== */
export const KonarkSunWheelSchematic: React.FC<{ _compact?: boolean; className?: string }> = ({
  className = '',
}) => (
  <div className={`iks-schematic-wrap iks-schematic--konark ${className}`} style={{ width: '100%', overflow: 'hidden' }}>
    <svg viewBox="0 0 640 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '14px' }} role="img" aria-label="Konark Sun Temple Chariot Wheel & Solar Timekeeping Schematic">
      <defs>
        <linearGradient id="konarkBg" x1="0" y1="0" x2="640" y2="320" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1a0f05" />
          <stop offset="0.5" stopColor="#2b1807" />
          <stop offset="1" stopColor="#140a03" />
        </linearGradient>
        <pattern id="konarkGrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#78350f" strokeWidth="0.6" strokeOpacity="0.35" />
        </pattern>
      </defs>
      <rect width="640" height="320" fill="url(#konarkBg)" />
      <rect width="640" height="320" fill="url(#konarkGrid)" />
      <circle cx="160" cy="160" r="110" fill="#f59e0b" opacity="0.12" filter="blur(40px)" />
      <circle cx="480" cy="160" r="100" fill="#fbbf24" opacity="0.08" filter="blur(40px)" />

      {/* TOP BANNER */}
      <rect x="18" y="14" width="604" height="28" rx="6" fill="#2d1305" stroke="#78350f" strokeWidth="1" />
      <text x="32" y="32" fill="#fbbf24" fontSize="10.5" fontFamily="monospace" fontWeight="700" letterSpacing="0.08em">
        AST-01 · KOṆĀRKA SŪRYA-CAKRAM · KALINGA ARCHITECTURE (c. 1250 CE)
      </text>
      <text x="608" y="32" textAnchor="end" fill="#fde68a" fontSize="10.5" fontFamily="monospace" fontWeight="700">
        24-SPOKE SOLAR TIME RECKONING
      </text>

      {/* LEFT: 24-Spoke Stone Chariot Wheel */}
      <g transform="translate(160, 160)">
        {/* Outer Wheel Rim */}
        <circle cx="0" cy="0" r="92" stroke="#d97706" strokeWidth="6" fill="#1f1105" />
        <circle cx="0" cy="0" r="84" stroke="#92400e" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
        <circle cx="0" cy="0" r="76" stroke="#f59e0b" strokeWidth="1" fill="none" />

        {/* 30 Time Beads along rim */}
        {Array.from({ length: 30 }).map((_, i) => {
          const angle = (i * 12 * Math.PI) / 180;
          return <circle key={i} cx={80 * Math.cos(angle)} cy={80 * Math.sin(angle)} r="1.8" fill="#fde68a" />;
        })}

        {/* 8 Major Spokes (Praharas = 3 Hours each) */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 45 * Math.PI) / 180;
          const x2 = 74 * Math.cos(angle);
          const y2 = 74 * Math.sin(angle);
          return (
            <g key={i}>
              <line x1="0" y1="0" x2={x2} y2={y2} stroke="#f59e0b" strokeWidth="3" />
              <circle cx={x2 * 0.55} cy={y2 * 0.55} r="4" fill="#78350f" stroke="#f59e0b" strokeWidth="1" />
            </g>
          );
        })}

        {/* 8 Minor Spokes (Sub-Prahara = 1.5 Hours each) */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = ((i * 45 + 22.5) * Math.PI) / 180;
          return <line key={i} x1="0" y1="0" x2={74 * Math.cos(angle)} y2={74 * Math.sin(angle)} stroke="#b45309" strokeWidth="1.6" strokeDasharray="4 2" />;
        })}

        {/* Central Hub Gnomon */}
        <circle cx="0" cy="0" r="16" fill="#78350f" stroke="#f59e0b" strokeWidth="2" />
        <circle cx="0" cy="0" r="6" fill="#fde68a" />

        {/* Active Shadow Cast */}
        <path d="M 0 0 L 48 -36 L 42 -44 Z" fill="#000000" opacity="0.65" />
        <line x1="0" y1="0" x2="45" y2="-40" stroke="#fde047" strokeWidth="1.2" />
        <circle cx="45" cy="-40" r="3" fill="#f59e0b" />
      </g>

      {/* RIGHT: Sun Azimuth Geometry & Time Units */}
      <g transform="translate(325, 54)">
        <rect x="0" y="0" width="290" height="195" rx="8" fill="#1c0f05" stroke="#78350f" strokeWidth="1.2" />
        <text x="14" y="22" fill="#fbbf24" fontSize="9.5" fontWeight="800">SOLAR AZIMUTH TIME PROJECTION</text>
        <text x="14" y="34" fill="#d97706" fontSize="7.5" fontFamily="monospace">Sub-hourly accuracy via Gnomon Shadow Thickness</text>

        {/* Breakdown boxes */}
        <g transform="translate(14, 46)">
          <rect x="0" y="0" width="126" height="42" rx="4" fill="#2d1305" stroke="#92400e" strokeWidth="0.8" />
          <text x="10" y="15" fill="#fde68a" fontSize="8" fontWeight="700">1 PRAHARA (प्रहरः)</text>
          <text x="10" y="28" fill="#f59e0b" fontSize="11" fontWeight="800" fontFamily="monospace">3 Hours · 7.5 Ghaṭikās</text>
          <text x="10" y="38" fill="#a16207" fontSize="7" fontFamily="monospace">8 Praharas = 1 Solar Day</text>

          <rect x="136" y="0" width="126" height="42" rx="4" fill="#2d1305" stroke="#92400e" strokeWidth="0.8" />
          <text x="146" y="15" fill="#fde68a" fontSize="8" fontWeight="700">1 GHAṬIKĀ (घटिका)</text>
          <text x="146" y="28" fill="#f59e0b" fontSize="11" fontWeight="800" fontFamily="monospace">24 Minutes</text>
          <text x="146" y="38" fill="#a16207" fontSize="7" fontFamily="monospace">Measured by Spoke Beads</text>
        </g>

        {/* Azimuth Angle Ray Diagram */}
        <g transform="translate(14, 98)">
          <rect x="0" y="0" width="262" height="85" rx="4" fill="#0d0602" stroke="#451a03" strokeWidth="0.8" />
          <line x1="20" y1="70" x2="240" y2="70" stroke="#64748b" strokeWidth="1" />
          <text x="240" y="78" textAnchor="end" fill="#64748b" fontSize="7" fontFamily="monospace">HORIZON (क्षितिज)</text>

          {/* Meridian Transit */}
          <line x1="130" y1="12" x2="130" y2="70" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="3 2" />
          <text x="130" y="10" textAnchor="middle" fill="#fde68a" fontSize="7.5" fontWeight="700">SOLAR NOON (मध्याह्न)</text>

          {/* Ray */}
          <line x1="40" y1="25" x2="130" y2="70" stroke="#fde047" strokeWidth="1.5" />
          <circle cx="40" cy="25" r="5" fill="#fbbf24" />
          <path d="M 110 70 A 20 20 0 0 1 120 60" stroke="#f59e0b" strokeWidth="1" fill="none" />
          <text x="96" y="58" fill="#fde68a" fontSize="8" fontFamily="monospace">θ = Azimuth</text>
          <text x="180" y="44" fill="#38bdf8" fontSize="8" fontFamily="monospace">Shadow Width: 18mm</text>
          <text x="180" y="56" fill="#34d399" fontSize="7.5" fontFamily="monospace">Exact Time: 10:24 AM</text>
        </g>
      </g>

      {/* FOOTER */}
      <g transform="translate(18, 258)">
        <rect x="0" y="0" width="604" height="48" rx="6" fill="#1c0f05" stroke="#78350f" strokeWidth="1" />
        <circle cx="20" cy="24" r="6" fill="#f59e0b" />
        <text x="34" y="22" fill="#f8fafc" fontSize="10" fontWeight="700">Astronomical Precision of Kalinga Sculptors</text>
        <text x="34" y="36" fill="#fde68a" fontSize="8.5" fontFamily="monospace">
          The 24 wheels of the Sun Chariot are active astronomical sundials that compute solar declination, seasonal drift, and local mean solar time.
        </text>
      </g>
    </svg>
  </div>
);

/* ==========================================================================
   2. PATINA: Delhi Iron Pillar Passivation (MET-01)
   ========================================================================== */
export const PatinaPassivationSchematic: React.FC<{ _compact?: boolean; className?: string }> = ({
  className = '',
}) => {
  return (
    <div className={`iks-schematic-wrap iks-schematic--patina ${className}`} style={{ width: '100%', overflow: 'hidden' }}>
      <svg viewBox="0 0 640 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '14px' }} role="img" aria-label="Delhi Iron Pillar Passivation Film & Solid-State Metallurgy Schematic">
        <defs>
          <linearGradient id="patinaBg" x1="0" y1="0" x2="640" y2="320" gradientUnits="userSpaceOnUse">
            <stop stopColor="#08101e" />
            <stop offset="0.5" stopColor="#0d1b2e" />
            <stop offset="1" stopColor="#091424" />
          </linearGradient>
          <linearGradient id="pillarShaft" x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="#1e293b" />
            <stop offset="0.35" stopColor="#475569" />
            <stop offset="0.7" stopColor="#334155" />
            <stop offset="1" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="misawiteLayer" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#f59e0b" stopOpacity="0.95" />
            <stop offset="1" stopColor="#b45309" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="protectiveCrust" x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="#38bdf8" stopOpacity="0.85" />
            <stop offset="1" stopColor="#0284c7" stopOpacity="0.95" />
          </linearGradient>
          <pattern id="patinaGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.6" strokeOpacity="0.6" />
          </pattern>
        </defs>

        <rect width="640" height="320" fill="url(#patinaBg)" />
        <rect width="640" height="320" fill="url(#patinaGrid)" opacity="0.75" />
        <circle cx="110" cy="160" r="90" fill="#0284c7" opacity="0.12" filter="blur(30px)" />
        <circle cx="430" cy="170" r="120" fill="#f59e0b" opacity="0.10" filter="blur(40px)" />

        <g id="header">
          <rect x="18" y="14" width="604" height="28" rx="6" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />
          <text x="32" y="32" fill="#38bdf8" fontSize="10.5" fontFamily="monospace" fontWeight="700" letterSpacing="0.08em">
            MET-01 · METALLURGICAL SOLID-STATE CHEMISTRY · c. 400 CE
          </text>
          <text x="608" y="32" textAnchor="end" fill="#f59e0b" fontSize="10.5" fontFamily="monospace" fontWeight="700">
            δ-FeOOH (MISAWITE) PASSIVATION BARRIER
          </text>
        </g>

        <g id="pillar-cutaway" transform="translate(42, 54)">
          <line x1="-15" y1="230" x2="145" y2="230" stroke="#334155" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="65" y="244" textAnchor="middle" fill="#64748b" fontSize="8.5" fontFamily="monospace">ORIGINAL GROUND BEDDING</text>
          <path d="M 40 28 L 90 28 L 86 38 L 44 38 Z" fill="#64748b" />
          <path d="M 34 38 L 96 38 L 92 48 L 38 48 Z" fill="#475569" />
          <path d="M 46 48 L 84 48 L 82 56 L 48 56 Z" fill="#64748b" />
          <path d="M 50 56 L 80 56 L 76 72 L 54 72 Z" fill="#334155" />
          <path d="M 53 72 L 77 72 L 81 228 L 49 228 Z" fill="url(#pillarShaft)" stroke="#475569" strokeWidth="1" />
          <rect x="52" y="112" width="26" height="34" fill="#0f172a" opacity="0.6" />
          <line x1="55" y1="118" x2="75" y2="118" stroke="#f59e0b" strokeWidth="1" opacity="0.8" />
          <line x1="55" y1="124" x2="73" y2="124" stroke="#f59e0b" strokeWidth="1" opacity="0.8" />
          <line x1="55" y1="130" x2="76" y2="130" stroke="#f59e0b" strokeWidth="1" opacity="0.8" />
          <line x1="55" y1="136" x2="71" y2="136" stroke="#f59e0b" strokeWidth="1" opacity="0.8" />
          <line x1="55" y1="142" x2="74" y2="142" stroke="#f59e0b" strokeWidth="1" opacity="0.8" />
          <line x1="28" y1="28" x2="28" y2="228" stroke="#38bdf8" strokeWidth="0.8" />
          <line x1="24" y1="28" x2="32" y2="28" stroke="#38bdf8" strokeWidth="0.8" />
          <line x1="24" y1="228" x2="32" y2="228" stroke="#38bdf8" strokeWidth="0.8" />
          <text x="22" y="132" textAnchor="end" fill="#38bdf8" fontSize="8" fontFamily="monospace">7.2m · 6,000kg</text>
          <circle cx="80" cy="148" r="6" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
          <circle cx="80" cy="148" r="2" fill="#f59e0b" />
          <path d="M 86 148 L 175 110" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="3 2" />
          <path d="M 86 148 L 175 220" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="3 2" />
        </g>

        <g id="microscopic-cross-section" transform="translate(225, 54)">
          <rect x="0" y="0" width="375" height="195" rx="8" fill="#070e1b" stroke="#1e293b" strokeWidth="1.2" />
          <rect x="12" y="10" width="128" height="18" rx="4" fill="#0f172a" />
          <text x="18" y="22" fill="#94a3b8" fontSize="8.5" fontFamily="monospace">SURFACE PROFILE · 100 µm</text>
          <rect x="12" y="34" width="130" height="148" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="1" />
          <path d="M 24 50 Q 55 62 85 48 T 130 58" stroke="#f59e0b" strokeWidth="2.2" strokeDasharray="6 3" fill="none" />
          <path d="M 20 85 Q 60 75 95 90 T 135 80" stroke="#f59e0b" strokeWidth="1.8" strokeDasharray="5 3" fill="none" />
          <path d="M 28 120 Q 65 135 105 118 T 130 130" stroke="#f59e0b" strokeWidth="2" strokeDasharray="7 3" fill="none" />
          <path d="M 18 155 Q 55 145 90 162 T 135 152" stroke="#f59e0b" strokeWidth="1.6" strokeDasharray="4 2" fill="none" />
          <text x="20" y="48" fill="#cbd5e1" fontSize="9" fontWeight="700">WROUGHT IRON SUBSTRATE</text>
          <text x="20" y="60" fill="#94a3b8" fontSize="7.5" fontFamily="monospace">Fe Matrix + 0.28% Phosphorus</text>
          <text x="20" y="70" fill="#f59e0b" fontSize="7.2" fontFamily="monospace">Slag Fiber Entrapment</text>

          <rect x="146" y="34" width="94" height="148" rx="3" fill="url(#misawiteLayer)" stroke="#d97706" strokeWidth="1" />
          <g stroke="#ffffff" strokeOpacity="0.4" strokeWidth="0.8">
            <line x1="152" y1="46" x2="232" y2="46" /><line x1="152" y1="68" x2="232" y2="68" /><line x1="152" y1="90" x2="232" y2="90" /><line x1="152" y1="112" x2="232" y2="112" /><line x1="152" y1="134" x2="232" y2="134" /><line x1="152" y1="156" x2="232" y2="156" />
            <circle cx="168" cy="46" r="2" fill="#fef3c7" /><circle cx="212" cy="46" r="2" fill="#fef3c7" /><circle cx="190" cy="68" r="2" fill="#fef3c7" /><circle cx="168" cy="90" r="2" fill="#fef3c7" /><circle cx="212" cy="90" r="2" fill="#fef3c7" /><circle cx="190" cy="112" r="2" fill="#fef3c7" /><circle cx="168" cy="134" r="2" fill="#fef3c7" /><circle cx="212" cy="134" r="2" fill="#fef3c7" /><circle cx="190" cy="156" r="2" fill="#fef3c7" />
          </g>
          <text x="154" y="48" fill="#451a03" fontSize="8.5" fontWeight="800">δ-FeOOH LAYER</text>
          <text x="154" y="58" fill="#78350f" fontSize="7" fontWeight="700">Crystalline Misawite</text>
          <text x="154" y="174" fill="#451a03" fontSize="7" fontWeight="700">Thickness ≈ 50 µm</text>

          <rect x="244" y="34" width="48" height="148" rx="3" fill="url(#protectiveCrust)" stroke="#38bdf8" strokeWidth="1" />
          <text x="250" y="48" fill="#082f49" fontSize="8" fontWeight="800">BARRIER</text>
          <text x="250" y="58" fill="#075985" fontSize="6.8" fontWeight="700">Amorphous</text>
          <text x="250" y="174" fill="#082f49" fontSize="6.8" fontWeight="700">Impervious</text>

          <g id="atmosphere-attack" transform="translate(296, 34)">
            <text x="12" y="16" fill="#38bdf8" fontSize="8" fontWeight="700">AIR / MONSOON</text>
            <text x="12" y="26" fill="#64748b" fontSize="7" fontFamily="monospace">H₂O + O₂ Vapor</text>
            <path d="M 68 45 L 2 55" stroke="#38bdf8" strokeWidth="1.4" strokeDasharray="3 2" />
            <path d="M 2 55 L 68 68" stroke="#34d399" strokeWidth="1.6" />
            <polygon points="68,68 60,65 62,71" fill="#34d399" />
            <circle cx="70" cy="45" r="3" fill="#38bdf8" />
            <text x="12" y="76" fill="#34d399" fontSize="6.8" fontFamily="monospace">100% REBOUND</text>
            <path d="M 68 105 L 2 115" stroke="#38bdf8" strokeWidth="1.4" strokeDasharray="3 2" />
            <path d="M 2 115 L 68 126" stroke="#34d399" strokeWidth="1.6" />
            <polygon points="68,126 60,123 62,129" fill="#34d399" />
            <circle cx="70" cy="105" r="3" fill="#38bdf8" />
            <rect x="8" y="140" width="64" height="24" rx="4" fill="#064e3b" stroke="#10b981" strokeWidth="0.8" />
            <text x="40" y="152" textAnchor="middle" fill="#a7f3d0" fontSize="7.5" fontWeight="700">NO PITTING</text>
            <text x="40" y="160" textAnchor="middle" fill="#6ee7b7" fontSize="6.5" fontFamily="monospace">Zero Rust Drift</text>
          </g>
        </g>

        <g id="footer-bar" transform="translate(18, 258)">
          <rect x="0" y="0" width="604" height="48" rx="6" fill="#0b1324" stroke="#1e293b" strokeWidth="1" />
          <circle cx="20" cy="24" r="6" fill="#34d399" />
          <text x="34" y="22" fill="#f8fafc" fontSize="10" fontWeight="700">Catalytic Mechanism: High Phosphorus (P) + Alternate Wet/Dry Monsoon Acceleration</text>
          <text x="34" y="36" fill="#94a3b8" fontSize="8.5" fontFamily="monospace">
            Solid-state phosphate enrichment converts corrosive rust into an insoluble, compact δ-FeOOH barrier crust that preserves the core indefinitely.
          </text>
        </g>
      </svg>
    </div>
  );
};

/* ==========================================================================
   3. CIPHER: Kaṭapayādi Alphanumeric System (MTH-01)
   ========================================================================== */
export const KatapayadiCipherSchematic: React.FC<{ _compact?: boolean; className?: string }> = ({
  className = '',
}) => (
  <div className={`iks-schematic-wrap iks-schematic--cipher ${className}`} style={{ width: '100%', overflow: 'hidden' }}>
    <svg viewBox="0 0 640 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '14px' }} role="img" aria-label="Kaṭapayādi Alphanumeric Cipher & Sanskrit Numerical Encryption Matrix">
      <defs>
        <linearGradient id="cipherBg" x1="0" y1="0" x2="640" y2="320" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0a0f24" /><stop offset="0.5" stopColor="#120c2b" /><stop offset="1" stopColor="#080d21" />
        </linearGradient>
        <pattern id="cipherGrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#2e1065" strokeWidth="0.6" strokeOpacity="0.4" />
        </pattern>
      </defs>
      <rect width="640" height="320" fill="url(#cipherBg)" />
      <rect width="640" height="320" fill="url(#cipherGrid)" />
      <circle cx="160" cy="160" r="110" fill="#7c3aed" opacity="0.14" filter="blur(40px)" />
      <circle cx="480" cy="160" r="110" fill="#c084fc" opacity="0.10" filter="blur(40px)" />

      <g id="cipher-topbar">
        <rect x="18" y="14" width="604" height="28" rx="6" fill="#170f38" stroke="#3b0764" strokeWidth="1" />
        <text x="32" y="32" fill="#c084fc" fontSize="10.5" fontFamily="monospace" fontWeight="700" letterSpacing="0.08em">
          MTH-01 · KAṬAPAYĀDI ALPHANUMERIC SYSTEM · KĒRAḶA SCHOOL (c. 1380 CE)
        </text>
        <text x="608" y="32" textAnchor="end" fill="#facc15" fontSize="10.5" fontFamily="monospace" fontWeight="700">
          अङ्कानां वामतो गतिः (RIGHT-TO-LEFT NUMBERS)
        </text>
      </g>

      <g id="matrix-table" transform="translate(24, 54)">
        <rect x="0" y="0" width="280" height="195" rx="8" fill="#130b2c" stroke="#2e1065" strokeWidth="1.2" />
        <rect x="8" y="8" width="264" height="20" rx="4" fill="#241047" />
        <text x="14" y="22" fill="#e9d5ff" fontSize="8.5" fontFamily="monospace" fontWeight="700">
          DIGIT MAPPING: क-ट-प-यादि सूत्रम्
        </text>
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((digit, i) => (
          <g key={digit} transform={`translate(${14 + i * 26}, 34)`}>
            <rect x="0" y="0" width="22" height="18" rx="3" fill="#7c3aed" />
            <text x="11" y="13" textAnchor="middle" fill="#ffffff" fontSize="9.5" fontWeight="800">{digit}</text>
          </g>
        ))}
        <g transform="translate(14, 58)">
          {['क', 'ख', 'ग', 'घ', 'ङ', 'च', 'छ', 'ज', 'झ', 'ञ'].map((ch, i) => (
            <g key={ch} transform={`translate(${i * 26}, 0)`}>
              <rect x="0" y="0" width="22" height="24" rx="3" fill="#1c1138" stroke="#3b0764" strokeWidth="0.8" />
              <text x="11" y="16" textAnchor="middle" fill="#e9d5ff" fontSize="11" fontWeight="700">{ch}</text>
            </g>
          ))}
        </g>
        <g transform="translate(14, 88)">
          {['ट', 'ठ', 'ड', 'ढ', 'ण', 'त', 'थ', 'द', 'ध', 'न'].map((ch, i) => (
            <g key={ch} transform={`translate(${i * 26}, 0)`}>
              <rect x="0" y="0" width="22" height="24" rx="3" fill="#1c1138" stroke="#3b0764" strokeWidth="0.8" />
              <text x="11" y="16" textAnchor="middle" fill="#e9d5ff" fontSize="11" fontWeight="700">{ch}</text>
            </g>
          ))}
        </g>
        <g transform="translate(14, 118)">
          {['प', 'फ', 'ब', 'भ', 'म', '—', '—', '—', '—', '—'].map((ch, i) => (
            <g key={ch} transform={`translate(${i * 26}, 0)`}>
              <rect x="0" y="0" width="22" height="24" rx="3" fill="#1c1138" stroke="#3b0764" strokeWidth="0.8" />
              <text x="11" y="16" textAnchor="middle" fill={ch === '—' ? '#64748b' : '#e9d5ff'} fontSize="11" fontWeight="700">{ch}</text>
            </g>
          ))}
        </g>
        <g transform="translate(14, 148)">
          {['य', 'र', 'ल', 'व', 'श', 'ष', 'स', 'ह', '—', 'स्वर'].map((ch, i) => (
            <g key={ch} transform={`translate(${i * 26}, 0)`}>
              <rect x="0" y="0" width="22" height="24" rx="3" fill="#1c1138" stroke="#3b0764" strokeWidth="0.8" />
              <text x="11" y="15" textAnchor="middle" fill={ch === '—' ? '#64748b' : '#fbbf24'} fontSize={ch === 'स्वर' ? '7.5' : '10'} fontWeight="700">{ch}</text>
            </g>
          ))}
        </g>
        <text x="14" y="186" fill="#a855f7" fontSize="7.8" fontFamily="monospace">Rule: Vowels (स्वर) &amp; conjunct halanta consonants carry no numerical weight.</text>
      </g>

      <g id="pi-decryption-flow" transform="translate(320, 54)">
        <rect x="0" y="0" width="296" height="195" rx="8" fill="#110b27" stroke="#3b0764" strokeWidth="1.2" />
        <text x="14" y="20" fill="#facc15" fontSize="9.5" fontWeight="800">CASE STUDY: MĀDHAVA’S 31-DECIMAL π VERSE</text>
        <text x="14" y="32" fill="#94a3b8" fontSize="7.5" fontFamily="monospace">From the Sadratnamāla (Kēraḷa Ganita Tradition)</text>
        <g transform="translate(14, 44)">
          <rect x="0" y="0" width="268" height="30" rx="4" fill="#1e103f" stroke="#581c87" strokeWidth="1" />
          <text x="12" y="20" fill="#f8fafc" fontSize="13" fontWeight="700" letterSpacing="0.18em">गो पी भा ग्य म धु व्रा त ...</text>
        </g>
        <g transform="translate(14, 82)">
          {[
            { syl: 'गो', con: 'ग', dig: '3' }, { syl: 'पी', con: 'प', dig: '1' }, { syl: 'भा', con: 'भ', dig: '4' },
            { syl: 'ग्य', con: 'य', dig: '1' }, { syl: 'म', con: 'म', dig: '5' }, { syl: 'धु', con: 'ध', dig: '9' },
            { syl: 'व्रा', con: 'र', dig: '2' }, { syl: 'त', con: 'त', dig: '6' },
          ].map((item, idx) => (
            <g key={idx} transform={`translate(${idx * 33}, 0)`}>
              <rect x="0" y="0" width="28" height="18" rx="3" fill="#2e1065" />
              <text x="14" y="13" textAnchor="middle" fill="#d8b4fe" fontSize="9" fontWeight="700">{item.syl}</text>
              <path d="M 14 20 L 14 27" stroke="#a855f7" strokeWidth="1" />
              <rect x="0" y="29" width="28" height="20" rx="3" fill="#4c1d95" stroke="#a855f7" strokeWidth="1" />
              <text x="14" y="43" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="800">{item.dig}</text>
            </g>
          ))}
        </g>
        <g transform="translate(14, 140)">
          <rect x="0" y="0" width="268" height="42" rx="5" fill="#030712" stroke="#f59e0b" strokeWidth="1" />
          <text x="10" y="16" fill="#f59e0b" fontSize="8" fontFamily="monospace" fontWeight="700">REVERSED OUTPUT (अङ्कानां वामतो गतिः):</text>
          <text x="10" y="32" fill="#38bdf8" fontSize="13" fontFamily="monospace" fontWeight="800">π = 3.14159265...</text>
        </g>
      </g>

      <g id="cipher-footer" transform="translate(18, 258)">
        <rect x="0" y="0" width="604" height="48" rx="6" fill="#0f0926" stroke="#2e1065" strokeWidth="1" />
        <circle cx="20" cy="24" r="6" fill="#c084fc" />
        <text x="34" y="22" fill="#f8fafc" fontSize="10" fontWeight="700">Dual Function: Poetic Mnemonic + Cryptographic Hashing</text>
        <text x="34" y="36" fill="#a855f7" fontSize="8.5" fontFamily="monospace">
          Enabled ancient astronomers to transmit orbital tables, ephemerides, and sine values in meter without transcription errors.
        </text>
      </g>
    </svg>
  </div>
);

/* ==========================================================================
   4. BIODOME: Prakṛti Closed-Loop Biosphere (ECO-01)
   ========================================================================== */
export const BioDomeEcosystemSchematic: React.FC<{ _compact?: boolean; className?: string }> = ({
  className = '',
}) => (
  <div className={`iks-schematic-wrap iks-schematic--biodome ${className}`} style={{ width: '100%', overflow: 'hidden' }}>
    <svg viewBox="0 0 640 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '14px' }} role="img" aria-label="Prakṛti Closed-Loop Bio-Dome & Trophic Biosphere Schematic">
      <defs>
        <linearGradient id="domeBg" x1="0" y1="0" x2="640" y2="320" gradientUnits="userSpaceOnUse">
          <stop stopColor="#041a14" /><stop offset="0.5" stopColor="#062e22" /><stop offset="1" stopColor="#031711" />
        </linearGradient>
        <linearGradient id="domeShell" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#34d399" stopOpacity="0.45" /><stop offset="1" stopColor="#059669" stopOpacity="0.05" />
        </linearGradient>
        <pattern id="ecoGrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#064e3b" strokeWidth="0.6" strokeOpacity="0.5" />
        </pattern>
      </defs>
      <rect width="640" height="320" fill="url(#domeBg)" />
      <rect width="640" height="320" fill="url(#ecoGrid)" />
      <circle cx="320" cy="180" r="140" fill="#10b981" opacity="0.12" filter="blur(50px)" />

      <g id="dome-topbar">
        <rect x="18" y="14" width="604" height="28" rx="6" fill="#042018" stroke="#064e3b" strokeWidth="1" />
        <text x="32" y="32" fill="#34d399" fontSize="10.5" fontFamily="monospace" fontWeight="700" letterSpacing="0.08em">
          ECO-01 · PRAKṚTI CLOSED-LOOP BIOSPHERE DOME · VR̥KṢĀYURVEDA
        </text>
        <text x="608" y="32" textAnchor="end" fill="#facc15" fontSize="10.5" fontFamily="monospace" fontWeight="700">
          अन्नाद् भवन्ति भूतानि (GĪTĀ 3.14 TROPHIC CYCLE)
        </text>
      </g>

      <g id="geodesic-dome" transform="translate(40, 54)">
        <path d="M 20 195 A 170 170 0 0 1 360 195 Z" fill="url(#domeShell)" stroke="#10b981" strokeWidth="1.8" />
        <g stroke="#34d399" strokeOpacity="0.35" strokeWidth="1" fill="none">
          <path d="M 190 25 L 140 70 L 190 110 L 240 70 Z" /><path d="M 190 25 L 190 110" />
          <path d="M 140 70 L 80 115 L 110 160 L 190 160 L 270 160 L 300 115 L 240 70" />
          <path d="M 80 115 L 30 170 L 60 195 L 110 160" /><path d="M 300 115 L 350 170 L 320 195 L 270 160" />
        </g>

        <circle cx="190" cy="22" r="10" fill="#facc15" opacity="0.8" />
        <line x1="190" y1="36" x2="190" y2="70" stroke="#facc15" strokeWidth="1.5" strokeDasharray="3 2" />
        <text x="190" y="14" textAnchor="middle" fill="#fde047" fontSize="8" fontWeight="700">SOLAR TEJAS</text>

        <rect x="20" y="195" width="340" height="24" rx="3" fill="#142e20" stroke="#064e3b" strokeWidth="1" />
        <text x="190" y="210" textAnchor="middle" fill="#86efac" fontSize="8.5" fontFamily="monospace" fontWeight="700">
          LIVING MICROBIAL HUMUS BED · VṚKṢĀYURVEDA SOIL
        </text>

        <g id="tree-center" transform="translate(190, 195)">
          <path d="M -8 0 Q -12 -35 -20 -60 Q -5 -50 0 -45 Q 5 -50 20 -60 Q 12 -35 8 0 Z" fill="#78350f" />
          <ellipse cx="0" cy="-75" rx="55" ry="32" fill="#047857" stroke="#10b981" strokeWidth="1.2" />
          <ellipse cx="-25" cy="-80" rx="35" ry="24" fill="#059669" opacity="0.9" />
          <ellipse cx="25" cy="-80" rx="35" ry="24" fill="#059669" opacity="0.9" />
          <text x="0" y="-72" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="800">PRODUCERS</text>
          <text x="0" y="-62" textAnchor="middle" fill="#a7f3d0" fontSize="7" fontWeight="600">O₂ Photosynthesis</text>
        </g>

        <g id="herbivores" transform="translate(85, 175)">
          <rect x="-35" y="-18" width="70" height="34" rx="4" fill="#064e3b" stroke="#34d399" strokeWidth="0.8" />
          <text x="0" y="-4" textAnchor="middle" fill="#f0fdf4" fontSize="8" fontWeight="700">HERBIVORES</text>
          <text x="0" y="8" textAnchor="middle" fill="#86efac" fontSize="6.8" fontFamily="monospace">CO₂ Exhale</text>
        </g>

        <g id="decomposers" transform="translate(295, 175)">
          <rect x="-35" y="-18" width="70" height="34" rx="4" fill="#064e3b" stroke="#34d399" strokeWidth="0.8" />
          <text x="0" y="-4" textAnchor="middle" fill="#f0fdf4" fontSize="8" fontWeight="700">CARNIVORES</text>
          <text x="0" y="8" textAnchor="middle" fill="#86efac" fontSize="6.8" fontFamily="monospace">Soil Recycling</text>
        </g>

        <path d="M 140 120 Q 80 120 85 150" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" fill="none" />
        <polygon points="85,152 81,146 88,146" fill="#38bdf8" />
        <text x="100" y="130" fill="#38bdf8" fontSize="7" fontFamily="monospace">O₂ FLUX</text>

        <path d="M 115 165 Q 150 160 170 145" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" fill="none" />
        <polygon points="170,145 163,148 166,142" fill="#f59e0b" />
        <text x="135" y="160" fill="#f59e0b" fontSize="7" fontFamily="monospace">CO₂</text>

        <path d="M 230 115 Q 260 70 290 85" stroke="#06b6d4" strokeWidth="1.4" strokeDasharray="2 2" fill="none" />
        <circle cx="280" cy="80" r="2.5" fill="#38bdf8" />
        <circle cx="295" cy="92" r="2" fill="#38bdf8" />
        <text x="255" y="70" fill="#38bdf8" fontSize="6.8" fontFamily="monospace">PRECIPITATION</text>
      </g>

      <g id="dome-telemetry" transform="translate(425, 54)">
        <rect x="0" y="0" width="195" height="195" rx="8" fill="#05251d" stroke="#064e3b" strokeWidth="1.2" />
        <text x="14" y="22" fill="#a7f3d0" fontSize="9" fontWeight="800">BIOSPHERE TELEMETRY</text>
        <text x="14" y="34" fill="#6ee7b7" fontSize="7" fontFamily="monospace">Dynamic Closed-Loop Balance</text>

        <g transform="translate(14, 46)">
          <text x="0" y="10" fill="#cbd5e1" fontSize="8" fontWeight="600">O₂ / CO₂ Equilibrium</text>
          <rect x="0" y="14" width="166" height="10" rx="3" fill="#064e3b" />
          <rect x="0" y="14" width="166" height="10" rx="3" fill="#10b981" />
          <text x="166" y="10" textAnchor="end" fill="#34d399" fontSize="8" fontFamily="monospace">1.00 (STABLE)</text>
        </g>
        <g transform="translate(14, 82)">
          <text x="0" y="10" fill="#cbd5e1" fontSize="8" fontWeight="600">Soil Humus Mycelium</text>
          <rect x="0" y="14" width="166" height="10" rx="3" fill="#064e3b" />
          <rect x="0" y="14" width="152" height="10" rx="3" fill="#f59e0b" />
          <text x="166" y="10" textAnchor="end" fill="#fbbf24" fontSize="8" fontFamily="monospace">94% RESILIENT</text>
        </g>
        <g transform="translate(14, 118)">
          <text x="0" y="10" fill="#cbd5e1" fontSize="8" fontWeight="600">Precipitation Circulation</text>
          <rect x="0" y="14" width="166" height="10" rx="3" fill="#064e3b" />
          <rect x="0" y="14" width="138" height="10" rx="3" fill="#38bdf8" />
          <text x="166" y="10" textAnchor="end" fill="#38bdf8" fontSize="8" fontFamily="monospace">88% (ACTIVE)</text>
        </g>
        <rect x="14" y="152" width="166" height="30" rx="4" fill="#022c22" stroke="#047857" strokeWidth="0.8" />
        <text x="97" y="166" textAnchor="middle" fill="#86efac" fontSize="7.5" fontWeight="700">5 MAHĀBHŪTAS IN HARMONY</text>
        <text x="97" y="176" textAnchor="middle" fill="#6ee7b7" fontSize="6.8" fontFamily="monospace">Pṛthivī · Ap · Tejas · Vāyu · Ākāśa</text>
      </g>

      <g id="dome-footer" transform="translate(18, 258)">
        <rect x="0" y="0" width="604" height="48" rx="6" fill="#042018" stroke="#064e3b" strokeWidth="1" />
        <circle cx="20" cy="24" r="6" fill="#10b981" />
        <text x="34" y="22" fill="#f8fafc" fontSize="10" fontWeight="700">Civilizational Ecology: Sustainable Sealed Trophic Pyramids</text>
        <text x="34" y="36" fill="#86efac" fontSize="8.5" fontFamily="monospace">
          Proves that life sustains life in a zero-waste loop when plants, animals, water, and soil microbes are preserved in thermodynamic equilibrium.
        </text>
      </g>
    </svg>
  </div>
);

/* ==========================================================================
   5. UDDĀLAKA: Sage Uddālaka Empirical Mind Lab (MED-01)
   ========================================================================== */
export const UddalakaEmpiricalSchematic: React.FC<{ _compact?: boolean; className?: string }> = ({
  className = '',
}) => (
  <div className={`iks-schematic-wrap iks-schematic--uddalaka ${className}`} style={{ width: '100%', overflow: 'hidden' }}>
    <svg viewBox="0 0 640 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '14px' }} role="img" aria-label="Sage Uddālaka Empirical Inquiry & Cognitive Science Tri-Panel Schematic">
      <defs>
        <linearGradient id="uddalakaBg" x1="0" y1="0" x2="640" y2="320" gradientUnits="userSpaceOnUse">
          <stop stopColor="#180b1e" /><stop offset="0.5" stopColor="#250d30" /><stop offset="1" stopColor="#120718" />
        </linearGradient>
        <pattern id="uddalakaGrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#500724" strokeWidth="0.6" strokeOpacity="0.4" />
        </pattern>
      </defs>
      <rect width="640" height="320" fill="url(#uddalakaBg)" />
      <rect width="640" height="320" fill="url(#uddalakaGrid)" />
      <circle cx="120" cy="160" r="90" fill="#db2777" opacity="0.12" filter="blur(40px)" />
      <circle cx="320" cy="160" r="90" fill="#f59e0b" opacity="0.12" filter="blur(40px)" />
      <circle cx="520" cy="160" r="90" fill="#38bdf8" opacity="0.12" filter="blur(40px)" />

      <g id="uddalaka-topbar">
        <rect x="18" y="14" width="604" height="28" rx="6" fill="#200a28" stroke="#4a044e" strokeWidth="1" />
        <text x="32" y="32" fill="#f472b6" fontSize="10.5" fontFamily="monospace" fontWeight="700" letterSpacing="0.08em">
          MED-01 · SAGE UDDĀLAKA ĀRUṆI · CHĀNDOGYA UPANIṢAD (c. 800 BCE)
        </text>
        <text x="608" y="32" textAnchor="end" fill="#fbbf24" fontSize="10.5" fontFamily="monospace" fontWeight="700">
          प्रत्यक्ष-प्रमाणम् · EMPIRICAL COGNITIVE SCIENCE
        </text>
      </g>

      <g id="panel-salt" transform="translate(24, 54)">
        <rect x="0" y="0" width="186" height="195" rx="8" fill="#1b0a24" stroke="#4a044e" strokeWidth="1.2" />
        <text x="12" y="20" fill="#f472b6" fontSize="9" fontWeight="800">EXP 1: SALT DISSOLUTION</text>
        <text x="12" y="32" fill="#fbcfe8" fontSize="7" fontFamily="monospace">Chāndogya 6.13 (लवण-उदकम्)</text>
        <g transform="translate(38, 44)">
          <rect x="0" y="10" width="110" height="105" rx="6" fill="#1e1b4b" stroke="#38bdf8" strokeWidth="1.2" opacity="0.8" />
          <rect x="6" y="24" width="98" height="85" rx="3" fill="#0284c7" opacity="0.25" />
          <line x1="6" y1="36" x2="104" y2="36" stroke="#fbbf24" strokeWidth="1.2" strokeDasharray="3 2" />
          <circle cx="16" cy="36" r="3" fill="#f59e0b" />
          <text x="24" y="34" fill="#fde68a" fontSize="7" fontWeight="700">1. Upari (Surface)</text>
          <line x1="6" y1="64" x2="104" y2="64" stroke="#fbbf24" strokeWidth="1.2" strokeDasharray="3 2" />
          <circle cx="16" cy="64" r="3" fill="#f59e0b" />
          <text x="24" y="62" fill="#fde68a" fontSize="7" fontWeight="700">2. Madhye (Middle)</text>
          <line x1="6" y1="92" x2="104" y2="92" stroke="#fbbf24" strokeWidth="1.2" strokeDasharray="3 2" />
          <circle cx="16" cy="92" r="3" fill="#f59e0b" />
          <text x="24" y="90" fill="#fde68a" fontSize="7" fontWeight="700">3. Adhastāt (Bottom)</text>
        </g>
        <rect x="12" y="162" width="162" height="24" rx="4" fill="#371b40" stroke="#701a75" strokeWidth="0.8" />
        <text x="93" y="174" textAnchor="middle" fill="#fdf4ff" fontSize="7.5" fontWeight="700">Lavaṇam Eva · Uniform Being</text>
        <text x="93" y="182" textAnchor="middle" fill="#f472b6" fontSize="6.8" fontFamily="monospace">Invisible, Pervasive (Sat-Vyāpakatā)</text>
      </g>

      <g id="panel-seed" transform="translate(226, 54)">
        <rect x="0" y="0" width="186" height="195" rx="8" fill="#1b0a24" stroke="#4a044e" strokeWidth="1.2" />
        <text x="12" y="20" fill="#facc15" fontSize="9" fontWeight="800">EXP 2: THE BANYAN SEED</text>
        <text x="12" y="32" fill="#fef08a" fontSize="7" fontFamily="monospace">Chāndogya 6.12 (न्यग्रोध-फलम्)</text>
        <g transform="translate(93, 86)">
          <circle cx="0" cy="0" r="32" fill="#701a75" stroke="#a21caf" strokeWidth="1.2" />
          <circle cx="0" cy="0" r="22" fill="#4c0519" stroke="#db2777" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="-6" cy="-4" r="2.5" fill="#fde047" /><circle cx="4" cy="-8" r="2.5" fill="#fde047" /><circle cx="8" cy="4" r="2.5" fill="#fde047" /><circle cx="-4" cy="8" r="2.5" fill="#fde047" />
          <line x1="0" y1="0" x2="52" y2="34" stroke="#fbbf24" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="56" cy="36" r="3.5" fill="#f59e0b" />
        </g>
        <g transform="translate(93, 145)" stroke="#34d399" strokeWidth="1" fill="none" opacity="0.85">
          <path d="M 0 0 L 0 -18" /><path d="M 0 -18 Q -28 -32 -40 -48" /><path d="M 0 -18 Q 28 -32 40 -48" /><path d="M 0 -18 Q -10 -38 0 -54" />
        </g>
        <rect x="12" y="162" width="162" height="24" rx="4" fill="#3f2305" stroke="#b45309" strokeWidth="0.8" />
        <text x="93" y="174" textAnchor="middle" fill="#fef3c7" fontSize="7.5" fontWeight="700">Aṇiman · Subtle Potentiality</text>
        <text x="93" y="182" textAnchor="middle" fill="#fbbf24" fontSize="6.8" fontFamily="monospace">From &quot;Nothing&quot; Grows the Giant</text>
      </g>

      <g id="panel-fasting" transform="translate(428, 54)">
        <rect x="0" y="0" width="188" height="195" rx="8" fill="#1b0a24" stroke="#4a044e" strokeWidth="1.2" />
        <text x="12" y="20" fill="#38bdf8" fontSize="9" fontWeight="800">EXP 3: 15-DAY FAST &amp; MEMORY</text>
        <text x="12" y="32" fill="#bae6fd" fontSize="7" fontFamily="monospace">Chāndogya 6.7 (षोडश-कला-पुरुषः)</text>
        <g transform="translate(24, 46)">
          <line x1="0" y1="85" x2="145" y2="85" stroke="#475569" strokeWidth="1" />
          <line x1="0" y1="10" x2="0" y2="85" stroke="#475569" strokeWidth="1" />
          <text x="0" y="96" fill="#64748b" fontSize="6.5" fontFamily="monospace">Day 1</text>
          <text x="65" y="96" textAnchor="middle" fill="#64748b" fontSize="6.5" fontFamily="monospace">Day 8</text>
          <text x="110" y="96" textAnchor="middle" fill="#ef4444" fontSize="6.5" fontFamily="monospace">Day 15</text>
          <text x="140" y="96" textAnchor="middle" fill="#10b981" fontSize="6.5" fontFamily="monospace">D16</text>
          <path d="M 0 35 L 140 35" stroke="#38bdf8" strokeWidth="1.4" strokeDasharray="3 2" fill="none" />
          <text x="6" y="30" fill="#38bdf8" fontSize="6" fontFamily="monospace">Water (Prāṇa Alive)</text>
          <path d="M 0 15 Q 40 20 80 50 Q 110 75 118 80 L 125 15 L 140 12" stroke="#f43f5e" strokeWidth="2" fill="none" />
          <circle cx="118" cy="80" r="3" fill="#ef4444" />
          <text x="100" y="74" textAnchor="end" fill="#fca5a5" fontSize="6" fontWeight="700">Memory Lost</text>
          <circle cx="125" cy="15" r="3" fill="#10b981" />
          <text x="128" y="10" fill="#86efac" fontSize="6" fontWeight="800">Rice Fed!</text>
        </g>
        <rect x="12" y="162" width="164" height="24" rx="4" fill="#0c4a6e" stroke="#0284c7" strokeWidth="0.8" />
        <text x="94" y="174" textAnchor="middle" fill="#f0fdf4" fontSize="7.5" fontWeight="700">Manaḥ Annamayam · Mind = Food</text>
        <text x="94" y="182" textAnchor="middle" fill="#7dd3fc" fontSize="6.8" fontFamily="monospace">Physical Substrate of Cognition</text>
      </g>

      <g id="uddalaka-footer" transform="translate(18, 258)">
        <rect x="0" y="0" width="604" height="48" rx="6" fill="#200a28" stroke="#4a044e" strokeWidth="1" />
        <circle cx="20" cy="24" r="6" fill="#ec4899" />
        <text x="34" y="22" fill="#f8fafc" fontSize="10" fontWeight="700">Empirical Epistemology: The Father of Modern Cognitive Inquiry</text>
        <text x="34" y="36" fill="#fbcfe8" fontSize="8.5" fontFamily="monospace">
          Uddālaka rejected blind dogma: he commanded his son Śvetaketu to taste, dissect, and fast to physically experience the truth of reality.
        </text>
      </g>
    </svg>
  </div>
);

/* ==========================================================================
   6. COSMIC ALIGNMENT: 27 Nakṣatras & 30 Tithis (AST-02)
   ========================================================================== */
export const CosmicAlignmentSchematic: React.FC<{ _compact?: boolean; className?: string }> = ({
  className = '',
}) => (
  <div className={`iks-schematic-wrap iks-schematic--cosmic ${className}`} style={{ width: '100%', overflow: 'hidden' }}>
    <svg viewBox="0 0 640 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '14px' }} role="img" aria-label="Cosmic Alignment & Pañcāṅga Coordinate Ring Schematic">
      <defs>
        <linearGradient id="cosmicBg" x1="0" y1="0" x2="640" y2="320" gradientUnits="userSpaceOnUse">
          <stop stopColor="#050a18" /><stop offset="0.5" stopColor="#0d1430" /><stop offset="1" stopColor="#040814" />
        </linearGradient>
      </defs>
      <rect width="640" height="320" fill="url(#cosmicBg)" />
      <circle cx="180" cy="160" r="110" fill="#38bdf8" opacity="0.12" filter="blur(40px)" />
      <circle cx="480" cy="160" r="100" fill="#818cf8" opacity="0.10" filter="blur(40px)" />

      <rect x="18" y="14" width="604" height="28" rx="6" fill="#0c1738" stroke="#1e3a8a" strokeWidth="1" />
      <text x="32" y="32" fill="#38bdf8" fontSize="10.5" fontFamily="monospace" fontWeight="700" letterSpacing="0.08em">
        AST-02 · CELESTIAL PAÑCĀṄGA COORDINATE SPHERE · SŪRYA SIDDHĀNTA
      </text>
      <text x="608" y="32" textAnchor="end" fill="#c084fc" fontSize="10.5" fontFamily="monospace" fontWeight="700">
        27 NAKṢATRAS · 30 TITHI ELONGATION
      </text>

      {/* LEFT: 27 Nakṣatra Celestial Ring */}
      <g transform="translate(170, 160)">
        <circle cx="0" cy="0" r="90" stroke="#1e3a8a" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
        <circle cx="0" cy="0" r="76" stroke="#38bdf8" strokeWidth="1" fill="#081026" />
        {/* 27 divisions */}
        {Array.from({ length: 27 }).map((_, i) => {
          const angle = (i * (360 / 27) * Math.PI) / 180;
          return (
            <g key={i}>
              <line x1={76 * Math.cos(angle)} y1={76 * Math.sin(angle)} x2={90 * Math.cos(angle)} y2={90 * Math.sin(angle)} stroke="#60a5fa" strokeWidth="1" />
              <circle cx={83 * Math.cos(angle)} cy={83 * Math.sin(angle)} r="1.5" fill="#facc15" />
            </g>
          );
        })}
        {/* Central Earth */}
        <circle cx="0" cy="0" r="14" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
        <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontWeight="800">Pṛthivī</text>
        {/* Sun vector */}
        <line x1="0" y1="0" x2="62" y2="-32" stroke="#f59e0b" strokeWidth="2" />
        <circle cx="62" cy="-32" r="6" fill="#fde047" />
        <text x="68" y="-38" fill="#fde047" fontSize="8" fontWeight="700">Sūrya</text>
        {/* Moon vector */}
        <line x1="0" y1="0" x2="-28" y2="-55" stroke="#e2e8f0" strokeWidth="1.8" />
        <circle cx="-28" cy="-55" r="5" fill="#f1f5f9" />
        <text x="-48" y="-60" fill="#f1f5f9" fontSize="8" fontWeight="700">Candra</text>
        {/* Elongation arc */}
        <path d="M 28 -14 A 32 32 0 0 0 -14 -28" stroke="#34d399" strokeWidth="1.5" fill="none" />
        <text x="12" y="-28" fill="#34d399" fontSize="7.5" fontFamily="monospace">Δλ = 12°/Tithi</text>
      </g>

      {/* RIGHT: Tithi & Eclipse Precession Formula */}
      <g transform="translate(340, 54)">
        <rect x="0" y="0" width="275" height="195" rx="8" fill="#09142e" stroke="#1e3a8a" strokeWidth="1.2" />
        <text x="14" y="22" fill="#60a5fa" fontSize="9.5" fontWeight="800">SYNODIC LUNAR-SOLAR TITHI MATRIX</text>
        <text x="14" y="34" fill="#93c5fd" fontSize="7.5" fontFamily="monospace">1 Tithi = 12° angular distance (Moon ahead of Sun)</text>

        <g transform="translate(14, 46)">
          <rect x="0" y="0" width="120" height="40" rx="4" fill="#0f1f45" stroke="#2563eb" strokeWidth="0.8" />
          <text x="8" y="14" fill="#bae6fd" fontSize="7.5" fontWeight="700">ŚUKLA PAKṢA (15)</text>
          <text x="8" y="26" fill="#38bdf8" fontSize="10" fontWeight="800" fontFamily="monospace">Waxing Moon</text>
          <text x="8" y="36" fill="#93c5fd" fontSize="6.8" fontFamily="monospace">Prathamā ➔ Pūrṇimā</text>

          <rect x="128" y="0" width="120" height="40" rx="4" fill="#0f1f45" stroke="#2563eb" strokeWidth="0.8" />
          <text x="136" y="14" fill="#bae6fd" fontSize="7.5" fontWeight="700">KṚṢṆA PAKṢA (15)</text>
          <text x="136" y="26" fill="#818cf8" fontSize="10" fontWeight="800" fontFamily="monospace">Waning Moon</text>
          <text x="136" y="36" fill="#93c5fd" fontSize="6.8" fontFamily="monospace">Prathamā ➔ Amāvāsyā</text>
        </g>

        <g transform="translate(14, 98)">
          <rect x="0" y="0" width="248" height="85" rx="4" fill="#040b1a" stroke="#1d4ed8" strokeWidth="0.8" />
          <text x="12" y="18" fill="#facc15" fontSize="8" fontWeight="700">AYANA-CALANA (EQUINOX DRIFT):</text>
          <text x="12" y="32" fill="#f8fafc" fontSize="8" fontFamily="monospace">25,772-Year Great Precessional Year</text>
          <text x="12" y="46" fill="#a7f3d0" fontSize="7.5" fontFamily="monospace">1 Nakṣatra drift every 960 solar years</text>
          <line x1="12" y1="54" x2="236" y2="54" stroke="#1e3a8a" strokeWidth="1" />
          <text x="12" y="68" fill="#38bdf8" fontSize="7.5" fontFamily="monospace">Formula: Tithi = ⌊(λ_Moon - λ_Sun) / 12°⌋ + 1</text>
        </g>
      </g>

      <g transform="translate(18, 258)">
        <rect x="0" y="0" width="604" height="48" rx="6" fill="#0c1738" stroke="#1e3a8a" strokeWidth="1" />
        <circle cx="20" cy="24" r="6" fill="#60a5fa" />
        <text x="34" y="22" fill="#f8fafc" fontSize="10" fontWeight="700">Mathematical Ephemerides of the Siddhāntic Tradition</text>
        <text x="34" y="36" fill="#93c5fd" fontSize="8.5" fontFamily="monospace">
          Harmonizes lunar synodic months, solar sidereal years, and planetary umbra projections without mechanical timepieces.
        </text>
      </g>
    </svg>
  </div>
);

/* ==========================================================================
   7. STEPWELL: Rani ki Vav Hydraulics (MET-02)
   ========================================================================== */
export const StepwellHydraulicsSchematic: React.FC<{ _compact?: boolean; className?: string }> = ({
  className = '',
}) => (
  <div className={`iks-schematic-wrap iks-schematic--stepwell ${className}`} style={{ width: '100%', overflow: 'hidden' }}>
    <svg viewBox="0 0 640 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '14px' }} role="img" aria-label="Rani ki Vav Stepwell Subterranean Hydraulics Schematic">
      <defs>
        <linearGradient id="stepwellBg" x1="0" y1="0" x2="640" y2="320" gradientUnits="userSpaceOnUse">
          <stop stopColor="#08141e" /><stop offset="0.5" stopColor="#0b242c" /><stop offset="1" stopColor="#061218" />
        </linearGradient>
      </defs>
      <rect width="640" height="320" fill="url(#stepwellBg)" />
      <circle cx="200" cy="180" r="110" fill="#06b6d4" opacity="0.10" filter="blur(40px)" />

      <rect x="18" y="14" width="604" height="28" rx="6" fill="#08222b" stroke="#0e7490" strokeWidth="1" />
      <text x="32" y="32" fill="#22d3ee" fontSize="10.5" fontFamily="monospace" fontWeight="700" letterSpacing="0.08em">
        MET-02 · SUBTERRANEAN AQUIFER HYDRAULICS · SOLANKI ERA (c. 1063 CE)
      </text>
      <text x="608" y="32" textAnchor="end" fill="#fde047" fontSize="10.5" fontFamily="monospace" fontWeight="700">
        7-TIERED GEOTHERMAL COOLING &amp; FILTRATION
      </text>

      {/* LEFT: 7-Tier Inverted Stepped Pavilion Cutaway */}
      <g transform="translate(30, 54)">
        <line x1="0" y1="20" x2="350" y2="20" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 2" />
        <text x="340" y="14" textAnchor="end" fill="#64748b" fontSize="7.5" fontFamily="monospace">GROUND +42°C</text>

        {/* Terraced Steps descending */}
        {[
          { level: 1, y: 38, w: 320, h: 22 },
          { level: 2, y: 62, w: 275, h: 22 },
          { level: 3, y: 86, w: 230, h: 22 },
          { level: 4, y: 110, w: 185, h: 22 },
          { level: 5, y: 134, w: 140, h: 22 },
          { level: 6, y: 158, w: 95, h: 22 },
          { level: 7, y: 182, w: 50, h: 24 },
        ].map((tier) => (
          <g key={tier.level}>
            <rect x="10" y={tier.y} width={tier.w} height={tier.h} fill="#0d2b35" stroke="#155e75" strokeWidth="0.8" />
            <text x="16" y={tier.y + 14} fill="#67e8f9" fontSize="7" fontFamily="monospace">T{tier.level}</text>
          </g>
        ))}

        {/* Deep Water Well Shaft (Right End) */}
        <rect x="290" y="20" width="45" height="186" fill="#083344" stroke="#0891b2" strokeWidth="1" />
        <rect x="293" y="140" width="39" height="63" fill="#0284c7" opacity="0.6" />
        <text x="312" y="175" textAnchor="middle" fill="#e0f2fe" fontSize="7.5" fontWeight="700">WATER</text>
        <text x="312" y="185" textAnchor="middle" fill="#bae6fd" fontSize="6.5" fontFamily="monospace">24°C</text>

        {/* Sediment Layers at Base */}
        <rect x="10" y="206" width="325" height="10" fill="#78350f" opacity="0.8" />
        <text x="170" y="214" textAnchor="middle" fill="#fef3c7" fontSize="6.5" fontFamily="monospace">SAND &amp; GRAVEL FILTRATION BED</text>
      </g>

      {/* RIGHT: Geothermal Microclimate Gradient */}
      <g transform="translate(395, 54)">
        <rect x="0" y="0" width="225" height="195" rx="8" fill="#081e26" stroke="#0e7490" strokeWidth="1.2" />
        <text x="12" y="22" fill="#22d3ee" fontSize="9" fontWeight="800">THERMAL ATTENUATION</text>
        <text x="12" y="34" fill="#67e8f9" fontSize="7" fontFamily="monospace">Natural Geothermal Gradient</text>

        <g transform="translate(14, 46)">
          <line x1="20" y1="10" x2="20" y2="120" stroke="#475569" strokeWidth="1" />
          <line x1="20" y1="120" x2="190" y2="120" stroke="#475569" strokeWidth="1" />

          {/* Temp Curve (Dropping from 42 to 24) */}
          <path d="M 20 20 Q 60 40 100 80 T 180 115" stroke="#06b6d4" strokeWidth="2.2" fill="none" />
          <circle cx="20" cy="20" r="3.5" fill="#ef4444" />
          <text x="28" y="18" fill="#fca5a5" fontSize="7.5" fontWeight="700">Surface: 42°C</text>

          <circle cx="180" cy="115" r="3.5" fill="#38bdf8" />
          <text x="120" y="110" fill="#7dd3fc" fontSize="7.5" fontWeight="700">Reservoir: 24°C</text>

          <text x="100" y="132" textAnchor="middle" fill="#94a3b8" fontSize="6.8" fontFamily="monospace">Depth: 28m below ground</text>
        </g>

        <rect x="12" y="152" width="201" height="32" rx="4" fill="#042f2e" stroke="#0d9488" strokeWidth="0.8" />
        <text x="112" y="165" textAnchor="middle" fill="#a7f3d0" fontSize="7.2" fontWeight="700">HYDROSTATIC EQUILIBRIUM</text>
        <text x="112" y="176" textAnchor="middle" fill="#5eead4" fontSize="6.5" fontFamily="monospace">Pillared Colonnades Dissipate Lateral Earth Thrust</text>
      </g>

      <g transform="translate(18, 258)">
        <rect x="0" y="0" width="604" height="48" rx="6" fill="#08222b" stroke="#0e7490" strokeWidth="1" />
        <circle cx="20" cy="24" r="6" fill="#06b6d4" />
        <text x="34" y="22" fill="#f8fafc" fontSize="10" fontWeight="700">Subterranean Hydraulic Engineering &amp; Microclimatic Sanctuary</text>
        <text x="34" y="36" fill="#a5f3fc" fontSize="8.5" fontFamily="monospace">
          Integrated gravity filtration, rainwater recharging, and passive subterranean climate cooling in semi-arid Gujarat.
        </text>
      </g>
    </svg>
  </div>
);

/* ==========================================================================
   8. WOOTZ: Crucible Steel & Damascus Metallurgy (MET-03)
   ========================================================================== */
export const WootzSteelSchematic: React.FC<{ _compact?: boolean; className?: string }> = ({
  className = '',
}) => (
  <div className={`iks-schematic-wrap iks-schematic--wootz ${className}`} style={{ width: '100%', overflow: 'hidden' }}>
    <svg viewBox="0 0 640 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '14px' }} role="img" aria-label="Wootz Crucible Steel & Damascus Nanotube Metallurgy Schematic">
      <defs>
        <linearGradient id="wootzBg" x1="0" y1="0" x2="640" y2="320" gradientUnits="userSpaceOnUse">
          <stop stopColor="#180e0e" /><stop offset="0.5" stopColor="#281111" /><stop offset="1" stopColor="#120808" />
        </linearGradient>
      </defs>
      <rect width="640" height="320" fill="url(#wootzBg)" />
      <circle cx="160" cy="160" r="100" fill="#ef4444" opacity="0.12" filter="blur(40px)" />
      <circle cx="480" cy="160" r="100" fill="#f59e0b" opacity="0.10" filter="blur(40px)" />

      <rect x="18" y="14" width="604" height="28" rx="6" fill="#2d1212" stroke="#991b1b" strokeWidth="1" />
      <text x="32" y="32" fill="#f87171" fontSize="10.5" fontFamily="monospace" fontWeight="700" letterSpacing="0.08em">
        MET-03 · WOOTZ CRUCIBLE STEEL (UKKU) · HYPER-EUTECTOID METALLURGY
      </text>
      <text x="608" y="32" textAnchor="end" fill="#fde047" fontSize="10.5" fontFamily="monospace" fontWeight="700">
        1.5% C · CARBON NANOTUBES &amp; DAMASCUS WATERING
      </text>

      {/* LEFT: Sealed Clay Crucible Kiln */}
      <g transform="translate(45, 54)">
        <rect x="0" y="0" width="240" height="195" rx="8" fill="#1f0a0a" stroke="#7f1d1d" strokeWidth="1.2" />
        <text x="14" y="22" fill="#fca5a5" fontSize="9" fontWeight="800">SEALED CLAY CRUCIBLE (1,200°C)</text>
        <text x="14" y="34" fill="#ef4444" fontSize="7" fontFamily="monospace">Carburization in Oxygen-Free Atmosphere</text>

        {/* Crucible Pot */}
        <g transform="translate(120, 115)">
          <path d="M -45 50 C -48 10 -40 -35 0 -45 C 40 -35 48 10 45 50 Z" fill="#78350f" stroke="#b45309" strokeWidth="1.5" />
          {/* Iron & Carbon Contents */}
          <rect x="-26" y="-8" width="52" height="48" rx="4" fill="#334155" />
          <text x="0" y="8" textAnchor="middle" fill="#f8fafc" fontSize="7.5" fontWeight="700">WROUGHT IRON</text>
          <text x="0" y="20" textAnchor="middle" fill="#f59e0b" fontSize="7" fontFamily="monospace">+ Wood (Cassia)</text>
          <text x="0" y="30" textAnchor="middle" fill="#34d399" fontSize="6.5" fontFamily="monospace">+ Calotropis Leaf</text>
          {/* Flames below */}
          <path d="M -35 56 Q 0 85 35 56" stroke="#f97316" strokeWidth="2.5" fill="none" />
          <path d="M -20 58 Q 0 92 20 58" stroke="#facc15" strokeWidth="2" fill="none" />
        </g>
        <text x="120" y="184" textAnchor="middle" fill="#fca5a5" fontSize="7" fontFamily="monospace">Slow cooling yields solid-state carbon diffusion</text>
      </g>

      {/* RIGHT: High-Magnification Microstructure (Damascus Patterns) */}
      <g transform="translate(305, 54)">
        <rect x="0" y="0" width="290" height="195" rx="8" fill="#150606" stroke="#991b1b" strokeWidth="1.2" />
        <text x="14" y="22" fill="#fde047" fontSize="9" fontWeight="800">METALLOGRAPHIC MICROSTRUCTURE (1,000X)</text>
        <text x="14" y="34" fill="#fca5a5" fontSize="7" fontFamily="monospace">Cementite (Fe₃C) Spheroids &amp; Carbon Nanotube Arrays</text>

        {/* Micrograph Box with Damascus Waves */}
        <g transform="translate(14, 44)">
          <rect x="0" y="0" width="262" height="88" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1" />
          {/* Undulating Damascus Wave bands */}
          {Array.from({ length: 6 }).map((_, i) => (
            <path
              key={i}
              d={`M 0 ${12 + i * 14} Q 45 ${4 + i * 14} 90 ${16 + i * 14} T 180 ${12 + i * 14} T 262 ${16 + i * 14}`}
              stroke="#fde68a"
              strokeWidth="2.2"
              fill="none"
              strokeDasharray="4 2"
            />
          ))}
          <text x="10" y="80" fill="#ffffff" fontSize="7.5" fontWeight="700">Wavy Damascus Water Pattern (Jauhar)</text>
        </g>

        <g transform="translate(14, 142)">
          <rect x="0" y="0" width="262" height="42" rx="4" fill="#2a0a0a" stroke="#b91c1c" strokeWidth="0.8" />
          <text x="10" y="16" fill="#fca5a5" fontSize="7.8" fontWeight="700">MECHANICAL ATTRIBUTES:</text>
          <text x="10" y="28" fill="#fef08a" fontSize="7.2" fontFamily="monospace">Extreme Tensile Toughness + Razor Sharp Cutting Edge</text>
          <text x="10" y="38" fill="#38bdf8" fontSize="7.2" fontFamily="monospace">Exported to Damascus, Persia, and Rome (Ferrum Indicum)</text>
        </g>
      </g>

      <g transform="translate(18, 258)">
        <rect x="0" y="0" width="604" height="48" rx="6" fill="#2d1212" stroke="#991b1b" strokeWidth="1" />
        <circle cx="20" cy="24" r="6" fill="#ef4444" />
        <text x="34" y="22" fill="#f8fafc" fontSize="10" fontWeight="700">Pioneers of Nanostructured Crucible Metallurgy</text>
        <text x="34" y="36" fill="#fca5a5" fontSize="8.5" fontFamily="monospace">
          South Indian metalsmiths (Telangana, Tamil Nadu, Karnataka) invented the world’s first crucible steel, prized across continents for 2,000 years.
        </text>
      </g>
    </svg>
  </div>
);

/* ==========================================================================
   9. SUŚRUTA: Biomimetic Surgical Tools (MED-02)
   ========================================================================== */
export const SusrutaBiomimeticSchematic: React.FC<{ _compact?: boolean; className?: string }> = ({
  className = '',
}) => (
  <div className={`iks-schematic-wrap iks-schematic--susruta ${className}`} style={{ width: '100%', overflow: 'hidden' }}>
    <svg viewBox="0 0 640 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '14px' }} role="img" aria-label="Suśruta Biomimetic Surgical Instruments & Rhinoplasty Schematic">
      <defs>
        <linearGradient id="susrutaBg" x1="0" y1="0" x2="640" y2="320" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1a0b16" /><stop offset="0.5" stopColor="#2b0f24" /><stop offset="1" stopColor="#120610" />
        </linearGradient>
      </defs>
      <rect width="640" height="320" fill="url(#susrutaBg)" />
      <circle cx="200" cy="160" r="110" fill="#ec4899" opacity="0.10" filter="blur(40px)" />

      <rect x="18" y="14" width="604" height="28" rx="6" fill="#2b0a22" stroke="#831843" strokeWidth="1" />
      <text x="32" y="32" fill="#f472b6" fontSize="10.5" fontFamily="monospace" fontWeight="700" letterSpacing="0.08em">
        MED-02 · SUŚRUTA SAMHITĀ · BIOMIMETIC SURGICAL TOOLS (c. 600 BCE)
      </text>
      <text x="608" y="32" textAnchor="end" fill="#fde047" fontSize="10.5" fontFamily="monospace" fontWeight="700">
        101 YANTRAS · 20 ŚASTRAS · RHINOPLASTY
      </text>

      {/* LEFT: Biomimetic Yantras (Modeled after animal jaws/beaks) */}
      <g transform="translate(30, 54)">
        <rect x="0" y="0" width="280" height="195" rx="8" fill="#1b0616" stroke="#831843" strokeWidth="1.2" />
        <text x="14" y="22" fill="#f472b6" fontSize="9" fontWeight="800">BIOMIMETIC YANTRAS (BLUNT FORCEPS)</text>
        <text x="14" y="34" fill="#fbcfe8" fontSize="7" fontFamily="monospace">Instruments shaped like predator jaws &amp; bird beaks</text>

        {/* 3 Tool profiles */}
        {/* Tool 1: Siṁhamukha (Lion Jaw) */}
        <g transform="translate(14, 46)">
          <rect x="0" y="0" width="252" height="40" rx="4" fill="#280c22" stroke="#9d174d" strokeWidth="0.8" />
          <path d="M 20 20 Q 35 8 50 20 L 40 25 L 20 20" stroke="#f472b6" strokeWidth="1.5" fill="none" />
          <path d="M 20 20 Q 35 32 50 20" stroke="#f472b6" strokeWidth="1.5" fill="none" />
          <text x="62" y="18" fill="#fdf2f8" fontSize="8" fontWeight="700">1. Siṁhamukha (Lion-Jaw Forceps)</text>
          <text x="62" y="28" fill="#f472b6" fontSize="6.8" fontFamily="monospace">For extracting deeply embedded foreign bodies</text>
        </g>

        {/* Tool 2: Kaṅkamukha (Heron Beak) */}
        <g transform="translate(14, 92)">
          <rect x="0" y="0" width="252" height="40" rx="4" fill="#280c22" stroke="#9d174d" strokeWidth="0.8" />
          <path d="M 18 20 L 52 14 L 18 20 L 52 26" stroke="#f472b6" strokeWidth="1.5" fill="none" />
          <text x="62" y="18" fill="#fdf2f8" fontSize="8" fontWeight="700">2. Kaṅkamukha (Heron-Beak Forceps)</text>
          <text x="62" y="28" fill="#f472b6" fontSize="6.8" fontFamily="monospace">Narrow tubular bone extraction &amp; ear probing</text>
        </g>

        {/* Tool 3: Kākamukha (Crow Beak) */}
        <g transform="translate(14, 138)">
          <rect x="0" y="0" width="252" height="40" rx="4" fill="#280c22" stroke="#9d174d" strokeWidth="0.8" />
          <path d="M 20 20 Q 35 12 48 20 L 20 20" stroke="#f472b6" strokeWidth="1.5" fill="none" />
          <text x="62" y="18" fill="#fdf2f8" fontSize="8" fontWeight="700">3. Kākamukha (Crow-Beak Forceps)</text>
          <text x="62" y="28" fill="#f472b6" fontSize="6.8" fontFamily="monospace">Superficial sliver extraction &amp; minor vessels</text>
        </g>
      </g>

      {/* RIGHT: Rhinoplasty Reconstructive Flap Surgery Geometry */}
      <g transform="translate(330, 54)">
        <rect x="0" y="0" width="280" height="195" rx="8" fill="#1b0616" stroke="#831843" strokeWidth="1.2" />
        <text x="14" y="22" fill="#fde047" fontSize="9" fontWeight="800">PEDICLED NASAL FLAP (RHINOPLASTY)</text>
        <text x="14" y="34" fill="#fbcfe8" fontSize="7" fontFamily="monospace">First documented plastic surgery (Suśruta 1.16)</text>

        <g transform="translate(20, 48)">
          <path d="M 40 20 Q 60 10 80 20 Q 90 60 70 85 Q 50 100 40 85 Z" stroke="#ec4899" strokeWidth="1.4" fill="#280c22" />
          <path d="M 55 35 Q 75 50 65 75" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 2" fill="none" />
          <circle cx="65" cy="75" r="4" fill="#10b981" />
          <text x="85" y="42" fill="#fde68a" fontSize="7.5" fontWeight="700">Cheek/Forehead Pedicle</text>
          <text x="85" y="54" fill="#fbcfe8" fontSize="6.8" fontFamily="monospace">Preserves blood supply</text>
          <text x="85" y="66" fill="#38bdf8" fontSize="6.8" fontFamily="monospace">Castor oil &amp; red sandalwood dressing</text>
        </g>

        <rect x="14" y="146" width="252" height="36" rx="4" fill="#300d27" stroke="#be185d" strokeWidth="0.8" />
        <text x="140" y="160" textAnchor="middle" fill="#fdf2f8" fontSize="7.5" fontWeight="700">ASEPTIC TECHNIQUES &amp; SUTURES</text>
        <text x="140" y="172" textAnchor="middle" fill="#f472b6" fontSize="6.8" fontFamily="monospace">Bark fiber, horsehair, and vegetable gum cauterization</text>
      </g>

      <g transform="translate(18, 258)">
        <rect x="0" y="0" width="604" height="48" rx="6" fill="#2b0a22" stroke="#831843" strokeWidth="1" />
        <circle cx="20" cy="24" r="6" fill="#ec4899" />
        <text x="34" y="22" fill="#f8fafc" fontSize="10" fontWeight="700">Suśruta: Father of Systematic Surgery &amp; Plastic Reconstruction</text>
        <text x="34" y="36" fill="#fbcfe8" fontSize="8.5" fontFamily="monospace">
          Established anatomical dissection, sterile incision lines, and surgical instrument temper centuries ahead of European medical guilds.
        </text>
      </g>
    </svg>
  </div>
);

/* ==========================================================================
   10. GOVARDHAN: Soil Ecology & Vṛkṣāyurveda (ECO-02)
   ========================================================================== */
export const GovardhanSoilSchematic: React.FC<{ _compact?: boolean; className?: string }> = ({
  className = '',
}) => (
  <div className={`iks-schematic-wrap iks-schematic--govardhan ${className}`} style={{ width: '100%', overflow: 'hidden' }}>
    <svg viewBox="0 0 640 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '14px' }} role="img" aria-label="Govardhan Soil Ecology & Microbial Inoculant Schematic">
      <defs>
        <linearGradient id="govardhanBg" x1="0" y1="0" x2="640" y2="320" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0a1a0f" /><stop offset="0.5" stopColor="#122b1c" /><stop offset="1" stopColor="#06140b" />
        </linearGradient>
      </defs>
      <rect width="640" height="320" fill="url(#govardhanBg)" />
      <circle cx="160" cy="160" r="100" fill="#10b981" opacity="0.12" filter="blur(40px)" />
      <circle cx="480" cy="160" r="100" fill="#f59e0b" opacity="0.10" filter="blur(40px)" />

      <rect x="18" y="14" width="604" height="28" rx="6" fill="#0d2919" stroke="#047857" strokeWidth="1" />
      <text x="32" y="32" fill="#34d399" fontSize="10.5" fontFamily="monospace" fontWeight="700" letterSpacing="0.08em">
        ECO-02 · VR̥KṢĀYURVEDA SOIL MICROBIOLOGY · GOVARDHAN ECOLOGY
      </text>
      <text x="608" y="32" textAnchor="end" fill="#fde047" fontSize="10.5" fontFamily="monospace" fontWeight="700">
        RHIZOSPHERE BIO-INOCULATION &amp; HUMUS
      </text>

      {/* LEFT: Living Root Hair & Mycorrhizal Fungal Network */}
      <g transform="translate(30, 54)">
        <rect x="0" y="0" width="280" height="195" rx="8" fill="#091f14" stroke="#047857" strokeWidth="1.2" />
        <text x="14" y="22" fill="#86efac" fontSize="9" fontWeight="800">RHIZOSPHERE MICROBIAL COMMENSALISM</text>
        <text x="14" y="34" fill="#a7f3d0" fontSize="7" fontFamily="monospace">Mycorrhizal fungi + Nitrogen-fixing bacteria</text>

        <g transform="translate(140, 115)">
          {/* Main Taproot */}
          <path d="M 0 -60 Q -5 0 0 60" stroke="#78350f" strokeWidth="8" strokeLinecap="round" />
          {/* Lateral root hairs */}
          <path d="M 0 -30 Q -30 -25 -55 -20" stroke="#b45309" strokeWidth="2.5" />
          <path d="M 0 0 Q 30 5 60 10" stroke="#b45309" strokeWidth="2.5" />
          <path d="M 0 25 Q -25 35 -50 45" stroke="#b45309" strokeWidth="2.5" />

          {/* Fungal Hyphae net (glowing cyan mesh) */}
          <g stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 2" fill="none">
            <path d="M -55 -20 Q -80 -40 -110 -15 T -60 20" />
            <path d="M 60 10 Q 90 30 115 5 T 70 -30" />
            <path d="M -50 45 Q -80 70 -105 45" />
          </g>

          {/* Bio-Nodules */}
          <circle cx="-35" cy="-22" r="3.5" fill="#34d399" />
          <circle cx="40" cy="8" r="3.5" fill="#34d399" />
          <circle cx="-30" cy="38" r="3.5" fill="#34d399" />
        </g>
        <text x="140" y="184" textAnchor="middle" fill="#6ee7b7" fontSize="7" fontFamily="monospace">Phosphorus mobilization &amp; soil crumb aeration</text>
      </g>

      {/* RIGHT: Pañcagavya & Jīvāmṛta Fermentation */}
      <g transform="translate(330, 54)">
        <rect x="0" y="0" width="280" height="195" rx="8" fill="#091f14" stroke="#047857" strokeWidth="1.2" />
        <text x="14" y="22" fill="#fde047" fontSize="9" fontWeight="800">BIO-FERMENTED SOIL INOCULANTS</text>
        <text x="14" y="34" fill="#a7f3d0" fontSize="7" fontFamily="monospace">Jīvāmṛta · 48-Hour Aerobic Microbial Bloom</text>

        {/* Fermentation Earthen Urn */}
        <g transform="translate(60, 115)">
          <path d="M -25 -35 L 25 -35 L 35 30 Q 0 45 -35 30 Z" fill="#78350f" stroke="#b45309" strokeWidth="1.2" />
          <ellipse cx="0" cy="-35" rx="25" ry="6" fill="#92400e" />
          <circle cx="-10" cy="0" r="2" fill="#facc15" /><circle cx="8" cy="-10" r="2" fill="#facc15" /><circle cx="0" cy="15" r="2" fill="#facc15" />
          <text x="0" y="4" textAnchor="middle" fill="#fef08a" fontSize="6.5" fontWeight="700">BIO-CULTURE</text>
        </g>

        <g transform="translate(135, 60)">
          <rect x="0" y="0" width="130" height="24" rx="3" fill="#143e26" stroke="#059669" strokeWidth="0.8" />
          <text x="8" y="16" fill="#f0fdf4" fontSize="7" fontWeight="700">Lactic Acid Bacteria</text>
          <rect x="0" y="28" width="130" height="24" rx="3" fill="#143e26" stroke="#059669" strokeWidth="0.8" />
          <text x="8" y="44" fill="#f0fdf4" fontSize="7" fontWeight="700">Phosphate Solubilizers</text>
          <rect x="0" y="56" width="130" height="24" rx="3" fill="#143e26" stroke="#059669" strokeWidth="0.8" />
          <text x="8" y="72" fill="#f0fdf4" fontSize="7" fontWeight="700">Beneficial Actinomycetes</text>
        </g>

        <rect x="14" y="152" width="252" height="30" rx="4" fill="#042c19" stroke="#10b981" strokeWidth="0.8" />
        <text x="140" y="165" textAnchor="middle" fill="#86efac" fontSize="7.2" fontWeight="700">CARBON REGENERATION VS CHEMICAL BURNOUT</text>
        <text x="140" y="175" textAnchor="middle" fill="#6ee7b7" fontSize="6.5" fontFamily="monospace">Restores earthworm humus and microbial resilience</text>
      </g>

      <g transform="translate(18, 258)">
        <rect x="0" y="0" width="604" height="48" rx="6" fill="#0d2919" stroke="#047857" strokeWidth="1" />
        <circle cx="20" cy="24" r="6" fill="#34d399" />
        <text x="34" y="22" fill="#f8fafc" fontSize="10" fontWeight="700">Vṛkṣāyurveda: Living Soil as the Foundation of Civilization</text>
        <text x="34" y="36" fill="#a7f3d0" fontSize="8.5" fontFamily="monospace">
          Ancient agronomists treated soil not as dead dirt, but as an active, living ecosystem teeming with millions of microscopic partners.
        </text>
      </g>
    </svg>
  </div>
);

/* ==========================================================================
   11. KṚṢI: Agro-Meteorology & Rain Gauge (ECO-03)
   ========================================================================== */
export const KrishiHydrologySchematic: React.FC<{ _compact?: boolean; className?: string }> = ({
  className = '',
}) => (
  <div className={`iks-schematic-wrap iks-schematic--krishi ${className}`} style={{ width: '100%', overflow: 'hidden' }}>
    <svg viewBox="0 0 640 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '14px' }} role="img" aria-label="Kṛṣi-Parāśara Rain Gauge & Cloud Classification Schematic">
      <defs>
        <linearGradient id="krishiBg" x1="0" y1="0" x2="640" y2="320" gradientUnits="userSpaceOnUse">
          <stop stopColor="#081622" /><stop offset="0.5" stopColor="#0c2336" /><stop offset="1" stopColor="#05101a" />
        </linearGradient>
      </defs>
      <rect width="640" height="320" fill="url(#krishiBg)" />
      <circle cx="160" cy="160" r="100" fill="#0284c7" opacity="0.12" filter="blur(40px)" />
      <circle cx="480" cy="160" r="100" fill="#38bdf8" opacity="0.10" filter="blur(40px)" />

      <rect x="18" y="14" width="604" height="28" rx="6" fill="#08283d" stroke="#0284c7" strokeWidth="1" />
      <text x="32" y="32" fill="#38bdf8" fontSize="10.5" fontFamily="monospace" fontWeight="700" letterSpacing="0.08em">
        ECO-03 · KṚṢI-PARĀŚARA AGRO-METEOROLOGY · c. 400 BCE
      </text>
      <text x="608" y="32" textAnchor="end" fill="#fde047" fontSize="10.5" fontFamily="monospace" fontWeight="700">
        DROṆA-MĀNA PRECIPITATION GAUGE
      </text>

      {/* LEFT: Standardized Droṇa-Māna Rain Cylinder */}
      <g transform="translate(40, 54)">
        <rect x="0" y="0" width="250" height="195" rx="8" fill="#051827" stroke="#0284c7" strokeWidth="1.2" />
        <text x="14" y="22" fill="#7dd3fc" fontSize="9" fontWeight="800">STANDARDIZED RAIN GAUGE</text>
        <text x="14" y="34" fill="#38bdf8" fontSize="7" fontFamily="monospace">Droṇa-māna: 1 Aratni (Cubit) Diameter</text>

        {/* Rain Cylinder */}
        <g transform="translate(125, 115)">
          <rect x="-35" y="-45" width="70" height="90" rx="4" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1.5" />
          <rect x="-32" y="5" width="64" height="37" rx="2" fill="#0284c7" opacity="0.6" />
          {/* Calibrated Tick Marks in Aṅgulas */}
          {Array.from({ length: 9 }).map((_, i) => (
            <g key={i}>
              <line x1="-35" y1={-40 + i * 10} x2="-25" y2={-40 + i * 10} stroke="#fde047" strokeWidth="1" />
              <text x="-22" y={-38 + i * 10} fill="#fde68a" fontSize="5.5" fontFamily="monospace">{8 - i}A</text>
            </g>
          ))}
          <text x="0" y="28" textAnchor="middle" fill="#f0f9ff" fontSize="7.5" fontWeight="700">1 DROṆA WATER</text>
        </g>
        <text x="125" y="184" textAnchor="middle" fill="#bae6fd" fontSize="7" fontFamily="monospace">Equivalent to 4 Āḍhakas (50–65mm rainfall)</text>
      </g>

      {/* RIGHT: 4 Classical Cloud Formations & Planting Seasons */}
      <g transform="translate(315, 54)">
        <rect x="0" y="0" width="295" height="195" rx="8" fill="#051827" stroke="#0284c7" strokeWidth="1.2" />
        <text x="14" y="22" fill="#fde047" fontSize="9" fontWeight="800">4 PARĀŚARA CLOUD TAXONOMIES</text>
        <text x="14" y="34" fill="#7dd3fc" fontSize="7" fontFamily="monospace">Atmospheric classification for seasonal crop cycles</text>

        <g transform="translate(14, 46)">
          <rect x="0" y="0" width="128" height="38" rx="4" fill="#0e3a5a" stroke="#0284c7" strokeWidth="0.8" />
          <text x="8" y="14" fill="#bae6fd" fontSize="7.5" fontWeight="700">1. ĀVARTA (आवर्त)</text>
          <text x="8" y="24" fill="#38bdf8" fontSize="6.8" fontFamily="monospace">Spiral Cyclone · Localized</text>

          <rect x="136" y="0" width="128" height="38" rx="4" fill="#0e3a5a" stroke="#0284c7" strokeWidth="0.8" />
          <text x="144" y="14" fill="#bae6fd" fontSize="7.5" fontWeight="700">2. SAṀVARTA (संवर्त)</text>
          <text x="144" y="24" fill="#38bdf8" fontSize="6.8" fontFamily="monospace">Heavy Thunderstorm · Floods</text>

          <rect x="0" y="44" width="128" height="38" rx="4" fill="#0e3a5a" stroke="#0284c7" strokeWidth="0.8" />
          <text x="8" y="58" fill="#bae6fd" fontSize="7.5" fontWeight="700">3. PUṢKARA (पुष्कर)</text>
          <text x="8" y="68" fill="#38bdf8" fontSize="6.8" fontFamily="monospace">Scattered Showers · Drought risk</text>

          <rect x="136" y="44" width="128" height="38" rx="4" fill="#0e3a5a" stroke="#0284c7" strokeWidth="0.8" />
          <text x="144" y="58" fill="#bae6fd" fontSize="7.5" fontWeight="700">4. DROṆA (द्रोण)</text>
          <text x="144" y="68" fill="#38bdf8" fontSize="6.8" fontFamily="monospace">Copious Continuous Rain · Bumper</text>
        </g>

        <rect x="14" y="142" width="264" height="40" rx="4" fill="#08283d" stroke="#38bdf8" strokeWidth="0.8" />
        <text x="146" y="156" textAnchor="middle" fill="#f0f9ff" fontSize="7.5" fontWeight="700">SOLAR MONTH HARVEST LINK</text>
        <text x="146" y="168" textAnchor="middle" fill="#7dd3fc" fontSize="6.8" fontFamily="monospace">Optimal Sowing Window: Jyeṣṭha to Āṣāḍha Monsoons</text>
      </g>

      <g transform="translate(18, 258)">
        <rect x="0" y="0" width="604" height="48" rx="6" fill="#08283d" stroke="#0284c7" strokeWidth="1" />
        <circle cx="20" cy="24" r="6" fill="#38bdf8" />
        <text x="34" y="22" fill="#f8fafc" fontSize="10" fontWeight="700">Quantitative Hydrological Science in Ancient Agriculture</text>
        <text x="34" y="36" fill="#bae6fd" fontSize="8.5" fontFamily="monospace">
          Kṛṣi-Parāśara established the world’s earliest empirical rainfall measuring protocol to guide irrigation reservoirs and crop schedules.
        </text>
      </g>
    </svg>
  </div>
);

/* ==========================================================================
   12. ANNA-SVARĀJ: Heirloom Seed Sovereignty (ECO-04)
   ========================================================================== */
export const AnnaSvarajSeedSchematic: React.FC<{ _compact?: boolean; className?: string }> = ({
  className = '',
}) => (
  <div className={`iks-schematic-wrap iks-schematic--annasvaraj ${className}`} style={{ width: '100%', overflow: 'hidden' }}>
    <svg viewBox="0 0 640 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '14px' }} role="img" aria-label="Anna-Svarāj Heirloom Seed Conservation & Germplasm Matrix Schematic">
      <defs>
        <linearGradient id="seedBg" x1="0" y1="0" x2="640" y2="320" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1a140a" /><stop offset="0.5" stopColor="#281e0f" /><stop offset="1" stopColor="#120e06" />
        </linearGradient>
      </defs>
      <rect width="640" height="320" fill="url(#seedBg)" />
      <circle cx="160" cy="160" r="100" fill="#f59e0b" opacity="0.12" filter="blur(40px)" />

      <rect x="18" y="14" width="604" height="28" rx="6" fill="#2d2110" stroke="#b45309" strokeWidth="1" />
      <text x="32" y="32" fill="#fbbf24" fontSize="10.5" fontFamily="monospace" fontWeight="700" letterSpacing="0.08em">
        ECO-04 · ANNA-SVARĀJ SEED CONSERVATION · INDIGENOUS BIODIVERSITY
      </text>
      <text x="608" y="32" textAnchor="end" fill="#fde047" fontSize="10.5" fontFamily="monospace" fontWeight="700">
        GERMPLASM PRESERVATION &amp; ADAPTATION
      </text>

      {/* LEFT: Terracotta Seed Urn Storage */}
      <g transform="translate(40, 54)">
        <rect x="0" y="0" width="250" height="195" rx="8" fill="#1f1508" stroke="#b45309" strokeWidth="1.2" />
        <text x="14" y="22" fill="#fde68a" fontSize="9" fontWeight="800">TRADITIONAL SEED STORAGE (KOṬHĀRA)</text>
        <text x="14" y="34" fill="#f59e0b" fontSize="7" fontFamily="monospace">Earthen Terracotta with Neem &amp; Ash Barriers</text>

        <g transform="translate(125, 115)">
          <path d="M -40 -35 L 40 -35 L 50 40 Q 0 55 -50 40 Z" fill="#92400e" stroke="#d97706" strokeWidth="1.5" />
          <ellipse cx="0" cy="-35" rx="40" ry="8" fill="#b45309" />
          <rect x="-35" y="-20" width="70" height="8" rx="2" fill="#15803d" />
          <text x="0" y="-14" textAnchor="middle" fill="#dcfce7" fontSize="5.5" fontWeight="700">NEEM LEAF BARRIER</text>
          <rect x="-35" y="10" width="70" height="8" rx="2" fill="#a16207" />
          <text x="0" y="16" textAnchor="middle" fill="#fef9c3" fontSize="5.5" fontWeight="700">TURMERIC &amp; COW-DUNG ASH</text>
          <text x="0" y="34" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="800">100% DRY VIABILITY</text>
        </g>
        <text x="125" y="184" textAnchor="middle" fill="#fde68a" fontSize="7" fontFamily="monospace">Preserves seed germination rate for up to 5 seasons</text>
      </g>

      {/* RIGHT: Seed Profiles & Biodiversity Matrix */}
      <g transform="translate(315, 54)">
        <rect x="0" y="0" width="295" height="195" rx="8" fill="#1f1508" stroke="#b45309" strokeWidth="1.2" />
        <text x="14" y="22" fill="#fde047" fontSize="9" fontWeight="800">INDIGENOUS LANDRACES (DESI VARIETIES)</text>
        <text x="14" y="34" fill="#fbbf24" fontSize="7" fontFamily="monospace">Climate-resilient genetic traits</text>

        <g transform="translate(14, 46)">
          <rect x="0" y="0" width="265" height="34" rx="4" fill="#2d1d08" stroke="#b45309" strokeWidth="0.8" />
          <circle cx="16" cy="17" r="5" fill="#f59e0b" />
          <text x="28" y="15" fill="#fef3c7" fontSize="7.5" fontWeight="700">1. Navara (नवार) Red Rice</text>
          <text x="28" y="25" fill="#fcd34d" fontSize="6.8" fontFamily="monospace">Medicinal Ayurvedic cultivar · High iron &amp; zinc</text>

          <rect x="0" y="40" width="265" height="34" rx="4" fill="#2d1d08" stroke="#b45309" strokeWidth="0.8" />
          <circle cx="16" cy="17" r="5" fill="#34d399" />
          <text x="28" y="55" fill="#fef3c7" fontSize="7.5" fontWeight="700">2. Śrīdhānya Millets (श्रीधान्यम्)</text>
          <text x="28" y="65" fill="#86efac" fontSize="6.8" fontFamily="monospace">Deep-root drought resilience · 1/3 water footprint</text>

          <rect x="0" y="80" width="265" height="34" rx="4" fill="#2d1d08" stroke="#b45309" strokeWidth="0.8" />
          <circle cx="16" cy="17" r="5" fill="#38bdf8" />
          <text x="28" y="95" fill="#fef3c7" fontSize="7.5" fontWeight="700">3. Kala Namak (कालानमक) Fragrant Rice</text>
          <text x="28" y="105" fill="#bae6fd" fontSize="6.8" fontFamily="monospace">Buddha’s historic aromatic rice · High protein</text>
        </g>

        <rect x="14" y="152" width="265" height="30" rx="4" fill="#042f1a" stroke="#10b981" strokeWidth="0.8" />
        <text x="146" y="165" textAnchor="middle" fill="#86efac" fontSize="7.2" fontWeight="700">COMMUNITY SEED BANKS (BĪJA-SVARĀJ)</text>
        <text x="146" y="175" textAnchor="middle" fill="#6ee7b7" fontSize="6.5" fontFamily="monospace">Self-sovereignty: farmers breed and swap without patent traps</text>
      </g>

      <g transform="translate(18, 258)">
        <rect x="0" y="0" width="604" height="48" rx="6" fill="#2d2110" stroke="#b45309" strokeWidth="1" />
        <circle cx="20" cy="24" r="6" fill="#fbbf24" />
        <text x="34" y="22" fill="#f8fafc" fontSize="10" fontWeight="700">Genetic Heritage of Indian Agriculture</text>
        <text x="34" y="36" fill="#fde68a" fontSize="8.5" fontFamily="monospace">
          India nurtured over 200,000 distinct heirloom rice varieties, creating an unrivaled reservoir of genetic drought and salinity resistance.
        </text>
      </g>
    </svg>
  </div>
);

/* ==========================================================================
   13. IKS WORKBOOK: Experiential Science Journal (WBK-01)
   ========================================================================== */
export const IksWorkbookSchematic: React.FC<{ _compact?: boolean; className?: string }> = ({
  className = '',
}) => (
  <div className={`iks-schematic-wrap iks-schematic--workbook ${className}`} style={{ width: '100%', overflow: 'hidden' }}>
    <svg viewBox="0 0 640 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '14px' }} role="img" aria-label="Class 7 IKS Experiential Science Workbook & Journal Schematic">
      <defs>
        <linearGradient id="wbkBg" x1="0" y1="0" x2="640" y2="320" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0c172a" /><stop offset="0.5" stopColor="#1e293b" /><stop offset="1" stopColor="#0f172a" />
        </linearGradient>
      </defs>
      <rect width="640" height="320" fill="url(#wbkBg)" />
      <circle cx="200" cy="160" r="110" fill="#38bdf8" opacity="0.10" filter="blur(40px)" />

      <rect x="18" y="14" width="604" height="28" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1" />
      <text x="32" y="32" fill="#38bdf8" fontSize="10.5" fontFamily="monospace" fontWeight="700" letterSpacing="0.08em">
        WBK-01 · CLASS 7 IKS EXPERIENTIAL SCIENCE WORKBOOK · NCERT / NEP 2020
      </text>
      <text x="608" y="32" textAnchor="end" fill="#fde047" fontSize="10.5" fontFamily="monospace" fontWeight="700">
        OBSERVE ➔ HYPOTHESIZE ➔ EXPERIMENT
      </text>

      {/* Open Science Journal (2 Pages) */}
      <g transform="translate(40, 54)">
        {/* Left Page: The 4-Step Scientific Inquiry */}
        <g transform="translate(0, 0)">
          <rect x="0" y="0" width="265" height="195" rx="6" fill="#0f172a" stroke="#475569" strokeWidth="1.2" />
          <rect x="8" y="8" width="249" height="20" rx="3" fill="#1e293b" />
          <text x="16" y="22" fill="#93c5fd" fontSize="8" fontWeight="800">FIELD LOG: SCIENTIFIC METHOD PROTOCOL</text>

          {[
            { step: '1', title: 'Nirīkṣaṇam (निरीक्षणम्)', sub: 'Close Observation of Physical Phenomena' },
            { step: '2', title: 'Parikalpanā (परिकल्पना)', sub: 'Falsifiable Hypothesis Formulation' },
            { step: '3', title: 'Pratyakṣa-Prayoga (प्रत्यक्ष-प्रयोगः)', sub: 'Controlled Empirical Variable Testing' },
            { step: '4', title: 'Siddhānta (सिद्धान्तः)', sub: 'Peer-Reviewed Valid Conclusion' },
          ].map((item, i) => (
            <g key={i} transform={`translate(12, ${36 + i * 36})`}>
              <rect x="0" y="0" width="241" height="30" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="0.8" />
              <circle cx="14" cy="15" r="8" fill="#0284c7" />
              <text x="14" y="18" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="800">{item.step}</text>
              <text x="28" y="14" fill="#f8fafc" fontSize="8" fontWeight="700">{item.title}</text>
              <text x="28" y="24" fill="#94a3b8" fontSize="6.8" fontFamily="monospace">{item.sub}</text>
            </g>
          ))}
        </g>

        {/* Right Page: NCERT Curriculum Alignment Checklist */}
        <g transform="translate(285, 0)">
          <rect x="0" y="0" width="275" height="195" rx="6" fill="#0f172a" stroke="#475569" strokeWidth="1.2" />
          <rect x="8" y="8" width="259" height="20" rx="3" fill="#1e293b" />
          <text x="16" y="22" fill="#fde047" fontSize="8" fontWeight="800">CBSE CLASS 7 UNIT MAPPINGS</text>

          <g transform="translate(12, 38)">
            {[
              { unit: 'Ch 6: Physical & Chemical Changes', lab: 'Delhi Pillar Rust Passivation (MET-01)' },
              { unit: 'Ch 9: Soil & Forests Our Lifeline', lab: 'Prakṛti Closed-Loop Bio-Dome (ECO-01)' },
              { unit: 'Ch 13: Motion and Time', lab: 'Konark 24-Spoke Solar Clock (AST-01)' },
              { unit: 'Ch 2: Nutrition in Animals', lab: 'Uddālaka 15-Day Fasting Trial (MED-01)' },
            ].map((entry, idx) => (
              <g key={idx} transform={`translate(0, ${idx * 34})`}>
                <rect x="0" y="0" width="251" height="28" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="0.8" />
                <rect x="6" y="6" width="16" height="16" rx="2" fill="#059669" />
                <text x="14" y="17" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="800">✓</text>
                <text x="28" y="14" fill="#f8fafc" fontSize="7.5" fontWeight="700">{entry.unit}</text>
                <text x="28" y="23" fill="#38bdf8" fontSize="6.8" fontFamily="monospace">{entry.lab}</text>
              </g>
            ))}
          </g>

          <rect x="12" y="150" width="251" height="34" rx="4" fill="#064e3b" stroke="#10b981" strokeWidth="0.8" />
          <text x="137" y="164" textAnchor="middle" fill="#a7f3d0" fontSize="7.5" fontWeight="700">HANDS-ON EXPERIENTIAL LEARNING</text>
          <text x="137" y="174" textAnchor="middle" fill="#6ee7b7" fontSize="6.8" fontFamily="monospace">Printable observation sheets, graphs, and rubrics</text>
        </g>
      </g>

      <g transform="translate(18, 258)">
        <rect x="0" y="0" width="604" height="48" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1" />
        <circle cx="20" cy="24" r="6" fill="#38bdf8" />
        <text x="34" y="22" fill="#f8fafc" fontSize="10" fontWeight="700">Connecting Ancient Inquiry to Modern Science Pedagogy</text>
        <text x="34" y="36" fill="#94a3b8" fontSize="8.5" fontFamily="monospace">
          Transforms textbook science from passive memorization into active, joyful, empirical discovery for middle school students.
        </text>
      </g>
    </svg>
  </div>
);

/* ==========================================================================
   14. WONDERS QUIZ: Civilizational Science Challenge (WBK-02)
   ========================================================================== */
export const WondersQuizSchematic: React.FC<{ _compact?: boolean; className?: string }> = ({
  className = '',
}) => (
  <div className={`iks-schematic-wrap iks-schematic--quiz ${className}`} style={{ width: '100%', overflow: 'hidden' }}>
    <svg viewBox="0 0 640 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '14px' }} role="img" aria-label="Wonders of Indian Science Quiz & Competency Arena Schematic">
      <defs>
        <linearGradient id="quizBg" x1="0" y1="0" x2="640" y2="320" gradientUnits="userSpaceOnUse">
          <stop stopColor="#120c24" /><stop offset="0.5" stopColor="#1f103d" /><stop offset="1" stopColor="#0a0614" />
        </linearGradient>
      </defs>
      <rect width="640" height="320" fill="url(#quizBg)" />
      <circle cx="200" cy="160" r="110" fill="#a855f7" opacity="0.12" filter="blur(40px)" />
      <circle cx="480" cy="160" r="100" fill="#ec4899" opacity="0.10" filter="blur(40px)" />

      <rect x="18" y="14" width="604" height="28" rx="6" fill="#241147" stroke="#6b21a8" strokeWidth="1" />
      <text x="32" y="32" fill="#c084fc" fontSize="10.5" fontFamily="monospace" fontWeight="700" letterSpacing="0.08em">
        WBK-02 · WONDERS OF INDIAN SCIENCE QUIZ · ARENA OF INQUIRY
      </text>
      <text x="608" y="32" textAnchor="end" fill="#facc15" fontSize="10.5" fontFamily="monospace" fontWeight="700">
        5-DOMAIN MASTERY RADAR MATRIX
      </text>

      {/* LEFT: 5-Domain Competency Radar Chart */}
      <g transform="translate(160, 160)">
        {/* Pentagonal Grid Rings */}
        {[70, 50, 30].map((r, idx) => {
          const points = Array.from({ length: 5 })
            .map((_, i) => {
              const a = (i * 72 - 90) * (Math.PI / 180);
              return `${r * Math.cos(a)},${r * Math.sin(a)}`;
            })
            .join(' ');
          return <polygon key={idx} points={points} stroke="#6b21a8" strokeWidth="0.8" fill="none" strokeDasharray={idx === 0 ? '' : '3 2'} />;
        })}

        {/* Competency Score Polygon */}
        <polygon
          points="0,-65 52,-18 36,48 -36,48 -58,-18"
          fill="#a855f7"
          fillOpacity="0.35"
          stroke="#c084fc"
          strokeWidth="2"
        />

        {/* 5 Domain Axes & Labels */}
        {[
          { label: 'Astronomy', a: -90, x: 0, y: -78 },
          { label: 'Metallurgy', a: -18, x: 68, y: -20 },
          { label: 'Mathematics', a: 54, x: 44, y: 64 },
          { label: 'Medicine', a: 126, x: -44, y: 64 },
          { label: 'Ecology', a: 198, x: -68, y: -20 },
        ].map((axis, i) => (
          <g key={i}>
            <circle cx={axis.x * 0.85} cy={axis.y * 0.85} r="3" fill="#facc15" />
            <text x={axis.x} y={axis.y} textAnchor="middle" fill="#e9d5ff" fontSize="7.5" fontWeight="700">
              {axis.label}
            </text>
          </g>
        ))}
      </g>

      {/* RIGHT: Challenge Scorecard & Telemetry */}
      <g transform="translate(340, 54)">
        <rect x="0" y="0" width="275" height="195" rx="8" fill="#180b33" stroke="#6b21a8" strokeWidth="1.2" />
        <text x="14" y="22" fill="#facc15" fontSize="9.5" fontWeight="800">CIVILIZATIONAL QUIZ ARENA</text>
        <text x="14" y="34" fill="#d8b4fe" fontSize="7.5" fontFamily="monospace">Real-time question evaluation &amp; scoring</text>

        <g transform="translate(14, 46)">
          <rect x="0" y="0" width="118" height="38" rx="4" fill="#260f54" stroke="#7e22ce" strokeWidth="0.8" />
          <text x="10" y="14" fill="#d8b4fe" fontSize="7.5" fontWeight="700">STREAK MULTIPLIER</text>
          <text x="10" y="28" fill="#fde047" fontSize="12" fontWeight="800" fontFamily="monospace">3X COMBO</text>

          <rect x="126" y="0" width="120" height="38" rx="4" fill="#260f54" stroke="#7e22ce" strokeWidth="0.8" />
          <text x="136" y="14" fill="#d8b4fe" fontSize="7.5" fontWeight="700">SCORE TOTAL</text>
          <text x="136" y="28" fill="#34d399" fontSize="12" fontWeight="800" fontFamily="monospace">1,450 PTS</text>
        </g>

        <g transform="translate(14, 96)">
          <rect x="0" y="0" width="246" height="40" rx="4" fill="#210a4a" stroke="#9333ea" strokeWidth="0.8" />
          <text x="10" y="16" fill="#f8fafc" fontSize="7.5" fontWeight="700">QUESTION BANK:</text>
          <text x="10" y="28" fill="#c084fc" fontSize="7" fontFamily="monospace">150+ Peer-Reviewed Multidisciplinary Science Inquiries</text>
        </g>

        <rect x="14" y="146" width="246" height="36" rx="4" fill="#052e16" stroke="#16a34a" strokeWidth="0.8" />
        <text x="137" y="160" textAnchor="middle" fill="#86efac" fontSize="7.5" fontWeight="700">NATIONAL CURRICULUM READY</text>
        <text x="137" y="171" textAnchor="middle" fill="#6ee7b7" fontSize="6.8" fontFamily="monospace">Instant answers with Sanskrit etymology &amp; historical context</text>
      </g>

      <g transform="translate(18, 258)">
        <rect x="0" y="0" width="604" height="48" rx="6" fill="#241147" stroke="#6b21a8" strokeWidth="1" />
        <circle cx="20" cy="24" r="6" fill="#c084fc" />
        <text x="34" y="22" fill="#f8fafc" fontSize="10" fontWeight="700">Mastery Assessment Across 5 Indian Scientific Disciplines</text>
        <text x="34" y="36" fill="#e9d5ff" fontSize="8.5" fontFamily="monospace">
          Challenges students on empirical metallurgy, geometry, celestial motions, ecology, and surgery through adaptive multiple-choice quests.
        </text>
      </g>
    </svg>
  </div>
);

/* ==========================================================================
   UNIFIED DISPATCHER COMPONENT FOR ALL 14 IKS LABS
   ========================================================================== */
export const IksLabGraphic: React.FC<IksLabGraphicProps> = ({ id, className = '', _compact = false }) => {
  switch (id) {
    case 'konark':
      return <KonarkSunWheelSchematic _compact={_compact} className={className} />;
    case 'patina':
      return <PatinaPassivationSchematic _compact={_compact} className={className} />;
    case 'cipher':
      return <KatapayadiCipherSchematic _compact={_compact} className={className} />;
    case 'biodome':
      return <BioDomeEcosystemSchematic _compact={_compact} className={className} />;
    case 'uddalaka':
      return <UddalakaEmpiricalSchematic _compact={_compact} className={className} />;
    case 'cosmic-alignment':
      return <CosmicAlignmentSchematic _compact={_compact} className={className} />;
    case 'stepwell':
      return <StepwellHydraulicsSchematic _compact={_compact} className={className} />;
    case 'wootz':
      return <WootzSteelSchematic _compact={_compact} className={className} />;
    case 'susruta':
      return <SusrutaBiomimeticSchematic _compact={_compact} className={className} />;
    case 'govardhan':
      return <GovardhanSoilSchematic _compact={_compact} className={className} />;
    case 'krishi':
      return <KrishiHydrologySchematic _compact={_compact} className={className} />;
    case 'food-sovereignty':
      return <AnnaSvarajSeedSchematic _compact={_compact} className={className} />;
    case 'iks-workbook':
      return <IksWorkbookSchematic _compact={_compact} className={className} />;
    case 'wonders-quiz':
      return <WondersQuizSchematic _compact={_compact} className={className} />;
    default:
      return null;
  }
};

export default IksLabGraphic;
