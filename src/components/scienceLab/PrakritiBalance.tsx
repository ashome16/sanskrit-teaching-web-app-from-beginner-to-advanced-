import React, { useMemo, useState } from 'react';
import { BodhiLabAnecdote, ChallengeList, CoreIdea, TermPanel, type LabChallenge, type LabTerm } from './common';
import { DialKnob, HudFrame, LedButton } from './controls';
import AyurvedaAttractions from './AyurvedaAttractions';

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

  // Nāḍī pulse diagnostics
  const nadiGati = useMemo(() => {
    if (allSama) return { name: 'Sama-Nāḍī (सम-नाडी)', desc: 'Harmonious, steady rhythm (सम-स्पन्दनम्)', icon: '🌸', color: '#16a34a' };
    if (lv.pitta >= lv.vata && lv.pitta >= lv.kapha && lv.pitta > 55) {
      return { name: 'Maṇḍūka-Gati (मण्डूक-गतिः)', desc: 'Sharp, jumping frog-like pulse (तीक्ष्ण-प्लवः · High Pitta)', icon: '🐸', color: '#ea580c' };
    }
    if (lv.vata >= lv.kapha && lv.vata > 55) {
      return { name: 'Sarpa-Gati (सर्प-गतिः)', desc: 'Quick, winding, subtle snake-like pulse (चपल-गतिः · High Vāta)', icon: '🐍', color: '#7c3aed' };
    }
    if (lv.kapha > 55) {
      return { name: 'Haṃsa-Gati (हंस-गतिः)', desc: 'Slow, deep, majestic swan-like pulse (गम्भीर-मन्द-गतिः · High Kapha)', icon: '🦢', color: '#0f766e' };
    }
    return { name: 'Madhyama-Gati (मध्यम-गतिः)', desc: 'Transitional mixed pulse rhythm', icon: '🌿', color: '#0284c7' };
  }, [allSama, lv]);

  const applyRemedy = (type: 'taila' | 'ghrita' | 'trikatu' | 'triphala') => {
    if (type === 'taila') {
      // Warm oil: increases moisture & heat, decreases dryness & cold
      setEnv((e) => ({ ...e, dry: Math.max(1, e.dry - 4), moist: Math.min(10, e.moist + 3), cold: Math.max(1, e.cold - 3), heat: Math.min(10, e.heat + 2) }));
    } else if (type === 'ghrita') {
      // Cooling ghee: reduces heat, gentle cooling
      setEnv((e) => ({ ...e, heat: Math.max(1, e.heat - 4), cold: Math.min(10, e.cold + 3), moist: Math.min(10, e.moist + 2) }));
    } else if (type === 'trikatu') {
      // Pungent spice: burns dampness & cold, stimulates metabolism
      setEnv((e) => ({ ...e, moist: Math.max(1, e.moist - 4), dry: Math.min(10, e.dry + 3), heat: Math.min(10, e.heat + 3), activity: Math.min(10, e.activity + 2) }));
    } else {
      // Triphala Rasāyana: balances all dials towards 5
      setEnv((e) => ({
        ...e,
        heat: Math.round((e.heat + 5) / 2),
        cold: Math.round((e.cold + 5) / 2),
        dry: Math.round((e.dry + 5) / 2),
        moist: Math.round((e.moist + 5) / 2),
        activity: Math.round((e.activity + 5) / 2),
      }));
    }
  };

  return (
    <div className="vl-sim">
      <BodhiLabAnecdote
        title="Caraka & Suśruta: The Living Ecology of Health"
        sanskritTitle="चरक-सुश्रुतयोः स्वास्थ्य-विज्ञानम्"
        mood="meditate"
        sutra={{
          dev: 'समदोषः समाग्निश्च समधातुमलक्रियः । प्रसन्नात्मेन्द्रियमनाः स्वस्थ इत्यभिधीयते ॥',
          iast: 'samadoṣaḥ samāgniś ca samadhātumalakriyaḥ | prasannātmendriyamanāḥ svastha ity abhidhīyate ||',
          source: 'Suśruta Saṃhitā, Sūtrasthāna 15.41 (महर्षि-सुश्रुतः)',
          meaning: 'One whose biological forces (doṣas) are balanced, whose metabolic fire (Agni) is even, whose tissues (dhātus) and waste processes function in harmony, and whose inner spirit, senses, and mind reside in serene clarity—such a person is truly termed Svastha (healthy).',
        }}
        anecdote={
          <>
            <p>
              In the opening chapters of the <em>Caraka Saṃhitā</em>, the revered sages of ancient India gathered in the tranquil
              foothills of the Himalayas. They observed a profound crisis: as human settlements grew complex, chronic diseases began to
              impede people from fulfilling life’s four fundamental aims—righteous duty (<em>Dharma</em>), livelihood (<em>Artha</em>),
              healthy desires (<em>Kāma</em>), and spiritual liberation (<em>Mokṣa</em>).
            </p>
            <blockquote style={{ borderLeft: '3px solid #10b981', margin: '0.65rem 0', paddingLeft: '0.85rem', fontStyle: 'italic', color: '#065f46' }}>
              “Neither charms nor blind rituals can substitute for rigorous observation of nature. The human organism is an open
              microcosm mirroring the macrocosm: yathā piṇḍe tathā brahmāṇḍe.”
            </blockquote>
            <p>
              Without automated centrifuges or MRI scanners, ancient physicians developed extraordinarily refined observational diagnostics.
              They mastered radial pulse tactile sensitivity (<em>Nāḍī-Parīkṣā</em>), identified diabetes (<em>Madhumeha</em>) by observing
              ants attracted to sweet urine (centuries before Thomas Willis in Europe, 1674), and codified surgical anatomy in the <em>Suśruta Saṃhitā</em>,
              pioneering reconstructive rhinoplasty flaps, cataract couching, and over 120 sterile surgical instruments designed after predatory birds and animals.
            </p>
          </>
        }
        epistemologyAndMethod={
          <>
            Āyurvedic science was governed by <strong>Yukti-Vyapāśraya</strong> (rational therapeutic logic) and threefold clinical diagnosis:
            <strong>Darśana</strong> (visual inspection), <strong>Sparśana</strong> (palpation and pulse diagnosis), and <strong>Praśna</strong> (in-depth patient interrogation).
            The body was conceptualized not as an inert machine, but as a dynamic thermodynamic process:
            <em>Vāta</em> governs kinetic signaling and nervous impulses; <em>Pitta</em> coordinates enzymatic catalysis and thermal transformation;
            <em>Kapha</em> regulates anabolism, fluid cohesion, and protective barriers.
          </>
        }
        modernBridge={{
          ancientConcept: 'Dynamic Homeostasis (Samatva), Circadian biology (Dinacaryā/Ṛtucaryā), and metabolic digestive fire (Jāṭharāgni).',
          modernScience: 'Physiological Homeostasis (Walter Cannon, 1926), Circadian Rhythm molecular gene clocks (Nobel Prize in Medicine 2017), and the Gut Microbiome Axis.',
          relevanceNote: 'Modern chronobiology and microbiome science directly vindicate the ancient prescription: eating during peak diurnal digestive fire and maintaining seasonal dietary adjustments prevents systemic inflammation.',
        }}
        societalValue={
          <p>
            In ancient India, the practice of medicine was protected by a sacred ethical oath: the physician must treat all living beings with
            unconditional compassion (<em>Sarva-bhūteṣu maitrī</em>), never refusing care based on wealth or status.
            Medical treatises were taught freely across great monastic universities like Takshashila and Nalanda.
            Emperor Ashoka’s 3rd-century BCE edicts document the establishment of state-funded public dispensaries (<em>Ārogyaśālā</em>)
            and veterinary hospitals across the subcontinent, affirming healthcare as a civilizational duty for the welfare of all life.
          </p>
        }
      />

      <div className="vl-banner" role="note">
        🌿 A traditional Āyurvedic way of describing dynamic balance. <strong>A learning game, not medical advice.</strong>
      </div>
      <CoreIdea>
        A traditional saying, <em lang="sa">yathā piṇḍe tathā brahmāṇḍe</em>, holds that the <strong>piṇḍa</strong> (body)
        mirrors the <strong>brahmāṇḍa</strong> (cosmos): the same pañca-mahābhūtas seen in nature are pictured inside us. In
        Āyurveda, three doṣas describe how they work together: <strong>vāta</strong> (vāyu + ākāśa), <strong>pitta</strong>{' '}
        (tejas + ap) and <strong>kapha</strong> (pṛthivī + ap). Like qualities increase each other; opposite qualities calm
        each other.
      </CoreIdea>

      <div className="vl-sandbox" data-testid="prakriti-sandbox">
        {/* Dynamic Nāḍī Pulse & Homeostasis HUD */}
        <div
          className="vl-nadi-hud"
          style={{
            background: 'linear-gradient(180deg, #f0fdf4 0%, #ecfdf5 100%)',
            border: `1.5px solid ${nadiGati.color}40`,
            borderLeft: `5px solid ${nadiGati.color}`,
            borderRadius: '14px',
            padding: '0.85rem 1.1rem',
            marginBottom: '0.85rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <span style={{ fontSize: '1.4rem' }}>{nadiGati.icon}</span>
              <strong style={{ fontSize: '1.05rem', color: nadiGati.color }}>
                {nadiGati.name} · Tactile Pulse Waveform
              </strong>
            </div>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.84rem', color: '#334155' }}>
              {nadiGati.desc}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569', alignSelf: 'center', marginRight: '0.2rem' }}>
              Dravya-Guṇa Opposites:
            </span>
            <button
              type="button"
              className="vl-chip"
              onClick={() => applyRemedy('taila')}
              title="Warm sesame oil reduces cold, dry Vāta"
            >
              🫖 Uṣṇa-Taila (Calm Vāta)
            </button>
            <button
              type="button"
              className="vl-chip"
              onClick={() => applyRemedy('ghrita')}
              title="Cooling herbal ghee soothes fiery Pitta"
            >
              🥥 Śīta-Ghṛta (Soothe Pitta)
            </button>
            <button
              type="button"
              className="vl-chip"
              onClick={() => applyRemedy('trikatu')}
              title="Pungent ginger & pepper awakens sluggish Kapha"
            >
              🍯 Laghu-Trikaṭu (Awaken Kapha)
            </button>
            <button
              type="button"
              className="vl-chip"
              style={{ background: '#dcfce7', borderColor: '#22c55e', color: '#15803d', fontWeight: 800 }}
              onClick={() => applyRemedy('triphala')}
              title="Tridoṣa Rasāyana gently harmonizes all three"
            >
              🌿 Triphalā (Samatva Harmonizer)
            </button>
          </div>
        </div>

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

      <AyurvedaAttractions />
    </div>
  );
};

export default PrakritiBalance;
