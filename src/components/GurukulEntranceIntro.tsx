import React, { useEffect, useState, useRef, useCallback } from 'react';
import { gurukulAmbiance } from '../utils/gurukulAmbiance';
import gurukulDawnUrl from '../assets/gurukul-dawn.jpg';
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
  const [isMuted, setIsMuted] = useState(false);
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
      {/* 2/3rd Space: Gurukul Painting Scene (Dawn Courtyard & River) */}
      <div className="gurukul-intro-scene" aria-hidden="true">
        <div
          className="gurukul-intro-bg"
          style={{ backgroundImage: `url(${gurukulDawnUrl})` }}
        />

        {/* Atmospheric Mist & Golden Sunrise Beams */}
        <div className="gurukul-intro-mist" />
        <div className="gurukul-intro-sunbeams" />

        {/* Flying Morning Birds Flock */}
        <div className="gurukul-intro-sky-birds">
          <span className="gurukul-bird gurukul-bird-1">
            <svg viewBox="0 0 32 20" className="gurukul-bird-svg">
              <path d="M 0 10 Q 8 0 16 8 Q 24 0 32 10 Q 24 14 16 9 Q 8 14 0 10 Z" />
            </svg>
          </span>
          <span className="gurukul-bird gurukul-bird-2">
            <svg viewBox="0 0 32 20" className="gurukul-bird-svg">
              <path d="M 0 10 Q 8 0 16 8 Q 24 0 32 10 Q 24 14 16 9 Q 8 14 0 10 Z" />
            </svg>
          </span>
          <span className="gurukul-bird gurukul-bird-3">
            <svg viewBox="0 0 32 20" className="gurukul-bird-svg">
              <path d="M 0 10 Q 8 0 16 8 Q 24 0 32 10 Q 24 14 16 9 Q 8 14 0 10 Z" />
            </svg>
          </span>
          <span className="gurukul-bird gurukul-bird-4">
            <svg viewBox="0 0 32 20" className="gurukul-bird-svg">
              <path d="M 0 10 Q 8 0 16 8 Q 24 0 32 10 Q 24 14 16 9 Q 8 14 0 10 Z" />
            </svg>
          </span>
        </div>

        {/* Scene Caption */}
        <div className="gurukul-scene-caption">
          <span className="gsc-pill">🌅 प्रातः-स्मरणम् · Gurukul Dawn Awakening</span>
        </div>
      </div>

      {/* 1/3rd Side: EdNet Learn Logo & Welcome Portal */}
      <div className="gurukul-intro-content" onClick={(e) => e.stopPropagation()}>
        {/* Sacred Brand Crest with Mandala Aura */}
        <div className="gurukul-intro-crest-wrap">
          <div className="gurukul-intro-mandala" aria-hidden="true" style={{ pointerEvents: 'none' }} />
          <img
            ref={logoRef}
            src="/logo.jpg"
            alt="EdNet Gurukul Brand Crest"
            className={`gurukul-intro-logo ${isFlying ? 'is-flying' : ''}`}
            style={isFlying ? flyStyle : undefined}
            role="button"
            tabIndex={0}
            title="Enter Gurukul"
            aria-label="Enter Gurukul homepage"
            onClick={(e) => { e.stopPropagation(); setHasInteracted(true); triggerExit(); }}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); triggerExit(); } }}
          />
        </div>

        <div className="gurukul-intro-brand-title">
          <span className="gurukul-intro-badge">🏛️ EdNet Gurukul</span>
          <h2 className="gurukul-intro-title" lang="sa">गुरुकुल-प्रवेशः</h2>
        </div>

        <p className="gurukul-intro-verse">
          सत्यं वद · धर्मं चर · स्वाध्यायान्मा प्रमदः
        </p>
        <p className="gurukul-intro-verse-en">
          अपने ज्ञान, अध्ययन और आत्म-सुधार के कार्य में कभी आलसी या लापरवाह न बनें; यह एक आजीवन साधना है।
        </p>

        {/* Bioacoustic Sound Indicator */}
        <div
          className={`gurukul-intro-sound-pill${isSuspended ? ' is-suspended-prompt' : ''}`}
          role="button"
          aria-label="Morning birdsong and river ambiance"
          onClick={(e) => {
            e.stopPropagation();
            void gurukulAmbiance.resume();
            setIsSuspended(false);
          }}
          title={isSuspended ? 'Tap to awaken morning soundscape' : 'Morning soundscape is ON'}
        >
          <span>{isSuspended ? '🔊' : '🌿'}</span>
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
            <span lang="sa">गुरुकुलं प्रविश</span> · <span>Enter Gurukul</span>
            <span>➔</span>
          </button>

          <button
            type="button"
            className="gurukul-intro-mute-btn"
            onClick={toggleSound}
            aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
            title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
          >
            <span>{isMuted ? '🔇' : '🔊'}</span>
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
