import React, { useState } from 'react';
import {
  VEDIC_INTRO,
  VEDIC_SUTRAS,
  VEDIC_SUBSUTRAS,
  VEDIC_QUIZ_QUESTIONS,
  type VedicSutra
} from '../data/vedicMaths';
import { playPronunciation } from '../utils/pronunciation';
import '../styles/vedic-maths.css';

type VedicTab = 'solvers' | 'sutras' | 'quiz' | 'essay';
type SolverKey = 'ekadhikena' | 'nikhilam-sub' | 'nikhilam-mul' | 'urdhva' | 'ekanyunena' | 'antya' | 'beejank';

export interface VedicMathsProps {
  onGoHome?: () => void;
  onOpenReader?: () => void;
}

const VedicMaths: React.FC<VedicMathsProps> = ({ onGoHome, onOpenReader }) => {
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

  // Sutra Directory States
  const [sutraSearch, setSutraSearch] = useState('');
  const [sutraFilter, setSutraFilter] = useState<string>('all');

  // Quiz States
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

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
    if (selectedOption !== null) return; // Prevent multiple answers
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

          <div style={{ display: 'flex', gap: '0.5rem' }}>
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
          The Magic of Numbers: An ultra-efficient system of mental calculation that allows people to solve arithmetic and algebraic problems 10 to 15 times faster than conventional methods.
        </p>

        {/* Tab Navigation */}
        <div className="vedic-tabs">
          <button
            type="button"
            className={`vedic-tab-btn${activeTab === 'solvers' ? ' active' : ''}`}
            onClick={() => setActiveTab('solvers')}
          >
            <span>🧮</span>
            <span>Interactive Solvers &amp; Visualizers</span>
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
            <span>Speed Math Challenge (परीक्षा)</span>
          </button>
          <button
            type="button"
            className={`vedic-tab-btn${activeTab === 'essay' ? ' active' : ''}`}
            onClick={() => setActiveTab('essay')}
          >
            <span>📖</span>
            <span>The Magic of Numbers (Overview)</span>
          </button>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="vedic-content-wrap">
        {/* ==================================================================
            TAB 1: INTERACTIVE SOLVERS
            ================================================================== */}
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
                const left = nikMulA + devB; // or nikMulB + devA
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
            TAB 2: 16 SUTRAS & 13 SUB-SUTRAS DIRECTORY
            ================================================================== */}
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
                    <p className="sutra-card-meaning">"{sutra.meaning}"</p>
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

        {/* ==================================================================
            TAB 3: SPEED MATH QUIZ
            ================================================================== */}
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

        {/* ==================================================================
            TAB 4: MAGIC OF NUMBERS ESSAY & CONTEXT
            ================================================================== */}
        {activeTab === 'essay' && (
          <div className="vedic-essay-wrap">
            <h2 className="vedic-essay-h2">{VEDIC_INTRO.title}</h2>
            <p className="vedic-essay-p">{VEDIC_INTRO.p1}</p>
            <p className="vedic-essay-p">{VEDIC_INTRO.p2}</p>

            <h2 className="vedic-essay-h2">{VEDIC_INTRO.originTitle}</h2>
            <p className="vedic-essay-p">{VEDIC_INTRO.originText}</p>

            <div className="vedic-essay-quote">
              &ldquo;{VEDIC_INTRO.originQuote}&rdquo;
            </div>

            <h2 className="vedic-essay-h2">Key Benefits of Learning Vedic Math</h2>
            <div className="benefits-grid">
              {VEDIC_INTRO.benefits.map((b, idx) => (
                <div key={idx} className="benefit-card">
                  <div className="benefit-icon">{b.icon}</div>
                  <div className="benefit-title">{b.title}</div>
                  <div className="benefit-desc">{b.desc}</div>
                </div>
              ))}
            </div>

            <h2 className="vedic-essay-h2">{VEDIC_INTRO.modernTitle}</h2>
            <p className="vedic-essay-p">{VEDIC_INTRO.modernText}</p>
            <p className="vedic-essay-p">
              By learning Vedic Mathematics, you aren’t just memorizing clever math hacks. You are adopting a structured, elegant system of reasoning that transforms your relationship with numbers forever.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default VedicMaths;
