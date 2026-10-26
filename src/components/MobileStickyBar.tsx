import React, { useState, useEffect } from 'react';
import '../styles/mobile-sticky-bar.css';

export interface MobileStickyBarProps {
  onStartLesson: () => void;
  onPlacementTest?: () => void;
  onStartTrial?: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  onStartLesson,
  onPlacementTest,
  onStartTrial,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when user scrolls down beyond hero (> 320px)
      if (window.scrollY > 320) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <aside className="msb-container" aria-label="Mobile Quick Action Bar">
      <div className="msb-inner">
        {/* Primary Action Button: Start Free Lesson */}
        <button
          type="button"
          className="msb-btn msb-btn--primary"
          onClick={onStartLesson}
          title="Start free lesson with instant audio and word tools"
        >
          <span className="msb-icon" aria-hidden="true">🚀</span>
          <span className="msb-label">Start Free Lesson</span>
        </button>

        {/* Secondary: Start 14-Day Free Access or 3-Min Placement Test */}
        {onStartTrial ? (
          <button
            type="button"
            className="msb-btn msb-btn--test"
            onClick={onStartTrial}
            title="Start 14-day free access"
          >
            <span className="msb-icon" aria-hidden="true">🎁</span>
            <span className="msb-label">14-Day Pass</span>
          </button>
        ) : onPlacementTest ? (
          <button
            type="button"
            className="msb-btn msb-btn--test"
            onClick={onPlacementTest}
            title="Take 3-minute Sanskrit placement quiz"
          >
            <span className="msb-icon" aria-hidden="true">🎯</span>
            <span className="msb-label">Placement Test</span>
          </button>
        ) : null}

        {/* WhatsApp Direct Help */}
        <a
          href="https://wa.me/919000335468?text=Hello%20EdNet%20Gurukul%2C%20I%20want%20to%20start%20learning%20Sanskrit"
          target="_blank"
          rel="noopener noreferrer"
          className="msb-btn msb-btn--wa"
          title="Contact on WhatsApp: 9000335468 (Only WhatsApp)"
          aria-label="Chat on WhatsApp"
        >
          <span className="msb-icon" aria-hidden="true">💬</span>
          <span className="msb-label">WhatsApp</span>
        </a>
      </div>
    </aside>
  );
};

export default MobileStickyBar;
