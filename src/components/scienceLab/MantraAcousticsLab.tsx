import React, { useState, useRef, useEffect, useCallback } from 'react';
import { BodhiLabAnecdote, TermPanel, ChallengeList, type LabTerm, type LabChallenge, type LabSegmentProps } from './common';
import { soundEffects } from '../../utils/soundEffects';
import '../../styles/science-lab.css';

// ---------------------------------------------------------------------------
// DATA: Saptak vs. Solfège Frequencies & Animal Resonances (Sāma Veda)
// ---------------------------------------------------------------------------
interface SvaraNote {
  svara: string;
  dev: string;
  name: string;
  solfege: string;
  ratio: string;
  ratioVal: number;
  freq: number;
  cents: number;
  animal: string;
  animalDev: string;
  color: string;
}

const SVARAS: SvaraNote[] = [
  { svara: 'Sa', dev: 'षड्जः (सा)', name: 'Ṣaḍja', solfege: 'Do', ratio: '1/1', ratioVal: 1.0, freq: 240, cents: 0, animal: "Peacock's Cry", animalDev: 'मयूरः', color: '#818cf8' },
  { svara: 'Re', dev: 'ऋषभः (रे)', name: 'Ṛṣabha', solfege: 'Re', ratio: '9/8', ratioVal: 1.125, freq: 270, cents: 204, animal: 'Bull / Skylark', animalDev: 'वृषभः / चातकः', color: '#38bdf8' },
  { svara: 'Ga', dev: 'गान्धारः (ग)', name: 'Gāndhāra', solfege: 'Mi', ratio: '5/4', ratioVal: 1.25, freq: 300, cents: 386, animal: 'Bleating of a Goat', animalDev: 'अजा', color: '#2dd4bf' },
  { svara: 'Ma', dev: 'मध्यमः (म)', name: 'Madhyama', solfege: 'Fa', ratio: '4/3', ratioVal: 1.333, freq: 320, cents: 498, animal: "Heron / Crane's Call", animalDev: 'क्रौञ्चः', color: '#34d399' },
  { svara: 'Pa', dev: 'पञ्चमः (प)', name: 'Pañcama', solfege: 'Sol', ratio: '3/2', ratioVal: 1.5, freq: 360, cents: 702, animal: 'Cuckoo / Koel Song', animalDev: 'कोकिलः', color: '#fbbf24' },
  { svara: 'Dha', dev: 'धैवतः (ध)', name: 'Dhaivata', solfege: 'La', ratio: '5/3', ratioVal: 1.667, freq: 400, cents: 884, animal: 'Neigh of a Horse', animalDev: 'अश्वः', color: '#fb923c' },
  { svara: 'Ni', dev: 'निषादः (नि)', name: 'Niṣāda', solfege: 'Ti', ratio: '15/8', ratioVal: 1.875, freq: 450, cents: 1088, animal: "Trumpet of an Elephant", animalDev: 'गजः', color: '#f43f5e' },
  { svara: "Sa'", dev: 'तार-षड्जः (सां)', name: 'Tāra Ṣaḍja', solfege: 'Do (High)', ratio: '2/1', ratioVal: 2.0, freq: 480, cents: 1200, animal: 'Higher Octave Resonance', animalDev: 'नाद-पूर्णता', color: '#c084fc' },
];

const MANTRA_TERMS: LabTerm[] = [
  {
    dev: 'सप्तकम्',
    iast: 'Saptakam',
    en: 'Seven-Note Scale (Sa, Re, Ga, Ma, Pa, Dha, Ni)',
    note: 'The natural harmonic series mapped in the Sāma Veda millennia before the European Solfège (Do-Re-Mi).',
  },
  {
    dev: 'छन्दः',
    iast: 'Chandaḥ',
    en: 'Metrical Science of Syllabic Rhythm & Duration',
    note: 'One of the six Vedāṅgas. Quantifies exact time units: Laghu (1 mātrā) and Guru (2 mātrās).',
  },
  {
    dev: 'उदात्तः · अनुदात्तः · स्वरितः',
    iast: 'Udātta · Anudātta · Svarita',
    en: 'Three Vedic Pitch Accents (High, Low, Falling)',
    note: 'Decouples duration from pitch, turning human vocal cords into a multi-dimensional string instrument.',
  },
  {
    dev: 'चमकम्',
    iast: 'Chamakam',
    en: 'Vedic Mathematical Mantra (Taittirīya Saṃhitā 4.7)',
    note: 'Section 18 encrypts odd progressions (1 to 33) and even progressions (4 to 48), generating perfect squares through summation.',
  },
  {
    dev: 'सन्धिः',
    iast: 'Sandhiḥ',
    en: 'Phonetic Syllabic Wave Synthesis',
    note: 'Operates like strict wave mechanics: adjacent acoustic frequencies combine algorithmically to eliminate dissonance.',
  },
  {
    dev: 'नादब्रह्म',
    iast: 'Nāda-Brahma',
    en: 'The Universe as Sound / Acoustic Vibrational Field',
    note: 'Vedic cosmological premise that physical matter is standing wave geometry created by universal vibration.',
  },
];

const MANTRA_CHALLENGES: LabChallenge[] = [
  {
    q: 'Why did ancient India and Europe land on identical 7-note musical scales (Saptak and Solfège)?',
    options: [
      'It was a coincidence of arbitrary folklore labels.',
      'A plucked string naturally splits into fixed mathematical fractions (1/2, 1/3, 1/4, 1/5, 1/7) in the harmonic series of matter.',
      'One King decreed the notes across the ancient world.',
      'It was dictated by atmospheric barometric pressure.',
    ],
    answer: 1,
    explain: 'Both civilizations discovered an immutable property of vibrating matter: the physical harmonic series.',
  },
  {
    q: 'How does Sanskrit metric science (Chandas) physically impact human breathing and resonance?',
    options: [
      'It makes all syllables identical in length without breath control.',
      'Long syllables (Guru = 2 beats) force controlled deep breathing, directly activating chest and nasal resonance.',
      'It silences the vocal cords completely.',
      'It replaces consonants with clicks.',
    ],
    answer: 1,
    explain: 'Guru syllables (2 mātrās) demand prolonged expiration, driving thoracic pressure and cranial nasal resonance.',
  },
  {
    q: 'What mathematical phenomenon is encoded in the 18th section of the Chamakam chant?',
    options: [
      'The golden ratio multiplied by Pi.',
      'Odd progression (1 to 33) whose cumulative sums generate the sequence of perfect squares (1, 4, 9, 16, 25...).',
      'The circumference of the lunar orbit.',
      'Pythagorean prime numbers only.',
    ],
    answer: 1,
    explain: 'Summing consecutive odd numbers in Chamakam 18 systematically yields 1, 4, 9, 16, 25, 36, ... N².',
  },
  {
    q: 'Why does Sandhi (grammar of syllable joining) resemble wave mechanics rather than arbitrary spelling?',
    options: [
      'Words can crash into each other with random discordant clicks.',
      'If high and low acoustic waves collide at word boundaries, they mathematically combine into a harmonious new wave.',
      'It exists only in written manuscripts, not oral chanting.',
      'It deletes all vowels from speech.',
    ],
    answer: 1,
    explain: 'Sandhi acts as an acoustic wave synthesis algorithm, preventing acoustic interference and frequency distortion.',
  },
];

// Web Audio API single-tone player
const playNoteTone = (freq: number) => {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Smooth envelope attack and decay
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.85);
  } catch {
    /* ignore if audio context blocked */
  }
};

export const MantraAcousticsLab: React.FC<LabSegmentProps> = ({ onNextLab }) => {
  const [activeTab, setActiveTab] = useState<'part1' | 'part2' | 'part3'>('part1');
  const [selectedNote, setSelectedNote] = useState<number>(0);
  const [animTick, setAnimTick] = useState<number>(0);

  // Part 2: Chandas & Svara composer states
  const [syllableType, setSyllableType] = useState<'laghu' | 'guru'>('guru');
  const [svaraAccent, setSvaraAccent] = useState<'udatta' | 'anudatta' | 'svarita'>('udatta');

  // Part 3: Chamakam Sequence Slider (N = 1 to 17)
  const [chamakamN, setChamakamN] = useState<number>(5);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 60fps animation loop
  useEffect(() => {
    let frameId: number;
    const loop = () => {
      setAnimTick((t) => (t + 1) % 3600);
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const handlePlaySvara = useCallback((idx: number) => {
    soundEffects.playStrokeChime();
    setSelectedNote(idx);
    playNoteTone(SVARAS[idx].freq);
  }, []);

  const currentSvara = SVARAS[selectedNote];

  // Dynamic canvas oscilloscope renderer for the 3 acoustic engines
  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    if (!ctx) return;

    const w = cvs.width;
    const h = cvs.height;
    ctx.clearRect(0, 0, w, h);

    // Subtle dark blueprint grid
    ctx.strokeStyle = 'rgba(244, 114, 182, 0.08)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    const midY = h / 2;
    const t = animTick * 0.05;

    if (activeTab === 'part1') {
      // PART 1 CANVAS: Plucked string harmonic division and standing waves
      const n = selectedNote + 1;
      const freq = currentSvara.freq;

      // Draw Plucked String Baseline with nodes
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(40, midY);
      ctx.lineTo(w - 40, midY);
      ctx.stroke();

      // Draw Standing Wave Loop
      ctx.strokeStyle = currentSvara.color;
      ctx.lineWidth = 3;
      ctx.shadowColor = currentSvara.color;
      ctx.shadowBlur = 12;
      ctx.beginPath();

      const span = w - 80;
      for (let px = 0; px <= span; px++) {
        const xCoord = 40 + px;
        const normX = px / span;
        // Standing wave formula: sin(n * pi * x) * cos(omega * t)
        const envelope = Math.sin(normX * Math.PI * n);
        const yOffset = envelope * Math.cos(t * (freq / 80)) * 55;
        const py = midY - yOffset;
        if (px === 0) ctx.moveTo(xCoord, py);
        else ctx.lineTo(xCoord, py);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw Harmonic Nodes (Points of zero displacement)
      for (let i = 0; i <= n; i++) {
        const nodeX = 40 + (i / n) * span;
        ctx.fillStyle = '#fde047';
        ctx.beginPath();
        ctx.arc(nodeX, midY, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = '#f472b6';
      ctx.font = '11px JetBrains Mono, monospace';
      ctx.fillText(`Saptak Harmonic: ${currentSvara.svara} (${currentSvara.name}) · Freq: ${freq} Hz // Ratio: ${currentSvara.ratio}`, 15, h - 15);
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`Animal Resonance: ${currentSvara.animal} (${currentSvara.animalDev})`, 15, 20);
    } else if (activeTab === 'part2') {
      // PART 2 CANVAS: Chandas & Svara Decoupled 2D Wave Generator
      const isGuru = syllableType === 'guru';
      const durationLength = isGuru ? 240 : 120;
      const pitchShift = svaraAccent === 'udatta' ? -40 : svaraAccent === 'anudatta' ? 40 : 0;

      // Draw Accent Guideline
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(30, midY + pitchShift);
      ctx.lineTo(w - 30, midY + pitchShift);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Dynamic Syllable Acoustic Waveform
      ctx.strokeStyle = isGuru ? '#ec4899' : '#38bdf8';
      ctx.lineWidth = isGuru ? 3.5 : 2.5;
      ctx.shadowColor = isGuru ? '#ec4899' : '#38bdf8';
      ctx.shadowBlur = 10;
      ctx.beginPath();

      const startX = (w - durationLength) / 2;
      for (let px = 0; px <= durationLength; px++) {
        const xCoord = startX + px;
        const phase = (px / durationLength) * Math.PI * (isGuru ? 8 : 4) - t * 3;
        let glide = pitchShift;
        if (svaraAccent === 'svarita') {
          // Falling glide tone from high to low
          glide = -35 + (px / durationLength) * 70;
        }
        const py = midY + glide + Math.sin(phase) * (isGuru ? 36 : 22);
        if (px === 0) ctx.moveTo(xCoord, py);
        else ctx.lineTo(xCoord, py);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Boundary brackets for duration
      ctx.strokeStyle = '#fde047';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(startX, midY - 60); ctx.lineTo(startX, midY + 60);
      ctx.moveTo(startX + durationLength, midY - 60); ctx.lineTo(startX + durationLength, midY + 60);
      ctx.stroke();

      ctx.fillStyle = '#f472b6';
      ctx.font = '11px JetBrains Mono, monospace';
      ctx.fillText(`Chandas Duration: ${isGuru ? 'GURU (2 Mātrās · Deep Chest/Nasal Breath)' : 'LAGHU (1 Mātrā · Standard Breath)'}`, 15, h - 25);
      ctx.fillText(`Pitch Accent: ${svaraAccent.toUpperCase()} (${svaraAccent === 'udatta' ? 'High / Raised' : svaraAccent === 'anudatta' ? 'Low / Lowered' : 'Falling / Glide'})`, 15, h - 10);
    } else {
      // PART 3 CANVAS: The Chamakam Section 18 Geometric Square Expansion
      const n = chamakamN;
      const squareSize = n * 14;
      const startX = (w - squareSize) / 2;
      const startY = (h - squareSize) / 2 - 10;

      // Draw concentric odd-number layers (gnomons) forming the perfect square
      for (let k = 1; k <= n; k++) {
        const curSize = k * 14;
        ctx.strokeStyle = k === n ? '#f59e0b' : 'rgba(56, 189, 248, 0.4)';
        ctx.lineWidth = k === n ? 2.5 : 1.5;
        ctx.strokeRect(startX, startY, curSize, curSize);

        // Fill current outer odd gnomon layer
        if (k === n) {
          ctx.fillStyle = 'rgba(245, 158, 11, 0.15)';
          ctx.fillRect(startX, startY, curSize, curSize);
        }
      }

      // Sum of odds formula calculation
      const sumOdds = n * n;
      const currentOdd = 2 * n - 1;

      ctx.fillStyle = '#fde047';
      ctx.font = '12px JetBrains Mono, monospace';
      ctx.fillText(`Chamakam Progression Step N = ${n}: Layer Odd Number = ${currentOdd}`, 15, h - 30);
      ctx.fillText(`Cumulative Sum: 1 + 3 + ... + ${currentOdd} = ${sumOdds} = ${n}² (Perfect Square!)`, 15, h - 12);
    }
  }, [activeTab, selectedNote, currentSvara, syllableType, svaraAccent, chamakamN, animTick]);

  return (
    <div className="vl-sim vl-mantra-sim" data-testid="mantra-acoustics-root">
      {/* 1. Bodhi Lab Anecdote */}
      <BodhiLabAnecdote
        title="Pāṇinīya Śikṣā, Chandaḥ & The Chamakam Acoustic Code"
        sanskritTitle="मन्त्र-ध्वनि-विज्ञानम् · नादब्रह्म-दर्शनम्"
        mood="scholar"
        sutra={{
          dev: 'उदात्तो निषादगान्धारौ नीचावृषभधैवतौ ।\nशेषास्तु स्वरिता ज्ञेयाः षड्जमध्यमपञ्चमाः ॥\nउच्चैरुदात्तः । नीचैरनुदात्तः । समाहारः स्वरितः ॥',
          iast: 'udātto niṣādagāndhārau nīcāv ṛṣabhadhaivatau |\nśeṣās tu svaritā jñeyāḥ ṣaḍjamadhyamapañcamāḥ ||\nuccair udāttaḥ | nīcair anudāttaḥ | samāhāraḥ svaritaḥ ||',
          source: 'Pāṇinīya Śikṣā (श्लोक १२) & Pāṇini Aṣṭādhyāyī १.२.२९–३१',
          meaning: '“Niṣāda and Gāndhāra arise in high pitch (Udātta); Ṛṣabha and Dhaivata arise in low pitch (Anudātta); Ṣaḍja, Madhyama and Pañcama abide in the harmonic equilibrium of Svarita. A raised tone is Udātta; a lowered tone is Anudātta; their harmonious integration is Svarita.”',
        }}
        anecdote={
          <>
            <p>
              In classical Indian science, speech was not an arbitrary human invention: it was discovered as an empirical law of physical acoustics.
              Centuries before European solfège (Do-Re-Mi) appeared, the <em>Sāma Veda</em> had mapped the universal <strong>Saptak scale</strong>
              (Sa, Re, Ga, Ma, Pa, Dha, Ni), matching each frequency to the vocal cords of animals naturally tuned to nature’s harmonic series.
            </p>
            <p>
              By independently decoupling duration (<em>Laghu</em> vs. <em>Guru</em> in <em>Chandas</em>) from pitch (<em>Udātta</em>, <em>Anudātta</em>, <em>Svarita</em>),
              a Vedic chanter acts as a living acoustic synthesizer, creating dynamic standing wave geometries in the atmosphere.
              And in the sacred <em>Chamakam</em> (Taittirīya Saṃhitā 4.7), an odd-number chanting algorithm systematically generates the progression of perfect mathematical squares!
            </p>
          </>
        }
        epistemologyAndMethod={
          <>
            Vedic phonetics (*Śikṣā*) and metric prosody (*Chandaḥ*) operate as quantitative physics.
            By measuring syllable durations in precise time beats (*Mātrās*) and treating word transitions (*Sandhi*) as wave mechanics,
            ancient scholars preserved sacred oral frequencies intact across thousands of years with zero distortion.
          </>
        }
        modernBridge={{
          ancientConcept: 'The Saptak harmonic series, Chandas mātrā duration, decoupled pitch accents, and Sandhi wave mechanics.',
          modernScience: 'Acoustic physics of standing waves, Fourier harmonic overtones, respiratory bio-feedback resonance, and quantum string vibration.',
          relevanceNote: 'Modern acoustics confirms that vibrating matter naturally splits into fractional harmonics (1/2, 1/3, 1/4...), and respiratory pacing during Vedic chanting synchronizes heart-rate variability and vagal tone.',
        }}
        societalValue={
          <p>
            Recognizing speech as sacred acoustic science fostered profound reverence for vocal hygiene, mindful articulation,
            and respiratory health. In the Gurukul tradition, language was practiced as an active bridge uniting the biological nervous system
            with the mathematical fabric of the cosmos (*Nāda-Brahma*).
          </p>
        }
      />

      {/* 2. Interactive Navigation Tabs for the 3 Parts */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        <button
          type="button"
          className={`vl-btn vl-btn--cyber${activeTab === 'part1' ? ' is-active' : ''}`}
          style={{
            fontSize: '0.82rem',
            padding: '0.5rem 1rem',
            background: activeTab === 'part1' ? 'linear-gradient(135deg, #ec4899, #8b5cf6)' : 'rgba(15,23,42,0.8)',
            color: activeTab === 'part1' ? '#ffffff' : '#f472b6',
            borderColor: 'rgba(236,72,153,0.4)',
          }}
          onClick={() => { soundEffects.playStrokeChime(); setActiveTab('part1'); }}
        >
          🎵 PART 1: The Accidental Symphony &amp; Saptak
        </button>
        <button
          type="button"
          className={`vl-btn vl-btn--cyber${activeTab === 'part2' ? ' is-active' : ''}`}
          style={{
            fontSize: '0.82rem',
            padding: '0.5rem 1rem',
            background: activeTab === 'part2' ? 'linear-gradient(135deg, #0284c7, #38bdf8)' : 'rgba(15,23,42,0.8)',
            color: activeTab === 'part2' ? '#030712' : '#38bdf8',
            borderColor: 'rgba(56,189,248,0.4)',
          }}
          onClick={() => { soundEffects.playStrokeChime(); setActiveTab('part2'); }}
        >
          🌬️ PART 2: The Physics of Prose &amp; Chandas
        </button>
        <button
          type="button"
          className={`vl-btn vl-btn--cyber${activeTab === 'part3' ? ' is-active' : ''}`}
          style={{
            fontSize: '0.82rem',
            padding: '0.5rem 1rem',
            background: activeTab === 'part3' ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'rgba(15,23,42,0.8)',
            color: activeTab === 'part3' ? '#030712' : '#f59e0b',
            borderColor: 'rgba(245,158,11,0.4)',
          }}
          onClick={() => { soundEffects.playStrokeChime(); setActiveTab('part3'); }}
        >
          🔢 PART 3: The Chamakam Code &amp; Nāda Brahma
        </button>
      </div>

      {/* 3. Interactive Simulation Sandbox Canvas */}
      <div className="vl-panel" style={{ background: 'rgba(15,23,42,0.95)', border: '1.5px solid rgba(236,72,153,0.35)', borderRadius: '16px', padding: '1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.72rem', fontFamily: 'JetBrains Mono, monospace', color: '#f472b6', fontWeight: 800 }}>
              <span className="vl-hud-blink">●</span> 60 FPS ACOUSTIC WAVE LABORATORY // REAL-TIME SYNTHESIZER
            </div>
            <h3 style={{ margin: '0.2rem 0 0', fontSize: '1.2rem', color: '#f8fafc', fontWeight: 800 }}>
              {activeTab === 'part1' && 'Harmonic String Splitter · Saptak vs. Solfège'}
              {activeTab === 'part2' && 'Chandas Mātrā & Decoupled Svara Waveform'}
              {activeTab === 'part3' && 'Chamakam Section 18 · Sum-of-Odds Square Generator'}
            </h3>
          </div>
          <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem', borderRadius: '6px', background: 'rgba(236,72,153,0.15)', color: '#f472b6', fontWeight: 700, border: '1px solid rgba(236,72,153,0.3)' }}>
            Nāda Oscillator Active
          </span>
        </div>

        {/* Sandbox Canvas */}
        <div style={{ background: '#030712', borderRadius: '12px', border: '1px solid rgba(236,72,153,0.3)', padding: '0.75rem', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1rem' }}>
          <canvas
            ref={canvasRef}
            width={720}
            height={220}
            style={{ width: '100%', maxWidth: '720px', height: '220px', background: 'radial-gradient(circle at center, #110d1c 0%, #030712 100%)', borderRadius: '8px' }}
          />
        </div>

        {/* Interactive Controls based on Active Tab */}
        {activeTab === 'part1' && (
          <div>
            <div style={{ fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace', color: '#94a3b8', marginBottom: '0.5rem', fontWeight: 700 }}>
              🎹 SELECT A SVARA TO PLUCK &amp; HEAR FREQUENCY RATIO:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.5rem' }}>
              {SVARAS.map((sn, idx) => (
                <button
                  key={sn.svara}
                  type="button"
                  className={`vl-btn vl-btn--cyber${selectedNote === idx ? ' is-active' : ''}`}
                  style={{
                    padding: '0.5rem 0.6rem',
                    textAlign: 'left',
                    background: selectedNote === idx ? sn.color : 'rgba(30,41,59,0.7)',
                    color: selectedNote === idx ? '#090e17' : '#f8fafc',
                    borderColor: sn.color,
                  }}
                  onClick={() => handlePlaySvara(idx)}
                >
                  <div style={{ fontWeight: 800, fontSize: '0.92rem' }}>
                    {sn.svara} <small>({sn.solfege})</small>
                  </div>
                  <div style={{ fontSize: '0.7rem', opacity: 0.9 }}>
                    {sn.freq} Hz · {sn.ratio}
                  </div>
                  <div style={{ fontSize: '0.66rem', marginTop: '0.15rem', opacity: 0.85 }}>
                    {sn.animal}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'part2' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', background: 'rgba(30,41,59,0.6)', padding: '1rem', borderRadius: '12px' }}>
            {/* Duration Selector */}
            <div>
              <div style={{ fontSize: '0.74rem', fontFamily: 'JetBrains Mono, monospace', color: '#38bdf8', fontWeight: 800, marginBottom: '0.4rem' }}>
                1. CHANDAS DURATION (MĀTRĀ / BEATS)
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  type="button"
                  className={`vl-btn vl-btn--cyber${syllableType === 'laghu' ? ' is-active' : ''}`}
                  style={{ flex: 1, fontSize: '0.78rem' }}
                  onClick={() => { soundEffects.playStrokeChime(); setSyllableType('laghu'); }}
                >
                  Laghu (। = 1 Beat)
                </button>
                <button
                  type="button"
                  className={`vl-btn vl-btn--cyber${syllableType === 'guru' ? ' is-active' : ''}`}
                  style={{ flex: 1, fontSize: '0.78rem' }}
                  onClick={() => { soundEffects.playStrokeChime(); setSyllableType('guru'); }}
                >
                  Guru (ऽ = 2 Beats)
                </button>
              </div>
              <p style={{ margin: '0.4rem 0 0', fontSize: '0.78rem', color: '#cbd5e1' }}>
                {syllableType === 'guru' ? 'Forces controlled diaphragm retention, activating chest & nasal resonance.' : 'Standard single-mātrā rhythmic utterance.'}
              </p>
            </div>

            {/* Pitch Accent Selector */}
            <div>
              <div style={{ fontSize: '0.74rem', fontFamily: 'JetBrains Mono, monospace', color: '#f472b6', fontWeight: 800, marginBottom: '0.4rem' }}>
                2. INDEPENDENT PITCH ACCENT (SVARA)
              </div>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <button
                  type="button"
                  className={`vl-btn vl-btn--cyber${svaraAccent === 'udatta' ? ' is-active' : ''}`}
                  style={{ flex: 1, fontSize: '0.72rem' }}
                  onClick={() => { soundEffects.playStrokeChime(); setSvaraAccent('udatta'); }}
                >
                  Udātta (High ॑)
                </button>
                <button
                  type="button"
                  className={`vl-btn vl-btn--cyber${svaraAccent === 'anudatta' ? ' is-active' : ''}`}
                  style={{ flex: 1, fontSize: '0.72rem' }}
                  onClick={() => { soundEffects.playStrokeChime(); setSvaraAccent('anudatta'); }}
                >
                  Anudātta (Low ॒)
                </button>
                <button
                  type="button"
                  className={`vl-btn vl-btn--cyber${svaraAccent === 'svarita' ? ' is-active' : ''}`}
                  style={{ flex: 1, fontSize: '0.72rem' }}
                  onClick={() => { soundEffects.playStrokeChime(); setSvaraAccent('svarita'); }}
                >
                  Svarita (Falling ᳘)
                </button>
              </div>
              <p style={{ margin: '0.4rem 0 0', fontSize: '0.78rem', color: '#cbd5e1' }}>
                Duration and pitch are decoupled independently: varying tension independently of stroke length!
              </p>
            </div>
          </div>
        )}

        {activeTab === 'part3' && (
          <div style={{ background: 'rgba(30,41,59,0.6)', padding: '1rem', borderRadius: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <div style={{ fontSize: '0.74rem', fontFamily: 'JetBrains Mono, monospace', color: '#f59e0b', fontWeight: 800 }}>
                CHAMAKAM SECTION 18 ODD SEQUENCE COUNTER (N = {chamakamN})
              </div>
              <div style={{ fontSize: '0.85rem', color: '#fde047', fontWeight: 800 }}>
                Sum = {chamakamN * chamakamN} ({chamakamN}²)
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="17"
              value={chamakamN}
              onChange={(e) => { soundEffects.playStrokeChime(); setChamakamN(Number(e.target.value)); }}
              style={{ width: '100%', accentColor: '#f59e0b' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94a3b8', fontFamily: 'JetBrains Mono, monospace', marginTop: '0.25rem' }}>
              <span>N = 1 (Ekā ca me · 1)</span>
              <span>N = 5 (Navadaśa ca me · 25)</span>
              <span>N = 17 (Trayastriṃśac ca me · 289)</span>
            </div>
          </div>
        )}
      </div>

      {/* 4. Complete Curated Article: All Three Parts */}
      <div className="vl-panel" style={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(148,163,184,0.25)', borderRadius: '16px', padding: '1.75rem', marginBottom: '1.5rem' }}>
        
        {/* ================================================================= */}
        {/* PART 1: THE ACCIDENTAL SYMPHONY                                  */}
        {/* ================================================================= */}
        <div style={{ marginBottom: '2.5rem', borderBottom: '1px solid rgba(148,163,184,0.2)', paddingBottom: '2rem' }}>
          <div style={{ fontSize: '0.74rem', fontFamily: 'JetBrains Mono, monospace', color: '#ec4899', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            PART 1 // THE ACCIDENTAL SYMPHONY
          </div>
          <h2 style={{ fontSize: '1.6rem', color: '#f8fafc', fontWeight: 900, margin: '0.35rem 0 0.5rem' }}>
            The Language of Matter: When Sound Was Discovered, Not Invented
          </h2>

          <div style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.7 }}>
            <p>
              What if a language wasn’t invented for casual conversation, but discovered like a fundamental law of physics?
            </p>
            <p>
              In most modern histories, language is treated as a social construct—a collection of arbitrary labels and sounds that humans agreed to attach to things over time. But thousands of years ago, ancient Indian scholars approached speech with a radically different premise. They did not invent vocabulary; they mapped sound itself. They tracked how it moves through time, how it carries pitch, and how it mirrors the exact patterns we find in music and the natural world.
            </p>
          </div>

          <h3 style={{ fontSize: '1.25rem', color: '#f472b6', fontWeight: 800, margin: '1.5rem 0 0.6rem' }}>
            The Harmonic Puzzle
          </h3>
          <div style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.7 }}>
            <p>
              This mapping exposes a fascinating historical puzzle. The <strong>Saptak scale</strong>—<em>Sa, Re, Ga, Ma, Pa, Dha, Ni</em>—shows up in India thousands of years before the <em>Do, Re, Mi, Fa, Sol, La, Ti</em> solfège appears in Europe. Here we have two distant civilizations landing on the exact same seven-note structure.
            </p>
            <p>
              How did this happen? Instead of every culture inventing something completely different, they were both uncovering a universal constraint of physical matter. When you pluck any string, it does not vibrate randomly. It splits into mathematical fractions in a fixed, immutable order: halves (1/2), thirds (1/3), quarters (1/4), fifths (1/5), and sevenths (1/7). This is the harmonic series, an intrinsic acoustic property of all vibrating matter.
            </p>
          </div>

          {/* ASCII / Graphical Harmonic Series Card */}
          <div style={{ background: 'rgba(30,41,59,0.7)', borderRadius: '12px', padding: '1.25rem', border: '1px solid rgba(236,72,153,0.3)', margin: '1rem 0' }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.6 }}>
              <div style={{ color: '#f472b6', fontWeight: 800 }}>[ PLUCKED STRING ] ───► Splits into fixed fractions: 1/2, 1/3, 1/4, 1/5, 1/7</div>
              <div style={{ paddingLeft: '9.5rem', color: '#94a3b8' }}>│</div>
              <div style={{ paddingLeft: '9.5rem', color: '#94a3b8' }}>▼</div>
              <div style={{ paddingLeft: '4.5rem', color: '#fde047', fontWeight: 800 }}>[ THE HARMONIC SERIES OF MATTER ]</div>
              <div style={{ paddingLeft: '9.5rem', color: '#94a3b8' }}>│</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ background: 'rgba(15,23,42,0.9)', padding: '0.6rem 0.85rem', borderRadius: '8px', borderLeft: '3px solid #ec4899', flex: 1, minWidth: '220px' }}>
                  <div style={{ color: '#ec4899', fontWeight: 800 }}>[ INDIA: THE SAPTAK ]</div>
                  <div style={{ color: '#f8fafc', marginTop: '0.2rem' }}>Sa, Re, Ga, Ma, Pa, Dha, Ni</div>
                </div>
                <div style={{ background: 'rgba(15,23,42,0.9)', padding: '0.6rem 0.85rem', borderRadius: '8px', borderLeft: '3px solid #38bdf8', flex: 1, minWidth: '220px' }}>
                  <div style={{ color: '#38bdf8', fontWeight: 800 }}>[ EUROPE: SOLFÈGE ]</div>
                  <div style={{ color: '#f8fafc', marginTop: '0.2rem' }}>Do, Re, Mi, Fa, Sol, La, Ti</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.7 }}>
            <p>
              India mapped this cosmic framework first, naming the notes as <em>Svaras</em>, with the <strong>Sāma Veda</strong> meticulously linking each note to a specific sound in nature (such as the peacock's cry for Sa or the elephant's call for Ni). Sages realized that animals were naturally tuning their vocal cords to nature's hard-coded acoustics. Centuries later, this acoustic code traveled through Persian and Arabic hands, eventually reaching European shores where it evolved into the Western musical scale. In the West, Do-Re-Mi became a memory tool for musicians. In India, it remained a physical map of vocal vibrations that bridge the human body, the mind, and the physical world.
            </p>
          </div>
        </div>

        {/* ================================================================= */}
        {/* PART 2: THE PHYSICS OF PROSE                                     */}
        {/* ================================================================= */}
        <div style={{ marginBottom: '2.5rem', borderBottom: '1px solid rgba(148,163,184,0.2)', paddingBottom: '2rem' }}>
          <div style={{ fontSize: '0.74rem', fontFamily: 'JetBrains Mono, monospace', color: '#38bdf8', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            PART 2 // THE PHYSICS OF PROSE
          </div>
          <h2 style={{ fontSize: '1.6rem', color: '#f8fafc', fontWeight: 900, margin: '0.35rem 0 0.5rem' }}>
            The Gurukul System: Acoustic Data vs. Rote Memorization
          </h2>

          <div style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.7 }}>
            <p>
              In much of Western education, various subjects are separated into boxes from an early age. Math is taught here, language there, and science somewhere else—a fragmented structure that limits a holistic approach to learning. The ancient Gurukul model operates on the exact opposite principle. It combines linguistic precision with scientific concepts, using carefully defined vibrations to build a complete picture of information instead of making children memorize isolated, disconnected bits of data.
            </p>
            <p>
              Ultimately, the Gurukul system encourages students to see themselves as part of the natural world, not separate from it. Because the language hard-codes nature's harmonic patterns directly into its grammar and pitch accents, speaking it acts as a physical mirror to reality.
            </p>
          </div>

          <h3 style={{ fontSize: '1.25rem', color: '#38bdf8', fontWeight: 800, margin: '1.5rem 0 0.6rem' }}>
            The Dynamics of Chandas and Akshara
          </h3>
          <div style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.7 }}>
            <p>
              This scientific mapping was built directly into the phonetic mechanics of the language. Through <strong>Chandas</strong>—the ancient science of meter—poetry measures every single syllable in exact units of time. A short syllable (<strong>Laghu</strong>) gets one beat; a long syllable (<strong>Guru</strong>) gets two.
            </p>
            <p>
              This isn't done merely for aesthetic rhythm. Long syllables and heavy consonant clusters force the speaker to control their breath deeply, directly activating chest and nasal resonance. The structure of the language physically shapes how sound moves through your body.
            </p>
          </div>

          {/* Meter Breath Card */}
          <div style={{ background: 'rgba(30,41,59,0.7)', borderRadius: '12px', padding: '1rem', border: '1px solid rgba(56,189,248,0.3)', margin: '1rem 0', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem', color: '#cbd5e1' }}>
            <div style={{ color: '#38bdf8', fontWeight: 800, marginBottom: '0.35rem' }}>
              [ LAGHU SYLLABLE ] ───► 1 Beat ───► Standard Breath
            </div>
            <div style={{ color: '#ec4899', fontWeight: 800 }}>
              [ GURU SYLLABLE ]  ───► 2 Beats ───► Controlled Deep Breath ───► Chest &amp; Nasal Resonance
            </div>
          </div>

          <div style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.7 }}>
            <p>
              Remarkably, Sanskrit deliberately separates duration from pitch. In most languages, a longer syllable naturally causes a speaker to raise their pitch. Here, duration and pitch are decoupled independently through three precise accents:
            </p>
            <ul>
              <li><strong>Udātta (उदात्तः)</strong>: A raised, high tone.</li>
              <li><strong>Anudātta (अनुदात्तः)</strong>: A lowered, low tone.</li>
              <li><strong>Svarita (स्वरितः)</strong>: A falling tone that starts high and drops.</li>
            </ul>
            <p>
              Any combination is possible: a short vowel can be held at a very low pitch, or a long vowel can be sustained at a high pitch. This is exactly how a stringed instrument works—varying the tension (pitch) independently of the stroke length (duration). It is the reason the epic <em>Rāmāyaṇa</em>, originally composed to be sung, can be played note-for-note on a stringed Vīṇā. The <em>Ṛgveda</em> provides the precise pitch accents; the <em>Sāma Veda</em> takes those exact same verses and releases them as pure melody.
            </p>
            <p>
              By treating language and music as a singular art, a speaker is not just conveying text. By controlling pitch and duration, they are actively drawing dynamic wave patterns in the air using nothing but their vocal cords.
            </p>
          </div>
        </div>

        {/* ================================================================= */}
        {/* PART 3: THE UNIVERSAL CORE                                       */}
        {/* ================================================================= */}
        <div>
          <div style={{ fontSize: '0.74rem', fontFamily: 'JetBrains Mono, monospace', color: '#f59e0b', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            PART 3 // THE UNIVERSAL CORE
          </div>
          <h2 style={{ fontSize: '1.6rem', color: '#f8fafc', fontWeight: 900, margin: '0.35rem 0 0.5rem' }}>
            The Chamakam Code: Hard-Coding Mathematics into Wave Mechanics
          </h2>

          <div style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.7 }}>
            <p>
              If language is a map of acoustic physics, then a monumental conclusion inevitably follows: <strong>Mathematics is not an artificial tool we invented to count things. Math is the foundational code of the universe, and sound is the physical medium that carries it.</strong>
            </p>
            <p>
              Nowhere is this realization more clear than in the ancient Vedic mantra known as the <strong>Chamakam</strong>. On the surface, this text narrates a rapid, rhythmic list of essential human needs—praying for food, health, long life, and peace—punctuated by the repeated word <em>Ca me</em> (&quot;and to me&quot;). But hidden deep within its 18th section lies an astonishing mathematical framework: two complete, perfectly ordered numerical Progressions.
            </p>
            <p>
              The first is an odd number sequence running from 1 to 33 (\(1, 3, 5, 7, \dots, 33\)). The second is an even number sequence progressing by fours up to 48 (\(4, 8, 12, 16, \dots, 48\)).
            </p>
          </div>

          {/* Chamakam Progression Card */}
          <div style={{ background: 'rgba(30,41,59,0.7)', borderRadius: '12px', padding: '1.25rem', border: '1px solid rgba(245,158,11,0.3)', margin: '1rem 0', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.82rem', color: '#cbd5e1' }}>
            <div style={{ color: '#fde047', fontWeight: 800, marginBottom: '0.35rem' }}>
              [ CHAMAKAM SECTION 18 ] ───► Odd Sequence:  1, 3, 5, 7 ... 33
            </div>
            <div style={{ color: '#38bdf8', fontWeight: 800, marginBottom: '0.75rem' }}>
              {'                        ───► Even Sequence: 4, 8, 12, 16 ... 48'}
            </div>
            <div style={{ color: '#f8fafc', lineHeight: 1.6 }}>
              By sequentially summing the odd numbers, the acoustic chant systematically generates a progression of perfect squares (\(1, 4, 9, 16, 25 \dots\)):<br />
              • \(1 = \mathbf{1}\) (1²)<br />
              • \(1 + 3 = \mathbf{4}\) (2²)<br />
              • \(1 + 3 + 5 = \mathbf{9}\) (3²)<br />
              • \(1 + 3 + 5 + 7 = \mathbf{16}\) (4²)<br />
              • \(1 + 3 + 5 + 7 + 9 = \mathbf{25}\) (5²)
            </div>
          </div>

          <div style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.7 }}>
            <p>
              In the Vedic worldview, sound and number are completely intertwined. By chanting these specific numbers, the speaker activates the mathematical principles behind structural balance.
            </p>
          </div>

          <h3 style={{ fontSize: '1.25rem', color: '#f59e0b', fontWeight: 800, margin: '1.5rem 0 0.6rem' }}>
            Grammatic Code: Sandhi as Wave Mechanics
          </h3>
          <div style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.7 }}>
            <p>
              To preserve this interlocking matrix of sound and math over millennia without the aid of print, the language&apos;s grammar had to operate with the rigidity of strict computer code. This manifests flawlessly in <strong>Sandhi</strong>—the phonetic rules for combining adjacent syllables.
            </p>
            <p>
              When Sanskrit is spoken, syllables do not crash into each other randomly. Sandhi treats speech like wave mechanics. If a high-frequency acoustic wave meets a low-frequency acoustic wave at the boundary of two words, they must mathematically combine according to rigid linguistic laws to form a perfect, harmonious new syllable.
            </p>
          </div>

          {/* Sandhi Wave Card */}
          <div style={{ background: 'rgba(30,41,59,0.7)', borderRadius: '12px', padding: '1rem', border: '1px solid rgba(16,185,129,0.3)', margin: '1rem 0', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem', color: '#cbd5e1' }}>
            <div style={{ color: '#38bdf8' }}>[ SYLLABLE A ] (High Wave)  ──┐</div>
            <div style={{ color: '#10b981', fontWeight: 800 }}>{'                              ├─► [ SANDHI RULE ] ─► [ NEW SYLLABLE ] (Perfect Wave)'}</div>
            <div style={{ color: '#f59e0b' }}>[ SYLLABLE B ] (Low Wave)   ──┘</div>
          </div>

          <div style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.7 }}>
            <p>
              This strict grammatical programming acts like an encryption algorithm, ensuring that the text remains structurally incorruptible, preserving its frequency down to the exact decibel and millisecond across thousands of generations.
            </p>
          </div>

          <h3 style={{ fontSize: '1.25rem', color: '#f59e0b', fontWeight: 800, margin: '1.5rem 0 0.6rem' }}>
            Nāda Brahma: The Vibrating Universe
          </h3>
          <div style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.7 }}>
            <p>
              In this ancient philosophy, chanting a mantra is not a psychological exercise in symbolic prayer. It is a technological method to tap directly into the underlying source code of creation. Form is what separates one object from another, but the acoustic principle behind each form is what connects them to a single universal manifestation.
            </p>
            <p>
              Form doesn&apos;t just govern macro-cosmic planets and micro-cosmic atoms; it breathes through performance. Every precise mudrā (hand gesture), calculated step, and musical note is localized vibration. When a dancer or musician performs, their expressions become a visual spectacle of wave mechanics, dynamically reflecting the universe&apos;s cosmic activity.
            </p>
            <p style={{ background: 'linear-gradient(135deg, rgba(236,72,153,0.1), rgba(245,158,11,0.1))', padding: '1rem 1.25rem', borderRadius: '10px', borderLeft: '4px solid #ec4899', color: '#f1f5f9', fontWeight: 500 }}>
              This brings us directly to the absolute peak of Vedic cosmology, summed up in a singular phrase: <strong>Nāda Brahma—The world is sound.</strong> Long before modern quantum string theory suggested that subatomic particles are actually tiny, vibrating strings dancing to specific frequencies, the seers of the Gurukul model had already decoded the universe. They recognized that beneath the superficial differences of physical matter, everything is connected to a single universal manifestation—an infinite, cosmic symphony waiting to be spoken.
            </p>
          </div>
        </div>
      </div>

      {/* 5. Sanskrit Terms Panel */}
      <TermPanel terms={MANTRA_TERMS} title="Mantra Acoustics & Wave Terminology" />

      {/* 6. Challenge Questions */}
      <ChallengeList items={MANTRA_CHALLENGES} title="Mantra Acoustics & Physics Challenges" />

      {/* 7. Next Lab Navigation Action */}
      {onNextLab && (
        <div style={{
          marginTop: '2rem',
          padding: '1.25rem',
          borderRadius: '14px',
          background: 'linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,41,59,0.8))',
          border: '1.5px solid rgba(236,72,153,0.35)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div>
            <div style={{ fontSize: '0.72rem', fontFamily: 'JetBrains Mono, monospace', color: '#f472b6', fontWeight: 800 }}>
              <span className="vl-hud-blink">●</span> SECTOR 12 COMPLETE // VIJÑĀNA LAB CYCLE
            </div>
            <h4 style={{ margin: '0.2rem 0 0', fontSize: '1.1rem', color: '#f8fafc', fontWeight: 800 }}>
              Cycle Forward to Sector 01: Paramāṇu Builder
            </h4>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.82rem', color: '#cbd5e1' }}>
              Loop back into the atomic crucible of Kaṇāda and the foundational building blocks of reality!
            </p>
          </div>

          <button
            type="button"
            className="vl-btn vl-btn--cyber"
            onClick={onNextLab}
            style={{
              padding: '0.7rem 1.3rem',
              fontSize: '0.9rem',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #ec4899, #38bdf8)',
              color: '#090e17',
              border: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            <span>ENTER PARAMĀṆU LAB ➔</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default MantraAcousticsLab;
