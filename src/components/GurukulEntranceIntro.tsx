import React, { useEffect, useState, useRef, useCallback } from 'react';
import { gurukulAmbiance } from '../utils/gurukulAmbiance';
import gurukulPanoramaUrl from '../assets/gurukul-dawn-panorama.jpg';
import '../styles/gurukul-intro.css';

interface GurukulEntranceIntroProps {
  onComplete: () => void;
  targetLogoId?: string;
  autoAdvanceMs?: number;
}

export const GurukulEntranceIntro: React.FC<GurukulEntranceIntroProps> = ({
  onComplete,
  targetLogoId = 'home-hero-crest-logo',
  autoAdvanceMs = 8000,
}) => {
  const [isExiting, setIsExiting] = useState(false);
  const [isFlying, setIsFlying] = useState(false);
  const [flyStyle, setFlyStyle] = useState<React.CSSProperties>({});
  const [isSuspended, setIsSuspended] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [, setSecondsLeft] = useState(() => Math.ceil(autoAdvanceMs / 1000));

  const logoRef = useRef<HTMLImageElement | null>(null);
  const timerRef = useRef<number | null>(null);
  const countdownIntervalRef = useRef<number | null>(null);
  const suspendedCheckRef = useRef<number | null>(null);

  // Start soundscape on mount with Sound ON
  useEffect(() => {
    if (typeof window !== 'undefined' && window.scrollY > 0) {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
    gurukulAmbiance.setMuted(false);
    void gurukulAmbiance.resume();
    gurukulAmbiance.startDawnAmbiance();

    // Visual countdown
    countdownIntervalRef.current = window.setInterval(() => {
      setSecondsLeft((prev) => (prev > 1 ? prev - 1 : 1));
    }, 1000);

    // Check if browser policy suspended audio
    const checkSuspended = () => {
      setIsSuspended(gurukulAmbiance.isSuspended());
    };
    checkSuspended();
    suspendedCheckRef.current = window.setInterval(checkSuspended, 350);

    // Auto-advance after lingering duration if user hasn't clicked
    timerRef.current = window.setTimeout(() => {
      triggerExit();
    }, autoAdvanceMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
      if (suspendedCheckRef.current) clearInterval(suspendedCheckRef.current);
      gurukulAmbiance.stopDawnAmbiance(0.6);
    };
  }, [autoAdvanceMs]);

  // Handle transition and flying logo animation
  const triggerExit = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }

    // Play sacred temple bell chime on entrance
    try {
      gurukulAmbiance.playTempleBell(432);
    } catch {
      // AudioContext fallback
    }

    // Fade out audio gracefully
    gurukulAmbiance.stopDawnAmbiance(1.0);

    const sourceLogo = logoRef.current;
    const targetLogo = document.getElementById(targetLogoId);

    if (sourceLogo && targetLogo) {
      if (typeof window !== 'undefined' && window.scrollY > 0) {
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      }
      const sourceRect = sourceLogo.getBoundingClientRect();
      const targetRect = targetLogo.getBoundingClientRect();

      // Lock current fixed coordinates before starting translation
      setFlyStyle({
        top: `${sourceRect.top}px`,
        left: `${sourceRect.left}px`,
        width: `${sourceRect.width}px`,
        height: `${sourceRect.height}px`,
        borderRadius: '26px',
      });
      setIsFlying(true);

      // Next frame: animate to destination coordinates
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setFlyStyle({
            top: `${targetRect.top}px`,
            left: `${targetRect.left}px`,
            width: `${targetRect.width}px`,
            height: `${targetRect.height}px`,
            borderRadius: '18px',
          });
        });
      });

      // Complete transition after animation ends
      setTimeout(() => {
        onComplete();
      }, 850);
    } else {
      setTimeout(() => {
        onComplete();
      }, 600);
    }
  }, [isExiting, onComplete, targetLogoId]);

  const handleContainerClick = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    triggerExit();
  };

  return (
    <div
      className={`gurukul-intro-overlay ${isExiting ? 'is-exiting' : ''}`}
      onClick={handleContainerClick}
      onPointerDown={() => {
        void gurukulAmbiance.resume();
        setIsSuspended(false);
      }}
      onTouchStart={() => {
        void gurukulAmbiance.resume();
        setIsSuspended(false);
      }}
      onMouseMove={() => {
        if (gurukulAmbiance.isSuspended()) {
          void gurukulAmbiance.resume();
          setIsSuspended(false);
        }
      }}
      role="dialog"
      aria-label="Gurukul Welcome Entrance"
    >
      {/* 2/3rd Space: Far-Distance Animated Cinema Establishing Shot */}
      <div className="gurukul-intro-scene gurukul-intro-scene--cinema" aria-hidden="true">
        {/* Synchronized Camera Pan & Crane Push-In Stage */}
        <div className="gurukul-cinema-stage">
          <div
            className="gurukul-intro-bg gurukul-intro-bg--panorama"
            style={{ backgroundImage: `url(${gurukulPanoramaUrl})` }}
          />

          {/* Rising Dawn Sun Glow behind Mountain Saddle */}
          <div className="gurukul-dawn-sun-glow" />

          {/* Diagonal Volumetric Dawn Light Shafts */}
          <div className="gurukul-volumetric-rays" />

          {/* Dual-Plane Parallax Valley Mist Drifting over River */}
          <div className="gurukul-mist-ribbon gurukul-mist-far" />
          <div className="gurukul-mist-ribbon gurukul-mist-near" />

          {/* Sunlit River Shimmer Glints */}
          <div className="gurukul-river-shimmer">
            <span className="gurukul-glint gurukul-glint-1" />
            <span className="gurukul-glint gurukul-glint-2" />
            <span className="gurukul-glint gurukul-glint-3" />
            <span className="gurukul-glint gurukul-glint-4" />
            <span className="gurukul-glint gurukul-glint-5" />
          </div>

          {/* Rising Sacred Yajna / Hearth Smoke Wisps from Distant Courtyard */}
          <div className="gurukul-hearth-smoke">
            <span className="gurukul-smoke-wisp gurukul-smoke-1" />
            <span className="gurukul-smoke-wisp gurukul-smoke-2" />
            <span className="gurukul-smoke-wisp gurukul-smoke-3" />
          </div>

          {/* Graceful Distant Valley Cranes Gliding in Staggered Formation */}
          <div className="gurukul-intro-sky-birds gurukul-sky-birds--distant">
            {[1, 2, 3, 4, 5].map((n) => (
              <span key={n} className={`gurukul-bird gurukul-bird-${n}`}>
                <svg viewBox="0 0 32 20" className="gurukul-bird-svg">
                  <path d="M 0 10 Q 8 1 16 8 Q 24 1 32 10 Q 24 13 16 9 Q 8 13 0 10 Z" />
                </svg>
              </span>
            ))}
          </div>
        </div>

        {/* Foreground Floating Golden Dawn Motes (Depth-of-Field Parallax) */}
        <div className="gurukul-dawn-motes">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((m) => (
            <span key={m} className={`gurukul-mote gurukul-mote-${m}`} />
          ))}
        </div>

        {/* Subtle Atmospheric Vignette & Cinema Framing */}
        <div className="gurukul-cinema-vignette" />

        {/* Scene Caption (Zero-Emoji SVG Sunrise Icon) */}
        <div className="gurukul-scene-caption">
          <span className="gsc-pill">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ marginRight: '6px', verticalAlign: '-2px' }}>
              <path d="M12 2v4M4.93 10.93l2.83 2.83M2 18h20M19.07 10.93l-2.83 2.83M6 18a6 6 0 0 1 12 0" />
            </svg>
            Gurukul Dawn &middot; <span lang="sa">प्रातःकालः</span>
          </span>
        </div>

        {/* Play → Wisdom brand overlay */}
        <div className="gurukul-scene-tagline gurukul-scene-tagline--cinema">
          <p className="gst-main">Learn Through Play.</p>
          <p className="gst-sub">Exploring Indian Knowledge Systems, creativity and the wonders of learning.</p>
          <p className="gst-sub">A place where children can explore, question, experiment and discover connections between traditional knowledge and modern science.</p>
        </div>
      </div>

      {/* 1/3rd Side: EdNet Learn Logo & Welcome Portal */}
      <div className="gurukul-intro-content" onClick={(e) => e.stopPropagation()}>
        {/* Sacred Brand Crest with Mandala Aura */}
        <div className="gurukul-intro-crest-wrap">
          <div className="gurukul-intro-mandala" aria-hidden="true" style={{ pointerEvents: 'none' }} />
          <img
            ref={logoRef}
            src="/logo-intro.webp"
            width={256}
            height={256}
            decoding="async"
            fetchPriority="high"
            alt="EdNet Gurukul Brand Crest"
            className={`gurukul-intro-logo ${isFlying ? 'is-flying' : ''}`}
            style={isFlying ? flyStyle : undefined}
          />
        </div>

        <div className="gurukul-intro-brand-title">
          <span className="gurukul-intro-badge">EdNet Learn · Gurukul</span>
          <p className="gurukul-intro-tagline">Play → Wisdom</p>
        </div>

        <p className="gurukul-intro-verse">स्वाध्यायान्मा प्रमदः</p>

        <div className="gurukul-intro-actions">
          <button
            type="button"
            className={`gurukul-intro-enter-btn${isSuspended ? ' is-suspended-prompt' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              void gurukulAmbiance.resume();
              setIsSuspended(false);
              triggerExit();
            }}
            autoFocus
            aria-label="गुरुकुलं प्रविश · Enter Gurukul"
            title="गुरुकुलं प्रविश · Enter Gurukul"
          >
            <span className="gurukul-intro-bell-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" className="gurukul-intro-bell-svg">
                <path d="M12 2C10.34 2 9 3.34 9 5c0 .35.06.69.17 1A7.002 7.002 0 005 13v4l-2 2v1h18v-1l-2-2v-4a7.002 7.002 0 00-4.17-7c.11-.31.17-.65.17-1 0-1.66-1.34-3-3-3zm0 20a3 3 0 003-3H9a3 3 0 003 3z" />
              </svg>
            </span>
            <span className="gurukul-btn-txt-sa" lang="sa">गुरुकुलं प्रविश</span>
            <span className="gec-sep" aria-hidden="true">·</span>
            <span className="gurukul-btn-txt-en">Enter Gurukul</span>
            <span className="gurukul-enter-arrow" aria-hidden="true">➔</span>
          </button>
        </div>

        {/* Lingering Indicator & Progress Bar */}
        <div className="gurukul-intro-linger-wrap" aria-live="polite">
          <div className="gurukul-intro-linger-track">
            <div
              className="gurukul-intro-linger-bar"
              style={{ animationDuration: `${autoAdvanceMs}ms` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
