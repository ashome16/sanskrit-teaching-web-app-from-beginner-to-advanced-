import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { CoreIdea, TermPanel, ChallengeList, type LabTerm, type LabChallenge } from './common';
import { soundEffects } from '../../utils/soundEffects';
import '../../styles/science-lab.css';

// ---------------------------------------------------------------------------
// DATA: Sanskrit Pyrotechnic & Artillery Terms
// ---------------------------------------------------------------------------
const AGNIBANA_TERMS: LabTerm[] = [
  {
    dev: 'अग्निचूर्णम्',
    iast: 'Agnicūrṇam',
    en: 'Combustible fire-powder / propellant mixture',
    note: 'Described in the Śukranīti and medieval alchemy texts as a 5:1:1 blend of saltpetre, sulphur, and charcoal.',
  },
  {
    dev: 'शतघ्नी',
    iast: 'Śataghnī',
    en: 'Fortress defensive engine ("that which slays a hundred")',
    note: 'Frequently cited in the Mahābhārata and Rāmāyaṇa; heavy iron-studded logs or stone-launchers mounted on ramparts.',
  },
  {
    dev: 'अग्निबाणः',
    iast: 'Agnibāṇaḥ',
    en: 'Combustive fire-arrow / early rocket projectile',
    note: 'Carved into the 12th-century stone reliefs of the Hoysaleśvara Temple in Halebidu, depicting multi-arrow launch pads.',
  },
  {
    dev: 'उल्कादानम्',
    iast: 'Ulkādānam',
    en: 'Ritual offering of handheld fire tubes / flares',
    note: 'Mentioned in the Skanda Purāṇa during Dīpāvalī to symbolically illuminate the celestial pathway for ancestral spirits (Pitṛs).',
  },
  {
    dev: 'सुवर्चिलवणम्',
    iast: 'Suvarcilavaṇam',
    en: 'Saltpetre (Potassium Nitrate, KNO₃)',
    note: 'The vital oxidizer that supplies atomic oxygen internally, allowing combustion inside sealed iron casings.',
  },
  {
    dev: 'गन्धकम्',
    iast: 'Gandhakam',
    en: 'Sulphur (S)',
    note: 'Lowers the ignition temperature to ~250°C and accelerates flame propagation across the propellant grain.',
  },
  {
    dev: 'अङ्गारः',
    iast: 'Aṅgāraḥ',
    en: 'Charcoal / Carbon fuel (C)',
    note: 'Derived from Arka (Calotropis) or Snuhi wood burned in sealed earthen pots to maximize microscopic capillary porosity.',
  },
  {
    dev: 'तारामण्डलपेटम्',
    iast: 'Tāramaṇḍalapeṭam',
    en: 'Foundry & laboratory ("Star-cluster bazaar")',
    note: 'The state-of-the-art military research foundries built by Tipu Sultan in Srirangapatna and Bangalore for iron rocketry.',
  },
];

// ---------------------------------------------------------------------------
// DATA: Educational Challenges
// ---------------------------------------------------------------------------
const AGNIBANA_CHALLENGES: LabChallenge[] = [
  {
    q: 'Why was the replacement of bamboo with hammered iron casings by Hyder Ali and Tipu Sultan a revolutionary military breakthrough?',
    options: [
      'Iron was lighter than bamboo',
      'Soft bamboo ruptured under high pressure, while hammered iron sustained extreme combustion pressure (up to 80 atm), massively increasing thrust and range to 2.5 km',
      'Iron prevented the gunpowder from catching fire',
      'Iron made the rockets invisible at night',
    ],
    answer: 1,
    explain: 'Bamboo casings ruptured easily at ~15-20 atm, severely capping internal thrust. Mysore’s hammered iron cylinders sustained extreme gas pressures, enabling battlefield ranges up to 2.5 kilometers.',
  },
  {
    q: 'What is the vital chemical role of Suvarcilavaṇa (Saltpetre / KNO₃) in the Śukranīti Agnicūrṇa formulation?',
    options: [
      'It acts as the oxidizer, supplying oxygen internally so combustion can occur inside a sealed casing without atmospheric air',
      'It cools the rocket engine down',
      'It dyes the smoke purple',
      'It makes the gunpowder smell sweet',
    ],
    answer: 0,
    explain: 'Without oxygen, fuels cannot burn. Saltpetre (KNO₃) decomposes under heat to release oxygen internally, allowing closed-chamber rocketry and underwater flares.',
  },
  {
    q: 'What ritual documented in the Skanda Purāṇa marked the historical transition from clay oil lamps (diyas) to fiery pyrotechnics during Deepavali?',
    options: [
      'Aśvamedha',
      'Ulkā-Dāna (offering of handheld fire tubes/flares to guide ancestral spirits)',
      'Somayāga',
      'Vāstu Pūjā',
    ],
    answer: 1,
    explain: 'The Skanda Purāṇa describes Ulkā-Dāna during Kārtika Amāvāsyā: raising handheld fire torches and sparks into the night sky to guide the Pitṛs (ancestral spirits) on their journey.',
  },
];

// ---------------------------------------------------------------------------
// DATA: Historic Fireworks from Kautuka Cintāmaṇi
// ---------------------------------------------------------------------------
interface FireworkPreset {
  id: string;
  dev: string;
  title: string;
  source: string;
  color: string;
  desc: string;
  effect: 'fountain' | 'flare' | 'mole' | 'sparkler' | 'burst';
}

const HISTORIC_FIREWORKS: FireworkPreset[] = [
  {
    id: 'candrajyoti',
    dev: 'चन्द्रज्योतिः',
    title: 'Candrajyoti (Moonlight Flare)',
    source: 'Kautuka Cintāmaṇi (15th c. Odisha)',
    color: '#38bdf8',
    desc: 'High-nitrate white flare formulation that emits a calm, brilliant silvery-white illumination resembling full-moon radiance.',
    effect: 'flare',
  },
  {
    id: 'chuchundari',
    dev: 'छुछुन्दरीरसबाणः',
    title: 'Chuchundarī (The Mole Rocket)',
    source: 'Kautuka Cintāmaṇi (15th c. Odisha)',
    color: '#f97316',
    desc: 'Ground-zipping squib rocket that darts erratically along the floor with sharp hisses, named after the darting muskrat (chuchundarī).',
    effect: 'mole',
  },
  {
    id: 'camarabana',
    dev: 'चामरबाणः',
    title: 'Cāmarabāṇa (The Golden Whisk Fountain)',
    source: 'Kautuka Cintāmaṇi (15th c. Odisha)',
    color: '#eab308',
    desc: 'Emits a wide, voluminous cascade of glowing golden sparks resembling the ceremonial royal yak-tail whisk (Cāmara).',
    effect: 'fountain',
  },
  {
    id: 'pushpavarti',
    dev: 'पुष्पवर्तिः',
    title: 'Puṣpavarti (Flower Wick / Sparkler)',
    source: 'Kautuka Cintāmaṇi (15th c. Odisha)',
    color: '#ec4899',
    desc: 'Direct historical Sanskrit precursor to the modern handheld sparkler (Phooljhadi), emitting crackling floral sparks.',
    effect: 'sparkler',
  },
  {
    id: 'ulkadana',
    dev: 'उल्कादान-बाणः',
    title: 'Ulkā-Dāna (Deepavali Sky Flare)',
    source: 'Skanda Purāṇa (Kārtika Māhātmya)',
    color: '#a855f7',
    desc: 'High-altitude fire tube launched during Deepavali night to illuminate the celestial heavens for the departing ancestral spirits.',
    effect: 'burst',
  },
];

// ---------------------------------------------------------------------------
// COMPONENT
// ---------------------------------------------------------------------------
export const AgnibanaRocketLab: React.FC = () => {
  // Navigation Tabs: 'alchemy' | 'rocket' | 'fireworks' | 'dossier'
  const [activeTab, setActiveTab] = useState<'alchemy' | 'rocket' | 'fireworks' | 'dossier'>('alchemy');

  // --- TAB 1: ALCHEMY CRUCIBLE STATES ---
  const [saltpetre, setSaltpetre] = useState<number>(5.0); // KNO3 (parts)
  const [sulphur, setSulphur] = useState<number>(1.0); // S (parts)
  const [charcoal, setCharcoal] = useState<number>(1.0); // C (parts)
  const [crucibleFired, setCrucibleFired] = useState<boolean>(false);

  // Stoichiometry calculations
  const totalParts = saltpetre + sulphur + charcoal;
  const kno3Pct = ((saltpetre / totalParts) * 100).toFixed(1);
  const sPct = ((sulphur / totalParts) * 100).toFixed(1);
  const cPct = ((charcoal / totalParts) * 100).toFixed(1);

  // Combustion quality rating
  const combustionQuality = useMemo(() => {
    // Ideal Sukraniti is 5:1:1 (71.4% KNO3, 14.3% S, 14.3% C)
    const kno3Diff = Math.abs(saltpetre - 5.0);
    const sDiff = Math.abs(sulphur - 1.0);
    const cDiff = Math.abs(charcoal - 1.0);
    const error = kno3Diff * 10 + sDiff * 15 + cDiff * 15;

    if (saltpetre < 2.5) return { status: 'Unignitable (Under-oxidized)', temp: 350, speed: 45, eff: 20, color: '#64748b' };
    if (saltpetre > 8.0) return { status: 'Over-oxidized (Excess Nitre ash)', temp: 850, speed: 180, eff: 55, color: '#f59e0b' };
    if (error < 8) return { status: 'Ideal Śukranīti 5:1:1 (Optimal Thrust)', temp: 1750, speed: 640, eff: 98, color: '#10b981' };
    if (error < 25) return { status: 'Stable Combustive Blend', temp: 1300, speed: 420, eff: 75, color: '#06b6d4' };
    return { status: 'Sub-optimal Deflagration', temp: 950, speed: 210, eff: 45, color: '#f97316' };
  }, [saltpetre, sulphur, charcoal]);

  // --- TAB 2: MYSOREAN ROCKET LAUNCH STAND STATES ---
  const [casingType, setCasingType] = useState<'bamboo' | 'iron'>('iron');
  const [hasSwordBlade, setHasSwordBlade] = useState<boolean>(true);
  const [launching, setLaunching] = useState<boolean>(false);
  const [launchResult, setLaunchResult] = useState<{
    success: boolean;
    range: number;
    altitude: number;
    pressure: number;
    message: string;
  } | null>(null);

  // Handle Rocket Launch
  const handleLaunchRocket = () => {
    setLaunching(true);
    setLaunchResult(null);
    soundEffects.playStrokeChime();

    // Internal combustion pressure based on chemistry
    const peakPressure = Math.round((combustionQuality.eff / 100) * 75 + 15); // atm

    setTimeout(() => {
      if (casingType === 'bamboo') {
        // Bamboo ruptures if pressure > 22 atm
        if (peakPressure > 22) {
          soundEffects.playPuzzleSnap();
          setLaunchResult({
            success: false,
            range: 145,
            altitude: 40,
            pressure: peakPressure,
            message: '💥 CASING RUPTURE! Soft bamboo cylinder cracked at 22 atm. Gas leaked early with severe thrust loss.',
          });
        } else {
          setLaunchResult({
            success: true,
            range: 280,
            altitude: 90,
            pressure: peakPressure,
            message: 'Mild low-thrust launch. Bamboo survived only due to weak under-oxidized propellant.',
          });
        }
      } else {
        // Hammered iron succeeds and delivers tremendous range
        soundEffects.playSuccessDing();
        const baseRange = 1800 + (hasSwordBlade ? 350 : 0);
        const finalRange = Math.round(baseRange * (combustionQuality.eff / 100));
        setLaunchResult({
          success: true,
          range: finalRange,
          altitude: 420,
          pressure: peakPressure,
          message: `🚀 HISTORIC SUCCESS! Hammered iron withstood ${peakPressure} atm internal chamber pressure. ${
            hasSwordBlade ? 'Sword blade aerodynamic stabilizer sustained lethal trajectory!' : ''
          }`,
        });
      }
      setLaunching(false);
    }, 1200);
  };

  // --- TAB 3: DEEPAVALI NIGHT SKY CANVAS ---
  const nightCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeFirework, setActiveFirework] = useState<string>('candrajyoti');

  // Spawn firework on canvas
  const triggerFirework = useCallback((x: number, y: number, presetId: string) => {
    const canvas = nightCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const preset = HISTORIC_FIREWORKS.find((p) => p.id === presetId) || HISTORIC_FIREWORKS[0];
    soundEffects.playStrokeChime();

    const particles: { x: number; y: number; vx: number; vy: number; alpha: number; color: string; size: number }[] = [];
    const count = preset.effect === 'burst' ? 120 : preset.effect === 'fountain' ? 80 : 50;

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const speed = preset.effect === 'fountain' ? Math.random() * 5 + 2 : Math.random() * 6 + 1.5;
      particles.push({
        x,
        y: preset.effect === 'fountain' ? y : y,
        vx: preset.effect === 'fountain' ? (Math.random() - 0.5) * 3 : Math.cos(angle) * speed,
        vy: preset.effect === 'fountain' ? -(Math.random() * 6 + 3) : Math.sin(angle) * speed,
        alpha: 1,
        color: preset.color,
        size: Math.random() * 3 + 1.5,
      });
    }

    let frame = 0;
    const renderAnim = () => {
      frame++;
      ctx.fillStyle = 'rgba(7, 11, 22, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08; // gravity
        p.alpha -= 0.018;

        if (p.alpha > 0) {
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI);
          ctx.fill();
          ctx.restore();
        }
      });

      if (frame < 60) {
        requestAnimationFrame(renderAnim);
      }
    };
    renderAnim();
  }, []);

  // Initialize night sky canvas
  useEffect(() => {
    if (activeTab === 'fireworks' && nightCanvasRef.current) {
      const canvas = nightCanvasRef.current;
      canvas.width = canvas.parentElement?.clientWidth || 700;
      canvas.height = 360;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#070b16';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // Draw starry background
        for (let i = 0; i < 80; i++) {
          ctx.fillStyle = 'rgba(255, 255, 255, ' + Math.random() * 0.8 + ')';
          ctx.beginPath();
          ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 1.5, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
    }
  }, [activeTab]);

  return (
    <div className="vl-subsim" aria-label="Agnibāṇa & Fireworks Alchemy Lab">
      {/* Core Idea Badge */}
      <CoreIdea
        note={
          <span>
            From the 12th-century Hoysaleśvara Temple <em>Agnibāṇa</em> stone reliefs to the <em>Śukranīti</em> 5:1:1
            gunpowder formula, Dīpāvalī’s <em>Ulkā-Dāna</em> (ancestral flares), and Mysore’s hammered iron rockets that
            revolutionized global artillery at Pollilur (1780) and birthed modern aerospace engineering.
          </span>
        }
      >
        <strong>Combustion Chemistry &amp; High-Pressure Metallurgy:</strong> Long before industrial rocketry, Indian
        alchemists formulated <em>Agnicūrṇa</em> with stoichiometric precision, while Hyder Ali and Tipu Sultan replaced
        bursting bamboo with hammered iron casings to sustain 80 atm chamber pressure—expanding battlefield range from 150 m to 2.5 km.
      </CoreIdea>

      {/* Lab Nav Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', margin: '1.25rem 0', flexWrap: 'wrap' }}>
        <button
          type="button"
          className={`vl-btn ${activeTab === 'alchemy' ? 'vl-btn--active' : 'vl-btn--ghost'}`}
          onClick={() => setActiveTab('alchemy')}
          style={{ background: activeTab === 'alchemy' ? '#0f766e' : undefined, color: activeTab === 'alchemy' ? '#fff' : undefined }}
        >
          ⚗️ Agnicūrṇa Chemistry (5:1:1 Forge)
        </button>
        <button
          type="button"
          className={`vl-btn ${activeTab === 'rocket' ? 'vl-btn--active' : 'vl-btn--ghost'}`}
          onClick={() => setActiveTab('rocket')}
          style={{ background: activeTab === 'rocket' ? '#0f766e' : undefined, color: activeTab === 'rocket' ? '#fff' : undefined }}
        >
          🚀 Tāramaṇḍalpeṭ Rocket Stand (Bamboo vs Iron)
        </button>
        <button
          type="button"
          className={`vl-btn ${activeTab === 'fireworks' ? 'vl-btn--active' : 'vl-btn--ghost'}`}
          onClick={() => setActiveTab('fireworks')}
          style={{ background: activeTab === 'fireworks' ? '#0f766e' : undefined, color: activeTab === 'fireworks' ? '#fff' : undefined }}
        >
          🎆 Deepavali &amp; Kautuka Cintāmaṇi Lightshow
        </button>
        <button
          type="button"
          className={`vl-btn ${activeTab === 'dossier' ? 'vl-btn--active' : 'vl-btn--ghost'}`}
          onClick={() => setActiveTab('dossier')}
          style={{ background: activeTab === 'dossier' ? '#0f766e' : undefined, color: activeTab === 'dossier' ? '#fff' : undefined }}
        >
          📜 The Evolution Dossier (Sataghni to ISRO)
        </button>
      </div>

      {/* ===================================================================
          TAB 1: AGNICŪRṆA ALCHEMY CRUCIBLE
         =================================================================== */}
      {activeTab === 'alchemy' && (
        <div className="vl-bench" style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '16px', padding: '1.5rem' }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <h3 style={{ margin: 0, fontSize: '1.3rem', color: '#0f766e', fontWeight: 800 }}>
              ⚗️ The Śukranīti Propellant Forge (Agnicūrṇa 5:1:1 Ratio)
            </h3>
            <p style={{ margin: '0.3rem 0 0', fontSize: '0.88rem', color: '#64748b' }}>
              Adjust the 3 elemental reagents from the <em>Śukranīti</em> to discover why this specific stoichiometric ratio was selected.
            </p>
          </div>

          {/* Preset Buttons */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="vl-btn vl-btn--ghost"
              onClick={() => {
                setSaltpetre(5.0);
                setSulphur(1.0);
                setCharcoal(1.0);
                soundEffects.playStrokeChime();
              }}
              style={{ fontSize: '0.82rem' }}
            >
              ⭐ Ideal Śukranīti (5:1:1 Optimal)
            </button>
            <button
              type="button"
              className="vl-btn vl-btn--ghost"
              onClick={() => {
                setSaltpetre(2.0);
                setSulphur(0.8);
                setCharcoal(2.5);
                soundEffects.playStrokeChime();
              }}
              style={{ fontSize: '0.82rem' }}
            >
              💨 Arthaśāstra Smoke Screen (High Carbon)
            </button>
            <button
              type="button"
              className="vl-btn vl-btn--ghost"
              onClick={() => {
                setSaltpetre(7.0);
                setSulphur(2.0);
                setCharcoal(0.8);
                soundEffects.playStrokeChime();
              }}
              style={{ fontSize: '0.82rem' }}
            >
              🌟 Candrajyoti Moonlight Flare (High Nitre)
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {/* Sliders Box */}
            <div style={{ background: '#ffffff', borderRadius: '12px', padding: '1.25rem', border: '1px solid #e2e8f0' }}>
              {/* 1. Saltpetre Slider */}
              <div style={{ marginBottom: '1.1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', fontWeight: 700 }}>
                  <span style={{ color: '#0369a1' }}>1. Suvarcilavaṇa (Saltpetre / KNO₃)</span>
                  <span style={{ color: '#0284c7' }}>{saltpetre.toFixed(1)} parts ({kno3Pct}%)</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={saltpetre}
                  onChange={(e) => setSaltpetre(parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: '#0284c7' }}
                />
                <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
                  Role: <strong>Internal Oxidizer</strong>. Decomposes to supply O₂ for combustion in closed tubes.
                </div>
              </div>

              {/* 2. Sulphur Slider */}
              <div style={{ marginBottom: '1.1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', fontWeight: 700 }}>
                  <span style={{ color: '#b45309' }}>2. Gandhaka (Sulphur / S)</span>
                  <span style={{ color: '#d97706' }}>{sulphur.toFixed(1)} parts ({sPct}%)</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="3"
                  step="0.2"
                  value={sulphur}
                  onChange={(e) => setSulphur(parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: '#d97706' }}
                />
                <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
                  Role: <strong>Thermal Igniter</strong>. Lowers ignition temp from 450°C to ~250°C and accelerates burn speed.
                </div>
              </div>

              {/* 3. Charcoal Slider */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', fontWeight: 700 }}>
                  <span style={{ color: '#334155' }}>3. Aṅgāra (Charcoal / C)</span>
                  <span style={{ color: '#1e293b' }}>{charcoal.toFixed(1)} parts ({cPct}%)</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="3"
                  step="0.2"
                  value={charcoal}
                  onChange={(e) => setCharcoal(parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: '#1e293b' }}
                />
                <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
                  Role: <strong>Carbon Fuel</strong>. Burned in sealed pots from Arka wood to create microscopic porous void channels.
                </div>
              </div>
            </div>

            {/* Reaction Thermometer & Physics Readout */}
            <div style={{ background: '#ffffff', borderRadius: '12px', padding: '1.25rem', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Combustion Diagnostics
              </div>

              <div
                style={{
                  background: 'rgba(15, 23, 42, 0.04)',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  border: `1.5px solid ${combustionQuality.color}`,
                  marginBottom: '1rem',
                }}
              >
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: combustionQuality.color }}>
                  {combustionQuality.status}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.2rem' }}>
                  Stoichiometric Efficiency: <strong>{combustionQuality.eff}%</strong>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', fontSize: '0.84rem' }}>
                <div style={{ background: '#f8fafc', padding: '0.65rem', borderRadius: '8px' }}>
                  <div style={{ color: '#64748b', fontSize: '0.75rem' }}>Flame Temperature</div>
                  <strong style={{ fontSize: '1.1rem', color: '#b91c1c' }}>{combustionQuality.temp}°C</strong>
                </div>
                <div style={{ background: '#f8fafc', padding: '0.65rem', borderRadius: '8px' }}>
                  <div style={{ color: '#64748b', fontSize: '0.75rem' }}>Deflagration Speed</div>
                  <strong style={{ fontSize: '1.1rem', color: '#0f766e' }}>{combustionQuality.speed} m/s</strong>
                </div>
              </div>

              {/* Test Burn Button */}
              <div style={{ marginTop: '1.2rem' }}>
                <button
                  type="button"
                  className="vl-btn"
                  onClick={() => {
                    setCrucibleFired(true);
                    soundEffects.playSuccessDing();
                    setTimeout(() => setCrucibleFired(false), 2000);
                  }}
                  style={{
                    width: '100%',
                    background: crucibleFired ? '#10b981' : '#b45309',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.65rem',
                    fontWeight: 700,
                  }}
                >
                  {crucibleFired ? '🔥 Ignited! Deflagration Active' : '⚡ Test Crucible Deflagration'}
                </button>
              </div>
            </div>
          </div>

          {/* Material Property Explanation Cards */}
          <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            <div style={{ background: '#eff6ff', padding: '1rem', borderRadius: '10px', border: '1px solid #bfdbfe' }}>
              <h4 style={{ margin: '0 0 0.35rem', color: '#1e40af', fontSize: '0.9rem' }}>
                🌿 Why Arka / Snuhi Wood Charcoal?
              </h4>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#1e3a8a', lineHeight: 1.45 }}>
                Ordinary hardwoods like teak leave dense non-combustible ash. The <em>Śukranīti</em> specifically prescribes <em>Arka</em> (Calotropis gigantea) because its pithy wood forms lightweight, ultra-porous charcoal with millions of microscopic air channels for rapid flame spread.
              </p>
            </div>

            <div style={{ background: '#fef3c7', padding: '1rem', borderRadius: '10px', border: '1px solid #fde68a' }}>
              <h4 style={{ margin: '0 0 0.35rem', color: '#92400e', fontSize: '0.9rem' }}>
                🧄 Why Garlic (Rasona) &amp; Arka Juice?
              </h4>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#78350f', lineHeight: 1.45 }}>
                The text instructs soaking the ground powder in garlic and Arka juice before sun-drying. The sticky natural polysaccharides act as a chemical binder, agglomerating loose grains into cake matrices to prevent powder segregation during shipping and storage.
              </p>
            </div>

            <div style={{ background: '#f0fdf4', padding: '1rem', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
              <h4 style={{ margin: '0 0 0.35rem', color: '#166534', fontSize: '0.9rem' }}>
                ⚖️ Why the 5:1:1 Ratio Works
              </h4>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#14532d', lineHeight: 1.45 }}>
                Modern stoichiometric black powder uses a 75:15:10 ratio (2 KNO₃ + S + 3C → K₂S + N₂ + 3 CO₂). The Sanskrit 5:1:1 ratio (approx 71.4% : 14.3% : 14.3%) is remarkably close to the thermodynamic optimum!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================
          TAB 2: MYSOREAN ROCKET STAND (BAMBOO VS HAMMERED IRON)
         =================================================================== */}
      {activeTab === 'rocket' && (
        <div className="vl-bench" style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '16px', padding: '1.5rem' }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <h3 style={{ margin: 0, fontSize: '1.3rem', color: '#0f766e', fontWeight: 800 }}>
              🚀 Tāramaṇḍalpeṭ Rocket Stand: The Metallurgical Revolution
            </h3>
            <p style={{ margin: '0.3rem 0 0', fontSize: '0.88rem', color: '#64748b' }}>
              Test how Mysore’s hammered soft-iron casing shattered the pressure ceiling of traditional bamboo rockets.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
            {/* Rocket Specs Configuration */}
            <div style={{ background: '#ffffff', borderRadius: '12px', padding: '1.25rem', border: '1px solid #e2e8f0' }}>
              {/* Casing Selector */}
              <div style={{ marginBottom: '1.2rem' }}>
                <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#334155', marginBottom: '0.5rem' }}>
                  Select Casing Metallurgy:
                </div>
                <div style={{ display: 'flex', gap: '0.65rem' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setCasingType('bamboo');
                      soundEffects.playStrokeChime();
                    }}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      borderRadius: '10px',
                      border: casingType === 'bamboo' ? '2px solid #b45309' : '1px solid #cbd5e1',
                      background: casingType === 'bamboo' ? '#fef3c7' : '#ffffff',
                      color: casingType === 'bamboo' ? '#92400e' : '#475569',
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontSize: '0.86rem',
                    }}
                  >
                    🎋 Traditional Bamboo
                    <div style={{ fontSize: '0.72rem', fontWeight: 500, marginTop: '0.2rem' }}>Max Pressure: ~20 atm</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCasingType('iron');
                      soundEffects.playStrokeChime();
                    }}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      borderRadius: '10px',
                      border: casingType === 'iron' ? '2px solid #0f766e' : '1px solid #cbd5e1',
                      background: casingType === 'iron' ? '#ccfbf1' : '#ffffff',
                      color: casingType === 'iron' ? '#0f766e' : '#475569',
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontSize: '0.86rem',
                    }}
                  >
                    ⚔️ Mysorean Hammered Iron
                    <div style={{ fontSize: '0.72rem', fontWeight: 500, marginTop: '0.2rem' }}>Max Pressure: ~85 atm</div>
                  </button>
                </div>
              </div>

              {/* Sword Blade Toggle */}
              <div style={{ marginBottom: '1.2rem', padding: '0.75rem', background: '#f8fafc', borderRadius: '8px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer', fontSize: '0.86rem', fontWeight: 600 }}>
                  <input
                    type="checkbox"
                    checked={hasSwordBlade}
                    onChange={(e) => setHasSwordBlade(e.target.checked)}
                    style={{ width: '18px', height: '18px', accentColor: '#0f766e' }}
                  />
                  <span>Attach Bāṇa-dāra Sword Blade Stabilizer</span>
                </label>
                <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '0.25rem' }}>
                  Lashing a 1-meter razor blade to the bamboo guide shaft provided aerodynamic stabilization and inflicted devastating anti-cavalry impact damage.
                </div>
              </div>

              {/* Launch Action */}
              <button
                type="button"
                className="vl-btn"
                disabled={launching}
                onClick={handleLaunchRocket}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '0.85rem',
                  fontWeight: 800,
                  fontSize: '1rem',
                  borderRadius: '10px',
                  boxShadow: '0 4px 12px rgba(234, 88, 12, 0.3)',
                }}
              >
                {launching ? '🔥 Igniting Propellant Plume…' : '🚀 Launch Test Rocket'}
              </button>
            </div>

            {/* Launch Stand Graphical Diagram */}
            <div style={{ background: '#ffffff', borderRadius: '12px', padding: '1rem', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <svg viewBox="0 0 320 220" style={{ width: '100%', height: 'auto', display: 'block' }}>
                {/* Ground */}
                <rect x="0" y="200" width="320" height="20" fill="#e2e8f0" />
                {/* Launch Frame Stand */}
                <line x1="60" y1="200" x2="110" y2="100" stroke="#475569" strokeWidth="4" />
                <line x1="160" y1="200" x2="110" y2="100" stroke="#475569" strokeWidth="4" />
                <line x1="85" y1="150" x2="135" y2="150" stroke="#64748b" strokeWidth="2.5" />

                {/* Rocket Cylinder */}
                <g transform="rotate(-35 110 100)">
                  {/* Casing Tube */}
                  <rect
                    x="110"
                    y="90"
                    width="100"
                    height="18"
                    rx="4"
                    fill={casingType === 'iron' ? '#334155' : '#ca8a04'}
                    stroke={casingType === 'iron' ? '#0f172a' : '#854d0e'}
                    strokeWidth="2"
                  />
                  {/* Conical Warhead */}
                  <polygon points="210,87 232,99 210,111" fill={casingType === 'iron' ? '#94a3b8' : '#eab308'} />

                  {/* Bamboo guide shaft */}
                  <line x1="40" y1="99" x2="110" y2="99" stroke="#ca8a04" strokeWidth="3" />

                  {/* Optional Sword Blade */}
                  {hasSwordBlade && (
                    <polygon points="100,99 20,95 20,103" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
                  )}

                  {/* Plume Exhaust if launching */}
                  {launching && (
                    <polygon points="110,92 80,99 110,106" fill="#f97316" opacity="0.9" />
                  )}
                </g>
              </svg>

              {/* Launch Diagnostics Badge */}
              {launchResult && (
                <div
                  style={{
                    marginTop: '0.85rem',
                    padding: '0.85rem',
                    borderRadius: '8px',
                    background: launchResult.success ? '#ecfdf5' : '#fef2f2',
                    border: `1.5px solid ${launchResult.success ? '#10b981' : '#ef4444'}`,
                    textAlign: 'left',
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: '0.88rem', color: launchResult.success ? '#065f46' : '#991b1b' }}>
                    {launchResult.message}
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '0.4rem', fontSize: '0.82rem', color: '#475569' }}>
                    <span>Max Range: <strong>{launchResult.range} meters</strong></span>
                    <span>Apogee: <strong>{launchResult.altitude} m</strong></span>
                    <span>Chamber Pressure: <strong>{launchResult.pressure} atm</strong></span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================
          TAB 3: DEEPAVALI & KAUTUKA CINTĀMAṆI LIGHTSHOW
         =================================================================== */}
      {activeTab === 'fireworks' && (
        <div className="vl-bench" style={{ background: '#090d16', border: '1.5px solid #38bdf8', borderRadius: '16px', padding: '1.5rem', color: '#f8fafc' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.3rem', color: '#38bdf8', fontWeight: 800 }}>
                🎆 Deepavali &amp; Kautuka Cintāmaṇi Night Sky
              </h3>
              <p style={{ margin: '0.2rem 0 0', fontSize: '0.86rem', color: '#94a3b8' }}>
                Tap anywhere on the night sky to launch authentic 15th-century Sanskrit fireworks and ancestral Ulkā-Dāna flares!
              </p>
            </div>
            <button
              type="button"
              className="vl-btn"
              onClick={() => {
                const canvas = nightCanvasRef.current;
                if (canvas) {
                  triggerFirework(canvas.width * 0.25, 120, 'candrajyoti');
                  triggerFirework(canvas.width * 0.5, 90, 'ulkadana');
                  triggerFirework(canvas.width * 0.75, 140, 'camarabana');
                }
              }}
              style={{ background: '#f59e0b', color: '#000', fontWeight: 800, border: 'none' }}
            >
              ✨ Launch Royal Salvo!
            </button>
          </div>

          {/* Preset Selector */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', overflowX: 'auto', paddingBottom: '0.4rem' }}>
            {HISTORIC_FIREWORKS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => {
                  setActiveFirework(preset.id);
                  soundEffects.playStrokeChime();
                }}
                style={{
                  padding: '0.45rem 0.85rem',
                  borderRadius: '8px',
                  background: activeFirework === preset.id ? preset.color : 'rgba(255, 255, 255, 0.08)',
                  color: activeFirework === preset.id ? '#000' : '#f8fafc',
                  border: `1px solid ${preset.color}`,
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                {preset.dev} · {preset.title}
              </button>
            ))}
          </div>

          {/* Interactive Night Canvas */}
          <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
            <canvas
              ref={nightCanvasRef}
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                triggerFirework(x, y, activeFirework);
              }}
              style={{ width: '100%', height: '360px', display: 'block', cursor: 'crosshair' }}
            />
          </div>

          {/* Preset Lore Card */}
          {(() => {
            const current = HISTORIC_FIREWORKS.find((p) => p.id === activeFirework) || HISTORIC_FIREWORKS[0];
            return (
              <div style={{ marginTop: '1rem', background: 'rgba(15, 23, 42, 0.6)', padding: '0.85rem 1.1rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ margin: 0, color: current.color, fontSize: '0.98rem' }}>
                    {current.dev} — {current.title}
                  </h4>
                  <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{current.source}</span>
                </div>
                <p style={{ margin: '0.35rem 0 0', fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                  {current.desc}
                </p>
              </div>
            );
          })()}
        </div>
      )}

      {/* ===================================================================
          TAB 4: THE EVOLUTION DOSSIER
         =================================================================== */}
      {activeTab === 'dossier' && (
        <div style={{ background: '#0a0f1d', color: '#f8fafc', border: '1.5px solid #0d9488', borderRadius: '18px', padding: '1.85rem' }}>
          <div style={{ borderBottom: '1px solid rgba(20, 184, 166, 0.25)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#2dd4bf', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              ऐतिहासिक-क्रम-विकासः · The Strategic &amp; Cultural Trajectory
            </div>
            <h3 style={{ margin: '0.35rem 0 0', fontSize: '1.45rem', fontWeight: 900, color: '#fef08a' }}>
              The Evolution of Weapon Systems: From Śataghnī to Modern Spacecraft
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.4rem' }}>
            {/* 1. Purāṇic Sanskrit Texts & Temple Reliefs */}
            <div style={{ background: 'rgba(15, 23, 42, 0.7)', borderRadius: '12px', padding: '1.25rem', border: '1px solid rgba(20, 184, 166, 0.25)' }}>
              <h4 style={{ margin: '0 0 0.5rem', color: '#5eead4', fontSize: '1.05rem' }}>
                🏰 1. Śataghnī in Purāṇic Sanskrit Texts &amp; Hoysaleśvara Temple (12th c.)
              </h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.55 }}>
                Described in Purāṇic Sanskrit texts and the Itihāsas (Mahābhārata and Rāmāyaṇa), the <em>Śataghnī</em> ("that which slays a hundred") was an engineering rampart defense engine. While early colonial writers speculated about firearms, classical texts detail iron-studded beam mechanisms. By the 12th century, the walls of the Hoysaleśvara Temple in Halebidu, Karnataka, explicitly depict warriors firing combustive <strong>Agnibāṇa</strong> (fire-arrows) from multi-projectile launch stands.
              </p>
            </div>

            {/* 2. Deepavali & Sivakasi */}
            <div style={{ background: 'rgba(15, 23, 42, 0.7)', borderRadius: '12px', padding: '1.25rem', border: '1px solid rgba(245, 158, 11, 0.25)' }}>
              <h4 style={{ margin: '0 0 0.5rem', color: '#fde047', fontSize: '1.05rem' }}>
                🪔 2. Deepavali: From Oil Lamps to Festive Sparks
              </h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.55 }}>
                Originally a festival of silent clay <em>diyas</em>, Deepavali integrated pyrotechnics during the medieval era. The <em>Skanda Purāṇa</em> instituted <strong>Ulkā-Dāna</strong> (sky flares) to illuminate ancestral pathways. European visitors to 15th-century Vijayanagara recorded astonishment at lavish fireworks, later democratized post-1947 by manufacturing in Sivakasi.
              </p>
            </div>

            {/* 3. Mysorean War Rocket & Pollilur */}
            <div style={{ background: 'rgba(15, 23, 42, 0.7)', borderRadius: '12px', padding: '1.25rem', border: '1px solid rgba(239, 68, 68, 0.25)' }}>
              <h4 style={{ margin: '0 0 0.5rem', color: '#f87171', fontSize: '1.05rem' }}>
                ⚔️ 3. Mysorean Iron Rockets &amp; Pollilur (1780)
              </h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.55 }}>
                Hyder Ali and Tipu Sultan pioneered hammered soft-iron cylinders that sustained 80 atm internal combustion pressure, extending projectile range to 2.5 km. At the Battle of Pollilur (1780), Mysorean <em>Bāṇa-dāra</em> rocket corps detonated British ammunition caches in one of the East India Company’s most crushing defeats.
              </p>
            </div>

            {/* 4. Congreve to ISRO */}
            <div style={{ background: 'rgba(15, 23, 42, 0.7)', borderRadius: '12px', padding: '1.25rem', border: '1px solid rgba(139, 92, 246, 0.25)' }}>
              <h4 style={{ margin: '0 0 0.5rem', color: '#c4b5fd', fontSize: '1.05rem' }}>
                🚀 4. Royal Woolwich Arsenal to ISRO Solid Boosters
              </h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.55 }}>
                After Srirangapatna fell in 1799, the British shipped Mysorean rockets to the Woolwich Arsenal, where William Congreve reverse-engineered them (inspiring the "rocket’s red glare" in the US Anthem). Today, high-pressure metallic casing architecture lives on in the heavy solid propellant boosters powering ISRO's PSLV and GSLV into orbit.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Sanskrit Terms Panel */}
      <TermPanel terms={AGNIBANA_TERMS} title="Sanskrit Pyrotechnic & Aerospace Terminology" />

      {/* Challenge Questions */}
      <ChallengeList items={AGNIBANA_CHALLENGES} title="Agnibāṇa & Chemistry Challenges" />
    </div>
  );
};

export default AgnibanaRocketLab;
