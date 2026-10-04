import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { DhatuEntry } from '../types/linguistics';
import {
  getLatForms,
  NUMBER_LABELS,
  PERSON_LABELS,
  type LatTable,
} from '../utils/latForms';
import { personNumberEnglish } from '../utils/personGloss';
import { playBilingualSequence } from '../utils/pronunciation';

type LatFormsTableProps = {
  entry: DhatuEntry;
};

type LatCell = { sanskrit: string };

const PLAY_ALL_LABEL = 'Reads the nine forms in Sanskrit';

const LatFormsTable: React.FC<LatFormsTableProps> = ({ entry }) => {
  const result = useMemo(() => getLatForms(entry), [entry]);
  const hasP = Boolean(result.parasmaipada);
  const hasA = Boolean(result.atmanepada);
  const both = hasP && hasA;

  const [voice, setVoice] = useState<'P' | 'A'>(hasP ? 'P' : 'A');
  const [playingAll, setPlayingAll] = useState(false);
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);
  const stopRef = useRef<(() => void) | null>(null);
  /** Cell to replay after Pause. Reset when the pada or the root changes, and when the queue finishes. */
  const resumeIndexRef = useRef(0);
  const tokenRef = useRef(0);

  const activeVoice: 'P' | 'A' = both ? voice : hasP ? 'P' : 'A';
  const active: LatTable | null =
    result.status === 'coming_soon' || (!hasP && !hasA)
      ? null
      : activeVoice === 'P'
        ? result.parasmaipada!
        : result.atmanepada!;

  const cells = useMemo<LatCell[]>(() => {
    if (!active) return [];
    const list: LatCell[] = [];
    active.forms.forEach((row) => {
      row.forEach((form) => {
        list.push({ sanskrit: form });
      });
    });
    return list;
  }, [active]);

  const cellsRef = useRef(cells);
  cellsRef.current = cells;

  const entryKey = entry.id || entry.devanagari;

  useEffect(() => {
    tokenRef.current += 1;
    stopRef.current?.();
    stopRef.current = null;
    resumeIndexRef.current = 0;
    setPlayingAll(false);
    setSpeakingIndex(null);
    return () => {
      tokenRef.current += 1;
      stopRef.current?.();
      stopRef.current = null;
    };
  }, [entryKey, activeVoice]);

  const cancelOwned = () => {
    tokenRef.current += 1;
    stopRef.current?.();
    stopRef.current = null;
  };

  const startPlayAll = (start: number) => {
    cancelOwned();
    const list = cellsRef.current;
    if (!list.length) return;
    const index = start >= list.length ? 0 : Math.max(0, start);
    const slice = list.slice(index);
    const token = tokenRef.current;
    resumeIndexRef.current = index;
    setPlayingAll(true);
    setSpeakingIndex(index);
    stopRef.current = playBilingualSequence(
      slice.map(({ sanskrit }) => ({ sanskrit })),
      {
      gapMs: 250,
      onItem: (itemIndex) => {
        if (tokenRef.current !== token) return;
        const absolute = index + itemIndex;
        resumeIndexRef.current = absolute;
        setSpeakingIndex(absolute);
      },
      onDone: () => {
        if (tokenRef.current !== token) return;
        stopRef.current = null;
        setPlayingAll(false);
        setSpeakingIndex(null);
        resumeIndexRef.current = 0;
      },
    });
  };

  const togglePlayAll = () => {
    if (playingAll) {
      // Pause keeps resumeIndexRef on the cell that had not finished.
      cancelOwned();
      setPlayingAll(false);
      setSpeakingIndex(null);
      return;
    }
    startPlayAll(resumeIndexRef.current);
  };

  const speakCell = (cellIndex: number) => {
    // A single tap cancels Play all so the two never talk over each other.
    // Next Play all starts at the first cell; only Pause resumes mid-table.
    cancelOwned();
    setPlayingAll(false);
    resumeIndexRef.current = 0;
    const cell = cellsRef.current[cellIndex];
    if (!cell) {
      setSpeakingIndex(null);
      return;
    }
    const token = tokenRef.current;
    setSpeakingIndex(cellIndex);
    stopRef.current = playBilingualSequence([{ sanskrit: cell.sanskrit }], {
        gapMs: 250,
        onItem: () => {
          if (tokenRef.current !== token) return;
          setSpeakingIndex(cellIndex);
        },
        onDone: () => {
          if (tokenRef.current !== token) return;
          stopRef.current = null;
          setSpeakingIndex(null);
        },
      },
    );
  };

  if (!active) {
    return (
      <div className="dp-lat dp-lat--soon" role="status">
        <h4 className="dp-detail-heading">लट् · Present (Laṭ) · 3×3</h4>
        <p className="dp-lat-soon-msg">
          Forms coming soon for <strong>{entry.devanagari}</strong>. We only show tables we trust for
          students.
        </p>
      </div>
    );
  }

  const voiceLabel =
    activeVoice === 'P' ? 'परस्मैपद · Parasmaipada' : 'आत्मनेपद · Ātmanepada';

  return (
    <div className="dp-lat">
      <div className="dp-lat-header">
        <div className="dp-lat-title">
          <h4 className="dp-detail-heading">लट् · Present (Laṭ) · 3×3</h4>
          <button
            type="button"
            className={`dp-playall${playingAll ? ' dp-playall--active' : ''}`}
            onClick={togglePlayAll}
            aria-pressed={playingAll}
            aria-label={
              playingAll
                ? `Pause. ${PLAY_ALL_LABEL}`
                : `Play all nine forms in Sanskrit`
            }
          >
            {playingAll ? '⏸ Pause' : '▶ Play all'}
          </button>
        </div>
        <span className="dp-lat-source" title={result.note || undefined}>
          {result.source === 'generated' ? 'pattern · thematic' : 'curated school forms'}
        </span>
      </div>

      {both && (
        <div className="dp-lat-tabs" role="tablist" aria-label="Pada / voice">
          <button
            type="button"
            role="tab"
            aria-selected={activeVoice === 'P'}
            className={`dp-lat-tab${activeVoice === 'P' ? ' dp-lat-tab--active' : ''}`}
            onClick={() => setVoice('P')}
          >
            परस्मैपद · P
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeVoice === 'A'}
            className={`dp-lat-tab${activeVoice === 'A' ? ' dp-lat-tab--active' : ''}`}
            onClick={() => setVoice('A')}
          >
            आत्मनेपद · Ā
          </button>
        </div>
      )}

      <p className="dp-lat-voice-label">{voiceLabel}</p>

      <div className="dp-lat-scroll">
        <table className="dp-lat-table" aria-label={`Laṭ forms for ${entry.devanagari}`}>
          <thead>
            <tr>
              <th scope="col">पुरुष \\ वचन</th>
              {NUMBER_LABELS.map((n) => (
                <th scope="col" key={n.sa}>
                  <span className="dp-lat-th-sa">{n.sa}</span>
                  <span className="dp-lat-th-en">{n.en}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PERSON_LABELS.map((person, ri) => (
              <tr key={person.sa}>
                <th scope="row">
                  <span className="dp-lat-th-sa">{person.sa}</span>
                  <span className="dp-lat-th-en">{person.en}</span>
                </th>
                {active.forms[ri].map((form, ci) => {
                  const gloss = personNumberEnglish(entry, ri, ci);
                  const cellIndex = ri * NUMBER_LABELS.length + ci;
                  const speaking = speakingIndex === cellIndex;
                  return (
                    <td key={`${ri}-${ci}`}>
                      <button
                        type="button"
                        className={`dp-lat-cell${speaking ? ' dp-lat-cell--speaking' : ''}`}
                        title={`Pronounce ${form}`}
                        aria-label={`${form}: ${gloss}`}
                        aria-current={speaking ? 'true' : undefined}
                        onClick={() => speakCell(cellIndex)}
                      >
                        <span className="dp-lat-form">{form}</span>
                        <span className="dp-lat-gloss">{gloss}</span>
                        <span className="dp-lat-speak" aria-hidden="true">
                          🔊
                        </span>
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="dp-lat-tip">Tap any form to hear it · लट् = present tense</p>
    </div>
  );
};

export default LatFormsTable;
