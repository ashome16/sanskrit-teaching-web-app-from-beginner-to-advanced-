import React, { useEffect, useMemo, useState } from 'react';
import {
  FILL_VERBS, NUMBERS, PRONOUN_ITEMS, REVIEW_WORDS, SAYING_QS, VACANA_ROWS, type SwarWord,
} from '../data/swarBook';
import { playPronunciation, stopPronunciation } from '../utils/pronunciation';

/**
 * Swar Review Practice: extra practice for the Review test on pp. 23–24 of
 * Swar · स्वर — Sanskrit Workbook (the p. 24 QR code opens ednetlearn.in/quiz/).
 * Every item comes from the book; instant feedback after each answer.
 */

const DEV = "'Noto Sans Devanagari','Nirmala UI','Mangal','Kohinoor Devanagari',sans-serif";

interface MCQ {
  prompt: string;
  hint?: string;
  options: string[];
  answer: number;
  explain: string;
  speak?: string;
}

type SetId = 'meaning' | 'sanskrit' | 'match' | 'verb' | 'pronoun' | 'numbers' | 'vacana' | 'listen' | 'saying';

interface SetInfo { id: SetId; icon: string; title: string; dev: string; about: string; test: string }

const SETS: SetInfo[] = [
  { id: 'meaning', icon: '🔤', title: 'Choose the meaning', dev: 'पुनरावृत्तिः · A', about: 'See a Sanskrit word, pick its meaning.', test: 'Test part A' },
  { id: 'sanskrit', icon: '✍️', title: 'Say it in Sanskrit', dev: 'पुनरावृत्तिः · B', about: 'See an English word, pick the Sanskrit.', test: 'Test part B' },
  { id: 'match', icon: '🧩', title: 'Match the pairs', dev: 'योजयत', about: 'Tap a word, then its meaning. 3 rounds.', test: 'Parts A & B' },
  { id: 'verb', icon: '🏃', title: 'Fill in the verb', dev: 'क्रियापदानि', about: 'अहं पठामि, त्वं पठसि, सः पठति …', test: 'Test part C' },
  { id: 'pronoun', icon: '👆', title: 'सः, सा or तत्?', dev: 'सः सा तत्', about: 'Pick the right “that” for each word.', test: 'Test part D' },
  { id: 'numbers', icon: '🔢', title: 'Number words', dev: 'सङ्ख्याः', about: '१ to १० in digits and words.', test: 'Test part E' },
  { id: 'vacana', icon: '👥', title: 'One, two, many', dev: 'वचनानि', about: 'एकवचनम्, द्विवचनम्, बहुवचनम्.', test: 'Learn more tables' },
  { id: 'listen', icon: '🔊', title: 'Listen and pick', dev: 'शब्दाः', about: 'Hear a word, tap the one you heard.', test: 'Parts A & B' },
  { id: 'saying', icon: '📜', title: 'Complete the saying', dev: 'सुभाषितम्', about: 'उद्यमेन हि सिध्यन्ति कार्याणि …', test: 'Test part F' },
];

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Correct item plus 3 distractors, preferring words from the same book page (same topic). */
function distractors(word: SwarWord, n = 3): SwarWord[] {
  const same = shuffle(REVIEW_WORDS.filter((w) => w !== word && w.page === word.page && w.en !== word.en));
  const other = shuffle(REVIEW_WORDS.filter((w) => w !== word && w.page !== word.page));
  return [...same, ...other].slice(0, n);
}

function mcqFrom(correct: string, wrong: string[], rest: Omit<MCQ, 'options' | 'answer'>): MCQ {
  const options = shuffle([correct, ...wrong]);
  return { ...rest, options, answer: options.indexOf(correct) };
}

const say = (w: SwarWord) => `${w.dev} (${w.iast}) = ${w.en} · page ${w.page}`;

function buildSet(id: SetId): MCQ[] {
  switch (id) {
    case 'meaning':
      return shuffle(REVIEW_WORDS).slice(0, 12).map((w) =>
        mcqFrom(w.en, distractors(w).map((d) => d.en), { prompt: `What does ${w.dev} mean?`, hint: w.iast, explain: say(w), speak: w.dev }));
    case 'sanskrit':
      return shuffle(REVIEW_WORDS).slice(0, 12).map((w) =>
        mcqFrom(w.dev, distractors(w).map((d) => d.dev), { prompt: `Which word means “${w.en}”?`, explain: say(w), speak: w.dev }));
    case 'listen':
      return shuffle(REVIEW_WORDS).slice(0, 10).map((w) =>
        mcqFrom(w.dev, distractors(w).map((d) => d.dev), { prompt: 'Tap 🔊, listen, then pick the word you heard.', explain: say(w), speak: w.dev }));
    case 'verb':
      return shuffle(FILL_VERBS).map((v) =>
        mcqFrom(v.answer, v.options.filter((o) => o !== v.answer), {
          prompt: `${v.before} ________ ${v.after}`, hint: `(${v.hint})`,
          explain: `${v.before} ${v.answer}${v.after} (${v.iast}) ${v.en} · page ${v.page}`, speak: `${v.before} ${v.answer}`,
        }));
    case 'pronoun':
      return shuffle(PRONOUN_ITEMS).map((p) => {
        const g = p.answer === 'सः' ? 'masculine' : p.answer === 'सा' ? 'feminine' : 'neuter';
        return { prompt: `________ ${p.noun}।`, hint: `${p.iast}: ${p.en}`, options: ['सः', 'सा', 'तत्'], answer: ['सः', 'सा', 'तत्'].indexOf(p.answer),
          explain: `${p.answer} ${p.noun}। ${p.noun} (${p.iast}) is ${g}, so we use ${p.answer} · page ${p.page}` };
      });
    case 'numbers':
      return shuffle(NUMBERS).map((n, i) => {
        const others = shuffle(NUMBERS.filter((m) => m !== n)).slice(0, 3);
        const explain = `${n.digit} (${n.n}) = ${n.dev} (${n.iast}) · page 13`;
        return i % 2 === 0
          ? mcqFrom(n.dev, others.map((o) => o.dev), { prompt: `${n.digit} → ?`, hint: 'Pick the number word.', explain, speak: n.dev })
          : mcqFrom(n.digit, others.map((o) => o.digit), { prompt: `${n.dev} → ?`, hint: 'Pick the Sanskrit digit.', explain, speak: n.dev });
      });
    case 'vacana': {
      const names = ['one (एकवचनम्)', 'two (द्विवचनम्)', 'many (बहुवचनम्)'];
      return shuffle(VACANA_ROWS).map((r) => {
        const k = 1 + Math.floor(Math.random() * 2);
        const forms = [r.one, r.two, r.many];
        return mcqFrom(forms[k], forms.filter((_, i) => i !== k), {
          prompt: `${r.one}। (${r.en}) Which is the “${names[k]}” form?`,
          explain: `${forms.map((f, i) => `${f} (${r.iast[i]})`).join(' · ')} · page ${r.page}`, speak: forms[k],
        });
      });
    }
    case 'saying':
      return SAYING_QS.map((s) => ({ prompt: s.q, options: s.options, answer: s.answer, explain: s.note }));
    default:
      return [];
  }
}

const card: React.CSSProperties = {
  background: '#fff', borderRadius: 18, border: '1px solid #e5e4e7',
  boxShadow: '0 10px 30px rgba(39,59,53,0.08)', padding: 'clamp(1rem, 3vw, 1.6rem)',
};
const btn: React.CSSProperties = {
  background: '#273b35', color: '#fff', border: 'none', borderRadius: 999, padding: '0.65rem 1.25rem',
  fontWeight: 700, fontSize: '1rem', cursor: 'pointer',
};
const btnAlt: React.CSSProperties = { ...btn, background: '#fff', color: '#273b35', border: '2px solid #273b35' };
const small: React.CSSProperties = { ...btnAlt, padding: '0.45rem 0.9rem', fontSize: '0.9rem' };

const canSpeak = () => typeof window !== 'undefined' && 'speechSynthesis' in window;

/* ───────────── Multiple-choice runner with instant feedback ───────────── */
const McqRunner: React.FC<{ set: SetInfo; onExit: () => void }> = ({ set, onExit }) => {
  const [qs, setQs] = useState<MCQ[]>(() => buildSet(set.id));
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const q = qs[i];

  useEffect(() => {
    if (set.id === 'listen' && q?.speak && !done) playPronunciation(q.speak, { plainDevanagari: true, rate: 0.8 });
    return () => stopPronunciation();
  }, [i, set.id, q, done]);

  const choose = (oi: number) => {
    if (pick !== null) return;
    setPick(oi);
    if (oi === q.answer) setScore((s) => s + 1);
  };
  const next = () => {
    if (i + 1 >= qs.length) { setDone(true); return; }
    setI(i + 1); setPick(null);
  };
  const restart = () => { setQs(buildSet(set.id)); setI(0); setPick(null); setScore(0); setDone(false); };

  if (done) {
    const pct = Math.round((score / qs.length) * 100);
    return (
      <div style={{ textAlign: 'center' }} data-testid="swar-set-done">
        <div style={{ fontSize: '2.4rem' }}>{pct >= 70 ? '🎉' : '🌱'}</div>
        <h3 style={{ margin: '0.3rem 0' }}>{set.title}: {score} / {qs.length}</h3>
        <p style={{ color: '#6b6375' }}>{pct >= 70 ? 'शोभनम्! (śobhanam) Well done!' : 'Good try! Look at the book pages shown in the answers, then play again.'}</p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button style={btn} onClick={restart}>Play again (new questions)</button>
          <button style={btnAlt} onClick={onExit}>Choose another set</button>
        </div>
      </div>
    );
  }

  const correct = pick !== null && pick === q.answer;
  return (
    <div data-testid="swar-set-q">
      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6b6375', fontSize: '0.9rem', marginBottom: 8 }}>
        <span>Question {i + 1} of {qs.length}</span><span>Score: {score}</span>
      </div>
      <div style={{ fontFamily: DEV, fontSize: 'clamp(1.2rem, 4vw, 1.6rem)', fontWeight: 700, margin: '0.4rem 0' }}>
        {q.prompt}
        {q.speak && canSpeak() && (set.id === 'listen' || set.id === 'meaning' || pick !== null) && (
          <button type="button" aria-label="Listen" title="Listen" onClick={() => playPronunciation(q.speak!, { plainDevanagari: true, rate: 0.8 })}
            style={{ marginLeft: 10, border: '1.5px solid #cbd5e1', background: '#fff', borderRadius: 999, cursor: 'pointer', fontSize: '1.1rem', padding: '0.15rem 0.6rem' }}>🔊</button>
        )}
      </div>
      {set.id === 'listen' && !canSpeak() && <p style={{ color: '#c92a2a' }}>This browser cannot play sound. Try “Choose the meaning” instead.</p>}
      {q.hint && <div style={{ color: '#6b6375', fontStyle: 'italic', marginBottom: 8, fontFamily: DEV }}>{q.hint}</div>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 8, marginTop: 8 }}>
        {q.options.map((opt, oi) => {
          const isAns = pick !== null && oi === q.answer;
          const isWrong = pick === oi && oi !== q.answer;
          return (
            <button key={oi} type="button" onClick={() => choose(oi)} disabled={pick !== null}
              style={{ textAlign: 'left', padding: '0.7rem 0.9rem', borderRadius: 12, cursor: pick === null ? 'pointer' : 'default', fontSize: '1.05rem', fontFamily: DEV, color: '#273b35',
                border: isAns ? '2px solid #2b8a3e' : isWrong ? '2px solid #c92a2a' : '1.5px solid #cbd5e1',
                background: isAns ? '#ebfbee' : isWrong ? '#fff5f5' : '#fff' }}>
              {isAns ? '✓ ' : isWrong ? '✗ ' : ''}{opt}
            </button>
          );
        })}
      </div>
      {pick !== null && (
        <div role="status" style={{ marginTop: 12, padding: '0.7rem 0.9rem', borderRadius: 12, background: correct ? '#ebfbee' : '#fff4e6', fontFamily: DEV }}>
          <strong>{correct ? 'शोभनम्! (śobhanam) Correct!' : 'Not quite.'}</strong> {q.explain}
        </div>
      )}
      <div style={{ display: 'flex', gap: 10, marginTop: 12, flexWrap: 'wrap' }}>
        {pick !== null && <button style={btn} onClick={next}>{i + 1 >= qs.length ? 'See my score' : 'Next →'}</button>}
        <button style={small} onClick={onExit}>← All sets</button>
      </div>
    </div>
  );
};

/* ───────────── Match the pairs ───────────── */
const ROUNDS = 3;
const PAIRS = 5;
const MatchGame: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const makeRounds = () => {
    const words = shuffle(REVIEW_WORDS);
    const used = new Set<string>();
    const picked: SwarWord[] = [];
    for (const w of words) { if (!used.has(w.en)) { used.add(w.en); picked.push(w); } if (picked.length >= ROUNDS * PAIRS) break; }
    return Array.from({ length: ROUNDS }, (_, r) => picked.slice(r * PAIRS, r * PAIRS + PAIRS));
  };
  const [rounds, setRounds] = useState<SwarWord[][]>(makeRounds);
  const [round, setRound] = useState(0);
  const [left, setLeft] = useState<number | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [wrong, setWrong] = useState<number | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [finished, setFinished] = useState(false);
  const words = rounds[round];
  const rightOrder = useMemo(() => shuffle(words.map((_, k) => k)), [words]);

  const tapRight = (k: number) => {
    if (left === null || matched.has(k)) return;
    if (k === left) {
      const m = new Set(matched); m.add(k); setMatched(m); setLeft(null);
      if (m.size === words.length) {
        setTimeout(() => {
          if (round + 1 >= ROUNDS) setFinished(true);
          else { setRound(round + 1); setMatched(new Set()); }
        }, 700);
      }
    } else {
      setWrong(k); setMistakes((x) => x + 1);
      setTimeout(() => setWrong(null), 600);
    }
  };
  const restart = () => { setRounds(makeRounds()); setRound(0); setMatched(new Set()); setLeft(null); setMistakes(0); setFinished(false); };

  if (finished) {
    return (
      <div style={{ textAlign: 'center' }} data-testid="swar-set-done">
        <div style={{ fontSize: '2.4rem' }}>🎉</div>
        <h3>All {ROUNDS * PAIRS} pairs matched!</h3>
        <p style={{ color: '#6b6375' }}>Wrong taps: {mistakes}. {mistakes <= 2 ? 'शोभनम्! (śobhanam) Well done!' : 'Play again and try for fewer wrong taps.'}</p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button style={btn} onClick={restart}>Play again (new words)</button>
          <button style={btnAlt} onClick={onExit}>Choose another set</button>
        </div>
      </div>
    );
  }

  const cell = (on: boolean, done: boolean, bad: boolean): React.CSSProperties => ({
    padding: '0.65rem 0.8rem', borderRadius: 12, fontSize: '1.05rem', fontFamily: DEV, color: '#273b35', textAlign: 'left',
    cursor: done ? 'default' : 'pointer',
    border: done ? '2px solid #2b8a3e' : bad ? '2px solid #c92a2a' : on ? '2px solid #e8590c' : '1.5px solid #cbd5e1',
    background: done ? '#ebfbee' : bad ? '#fff5f5' : on ? '#fff4e6' : '#fff',
  });

  return (
    <div data-testid="swar-match">
      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6b6375', fontSize: '0.9rem', marginBottom: 8 }}>
        <span>Round {round + 1} of {ROUNDS} · tap a Sanskrit word, then its meaning</span><span>Wrong taps: {mistakes}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div style={{ display: 'grid', gap: 8 }}>
          {words.map((w, k) => (
            <button key={w.dev} type="button" disabled={matched.has(k)} onClick={() => { setLeft(k); if (canSpeak()) playPronunciation(w.dev, { plainDevanagari: true, rate: 0.8 }); }}
              style={cell(left === k, matched.has(k), false)}>
              {w.dev}{matched.has(k) && <span style={{ display: 'block', fontSize: '0.8rem', color: '#6b6375', fontStyle: 'italic' }}>{w.iast} · p. {w.page}</span>}
            </button>
          ))}
        </div>
        <div style={{ display: 'grid', gap: 8 }}>
          {rightOrder.map((k) => (
            <button key={words[k].en} type="button" disabled={matched.has(k)} onClick={() => tapRight(k)} style={cell(false, matched.has(k), wrong === k)}>
              {words[k].en}
            </button>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 12 }}><button style={small} onClick={onExit}>← All sets</button></div>
    </div>
  );
};

/* ───────────── Section shell ───────────── */
interface Props {
  onOpenCertificate?: () => void;
  onOpenBodhi?: () => void;
  onOpenWorksheets?: () => void;
  onOpenPuzzles?: () => void;
  onOpenGames?: () => void;
  onOpenWorkbooks?: () => void;
  onOpenWritingPad?: () => void;
  onOpenSoundBoard?: () => void;
}

export const SWAR_SET_COUNTS: Record<SetId, number> = {
  meaning: 12, sanskrit: 12, match: ROUNDS * PAIRS, verb: FILL_VERBS.length, pronoun: PRONOUN_ITEMS.length,
  numbers: NUMBERS.length, vacana: VACANA_ROWS.length, listen: 10, saying: SAYING_QS.length,
};

const SwarReviewPractice: React.FC<Props> = ({
  onOpenCertificate,
  onOpenBodhi,
  onOpenWorksheets,
  onOpenPuzzles,
  onOpenGames,
  onOpenWorkbooks,
  onOpenWritingPad,
  onOpenSoundBoard,
}) => {
  const [active, setActive] = useState<SetId | null>(null);
  const [open, setOpen] = useState(true);
  const set = SETS.find((s) => s.id === active) || null;
  const total = Object.values(SWAR_SET_COUNTS).reduce((a, b) => a + b, 0);

  return (
    <section id="swar-review" aria-labelledby="swar-review-title" style={{ margin: '0 auto 1.5rem', maxWidth: 1100, color: '#273b35' }}>
      <div style={{ ...card, background: 'linear-gradient(135deg,#fffaf0,#fff1e0)', borderColor: '#f3d9b1' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0c8599', letterSpacing: '0.04em' }}>FROM THE BOOK · Swar · स्वर — Sanskrit Workbook</div>
            <h2 id="swar-review-title" style={{ margin: '0.2rem 0', fontSize: 'clamp(1.3rem, 4vw, 1.8rem)' }}>
              📝 Swar Review Practice <span style={{ fontFamily: DEV, color: '#c2255c' }}>· पुनरावृत्तिः</span>
            </h2>
            <p style={{ margin: 0, color: '#6b6375' }}>
              More practice for the Review test on pages 23–24: {SETS.length} sets, {total} questions, with instant answers and book page numbers.
            </p>
          </div>
          <button style={small} onClick={() => { setOpen(!open); setActive(null); }} aria-expanded={open}>{open ? 'Hide' : 'Show'}</button>
        </div>

        {open && !set && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 10, marginTop: 14 }} data-testid="swar-sets">
            {SETS.map((s) => (
              <button key={s.id} type="button" onClick={() => setActive(s.id)}
                style={{ textAlign: 'left', background: '#fff', border: '1.5px solid #e5e4e7', borderRadius: 14, padding: '0.8rem 0.9rem', cursor: 'pointer', color: '#273b35' }}>
                <div style={{ fontSize: '1.5rem' }}>{s.icon}</div>
                <div style={{ fontWeight: 800 }}>{s.title}</div>
                <div style={{ fontFamily: DEV, color: '#c2255c' }}>{s.dev}</div>
                <div style={{ fontSize: '0.85rem', color: '#6b6375', fontFamily: DEV }}>{s.about}</div>
                <div style={{ fontSize: '0.78rem', color: '#0c8599', marginTop: 4 }}>{s.test} · {SWAR_SET_COUNTS[s.id]} questions</div>
              </button>
            ))}
          </div>
        )}

        {open && set && (
          <div style={{ ...card, marginTop: 14 }}>
            <h3 style={{ marginTop: 0 }}>{set.icon} {set.title} <span style={{ fontFamily: DEV, color: '#c2255c' }}>· {set.dev}</span></h3>
            {set.id === 'match'
              ? <MatchGame key="match" onExit={() => setActive(null)} />
              : <McqRunner key={set.id} set={set} onExit={() => setActive(null)} />}
          </div>
        )}

        {open && (
          <div style={{ marginTop: 14, display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ color: '#6b6375', fontSize: '0.92rem' }}>Related Practice &amp; Material:</span>
            {onOpenWorkbooks && <button style={small} onClick={onOpenWorkbooks}>📚 Swar Workbook &amp; Materials</button>}
            {onOpenWritingPad && <button style={small} onClick={onOpenWritingPad}>✍️ Writing Tracing Slate</button>}
            {onOpenSoundBoard && <button style={small} onClick={onOpenSoundBoard}>🔊 Alphabet Sound Board</button>}
            {onOpenWorksheets && <button style={small} onClick={onOpenWorksheets}>📄 Worksheets</button>}
            {onOpenPuzzles && <button style={small} onClick={onOpenPuzzles}>🧩 Puzzles</button>}
            {onOpenGames && <button style={small} onClick={onOpenGames}>🎮 Games</button>}
            {onOpenBodhi && <button style={small} onClick={onOpenBodhi}>🙋 Ask Bodhi</button>}
            {onOpenCertificate && <button style={small} onClick={onOpenCertificate}>🏅 Finished the book? Get your certificate</button>}
          </div>
        )}
      </div>
    </section>
  );
};

export default SwarReviewPractice;
