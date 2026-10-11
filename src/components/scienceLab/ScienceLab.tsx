import React, { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
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
const RituparnaSampling = lazy(() => import('./RituparnaSampling'));
const AgnibanaRocketLab = lazy(() => import('./AgnibanaRocketLab'));
const LabBodhiConsole = lazy(() => import('./LabBodhiConsole'));

export type LabCategory = 'all' | 'matter' | 'cosmos' | 'life' | 'waves';

export interface LabSegmentConfig {
  id: LabSegmentId;
  code: string;
  icon: string;
  dev: string;
  title: string;
  subject: string;
  school: string;
  category: 'matter' | 'cosmos' | 'life' | 'waves';
  blurb: string;
  tint: string;
  ink: string;
  glow: string;
}

const LAB_SEGMENTS: LabSegmentConfig[] = [
  {
    id: 'paramanu',
    code: 'SEC-01',
    icon: '⚛️',
    dev: 'परमाणु-निर्माणम्',
    title: 'Paramāṇu Builder',
    subject: 'Atomic Crucible',
    school: 'Vaiśeṣika (वैशेषिक)',
    category: 'matter',
    blurb: 'Forge matter from the smallest building blocks. Pair raw Paramāṇus into a Dvyaṇuka, then join three Dvyaṇukas into a Tryaṇuka, the first visible speck of reality.',
    tint: 'rgba(245, 158, 11, 0.12)',
    ink: '#fde047',
    glow: '#f59e0b',
  },
  {
    id: 'prakriti',
    code: 'SEC-02',
    icon: '🌿',
    dev: 'प्रकृति-सन्तुलनम्',
    title: 'Prakṛti Biosphere',
    subject: 'Bio-Homeostasis',
    school: 'Tridoṣa Engine (आयुर्वेद)',
    category: 'life',
    blurb: 'Elemental survival sandbox. Control the seasons, heat and moisture to bring Vāta, Pitta and Kapha into dynamic balance with real-time Nāḍī waveform feedback.',
    tint: 'rgba(16, 185, 129, 0.12)',
    ink: '#34d399',
    glow: '#10b981',
  },
  {
    id: 'jyotisha',
    code: 'SEC-03',
    icon: '🪐',
    dev: 'ज्योतिष-कक्षा',
    title: 'Jyotiṣa Gravity Sandbox',
    subject: 'Orbital Mechanics',
    school: 'Āryabhaṭīya (खगोल-शास्त्र)',
    category: 'cosmos',
    blurb: 'Real-time orbit simulator. Master gravity with Sūrya, Pṛthivī and Candra: too slow and you crash, too fast and you escape. Track Candra through the 27 Nakṣatras.',
    tint: 'rgba(99, 102, 241, 0.12)',
    ink: '#a5b4fc',
    glow: '#6366f1',
  },
  {
    id: 'srishti-sthiti-laya',
    code: 'SEC-04',
    icon: '🧵',
    dev: 'सृष्टि-स्थिति-लय',
    title: 'The Loom of Āruṇi',
    subject: 'Conservation Field',
    school: 'Satkāryavāda (साङ्ख्य)',
    category: 'waves',
    blurb: 'Quantum particle survival challenge. Gather a wild, scattered cloud into shape (Sṛṣṭi), hold it steady (Sthiti), then set off Laya. Not a single quantum of reality is lost.',
    tint: 'rgba(244, 63, 94, 0.12)',
    ink: '#fb7185',
    glow: '#f43f5e',
  },
  {
    id: 'nada-brahman',
    code: 'SEC-05',
    icon: '🪕',
    dev: 'नाद-ब्रह्म',
    title: 'Cosmic Sitār Tuning',
    subject: 'Harmonics & Cymatics',
    school: 'Nāda Brahman (सङ्गीत)',
    category: 'waves',
    blurb: 'String resonance simulator. Pluck standing waves, shift across harmonics 1–5, calibrate the 22 Śrutis, and reveal 2D Chladni sand mandala nodal yantras.',
    tint: 'rgba(168, 85, 247, 0.12)',
    ink: '#c084fc',
    glow: '#a855f7',
  },
  {
    id: 'asato-ma',
    code: 'SEC-06',
    icon: '🕯️',
    dev: 'असतो मा सद्गमय',
    title: 'The Veil of Māyā',
    subject: 'Mass Invariance',
    school: 'Andha-Mūṣā Crucible (रसशास्त्र)',
    category: 'matter',
    blurb: 'Fire up the Viveka Scanner to look past everyday illusion (Asat) and see the invariant atoms underneath (Sat). Melt, boil and burn, and mass remains 100.000g constant.',
    tint: 'rgba(234, 179, 8, 0.12)',
    ink: '#fde047',
    glow: '#eab308',
  },
  {
    id: 'chaturyoni',
    code: 'SEC-07',
    icon: '🦢',
    dev: 'चतुर्योनि-मानचित्रम्',
    title: 'Chaturyoni Spawn Map',
    subject: 'Bio-Galvanometry',
    school: 'Vṛkṣāyurveda & J.C. Bose',
    category: 'life',
    blurb: 'Ancient 4-fold taxonomy engine paired with Sir J.C. Bose’s plant galvanometer probe, tracking real-time microvolt action potentials to electrical and tactile stimuli.',
    tint: 'rgba(249, 115, 22, 0.12)',
    ink: '#fb923c',
    glow: '#f97316',
  },
  {
    id: 'chandrayaan',
    code: 'SEC-08',
    icon: '🛰️',
    dev: 'सोमयानम्',
    title: 'Somayāna Mission-03',
    subject: 'Lunar Telemetry',
    school: 'ISRO Chandrayaan-3',
    category: 'cosmos',
    blurb: 'Lunar landing sandbox. Circularise lunar orbit, execute precision soft-landing at Shiv Shakti Point, then tune LIBS laser pulses to detect sulphur and polar water ice.',
    tint: 'rgba(6, 182, 212, 0.12)',
    ink: '#38bdf8',
    glow: '#06b6d4',
  },
  {
    id: 'rituparna',
    code: 'SEC-09',
    icon: '🌳',
    dev: 'ऋतुपर्ण-साङ्ख्यानम्',
    title: 'Ṛtuparṇa Sampling Lab',
    subject: 'Monte Carlo Statistics',
    school: 'Saṅkhyāna & Akṣahṛdaya',
    category: 'waves',
    blurb: 'Mahābhārata cluster sampling and Akṣa dice Monte Carlo grid. Roll random seeds across a 100-quadrat forest, calculating mean, standard error, and variance collapse.',
    tint: 'rgba(20, 184, 166, 0.12)',
    ink: '#2dd4bf',
    glow: '#14b8a6',
  },
  {
    id: 'agnibana',
    code: 'SEC-10',
    icon: '🚀',
    dev: 'अग्निबाण-क्रीडा',
    title: 'Agnibāṇa Rocketry',
    subject: 'Aerospace Ballistics',
    school: 'Śukranīti & Mysore 1780',
    category: 'matter',
    blurb: 'Master the Śukranīti 5:1:1 Agnicūrṇa propellant ratio, configure hammered iron casings sustaining 80 atm, tune artillery elevation angles, and trace ballistic flight arcs.',
    tint: 'rgba(239, 68, 68, 0.12)',
    ink: '#f87171',
    glow: '#ef4444',
  },
];

const SEGMENT_IDS = new Set<string>(LAB_SEGMENTS.map((s) => s.id));
const HASH_ALIASES: Record<string, LabSegmentId> = {
  somayana: 'chandrayaan',
  'soma-yana': 'chandrayaan',
  sampling: 'rituparna',
  sankhyana: 'rituparna',
  'rituparna-sampling': 'rituparna',
  agnibana: 'agnibana',
  fireworks: 'agnibana',
  rocket: 'agnibana',
  diwali: 'agnibana',
  deepavali: 'agnibana',
};
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
  const [filterCat, setFilterCat] = useState<LabCategory>('all');
  const simRef = useRef<HTMLDivElement>(null);
  const firstRun = useRef(true);

  const visibleSegments = useMemo<LabSegmentConfig[]>(() => {
    if (filterCat === 'all') return LAB_SEGMENTS;
    return LAB_SEGMENTS.filter((s) => s.category === filterCat);
  }, [filterCat]);

  // Keep /vignana-lab#segment in the address bar so every segment is a deep link.
  useEffect(() => {
    try {
      const currentPath = window.location.pathname.replace(/\/+$/, '');
      const basePath = currentPath === '/science-lab' ? '/science-lab' : '/vignana-lab';
      const url = `${basePath}#${active}`;
      const onLab = currentPath === '/vignana-lab' || currentPath === '/science-lab' || currentPath === '/vijnana-lab';
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
        <div className="vl-hero-glow" aria-hidden="true" />
        <div className="vl-hero-text">
          <div className="vl-kicker">
            <span className="vl-hud-blink">● SYSTEM ONLINE</span> // VIJÑĀNA LAB ENGINE v2.6 // SŪTRA PROTOCOL
          </div>
          <h1 className="vl-title">
            VIJÑĀNA LAB <span className="vl-title-badge">PROYOG</span> · <span lang="sa" className="vl-title-dev">विज्ञान-प्रयोगशाला</span>
          </h1>
          <p className="vl-lead">
            Boot up the ultimate reality sandbox. Hack into ancient atomic physics, orbital gravity, cymatic sand harmonics, and aerospace metallurgy through interactive laboratory simulations. Decode Sanskrit sūtras and conquer each scientific challenge.
          </p>
          <div className="vl-hud-telemetry">
            <span className="vl-hud-pill"><span>🕹️</span> 10 ACTIVE SECTORS</span>
            <span className="vl-hud-pill"><span>⚡</span> 60 FPS QUANTUM ENGINE</span>
            <span className="vl-hud-pill"><span>📜</span> SŪTRA ARCHIVES</span>
            <span className="vl-hud-pill"><span>🧠</span> BODHI AI GUIDE</span>
          </div>
          <div className="vl-btn-row">
            {onGoHome && <button type="button" className="vl-btn vl-btn--cyber" onClick={onGoHome}>◀ MAIN HUB</button>}
            {onOpenResources && <button type="button" className="vl-btn vl-btn--cyber-ghost" onClick={onOpenResources}>साधनानि · TOOLKIT ⚙️</button>}
          </div>
        </div>
        <div className="vl-hero-art" aria-hidden="true">
          <svg viewBox="0 0 220 160">
            <defs>
              <radialGradient id="cyberSun" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="1" />
                <stop offset="50%" stopColor="#0284c7" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#082f49" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="neonBeam" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="50%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#f43f5e" />
              </linearGradient>
            </defs>
            {/* Holographic Radar Grids */}
            <circle cx="110" cy="80" r="70" fill="none" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="110" cy="80" r="45" fill="none" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="1" />
            <circle cx="110" cy="80" r="22" fill="url(#cyberSun)" />
            {/* Crosshair Lines */}
            <line x1="110" y1="5" x2="110" y2="155" stroke="rgba(56, 189, 248, 0.25)" strokeWidth="1" strokeDasharray="2 4" />
            <line x1="15" y1="80" x2="205" y2="80" stroke="rgba(56, 189, 248, 0.25)" strokeWidth="1" strokeDasharray="2 4" />
            {/* Orbiting Satellite Particle */}
            <ellipse cx="110" cy="80" rx="80" ry="32" fill="none" stroke="url(#neonBeam)" strokeWidth="1.5" strokeDasharray="8 6" transform="rotate(-18 110 80)" />
            <circle cx="180" cy="68" r="5" fill="#38bdf8" />
            {/* Sine wave frequency trace */}
            <path d="M 20 135 Q 45 110 70 135 T 120 135 T 170 135 T 205 135" fill="none" stroke="#2dd4bf" strokeWidth="2" opacity="0.85" />
          </svg>
        </div>
      </header>

      <div className="vl-cat-tabs-wrap" role="toolbar" aria-label="Filter science sectors">
        <div className="vl-cat-tabs">
          <button
            type="button"
            className={`vl-cat-tab${filterCat === 'all' ? ' is-active' : ''}`}
            onClick={() => setFilterCat('all')}
          >
            <span className="vl-cat-icon">🕹️</span> ALL SECTORS ({LAB_SEGMENTS.length})
          </button>
          <button
            type="button"
            className={`vl-cat-tab${filterCat === 'matter' ? ' is-active' : ''}`}
            onClick={() => setFilterCat('matter')}
          >
            <span className="vl-cat-icon">⚛️</span> MATTER &amp; ENERGY (3)
          </button>
          <button
            type="button"
            className={`vl-cat-tab${filterCat === 'cosmos' ? ' is-active' : ''}`}
            onClick={() => setFilterCat('cosmos')}
          >
            <span className="vl-cat-icon">🪐</span> COSMOS &amp; SPACE (2)
          </button>
          <button
            type="button"
            className={`vl-cat-tab${filterCat === 'life' ? ' is-active' : ''}`}
            onClick={() => setFilterCat('life')}
          >
            <span className="vl-cat-icon">🌿</span> LIFE &amp; ECOLOGY (2)
          </button>
          <button
            type="button"
            className={`vl-cat-tab${filterCat === 'waves' ? ' is-active' : ''}`}
            onClick={() => setFilterCat('waves')}
          >
            <span className="vl-cat-icon">📐</span> WAVES &amp; MATH (3)
          </button>
        </div>
      </div>

      <nav className="vl-cards" aria-label="Vijñāna Lab simulations">
        {visibleSegments.map((s) => (
          <a
            key={s.id}
            href={`/vignana-lab#${s.id}`}
            className={`vl-card${s.id === active ? ' is-active' : ''}`}
            style={{
              '--card-tint': s.tint,
              '--card-ink': s.ink,
              '--card-glow': s.glow,
            } as React.CSSProperties}
            onClick={(e) => {
              e.preventDefault();
              setActive(s.id);
              if (s.id === active) simRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            aria-current={s.id === active ? 'true' : undefined}
            data-testid={`lab-card-${s.id}`}
          >
            <div className="vl-card-corner-accent" aria-hidden="true" />
            <div className="vl-card-header">
              <span className="vl-card-icon-pill">
                {s.icon}
              </span>
              <div className="vl-card-header-tags">
                <span className="vl-card-sector-tag">{s.code}</span>
                <span className="vl-card-badge-cat" style={{ color: s.ink, borderColor: `${s.glow}55` }}>
                  {s.subject}
                </span>
              </div>
            </div>

            <div className="vl-card-body">
              <div className="vl-card-dev-title" lang="sa">{s.dev}</div>
              <div className="vl-card-main-title">{s.title}</div>
              <div className="vl-card-school" style={{ color: s.ink }}>
                <span className="vl-card-school-badge">ARCHIVE // {s.school}</span>
              </div>
              <p className="vl-card-blurb">{s.blurb}</p>
            </div>

            <div className="vl-card-footer">
              {s.id === active ? (
                <span className="vl-card-status is-active" style={{ background: s.glow, color: '#090e17' }}>
                  <span className="vl-card-pulse-dot" /> ENGAGED ON BENCH ↓
                </span>
              ) : (
                <span className="vl-card-status" style={{ color: s.ink, borderColor: `${s.glow}66` }}>
                  INITIALIZE SIM ▶
                </span>
              )}
            </div>
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
          {active === 'rituparna' && <RituparnaSampling />}
          {active === 'agnibana' && <AgnibanaRocketLab />}
        </Suspense>

        <Suspense fallback={<div className="vl-loading">Loading Bodhi Vijñāna Console…</div>}>
          <LabBodhiConsole activeSegment={active} />
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
