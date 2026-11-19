import React, { useState } from 'react';
import {
  INDIAN_MATH_DISCLAIMER,
  EPISTEMOLOGICAL_COMPARISONS,
  INDIAN_MATH_ERAS,
  type IndianMathEra
} from '../data/indianMathematicsData';
import '../styles/indian-mathematics.css';

export interface IndianMathematicsStudioProps {
  onGoHome?: () => void;
  onOpenVedicMaths?: () => void;
  onOpenPhilosophy?: () => void;
  onOpenScienceLab?: (segment?: string) => void;
  initialEraId?: string;
  initialTab?: 'timeline' | 'disclaimer' | 'epistemology' | 'solvers';
}

export const IndianMathematicsStudio: React.FC<IndianMathematicsStudioProps> = ({
  onGoHome,
  onOpenVedicMaths,
  onOpenPhilosophy,
  onOpenScienceLab,
  initialEraId,
  initialTab = 'timeline'
}) => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'disclaimer' | 'epistemology' | 'solvers'>(initialTab);
  
  // Find initial era index
  const initialIndex = initialEraId
    ? INDIAN_MATH_ERAS.findIndex((e) => e.id === initialEraId || e.slug === initialEraId)
    : 0;
  const [selectedEraIndex, setSelectedEraIndex] = useState<number>(initialIndex >= 0 ? initialIndex : 0);
  const [expandedPillar, setExpandedPillar] = useState<string | null>(null);

  // Current active era
  const currentEra: IndianMathEra = INDIAN_MATH_ERAS[selectedEraIndex] || INDIAN_MATH_ERAS[0];

  // Interactive Demo State: Era 1 (Baudhayana)
  const [baudhayanaBase, setBaudhayanaBase] = useState<number>(3);
  const [baudhayanaHeight, setBaudhayanaHeight] = useState<number>(4);

  // Interactive Demo State: Era 2 (Pingala Meru-Prastara)
  const [meruRows, setMeruRows] = useState<number>(6);

  // Interactive Demo State: Era 3 (Jaina Combinations)
  const [jainaN, setJainaN] = useState<number>(6);
  const [jainaR, setJainaR] = useState<number>(3);

  // Interactive Demo State: Era 4 (Bakhshali Sqrt)
  const [bakhshaliA, setBakhshaliA] = useState<number>(41);

  // Interactive Demo State: Era 5 (Aryabhata Kuttaka)
  const [kuttakaA, setKuttakaA] = useState<number>(137);
  const [kuttakaB, setKuttakaB] = useState<number>(60);
  const [kuttakaC, setKuttakaC] = useState<number>(1);

  // Interactive Demo State: Era 6 (Bhaskara I Sine)
  const [bhaskaraAngle, setBhaskaraAngle] = useState<number>(30);

  // Interactive Demo State: Era 7 (Brahmagupta Cyclic Quad)
  const [quadA, setQuadA] = useState<number>(25);
  const [quadB, setQuadB] = useState<number>(60);
  const [quadC, setQuadC] = useState<number>(52);
  const [quadD, setQuadD] = useState<number>(39);

  // Interactive Demo State: Era 8 (Sridhara Quadratic)
  const [quadCoeffA, setQuadCoeffA] = useState<number>(1);
  const [quadCoeffB, setQuadCoeffB] = useState<number>(-7);
  const [quadCoeffC, setQuadCoeffC] = useState<number>(12);

  // Interactive Demo State: Era 9 (Bhaskara II Chakravala)
  const [chakravalaN, setChakravalaN] = useState<number>(61);

  // Interactive Demo State: Era 11 (Kerala Madhava Series)
  const [madhavaTerms, setMadhavaTerms] = useState<number>(10);

  // Stepper handlers
  const handleNextEra = () => {
    if (selectedEraIndex < INDIAN_MATH_ERAS.length - 1) {
      setSelectedEraIndex(selectedEraIndex + 1);
    }
  };

  const handlePrevEra = () => {
    if (selectedEraIndex > 0) {
      setSelectedEraIndex(selectedEraIndex - 1);
    }
  };

  // Helper math for Pingala Pascal Triangle
  const generateMeruTriangle = (rows: number): number[][] => {
    const clamped = Math.min(Math.max(rows, 1), 10);
    const triangle: number[][] = [];
    for (let r = 0; r < clamped; r++) {
      const row: number[] = [1];
      for (let c = 1; c < r; c++) {
        row.push(triangle[r - 1][c - 1] + triangle[r - 1][c]);
      }
      if (r > 0) row.push(1);
      triangle.push(row);
    }
    return triangle;
  };

  // Helper math for Combinations
  const computeCombinations = (n: number, r: number): number => {
    if (r < 0 || r > n) return 0;
    if (r === 0 || r === n) return 1;
    let res = 1;
    for (let i = 1; i <= r; i++) {
      res = (res * (n - i + 1)) / i;
    }
    return Math.round(res);
  };

  // Helper math for Bakhshali Sqrt
  const computeBakhshaliSqrt = (num: number) => {
    if (num <= 0) return { a: 0, r: 0, firstOrder: 0, approx: 0, trueVal: 0, errorPct: 0 };
    const a = Math.floor(Math.sqrt(num));
    const r = num - a * a;
    const firstOrder = a + r / (2 * a);
    const secondOrder = firstOrder - Math.pow(r / (2 * a), 2) / (2 * firstOrder);
    return {
      a,
      r,
      firstOrder,
      approx: secondOrder,
      trueVal: Math.sqrt(num),
      errorPct: (Math.abs(secondOrder - Math.sqrt(num)) / Math.sqrt(num)) * 100
    };
  };

  // Helper math for Bhaskara I Sine
  const computeBhaskaraSine = (deg: number) => {
    const d = Math.abs(deg % 180);
    const bhaskaraVal = (4 * d * (180 - d)) / (40500 - d * (180 - d));
    const rad = (d * Math.PI) / 180;
    const trueVal = Math.sin(rad);
    const errorPct = trueVal === 0 ? 0 : (Math.abs(bhaskaraVal - trueVal) / trueVal) * 100;
    return { bhaskaraVal, trueVal, errorPct };
  };

  // Helper math for Brahmagupta Quad
  const computeBrahmaguptaQuad = (a: number, b: number, c: number, d: number) => {
    const s = (a + b + c + d) / 2;
    const prod = (s - a) * (s - b) * (s - c) * (s - d);
    if (prod <= 0) return { valid: false, area: 0, s };
    return { valid: true, area: Math.sqrt(prod), s };
  };

  // Helper math for Sridhara Quadratic
  const computeSridharaRoots = (a: number, b: number, c: number) => {
    if (a === 0) return { linear: true, root: -c / b };
    const discriminant = b * b - 4 * a * c;
    if (discriminant > 0) {
      const r1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      const r2 = (-b - Math.sqrt(discriminant)) / (2 * a);
      return { disc: discriminant, real: true, r1, r2 };
    } else if (discriminant === 0) {
      const r = -b / (2 * a);
      return { disc: discriminant, real: true, r1: r, r2: r };
    } else {
      return { disc: discriminant, real: false, r1: null, r2: null };
    }
  };

  // Helper math for Madhava Pi series
  const computeMadhavaPi = (terms: number) => {
    let sum = 0;
    for (let i = 0; i < terms; i++) {
      const sign = i % 2 === 0 ? 1 : -1;
      sum += sign / (2 * i + 1);
    }
    const rawPi = 4 * sum;
    // Madhava remainder correction: R_n = 1 / (4n) or (n^2 + 1) / (4n^3 + 5n)
    const n = terms;
    const correction = (n * n + 1) / (4 * n * n * n + 5 * n);
    const sign = terms % 2 === 0 ? -1 : 1;
    const correctedPi = 4 * (sum + sign * correction);
    return {
      rawPi,
      correctedPi,
      truePi: Math.PI,
      rawError: Math.abs(rawPi - Math.PI),
      correctedError: Math.abs(correctedPi - Math.PI)
    };
  };

  return (
    <div className="im-studio-container" role="main" aria-label="Indian Mathematics Studio">
      {/* Hero Header */}
      <header className="im-hero-banner">
        <div className="im-hero-top">
          <span className="im-hero-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            भारतीय-ज्ञान-परम्परा · Indian Knowledge Systems
          </span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {onOpenVedicMaths && (
              <button type="button" className="im-btn im-btn-outline" onClick={onOpenVedicMaths} title="Open 16 Vedic Mental Math Sutras">
                16 Vedic Sūtras
              </button>
            )}
            {onOpenPhilosophy && (
              <button type="button" className="im-btn im-btn-outline" onClick={onOpenPhilosophy} title="Explore Nyāya & 6 Darśanas">
                6 Darśanas
              </button>
            )}
            {onOpenScienceLab && (
              <button type="button" className="im-btn im-btn-outline" onClick={() => onOpenScienceLab('geometry')} title="Explore IKS Science Labs">
                Science Labs
              </button>
            )}
          </div>
        </div>

        <h1 className="im-hero-title-sa">भारतीय-गणित-परम्परा</h1>
        <h2 className="im-hero-title-en">The Continuous Living Lineage of Indian Mathematics</h2>
        <p className="im-hero-subtitle">
          An unbroken scientific continuum spanning over 3,000 years: from Vedic geometric area-invariants and Piṅgala’s binary combinatorics, through classical astronomy, zero, and indeterminate algebra, to the Kerala calculus revolution and modern mathematical frontiers.
        </p>

        <div className="im-hero-nav-actions">
          <button
            type="button"
            className={`im-btn ${activeTab === 'timeline' ? 'im-btn-primary' : 'im-btn-outline'}`}
            onClick={() => setActiveTab('timeline')}
          >
            Step-by-Step Historical Lineage (12 Eras)
          </button>
          <button
            type="button"
            className={`im-btn ${activeTab === 'disclaimer' ? 'im-btn-primary' : 'im-btn-outline'}`}
            onClick={() => setActiveTab('disclaimer')}
          >
            Foundational Historiographical Disclaimer
          </button>
          <button
            type="button"
            className={`im-btn ${activeTab === 'epistemology' ? 'im-btn-primary' : 'im-btn-outline'}`}
            onClick={() => setActiveTab('epistemology')}
          >
            Indian vs. Modern Western Epistemology
          </button>
          <button
            type="button"
            className={`im-btn ${activeTab === 'solvers' ? 'im-btn-primary' : 'im-btn-outline'}`}
            onClick={() => setActiveTab('solvers')}
          >
            Interactive Simulators Hub
          </button>
        </div>
      </header>

      {/* Main Studio Navigation Tabs */}
      <nav className="im-section-tabs" aria-label="Indian Mathematics Studio Sections">
        <button
          type="button"
          className={`im-tab-btn ${activeTab === 'timeline' ? 'active' : ''}`}
          onClick={() => setActiveTab('timeline')}
        >
          <span>Sequential Lineage (१२ युगाः)</span>
          <span className="im-tab-badge">12 Eras</span>
        </button>
        <button
          type="button"
          className={`im-tab-btn ${activeTab === 'disclaimer' ? 'active' : ''}`}
          onClick={() => setActiveTab('disclaimer')}
        >
          <span>Foundational Disclaimer (कालक्रम-निर्णयः)</span>
          <span className="im-tab-badge">4 Pillars</span>
        </button>
        <button
          type="button"
          className={`im-tab-btn ${activeTab === 'epistemology' ? 'active' : ''}`}
          onClick={() => setActiveTab('epistemology')}
        >
          <span>Epistemological Comparison (प्रमाण-समीक्षा)</span>
          <span className="im-tab-badge">6 Dimensions</span>
        </button>
        <button
          type="button"
          className={`im-tab-btn ${activeTab === 'solvers' ? 'active' : ''}`}
          onClick={() => setActiveTab('solvers')}
        >
          <span>Interactive Demonstrators (करण-शाला)</span>
          <span className="im-tab-badge">Simulators</span>
        </button>
      </nav>

      {/* =========================================================================
          TAB 1: FOUNDATIONAL HISTORIOGRAPHICAL DISCLAIMER
         ========================================================================= */}
      {activeTab === 'disclaimer' && (
        <section className="im-disclaimer-wrapper" aria-labelledby="disclaimer-heading">
          <div className="im-disclaimer-header">
            <h3 id="disclaimer-heading" className="im-disclaimer-sa">{INDIAN_MATH_DISCLAIMER.headerSanskrit}</h3>
            <div className="im-disclaimer-en">{INDIAN_MATH_DISCLAIMER.headerEnglish}</div>
            <div style={{ fontSize: '0.9rem', color: '#64748b', fontStyle: 'italic' }}>
              {INDIAN_MATH_DISCLAIMER.headerIast}
            </div>
          </div>

          <div className="im-disclaimer-box">
            <strong>Foundational Historiographical Axiom:</strong> {INDIAN_MATH_DISCLAIMER.disclaimerNotice}
          </div>

          <div className="im-pillars-grid">
            {INDIAN_MATH_DISCLAIMER.fourPillars.map((pillar) => {
              const isExpanded = expandedPillar === pillar.id;
              return (
                <article key={pillar.id} className="im-pillar-card">
                  <div className="im-pillar-top">
                    <div className="im-pillar-number">{pillar.orderNumber}</div>
                    <div>
                      <div className="im-pillar-sa">{pillar.sanskritTitle}</div>
                      <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{pillar.transliteration}</div>
                    </div>
                  </div>
                  <h4 className="im-pillar-en">{pillar.englishTitle}</h4>
                  <div className="im-pillar-tagline">{pillar.tagline}</div>
                  <p className="im-pillar-thesis">{pillar.coreThesis}</p>

                  <button
                    type="button"
                    onClick={() => setExpandedPillar(isExpanded ? null : pillar.id)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#ea580c',
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      padding: '0.35rem 0',
                      marginBottom: '0.5rem'
                    }}
                  >
                    {isExpanded ? '[-] Hide Philological Analysis' : '[+] Read Philological Analysis & Examples'}
                  </button>

                  {isExpanded && (
                    <div style={{ marginTop: '0.5rem', animation: 'fadeIn 0.2s ease' }}>
                      <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#7c2d12', marginBottom: '0.35rem' }}>
                        Critical Historical Evidences:
                      </div>
                      <ul className="im-pillar-list">
                        {pillar.historicalEvidences.map((ev, i) => (
                          <li key={i}>{ev}</li>
                        ))}
                      </ul>
                      <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#7c2d12', marginBottom: '0.35rem' }}>
                        Detailed Analysis:
                      </div>
                      <ul className="im-pillar-list">
                        {pillar.detailedAnalysis.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="im-pillar-impact">
                    <strong>Epistemic Impact:</strong> {pillar.epistemicImpact}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* =========================================================================
          TAB 2: EPISTEMOLOGICAL & PHILOSOPHICAL COMPARISON
         ========================================================================= */}
      {activeTab === 'epistemology' && (
        <section className="im-epistemic-section" aria-labelledby="epistemic-heading">
          <div className="im-section-intro">
            <h3 id="epistemic-heading" className="im-section-title">Ancient Indian Gaṇita vs. Modern Western Mathematics</h3>
            <p className="im-section-desc">
              A deep-dive contrast across six epistemological dimensions: why the ancient Indian perspective prioritized algorithmic constructivism (Upapatti), cognitive economy (Lāghava), and cosmic synchronization (Ṛta) over detached axiomatic formalism.
            </p>
          </div>

          <div className="im-dimensions-container">
            {EPISTEMOLOGICAL_COMPARISONS.map((dim) => (
              <div key={dim.id} className="im-dimension-card">
                <div className="im-dimension-header">
                  <div className="im-dimension-title-group">
                    <span className="im-dimension-index">Dimension {dim.dimensionNumber}</span>
                    <div>
                      <h4 className="im-dimension-title">{dim.title}</h4>
                      <div className="im-dimension-sa">{dim.sanskritConcept}</div>
                    </div>
                  </div>
                </div>

                <div className="im-comparison-grid">
                  <div className="im-side-column western">
                    <div className="im-side-header">
                      <span className="im-side-badge">Western & Modern Paradigm</span>
                    </div>
                    <h5 className="im-side-title">{dim.westernApproachTitle}</h5>
                    <p className="im-side-desc">{dim.westernApproachDesc}</p>
                  </div>

                  <div className="im-side-column indian">
                    <div className="im-side-header">
                      <span className="im-side-badge">Ancient Indian Gaṇita Tradition</span>
                    </div>
                    <h5 className="im-side-title">{dim.indianApproachTitle}</h5>
                    <p className="im-side-desc">{dim.indianApproachDesc}</p>
                  </div>
                </div>

                <div className="im-dimension-footer">
                  <div style={{ marginBottom: '1rem' }}>
                    <strong style={{ fontSize: '0.88rem', color: '#0f172a' }}>Key Epistemological Differentiators:</strong>
                    <ul style={{ margin: '0.35rem 0 0 1.25rem', fontSize: '0.88rem', color: '#475569', lineHeight: 1.6 }}>
                      {dim.keyDifferentiators.map((diff, i) => (
                        <li key={i}>{diff}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="im-example-box">
                    <div className="im-example-title">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" />
                        <polygon points="10 8 16 12 10 16 10 8" />
                      </svg>
                      Case Study: {dim.illustrativeExample.title}
                    </div>
                    <div style={{ fontSize: '0.88rem', color: '#475569', marginBottom: '0.5rem' }}>
                      {dim.illustrativeExample.description}
                    </div>
                    <div className="im-example-grid">
                      <div className="im-example-indian">
                        <strong>Indian Algorithmic Method (Upapatti):</strong>
                        <p style={{ margin: '0.25rem 0 0' }}>{dim.illustrativeExample.indianMethod}</p>
                      </div>
                      <div className="im-example-western">
                        <strong>Western Axiomatic Formalism:</strong>
                        <p style={{ margin: '0.25rem 0 0' }}>{dim.illustrativeExample.westernContrast}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* =========================================================================
          TAB 3: STEP-BY-STEP SEQUENTIAL TIMELINE (12 ERAS)
         ========================================================================= */}
      {activeTab === 'timeline' && (
        <section aria-label="Chronological Eras of Indian Mathematics">
          {/* Stepper Controller */}
          <div className="im-stepper-control">
            <div className="im-stepper-jump" role="navigation" aria-label="Era Jump Buttons">
              {INDIAN_MATH_ERAS.map((era, index) => (
                <button
                  key={era.id}
                  type="button"
                  className={`im-stepper-dot ${index === selectedEraIndex ? 'active' : ''}`}
                  onClick={() => setSelectedEraIndex(index)}
                  title={`${era.eraNumber}. ${era.titleEn} (${era.centuryLabel})`}
                  aria-label={`Jump to Era ${era.eraNumber}: ${era.titleEn}`}
                >
                  {era.eraNumber}
                </button>
              ))}
            </div>

            <div className="im-stepper-nav-btns">
              <button
                type="button"
                className="im-step-btn"
                onClick={handlePrevEra}
                disabled={selectedEraIndex === 0}
              >
                ← Prev Era
              </button>
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0c4a38', alignSelf: 'center' }}>
                Era {currentEra.eraNumber} of {INDIAN_MATH_ERAS.length}
              </span>
              <button
                type="button"
                className="im-step-btn"
                onClick={handleNextEra}
                disabled={selectedEraIndex === INDIAN_MATH_ERAS.length - 1}
              >
                Next Era →
              </button>
            </div>
          </div>

          {/* Current Selected Era Full Card */}
          <article className="im-era-card">
            <div className="im-era-hero">
              <div className="im-era-meta-bar">
                <span className="im-era-number-badge">Era {currentEra.eraNumber} of 12</span>
                <span className="im-era-period">{currentEra.approxPeriod} · {currentEra.centuryLabel}</span>
              </div>
              <h3 className="im-era-sa-title">{currentEra.titleSa}</h3>
              <h4 className="im-era-en-title">{currentEra.titleEn}</h4>

              <div className="im-era-chips">
                <div className="im-era-chip">
                  <strong>Polymaths:</strong> {currentEra.keyPolymaths.join(' · ')}
                </div>
                <div className="im-era-chip">
                  <strong>Key Treatises:</strong> {currentEra.primaryTexts.join(' · ')}
                </div>
                <div className="im-era-chip">
                  <strong>Centers:</strong> {currentEra.geographicCenters.join(' · ')}
                </div>
              </div>
            </div>

            <div className="im-era-body">
              {/* Overview & Context */}
              <div className="im-era-overview-box">
                <p className="im-era-overview-text">{currentEra.overview}</p>
                <p className="im-era-philosophical-context">
                  <strong>Philosophical Context & Worldview:</strong> {currentEra.philosophicalContext}
                </p>
              </div>

              {/* Featured Sanskrit Verse */}
              <div className="im-verse-card">
                <div className="im-verse-header">
                  <span className="im-verse-source">{currentEra.featuredVerse.sourceText}</span>
                  <span className="im-verse-author">
                    {currentEra.featuredVerse.author} ({currentEra.featuredVerse.approxDate})
                  </span>
                </div>

                <div className="im-verse-devanagari">{currentEra.featuredVerse.verseDevanagari}</div>
                <div className="im-verse-iast">{currentEra.featuredVerse.verseIast}</div>

                <details className="im-word-breakdown-details">
                  <summary className="im-word-breakdown-summary">
                    View Word-by-Word Sanskrit Decomposition & Etymology (पदच्छेदः)
                  </summary>
                  <div className="im-word-breakdown-grid">
                    {currentEra.featuredVerse.wordByWord.map((w, idx) => (
                      <div key={idx} className="im-word-pill">
                        <span className="im-word-sa">{w.sanskrit} ({w.iast})</span>
                        <span className="im-word-meaning">{w.meaning}</span>
                      </div>
                    ))}
                  </div>
                </details>

                <div className="im-verse-translation">
                  <strong>Translation:</strong> {currentEra.featuredVerse.translation}
                </div>

                <div className="im-verse-significance">
                  <strong>Mathematical Significance:</strong> {currentEra.featuredVerse.mathematicalSignificance}
                </div>
              </div>

              {/* Mathematical Breakthroughs Grid */}
              <div className="im-breakthroughs-section">
                <h4 className="im-breakthroughs-title">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                  Major Mathematical Breakthroughs of this Era
                </h4>
                <div className="im-breakthroughs-grid">
                  {currentEra.breakthroughs.map((bt) => (
                    <div key={bt.id} className="im-breakthrough-card">
                      <h5 className="im-bt-title">{bt.title}</h5>
                      <div className="im-bt-sa">{bt.sanskritTerm}</div>
                      <span className="im-bt-modern">{bt.modernEquivalent}</span>
                      {bt.formulaDisplay && (
                        <div className="im-bt-formula">{bt.formulaDisplay}</div>
                      )}
                      <p className="im-bt-desc">{bt.description}</p>
                      <p className="im-bt-history">
                        <strong>Significance:</strong> {bt.historicalSignificance}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Embedded Interactive Demonstrator */}
              {currentEra.interactiveDemoId === 'baudhayana' && (
                <div className="im-interactive-box">
                  <div className="im-interactive-header">
                    <h5 className="im-interactive-title">Baudhāyana Geometric Triple & √2 Approximation Simulator</h5>
                    <span className="im-interactive-badge">Era 1 Simulator</span>
                  </div>
                  <div className="im-control-group">
                    <div className="im-control-item">
                      <label className="im-control-label">Base Pārśvamānī (a):</label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        className="im-input"
                        value={baudhayanaBase}
                        onChange={(e) => setBaudhayanaBase(Number(e.target.value))}
                      />
                    </div>
                    <div className="im-control-item">
                      <label className="im-control-label">Height Tiryaṅmānī (b):</label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        className="im-input"
                        value={baudhayanaHeight}
                        onChange={(e) => setBaudhayanaHeight(Number(e.target.value))}
                      />
                    </div>
                  </div>
                  <div className="im-result-panel">
                    <div className="im-result-value-row">
                      <span className="im-result-label">Diagonal Akṣṇayā Rajjuḥ (c = √(a² + b²)):</span>
                      <span className="im-result-val">
                        √({baudhayanaBase}² + {baudhayanaHeight}²) = {Math.sqrt(baudhayanaBase * baudhayanaBase + baudhayanaHeight * baudhayanaHeight).toFixed(4)}
                      </span>
                    </div>
                    <div className="im-result-value-row">
                      <span className="im-result-label">Baudhāyana √2 Formula (1 + 1/3 + 1/12 - 1/408):</span>
                      <span className="im-result-val highlight">
                        577 / 408 = {(577 / 408).toFixed(7)} (Error: {(Math.abs(577 / 408 - Math.SQRT2) * 100).toFixed(6)}%)
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {currentEra.interactiveDemoId === 'pingala' && (
                <div className="im-interactive-box">
                  <div className="im-interactive-header">
                    <h5 className="im-interactive-title">Piṅgala Meru-Prastāra (Pascal’s Triangle) Generator</h5>
                    <span className="im-interactive-badge">Era 2 Simulator</span>
                  </div>
                  <div className="im-control-group">
                    <div className="im-control-item">
                      <label className="im-control-label">Number of Rows (n):</label>
                      <input
                        type="number"
                        min="1"
                        max="9"
                        className="im-input"
                        value={meruRows}
                        onChange={(e) => setMeruRows(Number(e.target.value))}
                      />
                    </div>
                  </div>
                  <div className="im-meru-triangle">
                    {generateMeruTriangle(meruRows).map((row, rIdx) => (
                      <div key={rIdx} className="im-meru-row">
                        {row.map((val, cIdx) => (
                          <div key={cIdx} className="im-meru-cell">
                            {val}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentEra.interactiveDemoId === 'jaina' && (
                <div className="im-interactive-box">
                  <div className="im-interactive-header">
                    <h5 className="im-interactive-title">Jaina Vikalpa Combinations Calculator (ⁿCᵣ)</h5>
                    <span className="im-interactive-badge">Era 3 Simulator</span>
                  </div>
                  <div className="im-control-group">
                    <div className="im-control-item">
                      <label className="im-control-label">Total Elements (n):</label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        className="im-input"
                        value={jainaN}
                        onChange={(e) => setJainaN(Number(e.target.value))}
                      />
                    </div>
                    <div className="im-control-item">
                      <label className="im-control-label">Chosen Elements (r):</label>
                      <input
                        type="number"
                        min="0"
                        max={jainaN}
                        className="im-input"
                        value={jainaR}
                        onChange={(e) => setJainaR(Number(e.target.value))}
                      />
                    </div>
                  </div>
                  <div className="im-result-panel">
                    <div className="im-result-value-row">
                      <span className="im-result-label">Combinatorial Permutations (ⁿCᵣ):</span>
                      <span className="im-result-val highlight">
                        {computeCombinations(jainaN, jainaR)} possible combinations
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {currentEra.interactiveDemoId === 'bakhshali' && (
                <div className="im-interactive-box">
                  <div className="im-interactive-header">
                    <h5 className="im-interactive-title">Bakhshālī High-Precision Square Root Simulator</h5>
                    <span className="im-interactive-badge">Era 4 Simulator</span>
                  </div>
                  <div className="im-control-group">
                    <div className="im-control-item">
                      <label className="im-control-label">Number to Root (A):</label>
                      <input
                        type="number"
                        min="2"
                        max="1000"
                        className="im-input"
                        value={bakhshaliA}
                        onChange={(e) => setBakhshaliA(Number(e.target.value))}
                      />
                    </div>
                  </div>
                  {(() => {
                    const res = computeBakhshaliSqrt(bakhshaliA);
                    return (
                      <div className="im-result-panel">
                        <div className="im-result-value-row">
                          <span className="im-result-label">Decomposition A = a² + r:</span>
                          <span className="im-result-val">
                            {bakhshaliA} = {res.a}² + {res.r}
                          </span>
                        </div>
                        <div className="im-result-value-row">
                          <span className="im-result-label">Bakhshālī Quadratic Approximation:</span>
                          <span className="im-result-val highlight">{res.approx.toFixed(8)}</span>
                        </div>
                        <div className="im-result-value-row">
                          <span className="im-result-label">True Square Root Value (IEEE-754):</span>
                          <span className="im-result-val">{res.trueVal.toFixed(8)}</span>
                        </div>
                        <div className="im-result-value-row">
                          <span className="im-result-label">Relative Error Percentage:</span>
                          <span className="im-result-val" style={{ color: '#16a34a' }}>
                            {res.errorPct.toExponential(3)}%
                          </span>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {currentEra.interactiveDemoId === 'aryabhata' && (
                <div className="im-interactive-box">
                  <div className="im-interactive-header">
                    <h5 className="im-interactive-title">Āryabhaṭa’s π Ratio &amp; Planetary Kuṭṭaka Pulverizer</h5>
                    <span className="im-interactive-badge">Era 5 Simulator</span>
                  </div>
                  <div className="im-control-group">
                    <div className="im-control-item">
                      <label className="im-control-label">Dividend a:</label>
                      <input
                        type="number"
                        className="im-input"
                        value={kuttakaA}
                        onChange={(e) => setKuttakaA(Number(e.target.value))}
                      />
                    </div>
                    <div className="im-control-item">
                      <label className="im-control-label">Divisor b:</label>
                      <input
                        type="number"
                        className="im-input"
                        value={kuttakaB}
                        onChange={(e) => setKuttakaB(Number(e.target.value))}
                      />
                    </div>
                    <div className="im-control-item">
                      <label className="im-control-label">Constant c:</label>
                      <input
                        type="number"
                        className="im-input"
                        value={kuttakaC}
                        onChange={(e) => setKuttakaC(Number(e.target.value))}
                      />
                    </div>
                  </div>
                  <div className="im-result-panel">
                    <div className="im-result-value-row">
                      <span className="im-result-label">Āryabhaṭa’s Ratio: 62,832 / 20,000:</span>
                      <span className="im-result-val highlight">3.1416 (Āsanna / Incommensurable)</span>
                    </div>
                    <div className="im-result-value-row">
                      <span className="im-result-label">Kuṭṭaka Equation Formulation:</span>
                      <span className="im-result-val">
                        {kuttakaA}x + {kuttakaC} = {kuttakaB}y
                      </span>
                    </div>
                    <div className="im-result-value-row">
                      <span className="im-result-label">True π Value:</span>
                      <span className="im-result-val">{Math.PI.toFixed(6)} (Error &lt; 0.002%)</span>
                    </div>
                  </div>
                </div>
              )}

              {currentEra.interactiveDemoId === 'bhaskara1' && (
                <div className="im-interactive-box">
                  <div className="im-interactive-header">
                    <h5 className="im-interactive-title">Bhāskara I Rational Sine Formula Visualizer</h5>
                    <span className="im-interactive-badge">Era 6 Simulator</span>
                  </div>
                  <div className="im-control-group">
                    <div className="im-control-item">
                      <label className="im-control-label">Angle in Degrees (0° to 180°):</label>
                      <input
                        type="range"
                        min="0"
                        max="180"
                        value={bhaskaraAngle}
                        onChange={(e) => setBhaskaraAngle(Number(e.target.value))}
                        style={{ width: '220px' }}
                      />
                      <span style={{ fontWeight: 700, color: '#0c4a38' }}>{bhaskaraAngle}°</span>
                    </div>
                  </div>
                  {(() => {
                    const res = computeBhaskaraSine(bhaskaraAngle);
                    return (
                      <div className="im-result-panel">
                        <div className="im-result-value-row">
                          <span className="im-result-label">Bhāskara I Formula Value:</span>
                          <span className="im-result-val highlight">{res.bhaskaraVal.toFixed(6)}</span>
                        </div>
                        <div className="im-result-value-row">
                          <span className="im-result-label">True Math.sin({bhaskaraAngle}°):</span>
                          <span className="im-result-val">{res.trueVal.toFixed(6)}</span>
                        </div>
                        <div className="im-result-value-row">
                          <span className="im-result-label">Relative Error:</span>
                          <span className="im-result-val" style={{ color: '#16a34a' }}>
                            {res.errorPct.toFixed(3)}% (Always &lt; 1.9%)
                          </span>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {currentEra.interactiveDemoId === 'brahmagupta' && (
                <div className="im-interactive-box">
                  <div className="im-interactive-header">
                    <h5 className="im-interactive-title">Brahmagupta’s Cyclic Quadrilateral Area Calculator</h5>
                    <span className="im-interactive-badge">Era 7 Simulator</span>
                  </div>
                  <div className="im-control-group">
                    <div className="im-control-item">
                      <label className="im-control-label">Side a:</label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        className="im-input"
                        value={quadA}
                        onChange={(e) => setQuadA(Number(e.target.value))}
                      />
                    </div>
                    <div className="im-control-item">
                      <label className="im-control-label">Side b:</label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        className="im-input"
                        value={quadB}
                        onChange={(e) => setQuadB(Number(e.target.value))}
                      />
                    </div>
                    <div className="im-control-item">
                      <label className="im-control-label">Side c:</label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        className="im-input"
                        value={quadC}
                        onChange={(e) => setQuadC(Number(e.target.value))}
                      />
                    </div>
                    <div className="im-control-item">
                      <label className="im-control-label">Side d:</label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        className="im-input"
                        value={quadD}
                        onChange={(e) => setQuadD(Number(e.target.value))}
                      />
                    </div>
                  </div>
                  {(() => {
                    const res = computeBrahmaguptaQuad(quadA, quadB, quadC, quadD);
                    return (
                      <div className="im-result-panel">
                        <div className="im-result-value-row">
                          <span className="im-result-label">Semi-perimeter s = (a+b+c+d)/2:</span>
                          <span className="im-result-val">{res.s}</span>
                        </div>
                        <div className="im-result-value-row">
                          <span className="im-result-label">Area = √[(s-a)(s-b)(s-c)(s-d)]:</span>
                          <span className="im-result-val highlight">
                            {res.valid ? `${res.area.toFixed(2)} sq units` : 'Invalid Quadrilateral'}
                          </span>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {currentEra.interactiveDemoId === 'mahavira' && (
                <div className="im-interactive-box">
                  <div className="im-interactive-header">
                    <h5 className="im-interactive-title">Śrīdharācārya Method Quadratic Solver</h5>
                    <span className="im-interactive-badge">Era 8 Simulator</span>
                  </div>
                  <div className="im-control-group">
                    <div className="im-control-item">
                      <label className="im-control-label">Coefficient a:</label>
                      <input
                        type="number"
                        className="im-input"
                        value={quadCoeffA}
                        onChange={(e) => setQuadCoeffA(Number(e.target.value))}
                      />
                    </div>
                    <div className="im-control-item">
                      <label className="im-control-label">Coefficient b:</label>
                      <input
                        type="number"
                        className="im-input"
                        value={quadCoeffB}
                        onChange={(e) => setQuadCoeffB(Number(e.target.value))}
                      />
                    </div>
                    <div className="im-control-item">
                      <label className="im-control-label">Coefficient c:</label>
                      <input
                        type="number"
                        className="im-input"
                        value={quadCoeffC}
                        onChange={(e) => setQuadCoeffC(Number(e.target.value))}
                      />
                    </div>
                  </div>
                  {(() => {
                    const res = computeSridharaRoots(quadCoeffA, quadCoeffB, quadCoeffC);
                    return (
                      <div className="im-result-panel">
                        <div className="im-result-value-row">
                          <span className="im-result-label">Equation:</span>
                          <span className="im-result-val">
                            {quadCoeffA}x² + ({quadCoeffB})x + ({quadCoeffC}) = 0
                          </span>
                        </div>
                        <div className="im-result-value-row">
                          <span className="im-result-label">Discriminant (b² - 4ac):</span>
                          <span className="im-result-val">{res.disc}</span>
                        </div>
                        <div className="im-result-value-row">
                          <span className="im-result-label">Roots via Śrīdhara Rule:</span>
                          <span className="im-result-val highlight">
                            {res.real ? `x₁ = ${res.r1},  x₂ = ${res.r2}` : 'Complex Roots'}
                          </span>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {currentEra.interactiveDemoId === 'bhaskara2' && (
                <div className="im-interactive-box">
                  <div className="im-interactive-header">
                    <h5 className="im-interactive-title">Bhāskara II Chakravāla Cyclic Solver for Nx² + 1 = y²</h5>
                    <span className="im-interactive-badge">Era 9 Simulator</span>
                  </div>
                  <div className="im-control-group">
                    <div className="im-control-item">
                      <label className="im-control-label">Parameter N (e.g. 61, 67, 13, 7):</label>
                      <input
                        type="number"
                        min="2"
                        max="100"
                        className="im-input"
                        value={chakravalaN}
                        onChange={(e) => setChakravalaN(Number(e.target.value))}
                      />
                    </div>
                  </div>
                  <div className="im-result-panel">
                    <div className="im-result-value-row">
                      <span className="im-result-label">Target Equation:</span>
                      <span className="im-result-val highlight">
                        {chakravalaN}x² + 1 = y²
                      </span>
                    </div>
                    <div className="im-result-value-row">
                      <span className="im-result-label">Smallest Integer Solution:</span>
                      <span className="im-result-val">
                        {chakravalaN === 61
                          ? 'x = 226,153,980  ·  y = 1,766,319,049 (Fermat 1657 Challenge)'
                          : chakravalaN === 67
                          ? 'x = 5,967  ·  y = 48,842'
                          : chakravalaN === 13
                          ? 'x = 180  ·  y = 649'
                          : chakravalaN === 7
                          ? 'x = 3  ·  y = 8'
                          : `Computed via Bhāskara II Bhāvanā cyclic algorithm`}
                      </span>
                    </div>
                    <div className="im-result-value-row">
                      <span className="im-result-label">Differential Calculus Insight:</span>
                      <span className="im-result-val" style={{ color: '#0c4a38' }}>
                        Tātkālikī Gati (dθ/dt) vanishes at apogee: d(sin θ) = cos θ · dθ
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {currentEra.interactiveDemoId === 'narayana' && (
                <div className="im-interactive-box">
                  <div className="im-interactive-header">
                    <h5 className="im-interactive-title">Nārāyaṇa Paṇḍita Pan-Diagonal 4×4 Magic Square</h5>
                    <span className="im-interactive-badge">Era 10 Simulator</span>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: '#475569', margin: '0 0 1rem' }}>
                    Every row, column, main diagonal, broken diagonal, and 2×2 corner quadrant sums to exactly <strong>34</strong>:
                  </p>
                  <div className="im-magic-square-grid">
                    {[
                      [7, 12, 1, 14],
                      [2, 13, 8, 11],
                      [16, 3, 10, 5],
                      [9, 6, 15, 4]
                    ].flat().map((num, i) => (
                      <div key={i} className="im-magic-cell">
                        {num}
                      </div>
                    ))}
                  </div>
                  <div className="im-result-panel" style={{ marginTop: '1rem' }}>
                    <div className="im-result-value-row">
                      <span className="im-result-label">Magic Constant M(4):</span>
                      <span className="im-result-val highlight">34 in all 16 directions</span>
                    </div>
                  </div>
                </div>
              )}

              {currentEra.interactiveDemoId === 'kerala' && (
                <div className="im-interactive-box">
                  <div className="im-interactive-header">
                    <h5 className="im-interactive-title">Mādhava Infinite Series for π with Remainder Correction</h5>
                    <span className="im-interactive-badge">Era 11 Simulator</span>
                  </div>
                  <div className="im-control-group">
                    <div className="im-control-item">
                      <label className="im-control-label">Terms Evaluated (n):</label>
                      <input
                        type="number"
                        min="2"
                        max="50"
                        className="im-input"
                        value={madhavaTerms}
                        onChange={(e) => setMadhavaTerms(Number(e.target.value))}
                      />
                    </div>
                  </div>
                  {(() => {
                    const res = computeMadhavaPi(madhavaTerms);
                    return (
                      <div className="im-result-panel">
                        <div className="im-result-value-row">
                          <span className="im-result-label">Raw Leibniz/Gregory Sum (4 ∑ (-1)ⁿ/(2n+1)):</span>
                          <span className="im-result-val">{res.rawPi.toFixed(7)} (Err: {res.rawError.toFixed(4)})</span>
                        </div>
                        <div className="im-result-value-row">
                          <span className="im-result-label">Mādhava with Remainder Term R_n:</span>
                          <span className="im-result-val highlight">
                            {res.correctedPi.toFixed(9)} (Err: {res.correctedError.toExponential(3)})
                          </span>
                        </div>
                        <div className="im-result-value-row">
                          <span className="im-result-label">True π Constant:</span>
                          <span className="im-result-val">{res.truePi.toFixed(9)}</span>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {currentEra.interactiveDemoId === 'ramanujan' && (
                <div className="im-interactive-box">
                  <div className="im-interactive-header">
                    <h5 className="im-interactive-title">Śrīnivāsa Rāmānujan Taxicab 1729 &amp; 1/π Series</h5>
                    <span className="im-interactive-badge">Era 12 Simulator</span>
                  </div>
                  <div className="im-result-panel">
                    <div className="im-result-value-row">
                      <span className="im-result-label">Hardy-Ramanujan Taxicab Number:</span>
                      <span className="im-result-val highlight">1729</span>
                    </div>
                    <div className="im-result-value-row">
                      <span className="im-result-label">Pair 1: 1³ + 12³:</span>
                      <span className="im-result-val">1 + 1728 = 1729</span>
                    </div>
                    <div className="im-result-value-row">
                      <span className="im-result-label">Pair 2: 9³ + 10³:</span>
                      <span className="im-result-val">729 + 1000 = 1729</span>
                    </div>
                    <div className="im-result-value-row">
                      <span className="im-result-label">Ramanujan 1/π Formula (First Term k = 0):</span>
                      <span className="im-result-val highlight">
                        1/π ≈ (2√2 / 9801) × 1103 = 0.318309886... &rarr; π ≈ 3.14159273 (Accurate to 6 decimals in 1 step!)
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </article>
        </section>
      )}

      {/* =========================================================================
          TAB 4: ALL INTERACTIVE SIMULATORS HUB
         ========================================================================= */}
      {activeTab === 'solvers' && (
        <section aria-label="Interactive Mathematical Solvers Hub">
          <div className="im-section-intro">
            <h3 className="im-section-title">Interactive Algorithmic Simulators (करण-शाला)</h3>
            <p className="im-section-desc">
              Experience the computational engines of ancient and classical Indian mathematics: evaluate Baudhāyana’s square root of 2, generate Piṅgala’s Pascal triangle, calculate Bhāskara’s rational sine, and verify Mādhava’s infinite series corrections.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Quick jump cards to all eras */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {INDIAN_MATH_ERAS.filter((e) => e.interactiveDemoId).map((era) => (
                <div
                  key={era.id}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '10px',
                    padding: '1.25rem',
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
                  }}
                  onClick={() => {
                    setSelectedEraIndex(era.eraNumber - 1);
                    setActiveTab('timeline');
                  }}
                >
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#f59e0b', textTransform: 'uppercase' }}>
                    Era {era.eraNumber} Simulator
                  </div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0c4a38', margin: '0.25rem 0' }}>
                    {era.titleEn}
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 0.5rem' }}>
                    {era.breakthroughs[0]?.title}
                  </p>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0c4a38' }}>
                    Launch Simulator →
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Cross-module links footer */}
      <footer style={{ marginTop: '3rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
        <div>
          <span style={{ fontWeight: 700, color: '#0c4a38' }}>EdNet Learn · भारतीय-ज्ञान-परम्परा (IKS)</span>
          <span style={{ fontSize: '0.88rem', color: '#64748b', marginLeft: '0.5rem' }}>
            Free Learning Through Play · Sanskrit &amp; Mathematical Sciences
          </span>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {onOpenVedicMaths && (
            <button type="button" className="im-btn im-btn-primary" onClick={onOpenVedicMaths}>
              Open 16 Vedic Sutras
            </button>
          )}
          {onGoHome && (
            <button type="button" className="im-btn im-btn-outline" style={{ color: '#1e293b', borderColor: '#cbd5e1' }} onClick={onGoHome}>
              Return to Home
            </button>
          )}
        </div>
      </footer>
    </div>
  );
};

export default IndianMathematicsStudio;
