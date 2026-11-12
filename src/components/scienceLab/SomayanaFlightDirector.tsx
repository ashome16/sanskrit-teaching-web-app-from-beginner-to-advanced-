import React, { useEffect, useRef, useState } from 'react';
import { soundEffects } from '../../utils/soundEffects';

export type FlightStage =
  | 'launch'
  | 'leo_orbit'
  | 'tli_burn'
  | 'lunar_capture'
  | 'soft_landing'
  | 'rover_surface';

export type FlightDifficulty = 'guided' | 'commander';

export interface StageTelemetry {
  altitudeKm: number;
  velocityKmS: number;
  fuelKg: number;
  deltaVRemaining: number;
  distToMoonKm: number;
  commDelaySec: number;
}

export const SomayanaFlightDirector: React.FC = () => {
  const [stage, setStage] = useState<FlightStage>('launch');
  const [difficulty, setDifficulty] = useState<FlightDifficulty>('guided');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [throttle, setThrottle] = useState<number>(85); // %
  const [pitchAngle, setPitchAngle] = useState<number>(45); // degrees
  const [stageProgress, setStageProgress] = useState<number>(0); // 0 to 100%
  const [failureReason, setFailureReason] = useState<string | null>(null);
  const [missionComplete, setMissionComplete] = useState<boolean>(false);

  // Flight Telemetry
  const [telemetry, setTelemetry] = useState<StageTelemetry>({
    altitudeKm: 0,
    velocityKmS: 0,
    fuelKg: 1800,
    deltaVRemaining: 2150, // m/s
    distToMoonKm: 384400,
    commDelaySec: 1.28,
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);

  // ---------------------------------------------------------------------------
  // Canvas Loop: Dynamic Astrodynamics Trajectory Map
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let running = true;

    const render = () => {
      if (!running) return;
      timeRef.current += 0.03;
      const t = timeRef.current;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Deep Space background
      const bg = ctx.createRadialGradient(w / 2, h / 2, 40, w / 2, h / 2, w / 2);
      bg.addColorStop(0, '#0a0f1d');
      bg.addColorStop(1, '#030712');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Distant stars
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      for (let i = 0; i < 40; i++) {
        const sx = ((i * 1234.5) % w);
        const sy = ((i * 987.6) % h);
        const sr = (i % 3 === 0) ? 1.5 : 1.0;
        ctx.fillRect(sx, sy, sr, sr);
      }

      // Earth at Left
      const earthX = 90;
      const earthY = h / 2;
      const earthR = 36;
      const earthGrad = ctx.createRadialGradient(earthX - 8, earthY - 8, 4, earthX, earthY, earthR);
      earthGrad.addColorStop(0, '#60a5fa');
      earthGrad.addColorStop(0.7, '#1e40af');
      earthGrad.addColorStop(1, '#0f172a');
      ctx.fillStyle = earthGrad;
      ctx.beginPath();
      ctx.arc(earthX, earthY, earthR, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#93c5fd';
      ctx.font = 'bold 9px JetBrains Mono, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('EARTH (PRITHVĪ)', earthX, earthY + earthR + 14);

      // Moon at Right
      const moonX = w - 90;
      const moonY = h / 2;
      const moonR = 24;
      const moonGrad = ctx.createRadialGradient(moonX - 5, moonY - 5, 2, moonX, moonY, moonR);
      moonGrad.addColorStop(0, '#f1f5f9');
      moonGrad.addColorStop(0.75, '#94a3b8');
      moonGrad.addColorStop(1, '#334155');
      ctx.fillStyle = moonGrad;
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonR, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#fde047';
      ctx.fillText('MOON (CHANDRA)', moonX, moonY + moonR + 14);

      // Hohmann Ballistic Transfer Corridor
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(earthX, earthY - 45);
      ctx.bezierCurveTo(w * 0.35, earthY - 140, w * 0.7, moonY - 100, moonX, moonY - 30);
      ctx.stroke();
      ctx.setLineDash([]);

      // Current Spacecraft Position based on stage & progress
      let shipX = earthX;
      let shipY = earthY;
      const p = stageProgress / 100;

      if (stage === 'launch') {
        shipX = earthX + p * 25;
        shipY = earthY - (earthR + p * 25);
      } else if (stage === 'leo_orbit') {
        const orbAngle = t * 1.5;
        shipX = earthX + Math.cos(orbAngle) * 55;
        shipY = earthY + Math.sin(orbAngle) * 55;
      } else if (stage === 'tli_burn' || stage === 'lunar_capture') {
        // Traveling along transfer ellipse
        const tliProg = stage === 'tli_burn' ? p * 0.5 : 0.5 + p * 0.5;
        const bX = (1 - tliProg) ** 2 * earthX + 2 * (1 - tliProg) * tliProg * (w * 0.5) + tliProg ** 2 * moonX;
        const bY = (1 - tliProg) ** 2 * (earthY - 45) + 2 * (1 - tliProg) * tliProg * (earthY - 120) + tliProg ** 2 * (moonY - 30);
        shipX = bX;
        shipY = bY;
      } else if (stage === 'soft_landing') {
        shipX = moonX - (1 - p) * 20;
        shipY = moonY - (moonR + (1 - p) * 35);
      } else if (stage === 'rover_surface') {
        shipX = moonX;
        shipY = moonY - moonR - 4;
      }

      // Spacecraft Icon & Propulsion Flare
      ctx.fillStyle = '#fde047';
      ctx.beginPath();
      ctx.arc(shipX, shipY, 4.5, 0, Math.PI * 2);
      ctx.fill();

      if (isPlaying) {
        ctx.fillStyle = 'rgba(239, 68, 68, 0.75)';
        ctx.beginPath();
        ctx.arc(shipX - 6, shipY, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Range line to Moon
      ctx.strokeStyle = 'rgba(250, 204, 21, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(shipX, shipY);
      ctx.lineTo(moonX, moonY);
      ctx.stroke();

      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);
    return () => {
      running = false;
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [stage, stageProgress, isPlaying]);

  // ---------------------------------------------------------------------------
  // Flight Execution Simulation Loop
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!isPlaying || failureReason || missionComplete) return;

    const interval = window.setInterval(() => {
      setStageProgress((prev) => {
        const burnRate = (throttle / 100) * 1.5;
        const next = prev + burnRate;

        // Propellant consumption: m_dot = Thrust / (Isp * g0)
        const fuelBurnKg = (throttle / 100) * 7.5;
        const dvSpent = (throttle / 100) * 9.2;

        setTelemetry((t) => {
          const nextFuel = Math.max(0, t.fuelKg - fuelBurnKg);
          const nextDV = Math.max(0, t.deltaVRemaining - dvSpent);

          // Check fuel depletion failure
          if (nextFuel <= 0 && stage !== 'rover_surface') {
            setFailureReason('🚨 Propellant Depleted: Fuel tanks ran dry before orbital transfer completed.');
            setIsPlaying(false);
            soundEffects.playErrorBuzzer();
          }

          // Advance altitude & velocity per stage
          let alt = t.altitudeKm;
          let vel = t.velocityKmS;
          let dist = t.distToMoonKm;

          if (stage === 'launch') {
            alt += 4.5;
            vel = Math.min(7.8, vel + 0.18);
          } else if (stage === 'leo_orbit') {
            alt = 180;
            vel = 7.78;
          } else if (stage === 'tli_burn') {
            vel = Math.min(10.9, vel + 0.25);
            dist = Math.max(10000, dist - 12000);
          } else if (stage === 'lunar_capture') {
            vel = Math.max(1.68, vel - 0.22);
            dist = Math.max(100, dist - 3000);
            alt = 100;
          } else if (stage === 'soft_landing') {
            alt = Math.max(0, alt - 1.2);
            vel = Math.max(0.8, vel - 0.08);
            dist = 0;
          }

          return {
            ...t,
            altitudeKm: alt,
            velocityKmS: Number(vel.toFixed(2)),
            fuelKg: Math.round(nextFuel),
            deltaVRemaining: Math.round(nextDV),
            distToMoonKm: Math.round(dist),
          };
        });

        // Check stage completion
        if (next >= 100) {
          soundEffects.playStrokeChime();
          setIsPlaying(false);

          if (stage === 'launch') {
            setStage('leo_orbit');
            setStageProgress(0);
          } else if (stage === 'leo_orbit') {
            setStage('tli_burn');
            setStageProgress(0);
          } else if (stage === 'tli_burn') {
            setStage('lunar_capture');
            setStageProgress(0);
          } else if (stage === 'lunar_capture') {
            setStage('soft_landing');
            setStageProgress(0);
          } else if (stage === 'soft_landing') {
            if (telemetry.velocityKmS > 2.0) {
              setFailureReason(`💥 Hard Impact: Touchdown speed reached ${telemetry.velocityKmS} m/s, exceeding the 2.0 m/s structural threshold of the landing gear.`);
              soundEffects.playErrorBuzzer();
            } else {
              setStage('rover_surface');
              setStageProgress(100);
              setMissionComplete(true);
              soundEffects.playCelebrationChime();
            }
          }
          return 100;
        }

        return next;
      });
    }, 150);

    return () => window.clearInterval(interval);
  }, [isPlaying, stage, throttle, failureReason, missionComplete, telemetry.velocityKmS]);

  const resetMission = () => {
    setStage('launch');
    setStageProgress(0);
    setIsPlaying(false);
    setFailureReason(null);
    setMissionComplete(false);
    setTelemetry({
      altitudeKm: 0,
      velocityKmS: 0,
      fuelKg: 1800,
      deltaVRemaining: 2150,
      distToMoonKm: 384400,
      commDelaySec: 1.28,
    });
  };

  const STAGE_TITLES: Record<FlightStage, { title: string; dev: string; goal: string }> = {
    launch: {
      title: 'Stage 1: Launch & Atmospheric Ascent',
      dev: 'पृथ्वी-उत्क्षेपणम्',
      goal: 'Accelerate through atmosphere, perform pitch-over maneuver to gain horizontal velocity.',
    },
    leo_orbit: {
      title: 'Stage 2: Low Earth Orbit Circularization',
      dev: 'भू-कक्षा-स्थापनम्',
      goal: 'Maintain stable 180 km parking orbit at 7.78 km/s before Trans-Lunar Injection.',
    },
    tli_burn: {
      title: 'Stage 3: Trans-Lunar Injection (TLI)',
      dev: 'सोम-प्रक्षेप-पथः',
      goal: 'Execute burn near perigee to raise apogee to 384,400 km into the lunar transfer corridor.',
    },
    lunar_capture: {
      title: 'Stage 4: Lunar Orbit Insertion (LOI)',
      dev: 'चन्द्र-कक्षा-प्रवेशः',
      goal: 'Perform retrograde braking burn at perilune to be captured by lunar gravity into a 100 km orbit.',
    },
    soft_landing: {
      title: 'Stage 5: Powered Terminal Descent',
      dev: 'स-वेग-अवतरणम्',
      goal: 'Throttle thrusters to touch down at Shiv Shakti Point at ≤ 2.0 m/s.',
    },
    rover_surface: {
      title: 'Stage 6: Pragyan Surface Mineralogy',
      dev: 'प्रज्ञान-सञ्चारः',
      goal: 'Deploy rover ramp, roll onto lunar regolith, fire APXS laser spectrometer.',
    },
  };

  return (
    <div style={{ marginTop: '1.5rem', background: 'rgba(15, 23, 42, 0.85)', borderRadius: '14px', padding: '1.25rem', border: '1px solid rgba(148, 163, 184, 0.3)' }}>
      {/* Header & Difficulty Toggle */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.6rem' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>🚀</span>
            <span>Somayāna-03: Spaceflight Astrodynamics Mission (सोमयान-अभियानम्)</span>
          </h3>
          <p style={{ margin: '0.2rem 0 0', fontSize: '0.78rem', color: '#94a3b8' }}>
            Pilot a 6-stage lunar flight trajectory with real delta-v budgets, gravity assists, and telemetry.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            type="button"
            className={`vl-chip${difficulty === 'guided' ? ' is-on' : ''}`}
            onClick={() => setDifficulty('guided')}
          >
            🧭 Guided Mode (Beginner)
          </button>
          <button
            type="button"
            className={`vl-chip${difficulty === 'commander' ? ' is-on' : ''}`}
            onClick={() => setDifficulty('commander')}
          >
            ⚡ Commander Mode (Manual Δv)
          </button>
          <button
            type="button"
            className="vl-btn vl-btn--compact"
            onClick={resetMission}
          >
            ↺ Abort / Reset Mission
          </button>
        </div>
      </div>

      {/* Stage Flow Bar */}
      <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
        {(['launch', 'leo_orbit', 'tli_burn', 'lunar_capture', 'soft_landing', 'rover_surface'] as FlightStage[]).map((s, idx) => (
          <div
            key={s}
            style={{
              flex: 1,
              minWidth: '130px',
              padding: '0.45rem 0.65rem',
              borderRadius: '8px',
              background: stage === s ? 'rgba(56, 189, 248, 0.2)' : 'rgba(30, 41, 59, 0.5)',
              border: stage === s ? '1.5px solid #38bdf8' : '1px solid rgba(148, 163, 184, 0.2)',
              color: stage === s ? '#38bdf8' : '#94a3b8',
              fontSize: '0.72rem',
            }}
          >
            <div style={{ fontWeight: 700 }}>Step {idx + 1}: {s.split('_')[0].toUpperCase()}</div>
            <div style={{ fontSize: '0.68rem', color: '#cbd5e1' }}>{STAGE_TITLES[s].dev}</div>
          </div>
        ))}
      </div>

      {/* Canvas & Telemetry Display */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 280px', gap: '1rem', alignItems: 'start', marginBottom: '1rem' }}>
        <div style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(148, 163, 184, 0.25)', background: '#030712' }}>
          <canvas ref={canvasRef} width={640} height={300} style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>

        {/* Telemetry Dashboard HUD */}
        <div style={{ background: 'rgba(15, 23, 42, 0.95)', padding: '0.85rem', borderRadius: '10px', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
          <div style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
            🛰️ MISSION CONTROL TELEMETRY HUD
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.74rem' }}>
            <div>
              <span style={{ color: '#94a3b8' }}>Altitude:</span>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#f8fafc' }}>
                {telemetry.altitudeKm.toFixed(1)} km
              </div>
            </div>
            <div>
              <span style={{ color: '#94a3b8' }}>Velocity:</span>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#f8fafc' }}>
                {telemetry.velocityKmS.toFixed(2)} km/s
              </div>
            </div>
            <div>
              <span style={{ color: '#94a3b8' }}>Propellant Mass:</span>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: telemetry.fuelKg < 300 ? '#ef4444' : '#4ade80' }}>
                {telemetry.fuelKg} kg
              </div>
            </div>
            <div>
              <span style={{ color: '#94a3b8' }}>Δv Budget Left:</span>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fde047' }}>
                {telemetry.deltaVRemaining} m/s
              </div>
            </div>
            <div>
              <span style={{ color: '#94a3b8' }}>Distance to Moon:</span>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#38bdf8' }}>
                {telemetry.distToMoonKm.toLocaleString()} km
              </div>
            </div>
            <div>
              <span style={{ color: '#94a3b8' }}>Signal Delay (c):</span>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#cbd5e1' }}>
                {telemetry.commDelaySec} s
              </div>
            </div>
          </div>

          <div style={{ marginTop: '0.75rem', borderTop: '1px solid rgba(148, 163, 184, 0.2)', paddingTop: '0.5rem' }}>
            <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>STAGE PROGRESS:</span>
            <div style={{ width: '100%', height: '6px', background: '#334155', borderRadius: '3px', marginTop: '0.2rem', overflow: 'hidden' }}>
              <div style={{ width: `${stageProgress}%`, height: '100%', background: '#38bdf8' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Flight Control Controls */}
      <div style={{ background: 'rgba(30, 41, 59, 0.55)', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid rgba(148, 163, 184, 0.2)', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.4rem' }}>
          <div>
            <b style={{ color: '#f8fafc', fontSize: '0.9rem' }}>{STAGE_TITLES[stage].title}</b>
            <div style={{ fontSize: '0.74rem', color: '#38bdf8' }}>{STAGE_TITLES[stage].goal}</div>
          </div>

          <button
            type="button"
            className={`vl-btn ${isPlaying ? 'vl-btn--danger' : 'vl-btn--cyber'}`}
            style={{ padding: '0.55rem 1.25rem' }}
            onClick={() => {
              setIsPlaying(!isPlaying);
              if (!isPlaying) soundEffects.playErrorBuzzer();
            }}
            disabled={failureReason !== null || missionComplete}
          >
            {isPlaying ? '⏸ Hold Burn' : '🔥 Execute Engine Burn'}
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '0.65rem' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: '#cbd5e1', marginBottom: '0.25rem' }}>
              <span>Engine Throttle:</span>
              <strong style={{ color: '#fde047' }}>{throttle}%</strong>
            </div>
            <input
              type="range"
              min={20}
              max={100}
              step={5}
              value={throttle}
              onChange={(e) => setThrottle(Number(e.target.value))}
              disabled={isPlaying}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: '#cbd5e1', marginBottom: '0.25rem' }}>
              <span>Thrust Vector Pitch:</span>
              <strong style={{ color: '#38bdf8' }}>{pitchAngle}°</strong>
            </div>
            <input
              type="range"
              min={0}
              max={90}
              step={5}
              value={pitchAngle}
              onChange={(e) => setPitchAngle(Number(e.target.value))}
              disabled={isPlaying}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </div>

      {/* Constructive Failure or Mission Success Feedback */}
      {failureReason && (
        <div style={{ padding: '0.85rem', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.2)', border: '1.5px solid #ef4444', color: '#fca5a5', fontSize: '0.82rem', marginBottom: '1rem' }}>
          <strong>Flight Telemetry Abort:</strong> {failureReason}
          <div style={{ marginTop: '0.4rem', fontSize: '0.76rem', color: '#fecaca' }}>
            💡 <em>Diagnostic:</em> Adjust throttle to conserve propellant, or brake earlier during powered descent to keep touchdown speed under 2.0 m/s.
          </div>
        </div>
      )}

      {missionComplete && (
        <div style={{ padding: '0.85rem', borderRadius: '8px', background: 'rgba(34, 197, 94, 0.2)', border: '1.5px solid #22c55e', color: '#86efac', fontSize: '0.85rem', marginBottom: '1rem' }}>
          🎉 <strong>MISSION SUCCESSFUL: Somayāna-03 has touched down at Shiv Shakti Point!</strong>
          <div style={{ fontSize: '0.78rem', color: '#bbf7d0', marginTop: '0.3rem' }}>
            Pragyan rover ramp has deployed. APXS and LIBS spectrometers confirm elemental sulfur, titanium, and iron in the South Pole lunar regolith.
          </div>
        </div>
      )}

      {/* Cultural & Scientific Distinction Callout */}
      <div style={{ background: 'rgba(30, 27, 75, 0.55)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(168, 85, 247, 0.35)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '1.3rem' }}>🌌</span>
          <h4 style={{ margin: 0, color: '#c084fc', fontSize: '0.95rem' }}>
            Cultural Metaphor vs. Aerospace Physics (सोमयान &amp; खगोल-भौतिकी)
          </h4>
        </div>
        <p style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: '1.6', margin: '0.25rem 0' }}>
          In classical Sanskrit literature, <strong lang="sa">सोम (Soma / Chandra)</strong> was celebrated as the deity of tides, poetic ecstasy, and botanical vital juices (<em>Oṣadhi-pati</em>). In contemporary science, India’s Chandrayaan missions honor this civilizational heritage in nomenclature while executing strict Newtonian and Keplerian celestial mechanics:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem', marginTop: '0.65rem' }}>
          <div style={{ background: 'rgba(15, 23, 42, 0.75)', padding: '0.75rem', borderRadius: '8px', borderLeft: '3px solid #fbbf24' }}>
            <b style={{ color: '#fbbf24', fontSize: '0.82rem' }}>📜 Cultural Heritage Framing</b>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0.2rem 0' }}>
              Names like <em>Somayāna</em>, <em>Vikram</em> (valour), and <em>Pragyān</em> (higher wisdom) represent cultural pride and continuity with ancient Indian stargazing traditions.
            </p>
          </div>
          <div style={{ background: 'rgba(15, 23, 42, 0.75)', padding: '0.75rem', borderRadius: '8px', borderLeft: '3px solid #38bdf8' }}>
            <b style={{ color: '#38bdf8', fontSize: '0.82rem' }}>🚀 Empirical Astrodynamics</b>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0.2rem 0' }}>
              Governed strictly by orbital mechanics: vis-viva equation (v² = GM(2/r - 1/a)), Tsiolkovsky rocket equation (Δv = Isp · g₀ · ln(m₀/mf)), and closed-loop inertial sensor guidance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
