import React, { useEffect, useMemo, useRef, useState } from 'react';
import '../styles/iks-vijnana-hub.css';
import {
  IKS_HUB_SUBJECTS,
  IKS_HUB_RESOURCES,
  IKS_HUB_PATH,
  subjectsForLab,
  type IksHubLink,
  type IksHubSubject,
} from '../data/iksVijnanaHub';
import LabResumeButton from './scienceLab/LabResumeButton';

type KindFilter = 'all' | 'lab' | 'think-lab' | 'reading';

const kindLabel: Record<IksHubLink['kind'], string> = {
  reading: 'Readings & Studios',
  lab: 'Playable Science Games',
  'think-lab': 'IKS Think Labs',
  resource: 'Also open',
};

const kindBadgeText: Record<IksHubLink['kind'], string> = {
  lab: 'Play',
  'think-lab': 'Investigate',
  reading: 'Read',
  resource: 'Open',
};

const PillLinkList: React.FC<{ title: string; kind: IksHubLink['kind']; items: IksHubLink[] }> = ({
  title,
  kind,
  items,
}) => {
  if (!items.length) return null;
  return (
    <div className="ivh-group">
      <div className={`ivh-list-label ivh-list-label--${kind}`}>{title}</div>
      <ul className="ivh-pill-list">
        {items.map((item) => (
          <li key={item.href + item.label}>
            <a href={item.href} className={`ivh-link-pill ivh-link-pill--${kind}`}>
              <span className="ivh-link-pill-tag">{kindBadgeText[kind]}</span>
              <span className="ivh-link-pill-text">{item.label}</span>
              <span className="ivh-link-pill-arrow" aria-hidden="true">&rarr;</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const IksVijnanaSubjectDirectory: React.FC<{
  heading?: string;
  lead?: string;
  includeResources?: boolean;
}> = ({
  heading = 'Explore Science & IKS by Subject',
  lead = 'Every subject brings together playable Vijñāna Lab simulations, guided IKS Think Labs, and source readings in one place. Filter by how you want to learn — play a game, investigate a real-world artifact, or read the original tradition.',
  includeResources = true,
}) => {
  const [kindFilter, setKindFilter] = useState<KindFilter>('all');
  const [activeSubjectId, setActiveSubjectId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const scrollToHash = () => {
      try {
        const hash = window.location.hash.replace('#', '');
        if (!hash) return;
        const matchedSubject = IKS_HUB_SUBJECTS.find((s) => s.id === hash);
        if (matchedSubject) {
          setActiveSubjectId('all');
        }
        const el =
          document.getElementById(`iks-subject-${hash}`) ||
          document.getElementById(`iks-lab-${hash}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } catch {
        /* ignore */
      }
    };
    const t = window.setTimeout(scrollToHash, 250);
    window.addEventListener('hashchange', scrollToHash);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('hashchange', scrollToHash);
    };
  }, []);

  const totals = useMemo(() => {
    const labs = new Set<string>();
    const thinkLabs = new Set<string>();
    const readings = new Set<string>();
    IKS_HUB_SUBJECTS.forEach((s) => {
      s.labs.forEach((l) => labs.add(l.href));
      s.thinkLabs.forEach((l) => thinkLabs.add(l.href));
      s.readings.forEach((l) => readings.add(l.href));
    });
    return {
      labs: labs.size,
      thinkLabs: thinkLabs.size,
      readings: readings.size,
      all: labs.size + thinkLabs.size + readings.size,
    };
  }, []);

  const filteredSubjects = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return IKS_HUB_SUBJECTS.filter((s) => {
      if (activeSubjectId !== 'all' && s.id !== activeSubjectId) return false;
      if (kindFilter === 'lab' && s.labs.length === 0) return false;
      if (kindFilter === 'think-lab' && s.thinkLabs.length === 0) return false;
      if (kindFilter === 'reading' && s.readings.length === 0) return false;
      if (!q) return true;
      const haystack = [
        s.en,
        s.sa,
        s.blurb,
        ...s.labs.map((i) => i.label),
        ...s.thinkLabs.map((i) => i.label),
        ...s.readings.map((i) => i.label),
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [activeSubjectId, kindFilter, searchQuery]);

  return (
    <section className="ivh-dir" aria-label="IKS and Vijñāna Lab by subject">
      <div className="ivh-dir-header">
        <div>
          <h2 className="ivh-dir-title">{heading}</h2>
          {lead ? <p className="ivh-dir-lead">{lead}</p> : null}
        </div>
      </div>

      {/* Guided Discovery Toolbar */}
      <div className="ivh-discovery-bar">
        <div className="ivh-kind-tabs" role="tablist" aria-label="Filter by module type">
          <button
            type="button"
            role="tab"
            aria-selected={kindFilter === 'all'}
            className={`ivh-kind-tab${kindFilter === 'all' ? ' is-active' : ''}`}
            onClick={() => setKindFilter('all')}
          >
            All Modules <span className="ivh-kind-count">{totals.all}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={kindFilter === 'lab'}
            className={`ivh-kind-tab ivh-kind-tab--lab${kindFilter === 'lab' ? ' is-active' : ''}`}
            onClick={() => setKindFilter('lab')}
          >
            Playable Games <span className="ivh-kind-count">{totals.labs}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={kindFilter === 'think-lab'}
            className={`ivh-kind-tab ivh-kind-tab--think${kindFilter === 'think-lab' ? ' is-active' : ''}`}
            onClick={() => setKindFilter('think-lab')}
          >
            IKS Think Labs <span className="ivh-kind-count">{totals.thinkLabs}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={kindFilter === 'reading'}
            className={`ivh-kind-tab ivh-kind-tab--reading${kindFilter === 'reading' ? ' is-active' : ''}`}
            onClick={() => setKindFilter('reading')}
          >
            Readings &amp; Studios <span className="ivh-kind-count">{totals.readings}</span>
          </button>
        </div>

        <div className="ivh-search-wrap">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="ivh-search-input"
            placeholder="Search subjects, games, Think Labs, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search IKS subjects and labs"
          />
          {searchQuery ? (
            <button
              type="button"
              className="ivh-search-clear"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              Clear
            </button>
          ) : null}
        </div>
      </div>

      {/* Quick Subject Filter Pills */}
      <div className="ivh-subject-strip" role="navigation" aria-label="Quick subject filter">
        <button
          type="button"
          className={`ivh-sub-pill${activeSubjectId === 'all' ? ' is-active' : ''}`}
          onClick={() => setActiveSubjectId('all')}
        >
          All 12 Subjects
        </button>
        {IKS_HUB_SUBJECTS.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`ivh-sub-pill${activeSubjectId === s.id ? ' is-active' : ''}`}
            onClick={() => setActiveSubjectId(activeSubjectId === s.id ? 'all' : s.id)}
          >
            <span>{s.en.split(' (')[0]}</span>
          </button>
        ))}
      </div>

      {filteredSubjects.length === 0 ? (
        <div className="ivh-empty">
          <p>No subjects match your current filter.</p>
          <button
            type="button"
            className="ivh-reset-btn"
            onClick={() => {
              setKindFilter('all');
              setActiveSubjectId('all');
              setSearchQuery('');
            }}
          >
            Show all 12 subjects
          </button>
        </div>
      ) : (
        <div className="ivh-dir-grid">
          {filteredSubjects.map((s: IksHubSubject) => (
            <article className="ivh-subject" id={`iks-subject-${s.id}`} key={s.id}>
              <div className="ivh-subject-top">
                <h3>
                  {s.en}
                  <span lang="sa">{s.sa}</span>
                </h3>
                <div className="ivh-subject-counts">
                  {s.labs.length > 0 && (
                    <span className="ivh-count-badge ivh-count-badge--lab">
                      {s.labs.length} {s.labs.length === 1 ? 'Game' : 'Games'}
                    </span>
                  )}
                  {s.thinkLabs.length > 0 && (
                    <span className="ivh-count-badge ivh-count-badge--think">
                      {s.thinkLabs.length} {s.thinkLabs.length === 1 ? 'Think Lab' : 'Think Labs'}
                    </span>
                  )}
                  {s.readings.length > 0 && (
                    <span className="ivh-count-badge ivh-count-badge--reading">
                      {s.readings.length} {s.readings.length === 1 ? 'Reading' : 'Readings'}
                    </span>
                  )}
                </div>
              </div>
              <p>{s.blurb}</p>
              {(kindFilter === 'all' || kindFilter === 'lab') && (
                <PillLinkList title={kindLabel.lab} kind="lab" items={s.labs} />
              )}
              {(kindFilter === 'all' || kindFilter === 'think-lab') && (
                <PillLinkList title={kindLabel['think-lab']} kind="think-lab" items={s.thinkLabs} />
              )}
              {(kindFilter === 'all' || kindFilter === 'reading') && (
                <PillLinkList title={kindLabel.reading} kind="reading" items={s.readings} />
              )}
            </article>
          ))}
        </div>
      )}

      {includeResources ? (
        <div className="ivh-resources">
          <span className="ivh-resources-label">Quick Jumps:</span>
          {IKS_HUB_RESOURCES.map((r) => (
            <a key={r.href} href={r.href}>
              {r.label}
            </a>
          ))}
        </div>
      ) : null}
    </section>
  );
};

export const IksRelatedStrip: React.FC<{ labId: string }> = ({ labId }) => {
  const subjects = subjectsForLab(labId);
  if (!subjects.length) return null;
  const seen = new Set<string>();
  const uniq = (items: IksHubLink[]) =>
    items.filter((i) => (seen.has(i.href) ? false : (seen.add(i.href), true)));

  const relatedLabs = uniq(
    subjects
      .flatMap((s) => s.labs)
      .filter((l) => !l.href.endsWith(`#${labId}`) && !l.href.includes(`#${labId}`)),
  );
  const relatedThink = uniq(subjects.flatMap((s) => s.thinkLabs));
  const relatedReadings = uniq(subjects.flatMap((s) => s.readings));

  if (!relatedLabs.length && !relatedReadings.length && !relatedThink.length) {
    return (
      <p className="ivh-related-body" style={{ margin: '0.5rem 0' }}>
        <a href={`${IKS_HUB_PATH}#${subjects[0].id}`}>Related IKS subject: {subjects[0].en}</a>
      </p>
    );
  }
  return (
    <details className="ivh-related">
      <summary>
        <span>
          Continue Exploring {subjects[0].en}: Related Games, Think Labs &amp; Readings
        </span>
        <span className="ivh-related-hint">
          {relatedLabs.length + relatedThink.length + relatedReadings.length} links &middot; Open
        </span>
      </summary>
      <div className="ivh-related-body ivh-related-pills">
        {relatedLabs.map((r) => (
          <a key={r.href} href={r.href} className="ivh-rel-pill ivh-rel-pill--lab">
            <span className="ivh-rel-tag">Play Next</span> {r.label}
          </a>
        ))}
        {relatedThink.map((r) => (
          <a key={r.href} href={r.href} className="ivh-rel-pill ivh-rel-pill--think">
            <span className="ivh-rel-tag">Think Lab</span> {r.label}
          </a>
        ))}
        {relatedReadings.map((r) => (
          <a key={r.href} href={r.href} className="ivh-rel-pill ivh-rel-pill--reading">
            <span className="ivh-rel-tag">Read</span> {r.label}
          </a>
        ))}
        <a href={`${IKS_HUB_PATH}#${subjects[0].id}`} className="ivh-rel-pill ivh-rel-pill--all">
          All {subjects[0].en} &rarr;
        </a>
      </div>
    </details>
  );
};

const WALKTHROUGH_MP4 = '/videos/iks-lab-walkthrough.mp4';
const WALKTHROUGH_WEBM = '/videos/iks-lab-walkthrough.webm';
const WALKTHROUGH_POSTER = '/videos/iks-lab-walkthrough-poster.jpg';
const WALKTHROUGH_POSTER_WEBP = '/videos/iks-lab-walkthrough-poster.webp';
const IKS_POSTER_FALLBACK = '/images/vedic-indian-knowledge-system-v2.jpg';

const MEDIA_ALT =
  'Walkthrough of the IKS and Vijñāna Lab, ending on a golden Om over a book and veena';

/** Homepage video slot: muted autoplay once when in view; poster only if reduced motion. */
const IksWalkthroughSlot: React.FC = () => {
  const slotRef = useRef<HTMLAnchorElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loadVideo, setLoadVideo] = useState(false);
  const [posterSrc, setPosterSrc] = useState(WALKTHROUGH_POSTER);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches) return;

    const el = slotRef.current;
    if (!el) return;

    let started = false;
    const start = () => {
      if (started || reduce.matches) return;
      started = true;
      setLoadVideo(true);
      io.disconnect();
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) start();
      },
      { threshold: 0.25, rootMargin: '80px 0px' },
    );
    io.observe(el);

    const onMotionChange = () => {
      if (reduce.matches) {
        setLoadVideo(false);
        io.disconnect();
      }
    };
    reduce.addEventListener('change', onMotionChange);
    return () => {
      io.disconnect();
      reduce.removeEventListener('change', onMotionChange);
    };
  }, []);

  useEffect(() => {
    if (!loadVideo) return;
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      video.muted = true;
      const play = video.play();
      if (play) play.catch(() => { /* autoplay blocked — poster remains underneath */ });
    };

    if (video.readyState >= 2) tryPlay();
    else {
      video.addEventListener('canplay', tryPlay, { once: true });
      video.load();
    }

    const onEnded = () => {
      try {
        video.pause();
        if (Number.isFinite(video.duration) && video.duration > 0) {
          video.currentTime = video.duration;
        }
      } catch {
        /* hold whatever frame the browser shows */
      }
    };
    video.addEventListener('ended', onEnded);
    return () => {
      video.removeEventListener('canplay', tryPlay);
      video.removeEventListener('ended', onEnded);
    };
  }, [loadVideo]);

  return (
    <a
      ref={slotRef}
      href={IKS_HUB_PATH}
      className="ivh-video-slot"
      aria-label="Open the IKS and Vijñāna Lab hub"
    >
      <div className="ivh-video-frame">
        <picture>
          {posterSrc === WALKTHROUGH_POSTER ? (
            <source srcSet={WALKTHROUGH_POSTER_WEBP} type="image/webp" />
          ) : null}
          <img
            src={posterSrc}
            alt={MEDIA_ALT}
            width={1280}
            height={720}
            onError={() => setPosterSrc(IKS_POSTER_FALLBACK)}
          />
        </picture>
        {loadVideo ? (
          <video
            ref={videoRef}
            muted
            playsInline
            autoPlay
            preload="metadata"
            poster={WALKTHROUGH_POSTER}
            width={1280}
            height={720}
            controls={false}
            disablePictureInPicture
            disableRemotePlayback
          >
            <source src={WALKTHROUGH_WEBM} type="video/webm" />
            <source src={WALKTHROUGH_MP4} type="video/mp4" />
          </video>
        ) : null}
      </div>
      <span className="ivh-video-caption">A short walkthrough of the IKS and Vijñāna Lab &middot; Open the hub</span>
    </a>
  );
};

/** Homepage combined entry: 3-step flow + quick age pathways + video slot + subject chips. */
export const IksVijnanaHomeEntry: React.FC = () => (
  <section className="ivh-home" id="vedic-knowledge-system" aria-labelledby="ivh-home-title">
    <div className="ivh-home-card">
      <p className="ivh-kicker">भारतीय ज्ञान परंपरा &middot; IKS and Vijñāna Lab</p>
      <h2 id="ivh-home-title" className="ivh-title">
        Indian Knowledge Systems and Vijñāna Lab
        <span className="ivh-title-sa" lang="sa">
          भारतीय ज्ञान परंपरा &middot; विज्ञान-प्रयोगशाला
        </span>
      </h2>
      <p className="ivh-intro">
        Indian Knowledge Systems are not just history. They are ideas you can explore, question and test — from
        Kaṇāda&apos;s atoms to Āryabhaṭa&apos;s orbits and Pāṇini&apos;s rule-based grammar. Follow a simple 3-step path:
        play a simulation, investigate a real-world artifact, and read the living tradition behind it.
      </p>

      {/* Clear 3-Step Flow for First-Time Visitors */}
      <div className="ivh-flow-steps" aria-label="How Science Simulations and IKS connect">
        <a href="/vignana-lab/#catalog" className="ivh-flow-step ivh-flow-step--play">
          <span className="ivh-flow-num">Step 1 &middot; Play</span>
          <strong>17 Science Simulations &amp; Games</strong>
          <small>Hands-on physics, atoms, orbits, sound, ecology &amp; preschool discovery.</small>
        </a>
        <a href={IKS_HUB_PATH} className="ivh-flow-step ivh-flow-step--think">
          <span className="ivh-flow-num">Step 2 &middot; Investigate</span>
          <strong>12 IKS Think Labs</strong>
          <small>Konark Sun Wheel, Delhi Iron Pillar, Wootz Steel, Rani ki Vav &amp; Suśruta.</small>
        </a>
        <a href="/indian-mathematics/" className="ivh-flow-step ivh-flow-step--read">
          <span className="ivh-flow-num">Step 3 &middot; Understand</span>
          <strong>Source Studios &amp; Readings</strong>
          <small>12-Era Indian Mathematics, 6 Darśanas, Pāṇinian Grammar &amp; Sugrīva&apos;s Trail.</small>
        </a>
      </div>

      <IksWalkthroughSlot />

      {/* Quick-Start by Age / Stage */}
      <div className="ivh-age-bar" aria-label="Start by age group">
        <span className="ivh-age-label">Start by Age:</span>
        <a href="/vignana-lab/#preschool-wonder" className="ivh-age-chip">
          <strong>Ages 3–6</strong> <span>Play 2 Learn (24 Games)</span>
        </a>
        <a href="/vignana-lab/#asato-ma" className="ivh-age-chip">
          <strong>Ages 7–10</strong> <span>Heat, Orbits &amp; Nature</span>
        </a>
        <a href="/vignana-lab/#chandrayaan" className="ivh-age-chip">
          <strong>Ages 11–14</strong> <span>Atoms, Moon &amp; Sound</span>
        </a>
        <a href="/indian-mathematics/" className="ivh-age-chip">
          <strong>Ages 14+</strong> <span>Altars, Kuṭṭaka &amp; IKS</span>
        </a>
      </div>

      <div className="ivh-actions">
        <a className="ivh-btn ivh-btn--primary" href="/vignana-lab/#catalog">
          Explore All Vijñāna Lab Games
        </a>
        <a className="ivh-btn ivh-btn--ghost" href={IKS_HUB_PATH}>
          Open IKS Subject Hub (12 Subjects)
        </a>
        <LabResumeButton variant="home" />
      </div>

      <ul className="ivh-chips">
        {IKS_HUB_SUBJECTS.map((s) => (
          <li key={s.id}>
            <a className="ivh-chip" href={`${IKS_HUB_PATH}#${s.id}`}>
              {s.en}
              <small lang="sa">{s.sa}</small>
            </a>
          </li>
        ))}
      </ul>
      <p className="ivh-note">
        <a href="/vignana-lab/#preschool-wonder" style={{ color: '#fde68a', fontWeight: 700 }}>
          Play 2 Learn: Free Preschool Games
        </a>
        {' · '}
        <a href="/iks-experiential-workbook/" style={{ color: '#fde68a', fontWeight: 700 }}>
          IKS experiential workbook
        </a>
      </p>
    </div>
  </section>
);

export default IksVijnanaSubjectDirectory;
