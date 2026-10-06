import React, { useEffect, useRef, useState } from 'react';
import { GlowSlider } from './controls';
import { prefersReducedMotion } from './motion';
import {
  COLS,
  KT_PER_K,
  ROWS,
  SIM_UNITS_PER_S,
  brokenCount,
  createLattice,
  overclockToK,
  stabilityPct,
  stepLattice,
  suppressionToGamma,
  thermostatShare,
  type Lattice,
  type Mode,
} from './matrixLattice';

const W = 640;
const H = 400;
const SP = 50; // lattice spacing on screen, px
const X0 = (W - (COLS - 0.5) * SP) / 2;
const Y0 = (H - (ROWS - 1) * SP * (Math.sqrt(3) / 2)) / 2 + 6;
const CYAN = '34,211,238';
const MAGENTA = '232,121,249';
const IMMINENT = 30; // % stability at or below which the warning shows (neighbour distances jitter by ≳ 8%)

const driveFor = (overclock: number, suppress: number, mode: Mode) => ({
  mode,
  tempK: overclockToK(overclock),
  noise: thermostatShare(overclock),
  gamma: suppressionToGamma(suppress),
});

/**
 * Matrix Overwatch: a living diatomic lattice (heavy Alpha + light Beta nodes on springs).
 * Acoustic = neighbours move together (long ripples); optical = Alpha and Beta move against each other (fast shimmer).
 */
const MatrixOverwatch: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const loadRef = useRef<HTMLElement>(null);
  const stabRef = useRef<HTMLElement>(null);
  const [overclock, setOverclock] = useState(40);
  const [suppress, setSuppress] = useState(30);
  const [mode, setMode] = useState<Mode>('acoustic');
  const [paused, setPaused] = useState(() => prefersReducedMotion());
  const [onScreen, setOnScreen] = useState(true);
  const [tabVisible, setTabVisible] = useState(() => (typeof document === 'undefined' ? true : !document.hidden));
  const [warn, setWarn] = useState<{ on: boolean; broken: number }>({ on: false, broken: 0 });
  // The lattice is one mutable simulation object, made (and warmed up) once.
  const [lattice] = useState<Lattice>(() => {
    const L = createLattice();
    const d = driveFor(40, 30, 'acoustic');
    for (let i = 0; i < 120; i += 1) stepLattice(L, 0.5, d);
    return L;
  });
  const settings = useRef(driveFor(overclock, suppress, mode));
  useEffect(() => {
    settings.current = driveFor(overclock, suppress, mode);
  }, [overclock, suppress, mode]);
  const reduced = useRef(prefersReducedMotion());

  const gamma = suppressionToGamma(suppress);
  const dampMs = Math.round((1 / gamma / SIM_UNITS_PER_S) * 1000);

  const draw = () => {
    const cv = canvasRef.current;
    const L = lattice;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;
    const k = cv.width / W;
    ctx.setTransform(k, 0, 0, k, 0, 0);
    ctx.fillStyle = '#030712';
    ctx.fillRect(0, 0, W, H);
    // faint grid
    ctx.strokeStyle = 'rgba(34,211,238,0.07)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x <= W; x += 32) {
      ctx.moveTo(x + 0.5, 0);
      ctx.lineTo(x + 0.5, H);
    }
    for (let y = 0; y <= H; y += 32) {
      ctx.moveTo(0, y + 0.5);
      ctx.lineTo(W, y + 0.5);
    }
    ctx.stroke();
    const px = (x: number) => X0 + x * SP;
    const py = (y: number) => Y0 + y * SP;
    const flick = !reduced.current;
    // bonds: brighter and thicker the more they are stretched or squeezed
    ctx.lineCap = 'round';
    L.bonds.forEach((b) => {
      const A = L.nodes[b.i];
      const B = L.nodes[b.j];
      const ax = px(A.x);
      const ay = py(A.y);
      const bx = px(B.x);
      const by = py(B.y);
      if (b.broken) {
        if (flick && Math.random() < 0.25) {
          ctx.setLineDash([3, 5]);
          ctx.strokeStyle = 'rgba(248,113,113,0.35)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
          ctx.stroke();
          ctx.setLineDash([]);
        }
        return;
      }
      const strain = Math.abs(b.len - 1);
      let alpha = Math.min(1, 0.3 + 4.5 * strain);
      if (b.len > 1.14 && flick) alpha *= 0.35 + 0.65 * Math.random(); // close to snapping: flicker
      const wdt = Math.min(3.2, 0.9 + 9 * strain);
      ctx.lineWidth = wdt;
      const mx = (ax + bx) / 2;
      const my = (ay + by) / 2;
      ctx.strokeStyle = `rgba(${A.alpha ? CYAN : MAGENTA},${alpha.toFixed(3)})`;
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(mx, my);
      ctx.stroke();
      ctx.strokeStyle = `rgba(${B.alpha ? CYAN : MAGENTA},${alpha.toFixed(3)})`;
      ctx.beginPath();
      ctx.moveTo(mx, my);
      ctx.lineTo(bx, by);
      ctx.stroke();
    });
    // nodes: the glow ring grows with each node's own kinetic energy, so it pulses with the vibration
    const kTref = 400 * KT_PER_K;
    L.nodes.forEach((p) => {
      const x = px(p.x);
      const y = py(p.y);
      const r = p.alpha ? 7 : 4.6;
      const e = Math.min(1.6, (0.5 * p.m * (p.vx * p.vx + p.vy * p.vy)) / kTref);
      const col = p.alpha ? CYAN : MAGENTA;
      const g = ctx.createRadialGradient(x, y, r * 0.6, x, y, r + 5 + 9 * e);
      g.addColorStop(0, `rgba(${col},${(0.35 + 0.3 * Math.min(1, e)).toFixed(3)})`);
      g.addColorStop(1, `rgba(${col},0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r + 5 + 9 * e, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = `rgba(${col},${(0.25 + 0.35 * Math.min(1, e)).toFixed(3)})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(x, y, r + 3 + 4 * e, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fillStyle = `rgb(${col})`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.beginPath();
      ctx.arc(x - r * 0.25, y - r * 0.25, r * 0.35, 0, 2 * Math.PI);
      ctx.fill();
    });
  };
  const drawRef = useRef(draw);
  useEffect(() => {
    drawRef.current = draw;
  });

  const readouts = () => {
    const L = lattice;
    const tK = Math.round(L.kT / KT_PER_K);
    const st = Math.round(stabilityPct(L.s2));
    if (loadRef.current) loadRef.current.textContent = `${tK.toLocaleString('en-IN')} K`;
    if (stabRef.current) stabRef.current.textContent = `${st}%`;
    const on = st <= IMMINENT;
    const broken = brokenCount(L);
    setWarn((w) => (w.on === on && w.broken === broken ? w : { on, broken }));
  };
  const readRef = useRef(readouts);
  useEffect(() => {
    readRef.current = readouts;
  });

  // Canvas size follows its box, at the screen's pixel density.
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return undefined;
    const fit = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const cssW = cv.clientWidth || W;
      const w = Math.round(cssW * dpr);
      const h = Math.round(((cssW * H) / W) * dpr);
      if (cv.width !== w || cv.height !== h) {
        cv.width = w;
        cv.height = h;
      }
      drawRef.current();
    };
    fit();
    readRef.current();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(fit);
    ro.observe(cv);
    return () => ro.disconnect();
  }, []);

  // Pause when scrolled off-screen or when the tab is hidden.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver((es) => setOnScreen(es.some((e) => e.isIntersecting)), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    const onVis = () => setTabVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  const running = !paused && onScreen && tabVisible;
  useEffect(() => {
    if (!running) return undefined;
    let raf = 0;
    let last = performance.now();
    let acc = 0;
    const loop = (now: number) => {
      // rAF timestamps can be a little earlier than the performance.now() taken when the loop started
      const dt = Math.max(0, Math.min(0.05, (now - last) / 1000));
      last = now;
      stepLattice(lattice, dt * SIM_UNITS_PER_S, settings.current);
      drawRef.current();
      acc += dt;
      if (acc > 0.2) {
        acc = 0;
        readRef.current();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [running, lattice]);

  const status = paused ? 'PAUSED' : running ? 'ACTIVE' : 'STANDBY';

  return (
    <section className="vl-sandbox vl-mo" aria-label="Matrix Overwatch: phonon lattice" data-testid="matrix-overwatch">
      <div className="vl-mo-head">
        <h3 className="vl-mo-title">🛰️ Matrix Overwatch <i>//</i> Phonon Lattice</h3>
        <ul className="vl-mo-legend" aria-label="Legend">
          <li><span className="vl-mo-dot vl-mo-dot--a" aria-hidden="true" />Alpha Node (Heavy Core)</li>
          <li><span className="vl-mo-dot vl-mo-dot--b" aria-hidden="true" />Beta Node (Quantum Bound)</li>
          <li><span className="vl-mo-bondkey" aria-hidden="true" />Inter-Atomic Bond Lattice</li>
        </ul>
      </div>
      <div className="vl-mo-card" ref={wrapRef}>
        <canvas
          ref={canvasRef}
          className="vl-mo-canvas"
          width={W}
          height={H}
          data-testid="mo-canvas"
          data-running={running ? 'true' : 'false'}
          role="img"
          aria-label={`Diatomic spring lattice, ${mode === 'acoustic' ? 'acoustic mode: neighbouring nodes move together in long ripples' : 'optical mode: Alpha and Beta nodes move against each other'}${paused ? ', paused' : ''}`}
        />
        <div className="vl-mo-tl vl-mono" aria-hidden="true">
          <span className={`vl-mo-live${running ? ' is-on' : ''}`} />MATRIX OVERWATCH: <b data-testid="mo-status">{status}</b>
        </div>
        <button
          type="button"
          className="vl-mo-pause"
          onClick={() => setPaused((x) => !x)}
          aria-label={paused ? 'Play the lattice animation' : 'Pause the lattice animation'}
          aria-pressed={paused}
          data-testid="mo-pause"
        >
          {paused ? (
            <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d="M6 4l10 6-10 6z" fill="currentColor" /></svg>
          ) : (
            <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><rect x="5" y="4" width="3.4" height="12" rx="1" fill="currentColor" /><rect x="11.6" y="4" width="3.4" height="12" rx="1" fill="currentColor" /></svg>
          )}
        </button>
        <div className="vl-mo-bl vl-mono" data-testid="mo-vector">
          CORE DISPERSION VECTOR: <b>{mode === 'acoustic' ? 'ACOUSTIC' : 'OPTICAL'}</b>
        </div>
        {warn.on && (
          <div className="vl-mo-warn vl-mono" role="status" data-testid="mo-warn">
            ⚠ PHASE TRANSITION IMMINENT{warn.broken > 0 ? ` · ${warn.broken} BONDS BROKEN` : ''}
          </div>
        )}
      </div>

      <div className="vl-mo-stats" data-testid="mo-stats">
        <div title="Effective temperature from the nodes' kinetic energy, scaled to a gold-like crystal (melts at 1337 K)">
          <span>THERMAL LOAD</span>
          <b data-testid="mo-load" ref={loadRef}>— K</b>
          <small>effective temperature</small>
        </div>
        <div title="1/γ: time for the vibration energy to fall to 1/e once the push stops (the amplitude takes twice as long)">
          <span>DAMPING TIME</span>
          <b data-testid="mo-damp">{dampMs.toLocaleString('en-IN')} ms</b>
          <small>1/γ · sim clock</small>
        </div>
        <div title="100% far below melting; 0% when neighbour distances jitter by about 10% of the spacing (Lindemann rule of thumb)">
          <span>STABILITY</span>
          <b data-testid="mo-stab" ref={stabRef}>—%</b>
          <small>vs Lindemann melt limit</small>
        </div>
      </div>

      <div className="vl-mo-controls">
        <GlowSlider
          label="Lattice Overclock Level"
          ariaLabel="Lattice overclock level: vibration temperature"
          value={overclock}
          min={0}
          max={100}
          onChange={setOverclock}
          valueText={`${overclock}%`}
          color="#22d3ee"
          testId="mo-overclock"
        >
          <span className="vl-small">Pumps the chosen vibration; thermostat ≈ {Math.round(overclockToK(overclock) * thermostatShare(overclock)).toLocaleString('en-IN')} K</span>
        </GlowSlider>
        <GlowSlider
          label="Matrix Suppression Coeff"
          ariaLabel="Matrix suppression coefficient: damping"
          value={suppress}
          min={0}
          max={100}
          onChange={setSuppress}
          valueText={`${suppress}%`}
          color="#e879f9"
          testId="mo-suppress"
        >
          <span className="vl-small">Damping γ = {gamma.toFixed(2)} per sim time unit: vibrations die out faster</span>
        </GlowSlider>
      </div>
      <div className="vl-mo-seg-wrap">
        <span className="vl-mo-seg-label" id="mo-phase-label">Quantum Propagation Phase</span>
        <div className="vl-mo-seg" role="radiogroup" aria-labelledby="mo-phase-label">
          {(['acoustic', 'optical'] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              role="radio"
              aria-checked={mode === m}
              className={mode === m ? 'is-on' : ''}
              onClick={() => setMode(m)}
              data-testid={`mo-mode-${m}`}
            >
              {m === 'acoustic' ? 'Acoustic Vector' : 'Optical Pulse'}
            </button>
          ))}
        </div>
        <p className="vl-small vl-mo-mode-note">
          {mode === 'acoustic'
            ? 'Acoustic: neighbouring nodes move together, in phase, so long ripples travel across the grid (sound waves in a solid are this kind).'
            : 'Optical: Alpha and Beta move against each other, out of phase, in a fast shimmer; the heavy Alpha moves less. Light can shake ionic crystals this way.'}
        </p>
      </div>
      <p className="vl-small vl-mo-foot">
        Acoustic and optical are real names for the two ways atoms in a crystal can vibrate (phonons); the node names are game labels.
      </p>
      <p className="vl-small vl-mo-foot">
        Model: heavy (3 units) and light (1 unit) masses on springs, with friction and random thermal kicks. Thermal load is an
        effective temperature from the nodes’ motion, scaled to a gold-like crystal; stability uses the Lindemann rule of thumb
        (crystals melt when vibrations reach about 10–15% of the spacing; here, when neighbour distances jitter by about 10%). Times run on the sim’s slowed clock; real lattice
        vibrations take about a trillionth of a second.
      </p>
    </section>
  );
};

export default MatrixOverwatch;
