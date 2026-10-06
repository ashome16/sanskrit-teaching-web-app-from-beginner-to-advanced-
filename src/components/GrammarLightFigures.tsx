import type { ReactNode } from 'react';
import '../styles/light-figures.css';

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


/** Article 2: five mouth zones from throat to lips. */
function MouthFiveZones() {
  const zones = [
    { n: '1', sa: 'कण्ठ्य', en: 'Velar', clue: 'क · ग · [k] [ɡ]' },
    { n: '2', sa: 'तालव्य', en: 'Palatal', clue: 'च · ज · [c] [ɟ]' },
    { n: '3', sa: 'मूर्धन्य', en: 'Retroflex', clue: 'ट · ड · [ʈ] [ɖ]' },
    { n: '4', sa: 'दन्त्य', en: 'Dental', clue: 'त · द · [t̪] [d̪]' },
    { n: '5', sa: 'ओष्ठ्य', en: 'Labial', clue: 'प · ब · [p] [b]' },
  ];
  const cellW = 112;
  const gap = 10;
  const w = zones.length * cellW + (zones.length - 1) * gap + 8;
  return (
    <Panel
      kicker="Five mouth zones"
      caption="The article’s throat-to-lips highway: velar, palatal, retroflex, dental, and labial — the same inside-to-outside order the IPA chart uses."
      maxWidth={640}
    >
      <svg viewBox={`0 0 ${w} 120`} role="img" aria-labelledby="mouth5-title" style={{ fontFamily: SANS }}>
        <title id="mouth5-title">Five articulation zones from throat to lips with sample Sanskrit and IPA stops.</title>
        {zones.map((z, i) => {
          const x = 4 + i * (cellW + gap);
          return (
            <g key={z.n}>
              {i > 0 && (
                <g>
                  <line x1={x - gap + 4} y1="56" x2={x - 8} y2="56" stroke="#0f766e" strokeWidth="3" strokeLinecap="round" />
                  <polygon points={`${x - 12},50 ${x - 12},62 ${x - 2},56`} fill="#0f766e" />
                </g>
              )}
              <rect x={x} y="8" width={cellW} height="100" rx="12" fill="#fff7ed" stroke="#86efac" strokeWidth="3" />
              <text x={x + cellW / 2} y="30" fill="#0f766e" fontSize="13" fontWeight="800" textAnchor="middle">{z.n}</text>
              <text x={x + cellW / 2} y="52" fill="#3a2414" fontSize="15" fontWeight="700" textAnchor="middle" fontFamily={DEV}>{z.sa}</text>
              <text x={x + cellW / 2} y="74" fill="#9a3412" fontSize="12" fontWeight="700" textAnchor="middle">{z.en}</text>
              <text x={x + cellW / 2} y="94" fill="#475569" fontSize="10" fontWeight="600" textAnchor="middle">{z.clue}</text>
            </g>
          );
        })}
      </svg>
    </Panel>
  );
}

/** Article 10: Bālaka masculine singular suffix series from the memory trick table. */
function BalakaSuffixStrip() {
  const items = [
    { n: '1', suf: '-अः', word: 'बालकः' },
    { n: '2', suf: '-अम्', word: 'बालकम्' },
    { n: '3', suf: '-एन', word: 'बालकेन' },
    { n: '4', suf: '-आय', word: 'बालकाय' },
    { n: '5', suf: '-आत्', word: 'बालकात्' },
    { n: '6', suf: '-स्य', word: 'बालकस्य' },
    { n: '7', suf: '-ए', word: 'बालके' },
    { n: '8', suf: 'हे … !', word: 'हे बालक!' },
  ];
  const cellW = 78;
  const gap = 8;
  const w = items.length * cellW + (items.length - 1) * gap + 8;
  return (
    <Panel
      kicker="Bālaka suffix series"
      caption="The article’s memory strip for masculine singular a-stems: -aḥ, -am, -ena, -āya, -āt, -asya, -e, and He … !"
      maxWidth={720}
    >
      <svg viewBox={`0 0 ${w} 110`} role="img" aria-labelledby="balaka-title" style={{ fontFamily: SANS }}>
        <title id="balaka-title">Eight singular suffixes for Bālaka across the eight vibhaktis.</title>
        {items.map((it, i) => {
          const x = 4 + i * (cellW + gap);
          return (
            <g key={it.n}>
              <rect x={x} y="8" width={cellW} height="90" rx="12" fill="#fff7ed" stroke="#fdba74" strokeWidth="3" />
              <text x={x + cellW / 2} y="30" fill="#0f766e" fontSize="12" fontWeight="800" textAnchor="middle">{it.n}</text>
              <text x={x + cellW / 2} y="56" fill="#9a3412" fontSize="14" fontWeight="700" textAnchor="middle" fontFamily={DEV}>{it.suf}</text>
              <text x={x + cellW / 2} y="82" fill="#3a2414" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily={DEV}>{it.word}</text>
            </g>
          );
        })}
      </svg>
    </Panel>
  );
}

/** Article 12: three roads Sanskrit words took into English. */
function EnglishThreeRoads() {
  const roads = [
    { n: '1', title: 'Ancient trade', clue: 'sugar · ginger · orange' },
    { n: '2', title: 'Colonial & scholarly', clue: 'jungle · shampoo · guru' },
    { n: '3', title: 'Spiritual wave', clue: 'yoga · karma · mantra' },
  ];
  const cellW = 170;
  const gap = 16;
  const w = roads.length * cellW + (roads.length - 1) * gap + 8;
  return (
    <Panel
      kicker="Three roads into English"
      caption="The article’s three routes: an older trade path, a colonial and scholarly wave, and a later spiritual vocabulary wave."
      maxWidth={600}
    >
      <svg viewBox={`0 0 ${w} 120`} role="img" aria-labelledby="roads-title" style={{ fontFamily: SANS }}>
        <title id="roads-title">Three routes by which Sanskrit words entered English.</title>
        {roads.map((r, i) => {
          const x = 4 + i * (cellW + gap);
          return (
            <g key={r.n}>
              {i > 0 && (
                <text x={x - gap / 2} y="62" fill="#0f766e" fontSize="18" fontWeight="800" textAnchor="middle">·</text>
              )}
              <rect x={x} y="12" width={cellW} height="92" rx="12" fill="#fff7ed" stroke="#38bdf8" strokeWidth="3" />
              <text x={x + cellW / 2} y="38" fill="#0f766e" fontSize="14" fontWeight="800" textAnchor="middle">Road {r.n}</text>
              <text x={x + cellW / 2} y="62" fill="#0369a1" fontSize="13" fontWeight="700" textAnchor="middle">{r.title}</text>
              <text x={x + cellW / 2} y="86" fill="#475569" fontSize="11" fontWeight="600" textAnchor="middle">{r.clue}</text>
            </g>
          );
        })}
      </svg>
    </Panel>
  );
}

/** Article 14: five limbs a Pañcāṅga tracks. */
function PanchangaFiveLimbs() {
  const limbs = [
    { n: '1', sa: 'तिथि', en: 'Tithi' },
    { n: '2', sa: 'वार', en: 'Vāra' },
    { n: '3', sa: 'नक्षत्र', en: 'Nakṣatra' },
    { n: '4', sa: 'योग', en: 'Yoga' },
    { n: '5', sa: 'करण', en: 'Karaṇa' },
  ];
  const cellW = 112;
  const gap = 10;
  const w = limbs.length * cellW + (limbs.length - 1) * gap + 8;
  return (
    <Panel
      kicker="Pañcāṅga · five limbs"
      caption="The article’s five cosmic variables: tithi, vāra, nakṣatra, yoga, and karaṇa."
      maxWidth={640}
    >
      <svg viewBox={`0 0 ${w} 100`} role="img" aria-labelledby="panca5-title" style={{ fontFamily: SANS }}>
        <title id="panca5-title">Five limbs of a Pañcāṅga almanac.</title>
        {limbs.map((L, i) => {
          const x = 4 + i * (cellW + gap);
          return (
            <g key={L.n}>
              <rect x={x} y="8" width={cellW} height="80" rx="12" fill="#fff7ed" stroke="#86efac" strokeWidth="3" />
              <text x={x + cellW / 2} y="32" fill="#0f766e" fontSize="13" fontWeight="800" textAnchor="middle">{L.n}</text>
              <text x={x + cellW / 2} y="56" fill="#14532d" fontSize="16" fontWeight="700" textAnchor="middle" fontFamily={DEV}>{L.sa}</text>
              <text x={x + cellW / 2} y="76" fill="#475569" fontSize="12" fontWeight="600" textAnchor="middle">{L.en}</text>
            </g>
          );
        })}
      </svg>
    </Panel>
  );
}

/** Article 15: thirteen decuple rungs from Eka to Parārdha. */
function DasagunottaraThirteenRungs() {
  const rungs = [
    { sa: 'एक', p: '10⁰' },
    { sa: 'दश', p: '10¹' },
    { sa: 'शत', p: '10²' },
    { sa: 'सहस्र', p: '10³' },
    { sa: 'अयुत', p: '10⁴' },
    { sa: 'नियुत', p: '10⁵' },
    { sa: 'प्रयुत', p: '10⁶' },
    { sa: 'अर्बुद', p: '10⁷' },
    { sa: 'न्यर्बुद', p: '10⁸' },
    { sa: 'समुद्र', p: '10⁹' },
    { sa: 'मध्य', p: '10¹⁰' },
    { sa: 'अन्त', p: '10¹¹' },
    { sa: 'परार्ध', p: '10¹²' },
  ];
  const cols = 7;
  const cellW = 88;
  const cellH = 58;
  const gap = 8;
  const rows = Math.ceil(rungs.length / cols);
  const w = cols * cellW + (cols - 1) * gap + 8;
  const h = rows * cellH + (rows - 1) * gap + 8;
  return (
    <Panel
      kicker="Daśaguṇottaram · thirteen rungs"
      caption="The article’s Vedic ladder: each named rank is ten times the one before it, from Eka (10⁰) to Parārdha (10¹²)."
      maxWidth={700}
    >
      <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-labelledby="rungs13-title" style={{ fontFamily: SANS }}>
        <title id="rungs13-title">Thirteen named powers of ten from Eka to Parārdha.</title>
        {rungs.map((r, i) => {
          const col = i % cols;
          const row = Math.floor(i / cols);
          const x = 4 + col * (cellW + gap);
          const y = 4 + row * (cellH + gap);
          return (
            <g key={r.sa}>
              <rect x={x} y={y} width={cellW} height={cellH} rx="12" fill="#fff7ed" stroke="#fdba74" strokeWidth="3" />
              <text x={x + cellW / 2} y={y + 24} fill="#3a2414" fontSize="13" fontWeight="700" textAnchor="middle" fontFamily={DEV}>{r.sa}</text>
              <text x={x + cellW / 2} y={y + 44} fill="#0f766e" fontSize="12" fontWeight="800" textAnchor="middle">{r.p}</text>
            </g>
          );
        })}
      </svg>
    </Panel>
  );
}

/** Article 16: Harappan brick length : width : thickness = 4 : 2 : 1. */
function HarappanBrickRatio() {
  const L = 240;
  const W = 120;
  const T = 60;
  const ox = 80;
  const oy = 48;
  return (
    <Panel
      kicker="Harappan brick · 4 : 2 : 1"
      caption="The article’s architectural proportion: length : width : thickness = 4 : 2 : 1 (for example 28 × 14 × 7 cm)."
      maxWidth={520}
    >
      <svg viewBox="0 0 480 240" role="img" aria-labelledby="brick-title" style={{ fontFamily: SANS }}>
        <title id="brick-title">A brick drawn in 4 to 2 to 1 proportions for length, width, and thickness.</title>
        {/* isometric-ish brick: front, top, side */}
        <polygon
          points={`${ox},${oy + T} ${ox + L},${oy + T} ${ox + L},${oy + T + W} ${ox},${oy + T + W}`}
          fill="#fff7ed"
          stroke="#fdba74"
          strokeWidth="3"
        />
        <polygon
          points={`${ox},${oy + T} ${ox + 40},${oy} ${ox + L + 40},${oy} ${ox + L},${oy + T}`}
          fill="#ffedd5"
          stroke="#fdba74"
          strokeWidth="3"
        />
        <polygon
          points={`${ox + L},${oy + T} ${ox + L + 40},${oy} ${ox + L + 40},${oy + W} ${ox + L},${oy + T + W}`}
          fill="#fed7aa"
          stroke="#fdba74"
          strokeWidth="3"
        />
        <text x={ox + L / 2} y={oy + T + W / 2 + 6} fill="#9a3412" fontSize="16" fontWeight="800" textAnchor="middle">4 · length</text>
        <text x={ox + L + 58} y={oy + T + W / 2} fill="#0f766e" fontSize="14" fontWeight="800" textAnchor="middle">2</text>
        <text x={ox + L + 58} y={oy + T + W / 2 + 18} fill="#0f766e" fontSize="12" fontWeight="700" textAnchor="middle">width</text>
        <text x={ox + L / 2 + 20} y={oy + 22} fill="#0369a1" fontSize="14" fontWeight="800" textAnchor="middle">1 · thickness</text>
      </svg>
    </Panel>
  );
}


/** Article 1: two parallel tracks named in the opening. */
function TwoParallelTracks() {
  const tracks = [
    { n: '1', title: 'Spiritual', sa: 'शब्द · मन्त्र', clue: 'precise chant · vibration' },
    { n: '2', title: 'Scientific', sa: 'स्थान · व्याकरण', clue: 'vocal map · structure' },
  ];
  const cellW = 200;
  const gap = 36;
  const w = tracks.length * cellW + (tracks.length - 1) * gap + 8;
  return (
    <Panel
      kicker="Two parallel tracks"
      caption="The article’s opening claim: Sanskrit evolved along a spiritual track and a scientific track that fuse mystical resonance with analytical precision."
      maxWidth={520}
    >
      <svg viewBox={`0 0 ${w} 130`} role="img" aria-labelledby="tracks2-title" style={{ fontFamily: SANS }}>
        <title id="tracks2-title">Two parallel tracks: spiritual purpose and scientific purpose.</title>
        {tracks.map((t, i) => {
          const x = 4 + i * (cellW + gap);
          return (
            <g key={t.n}>
              {i > 0 && (
                <g>
                  <line x1={x - gap + 6} y1="58" x2={x - 10} y2="58" stroke="#0f766e" strokeWidth="4" strokeLinecap="round" />
                  <text x={x - gap / 2} y="48" fill="#0f766e" fontSize="12" fontWeight="800" textAnchor="middle">+</text>
                </g>
              )}
              <rect x={x} y="12" width={cellW} height="100" rx="12" fill="#fff7ed" stroke={i === 0 ? '#fdba74' : '#86efac'} strokeWidth="4" />
              <text x={x + cellW / 2} y="38" fill="#0f766e" fontSize="14" fontWeight="800" textAnchor="middle">{t.n}</text>
              <text x={x + cellW / 2} y="62" fill="#9a3412" fontSize="16" fontWeight="800" textAnchor="middle">{t.title}</text>
              <text x={x + cellW / 2} y="84" fill="#3a2414" fontSize="14" fontWeight="700" textAnchor="middle" fontFamily={DEV}>{t.sa}</text>
              <text x={x + cellW / 2} y="104" fill="#475569" fontSize="11" fontWeight="600" textAnchor="middle">{t.clue}</text>
            </g>
          );
        })}
      </svg>
    </Panel>
  );
}

/** Article 17: three kāṇḍas of the Vākyapadīya. */
function VakyapadiyaThreeKandas() {
  const books = [
    { n: '1', sa: 'ब्रह्मकाण्ड', en: 'Brahmakāṇḍa', clue: 'metaphysics of speech' },
    { n: '2', sa: 'वाक्यकाण्ड', en: 'Vākyakāṇḍa', clue: 'sentence · indivisible meaning' },
    { n: '3', sa: 'पदकाण्ड', en: 'Padakāṇḍa', clue: 'words · relations · kārakas' },
  ];
  const cellW = 168;
  const gap = 12;
  const w = books.length * cellW + (books.length - 1) * gap + 8;
  return (
    <Panel
      kicker="Vākyapadīya · three kāṇḍas"
      caption="The article’s three books: Brahmakāṇḍa on the metaphysics of speech, Vākyakāṇḍa on the sentence and its indivisible meaning, and Padakāṇḍa on words, relations, and kārakas."
      maxWidth={600}
    >
      <svg viewBox={`0 0 ${w} 120`} role="img" aria-labelledby="kanda3-title" style={{ fontFamily: SANS }}>
        <title id="kanda3-title">Three kandas of Bhartrhari’s Vakyapadiya.</title>
        {books.map((b, i) => {
          const x = 4 + i * (cellW + gap);
          return (
            <g key={b.n}>
              <rect x={x} y="8" width={cellW} height="100" rx="12" fill="#fff7ed" stroke="#38bdf8" strokeWidth="3" />
              <text x={x + cellW / 2} y="32" fill="#0f766e" fontSize="13" fontWeight="800" textAnchor="middle">{b.n}</text>
              <text x={x + cellW / 2} y="56" fill="#3a2414" fontSize="15" fontWeight="700" textAnchor="middle" fontFamily={DEV}>{b.sa}</text>
              <text x={x + cellW / 2} y="78" fill="#0369a1" fontSize="12" fontWeight="700" textAnchor="middle">{b.en}</text>
              <text x={x + cellW / 2} y="98" fill="#475569" fontSize="10" fontWeight="600" textAnchor="middle">{b.clue}</text>
            </g>
          );
        })}
      </svg>
    </Panel>
  );
}

/** Course lesson 1: thirteen primary vowels by mātrā group. */
function ThirteenVowelsMatra() {
  const groups = [
    {
      title: 'Hrasva · 1 mātrā',
      stroke: '#86efac',
      items: ['अ', 'इ', 'उ', 'ऋ', 'ऌ'],
    },
    {
      title: 'Dīrgha · 2 mātrās',
      stroke: '#fdba74',
      items: ['आ', 'ई', 'ऊ', 'ॠ'],
    },
    {
      title: 'Samyukta · 2 mātrās',
      stroke: '#38bdf8',
      items: ['ए', 'ऐ', 'ओ', 'औ'],
    },
  ];
  const cellW = 188;
  const gap = 12;
  const w = groups.length * cellW + (groups.length - 1) * gap + 8;
  return (
    <Panel
      kicker="Thirteen vowels · by mātrā"
      caption="The lesson’s 13 primary vowels: five short (1 mātrā), four long (2 mātrās), and four diphthongs / compound vowels (also 2 mātrās)."
      maxWidth={640}
    >
      <svg viewBox={`0 0 ${w} 140`} role="img" aria-labelledby="vow13-title" style={{ fontFamily: SANS }}>
        <title id="vow13-title">Thirteen Sanskrit vowels grouped by duration.</title>
        {groups.map((g, i) => {
          const x = 4 + i * (cellW + gap);
          return (
            <g key={g.title}>
              <rect x={x} y="8" width={cellW} height="120" rx="12" fill="#fff7ed" stroke={g.stroke} strokeWidth="3" />
              <text x={x + cellW / 2} y="32" fill="#0f766e" fontSize="12" fontWeight="800" textAnchor="middle">{g.title}</text>
              <text x={x + cellW / 2} y="68" fill="#3a2414" fontSize="20" fontWeight="700" textAnchor="middle" fontFamily={DEV}>
                {g.items.join(' ')}
              </text>
              <text x={x + cellW / 2} y="104" fill="#475569" fontSize="12" fontWeight="700" textAnchor="middle">{g.items.length} sounds</text>
            </g>
          );
        })}
      </svg>
    </Panel>
  );
}

/** Course lesson 2: five varga families from the grouped-consonant table. */
function FiveVargaFamilies() {
  const vargas = [
    { n: '1', sa: 'क-वर्ग', en: 'Ka-varga', clue: 'क ख ग घ ङ' },
    { n: '2', sa: 'च-वर्ग', en: 'Ca-varga', clue: 'च छ ज झ ञ' },
    { n: '3', sa: 'ट-वर्ग', en: 'Ṭa-varga', clue: 'ट ठ ड ढ ण' },
    { n: '4', sa: 'त-वर्ग', en: 'Ta-varga', clue: 'त थ द ध न' },
    { n: '5', sa: 'प-वर्ग', en: 'Pa-varga', clue: 'प फ ब भ म' },
  ];
  const cellW = 112;
  const gap = 10;
  const w = vargas.length * cellW + (vargas.length - 1) * gap + 8;
  return (
    <Panel
      kicker="Five varga families"
      caption="The lesson’s 25 grouped consonants: five rows of five, each row a varga matching one articulation place from throat to lips."
      maxWidth={640}
    >
      <svg viewBox={`0 0 ${w} 120`} role="img" aria-labelledby="varga5-title" style={{ fontFamily: SANS }}>
        <title id="varga5-title">Five Sanskrit varga consonant families.</title>
        {vargas.map((v, i) => {
          const x = 4 + i * (cellW + gap);
          return (
            <g key={v.n}>
              <rect x={x} y="8" width={cellW} height="100" rx="12" fill="#fff7ed" stroke="#fdba74" strokeWidth="3" />
              <text x={x + cellW / 2} y="30" fill="#0f766e" fontSize="13" fontWeight="800" textAnchor="middle">{v.n}</text>
              <text x={x + cellW / 2} y="52" fill="#3a2414" fontSize="15" fontWeight="700" textAnchor="middle" fontFamily={DEV}>{v.sa}</text>
              <text x={x + cellW / 2} y="74" fill="#9a3412" fontSize="12" fontWeight="700" textAnchor="middle">{v.en}</text>
              <text x={x + cellW / 2} y="96" fill="#475569" fontSize="10" fontWeight="600" textAnchor="middle" fontFamily={DEV}>{v.clue}</text>
            </g>
          );
        })}
      </svg>
    </Panel>
  );
}

/** Course lesson 3: Subanta and Tiṅanta as the two pada pillars. */
function TwoPadaPillars() {
  const pillars = [
    { n: '1', sa: 'सुबन्त', en: 'Subanta', clue: 'nouns · pronouns · adjectives' },
    { n: '2', sa: 'तिङन्त', en: 'Tiṅanta', clue: 'verbs · tense · person · number' },
  ];
  const cellW = 210;
  const gap = 40;
  const w = pillars.length * cellW + (pillars.length - 1) * gap + 8;
  return (
    <Panel
      kicker="Two pillars of Pada"
      caption="The lesson’s rule: every finished word (pada) is either Subanta (nominal, with case endings) or Tiṅanta (verbal, with conjugational endings)."
      maxWidth={560}
    >
      <svg viewBox={`0 0 ${w} 130`} role="img" aria-labelledby="pada2-title" style={{ fontFamily: SANS }}>
        <title id="pada2-title">Two pillars of Sanskrit words: Subanta and Tinanta.</title>
        {pillars.map((p, i) => {
          const x = 4 + i * (cellW + gap);
          return (
            <g key={p.n}>
              {i > 0 && (
                <text x={x - gap / 2} y="68" fill="#0f766e" fontSize="18" fontWeight="800" textAnchor="middle">or</text>
              )}
              <rect x={x} y="12" width={cellW} height="100" rx="12" fill="#fff7ed" stroke={i === 0 ? '#fdba74' : '#86efac'} strokeWidth="4" />
              <text x={x + cellW / 2} y="38" fill="#0f766e" fontSize="14" fontWeight="800" textAnchor="middle">{p.n}</text>
              <text x={x + cellW / 2} y="62" fill="#3a2414" fontSize="18" fontWeight="700" textAnchor="middle" fontFamily={DEV}>{p.sa}</text>
              <text x={x + cellW / 2} y="84" fill="#9a3412" fontSize="13" fontWeight="700" textAnchor="middle">{p.en}</text>
              <text x={x + cellW / 2} y="104" fill="#475569" fontSize="11" fontWeight="600" textAnchor="middle">{p.clue}</text>
            </g>
          );
        })}
      </svg>
    </Panel>
  );
}

/** Course lesson 7: nine Laṭ endings across person × number. */
function LatNineEndings() {
  const headers = ['Person', 'एक · 1', 'द्वि · 2', 'बहु · 3+'];
  const rows = [
    { g: 'प्रथम · 3rd', e1: '-ति', e2: '-तः', e3: '-अन्ति' },
    { g: 'मध्यम · 2nd', e1: '-सि', e2: '-थः', e3: '-थ' },
    { g: 'उत्तम · 1st', e1: '-मि', e2: '-वः', e3: '-मः' },
  ];
  const colW = [140, 90, 90, 90];
  const xOf = (c: number) => 4 + colW.slice(0, c).reduce((a, b) => a + b, 0);
  const w = colW.reduce((a, b) => a + b, 0) + 8;
  const rowH = 44;
  const h = (rows.length + 1) * rowH + 8;
  return (
    <Panel
      kicker="Laṭ · nine endings"
      caption="The lesson’s 3×3 Laṭ grid: Prathama, Madhyama, and Uttama across singular, dual, and plural — ti-taḥ-anti / si-thaḥ-tha / mi-vaḥ-maḥ."
      maxWidth={560}
    >
      <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-labelledby="lat9-title" style={{ fontFamily: SANS }}>
        <title id="lat9-title">Nine present-tense verb endings for Lat lakara.</title>
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


/** Course lesson 4: eight cases × three numbers = 24 forms. */
function EightByThreeVacanas() {
  const nums = [
    { n: '1', sa: 'एकवचनम्', en: 'Ekavacana', clue: 'exactly one' },
    { n: '2', sa: 'द्विवचनम्', en: 'Dvivacana', clue: 'exactly two' },
    { n: '3', sa: 'बहुवचनम्', en: 'Bahuvacana', clue: 'three or more' },
  ];
  const cellW = 168;
  const gap = 12;
  const w = nums.length * cellW + (nums.length - 1) * gap + 8;
  return (
    <Panel
      kicker="8 cases × 3 numbers"
      caption="The lesson’s grid: eight vibhaktis across singular, dual, and plural give 24 distinct forms for every declined noun."
      maxWidth={600}
    >
      <svg viewBox={`0 0 ${w} 148`} role="img" aria-labelledby="vac3-title" style={{ fontFamily: SANS }}>
        <title id="vac3-title">Three grammatical numbers: singular, dual, and plural.</title>
        {nums.map((v, i) => {
          const x = 4 + i * (cellW + gap);
          return (
            <g key={v.n}>
              <rect x={x} y="8" width={cellW} height="100" rx="12" fill="#fff7ed" stroke="#fdba74" strokeWidth="3" />
              <text x={x + cellW / 2} y="32" fill="#0f766e" fontSize="13" fontWeight="800" textAnchor="middle">{v.n}</text>
              <text x={x + cellW / 2} y="56" fill="#3a2414" fontSize="15" fontWeight="700" textAnchor="middle" fontFamily={DEV}>{v.sa}</text>
              <text x={x + cellW / 2} y="78" fill="#9a3412" fontSize="12" fontWeight="700" textAnchor="middle">{v.en}</text>
              <text x={x + cellW / 2} y="98" fill="#475569" fontSize="11" fontWeight="600" textAnchor="middle">{v.clue}</text>
            </g>
          );
        })}
        <text x={w / 2} y="138" fill="#0f766e" fontSize="13" fontWeight="800" textAnchor="middle">8 vibhaktis × 3 vacanas = 24 forms</text>
      </svg>
    </Panel>
  );
}

/** Course lesson 5: dual column collapses to three endings. */
function BalakaDualThreeEndings() {
  const groups = [
    { cases: '1 & 2', ending: '-ौ', example: 'बालकौ' },
    { cases: '3, 4 & 5', ending: '-आभ्याम्', example: 'बालकाभ्याम्' },
    { cases: '6 & 7', ending: '-योः', example: 'बालकयोः' },
  ];
  const cellW = 168;
  const gap = 12;
  const w = groups.length * cellW + (groups.length - 1) * gap + 8;
  return (
    <Panel
      kicker="Dual column · three endings"
      caption="The lesson’s memory hack: the dual (dvivacana) column for bālaka uses only three distinct endings across the eight cases."
      maxWidth={600}
    >
      <svg viewBox={`0 0 ${w} 120`} role="img" aria-labelledby="dual3-title" style={{ fontFamily: SANS }}>
        <title id="dual3-title">Three dual endings for akaraanta masculine nouns.</title>
        {groups.map((g, i) => {
          const x = 4 + i * (cellW + gap);
          return (
            <g key={g.cases}>
              <rect x={x} y="8" width={cellW} height="100" rx="12" fill="#fff7ed" stroke="#86efac" strokeWidth="3" />
              <text x={x + cellW / 2} y="30" fill="#0f766e" fontSize="12" fontWeight="800" textAnchor="middle">Cases {g.cases}</text>
              <text x={x + cellW / 2} y="56" fill="#14532d" fontSize="18" fontWeight="800" textAnchor="middle" fontFamily={DEV}>{g.ending}</text>
              <text x={x + cellW / 2} y="86" fill="#3a2414" fontSize="14" fontWeight="700" textAnchor="middle" fontFamily={DEV}>{g.example}</text>
            </g>
          );
        })}
      </svg>
    </Panel>
  );
}

/** Course lesson 6: two common feminine stem patterns. */
function TwoFeminineStems() {
  const stems = [
    { n: '1', sa: 'आकारान्त', en: 'Ākārānta', clue: 'long ā · e.g. latā' },
    { n: '2', sa: 'ईकारान्त', en: 'Īkārānta', clue: 'long ī · e.g. nadī' },
  ];
  const cellW = 210;
  const gap = 40;
  const w = stems.length * cellW + (stems.length - 1) * gap + 8;
  return (
    <Panel
      kicker="Two feminine patterns"
      caption="The lesson’s two most common strīliṅga stems: Ākārānta (long ā, e.g. latā) and Īkārānta (long ī, e.g. nadī)."
      maxWidth={560}
    >
      <svg viewBox={`0 0 ${w} 130`} role="img" aria-labelledby="stri2-title" style={{ fontFamily: SANS }}>
        <title id="stri2-title">Two feminine noun patterns: akaranta and ikaranta.</title>
        {stems.map((s, i) => {
          const x = 4 + i * (cellW + gap);
          return (
            <g key={s.n}>
              {i > 0 && (
                <text x={x - gap / 2} y="68" fill="#0f766e" fontSize="18" fontWeight="800" textAnchor="middle">and</text>
              )}
              <rect x={x} y="12" width={cellW} height="100" rx="12" fill="#fff7ed" stroke={i === 0 ? '#fdba74' : '#38bdf8'} strokeWidth="4" />
              <text x={x + cellW / 2} y="38" fill="#0f766e" fontSize="14" fontWeight="800" textAnchor="middle">{s.n}</text>
              <text x={x + cellW / 2} y="62" fill="#3a2414" fontSize="18" fontWeight="700" textAnchor="middle" fontFamily={DEV}>{s.sa}</text>
              <text x={x + cellW / 2} y="84" fill="#9a3412" fontSize="13" fontWeight="700" textAnchor="middle">{s.en}</text>
              <text x={x + cellW / 2} y="104" fill="#475569" fontSize="11" fontWeight="600" textAnchor="middle">{s.clue}</text>
            </g>
          );
        })}
      </svg>
    </Panel>
  );
}

/** Course lesson 8: three puruṣas in Sanskrit order. */
function ThreePurusaOrder() {
  const persons = [
    { n: '1', sa: 'प्रथमः', en: 'Prathama', clue: 'he / she / it · Eng. 3rd' },
    { n: '2', sa: 'मध्यमः', en: 'Madhyama', clue: 'you · Eng. 2nd' },
    { n: '3', sa: 'उत्तमः', en: 'Uttama', clue: 'I / we · Eng. 1st' },
  ];
  const cellW = 168;
  const gap = 12;
  const w = persons.length * cellW + (persons.length - 1) * gap + 8;
  return (
    <Panel
      kicker="Three puruṣas · Sanskrit order"
      caption="The lesson’s person order: outer world first (Prathama), then the listener (Madhyama), then the speaker (Uttama) — the reverse of English 1st–2nd–3rd."
      maxWidth={600}
    >
      <svg viewBox={`0 0 ${w} 120`} role="img" aria-labelledby="pur3-title" style={{ fontFamily: SANS }}>
        <title id="pur3-title">Three grammatical persons in Sanskrit order.</title>
        {persons.map((p, i) => {
          const x = 4 + i * (cellW + gap);
          const stroke = i === 0 ? '#fdba74' : i === 1 ? '#86efac' : '#38bdf8';
          return (
            <g key={p.n}>
              <rect x={x} y="8" width={cellW} height="100" rx="12" fill="#fff7ed" stroke={stroke} strokeWidth="3" />
              <text x={x + cellW / 2} y="30" fill="#0f766e" fontSize="13" fontWeight="800" textAnchor="middle">{p.n}</text>
              <text x={x + cellW / 2} y="54" fill="#3a2414" fontSize="16" fontWeight="700" textAnchor="middle" fontFamily={DEV}>{p.sa}</text>
              <text x={x + cellW / 2} y="76" fill="#9a3412" fontSize="12" fontWeight="700" textAnchor="middle">{p.en}</text>
              <text x={x + cellW / 2} y="96" fill="#475569" fontSize="10" fontWeight="600" textAnchor="middle">{p.clue}</text>
            </g>
          );
        })}
      </svg>
    </Panel>
  );
}

/** Course lesson 9: two golden rules of Kartari syntax. */
function KartariTwoGoldenRules() {
  const rules = [
    { n: '1', sa: 'प्रथमा', en: 'Subject = Case 1', clue: 'Kartā in Prathamā' },
    { n: '2', sa: 'क्रिया', en: 'Verb matches', clue: 'person + number' },
  ];
  const cellW = 210;
  const gap = 40;
  const w = rules.length * cellW + (rules.length - 1) * gap + 8;
  return (
    <Panel
      kicker="Kartari · two golden rules"
      caption="The lesson’s active-voice syntax: the doer stays in Prathamā, and the verb agrees with that subject in person and number — gender does not change the present-tense verb."
      maxWidth={560}
    >
      <svg viewBox={`0 0 ${w} 130`} role="img" aria-labelledby="kart2-title" style={{ fontFamily: SANS }}>
        <title id="kart2-title">Two golden rules of Kartari Prayoga.</title>
        {rules.map((r, i) => {
          const x = 4 + i * (cellW + gap);
          return (
            <g key={r.n}>
              {i > 0 && (
                <text x={x - gap / 2} y="68" fill="#0f766e" fontSize="18" fontWeight="800" textAnchor="middle">+</text>
              )}
              <rect x={x} y="12" width={cellW} height="100" rx="12" fill="#fff7ed" stroke={i === 0 ? '#fdba74' : '#86efac'} strokeWidth="4" />
              <text x={x + cellW / 2} y="38" fill="#0f766e" fontSize="14" fontWeight="800" textAnchor="middle">Rule {r.n}</text>
              <text x={x + cellW / 2} y="62" fill="#3a2414" fontSize="18" fontWeight="700" textAnchor="middle" fontFamily={DEV}>{r.sa}</text>
              <text x={x + cellW / 2} y="84" fill="#9a3412" fontSize="13" fontWeight="700" textAnchor="middle">{r.en}</text>
              <text x={x + cellW / 2} y="104" fill="#475569" fontSize="11" fontWeight="600" textAnchor="middle">{r.clue}</text>
            </g>
          );
        })}
      </svg>
    </Panel>
  );
}

/** Course lesson 10: Avyaya remains unchanged across gender, case, number. */
function AvyayaUnchanging() {
  const axes = [
    { sa: 'लिङ्ग', en: '3 genders', clue: 'identical' },
    { sa: 'विभक्ति', en: '7 cases', clue: 'identical' },
    { sa: 'वचन', en: '3 numbers', clue: 'identical' },
  ];
  const cellW = 148;
  const gap = 12;
  const w = axes.length * cellW + (axes.length - 1) * gap + 8;
  return (
    <Panel
      kicker="Avyaya · never changes"
      caption="The lesson’s definition: an Avyaya stays the same across all three genders, all seven cases, and all three numbers — e.g. atra, ca, api, na."
      maxWidth={560}
    >
      <svg viewBox={`0 0 ${w} 148`} role="img" aria-labelledby="avy3-title" style={{ fontFamily: SANS }}>
        <title id="avy3-title">Avyaya stays identical across gender, case, and number.</title>
        {axes.map((a, i) => {
          const x = 4 + i * (cellW + gap);
          const stroke = i === 0 ? '#fdba74' : i === 1 ? '#86efac' : '#38bdf8';
          return (
            <g key={a.en}>
              <rect x={x} y="8" width={cellW} height="100" rx="12" fill="#fff7ed" stroke={stroke} strokeWidth="3" />
              <text x={x + cellW / 2} y="36" fill="#3a2414" fontSize="16" fontWeight="700" textAnchor="middle" fontFamily={DEV}>{a.sa}</text>
              <text x={x + cellW / 2} y="62" fill="#9a3412" fontSize="13" fontWeight="700" textAnchor="middle">{a.en}</text>
              <text x={x + cellW / 2} y="90" fill="#0f766e" fontSize="12" fontWeight="800" textAnchor="middle">{a.clue}</text>
            </g>
          );
        })}
        <text x={w / 2} y="138" fill="#475569" fontSize="12" fontWeight="700" textAnchor="middle" fontFamily={DEV}>अत्र · च · अपि · न …</text>
      </svg>
    </Panel>
  );
}


/** Dhātupāṭha intro: five Upadeśa pillars. */
function FiveUpadesasPillars() {
  const pillars = [
    { sa: 'सूत्र', en: 'Sūtra', clue: 'engine' },
    { sa: 'धातु', en: 'Dhātu', clue: 'roots' },
    { sa: 'गण', en: 'Gaṇa', clue: 'groups' },
    { sa: 'उणादि', en: 'Uṇādi', clue: 'nouns' },
    { sa: 'लिङ्ग', en: 'Liṅga', clue: 'gender' },
  ];
  const cellW = 100;
  const gap = 10;
  const w = pillars.length * cellW + (pillars.length - 1) * gap + 8;
  return (
    <Panel
      kicker="Five Upadeśas"
      caption="The article’s five foundational texts: Sūtrapāṭha, Dhātupāṭha, Gaṇapāṭha, Uṇādipāṭha, and Liṅgānuśāsana — without the root catalog, the Aṣṭādhyāyī cannot fire."
      maxWidth={640}
    >
      <svg viewBox={`0 0 ${w} 120`} role="img" aria-labelledby="upa5-title" style={{ fontFamily: SANS }}>
        <title id="upa5-title">Five Pāṇinian Upadeśa pillars.</title>
        {pillars.map((p, i) => {
          const x = 4 + i * (cellW + gap);
          const stroke = ['#fdba74', '#86efac', '#38bdf8', '#c4b5fd', '#f9a8d4'][i];
          return (
            <g key={p.en}>
              <rect x={x} y="8" width={cellW} height="100" rx="12" fill="#fff7ed" stroke={stroke} strokeWidth="3" />
              <text x={x + cellW / 2} y="30" fill="#0f766e" fontSize="12" fontWeight="800" textAnchor="middle">{i + 1}</text>
              <text x={x + cellW / 2} y="54" fill="#3a2414" fontSize="16" fontWeight="700" textAnchor="middle" fontFamily={DEV}>{p.sa}</text>
              <text x={x + cellW / 2} y="76" fill="#9a3412" fontSize="12" fontWeight="700" textAnchor="middle">{p.en}</text>
              <text x={x + cellW / 2} y="96" fill="#475569" fontSize="11" fontWeight="600" textAnchor="middle">{p.clue}</text>
            </g>
          );
        })}
      </svg>
    </Panel>
  );
}

/** Dhātupāṭha 10 Gaṇas: compact vikaraṇa map. */
function VikaranaTenMap() {
  const rows = [
    [
      { n: '1', sa: 'भ्वादि', v: 'शप्' },
      { n: '2', sa: 'अदादि', v: 'लुक्' },
      { n: '3', sa: 'जुहोत्यादि', v: 'श्लु' },
      { n: '4', sa: 'दिवादि', v: 'श्यन्' },
      { n: '5', sa: 'स्वादि', v: 'श्नु' },
    ],
    [
      { n: '6', sa: 'तुदादि', v: 'श' },
      { n: '7', sa: 'रुधादि', v: 'श्नम्' },
      { n: '8', sa: 'तनादि', v: 'उ' },
      { n: '9', sa: 'क्र्यादि', v: 'श्ना' },
      { n: '10', sa: 'चुरादि', v: 'णिच्' },
    ],
  ];
  const cellW = 112;
  const cellH = 72;
  const gap = 10;
  const cols = 5;
  const w = cols * cellW + (cols - 1) * gap + 8;
  const h = 2 * cellH + gap + 8;
  return (
    <Panel
      kicker="Ten Gaṇas · vikaraṇa"
      caption="Each workshop’s conjugational marker from the article: theme vowel, zero, reduplication, -ya-, -nu-, nasal infix, -nā-, or causative ṇic."
      maxWidth={640}
    >
      <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-labelledby="vik10-title" style={{ fontFamily: SANS }}>
        <title id="vik10-title">Ten Gaṇa classes with their Vikaraṇa markers.</title>
        {rows.flatMap((row, ri) =>
          row.map((c, ci) => {
            const x = 4 + ci * (cellW + gap);
            const y = 4 + ri * (cellH + gap);
            const stroke = ri === 0 ? '#fdba74' : '#86efac';
            return (
              <g key={c.n}>
                <rect x={x} y={y} width={cellW} height={cellH} rx="12" fill="#fff7ed" stroke={stroke} strokeWidth="3" />
                <text x={x + 12} y={y + 22} fill="#0f766e" fontSize="12" fontWeight="800">{c.n}</text>
                <text x={x + cellW / 2} y={y + 40} fill="#3a2414" fontSize="13" fontWeight="700" textAnchor="middle" fontFamily={DEV}>{c.sa}</text>
                <text x={x + cellW / 2} y={y + 60} fill="#9a3412" fontSize="12" fontWeight="700" textAnchor="middle" fontFamily={DEV}>{c.v}</text>
              </g>
            );
          })
        )}
      </svg>
    </Panel>
  );
}

/** Pada-vyavasthā: three verbal voices. */
function ThreeVerbalVoices() {
  const voices = [
    { sa: 'परस्मैपदम्', en: 'Parasmaipada', clue: 'fruit → another' },
    { sa: 'आत्मनेपदम्', en: 'Ātmanepada', clue: 'fruit → self' },
    { sa: 'उभयपदम्', en: 'Ubhayapada', clue: 'both voices' },
  ];
  const cellW = 168;
  const gap = 14;
  const w = voices.length * cellW + (voices.length - 1) * gap + 8;
  return (
    <Panel
      kicker="Three verbal voices"
      caption="The article’s padā distinction: action-fruit directed outward, returned to the agent, or available in both voices for poetic nuance."
      maxWidth={600}
    >
      <svg viewBox={`0 0 ${w} 120`} role="img" aria-labelledby="pada3-title" style={{ fontFamily: SANS }}>
        <title id="pada3-title">Parasmaipada, Ātmanepada, and Ubhayapada.</title>
        {voices.map((v, i) => {
          const x = 4 + i * (cellW + gap);
          const stroke = i === 0 ? '#fdba74' : i === 1 ? '#86efac' : '#38bdf8';
          return (
            <g key={v.en}>
              <rect x={x} y="8" width={cellW} height="100" rx="12" fill="#fff7ed" stroke={stroke} strokeWidth="3" />
              <text x={x + cellW / 2} y="36" fill="#3a2414" fontSize="15" fontWeight="700" textAnchor="middle" fontFamily={DEV}>{v.sa}</text>
              <text x={x + cellW / 2} y="60" fill="#9a3412" fontSize="12" fontWeight="700" textAnchor="middle">{v.en}</text>
              <text x={x + cellW / 2} y="88" fill="#475569" fontSize="12" fontWeight="600" textAnchor="middle">{v.clue}</text>
            </g>
          );
        })}
      </svg>
    </Panel>
  );
}

/** Five school Lakāras. */
function FiveCoreLakaras() {
  const lakaras = [
    { sa: 'लट्', en: 'Present', clue: '-ति' },
    { sa: 'लृट्', en: 'Future', clue: '-ष्य-' },
    { sa: 'लङ्', en: 'Past', clue: 'अ- …' },
    { sa: 'लोट्', en: 'Imperative', clue: '-तु' },
    { sa: 'विधिलिङ्', en: 'Potential', clue: '-एत्' },
  ];
  const cellW = 108;
  const gap = 10;
  const w = lakaras.length * cellW + (lakaras.length - 1) * gap + 8;
  return (
    <Panel
      kicker="Five school Lakāras"
      caption="CBSE/NCERT core set from the article: Laṭ, Lṛṭ, Laṅ, Loṭ, and Vidhiliṅ — with the exam thumb-rules for spotting each."
      maxWidth={640}
    >
      <svg viewBox={`0 0 ${w} 120`} role="img" aria-labelledby="lak5-title" style={{ fontFamily: SANS }}>
        <title id="lak5-title">Five core school Lakāras with identifying markers.</title>
        {lakaras.map((l, i) => {
          const x = 4 + i * (cellW + gap);
          const stroke = ['#fdba74', '#86efac', '#38bdf8', '#c4b5fd', '#f9a8d4'][i];
          return (
            <g key={l.sa}>
              <rect x={x} y="8" width={cellW} height="100" rx="12" fill="#fff7ed" stroke={stroke} strokeWidth="3" />
              <text x={x + cellW / 2} y="34" fill="#3a2414" fontSize="18" fontWeight="700" textAnchor="middle" fontFamily={DEV}>{l.sa}</text>
              <text x={x + cellW / 2} y="58" fill="#9a3412" fontSize="12" fontWeight="700" textAnchor="middle">{l.en}</text>
              <text x={x + cellW / 2} y="86" fill="#0f766e" fontSize="13" fontWeight="800" textAnchor="middle" fontFamily={DEV}>{l.clue}</text>
            </g>
          );
        })}
      </svg>
    </Panel>
  );
}

/** Kṛt golden fork: ktvā vs lyap. */
function KtvaLyapFork() {
  return (
    <Panel
      kicker="क्त्वा vs ल्यप्"
      caption="The article’s golden rule: bare root → क्त्वा (-tvā); root with an upasarga (other than nañ) → ल्यप् (-ya)."
      maxWidth={560}
    >
      <svg viewBox="0 0 520 168" role="img" aria-labelledby="ktva-title" style={{ fontFamily: SANS }}>
        <title id="ktva-title">Ktvā for bare roots; Lyap when a prefix is present.</title>
        <rect x="170" y="8" width="180" height="48" rx="12" fill="#ecfdf5" stroke="#86efac" strokeWidth="3" />
        <text x="260" y="38" fill="#14532d" fontSize="14" fontWeight="800" textAnchor="middle">Prior action · same agent</text>
        <line x1="260" y1="56" x2="260" y2="78" stroke="#0f766e" strokeWidth="3" />
        <line x1="120" y1="78" x2="400" y2="78" stroke="#0f766e" strokeWidth="3" />
        <line x1="120" y1="78" x2="120" y2="92" stroke="#0f766e" strokeWidth="3" />
        <line x1="400" y1="78" x2="400" y2="92" stroke="#0f766e" strokeWidth="3" />
        <rect x="24" y="92" width="192" height="64" rx="12" fill="#fff7ed" stroke="#fdba74" strokeWidth="3" />
        <text x="120" y="116" fill="#9a3412" fontSize="13" fontWeight="800" textAnchor="middle">No prefix</text>
        <text x="120" y="140" fill="#3a2414" fontSize="16" fontWeight="700" textAnchor="middle" fontFamily={DEV}>क्त्वा · गत्वा</text>
        <rect x="304" y="92" width="192" height="64" rx="12" fill="#fff7ed" stroke="#38bdf8" strokeWidth="3" />
        <text x="400" y="116" fill="#0369a1" fontSize="13" fontWeight="800" textAnchor="middle">With upasarga</text>
        <text x="400" y="140" fill="#3a2414" fontSize="16" fontWeight="700" textAnchor="middle" fontFamily={DEV}>ल्यप् · आगत्य</text>
      </svg>
    </Panel>
  );
}

/** Guṇa–Vṛddhi ternary vowel scale. */
function ThreeVowelGrades() {
  const grades = [
    { sa: 'मूल', en: 'Base', clue: 'इ उ ऋ', ex: 'i · u · ṛ' },
    { sa: 'गुण', en: 'Guṇa', clue: 'ए ओ अर्', ex: 'e · o · ar' },
    { sa: 'वृद्धि', en: 'Vṛddhi', clue: 'ऐ औ आर्', ex: 'ai · au · ār' },
  ];
  const cellW = 160;
  const gap = 36;
  const w = grades.length * cellW + (grades.length - 1) * gap + 8;
  return (
    <Panel
      kicker="Three vowel grades"
      caption="The article’s ternary scale: base vowels strengthen to Guṇa (a/e/o) and further to Vṛddhi (ā/ai/au) before strong suffixes."
      maxWidth={600}
    >
      <svg viewBox={`0 0 ${w} 130`} role="img" aria-labelledby="guna3-title" style={{ fontFamily: SANS }}>
        <title id="guna3-title">Base, Guṇa, and Vṛddhi vowel grades.</title>
        {grades.map((g, i) => {
          const x = 4 + i * (cellW + gap);
          const stroke = i === 0 ? '#fdba74' : i === 1 ? '#86efac' : '#38bdf8';
          return (
            <g key={g.en}>
              {i > 0 && (
                <text x={x - gap / 2} y="68" fill="#0f766e" fontSize="20" fontWeight="800" textAnchor="middle">→</text>
              )}
              <rect x={x} y="12" width={cellW} height="100" rx="12" fill="#fff7ed" stroke={stroke} strokeWidth="4" />
              <text x={x + cellW / 2} y="38" fill="#3a2414" fontSize="18" fontWeight="700" textAnchor="middle" fontFamily={DEV}>{g.sa}</text>
              <text x={x + cellW / 2} y="60" fill="#9a3412" fontSize="13" fontWeight="700" textAnchor="middle">{g.en}</text>
              <text x={x + cellW / 2} y="86" fill="#0f766e" fontSize="13" fontWeight="700" textAnchor="middle" fontFamily={DEV}>{g.clue}</text>
            </g>
          );
        })}
      </svg>
    </Panel>
  );
}


/* ------------------------------------------------------------------
   Batch: CBSE guide, Darśana essays, Saṃskṛta-cintanam lessons.
   ------------------------------------------------------------------ */

/** Shared manuscript paper backdrop (palm-leaf / paper tone, double rule). */
function ManuscriptPaper({ id, w, h }: { id: string; w: number; h: number }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-paper`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbf1dc" />
          <stop offset="60%" stopColor="#f6e6c4" />
          <stop offset="100%" stopColor="#efd9ac" />
        </linearGradient>
        <pattern id={`${id}-laid`} width="6" height="6" patternUnits="userSpaceOnUse">
          <path d="M0 5.5 H6" stroke="#b8894e" strokeWidth="0.35" opacity="0.22" />
        </pattern>
      </defs>
      <rect x="0" y="0" width={w} height={h} rx="10" fill={`url(#${id}-paper)`} />
      <rect x="0" y="0" width={w} height={h} rx="10" fill={`url(#${id}-laid)`} />
      <rect x="8" y="8" width={w - 16} height={h - 16} rx="6" fill="none" stroke="#4a2e18" strokeWidth="1.8" />
      <rect x="13" y="13" width={w - 26} height={h - 26} rx="4" fill="none" stroke="#4a2e18" strokeWidth="0.6" />
    </>
  );
}

/** CBSE Exam Guide: 80-mark paper and 180-minute clock, split by खण्ड. */
function CbseBlueprintBars() {
  const left = 20;
  const span = 560;
  const sections = [
    { sa: 'खण्ड क', en: 'Unseen', marks: 10, min: 20, stroke: '#fdba74', fill: '#fff7ed' },
    { sa: 'खण्ड ख', en: 'Writing', marks: 15, min: 35, stroke: '#86efac', fill: '#f0fdf4' },
    { sa: 'खण्ड ग', en: 'Grammar', marks: 25, min: 40, stroke: '#38bdf8', fill: '#f0f9ff' },
    { sa: 'खण्ड घ', en: 'Literature', marks: 30, min: 55, stroke: '#c4b5fd', fill: '#f5f3ff' },
  ];
  const markX: number[] = [];
  const minX: number[] = [];
  let mAcc = 0;
  let tAcc = 0;
  sections.forEach((s) => {
    markX.push(left + (mAcc / 80) * span);
    minX.push(left + (tAcc / 180) * span);
    mAcc += s.marks;
    tAcc += s.min;
  });
  const reviewX = left + (tAcc / 180) * span;
  return (
    <Panel
      kicker="Class 10 paper · marks and minutes"
      caption="The blueprint table as two bars: 80 marks across the four खण्ड, and 150 writing minutes plus the 30-minute review the guide recommends — 3 hours in all."
      maxWidth={640}
    >
      <svg viewBox="0 0 600 224" role="img" aria-labelledby="cbse-bp-title" style={{ fontFamily: SANS }}>
        <title id="cbse-bp-title">Marks 10, 15, 25, 30 and minutes 20, 35, 40, 55 plus 30 review for sections ka to gha.</title>
        <text x={left} y="18" fill="#0f766e" fontSize="12" fontWeight="800">MARKS · 80</text>
        {sections.map((s, i) => {
          const x = markX[i];
          const w = (s.marks / 80) * span;
          return (
            <g key={`m-${s.sa}`}>
              <rect x={x + 2} y="26" width={w - 4} height="72" rx="10" fill={s.fill} stroke={s.stroke} strokeWidth="3" />
              <text x={x + w / 2} y="50" fill="#3a2414" fontSize="14" fontWeight="700" textAnchor="middle" fontFamily={DEV}>{s.sa}</text>
              <text x={x + w / 2} y="68" fill="#475569" fontSize="11" fontWeight="600" textAnchor="middle">{s.en}</text>
              <text x={x + w / 2} y="89" fill="#9a3412" fontSize="14" fontWeight="800" textAnchor="middle">{s.marks}</text>
            </g>
          );
        })}
        <text x={left} y="128" fill="#0f766e" fontSize="12" fontWeight="800">MINUTES · 180</text>
        {sections.map((s, i) => {
          const x = minX[i];
          const w = (s.min / 180) * span;
          return (
            <g key={`t-${s.sa}`}>
              <rect x={x + 2} y="136" width={w - 4} height="52" rx="10" fill={s.fill} stroke={s.stroke} strokeWidth="3" />
              <text x={x + w / 2} y="160" fill="#3a2414" fontSize="13" fontWeight="700" textAnchor="middle" fontFamily={DEV}>{s.sa.replace('खण्ड ', '')}</text>
              <text x={x + w / 2} y="178" fill="#9a3412" fontSize="12" fontWeight="800" textAnchor="middle">{s.min} min</text>
            </g>
          );
        })}
        <rect x={reviewX + 2} y="136" width={(30 / 180) * span - 4} height="52" rx="10" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2.5" strokeDasharray="6 4" />
        <text x={reviewX + ((30 / 180) * span) / 2} y="160" fill="#475569" fontSize="12" fontWeight="700" textAnchor="middle">review</text>
        <text x={reviewX + ((30 / 180) * span) / 2} y="178" fill="#475569" fontSize="12" fontWeight="800" textAnchor="middle">30 min</text>
        <text x="300" y="214" fill="#64748b" fontSize="11" fontWeight="600" textAnchor="middle">+ 20-mark internal assessment, outside the 3-hour paper</text>
      </svg>
    </Panel>
  );
}

/** Ṣaḍ-darśana: the six schools in their three traditional pairs. */
function ShadDarshanaThreePairs() {
  const pairs = [
    {
      role: 'logic + ontology',
      a: { sa: 'न्यायः', en: 'Nyāya', q: 'How do we know?' },
      b: { sa: 'वैशेषिकः', en: 'Vaiśeṣika', q: 'What exists?' },
    },
    {
      role: 'psychology + practice',
      a: { sa: 'साङ्ख्यम्', en: 'Sāṅkhya', q: 'What is experience made of?' },
      b: { sa: 'योगः', en: 'Yoga', q: 'How do we verify it directly?' },
    },
    {
      role: 'interpretation + synthesis',
      a: { sa: 'मीमांसा', en: 'Mīmāṃsā', q: 'What does the text enjoin?' },
      b: { sa: 'वेदान्तः', en: 'Vedānta', q: 'What is the ultimate ground?' },
    },
  ];
  const colW = 190;
  const gap = 14;
  const x0 = 26;
  const W = x0 * 2 + pairs.length * colW + (pairs.length - 1) * gap;
  const H = 306;
  const ink = '#3a2414';
  return (
    <Panel
      kicker="षड्दर्शनानि · three pairs"
      caption="The article’s traditional pairing — Nyāya with Vaiśeṣika, Sāṅkhya with Yoga, Mīmāṃsā with Vedānta — each school with its central question from the comparison table."
      maxWidth={640}
    >
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="shad3-title" style={{ fontFamily: SANS }}>
        <title id="shad3-title">Six darśanas grouped in three pairs, each with its central question.</title>
        <ManuscriptPaper id="shad3" w={W} h={H} />
        <text x={W / 2} y="42" fill={ink} fontSize="20" fontWeight="700" textAnchor="middle" fontFamily={DEV}>षड्दर्शनानि</text>
        {pairs.map((p, i) => {
          const x = x0 + i * (colW + gap);
          const card = (c: { sa: string; en: string; q: string }, y: number) => (
            <g>
              <rect x={x + 8} y={y} width={colW - 16} height="78" rx="10" fill="#fffaf0" stroke="#7c4a24" strokeWidth="1.6" />
              <text x={x + colW / 2} y={y + 26} fill={ink} fontSize="16" fontWeight="700" textAnchor="middle" fontFamily={DEV}>{c.sa}</text>
              <text x={x + colW / 2} y={y + 45} fill="#9a3412" fontSize="12" fontWeight="700" textAnchor="middle">{c.en}</text>
              <text x={x + colW / 2} y={y + 65} fill="#5c3b22" fontSize="11" fontWeight="600" textAnchor="middle" fontStyle="italic">{c.q}</text>
            </g>
          );
          return (
            <g key={p.role}>
              <rect x={x} y="58" width={colW} height="210" rx="12" fill="none" stroke="#7c4a24" strokeWidth="1.2" strokeDasharray="5 4" />
              {card(p.a, 68)}
              <text x={x + colW / 2} y="164" fill="#0f766e" fontSize="16" fontWeight="800" textAnchor="middle">+</text>
              {card(p.b, 172)}
              <text x={x + colW / 2} y="284" fill="#5c3b22" fontSize="11" fontWeight="700" textAnchor="middle">{p.role}</text>
            </g>
          );
        })}
      </svg>
    </Panel>
  );
}

/** Medhā essay: five kośas of the Taittirīya Upaniṣad, nested. */
function PanchaKosaSheaths() {
  const layers = [
    { sa: 'अन्नमयः', en: 'annamaya · body of food' },
    { sa: 'प्राणमयः', en: 'prāṇamaya · vital breath' },
    { sa: 'मनोमयः', en: 'manomaya · mind' },
    { sa: 'विज्ञानमयः', en: 'vijñānamaya · discerning intellect' },
    { sa: 'आनन्दमयः', en: 'ānandamaya · bliss' },
  ];
  const W = 540;
  const H = 380;
  const fills = ['#f8ead0', '#f5e3c2', '#f2dcb4', '#efd5a7', '#ecce9b'];
  return (
    <Panel
      kicker="पञ्च कोशाः · five sheaths"
      caption="The five sheaths as the essay lists them, outermost to innermost. The ātman is drawn in the middle, but the essay’s point is that it pervades every layer without being any of them."
      maxWidth={600}
    >
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="kosa5-title" style={{ fontFamily: SANS }}>
        <title id="kosa5-title">Five nested sheaths from food body to bliss, with the ātman pervading all.</title>
        <ManuscriptPaper id="kosa5" w={W} h={H} />
        {layers.map((l, i) => {
          const x = 26 + i * 30;
          const y = 24 + i * 28;
          const w = W - 52 - i * 60;
          const h = H - 48 - i * 56;
          return (
            <g key={l.sa}>
              <rect x={x} y={y} width={w} height={h} rx={22 - i * 2} fill={fills[i]} stroke="#7c4a24" strokeWidth={i === 0 ? 2 : 1.4} />
              <text x={W / 2} y={y + 21} textAnchor="middle">
                <tspan fill="#3a2414" fontSize="15" fontWeight="700" fontFamily={DEV}>{l.sa}</tspan>
                <tspan fill="#5c3b22" fontSize="11" fontWeight="600" dx="8">{l.en}</tspan>
              </text>
            </g>
          );
        })}
        <ellipse cx={W / 2} cy="205" rx="104" ry="27" fill="#fffaf0" stroke="#b45309" strokeWidth="1.6" strokeDasharray="4 3" />
        <text x={W / 2} y="203" fill="#3a2414" fontSize="17" fontWeight="700" textAnchor="middle" fontFamily={DEV}>आत्मन्</text>
        <text x={W / 2} y="220" fill="#9a3412" fontSize="10.5" fontWeight="700" textAnchor="middle">ātman · in all, none of them</text>
      </svg>
    </Panel>
  );
}

/** Course 3.4: six kārakas as roles around the action. */
function KarakaActionHub() {
  const left = [
    { sa: 'कर्ता', en: 'Agent', q: 'Who?', ex: 'रामः' },
    { sa: 'कर्म', en: 'Object', q: 'Whom / what?', ex: 'रामम्' },
    { sa: 'करण', en: 'Instrument', q: 'With what?', ex: 'रामेण' },
  ];
  const right = [
    { sa: 'सम्प्रदान', en: 'Recipient', q: 'For whom?', ex: 'रामाय' },
    { sa: 'अपादान', en: 'Source', q: 'From where?', ex: 'रामात्' },
    { sa: 'अधिकरण', en: 'Location', q: 'Where?', ex: 'रामे' },
  ];
  const cardW = 168;
  const cardH = 66;
  const ys = [16, 122, 228];
  const cx = 290;
  const cy = 159;
  const strokes = ['#fdba74', '#86efac', '#38bdf8', '#c4b5fd', '#f9a8d4', '#fcd34d'];
  const card = (c: (typeof left)[number], x: number, y: number, stroke: string, n: number) => (
    <g key={c.sa}>
      <rect x={x} y={y} width={cardW} height={cardH} rx="12" fill="#fff7ed" stroke={stroke} strokeWidth="3" />
      <text x={x + 12} y={y + 25} fill="#0f766e" fontSize="12" fontWeight="800">{n}</text>
      <text x={x + 28} y={y + 26} fill="#3a2414" fontSize="15" fontWeight="700" fontFamily={DEV}>{c.sa}</text>
      <text x={x + cardW - 12} y={y + 26} fill="#3a2414" fontSize="14" fontWeight="700" textAnchor="end" fontFamily={DEV}>{c.ex}</text>
      <text x={x + 12} y={y + 50} fill="#9a3412" fontSize="11.5" fontWeight="700">{c.en}<tspan fill="#475569" fontWeight="600">{` · ${c.q}`}</tspan></text>
    </g>
  );
  return (
    <Panel
      kicker="Six kārakas · roles around the action"
      caption="Lesson 3.4’s map: each kāraka is a role around the action, and its case ending carries the role — so the words can move around and the meaning holds. षष्ठी (relation) and सम्बोधनम् (address) sit outside the six."
      maxWidth={640}
    >
      <svg viewBox="0 0 580 318" role="img" aria-labelledby="karaka6-title" style={{ fontFamily: SANS }}>
        <title id="karaka6-title">The action in the centre with six kāraka roles around it, each with its question and a Rāma example.</title>
        {ys.map((y, i) => (
          <g key={`l-${y}`}>
            <line x1={8 + cardW} y1={y + cardH / 2} x2={cx - 74} y2={cy} stroke="#0f766e" strokeWidth="2.5" strokeLinecap="round" />
            <line x1={580 - 8 - cardW} y1={y + cardH / 2} x2={cx + 74} y2={cy} stroke="#0f766e" strokeWidth="2.5" strokeLinecap="round" />
            {card(left[i], 8, y, strokes[i], i + 1)}
            {card(right[i], 580 - 8 - cardW, y, strokes[i + 3], i + 4)}
          </g>
        ))}
        <ellipse cx={cx} cy={cy} rx="76" ry="38" fill="#ecfdf5" stroke="#0f766e" strokeWidth="3" />
        <text x={cx} y={cy - 3} fill="#14532d" fontSize="18" fontWeight="700" textAnchor="middle" fontFamily={DEV}>क्रिया</text>
        <text x={cx} y={cy + 17} fill="#0f766e" fontSize="12" fontWeight="800" textAnchor="middle">the action</text>
      </svg>
    </Panel>
  );
}

/** Course 3.6: which member of a samāsa carries the weight. */
function SamasaHeadDominance() {
  const types = [
    { sa: 'अव्ययीभावः', en: 'Avyayībhāva', a: 'यथा', b: 'शक्ति', lead: 'a', note: 'first word leads' },
    { sa: 'तत्पुरुषः', en: 'Tatpuruṣa', a: 'राज', b: 'पुरुषः', lead: 'b', note: 'second word leads' },
    { sa: 'द्वन्द्वः', en: 'Dvandva', a: 'माता', b: 'पितरौ', lead: 'both', note: 'both equal · “and”' },
    { sa: 'बहुव्रीहिः', en: 'Bahuvrīhi', a: 'पीत', b: 'अम्बरः', lead: 'out', note: 'points outside · Viṣṇu' },
  ];
  const cardW = 282;
  const cardH = 132;
  const gap = 12;
  const lead = { fill: '#ccfbf1', stroke: '#0f766e', w: 3.5 };
  const plain = { fill: '#ffffff', stroke: '#fdba74', w: 2.5 };
  return (
    <Panel
      kicker="Samāsa · who carries the weight?"
      caption="Lesson 3.6’s four main types, sorted by the dominant member: the first word, the second, both equally, or someone outside the compound altogether. Teal = the word in charge."
      maxWidth={640}
    >
      <svg viewBox={`0 0 ${cardW * 2 + gap + 8} ${cardH * 2 + gap + 8}`} role="img" aria-labelledby="samasa4-title" style={{ fontFamily: SANS }}>
        <title id="samasa4-title">Four samāsa types with the dominant member highlighted.</title>
        {types.map((t, i) => {
          const x = 4 + (i % 2) * (cardW + gap);
          const y = 4 + Math.floor(i / 2) * (cardH + gap);
          const out = t.lead === 'out';
          const boxW = out ? 70 : 96;
          const ax = out ? x + 12 : x + cardW / 2 - boxW - 6;
          const bx = ax + boxW + 12;
          const sa = t.lead === 'a' || t.lead === 'both' ? lead : plain;
          const sb = t.lead === 'b' || t.lead === 'both' ? lead : plain;
          return (
            <g key={t.en}>
              <rect x={x} y={y} width={cardW} height={cardH} rx="12" fill="#fff7ed" stroke="#fdba74" strokeWidth="2" />
              <text x={x + 14} y={y + 26} fill="#3a2414" fontSize="15" fontWeight="700" fontFamily={DEV}>{t.sa}</text>
              <text x={x + cardW - 14} y={y + 25} fill="#9a3412" fontSize="12" fontWeight="700" textAnchor="end">{t.en}</text>
              <rect x={ax} y={y + 44} width={boxW} height="42" rx="10" fill={sa.fill} stroke={sa.stroke} strokeWidth={sa.w} />
              <text x={ax + boxW / 2} y={y + 71} fill="#3a2414" fontSize="16" fontWeight="700" textAnchor="middle" fontFamily={DEV}>{t.a}</text>
              <text x={ax + boxW + 6} y={y + 70} fill="#64748b" fontSize="13" fontWeight="800" textAnchor="middle">+</text>
              <rect x={bx} y={y + 44} width={boxW} height="42" rx="10" fill={sb.fill} stroke={sb.stroke} strokeWidth={sb.w} />
              <text x={bx + boxW / 2} y={y + 71} fill="#3a2414" fontSize="16" fontWeight="700" textAnchor="middle" fontFamily={DEV}>{t.b}</text>
              {out && (
                <g>
                  <line x1={bx + boxW + 4} y1={y + 65} x2={bx + boxW + 22} y2={y + 65} stroke="#0f766e" strokeWidth="2.5" />
                  <path d={`M${bx + boxW + 22} ${y + 59} L${bx + boxW + 30} ${y + 65} L${bx + boxW + 22} ${y + 71} Z`} fill="#0f766e" />
                  <rect x={bx + boxW + 32} y={y + 44} width="72" height="42" rx="10" fill={lead.fill} stroke={lead.stroke} strokeWidth={lead.w} strokeDasharray="5 3" />
                  <text x={bx + boxW + 68} y={y + 71} fill="#3a2414" fontSize="15" fontWeight="700" textAnchor="middle" fontFamily={DEV}>विष्णुः</text>
                </g>
              )}
              <text x={x + cardW / 2} y={y + 114} fill="#0f766e" fontSize="12" fontWeight="800" textAnchor="middle">{t.note}</text>
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
  'mouth-five-zones': () => <MouthFiveZones />,
  'balaka-suffix-strip': () => <BalakaSuffixStrip />,
  'english-three-roads': () => <EnglishThreeRoads />,
  'panchanga-five-limbs': () => <PanchangaFiveLimbs />,
  'dasagunottara-thirteen-rungs': () => <DasagunottaraThirteenRungs />,
  'harappan-brick-ratio': () => <HarappanBrickRatio />,
  'two-parallel-tracks': () => <TwoParallelTracks />,
  'vakyapadiya-three-kandas': () => <VakyapadiyaThreeKandas />,
  'thirteen-vowels-matra': () => <ThirteenVowelsMatra />,
  'five-varga-families': () => <FiveVargaFamilies />,
  'two-pada-pillars': () => <TwoPadaPillars />,
  'lat-nine-endings': () => <LatNineEndings />,
  'eight-by-three-vacanas': () => <EightByThreeVacanas />,
  'balaka-dual-three-endings': () => <BalakaDualThreeEndings />,
  'two-feminine-stems': () => <TwoFeminineStems />,
  'three-purusa-order': () => <ThreePurusaOrder />,
  'kartari-two-golden-rules': () => <KartariTwoGoldenRules />,
  'avyaya-unchanging': () => <AvyayaUnchanging />,
  'five-upadesas-pillars': () => <FiveUpadesasPillars />,
  'vikarana-ten-map': () => <VikaranaTenMap />,
  'three-verbal-voices': () => <ThreeVerbalVoices />,
  'five-core-lakaras': () => <FiveCoreLakaras />,
  'ktva-lyap-fork': () => <KtvaLyapFork />,
  'three-vowel-grades': () => <ThreeVowelGrades />,
  'cbse-blueprint-bars': () => <CbseBlueprintBars />,
  'shad-darshana-three-pairs': () => <ShadDarshanaThreePairs />,
  'pancha-kosa-sheaths': () => <PanchaKosaSheaths />,
  'karaka-action-hub': () => <KarakaActionHub />,
  'samasa-head-dominance': () => <SamasaHeadDominance />,
};

export function isGrammarLightFigure(id: string): boolean {
  return id in FIGURES;
}

export default function GrammarLightFigure({ id }: { id: string }) {
  const render = FIGURES[id];
  return render ? <>{render()}</> : null;
}
