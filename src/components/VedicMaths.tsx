import React, { useState } from 'react';
import {
  VEDIC_ZERO_ESSAY,
  VEDIC_LOGIC_LANGUAGE_ESSAY,
  VEDIC_SUTRAS,
  VEDIC_SUBSUTRAS,
  VEDIC_QUIZ_QUESTIONS,
  VEDIC_ARTICLES,
  GURU_PARAMPARA,
  type VedicSutra
} from '../data/vedicMaths';
import { playPronunciation } from '../utils/pronunciation';
import '../styles/vedic-maths.css';

type VedicTab = 'solvers' | 'articles' | 'zero' | 'fluid' | 'algebra' | 'geometry' | 'parampara' | 'logic' | 'sutras' | 'quiz' | 'essay';
type SolverKey = 'ekadhikena' | 'nikhilam-sub' | 'nikhilam-mul' | 'urdhva' | 'ekanyunena' | 'antya' | 'beejank';

export interface VedicMathsProps {
  onGoHome?: () => void;
  onOpenReader?: () => void;
  onOpenPhilosophy?: () => void;
}

const VedicMaths: React.FC<VedicMathsProps> = ({ onGoHome, onOpenReader, onOpenPhilosophy }) => {
  const [activeTab, setActiveTab] = useState<VedicTab>('solvers');

  // Solver States
  const [activeSolver, setActiveSolver] = useState<SolverKey>('ekadhikena');
  const [ekaInput, setEkaInput] = useState<number>(75);
  const [nikSubBase, setNikSubBase] = useState<number>(10000);
  const [nikSubNum, setNikSubNum] = useState<number>(3456);
  const [nikMulA, setNikMulA] = useState<number>(96);
  const [nikMulB, setNikMulB] = useState<number>(93);
  const [urdhvaA, setUrdhvaA] = useState<number>(23);
  const [urdhvaB, setUrdhvaB] = useState<number>(45);
  const [ekaNyunNum, setEkaNyunNum] = useState<number>(64);
  const [antyaA, setAntyaA] = useState<number>(43);
  const [antyaB, setAntyaB] = useState<number>(47);
  const [beejankA, setBeejankA] = useState<number>(23);
  const [beejankB, setBeejankB] = useState<number>(45);

  // Article Reader State
  const [selectedArticleId, setSelectedArticleId] = useState<string>('magic-intro');

  // Absolute Zero & Place Value States
  const [romanInputNum, setRomanInputNum] = useState<number>(3888);
  const [algebraConstA, setAlgebraConstA] = useState<number>(2);
  const [algebraConstB, setAlgebraConstB] = useState<number>(3);

  // Fluid Space States
  const [fluidNumA, setFluidNumA] = useState<number>(23);
  const [fluidNumB, setFluidNumB] = useState<number>(45);

  // Sutra Directory States
  const [sutraSearch, setSutraSearch] = useState('');
  const [sutraFilter, setSutraFilter] = useState<string>('all');

  // Quiz States
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  // Roman Numeral Helper
  const getRoman = (num: number): string => {
    if (num <= 0 || num > 3999) return 'Out of range (1–3999)';
    const lookup: [number, string][] = [
      [1000, 'M'],
      [900, 'CM'],
      [500, 'D'],
      [400, 'CD'],
      [100, 'C'],
      [90, 'XC'],
      [50, 'L'],
      [40, 'XL'],
      [10, 'X'],
      [9, 'IX'],
      [5, 'V'],
      [4, 'IV'],
      [1, 'I']
    ];
    let res = '';
    let n = num;
    for (const [v, sym] of lookup) {
      while (n >= v) {
        res += sym;
        n -= v;
      }
    }
    return res;
  };

  // Filtered Sutras
  const filteredSutras = VEDIC_SUTRAS.filter((sutra) => {
    const matchesSearch =
      sutra.sanskrit.toLowerCase().includes(sutraSearch.toLowerCase()) ||
      sutra.transliteration.toLowerCase().includes(sutraSearch.toLowerCase()) ||
      sutra.meaning.toLowerCase().includes(sutraSearch.toLowerCase()) ||
      sutra.description.toLowerCase().includes(sutraSearch.toLowerCase());
    const matchesFilter = sutraFilter === 'all' || sutra.category === sutraFilter;
    return matchesSearch && matchesFilter;
  });

  // Digital Root (Beejank) Helper
  const getDigitalRoot = (n: number): number => {
    let sum = Math.abs(n);
    while (sum >= 10) {
      sum = sum
        .toString()
        .split('')
        .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
    }
    return sum;
  };

  // Quiz Handlers
  const handleSelectOption = (opt: string) => {
    if (selectedOption !== null) return;
    setSelectedOption(opt);
    setShowExplanation(true);
    const currentQ = VEDIC_QUIZ_QUESTIONS[quizIndex];
    if (opt === currentQ.correctAnswer) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (quizIndex < VEDIC_QUIZ_QUESTIONS.length - 1) {
      setQuizIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setQuizIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setQuizScore(0);
    setQuizFinished(false);
  };

  // Current Article lookup
  const currentArticle = VEDIC_ARTICLES.find((a) => a.id === selectedArticleId) || VEDIC_ARTICLES[0];
  const currentArticleIdx = VEDIC_ARTICLES.findIndex((a) => a.id === currentArticle.id);

  return (
    <div className="vedic-maths-container">
      {/* Header & Navigation */}
      <header className="vedic-header">
        <div className="vedic-header-inner">
          <div className="vedic-breadcrumb">
            {onGoHome && (
              <button
                type="button"
                className="vedic-breadcrumb-btn"
                onClick={onGoHome}
                title="Return to Home page"
              >
                🏠 Deepakam · Home
              </button>
            )}
            <span className="vedic-breadcrumb-sep" aria-hidden="true">›</span>
            <span className="vedic-breadcrumb-current">📐 वैदिक-गणितम् (Vedic Mathematics)</span>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {onOpenPhilosophy && (
              <button
                type="button"
                className="vedic-header-nav-btn"
                onClick={onOpenPhilosophy}
                title="Our Philosophy · Darśana"
              >
                🪔 Darśana
              </button>
            )}
            {onOpenReader && (
              <button
                type="button"
                className="vedic-header-nav-btn"
                onClick={onOpenReader}
              >
                📖 NCERT Class 7 Lessons
              </button>
            )}
            {onGoHome && (
              <button
                type="button"
                className="vedic-header-nav-btn"
                onClick={onGoHome}
              >
                ← Back to Home
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="vedic-hero">
        <div className="vedic-invocation-badge">
          <span>॥ गणितं ब्रह्मज्ञानस्य सोपानम् ॥</span>
          <span>·</span>
          <span>16 Core Sutras &amp; 13 Sub-Sutras</span>
        </div>
        <h1 className="vedic-hero-title">
          <span className="vedic-hero-title-sa">वैदिक-गणितम्</span> · Vedic Mathematics
        </h1>
        <p className="vedic-hero-subtitle">
          The Magic of Numbers &amp; The Architecture of Absolute Zero: An ultra-efficient system of mental calculation that allows people to solve arithmetic and algebraic problems 10 to 15 times faster than conventional methods.
        </p>

        {/* Tab Navigation */}
        <div className="vedic-tabs">
          <button
            type="button"
            className={`vedic-tab-btn${activeTab === 'solvers' ? ' active' : ''}`}
            onClick={() => setActiveTab('solvers')}
          >
            <span>🧮</span>
            <span>Interactive Solvers</span>
          </button>
          <button
            type="button"
            className={`vedic-tab-btn${activeTab === 'articles' || activeTab === 'essay' ? ' active' : ''}`}
            onClick={() => setActiveTab('articles')}
          >
            <span>📖</span>
            <span>Articles Masterclass</span>
          </button>
          <button
            type="button"
            className={`vedic-tab-btn${activeTab === 'zero' ? ' active' : ''}`}
            onClick={() => setActiveTab('zero')}
          >
            <span>🪐</span>
            <span>The Numerical Grid &amp; Zero</span>
          </button>
          <button
            type="button"
            className={`vedic-tab-btn${activeTab === 'fluid' ? ' active' : ''}`}
            onClick={() => setActiveTab('fluid')}
          >
            <span>🌊</span>
            <span>Fluid Space &amp; Parallel Math</span>
          </button>
          <button
            type="button"
            className={`vedic-tab-btn${activeTab === 'algebra' ? ' active' : ''}`}
            onClick={() => setActiveTab('algebra')}
          >
            <span>📐</span>
            <span>Universal Algebra Engine</span>
          </button>
          <button
            type="button"
            className={`vedic-tab-btn${activeTab === 'geometry' ? ' active' : ''}`}
            onClick={() => setActiveTab('geometry')}
          >
            <span>🔺</span>
            <span>Vedic Geometry</span>
          </button>
          <button
            type="button"
            className={`vedic-tab-btn${activeTab === 'parampara' ? ' active' : ''}`}
            onClick={() => setActiveTab('parampara')}
          >
            <span>🕉️</span>
            <span>The Source &amp; Guru Parampara</span>
          </button>
          <button
            type="button"
            className={`vedic-tab-btn${activeTab === 'logic' ? ' active' : ''}`}
            onClick={() => setActiveTab('logic')}
          >
            <span>🗣️</span>
            <span>Logic &amp; Language</span>
          </button>
          <button
            type="button"
            className={`vedic-tab-btn${activeTab === 'sutras' ? ' active' : ''}`}
            onClick={() => setActiveTab('sutras')}
          >
            <span>📜</span>
            <span>16 Sutras &amp; 13 Sub-Sutras</span>
          </button>
          <button
            type="button"
            className={`vedic-tab-btn${activeTab === 'quiz' ? ' active' : ''}`}
            onClick={() => setActiveTab('quiz')}
          >
            <span>⚡</span>
            <span>Speed Math Challenge</span>
          </button>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="vedic-content-wrap">
        {activeTab === 'solvers' && (
          <div className="solver-layout">
            {/* Sidebar with Solver Methods */}
            <aside className="solver-sidebar">
              <h3 className="solver-sidebar-title">⚡ Vedic Techniques</h3>

              <button
                type="button"
                className={`solver-menu-btn${activeSolver === 'ekadhikena' ? ' active' : ''}`}
                onClick={() => setActiveSolver('ekadhikena')}
              >
                <span className="solver-menu-sa">१. एकाधिकेन पूर्वेण</span>
                <span className="solver-menu-en">Squaring numbers ending in 5 (75²)</span>
              </button>

              <button
                type="button"
                className={`solver-menu-btn${activeSolver === 'nikhilam-sub' ? ' active' : ''}`}
                onClick={() => setActiveSolver('nikhilam-sub')}
              >
                <span className="solver-menu-sa">२. निखिलम् (घटनम्)</span>
                <span className="solver-menu-en">All from 9, last from 10 (Subtraction)</span>
              </button>

              <button
                type="button"
                className={`solver-menu-btn${activeSolver === 'nikhilam-mul' ? ' active' : ''}`}
                onClick={() => setActiveSolver('nikhilam-mul')}
              >
                <span className="solver-menu-sa">३. निखिलम् (गुणनम्)</span>
                <span className="solver-menu-en">Base multiplication near 100 (96 × 93)</span>
              </button>

              <button
                type="button"
                className={`solver-menu-btn${activeSolver === 'urdhva' ? ' active' : ''}`}
                onClick={() => setActiveSolver('urdhva')}
              >
                <span className="solver-menu-sa">४. ऊर्ध्वतिर्यग्भ्याम्</span>
                <span className="solver-menu-en">Universal 2-digit multiplication</span>
              </button>

              <button
                type="button"
                className={`solver-menu-btn${activeSolver === 'ekanyunena' ? ' active' : ''}`}
                onClick={() => setActiveSolver('ekanyunena')}
              >
                <span className="solver-menu-sa">५. एकन्यूनेन पूर्वेण</span>
                <span className="solver-menu-en">Lightning multiplication by 99 or 999</span>
              </button>

              <button
                type="button"
                className={`solver-menu-btn${activeSolver === 'antya' ? ' active' : ''}`}
                onClick={() => setActiveSolver('antya')}
              >
                <span className="solver-menu-sa">६. अन्त्ययोर्दशकेऽपि</span>
                <span className="solver-menu-en">Units sum to 10, tens equal (43 × 47)</span>
              </button>

              <button
                type="button"
                className={`solver-menu-btn${activeSolver === 'beejank' ? ' active' : ''}`}
                onClick={() => setActiveSolver('beejank')}
              >
                <span className="solver-menu-sa">७. बीजाङ्क (Digital Root)</span>
                <span className="solver-menu-en">Guṇitasamuccayaḥ Verification Check</span>
              </button>
            </aside>

            {/* Main Interactive Solver Card */}
            <section className="solver-card">
              {/* Method 1: Ekadhikena Purvena */}
              {activeSolver === 'ekadhikena' && (() => {
                const prev = Math.floor(ekaInput / 10);
                const left = prev * (prev + 1);
                const right = 25;
                const result = left * 100 + right;

                return (
                  <div>
                    <div className="solver-header">
                      <span className="solver-sutra-tag">सूत्रम् १ · Ekādhikena Pūrveṇa</span>
                      <h2 className="solver-title">एकाधिकेन पूर्वेण — By One More Than the Previous One</h2>
                      <p className="solver-meaning">
                        Effortlessly square any number ending in 5 in under 2 seconds without paper calculations.
                      </p>
                    </div>

                    <div className="solver-presets">
                      <span className="solver-presets-label">Try Presets:</span>
                      {[25, 35, 65, 75, 85, 95, 105, 115].map((val) => (
                        <button
                          key={val}
                          type="button"
                          className={`solver-preset-chip${ekaInput === val ? ' active' : ''}`}
                          onClick={() => setEkaInput(val)}
                        >
                          {val}²
                        </button>
                      ))}
                    </div>

                    <div className="solver-inputs-row">
                      <div className="solver-input-group">
                        <label htmlFor="eka-input">Number ending in 5:</label>
                        <input
                          id="eka-input"
                          type="number"
                          step="10"
                          value={ekaInput}
                          onChange={(e) => {
                            const val = parseInt(e.target.value, 10) || 5;
                            setEkaInput(Math.floor(val / 10) * 10 + 5);
                          }}
                        />
                      </div>
                    </div>

                    <div className="solver-visual-card">
                      <div className="solver-step-list">
                        <div className="solver-step-item">
                          <div className="solver-step-num">1</div>
                          <div className="solver-step-content">
                            <div className="solver-step-title">Left Part: Multiply previous digit by (digit + 1)</div>
                            <div className="solver-step-calc">
                              {prev} × ({prev} + 1) = {prev} × {prev + 1} = <strong>{left}</strong>
                            </div>
                          </div>
                        </div>

                        <div className="solver-step-item">
                          <div className="solver-step-num">2</div>
                          <div className="solver-step-content">
                            <div className="solver-step-title">Right Part: Always 5² = 25</div>
                            <div className="solver-step-calc">
                              5² = <strong>25</strong>
                            </div>
                          </div>
                        </div>

                        <div className="solver-step-item">
                          <div className="solver-step-num">3</div>
                          <div className="solver-step-content">
                            <div className="solver-step-title">Combine Left &amp; Right Halves</div>
                            <div className="solver-step-calc">
                              {left} | 25 = <strong>{result.toLocaleString()}</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="solver-result-box">
                      <span className="solver-result-label">{ekaInput}² Calculation Result</span>
                      <span className="solver-result-val">{result.toLocaleString()}</span>
                    </div>
                  </div>
                );
              })()}

              {/* Method 2: Nikhilam Subtraction */}
              {activeSolver === 'nikhilam-sub' && (() => {
                const baseStr = nikSubBase.toString();
                const numStr = nikSubNum.toString().padStart(baseStr.length - 1, '0');
                const diff = nikSubBase - nikSubNum;
                const digits = numStr.split('').map((d) => parseInt(d, 10));

                return (
                  <div>
                    <div className="solver-header">
                      <span className="solver-sutra-tag">सूत्रम् २ · Nikhilaṁ Navataścaramaṁ Daśataḥ</span>
                      <h2 className="solver-title">निखिलं नवतश्चरमं दशतः — All from 9 and the Last from 10</h2>
                      <p className="solver-meaning">
                        Subtract from 100, 1,000, 10,000, etc., directly from left to right with zero borrowing or carrying!
                      </p>
                    </div>

                    <div className="solver-presets">
                      <span className="solver-presets-label">Try Presets:</span>
                      {[
                        { base: 1000, num: 348 },
                        { base: 10000, num: 3456 },
                        { base: 10000, num: 4372 },
                        { base: 100000, num: 48273 }
                      ].map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className={`solver-preset-chip${nikSubBase === item.base && nikSubNum === item.num ? ' active' : ''}`}
                          onClick={() => {
                            setNikSubBase(item.base);
                            setNikSubNum(item.num);
                          }}
                        >
                          {item.base} − {item.num}
                        </button>
                      ))}
                    </div>

                    <div className="solver-inputs-row">
                      <div className="solver-input-group">
                        <label htmlFor="niksub-base">Base (Power of 10):</label>
                        <select
                          id="niksub-base"
                          value={nikSubBase}
                          onChange={(e) => setNikSubBase(parseInt(e.target.value, 10))}
                          style={{
                            padding: '0.5rem 0.8rem',
                            fontSize: '1rem',
                            borderRadius: '8px',
                            border: '2px solid #e5e7eb'
                          }}
                        >
                          <option value={100}>100 (10²)</option>
                          <option value={1000}>1,000 (10³)</option>
                          <option value={10000}>10,000 (10⁴)</option>
                          <option value={100000}>100,000 (10⁵)</option>
                        </select>
                      </div>

                      <div className="solver-input-group">
                        <label htmlFor="niksub-num">Number to Subtract:</label>
                        <input
                          id="niksub-num"
                          type="number"
                          max={nikSubBase - 1}
                          min={1}
                          value={nikSubNum}
                          onChange={(e) => setNikSubNum(Math.max(1, parseInt(e.target.value, 10) || 1))}
                        />
                      </div>
                    </div>

                    <div className="solver-visual-card">
                      <div className="solver-step-list">
                        <div className="solver-step-item">
                          <div className="solver-step-num">1</div>
                          <div className="solver-step-content">
                            <div className="solver-step-title">All Leading Digits from 9:</div>
                            <div className="solver-step-calc">
                              {digits.slice(0, -1).map((d, i) => (
                                <span key={i} style={{ marginRight: '1rem' }}>
                                  9 − {d} = <strong>{9 - d}</strong>
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="solver-step-item">
                          <div className="solver-step-num">2</div>
                          <div className="solver-step-content">
                            <div className="solver-step-title">The Very Last Digit from 10:</div>
                            <div className="solver-step-calc">
                              10 − {digits[digits.length - 1]} = <strong>{10 - digits[digits.length - 1]}</strong>
                            </div>
                          </div>
                        </div>

                        <div className="solver-step-item">
                          <div className="solver-step-num">3</div>
                          <div className="solver-step-content">
                            <div className="solver-step-title">Read Seamlessly from Left to Right</div>
                            <div className="solver-step-calc">
                              Answer: <strong>{diff.toLocaleString()}</strong> (no borrowing across zeroes!)
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="solver-result-box">
                      <span className="solver-result-label">{nikSubBase} − {nikSubNum}</span>
                      <span className="solver-result-val">{diff.toLocaleString()}</span>
                    </div>
                  </div>
                );
              })()}

              {/* Method 3: Nikhilam Multiplication near Base 100 */}
              {activeSolver === 'nikhilam-mul' && (() => {
                const base = 100;
                const devA = nikMulA - base;
                const devB = nikMulB - base;
                const left = nikMulA + devB;
                const right = devA * devB;
                const result = left * 100 + right;

                return (
                  <div>
                    <div className="solver-header">
                      <span className="solver-sutra-tag">सूत्रम् २ · Nikhilaṁ Base Multiplication</span>
                      <h2 className="solver-title">निखिलं गुणनम् — Base 100 Multiplication</h2>
                      <p className="solver-meaning">
                        Cross-subtract deficiencies or add surpluses, multiply deviations, and combine!
                      </p>
                    </div>

                    <div className="solver-presets">
                      <span className="solver-presets-label">Try Presets:</span>
                      {[
                        { a: 96, b: 93 },
                        { a: 98, b: 97 },
                        { a: 95, b: 92 },
                        { a: 104, b: 107 },
                        { a: 103, b: 106 }
                      ].map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className={`solver-preset-chip${nikMulA === item.a && nikMulB === item.b ? ' active' : ''}`}
                          onClick={() => {
                            setNikMulA(item.a);
                            setNikMulB(item.b);
                          }}
                        >
                          {item.a} × {item.b}
                        </button>
                      ))}
                    </div>

                    <div className="solver-inputs-row">
                      <div className="solver-input-group">
                        <label htmlFor="nikmul-a">Number 1 (near 100):</label>
                        <input
                          id="nikmul-a"
                          type="number"
                          value={nikMulA}
                          onChange={(e) => setNikMulA(parseInt(e.target.value, 10) || 100)}
                        />
                      </div>
                      <div className="solver-input-group">
                        <label htmlFor="nikmul-b">Number 2 (near 100):</label>
                        <input
                          id="nikmul-b"
                          type="number"
                          value={nikMulB}
                          onChange={(e) => setNikMulB(parseInt(e.target.value, 10) || 100)}
                        />
                      </div>
                    </div>

                    <div className="solver-visual-card">
                      <div className="solver-step-list">
                        <div className="solver-step-item">
                          <div className="solver-step-num">1</div>
                          <div className="solver-step-content">
                            <div className="solver-step-title">Find Deviations from Base 100</div>
                            <div className="solver-step-calc">
                              {nikMulA} has deviation {devA >= 0 ? `+${devA}` : devA}, and {nikMulB} has deviation {devB >= 0 ? `+${devB}` : devB}
                            </div>
                          </div>
                        </div>

                        <div className="solver-step-item">
                          <div className="solver-step-num">2</div>
                          <div className="solver-step-content">
                            <div className="solver-step-title">Left Part: Cross-Add/Subtract Deviation</div>
                            <div className="solver-step-calc">
                              {nikMulA} + ({devB}) = <strong>{left}</strong>
                            </div>
                          </div>
                        </div>

                        <div className="solver-step-item">
                          <div className="solver-step-num">3</div>
                          <div className="solver-step-content">
                            <div className="solver-step-title">Right Part: Multiply the two deviations</div>
                            <div className="solver-step-calc">
                              ({devA}) × ({devB}) = <strong>{right.toString().padStart(2, '0')}</strong>
                            </div>
                          </div>
                        </div>

                        <div className="solver-step-item">
                          <div className="solver-step-num">4</div>
                          <div className="solver-step-content">
                            <div className="solver-step-title">Concatenate: Left | Right</div>
                            <div className="solver-step-calc">
                              {left} | {right.toString().padStart(2, '0')} = <strong>{result.toLocaleString()}</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="solver-result-box">
                      <span className="solver-result-label">{nikMulA} × {nikMulB}</span>
                      <span className="solver-result-val">{result.toLocaleString()}</span>
                    </div>
                  </div>
                );
              })()}

              {/* Method 4: Urdhva-Tiryagbhyam */}
              {activeSolver === 'urdhva' && (() => {
                const aTens = Math.floor(urdhvaA / 10);
                const aUnits = urdhvaA % 10;
                const bTens = Math.floor(urdhvaB / 10);
                const bUnits = urdhvaB % 10;

                const step1Val = aUnits * bUnits;
                const step1Unit = step1Val % 10;
                const step1Carry = Math.floor(step1Val / 10);

                const step2Val = aTens * bUnits + aUnits * bTens + step1Carry;
                const step2Unit = step2Val % 10;
                const step2Carry = Math.floor(step2Val / 10);

                const step3Val = aTens * bTens + step2Carry;
                const total = urdhvaA * urdhvaB;

                return (
                  <div>
                    <div className="solver-header">
                      <span className="solver-sutra-tag">सूत्रम् ३ · Ūrdhva-Tiryagbhyām</span>
                      <h2 className="solver-title">ऊर्ध्वतिर्यग्भ्याम् — Vertically and Crosswise</h2>
                      <p className="solver-meaning">
                        The universal multiplication method for multiplying any two 2-digit numbers in a single line.
                      </p>
                    </div>

                    <div className="solver-presets">
                      <span className="solver-presets-label">Try Presets:</span>
                      {[
                        { a: 23, b: 45 },
                        { a: 31, b: 12 },
                        { a: 42, b: 53 },
                        { a: 64, b: 27 }
                      ].map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className={`solver-preset-chip${urdhvaA === item.a && urdhvaB === item.b ? ' active' : ''}`}
                          onClick={() => {
                            setUrdhvaA(item.a);
                            setUrdhvaB(item.b);
                          }}
                        >
                          {item.a} × {item.b}
                        </button>
                      ))}
                    </div>

                    <div className="solver-inputs-row">
                      <div className="solver-input-group">
                        <label htmlFor="urdhva-a">Number 1 (2-digit):</label>
                        <input
                          id="urdhva-a"
                          type="number"
                          min={10}
                          max={99}
                          value={urdhvaA}
                          onChange={(e) => setUrdhvaA(Math.min(99, Math.max(10, parseInt(e.target.value, 10) || 10)))}
                        />
                      </div>
                      <div className="solver-input-group">
                        <label htmlFor="urdhva-b">Number 2 (2-digit):</label>
                        <input
                          id="urdhva-b"
                          type="number"
                          min={10}
                          max={99}
                          value={urdhvaB}
                          onChange={(e) => setUrdhvaB(Math.min(99, Math.max(10, parseInt(e.target.value, 10) || 10)))}
                        />
                      </div>
                    </div>

                    <div className="solver-visual-card">
                      <div className="solver-step-list">
                        <div className="solver-step-item">
                          <div className="solver-step-num">1</div>
                          <div className="solver-step-content">
                            <div className="solver-step-title">Vertical Right: Units × Units (↓)</div>
                            <div className="solver-step-calc">
                              {aUnits} × {bUnits} = {step1Val} ➔ Write <strong>{step1Unit}</strong>, carry <strong>{step1Carry}</strong>
                            </div>
                          </div>
                        </div>

                        <div className="solver-step-item">
                          <div className="solver-step-num">2</div>
                          <div className="solver-step-content">
                            <div className="solver-step-title">Crosswise: Sum of cross-products + carry (✕)</div>
                            <div className="solver-step-calc">
                              ({aTens} × {bUnits}) + ({aUnits} × {bTens}) + {step1Carry} = ({aTens * bUnits}) + ({aUnits * bTens}) + {step1Carry} = {step2Val} ➔ Write <strong>{step2Unit}</strong>, carry <strong>{step2Carry}</strong>
                            </div>
                          </div>
                        </div>

                        <div className="solver-step-item">
                          <div className="solver-step-num">3</div>
                          <div className="solver-step-content">
                            <div className="solver-step-title">Vertical Left: Tens × Tens + carry (↑)</div>
                            <div className="solver-step-calc">
                              ({aTens} × {bTens}) + {step2Carry} = {aTens * bTens} + {step2Carry} = <strong>{step3Val}</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="solver-result-box">
                      <span className="solver-result-label">{urdhvaA} × {urdhvaB}</span>
                      <span className="solver-result-val">{total.toLocaleString()}</span>
                    </div>
                  </div>
                );
              })()}

              {/* Method 5: Ekanyunena Purvena */}
              {activeSolver === 'ekanyunena' && (() => {
                const left = ekaNyunNum - 1;
                const right = 99 - left;
                const result = ekaNyunNum * 99;

                return (
                  <div>
                    <div className="solver-header">
                      <span className="solver-sutra-tag">सूत्रम् १४ · Ekanyūnena Pūrveṇa</span>
                      <h2 className="solver-title">एकन्यूनेन पूर्वेण — By One Less Than the Previous One</h2>
                      <p className="solver-meaning">
                        Instant multiplication of 2-digit numbers by 99 in 2 seconds.
                      </p>
                    </div>

                    <div className="solver-presets">
                      <span className="solver-presets-label">Try Presets:</span>
                      {[23, 48, 64, 78, 89].map((val) => (
                        <button
                          key={val}
                          type="button"
                          className={`solver-preset-chip${ekaNyunNum === val ? ' active' : ''}`}
                          onClick={() => setEkaNyunNum(val)}
                        >
                          {val} × 99
                        </button>
                      ))}
                    </div>

                    <div className="solver-inputs-row">
                      <div className="solver-input-group">
                        <label htmlFor="ekanyun-num">Number (up to 98):</label>
                        <input
                          id="ekanyun-num"
                          type="number"
                          min={1}
                          max={98}
                          value={ekaNyunNum}
                          onChange={(e) => setEkaNyunNum(Math.min(98, Math.max(1, parseInt(e.target.value, 10) || 1)))}
                        />
                      </div>
                    </div>

                    <div className="solver-visual-card">
                      <div className="solver-step-list">
                        <div className="solver-step-item">
                          <div className="solver-step-num">1</div>
                          <div className="solver-step-content">
                            <div className="solver-step-title">Left Part: Subtract 1 from the number</div>
                            <div className="solver-step-calc">
                              {ekaNyunNum} − 1 = <strong>{left}</strong>
                            </div>
                          </div>
                        </div>

                        <div className="solver-step-item">
                          <div className="solver-step-num">2</div>
                          <div className="solver-step-content">
                            <div className="solver-step-title">Right Part: Subtract left part from 99</div>
                            <div className="solver-step-calc">
                              99 − {left} = <strong>{right}</strong>
                            </div>
                          </div>
                        </div>

                        <div className="solver-step-item">
                          <div className="solver-step-num">3</div>
                          <div className="solver-step-content">
                            <div className="solver-step-title">Concatenate: Left | Right</div>
                            <div className="solver-step-calc">
                              {left} | {right} = <strong>{result.toLocaleString()}</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="solver-result-box">
                      <span className="solver-result-label">{ekaNyunNum} × 99</span>
                      <span className="solver-result-val">{result.toLocaleString()}</span>
                    </div>
                  </div>
                );
              })()}

              {/* Method 6: Antyayordasake'pi */}
              {activeSolver === 'antya' && (() => {
                const tensA = Math.floor(antyaA / 10);
                const unitsA = antyaA % 10;
                const unitsB = antyaB % 10;
                const left = tensA * (tensA + 1);
                const right = unitsA * unitsB;
                const result = antyaA * antyaB;

                return (
                  <div>
                    <div className="solver-header">
                      <span className="solver-sutra-tag">उपसूत्रम् ८ · Antyayordaśake&apos;pi</span>
                      <h2 className="solver-title">अन्त्ययोर्दशकेऽपि — When Units Add to 10 and Tens are Equal</h2>
                      <p className="solver-meaning">
                        Fast calculation when the leading digits match and unit digits sum to 10 (e.g. 43 × 47).
                      </p>
                    </div>

                    <div className="solver-presets">
                      <span className="solver-presets-label">Try Presets:</span>
                      {[
                        { a: 43, b: 47 },
                        { a: 53, b: 57 },
                        { a: 62, b: 68 },
                        { a: 84, b: 86 },
                        { a: 91, b: 99 }
                      ].map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className={`solver-preset-chip${antyaA === item.a && antyaB === item.b ? ' active' : ''}`}
                          onClick={() => {
                            setAntyaA(item.a);
                            setAntyaB(item.b);
                          }}
                        >
                          {item.a} × {item.b}
                        </button>
                      ))}
                    </div>

                    <div className="solver-visual-card">
                      <div className="solver-step-list">
                        <div className="solver-step-item">
                          <div className="solver-step-num">1</div>
                          <div className="solver-step-content">
                            <div className="solver-step-title">Left Part: Tens digit × (Tens + 1)</div>
                            <div className="solver-step-calc">
                              {tensA} × ({tensA} + 1) = {tensA} × {tensA + 1} = <strong>{left}</strong>
                            </div>
                          </div>
                        </div>

                        <div className="solver-step-item">
                          <div className="solver-step-num">2</div>
                          <div className="solver-step-content">
                            <div className="solver-step-title">Right Part: Multiply unit digits</div>
                            <div className="solver-step-calc">
                              {unitsA} × {unitsB} = <strong>{right.toString().padStart(2, '0')}</strong>
                            </div>
                          </div>
                        </div>

                        <div className="solver-step-item">
                          <div className="solver-step-num">3</div>
                          <div className="solver-step-content">
                            <div className="solver-step-title">Concatenate: Left | Right</div>
                            <div className="solver-step-calc">
                              {left} | {right.toString().padStart(2, '0')} = <strong>{result.toLocaleString()}</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="solver-result-box">
                      <span className="solver-result-label">{antyaA} × {antyaB}</span>
                      <span className="solver-result-val">{result.toLocaleString()}</span>
                    </div>
                  </div>
                );
              })()}

              {/* Method 7: Beejank Digital Root Validator */}
              {activeSolver === 'beejank' && (() => {
                const rootA = getDigitalRoot(beejankA);
                const rootB = getDigitalRoot(beejankB);
                const rootProd = getDigitalRoot(rootA * rootB);
                const product = beejankA * beejankB;
                const rootAns = getDigitalRoot(product);
                const isMatch = rootProd === rootAns;

                return (
                  <div>
                    <div className="solver-header">
                      <span className="solver-sutra-tag">सूत्रम् १५ · Guṇitasamuccayaḥ</span>
                      <h2 className="solver-title">बीजाङ्क (Beejank) — The Digital Root Verification Method</h2>
                      <p className="solver-meaning">
                        Check any mathematical multiplication or division in seconds by comparing single-digit digital sums.
                      </p>
                    </div>

                    <div className="solver-inputs-row">
                      <div className="solver-input-group">
                        <label htmlFor="beejank-a">Multiplier A:</label>
                        <input
                          id="beejank-a"
                          type="number"
                          value={beejankA}
                          onChange={(e) => setBeejankA(parseInt(e.target.value, 10) || 1)}
                        />
                      </div>
                      <div className="solver-input-group">
                        <label htmlFor="beejank-b">Multiplier B:</label>
                        <input
                          id="beejank-b"
                          type="number"
                          value={beejankB}
                          onChange={(e) => setBeejankB(parseInt(e.target.value, 10) || 1)}
                        />
                      </div>
                    </div>

                    <div className="solver-visual-card">
                      <div className="solver-step-list">
                        <div className="solver-step-item">
                          <div className="solver-step-num">1</div>
                          <div className="solver-step-content">
                            <div className="solver-step-title">Digital Root of Number A ({beejankA})</div>
                            <div className="solver-step-calc">
                              Sum digits until 1 single digit remains = <strong>{rootA}</strong>
                            </div>
                          </div>
                        </div>

                        <div className="solver-step-item">
                          <div className="solver-step-num">2</div>
                          <div className="solver-step-content">
                            <div className="solver-step-title">Digital Root of Number B ({beejankB})</div>
                            <div className="solver-step-calc">
                              Sum digits until 1 single digit remains = <strong>{rootB}</strong>
                            </div>
                          </div>
                        </div>

                        <div className="solver-step-item">
                          <div className="solver-step-num">3</div>
                          <div className="solver-step-content">
                            <div className="solver-step-title">Product of Roots</div>
                            <div className="solver-step-calc">
                              {rootA} × {rootB} = {rootA * rootB} ➔ Root = <strong>{rootProd}</strong>
                            </div>
                          </div>
                        </div>

                        <div className="solver-step-item">
                          <div className="solver-step-num">4</div>
                          <div className="solver-step-content">
                            <div className="solver-step-title">Digital Root of Calculated Answer ({product})</div>
                            <div className="solver-step-calc">
                              Root of {product} = <strong>{rootAns}</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="solver-result-box" style={{ background: isMatch ? '#f0fdf4' : '#fef2f2', borderColor: isMatch ? '#86efac' : '#fca5a5' }}>
                      <span className="solver-result-label" style={{ color: isMatch ? '#166534' : '#991b1b' }}>
                        Verification Status
                      </span>
                      <span className="solver-result-val" style={{ color: isMatch ? '#15803d' : '#b91c1c', fontSize: '1.4rem' }}>
                        {isMatch ? `✅ Verified Correct! (${rootProd} = ${rootAns})` : '❌ Mismatch detected'}
                      </span>
                    </div>
                  </div>
                );
              })()}
            </section>
          </div>
        )}

        {/* ==================================================================
            TAB: ARTICLES MASTERCLASS (6 IN-DEPTH ARTICLES)
            ================================================================== */}
        {(activeTab === 'articles' || activeTab === 'essay') && (
          <div className="articles-hub-container">
            {/* Article Selector Navigation Pills */}
            <div className="article-nav-pills-wrap">
              <div className="article-nav-pills-label">
                <span>📚 Vedic Knowledge Library · Select Article</span>
              </div>
              <div className="article-nav-pills">
                {VEDIC_ARTICLES.map((article, idx) => (
                  <button
                    key={article.id}
                    type="button"
                    className={`article-nav-pill${selectedArticleId === article.id ? ' active' : ''}`}
                    onClick={() => setSelectedArticleId(article.id)}
                  >
                    <span>{idx + 1}.</span>
                    <span>{article.badge}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Active Article Reading Presentation */}
            <article className="article-reading-card">
              <div className="article-meta-header">
                <span className="article-badge-tag">
                  ✦ {currentArticle.badge}
                </span>
                <span className="article-reading-time">
                  ⏱️ {currentArticle.readingTime}
                </span>
              </div>

              <div className="article-sa-heading">{currentArticle.sanskritTitle}</div>
              <h1 className="article-en-heading">{currentArticle.title}</h1>
              <p className="article-subtitle">{currentArticle.subtitle}</p>

              {/* Sections */}
              {currentArticle.sections.map((sec, sIdx) => (
                <div key={sIdx} className="article-section-block">
                  <h2 className="article-section-title">{sec.title}</h2>
                  {sec.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="article-p">{p}</p>
                  ))}
                  {sec.highlight && (
                    <div className="article-highlight-box">
                      💡 {sec.highlight}
                    </div>
                  )}
                </div>
              ))}

              {/* Pull Quote */}
              {currentArticle.quote && (
                <div className="article-pullquote">
                  <span className="article-pullquote-mark">&ldquo;</span>
                  {currentArticle.quote}
                </div>
              )}

              {/* Key Takeaways */}
              <div className="article-takeaways-card">
                <div className="article-takeaways-title">
                  <span>🎯 Key Architectural Takeaways</span>
                </div>
                {currentArticle.keyTakeaways.map((point, kIdx) => (
                  <div key={kIdx} className="article-takeaway-item">
                    <span className="article-takeaway-icon">✓</span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              {/* Sequential Footer Navigation & Interactive CTAs */}
              <div className="article-action-footer">
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    type="button"
                    className="article-pager-btn"
                    disabled={currentArticleIdx === 0}
                    onClick={() => {
                      if (currentArticleIdx > 0) {
                        setSelectedArticleId(VEDIC_ARTICLES[currentArticleIdx - 1].id);
                      }
                    }}
                  >
                    ← Previous Article
                  </button>
                  <button
                    type="button"
                    className="article-pager-btn"
                    disabled={currentArticleIdx === VEDIC_ARTICLES.length - 1}
                    onClick={() => {
                      if (currentArticleIdx < VEDIC_ARTICLES.length - 1) {
                        setSelectedArticleId(VEDIC_ARTICLES[currentArticleIdx + 1].id);
                      }
                    }}
                  >
                    Next Article →
                  </button>
                </div>

                {/* Contextual Interactive CTAs */}
                {currentArticle.id === 'birth-grid' && (
                  <button
                    type="button"
                    className="article-interactive-cta"
                    onClick={() => setActiveTab('zero')}
                  >
                    🏛️ Test Roman vs. Decimal Grid Laboratory →
                  </button>
                )}
                {currentArticle.id === 'fluid-space' && (
                  <button
                    type="button"
                    className="article-interactive-cta"
                    onClick={() => setActiveTab('fluid')}
                  >
                    🌊 Open Fluid Space &amp; Parallel Math Visualizer →
                  </button>
                )}
                {currentArticle.id === 'algebra-engine' && (
                  <button
                    type="button"
                    className="article-interactive-cta"
                    onClick={() => setActiveTab('algebra')}
                  >
                    📐 Launch Universal Algebra Engine Proof →
                  </button>
                )}
                {currentArticle.id === 'source-lineage' && (
                  <button
                    type="button"
                    className="article-interactive-cta"
                    onClick={() => setActiveTab('parampara')}
                  >
                    🕉️ Explore Guru Parampara Sacred Lineage →
                  </button>
                )}
                {(currentArticle.id === 'magic-intro' || currentArticle.id === 'geometry-infinite') && (
                  <button
                    type="button"
                    className="article-interactive-cta"
                    onClick={() => setActiveTab('solvers')}
                  >
                    🧮 Try Interactive Mental Math Solvers →
                  </button>
                )}
              </div>
            </article>
          </div>
        )}

        {/* ==================================================================
            TAB: THE ARCHITECTURE OF ABSOLUTE ZERO & THE NUMERICAL GRID
            ================================================================== */}
        {activeTab === 'zero' && (
          <div className="zero-essay-container">
            <div className="zero-badge-pill">
              <span>॥ शून्यं सर्वप्रपञ्चस्य मूलम् ॥</span>
              <span>·</span>
              <span>The Architecture of Absolute Zero</span>
            </div>

            <h1 className="zero-essay-title">{VEDIC_ZERO_ESSAY.title}</h1>
            <p className="zero-essay-subtitle">{VEDIC_ZERO_ESSAY.subtitle}</p>

            {VEDIC_ZERO_ESSAY.intro.map((p, idx) => (
              <p key={idx} className="vedic-essay-p">{p}</p>
            ))}

            {/* Section 1: The Birth of the Grid */}
            <h2 className="vedic-essay-h2">{VEDIC_ZERO_ESSAY.birthGrid.title}</h2>
            {VEDIC_ZERO_ESSAY.birthGrid.paragraphs.map((p, idx) => (
              <p key={idx} className="vedic-essay-p">{p}</p>
            ))}

            {/* Interactive Roman vs Decimal Place-Value Tester */}
            <div className="roman-compare-card">
              <div className="roman-compare-header">
                <span>🏛️ Interactive Grid Test: Roman Tally vs. Indian Decimal System</span>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#4b5563', marginBottom: '1rem' }}>
                Test any number to see why Roman numerals required immense paper real estate, while the Indian positional system represents numbers dynamically:
              </p>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#6b7280' }}>Presets:</span>
                {[333, 1984, 2026, 3888].map((val) => (
                  <button
                    key={val}
                    type="button"
                    className={`solver-preset-chip${romanInputNum === val ? ' active' : ''}`}
                    onClick={() => setRomanInputNum(val)}
                  >
                    {val}
                  </button>
                ))}
                <input
                  type="number"
                  min={1}
                  max={3999}
                  value={romanInputNum}
                  onChange={(e) => setRomanInputNum(Math.min(3999, Math.max(1, parseInt(e.target.value, 10) || 1)))}
                  style={{
                    padding: '0.3rem 0.6rem',
                    fontSize: '0.95rem',
                    borderRadius: '6px',
                    border: '1.5px solid #d1d5db',
                    width: '100px',
                    marginLeft: '0.5rem'
                  }}
                />
              </div>

              <div className="roman-compare-grid">
                <div className="roman-box">
                  <div className="roman-box-label">Roman Numeral (Fixed Tally System)</div>
                  <div className="roman-output-val">{getRoman(romanInputNum)}</div>
                  <div className="roman-note">
                    Length: <strong>{getRoman(romanInputNum).length} static characters</strong> with no positional multiplication scaling.
                  </div>
                </div>

                <div className="roman-box" style={{ background: '#f0fdf4', borderColor: '#bbf7d0' }}>
                  <div className="roman-box-label" style={{ color: '#166534' }}>Indian Decimal Place-Value System</div>
                  <div className="decimal-output-val">{romanInputNum.toLocaleString()}</div>
                  <div className="roman-note" style={{ color: '#166534' }}>
                    Length: <strong>{romanInputNum.toString().length} dynamic digits</strong> ={' '}
                    {romanInputNum
                      .toString()
                      .split('')
                      .map((d, i, arr) => `${d} × 10^${arr.length - 1 - i}`)
                      .join(' + ')}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Global Journey */}
            <h2 className="vedic-essay-h2">{VEDIC_ZERO_ESSAY.globalJourney.title}</h2>
            <div className="timeline-wrap">
              {VEDIC_ZERO_ESSAY.globalJourney.timeline.map((item, idx) => (
                <div key={idx} className="timeline-item">
                  <div className="timeline-era">{item.era}</div>
                  <div className="timeline-who">{item.who}</div>
                  <div className="timeline-desc">{item.description}</div>
                </div>
              ))}
            </div>

            {/* Section 3: Conclusion & Next Steps */}
            <h2 className="vedic-essay-h2">{VEDIC_ZERO_ESSAY.conclusion.title}</h2>
            {VEDIC_ZERO_ESSAY.conclusion.paragraphs.map((p, idx) => (
              <p key={idx} className="vedic-essay-p">{p}</p>
            ))}

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
              <button
                type="button"
                className="article-interactive-cta"
                onClick={() => setActiveTab('fluid')}
              >
                🌊 Continue to Fluid Space &amp; Simultaneous Math →
              </button>
              <button
                type="button"
                className="article-pager-btn"
                onClick={() => {
                  setSelectedArticleId('birth-grid');
                  setActiveTab('articles');
                }}
              >
                📖 Read Full Grid Article in Masterclass
              </button>
            </div>
          </div>
        )}

        {/* ==================================================================
            TAB: FLUID SPACE & SIMULTANEOUS PARALLEL PROCESSING
            ================================================================== */}
        {activeTab === 'fluid' && (
          <div className="fluid-space-container">
            <div className="zero-badge-pill" style={{ background: '#ecfdf5', color: '#065f46' }}>
              <span>॥ स्थानमानस्य सातत्यं युगपत्-प्रक्रिया च ॥</span>
              <span>·</span>
              <span>Fluid Space &amp; Simultaneous Processing</span>
            </div>

            <div className="fluid-space-hero">
              <h1 className="zero-essay-title">Treating Place Value as Fluid Space</h1>
              <p className="zero-essay-subtitle">
                While conventional school mathematics treats place value as a rigid set of isolated columns, Vedic Mathematics treats it as a continuous, fluid continuum. The Sutra <em>Ūrdhva-Tiryagbhyām</em> (Vertically and Crosswise) allows you to calculate units, tens, and hundreds simultaneously in parallel in a single line!
              </p>
            </div>

            {/* Interactive Parallel Flow Visualizer */}
            <div className="fluid-interactive-card">
              <div className="fluid-inputs-bar">
                <div className="fluid-presets">
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#78350f' }}>Try Presets:</span>
                  {[
                    { a: 23, b: 45 },
                    { a: 31, b: 52 },
                    { a: 42, b: 36 },
                    { a: 64, b: 25 }
                  ].map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`solver-preset-chip${fluidNumA === p.a && fluidNumB === p.b ? ' active' : ''}`}
                      onClick={() => {
                        setFluidNumA(p.a);
                        setFluidNumB(p.b);
                      }}
                    >
                      {p.a} × {p.b}
                    </button>
                  ))}
                </div>

                <div className="fluid-inputs-direct">
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#4b5563' }}>Custom 2-Digit:</span>
                  <input
                    type="number"
                    min={10}
                    max={99}
                    value={fluidNumA}
                    onChange={(e) => setFluidNumA(Math.min(99, Math.max(10, parseInt(e.target.value, 10) || 10)))}
                    className="fluid-input-field"
                  />
                  <span style={{ fontWeight: 800, color: '#9ca3af' }}>×</span>
                  <input
                    type="number"
                    min={10}
                    max={99}
                    value={fluidNumB}
                    onChange={(e) => setFluidNumB(Math.min(99, Math.max(10, parseInt(e.target.value, 10) || 10)))}
                    className="fluid-input-field"
                  />
                </div>
              </div>

              {(() => {
                const a1 = Math.floor(fluidNumA / 10);
                const a0 = fluidNumA % 10;
                const b1 = Math.floor(fluidNumB / 10);
                const b0 = fluidNumB % 10;

                // Step 1: Units
                const prod1 = a0 * b0;
                const unitDigit = prod1 % 10;
                const carry1 = Math.floor(prod1 / 10);

                // Step 2: Crosswise
                const cross1 = a1 * b0;
                const cross2 = a0 * b1;
                const crossSum = cross1 + cross2 + carry1;
                const tensDigit = crossSum % 10;
                const carry2 = Math.floor(crossSum / 10);

                // Step 3: Left
                const prod3 = a1 * b1;
                const hundredVal = prod3 + carry2;

                const finalProd = fluidNumA * fluidNumB;

                return (
                  <div>
                    <div className="fluid-comparison-grid">
                      {/* Conventional School Long Multiplication */}
                      <div className="fluid-school-card">
                        <span className="fluid-card-tag">Traditional School Method</span>
                        <h3 className="fluid-card-title">Rigid Columnar Scrap Work</h3>
                        
                        <div className="fluid-school-stack">
                          <div>&nbsp;&nbsp;{fluidNumA}</div>
                          <div>×&nbsp;{fluidNumB}</div>
                          <div className="fluid-school-line" />
                          <div>&nbsp;{fluidNumA * b0} <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>({fluidNumA}×{b0})</span></div>
                          <div>{fluidNumA * b1}0 <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>({fluidNumA}×{b1}0)</span></div>
                          <div className="fluid-school-line" />
                          <div style={{ fontWeight: 800, color: '#1f2937' }}>{finalProd}</div>
                        </div>

                        <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: 0, lineHeight: 1.5 }}>
                          ⚠️ Requires 3 distinct rows of paper writing, indenting with placeholder zeros, multiple isolated carries, and vertical column addition.
                        </p>
                      </div>

                      {/* Vedic Simultaneous Parallel Stream */}
                      <div className="fluid-vedic-card">
                        <span className="fluid-card-tag">Vedic Ūrdhva-Tiryagbhyām</span>
                        <h3 className="fluid-card-title">Simultaneous Symmetrical Matrix</h3>

                        <div className="fluid-vedic-steps">
                          <div className="fluid-vedic-step">
                            <div className="fluid-vedic-step-label">
                              <span>↓ Vertical Right (Units):</span>
                            </div>
                            <div className="fluid-vedic-step-calc">
                              {a0} × {b0} = {prod1} ➔ <strong>{unitDigit}</strong> (carry {carry1})
                            </div>
                          </div>

                          <div className="fluid-vedic-step">
                            <div className="fluid-vedic-step-label">
                              <span>✕ Crosswise (Tens):</span>
                            </div>
                            <div className="fluid-vedic-step-calc">
                              ({a1}×{b0}) + ({a0}×{b1}) + {carry1} = {crossSum} ➔ <strong>{tensDigit}</strong> (carry {carry2})
                            </div>
                          </div>

                          <div className="fluid-vedic-step">
                            <div className="fluid-vedic-step-label">
                              <span>↓ Vertical Left (Hundreds):</span>
                            </div>
                            <div className="fluid-vedic-step-calc">
                              ({a1}×{b1}) + {carry2} = <strong>{hundredVal}</strong>
                            </div>
                          </div>
                        </div>

                        <div className="fluid-vedic-single-line">
                          <div className="fluid-single-line-label">Direct Single-Line Answer</div>
                          <div className="fluid-single-line-ans">{finalProd.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>

                    {/* Metric Contrast Bar */}
                    <div className="fluid-metric-contrast">
                      <div>
                        <div className="fluid-metric-item-num">0</div>
                        <div className="fluid-metric-item-label">Scrap Rows Needed</div>
                      </div>
                      <div>
                        <div className="fluid-metric-item-num">10–15×</div>
                        <div className="fluid-metric-item-label">Faster Mental Processing</div>
                      </div>
                      <div>
                        <div className="fluid-metric-item-num">100%</div>
                        <div className="fluid-metric-item-label">Parallel Geometric Sync</div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="article-interactive-cta"
                onClick={() => setActiveTab('algebra')}
              >
                📐 See how this exact formula powers Algebra →
              </button>
              <button
                type="button"
                className="article-pager-btn"
                onClick={() => {
                  setSelectedArticleId('fluid-space');
                  setActiveTab('articles');
                }}
              >
                📖 Read Complete Fluid Space Article
              </button>
            </div>
          </div>
        )}

        {/* ==================================================================
            TAB: UNIVERSAL ENGINE OF ALGEBRA (BASE 10 VS BASE X)
            ================================================================== */}
        {activeTab === 'algebra' && (
          <div className="zero-essay-container">
            <div className="zero-badge-pill" style={{ background: '#fef3c7', color: '#92400e' }}>
              <span>॥ बीजगणितस्य सार्वभौम-यन्त्रम् ॥</span>
              <span>·</span>
              <span>Base 10 vs Base x Unification</span>
            </div>

            <h1 className="zero-essay-title">The Universal Engine of Algebra</h1>
            <p className="zero-essay-subtitle">
              The most profound proof that Vedic math is a deep conceptual system rather than a bag of tricks is its seamless transition into Algebra. Universally, arithmetic and algebra are not two distinct subjects—algebra is simply generalized arithmetic.
            </p>

            {/* Interactive Algebra Bridge */}
            <div className="algebra-bridge-box" style={{ marginTop: '1.5rem' }}>
              <h3 className="algebra-bridge-title">
                📐 Interactive Proof: Identical Coefficient Vector [1, a+b, ab]
              </h3>
              <p className="algebra-bridge-desc">
                Notice how the Vedic Sutra <em>Ūrdhva-Tiryagbhyām</em> generates the exact identical coefficient array whether the base is concrete 10 or unknown variable x:
              </p>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#6b7280' }}>Try Coefficients:</span>
                {[
                  { a: 2, b: 3 },
                  { a: 3, b: 4 },
                  { a: 1, b: 5 },
                  { a: 4, b: 5 },
                  { a: 6, b: 7 }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`solver-preset-chip${algebraConstA === item.a && algebraConstB === item.b ? ' active' : ''}`}
                    onClick={() => {
                      setAlgebraConstA(item.a);
                      setAlgebraConstB(item.b);
                    }}
                  >
                    (x + {item.a})(x + {item.b})
                  </button>
                ))}
              </div>

              {(() => {
                const a = algebraConstA;
                const b = algebraConstB;
                const sum = a + b;
                const prod = a * b;
                const arithNum1 = 10 + a;
                const arithNum2 = 10 + b;
                const arithAns = arithNum1 * arithNum2;

                return (
                  <div className="algebra-bridge-grid">
                    <div className="algebra-col-card">
                      <h4 className="algebra-col-title">Arithmetic (Base 10)</h4>
                      <div className="algebra-math-formula">
                        {arithNum1} × {arithNum2} = (10 + {a})(10 + {b})
                      </div>
                      <div style={{ fontSize: '0.92rem', color: '#374151', margin: '0.4rem 0' }}>
                        = 1·(10²) + {sum}·(10) + {prod}
                      </div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#15803d' }}>
                        = {arithAns}
                      </div>
                      <div className="algebra-coeff-chip">
                        Coefficients: [1, {sum}, {prod}]
                      </div>
                    </div>

                    <div className="algebra-col-card">
                      <h4 className="algebra-col-title">Algebra (Base x)</h4>
                      <div className="algebra-math-formula">
                        (x + {a})(x + {b})
                      </div>
                      <div style={{ fontSize: '0.92rem', color: '#374151', margin: '0.4rem 0' }}>
                        = 1·(x²) + {sum}·(x) + {prod}
                      </div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#b45309' }}>
                        = x² + {sum}x + {prod}
                      </div>
                      <div className="algebra-coeff-chip" style={{ background: '#fef3c7', color: '#92400e' }}>
                        Coefficients: [1, {sum}, {prod}]
                      </div>
                    </div>
                  </div>
                );
              })()}

              <p style={{ fontSize: '0.95rem', color: '#374151', lineHeight: 1.65, margin: '1.25rem 0 0 0' }}>
                {VEDIC_ZERO_ESSAY.algebraEngine.summary}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.75rem' }}>
              <button
                type="button"
                className="article-interactive-cta"
                onClick={() => setActiveTab('parampara')}
              >
                🕉️ Discover the Guru Parampara Lineage →
              </button>
              <button
                type="button"
                className="article-pager-btn"
                onClick={() => {
                  setSelectedArticleId('algebra-engine');
                  setActiveTab('articles');
                }}
              >
                📖 Read Full Algebra Article in Masterclass
              </button>
            </div>
          </div>
        )}

        {/* ==================================================================
            TAB: VEDIC GEOMETRY & THE SCIENCE OF SHAPES (शुल्बसूत्राणि)
            ================================================================== */}
        {activeTab === 'geometry' && (
          <div className="zero-essay-container">
            <div className="zero-badge-pill" style={{ background: '#ecfdf5', color: '#065f46' }}>
              <span>॥ शुल्बसूत्राणि · रेखागणितम् ॥</span>
              <span>·</span>
              <span>The Sacred Science of Shapes</span>
            </div>

            <h1 className="zero-essay-title">Vedic Geometry: The Science of Shapes</h1>
            <p className="zero-essay-subtitle">
              Centuries before Euclidean geometry arose in the Mediterranean, ancient Indian master-geometers documented the Śulba Sūtras (शुल्बसूत्राणि)—using ropes, pegs, and exact geometric transformations to construct monumental fire altars, squares, circles, and Pythagorean triples.
            </p>

            {/* Video Player Box */}
            <div
              style={{
                background: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                overflow: 'hidden',
                margin: '2rem 0',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  paddingBottom: '56.25%',
                  height: 0,
                  background: '#090d16',
                }}
              >
                <iframe
                  src="https://www.youtube-nocookie.com/embed/bp9m53Tp6xg?start=11&rel=0"
                  title="Vedic Geometry: The Science Of Shapes"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 0,
                  }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <div
                style={{
                  padding: '1.25rem 1.5rem',
                  background: '#fafaf9',
                  borderTop: '1px solid #f0ece1',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                }}
              >
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#1c1917' }}>
                    🎥 Masterclass: Vedic Geometry — The Science of Shapes
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#78716c', marginTop: '0.2rem' }}>
                    Curated Documentary by <strong>Conscious Cosmos</strong> · Timestamp: starts at 0:11
                  </div>
                </div>
                <a
                  href="https://www.youtube.com/watch?v=bp9m53Tp6xg&t=11s"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    background: '#dc2626',
                    color: '#ffffff',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    textDecoration: 'none',
                  }}
                >
                  <span>▶ Watch on YouTube</span>
                </a>
              </div>
            </div>

            {/* In-depth geometric cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginTop: '1.5rem' }}>
              <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>📐</div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1e293b', margin: '0 0 0.5rem 0' }}>
                  The Śulba Sūtras (शुल्बसूत्राणि)
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.55, margin: 0 }}>
                  <em>"Śulba"</em> literally means a measuring cord or rope. The texts of <em>Baudhāyana, Āpastamba, Kātyāyana</em>, and <em>Mānava</em> documented exact geometric algorithms used to lay out coordinates and right angles on the earth.
                </p>
              </div>

              <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>🔺</div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1e293b', margin: '0 0 0.5rem 0' }}>
                  Baudhāyana’s Theorem (Pre-Pythagoras)
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.55, margin: 0 }}>
                  <em>"दीर्घचतुरश्रस्याक्ष्णया रज्जुः..."</em> Baudhāyana explicitly proved that the diagonal of a rectangle produces by itself both areas which the sides produce separately, centuries before Pythagoras.
                </p>
              </div>

              <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>⭕</div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1e293b', margin: '0 0 0.5rem 0' }}>
                  Circle &amp; Square Transformations (Circling the Square)
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.55, margin: 0 }}>
                  Because Vedic altars had to possess identical surface area regardless of whether their geometry was circular (Gārhapatya) or square (Āhavanīya), Vedic seers devised formulas to convert squares to circles and vice versa.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================
            TAB: GURU PARAMPARA & THE SOURCE (SACRED LINEAGE)
            ================================================================== */}
        {activeTab === 'parampara' && (
          <div className="parampara-container">
            <div className="parampara-hero-crest">
              <div className="parampara-badge-pill">
                <span>॥ मूलस्रोतः गुरुपरम्परा च ॥</span>
                <span>·</span>
                <span>The Sacred Awakening &amp; The Living Lineage</span>
              </div>
              <h1 className="parampara-title">The Lineage of Continuity</h1>
              <p className="parampara-subtitle">
                Vedic Mathematics is far more than an ultra-efficient system of calculation; it is a living stream of knowledge (Vidya) flowing through an ancient spiritual lineage. Meet the visionary masters who revived, guarded, and spread this wisdom worldwide.
              </p>
            </div>

            {/* Lineage Member Cards */}
            <div className="parampara-lineage-flow">
              {GURU_PARAMPARA.map((member) => (
                <div key={member.id} className="lineage-card">
                  <div className="lineage-header">
                    <div className="lineage-identity">
                      <div className="lineage-avatar-icon">{member.imageIcon}</div>
                      <div className="lineage-names">
                        <span className="lineage-name-sa">{member.sanskritName}</span>
                        <h2 className="lineage-name-en">{member.name}</h2>
                      </div>
                    </div>
                    <span className="lineage-badge-pill">{member.badge}</span>
                  </div>

                  <div className="lineage-role-period">
                    <span className="lineage-role">{member.role}</span>
                    <span className="lineage-period">📅 {member.period}</span>
                  </div>

                  <p className="lineage-desc">{member.description}</p>

                  <div className="lineage-contributions">
                    <div className="lineage-contributions-title">Historic Milestones &amp; Contributions:</div>
                    {member.keyContributions.map((c, cIdx) => (
                      <div key={cIdx} className="lineage-contribution-bullet">
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>

                  {member.quote && (
                    <div className="lineage-quote">
                      &ldquo;{member.quote}&rdquo;
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2.5rem', justifyContent: 'center' }}>
              <button
                type="button"
                className="article-interactive-cta"
                onClick={() => setActiveTab('articles')}
              >
                📖 Explore All 6 Masterclass Articles →
              </button>
              <button
                type="button"
                className="article-pager-btn"
                onClick={() => setActiveTab('solvers')}
              >
                🧮 Practice with Vedic Solvers
              </button>
            </div>
          </div>
        )}
        {activeTab === 'logic' && (
          <div className="logic-essay-container">
            <div className="zero-badge-pill" style={{ background: '#ede9fe', color: '#5b21b6' }}>
              <span>॥ सूत्रं ज्ञानाय मङ्गलम् ॥</span>
              <span>·</span>
              <span>The Linguistic Architecture of Calculation</span>
            </div>

            <h1 className="zero-essay-title">{VEDIC_LOGIC_LANGUAGE_ESSAY.title}</h1>
            <p className="zero-essay-subtitle">{VEDIC_LOGIC_LANGUAGE_ESSAY.subtitle}</p>

            {VEDIC_LOGIC_LANGUAGE_ESSAY.intro.map((p, idx) => (
              <p key={idx} className="vedic-essay-p">{p}</p>
            ))}

            {/* Section 1: The 16 Core Sutras and Sub-Sutras */}
            <h2 className="vedic-essay-h2">{VEDIC_LOGIC_LANGUAGE_ESSAY.sutraFramework.title}</h2>
            <p className="vedic-essay-p">{VEDIC_LOGIC_LANGUAGE_ESSAY.sutraFramework.desc}</p>

            <div className="anchor-sutras-grid">
              {VEDIC_LOGIC_LANGUAGE_ESSAY.sutraFramework.keySutras.map((sutra) => (
                <div key={sutra.id} className="anchor-sutra-card">
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <span className="sutra-card-num">Sutra {sutra.id}</span>
                      <button
                        type="button"
                        onClick={() => playPronunciation(sutra.sanskrit)}
                        title="Listen to Sanskrit pronunciation"
                        style={{
                          background: '#fef3c7',
                          border: '1px solid #fde68a',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.85rem',
                          padding: '0.15rem 0.45rem'
                        }}
                      >
                        🔊
                      </button>
                    </div>
                    <h3 className="anchor-sutra-title">{sutra.sanskrit}</h3>
                    <div className="anchor-sutra-iast">{sutra.transliteration}</div>
                    <div className="anchor-sutra-meaning">&ldquo;{sutra.meaning}&rdquo;</div>
                    <div className="anchor-sutra-app">{sutra.application}</div>
                  </div>
                  {sutra.example && (
                    <div className="anchor-sutra-ex">
                      <strong>💡 Example:</strong> {sutra.example}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Section 2: Historical Context: Vedic or Modern? */}
            <h2 className="vedic-essay-h2">{VEDIC_LOGIC_LANGUAGE_ESSAY.historicalContext.title}</h2>
            <p className="vedic-essay-p">{VEDIC_LOGIC_LANGUAGE_ESSAY.historicalContext.intro}</p>

            <div className="historical-matrix-wrap">
              <table className="historical-matrix-table">
                <thead>
                  <tr>
                    <th style={{ width: '22%' }}>Historical Dimension</th>
                    <th style={{ width: '39%' }}>Traditional Vedic View</th>
                    <th style={{ width: '39%' }}>Historical Academic View</th>
                  </tr>
                </thead>
                <tbody>
                  {VEDIC_LOGIC_LANGUAGE_ESSAY.historicalContext.comparisonMatrix.map((row, idx) => (
                    <tr key={idx}>
                      <td>
                        <span className="matrix-dim-badge">{row.dimension}</span>
                      </td>
                      <td>
                        <span className="matrix-trad-badge">Traditional Perspective</span>
                        <div>{row.traditional}</div>
                      </td>
                      <td>
                        <span className="matrix-acad-badge">Academic Perspective</span>
                        <div>{row.academic}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="vedic-essay-quote">
              &ldquo;{VEDIC_LOGIC_LANGUAGE_ESSAY.historicalContext.synthesis}&rdquo;
            </div>

            {/* Section 3: Why the Sanskrit Structure Works: Cognitive Load Shift */}
            <h2 className="vedic-essay-h2">{VEDIC_LOGIC_LANGUAGE_ESSAY.cognitiveLoad.title}</h2>
            <p className="vedic-essay-p">{VEDIC_LOGIC_LANGUAGE_ESSAY.cognitiveLoad.p1}</p>

            <div className="cognitive-load-box">
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.5rem' }}>
                🧠 Cognitive Load: Western Columnar Arithmetic vs. Vedic Sanskrit Aphorisms
              </h3>
              <div className="cognitive-grid">
                <div className="cognitive-card">
                  <div className="cognitive-card-title" style={{ color: '#b91c1c' }}>
                    <span>⚠️ Conventional Columnar Arithmetic</span>
                  </div>
                  <div className="cognitive-card-desc">
                    High cognitive strain on working memory. Requires keeping multiple carries in mind, shifting partial product rows with placeholder zeroes, and performing multi-tier vertical addition. Focus is absorbed by scrap management rather than holistic problem structure.
                  </div>
                </div>

                <div className="cognitive-card" style={{ borderColor: '#86efac', background: '#f0fdf4' }}>
                  <div className="cognitive-card-title" style={{ color: '#15803d' }}>
                    <span>✨ Vedic Sanskrit Cognitive Triggers</span>
                  </div>
                  <div className="cognitive-card-desc">
                    Low working memory load. Short poetic Sanskrit aphorisms trigger spatial, geometric visualization and whole-number pattern recognition. Problems are perceived globally, processed in parallel, and solved in a single line.
                  </div>
                </div>
              </div>
            </div>

            <p className="vedic-essay-p">{VEDIC_LOGIC_LANGUAGE_ESSAY.cognitiveLoad.p2}</p>
            <p className="vedic-essay-p" style={{ fontWeight: 700, color: '#15803d' }}>
              {VEDIC_LOGIC_LANGUAGE_ESSAY.cognitiveLoad.conclusion}
            </p>
          </div>
        )}
        {activeTab === 'sutras' && (
          <div>
            <div className="sutra-search-bar">
              <input
                type="text"
                className="sutra-search-input"
                placeholder="🔍 Search sutra by Sanskrit name, English meaning, or formula..."
                value={sutraSearch}
                onChange={(e) => setSutraSearch(e.target.value)}
              />

              <div className="sutra-filter-chips">
                {[
                  { id: 'all', label: 'All (16)' },
                  { id: 'multiplication', label: '✖️ Multiplication' },
                  { id: 'squaring', label: '² Squaring' },
                  { id: 'subtraction', label: '➖ Subtraction' },
                  { id: 'division', label: '➗ Division' },
                  { id: 'algebra', label: '📐 Algebra' }
                ].map((chip) => (
                  <button
                    key={chip.id}
                    type="button"
                    className={`sutra-filter-chip${sutraFilter === chip.id ? ' active' : ''}`}
                    onClick={() => setSutraFilter(chip.id)}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="sutras-grid">
              {filteredSutras.map((sutra: VedicSutra) => (
                <div key={sutra.id} className="sutra-card">
                  <div className="sutra-card-top">
                    <div className="sutra-card-badge-row">
                      <span className="sutra-card-num">Sutra {sutra.id}</span>
                      <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                        <button
                          type="button"
                          onClick={() => playPronunciation(sutra.sanskrit)}
                          title="Listen to Sanskrit pronunciation"
                          style={{
                            background: '#fef3c7',
                            border: '1px solid #fde68a',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            padding: '0.15rem 0.45rem'
                          }}
                        >
                          🔊
                        </button>
                        <span className="sutra-card-cat">{sutra.category}</span>
                      </div>
                    </div>

                    <h3 className="sutra-card-sanskrit">{sutra.sanskrit}</h3>
                    <p className="sutra-card-iast">{sutra.transliteration}</p>
                    <p className="sutra-card-meaning">&ldquo;{sutra.meaning}&rdquo;</p>
                    <p className="sutra-card-desc">{sutra.description}</p>
                  </div>

                  <div className="sutra-card-example">
                    <div className="sutra-card-example-title">💡 Example: {sutra.example.problem}</div>
                    <ul className="sutra-card-example-steps">
                      {sutra.example.steps.map((st, sIdx) => (
                        <li key={sIdx}>{st}</li>
                      ))}
                    </ul>
                    <div className="sutra-card-example-ans">➔ Answer: {sutra.example.answer}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sub-Sutras Table */}
            <div className="subsutras-section">
              <h2 className="subsutras-title">त्रयोदश उपसूत्राणि · 13 Sub-Sutras (Upa-Sutras)</h2>
              <p className="subsutras-subtitle">
                Corollaries that extend the 16 primary sutras into specialized domains such as proportion, divisibility osculation, and factor reduction.
              </p>

              <div className="subsutras-table-wrap">
                <table className="subsutras-table">
                  <thead>
                    <tr>
                      <th style={{ width: '60px' }}>No.</th>
                      <th>उपसूत्रम् (Sanskrit)</th>
                      <th>Transliteration</th>
                      <th>English Meaning</th>
                      <th>Mathematical Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    {VEDIC_SUBSUTRAS.map((sub) => (
                      <tr key={sub.id}>
                        <td><strong>#{sub.id}</strong></td>
                        <td style={{ fontWeight: 700, color: '#78350f', fontFamily: "'Noto Serif Devanagari', serif" }}>
                          {sub.sanskrit}
                        </td>
                        <td style={{ fontStyle: 'italic', color: '#4b5563' }}>{sub.transliteration}</td>
                        <td style={{ fontWeight: 600 }}>{sub.meaning}</td>
                        <td style={{ color: '#4b5563' }}>{sub.application}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'quiz' && (
          <div className="quiz-container">
            {!quizFinished ? (
              <div>
                {/* Quiz Header */}
                <div className="quiz-header">
                  <span className="quiz-progress-pill">
                    Question {quizIndex + 1} of {VEDIC_QUIZ_QUESTIONS.length}
                  </span>
                  <span className="quiz-score-pill">
                    Score: {quizScore} / {VEDIC_QUIZ_QUESTIONS.length}
                  </span>
                </div>

                {/* Current Question */}
                {(() => {
                  const q = VEDIC_QUIZ_QUESTIONS[quizIndex];
                  return (
                    <div>
                      <div className="quiz-sutra-badge">
                        <span>⚡ Apply: {q.sutraSanskrit}</span>
                        <span>({q.sutraName})</span>
                      </div>

                      <h2 className="quiz-question-text">{q.question}</h2>

                      <div className="quiz-options-grid">
                        {q.options.map((opt, i) => {
                          const isSelected = selectedOption === opt;
                          const isCorrect = opt === q.correctAnswer;
                          let className = 'quiz-option-btn';

                          if (selectedOption !== null) {
                            if (isCorrect) className += ' correct';
                            else if (isSelected) className += ' incorrect';
                          }

                          return (
                            <button
                              key={i}
                              type="button"
                              className={className}
                              disabled={selectedOption !== null}
                              onClick={() => handleSelectOption(opt)}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {showExplanation && (
                        <div
                          className={`quiz-feedback-box ${
                            selectedOption === q.correctAnswer ? 'correct' : 'incorrect'
                          }`}
                        >
                          <div className="quiz-feedback-title">
                            {selectedOption === q.correctAnswer
                              ? '🎉 Correct! Brilliant Mental Math!'
                              : `❌ Not quite! The correct answer is ${q.correctAnswer}`}
                          </div>
                          <div className="quiz-feedback-trick">
                            <strong>⚡ Fast Vedic Trick:</strong> {q.quickTrick}
                          </div>
                          <div className="quiz-feedback-explanation">
                            <strong>Step-by-step:</strong> {q.explanation}
                          </div>
                        </div>
                      )}

                      {selectedOption !== null && (
                        <div className="quiz-actions">
                          <button
                            type="button"
                            className="quiz-next-btn"
                            onClick={handleNextQuestion}
                          >
                            {quizIndex < VEDIC_QUIZ_QUESTIONS.length - 1
                              ? 'Next Question ➔'
                              : 'View Final Score 🏆'}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            ) : (
              <div className="quiz-complete-card">
                <div className="quiz-complete-icon">🏆</div>
                <h2 className="quiz-complete-title">Vedic Speed Challenge Completed!</h2>
                <p className="quiz-complete-score">
                  You scored <strong>{quizScore} out of {VEDIC_QUIZ_QUESTIONS.length}</strong> (
                  {Math.round((quizScore / VEDIC_QUIZ_QUESTIONS.length) * 100)}%)
                </p>
                <button
                  type="button"
                  className="quiz-next-btn"
                  onClick={handleRestartQuiz}
                >
                  🔄 Retake Challenge
                </button>
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
};

export default VedicMaths;
