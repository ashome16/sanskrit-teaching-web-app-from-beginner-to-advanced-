import React, { useEffect, useMemo, useState } from 'react';
import type { DhatuEntry } from '../types/linguistics';
import {
  GANA_LABELS,
  PADAM_LABELS,
  loadDhatupatha,
  searchDhatupatha,
} from '../utils/dhatupatha';
import { playPronunciation } from '../utils/pronunciation';
import '../styles/dhatupatha.css';

type DhatupathaBrowserProps = {
  onGoBack?: () => void;
};

const GANA_ORDER = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

const DhatupathaBrowser: React.FC<DhatupathaBrowserProps> = ({ onGoBack }) => {
  const [entries, setEntries] = useState<DhatuEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [ganaFilter, setGanaFilter] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    loadDhatupatha()
      .then((data) => {
        if (!cancelled) {
          setEntries(data);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Could not load Dhātupāṭha');
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    let list = searchDhatupatha(entries, query);
    if (ganaFilter != null) {
      list = list.filter((e) => e.gana === ganaFilter || e.class === ganaFilter);
    }
    return list;
  }, [entries, query, ganaFilter]);

  const toggleExpand = (entry: DhatuEntry) => {
    const key = entry.id ?? entry.devanagari;
    setExpandedId((prev) => (prev === key ? null : key));
  };

  return (
    <div className="dp-browser" aria-label="Dhātupāṭha root browser">
      <div className="dp-toolbar">
        <div className="dp-search-row">
          <input
            type="search"
            className="dp-search"
            placeholder="Search · Devanagari / IAST / English / हिंदी…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search dhātus"
          />
          <span className="dp-meta" aria-live="polite">
            {loading ? 'Loading…' : `${filtered.length} of ${entries.length} roots`}
          </span>
        </div>
        <div className="dp-chips" role="group" aria-label="Filter by gaṇa">
          <button
            type="button"
            className={`dp-chip${ganaFilter == null ? ' dp-chip--active' : ''}`}
            onClick={() => setGanaFilter(null)}
          >
            All gaṇas
          </button>
          {GANA_ORDER.map((n) => (
            <button
              type="button"
              key={n}
              className={`dp-chip${ganaFilter === n ? ' dp-chip--active' : ''}`}
              onClick={() => setGanaFilter((prev) => (prev === n ? null : n))}
              title={GANA_LABELS[n]}
            >
              {n} · {GANA_LABELS[n]}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <p className="dp-status dp-status--error" role="alert">
          {error}
        </p>
      )}

      {!loading && !error && filtered.length === 0 && (
        <p className="dp-empty">No roots match this search. Try another spelling or clear the gaṇa filter.</p>
      )}

      <div className="dp-list">
        {filtered.map((entry) => {
          const key = entry.id ?? entry.devanagari;
          const open = expandedId === key;
          const gana = entry.gana ?? entry.class;
          const ganaName = entry.gana_name ?? (gana != null ? GANA_LABELS[gana] : undefined);
          const previewExamples = (entry.examples ?? []).slice(0, open ? undefined : 3);

          return (
            <article
              key={key}
              className={`dp-card${open ? ' dp-card--open' : ''}`}
              onClick={() => toggleExpand(entry)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleExpand(entry);
                }
              }}
              role="button"
              tabIndex={0}
              aria-expanded={open}
            >
              <div className="dp-card-top">
                <div>
                  <span className="dp-root">{entry.devanagari}</span>
                  <span className="dp-iast">{entry.transliteration}</span>
                </div>
                <button
                  type="button"
                  className="dp-audio"
                  title={`Pronounce ${entry.devanagari}`}
                  aria-label={`Pronounce ${entry.devanagari}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    playPronunciation(entry.devanagari);
                  }}
                >
                  🔊
                </button>
              </div>

              <div className="dp-meanings">
                <span className="dp-meaning-en">{entry.meaning}</span>
                {entry.meaning_hi && <span className="dp-meaning-hi">{entry.meaning_hi}</span>}
              </div>

              <div className="dp-tags">
                {gana != null && (
                  <span className="dp-tag dp-tag--gana">
                    Gaṇa {gana}
                    {ganaName ? ` · ${ganaName}` : ''}
                  </span>
                )}
                {entry.padam && (
                  <span className="dp-tag dp-tag--padam">{PADAM_LABELS[entry.padam]}</span>
                )}
                {entry.set_anit && (
                  <span className="dp-tag dp-tag--set">{entry.set_anit}</span>
                )}
              </div>

              {previewExamples.length > 0 && !open && (
                <div className="dp-examples-preview">
                  {previewExamples.map((ex) => (
                    <span className="dp-example-chip" key={ex}>
                      {ex}
                    </span>
                  ))}
                </div>
              )}

              {open && (
                <div className="dp-detail" onClick={(e) => e.stopPropagation()}>
                  {(entry.examples ?? []).length > 0 && (
                    <>
                      <h4 className="dp-detail-heading">Example forms</h4>
                      <ul className="dp-example-list">
                        {entry.examples!.map((ex) => (
                          <li key={ex}>
                            <button
                              type="button"
                              className="dp-example-btn"
                              onClick={() => playPronunciation(ex)}
                            >
                              {ex} <span aria-hidden="true">🔊</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  {entry.notes && entry.notes.trim() && (
                    <>
                      <h4 className="dp-detail-heading">Notes</h4>
                      <p className="dp-notes">{entry.notes}</p>
                    </>
                  )}
                  <p className="dp-hint">Tap the card again to collapse · Phase 1 library browse</p>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {onGoBack && (
        <footer className="grammar-article-footer" style={{ marginTop: '1rem' }}>
          <button type="button" className="grammar-back grammar-footer-btn" onClick={onGoBack}>
            ← Back to All Grammar Articles
          </button>
        </footer>
      )}
    </div>
  );
};

export default DhatupathaBrowser;
