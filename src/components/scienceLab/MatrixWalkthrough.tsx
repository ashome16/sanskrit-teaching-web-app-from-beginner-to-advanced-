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

/* ───────────── LEVEL 01 · Many forms (nāma-rūpa) → one Sat ───────────── */
const FORM_GLYPHS = ['अ', 'आ', 'इ', 'उ', 'ऋ', 'क', 'ख', 'ग', 'घ', 'च', 'ज', 'त', 'द', 'न', 'प', 'ब', 'म', 'य', 'र', 'ल', 'व', 'श', 'ह', 'ॐ', 'घट', 'पट', 'वृक्ष'];
const FORM_COLORS = ['#f472b6', '#facc15', '#38bdf8', '#a78bfa', '#fb923c', '#4ade80', '#f87171', '#2dd4bf'];
type FormKind = 'glyph' | 'pot' | 'cloth' | 'tree' | 'plate' | 'lamp';
type Form = { kind: FormKind; ch: string; x: number; y: number; size: number; speed: number; rot: number; spin: number; color: string; tx: number; ty: number };
const SAT_GOLD = '#fde68a';

const drawShape = (ctx: CanvasRenderingContext2D, f: Form, size: number) => {
  const s = size / 2;
  ctx.beginPath();
  switch (f.kind) {
    case 'pot': // ghaṭa
      ctx.ellipse(0, s * 0.2, s * 0.8, s * 0.7, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillRect(-s * 0.35, -s * 0.85, s * 0.7, s * 0.5); break;
    case 'plate':
      ctx.ellipse(0, 0, s, s * 0.3, 0, 0, Math.PI * 2); ctx.fill(); break;
    case 'lamp': // dīpa
      ctx.ellipse(0, s * 0.3, s * 0.8, s * 0.35, 0, 0, Math.PI); ctx.fill();
      ctx.beginPath(); ctx.ellipse(s * 0.1, -s * 0.3, s * 0.18, s * 0.4, 0, 0, Math.PI * 2); ctx.fillStyle = '#fbbf24'; ctx.fill(); break;
    case 'cloth': // paṭa
      ctx.moveTo(-s, -s * 0.7);
      for (let i = 0; i <= 8; i++) ctx.lineTo(-s + (i * s) / 4, -s * 0.7 + Math.sin(i) * s * 0.12);
      ctx.lineTo(s, s * 0.7);
      for (let i = 8; i >= 0; i--) ctx.lineTo(-s + (i * s) / 4, s * 0.7 + Math.sin(i) * s * 0.12);
      ctx.closePath(); ctx.fill(); break;
    case 'tree':
      ctx.fillRect(-s * 0.12, 0, s * 0.24, s); ctx.beginPath();
      ctx.moveTo(0, -s); ctx.lineTo(s * 0.75, s * 0.2); ctx.lineTo(-s * 0.75, s * 0.2); ctx.closePath(); ctx.fill(); break;
    default: break;
  }
};

const KINDS: FormKind[] = ['glyph', 'glyph', 'glyph', 'glyph', 'pot', 'cloth', 'tree', 'plate', 'lamp'];
const makeForm = (w: number, h: number, initial: boolean): Form => {
  const kind = KINDS[(Math.random() * KINDS.length) | 0];
  return {
    kind, ch: FORM_GLYPHS[(Math.random() * FORM_GLYPHS.length) | 0],
    x: Math.random() * w, y: initial ? Math.random() * h : -30 - Math.random() * 40,
    size: 12 + Math.random() * 26, speed: 25 + Math.random() * 70,
    rot: (Math.random() - 0.5) * 0.8, spin: (Math.random() - 0.5) * 0.8,
    color: FORM_COLORS[(Math.random() * FORM_COLORS.length) | 0], tx: 0, ty: 0,
  };
};

const CodeRainView: React.FC<{ viveka: boolean; onToggle: () => void }> = ({ viveka, onToggle }) => {
  const st = useRef<{ forms: Form[]; part: number; t: number; w: number; h: number }>({ forms: [], part: 0, t: 0, w: 0, h: 0 });
  const draw = useCallback<DrawFn>((ctx, w, h, dt, reduced) => {
    const s = st.current;
    const cell = w < 420 ? 30 : 38;
    const cols = Math.max(4, Math.floor(w / cell));
    const rows = Math.max(3, Math.floor(h / cell));
    if (s.w !== w || s.h !== h) {
      s.forms = Array.from({ length: cols * rows }, () => makeForm(w, h, true));
      s.w = w; s.h = h;
    }
    // uniform grid targets (one per form)
    const gx = w / cols, gy = h / rows;
    s.forms.forEach((f, i) => { f.tx = (i % cols) * gx + gx / 2; f.ty = Math.floor(i / cols) * gy + gy / 2; });
    s.t += dt;
    s.part = reduced ? (viveka ? 1 : 0) : approach(s.part, viveka ? 1 : 0, dt, 1.6);
    const p = s.part, e = p * p * (3 - 2 * p); // smoothstep
    // background: busy dusk → calm deep field
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, e > 0.5 ? '#14110a' : '#1a0f2e'); g.addColorStop(1, '#03140b');
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const satSize = Math.min(gx, gy) * 0.5;
    s.forms.forEach((f) => {
      // the forms keep falling only while Viveka is off (fade their motion out as it dissolves)
      if (!reduced && p < 0.999) {
        f.y += f.speed * dt * (1 - e); f.rot += f.spin * dt * (1 - e);
        if (f.y > h + 40) { Object.assign(f, makeForm(w, h, false)); }
      }
      const x = f.x + (f.tx - f.x) * e, y = f.y + (f.ty - f.y) * e;
      ctx.save(); ctx.translate(x, y); ctx.rotate(f.rot * (1 - e));
      // the form (fades out)
      if (e < 0.999) {
        ctx.globalAlpha = 1 - e; ctx.fillStyle = f.color;
        if (f.kind === 'glyph') { ctx.font = `bold ${f.size}px "Noto Sans Devanagari", "Mangal", sans-serif`; ctx.fillText(f.ch, 0, 0); }
        else drawShape(ctx, f, f.size * 1.1);
      }
      // the one identical सत् (fades in, steady, gentle glow — no motion)
      if (e > 0.001) {
        ctx.globalAlpha = e * 0.55; ctx.fillStyle = SAT_GOLD;
        ctx.shadowColor = '#facc15'; ctx.shadowBlur = 6;
        ctx.font = `${satSize}px "Noto Sans Devanagari", "Mangal", sans-serif`;
        ctx.fillText('सत्', 0, 0);
      }
      ctx.restore();
    });
    if (e > 0.02) {
      const glow = reduced ? 1 : 0.9 + 0.1 * Math.sin(s.t * 1.2); // glow breathes slightly; glyph stays still
      ctx.save(); ctx.globalAlpha = e;
      ctx.fillStyle = 'rgba(3,20,11,0.75)';
      ctx.beginPath(); ctx.ellipse(w / 2, h * 0.45, Math.min(w * 0.3, 160), Math.min(h * 0.28, 80), 0, 0, Math.PI * 2); ctx.fill();
      ctx.shadowColor = '#facc15'; ctx.shadowBlur = 26 * glow; ctx.fillStyle = '#fef9c3';
      ctx.font = `bold ${Math.min(72, w * 0.16)}px "Noto Sans Devanagari", "Mangal", sans-serif`;
      ctx.fillText('सत्', w / 2, h * 0.42);
      ctx.shadowBlur = 0; ctx.font = `${w < 420 ? 11 : 13}px ui-monospace, Menlo, monospace`; ctx.fillStyle = '#fef3c7';
      ctx.fillText('SAT · one, uniform, unchanging', w / 2, h * 0.42 + Math.min(48, w * 0.1));
      ctx.restore();
    } else {
      ctx.font = '12px ui-monospace, Menlo, monospace'; ctx.fillStyle = 'rgba(243,232,255,0.85)';
      ctx.fillText('nāma-rūpa · many forms · tap to apply Viveka', w / 2, h - 12);
    }
  }, [viveka]);
  const ref = useCanvasLoop(draw, 0.5, viveka);
  return <canvas ref={ref} style={{ ...canvasStyle, cursor: 'pointer' }} onClick={onToggle} role="img" aria-label={viveka ? 'All the many forms have settled into one calm, even field of the same word सत् (Sat), with a large सत् in the centre' : 'Many colourful forms falling: varied Devanagari letters, pots, cloths, trees, plates and lamps'} />;
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
  { tag: 'LEVEL 01', short: 'Many forms → Sat', title: 'Many forms, one reality · Nāma-rūpa (नाम-रूप) → Sat (सत्)' },
  { tag: 'LEVEL 02', short: 'Calm → motion', title: 'Sealed Crucible · Andha-Mūṣā (अन्ध-मूषा)' },
  { tag: 'LEVEL 03', short: 'Solid → melt', title: 'Phonon Lattice · 281 K → 2,252 K' },
];

// Guided autoplay timeline (seconds): `act` = when the demo action fires, `end` = when the level advances.
const COUNTDOWN = 3;
const AUTO = [
  { act: 3, end: 10.5, next: 'Next: Level 02 · the Sealed Crucible: calm water → hidden motion' },
  { act: 3, end: 11, next: 'Next: Level 03 · the Phonon Lattice: heat a solid until it melts' },
  { act: 7.5, end: 14, next: 'Next: the summary' },
];

const CSS = `
@keyframes mwGlitch{0%{opacity:0;transform:translateX(-6px);filter:hue-rotate(60deg) contrast(1.6);clip-path:inset(0 0 60% 0)}
30%{opacity:.8;transform:translateX(4px);clip-path:inset(40% 0 0 0)}
60%{opacity:1;transform:translateX(-2px);clip-path:inset(0 0 10% 0)}
100%{opacity:1;transform:none;filter:none;clip-path:inset(0 0 0 0)}}
.mw-level{animation:mwGlitch .45s steps(6,end) both}
.mw-range{width:100%;accent-color:#22c55e}
.mw-hand{position:absolute;z-index:5;pointer-events:none;width:0;height:0}
.mw-finger{position:absolute;left:-9px;top:-2px;font-size:28px;line-height:1;filter:drop-shadow(0 2px 3px #000a);transform-origin:30% 0;display:block}
.mw-tap{animation:mwTap .35s ease-out}
@keyframes mwTap{0%{transform:scale(1)}45%{transform:scale(.82) translateY(3px)}100%{transform:scale(1)}}
.mw-ripple{position:absolute;left:-18px;top:-18px;width:36px;height:36px;border-radius:50%;border:2px solid #4ade80;animation:mwRipple .6s ease-out forwards}
@keyframes mwRipple{0%{transform:scale(.2);opacity:1}100%{transform:scale(1.6);opacity:0}}
@media (prefers-reduced-motion: reduce){.mw-level{animation:none}.mw-hand{display:none}.mw-bar{transition:none!important}}
`;

/* ───────────── Kaṇāda's Sūtras (Vaiśeṣika Sūtra 4.1.1–4.1.2) ───────────── */
const KANADA_SUTRAS: { num: string; deva: string; iast: string; words: [string, string][]; meaning: string; tie: string }[] = [
  {
    num: '4.1.1', deva: 'सदकारणवन्नित्यम्', iast: 'sad-akāraṇavan-nityam',
    words: [['sat', 'existent / real'], ['akāraṇavat', 'uncaused (a- “not” + kāraṇa “cause” + -vat “having”)'], ['nityam', 'eternal']],
    meaning: 'That which is existent and yet uncaused is eternal.',
    tie: 'SAT: a clay pot is caused (by clay), so it is temporary. The paramāṇu exists but is made from no prior part, so in Vaiśeṣika it is eternal: the real, uncaused layer under the render.',
  },
  {
    num: '4.1.2', deva: 'तस्य कार्यं लिङ्गम्', iast: 'tasya kāryaṃ liṅgam',
    words: [['tasya', 'of that (the paramāṇu)'], ['kāryam', 'effect / product'], ['liṅgam', 'mark / sign / evidence']],
    meaning: 'Its effect is the evidence (of its existence).',
    tie: 'INFERENCE: single paramāṇus are invisible; the visible effects (pot, cloth, mountain) prove they exist. Like the Viveka scanner revealing molecules, we infer the invisible from the visible effect.',
  },
];

const More: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <details style={{ marginTop: 6 }}>
    <summary style={{ fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 11, color: '#6ee7b7', cursor: 'pointer' }}>More</summary>
    <p style={{ margin: '0.3rem 0 0', lineHeight: 1.55, fontSize: 13 }}>{children}</p>
  </details>
);

const KanadaSutrasCard: React.FC = () => (
  <div data-testid="asato-kanada-sutras" style={{ border: `1px solid ${GREEN}88`, borderRadius: 8, padding: '0.6rem 0.7rem', margin: '0.3rem 0 0.6rem', background: '#021a10' }}>
    <div style={{ ...mono, fontSize: 12, color: '#4ade80', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6, marginBottom: 6 }}>
      <span>▣ KAṆĀDA’S SŪTRAS</span><span>Vaiśeṣika Sūtra · Sage Kaṇāda</span>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 8 }}>
      {KANADA_SUTRAS.map((s) => (
        <div key={s.num} style={{ border: `1px solid ${GREEN}44`, borderRadius: 6, padding: '0.5rem 0.6rem' }}>
          <div style={{ ...mono, fontSize: 11, color: '#86efac' }}>SŪTRA {s.num}</div>
          <div lang="sa" style={{ fontSize: 20, color: '#f0fdf4', margin: '2px 0' }}>{s.deva}</div>
          <div style={{ fontStyle: 'italic', color: '#bbf7d0', marginBottom: 6 }}>{s.iast}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 6 }}>
            {s.words.map(([w, g]) => (
              <span key={w} style={{ ...mono, fontSize: 11, border: `1px solid ${GREEN}66`, borderRadius: 999, padding: '2px 8px', color: '#dcfce7' }}><strong>{w}</strong> = {g}</span>
            ))}
          </div>
          <div style={{ color: '#f0fdf4', marginBottom: 4 }}>“{s.meaning}”</div>
          <div style={{ fontSize: 13, lineHeight: 1.5, color: '#a7f3d0' }}>{s.tie}</div>
        </div>
      ))}
    </div>
    <div style={{ ...mono, fontSize: 11, color: '#6ee7b7', marginTop: 6 }}>Vaiśeṣika view, not modern physics: modern atoms are divisible (electrons, nuclei, quarks).</div>
  </div>
);

export const MatrixWalkthrough: React.FC = () => {
  const [step, setStep] = useState(0);
  const [viveka, setViveka] = useState(false);
  const [scan, setScan] = useState(false);
  const [, setStats] = useState({ vrms: VRMS, cps: 0 });
  const [temp, setTemp] = useState(T_MIN);
  const [broken, setBroken] = useState(0);
  const [bend, setBend] = useState(false);
  const onStats = useCallback((vrms: number, cps: number) => setStats((p) => (Math.abs(p.vrms - vrms) < 1 && p.cps === cps ? p : { vrms, cps })), []);
  const stability = Math.round(100 * (1 - broken / BREAKABLE));
  const pastLimit = delta(temp) >= LINDEMANN;
  useEffect(() => { if (!pastLimit) setBend(false); }, [pastLimit]);
  // ── Guided autoplay ──
  const [auto, setAuto] = useState(() => !prefersReduced());
  const [el, setEl] = useState(0); // seconds elapsed in the current step's demo
  const [done, setDone] = useState(false);
  const [inView, setInView] = useState(false);
  const secRef = useRef<HTMLElement>(null);
  const reduced = prefersReduced();
  useEffect(() => {
    const node = secRef.current; if (!node) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    io.observe(node); return () => io.disconnect();
  }, []);
  const resetStep = useCallback((s: number) => {
    if (s === 0) setViveka(false);
    if (s === 1) setScan(false);
    if (s === 2) { setTemp(T_MIN); setBend(false); }
  }, []);
  const running = auto && !done && inView && !reduced;
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => { if (!document.hidden) setEl((x) => x + 0.1); }, 100);
    return () => window.clearInterval(id);
  }, [running]);
  // drive each level's demo from the timeline
  useEffect(() => {
    if (!auto || done) return;
    if (step === 0) setViveka(el >= AUTO[0].act);
    if (step === 1) setScan(el >= AUTO[1].act);
    if (step === 2) {
      const f = Math.max(0, Math.min(1, (el - 1.5) / (AUTO[2].act - 1.5)));
      setTemp(T_MIN + (T_MAX - T_MIN) * f);
      setBend(el >= AUTO[2].act + 0.6);
    }
    if (el >= AUTO[step].end) {
      if (step < STEPS.length - 1) { resetStep(step + 1); setStep(step + 1); setEl(0); }
      else setDone(true);
    }
  }, [el, auto, done, step, resetStep]);
  const pause = () => setAuto(false);
  const resume = () => { resetStep(step); setEl(0); setDone(false); setAuto(true); };
  const replay = () => { [0, 1, 2].forEach(resetStep); setStep(0); setEl(0); setDone(false); setAuto(!reduced); };
  const countdownLeft = AUTO[step].end - el;
  const showNext = auto && !done && !reduced && countdownLeft <= COUNTDOWN && countdownLeft > 0;
  // ── Silent hand pointer: glides to each control and "taps" it during autoplay ──
  const wrapRef = useRef<HTMLDivElement>(null);
  const vivRef = useRef<HTMLSpanElement>(null);
  const scanRef = useRef<HTMLSpanElement>(null);
  const sliderRef = useRef<HTMLSpanElement>(null);
  const bendRef = useRef<HTMLSpanElement>(null);
  const nextRef = useRef<HTMLSpanElement>(null);
  const [hand, setHand] = useState<{ x: number; y: number; tap: boolean; drag: boolean; key: string } | null>(null);
  useEffect(() => {
    if (!auto || done || reduced) { setHand(null); return; }
    const A = AUTO[step];
    let target: HTMLElement | null = null, fx = 0.5, tap = false, drag = false, key = `${step}`;
    if (el >= A.end - COUNTDOWN) { target = nextRef.current; tap = el >= A.end - 0.4; key += 'n'; }
    else if (step === 0) { target = vivRef.current; tap = el >= A.act && el < A.act + 0.4; key += 'v'; }
    else if (step === 1) { target = scanRef.current; tap = el >= A.act && el < A.act + 0.4; key += 's'; }
    else if (el < A.act + 0.2) {
      target = sliderRef.current; drag = el >= 1.5; tap = el >= 1.5 && el < 1.9; key += 'd';
      const r = target?.getBoundingClientRect();
      fx = r && r.width ? (8 + (r.width - 16) * ((temp - T_MIN) / (T_MAX - T_MIN))) / r.width : 0;
    } else { target = bendRef.current; tap = el >= A.act + 0.6 && el < A.act + 1; key += 'b'; }
    const w = wrapRef.current?.getBoundingClientRect(), r = target?.getBoundingClientRect();
    if (!w || !r) { setHand(null); return; }
    setHand({ x: r.left - w.left + r.width * fx, y: r.top - w.top + r.height * 0.6, tap, drag, key });
  }, [el, step, auto, done, reduced, temp]);

  return (
    <section ref={secRef} id="asato-matrix-walkthrough" className="vl-panel" aria-label="Matrix walkthrough (for fun)" data-testid="asato-matrix-walkthrough"
      style={{ background: '#03140b', color: '#bbf7d0', border: '1px solid #16a34a', borderRadius: 12, padding: '0.9rem 1rem', margin: '0.75rem 0', overflow: 'hidden' }}>
      <style>{CSS}</style>
      <div style={{ ...mono, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6, fontSize: 12, color: '#4ade80', marginBottom: 8 }}>
        <span>▣ MATRIX WALKTHROUGH (FOR FUN)</span>
        <span>Teaching analogy only · not a claim from the texts</span>
      </div>
      <details style={{ margin: '0 0 0.4rem' }}>
        <summary style={{ ...mono, fontSize: 12, color: '#86efac', cursor: 'pointer' }}>📜 Codex · Māyā: reality vs illusion</summary>
        <Codex />
      </details>
      <details style={{ margin: '0 0 0.6rem' }}>
        <summary style={{ ...mono, fontSize: 12, color: '#86efac', cursor: 'pointer' }}>▣ Kaṇāda’s Sūtras (Vaiśeṣika Sūtra 4.1.1–4.1.2)</summary>
        <KanadaSutrasCard />
      </details>

      {/* minimal step bar + single Pause / Play control */}
      <div style={{ ...mono, display: 'flex', alignItems: 'center', gap: 8, margin: '0.2rem 0 0.5rem', fontSize: 13 }}>
        <ol aria-label="Walkthrough steps" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
          {STEPS.map((s, i) => {
            const cur = step === i && !done;
            return (
              <li key={s.tag} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {i > 0 && <span aria-hidden style={{ color: '#166534' }}>·</span>}
                <button type="button" aria-current={cur ? 'step' : undefined} aria-label={`Step ${i + 1}: ${s.short}`} onClick={() => { pause(); setDone(false); setStep(i); }}
                  style={{ ...mono, border: 'none', cursor: 'pointer', borderRadius: 999, minWidth: 26, height: 26, padding: cur ? '0 10px' : 0, fontSize: 12,
                    background: cur ? '#22c55e' : (done || i < step ? '#166534' : 'transparent'), color: cur ? '#02120a' : '#86efac', outline: cur ? 'none' : '1px solid #166534', transition: 'all .3s' }}>
                  {i + 1}{cur ? ` · ${s.short}` : ''}
                </button>
              </li>
            );
          })}
        </ol>
        <span style={{ marginLeft: 'auto' }}>
          {reduced ? <span style={{ fontSize: 11, color: '#86efac' }}>manual (reduced motion)</span>
            : done ? null
            : auto ? <HudButton onClick={pause} aria-label="Pause guided tour" style={{ padding: '3px 10px' }}>❚❚ PAUSE</HudButton>
            : <HudButton on onClick={resume} data-testid="asato-matrix-resume" style={{ padding: '3px 10px' }}>▶ PLAY</HudButton>}
        </span>
      </div>

      <div ref={wrapRef} style={{ position: 'relative' }}>
      {done ? (
        <div className="mw-level" data-testid="asato-matrix-closing" style={{ textAlign: 'center', border: `1px solid ${GREEN}88`, borderRadius: 8, padding: '1.2rem 0.8rem', background: '#021a10' }}>
          <div style={{ fontSize: 'clamp(16px,3.6vw,22px)', color: '#fef9c3', lineHeight: 1.6 }}>
            Many forms → one Sat (सत्); calm → motion; solid → melt
          </div>
          <div style={{ marginTop: 10 }}><HudButton on onClick={replay} data-testid="asato-matrix-replay">↻ REPLAY</HudButton></div>
        </div>
      ) : (
        <div key={step} className="mw-level">
          {step === 0 && (
            <div>
              <CodeRainView viveka={viveka} onToggle={() => { pause(); setViveka((v) => !v); }} />
              <p style={{ margin: '0.5rem 0', lineHeight: 1.5, color: '#f0fdf4' }}>
                Many forms appear (nāma-rūpa, नाम-रूप); underneath, one uniform, unchanging reality (sat, सत्).
              </p>
              <span ref={vivRef} style={{ display: 'inline-block' }}>
                <HudButton on={viveka} aria-pressed={viveka} onClick={() => { pause(); setViveka((v) => !v); }}>👁️ VIVEKA: {viveka ? 'ON' : 'OFF'}</HudButton>
              </span>
              <More>
                What we see looks different only because of different names and forms: letters, a pot, a cloth, a tree.
                Like the “code” on the Matrix screen, these forms are the changing surface (Asat). Viveka (विवेक, discernment) dissolves them into
                one even, steady field of Sat (सत्). Clay example: a pot (ghaṭa), a plate and a lamp (dīpa) are different forms, yet all are just clay.
              </More>
            </div>
          )}

          {step === 1 && (
            <div>
              <CrucibleView scan={scan} onStats={onStats} />
              <p style={{ margin: '0.5rem 0', lineHeight: 1.5, color: '#f0fdf4' }}>
                Still water looks calm, yet its molecules race at about <strong>{Math.round(VRMS)} m/s</strong>.
              </p>
              <span ref={scanRef} style={{ display: 'inline-block' }}>
                <HudButton on={scan} onClick={() => { pause(); setScan((s) => !s); }} aria-pressed={scan} data-testid="asato-matrix-scan">👁️ VIVEKA SCANNER: {scan ? 'ON' : 'OFF'}</HudButton>
              </span>
              <More>
                Sealed Crucible (Andha-Mūṣā, अन्ध-मूषा), water at {T_WATER} K (7 °C). With the scanner on, {N_MOL} molecules (paramāṇus in the lab’s language) bounce
                off each other with a Maxwell–Boltzmann spread of speeds; {Math.round(VRMS)} m/s is their root-mean-square speed, a steady average. Motion is slowed
                enormously so you can see it. Like the people asleep in the pods, the water <em>looks</em> still; tāpa (ताप, heat) keeps everything moving underneath.
              </More>
            </div>
          )}

          {step === 2 && (
            <div>
              <LatticeView temp={temp} bend={bend} onBroken={setBroken} />
              <p style={{ margin: '0.5rem 0', lineHeight: 1.5, color: '#f0fdf4' }}>
                Heat the solid: at {Math.round(temp).toLocaleString()} K, <strong style={{ color: broken ? '#fca5a5' : undefined }}>{broken} / {BREAKABLE} bonds</strong> broken · {stability}% stable.
              </p>
              <span ref={sliderRef} style={{ display: 'block' }}>
                <input id="mw-temp" aria-label="Temperature in kelvin" className="mw-range" type="range" min={T_MIN} max={T_MAX} step={1} value={temp} onChange={(e) => { pause(); setTemp(Number(e.target.value)); }} />
              </span>
              <span ref={bendRef} style={{ display: 'inline-block', marginTop: 6 }}>
                <HudButton on={bend} disabled={!pastLimit} aria-pressed={bend} onClick={() => { pause(); setBend((b) => !b); }} title={pastLimit ? '' : 'Heat past the Lindemann limit first'}>🥄 BEND THE SPOON</HudButton>
              </span>
              <More>
                Phonon Lattice, {T_MIN} K → {T_MAX.toLocaleString()} K. Heat makes the lattice shake in waves called phonons; the swing grows roughly with √T. Past about a tenth
                of the spacing (the Lindemann melt limit) bonds snap and the solid melts: at 2,252 K this model shows 29 broken bonds and 0% stability.
                Teaching analogy: like Neo bending the spoon, once you see the rules underneath, the “solid” is not as fixed as it looked.
              </More>
            </div>
          )}
        </div>
      )}

      {showNext && (
        <div role="status" aria-live="polite" data-testid="asato-matrix-next" style={{ ...mono, display: 'flex', alignItems: 'center', gap: 10, marginTop: 8, padding: '6px 10px', border: `1px solid ${GREEN}88`, borderRadius: 8, background: '#052e16', color: '#dcfce7', fontSize: 13 }}>
          <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden>
            <circle cx="15" cy="15" r="12" fill="none" stroke="#064e2b" strokeWidth="3" />
            <circle cx="15" cy="15" r="12" fill="none" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" transform="rotate(-90 15 15)"
              strokeDasharray={2 * Math.PI * 12} strokeDashoffset={2 * Math.PI * 12 * (countdownLeft / COUNTDOWN)} />
            <text x="15" y="19" textAnchor="middle" fontSize="11" fill="#dcfce7">{Math.ceil(countdownLeft)}</text>
          </svg>
          <span>{AUTO[step].next}</span>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, gap: 8 }}>
        <HudButton disabled={step === 0 && !done} onClick={() => { pause(); if (done) setDone(false); else setStep((s) => s - 1); }} style={{ padding: '2px 8px', fontSize: 11 }}>◀ PREV</HudButton>
        <span ref={nextRef} style={{ display: 'inline-block' }}>
          <HudButton disabled={done} onClick={() => { pause(); if (step === STEPS.length - 1) setDone(true); else setStep((s) => s + 1); }} style={{ padding: '2px 8px', fontSize: 11 }}>NEXT ▶</HudButton>
        </span>
      </div>

      {hand && (
        <div aria-hidden className="mw-hand" style={{ left: hand.x, top: hand.y, transition: hand.drag ? 'left .1s linear, top .1s linear' : 'left .7s cubic-bezier(.4,0,.2,1), top .7s cubic-bezier(.4,0,.2,1)' }}>
          {hand.tap && <span key={hand.key} className="mw-ripple" />}
          <span className={hand.tap ? 'mw-finger mw-tap' : 'mw-finger'}>👆</span>
        </div>
      )}
      </div>
    </section>
  );
};

export default MatrixWalkthrough;
