import React, { useMemo, useState } from 'react';
import type { DhatuEntry } from '../types/linguistics';
import {
  getLatForms,
  NUMBER_LABELS,
  PERSON_LABELS,
  type LatTable,
} from '../utils/latForms';
import { playPronunciation } from '../utils/pronunciation';

type LatFormsTableProps = {
  entry: DhatuEntry;
};

const LatFormsTable: React.FC<LatFormsTableProps> = ({ entry }) => {
  const result = useMemo(() => getLatForms(entry), [entry]);
  const hasP = Boolean(result.parasmaipada);
  const hasA = Boolean(result.atmanepada);
  const both = hasP && hasA;

  const [voice, setVoice] = useState<'P' | 'A'>(hasP ? 'P' : 'A');

  if (result.status === 'coming_soon' || (!hasP && !hasA)) {
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

  const activeVoice: 'P' | 'A' = both ? voice : hasP ? 'P' : 'A';
  const active: LatTable =
    activeVoice === 'P' ? result.parasmaipada! : result.atmanepada!;
  const voiceLabel =
    activeVoice === 'P' ? 'परस्मैपद · Parasmaipada' : 'आत्मनेपद · Ātmanepada';

  return (
    <div className="dp-lat">
      <div className="dp-lat-header">
        <h4 className="dp-detail-heading">लट् · Present (Laṭ) · 3×3</h4>
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
                {active.forms[ri].map((form, ci) => (
                  <td key={`${ri}-${ci}`}>
                    <button
                      type="button"
                      className="dp-lat-cell"
                      title={`Pronounce ${form}`}
                      aria-label={`${person.en} ${NUMBER_LABELS[ci].en}: ${form}`}
                      onClick={() => playPronunciation(form)}
                    >
                      <span className="dp-lat-form">{form}</span>
                      <span className="dp-lat-speak" aria-hidden="true">
                        🔊
                      </span>
                    </button>
                  </td>
                ))}
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
