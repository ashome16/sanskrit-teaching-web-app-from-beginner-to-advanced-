import React, { useEffect, useRef, useState } from 'react';
import { soundEffects } from '../../utils/soundEffects';
import { AkasaPhilosophySlideshow } from './AkasaPhilosophySlideshow';
import { AkasaAutoPlayMovie } from './AkasaAutoPlayMovie';

// =========================================================================
// TYPES & DEFINITIONS
// =========================================================================

export type ElementKey = 'p' | 'a' | 't' | 'v' | 'space';

export interface TryanukaSlotState {
  slotNumber: 1 | 2 | 3 | 4 | 5;
  key: ElementKey;
  dev: string;
  iast: string;
  en: string;
  icon: string;
  color: string;
  border: string;
  bg: string;
  freq: number;
  signatureGuna: string;
  roleDev: string;
  roleEn: string;
  explanation: string;
  inquiryBodhi: string;
  teachingKanada: string;
  count: number; // 0 to 6
  isReady: boolean;
  isInWheel: boolean;
}

export interface ComicPanelEntry {
  id: string;
  speaker: 'Bodhi' | 'Kaṇāda' | 'Pariśeṣa';
  text: string;
  time: string;
  role?: string;
  avatar?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  kanadaQuote: string;
}

const INITIAL_CORPOREAL_SLOTS: TryanukaSlotState[] = [
  {
    slotNumber: 1,
    key: 'p',
    dev: 'पृथिवी',
    iast: 'pṛthivī',
    en: 'Earth',
    icon: '🪨',
    color: '#ca8a04',
    border: '#eab308',
    bg: 'rgba(202, 138, 4, 0.18)',
    freq: 196, // G3
    signatureGuna: 'Smell (gandha)',
    roleDev: 'समवायि-कारणम् (Material Body)',
    roleEn: 'Inseparable Material Cause',
    explanation: 'Earth supplies the physical atoms and mass of the vessel. The pot is made OF earth.',
    inquiryBodhi: 'Gurudeva, how does clay form the vessel? Why is earth called the material cause?',
    teachingKanada: 'Earth supplies the physical atoms (Paramāṇus). The pot is made directly of earth; without earth atoms, no physical vessel can exist.',
    count: 0,
    isReady: false,
    isInWheel: false,
  },
  {
    slotNumber: 2,
    key: 'a',
    dev: 'अप्',
    iast: 'ap',
    en: 'Water',
    icon: '💧',
    color: '#0284c7',
    border: '#38bdf8',
    bg: 'rgba(2, 132, 199, 0.18)',
    freq: 261.6, // C4
    signatureGuna: 'Taste (rasa) + Sneha',
    roleDev: 'स्नेह-निमित्त-कारणम् (Binding Agent)',
    roleEn: 'Cohesive Viscidity Cause',
    explanation: 'Water provides Sneha (cohesive stickiness). Loose dust particles cannot hold form without moisture binding them.',
    inquiryBodhi: 'Why can’t dry earth atoms make the pot alone? Why is water essential?',
    teachingKanada: 'Loose dust cannot hold form. Water provides Sneha (cohesion) to bind the individual Aṇu particles [अणवः] into malleable clay.',
    count: 0,
    isReady: false,
    isInWheel: false,
  },
  {
    slotNumber: 3,
    key: 't',
    dev: 'तेजस्',
    iast: 'tejas',
    en: 'Fire',
    icon: '🔥',
    color: '#ea580c',
    border: '#f97316',
    bg: 'rgba(234, 88, 12, 0.18)',
    freq: 329.6, // E4
    signatureGuna: 'Form/Light (rūpa) + Uṣṇa',
    roleDev: 'पाकज-कारणम् (Baking Transformation)',
    roleEn: 'Thermal Ceramic Transformation (Pīlukapāka)',
    explanation: 'Thermal energy bakes the raw pot (āma-ghaṭa), permanently altering atomic qualities into rigid red ceramic (pakva-ghaṭa).',
    inquiryBodhi: 'How does heat turn raw gray mud into hardened red terracotta ceramic?',
    teachingKanada: 'Pīlukapāka! Thermal heat penetrates each atom, transforming dark qualities into durable ceramic redness and ringing hardness.',
    count: 0,
    isReady: false,
    isInWheel: false,
  },
  {
    slotNumber: 4,
    key: 'v',
    dev: 'वायु',
    iast: 'vāyu',
    en: 'Air',
    icon: '💨',
    color: '#059669',
    border: '#10b981',
    bg: 'rgba(5, 150, 105, 0.18)',
    freq: 392, // G4
    signatureGuna: 'Touch (sparśa) + Vega',
    roleDev: 'वेग-शोषक-कारणम् (Kinetic Motion & Drying)',
    roleEn: 'Rotational Momentum & Evaporation',
    explanation: 'Air provides the kinetic momentum (vega/gamana) to spin the potter’s wheel and dries moisture from the wet vessel.',
    inquiryBodhi: 'What is the invisible work of air in shaping and completing the vessel?',
    teachingKanada: 'Air imparts kinetic momentum (vega) to spin the potter’s wheel, and evaporates moisture so the wet pot dries into its final shape.',
    count: 0,
    isReady: false,
    isInWheel: false,
  },
];

export const SPACE_ELEMENT_DATA: TryanukaSlotState = {
  slotNumber: 5,
  key: 'space',
  dev: 'आकाश',
  iast: 'ākāśa',
  en: 'Space / Ether',
  icon: '🌌',
  color: '#9333ea',
  border: '#c084fc',
  bg: 'rgba(147, 51, 234, 0.18)',
  freq: 528, // 528Hz Solfeggio Ether tone
  signatureGuna: 'Sound (śabda) + Avakāśa',
  roleDev: 'अवकाश-दातृ (Omnipresent Room / Cavity)',
  roleEn: 'All-Pervading Spatial Cavity',
  explanation: 'Ākāśa is all-pervading (Vibhu): inside the pot (Ghaṭākāśa), outside the pot (Mahākāśa), before the pot was made, and after the pot is broken.',
  inquiryBodhi: 'How are we going to add the 5th element? There is no atomic Tryaṇuka for Space!',
  teachingKanada: 'Space is all-pervading (सर्वगतम्)! Inside the pot, outside the pot, before the pot was made, and after the pot is broken. By shaping the 4 walls, we reveal the hollow room (Avakāśa)!',
  count: 6,
  isReady: true,
  isInWheel: false,
};

const INITIAL_COMIC_PANELS: ComicPanelEntry[] = [
  {
    id: 'panel-0',
    speaker: 'Bodhi',
    text: 'Gurudeva, the potter is at the wheel. How do the 5 elements come together to create a new pot?',
    time: 'Step 1',
    role: 'The Inquirer',
    avatar: '🧑‍🎓',
  },
  {
    id: 'panel-1',
    speaker: 'Kaṇāda',
    text: 'First build the 4 physical Tryaṇukas (Earth, Water, Fire, Air) from atoms. Space has no atoms—we shall reveal its mystery at the wheel!',
    time: 'Step 1',
    role: 'Sage Kaṇāda',
    avatar: '🧘‍♂️',
  },
];

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Which element serves as the Samavāyi-Kāraṇa (Inseparable Material Cause) of the clay pot?',
    options: [
      'A) Pṛthivī (Earth Aṇu particles [अणवः] / Clay)',
      'B) Tejas (Fire heat)',
      'C) The Potter’s wheel (Kulāla-Cakra)',
      'D) Ākāśa (Ether space)',
    ],
    correctIndex: 0,
    explanation: 'Clay is the Samavāyi-Kāraṇa because the pot is made directly of earth atoms; without earth atoms, the physical pot cannot exist.',
    kanadaQuote: 'The substance of which the effect is physically made is its material cause. The pot is made of earth.',
  },
  {
    id: 2,
    question: 'In Vaiśeṣika physics, what is the indispensable role of Ap (Water) in molding the pot?',
    options: [
      'A) It acts as the material body of the pot',
      'B) It provides Sneha (Viscidity / Cohesion) to bind loose Aṇu particles [अणवः] into malleable clay',
      'C) It bakes the vessel into ceramic',
      'D) It spins the potter’s wheel',
    ],
    correctIndex: 1,
    explanation: 'Without water’s inherent Sneha (viscidity/stickiness), dry earth Aṇu particles [अणवः] remain loose dust motes and cannot cohere into clay.',
    kanadaQuote: 'Water helps; it does not lead. A helper who takes over is a puddle, but without Sneha, dust cannot bond.',
  },
  {
    id: 3,
    question: 'What does Sage Kaṇāda’s Pīlukapāka theory propose about the baking (pāka) of a pot?',
    options: [
      'A) The pot bakes as an unbroken solid block without atomic change',
      'B) Fire penetrates to individual Aṇu particles [अणवः], alters their qualities, and reassembles them into red ceramic',
      'C) The pot only appears red due to optical illusion',
      'D) Baking destroys half of the Aṇu particles [अणवः] forever',
    ],
    correctIndex: 1,
    explanation: 'Pīlukapāka (pīlu = atom, pāka = baking) asserts that fire acts on individual Aṇu particles [अणवः], transforming their microscopic qualities before immediate recombination.',
    kanadaQuote: 'Pīlu means atom. Heat transforms the qualities within each atom before they unite in ceramic hardness.',
  },
  {
    id: 4,
    question: 'What is the relationship (Sambandha) between the baked pot and its terracotta red color?',
    options: [
      'A) Saṁyoga (Temporary Conjunction that can be removed)',
      'B) Samavāya (Inseparable Inherence — quality inhering in substance)',
      'C) Abhāva (Complete absence of color)',
      'D) Karmakāraṇa (Motion alone)',
    ],
    correctIndex: 1,
    explanation: 'Samavāya is the eternal, inseparable relationship between a Dravya (Substance) and its Guṇa (Quality). You cannot remove the redness without destroying the pot.',
    kanadaQuote: 'Inherence (Samavāya) cannot be separated without destroying the integrity of the substance itself.',
  },
  {
    id: 5,
    question: 'Why is Ākāśa (Space / Ether) fundamentally required for the clay pot to be a functioning vessel?',
    options: [
      'A) It is the clay from which the pot is sculpted',
      'B) It provides Avakāśa (unimpeded spatial cavity) allowing water and grain to be held inside',
      'C) It blows on the wheel to spin it',
      'D) It turns the clay dark',
    ],
    correctIndex: 1,
    explanation: 'Ākāśa is omnipresent and provides unobstructed space (Avakāśa). Only a vessel containing space within can function as a pot.',
    kanadaQuote: 'You cannot hold the board of space, but without space inside, no vessel could ever hold a single drop.',
  },
];

// =========================================================================
// AUDIO ENGINE
// =========================================================================

class AkasaAudioEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      void this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  playTone(freq: number, duration: number = 0.35, type: OscillatorType = 'sine', gainVal: number = 0.25) {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(gainVal, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + duration);
    } catch {}
  }

  playWheelSpin(step: number) {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      const baseFreq = 140 + step * 65;
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.4);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.45);
    } catch {}
  }

  playPotEmergence() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const notes = [261.6, 329.6, 392.0, 523.25, 659.25]; // C4, E4, G4, C5, E5
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);
        gain.gain.setValueAtTime(0.001, now + idx * 0.12);
        gain.gain.linearRampToValueAtTime(0.22, now + idx * 0.12 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.12 + 1.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 1.3);
      });
    } catch {}
  }

  playCorrectAnswer() {
    this.playTone(440, 0.2, 'sine', 0.25);
    setTimeout(() => this.playTone(554.37, 0.4, 'sine', 0.3), 120);
  }

  playWrongAnswer() {
    this.playTone(220, 0.3, 'triangle', 0.25);
    setTimeout(() => this.playTone(207.65, 0.4, 'triangle', 0.25), 100);
  }

  playElementImpact(key: ElementKey) {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      if (key === 'p') {
        // Earth: deep resonant stone thud
        this.playTone(130.8, 0.35, 'triangle', 0.35);
      } else if (key === 'a') {
        // Water: fluid bubbling chime
        this.playTone(261.6, 0.2, 'sine', 0.25);
        setTimeout(() => this.playTone(392.0, 0.3, 'sine', 0.2), 80);
      } else if (key === 't') {
        // Fire: warm sizzle chord
        this.playTone(329.6, 0.3, 'sawtooth', 0.18);
        setTimeout(() => this.playTone(493.88, 0.35, 'triangle', 0.22), 60);
      } else if (key === 'v') {
        // Air: kinetic whoosh ramp
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(280, now);
        osc.frequency.exponentialRampToValueAtTime(720, now + 0.3);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (key === 'space') {
        // Space: 528 Hz Solfeggio Ether chime
        this.playTone(528, 0.8, 'sine', 0.3);
      }
    } catch {}
  }

  playCeramicRing() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      [880, 1760, 2640].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.28 / (idx + 1), now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 1.8);
      });
    } catch {}
  }
}

const audio = new AkasaAudioEngine();

// =========================================================================
// ATOMIC FORGE VISUALIZER: Paramāṇu (परमाणुः) → Dvyaṇuka (द्व्यणुकम्) → Tryaṇuka (त्र्यणुकम्)
// =========================================================================

const AnuVisualForge: React.FC<{ slot: TryanukaSlotState }> = ({ slot }) => {
  const { count, color, border, isInWheel } = slot;

  const isDyad1Alive = count >= 2;
  const isDyad2Alive = count >= 4;
  const isDyad3Alive = count >= 6;
  const clicksDone = Math.min(3, Math.floor(count / 2));

  return (
    <div
      className="akasa-anu-visual-forge"
      title={`${clicksDone}/3 Clicks completed: ${count}/6 Paramāṇus bonded into 1 Tryaṇuka`}
    >
      <svg viewBox="0 0 280 64" className="akasa-anu-svg">
        <defs>
          <filter id={`glow-${slot.key}`} x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor={border} floodOpacity="0.9" />
          </filter>
        </defs>

        {/* 1. MOLECULAR LATTICE BONDS (Connecting the 3 Dyads into a Triangular Molecule) */}
        {/* Lattice Bond: Dyad 1 (Top) to Dyad 2 (Bottom-Left) */}
        <line
          x1="140"
          y1="13"
          x2="105"
          y2="37"
          stroke={isDyad1Alive && isDyad2Alive ? border : 'rgba(148, 163, 184, 0.28)'}
          strokeWidth={isDyad1Alive && isDyad2Alive ? 2.5 : 1.5}
          strokeDasharray={isDyad1Alive && isDyad2Alive ? 'none' : '3 2'}
        />

        {/* Lattice Bond: Dyad 1 (Top) to Dyad 3 (Bottom-Right) */}
        <line
          x1="140"
          y1="13"
          x2="175"
          y2="37"
          stroke={isDyad1Alive && isDyad3Alive ? border : 'rgba(148, 163, 184, 0.28)'}
          strokeWidth={isDyad1Alive && isDyad3Alive ? 2.5 : 1.5}
          strokeDasharray={isDyad1Alive && isDyad3Alive ? 'none' : '3 2'}
        />

        {/* Lattice Bond: Dyad 2 (Bottom-Left) to Dyad 3 (Bottom-Right) */}
        <line
          x1="115"
          y1="37"
          x2="165"
          y2="37"
          stroke={isDyad2Alive && isDyad3Alive ? border : 'rgba(148, 163, 184, 0.28)'}
          strokeWidth={isDyad2Alive && isDyad3Alive ? 2.5 : 1.5}
          strokeDasharray={isDyad2Alive && isDyad3Alive ? 'none' : '3 2'}
        />

        {/* 2. DYAD #1 (TOP · 2 PARAMĀṆUS) — CLICK 1 */}
        {isDyad1Alive ? (
          <g>
            <line x1="132" y1="13" x2="148" y2="13" stroke={border} strokeWidth="3" strokeLinecap="round" />
            <circle cx="130" cy="13" r="7" fill={color} stroke={border} strokeWidth="2" filter={`url(#glow-${slot.key})`} />
            <circle cx="150" cy="13" r="7" fill={color} stroke={border} strokeWidth="2" filter={`url(#glow-${slot.key})`} />
          </g>
        ) : (
          <g opacity={clicksDone === 0 ? 0.95 : 0.45}>
            <line x1="132" y1="13" x2="148" y2="13" stroke="rgba(148, 163, 184, 0.45)" strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="130" cy="13" r="6.5" fill="rgba(15, 23, 42, 0.6)" stroke="rgba(148, 163, 184, 0.55)" strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="150" cy="13" r="6.5" fill="rgba(15, 23, 42, 0.6)" stroke="rgba(148, 163, 184, 0.55)" strokeWidth="1.5" strokeDasharray="3 2" />
            <text x="140" y="5" textAnchor="middle" fill="#fde047" fontSize="7" fontWeight="800">
              [Click 1: Dyad #1]
            </text>
          </g>
        )}

        {/* 3. DYAD #2 (BOTTOM-LEFT · 2 PARAMĀṆUS) — CLICK 2 */}
        {isDyad2Alive ? (
          <g>
            <line x1="97" y1="37" x2="113" y2="37" stroke={border} strokeWidth="3" strokeLinecap="round" />
            <circle cx="95" cy="37" r="7" fill={color} stroke={border} strokeWidth="2" filter={`url(#glow-${slot.key})`} />
            <circle cx="115" cy="37" r="7" fill={color} stroke={border} strokeWidth="2" filter={`url(#glow-${slot.key})`} />
          </g>
        ) : (
          <g opacity={clicksDone === 1 ? 0.95 : 0.45}>
            <line x1="97" y1="37" x2="113" y2="37" stroke="rgba(148, 163, 184, 0.45)" strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="95" cy="37" r="6.5" fill="rgba(15, 23, 42, 0.6)" stroke="rgba(148, 163, 184, 0.55)" strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="115" cy="37" r="6.5" fill="rgba(15, 23, 42, 0.6)" stroke="rgba(148, 163, 184, 0.55)" strokeWidth="1.5" strokeDasharray="3 2" />
            {clicksDone === 1 && (
              <text x="105" y="49" textAnchor="middle" fill="#fde047" fontSize="7" fontWeight="800">
                [Click 2: Dyad #2]
              </text>
            )}
          </g>
        )}

        {/* 4. DYAD #3 (BOTTOM-RIGHT · 2 PARAMĀṆUS) — CLICK 3 */}
        {isDyad3Alive ? (
          <g>
            <line x1="167" y1="37" x2="183" y2="37" stroke={border} strokeWidth="3" strokeLinecap="round" />
            <circle cx="165" cy="37" r="7" fill={color} stroke={border} strokeWidth="2" filter={`url(#glow-${slot.key})`} />
            <circle cx="185" cy="37" r="7" fill={color} stroke={border} strokeWidth="2" filter={`url(#glow-${slot.key})`} />
          </g>
        ) : (
          <g opacity={clicksDone === 2 ? 0.95 : 0.45}>
            <line x1="167" y1="37" x2="183" y2="37" stroke="rgba(148, 163, 184, 0.45)" strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="165" cy="37" r="6.5" fill="rgba(15, 23, 42, 0.6)" stroke="rgba(148, 163, 184, 0.55)" strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="185" cy="37" r="6.5" fill="rgba(15, 23, 42, 0.6)" stroke="rgba(148, 163, 184, 0.55)" strokeWidth="1.5" strokeDasharray="3 2" />
            {clicksDone === 2 && (
              <text x="175" y="49" textAnchor="middle" fill="#fde047" fontSize="7" fontWeight="800">
                [Click 3: Dyad #3]
              </text>
            )}
          </g>
        )}

        {/* 5. NUCLEUS / TRYAṆUKA CORE */}
        {isDyad3Alive && (
          <circle cx="140" cy="26" r="3.2" fill="#fde047" opacity="0.95" />
        )}

        {/* 6. LEFT/RIGHT PROGRESS BADGES */}
        <g transform="translate(14, 28)">
          <rect x="0" y="0" width="62" height="18" rx="9" fill="rgba(15, 23, 42, 0.85)" stroke="rgba(148, 163, 184, 0.3)" />
          <text x="31" y="12" textAnchor="middle" fill={clicksDone > 0 ? '#38bdf8' : '#94a3b8'} fontSize="8" fontWeight="800">
            {clicksDone}/3 Clicks
          </text>
        </g>

        <g transform="translate(204, 28)">
          <rect x="0" y="0" width="64" height="18" rx="9" fill="rgba(15, 23, 42, 0.85)" stroke={isDyad3Alive ? '#10b981' : 'rgba(148, 163, 184, 0.3)'} />
          <text x="32" y="12" textAnchor="middle" fill={isDyad3Alive ? '#86efac' : '#94a3b8'} fontSize="8" fontWeight="800">
            {count}/6 Atoms
          </text>
        </g>

        {/* 7. BOTTOM STATUS CAPTION */}
        <text x="140" y="59" textAnchor="middle" fill={isDyad3Alive ? '#86efac' : '#cbd5e1'} fontSize="8.5" fontWeight="800">
          {isInWheel
            ? '✓ TRYAṆUKA READY IN POTTER’S WHEEL'
            : isDyad3Alive
            ? '🌟 100% FORGED: 1 TRYAṆUKA (3 DYADS / 6 PARAMĀṆUS) IS ALIVE!'
            : clicksDone === 0
            ? '📐 Traced Blueprint: Make 3 clicks below to bring 3 Dyads alive'
            : clicksDone === 1
            ? '⚡ Dyad #1 Alive! 2 more clicks to complete Tryaṇuka'
            : '⚡ Dyads #1 & #2 Alive! 1 final click to complete Tryaṇuka'}
        </text>
      </svg>
    </div>
  );
};

// =========================================================================
// BODHI & GURU AVATARS
// =========================================================================

export const BodhiAvatar: React.FC<{ size?: number; className?: string }> = ({ size = 42, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={`akasa-avatar-svg ${className}`}
    aria-label="Bodhi - Young Vedic Inquirer"
  >
    <defs>
      <linearGradient id="bodhiSkin" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fed7aa" />
        <stop offset="100%" stopColor="#fba763" />
      </linearGradient>
      <linearGradient id="bodhiShawl" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#fef08a" />
      </linearGradient>
      <radialGradient id="bodhiAura" cx="50%" cy="50%" r="50%">
        <stop offset="65%" stopColor="#0284c7" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="bodhiHair" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#292524" />
        <stop offset="100%" stopColor="#1c1917" />
      </linearGradient>
    </defs>

    <circle cx="50" cy="50" r="48" fill="#0c1e38" stroke="#38bdf8" strokeWidth="2.5" />
    <circle cx="50" cy="50" r="46" fill="url(#bodhiAura)" />

    <path d="M 20 94 C 20 72, 33 65, 50 65 C 67 65, 80 72, 80 94 Z" fill="url(#bodhiShawl)" stroke="#f59e0b" strokeWidth="1.2" />
    <path d="M 30 94 C 33 76, 46 66, 50 66 C 54 66, 67 76, 70 94" fill="none" stroke="#ea580c" strokeWidth="2.2" />
    <path d="M 38 67 Q 52 79 60 94" fill="none" stroke="#fde047" strokeWidth="1.2" strokeDasharray="3 1.5" />

    <rect x="44" y="52" width="12" height="15" rx="4" fill="url(#bodhiSkin)" />

    <circle cx="31" cy="45" r="5" fill="url(#bodhiSkin)" />
    <circle cx="69" cy="45" r="5" fill="url(#bodhiSkin)" />
    <circle cx="31" cy="47" r="1.5" fill="#facc15" />
    <circle cx="69" cy="47" r="1.5" fill="#facc15" />

    <ellipse cx="50" cy="44" rx="19" ry="21" fill="url(#bodhiSkin)" />

    <path d="M 31 38 C 32 22, 68 22, 69 38 C 65 31, 35 31, 31 38 Z" fill="url(#bodhiHair)" />
    <ellipse cx="50" cy="18" rx="6" ry="7" fill="url(#bodhiHair)" />
    <path d="M 50 18 Q 55 12 59 13 Q 54 18 51 21 Z" fill="url(#bodhiHair)" />
    <rect x="46" y="21" width="8" height="2" fill="#ef4444" rx="1" />

    <path d="M 48 30 Q 50 26 52 30 L 51 38 L 49 38 Z" fill="#fef08a" />
    <circle cx="50" cy="36" r="1.2" fill="#dc2626" />

    <path d="M 37 38 Q 42 36 46 38" fill="none" stroke="#292524" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M 54 38 Q 58 36 63 38" fill="none" stroke="#292524" strokeWidth="1.5" strokeLinecap="round" />

    <ellipse cx="42" cy="43" rx="3.5" ry="3" fill="#ffffff" />
    <circle cx="42.5" cy="42.5" r="2" fill="#1c1917" />
    <circle cx="43.2" cy="41.8" r="0.7" fill="#ffffff" />

    <ellipse cx="58" cy="43" rx="3.5" ry="3" fill="#ffffff" />
    <circle cx="58.5" cy="42.5" r="2" fill="#1c1917" />
    <circle cx="59.2" cy="41.8" r="0.7" fill="#ffffff" />

    <path d="M 50 42 L 49 48 L 52 48" fill="none" stroke="#ea580c" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M 46 54 Q 50 57 54 54" fill="none" stroke="#b45309" strokeWidth="1.6" strokeLinecap="round" />

    <circle cx="50" cy="50" r="47" fill="none" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="6 3" opacity="0.8" />
  </svg>
);

export const KanadaGuruAvatar: React.FC<{ size?: number; className?: string }> = ({ size = 42, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={`akasa-avatar-svg ${className}`}
    aria-label="Sage Kaṇāda - Founder of Vaiśeṣika Atomic Philosophy"
  >
    <defs>
      <linearGradient id="kanadaSkin" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fdba74" />
        <stop offset="100%" stopColor="#ea580c" />
      </linearGradient>
      <linearGradient id="kanadaRobe" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#c2410c" />
      </linearGradient>
      <radialGradient id="kanadaSunHalo" cx="50%" cy="50%" r="50%">
        <stop offset="65%" stopColor="#facc15" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="kanadaBeard" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f8fafc" />
        <stop offset="100%" stopColor="#cbd5e1" />
      </linearGradient>
      <linearGradient id="kanadaJata" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#451a03" />
        <stop offset="100%" stopColor="#292524" />
      </linearGradient>
    </defs>

    <circle cx="50" cy="50" r="48" fill="#1e1105" stroke="#facc15" strokeWidth="2.5" />
    <circle cx="50" cy="50" r="46" fill="url(#kanadaSunHalo)" />

    {Array.from({ length: 12 }, (_, i) => {
      const angle = (i * 30 * Math.PI) / 180;
      const x1 = 50 + 38 * Math.cos(angle);
      const y1 = 50 + 38 * Math.sin(angle);
      const x2 = 50 + 46 * Math.cos(angle);
      const y2 = 50 + 46 * Math.sin(angle);
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fde047" strokeWidth="1.2" opacity="0.6" />;
    })}

    <path d="M 18 94 C 18 70, 32 63, 50 63 C 68 63, 82 70, 82 94 Z" fill="url(#kanadaRobe)" stroke="#b45309" strokeWidth="1.2" />
    <path d="M 34 68 Q 50 82 66 68" fill="none" stroke="#78350f" strokeWidth="2.5" strokeDasharray="3 3" />

    <rect x="43" y="50" width="14" height="15" fill="url(#kanadaSkin)" />

    <path d="M 33 50 C 33 76, 42 86, 50 86 C 58 86, 67 76, 67 50 Z" fill="url(#kanadaBeard)" stroke="#94a3b8" strokeWidth="0.8" />
    <path d="M 42 58 Q 50 78 58 58" fill="none" stroke="#94a3b8" strokeWidth="1" opacity="0.6" />

    <ellipse cx="50" cy="42" rx="17" ry="18" fill="url(#kanadaSkin)" />

    <circle cx="33" cy="42" r="4" fill="url(#kanadaSkin)" />
    <circle cx="67" cy="42" r="4" fill="url(#kanadaSkin)" />
    <circle cx="33" cy="44" r="1.5" fill="#78350f" />
    <circle cx="67" cy="44" r="1.5" fill="#78350f" />

    <path d="M 33 34 C 34 18, 66 18, 67 34 Z" fill="url(#kanadaJata)" />
    <ellipse cx="50" cy="16" rx="9" ry="8" fill="url(#kanadaJata)" />
    <circle cx="50" cy="16" r="3" fill="#b45309" stroke="#78350f" strokeWidth="0.8" />
    <circle cx="50" cy="16" r="1" fill="#fde047" />

    <line x1="43" y1="28" x2="57" y2="28" stroke="#f8fafc" strokeWidth="1.2" strokeLinecap="round" opacity="0.9" />
    <line x1="42" y1="31" x2="58" y2="31" stroke="#f8fafc" strokeWidth="1.2" strokeLinecap="round" opacity="0.9" />
    <line x1="43" y1="34" x2="57" y2="34" stroke="#f8fafc" strokeWidth="1.2" strokeLinecap="round" opacity="0.9" />
    <circle cx="50" cy="31" r="1.5" fill="#dc2626" />

    <path d="M 38 37 Q 43 35 47 37" fill="none" stroke="#e2e8f0" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M 53 37 Q 57 35 62 37" fill="none" stroke="#e2e8f0" strokeWidth="1.6" strokeLinecap="round" />

    <ellipse cx="43" cy="41" rx="3.5" ry="2.2" fill="#ffffff" />
    <circle cx="43.5" cy="41" r="1.8" fill="#451a03" />
    <circle cx="44" cy="40.5" r="0.6" fill="#ffffff" />

    <ellipse cx="57" cy="41" rx="3.5" ry="2.2" fill="#ffffff" />
    <circle cx="56.5" cy="41" r="1.8" fill="#451a03" />
    <circle cx="56" cy="40.5" r="0.6" fill="#ffffff" />

    <path d="M 50 39 L 49 46 L 52 46" fill="none" stroke="#9a3412" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M 44 50 Q 50 53 56 50" fill="none" stroke="#e2e8f0" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M 47 54 Q 50 56 53 54" fill="none" stroke="#78350f" strokeWidth="1.4" strokeLinecap="round" />

    <g transform="translate(73, 62)">
      <circle cx="0" cy="0" r="7" fill="#facc15" opacity="0.35" />
      <circle cx="0" cy="0" r="3.5" fill="#fde047" stroke="#ffffff" strokeWidth="1" />
      <circle cx="0" cy="0" r="1.5" fill="#ffffff" />
      <line x1="-6" y1="0" x2="6" y2="0" stroke="#fde047" strokeWidth="0.8" strokeDasharray="1 1" />
      <line x1="0" y1="-6" x2="0" y2="6" stroke="#fde047" strokeWidth="0.8" strokeDasharray="1 1" />
    </g>

    <circle cx="50" cy="50" r="47" fill="none" stroke="#facc15" strokeWidth="1.5" strokeDasharray="8 4" />
  </svg>
);

// =========================================================================
// OBSERVING DIALOGUES: SAGE KAṆĀDA & BODHI OBSERVING THE ARTISAN POTTER (कुलालः)
// =========================================================================

export interface WheelObservationDialogue {
  title: string;
  bodhi: string;
  kanada: string;
}

export const WHEEL_STAGE_OBSERVATION_DIALOGUES: Record<number, WheelObservationDialogue> = {
  0: {
    title: 'चरण ० · आरम्भः एवं निमित्त-कारणम् (The Potter at the Wheel)',
    bodhi: 'Gurudeva, who is this craftsman, and what is his role in creating the vessel?',
    kanada:
      'He is the Kulāla (Potter) — the classic Nimitta-Kāraṇa (Instrumental Cause)! His turning stick (daṇḍa) and hands impart rotational velocity (Vega). But he cannot make a pot without matter. Direct Element #1 (Earth) into the wheel to throw the clay!',
  },
  1: {
    title: 'चरण १ · समवायि-कारणम् (Material Cause · Pṛthivī)',
    bodhi:
      'The potter threw the dark earth mound and is centering it firmly with his palms. Is clay the primary cause?',
    kanada:
      'Yes! The pot is made directly of earth; without earth atoms (Pṛthivī Paramāṇus), no physical vessel can exist! Earth is the Samavāyi-Kāraṇa (Inseparable Material Cause). But dry dust motes cannot cohere together—add Element #2 (Water)!',
  },
  2: {
    title: 'चरण २ · असमवायि-कारणम् (Cohesive Binding · Sneha & Ap)',
    bodhi:
      'The potter is splashing water onto the spinning clay! Why is water indispensable?',
    kanada:
      'Water provides Sneha (cohesive viscidity). Dry earth motes have no bond; water glues the atoms into a pliable, malleable body (Asamavāyi-Kāraṇa). Next, we must bake it: add Element #3 (Fire)!',
  },
  3: {
    title: 'चरण ३ · पीलुपाक-प्रक्रिया (Thermal Metamorphosis · Tejas)',
    bodhi:
      'The vessel is placed in intense heat! How does soft gray mud transform into hard red terracotta?',
    kanada:
      'Pīlukapāka! Intense heat (Tejas) alters atomic bonds and permanently transforms mud into hardened, vitreous red ceramic with ringing acoustic density! Now add Element #4 (Air) to pull the slender neck!',
  },
  4: {
    title: 'चरण ४ · वेग-संस्कारः (Kinetic Momentum & Form · Vāyu)',
    bodhi:
      'The wheel is spinning at top speed while the potter gracefully pulls the slender neck upward!',
    kanada:
      'Air (Vāyu) provides the continuous rotational momentum (Vega) and atmospheric drying to hold the slender flared neck against gravity! All 4 corporeal elements are now united on the wheel!',
  },
  5: {
    title: 'चरण ५ · घटाकाश-सिद्धिः (The Revelation of All-Pervading Space)',
    bodhi:
      'Gurudeva! We forged 4 elements on the wheel, but how does the potter add the 5th element—Space (Ākāśa)?',
    kanada:
      'The potter did not manufacture Space! Space is Vibhu (all-pervading) and partless. By building the 4 atomic walls around emptiness, the potter merely enclosed the pre-existing void (Ghaṭākāśa). Strike the pot—Sound (Śabda) is the proof of Space!',
  },
};

// =========================================================================
// ARTISAN POTTER AT THE WHEEL (कुलालः)
// =========================================================================

export interface GuruArtisanPottersWheelProps {
  slots: TryanukaSlotState[];
  elementsInWheel: number;
  potEmerged: boolean;
  speedClass: string;
  isSpaceDiscussion?: boolean;
  onRing?: () => void;
}

export const GuruArtisanPottersWheel: React.FC<GuruArtisanPottersWheelProps> = ({
  slots,
  elementsInWheel,
  potEmerged,
  speedClass,
  isSpaceDiscussion,
  onRing,
}) => {
  const isTalkingAboutSpace = isSpaceDiscussion ?? (elementsInWheel >= 4 || potEmerged);

  const getArtisanActionTag = () => {
    if (potEmerged) return '✨ कुलाल-सिद्धिः · MASTERPIECE VESSEL COMPLETE';
    if (isTalkingAboutSpace && elementsInWheel === 4) {
      return '🌌 अवकाश-सिद्धिः · POTTER REVEALING ENCLOSED SPACE';
    }
    if (elementsInWheel === 0) return '🎯 कुलालः · THE ARTISAN POTTER (निमित्त-कारणम्)';
    if (elementsInWheel === 1) return '🪨 समवायि-कारणम् · CENTERING RAW EARTH CLAY (#1)';
    if (elementsInWheel === 2) return '💧 स्नेह-संयोगः · INFUSING VISCID COHESION (#2 WATER)';
    if (elementsInWheel === 3) return '🔥 पीलुपाक-प्रक्रिया · KILN BAKING CERAMIC (#3 FIRE)';
    if (elementsInWheel === 4) return '💨 वेग-संस्कारः · HIGH-VELOCITY NECK PULL (#4 AIR)';
    return '🌌 अवकाश-दातृ · CARVING HOLLOW SPACE (#5 ETHER)';
  };

  const getArtisanActionText = () => {
    if (potEmerged) {
      return 'The Masterpiece is Complete! The artisan potter presents the hollow vessel: the clay walls hold Ghaṭākāśa inside, united with the boundless Mahākāśa all around!';
    }
    if (isTalkingAboutSpace && elementsInWheel === 4) {
      return 'The potter prepares the spatial chamber: the 4 atomic elements sculpt the physical boundary walls around pre-existing all-pervading Ākāśa!';
    }
    if (elementsInWheel === 0) {
      return 'The potter (Kulāla) holds the turning stick (daṇḍa) poised above the granite wheel, ready to throw the clay once the primary material cause is supplied.';
    }
    if (elementsInWheel === 1) {
      return 'The potter applies firm bilateral palm pressure to center the raw earth mound (mṛd-piṇḍa) on the spinning turntable, establishing the physical atomic body.';
    }
    if (elementsInWheel === 2) {
      return 'The potter lubricates the spinning clay with water; wet palms infuse cohesive viscidity (Sneha) so loose atoms bind into a pliable, malleable form.';
    }
    if (elementsInWheel === 3) {
      return 'The potter channels thermal heat (Pīlukapāka); glowing embers bake gray mud into hardened, vitreous ringing red terracotta ceramic.';
    }
    if (elementsInWheel === 4) {
      return 'The potter pulls the slender neck upward with agile fingers as rotational momentum (Vega) spins the wheel at top speed and dries moisture.';
    }
    return 'The potter plunges his thumbs into the center, opening the hollow spatial cavity (Avakāśa) so the vessel can contain water and grain.';
  };


  return (
    <div className="akasa-guru-artisan-wrap">
      <svg
        viewBox="0 0 340 380"
        className="akasa-guru-artisan-svg"
        aria-label="Sage Kaṇāda as Master Artisan at Potter's Wheel"
      >
        <defs>
          <linearGradient id="artisanSkin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fed7aa" />
            <stop offset="60%" stopColor="#fdba74" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>

          <linearGradient id="artisanRobe" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#c2410c" />
          </linearGradient>

          <linearGradient id="artisanShawl" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>

          <linearGradient id="artisanBeard" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#f1f5f9" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>

          <linearGradient id="artisanJata" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#451a03" />
            <stop offset="100%" stopColor="#1c1917" />
          </linearGradient>

          <radialGradient id="artisanSunHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.85" />
            <stop offset="55%" stopColor="#facc15" stopOpacity="0.45" />
            <stop offset="90%" stopColor="#ea580c" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="pwStoneRim" cx="50%" cy="50%" r="50%">
            <stop offset="78%" stopColor="#3f3f46" />
            <stop offset="92%" stopColor="#27272a" />
            <stop offset="100%" stopColor="#18181b" />
          </radialGradient>

          <radialGradient id="pwTeakDisc" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#78350f" />
            <stop offset="55%" stopColor="#451a03" />
            <stop offset="85%" stopColor="#291102" />
            <stop offset="100%" stopColor="#150800" />
          </radialGradient>

          <radialGradient id="pwClayLump" cx="42%" cy="38%" r="55%">
            <stop offset="0%" stopColor="#b45309" />
            <stop offset="50%" stopColor="#78350f" />
            <stop offset="90%" stopColor="#451a03" />
            <stop offset="100%" stopColor="#230d01" />
          </radialGradient>

          <radialGradient id="pwWaterSheen" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#0284c7" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0369a1" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="pwHeatGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fde047" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#ea580c" stopOpacity="0.75" />
            <stop offset="85%" stopColor="#b91c1c" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="potTerraGrad" cx="35%" cy="38%" r="65%">
            <stop offset="0%" stopColor="#fdba74" />
            <stop offset="25%" stopColor="#ea580c" />
            <stop offset="60%" stopColor="#c2410c" />
            <stop offset="90%" stopColor="#7c2d12" />
            <stop offset="100%" stopColor="#431407" />
          </radialGradient>

          <radialGradient id="potWaterGleam" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#bae6fd" />
            <stop offset="60%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#082f49" />
          </radialGradient>

          <linearGradient id="potGlazeHighlight" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          <filter id="potGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#f97316" floodOpacity="0.65" />
          </filter>

          {/* Filters & Gradients for Space Circling Gestures (Ghaṭākāśa & Mahākāśa) */}
          <filter id="spaceGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="akasaSpaceRingGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#fde047" />
          </linearGradient>

          <radialGradient id="innerCavitySwirl" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
            <stop offset="55%" stopColor="#a855f7" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="cosmicOuterGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="50%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>

          <linearGradient id="cosmicTailGrad" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="#fde047" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#c084fc" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Ambient Workshop Ground Shadow */}
        <ellipse cx="170" cy="355" rx="105" ry="20" fill="#020617" opacity="0.7" />

        {/* ================================================================= */}
        {/* 1. THE ARTISAN POTTER (कुलालः · NIMITTA-KĀRAṆAM) */}
        {/* ================================================================= */}
        <g className="akasa-guru-artisan-body">
          {/* Workshop Ambient Shading behind Potter */}
          <ellipse cx="170" cy="85" rx="88" ry="46" fill="rgba(67, 20, 7, 0.45)" />

          {/* Broad Shoulders & Terracotta Craftsman Vest (Kūrpāsa) */}
          <path
            d="M 100 118 C 100 94, 136 88, 170 88 C 204 88, 240 94, 240 118 L 248 186 C 215 196, 125 196, 92 186 Z"
            fill="url(#artisanRobe)"
            stroke="#9a3412"
            strokeWidth="1.5"
          />

          {/* Muscular Neck & Chest */}
          <path d="M 148 90 Q 170 110 192 90" fill="url(#artisanSkin)" stroke="#ea580c" strokeWidth="1" />

          {/* Potter's Earthen Apron (Mṛd-paṭṭa with Clay Splatters & Slip Marks) */}
          <path
            d="M 134 116 L 206 116 L 216 190 C 188 194, 152 194, 124 190 Z"
            fill="#78350f"
            stroke="#451a03"
            strokeWidth="1.2"
            opacity="0.95"
          />
          {/* Clay Splatters & Slip Marks on Apron */}
          <ellipse cx="152" cy="145" rx="12" ry="7" fill="#b45309" opacity="0.8" />
          <ellipse cx="188" cy="158" rx="14" ry="9" fill="#92400e" opacity="0.85" />
          <circle cx="166" cy="172" r="4.5" fill="#d97706" opacity="0.75" />
          <circle cx="140" cy="162" r="3" fill="#fdba74" opacity="0.7" />

          {/* Cloth Sash Tied at Waist */}
          <line x1="124" y1="184" x2="216" y2="184" stroke="#d97706" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="170" cy="184" r="3.2" fill="#b45309" />

          {/* Neck */}
          <rect x="162" y="74" width="16" height="18" fill="url(#artisanSkin)" />

          {/* Head & Face */}
          <circle cx="146" cy="64" r="4.5" fill="url(#artisanSkin)" />
          <circle cx="194" cy="64" r="4.5" fill="url(#artisanSkin)" />
          <ellipse cx="170" cy="62" rx="22" ry="23" fill="url(#artisanSkin)" />

          {/* Traditional Indian Potter Headcloth (Muraṭhā / Head Wrap) */}
          <path
            d="M 142 52 C 144 32, 196 32, 198 52 C 204 46, 204 36, 196 28 C 186 18, 154 18, 144 28 C 136 36, 136 46, 142 52 Z"
            fill="#c2410c"
            stroke="#7c2d12"
            strokeWidth="1.5"
          />
          {/* Headcloth Fabric Folds */}
          <path d="M 142 46 Q 170 38 198 46" fill="none" stroke="#ea580c" strokeWidth="3" strokeLinecap="round" />
          <path d="M 140 41 Q 170 32 200 41" fill="none" stroke="#b45309" strokeWidth="3.2" strokeLinecap="round" />
          <path d="M 144 36 Q 170 26 196 36" fill="none" stroke="#9a3412" strokeWidth="2.5" strokeLinecap="round" />
          {/* Tied Cloth Knot at Side */}
          <ellipse cx="198" cy="44" rx="4.5" ry="3.5" fill="#ea580c" stroke="#7c2d12" strokeWidth="1" />

          {/* Eyebrows: Focused Concentration Looking Downward at the Wheel */}
          <path d="M 154 58 Q 162 55 168 59" fill="none" stroke="#292524" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M 172 59 Q 178 55 186 58" fill="none" stroke="#292524" strokeWidth="2.4" strokeLinecap="round" />

          {/* Sharp, Masterful Eyes Looking Down at the Spinning Clay */}
          <ellipse cx="161" cy="64" rx="4" ry="2.2" fill="#ffffff" />
          <circle cx="161" cy="64.5" r="1.8" fill="#1c1917" />
          <circle cx="160.6" cy="64.2" r="0.6" fill="#ffffff" />
          <ellipse cx="179" cy="64" rx="4" ry="2.2" fill="#ffffff" />
          <circle cx="179" cy="64.5" r="1.8" fill="#1c1917" />
          <circle cx="178.6" cy="64.2" r="0.6" fill="#ffffff" />

          {/* Sculpted Nose */}
          <path d="M 170 60 L 168 69 L 173 69" fill="none" stroke="#9a3412" strokeWidth="1.4" strokeLinecap="round" />

          {/* Potter's Moustache & Firm Concentrated Craftsman Jaw */}
          <path d="M 161 72 Q 170 75 179 72" fill="none" stroke="#1c1917" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M 166 73 Q 170 76 174 73" fill="none" stroke="#44403c" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 158 78 Q 170 88 182 78" fill="none" stroke="#9a3412" strokeWidth="1.2" opacity="0.6" />
        </g>

        {/* ================================================================= */}
        {/* 2. THE POTTER'S WHEEL TURNTABLE (SPINS BENEATH GURU'S HANDS) */}
        {/* ================================================================= */}
        <g className={`akasa-turntable-disc ${speedClass}`} style={{ transformOrigin: '170px 270px' }}>
          {/* Outer Granite Stone Turntable Rim (Radius 82) */}
          <circle cx="170" cy="270" r="82" fill="url(#pwStoneRim)" stroke="#71717a" strokeWidth="2.5" />
          <circle cx="170" cy="270" r="74" fill="none" stroke="#52525b" strokeWidth="1.2" strokeDasharray="4 2" />

          {/* 8 Momentum Notch Sockets */}
          {Array.from({ length: 8 }, (_, i) => {
            const angle = (i * 45 * Math.PI) / 180;
            const nx = 170 + 77 * Math.cos(angle);
            const ny = 270 + 77 * Math.sin(angle);
            return <circle key={i} cx={nx} cy={ny} r="3.2" fill="#18181b" stroke="#a1a1aa" strokeWidth="1" />;
          })}

          {/* Hardwood Teak Disc (Radius 70) */}
          <circle cx="170" cy="270" r="70" fill="url(#pwTeakDisc)" stroke="#b45309" strokeWidth="2" />
          <circle cx="170" cy="270" r="58" fill="none" stroke="#92400e" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
          <circle cx="170" cy="270" r="46" fill="none" stroke="#92400e" strokeWidth="1" opacity="0.5" />

          {/* 4 Carved Radial Wood Spoke Beams */}
          <line x1="102" y1="270" x2="238" y2="270" stroke="#78350f" strokeWidth="3" opacity="0.75" />
          <line x1="170" y1="202" x2="170" y2="338" stroke="#78350f" strokeWidth="3" opacity="0.75" />
          <line x1="122" y1="222" x2="218" y2="318" stroke="#78350f" strokeWidth="2.2" opacity="0.55" />
          <line x1="122" y1="318" x2="218" y2="222" stroke="#78350f" strokeWidth="2.2" opacity="0.55" />

          {/* Brass Spoke Studs */}
          <circle cx="120" cy="270" r="2" fill="#facc15" />
          <circle cx="220" cy="270" r="2" fill="#facc15" />
          <circle cx="170" cy="220" r="2" fill="#facc15" />
          <circle cx="170" cy="320" r="2" fill="#facc15" />

          {/* Center Wheelhead Spindle Hub */}
          <circle cx="170" cy="270" r="32" fill="#2d1303" stroke="#b45309" strokeWidth="1.8" />
        </g>

        {/* ================================================================= */}
        {/* 3. DYNAMIC CLAY EVOLUTION OR COMPLETED POT */}
        {/* ================================================================= */}
        {!potEmerged ? (
          <>
            {/* STAGE 0: Initial Empty Wheelhead Spindle */}
            {elementsInWheel === 0 && (
              <g>
                <circle cx="170" cy="270" r="14" fill="#b45309" stroke="#f59e0b" strokeWidth="1.5" />
                <circle cx="170" cy="270" r="4" fill="#fde047" />
                <text x="170" y="254" textAnchor="middle" fill="#fef08a" fontSize="10.5" fontWeight="900">
                  कुलाल-चक्रम्
                </text>
                <text x="170" y="286" textAnchor="middle" fill="#38bdf8" fontSize="7.5" fontWeight="700">
                  Swipe #1 Earth to throw clay
                </text>
              </g>
            )}

            {/* STAGE 1: Earth (Pṛthivī) - Centered Raw Clay Mound (Mṛd-piṇḍa) */}
            {elementsInWheel === 1 && (
              <g>
                <ellipse cx="170" cy="272" rx="35" ry="22" fill="url(#pwClayLump)" stroke="#3b1702" strokeWidth="2" />
                <path d="M 144 270 Q 170 260 196 270" fill="none" stroke="#92400e" strokeWidth="1.8" opacity="0.85" />
                <path d="M 148 276 Q 170 268 192 276" fill="none" stroke="#92400e" strokeWidth="1.5" opacity="0.8" />
                <path d="M 152 282 Q 170 274 188 282" fill="none" stroke="#78350f" strokeWidth="1.2" opacity="0.75" />
                <path d="M 124 270 L 132 270" stroke="#facc15" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
                <path d="M 216 270 L 208 270" stroke="#facc15" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
              </g>
            )}

            {/* STAGE 2: Water (Ap) - Smooth Pliable Cone with Water Sheen (Sneha) */}
            {elementsInWheel === 2 && (
              <g>
                <path
                  d="M 142 276 C 142 258, 154 246, 170 246 C 186 246, 198 258, 198 276 C 198 284, 142 284, 142 276 Z"
                  fill="url(#pwClayLump)"
                  stroke="#3b1702"
                  strokeWidth="1.8"
                />
                <path
                  d="M 146 274 C 146 260, 156 248, 170 248 C 184 248, 194 260, 194 274 Z"
                  fill="url(#pwWaterSheen)"
                />
                <path d="M 150 266 Q 170 258 190 266" fill="none" stroke="#7dd3fc" strokeWidth="2" opacity="0.95" />
                <path d="M 154 272 Q 170 264 186 272" fill="none" stroke="#bae6fd" strokeWidth="1.5" opacity="0.9" />
              </g>
            )}

            {/* STAGE 3: Fire (Tejas) - Thermal Ceramic Baking (Pīlukapāka) */}
            {elementsInWheel === 3 && (
              <g>
                <path
                  d="M 144 278 C 142 252, 152 240, 170 240 C 188 240, 198 252, 196 278 C 196 284, 144 284, 144 278 Z"
                  fill="url(#potTerraGrad)"
                  stroke="#551a08"
                  strokeWidth="2"
                  filter="url(#potGlowFilter)"
                />
                <ellipse cx="170" cy="264" rx="26" ry="18" fill="url(#pwHeatGlow)" className="akasa-thermal-glow" />
                <circle cx="170" cy="256" r="4.5" fill="#facc15" opacity="0.95" />
                <circle cx="162" cy="244" r="1.8" fill="#fdba74" />
                <circle cx="178" cy="242" r="2" fill="#fde047" />
                <circle cx="170" cy="236" r="1.5" fill="#ef4444" />
                <line x1="146" y1="262" x2="158" y2="262" stroke="#fde047" strokeWidth="2" strokeDasharray="2 2" />
                <line x1="182" y1="262" x2="194" y2="262" stroke="#fde047" strokeWidth="2" strokeDasharray="2 2" />
              </g>
            )}

            {/* STAGE 4: Air (Vāyu) - Upward Pulled Neck under High Momentum (Vega) */}
            {elementsInWheel === 4 && (
              <g>
                <path
                  d="M 148 280 C 138 264, 150 246, 158 232 L 158 222 C 164 220, 176 220, 182 222 L 182 232 C 190 246, 202 264, 192 280 Z"
                  fill="url(#potTerraGrad)"
                  stroke="#551a08"
                  strokeWidth="2"
                  filter="url(#potGlowFilter)"
                />
                <ellipse cx="170" cy="222" rx="14" ry="4" fill="#9a3412" stroke="#ea580c" strokeWidth="1" />
                <path
                  d="M 136 270 Q 170 236 204 270 Q 170 300 136 270"
                  fill="none"
                  stroke="#34d399"
                  strokeWidth="2.5"
                  strokeDasharray="8 4"
                  className="akasa-wind-curl"
                  opacity="0.95"
                />
                <path d="M 146 250 Q 170 234 194 250" fill="none" stroke="#6ee7b7" strokeWidth="1.8" opacity="0.85" />
                <path d="M 140 226 Q 170 216 200 226" fill="none" stroke="#a7f3d0" strokeWidth="1.4" opacity="0.8" />
              </g>
            )}

            {/* STAGE 5: Space (Ākāśa) - Hollow Internal Spatial Chamber (Avakāśa) */}
            {elementsInWheel === 5 && (
              <g>
                <path
                  d="M 148 280 C 138 264, 148 246, 156 230 L 154 220 C 160 216, 180 216, 186 220 L 184 230 C 192 246, 202 264, 192 280 Z"
                  fill="url(#potTerraGrad)"
                  stroke="#551a08"
                  strokeWidth="2"
                  filter="url(#potGlowFilter)"
                />
                <ellipse cx="170" cy="218" rx="18" ry="7" fill="url(#potTerraGrad)" stroke="#7c2d12" strokeWidth="1.8" />
                <ellipse cx="170" cy="217" rx="13" ry="5.5" fill="#020617" stroke="#c084fc" strokeWidth="2" />
                <circle cx="172" cy="216" r="1.5" fill="#38bdf8" opacity="0.9" />
                <circle cx="170" cy="217" r="22" fill="none" stroke="#a855f7" strokeWidth="1.2" strokeDasharray="4 2" className="akasa-ether-expand" opacity="0.8" />
                <circle cx="170" cy="217" r="30" fill="none" stroke="#c084fc" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
              </g>
            )}

            {/* =============================================================== */}
            {/* 4. GURU'S ARMS & HANDS DYNAMICALLY RESPONDING TO EACH ELEMENT */}
            {/* =============================================================== */}
            {/* STAGE 0: Poised with Turning Stick (Daṇḍa) */}
            {elementsInWheel === 0 && (
              <g>
                <g className="akasa-guru-hand-left">
                  <path d="M 100 120 C 90 145, 86 175, 96 195 L 110 190 C 104 175, 106 145, 114 124 Z" fill="url(#artisanRobe)" stroke="#9a3412" strokeWidth="1" />
                  <ellipse cx="103" cy="192" rx="7" ry="4" fill="#b45309" stroke="#f59e0b" strokeWidth="1" />
                  <path d="M 103 192 Q 112 230 126 256 L 132 250 Q 120 225 110 190 Z" fill="url(#artisanSkin)" stroke="#ea580c" strokeWidth="1" />
                  <ellipse cx="128" cy="256" rx="8" ry="6" fill="url(#artisanSkin)" stroke="#ea580c" strokeWidth="1" />
                  <path d="M 126 260 Q 132 268 138 265" stroke="#ea580c" strokeWidth="2" fill="none" strokeLinecap="round" />
                </g>
                <g className="akasa-guru-hand-right">
                  <path d="M 240 120 C 250 145, 254 175, 244 195 L 230 190 C 236 175, 234 145, 226 124 Z" fill="url(#artisanRobe)" stroke="#9a3412" strokeWidth="1" />
                  <ellipse cx="237" cy="192" rx="7" ry="4" fill="#b45309" stroke="#f59e0b" strokeWidth="1" />
                  <path d="M 237 192 Q 225 230 206 248 L 200 242 Q 216 225 230 190 Z" fill="url(#artisanSkin)" stroke="#ea580c" strokeWidth="1" />
                  <line x1="195" y1="240" x2="252" y2="299" stroke="#d97706" strokeWidth="4.5" strokeLinecap="round" />
                  <line x1="195" y1="240" x2="252" y2="299" stroke="#fef08a" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="3 3" />
                  <ellipse cx="204" cy="248" rx="7" ry="6" fill="url(#artisanSkin)" stroke="#ea580c" strokeWidth="1" />
                  <path d="M 199 246 Q 204 254 209 250" stroke="#ea580c" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                </g>
              </g>
            )}

            {/* STAGE 1: Centering Pressure on Earth Mound (#1 Earth) */}
            {elementsInWheel === 1 && (
              <g className="akasa-hands-press">
                <g className="akasa-guru-hand-left">
                  <path d="M 100 120 C 90 145, 86 175, 96 195 L 110 190 C 104 175, 106 145, 114 124 Z" fill="url(#artisanRobe)" stroke="#9a3412" strokeWidth="1" />
                  <ellipse cx="103" cy="192" rx="7" ry="4" fill="#b45309" stroke="#f59e0b" strokeWidth="1" />
                  <path d="M 103 192 Q 112 245 130 272 L 138 266 Q 120 235 110 190 Z" fill="url(#artisanSkin)" stroke="#ea580c" strokeWidth="1" />
                  <ellipse cx="132" cy="272" rx="9" ry="7" fill="url(#artisanSkin)" stroke="#ea580c" strokeWidth="1.2" />
                  <path d="M 128 266 Q 138 268 142 276" stroke="#ea580c" strokeWidth="2.4" fill="none" strokeLinecap="round" />
                  <path d="M 132 265 Q 140 262 146 268" stroke="#ea580c" strokeWidth="2" fill="none" strokeLinecap="round" />
                </g>
                <g className="akasa-guru-hand-right">
                  <path d="M 240 120 C 250 145, 254 175, 244 195 L 230 190 C 236 175, 234 145, 226 124 Z" fill="url(#artisanRobe)" stroke="#9a3412" strokeWidth="1" />
                  <ellipse cx="237" cy="192" rx="7" ry="4" fill="#b45309" stroke="#f59e0b" strokeWidth="1" />
                  <path d="M 237 192 Q 228 245 210 272 L 202 266 Q 220 235 230 190 Z" fill="url(#artisanSkin)" stroke="#ea580c" strokeWidth="1" />
                  <ellipse cx="208" cy="272" rx="9" ry="7" fill="url(#artisanSkin)" stroke="#ea580c" strokeWidth="1.2" />
                  <path d="M 212 266 Q 202 268 198 276" stroke="#ea580c" strokeWidth="2.4" fill="none" strokeLinecap="round" />
                  <path d="M 208 265 Q 200 262 194 268" stroke="#ea580c" strokeWidth="2" fill="none" strokeLinecap="round" />
                </g>
              </g>
            )}

            {/* STAGE 2: Lubricating Wet Palms & Dripping Sneha (#2 Water) */}
            {elementsInWheel === 2 && (
              <g>
                <g className="akasa-guru-hand-left">
                  <path d="M 100 120 C 90 145, 86 175, 96 195 L 110 190 C 104 175, 106 145, 114 124 Z" fill="url(#artisanRobe)" stroke="#9a3412" strokeWidth="1" />
                  <ellipse cx="103" cy="192" rx="7" ry="4" fill="#b45309" stroke="#f59e0b" strokeWidth="1" />
                  <path d="M 103 192 Q 115 235 136 266 L 142 260 Q 122 230 110 190 Z" fill="url(#artisanSkin)" stroke="#ea580c" strokeWidth="1" />
                  <ellipse cx="136" cy="266" rx="8" ry="7" fill="url(#artisanSkin)" stroke="#38bdf8" strokeWidth="1.5" />
                  <path d="M 134 262 Q 142 264 146 270" stroke="#ea580c" strokeWidth="2.2" fill="none" strokeLinecap="round" />
                </g>
                <g className="akasa-guru-hand-right">
                  <path d="M 240 120 C 250 145, 254 175, 244 195 L 230 190 C 236 175, 234 145, 226 124 Z" fill="url(#artisanRobe)" stroke="#9a3412" strokeWidth="1" />
                  <ellipse cx="237" cy="192" rx="7" ry="4" fill="#b45309" stroke="#f59e0b" strokeWidth="1" />
                  <path d="M 237 192 Q 225 235 204 266 L 198 260 Q 218 230 230 190 Z" fill="url(#artisanSkin)" stroke="#ea580c" strokeWidth="1" />
                  <ellipse cx="204" cy="266" rx="8" ry="7" fill="url(#artisanSkin)" stroke="#38bdf8" strokeWidth="1.5" />
                  <path d="M 206 262 Q 198 264 194 270" stroke="#ea580c" strokeWidth="2.2" fill="none" strokeLinecap="round" />
                </g>
                <circle cx="136" cy="278" r="2.5" className="akasa-water-drip" fill="#38bdf8" />
                <circle cx="204" cy="278" r="2.5" className="akasa-water-drip" fill="#38bdf8" />
                <circle cx="170" cy="286" r="2.5" className="akasa-water-drip" fill="#38bdf8" />
              </g>
            )}

            {/* STAGE 3: Fiery Radiant Palms Baking Ceramic (#3 Fire) */}
            {elementsInWheel === 3 && (
              <g>
                <circle cx="138" cy="264" r="15" fill="#f97316" opacity="0.35" className="akasa-thermal-glow" />
                <circle cx="202" cy="264" r="15" fill="#f97316" opacity="0.35" className="akasa-thermal-glow" />
                <g className="akasa-guru-hand-left">
                  <path d="M 100 120 C 90 145, 86 175, 96 195 L 110 190 C 104 175, 106 145, 114 124 Z" fill="url(#artisanRobe)" stroke="#9a3412" strokeWidth="1" />
                  <ellipse cx="103" cy="192" rx="7" ry="4" fill="#b45309" stroke="#f59e0b" strokeWidth="1" />
                  <path d="M 103 192 Q 115 235 138 264 L 144 258 Q 122 230 110 190 Z" fill="url(#artisanSkin)" stroke="#ea580c" strokeWidth="1" />
                  <ellipse cx="138" cy="264" rx="8" ry="7" fill="url(#artisanSkin)" stroke="#facc15" strokeWidth="1.8" />
                  <path d="M 136 260 Q 144 262 146 268" stroke="#ea580c" strokeWidth="2.2" fill="none" strokeLinecap="round" />
                </g>
                <g className="akasa-guru-hand-right">
                  <path d="M 240 120 C 250 145, 254 175, 244 195 L 230 190 C 236 175, 234 145, 226 124 Z" fill="url(#artisanRobe)" stroke="#9a3412" strokeWidth="1" />
                  <ellipse cx="237" cy="192" rx="7" ry="4" fill="#b45309" stroke="#f59e0b" strokeWidth="1" />
                  <path d="M 237 192 Q 225 235 202 264 L 196 258 Q 218 230 230 190 Z" fill="url(#artisanSkin)" stroke="#ea580c" strokeWidth="1" />
                  <ellipse cx="202" cy="264" rx="8" ry="7" fill="url(#artisanSkin)" stroke="#facc15" strokeWidth="1.8" />
                  <path d="M 204 260 Q 196 262 194 268" stroke="#ea580c" strokeWidth="2.2" fill="none" strokeLinecap="round" />
                </g>
              </g>
            )}

            {/* STAGE 4: Pulling Neck Upward under High Velocity (#4 Air) */}
            {elementsInWheel === 4 && (
              <g className="akasa-hands-pull">
                <g className="akasa-guru-hand-left">
                  <path d="M 100 120 C 90 145, 86 175, 96 195 L 110 190 C 104 175, 106 145, 114 124 Z" fill="url(#artisanRobe)" stroke="#9a3412" strokeWidth="1" />
                  <ellipse cx="103" cy="192" rx="7" ry="4" fill="#b45309" stroke="#f59e0b" strokeWidth="1" />
                  <path d="M 103 192 Q 120 215 144 234 L 150 228 Q 124 210 110 190 Z" fill="url(#artisanSkin)" stroke="#ea580c" strokeWidth="1" />
                  <ellipse cx="144" cy="234" rx="7" ry="6" fill="url(#artisanSkin)" stroke="#10b981" strokeWidth="1.5" />
                  <path d="M 142 230 Q 150 232 152 238" stroke="#ea580c" strokeWidth="2" fill="none" strokeLinecap="round" />
                </g>
                {isTalkingAboutSpace ? (
                  <g className="akasa-guru-hand-right akasa-space-upadesha-arm">
                    <path d="M 240 120 C 255 140, 260 165, 248 185 L 234 180 C 242 165, 238 140, 226 124 Z" fill="url(#artisanRobe)" stroke="#9a3412" strokeWidth="1" />
                    <ellipse cx="242" cy="182" rx="7" ry="4" fill="#b45309" stroke="#f59e0b" strokeWidth="1" />
                    <path d="M 242 182 Q 220 195 198 208 L 194 202 Q 218 190 236 178 Z" fill="url(#artisanSkin)" stroke="#ea580c" strokeWidth="1" />
                    <circle cx="198" cy="204" r="3" fill="#facc15" stroke="#ea580c" strokeWidth="0.8" />
                  </g>
                ) : (
                  <g className="akasa-guru-hand-right">
                    <path d="M 240 120 C 250 145, 254 175, 244 195 L 230 190 C 236 175, 234 145, 226 124 Z" fill="url(#artisanRobe)" stroke="#9a3412" strokeWidth="1" />
                    <ellipse cx="237" cy="192" rx="7" ry="4" fill="#b45309" stroke="#f59e0b" strokeWidth="1" />
                    <path d="M 237 192 Q 220 215 196 234 L 190 228 Q 216 210 230 190 Z" fill="url(#artisanSkin)" stroke="#ea580c" strokeWidth="1" />
                    <ellipse cx="196" cy="234" rx="7" ry="6" fill="url(#artisanSkin)" stroke="#10b981" strokeWidth="1.5" />
                    <path d="M 198 230 Q 190 232 188 238" stroke="#ea580c" strokeWidth="2" fill="none" strokeLinecap="round" />
                  </g>
                )}
              </g>
            )}

            {/* STAGE 5: Thumbs Plunging to Hollow Space (#5 Space) */}
            {elementsInWheel === 5 && (
              <g>
                <g className="akasa-guru-hand-left">
                  <path d="M 100 120 C 90 145, 86 175, 96 195 L 110 190 C 104 175, 106 145, 114 124 Z" fill="url(#artisanRobe)" stroke="#9a3412" strokeWidth="1" />
                  <ellipse cx="103" cy="192" rx="7" ry="4" fill="#b45309" stroke="#f59e0b" strokeWidth="1" />
                  <path d="M 103 192 Q 120 210 144 222 L 150 216 Q 124 205 110 190 Z" fill="url(#artisanSkin)" stroke="#ea580c" strokeWidth="1" />
                  <ellipse cx="144" cy="222" rx="7" ry="6" fill="url(#artisanSkin)" stroke="#c084fc" strokeWidth="1.5" />
                  <path d="M 148 218 Q 162 216 164 222" stroke="#fed7aa" strokeWidth="3" fill="none" strokeLinecap="round" />
                </g>
                <g className="akasa-guru-hand-right">
                  <path d="M 240 120 C 250 145, 254 175, 244 195 L 230 190 C 236 175, 234 145, 226 124 Z" fill="url(#artisanRobe)" stroke="#9a3412" strokeWidth="1" />
                  <ellipse cx="237" cy="192" rx="7" ry="4" fill="#b45309" stroke="#f59e0b" strokeWidth="1" />
                  <path d="M 237 192 Q 220 210 196 222 L 190 216 Q 216 205 230 190 Z" fill="url(#artisanSkin)" stroke="#ea580c" strokeWidth="1" />
                  <ellipse cx="196" cy="222" rx="7" ry="6" fill="url(#artisanSkin)" stroke="#c084fc" strokeWidth="1.5" />
                  <path d="M 192 218 Q 178 216 176 222" stroke="#fed7aa" strokeWidth="3" fill="none" strokeLinecap="round" />
                </g>
              </g>
            )}

            {/* Elements Inside Indicator Chip */}
            {elementsInWheel >= 1 && (
              <g>
                <rect x="130" y="306" width="80" height="18" rx="9" fill="rgba(15,23,42,0.92)" stroke="#facc15" strokeWidth="1" />
                <text x="170" y="318" textAnchor="middle" fill="#fef08a" fontSize="8" fontWeight="800">
                  {elementsInWheel}/5 Added
                </text>
              </g>
            )}

            {/* Orbiting Tryaṇukas along the Turntable Rim */}
            {slots.map((s, idx) => {
              if (!s.isInWheel) return null;
              const angleRad = ((idx * 72 - 90) * Math.PI) / 180;
              const ox = 170 + 96 * Math.cos(angleRad);
              const oy = 270 + 96 * Math.sin(angleRad);

              return (
                <g key={s.slotNumber} transform={`translate(${ox}, ${oy})`}>
                  <circle cx="0" cy="0" r="14" fill="#0f172a" stroke={s.border} strokeWidth="2" />
                  <text x="0" y="3" textAnchor="middle" fontSize="13">
                    {s.icon}
                  </text>
                  <text x="0" y="12" textAnchor="middle" fontSize="7" fill="#f8fafc" fontWeight="800">
                    #{s.slotNumber}
                  </text>
                </g>
              );
            })}
          </>
        ) : (
          /* ================================================================= */
          /* 5. MASTERPIECE: GURU KAṆĀDA PRESENTING THE FINISHED CLAY VESSEL */
          /* ================================================================= */
          <g>
            {/* Solar Sunburst behind the Pot */}
            <circle cx="170" cy="240" r="54" fill="url(#artisanSunHalo)" />
            {Array.from({ length: 8 }, (_, i) => {
              const angle = (i * 45 * Math.PI) / 180;
              const x1 = 170 + 44 * Math.cos(angle);
              const y1 = 240 + 44 * Math.sin(angle);
              const x2 = 170 + 58 * Math.cos(angle);
              const y2 = 240 + 58 * Math.sin(angle);
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fde047" strokeWidth="1.8" opacity="0.8" />;
            })}

            {/* Base of Pot */}
            <ellipse cx="170" cy="295" rx="24" ry="7" fill="#431407" stroke="#7c2d12" strokeWidth="1.8" />

            {/* Bulbous Belly (Kumbha / Udaram) */}
            <path
              d="M 146 200 C 120 220, 116 270, 146 292 C 156 298, 184 298, 194 292 C 224 270, 220 220, 194 200 Z"
              fill="url(#potTerraGrad)"
              stroke="#551a08"
              strokeWidth="2.2"
              filter="url(#potGlowFilter)"
            />

            {/* Glaze Highlight */}
            <path
              d="M 150 210 C 130 230, 128 268, 150 286"
              fill="none"
              stroke="url(#potGlazeHighlight)"
              strokeWidth="6"
              strokeLinecap="round"
              opacity="0.75"
            />

            {/* Artisanal Etched Lotus Decorative Bands */}
            <path d="M 134 238 Q 170 252 206 238" fill="none" stroke="#fef08a" strokeWidth="1.6" opacity="0.85" />
            <path d="M 138 258 Q 170 270 202 258" fill="none" stroke="#fef08a" strokeWidth="1.4" opacity="0.85" />

            {/* Sculpted Neck (Kaṇṭha) */}
            <path
              d="M 154 172 L 148 200 C 156 204, 184 204, 192 200 L 186 172 Z"
              fill="url(#potTerraGrad)"
              stroke="#7c2d12"
              strokeWidth="1.5"
            />
            <path d="M 152 184 Q 170 190 188 184" fill="none" stroke="#fed7aa" strokeWidth="1.2" opacity="0.75" />

            {/* Flared Mouth Lip (Mukha) */}
            <ellipse cx="170" cy="172" rx="20" ry="8" fill="url(#potTerraGrad)" stroke="#7c2d12" strokeWidth="2" />

            {/* Internal Cavity with Glistening Water (Avakāśa + Ap) */}
            <ellipse cx="170" cy="170" rx="15" ry="5.5" fill="url(#potWaterGleam)" stroke="#38bdf8" strokeWidth="1" />
            <circle cx="173" cy="169" r="1.2" fill="#ffffff" opacity="0.9" />

            {/* Guru's Arms & Hands Presenting the Completed Vessel */}
            <g className="akasa-guru-hand-left">
              <path
                d="M 100 120 C 90 145, 86 175, 96 195 L 110 190 C 104 175, 106 145, 114 124 Z"
                fill="url(#artisanRobe)"
                stroke="#9a3412"
                strokeWidth="1"
              />
              <path
                d="M 103 192 Q 112 225 130 244 L 136 238 Q 120 220 110 190 Z"
                fill="url(#artisanSkin)"
                stroke="#ea580c"
                strokeWidth="1"
              />
              <ellipse cx="134" cy="242" rx="8" ry="7" fill="url(#artisanSkin)" stroke="#ea580c" strokeWidth="1" />
              <path d="M 130 246 Q 138 240 144 246" stroke="#ea580c" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            </g>

            <g className="akasa-guru-hand-right">
              <path
                d="M 240 120 C 250 145, 254 175, 244 195 L 230 190 C 236 175, 234 145, 226 124 Z"
                fill="url(#artisanRobe)"
                stroke="#9a3412"
                strokeWidth="1"
              />
              <path
                d="M 237 192 Q 228 225 210 244 L 204 238 Q 220 220 230 190 Z"
                fill="url(#artisanSkin)"
                stroke="#ea580c"
                strokeWidth="1"
              />
              <ellipse cx="206" cy="242" rx="8" ry="7" fill="url(#artisanSkin)" stroke="#ea580c" strokeWidth="1" />
              <path d="M 210 246 Q 202 240 196 246" stroke="#ea580c" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            </g>

            {/* Sparkles of Atomic Completion */}
            <circle cx="120" cy="210" r="2" fill="#fde047" opacity="0.9" />
            <circle cx="220" cy="214" r="2" fill="#fde047" opacity="0.9" />
            <circle cx="170" cy="150" r="2.5" fill="#fde047" opacity="0.9" />
          </g>
        )}

      </svg>

      {/* Real-time Guru Artisan Action Banner */}
      <div className="akasa-guru-artisan-banner">
        <span className="akasa-artisan-tag">
          {getArtisanActionTag()}
        </span>
        <p className="akasa-artisan-action-desc">{getArtisanActionText()}</p>
      </div>

      {/* Ring Ceramic Test Button (when completed) — Ākāśa Known by Sound */}
      {potEmerged && onRing && (
        <div className="akasa-ceramic-ring-box">
          <button
            type="button"
            className="akasa-pot-ring-btn"
            onClick={onRing}
            title="While other 4 elements are known by their tangible activity, eternal Space (Ākāśa) is known solely by its effect: Sound (Śabda-guṇa)!"
          >
            <span className="akasa-click-here-badge">👉 CLICK HERE</span>
            <span>Striking the pot reveals Space through Sound (शब्द-गुणः)! 🔔</span>
          </button>
          <div className="akasa-ring-principle-badge">
            <span style={{ color: '#facc15', fontWeight: 800 }}>💡 वैशेषिक-सिद्धान्तः (Vaiśeṣika Sūtra):</span>{' '}
            While the other 4 elements are known by their tangible activity (Earth by resistance, Water by cohesion, Fire by heat, Air by motion) — <strong>eternal Space (Ākāśa) is known solely by its effect: SOUND (शब्द-गुणः)!</strong> Striking the baked ceramic pot causes the enclosed spatial void (घटाकाश) to vibrate with musical chime!
          </div>
        </div>
      )}

      {/* 5 United Causal Layers Badges (when completed) */}
      {potEmerged && (
        <div className="akasa-pot-causes-row">
          <span className="akasa-pot-cause-pill" style={{ borderColor: '#ca8a04', color: '#fef08a' }}>
            🪨 1. Earth (Mass)
          </span>
          <span className="akasa-pot-cause-pill" style={{ borderColor: '#0284c7', color: '#7dd3fc' }}>
            💧 2. Water (Sneha Binding)
          </span>
          <span className="akasa-pot-cause-pill" style={{ borderColor: '#ea580c', color: '#fdba74' }}>
            🔥 3. Fire (Pīlukapāka Ceramic)
          </span>
          <span className="akasa-pot-cause-pill" style={{ borderColor: '#059669', color: '#6ee7b7' }}>
            💨 4. Air (Vega Motion)
          </span>
          <span className="akasa-pot-cause-pill" style={{ borderColor: '#9333ea', color: '#d8b4fe' }}>
            🌌 5. Space (Avakāśa Room)
          </span>
        </div>
      )}
    </div>
  );
};

export const PottersWheelGraphic = GuruArtisanPottersWheel;

// =========================================================================
// FINAL APPEARANCE OF THE COSMIC CLAY POT (MASTERPIECE)
// =========================================================================

export const CosmicClayPotGraphic: React.FC<{ onRing?: () => void }> = ({ onRing }) => (
  <div className="akasa-pot-masterpiece">
    <div className="akasa-pot-sunburst" />
    <div className="akasa-pot-float-container">
      <svg
        viewBox="0 0 200 240"
        className="akasa-pot-svg"
        aria-label="Cosmic Terracotta Clay Pot (घटः सिद्धः)"
      >
        <defs>
          <radialGradient id="potTerraGrad" cx="35%" cy="38%" r="65%">
            <stop offset="0%" stopColor="#fdba74" />
            <stop offset="25%" stopColor="#ea580c" />
            <stop offset="60%" stopColor="#c2410c" />
            <stop offset="90%" stopColor="#7c2d12" />
            <stop offset="100%" stopColor="#431407" />
          </radialGradient>

          <radialGradient id="potWaterGleam" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#bae6fd" />
            <stop offset="60%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#082f49" />
          </radialGradient>

          <linearGradient id="potGlazeHighlight" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          <filter id="potGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#f97316" floodOpacity="0.6" />
          </filter>
        </defs>

        {/* 1. Pot Base (Pāda / Tala) */}
        <ellipse cx="100" cy="208" rx="34" ry="10" fill="#431407" stroke="#7c2d12" strokeWidth="2" />
        <ellipse cx="100" cy="206" rx="32" ry="8" fill="#7c2d12" />

        {/* 2. Bulbous Belly (Kumbha / Udaram) */}
        <path
          d="M 68 84 C 34 110, 30 178, 68 206 C 80 214, 120 214, 132 206 C 170 178, 166 110, 132 84 Z"
          fill="url(#potTerraGrad)"
          stroke="#551a08"
          strokeWidth="2.5"
          filter="url(#potGlowFilter)"
        />

        <path
          d="M 72 96 C 46 120, 44 170, 72 196"
          fill="none"
          stroke="url(#potGlazeHighlight)"
          strokeWidth="8"
          strokeLinecap="round"
          opacity="0.7"
        />

        {/* 3. Artisanal Etched Decorative Bands */}
        <path
          d="M 52 130 Q 100 148 148 130"
          fill="none"
          stroke="#fef08a"
          strokeWidth="2"
          opacity="0.8"
        />
        {Array.from({ length: 7 }, (_, i) => {
          const px = 62 + i * 13;
          const py = 138 + Math.sin((i / 6) * Math.PI) * 7;
          return (
            <path
              key={i}
              d={`M ${px} ${py} Q ${px + 6} ${py - 7} ${px + 12} ${py} Q ${px + 6} ${py + 3} ${px} ${py}`}
              fill="rgba(254, 240, 138, 0.45)"
              stroke="#facc15"
              strokeWidth="1"
            />
          );
        })}
        <path
          d="M 56 156 Q 100 172 144 156"
          fill="none"
          stroke="#fef08a"
          strokeWidth="1.8"
          opacity="0.8"
        />

        {/* 4. Sculpted Neck (Kaṇṭha) */}
        <path
          d="M 78 46 L 72 84 C 80 88, 120 88, 128 84 L 122 46 Z"
          fill="url(#potTerraGrad)"
          stroke="#7c2d12"
          strokeWidth="1.5"
        />
        <path d="M 76 60 Q 100 66 124 60" fill="none" stroke="#fed7aa" strokeWidth="1.4" opacity="0.75" />
        <path d="M 74 72 Q 100 78 126 72" fill="none" stroke="#fed7aa" strokeWidth="1.4" opacity="0.75" />

        {/* 5. Flared Mouth Lip (Mukha) */}
        <ellipse cx="100" cy="46" rx="28" ry="11" fill="url(#potTerraGrad)" stroke="#7c2d12" strokeWidth="2.5" />
        <ellipse cx="100" cy="44" rx="26" ry="9" fill="#9a3412" stroke="#ea580c" strokeWidth="1" />

        {/* 6. Internal Cavity with Glistening Water (Avakāśa + Ap) */}
        <ellipse cx="100" cy="43" rx="21" ry="7" fill="url(#potWaterGleam)" stroke="#38bdf8" strokeWidth="1.2" />
        <ellipse cx="100" cy="43" rx="14" ry="4" fill="#0284c7" opacity="0.7" />
        <circle cx="104" cy="42" r="1.5" fill="#ffffff" opacity="0.9" />

        {/* Golden Sunburst Sparkles */}
        <circle cx="34" cy="98" r="2" fill="#fde047" opacity="0.9" />
        <circle cx="166" cy="102" r="2" fill="#fde047" opacity="0.9" />
        <circle cx="100" cy="20" r="2.5" fill="#fde047" opacity="0.9" />
      </svg>
    </div>

    {onRing && (
      <button
        type="button"
        className="akasa-pot-ring-btn"
        onClick={onRing}
        title="Ring the pot to test ceramic acoustic hardness (Sage Kaṇāda's test for Pakva-Ghaṭa!)"
      >
        <span>🔔 Ring Baked Pot (ध्वनि-श्रवणम्)</span>
      </button>
    )}

    {/* 5 United Causal Layers Badges */}
    <div className="akasa-pot-causes-row">
      <span className="akasa-pot-cause-pill" style={{ borderColor: '#ca8a04', color: '#fef08a' }}>
        🪨 1. Earth (Mass)
      </span>
      <span className="akasa-pot-cause-pill" style={{ borderColor: '#0284c7', color: '#7dd3fc' }}>
        💧 2. Water (Sneha Binding)
      </span>
      <span className="akasa-pot-cause-pill" style={{ borderColor: '#ea580c', color: '#fdba74' }}>
        🔥 3. Fire (Pīlukapāka Ceramic)
      </span>
      <span className="akasa-pot-cause-pill" style={{ borderColor: '#059669', color: '#6ee7b7' }}>
        💨 4. Air (Vega Motion)
      </span>
      <span className="akasa-pot-cause-pill" style={{ borderColor: '#9333ea', color: '#d8b4fe' }}>
        🌌 5. Space (Avakāśa Room)
      </span>
    </div>
  </div>
);

// =========================================================================
// INTEGRATED 2D COLLISION CANVAS FOR ĀKĀŚA SŪTRA (RAPID-FIRE MATTER COLLISION)
// =========================================================================

interface Akasa2DCollisionCanvasProps {
  potEmerged: boolean;
  onRevealSpace: () => void;
  audio: any;
  onRing?: () => void;
}

export const Akasa2DCollisionCanvas: React.FC<Akasa2DCollisionCanvasProps> = ({
  potEmerged,
  onRevealSpace,
  audio,
  onRing,
}) => {
  const [rapidStage, setRapidStage] = useState<number>(potEmerged ? 5 : 0);
  const [isFiring, setIsFiring] = useState<boolean>(false);
  const [impactBurst, setImpactBurst] = useState<{ x: number; y: number; color: string; label: string } | null>(null);

  useEffect(() => {
    if (potEmerged && rapidStage < 5) {
      setRapidStage(5);
    }
  }, [potEmerged]);

  const triggerRapidFireSequence = () => {
    if (isFiring) return;
    setIsFiring(true);
    setRapidStage(0);
    setImpactBurst(null);

    // 1. Earth Tryaṇuka Shot (200ms)
    setTimeout(() => {
      setRapidStage(1);
      audio.playTone(196, 0.35);
      audio.playElementImpact('earth');
      setImpactBurst({ x: 310, y: 275, color: '#ca8a04', label: '🪨 Earth (#1 Pṛthivī) Collided ➔ Base Formed' });
    }, 200);

    // 2. Water Tryaṇuka Shot (850ms)
    setTimeout(() => {
      setRapidStage(2);
      audio.playTone(261.6, 0.35);
      audio.playElementImpact('water');
      setImpactBurst({ x: 310, y: 260, color: '#0284c7', label: '💧 Water (#2 Ap) Collided ➔ Sneha Cohesion' });
    }, 850);

    // 3. Fire Tryaṇuka Shot (1500ms)
    setTimeout(() => {
      setRapidStage(3);
      audio.playTone(329.6, 0.35);
      audio.playElementImpact('fire');
      setImpactBurst({ x: 310, y: 245, color: '#ea580c', label: '🔥 Fire (#3 Tejas) Collided ➔ Pīlukapāka Baking' });
    }, 1500);

    // 4. Air Tryaṇuka Shot (2150ms)
    setTimeout(() => {
      setRapidStage(4);
      audio.playTone(392, 0.35);
      audio.playElementImpact('air');
      setImpactBurst({ x: 310, y: 220, color: '#10b981', label: '💨 Air (#4 Vāyu) Collided ➔ Vega Neck Pull' });
    }, 2150);

    // 5. Space Revelation & Pot Emerged (2850ms)
    setTimeout(() => {
      setRapidStage(5);
      audio.playTone(528, 0.9, 'sine', 0.35);
      setImpactBurst({ x: 310, y: 160, color: '#c084fc', label: '🌌 All-Pervading Space (#5 Ākāśa) Revealed!' });
      setIsFiring(false);
      onRevealSpace();
    }, 2850);
  };

  return (
    <div className="akasa-collision-hud-wrap" role="region" aria-label="Cosmic 2D Collision Canvas">
      {/* Cosmic Ākāśa SVG Canvas */}
      <svg viewBox="0 0 620 370" className="akasa-collision-svg" aria-label="Matter Collision and Space Revelation Stage">
        <defs>
          <linearGradient id="colAkashaGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#080e22" />
            <stop offset="50%" stopColor="#100e28" />
            <stop offset="100%" stopColor="#1c0f38" />
          </linearGradient>

          <linearGradient id="colSunbeam" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.28" />
            <stop offset="60%" stopColor="#fde047" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#fde68a" stopOpacity="0.02" />
          </linearGradient>

          <radialGradient id="colNebulaGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.22" />
            <stop offset="50%" stopColor="#c084fc" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#030712" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="colGhatakasaGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#0284c7" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
          </radialGradient>

          <filter id="colGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Deep Cosmic Ether Canvas Background */}
        <rect x="0" y="0" width="620" height="370" fill="url(#colAkashaGrad)" />

        {/* 2. Living Ether Nebula Pulsing in Ākāśa */}
        <ellipse cx="310" cy="210" rx="240" ry="150" fill="url(#colNebulaGlow)" className="vl-akasha-nebula" />

        {/* 3. 42 Shimmering Cosmic Ether Stars */}
        {Array.from({ length: 42 }, (_, i) => {
          const sx = 15 + ((i * 127 + 23) % 590);
          const sy = 15 + ((i * 83 + 17) % 340);
          const sr = 0.8 + ((i * 7) % 10) * 0.12;
          return (
            <circle
              key={`star-${i}`}
              cx={sx}
              cy={sy}
              r={sr}
              fill={i % 3 === 0 ? '#38bdf8' : i % 5 === 0 ? '#fde047' : '#e9d5ff'}
              opacity={0.35 + ((i * 13) % 40) / 100}
            />
          );
        })}

        {/* 4. Diagonal Sunbeam Mote Slice (Jālasūryamarīcistha / Trasareṇu) */}
        <polygon points="560,0 620,0 180,370 80,370" fill="url(#colSunbeam)" />
        {Array.from({ length: 12 }, (_, m) => {
          const mx = 120 + ((m * 41) % 460);
          const my = 40 + ((m * 53) % 290);
          return (
            <circle
              key={`mote-${m}`}
              cx={mx}
              cy={my}
              r={1.8}
              fill="#fef08a"
              className="vl-sunbeam-mote"
              style={{ animationDelay: `${(m * 0.4).toFixed(1)}s` }}
            />
          );
        })}

        {/* 5. Center Potter's Wheelhead Turntable Base */}
        <ellipse cx="310" cy="285" rx="88" ry="24" fill="#18181b" stroke="#71717a" strokeWidth="2" />
        <ellipse cx="310" cy="285" rx="72" ry="18" fill="#451a03" stroke="#b45309" strokeWidth="1.5" />
        <circle cx="310" cy="285" r="14" fill="#2d1303" stroke="#f59e0b" strokeWidth="1" />

        {/* 6. RAPID-FIRE TRYAṆUKA PROJECTILE BEAMS */}
        {/* Projectile #1: Earth Tryaṇuka (Top Left -> Center) */}
        <g transform="translate(65, 60)">
          <circle cx="0" cy="0" r="18" fill="#1e293b" stroke="#ca8a04" strokeWidth="2" />
          <text x="0" y="5" textAnchor="middle" fontSize="16">🪨</text>
          <text x="0" y="28" textAnchor="middle" fill="#fde047" fontSize="8.5" fontWeight="800">#1 Pṛthivī</text>
        </g>
        {rapidStage === 1 && (
          <line x1="85" y1="75" x2="310" y2="280" stroke="#facc15" strokeWidth="3.5" strokeDasharray="8 4" strokeLinecap="round" />
        )}

        {/* Projectile #2: Water Tryaṇuka (Top Right -> Center) */}
        <g transform="translate(555, 60)">
          <circle cx="0" cy="0" r="18" fill="#1e293b" stroke="#0284c7" strokeWidth="2" />
          <text x="0" y="5" textAnchor="middle" fontSize="16">💧</text>
          <text x="0" y="28" textAnchor="middle" fill="#7dd3fc" fontSize="8.5" fontWeight="800">#2 Ap</text>
        </g>
        {rapidStage === 2 && (
          <line x1="535" y1="75" x2="310" y2="265" stroke="#38bdf8" strokeWidth="3.5" strokeDasharray="8 4" strokeLinecap="round" />
        )}

        {/* Projectile #3: Fire Tryaṇuka (Bottom Left -> Center) */}
        <g transform="translate(65, 310)">
          <circle cx="0" cy="0" r="18" fill="#1e293b" stroke="#ea580c" strokeWidth="2" />
          <text x="0" y="5" textAnchor="middle" fontSize="16">🔥</text>
          <text x="0" y="28" textAnchor="middle" fill="#fdba74" fontSize="8.5" fontWeight="800">#3 Tejas</text>
        </g>
        {rapidStage === 3 && (
          <line x1="85" y1="295" x2="310" y2="250" stroke="#f97316" strokeWidth="3.5" strokeDasharray="8 4" strokeLinecap="round" />
        )}

        {/* Projectile #4: Air Tryaṇuka (Bottom Right -> Center) */}
        <g transform="translate(555, 310)">
          <circle cx="0" cy="0" r="18" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
          <text x="0" y="5" textAnchor="middle" fontSize="16">💨</text>
          <text x="0" y="28" textAnchor="middle" fill="#6ee7b7" fontSize="8.5" fontWeight="800">#4 Vāyu</text>
        </g>
        {rapidStage === 4 && (
          <line x1="535" y1="295" x2="310" y2="225" stroke="#34d399" strokeWidth="3.5" strokeDasharray="8 4" strokeLinecap="round" />
        )}

        {/* 7. DYNAMIC EMERGING CLAY POT (CHANGING ONE AFTER MATTER) */}
        {/* Stage 1: Earth Raw Clay Mound */}
        {rapidStage === 1 && (
          <g>
            <ellipse cx="310" cy="280" rx="36" ry="18" fill="#78350f" stroke="#451a03" strokeWidth="2" />
            <circle cx="310" cy="280" r="28" fill="none" stroke="#facc15" strokeWidth="2" strokeDasharray="4 2" />
          </g>
        )}

        {/* Stage 2: Water Pliable Swollen Clay Belly */}
        {rapidStage === 2 && (
          <g>
            <ellipse cx="310" cy="275" rx="42" ry="24" fill="#92400e" stroke="#38bdf8" strokeWidth="2" />
            <ellipse cx="310" cy="270" rx="34" ry="18" fill="#38bdf8" opacity="0.4" />
          </g>
        )}

        {/* Stage 3: Fire Baked Red Ceramic Embers */}
        {rapidStage === 3 && (
          <g>
            <ellipse cx="310" cy="265" rx="46" ry="26" fill="#c2410c" stroke="#ea580c" strokeWidth="2.5" />
            <ellipse cx="310" cy="265" rx="38" ry="18" fill="#facc15" opacity="0.6" className="akasa-thermal-glow" />
            <circle cx="310" cy="265" r="5" fill="#ffffff" />
          </g>
        )}

        {/* Stage 4: Air Pulled Slender Neck */}
        {rapidStage === 4 && (
          <g>
            <path d="M 276 270 C 255 240, 255 210, 285 195 L 335 195 C 365 210, 365 240, 344 270 Z" fill="#ea580c" stroke="#7c2d12" strokeWidth="2" />
            <path d="M 292 195 L 290 170 L 330 170 L 328 195 Z" fill="#ea580c" stroke="#7c2d12" strokeWidth="1.8" />
            <ellipse cx="310" cy="170" rx="20" ry="6" fill="#9a3412" stroke="#34d399" strokeWidth="1.5" />
          </g>
        )}

        {/* Stage 5 / Pot Emerged: THE COMPLETED TERRACOTTA MASTERPIECE */}
        {rapidStage === 5 && (
          <g>
            {/* Outer All-Pervading Mahākāśa Cosmic Waves */}
            <circle cx="310" cy="220" className="akasa-mahakasa-pulse-wave" />
            <circle cx="310" cy="220" className="akasa-mahakasa-pulse-wave" style={{ animationDelay: '1.1s' }} />
            <circle cx="310" cy="220" className="akasa-mahakasa-pulse-wave" style={{ animationDelay: '2.2s' }} />

            {/* Base of Pot */}
            <ellipse cx="310" cy="285" rx="28" ry="8" fill="#431407" stroke="#7c2d12" strokeWidth="1.5" />

            {/* Bulbous Belly (Kumbha / Udaram) */}
            <path
              d="M 284 195 C 252 215, 248 262, 284 282 C 294 288, 326 288, 336 282 C 372 262, 368 215, 336 195 Z"
              fill="url(#potTerraGrad)"
              stroke="#551a08"
              strokeWidth="2.5"
              filter="url(#colGlow)"
            />

            {/* Glaze Highlights */}
            <path
              d="M 288 206 C 266 226, 264 260, 288 276"
              fill="none"
              stroke="#fed7aa"
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.8"
            />
            <path d="M 272 232 Q 310 246 348 232" fill="none" stroke="#fef08a" strokeWidth="1.6" opacity="0.85" />
            <path d="M 276 250 Q 310 262 344 250" fill="none" stroke="#fef08a" strokeWidth="1.4" opacity="0.85" />

            {/* Neck (Kaṇṭha) */}
            <path
              d="M 294 168 L 286 195 C 294 199, 326 199, 334 195 L 326 168 Z"
              fill="url(#potTerraGrad)"
              stroke="#7c2d12"
              strokeWidth="1.5"
            />

            {/* Flared Mouth Lip (Mukha) */}
            <ellipse cx="310" cy="168" rx="22" ry="8.5" fill="url(#potTerraGrad)" stroke="#7c2d12" strokeWidth="2" />

            {/* Internal Cavity / Hollow Chamber: GHAṬĀKĀŚA */}
            <ellipse cx="310" cy="166" rx="16" ry="6" fill="url(#colGhatakasaGlow)" className="akasa-ghatakasa-inner-gleam" />
            <circle cx="310" cy="166" r="2" fill="#ffffff" />

            {/* ============================================================= */}
            {/* DUAL RADIANT HIGHLIGHTS: GHAṬĀKĀŚA (INSIDE) & MAHĀKĀŚA (OUTSIDE) */}
            {/* ============================================================= */}
            {/* 1. GHAṬĀKĀŚA (INSIDE POT) CALLOUT */}
            <g>
              <line x1="310" y1="166" x2="200" y2="135" stroke="#38bdf8" strokeWidth="1.8" strokeDasharray="4 2" />
              <circle cx="200" cy="135" r="3" fill="#38bdf8" />
              <g transform="translate(15, 95)">
                <rect x="0" y="0" width="185" height="58" rx="10" fill="rgba(15,23,42,0.92)" stroke="#38bdf8" strokeWidth="1.8" />
                <text x="92" y="18" textAnchor="middle" fill="#7dd3fc" fontSize="10.5" fontWeight="900">
                  🏺 घटाकाश · Ghaṭākāśa
                </text>
                <text x="92" y="32" textAnchor="middle" fill="#f8fafc" fontSize="8.5" fontWeight="800">
                  Space INSIDE the Pot
                </text>
                <text x="92" y="47" textAnchor="middle" fill="#93c5fd" fontSize="7.2">
                  Pre-existing room enclosed by walls
                </text>
              </g>
            </g>

            {/* 2. MAHĀKĀŚA (OUTSIDE POT) CALLOUT */}
            <g>
              <line x1="370" y1="210" x2="435" y2="135" stroke="#c084fc" strokeWidth="1.8" strokeDasharray="4 2" />
              <circle cx="435" cy="135" r="3" fill="#c084fc" />
              <g transform="translate(420, 95)">
                <rect x="0" y="0" width="185" height="58" rx="10" fill="rgba(15,23,42,0.92)" stroke="#c084fc" strokeWidth="1.8" />
                <text x="92" y="18" textAnchor="middle" fill="#f5d0fe" fontSize="10.5" fontWeight="900">
                  🌌 महाकाश · Mahākāśa
                </text>
                <text x="92" y="32" textAnchor="middle" fill="#f8fafc" fontSize="8.5" fontWeight="800">
                  Space OUTSIDE the Pot
                </text>
                <text x="92" y="47" textAnchor="middle" fill="#d8b4fe" fontSize="7.2">
                  Boundless cosmic ether holding all
                </text>
              </g>
            </g>

            {/* Unbroken Ether Sūtra Banner at Bottom */}
            <g transform="translate(150, 342)">
              <rect x="0" y="0" width="320" height="22" rx="11" fill="rgba(15,23,42,0.9)" stroke="#facc15" strokeWidth="1.2" />
              <text x="160" y="14" textAnchor="middle" fill="#fef08a" fontSize="8.5" fontWeight="800">
                ✨ न घटाकाशो महाकाशाद् भिद्यते — Space is One &amp; Indivisible!
              </text>
            </g>
          </g>
        )}

        {/* Dynamic Impact Particle Burst Overlay */}
        {impactBurst && (
          <g>
            <circle cx={impactBurst.x} cy={impactBurst.y} r={24} fill="none" stroke={impactBurst.color} strokeWidth={3} className="vl-fusion-ring" />
            <circle cx={impactBurst.x} cy={impactBurst.y} r={12} fill={impactBurst.color} opacity={0.4} />
            <text x={impactBurst.x} y={impactBurst.y - 18} textAnchor="middle" fill="#fff" fontSize={16}>✦ ✨ ✧</text>
            <rect x={impactBurst.x - 110} y={impactBurst.y + 14} width="220" height="20" rx="10" fill="rgba(15,23,42,0.94)" stroke={impactBurst.color} strokeWidth="1" />
            <text x={impactBurst.x} y={impactBurst.y + 27} textAnchor="middle" fill="#f8fafc" fontSize="8" fontWeight="800">
              {impactBurst.label}
            </text>
          </g>
        )}
      </svg>

      {/* Collision Stage Bottom Controls */}
      <div className="akasa-collision-controls">
        <button
          type="button"
          className="akasa-step-act-btn is-gold"
          onClick={triggerRapidFireSequence}
          disabled={isFiring}
          style={{ margin: 0, padding: '0.45rem 1.15rem', fontSize: '0.84rem', fontWeight: 800 }}
        >
          {isFiring ? '⚡ Playing...' : rapidStage === 5 ? '🔄 Replay' : '▶️ Play'}
        </button>

        {rapidStage === 5 && onRing && (
          <button
            type="button"
            className="akasa-pot-ring-btn"
            onClick={onRing}
            style={{ margin: 0, padding: '0.45rem 0.95rem', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}
            title="While other 4 elements are known by their activity, Ākāśa is known solely by its effect: Sound!"
          >
            <span className="akasa-click-here-badge">👉 CLICK HERE</span>
            <span>Striking the pot reveals Space through Sound (शब्द-गुणः)! 🔔</span>
          </button>
        )}
      </div>
    </div>
  );
};

// =========================================================================
// MAIN COMPONENT
// =========================================================================

export interface AkasaSutraGameProps {
  onNextStation?: () => void;
  onPrevStation?: () => void;
}

export const AkasaSutraGame: React.FC<AkasaSutraGameProps> = ({ onNextStation }) => {
  // Navigation Tabs: 'game' (Potter's Wheel), 'relationships' (Article), 'quiz' (Mastery Quiz)
  const [activeTab, setActiveTab] = useState<'game' | 'relationships' | 'quiz'>('game');

  // 2-Page mode: 1 = Phase 1 Atomic Genesis Workshop, 2 = Phase 2 Potter's Wheel & Space
  const [gamePhase, setGamePhase] = useState<1 | 2>(1);
  const [gameExperienceMode, setGameExperienceMode] = useState<'autoplay' | 'interactive'>('autoplay');
  const [activeFusionFx, setActiveFusionFx] = useState<{ slotNumber: number; count: number; timestamp: number } | null>(null);

  // Staged 4 Numbered Corporeal Tryaṇuka Slots (Earth, Water, Fire, Air)
  const [slots, setSlots] = useState<TryanukaSlotState[]>(INITIAL_CORPOREAL_SLOTS);
  const [spaceRevealed, setSpaceRevealed] = useState(false);
  const [activeNote, setActiveNote] = useState<TryanukaSlotState | null>(null);
  const [potEmerged, setPotEmerged] = useState(false);
  const [spaceFocusPulse, setSpaceFocusPulse] = useState(false);

  // Derived state for the 2-phase progression
  const allFourReady = slots.every((s) => s.isReady);
  const allFourInWheel = slots.every((s) => s.isInWheel);
  const elementsInWheel = slots.filter((s) => s.isInWheel).length + (spaceRevealed ? 1 : 0);
  const allSlotsForWheel = spaceRevealed ? [...slots, { ...SPACE_ELEMENT_DATA, isInWheel: true }] : slots;

  // Active Slot Number for Strict Sequential Progression (1 to 5)
  // Stage 1: Earth (pṛthivī), Stage 2: Water (ap), Stage 3: Fire (tejas), Stage 4: Air (vāyu), Stage 5: Space Discussion
  const activeSlotNumber: 1 | 2 | 3 | 4 | 5 = !slots[0].isReady
    ? 1
    : !slots[1].isReady
    ? 2
    : !slots[2].isReady
    ? 3
    : !slots[3].isReady
    ? 4
    : 5;

  // Comic dialogue chronicle
  const [comicStrip, setComicStrip] = useState<ComicPanelEntry[]>(INITIAL_COMIC_PANELS);
  const comicScrollRef = useRef<HTMLDivElement>(null);

  // Flying Orb animation state (swipe simulation)
  const [flyingOrb, setFlyingOrb] = useState<{
    key: ElementKey;
    icon: string;
    color: string;
    x: number;
    y: number;
  } | null>(null);

  // Impact animation state when an element merges into the wheel
  const [elementImpact, setElementImpact] = useState<{
    slotNumber: number;
    key: ElementKey;
    icon: string;
    name: string;
    role: string;
    color: string;
    timestamp: number;
  } | null>(null);

  // Pot ring toast feedback
  const [ringToast, setRingToast] = useState(false);

  // Quiz States
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  // Auto-scroll comic strip on new panel
  useEffect(() => {
    if (comicScrollRef.current) {
      comicScrollRef.current.scrollTo({
        top: comicScrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [comicStrip]);

  // Add dialogue entry
  const logDialogue = (speaker: 'Bodhi' | 'Kaṇāda' | 'Pariśeṣa', text: string) => {
    const role = speaker === 'Bodhi' ? 'The Inquirer' : speaker === 'Kaṇāda' ? 'Sage Kaṇāda' : 'The Opponent';
    const avatar = speaker === 'Bodhi' ? '🧑‍🎓' : speaker === 'Kaṇāda' ? '🧘‍♂️' : '❓';
    setComicStrip((prev) => [
      ...prev,
      {
        id: `panel-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        speaker,
        text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        role,
        avatar,
      },
    ]);
  };

  // Smoothly move from Phase 1 to Phase 2 (Potter's Wheel)
  const handleProceedToPhase2 = () => {
    setGamePhase(2);
    audio.playTone(440, 0.35);
    // Smoothly scroll DOWNWARD to Phase 2 Potter's Wheel stage
    setTimeout(() => {
      const p2Container =
        document.getElementById('akasa-potters-wheel-stage-container') ||
        document.getElementById('akasa-phase2-container');
      if (p2Container) {
        p2Container.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // 1. Forge single Tryaṇuka in a slot (incremental or complete)
  const handleForgeSlot = (slotNumber: number) => {
    // Sequential Gate: only the active slot can be forged
    if (slotNumber > activeSlotNumber) return;

    const currentSlot = slots.find((s) => s.slotNumber === slotNumber);
    if (!currentSlot || currentSlot.isReady) return;

    const newCount = Math.min(6, currentSlot.count + 2);
    const isReady = newCount === 6;

    // Visual Sparkle FX
    setActiveFusionFx({ slotNumber, count: newCount, timestamp: Date.now() });
    setTimeout(() => setActiveFusionFx(null), 1200);

    // Audio FX (Snap + Trasareṇu Chime)
    if (isReady) {
      soundEffects.playTrasarenuChime();
      audio.playTone(currentSlot.freq * 1.5, 0.45);

      // Directly proceed to next section through code (no manual finger buttons required)
      if (slotNumber < 4) {
        setTimeout(() => {
          const nextEl = document.getElementById(`akasa-element-slot-${slotNumber + 1}`);
          if (nextEl) {
            nextEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 650);
      } else if (slotNumber === 4) {
        setTimeout(() => {
          handleProceedToPhase2();
        }, 950);
      }
    } else {
      soundEffects.playPuzzleSnap();
      audio.playTone(currentSlot.freq, 0.25);
    }

    setSlots((prev) =>
      prev.map((s) => {
        if (s.slotNumber !== slotNumber) return s;
        return {
          ...s,
          count: newCount,
          isReady,
        };
      })
    );
  };

  // 2. Swipe / Launch Numbered Tryaṇuka into Potter's Wheel
  const handleSwipeToWheel = (slotNumber: number) => {
    // Sequential Gate: Phase 1 must be complete before adding to the wheel
    if (!allFourReady) return;

    // Sequential Gate for Wheel: Must add in strict order #1 -> #2 -> #3 -> #4
    const currentWheelCount = slots.filter((s) => s.isInWheel).length;
    if (slotNumber !== currentWheelCount + 1) return;

    const targetSlot = slots.find((s) => s.slotNumber === slotNumber);
    if (!targetSlot || !targetSlot.isReady || targetSlot.isInWheel) return;

    // Start flying orb animation from slot coordinates towards center (50%, 48%)
    const startY = 20 + slotNumber * 14;
    setFlyingOrb({
      key: targetSlot.key,
      icon: targetSlot.icon,
      color: targetSlot.color,
      x: 18,
      y: startY,
    });

    audio.playTone(targetSlot.freq, 0.3);

    // After animation delay, absorb into wheel
    setTimeout(() => {
      setFlyingOrb(null);
      const itemsInWheelCount = slots.filter((s) => s.isInWheel).length + 1;
      audio.playWheelSpin(itemsInWheelCount);
      audio.playElementImpact(targetSlot.key);

      // Trigger impact animation & toast
      setElementImpact({
        slotNumber: targetSlot.slotNumber,
        key: targetSlot.key,
        icon: targetSlot.icon,
        name: `${targetSlot.dev} (${targetSlot.en})`,
        role: targetSlot.roleEn,
        color: targetSlot.color,
        timestamp: Date.now(),
      });
      setTimeout(() => {
        setElementImpact(null);
      }, 2200);

      // Update slot state
      setSlots((prev) =>
        prev.map((s) => (s.slotNumber === slotNumber ? { ...s, isInWheel: true } : s))
      );

      // Show Sūtra Note Card for this element
      setActiveNote(targetSlot);

      // Dialogue for this element's role
      if (slotNumber === 1) {
        logDialogue('Bodhi', 'Element #1 Pṛthivī (Earth) entered the wheel. What is its role?');
        setTimeout(() => {
          logDialogue('Kaṇāda', 'Earth is the Samavāyi-kāraṇa (Material Body). It gives the physical atoms of the pot.');
        }, 800);
      } else if (slotNumber === 2) {
        logDialogue('Bodhi', 'Element #2 Ap (Water) added. Why can’t earth make the pot alone?');
        setTimeout(() => {
          logDialogue('Kaṇāda', 'Loose dust cannot hold form. Water provides Sneha (cohesion) to bind the Aṇu particles [अणवः] into clay.');
        }, 800);
      } else if (slotNumber === 3) {
        logDialogue('Bodhi', 'Element #3 Tejas (Fire) is inside! How does heat transform the clay?');
        setTimeout(() => {
          logDialogue('Kaṇāda', 'Pīlukapāka! Thermal energy breaks bonds and bakes each Aṇu (अणु) into hardened, ringing ceramic.');
        }, 800);
      } else if (slotNumber === 4) {
        logDialogue('Bodhi', 'Element #4 Vāyu (Air) enters. The wheel is spinning faster!');
        setTimeout(() => {
          logDialogue('Kaṇāda', 'Air imparts kinetic momentum (vega) to turn the wheel, and evaporates moisture to dry the pot.');
          setTimeout(() => {
            logDialogue('Bodhi', 'Gurudeva! Earth, Water, Fire, and Air are all swirling inside. How are we going to add the 5th element (Ākāśa)? We don’t have a 5th Tryaṇuka!');
            setTimeout(() => {
              logDialogue(
                'Kaṇāda',
                'Space is not added from outside! It is all-pervading: inside the pot, outside the pot, before the pot was made, and after the pot is broken! Reveal universal space to complete the vessel.'
              );
            }, 800);
          }, 800);
        }, 800);
      }
    }, 450);
  };

  // 3. Reveal All-Pervading Space Climax (The 5th Element Revelation)
  const handleRevealSpace = () => {
    audio.playTone(528, 0.9, 'sine', 0.35); // 528Hz Solfeggio Ether tone
    soundEffects.playCelebrationChime();
    setSpaceRevealed(true);
    setElementImpact({
      slotNumber: 5,
      key: 'space',
      icon: '🌌',
      name: 'आकाश (All-Pervading Space)',
      role: 'Omnipresent Spatial Cavity (Avakāśa)',
      color: '#c084fc',
      timestamp: Date.now(),
    });

    setTimeout(() => {
      setElementImpact(null);
      setPotEmerged(true);
      setSpaceFocusPulse(true);
      audio.playPotEmergence();
      logDialogue(
        'Kaṇāda',
        '🎉 घट-सिद्धिः! The Cosmic Clay Pot has emerged! Look into its hollow belly—all 5 elements have united around eternal Space!'
      );
      // Smoothly animate and shift focus downward to the Space Discussion card
      setTimeout(() => {
        const spaceFocusEl = document.getElementById('akasa-space-discussion-pot-focus');
        if (spaceFocusEl) {
          spaceFocusEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 400);
    }, 600);
  };

  // Reset Workshop
  const handleResetWorkshop = () => {
    audio.playTone(196, 0.4);
    setSlots(INITIAL_CORPOREAL_SLOTS);
    setSpaceRevealed(false);
    setActiveNote(null);
    setPotEmerged(false);
    setSpaceFocusPulse(false);
    setFlyingOrb(null);
    setElementImpact(null);
    setRingToast(false);
    setComicStrip(INITIAL_COMIC_PANELS);
    setGamePhase(1);
    setActiveFusionFx(null);
  };

  // Quiz Answer Selection
  const handleAnswerQuiz = (optionIdx: number) => {
    if (isAnswered) return;
    setSelectedChoice(optionIdx);
    setIsAnswered(true);

    const isCorrect = optionIdx === QUIZ_QUESTIONS[quizIndex].correctIndex;
    if (isCorrect) {
      audio.playCorrectAnswer();
      setQuizScore((s) => s + 1);
    } else {
      audio.playWrongAnswer();
    }
  };

  const handleNextQuizQuestion = () => {
    if (quizIndex < QUIZ_QUESTIONS.length - 1) {
      setQuizIndex((idx) => idx + 1);
      setSelectedChoice(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setQuizIndex(0);
    setQuizScore(0);
    setSelectedChoice(null);
    setIsAnswered(false);
    setQuizFinished(false);
  };

  return (
    <div className="akasa-game-wrap" role="region" aria-label="ākāśa-sūtra Potter's Wheel Game Container">
      {/* 1. TOP NAVIGATION TABS (Game | Audio Slideshow | Quiz) */}
      <div className="akasa-nav-tabs" role="tablist">
        <button
          type="button"
          className={`akasa-nav-tab-btn${activeTab === 'game' ? ' is-active' : ''}`}
          onClick={() => {
            setActiveTab('game');
            soundEffects.playStrokeChime();
          }}
          role="tab"
          aria-selected={activeTab === 'game'}
        >
          <span>🎮 1. Gaming Arena: Potter’s Wheel (कुलाल-चक्रम्)</span>
          <span className="akasa-tab-badge">{elementsInWheel}/5 Elements</span>
        </button>

        <button
          type="button"
          className={`akasa-nav-tab-btn${activeTab === 'relationships' ? ' is-active' : ''}`}
          onClick={() => {
            setActiveTab('relationships');
            soundEffects.playStrokeChime();
          }}
          role="tab"
          aria-selected={activeTab === 'relationships'}
        >
          <span>🧭 2. Timeline Journey &amp; Dialogue Tour (संवाद-यात्रा)</span>
          <span className="akasa-tab-badge">8 Places &amp; Timeline Video</span>
        </button>

        <button
          type="button"
          className={`akasa-nav-tab-btn${activeTab === 'quiz' ? ' is-active' : ''}`}
          onClick={() => {
            setActiveTab('quiz');
            soundEffects.playStrokeChime();
          }}
          role="tab"
          aria-selected={activeTab === 'quiz'}
        >
          <span>🏆 3. Sage’s Mastery Quiz (परीक्षा)</span>
          <span className="akasa-tab-badge">5 Questions</span>
        </button>
      </div>

      {/* =========================================================================
          TAB 1: POTTER'S WHEEL GAMEPLAY ARENA (AUTO-PLAY & INTERACTIVE MODES)
          ========================================================================= */}
      {activeTab === 'game' && (
        <>
          {/* 🎮 SECTION HERO: GAMING ARENA & RAPID-FIRE ATOMIC COLLISION INTRO */}
          <div className="akasa-game-hero-header">
            <div className="akasa-hero-badge-row">
              <span className="akasa-hero-badge">🎮 INTERACTIVE GAMING SECTION</span>
              <span className="akasa-hero-subtag">Sage Kaṇāda’s Potter’s Wheel Quest (कुलाल-चक्रम्)</span>
            </div>
            <h2 className="akasa-hero-title">
              🏺 Atomic Genesis of 4 Elements ➔ The Potter’s Wheel ➔ All-Pervading Space
            </h2>
            <div className="akasa-interactive-reset-wrap" style={{ marginTop: '0.5rem', marginBottom: '0.65rem', display: 'flex', justifyContent: 'center' }}>
              <button
                type="button"
                className="akasa-stage-reset-btn"
                onClick={handleResetWorkshop}
                title="Reset workshop: Clear wheel and return all Aṇu units to zero"
                style={{ padding: '0.45rem 1.15rem', fontSize: '0.84rem' }}
              >
                🔄 Reset Workshop
              </button>
            </div>
            <p className="akasa-hero-desc">
              Welcome to the ancient Indian atomic physics quest! Watch below how 4 corporeal Tryaṇukas collide and shape a clay pot—revealing that <strong>Space (Ākāśa)</strong> is not an empty nothingness, but the eternal all-pervading medium that holds reality together!
            </p>

            {/* 🚀 RAPID-FIRE COLLISION SHOWCASE AT THE VERY TOP AS INTRODUCTION TO THE GAME */}
            <div className="akasa-hero-canvas-wrap">
              <Akasa2DCollisionCanvas
                potEmerged={potEmerged}
                onRevealSpace={handleRevealSpace}
                audio={audio}
                onRing={() => {
                  audio.playCeramicRing();
                  setRingToast(true);
                  setTimeout(() => setRingToast(false), 2400);
                }}
              />
            </div>

            {/* 🕹️ TWO GAMEPLAY OPTIONS SELECTOR BAR */}
            <div className="akasa-mode-selector-bar">
              <button
                type="button"
                className={`akasa-mode-btn${gameExperienceMode === 'autoplay' ? ' is-active' : ''}`}
                onClick={() => {
                  setGameExperienceMode('autoplay');
                  soundEffects.playStrokeChime();
                }}
              >
                <span className="akasa-mode-icon">🎬</span>
                <div className="akasa-mode-text">
                  <div className="akasa-mode-name">Option 1: Auto Play Story (Video Mode)</div>
                  <div className="akasa-mode-sub">Sit back: watch the game, cartoon dialogues &amp; sounds play out automatically</div>
                </div>
                <span className="akasa-mode-chip">{gameExperienceMode === 'autoplay' ? '✓ ACTIVE' : 'WATCH'}</span>
              </button>

              <button
                type="button"
                className={`akasa-mode-btn${gameExperienceMode === 'interactive' ? ' is-active' : ''}`}
                onClick={() => {
                  setGameExperienceMode('interactive');
                  soundEffects.playPuzzleSnap();
                }}
              >
                <span className="akasa-mode-icon">🕹️</span>
                <div className="akasa-mode-text">
                  <div className="akasa-mode-name">Option 2: Hands-On Interactive Game</div>
                  <div className="akasa-mode-sub">Manual quest: click atoms, forge Tryaṇukas &amp; spin the potter’s wheel yourself</div>
                </div>
                <span className="akasa-mode-chip">{gameExperienceMode === 'interactive' ? '✓ ACTIVE' : 'PLAY'}</span>
              </button>
            </div>
          </div>

          {/* 🎬 MODE 1: AUTO PLAY MOVIE WALKTHROUGH */}
          {gameExperienceMode === 'autoplay' && (
            <AkasaAutoPlayMovie
              onSwitchToInteractive={() => {
                setGameExperienceMode('interactive');
                soundEffects.playPuzzleSnap();
              }}
              onRingPot={() => {
                audio.playCeramicRing();
                setRingToast(true);
                setTimeout(() => setRingToast(false), 2400);
              }}
            />
          )}

          {/* 🕹️ MODE 2: HANDS-ON INTERACTIVE GAME (MANUAL 2-PAGE WORKSHOP) */}
          {gameExperienceMode === 'interactive' && (
            <>
              {/* TOP 2-STEP PAGE SWITCHER BAR */}
              <div className="akasa-phase-stepper-bar" role="navigation" aria-label="Game Phases">
            <button
              type="button"
              className={`akasa-phase-step-btn${gamePhase === 1 ? ' is-active' : ''}`}
              onClick={() => {
                setGamePhase(1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              title="Page 1: Phase 1 — Atomic Genesis Workshop"
            >
              <span className="akasa-phase-step-indicator">१</span>
              <div className="akasa-phase-step-info">
                <span className="akasa-phase-step-title">चरण १ · Page 1: Atomic Genesis (परमाणु-सृष्टिः)</span>
                <span className="akasa-phase-step-sub">Forge 4 Corporeal Tryaṇukas (Earth, Water, Fire, Air)</span>
              </div>
              <span className="akasa-phase-step-badge">
                {allFourReady ? '✓ 4/4 Ready' : `Stage ${activeSlotNumber} of 5`}
              </span>
            </button>

            <span className="akasa-phase-step-connector" aria-hidden="true">➔</span>

            <button
              type="button"
              className={`akasa-phase-step-btn is-p2${gamePhase === 2 ? ' is-active' : ''}${!allFourReady ? ' is-locked' : ''}`}
              onClick={() => {
                if (allFourReady) {
                  handleProceedToPhase2();
                }
              }}
              title={
                !allFourReady
                  ? '🔒 Phase 2 Locked: Complete all 5 Stages in Phase 1 first'
                  : "Go to Phase 2: Potter's Wheel"
              }
            >
              <span className="akasa-phase-step-indicator">२</span>
              <div className="akasa-phase-step-info">
                <span className="akasa-phase-step-title">चरण २ · Page 2: Potter’s Wheel (कुलाल-चक्रम्)</span>
                <span className="akasa-phase-step-sub">
                  {allFourReady ? '4 Elements into Wheel ➔ Reveal 5th Space ➔ Pot Complete' : '🔒 Locked (Complete Phase 1 first)'}
                </span>
              </div>
              <span className="akasa-phase-step-badge">
                {potEmerged
                  ? '🏺 Pot Complete'
                  : allFourReady
                  ? `${elementsInWheel}/4 Elements`
                  : '🔒 Locked'}
              </span>
            </button>
          </div>

          {/* =====================================================================
              PAGE 1: PHASE 1 — 4 CORPOREAL TRYAṆUKA ATOMIC GENESIS WORKSHOP
              ===================================================================== */}
          {gamePhase === 1 && (
            <div className="akasa-phase1-container">
              {/* SECTION TITLE: THE ELEMENTS (PAÑCABHŪTAS) */}
              <div className="akasa-build-pot-section-header" style={{ marginBottom: '0.85rem' }}>
                <div className="akasa-build-pot-title-badge">
                  <span className="akasa-build-pot-icon">⚛️</span>
                  <h3 className="akasa-build-pot-heading">The Elements (Pañcabhūtas · पञ्चभूतानि)</h3>
                </div>
                <p className="akasa-build-pot-subtitle">
                  Atomic Genesis: Combine 2 Paramāṇus into Dyads ➔ 3 Dyads form 1 Tryaṇuka
                </p>
              </div>

              {/* CONCISE WORKSHOP STAGE SUMMARY & JUMP ANCHOR */}
              <div className="akasa-phase1-compact-header" id="akasa-forge-area">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <span style={{ fontSize: '1.15rem' }}>🎯</span>
                    <strong style={{ color: '#fef08a', fontSize: '0.88rem' }}>
                      {allFourReady
                        ? '✓ All 4 Elements Mastered! Proceed to Phase 2: Potter’s Wheel below'
                        : `Phase 1 · Stage ${activeSlotNumber} of 4: Forge ${slots[activeSlotNumber - 1]?.dev} (${slots[activeSlotNumber - 1]?.en})`}
                    </strong>
                  </div>
                  <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                    Bond 2 Paramāṇus into Dyads · 3 Dyads (6 Atoms) form 1 Tryaṇuka
                  </span>
                </div>
              </div>


              {/* PHASE 1 DISCUSSION: TRIGGERED ONCE 4 CORPOREAL TRYAṆUKAS ARE FORGED */}
              {allFourReady && (
                <div className="akasa-space-discussion-card" role="region" aria-label="Discussion on the Role of Space">
                  <div className="akasa-space-discussion-header">
                    <span className="akasa-space-discussion-badge">🌌 चरण ५ · Phase 1 Discussion: The Mystery of Space (आकाश-विमर्शः)</span>
                    <span className="akasa-space-discussion-tag">Why Only 4 Corporeal Tryaṇukas?</span>
                  </div>

                  <div className="akasa-comic-panel-frame is-bodhi">
                    <div className="akasa-comic-speaker-col">
                      <BodhiAvatar size={42} />
                      <span className="akasa-comic-speaker-tag is-bodhi">Bodhi</span>
                    </div>
                    <div className="akasa-space-dialogue-row is-bodhi">
                      <div className="akasa-space-speech">
                        <strong style={{ color: '#38bdf8' }}>🧑‍🎓 शिष्यः बोधिः · Bodhi (The Inquirer):</strong>
                        <p style={{ color: '#f8fafc' }}>
                          "Gurudeva! We have forged all 4 corporeal Tryaṇukas: Earth (🪨), Water (💧), Fire (🔥), and Air (💨). But where is the 5th Tryaṇuka for Space (Ākāśa)? Why can’t we build a Tryaṇuka of space on our atomic workbench?"
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="akasa-comic-panel-frame is-kanada">
                    <div className="akasa-comic-speaker-col">
                      <KanadaGuruAvatar size={42} />
                      <span className="akasa-comic-speaker-tag is-kanada">Kaṇāda</span>
                    </div>
                    <div className="akasa-space-dialogue-row is-kanada">
                      <div className="akasa-space-speech">
                        <strong style={{ color: '#facc15' }}>🧘‍♂️ महर्षिः कणादः · Sage Kaṇāda (Vaiśeṣika Pioneer):</strong>
                        <p style={{ color: '#fef08a' }}>
                          "वत्स बोधे! Know this supreme truth of Vaiśeṣika physics: Earth, Water, Fire, and Air are <em>Mūrta</em> (corporeal substances) that have atomic parts (Paramāṇus) and form Dvyaṇukas and Tryaṇukas. But <strong>Ākāśa (Space) is Vibhu (all-pervading), Eka (one), and Niravayava (partless)!</strong> It has no atomic particles. You cannot forge space, because space already contains the entire universe! Now, let us proceed to Phase 2: the Potter's Wheel!"
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="akasa-space-discussion-action">
                    <button
                      type="button"
                      className="akasa-proceed-to-potter-btn"
                      onClick={handleProceedToPhase2}
                    >
                      🏺 All 5 Stages Achieved! Move on to Phase 2: Build the Pot at the Potter's Wheel ➔
                    </button>
                  </div>
                </div>
              )}

              {/* 4 FULL-WIDTH CORPOREAL ELEMENT CARDS */}
              <div className="akasa-phase1-elements-grid">
                {slots.map((s) => {
                  const isSlotLocked = s.slotNumber > activeSlotNumber;
                  const isSlotActive = s.slotNumber === activeSlotNumber;
                  return (
                    <div
                      key={s.slotNumber}
                      id={`akasa-element-slot-${s.slotNumber}`}
                      className={`akasa-phase1-element-card${s.isReady ? ' is-ready' : ''}${isSlotLocked ? ' is-locked' : ''}${isSlotActive ? ' is-active' : ''}`}
                      style={{ borderColor: s.isReady ? '#10b981' : isSlotActive ? s.border : undefined }}
                    >
                      {/* CARD TOP BAR */}
                      <div className="akasa-p1-card-top">
                        <div className="akasa-p1-header-left">
                          <span className="akasa-p1-num-badge">#{s.slotNumber}</span>
                          <span className="akasa-p1-element-title">
                            {s.icon} {s.dev} ({s.en})
                          </span>
                          <span className="akasa-p1-role-badge" style={{ color: s.border, borderColor: s.border }}>
                            {s.roleDev} · {s.roleEn}
                          </span>
                        </div>
                        <span className="akasa-p1-status-pill" style={{ color: s.isReady ? '#10b981' : s.border }}>
                          {s.isReady
                            ? '🌟 Tryaṇuka Ready'
                            : isSlotLocked
                            ? `🔒 Locked (Do #${s.slotNumber - 1} First)`
                            : `${s.count / 2}/3 Dvyaṇukas`}
                        </span>
                      </div>

                      {/* PART A: LIVE ATOMIC FORGE VISUALIZER & ACTIONS ROW */}
                      <div className="akasa-p1-forge-container">
                        <AnuVisualForge slot={s} />

                        {/* Sparkle Fusion Toast */}
                        {activeFusionFx?.slotNumber === s.slotNumber && (
                          <div className="akasa-fusion-sparkle-toast">
                            ✨ Aṇu Fusion Active! +2 Paramāṇu units [परमाणू] bonded ➔ {activeFusionFx.count / 2} Dvyaṇuka(s) formed ✨
                          </div>
                        )}

                        {/* ACTION BUTTONS ROW (PROMINENT & SPACIOUS) */}
                        <div className="akasa-p1-actions-row">
                          {!s.isReady ? (
                            <button
                              type="button"
                              className={`akasa-p1-forge-btn${isSlotActive ? ' is-active-step' : ''}`}
                              onClick={() => handleForgeSlot(s.slotNumber)}
                              disabled={isSlotLocked}
                              title={
                                isSlotLocked
                                  ? `Complete Element #${s.slotNumber - 1} first`
                                  : s.count === 0
                                  ? 'Combine 2 Paramāṇu units into Dvyaṇuka #1 [द्व्यणुकम् #१]'
                                  : s.count === 2
                                  ? 'Combine 2 Paramāṇu units into Dvyaṇuka #2 [द्व्यणुकम् #२]'
                                  : 'Bond Dvyaṇuka #3 to complete Tryaṇuka [त्र्यणुकम्]'
                              }
                            >
                              {isSlotLocked ? (
                                <>
                                  <span className="akasa-forge-locked-icon">🔒</span>
                                  <span>Locked: Complete #{s.slotNumber - 1} First</span>
                                </>
                              ) : (
                                <>
                                  <span className="akasa-forge-finger-icon" aria-hidden="true">👉</span>
                                  <span className="akasa-click-here-badge">CLICK {s.count / 2 + 1} OF 3</span>
                                  <span className="akasa-forge-btn-label">
                                    {s.count === 0
                                      ? 'Combine 2 Paramāṇus ➔ Dyad #1 [द्व्यणुकम् #१]'
                                      : s.count === 2
                                      ? 'Combine 2 Paramāṇus ➔ Dyad #2 [द्व्यणुकम् #२]'
                                      : 'Bond Dyad #3 ➔ Form Tryaṇuka [त्र्यणुकम्]'}
                                  </span>
                                </>
                              )}
                            </button>
                          ) : (
                            <div className="akasa-p1-ready-banner">
                              <span style={{ color: '#86efac', fontWeight: 800 }}>
                                ✓ 100% Tryaṇuka Forged (3 Dyads / 6 Atoms)
                              </span>
                              <span style={{ color: '#93c5fd', fontSize: '0.76rem', fontWeight: 600 }}>
                                {s.slotNumber < 4
                                  ? `Advancing directly to Element #${s.slotNumber + 1} (${slots[s.slotNumber]?.en || ''})...`
                                  : 'All 4 Elements Ready! Proceeding directly to Potter’s Wheel...'}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* PART B: CARTOON STRIP DIALOGUE BALLOONS */}
                      <div className="akasa-p1-dialogue-grid">
                        <div className="akasa-comic-panel-frame is-bodhi">
                          <div className="akasa-comic-speaker-col">
                            <BodhiAvatar size={36} />
                            <span className="akasa-comic-speaker-tag is-bodhi">Bodhi</span>
                          </div>
                          <div className="akasa-step-dialog-box is-bodhi">
                            <div className="akasa-dialog-content">
                              <span className="akasa-dialog-name">🧑‍🎓 शिष्यः बोधिः · Inquirer Question</span>
                              <p className="akasa-dialog-text">"{s.inquiryBodhi}"</p>
                            </div>
                          </div>
                        </div>

                        <div className="akasa-comic-panel-frame is-kanada">
                          <div className="akasa-comic-speaker-col">
                            <KanadaGuruAvatar size={36} />
                            <span className="akasa-comic-speaker-tag is-kanada">Kaṇāda</span>
                          </div>
                          <div className="akasa-step-dialog-box is-kanada">
                            <div className="akasa-dialog-content">
                              <span className="akasa-dialog-name">🧘‍♂️ महर्षिः कणादः · Guru Teaching</span>
                              <p className="akasa-dialog-text">"{s.teachingKanada}"</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* BOTTOM PROCEED BANNER WHEN ALL 4 READY */}
              {allFourReady && (
                <div style={{ textAlign: 'center', marginTop: '1rem', marginBottom: '1rem' }}>
                  <button
                    type="button"
                    className="akasa-proceed-to-potter-btn"
                    style={{ fontSize: '1.05rem', padding: '0.85rem 1.8rem' }}
                    onClick={handleProceedToPhase2}
                  >
                    🏺 All 5 Stages Achieved! Move on to Phase 2: Build the Pot at the Potter's Wheel ➔
                  </button>
                </div>
              )}
            </div>
          )}

          {/* =====================================================================
              PAGE 2: PHASE 2 — SAGE KAṆĀDA'S POTTER’S WHEEL STUDIO
              ===================================================================== */}
          {gamePhase === 2 && (
            <div className="akasa-phase2-container" id="akasa-phase2-container">
              {/* STAGE ACTION TOOLBAR */}
              <div className="akasa-stage-toolbar">
                <div className="akasa-stage-toolbar-left" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    className="akasa-mini-reset-btn"
                    onClick={() => {
                      setGamePhase(1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    title="Return to Phase 1: Atomic Genesis"
                    style={{ background: 'rgba(30, 41, 59, 0.9)', borderColor: '#38bdf8', color: '#7dd3fc' }}
                  >
                    ⬅ Back to Page 1: Atomic Genesis
                  </button>
                  <span className="akasa-stage-wheel-badge">चरण २ · Phase 2: कुलाल-चक्रम् · Potter’s Wheel</span>
                  <span className="akasa-wheel-count-indicator">
                    {elementsInWheel}/4 Atomic Elements Added {spaceRevealed ? '+ 🌌 Space Active (5/5)' : ''}
                  </span>
                </div>

                <div className="akasa-stage-btns-row">
                  <button
                    type="button"
                    className="akasa-stage-reset-btn"
                    onClick={handleResetWorkshop}
                    title="Reset workshop: Clear wheel and return all Aṇu units (अणवः) to zero"
                  >
                    🔄 Reset Workshop
                  </button>
                </div>
              </div>

              {/* SECTION TITLE: BUILD A POT */}
              <div className="akasa-build-pot-section-header">
                <div className="akasa-build-pot-title-badge">
                  <span className="akasa-build-pot-icon">🏺</span>
                  <h3 className="akasa-build-pot-heading">Build a Pot (घट-निर्माणम्)</h3>
                </div>
                <p className="akasa-build-pot-subtitle">
                  Start with clay, mix with water, bake the pot, dry with air... what next?..
                </p>
              </div>

              {/* 5-STEP ASSEMBLY TRAY: START WITH CLAY ➔ MIX WITH WATER ➔ BAKE ➔ DRY ➔ ENCLOSE SPACE */}
              <div className="akasa-p2-tray-row" role="region" aria-label="Build a Pot Assembly Sequence">
                {/* 1. EARTH / CLAY */}
                <div className={`akasa-p2-tray-card${slots[0].isInWheel ? ' is-in-wheel' : ''}${elementsInWheel === 0 ? ' is-next-ready' : ''}`}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'center' }}>
                    <span style={{ fontSize: '1.2rem' }}>🪨</span>
                    <strong style={{ fontSize: '0.85rem', color: '#f8fafc' }}>
                      #1 पृथिवी (Earth)
                    </strong>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>Material Body · Mṛd-piṇḍa</div>
                  {slots[0].isInWheel ? (
                    <button type="button" className="akasa-p2-direct-btn is-done" disabled>
                      ✓ Clay Added
                    </button>
                  ) : elementsInWheel === 0 ? (
                    <button
                      type="button"
                      className="akasa-p2-direct-btn is-active"
                      onClick={() => handleSwipeToWheel(1)}
                      title="Start with clay: place the raw earth mound onto the potter’s wheel"
                    >
                      👉 Start with clay ➔
                    </button>
                  ) : (
                    <button type="button" className="akasa-p2-direct-btn is-disabled" disabled>
                      🔒 Start here
                    </button>
                  )}
                </div>

                {/* 2. WATER */}
                <div className={`akasa-p2-tray-card${slots[1].isInWheel ? ' is-in-wheel' : ''}${elementsInWheel === 1 ? ' is-next-ready' : ''}`}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'center' }}>
                    <span style={{ fontSize: '1.2rem' }}>💧</span>
                    <strong style={{ fontSize: '0.85rem', color: '#f8fafc' }}>
                      #2 आपः (Water)
                    </strong>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>Sneha · Cohesion Binding</div>
                  {slots[1].isInWheel ? (
                    <button type="button" className="akasa-p2-direct-btn is-done" disabled>
                      ✓ Water Mixed
                    </button>
                  ) : elementsInWheel === 1 ? (
                    <button
                      type="button"
                      className="akasa-p2-direct-btn is-active"
                      onClick={() => handleSwipeToWheel(2)}
                      title="Mix with water: lubricate and bind clay atoms into malleable form"
                    >
                      👉 Mix with water ➔
                    </button>
                  ) : (
                    <button type="button" className="akasa-p2-direct-btn is-disabled" disabled>
                      🔒 Add clay first
                    </button>
                  )}
                </div>

                {/* 3. FIRE */}
                <div className={`akasa-p2-tray-card${slots[2].isInWheel ? ' is-in-wheel' : ''}${elementsInWheel === 2 ? ' is-next-ready' : ''}`}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'center' }}>
                    <span style={{ fontSize: '1.2rem' }}>🔥</span>
                    <strong style={{ fontSize: '0.85rem', color: '#f8fafc' }}>
                      #3 तेजः (Fire)
                    </strong>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>Pīlukapāka · Thermal Ceramic</div>
                  {slots[2].isInWheel ? (
                    <button type="button" className="akasa-p2-direct-btn is-done" disabled>
                      ✓ Pot Baked
                    </button>
                  ) : elementsInWheel === 2 ? (
                    <button
                      type="button"
                      className="akasa-p2-direct-btn is-active"
                      onClick={() => handleSwipeToWheel(3)}
                      title="Bake the pot: apply thermal energy to transform raw clay into ceramic"
                    >
                      👉 Bake the pot ➔
                    </button>
                  ) : (
                    <button type="button" className="akasa-p2-direct-btn is-disabled" disabled>
                      🔒 Mix water first
                    </button>
                  )}
                </div>

                {/* 4. AIR */}
                <div className={`akasa-p2-tray-card${slots[3].isInWheel ? ' is-in-wheel' : ''}${elementsInWheel === 3 ? ' is-next-ready' : ''}`}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'center' }}>
                    <span style={{ fontSize: '1.2rem' }}>💨</span>
                    <strong style={{ fontSize: '0.85rem', color: '#f8fafc' }}>
                      #4 वायुः (Air)
                    </strong>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>Vega Motion · Kinetic & Drying</div>
                  {slots[3].isInWheel ? (
                    <button type="button" className="akasa-p2-direct-btn is-done" disabled>
                      ✓ Dried with air
                    </button>
                  ) : elementsInWheel === 3 ? (
                    <button
                      type="button"
                      className="akasa-p2-direct-btn is-active"
                      onClick={() => handleSwipeToWheel(4)}
                      title="Dry with air: spin wheel rapidly and evaporate remaining moisture"
                    >
                      👉 Dry with air ➔
                    </button>
                  ) : (
                    <button type="button" className="akasa-p2-direct-btn is-disabled" disabled>
                      🔒 Bake pot first
                    </button>
                  )}
                </div>

                {/* 5. SPACE (ĀKĀŚA): WHAT NEXT?.. */}
                <div className={`akasa-p2-tray-card${potEmerged ? ' is-in-wheel' : ''}${allFourInWheel && !potEmerged ? ' is-next-ready' : ''}`}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'center' }}>
                    <span style={{ fontSize: '1.2rem' }}>🌌</span>
                    <strong style={{ fontSize: '0.85rem', color: '#f8fafc' }}>
                      #5 आकाशम् (Space)
                    </strong>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>
                    {potEmerged ? 'Ghaṭākāśa Enclosed · Śabda-guṇa' : 'Avakāśa Room · What next?..'}
                  </div>
                  {!allFourInWheel ? (
                    <button type="button" className="akasa-p2-direct-btn is-disabled" disabled>
                      🔒 What next?.. (Dry first)
                    </button>
                  ) : !potEmerged ? (
                    <button
                      type="button"
                      className="akasa-p2-direct-btn is-active"
                      onClick={handleRevealSpace}
                      title="What next?.. Enclose the pre-existing spatial void inside the vessel!"
                    >
                      👉 What next?.. Enclose Space! 🌌
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="akasa-p2-direct-btn is-ring"
                      onClick={() => {
                        audio.playCeramicRing();
                        setRingToast(true);
                        setTimeout(() => setRingToast(false), 2400);
                      }}
                      title="Striking the pot reveals Space through Sound (शब्द-गुणः)!"
                    >
                      <span className="akasa-click-here-badge">👉 CLICK HERE</span>
                      <span style={{ fontSize: '0.72rem', lineHeight: 1.2 }}>
                        Striking the pot reveals Space through Sound (शब्द-गुणः)! 🔔
                      </span>
                    </button>
                  )}
                </div>
              </div>

              {/* GRAND CENTERED POTTER'S WHEEL STAGE */}
              <div className="akasa-stage-container" style={{ position: 'relative', overflow: 'hidden' }}>
                {/* Subtle Starfield & Ambient Ether */}
                <div className="akasa-starfield" aria-hidden="true">
                  {Array.from({ length: 28 }, (_, i) => (
                    <div
                      key={i}
                      className="akasa-star"
                      style={{
                        left: `${(i * 37 + 11) % 94}%`,
                        top: `${(i * 59 + 17) % 90}%`,
                        opacity: 0.25 + ((i * 11) % 40) / 100,
                      }}
                    />
                  ))}
                </div>

                {/* Diagonal Sunbeam */}
                <div className="akasa-sunbeam" aria-hidden="true" />

                {/* Central Target: The Potter's Wheel with Sage Kaṇāda as Master Artisan */}
                <div
                  className="akasa-potter-wheel-stage"
                  onClick={() => {
                    if (potEmerged) return;
                    const currentWheelCount = slots.filter((s) => s.isInWheel).length;
                    const nextSlotNum = currentWheelCount + 1;
                    const nextReady = slots.find((s) => s.slotNumber === nextSlotNum && s.isReady && !s.isInWheel);
                    if (nextReady) handleSwipeToWheel(nextReady.slotNumber);
                  }}
                  title={
                    potEmerged
                      ? "महर्षिः कणादः घटं धारयति · Sage Kaṇāda presents the completed vessel"
                      : "कुलाल-चक्रम् (Potter's Wheel) - Click to direct next ready element into the wheel!"
                  }
                >
                  <GuruArtisanPottersWheel
                    slots={allSlotsForWheel}
                    elementsInWheel={elementsInWheel}
                    potEmerged={potEmerged}
                    speedClass={
                      elementsInWheel >= 4
                        ? 'is-spinning-fast'
                        : elementsInWheel >= 2
                        ? 'is-spinning-medium'
                        : elementsInWheel >= 1
                        ? 'is-spinning-slow'
                        : ''
                    }
                    isSpaceDiscussion={allFourInWheel || potEmerged || elementsInWheel === 5}
                    onRing={() => {
                      audio.playCeramicRing();
                      setRingToast(true);
                      setTimeout(() => setRingToast(false), 2400);
                    }}
                  />
                </div>

                {/* Element Addition Shockwave Impact Animation & Toast */}
                {elementImpact && (
                  <>
                    <div
                      key={`impact-ring-${elementImpact.timestamp}`}
                      className="akasa-impact-ring"
                      style={{ borderColor: elementImpact.color, color: elementImpact.color }}
                    />
                    <div
                      key={`impact-toast-${elementImpact.timestamp}`}
                      className="akasa-impact-toast"
                      style={{ borderColor: elementImpact.color }}
                    >
                      <span>{elementImpact.icon}</span>
                      <span>
                        #{elementImpact.slotNumber} {elementImpact.name} Merged: <strong>{elementImpact.role}</strong>!
                      </span>
                    </div>
                  </>
                )}

                {/* Ringing Sound Toast */}
                {ringToast && (
                  <div className="akasa-impact-toast" style={{ borderColor: '#facc15' }}>
                    <span>🔔</span>
                    <span>
                      <strong>पक्व-घट-ध्वनिः!</strong> Clear musical chime — Pīlukapāka baked every atom!
                    </span>
                  </div>
                )}

                {/* Animated Flying Orb when Swiping */}
                {flyingOrb && (
                  <div
                    className="akasa-flying-orb"
                    style={{
                      left: '50%',
                      top: '48%',
                      color: flyingOrb.color,
                      background: flyingOrb.color,
                    }}
                  >
                    <span>{flyingOrb.icon}</span>
                  </div>
                )}

                {/* Sūtra Role Pop-Up Note Card */}
                {activeNote && (
                  <div className="akasa-role-note-card">
                    <div className="akasa-role-note-header">
                      <span className="akasa-role-note-title">
                        {activeNote.icon} #{activeNote.slotNumber} {activeNote.dev} ({activeNote.en})
                      </span>
                      <span className="akasa-role-note-tag">{activeNote.roleDev}</span>
                    </div>
                    <div className="akasa-role-note-body">{activeNote.explanation}</div>
                  </div>
                )}

                {/* Bottom Corner Ākāśa Chip */}
                <div className="akasa-corner-chip">
                  <div className="akasa-chip-dev">आकाश · ākāśa</div>
                  <div className="akasa-chip-desc">unbroken silent baseplate · holds the wheel</div>
                </div>
              </div>

              {/* SAGE KAṆĀDA & BODHI OBSERVING THE POTTER AT WORK (SEPARATE PHILOSOPHICAL DIALOGUE) */}
              {!allFourInWheel && (
                <div className="akasa-phase2-observing-dialogue-wrap" role="region" aria-label="Kaṇāda and Bodhi Observing Dialogue">
                  <div className="akasa-revelation-header" style={{ marginBottom: '0.65rem' }}>
                    <span className="akasa-revelation-badge">
                      👁️ {WHEEL_STAGE_OBSERVATION_DIALOGUES[elementsInWheel]?.title || WHEEL_STAGE_OBSERVATION_DIALOGUES[0].title}
                    </span>
                    <span className="akasa-revelation-tag">
                      {elementsInWheel === 0
                        ? 'निमित्त-कारणम्'
                        : elementsInWheel === 1
                        ? 'समवायि-कारणम्'
                        : elementsInWheel === 2
                        ? 'असमवायि-कारणम्'
                        : 'पीलुपाक-प्रक्रिया'}
                    </span>
                  </div>

                  <div className="akasa-p1-dialogue-grid">
                    <div className="akasa-comic-panel-frame is-bodhi">
                      <div className="akasa-comic-speaker-col">
                        <BodhiAvatar size={38} />
                        <span className="akasa-comic-speaker-tag is-bodhi">Bodhi</span>
                      </div>
                      <div className="akasa-step-dialog-box is-bodhi">
                        <div className="akasa-dialog-content">
                          <span className="akasa-dialog-name">🧑‍🎓 शिष्यः बोधिः · Observing the Potter</span>
                          <p className="akasa-dialog-text">
                            "{WHEEL_STAGE_OBSERVATION_DIALOGUES[elementsInWheel]?.bodhi || WHEEL_STAGE_OBSERVATION_DIALOGUES[0].bodhi}"
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="akasa-comic-panel-frame is-kanada">
                      <div className="akasa-comic-speaker-col">
                        <KanadaGuruAvatar size={38} />
                        <span className="akasa-comic-speaker-tag is-kanada">Kaṇāda</span>
                      </div>
                      <div className="akasa-step-dialog-box is-kanada">
                        <div className="akasa-dialog-content">
                          <span className="akasa-dialog-name">🧘‍♂️ महर्षिः कणादः · Vaiśeṣika Physics &amp; Causality</span>
                          <p className="akasa-dialog-text">
                            "{WHEEL_STAGE_OBSERVATION_DIALOGUES[elementsInWheel]?.kanada || WHEEL_STAGE_OBSERVATION_DIALOGUES[0].kanada}"
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PHASE 2 CLIMAX REVELATION: STUDENT ASKS HOW TO ADD 5TH ELEMENT, POTTER EXPLAINS SPACE */}
              {allFourInWheel && !potEmerged && (
                <div className="akasa-space-revelation-card" role="region" aria-label="The 5th Element Space Revelation">
                  <div className="akasa-revelation-header">
                    <span className="akasa-revelation-badge">🌌 चरण २ चरमोत्कर्षः · Phase 2 Climax: The 5th Element Revelation</span>
                    <span className="akasa-revelation-tag">घटाकाश बनाम महाकाश</span>
                  </div>

                  <div className="akasa-comic-panel-frame is-bodhi">
                    <div className="akasa-comic-speaker-col">
                      <BodhiAvatar size={42} />
                      <span className="akasa-comic-speaker-tag is-bodhi">Bodhi</span>
                    </div>
                    <div className="akasa-space-dialogue-row is-bodhi">
                      <div className="akasa-space-speech">
                        <strong style={{ color: '#38bdf8' }}>🧑‍🎓 शिष्यः बोधिः · Bodhi (The Inquirer):</strong>
                        <p style={{ color: '#f8fafc', fontWeight: 600 }}>
                          "Gurudeva! Earth (🪨), Water (💧), Fire (🔥), and Air (💨) are all swirling on the wheel. But <strong>how are we going to add the 5th element—Space (Ākāśa)?</strong> We don’t have a 5th Tryaṇuka to drop in!"
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="akasa-comic-panel-frame is-kanada">
                    <div className="akasa-comic-speaker-col">
                      <KanadaGuruAvatar size={42} />
                      <span className="akasa-comic-speaker-tag is-kanada">Kaṇāda</span>
                    </div>
                    <div className="akasa-space-dialogue-row is-kanada">
                      <div className="akasa-space-speech">
                        <strong style={{ color: '#facc15' }}>🧘‍♂️ महर्षिः कणादः · Sage Kaṇāda (The Master):</strong>
                        <p style={{ color: '#fef08a' }}>
                          "वत्स! The potter does not 'add' Space from the outside! <strong>Ākāśa is all-pervading (सर्वगतम्):</strong><br />
                          • It is <em>inside the pot</em> (घटाकाश).<br />
                          • It is <em>outside the pot</em> (महाकाश).<br />
                          • It was here <em>before the pot was shaped</em>.<br />
                          • It will remain here <em>after the pot is broken!</em><br />
                          By shaping the 4 atomic walls around emptiness, we simply reveal the hollow room (Avakāśa) so the pot can hold water and grain! Space was already here, is here now, and will always be here!"
                        </p>
                        <div className="akasa-space-gesture-hint">
                          <span className="akasa-gesture-hint-icon">👇</span>
                          <span>
                            <strong>Click ▶️ Play Below:</strong> Watch how physical matter (Earth ➔ Water ➔ Fire ➔ Air) shapes the clay pot walls around all-pervading <strong>Space (Ākāśa)</strong>!
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2D Collision Canvas: Rapid-Fire Tryaṇukas Morphing the Clay Pot */}
                  <Akasa2DCollisionCanvas
                    potEmerged={potEmerged}
                    onRevealSpace={handleRevealSpace}
                    audio={audio}
                    onRing={() => {
                      audio.playCeramicRing();
                      setRingToast(true);
                      setTimeout(() => setRingToast(false), 2400);
                    }}
                  />

                  <button
                    type="button"
                    className="akasa-reveal-space-btn"
                    onClick={handleRevealSpace}
                    title="Reveal the all-pervading internal cavity of space to complete the pot!"
                  >
                    <span className="akasa-reveal-space-sparkle">✨</span>
                    <span>🌌 Reveal All-Pervading Space (घटाकाश-सिद्धिः) ➔ Complete the Pot!</span>
                    <span className="akasa-reveal-space-sparkle">✨</span>
                  </button>
                </div>
              )}

              {/* ================================================================= */}
            {/* POT EMERGENCE CLIMAX: ANIMATED SHIFT OF FOCUS TO SPACE DISCUSSION */}
            {/* ================================================================= */}
            {potEmerged && (
              <div
                id="akasa-space-discussion-pot-focus"
                className={`akasa-space-discussion-focus${spaceFocusPulse ? ' is-pulsing' : ''}`}
                role="region"
                aria-label="The Supreme Realization of Space in the Completed Pot"
              >
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.65rem', borderBottom: '1.5px solid rgba(56, 189, 248, 0.25)', paddingBottom: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{ fontSize: '1.8rem', filter: 'drop-shadow(0 0 10px #38bdf8)' }}>🌌</span>
                    <div>
                      <h3 style={{ margin: 0, color: '#f8fafc', fontSize: '1.2rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span>घटाकाश-रहस्यम् · The Supreme Realization of Space</span>
                        <span style={{ fontSize: '0.74rem', background: '#38bdf8', color: '#0f172a', padding: '0.15rem 0.55rem', borderRadius: '999px', fontWeight: 800 }}>
                          5th Element Mastered!
                        </span>
                      </h3>
                      <p style={{ margin: '0.2rem 0 0', color: '#93c5fd', fontSize: '0.82rem' }}>
                        The 4 corporeal elements formed the clay boundary — but eternal <strong>Ākāśa (Space)</strong> gives the pot its hollow soul!
                      </p>
                      <div className="akasa-space-gesture-hint" style={{ marginTop: '0.45rem', padding: '0.35rem 0.65rem' }}>
                        <span className="akasa-gesture-hint-icon">🔬</span>
                        <span>
                          <strong>The Supreme Space Revelation:</strong> Observe the 2D Collision Canvas below — <strong>घटाकाश (Ghaṭākāśa)</strong> radiates inside the hollow vessel, while <strong>महाकाश (Mahākāśa)</strong> envelopes the entire cosmos. Space was never created or divided; matter merely sculpted the boundary!
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Acoustic Ring Test Button */}
                  <button
                    type="button"
                    className="akasa-step-act-btn is-gold"
                    style={{ margin: 0, padding: '0.55rem 1.1rem', fontSize: '0.84rem', fontWeight: 800, boxShadow: '0 0 16px rgba(250, 204, 21, 0.4)' }}
                    onClick={() => {
                      audio.playCeramicRing();
                      setRingToast(true);
                      setTimeout(() => setRingToast(false), 2400);
                    }}
                    title="While other 4 elements are known by their activity, Ākāśa is known solely by its effect: Sound!"
                  >
                    🔔 Strike Pot: Hear the Voice of Space (शब्द-गुणः)
                  </button>
                </div>

                {/* Integrated 2D Collision Canvas in Completed State with Dual Ghaṭākāśa & Mahākāśa Highlights */}
                <Akasa2DCollisionCanvas
                  potEmerged={potEmerged}
                  onRevealSpace={handleRevealSpace}
                  audio={audio}
                  onRing={() => {
                    audio.playCeramicRing();
                    setRingToast(true);
                    setTimeout(() => setRingToast(false), 2400);
                  }}
                />

                {/* THE 4 PILLARS OF GHAṬĀKĀŚA CARDS */}
                <div className="akasa-ghatakasa-grid">
                  <div className="akasa-ghatakasa-card">
                    <span className="akasa-ghatakasa-icon">🏺</span>
                    <strong className="akasa-ghatakasa-title">घटाकाश · Pot-Space (Inner Void)</strong>
                    <p className="akasa-ghatakasa-desc">
                      The space inside the vessel. The potter did not manufacture space; the clay walls merely enclosed a portion of pre-existing emptiness!
                    </p>
                  </div>

                  <div className="akasa-ghatakasa-card">
                    <span className="akasa-ghatakasa-icon">🌌</span>
                    <strong className="akasa-ghatakasa-title">महाकाश · Cosmic Ether (Outer Space)</strong>
                    <p className="akasa-ghatakasa-desc">
                      The vast unbounded space outside. Is Ghaṭākāśa separate from Mahākāśa? No! The separation is only an apparent illusion of the clay wall.
                    </p>
                  </div>

                  <div className="akasa-ghatakasa-card">
                    <span className="akasa-ghatakasa-icon">⏳</span>
                    <strong className="akasa-ghatakasa-title">नित्यत्वम् · Before, During &amp; After</strong>
                    <p className="akasa-ghatakasa-desc">
                      Space was here before the clay was dug. Space is here now. When the pot eventually shatters, space does not die—it remains indivisible (Niravayava).
                    </p>
                  </div>

                  <div className="akasa-ghatakasa-card">
                    <span className="akasa-ghatakasa-icon">💧</span>
                    <strong className="akasa-ghatakasa-title">अवकाश-प्रदानम् · The Gift of Capacity</strong>
                    <p className="akasa-ghatakasa-desc">
                      Earth gave mass, water gave cohesion, fire baked ceramic hardness, and air spun momentum. But without Space’s hollow cavity (Avakāśa), the pot cannot hold water or grain!
                    </p>
                  </div>
                </div>

                {/* Bodhi and Kaṇāda Climactic Dialogue */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div className="akasa-comic-panel-frame is-bodhi">
                    <div className="akasa-comic-speaker-col">
                      <BodhiAvatar size={42} />
                      <span className="akasa-comic-speaker-tag is-bodhi">Bodhi</span>
                    </div>
                    <div className="akasa-space-dialogue-row is-bodhi">
                      <div className="akasa-space-speech">
                        <strong style={{ color: '#38bdf8' }}>🧑‍🎓 शिष्यः बोधिः · Bodhi (Realization Awakened):</strong>
                        <p style={{ color: '#f8fafc', fontWeight: 600 }}>
                          "Gurudeva! Now the truth shines with blinding clarity! We spent all our energy forging Earth, Water, Fire, and Air. But the entire purpose of the pot is the <strong>emptiness inside</strong>! We did not create Space—we merely sculpted a boundary around it!"
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="akasa-comic-panel-frame is-kanada">
                    <div className="akasa-comic-speaker-col">
                      <KanadaGuruAvatar size={42} />
                      <span className="akasa-comic-speaker-tag is-kanada">Kaṇāda</span>
                    </div>
                    <div className="akasa-space-dialogue-row is-kanada">
                      <div className="akasa-space-speech">
                        <strong style={{ color: '#facc15' }}>🧘‍♂️ महर्षिः कणादः · Sage Kaṇāda (The Master):</strong>
                        <p style={{ color: '#fef08a' }}>
                          "साधु वत्स बोधे! You have mastered the heart of Vaiśeṣika ontology! <em>Ākāśa is Vibhu (all-pervading), Eka (one), and Niravayava (partless).</em> When you strike this baked vessel, the musical tone you hear is <strong>Śabda (Sound)</strong>—the unique signature quality that proves Space exists! All 5 elements now rest in perfect, harmonious creation."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(148, 163, 184, 0.2)' }}>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                    🎉 All 5 Stages Completed · Earth, Water, Fire, Air &amp; Space fully harmonized!
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      className="akasa-step-act-btn"
                      style={{ margin: 0, padding: '0.5rem 1rem', background: 'rgba(30, 41, 59, 0.8)' }}
                      onClick={handleResetWorkshop}
                      title="Reset workshop to craft another pot"
                    >
                      🔄 Reset &amp; Make Another Pot
                    </button>
                    <button
                      type="button"
                      className="akasa-step-act-btn is-primary"
                      style={{ margin: 0, padding: '0.5rem 1.1rem', fontWeight: 800 }}
                      onClick={() => setActiveTab('quiz')}
                    >
                      🏆 Take Sage Kaṇāda’s Mastery Quiz ➔
                    </button>
                    {onNextStation && (
                      <button
                        type="button"
                        className="akasa-step-act-btn"
                        style={{
                          margin: 0,
                          padding: '0.5rem 1.1rem',
                          fontWeight: 800,
                          background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                          border: '1px solid #38bdf8',
                          color: '#ffffff',
                          boxShadow: '0 0 12px rgba(56, 189, 248, 0.35)',
                        }}
                        onClick={onNextStation}
                      >
                        Next Station: 🧪 Guṇa Matrix ➔
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* DIALOGUE CHRONICLE COMIC STRIP (UNDERNEATH THE WHEEL ON PAGE 2) */}
              <div className="akasa-comic-chronicle" style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '12px', border: '1px solid rgba(148, 163, 184, 0.2)', padding: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', borderBottom: '1px solid rgba(148, 163, 184, 0.15)', paddingBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ fontSize: '1.1rem' }}>📜</span>
                    <strong style={{ color: '#f8fafc', fontSize: '0.9rem' }}>संवाद-माला · Bodhi &amp; Kaṇāda Dialogue Chronicle</strong>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Live Cartoon Strip</span>
                </div>

                <div
                  ref={comicScrollRef}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.65rem',
                    maxHeight: '260px',
                    overflowY: 'auto',
                    paddingRight: '0.4rem',
                  }}
                >
                  {comicStrip.map((panel) => {
                    const isBodhi = panel.speaker === 'Bodhi';
                    const isKanada = panel.speaker === 'Kaṇāda';
                    return (
                      <div
                        key={panel.id}
                        className="akasa-comic-panel-frame"
                      >
                        <div className="akasa-comic-speaker-col">
                          {isBodhi ? <BodhiAvatar size={34} /> : isKanada ? <KanadaGuruAvatar size={34} /> : <span>❓</span>}
                          <span className={`akasa-comic-speaker-tag ${isBodhi ? 'is-bodhi' : isKanada ? 'is-kanada' : ''}`}>
                            {isBodhi ? 'Bodhi' : isKanada ? 'Kaṇāda' : 'Opponent'}
                          </span>
                        </div>
                        <div className={`akasa-step-dialog-box ${isBodhi ? 'is-bodhi' : isKanada ? 'is-kanada' : ''}`}>
                          <div className="akasa-dialog-content">
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.15rem' }}>
                              <strong style={{ color: isBodhi ? '#7dd3fc' : isKanada ? '#fef08a' : '#d8b4fe' }}>
                                {panel.speaker === 'Bodhi' ? 'शिष्यः बोधिः (Bodhi)' : 'महर्षिः कणादः (Sage Kaṇāda)'}
                              </strong>
                              <span style={{ fontSize: '0.66rem', color: '#94a3b8' }}>{panel.time}</span>
                            </div>
                            <div style={{ color: '#e2e8f0', lineHeight: 1.45 }}>{panel.text}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  )}

      {/* =========================================================================
          TAB 2: ILLUSTRATED AUDIO SLIDESHOW (कार्य-कारण-सम्बन्धः)
          Full In-Depth Content in Interactive Slide Presentation with Audio Narration
          ========================================================================= */}
      {activeTab === 'relationships' && (
        <AkasaPhilosophySlideshow
          onReturnToGame={() => setActiveTab('game')}
          onTakeQuiz={() => setActiveTab('quiz')}
        />
      )}

      {/* =========================================================================
          TAB 3: SAGE'S MASTERY QUIZ
          ========================================================================= */}
      {activeTab === 'quiz' && (
        <div className="akasa-quiz-tab-view">
          {!quizFinished ? (
            <div className="akasa-quiz-card-box">
              <div className="akasa-quiz-header-row">
                <span className="akasa-quiz-title">🏆 Sage Kaṇāda’s Philosophical Trial</span>
                <span className="akasa-quiz-prog-pill">Question {quizIndex + 1} of {QUIZ_QUESTIONS.length}</span>
              </div>

              <div className="akasa-quiz-question-text">
                {QUIZ_QUESTIONS[quizIndex].question}
              </div>

              <div className="akasa-quiz-options-grid">
                {QUIZ_QUESTIONS[quizIndex].options.map((opt, idx) => {
                  const isChosen = selectedChoice === idx;
                  const isCorrect = idx === QUIZ_QUESTIONS[quizIndex].correctIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      className={`akasa-quiz-option-btn${
                        isAnswered ? (isCorrect ? ' is-correct' : isChosen ? ' is-wrong' : '') : ''
                      }`}
                      onClick={() => handleAnswerQuiz(idx)}
                      disabled={isAnswered}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <div className="akasa-quiz-feedback-box">
                  <div style={{ fontWeight: 800, color: selectedChoice === QUIZ_QUESTIONS[quizIndex].correctIndex ? '#34d399' : '#fca5a5', marginBottom: '0.2rem' }}>
                    {selectedChoice === QUIZ_QUESTIONS[quizIndex].correctIndex ? '✓ Correct Insight!' : '✗ Rethink the Cause!'}
                  </div>
                  <div style={{ color: '#e2e8f0' }}>{QUIZ_QUESTIONS[quizIndex].explanation}</div>
                  <div style={{ fontStyle: 'italic', color: '#facc15', marginTop: '0.4rem', fontSize: '0.74rem' }}>
                    Kaṇāda: &ldquo;{QUIZ_QUESTIONS[quizIndex].kanadaQuote}&rdquo;
                  </div>

                  <button
                    type="button"
                    className="akasa-step-act-btn is-gold"
                    style={{ marginTop: '0.8rem', width: 'auto' }}
                    onClick={handleNextQuizQuestion}
                  >
                    {quizIndex < QUIZ_QUESTIONS.length - 1 ? 'Next Question ➔' : 'Complete Trial ➔'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="akasa-quiz-honor-card">
              <span style={{ fontSize: '3.2rem', lineHeight: 1 }}>🏆</span>
              <h3 style={{ margin: 0, color: '#facc15', fontSize: '1.25rem' }}>
                कुलाल-विद्या-प्रवीणः · Master of Causality
              </h3>
              <p style={{ margin: 0, color: '#e2e8f0', fontSize: '0.86rem' }}>
                You scored <strong>{quizScore} out of {QUIZ_QUESTIONS.length}</strong>! You have grasped the Vaiśeṣika synthesis of atomic physics, material causality, and inseparable inherence.
              </p>

              <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button
                  type="button"
                  className="akasa-step-act-btn is-primary"
                  style={{ width: 'auto', padding: '0.5rem 1.2rem' }}
                  onClick={handleRestartQuiz}
                >
                  🔄 Retake Quiz
                </button>
                <button
                  type="button"
                  className="akasa-step-act-btn is-gold"
                  style={{ width: 'auto', padding: '0.5rem 1.2rem' }}
                  onClick={() => setActiveTab('game')}
                >
                  🎮 Return to Potter’s Wheel
                </button>
                {onNextStation && (
                  <button
                    type="button"
                    className="akasa-step-act-btn"
                    style={{
                      width: 'auto',
                      padding: '0.5rem 1.2rem',
                      fontWeight: 800,
                      background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                      border: '1px solid #38bdf8',
                      color: '#ffffff',
                      boxShadow: '0 0 12px rgba(56, 189, 248, 0.35)',
                    }}
                    onClick={onNextStation}
                  >
                    Next Station: 🧪 Guṇa Matrix ➔
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
