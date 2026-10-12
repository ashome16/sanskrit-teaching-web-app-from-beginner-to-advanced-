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
const VedicGeometryLab = lazy(() => import('./VedicGeometryLab'));
const MantraAcousticsLab = lazy(() => import('./MantraAcousticsLab'));
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
  // 1. Matter & The Elementary Crucible
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
    id: 'asato-ma',
    code: 'SEC-02',
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

  // 2. Biology & Life Systems (All Biology Labs Sequenced Together!)
  {
    id: 'prakriti',
    code: 'SEC-03',
    icon: '🌿',
    dev: 'प्रकृति-सन्तुलनम्',
    title: 'Prakṛti Biosphere',
    subject: 'Cellular Homeostasis',
    school: 'Tridoṣa Engine (आयुर्वेद)',
    category: 'life',
    blurb: 'Elemental survival sandbox. Control the seasons, heat and moisture to bring Vāta, Pitta and Kapha into dynamic balance with real-time Nāḍī waveform feedback.',
    tint: 'rgba(16, 185, 129, 0.12)',
    ink: '#34d399',
    glow: '#10b981',
  },
  {
    id: 'chaturyoni',
    code: 'SEC-04',
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

  // 3. Cosmos & Planetary Motion
  {
    id: 'jyotisha',
    code: 'SEC-05',
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
    id: 'chandrayaan',
    code: 'SEC-06',
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

  // 4. Harmonics, Conservation & Aerospace
  {
    id: 'nada-brahman',
    code: 'SEC-07',
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
    id: 'srishti-sthiti-laya',
    code: 'SEC-08',
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
  {
    id: 'vedic-geometry',
    code: 'SEC-11',
    icon: '📐',
    dev: 'जीवन्त-रेखागणितम्',
    title: 'The Living Geometry of the Gurukul',
    subject: 'Rekhā-Gaṇita & Śulba',
    school: 'Śulba Sūtras & Conscious Cosmos',
    category: 'waves',
    blurb: 'Explore how Sanskrit root actions encode living geometry. Features the Conscious Cosmos documentary masterclass, interactive 8-archetype shape morpher, and the universal actions of rotation and extension.',
    tint: 'rgba(245, 158, 11, 0.12)',
    ink: '#fde047',
    glow: '#f59e0b',
  },
  {
    id: 'mantra-acoustics',
    code: 'SEC-12',
    icon: '🎶',
    dev: 'मन्त्राकौस्टिक्स् · पदार्थस्य वाक्',
    title: 'Mantra Acoustics & The Language of Matter',
    subject: 'Harmonic Scale & Phonetic Physics',
    school: 'Sāma Veda & Taittirīya Saṃhitā',
    category: 'waves',
    blurb: 'Sound discovered as a physical law: the natural Harmonic Series (1/2, 1/3, 1/4... 1/7), Saptak vs. Solfège, Sāma Veda animal resonances, Chandas Mātrā decoupling, and the Chamakam square number code.',
    tint: 'rgba(168, 85, 247, 0.12)',
    ink: '#c084fc',
    glow: '#a855f7',
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
  geometry: 'vedic-geometry',
  'vedic-geometry': 'vedic-geometry',
  'rekha-ganita': 'vedic-geometry',
  'rekhaganita': 'vedic-geometry',
  shulba: 'vedic-geometry',
  sulba: 'vedic-geometry',
  'conscious-cosmos': 'vedic-geometry',
  mantra: 'mantra-acoustics',
  'mantra-acoustics': 'mantra-acoustics',
  acoustics: 'mantra-acoustics',
  saptak: 'mantra-acoustics',
  chandas: 'mantra-acoustics',
  chamakam: 'mantra-acoustics',
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

  const currentIndex = useMemo(() => {
    const idx = LAB_SEGMENTS.findIndex((s) => s.id === active);
    return idx >= 0 ? idx : 0;
  }, [active]);

  const prevSeg = useMemo(() => {
    const idx = currentIndex > 0 ? currentIndex - 1 : LAB_SEGMENTS.length - 1;
    return LAB_SEGMENTS[idx];
  }, [currentIndex]);

  const nextSeg = useMemo(() => {
    const idx = currentIndex < LAB_SEGMENTS.length - 1 ? currentIndex + 1 : 0;
    return LAB_SEGMENTS[idx];
  }, [currentIndex]);

  const handleNavigateLab = (targetId: LabSegmentId) => {
    setActive(targetId);
    window.requestAnimationFrame(() => {
      simRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  return (
    <div className="vl-page">
      <header className="vl-hero">
        <div className="vl-hero-glow" aria-hidden="true" />
        <div className="vl-hero-text">
          <h1 className="vl-title">
            VIJÑĀNA LAB <span className="vl-title-badge">PROYOG</span> · <span lang="sa" className="vl-title-dev">विज्ञान-प्रयोगशाला</span>
          </h1>
          <p className="vl-lead">
            Boot up the ultimate reality sandbox. Hack into ancient atomic physics, orbital gravity, cymatic sand harmonics, and aerospace metallurgy through interactive laboratory simulations. Decode Sanskrit sūtras and conquer each scientific challenge.
          </p>
          <div className="vl-hud-telemetry">
            <span className="vl-hud-pill"><span>🕹️</span> {LAB_SEGMENTS.length} ACTIVE SECTORS</span>
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
            <span className="vl-cat-icon">⚛️</span> MATTER &amp; ENERGY ({LAB_SEGMENTS.filter((s) => s.category === 'matter').length})
          </button>
          <button
            type="button"
            className={`vl-cat-tab${filterCat === 'cosmos' ? ' is-active' : ''}`}
            onClick={() => setFilterCat('cosmos')}
          >
            <span className="vl-cat-icon">🪐</span> COSMOS &amp; SPACE ({LAB_SEGMENTS.filter((s) => s.category === 'cosmos').length})
          </button>
          <button
            type="button"
            className={`vl-cat-tab${filterCat === 'life' ? ' is-active' : ''}`}
            onClick={() => setFilterCat('life')}
          >
            <span className="vl-cat-icon">🌿</span> LIFE &amp; ECOLOGY ({LAB_SEGMENTS.filter((s) => s.category === 'life').length})
          </button>
          <button
            type="button"
            className={`vl-cat-tab${filterCat === 'waves' ? ' is-active' : ''}`}
            onClick={() => setFilterCat('waves')}
          >
            <span className="vl-cat-icon">📐</span> WAVES &amp; MATH ({LAB_SEGMENTS.filter((s) => s.category === 'waves').length})
          </button>
        </div>
      </div>

      <nav className="vl-cards" aria-label="Vijñāna Lab simulations">
        {visibleSegments.map((s) => (
          <React.Fragment key={s.id}>
            {filterCat === 'all' && s.id === 'paramanu' && (
              <div className="vl-track-header">
                <span className="vl-track-title"><span>⚛️</span> TRACK I: MATTER &amp; MASS CONSERVATION</span>
                <span className="vl-track-subtitle">पदार्थ-विज्ञानम् · SEC-01 &amp; SEC-02</span>
              </div>
            )}
            {filterCat === 'all' && s.id === 'prakriti' && (
              <div className="vl-track-header" style={{ borderColor: 'rgba(16, 185, 129, 0.45)' }}>
                <span className="vl-track-title" style={{ color: '#34d399' }}><span>🌿</span> TRACK II: LIFE SCIENCES &amp; BIOLOGICAL CONTINUUM</span>
                <span className="vl-track-subtitle" style={{ color: '#6ee7b7' }}>जीव-विज्ञान-परम्परा · SEC-03 &amp; SEC-04</span>
              </div>
            )}
            {filterCat === 'all' && s.id === 'jyotisha' && (
              <div className="vl-track-header">
                <span className="vl-track-title"><span>🪐</span> TRACK III: COSMOS &amp; SPACE EXPLORATION</span>
                <span className="vl-track-subtitle">खगोल-विज्ञानम् · SEC-05 &amp; SEC-06</span>
              </div>
            )}
            {filterCat === 'all' && s.id === 'nada-brahman' && (
              <div className="vl-track-header">
                <span className="vl-track-title"><span>📐</span> TRACK IV: WAVES, CYMATICS &amp; STATISTICS</span>
                <span className="vl-track-subtitle">नाद-साङ्ख्य-विज्ञानम् · SEC-07, 08 &amp; 09</span>
              </div>
            )}
            {filterCat === 'all' && s.id === 'agnibana' && (
              <div className="vl-track-header">
                <span className="vl-track-title"><span>🚀</span> TRACK V: AEROSPACE BALLISTICS &amp; METALLURGY</span>
                <span className="vl-track-subtitle">अग्निबाण-शास्त्रम् · SEC-10</span>
              </div>
            )}
            {filterCat === 'all' && s.id === 'vedic-geometry' && (
              <div className="vl-track-header" style={{ borderColor: 'rgba(245, 158, 11, 0.45)' }}>
                <span className="vl-track-title" style={{ color: '#fde047' }}><span>📐</span> TRACK VI: SACRED GEOMETRY &amp; GURUKUL CONSCIOUSNESS</span>
                <span className="vl-track-subtitle" style={{ color: '#fcd34d' }}>जीवन्त-रेखागणितम् · SEC-11 (CONSCIOUS COSMOS)</span>
              </div>
            )}
            {filterCat === 'all' && s.id === 'mantra-acoustics' && (
              <div className="vl-track-header" style={{ borderColor: 'rgba(168, 85, 247, 0.45)' }}>
                <span className="vl-track-title" style={{ color: '#c084fc' }}><span>🎶</span> TRACK VII: MANTRA ACOUSTICS &amp; THE HARMONIC CODE</span>
                <span className="vl-track-subtitle" style={{ color: '#e9d5ff' }}>नाद-पदार्थ-विज्ञानम् · SEC-12 (ACCIDENTAL SYMPHONY &amp; CHAMAKAM)</span>
              </div>
            )}
            <a
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
          </React.Fragment>
        ))}
      </nav>

      <section id={active} ref={simRef} className="vl-segment" aria-labelledby={`vl-h-${active}`} data-testid="lab-segment" data-segment={active}>
        {/* Top Quick-Navigation HUD Bar */}
        <nav className="vl-lab-bench-nav" aria-label="Sector navigation bar">
          <button
            type="button"
            className="vl-lab-nav-btn vl-lab-nav-btn--prev"
            onClick={() => handleNavigateLab(prevSeg.id)}
            title={`Previous Lab: ${prevSeg.code} ${prevSeg.title}`}
          >
            <span className="vl-nav-arrow" aria-hidden="true">◀</span>
            <span className="vl-nav-meta">
              <span className="vl-nav-dir">PREV LAB</span>
              <span className="vl-nav-label">{prevSeg.icon} {prevSeg.code} · {prevSeg.title}</span>
            </span>
          </button>

          <div className="vl-lab-nav-status">
            <div className="vl-nav-badge">
              <span className="vl-hud-blink">●</span> SECTOR {String(currentIndex + 1).padStart(2, '0')} / {String(LAB_SEGMENTS.length).padStart(2, '0')}
            </div>
            <div className="vl-nav-pills-row" role="tablist" aria-label="Direct sector jump">
              {LAB_SEGMENTS.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  className={`vl-nav-step-dot${s.id === active ? ' is-active' : ''}`}
                  onClick={() => handleNavigateLab(s.id)}
                  title={`${s.code}: ${s.title} (${s.dev})`}
                  aria-label={`Jump to ${s.code} ${s.title}`}
                >
                  <span className="vl-step-num">{idx + 1}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="vl-lab-nav-btn vl-lab-nav-btn--next"
            onClick={() => handleNavigateLab(nextSeg.id)}
            title={`Next Lab: ${nextSeg.code} ${nextSeg.title}`}
          >
            <span className="vl-nav-meta vl-nav-meta--right">
              <span className="vl-nav-dir">NEXT LAB ➔</span>
              <span className="vl-nav-label">{nextSeg.icon} {nextSeg.code} · {nextSeg.title}</span>
            </span>
            <span className="vl-nav-arrow" aria-hidden="true">▶</span>
          </button>
        </nav>

        {/* Biological Continuum Track Banner for Life Sciences */}
        {seg.category === 'life' && (
          <div className="vl-bio-continuum-banner" role="region" aria-label="Life Sciences Continuum Track">
            <div className="vl-bio-continuum-title">
              <span className="vl-hud-blink">●</span> BIOLOGICAL CONTINUUM TRACK // जीव-विज्ञान-परम्परा (CELLULAR ➔ ORGANISMAL)
            </div>
            <div className="vl-bio-continuum-steps">
              <button
                type="button"
                className={`vl-bio-step${active === 'prakriti' ? ' is-current' : ' is-done'}`}
                onClick={() => handleNavigateLab('prakriti')}
              >
                <span className="vl-bio-step-num">STAGE 1 · SEC-03</span>
                <span className="vl-bio-step-name">🌿 Prakṛti Biosphere</span>
                <span className="vl-bio-step-sub">Sub-Cellular Homeostasis &amp; Tridoṣa Ion Balance</span>
              </button>

              <div className="vl-bio-step-connector" aria-hidden="true">
                ──(Scaling to Organism)──▶
              </div>

              <button
                type="button"
                className={`vl-bio-step${active === 'chaturyoni' ? ' is-current' : ''}`}
                onClick={() => handleNavigateLab('chaturyoni')}
              >
                <span className="vl-bio-step-num">STAGE 2 · SEC-04</span>
                <span className="vl-bio-step-name">🦢 Chaturyoni Spawn Map</span>
                <span className="vl-bio-step-sub">Whole-Organism Taxonomy &amp; Plant Galvanometry</span>
              </button>
            </div>
          </div>
        )}

        <h2 id={`vl-h-${active}`} className="vl-seg-title" style={{ color: seg.ink }}>
          <span aria-hidden="true">{seg.icon}</span> {seg.title} <span className="vl-seg-dev" lang="sa">{seg.dev}</span>
        </h2>
        <Suspense fallback={<SimLoader />}>
          {active === 'paramanu' && <ParamanuBuilder onNextLab={() => handleNavigateLab(nextSeg.id)} />}
          {active === 'asato-ma' && <AsatoMa />}
          {active === 'prakriti' && <PrakritiBalance onNextLab={() => handleNavigateLab(nextSeg.id)} />}
          {active === 'chaturyoni' && <Chaturyoni onNextLab={() => handleNavigateLab(nextSeg.id)} />}
          {active === 'jyotisha' && <JyotishaOrbit />}
          {active === 'chandrayaan' && <Chandrayaan />}
          {active === 'nada-brahman' && <NadaBrahman />}
          {active === 'srishti-sthiti-laya' && <SrishtiLoom />}
          {active === 'rituparna' && <RituparnaSampling />}
          {active === 'agnibana' && <AgnibanaRocketLab />}
          {active === 'vedic-geometry' && <VedicGeometryLab onNextLab={() => handleNavigateLab(nextSeg.id)} />}
          {active === 'mantra-acoustics' && <MantraAcousticsLab onNextLab={() => handleNavigateLab(nextSeg.id)} />}
        </Suspense>


        {/* Bottom Next Lab Gateway Card */}
        <div className="vl-next-lab-gateway" style={{ '--next-glow': nextSeg.glow, '--next-ink': nextSeg.ink, '--next-tint': nextSeg.tint } as React.CSSProperties}>
          <div className="vl-nlg-header">
            <div className="vl-nlg-kicker">
              <span className="vl-hud-blink">●</span> SECTOR {seg.code} SIMULATION BENCH // NEXT EXPEDITION AVAILABLE
            </div>
            <div className="vl-nlg-title-row">
              <h3 className="vl-nlg-heading">
                Ready for the Next Vijñāna Exploration?
              </h3>
              <span className="vl-nlg-counter">
                {currentIndex + 1} of {LAB_SEGMENTS.length} Sectors Explored
              </span>
            </div>
          </div>

          <div className="vl-nlg-card">
            <div className="vl-nlg-card-left">
              <div className="vl-nlg-icon-circle">
                <span className="vl-nlg-big-icon" aria-hidden="true">{nextSeg.icon}</span>
                <span className="vl-nlg-code-badge">{nextSeg.code}</span>
              </div>
              <div className="vl-nlg-card-details">
                <div className="vl-nlg-dev" lang="sa">{nextSeg.dev}</div>
                <h4 className="vl-nlg-lab-title">{nextSeg.title}</h4>
                <div className="vl-nlg-tags">
                  <span className="vl-nlg-tag vl-nlg-tag--subj">{nextSeg.subject}</span>
                  <span className="vl-nlg-tag vl-nlg-tag--school">ARCHIVE // {nextSeg.school}</span>
                  <span className="vl-nlg-tag vl-nlg-tag--cat">{nextSeg.category.toUpperCase()}</span>
                </div>
                <p className="vl-nlg-blurb">{nextSeg.blurb}</p>
              </div>
            </div>

            <div className="vl-nlg-card-actions">
              <button
                type="button"
                className="vl-btn vl-btn--cyber vl-btn--nlg-proceed"
                onClick={() => handleNavigateLab(nextSeg.id)}
                aria-label={`Enter Next Lab: ${nextSeg.title}`}
              >
                <span>ENTER NEXT LAB: {nextSeg.title}</span>
                <span className="vl-nlg-arrow-icon" aria-hidden="true">➔</span>
              </button>

              <div className="vl-nlg-sub-row">
                <button
                  type="button"
                  className="vl-nlg-sub-btn"
                  onClick={() => handleNavigateLab(prevSeg.id)}
                >
                  ◀ Previous Lab: {prevSeg.code}
                </button>
                <button
                  type="button"
                  className="vl-nlg-sub-btn"
                  onClick={() => simRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                >
                  ▲ Back to Top
                </button>
              </div>
            </div>
          </div>

          {/* All Sectors Grid Strip */}
          <div className="vl-nlg-strip-wrap">
            <span className="vl-nlg-strip-title">EXPLORE ALL {LAB_SEGMENTS.length} SCIENCE SECTORS:</span>
            <div className="vl-nlg-strip">
              {LAB_SEGMENTS.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  className={`vl-nlg-strip-btn${s.id === active ? ' is-current' : ''}`}
                  onClick={() => handleNavigateLab(s.id)}
                  title={`${s.code}: ${s.title}`}
                >
                  <span className="vl-nlg-strip-idx">{idx + 1}</span>
                  <span className="vl-nlg-strip-icon">{s.icon}</span>
                  <span className="vl-nlg-strip-code">{s.code}</span>
                  <span className="vl-nlg-strip-name">{s.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <Suspense fallback={<div className="vl-loading">Loading Bodhi Vijñāna Console…</div>}>
          <LabBodhiConsole activeSegment={active} />
        </Suspense>
      </section>

      {/* Floating Bottom Quick-Dock Bar */}
      <aside className="vl-floating-dock" aria-label="Quick lab switcher">
        <button
          type="button"
          className="vl-dock-btn vl-dock-btn--prev"
          onClick={() => handleNavigateLab(prevSeg.id)}
          title={`Previous: ${prevSeg.code} ${prevSeg.title}`}
        >
          <span className="vl-dock-arrow" aria-hidden="true">◀</span>
          <span className="vl-dock-text">{prevSeg.icon} {prevSeg.code}</span>
        </button>

        <div className="vl-dock-current">
          <span className="vl-dock-pulse" aria-hidden="true" />
          <span className="vl-dock-curr-code">{seg.code}</span>
          <span className="vl-dock-curr-title">{seg.icon} {seg.title}</span>
          <span className="vl-dock-curr-count">({currentIndex + 1}/{LAB_SEGMENTS.length})</span>
        </div>

        <button
          type="button"
          className="vl-dock-btn vl-dock-btn--next"
          onClick={() => handleNavigateLab(nextSeg.id)}
          title={`Next: ${nextSeg.code} ${nextSeg.title}`}
        >
          <span className="vl-dock-text">Next: {nextSeg.icon} {nextSeg.code}</span>
          <span className="vl-dock-arrow" aria-hidden="true">➔</span>
        </button>
      </aside>


      <p className="vl-footnote">
        Content note: the lab uses “traditionally”, “attributed to” and “preserved in” on purpose. Old texts and modern science
        ask different questions; where we compare them, the comparison is labelled.
      </p>
    </div>
  );
};

export default ScienceLab;
