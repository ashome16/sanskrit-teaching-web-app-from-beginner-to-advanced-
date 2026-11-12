import React from 'react';

export interface IksLabGraphicProps {
  id: string;
  className?: string;
  compact?: boolean;
}

/**
 * 1. Patina: Delhi Iron Pillar Passivation Film (MET-01)
 * High-phosphorus wrought iron, catalytic δ-FeOOH (misawite) film, 1,600-year rust invariance.
 */
export const PatinaPassivationSchematic: React.FC<{ _compact?: boolean; className?: string }> = ({
  className = '',
}) => {
  return (
    <div className={`iks-schematic-wrap iks-schematic--patina ${className}`} style={{ width: '100%', overflow: 'hidden' }}>
      <svg
        viewBox="0 0 640 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '14px' }}
        role="img"
        aria-label="Delhi Iron Pillar Passivation Film & Solid-State Metallurgy Schematic"
      >
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

        {/* Technical Blueprint Backdrop */}
        <rect width="640" height="320" fill="url(#patinaBg)" />
        <rect width="640" height="320" fill="url(#patinaGrid)" opacity="0.75" />

        {/* Ambient Glows */}
        <circle cx="110" cy="160" r="90" fill="#0284c7" opacity="0.12" filter="blur(30px)" />
        <circle cx="430" cy="170" r="120" fill="#f59e0b" opacity="0.10" filter="blur(40px)" />

        {/* HEADER BAR */}
        <g id="header">
          <rect x="18" y="14" width="604" height="28" rx="6" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />
          <text x="32" y="32" fill="#38bdf8" fontSize="10.5" fontFamily="monospace" fontWeight="700" letterSpacing="0.08em">
            MET-01 · METALLURGICAL SOLID-STATE CHEMISTRY · c. 400 CE
          </text>
          <text x="608" y="32" textAnchor="end" fill="#f59e0b" fontSize="10.5" fontFamily="monospace" fontWeight="700">
            δ-FeOOH (MISAWITE) PASSIVATION BARRIER
          </text>
        </g>

        {/* LEFT COLUMN: Delhi Iron Pillar Silhouette Cutaway */}
        <g id="pillar-cutaway" transform="translate(42, 54)">
          {/* Ground level */}
          <line x1="-15" y1="230" x2="145" y2="230" stroke="#334155" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="65" y="244" textAnchor="middle" fill="#64748b" fontSize="8.5" fontFamily="monospace">
            ORIGINAL GROUND BEDDING
          </text>

          {/* Pillar Ornamental Capital (Lotus & Amalaka) */}
          <path d="M 40 28 L 90 28 L 86 38 L 44 38 Z" fill="#64748b" />
          <path d="M 34 38 L 96 38 L 92 48 L 38 48 Z" fill="#475569" />
          <path d="M 46 48 L 84 48 L 82 56 L 48 56 Z" fill="#64748b" />

          {/* Fluted Lotus Bell Neck */}
          <path d="M 50 56 L 80 56 L 76 72 L 54 72 Z" fill="#334155" />

          {/* Main Shaft (Cylindrical Taper) */}
          <path d="M 53 72 L 77 72 L 81 228 L 49 228 Z" fill="url(#pillarShaft)" stroke="#475569" strokeWidth="1" />

          {/* Gupta Brahmi Inscription Band */}
          <rect x="52" y="112" width="26" height="34" fill="#0f172a" opacity="0.6" />
          <line x1="55" y1="118" x2="75" y2="118" stroke="#f59e0b" strokeWidth="1" opacity="0.8" />
          <line x1="55" y1="124" x2="73" y2="124" stroke="#f59e0b" strokeWidth="1" opacity="0.8" />
          <line x1="55" y1="130" x2="76" y2="130" stroke="#f59e0b" strokeWidth="1" opacity="0.8" />
          <line x1="55" y1="136" x2="71" y2="136" stroke="#f59e0b" strokeWidth="1" opacity="0.8" />
          <line x1="55" y1="142" x2="74" y2="142" stroke="#f59e0b" strokeWidth="1" opacity="0.8" />

          {/* Dimension Tag */}
          <line x1="28" y1="28" x2="28" y2="228" stroke="#38bdf8" strokeWidth="0.8" />
          <line x1="24" y1="28" x2="32" y2="28" stroke="#38bdf8" strokeWidth="0.8" />
          <line x1="24" y1="228" x2="32" y2="228" stroke="#38bdf8" strokeWidth="0.8" />
          <text x="22" y="132" textAnchor="end" fill="#38bdf8" fontSize="8" fontFamily="monospace">
            7.2m · 6,000kg
          </text>

          {/* Zoom Callout Ray targeting surface */}
          <circle cx="80" cy="148" r="6" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
          <circle cx="80" cy="148" r="2" fill="#f59e0b" />
          <path d="M 86 148 L 175 110" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="3 2" />
          <path d="M 86 148 L 175 220" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="3 2" />
        </g>

        {/* RIGHT COLUMN: Microscopic Cross-Section (100 µm Scale) */}
        <g id="microscopic-cross-section" transform="translate(225, 54)">
          {/* Magnification Header */}
          <rect x="0" y="0" width="375" height="195" rx="8" fill="#070e1b" stroke="#1e293b" strokeWidth="1.2" />

          {/* Scale Label */}
          <rect x="12" y="10" width="128" height="18" rx="4" fill="#0f172a" />
          <text x="18" y="22" fill="#94a3b8" fontSize="8.5" fontFamily="monospace">
            SURFACE PROFILE · 100 µm
          </text>

          {/* Layer 1: High-Phosphorus Wrought Iron Core (Base) */}
          <rect x="12" y="34" width="130" height="148" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="1" />
          {/* Slag Fiber Inclusions */}
          <path d="M 24 50 Q 55 62 85 48 T 130 58" stroke="#f59e0b" strokeWidth="2.2" strokeDasharray="6 3" fill="none" />
          <path d="M 20 85 Q 60 75 95 90 T 135 80" stroke="#f59e0b" strokeWidth="1.8" strokeDasharray="5 3" fill="none" />
          <path d="M 28 120 Q 65 135 105 118 T 130 130" stroke="#f59e0b" strokeWidth="2" strokeDasharray="7 3" fill="none" />
          <path d="M 18 155 Q 55 145 90 162 T 135 152" stroke="#f59e0b" strokeWidth="1.6" strokeDasharray="4 2" fill="none" />

          <text x="20" y="48" fill="#cbd5e1" fontSize="9" fontWeight="700">WROUGHT IRON SUBSTRATE</text>
          <text x="20" y="60" fill="#94a3b8" fontSize="7.5" fontFamily="monospace">Fe Matrix + 0.28% Phosphorus</text>
          <text x="20" y="70" fill="#f59e0b" fontSize="7.2" fontFamily="monospace">Slag Fiber Entrapment</text>

          {/* Layer 2: Catalytic δ-FeOOH (Misawite) Active Interlayer */}
          <rect x="146" y="34" width="94" height="148" rx="3" fill="url(#misawiteLayer)" stroke="#d97706" strokeWidth="1" />
          {/* Crystalline Lattice Network */}
          <g stroke="#ffffff" strokeOpacity="0.4" strokeWidth="0.8">
            <line x1="152" y1="46" x2="232" y2="46" />
            <line x1="152" y1="68" x2="232" y2="68" />
            <line x1="152" y1="90" x2="232" y2="90" />
            <line x1="152" y1="112" x2="232" y2="112" />
            <line x1="152" y1="134" x2="232" y2="134" />
            <line x1="152" y1="156" x2="232" y2="156" />

            <circle cx="168" cy="46" r="2" fill="#fef3c7" />
            <circle cx="212" cy="46" r="2" fill="#fef3c7" />
            <circle cx="190" cy="68" r="2" fill="#fef3c7" />
            <circle cx="168" cy="90" r="2" fill="#fef3c7" />
            <circle cx="212" cy="90" r="2" fill="#fef3c7" />
            <circle cx="190" cy="112" r="2" fill="#fef3c7" />
            <circle cx="168" cy="134" r="2" fill="#fef3c7" />
            <circle cx="212" cy="134" r="2" fill="#fef3c7" />
            <circle cx="190" cy="156" r="2" fill="#fef3c7" />
          </g>

          <text x="154" y="48" fill="#451a03" fontSize="8.5" fontWeight="800">δ-FeOOH LAYER</text>
          <text x="154" y="58" fill="#78350f" fontSize="7" fontWeight="700">Crystalline Misawite</text>
          <text x="154" y="174" fill="#451a03" fontSize="7" fontWeight="700">Thickness ≈ 50 µm</text>

          {/* Layer 3: Protective Amorphous Oxyhydroxide Barrier Crust */}
          <rect x="244" y="34" width="48" height="148" rx="3" fill="url(#protectiveCrust)" stroke="#38bdf8" strokeWidth="1" />
          <text x="250" y="48" fill="#082f49" fontSize="8" fontWeight="800">BARRIER</text>
          <text x="250" y="58" fill="#075985" fontSize="6.8" fontWeight="700">Amorphous</text>
          <text x="250" y="174" fill="#082f49" fontSize="6.8" fontWeight="700">Impervious</text>

          {/* ATMOSPHERE & WEATHER ATTACK (Repelled) */}
          <g id="atmosphere-attack" transform="translate(296, 34)">
            {/* Ambient Atmosphere Header */}
            <text x="12" y="16" fill="#38bdf8" fontSize="8" fontWeight="700">AIR / MONSOON</text>
            <text x="12" y="26" fill="#64748b" fontSize="7" fontFamily="monospace">H₂O + O₂ Vapor</text>

            {/* Droplets / Moisture vectors rebounding */}
            {/* Vector 1 */}
            <path d="M 68 45 L 2 55" stroke="#38bdf8" strokeWidth="1.4" strokeDasharray="3 2" />
            <path d="M 2 55 L 68 68" stroke="#34d399" strokeWidth="1.6" />
            <polygon points="68,68 60,65 62,71" fill="#34d399" />
            <circle cx="70" cy="45" r="3" fill="#38bdf8" />
            <text x="12" y="76" fill="#34d399" fontSize="6.8" fontFamily="monospace">100% REBOUND</text>

            {/* Vector 2 */}
            <path d="M 68 105 L 2 115" stroke="#38bdf8" strokeWidth="1.4" strokeDasharray="3 2" />
            <path d="M 2 115 L 68 126" stroke="#34d399" strokeWidth="1.6" />
            <polygon points="68,126 60,123 62,129" fill="#34d399" />
            <circle cx="70" cy="105" r="3" fill="#38bdf8" />

            <rect x="8" y="140" width="64" height="24" rx="4" fill="#064e3b" stroke="#10b981" strokeWidth="0.8" />
            <text x="40" y="152" textAnchor="middle" fill="#a7f3d0" fontSize="7.5" fontWeight="700">NO PITTING</text>
            <text x="40" y="160" textAnchor="middle" fill="#6ee7b7" fontSize="6.5" fontFamily="monospace">Zero Rust Drift</text>
          </g>
        </g>

        {/* FOOTER CALLOUT SUMMARY BAR */}
        <g id="footer-bar" transform="translate(18, 258)">
          <rect x="0" y="0" width="604" height="48" rx="6" fill="#0b1324" stroke="#1e293b" strokeWidth="1" />
          <circle cx="20" cy="24" r="6" fill="#34d399" />
          <text x="34" y="22" fill="#f8fafc" fontSize="10" fontWeight="700">
            Catalytic Mechanism: High Phosphorus (P) + Alternate Wet/Dry Monsoon Acceleration
          </text>
          <text x="34" y="36" fill="#94a3b8" fontSize="8.5" fontFamily="monospace">
            Solid-state phosphate enrichment converts corrosive rust into an insoluble, compact δ-FeOOH barrier crust that preserves the core indefinitely.
          </text>
        </g>
      </svg>
    </div>
  );
};

/**
 * 2. Cipher: Kaṭapayādi Alphanumeric Cipher (MTH-01)
 * 10-digit consonant mapping, right-to-left evaluation, Mādhava 31-decimal pi expansion.
 */
export const KatapayadiCipherSchematic: React.FC<{ _compact?: boolean; className?: string }> = ({
  className = '',
}) => {
  return (
    <div className={`iks-schematic-wrap iks-schematic--cipher ${className}`} style={{ width: '100%', overflow: 'hidden' }}>
      <svg
        viewBox="0 0 640 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '14px' }}
        role="img"
        aria-label="Kaṭapayādi Alphanumeric Cipher & Sanskrit Numerical Encryption Matrix"
      >
        <defs>
          <linearGradient id="cipherBg" x1="0" y1="0" x2="640" y2="320" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0a0f24" />
            <stop offset="0.5" stopColor="#120c2b" />
            <stop offset="1" stopColor="#080d21" />
          </linearGradient>

          <pattern id="cipherGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#2e1065" strokeWidth="0.6" strokeOpacity="0.4" />
          </pattern>
        </defs>

        <rect width="640" height="320" fill="url(#cipherBg)" />
        <rect width="640" height="320" fill="url(#cipherGrid)" />

        {/* Ambient glows */}
        <circle cx="160" cy="160" r="110" fill="#7c3aed" opacity="0.14" filter="blur(40px)" />
        <circle cx="480" cy="160" r="110" fill="#c084fc" opacity="0.10" filter="blur(40px)" />

        {/* TOP BANNER */}
        <g id="cipher-topbar">
          <rect x="18" y="14" width="604" height="28" rx="6" fill="#170f38" stroke="#3b0764" strokeWidth="1" />
          <text x="32" y="32" fill="#c084fc" fontSize="10.5" fontFamily="monospace" fontWeight="700" letterSpacing="0.08em">
            MTH-01 · KAṬAPAYĀDI ALPHANUMERIC SYSTEM · KĒRAḶA SCHOOL (c. 1380 CE)
          </text>
          <text x="608" y="32" textAnchor="end" fill="#facc15" fontSize="10.5" fontFamily="monospace" fontWeight="700">
            अङ्कानां वामतो गतिः (RIGHT-TO-LEFT NUMBERS)
          </text>
        </g>

        {/* LEFT COLUMN: The 4-Varga Mapping Matrix (10 Digits) */}
        <g id="matrix-table" transform="translate(24, 54)">
          <rect x="0" y="0" width="280" height="195" rx="8" fill="#130b2c" stroke="#2e1065" strokeWidth="1.2" />

          {/* Table Header */}
          <rect x="8" y="8" width="264" height="20" rx="4" fill="#241047" />
          <text x="14" y="22" fill="#e9d5ff" fontSize="8.5" fontFamily="monospace" fontWeight="700">
            DIGIT MAPPING: क-ट-प-यादि सूत्रम्
          </text>

          {/* Column headers: Digits 1 to 0 */}
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((digit, i) => (
            <g key={digit} transform={`translate(${14 + i * 26}, 34)`}>
              <rect x="0" y="0" width="22" height="18" rx="3" fill="#7c3aed" />
              <text x="11" y="13" textAnchor="middle" fill="#ffffff" fontSize="9.5" fontWeight="800">
                {digit}
              </text>
            </g>
          ))}

          {/* Row 1: Ka-varga (कादि) */}
          <g transform="translate(14, 58)">
            {['क', 'ख', 'ग', 'घ', 'ङ', 'च', 'छ', 'ज', 'झ', 'ञ'].map((ch, i) => (
              <g key={ch} transform={`translate(${i * 26}, 0)`}>
                <rect x="0" y="0" width="22" height="24" rx="3" fill="#1c1138" stroke="#3b0764" strokeWidth="0.8" />
                <text x="11" y="16" textAnchor="middle" fill="#e9d5ff" fontSize="11" fontWeight="700">
                  {ch}
                </text>
              </g>
            ))}
          </g>

          {/* Row 2: Ṭa-varga (टादि) */}
          <g transform="translate(14, 88)">
            {['ट', 'ठ', 'ड', 'ढ', 'ण', 'त', 'थ', 'द', 'ध', 'न'].map((ch, i) => (
              <g key={ch} transform={`translate(${i * 26}, 0)`}>
                <rect x="0" y="0" width="22" height="24" rx="3" fill="#1c1138" stroke="#3b0764" strokeWidth="0.8" />
                <text x="11" y="16" textAnchor="middle" fill="#e9d5ff" fontSize="11" fontWeight="700">
                  {ch}
                </text>
              </g>
            ))}
          </g>

          {/* Row 3: Pa-varga (पादि) */}
          <g transform="translate(14, 118)">
            {['प', 'फ', 'ब', 'भ', 'म', '—', '—', '—', '—', '—'].map((ch, i) => (
              <g key={ch} transform={`translate(${i * 26}, 0)`}>
                <rect x="0" y="0" width="22" height="24" rx="3" fill="#1c1138" stroke="#3b0764" strokeWidth="0.8" />
                <text x="11" y="16" textAnchor="middle" fill={ch === '—' ? '#64748b' : '#e9d5ff'} fontSize="11" fontWeight="700">
                  {ch}
                </text>
              </g>
            ))}
          </g>

          {/* Row 4: Ya-varga (यादि) */}
          <g transform="translate(14, 148)">
            {['य', 'र', 'ल', 'व', 'श', 'ष', 'स', 'ह', '—', 'स्वर'].map((ch, i) => (
              <g key={ch} transform={`translate(${i * 26}, 0)`}>
                <rect x="0" y="0" width="22" height="24" rx="3" fill="#1c1138" stroke="#3b0764" strokeWidth="0.8" />
                <text x="11" y="15" textAnchor="middle" fill={ch === '—' ? '#64748b' : '#fbbf24'} fontSize={ch === 'स्वर' ? '7.5' : '10'} fontWeight="700">
                  {ch}
                </text>
              </g>
            ))}
          </g>

          <text x="14" y="186" fill="#a855f7" fontSize="7.8" fontFamily="monospace">
            Rule: Vowels (स्वर) &amp; conjunct halanta consonants carry no numerical weight.
          </text>
        </g>

        {/* RIGHT COLUMN: Mādhava Pi Verse Decryption Flowchart */}
        <g id="pi-decryption-flow" transform="translate(320, 54)">
          <rect x="0" y="0" width="296" height="195" rx="8" fill="#110b27" stroke="#3b0764" strokeWidth="1.2" />

          {/* Header */}
          <text x="14" y="20" fill="#facc15" fontSize="9.5" fontWeight="800">
            CASE STUDY: MĀDHAVA’S 31-DECIMAL π VERSE
          </text>
          <text x="14" y="32" fill="#94a3b8" fontSize="7.5" fontFamily="monospace">
            From the Sadratnamāla (Kēraḷa Ganita Tradition)
          </text>

          {/* Sample Sanskrit Verse Tokens */}
          <g transform="translate(14, 44)">
            {/* Shloka Syllables */}
            <rect x="0" y="0" width="268" height="30" rx="4" fill="#1e103f" stroke="#581c87" strokeWidth="1" />
            <text x="12" y="20" fill="#f8fafc" fontSize="13" fontWeight="700" letterSpacing="0.18em">
              गो पी भा ग्य म धु व्रा त ...
            </text>
          </g>

          {/* Consonant Breakdown & Digits */}
          <g transform="translate(14, 82)">
            {[
              { syl: 'गो', con: 'ग', dig: '3' },
              { syl: 'पी', con: 'प', dig: '1' },
              { syl: 'भा', con: 'भ', dig: '4' },
              { syl: 'ग्य', con: 'य', dig: '1' },
              { syl: 'म', con: 'म', dig: '5' },
              { syl: 'धु', con: 'ध', dig: '9' },
              { syl: 'व्रा', con: 'र', dig: '2' },
              { syl: 'त', con: 'त', dig: '6' },
            ].map((item, idx) => (
              <g key={idx} transform={`translate(${idx * 33}, 0)`}>
                {/* Syllable box */}
                <rect x="0" y="0" width="28" height="18" rx="3" fill="#2e1065" />
                <text x="14" y="13" textAnchor="middle" fill="#d8b4fe" fontSize="9" fontWeight="700">
                  {item.syl}
                </text>
                {/* Down Arrow */}
                <path d="M 14 20 L 14 27" stroke="#a855f7" strokeWidth="1" />
                {/* Resulting Digit */}
                <rect x="0" y="29" width="28" height="20" rx="3" fill="#4c1d95" stroke="#a855f7" strokeWidth="1" />
                <text x="14" y="43" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="800">
                  {item.dig}
                </text>
              </g>
            ))}
          </g>

          {/* Result Constant Banner */}
          <g transform="translate(14, 140)">
            <rect x="0" y="0" width="268" height="42" rx="5" fill="#030712" stroke="#f59e0b" strokeWidth="1" />
            <text x="10" y="16" fill="#f59e0b" fontSize="8" fontFamily="monospace" fontWeight="700">
              REVERSED OUTPUT (अङ्कानां वामतो गतिः):
            </text>
            <text x="10" y="32" fill="#38bdf8" fontSize="13" fontFamily="monospace" fontWeight="800">
              π = 3.14159265...
            </text>
          </g>
        </g>

        {/* BOTTOM METRIC BAR */}
        <g id="cipher-footer" transform="translate(18, 258)">
          <rect x="0" y="0" width="604" height="48" rx="6" fill="#0f0926" stroke="#2e1065" strokeWidth="1" />
          <circle cx="20" cy="24" r="6" fill="#c084fc" />
          <text x="34" y="22" fill="#f8fafc" fontSize="10" fontWeight="700">
            Dual Function: Poetic Mnemonic + Cryptographic Hashing
          </text>
          <text x="34" y="36" fill="#a855f7" fontSize="8.5" fontFamily="monospace">
            Enabled ancient astronomers to transmit astronomical orbital tables, ephemerides, and trigonometric sine values in meter without transcription errors.
          </text>
        </g>
      </svg>
    </div>
  );
};

/**
 * 3. Bio-Dome: Prakṛti Closed-Loop Biosphere (ECO-01)
 * Geodesic dome, photosynthetic O2/CO2 cycle, hydrological loop, 5 Mahābhūtas trophic balance.
 */
export const BioDomeEcosystemSchematic: React.FC<{ _compact?: boolean; className?: string }> = ({
  className = '',
}) => {
  return (
    <div className={`iks-schematic-wrap iks-schematic--biodome ${className}`} style={{ width: '100%', overflow: 'hidden' }}>
      <svg
        viewBox="0 0 640 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '14px' }}
        role="img"
        aria-label="Prakṛti Closed-Loop Bio-Dome & Trophic Biosphere Schematic"
      >
        <defs>
          <linearGradient id="domeBg" x1="0" y1="0" x2="640" y2="320" gradientUnits="userSpaceOnUse">
            <stop stopColor="#041a14" />
            <stop offset="0.5" stopColor="#062e22" />
            <stop offset="1" stopColor="#031711" />
          </linearGradient>

          <linearGradient id="domeShell" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#34d399" stopOpacity="0.45" />
            <stop offset="1" stopColor="#059669" stopOpacity="0.05" />
          </linearGradient>

          <pattern id="ecoGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#064e3b" strokeWidth="0.6" strokeOpacity="0.5" />
          </pattern>
        </defs>

        <rect width="640" height="320" fill="url(#domeBg)" />
        <rect width="640" height="320" fill="url(#ecoGrid)" />

        {/* Ambient bioluminescent glows */}
        <circle cx="320" cy="180" r="140" fill="#10b981" opacity="0.12" filter="blur(50px)" />
        <circle cx="530" cy="90" r="80" fill="#facc15" opacity="0.12" filter="blur(40px)" />

        {/* TOP BANNER */}
        <g id="dome-topbar">
          <rect x="18" y="14" width="604" height="28" rx="6" fill="#042018" stroke="#064e3b" strokeWidth="1" />
          <text x="32" y="32" fill="#34d399" fontSize="10.5" fontFamily="monospace" fontWeight="700" letterSpacing="0.08em">
            ECO-01 · PRAKṚTI CLOSED-LOOP BIOSPHERE DOME · VR̥KṢĀYURVEDA
          </text>
          <text x="608" y="32" textAnchor="end" fill="#facc15" fontSize="10.5" fontFamily="monospace" fontWeight="700">
            अन्नाद् भवन्ति भूतानि (GĪTĀ 3.14 TROPHIC CYCLE)
          </text>
        </g>

        {/* GEODESIC DOME STRUCTURE & INTERIOR ECOSYSTEM */}
        <g id="geodesic-dome" transform="translate(40, 54)">
          {/* External Glass Dome Arch */}
          <path
            d="M 20 195 A 170 170 0 0 1 360 195 Z"
            fill="url(#domeShell)"
            stroke="#10b981"
            strokeWidth="1.8"
          />

          {/* Geodesic Hexagonal Facet Lines */}
          <g stroke="#34d399" strokeOpacity="0.35" strokeWidth="1" fill="none">
            {/* Struts */}
            <path d="M 190 25 L 140 70 L 190 110 L 240 70 Z" />
            <path d="M 190 25 L 190 110" />
            <path d="M 140 70 L 80 115 L 110 160 L 190 160 L 270 160 L 300 115 L 240 70" />
            <path d="M 80 115 L 30 170 L 60 195 L 110 160" />
            <path d="M 300 115 L 350 170 L 320 195 L 270 160" />
          </g>

          {/* Sun Input at Peak */}
          <circle cx="190" cy="22" r="10" fill="#facc15" opacity="0.8" />
          <line x1="190" y1="36" x2="190" y2="70" stroke="#facc15" strokeWidth="1.5" strokeDasharray="3 2" />
          <text x="190" y="14" textAnchor="middle" fill="#fde047" fontSize="8" fontWeight="700">SOLAR TEJAS</text>

          {/* Living Soil Base (Pṛthivī + Humus) */}
          <rect x="20" y="195" width="340" height="24" rx="3" fill="#142e20" stroke="#064e3b" strokeWidth="1" />
          <text x="190" y="210" textAnchor="middle" fill="#86efac" fontSize="8.5" fontFamily="monospace" fontWeight="700">
            LIVING MICROBIAL HUMUS BED · VṚKṢĀYURVEDA SOIL
          </text>

          {/* Center Tree of Life (Prakṛti Banyan / Producers) */}
          <g id="tree-center" transform="translate(190, 195)">
            {/* Trunk */}
            <path d="M -8 0 Q -12 -35 -20 -60 Q -5 -50 0 -45 Q 5 -50 20 -60 Q 12 -35 8 0 Z" fill="#78350f" />
            {/* Canopy */}
            <ellipse cx="0" cy="-75" rx="55" ry="32" fill="#047857" stroke="#10b981" strokeWidth="1.2" />
            <ellipse cx="-25" cy="-80" rx="35" ry="24" fill="#059669" opacity="0.9" />
            <ellipse cx="25" cy="-80" rx="35" ry="24" fill="#059669" opacity="0.9" />
            <text x="0" y="-72" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="800">
              PRODUCERS
            </text>
            <text x="0" y="-62" textAnchor="middle" fill="#a7f3d0" fontSize="7" fontWeight="600">
              O₂ Photosynthesis
            </text>
          </g>

          {/* Left: Herbivores & Living Fauna */}
          <g id="herbivores" transform="translate(85, 175)">
            <rect x="-35" y="-18" width="70" height="34" rx="4" fill="#064e3b" stroke="#34d399" strokeWidth="0.8" />
            <text x="0" y="-4" textAnchor="middle" fill="#f0fdf4" fontSize="8" fontWeight="700">HERBIVORES</text>
            <text x="0" y="8" textAnchor="middle" fill="#86efac" fontSize="6.8" fontFamily="monospace">CO₂ Exhale</text>
          </g>

          {/* Right: Decomposers & Predators */}
          <g id="decomposers" transform="translate(295, 175)">
            <rect x="-35" y="-18" width="70" height="34" rx="4" fill="#064e3b" stroke="#34d399" strokeWidth="0.8" />
            <text x="0" y="-4" textAnchor="middle" fill="#f0fdf4" fontSize="8" fontWeight="700">CARNIVORES</text>
            <text x="0" y="8" textAnchor="middle" fill="#86efac" fontSize="6.8" fontFamily="monospace">Soil Recycling</text>
          </g>

          {/* Closed-Loop Flux Curves */}
          {/* Oxygen loop (green/cyan) */}
          <path d="M 140 120 Q 80 120 85 150" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" fill="none" />
          <polygon points="85,152 81,146 88,146" fill="#38bdf8" />
          <text x="100" y="130" fill="#38bdf8" fontSize="7" fontFamily="monospace">O₂ FLUX</text>

          {/* CO2 loop (amber) */}
          <path d="M 115 165 Q 150 160 170 145" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" fill="none" />
          <polygon points="170,145 163,148 166,142" fill="#f59e0b" />
          <text x="135" y="160" fill="#f59e0b" fontSize="7" fontFamily="monospace">CO₂</text>

          {/* Water Condensation on Dome Ceiling */}
          <path d="M 230 115 Q 260 70 290 85" stroke="#06b6d4" strokeWidth="1.4" strokeDasharray="2 2" fill="none" />
          <circle cx="280" cy="80" r="2.5" fill="#38bdf8" />
          <circle cx="295" cy="92" r="2" fill="#38bdf8" />
          <text x="255" y="70" fill="#38bdf8" fontSize="6.8" fontFamily="monospace">PRECIPITATION</text>
        </g>

        {/* RIGHT COLUMN: Real-Time Telemetry Panels */}
        <g id="dome-telemetry" transform="translate(425, 54)">
          <rect x="0" y="0" width="195" height="195" rx="8" fill="#05251d" stroke="#064e3b" strokeWidth="1.2" />
          <text x="14" y="22" fill="#a7f3d0" fontSize="9" fontWeight="800">
            BIOSPHERE TELEMETRY
          </text>
          <text x="14" y="34" fill="#6ee7b7" fontSize="7" fontFamily="monospace">
            Dynamic Closed-Loop Balance
          </text>

          {/* Metric 1: O2/CO2 Balance */}
          <g transform="translate(14, 46)">
            <text x="0" y="10" fill="#cbd5e1" fontSize="8" fontWeight="600">O₂ / CO₂ Equilibrium</text>
            <rect x="0" y="14" width="166" height="10" rx="3" fill="#064e3b" />
            <rect x="0" y="14" width="166" height="10" rx="3" fill="#10b981" />
            <text x="166" y="10" textAnchor="end" fill="#34d399" fontSize="8" fontFamily="monospace">1.00 (STABLE)</text>
          </g>

          {/* Metric 2: Microbial Soil Health */}
          <g transform="translate(14, 82)">
            <text x="0" y="10" fill="#cbd5e1" fontSize="8" fontWeight="600">Soil Humus Mycelium</text>
            <rect x="0" y="14" width="166" height="10" rx="3" fill="#064e3b" />
            <rect x="0" y="14" width="152" height="10" rx="3" fill="#f59e0b" />
            <text x="166" y="10" textAnchor="end" fill="#fbbf24" fontSize="8" fontFamily="monospace">94% RESILIENT</text>
          </g>

          {/* Metric 3: Water Vapor Saturation */}
          <g transform="translate(14, 118)">
            <text x="0" y="10" fill="#cbd5e1" fontSize="8" fontWeight="600">Precipitation Circulation</text>
            <rect x="0" y="14" width="166" height="10" rx="3" fill="#064e3b" />
            <rect x="0" y="14" width="138" height="10" rx="3" fill="#38bdf8" />
            <text x="166" y="10" textAnchor="end" fill="#38bdf8" fontSize="8" fontFamily="monospace">88% (ACTIVE)</text>
          </g>

          {/* 5 Elements Chip */}
          <rect x="14" y="152" width="166" height="30" rx="4" fill="#022c22" stroke="#047857" strokeWidth="0.8" />
          <text x="97" y="166" textAnchor="middle" fill="#86efac" fontSize="7.5" fontWeight="700">
            5 MAHĀBHŪTAS IN HARMONY
          </text>
          <text x="97" y="176" textAnchor="middle" fill="#6ee7b7" fontSize="6.8" fontFamily="monospace">
            Pṛthivī · Ap · Tejas · Vāyu · Ākāśa
          </text>
        </g>

        {/* FOOTER CALLOUT SUMMARY BAR */}
        <g id="dome-footer" transform="translate(18, 258)">
          <rect x="0" y="0" width="604" height="48" rx="6" fill="#042018" stroke="#064e3b" strokeWidth="1" />
          <circle cx="20" cy="24" r="6" fill="#10b981" />
          <text x="34" y="22" fill="#f8fafc" fontSize="10" fontWeight="700">
            Civilizational Ecology: Sustainable Sealed Trophic Pyramids
          </text>
          <text x="34" y="36" fill="#86efac" fontSize="8.5" fontFamily="monospace">
            Proves that life sustains life in a zero-waste loop when plants, animals, water, and soil microbes are preserved in thermodynamic equilibrium.
          </text>
        </g>
      </svg>
    </div>
  );
};

/**
 * 4. Uddālaka: Sage Uddālaka Empirical Mind Lab (MED-01)
 * Tri-panel scientific visual: Salt dissolution titration, Nyagrodha seed microcosm, 15-day fasting neurobiology.
 */
export const UddalakaEmpiricalSchematic: React.FC<{ _compact?: boolean; className?: string }> = ({
  className = '',
}) => {
  return (
    <div className={`iks-schematic-wrap iks-schematic--uddalaka ${className}`} style={{ width: '100%', overflow: 'hidden' }}>
      <svg
        viewBox="0 0 640 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '14px' }}
        role="img"
        aria-label="Sage Uddālaka Empirical Inquiry & Cognitive Science Tri-Panel Schematic"
      >
        <defs>
          <linearGradient id="uddalakaBg" x1="0" y1="0" x2="640" y2="320" gradientUnits="userSpaceOnUse">
            <stop stopColor="#180b1e" />
            <stop offset="0.5" stopColor="#250d30" />
            <stop offset="1" stopColor="#120718" />
          </linearGradient>

          <pattern id="uddalakaGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#500724" strokeWidth="0.6" strokeOpacity="0.4" />
          </pattern>
        </defs>

        <rect width="640" height="320" fill="url(#uddalakaBg)" />
        <rect width="640" height="320" fill="url(#uddalakaGrid)" />

        {/* Ambient glows */}
        <circle cx="120" cy="160" r="90" fill="#db2777" opacity="0.12" filter="blur(40px)" />
        <circle cx="320" cy="160" r="90" fill="#f59e0b" opacity="0.12" filter="blur(40px)" />
        <circle cx="520" cy="160" r="90" fill="#38bdf8" opacity="0.12" filter="blur(40px)" />

        {/* TOP BANNER */}
        <g id="uddalaka-topbar">
          <rect x="18" y="14" width="604" height="28" rx="6" fill="#200a28" stroke="#4a044e" strokeWidth="1" />
          <text x="32" y="32" fill="#f472b6" fontSize="10.5" fontFamily="monospace" fontWeight="700" letterSpacing="0.08em">
            MED-01 · SAGE UDDĀLAKA ĀRUṆI · CHĀNDOGYA UPANIṢAD (c. 800 BCE)
          </text>
          <text x="608" y="32" textAnchor="end" fill="#fbbf24" fontSize="10.5" fontFamily="monospace" fontWeight="700">
            प्रत्यक्ष-प्रमाणम् · EMPIRICAL COGNITIVE SCIENCE
          </text>
        </g>

        {/* THREE SCIENTIFIC PANELS */}

        {/* PANEL 1: Salt Dissolution Titration (Chāndogya 6.13) */}
        <g id="panel-salt" transform="translate(24, 54)">
          <rect x="0" y="0" width="186" height="195" rx="8" fill="#1b0a24" stroke="#4a044e" strokeWidth="1.2" />
          <text x="12" y="20" fill="#f472b6" fontSize="9" fontWeight="800">
            EXP 1: SALT DISSOLUTION
          </text>
          <text x="12" y="32" fill="#fbcfe8" fontSize="7" fontFamily="monospace">
            Chāndogya 6.13 (लवण-उदकम्)
          </text>

          {/* Glass Jar with Saline Solution */}
          <g transform="translate(38, 44)">
            {/* Beaker shape */}
            <rect x="0" y="10" width="110" height="105" rx="6" fill="#1e1b4b" stroke="#38bdf8" strokeWidth="1.2" opacity="0.8" />
            <rect x="6" y="24" width="98" height="85" rx="3" fill="#0284c7" opacity="0.25" />

            {/* Depth Probe Lines */}
            {/* Top / Upari */}
            <line x1="6" y1="36" x2="104" y2="36" stroke="#fbbf24" strokeWidth="1.2" strokeDasharray="3 2" />
            <circle cx="16" cy="36" r="3" fill="#f59e0b" />
            <text x="24" y="34" fill="#fde68a" fontSize="7" fontWeight="700">1. Upari (Surface)</text>

            {/* Middle / Madhye */}
            <line x1="6" y1="64" x2="104" y2="64" stroke="#fbbf24" strokeWidth="1.2" strokeDasharray="3 2" />
            <circle cx="16" cy="64" r="3" fill="#f59e0b" />
            <text x="24" y="62" fill="#fde68a" fontSize="7" fontWeight="700">2. Madhye (Middle)</text>

            {/* Bottom / Adhastāt */}
            <line x1="6" y1="92" x2="104" y2="92" stroke="#fbbf24" strokeWidth="1.2" strokeDasharray="3 2" />
            <circle cx="16" cy="92" r="3" fill="#f59e0b" />
            <text x="24" y="90" fill="#fde68a" fontSize="7" fontWeight="700">3. Adhastāt (Bottom)</text>
          </g>

          <rect x="12" y="162" width="162" height="24" rx="4" fill="#371b40" stroke="#701a75" strokeWidth="0.8" />
          <text x="93" y="174" textAnchor="middle" fill="#fdf4ff" fontSize="7.5" fontWeight="700">
            Lavaṇam Eva · Uniform Being
          </text>
          <text x="93" y="182" textAnchor="middle" fill="#f472b6" fontSize="6.8" fontFamily="monospace">
            Invisible, Pervasive (Sat-Vyāpakatā)
          </text>
        </g>

        {/* PANEL 2: Nyagrodha Seed Microcosm (Chāndogya 6.12) */}
        <g id="panel-seed" transform="translate(226, 54)">
          <rect x="0" y="0" width="186" height="195" rx="8" fill="#1b0a24" stroke="#4a044e" strokeWidth="1.2" />
          <text x="12" y="20" fill="#facc15" fontSize="9" fontWeight="800">
            EXP 2: THE BANYAN SEED
          </text>
          <text x="12" y="32" fill="#fef08a" fontSize="7" fontFamily="monospace">
            Chāndogya 6.12 (न्यग्रोध-फलम्)
          </text>

          {/* Fig Fruit Cutaway & Microscopic Seed */}
          <g transform="translate(93, 86)">
            {/* Fig fruit outer */}
            <circle cx="0" cy="0" r="32" fill="#701a75" stroke="#a21caf" strokeWidth="1.2" />
            <circle cx="0" cy="0" r="22" fill="#4c0519" stroke="#db2777" strokeWidth="1" strokeDasharray="2 2" />

            {/* Tiny Micro-Seeds */}
            <circle cx="-6" cy="-4" r="2.5" fill="#fde047" />
            <circle cx="4" cy="-8" r="2.5" fill="#fde047" />
            <circle cx="8" cy="4" r="2.5" fill="#fde047" />
            <circle cx="-4" cy="8" r="2.5" fill="#fde047" />

            {/* Break Open Ray */}
            <line x1="0" y1="0" x2="52" y2="34" stroke="#fbbf24" strokeWidth="1" strokeDasharray="2 2" />
            <circle cx="56" cy="36" r="3.5" fill="#f59e0b" />
          </g>

          {/* Phantom Emerging Giant Banyan Canopy */}
          <g transform="translate(93, 145)" stroke="#34d399" strokeWidth="1" fill="none" opacity="0.85">
            <path d="M 0 0 L 0 -18" />
            <path d="M 0 -18 Q -28 -32 -40 -48" />
            <path d="M 0 -18 Q 28 -32 40 -48" />
            <path d="M 0 -18 Q -10 -38 0 -54" />
          </g>

          <rect x="12" y="162" width="162" height="24" rx="4" fill="#3f2305" stroke="#b45309" strokeWidth="0.8" />
          <text x="93" y="174" textAnchor="middle" fill="#fef3c7" fontSize="7.5" fontWeight="700">
            Aṇiman · Subtle Potentiality
          </text>
          <text x="93" y="182" textAnchor="middle" fill="#fbbf24" fontSize="6.8" fontFamily="monospace">
            From &quot;Nothing&quot; Grows the Giant
          </text>
        </g>

        {/* PANEL 3: 15-Day Fasting Neurobiology (Chāndogya 6.7) */}
        <g id="panel-fasting" transform="translate(428, 54)">
          <rect x="0" y="0" width="188" height="195" rx="8" fill="#1b0a24" stroke="#4a044e" strokeWidth="1.2" />
          <text x="12" y="20" fill="#38bdf8" fontSize="9" fontWeight="800">
            EXP 3: 15-DAY FAST &amp; MEMORY
          </text>
          <text x="12" y="32" fill="#bae6fd" fontSize="7" fontFamily="monospace">
            Chāndogya 6.7 (षोडश-कला-पुरुषः)
          </text>

          {/* Dual Axis Clinical Timeline Graph */}
          <g transform="translate(24, 46)">
            {/* Axes */}
            <line x1="0" y1="85" x2="145" y2="85" stroke="#475569" strokeWidth="1" />
            <line x1="0" y1="10" x2="0" y2="85" stroke="#475569" strokeWidth="1" />

            {/* X-axis labels */}
            <text x="0" y="96" fill="#64748b" fontSize="6.5" fontFamily="monospace">Day 1</text>
            <text x="65" y="96" textAnchor="middle" fill="#64748b" fontSize="6.5" fontFamily="monospace">Day 8</text>
            <text x="110" y="96" textAnchor="middle" fill="#ef4444" fontSize="6.5" fontFamily="monospace">Day 15</text>
            <text x="140" y="96" textAnchor="middle" fill="#10b981" fontSize="6.5" fontFamily="monospace">D16</text>

            {/* Water curve (life maintained constant) */}
            <path d="M 0 35 L 140 35" stroke="#38bdf8" strokeWidth="1.4" strokeDasharray="3 2" fill="none" />
            <text x="6" y="30" fill="#38bdf8" fontSize="6" fontFamily="monospace">Water (Prāṇa Alive)</text>

            {/* Memory degradation curve (steep drop to Day 15, then Day 16 food restore spike) */}
            <path
              d="M 0 15 Q 40 20 80 50 Q 110 75 118 80 L 125 15 L 140 12"
              stroke="#f43f5e"
              strokeWidth="2"
              fill="none"
            />
            <circle cx="118" cy="80" r="3" fill="#ef4444" />
            <text x="100" y="74" textAnchor="end" fill="#fca5a5" fontSize="6" fontWeight="700">Memory Lost</text>

            <circle cx="125" cy="15" r="3" fill="#10b981" />
            <text x="128" y="10" fill="#86efac" fontSize="6" fontWeight="800">Rice Fed!</text>
          </g>

          <rect x="12" y="162" width="164" height="24" rx="4" fill="#0c4a6e" stroke="#0284c7" strokeWidth="0.8" />
          <text x="94" y="174" textAnchor="middle" fill="#f0f9ff" fontSize="7.5" fontWeight="700">
            Manaḥ Annamayam · Mind = Food
          </text>
          <text x="94" y="182" textAnchor="middle" fill="#7dd3fc" fontSize="6.8" fontFamily="monospace">
            Physical Substrate of Cognition
          </text>
        </g>

        {/* FOOTER CALLOUT SUMMARY BAR */}
        <g id="uddalaka-footer" transform="translate(18, 258)">
          <rect x="0" y="0" width="604" height="48" rx="6" fill="#200a28" stroke="#4a044e" strokeWidth="1" />
          <circle cx="20" cy="24" r="6" fill="#ec4899" />
          <text x="34" y="22" fill="#f8fafc" fontSize="10" fontWeight="700">
            Empirical Epistemology: The Father of Modern Cognitive Inquiry
          </text>
          <text x="34" y="36" fill="#fbcfe8" fontSize="8.5" fontFamily="monospace">
            Uddālaka rejected blind dogma: he commanded his son Śvetaketu to taste, dissect, and fast to physically experience the truth of reality.
          </text>
        </g>
      </svg>
    </div>
  );
};

/**
 * Unified Dispatcher Component for IKS Lab Schematics
 */
export const IksLabGraphic: React.FC<IksLabGraphicProps> = ({ id, className = '', compact = false }) => {
  switch (id) {
    case 'patina':
      return <PatinaPassivationSchematic _compact={compact} className={className} />;
    case 'cipher':
      return <KatapayadiCipherSchematic _compact={compact} className={className} />;
    case 'biodome':
      return <BioDomeEcosystemSchematic _compact={compact} className={className} />;
    case 'uddalaka':
      return <UddalakaEmpiricalSchematic _compact={compact} className={className} />;
    default:
      return null;
  }
};

export default IksLabGraphic;
