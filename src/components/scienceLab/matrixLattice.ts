/**
 * Matrix Overwatch: a 2D diatomic mass-spring lattice (triangular grid, nearest-neighbour springs).
 * Alpha nodes are heavy, Beta nodes light. Everything is in dimensionless sim units:
 * spacing a = 1, spring constant K = 1, Beta mass = 1.
 *
 * - Temperature: a Langevin thermostat (friction γ plus matching random kicks) holds the nodes near kT.
 * - Acoustic drive: a travelling force field proportional to each node's mass, so neighbours accelerate together
 *   (in phase) and a long transverse ripple crosses the grid.
 * - Optical drive: equal and opposite forces on Alpha and Beta (zero net force, like light's electric field on an
 *   ionic crystal), at the optical frequency, so Alpha and Beta move against each other.
 * - A very weak, mass-proportional pin keeps the demo on screen and lets broken bonds heal; it shifts every mode
 *   frequency by the same small amount and does not change in-phase vs out-of-phase motion.
 */
export type Mode = 'acoustic' | 'optical';

export const COLS = 10;
export const ROWS = 6;
export const MASS_ALPHA = 3;
export const MASS_BETA = 1;
// Melting rule of thumb (Lindemann): a crystal melts when vibrations reach ~10–15% of the spacing. Here it is used in
// its neighbour-pair form (as in simulations): rms change of neighbour distances ≈ 10% of the spacing.
export const LINDEMANN = 0.1;
export const T_MELT_REF = 1337; // K, gold's melting point: calibrates the effective-temperature scale
/** Sim time units per real second of animation (the sim clock is hugely slowed versus a real crystal). */
export const SIM_UNITS_PER_S = 10;
const PIN_W = 0.25; // pin frequency (sim units)
const BREAK_AT = 1.3; // a bond stretched past 1.3 a stops pulling …
const HEAL_AT = 1.12; // … until it is back within 1.12 a
const DT = 0.04;
// Drive strengths, tuned so the chosen mode stands out at mid overclock and the lattice breaks near 100%.
const ACOUSTIC_PUSH = 1.8;
const OPTICAL_PUSH = 2.5;

export interface Node {
  alpha: boolean;
  m: number;
  sx: number; // lattice site
  sy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}
export interface Bond {
  i: number;
  j: number;
  broken: boolean;
  len: number; // current length, a = 1
}

export interface Lattice {
  nodes: Node[];
  bonds: Bond[];
  t: number;
  wOpt: number;
  wAc: number;
  kWave: number;
  u2: number; // smoothed mean squared displacement from the sites
  s2: number; // smoothed mean squared bond strain, ((length − a)/a)² over neighbour pairs
  kT: number; // smoothed kinetic temperature (sim units): KE per node in 2D = kT
}

const gauss = () => {
  const u = Math.random() || 1e-9;
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * Math.random());
};

export const createLattice = (): Lattice => {
  const nodes: Node[] = [];
  const h = Math.sqrt(3) / 2;
  for (let r = 0; r < ROWS; r += 1) {
    for (let c = 0; c < COLS; c += 1) {
      const sx = c + (r % 2 ? 0.5 : 0);
      const sy = r * h;
      const alpha = c % 2 === 0;
      nodes.push({ alpha, m: alpha ? MASS_ALPHA : MASS_BETA, sx, sy, x: sx, y: sy, vx: 0, vy: 0 });
    }
  }
  const bonds: Bond[] = [];
  for (let i = 0; i < nodes.length; i += 1) {
    for (let j = i + 1; j < nodes.length; j += 1) {
      const d = Math.hypot(nodes[i].sx - nodes[j].sx, nodes[i].sy - nodes[j].sy);
      if (d < 1.01) bonds.push({ i, j, broken: false, len: 1 });
    }
  }
  // Optical frequency, k ≈ 0: Alpha and Beta pushed apart along x. Only unlike neighbours stretch, so
  // ω² ≈ K·S·(1/M + 1/m) with S = Σ cos²θ over unlike neighbours (averaged over the bulk nodes) + pin.
  let S = 0;
  let n = 0;
  nodes.forEach((a, i) => {
    let s = 0;
    let deg = 0;
    bonds.forEach((b) => {
      if (b.i !== i && b.j !== i) return;
      deg += 1;
      const o = nodes[b.i === i ? b.j : b.i];
      if (o.alpha !== a.alpha) s += ((o.sx - a.sx) ** 2) / 1;
    });
    if (deg === 6) {
      S += s;
      n += 1;
    }
  });
  S = n ? S / n : 2.5;
  const wOpt = Math.sqrt(PIN_W ** 2 + S * (1 / MASS_ALPHA + 1 / MASS_BETA));
  // Acoustic: a transverse wave of wavelength 5 a; long-wave transverse sound speed of a triangular
  // nearest-neighbour lattice is c_t = √(3K/8m̄)·a, with the lattice sine dispersion.
  const kWave = (2 * Math.PI) / 5;
  const mBar = (MASS_ALPHA + MASS_BETA) / 2;
  const ct = Math.sqrt(3 / (8 * mBar));
  // That estimate (≈ 0.52) assumes an endless crystal; this small 10×6 patch responds most strongly a little lower
  // (measured resonance band ≈ 0.35–0.5), so the drive sits at 80% of it.
  const wAc = 0.8 * Math.sqrt(PIN_W ** 2 + ((2 * ct * Math.sin(kWave / 2)) ** 2));
  return { nodes, bonds, t: 0, wOpt, wAc, kWave, u2: 0, s2: 0, kT: 0 };
};

/** Count of bonds currently broken (stretched past the break length). */
export const brokenCount = (L: Lattice) => {
  let n = 0;
  for (const b of L.bonds) if (b.broken) n += 1;
  return n;
};

/** kT (sim units) for a temperature in K, calibrated so thermal rms ≈ LINDEMANN·a at T_MELT_REF. */
// Measured for this lattice (thermostat only, γ = 0.3): mean bond strain² ≈ 0.716·kT, so reaching (0.1)² at 1337 K
// (gold's melting point) needs this factor.
export const KT_PER_K = (LINDEMANN * LINDEMANN) / 0.716 / T_MELT_REF;

export interface Drive {
  mode: Mode;
  tempK: number; // energy scale in K: the drive strength grows as √tempK
  gamma: number; // friction rate, 1 / sim time
  drive?: number; // coherent drive strength multiplier (default 1; 0 = thermal only)
  noise?: number; // thermostat temperature as a share of tempK (default 1)
}

/** Advance the lattice by `simTime` sim units. */
export const stepLattice = (L: Lattice, simTime: number, d: Drive) => {
  if (!(simTime > 0)) return;
  const { nodes, bonds } = L;
  const kT = Math.max(0, d.tempK) * KT_PER_K;
  // Coherent drive: steady-state amplitude at resonance ≈ X0·(0.3/γ), with X0 growing as √T.
  const X0 = (d.drive ?? 1) * Math.sqrt(kT / (T_MELT_REF * KT_PER_K)) * LINDEMANN;
  const steps = Math.max(1, Math.ceil(simTime / DT));
  const dt = simTime / steps;
  const mu = (MASS_ALPHA * MASS_BETA) / (MASS_ALPHA + MASS_BETA);
  const fx = new Float64Array(nodes.length);
  const fy = new Float64Array(nodes.length);
  for (let s = 0; s < steps; s += 1) {
    fx.fill(0);
    fy.fill(0);
    bonds.forEach((b) => {
      const A = nodes[b.i];
      const B = nodes[b.j];
      const dx = B.x - A.x;
      const dy = B.y - A.y;
      const len = Math.hypot(dx, dy) || 1e-6;
      b.len = len;
      if (b.broken) {
        if (len < HEAL_AT) b.broken = false;
        else return;
      } else if (len > BREAK_AT) {
        b.broken = true;
        return;
      }
      const f = (len - 1) / len; // K = 1
      fx[b.i] += f * dx;
      fy[b.i] += f * dy;
      fx[b.j] -= f * dx;
      fy[b.j] -= f * dy;
    });
    const t = L.t;
    nodes.forEach((p, i) => {
      let ax = fx[i] / p.m - PIN_W * PIN_W * (p.x - p.sx);
      let ay = fy[i] / p.m - PIN_W * PIN_W * (p.y - p.sy);
      if (d.mode === 'acoustic') {
        // mass-proportional force = the same acceleration for Alpha and Beta at one place: in phase
        ay += ACOUSTIC_PUSH * X0 * 0.3 * L.wAc * Math.cos(L.kWave * p.sx - L.wAc * t);
      } else {
        // equal and opposite forces: Alpha one way, Beta the other (zero net push on the crystal)
        const F = OPTICAL_PUSH * mu * X0 * 0.3 * L.wOpt * Math.cos(L.wOpt * t) * (p.alpha ? 1 : -1);
        ax += (F / p.m) * 0.8;
        ay += (F / p.m) * 0.6;
      }
      const kick = Math.sqrt((2 * d.gamma * kT * (d.noise ?? 1) * dt) / p.m);
      p.vx += (ax - d.gamma * p.vx) * dt + kick * gauss();
      p.vy += (ay - d.gamma * p.vy) * dt + kick * gauss();
    });
    nodes.forEach((p) => {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
    });
    L.t += dt;
  }
  // Measurements
  // Vibration is measured relative to the lattice's own centre (a drift of the whole grid is not vibration).
  let mx = 0;
  let my = 0;
  nodes.forEach((p) => {
    mx += p.x - p.sx;
    my += p.y - p.sy;
  });
  mx /= nodes.length;
  my /= nodes.length;
  let u2 = 0;
  let ke = 0;
  nodes.forEach((p) => {
    u2 += (p.x - p.sx - mx) ** 2 + (p.y - p.sy - my) ** 2;
    ke += 0.5 * p.m * (p.vx * p.vx + p.vy * p.vy);
  });
  u2 /= nodes.length;
  const kTnow = ke / nodes.length; // 2 degrees of freedom: KE per node = kT
  let s2 = 0;
  bonds.forEach((b) => {
    s2 += (b.len - 1) ** 2;
  });
  s2 /= bonds.length;
  const w = 1 - Math.exp(-simTime / 8);
  L.u2 += (u2 - L.u2) * w;
  L.s2 += (s2 - L.s2) * w;
  L.kT += (kTnow - L.kT) * w;
};

/** Stability: 100% far below melting, 0% when the rms neighbour-distance change reaches the Lindemann fraction. */
export const stabilityPct = (s2: number) => Math.max(0, Math.min(100, 100 * (1 - s2 / (LINDEMANN * LINDEMANN))));

/** Overclock slider (0–100) → energy scale in K (drive strength ∝ √K). */
export const overclockToK = (lvl: number) => 15 + 2185 * (lvl / 100) ** 2;
/**
 * Share of that energy scale given to the random thermal kicks. Low at first, so the driven acoustic or optical
 * pattern is easy to see; it rises steeply so a full overclock really heats (and breaks) the lattice.
 */
export const thermostatShare = (lvl: number) => 0.05 + 0.95 * (lvl / 100) ** 3;
/** Suppression slider (0–100) → friction rate γ in 1 / sim time. */
export const suppressionToGamma = (lvl: number) => 0.03 + 0.97 * (lvl / 100) ** 1.5;
