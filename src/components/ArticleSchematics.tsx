import type { ReactNode } from 'react';
import type { VedicArticleFigureId } from '../data/vedicMaths';

const SANS = "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

function Panel({
  kicker,
  caption,
  maxWidth = 560,
  children,
}: {
  kicker: string;
  caption: string;
  maxWidth?: number;
  children: ReactNode;
}) {
  return (
    <figure className="schematic-panel" style={{ maxWidth }}>
      <figcaption className="schematic-kicker">{kicker}</figcaption>
      {children}
      <p className="schematic-caption">{caption}</p>
    </figure>
  );
}

/** Śulba Sūtra 1.48: rectangle, flank, lateral side, diagonal chord, both areas. */
function SulbaRectangle() {
  return (
    <Panel
      kicker="Śulba Sūtra 1.48"
      caption="The diagonal chord of a rectangle produces both areas which its flank (horizontal base) and lateral (vertical height) sides produce separately."
    >
      <svg viewBox="0 0 420 400" role="img" aria-labelledby="sulba-148-title" style={{ fontFamily: SANS }}>
        <title id="sulba-148-title">
          A rectangle. The diagonal chord produces both the area of the flank and the area of the lateral side.
        </title>
        <defs>
          <path id="sulba-flank" d="M156 156 H312" />
          <path id="sulba-diag" d="M156 156 L312 48" />
        </defs>
        {/* area the lateral side produces */}
        <rect x="48" y="48" width="108" height="108" fill="#38bdf8" fillOpacity="0.14" stroke="#38bdf8" strokeWidth="3" />
        {/* area the flank produces */}
        <rect x="156" y="156" width="156" height="156" fill="#f59e0b" fillOpacity="0.14" stroke="#f59e0b" strokeWidth="3" />
        {/* rectangle: the other two sides */}
        <path d="M156 48 H312 V156" fill="#fff7ed" stroke="#64748b" strokeWidth="3" />
        {/* lateral (vertical height) */}
        <line x1="156" y1="48" x2="156" y2="156" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" />
        {/* flank (horizontal base) */}
        <line x1="156" y1="156" x2="312" y2="156" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
        {/* diagonal chord */}
        <line x1="156" y1="156" x2="312" y2="48" stroke="#34d399" strokeWidth="5" strokeLinecap="round" />
        {/* right angle where flank meets lateral */}
        <path d="M156 140 H172 V156" fill="none" stroke="#f472b6" strokeWidth="2.5" />
        <text x="168" y="70" fill="#334155" fontSize="13" fontWeight="700">rectangle</text>
        <text
          x="40"
          y="102"
          fill="#38bdf8"
          fontSize="12"
          fontWeight="700"
          textAnchor="middle"
          transform="rotate(-90 40 102)"
        >
          tiryaṅmānī
        </text>
        <text x="102" y="108" fill="#0369a1" fontSize="13" fontWeight="700" textAnchor="middle">
          lateral
        </text>
        <text x="102" y="126" fill="#0369a1" fontSize="12" fontWeight="700" textAnchor="middle">
          area
        </text>
        <text fill="#fbbf24" fontSize="13" fontWeight="700" dy="16">
          <textPath href="#sulba-flank" startOffset="14%">
            pārśvamānī · flank
          </textPath>
        </text>
        <text x="234" y="250" fill="#fbbf24" fontSize="14" fontWeight="700" textAnchor="middle">
          flank area
        </text>
        <text fill="#34d399" fontSize="13" fontWeight="700" dy="-8">
          <textPath href="#sulba-diag" startOffset="18%">
            diagonal chord
          </textPath>
        </text>
        <text x="330" y="78" fill="#f472b6" fontSize="13" fontWeight="700">
          produces
        </text>
        <text x="330" y="98" fill="#f472b6" fontSize="13" fontWeight="700">
          both areas
        </text>
      </svg>
    </Panel>
  );
}

function StanceShape({ kind, color }: { kind: string; color: string }) {
  if (kind === 'alidha') {
    return (
      <g>
        <polygon points="22,104 138,104 138,36" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="5" strokeLinejoin="round" />
        <path d="M138 88 H122 V104" fill="none" stroke="#f472b6" strokeWidth="2.5" />
      </g>
    );
  }
  if (kind === 'pratyalidha') {
    return (
      <g>
        <polygon points="22,104 22,36 138,104" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="5" strokeLinejoin="round" />
        <path d="M22 88 H38 V104" fill="none" stroke="#f472b6" strokeWidth="2.5" />
      </g>
    );
  }
  if (kind === 'samapada') {
    return <rect x="52" y="18" width="56" height="92" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="5" />;
  }
  if (kind === 'vaisakha') {
    const h = 52 * (Math.sqrt(3) / 2);
    const tri = `46,${14 + h} 78,14 110,${14 + h}`;
    return (
      <g>
        <polygon points={tri} fill="none" stroke="#38bdf8" strokeWidth="4" strokeLinejoin="round" />
        <polygon points="28,78 132,78 112,112 48,112" fill="none" stroke="#f472b6" strokeWidth="4" strokeLinejoin="round" />
      </g>
    );
  }
  const hex = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (-90 + i * 60);
    return `${(118 + 28 * Math.cos(a)).toFixed(1)},${(62 + 28 * Math.sin(a)).toFixed(1)}`;
  }).join(' ');
  return (
    <g>
      <circle cx="48" cy="62" r="30" fill="none" stroke="#38bdf8" strokeWidth="4" />
      <polygon points={hex} fill="none" stroke="#f472b6" strokeWidth="4" strokeLinejoin="round" />
    </g>
  );
}

/** Five Sthānas, each with the geometric form named in the article. */
function DhanurvedaSthanas() {
  const stances = [
    { name: 'Ālīḍha', form: 'Right-angled scalene triangle', kind: 'alidha', color: '#f59e0b' },
    { name: 'Pratyālīḍha', form: 'Reflected / inverted right-angled triangle', kind: 'pratyalidha', color: '#38bdf8' },
    { name: 'Samapada', form: 'Symmetrical vertical rectangle / square', kind: 'samapada', color: '#34d399' },
    { name: 'Vaiśākha', form: 'Equilateral triangle / isosceles trapezoid', kind: 'vaisakha', color: '#f472b6' },
    { name: 'Maṇḍala', form: 'Circle / regular hexagon', kind: 'mandala', color: '#fbbf24' },
  ];
  return (
    <Panel
      kicker="Five Sthānas"
      caption="Ālīḍha a right-angled scalene triangle, Pratyālīḍha its reflection, Samapada a symmetrical vertical rectangle / square, Vaiśākha an equilateral triangle / isosceles trapezoid, Maṇḍala a circle / regular hexagon."
      maxWidth={720}
    >
      <div className="schematic-stance-grid">
        {stances.map((s) => (
          <div key={s.name} className="schematic-stance">
            <svg viewBox="0 0 160 124" role="img" aria-label={`${s.name}: ${s.form}`}>
              <StanceShape kind={s.kind} color={s.color} />
            </svg>
            <div className="schematic-stance-name" style={{ color: s.color }}>{s.name}</div>
            <div className="schematic-stance-form">{s.form}</div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

/** Yuktibhāṣā octant: square around the circle, 45° tangent equal to R, split into n. */
function YuktibhasaOctant() {
  const cx = 176;
  const cy = 206;
  const R = 150;
  const left = cx - R;
  const top = cy - R;
  const right = cx + R;
  const c45 = Math.cos(Math.PI / 4);
  const s45 = Math.sin(Math.PI / 4);
  const arcR = 34;
  const n = 4;
  const ticks = Array.from({ length: n + 1 }, (_, i) => cy - (i * R) / n);
  return (
    <Panel
      kicker="Caturaśra · octant"
      caption="A circle of radius R inscribed within a square. The tangent from the point of tangency to the corner of the octant equals R, since tan 45° = 1, and is divided into n sections of length Δx = R/n."
    >
      <svg viewBox="0 0 460 430" role="img" aria-labelledby="octant-title" style={{ fontFamily: SANS }}>
        <title id="octant-title">
          Square around a circle, 45 degree tangent equal to the radius, tangent split into n pieces.
        </title>
        <rect x={left} y={top} width={R * 2} height={R * 2} fill="none" stroke="#f59e0b" strokeWidth="4" />
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="#38bdf8" strokeWidth="3" />
        <path
          d={`M ${cx} ${cy} L ${right} ${cy} A ${R} ${R} 0 0 0 ${cx + R * c45} ${cy - R * s45} Z`}
          fill="#f472b6"
          fillOpacity="0.16"
        />
        <line x1={cx} y1={cy} x2={right} y2={cy} stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" />
        <line x1={right} y1={cy} x2={right} y2={top} stroke="#f472b6" strokeWidth="6" strokeLinecap="round" />
        {ticks.map((y) => (
          <line key={y} x1={right - 8} y1={y} x2={right + 14} y2={y} stroke="#f472b6" strokeWidth="3" strokeLinecap="round" />
        ))}
        {ticks.slice(1, n).map((y) => (
          <line
            key={`ray-${y}`}
            x1={cx}
            y1={cy}
            x2={right}
            y2={y}
            stroke="#38bdf8"
            strokeWidth="2"
            strokeDasharray="5 4"
          />
        ))}
        <line x1={cx} y1={cy} x2={right} y2={ticks[2]} stroke="#34d399" strokeWidth="4" strokeLinecap="round" />
        <line x1={cx} y1={cy} x2={right} y2={top} stroke="#fbbf24" strokeWidth="3" />
        <circle cx={cx} cy={cy} r="4" fill="#334155" />
        <path
          d={`M ${cx + arcR} ${cy} A ${arcR} ${arcR} 0 0 0 ${cx + arcR * c45} ${cy - arcR * s45}`}
          fill="none"
          stroke="#f472b6"
          strokeWidth="3"
        />
        <text x={left} y={top - 14} fill="#f59e0b" fontSize="14" fontWeight="700">Caturaśra</text>
        <text x={(cx + right) / 2} y={cy - 10} fill="#fbbf24" fontSize="14" fontWeight="700" textAnchor="middle">R</text>
        <text x={cx - 16} y={cy + 22} fill="#1e293b" fontSize="14" fontWeight="700">O</text>
        <text x={cx + arcR + 8} y={cy - arcR + 4} fill="#f472b6" fontSize="13" fontWeight="700">45°</text>
        <text x={right + 22} y={(top + cy) / 2 - 16} fill="#f472b6" fontSize="14" fontWeight="700">R</text>
        <text x={right + 22} y={top + 28} fill="#9d174d" fontSize="12" fontWeight="700">Δx = R/n</text>
        <text x={right + 22} y={cy + 22} fill="#9d174d" fontSize="12" fontWeight="700">n pieces</text>
        <text x={(cx + right) / 2 - 6} y={(cy + ticks[2]) / 2 - 8} fill="#34d399" fontSize="13" fontWeight="700">Kara</text>
        <text x={right - 36} y={ticks[2] - 8} fill="#0369a1" fontSize="13" fontWeight="700">Pᵢ</text>
        <text x={cx} y={top + R * 2 + 28} fill="#0369a1" fontSize="13" fontWeight="700" textAnchor="middle">Samakhaṇḍa</text>
      </svg>
    </Panel>
  );
}

/** Three-node path: India → al-Khwarizmi → Fibonacci, Liber Abaci (1202). */
function GridPath() {
  const nodes = [
    {
      kicker: 'Antiquity (India)',
      lines: ['Aryabhata', 'Brahmagupta'],
      stroke: '#f59e0b',
    },
    {
      kicker: 'The Islamic Golden Age',
      lines: ['Muhammad ibn Musa al-Khwarizmi'],
      stroke: '#38bdf8',
    },
    {
      kicker: 'The Renaissance (Europe)',
      lines: ['Leonardo Fibonacci', 'Liber Abaci, 1202'],
      stroke: '#34d399',
    },
  ];
  const boxH = 96;
  const gap = 36;
  return (
    <Panel
      kicker="The numerical grid"
      caption="Antiquity (India): Aryabhata and Brahmagupta. Then Muhammad ibn Musa al-Khwarizmi. Then Leonardo Fibonacci, Liber Abaci in 1202."
      maxWidth={480}
    >
      <svg viewBox={`0 0 400 ${nodes.length * boxH + (nodes.length - 1) * gap + 8}`} role="img" aria-labelledby="grid-path-title" style={{ fontFamily: SANS }}>
        <title id="grid-path-title">
          Three-step path: India, Aryabhata and Brahmagupta, to al-Khwarizmi, to Fibonacci’s Liber Abaci, 1202.
        </title>
        {nodes.map((node, i) => {
          const y = i * (boxH + gap);
          return (
            <g key={node.kicker}>
              {i > 0 && (
                <g>
                  <line x1="200" y1={y - gap + 4} x2="200" y2={y - 10} stroke="#f472b6" strokeWidth="4" strokeLinecap="round" />
                  <polygon points={`192,${y - 14} 208,${y - 14} 200,${y - 2}`} fill="#f472b6" />
                </g>
              )}
              <rect x="24" y={y} width="352" height={boxH} rx="12" fill="#fff7ed" stroke={node.stroke} strokeWidth="4" />
              <text x="200" y={y + 28} fill={node.stroke} fontSize="12" fontWeight="700" textAnchor="middle">
                {node.kicker}
              </text>
              {node.lines.map((line, li) => (
                <text
                  key={line}
                  x="200"
                  y={y + 54 + li * 22}
                  fill="#1e293b"
                  fontSize={line.length > 28 ? 14 : 16}
                  fontWeight="700"
                  textAnchor="middle"
                >
                  {line}
                </text>
              ))}
            </g>
          );
        })}
      </svg>
    </Panel>
  );
}

/** CE = Shaka + 78, example 398 Shaka → 476 CE. Both counts drawn the same way. */
function ShakaOffset() {
  return (
    <Panel
      kicker="CE = Shaka + 78"
      caption="CE = Shaka + 78, and Shaka = CE − 78. Example: 398 Shaka + 78 = 476 CE."
      maxWidth={520}
    >
      <svg viewBox="0 0 440 250" role="img" aria-labelledby="shaka-offset-title" style={{ fontFamily: SANS }}>
        <title id="shaka-offset-title">CE equals Shaka plus 78. 398 Shaka maps to 476 CE.</title>
        <text x="220" y="32" fill="#1e293b" fontSize="18" fontWeight="700" textAnchor="middle">
          <tspan fill="#38bdf8">CE</tspan>
          <tspan> = </tspan>
          <tspan fill="#fbbf24">Shaka</tspan>
          <tspan> + </tspan>
          <tspan fill="#f472b6">78</tspan>
        </text>
        <text x="220" y="60" fill="#1e293b" fontSize="18" fontWeight="700" textAnchor="middle">
          <tspan fill="#fbbf24">Shaka</tspan>
          <tspan> = </tspan>
          <tspan fill="#38bdf8">CE</tspan>
          <tspan> − </tspan>
          <tspan fill="#f472b6">78</tspan>
        </text>
        <rect x="16" y="96" width="150" height="100" rx="12" fill="#fff7ed" stroke="#f59e0b" strokeWidth="4" />
        <text x="91" y="140" fill="#fbbf24" fontSize="28" fontWeight="700" textAnchor="middle">398</text>
        <text x="91" y="170" fill="#92400e" fontSize="16" fontWeight="700" textAnchor="middle">Shaka</text>
        <text x="196" y="158" fill="#f472b6" fontSize="22" fontWeight="700" textAnchor="middle">+ 78</text>
        <text x="248" y="158" fill="#334155" fontSize="22" fontWeight="700" textAnchor="middle">=</text>
        <rect x="274" y="96" width="150" height="100" rx="12" fill="#fff7ed" stroke="#38bdf8" strokeWidth="4" />
        <text x="349" y="140" fill="#38bdf8" fontSize="28" fontWeight="700" textAnchor="middle">476</text>
        <text x="349" y="170" fill="#0369a1" fontSize="16" fontWeight="700" textAnchor="middle">CE</text>
        <text x="220" y="230" fill="#1e293b" fontSize="15" fontWeight="700" textAnchor="middle">
          398 Shaka → 476 CE
        </text>
      </svg>
    </Panel>
  );
}

/** Same [1, 5, 6] layout for 12 × 13 = 156 and (x + 2)(x + 3) = x² + 5x + 6. */
function CoefficientVector() {
  const slots = [
    { coef: '1', arith: '100', alg: 'x²', color: '#f59e0b' },
    { coef: '5', arith: '50', alg: '5x', color: '#38bdf8' },
    { coef: '6', arith: '6', alg: '6', color: '#34d399' },
  ];
  const box = (y: number) =>
    slots.map((s, i) => {
      const x = 28 + i * 132;
      return (
        <g key={`${y}-${s.coef}`}>
          <rect x={x} y={y} width="112" height="58" rx="10" fill="#fff7ed" stroke={s.color} strokeWidth="4" />
          <text x={x + 56} y={y + 38} fill={s.color} fontSize="26" fontWeight="700" textAnchor="middle">
            {s.coef}
          </text>
        </g>
      );
    });
  const under = (y: number, key: 'arith' | 'alg') =>
    slots.map((s, i) => (
      <text key={`${key}-${s.coef}`} x={84 + i * 132} y={y} fill={s.color} fontSize="16" fontWeight="700" textAnchor="middle">
        {s[key]}
      </text>
    ));
  return (
    <Panel
      kicker="[1, 5, 6]"
      caption="Arithmetic (Base 10): 12 × 13 = (1 · 10 + 2)(1 · 10 + 3) = 100 + 50 + 6 = 156. Algebra (Base x): (x + 2)(x + 3) = (1 · x + 2)(1 · x + 3) = x² + 5x + 6. The same coefficient structure [1, 5, 6]."
      maxWidth={560}
    >
      <svg viewBox="0 0 500 400" role="img" aria-labelledby="coef-title" style={{ fontFamily: SANS }}>
        <title id="coef-title">
          The same coefficients 1, 5, and 6 for 12 times 13 equals 156 and for (x + 2)(x + 3) equals x squared plus 5x plus 6.
        </title>
        <text x="20" y="24" fill="#f59e0b" fontSize="14" fontWeight="700">Arithmetic (Base 10)</text>
        <text x="20" y="50" fill="#1e293b" fontSize="13" fontWeight="700">
          12 × 13 = (1 · 10 + 2)(1 · 10 + 3)
        </text>
        {box(66)}
        {under(150, 'arith')}
        <text x="150" y="150" fill="#64748b" fontSize="16" fontWeight="700" textAnchor="middle">+</text>
        <text x="282" y="150" fill="#64748b" fontSize="16" fontWeight="700" textAnchor="middle">+</text>
        <text x="430" y="150" fill="#1e293b" fontSize="15" fontWeight="700">= 156</text>
        <text x="220" y="196" fill="#f472b6" fontSize="18" fontWeight="700" textAnchor="middle">[1, 5, 6]</text>
        <line x1="28" y1="214" x2="412" y2="214" stroke="#334155" strokeWidth="2" />
        <text x="20" y="244" fill="#38bdf8" fontSize="14" fontWeight="700">Algebra (Base x)</text>
        <text x="20" y="270" fill="#1e293b" fontSize="13" fontWeight="700">
          (x + 2)(x + 3) = (1 · x + 2)(1 · x + 3)
        </text>
        {box(286)}
        {under(370, 'alg')}
        <text x="150" y="370" fill="#64748b" fontSize="16" fontWeight="700" textAnchor="middle">+</text>
        <text x="282" y="370" fill="#64748b" fontSize="16" fontWeight="700" textAnchor="middle">+</text>
      </svg>
    </Panel>
  );
}

/** School columns beside the vertically-and-crosswise pattern for two 2-digit numbers. */
function FluidCrosswise() {
  return (
    <Panel
      kicker="Place value"
      caption="School columns sit apart: hundreds, tens, and units. For two 2-digit numbers, Ūrdhva-Tiryagbhyām works those places vertically and crosswise, all at once."
      maxWidth={640}
    >
      <svg viewBox="0 0 640 250" role="img" aria-labelledby="fluid-title" style={{ fontFamily: SANS }}>
        <title id="fluid-title">
          Isolated school columns beside a vertically and crosswise pattern for two 2-digit numbers.
        </title>
        <text x="140" y="28" fill="#0f766e" fontSize="15" fontWeight="700" textAnchor="middle">School columns</text>
        {[
          { x: 28, label: 'Hundreds' },
          { x: 112, label: 'Tens' },
          { x: 196, label: 'Units' },
        ].map((b) => (
          <g key={b.label}>
            <rect x={b.x} y="52" width="72" height="64" rx="12" fill="#fff7ed" stroke="#d6d3d1" strokeWidth="4" />
            <text x={b.x + 36} y="90" fill="#334155" fontSize="12" fontWeight="700" textAnchor="middle">{b.label}</text>
          </g>
        ))}
        <text x="470" y="28" fill="#0f766e" fontSize="15" fontWeight="700" textAnchor="middle">Two 2-digit numbers</text>
        {[
          { x: 400, y: 58, label: 'tens' },
          { x: 508, y: 58, label: 'units' },
          { x: 400, y: 150, label: 'tens' },
          { x: 508, y: 150, label: 'units' },
        ].map((b, i) => (
          <g key={`${b.label}-${i}`}>
            <rect x={b.x} y={b.y} width="72" height="48" rx="12" fill="#fff7ed" stroke="#fdba74" strokeWidth="4" />
            <text x={b.x + 36} y={b.y + 30} fill="#9a3412" fontSize="13" fontWeight="700" textAnchor="middle">{b.label}</text>
          </g>
        ))}
        <line x1="436" y1="106" x2="436" y2="150" stroke="#0f766e" strokeWidth="5" strokeLinecap="round" />
        <line x1="544" y1="106" x2="544" y2="150" stroke="#0f766e" strokeWidth="5" strokeLinecap="round" />
        <line x1="472" y1="82" x2="508" y2="174" stroke="#c2410c" strokeWidth="4" strokeLinecap="round" />
        <line x1="508" y1="82" x2="472" y2="174" stroke="#c2410c" strokeWidth="4" strokeLinecap="round" />
        <text x="400" y="230" fill="#0f766e" fontSize="13" fontWeight="700">vertical · ūrdhva</text>
        <text x="530" y="230" fill="#c2410c" fontSize="13" fontWeight="700">crosswise · tiryag</text>
      </svg>
    </Panel>
  );
}

/** Named chain in the lineage article: Swamiji, then the practitioners it lists. */
function TirthaLineagePath() {
  const steps = [
    'Swami Bharati Krishna Tirtha',
    'Manjula Trivedi',
    'Dr. Narinder Puri',
    'Kenneth Williams · James Glover',
  ];
  const boxH = 52;
  const gap = 28;
  return (
    <Panel
      kicker="A chain of practitioners"
      caption="Manjula Trivedi cared for the surviving manuscript. Dr. Narinder Puri carried the sutras into lecture halls. Kenneth Williams and James Glover carried them into schools."
      maxWidth={480}
    >
      <svg viewBox={`0 0 420 ${steps.length * boxH + (steps.length - 1) * gap + 8}`} role="img" aria-labelledby="lineage-title" style={{ fontFamily: SANS }}>
        <title id="lineage-title">
          Swami Bharati Krishna Tirtha, Manjula Trivedi, Dr. Narinder Puri, Kenneth Williams and James Glover.
        </title>
        {steps.map((name, i) => {
          const y = i * (boxH + gap);
          return (
            <g key={name}>
              {i > 0 && (
                <g>
                  <line x1="210" y1={y - gap + 4} x2="210" y2={y - 8} stroke="#0f766e" strokeWidth="4" strokeLinecap="round" />
                  <polygon points={`202,${y - 12} 218,${y - 12} 210,${y - 2}`} fill="#0f766e" />
                </g>
              )}
              <rect x="24" y={y} width="372" height={boxH} rx="12" fill="#fff7ed" stroke="#86efac" strokeWidth="4" />
              <text x="210" y={y + 32} fill="#14532d" fontSize="15" fontWeight="700" textAnchor="middle">{name}</text>
            </g>
          );
        })}
      </svg>
    </Panel>
  );
}

/** Rasa-Guṇa-Pūrṇa-Mahī read right to left, then Shaka + 78. */
function BhutaReversal() {
  const tokens = [
    { name: 'Rasa', n: '6' },
    { name: 'Guṇa', n: '3' },
    { name: 'Pūrṇa', n: '0' },
    { name: 'Mahī', n: '1' },
  ];
  return (
    <Panel
      kicker="Read right to left"
      caption="Rasa 6, Guṇa 3, Pūrṇa 0, Mahī 1. Read from the right: Shaka 1036. CE = Shaka + 78, so 1036 + 78 = 1114 CE. Rasa and Guṇa alone, reversed, are 36 years."
      maxWidth={560}
    >
      <svg viewBox="0 0 520 250" role="img" aria-labelledby="bhuta-title" style={{ fontFamily: SANS }}>
        <title id="bhuta-title">
          Rasa 6, Guna 3, Purna 0, Mahi 1, read right to left as Shaka 1036, plus 78 is 1114 CE.
        </title>
        {tokens.map((tok, i) => {
          const x = 16 + i * 126;
          return (
            <g key={tok.name}>
              <rect x={x} y="16" width="112" height="72" rx="12" fill="#fff7ed" stroke="#fdba74" strokeWidth="4" />
              <text x={x + 56} y="46" fill="#9a3412" fontSize="14" fontWeight="700" textAnchor="middle">{tok.name}</text>
              <text x={x + 56} y="72" fill="#1e293b" fontSize="22" fontWeight="700" textAnchor="middle">{tok.n}</text>
            </g>
          );
        })}
        <text x="260" y="122" fill="#0f766e" fontSize="14" fontWeight="700" textAnchor="middle">right to left → 1 0 3 6</text>
        <rect x="36" y="140" width="180" height="64" rx="12" fill="#fff7ed" stroke="#86efac" strokeWidth="4" />
        <text x="126" y="168" fill="#14532d" fontSize="20" fontWeight="700" textAnchor="middle">1036</text>
        <text x="126" y="190" fill="#166534" fontSize="13" fontWeight="700" textAnchor="middle">Shaka</text>
        <text x="250" y="180" fill="#9a3412" fontSize="18" fontWeight="700" textAnchor="middle">+ 78</text>
        <rect x="300" y="140" width="180" height="64" rx="12" fill="#fff7ed" stroke="#7dd3fc" strokeWidth="4" />
        <text x="390" y="168" fill="#0369a1" fontSize="20" fontWeight="700" textAnchor="middle">1114</text>
        <text x="390" y="190" fill="#0369a1" fontSize="13" fontWeight="700" textAnchor="middle">CE</text>
        <text x="260" y="234" fill="#334155" fontSize="13" fontWeight="700" textAnchor="middle">Rasa 6, Guṇa 3 reversed → 36 years</text>
      </svg>
    </Panel>
  );
}

/** Five articulatory places the cosmic-bridge article pairs with five elements. */
function SikshaFivePlaces() {
  const rows = [
    { place: 'Kaṇṭhya', where: 'throat', element: 'Ākāśa' },
    { place: 'Tālavya', where: 'palate', element: 'Vāyu' },
    { place: 'Mūrdhanya', where: 'roof', element: 'Tejas' },
    { place: 'Dantya', where: 'teeth', element: 'Jala' },
    { place: 'Oṣṭhya', where: 'lips', element: 'Pṛthvī' },
  ];
  const boxH = 44;
  const gap = 16;
  return (
    <Panel
      kicker="Five places of Śikṣā"
      caption="Kaṇṭhya (throat) with Ākāśa, Tālavya (palate) with Vāyu, Mūrdhanya (roof) with Tejas, Dantya (teeth) with Jala, Oṣṭhya (lips) with Pṛthvī."
      maxWidth={520}
    >
      <svg viewBox={`0 0 460 ${rows.length * boxH + (rows.length - 1) * gap + 4}`} role="img" aria-labelledby="siksha-title" style={{ fontFamily: SANS }}>
        <title id="siksha-title">
          Five vocal places from throat to lips, each paired with the element named in the article.
        </title>
        {rows.map((row, i) => {
          const y = i * (boxH + gap);
          return (
            <g key={row.place}>
              {i > 0 && <line x1="28" y1={y - gap + 2} x2="28" y2={y} stroke="#86efac" strokeWidth="4" strokeLinecap="round" />}
              <circle cx="28" cy={y + boxH / 2} r="8" fill="#bbf7d0" stroke="#0f766e" strokeWidth="3" />
              <rect x="52" y={y} width="180" height={boxH} rx="12" fill="#fff7ed" stroke="#fdba74" strokeWidth="3" />
              <text x="142" y={y + 28} fill="#9a3412" fontSize="15" fontWeight="700" textAnchor="middle">{row.place}</text>
              <text x="250" y={y + 28} fill="#64748b" fontSize="13" fontWeight="700">{row.where}</text>
              <rect x="320" y={y} width="124" height={boxH} rx="12" fill="#f0fdf4" stroke="#86efac" strokeWidth="3" />
              <text x="382" y={y + 28} fill="#14532d" fontSize="15" fontWeight="700" textAnchor="middle">{row.element}</text>
            </g>
          );
        })}
      </svg>
    </Panel>
  );
}


/** Magic of Numbers: the article's four cognitive pillars. */
function VedicFourPillars() {
  const pillars = [
    { n: '1', title: 'Less fear', clue: 'one-line mental steps', sub: 'phobia → confidence', stroke: '#fdba74' },
    { n: '2', title: 'Less to memorise', clue: 'tables up to 9', sub: 'sūtras do the rest', stroke: '#86efac' },
    { n: '3', title: 'Brain workout', clue: 'patterns · memory', sub: 'a gym for the mind', stroke: '#38bdf8' },
    { n: '4', title: 'Instant check', clue: 'digit roots', sub: 'बीजाङ्क · Beejank', stroke: '#c4b5fd' },
  ];
  const cellW = 140;
  const gap = 12;
  const w = pillars.length * cellW + (pillars.length - 1) * gap + 8;
  return (
    <Panel
      kicker="Four cognitive pillars"
      caption="The article’s four reasons to try it, resting on the 16 sūtras and 13 sub-sūtras: less maths fear, very little to memorise (tables up to 9), a workout for pattern-spotting, and a quick digit-root (बीजाङ्क) check on every answer."
      maxWidth={620}
    >
      <svg viewBox={`0 0 ${w} 164`} role="img" aria-labelledby="vm4-title" style={{ fontFamily: SANS }}>
        <title id="vm4-title">Four pillars of Vedic Maths from the article.</title>
        <rect x="4" y="136" width={w - 8} height="24" rx="8" fill="#fef3c7" stroke="#fcd34d" strokeWidth="2" />
        <text x={w / 2} y="153" fill="#92400e" fontSize="11.5" fontWeight="800" textAnchor="middle">16 sūtras · 13 sub-sūtras</text>
        {pillars.map((p, i) => {
          const x = 4 + i * (cellW + gap);
          return (
            <g key={p.n}>
              <rect x={x + 6} y="8" width={cellW - 12} height="124" rx="12" fill="#fff7ed" stroke={p.stroke} strokeWidth="3" />
              <circle cx={x + cellW / 2} cy="32" r="13" fill="#ecfdf5" stroke="#0f766e" strokeWidth="2" />
              <text x={x + cellW / 2} y="37" fill="#0f766e" fontSize="13" fontWeight="800" textAnchor="middle">{p.n}</text>
              <text x={x + cellW / 2} y="66" fill="#9a3412" fontSize="12.5" fontWeight="800" textAnchor="middle">{p.title}</text>
              <text x={x + cellW / 2} y="90" fill="#334155" fontSize="11.5" fontWeight="700" textAnchor="middle">{p.clue}</text>
              <text
                x={x + cellW / 2}
                y="112"
                fill="#475569"
                fontSize="11"
                fontWeight="600"
                textAnchor="middle"
                fontFamily={i === 3 ? "'Noto Sans Devanagari', Georgia, serif" : SANS}
              >
                {p.sub}
              </text>
            </g>
          );
        })}
      </svg>
    </Panel>
  );
}

const SCHEMATICS: Partial<Record<VedicArticleFigureId, () => ReactNode>> = {
  'sulba-148-rectangle': SulbaRectangle,
  'dhanurveda-five-sthanas': DhanurvedaSthanas,
  'yuktibhasa-octant': YuktibhasaOctant,
  'grid-three-step-path': GridPath,
  'shaka-ce-offset': ShakaOffset,
  'coefficient-vector-156': CoefficientVector,
  'fluid-crosswise': FluidCrosswise,
  'tirtha-lineage-path': TirthaLineagePath,
  'bhuta-sankhya-reversal': BhutaReversal,
  'siksha-five-places': SikshaFivePlaces,
  'vedic-four-pillars': VedicFourPillars,
};

export default function ArticleSchematic({ id }: { id: VedicArticleFigureId }) {
  const Draw = SCHEMATICS[id];
  if (!Draw) return null;
  return <Draw />;
}
