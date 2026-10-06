import React, { useState } from 'react';
import { playPronunciation } from '../../utils/pronunciation';

export type LabSegmentId = 'paramanu' | 'prakriti' | 'jyotisha' | 'srishti-sthiti-laya' | 'nada-brahman' | 'asato-ma';

export interface LabTerm {
  dev: string;
  iast: string;
  en: string;
  note?: string;
}

/** Tap a term to hear it with the site's generic Sanskrit pronunciation helper. */
export const TermPanel: React.FC<{ title?: string; terms: LabTerm[] }> = ({ title = 'Sanskrit words in this lab', terms }) => (
  <section className="vl-panel vl-terms" aria-label={title}>
    <h3 className="vl-panel-title">
      <span aria-hidden="true">🔤</span> {title}
      <span className="vl-panel-hint">Tap a word to hear it</span>
    </h3>
    <ul className="vl-term-list">
      {terms.map((t) => (
        <li key={t.iast}>
          <button
            type="button"
            className="vl-term"
            onClick={() => playPronunciation(t.dev)}
            title={`Hear ${t.iast}`}
          >
            <span className="vl-term-dev" lang="sa">{t.dev}</span>
            <span className="vl-term-iast">{t.iast}</span>
            <span className="vl-term-en">{t.en}</span>
            {t.note && <span className="vl-term-note">{t.note}</span>}
          </button>
        </li>
      ))}
    </ul>
  </section>
);

export interface LabChallenge {
  q: string;
  options: string[];
  answer: number;
  explain: string;
}

export const ChallengeList: React.FC<{ items: LabChallenge[]; title?: string }> = ({ items, title = 'Quick challenges' }) => {
  const [picked, setPicked] = useState<Record<number, number>>({});
  const solved = items.filter((_, i) => picked[i] === items[i].answer).length;
  return (
    <section className="vl-panel vl-challenges" aria-label={title}>
      <h3 className="vl-panel-title">
        <span aria-hidden="true">🎯</span> {title}
        <span className="vl-score">{solved} / {items.length} ✓</span>
      </h3>
      <ol className="vl-ch-list">
        {items.map((c, i) => {
          const choice = picked[i];
          const answered = choice !== undefined;
          const right = answered && choice === c.answer;
          return (
            <li key={c.q} className="vl-ch">
              <p className="vl-ch-q">{c.q}</p>
              <div className="vl-ch-opts">
                {c.options.map((o, j) => (
                  <button
                    key={o}
                    type="button"
                    className={`vl-ch-opt${answered && j === choice ? (right ? ' is-right' : ' is-wrong') : ''}`}
                    onClick={() => setPicked((p) => ({ ...p, [i]: j }))}
                  >
                    {o}
                  </button>
                ))}
              </div>
              {answered && (
                <p className={`vl-ch-feedback ${right ? 'is-right' : 'is-wrong'}`} role="status">
                  {right ? '✓ Yes! ' : '✗ Not quite. Try again. '}
                  {right && c.explain}
                </p>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
};

export const CoreIdea: React.FC<{ children: React.ReactNode; note?: React.ReactNode }> = ({ children, note }) => (
  <div className="vl-core">
    <div className="vl-core-tag">💡 Core idea</div>
    <div className="vl-core-body">{children}</div>
    {note && <div className="vl-core-note">{note}</div>}
  </div>
);
