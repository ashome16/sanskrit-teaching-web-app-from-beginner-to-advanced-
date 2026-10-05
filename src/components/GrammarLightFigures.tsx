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
};

export function isGrammarLightFigure(id: string): boolean {
  return id in FIGURES;
}

export default function GrammarLightFigure({ id }: { id: string }) {
  const render = FIGURES[id];
  return render ? <>{render()}</> : null;
}
