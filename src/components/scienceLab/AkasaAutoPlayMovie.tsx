import React, { useEffect, useState } from 'react';
import { soundEffects } from '../../utils/soundEffects';

interface MovieAct {
  actNumber: number;
  icon: string;
  titleDev: string;
  titleEn: string;
  bodhiQuestion: string;
  kanadaAnswer: string;
  sutraInsight: string;
  elementColor: string;
  freq: number;
  soundType: 'snap' | 'water' | 'fire' | 'wind' | 'space';
}

const MOVIE_ACTS: MovieAct[] = [
  {
    actNumber: 1,
    icon: '⚛️',
    titleDev: 'अङ्कः १ · परमाणु एवं द्व्यणुक-सृष्टिः',
    titleEn: 'Act 1: The Indivisible Seed (Paramāṇu ➔ Dvyaṇuka ➔ Tryaṇuka)',
    bodhiQuestion: 'Deva, what is the smallest building block of matter in physical reality?',
    kanadaAnswer:
      'The uncaused, indivisible Paramāṇu (परमाणु). It has no parts and cannot be destroyed. Two unite via Saṁyoga to forge a Dvyaṇuka (द्व्यणुक), and three Dvyaṇukas bind into a visible Tryaṇuka (त्रसरेणु) dancing in the sunbeam!',
    sutraInsight: 'नित्यं परिमण्डलम् (Paramāṇus are eternal spherical unities) · Vaiśeṣika Sūtra 7.1.20',
    elementColor: '#facc15',
    freq: 261.63,
    soundType: 'snap',
  },
  {
    actNumber: 2,
    icon: '🪨💧',
    titleDev: 'अङ्कः २ · पृथिवी एवं अप्-संयोगः',
    titleEn: 'Act 2: Earth Mass & Water Cohesion (Sneha Binding)',
    bodhiQuestion: 'Why can’t dry earth dust particles make the pot alone? Why is water essential?',
    kanadaAnswer:
      'Loose dust particles cannot hold form! Water provides Sneha (स्नेह - cohesive viscidity) to bind individual Aṇu particles into malleable clay. Earth is the material cause (समवायि-कारणम्); Water is the cohesive agent!',
    sutraInsight: 'अपां सङ्घातो विलायनं च (Water binds loose earth into coherent mass) · Vaiśeṣika Sūtra 5.2.8',
    elementColor: '#0284c7',
    freq: 293.66,
    soundType: 'water',
  },
  {
    actNumber: 3,
    icon: '🔥',
    titleDev: 'अङ्कः ३ · पीलुपाक-प्रक्रिया (अग्नि-संयोगः)',
    titleEn: 'Act 3: Thermal Transformation (Pīlukapāka Ceramic Firing)',
    bodhiQuestion: 'How does raw gray mud turn into hardened, watertight red terracotta?',
    kanadaAnswer:
      'Pīlukapāka! Intense heat (Tejas) penetrates molecular bonds, breaking old dyads (Vibhāga) and altering atomic qualities. The atoms instantly recombine into rigid, vitreous red ceramic with ringing acoustic density!',
    sutraInsight: 'पाकज-गुणाः (Heat permanently transforms atomic qualities) · Vaiśeṣika Sūtra 7.1.6',
    elementColor: '#ea580c',
    freq: 329.63,
    soundType: 'fire',
  },
  {
    actNumber: 4,
    icon: '💨',
    titleDev: 'अङ्कः ४ · वेगः एवं कुलाल-चक्रम्',
    titleEn: 'Act 4: Kinetic Momentum & Drying (Vāyu & Kulāla-Cakra)',
    bodhiQuestion: 'What is the invisible role of Air on the spinning potter’s wheel?',
    kanadaAnswer:
      'Air provides kinetic momentum (Vega) to spin the wheel smoothly, while atmospheric circulation evaporates excess moisture so the vessel retains its graceful, slender neck and flared lip!',
    sutraInsight: 'वेगात् कर्म जायते (Kinetic momentum generates continuous rotation) · Vaiśeṣika Sūtra 5.1.17',
    elementColor: '#10b981',
    freq: 392.0,
    soundType: 'wind',
  },
  {
    actNumber: 5,
    icon: '🌌',
    titleDev: 'अङ्कः ५ · आकाश-रहस्यम् एवं घण्टा-नादः',
    titleEn: 'Act 5: The Supreme Mystery of Space (Ghaṭākāśa & Resonance)',
    bodhiQuestion: 'We never forged a Tryaṇuka for Space! How did the 5th element enter the vessel?',
    kanadaAnswer:
      'Space is all-pervading (सर्वगतम्)! We did not create space—by shaping the 4 atomic walls around emptiness, we revealed the hollow room (Avakāśa). Space was here before the pot, is here now, and will remain when the pot breaks. Strike the pot: Sound (Śabda) is the proof of Space!',
    sutraInsight: 'परिशेषाल्लिङ्गम् आकाशस्य (Sound is the proof of all-pervading Space) · Vaiśeṣika Sūtra 2.1.27',
    elementColor: '#a855f7',
    freq: 528.0,
    soundType: 'space',
  },
];

interface AkasaAutoPlayMovieProps {
  onSwitchToInteractive: () => void;
  onRingPot?: () => void;
}

export const AkasaAutoPlayMovie: React.FC<AkasaAutoPlayMovieProps> = ({
  onSwitchToInteractive,
  onRingPot,
}) => {
  const [currentActIdx, setCurrentActIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState<1 | 1.5>(1);

  const act = MOVIE_ACTS[currentActIdx];

  // Play corresponding sound effect when act changes
  useEffect(() => {
    if (act.soundType === 'snap') {
      soundEffects.playPuzzleSnap();
    } else if (act.soundType === 'water') {
      soundEffects.playElementSummon('ap');
    } else if (act.soundType === 'fire') {
      soundEffects.playElementSummon('tejas');
    } else if (act.soundType === 'wind') {
      soundEffects.playElementSummon('vayu');
    } else if (act.soundType === 'space') {
      soundEffects.playTrasarenuChime();
    }
  }, [currentActIdx, act.soundType]);

  // Auto-play timer loop
  useEffect(() => {
    if (!isPlaying) return;

    const intervalTime = (speedMultiplier === 1 ? 6500 : 4300);
    const timer = setInterval(() => {
      setCurrentActIdx((prev) => {
        if (prev < MOVIE_ACTS.length - 1) {
          return prev + 1;
        } else {
          setIsPlaying(false);
          return prev;
        }
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying, speedMultiplier]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    soundEffects.playStrokeChime();
  };

  const handleNext = () => {
    if (currentActIdx < MOVIE_ACTS.length - 1) {
      setCurrentActIdx((i) => i + 1);
    } else {
      setCurrentActIdx(0);
    }
    soundEffects.playStrokeChime();
  };

  const handlePrev = () => {
    if (currentActIdx > 0) {
      setCurrentActIdx((i) => i - 1);
    } else {
      setCurrentActIdx(MOVIE_ACTS.length - 1);
    }
    soundEffects.playStrokeChime();
  };

  const handleReplay = () => {
    setCurrentActIdx(0);
    setIsPlaying(true);
    soundEffects.playStrokeChime();
  };

  return (
    <div className="akasa-autoplay-wrap" role="region" aria-label="Auto-Play Story Walkthrough Movie">
      {/* 1. Header with Movie Controls */}
      <div className="akasa-autoplay-header">
        <div className="akasa-autoplay-title">
          <span>🎬 Sage Kaṇāda’s Cosmic Creation Movie (चलच्चित्र-दर्शनम्)</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <button
            type="button"
            className="akasa-pill"
            onClick={() => setSpeedMultiplier((s) => (s === 1 ? 1.5 : 1))}
            title="Toggle playback speed"
          >
            ⚡ {speedMultiplier}x Speed
          </button>
          <button
            type="button"
            className="akasa-pill is-gold"
            onClick={togglePlay}
            title={isPlaying ? 'Pause auto-play walkthrough' : 'Resume auto-play walkthrough'}
          >
            {isPlaying ? '⏸️ Pause Film' : '▶️ Play Film'}
          </button>
        </div>
      </div>

      {/* 2. Acts Progress Nav Ribbon */}
      <div className="akasa-autoplay-acts-nav" role="tablist" aria-label="Story Acts">
        {MOVIE_ACTS.map((a, idx) => {
          const isActive = idx === currentActIdx;
          const isDone = idx < currentActIdx;
          return (
            <button
              key={a.actNumber}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`akasa-autoplay-act-pill${isActive ? ' is-active' : isDone ? ' is-completed' : ''}`}
              onClick={() => {
                setCurrentActIdx(idx);
                soundEffects.playPuzzleSnap();
              }}
              title={a.titleEn}
            >
              <span>{a.icon}</span>
              <span>Act {a.actNumber}</span>
              {isDone && <span>✓</span>}
            </button>
          );
        })}
      </div>

      {/* 3. The Animated Cinematic Stage */}
      <div
        className="akasa-autoplay-stage"
        style={{ borderColor: act.elementColor, boxShadow: `0 0 25px ${act.elementColor}22` }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <strong style={{ color: act.elementColor, fontSize: '1.05rem' }}>{act.titleDev}</strong>
            <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{act.titleEn}</div>
          </div>
          <span style={{ fontSize: '2rem' }}>{act.icon}</span>
        </div>

        {/* Dynamic Visual Stage Area */}
        <div className="akasa-autoplay-visual">
          <svg viewBox="0 0 520 200" style={{ maxWidth: '520px', width: '100%', height: 'auto' }}>
            <defs>
              <radialGradient id="stageNebula" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={act.elementColor} stopOpacity="0.45" />
                <stop offset="100%" stopColor="#030712" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Background Cosmic Glow */}
            <ellipse cx="260" cy="100" rx="220" ry="85" fill="url(#stageNebula)" />

            {/* ACT 1 ANIMATION: 2 Paramāṇus fusing into Dvyaṇuka & Tryaṇuka */}
            {act.actNumber === 1 && (
              <g>
                <circle cx="150" cy="100" r="16" fill="#facc15" stroke="#fef08a" strokeWidth="2.5" />
                <text x="150" y="105" textAnchor="middle" fontSize="12" fontWeight="900" fill="#0f172a">Aṇu</text>

                <line x1="166" y1="100" x2="224" y2="100" stroke="#facc15" strokeWidth="3" strokeDasharray="4 2" />

                <circle cx="240" cy="100" r="16" fill="#facc15" stroke="#fef08a" strokeWidth="2.5" />
                <text x="240" y="105" textAnchor="middle" fontSize="12" fontWeight="900" fill="#0f172a">Aṇu</text>

                <text x="195" y="70" textAnchor="middle" fill="#fef08a" fontSize="11" fontWeight="800">
                  Saṁyoga Conjunction ➔
                </text>

                {/* Resulting Dvyaṇuka & Tryaṇuka Triad */}
                <g transform="translate(340, 100)">
                  <ellipse cx="0" cy="0" rx="36" ry="24" fill="rgba(250, 204, 21, 0.25)" stroke="#facc15" strokeWidth="2" />
                  <circle cx="-12" cy="0" r="10" fill="#facc15" />
                  <circle cx="12" cy="0" r="10" fill="#facc15" />
                  <text x="0" y="38" textAnchor="middle" fill="#fde047" fontSize="10" fontWeight="800">
                    द्व्यणुकम् (Binary Dyad)
                  </text>
                </g>
              </g>
            )}

            {/* ACT 2 ANIMATION: Earth dust + Water drops binding into clay mound */}
            {act.actNumber === 2 && (
              <g>
                {/* Loose Earth Dust Motes */}
                <g>
                  <circle cx="120" cy="80" r="7" fill="#ca8a04" />
                  <circle cx="140" cy="110" r="6" fill="#ca8a04" />
                  <circle cx="105" cy="120" r="8" fill="#ca8a04" />
                  <text x="125" y="145" textAnchor="middle" fill="#ca8a04" fontSize="10" fontWeight="800">
                    Loose Earth (धूलिः)
                  </text>
                </g>

                {/* Inflowing Water Drops */}
                <g>
                  <path d="M 210 60 C 205 75, 220 85, 220 95 C 220 105, 205 105, 205 95 Z" fill="#38bdf8" />
                  <path d="M 235 75 C 230 85, 245 95, 245 105 C 245 112, 235 112, 235 105 Z" fill="#0284c7" />
                  <text x="225" y="135" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="800">
                    + स्नेह (Sneha)
                  </text>
                </g>

                {/* Formed Malleable Clay Mound */}
                <g transform="translate(350, 100)">
                  <ellipse cx="0" cy="20" rx="48" ry="26" fill="#78350f" stroke="#eab308" strokeWidth="2.5" />
                  <ellipse cx="0" cy="14" rx="36" ry="16" fill="#92400e" opacity="0.8" />
                  <text x="0" y="60" textAnchor="middle" fill="#fef08a" fontSize="10" fontWeight="800">
                    मृत्तिका-पिण्डः (Malleable Clay)
                  </text>
                </g>
              </g>
            )}

            {/* ACT 3 ANIMATION: Kiln Firing & Pīlukapāka Heat */}
            {act.actNumber === 3 && (
              <g>
                {/* Raw Clay turning into glowing terracotta */}
                <ellipse cx="260" cy="115" rx="60" ry="32" fill="#c2410c" stroke="#ea580c" strokeWidth="3" />
                <ellipse cx="260" cy="110" rx="46" ry="20" fill="#f97316" opacity="0.6" />

                {/* Thermal Flame Tongues */}
                {Array.from({ length: 9 }, (_, f) => {
                  const fx = 210 + f * 12;
                  const fy = 65 + (f % 3) * 6;
                  return (
                    <path
                      key={f}
                      d={`M ${fx} 115 Q ${fx + 5} ${fy} ${fx + 10} 115 Z`}
                      fill={f % 2 === 0 ? '#facc15' : '#ea580c'}
                      opacity={0.85}
                    />
                  );
                })}

                <text x="260" y="45" textAnchor="middle" fill="#fdba74" fontSize="11" fontWeight="900">
                  🔥 पीलुपाक-प्रक्रिया · Thermal Bond Transformation
                </text>
                <text x="260" y="165" textAnchor="middle" fill="#fef08a" fontSize="10" fontWeight="800">
                  Dark Mud ➔ Hardened Terracotta Ceramic (पक्व-घटः)
                </text>
              </g>
            )}

            {/* ACT 4 ANIMATION: Potter's Wheel Rotation & Vega */}
            {act.actNumber === 4 && (
              <g>
                {/* Turning Wheel Base */}
                <ellipse cx="260" cy="130" rx="90" ry="22" fill="#1e293b" stroke="#34d399" strokeWidth="2.5" />
                <ellipse cx="260" cy="130" rx="60" ry="14" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />

                {/* Emerging Neck of Vessel */}
                <path d="M 235 125 C 220 95, 220 70, 245 55 L 275 55 C 300 70, 300 95, 285 125 Z" fill="#ea580c" stroke="#7c2d12" strokeWidth="2" />
                <ellipse cx="260" cy="55" rx="16" ry="5" fill="#9a3412" stroke="#34d399" strokeWidth="1.5" />

                {/* Rotation kinetic arrows */}
                <path d="M 175 120 Q 260 145 345 120" fill="none" stroke="#34d399" strokeWidth="2" strokeDasharray="5 3" />
                <text x="260" y="35" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="800">
                  💨 वायुः एवं वेग-संस्कारः (Rotational Velocity & Drying)
                </text>
              </g>
            )}

            {/* ACT 5 ANIMATION: Space Revelation & Bell Chime */}
            {act.actNumber === 5 && (
              <g>
                {/* Pulsing Mahākāśa Cosmic Waves */}
                <circle cx="260" cy="100" r="75" fill="none" stroke="#c084fc" strokeWidth="2" opacity="0.6" />
                <circle cx="260" cy="100" r="110" fill="none" stroke="#c084fc" strokeWidth="1.2" opacity="0.35" />

                {/* The Completed Pot with Glowing Interior Ghaṭākāśa */}
                <g transform="translate(260, 95)">
                  <path d="M -26 28 C -44 10, -42 -25, -20 -40 L 20 -40 C 42 -25, 44 10, 26 28 Z" fill="#c2410c" stroke="#551a08" strokeWidth="2.5" />
                  <ellipse cx="0" cy="-40" rx="18" ry="7" fill="#9a3412" stroke="#7c2d12" strokeWidth="2" />
                  <ellipse cx="0" cy="-42" rx="13" ry="5" fill="#38bdf8" />
                  <ellipse cx="0" cy="0" rx="18" ry="16" fill="rgba(56, 189, 248, 0.45)" />
                  <circle cx="0" cy="0" r="6" fill="#ffffff" />
                </g>

                <text x="260" y="32" textAnchor="middle" fill="#c084fc" fontSize="11" fontWeight="900">
                  🌌 घटाकाश (Inner Void) &amp; महाकाश (Cosmic Ether)
                </text>
                <text x="260" y="172" textAnchor="middle" fill="#fde047" fontSize="10.5" fontWeight="800">
                  🔔 Striking the pot reveals Space through Sound (शब्द-गुणः)!
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* Comic Dialogue Balloon for Bodhi & Kaṇāda */}
        <div className="akasa-autoplay-dialog-box">
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', marginBottom: '0.45rem' }}>
            <span style={{ fontSize: '1.4rem' }}>🧑‍🎓</span>
            <div>
              <strong style={{ color: '#7dd3fc', fontSize: '0.85rem' }}>शिष्यः बोधिः (Bodhi):</strong>
              <div style={{ color: '#f1f5f9', fontSize: '0.86rem', lineHeight: 1.45 }}>{act.bodhiQuestion}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', paddingTop: '0.4rem', borderTop: '1px solid rgba(148, 163, 184, 0.2)' }}>
            <span style={{ fontSize: '1.4rem' }}>🧘‍♂️</span>
            <div>
              <strong style={{ color: '#fef08a', fontSize: '0.85rem' }}>गुरुः कणादः (Guru Kaṇāda):</strong>
              <div style={{ color: '#e2e8f0', fontSize: '0.86rem', lineHeight: 1.45 }}>{act.kanadaAnswer}</div>
              <div style={{ fontStyle: 'italic', color: '#94a3b8', fontSize: '0.74rem', marginTop: '0.25rem' }}>
                💡 Sūtra: {act.sutraInsight}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Controls & Options Bar */}
      <div className="akasa-autoplay-controls">
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            type="button"
            className="akasa-step-act-btn"
            style={{ width: 'auto', padding: '0.45rem 0.95rem' }}
            onClick={handlePrev}
            title="Previous act"
          >
            ⏮️ Prev Act
          </button>
          <button
            type="button"
            className="akasa-step-act-btn"
            style={{ width: 'auto', padding: '0.45rem 0.95rem' }}
            onClick={handleNext}
            title="Next act"
          >
            Next Act ⏭️
          </button>
          <button
            type="button"
            className="akasa-step-act-btn"
            style={{ width: 'auto', padding: '0.45rem 0.85rem' }}
            onClick={handleReplay}
            title="Replay from Act 1"
          >
            🔄 Replay
          </button>
        </div>

        <div style={{ display: 'flex', gap: '0.65rem' }}>
          {currentActIdx === 4 && onRingPot && (
            <button
              type="button"
              className="akasa-pot-ring-btn"
              style={{ margin: 0, padding: '0.45rem 1rem', display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}
              onClick={onRingPot}
            >
              <span className="akasa-click-here-badge">👉 CLICK HERE</span>
              <span>Striking the pot reveals Space through Sound (शब्द-गुणः)! 🔔</span>
            </button>
          )}

          <button
            type="button"
            className="akasa-step-act-btn is-gold"
            style={{ width: 'auto', padding: '0.45rem 1.15rem', fontWeight: 800 }}
            onClick={onSwitchToInteractive}
            title="Jump to manual hands-on game mode"
          >
            🕹️ Switch to Hands-On Game ➔
          </button>
        </div>
      </div>
    </div>
  );
};
