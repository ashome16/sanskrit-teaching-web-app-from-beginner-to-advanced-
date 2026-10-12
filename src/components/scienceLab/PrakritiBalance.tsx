import React, { useMemo, useState, useEffect, useRef } from 'react';
import { BodhiLabAnecdote, ChallengeList, TermPanel, type LabChallenge, type LabTerm, type LabSegmentProps } from './common';
import { GlowSlider } from './controls';
import { soundEffects } from '../../utils/soundEffects';


type Ritu = 'grishma' | 'varsha' | 'sisira' | 'vasanta';

const RITU_PRESETS: Record<Ritu, { dev: string; iast: string; name: string; icon: string; desc: string; heat: number; cold: number; dry: number; moist: number; activity: number }> = {
  grishma: {
    dev: 'ग्रीष्म',
    iast: 'grīṣma',
    name: 'Harsh Summer',
    icon: '☀️',
    desc: 'Intense thermal radiation accelerates mitochondrial glycolysis and thins membrane lipids (High Pitta).',
    heat: 9, cold: 1, dry: 7, moist: 3, activity: 8
  },
  varsha: {
    dev: 'वर्षा',
    iast: 'varṣā',
    name: 'Monsoon Flooding',
    icon: '🌧️',
    desc: 'Heavy atmospheric humidity and dampness weaken enzymatic digestion, inducing cellular sluggishness (High Kapha/Vāta).',
    heat: 3, cold: 6, dry: 1, moist: 9, activity: 2
  },
  sisira: {
    dev: 'शिशिर',
    iast: 'śiśira',
    name: 'Freezing Winter',
    icon: '❄️',
    desc: 'Severe cryogenic dryness stiffens cytoskeletal filaments and increases transmembrane electrical shear (High Vāta).',
    heat: 1, cold: 9, dry: 9, moist: 2, activity: 7
  },
  vasanta: {
    dev: 'वसन्त',
    iast: 'vasanta',
    name: 'Spring Thaw',
    icon: '🌸',
    desc: 'Rising ambient warmth liquefies accumulated cytosolic lipids, increasing macromolecular crowding (Kapha liquefaction).',
    heat: 6, cold: 4, dry: 4, moist: 7, activity: 5
  },
};

const RITU_KEYS: Ritu[] = ['grishma', 'varsha', 'sisira', 'vasanta'];

interface EnvState {
  ritu: Ritu;
  heat: number;
  cold: number;
  dry: number;
  moist: number;
  activity: number;
}

const clamp = (n: number) => Math.max(0, Math.min(100, n));

/** Interdependent Thermodynamic Tri-Doṣa Vector Model */
const calculateThermodynamicDoshas = (e: EnvState) => {
  const d = (n: number) => n - 5;
  const rawPitta = 50 + 5.5 * d(e.heat) - 3.5 * d(e.cold) + 0.8 * d(e.activity);
  const rawVata = 50 + 4.0 * d(e.dry) + 2.5 * d(e.cold) + 3.0 * d(e.activity) - 2.8 * d(e.moist);
  const rawKapha = 50 + 4.5 * d(e.moist) + 2.0 * d(e.cold) - 3.2 * d(e.activity) - 2.8 * d(e.heat) - 2.0 * d(e.dry);

  // Cross-coupling: High Pitta accelerates Vata and thins Kapha
  const pDelta = rawPitta - 50;
  const vCross = rawVata + 0.35 * Math.max(0, pDelta);
  const kCross = rawKapha - 0.40 * Math.max(0, pDelta);

  // High Kapha dampens Vata and buffers Pitta
  const kDelta = kCross - 50;
  const vCoupled = vCross - 0.28 * Math.max(0, kDelta);
  const pCoupled = rawPitta - 0.22 * Math.max(0, kDelta);

  // High Vata dehydrates Kapha
  const vDelta = vCoupled - 50;
  const finalKapha = kCross - 0.25 * Math.max(0, vDelta);

  return {
    vata: clamp(Math.round(vCoupled)),
    pitta: clamp(Math.round(pCoupled)),
    kapha: clamp(Math.round(finalKapha)),
  };
};

type OrganelleKey = 'akasa' | 'vayu' | 'tejas' | 'ap' | 'prithivi';

interface OrganelleInfo {
  key: OrganelleKey;
  element: string;
  dev: string;
  organelle: string;
  icon: string;
  color: string;
  role: string;
  biophysics: string;
}

const ORGANELLES: Record<OrganelleKey, OrganelleInfo> = {
  akasa: {
    key: 'akasa',
    element: 'Ākāśa (Space)',
    dev: 'आकाश',
    organelle: 'Cytosolic Void & Lumens',
    icon: '🌌',
    color: '#38bdf8',
    role: 'The non-crowded intracellular volume that provides open pathways for macromolecular diffusion.',
    biophysics: 'Diffusion Coefficient D ≈ 10⁻⁶ cm²/s'
  },
  vayu: {
    key: 'vayu',
    element: 'Vāyu (Air)',
    dev: 'वायु',
    organelle: 'Na⁺/K⁺ ATPase & Ion Pumps',
    icon: '💨',
    color: '#c084fc',
    role: 'Active transmembrane kinetic movement of ions and respiratory gases across electrochemical gradients.',
    biophysics: 'Resting Potential V_m ≈ -70 mV'
  },
  tejas: {
    key: 'tejas',
    element: 'Tejas (Fire)',
    dev: 'तेजस्',
    organelle: 'Mitochondrial Cristae',
    icon: '🔥',
    color: '#fb923c',
    role: 'Oxidative phosphorylation, ATP synthesis, and enzymatic catabolic transformations generating thermodynamic heat.',
    biophysics: 'Free Energy ΔG° ≈ -30.5 kJ/mol'
  },
  ap: {
    key: 'ap',
    element: 'Ap (Water)',
    dev: 'अप्',
    organelle: 'Cytoplasmic Hydration Shell',
    icon: '💧',
    color: '#34d399',
    role: 'Aqueous solvent matrix supporting protein folding, enzyme mobility, and osmotic turgor pressure.',
    biophysics: 'Osmotic Turgor P ≈ 240 kPa'
  },
  prithivi: {
    key: 'prithivi',
    element: 'Pṛthivī (Earth)',
    dev: 'पृथिवी',
    organelle: 'Cytoskeleton & Microtubules',
    icon: '🏔️',
    color: '#eab308',
    role: 'Dense structural polymers providing cell geometry, mechanical rigidity, and resistance against osmotic lysis.',
    biophysics: 'Elastic Modulus E ≈ 2.4 kPa'
  },
};

const SAMA_MIN = 40;
const SAMA_MAX = 60;
const isBalanced = (val: number) => val >= SAMA_MIN && val <= SAMA_MAX;

const CHALLENGES: LabChallenge[] = [
  {
    q: 'During the harsh summer of Grīṣma Ṛtu, intracellular heat spikes (High Pitta). What is the immediate threat to the cell, and which Ayurvedic counter-measure restores equilibrium?',
    options: [
      'Membrane lipid peroxidation; deploy Śīta-Ghṛta (cooling lipid) to quench heat and restore membrane fluid stability',
      'Osmotic bursting; deploy dry hot spices to dehydrate the cytosol',
      'Cytoskeletal paralysis; freeze the cell with ice to stop all diffusion',
      'Complete loss of RNA; inject dry grains into the nucleus',
    ],
    answer: 0,
    explain: 'According to Dravya-Guṇa opposites, excess Uṣṇa (heat) and Tīkṣṇa (sharpness) are neutralized by Śīta (cooling) and Snigdha (nourishing unctuous) substances like Ghṛta (clarified butter), preserving membrane fluidity.',
  },
  {
    q: 'When Vāta spikes erratically above 75%, ion pumps fail to maintain resting potential, causing chaotic membrane ripples. Which pulse signature does this induce?',
    options: [
      'Haṁsa-Gati (slow majestic swan glide)',
      'Sarpa-Gati (fast, delicate, winding snake-like ripple)',
      'Maṇḍūka-Gati (sharp explosive frog leap)',
      'A completely flat horizontal zero line',
    ],
    answer: 1,
    explain: 'High kinetic Vāta manifests as Sarpa-Gati (winding snake), characterized by irregular high-frequency tactile oscillations and turbulent arterial wall deflection.',
  },
  {
    q: 'How does the ancient systems biology axiom “Yathā piṇḍe tathā brahmāṇḍe” (As in the body, so in the cosmos) translate into modern cellular biology?',
    options: [
      'Human cells are made of tiny planetary orbits that rotate around the heart',
      'The cell is an open thermodynamic micro-system in continuous dynamic exchange with external seasonal environments (Ṛtucaryā)',
      'Seasonal weather has zero measurable impact on intracellular enzyme activity',
      'Cells can survive indefinitely in a vacuum without exchanging energy or matter',
    ],
    answer: 1,
    explain: 'The cell is an open thermodynamic system whose internal equilibrium (Samatva) constantly requires biochemical counter-forces to offset external environmental stressors.',
  },
];

const TERMS: LabTerm[] = [
  { dev: 'समत्वम्', iast: 'samatva', en: 'Dynamic Homeostasis', note: 'Viable biophysical balance window (40%–60%) across all three metabolic forces.' },
  { dev: 'यथा पिण्डे तथा ब्रह्माण्डे', iast: 'yathā piṇḍe tathā brahmāṇḍe', en: 'Macrocosm-Microcosm Resonance', note: 'The cell mirrors universal thermodynamic laws.' },
  { dev: 'द्रव्य-गुण-कर्म', iast: 'dravya-guṇa-karma', en: 'Substance, Attribute, and Action', note: 'Applying opposing physical attributes to counter environmental stressors.' },
  { dev: 'नाडी-विज्ञानम्', iast: 'nāḍī-vijñāna', en: 'Radial Arterial Pulse Diagnostics', note: 'Reading systemic micro-cellular hemodynamics from arterial waveforms.' },
];

export const PrakritiBalance: React.FC<LabSegmentProps> = ({ onNextLab }) => {
  const [env, setEnv] = useState<EnvState>({
    ritu: 'grishma',
    heat: 8,
    cold: 2,
    dry: 7,
    moist: 3,
    activity: 7,
  });

  const [selectedOrgKey, setSelectedOrgKey] = useState<OrganelleKey>('tejas');
  const [activeRemedy, setActiveRemedy] = useState<string | null>(null);
  const [animTick, setAnimTick] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 60fps animation loop for cell membrane undulation
  useEffect(() => {
    let frameId: number;
    const loop = () => {
      setAnimTick((t) => t + 0.05);
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const doshas = useMemo(() => calculateThermodynamicDoshas(env), [env]);

  const allBalanced = isBalanced(doshas.vata) && isBalanced(doshas.pitta) && isBalanced(doshas.kapha);

  // Determine pulse diagnosis based on dominant Doṣa
  const pulseSignature = useMemo(() => {
    if (allBalanced) {
      return {
        name: 'Sama-Nāḍī (सम-नाडी)',
        type: 'Harmonic Sinusoid',
        icon: '🟢',
        color: '#10b981',
        desc: 'Smooth, balanced sinusoidal rhythm reflecting optimal vascular elasticity and stroke volume.',
        freq: 1.1,
      };
    }
    const maxVal = Math.max(doshas.vata, doshas.pitta, doshas.kapha);
    if (doshas.pitta === maxVal) {
      return {
        name: 'Maṇḍūka-Gati (मण्डूक-गति)',
        type: 'Jumping Frog Leap',
        icon: '🔥',
        color: '#f97316',
        desc: 'Sharp, explosive dicrotic peaks indicating thermal vasodilation and hyper-metabolic catalytic surge.',
        freq: 1.8,
      };
    }
    if (doshas.vata === maxVal) {
      return {
        name: 'Sarpa-Gati (सर्प-गति)',
        type: 'Winding Snake Ripple',
        icon: '💨',
        color: '#c084fc',
        desc: 'Rapid, erratic, delicate ripples caused by irregular arterial wall tension and kinetic shear flux.',
        freq: 2.2,
      };
    }
    return {
      name: 'Haṁsa-Gati (हंस-गति)',
      type: 'Majestic Swan Glide',
      icon: '🌊',
      color: '#38bdf8',
      desc: 'Slow, deep, broad wave swells reflecting high cytoplasmic viscosity and increased structural density.',
      freq: 0.7,
    };
  }, [doshas, allBalanced]);

  // Real-time canvas oscilloscope renderer
  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    if (!ctx) return;

    const w = cvs.width;
    const h = cvs.height;
    ctx.clearRect(0, 0, w, h);

    // Subtle dark grid
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 25) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Baseline
    const midY = h / 2;
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
    ctx.beginPath();
    ctx.moveTo(0, midY);
    ctx.lineTo(w, midY);
    ctx.stroke();

    // Pulse Waveform
    ctx.strokeStyle = pulseSignature.color;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = pulseSignature.color;
    ctx.shadowBlur = 8;
    ctx.beginPath();

    const t = animTick * 2;
    const freq = pulseSignature.freq;

    for (let px = 0; px < w; px++) {
      const theta = (px * 0.035 * freq) - t;
      let waveY = 0;

      if (allBalanced) {
        // Pure smooth sinusoid
        waveY = Math.sin(theta) * 32 + Math.sin(theta * 2) * 8;
      } else if (pulseSignature.name.includes('Maṇḍūka')) {
        // Frog leap: sharp systolic spikes
        const s = Math.sin(theta);
        waveY = Math.sign(s) * Math.pow(Math.abs(s), 0.4) * 44;
      } else if (pulseSignature.name.includes('Sarpa')) {
        // Snake: high-frequency fast ripples
        waveY = Math.sin(theta * 1.8) * 22 + Math.sin(theta * 3.6) * 14;
      } else {
        // Swan: broad, slow swells
        waveY = Math.sin(theta * 0.6) * 36;
      }

      const py = midY - waveY;
      if (px === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;
  }, [animTick, pulseSignature, allBalanced]);

  // Adjust an individual Doṣa directly via cross-coupled slider
  const handleAdjustDosha = (key: 'vata' | 'pitta' | 'kapha', targetVal: number) => {
    soundEffects.playStrokeChime();
    setEnv((prev) => {
      const next = { ...prev };
      const diff = (targetVal - 50) / 10;
      if (key === 'pitta') {
        next.heat = clamp(Math.round(5 + diff));
        next.cold = clamp(Math.round(5 - diff * 0.8));
      } else if (key === 'vata') {
        next.dry = clamp(Math.round(5 + diff));
        next.activity = clamp(Math.round(5 + diff * 0.7));
        next.moist = clamp(Math.round(5 - diff * 0.6));
      } else {
        next.moist = clamp(Math.round(5 + diff));
        next.activity = clamp(Math.round(5 - diff * 0.7));
        next.heat = clamp(Math.round(5 - diff * 0.5));
      }
      return next;
    });
  };

  // Select seasonal stressor
  const selectRitu = (rKey: Ritu) => {
    soundEffects.playStrokeChime();
    const p = RITU_PRESETS[rKey];
    setEnv({
      ritu: rKey,
      heat: p.heat,
      cold: p.cold,
      dry: p.dry,
      moist: p.moist,
      activity: p.activity,
    });
    setActiveRemedy(null);
  };


  // Deploy Dravya-Guṇa Counter-Forces
  const applyRemedy = (remedyKey: 'sita_ghrita' | 'trikatu' | 'taila' | 'reset') => {
    soundEffects.playPuzzleSnap();
    setActiveRemedy(remedyKey);

    if (remedyKey === 'sita_ghrita') {
      // Cooling Ghee: quenches Pitta, nourishes membrane lipids
      setEnv((prev) => ({
        ...prev,
        heat: Math.max(2, prev.heat - 4),
        cold: Math.min(8, prev.cold + 3),
        moist: Math.min(8, prev.moist + 2),
      }));
    } else if (remedyKey === 'trikatu') {
      // Warming Spice: clears Kapha, kindles Agni
      setEnv((prev) => ({
        ...prev,
        moist: Math.max(2, prev.moist - 4),
        heat: Math.min(8, prev.heat + 3),
        activity: Math.min(8, prev.activity + 2),
      }));
    } else if (remedyKey === 'taila') {
      // Unctuous Oil: grounds Vāta, calms dryness
      setEnv((prev) => ({
        ...prev,
        dry: Math.max(2, prev.dry - 4),
        moist: Math.min(8, prev.moist + 3),
        activity: Math.max(3, prev.activity - 2),
      }));
    } else {
      // Samatva Reset
      setEnv({
        ritu: 'vasanta',
        heat: 5,
        cold: 5,
        dry: 5,
        moist: 5,
        activity: 5,
      });
    }
  };

  const selectedOrg = ORGANELLES[selectedOrgKey];

  // Dynamic Morphing Cell Points
  const cellRadius = 88 + (doshas.kapha - 50) * 0.35 + (env.moist - 5) * 2;
  const numPts = 32;
  const cellPath = useMemo(() => {
    const pts: [number, number][] = [];
    const cx = 150;
    const cy = 135;
    const wobbleIntensity = (doshas.vata / 100) * 9;
    const speed = animTick * 1.5;

    for (let i = 0; i < numPts; i++) {
      const angle = (i / numPts) * Math.PI * 2;
      const ripple = Math.sin(angle * 4 + speed) * wobbleIntensity + Math.cos(angle * 2 - speed * 0.8) * (wobbleIntensity * 0.5);
      const r = cellRadius + ripple;
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      pts.push([x, y]);
    }

    let d = `M ${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
    for (let i = 1; i < pts.length; i++) {
      d += ` L ${pts[i][0].toFixed(1)},${pts[i][1].toFixed(1)}`;
    }
    d += ' Z';
    return d;
  }, [cellRadius, doshas.vata, animTick]);

  return (
    <div className="vl-sim" data-testid="prakriti-balance-root">
      {/* Biological Continuum Track Stage 1 Callout */}
      <div className="vl-bio-continuum-banner" role="region" aria-label="Life Sciences Continuum Stage 1">
        <div className="vl-bio-continuum-title">
          <span className="vl-hud-blink">●</span> STAGE 1 OF BIOLOGICAL CONTINUUM // जीव-विज्ञान-परम्परा · सूक्ष्म-सृष्टि-विज्ञानम्
        </div>
        <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.5 }}>
          Welcome to the <strong>Biology &amp; Life Sciences Track</strong>. We begin at the <strong>microscopic, sub-cellular scale</strong>:
          balancing thermodynamic Tridoṣa ion forces, mitochondrial ATP synthesis, and lipid bilayers under seasonal stressors (<em>Ṛtucaryā</em>).
          Next in <em>SEC-04 Chaturyoni</em>, you will scale upward to multicellular embryogenesis and plant action potentials.
        </p>
      </div>

      {/* Educational Anecdote */}
      <BodhiLabAnecdote
        title="Yathā Piṇḍe Tathā Brahmāṇḍe · The Cellular Microcosm"
        sanskritTitle="यथा पिण्डे तथा ब्रह्माण्डे · प्रकृति-सन्तुलनम्"
        mood="scholar"
        anecdote={
          <>

            In classical Āyurvedic biophysics (<em>Caraka Saṃhitā, Śārīrasthāna 5.3</em>), the human body is not an isolated machine; it is a resonant mirror of the cosmos (<em>Brahmāṇḍa</em>). A single living cell is a micro-cosmic ecosystem constantly forced out of balance by external environmental seasons (<em>Ṛtucaryā</em>). Ancient physicians discovered that longevity is not static stillness, but <strong>Samatva (समत्वम्)</strong>: the dynamic continuous neutralization of external stressors using opposing dietary and medicinal qualities (<em>Dravya-Guṇa-Karma</em>).
          </>
        }
        sutra={{
          dev: 'यथा पिण्डे तथा ब्रह्माण्डे यद् ब्रह्माण्डे तद् पिण्डे।',
          iast: 'yathā piṇḍe tathā brahmāṇḍe yad brahmāṇḍe tad piṇḍe |',
          source: 'Yajurveda & Caraka Saṃhitā (Śārīra 5.3)',
          meaning: 'As in the individual microcosm (the cell & body), so in the cosmic macrocosm (nature & seasons).',
        }}
        modernBridge={{
          ancientConcept: 'Tridoṣa thermodynamic vector equilibrium (Vāta kinetic flux, Pitta thermal catalysis, Kapha structural viscosity).',
          modernScience: 'Cellular Systems Biology: Homeostatic regulation of transmembrane electrochemical potentials, mitochondrial ATP synthesis, and cytoskeletal viscoelasticity.',
          relevanceNote: 'Modern cell biologists measure the exact same parameters: fluid mosaic membrane shear (Vāta), enzymatic heat dissipation (Pitta), and cytoplasmic colloid density (Kapha).',
        }}
        societalValue={
          <>
            Understanding bodily homeostasis empowers preventative lifestyle medicine. By learning how seasonal heat, cold, and humidity alter cellular metabolism, learners appreciate how traditional Indian dietary rhythms (<em>Ṛtucaryā</em>) provide proactive immunity and sustainable mental wellness.
          </>
        }
      />

      {/* Primary Mission HUD Kicker */}
      <div className="vl-panel" style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.95), rgba(30,41,59,0.85))', border: '1px solid rgba(56,189,248,0.3)', borderRadius: '16px', padding: '1rem 1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.72rem', fontFamily: 'JetBrains Mono, monospace', color: '#38bdf8', fontWeight: 800 }}>
              <span className="vl-hud-blink">●</span> VIJÑĀNA LAB · SECTOR 03 // CELLULAR BIOPHYSICS BENCH
            </div>
            <h3 style={{ margin: '0.2rem 0 0', fontSize: '1.25rem', color: '#f8fafc', fontWeight: 900 }}>
              Prakṛti Biosphere · Cellular Homeostasis Sandbox
            </h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              style={{
                fontSize: '0.8rem',
                fontFamily: 'JetBrains Mono, monospace',
                padding: '0.3rem 0.75rem',
                borderRadius: '8px',
                fontWeight: 800,
                background: allBalanced ? 'rgba(16,185,129,0.18)' : 'rgba(239,68,68,0.18)',
                color: allBalanced ? '#34d399' : '#f87171',
                border: `1px solid ${allBalanced ? '#10b981' : '#ef4444'}`,
              }}
            >
              {allBalanced ? '✨ SAMATVA EQUILIBRIUM ACHIEVED' : '⚠️ CELLULAR HOMEOSTASIS DISRUPTED'}
            </span>
          </div>
        </div>
        <p style={{ margin: '0.45rem 0 0', fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.5 }}>
          Test the macro-micro resonance: subject the cell to seasonal environmental stressors, observe membrane shear and mitochondrial heat in real time, and deploy Ayurvedic counter-forces (<em>Dravya-Guṇa</em>) to lock all three Doṣas into the 40%–60% viable equilibrium window.
        </p>
      </div>

      {/* =========================================================================
          THE UNIFIED INTERACTIVE BIO-BENCH (2 COLUMNS: CELL/WAVEFORM + CONTROLS)
          ========================================================================= */}
      <div className="vl-grid-2" style={{ gap: '1.25rem', alignItems: 'start' }}>
        {/* Column 1: The Living Cell & Live Pulse Oscilloscope */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Living Cell Visualizer */}
          <div style={{ background: '#020617', border: '1.5px solid rgba(56,189,248,0.3)', borderRadius: '16px', padding: '1rem', textAlign: 'center', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
              <span style={{ fontSize: '0.78rem', color: '#38bdf8', fontFamily: 'JetBrains Mono, monospace', fontWeight: 800 }}>
                🔬 SŪKṢMA-KOŚIKĀ (LIVING CELL MEMBRANE)
              </span>
              <span style={{ fontSize: '0.72rem', color: '#fef08a', background: 'rgba(234,179,8,0.15)', padding: '0.15rem 0.5rem', borderRadius: '4px', border: '1px solid rgba(234,179,8,0.3)' }}>
                Turgor: {Math.round(180 + (env.moist - 5) * 12)} kPa
              </span>
            </div>

            {/* SVG Living Cell */}
            <svg viewBox="0 0 300 270" style={{ width: '100%', maxHeight: '250px' }}>
              <defs>
                <radialGradient id="cytoGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#0369a1" stopOpacity="0.45" />
                  <stop offset="70%" stopColor="#0f172a" stopOpacity="0.85" />
                  <stop offset="100%" stopColor={doshas.pitta > 60 ? '#7c2d12' : '#020617'} stopOpacity="0.95" />
                </radialGradient>
                <filter id="pittaGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation={doshas.pitta > 60 ? '6' : '2'} result="glow" />
                  <feComposite in="SourceGraphic" in2="glow" operator="over" />
                </filter>
              </defs>

              {/* Membrane Outer Wave */}
              <path
                d={cellPath}
                fill="url(#cytoGrad)"
                stroke={doshas.pitta > 65 ? '#f97316' : doshas.vata > 65 ? '#c084fc' : '#38bdf8'}
                strokeWidth={doshas.kapha > 60 ? '4.5' : '2.5'}
                filter="url(#pittaGlow)"
                style={{ transition: 'stroke 0.3s ease, stroke-width 0.3s ease' }}
              />

              {/* Organelle 1: Nucleus & Void (Ākāśa) */}
              <g
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedOrgKey('akasa')}
              >
                <title>Ākāśa · Intracellular Void &amp; Nucleus</title>
                <circle cx={150} cy={135} r={32} fill="rgba(56,189,248,0.2)" stroke="#38bdf8" strokeWidth={1.5} strokeDasharray="3 3" />
                <circle cx={150} cy={135} r={16} fill="rgba(14,165,233,0.4)" stroke="#38bdf8" strokeWidth={2} />
                <text x={150} y={139} textAnchor="middle" fontSize={11} fill="#e0f2fe" fontWeight="bold">आकाश</text>
              </g>

              {/* Organelle 2: Mitochondria Cristae (Tejas) */}
              <g
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedOrgKey('tejas')}
              >
                <title>Tejas · Mitochondrial ATP Synthesis</title>
                <ellipse cx={105} cy={95} rx={22} ry={13} fill="#7c2d12" stroke="#f97316" strokeWidth={2} transform="rotate(-25 105 95)" />
                <path d="M 94 95 Q 100 89 105 95 T 116 95" fill="none" stroke="#fdba74" strokeWidth={1.5} transform="rotate(-25 105 95)" />
                <text x={105} y={118} textAnchor="middle" fontSize={9.5} fill="#fdba74" fontWeight="bold">तेजस्</text>
              </g>

              {/* Organelle 3: Ion Pumps / Transport Channels (Vāyu) */}
              <g
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedOrgKey('vayu')}
              >
                <title>Vāyu · Na⁺/K⁺ Ion Transmembrane Pumps</title>
                <circle cx={198} cy={90} r={16} fill="#3b0764" stroke="#c084fc" strokeWidth={2} />
                <text x={198} y={88} textAnchor="middle" fontSize={10} fill="#e9d5ff" fontWeight="bold">⚡ वायु</text>
                <text x={198} y={99} textAnchor="middle" fontSize={7.5} fill="#c084fc">Na⁺/K⁺</text>
              </g>

              {/* Organelle 4: Cytoskeleton Microtubules (Pṛthivī) */}
              <g
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedOrgKey('prithivi')}
              >
                <title>Pṛthivī · Cytoskeletal Scaffolding</title>
                <line x1={80} y1={175} x2={130} y2={185} stroke="#eab308" strokeWidth={3} strokeLinecap="round" />
                <line x1={120} y1={185} x2={165} y2={195} stroke="#eab308" strokeWidth={3} strokeLinecap="round" />
                <circle cx={105} cy={180} r={12} fill="#713f12" stroke="#eab308" strokeWidth={1.5} />
                <text x={105} y={184} textAnchor="middle" fontSize={9.5} fill="#fef08a" fontWeight="bold">पृथिवी</text>
              </g>

              {/* Organelle 5: Hydration Shell & Solutes (Ap) */}
              <g
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedOrgKey('ap')}
              >
                <title>Ap · Cytoplasmic Solvent &amp; Lipid Bilayer</title>
                <circle cx={195} cy={175} r={15} fill="#064e3b" stroke="#34d399" strokeWidth={2} />
                <text x={195} y={179} textAnchor="middle" fontSize={10} fill="#a7f3d0" fontWeight="bold">अप्</text>
              </g>
            </svg>

            {/* Organelle Selection Tabs */}
            <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              {(Object.keys(ORGANELLES) as OrganelleKey[]).map((k) => {
                const org = ORGANELLES[k];
                const active = selectedOrgKey === k;
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => {
                      soundEffects.playStrokeChime();
                      setSelectedOrgKey(k);
                    }}

                    style={{
                      background: active ? `${org.color}25` : 'rgba(15,23,42,0.6)',
                      border: `1px solid ${active ? org.color : 'rgba(148,163,184,0.2)'}`,
                      color: active ? org.color : '#94a3b8',
                      borderRadius: '8px',
                      padding: '0.35rem 0.65rem',
                      fontSize: '0.76rem',
                      fontWeight: active ? 800 : 600,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <span>{org.icon}</span>
                    <span>{org.dev} ({org.element.split(' ')[0]})</span>
                  </button>
                );
              })}
            </div>

            {/* Selected Organelle Brief Summary */}
            <div style={{ marginTop: '0.75rem', background: 'rgba(15,23,42,0.85)', border: `1px solid ${selectedOrg.color}40`, borderRadius: '10px', padding: '0.65rem 0.85rem', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: selectedOrg.color }}>
                  {selectedOrg.icon} {selectedOrg.element} · {selectedOrg.organelle}
                </span>
                <span style={{ fontSize: '0.68rem', fontFamily: 'JetBrains Mono, monospace', color: '#fef08a' }}>
                  {selectedOrg.biophysics}
                </span>
              </div>
              <p style={{ margin: '0.25rem 0 0', fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                {selectedOrg.role}
              </p>
            </div>
          </div>

          {/* Live Arterial Pulse Oscilloscope */}
          <div style={{ background: 'rgba(15,23,42,0.9)', border: '1px solid rgba(148,163,184,0.2)', borderRadius: '16px', padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem', flexWrap: 'wrap', gap: '0.4rem' }}>
              <div>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontFamily: 'JetBrains Mono, monospace', textTransform: 'uppercase' }}>
                  TACTILE PULSE WAVEFORM OSCILLOSCOPE (नाडी-तरङ्गः)
                </span>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: pulseSignature.color, display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.1rem' }}>
                  <span>{pulseSignature.icon}</span>
                  <span>{pulseSignature.name}</span>
                  <span style={{ fontSize: '0.75rem', color: '#cbd5e1', fontWeight: 500 }}>({pulseSignature.type})</span>
                </div>
              </div>
              <span style={{ fontSize: '0.72rem', fontFamily: 'JetBrains Mono, monospace', padding: '0.2rem 0.6rem', borderRadius: '6px', background: `${pulseSignature.color}20`, color: pulseSignature.color, border: `1px solid ${pulseSignature.color}50` }}>
                FREQ: {pulseSignature.freq} Hz · V: {Math.round(doshas.vata * 1.5)} cm/s
              </span>
            </div>

            <canvas ref={canvasRef} width={640} height={110} style={{ width: '100%', height: '110px', background: '#020617', borderRadius: '10px', border: '1px solid rgba(56,189,248,0.2)' }} />

            <p style={{ margin: '0.5rem 0 0', fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.45 }}>
              {pulseSignature.desc}
            </p>
          </div>
        </div>

        {/* Column 2: Controls, Stressors, and Counter-Measures */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Seasonal Stressor Bar */}
          <div style={{ background: 'rgba(15,23,42,0.9)', border: '1px solid rgba(148,163,184,0.2)', borderRadius: '16px', padding: '1.1rem' }}>
            <span style={{ fontSize: '0.72rem', color: '#38bdf8', fontFamily: 'JetBrains Mono, monospace', fontWeight: 800, letterSpacing: '0.06em' }}>
              STEP 1 // SELECT EXTERNAL SEASONAL STRESSOR (ऋतु)
            </span>
            <p style={{ margin: '0.2rem 0 0.75rem', fontSize: '0.82rem', color: '#cbd5e1' }}>
              Select a season to perturb cellular equilibrium with natural thermal and moisture shifts:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              {RITU_KEYS.map((k) => {
                const preset = RITU_PRESETS[k];
                const isSelected = env.ritu === k;
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => selectRitu(k)}
                    style={{
                      background: isSelected ? 'rgba(56,189,248,0.18)' : 'rgba(30,41,59,0.7)',
                      border: `1.5px solid ${isSelected ? '#38bdf8' : 'rgba(148,163,184,0.2)'}`,
                      borderRadius: '10px',
                      padding: '0.6rem 0.75rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      boxShadow: isSelected ? '0 0 12px rgba(56,189,248,0.3)' : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <span style={{ fontSize: '1.1rem' }}>{preset.icon}</span>
                      <strong style={{ fontSize: '0.85rem', color: isSelected ? '#ffffff' : '#e2e8f0' }}>
                        {preset.dev} ({preset.name})
                      </strong>
                    </div>
                  </button>
                );
              })}
            </div>

            <div style={{ marginTop: '0.65rem', fontSize: '0.78rem', color: '#fef08a', background: 'rgba(234,179,8,0.1)', padding: '0.45rem 0.65rem', borderRadius: '8px', borderLeft: '3px solid #facc15' }}>
              <strong>Active Stress:</strong> {RITU_PRESETS[env.ritu].desc}
            </div>
          </div>

          {/* Tri-Doṣa Cross-Coupled Sliders */}
          <div style={{ background: 'rgba(15,23,42,0.9)', border: '1px solid rgba(148,163,184,0.2)', borderRadius: '16px', padding: '1.1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.72rem', color: '#38bdf8', fontFamily: 'JetBrains Mono, monospace', fontWeight: 800, letterSpacing: '0.06em' }}>
                STEP 2 // INTERDEPENDENT BIOPHYSICAL VECTORS
              </span>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontFamily: 'JetBrains Mono, monospace' }}>
                TARGET: 40%–60%
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <GlowSlider
                label="वात Vāta · Kinetic Flux & Diffusion Velocity (V⃗)"
                value={doshas.vata}
                min={10}
                max={95}
                step={2}
                color="#c084fc"
                valueText={`${doshas.vata}% ${isBalanced(doshas.vata) ? '✓ Balanced' : doshas.vata > 60 ? '⚠️ High Shear' : '⚠️ Sluggish'}`}
                onChange={(v) => handleAdjustDosha('vata', v)}
              />

              <GlowSlider
                label="पित्त Pitta · Thermal Catalysis & ATP Heat (ΔH)"
                value={doshas.pitta}
                min={10}
                max={95}
                step={2}
                color="#f97316"
                valueText={`${doshas.pitta}% ${isBalanced(doshas.pitta) ? '✓ Balanced' : doshas.pitta > 60 ? '🔥 Hyper-Heat' : '❄️ Low Agni'}`}
                onChange={(v) => handleAdjustDosha('pitta', v)}
              />

              <GlowSlider
                label="कफ Kapha · Structural Viscosity & Density (ρ)"
                value={doshas.kapha}
                min={10}
                max={95}
                step={2}
                color="#10b981"
                valueText={`${doshas.kapha}% ${isBalanced(doshas.kapha) ? '✓ Balanced' : doshas.kapha > 60 ? '💧 Heavy Crowding' : '⚠️ Brittle'}`}
                onChange={(v) => handleAdjustDosha('kapha', v)}
              />
            </div>
          </div>

          {/* Dravya-Guṇa Counter-Force Actions */}
          <div style={{ background: 'rgba(15,23,42,0.9)', border: '1px solid rgba(148,163,184,0.2)', borderRadius: '16px', padding: '1.1rem' }}>
            <span style={{ fontSize: '0.72rem', color: '#38bdf8', fontFamily: 'JetBrains Mono, monospace', fontWeight: 800, letterSpacing: '0.06em' }}>
              STEP 3 // DEPLOY DRAVYA-GUṆA COUNTER-FORCES
            </span>
            <p style={{ margin: '0.2rem 0 0.75rem', fontSize: '0.82rem', color: '#cbd5e1' }}>
              Deploy classical opposing formulations to neutralize imbalances back into Samatva:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => applyRemedy('sita_ghrita')}
                style={{
                  background: activeRemedy === 'sita_ghrita' ? 'rgba(56,189,248,0.2)' : 'rgba(30,41,59,0.7)',
                  border: '1px solid rgba(56,189,248,0.3)',
                  borderRadius: '10px',
                  padding: '0.6rem 0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
                }}
              >
                <div>
                  <strong style={{ fontSize: '0.85rem', color: '#e0f2fe', display: 'block' }}>
                    🥥 Śīta-Ghṛta (शीत-घृत) · Cooling Lipid
                  </strong>
                  <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                    Opposes hot/sharp Pitta · Reinforces fluid lipid bilayer
                  </span>
                </div>
                <span style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: 700 }}>
                  -Pitta / +Membrane
                </span>
              </button>

              <button
                type="button"
                onClick={() => applyRemedy('trikatu')}
                style={{
                  background: activeRemedy === 'trikatu' ? 'rgba(249,115,22,0.2)' : 'rgba(30,41,59,0.7)',
                  border: '1px solid rgba(249,115,22,0.3)',
                  borderRadius: '10px',
                  padding: '0.6rem 0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
                }}
              >
                <div>
                  <strong style={{ fontSize: '0.85rem', color: '#fed7aa', display: 'block' }}>
                    🍯 Laghu-Trikaṭu (त्रिकटु) · Metabolic Activator
                  </strong>
                  <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                    Opposes heavy/cold Kapha · Stimulates mitochondrial catabolism
                  </span>
                </div>
                <span style={{ fontSize: '0.72rem', color: '#fb923c', fontWeight: 700 }}>
                  -Kapha / +Agni
                </span>
              </button>

              <button
                type="button"
                onClick={() => applyRemedy('taila')}
                style={{
                  background: activeRemedy === 'taila' ? 'rgba(192,132,252,0.2)' : 'rgba(30,41,59,0.7)',
                  border: '1px solid rgba(192,132,252,0.3)',
                  borderRadius: '10px',
                  padding: '0.6rem 0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
                }}
              >
                <div>
                  <strong style={{ fontSize: '0.85rem', color: '#e9d5ff', display: 'block' }}>
                    🫖 Snigdha-Taila (तैल) · Nourishing Balm
                  </strong>
                  <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                    Opposes dry/kinetic Vāta · Stabilizes electrochemical gradients
                  </span>
                </div>
                <span style={{ fontSize: '0.72rem', color: '#c084fc', fontWeight: 700 }}>
                  -Vāta / +Hydration
                </span>
              </button>
            </div>

            <div style={{ marginTop: '0.65rem', textAlign: 'center' }}>
              <button
                type="button"
                onClick={() => applyRemedy('reset')}
                className="vl-btn vl-btn--cyber"
                style={{ width: '100%', fontSize: '0.82rem', padding: '0.5rem', background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.4)', color: '#38bdf8' }}
              >
                🔄 Restore Universal Equilibrium (समत्व-संस्थापनम्)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          TRIMMED CORE SCIENCE WALKTHROUGH (3 CLEAR CARDS)
          ========================================================================= */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
        <div style={{ background: 'rgba(15,23,42,0.7)', border: '1px solid rgba(148,163,184,0.15)', borderRadius: '12px', padding: '1rem' }}>
          <h4 style={{ margin: '0 0 0.35rem', color: '#38bdf8', fontSize: '0.95rem' }}>
            🌌 1. The Organelle Elements
          </h4>
          <p style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.5 }}>
            Ancient systems biology maps the 5 elements directly to cellular components: <strong>Ākāśa</strong> is cytosolic void, <strong>Vāyu</strong> is ion pump transport, <strong>Tejas</strong> is mitochondrial heat, <strong>Ap</strong> is solvent hydration, and <strong>Pṛthivī</strong> is cytoskeletal scaffolding.
          </p>
        </div>

        <div style={{ background: 'rgba(15,23,42,0.7)', border: '1px solid rgba(148,163,184,0.15)', borderRadius: '12px', padding: '1rem' }}>
          <h4 style={{ margin: '0 0 0.35rem', color: '#f59e0b', fontSize: '0.95rem' }}>
            ⚖️ 2. The 3 Thermodynamic Forces
          </h4>
          <p style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.5 }}>
            The three Doṣas are not static entities; they are vectors: <strong>Vāta</strong> (diffusion speed &amp; shear), <strong>Pitta</strong> (metabolic reaction rate), and <strong>Kapha</strong> (viscoelastic density). Health is the continuous dynamic balance (<em>Samatva</em>) among all three.
          </p>
        </div>

        <div style={{ background: 'rgba(15,23,42,0.7)', border: '1px solid rgba(148,163,184,0.15)', borderRadius: '12px', padding: '1rem' }}>
          <h4 style={{ margin: '0 0 0.35rem', color: '#10b981', fontSize: '0.95rem' }}>
            📈 3. Arterial Pulse Feedback
          </h4>
          <p style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.5 }}>
            Because systemic hemodynamics respond to cellular metabolic state, ancient radial pulse diagnosis (<em>Nāḍī-Vijñāna</em>) detected cellular imbalance through tactile waveform signatures: <em>Maṇḍūka-Gati</em> for heat, <em>Sarpa-Gati</em> for kinetic shear, and <em>Haṁsa-Gati</em> for viscous heavy density.
          </p>
        </div>
      </div>

      {/* Challenges & Terms */}
      <div className="vl-grid-2" style={{ marginTop: '1rem' }}>
        <ChallengeList items={CHALLENGES} title="🧠 Cellular Biophysics Challenges" />
        <TermPanel terms={TERMS} title="🧬 Sanskrit Biological Terminology" />
      </div>

      {/* =========================================================================
          DIRECT NEXT BIOLOGY LAB GATEWAY (SEQUENCED: PRAKṚTI ➔ CHATURYONI)
          ========================================================================= */}
      {onNextLab && (
        <div
          className="vl-panel"
          style={{
            marginTop: '1.5rem',
            background: 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(249,115,22,0.12))',
            border: '1.5px solid rgba(249,115,22,0.4)',
            borderRadius: '16px',
            padding: '1.35rem 1.6rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.25rem',
            flexWrap: 'wrap',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '2.5rem', lineHeight: 1 }}>🦢</span>
            <div>
              <span style={{ fontSize: '0.72rem', color: '#fb923c', fontFamily: 'JetBrains Mono, monospace', fontWeight: 800 }}>
                BIOLOGY CURRICULUM PIPELINE // NEXT LIFE SCIENCE SECTOR
              </span>
              <h4 style={{ margin: '0.2rem 0 0', fontSize: '1.2rem', color: '#f8fafc', fontWeight: 900 }}>
                SEC-04 Chaturyoni Spawn Map · Botanical Galvanometry
              </h4>
              <p style={{ margin: '0.25rem 0 0', fontSize: '0.84rem', color: '#cbd5e1' }}>
                Advance from sub-cellular homeostasis to whole-organism taxonomy &amp; Sir J.C. Bose&rsquo;s plant action potentials!
              </p>
            </div>
          </div>

          <button
            type="button"
            className="vl-btn vl-btn--cyber"
            onClick={onNextLab}
            style={{
              padding: '0.75rem 1.4rem',
              fontSize: '0.95rem',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #f97316, #10b981)',
              color: '#090e17',
              border: 'none',
              boxShadow: '0 4px 16px rgba(249,115,22,0.4)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            <span>ENTER CHATURYONI LAB ➔</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default PrakritiBalance;
