import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { BodhiWisdomCard } from '../BodhiWisdomCard';
import { TermPanel, ChallengeList, LabNextAction, type LabTerm, type LabChallenge } from './common';
import { soundEffects } from '../../utils/soundEffects';
import '../../styles/science-lab.css';

// ---------------------------------------------------------------------------
// TYPES & DATA
// ---------------------------------------------------------------------------

export type SyllableType = 'laghu' | 'guru';

export interface Syllable {
  id: string;
  type: SyllableType;
}

export interface MeterPreset {
  name: string;
  nameSa: string;
  syllableCount: number;
  pattern: SyllableType[];
  example: string;
  meaning: string;
}

const CLASSICAL_PRESETS: MeterPreset[] = [
  {
    name: 'Anuṣṭubh (Śloka)',
    nameSa: 'अनुष्टुप् (श्लोकः)',
    syllableCount: 8,
    pattern: ['guru', 'guru', 'guru', 'laghu', 'laghu', 'guru', 'laghu', 'guru'],
    example: 'धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः (Dharmakṣetre Kurukṣetre...)',
    meaning: 'The universal 8-syllable quarter-verse meter of the Bhagavad Gītā, Mahābhārata, and Rāmāyaṇa.',
  },
  {
    name: 'Indravajrā',
    nameSa: 'इन्द्रवज्रा',
    syllableCount: 11,
    pattern: ['guru', 'guru', 'laghu', 'guru', 'guru', 'laghu', 'laghu', 'guru', 'laghu', 'guru', 'guru'],
    example: 'माता पिता यस्य च दैवमेव (Mātā pitā yasya ca daivameva...)',
    meaning: 'Royal 11-syllable meter: "Thunderbolt of Indra", opening with two heavy, decisive beats.',
  },
  {
    name: 'Upendravajrā',
    nameSa: 'उपेन्द्रवज्रा',
    syllableCount: 11,
    pattern: ['laghu', 'guru', 'laghu', 'guru', 'guru', 'laghu', 'laghu', 'guru', 'laghu', 'guru', 'guru'],
    example: 'त्वमेव माता च पिता त्वमेव (Tvameva mātā ca pitā tvameva...)',
    meaning: '11-syllable devotional meter identical to Indravajrā except starting on a gentle light syllable (Laghu).',
  },
  {
    name: 'Vaṃśastha',
    nameSa: 'वंशस्थम्',
    syllableCount: 12,
    pattern: ['laghu', 'guru', 'laghu', 'guru', 'guru', 'laghu', 'laghu', 'guru', 'laghu', 'guru', 'laghu', 'guru'],
    example: 'जगत्यधीशे शरणं प्रयाहि (Jagatyadhīśe śaraṇaṃ prayāhi...)',
    meaning: '12-syllable musical meter with undulating alternating light and heavy cadence.',
  },
  {
    name: 'Mālinī',
    nameSa: 'मालिनी',
    syllableCount: 15,
    pattern: ['laghu', 'laghu', 'laghu', 'laghu', 'laghu', 'laghu', 'guru', 'guru', 'guru', 'laghu', 'guru', 'guru', 'laghu', 'guru', 'guru'],
    example: 'सरसिजमनुविद्धं शैवलेनापि रम्यम् (Sarasijamanuviddhaṃ śaivalenāpi ramyam...)',
    meaning: '15-syllable lyrical meter ("The Garland Maker") opening with 6 rapid fluttering light syllables.',
  },
  {
    name: 'Śārdūlavikrīḍita',
    nameSa: 'शार्दूलविक्रीडितम्',
    syllableCount: 19,
    pattern: [
      'guru', 'guru', 'guru', 'laghu', 'laghu', 'guru', 'laghu',
      'guru', 'laghu', 'laghu', 'laghu', 'guru', 'guru', 'guru',
      'laghu', 'guru', 'guru', 'laghu', 'guru'
    ],
    example: 'या कुन्देन्दु-तुषार-हार-धवला या शुभ्र-वस्त्रावृता (Yā kundendu-tuṣāra-hāra-dhavalā...)',
    meaning: 'Grand 19-syllable stately meter ("The Play of the Tiger") used in Sarasvatī Vandanam and classical inscriptions.',
  },
];

// The 8 Canonical Gaṇas (त्रिक-वर्गाः) from Piṅgala
export interface GanaDefinition {
  code: string;
  dev: string;
  iast: string;
  pattern: SyllableType[];
  symbol: string;
  mnemonicWord: string;
}

const GANA_DEFINITIONS: GanaDefinition[] = [
  { code: 'M', dev: 'म-गण', iast: 'Ma-gaṇa', pattern: ['guru', 'guru', 'guru'], symbol: '———', mnemonicWord: 'माता-रा (mātā-rā)' },
  { code: 'Y', dev: 'य-गण', iast: 'Ya-gaṇa', pattern: ['laghu', 'guru', 'guru'], symbol: '•——', mnemonicWord: 'य-मा-ता (ya-mā-tā)' },
  { code: 'R', dev: 'र-गण', iast: 'Ra-gaṇa', pattern: ['guru', 'laghu', 'guru'], symbol: '—•—', mnemonicWord: 'रा-ज-भा (rā-ja-bhā)' },
  { code: 'S', dev: 'स-गण', iast: 'Sa-gaṇa', pattern: ['laghu', 'laghu', 'guru'], symbol: '••—', mnemonicWord: 'स-ल-गा (sa-la-gā)' },
  { code: 'T', dev: 'त-गण', iast: 'Ta-gaṇa', pattern: ['guru', 'guru', 'laghu'], symbol: '——•', mnemonicWord: 'ता-रा-ज (tā-rā-ja)' },
  { code: 'J', dev: 'ज-गण', iast: 'Ja-gaṇa', pattern: ['laghu', 'guru', 'laghu'], symbol: '•—•', mnemonicWord: 'ज-भा-न (ja-bhā-na)' },
  { code: 'B', dev: 'भ-गण', iast: 'Bha-gaṇa', pattern: ['guru', 'laghu', 'laghu'], symbol: '—••', mnemonicWord: 'भा-न-स (bhā-na-sa)' },
  { code: 'N', dev: 'न-गण', iast: 'Na-gaṇa', pattern: ['laghu', 'laghu', 'laghu'], symbol: '•••', mnemonicWord: 'न-स-ल (na-sa-la)' },
];

const CHANDAS_TERMS: LabTerm[] = [
  {
    dev: 'छन्दःशास्त्रम्',
    iast: 'Chandaḥśāstra',
    en: 'Vedic science of poetic meters, rhythm, and combinatorics',
    note: 'Authored by Ācārya Piṅgala (~3rd–2nd c. BCE), formulating binary numbers, binomial coefficients, and combinatorial algorithms.',
  },
  {
    dev: 'प्रस्तारः',
    iast: 'Prastāra',
    en: 'Systematic binary enumeration of all 2ⁿ permutations',
    note: 'Piṅgala’s algorithm generates the complete truth-table of short and long syllables of length n without missing a single combination.',
  },
  {
    dev: 'नष्टम्',
    iast: 'Naṣṭa',
    en: 'Decoding algorithm: finding meter form given its rank number',
    note: 'Repeated halving rule: "If even, write Laghu and divide by 2; if odd, write Guru, add 1, and divide by 2." The world’s first decimal-to-binary algorithm.',
  },
  {
    dev: 'उद्दिष्टम्',
    iast: 'Uddiṣṭa',
    en: 'Encoding algorithm: finding rank number given a meter sequence',
    note: 'Binary-to-decimal decoding: write powers of 2 under Guru syllables, sum them, and add 1.',
  },
  {
    dev: 'मेरुप्रस्तारः',
    iast: 'Meruprastāra',
    en: 'The Staircase of Mount Meru (Binomial Triangle / Pascal’s Triangle)',
    note: 'Commentator Halāyudha quotes: "Pare pūrṇam iti" (In the next row, full... sum the two numbers above to the left and right). Anticipated Blaise Pascal by 1,800 years.',
  },
  {
    dev: 'मात्रामेरू',
    iast: 'Mātrāmeru',
    en: 'The Fibonacci Sequence generated through poetic morae / duration',
    note: 'Pioneered by Gopāla, Hemacandra, and Virahāṅka: the number of meters of duration m mātrās obeys M(m) = M(m-1) + M(m-2).',
  },
  {
    dev: 'लघु च गुरु च',
    iast: 'Laghu & Guru',
    en: 'Light (1 beat / 0) and Heavy (2 beats / 1) binary prosodic states',
    note: 'Laghu is 1 mātrā (short vowel); Guru is 2 mātrās (long vowel or short vowel followed by conjunct consonants / anusvāra).',
  },
  {
    dev: 'यमाता-राज-भान-सलगा',
    iast: 'Yamātārājabhānasalagā',
    en: 'Master mnemonic for the 8 canonical 3-syllable Gaṇas',
    note: 'A circular combinatorial shift register where every overlapping trio of syllables spells out one of the 8 canonical metric trios.',
  },
];

const CHANDAS_CHALLENGES: LabChallenge[] = [
  {
    q: 'How did Ācārya Piṅgala represent binary states in the Chandaḥśāstra?',
    options: [
      'Through plus and minus signs',
      'Through Laghu (light, 1 mātrā) and Guru (heavy, 2 mātrās)',
      'Through Roman numerals',
    ],
    answer: 1,
    explain: 'Piṅgala established Laghu (short, ˘) and Guru (long, –) as the fundamental binary alphabet of poetic combinations.',
  },
  {
    q: 'What is Piṅgala’s Naṣṭa (नष्टम्) algorithm in modern computational terms?',
    options: [
      'A continuous fast Fourier transform',
      'Integer-to-binary decoding via repeated division by 2',
      'A sorting algorithm for Sanskrit dictionary entries',
    ],
    answer: 1,
    explain: 'Naṣṭa takes a decimal integer row k and converts it into the exact binary sequence of Laghus and Gurus by dividing by 2.',
  },
  {
    q: 'Why does counting poetic meters by duration (mātrā) produce the Fibonacci numbers?',
    options: [
      'Because every line can end with either a 1-beat Laghu or a 2-beat Guru, yielding M(m) = M(m-1) + M(m-2)',
      'Because poets favored the golden ratio for rhyming couplets',
      'Because Sanskrit meters only use prime numbers',
    ],
    answer: 0,
    explain: 'A meter of length m beats can be formed by appending a 1-beat Laghu to a meter of (m-1) beats or a 2-beat Guru to a meter of (m-2) beats, directly creating the Fibonacci recurrence relation.',
  },
  {
    q: 'What was the civilizational purpose of strict metric structures (Chandas) in ancient India?',
    options: [
      'To enforce royal court censorship',
      'To act as algorithmic checksums and mnemonic error-detection codes for oral transmission',
      'To make recitation difficult for ordinary citizens',
    ],
    answer: 1,
    explain: 'In an oral knowledge society, strict metrical checksums ensured that vast encyclopedias of medicine, astronomy, and mathematics were transmitted for centuries without corrupting a single word.',
  },
];

// Helper: binomial coefficient n choose k
function binomial(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  let c = 1;
  for (let i = 1; i <= k; i++) {
    c = (c * (n - i + 1)) / i;
  }
  return c;
}

// ---------------------------------------------------------------------------
// COMPONENT
// ---------------------------------------------------------------------------

export interface ChandahshastraLabProps {
  onNextLab?: () => void;
}

export const ChandahshastraLab: React.FC<ChandahshastraLabProps> = ({ onNextLab }) => {
  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<'sequencer' | 'prastara' | 'nasta-uddishta' | 'meru' | 'arena'>('sequencer');

  // Tab 1: Sequencer State
  const [syllables, setSyllables] = useState<Syllable[]>([
    { id: 's-1', type: 'guru' },
    { id: 's-2', type: 'guru' },
    { id: 's-3', type: 'guru' },
    { id: 's-4', type: 'laghu' },
    { id: 's-5', type: 'laghu' },
    { id: 's-6', type: 'guru' },
    { id: 's-7', type: 'laghu' },
    { id: 's-8', type: 'guru' },
  ]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeBeatIndex, setActiveBeatIndex] = useState<number | null>(null);

  // Tab 2: Prastara length (2 to 5)
  const [prastaraN, setPrastaraN] = useState<number>(3);
  const [showModernBinary, setShowModernBinary] = useState<boolean>(false);

  // Tab 3: Uddishta & Nasta
  const [uddishtaBits, setUddishtaBits] = useState<SyllableType[]>(['guru', 'laghu', 'guru', 'guru']);
  const [nastaRankInput, setNastaRankInput] = useState<number>(11);
  const [nastaLength, setNastaLength] = useState<number>(4);

  // Tab 4: Meruprastara
  const [meruRows] = useState<number>(6); // rows 0 to 6
  const [selectedMeruCell, setSelectedMeruCell] = useState<{ n: number; k: number } | null>({ n: 4, k: 2 });
  const [matrameraMode, setMatrameraMode] = useState<boolean>(false);

  // Tab 5: Quiz Arena State
  const [quizScore, setQuizScore] = useState<number>(() => {
    try {
      return Number(localStorage.getItem('chandas_quiz_score') || 0);
    } catch {
      return 0;
    }
  });
  const [quizStreak, setQuizStreak] = useState<number>(0);
  const [currentQuizIdx, setCurrentQuizIdx] = useState<number>(0);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Audio helpers using soundEffects engine
  const playSnap = useCallback(() => {
    soundEffects.playPuzzleSnap();
  }, []);

  const playChime = useCallback(() => {
    soundEffects.playCelebrationChime();
  }, []);

  const playClick = useCallback(() => {
    soundEffects.playStrokeChime();
  }, []);

  const playVictory = useCallback(() => {
    soundEffects.playCelebrationChime();
  }, []);

  // Web Audio Context reference
  const audioCtxRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current?.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  // Synthesize acoustic percussion tone
  const playSyllableTone = useCallback((type: SyllableType) => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const isGuru = type === 'guru';
      const freq = isGuru ? 220 : 380; // A3 (220Hz, deep resonance) vs F#4 (380Hz, light tap)
      const duration = isGuru ? 0.32 : 0.15; // 2 beats vs 1 beat

      osc.type = isGuru ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
    } catch {
      /* ignore audio context restrictions */
    }
  }, [getAudioContext]);

  // Sequencer playback
  const playbackTimerRef = useRef<number | null>(null);

  const stopPlayback = useCallback(() => {
    if (playbackTimerRef.current) {
      window.clearTimeout(playbackTimerRef.current);
      playbackTimerRef.current = null;
    }
    setIsPlaying(false);
    setActiveBeatIndex(null);
  }, []);

  const startPlayback = useCallback(() => {
    if (syllables.length === 0) return;
    stopPlayback();
    setIsPlaying(true);

    let idx = 0;
    const playNext = () => {
      if (idx >= syllables.length) {
        stopPlayback();
        return;
      }
      setActiveBeatIndex(idx);
      const syl = syllables[idx];
      playSyllableTone(syl.type);

      const delay = syl.type === 'guru' ? 480 : 260;
      idx += 1;
      playbackTimerRef.current = window.setTimeout(playNext, delay);
    };

    playNext();
  }, [syllables, playSyllableTone, stopPlayback]);

  useEffect(() => {
    return () => {
      stopPlayback();
    };
  }, [stopPlayback]);

  // Sequencer manipulations
  const toggleSyllable = (index: number) => {
    setSyllables((prev) =>
      prev.map((s, i) => (i === index ? { ...s, type: s.type === 'laghu' ? 'guru' : 'laghu' } : s))
    );
    playSyllableTone(syllables[index].type === 'laghu' ? 'guru' : 'laghu');
  };

  const addSyllable = (type: SyllableType) => {
    if (syllables.length >= 24) return;
    setSyllables((prev) => [...prev, { id: `s-${Date.now()}-${prev.length}`, type }]);
    playSyllableTone(type);
  };

  const removeLastSyllable = () => {
    setSyllables((prev) => prev.slice(0, -1));
    playSnap();
  };

  const clearAllSyllables = () => {
    setSyllables([]);
    playSnap();
  };

  const applyPreset = (preset: MeterPreset) => {
    playChime();
    setSyllables(preset.pattern.map((type, i) => ({ id: `s-pre-${i}`, type })));
  };

  // Metrics for current sequencer
  const totalSyllables = syllables.length;
  const totalMatras = syllables.reduce((acc, s) => acc + (s.type === 'guru' ? 2 : 1), 0);
  const totalGurus = syllables.filter((s) => s.type === 'guru').length;
  const totalLaghus = totalSyllables - totalGurus;

  // Identify Tri-Syllable Gaṇas
  const detectedGanas = useMemo(() => {
    const ganas: { gana: GanaDefinition; index: number }[] = [];
    for (let i = 0; i + 2 < syllables.length; i += 3) {
      const trio = [syllables[i].type, syllables[i + 1].type, syllables[i + 2].type];
      const match = GANA_DEFINITIONS.find(
        (g) => g.pattern[0] === trio[0] && g.pattern[1] === trio[1] && g.pattern[2] === trio[2]
      );
      if (match) {
        ganas.push({ gana: match, index: Math.floor(i / 3) + 1 });
      }
    }
    return ganas;
  }, [syllables]);

  // Tab 2: Prastara Combinatorics Table
  const prastaraTable = useMemo(() => {
    const total = 1 << prastaraN; // 2^n
    const rows: { rank: number; pattern: SyllableType[]; binaryStr: string; gurus: number }[] = [];

    for (let r = 0; r < total; r++) {
      const pattern: SyllableType[] = [];
      let temp = r;
      for (let i = 0; i < prastaraN; i++) {
        // Pingala standard: 0 = laghu, 1 = guru
        const bit = temp & 1;
        pattern.push(bit === 1 ? 'guru' : 'laghu');
        temp >>= 1;
      }
      const binaryStr = pattern.map((p) => (p === 'guru' ? '1' : '0')).join('');
      const gurus = pattern.filter((p) => p === 'guru').length;
      rows.push({ rank: r + 1, pattern, binaryStr, gurus });
    }
    return rows;
  }, [prastaraN]);

  // Tab 3: Uddishta Calculation (Pattern -> Decimal Index)
  const uddishtaResult = useMemo(() => {
    let sum = 0;
    const steps: { pos: number; type: SyllableType; powerVal: number; contributes: boolean }[] = [];

    uddishtaBits.forEach((b, idx) => {
      const powerVal = 1 << idx;
      const contributes = b === 'guru';
      if (contributes) sum += powerVal;
      steps.push({ pos: idx + 1, type: b, powerVal, contributes });
    });

    const rank = sum + 1;
    return { steps, sum, rank };
  }, [uddishtaBits]);

  const toggleUddishtaBit = (index: number) => {
    playClick();
    setUddishtaBits((prev) =>
      prev.map((b, i) => (i === index ? (b === 'laghu' ? 'guru' : 'laghu') : b))
    );
  };

  // Tab 3: Nasta Calculation (Decimal Index -> Pattern)
  const nastaSteps = useMemo(() => {
    let val = Math.max(1, Math.min(nastaRankInput, 1 << nastaLength));
    const steps: { stepNum: number; currentVal: number; isEven: boolean; chosen: SyllableType; nextVal: number }[] = [];

    for (let i = 0; i < nastaLength; i++) {
      const isEven = val % 2 === 0;
      if (isEven) {
        const next = val / 2;
        steps.push({ stepNum: i + 1, currentVal: val, isEven: true, chosen: 'laghu', nextVal: next });
        val = next;
      } else {
        const next = (val + 1) / 2;
        steps.push({ stepNum: i + 1, currentVal: val, isEven: false, chosen: 'guru', nextVal: next });
        val = next;
      }
    }
    return steps;
  }, [nastaRankInput, nastaLength]);

  // Tab 4: Meruprastara Pascal & Matramera Fibonacci
  const meruGrid = useMemo(() => {
    const grid: number[][] = [];
    for (let n = 0; n <= meruRows; n++) {
      const row: number[] = [];
      for (let k = 0; k <= n; k++) {
        row.push(binomial(n, k));
      }
      grid.push(row);
    }
    return grid;
  }, [meruRows]);

  // Fibonacci diagonal sums (Mātrāmeru)
  // Diagonal d starts at (d, 0) and moves (d-1, 1), (d-2, 2)...
  const fibonacciDiagonals = useMemo(() => {
    const diagonals: { sum: number; cells: { n: number; k: number }[] }[] = [];
    for (let d = 0; d <= meruRows; d++) {
      const cells: { n: number; k: number }[] = [];
      let sum = 0;
      let r = d;
      let c = 0;
      while (r >= 0 && c <= r) {
        if (r <= meruRows && c <= r) {
          sum += binomial(r, c);
          cells.push({ n: r, k: c });
        }
        r -= 1;
        c += 1;
      }
      diagonals.push({ sum, cells });
    }
    return diagonals;
  }, [meruRows]);

  // Tab 5: Quiz handlers
  const handleAnswerSelect = (optionIdx: number) => {
    if (quizSubmitted) return;
    playClick();
    setSelectedQuizAnswer(optionIdx);
  };

  const handleQuizSubmit = () => {
    if (selectedQuizAnswer === null || quizSubmitted) return;
    setQuizSubmitted(true);

    const q = CHANDAS_CHALLENGES[currentQuizIdx];
    if (selectedQuizAnswer === q.answer) {
      playVictory();
      const updatedScore = quizScore + 25;
      setQuizScore(updatedScore);
      setQuizStreak((s) => s + 1);
      try {
        localStorage.setItem('chandas_quiz_score', String(updatedScore));
      } catch {
        /* ignore */
      }
    } else {
      soundEffects.playEncouragementDing();
      setQuizStreak(0);
    }
  };

  const handleNextQuizQuestion = () => {
    playClick();
    setSelectedQuizAnswer(null);
    setQuizSubmitted(false);
    setCurrentQuizIdx((idx) => (idx + 1) % CHANDAS_CHALLENGES.length);
  };

  return (
    <div className="vl-container" style={{ maxWidth: '1180px', margin: '0 auto', padding: '1rem' }}>
      {/* --------------------------------------------------------------------- */}
      {/* HERO BANNER */}
      {/* --------------------------------------------------------------------- */}
      <header
        style={{
          background: 'linear-gradient(135deg, #18181b 0%, #27272a 50%, #3b0764 100%)',
          borderRadius: '20px',
          padding: '2rem',
          border: '1px solid rgba(192, 132, 252, 0.4)',
          boxShadow: '0 12px 32px rgba(0,0,0,0.4)',
          marginBottom: '1.5rem',
          color: '#f8fafc',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '2rem' }}>🪘</span>
          <span
            style={{
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontSize: '0.82rem',
              fontWeight: 700,
              color: '#c084fc',
              background: 'rgba(192, 132, 252, 0.15)',
              padding: '0.25rem 0.75rem',
              borderRadius: '999px',
              border: '1px solid rgba(192, 132, 252, 0.3)',
            }}
          >
            Chandaḥśāstra Vigyan Lab · SEC-15 · 3rd Century BCE
          </span>
        </div>

        <h1
          style={{
            margin: '0.25rem 0 0.5rem',
            fontSize: '2.1rem',
            fontWeight: 800,
            background: 'linear-gradient(90deg, #f5d0fe, #e879f9, #c084fc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          पिङ्गलस्य छन्दःशास्त्रम् · Combinatorics &amp; Binary Metrics Lab
        </h1>

        <p style={{ margin: '0 0 1rem', fontSize: '0.98rem', color: '#e2e8f0', maxWidth: '860px', lineHeight: 1.6 }}>
          Step into Ācārya Piṅgala’s world-first binary combinatorics framework. Forge Sanskrit meters with acoustic
          <strong> Laghu (•)</strong> and <strong>Guru (—)</strong> beats, decode binary rows with <strong>Naṣṭa &amp; Uddiṣṭa</strong>,
          and ascend the binomial pyramid of <strong>Meruprastāra</strong> (Pascal’s Triangle &amp; Fibonacci Mātrāmeru).
        </p>

        {/* Live Score Strip */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
          <div
            style={{
              background: 'rgba(0,0,0,0.4)',
              padding: '0.5rem 1rem',
              borderRadius: '10px',
              border: '1px solid rgba(192, 132, 252, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span style={{ color: '#e879f9', fontSize: '1.1rem' }}>⚡</span>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#a1a1aa', textTransform: 'uppercase' }}>Metric Length</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#f5d0fe' }}>
                {totalSyllables} Syllables · {totalMatras} Mātrās
              </div>
            </div>
          </div>

          <div
            style={{
              background: 'rgba(0,0,0,0.4)',
              padding: '0.5rem 1rem',
              borderRadius: '10px',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span style={{ color: '#38bdf8', fontSize: '1.1rem' }}>🔢</span>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#a1a1aa', textTransform: 'uppercase' }}>Binary Complexity</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#bae6fd' }}>
                2<sup>{totalSyllables}</sup> = {(1 << Math.min(totalSyllables, 30)).toLocaleString()} Permutations
              </div>
            </div>
          </div>

          <div
            style={{
              background: 'rgba(0,0,0,0.4)',
              padding: '0.5rem 1rem',
              borderRadius: '10px',
              border: '1px solid rgba(234, 179, 8, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span style={{ color: '#facc15', fontSize: '1.1rem' }}>🏆</span>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#a1a1aa', textTransform: 'uppercase' }}>Vidyā Score</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fef08a' }}>
                {quizScore} pts {quizStreak > 1 ? `(🔥 ×${quizStreak})` : ''}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Bodhi Wisdom & Civilizational Context Card */}
      <div style={{ marginBottom: '1.5rem' }}>
        <BodhiWisdomCard gameId="pingala" gameTitle="Piṅgala’s Chandaḥśāstra: Binary Combinatorics & Meruprastāra" />
      </div>

      {/* --------------------------------------------------------------------- */}
      {/* NAVIGATION TABS */}
      {/* --------------------------------------------------------------------- */}
      <nav
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBottom: '1.5rem',
          background: 'rgba(24, 24, 27, 0.8)',
          padding: '0.5rem',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <button
          type="button"
          onClick={() => {
            playClick();
            setActiveTab('sequencer');
          }}
          className={`vl-cat-tab${activeTab === 'sequencer' ? ' is-active' : ''}`}
          style={{ flex: '1 1 auto', minWidth: '150px' }}
        >
          🎵 1. Syllable Sequencer
        </button>
        <button
          type="button"
          onClick={() => {
            playClick();
            setActiveTab('prastara');
          }}
          className={`vl-cat-tab${activeTab === 'prastara' ? ' is-active' : ''}`}
          style={{ flex: '1 1 auto', minWidth: '150px' }}
        >
          🗂️ 2. Prastāra (2ⁿ Truth Table)
        </button>
        <button
          type="button"
          onClick={() => {
            playClick();
            setActiveTab('nasta-uddishta');
          }}
          className={`vl-cat-tab${activeTab === 'nasta-uddishta' ? ' is-active' : ''}`}
          style={{ flex: '1 1 auto', minWidth: '150px' }}
        >
          🧮 3. Naṣṭa &amp; Uddiṣṭa Decoders
        </button>
        <button
          type="button"
          onClick={() => {
            playClick();
            setActiveTab('meru');
          }}
          className={`vl-cat-tab${activeTab === 'meru' ? ' is-active' : ''}`}
          style={{ flex: '1 1 auto', minWidth: '150px' }}
        >
          🏔️ 4. Meruprastāra &amp; Mātrāmeru
        </button>
        <button
          type="button"
          onClick={() => {
            playClick();
            setActiveTab('arena');
          }}
          className={`vl-cat-tab${activeTab === 'arena' ? ' is-active' : ''}`}
          style={{ flex: '1 1 auto', minWidth: '150px' }}
        >
          ⚔️ 5. Chandas Challenge Arena
        </button>
      </nav>

      {/* --------------------------------------------------------------------- */}
      {/* TAB 1: ACOUSTIC SYLLABLE SEQUENCER */}
      {/* --------------------------------------------------------------------- */}
      {activeTab === 'sequencer' && (
        <section className="vl-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.35rem', color: '#f5d0fe' }}>
                🪘 Acoustic Metrical Sequencer &amp; Gaṇa Classifier
              </h3>
              <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: '#a1a1aa' }}>
                Tap syllables to toggle between <strong>Laghu (•, 1 beat / light)</strong> and <strong>Guru (—, 2 beats / heavy)</strong>. Listen to the recited pulse!
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="vl-btn vl-btn--cyber"
                onClick={isPlaying ? stopPlayback : startPlayback}
                style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}
              >
                {isPlaying ? '⏹ STOP RECITATION' : '▶ PLAY METER CADENCE'}
              </button>
              <button
                type="button"
                className="vl-btn vl-btn--cyber-ghost"
                onClick={clearAllSyllables}
                style={{ padding: '0.5rem 0.85rem', fontSize: '0.85rem' }}
              >
                🗑️ Clear
              </button>
            </div>
          </div>

          {/* Classical Presets Toolbar */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.75rem', color: '#cbd5e1', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              Load Classical Sanskrit Poetic Meters:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {CLASSICAL_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => applyPreset(preset)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(192, 132, 252, 0.3)',
                    color: '#e2e8f0',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  title={preset.meaning}
                >
                  <span style={{ color: '#c084fc', fontWeight: 600 }}>{preset.nameSa}</span> · {preset.name} ({preset.syllableCount})
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Syllable Strip */}
          <div
            style={{
              background: 'rgba(0, 0, 0, 0.35)',
              padding: '1.25rem',
              borderRadius: '16px',
              border: '1px solid rgba(192, 132, 252, 0.25)',
              minHeight: '110px',
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.6rem',
              marginBottom: '1.25rem',
            }}
          >
            {syllables.length === 0 ? (
              <div style={{ color: '#71717a', fontSize: '0.9rem', fontStyle: 'italic', margin: 'auto' }}>
                No syllables placed yet. Tap &quot;+ Laghu&quot; or &quot;+ Guru&quot; below or choose a classical preset above!
              </div>
            ) : (
              syllables.map((s, idx) => {
                const isCurrentBeat = activeBeatIndex === idx;
                const isGuru = s.type === 'guru';

                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => toggleSyllable(idx)}
                    style={{
                      background: isCurrentBeat
                        ? '#ec4899'
                        : isGuru
                        ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.35), rgba(126, 34, 206, 0.5))'
                        : 'linear-gradient(135deg, rgba(56, 189, 248, 0.25), rgba(14, 116, 144, 0.4))',
                      border: isCurrentBeat
                        ? '2px solid #f472b6'
                        : isGuru
                        ? '1.5px solid rgba(192, 132, 252, 0.6)'
                        : '1.5px solid rgba(56, 189, 248, 0.6)',
                      borderRadius: '12px',
                      padding: '0.6rem 0.8rem',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      minWidth: '54px',
                      cursor: 'pointer',
                      transform: isCurrentBeat ? 'scale(1.12)' : 'scale(1)',
                      boxShadow: isCurrentBeat ? '0 0 16px #ec4899' : 'none',
                      transition: 'transform 0.1s ease, box-shadow 0.1s ease',
                    }}
                    title={`Syllable #${idx + 1}: ${isGuru ? 'Guru (2 beats)' : 'Laghu (1 beat)'}. Tap to toggle.`}
                  >
                    <span style={{ fontSize: '0.65rem', color: '#a1a1aa', marginBottom: '2px' }}>#{idx + 1}</span>
                    <span style={{ fontSize: '1.4rem', fontWeight: 800, color: isGuru ? '#f5d0fe' : '#bae6fd', lineHeight: 1 }}>
                      {isGuru ? '—' : '•'}
                    </span>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#f8fafc', marginTop: '4px' }}>
                      {isGuru ? 'ग (2)' : 'ल (1)'}
                    </span>
                  </button>
                );
              })
            )}
          </div>

          {/* Builder Controls */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="vl-btn vl-btn--cyber"
                onClick={() => addSyllable('laghu')}
                style={{ background: 'rgba(14, 116, 144, 0.6)', borderColor: '#38bdf8' }}
              >
                + ADD LAGHU (ल · 1 Mātrā)
              </button>
              <button
                type="button"
                className="vl-btn vl-btn--cyber"
                onClick={() => addSyllable('guru')}
                style={{ background: 'rgba(126, 34, 206, 0.6)', borderColor: '#c084fc' }}
              >
                + ADD GURU (ग · 2 Mātrās)
              </button>
              <button
                type="button"
                className="vl-btn vl-btn--cyber-ghost"
                onClick={removeLastSyllable}
                disabled={syllables.length === 0}
              >
                ⌫ Backspace
              </button>
            </div>

            <div style={{ fontSize: '0.82rem', color: '#a1a1aa' }}>
              Counts: <span style={{ color: '#38bdf8', fontWeight: 700 }}>{totalLaghus} Laghus</span> +{' '}
              <span style={{ color: '#c084fc', fontWeight: 700 }}>{totalGurus} Gurus</span> ={' '}
              <strong style={{ color: '#fef08a' }}>{totalMatras} Total Mātrās</strong>
            </div>
          </div>

          {/* Detected Gaṇas (Trios) Panel */}
          {detectedGanas.length > 0 && (
            <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ fontSize: '0.8rem', color: '#c084fc', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Detected Canonical 3-Syllable Gaṇas (त्रिक-वर्गाः via यमाता-राज-भान-सलगा):
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {detectedGanas.map((dg, i) => (
                  <div
                    key={`${dg.gana.code}-${i}`}
                    style={{
                      background: 'rgba(0, 0, 0, 0.4)',
                      padding: '0.4rem 0.75rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(192, 132, 252, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <span style={{ color: '#f5d0fe', fontWeight: 800 }}>Trio #{dg.index}:</span>
                    <span style={{ color: '#e879f9', fontWeight: 700 }}>{dg.gana.dev} ({dg.gana.iast})</span>
                    <span style={{ fontFamily: 'monospace', color: '#cbd5e1' }}>[{dg.gana.symbol}]</span>
                    <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>&quot;{dg.gana.mnemonicWord}&quot;</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* TAB 2: PRASTARA COMBINATORIAL EXPANSION TABLE */}
      {/* --------------------------------------------------------------------- */}
      {activeTab === 'prastara' && (
        <section className="vl-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.35rem', color: '#f5d0fe' }}>
                🗂️ Piṅgala’s Prastāra: The Exhaustive 2ⁿ Binary Truth Table
              </h3>
              <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: '#a1a1aa' }}>
                In 200 BCE, Piṅgala formulated the algorithmic expansion rule to list all 2<sup>n</sup> meters of length <em>n</em> without omissions.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <label style={{ fontSize: '0.85rem', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                Syllables (n):
                <select
                  value={prastaraN}
                  onChange={(e) => {
                    playClick();
                    setPrastaraN(Number(e.target.value));
                  }}
                  style={{
                    background: '#18181b',
                    color: '#f5d0fe',
                    border: '1px solid #c084fc',
                    borderRadius: '6px',
                    padding: '0.25rem 0.5rem',
                  }}
                >
                  <option value={2}>n = 2 (4 rows)</option>
                  <option value={3}>n = 3 (8 rows)</option>
                  <option value={4}>n = 4 (16 rows)</option>
                  <option value={5}>n = 5 (32 rows)</option>
                </select>
              </label>

              <button
                type="button"
                className="vl-btn vl-btn--cyber-ghost"
                onClick={() => setShowModernBinary(!showModernBinary)}
                style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
              >
                {showModernBinary ? 'Show Sanskrit (ल/ग)' : 'Show Modern Bits (0/1)'}
              </button>
            </div>
          </div>

          {/* Prastāra Grid Display */}
          <div
            style={{
              maxHeight: '380px',
              overflowY: 'auto',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              background: 'rgba(0, 0, 0, 0.4)',
            }}
          >
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ background: 'rgba(255, 255, 255, 0.06)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <th style={{ padding: '0.65rem 1rem', color: '#c084fc' }}>Rank (क्रमः)</th>
                  <th style={{ padding: '0.65rem 1rem', color: '#f5d0fe' }}>Metrical Pattern (प्रस्तार-क्रमः)</th>
                  <th style={{ padding: '0.65rem 1rem', color: '#38bdf8' }}>Binary Value</th>
                  <th style={{ padding: '0.65rem 1rem', color: '#fbbf24' }}>Gurus (ग)</th>
                  <th style={{ padding: '0.65rem 1rem', color: '#34d399' }}>Audio Demo</th>
                </tr>
              </thead>
              <tbody>
                {prastaraTable.map((row) => (
                  <tr
                    key={row.rank}
                    style={{
                      borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                      transition: 'background 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(192, 132, 252, 0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <td style={{ padding: '0.6rem 1rem', fontWeight: 700, color: '#e2e8f0' }}>#{row.rank}</td>
                    <td style={{ padding: '0.6rem 1rem' }}>
                      <div style={{ display: 'flex', gap: '0.35rem' }}>
                        {row.pattern.map((p, idx) => (
                          <span
                            key={idx}
                            style={{
                              padding: '0.15rem 0.45rem',
                              borderRadius: '4px',
                              fontSize: '0.8rem',
                              fontWeight: 700,
                              background: p === 'guru' ? 'rgba(168, 85, 247, 0.3)' : 'rgba(56, 189, 248, 0.25)',
                              color: p === 'guru' ? '#f5d0fe' : '#bae6fd',
                              border: p === 'guru' ? '1px solid rgba(168, 85, 247, 0.5)' : '1px solid rgba(56, 189, 248, 0.4)',
                            }}
                          >
                            {showModernBinary ? (p === 'guru' ? '1' : '0') : p === 'guru' ? 'ग (—)' : 'ल (•)'}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td style={{ padding: '0.6rem 1rem', fontFamily: 'monospace', color: '#7dd3fc' }}>
                      {row.binaryStr}<sub>2</sub>
                    </td>
                    <td style={{ padding: '0.6rem 1rem', color: '#fef08a' }}>
                      {row.gurus} Guru{row.gurus !== 1 ? 's' : ''}
                    </td>
                    <td style={{ padding: '0.6rem 1rem' }}>
                      <button
                        type="button"
                        onClick={() => {
                          row.pattern.forEach((p, idx) => {
                            window.setTimeout(() => playSyllableTone(p), idx * 280);
                          });
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#c084fc',
                          cursor: 'pointer',
                          fontSize: '1rem',
                        }}
                        title="Recite this row"
                      >
                        🔊 Play
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* TAB 3: NASTA & UDDISHTA BINARY ENCODER / DECODER */}
      {/* --------------------------------------------------------------------- */}
      {activeTab === 'nasta-uddishta' && (
        <section className="vl-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.35rem', color: '#f5d0fe' }}>
            🧮 Piṅgala’s Dual Algorithms: Uddiṣṭa (उद्दिष्टम्) &amp; Naṣṭa (नष्टम्)
          </h3>
          <p style={{ margin: '0 0 1.5rem', fontSize: '0.85rem', color: '#a1a1aa' }}>
            The earliest recorded cryptographic conversion algorithms: <strong>Uddiṣṭa</strong> converts a binary meter into its decimal row number; <strong>Naṣṭa</strong> decrypts a row number back into its exact meter via repeated division by 2.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
            {/* PANEL A: UDDISHTA (Pattern -> Rank) */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '1.25rem',
                borderRadius: '16px',
                border: '1px solid rgba(192, 132, 252, 0.3)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1.2rem' }}>➡️</span>
                <h4 style={{ margin: 0, fontSize: '1.05rem', color: '#f5d0fe' }}>
                  1. Uddiṣṭa (उद्दिष्टम्): Meter ➔ Rank Number
                </h4>
              </div>
              <p style={{ margin: '0 0 1rem', fontSize: '0.8rem', color: '#cbd5e1' }}>
                Piṅgala’s rule: write powers of 2 (1, 2, 4, 8…) beneath the syllables. Sum only those under the <strong>Guru (ग)</strong> syllables, then add 1.
              </p>

              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                {uddishtaBits.map((b, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleUddishtaBit(idx)}
                    style={{
                      background: b === 'guru' ? 'rgba(168, 85, 247, 0.3)' : 'rgba(56, 189, 248, 0.25)',
                      border: b === 'guru' ? '1.5px solid #c084fc' : '1.5px solid #38bdf8',
                      borderRadius: '8px',
                      padding: '0.5rem 0.75rem',
                      color: '#f8fafc',
                      cursor: 'pointer',
                      textAlign: 'center',
                    }}
                    title="Click to toggle Laghu/Guru"
                  >
                    <div style={{ fontSize: '0.7rem', color: '#a1a1aa' }}>Pos #{idx + 1}</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>{b === 'guru' ? 'ग (—)' : 'ल (•)'}</div>
                    <div style={{ fontSize: '0.75rem', color: '#fde047', fontWeight: 700 }}>2<sup>{idx}</sup> = {1 << idx}</div>
                  </button>
                ))}
              </div>

              {/* Formula & Calculation Box */}
              <div style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '0.85rem', borderRadius: '10px', fontSize: '0.85rem' }}>
                <div style={{ color: '#a1a1aa', marginBottom: '0.25rem' }}>Step-by-Step Summation:</div>
                <div style={{ fontFamily: 'monospace', color: '#e2e8f0' }}>
                  Sum ={' '}
                  {uddishtaResult.steps
                    .map((s) => (s.contributes ? `${s.powerVal} [ग]` : `0 [ल]`))
                    .join(' + ')}{' '}
                  = <strong>{uddishtaResult.sum}</strong>
                </div>
                <div style={{ marginTop: '0.5rem', fontWeight: 700, color: '#facc15' }}>
                  Rank (क्रमः) = {uddishtaResult.sum} + 1 = Row #{uddishtaResult.rank} in Prastāra!
                </div>
              </div>
            </div>

            {/* PANEL B: NASTA (Rank -> Pattern) */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '1.25rem',
                borderRadius: '16px',
                border: '1px solid rgba(56, 189, 248, 0.3)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1.2rem' }}>⬅️</span>
                <h4 style={{ margin: 0, fontSize: '1.05rem', color: '#7dd3fc' }}>
                  2. Naṣṭa (नष्टम्): Rank Number ➔ Decrypted Meter
                </h4>
              </div>
              <p style={{ margin: '0 0 1rem', fontSize: '0.8rem', color: '#cbd5e1' }}>
                Piṅgala’s Sūtra: <em>&quot;लघ्वर्धे&quot;</em> (If even, place Laghu &amp; divide by 2) · <em>&quot;विषमे चैकं योजयित्वा&quot;</em> (If odd, place Guru, add 1 &amp; divide by 2).
              </p>

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <label style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
                  Target Row (Rank):
                  <input
                    type="number"
                    min={1}
                    max={1 << nastaLength}
                    value={nastaRankInput}
                    onChange={(e) => setNastaRankInput(Number(e.target.value))}
                    style={{
                      background: '#18181b',
                      color: '#38bdf8',
                      border: '1px solid #38bdf8',
                      borderRadius: '6px',
                      padding: '0.35rem 0.6rem',
                      width: '70px',
                      marginLeft: '0.4rem',
                      fontWeight: 700,
                    }}
                  />
                </label>

                <label style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
                  Length:
                  <select
                    value={nastaLength}
                    onChange={(e) => setNastaLength(Number(e.target.value))}
                    style={{
                      background: '#18181b',
                      color: '#f8fafc',
                      border: '1px solid #64748b',
                      borderRadius: '6px',
                      padding: '0.35rem 0.5rem',
                      marginLeft: '0.4rem',
                    }}
                  >
                    <option value={3}>3 Syllables (1–8)</option>
                    <option value={4}>4 Syllables (1–16)</option>
                    <option value={5}>5 Syllables (1–32)</option>
                  </select>
                </label>
              </div>

              {/* Division Steps Table */}
              <div style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '0.85rem', borderRadius: '10px', fontSize: '0.8rem' }}>
                <div style={{ fontWeight: 700, color: '#38bdf8', marginBottom: '0.4rem' }}>Halāyudha’s Step-by-Step Division Trace:</div>
                {nastaSteps.map((step) => (
                  <div key={step.stepNum} style={{ marginBottom: '0.3rem', fontFamily: 'monospace', color: '#e2e8f0' }}>
                    Syllable #{step.stepNum}: {step.currentVal} is {step.isEven ? 'EVEN' : 'ODD'} ➔{' '}
                    <strong style={{ color: step.chosen === 'guru' ? '#f5d0fe' : '#bae6fd' }}>
                      {step.chosen === 'guru' ? 'ग (Guru)' : 'ल (Laghu)'}
                    </strong>
                    , Next Value = {step.nextVal}
                  </div>
                ))}
                <div style={{ marginTop: '0.6rem', fontWeight: 800, color: '#34d399', fontSize: '0.9rem' }}>
                  Decrypted Meter: {nastaSteps.map((s) => (s.chosen === 'guru' ? '—' : '•')).join(' ')} (
                  {nastaSteps.map((s) => (s.chosen === 'guru' ? 'ग' : 'ल')).join('-')})
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* TAB 4: MERUPRASTARA (PASCAL PYRAMID) & MATRAMERU (FIBONACCI) */}
      {/* --------------------------------------------------------------------- */}
      {activeTab === 'meru' && (
        <section className="vl-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.35rem', color: '#f5d0fe' }}>
                🏔️ Meruprastāra (मेरुप्रस्तारः) &amp; Mātrāmeru (मात्रामेरू)
              </h3>
              <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: '#a1a1aa' }}>
                Piṅgala’s binomial coefficient pyramid (10th c. commentary by Halāyudha: <em>&quot;Pare pūrṇam iti&quot;</em>) and the Fibonacci morae diagonals.
              </p>
            </div>

            <button
              type="button"
              className={`vl-btn ${matrameraMode ? 'vl-btn--cyber' : 'vl-btn--cyber-ghost'}`}
              onClick={() => {
                playClick();
                setMatrameraMode(!matrameraMode);
              }}
              style={{ fontSize: '0.85rem', padding: '0.45rem 1rem' }}
            >
              {matrameraMode ? '🌟 Showing Mātrāmeru (Fibonacci Diagonals)' : '🔍 Toggle Mātrāmeru (Fibonacci Mode)'}
            </button>
          </div>

          {/* Interactive Triangle Grid */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '1.5rem 0.5rem',
              background: 'rgba(0, 0, 0, 0.4)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              overflowX: 'auto',
            }}
          >
            {meruGrid.map((row, n) => (
              <div key={n} style={{ display: 'flex', gap: '0.4rem', justifyContent: 'center' }}>
                <span style={{ width: '40px', fontSize: '0.72rem', color: '#71717a', alignSelf: 'center', textAlign: 'right', marginRight: '0.25rem' }}>
                  n = {n}
                </span>

                {row.map((val, k) => {
                  const isSelected = selectedMeruCell?.n === n && selectedMeruCell?.k === k;
                  const isParent =
                    selectedMeruCell &&
                    selectedMeruCell.n === n + 1 &&
                    (selectedMeruCell.k === k || selectedMeruCell.k === k + 1);

                  return (
                    <button
                      key={`${n}-${k}`}
                      type="button"
                      onClick={() => {
                        playClick();
                        setSelectedMeruCell({ n, k });
                      }}
                      style={{
                        width: '46px',
                        height: '42px',
                        borderRadius: '8px',
                        background: isSelected
                          ? '#facc15'
                          : isParent
                          ? '#38bdf8'
                          : matrameraMode
                          ? 'rgba(168, 85, 247, 0.25)'
                          : 'rgba(255, 255, 255, 0.06)',
                        border: isSelected
                          ? '2px solid #fef08a'
                          : isParent
                          ? '2px solid #7dd3fc'
                          : '1px solid rgba(255, 255, 255, 0.12)',
                        color: isSelected ? '#18181b' : isParent ? '#0c4a6e' : '#f8fafc',
                        fontWeight: isSelected || isParent ? 800 : 600,
                        fontSize: '0.92rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.15s ease',
                      }}
                      title={`Row n=${n}, Column k=${k}: C(${n},${k}) = ${val} meters`}
                    >
                      {val}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Cell Inspector Box */}
          {selectedMeruCell && (
            <div
              style={{
                marginTop: '1.25rem',
                padding: '1rem 1.25rem',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(250, 204, 21, 0.3)',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <div>
                <div style={{ color: '#facc15', fontWeight: 800, fontSize: '1rem', marginBottom: '0.2rem' }}>
                  Combinatorial Coordinate: C({selectedMeruCell.n}, {selectedMeruCell.k}) = {binomial(selectedMeruCell.n, selectedMeruCell.k)}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
                  In a meter of <strong>{selectedMeruCell.n} total syllables</strong>, there are exactly{' '}
                  <strong style={{ color: '#fef08a' }}>{binomial(selectedMeruCell.n, selectedMeruCell.k)} distinct meters</strong> having exactly{' '}
                  <strong>{selectedMeruCell.k} heavy Gurus</strong> and {selectedMeruCell.n - selectedMeruCell.k} light Laghus!
                </div>
              </div>

              {selectedMeruCell.n > 0 && selectedMeruCell.k > 0 && selectedMeruCell.k < selectedMeruCell.n && (
                <div style={{ fontFamily: 'monospace', fontSize: '0.82rem', color: '#7dd3fc', background: 'rgba(0,0,0,0.4)', padding: '0.5rem 0.75rem', borderRadius: '6px' }}>
                  Halāyudha’s Rule: {binomial(selectedMeruCell.n - 1, selectedMeruCell.k - 1)} [top-left] +{' '}
                  {binomial(selectedMeruCell.n - 1, selectedMeruCell.k)} [top-right] = {binomial(selectedMeruCell.n, selectedMeruCell.k)}
                </div>
              )}
            </div>
          )}

          {/* Fibonacci Diagonal Explanation */}
          {matrameraMode && (
            <div style={{ marginTop: '1rem', padding: '1rem', borderRadius: '12px', background: 'rgba(192, 132, 252, 0.1)', border: '1px solid rgba(192, 132, 252, 0.3)' }}>
              <div style={{ fontWeight: 800, color: '#f5d0fe', marginBottom: '0.35rem' }}>
                🌟 Mātrāmeru Fibonacci Sequence Generated Across Diagonals:
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {fibonacciDiagonals.map((diag, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'rgba(0,0,0,0.4)',
                      padding: '0.35rem 0.65rem',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      color: '#cbd5e1',
                    }}
                  >
                    Duration {idx} mātrās: <strong style={{ color: '#facc15' }}>{diag.sum}</strong> meters
                  </div>
                ))}
              </div>
              <p style={{ margin: '0.6rem 0 0', fontSize: '0.8rem', color: '#a1a1aa' }}>
                Because any meter of duration <em>m</em> can end with either a 1-beat Laghu (taking from meters of duration <em>m-1</em>) or a 2-beat Guru (taking from meters of duration <em>m-2</em>), the sequence M(m) = M(m-1) + M(m-2) naturally unfolds: 1, 1, 2, 3, 5, 8, 13, 21, 34…
              </p>
            </div>
          )}
        </section>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* TAB 5: CHANDAS CHALLENGE ARENA */}
      {/* --------------------------------------------------------------------- */}
      {activeTab === 'arena' && (
        <section className="vl-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.35rem', color: '#f5d0fe' }}>
                ⚔️ Chandaḥśāstra Vidyā Challenge Arena
              </h3>
              <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: '#a1a1aa' }}>
                Test your mastery of ancient binary combinatorics and metric algorithms. Earn +25 Vidyā points per question!
              </p>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '0.45rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(250, 204, 21, 0.3)' }}>
              <span style={{ fontSize: '0.8rem', color: '#fde047', fontWeight: 700 }}>
                Question {currentQuizIdx + 1} of {CHANDAS_CHALLENGES.length}
              </span>
            </div>
          </div>

          {/* Current Question Card */}
          {(() => {
            const q = CHANDAS_CHALLENGES[currentQuizIdx];
            return (
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  padding: '1.5rem',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <h4 style={{ margin: '0 0 1rem', fontSize: '1.1rem', color: '#f8fafc', lineHeight: 1.5 }}>
                  {q.q}
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem' }}>
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedQuizAnswer === optIdx;
                    const isCorrect = optIdx === q.answer;

                    let bg = 'rgba(255, 255, 255, 0.05)';
                    let border = '1px solid rgba(255, 255, 255, 0.12)';
                    if (quizSubmitted) {
                      if (isCorrect) {
                        bg = 'rgba(34, 197, 94, 0.25)';
                        border = '1px solid #22c55e';
                      } else if (isSelected) {
                        bg = 'rgba(239, 68, 68, 0.25)';
                        border = '1px solid #ef4444';
                      }
                    } else if (isSelected) {
                      bg = 'rgba(192, 132, 252, 0.25)';
                      border = '1.5px solid #c084fc';
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleAnswerSelect(optIdx)}
                        style={{
                          background: bg,
                          border: border,
                          padding: '0.85rem 1rem',
                          borderRadius: '10px',
                          color: '#e2e8f0',
                          textAlign: 'left',
                          fontSize: '0.9rem',
                          cursor: quizSubmitted ? 'default' : 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <span style={{ fontWeight: 700, marginRight: '0.5rem', color: isSelected ? '#f5d0fe' : '#94a3b8' }}>
                          {String.fromCharCode(65 + optIdx)}.
                        </span>
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted ? (
                  <div
                    style={{
                      background: selectedQuizAnswer === q.answer ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                      padding: '1rem',
                      borderRadius: '10px',
                      border: selectedQuizAnswer === q.answer ? '1px solid #22c55e' : '1px solid #ef4444',
                      marginBottom: '1rem',
                    }}
                  >
                    <div style={{ fontWeight: 800, color: selectedQuizAnswer === q.answer ? '#4ade80' : '#f87171', marginBottom: '0.35rem' }}>
                      {selectedQuizAnswer === q.answer ? '✓ Accurate! +25 Vidyā Points' : '✗ Keep Exploring!'}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                      {q.explain}
                    </div>
                  </div>
                ) : null}

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                  {!quizSubmitted ? (
                    <button
                      type="button"
                      className="vl-btn vl-btn--cyber"
                      onClick={handleQuizSubmit}
                      disabled={selectedQuizAnswer === null}
                    >
                      SUBMIT VERIFICATION ➔
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="vl-btn vl-btn--cyber"
                      onClick={handleNextQuizQuestion}
                    >
                      NEXT CHALLENGE ➔
                    </button>
                  )}
                </div>
              </div>
            );
          })()}
        </section>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* SANSKRIT TERMS & CHALLENGES LIST */}
      {/* --------------------------------------------------------------------- */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <TermPanel title="Sanskrit Prosodic & Combinatorial Vocabulary" terms={CHANDAS_TERMS} />
        <ChallengeList items={CHANDAS_CHALLENGES} />
      </div>

      <LabNextAction
        nextTitle="Paramāṇu Atomic Crucible"
        nextCode="SEC-01"
        nextDev="परमाणु-निर्माणम्"
        nextIcon="⚛️"
        onNextLab={onNextLab}
        message="Cycle back to Sector SEC-01: Kaṇāda’s Vaiśeṣika Atomic Crucible"
      />
    </div>
  );
};

export default ChandahshastraLab;
