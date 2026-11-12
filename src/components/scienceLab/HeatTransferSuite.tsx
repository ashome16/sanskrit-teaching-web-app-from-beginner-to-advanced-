import React, { useEffect, useRef, useState } from 'react';
import { soundEffects } from '../../utils/soundEffects';

export type HeatTransferMode = 'conduction' | 'convection' | 'radiation';
export type ChallengeId = 'melt_ice' | 'insulator' | 'equilibrium';

export const HeatTransferSuite: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'modes' | 'challenges' | 'clarification'>('modes');
  const [transferMode, setTransferMode] = useState<HeatTransferMode>('conduction');
  const [activeChallenge, setActiveChallenge] = useState<ChallengeId>('melt_ice');

  // Mode 1: Conduction state
  const [materialK, setMaterialK] = useState<'copper' | 'iron' | 'wood'>('iron');
  const conductionCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const conductionAnimRef = useRef<number | null>(null);
  const conductionTimeRef = useRef<number>(0);

  // Mode 2: Convection state
  const [convectionHeat, setConvectionHeat] = useState<number>(65); // %
  const convectionCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const convectionAnimRef = useRef<number | null>(null);
  const convectionTimeRef = useRef<number>(0);

  // Mode 3: Radiation state
  const [radiationTemp, setRadiationTemp] = useState<number>(1400); // Kelvin
  const radiationCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const radiationAnimRef = useRef<number | null>(null);
  const radiationTimeRef = useRef<number>(0);

  // Challenge 1: Melt Ice Without Burning state
  const [iceHeatPower, setIceHeatPower] = useState<number>(250); // Watts
  const [iceTemp, setIceTemp] = useState<number>(250); // Kelvin (-23 C)
  const [iceMeltProgress, setIceMeltProgress] = useState<number>(0); // 0 to 100%
  const [iceHeatingActive, setIceHeatingActive] = useState<boolean>(false);
  const [iceChallengeDone, setIceChallengeDone] = useState<boolean>(false);
  const [iceOverheated, setIceOverheated] = useState<boolean>(false);

  // Challenge 2: Keep Chai Warm (Insulator)
  const [insulatorType, setInsulatorType] = useState<'copper' | 'ceramic' | 'wood' | 'aerogel' | 'vacuum'>('ceramic');
  const [chaiTemp, setChaiTemp] = useState<number>(365); // 92 C
  const [chaiSimRunning, setChaiSimRunning] = useState<boolean>(false);
  const [chaiElapsedSec, setChaiElapsedSec] = useState<number>(0);

  // Challenge 3: Thermal Equilibrium Contact
  const [blockT1] = useState<number>(360); // Hot block A
  const [blockT2] = useState<number>(280); // Cool block B
  const [predictedTeq, setPredictedTeq] = useState<string>('344');
  const [blocksInContact, setBlocksInContact] = useState<boolean>(false);
  const [eqAnimProgress, setEqAnimProgress] = useState<number>(0);

  // ---------------------------------------------------------------------------
  // Canvas Loop 1: Conduction (Lattice Vibrational Propagation)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (activeTab !== 'modes' || transferMode !== 'conduction') return;
    const canvas = conductionCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let running = true;
    const kFactor = materialK === 'copper' ? 3.2 : materialK === 'iron' ? 1.0 : 0.12;

    const renderConduction = () => {
      if (!running) return;
      conductionTimeRef.current += 0.035 * kFactor;
      const t = conductionTimeRef.current;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Deep space background
      ctx.fillStyle = '#090e17';
      ctx.fillRect(0, 0, w, h);

      const barX = 110;
      const barY = h / 2 - 40;
      const barW = w - 220;
      const barH = 80;

      // Heat source on Left (Flame / Burner)
      ctx.fillStyle = 'rgba(239, 68, 68, 0.25)';
      ctx.beginPath();
      ctx.arc(barX - 45, h / 2, 50, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 28px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🔥', barX - 45, h / 2 + 10);
      ctx.font = 'bold 10px JetBrains Mono, monospace';
      ctx.fillText('HEAT SOURCE (650 K)', barX - 45, h / 2 + 32);

      // Heat Sink on Right (Ice / Cool Ambient)
      ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
      ctx.beginPath();
      ctx.arc(barX + barW + 45, h / 2, 50, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 28px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('❄️', barX + barW + 45, h / 2 + 10);
      ctx.font = 'bold 10px JetBrains Mono, monospace';
      ctx.fillText('HEAT SINK (290 K)', barX + barW + 45, h / 2 + 32);

      // Bar gradient representing Fourier steady-state heat conduction
      const barGrad = ctx.createLinearGradient(barX, 0, barX + barW, 0);
      barGrad.addColorStop(0, '#f87171');
      barGrad.addColorStop(0.35, '#fbbf24');
      barGrad.addColorStop(0.7, '#60a5fa');
      barGrad.addColorStop(1, '#38bdf8');
      ctx.fillStyle = barGrad;
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(barX, barY, barW, barH, 8);
      ctx.fill();
      ctx.stroke();

      // Draw vibrating lattice atoms
      const rows = 4;
      const cols = 16;
      const spX = barW / (cols + 1);
      const spY = barH / (rows + 1);

      for (let r = 1; r <= rows; r++) {
        for (let c = 1; c <= cols; c++) {
          const frac = (c - 1) / cols; // 0 (hot) to 1 (cold)
          // Hot atoms vibrate violently; cold atoms vibrate gently
          const vibAmp = (1 - frac) * 9 + 2;
          const jitterX = Math.sin(t * (18 - frac * 8) + r * 1.5 + c) * vibAmp;
          const jitterY = Math.cos(t * (16 - frac * 7) + r * 2.1 + c) * vibAmp;

          const ax = barX + c * spX + jitterX;
          const ay = barY + r * spY + jitterY;

          // Color shifts from red-hot to blue-cool
          const redVal = Math.round(250 * (1 - frac) + 60 * frac);
          const blueVal = Math.round(50 * (1 - frac) + 245 * frac);
          ctx.fillStyle = `rgb(${redVal}, 120, ${blueVal})`;
          ctx.beginPath();
          ctx.arc(ax, ay, 4.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Energy transfer direction vector arrows
      ctx.strokeStyle = 'rgba(253, 224, 71, 0.85)';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 6]);
      const arrowY = barY - 18;
      ctx.beginPath();
      ctx.moveTo(barX + 20, arrowY);
      ctx.lineTo(barX + barW - 20, arrowY);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#fde047';
      ctx.font = 'bold 10px JetBrains Mono, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(
        `CONDUCTION FLUX q = -k·A·(dT/dx) · Material k = ${
          materialK === 'copper' ? '385 W/m·K (Rapid)' : materialK === 'iron' ? '80 W/m·K (Moderate)' : '0.15 W/m·K (Insulator)'
        }`,
        w / 2,
        arrowY - 8
      );

      conductionAnimRef.current = requestAnimationFrame(renderConduction);
    };

    conductionAnimRef.current = requestAnimationFrame(renderConduction);
    return () => {
      running = false;
      if (conductionAnimRef.current) cancelAnimationFrame(conductionAnimRef.current);
    };
  }, [activeTab, transferMode, materialK]);

  // ---------------------------------------------------------------------------
  // Canvas Loop 2: Convection (Buoyant Fluid Loop)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (activeTab !== 'modes' || transferMode !== 'convection') return;
    const canvas = convectionCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let running = true;
    const particles = Array.from({ length: 65 }, () => ({
      x: 180 + Math.random() * 280,
      y: 60 + Math.random() * 200,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      temp: 295,
    }));

    const renderConvection = () => {
      if (!running) return;
      convectionTimeRef.current += 0.03;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Background
      ctx.fillStyle = '#090e17';
      ctx.fillRect(0, 0, w, h);

      const beakerX = w / 2 - 150;
      const beakerY = 40;
      const beakerW = 300;
      const beakerH = 240;

      // Burner under beaker
      const burnerPower = convectionHeat / 100;
      ctx.fillStyle = `rgba(239, 68, 68, ${0.3 + burnerPower * 0.5})`;
      ctx.beginPath();
      ctx.arc(w / 2, beakerY + beakerH + 35, 40 * burnerPower, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ef4444';
      ctx.font = '26px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🔥', w / 2, beakerY + beakerH + 42);

      // Glass Beaker Container
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.7)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(beakerX, beakerY);
      ctx.lineTo(beakerX, beakerY + beakerH);
      ctx.lineTo(beakerX + beakerW, beakerY + beakerH);
      ctx.lineTo(beakerX + beakerW, beakerY);
      ctx.stroke();

      // Fluid interior
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.fillRect(beakerX + 2, beakerY + 15, beakerW - 4, beakerH - 17);

      // Update and draw buoyant fluid particles
      particles.forEach((p) => {
        // Near bottom: particle absorbs heat and gets buoyant
        const distFromBottom = beakerY + beakerH - p.y;
        if (distFromBottom < 40) {
          p.temp = Math.min(370, p.temp + 4.5 * burnerPower);
        } else if (p.y < beakerY + 50) {
          // Near top: particle cools to ambient
          p.temp = Math.max(285, p.temp - 2.8);
        }

        // Hot fluid is less dense -> rises; Cold fluid is denser -> sinks
        const buoyancyForce = (p.temp - 305) * 0.035 * burnerPower;
        p.vy -= buoyancyForce;

        // Circular convection cell circulation: rising at center, sinking at flanks
        const centerOffset = p.x - w / 2;
        p.vx += Math.sign(centerOffset) * (p.temp > 310 ? 0.05 : -0.05);

        // Apply friction and bounds
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.x += p.vx;
        p.y += p.vy;

        // Containment bounds
        if (p.x < beakerX + 12) {
          p.x = beakerX + 12;
          p.vx = Math.abs(p.vx);
        }
        if (p.x > beakerX + beakerW - 12) {
          p.x = beakerX + beakerW - 12;
          p.vx = -Math.abs(p.vx);
        }
        if (p.y < beakerY + 22) {
          p.y = beakerY + 22;
          p.vy = Math.abs(p.vy);
        }
        if (p.y > beakerY + beakerH - 10) {
          p.y = beakerY + beakerH - 10;
          p.vy = -Math.abs(p.vy);
        }

        // Particle rendering: Color shifts from cold blue (285 K) to hot orange/red (370 K)
        const heatFrac = Math.max(0, Math.min(1, (p.temp - 285) / 85));
        const r = Math.round(56 + heatFrac * 190);
        const b = Math.round(248 - heatFrac * 200);
        ctx.fillStyle = `rgb(${r}, 120, ${b})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4.5 + heatFrac * 2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Convection cycle vector arrows
      ctx.strokeStyle = 'rgba(253, 224, 71, 0.7)';
      ctx.lineWidth = 1.8;
      ctx.setLineDash([4, 4]);

      // Center upward plume arrow
      ctx.beginPath();
      ctx.moveTo(w / 2, beakerY + beakerH - 30);
      ctx.lineTo(w / 2, beakerY + 45);
      ctx.stroke();

      // Left & right downward return arrows
      ctx.beginPath();
      ctx.moveTo(beakerX + 35, beakerY + 45);
      ctx.lineTo(beakerX + 35, beakerY + beakerH - 30);
      ctx.moveTo(beakerX + beakerW - 35, beakerY + 45);
      ctx.lineTo(beakerX + beakerW - 35, beakerY + beakerH - 30);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#fde047';
      ctx.font = 'bold 10px JetBrains Mono, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('CONVECTION CELL: Hot fluid expands (ρ↓) & rises; Cool fluid sinks (ρ↑)', w / 2, beakerY - 12);

      convectionAnimRef.current = requestAnimationFrame(renderConvection);
    };

    convectionAnimRef.current = requestAnimationFrame(renderConvection);
    return () => {
      running = false;
      if (convectionAnimRef.current) cancelAnimationFrame(convectionAnimRef.current);
    };
  }, [activeTab, transferMode, convectionHeat]);

  // ---------------------------------------------------------------------------
  // Canvas Loop 3: Radiation (Stefan-Boltzmann Vacuum Waves)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (activeTab !== 'modes' || transferMode !== 'radiation') return;
    const canvas = radiationCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let running = true;

    const renderRadiation = () => {
      if (!running) return;
      radiationTimeRef.current += 0.04;
      const t = radiationTimeRef.current;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Deep vacuum chamber background
      ctx.fillStyle = '#060a12';
      ctx.fillRect(0, 0, w, h);

      // Vacuum chamber border
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2;
      ctx.strokeRect(40, 20, w - 80, h - 40);

      ctx.fillStyle = '#64748b';
      ctx.font = '9.5px JetBrains Mono, monospace';
      ctx.textAlign = 'left';
      ctx.fillText('VACUUM CHAMBER (P < 10⁻⁵ Torr) · NO MATERIAL MEDIUM NEEDED', 52, 38);

      const emitterX = 140;
      const emitterY = h / 2;
      const receiverX = w - 140;
      const receiverY = h / 2;

      // Stefan-Boltzmann emission calculation: P = ε · σ · A · T⁴
      const stefanWatts = (5.67e-8 * (radiationTemp ** 4) * 0.005).toFixed(1);

      // Glowing thermal emitter sphere
      const radColor = radiationTemp > 1800 ? '#ffffff' : radiationTemp > 1200 ? '#fde047' : '#ef4444';
      const glowGrad = ctx.createRadialGradient(emitterX, emitterY, 8, emitterX, emitterY, 48);
      glowGrad.addColorStop(0, radColor);
      glowGrad.addColorStop(0.5, radiationTemp > 1200 ? 'rgba(245, 158, 11, 0.4)' : 'rgba(239, 68, 68, 0.3)');
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(emitterX, emitterY, 48, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = radColor;
      ctx.beginPath();
      ctx.arc(emitterX, emitterY, 18, 0, Math.PI * 2);
      ctx.fill();

      // Remote thermal absorber plate
      ctx.fillStyle = '#475569';
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(receiverX - 8, receiverY - 50, 16, 100, 4);
      ctx.fill();
      ctx.stroke();

      // Emit expanding electromagnetic wave-packet rings across vacuum
      for (let ring = 0; ring < 6; ring++) {
        const ringProgress = ((t * 35 + ring * 45) % 240) / 240;
        const radius = ringProgress * 240;
        if (radius > 18) {
          ctx.strokeStyle = `rgba(253, 224, 71, ${Math.max(0, 1 - ringProgress)})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(emitterX, emitterY, radius, -Math.PI / 3, Math.PI / 3);
          ctx.stroke();
        }
      }

      // Readouts
      ctx.fillStyle = '#fde047';
      ctx.font = 'bold 11px JetBrains Mono, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`EMITTER: ${radiationTemp} K · RADIANT POWER P ∝ T⁴ (${stefanWatts} W)`, emitterX, emitterY + 70);

      ctx.fillStyle = '#38bdf8';
      ctx.fillText('ABSORBER: RECEIVES INFRARED PHOTONS', receiverX, receiverY + 70);

      radiationAnimRef.current = requestAnimationFrame(renderRadiation);
    };

    radiationAnimRef.current = requestAnimationFrame(renderRadiation);
    return () => {
      running = false;
      if (radiationAnimRef.current) cancelAnimationFrame(radiationAnimRef.current);
    };
  }, [activeTab, transferMode, radiationTemp]);

  // ---------------------------------------------------------------------------
  // Challenge 1 Simulation Loop: Melt Ice Without Burning
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!iceHeatingActive || iceChallengeDone || iceOverheated) return;
    const interval = window.setInterval(() => {
      setIceTemp((prevT) => {
        // Below 273.15 K: specific heat warming of ice
        if (prevT < 273.15) {
          const next = prevT + (iceHeatPower / 120);
          return Math.min(273.15, next);
        }
        // At 273.15 K: Latent heat of fusion plateau!
        if (iceMeltProgress < 100) {
          setIceMeltProgress((prog) => {
            const nextProg = prog + (iceHeatPower / 18);
            if (nextProg >= 100) {
              soundEffects.playStrokeChime();
              return 100;
            }
            return nextProg;
          });
          return 273.15;
        }
        // Once 100% melted: water warming
        const next = prevT + (iceHeatPower / 100);
        if (next > 373.15) {
          setIceOverheated(true);
          setIceHeatingActive(false);
          soundEffects.playErrorBuzzer();
          return next;
        }
        if (next >= 295 && next <= 335) {
          setIceChallengeDone(true);
          setIceHeatingActive(false);
          soundEffects.playCelebrationChime();
        }
        return next;
      });
    }, 200);

    return () => window.clearInterval(interval);
  }, [iceHeatingActive, iceChallengeDone, iceOverheated, iceHeatPower, iceMeltProgress]);

  // ---------------------------------------------------------------------------
  // Challenge 2 Simulation Loop: Keep Chai Warm
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!chaiSimRunning) return;
    const interval = window.setInterval(() => {
      setChaiElapsedSec((s) => s + 1);
      // Newton's law of cooling: dT/dt = -k (T - T_ambient)
      const uRate =
        insulatorType === 'copper'
          ? 0.08
          : insulatorType === 'ceramic'
          ? 0.028
          : insulatorType === 'wood'
          ? 0.012
          : insulatorType === 'aerogel'
          ? 0.003
          : 0.0008; // vacuum

      setChaiTemp((prevT) => {
        const ambient = 295; // 22 C
        const next = prevT - uRate * (prevT - ambient);
        return Math.max(ambient, next);
      });
    }, 300);

    return () => window.clearInterval(interval);
  }, [chaiSimRunning, insulatorType]);

  // ---------------------------------------------------------------------------
  // Challenge 3 Simulation Loop: Thermal Equilibrium Contact
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!blocksInContact) return;
    const interval = window.setInterval(() => {
      setEqAnimProgress((p) => {
        if (p >= 1.0) {
          return 1.0;
        }
        return p + 0.05;
      });
    }, 100);
    return () => window.clearInterval(interval);
  }, [blocksInContact]);

  // Calculations for Challenge 3
  const m1 = 2.0; // kg
  const c1 = 900; // J/kg·K (Aluminum)
  const m2 = 1.0; // kg
  const c2 = 450; // J/kg·K (Iron)
  const exactTeq = (m1 * c1 * blockT1 + m2 * c2 * blockT2) / (m1 * c1 + m2 * c2);
  const currentBlock1T = blockT1 + (exactTeq - blockT1) * eqAnimProgress;
  const currentBlock2T = blockT2 + (exactTeq - blockT2) * eqAnimProgress;

  return (
    <div style={{ marginTop: '1.5rem', background: 'rgba(15, 23, 42, 0.7)', borderRadius: '14px', padding: '1.25rem', border: '1px solid rgba(148, 163, 184, 0.25)' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.6rem' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>🔥</span>
            <span>Thermal Dynamics, Heat Transfer &amp; Epistemology (ऊष्मा-विज्ञानम्)</span>
          </h3>
          <p style={{ margin: '0.2rem 0 0', fontSize: '0.78rem', color: '#94a3b8' }}>
            Explore particle kinetics, the three modes of heat transfer, latent heat plateaus, and the classical philosophical lens of Māyā.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="vl-btn-row">
          <button
            type="button"
            className={`vl-chip${activeTab === 'modes' ? ' is-on' : ''}`}
            onClick={() => setActiveTab('modes')}
          >
            🌊 3 Modes of Heat Transfer
          </button>
          <button
            type="button"
            className={`vl-chip${activeTab === 'challenges' ? ' is-on' : ''}`}
            onClick={() => setActiveTab('challenges')}
          >
            🎯 Thermal Challenges
          </button>
          <button
            type="button"
            className={`vl-chip${activeTab === 'clarification' ? ' is-on' : ''}`}
            onClick={() => setActiveTab('clarification')}
          >
            💡 Heat vs. Temp &amp; Māyā
          </button>
        </div>
      </div>

      {/* --------------------------------------------------------------------- */}
      {/* TAB 1: 3 MODES OF HEAT TRANSFER                                       */}
      {/* --------------------------------------------------------------------- */}
      {activeTab === 'modes' && (
        <div>
          <div className="vl-btn-row" style={{ marginBottom: '0.75rem', justifyContent: 'center' }}>
            <button
              type="button"
              className={`vl-chip${transferMode === 'conduction' ? ' is-on' : ''}`}
              onClick={() => setTransferMode('conduction')}
            >
              🔩 Conduction (सञ्चालन · Direct Lattice Contact)
            </button>
            <button
              type="button"
              className={`vl-chip${transferMode === 'convection' ? ' is-on' : ''}`}
              onClick={() => setTransferMode('convection')}
            >
              🌪️ Convection (संवहन · Fluid Density Currents)
            </button>
            <button
              type="button"
              className={`vl-chip${transferMode === 'radiation' ? ' is-on' : ''}`}
              onClick={() => setTransferMode('radiation')}
            >
              ☀️ Radiation (विकिरण · Vacuum Electromagnetic Waves)
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 260px', gap: '1rem', alignItems: 'start' }}>
            <div style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(148, 163, 184, 0.3)', background: '#090e17' }}>
              {transferMode === 'conduction' && (
                <canvas ref={conductionCanvasRef} width={640} height={320} style={{ width: '100%', height: 'auto', display: 'block' }} />
              )}
              {transferMode === 'convection' && (
                <canvas ref={convectionCanvasRef} width={640} height={320} style={{ width: '100%', height: 'auto', display: 'block' }} />
              )}
              {transferMode === 'radiation' && (
                <canvas ref={radiationCanvasRef} width={640} height={320} style={{ width: '100%', height: 'auto', display: 'block' }} />
              )}
            </div>

            {/* Controls Side Panel */}
            <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '0.85rem', borderRadius: '10px', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
              {transferMode === 'conduction' && (
                <div>
                  <b style={{ color: '#38bdf8', fontSize: '0.82rem', display: 'block', marginBottom: '0.4rem' }}>Material Conductivity (k):</b>
                  <div style={{ display: 'grid', gap: '0.35rem', marginBottom: '0.75rem' }}>
                    {(['copper', 'iron', 'wood'] as const).map((m) => (
                      <button
                        key={m}
                        type="button"
                        className={`vl-chip${materialK === m ? ' is-on' : ''}`}
                        style={{ fontSize: '0.75rem', justifyContent: 'flex-start' }}
                        onClick={() => setMaterialK(m)}
                      >
                        {m === 'copper' ? '🟠 Copper (k = 385 W/m·K)' : m === 'iron' ? '⚪ Iron (k = 80 W/m·K)' : '🪵 Wood (k = 0.15 W/m·K)'}
                      </button>
                    ))}
                  </div>
                  <p style={{ fontSize: '0.74rem', color: '#cbd5e1', lineHeight: '1.45' }}>
                    <strong>Conduction</strong> occurs through collisions between neighboring atoms and free electron movement in a solid lattice. No gross bulk matter moves!
                  </p>
                </div>
              )}

              {transferMode === 'convection' && (
                <div>
                  <b style={{ color: '#fbbf24', fontSize: '0.82rem', display: 'block', marginBottom: '0.4rem' }}>Burner Heat Input:</b>
                  <input
                    type="range"
                    min={20}
                    max={100}
                    value={convectionHeat}
                    onChange={(e) => setConvectionHeat(Number(e.target.value))}
                    style={{ width: '100%', marginBottom: '0.4rem' }}
                  />
                  <div style={{ fontSize: '0.78rem', color: '#fde047', marginBottom: '0.75rem' }}>Heat Power: {convectionHeat}%</div>
                  <p style={{ fontSize: '0.74rem', color: '#cbd5e1', lineHeight: '1.45' }}>
                    <strong>Convection</strong> requires a fluid (liquid or gas). Hot fluid expands, density decreases ($\rho \downarrow$), creating buoyant upward lift while cooler denser fluid sinks.
                  </p>
                </div>
              )}

              {transferMode === 'radiation' && (
                <div>
                  <b style={{ color: '#f87171', fontSize: '0.82rem', display: 'block', marginBottom: '0.4rem' }}>Emitter Temperature:</b>
                  <input
                    type="range"
                    min={600}
                    max={2400}
                    step={50}
                    value={radiationTemp}
                    onChange={(e) => setRadiationTemp(Number(e.target.value))}
                    style={{ width: '100%', marginBottom: '0.4rem' }}
                  />
                  <div style={{ fontSize: '0.78rem', color: '#f87171', marginBottom: '0.75rem' }}>T = {radiationTemp} K ({(radiationTemp - 273.15).toFixed(0)}°C)</div>
                  <p style={{ fontSize: '0.74rem', color: '#cbd5e1', lineHeight: '1.45' }}>
                    <strong>Radiation</strong> travels as electromagnetic waves (photons). It operates perfectly across a complete vacuum—this is how Sūrya warms the Earth across 150 million km of empty space!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* TAB 2: THERMAL CHALLENGES                                             */}
      {/* --------------------------------------------------------------------- */}
      {activeTab === 'challenges' && (
        <div>
          <div className="vl-btn-row" style={{ marginBottom: '0.75rem', justifyContent: 'center' }}>
            <button
              type="button"
              className={`vl-chip${activeChallenge === 'melt_ice' ? ' is-on' : ''}`}
              onClick={() => setActiveChallenge('melt_ice')}
            >
              🧊 Challenge 1: Melt Ice Without Burning
            </button>
            <button
              type="button"
              className={`vl-chip${activeChallenge === 'insulator' ? ' is-on' : ''}`}
              onClick={() => setActiveChallenge('insulator')}
            >
              ☕ Challenge 2: Keep Chai Warm (Insulator Design)
            </button>
            <button
              type="button"
              className={`vl-chip${activeChallenge === 'equilibrium' ? ' is-on' : ''}`}
              onClick={() => setActiveChallenge('equilibrium')}
            >
              ⚖️ Challenge 3: Thermal Equilibrium Contact
            </button>
          </div>

          {/* CHALLENGE 1: MELT ICE */}
          {activeChallenge === 'melt_ice' && (
            <div style={{ background: 'rgba(30, 41, 59, 0.65)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem', flexWrap: 'wrap', gap: '0.4rem' }}>
                <b style={{ color: '#38bdf8', fontSize: '0.95rem' }}>🧊 Mission: Master Latent Heat of Fusion (Lf = 334 kJ/kg)</b>
                <button
                  type="button"
                  className="vl-btn vl-btn--compact"
                  onClick={() => {
                    setIceTemp(250);
                    setIceMeltProgress(0);
                    setIceHeatingActive(false);
                    setIceChallengeDone(false);
                    setIceOverheated(false);
                  }}
                >
                  ↺ Reset Ice Chamber
                </button>
              </div>
              <p style={{ fontSize: '0.76rem', color: '#cbd5e1', margin: '0.3rem 0 0.75rem' }}>
                Goal: Supply thermal power to heat ice from 250 K (-23°C), melt 100% into water through the latent heat plateau at 273.15 K, and finish between 295 K and 335 K (drinkable water) without flashing into steam (&gt; 373 K)!
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', marginBottom: '0.85rem' }}>
                <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '0.75rem', borderRadius: '8px' }}>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>CURRENT TEMPERATURE:</span>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: iceTemp >= 373 ? '#ef4444' : iceTemp === 273.15 ? '#fde047' : '#38bdf8' }}>
                    {iceTemp.toFixed(1)} K ({(iceTemp - 273.15).toFixed(1)}°C)
                  </div>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                    {iceTemp < 273.15 ? 'Solid Ice Phase' : iceMeltProgress < 100 ? 'Latent Heat Phase (Melting)' : iceTemp > 373.15 ? 'Boiling Steam!' : 'Liquid Water Phase'}
                  </span>
                </div>
                <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '0.75rem', borderRadius: '8px' }}>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>MELT PROGRESS (LATENT HEAT):</span>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#4ade80' }}>
                    {iceMeltProgress.toFixed(0)}%
                  </div>
                  <div style={{ width: '100%', height: '6px', background: '#334155', borderRadius: '3px', marginTop: '0.35rem', overflow: 'hidden' }}>
                    <div style={{ width: `${iceMeltProgress}%`, height: '100%', background: '#4ade80' }} />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className={`vl-btn ${iceHeatingActive ? 'vl-btn--danger' : 'vl-btn--cyber'}`}
                  onClick={() => setIceHeatingActive(!iceHeatingActive)}
                  disabled={iceChallengeDone || iceOverheated}
                >
                  {iceHeatingActive ? '⏸ Cut Heating Power' : '🔥 Apply Heater Power'}
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: '#cbd5e1' }}>
                  <span>Power:</span>
                  <input
                    type="range"
                    min={100}
                    max={600}
                    step={25}
                    value={iceHeatPower}
                    onChange={(e) => setIceHeatPower(Number(e.target.value))}
                    disabled={iceHeatingActive}
                  />
                  <span>{iceHeatPower} W</span>
                </div>
              </div>

              {iceChallengeDone && (
                <div style={{ marginTop: '0.75rem', padding: '0.65rem', borderRadius: '8px', background: 'rgba(34, 197, 94, 0.2)', border: '1px solid #22c55e', color: '#4ade80', fontSize: '0.82rem' }}>
                  🎉 <strong>Mission Complete!</strong> You melted all ice while navigating the latent heat plateau at 273.15 K, finishing safely at {iceTemp.toFixed(1)} K without boiling!
                </div>
              )}
              {iceOverheated && (
                <div style={{ marginTop: '0.75rem', padding: '0.65rem', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', color: '#f87171', fontSize: '0.82rem' }}>
                  ⚠️ <strong>Overheated!</strong> Temperature exceeded 373.15 K and water boiled away into steam. Click 'Reset Ice Chamber' to try again with finer throttle control.
                </div>
              )}
            </div>
          )}

          {/* CHALLENGE 2: KEEP CHAI WARM */}
          {activeChallenge === 'insulator' && (
            <div style={{ background: 'rgba(30, 41, 59, 0.65)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(251, 191, 36, 0.3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem', flexWrap: 'wrap', gap: '0.4rem' }}>
                <b style={{ color: '#fbbf24', fontSize: '0.95rem' }}>☕ Mission: Insulator Design for Thermal Retention</b>
                <button
                  type="button"
                  className="vl-btn vl-btn--compact"
                  onClick={() => {
                    setChaiTemp(365);
                    setChaiElapsedSec(0);
                    setChaiSimRunning(false);
                  }}
                >
                  ↺ Fresh Hot Chai
                </button>
              </div>
              <p style={{ fontSize: '0.76rem', color: '#cbd5e1', margin: '0.3rem 0 0.75rem' }}>
                Select an insulator flask material and test how effectively it slows heat transfer (dQ/dt = -U · A · ΔT). Keep the chai above 335 K (62°C) for as long as possible!
              </p>

              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.85rem' }}>
                {(['copper', 'ceramic', 'wood', 'aerogel', 'vacuum'] as const).map((mat) => (
                  <button
                    key={mat}
                    type="button"
                    className={`vl-chip${insulatorType === mat ? ' is-on' : ''}`}
                    onClick={() => setInsulatorType(mat)}
                    disabled={chaiSimRunning}
                  >
                    {mat === 'copper'
                      ? 'Single Copper Cup'
                      : mat === 'ceramic'
                      ? 'Ceramic Mug'
                      : mat === 'wood'
                      ? 'Wooden Tumbler'
                      : mat === 'aerogel'
                      ? 'Aerogel Sleeve'
                      : 'Vacuum Flask (Dewar)'}
                  </button>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '0.85rem' }}>
                <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '0.75rem', borderRadius: '8px' }}>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>CHAI TEMPERATURE:</span>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: chaiTemp > 335 ? '#4ade80' : '#f87171' }}>
                    {chaiTemp.toFixed(1)} K ({(chaiTemp - 273.15).toFixed(1)}°C)
                  </div>
                  <span style={{ fontSize: '0.72rem', color: chaiTemp > 335 ? '#4ade80' : '#f87171' }}>
                    {chaiTemp > 335 ? '🔥 Still Hot & Drinkable' : '❄️ Cool / Lukewarm'}
                  </span>
                </div>
                <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '0.75rem', borderRadius: '8px' }}>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>ELAPSED TIME:</span>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#38bdf8' }}>{chaiElapsedSec} s</div>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Ambient: 295 K (22°C)</span>
                </div>
              </div>

              <button
                type="button"
                className={`vl-btn ${chaiSimRunning ? 'vl-btn--danger' : 'vl-btn--cyber'}`}
                onClick={() => setChaiSimRunning(!chaiSimRunning)}
              >
                {chaiSimRunning ? '⏸ Pause Cooling Test' : '▶ Start Cooling Test'}
              </button>
            </div>
          )}

          {/* CHALLENGE 3: THERMAL EQUILIBRIUM */}
          {activeChallenge === 'equilibrium' && (
            <div style={{ background: 'rgba(30, 41, 59, 0.65)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem', flexWrap: 'wrap', gap: '0.4rem' }}>
                <b style={{ color: '#c084fc', fontSize: '0.95rem' }}>⚖️ Mission: Predict Thermal Equilibrium (T_eq)</b>
                <button
                  type="button"
                  className="vl-btn vl-btn--compact"
                  onClick={() => {
                    setBlocksInContact(false);
                    setEqAnimProgress(0);
                  }}
                >
                  ↺ Separate Blocks
                </button>
              </div>
              <p style={{ fontSize: '0.76rem', color: '#cbd5e1', margin: '0.3rem 0 0.75rem' }}>
                Block A (m₁ = 2.0 kg, c₁ = 900 J/kg·K, T₁ = 360 K) touches Block B (m₂ = 1.0 kg, c₂ = 450 J/kg·K, T₂ = 280 K). Predict the final equilibrium temperature!
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.85rem' }}>
                <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '0.75rem', borderRadius: '8px', borderLeft: '4px solid #f87171' }}>
                  <b style={{ color: '#f87171', fontSize: '0.85rem' }}>Block A (Hot Aluminum):</b>
                  <div style={{ fontSize: '0.76rem', color: '#cbd5e1', marginTop: '0.2rem' }}>m₁ = 2.0 kg, c₁ = 900 J/kg·K</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f87171', marginTop: '0.2rem' }}>
                    T₁ = {currentBlock1T.toFixed(1)} K
                  </div>
                </div>
                <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '0.75rem', borderRadius: '8px', borderLeft: '4px solid #38bdf8' }}>
                  <b style={{ color: '#38bdf8', fontSize: '0.85rem' }}>Block B (Cold Iron):</b>
                  <div style={{ fontSize: '0.76rem', color: '#cbd5e1', marginTop: '0.2rem' }}>m₂ = 1.0 kg, c₂ = 450 J/kg·K</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#38bdf8', marginTop: '0.2rem' }}>
                    T₂ = {currentBlock2T.toFixed(1)} K
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: '#cbd5e1' }}>
                  <span>Your Prediction (K):</span>
                  <input
                    type="number"
                    value={predictedTeq}
                    onChange={(e) => setPredictedTeq(e.target.value)}
                    style={{ width: '80px', padding: '0.25rem 0.5rem', background: '#0f172a', border: '1px solid #475569', color: '#f8fafc', borderRadius: '4px' }}
                    disabled={blocksInContact}
                  />
                </div>
                <button
                  type="button"
                  className="vl-btn vl-btn--cyber"
                  onClick={() => {
                    setBlocksInContact(true);
                    soundEffects.playStrokeChime();
                  }}
                  disabled={blocksInContact}
                >
                  🤝 Bring Blocks Into Contact
                </button>
              </div>

              {blocksInContact && eqAnimProgress >= 1.0 && (
                <div style={{ marginTop: '0.85rem', padding: '0.75rem', borderRadius: '8px', background: 'rgba(15, 23, 42, 0.85)', border: '1px solid #c084fc', fontSize: '0.82rem', color: '#e2e8f0' }}>
                  <div>
                    🎯 <strong>Equilibrium Reached at {exactTeq.toFixed(1)} K!</strong>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                    Formula: T_eq = (m₁·c₁·T₁ + m₂·c₂·T₂) / (m₁·c₁ + m₂·c₂) = ((2)(900)(360) + (1)(450)(280)) / (1800 + 450) = 774000 / 2250 = 344.0 K.
                    {Math.abs(Number(predictedTeq) - exactTeq) <= 2
                      ? ' ✨ Your prediction was spot on!'
                      : ` (Your prediction was ${predictedTeq} K)`}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* TAB 3: CLARIFICATION & EPISTEMOLOGY                                   */}
      {/* --------------------------------------------------------------------- */}
      {activeTab === 'clarification' && (
        <div>
          {/* Heat vs. Temperature Clarification */}
          <div style={{ background: 'rgba(15, 23, 42, 0.85)', border: '1.5px solid rgba(56, 189, 248, 0.4)', borderRadius: '12px', padding: '1rem 1.25rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '1.4rem' }}>💡</span>
              <h4 style={{ margin: 0, color: '#38bdf8', fontSize: '1rem' }}>Fundamental Concept: Heat (ऊष्मा) vs. Temperature (तापमानम्)</h4>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: '1.6', margin: '0.35rem 0' }}>
              Although frequently conflated in conversational language, <strong>Heat</strong> and <strong>Temperature</strong> represent fundamentally different physical quantities:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem', marginTop: '0.65rem' }}>
              <div style={{ background: 'rgba(30, 41, 59, 0.8)', padding: '0.75rem', borderRadius: '8px', borderLeft: '3px solid #f59e0b' }}>
                <b style={{ color: '#fbbf24', display: 'block', fontSize: '0.85rem' }}>🌡️ Temperature (तापमानम् · T)</b>
                <p style={{ fontSize: '0.76rem', color: '#94a3b8', margin: '0.25rem 0' }}>
                  An <em>intensive property</em> measuring the <strong>average kinetic energy</strong> of individual particles:
                  <br />
                  <code>Ek = (3/2) · kB · T</code>
                  <br />
                  Independent of sample mass or volume.
                </p>
              </div>
              <div style={{ background: 'rgba(30, 41, 59, 0.8)', padding: '0.75rem', borderRadius: '8px', borderLeft: '3px solid #ef4444' }}>
                <b style={{ color: '#f87171', display: 'block', fontSize: '0.85rem' }}>🔥 Heat (ऊष्मा · Q)</b>
                <p style={{ fontSize: '0.76rem', color: '#94a3b8', margin: '0.25rem 0' }}>
                  An <em>extensive property</em> measuring the <strong>total thermal energy</strong> transferred between systems due to a temperature difference:
                  <br />
                  <code>Q = m · c · ΔT</code>
                  <br />
                  Scales directly with mass and heat capacity.
                </p>
              </div>
            </div>
            <div style={{ marginTop: '0.65rem', background: 'rgba(15, 23, 42, 0.6)', padding: '0.5rem 0.75rem', borderRadius: '6px', fontSize: '0.75rem', color: '#fde047' }}>
              ✨ <strong>The Sparkler vs. Iceberg Paradox:</strong> A tiny firework spark at 1,400°C has an extraordinarily high <em>temperature</em> but minimal <em>heat energy</em> (it cools harmlessly on skin). Conversely, a giant polar iceberg at -5°C has low temperature but millions of megajoules of total <em>heat energy</em> due to its massive bulk!
            </div>
          </div>

          {/* Māyā Epistemological Lens */}
          <div style={{ background: 'rgba(30, 27, 75, 0.55)', border: '1.5px solid rgba(168, 85, 247, 0.4)', borderRadius: '12px', padding: '1rem 1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '1.4rem' }}>👁️</span>
              <h4 style={{ margin: 0, color: '#c084fc', fontSize: '1rem' }}>Māyā &amp; Modern Physics: Appearance vs. Empirical Reality</h4>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: '1.6', margin: '0.35rem 0' }}>
              In classical Indian philosophy (Advaita &amp; Sāṅkhya), <strong lang="sa">माया (Māyā)</strong> does not mean the material universe is an illusion or non-existent. Rather, it denotes <em>the perceptual veil of macroscopic appearances</em>—the human brain registering vibrating, mostly-empty atomic clusters as continuous, solid, static objects.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem', marginTop: '0.65rem' }}>
              <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '0.75rem', borderRadius: '8px', borderLeft: '3px solid #38bdf8' }}>
                <b style={{ color: '#38bdf8', fontSize: '0.82rem' }}>👁️ Macroscopic Senses (Nāmarūpa · Asat lens)</b>
                <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0.2rem 0' }}>
                  Ice feels rock-hard and immobile. Gold appears continuous and impenetrable. Wood seems destroyed when burned to ashes.
                </p>
              </div>
              <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '0.75rem', borderRadius: '8px', borderLeft: '3px solid #4ade80' }}>
                <b style={{ color: '#4ade80', fontSize: '0.82rem' }}>🔬 Atomic Reality (Sat · Yukti &amp; Physics)</b>
                <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0.2rem 0' }}>
                  Atoms are 99.999% empty space, held in equilibrium by electromagnetic forces and jittering with quantum zero-point energy. Not a single particle is lost during combustion—they merely disperse as CO₂ and H₂O vapor.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
