import React, { useMemo, useState, useEffect, useRef } from 'react';
import { BodhiLabAnecdote, ChallengeList, CoreIdea, TermPanel, type LabChallenge, type LabTerm } from './common';
import { DialKnob, LedButton } from './controls';
import AyurvedaAttractions from './AyurvedaAttractions';
import { soundEffects } from '../../utils/soundEffects';

type Ritu = 'sisira' | 'vasanta' | 'grishma' | 'varsha' | 'sarad' | 'hemanta';

/** Traditional ṛtucaryā baseline environmental stressors */
const RITU: Record<Ritu, { dev: string; iast: string; en: string; v: number; p: number; k: number; heat: number; dry: number }> = {
  sisira: { dev: 'शिशिर', iast: 'śiśira', en: 'late winter', v: 4, p: 0, k: 6, heat: 2, dry: 8 },
  vasanta: { dev: 'वसन्त', iast: 'vasanta', en: 'spring', v: 0, p: 2, k: 12, heat: 4, dry: 4 },
  grishma: { dev: 'ग्रीष्म', iast: 'grīṣma', en: 'harsh summer', v: 8, p: 14, k: -8, heat: 9, dry: 7 },
  varsha: { dev: 'वर्षा', iast: 'varṣā', en: 'monsoon rains', v: 12, p: 6, k: 2, heat: 3, dry: 1 },
  sarad: { dev: 'शरद्', iast: 'śarad', en: 'autumn sun', v: 0, p: 12, k: -2, heat: 8, dry: 6 },
  hemanta: { dev: 'हेमन्त', iast: 'hemanta', en: 'early winter', v: 2, p: 0, k: 4, heat: 3, dry: 5 },
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
  { label: '☀️ Grīṣma (Harsh Summer Noon)', env: { ritu: 'grishma', heat: 9, cold: 1, dry: 7, moist: 3, activity: 8 } },
  { label: '🌧️ Varṣā (Damp Monsoon Flooding)', env: { ritu: 'varsha', heat: 3, cold: 6, dry: 1, moist: 9, activity: 2 } },
  { label: '❄️ Śiśira (Freezing Dry Polar Gale)', env: { ritu: 'sisira', heat: 1, cold: 9, dry: 9, moist: 2, activity: 8 } },
  { label: '🌸 Vasanta (Kapha-Liquefying Spring)', env: { ritu: 'vasanta', heat: 5, cold: 5, dry: 3, moist: 8, activity: 3 } },
];

const clamp = (n: number) => Math.max(0, Math.min(100, n));

/**
 * Interdependent Thermodynamic Tri-Doṣa Model
 * Vāta (Kinetic Flux), Pitta (Thermal Flux), Kapha (Structural Viscosity)
 * Interconnected: Sliding Pitta up automatically heats & thins Kapha and accelerates Vāta.
 */
const calculateThermodynamicDoshas = (e: Env) => {
  const d = (n: number) => n - 5;
  const r = RITU[e.ritu];

  // 1. Initial environmental excitation
  const rawPitta = 50 + 5.5 * d(e.heat) - 3.5 * d(e.cold) + 0.8 * d(e.activity) + r.p;
  const rawVata = 50 + 3.8 * d(e.dry) + 2.4 * d(e.cold) + 3.2 * d(e.activity) - 2.5 * d(e.moist) + r.v;
  const rawKapha = 50 + 4.2 * d(e.moist) + 2.0 * d(e.cold) - 3.2 * d(e.activity) - 2.8 * d(e.heat) - 2.0 * d(e.dry) + r.k;

  // 2. Interdependent biophysical cross-coupling
  // High Pitta (heat) accelerates molecular speed (Vata) and denatures structural viscosity (Kapha)
  const pittaDelta = rawPitta - 50;
  const vataCross = rawVata + 0.35 * Math.max(0, pittaDelta);
  const kaphaCross = rawKapha - 0.42 * Math.max(0, pittaDelta);

  // High Kapha (density) dampens kinetic transport (Vata) and buffers thermal spikes (Pitta)
  const kaphaDelta = kaphaCross - 50;
  const vataCoupled = vataCross - 0.28 * Math.max(0, kaphaDelta);
  const pittaCoupled = rawPitta - 0.22 * Math.max(0, kaphaDelta);

  // High Vata (shear stress) dehydrates cell and erodes structural Kapha
  const vataDelta = vataCoupled - 50;
  const finalKapha = kaphaCross - 0.25 * Math.max(0, vataDelta);

  return {
    vata: clamp(Math.round(vataCoupled)),
    pitta: clamp(Math.round(pittaCoupled)),
    kapha: clamp(Math.round(finalKapha)),
  };
};

const SAMA_LO = 40;
const SAMA_HI = 60;
const inSama = (n: number) => n >= SAMA_LO && n <= SAMA_HI;

const DOSHA = [
  { key: 'vata' as const, dev: 'वात', iast: 'vāta', color: '#8b5cf6', soft: '#c4b5fd', bhuta: 'vāyu + ākāśa', vector: 'Kinetic Flux & Transport Velocity (V⃗)', q: 'dry · cold · light · mobile · kinetic' },
  { key: 'pitta' as const, dev: 'पित्त', iast: 'pitta', color: '#f97316', soft: '#fdba74', bhuta: 'tejas + ap', vector: 'Enzymatic Catalysis Rate & Thermal Flux (ΔH)', q: 'hot · sharp · penetrating · metabolic' },
  { key: 'kapha' as const, dev: 'कफ', iast: 'kapha', color: '#10b981', soft: '#6ee7b7', bhuta: 'pṛthivī + ap', vector: 'Structural Viscosity & Volumetric Density (ρ)', q: 'heavy · cold · moist · stable · structural' },
];

const TERMS: LabTerm[] = [
  { dev: 'यथा पिण्डे तथा ब्रह्माण्डे', iast: 'yathā piṇḍe tathā brahmāṇḍe', en: 'As in the body (microcosm), so in the cosmos (macrocosm)', note: 'the foundation of indigenous systems biology' },
  { dev: 'समत्व', iast: 'samatva', en: 'Dynamic Homeostasis / Equilibrium', note: 'the viable physiological window (40–60%)' },
  { dev: 'द्रव्य-गुण-कर्म', iast: 'dravya-guṇa-karma', en: 'Substance, Quality, and Action', note: 'triad of pharmacological counter-forces' },
  { dev: 'वात', iast: 'vāta', en: 'Kinetic transport vector (V⃗)', note: 'Vāyu + Ākāśa: diffusion, ion pumps, neural firing' },
  { dev: 'पित्त', iast: 'pitta', en: 'Thermal & metabolic flux vector (ΔH)', note: 'Tejas + Ap: ATP hydrolysis, enzymatic digestion' },
  { dev: 'कफ', iast: 'kapha', en: 'Structural viscosity & density (ρ)', note: 'Pṛthivī + Ap: cytoskeletal stability, lipid hydration' },
  { dev: 'मण्डूक-गति', iast: 'maṇḍūka-gati', en: 'Frog-like pulse waveform (Pitta signature)', note: 'sharp, turbulent high-frequency kinetic spikes' },
  { dev: 'सर्प-गति', iast: 'sarpa-gati', en: 'Snake-like pulse waveform (Vāta signature)', note: 'rapid, winding, irregular low-viscosity oscillations' },
  { dev: 'हंस-गति', iast: 'haṁsa-gati', en: 'Swan-like pulse waveform (Kapha signature)', note: 'slow, deep, majestic high-viscosity rhythm' },
  { dev: 'ऋतुचर्या', iast: 'ṛtucaryā', en: 'Seasonal adaptation protocol', note: 'countering macro-environmental perturbations' },
  { dev: 'आम-शोधन', iast: 'āma-śodhana', en: 'Cellular autophagy & metabolic detoxification', note: 'purging oxidized cellular aggregates' },
];

const CHALLENGES: LabChallenge[] = [
  {
    q: 'During the intense thermal agitation of Grīṣma Ṛtu (Summer), the intracellular Tejas spike causes a dramatic rise in Pitta. If left uncompensated, what is the immediate structural consequence on the cell membrane, and which Guṇa countermeasure must be deployed to restore Samatva?',
    options: [
      'Viscosity increases (Kapha accumulation); deploy Laghu-Trikaṭu to dissolve stagnation.',
      'Lipid bilayer fluidizes rapidly, causing structural failure due to excessive Tīkṣṇa (Sharp/Penetrating) and Uṣṇa (Hot) qualities; deploy Śīta-Ghṛta (Cooling/Cohesive Lipid Matrix) to stabilize structural integrity.',
      'Cytosolic volume collapses into Ākāśa (Space void); deploy Vāyu vectors to accelerate transpiration.',
      'Mitochondria freeze instantly; deploy solar radiation to burn the cytoplasm.',
    ],
    answer: 1,
    explain: 'Excessive thermal flux (Pitta) fluidizes membrane lipids and denatures channel proteins. The classical Ayurvedic countermeasure is Śīta-Ghṛta (cooling, stabilizing, cohesive lipid matrix), counteracting Uṣṇa with Śīta and restoring structural integrity.',
  },
  {
    q: 'How does Ākāśa (Space) function in cellular mechanics rather than being just an empty void?',
    options: [
      'It acts as heavy weight to keep the cell grounded on the microscope slide.',
      'It provides the intracellular void (cytosol & lumen volume) allowing molecular diffusion trajectories without steric crowding.',
      'It produces ATP energy through nuclear fission.',
      'It consumes all other elements into nothingness.',
    ],
    answer: 1,
    explain: 'Ākāśa is non-crowding spatial openness (Avakāśa). In systems cell biology, it represents the structural volume and mean free path permitting molecules and enzymes to navigate diffusion trajectories without steric hindrance.',
  },
  {
    q: 'Which cellular functional mechanism directly mirrors Vāyu (Air) at the sub-cellular scale?',
    options: [
      'The dense bone mineral lattice.',
      'Transmembrane transport: active ion gradients (Na⁺/K⁺ ATPase pumps) and respiratory gas exchange (O₂ influx / CO₂ efflux).',
      'The watery lipid bilayer solvent.',
      'The nucleus genetic code alone.',
    ],
    answer: 1,
    explain: 'Vāyu is kinetic movement and pressure differential. At the cellular level, active transmembrane transport, ion gradient pumps, and gas diffusion are the direct biophysical equivalents of Vāyu.',
  },
  {
    q: 'In radial pulse tactile diagnostics (Nāḍī-Parīkṣā), why does high Pitta trigger Maṇḍūka-Gati (Frog-like jump)?',
    options: [
      'The patient transforms into an amphibian.',
      'Excessive thermal flux causes turbulent kinetic transitions and abrupt systolic ejection spikes, producing sharp, high-frequency jumping waveforms.',
      'The blood becomes completely frozen.',
      'Vāyu stops moving altogether.',
    ],
    answer: 1,
    explain: 'Maṇḍūka-Gati mathematically reflects turbulent kinetic transitions caused by high thermal flux (ΔH) and sharp pulse velocity, manifesting tactilely as a leaping, bounding frog-like wave.',
  },
];

type CellOrganelle = 'akasa' | 'vayu' | 'tejas' | 'ap' | 'prthivi';
interface OrganelleData {
  element: string;
  dev: string;
  title: string;
  functionalRole: string;
  biophysicalMetric: string;
  icon: string;
  color: string;
}

const ORGANELLES: Record<CellOrganelle, OrganelleData> = {
  akasa: {
    element: 'Ākāśa (Space)',
    dev: 'आकाश',
    title: 'The Intracellular Void',
    functionalRole: 'Structural volume of cytosol & lumen permitting molecular diffusion without steric crowding.',
    biophysicalMetric: 'Cytosolic Mean Free Path & Steric Clearance',
    icon: '🌌',
    color: '#a855f7',
  },
  vayu: {
    element: 'Vāyu (Air)',
    dev: 'वायु',
    title: 'Transmembrane Transport & Flux',
    functionalRole: 'Active kinetic movement of ions (Na⁺/K⁺ ATPase pumps) and respiratory gas exchange (O₂ influx, CO₂ efflux).',
    biophysicalMetric: 'Electrochemical Ion Flux (V⃗ = 1.4 m/s)',
    icon: '💨',
    color: '#38bdf8',
  },
  tejas: {
    element: 'Tejas (Fire)',
    dev: 'तेजस्',
    title: 'Mitochondrial ATP Synthesis',
    functionalRole: 'Metabolic transformations, enzymatic catalysis, and electron transport chain breakdown.',
    biophysicalMetric: 'Proton Gradient (ΔΨm = -140 mV) & ATP Yield',
    icon: '🔥',
    color: '#f97316',
  },
  ap: {
    element: 'Ap (Water)',
    dev: 'अप्',
    title: 'Cytoplasmic Hydration & Bilayer Solvent',
    functionalRole: 'Fluid solvent matrix supporting protein folding, osmotic turgor, and lipid bilayer mobility.',
    biophysicalMetric: 'Osmotic Turgor Pressure & Lipid Fluidity (η)',
    icon: '💧',
    color: '#06b6d4',
  },
  prthivi: {
    element: 'Pṛthivī (Earth)',
    dev: 'पृथिवी',
    title: 'The Cytoskeletal Matrix',
    functionalRole: 'Dense structural polymers (microtubules, actin filaments) providing physical geometry and mechanical rigidity.',
    biophysicalMetric: 'Cytoskeletal Young’s Modulus (E = 2.4 kPa)',
    icon: '🪨',
    color: '#10b981',
  },
};

const Dial: React.FC<{ label: string; value: number; onChange: (n: number) => void; testId: string; color: string }> = ({ label, value, onChange, testId, color }) => (
  <DialKnob label={label} ariaLabel={label.replace(/^\S+\s/, '')} value={value} min={0} max={10} step={1} onChange={onChange} format={(x) => `${Math.round(x)} / 10`} color={color} size={78} testId={testId} />
);

export const PrakritiBalance: React.FC = () => {
  // Phase Nav: 1 = Sub-Cellular Composition, 2 = Thermodynamic Vectors, 3 = Diagnostic Feedback Loop
  const [activePhase, setActivePhase] = useState<1 | 2 | 3>(2);
  const [selectedOrganelle, setSelectedOrganelle] = useState<CellOrganelle>('tejas');
  const [env, setEnv] = useState<Env>(SCENARIOS[0].env);
  const [gameScore, setGameScore] = useState<number>(150);
  const [activeActions, setActiveActions] = useState<Record<string, boolean>>({});

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Compute live interdependent Doṣas
  const lv = useMemo(() => calculateThermodynamicDoshas(env), [env]);
  const allSama = inSama(lv.vata) && inSama(lv.pitta) && inSama(lv.kapha);

  const setParam = (k: keyof Env) => (n: number) => {
    setEnv((e) => ({ ...e, [k]: n }));
  };

  // Pulse Waveform diagnostics
  const nadiGati = useMemo(() => {
    if (allSama) {
      return {
        name: 'Sama-Nāḍī (सम-नाडी)',
        type: 'sama',
        desc: 'Harmonious, steady harmonic oscillation (सम-स्पन्दनम्) · Zero turbulent strain',
        icon: '🌸',
        color: '#10b981',
        freq: 1.2,
      };
    }
    if (lv.pitta >= lv.vata && lv.pitta >= lv.kapha && lv.pitta > 55) {
      return {
        name: 'Maṇḍūka-Gati (मण्डूक-गतिः)',
        type: 'pitta',
        desc: 'Sharp, jumping frog-like pulse (तीक्ष्ण-प्लवः) · High thermal flux & denaturation risk',
        icon: '🐸',
        color: '#f97316',
        freq: 2.8,
      };
    }
    if (lv.vata >= lv.kapha && lv.vata > 55) {
      return {
        name: 'Sarpa-Gati (सर्प-गतिः)',
        type: 'vata',
        desc: 'Quick, winding, subtle snake-like pulse (चपल-गतिः) · Membrane shear fluctuation',
        icon: '🐍',
        color: '#8b5cf6',
        freq: 3.5,
      };
    }
    if (lv.kapha > 55) {
      return {
        name: 'Haṃsa-Gati (हंस-गतिः)',
        type: 'kapha',
        desc: 'Slow, deep, broad swan-like rhythm (गम्भीर-मन्द-गतिः) · High viscous stagnation',
        icon: '🦢',
        color: '#0284c7',
        freq: 0.8,
      };
    }
    return {
      name: 'Madhyama-Gati (मध्यम-गतिः)',
      type: 'mixed',
      desc: 'Transitional mixed pulse rhythm',
      icon: '🌿',
      color: '#38bdf8',
      freq: 1.6,
    };
  }, [allSama, lv]);

  // Real-time Canvas Pulse Waveform Oscilloscope Generator
  useEffect(() => {
    let animId: number;
    let t = 0;

    const renderWave = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Grid background
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
      ctx.lineWidth = 1;
      const gridSize = 20;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Centerline
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, h / 2);
      ctx.lineTo(w, h / 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Waveform based on active Nāḍī Pulse Type
      ctx.beginPath();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = nadiGati.color;
      ctx.shadowColor = nadiGati.color;
      ctx.shadowBlur = 8;

      const midY = h / 2;
      const amp = allSama ? 28 : 42;

      for (let x = 0; x < w; x++) {
        const xNorm = x / w;
        let waveY = 0;

        if (nadiGati.type === 'sama') {
          // Smooth harmonic sine oscillation
          waveY = Math.sin(xNorm * Math.PI * 8 + t * 4) * amp;
        } else if (nadiGati.type === 'pitta') {
          // Maṇḍūka-Gati: Sharp, jumping frog-like spiked crests with sudden steep drops
          const phase = (xNorm * 10 + t * 6) % 1;
          const jump = phase < 0.25 ? Math.pow(phase / 0.25, 3) * 1.3 : Math.exp(-4 * (phase - 0.25));
          waveY = (jump * 2 - 1) * amp + Math.sin(xNorm * 20 + t * 8) * 8;
        } else if (nadiGati.type === 'vata') {
          // Sarpa-Gati: Quick, winding, delicate irregular ripples
          waveY =
            Math.sin(xNorm * 18 + t * 7) * (amp * 0.7) +
            Math.sin(xNorm * 36 - t * 5) * (amp * 0.35) +
            Math.sin(xNorm * 6 + t * 2) * (amp * 0.2);
        } else if (nadiGati.type === 'kapha') {
          // Haṁsa-Gati: Slow, deep, stately, broad rounded wave
          waveY = Math.sin(xNorm * Math.PI * 4 + t * 2) * (amp * 1.1);
        } else {
          waveY = Math.sin(xNorm * Math.PI * 6 + t * 3.5) * amp;
        }

        const plotY = midY - waveY;
        if (x === 0) ctx.moveTo(x, plotY);
        else ctx.lineTo(x, plotY);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      t += 0.016;
      animId = requestAnimationFrame(renderWave);
    };

    animId = requestAnimationFrame(renderWave);
    return () => cancelAnimationFrame(animId);
  }, [nadiGati, allSama]);

  // Actions Panel implementation
  const toggleAction = (id: string, effect: () => void) => {
    soundEffects.playPuzzleSnap();
    effect();
    setActiveActions((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      return next;
    });
    setGameScore((s) => s + 25);
  };

  const applyRemedyAction = (type: 'sita_ghrita' | 'trikatu' | 'taila' | 'dampen_mito' | 'ion_pumps' | 'influx_ap' | 'excrete_toxins' | 'triphala') => {
    switch (type) {
      case 'sita_ghrita':
        // Cools Pitta (-4), adds protective Kapha (+3), lowers heat
        setEnv((e) => ({ ...e, heat: Math.max(1, e.heat - 4), cold: Math.min(10, e.cold + 3), moist: Math.min(10, e.moist + 2) }));
        break;
      case 'trikatu':
        // Melts Kapha (-4), heats dampness (-4), activates metabolism
        setEnv((e) => ({ ...e, moist: Math.max(1, e.moist - 4), dry: Math.min(10, e.dry + 3), heat: Math.min(10, e.heat + 3), activity: Math.min(10, e.activity + 2) }));
        break;
      case 'taila':
        // Pacifies Vāta (-4), reduces dryness (-4), restores lipid warmth
        setEnv((e) => ({ ...e, dry: Math.max(1, e.dry - 4), moist: Math.min(10, e.moist + 3), cold: Math.max(1, e.cold - 3), heat: Math.min(10, e.heat + 2) }));
        break;
      case 'dampen_mito':
        // Throttles runaway mitochondrial respiration, dropping heat directly
        setEnv((e) => ({ ...e, heat: Math.max(1, e.heat - 3), activity: Math.max(1, e.activity - 2) }));
        break;
      case 'ion_pumps':
        // Normalizes transmembrane gradient & activity
        setEnv((e) => ({ ...e, activity: 5, dry: Math.max(1, e.dry - 2) }));
        break;
      case 'influx_ap':
        // Influx solvent, boosts moisture directly
        setEnv((e) => ({ ...e, moist: Math.min(10, e.moist + 4), dry: Math.max(1, e.dry - 3) }));
        break;
      case 'excrete_toxins':
      case 'triphala':
        // Normalizes all dials towards 5
        setEnv((e) => ({
          ...e,
          heat: Math.round((e.heat + 5) / 2),
          cold: Math.round((e.cold + 5) / 2),
          dry: Math.round((e.dry + 5) / 2),
          moist: Math.round((e.moist + 5) / 2),
          activity: Math.round((e.activity + 5) / 2),
        }));
        break;
    }
  };

  // Missions Check
  const missions = [
    { label: 'Achieve Dynamic Samatva: All three vectors within 40–60% window', ok: allSama },
    { label: 'Counter Harsh Summer (Grīṣma): Bring Pitta below 60% via Śīta-Ghṛta', ok: lv.pitta <= 60 },
    { label: 'Map All 5 Sub-Cellular Organelles in Phase 1', ok: true },
  ];

  // Barycentric centroid calculation for Tri-Doṣa Vector Triangle
  // Triangle Vertices: Top = Pitta (160, 30), Bottom-Left = Vata (40, 210), Bottom-Right = Kapha (280, 210)
  const centroid = useMemo(() => {
    const total = lv.vata + lv.pitta + lv.kapha || 1;
    const wV = lv.vata / total;
    const wP = lv.pitta / total;
    const wK = lv.kapha / total;

    const x = 40 * wV + 160 * wP + 280 * wK;
    const y = 210 * wV + 30 * wP + 210 * wK;
    return { x, y };
  }, [lv]);

  return (
    <div className="vl-sim vl-cell-homeostasis-bench">
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
            <blockquote style={{ borderLeft: '3px solid #10b981', margin: '0.65rem 0', paddingLeft: '0.85rem', fontStyle: 'italic', color: '#10b981' }}>
              “Neither charms nor blind rituals can substitute for rigorous observation of nature. The human organism is an open
              microcosm mirroring the macrocosm: yathā piṇḍe tathā brahmāṇḍe.”
            </blockquote>
            <p>
              Without automated centrifuges or electron microscopes, ancient physicians developed extraordinarily refined observational diagnostics.
              They mastered radial pulse tactile sensitivity (<em>Nāḍī-Parīkṣā</em>), identified diabetes (<em>Madhumeha</em>) by observing
              ants attracted to sweet urine (centuries before Thomas Willis in Europe, 1674), and codified surgical anatomy in the <em>Suśruta Saṃhitā</em>,
              pioneering reconstructive rhinoplasty flaps, cataract couching, and sterile surgical instruments designed after nature’s archetypes.
            </p>
          </>
        }
        epistemologyAndMethod={
          <>
            Āyurvedic science was governed by <strong>Yukti-Vyapāśraya</strong> (rational therapeutic logic) and threefold clinical diagnosis:
            <strong>Darśana</strong> (visual inspection), <strong>Sparśana</strong> (palpation and pulse diagnosis), and <strong>Praśna</strong> (in-depth patient interrogation).
            The cellular organism operates not as an inert machine, but as an open thermodynamic micro-system:
            <em>Vāta</em> coordinates kinetic transport and ion flux; <em>Pitta</em> governs enzymatic catalysis and thermal flux;
            <em>Kapha</em> regulates structural cohesion, lipid membranes, and protective matrix viscosity.
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

      {/* =========================================================================
          1. 🕹️ UI INTERACTIVE MISSION DASHBOARD
          ========================================================================= */}
      <div className="vl-mission-dash">
        <div className="vl-dash-top-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <span className="vl-dash-station-pill">🟢 BIO-DYNAMIC BENCH: STATION 2 / 8</span>
            <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#f8fafc' }}>
              CELLULAR HOMEOSTASIS CRUCIBLE (समत्व-परीक्षणम्)
            </span>
          </div>
          <span className="vl-dash-score-pill">🏆 SCORE: {gameScore} PTS</span>
        </div>

        {/* Live Season Stressor Banner */}
        <div className="vl-dash-env-banner">
          <div>
            <strong style={{ color: '#fed7aa', fontSize: '0.9rem' }}>
              [ LIVE ENV: {RITU[env.ritu].dev} ({RITU[env.ritu].iast.toUpperCase()} · {RITU[env.ritu].en.toUpperCase()}) ]
            </strong>
            <span style={{ margin: '0 0.5rem', opacity: 0.5 }}>──&gt;</span>
            <span style={{ color: '#f1f5f9', fontSize: '0.85rem' }}>
              Affects: Heat <strong>[{env.heat}/10]</strong> | Dryness <strong>[{env.dry}/10]</strong> | Moisture <strong>[{env.moist}/10]</strong>
            </span>
          </div>
          <div style={{ display: 'flex', gap: '0.35rem' }}>
            {RITU_ORDER.map((r) => (
              <button
                key={r}
                type="button"
                className={`vl-chip${env.ritu === r ? ' is-active' : ''}`}
                style={{
                  fontSize: '0.72rem',
                  padding: '0.15rem 0.45rem',
                  borderColor: env.ritu === r ? '#f97316' : undefined,
                  background: env.ritu === r ? 'rgba(249, 115, 22, 0.2)' : undefined,
                }}
                onClick={() => setEnv((e) => ({ ...e, ritu: r }))}
              >
                {RITU[r].dev}
              </button>
            ))}
          </div>
        </div>

        {/* System Status Alert Box */}
        <div className={`vl-dash-status-box${allSama ? ' is-sama' : ''}`}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
            <strong style={{ color: allSama ? '#34d399' : '#f87171', fontSize: '0.86rem' }}>
              {allSama ? '✨ [ SYSTEM STATUS: SAMATVA STABLE · OPTIMAL CELLULAR EQUILIBRIUM ]' : '⚠️ [ SYSTEM STATUS: CRITICAL DISRUPTION DETECTED ]'}
            </strong>
            <span style={{ fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace', color: '#cbd5e1' }}>
              V: {lv.vata}% | P: {lv.pitta}% | K: {lv.kapha}%
            </span>
          </div>
          <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.82rem', color: '#e2e8f0', lineHeight: 1.5 }}>
            {lv.pitta > 60 && (
              <li style={{ color: '#fca5a5' }}>
                * <strong>Pitta Vector Spiking:</strong> Exceeding thermal threshold ({lv.pitta}%). Risk of protein denaturation and lipid bilayer breakdown.
              </li>
            )}
            {lv.vata > 60 && (
              <li style={{ color: '#c4b5fd' }}>
                * <strong>Vāta Kinetic Flux Spiking:</strong> High shear velocity ({lv.vata}%) causing membrane deformation and osmotic dehydration.
              </li>
            )}
            {lv.kapha > 60 && (
              <li style={{ color: '#6ee7b7' }}>
                * <strong>Kapha Density Stagnation:</strong> High viscosity ({lv.kapha}%) halting molecular transport and nutrient delivery.
              </li>
            )}
            {allSama && (
              <li style={{ color: '#86efac' }}>
                * All three thermodynamic forces are centered within the viable homeostasis window (40–60%). Cytoplasm, pumps, and organelles operate harmoniously.
              </li>
            )}
          </ul>
        </div>

        {/* Active Actions Panel */}
        <div className="vl-actions-matrix">
          {/* Column 1: Dravya-Guṇa Formulation */}
          <div className="vl-action-col">
            <div className="vl-action-col-header">
              <span>💊</span>
              <span>Dravya-Guṇa Formulation</span>
            </div>
            <button
              type="button"
              className={`vl-action-btn${activeActions['sita_ghrita'] ? ' is-active' : ''}`}
              onClick={() => toggleAction('sita_ghrita', () => applyRemedyAction('sita_ghrita'))}
            >
              <span>🥥 Śīta-Ghṛta (Cooling Lipid)</span>
              <span style={{ fontSize: '0.7rem', color: '#38bdf8' }}>-Heat / +Lipid</span>
            </button>
            <button
              type="button"
              className={`vl-action-btn${activeActions['trikatu'] ? ' is-active' : ''}`}
              onClick={() => toggleAction('trikatu', () => applyRemedyAction('trikatu'))}
            >
              <span>🍯 Laghu-Trikaṭu (Activator)</span>
              <span style={{ fontSize: '0.7rem', color: '#f59e0b' }}>-Kapha / +Heat</span>
            </button>
            <button
              type="button"
              className={`vl-action-btn${activeActions['taila'] ? ' is-active' : ''}`}
              onClick={() => toggleAction('taila', () => applyRemedyAction('taila'))}
            >
              <span>🫖 Snigdha-Taila (Nourishing Oil)</span>
              <span style={{ fontSize: '0.7rem', color: '#a78bfa' }}>-Vāta / +Moist</span>
            </button>
          </div>

          {/* Column 2: Metabolic Regulation */}
          <div className="vl-action-col">
            <div className="vl-action-col-header">
              <span>⚡</span>
              <span>Metabolic Regulation</span>
            </div>
            <button
              type="button"
              className={`vl-action-btn${activeActions['dampen_mito'] ? ' is-active' : ''}`}
              onClick={() => toggleAction('dampen_mito', () => applyRemedyAction('dampen_mito'))}
            >
              <span>🛑 Dampen Mitochondrial Flux</span>
              <span style={{ fontSize: '0.7rem', color: '#fb923c' }}>-ΔH Thermal</span>
            </button>
            <button
              type="button"
              className={`vl-action-btn${activeActions['ion_pumps'] ? ' is-active' : ''}`}
              onClick={() => toggleAction('ion_pumps', () => applyRemedyAction('ion_pumps'))}
            >
              <span>⚡ Accelerate Ion Pumps (Na⁺/K⁺)</span>
              <span style={{ fontSize: '0.7rem', color: '#38bdf8' }}>Calm Shear</span>
            </button>
            <button
              type="button"
              className={`vl-action-btn${activeActions['triphala'] ? ' is-active' : ''}`}
              onClick={() => toggleAction('triphala', () => applyRemedyAction('triphala'))}
            >
              <span>🌿 Triphalā (Samatva Rasāyana)</span>
              <span style={{ fontSize: '0.7rem', color: '#4ade80' }}>Reset 50%</span>
            </button>
          </div>

          {/* Column 3: Osmotic Balance */}
          <div className="vl-action-col">
            <div className="vl-action-col-header">
              <span>🌊</span>
              <span>Osmotic Balance</span>
            </div>
            <button
              type="button"
              className={`vl-action-btn${activeActions['influx_ap'] ? ' is-active' : ''}`}
              onClick={() => toggleAction('influx_ap', () => applyRemedyAction('influx_ap'))}
            >
              <span>💧 Influx Ap-Dravya (Solvent)</span>
              <span style={{ fontSize: '0.7rem', color: '#22d3ee' }}>+Turgor</span>
            </button>
            <button
              type="button"
              className={`vl-action-btn${activeActions['excrete_toxins'] ? ' is-active' : ''}`}
              onClick={() => toggleAction('excrete_toxins', () => applyRemedyAction('excrete_toxins'))}
            >
              <span>🧹 Excrete Toxins (Āma-Śodhana)</span>
              <span style={{ fontSize: '0.7rem', color: '#a3e635' }}>Autophagy</span>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. DEEPENING THE 3-STEP INTEGRATION MATRIX (SYSTEMS BIOLOGY PHASES)
          ========================================================================= */}
      <nav className="vl-phase-stepper" aria-label="Systems Biology Phases">
        <button
          type="button"
          className={`vl-phase-step-btn${activePhase === 1 ? ' is-active' : ''}`}
          onClick={() => setActivePhase(1)}
        >
          <span className="vl-phase-step-num">PHASE 1 · SUB-CELLULAR COMPOSITION</span>
          <span className="vl-phase-step-title">🔬 Pañcamahābhūta Molecular Map</span>
        </button>
        <button
          type="button"
          className={`vl-phase-step-btn${activePhase === 2 ? ' is-active' : ''}`}
          onClick={() => setActivePhase(2)}
        >
          <span className="vl-phase-step-num">PHASE 2 · THERMODYNAMIC DRIVERS</span>
          <span className="vl-phase-step-title">⚖️ Tri-Doṣa Vector Balancing</span>
        </button>
        <button
          type="button"
          className={`vl-phase-step-btn${activePhase === 3 ? ' is-active' : ''}`}
          onClick={() => setActivePhase(3)}
        >
          <span className="vl-phase-step-num">PHASE 3 · MACRO-SYSTEM FEEDBACK</span>
          <span className="vl-phase-step-title">📈 Pulse Waveform Analysis (Nāḍī)</span>
        </button>
      </nav>

      {/* =========================================================================
          PHASE 1: SUB-CELLULAR COMPOSITION (Pañcamahābhūta Functional Allocation)
          ========================================================================= */}
      {activePhase === 1 && (
        <div className="vl-sandbox">
          <div className="vl-grid-2">
            <div>
              <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.15rem', color: '#f8fafc' }}>
                🧬 Pañcamahābhūta Sub-Cellular Organelle Map
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.55, margin: '0 0 1rem' }}>
                The five elements in systems biology are not arbitrary symbols: each corresponds to an explicit structural and kinetic mechanism of the cell:
              </p>

              {/* Interactive Dynamic Morphing Cell SVG */}
              <div style={{ background: '#020617', padding: '1rem', borderRadius: '14px', border: '1px solid rgba(56, 189, 248, 0.25)', textAlign: 'center' }}>
                <svg viewBox="0 0 460 300" style={{ width: '100%', maxHeight: '280px', display: 'block' }}>
                  {/* Outer lipid membrane with Vāta kinetic undulations and Ap osmotic turgor */}
                  <defs>
                    <radialGradient id="cytoGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#0f172a" />
                      <stop offset="70%" stopColor="#082f49" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#0369a1" stopOpacity="0.4" />
                    </radialGradient>
                    <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* 1. Cytoplasm & Intracellular Void (Ākāśa) */}
                  <ellipse
                    cx={230}
                    cy={150}
                    rx={185}
                    ry={115}
                    fill="url(#cytoGrad)"
                    stroke="#0284c7"
                    strokeWidth={4}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSelectedOrganelle('akasa')}
                  />

                  {/* 2. Microtubule / Actin Cytoskeleton Matrix (Pṛthivī) */}
                  <g
                    stroke="#10b981"
                    strokeWidth={1.5}
                    opacity={selectedOrganelle === 'prthivi' ? 0.9 : 0.4}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSelectedOrganelle('prthivi')}
                  >
                    <path d="M 80 140 Q 150 90 230 110 T 380 150" fill="none" strokeDasharray="3,3" />
                    <path d="M 100 170 Q 200 200 300 180 T 370 140" fill="none" strokeDasharray="3,3" />
                    <path d="M 180 60 Q 220 140 240 240" fill="none" strokeDasharray="3,3" />
                    <path d="M 280 65 Q 260 150 300 235" fill="none" strokeDasharray="3,3" />
                  </g>

                  {/* 3. Mitochondria (Tejas) */}
                  <g
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSelectedOrganelle('tejas')}
                    filter={selectedOrganelle === 'tejas' ? 'url(#glowFilter)' : undefined}
                  >
                    {/* Mito 1 */}
                    <ellipse cx={130} cy={110} rx={34} ry={18} fill="#7c2d12" stroke="#ea580c" strokeWidth={2.5} />
                    <path d="M 106 110 Q 118 98 130 110 T 154 110" fill="none" stroke="#fed7aa" strokeWidth={1.8} />
                    <text x={130} y={114} textAnchor="middle" fontSize={9} fill="#fef08a" fontWeight="bold">ATP (तेजस्)</text>

                    {/* Mito 2 */}
                    <ellipse cx={330} cy={180} rx={30} ry={16} fill="#7c2d12" stroke="#ea580c" strokeWidth={2.5} />
                    <path d="M 310 180 Q 320 170 330 180 T 350 180" fill="none" stroke="#fed7aa" strokeWidth={1.8} />
                  </g>

                  {/* 4. Nucleus Center */}
                  <circle cx={230} cy={150} r={36} fill="#1e1b4b" stroke="#6366f1" strokeWidth={3} />
                  <circle cx={230} cy={150} r={14} fill="#4338ca" />
                  <text x={230} y={154} textAnchor="middle" fontSize={10} fill="#e0e7ff" fontWeight="bold">NUCLEUS</text>

                  {/* 5. Transmembrane Ion Pumps (Vāyu) */}
                  <g
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSelectedOrganelle('vayu')}
                    filter={selectedOrganelle === 'vayu' ? 'url(#glowFilter)' : undefined}
                  >
                    {/* Top Ion Pump */}
                    <rect x={215} y={30} width={30} height={12} rx={4} fill="#0284c7" stroke="#38bdf8" strokeWidth={2} />
                    <path d="M 230 18 L 230 46" stroke="#38bdf8" strokeWidth={2.5} markerEnd="url(#arrBlue)" />
                    <text x={230} y={14} textAnchor="middle" fontSize={8} fill="#38bdf8" fontWeight="bold">Na⁺/K⁺ (वायु)</text>

                    {/* Gas Exchange Arrows */}
                    <path d="M 405 130 L 375 142" stroke="#a78bfa" strokeWidth={2} />
                    <text x={415} y={130} fontSize={8} fill="#a78bfa">O₂ In</text>
                    <path d="M 380 160 L 410 172" stroke="#f43f5e" strokeWidth={2} />
                    <text x={415} y={178} fontSize={8} fill="#f43f5e">CO₂ Out</text>
                  </g>

                  {/* 6. Hydration Solvent (Ap) */}
                  <g
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSelectedOrganelle('ap')}
                  >
                    <circle cx={170} cy={200} r={16} fill="rgba(6, 182, 212, 0.25)" stroke="#06b6d4" strokeWidth={1.5} />
                    <text x={170} y={204} textAnchor="middle" fontSize={8} fill="#67e8f9">H₂O (अप्)</text>
                    <circle cx={290} cy={95} r={14} fill="rgba(6, 182, 212, 0.25)" stroke="#06b6d4" strokeWidth={1.5} />
                    <text x={290} y={98} textAnchor="middle" fontSize={8} fill="#67e8f9">H₂O</text>
                  </g>
                </svg>
              </div>

              {/* Selector Buttons */}
              <div style={{ display: 'flex', gap: '0.45rem', marginTop: '0.85rem', flexWrap: 'wrap' }}>
                {(Object.keys(ORGANELLES) as CellOrganelle[]).map((org) => (
                  <button
                    key={org}
                    type="button"
                    className={`vl-chip${selectedOrganelle === org ? ' is-active' : ''}`}
                    onClick={() => {
                      soundEffects.playPuzzleSnap();
                      setSelectedOrganelle(org);
                    }}
                    style={{
                      borderColor: selectedOrganelle === org ? ORGANELLES[org].color : undefined,
                      color: selectedOrganelle === org ? ORGANELLES[org].color : undefined,
                    }}
                  >
                    {ORGANELLES[org].icon} {ORGANELLES[org].element}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Organelle Deep Dive Card */}
            <div>
              {(() => {
                const cur = ORGANELLES[selectedOrganelle];
                return (
                  <div
                    style={{
                      background: 'rgba(15, 23, 42, 0.95)',
                      border: `1.5px solid ${cur.color}`,
                      borderRadius: '14px',
                      padding: '1.25rem',
                      boxShadow: `0 8px 24px rgba(0,0,0,0.5), inset 0 0 15px ${cur.color}15`,
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <span style={{ fontSize: '1.6rem' }}>{cur.icon}</span>
                      <span
                        style={{
                          fontFamily: 'JetBrains Mono, monospace',
                          fontSize: '0.72rem',
                          padding: '0.2rem 0.6rem',
                          borderRadius: '6px',
                          background: `${cur.color}20`,
                          color: cur.color,
                          fontWeight: 800,
                        }}
                      >
                        SUB-CELLULAR MECHANIC
                      </span>
                    </div>

                    <h4 style={{ margin: '0 0 0.35rem', fontSize: '1.25rem', color: '#f8fafc', fontWeight: 900 }}>
                      {cur.element} · <span lang="sa" style={{ color: cur.color }}>{cur.dev}</span>
                    </h4>
                    <div style={{ fontSize: '0.92rem', color: cur.color, fontWeight: 700, marginBottom: '0.85rem' }}>
                      {cur.title}
                    </div>

                    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.85rem', borderRadius: '10px', marginBottom: '0.85rem', borderLeft: `3px solid ${cur.color}` }}>
                      <strong style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                        Functional Systems Biological Role:
                      </strong>
                      <p style={{ margin: 0, fontSize: '0.86rem', color: '#e2e8f0', lineHeight: 1.55 }}>
                        {cur.functionalRole}
                      </p>
                    </div>

                    <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(148, 163, 184, 0.15)' }}>
                      <span style={{ fontSize: '0.74rem', color: '#94a3b8', display: 'block', textTransform: 'uppercase' }}>
                        Biophysical Measurable Vector:
                      </span>
                      <span style={{ fontSize: '0.88rem', color: '#fef08a', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}>
                        {cur.biophysicalMetric}
                      </span>
                    </div>
                  </div>
                );
              })()}

              <div style={{ marginTop: '1rem' }}>
                <CoreIdea>
                  <strong>Macro-Micro Resonance:</strong> Just as mountains form the Earth&rsquo;s crust and oceans buffer
                  global temperature, the cytoskeletal polymers (Pṛthivī) and cytoplasmic solvent (Ap) maintain the cell&rsquo;s
                  internal architecture against external seasonal fluctuations (Ṛtucaryā).
                </CoreIdea>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          PHASE 2: THERMODYNAMIC DRIVERS (Tri-Doṣa Vector Triangle & Biophysics)
          ========================================================================= */}
      {activePhase === 2 && (
        <div className="vl-sandbox" data-testid="prakriti-sandbox">
          <div className="vl-prakriti-grid">
            {/* Left Column: Environmental Dials */}
            <div className="vl-controls">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span className="vl-slider-label">Ṛtu · Season Stressor</span>
                <span style={{ fontSize: '0.78rem', color: '#f59e0b', fontWeight: 700 }}>
                  {RITU[env.ritu].iast.toUpperCase()}
                </span>
              </div>
              <div className="vl-leds" role="radiogroup" aria-label="Season">
                {RITU_ORDER.map((r) => (
                  <LedButton
                    key={r}
                    kind="radio"
                    on={env.ritu === r}
                    color="#facc15"
                    onClick={() => setEnv((x) => ({ ...x, ritu: r }))}
                    testId={`ritu-${r}`}
                    title={RITU[r].en}
                  >
                    <span lang="sa">{RITU[r].dev}</span> {RITU[r].iast}
                  </LedButton>
                ))}
              </div>

              <div className="vl-dials" style={{ marginTop: '1rem' }}>
                <Dial label="🔥 Heat" value={env.heat} onChange={setParam('heat')} testId="slider-heat" color="#fb923c" />
                <Dial label="❄️ Cold" value={env.cold} onChange={setParam('cold')} testId="slider-cold" color="#7dd3fc" />
                <Dial label="🏜️ Dryness" value={env.dry} onChange={setParam('dry')} testId="slider-dry" color="#fcd34d" />
                <Dial label="💧 Moisture" value={env.moist} onChange={setParam('moist')} testId="slider-moist" color="#38bdf8" />
                <Dial label="🏃 Activity" value={env.activity} onChange={setParam('activity')} testId="slider-activity" color="#a78bfa" />
              </div>
              <p className="vl-small" style={{ marginTop: '0.65rem' }}>
                💡 <em>Thermodynamic Interdependence:</em> Increasing heat directly elevates thermal flux (Pitta),
                which fluidizes structural polymers (Kapha ↓) and accelerates molecular speed (Vāta ↑).
              </p>
            </div>

            {/* Right Column: Live Vector Triangle & Thermodynamic Gauges */}
            <div className="vl-vector-triangle-card">
              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#7dd3fc' }}>
                  📐 TRI-DOṢA THERMODYNAMIC VECTOR TRIANGLE
                </span>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontFamily: 'JetBrains Mono, monospace',
                    color: allSama ? '#34d399' : '#f87171',
                    background: allSama ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                    padding: '0.15rem 0.5rem',
                    borderRadius: '5px',
                    fontWeight: 700,
                  }}
                >
                  {allSama ? 'SAMATVA EQUILIBRIUM ✓' : 'EQUILIBRIUM DISRUPTED'}
                </span>
              </div>

              {/* Equilateral Vector Triangle SVG */}
              <svg viewBox="0 0 320 250" style={{ width: '100%', maxHeight: '230px' }} data-testid="prakriti-stage">
                {/* Triangle Base */}
                <polygon
                  points="160,30 40,210 280,210"
                  fill="rgba(15, 23, 42, 0.6)"
                  stroke="rgba(148, 163, 184, 0.3)"
                  strokeWidth={2}
                />

                {/* Central Green Samatva Target Zone */}
                <circle cx={160} cy={150} r={32} fill="rgba(16, 185, 129, 0.18)" stroke="#10b981" strokeWidth={1.5} strokeDasharray="3 3" />
                <text x={160} y={154} textAnchor="middle" fontSize={9} fill="#86efac" fontWeight="bold">SAMATVA</text>

                {/* Vertex 1: Pitta (Top) */}
                <circle cx={160} cy={30} r={18} fill="#7c2d12" stroke="#f97316" strokeWidth={2.5} />
                <text x={160} y={34} textAnchor="middle" fontSize={11} fill="#fdba74" fontWeight="bold">पित्त</text>
                <text x={160} y={12} textAnchor="middle" fontSize={8.5} fill="#f97316">Pitta (ΔH: {lv.pitta}%)</text>

                {/* Vertex 2: Vata (Bottom-Left) */}
                <circle cx={40} cy={210} r={18} fill="#3b0764" stroke="#8b5cf6" strokeWidth={2.5} />
                <text x={40} y={214} textAnchor="middle" fontSize={11} fill="#c4b5fd" fontWeight="bold">वात</text>
                <text x={40} y={240} textAnchor="middle" fontSize={8.5} fill="#8b5cf6">Vāta (V⃗: {lv.vata}%)</text>

                {/* Vertex 3: Kapha (Bottom-Right) */}
                <circle cx={280} cy={210} r={18} fill="#064e3b" stroke="#10b981" strokeWidth={2.5} />
                <text x={280} y={214} textAnchor="middle" fontSize={11} fill="#6ee7b7" fontWeight="bold">कफ</text>
                <text x={280} y={240} textAnchor="middle" fontSize={8.5} fill="#10b981">Kapha (ρ: {lv.kapha}%)</text>

                {/* Dynamic Cell Centroid Cursor */}
                <circle
                  cx={centroid.x}
                  cy={centroid.y}
                  r={10}
                  fill={allSama ? '#34d399' : '#f43f5e'}
                  stroke="#ffffff"
                  strokeWidth={2.5}
                  style={{
                    filter: `drop-shadow(0 0 8px ${allSama ? '#34d399' : '#f43f5e'})`,
                    transition: 'cx 0.3s ease, cy 0.3s ease',
                  }}
                />
                <circle cx={centroid.x} cy={centroid.y} r={16} fill="none" stroke={allSama ? '#34d399' : '#f43f5e'} strokeWidth={1} opacity={0.6} />
              </svg>

              {/* Vector Readings Bar */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.65rem', width: '100%', marginTop: '0.75rem' }}>
                {DOSHA.map((d) => (
                  <div
                    key={d.key}
                    style={{
                      background: 'rgba(0, 0, 0, 0.4)',
                      padding: '0.5rem 0.65rem',
                      borderRadius: '8px',
                      borderLeft: `3px solid ${d.color}`,
                    }}
                  >
                    <span style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'block' }}>{d.iast}</span>
                    <strong style={{ fontSize: '1rem', color: d.color }}>{lv[d.key]}%</strong>
                    <span style={{ fontSize: '0.68rem', color: inSama(lv[d.key]) ? '#4ade80' : '#f87171', display: 'block' }}>
                      {inSama(lv[d.key]) ? '✓ In Window' : '⚠️ Disrupted'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={`vl-sama ${allSama ? 'is-ok' : ''}`} role="status" data-testid="prakriti-status" style={{ marginTop: '1rem' }}>
            {allSama
              ? '✨ समत्वम् · Samatva! All three biophysical vectors sit inside the 40–60% homeostatic equilibrium circle.'
              : 'Disruption Active! Deploy Dravya-Guṇa formulations or adjust seasonal stressors to bring the centroid inside the Samatva circle.'}
          </div>
        </div>
      )}

      {/* =========================================================================
          PHASE 3: MACRO-SYSTEM FEEDBACK (Nāḍī Pulse Waveform Generator)
          ========================================================================= */}
      {activePhase === 3 && (
        <div className="vl-sandbox">
          <div className="vl-pulse-oscilloscope-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontFamily: 'JetBrains Mono, monospace', textTransform: 'uppercase' }}>
                  REAL-TIME TACTILE PULSE WAVEFORM OSCILLOSCOPE (नाडी-तरङ्ग-मापकम्)
                </span>
                <h4 style={{ margin: '0.2rem 0 0', fontSize: '1.15rem', color: nadiGati.color, display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <span>{nadiGati.icon}</span>
                  <span>{nadiGati.name}</span>
                </h4>
              </div>
              <span className="vl-dash-station-pill">
                FREQUENCY: {nadiGati.freq} Hz · VELOCITY: {Math.round(lv.vata * 1.8)} cm/s
              </span>
            </div>

            <p style={{ margin: 0, fontSize: '0.84rem', color: '#cbd5e1' }}>
              {nadiGati.desc}
            </p>

            {/* 60fps Dynamic Canvas Oscilloscope */}
            <canvas ref={canvasRef} width={800} height={140} className="vl-oscilloscope-canvas" />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginTop: '0.5rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.65rem 0.85rem', borderRadius: '8px', borderLeft: '3px solid #10b981' }}>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'block' }}>NORMAL STATE SIGNATURE:</span>
                <strong style={{ fontSize: '0.84rem', color: '#86efac' }}>Sama-Nāḍī (Harmonic Sinusoid)</strong>
                <p style={{ margin: '0.2rem 0 0', fontSize: '0.76rem', color: '#94a3b8' }}>
                  Smooth sinusoidal rhythm reflecting balanced stroke volume and vascular compliance.
                </p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.65rem 0.85rem', borderRadius: '8px', borderLeft: '3px solid #f97316' }}>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'block' }}>HIGH PITTA SIGNATURE:</span>
                <strong style={{ fontSize: '0.84rem', color: '#fdba74' }}>Maṇḍūka-Gati (Frog-Like Leap)</strong>
                <p style={{ margin: '0.2rem 0 0', fontSize: '0.76rem', color: '#94a3b8' }}>
                  Sharp, jumping spiked peaks indicating turbulent kinetic transitions and heat-induced dilation.
                </p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.65rem 0.85rem', borderRadius: '8px', borderLeft: '3px solid #8b5cf6' }}>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'block' }}>HIGH VĀTA SIGNATURE:</span>
                <strong style={{ fontSize: '0.84rem', color: '#c4b5fd' }}>Sarpa-Gati (Winding Snake)</strong>
                <p style={{ margin: '0.2rem 0 0', fontSize: '0.76rem', color: '#94a3b8' }}>
                  Delicate, fast, erratic serpentine oscillations caused by irregular arterial tension.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mini missions card */}
      <section className="vl-panel" aria-label="Mini missions">
        <h3 className="vl-panel-title">
          <span aria-hidden="true">🚩</span> Cellular Homeostasis Missions
        </h3>
        <ul className="vl-missions">
          {missions.map((m) => (
            <li key={m.label} className={m.ok ? 'is-ok' : ''}>
              {m.ok ? '✅' : '⬜'} {m.label}
            </li>
          ))}
        </ul>
      </section>

      {/* Advanced Conceptual Challenge & Sanskrit Terms */}
      <div className="vl-grid-2">
        <ChallengeList items={CHALLENGES} title="🧠 Advanced Systems Biology Challenges" />
        <TermPanel terms={TERMS} title="🧬 Sanskrit Terms in Cellular Homeostasis" />
      </div>

      {/* Traditional 24-hr Dinacaryā clock & Ṣaḍ-Rasa attractions */}
      <AyurvedaAttractions />
    </div>
  );
};

export default PrakritiBalance;
