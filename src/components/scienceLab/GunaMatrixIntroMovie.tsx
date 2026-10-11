import React, { useEffect, useRef, useState } from 'react';
import { soundEffects } from '../../utils/soundEffects';
import { gunaAudio } from './gunaAudioEngine';

interface MovieAct {
  actNumber: number;
  icon: string;
  titleDev: string;
  titleEn: string;
  bodhiQuestion: string;
  kanadaAnswer: string;
  sutraInsight: string;
  elementColor: string;
  soundType: 'friction' | 'heat' | 'wind' | 'samavaya';
}

const MOVIE_ACTS: MovieAct[] = [
  {
    actNumber: 1,
    icon: '🛢️💧',
    titleDev: 'अङ्कः १ · अवस्था-भ्रमः (The Illusion of Separation)',
    titleEn: 'Act 1: The Illusion of Phase Separation (Oil & Water Dilemma)',
    bodhiQuestion:
      'Guru Kaṇāda, why do oil and water stubbornly repel each other? Are they forever trapped in rigid, unmixable liquid cages?',
    kanadaAnswer:
      'No, Bodhi! The "solid, liquid, gas" boxes you see are merely an illusion—a passing mask worn by matter. Immiscibility is caused by an acute polarity mismatch in Sneha (स्नेह - cohesive viscidity). Water molecules cling with high cohesive attraction, forcing non-polar oil outward with interfacial friction!',
    sutraInsight:
      'नियतगुणसंयोगाद् द्रव्यविलक्षणत्वम् · Differentiation of substances arises from specific guṇa conjunctions (Vaiśeṣika Sūtra 2.1.2)',
    elementColor: '#eab308',
    soundType: 'friction',
  },
  {
    actNumber: 2,
    icon: '🔥⚡',
    titleDev: 'अङ्कः २ · तेजः-संयोगः (Breaking the State Mask)',
    titleEn: 'Act 2: Breaking the State Mask (Injecting Thermal Tejas)',
    bodhiQuestion:
      'How can we shatter this rigid interfacial boundary and dissolve their separation?',
    kanadaAnswer:
      'Inject Tejas (तेजः - thermal kinetic heat)! As thermal agitation rises, the intense kinetic energy disrupts existing molecular conjunctions (संयोग-विनाशः). Thermal excitation softens interfacial friction and melts the rigid mask of state!',
    sutraInsight:
      'पाकज-गुणाः संयोगविभागाभ्याम् · Thermal kinetic energy breaks existing bonds to alter atomic qualities (Vaiśeṣika Sūtra 7.1.6)',
    elementColor: '#f97316',
    soundType: 'heat',
  },
  {
    actNumber: 3,
    icon: '💨🌀',
    titleDev: 'अङ्कः ३ · गुण-साम्यम् (Dynamic Property Soup)',
    titleEn: 'Act 3: Dynamic Property Soup (Sweeping Vāyu & Guṇa Balancing)',
    bodhiQuestion:
      'The cosmic wind of Vāyu has swept the clusters into 56 free Paramāṇus! What is the secret to bringing them into harmonious fusion?',
    kanadaAnswer:
      'Tune the Guṇa Triad! Matter is an undulating property soup. Adjust Cohesion (Sneha), Fluidity (Dravatva), and Kinetic Heat (Uṣṇa) into the 45%–65% Synergy Window. When the qualities harmonize (साम्य), the false illusion of separation dissolves completely!',
    sutraInsight:
      'गुणानां साम्येन कार्योत्पत्तिः · Creation and transformation emerge when underlying qualities achieve equilibrium (Praśastapāda Bhāṣya)',
    elementColor: '#10b981',
    soundType: 'wind',
  },
  {
    actNumber: 4,
    icon: '✨🌌',
    titleDev: 'अङ्कः ४ · समवाय-सिद्धिः (Inseparable Inherence)',
    titleEn: 'Act 4: Inseparable Inherence (Binding Samavāya into Trasareṇu)',
    bodhiQuestion:
      'Deva, what happens when we bind them through Samavāya?',
    kanadaAnswer:
      'Inseparable Inherence (समवायः)! The free atoms collapse inward and bind permanently into dancing Tryaṇukas (त्रसरेणु)—the luminous motes seen dancing in sunbeams. Matter has transcended its illusion and exists harmonized in eternal Space (Ākāśa)!',
    sutraInsight:
      'अयुतसिद्धयोरिहाधार्यभूतः सम्बन्धः समवायः · Samavāya is the eternal, inseparable inherence of parts within the whole (Vaiśeṣika Sūtra / Tarkasaṁgraha)',
    elementColor: '#a855f7',
    soundType: 'samavaya',
  },
];

// Helper to strip markdown and bracketed annotations for natural, soft speech synthesis
const formatForPleasantSpeech = (text: string): string => {
  return text
    .replace(/\(.*?\)/g, '') // remove parenthetical Sanskrit or transliterations
    .replace(/[\[\]{}*_~`#]/g, '') // strip markdown characters
    .replace(/➔|—|–/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

// Select authentic Indian English / Hindi accent voices
const getIndianAccentVoice = (
  speaker: 'Bodhi' | 'Kaṇāda' | 'Guru'
): SpeechSynthesisVoice | null => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;

  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  const indianVoices = voices.filter((v) => {
    const lang = (v.lang || '').toLowerCase();
    const name = (v.name || '').toLowerCase();
    return (
      lang === 'en-in' ||
      lang === 'hi-in' ||
      lang.startsWith('en-in') ||
      lang.startsWith('hi-in') ||
      name.includes('india') ||
      name.includes('indian') ||
      name.includes('hindi') ||
      name.includes('हिन्दी') ||
      name.includes('rishi') ||
      name.includes('veena') ||
      name.includes('lekha') ||
      name.includes('neerja') ||
      name.includes('heera') ||
      name.includes('ravi') ||
      name.includes('madhur') ||
      name.includes('swara') ||
      name.includes('hemant') ||
      name.includes('kalpana')
    );
  });

  if (speaker === 'Bodhi') {
    // Disciple Bodhi: youthful, bright Indian voice
    const bodhiVoice = indianVoices.find((v) =>
      /veena|heera|lekha|neerja|swara|kalpana|priya|ananya|aditi|female|girl/i.test(v.name)
    );
    if (bodhiVoice) return bodhiVoice;
    if (indianVoices.length > 0) return indianVoices[0];
  } else {
    // Sage Kaṇāda: deep, contemplative Indian guru voice
    const kanadaVoice = indianVoices.find((v) =>
      /rishi|ravi|madhur|hemant|male|man|google हिन्दी|google hindi/i.test(v.name)
    );
    if (kanadaVoice) return kanadaVoice;
    if (indianVoices.length > 1) return indianVoices[1];
    if (indianVoices.length > 0) return indianVoices[0];
  }

  // Fallback if no Indian voice installed
  const enVoices = voices.filter((v) => (v.lang || '').toLowerCase().startsWith('en'));
  const candidatePool = enVoices.length > 0 ? enVoices : voices;

  if (speaker === 'Bodhi') {
    const match = candidatePool.find((v) =>
      /samantha|victoria|karen|moira|zira|jenny|female|natural/i.test(v.name)
    );
    return match || candidatePool[0] || null;
  } else {
    const match = candidatePool.find((v) =>
      /daniel|oliver|david|alex|george|guy|male|natural/i.test(v.name)
    );
    return match || candidatePool[1] || candidatePool[0] || null;
  }
};

interface GunaMatrixIntroMovieProps {
  onSwitchToInteractive: () => void;
}

export const GunaMatrixIntroMovie: React.FC<GunaMatrixIntroMovieProps> = ({
  onSwitchToInteractive,
}) => {
  const [currentActIdx, setCurrentActIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState<1 | 1.5>(1);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [activeSpeaker, setActiveSpeaker] = useState<'Bodhi' | 'Kaṇāda' | null>(null);

  const autoPlayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const act = MOVIE_ACTS[currentActIdx];

  // Preload voices
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      const onVoicesChanged = () => {
        window.speechSynthesis.getVoices();
      };
      window.speechSynthesis.onvoiceschanged = onVoicesChanged;
      return () => {
        if (window.speechSynthesis.onvoiceschanged === onVoicesChanged) {
          window.speechSynthesis.onvoiceschanged = null;
        }
      };
    }
  }, []);

  // Play corresponding sound effect when act changes
  useEffect(() => {
    if (act.soundType === 'friction') {
      gunaAudio.playRepulsionFriction();
    } else if (act.soundType === 'heat') {
      gunaAudio.playHeatCrackle();
    } else if (act.soundType === 'wind') {
      gunaAudio.playWindWhoosh();
      setTimeout(() => gunaAudio.playSynergyLock(), 400);
    } else if (act.soundType === 'samavaya') {
      gunaAudio.playSamavayaImplosion();
    }
  }, [currentActIdx, act.soundType]);

  // Handle Speech & Auto-Play Transition Loop
  useEffect(() => {
    if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setActiveSpeaker(null);
    }

    if (!isPlaying) return;

    if (!voiceEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      // Simple timer when voice is disabled
      const timerDuration = speedMultiplier === 1 ? 6800 : 4500;
      autoPlayTimerRef.current = setTimeout(() => {
        if (currentActIdx < MOVIE_ACTS.length - 1) {
          setCurrentActIdx((i) => i + 1);
        } else {
          setIsPlaying(false);
        }
      }, timerDuration);
      return;
    }

    // Two-turn speech orchestration: Bodhi first, then Guru Kaṇāda
    const speakBodhi = () => {
      if (!isPlaying) return;
      setActiveSpeaker('Bodhi');

      const cleanText = formatForPleasantSpeech(act.bodhiQuestion);
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.volume = 0.76;
      utterance.pitch = 1.08; // Youthful disciple
      utterance.rate = speedMultiplier === 1 ? 0.92 : 1.15;
      const voice = getIndianAccentVoice('Bodhi');
      if (voice) utterance.voice = voice;

      utterance.onend = () => {
        autoPlayTimerRef.current = setTimeout(speakKanada, 700);
      };
      utterance.onerror = () => {
        autoPlayTimerRef.current = setTimeout(speakKanada, 500);
      };

      window.speechSynthesis.speak(utterance);
    };

    const speakKanada = () => {
      if (!isPlaying) return;
      setActiveSpeaker('Kaṇāda');

      const cleanText = formatForPleasantSpeech(act.kanadaAnswer);
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.volume = 0.82;
      utterance.pitch = 0.86; // Deep meditative guru
      utterance.rate = speedMultiplier === 1 ? 0.84 : 1.05;
      const voice = getIndianAccentVoice('Kaṇāda');
      if (voice) utterance.voice = voice;

      utterance.onend = () => {
        setActiveSpeaker(null);
        autoPlayTimerRef.current = setTimeout(() => {
          if (currentActIdx < MOVIE_ACTS.length - 1) {
            setCurrentActIdx((i) => i + 1);
            soundEffects.playStrokeChime();
          } else {
            setIsPlaying(false);
          }
        }, 1800);
      };
      utterance.onerror = () => {
        setActiveSpeaker(null);
        autoPlayTimerRef.current = setTimeout(() => {
          if (currentActIdx < MOVIE_ACTS.length - 1) {
            setCurrentActIdx((i) => i + 1);
          } else {
            setIsPlaying(false);
          }
        }, 1200);
      };

      window.speechSynthesis.speak(utterance);
    };

    speakBodhi();

    return () => {
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentActIdx, isPlaying, speedMultiplier, voiceEnabled]);

  const togglePlay = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    if (!nextState && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setActiveSpeaker(null);
    }
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

  // Click on single speaker dialogue to re-hear it
  const handleManualSpeakTurn = (speaker: 'Bodhi' | 'Kaṇāda') => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const text = speaker === 'Bodhi' ? act.bodhiQuestion : act.kanadaAnswer;
    const cleanText = formatForPleasantSpeech(text);
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.volume = 0.78;
    const voice = getIndianAccentVoice(speaker);
    if (voice) utterance.voice = voice;

    if (speaker === 'Bodhi') {
      utterance.pitch = 1.08;
      utterance.rate = 0.92;
    } else {
      utterance.pitch = 0.86;
      utterance.rate = 0.84;
    }

    setActiveSpeaker(speaker);
    utterance.onend = () => setActiveSpeaker(null);
    utterance.onerror = () => setActiveSpeaker(null);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="akasa-autoplay-wrap" role="region" aria-label="Guna Matrix Story Walkthrough Video">
      {/* 1. Header with Title & Video Controls */}
      <div className="akasa-autoplay-header">
        <div className="akasa-autoplay-title">
          <span>🎬 The Illusion of State: 4-Stage Cosmic Journey (चलच्चित्र-दर्शनम्)</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            className={`akasa-pill${voiceEnabled ? ' is-active' : ''}`}
            onClick={() => {
              setVoiceEnabled(!voiceEnabled);
              if (voiceEnabled && typeof window !== 'undefined' && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                setActiveSpeaker(null);
              }
            }}
            title="Toggle authentic Indian voice narration"
            style={{ fontSize: '0.78rem' }}
          >
            {voiceEnabled ? '🗣️ Voice ON (Indian)' : '🔇 Voice OFF'}
          </button>
          <button
            type="button"
            className="akasa-pill"
            onClick={() => setSpeedMultiplier((s) => (s === 1 ? 1.5 : 1))}
            title="Toggle video playback speed"
            style={{ fontSize: '0.78rem' }}
          >
            ⚡ {speedMultiplier}x Speed
          </button>
          <button
            type="button"
            className="akasa-pill is-gold"
            onClick={togglePlay}
            title={isPlaying ? 'Pause auto-play walkthrough' : 'Resume auto-play walkthrough'}
            style={{ fontSize: '0.78rem', fontWeight: 800 }}
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
              {isDone && <span style={{ color: '#86efac', marginLeft: '0.2rem' }}>✓</span>}
            </button>
          );
        })}
      </div>

      {/* 3. The Animated Cinematic Stage */}
      <div
        className="akasa-autoplay-stage"
        style={{
          borderColor: act.elementColor,
          boxShadow: `0 0 24px ${act.elementColor}22`,
          minHeight: '290px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <strong style={{ color: act.elementColor, fontSize: '1.02rem' }}>{act.titleDev}</strong>
            <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{act.titleEn}</div>
          </div>
          <span style={{ fontSize: '2rem' }}>{act.icon}</span>
        </div>

        {/* Dynamic Visual Stage Area */}
        <div className="akasa-autoplay-visual">
          <svg
            viewBox="0 0 540 210"
            style={{ maxWidth: '540px', width: '100%', height: 'auto', display: 'block' }}
          >
            <defs>
              <radialGradient id="gunaNebula" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={act.elementColor} stopOpacity="0.4" />
                <stop offset="100%" stopColor="#030712" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="fireGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#ea580c" />
                <stop offset="50%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#facc15" />
              </linearGradient>
            </defs>

            {/* Background Cosmic Glow */}
            <ellipse cx="270" cy="105" rx="230" ry="90" fill="url(#gunaNebula)" />

            {/* ACT 1 ANIMATION: Immiscible Oil & Water clusters repelling with Sneha friction */}
            {act.actNumber === 1 && (
              <g>
                {/* Water Cluster (Cyan / Left) */}
                <g transform="translate(140, 105)">
                  <circle cx="0" cy="0" r="42" fill="rgba(14, 165, 233, 0.18)" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" />
                  <circle cx="-16" cy="-12" r="8" fill="#38bdf8" />
                  <circle cx="12" cy="-18" r="7" fill="#0284c7" />
                  <circle cx="-10" cy="16" r="9" fill="#38bdf8" />
                  <circle cx="16" cy="12" r="7.5" fill="#0ea5e9" />
                  <circle cx="0" cy="0" r="8.5" fill="#7dd3fc" />
                  <text x="0" y="58" textAnchor="middle" fill="#7dd3fc" fontSize="11" fontWeight="800">
                    💧 Water (High Sneha)
                  </text>
                </g>

                {/* Repulsion Interface Clash */}
                <g transform="translate(270, 105)">
                  <line x1="0" y1="-65" x2="0" y2="65" stroke="#ef4444" strokeWidth="3" strokeDasharray="6 3" />
                  {/* Repulsive force arrows */}
                  <path d="M -15 -20 L -30 -20 M -24 -26 L -30 -20 L -24 -14" stroke="#ef4444" strokeWidth="2.5" fill="none" />
                  <path d="M 15 -20 L 30 -20 M 24 -26 L 30 -20 L 24 -14" stroke="#ef4444" strokeWidth="2.5" fill="none" />
                  <path d="M -15 20 L -30 20 M -24 14 L -30 20 L -24 26" stroke="#ef4444" strokeWidth="2.5" fill="none" />
                  <path d="M 15 20 L 30 20 M 24 14 L 30 20 L 24 26" stroke="#ef4444" strokeWidth="2.5" fill="none" />
                  <text x="0" y="-72" textAnchor="middle" fill="#fca5a5" fontSize="10.5" fontWeight="900">
                    ⚡ SNEHA FRICTION CLASH
                  </text>
                  <text x="0" y="80" textAnchor="middle" fill="#fca5a5" fontSize="9.5" fontWeight="700">
                    Polarity Mismatch · Immiscible
                  </text>
                </g>

                {/* Oil Cluster (Amber / Right) */}
                <g transform="translate(400, 105)">
                  <circle cx="0" cy="0" r="42" fill="rgba(234, 179, 8, 0.18)" stroke="#eab308" strokeWidth="2" strokeDasharray="4 2" />
                  <circle cx="-14" cy="-14" r="8" fill="#eab308" />
                  <circle cx="14" cy="-14" r="7.5" fill="#ca8a04" />
                  <circle cx="-12" cy="14" r="8.5" fill="#facc15" />
                  <circle cx="16" cy="14" r="7" fill="#eab308" />
                  <circle cx="0" cy="0" r="8.5" fill="#fef08a" />
                  <text x="0" y="58" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="800">
                    🛢️ Oil (Non-Polar Clump)
                  </text>
                </g>
              </g>
            )}

            {/* ACT 2 ANIMATION: Thermal Tejas injection breaking interfacial mask */}
            {act.actNumber === 2 && (
              <g>
                {/* Softening Boundary in Center */}
                <ellipse cx="270" cy="105" rx="140" ry="60" fill="rgba(249, 115, 22, 0.15)" stroke="#f97316" strokeWidth="2" strokeDasharray="8 4" />

                {/* Thermal Flame Pillars */}
                {Array.from({ length: 9 }, (_, f) => {
                  const fx = 210 + f * 15;
                  const fy = 65 + (f % 3) * 8;
                  return (
                    <path
                      key={f}
                      d={`M ${fx} 145 Q ${fx + 7} ${fy} ${fx + 14} 145 Z`}
                      fill="url(#fireGradient)"
                      opacity={0.88}
                    />
                  );
                })}

                {/* Agitated dissolving atoms */}
                <circle cx="190" cy="100" r="8" fill="#38bdf8" opacity="0.9" />
                <circle cx="215" cy="85" r="7" fill="#facc15" opacity="0.9" />
                <circle cx="240" cy="115" r="7.5" fill="#38bdf8" opacity="0.9" />
                <circle cx="295" cy="90" r="8" fill="#facc15" opacity="0.9" />
                <circle cx="325" cy="118" r="7" fill="#38bdf8" opacity="0.9" />
                <circle cx="350" cy="95" r="8" fill="#facc15" opacity="0.9" />

                <text x="270" y="42" textAnchor="middle" fill="#fdba74" fontSize="11" fontWeight="900">
                  🔥 तेजः-संयोगः (Injecting Tejas Thermal Heat)
                </text>
                <text x="270" y="175" textAnchor="middle" fill="#fde047" fontSize="10.5" fontWeight="800">
                  Thermal Kinetic Agitation Disintegrates Rigid Interfacial Bonds
                </text>
              </g>
            )}

            {/* ACT 3 ANIMATION: 56 free Paramāṇus in Dynamic Property Soup & Synergy Window */}
            {act.actNumber === 3 && (
              <g>
                {/* 45% - 65% Synergy Target Glow Orbit */}
                <circle cx="270" cy="105" r="76" fill="rgba(16, 185, 129, 0.12)" stroke="#10b981" strokeWidth="2.5" strokeDasharray="5 3" />
                <circle cx="270" cy="105" r="45" fill="rgba(16, 185, 129, 0.08)" stroke="#34d399" strokeWidth="1.5" />

                {/* Free Atoms swirling in dynamic soup */}
                {Array.from({ length: 28 }, (_, i) => {
                  const angle = (i / 28) * Math.PI * 2;
                  const rad = 25 + ((i * 17) % 55);
                  const px = 270 + Math.cos(angle) * rad;
                  const py = 105 + Math.sin(angle) * rad;
                  const isWater = i % 2 === 0;
                  return (
                    <circle
                      key={i}
                      cx={px}
                      cy={py}
                      r={3.8 + (i % 3)}
                      fill={isWater ? '#38bdf8' : '#facc15'}
                      stroke={isWater ? '#7dd3fc' : '#fef08a'}
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Dynamic kinetic vortex arrows */}
                <path d="M 230 45 Q 270 30 310 45" fill="none" stroke="#6ee7b7" strokeWidth="2" strokeDasharray="4 2" />
                <path d="M 310 165 Q 270 180 230 165" fill="none" stroke="#6ee7b7" strokeWidth="2" strokeDasharray="4 2" />

                <text x="270" y="28" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="900">
                  🌀 45%–65% SYNERGY WINDOW (साम्य-सिद्धम्)
                </text>
                <text x="270" y="192" textAnchor="middle" fill="#a7f3d0" fontSize="10" fontWeight="700">
                  Vāyu sweeps atoms free · Guṇa Triad balanced into dynamic equilibrium
                </text>
              </g>
            )}

            {/* ACT 4 ANIMATION: Samavāya Binding into dancing Trasareṇu motes */}
            {act.actNumber === 4 && (
              <g>
                {/* Luminous Sunbeam Rays streaming through Space */}
                <polygon points="170,0 210,0 370,210 330,210" fill="rgba(250, 204, 21, 0.1)" />
                <polygon points="230,0 270,0 430,210 390,210" fill="rgba(250, 204, 21, 0.16)" />

                {/* Outer Inseparable Inherence Ether Aura */}
                <ellipse cx="270" cy="105" rx="150" ry="70" fill="none" stroke="#c084fc" strokeWidth="1.8" opacity="0.6" strokeDasharray="6 3" />

                {/* Dancing Trasareṇu Triads in Sunbeam */}
                <g transform="translate(230, 95)">
                  <circle cx="0" cy="-10" r="6" fill="#facc15" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx="-9" cy="6" r="6" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx="9" cy="6" r="6" fill="#f97316" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx="0" cy="0" r="16" fill="rgba(250, 204, 21, 0.25)" />
                </g>

                <g transform="translate(310, 115)">
                  <circle cx="0" cy="-10" r="6" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx="-9" cy="6" r="6" fill="#facc15" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx="9" cy="6" r="6" fill="#a855f7" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx="0" cy="0" r="16" fill="rgba(168, 85, 247, 0.25)" />
                </g>

                <text x="270" y="32" textAnchor="middle" fill="#c084fc" fontSize="11" fontWeight="900">
                  ✨ समवायः (Inseparable Inherence) in Eternal Ākāśa
                </text>
                <text x="270" y="184" textAnchor="middle" fill="#fde047" fontSize="10.5" fontWeight="800">
                  ☀️ Dancing Trasareṇu Sunbeam Motes: Transcending Rigid State Masks!
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* Comic Dialogue Balloon for Bodhi & Kaṇāda */}
        <div className="akasa-autoplay-dialog-box">
          {/* Bodhi Question */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.65rem',
              marginBottom: '0.45rem',
              cursor: 'pointer',
              padding: '0.2rem',
              borderRadius: '6px',
              backgroundColor: activeSpeaker === 'Bodhi' ? 'rgba(56, 189, 248, 0.12)' : 'transparent',
              transition: 'background 0.2s ease',
            }}
            onClick={() => handleManualSpeakTurn('Bodhi')}
            title="Click to hear Bodhi speak"
          >
            <span style={{ fontSize: '1.4rem' }}>🧑‍🎓</span>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <strong style={{ color: '#7dd3fc', fontSize: '0.85rem' }}>शिष्यः बोधिः (Disciple Bodhi):</strong>
                {activeSpeaker === 'Bodhi' && (
                  <span style={{ fontSize: '0.68rem', color: '#38bdf8', fontWeight: 700 }}>🔊 Speaking...</span>
                )}
              </div>
              <div style={{ color: '#f1f5f9', fontSize: '0.86rem', lineHeight: 1.45 }}>{act.bodhiQuestion}</div>
            </div>
          </div>

          {/* Guru Kaṇāda Answer */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.65rem',
              paddingTop: '0.45rem',
              borderTop: '1px solid rgba(148, 163, 184, 0.2)',
              cursor: 'pointer',
              padding: '0.35rem 0.2rem 0.2rem',
              borderRadius: '6px',
              backgroundColor: activeSpeaker === 'Kaṇāda' ? 'rgba(250, 204, 21, 0.12)' : 'transparent',
              transition: 'background 0.2s ease',
            }}
            onClick={() => handleManualSpeakTurn('Kaṇāda')}
            title="Click to hear Guru Kaṇāda speak"
          >
            <span style={{ fontSize: '1.4rem' }}>🧘‍♂️</span>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <strong style={{ color: '#fef08a', fontSize: '0.85rem' }}>महर्षिः कणादः (Sage Kaṇāda):</strong>
                {activeSpeaker === 'Kaṇāda' && (
                  <span style={{ fontSize: '0.68rem', color: '#facc15', fontWeight: 700 }}>🔊 Speaking...</span>
                )}
              </div>
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
        <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="akasa-step-act-btn"
            style={{ width: 'auto', padding: '0.42rem 0.85rem', fontSize: '0.78rem' }}
            onClick={handlePrev}
            title="Previous act"
          >
            ⏮️ Prev Act
          </button>
          <button
            type="button"
            className="akasa-step-act-btn"
            style={{ width: 'auto', padding: '0.42rem 0.85rem', fontSize: '0.78rem' }}
            onClick={handleNext}
            title="Next act"
          >
            Next Act ⏭️
          </button>
          <button
            type="button"
            className="akasa-step-act-btn"
            style={{ width: 'auto', padding: '0.42rem 0.75rem', fontSize: '0.78rem' }}
            onClick={handleReplay}
            title="Replay from Act 1"
          >
            🔄 Replay
          </button>
        </div>

        <div>
          <button
            type="button"
            className="akasa-step-act-btn is-gold"
            style={{
              width: 'auto',
              padding: '0.45rem 1.15rem',
              fontWeight: 800,
              fontSize: '0.82rem',
              boxShadow: '0 0 14px rgba(250, 204, 21, 0.35)',
            }}
            onClick={onSwitchToInteractive}
            title="Jump to hands-on interactive game sequence"
          >
            🎮 Jump to Interactive Bench ➔
          </button>
        </div>
      </div>
    </div>
  );
};
