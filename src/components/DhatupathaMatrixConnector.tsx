import React, { useState, useMemo } from 'react';
import {
  MATRIX_ROOTS,
  MATRIX_PUZZLE_CHALLENGES,
  type MatrixRootItem,
  type VerbConjugationBlock,
} from '../data/dhatupathaMatrixData';
import { playPronunciation, stopPronunciation } from '../utils/pronunciation';
import { soundEffects } from '../utils/soundEffects';
import { transliterateSanskrit, type IndicScript } from '../utils/indicTransliteration';
import '../styles/dhatupatha-matrix.css';

interface DhatupathaMatrixConnectorProps {
  onSelectWord?: (word: string) => void;
  onGoHome?: () => void;
}

type MatrixMode = 'forge' | 'challenge';
type PersonKey = 'prathama' | 'madhyama' | 'uttama';
type NumberKey = 'singular' | 'dual' | 'plural';
type LearnLanguage = 'en' | 'ta' | 'ml';

export const DhatupathaMatrixConnector: React.FC<DhatupathaMatrixConnectorProps> = ({
  onSelectWord,
}) => {
  const [mode, setMode] = useState<MatrixMode>('challenge'); // Start with challenge puzzle arena as requested!

  // Multilingual medium & script state
  const [learnLang, setLearnLang] = useState<LearnLanguage>(() => {
    try {
      const saved = localStorage.getItem('sanskrit_learn_lang');
      if (saved === 'ta' || saved === 'ml' || saved === 'en') return saved;
    } catch {
      // ignore
    }
    return 'en';
  });

  const [displayScript, setDisplayScript] = useState<IndicScript>(() => {
    try {
      const saved = localStorage.getItem('sanskrit_display_script');
      if (saved === 'devanagari' || saved === 'tamil' || saved === 'malayalam') return saved;
    } catch {
      // ignore
    }
    return 'devanagari';
  });

  const handleSetLearnLang = (lang: LearnLanguage) => {
    setLearnLang(lang);
    try {
      localStorage.setItem('sanskrit_learn_lang', lang);
    } catch {
      // ignore
    }
    // Auto-adjust script for seamless natural reading
    if (lang === 'ta' && displayScript === 'devanagari') {
      setDisplayScript('tamil');
      try { localStorage.setItem('sanskrit_display_script', 'tamil'); } catch {}
    } else if (lang === 'ml' && displayScript === 'devanagari') {
      setDisplayScript('malayalam');
      try { localStorage.setItem('sanskrit_display_script', 'malayalam'); } catch {}
    }
  };

  const handleSetDisplayScript = (script: IndicScript) => {
    setDisplayScript(script);
    try {
      localStorage.setItem('sanskrit_display_script', script);
    } catch {
      // ignore
    }
  };

  // Transliteration helper for Sanskrit forms
  const tr = (text: string) => transliterateSanskrit(text, displayScript);

  // Forge Mode State
  const [selectedRootId, setSelectedRootId] = useState<string>('garj');
  const [person, setPerson] = useState<PersonKey>('prathama');
  const [selectedNumber, setSelectedNumber] = useState<NumberKey>('singular');

  // Challenge Mode State (20 fresh items)
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [selectedAffix, setSelectedAffix] = useState<string | null>(null);
  const [challengeResult, setChallengeResult] = useState<'correct' | 'wrong' | null>(null);
  const [showHint, setShowHint] = useState(false);

  // Active Root Item in Forge
  const activeRoot: MatrixRootItem = useMemo(() => {
    return MATRIX_ROOTS.find((r) => r.id === selectedRootId) || MATRIX_ROOTS[0];
  }, [selectedRootId]);

  // Current Conjugation Block in Forge
  const activeConjugation: VerbConjugationBlock = useMemo(() => {
    return activeRoot[person][selectedNumber];
  }, [activeRoot, person, selectedNumber]);

  // Handle Root Selection
  const handleSelectRoot = (rootId: string) => {
    setSelectedRootId(rootId);
    soundEffects.playPuzzleSnap();
  };

  // Handle Number Terminal Click
  const handleSelectNumber = (num: NumberKey) => {
    setSelectedNumber(num);
    soundEffects.playPuzzleSnap();
    const targetBlock = activeRoot[person][num];
    playPronunciation(targetBlock.sentence);
    if (onSelectWord) {
      onSelectWord(targetBlock.form);
    }
  };

  // Play spoken verb audio
  const handleSpeakVerb = (text: string) => {
    stopPronunciation();
    playPronunciation(text);
  };

  // ===================================================================
  // CHALLENGE MODE LOGIC (20 Fresh Diverse Roots)
  // ===================================================================
  const currentChallenge = MATRIX_PUZZLE_CHALLENGES[challengeIndex % MATRIX_PUZZLE_CHALLENGES.length];
  const challengeRoot = useMemo(() => {
    return MATRIX_ROOTS.find((r) => r.id === currentChallenge.rootId) || MATRIX_ROOTS[0];
  }, [currentChallenge.rootId]);

  const handlePickOption = (opt: { number: NumberKey; affix: string; sentence: string }) => {
    setSelectedAffix(opt.affix);
    soundEffects.playPuzzleSnap();

    if (opt.number === currentChallenge.targetNumber) {
      soundEffects.playSuccessDing();
      setChallengeResult('correct');
      setScore((s) => s + 100);
      setStreak((st) => st + 1);
      playPronunciation(currentChallenge.targetSentence);
      if (onSelectWord) {
        onSelectWord(currentChallenge.targetForm);
      }
    } else {
      soundEffects.playErrorBuzzer();
      setChallengeResult('wrong');
      setStreak(0);
    }
  };

  const handleNextChallenge = () => {
    setSelectedAffix(null);
    setChallengeResult(null);
    setShowHint(false);
    setChallengeIndex((prev) => (prev + 1) % MATRIX_PUZZLE_CHALLENGES.length);
  };

  return (
    <div className="dhatupatha-matrix-connector" id="dhatupatha-matrix">
      {/* Module Eyebrow & Title */}
      <header className="dmc-header">
        <div className="dmc-eyebrow">
          <span className="dmc-badge">PEDAGOGICAL DIVERSITY · 20 VERB DRILLS</span>
          <span className="dmc-tag">धातु-प्रत्यय योजकः · Dhatupatha Matrix</span>
        </div>
        <h2 className="dmc-title">The "Dhatupatha Matrix" Connector</h2>
        <p className="dmc-subtitle">
          Master diverse roots beyond the basics (गर्ज्, तप्, वर्ष्, मुष्, जृ, रक्ष्, रुह्, वद्, तॄ, कुप्, भष्, त्रस्, क्षल्, ज्वल्, यज्, याच्, त्यज्, अर्च्, लभ्) connecting base roots with singular (-ति / -ते), dual (-तः / -एते), and plural (-न्ति / -न्ते) terminal blocks dynamically.
        </p>

        {/* Mode Switcher */}
        <div className="dmc-mode-switcher" role="tablist" aria-label="Matrix Connector Modes">
          <button
            type="button"
            className={`dmc-mode-btn ${mode === 'challenge' ? 'active' : ''}`}
            onClick={() => {
              setMode('challenge');
              soundEffects.playPuzzleSnap();
            }}
          >
            <span>🧩</span>
            <span>
              {learnLang === 'ta'
                ? '20-புதிர் சவால் அரங்கம்'
                : learnLang === 'ml'
                ? '20-സമസ്യ വെല്ലുവിളി രംഗം'
                : '20-Challenge Puzzle Arena'}
            </span>
          </button>
          <button
            type="button"
            className={`dmc-mode-btn ${mode === 'forge' ? 'active' : ''}`}
            onClick={() => {
              setMode('forge');
              soundEffects.playPuzzleSnap();
            }}
          >
            <span>⚡</span>
            <span>
              {learnLang === 'ta'
                ? 'மாடுலர் இலவச ஆய்வுக்கூடம்'
                : learnLang === 'ml'
                ? 'സ്വതന്ത്ര ധാതു പരീക്ഷണശാല'
                : 'Modular Free-Forge Lab'}
            </span>
          </button>
        </div>

        {/* Multilingual Medium & Sanskrit Script Switcher */}
        <div className="dmc-lang-selector-strip" aria-label="Language and Script Options">
          <div className="dmc-lang-group">
            <span className="dmc-lang-label">
              🌐 {learnLang === 'ta' ? 'கற்கும் மொழி' : learnLang === 'ml' ? 'പഠന മാധ്യമം' : 'Learning Medium'}:
            </span>
            <div className="dmc-lang-buttons">
              <button
                type="button"
                className={`dmc-lang-btn ${learnLang === 'en' ? 'active' : ''}`}
                onClick={() => handleSetLearnLang('en')}
              >
                🇬🇧 English
              </button>
              <button
                type="button"
                className={`dmc-lang-btn ${learnLang === 'ta' ? 'active' : ''}`}
                onClick={() => handleSetLearnLang('ta')}
              >
                தமிழ் (Tamil)
              </button>
              <button
                type="button"
                className={`dmc-lang-btn ${learnLang === 'ml' ? 'active' : ''}`}
                onClick={() => handleSetLearnLang('ml')}
              >
                മലയാളം (Malayalam)
              </button>
            </div>
          </div>

          <div className="dmc-lang-group">
            <span className="dmc-lang-label">
              📜 {learnLang === 'ta' ? 'சமஸ்கிருத எழுத்துரு' : learnLang === 'ml' ? 'സംസ്കൃത ലിപി' : 'Sanskrit Script'}:
            </span>
            <div className="dmc-lang-buttons">
              <button
                type="button"
                className={`dmc-lang-btn ${displayScript === 'devanagari' ? 'active' : ''}`}
                onClick={() => handleSetDisplayScript('devanagari')}
              >
                देवनागरी (Devanagari)
              </button>
              <button
                type="button"
                className={`dmc-lang-btn ${displayScript === 'tamil' ? 'active' : ''}`}
                onClick={() => handleSetDisplayScript('tamil')}
              >
                தமிழ் (கிரந்தம்)
              </button>
              <button
                type="button"
                className={`dmc-lang-btn ${displayScript === 'malayalam' ? 'active' : ''}`}
                onClick={() => handleSetDisplayScript('malayalam')}
              >
                മലയാളം (Malayalam)
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ===================================================================
          MODE 1: 20-CHALLENGE PUZZLE ARENA (संयोजन-स्पर्धा)
          =================================================================== */}
      {mode === 'challenge' && (
        <section className="dmc-challenge-pod" aria-label="Puzzle Challenge Arena">
          {/* Top Bar with Score & Streak */}
          <div className="dmc-challenge-topbar">
            <div>
              <span className="dmc-badge" style={{ borderColor: '#f59e0b', color: '#f59e0b' }}>
                PUZZLE {challengeIndex + 1} OF {MATRIX_PUZZLE_CHALLENGES.length}
              </span>
            </div>
            <div className="dmc-challenge-stats">
              <span className="dmc-stat-pill dmc-stat-score">⭐ Score: {score}</span>
              <span className="dmc-stat-pill dmc-stat-streak">🔥 Streak: {streak}</span>
            </div>
          </div>

          {/* Mission Description */}
          <div className="dmc-challenge-mission">
            <h3 className="dmc-mission-title">{currentChallenge.title}</h3>
            <p className="dmc-mission-prompt">
              {learnLang === 'ta'
                ? currentChallenge.promptTamil
                : learnLang === 'ml'
                ? currentChallenge.promptMalayalam
                : currentChallenge.prompt}
            </p>
            <div className="dmc-mission-subject">
              {learnLang === 'ta'
                ? currentChallenge.meaningTamil
                : learnLang === 'ml'
                ? currentChallenge.meaningMalayalam
                : currentChallenge.meaning}
            </div>
          </div>

          {/* Snap Arena */}
          <div className="dmc-snap-arena">
            {/* Subject & Root */}
            <div className="dmc-snap-slot filled" title="Subject + Root">
              <span>{tr(challengeRoot.subjectNoun.split(' ')[0])}</span>
            </div>
            <span style={{ fontSize: '1.5rem', color: '#94a3b8' }}>+</span>
            <div className="dmc-snap-slot filled" style={{ color: '#38bdf8', borderColor: '#38bdf8' }} title="Base Dhātu">
              <span>{tr(challengeRoot.root)}</span>
            </div>
            <span style={{ fontSize: '1.5rem', color: '#94a3b8' }}>+</span>
            {/* Terminal Block Slot */}
            <div className={`dmc-snap-slot ${selectedAffix ? 'filled' : ''}`} title="Terminal Block">
              <span>
                {selectedAffix
                  ? tr(selectedAffix)
                  : learnLang === 'ta'
                  ? '? (விகுதி)'
                  : learnLang === 'ml'
                  ? '? (പ്രത്യയം)'
                  : '? (प्रत्यय-खण्डः)'}
              </span>
            </div>
            <span style={{ fontSize: '1.5rem', color: '#94a3b8' }}>=</span>
            {/* Target Output */}
            <div className="dmc-snap-slot filled" style={{ borderColor: '#2dd4bf', color: '#2dd4bf', minWidth: '180px' }} title="Resulting Sentence">
              <span>{challengeResult === 'correct' ? tr(currentChallenge.targetSentence) : '...'}</span>
            </div>
          </div>

          {/* 3 Candidate Terminal Blocks: Singular, Dual, Plural */}
          <div style={{ textAlign: 'center', marginBottom: '0.75rem', color: '#94a3b8', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {learnLang === 'ta'
              ? 'பொருத்தமான எண்/விகுதிப் பகுதியைத் தேர்ந்தெடுக்கவும்:'
              : learnLang === 'ml'
              ? 'യോജിച്ച വചന പ്രത്യയ ബ്ലോക്ക് തിരഞ്ഞെടുക്കുക:'
              : 'Choose the Matching Number Terminal Block:'}
          </div>
          <div className="dmc-snap-candidate-options">
            {currentChallenge.options.map((opt) => (
              <button
                type="button"
                key={opt.number}
                className={`dmc-candidate-btn ${selectedAffix === opt.affix ? 'selected' : ''}`}
                onClick={() => handlePickOption(opt)}
              >
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                  {opt.number === 'singular'
                    ? (learnLang === 'ta' ? 'க. ஒருமை (Singular)' : learnLang === 'ml' ? '൧. ഏകവചനം (Singular)' : '१. एकवचनम्')
                    : opt.number === 'dual'
                    ? (learnLang === 'ta' ? 'உ. இருமை (Dual)' : learnLang === 'ml' ? '൨. ദ്വിവചനം (Dual)' : '२. द्विवचनम्')
                    : (learnLang === 'ta' ? '௩. பன்மை (Plural)' : learnLang === 'ml' ? '൩. ബഹുവചനം (Plural)' : '३. बहुवचनम्')}{' '}
                  ({tr(opt.affix)})
                </div>
                <div>{tr(opt.sentence)}</div>
              </button>
            ))}
          </div>

          {/* Feedback Display */}
          {challengeResult === 'correct' && (
            <div className="dmc-feedback-banner dmc-feedback-success">
              <div>
                <strong>
                  {learnLang === 'ta'
                    ? '🎉 மிகச் சிறப்பு! சரியான பொருத்தம்!'
                    : learnLang === 'ml'
                    ? '🎉 സാധു! ശരിയായ ചേർച്ച!'
                    : '🎉 साधु! Perfect Match!'}
                </strong>
                <p style={{ margin: '0.3rem 0 0', fontSize: '0.9rem' }}>
                  {learnLang === 'ta'
                    ? currentChallenge.explanationTamil
                    : learnLang === 'ml'
                    ? currentChallenge.explanationMalayalam
                    : currentChallenge.explanation}
                </p>
              </div>
              <button
                type="button"
                className="dmc-action-btn-primary"
                onClick={handleNextChallenge}
              >
                {learnLang === 'ta'
                  ? 'அடுத்த புதிர்'
                  : learnLang === 'ml'
                  ? 'അടുത്ത സമസ്യ'
                  : 'Next Puzzle'}{' '}
                #{((challengeIndex + 1) % MATRIX_PUZZLE_CHALLENGES.length) + 1} ➜
              </button>
            </div>
          )}

          {challengeResult === 'wrong' && (
            <div className="dmc-feedback-banner dmc-feedback-error">
              <div>
                <strong>
                  {learnLang === 'ta'
                    ? '❌ எண் அல்லது ஆள் பொருத்தமில்லை!'
                    : learnLang === 'ml'
                    ? '❌ വചനമോ പുരുഷനോ ചേരുന്നില്ല!'
                    : '❌ Not quite matching the target number/person!'}
                </strong>
                <p style={{ margin: '0.3rem 0 0', fontSize: '0.9rem' }}>
                  {showHint
                    ? (learnLang === 'ta'
                        ? currentChallenge.hintTamil
                        : learnLang === 'ml'
                        ? currentChallenge.hintMalayalam
                        : currentChallenge.hint)
                    : (learnLang === 'ta'
                        ? 'ஒருமை, இருமை, பன்மைத் தொடர்பைக் கவனியுங்கள்.'
                        : learnLang === 'ml'
                        ? 'ഏകവചനം, ദ്വിവചനം, ബഹുവചനം എന്നിവ ശ്രദ്ധിക്കുക.'
                        : 'Check the subject concord (Singular, Dual, or Plural) carefully.')}
                </p>
              </div>
              <button
                type="button"
                className="dmc-pill-btn"
                style={{ background: 'rgba(255,255,255,0.1)', color: '#ffffff' }}
                onClick={() => setShowHint(true)}
              >
                💡 {learnLang === 'ta' ? 'குறிப்பைக் காட்டு' : learnLang === 'ml' ? 'സൂചന കാണിക്കുക' : 'Reveal Clue'}
              </button>
            </div>
          )}
        </section>
      )}

      {/* ===================================================================
          MODE 2: DYNAMIC CONNECTOR FORGE (स्वतन्त्र-संयोजनम्)
          =================================================================== */}
      {mode === 'forge' && (
        <section aria-label="Dynamic Verb Forge">
          {/* Controls Bar */}
          <div className="dmc-controls-bar">
            <div className="dmc-person-toggle">
              <span className="dmc-label">पुरुषः (Person):</span>
              <div className="dmc-pill-group">
                <button
                  type="button"
                  className={`dmc-pill-btn ${person === 'prathama' ? 'active' : ''}`}
                  onClick={() => {
                    setPerson('prathama');
                    soundEffects.playPuzzleSnap();
                  }}
                >
                  प्रथमपुरुषः (3rd)
                </button>
                <button
                  type="button"
                  className={`dmc-pill-btn ${person === 'madhyama' ? 'active' : ''}`}
                  onClick={() => {
                    setPerson('madhyama');
                    soundEffects.playPuzzleSnap();
                  }}
                >
                  मध्यमपुरुषः (2nd)
                </button>
                <button
                  type="button"
                  className={`dmc-pill-btn ${person === 'uttama' ? 'active' : ''}`}
                  onClick={() => {
                    setPerson('uttama');
                    soundEffects.playPuzzleSnap();
                  }}
                >
                  उत्तमपुरुषः (1st)
                </button>
              </div>
            </div>

            <div className="dmc-person-toggle">
              <span className="dmc-label">पदम् (Padam):</span>
              <span className="dmc-meta-chip" style={{ color: '#2dd4bf' }}>
                {activeRoot.padam}
              </span>
            </div>
          </div>

          {/* Dynamic Connector Arena */}
          <div className="dmc-connector-arena">
            {/* Left Station: Base Root Dock */}
            <div className="dmc-station-card">
              <div className="dmc-station-header">
                <span className="dmc-station-title">
                  <span className="dmc-socket-pin" aria-hidden="true" />
                  <span>
                    {learnLang === 'ta'
                      ? 'தாது களம் (Root Dock)'
                      : learnLang === 'ml'
                      ? 'ധാതു തട്ടകം (Root Dock)'
                      : 'धातु-कोष्ठः (Root Dock)'}
                  </span>
                </span>
                <span className="dmc-meta-chip">{activeRoot.gana}</span>
              </div>

              <div className="dmc-root-display">
                <div className="dmc-root-symbol">{tr(activeRoot.root)}</div>
                <div className="dmc-root-translit">{activeRoot.baseTranslit}</div>
                <div className="dmc-root-meaning">
                  {learnLang === 'ta'
                    ? activeRoot.meaningTamil
                    : learnLang === 'ml'
                    ? activeRoot.meaningMalayalam
                    : activeRoot.meaning}
                </div>
              </div>

              <div className="dmc-root-meta-chips">
                <span className="dmc-meta-chip">Stem: {tr(activeRoot.stem)}</span>
                <span className="dmc-meta-chip">Gana #{activeRoot.ganaNumber}</span>
                <span className="dmc-meta-chip">
                  {learnLang === 'ta'
                    ? activeRoot.subjectNounTamil
                    : learnLang === 'ml'
                    ? activeRoot.subjectNounMalayalam
                    : activeRoot.subjectNoun}
                </span>
              </div>
            </div>

            {/* Middle: Energy Cable Conduit & Vikarana */}
            <div className="dmc-bus-conduit" aria-hidden="true">
              <div className="dmc-conduit-cable" />
              <div className="dmc-vikaran-badge">
                <span>
                  ⚡ + {tr(activeRoot.vikaran)} (
                  {learnLang === 'ta'
                    ? 'விகரணம்'
                    : learnLang === 'ml'
                    ? 'വികരണം'
                    : 'विकरणम्'}
                  )
                </span>
              </div>
              <div className="dmc-conduit-cable" />
            </div>

            {/* Right Station: Terminal Blocks (एक / द्वि / बहु) */}
            <div className="dmc-terminals-station">
              {/* Singular Terminal Block */}
              <button
                type="button"
                className={`dmc-terminal-block ${selectedNumber === 'singular' ? 'active' : ''}`}
                onClick={() => handleSelectNumber('singular')}
              >
                <div className="dmc-tb-left">
                  <span className="dmc-tb-name">
                    {learnLang === 'ta'
                      ? 'க. ஒருமை (Singular)'
                      : learnLang === 'ml'
                      ? '൧. ഏകവചനം (Singular)'
                      : 'एकवचनम् (Singular)'}
                  </span>
                  <span className="dmc-tb-affix">{tr(activeRoot[person].singular.affix)}</span>
                  <span className="dmc-tb-pronoun">{tr(activeRoot[person].singular.sentence)}</span>
                </div>
                <div className="dmc-tb-indicator">
                  {selectedNumber === 'singular' && '✓'}
                </div>
              </button>

              {/* Dual Terminal Block */}
              <button
                type="button"
                className={`dmc-terminal-block ${selectedNumber === 'dual' ? 'active' : ''}`}
                onClick={() => handleSelectNumber('dual')}
              >
                <div className="dmc-tb-left">
                  <span className="dmc-tb-name">
                    {learnLang === 'ta'
                      ? 'உ. இருமை (Dual)'
                      : learnLang === 'ml'
                      ? '൨. ദ്വിവചനം (Dual)'
                      : 'द्विवचनम् (Dual)'}
                  </span>
                  <span className="dmc-tb-affix">{tr(activeRoot[person].dual.affix)}</span>
                  <span className="dmc-tb-pronoun">{tr(activeRoot[person].dual.sentence)}</span>
                </div>
                <div className="dmc-tb-indicator">
                  {selectedNumber === 'dual' && '✓'}
                </div>
              </button>

              {/* Plural Terminal Block */}
              <button
                type="button"
                className={`dmc-terminal-block ${selectedNumber === 'plural' ? 'active' : ''}`}
                onClick={() => handleSelectNumber('plural')}
              >
                <div className="dmc-tb-left">
                  <span className="dmc-tb-name">
                    {learnLang === 'ta'
                      ? '௩. பன்மை (Plural)'
                      : learnLang === 'ml'
                      ? '൩. ബഹുവചനം (Plural)'
                      : 'बहुवचनम् (Plural)'}
                  </span>
                  <span className="dmc-tb-affix">{tr(activeRoot[person].plural.affix)}</span>
                  <span className="dmc-tb-pronoun">{tr(activeRoot[person].plural.sentence)}</span>
                </div>
                <div className="dmc-tb-indicator">
                  {selectedNumber === 'plural' && '✓'}
                </div>
              </button>
            </div>
          </div>

          {/* Fused Output Pod */}
          <div className="dmc-output-pod">
            <div className="dmc-output-header">
              <span className="dmc-output-tag">
                {learnLang === 'ta'
                  ? 'உருவான புதிய வினைச்சொல் · Dynamically Forged Output'
                  : learnLang === 'ml'
                  ? 'നിർമ്മിച്ച ക്രിയാപദം · Dynamically Forged Output'
                  : 'अभिनव-क्रियापदम् · Dynamically Forged Output'}
              </span>
              <button
                type="button"
                className="dmc-audio-btn"
                onClick={() => handleSpeakVerb(activeConjugation.sentence)}
                title="Hear Spoken Audio"
              >
                <span>🔊</span>
                <span>
                  {learnLang === 'ta' ? 'கேளுங்கள்' : learnLang === 'ml' ? 'കേൾക്കുക' : 'Listen'} (
                  {tr(activeConjugation.sentence)})
                </span>
              </button>
            </div>

            {/* Fusion Formula */}
            <div className="dmc-fusion-formula">
              <span className="dmc-f-block dmc-f-root">
                {tr(activeRoot.root)} ({learnLang === 'ta' ? 'தாது' : learnLang === 'ml' ? 'ധാതു' : 'धातु'})
              </span>
              <span className="dmc-f-plus">+</span>
              <span className="dmc-f-block dmc-f-vikaran">
                {tr(activeRoot.vikaran)} ({learnLang === 'ta' ? 'விகரணம்' : learnLang === 'ml' ? 'വികരണം' : 'विकरण'})
              </span>
              <span className="dmc-f-plus">+</span>
              <span className="dmc-f-block dmc-f-affix">
                {tr(activeConjugation.affix)} ({learnLang === 'ta' ? 'விகுதி' : learnLang === 'ml' ? 'പ്രത്യയം' : 'प्रत्यय'})
              </span>
              <span className="dmc-f-arrow">➜</span>
              <span className="dmc-f-block dmc-f-result">{tr(activeConjugation.form)}</span>
            </div>

            <div className="dmc-result-meta">
              <span className="dmc-meta-chip">Transliteration: {activeConjugation.translit}</span>
              <span className="dmc-meta-chip">
                Action:{' '}
                {learnLang === 'ta'
                  ? activeRoot.meaningTamil
                  : learnLang === 'ml'
                  ? activeRoot.meaningMalayalam
                  : activeConjugation.meaning}
              </span>
              <span className="dmc-meta-chip">Padam: {activeRoot.padam}</span>
            </div>

            {/* Example In Context */}
            <div className="dmc-context-sentence">
              <div>
                <div className="dmc-cs-sanskrit">{tr(activeConjugation.sentence)}।</div>
                <div className="dmc-cs-translit">{activeConjugation.translit}</div>
                <div className="dmc-cs-english">
                  {learnLang === 'ta'
                    ? activeRoot.targetSentence.tamil
                    : learnLang === 'ml'
                    ? activeRoot.targetSentence.malayalam
                    : activeRoot.englishAction}
                </div>
              </div>
              <button
                type="button"
                className="dmc-audio-btn"
                onClick={() => handleSpeakVerb(activeConjugation.sentence)}
              >
                <span>🔊</span>
                <span>
                  {learnLang === 'ta'
                    ? 'வாக்கியத்தைக் கேளுங்கள்'
                    : learnLang === 'ml'
                    ? 'വാക്യം കേൾക്കുക'
                    : 'Speak Sentence'}
                </span>
              </button>
            </div>

            {/* 3-Number Side-by-side Paradigm Strip */}
            <div className="dmc-paradigm-strip">
              <div
                className={`dmc-ps-col ${selectedNumber === 'singular' ? 'current' : ''}`}
                onClick={() => handleSelectNumber('singular')}
              >
                <div className="dmc-ps-title">
                  {learnLang === 'ta'
                    ? 'க. ஒருமை'
                    : learnLang === 'ml'
                    ? '൧. ഏകവചനം'
                    : '१. एकवचनम्'}{' '}
                  ({tr(activeRoot[person].singular.affix)})
                </div>
                <div className="dmc-ps-form">{tr(activeRoot[person].singular.sentence)}</div>
                <div className="dmc-ps-meaning">{tr(activeRoot[person].singular.form)}</div>
              </div>

              <div
                className={`dmc-ps-col ${selectedNumber === 'dual' ? 'current' : ''}`}
                onClick={() => handleSelectNumber('dual')}
              >
                <div className="dmc-ps-title">
                  {learnLang === 'ta'
                    ? 'உ. இருமை'
                    : learnLang === 'ml'
                    ? '൨. ദ്വിവചനം'
                    : '२. द्विवचनम्'}{' '}
                  ({tr(activeRoot[person].dual.affix)})
                </div>
                <div className="dmc-ps-form">{tr(activeRoot[person].dual.sentence)}</div>
                <div className="dmc-ps-meaning">{tr(activeRoot[person].dual.form)}</div>
              </div>

              <div
                className={`dmc-ps-col ${selectedNumber === 'plural' ? 'current' : ''}`}
                onClick={() => handleSelectNumber('plural')}
              >
                <div className="dmc-ps-title">
                  {learnLang === 'ta'
                    ? '௩. பன்மை'
                    : learnLang === 'ml'
                    ? '൩. ബഹുവചനം'
                    : '३. बहुवचनम्'}{' '}
                  ({tr(activeRoot[person].plural.affix)})
                </div>
                <div className="dmc-ps-form">{tr(activeRoot[person].plural.sentence)}</div>
                <div className="dmc-ps-meaning">{tr(activeRoot[person].plural.form)}</div>
              </div>
            </div>
          </div>

          {/* Root Bank Grid */}
          <div className="dmc-root-bank">
            <div className="dmc-rb-header">
              <span>
                🌿{' '}
                {learnLang === 'ta'
                  ? 'இருபது தாதுக்கள் தொகுப்பு (20 Roots Bank)'
                  : learnLang === 'ml'
                  ? 'ഇരുപത് ധാതുക്കളുടെ ശേഖരം (20 Roots Bank)'
                  : 'Select Root from Diverse Dhatupatha Bank (२० धातवः)'}
              </span>
            </div>
            <div className="dmc-roots-grid">
              {MATRIX_ROOTS.map((r) => (
                <button
                  type="button"
                  key={r.id}
                  className={`dmc-root-chip ${r.id === selectedRootId ? 'active' : ''}`}
                  onClick={() => handleSelectRoot(r.id)}
                >
                  <div className="dmc-rc-devanagari">{tr(r.root)}</div>
                  <div className="dmc-rc-english">
                    {learnLang === 'ta'
                      ? r.meaningTamil
                      : learnLang === 'ml'
                      ? r.meaningMalayalam
                      : r.englishAction}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
