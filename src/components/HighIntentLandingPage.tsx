import React, { useState } from 'react';
import landingsData from '../data/intentLandings.json';
import { GRADE_7_SYLLABUS } from '../data/grade7Syllabus';
import { GRADE_8_SYLLABUS } from '../data/grade8Syllabus';
import { GRADE_9_SYLLABUS } from '../data/grade9Syllabus';
import WordAnalyzer, { type ExternalWordSelection } from './WordAnalyzer';
import '../styles/high-intent-landing.css';
import '../styles/word-analyzer.css';

export interface IntentLanding {
  id: string;
  path: string;
  aliases: string[];
  title: string;
  desc: string;
  kicker: string;
  h1: string;
  syllabus: 'g7' | 'g8' | 'g9' | null;
  embedAnalyzer?: boolean;
  intro: string[];
  gets: string[];
  ctas: { label: string; action: string; primary?: boolean }[];
  faq: { q: string; a: string }[];
  related: string[];
  links?: { label: string; href: string }[];
}

export const INTENT_LANDINGS = landingsData as IntentLanding[];

export const landingForPath = (pathname: string): IntentLanding | null => {
  const clean = pathname.replace(/\/+$/, '').toLowerCase() || '/';
  return INTENT_LANDINGS.find((l) => l.path === clean || l.aliases.includes(clean)) || null;
};

export const landingById = (id: string | null): IntentLanding | null =>
  INTENT_LANDINGS.find((l) => l.id === id) || null;

const SYLLABI = {
  g7: { label: 'Class 7 Deepakam (दीपकम्) chapters', items: GRADE_7_SYLLABUS },
  g8: { label: 'Class 8 Deepakam (दीपकम्) chapters', items: GRADE_8_SYLLABUS },
  g9: { label: 'Class 9 Sharada (शारदा) chapters', items: GRADE_9_SYLLABUS },
} as const;

interface Props {
  landing: IntentLanding;
  /** Action strings from intentLandings.json, e.g. 'reader:gsde101', 'grammar:vibhakti', 'cbse-guide'. */
  onAction: (action: string) => void;
}

const HighIntentLandingPage: React.FC<Props> = ({ landing, onAction }) => {
  const [word, setWord] = useState('');
  const [selection, setSelection] = useState<ExternalWordSelection | null>(null);
  const syllabus = landing.syllabus ? SYLLABI[landing.syllabus] : null;
  const chapters = syllabus
    ? (syllabus.items as Array<{ id: string; title: string; englishTitle?: string }>).filter(
        (c) => !/purovak|bhumika/.test(c.id),
      )
    : [];

  return (
    <article className="intent-landing">
      <header className="intent-landing__hero">
        <p className="intent-landing__kicker">{landing.kicker}</p>
        <h1>{landing.h1}</h1>
        {(landing.syllabus === 'g8' || landing.syllabus === 'g9') && (
          <p className="intent-landing__free" style={{display:'inline-block',margin:'.4rem 0 .6rem',padding:'.35rem .75rem',borderRadius:999,background:'#eef7ee',border:'1px solid #b9dcb9',color:'#1f5a1f',fontSize:'.9rem',fontWeight:600}}>
            ✓ Free without an account: the Invocation (प्रार्थना) + Chapter 1
          </p>
        )}
        {landing.intro.map((p, i) => (
          <p key={i} className="intent-landing__intro">{p}</p>
        ))}
        <div className="intent-landing__ctas">
          {landing.ctas.map((c) => (
            <button
              key={c.action}
              type="button"
              className={`intent-landing__btn${c.primary ? ' intent-landing__btn--primary' : ''}`}
              onClick={() => onAction(c.action)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </header>

      {landing.embedAnalyzer && (
        <section className="intent-landing__section intent-landing__analyzer">
          <h2>Deconstruct a word · पदं विश्लेषय</h2>
          <form
            className="intent-landing__analyzer-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (word.trim()) setSelection({ text: word.trim(), nonce: Date.now(), speak: true });
            }}
          >
            <input
              value={word}
              onChange={(e) => setWord(e.target.value)}
              placeholder="e.g. विद्यालयः, गच्छति, संस्कृतम्"
              aria-label="Sanskrit word to deconstruct"
              lang="sa"
            />
            <button type="submit" className="intent-landing__btn intent-landing__btn--primary">Deconstruct</button>
          </form>
          <div className="intent-landing__examples">
            {['संस्कृतम्', 'विद्यालयः', 'गच्छति', 'पुस्तकम्'].map((w) => (
              <button key={w} type="button" onClick={() => { setWord(w); setSelection({ text: w, nonce: Date.now(), speak: true }); }}>{w}</button>
            ))}
          </div>
          <WordAnalyzer externalSelection={selection} />
        </section>
      )}

      <section className="intent-landing__section">
        <h2>What you get</h2>
        <ul className="intent-landing__gets">
          {landing.gets.map((g) => <li key={g}>{g}</li>)}
        </ul>
      </section>

      {syllabus && chapters.length > 0 && (
        <section className="intent-landing__section">
          <h2>{syllabus.label}</h2>
          <ol className="intent-landing__chapters">
            {chapters.map((c) => (
              <li key={c.id}>
                <button type="button" onClick={() => onAction(`reader:${c.id}`)}>
                  <span lang="sa">{c.title}</span>
                  {c.englishTitle && <small>{c.englishTitle}</small>}
                </button>
              </li>
            ))}
          </ol>
        </section>
      )}

      {landing.links && landing.links.length > 0 && (
        <nav className="intent-landing__section intent-landing__related" aria-label="Explore">
          <h2>Explore on EdNet Learn</h2>
          <ul>
            {landing.links.map((l) => (
              <li key={l.href}><a href={l.href}>{l.label}</a></li>
            ))}
          </ul>
        </nav>
      )}

      <section className="intent-landing__section">
        <h2>Frequently asked questions</h2>
        {landing.faq.map((f) => (
          <details key={f.q} className="intent-landing__faq">
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </section>

      <nav className="intent-landing__section intent-landing__related" aria-label="Related study goals">
        <h2>{landing.links ? 'Keep exploring' : 'Related study goals'}</h2>
        <ul>
          {landing.related.map((rid) => {
            const r = landingById(rid);
            return r ? (
              <li key={rid}>
                <a href={r.path} onClick={(e) => { e.preventDefault(); onAction(`landing:${r.id}`); }}>{r.h1}</a>
              </li>
            ) : null;
          })}
        </ul>
      </nav>
    </article>
  );
};

export default HighIntentLandingPage;
