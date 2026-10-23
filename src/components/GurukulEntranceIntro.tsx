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
  autoAdvanceMs = 3400,
}) => {
  const [isExiting, setIsExiting] = useState(false);
  const [isFlying, setIsFlying] = useState(false);
  const [flyStyle, setFlyStyle] = useState<React.CSSProperties>({});
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const logoRef = useRef<HTMLImageElement | null>(null);
  const timerRef = useRef<number | null>(null);

  // Start soundscape on mount
  useEffect(() => {
    gurukulAmbiance.startDawnAmbiance();

    // Auto-advance after specified time if user hasn't clicked
    timerRef.current = window.setTimeout(() => {
      triggerExit();
    }, autoAdvanceMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
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

    // Fade out audio gracefully
    gurukulAmbiance.stopDawnAmbiance(1.0);

    const sourceLogo = logoRef.current;
    const targetLogo = document.getElementById(targetLogoId);

    if (sourceLogo && targetLogo) {
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
        <div className="gurukul-intro-sound-pill" aria-label="Bioacoustic birdsong playing">
          <span>🌿</span>
          <span>Forest Dawn Birdsong &amp; Temple Chimes</span>
          <div className="gurukul-sound-waves" aria-hidden="true">
            <div className="gurukul-sound-bar" />
            <div className="gurukul-sound-bar" />
            <div className="gurukul-sound-bar" />
            <div className="gurukul-sound-bar" />
          </div>
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
      </div>
    </div>
  );
};
