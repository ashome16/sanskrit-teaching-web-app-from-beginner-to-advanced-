import React, { useEffect, useState, useMemo, useRef } from 'react';
import type { DhatuEntry } from '../types/linguistics';
import { loadDhatupatha } from '../utils/dhatupatha';
import { playBilingualSequence, playPronunciation } from '../utils/pronunciation';
import { personNumberEnglish } from '../utils/personGloss';
import {
  LAKARAS,
  type LakaraId,
  type VoiceType,
  deriveConjugationTable,
  getCausativeInfo,
  getKrtParticiples,
  deconstructWord,
  type DeconstructionResult,
  PRATYAYA_QUIZ_SET,
  PERSON_LABELS,
  NUMBER_LABELS,
} from '../utils/paninianEngine';
import DhatupathaBrowser from './DhatupathaBrowser';
import DhatupathaArticles from './DhatupathaArticles';
import '../styles/dhatupatha.css';

export type StudioMode = 'deconstructor' | 'generator' | 'comparator' | 'quiz' | 'library' | 'articles';

type PaninianStudioProps = {
  onGoBack?: () => void;
};

interface CategorizedWord {
  word: string;
  category: 'popular' | 'atmanepada' | 'causative' | 'krt';
  root: string;
}

const DECON_WORDS: CategorizedWord[] = [
  // Popular
  { word: 'पठति', category: 'popular', root: 'पठ्' },
  { word: 'भवति', category: 'popular', root: 'भू' },
  { word: 'गच्छति', category: 'popular', root: 'गम्' },
  { word: 'अपठत्', category: 'popular', root: 'पठ्' },
  { word: 'गमिष्यति', category: 'popular', root: 'गम्' },
  { word: 'समूपागच्छति', category: 'popular', root: 'गम्' },
  { word: 'पठेत्', category: 'popular', root: 'पठ्' },
  { word: 'पठन्तु', category: 'popular', root: 'पठ्' },
  { word: 'लेखिष्यति', category: 'popular', root: 'लिख्' },
  { word: 'भवन्ति', category: 'popular', root: 'भू' },

  // Ātmanepada
  { word: 'लभते', category: 'atmanepada', root: 'लभ्' },
  { word: 'वर्धते', category: 'atmanepada', root: 'वृध्' },
  { word: 'सेवते', category: 'atmanepada', root: 'सेव्' },
  { word: 'अलभत', category: 'atmanepada', root: 'लभ्' },
  { word: 'लप्स्यते', category: 'atmanepada', root: 'लभ्' },
  { word: 'शेरते', category: 'atmanepada', root: 'शी' },
  { word: 'कुरुते', category: 'atmanepada', root: 'कृ' },
  { word: 'भुङ्क्ते', category: 'atmanepada', root: 'भुज्' },

  // Causative (णिजन्तः)
  { word: 'पाठयति', category: 'causative', root: 'पठ्' },
  { word: 'लेखयति', category: 'causative', root: 'लिख्' },
  { word: 'दर्शयति', category: 'causative', root: 'दृश्' },
  { word: 'खादयति', category: 'causative', root: 'खाद्' },
  { word: 'गमयति', category: 'causative', root: 'गम्' },
  { word: 'पाययति', category: 'causative', root: 'पा' },
  { word: 'दापयति', category: 'causative', root: 'दा' },
  { word: 'श्रावयति', category: 'causative', root: 'श्रु' },

  // Kṛdanta
  { word: 'गत्वा', category: 'krt', root: 'गम्' },
  { word: 'पठितुम्', category: 'krt', root: 'पठ्' },
  { word: 'आगत्य', category: 'krt', root: 'गम्' },
  { word: 'कृत्वा', category: 'krt', root: 'कृ' },
  { word: 'कर्तुम्', category: 'krt', root: 'कृ' },
  { word: 'पठितः', category: 'krt', root: 'पठ्' },
  { word: 'पठन्', category: 'krt', root: 'पठ्' },
  { word: 'लभमानः', category: 'krt', root: 'लभ्' },
];

interface ComparatorPreset {
  id: string;
  label: string;
  description: string;
  dhatuA: string;
  voiceA: VoiceType;
  causativeA: boolean;
  dhatuB: string;
  voiceB: VoiceType;
  causativeB: boolean;
  lakara?: LakaraId;
}

const COMPARATOR_PRESETS: ComparatorPreset[] = [
  {
    id: 'path_base_causative',
    label: 'पठति vs पाठयति',
    description: 'पठ्: Base Active (reads) vs Causative णिजन्तः (teaches)',
    dhatuA: 'path',
    voiceA: 'parasmaipada',
    causativeA: false,
    dhatuB: 'path',
    voiceB: 'parasmaipada',
    causativeB: true,
    lakara: 'lat',
  },
  {
    id: 'likh_base_causative',
    label: 'लिखति vs लेखयति',
    description: 'लिख्: Base Active (writes) vs Causative Guṇa mutation (has write)',
    dhatuA: 'likh',
    voiceA: 'parasmaipada',
    causativeA: false,
    dhatuB: 'likh',
    voiceB: 'parasmaipada',
    causativeB: true,
    lakara: 'lat',
  },
  {
    id: 'gam_base_causative',
    label: 'गच्छति vs गमयति',
    description: 'गम्: Base irregular stem गच्छ् vs Causative regular stem गम् (sends)',
    dhatuA: 'gam',
    voiceA: 'parasmaipada',
    causativeA: false,
    dhatuB: 'gam',
    voiceB: 'parasmaipada',
    causativeB: true,
    lakara: 'lat',
  },
  {
    id: 'da_base_causative',
    label: 'ददाति vs दापयति',
    description: 'दा: 3rd Class (gives) vs Causative with puk-āgama (causes to give)',
    dhatuA: 'da',
    voiceA: 'parasmaipada',
    causativeA: false,
    dhatuB: 'da',
    voiceB: 'parasmaipada',
    causativeB: true,
    lakara: 'lat',
  },
  {
    id: 'kr_para_vs_atma',
    label: 'करोति vs कुरुते',
    description: 'कृ (उभयपदी): Parasmaipada (action for other) vs Ātmanepada (action for self)',
    dhatuA: 'kr',
    voiceA: 'parasmaipada',
    causativeA: false,
    dhatuB: 'kr',
    voiceB: 'atmanepada',
    causativeB: false,
    lakara: 'lat',
  },
  {
    id: 'bhuj_para_vs_atma',
    label: 'भुनक्ति vs भुङ्क्ते',
    description: 'भुज् (उभयपदी, रुधादि): 7th Gaṇa Parasmaipada (protects) vs Ātmanepada (eats)',
    dhatuA: 'bhuj',
    voiceA: 'parasmaipada',
    causativeA: false,
    dhatuB: 'bhuj',
    voiceB: 'atmanepada',
    causativeB: false,
    lakara: 'lat',
  },
  {
    id: 'path_vs_labh',
    label: 'पठति vs लभते',
    description: 'Voice contrast: Parasmaipada (पठ् - ति/तः/न्ति) vs Ātmanepada (लभ् - ते/एते/न्ते)',
    dhatuA: 'path',
    voiceA: 'parasmaipada',
    causativeA: false,
    dhatuB: 'labh',
    voiceB: 'atmanepada',
    causativeB: false,
    lakara: 'lat',
  },
  {
    id: 'path_vs_bhu',
    label: 'पठति vs भवति',
    description: 'Gaṇa 1 root comparison: पठ् (to study) vs भू (to become/exist)',
    dhatuA: 'path',
    voiceA: 'parasmaipada',
    causativeA: false,
    dhatuB: 'bhu',
    voiceB: 'parasmaipada',
    causativeB: false,
    lakara: 'lat',
  },
];

const PaninianStudio: React.FC<PaninianStudioProps> = ({ onGoBack }) => {
  const [mode, setMode] = useState<StudioMode>('generator');
  const [dhatuLibrary, setDhatuLibrary] = useState<DhatuEntry[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Deconstructor state
  const [deconInput, setDeconInput] = useState('पाठयति');
  const [deconResult, setDeconResult] = useState<DeconstructionResult | null>(null);
  const [deconFilter, setDeconFilter] = useState<'all' | 'popular' | 'atmanepada' | 'causative' | 'krt'>('all');

  // Generator state
  const [selectedDhatuId, setSelectedDhatuId] = useState('path');
  const [activeLakara, setActiveLakara] = useState<LakaraId | 'krt'>('lat');
  const [selectedVoice, setSelectedVoice] = useState<VoiceType>('parasmaipada');
  const [isCausative, setIsCausative] = useState(false);

  // Comparator state
  const [compLakara, setCompLakara] = useState<LakaraId>('lat');
  const [compDhatuIdA, setCompDhatuIdA] = useState('path');
  const [compVoiceA, setCompVoiceA] = useState<VoiceType>('parasmaipada');
  const [compCausativeA, setCompCausativeA] = useState(false);
  const [compDhatuIdB, setCompDhatuIdB] = useState('path');
  const [compVoiceB, setCompVoiceB] = useState<VoiceType>('parasmaipada');
  const [compCausativeB, setCompCausativeB] = useState(true);

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFilter, setQuizFilter] = useState<'all' | 'lakara' | 'krt' | 'causative' | 'atmanepada'>('all');

  useEffect(() => {
    loadDhatupatha().then((data) => {
      setDhatuLibrary(data);
      // Run initial deconstruction
      const res = deconstructWord('पाठयति', data);
      setDeconResult(res);
    });
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const handleDeconstruct = (wordToAnalyze?: string) => {
    const target = (wordToAnalyze || deconInput).trim();
    if (!target) return;
    const res = deconstructWord(target, dhatuLibrary);
    setDeconResult(res);
  };

  const handleSelectSuggestion = (word: string) => {
    setDeconInput(word);
    handleDeconstruct(word);
  };

  // Resolve selected Dhatu for generator
  const currentDhatu = useMemo(() => {
    const found =
      dhatuLibrary.find((d) => (d.id || '').toLowerCase() === selectedDhatuId.toLowerCase()) ||
      dhatuLibrary.find((d) => d.devanagari === selectedDhatuId) ||
      dhatuLibrary.find((d) => d.devanagari === 'पठ्') ||
      dhatuLibrary[0];

    return (
      found ||
      ({
        id: 'path',
        devanagari: 'पठ्',
        transliteration: 'paṭh',
        meaning: 'to read, to study',
        meaning_hi: 'पढ़ना',
        gana: 1,
        gana_name: 'bhvādi',
        padam: 'parasmaipada',
        examples: ['पठति', 'पठसि', 'पठामि'],
      } as DhatuEntry)
    );
  }, [dhatuLibrary, selectedDhatuId]);

  // Sync default voice when root changes
  const handleRootChange = (id: string) => {
    setSelectedDhatuId(id);
    const root = dhatuLibrary.find((d) => (d.id || '').toLowerCase() === id.toLowerCase());
    if (root?.padam === 'atmanepada') {
      setSelectedVoice('atmanepada');
    } else {
      setSelectedVoice('parasmaipada');
    }
  };

  const activeLakaraInfo = LAKARAS.find((l) => l.id === activeLakara);
  const conjugationTable = useMemo(() => {
    if (activeLakara === 'krt') return null;
    return deriveConjugationTable(currentDhatu, activeLakara, {
      voice: selectedVoice,
      isCausative,
    });
  }, [currentDhatu, activeLakara, selectedVoice, isCausative]);

  const krtParticiples = useMemo(() => {
    if (activeLakara !== 'krt') return null;
    return getKrtParticiples(currentDhatu, isCausative);
  }, [currentDhatu, activeLakara, isCausative]);

  const causativeInfo = useMemo(() => {
    return getCausativeInfo(currentDhatu);
  }, [currentDhatu]);

  // Play all on the lakāra 3×3 (not the root library, not the Laṭ card).
  const [playingAll, setPlayingAll] = useState(false);
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);
  const stopPlayRef = useRef<(() => void) | null>(null);
  const resumeIndexRef = useRef(0);
  const playTokenRef = useRef(0);
  const playAllBtnRef = useRef<HTMLDivElement | null>(null);

  const playCells = useMemo(() => {
    if (activeLakara === 'krt' || !conjugationTable) return [];
    const list: { sanskrit: string }[] = [];
    conjugationTable.forEach((row) => {
      row.forEach((cell) => {
        list.push({ sanskrit: cell.full });
      });
    });
    return list;
  }, [conjugationTable, activeLakara]);

  const playCellsRef = useRef(playCells);
  playCellsRef.current = playCells;

  const playbackKey = `${selectedDhatuId}|${activeLakara}|${selectedVoice}|${isCausative ? 'c' : 'b'}|${mode}`;

  useEffect(() => {
    playTokenRef.current += 1;
    stopPlayRef.current?.();
    stopPlayRef.current = null;
    resumeIndexRef.current = 0;
    setPlayingAll(false);
    setSpeakingIndex(null);
    return () => {
      playTokenRef.current += 1;
      stopPlayRef.current?.();
      stopPlayRef.current = null;
    };
  }, [playbackKey]);

  // Pin Pause under the site header. Fixed, not sticky: .dashboard is a scroll
  // container unless overflow is clipped (see .dashboard--dhatupatha).
  useEffect(() => {
    if (!playingAll) return;
    const btn = playAllBtnRef.current;
    const place = () => {
      const header = document.querySelector<HTMLElement>('.dashboard-header');
      const bottom = header ? header.getBoundingClientRect().bottom : 0;
      const top = bottom > 8 ? Math.round(bottom) : 0;
      btn?.style.setProperty('--dp-stick-top', `${top}px`);
    };
    place();
    const header = document.querySelector('.dashboard-header');
    const observer = header ? new ResizeObserver(place) : null;
    if (header && observer) observer.observe(header);
    window.addEventListener('scroll', place, true);
    window.addEventListener('resize', place);
    return () => {
      observer?.disconnect();
      window.removeEventListener('scroll', place, true);
      window.removeEventListener('resize', place);
    };
  }, [playingAll]);

  useEffect(() => {
    if (!playingAll || speakingIndex === null) return;
    const el = document.querySelector<HTMLElement>(`[data-lakara-cell="${speakingIndex}"]`);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const btn = playAllBtnRef.current;
    const barBottom = btn ? btn.getBoundingClientRect().bottom : 0;
    const topLimit = Math.max(8, barBottom + 12);
    const viewH = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top >= topLimit && rect.bottom <= viewH - 8) return;
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    el.style.scrollMarginTop = `${Math.round(topLimit)}px`;
    el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
  }, [playingAll, speakingIndex]);

  const cancelLakaraPlay = () => {
    playTokenRef.current += 1;
    stopPlayRef.current?.();
    stopPlayRef.current = null;
  };

  const startLakaraPlayAll = (start: number) => {
    cancelLakaraPlay();
    const list = playCellsRef.current;
    if (!list.length) return;
    const index = start >= list.length ? 0 : Math.max(0, start);
    const slice = list.slice(index);
    const token = playTokenRef.current;
    resumeIndexRef.current = index;
    setPlayingAll(true);
    setSpeakingIndex(index);
    // Sanskrit only. English stays on the cell as text and is never spoken.
    stopPlayRef.current = playBilingualSequence(
      slice.map(({ sanskrit }) => ({ sanskrit })),
      {
      gapMs: 250,
      onItem: (itemIndex) => {
        if (playTokenRef.current !== token) return;
        const absolute = index + itemIndex;
        resumeIndexRef.current = absolute;
        setSpeakingIndex(absolute);
      },
      onDone: () => {
        if (playTokenRef.current !== token) return;
        stopPlayRef.current = null;
        setPlayingAll(false);
        setSpeakingIndex(null);
        resumeIndexRef.current = 0;
      },
    });
  };

  const toggleLakaraPlayAll = () => {
    if (playingAll) {
      cancelLakaraPlay();
      setPlayingAll(false);
      setSpeakingIndex(null);
      return;
    }
    startLakaraPlayAll(resumeIndexRef.current);
  };

  const speakLakaraCell = (cellIndex: number) => {
    // A single 🔊 cancels Play all. Next Play all starts at the first cell.
    cancelLakaraPlay();
    setPlayingAll(false);
    resumeIndexRef.current = 0;
    const cell = playCellsRef.current[cellIndex];
    if (!cell) {
      setSpeakingIndex(null);
      return;
    }
    const token = playTokenRef.current;
    setSpeakingIndex(cellIndex);
    stopPlayRef.current = playBilingualSequence([{ sanskrit: cell.sanskrit }], {
      gapMs: 250,
      onItem: () => {
        if (playTokenRef.current !== token) return;
        setSpeakingIndex(cellIndex);
      },
      onDone: () => {
        if (playTokenRef.current !== token) return;
        stopPlayRef.current = null;
        setSpeakingIndex(null);
      },
    });
  };

  // Comparator resolved entities
  const compDhatuA = useMemo(() => {
    return (
      dhatuLibrary.find((d) => (d.id || '').toLowerCase() === compDhatuIdA.toLowerCase()) ||
      dhatuLibrary.find((d) => d.devanagari === compDhatuIdA) ||
      currentDhatu
    );
  }, [dhatuLibrary, compDhatuIdA, currentDhatu]);

  const compDhatuB = useMemo(() => {
    return (
      dhatuLibrary.find((d) => (d.id || '').toLowerCase() === compDhatuIdB.toLowerCase()) ||
      dhatuLibrary.find((d) => d.devanagari === compDhatuIdB) ||
      currentDhatu
    );
  }, [dhatuLibrary, compDhatuIdB, currentDhatu]);

  const compTableA = useMemo(() => {
    return deriveConjugationTable(compDhatuA, compLakara, {
      voice: compVoiceA,
      isCausative: compCausativeA,
    });
  }, [compDhatuA, compLakara, compVoiceA, compCausativeA]);

  const compTableB = useMemo(() => {
    return deriveConjugationTable(compDhatuB, compLakara, {
      voice: compVoiceB,
      isCausative: compCausativeB,
    });
  }, [compDhatuB, compLakara, compVoiceB, compCausativeB]);

  const compLakaraInfo = LAKARAS.find((l) => l.id === compLakara);

  const applyPreset = (preset: ComparatorPreset) => {
    setCompDhatuIdA(preset.dhatuA);
    setCompVoiceA(preset.voiceA);
    setCompCausativeA(preset.causativeA);
    setCompDhatuIdB(preset.dhatuB);
    setCompVoiceB(preset.voiceB);
    setCompCausativeB(preset.causativeB);
    if (preset.lakara) setCompLakara(preset.lakara);
  };

  // Copy Markdown Table
  const handleCopyMarkdown = () => {
    if (!conjugationTable || activeLakara === 'krt') return;
    const voiceLabel = isCausative
      ? 'णिजन्तः (प्रेरणार्थक / Causative)'
      : selectedVoice === 'atmanepada'
      ? 'आत्मनेपदम् (Middle Voice)'
      : 'परस्मैपदम् (Active Voice)';

    let md = `### ${currentDhatu.devanagari} (${currentDhatu.transliteration}) — ${activeLakaraInfo?.nameSa} [${voiceLabel}]\n\n`;
    md += `| पुरुष (Person) | एकवचनम् (Singular) | द्विवचनम् (Dual) | बहुवचनम् (Plural) |\n`;
    md += `| :--- | :--- | :--- | :--- |\n`;
    conjugationTable.forEach((row, pIdx) => {
      const pLabel = `${PERSON_LABELS[pIdx].sa} (${PERSON_LABELS[pIdx].en})`;
      md += `| ${pLabel} | ${row[0].full} | ${row[1].full} | ${row[2].full} |\n`;
    });
    md += `\n*Generated with Pāṇinian Morphological Engine · Sūtra: ${isCausative ? 'हेतुमति च (३.१.२६)' : activeLakaraInfo?.paniniSutra}*\n`;

    navigator.clipboard
      .writeText(md)
      .then(() => {
        showToast('✓ 3×3 Conjugation Table copied to clipboard as Markdown!');
      })
      .catch(() => {
        showToast('Clipboard copy failed. Please select text manually.');
      });
  };

  // Print Worksheet
  const handlePrintWorksheet = () => {
    window.print();
  };

  // Quiz questions
  const filteredQuizSet = useMemo(() => {
    if (quizFilter === 'all') return PRATYAYA_QUIZ_SET;
    return PRATYAYA_QUIZ_SET.filter((q) => q.category === quizFilter);
  }, [quizFilter]);

  const currentQuestion = filteredQuizSet[quizIndex % filteredQuizSet.length] || PRATYAYA_QUIZ_SET[0];

  const handleSelectQuizOption = (opt: string) => {
    if (selectedOption !== null) return;
    setSelectedOption(opt);
    setShowExplanation(true);
    if (opt === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (quizIndex < filteredQuizSet.length - 1) {
      setQuizIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setQuizIndex(0);
      setSelectedOption(null);
      setShowExplanation(false);
      setScore(0);
    }
  };

  // Filtered deconstructor words
  const visibleDeconWords = useMemo(() => {
    if (deconFilter === 'all') return DECON_WORDS;
    return DECON_WORDS.filter((w) => w.category === deconFilter);
  }, [deconFilter]);

  return (
    <div className="dp-studio" aria-label="Pāṇinian Dhātupāṭha Studio">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="dp-toast" role="status" aria-live="polite">
          {toastMessage}
        </div>
      )}

      {/* Studio Navigation Banner */}
      <header className="dp-studio-header">
        <div className="dp-studio-title-row">
          <div>
            <h2 className="dp-studio-main-title">
              🕉️ पाणिनीय-धातुपाठ-प्रयोगशाला
            </h2>
            <p className="dp-studio-subtitle">
              Pāṇinian Derivation Engine, Voice &amp; Causative Studio, Paradigm Comparator &amp; Deconstructor
            </p>
          </div>
          {onGoBack && (
            <button type="button" className="grammar-back" onClick={onGoBack}>
              ← Back to Grammar Shelf
            </button>
          )}
        </div>

        {/* 6 Core Modes Switcher */}
        <nav className="dp-studio-nav" aria-label="Studio sub-modules">
          <button
            type="button"
            className={`dp-studio-tab${mode === 'generator' ? ' dp-studio-tab--active' : ''}`}
            onClick={() => setMode('generator')}
          >
            <span className="dp-tab-icon">⚙️</span>
            <span className="dp-tab-text">रूप-साधकम् (5-Lakāra Generator)</span>
          </button>
          <button
            type="button"
            className={`dp-studio-tab${mode === 'comparator' ? ' dp-studio-tab--active' : ''}`}
            onClick={() => setMode('comparator')}
          >
            <span className="dp-tab-icon">⚖️</span>
            <span className="dp-tab-text">तुलना-दर्शनम् (Comparator)</span>
          </button>
          <button
            type="button"
            className={`dp-studio-tab${mode === 'deconstructor' ? ' dp-studio-tab--active' : ''}`}
            onClick={() => setMode('deconstructor')}
          >
            <span className="dp-tab-icon">🔍</span>
            <span className="dp-tab-text">पद-विश्लेषणम् (Deconstructor)</span>
          </button>
          <button
            type="button"
            className={`dp-studio-tab${mode === 'quiz' ? ' dp-studio-tab--active' : ''}`}
            onClick={() => setMode('quiz')}
          >
            <span className="dp-tab-icon">🎮</span>
            <span className="dp-tab-text">प्रत्यय-अभ्यासः (Pratyaya Challenge)</span>
          </button>
          <button
            type="button"
            className={`dp-studio-tab${mode === 'library' ? ' dp-studio-tab--active' : ''}`}
            onClick={() => setMode('library')}
          >
            <span className="dp-tab-icon">📖</span>
            <span className="dp-tab-text">धातुपाठ-सूची (Root Library)</span>
          </button>
          <button
            type="button"
            className={`dp-studio-tab${mode === 'articles' ? ' dp-studio-tab--active' : ''}`}
            onClick={() => setMode('articles')}
          >
            <span className="dp-tab-icon">📜</span>
            <span className="dp-tab-text">सिद्धान्त-मञ्जरी (Articles)</span>
          </button>
        </nav>
      </header>

      {/* ================================================================= */}
      {/* MODE 1: 5-LAKĀRA CONJUGATION GENERATOR (रूप-साधकम्) */}
      {/* ================================================================= */}
      {mode === 'generator' && (
        <section className="dp-section" aria-label="5-Lakāra Conjugation Generator">
          <div className="dp-generator-controls">
            {/* Top selection bar */}
            <div className="dp-control-row">
              <label htmlFor="root-select" className="dp-control-label">
                Select Verbal Root (धातु):
              </label>
              <select
                id="root-select"
                className="dp-select"
                value={selectedDhatuId}
                onChange={(e) => handleRootChange(e.target.value)}
              >
                {dhatuLibrary.map((d) => (
                  <option key={d.id || d.devanagari} value={d.id || d.devanagari}>
                    {d.devanagari} ({d.transliteration}) — {d.meaning} [Gaṇa {d.gana || 1} · {d.padam || 'parasmaipada'}]
                  </option>
                ))}
              </select>

              {/* Compare Quick Button */}
              <button
                type="button"
                className="dp-tool-btn dp-tool-btn--compare"
                onClick={() => {
                  setCompDhatuIdA(currentDhatu.id || currentDhatu.devanagari);
                  setCompDhatuIdB(currentDhatu.id || currentDhatu.devanagari);
                  setCompCausativeA(false);
                  setCompCausativeB(true);
                  setCompVoiceA(selectedVoice);
                  setCompVoiceB('parasmaipada');
                  if (activeLakara !== 'krt') setCompLakara(activeLakara);
                  setMode('comparator');
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
                title="Compare this root against its causative or another root in the Comparator"
              >
                ⚖️ Compare in Studio
              </button>
            </div>

            {/* Voice & Causative Dual Controls */}
            <div className="dp-voice-causative-row">
              <div className="dp-voice-toggle-group" role="group" aria-label="Voice selection">
                <span className="dp-vc-label">पदम् (Voice):</span>
                <button
                  type="button"
                  className={`dp-voice-btn${selectedVoice === 'parasmaipada' ? ' dp-voice-btn--active' : ''}`}
                  onClick={() => setSelectedVoice('parasmaipada')}
                >
                  परस्मैपदम् (Active)
                </button>
                <button
                  type="button"
                  className={`dp-voice-btn${selectedVoice === 'atmanepada' ? ' dp-voice-btn--active' : ''}`}
                  onClick={() => setSelectedVoice('atmanepada')}
                >
                  आत्मनेपदम् (Middle / Reflexive)
                </button>
              </div>

              {/* Causative Switch */}
              <div className="dp-causative-switch-wrap">
                <button
                  type="button"
                  className={`dp-causative-toggle${isCausative ? ' dp-causative-toggle--active' : ''}`}
                  onClick={() => setIsCausative((prev) => !prev)}
                  aria-pressed={isCausative}
                >
                  <span className="dp-causative-icon">{isCausative ? '⚡' : '⚙️'}</span>
                  <span>{isCausative ? 'णिजन्तः (प्रेरणार्थक Active)' : 'णिच्-प्रत्ययः (Causative Engine)'}</span>
                </button>
              </div>
            </div>

            {/* Lakāra Navigation Tabs */}
            <div className="dp-lakara-tabs" role="tablist" aria-label="Select Lakāra or Participles">
              {LAKARAS.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  role="tab"
                  aria-selected={activeLakara === l.id}
                  className={`dp-lakara-tab${activeLakara === l.id ? ' dp-lakara-tab--active' : ''}`}
                  onClick={() => setActiveLakara(l.id)}
                >
                  <span className="dp-lakara-tab-sa">{l.nameSa}</span>
                  <span className="dp-lakara-tab-en">{l.nameEn.split(' ')[0]}</span>
                </button>
              ))}
              <button
                type="button"
                role="tab"
                aria-selected={activeLakara === 'krt'}
                className={`dp-lakara-tab${activeLakara === 'krt' ? ' dp-lakara-tab--active' : ''}`}
                onClick={() => setActiveLakara('krt')}
              >
                <span className="dp-lakara-tab-sa">कृदन्ताः (Participles)</span>
                <span className="dp-lakara-tab-en">क्त / तुमुन् / क्त्वा</span>
              </button>
            </div>
          </div>

          {/* Root Info Bar */}
          <div className="dp-root-infobar">
            <div className="dp-root-title">
              <span className="dp-root-bold">{currentDhatu.devanagari}</span>
              <span className="dp-root-iast">({currentDhatu.transliteration})</span>
              <span className="dp-root-tag">Gaṇa {currentDhatu.gana || 1} ({currentDhatu.gana_name || 'bhvādi'})</span>
              <span className="dp-root-tag">{currentDhatu.padam || 'parasmaipada'}</span>
              {currentDhatu.set_anit && <span className="dp-root-tag dp-root-tag--accent">{currentDhatu.set_anit}</span>}
              <button
                type="button"
                className="dp-audio-inline"
                onClick={() => playPronunciation(currentDhatu.devanagari)}
                title={`Listen to root ${currentDhatu.devanagari}`}
              >
                🔊
              </button>
            </div>
            <div className="dp-root-meaning">
              <strong>Meaning:</strong> {currentDhatu.meaning} {currentDhatu.meaning_hi ? `(${currentDhatu.meaning_hi})` : ''}
            </div>
          </div>

          {/* Causative Active Highlight Banner */}
          {isCausative && (
            <div className="dp-causative-banner">
              <div className="dp-cb-badge">णिजन्तः · प्रेरणार्थक रूपम्</div>
              <div className="dp-cb-formula">
                <strong>Pāṇinian Mutation:</strong> {currentDhatu.devanagari} + णिच् (इ) + शप् (अ) ➔ <strong>{causativeInfo.stem}</strong> + तिङ्-प्रत्ययाः
              </div>
              <div className="dp-cb-meaning">
                <strong>Meaning Shift:</strong> {causativeInfo.meaningEn} ({causativeInfo.meaningHi})
              </div>
              <div className="dp-cb-sutra">
                📜 {causativeInfo.sutra}
              </div>
            </div>
          )}

          {/* 3×3 Conjugation Table */}
          {activeLakara !== 'krt' && conjugationTable && activeLakaraInfo && (
            <>
            {playingAll && (
              <div
                ref={playAllBtnRef}
                className="dp-playback-bar dp-playback-bar--live"
                role="region"
                aria-label="Play all"
              >
                <button
                  type="button"
                  className="dp-playall dp-playall--active"
                  onClick={toggleLakaraPlayAll}
                  aria-pressed={true}
                  aria-label="Pause. Reads the nine forms in Sanskrit"
                >
                  ⏸ Pause
                </button>
              </div>
            )}
            <div className="dp-table-wrapper">
              <div className="dp-lakara-meta-banner">
                <div className="dp-lakara-title">
                  <strong>{activeLakaraInfo.nameSa}</strong>
                  <span className="dp-lakara-title-en">
                    ({activeLakaraInfo.nameEn}) · <em>{activeLakaraInfo.tenseCategory}</em>
                  </span>
                  <button
                    type="button"
                    className={`dp-playall dp-lakara-playall${playingAll ? ' dp-playall--active' : ''}`}
                    onClick={toggleLakaraPlayAll}
                    aria-pressed={playingAll}
                    aria-label={
                      playingAll
                        ? 'Pause. Reads the nine forms in Sanskrit'
                        : 'Play all nine forms in Sanskrit'
                    }
                  >
                    {playingAll ? '⏸ Pause' : '▶ Play all'}
                  </button>
                  <span className="dp-lakara-badge-voice">
                    {isCausative ? 'णिजन्तः (प्रेरणार्थक)' : selectedVoice === 'atmanepada' ? 'आत्मनेपदम्' : 'परस्मैपदम्'}
                  </span>
                </div>
                <div className="dp-lakara-meta-right">
                  <span className="dp-lakara-sutra">📜 {isCausative ? 'हेतुमति च (३.१.२६)' : activeLakaraInfo.paniniSutra}</span>
                  <div className="dp-table-actions">
                    <button
                      type="button"
                      className="dp-tool-btn"
                      onClick={handleCopyMarkdown}
                      title="Copy this 3×3 matrix in Markdown format"
                    >
                      📋 Copy Table
                    </button>
                    <button
                      type="button"
                      className="dp-tool-btn"
                      onClick={handlePrintWorksheet}
                      title="Print classroom study worksheet or save as PDF"
                    >
                      🖨️ Print Worksheet
                    </button>
                  </div>
                </div>
              </div>

              <div className="dp-table-scroll">
                <table className="dp-matrix-table" aria-label={`Conjugation of ${currentDhatu.devanagari} in ${activeLakaraInfo.nameSa}`}>
                  <thead>
                    <tr>
                      <th scope="col" style={{ width: '22%' }}>पुरुष (Person)</th>
                      {NUMBER_LABELS.map((num) => (
                        <th scope="col" key={num.sa} style={{ width: '26%' }}>
                          {num.sa}
                          <span className="dp-th-sub">{num.en}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {conjugationTable.map((row, pIdx) => (
                      <tr key={PERSON_LABELS[pIdx].sa}>
                        <th scope="row" className="dp-row-header">
                          {PERSON_LABELS[pIdx].sa}
                          <span className="dp-th-sub">{PERSON_LABELS[pIdx].en}</span>
                        </th>
                        {row.map((cell, nIdx) => {
                          const cellIndex = pIdx * 3 + nIdx;
                          const speaking = speakingIndex === cellIndex;
                          const personSentence = personNumberEnglish(currentDhatu, pIdx, nIdx).trim();
                          return (
                          <td
                            key={`${pIdx}-${nIdx}`}
                            className={`dp-cell${speaking ? ' dp-cell--speaking' : ''}`}
                            data-lakara-cell={cellIndex}
                            aria-current={speaking ? 'true' : undefined}
                          >
                            <div className="dp-cell-word-row">
                              <span className="dp-cell-word">{cell.full}</span>
                              <button
                                type="button"
                                className="dp-audio-mini"
                                onClick={() => speakLakaraCell(cellIndex)}
                                title={`Pronounce ${cell.full}`}
                                aria-label={`Pronounce ${cell.full}`}
                              >
                                🔊
                              </button>
                            </div>
                            <div className="dp-cell-meaning">{isCausative ? cell.meaningHi : personSentence}</div>
                            <div className="dp-cell-formula">
                              <span className="dp-f-root">{cell.rootPart}</span>
                              <span className="dp-f-suffix">+{cell.suffixPart}</span>
                            </div>
                          </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="dp-table-legend">
                <span>💡 <strong>Color Breakdown:</strong> <span className="dp-legend-root">Root / Stem (धातु/अङ्ग)</span> + <span className="dp-legend-suffix">Tiṅ Suffix (प्रत्यय)</span>. Tap 🔊 on any cell to hear that form in Sanskrit.</span>
              </div>
            </div>
            </>
          )}

          {/* Kṛt Participles Cards */}
          {activeLakara === 'krt' && krtParticiples && (
            <div className="dp-krt-container">
              <div className="dp-krt-header-row">
                <div>
                  <h4 className="dp-krt-title">
                    कृदन्ताः · Essential Verbal Participles for {currentDhatu.devanagari} {isCausative ? '(णिजन्तः)' : ''}
                  </h4>
                  <p className="dp-krt-subtitle">
                    Suffixes attached directly to verbal roots to form indeclinable gerunds, infinitives, and participles.
                  </p>
                </div>
                <button
                  type="button"
                  className="dp-tool-btn"
                  onClick={handlePrintWorksheet}
                >
                  🖨️ Print Participles Sheet
                </button>
              </div>

              <div className="dp-krt-grid">
                {krtParticiples.map((k) => (
                  <article key={k.suffixCode} className="dp-krt-card">
                    <div className="dp-krt-header">
                      <span className="dp-krt-suffix-pill">{k.suffixName}</span>
                      <button
                        type="button"
                        className="dp-audio-inline"
                        onClick={() => playPronunciation(k.devanagariForm)}
                        title={`Listen to ${k.devanagariForm}`}
                      >
                        🔊
                      </button>
                    </div>

                    <div className="dp-krt-form-display">
                      <span className="dp-krt-word">{k.devanagariForm}</span>
                    </div>

                    <div className="dp-krt-formula-line">
                      <span className="dp-f-root">{k.rootPart}</span> + <span className="dp-f-suffix">{k.suffixPart}</span> = <strong>{k.devanagariForm}</strong>
                    </div>

                    <div className="dp-krt-meanings">
                      <div><strong>English:</strong> {k.meaningEn}</div>
                      <div><strong>हिन्दी:</strong> {k.meaningHi}</div>
                    </div>

                    <div className="dp-krt-rule">
                      📜 {k.paniniRule}
                    </div>

                    <div className="dp-krt-example">
                      📖 {k.exampleSentence}
                      <div className="dp-krt-ex-sub">{k.exampleTranslation}</div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* ================================================================= */}
      {/* MODE 2: PARADIGM COMPARATOR (तुलना-दर्शनम्) */}
      {/* ================================================================= */}
      {mode === 'comparator' && (
        <section className="dp-section" aria-label="Verb Paradigm Comparator">
          <div className="dp-comparator-intro">
            <h3 className="dp-section-heading">
              ⚖️ तुलनात्मक-दर्शनम् · Side-by-Side Paradigm Comparator
            </h3>
            <p className="dp-section-desc">
              Compare any two roots, voice paradigms (Parasmaipada vs Ātmanepada), or Base vs Causative mutations (णिजन्तः) across all 5 Lakāras.
            </p>

            {/* Presets Row */}
            <div className="dp-comparator-presets">
              <span className="dp-presets-title">🌟 Quick Comparison Presets:</span>
              <div className="dp-preset-chips">
                {COMPARATOR_PRESETS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className="dp-preset-chip"
                    onClick={() => applyPreset(p)}
                    title={p.description}
                  >
                    <strong>{p.label}</strong>
                    <span className="dp-preset-chip-sub">{p.description.split(':')[1] || ''}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Lakāra Selector for Comparator */}
            <div className="dp-lakara-tabs" role="tablist" style={{ marginTop: '1rem' }}>
              {LAKARAS.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  role="tab"
                  aria-selected={compLakara === l.id}
                  className={`dp-lakara-tab${compLakara === l.id ? ' dp-lakara-tab--active' : ''}`}
                  onClick={() => setCompLakara(l.id)}
                >
                  <span className="dp-lakara-tab-sa">{l.nameSa}</span>
                  <span className="dp-lakara-tab-en">{l.nameEn.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Dual Setup Columns */}
          <div className="dp-comparator-grid">
            {/* Side A */}
            <div className="dp-comparator-panel dp-comparator-panel--a">
              <div className="dp-comp-panel-header">
                <span className="dp-panel-tag">Form A (पक्षः १)</span>
                <div className="dp-comp-select-group">
                  <select
                    className="dp-select dp-select--sm"
                    value={compDhatuIdA}
                    onChange={(e) => setCompDhatuIdA(e.target.value)}
                  >
                    {dhatuLibrary.map((d) => (
                      <option key={d.id || d.devanagari} value={d.id || d.devanagari}>
                        {d.devanagari} ({d.transliteration}) — {d.meaning}
                      </option>
                    ))}
                  </select>
                  <div className="dp-comp-toggles">
                    <select
                      className="dp-select dp-select--sm"
                      value={compVoiceA}
                      onChange={(e) => setCompVoiceA(e.target.value as VoiceType)}
                    >
                      <option value="parasmaipada">परस्मैपदम्</option>
                      <option value="atmanepada">आत्मनेपदम्</option>
                    </select>
                    <button
                      type="button"
                      className={`dp-comp-pill-btn${compCausativeA ? ' dp-comp-pill-btn--active' : ''}`}
                      onClick={() => setCompCausativeA((prev) => !prev)}
                    >
                      {compCausativeA ? '⚡ णिजन्तः' : 'कर्तरि (Base)'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Summary Pill A */}
              <div className="dp-comp-summary">
                <div className="dp-comp-summary-title">
                  <span className="dp-root-bold">{compDhatuA.devanagari}</span>
                  <span>({compDhatuA.transliteration})</span>
                  <span className="dp-root-tag">{compVoiceA}</span>
                  {compCausativeA && <span className="dp-root-tag dp-root-tag--accent">णिजन्तः</span>}
                </div>
                <div className="dp-comp-summary-sub">
                  {compCausativeA ? `to cause to ${compDhatuA.meaning}` : compDhatuA.meaning}
                </div>
              </div>

              {/* Matrix A */}
              <div className="dp-table-scroll">
                <table className="dp-matrix-table dp-matrix-table--compact">
                  <thead>
                    <tr>
                      <th>पुरुष</th>
                      {NUMBER_LABELS.map((n) => (
                        <th key={n.sa}>{n.sa}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {compTableA.map((row, pIdx) => (
                      <tr key={PERSON_LABELS[pIdx].sa}>
                        <th className="dp-row-header">{PERSON_LABELS[pIdx].sa}</th>
                        {row.map((cell) => (
                          <td key={cell.full} className="dp-cell">
                            <div className="dp-cell-word-row">
                              <span className="dp-cell-word">{cell.full}</span>
                              <button
                                type="button"
                                className="dp-audio-mini"
                                onClick={() => playPronunciation(cell.full)}
                              >
                                🔊
                              </button>
                            </div>
                            <div className="dp-cell-meaning">{cell.meaningHi}</div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Side B */}
            <div className="dp-comparator-panel dp-comparator-panel--b">
              <div className="dp-comp-panel-header">
                <span className="dp-panel-tag dp-panel-tag--b">Form B (पक्षः २)</span>
                <div className="dp-comp-select-group">
                  <select
                    className="dp-select dp-select--sm"
                    value={compDhatuIdB}
                    onChange={(e) => setCompDhatuIdB(e.target.value)}
                  >
                    {dhatuLibrary.map((d) => (
                      <option key={d.id || d.devanagari} value={d.id || d.devanagari}>
                        {d.devanagari} ({d.transliteration}) — {d.meaning}
                      </option>
                    ))}
                  </select>
                  <div className="dp-comp-toggles">
                    <select
                      className="dp-select dp-select--sm"
                      value={compVoiceB}
                      onChange={(e) => setCompVoiceB(e.target.value as VoiceType)}
                    >
                      <option value="parasmaipada">परस्मैपदम्</option>
                      <option value="atmanepada">आत्मनेपदम्</option>
                    </select>
                    <button
                      type="button"
                      className={`dp-comp-pill-btn${compCausativeB ? ' dp-comp-pill-btn--active' : ''}`}
                      onClick={() => setCompCausativeB((prev) => !prev)}
                    >
                      {compCausativeB ? '⚡ णिजन्तः' : 'कर्तरि (Base)'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Summary Pill B */}
              <div className="dp-comp-summary dp-comp-summary--b">
                <div className="dp-comp-summary-title">
                  <span className="dp-root-bold">{compDhatuB.devanagari}</span>
                  <span>({compDhatuB.transliteration})</span>
                  <span className="dp-root-tag">{compVoiceB}</span>
                  {compCausativeB && <span className="dp-root-tag dp-root-tag--accent">णिजन्तः</span>}
                </div>
                <div className="dp-comp-summary-sub">
                  {compCausativeB ? `to cause to ${compDhatuB.meaning}` : compDhatuB.meaning}
                </div>
              </div>

              {/* Matrix B */}
              <div className="dp-table-scroll">
                <table className="dp-matrix-table dp-matrix-table--compact">
                  <thead>
                    <tr>
                      <th>पुरुष</th>
                      {NUMBER_LABELS.map((n) => (
                        <th key={n.sa}>{n.sa}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {compTableB.map((row, pIdx) => (
                      <tr key={PERSON_LABELS[pIdx].sa}>
                        <th className="dp-row-header">{PERSON_LABELS[pIdx].sa}</th>
                        {row.map((cell) => (
                          <td key={cell.full} className="dp-cell">
                            <div className="dp-cell-word-row">
                              <span className="dp-cell-word">{cell.full}</span>
                              <button
                                type="button"
                                className="dp-audio-mini"
                                onClick={() => playPronunciation(cell.full)}
                              >
                                🔊
                              </button>
                            </div>
                            <div className="dp-cell-meaning">{cell.meaningHi}</div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Morphological Contrast Analysis Box */}
          <div className="dp-comparison-insight">
            <h4 className="dp-insight-title">📜 Pāṇinian Morphological Contrast Analysis</h4>
            <div className="dp-insight-grid">
              <div className="dp-insight-item">
                <strong>Current Lakāra:</strong> {compLakaraInfo?.nameSa} ({compLakaraInfo?.nameEn})
                <p>{compLakaraInfo?.description}</p>
              </div>
              <div className="dp-insight-item">
                <strong>Voice Distinction:</strong> {compVoiceA === compVoiceB ? 'Both sides share same voice' : `${compVoiceA} vs ${compVoiceB}`}
                <p>
                  {compVoiceA === 'parasmaipada' && compVoiceB === 'atmanepada'
                    ? 'Parasmaipada uses तिप्-तस्-झि suffixes (action fruit goes to other), while Ātmanepada uses त-आताम्-झ suffixes (fruit accrues to the agent).'
                    : 'Endings match the respective canonical paradigms in Pāṇini Aṣṭādhyāyī III.IV.78.'}
                </p>
              </div>
              <div className="dp-insight-item">
                <strong>Causative Status:</strong> {compCausativeA !== compCausativeB ? 'Base Active vs णिजन्तः (हेतुमण्णिच्)' : compCausativeA ? 'Both are Causative' : 'Both are Base Active'}
                <p>
                  {compCausativeA !== compCausativeB
                    ? 'Pāṇini Sūtra ३.१.२६ (हेतुमति च): In Causative verbs, the suffix णिच् (इ) triggers penultimate vowel lengthening (अ ➔ आ) or Guṇa (इ/उ/ऋ ➔ ए/ओ/अर्), followed by thematic affix शप् (अ).'
                    : 'Uniform agency across both verbal forms.'}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ================================================================= */}
      {/* MODE 3: WORD DECONSTRUCTOR (पद-विश्लेषणम्) */}
      {/* ================================================================= */}
      {mode === 'deconstructor' && (
        <section className="dp-section" aria-label="Word Deconstructor">
          <div className="dp-decon-searchbox">
            <h3 className="dp-section-heading">
              🔍 पद-विश्लेषणम् · Sanskrit Word Deconstruction Engine
            </h3>
            <p className="dp-section-desc">
              Type any Sanskrit verb or participle (or pick a sample below) to deconstruct it into its
              Pāṇinian formula: <strong>Root (धातु) + Vikaraṇa + Suffix (प्रत्यय)</strong>.
            </p>

            <form
              className="dp-decon-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleDeconstruct();
              }}
            >
              <input
                type="text"
                className="dp-decon-input"
                placeholder="Enter Sanskrit word, e.g. पाठयति, लभते, गत्वा, पठितुम्, अपठत्, लेखयति..."
                value={deconInput}
                onChange={(e) => setDeconInput(e.target.value)}
              />
              <button type="submit" className="dp-decon-submit">
                Analyze Word (विश्लेषणम्)
              </button>
            </form>

            {/* Categorized suggestions */}
            <div className="dp-decon-filters-row">
              <span className="dp-filter-sublabel">Category:</span>
              <button
                type="button"
                className={`dp-chip${deconFilter === 'all' ? ' dp-chip--active' : ''}`}
                onClick={() => setDeconFilter('all')}
              >
                All (सर्वाणि)
              </button>
              <button
                type="button"
                className={`dp-chip${deconFilter === 'popular' ? ' dp-chip--active' : ''}`}
                onClick={() => setDeconFilter('popular')}
              >
                🌟 School Core
              </button>
              <button
                type="button"
                className={`dp-chip${deconFilter === 'atmanepada' ? ' dp-chip--active' : ''}`}
                onClick={() => setDeconFilter('atmanepada')}
              >
                🔄 आत्मनेपदम्
              </button>
              <button
                type="button"
                className={`dp-chip${deconFilter === 'causative' ? ' dp-chip--active' : ''}`}
                onClick={() => setDeconFilter('causative')}
              >
                ⚡ णिजन्तः (Causatives)
              </button>
              <button
                type="button"
                className={`dp-chip${deconFilter === 'krt' ? ' dp-chip--active' : ''}`}
                onClick={() => setDeconFilter('krt')}
              >
                📜 कृदन्ताः (Participles)
              </button>
            </div>

            <div className="dp-suggestions-row">
              {visibleDeconWords.map((item) => (
                <button
                  type="button"
                  key={item.word}
                  className="dp-suggestion-chip"
                  onClick={() => handleSelectSuggestion(item.word)}
                >
                  <span className="dp-schip-word">{item.word}</span>
                  <span className="dp-schip-root">({item.root})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Deconstruction Result Card */}
          {deconResult && (
            <article className="dp-decon-card">
              <div className="dp-decon-header">
                <div>
                  <span className="dp-decon-badge">{deconResult.grammaticalLabel}</span>
                  <h4 className="dp-decon-result-word">
                    {deconResult.query}
                    <button
                      type="button"
                      className="dp-audio-inline"
                      onClick={() => playPronunciation(deconResult.query)}
                      title={`Listen to ${deconResult.query}`}
                    >
                      🔊
                    </button>
                  </h4>
                </div>
                <div className="dp-decon-translations">
                  <div className="dp-trans-en">
                    <strong>Meaning:</strong> {deconResult.englishTranslation}
                  </div>
                  <div className="dp-trans-hi">
                    <strong>हिन्दी:</strong> {deconResult.hindiTranslation}
                  </div>
                </div>
              </div>

              {/* Visual Formula Pill */}
              <div className="dp-formula-banner">
                <span className="dp-formula-tag">Pāṇinian Derivation Formula:</span>
                <div className="dp-formula-chips">
                  {deconResult.formula.prefix && (
                    <>
                      <span className="dp-chip-prefix">
                        उपसर्ग: {deconResult.formula.prefix}
                      </span>
                      <span className="dp-formula-op">+</span>
                    </>
                  )}
                  <span className="dp-chip-root">
                    धातु: {deconResult.formula.root}
                  </span>
                  {deconResult.formula.vikarana && (
                    <>
                      <span className="dp-formula-op">+</span>
                      <span className="dp-chip-vikarana">
                        विकरण: {deconResult.formula.vikarana}
                      </span>
                    </>
                  )}
                  <span className="dp-formula-op">+</span>
                  <span className="dp-chip-suffix">
                    प्रत्यय: {deconResult.formula.suffix}
                  </span>
                  <span className="dp-formula-arrow">➔</span>
                  <span className="dp-chip-result">{deconResult.formula.result}</span>
                </div>
              </div>

              {/* Linguistic Details Grid */}
              <div className="dp-decon-details-grid">
                <div className="dp-detail-col">
                  <strong>मूल-धातु (Verbal Root):</strong>
                  <div style={{ fontSize: '1.15rem', color: '#0f766e', fontWeight: 700, margin: '0.2rem 0' }}>
                    {deconResult.rootDevanagari} ({deconResult.rootIast})
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#57534e' }}>
                    Root meaning: {deconResult.rootMeaningEn} {deconResult.rootMeaningHi ? `(${deconResult.rootMeaningHi})` : ''}
                    {deconResult.gana ? ` · Gaṇa ${deconResult.gana}` : ''}
                  </div>
                </div>

                <div className="dp-detail-col">
                  <strong>Pāṇinian Rule / Sūtra Reference:</strong>
                  <div style={{ fontStyle: 'italic', color: '#92400e', marginTop: '0.2rem', fontSize: '0.92rem' }}>
                    {deconResult.paniniSutra || 'General Pāṇinian morphological synthesis'}
                  </div>
                  {deconResult.notes && (
                    <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.3rem' }}>
                      💡 {deconResult.notes}
                    </div>
                  )}
                </div>
              </div>

              {/* Example Usage Sentence */}
              <div className="dp-example-box">
                <div className="dp-example-sa">
                  📖 <strong>वाक्ये प्रयोगः (Example):</strong> {deconResult.exampleUsage}
                  <button
                    type="button"
                    className="dp-audio-inline"
                    onClick={() => playPronunciation(deconResult.exampleUsage)}
                    title="Listen to sentence"
                  >
                    🔊
                  </button>
                </div>
                <div className="dp-example-en">{deconResult.exampleMeaning}</div>
              </div>

              <div className="dp-card-actions">
                <button
                  type="button"
                  className="dp-action-btn"
                  onClick={() => {
                    const found = dhatuLibrary.find(
                      (d) => d.devanagari === deconResult.rootDevanagari
                    );
                    if (found?.id) setSelectedDhatuId(found.id);
                    if (deconResult.grammaticalLabel.includes('णिजन्तः')) {
                      setIsCausative(true);
                    } else {
                      setIsCausative(false);
                    }
                    if (deconResult.grammaticalLabel.includes('आत्मनेपदम्')) {
                      setSelectedVoice('atmanepada');
                    } else {
                      setSelectedVoice('parasmaipada');
                    }
                    setMode('generator');
                    window.scrollTo({ top: 120, behavior: 'smooth' });
                  }}
                >
                  ⚙️ View Complete 5-Lakāra Conjugation for {deconResult.rootDevanagari} →
                </button>

                <button
                  type="button"
                  className="dp-action-btn dp-action-btn--secondary"
                  onClick={() => {
                    const found = dhatuLibrary.find(
                      (d) => d.devanagari === deconResult.rootDevanagari
                    );
                    const rootId = found?.id || 'path';
                    setCompDhatuIdA(rootId);
                    setCompDhatuIdB(rootId);
                    setCompCausativeA(false);
                    setCompCausativeB(true);
                    setMode('comparator');
                    window.scrollTo({ top: 120, behavior: 'smooth' });
                  }}
                >
                  ⚖️ Compare {deconResult.rootDevanagari} in Comparator →
                </button>
              </div>
            </article>
          )}
        </section>
      )}

      {/* ================================================================= */}
      {/* MODE 4: PRATYAYA PRACTICE QUIZ (प्रत्यय-अभ्यासः) */}
      {/* ================================================================= */}
      {/* ================================================================= */}
      {mode === 'quiz' && (
        <section className="dp-section" aria-label="Interactive Pratyaya Challenge">
          {/* Quiz Category Filter */}
          <div className="dp-quiz-filter-row">
            <span className="dp-filter-sublabel">Topic:</span>
            <button
              type="button"
              className={`dp-chip${quizFilter === 'all' ? ' dp-chip--active' : ''}`}
              onClick={() => {
                setQuizFilter('all');
                setQuizIndex(0);
                setSelectedOption(null);
                setShowExplanation(false);
              }}
            >
              All Topics (15 Questions)
            </button>
            <button
              type="button"
              className={`dp-chip${quizFilter === 'lakara' ? ' dp-chip--active' : ''}`}
              onClick={() => {
                setQuizFilter('lakara');
                setQuizIndex(0);
                setSelectedOption(null);
                setShowExplanation(false);
              }}
            >
              5 Lakāras
            </button>
            <button
              type="button"
              className={`dp-chip${quizFilter === 'krt' ? ' dp-chip--active' : ''}`}
              onClick={() => {
                setQuizFilter('krt');
                setQuizIndex(0);
                setSelectedOption(null);
                setShowExplanation(false);
              }}
            >
              कृदन्ताः (Participles)
            </button>
            <button
              type="button"
              className={`dp-chip${quizFilter === 'causative' ? ' dp-chip--active' : ''}`}
              onClick={() => {
                setQuizFilter('causative');
                setQuizIndex(0);
                setSelectedOption(null);
                setShowExplanation(false);
              }}
            >
              णिजन्तः (Causatives)
            </button>
            <button
              type="button"
              className={`dp-chip${quizFilter === 'atmanepada' ? ' dp-chip--active' : ''}`}
              onClick={() => {
                setQuizFilter('atmanepada');
                setQuizIndex(0);
                setSelectedOption(null);
                setShowExplanation(false);
              }}
            >
              आत्मनेपदम् (Middle Voice)
            </button>
          </div>

          <div className="dp-quiz-card">
            <div className="dp-quiz-top-row">
              <span className="dp-quiz-badge">
                Question {quizIndex + 1} of {filteredQuizSet.length}
                <span className="dp-quiz-cat-pill">{currentQuestion.category.toUpperCase()}</span>
              </span>
              <span className="dp-quiz-score">
                Score: <strong>{score} / {quizIndex + (selectedOption !== null ? 1 : 0)}</strong>
              </span>
            </div>

            <h3 className="dp-quiz-prompt">{currentQuestion.prompt}</h3>
            <p className="dp-quiz-hi-prompt">{currentQuestion.hindiPrompt}</p>

            <div className="dp-quiz-formula-box">
              <span className="dp-quiz-formula-text">{currentQuestion.formula}</span>
            </div>

            <div className="dp-quiz-options-grid">
              {currentQuestion.options.map((opt) => {
                let btnStyle = 'dp-quiz-opt';
                if (selectedOption !== null) {
                  if (opt === currentQuestion.correctAnswer) {
                    btnStyle += ' dp-quiz-opt--correct';
                  } else if (opt === selectedOption) {
                    btnStyle += ' dp-quiz-opt--incorrect';
                  }
                }
                return (
                  <button
                    key={opt}
                    type="button"
                    className={btnStyle}
                    disabled={selectedOption !== null}
                    onClick={() => handleSelectQuizOption(opt)}
                  >
                    <span className="dp-quiz-opt-text">{opt}</span>
                    {selectedOption !== null && opt === currentQuestion.correctAnswer && (
                      <span className="dp-opt-icon">✓</span>
                    )}
                    {selectedOption !== null && opt === selectedOption && opt !== currentQuestion.correctAnswer && (
                      <span className="dp-opt-icon">✕</span>
                    )}
                  </button>
                );
              })}
            </div>

            {showExplanation && (
              <div className="dp-quiz-explanation-box">
                <div className="dp-exp-title">
                  {selectedOption === currentQuestion.correctAnswer
                    ? '🎉 साधु! Correct Answer!'
                    : '💡 Incorrect — Check Pāṇini Rule:'}
                </div>
                <p className="dp-exp-text">{currentQuestion.explanation}</p>
                <div className="dp-exp-example">
                  <strong>Example:</strong> {currentQuestion.example}
                  <button
                    type="button"
                    className="dp-audio-inline"
                    onClick={() => playPronunciation(currentQuestion.example)}
                    title="Listen to sentence"
                  >
                    🔊
                  </button>
                </div>
                <button
                  type="button"
                  className="dp-quiz-next-btn"
                  onClick={handleNextQuestion}
                >
                  {quizIndex < filteredQuizSet.length - 1 ? 'Next Question →' : 'Restart Challenge 🔄'}
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ================================================================= */}
      {/* MODE 5: DHĀTUPĀṬHA ROOT BROWSER & GAṆA LIBRARY */}
      {/* ================================================================= */}
      {mode === 'library' && (
        <section className="dp-section" aria-label="Dhātupāṭha Root Library">
          <div style={{ marginBottom: '1rem' }}>
            <h3 className="dp-section-heading">📖 धातुपाठ-सूची · Complete Canonical Library</h3>
            <p className="dp-section-desc">
              Browse 200+ authentic roots categorized across the 10 classical Gaṇas (भ्वादि, अदादि, जुहोत्यादि, etc.) with verified voice, CBSE essential filtering, and instant 5-Lakāra conjugation generation.
            </p>
          </div>
          <DhatupathaBrowser
            onSelectDhatu={(dhatuId, action) => {
              if (action === 'generator') {
                setSelectedDhatuId(dhatuId);
                const r = dhatuLibrary.find((d) => (d.id || '').toLowerCase() === dhatuId.toLowerCase() || d.devanagari === dhatuId);
                if (r?.padam === 'atmanepada') setSelectedVoice('atmanepada');
                else setSelectedVoice('parasmaipada');
                setIsCausative(false);
                setMode('generator');
              } else if (action === 'comparator') {
                setCompDhatuIdA(dhatuId);
                setCompDhatuIdB(dhatuId);
                setCompCausativeA(false);
                setCompCausativeB(true);
                setMode('comparator');
              } else if (action === 'deconstructor') {
                setDeconInput(dhatuId);
                handleDeconstruct(dhatuId);
                setMode('deconstructor');
              }
              window.scrollTo({ top: 120, behavior: 'smooth' });
            }}
          />
        </section>
      )}

      {/* ================================================================= */}
      {/* MODE 6: DESCRIPTIVE ARTICLES & GRAMMAR TREATISES */}
      {/* ================================================================= */}
      {mode === 'articles' && (
        <DhatupathaArticles
          onDeconstructWord={(word) => {
            setDeconInput(word);
            handleDeconstruct(word);
            setMode('deconstructor');
            window.scrollTo({ top: 100, behavior: 'smooth' });
          }}
          onGenerateDhatu={(dhatuId) => {
            setSelectedDhatuId(dhatuId);
            setMode('generator');
            window.scrollTo({ top: 100, behavior: 'smooth' });
          }}
        />
      )}
    </div>
  );
};

export default PaninianStudio;
