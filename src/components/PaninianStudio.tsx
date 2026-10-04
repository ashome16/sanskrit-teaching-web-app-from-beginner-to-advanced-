import React, { useEffect, useState, useMemo } from 'react';
import type { DhatuEntry } from '../types/linguistics';
import { loadDhatupatha } from '../utils/dhatupatha';
import { playPronunciation } from '../utils/pronunciation';
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
  onGoHome?: () => void;
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

const PaninianStudio: React.FC<PaninianStudioProps> = ({ onGoBack, onGoHome }) => {
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
  const [showVoiceLakaraGuide, setShowVoiceLakaraGuide] = useState(true);
  const [activeGuideTab, setActiveGuideTab] = useState<'voice' | 'causative' | 'lakaras' | 'krt'>('voice');
  const [selectedArticleId, setSelectedArticleId] = useState<string>('intro-dhatupatha');

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
          <div className="dp-studio-header-actions">
            <button
              type="button"
              className="dp-header-guide-btn"
              onClick={() => {
                setMode('generator');
                setShowVoiceLakaraGuide(true);
                setTimeout(() => {
                  const el = document.getElementById('morphology-guide-panel');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 50);
              }}
              title="Jump to the morphological explanation of Voice, Causative, Lakāras and Participles"
            >
              💡 Grammar Guide &amp; Explanations
            </button>
            {onGoBack && (
              <button
                type="button"
                className="grammar-back"
                onClick={onGoBack}
                title="Return to the main Grammar Articles & Masterclasses Shelf"
              >
                ← Back to Grammar Shelf
              </button>
            )}
            {onGoHome && (
              <button
                type="button"
                className="grammar-home"
                onClick={onGoHome}
                title="Return to Deepakam Lessons & Dashboard"
              >
                🏠 Home
              </button>
            )}
          </div>
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
                  onClick={() => {
                    setSelectedVoice('parasmaipada');
                    setActiveGuideTab('voice');
                  }}
                  title="Parasmaipadam: Active voice where action fruit goes to another (e.g. पठति, गच्छति)"
                >
                  परस्मैपदम् (Active)
                </button>
                <button
                  type="button"
                  className={`dp-voice-btn${selectedVoice === 'atmanepada' ? ' dp-voice-btn--active' : ''}`}
                  onClick={() => {
                    setSelectedVoice('atmanepada');
                    setActiveGuideTab('voice');
                  }}
                  title="Ātmanepadam: Middle/Reflexive voice where action fruit stays with oneself (e.g. लभते, वर्धते)"
                >
                  आत्मनेपदम् (Middle / Reflexive)
                </button>
              </div>

              {/* Causative Switch */}
              <div className="dp-causative-switch-wrap">
                <button
                  type="button"
                  className={`dp-causative-toggle${isCausative ? ' dp-causative-toggle--active' : ''}`}
                  onClick={() => {
                    setIsCausative((prev) => {
                      const next = !prev;
                      if (next) setActiveGuideTab('causative');
                      return next;
                    });
                  }}
                  aria-pressed={isCausative}
                  title="णिच्-प्रत्ययः: Causes another agent to perform the action (e.g. पाठयति = teaches/causes to read)"
                >
                  <span className="dp-causative-icon">{isCausative ? '⚡' : '⚙️'}</span>
                  <span>{isCausative ? 'णिजन्तः (प्रेरणार्थक Active)' : 'णिच्-प्रत्ययः (Causative Engine)'}</span>
                </button>
              </div>

              {/* Morphology Guide Trigger */}
              <button
                type="button"
                className={`dp-guide-trigger-btn${showVoiceLakaraGuide ? ' dp-guide-trigger-btn--active' : ''}`}
                onClick={() => setShowVoiceLakaraGuide((prev) => !prev)}
                aria-expanded={showVoiceLakaraGuide}
                title="Click to read detailed explanations of Voice, Causative, Lakāras, and Participles"
              >
                <span>💡</span>
                <span>{showVoiceLakaraGuide ? 'Hide Explanations' : 'Grammar Explanations'}</span>
              </button>
            </div>

            {/* Morphology Guide Panel */}
            {showVoiceLakaraGuide && (
              <div className="dp-morph-guide-panel" id="morphology-guide-panel">
                <div className="dp-mg-header">
                  <div className="dp-mg-title-wrap">
                    <span className="dp-mg-badge">Pāṇinian Morphological Guide</span>
                    <h4 className="dp-mg-title">Understanding Voice, Causatives, Lakāras &amp; Participles</h4>
                  </div>
                  <div className="dp-mg-tabs">
                    <button
                      type="button"
                      className={`dp-mg-tab-btn${activeGuideTab === 'voice' ? ' active' : ''}`}
                      onClick={() => setActiveGuideTab('voice')}
                    >
                      🗣️ पदम् (Voice)
                    </button>
                    <button
                      type="button"
                      className={`dp-mg-tab-btn${activeGuideTab === 'causative' ? ' active' : ''}`}
                      onClick={() => setActiveGuideTab('causative')}
                    >
                      ⚙️ णिच् (Causative)
                    </button>
                    <button
                      type="button"
                      className={`dp-mg-tab-btn${activeGuideTab === 'lakaras' ? ' active' : ''}`}
                      onClick={() => setActiveGuideTab('lakaras')}
                    >
                      ⏱️ ५ लकाराः (Tenses &amp; Moods)
                    </button>
                    <button
                      type="button"
                      className={`dp-mg-tab-btn${activeGuideTab === 'krt' ? ' active' : ''}`}
                      onClick={() => setActiveGuideTab('krt')}
                    >
                      📜 कृदन्ताः (Participles)
                    </button>
                  </div>
                </div>

                <div className="dp-mg-content">
                  {/* TAB 1: VOICE */}
                  {activeGuideTab === 'voice' && (
                    <div className="dp-mg-section">
                      <div className="dp-mg-grid-2">
                        <div className="dp-mg-card">
                          <div className="dp-mg-card-badge parasmaipada">Active Voice · परस्मैपदम्</div>
                          <h5 className="dp-mg-card-title">परस्मैपदम् (Parasmaipadam) — &quot;Word for Another&quot;</h5>
                          <p className="dp-mg-card-desc">
                            <strong>Etymology:</strong> <em>Parasmai</em> (for someone else) + <em>Padam</em> (word).
                          </p>
                          <p className="dp-mg-card-desc">
                            <strong>What it represents:</strong> An action whose result or fruit (<em>Kriyā-phala</em>) is directed outward or primarily benefits someone other than the agent, or standard direct actions.
                          </p>
                          <div className="dp-mg-card-formula">
                            <strong>Standard Tiṅ Suffixes:</strong> तिप्, तस्, झि... (ति, तः, अन्ति / सि, थः, थ / मि, वः, मः)
                          </div>
                          <div className="dp-mg-card-examples">
                            <strong>Examples:</strong>
                            <ul>
                              <li><strong>पठति (paṭhati):</strong> He reads/studies (general direct action).</li>
                              <li><strong>गच्छति (gacchati):</strong> He goes.</li>
                              <li><strong>पचति (pacati):</strong> Devadatta cooks rice for others (such as guests or family).</li>
                            </ul>
                          </div>
                        </div>

                        <div className="dp-mg-card">
                          <div className="dp-mg-card-badge atmanepada">Middle / Reflexive Voice · आत्मनेपदम्</div>
                          <h5 className="dp-mg-card-title">आत्मनेपदम् (Ātmanepadam) — &quot;Word for Oneself&quot;</h5>
                          <p className="dp-mg-card-desc">
                            <strong>Etymology:</strong> <em>Ātmane</em> (for oneself) + <em>Padam</em> (word).
                          </p>
                          <p className="dp-mg-card-desc">
                            <strong>What it represents:</strong> An action whose consequence, psychological experience, or fruit stays with or affects the doer (Pāṇini 1.3.72: <em>स्वरितञितः कर्त्रभिप्राये क्रियाफले</em>). Used for reflexive actions, internal feelings, receiving, and passive voice.
                          </p>
                          <div className="dp-mg-card-formula">
                            <strong>Standard Tiṅ Suffixes:</strong> त, आताम्, झ... (ते, एते, अन्ते / से, येथे, ध्वे / ए, वहे, महे)
                          </div>
                          <div className="dp-mg-card-examples">
                            <strong>Examples:</strong>
                            <ul>
                              <li><strong>लभते (labhate):</strong> He obtains / gains for himself.</li>
                              <li><strong>वर्धते (vardhate):</strong> He grows / thrives internally.</li>
                              <li><strong>मोदते (modate):</strong> He rejoices / feels delight.</li>
                              <li><strong>पचते (pacate):</strong> Devadatta cooks rice for his own consumption.</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="dp-mg-note-box">
                        <strong>💡 उभयपदम् (Ubhayapadam - Dual Voice Roots):</strong> Many roots (e.g. <em>कृ, पच्, याच्, भुज्</em>) can conjugate in BOTH voices. In classical Sanskrit, a speaker intentionally chooses Parasmaipada when performing an action for others, and Ātmanepada when doing it for themselves (e.g., <em>करोति</em> = does for someone else vs. <em>कुरुते</em> = does for oneself; <em>यजति</em> = priests offering for a patron vs. <em>यजते</em> = patron offering for own spiritual merit).
                      </div>

                      <div className="dp-mg-treatise-link-wrap">
                        <button
                          type="button"
                          className="dp-mg-treatise-btn"
                          onClick={() => {
                            setSelectedArticleId('pada-vyavastha');
                            setMode('articles');
                            window.scrollTo({ top: 100, behavior: 'smooth' });
                          }}
                        >
                          📖 Read In-Depth Treatise on पद-व्यवस्था (Voice Architecture) ➔
                        </button>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: CAUSATIVE ENGINE */}
                  {activeGuideTab === 'causative' && (
                    <div className="dp-mg-section">
                      <div className="dp-mg-card">
                        <div className="dp-mg-card-badge causative">Causative Engine · णिजन्तः / हेतुमण्णिच्</div>
                        <h5 className="dp-mg-card-title">णिच्-प्रत्ययः (Ṇic Suffix) — Inducing Another to Act</h5>
                        <p className="dp-mg-card-desc">
                          <strong>Pāṇini Sūtra:</strong> <em>हेतुमति च (३.१.२६)</em> — When an agent (प्रयोजक कर्ता) prompts, commands, inspires, or causes another agent (प्रयोज्य कर्ता) to perform the action, the affix <strong>णिच्</strong> is appended to the verbal root.
                        </p>
                        <div className="dp-mg-card-formula">
                          <strong>Pāṇinian Derivation Formula:</strong><br />
                          Root + णिच् (leaves <em>i</em>) + Vikaraṇa शप् (<em>a</em>) ➔ <strong>Causative Base in <em>-aya-</em></strong> + Tiṅ terminations
                        </div>

                        <div className="dp-mg-subheading">Vowel Strengthening Rules in Causatives:</div>
                        <div className="dp-mg-grid-3">
                          <div className="dp-mg-subcard">
                            <span className="dp-mg-sc-title">1. Final Vowels ➔ Vṛddhi</span>
                            <p>Roots ending in vowels undergo maximum lengthening (Vṛddhi):</p>
                            <code>कृ ➔ कारयति (causes to do)</code><br />
                            <code>नी ➔ नाययति (causes to lead)</code><br />
                            <code>भू ➔ भावयति (causes to be / manifests)</code>
                          </div>
                          <div className="dp-mg-subcard">
                            <span className="dp-mg-sc-title">2. Medial Short &#39;a&#39; ➔ Vṛddhi (ā)</span>
                            <p>Penultimate short &#39;a&#39; lengthens into &#39;ā&#39;:</p>
                            <code>पठ् ➔ पाठयति (causes to read / teaches)</code><br />
                            <code>चल् ➔ चालयति (drives / causes to move)</code><br />
                            <code>खाद् ➔ खादयति (feeds / causes to eat)</code>
                          </div>
                          <div className="dp-mg-subcard">
                            <span className="dp-mg-sc-title">3. Medial i, u, ṛ ➔ Guṇa</span>
                            <p>Short medial vowels upgrade to their Guṇa grade:</p>
                            <code>लिख् ➔ लेखयति (causes to write)</code><br />
                            <code>बुध् ➔ बोधयति (awakens / causes to know)</code><br />
                            <code>दृश् ➔ दर्शयति (shows / causes to see)</code>
                          </div>
                        </div>

                        <div className="dp-mg-contrast-table-wrap">
                          <strong>Side-by-Side Comparison: Basic vs. Causative</strong>
                          <table className="dp-mg-table">
                            <thead>
                              <tr>
                                <th>Basic Root &amp; Form</th>
                                <th>Meaning</th>
                                <th>Causative Form (णिजन्तः)</th>
                                <th>Causative Meaning</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td><strong>पठति</strong> (paṭhati)</td>
                                <td>He reads / studies</td>
                                <td><strong>पाठयति</strong> (pāṭhayati)</td>
                                <td>He teaches / causes to read</td>
                              </tr>
                              <tr>
                                <td><strong>गच्छति</strong> (gacchati)</td>
                                <td>He goes</td>
                                <td><strong>गमयति</strong> (gamayati)</td>
                                <td>He leads / sends / causes to go</td>
                              </tr>
                              <tr>
                                <td><strong>पश्यति</strong> (paśyati)</td>
                                <td>He sees</td>
                                <td><strong>दर्शयति</strong> (darśayati)</td>
                                <td>He shows / reveals / displays</td>
                              </tr>
                              <tr>
                                <td><strong>करोति</strong> (karoti)</td>
                                <td>He does / makes</td>
                                <td><strong>कारयति</strong> (kārayati)</td>
                                <td>He gets done / causes to make</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div className="dp-mg-treatise-link-wrap">
                          <button
                            type="button"
                            className="dp-mg-treatise-btn"
                            onClick={() => {
                              setSelectedArticleId('verb-machine-deconstruction');
                              setMode('articles');
                              window.scrollTo({ top: 100, behavior: 'smooth' });
                            }}
                          >
                            📖 Read In-Depth Treatise on Verb Machine &amp; Causatives (हेतुमण्णिच्) ➔
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: THE 5 LAKARAS */}
                  {activeGuideTab === 'lakaras' && (
                    <div className="dp-mg-section">
                      <div className="dp-mg-intro">
                        <strong>Why are they called लकार (Lakāra)?</strong> In Pāṇinian grammar, all 10 Sanskrit tense and mood markers begin with the letter <strong>ल् (L)</strong>. The 5 core Lakāras represent the fundamental temporal and modal spectrum of Sanskrit expression:
                      </div>

                      <div className="dp-mg-lakara-grid">
                        {/* Lat */}
                        <div className="dp-mg-lakara-card">
                          <div className="dp-mg-lc-badge">१. लट्-लकारः · Present Tense</div>
                          <h5 className="dp-mg-lc-title">लट् (Laṭ) — Present Indicative (वर्तमान काल)</h5>
                          <div className="dp-mg-lc-sutra">📜 वर्तमाने लट् (३.२.१२३)</div>
                          <p className="dp-mg-lc-desc">
                            <strong>What it represents:</strong> Actions currently in progress, habitual everyday routines, or universal timeless truths happening in present time.
                          </p>
                          <div className="dp-mg-lc-example">
                            <strong>Example:</strong> सः ग्रन्थं पठति। (He reads the text.) / सूर्यः प्रकाशते। (The sun shines.)
                          </div>
                        </div>

                        {/* Lrt */}
                        <div className="dp-mg-lakara-card">
                          <div className="dp-mg-lc-badge">२. लृट्-लकारः · Future Tense</div>
                          <h5 className="dp-mg-lc-title">लृट् (Lṛṭ) — Simple Future (भविष्यत् काल)</h5>
                          <div className="dp-mg-lc-sutra">📜 लृट् शेषे च (३.३.१३)</div>
                          <p className="dp-mg-lc-desc">
                            <strong>What it represents:</strong> General future actions that will take place later (tomorrow, next year, or in future time). Distinctive marker: the <em>-sya- / -iṣya-</em> infix.
                          </p>
                          <div className="dp-mg-lc-example">
                            <strong>Example:</strong> वयं श्वः गमिष्यामः। (We will go tomorrow.) / ज्ञानं लप्स्यते। (He will attain knowledge.)
                          </div>
                        </div>

                        {/* Lang */}
                        <div className="dp-mg-lakara-card">
                          <div className="dp-mg-lc-badge">३. लङ्-लकारः · Past Imperfect</div>
                          <h5 className="dp-mg-lc-title">लङ् (Laṅ) — Past Imperfect (अनद्यतन-भूतकाल)</h5>
                          <div className="dp-mg-lc-sutra">📜 अनद्यतने लङ् (३.२.१११)</div>
                          <p className="dp-mg-lc-desc">
                            <strong>What it represents:</strong> Historical or narrative past actions that took place prior to today (<em>an-adyatana</em> = not of today). Characterized by the augment prefix <strong>अ-</strong> (अडागम) before the root.
                          </p>
                          <div className="dp-mg-lc-example">
                            <strong>Example:</strong> रामः वनम् अगच्छत्। (Rama went to the forest.) / शिष्यः पाठम् अपठत्। (The student read the lesson.)
                          </div>
                        </div>

                        {/* Lot */}
                        <div className="dp-mg-lakara-card">
                          <div className="dp-mg-lc-badge">४. लोट्-लकारः · Imperative Mood</div>
                          <h5 className="dp-mg-lc-title">लोट् (Loṭ) — Imperative &amp; Benedictive (आज्ञा / प्रार्थना)</h5>
                          <div className="dp-mg-lc-sutra">📜 लोट् च (३.३.१६२)</div>
                          <p className="dp-mg-lc-desc">
                            <strong>What it represents:</strong> Orders, commands, polite requests, permissions, invitations, and auspicious blessings (&quot;let him do&quot;, &quot;please do&quot;, &quot;may it be so&quot;).
                          </p>
                          <div className="dp-mg-lc-example">
                            <strong>Example:</strong> त्वं सत्यं वद। (Speak the truth!) / सर्वे भवन्तु सुखिनः। (May all beings be happy!)
                          </div>
                        </div>

                        {/* Vidhiling */}
                        <div className="dp-mg-lakara-card full-width">
                          <div className="dp-mg-lc-badge">५. विधिलिङ्-लकारः · Potential / Optative</div>
                          <h5 className="dp-mg-lc-title">विधिलिङ् (Vidhiliṅ) — Potential &amp; Duty (विधि / सम्भावना / कर्तव्यम्)</h5>
                          <div className="dp-mg-lc-sutra">📜 विधिनिमन्त्रणामन्त्रणाधीष्टसंप्रश्नप्रार्थनेषु लिङ् (३.३.१६१)</div>
                          <p className="dp-mg-lc-desc">
                            <strong>What it represents:</strong> Moral prescription, ethical duty (&quot;should / ought to&quot;), possibility, hypothetical scenarios, and polite advice. Distinctive marker: the modal vowel <em>-e-</em> (or <em>-ī-</em> in Ātmanepada).
                          </p>
                          <div className="dp-mg-lc-example">
                            <strong>Example:</strong> छात्रः प्रतिदिनं पठेत्। (A student ought to study daily.) / धर्मेण वर्धेत। (One should prosper by righteousness.)
                          </div>
                        </div>
                      </div>

                      <div className="dp-mg-treatise-link-wrap">
                        <button
                          type="button"
                          className="dp-mg-treatise-btn"
                          onClick={() => {
                            setSelectedArticleId('pancha-lakaras');
                            setMode('articles');
                            window.scrollTo({ top: 100, behavior: 'smooth' });
                          }}
                        >
                          📖 Read In-Depth Treatise on पञ्चलकाराः (The 5 Core Tenses &amp; Moods) ➔
                        </button>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: KRT PARTICIPLES */}
                  {activeGuideTab === 'krt' && (
                    <div className="dp-mg-section">
                      <div className="dp-mg-intro">
                        <strong>What is a कृदन्तः (Kṛdanta)?</strong> Unlike <em>Tiṅ-anta</em> finite verbs (which conjugate by 1st, 2nd, 3rd person like <em>paṭhati</em>), <strong>कृदन्ताः</strong> are primary verbal suffixes attached directly to roots to create <strong>verbal adjectives, participles, infinitives, and gerunds</strong>. They either decline through 7 cases, 3 genders, and 3 numbers, or function as indeclinables (अव्यय).
                      </div>

                      <div className="dp-mg-krt-grid">
                        {/* Kta */}
                        <div className="dp-mg-krt-card">
                          <span className="dp-mg-kc-badge">Past Passive / Active</span>
                          <h5 className="dp-mg-kc-title">१. क्त (Kta) — Completed Past Participle</h5>
                          <div className="dp-mg-kc-sutra">📜 क्तक्तवतू निष्ठा (१.१.२६)</div>
                          <p className="dp-mg-kc-desc">
                            <strong>What it represents:</strong> Completed past action. Passive for transitive verbs (&quot;done, read&quot;); active for intransitive motion verbs (&quot;gone, arrived&quot;). Declines like <em>Rāma / Latā / Phalam</em>.
                          </p>
                          <div className="dp-mg-kc-example">
                            <code>कृतः / कृता / कृतम् (done)</code><br />
                            <code>पठितम् पुस्तकम् (the book that was read)</code><br />
                            <code>रामः वनं गतः (Rama has gone to the forest)</code>
                          </div>
                        </div>

                        {/* Ktavatu */}
                        <div className="dp-mg-krt-card">
                          <span className="dp-mg-kc-badge">Past Active Participle</span>
                          <h5 className="dp-mg-kc-title">२. क्तवतु (Ktavatu) — Past Active Participle</h5>
                          <div className="dp-mg-kc-sutra">📜 क्तक्तवतू निष्ठा (१.१.२६)</div>
                          <p className="dp-mg-kc-desc">
                            <strong>What it represents:</strong> Completed past action in active voice, directly qualifying the nominative agent (&quot;he who did / having done&quot;). Ends in <em>-vān</em> (Masc) and <em>-vatī</em> (Fem).
                          </p>
                          <div className="dp-mg-kc-example">
                            <code>पठितवान् (he read) / पठितवती (she read)</code><br />
                            <code>कृतवान् (he did) / गतवान् (he went)</code>
                          </div>
                        </div>

                        {/* Tumun */}
                        <div className="dp-mg-krt-card">
                          <span className="dp-mg-kc-badge">Infinitive of Purpose</span>
                          <h5 className="dp-mg-kc-title">३. तुमुन् (Tumun) — Infinitive (&quot;In Order To&quot;)</h5>
                          <div className="dp-mg-kc-sutra">📜 तुमुन्ण्वुलौ क्रियायां क्रियार्थायाम् (३.३.१०)</div>
                          <p className="dp-mg-kc-desc">
                            <strong>What it represents:</strong> Purpose of action (&quot;in order to do&quot;, &quot;to read&quot;). Ends in <em>-tum</em> and is an indeclinable (अव्यय).
                          </p>
                          <div className="dp-mg-kc-example">
                            <code>पठितुम् (in order to read)</code><br />
                            <code>गन्तुम् (in order to go) / कर्तुम् (in order to do)</code><br />
                            <code>सः पठितुं गच्छति। (He goes in order to study.)</code>
                          </div>
                        </div>

                        {/* Ktva / Lyap */}
                        <div className="dp-mg-krt-card">
                          <span className="dp-mg-kc-badge">Gerund / Absolutive</span>
                          <h5 className="dp-mg-kc-title">४. क्त्वा / ल्यप् (Ktvā / Lyap) — &quot;Having Done&quot;</h5>
                          <div className="dp-mg-kc-sutra">📜 समानकर्तृकयोः पूर्वकाले (३.४.२१)</div>
                          <p className="dp-mg-kc-desc">
                            <strong>What it represents:</strong> Prior action completed by the same subject before another action (&quot;having read, he goes home&quot;). <strong>क्त्वा</strong> is used without prefixes; with prefixes (Upasargas), it mutates into <strong>ल्यप्</strong>. Both are indeclinables (अव्यय).
                          </p>
                          <div className="dp-mg-kc-example">
                            <code>पठित्वा (having read) / गत्वा (having gone)</code><br />
                            <code>आगत्य (having arrived) / प्रणम्य (having bowed)</code>
                          </div>
                        </div>

                        {/* Shatr */}
                        <div className="dp-mg-krt-card">
                          <span className="dp-mg-kc-badge">Present Continuous (Parasmaipada)</span>
                          <h5 className="dp-mg-kc-title">५. शतृ (Śatṛ) — Present Active Participle</h5>
                          <div className="dp-mg-kc-sutra">📜 लटः शतृशानचावप्रथमासमानाधिकरणे (३.२.१२४)</div>
                          <p className="dp-mg-kc-desc">
                            <strong>What it represents:</strong> Ongoing simultaneous action in the present for Parasmaipada roots (&quot;while doing / -ing&quot;). Ends in <em>-an</em> (Masc) and <em>-atī / -antī</em> (Fem).
                          </p>
                          <div className="dp-mg-kc-example">
                            <code>पठन् (while reading) / गच्छन् (while walking)</code><br />
                            <code>बालकः हसन् वदति। (The boy speaks while laughing.)</code>
                          </div>
                        </div>

                        {/* Shanac */}
                        <div className="dp-mg-krt-card">
                          <span className="dp-mg-kc-badge">Present Continuous (Ātmanepada)</span>
                          <h5 className="dp-mg-kc-title">६. शानच् (Śānac) — Present Middle / Passive Participle</h5>
                          <div className="dp-mg-kc-sutra">📜 लटः शतृशानचौ (३.२.१२४)</div>
                          <p className="dp-mg-kc-desc">
                            <strong>What it represents:</strong> Ongoing simultaneous action in the present for Ātmanepada and Passive verbs (&quot;while experiencing / being done&quot;). Ends in <em>-māna</em>.
                          </p>
                          <div className="dp-mg-kc-example">
                            <code>लभमानः (while obtaining) / मोदमानः (rejoicing)</code><br />
                            <code>क्रियमाणं कार्यम् (the work currently being done)</code>
                          </div>
                        </div>

                        {/* Tavyat / Aniyar */}
                        <div className="dp-mg-krt-card full-width">
                          <span className="dp-mg-kc-badge">Gerundive of Obligation</span>
                          <h5 className="dp-mg-kc-title">७. तव्यत् / अनीयर् (Tavyat / Anīyar) — Duty &amp; Necessity</h5>
                          <div className="dp-mg-kc-sutra">📜 तव्यत्तव्यानीयरः (३.१.९६)</div>
                          <p className="dp-mg-kc-desc">
                            <strong>What it represents:</strong> Moral necessity, fitness, or obligation (&quot;ought to be done&quot;, &quot;worthy of being studied&quot;, &quot;must be observed&quot;). Decline like nouns/adjectives in all 3 genders.
                          </p>
                          <div className="dp-mg-kc-example">
                            <code>कर्तव्यम् / करणीयम् (duty / that which ought to be done)</code><br />
                            <code>पठितव्यः / पठनीयः ग्रन्थः (a book worthy of being read)</code><br />
                            <code>सत्यं वदितव्यम्। (Truth must be spoken.)</code>
                          </div>
                        </div>
                      </div>

                      <div className="dp-mg-treatise-link-wrap">
                        <button
                          type="button"
                          className="dp-mg-treatise-btn"
                          onClick={() => {
                            setSelectedArticleId('krt-pratyayas-guide');
                            setMode('articles');
                            window.scrollTo({ top: 100, behavior: 'smooth' });
                          }}
                        >
                          📖 Read In-Depth Treatise on कृत्-प्रत्यय-मार्गदर्शिका (Primary Participles) ➔
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Lakāra Navigation Tabs */}
            <div className="dp-lakara-tabs" role="tablist" aria-label="Select Lakāra or Participles">
              {LAKARAS.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  role="tab"
                  aria-selected={activeLakara === l.id}
                  className={`dp-lakara-tab${activeLakara === l.id ? ' dp-lakara-tab--active' : ''}`}
                  onClick={() => {
                    setActiveLakara(l.id);
                    setActiveGuideTab('lakaras');
                  }}
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
                onClick={() => {
                  setActiveLakara('krt');
                  setActiveGuideTab('krt');
                }}
              >
                <span className="dp-lakara-tab-sa">कृदन्ताः (Participles)</span>
                <span className="dp-lakara-tab-en">क्त / तुमुन् / क्त्वा</span>
              </button>
            </div>

            {/* Contextual Active Selection Pill */}
            <div className="dp-active-context-pill">
              <span className="dp-ac-icon">👉</span>
              <div className="dp-ac-content">
                {activeLakara === 'lat' && (
                  <span><strong>लट्-लकारः (Present Indicative):</strong> Ongoing, habitual, or universal present actions happening right now (<em>वर्तमाने लट् ३.२.१२३</em>). Suffixes: -ति, -तः, -अन्ति...</span>
                )}
                {activeLakara === 'lrt' && (
                  <span><strong>लृट्-लकारः (Simple Future):</strong> General future actions that will take place in subsequent time (<em>लृट् शेषे च ३.३.१३</em>). Infix: <em>-sya- / -iṣya-</em>.</span>
                )}
                {activeLakara === 'lang' && (
                  <span><strong>लङ्-लकारः (Past Imperfect):</strong> Narrative past actions not of today (<em>अनद्यतने लङ् ३.२.१११</em>), taking the augment prefix <strong>अ-</strong> (अडागम).</span>
                )}
                {activeLakara === 'lot' && (
                  <span><strong>लोट्-लकारः (Imperative / Benedictive):</strong> Commands, directions, polite requests, permissions, and blessings (<em>लोट् च ३.३.१६२</em>).</span>
                )}
                {activeLakara === 'vidhiling' && (
                  <span><strong>विधिलिङ्-लकारः (Potential / Optative):</strong> Ethical duty, moral advice, &#39;should / ought to&#39;, and possibility (<em>३.३.१६१</em>), taking modal infix <em>-e-</em>.</span>
                )}
                {activeLakara === 'krt' && (
                  <span><strong>कृदन्ताः (Participles):</strong> Primary verbal adjectives, gerunds, and infinitives derived directly from roots (क्त, क्तवतु, तुमुन्, क्त्वा, ल्यप्, शतृ, शानच्, तव्यत्, अनीयर्).</span>
                )}
              </div>
              <div className="dp-ac-actions">
                <button
                  type="button"
                  className="dp-ac-guide-btn"
                  onClick={() => {
                    setShowVoiceLakaraGuide(true);
                    if (activeLakara === 'krt') setActiveGuideTab('krt');
                    else setActiveGuideTab('lakaras');
                    setTimeout(() => {
                      const el = document.getElementById('morphology-guide-panel');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                  }}
                  title="View full explanation and sūtra"
                >
                  📖 View Rule
                </button>
                <span className="dp-ac-voice-tag">
                  {isCausative ? '⚡ Causative (णिजन्तः)' : selectedVoice === 'atmanepada' ? '🛡️ Ātmanepada (Middle)' : '⚔️ Parasmaipada (Active)'}
                </span>
              </div>
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
            <div className="dp-table-wrapper">
              <div className="dp-lakara-meta-banner">
                <div>
                  <strong>{activeLakaraInfo.nameSa}</strong> ({activeLakaraInfo.nameEn}) · <em>{activeLakaraInfo.tenseCategory}</em>
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
                        {row.map((cell) => (
                          <td key={cell.full} className="dp-cell">
                            <div className="dp-cell-word-row">
                              <span className="dp-cell-word">{cell.full}</span>
                              <button
                                type="button"
                                className="dp-audio-mini"
                                onClick={() => playPronunciation(cell.full)}
                                title={`Pronounce ${cell.full}`}
                              >
                                🔊
                              </button>
                            </div>
                            <div className="dp-cell-meaning">{cell.meaningHi}</div>
                            <div className="dp-cell-formula">
                              <span className="dp-f-root">{cell.rootPart}</span>
                              <span className="dp-f-suffix">+{cell.suffixPart}</span>
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="dp-table-legend">
                <span>💡 <strong>Color Breakdown:</strong> <span className="dp-legend-root">Root / Stem (धातु/अङ्ग)</span> + <span className="dp-legend-suffix">Tiṅ Suffix (प्रत्यय)</span>. Tap 🔊 on any cell to hear authentic Sanskrit pronunciation.</span>
              </div>
            </div>
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
          initialArticleId={selectedArticleId}
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
