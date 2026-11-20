import { useEffect, useRef } from 'react';
import '../../styles/science-lab.css';
import { markLabCompleted } from './missionControlData';

export interface LabLadderRung {
  id: string;
  label: string;
  target: string;
}

export default function LabChallengeLadder({
  labId,
  title = 'Challenge ladder',
  rungs,
  doneIds,
  currentId,
  feedback,
  onSelect,
}: {
  labId: string;
  title?: string;
  rungs: LabLadderRung[];
  doneIds: string[];
  currentId?: string;
  feedback?: string | null;
  onSelect?: (id: string) => void;
}) {
  const allDone = rungs.length > 0 && rungs.every((r) => doneIds.includes(r.id));
  const awardedRef = useRef(false);
  useEffect(() => {
    if (allDone && !awardedRef.current) {
      awardedRef.current = true;
      markLabCompleted(labId, 3);
    }
  }, [allDone, labId]);

  const doneCount = rungs.filter((r) => doneIds.includes(r.id)).length;
  const currentIndex = currentId
    ? rungs.findIndex((r) => r.id === currentId)
    : rungs.findIndex((r) => !doneIds.includes(r.id));
  const displayRung = allDone ? rungs.length : Math.max(1, (currentIndex >= 0 ? currentIndex : doneCount) + 1);

  return (
    <section className="vl-ladder" aria-label={title}>
      <header className="vl-ladder-head">
        <h3 className="vl-ladder-title">{title}</h3>
        <p className="vl-ladder-progress">
          Rung {displayRung}/{rungs.length}
          {allDone ? ' — complete' : ''}
        </p>
      </header>
      <ol className="vl-ladder-list">
        {rungs.map((r, i) => {
          const done = doneIds.includes(r.id);
          const current = !done && (currentId ? currentId === r.id : currentIndex === i);
          const cls = `vl-ladder-rung${done ? ' is-done' : ''}${current ? ' is-current' : ''}`;
          const body = (
            <>
              <span className="vl-ladder-idx" aria-hidden="true">
                {done ? 'Done' : i + 1}
              </span>
              <span className="vl-ladder-copy">
                <span className="vl-ladder-label">{r.label}</span>
                <span className="vl-ladder-target">{r.target}</span>
              </span>
            </>
          );
          return (
            <li key={r.id} className={cls}>
              {onSelect ? (
                <button type="button" className="vl-ladder-btn" onClick={() => onSelect(r.id)} aria-current={current ? 'step' : undefined}>
                  {body}
                </button>
              ) : (
                <div className="vl-ladder-static" aria-current={current ? 'step' : undefined}>
                  {body}
                </div>
              )}
            </li>
          );
        })}
      </ol>
      {feedback ? (
        <p className={`vl-ladder-feedback${allDone ? ' is-ok' : ''}`} aria-live="polite">
          {feedback}
        </p>
      ) : null}
      {allDone ? <p className="vl-ladder-award">Final challenge complete. Vidyā Stars recorded.</p> : null}
    </section>
  );
}
