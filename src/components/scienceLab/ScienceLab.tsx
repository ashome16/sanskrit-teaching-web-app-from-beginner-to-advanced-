import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import type { LabSegmentId } from './common';
import '../../styles/science-lab.css';

const ParamanuBuilder = lazy(() => import('./ParamanuBuilder'));
const PrakritiBalance = lazy(() => import('./PrakritiBalance'));
const JyotishaOrbit = lazy(() => import('./JyotishaOrbit'));
const SrishtiLoom = lazy(() => import('./SrishtiLoom'));
const NadaBrahman = lazy(() => import('./NadaBrahman'));
const AsatoMa = lazy(() => import('./AsatoMa'));

const LAB_SEGMENTS: {
  id: LabSegmentId;
  icon: string;
  dev: string;
  title: string;
  subject: string;
  blurb: string;
  tint: string;
  ink: string;
}[] = [
  {
    id: 'paramanu',
    icon: '⚛️',
    dev: 'परमाणु-निर्माणम्',
    title: 'Vaiśeṣika Paramāṇu Builder',
    subject: 'Physics · Chemistry',
    blurb: 'Join paramāṇus into dvyaṇukas and tryaṇukas, and sort things by the four atomic bhūtas.',
    tint: '#fef3c7',
    ink: '#a16207',
  },
  {
    id: 'prakriti',
    icon: '🌿',
    dev: 'प्रकृति-सन्तुलनम्',
    title: 'Prakṛti Balance',
    subject: 'Biology · Ecology',
    blurb: 'Tune season, heat and moisture to bring vāta, pitta and kapha into sama; map a cell to the bhūtas.',
    tint: '#dcfce7',
    ink: '#15803d',
  },
  {
    id: 'jyotisha',
    icon: '🪐',
    dev: 'ज्योतिष-कक्षा',
    title: 'Jyotiṣa Orbit Sandbox',
    subject: 'Astronomy',
    blurb: 'Real gravity with Sūrya, Pṛthivī and Candra. Watch Candra move through the 27 nakṣatras.',
    tint: '#e0e7ff',
    ink: '#4338ca',
  },
  {
    id: 'srishti-sthiti-laya',
    icon: '🧵',
    dev: 'सृष्टि · स्थिति · लय',
    title: 'Sṛṣṭi · Sthiti · Laya Wave Lab',
    subject: 'Waves · Order & change',
    blurb: 'The Loom of Āruṇi: gather a scattered cloud, hold it steady, then let it dissolve.',
    tint: '#ffe4e6',
    ink: '#be123c',
  },
  {
    id: 'nada-brahman',
    icon: '🪕',
    dev: 'नाद-ब्रह्म',
    title: 'Cosmic Sitār · Nāda Brahman',
    subject: 'Sound · Waves · Music',
    blurb: 'Pluck a real standing-wave string, pick harmonics 1–5 (śabda to gandha) and tune the tension to match target notes.',
    tint: '#ede9fe',
    ink: '#6d28d9',
  },
  {
    id: 'asato-ma',
    icon: '🕯️',
    dev: 'असतो मा सद्गमय',
    title: 'The Veil of Māyā · Asato mā sadgamaya',
    subject: 'Matter · Heat · Chemistry',
    blurb: 'Switch from the everyday look to the atoms, heat gold till it glows, and burn a log while counting every atom.',
    tint: '#fef9c3',
    ink: '#a16207',
  },
];

const SEGMENT_IDS = new Set<string>(LAB_SEGMENTS.map((s) => s.id));
const readHash = (): LabSegmentId | null => {
  try {
    const h = window.location.hash.replace(/^#/, '');
    return SEGMENT_IDS.has(h) ? (h as LabSegmentId) : null;
  } catch {
    return null;
  }
};

export interface ScienceLabProps {
  initialSegment?: string | null;
  onGoHome?: () => void;
  onOpenResources?: () => void;
}

const SimLoader = () => <div className="vl-loading">Loading the lab bench…</div>;

const ScienceLab: React.FC<ScienceLabProps> = ({ initialSegment, onGoHome, onOpenResources }) => {
  const [active, setActive] = useState<LabSegmentId>(() => {
    if (initialSegment && SEGMENT_IDS.has(initialSegment)) return initialSegment as LabSegmentId;
    return readHash() || 'paramanu';
  });
  const simRef = useRef<HTMLDivElement>(null);
  const firstRun = useRef(true);

  // Keep /science-lab#segment in the address bar so every segment is a deep link.
  useEffect(() => {
    try {
      const url = `/science-lab#${active}`;
      const onLab = window.location.pathname.replace(/\/+$/, '') === '/science-lab';
      if (!onLab) window.history.pushState({ view: 'science-lab' }, '', url);
      else if (window.location.hash !== `#${active}`) window.history.replaceState({ view: 'science-lab' }, '', url);
    } catch {
      /* ignore */
    }
    const shouldScroll = !firstRun.current || !!initialSegment || !!readHash();
    firstRun.current = false;
    if (shouldScroll) {
      const t = window.setTimeout(() => simRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
      return () => window.clearTimeout(t);
    }
    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useEffect(() => {
    const onHash = () => {
      const h = readHash();
      if (h) setActive(h);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const seg = LAB_SEGMENTS.find((s) => s.id === active)!;

  return (
    <div className="vl-page">
      <header className="vl-hero">
        <div className="vl-hero-text">
          <div className="vl-kicker">Free for everyone · Play &amp; learn</div>
          <h1 className="vl-title">
            Vijñāna Lab · <span lang="sa">विज्ञान-प्रयोगशाला</span>
          </h1>
          <p className="vl-lead">
            Hands-on science sandboxes with Sanskrit words beside them. Drag, slide and press play, then check yourself with
            quick challenges. Each idea is shown as the tradition preserves it, with a clear line between old texts and modern
            science.
          </p>
          <div className="vl-btn-row">
            {onGoHome && <button type="button" className="vl-btn vl-btn--ghost" onClick={onGoHome}>← Home</button>}
            {onOpenResources && <button type="button" className="vl-btn vl-btn--ghost" onClick={onOpenResources}>साधनानि · Tools</button>}
          </div>
        </div>
        <div className="vl-hero-art" aria-hidden="true">
          <svg viewBox="0 0 200 140">
            <circle cx="100" cy="70" r="16" fill="#fde047" />
            <ellipse cx="100" cy="70" rx="70" ry="28" fill="none" stroke="#a5b4fc" strokeDasharray="4 4" />
            <circle cx="170" cy="70" r="6" fill="#2563eb" />
            <circle cx="40" cy="30" r="5" fill="#a16207" />
            <circle cx="52" cy="30" r="5" fill="#a16207" />
            <path d="M20 118 q20 -18 40 0 t40 0 t40 0 t40 0" fill="none" stroke="#0f766e" strokeWidth="2" />
          </svg>
        </div>
      </header>

      <nav className="vl-cards" aria-label="Vijñāna Lab simulations">
        {LAB_SEGMENTS.map((s) => (
          <a
            key={s.id}
            href={`/science-lab#${s.id}`}
            className={`vl-card${s.id === active ? ' is-active' : ''}`}
            style={{ background: s.tint, borderColor: s.id === active ? s.ink : undefined }}
            onClick={(e) => {
              e.preventDefault();
              setActive(s.id);
              if (s.id === active) simRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            aria-current={s.id === active ? 'true' : undefined}
            data-testid={`lab-card-${s.id}`}
          >
            <span className="vl-card-icon">{s.icon}</span>
            <span className="vl-card-subject" style={{ color: s.ink }}>{s.subject}</span>
            <span className="vl-card-title">{s.title}</span>
            <span className="vl-card-dev" lang="sa">{s.dev}</span>
            <span className="vl-card-blurb">{s.blurb}</span>
            <span className="vl-card-go" style={{ color: s.ink }}>{s.id === active ? 'Open below ↓' : 'Open →'}</span>
          </a>
        ))}
      </nav>

      <section id={active} ref={simRef} className="vl-segment" aria-labelledby={`vl-h-${active}`} data-testid="lab-segment" data-segment={active}>
        <h2 id={`vl-h-${active}`} className="vl-seg-title" style={{ color: seg.ink }}>
          <span aria-hidden="true">{seg.icon}</span> {seg.title} <span className="vl-seg-dev" lang="sa">{seg.dev}</span>
        </h2>
        <Suspense fallback={<SimLoader />}>
          {active === 'paramanu' && <ParamanuBuilder />}
          {active === 'prakriti' && <PrakritiBalance />}
          {active === 'jyotisha' && <JyotishaOrbit />}
          {active === 'srishti-sthiti-laya' && <SrishtiLoom />}
          {active === 'nada-brahman' && <NadaBrahman />}
          {active === 'asato-ma' && <AsatoMa />}
        </Suspense>
      </section>

      <p className="vl-footnote">
        Content note: the lab uses “traditionally”, “attributed to” and “preserved in” on purpose. Old texts and modern science
        ask different questions; where we compare them, the comparison is labelled.
      </p>
    </div>
  );
};

export default ScienceLab;
