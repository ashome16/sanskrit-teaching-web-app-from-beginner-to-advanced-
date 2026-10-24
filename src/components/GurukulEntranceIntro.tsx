import React, { useEffect, useState, useRef, useCallback } from 'react';
import { gurukulAmbiance } from '../utils/gurukulAmbiance';
import '../styles/gurukul-intro.css';

interface GurukulEntranceIntroProps {
  onComplete: () => void;
  targetLogoId?: string;
  autoAdvanceMs?: number;
}

export const GurukulEntranceIntro: React.FC<GurukulEntranceIntroProps> = ({
  onComplete,
  targetLogoId = 'home-hero-crest-logo',
  autoAdvanceMs = 8500,
}) => {
  const [isExiting, setIsExiting] = useState(false);
  const [isFlying, setIsFlying] = useState(false);
  const [flyStyle, setFlyStyle] = useState<React.CSSProperties>({});
  const [isMuted, setIsMuted] = useState(false);
  const [isSuspended, setIsSuspended] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(() => Math.ceil(autoAdvanceMs / 1000));

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

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const muted = gurukulAmbiance.toggleMute();
    setIsMuted(muted);
    setHasInteracted(true);
  };

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
      {/* Background Painting Scene */}
      <div
        className="gurukul-intro-bg"
        style={{ backgroundImage: `url('/gurukul-dawn.jpg')` }}
      />

      {/* Atmospheric Mist & Golden Sunrise Beams */}
      <div className="gurukul-intro-mist" />
      <div className="gurukul-intro-sunbeams" />

      {/* Silhouettes of Morning Birds Gliding in Sky */}
      <div className="gurukul-intro-sky-birds" aria-hidden="true">
        <div className="gurukul-bird gurukul-bird-1">
          <svg className="gurukul-bird-svg" viewBox="0 0 40 24">
            <path d="M 0 12 Q 10 2 20 12 Q 30 2 40 12 Q 30 14 20 12 Q 10 14 0 12 Z" />
          </svg>
        </div>
        <div className="gurukul-bird gurukul-bird-2">
          <svg className="gurukul-bird-svg" viewBox="0 0 40 24">
            <path d="M 0 12 Q 10 2 20 12 Q 30 2 40 12 Q 30 14 20 12 Q 10 14 0 12 Z" />
          </svg>
        </div>
        <div className="gurukul-bird gurukul-bird-3">
          <svg className="gurukul-bird-svg" viewBox="0 0 40 24">
            <path d="M 0 12 Q 10 2 20 12 Q 30 2 40 12 Q 30 14 20 12 Q 10 14 0 12 Z" />
          </svg>
        </div>
      </div>

      {/* Main Centerpiece Content */}
      <div className="gurukul-intro-content" onClick={(e) => e.stopPropagation()}>
        {/* Sacred Brand Crest with Mandala Aura */}
        <div className="gurukul-intro-crest-wrap">
          <div className="gurukul-intro-mandala" aria-hidden="true" />
          <img
            ref={logoRef}
            src="/logo.jpg"
            alt="EdNet Gurukul Brand Crest"
            className={`gurukul-intro-logo ${isFlying ? 'is-flying' : ''}`}
            style={isFlying ? flyStyle : undefined}
            onClick={triggerExit}
          />
        </div>

        {/* Sacred Sanskrit Invocation */}
        <div className="gurukul-intro-badge">
          <span>🕉️</span>
          <span>गुरुकुल-प्रवेशः · Sacred Entrance</span>
        </div>

        <h1 className="gurukul-intro-title">
          विद्यां ददाति विनयं विनयाद् याति पात्रताम्
        </h1>

        <p className="gurukul-intro-verse">
          सत्यं वद · धर्मं चर · स्वाध्यायान्मा प्रमदः
        </p>

        <p className="gurukul-intro-subtitle">
          EdNet Learn Gurukul · Ancient Sanskrit &amp; Vedic Studies for All Learners
        </p>

        {/* Bioacoustic Sound Indicator */}
        <div
          className={`gurukul-intro-sound-pill${isSuspended ? ' is-suspended-prompt' : ''}`}
          aria-label="Bioacoustic birdsong, peacock, and sacred river ambiance playing"
          onClick={(e) => {
            e.stopPropagation();
            void gurukulAmbiance.resume();
            setIsSuspended(false);
          }}
          title={isSuspended ? 'Tap to awaken morning soundscape' : 'Morning soundscape is ON'}
        >
          <span>{isSuspended ? '🔊' : '🌿'}</span>
          <span>
            {isSuspended
              ? 'Sound ON · Tap anywhere to awaken morning birdsong'
              : 'Sound ON · Vedic Tapovana Gurukul at Dawn'}
          </span>
          {!isSuspended && (
            <div className="gurukul-sound-waves" aria-hidden="true">
              <div className="gurukul-sound-bar" />
              <div className="gurukul-sound-bar" />
              <div className="gurukul-sound-bar" />
              <div className="gurukul-sound-bar" />
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="gurukul-intro-actions">
          <button
            type="button"
            className="gurukul-intro-enter-btn"
            onClick={triggerExit}
            autoFocus
          >
            <span>Enter Gurukul</span>
            <span>➔</span>
          </button>

          <button
            type="button"
            className="gurukul-intro-mute-btn"
            onClick={toggleSound}
            aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
          >
            <span>{isMuted ? '🔇' : '🔊'}</span>
            <span>{isMuted ? 'Sound Muted' : 'Sound On'}</span>
          </button>
        </div>

        {/* Lingering Indicator & Progress Bar */}
        <div className="gurukul-intro-linger-wrap" aria-live="polite">
          <div className="gurukul-intro-linger-hint">
            <span className="gurukul-intro-linger-pulse">⏳</span>
            <span>
              Press button to enter, or entering in <strong>{secondsLeft}s</strong>
            </span>
          </div>
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
