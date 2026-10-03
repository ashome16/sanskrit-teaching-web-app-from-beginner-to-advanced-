import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { DhatuEntry, DhatuPadam } from '../types/linguistics';
import {
  GANA_HEADINGS,
  GANA_LABELS,
  MEANING_THEMES,
  PADAM_LABELS,
  loadDhatupatha,
  meaningThemeFor,
  searchDhatupatha,
} from '../utils/dhatupatha';
import { playPronunciation, playSequence } from '../utils/pronunciation';
import DhatupathaGuide from './DhatupathaGuide';
import LatFormsTable from './LatFormsTable';
import '../styles/dhatupatha.css';

type DhatupathaBrowserProps = {
  onGoBack?: () => void;
};

const GANA_ORDER = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

type BrowseMode = 'gana' | 'theme';

type BrowseSection = {
  key: string;
  index?: number;
  title: string;
  iast?: string;
  en?: string;
  roots: DhatuEntry[];
};

/** Page-only speech pace. Normal is Web Speech rate 1. Session only, not Bodhi. */
const DHATU_SPEEDS = [
  { id: 'slow', label: 'Slow', rate: 0.6 },
  { id: 'normal', label: 'Normal', rate: 1 },
  { id: 'fast', label: 'Fast', rate: 1.6 },
] as const;
type DhatuSpeed = (typeof DHATU_SPEEDS)[number]['id'];
const DHATU_SPEED_KEY = 'dhatupatha-speech-speed';

const isDhatuSpeed = (value: string | null): value is DhatuSpeed =>
  value === 'slow' || value === 'normal' || value === 'fast';

const loadDhatuSpeed = (): DhatuSpeed => {
  try {
    const saved = sessionStorage.getItem(DHATU_SPEED_KEY);
    if (isDhatuSpeed(saved)) return saved;
  } catch {
    // Private mode / no storage — keep the default.
  }
  return 'normal';
};

const rateForSpeed = (speed: DhatuSpeed): number =>
  DHATU_SPEEDS.find((item) => item.id === speed)?.rate ?? 1;

const DhatupathaBrowser: React.FC<DhatupathaBrowserProps> = ({ onGoBack }) => {
  const [entries, setEntries] = useState<DhatuEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [browseMode, setBrowseMode] = useState<BrowseMode>('gana');
  const [ganaFilter, setGanaFilter] = useState<number | null>(null);
  const [padamFilter, setPadamFilter] = useState<DhatuPadam | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [revealTick, setRevealTick] = useState(0);
  /** True while ▶ Play all is speaking the visible roots. */
  const [playingAll, setPlayingAll] = useState(false);
  const [speakingKey, setSpeakingKey] = useState<string | null>(null);
  const stopPlayAllRef = useRef<(() => void) | null>(null);
  /** Index in the current visible list to resume from after Pause. */
  const resumeIndexRef = useRef(0);
  const playTokenRef = useRef(0);
  const filteredRef = useRef<DhatuEntry[]>([]);
  /** Root id to scroll into view once its card is on screen. */
  const revealKeyRef = useRef<string | null>(null);
  const [speechSpeed, setSpeechSpeed] = useState<DhatuSpeed>(loadDhatuSpeed);
  const speechSpeedRef = useRef<DhatuSpeed>(speechSpeed);
  speechSpeedRef.current = speechSpeed;
  const playbackBarRef = useRef<HTMLDivElement>(null);

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

  const entryKey = (entry: DhatuEntry) => entry.id ?? entry.devanagari;

  const stopPlayAll = (resetIndex: boolean) => {
    playTokenRef.current += 1;
    stopPlayAllRef.current?.();
    stopPlayAllRef.current = null;
    setPlayingAll(false);
    setSpeakingKey(null);
    if (resetIndex) resumeIndexRef.current = 0;
  };

  useEffect(() => {
    return () => {
      stopPlayAllRef.current?.();
      stopPlayAllRef.current = null;
    };
  }, []);

  const filtered = useMemo(() => {
    let list = searchDhatupatha(entries, query);
    if (browseMode === 'gana' && ganaFilter != null) {
      list = list.filter((e) => e.gana === ganaFilter || e.class === ganaFilter);
    }
    if (padamFilter != null) {
      list = list.filter((e) => e.padam === padamFilter);
    }
    return list;
  }, [entries, query, ganaFilter, padamFilter, browseMode]);

  /** Visible roots in the active browse order so sections and Play all match. */
  const sections = useMemo((): BrowseSection[] => {
    if (browseMode === 'theme') {
      const buckets = new Map<string, DhatuEntry[]>();
      for (const entry of filtered) {
        const id = meaningThemeFor(entry.meaning ?? '');
        const list = buckets.get(id) ?? [];
        list.push(entry);
        buckets.set(id, list);
      }
      return MEANING_THEMES.flatMap((theme) => {
        const roots = buckets.get(theme.id);
        if (!roots?.length) return [];
        return [{ key: theme.id, title: theme.label, roots }];
      });
    }

    const buckets = new Map<number, DhatuEntry[]>();
    const other: DhatuEntry[] = [];
    for (const entry of filtered) {
      const gana = entry.gana ?? entry.class;
      if (gana != null && GANA_ORDER.includes(gana as (typeof GANA_ORDER)[number])) {
        const list = buckets.get(gana) ?? [];
        list.push(entry);
        buckets.set(gana, list);
      } else {
        other.push(entry);
      }
    }
    const headed: BrowseSection[] = GANA_ORDER.flatMap((n) => {
      const roots = buckets.get(n);
      if (!roots?.length) return [];
      const heading = GANA_HEADINGS[n];
      const iast = roots.find((e) => e.gana_name)?.gana_name ?? GANA_LABELS[n];
      return [{
        key: `gana-${n}`,
        index: n,
        title: heading?.san ?? `Gaṇa ${n}`,
        iast,
        en: heading?.en,
        roots,
      }];
    });
    if (other.length) {
      headed.push({ key: 'gana-other', title: 'Other', roots: other });
    }
    return headed;
  }, [filtered, browseMode]);

  const ordered = useMemo(() => sections.flatMap((section) => section.roots), [sections]);
  filteredRef.current = ordered;

  const hasPadam = useMemo(() => entries.some((e) => e.padam), [entries]);

  // A new search, filter, or browse mode shows a different list — drop the old queue.
  useEffect(() => {
    stopPlayAllRef.current?.();
    stopPlayAllRef.current = null;
    playTokenRef.current += 1;
    resumeIndexRef.current = 0;
    setPlayingAll(false);
    setSpeakingKey(null);
  }, [query, ganaFilter, padamFilter, browseMode]);

  // While Play all runs, pin speed + Pause under the site header (or the
  // screen top once the header has scrolled away). Fixed, not sticky: the
  // dashboard is its own scroll container, so sticky scrolls off on a phone.
  useEffect(() => {
    if (!playingAll) return;
    const bar = playbackBarRef.current;
    const place = () => {
      const header = document.querySelector<HTMLElement>('.dashboard-header');
      const bottom = header ? header.getBoundingClientRect().bottom : 0;
      const top = bottom > 8 ? Math.round(bottom) : 0;
      bar?.style.setProperty('--dp-stick-top', `${top}px`);
    };
    place();
    const header = document.querySelector('.dashboard-header');
    const observer = header ? new ResizeObserver(place) : null;
    if (header && observer) observer.observe(header);
    window.addEventListener('scroll', place, true);
    window.addEventListener('resize', place);
    return () => {
      observer?.disconnect();
      window.removeEventListener('scroll', place, true);
      window.removeEventListener('resize', place);
    };
  }, [playingAll]);

  /** Keep the root below the fixed pause bar (it is viewport-fixed, not in the scroller). */
  const scrollRootIntoView = (key: string) => {
    const el = document.querySelector<HTMLElement>(`[data-dhatu-id="${CSS.escape(key)}"]`);
    if (!el) return;
    const viewH = window.innerHeight || document.documentElement.clientHeight;
    const bar = playingAll ? playbackBarRef.current : null;
    const barBottom = bar ? bar.getBoundingClientRect().bottom : 0;
    let portTop = 0;
    let parent: HTMLElement | null = el.parentElement;
    while (parent) {
      const style = getComputedStyle(parent);
      const scrolls = /(auto|scroll)/.test(style.overflowY) && parent.scrollHeight > parent.clientHeight + 1;
      if (scrolls) {
        portTop = parent.getBoundingClientRect().top;
        break;
      }
      parent = parent.parentElement;
    }
    const topLimit = Math.max(8, barBottom + 12);
    const clearance = Math.max(8, topLimit - portTop);
    el.style.scrollMarginTop = `${Math.round(clearance)}px`;
    const rect = el.getBoundingClientRect();
    const covered = rect.top < topLimit - 4;
    const above = rect.bottom < topLimit;
    const below = rect.top > viewH - 24;
    if (!covered && !above && !below) return;
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  };

  useEffect(() => {
    if (!playingAll || !speakingKey) return;
    scrollRootIntoView(speakingKey);
  }, [playingAll, speakingKey]);

  useEffect(() => {
    const key = revealKeyRef.current;
    if (!key) return;
    if (!ordered.some((entry) => entryKey(entry) === key)) return;
    if (!document.querySelector(`[data-dhatu-id="${CSS.escape(key)}"]`)) return;
    revealKeyRef.current = null;
    requestAnimationFrame(() => scrollRootIntoView(key));
  }, [ordered, expandedId, revealTick]);

  const openListedRoot = (id: string) => {
    const entry = entries.find((item) => item.id === id);
    if (!entry) return;
    const key = entryKey(entry);
    revealKeyRef.current = key;
    setRevealTick((n) => n + 1);
    if (!ordered.some((item) => entryKey(item) === key)) {
      setQuery('');
      setGanaFilter(null);
      setPadamFilter(null);
    }
    setExpandedId(key);
  };

  const startPlayAll = (start: number) => {
    // Drop any queue already speaking so Next can restart on the chosen root.
    stopPlayAllRef.current?.();
    stopPlayAllRef.current = null;
    const list = filteredRef.current;
    if (!list.length) return;
    const index = start >= list.length ? 0 : Math.max(0, start);
    const slice = list.slice(index);
    const token = ++playTokenRef.current;
    resumeIndexRef.current = index;
    setPlayingAll(true);
    setSpeakingKey(entryKey(slice[0]));
    // plainDevanagari: Hindi voice speaks the root as Devanagari (no roman cues,
    // no Varṇamālā letter MP3s). Same speakConfigured pipeline as other words.
    stopPlayAllRef.current = playSequence(
      slice.map((entry) => entry.devanagari),
      {
        gapMs: 550,
        plainDevanagari: true,
        rate: () => rateForSpeed(speechSpeedRef.current),
        onItem: (_word, itemIndex) => {
          if (playTokenRef.current !== token) return;
          const entry = slice[itemIndex];
          resumeIndexRef.current = index + itemIndex;
          setSpeakingKey(entry ? entryKey(entry) : null);
        },
        onDone: () => {
          if (playTokenRef.current !== token) return;
          stopPlayAllRef.current = null;
          setPlayingAll(false);
          setSpeakingKey(null);
          resumeIndexRef.current = 0;
        },
      },
    );
  };

  const togglePlayAll = () => {
    if (playingAll) {
      // Pause: cancel speechSynthesis and the remaining queue; keep the current root.
      stopPlayAll(false);
      return;
    }
    startPlayAll(resumeIndexRef.current);
  };

  const speakOne = (value: string) => {
    // A single 🔊 cancels the Play all queue so the two do not talk over each other.
    stopPlayAll(false);
    playPronunciation(value, {
      plainDevanagari: true,
      rate: rateForSpeed(speechSpeedRef.current),
    });
  };

  const toggleExpand = (entry: DhatuEntry) => {
    const key = entry.id ?? entry.devanagari;
    setExpandedId((prev) => (prev === key ? null : key));
  };

  /** Move within the current filtered list (gaṇa or meaning order). */
  const stepFrom = (fromKey: string, delta: number) => {
    const list = filteredRef.current;
    const from = list.findIndex((entry) => entryKey(entry) === fromKey);
    if (from < 0) return;
    const next = from + delta;
    if (next < 0 || next >= list.length) return;
    const entry = list[next];
    const key = entryKey(entry);
    setExpandedId(key);
    if (playingAll) {
      startPlayAll(next);
      return;
    }
    resumeIndexRef.current = next;
    requestAnimationFrame(() => scrollRootIntoView(key));
  };

  const renderStepControls = (fromKey: string) => {
    const list = filteredRef.current;
    const index = list.findIndex((entry) => entryKey(entry) === fromKey);
    const canPrev = index > 0;
    const canNext = index >= 0 && index < list.length - 1;
    return (
      <div className="dp-step" role="group" aria-label="Previous and next root">
        <button
          type="button"
          className="dp-step-btn"
          disabled={!canPrev}
          onClick={(e) => {
            e.stopPropagation();
            stepFrom(fromKey, -1);
          }}
        >
          ← Previous
        </button>
        <button
          type="button"
          className="dp-step-btn"
          disabled={!canNext}
          onClick={(e) => {
            e.stopPropagation();
            stepFrom(fromKey, 1);
          }}
        >
          Next →
        </button>
      </div>
    );
  };

  const renderCard = (entry: DhatuEntry) => {
    const key = entry.id ?? entry.devanagari;
    const open = expandedId === key;
    const gana = entry.gana ?? entry.class;
    const ganaName = entry.gana_name ?? (gana != null ? GANA_LABELS[gana] : undefined);
    const previewExamples = (entry.examples ?? []).slice(0, open ? undefined : 3);

    return (
      <article
        key={key}
        data-dhatu-id={key}
        className={`dp-card${open ? ' dp-card--open' : ''}${speakingKey === key ? ' dp-card--speaking' : ''}`}
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
              speakOne(entry.devanagari);
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
            {renderStepControls(key)}
            <LatFormsTable key={key} entry={entry} />
            {(entry.examples ?? []).length > 0 && (
              <>
                <h4 className="dp-detail-heading">Quick examples</h4>
                <ul className="dp-example-list">
                  {entry.examples!.map((ex) => (
                    <li key={ex}>
                      <button
                        type="button"
                        className="dp-example-btn"
                        onClick={() => speakOne(ex)}
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
            <p className="dp-hint">Tap the card again to collapse · Laṭ present tables · Phase 2</p>
          </div>
        )}
      </article>
    );
  };

  return (
    <div className="dp-browser" aria-label="Dhātupāṭha root browser">
      <div className="dp-toolbar">
        <div className="dp-mode" role="group" aria-label="Browse roots by">
          <button
            type="button"
            className={`dp-mode-btn${browseMode === 'gana' ? ' dp-mode-btn--active' : ''}`}
            aria-pressed={browseMode === 'gana'}
            onClick={() => setBrowseMode('gana')}
          >
            By gaṇa
          </button>
          <button
            type="button"
            className={`dp-mode-btn${browseMode === 'theme' ? ' dp-mode-btn--active' : ''}`}
            aria-pressed={browseMode === 'theme'}
            onClick={() => setBrowseMode('theme')}
          >
            By meaning
          </button>
        </div>
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
          <div
            ref={playbackBarRef}
            className={`dp-playback-bar${playingAll ? ' dp-playback-bar--live' : ''}`}
          >
          {playingAll && speakingKey && renderStepControls(speakingKey)}
          <div className="dp-speed" role="group" aria-label="Root speech speed">
            {DHATU_SPEEDS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`dp-speed-btn${speechSpeed === item.id ? ' dp-speed-btn--active' : ''}`}
                aria-pressed={speechSpeed === item.id}
                onClick={() => {
                  speechSpeedRef.current = item.id;
                  setSpeechSpeed(item.id);
                  try {
                    sessionStorage.setItem(DHATU_SPEED_KEY, item.id);
                  } catch {
                    // Ignore storage unavailability; the choice still lasts this view.
                  }
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            className={`dp-playall${playingAll ? ' dp-playall--active' : ''}`}
            onClick={togglePlayAll}
            disabled={loading || filtered.length === 0}
            aria-pressed={playingAll}
            aria-label={playingAll ? 'Pause speaking visible roots' : 'Play all visible roots'}
          >
            {playingAll ? '⏸ Pause' : '▶ Play all'}
          </button>
          </div>
        </div>
        {hasPadam && (
          <div className="dp-chips" role="group" aria-label="Filter by pada">
            <button
              type="button"
              className={`dp-chip${padamFilter == null ? ' dp-chip--active' : ''}`}
              onClick={() => setPadamFilter(null)}
            >
              All padas
            </button>
            {(Object.keys(PADAM_LABELS) as DhatuPadam[]).map((padam) => (
              <button
                type="button"
                key={padam}
                className={`dp-chip${padamFilter === padam ? ' dp-chip--active' : ''}`}
                onClick={() => setPadamFilter((prev) => (prev === padam ? null : padam))}
              >
                {PADAM_LABELS[padam]}
              </button>
            ))}
          </div>
        )}
        {browseMode === 'gana' && (
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
        )}
      </div>

      <DhatupathaGuide onOpenRoot={openListedRoot} />

      {error && (
        <p className="dp-status dp-status--error" role="alert">
          {error}
        </p>
      )}

      {!loading && !error && filtered.length === 0 && (
        <p className="dp-empty">
          No roots match this search. Try another spelling or clear the{' '}
          {browseMode === 'gana' ? 'gaṇa and pada filters' : 'pada filter'}.
        </p>
      )}

      <div className="dp-ganas">
        {sections.map((section) => (
          <section key={section.key} className="dp-gana" aria-labelledby={`dp-section-${section.key}`}>
            <header className="dp-gana-head">
              <h2 id={`dp-section-${section.key}`} className="dp-gana-title">
                {section.index != null && <span className="dp-gana-index">{section.index}</span>}
                <span className="dp-gana-san">{section.title}</span>
              </h2>
              <p className="dp-gana-label">
                {section.iast ? <span className="dp-gana-iast">{section.iast}</span> : null}
                {section.en ? <span className="dp-gana-en">{section.en}</span> : null}
                <span className="dp-gana-count">
                  {section.roots.length} {section.roots.length === 1 ? 'root' : 'roots'}
                </span>
              </p>
            </header>
            <div className="dp-list">
              {section.roots.map((entry) => renderCard(entry))}
            </div>
          </section>
        ))}
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
