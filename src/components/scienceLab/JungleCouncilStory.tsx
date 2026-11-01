import { useState } from 'react';
import type React from 'react';
import { devanagariToIast } from '../../utils/devanagariToIast';
import { playStoryLine } from '../../utils/pronunciation';
import { soundEffects } from '../../utils/soundEffects';

interface Cast { icon: string; sa: string; en: string; sound?: string; }
interface Slide { icon: string; titleEn: string; titleSa: string; bg: string; text: string; cast: Cast[]; }

const SLIDES: Slide[] = [
  { icon: '🦊', titleSa: 'नैमिषारण्यम्', titleEn: 'The Tricky Fox', bg: '#fef3c7',
    text: 'Deep in the Naimisha forest, all the animals lived in peace. But the Clever Fox wanted trouble! He whispered fibs to the Lion: "The Elephant says his trumpet is louder than your roar, and the Peacock laughs at your walk!"',
    cast: [
      { icon: '🦊', sa: 'लोमशः', en: 'Fox' },
      { icon: '🦁', sa: 'सिंहः', en: 'Lion' },
      { icon: '🐘', sa: 'गजः', en: 'Elephant', sound: 'ciṅghāraḥ!' },
      { icon: '🦚', sa: 'मयूरः', en: 'Peacock', sound: 'kekā-kekā!' },
    ] },
  { icon: '🦁', titleSa: 'सिंहः गर्जति', titleEn: 'The Angry Roar', bg: '#fde2e4',
    text: 'The proud Lion got very angry. He roared so loudly the trees shook! "I will show the Elephant who is king!"',
    cast: [{ icon: '🦁', sa: 'सिंहः', en: 'Lion', sound: 'garjati!' }] },
  { icon: '🐦‍⬛', titleSa: 'वनसभा', titleEn: 'The Jungle Council Warns', bg: '#e0f2fe',
    text: 'The Clever Crow flew down: "Don\'t listen, King! The Fox\'s words are poison, not truth." The Monkey chattered "Yes, yes!" and the Snake hissed: "Don\'t act in anger!" But the Lion would not listen.',
    cast: [
      { icon: '🐦‍⬛', sa: 'काकः', en: 'Crow', sound: 'kā-kā!' },
      { icon: '🐒', sa: 'वानरः', en: 'Monkey', sound: 'khik-khik!' },
      { icon: '🐍', sa: 'सर्पः', en: 'Snake', sound: 'phūtkāraḥ!' },
    ] },
  { icon: '🦌', titleSa: 'भीताः पशवः', titleEn: 'Everyone Runs!', bg: '#dcfce7',
    text: 'Stomp, stomp! The Lion marched to the marshland. The Deer ran into the bushes, the Bear growled with worry, and the Frog croaked and jumped — splash! — into the pond.',
    cast: [
      { icon: '🦌', sa: 'मृगः', en: 'Deer' },
      { icon: '🐻', sa: 'भल्लूकः', en: 'Bear', sound: 'ghur-ghur!' },
      { icon: '🐸', sa: 'मण्डूकः', en: 'Frog', sound: 'ṭarra-ṭarra!' },
    ] },
  { icon: '🐊', titleSa: 'पङ्के सिंहः', titleEn: 'Stuck in the Mud', bg: '#ede9fe',
    text: 'Oh no! The Lion jumped onto soft mud and sank into quicksand. The more he wiggled, the deeper he went. A hungry Crocodile swam closer… and the naughty Fox just laughed and ran away. "Help! Please help me!" cried the Lion.',
    cast: [
      { icon: '🐊', sa: 'नक्रः', en: 'Crocodile' },
      { icon: '🦊', sa: 'लोमशः', en: 'Fox' },
    ] },
  { icon: '🐘', titleSa: 'रक्षणम्', titleEn: 'The Big Rescue', bg: '#fce7f3',
    text: 'The Crow called all the animals. The Puppy barked to show the way, and the gentle Cow mooed softly to calm everyone. The kind Elephant forgot the mean words, wrapped his trunk around the Lion and pulled him out! The tiny Mouse chewed the thorny vines off his legs.',
    cast: [
      { icon: '🐶', sa: 'श्वा', en: 'Puppy', sound: 'bhauṃ-bhauṃ!' },
      { icon: '🐄', sa: 'धेनुः', en: 'Cow', sound: 'hambā-hambā!' },
      { icon: '🐘', sa: 'गजः', en: 'Elephant' },
      { icon: '🐭', sa: 'मूषकः', en: 'Mouse', sound: 'chīṃ-chīṃ!' },
    ] },
  { icon: '🤝', titleSa: 'सङ्घे शक्तिः', titleEn: 'Strength in Unity', bg: '#fef9c3',
    text: 'The Lion bowed: "Thank you, big Elephant and tiny Mouse! No one is better than anyone else. Everyone has a special gift." From that day, the forest was happy again. Pride and fibs lead to trouble — helping each other makes us strong!',
    cast: [{ icon: '🦁', sa: 'सङ्घे शक्तिः', en: 'Unity is strength' }] },
];

const PAGES = Array.from({ length: 10 }, (_, k) => `/images/jungle-council/page-${String(k + 1).padStart(2, '0')}.jpg`);
const PAGE_SA: { sa: string; en: string }[] = [
  { sa: 'वनसभायाः विवेकः', en: 'The Wisdom of the Jungle Council' },
  { sa: 'लोमशः सिंहं नमति।', en: 'The fox bows to the lion.' },
  { sa: 'लोमशः असत्यं वदति। सिंहः गर्जति।', en: 'The fox lies. The lion roars!' },
  { sa: 'काकः वदति — क्रोधं मा कुरु।', en: 'The crow says — do not be angry.' },
  { sa: 'सर्पः फूत्कारं करोति। सिंहः न शृणोति।', en: 'The snake hisses a warning. The lion does not listen.' },
  { sa: 'सिंहः पङ्के मज्जति।', en: 'The lion sinks in the mud.' },
  { sa: 'नक्रः आगच्छति। लोमशः पलायते।', en: 'The crocodile comes. The fox runs away.' },
  { sa: 'काकः सर्वान् आह्वयति।', en: 'The crow calls everyone to help.' },
  { sa: 'गजः सिंहं रक्षति।', en: 'The elephant saves the lion.' },
  { sa: 'सङ्घे शक्तिः।', en: 'Unity is strength!' },
];

interface Q { q: string; opts: { label: string; sa?: string }[]; ans: number; }
const QUIZ: Q[] = [
  { q: 'What is 🦁 Lion in Sanskrit?', opts: [{ label: 'गजः', sa: 'गजः' }, { label: 'सिंहः', sa: 'सिंहः' }, { label: 'काकः', sa: 'काकः' }], ans: 1 },
  { q: 'Who is गजः?', opts: [{ label: '🐘 Elephant' }, { label: '🐭 Mouse' }, { label: '🦊 Fox' }], ans: 0 },
  { q: 'What does the lion do? सिंहः …', opts: [{ label: 'गर्जति', sa: 'गर्जति' }, { label: 'धावति', sa: 'धावति' }, { label: 'खादति', sa: 'खादति' }], ans: 0 },
  { q: 'Which animal says “kekā-kekā”?', opts: [{ label: '🐸 मण्डूकः', sa: 'मण्डूकः' }, { label: '🦚 मयूरः', sa: 'मयूरः' }, { label: '🐄 धेनुः', sa: 'धेनुः' }], ans: 1 },
  { q: 'Who is लोमशः — the tricky one?', opts: [{ label: '🐦‍⬛ Crow' }, { label: '🦊 Fox' }, { label: '🐻 Bear' }], ans: 1 },
  { q: 'The tiny hero 🐭 is called…', opts: [{ label: 'मूषकः', sa: 'मूषकः' }, { label: 'सर्पः', sa: 'सर्पः' }, { label: 'वानरः', sa: 'वानरः' }], ans: 0 },
  { q: 'Which crow sound is right? काकः says…', opts: [{ label: 'bhauṃ-bhauṃ' }, { label: 'kā-kā' }, { label: 'hambā-hambā' }], ans: 1 },
  { q: 'Who is चिक्रोडः (Cikroḍaḥ)?', opts: [{ label: '🐿️ Squirrel' }, { label: '🐊 Crocodile' }, { label: '🐍 Snake' }], ans: 0 },
  { q: 'What does सङ्घे शक्तिः mean?', opts: [{ label: '💪 Unity is strength' }, { label: '😴 Time to sleep' }, { label: '🍌 Eat bananas' }], ans: 0 },
];

function Quiz() {
  const [n, setN] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  if (n >= QUIZ.length) return (
    <div style={{ background: '#fef9c3', borderRadius: 20, padding: 24, textAlign: 'center', border: '2px solid #fde68a' }}>
      <div style={{ fontSize: 56 }}>🏆</div>
      <h3>You got {score} of {QUIZ.length}!</h3>
      <p lang="sa" style={{ fontSize: 22 }}>साधु! सङ्घे शक्तिः <button type="button" className="psw-dialogue-audio-btn" onClick={() => playStoryLine('साधु सङ्घे शक्तिः')}>🔊</button></p>
      <button type="button" className="psw-nav-arrow-btn" onClick={() => { setN(0); setPick(null); setScore(0); }}>Play again 🔁</button>
      <ArticleLink />
    </div>
  );
  const q = QUIZ[n];
  const choose = (k: number) => {
    if (pick !== null) return;
    setPick(k);
    const o = q.opts[k]; if (o.sa) playStoryLine(o.sa);
    if (k === q.ans) { setScore(score + 1); soundEffects.playStrokeChime(); }
  };
  return (
    <div style={{ background: '#e0f2fe', borderRadius: 20, padding: 20, border: '2px solid #bae6fd', textAlign: 'center' }}>
      <div className="psw-story-slide-counter">Question <strong>{n + 1}</strong> of {QUIZ.length} · ⭐ {score}</div>
      <h3 style={{ margin: '10px 0 16px' }}>{q.q}</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
        {q.opts.map((o, k) => {
          const bg = pick === null ? '#ffffff' : k === q.ans ? '#bbf7d0' : k === pick ? '#fecaca' : '#ffffff';
          return (
            <button key={k} type="button" onClick={() => choose(k)}
              style={{ background: bg, border: '2px solid #e9d5ff', borderRadius: 16, padding: '12px 18px', minWidth: 140, fontSize: 20, cursor: 'pointer' }}>
              <span lang={o.sa ? 'sa' : undefined}>{o.label}</span>
              {o.sa && <div style={{ fontSize: 13, fontStyle: 'italic', color: '#6b7280' }}>{devanagariToIast(o.sa)} 🔊</div>}
            </button>
          );
        })}
      </div>
      {pick !== null && (
        <div style={{ marginTop: 14 }}>
          <p style={{ fontSize: 18 }}>{pick === q.ans ? '🎉 Wonderful! साधु!' : '🌱 Nice try! The green one is right.'}</p>
          <button type="button" className="psw-nav-arrow-btn" onClick={() => { setN(n + 1); setPick(null); }}>Next →</button>
        </div>
      )}
    </div>
  );
}


const PT_TERMS: { sa: string; en: string }[] = [
  { sa: 'सिंहः', en: 'proud lion — a ruler blinded by flattery' },
  { sa: 'लोमशः', en: 'clever fox — the sly counsellor whose whispers split friends' },
  { sa: 'काकः', en: 'crow — wise voice of caution' },
  { sa: 'सर्पः', en: 'snake — warns against blind rage' },
];

function SaTerm({ sa }: { sa: string }) {
  return (
    <span>
      <span lang="sa" style={{ fontWeight: 700, color: '#581c87' }}>{sa}</span>{' '}
      <span style={{ fontStyle: 'italic', color: '#6b7280' }}>({devanagariToIast(sa)})</span>{' '}
      <button type="button" className="psw-dialogue-audio-btn" style={{ padding: '0 4px' }} onClick={() => playStoryLine(sa)} aria-label={`Hear ${sa}`}>🔊</button>
    </span>
  );
}

function PanchatantraNote({ compact = false }: { compact?: boolean }) {
  const fs = compact ? 13 : 15;
  return (
    <div style={{ textAlign: 'left', fontSize: fs, lineHeight: 1.45, color: '#3f3f46' }}>
      <div style={{ fontSize: fs + 5, fontWeight: 800, color: '#6b21a8' }}>
        <SaTerm sa="पञ्चतन्त्रम्" />
      </div>
      <div style={{ fontWeight: 700, marginBottom: 6 }}>Pañcatantra — why animals tell this story 🐾</div>
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        <li><strong>Animals mirror people.</strong>{PT_TERMS.slice(0, 2).map((t) => <div key={t.sa}><SaTerm sa={t.sa} /> {t.en}</div>)}</li>
        <li><strong>Voices of reason.</strong>{PT_TERMS.slice(2).map((t) => <div key={t.sa}><SaTerm sa={t.sa} /> {t.en}</div>)}</li>
        <li><strong>Losing &amp; gaining friends.</strong> <SaTerm sa="मित्रभेदः" /> and <SaTerm sa="मित्रलाभः" /> — गजः the elephant, चिक्रोडः the squirrel and मूषकः the mouse use very different gifts for one rescue. Real power is protecting each other, not ranking each other.</li>
        <li><strong>For parents:</strong> an Indian classic that travelled the world as <em>Kalīla wa Dimna</em>. <a href={ARTICLE_URL} style={{ color: '#7e22ce', fontWeight: 700 }}>Full story in the article →</a></li>
      </ul>
      <div style={{ marginTop: 8, fontWeight: 700 }}>Moral: <SaTerm sa="सङ्घे शक्तिः" /> — strength in unity.</div>
      <div style={{ marginTop: 4, fontStyle: 'italic', color: '#6b21a8' }}>Our Jungle Council story continues that tradition. ✨</div>
    </div>
  );
}

const ARTICLE_URL = '/panchatantra';

function ArticleLink() {
  return (
    <div style={{ marginTop: 14, textAlign: 'center' }}>
      <a href={ARTICLE_URL} style={{ display: 'inline-block', padding: '10px 18px', borderRadius: 999, background: '#f3e8ff', border: '2px solid #d8b4fe', color: '#6b21a8', fontWeight: 800, textDecoration: 'none' }}>
        📜 Read: Pañcatantra — wisdom that travelled the world →
      </a>
      <div style={{ marginTop: 6, fontSize: 14, color: '#6b7280', fontStyle: 'italic' }}>Why this animal story is older than many fables you know — and how it taught the world.</div>
    </div>
  );
}

function Credits() {
  return (
    <div style={{ marginTop: 10, textAlign: 'center', fontSize: 15, color: '#4c1d95', lineHeight: 1.5 }}>
      <div>✍️ Written by <strong>Sesha Kajuluri Penumallu</strong></div>
      <div><a href={ARTICLE_URL} style={{ color: '#7e22ce', fontStyle: 'italic', textDecoration: 'underline' }}>Inspired by the timeless tales of the Pañcatantra (<span lang="sa">पञ्चतन्त्रम्</span>)</a></div>
    </div>
  );
}

const PT_CSS = `
.jc-pt-overlay{position:absolute;top:3%;left:2%;width:46%;bottom:3%;overflow-y:auto;background:rgba(253,248,255,0.96);border:2px solid #e9d5ff;border-radius:16px;padding:12px 14px;box-sizing:border-box}
.jc-pt-below{display:none;margin-top:12px;background:#fdf8ff;border:2px solid #e9d5ff;border-radius:16px;padding:12px 14px}
@media (max-width:700px){.jc-pt-overlay{display:none}.jc-pt-below{display:block}}
`;

const PDF_URL = '/stories/jungle-council/Wisdom-of-the-Jungle-Council.pdf';

function PictureBook() {
  const [p, setP] = useState(0);
  const go = (n: number) => { setP(n); soundEffects.playStrokeChime(); };
  return (
    <>
      <style>{PT_CSS}</style>
      <div className="psw-story-slide-counter" style={{ textAlign: 'center', marginBottom: 8 }}>Page <strong>{p + 1}</strong> of {PAGES.length}</div>
      <div style={{ background: '#fffbeb', borderRadius: 20, padding: 12, border: '2px solid #fde68a', textAlign: 'center' }}>
        <div style={{ position: 'relative', display: 'inline-block', maxWidth: '100%' }}>
          <img src={PAGES[p]} alt={`Storybook page ${p + 1}`} loading="eager"
            style={{ display: 'block', maxWidth: '100%', width: 'auto', maxHeight: '75vh', borderRadius: 14, boxShadow: '0 6px 20px rgba(0,0,0,0.12)', background: '#fff' }} />
          {p === 0 && <div className="jc-pt-overlay"><PanchatantraNote compact /></div>}
        </div>
        {p === 0 && <div className="jc-pt-below"><PanchatantraNote /></div>}
        <div style={{ marginTop: 12 }}>
          <div lang="sa" style={{ fontSize: 24, fontWeight: 700, color: '#581c87' }}>
            {PAGE_SA[p].sa}{' '}
            <button type="button" className="psw-dialogue-audio-btn" onClick={() => playStoryLine(PAGE_SA[p].sa)}>🔊</button>
          </div>
          <div style={{ fontStyle: 'italic', color: '#6b7280' }}>{devanagariToIast(PAGE_SA[p].sa)}</div>
          <div style={{ color: '#3f3f46' }}>{PAGE_SA[p].en}</div>
        </div>
        {p === 0 && <Credits />}
        {p === PAGES.length - 1 && <><ArticleLink /><Credits /></>}
        {PAGES.map((src, k) => (k === p + 1 ? <link key={k} rel="prefetch" href={src} /> : null))}
      </div>
      <div className="psw-story-nav-row">
        <button type="button" className="psw-nav-arrow-btn" disabled={p === 0} onClick={() => go(p - 1)}>← Previous</button>
        <div className="psw-story-dots">
          {PAGES.map((_, k) => (
            <button key={k} type="button" className={`psw-dot ${k === p ? 'is-active' : ''}`} onClick={() => go(k)} aria-label={`Go to page ${k + 1}`} />
          ))}
        </div>
        <button type="button" className="psw-nav-arrow-btn" disabled={p === PAGES.length - 1} onClick={() => go(p + 1)}>Next →</button>
      </div>
    </>
  );
}

const tabBtn = (on: boolean): React.CSSProperties => ({
  padding: '8px 16px', borderRadius: 999, border: '2px solid #e9d5ff', cursor: 'pointer', fontWeight: 700,
  background: on ? '#f5d0fe' : '#ffffff', color: '#581c87',
});

export default function JungleCouncilStory() {
  const [mode, setMode] = useState<'book' | 'cards' | 'quiz'>('book');
  const [i, setI] = useState(0);
  const s = SLIDES[i];
  const go = (n: number) => { setI(n); soundEffects.playStrokeChime(); };
  return (
    <div className="psw-card-bench">
      <div className="psw-bench-header">
        <div>
          <h3 className="psw-section-heading">🦁 वनसभायाः विवेकः · The Wisdom of the Jungle Council</h3>
          <p className="psw-section-sub">A fox's fibs, a proud lion, and how every animal — big or tiny — saves the day. Tap 🔊 to hear names!</p>
        </div>
        {mode === 'cards' && <div className="psw-story-slide-counter">Slide <strong>{i + 1}</strong> of {SLIDES.length}</div>}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', alignItems: 'center', margin: '8px 0 14px' }}>
        <button type="button" style={tabBtn(mode === 'book')} onClick={() => setMode('book')}>📖 Picture book</button>
        <button type="button" style={tabBtn(mode === 'cards')} onClick={() => setMode('cards')}>🃏 Story cards</button>
        <button type="button" style={tabBtn(mode === 'quiz')} onClick={() => setMode('quiz')}>❓ Quiz</button>
        <a href={PDF_URL} download style={{ ...tabBtn(false), textDecoration: 'none', background: '#dcfce7', borderColor: '#bbf7d0', color: '#166534' }}>⬇️ Download PDF</a>
      </div>
      {mode === 'book' ? <PictureBook /> : mode === 'quiz' ? <Quiz /> : <>
      <div style={{ background: s.bg, borderRadius: 20, padding: '20px 22px', color: '#3f3f46', border: '2px solid #fde68a' }}>
        <div style={{ fontSize: 56, textAlign: 'center' }}>{s.icon}</div>
        <h3 style={{ textAlign: 'center', margin: '6px 0 12px' }}>
          <span lang="sa">{s.titleSa}</span>{' '}
          <button type="button" className="psw-dialogue-audio-btn" onClick={() => playStoryLine(s.titleSa)}>🔊</button>
          <br /><small style={{ color: '#6b7280', fontStyle: 'italic' }}>{devanagariToIast(s.titleSa)}</small>
          <br /><small>{s.titleEn}</small>
        </h3>
        <p style={{ fontSize: 18, lineHeight: 1.6, maxWidth: 720, margin: '0 auto 16px' }}>{s.text}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
          {s.cast.map((c, k) => (
            <button key={k} type="button"
              onClick={() => playStoryLine(c.sa)}
              style={{ background: '#ffffffcc', border: '2px solid #e9d5ff', borderRadius: 16, padding: '10px 14px', minWidth: 120, cursor: 'pointer' }}
              title={`Hear ${c.sa}`}>
              <div style={{ fontSize: 34 }}>{c.icon}</div>
              <div lang="sa" style={{ fontWeight: 700, fontSize: 18 }}>{c.sa} 🔊</div>
              <div style={{ fontStyle: 'italic', color: '#6b7280', fontSize: 13 }}>{devanagariToIast(c.sa)}</div>
              <div style={{ fontSize: 13 }}>{c.en}</div>
              {c.sound && <div style={{ marginTop: 4, color: '#b45309', fontWeight: 600 }}>“{c.sound}”</div>}
            </button>
          ))}
        </div>
        {i === SLIDES.length - 1 && <ArticleLink />}
      </div>
      <div className="psw-story-nav-row">
        <button type="button" className="psw-nav-arrow-btn" disabled={i === 0} onClick={() => go(i - 1)}>← Previous</button>
        <div className="psw-story-dots">
          {SLIDES.map((_, k) => (
            <button key={k} type="button" className={`psw-dot ${k === i ? 'is-active' : ''}`} onClick={() => go(k)} aria-label={`Go to slide ${k + 1}`} />
          ))}
        </div>
        <button type="button" className="psw-nav-arrow-btn" disabled={i === SLIDES.length - 1} onClick={() => go(i + 1)}>Next →</button>
      </div>
      </>}
    </div>
  );
}
