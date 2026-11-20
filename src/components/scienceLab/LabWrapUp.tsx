import { useEffect, useMemo, useState } from 'react';
import { LAB_WRAP_UPS, type LabWrapQuestion } from './labWrapUps';
import { markLabCompleted } from './missionControlData';
import type { LabSegmentId } from './common';

export interface LabWrapUpProps {
  labId: LabSegmentId;
  labTitle: string;
  prevLabel: string | null;
  nextLabel: string | null;
  onPrev: (() => void) | null;
  onNext: (() => void) | null;
  onBackToCatalog: () => void;
}

function CheckQuiz({ questions, labId }: { questions: LabWrapQuestion[]; labId: string }) {
  const [picked, setPicked] = useState<(number | null)[]>(() => questions.map(() => null));
  const [revealed, setRevealed] = useState(false);
  const score = useMemo(
    () => questions.reduce((n, q, i) => n + (picked[i] === q.answer ? 1 : 0), 0),
    [questions, picked],
  );

  useEffect(() => {
    if (revealed && score === questions.length && questions.length > 0) {
      markLabCompleted(labId, 3);
    }
  }, [revealed, score, questions.length, labId]);

  return (
    <div className="vl-wrapup-quiz">
      <h4 className="vl-wrapup-quiz-title">Check your understanding</h4>
      <p className="vl-wrapup-quiz-lead">Three short questions from this game only.</p>
      <ol className="vl-wrapup-quiz-list">
        {questions.map((q, qi) => (
          <li key={qi} className="vl-wrapup-q">
            <p className="vl-wrapup-q-stem">{q.q}</p>
            <div className="vl-wrapup-choices" role="radiogroup" aria-label={`Question ${qi + 1}`}>
              {q.choices.map((choice, ci) => {
                const selected = picked[qi] === ci;
                const show = revealed && selected;
                const ok = ci === q.answer;
                return (
                  <button
                    key={ci}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    className={[
                      'vl-wrapup-choice',
                      selected ? 'is-selected' : '',
                      show && ok ? 'is-correct' : '',
                      show && !ok ? 'is-wrong' : '',
                      revealed && ok ? 'is-answer' : '',
                    ].filter(Boolean).join(' ')}
                    onClick={() => {
                      setRevealed(false);
                      setPicked((prev) => {
                        const next = [...prev];
                        next[qi] = ci;
                        return next;
                      });
                    }}
                  >
                    {choice}
                  </button>
                );
              })}
            </div>
          </li>
        ))}
      </ol>
      <div className="vl-wrapup-quiz-actions">
        <button
          type="button"
          className="vl-wrapup-check-btn"
          disabled={picked.some((p) => p === null)}
          onClick={() => setRevealed(true)}
        >
          Check answers
        </button>
        {revealed && (
          <p className="vl-wrapup-score" aria-live="polite">
            {score} of {questions.length} correct.
          </p>
        )}
      </div>
    </div>
  );
}

export default function LabWrapUp({
  labId,
  labTitle,
  prevLabel,
  nextLabel,
  onPrev,
  onNext,
  onBackToCatalog,
}: LabWrapUpProps) {
  const data = LAB_WRAP_UPS[labId];
  if (!data) return null;

  return (
    <section className="vl-wrapup" aria-labelledby="vl-wrapup-heading">
      <header className="vl-wrapup-head">
        <p className="vl-wrapup-kicker">End of this game</p>
        <h3 id="vl-wrapup-heading" className="vl-wrapup-title">
          What you learned in {labTitle}
        </h3>
      </header>
      <p className="vl-wrapup-learned">{data.learned}</p>
      {data.terms.length > 0 && (
        <ul className="vl-wrapup-terms">
          {data.terms.map((t) => (
            <li key={t.iast}>
              <span className="vl-wrapup-term-dev">{t.dev}</span>
              <span className="vl-wrapup-term-iast">{t.iast}</span>
              <span className="vl-wrapup-term-en">{t.en}</span>
            </li>
          ))}
        </ul>
      )}
      {data.check && data.check.length > 0 && <CheckQuiz questions={data.check} labId={labId} />}
      <div className="vl-wrapup-nav">
        <button type="button" className="vl-wrapup-back" onClick={onBackToCatalog}>
          Back to all games
        </button>
        <div className="vl-wrapup-prevnext">
          {onPrev && prevLabel && (
            <button type="button" className="vl-wrapup-prev" onClick={onPrev}>
              Previous: {prevLabel}
            </button>
          )}
          {onNext && nextLabel && (
            <button type="button" className="vl-wrapup-next" onClick={onNext}>
              Try next: {nextLabel}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
