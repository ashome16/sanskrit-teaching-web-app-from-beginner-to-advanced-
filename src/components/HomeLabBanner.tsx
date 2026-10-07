import React, { useEffect, useRef, useState } from 'react';
import '../styles/home-lab-banner.css';

interface LabModule {
  id: string;
  icon: string;
  title: string;
  dev: string;
  subject: string;
}

/** Same ids, icons and names as the lab landing cards (src/components/scienceLab/ScienceLab.tsx). */
const MODULES: LabModule[] = [
  { id: 'paramanu', icon: '⚛️', title: 'Paramāṇu Builder', dev: 'परमाणु-निर्माणम्', subject: 'Physics & Chemistry' },
  { id: 'prakriti', icon: '🌿', title: 'Prakṛti Biosphere', dev: 'प्रकृति-सन्तुलनम्', subject: 'Biology & Ecology' },
  { id: 'jyotisha', icon: '🪐', title: 'Jyotiṣa Gravity Sandbox', dev: 'ज्योतिष-कक्षा', subject: 'Astronomy' },
  { id: 'srishti-sthiti-laya', icon: '🧵', title: 'The Loom of Āruṇi', dev: 'सृष्टि-स्थिति-लय', subject: 'Waves & Order' },
  { id: 'nada-brahman', icon: '🪕', title: 'Cosmic Sitār Tuning', dev: 'नाद-ब्रह्म', subject: 'Sound & Music' },
  { id: 'asato-ma', icon: '🕯️', title: 'The Veil of Māyā', dev: 'असतो मा सद्गमय', subject: 'Matter & Heat' },
  { id: 'chaturyoni', icon: '🦢', title: 'Chaturyoni Spawn Map', dev: 'चतुर्योनि-मानचित्रम्', subject: 'Life Science' },
  { id: 'chandrayaan', icon: '🛰️', title: 'Somayāna Mission-03', dev: 'सोमयानम्', subject: 'Spaceflight' },
];

const ROTATE_MS = 4200;

/** Small animated SVG preview for each module (animations live in CSS and stop under reduced motion). */
const Preview: React.FC<{ id: string }> = ({ id }) => {
  switch (id) {
    case 'paramanu':
      return (
        <svg viewBox="0 0 240 140" aria-hidden="true" className="hlb-svg hlb-svg--paramanu">
          <g className="hlb-dyad hlb-dyad--1"><circle cx="70" cy="50" r="9" /><circle cx="88" cy="50" r="9" /></g>
          <g className="hlb-dyad hlb-dyad--2"><circle cx="152" cy="50" r="9" /><circle cx="170" cy="50" r="9" /></g>
          <g className="hlb-dyad hlb-dyad--3"><circle cx="111" cy="102" r="9" /><circle cx="129" cy="102" r="9" /></g>
          <path d="M79 50 L161 50 L120 102 Z" className="hlb-bond" />
        </svg>
      );
    case 'prakriti':
      return (
        <svg viewBox="0 0 240 140" aria-hidden="true" className="hlb-svg hlb-svg--prakriti">
          {[
            { x: 60, c: '#93c5fd', l: 'वात' },
            { x: 120, c: '#fca5a5', l: 'पित्त' },
            { x: 180, c: '#86efac', l: 'कफ' },
          ].map((d, i) => (
            <g key={d.l}>
              <rect x={d.x - 14} y="20" width="28" height="90" rx="8" className="hlb-track" />
              <rect x={d.x - 14} y="20" width="28" height="90" rx="8" fill={d.c} className={`hlb-bar hlb-bar--${i + 1}`} />
              <text x={d.x} y="130" className="hlb-dev-label">{d.l}</text>
            </g>
          ))}
          <line x1="36" x2="204" y1="65" y2="65" className="hlb-balance" />
        </svg>
      );
    case 'jyotisha':
      return (
        <svg viewBox="0 0 240 140" aria-hidden="true" className="hlb-svg hlb-svg--orbit">
          <circle cx="120" cy="70" r="52" className="hlb-orbit-path" />
          <circle cx="120" cy="70" r="15" fill="#fde047" className="hlb-sun" />
          <g className="hlb-earth-orbit">
            <g transform="translate(172 70)">
              <circle r="7" fill="#60a5fa" />
              <g className="hlb-moon-orbit"><circle cx="15" cy="0" r="3" fill="#e2e8f0" /></g>
            </g>
          </g>
        </svg>
      );
    case 'srishti-sthiti-laya':
      return (
        <svg viewBox="0 0 240 140" aria-hidden="true" className="hlb-svg hlb-svg--loom">
          {Array.from({ length: 14 }, (_, i) => {
            const a = (i / 14) * Math.PI * 2;
            const sx = ((i * 53) % 200) - 100;
            const sy = ((i * 37) % 110) - 55;
            return (
              <circle
                key={i}
                cx={120 + Math.cos(a) * 40}
                cy={70 + Math.sin(a) * 40}
                r="4.5"
                className="hlb-loom-dot"
                style={{ '--sx': `${sx}px`, '--sy': `${sy}px`, animationDelay: `${(i % 5) * -0.12}s` } as React.CSSProperties}
              />
            );
          })}
        </svg>
      );
    case 'nada-brahman':
      return (
        <svg viewBox="0 0 240 140" aria-hidden="true" className="hlb-svg hlb-svg--nada">
          <line x1="20" x2="220" y1="70" y2="70" className="hlb-string-rest" />
          <path d="M20 70 Q70 20 120 70 T220 70" className="hlb-wave hlb-wave--a" />
          <path d="M20 70 Q70 120 120 70 T220 70" className="hlb-wave hlb-wave--b" />
          <circle cx="20" cy="70" r="5" className="hlb-peg" />
          <circle cx="220" cy="70" r="5" className="hlb-peg" />
          <circle cx="120" cy="70" r="3.5" className="hlb-node" />
        </svg>
      );
    case 'asato-ma':
      return (
        <svg viewBox="0 0 240 140" aria-hidden="true" className="hlb-svg hlb-svg--lattice">
          {Array.from({ length: 4 }, (_, r) =>
            Array.from({ length: 7 }, (_, c) => (
              <circle
                key={`${r}-${c}`}
                cx={36 + c * 28}
                cy={28 + r * 28}
                r={(r + c) % 2 ? 4 : 6.5}
                className={`hlb-atom ${(r + c) % 2 ? 'hlb-atom--b' : 'hlb-atom--a'}`}
                style={{ animationDelay: `${((r * 7 + c) % 6) * -0.15}s` }}
              />
            )),
          )}
        </svg>
      );
    case 'chandrayaan':
      return (
        <svg viewBox="0 0 240 140" aria-hidden="true" className="hlb-svg hlb-svg--chandra">
          <circle cx="120" cy="78" r="36" fill="#94a3b8" />
          <circle cx="108" cy="70" r="8" fill="rgba(15,23,42,0.35)" />
          <ellipse cx="120" cy="78" rx="58" ry="28" fill="none" stroke="#67e8f9" strokeDasharray="4 4" className="hlb-orbit-path" />
          <g className="hlb-earth-orbit"><g transform="translate(178 78)"><rect x="-5" y="-3" width="10" height="6" fill="#fde047" /><line x1="0" y1="3" x2="-10" y2="12" stroke="#fb923c" strokeWidth="2" className="hlb-wave--a" /></g></g>
        </svg>
      );
    case 'chaturyoni':
      return (
        <svg viewBox="0 0 240 140" aria-hidden="true" className="hlb-svg hlb-svg--yoni">
          {[
            { x: 52, y: 8, c: '#fb7185', t: 'जरायुज' },
            { x: 122, y: 8, c: '#fbbf24', t: 'अण्डज' },
            { x: 52, y: 72, c: '#2dd4bf', t: 'स्वेदज' },
            { x: 122, y: 72, c: '#4ade80', t: 'उद्भिज्ज' },
          ].map((q, i) => (
            <g key={q.t} className={`hlb-quad hlb-quad--${i + 1}`}>
              <rect x={q.x} y={q.y} width="66" height="60" rx="10" fill={q.c} />
              <text x={q.x + 33} y={q.y + 36} className="hlb-quad-text">{q.t}</text>
            </g>
          ))}
          <circle cx="120" cy="70" r="16" className="hlb-hub" />
          <text x="120" y="75" className="hlb-hub-text">योनि</text>
        </svg>
      );
    default:
      return null;
  }
};

const reducedMotion = () => {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
};

interface HomeLabBannerProps {
  onOpen: (segment?: string) => void;
}

const HomeLabBanner: React.FC<HomeLabBannerProps> = ({ onOpen }) => {
  const [idx, setIdx] = useState(0);
  const [hoverOrFocus, setHoverOrFocus] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [reduced] = useState(reducedMotion);
  const rootRef = useRef<HTMLDivElement>(null);
  const running = !reduced && !hoverOrFocus && !userPaused;

  useEffect(() => {
    if (!running) return;
    const t = window.setInterval(() => {
      if (document.visibilityState === 'visible') setIdx((i) => (i + 1) % MODULES.length);
    }, ROTATE_MS);
    return () => window.clearInterval(t);
  }, [running]);

  const go = (i: number) => setIdx((i + MODULES.length) % MODULES.length);
  const open = (e: React.MouseEvent, id?: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return; // let the browser open a new tab
    e.preventDefault();
    onOpen(id);
  };

  return (
    <section className="hlb" aria-labelledby="hlb-title" data-testid="home-science-lab-card">
      <div className="hlb-texture" aria-hidden="true">
        {MODULES.map((m, i) => (
          <span key={m.id} className={`hlb-texture-icon hlb-texture-icon--${i + 1}`}>{m.icon}</span>
        ))}
      </div>

      <div className="hlb-text">
        <span className="hlb-badge">New · Free for everyone</span>
        <h3 id="hlb-title" className="hlb-title">
          <span className="hlb-title-en">Vijñāna Lab</span>
          <span className="hlb-title-sa" lang="sa">विज्ञान-प्रयोगशाला</span>
        </h3>
        <p className="hlb-tagline">Boot up the ultimate reality simulator: physics, chemistry and biology through ancient lenses.</p>
        <ul className="hlb-pills" aria-label="Lab modules">
          {MODULES.map((m) => (
            <li key={m.id}>
              <a href={`/science-lab#${m.id}`} className="hlb-pill" onClick={(e) => open(e, m.id)} data-testid={`hlb-pill-${m.id}`}>
                <span aria-hidden="true">{m.icon}</span> {m.title}
              </a>
            </li>
          ))}
        </ul>
        <a href="/science-lab" className="hlb-cta" onClick={(e) => open(e)} data-testid="hlb-cta">
          Open the Lab <span className="hlb-cta-arrow" aria-hidden="true">→</span>
        </a>
      </div>

      <div
        ref={rootRef}
        className="hlb-carousel"
        role="region"
        aria-roledescription="carousel"
        aria-label="Lab module previews"
        data-testid="hlb-carousel"
        data-index={idx}
        data-running={running ? 'true' : 'false'}
        onMouseEnter={() => setHoverOrFocus(true)}
        onMouseLeave={() => setHoverOrFocus(false)}
        onFocus={() => setHoverOrFocus(true)}
        onBlur={(e) => {
          if (!rootRef.current?.contains(e.relatedTarget as Node)) setHoverOrFocus(false);
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') {
            e.preventDefault();
            go(idx + 1);
          } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            go(idx - 1);
          }
        }}
      >
        <div className="hlb-slides" aria-live={running ? 'off' : 'polite'}>
          {MODULES.map((m, i) => (
            <a
              key={m.id}
              href={`/science-lab#${m.id}`}
              className={`hlb-slide${i === idx ? ' is-active' : ''}`}
              aria-hidden={i !== idx}
              tabIndex={i === idx ? 0 : -1}
              aria-label={`Slide ${i + 1} of ${MODULES.length}: open ${m.title}`}
              onClick={(e) => open(e, m.id)}
              data-testid={`hlb-slide-${m.id}`}
            >
              <span className="hlb-slide-stage">{i === idx && <Preview id={m.id} />}</span>
              <span className="hlb-slide-meta">
                <span className="hlb-slide-subject">{m.subject}</span>
                <span className="hlb-slide-title">
                  <span aria-hidden="true">{m.icon}</span> {m.title}
                </span>
                <span className="hlb-slide-dev" lang="sa">{m.dev}</span>
                <span className="hlb-slide-go">Tap to open →</span>
              </span>
            </a>
          ))}
        </div>
        <div className="hlb-controls">
          <button type="button" className="hlb-arrow" onClick={() => go(idx - 1)} aria-label="Previous module" data-testid="hlb-prev">‹</button>
          <div className="hlb-dots">
            {MODULES.map((m, i) => (
              <button
                key={m.id}
                type="button"
                className={`hlb-dot${i === idx ? ' is-active' : ''}`}
                aria-label={`Show ${m.title}`}
                aria-current={i === idx ? 'true' : undefined}
                onClick={() => go(i)}
                data-testid={`hlb-dot-${i}`}
              />
            ))}
          </div>
          <button type="button" className="hlb-arrow" onClick={() => go(idx + 1)} aria-label="Next module" data-testid="hlb-next">›</button>
          {!reduced && (
            <button
              type="button"
              className="hlb-arrow hlb-playpause"
              onClick={() => setUserPaused((p) => !p)}
              aria-label={userPaused ? 'Resume auto-rotation' : 'Pause auto-rotation'}
              aria-pressed={userPaused}
              data-testid="hlb-pause"
            >
              {userPaused ? '▶' : '❚❚'}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeLabBanner;
