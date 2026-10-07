import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import type { LabSegmentId } from './common';
import '../../styles/science-lab.css';

const ParamanuBuilder = lazy(() => import('./ParamanuBuilder'));
const PrakritiBalance = lazy(() => import('./PrakritiBalance'));
const JyotishaOrbit = lazy(() => import('./JyotishaOrbit'));
const SrishtiLoom = lazy(() => import('./SrishtiLoom'));
const NadaBrahman = lazy(() => import('./NadaBrahman'));
const AsatoMa = lazy(() => import('./AsatoMa'));
const Chaturyoni = lazy(() => import('./Chaturyoni'));
const Chandrayaan = lazy(() => import('./Chandrayaan'));

const LAB_SEGMENTS: {
  id: LabSegmentId;
  icon: string;
  dev: string;
  title: string;
  subject: string;
  /** Second half of the category line, after “//”. */
  school: string;
  blurb: string;
  tint: string;
  ink: string;
}[] = [
  {
    id: 'paramanu',
    icon: '⚛️',
    dev: 'परमाणु-निर्माणम्',
    title: 'Paramāṇu Builder',
    subject: 'Physics & Chemistry',
    school: 'Vaiśeṣika (वैशेषिक)',
    blurb: 'Forge matter from the smallest building blocks. Pair raw Paramāṇus into a Dvyaṇuka, then join three Dvyaṇukas into a Tryaṇuka, the first speck you could see. Sort the four atomic Bhūtas: only matching ones bond.',
    tint: '#fef3c7',
    ink: '#a16207',
  },
  {
    id: 'prakriti',
    icon: '🌿',
    dev: 'प्रकृति-सन्तुलनम्',
    title: 'Prakṛti Biosphere',
    subject: 'Biology & Ecology',
    school: 'Prakṛti Balance',
    blurb: 'Elemental survival sandbox. Control the seasons, heat and moisture to bring Vāta, Pitta and Kapha into perfect balance. Then map a living cell to the five great elements (a teaching analogy).',
    tint: '#dcfce7',
    ink: '#15803d',
  },
  {
    id: 'jyotisha',
    icon: '🪐',
    dev: 'ज्योतिष-कक्षा',
    title: 'Jyotiṣa Gravity Sandbox',
    subject: 'Astronomy',
    school: 'Jyotiṣa (ज्योतिष-कक्षा)',
    blurb: 'Real-time orbit simulator. Master gravity with Sūrya, Pṛthivī and Candra: too slow and you crash, too fast and you escape. Track Candra through the 27 Nakṣatras.',
    tint: '#e0e7ff',
    ink: '#4338ca',
  },
  {
    id: 'srishti-sthiti-laya',
    icon: '🧵',
    dev: 'सृष्टि-स्थिति-लय',
    title: 'The Loom of Āruṇi',
    subject: 'Waves & Order',
    school: 'Sṛṣṭi · Sthiti · Laya',
    blurb: 'Particle survival challenge. Gather a wild, scattered cloud into shape (Sṛṣṭi), hold it steady (Sthiti), then set off Laya and watch it dissolve. Not one particle is lost.',
    tint: '#ffe4e6',
    ink: '#be123c',
  },
  {
    id: 'nada-brahman',
    icon: '🪕',
    dev: 'नाद-ब्रह्म',
    title: 'Cosmic Sitār Tuning',
    subject: 'Sound & Music',
    school: 'Nāda Brahman',
    blurb: 'String resonance simulator. Pluck a standing wave and switch between harmonics 1–5, from Śabda to Gandha. Tune the tension to hit the target notes.',
    tint: '#ede9fe',
    ink: '#6d28d9',
  },
  {
    id: 'asato-ma',
    icon: '🕯️',
    dev: 'असतो मा सद्गमय',
    title: 'The Veil of Māyā',
    subject: 'Matter & Heat',
    school: 'The Veil of Māyā (असतो मा सद्गमय)',
    blurb: 'The ultimate perspective-shift puzzle. Fire up the Viveka Scanner to look past the everyday view (Asat) and see the atoms underneath (Sat). Melt, boil and burn, and the atom count never changes.',
    tint: '#fef9c3',
    ink: '#a16207',
  },
  {
    id: 'chaturyoni',
    icon: '🦢',
    dev: 'चतुर्योनि-मानचित्रम्',
    title: 'Chaturyoni Spawn Map',
    subject: 'Life Science',
    school: 'Chaturyoni (चतुर्योनि)',
    blurb: 'Classification sandbox. Sort deer, swans, mosquitoes and lotuses into the four spawn classes of old Sanskrit texts: womb, egg, heat-mist and sprout. Unlock the plant shelf, then run the modern check.',
    tint: '#ffedd5',
    ink: '#c2410c',
  },
  {
    id: 'chandrayaan',
    icon: '🛰️',
    dev: 'सोमयानम्',
    title: 'Somayāna Mission-03',
    subject: 'Spaceflight',
    school: 'Chandrayaan (सोमयानम्)',
    blurb: 'Lunar landing sandbox. Circularise Candra-Kakṣyā, soft-land Vikram at Shiv Shakti Point, then drive Pragyan and LIBS-scan Pṛthivī-tattva — with honest ISRO framing for sulphur and the ice hunt.',
    tint: '#e0e7ff',
    ink: '#3730a3',
  },
];

const SEGMENT_IDS = new Set<string>(LAB_SEGMENTS.map((s) => s.id));
const HASH_ALIASES: Record<string, LabSegmentId> = { somayana: 'chandrayaan', 'soma-yana': 'chandrayaan' };
const readHash = (): LabSegmentId | null => {
  try {
    const h = window.location.hash.replace(/^#/, '');
    if (SEGMENT_IDS.has(h)) return h as LabSegmentId;
    if (HASH_ALIASES[h]) return HASH_ALIASES[h];
    return null;
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
    if (initialSegment && HASH_ALIASES[initialSegment]) return HASH_ALIASES[initialSegment];
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
            Boot up the ultimate reality simulator. Explore physics, chemistry, and biology through ancient lenses. Decode the
            Sanskrit names behind the cosmos, master the particle fields, and conquer the challenges.
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
            <span className="vl-card-subject" style={{ color: s.ink }}>{s.subject} <span aria-hidden="true">//</span> {s.school}</span>
            <span className="vl-card-title">
              {s.title} <span className="vl-card-slash" aria-hidden="true">//</span> <span className="vl-card-dev" lang="sa">{s.dev}</span>
            </span>
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
          {active === 'chaturyoni' && <Chaturyoni />}
          {active === 'chandrayaan' && <Chandrayaan />}
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
