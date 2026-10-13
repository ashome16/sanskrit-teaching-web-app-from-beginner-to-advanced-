import React, { useEffect, useRef, useState } from 'react';

// "Matrix walkthrough (for fun)": a 3-step gamer-HUD tour of the Veil of Māyā lab.
// The Matrix comparisons are a teaching analogy only, not a claim about the texts.

const K_B = 1.380649e-23;
const M_H2O = 18.015 * 1.66054e-27;
const T_WATER = 281; // 7 °C
const VRMS = Math.sqrt((3 * K_B * T_WATER) / M_H2O); // ≈ 623 m/s

const W = 260;
const H = 120;

const CrucibleView: React.FC<{ scan: boolean }> = ({ scan }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    const ctx = c?.getContext('2d');
    if (!c || !ctx) return;
    const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const ps = Array.from({ length: 34 }, () => {
      const a = Math.random() * Math.PI * 2;
      return { x: 10 + Math.random() * (W - 20), y: 10 + Math.random() * (H - 20), vx: Math.cos(a) * 1.6, vy: Math.sin(a) * 1.6 };
    });
    let raf = 0;
    let t = 0;
    const draw = () => {
      t += 1;
      ctx.clearRect(0, 0, W, H);
      if (!scan) {
        const g = ctx.createLinearGradient(0, 0, 0, H);
        g.addColorStop(0, '#0e4d6b');
        g.addColorStop(1, '#06283a');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
        ctx.strokeStyle = 'rgba(160,230,255,0.35)';
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          for (let x = 0; x <= W; x += 8) ctx.lineTo(x, 22 + i * 30 + Math.sin(x / 30 + t / 60) * 1.5);
          ctx.stroke();
        }
      } else {
        ctx.fillStyle = '#021a10';
        ctx.fillRect(0, 0, W, H);
        for (const p of ps) {
          if (!reduce) {
            p.x += p.vx; p.y += p.vy;
            if (p.x < 4 || p.x > W - 4) p.vx *= -1;
            if (p.y < 4 || p.y > H - 4) p.vy *= -1;
          }
        }
        for (let i = 0; i < ps.length; i++) for (let j = i + 1; j < ps.length; j++) {
          const a = ps[i], b = ps[j];
          const dx = b.x - a.x, dy = b.y - a.y;
          if (dx * dx + dy * dy < 49) { // elastic swap on contact: speed stays the same on average
            [a.vx, b.vx] = [b.vx, a.vx]; [a.vy, b.vy] = [b.vy, a.vy];
            ctx.fillStyle = 'rgba(250,250,120,0.8)';
            ctx.beginPath(); ctx.arc((a.x + b.x) / 2, (a.y + b.y) / 2, 5, 0, Math.PI * 2); ctx.fill();
          }
        }
        for (const p of ps) {
          ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.arc(p.x, p.y, 3.2, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#e5e7eb';
          ctx.beginPath(); ctx.arc(p.x - 3, p.y + 2, 1.6, 0, Math.PI * 2); ctx.arc(p.x + 3, p.y + 2, 1.6, 0, Math.PI * 2); ctx.fill();
        }
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [scan]);
  return <canvas ref={ref} width={W} height={H} style={{ width: '100%', maxWidth: W * 1.4, borderRadius: 8, border: '1px solid #22c55e55' }} aria-label={scan ? 'Viveka scan: water molecules colliding' : 'Smooth calm water'} />;
};

const STEPS = [
  { tag: 'LEVEL 01', title: 'The surface = Asat (“Matrix code”)' },
  { tag: 'LEVEL 02', title: 'Sealed Crucible · Andha-Mūṣā (अन्ध-मूषा)' },
  { tag: 'LEVEL 03', title: 'Phonon Lattice · 2,252 K' },
];

export const MatrixWalkthrough: React.FC = () => {
  const [step, setStep] = useState(0);
  const [scan, setScan] = useState(false);
  const mono: React.CSSProperties = { fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' };
  return (
    <section id="asato-matrix-walkthrough" className="vl-panel" aria-label="Matrix walkthrough (for fun)" data-testid="asato-matrix-walkthrough"
      style={{ background: '#03140b', color: '#bbf7d0', border: '1px solid #16a34a', borderRadius: 12, padding: '0.9rem 1rem', margin: '0.75rem 0' }}>
      <div style={{ ...mono, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6, fontSize: 12, color: '#4ade80' }}>
        <span>▣ MATRIX WALKTHROUGH (FOR FUN)</span>
        <span>Teaching analogy only · not a claim from the texts</span>
      </div>
      <div role="tablist" style={{ display: 'flex', gap: 6, margin: '0.6rem 0', flexWrap: 'wrap' }}>
        {STEPS.map((s, i) => (
          <button key={s.tag} type="button" role="tab" aria-selected={step === i} onClick={() => setStep(i)}
            style={{ ...mono, fontSize: 12, padding: '4px 10px', borderRadius: 6, cursor: 'pointer', border: '1px solid #22c55e', background: step === i ? '#16a34a' : 'transparent', color: step === i ? '#02120a' : '#86efac' }}>
            {s.tag}
          </button>
        ))}
      </div>
      <h4 style={{ margin: '0.2rem 0 0.4rem', color: '#f0fdf4' }}>{STEPS[step].title}</h4>

      {step === 0 && (
        <p style={{ margin: 0, lineHeight: 1.55 }}>
          The everyday world you see (solid gold, a still glass of water) is <strong>Asat</strong>: the rendered surface.
          Think of it as the green “Matrix code” on screen. Under it run the real rules: particles, motion and energy.
          Your tool for seeing past the render is <strong>Viveka</strong> (विवेक, discernment).
        </p>
      )}

      {step === 1 && (
        <div>
          <div style={{ ...mono, fontSize: 12, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(130px,1fr))', gap: 4, marginBottom: 8 }}>
            <span>TARGET: H₂O</span>
            <span>TEMP: {T_WATER} K (7 °C)</span>
            <span>v<sub>rms</sub>: ~{Math.round(VRMS)} m/s</span>
            <span>STATE: LIQUID</span>
          </div>
          <CrucibleView scan={scan} />
          <div style={{ margin: '0.5rem 0' }}>
            <button type="button" onClick={() => setScan((s) => !s)} aria-pressed={scan} data-testid="asato-matrix-scan"
              style={{ ...mono, fontSize: 12, padding: '4px 12px', borderRadius: 6, cursor: 'pointer', border: '1px solid #22c55e', background: scan ? '#16a34a' : 'transparent', color: scan ? '#02120a' : '#86efac' }}>
              👁️ VIVEKA SCANNER: {scan ? 'ON' : 'OFF'}
            </button>
          </div>
          <p style={{ margin: 0, lineHeight: 1.55 }}>
            Scanner off: calm, smooth water (Asat). Scanner on: molecules (paramāṇus in the lab’s language) zip about and collide.
            At 281 K their typical thermal speed is about {Math.round(VRMS)} m/s, a steady average speed, not an acceleration.
            Like the people asleep in the battery pods, the water <em>looks</em> still; <strong>tāpa</strong> (ताप, heat) is what keeps everything moving underneath.
          </p>
        </div>
      )}

      {step === 2 && (
        <div>
          <div style={{ ...mono, fontSize: 12, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 4, marginBottom: 8 }}>
            <span>THERMAL LOAD: 2,252 K</span>
            <span style={{ color: '#fca5a5' }}>⚠ PHASE TRANSITION IMMINENT (29 bonds broken)</span>
            <span>STABILITY: 0% · past Lindemann limit</span>
          </div>
          <p style={{ margin: 0, lineHeight: 1.55 }}>
            Heat makes the lattice shake in waves called <strong>phonons</strong>. When atoms swing more than roughly a tenth
            of their spacing (the Lindemann melt limit), bonds snap and the solid melts. Teaching analogy: like Neo bending the
            spoon, once you see the rules underneath, the “solid” is not as fixed as it looked. Open the Matrix Overwatch panel below to try it.
          </p>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
        <button type="button" disabled={step === 0} onClick={() => setStep((s) => s - 1)} style={{ ...mono, fontSize: 12, background: 'transparent', color: '#86efac', border: '1px solid #22c55e', borderRadius: 6, padding: '3px 10px', cursor: 'pointer', opacity: step === 0 ? 0.4 : 1 }}>◀ PREV</button>
        <button type="button" disabled={step === 2} onClick={() => setStep((s) => s + 1)} style={{ ...mono, fontSize: 12, background: 'transparent', color: '#86efac', border: '1px solid #22c55e', borderRadius: 6, padding: '3px 10px', cursor: 'pointer', opacity: step === 2 ? 0.4 : 1 }}>NEXT ▶</button>
      </div>
    </section>
  );
};

export default MatrixWalkthrough;
