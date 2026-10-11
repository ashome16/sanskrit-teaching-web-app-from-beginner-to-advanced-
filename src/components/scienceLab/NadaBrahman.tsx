import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BodhiLabAnecdote, ChallengeList, CoreIdea, TermPanel, type LabChallenge, type LabTerm } from './common';
import { DialKnob, GlowSlider, HudFrame, LedButton } from './controls';

type LangMode = 'both' | 'sanskrit' | 'modern';
type VisualMode = 'wave' | 'cymatics' | 'sarana';

interface SaranaData {
  step: number;
  name: string;
  dev: string;
  cents: number;
  beatHz: number;
  desc: string;
}

const SARANA_DATA: SaranaData[] = [
  { step: 0, name: 'Sāmya (Unison Reference)', dev: 'ध्रुव-साम्यम्', cents: 0, beatHz: 0, desc: 'Calā and Acalā vīṇās tuned to exact unison (0 cents). Zero acoustic beating.' },
  { step: 1, name: '1st Saraṇā: Pramāṇa Śruti', dev: 'प्रमाण-श्रुतिः', cents: -21.5, beatHz: 5.5, desc: 'Calā lowered by 1 Śruti (Pramāṇa Śruti ≈ 81/80 comma, ~21.5¢). Produces audible acoustic beating against the control.' },
  { step: 2, name: '2nd Saraṇā: Dviśruti Shift', dev: 'द्विश्रुति-सारणा', cents: -45.0, beatHz: 11.5, desc: 'Calā lowered by 2 Śrutis. Gāndhāra & Niṣāda merge into adjacent notes.' },
  { step: 3, name: '3rd Saraṇā: Triśruti Shift', dev: 'त्रिश्रुति-सारणा', cents: -67.5, beatHz: 17.5, desc: 'Calā lowered by 3 Śrutis. Ṛṣabha & Dhaivata enter resonance alignment.' },
  { step: 4, name: '4th Saraṇā: Catuḥśruti Cycle', dev: 'चतुःश्रुति-सारणा', cents: -90.0, beatHz: 23.5, desc: 'Calā lowered by 4 Śrutis. Closes the full 22-Śruti microtonal cycle empirically!' },
];

const W = 720;
const H = 300;
const X0 = 60; // fixed end (left)
const X1 = 660; // fixed end (right)
const Y0 = 150;

/** Nominal string: about a 0.3 mm steel wire, 0.90 m vibrating length. */
const L_M = 0.9; // m
const MU = 0.55e-3; // kg/m (0.55 g/m)
const T_MIN = 2;
const T_MAX = 60;
const T_START = 12;
const TOL = 0.01; // ±1 % counts as in tune (about ±17 cents)

/** f = n/(2L)·√(T/μ) for an ideal string fixed at both ends. */
const stringFreq = (n: number, T: number) => (n / (2 * L_M)) * Math.sqrt(T / MU);
const tensionFor = (n: number, f: number) => MU * ((2 * L_M * f) / n) ** 2;

const NOTE_NAMES = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];
const nearestNote = (f: number) => {
  const m = 69 + 12 * Math.log2(f / 440);
  const r = Math.round(m);
  const cents = Math.round((m - r) * 100);
  return { name: `${NOTE_NAMES[((r % 12) + 12) % 12]}${Math.floor(r / 12) - 1}`, cents };
};

interface Harmonic {
  n: number;
  tan: string;
  tanDev: string;
  tanEn: string;
  bhuta: string;
  bhutaDev: string;
  bhutaEn: string;
  color: string;
}

const HARMONICS: Harmonic[] = [
  { n: 1, tan: 'śabda', tanDev: 'शब्द', tanEn: 'sound', bhuta: 'ākāśa', bhutaDev: 'आकाश', bhutaEn: 'space', color: '#818cf8' },
  { n: 2, tan: 'sparśa', tanDev: 'स्पर्श', tanEn: 'touch', bhuta: 'vāyu', bhutaDev: 'वायु', bhutaEn: 'air', color: '#38bdf8' },
  { n: 3, tan: 'rūpa', tanDev: 'रूप', tanEn: 'form, sight', bhuta: 'tejas', bhutaDev: 'तेजस्', bhutaEn: 'fire, light', color: '#fb923c' },
  { n: 4, tan: 'rasa', tanDev: 'रस', tanEn: 'taste', bhuta: 'ap', bhutaDev: 'अप्', bhutaEn: 'water', color: '#2dd4bf' },
  { n: 5, tan: 'gandha', tanDev: 'गन्ध', tanEn: 'smell', bhuta: 'pṛthivī', bhutaDev: 'पृथिवी', bhutaEn: 'earth', color: '#fbbf24' },
];

const TARGETS = [
  { f: 110, note: 'A2', hint: 'Start with n = 1 and tighten the string.' },
  { f: 261.63, note: 'C4', hint: 'Too high for n = 1 on this string. Pick a higher harmonic, then tune.' },
  { f: 440, note: 'A4', hint: 'Concert A. Several harmonics can reach it; find one.' },
];

const TERMS: LabTerm[] = [
  { dev: 'नाद', iast: 'nāda', en: 'sound, resonance' },
  { dev: 'नादब्रह्म', iast: 'nāda-brahman', en: 'ultimate reality as sound', note: 'later yoga, music and tantra texts' },
  { dev: 'आहत', iast: 'āhata', en: 'struck sound', note: 'like this plucked string' },
  { dev: 'अनाहत', iast: 'anāhata', en: 'unstruck sound' },
  { dev: 'प्रणव', iast: 'praṇava', en: 'the syllable oṃ' },
  { dev: 'ओम्', iast: 'oṃ', en: 'the sacred syllable', note: 'Māṇḍūkya Upaniṣad' },
  { dev: 'तन्मात्र', iast: 'tanmātra', en: 'subtle element (Sāṅkhya)' },
  { dev: 'महाभूत', iast: 'mahābhūta', en: 'great (gross) element' },
  { dev: 'शब्द', iast: 'śabda', en: 'sound' },
  { dev: 'स्पर्श', iast: 'sparśa', en: 'touch' },
  { dev: 'रूप', iast: 'rūpa', en: 'form, sight' },
  { dev: 'रस', iast: 'rasa', en: 'taste' },
  { dev: 'गन्ध', iast: 'gandha', en: 'smell' },
  { dev: 'तन्त्री', iast: 'tantrī', en: 'string (of an instrument)' },
  { dev: 'स्वर', iast: 'svara', en: 'musical note' },
];

const CHALLENGES: LabChallenge[] = [
  { q: 'Keep the tension the same and switch from n = 1 to n = 2. The frequency…', options: ['halves', 'doubles', 'stays the same'], answer: 1, explain: 'f = n/(2L)·√(T/μ), so f grows in step with n: the 2nd harmonic is an octave above the 1st.' },
  { q: 'To make the frequency twice as high on the same harmonic, the tension must be…', options: ['doubled', 'made four times bigger', 'halved'], answer: 1, explain: 'f grows with √T, so 4 × the tension gives 2 × the frequency.' },
  { q: 'In the standard Sāṅkhya pairing, rūpa (form, sight) goes with which mahābhūta?', options: ['ap (water)', 'tejas (fire, light)', 'ākāśa (space)'], answer: 1, explain: 'śabda–ākāśa, sparśa–vāyu, rūpa–tejas, rasa–ap, gandha–pṛthivī.' },
  { q: 'A plucked sitār string makes which kind of nāda?', options: ['āhata (struck)', 'anāhata (unstruck)', 'neither'], answer: 0, explain: 'Āhata means struck: a string, a drum, the voice. Anāhata, unstruck sound, is described as heard inwardly.' },
  { q: 'String theory is…', options: ['proved by experiment', 'a modern mathematical idea not yet confirmed by experiment', 'described in the Upaniṣads'], answer: 1, explain: 'It is a serious but unproven idea in physics. The old texts do not describe it.' },
];

let sharedCtx: AudioContext | null = null;
const getCtx = () => {
  if (sharedCtx) return sharedCtx;
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;
  sharedCtx = new AC();
  return sharedCtx;
};

const NadaBrahman: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [lang, setLang] = useState<LangMode>('both');
  const [visualMode, setVisualMode] = useState<VisualMode>('wave');
  const [saranaStep, setSaranaStep] = useState<number>(0);
  const [n, setN] = useState(1);
  const [T, setT] = useState(T_START);
  const [amp, setAmp] = useState(60);
  const [playing, setPlaying] = useState(true);
  const [sound, setSound] = useState(false);
  const [round, setRound] = useState(0);
  const [matched, setMatched] = useState<boolean[]>([false, false, false]);

  const f = stringFreq(n, T);
  const curSarana = SARANA_DATA[saranaStep];
  const saranaF = f * Math.pow(2, curSarana.cents / 1200);

  const live = useRef({ n, T, amp, playing, lang, f, visualMode, saranaStep, saranaF });
  useEffect(() => {
    live.current = { n, T, amp, playing, lang, f, visualMode, saranaStep, saranaF };
  }, [n, T, amp, playing, lang, f, visualMode, saranaStep, saranaF]);
  const pluckAt = useRef(-10);
  const clock = useRef(0);

  // ---- optional tone (off by default) ----
  const audio = useRef<{ osc: OscillatorNode; oscTest?: OscillatorNode; gain: GainNode } | null>(null);
  const sustainGain = useCallback((a: number, isPlaying: boolean) => (isPlaying ? 0.03 * (a / 100) : 0), []);
  const startAudio = () => {
    const ctx = getCtx();
    if (!ctx) return;
    void ctx.resume();
    if (audio.current) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.value = f;
    gain.gain.value = 0;
    osc.connect(gain).connect(ctx.destination);
    osc.start();

    let oscTest: OscillatorNode | undefined;
    if (visualMode === 'sarana') {
      oscTest = ctx.createOscillator();
      oscTest.type = 'triangle';
      oscTest.frequency.value = saranaF;
      oscTest.connect(gain);
      oscTest.start();
    }

    audio.current = { osc, oscTest, gain };
    gain.gain.setTargetAtTime(sustainGain(amp, playing), ctx.currentTime, 0.05);
  };
  const stopAudio = () => {
    const a = audio.current;
    if (!a) return;
    audio.current = null;
    try {
      const ctx = a.osc.context;
      a.gain.gain.setTargetAtTime(0, ctx.currentTime, 0.03);
      a.osc.stop(ctx.currentTime + 0.2);
      if (a.oscTest) a.oscTest.stop(ctx.currentTime + 0.2);
    } catch {
      /* ignore */
    }
  };
  useEffect(() => {
    const a = audio.current;
    if (!a) return;
    const ctx = a.osc.context;
    a.osc.frequency.setTargetAtTime(f, ctx.currentTime, 0.02);
    if (a.oscTest) {
      a.oscTest.frequency.setTargetAtTime(saranaF, ctx.currentTime, 0.02);
    }
    a.gain.gain.setTargetAtTime(sustainGain(amp, playing), ctx.currentTime, 0.08);
  }, [f, saranaF, amp, playing, sustainGain]);
  useEffect(() => () => stopAudio(), []);

  const toggleSound = () => {
    if (sound) {
      stopAudio();
      setSound(false);
    } else {
      startAudio();
      setSound(true);
    }
  };

  // ---- quest ----
  const target = TARGETS[Math.min(round, TARGETS.length - 1)];
  const off = f / target.f - 1;
  const inTune = Math.abs(off) <= TOL;
  const allDone = matched.every(Boolean);
  const check = (nextN: number, nextT: number) => {
    if (round >= TARGETS.length) return;
    const fx = stringFreq(nextN, nextT);
    if (Math.abs(fx / TARGETS[round].f - 1) <= TOL) setMatched((m) => (m[round] ? m : m.map((v, i) => (i === round ? true : v))));
  };
  const pickN = (k: number) => {
    setN(k);
    check(k, T);
  };
  const changeT = (v: number) => {
    const t = Math.max(T_MIN, Math.min(T_MAX, Math.round(v * 10) / 10));
    setT(t);
    check(n, t);
  };
  const pluck = () => {
    pluckAt.current = clock.current;
    if (!playing) setPlaying(true);
    const a = audio.current;
    if (a && sound) {
      const ctx = a.osc.context;
      const g = a.gain.gain;
      const base = sustainGain(amp, true);
      g.cancelScheduledValues(ctx.currentTime);
      g.setValueAtTime(Math.max(base, 0.001), ctx.currentTime);
      g.linearRampToValueAtTime(0.03 + 0.18 * (amp / 100), ctx.currentTime + 0.01);
      g.setTargetAtTime(base, ctx.currentTime + 0.02, 0.6);
    }
  };
  const nextRound = () => setRound((r) => Math.min(TARGETS.length, r + 1));
  const restartQuest = () => {
    setRound(0);
    setMatched([false, false, false]);
    setN(1);
    setT(T_START);
  };

  // ---- drawing ----
  const paint = useCallback((dt: number) => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    if (cv.width !== W * dpr) {
      cv.width = W * dpr;
      cv.height = H * dpr;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const { n: k, T: tension, amp: a, playing: isPlaying, f: freq } = live.current;
    if (isPlaying) clock.current += Math.min(0.05, dt);
    const t = clock.current;
    const hm = HARMONICS[k - 1];

    ctx.clearRect(0, 0, W, H);
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#0b1222');
    bg.addColorStop(1, '#030712');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Check visual mode:
    if (live.current.visualMode === 'cymatics') {
      // -------------------------------------------------------------
      // 2D Chladni Cymatics Mandala Plate
      // -------------------------------------------------------------
      const cx = W / 2;
      const cy = H / 2;
      const R = 115;

      // Resonant brass plate rim
      const brassGrad = ctx.createRadialGradient(cx, cy, R * 0.2, cx, cy, R);
      brassGrad.addColorStop(0, '#1e1b4b');
      brassGrad.addColorStop(0.7, '#0f172a');
      brassGrad.addColorStop(0.96, '#1e293b');
      brassGrad.addColorStop(1, '#d97706');
      ctx.fillStyle = brassGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Delicate concentric brass rings
      ctx.strokeStyle = 'rgba(245,158,11,0.2)';
      ctx.lineWidth = 1;
      for (let r = 25; r < R; r += 25) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, 2 * Math.PI);
        ctx.stroke();
      }

      // Dynamic sand grains settling along Chladni nodal lines
      const since = t - pluckAt.current;
      const pluckEnv = since >= 0 && since < 3 ? Math.exp(-since / 0.8) : 0;
      const jitterA = (a / 100) * (6 * pluckEnv + (isPlaying ? 1.2 : 0));

      // Draw mathematical nodal lines
      ctx.strokeStyle = hm.color;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);

      // Nodal rings
      for (let ring = 1; ring <= k; ring++) {
        const radRing = (R * ring) / (k + 1);
        ctx.beginPath();
        ctx.arc(cx, cy, radRing, 0, 2 * Math.PI);
        ctx.stroke();
      }
      // Nodal radial spokes
      const numSpokes = k * 2;
      for (let sp = 0; sp < numSpokes; sp++) {
        const ang = (sp * Math.PI) / k + (isPlaying ? Math.sin(t * 0.5) * 0.02 : 0);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(ang) * R, cy + Math.sin(ang) * R);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // Draw 240 sand particles
      ctx.fillStyle = '#fef08a';
      const numGrains = 220;
      for (let g = 0; g < numGrains; g++) {
        const ringIdx = (g % k) + 1;
        const radBase = (R * ringIdx) / (k + 1);
        const angBase = (Math.floor(g / k) * (2 * Math.PI)) / (numGrains / k);
        const jx = (Math.sin(g * 17.3 + t * 12) * jitterA);
        const jy = (Math.cos(g * 29.1 + t * 14) * jitterA);
        const px = cx + Math.cos(angBase) * radBase + jx;
        const py = cy + Math.sin(angBase) * radBase + jy;

        ctx.beginPath();
        ctx.arc(px, py, 1.8, 0, 2 * Math.PI);
        ctx.fill();
      }

      // Title overlay on plate
      ctx.font = '600 13px system-ui, sans-serif';
      ctx.fillStyle = '#fef08a';
      ctx.textAlign = 'center';
      ctx.fillText(`नाद-मण्डलम् · Chladni Cymatics Yantra (Mode n = ${k})`, cx, 28);
      ctx.font = '11px system-ui, sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`Acoustic vibration structures matter into sacred geometry · Sand settles along nodal lines`, cx, H - 18);
      return;
    }

    if (live.current.visualMode === 'sarana') {
      // -------------------------------------------------------------
      // Bharata Muni's Saraṇā Catuṣṭayī Twin-Vīṇā Comparison
      // -------------------------------------------------------------
      const curS = SARANA_DATA[live.current.saranaStep];
      const testF = live.current.saranaF;
      const beatF = curS.beatHz;

      // Top string: Acalā-Vīṇā (Fixed Reference Control Harp)
      const yAcala = 85;
      const yCala = 215;
      const yBeats = 150;
      const len = X1 - X0;

      // Draw control string (Acalā)
      const phaseA = Math.cos(2 * Math.PI * (0.5 + freq / 250) * t);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      for (let x = X0; x <= X1; x += 3) {
        const u = (x - X0) / len;
        const y = yAcala + ((a / 100) * 16) * Math.sin(Math.PI * u) * phaseA;
        if (x === X0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw test string (Calā)
      const phaseC = Math.cos(2 * Math.PI * (0.5 + testF / 250) * t);
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      for (let x = X0; x <= X1; x += 3) {
        const u = (x - X0) / len;
        const y = yCala + ((a / 100) * 16) * Math.sin(Math.PI * u) * phaseC;
        if (x === X0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Middle composite acoustic interference beat waveform
      const beatEnv = Math.cos(2 * Math.PI * (beatF * 0.5) * t);
      ctx.strokeStyle = 'rgba(236,72,153,0.85)';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      for (let x = X0; x <= X1; x += 3) {
        const u = (x - X0) / len;
        const carrier = Math.sin(2 * Math.PI * 4 * u + t * 4);
        const y = yBeats + 24 * beatEnv * Math.sin(Math.PI * u) * carrier;
        if (x === X0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Labels
      ctx.font = '700 12px system-ui, sans-serif';
      ctx.fillStyle = '#38bdf8';
      ctx.textAlign = 'left';
      ctx.fillText(`अचला वीणा (Acalā Vīṇā · Fixed Control) : ${freq.toFixed(1)} Hz`, X0, yAcala - 24);

      ctx.fillStyle = '#f59e0b';
      ctx.fillText(`चला वीणा (Calā Vīṇā · Test Harp) : ${testF.toFixed(1)} Hz (${curS.cents >= 0 ? '0' : curS.cents}¢)`, X0, yCala + 36);

      ctx.fillStyle = '#ec4899';
      ctx.textAlign = 'center';
      ctx.fillText(`श्रुति-संवाद & आघातः · Interference Beats: ${beatF > 0 ? `${beatF.toFixed(1)} Hz` : 'Zero (In Unison)'}`, W / 2, yBeats - 14);

      return;
    }

    // Default mode: 1D Standing Wave
    // Neck and gourd (decoration only)
    ctx.fillStyle = 'rgba(148,163,184,0.08)';
    ctx.beginPath();
    ctx.roundRect(X0 + 10, Y0 + 92, X1 - X0 - 60, 14, 7);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(X1 - 20, Y0 + 99, 34, 26, 0, 0, 2 * Math.PI);
    ctx.fill();

    // Exaggerated sag: a slack string droops.
    const sag = Math.min(40, 160 / tension);
    // Pluck boosts the motion, then it settles back.
    const since = t - pluckAt.current;
    const env = 0.4 + 0.6 * (since >= 0 && since < 8 ? Math.exp(-since / 1.4) : 0);
    const A = (a / 100) * 70 * env;
    const fd = 0.5 + freq / 250; // slowed down for the eye
    const phase = Math.cos(2 * Math.PI * fd * t);
    const len = X1 - X0;
    const yAt = (x: number, ph: number) => {
      const u = (x - X0) / len;
      return Y0 + sag * 4 * u * (1 - u) + A * Math.sin(k * Math.PI * u) * ph;
    };

    // Envelope (where the string can reach)
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = 'rgba(148,163,184,0.5)';
    ctx.lineWidth = 1;
    [1, -1].forEach((s) => {
      ctx.beginPath();
      for (let x = X0; x <= X1; x += 4) {
        const y = yAt(x, s);
        if (x === X0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    });
    ctx.setLineDash([]);

    // The string
    const tight = tension > 50;
    ctx.strokeStyle = tight ? '#f87171' : hm.color;
    ctx.lineWidth = 3;
    ctx.shadowColor = tight ? 'rgba(248,113,113,0.8)' : hm.color;
    ctx.shadowBlur = 12;
    ctx.beginPath();
    for (let x = X0; x <= X1; x += 2) {
      const y = yAt(x, phase);
      if (x === X0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Nodes and antinodes
    ctx.font = '600 11px system-ui, sans-serif';
    ctx.textAlign = 'center';
    for (let j = 0; j <= k; j += 1) {
      const x = X0 + (len * j) / k;
      ctx.beginPath();
      ctx.arc(x, yAt(x, 0), j === 0 || j === k ? 6 : 4.5, 0, 2 * Math.PI);
      ctx.fillStyle = j === 0 || j === k ? '#e5e7eb' : '#030712';
      ctx.fill();
      ctx.strokeStyle = '#e5e7eb';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      if (j > 0 && j < k) {
        ctx.fillStyle = '#cbd5e1';
        ctx.fillText('node', x, yAt(x, 0) + 22);
      }
    }
    for (let j = 0; j < k; j += 1) {
      const x = X0 + (len * (j + 0.5)) / k;
      ctx.fillStyle = 'rgba(203,213,225,0.85)';
      ctx.fillText('antinode', x, Math.max(44, Y0 - (a / 100) * 70 - 10));
    }

    // Fixed ends
    ctx.fillStyle = '#a16207';
    ctx.fillRect(X0 - 10, Y0 - 24, 8, 48);
    ctx.fillRect(X1 + 2, Y0 - 24, 8, 48);
    ctx.fillStyle = '#fcd34d';
    ctx.font = '600 11px system-ui, sans-serif';
    ctx.fillText('fixed end', X0 - 6, Y0 + 40);
    ctx.fillText('fixed end', X1 + 6, Y0 + 40);

    // Labels
    ctx.textAlign = 'left';
    ctx.fillStyle = '#9ca3af';
    ctx.font = '600 11px system-ui, sans-serif';
    ctx.fillText(`Motion slowed down for your eyes; the real string vibrates ${Math.round(freq)} times a second. Sag is exaggerated.`, 14, H - 40);
  }, []);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      paint((now - last) / 1000);
      last = now;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [paint]);

  const L = useCallback(
    (sk: string, modern: string, dev?: string) =>
      lang === 'modern' ? modern : lang === 'sanskrit' ? (dev ? `${dev} ${sk}` : sk) : `${dev ? `${dev} ` : ''}${sk} · ${modern}`,
    [lang],
  );

  const hm = HARMONICS[n - 1];
  const note = nearestNote(f);
  const v = Math.sqrt(T / MU);
  const lambda = (2 * L_M) / n;
  const needT = tensionFor(n, target.f);
  const unreachable = needT > T_MAX || needT < T_MIN;
  const cents = Math.round(1200 * Math.log2(f / target.f));

  let feedback = '';
  if (round < TARGETS.length) {
    if (inTune || matched[round]) feedback = `In tune ✓ (${cents >= 0 ? '+' : ''}${cents} cents)`;
    else if (off < 0) feedback = `Too slack: a low, droopy wave (${-cents} cents flat). Tighten the string or pick a higher harmonic.`;
    else feedback = `Too tight: a high, sharp tone (${cents} cents sharp). Loosen the string or pick a lower harmonic.`;
  }

  return (
    <div className="vl-sim">
      <BodhiLabAnecdote
        title="Bharata Muni & The Twin-Vīṇā Acoustic Calibration"
        sanskritTitle="भरतमुनेः सारणा-चतुष्टयी & नाद-विज्ञानम्"
        mood="scholar"
        sutra={{
          dev: 'तत्र द्वाविंशतिः श्रुतयः । तत्र श्रुतिनिदर्शनं द्वे वीणे तुल्यप्रमाणतन्त्रीस्तम्भे… ॥',
          iast: 'tatra dvāviṃśatiḥ śrutayaḥ | tatra śrutinidarśanaṃ dve vīṇe tulyapramāṇatantrīstambhe… ||',
          source: 'Nāṭyaśāstra, Adhyāya 28 (भरतमुनिः, c. 200 BCE – 200 CE)',
          meaning: 'There are twenty-two microtonal intervals (śrutis) in the octave. Their empirical demonstration is performed with two vīṇās of identical string dimensions, bridge gauge, and tuning…',
        }}
        anecdote={
          <>
            <p>
              Two thousand years before modern audio oscilloscopes and frequency counters, the sage <strong>Bharata Muni</strong>{' '}
              engineered history’s earliest recorded controlled laboratory acoustic experiment: the <strong>Saraṇā Catuṣṭayī</strong>{' '}
              (the fourfold progressive tuning calibration).
            </p>
            <p>
              To settle the debate on whether the human ear perceives discrete microtonal intervals, Bharata built two identical harps:
              the <em>Acalā-Vīṇā</em> (the immovable experimental control group) and the <em>Calā-Vīṇā</em> (the adjustable test harp).
              By lowering the strings of the test harp through four calculated steps (<em>Saraṇās</em>) and listening for acoustic beating
              and harmonic resonance against the control, Bharata proved empirically that the octave is divided into exactly{' '}
              <strong>22 discernible microtones (Śrutis)</strong>.
            </p>
            <blockquote style={{ borderLeft: '3px solid #8b5cf6', margin: '0.65rem 0', paddingLeft: '0.85rem', fontStyle: 'italic', color: '#6d28d9' }}>
              “Sound (Nāda) is not an arbitrary aesthetic invention; it is mathematical vibration (Spanda) governed by physical proportions.
              When strings vibrate in pure ratios, the mind experiences natural emotional resonance (Rasa).”
            </blockquote>
          </>
        }
        epistemologyAndMethod={
          <>
            Bharata’s twin-vīṇā design was a textbook prototype of the modern scientific method: isolating a single variable against an identical control group.
            Centuries later, in 1210 CE, <strong>Śārṅgadeva</strong> (<em>Saṅgītaratnākara</em>) formulated mathematical permutations of musical rhythms
            (<em>Prastāra</em>), which mapped binary combinations and Fibonacci-like series centuries before European algebra.
          </>
        }
        modernBridge={{
          ancientConcept: 'The 22-Śruti logarithmic microtonal scale, harmonic overtones (Svara-tanmātras), and standing wave nodal geometry.',
          modernScience: 'Acoustic standing waves (f = n/(2L)√(T/μ)), Chladni cymatics nodal patterns, and logarithmic psycho-acoustics (cents / equal temperament).',
          relevanceNote: 'Indian classical music is applied psycho-acoustics: rāgas use mathematically calibrated frequencies to induce specific neural and autonomic states.',
        }}
        societalValue={
          <p>
            In ancient India, sound was revered as <strong>Nāda-Brahman</strong>—the sacred sonic substrate of consciousness.
            Music was cultivated not for superficial commercial noise, but as a communal, therapeutic science (*Gandharva-vidyā*).
            It was deployed in public theatre and temple celebrations to dissolve social anxiety, align collective consciousness,
            and inspire moral courage for societal well-being (*Lokasaṃgraha*).
          </p>
        }
      />

      <CoreIdea>
        Later Indian music, yoga and tantra texts speak of <strong>nāda-brahman</strong>: ultimate reality as sound. Here you
        play with a real vibrating string. Pick a harmonic, tune the tension, and the frequency comes straight from the physics
        of strings. The five harmonic buttons carry the five <em>tanmātras</em> of Sāṅkhya as playful labels.
      </CoreIdea>

      <div className="vl-quest-head">
        <h3 className="vl-quest-title">🎶 {L('Nāda-brahman', 'The Cosmic Sitār', 'नाद-ब्रह्म')}</h3>
        <div className="vl-btn-row" role="radiogroup" aria-label="Language toggle">
          <span className="vl-small">Labels:</span>
          {(['both', 'sanskrit', 'modern'] as LangMode[]).map((m) => (
            <button key={m} type="button" role="radio" aria-checked={lang === m} className={`vl-chip${lang === m ? ' is-on' : ''}`} onClick={() => setLang(m)} data-testid={`nada-lang-${m}`}>
              {m === 'both' ? 'Both' : m === 'sanskrit' ? 'Sanskrit' : 'Modern'}
            </button>
          ))}
        </div>
      </div>

      <div className="vl-sandbox" data-testid="nada-sandbox">
        <ol className="vl-steps vl-steps--3" data-testid="nada-steps">
          {TARGETS.map((tg, i) => (
            <li key={tg.note} className={`${matched[i] ? 'is-done' : ''}${i === round && !matched[i] ? ' is-now' : ''}`}>
              <span className="vl-step-n">{matched[i] ? '✓' : i + 1}</span> {L('Svara', 'Match', 'स्वर')} {tg.note} · {tg.f.toFixed(2)} Hz
            </li>
          ))}
        </ol>

        <div className="vl-orbit-grid">
          <div className="vl-stage-wrap">
            <div className="vl-btn-row" style={{ marginBottom: '0.65rem', justifyContent: 'center' }}>
              <button
                type="button"
                className={`vl-chip${visualMode === 'wave' ? ' is-on' : ''}`}
                onClick={() => setVisualMode('wave')}
                data-testid="nada-mode-wave"
              >
                〰️ Standing Wave (तन्त्री)
              </button>
              <button
                type="button"
                className={`vl-chip${visualMode === 'cymatics' ? ' is-on' : ''}`}
                onClick={() => setVisualMode('cymatics')}
                data-testid="nada-mode-cymatics"
              >
                💠 Chladni Cymatics Mandala (नाद-मण्डलम्)
              </button>
              <button
                type="button"
                className={`vl-chip${visualMode === 'sarana' ? ' is-on' : ''}`}
                onClick={() => setVisualMode('sarana')}
                data-testid="nada-mode-sarana"
              >
                ⚖️ Bharata's Saraṇā Calibration (सारणा-चतुष्टयी)
              </button>
            </div>
            <HudFrame
              accent={visualMode === 'cymatics' ? '#f59e0b' : visualMode === 'sarana' ? '#ec4899' : hm.color}
              tl={<>f {f.toFixed(1)} Hz</>}
              tr={<>{visualMode === 'sarana' ? `Calā: ${saranaF.toFixed(1)} Hz` : `n=${n} · ${lang === 'modern' ? hm.tanEn : `${hm.tanDev} ${hm.tan}`}`}</>}
              bl={<>T {T.toFixed(1)} N · v {v.toFixed(0)} m/s</>}
              br={<>{note.name} {note.cents >= 0 ? '+' : ''}{note.cents}¢</>}
            >
              <canvas ref={canvasRef} className="vl-stage vl-stage--nada" width={W} height={H} data-testid="nada-canvas" role="img" aria-label={`A string vibrating in harmonic ${n} at ${f.toFixed(1)} hertz`} />
            </HudFrame>
            {visualMode === 'sarana' && (
              <div className="vl-panel vl-tradition" style={{ marginTop: '0.75rem', padding: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <b style={{ color: '#facc15', fontSize: '0.95rem' }}>{curSarana.dev} · {curSarana.name}</b>
                  <span className="vl-chip is-on">{curSarana.cents >= 0 ? '0 ¢' : `${curSarana.cents} ¢`} · {curSarana.beatHz} Hz Beats</span>
                </div>
                <p className="vl-small" style={{ margin: '0.4rem 0' }}>{curSarana.desc}</p>
                <div className="vl-btn-row" style={{ gap: '0.35rem', marginTop: '0.4rem' }}>
                  {SARANA_DATA.map((s) => (
                    <button
                      key={s.step}
                      type="button"
                      className={`vl-chip${saranaStep === s.step ? ' is-on' : ''}`}
                      onClick={() => setSaranaStep(s.step)}
                      data-testid={`nada-sarana-${s.step}`}
                    >
                      {s.step === 0 ? '0: Sāmya' : `Saraṇā ${s.step}`}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="vl-leds vl-nada-harmonics" role="radiogroup" aria-label="Harmonic">
              {HARMONICS.map((h) => (
                <LedButton key={h.n} kind="radio" on={n === h.n} color={h.color} onClick={() => pickN(h.n)} testId={`nada-h-${h.n}`}>
                  n={h.n} · {lang === 'modern' ? h.tanEn : `${h.tanDev} ${h.tan}`}
                </LedButton>
              ))}
            </div>
          </div>
          <div className="vl-controls">
            <div className="vl-target" data-testid="nada-target">
              {round < TARGETS.length ? (
                <>
                  <b>🎯 Target:</b> {target.note} = {target.f.toFixed(2)} Hz
                  <div className="vl-small">{target.hint}</div>
                </>
              ) : (
                <b>All three notes matched.</b>
              )}
            </div>
            <GlowSlider
              label={<>🪢 Tension T</>}
              value={T}
              min={T_MIN}
              max={T_MAX}
              step={0.1}
              onChange={changeT}
              valueText={`${T.toFixed(1)} N`}
              color={T > 50 ? '#f87171' : hm.color}
              ariaLabel="String tension in newtons"
              testId="nada-tension"
            />
            <div className="vl-leds">
              <LedButton kind="action" onClick={() => changeT(T - 0.1)} testId="nada-tension-down">− 0.1 N</LedButton>
              <LedButton kind="action" onClick={() => changeT(T + 0.1)} testId="nada-tension-up">+ 0.1 N</LedButton>
            </div>
            <div className="vl-dials">
              <DialKnob label={<>〰️ Amplitude</>} ariaLabel="Amplitude in percent" value={amp} min={0} max={100} step={1} onChange={setAmp} format={(x) => `${Math.round(x)}%`} color={hm.color} testId="nada-amp" />
              <div className="vl-leds" style={{ flexDirection: 'column', justifyContent: 'center' }}>
                <LedButton kind="toggle" on={playing} color="#4ade80" onClick={() => setPlaying((x) => !x)} testId="nada-play">{playing ? '⏸ Pause' : '▶ Play'}</LedButton>
                <LedButton kind="action" color={hm.color} onClick={pluck} testId="nada-pluck">🪕 Pluck</LedButton>
                <LedButton kind="toggle" on={sound} color="#facc15" onClick={toggleSound} testId="nada-sound">{sound ? '🔊 Sound on (mute)' : '🔇 Sound off'}</LedButton>
              </div>
            </div>
            <div className="vl-readout-grid" data-testid="nada-readouts">
              <span>{L('Tanmātra', 'Subtle element', 'तन्मात्र')}</span><b data-testid="nada-tanmatra">{L(hm.tan, hm.tanEn, hm.tanDev)}</b>
              <span>{L('Mahābhūta', 'Great element', 'महाभूत')}</span><b data-testid="nada-bhuta">{L(hm.bhuta, hm.bhutaEn, hm.bhutaDev)}</b>
              <span>Frequency f</span><b data-testid="nada-freq">{f.toFixed(1)} Hz</b>
              <span>Nearest note</span><b>{note.name} {note.cents >= 0 ? '+' : ''}{note.cents} cents</b>
              <span>Wave speed √(T/μ)</span><b>{v.toFixed(0)} m/s</b>
              <span>Wavelength 2L/n</span><b>{lambda.toFixed(2)} m</b>
            </div>
            {round < TARGETS.length && (
              <p className={`vl-msg${inTune || matched[round] ? ' is-ok' : ''}`} data-testid="nada-feedback" role="status">{feedback}</p>
            )}
            {round < TARGETS.length && !matched[round] && unreachable && (
              <p className="vl-small">At n = {n}, {target.note} would need about {needT.toFixed(0)} N, outside this string’s {T_MIN}–{T_MAX} N range. Try another harmonic.</p>
            )}
            {T > 50 && <p className="vl-small">Very tight! Real strings can snap when over-tightened.</p>}
            {round < TARGETS.length && matched[round] && (
              <button type="button" className="vl-btn vl-btn--gold" onClick={nextRound} data-testid="nada-next">{round < TARGETS.length - 1 ? 'Next note →' : 'Finish →'}</button>
            )}
            <p className="vl-small">
              f = n/(2L)·√(T/μ), the rule for an ideal string fixed at both ends (Mersenne’s laws, 1600s). Nominal string: L = 0.90 m,
              μ = 0.55 g/m (about a 0.3 mm steel wire). A real pluck sounds many harmonics at once; here you pick one at a time.
            </p>
          </div>
        </div>

        {allDone && round >= TARGETS.length - 1 && (
          <div className="vl-sama is-ok" role="status" data-testid="nada-win">
            🌟 The Cosmic Sitār is in tune: three notes matched by tension and harmonic.
            <button type="button" className="vl-btn vl-btn--ghost" onClick={restartQuest} style={{ marginLeft: '0.6rem' }}>↺ Play again</button>
          </div>
        )}
      </div>
      <div className="vl-grid-2">
        <section className="vl-panel vl-tradition" aria-label="Nāda-brahman and the praṇava">
          <h3 className="vl-panel-title">📜 Nāda-brahman and oṃ</h3>
          <p>
            The idea of <strong lang="sa">नादब्रह्म nāda-brahman</strong>, ultimate reality as sound, is found in later yoga,
            music and tantra texts. Śārṅgadeva’s <em>Saṅgīta-ratnākara</em> (13th century) praises nāda in its section on sound:
          </p>
          <figure className="vl-quote">
            <blockquote lang="sa">चैतन्यं सर्वभूतानां विवृत्तं जगदात्मना । नादब्रह्म तदानन्दम् अद्वितीयमुपास्महे ॥</blockquote>
            <div className="vl-term-iast">caitanyaṃ sarvabhūtānāṃ vivṛttaṃ jagadātmanā | nādabrahma tad ānandam advitīyam upāsmahe ||</div>
            <figcaption>“We worship nāda-brahman, the bliss without a second: the consciousness in all beings, unfolded as the world.”</figcaption>
          </figure>
          <p>
            The same text names two kinds of nāda: <strong lang="sa">आहत āhata</strong>, struck sound (a string, a drum, the
            voice), and <strong lang="sa">अनाहत anāhata</strong>, unstruck sound, described as heard inwardly. This sitār string
            is āhata.
          </p>
          <p>
            Much older, the Upaniṣads treat <strong lang="sa">प्रणव praṇava</strong>, the syllable oṃ, as the primal sound. The
            Māṇḍūkya Upaniṣad opens:
          </p>
          <figure className="vl-quote">
            <blockquote lang="sa">ओमित्येतदक्षरमिदं सर्वम्</blockquote>
            <div className="vl-term-iast">om ity etad akṣaram idaṃ sarvam</div>
            <figcaption>“Oṃ: this syllable is all this.” It goes on to read oṃ as a, u and m, with a silent fourth beyond them.</figcaption>
          </figure>
        </section>
        <section className="vl-panel vl-tradition vl-tradition--spanda" aria-label="Tanmātras and mahābhūtas in Sāṅkhya">
          <h3 className="vl-panel-title">🌿 Tanmātras and mahābhūtas · Sāṅkhya</h3>
          <p>
            In Sāṅkhya, the five <strong>tanmātras</strong> (subtle elements) give rise to the five <strong>mahābhūtas</strong>{' '}
            (great elements). This is the standard pairing:
          </p>
          <table className="vl-table" data-testid="nada-pairs">
            <thead><tr><th>Game button</th><th>Tanmātra</th><th>Mahābhūta</th></tr></thead>
            <tbody>
              {HARMONICS.map((h) => (
                <tr key={h.n} className={h.n === n ? 'is-on' : ''}>
                  <td>n = {h.n}</td>
                  <td><span lang="sa">{h.tanDev}</span> {h.tan} · {h.tanEn}</td>
                  <td><span lang="sa">{h.bhutaDev}</span> {h.bhuta} · {h.bhutaEn}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="vl-small">
            The order follows the familiar sequence ākāśa → vāyu → tejas (agni) → ap → pṛthivī, also given in the Taittirīya
            Upaniṣad (2.1). Tying the pairs to harmonic numbers 1–5 is only this game’s labelling, not something the texts say.
          </p>
        </section>
      </div>

      <section className="vl-panel vl-modern" aria-label="Modern comparison for fun">
        <h3 className="vl-panel-title">🔬 Modern comparison (for fun) <span className="vl-panel-hint">not what the texts say</span></h3>
        <ul className="vl-list">
          <li><b>String theory</b> is a modern, <b>unproven</b> mathematical idea in which the smallest particles might be tiny vibrating strings, with each way of vibrating showing up as a different particle. No experiment has confirmed it.</li>
          <li>Nāda-brahman (“reality as sound”) ↔ string theory (“particles might be vibrations”).</li>
          <li>The five tanmātras (what we can sense) ↔ the observable properties physicists measure.</li>
          <li>Many lokas (worlds) ↔ the extra dimensions that string theory needs.</li>
          <li><b>The texts do not describe strings, quarks or Calabi-Yau spaces</b>, and they did not anticipate modern physics. These are rhymes between ideas, made for fun.</li>
          <li>Just for fun: a slack, droopy string feels a bit tāmasic and an over-tight one a bit rājasic. That is a joke, not physics.</li>
        </ul>
      </section>

      <div className="vl-grid-2">
        <TermPanel terms={TERMS} />
        <ChallengeList items={CHALLENGES} />
      </div>
    </div>
  );
};

export default NadaBrahman;
