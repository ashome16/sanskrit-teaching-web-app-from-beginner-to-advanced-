import React, { useEffect, useRef, useState } from 'react';
import { soundEffects } from '../../utils/soundEffects';

/**
 * ākāśa-sūtra · board action to dialogue
 * A strictly sequential, single-path board that follows the 16-step playtest sheet.
 * Only the current step's action is enabled; the next step unlocks once the current
 * step's action and its dialogue lines are complete. No side paths.
 *
 * Layout rule: every piece has its own reserved zone inside a fixed 360×240 viewBox
 * (four corners + right-middle parking bay for tryaṇukas, a central work area for the
 * piece being built), and the SVG scales uniformly, so nothing overlaps on any screen.
 */

type El = 'prthivi' | 'ap' | 'tejas' | 'vayu';
type Speaker = 'Bodhi' | 'Kaṇāda' | 'Pariśeṣa';
interface Line { speaker: Speaker; text: string }
const L = (speaker: Speaker, text: string): Line => ({ speaker, text });

const EL_ORDER: El[] = ['prthivi', 'ap', 'tejas', 'vayu'];
const EL_INFO: Record<El, { name: string; english: string; color: string; corner: [number, number]; guna: string }> = {
  prthivi: { name: 'pṛthivī', english: 'earth', color: '#d97706', corner: [40, 40], guna: 'gandha · smell' },
  ap: { name: 'ap', english: 'water', color: '#38bdf8', corner: [320, 40], guna: 'rasa · taste' },
  tejas: { name: 'tejas', english: 'fire', color: '#f97316', corner: [40, 196], guna: 'rūpa · form' },
  vayu: { name: 'vāyu', english: 'air', color: '#a3e635', corner: [320, 196], guna: 'sparśa · touch' },
};
const EXTRA_AP_BAY: [number, number] = [320, 118];
const PAIR_X = [130, 180, 230];
const KARMA_COLS = [108, 152, 196, 240];
const KARMA_ROWS = [50, 120, 190];
const RING: [number, number] = [3, 0];
const SCALES = [0.6, 0.8, 1, 1.2];

const STEPS: { title: string; action: string }[] = [
  { title: 'Enter the board', action: 'Press Enter the board.' },
  { title: 'Place one paramāṇu', action: 'Tap pṛthivī in the tray once.' },
  { title: 'Place a second pṛthivī', action: 'Tap pṛthivī a second time. Two numbered aṇu appear, hold, then fuse into a dvyaṇuka.' },
  { title: 'Build a pṛthivī tryaṇuka', action: 'Tap pṛthivī 4 more times. Pairs fuse into dvyaṇukas; three dvyaṇukas fuse into a tryaṇuka.' },
  { title: 'Build ap, tejas, vāyu tryaṇukas', action: 'Tap ap, tejas and vāyu 6 times each (or press Quick build).' },
  { title: 'Build the clay pot', action: 'Press Build clay pot.' },
  { title: 'See Out of Balance', action: 'Press Pot: too much ap, then press Build clay pot.' },
  { title: 'Try a wrong role', action: 'Press Bake with ap.' },
  { title: 'Build a flame', action: 'Press Build flame.' },
  { title: 'Karma: move the vāyu', action: 'Press Karma. Steer the vāyu into the green ring with the motion buttons, then contract it twice.' },
  { title: 'Sāmānya (what is shared)', action: 'Press Sāmānya and answer inside the board.' },
  { title: 'Samavāya (what cannot part)', action: 'Press Samavāya and answer both questions.' },
  { title: 'Abhāva (what is not)', action: 'Press Abhāva and name the four absences.' },
  { title: 'Dissolve (vibhāga)', action: 'Press Dissolve and watch the counter at the top.' },
  { title: 'What remains?', action: 'Press What remains?' },
  { title: 'Tap the board', action: 'Tap anywhere on the board.' },
];

const FORM_LINES: Record<El, Line[]> = {
  prthivi: [L('Bodhi', 'It is formed. How do I know this one is earth?'), L('Kaṇāda', 'Ask the nose. Earth is known by smell (gandha), the quality only it has.')],
  ap: [L('Bodhi', 'And this one? Is it water?'), L('Kaṇāda', 'Ask the tongue. Water is known by taste (rasa). It also carries form and touch.')],
  tejas: [L('Bodhi', 'This one glows. Is it fire?'), L('Kaṇāda', 'Ask the eye. Fire is known by form (rūpa). It also carries touch.')],
  vayu: [L('Bodhi', 'This one I cannot see at all.'), L('Kaṇāda', 'Ask the skin. Air is known by touch (sparśa), and by that alone.')],
};

interface Question { id: string; prompt: string; options: string[]; correct: string; right: Line[]; hint: string }
const ABSENCES = ['prāgabhāva', 'pradhvaṃsābhāva', 'anyonyābhāva', 'atyantābhāva'];
const QUESTIONS: Record<number, Question[]> = {
  11: [{
    id: 'potness', prompt: 'Two pots of different sizes. What do they share?', options: ['Potness', 'Their size', 'Their weight'], correct: 'Potness',
    right: [L('Bodhi', 'These two pots are not the same pot. What do they share?'), L('Kaṇāda', 'Potness. Sameness is real, even when no two things are identical.')],
    hint: 'Measures differ from pot to pot. Look for what stays when every measure changes.',
  }],
  12: [
    {
      id: 'book', prompt: 'A book on a table: joined, or inseparable?', options: ['Joined (saṃyoga)', 'Inseparable (samavāya)'], correct: 'Joined (saṃyoga)',
      right: [L('Bodhi', 'The book sits on the table. Is it joined or inseparable?'), L('Kaṇāda', 'Two things holding hands. Lift the book and both remain.')],
      hint: 'Lift the book away. Does either one cease to be?',
    },
    {
      id: 'red', prompt: 'Red in a red cloth: joined, or inseparable?', options: ['Joined (saṃyoga)', 'Inseparable (samavāya)'], correct: 'Inseparable (samavāya)',
      right: [L('Bodhi', 'I cannot pull the red out and keep the cloth. Why?'), L('Kaṇāda', 'One is two things holding hands. The other is one thing wearing its own face.')],
      hint: 'Try to take the red and leave the cloth. Can you?',
    },
  ],
  13: [
    { id: 'notyet', prompt: 'The pot is not yet made. Which absence?', options: ABSENCES, correct: 'prāgabhāva', right: [L('Bodhi', 'The pot is not made yet. What kind of absence is that?'), L('Kaṇāda', 'Before it was made: prāgabhāva.')], hint: 'Think about when. Has the pot existed yet?' },
    { id: 'smashed', prompt: 'The pot is smashed. Which absence?', options: ABSENCES, correct: 'pradhvaṃsābhāva', right: [L('Bodhi', 'The pot is shards now. What kind of absence?'), L('Kaṇāda', 'After destruction: pradhvaṃsābhāva.')], hint: 'Did the pot ever exist? Then ask what happened to it.' },
    { id: 'cloth', prompt: 'The pot is not a cloth. Which absence?', options: ABSENCES, correct: 'anyonyābhāva', right: [L('Bodhi', 'The pot is not the cloth. Is that an absence too?'), L('Kaṇāda', 'Mutual difference: anyonyābhāva.')], hint: 'Neither is made or destroyed here. They simply differ.' },
    { id: 'skyflower', prompt: 'A flower in the sky. Which absence?', options: ABSENCES, correct: 'atyantābhāva', right: [L('Bodhi', 'And a flower in the sky?'), L('Kaṇāda', 'Never at any time: atyantābhāva.')], hint: 'It was never made and never destroyed. At no time does it exist.' },
  ],
};
const QUESTION_ART: Record<string, string> = { book: '📕', red: '🟥', notyet: '⬚', smashed: '💥', cloth: '🏺≠🧣', skyflower: '🌼☁️' };

const STARS = Array.from({ length: 46 }, (_, i) => ({ x: (i * 97.3) % 360, y: (i * 53.7 + 11) % 240, r: i % 5 === 0 ? 0.9 : 0.5 }));
const wait = (ms: number) => new Promise<void>((res) => setTimeout(res, ms));
const lineMs = (t: string) => Math.min(5200, 1100 + t.split(/\s+/).length * 260);

interface Result { icon: string; title: string; tone: 'good' | 'bad' }
interface Karma { col: number; row: number; scale: number; contractions: number }

const Tryanuka: React.FC<{ el: El; x: number; y: number; s?: number; label?: boolean; dim?: boolean }> = ({ el, x, y, s = 1, label, dim }) => {
  const c = EL_INFO[el].color;
  return (
    <g style={{ transform: `translate(${x}px, ${y}px) scale(${s})`, transition: 'transform 0.7s ease', opacity: dim ? 0.35 : 1 }}>
      {[-90, 30, 150].map((a) => {
        const r = (a * Math.PI) / 180;
        const cx = Math.cos(r) * 9;
        const cy = Math.sin(r) * 9;
        return (
          <g key={a}>
            <circle cx={cx - 3.4} cy={cy} r={3.4} fill={c} stroke="#0f172a" strokeWidth={0.6} />
            <circle cx={cx + 3.4} cy={cy} r={3.4} fill={c} stroke="#0f172a" strokeWidth={0.6} />
          </g>
        );
      })}
      {label && (
        <text y={28} textAnchor="middle" fontSize={8.5} fill="#e2e8f0">{EL_INFO[el].name}</text>
      )}
    </g>
  );
};

export const AkasaSequenceBoard: React.FC = () => {
  const [step, setStep] = useState(1);
  const [stepDone, setStepDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [log, setLog] = useState<(Line & { step: number })[]>([]);
  const [built, setBuilt] = useState<Record<El, boolean>>({ prthivi: false, ap: false, tejas: false, vayu: false });
  const [forming, setForming] = useState<{ el: El; taps: number; fused: number; bloom: boolean } | null>(null);
  const [lit, setLit] = useState<string[]>([]);
  const [extraAp, setExtraAp] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [subAction, setSubAction] = useState(0);
  const [karma, setKarma] = useState<Karma | null>(null);
  const [qIdx, setQIdx] = useState(-1);
  const [wrongPick, setWrongPick] = useState<string | null>(null);
  const [dissolved, setDissolved] = useState<number | null>(null);
  const [cleared, setCleared] = useState(false);
  const [glow, setGlow] = useState(false);
  const [entered, setEntered] = useState(false);
  const [flash, setFlash] = useState(0);
  const [ripple, setRipple] = useState(0);
  const gen = useRef(0);
  const logRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [log]);

  const builtCount = EL_ORDER.filter((e) => built[e]).length;
  const anuCount = dissolved ?? (cleared ? 0 : builtCount * 6 + (extraAp ? 6 : 0) + (forming?.taps ?? 0));

  const alive = (g: number) => g === gen.current;
  const say = async (lines: Line[], g: number) => {
    for (const ln of lines) {
      if (!alive(g)) return;
      setLog((p) => [...p, { ...ln, step }]);
      await wait(lineMs(ln.text));
    }
  };
  const finish = (g: number) => { if (alive(g)) { setStepDone(true); setBusy(false); } };
  const run = (fn: (g: number) => Promise<void>) => {
    if (busy || stepDone) return;
    const g = gen.current;
    setBusy(true);
    void fn(g);
  };

  const reset = () => {
    gen.current += 1;
    setStep(1); setStepDone(false); setBusy(false); setLog([]);
    setBuilt({ prthivi: false, ap: false, tejas: false, vayu: false });
    setForming(null); setLit([]); setExtraAp(false); setResult(null); setSubAction(0);
    setKarma(null); setQIdx(-1); setWrongPick(null); setDissolved(null); setCleared(false); setGlow(false); setEntered(false);
  };

  const nextStep = () => {
    if (!stepDone || step >= 16) return;
    setStep(step + 1); setStepDone(false); setSubAction(0); setQIdx(-1); setWrongPick(null);
    if (step + 1 === 10 || step + 1 === 11) setResult(null);
    soundEffects.playStrokeChime();
  };

  // ---------- building ----------
  const currentEl: El | null = step === 2 || step === 3 || step === 4 ? 'prthivi'
    : step === 5 ? (EL_ORDER.slice(1).find((e) => !built[e]) ?? null) : null;

  const formTryanuka = async (el: El, g: number) => {
    setForming((f) => (f ? { ...f, bloom: true } : f));
    soundEffects.playSuccessDing();
    await wait(1100);
    if (!alive(g)) return;
    setForming(null);
    setBuilt((b) => ({ ...b, [el]: true }));
    setLit((l) => [...l, el]);
    setFlash((n) => n + 1);
    await wait(500);
  };

  /** One tap on the tray; returns after any fusion it triggers. */
  const tapOnce = async (el: El, g: number, quick = false) => {
    const taps = (forming && forming.el === el ? forming.taps : 0) + 1;
    const fusedBefore = forming && forming.el === el ? forming.fused : 0;
    setForming({ el, taps, fused: fusedBefore, bloom: false });
    soundEffects.playElementSummon(el);
    if (taps % 2 === 0) {
      await wait(quick ? 260 : taps === 2 && step === 3 ? 0 : 650);
      if (!alive(g)) return { taps, fused: fusedBefore };
      return { taps, fused: fusedBefore };
    }
    return { taps, fused: fusedBefore };
  };
  const fusePair = (el: El, taps: number, fused: number) => {
    setForming({ el, taps, fused: fused + 1, bloom: false });
    setFlash((n) => n + 1);
    soundEffects.playPuzzleSnap();
  };

  const onTray = (el: El) => run(async (g) => {
    if (el !== currentEl) { setBusy(false); return; }
    const { taps, fused } = await tapOnce(el, g);
    if (!alive(g)) return;
    if (step === 2) { await say([L('Bodhi', 'A single speck. Is this the smallest thing, Gurudeva?'), L('Kaṇāda', 'Paramāṇu: no parts, never made, never destroyed. Everything else is built from it.')], g); finish(g); return; }
    if (step === 3) {
      await say([L('Pariśeṣa', 'These two look identical. How do you know they are different?'), L('Bodhi', 'He has a point, Gurudeva.'), L('Kaṇāda', 'If nothing separated them, they would be one aṇu. That separateness is viśeṣa.')], g);
      if (!alive(g)) return;
      fusePair(el, taps, fused);
      await wait(700);
      await say([L('Bodhi', 'They joined. Was anything made, Gurudeva?'), L('Kaṇāda', 'Only joined. Count the aṇu: the number has not changed.')], g);
      finish(g); return;
    }
    if (taps % 2 === 0) fusePair(el, taps, fused);
    if (taps < 6) { setBusy(false); return; }
    await wait(600);
    await formTryanuka(el, g);
    await say(FORM_LINES[el], g);
    if (!alive(g)) return;
    if (step === 4) { finish(g); return; }
    const remaining = EL_ORDER.slice(1).filter((e) => e !== el && !built[e]);
    if (remaining.length === 0) await allFour(g); else setBusy(false);
  });

  const allFour = async (g: number) => {
    setLit((l) => [...l, 'akasa']);
    await say([L('Bodhi', 'And ākāśa, Gurudeva? Where is it?'), L('Kaṇāda', 'Known by sound (śabda). You can hear the board, but never hold it.')], g);
    finish(g);
  };

  const quickBuild = () => run(async (g) => {
    const todo = EL_ORDER.slice(1).filter((e) => !built[e]);
    for (const el of todo) {
      let taps = forming && forming.el === el ? forming.taps : 0;
      let fused = forming && forming.el === el ? forming.fused : 0;
      while (taps < 6) {
        taps += 1;
        setForming({ el, taps, fused, bloom: false });
        soundEffects.playElementSummon(el);
        await wait(280);
        if (!alive(g)) return;
        if (taps % 2 === 0) { fused += 1; fusePair(el, taps, fused - 1); await wait(240); }
      }
      await formTryanuka(el, g);
      await say(FORM_LINES[el], g);
      if (!alive(g)) return;
    }
    await allFour(g);
  });

  // ---------- recipes ----------
  const recipe = (kind: 'pot' | 'mud' | 'bake' | 'flame') => run(async (g) => {
    if (kind === 'pot') {
      setResult({ icon: '🏺', title: 'In Harmony', tone: 'good' }); soundEffects.playCelebrationChime();
      await say([L('Bodhi', 'It holds! The pot is earth, so why did it need the others?'), L('Kaṇāda', 'Earth is the body. Water binds, fire hardens, air dries.')], g);
    } else if (kind === 'mud') {
      setResult({ icon: '🟫', title: 'Out of Balance', tone: 'bad' }); soundEffects.playCartoonBoing();
      await say([L('Bodhi', 'Why did it turn to mud? Water is part of the pot too!'), L('Kaṇāda', 'Water helps. It does not lead. A helper who takes over is a puddle.')], g);
    } else if (kind === 'bake') {
      setResult({ icon: '💧', title: 'Wrong Role', tone: 'bad' }); soundEffects.playSteamHiss();
      await say([L('Bodhi', 'Water cannot bake, can it?'), L('Kaṇāda', 'Right element, wrong work. Fire bakes. Water binds.')], g);
    } else {
      setResult({ icon: '🔥', title: 'In Harmony', tone: 'good' }); soundEffects.playCelebrationChime();
      await say([L('Bodhi', 'It burns steadily. Do fire and air work together?'), L('Kaṇāda', 'Fire leads, air feeds it. Fire alone dies. Give it air.')], g);
    }
    finish(g);
  });
  const addExtraAp = () => {
    if (busy || stepDone || subAction !== 0) return;
    setExtraAp(true); setSubAction(1); setFlash((n) => n + 1); soundEffects.playElementSummon('ap');
  };

  // ---------- karma ----------
  const startKarma = () => run(async (g) => {
    setResult(null);
    setKarma({ col: 0, row: 2, scale: 2, contractions: 0 });
    await say([L('Bodhi', 'What moves a thing, Gurudeva?'), L('Kaṇāda', 'Five motions only: up, down, contract, expand, go.')], g);
    if (alive(g)) { setSubAction(1); setBusy(false); }
  });
  const move = (m: 'up' | 'down' | 'left' | 'right' | 'contract' | 'expand') => {
    if (!karma || busy || stepDone || subAction !== 1) return;
    const k = { ...karma };
    if (m === 'up') k.row = Math.max(0, k.row - 1);
    if (m === 'down') k.row = Math.min(2, k.row + 1);
    if (m === 'left') k.col = Math.max(0, k.col - 1);
    if (m === 'right') k.col = Math.min(3, k.col + 1);
    if (m === 'contract' && k.scale > 0) { k.scale -= 1; k.contractions += 1; }
    if (m === 'expand' && k.scale < 3) k.scale += 1;
    setKarma(k); setRipple((n) => n + 1); soundEffects.playSwara(330 + k.col * 40 + (2 - k.row) * 30, 0.25);
    if (k.col === RING[0] && k.row === RING[1] && k.scale === 0) {
      const g = gen.current;
      setBusy(true);
      void (async () => {
        await wait(500);
        await say([L('Bodhi', 'It arrived. Every move left a ripple.'), L('Kaṇāda', 'Ether hears everything. Five motions, and the world moves by them.')], g);
        if (!alive(g)) return;
        setKarma(null);
        finish(g);
      })();
    }
  };

  // ---------- questions ----------
  const openQuestions = () => run(async (g) => {
    if (step === 13) {
      await say([L('Pariśeṣa', 'There is nothing here. Why stare at an empty slot?'), L('Kaṇāda', '"No pot here" is something I know. Absence is known, so it is real in its own way.')], g);
    }
    if (alive(g)) { setQIdx(0); setBusy(false); }
  });
  const answer = (opt: string) => {
    const qs = QUESTIONS[step];
    if (!qs || qIdx < 0 || busy || stepDone) return;
    const q = qs[qIdx];
    const g = gen.current;
    setBusy(true);
    void (async () => {
      if (opt === q.correct) {
        setWrongPick(null); soundEffects.playSuccessDing();
        await say(q.right, g);
        if (!alive(g)) return;
        if (qIdx + 1 < qs.length) { setQIdx(qIdx + 1); setBusy(false); return; }
        setQIdx(qs.length);
        if (step === 13) await say([L('Pariśeṣa', 'I see. Doubt is how we find out.')], g);
        finish(g);
      } else {
        setWrongPick(opt); soundEffects.playEncouragementDing();
        await say([L('Bodhi', `Is it ${opt}?`), L('Kaṇāda', q.hint)], g);
        if (alive(g)) setBusy(false);
      }
    })();
  };

  // ---------- ending ----------
  const dissolve = () => run(async (g) => {
    const before = anuCount;
    setDissolved(before); setFlash((n) => n + 1); soundEffects.playElectricZap();
    await wait(900);
    await say([L('Bodhi', 'Everything is apart. Was anything lost?'), L('Kaṇāda', `Count the aṇu: ${before} before, ${before} now.`), L('Bodhi', 'The same number. So the same aṇu can become anything?'), L('Kaṇāda', 'Each keeps its own kind. What it becomes depends on its company.')], g);
    finish(g);
  });
  const whatRemains = () => run(async (g) => {
    setCleared(true); setDissolved(null); setResult(null);
    await say([L('Kaṇāda', 'Bodhi, what remains?'), L('Bodhi', 'You tell him. What was always here? Tap the board.')], g);
    finish(g);
  });
  const onBoardTap = () => {
    if (step !== 16 || stepDone) return;
    run(async (g) => {
      setGlow(true); soundEffects.playTrasarenuChime();
      await say([L('Kaṇāda', 'Each was known by its own. None made anything alone. All of it changed, and all of it happened in this.'), L('Bodhi', 'Ākāśa. The silence that makes every sound possible.')], g);
      finish(g);
    });
  };
  const enter = () => run(async (g) => {
    setEntered(true); setRipple((n) => n + 1); soundEffects.playTrasarenuChime();
    await say([L('Bodhi', 'Gurudeva, there is nothing here. Why do we begin with nothing?'), L('Kaṇāda', 'It is the one thing you will never build. Everything else needs somewhere to stand.')], g);
    finish(g);
  });

  // ---------- rendering helpers ----------
  const dissolveDots = () => {
    if (dissolved == null) return null;
    const kinds: El[] = [];
    EL_ORDER.forEach((e) => { if (built[e]) for (let i = 0; i < 6; i += 1) kinds.push(e); });
    if (extraAp) for (let i = 0; i < 6; i += 1) kinds.push('ap');
    while (kinds.length < dissolved) kinds.push('prthivi');
    return kinds.map((e, i) => (
      <circle key={i} cx={180 + ((i % 10) - 4.5) * 16} cy={96 + Math.floor(i / 10) * 24} r={5} fill={EL_INFO[e].color} stroke="#0f172a" strokeWidth={0.6} className="aseq-pop" />
    ));
  };

  const formingPieces = () => {
    if (!forming) return null;
    const { el, taps, fused, bloom } = forming;
    const c = EL_INFO[el].color;
    if (bloom) return <Tryanuka el={el} x={180} y={120} s={2} />;
    const out: React.ReactNode[] = [];
    for (let p = 0; p < 3; p += 1) {
      const n1 = p * 2 + 1;
      const n2 = p * 2 + 2;
      const isFused = p < fused;
      const x = PAIR_X[p];
      if (taps >= n1) {
        const y1 = isFused ? 111 : 102;
        out.push(<g key={`a${n1}`}><circle cx={x} cy={y1} r={9} fill={c} stroke="#0f172a" strokeWidth={0.8} style={{ transition: 'cy 0.5s' }} /><text x={x} y={y1 + 3} textAnchor="middle" fontSize={8.5} fill="#0f172a" fontWeight={700}>{n1}</text></g>);
      }
      if (taps >= n2) {
        const y2 = isFused ? 129 : 138;
        out.push(<g key={`a${n2}`}><circle cx={x} cy={y2} r={9} fill={c} stroke="#0f172a" strokeWidth={0.8} style={{ transition: 'cy 0.5s' }} /><text x={x} y={y2 + 3} textAnchor="middle" fontSize={8.5} fill="#0f172a" fontWeight={700}>{n2}</text></g>);
      }
      if (isFused) out.push(<text key={`d${p}`} x={x} y={160} textAnchor="middle" fontSize={8} fill="#fde68a">dvyaṇuka</text>);
    }
    return out;
  };

  const centerArt = () => {
    if (karma || forming || dissolved != null || cleared) return null;
    if (result && step >= 6 && step <= 9) {
      return (
        <g className="aseq-pop">
          <text x={180} y={122} textAnchor="middle" fontSize={44}>{result.icon}</text>
          <text x={180} y={160} textAnchor="middle" fontSize={13} fontWeight={700} fill={result.tone === 'good' ? '#86efac' : '#fca5a5'}>{result.title}</text>
        </g>
      );
    }
    if (step === 11) return <g><text x={150} y={132} textAnchor="middle" fontSize={26}>🏺</text><text x={212} y={136} textAnchor="middle" fontSize={44}>🏺</text></g>;
    if (step === 12 || step === 13) {
      const q = QUESTIONS[step][Math.max(0, Math.min(qIdx, QUESTIONS[step].length - 1))];
      if (step === 13 && qIdx < 0) return <rect x={150} y={90} width={60} height={60} rx={6} fill="none" stroke="#94a3b8" strokeDasharray="5 4" />;
      return (
        <g>
          {step === 13 && <rect x={150} y={90} width={60} height={60} rx={6} fill="none" stroke="#94a3b8" strokeDasharray="5 4" />}
          <text x={180} y={step === 13 ? 128 : 134} textAnchor="middle" fontSize={step === 13 ? 18 : 40}>{qIdx >= 0 ? QUESTION_ART[q.id] : step === 12 ? '📕 🟥' : ''}</text>
        </g>
      );
    }
    return null;
  };

  const actionArea = () => {
    if (stepDone) return null;
    const B = (label: string, onClick: () => void, enabled = true, primary = true) => (
      <button type="button" className={`aseq-btn${primary ? ' is-primary' : ''}`} disabled={busy || !enabled} onClick={onClick}>{label}</button>
    );
    switch (step) {
      case 1: return B('Enter the board', enter);
      case 2: case 3: case 4: case 5: {
        return (
          <div className="aseq-tray" role="group" aria-label="Element tray">
            {EL_ORDER.map((el) => (
              <button key={el} type="button" className={`aseq-tray-btn${el === currentEl ? ' is-active' : ''}`} style={{ borderColor: EL_INFO[el].color }} disabled={busy || el !== currentEl} onClick={() => onTray(el)}>
                <span className="aseq-dot" style={{ background: EL_INFO[el].color }} />{EL_INFO[el].name}
                {el === currentEl && step >= 4 && <small> · {(forming?.el === el ? forming.taps : 0)}/6</small>}
              </button>
            ))}
            {step === 5 && B('Quick build', quickBuild, true, false)}
          </div>
        );
      }
      case 6: return B('Build clay pot', () => recipe('pot'));
      case 7: return <div className="aseq-row">{B('Pot: too much ap', addExtraAp, subAction === 0)}{B('Build clay pot', () => recipe('mud'), subAction === 1)}</div>;
      case 8: return B('Bake with ap', () => recipe('bake'));
      case 9: return B('Build flame', () => recipe('flame'));
      case 10:
        if (subAction === 0) return B('Karma', startKarma);
        return (
          <div className="aseq-motions" role="group" aria-label="Five motions (karma)">
            {B('↑ Up · utkṣepaṇa', () => move('up'), true, false)}
            {B('↓ Down · avakṣepaṇa', () => move('down'), true, false)}
            {B('← Go · gamana', () => move('left'), true, false)}
            {B('→ Go · gamana', () => move('right'), true, false)}
            {B('⊙ Contract · ākuñcana', () => move('contract'), true, false)}
            {B('◎ Expand · prasāraṇa', () => move('expand'), true, false)}
          </div>
        );
      case 11: case 12: case 13:
        if (qIdx < 0) return B(step === 11 ? 'Sāmānya' : step === 12 ? 'Samavāya' : 'Abhāva', openQuestions);
        return null;
      case 14: return B('Dissolve', dissolve);
      case 15: return B('What remains?', whatRemains);
      case 16: return <span className="aseq-hint">Tap anywhere on the board.</span>;
      default: return null;
    }
  };

  const qs = QUESTIONS[step];
  const activeQ = qs && qIdx >= 0 && qIdx < qs.length ? qs[qIdx] : null;
  const showTryanukas = dissolved == null && !cleared;

  return (
    <section className="aseq" aria-label="ākāśa-sūtra board">
      <style>{CSS}</style>
      <header className="aseq-head">
        <h3>ākāśa-sūtra · one path, sixteen steps</h3>
        <p>Everything you build here is made of <strong>aṇu (indivisible matter)</strong>, the paramāṇu. Two aṇu make a dvyaṇuka; a tryaṇuka is three dvyaṇukas (six aṇu).</p>
      </header>

      <ol className="aseq-steps" aria-label="Steps">
        {STEPS.map((s, i) => {
          const n = i + 1;
          const state = n < step || (n === step && stepDone) ? 'done' : n === step ? 'current' : 'locked';
          return <li key={n} className={`aseq-pill is-${state}`} title={s.title}>{state === 'done' ? '✓' : state === 'locked' ? '🔒' : n}</li>;
        })}
      </ol>

      <div className="aseq-current">
        <strong>Step {step} of 16 · {STEPS[step - 1].title}</strong>
        <span>{STEPS[step - 1].action}</span>
      </div>

      <div className={`aseq-board${glow ? ' is-glow' : ''}`}>
        <div className="aseq-counter" key={`f${flash}`}>aṇu on the board: <b>{anuCount}</b></div>
        <svg viewBox="0 0 360 240" className={`aseq-svg${step === 16 && !stepDone ? ' is-tappable' : ''}`} onClick={onBoardTap} role="img" aria-label="Board">
          <defs>
            <radialGradient id="aseqGlow"><stop offset="0%" stopColor="#fde68a" stopOpacity={0.45} /><stop offset="100%" stopColor="#020617" stopOpacity={0} /></radialGradient>
          </defs>
          <rect width={360} height={240} fill="#020617" />
          {entered && STARS.map((s, i) => <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#cbd5e1" opacity={0.55} />)}
          {glow && <rect width={360} height={240} fill="url(#aseqGlow)" className="aseq-fade" />}
          {ripple > 0 && <rect key={`e${ripple}`} x={1.5} y={1.5} width={357} height={237} rx={10} fill="none" stroke="#a5b4fc" strokeWidth={2} className="aseq-edge" />}
          {ripple > 0 && !karma && step === 1 && <circle key={`r${ripple}`} cx={180} cy={120} r={10} fill="none" stroke="#a5b4fc" className="aseq-ripple" />}

          {showTryanukas && EL_ORDER.map((el) => {
            if (!built[el]) return null;
            if (karma && el === 'vayu') return null;
            const [x, y] = EL_INFO[el].corner;
            return <Tryanuka key={el} el={el} x={x} y={y} s={0.9} label />;
          })}
          {showTryanukas && extraAp && <Tryanuka el="ap" x={EXTRA_AP_BAY[0]} y={EXTRA_AP_BAY[1]} s={0.9} label />}

          {formingPieces()}
          {centerArt()}

          {karma && (
            <g>
              <circle cx={KARMA_COLS[RING[0]]} cy={KARMA_ROWS[RING[1]]} r={24} fill="none" stroke="#22c55e" strokeWidth={2.2} />
              <Tryanuka el="vayu" x={KARMA_COLS[karma.col]} y={KARMA_ROWS[karma.row]} s={SCALES[karma.scale] * 0.9} />
            </g>
          )}
          {dissolveDots()}
        </svg>

        {activeQ && (
          <div className="aseq-question" role="group" aria-label="Question">
            <p>{activeQ.prompt}{qs && qs.length > 1 && <small> ({qIdx + 1} of {qs.length})</small>}</p>
            <div className="aseq-row">
              {activeQ.options.map((o) => (
                <button key={o} type="button" className={`aseq-btn${wrongPick === o ? ' is-wrong' : ''}`} disabled={busy} onClick={() => answer(o)}>{o}</button>
              ))}
            </div>
          </div>
        )}
        {step === 16 && stepDone && (
          <div className="aseq-closing">
            <h4>ākāśa · known by śabda</h4>
            <p>Each element was known by its own quality. None made anything alone. Every joining, motion and dissolving happened in ākāśa, which was there before the first aṇu and is still there now.</p>
            <button type="button" className="aseq-btn" onClick={reset}>Play again from step 1</button>
          </div>
        )}
      </div>

      <div className="aseq-gunas" aria-label="Guṇa cards">
        {[...EL_ORDER.map((e) => ({ id: e, name: EL_INFO[e].name, guna: EL_INFO[e].guna, color: EL_INFO[e].color })), { id: 'akasa', name: 'ākāśa', guna: 'śabda · sound', color: '#c4b5fd' }].map((c) => (
          <div key={c.id} className={`aseq-guna${lit.includes(c.id) ? ' is-lit' : ''}`} style={{ borderColor: lit.includes(c.id) ? c.color : undefined }}>
            <b>{c.name}</b><span>{c.guna}</span>
          </div>
        ))}
      </div>

      <div className="aseq-actions">
        {actionArea()}
        {stepDone && step < 16 && (
          <button type="button" className="aseq-btn is-next" onClick={nextStep}>Next: step {step + 1} · {STEPS[step].title} →</button>
        )}
      </div>

      <div className="aseq-log" ref={logRef} aria-live="polite">
        {log.length === 0 && <p className="aseq-hint">The dialogue appears here.</p>}
        {log.map((ln, i) => (
          <p key={i} className={`aseq-line is-${ln.speaker === 'Bodhi' ? 'bodhi' : ln.speaker === 'Kaṇāda' ? 'kanada' : 'parisesa'}`}>
            <b>{ln.speaker === 'Bodhi' ? '🧑‍🎓 Bodhi' : ln.speaker === 'Kaṇāda' ? '🧘‍♂️ Kaṇāda' : '❓ Pariśeṣa'}:</b> {ln.text}
          </p>
        ))}
      </div>
      <div className="aseq-foot"><button type="button" className="aseq-btn" onClick={reset}>Restart from step 1</button></div>
    </section>
  );
};

const CSS = `
.aseq{max-width:760px;margin:0 auto;padding:.75rem;color:#e2e8f0;font-family:inherit;display:flex;flex-direction:column;gap:.65rem}
.aseq-head h3{margin:0;font-size:1.15rem;color:#fde68a}
.aseq-head p{margin:.25rem 0 0;font-size:.88rem;color:#cbd5e1;line-height:1.45}
.aseq-steps{list-style:none;display:flex;flex-wrap:wrap;gap:.3rem;margin:0;padding:0}
.aseq-pill{min-width:1.9rem;height:1.9rem;display:flex;align-items:center;justify-content:center;border-radius:999px;font-size:.78rem;border:1px solid #334155;background:#0f172a}
.aseq-pill.is-done{background:#14532d;border-color:#22c55e}
.aseq-pill.is-current{background:#854d0e;border-color:#facc15;font-weight:700}
.aseq-pill.is-locked{opacity:.5}
.aseq-current{display:flex;flex-direction:column;gap:.15rem;font-size:.9rem;background:#0f172a;border:1px solid #334155;border-radius:10px;padding:.5rem .7rem}
.aseq-current span{color:#cbd5e1}
.aseq-board{border:1px solid #334155;border-radius:14px;background:#020617;overflow:hidden;transition:box-shadow .6s}
.aseq-board.is-glow{box-shadow:0 0 40px rgba(253,230,138,.45)}
.aseq-counter{padding:.35rem .7rem;font-size:.85rem;border-bottom:1px solid #1e293b;animation:aseqFlash .9s ease}
.aseq-svg{display:block;width:100%;height:auto}
.aseq-svg.is-tappable{cursor:pointer}
.aseq-question{border-top:1px solid #1e293b;padding:.6rem .7rem}
.aseq-question p{margin:0 0 .45rem;font-size:.92rem}
.aseq-closing{border-top:1px solid #1e293b;padding:.7rem}
.aseq-closing h4{margin:0 0 .3rem;color:#fde68a}
.aseq-closing p{margin:0 0 .5rem;font-size:.9rem;line-height:1.45}
.aseq-row,.aseq-tray,.aseq-motions{display:flex;flex-wrap:wrap;gap:.4rem}
.aseq-motions{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr))}
.aseq-actions{display:flex;flex-wrap:wrap;gap:.5rem;align-items:center}
.aseq-btn{padding:.5rem .9rem;border-radius:9px;border:1px solid #475569;background:#1e293b;color:#f1f5f9;font-size:.88rem;cursor:pointer}
.aseq-btn.is-primary{background:#854d0e;border-color:#facc15}
.aseq-btn.is-next{background:#14532d;border-color:#22c55e}
.aseq-btn.is-wrong{border-color:#ef4444}
.aseq-btn:disabled{opacity:.45;cursor:not-allowed}
.aseq-tray-btn{display:flex;align-items:center;gap:.35rem;padding:.45rem .8rem;border-radius:9px;border:1px solid;background:#0f172a;color:#f1f5f9;font-size:.88rem;cursor:pointer}
.aseq-tray-btn.is-active{box-shadow:0 0 0 2px rgba(250,204,21,.5)}
.aseq-tray-btn:disabled{opacity:.4;cursor:not-allowed}
.aseq-dot{width:.7rem;height:.7rem;border-radius:999px;display:inline-block}
.aseq-gunas{display:grid;grid-template-columns:repeat(auto-fit,minmax(110px,1fr));gap:.4rem}
.aseq-guna{border:1px solid #334155;border-radius:9px;padding:.35rem .5rem;display:flex;flex-direction:column;font-size:.8rem;opacity:.45;transition:opacity .4s}
.aseq-guna.is-lit{opacity:1;background:#0f172a}
.aseq-log{max-height:220px;overflow-y:auto;border:1px solid #334155;border-radius:10px;padding:.5rem .7rem;background:#0b1120}
.aseq-line{margin:.25rem 0;font-size:.9rem;line-height:1.45}
.aseq-line.is-bodhi b{color:#93c5fd}.aseq-line.is-kanada b{color:#fde68a}.aseq-line.is-parisesa b{color:#f0abfc}
.aseq-hint{color:#94a3b8;font-size:.85rem;margin:0}
.aseq-foot{display:flex;justify-content:flex-end}
.aseq-pop{animation:aseqPop .45s ease}
.aseq-fade{animation:aseqFade 1.2s ease}
.aseq-ripple{animation:aseqRipple 1.6s ease-out forwards}
@keyframes aseqEdge{0%{opacity:.9}100%{opacity:0}}
.aseq-edge{animation:aseqEdge 1.2s ease-out forwards}
@keyframes aseqFlash{0%{background:#facc15;color:#0f172a}100%{background:transparent}}
@keyframes aseqPop{0%{opacity:0}100%{opacity:1}}
@keyframes aseqFade{0%{opacity:0}100%{opacity:1}}
@keyframes aseqRipple{0%{r:10;opacity:.9}100%{r:60;opacity:0}}
@media (max-width:520px){.aseq{padding:.4rem}.aseq-pill{min-width:1.6rem;height:1.6rem;font-size:.7rem}.aseq-btn,.aseq-tray-btn{font-size:.8rem}}
`;

export default AkasaSequenceBoard;
