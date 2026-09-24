import React from 'react';

export type BodhiMood = 'namaste' | 'happy' | 'reading' | 'celebrate' | 'meditate' | 'scholar';

export interface BodhiAvatarProps {
  mood?: BodhiMood;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  className?: string;
  showHalo?: boolean;
  interactive?: boolean;
  onClick?: () => void;
  title?: string;
}

const SIZE_MAP: Record<string, number> = {
  xs: 32,
  sm: 44,
  md: 68,
  lg: 104,
  xl: 148,
};

export const BodhiAvatar: React.FC<BodhiAvatarProps> = ({
  mood = 'namaste',
  size = 'md',
  className = '',
  showHalo = true,
  interactive = false,
  onClick,
  title = 'Bodhi — Your Gurukul Sanskrit Guide (बोधिः)',
}) => {
  const pixelSize = typeof size === 'number' ? size : SIZE_MAP[size] || 68;

  return (
    <div
      className={`bodhi-avatar-wrapper ${className} ${interactive ? 'bodhi-interactive' : ''}`}
      style={{
        width: pixelSize,
        height: pixelSize,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        cursor: interactive ? 'pointer' : 'default',
        userSelect: 'none',
      }}
      onClick={onClick}
      title={title}
      role={interactive ? 'button' : 'img'}
      aria-label={title}
    >
      <svg
        viewBox="0 0 160 160"
        width={pixelSize}
        height={pixelSize}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* Wisdom Golden Halo Gradient */}
          <radialGradient id="bodhiHaloGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.85" />
            <stop offset="65%" stopColor="#f59e0b" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
          </radialGradient>

          {/* Skin Gradient */}
          <linearGradient id="bodhiSkinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffedd5" />
            <stop offset="100%" stopColor="#fed7aa" />
          </linearGradient>

          {/* Cheeks Glow */}
          <radialGradient id="bodhiCheekGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
          </radialGradient>

          {/* Saffron Robe Gradient */}
          <linearGradient id="bodhiRobeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>

          {/* Golden Robe Border */}
          <linearGradient id="bodhiGoldTrim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>

          {/* Hair Gradient */}
          <linearGradient id="bodhiHairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#292524" />
            <stop offset="100%" stopColor="#1c1917" />
          </linearGradient>

          {/* Palm Leaf Manuscript */}
          <linearGradient id="bodhiLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="100%" stopColor="#fde68a" />
          </linearGradient>

          {/* Drop Shadow filter */}
          <filter id="bodhiShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodOpacity="0.12" floodColor="#78350f" />
          </filter>
        </defs>

        {/* 1. Radiant Wisdom Aura / Halo */}
        {showHalo && (
          <circle
            cx="80"
            cy="80"
            r="74"
            fill="url(#bodhiHaloGrad)"
            className="bodhi-svg-halo"
          />
        )}

        {/* 2. Meditate Lotus Base if meditating */}
        {mood === 'meditate' && (
          <g transform="translate(0, 15)">
            <ellipse cx="80" cy="136" rx="48" ry="12" fill="#fed7aa" opacity="0.4" />
            <path
              d="M36 132 C46 122, 60 126, 80 136 C100 126, 114 122, 124 132 C112 144, 48 144, 36 132 Z"
              fill="#f472b6"
              opacity="0.85"
            />
            <path
              d="M50 135 C62 125, 72 128, 80 136 C88 128, 98 125, 110 135 C98 143, 62 143, 50 135 Z"
              fill="#fb7185"
            />
          </g>
        )}

        {/* 3. Traditional Scholar Shikha (Topknot) */}
        <g id="bodhi-shikha">
          {/* Top knot bun */}
          <circle cx="80" cy="27" r="13" fill="url(#bodhiHairGrad)" />
          {/* Little strand flowing back */}
          <path
            d="M80 20 C85 12, 98 14, 96 24 C95 30, 88 28, 84 26"
            stroke="url(#bodhiHairGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Rudraksha bead tying the topknot */}
          <circle cx="80" cy="35" r="3.5" fill="#854d0e" stroke="#fef08a" strokeWidth="1" />
          {/* Auspicious golden leaf / peacock sprout */}
          <path
            d="M82 17 C88 8, 95 9, 93 17 C91 22, 85 20, 82 17 Z"
            fill="#10b981"
            stroke="#047857"
            strokeWidth="0.8"
          />
          <circle cx="88" cy="14" r="1.5" fill="#0284c7" />
        </g>

        {/* 4. Torso & Traditional Saffron Robe (Uttariya & Angavastram) */}
        <g id="bodhi-body" filter="url(#bodhiShadow)">
          {/* Main torso / shoulders */}
          <path
            d="M44 116 C44 96, 60 92, 80 92 C100 92, 116 96, 116 116 C116 132, 112 144, 80 144 C48 144, 44 132, 44 116 Z"
            fill="url(#bodhiRobeGrad)"
          />

          {/* Angavastram sash across chest (left shoulder to right waist) */}
          <path
            d="M52 96 C64 104, 84 118, 108 136 L116 128 C96 110, 72 96, 60 92 Z"
            fill="#ea580c"
            opacity="0.9"
          />

          {/* Golden Zari embroidery edge */}
          <path
            d="M52 96 C64 104, 84 118, 108 136"
            stroke="url(#bodhiGoldTrim)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Sacred Tulsi/Rudraksha necklace */}
          <path
            d="M66 94 C72 104, 88 104, 94 94"
            stroke="#78350f"
            strokeWidth="1.8"
            strokeDasharray="2,2"
            fill="none"
          />
          <circle cx="80" cy="102" r="2.5" fill="#ca8a04" stroke="#fef08a" strokeWidth="0.6" />
        </g>

        {/* 5. Head & Ears */}
        <g id="bodhi-head" filter="url(#bodhiShadow)">
          {/* Left Ear */}
          <ellipse cx="46" cy="62" rx="5" ry="7.5" fill="url(#bodhiSkinGrad)" />
          <ellipse cx="46" cy="62" rx="2.5" ry="4" fill="#fb923c" opacity="0.3" />

          {/* Right Ear */}
          <ellipse cx="114" cy="62" rx="5" ry="7.5" fill="url(#bodhiSkinGrad)" />
          <ellipse cx="114" cy="62" rx="2.5" ry="4" fill="#fb923c" opacity="0.3" />

          {/* Neck */}
          <path d="M72 82 L72 94 C76 96, 84 96, 88 94 L88 82 Z" fill="#fdba74" />

          {/* Face base */}
          <circle cx="80" cy="62" r="35" fill="url(#bodhiSkinGrad)" />

          {/* Forehead hair lining */}
          <path
            d="M48 54 C54 40, 70 34, 80 34 C90 34, 106 40, 112 54 C104 46, 92 42, 80 43 C68 42, 56 46, 48 54 Z"
            fill="url(#bodhiHairGrad)"
          />
        </g>

        {/* 6. Sacred Tilak (Chandan vertical line + Kumkum bindi) */}
        <g id="bodhi-tilak">
          {/* Sandalwood white/yellow U-shape */}
          <path
            d="M78 44 C78 52, 79 56, 80 57 C81 56, 82 52, 82 44"
            stroke="#fef08a"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Sacred red Kumkum bindu */}
          <circle cx="80" cy="51" r="1.6" fill="#dc2626" />
        </g>

        {/* 7. Eyes, Eyebrows & Cheeks based on Mood */}
        <g id="bodhi-face">
          {/* Cheerful pink cheeks */}
          <circle cx="61" cy="71" r="7" fill="url(#bodhiCheekGrad)" />
          <circle cx="99" cy="71" r="7" fill="url(#bodhiCheekGrad)" />

          {/* Eyebrows */}
          <path
            d="M60 52 C65 50, 71 52, 73 54"
            stroke="#44403c"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M100 52 C95 50, 89 52, 87 54"
            stroke="#44403c"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />

          {/* EYES */}
          {mood === 'meditate' ? (
            // Meditative closed peaceful eyes
            <>
              <path
                d="M61 63 C65 67, 71 67, 74 63"
                stroke="#292524"
                strokeWidth="2.4"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M86 63 C89 67, 95 67, 99 63"
                stroke="#292524"
                strokeWidth="2.4"
                strokeLinecap="round"
                fill="none"
              />
            </>
          ) : mood === 'celebrate' ? (
            // Joyful smiling crescent eyes
            <>
              <path
                d="M60 64 C64 59, 71 59, 74 64"
                stroke="#1c1917"
                strokeWidth="2.6"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M86 64 C89 59, 96 59, 100 64"
                stroke="#1c1917"
                strokeWidth="2.6"
                strokeLinecap="round"
                fill="none"
              />
            </>
          ) : (
            // Big friendly open eyes with white sparkle highlights
            <>
              {/* Left Eye */}
              <ellipse cx="67" cy="62" rx="5.5" ry="6.5" fill="#1c1917" />
              <circle cx="65.5" cy="59.5" r="2" fill="#ffffff" />
              <circle cx="68.5" cy="63.5" r="1" fill="#ffffff" />

              {/* Right Eye */}
              <ellipse cx="93" cy="62" rx="5.5" ry="6.5" fill="#1c1917" />
              <circle cx="91.5" cy="59.5" r="2" fill="#ffffff" />
              <circle cx="94.5" cy="63.5" r="1" fill="#ffffff" />
            </>
          )}

          {/* Small gentle nose */}
          <path
            d="M79 66 C80 68, 81 68, 82 66"
            stroke="#fb923c"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
          />

          {/* Smiling Mouth */}
          {mood === 'celebrate' ? (
            // Big open happy smile
            <path
              d="M71 73 C75 82, 85 82, 89 73 Z"
              fill="#e11d48"
              stroke="#881337"
              strokeWidth="1"
            />
          ) : (
            // Sweet gentle smile
            <path
              d="M73 73 C76 77, 84 77, 87 73"
              stroke="#b91c1c"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
            />
          )}
        </g>

        {/* 8. Hands & Props based on Mood */}
        <g id="bodhi-hands">
          {mood === 'namaste' && (
            // Joined Anjali Mudra hands in front of chest
            <g transform="translate(0, 0)">
              {/* Hands joined */}
              <ellipse cx="76" cy="106" rx="5" ry="9" fill="url(#bodhiSkinGrad)" transform="rotate(-15 76 106)" />
              <ellipse cx="84" cy="106" rx="5" ry="9" fill="url(#bodhiSkinGrad)" transform="rotate(15 84 106)" />
              {/* Golden wrist band */}
              <ellipse cx="76" cy="113" rx="4" ry="1.5" fill="#f59e0b" />
              <ellipse cx="84" cy="113" rx="4" ry="1.5" fill="#f59e0b" />
            </g>
          )}

          {mood === 'happy' && (
            // Right hand waving happily!
            <g>
              {/* Left hand relaxed */}
              <ellipse cx="50" cy="118" rx="6" ry="6" fill="url(#bodhiSkinGrad)" />
              {/* Right arm raised waving */}
              <path
                d="M110 108 C120 100, 126 84, 124 74"
                stroke="url(#bodhiSkinGrad)"
                strokeWidth="10"
                strokeLinecap="round"
                fill="none"
              />
              {/* Hand with open wave */}
              <circle cx="124" cy="72" r="6" fill="url(#bodhiSkinGrad)" />
              {/* Little wave wind arcs */}
              <path d="M132 66 C136 70, 136 76, 132 80" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M136 68 C139 71, 139 75, 136 78" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </g>
          )}

          {mood === 'reading' && (
            // Holding golden Palm-Leaf Manuscript (ताडपत्रम्)
            <g>
              {/* Palm leaf manuscript strip */}
              <rect
                x="52"
                y="108"
                width="56"
                height="16"
                rx="4"
                fill="url(#bodhiLeafGrad)"
                stroke="#d97706"
                strokeWidth="1.2"
                transform="rotate(-2 80 116)"
                filter="url(#bodhiShadow)"
              />
              {/* Manuscript sacred binding string hole */}
              <circle cx="62" cy="116" r="1.5" fill="#b45309" />
              <circle cx="98" cy="116" r="1.5" fill="#b45309" />
              {/* Tiny Devanagari sacred writing */}
              <text x="73" y="120" fontSize="8" fontWeight="bold" fill="#78350f" fontFamily="sans-serif">
                ॐ अ
              </text>
              {/* Left & Right holding thumbs */}
              <circle cx="56" cy="116" r="4.5" fill="url(#bodhiSkinGrad)" />
              <circle cx="104" cy="116" r="4.5" fill="url(#bodhiSkinGrad)" />
            </g>
          )}

          {mood === 'celebrate' && (
            // Both hands up rejoicing! Plus stars/sparkles
            <g>
              {/* Left arm up */}
              <path
                d="M48 112 C38 100, 32 86, 36 74"
                stroke="url(#bodhiSkinGrad)"
                strokeWidth="8"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="36" cy="72" r="5.5" fill="url(#bodhiSkinGrad)" />

              {/* Right arm up */}
              <path
                d="M112 112 C122 100, 128 86, 124 74"
                stroke="url(#bodhiSkinGrad)"
                strokeWidth="8"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="124" cy="72" r="5.5" fill="url(#bodhiSkinGrad)" />

              {/* Golden sparkles / confetti */}
              <path d="M28 62 L30 56 L36 58 L31 63 L34 68 L28 65 L24 68 L26 62 Z" fill="#fbbf24" />
              <path d="M128 58 L131 52 L136 55 L132 60 L135 65 L129 62 L125 64 Z" fill="#f59e0b" />
              <circle cx="80" cy="20" r="2" fill="#ef4444" />
              <circle cx="48" cy="38" r="2.5" fill="#3b82f6" />
              <circle cx="112" cy="38" r="2.5" fill="#10b981" />
            </g>
          )}

          {mood === 'scholar' && (
            // Holding Peacock Feather Stylus
            <g>
              {/* Left hand holding scroll */}
              <ellipse cx="56" cy="114" rx="5" ry="6" fill="url(#bodhiSkinGrad)" />
              {/* Scroll */}
              <rect x="44" y="110" width="16" height="22" rx="3" fill="#fef3c7" stroke="#b45309" strokeWidth="1" transform="rotate(10 52 121)" />

              {/* Right hand with Peacock Feather Pen */}
              <ellipse cx="106" cy="110" rx="5" ry="6" fill="url(#bodhiSkinGrad)" />
              {/* Peacock feather */}
              <path
                d="M106 112 C114 100, 120 86, 122 72"
                stroke="#0284c7"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <ellipse cx="123" cy="70" rx="4.5" ry="6.5" fill="#047857" transform="rotate(20 123 70)" />
              <circle cx="123" cy="70" r="2.5" fill="#3b82f6" />
              <circle cx="123" cy="70" r="1.2" fill="#f59e0b" />
            </g>
          )}

          {mood === 'meditate' && (
            // Hands resting peacefully in Dhyana Mudra in lap
            <g>
              <ellipse cx="76" cy="124" rx="6" ry="4" fill="url(#bodhiSkinGrad)" />
              <ellipse cx="84" cy="124" rx="6" ry="4" fill="url(#bodhiSkinGrad)" />
              <circle cx="80" cy="123" r="3" fill="#fdba74" />
            </g>
          )}
        </g>
      </svg>
    </div>
  );
};

export default BodhiAvatar;
