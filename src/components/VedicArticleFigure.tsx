import type { MouseEvent, ReactNode } from 'react';
import type { VedicArticleFigureId } from '../data/vedicMaths';

/** Diagrams for Vedic Maths articles: clean HTML/SVG (no ASCII art, no math library needed). */
const Sup = ({ children }: { children: ReactNode }) => <sup>{children}</sup>;

const ThreePhases = () => (
  <div className="vaf-phases" role="list">
    <div className="vaf-phase" role="listitem">
      <div className="vaf-phase-tag">1 · Rhetorical</div>
      <div className="vaf-phase-who">Egypt · Babylon</div>
      <div className="vaf-phase-eg">“A quantity and its seventh, added together, become nineteen.”</div>
      <div className="vaf-phase-src">Rhind Papyrus, Problem 24 (c. 1550 BCE)</div>
    </div>
    <div className="vaf-phase" role="listitem">
      <div className="vaf-phase-tag">2 · Syncopated</div>
      <div className="vaf-phase-who">Diophantus · Brahmagupta · Bhāskara II</div>
      <div className="vaf-phase-eg vaf-mono">yā 2 kā 3 rū 5</div>
      <div className="vaf-phase-src">yā = yāvat-tāvat, kā = kālaka, rū = rūpa (known number): 2x + 3y + 5</div>
    </div>
    <div className="vaf-phase" role="listitem">
      <div className="vaf-phase-tag">3 · Symbolic</div>
      <div className="vaf-phase-who">Viète (1591) · Descartes (1637)</div>
      <div className="vaf-phase-eg vaf-math">
        x + <span className="vaf-frac"><span>x</span><span>7</span></span> = 19 ⇒ x = 16⅝
      </div>
      <div className="vaf-phase-src">The same Rhind problem, in modern symbols</div>
    </div>
  </div>
);

const AdditiveVsPositional = () => (
  <div className="vaf-table-wrap">
    <table className="vaf-table">
      <caption>Additive vs positional: the same multiplication, 12 × 13 = 156</caption>
      <thead>
        <tr>
          <th scope="col">System</th>
          <th scope="col">12</th>
          <th scope="col">13</th>
          <th scope="col">12 × 13</th>
          <th scope="col">Structure</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Roman (additive)</th>
          <td className="vaf-mono">XII</td>
          <td className="vaf-mono">XIII</td>
          <td className="vaf-mono">CLVI</td>
          <td>Symbols just add up; no pattern leads from XII × XIII to CLVI.</td>
        </tr>
        <tr>
          <th scope="row">Indian decimal place value (Hindu–Arabic)</th>
          <td className="vaf-math">1·10 + 2</td>
          <td className="vaf-math">1·10 + 3</td>
          <td className="vaf-math">1·10<Sup>2</Sup> + 5·10 + 6</td>
          <td>Digits sit on a predictable place-value grid of powers of 10.</td>
        </tr>
      </tbody>
    </table>
  </div>
);

const PlaceValue156 = () => (
  <figure className="vaf-figure">
    <div className="vaf-slots">
      {[
        { d: '1', p: '2', w: 'śata · hundreds' },
        { d: '5', p: '1', w: 'daśa · tens' },
        { d: '6', p: '0', w: 'eka · units' },
      ].map((s) => (
        <div className="vaf-slot" key={s.p}>
          <div className="vaf-slot-digit">{s.d}</div>
          <div className="vaf-slot-power vaf-math">10<Sup>{s.p}</Sup></div>
          <div className="vaf-slot-word">{s.w}</div>
        </div>
      ))}
    </div>
    <figcaption className="vaf-math vaf-caption-eq">
      156 = 1·10<Sup>2</Sup> + 5·10<Sup>1</Sup> + 6·10<Sup>0</Sup>
    </figcaption>
  </figure>
);

const Base10ToBaseX = () => (
  <div className="vaf-table-wrap">
    <table className="vaf-table vaf-table--center">
      <caption>Same coefficients [1, 5, 6]: only the base changes</caption>
      <thead>
        <tr>
          <th scope="col">Base</th>
          <th scope="col">
            Slot for base<Sup>2</Sup>
          </th>
          <th scope="col">Slot for base<Sup>1</Sup></th>
          <th scope="col">Slot for base<Sup>0</Sup></th>
          <th scope="col">Reads as</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">10 (arithmetic)</th>
          <td>1</td>
          <td>5</td>
          <td>6</td>
          <td className="vaf-math">1·10<Sup>2</Sup> + 5·10 + 6 = 156</td>
        </tr>
        <tr>
          <th scope="row">x (algebra)</th>
          <td>1</td>
          <td>5</td>
          <td>6</td>
          <td className="vaf-math">x<Sup>2</Sup> + 5x + 6 = (x + 2)(x + 3)</td>
        </tr>
      </tbody>
    </table>
    <p className="vaf-note">Put x = 10 in the second row and you get the first: (10 + 2)(10 + 3) = 12 × 13 = 156.</p>
  </div>
);

const NumberLine = () => {
  const ticks = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
  const x = (n: number) => 300 + n * 50;
  const minus = (n: number) => (n < 0 ? `−${-n}` : String(n));
  return (
    <figure className="vaf-figure">
      <svg className="vaf-svg" viewBox="0 0 600 150" role="img" aria-labelledby="vaf-nl-title">
        <title id="vaf-nl-title">Number line: debts (ṛṇa) to the left of zero, fortunes (dhana) to the right, zero as the mirror</title>
        <defs>
          <marker id="vaf-arrow-l" viewBox="0 0 10 10" refX="1" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#b91c1c" />
          </marker>
          <marker id="vaf-arrow-r" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#15803d" />
          </marker>
        </defs>
        <line x1={x(0)} y1="75" x2="28" y2="75" stroke="#b91c1c" strokeWidth="3" markerEnd="url(#vaf-arrow-l)" />
        <line x1={x(0)} y1="75" x2="572" y2="75" stroke="#15803d" strokeWidth="3" markerEnd="url(#vaf-arrow-r)" />
        <line x1={x(0)} y1="22" x2={x(0)} y2="128" stroke="#b45309" strokeWidth="2" strokeDasharray="5 4" />
        {ticks.map((n) => (
          <g key={n}>
            <line x1={x(n)} y1="68" x2={x(n)} y2="82" stroke={n === 0 ? '#b45309' : n < 0 ? '#b91c1c' : '#15803d'} strokeWidth="2" />
            <text x={x(n)} y="100" textAnchor="middle" fontSize="14" fill="#374151">{minus(n)}</text>
          </g>
        ))}
        <text x="150" y="44" textAnchor="middle" fontSize="15" fontWeight="700" fill="#b91c1c">ऋण · ṛṇa · DEBT</text>
        <text x="450" y="44" textAnchor="middle" fontSize="15" fontWeight="700" fill="#15803d">धन · dhana · FORTUNE</text>
        <text x={x(0)} y="16" textAnchor="middle" fontSize="13" fontWeight="700" fill="#b45309">शून्य · ZERO (mirror)</text>
        <text x="150" y="126" textAnchor="middle" fontSize="12" fill="#6b7280">debts grow to the left</text>
        <text x="450" y="126" textAnchor="middle" fontSize="12" fill="#6b7280">fortunes grow to the right</text>
      </svg>
    </figure>
  );
};

const SignRules = () => (
  <div className="vaf-table-wrap">
    <table className="vaf-table">
      <caption>Brahmagupta’s ledger (Brāhmasphuṭasiddhānta 18.30–35), in modern notation</caption>
      <thead>
        <tr>
          <th scope="col">Rule (paraphrased)</th>
          <th scope="col">Modern form</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>A debt minus zero is a debt.</td><td className="vaf-math">−a − 0 = −a</td></tr>
        <tr><td>A fortune minus zero is a fortune.</td><td className="vaf-math">a − 0 = a</td></tr>
        <tr><td>Zero minus zero is zero.</td><td className="vaf-math">0 − 0 = 0</td></tr>
        <tr><td>The product of two debts is a fortune.</td><td className="vaf-math">(−a)(−b) = ab</td></tr>
        <tr><td>The product of two fortunes is a fortune.</td><td className="vaf-math">a · b = ab</td></tr>
        <tr><td>The product of a debt and a fortune is a debt.</td><td className="vaf-math">(−a) · b = −ab</td></tr>
        <tr className="vaf-row-muted">
          <td>Zero divided by zero is zero. <em>(later revised)</em></td>
          <td className="vaf-math">0 ÷ 0: undefined today</td>
        </tr>
      </tbody>
    </table>
  </div>
);

const CrossSigns = () => (
  <div className="vaf-table-wrap">
    <table className="vaf-table vaf-table--center">
      <caption>(x − 2)(x + 3) by Ūrdhva-Tiryagbhyām: vertically and crosswise</caption>
      <thead>
        <tr>
          <th scope="col">Step</th>
          <th scope="col">Pattern</th>
          <th scope="col">Work</th>
          <th scope="col">Result</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Left column</th>
          <td>vertical</td>
          <td className="vaf-math">x · x</td>
          <td className="vaf-math">x<Sup>2</Sup></td>
        </tr>
        <tr>
          <th scope="row">Middle column</th>
          <td>crosswise (fortune + debt)</td>
          <td className="vaf-math">x · 3 + (−2) · x</td>
          <td className="vaf-math">+x</td>
        </tr>
        <tr>
          <th scope="row">Right column</th>
          <td>vertical (debt × fortune)</td>
          <td className="vaf-math">(−2) · 3</td>
          <td className="vaf-math">−6</td>
        </tr>
      </tbody>
    </table>
    <p className="vaf-note vaf-math">(x − 2)(x + 3) = x<Sup>2</Sup> + x − 6 · check at x = 10: 8 × 13 = 104 = 100 + 10 − 6 ✓</p>
  </div>
);

const Balance = () => (
  <figure className="vaf-figure">
    <svg className="vaf-svg" viewBox="0 0 600 210" role="img" aria-labelledby="vaf-bal-title">
      <title id="vaf-bal-title">A balance scale: left side 5x + 2 equals right side 3x + 10, resting on a fulcrum</title>
      <line x1="90" y1="60" x2="510" y2="60" stroke="#78350f" strokeWidth="5" strokeLinecap="round" />
      <polygon points="300,62 270,170 330,170" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
      <line x1="230" y1="172" x2="370" y2="172" stroke="#78350f" strokeWidth="5" strokeLinecap="round" />
      <line x1="130" y1="60" x2="95" y2="120" stroke="#9ca3af" strokeWidth="2" />
      <line x1="130" y1="60" x2="165" y2="120" stroke="#9ca3af" strokeWidth="2" />
      <line x1="470" y1="60" x2="435" y2="120" stroke="#9ca3af" strokeWidth="2" />
      <line x1="470" y1="60" x2="505" y2="120" stroke="#9ca3af" strokeWidth="2" />
      <path d="M 70 120 Q 130 160 190 120 Z" fill="#fef3c7" stroke="#b45309" strokeWidth="2" />
      <path d="M 410 120 Q 470 160 530 120 Z" fill="#fef3c7" stroke="#b45309" strokeWidth="2" />
      <text x="130" y="108" textAnchor="middle" fontSize="20" fontWeight="700" fill="#1f2937">5x + 2</text>
      <text x="470" y="108" textAnchor="middle" fontSize="20" fontWeight="700" fill="#1f2937">3x + 10</text>
      <text x="300" y="46" textAnchor="middle" fontSize="26" fontWeight="800" fill="#b45309">=</text>
      <text x="130" y="30" textAnchor="middle" fontSize="13" fill="#6b7280">LHS · first pakṣa</text>
      <text x="470" y="30" textAnchor="middle" fontSize="13" fill="#6b7280">RHS · second pakṣa</text>
      <text x="300" y="198" textAnchor="middle" fontSize="13" fill="#6b7280">समीकरण · samīkaraṇa: making equal</text>
    </svg>
  </figure>
);

const Transposition = () => (
  <ol className="vaf-steps">
    <li>
      <span className="vaf-math">5x + 2 = 3x + 10</span>
      <span className="vaf-step-note">the balance, as stated</span>
    </li>
    <li>
      <span className="vaf-math">5x − 3x + 2 = 10</span>
      <span className="vaf-step-note">clear the unknown from the second side: +3x crosses over and becomes −3x (dhana → ṛṇa)</span>
    </li>
    <li>
      <span className="vaf-math">2x = 10 − 2</span>
      <span className="vaf-step-note">clear the known number from the first side: +2 becomes −2</span>
    </li>
    <li>
      <span className="vaf-math">x = 8 ÷ 2 = 4</span>
      <span className="vaf-step-note">Brahmagupta’s form: (10 − 2) ÷ (5 − 3) = 4 · check: 5·4 + 2 = 22 = 3·4 + 10 ✓</span>
    </li>
  </ol>
);

/** In-app navigation through Dashboard (same event the Numbers guide uses); falls back to the href. */
const openSiteTarget = (event: MouseEvent<HTMLAnchorElement>, target: Record<string, string>) => {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
  const detail = { target, handled: false };
  window.dispatchEvent(new CustomEvent('ednet:open-target', { detail }));
  if (detail.handled) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

interface LineageEntry {
  when: string;
  who: string;
  work: string;
  note: string;
  link?: { label: string; href: string; target: Record<string, string> };
}

const LINEAGE: LineageEntry[] = [
  {
    when: 'c. 800–200 BCE',
    who: 'Śulba Sūtras: Baudhāyana, Āpastamba, Kātyāyana',
    work: 'Śulba Sūtras',
    note: 'Altar geometry: diagonal rule, √2 approximation, area-preserving and area-enlarging constructions.',
  },
  {
    when: 'c. 3rd–2nd c. BCE',
    who: 'Piṅgala',
    work: 'Chandaḥśāstra',
    note: 'Metres counted with short/long syllables: binary-like patterns and combinatorics (meru-prastāra).',
    link: {
      label: 'Darśana essay: The Binary Blueprint →',
      href: '/philosophy',
      target: { view: 'philosophy', philosophyEssay: 'pingala_binary' },
    },
  },
  {
    when: 'dating debated (3rd–10th c. CE)',
    who: 'Bakhshali manuscript',
    work: 'birch-bark arithmetic and algebra text',
    note: 'Place-value numerals with a dot for zero; radiocarbon dates of its folios range widely.',
  },
  {
    when: '499 CE',
    who: 'Āryabhaṭa',
    work: 'Āryabhaṭīya',
    note: 'Place-value rule; kuṭṭaka (“pulverizer”) for linear indeterminate equations.',
  },
  {
    when: '628 CE',
    who: 'Brahmagupta',
    work: 'Brāhmasphuṭasiddhānta',
    note: 'Rules for zero and negatives (dhana, ṛṇa), linear and quadratic equations, colour-named unknowns, varga-prakṛti (x² = Ny² + 1) with bhāvanā.',
  },
  {
    when: 'c. 850 CE',
    who: 'Mahāvīra',
    work: 'Gaṇitasārasaṅgraha',
    note: 'A comprehensive Jaina compendium: fractions, series, combinations, equations.',
  },
  {
    when: 'c. 8th–9th c. CE (dating debated)',
    who: 'Śrīdhara',
    work: 'Pāṭīgaṇita, Triśatikā',
    note: 'His rule for solving quadratics (by completing the square) survives because Bhāskara II quotes it; his algebra text itself is lost.',
  },
  {
    when: 'before 1150 CE',
    who: 'Padmanābha',
    work: 'a bīja (algebra) text, now lost',
    note: 'Known only because Bhāskara II names it among his sources.',
  },
  {
    when: '1150 CE',
    who: 'Bhāskara II',
    work: 'Līlāvatī & Bījagaṇita (Siddhānta-śiromaṇi)',
    note: 'Systematized yā-kā-nī notation and samīkaraṇa; expounded the cakravāla method for varga-prakṛti (an earlier form is credited to Jayadeva, 11th c.).',
    link: {
      label: 'Darśana essay: Līlāvatī →',
      href: '/philosophy',
      target: { view: 'philosophy', philosophyEssay: 'lilavati_math' },
    },
  },
  {
    when: '1356 CE',
    who: 'Nārāyaṇa Paṇḍita',
    work: 'Gaṇitakaumudī (also Bījagaṇitāvataṃsa)',
    note: 'Combinatorics, magic squares, and further algebra.',
  },
  {
    when: 'c. 1340–1425 CE',
    who: 'Mādhava of Saṅgamagrāma (Kerala school)',
    work: 'known through his students’ texts',
    note: 'Infinite series for π, sine and cosine, centuries before similar European results (Gregory, Leibniz, Newton).',
  },
  {
    when: 'c. 1500 CE',
    who: 'Nīlakaṇṭha Somayājī (Kerala school)',
    work: 'Tantrasaṅgraha',
    note: 'Astronomy built on the Mādhava school’s series.',
  },
  {
    when: 'c. 1530 CE',
    who: 'Jyeṣṭhadeva (Kerala school)',
    work: 'Yuktibhāṣā (Malayalam)',
    note: 'Gives the reasoning (yukti) behind the Kerala series results.',
  },
];

const Lineage = () => (
  <aside className="vaf-lineage" aria-labelledby="vaf-lineage-title">
    <h4 className="vaf-lineage-title" id="vaf-lineage-title">
      Timeline · teachers and texts, each building on the last
    </h4>
    <ol className="vaf-lineage-list">
      {LINEAGE.map((e) => (
        <li key={e.who} className="vaf-lineage-item">
          <div className="vaf-lineage-when">{e.when}</div>
          <div className="vaf-lineage-body">
            <strong>{e.who}</strong> · <em>{e.work}</em>
            <div className="vaf-lineage-note">{e.note}</div>
            {e.link && (
              <a className="vaf-lineage-link" href={e.link.href} onClick={(ev) => openSiteTarget(ev, e.link!.target)}>
                {e.link.label}
              </a>
            )}
          </div>
        </li>
      ))}
    </ol>
    <p className="vaf-lineage-foot">
      Meanwhile in Baghdad: al-Khwārizmī (c. 820) began the Arabic algebra tradition, carried on by Abū Kāmil,
      al-Karajī, Omar Khayyām and al-Samawʾal.
    </p>
  </aside>
);

// ---------------------------------------------------------------- Before the Carat (metrology)

const MANU_CHAIN: { sa: string; iast: string; gloss: string; next?: string }[] = [
  { sa: 'त्रसरेणु', iast: 'trasareṇu', gloss: 'dust mote in a sunbeam', next: '×8' },
  { sa: 'लिक्षा', iast: 'likṣā', gloss: 'louse egg', next: '×3' },
  { sa: 'राजसर्षप', iast: 'rāja-sarṣapa', gloss: 'black mustard seed', next: '×3' },
  { sa: 'गौरसर्षप', iast: 'gaura-sarṣapa', gloss: 'white mustard seed', next: '×6' },
  { sa: 'यव', iast: 'yava', gloss: 'barley corn', next: '×3' },
  { sa: 'कृष्णल', iast: 'kṛṣṇala', gloss: 'raktikā / guñjā seed (ratti) ≈ 0.12 g', next: '×5' },
  { sa: 'माष', iast: 'māṣa', gloss: 'bean weight', next: '×16' },
  { sa: 'सुवर्ण', iast: 'suvarṇa', gloss: 'gold weight' },
];

const ManuWeightChain = () => (
  <figure className="vaf-figure">
    <ol className="vaf-chain" aria-label="Chain of weights, smallest to largest">
      {MANU_CHAIN.map((u) => (
        <li key={u.iast} className={`vaf-chain-item${u.iast === 'kṛṣṇala' ? ' vaf-chain-item--anchor' : ''}`}>
          <div className="vaf-chain-unit">
            <div className="vaf-chain-sa" lang="sa">{u.sa}</div>
            <div className="vaf-chain-iast">{u.iast}</div>
            <div className="vaf-chain-gloss">{u.gloss}</div>
          </div>
          {u.next && (
            <div className="vaf-chain-step" aria-label={`${u.next.replace('×', 'times ')} makes the next unit`}>
              <span className="vaf-chain-factor">{u.next}</span>
              <span className="vaf-chain-arrow" aria-hidden="true">→</span>
            </div>
          )}
        </li>
      ))}
    </ol>
    <figcaption className="vaf-note">
      Each arrow reads “this many make the next unit”. Preserved in the Manusmṛti 8.132–134 (same series in the
      Yājñavalkya Smṛti 1.362–363). 1 kṛṣṇala = 8 × 3 × 3 × 6 × 3 = 1,296 trasareṇu; 1 suvarṇa = 80 kṛṣṇala. The gram
      value is the modern conventional ratti, not a figure from the text.
    </figcaption>
  </figure>
);

const WeightTablesCompared = () => (
  <div className="vaf-table-wrap">
    <table className="vaf-table">
      <caption>Two surviving tables side by side</caption>
      <thead>
        <tr>
          <th scope="col">Metal / use</th>
          <th scope="col">Manusmṛti 8.134–136</th>
          <th scope="col">Arthaśāstra 2.19</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Gold, small unit</th>
          <td>5 kṛṣṇala (guñjā) = 1 māṣa</td>
          <td>5 guñjā or 10 māṣa beans = 1 suvarṇa-māṣaka</td>
        </tr>
        <tr>
          <th scope="row">Gold, standard</th>
          <td>16 māṣa = 1 suvarṇa</td>
          <td>16 māṣaka = 1 suvarṇa (karṣa)</td>
        </tr>
        <tr>
          <th scope="row">Larger</th>
          <td>4 suvarṇa = 1 pala</td>
          <td>4 karṣa = 1 pala</td>
        </tr>
        <tr>
          <th scope="row">Silver</th>
          <td>2 kṛṣṇala = 1 silver māṣaka; 16 = 1 dharaṇa (purāṇa)</td>
          <td>88 white mustard seeds = 1 silver māṣaka; 16 = 1 dharaṇa</td>
        </tr>
        <tr>
          <th scope="row">Diamond</th>
          <td>—</td>
          <td>20 grains of rice (taṇḍula) = 1 dharaṇa of diamond</td>
        </tr>
      </tbody>
    </table>
    <p className="vaf-note">Both give 80 guñjā seeds to one gold suvarṇa.</p>
  </div>
);

const GemWeightUnits = () => (
  <div className="vaf-table-wrap">
    <table className="vaf-table">
      <caption>Gem weights before the metric carat</caption>
      <thead>
        <tr>
          <th scope="col">Unit</th>
          <th scope="col">Natural basis</th>
          <th scope="col">Approx. mass</th>
          <th scope="col">Where it comes from</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">taṇḍula · तण्डुल</th>
          <td>a grain of husked rice</td>
          <td>not fixed in the text</td>
          <td>Arthaśāstra 2.19: 20 taṇḍula = 1 dharaṇa of diamond</td>
        </tr>
        <tr>
          <th scope="row">raktikā · रक्तिका (ratti)</th>
          <td>guñjā seed, Abrus precatorius</td>
          <td>≈ 0.12 g (conventional)</td>
          <td>Manusmṛti, Arthaśāstra; still quoted by jewellers</td>
        </tr>
        <tr className="vaf-row-muted">
          <th scope="row">pakkī ratti</th>
          <td>a trade unit, no longer a seed</td>
          <td>≈ 0.18 g (≈ 0.91 carat)</td>
          <td>later gem-trade convention; values vary by trader</td>
        </tr>
        <tr className="vaf-row-muted">
          <th scope="row">mañjāḍi (manjadikuru)</th>
          <td>red seed of Adenanthera pavonina</td>
          <td>≈ 2 guñjā (kunni) seeds</td>
          <td>regional convention in Kerala and the south</td>
        </tr>
        <tr>
          <th scope="row">carat</th>
          <td>carob seed (Greek keration)</td>
          <td>0.2 g (metric carat, fixed 1907)</td>
          <td>Mediterranean and Arab trade; now worldwide</td>
        </tr>
      </tbody>
    </table>
    <p className="vaf-note">Greyed rows are later or regional trade conventions, not units from the classical texts.</p>
  </div>
);

const DiamondGrading = () => (
  <figure className="vaf-figure">
    <div className="vaf-phases" role="list">
      <div className="vaf-phase" role="listitem">
        <div className="vaf-phase-tag">1 · Varṇa (colour)</div>
        <div className="vaf-phase-who">Bṛhatsaṃhitā 80.11 · Arthaśāstra 2.11</div>
        <div className="vaf-phase-eg">
          Four colour classes named after the varṇas: white for Brāhmaṇas, red or yellow for Kṣatriyas, slightly yellow
          for Vaiśyas, black for Śūdras.
        </div>
        <div className="vaf-phase-src">
          The Bṛhatsaṃhitā frames this as who should wear which colour. The Arthaśāstra lists shades such as cat’s-eye,
          śirīṣa flower, cow’s urine, alum and mālatī flower.
        </div>
      </div>
      <div className="vaf-phase" role="listitem">
        <div className="vaf-phase-tag">2 · Hardness</div>
        <div className="vaf-phase-who">Arthaśāstra 2.11</div>
        <div className="vaf-phase-eg">
          The best diamond withstands blows and scratches the surface of vessels (bhājanalekhī).
        </div>
        <div className="vaf-phase-src">Only a diamond scratches a diamond, which made this a test few fakes could pass.</div>
      </div>
      <div className="vaf-phase" role="listitem">
        <div className="vaf-phase-tag">3 · Size, weight, form and light</div>
        <div className="vaf-phase-who">Arthaśāstra 2.11</div>
        <div className="vaf-phase-eg">Big, heavy, with regular angles (samakoṇa), refracting light and brilliant.</div>
        <div className="vaf-phase-src">
          Density testing by displacement in water or oil is not attested in the classical texts; later gem lore even
          praises a diamond that “floats on water”, an ideal rather than a measurement.
        </div>
      </div>
    </div>
  </figure>
);

const TOUCH_STREAKS: { label: string; fill: string }[] = [
  { label: '0', fill: '#f4c542' },
  { label: '4', fill: '#eab13c' },
  { label: '8', fill: '#dc9b3a' },
  { label: '12', fill: '#cc8537' },
  { label: '16', fill: '#b96e33' },
];

const TouchstoneStreaks = () => (
  <figure className="vaf-figure">
    <svg
      className="vaf-svg"
      viewBox="0 0 600 230"
      role="img"
      aria-label="A dark touchstone with five reference streaks from pure gold to gold with 16 kākaṇī of copper, and a test streak matching the second"
    >
      <rect x="10" y="10" width="580" height="175" rx="22" fill="#1f2328" />
      <rect x="10" y="10" width="580" height="175" rx="22" fill="none" stroke="#4b5563" strokeWidth="2" />
      {TOUCH_STREAKS.map((s, i) => (
        <g key={s.label}>
          <rect x={48 + i * 82} y="40" width="46" height="100" rx="6" fill={s.fill} opacity="0.92" />
          <text x={71 + i * 82} y="165" textAnchor="middle" fill="#e5e7eb" fontSize="15">
            {s.label}
          </text>
        </g>
      ))}
      <line x1="458" y1="30" x2="458" y2="150" stroke="#6b7280" strokeDasharray="4 4" />
      <rect x="490" y="40" width="46" height="100" rx="6" fill="#eab13c" opacity="0.92" />
      <text x="513" y="165" textAnchor="middle" fill="#fde68a" fontSize="15" fontWeight="700">
        test
      </text>
      <text x="236" y="212" textAnchor="middle" fill="#78350f" fontSize="14">
        reference streaks · kākaṇī of copper per suvarṇa (of 64)
      </text>
      <text x="513" y="212" textAnchor="middle" fill="#78350f" fontSize="14">
        ≈ matches 4
      </text>
    </svg>
    <figcaption className="vaf-note">
      Arthaśāstra 2.13: draw a streak of standard gold, then the gold under test beside it, and compare colours. Its
      sixteen standards (ṣoḍaśa-varṇaka) replace 1 to 16 kākaṇī of gold by copper; five are shown. Colours are
      illustrative.
    </figcaption>
  </figure>
);

const INDUS_BINARY = [1, 2, 4, 8, 16, 32, 64];
const INDUS_DECIMAL = [160, 200, 320, 640, 1600, 3200, 6400, 8000, 12800];

const IndusWeights = () => (
  <figure className="vaf-figure">
    <div className="vaf-indus">
      <div className="vaf-indus-row">
        <div className="vaf-indus-label">Binary (small weights)</div>
        <div className="vaf-indus-chips">
          {INDUS_BINARY.map((n) => (
            <span key={n} className={`vaf-indus-chip${n === 16 ? ' vaf-indus-chip--key' : ''}`}>
              {n}
            </span>
          ))}
        </div>
      </div>
      <div className="vaf-indus-row">
        <div className="vaf-indus-label">Decimal multiples (large weights)</div>
        <div className="vaf-indus-chips">
          {INDUS_DECIMAL.map((n) => (
            <span key={n} className="vaf-indus-chip">
              {n.toLocaleString('en-IN')}
            </span>
          ))}
        </div>
      </div>
    </div>
    <figcaption className="vaf-note">
      Ratios of Harappan cubical stone weights (J. M. Kenoyer’s summary). The highlighted ratio 16 is the commonest weight,
      about 13.7 g, so the smallest (ratio 1) is under 1 g. Bricks from the same cities follow 1 : 2 : 4.
    </figcaption>
  </figure>
);

const CoinCompared = () => (
  <div className="vaf-table-wrap">
    <table className="vaf-table">
      <caption>Two silver coins, both valued as metal</caption>
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">kārṣāpaṇa</th>
          <th scope="col">denarius, early empire</th>
          <th scope="col">denarius after Nero (AD 64)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">What it looks like</th>
          <td>punch-marked silver; no portrait</td>
          <td>silver with the emperor’s portrait</td>
          <td>the same portrait, on a lighter coin</td>
        </tr>
        <tr>
          <th scope="row">Mass</th>
          <td>about 32 ratti, some 3.3–3.5 g</td>
          <td>about 3.9 g (1/84 of a Roman pound)</td>
          <td>about 3.4 g (1/96 of a pound)</td>
        </tr>
        <tr>
          <th scope="row">What the value follows</th>
          <td>weight and fineness of the silver</td>
          <td>weight and fineness; the silver share is high</td>
          <td>less silver in the coin of the same name (near 80% in Butcher and Ponting)</td>
        </tr>
      </tbody>
    </table>
    <p className="vaf-note">
      No laboratory figure for the silver percentage of a punch-marked kārṣāpaṇa is given here. The Roman column is the standard numismatic account of Nero’s reform of AD 64.
    </p>
  </div>
);

export default function VedicArticleFigure({ id }: { id: VedicArticleFigureId }) {
  switch (id) {
    case 'algebra-lineage':
      return <Lineage />;
    case 'algebra-three-phases':
      return <ThreePhases />;
    case 'additive-vs-positional':
      return <AdditiveVsPositional />;
    case 'place-value-156':
      return <PlaceValue156 />;
    case 'base-10-to-base-x':
      return <Base10ToBaseX />;
    case 'dhana-rna-number-line':
      return <NumberLine />;
    case 'brahmagupta-sign-rules':
      return <SignRules />;
    case 'cross-signs':
      return <CrossSigns />;
    case 'samikarana-balance':
      return <Balance />;
    case 'transposition-steps':
      return <Transposition />;
    case 'manu-weight-chain':
      return <ManuWeightChain />;
    case 'weight-tables-compared':
      return <WeightTablesCompared />;
    case 'gem-weight-units':
      return <GemWeightUnits />;
    case 'diamond-grading':
      return <DiamondGrading />;
    case 'touchstone-streaks':
      return <TouchstoneStreaks />;
    case 'indus-weights':
      return <IndusWeights />;
    case 'coin-compared':
      return <CoinCompared />;
    default:
      return null;
  }
}
