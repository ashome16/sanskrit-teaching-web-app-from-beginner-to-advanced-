import React, { useMemo, useState } from 'react';
import { ChallengeList, CoreIdea, TermPanel, type LabChallenge, type LabTerm } from './common';
import { DialKnob, HudFrame, LedButton } from './controls';

type Ritu = 'sisira' | 'vasanta' | 'grishma' | 'varsha' | 'sarad' | 'hemanta';

/** Simplified from the traditional ṛtucaryā pattern of each doṣa building up and flaring by season. */
const RITU: Record<Ritu, { dev: string; iast: string; en: string; v: number; p: number; k: number }> = {
  sisira: { dev: 'शिशिर', iast: 'śiśira', en: 'late winter', v: 0, p: 0, k: 6 },
  vasanta: { dev: 'वसन्त', iast: 'vasanta', en: 'spring', v: 0, p: 0, k: 12 },
  grishma: { dev: 'ग्रीष्म', iast: 'grīṣma', en: 'summer', v: 6, p: 0, k: 0 },
  varsha: { dev: 'वर्षा', iast: 'varṣā', en: 'rains', v: 12, p: 6, k: 0 },
  sarad: { dev: 'शरद्', iast: 'śarad', en: 'autumn', v: 0, p: 12, k: 0 },
  hemanta: { dev: 'हेमन्त', iast: 'hemanta', en: 'early winter', v: 0, p: 0, k: 0 },
};
const RITU_ORDER: Ritu[] = ['sisira', 'vasanta', 'grishma', 'varsha', 'sarad', 'hemanta'];

interface Env {
  ritu: Ritu;
  heat: number;
  cold: number;
  dry: number;
  moist: number;
  activity: number;
}

const SCENARIOS: { label: string; env: Env }[] = [
  { label: '☀️ Hot summer afternoon after a run', env: { ritu: 'grishma', heat: 9, cold: 1, dry: 7, moist: 3, activity: 8 } },
  { label: '🌧️ Damp, rainy, lazy day', env: { ritu: 'varsha', heat: 3, cold: 6, dry: 1, moist: 9, activity: 1 } },
  { label: '❄️ Cold, dry, windy winter trip', env: { ritu: 'sisira', heat: 1, cold: 9, dry: 9, moist: 2, activity: 8 } },
  { label: '🌸 Sleepy spring morning', env: { ritu: 'vasanta', heat: 4, cold: 6, dry: 3, moist: 8, activity: 2 } },
];

const clamp = (n: number) => Math.max(0, Math.min(100, n));

const doshaLevels = (e: Env) => {
  const d = (n: number) => n - 5;
  const r = RITU[e.ritu];
  return {
    vata: clamp(50 + 3 * d(e.dry) + 2 * d(e.cold) + 3 * d(e.activity) - 2 * d(e.moist) + r.v),
    pitta: clamp(50 + 5 * d(e.heat) - 3 * d(e.cold) + 0.5 * d(e.activity) + r.p),
    kapha: clamp(50 + 3.5 * d(e.moist) + 2 * d(e.cold) - 3 * d(e.activity) - 2 * d(e.heat) - 1.5 * d(e.dry) + r.k),
  };
};

const SAMA_LO = 40;
const SAMA_HI = 60;
const inSama = (n: number) => n >= SAMA_LO && n <= SAMA_HI;

const DOSHA = [
  { key: 'vata' as const, dev: 'वात', iast: 'vāta', color: '#7c3aed', soft: '#ede9fe', bhuta: 'vāyu + ākāśa', q: 'dry · cold · light · mobile' },
  { key: 'pitta' as const, dev: 'पित्त', iast: 'pitta', color: '#ea580c', soft: '#ffedd5', bhuta: 'tejas + ap', q: 'hot · sharp · slightly oily' },
  { key: 'kapha' as const, dev: 'कफ', iast: 'kapha', color: '#0f766e', soft: '#ccfbf1', bhuta: 'pṛthivī + ap', q: 'heavy · cold · moist · stable' },
];

const TERMS: LabTerm[] = [
  { dev: 'यथा पिण्डे तथा ब्रह्माण्डे', iast: 'yathā piṇḍe tathā brahmāṇḍe', en: 'as in the body, so in the cosmos', note: 'a traditional saying' },
  { dev: 'पिण्ड', iast: 'piṇḍa', en: 'the body (literally, a lump or ball)' },
  { dev: 'ब्रह्माण्ड', iast: 'brahmāṇḍa', en: 'the cosmos (the "egg of Brahmā")' },
  { dev: 'पञ्चमहाभूत', iast: 'pañca-mahābhūta', en: 'the five great elements' },
  { dev: 'दोष', iast: 'doṣa', en: 'one of three functional principles in Āyurveda' },
  { dev: 'वात', iast: 'vāta', en: 'movement principle', note: 'vāyu + ākāśa' },
  { dev: 'पित्त', iast: 'pitta', en: 'transformation / heat principle', note: 'tejas + ap' },
  { dev: 'कफ', iast: 'kapha', en: 'structure / cohesion principle', note: 'pṛthivī + ap' },
  { dev: 'सम', iast: 'sama', en: 'even, balanced' },
  { dev: 'ऋतु', iast: 'ṛtu', en: 'season (six in the traditional year)' },
  { dev: 'ऋतुचर्या', iast: 'ṛtucaryā', en: 'seasonal routine' },
  { dev: 'गुण', iast: 'guṇa', en: 'quality, e.g. dry, heavy, hot' },
];

const CHALLENGES: LabChallenge[] = [
  { q: 'Which doṣa is described as dry, cold, light and mobile?', options: ['vāta', 'pitta', 'kapha'], answer: 0, explain: 'Vāta is linked with vāyu and ākāśa: movement and space.' },
  { q: 'Pitta is linked with which two bhūtas?', options: ['pṛthivī + ap', 'tejas + ap', 'vāyu + ākāśa'], answer: 1, explain: 'Pitta is hot and sharp: tejas (fire) with ap (water).' },
  { q: 'Kapha is heavy, moist and stable. Its bhūtas are…', options: ['pṛthivī + ap', 'tejas + vāyu', 'ākāśa + tejas'], answer: 0, explain: 'Earth and water: think of wet clay that holds its shape.' },
  { q: '“Yathā piṇḍe tathā brahmāṇḍe” means…', options: ['The body is bigger than the cosmos', 'As in the body, so in the cosmos', 'Eat well in winter'], answer: 1, explain: 'Piṇḍa (body) mirrors brahmāṇḍa (cosmos).' },
  { q: 'Is this balance game medical advice?', options: ['Yes', 'No, it is a learning game'], answer: 1, explain: 'Always ask a doctor about health. This game only teaches the traditional vocabulary.' },
];

const Dial: React.FC<{ label: string; value: number; onChange: (n: number) => void; testId: string; color: string }> = ({ label, value, onChange, testId, color }) => (
  <DialKnob label={label} ariaLabel={label.replace(/^\S+\s/, '')} value={value} min={0} max={10} step={1} onChange={onChange} format={(x) => `${Math.round(x)} / 10`} color={color} size={78} testId={testId} />
);

type CellPart = 'membrane' | 'cytoplasm' | 'mito' | 'gas' | 'space';
const CELL_ANSWERS: Record<CellPart, { bhuta: string; label: string; why: string }> = {
  membrane: { bhuta: 'pṛthivī', label: 'Membrane & structure', why: 'It gives shape and boundary, like solid earth.' },
  cytoplasm: { bhuta: 'ap', label: 'Cytoplasm (watery inside)', why: 'It is mostly water, so ap fits.' },
  mito: { bhuta: 'tejas', label: 'Mitochondria (energy)', why: 'They release energy, so tejas (fire) is the match.' },
  gas: { bhuta: 'vāyu', label: 'Gas exchange & movement', why: 'Oxygen in, carbon dioxide out: moving air, vāyu.' },
  space: { bhuta: 'ākāśa', label: 'Space inside the cell', why: 'Room for everything to be: ākāśa is space itself.' },
};
const BHUTA_CHOICES = ['pṛthivī', 'ap', 'tejas', 'vāyu', 'ākāśa'];

const CellMap: React.FC = () => {
  const [sel, setSel] = useState<CellPart | null>(null);
  const [done, setDone] = useState<Partial<Record<CellPart, boolean>>>({});
  const [msg, setMsg] = useState('Tap a part of the cell, then choose its bhūta.');
  const choose = (b: string) => {
    if (!sel) {
      setMsg('First tap a glowing part of the cell.');
      return;
    }
    const ans = CELL_ANSWERS[sel];
    if (ans.bhuta === b) {
      setDone((d) => ({ ...d, [sel]: true }));
      setMsg(`✓ ${ans.label} → ${b}. ${ans.why}`);
      setSel(null);
    } else {
      setMsg(`✗ Try another bhūta for “${ans.label}”.`);
    }
  };
  const solved = Object.keys(done).length;
  const hot = (p: CellPart) => `vl-cell-part${sel === p ? ' is-selected' : ''}${done[p] ? ' is-done' : ''}`;
  return (
    <section className="vl-panel" aria-label="Bhūta cell map">
      <h3 className="vl-panel-title">
        <span aria-hidden="true">🦠</span> Bhūta cell map
        <span className="vl-score">{solved} / 5 ✓</span>
      </h3>
      <p className="vl-analogy-tag">Teaching analogy (modern biology does not use these categories)</p>
      <svg viewBox="0 0 420 260" className="vl-cell" role="img" aria-label="A simple cell diagram">
        <g className={hot('membrane')} onClick={() => setSel('membrane')}>
          <ellipse cx={210} cy={130} rx={180} ry={110} fill="none" stroke="#a16207" strokeWidth={12} />
        </g>
        <g className={hot('cytoplasm')} onClick={() => setSel('cytoplasm')}>
          <ellipse cx={210} cy={130} rx={170} ry={100} fill="#e0f2fe" />
        </g>
        <circle cx={250} cy={120} r={34} fill="#f5f3ff" stroke="#c4b5fd" />
        <text x={250} y={124} textAnchor="middle" className="vl-svg-small">nucleus</text>
        <g className={hot('mito')} onClick={() => setSel('mito')}>
          <ellipse cx={120} cy={95} rx={30} ry={14} fill="#fed7aa" stroke="#ea580c" strokeWidth={2} />
          <path d="M96 95 q8 -10 16 0 t16 0 t16 0" fill="none" stroke="#ea580c" strokeWidth={1.5} />
          <ellipse cx={150} cy={175} rx={28} ry={13} fill="#fed7aa" stroke="#ea580c" strokeWidth={2} />
          <path d="M128 175 q7 -9 14 0 t14 0 t14 0" fill="none" stroke="#ea580c" strokeWidth={1.5} />
        </g>
        <g className={hot('space')} onClick={() => setSel('space')}>
          <circle cx={310} cy={185} r={26} fill="#fdf4ff" stroke="#a855f7" strokeDasharray="4 4" />
          <text x={310} y={189} textAnchor="middle" className="vl-svg-small">space</text>
        </g>
        <g className={hot('gas')} onClick={() => setSel('gas')}>
          <path d="M392 70 l-40 18" stroke="#7c3aed" strokeWidth={3} markerEnd="url(#vl-arr)" />
          <text x={396} y={64} className="vl-svg-small">O₂ in</text>
          <path d="M352 200 l40 18" stroke="#7c3aed" strokeWidth={3} markerEnd="url(#vl-arr)" />
          <text x={360} y={236} className="vl-svg-small">CO₂ out</text>
        </g>
        <defs>
          <marker id="vl-arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0 0 L8 4 L0 8 z" fill="#7c3aed" />
          </marker>
        </defs>
        {(Object.keys(done) as CellPart[]).map((p) => {
          const pos: Record<CellPart, [number, number]> = { membrane: [40, 30], cytoplasm: [200, 220], mito: [120, 70], gas: [330, 40], space: [310, 150] };
          return (
            <text key={p} x={pos[p][0]} y={pos[p][1]} className="vl-svg-label" fill="#15803d">✓ {CELL_ANSWERS[p].bhuta}</text>
          );
        })}
      </svg>
      <div className="vl-sort-bins">
        {BHUTA_CHOICES.map((b) => (
          <button key={b} type="button" className="vl-sort-bin" onClick={() => choose(b)}>{b}</button>
        ))}
      </div>
      <p className="vl-sort-msg" role="status">{solved === 5 ? '🎉 Every part matched! Remember: this is an analogy for learning words, not biology.' : sel ? `Selected: ${CELL_ANSWERS[sel].label}. Which bhūta?` : msg}</p>
    </section>
  );
};

const PrakritiBalance: React.FC = () => {
  const [env, setEnv] = useState<Env>(SCENARIOS[0].env);
  const lv = useMemo(() => doshaLevels(env), [env]);
  const allSama = inSama(lv.vata) && inSama(lv.pitta) && inSama(lv.kapha);
  const set = (k: keyof Env) => (n: number) => setEnv((e) => ({ ...e, [k]: n }));

  const missions = [
    { label: 'Bring all three doṣas into sama (40–60)', ok: allSama },
    { label: 'Make kapha rise above 70', ok: lv.kapha > 70 },
    { label: 'Make pitta the highest of the three', ok: lv.pitta > lv.vata && lv.pitta > lv.kapha },
  ];

  // Cairn of three stones: each tilts by how far its doṣa is from 50.
  const tilt = (n: number) => (n - 50) * 0.45;

  return (
    <div className="vl-sim">
      <div className="vl-banner" role="note">
        🌿 A traditional Āyurvedic way of describing balance. <strong>A learning game, not medical advice.</strong>
      </div>
      <CoreIdea>
        A traditional saying, <em lang="sa">yathā piṇḍe tathā brahmāṇḍe</em>, holds that the <strong>piṇḍa</strong> (body)
        mirrors the <strong>brahmāṇḍa</strong> (cosmos): the same pañca-mahābhūtas seen in nature are pictured inside us. In
        Āyurveda, three doṣas describe how they work together: <strong>vāta</strong> (vāyu + ākāśa), <strong>pitta</strong>{' '}
        (tejas + ap) and <strong>kapha</strong> (pṛthivī + ap). Like qualities increase each other; opposite qualities calm
        each other.
      </CoreIdea>

      <div className="vl-sandbox" data-testid="prakriti-sandbox">
        <div className="vl-leds vl-scenarios">
          {SCENARIOS.map((s) => (
            <LedButton key={s.label} kind="action" color="#4ade80" onClick={() => setEnv(s.env)}>{s.label}</LedButton>
          ))}
        </div>

        <div className="vl-prakriti-grid">
          <div className="vl-controls">
            <div className="vl-slider-label">Ṛtu · season</div>
            <div className="vl-leds" role="radiogroup" aria-label="Season">
              {RITU_ORDER.map((r) => (
                <LedButton key={r} kind="radio" on={env.ritu === r} color="#facc15" onClick={() => setEnv((x) => ({ ...x, ritu: r }))} testId={`ritu-${r}`} title={RITU[r].en}>
                  <span lang="sa">{RITU[r].dev}</span> {RITU[r].iast}
                </LedButton>
              ))}
            </div>
            <div className="vl-dials">
              <Dial label="🔥 Heat" value={env.heat} onChange={set('heat')} testId="slider-heat" color="#fb923c" />
              <Dial label="❄️ Cold" value={env.cold} onChange={set('cold')} testId="slider-cold" color="#7dd3fc" />
              <Dial label="🏜️ Dryness" value={env.dry} onChange={set('dry')} testId="slider-dry" color="#fcd34d" />
              <Dial label="💧 Moisture" value={env.moist} onChange={set('moist')} testId="slider-moist" color="#38bdf8" />
              <Dial label="🏃 Activity" value={env.activity} onChange={set('activity')} testId="slider-activity" color="#a78bfa" />
            </div>
            <p className="vl-small">Season nudges are simplified from traditional ṛtucaryā descriptions.</p>
          </div>

          <HudFrame
            accent={allSama ? '#4ade80' : '#22d3ee'}
            bl={<>V {Math.round(lv.vata)} · P {Math.round(lv.pitta)} · K {Math.round(lv.kapha)}</>}
            br={<>{allSama ? 'SAMA ✓' : 'NOT SAMA'}</>}
          >
            <svg viewBox="0 0 420 300" className="vl-stage vl-stage--prakriti" role="img" aria-label="Doṣa balance scene" data-testid="prakriti-stage">
              <rect x={0} y={0} width={420} height={300} fill={allSama ? '#052e1a' : '#030712'} />
              {/* ground */}
              <path d="M0 262 Q210 236 420 262 L420 300 L0 300 Z" fill="#064e3b" opacity={0.7} />
              {/* cairn */}
              <g transform="translate(90 250)">
                <ellipse cx={0} cy={0} rx={52} ry={10} fill="#065f46" />
                {DOSHA.slice().reverse().map((d, i) => (
                  <g key={d.key} transform={`translate(0 ${-18 - i * 40}) rotate(${tilt(lv[d.key])})`}>
                    <ellipse cx={0} cy={0} rx={44 - i * 7} ry={18} fill={d.color} fillOpacity={0.35} stroke={d.soft} strokeWidth={2.5} />
                    <text x={0} y={5} textAnchor="middle" className="vl-svg-dev">{d.dev}</text>
                  </g>
                ))}
                {allSama && <text x={0} y={-150} textAnchor="middle" fontSize={26}>🌼</text>}
              </g>
              {/* gauges */}
              {DOSHA.map((d, i) => {
                const x = 210 + i * 70;
                const h = 200;
                const top = 40;
                const y = (n: number) => top + h - (n / 100) * h;
                return (
                  <g key={d.key}>
                    <rect x={x - 16} y={top} width={32} height={h} rx={16} fill="#0b1220" stroke="#334155" />
                    <rect x={x - 16} y={y(SAMA_HI)} width={32} height={y(SAMA_LO) - y(SAMA_HI)} fill="#22c55e" opacity={0.28} />
                    <rect x={x - 11} y={y(lv[d.key])} width={22} height={top + h - y(lv[d.key])} rx={11} fill={d.soft} opacity={0.9} style={{ filter: `drop-shadow(0 0 4px ${d.soft})` }} />
                    <text x={x} y={top - 10} textAnchor="middle" className="vl-svg-dev">{d.dev}</text>
                    <text x={x} y={top + h + 18} textAnchor="middle" className="vl-svg-small">{d.iast} {Math.round(lv[d.key])}</text>
                  </g>
                );
              })}
              <text x={12} y={22} className="vl-svg-small">green band = sama</text>
            </svg>
          </HudFrame>
        </div>

        <div className={`vl-sama ${allSama ? 'is-ok' : ''}`} role="status" data-testid="prakriti-status">
          {allSama ? '✨ समः · sama! All three doṣas are in balance.' : 'Not yet sama. Turn the dials until all three gauges sit in the green band.'}
        </div>
      </div>

      <div className="vl-dosha-cards">
        {DOSHA.map((d) => (
          <div key={d.key} className="vl-dosha-card" style={{ borderColor: d.color }}>
            <div className="vl-dosha-name" style={{ color: d.color }}><span lang="sa">{d.dev}</span> {d.iast}</div>
            <div className="vl-small">{d.q}</div>
            <div className="vl-small"><b>{d.bhuta}</b></div>
          </div>
        ))}
      </div>

      <section className="vl-panel" aria-label="Mini missions">
        <h3 className="vl-panel-title"><span aria-hidden="true">🚩</span> Mini missions</h3>
        <ul className="vl-missions">
          {missions.map((m) => (
            <li key={m.label} className={m.ok ? 'is-ok' : ''}>{m.ok ? '✅' : '⬜'} {m.label}</li>
          ))}
        </ul>
      </section>

      <div className="vl-grid-2">
        <div>
          <CellMap />
          <TermPanel terms={TERMS} />
        </div>
        <ChallengeList items={CHALLENGES} />
      </div>
    </div>
  );
};

export default PrakritiBalance;
