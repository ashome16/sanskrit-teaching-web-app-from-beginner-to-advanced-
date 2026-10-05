import React from 'react';

/**
 * Palm-leaf / paper manuscript figure of the cipher matrix already printed
 * in the Kaṭapayādi article. Labels are the article's own syllables.
 * A dash is an empty cell in that table. The last य-वर्ग cell is क्ष,
 * which the article also reads as a standalone vowel.
 */
const ROWS: { cells: string[]; small?: boolean }[] = [
  { cells: ['अङ्क', 'क-वर्ग', 'ट-वर्ग', 'प-वर्ग', 'य-वर्ग'] },
  { cells: ['१', 'क', 'ट', 'प', 'य'] },
  { cells: ['२', 'ख', 'ठ', 'फ', 'र'] },
  { cells: ['३', 'ग', 'ड', 'ब', 'ल'] },
  { cells: ['४', 'घ', 'ढ', 'भ', 'व'] },
  { cells: ['५', 'ङ', 'ण', 'म', 'श'] },
  { cells: ['६', 'च', 'त', '—', 'ष'] },
  { cells: ['७', 'छ', 'थ', '—', 'स'] },
  { cells: ['८', 'ज', 'द', '—', 'ह'] },
  { cells: ['९', 'झ', 'ध', '—', 'ळ'] },
  { cells: ['०', 'ञ', 'न', '—', 'क्ष / स्वर'], small: true },
];

const COLS = [78, 196, 314, 432, 550];
const TABLE_LEFT = 36;
const TABLE_RIGHT = 612;
const TABLE_TOP = 92;
const ROW_H = 36;

const KatapayadiManuscriptFigure: React.FC = () => {
  const tableBottom = TABLE_TOP + ROWS.length * ROW_H;

  return (
    <figure className="kata-ms-figure">
      <svg
        className="kata-ms-svg"
        viewBox="0 0 640 520"
        role="img"
        aria-labelledby="kata-ms-title kata-ms-desc"
      >
        <title id="kata-ms-title">कटपयादि अङ्क-वर्ण सारणी</title>
        <desc id="kata-ms-desc">
          Number-letter table from this article. Digits 1 to 0 across क-वर्ग, ट-वर्ग, प-वर्ग, and य-वर्ग.
          Empty cells are marked with a dash. The final य-वर्ग cell is क्ष, or a standalone vowel.
        </desc>
        <defs>
          <linearGradient id="kataMsPaper" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f7e8c8" />
            <stop offset="55%" stopColor="#f0dcb4" />
            <stop offset="100%" stopColor="#e4c896" />
          </linearGradient>
          <pattern id="kataMsLaid" width="6" height="6" patternUnits="userSpaceOnUse">
            <path d="M0 5.5 H6" stroke="#b8894e" strokeWidth="0.35" opacity="0.28" />
          </pattern>
        </defs>

        <rect x="0" y="0" width="640" height="520" fill="url(#kataMsPaper)" />
        <rect x="0" y="0" width="640" height="520" fill="url(#kataMsLaid)" />
        <rect x="14" y="14" width="612" height="492" fill="none" stroke="#4a2e18" strokeWidth="2.4" />
        <rect x="22" y="22" width="596" height="476" fill="none" stroke="#4a2e18" strokeWidth="0.7" />

        <text
          x="320"
          y="52"
          textAnchor="middle"
          fill="#3a2414"
          fontFamily="'Noto Sans Devanagari', Georgia, serif"
          fontSize="26"
          fontWeight="700"
        >
          कटपयादि
        </text>
        <text
          x="320"
          y="76"
          textAnchor="middle"
          fill="#5c3b22"
          fontFamily="'Noto Sans Devanagari', Georgia, serif"
          fontSize="14"
        >
          कादि · टादि · पादि · यादि
        </text>

        <rect
          x={TABLE_LEFT}
          y={TABLE_TOP}
          width={TABLE_RIGHT - TABLE_LEFT}
          height={ROW_H}
          fill="#e2c48a"
          opacity="0.55"
        />

        {ROWS.map((row, rowIndex) => {
          const y = TABLE_TOP + rowIndex * ROW_H;
          const baseline = y + ROW_H * 0.68;
          return (
            <g key={row.cells[0]}>
              {rowIndex > 0 && (
                <line
                  x1={TABLE_LEFT}
                  y1={y}
                  x2={TABLE_RIGHT}
                  y2={y}
                  stroke="#6a4324"
                  strokeWidth="0.8"
                />
              )}
              {row.cells.map((cell, colIndex) => (
                <text
                  key={`${rowIndex}-${colIndex}`}
                  x={COLS[colIndex]}
                  y={baseline}
                  textAnchor="middle"
                  fill="#3a2414"
                  fontFamily="'Noto Sans Devanagari', Georgia, serif"
                  fontSize={row.small && colIndex === 4 ? 13 : rowIndex === 0 ? 15 : 20}
                  fontWeight={rowIndex === 0 ? 700 : 600}
                >
                  {cell}
                </text>
              ))}
            </g>
          );
        })}

        <line x1={TABLE_LEFT} y1={TABLE_TOP} x2={TABLE_RIGHT} y2={TABLE_TOP} stroke="#4a2e18" strokeWidth="1.4" />
        <line x1={TABLE_LEFT} y1={tableBottom} x2={TABLE_RIGHT} y2={tableBottom} stroke="#4a2e18" strokeWidth="1.4" />
        <line x1={TABLE_LEFT} y1={TABLE_TOP} x2={TABLE_LEFT} y2={tableBottom} stroke="#4a2e18" strokeWidth="1.4" />
        <line x1={TABLE_RIGHT} y1={TABLE_TOP} x2={TABLE_RIGHT} y2={tableBottom} stroke="#4a2e18" strokeWidth="1.4" />
        {[136, 254, 372, 490].map((x) => (
          <line key={x} x1={x} y1={TABLE_TOP} x2={x} y2={tableBottom} stroke="#6a4324" strokeWidth="0.8" />
        ))}

      </svg>
      <figcaption className="kata-ms-caption">
        The cipher matrix in this section: digits १–९ and ० across क-वर्ग, ट-वर्ग, प-वर्ग, and य-वर्ग.
        A dash is an empty cell. क्ष, or a standalone vowel, is ०.
      </figcaption>
    </figure>
  );
};

export default KatapayadiManuscriptFigure;
