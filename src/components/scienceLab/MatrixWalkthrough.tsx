import React, { useCallback, useEffect, useRef, useState } from 'react';

// "Matrix walkthrough (for fun)": a 3-level gamer-HUD tour of the Veil of Māyā lab.
// The Matrix comparisons are a teaching analogy only, not a claim about the texts.

const K_B = 1.380649e-23;
const M_H2O = 18.015 * 1.66054e-27;
const T_WATER = 281; // 7 °C
const VRMS = Math.sqrt((3 * K_B * T_WATER) / M_H2O); // ≈ 623 m/s
const T_MIN = 281;
const T_MAX = 2252;
const LINDEMANN = 0.1; // u_rms / a at melting (≈10% of lattice spacing)
const T_ONSET = 1700; // K where the model lattice first reaches δ = 0.10
const BREAKABLE = 29; // bonds broken at 2,252 K in the lab's model
const delta = (T: number) => LINDEMANN * Math.sqrt(T / T_ONSET); // u_rms/a ∝ √T (classical)

const GREEN = '#22c55e';
const mono: React.CSSProperties = { fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' };

const prefersReduced = () =>
  typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

type DrawFn = (ctx: CanvasRenderingContext2D, w: number, h: number, dt: number, reduced: boolean) => void;

// Shared canvas loop: HiDPI sizing, requestAnimationFrame, pauses off-screen / hidden tab,
// and draws a single static frame per state change under prefers-reduced-motion.
function useCanvasLoop(draw: DrawFn, aspect: number, redrawKey: unknown) {
  const ref = useRef<HTMLCanvasElement>(null);
  const drawRef = useRef(draw);
  drawRef.current = draw;
  const sizeRef = useRef({ w: 300, h: 300 * aspect });
  const reducedRef = useRef(prefersReduced());

  const frame = useCallback((dt: number) => {
    const c = ref.current;
    const ctx = c?.getContext('2d');
    if (!c || !ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawRef.current(ctx, sizeRef.current.w, sizeRef.current.h, dt, reducedRef.current);
  }, []);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    let raf = 0;
    let last = 0;
    let visible = false;
    const resize = () => {
      const w = Math.max(200, c.clientWidth);
      const h = Math.round(w * aspect);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      sizeRef.current = { w, h };
      c.width = Math.round(w * dpr);
      c.height = Math.round(h * dpr);
      c.style.height = `${h}px`;
      frame(0);
    };
    const tick = (now: number) => {
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
      last = now;
      frame(dt);
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (raf || reducedRef.current || !visible || document.hidden) return;
      last = 0;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => { cancelAnimationFrame(raf); raf = 0; };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); else stop(); }, { threshold: 0.05 });
    io.observe(c);
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null;
    ro?.observe(c);
    const onVis = () => (document.hidden ? stop() : start());
    const onMq = () => { reducedRef.current = !!mq?.matches; stop(); frame(0); start(); };
    document.addEventListener('visibilitychange', onVis);
    mq?.addEventListener?.('change', onMq);
    resize();
    return () => { stop(); io.disconnect(); ro?.disconnect(); document.removeEventListener('visibilitychange', onVis); mq?.removeEventListener?.('change', onMq); };
  }, [aspect, frame]);

  // Reduced motion: still repaint when the user changes state.
  useEffect(() => { if (reducedRef.current) frame(0); }, [redrawKey, frame]);
  return ref;
}

const canvasStyle: React.CSSProperties = { width: '100%', display: 'block', borderRadius: 8, border: `1px solid ${GREEN}55`, background: '#021a10', touchAction: 'manipulation' };
const approach = (cur: number, target: number, dt: number, rate = 3) => cur + (target - cur) * Math.min(1, dt * rate);

const HudButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { on?: boolean }> = ({ on, style, ...p }) => (
  <button type="button" {...p}
    style={{ ...mono, fontSize: 12, padding: '5px 12px', borderRadius: 6, cursor: p.disabled ? 'default' : 'pointer', border: `1px solid ${GREEN}`, background: on ? '#16a34a' : 'transparent', color: on ? '#02120a' : '#86efac', opacity: p.disabled ? 0.4 : 1, transition: 'background .25s,color .25s', ...style }} />
);

/* ───────────── LEVEL 01 · Asat code rain ───────────── */
const GLYPHS = ['असत्', 'सत्', 'अ', 'आ', 'इ', 'उ', 'ऋ', 'क', 'ख', 'ग', 'घ', 'च', 'ज', 'त', 'द', 'न', 'प', 'ब', 'म', 'य', 'र', 'ल', 'व', 'श', 'स', 'ह', 'माया', 'ॐ'];

const CodeRainView: React.FC<{ viveka: boolean; onToggle: () => void }> = ({ viveka, onToggle }) => {
  const st = useRef<{ cols: { y: number; speed: number; chars: string[]; off: number }[]; part: number; t: number; w: number }>({ cols: [], part: 0, t: 0, w: 0 });
  const draw = useCallback<DrawFn>((ctx, w, h, dt, reduced) => {
    const s = st.current;
    const fs = w < 420 ? 13 : 15;
    const colW = fs * 1.5;
    if (s.w !== w) {
      const n = Math.ceil(w / colW);
      s.cols = Array.from({ length: n }, () => ({ y: Math.random() * h, speed: 40 + Math.random() * 90, off: 0, chars: Array.from({ length: 14 }, () => GLYPHS[(Math.random() * GLYPHS.length) | 0]) }));
      s.w = w;
    }
    s.t += dt;
    s.part = reduced ? (viveka ? 1 : 0) : approach(s.part, viveka ? 1 : 0, dt, 2.5);
    // calm everyday scene: sky, sun, table, glass of water
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, '#0b2f22'); g.addColorStop(1, '#03140b');
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(250,204,21,0.25)'; ctx.beginPath(); ctx.arc(w * 0.82, h * 0.22, h * 0.1, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(120,80,40,0.45)'; ctx.fillRect(0, h * 0.78, w, h * 0.22);
    const gx = w * 0.2, gw = Math.min(60, w * 0.12), gt = h * 0.42, gb = h * 0.78;
    ctx.fillStyle = 'rgba(56,189,248,0.35)'; ctx.fillRect(gx + 3, gt + (gb - gt) * 0.35, gw - 6, (gb - gt) * 0.65 - 2);
    ctx.strokeStyle = 'rgba(220,240,255,0.6)'; ctx.lineWidth = 2; ctx.strokeRect(gx, gt, gw, gb - gt);
    // code rain (parts away from the centre when Viveka is on)
    ctx.font = `${fs}px "Noto Sans Devanagari", "Mangal", sans-serif`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const cx = w / 2;
    s.cols.forEach((c, i) => {
      if (!reduced) { c.y += c.speed * dt; if (c.y - c.chars.length * fs > h) { c.y = 0; c.chars[(Math.random() * c.chars.length) | 0] = GLYPHS[(Math.random() * GLYPHS.length) | 0]; } }
      const x0 = i * colW + colW / 2;
      const d = x0 - cx;
      const push = s.part * Math.max(0, w * 0.28 - Math.abs(d)) * Math.sign(d || 1);
      const x = x0 + push;
      c.chars.forEach((ch, k) => {
        const y = c.y - k * fs * 1.15;
        if (y < -fs || y > h + fs) return;
        const a = k === 0 ? 1 : Math.max(0, 0.8 - k * 0.06);
        ctx.fillStyle = k === 0 ? `rgba(220,255,230,${a})` : `rgba(74,222,128,${a * (1 - s.part * 0.35)})`;
        ctx.fillText(ch.length > 2 ? ch.slice(0, 2) : ch, x, y);
      });
    });
    // revealed सत्
    if (s.part > 0.02) {
      const pulse = reduced ? 1 : 0.85 + 0.15 * Math.sin(s.t * 3);
      ctx.save();
      ctx.globalAlpha = s.part;
      ctx.shadowColor = '#facc15'; ctx.shadowBlur = 22 * pulse;
      ctx.fillStyle = '#fef9c3';
      ctx.font = `bold ${Math.min(72, w * 0.16)}px "Noto Sans Devanagari", "Mangal", sans-serif`;
      ctx.fillText('सत्', cx, h * 0.45);
      ctx.shadowBlur = 0;
      ctx.font = `${fs - 1}px ui-monospace, Menlo, monospace`;
      ctx.fillStyle = '#bbf7d0';
      ctx.fillText('SAT · the real beneath the render', cx, h * 0.45 + Math.min(52, w * 0.11));
      ctx.restore();
    } else {
      ctx.font = '12px ui-monospace, Menlo, monospace'; ctx.fillStyle = 'rgba(187,247,208,0.8)';
      ctx.fillText('tap to apply Viveka', cx, h - 12);
    }
  }, [viveka]);
  const ref = useCanvasLoop(draw, 0.5, viveka);
  return <canvas ref={ref} style={{ ...canvasStyle, cursor: 'pointer' }} onClick={onToggle} role="img" aria-label={viveka ? 'Code rain parts to reveal the word सत् (Sat)' : 'Green Devanagari code rain over a calm everyday scene'} />;
};

/* ───────────── LEVEL 02 · Sealed Crucible ───────────── */
type P = { x: number; y: number; vx: number; vy: number; flash: number };
const N_MOL = 60;
const PX_PER_VRMS = 70; // display: 623 m/s ↦ 70 px/s (slowed by ~10¹³ for the eye)
const gauss = () => { let u = 0, v = 0; while (!u) u = Math.random(); while (!v) v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };

const CrucibleView: React.FC<{ scan: boolean; onStats: (vrms: number, cps: number) => void }> = ({ scan, onStats }) => {
  const st = useRef({ ps: [] as P[], w: 0, h: 0, mix: 0, t: 0, hits: [] as number[], lastReport: 0 });
  const draw = useCallback<DrawFn>((ctx, w, h, dt, reduced) => {
    const s = st.current;
    const r = Math.max(4, w / 90);
    if (s.w !== w || s.h !== h) {
      // Maxwell–Boltzmann: each velocity component Gaussian; σ chosen so 2D rms = PX_PER_VRMS
      const sig = PX_PER_VRMS / Math.SQRT2;
      s.ps = Array.from({ length: N_MOL }, () => ({ x: r + Math.random() * (w - 2 * r), y: r + Math.random() * (h - 2 * r), vx: gauss() * sig, vy: gauss() * sig, flash: 0 }));
      s.w = w; s.h = h;
    }
    s.t += dt;
    s.mix = reduced ? (scan ? 1 : 0) : approach(s.mix, scan ? 1 : 0, dt, 2.2);
    const ps = s.ps;
    // physics always runs so the toggle reveals a living system
    if (!reduced) {
      for (const p of ps) {
        p.x += p.vx * dt; p.y += p.vy * dt; p.flash = Math.max(0, p.flash - dt * 3);
        if (p.x < r) { p.x = r; p.vx = Math.abs(p.vx); } else if (p.x > w - r) { p.x = w - r; p.vx = -Math.abs(p.vx); }
        if (p.y < r) { p.y = r; p.vy = Math.abs(p.vy); } else if (p.y > h - r) { p.y = h - r; p.vy = -Math.abs(p.vy); }
      }
      for (let i = 0; i < ps.length; i++) for (let j = i + 1; j < ps.length; j++) {
        const a = ps[i], b = ps[j];
        const dx = b.x - a.x, dy = b.y - a.y, d2 = dx * dx + dy * dy, md = 2 * r;
        if (d2 > md * md || d2 === 0) continue;
        const d = Math.sqrt(d2), nx = dx / d, ny = dy / d;
        const rel = (a.vx - b.vx) * nx + (a.vy - b.vy) * ny;
        const ov = (md - d) / 2; a.x -= nx * ov; a.y -= ny * ov; b.x += nx * ov; b.y += ny * ov;
        if (rel <= 0) continue;
        // equal-mass elastic collision: exchange normal components (energy & momentum conserved)
        a.vx -= rel * nx; a.vy -= rel * ny; b.vx += rel * nx; b.vy += rel * ny;
        a.flash = b.flash = 1; s.hits.push(s.t);
      }
    }
    while (s.hits.length && s.t - s.hits[0] > 1) s.hits.shift();
    if (s.t - s.lastReport > 0.25) {
      s.lastReport = s.t;
      const ms = ps.reduce((m, p) => m + p.vx * p.vx + p.vy * p.vy, 0) / ps.length;
      onStats((Math.sqrt(ms) / PX_PER_VRMS) * VRMS, s.hits.length);
    }
    const scanY = s.mix * h;
    // molecular layer (above the scan line)
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, w, scanY); ctx.clip();
    ctx.fillStyle = '#021a10'; ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(34,197,94,0.08)'; ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 20) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
    for (const p of ps) {
      if (p.flash > 0) { ctx.fillStyle = `rgba(250,250,140,${p.flash * 0.7})`; ctx.beginPath(); ctx.arc(p.x, p.y, r * (1.6 + (1 - p.flash) * 1.5), 0, Math.PI * 2); ctx.fill(); }
      const ang = Math.atan2(p.vy, p.vx);
      ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#e5e7eb';
      for (const o of [-0.95, 0.95]) { ctx.beginPath(); ctx.arc(p.x + Math.cos(ang + Math.PI + o) * r, p.y + Math.sin(ang + Math.PI + o) * r, r * 0.5, 0, Math.PI * 2); ctx.fill(); }
    }
    ctx.restore();
    // calm water layer (below the scan line)
    ctx.save(); ctx.beginPath(); ctx.rect(0, scanY, w, h - scanY); ctx.clip();
    const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#0e4d6b'); g.addColorStop(1, '#06283a');
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    ctx.lineWidth = 1.2;
    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = `rgba(160,230,255,${0.32 - i * 0.04})`; ctx.beginPath();
      for (let x = 0; x <= w; x += 6) ctx.lineTo(x, h * (0.15 + i * 0.18) + Math.sin(x / 34 + s.t * (0.9 + i * 0.15) + i) * 1.8 + Math.sin(x / 13 - s.t * 1.7) * 0.6);
      ctx.stroke();
    }
    const rr = ((s.t * 18) % 70);
    ctx.strokeStyle = `rgba(200,240,255,${0.3 * (1 - rr / 70)})`; ctx.beginPath(); ctx.ellipse(w * 0.62, h * 0.55, rr, rr * 0.35, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.restore();
    // scan line sweep
    if (s.mix > 0.01 && s.mix < 0.99) {
      const lg = ctx.createLinearGradient(0, scanY - 14, 0, scanY + 2);
      lg.addColorStop(0, 'rgba(74,222,128,0)'); lg.addColorStop(1, 'rgba(74,222,128,0.6)');
      ctx.fillStyle = lg; ctx.fillRect(0, scanY - 14, w, 16);
      ctx.fillStyle = '#bbf7d0'; ctx.fillRect(0, scanY - 1, w, 2);
    }
  }, [scan, onStats]);
  const ref = useCanvasLoop(draw, 0.48, scan);
  return <canvas ref={ref} style={canvasStyle} role="img" aria-label={scan ? 'Viveka scan: about 60 water molecules colliding' : 'Smooth calm water with gentle ripples'} />;
};

/* ───────────── LEVEL 03 · Phonon Lattice ───────────── */
const COLS = 9, ROWS = 6;
type Bond = { a: number; b: number; tBreak: number; broken: boolean; sparkT: number };
const makeBonds = (): Bond[] => {
  const bonds: Bond[] = [];
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
    const i = r * COLS + c;
    if (c < COLS - 1) bonds.push({ a: i, b: i + 1, tBreak: Infinity, broken: false, sparkT: -9 });
    if (r < ROWS - 1) bonds.push({ a: i, b: i + COLS, tBreak: Infinity, broken: false, sparkT: -9 });
  }
  // 29 bonds have break thresholds spread between the Lindemann onset and 2,252 K
  const idx = bonds.map((_, i) => i).sort(() => Math.random() - 0.5).slice(0, BREAKABLE);
  idx.forEach((bi, k) => { bonds[bi].tBreak = T_ONSET + ((k + 1) / BREAKABLE) * (T_MAX - T_ONSET) - 0.5; });
  return bonds;
};

const LatticeView: React.FC<{ temp: number; bend: boolean; onBroken: (n: number) => void }> = ({ temp, bend, onBroken }) => {
  const st = useRef({ bonds: makeBonds(), t: 0, bendP: 0, sparks: [] as { x: number; y: number; vx: number; vy: number; life: number }[], lastBroken: -1, phase: Array.from({ length: COLS * ROWS }, () => [Math.random() * 6.28, Math.random() * 6.28, 0.8 + Math.random() * 0.5]) });
  const draw = useCallback<DrawFn>((ctx, w, h, dt, reduced) => {
    const s = st.current;
    s.t += dt;
    s.bendP = reduced ? (bend ? 1 : 0) : approach(s.bendP, bend ? 1 : 0, dt, 1.4);
    const pad = Math.max(18, w * 0.07);
    const a = Math.min((w - 2 * pad) / (COLS - 1), (h - 2 * pad) / (ROWS - 1));
    const ox = (w - a * (COLS - 1)) / 2, oy = (h - a * (ROWS - 1)) / 2;
    const dl = delta(temp);
    const amp = dl * a * Math.SQRT2; // peak ≈ √2 · u_rms
    const melt = Math.max(0, Math.min(1, (temp - T_ONSET) / (T_MAX - T_ONSET)));
    const pos = s.phase.map((ph, i) => {
      const c = i % COLS, r = (i / COLS) | 0;
      let x = ox + c * a, y = oy + r * a;
      const tt = reduced ? 0.6 : s.t;
      x += Math.sin(tt * 9 * ph[2] + ph[0] + c * 0.7) * amp; // phonon-like waves + jitter
      y += Math.cos(tt * 8 * ph[2] + ph[1] + r * 0.9) * amp;
      // "bend the spoon": lattice flows into a curve (only once past the limit)
      const bp = s.bendP * (0.35 + 0.65 * melt);
      const u = c / (COLS - 1);
      y += bp * Math.sin(u * Math.PI) * a * 1.4 - bp * a * 0.5;
      x += bp * Math.sin((r / (ROWS - 1)) * Math.PI + tt * 1.5) * a * 0.25 * melt;
      return [x, y];
    });
    let broken = 0;
    for (const b of s.bonds) {
      const nowBroken = temp >= b.tBreak;
      if (nowBroken && !b.broken && !reduced) {
        const [x1, y1] = pos[b.a], [x2, y2] = pos[b.b];
        for (let k = 0; k < 10; k++) { const an = Math.random() * 6.28, sp = 40 + Math.random() * 120; s.sparks.push({ x: (x1 + x2) / 2, y: (y1 + y2) / 2, vx: Math.cos(an) * sp, vy: Math.sin(an) * sp, life: 1 }); }
        b.sparkT = s.t;
      }
      b.broken = nowBroken;
      if (nowBroken) broken++;
    }
    if (broken !== s.lastBroken) { s.lastBroken = broken; onBroken(broken); }
    ctx.fillStyle = '#021a10'; ctx.fillRect(0, 0, w, h);
    // bond colour: white → orange → red with temperature
    const f = (temp - T_MIN) / (T_MAX - T_MIN);
    const col = f < 0.5 ? [255, 255 - f * 2 * 90, 255 - f * 2 * 255] : [255, 165 - (f - 0.5) * 2 * 140, 0];
    ctx.lineCap = 'round';
    for (const b of s.bonds) {
      const [x1, y1] = pos[b.a], [x2, y2] = pos[b.b];
      if (b.broken) {
        const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
        ctx.strokeStyle = 'rgba(239,68,68,0.35)'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x1 + (mx - x1) * 0.45, y1 + (my - y1) * 0.45); ctx.moveTo(x2, y2); ctx.lineTo(x2 + (mx - x2) * 0.45, y2 + (my - y2) * 0.45); ctx.stroke();
        continue;
      }
      ctx.strokeStyle = `rgba(${col[0]},${col[1] | 0},${col[2] | 0},0.85)`; ctx.lineWidth = 2.2;
      ctx.shadowColor = `rgb(${col[0]},${col[1] | 0},${col[2] | 0})`; ctx.shadowBlur = 4 + f * 10;
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    }
    ctx.shadowBlur = 0;
    const nr = Math.max(3.5, a * 0.13);
    for (const [x, y] of pos) { ctx.fillStyle = '#86efac'; ctx.beginPath(); ctx.arc(x, y, nr, 0, Math.PI * 2); ctx.fill(); }
    s.sparks = s.sparks.filter((p) => (p.life -= dt * 1.8) > 0);
    for (const p of s.sparks) { p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 140 * dt; ctx.fillStyle = `rgba(253,224,71,${p.life})`; ctx.fillRect(p.x - 1.5, p.y - 1.5, 3, 3); }
    // Lindemann gauge
    ctx.font = '11px ui-monospace, Menlo, monospace'; ctx.textAlign = 'left'; ctx.textBaseline = 'top';
    ctx.fillStyle = dl >= LINDEMANN ? '#fca5a5' : '#bbf7d0';
    ctx.fillText(`δ = u/a ≈ ${dl.toFixed(3)}  (limit ${LINDEMANN.toFixed(2)})`, 8, 6);
  }, [temp, bend, onBroken]);
  const ref = useCanvasLoop(draw, 0.55, `${temp}-${bend}`);
  return <canvas ref={ref} style={canvasStyle} role="img" aria-label={`Vibrating lattice at ${Math.round(temp)} K`} />;
};

/* ───────────── Codex: Māyā as reality vs illusion ───────────── */
const PAIRS: [string, string][] = [
  ['🐍 coiled snake (covered-up info)', '🪢 unraveled rope (uniform repetitive units)'],
  ['still water (macroscopic surface)', 'colliding molecules (discrete unit dynamics)'],
  ['solid spoon (coiled macro shape)', 'vibrating lattice (repeating atomic units)'],
];

const Codex: React.FC = () => (
  <div data-testid="asato-matrix-codex" style={{ border: `1px solid ${GREEN}88`, borderRadius: 8, padding: '0.55rem 0.75rem', margin: '0 0 0.6rem', background: '#021a10' }}>
    <div style={{ ...mono, fontSize: 12, color: '#4ade80', marginBottom: 6 }}>📜 CODEX · MĀYĀ (माया): REALITY vs ILLUSION &amp; THE ROPE-SNAKE MECHANISM</div>
    <div style={{ lineHeight: 1.55, color: '#e7fbe9', fontSize: 13 }}>
      <div><strong>Sat</strong> (सत्) is what is truly real and unchanging; <strong>Asat</strong> (असत्) is the changing appearance.</div>
      <div><strong>Māyā</strong> (माया) is the cognitive &amp; ontological power that makes appearance look like the whole of reality.</div>
      <div style={{ marginTop: 4 }}>
        <strong>The Deep Insight of Ādi Śaṅkarācārya (Rajju-Sarpa / रज्जु-सर्प):</strong> It is not merely one arbitrary object appearing as another. Rather, an object with <em>coiled (covered-up, occluded) information</em> in dim light appears as a menacing living <em>snake</em>; when the light of <strong>Viveka</strong> arrives, the coiled projection unravels to reveal an <strong>unraveled, uniform, repetitive unit-based object</strong>—a rope braided from modular, repeating fibers.
      </div>
      <div style={{ marginTop: 4 }}>
        In this lab, macroscopic surface appearance is the coiled snake (covered-up info); activating the Viveka Scanner reveals the unraveled rope: the uniform, repetitive, unit-based atomic lattice! <em>asato mā sad gamaya</em>: lead me from the unreal to the real.
      </div>
    </div>
    <div role="table" aria-label="Illusion and reality" style={{ ...mono, fontSize: 11, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 10px', marginTop: 8, maxWidth: 520 }}>
      <span role="columnheader" style={{ color: '#fca5a5' }}>COILED ILLUSION (COVERED-UP)</span><span role="columnheader" style={{ color: '#86efac' }}>UNRAVELED REALITY (UNIT-BASED)</span>
      {PAIRS.map(([i, r]) => (<React.Fragment key={i}><span role="cell">{i}</span><span role="cell">→ {r}</span></React.Fragment>))}
    </div>
  </div>
);

/* ───────────── Walkthrough shell ───────────── */
const STEPS = [
  { tag: 'LEVEL 01', title: 'The surface = Asat (“Matrix code”)' },
  { tag: 'LEVEL 02', title: 'Sealed Crucible · Andha-Mūṣā (अन्ध-मूषा)' },
  { tag: 'LEVEL 03', title: 'Phonon Lattice · 281 K → 2,252 K' },
];

const CSS = `
@keyframes mwGlitch{0%{opacity:0;transform:translateX(-6px);filter:hue-rotate(60deg) contrast(1.6);clip-path:inset(0 0 60% 0)}
30%{opacity:.8;transform:translateX(4px);clip-path:inset(40% 0 0 0)}
60%{opacity:1;transform:translateX(-2px);clip-path:inset(0 0 10% 0)}
100%{opacity:1;transform:none;filter:none;clip-path:inset(0 0 0 0)}}
.mw-level{animation:mwGlitch .45s steps(6,end) both}
.mw-range{width:100%;accent-color:#22c55e}
@media (prefers-reduced-motion: reduce){.mw-level{animation:none}.mw-bar{transition:none!important}}
`;

export const MatrixWalkthrough: React.FC = () => {
  const [step, setStep] = useState(0);
  const [viveka, setViveka] = useState(false);
  const [scan, setScan] = useState(false);
  const [stats, setStats] = useState({ vrms: VRMS, cps: 0 });
  const [temp, setTemp] = useState(T_MIN);
  const [broken, setBroken] = useState(0);
  const [bend, setBend] = useState(false);
  const onStats = useCallback((vrms: number, cps: number) => setStats((p) => (Math.abs(p.vrms - vrms) < 1 && p.cps === cps ? p : { vrms, cps })), []);
  const stability = Math.round(100 * (1 - broken / BREAKABLE));
  const pastLimit = delta(temp) >= LINDEMANN;
  useEffect(() => { if (!pastLimit) setBend(false); }, [pastLimit]);
  const grid = (min: number): React.CSSProperties => ({ ...mono, fontSize: 12, display: 'grid', gridTemplateColumns: `repeat(auto-fit,minmax(${min}px,1fr))`, gap: 4, marginBottom: 8 });

  return (
    <section id="asato-matrix-walkthrough" className="vl-panel" aria-label="Matrix walkthrough (for fun)" data-testid="asato-matrix-walkthrough"
      style={{ background: '#03140b', color: '#bbf7d0', border: '1px solid #16a34a', borderRadius: 12, padding: '0.9rem 1rem', margin: '0.75rem 0', overflow: 'hidden' }}>
      <style>{CSS}</style>
      <div style={{ ...mono, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6, fontSize: 12, color: '#4ade80', marginBottom: 8 }}>
        <span>▣ MATRIX WALKTHROUGH (FOR FUN)</span>
        <span>Teaching analogy only · not a claim from the texts</span>
      </div>
      <Codex />
      <div role="tablist" style={{ display: 'flex', gap: 6, margin: '0.2rem 0 0.4rem', flexWrap: 'wrap' }}>
        {STEPS.map((s, i) => (
          <HudButton key={s.tag} role="tab" aria-selected={step === i} on={step === i} onClick={() => setStep(i)} style={{ padding: '4px 10px' }}>{s.tag}</HudButton>
        ))}
      </div>
      <div aria-hidden style={{ height: 4, background: '#064e2b', borderRadius: 2, marginBottom: 8 }}>
        <div className="mw-bar" style={{ height: '100%', width: `${((step + 1) / STEPS.length) * 100}%`, background: 'linear-gradient(90deg,#16a34a,#4ade80)', borderRadius: 2, boxShadow: '0 0 8px #22c55e', transition: 'width .5s ease' }} />
      </div>

      <div key={step} className="mw-level">
        <h4 style={{ margin: '0.2rem 0 0.5rem', color: '#f0fdf4' }}>{STEPS[step].title}</h4>

        {step === 0 && (
          <div>
            <CodeRainView viveka={viveka} onToggle={() => setViveka((v) => !v)} />
            <div style={{ margin: '0.5rem 0' }}>
              <HudButton on={viveka} aria-pressed={viveka} onClick={() => setViveka((v) => !v)}>👁️ VIVEKA: {viveka ? 'ON' : 'OFF'}</HudButton>
            </div>
            <p style={{ margin: 0, lineHeight: 1.55 }}>
              The everyday world you see (solid gold, a still glass of water) is <strong>Asat</strong>: the rendered surface.
              Think of it as the green “Matrix code” on screen. Under it run the real rules: particles, motion and energy.
              Your tool for seeing past the render is <strong>Viveka</strong> (विवेक, discernment), which parts the code to show <strong>Sat</strong> (सत्).
            </p>
          </div>
        )}

        {step === 1 && (
          <div>
            <div style={grid(130)}>
              <span>TARGET: H₂O · {N_MOL} shown</span>
              <span>TEMP: {T_WATER} K (7 °C)</span>
              <span>v<sub>rms</sub>: {scan ? `${Math.round(stats.vrms)}` : `~${Math.round(VRMS)}`} m/s</span>
              <span>COLLISIONS: {scan ? `${stats.cps}/s (sim)` : '—'}</span>
            </div>
            <CrucibleView scan={scan} onStats={onStats} />
            <div style={{ margin: '0.5rem 0' }}>
              <HudButton on={scan} onClick={() => setScan((s) => !s)} aria-pressed={scan} data-testid="asato-matrix-scan">👁️ VIVEKA SCANNER: {scan ? 'ON' : 'OFF'}</HudButton>
            </div>
            <p style={{ margin: 0, lineHeight: 1.55 }}>
              Scanner off: calm, smooth water (Asat). Scanner on: molecules (paramāṇus in the lab’s language) zip about with a
              Maxwell–Boltzmann spread of speeds and bounce off each other elastically. At 281 K their root-mean-square speed is about {Math.round(VRMS)} m/s,
              a steady average, not an acceleration. Motion is slowed enormously so you can see it; collisions per second are for this toy box, not real water.
              Like the people asleep in the battery pods, the water <em>looks</em> still; <strong>tāpa</strong> (ताप, heat) keeps everything moving underneath.
            </p>
          </div>
        )}

        {step === 2 && (
          <div>
            <div style={grid(150)}>
              <span>THERMAL LOAD: {Math.round(temp).toLocaleString()} K</span>
              <span style={{ color: broken ? '#fca5a5' : undefined }}>{broken ? '⚠ ' : ''}BONDS BROKEN: {broken} / {BREAKABLE}</span>
              <span style={{ color: stability === 0 ? '#fca5a5' : undefined }}>STABILITY: {stability}%{pastLimit ? ' · past Lindemann limit' : ''}</span>
            </div>
            <LatticeView temp={temp} bend={bend} onBroken={setBroken} />
            <label style={{ ...mono, fontSize: 12, display: 'block', margin: '0.6rem 0 0.2rem' }} htmlFor="mw-temp">
              TEMPERATURE: {Math.round(temp).toLocaleString()} K
            </label>
            <input id="mw-temp" className="mw-range" type="range" min={T_MIN} max={T_MAX} step={1} value={temp} onChange={(e) => setTemp(Number(e.target.value))} />
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', margin: '0.4rem 0' }}>
              <HudButton onClick={() => setTemp(T_MIN)}>281 K</HudButton>
              <HudButton onClick={() => setTemp(T_MAX)}>2,252 K</HudButton>
              <HudButton on={bend} disabled={!pastLimit} aria-pressed={bend} onClick={() => setBend((b) => !b)} title={pastLimit ? '' : 'Heat past the Lindemann limit first'}>🥄 BEND THE SPOON</HudButton>
            </div>
            <p style={{ margin: 0, lineHeight: 1.55 }}>
              Heat makes the lattice shake in waves called <strong>phonons</strong>; the swing grows roughly with √T. When atoms swing more than roughly a tenth
              of their spacing (the Lindemann melt limit), bonds snap and the solid melts. At 2,252 K this model shows 29 broken bonds and 0% stability.
              Teaching analogy: like Neo bending the spoon, once you see the rules underneath, the “solid” is not as fixed as it looked. Open the Matrix Overwatch panel below to try more.
            </p>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, gap: 8 }}>
        <HudButton disabled={step === 0} onClick={() => setStep((s) => s - 1)} style={{ padding: '3px 10px' }}>◀ PREV</HudButton>
        <HudButton disabled={step === STEPS.length - 1} onClick={() => setStep((s) => s + 1)} style={{ padding: '3px 10px' }}>NEXT ▶</HudButton>
      </div>
    </section>
  );
};

export default MatrixWalkthrough;
