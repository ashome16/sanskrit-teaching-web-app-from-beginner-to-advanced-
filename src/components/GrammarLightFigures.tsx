import type { ReactNode } from 'react';

const SANS = "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
const DEV = "'Noto Sans Devanagari', Georgia, serif";

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

/** Article 4: eight vibhaktis as listed in the case matrix. */
function VibhaktiEightCases() {
  const cases = [
    { n: '1', sa: 'प्रथमा', en: 'Nominative', clue: 'Kartā · doer' },
    { n: '2', sa: 'द्वितीया', en: 'Accusative', clue: 'Karma · object' },
    { n: '3', sa: 'तृतीया', en: 'Instrumental', clue: 'Karaṇa · by/with' },
    { n: '4', sa: 'चतुर्थी', en: 'Dative', clue: 'Sampradāna · to/for' },
    { n: '5', sa: 'पञ्चमी', en: 'Ablative', clue: 'Apādāna · from' },
    { n: '6', sa: 'षष्ठी', en: 'Genitive', clue: 'of / ’s · not a kāraka' },
    { n: '7', sa: 'सप्तमी', en: 'Locative', clue: 'Adhikaraṇa · in/on/at' },
    { n: '8', sa: 'सम्बोधन', en: 'Vocative', clue: 'address · not a kāraka' },
  ];
  const cols = 4;
  const cellW = 148;
  const cellH = 88;
  const gapX = 12;
  const gapY = 12;
  const rows = Math.ceil(cases.length / cols);
  const w = cols * cellW + (cols - 1) * gapX + 8;
  const h = rows * cellH + (rows - 1) * gapY + 8;
  return (
    <Panel
      kicker="Eight vibhaktis"
      caption="The article’s case matrix: six kāraka roles plus genitive and vocative, which the text says are not kārakas."
      maxWidth={640}
    >
      <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-labelledby="vib8-title" style={{ fontFamily: SANS }}>
        <title id="vib8-title">Eight Sanskrit case endings with English names and simple clues from the article.</title>
        {cases.map((c, i) => {
          const col = i % cols;
          const row = Math.floor(i / cols);
          const x = 4 + col * (cellW + gapX);
          const y = 4 + row * (cellH + gapY);
          return (
            <g key={c.n}>
              <rect x={x} y={y} width={cellW} height={cellH} rx="12" fill="#fff7ed" stroke="#fdba74" strokeWidth="3" />
              <text x={x + 14} y={y + 24} fill="#0f766e" fontSize="14" fontWeight="800">{c.n}</text>
              <text x={x + 36} y={y + 24} fill="#3a2414" fontSize="15" fontWeight="700" fontFamily={DEV}>{c.sa}</text>
              <text x={x + 14} y={y + 48} fill="#9a3412" fontSize="12" fontWeight="700">{c.en}</text>
              <text x={x + 14} y={y + 70} fill="#475569" fontSize="11" fontWeight="600">{c.clue}</text>
            </g>
          );
        })}
      </svg>
    </Panel>
  );
}

/** Article 5: ten Gaṇas named in the Daśagaṇāḥ table. */
function DasaganaTenClasses() {
  const ganas = [
    'भ्वादि', 'अदादि', 'जुहोत्यादि', 'दिवादि', 'स्वादि',
    'तुदादि', 'रुधादि', 'तनादि', 'क्र्यादि', 'चुरादि',
  ];
  const en = [
    'Bhvādi', 'Adādi', 'Juhotyādi', 'Divādi', 'Svādi',
    'Tudādi', 'Rudhādi', 'Tanādi', 'Kryādi', 'Curādi',
  ];
  const cols = 5;
  const cellW = 112;
  const cellH = 64;
  const gap = 10;
  const w = cols * cellW + (cols - 1) * gap + 8;
  const h = 2 * cellH + gap + 8;
  return (
    <Panel
      kicker="Daśagaṇāḥ · ten classes"
      caption="Pāṇini’s ten root classes from the article table, each named for the first root in its group."
      maxWidth={640}
    >
      <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-labelledby="gana10-title" style={{ fontFamily: SANS }}>
        <title id="gana10-title">Ten Dhātu Gaṇas: Bhvadi through Curadi.</title>
        {ganas.map((sa, i) => {
          const col = i % cols;
          const row = Math.floor(i / cols);
          const x = 4 + col * (cellW + gap);
          const y = 4 + row * (cellH + gap);
          return (
            <g key={sa}>
              <rect x={x} y={y} width={cellW} height={cellH} rx="12" fill="#fff7ed" stroke="#86efac" strokeWidth="3" />
              <text x={x + cellW / 2} y={y + 22} fill="#0f766e" fontSize="12" fontWeight="800" textAnchor="middle">{i + 1}</text>
              <text x={x + cellW / 2} y={y + 40} fill="#14532d" fontSize="14" fontWeight="700" textAnchor="middle" fontFamily={DEV}>{sa}</text>
              <text x={x + cellW / 2} y={y + 56} fill="#475569" fontSize="11" fontWeight="600" textAnchor="middle">{en[i]}</text>
            </g>
          );
        })}
      </svg>
    </Panel>
  );
}

/** Article 7: Upsarg + base + Pratyaya as the article’s front-and-tail model. */
function UpsargPratyayaBlocks() {
  return (
    <Panel
      kicker="Word outfits"
      caption="Upsarg attaches at the front; Pratyaya at the end. The article’s own Sanskrit example: Pra + Haar → Prahaar."
      maxWidth={560}
    >
      <svg viewBox="0 0 520 160" role="img" aria-labelledby="up-title" style={{ fontFamily: SANS }}>
        <title id="up-title">Upsarg, base word, and Pratyaya snap together.</title>
        <rect x="16" y="40" width="120" height="64" rx="12" fill="#fff7ed" stroke="#fdba74" strokeWidth="4" />
        <text x="76" y="68" fill="#9a3412" fontSize="14" fontWeight="800" textAnchor="middle">Upsarg</text>
        <text x="76" y="88" fill="#3a2414" fontSize="13" fontWeight="700" textAnchor="middle" fontFamily={DEV}>प्र</text>
        <text x="148" y="76" fill="#0f766e" fontSize="22" fontWeight="800">+</text>
        <rect x="168" y="40" width="140" height="64" rx="12" fill="#fff7ed" stroke="#86efac" strokeWidth="4" />
        <text x="238" y="68" fill="#14532d" fontSize="14" fontWeight="800" textAnchor="middle">Base</text>
        <text x="238" y="88" fill="#3a2414" fontSize="13" fontWeight="700" textAnchor="middle">Haar</text>
        <text x="320" y="76" fill="#0f766e" fontSize="22" fontWeight="800">+</text>
        <rect x="340" y="40" width="120" height="64" rx="12" fill="#fff7ed" stroke="#38bdf8" strokeWidth="4" />
        <text x="400" y="68" fill="#0369a1" fontSize="14" fontWeight="800" textAnchor="middle">Pratyaya</text>
        <text x="400" y="88" fill="#475569" fontSize="12" fontWeight="600" textAnchor="middle">tail tag</text>
        <text x="260" y="140" fill="#0f766e" fontSize="15" fontWeight="700" textAnchor="middle">→ Prahaar (an attack)</text>
      </svg>
    </Panel>
  );
}

/** Article 8: symbols named in the article headings. */
function SanskritSymbolsStrip() {
  const marks = [
    { glyph: '।', name: 'Eka-daṇḍa' },
    { glyph: '॥', name: 'Dvi-daṇḍa' },
    { glyph: 'ऽ', name: 'Avagraha' },
    { glyph: 'ं', name: 'Anusvāra' },
    { glyph: 'ः', name: 'Visarga' },
    { glyph: '्', name: 'Halanta' },
    { glyph: 'ँ', name: 'Chandrabindu' },
    { glyph: 'ॐ', name: 'Oṅkāra' },
  ];
  const cellW = 70;
  const gap = 8;
  const w = marks.length * cellW + (marks.length - 1) * gap + 8;
  return (
    <Panel
      kicker="Script marks"
      caption="The eight marks the article walks through before the mātrā tables: staff pauses, elision, nasal signs, virāma, and Om."
      maxWidth={640}
    >
      <svg viewBox={`0 0 ${w} 110`} role="img" aria-labelledby="sym-title" style={{ fontFamily: SANS }}>
        <title id="sym-title">Sanskrit punctuation and modifier symbols from the article.</title>
        {marks.map((m, i) => {
          const x = 4 + i * (cellW + gap);
          return (
            <g key={m.name}>
              <rect x={x} y="8" width={cellW} height="88" rx="12" fill="#fff7ed" stroke="#d6d3d1" strokeWidth="3" />
              <text x={x + cellW / 2} y="48" fill="#3a2414" fontSize="28" fontWeight="700" textAnchor="middle" fontFamily={DEV}>{m.glyph}</text>
              <text x={x + cellW / 2} y="78" fill="#475569" fontSize="9" fontWeight="700" textAnchor="middle">{m.name}</text>
            </g>
          );
        })}
      </svg>
    </Panel>
  );
}

/** Article 9: quick ending formula from the Master Matrix section. */
function LingaVachanaGrid() {
  const rows = [
    { g: 'पुं · Masculine', e1: '-अः', e2: '-औ', e3: '-आः' },
    { g: 'स्त्री · Feminine', e1: '-आ', e2: '-ए', e3: '-आः' },
    { g: 'नपुं · Neuter', e1: '-अम्', e2: '-ए', e3: '-आनि' },
  ];
  const headers = ['Gender', 'एक · 1', 'द्वि · 2', 'बहु · 3+'];
  const colW = [150, 90, 90, 90];
  const xOf = (c: number) => 4 + colW.slice(0, c).reduce((a, b) => a + b, 0);
  const w = colW.reduce((a, b) => a + b, 0) + 8;
  const rowH = 44;
  const h = (rows.length + 1) * rowH + 8;
  return (
    <Panel
      kicker="Gender × number endings"
      caption="The article’s quick formula: masculine -अः/-औ/-आः, feminine -आ/-ए/-आः, neuter -अम्/-ए/-आनि."
      maxWidth={560}
    >
      <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-labelledby="lv-title" style={{ fontFamily: SANS }}>
        <title id="lv-title">Three genders across singular, dual, and plural endings.</title>
        {headers.map((hlabel, c) => (
          <g key={hlabel}>
            <rect x={xOf(c)} y="4" width={colW[c]} height={rowH} fill="#ecfdf5" stroke="#86efac" strokeWidth="2" />
            <text x={xOf(c) + colW[c] / 2} y="32" fill="#0f766e" fontSize="13" fontWeight="800" textAnchor="middle">{hlabel}</text>
          </g>
        ))}
        {rows.map((r, ri) => {
          const y = 4 + (ri + 1) * rowH;
          const cells = [r.g, r.e1, r.e2, r.e3];
          return cells.map((cell, c) => (
            <g key={`${ri}-${c}`}>
              <rect x={xOf(c)} y={y} width={colW[c]} height={rowH} fill="#fff7ed" stroke="#fdba74" strokeWidth="2" />
              <text
                x={xOf(c) + colW[c] / 2}
                y={y + 28}
                fill="#3a2414"
                fontSize={c === 0 ? 12 : 16}
                fontWeight="700"
                textAnchor="middle"
                fontFamily={c === 0 ? SANS : DEV}
              >
                {cell}
              </text>
            </g>
          ));
        })}
      </svg>
    </Panel>
  );
}

/** Article 13: four learning phases named in the roadmap. */
function BeginnerRoadmapPhases() {
  const phases = [
    { n: '1', title: 'Sounds & script', sa: 'अक्षर · स्थान' },
    { n: '2', title: 'Using the language', sa: 'भाषाप्रयोगः' },
    { n: '3', title: 'Stories', sa: 'कथापठनम्' },
    { n: '4', title: 'Classics', sa: 'शास्त्रपाठः' },
  ];
  const cellW = 120;
  const gap = 28;
  const w = phases.length * cellW + (phases.length - 1) * gap + 8;
  return (
    <Panel
      kicker="Four phases"
      caption="The article’s learning sequence: sound and script, then language use, then stories, then classics."
      maxWidth={640}
    >
      <svg viewBox={`0 0 ${w} 120`} role="img" aria-labelledby="road-title" style={{ fontFamily: SANS }}>
        <title id="road-title">Beginner roadmap in four phases from the article.</title>
        {phases.map((p, i) => {
          const x = 4 + i * (cellW + gap);
          return (
            <g key={p.n}>
              {i > 0 && (
                <g>
                  <line x1={x - gap + 4} y1="52" x2={x - 8} y2="52" stroke="#0f766e" strokeWidth="4" strokeLinecap="round" />
                  <polygon points={`${x - 12},46 ${x - 12},58 ${x - 2},52`} fill="#0f766e" />
                </g>
              )}
              <rect x={x} y="16" width={cellW} height="84" rx="12" fill="#fff7ed" stroke="#86efac" strokeWidth="4" />
              <text x={x + cellW / 2} y="40" fill="#0f766e" fontSize="14" fontWeight="800" textAnchor="middle">{p.n}</text>
              <text x={x + cellW / 2} y="62" fill="#14532d" fontSize="12" fontWeight="700" textAnchor="middle">{p.title}</text>
              <text x={x + cellW / 2} y="84" fill="#3a2414" fontSize="13" fontWeight="700" textAnchor="middle" fontFamily={DEV}>{p.sa}</text>
            </g>
          );
        })}
      </svg>
    </Panel>
  );
}

const FIGURES: Record<string, () => ReactNode> = {
  'vibhakti-eight-cases': () => <VibhaktiEightCases />,
  'dasagana-ten-classes': () => <DasaganaTenClasses />,
  'upsarg-pratyaya-blocks': () => <UpsargPratyayaBlocks />,
  'sanskrit-symbols-strip': () => <SanskritSymbolsStrip />,
  'linga-vachana-grid': () => <LingaVachanaGrid />,
  'beginner-roadmap-phases': () => <BeginnerRoadmapPhases />,
};

export function isGrammarLightFigure(id: string): boolean {
  return id in FIGURES;
}

export default function GrammarLightFigure({ id }: { id: string }) {
  const render = FIGURES[id];
  return render ? <>{render()}</> : null;
}
