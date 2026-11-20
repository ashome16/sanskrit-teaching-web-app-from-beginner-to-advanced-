import React, { useEffect, useRef, useState } from 'react';
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

const kindLabel: Record<IksHubLink['kind'], string> = {
  reading: 'Readings',
  lab: 'Vijñāna Lab games',
  'think-lab': 'Think Labs',
  resource: 'Also open',
};

const LinkList: React.FC<{ title: string; items: IksHubLink[] }> = ({ title, items }) => {
  if (!items.length) return null;
  return (
    <div className="ivh-list">
      <div className="ivh-list-label">{title}</div>
      <ul className="ivh-list">
        {items.map((item) => (
          <li key={item.href + item.label}>
            <a href={item.href}>{item.label}</a>
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
  heading = 'Explore by subject',
  lead = 'Each subject gathers its readings, Vijñāna Lab games, and Think Labs in one place. Open a lab to try the idea; open a reading to see where it comes from.',
  includeResources = true,
}) => {
  useEffect(() => {
    const scrollToHash = () => {
      try {
        const hash = window.location.hash.replace('#', '');
        if (!hash) return;
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

  return (
    <section className="ivh-dir" aria-label="IKS and Vijñāna Lab by subject">
      <h2 className="ivh-dir-title">{heading}</h2>
      {lead ? <p className="ivh-dir-lead">{lead}</p> : null}
      <div className="ivh-dir-grid">
        {IKS_HUB_SUBJECTS.map((s: IksHubSubject) => (
          <article className="ivh-subject" id={`iks-subject-${s.id}`} key={s.id}>
            <h3>
              {s.en}
              <span lang="sa">{s.sa}</span>
            </h3>
            <p>{s.blurb}</p>
            <LinkList title={kindLabel.reading} items={s.readings} />
            <LinkList title={kindLabel.lab} items={s.labs} />
            <LinkList title={kindLabel['think-lab']} items={s.thinkLabs} />
          </article>
        ))}
      </div>
      {includeResources ? (
        <div className="ivh-resources">
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
  const readings = subjects.flatMap((s) => s.readings);
  const thinkLabs = subjects.flatMap((s) => s.thinkLabs);
  const seen = new Set<string>();
  const uniq = (items: IksHubLink[]) =>
    items.filter((i) => (seen.has(i.href) ? false : (seen.add(i.href), true)));
  const relatedReadings = uniq(readings);
  const relatedThink = uniq(thinkLabs);
  if (!relatedReadings.length && !relatedThink.length) {
    return (
      <p className="ivh-related-body" style={{ margin: '0.5rem 0' }}>
        <a href={`${IKS_HUB_PATH}#${subjects[0].id}`}>Related IKS subject: {subjects[0].en}</a>
      </p>
    );
  }
  return (
    <details className="ivh-related">
      <summary>
        Related IKS reading and Think Labs
        <span className="ivh-related-hint">Open to view</span>
      </summary>
      <div className="ivh-related-body">
        {relatedReadings.map((r) => (
          <a key={r.href} href={r.href}>
            {r.label}
          </a>
        ))}
        {relatedThink.map((r) => (
          <a key={r.href} href={r.href}>
            {r.label}
          </a>
        ))}
        <a href={`${IKS_HUB_PATH}#${subjects[0].id}`}>All {subjects[0].en} links</a>
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
      <span className="ivh-video-caption">A short walkthrough of the IKS and Vijñāna Lab · Open the hub</span>
    </a>
  );
};

/** Homepage combined entry: video slot + subject chips + single CTAs. */
export const IksVijnanaHomeEntry: React.FC = () => (
  <section className="ivh-home" id="vedic-knowledge-system" aria-labelledby="ivh-home-title">
    <div className="ivh-home-card">
      <p className="ivh-kicker">भारतीय ज्ञान परंपरा · IKS and Vijñāna Lab</p>
      <h2 id="ivh-home-title" className="ivh-title">
        Indian Knowledge Systems and Vijñāna Lab
        <span className="ivh-title-sa" lang="sa">
          भारतीय ज्ञान परंपरा · विज्ञान-प्रयोगशाला
        </span>
      </h2>
      <IksWalkthroughSlot />
      <p className="ivh-intro">
        Indian Knowledge Systems are not just history. They are ideas you can explore, question and test — from
        Kaṇāda&apos;s atoms to Āryabhaṭa&apos;s orbits and Pāṇini&apos;s rule-based grammar. EdNet Learn connects these
        traditions with modern science, so learners see both where an idea came from and where it leads. Knowledge is a
        path. Destination is wisdom.
      </p>
      <div className="ivh-actions">
        <a className="ivh-btn ivh-btn--primary" href={IKS_HUB_PATH}>
          Open the IKS and Vijñāna Lab hub
        </a>
        <a className="ivh-btn ivh-btn--ghost" href="/vignana-lab/#catalog">
          All Vijñāna Lab games
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
