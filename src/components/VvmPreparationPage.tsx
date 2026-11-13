import React, { useState, useEffect } from 'react';
import { soundEffects } from '../utils/soundEffects';
import {
  VVM_MOCK_EXAMS,
  calculateVvmCohortScore,
  type VvmCohort,
  type VvmMockExam,
  type VvmScoreSummary,
} from '../data/vvmJuniorMockData';
import '../styles/vvm-prep.css';

export interface VvmPreparationPageProps {
  onGoHome?: () => void;
  onOpenScienceLab?: (segment?: string) => void;
  onOpenIks?: () => void;
  onOpenVedicMaths?: () => void;
  onOpenResources?: () => void;
  onOpenQuiz?: () => void;
  initialTab?: VvmTab;
}

export type VvmTab = 'blueprint' | 'heritage' | 'scientists' | 'ncert' | 'logic' | 'quiz' | 'journey';

export const VvmPreparationPage: React.FC<VvmPreparationPageProps> = ({
  onGoHome,
  onOpenScienceLab,
  onOpenIks,
  onOpenVedicMaths,
  onOpenResources,
  onOpenQuiz,
  initialTab,
}) => {
  const [activeTab, setActiveTab] = useState<VvmTab>(() => {
    if (initialTab) return initialTab;
    if (typeof window !== 'undefined' && window.location.hash) {
      const h = window.location.hash.replace('#', '') as VvmTab;
      if (['blueprint', 'heritage', 'scientists', 'ncert', 'logic', 'quiz', 'journey'].includes(h)) {
        return h;
      }
    }
    return 'blueprint';
  });

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  useEffect(() => {
    const handleHash = () => {
      const h = window.location.hash.replace('#', '') as VvmTab;
      if (['blueprint', 'heritage', 'scientists', 'ncert', 'logic', 'quiz', 'journey'].includes(h)) {
        setActiveTab(h);
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleTabClick = (tab: VvmTab) => {
    setActiveTab(tab);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#${tab}`);
    }
  };

  const [mockCohort, setMockCohort] = useState<VvmCohort>('junior');
  const [cohortAnswers, setCohortAnswers] = useState<Record<VvmCohort, Record<number, number>>>({
    junior: {},
    senior: {},
  });
  const [quizFilter, setQuizFilter] = useState<'all' | 'partA' | 'partB'>('all');

  const activeExam: VvmMockExam = VVM_MOCK_EXAMS[mockCohort];
  const activeQuestions = activeExam.questions;
  const currentAnswers = cohortAnswers[mockCohort];

  const handleSelectAnswer = (questionId: number, optionIndex: number) => {
    if (currentAnswers[questionId] !== undefined) return;
    const q = activeQuestions.find((item) => item.id === questionId);
    setCohortAnswers((prev) => ({
      ...prev,
      [mockCohort]: {
        ...prev[mockCohort],
        [questionId]: optionIndex,
      },
    }));
    if (q && optionIndex === q.correctIndex) {
      soundEffects.playSuccessDing();
    }
  };

  const handleResetQuiz = () => {
    setCohortAnswers((prev) => ({
      ...prev,
      [mockCohort]: {},
    }));
    setQuizFilter('all');
  };

  const scoreSummary: VvmScoreSummary = calculateVvmCohortScore(mockCohort, currentAnswers);
  const answeredCount = scoreSummary.totalAttempted;
  const currentScore = scoreSummary.totalScore;

  const displayedQuestions = activeQuestions.filter((q) => {
    if (quizFilter === 'partA') return q.section === 'Part A';
    if (quizFilter === 'partB') return q.section === 'Part B';
    return true;
  });

  return (
    <div className="vvm-page">
      <div className="vvm-container">

        {/* Topbar / Breadcrumb Navigation */}
        <nav className="vvm-topbar" aria-label="VVM Breadcrumb Navigation">
          <div className="vvm-topbar-left">
            {onGoHome && (
              <button type="button" className="vvm-topbar-btn" onClick={onGoHome}>
                ← Home (गृहम्)
              </button>
            )}
            {onOpenScienceLab && (
              <button type="button" className="vvm-topbar-btn" onClick={() => onOpenScienceLab('catalog')}>
                Science Simulations (विज्ञान-प्रयोगशाला)
              </button>
            )}
            {onOpenIks && (
              <button type="button" className="vvm-topbar-btn" onClick={onOpenIks}>
                IKS Think Labs (भारतीय ज्ञान परंपरा)
              </button>
            )}
            {onOpenVedicMaths && (
              <button type="button" className="vvm-topbar-btn" onClick={onOpenVedicMaths}>
                Vedic Maths (वैदिक-गणितम्)
              </button>
            )}
            {onOpenQuiz && (
              <button type="button" className="vvm-topbar-btn" onClick={onOpenQuiz}>
                Quiz Arena (प्रश्नोत्तरी)
              </button>
            )}
            {onOpenResources && (
              <button type="button" className="vvm-topbar-btn" onClick={onOpenResources}>
                Free Resources (साधनानि)
              </button>
            )}
          </div>
          <a
            href="https://vvm.org.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="vvm-topbar-portal-link"
            title="Open official Vidyarthi Vigyan Manthan registration portal"
          >
            <span>Official Portal · vvm.org.in ↗</span>
          </a>
        </nav>

        {/* Hero Section */}
        <header className="vvm-hero">
          <div className="vvm-hero-badge">
            <span>National Talent Search · Classes 6–11</span>
          </div>
          <h1 className="vvm-hero-title">
            Vidyarthi Vigyan Manthan (VVM) Preparation Hub
            <span className="vvm-hero-title-sa">विद्यार्थी विज्ञान मंथन २०२६-२०२७</span>
          </h1>
          <p className="vvm-hero-lead">
            India’s largest national science talent search exam jointly organized by <strong>Vijnana Bharati (VIBHA)</strong> in association with <strong>Vigyan Prasar (DST, Govt. of India)</strong> and <strong>NCERT</strong>. EdNet Learn provides comprehensive study modules bridging Indian scientific heritage, biographies of Indian scientists, and interactive NCERT science simulations.
          </p>

          <div className="vvm-hero-metrics">
            <div className="vvm-metric-card">
              <div className="vvm-metric-value">100 MCQs</div>
              <div className="vvm-metric-label">100 Marks · 90 Minutes</div>
            </div>
            <div className="vvm-metric-card">
              <div className="vvm-metric-value">40% Heritage</div>
              <div className="vvm-metric-label">Indian Contributions &amp; Biographies</div>
            </div>
            <div className="vvm-metric-card">
              <div className="vvm-metric-value">60% Science</div>
              <div className="vvm-metric-label">NCERT Curriculum &amp; Logic</div>
            </div>
            <div className="vvm-metric-card">
              <div className="vvm-metric-value">13+ Languages</div>
              <div className="vvm-metric-label">Sanskrit, Hindi, English &amp; Regional</div>
            </div>
          </div>
        </header>

        {/* Nav Tabs */}
        <nav className="vvm-tabs-nav" aria-label="VVM Study Sections">
          <button
            type="button"
            className={`vvm-tab-btn${activeTab === 'blueprint' ? ' active' : ''}`}
            onClick={() => handleTabClick('blueprint')}
          >
            <span>Exam Blueprint</span>
            <span className="vvm-tab-badge">Level 1</span>
          </button>
          <button
            type="button"
            className={`vvm-tab-btn${activeTab === 'heritage' ? ' active' : ''}`}
            onClick={() => handleTabClick('heritage')}
          >
            <span>Indian Science Heritage</span>
            <span className="vvm-tab-badge">20%</span>
          </button>
          <button
            type="button"
            className={`vvm-tab-btn${activeTab === 'scientists' ? ' active' : ''}`}
            onClick={() => handleTabClick('scientists')}
          >
            <span>Indian Scientists</span>
            <span className="vvm-tab-badge">20%</span>
          </button>
          <button
            type="button"
            className={`vvm-tab-btn${activeTab === 'ncert' ? ' active' : ''}`}
            onClick={() => handleTabClick('ncert')}
          >
            <span>NCERT Science &amp; Maths</span>
            <span className="vvm-tab-badge">50%</span>
          </button>
          <button
            type="button"
            className={`vvm-tab-btn${activeTab === 'logic' ? ' active' : ''}`}
            onClick={() => handleTabClick('logic')}
          >
            <span>Logic &amp; Reasoning</span>
            <span className="vvm-tab-badge">10%</span>
          </button>
          <button
            type="button"
            className={`vvm-tab-btn${activeTab === 'quiz' ? ' active' : ''}`}
            onClick={() => handleTabClick('quiz')}
          >
            <span>30-Q Mock Test</span>
            <span className="vvm-tab-badge">{answeredCount}/{activeQuestions.length}</span>
          </button>
          <button
            type="button"
            className={`vvm-tab-btn${activeTab === 'journey' ? ' active' : ''}`}
            onClick={() => handleTabClick('journey')}
          >
            <span>Competition Stages &amp; Awards</span>
          </button>
        </nav>

        {/* TAB 1: BLUEPRINT */}
        {activeTab === 'blueprint' && (
          <section className="vvm-section" aria-labelledby="bp-heading">
            <div className="vvm-section-header">
              <div className="vvm-section-kicker">Official Level-1 Structure</div>
              <h2 id="bp-heading" className="vvm-section-title">VVM Exam Pattern &amp; Weightage Blueprint</h2>
              <p className="vvm-section-desc">
                The school-level examination (Level 1) is conducted on a dedicated digital mobile/desktop app. It consists of two timed sections with negative marking safeguards.
              </p>
            </div>

            <div className="vvm-blueprint-grid">
              <div className="vvm-blueprint-card vvm-blueprint-card--a">
                <div className="vvm-blueprint-card-head">
                  <span className="vvm-bp-tag vvm-bp-tag--a">Section A</span>
                  <span className="vvm-bp-weight">40 Marks · 30 Mins</span>
                </div>
                <h3>Indian Heritage &amp; Scientist Biographies</h3>
                <ul className="vvm-blueprint-sublist">
                  <li className="vvm-blueprint-subitem">
                    <span className="vvm-subitem-badge">20 Questions</span>
                    <div className="vvm-subitem-text">
                      <strong>Indian Contributions to Science (20%)</strong>
                      <span>From Vedic astronomy and metallurgy to traditional medicine and architecture.</span>
                    </div>
                  </li>
                  <li className="vvm-blueprint-subitem">
                    <span className="vvm-subitem-badge">20 Questions</span>
                    <div className="vvm-subitem-text">
                      <strong>Life Stories of Eminent Indian Scientists (20%)</strong>
                      <span>Special study booklets released by VIBHA (e.g. Anna Mani, Asima Chatterjee, Rohini Godbole).</span>
                    </div>
                  </li>
                </ul>
                <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0 }}>
                  <em>Note: Section A closes after 30 minutes; students cannot return to Section A once Section B begins.</em>
                </p>
              </div>

              <div className="vvm-blueprint-card vvm-blueprint-card--b">
                <div className="vvm-blueprint-card-head">
                  <span className="vvm-bp-tag vvm-bp-tag--b">Section B</span>
                  <span className="vvm-bp-weight">60 Marks · 60 Mins</span>
                </div>
                <h3>NCERT Curriculum &amp; Analytical Reasoning</h3>
                <ul className="vvm-blueprint-sublist">
                  <li className="vvm-blueprint-subitem">
                    <span className="vvm-subitem-badge">50 Questions</span>
                    <div className="vvm-subitem-text">
                      <strong>NCERT Science and Mathematics (50%)</strong>
                      <span>Questions tailored to the student&apos;s registered class level (Classes 6 to 11).</span>
                    </div>
                  </li>
                  <li className="vvm-blueprint-subitem">
                    <span className="vvm-subitem-badge">10 Questions</span>
                    <div className="vvm-subitem-text">
                      <strong>Logic and Analytical Reasoning (10%)</strong>
                      <span>Series completion, spatial deduction, patterns, and mathematical reasoning.</span>
                    </div>
                  </li>
                </ul>
                <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0 }}>
                  <em>Total Exam: 100 Objective Questions · 100 Marks · 90 Minutes Total Duration.</em>
                </p>
              </div>
            </div>

            {/* 30-Question VVM Mock Test Engine Blueprint */}
            <div className="vvm-blueprint-card" style={{ marginTop: '1.5rem', background: '#ffffff', border: '1.5px solid #2dd4bf' }}>
              <div className="vvm-blueprint-card-head">
                <span className="vvm-bp-tag vvm-bp-tag--a">EdNet Practice Engine</span>
                <span className="vvm-bp-weight">30 Questions · 120 Marks · 30 Mins</span>
              </div>
              <h3 style={{ margin: '0.35rem 0 0.5rem', color: '#0f766e' }}>The 30-Question VVM Mini-Mock Blueprint</h3>
              <p style={{ fontSize: '0.86rem', color: '#334155', margin: '0 0 1rem', lineHeight: 1.5 }}>
                Configured strictly to mirror the real VVM Level-I exam structure, marking scheme, and qualification thresholds:
              </p>

              <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
                  <thead>
                    <tr style={{ background: '#f0fdfa', borderBottom: '2px solid #14b8a6', textAlign: 'left', color: '#0f766e' }}>
                      <th style={{ padding: '0.55rem 0.75rem' }}>Mock Section</th>
                      <th style={{ padding: '0.55rem 0.75rem' }}>Topic Area</th>
                      <th style={{ padding: '0.55rem 0.75rem' }}>Questions</th>
                      <th style={{ padding: '0.55rem 0.75rem' }}>Marks</th>
                      <th style={{ padding: '0.55rem 0.75rem' }}>Negative Marking</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '0.55rem 0.75rem' }}><strong>Part A (Qualifier)</strong></td>
                      <td style={{ padding: '0.55rem 0.75rem' }}>Indian Contributions to Science</td>
                      <td style={{ padding: '0.55rem 0.75rem' }}>6 Qs</td>
                      <td style={{ padding: '0.55rem 0.75rem' }}>24 Marks</td>
                      <td style={{ padding: '0.55rem 0.75rem', color: '#166534' }}>None (0)</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '0.55rem 0.75rem' }}><strong>Part A (Qualifier)</strong></td>
                      <td style={{ padding: '0.55rem 0.75rem' }}>Tri-Shakti Biographies (Mani, Chatterjee, Godbole)</td>
                      <td style={{ padding: '0.55rem 0.75rem' }}>6 Qs</td>
                      <td style={{ padding: '0.55rem 0.75rem' }}>24 Marks</td>
                      <td style={{ padding: '0.55rem 0.75rem', color: '#166534' }}>None (0)</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '0.55rem 0.75rem' }}><strong>Part B (Core)</strong></td>
                      <td style={{ padding: '0.55rem 0.75rem' }}>NCERT Science &amp; Mathematics (Class-Specific)</td>
                      <td style={{ padding: '0.55rem 0.75rem' }}>15 Qs</td>
                      <td style={{ padding: '0.55rem 0.75rem' }}>60 Marks</td>
                      <td style={{ padding: '0.55rem 0.75rem', color: '#dc2626' }}>-1 Mark per wrong answer</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '0.55rem 0.75rem' }}><strong>Part B (Core)</strong></td>
                      <td style={{ padding: '0.55rem 0.75rem' }}>Logic &amp; Reasoning</td>
                      <td style={{ padding: '0.55rem 0.75rem' }}>3 Qs</td>
                      <td style={{ padding: '0.55rem 0.75rem' }}>12 Marks</td>
                      <td style={{ padding: '0.55rem 0.75rem', color: '#dc2626' }}>-1 Mark per wrong answer</td>
                    </tr>
                    <tr style={{ background: '#f8fafc', fontWeight: 800, color: '#0f172a' }}>
                      <td style={{ padding: '0.65rem 0.75rem' }}>Total</td>
                      <td style={{ padding: '0.65rem 0.75rem' }}>Full 30-Minute Mini-Mock</td>
                      <td style={{ padding: '0.65rem 0.75rem' }}>30 Qs</td>
                      <td style={{ padding: '0.65rem 0.75rem' }}>120 Marks</td>
                      <td style={{ padding: '0.65rem 0.75rem' }}>Part B evaluated only if Part A ≥ 50%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style={{ background: '#fef3c7', border: '1px solid #fde68a', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '0.82rem', color: '#92400e', lineHeight: 1.5 }}>
                <strong>VVM Section A Qualifier Rule:</strong> Part B is evaluated only if a student scores at least 50% in Part A (minimum 24 out of 48 marks in Indian Contributions &amp; Tri-Shakti Biographies). No negative marking in Part A encourages full attempt of heritage questions!
              </div>
            </div>

            <div className="vvm-ncert-callout">
              <div className="vvm-ncert-callout-text">
                <h4>Registered Student Cohorts</h4>
                <p>
                  <strong>Junior Group:</strong> Classes 6, 7, and 8 (NCERT syllabus up to current class level).<br />
                  <strong>Senior Group:</strong> Classes 9, 10, and 11 (Foundational physics, chemistry, biology &amp; mathematics).
                </p>
              </div>
              <button
                type="button"
                className="vvm-heritage-lab-btn"
                style={{ width: 'auto' }}
                onClick={() => setActiveTab('quiz')}
              >
                <span>Take VVM Practice Test →</span>
              </button>
            </div>
          </section>
        )}

        {/* TAB 2: HERITAGE */}
        {activeTab === 'heritage' && (
          <section className="vvm-section" aria-labelledby="heritage-heading">
            <div className="vvm-section-header">
              <div className="vvm-section-kicker">Section A Study Guide (20% Weightage)</div>
              <h2 id="heritage-heading" className="vvm-section-title">Indian Contributions to Science (ICS)</h2>
              <p className="vvm-section-desc">
                Key concepts and historical scientific milestones detailed in the official VIBHA study material. Explore these hands-on through EdNet’s interactive labs.
              </p>
            </div>

            <div className="vvm-heritage-grid">
              <div className="vvm-heritage-card">
                <div className="vvm-heritage-card-top">
                  <span className="vvm-heritage-domain">Physics &amp; Atomism</span>
                  <span className="vvm-subitem-badge">Vaiśeṣika</span>
                </div>
                <h4>Acharya Kanada &amp; Paramaṇu Theory</h4>
                <p>
                  Kanada postulated that the material universe is formed of indivisible, eternal particles called <em>Paramāṇu</em>. Two paramāṇus form a <em>dvyaṇuka</em> (dyad), and three dyads combine to form a <em>tryaṇuka</em> (triad), which is perceptible by the senses.
                </p>
                <div className="vvm-heritage-takeaway">
                  <strong>Key VVM Point:</strong> Pre-dates Democritus and Dalton; classified 9 basic substances (Dravyas) including space (Ākāśa) and time (Kāla).
                </div>
                {onOpenScienceLab && (
                  <button type="button" className="vvm-heritage-lab-btn" onClick={() => onOpenScienceLab('paramanu')}>
                    Launch Paramanu Simulation →
                  </button>
                )}
              </div>

              <div className="vvm-heritage-card">
                <div className="vvm-heritage-card-top">
                  <span className="vvm-heritage-domain">Metallurgy</span>
                  <span className="vvm-subitem-badge">Rasashastra</span>
                </div>
                <h4>Delhi Iron Pillar &amp; Wootz Crucible Steel</h4>
                <p>
                  The 4th-century CE Iron Pillar of Delhi (weighing over 6 tonnes) resists corrosion due to a thin catalytic film of <em>misawite</em> formed by ancient forge-welding of high-phosphorus bloomery iron. Southern India pioneered Wootz crucible steel (<em>Ukku</em>), globally prized for legendary Damascus blades.
                </p>
                <div className="vvm-heritage-takeaway">
                  <strong>Key VVM Point:</strong> Demonstrates advanced smelting, lack of corrosive sulfur/manganese, and crucible temperature control above 1400°C.
                </div>
                {onOpenIks && (
                  <button type="button" className="vvm-heritage-lab-btn" onClick={onOpenIks}>
                    Explore Wootz &amp; Patina Labs →
                  </button>
                )}
              </div>

              <div className="vvm-heritage-card">
                <div className="vvm-heritage-card-top">
                  <span className="vvm-heritage-domain">Surgery &amp; Medicine</span>
                  <span className="vvm-subitem-badge">Āyurveda</span>
                </div>
                <h4>Sushruta Saṁhitā &amp; Surgical Science</h4>
                <p>
                  Acharya Sushruta is recognized as the Father of Surgery. His treatise describes over 120 precision surgical tools (Yantras &amp; Śastras), dissection on cadavers, cataract couching, kidney stone extraction, and the world’s first forehead-flap rhinoplasty.
                </p>
                <div className="vvm-heritage-takeaway">
                  <strong>Key VVM Point:</strong> Charaka focused on internal medicine (Kāyacikitsā) and Tridosha balance; Sushruta specialized in surgery (Śalyatantra).
                </div>
                {onOpenIks && (
                  <button type="button" className="vvm-heritage-lab-btn" onClick={onOpenIks}>
                    View Susruta Surgical Kit Lab →
                  </button>
                )}
              </div>

              <div className="vvm-heritage-card">
                <div className="vvm-heritage-card-top">
                  <span className="vvm-heritage-domain">Astronomy</span>
                  <span className="vvm-subitem-badge">Jyotiṣa</span>
                </div>
                <h4>Aryabhata, Varahamihira &amp; Bhaskara</h4>
                <p>
                  Aryabhata (476 CE) calculated the solar year to 365.258 days, proved Earth’s axial rotation, and determined π ≈ 3.1416. Bhaskaracharya (1150 CE) in <em>Siddhānta Śiromaṇi</em> described gravity as an attractive force (<em>Ākarṣaṇa Śakti</em>) keeping the planets in orbital balance.
                </p>
                <div className="vvm-heritage-takeaway">
                  <strong>Key VVM Point:</strong> Eclipses were explained scientifically as lunar and terrestrial shadows, debunking mythical Rahu-Ketu consumption.
                </div>
                {onOpenIks && (
                  <button type="button" className="vvm-heritage-lab-btn" onClick={onOpenIks}>
                    Explore Konark Solar Lab →
                  </button>
                )}
              </div>

              <div className="vvm-heritage-card">
                <div className="vvm-heritage-card-top">
                  <span className="vvm-heritage-domain">Mathematics</span>
                  <span className="vvm-subitem-badge">Śulba Sūtras</span>
                </div>
                <h4>Geometry of Altars &amp; Kerala Calculus</h4>
                <p>
                  Baudhayana’s Śulba Sūtra (c. 800 BCE) enunciated the diagonal theorem (known later as the Pythagorean theorem) for fire altars. In the 14th century, Madhava of Kerala derived infinite series for π, sine, and cosine 250 years before Western calculus.
                </p>
                <div className="vvm-heritage-takeaway">
                  <strong>Key VVM Point:</strong> Ancient India contributed zero (Śūnya), decimal place-value, and algebraic indeterminate equations (Kuṭṭaka).
                </div>
                {onOpenVedicMaths && (
                  <button type="button" className="vvm-heritage-lab-btn" onClick={onOpenVedicMaths}>
                    Launch Vedic Maths Studio →
                  </button>
                )}
              </div>

              <div className="vvm-heritage-card">
                <div className="vvm-heritage-card-top">
                  <span className="vvm-heritage-domain">Civil Engineering</span>
                  <span className="vvm-subitem-badge">Vāstu &amp; Hydrology</span>
                </div>
                <h4>Harappan Town Planning &amp; Stepwells</h4>
                <p>
                  The Indus-Saraswati civilization at Dholavira and Mohenjo-daro featured sophisticated covered drainage, standardized burnt bricks in 1:2:4 ratio, Lothal tidal dockyard with lock gates, and cascading stepwells (Baolis) for arid rainwater harvesting.
                </p>
                <div className="vvm-heritage-takeaway">
                  <strong>Key VVM Point:</strong> Demonstrates early standardization of weights/measures, grid civil planning, and conservation hydrology.
                </div>
                {onOpenIks && (
                  <button type="button" className="vvm-heritage-lab-btn" onClick={onOpenIks}>
                    Explore Stepwell Water Lab →
                  </button>
                )}
              </div>
            </div>
          </section>
        )}

        {/* TAB 3: SCIENTISTS */}
        {activeTab === 'scientists' && (
          <section className="vvm-section" aria-labelledby="scientists-heading">
            <div className="vvm-section-header">
              <div className="vvm-section-kicker">Section A Qualifier (20% Weightage) · Official Curriculum</div>
              <h2 id="scientists-heading" className="vvm-section-title">Tri-Shakti: Featured Indian Women Scientists (VVM 2026–27)</h2>
              <p className="vvm-section-desc">
                Dive into the inspiring life journeys and research milestones of the three featured Indian women scientists for VVM 2026–27: Dr. Anna Mani (The Weather Woman of India), Dr. Asima Chatterjee (Organic Chemistry &amp; Phytomedicine), and Prof. Rohini Godbole (Theoretical Particle Physics &amp; CERN LHC Higgs Boson).
              </p>
            </div>

            {/* TRI-SHAKTI SPOTLIGHT HERO */}
            <div className="vvm-trishakti-hero-box">
              <div className="vvm-trishakti-badge">
                Featured 20% Section A Syllabus · VVM 2026–27
              </div>
              <h3 className="vvm-trishakti-title">
                Tri-Shakti: Inspiring Journeys of India&apos;s Women in Science
              </h3>
              <p className="vvm-trishakti-subtitle">
                Master the official life stories, breakthrough experiments, and institutional milestones for the 20-mark Section A qualifier.
              </p>
            </div>

            <div className="vvm-trishakti-grid">
              {/* Card 1: Dr. Anna Mani */}
              <div className="vvm-trishakti-card">
                <div className="vvm-trishakti-card-head">
                  <div className="vvm-trishakti-badge-chip">Atmospheric Physics</div>
                  <span className="vvm-trishakti-dates">1918 – 2001</span>
                </div>
                <h4 className="vvm-trishakti-name">Dr. Anna Mani</h4>
                <div className="vvm-trishakti-epithet">The Weather Woman of India</div>

                <div className="vvm-trishakti-meta-row">
                  <div>
                    <span className="vvm-trishakti-meta-label">Core Domain:</span>
                    <span className="vvm-trishakti-meta-val">Atmospheric Physics &amp; Meteorological Instrumentation</span>
                  </div>
                  <div>
                    <span className="vvm-trishakti-meta-label">Key Institutions:</span>
                    <span className="vvm-trishakti-meta-val">IISc Bengaluru (Raman Lab) · IMD Pune &amp; New Delhi</span>
                  </div>
                </div>

                <div className="vvm-trishakti-block">
                  <span className="vvm-trishakti-block-title">Major Breakthroughs:</span>
                  <ul className="vvm-trishakti-list">
                    <li><strong>100+ Weather Instruments:</strong> Designed and standardized indigenous instruments in India, eliminating dependence on costly foreign imports.</li>
                    <li><strong>Indian Ozonesonde:</strong> Developed the specialized balloon-borne ozonesonde to measure vertical ozone concentration profiles in the atmosphere.</li>
                    <li><strong>Renewable Energy Pioneer:</strong> Authored definitive reference handbooks <em>The Handbook of Solar Radiation Data for India</em> and <em>Wind Energy Data for India</em>.</li>
                  </ul>
                </div>

                <div className="vvm-trishakti-quickfact">
                  <strong>VVM Exam Quick-Fact:</strong>
                  <span>Began research under Nobel Laureate <strong>Sir C. V. Raman</strong> studying spectroscopy of diamonds and rubies before mastering meteorological instruments at Imperial College London. Awarded the INSA <strong>K. R. Ramanathan Medal (1987)</strong>.</span>
                </div>
              </div>

              {/* Card 2: Dr. Asima Chatterjee */}
              <div className="vvm-trishakti-card">
                <div className="vvm-trishakti-card-head">
                  <div className="vvm-trishakti-badge-chip">Organic Chemistry</div>
                  <span className="vvm-trishakti-dates">1917 – 2006</span>
                </div>
                <h4 className="vvm-trishakti-name">Dr. Asima Chatterjee</h4>
                <div className="vvm-trishakti-epithet">Pioneer of Indian Phytomedicine</div>

                <div className="vvm-trishakti-meta-row">
                  <div>
                    <span className="vvm-trishakti-meta-label">Core Domain:</span>
                    <span className="vvm-trishakti-meta-val">Organic Chemistry &amp; Natural Product Phytochemistry</span>
                  </div>
                  <div>
                    <span className="vvm-trishakti-meta-label">Key Institutions:</span>
                    <span className="vvm-trishakti-meta-val">University of Calcutta (Khaira Professor of Chemistry)</span>
                  </div>
                </div>

                <div className="vvm-trishakti-block">
                  <span className="vvm-trishakti-block-title">Major Breakthroughs:</span>
                  <ul className="vvm-trishakti-list">
                    <li><strong>First Indian Woman D.Sc.:</strong> First woman to earn a Doctorate of Science from an Indian university (Calcutta University, 1944).</li>
                    <li><strong>Indole &amp; Vinca Alkaloids:</strong> Elucidated the molecular structures and stereochemistry of indole alkaloids from <em>Rauvolfia</em> and vinca species (vital for cancer chemotherapy).</li>
                    <li><strong>Ayush-56 Drug:</strong> Developed the patented anti-epileptic formulation <em>Ayush-56</em> from the aquatic herb <em>Marsilea minuta</em> (Sunsuniya) and anti-malarial therapies.</li>
                  </ul>
                </div>

                <div className="vvm-trishakti-quickfact">
                  <strong>VVM Exam Quick-Fact:</strong>
                  <span>In 1975, became the <strong>first woman elected General President of the Indian Science Congress</strong>. Conferred the <strong>Padma Bhushan</strong> and Shanti Swarup Bhatnagar Prize.</span>
                </div>
              </div>

              {/* Card 3: Prof. Rohini Godbole */}
              <div className="vvm-trishakti-card">
                <div className="vvm-trishakti-card-head">
                  <div className="vvm-trishakti-badge-chip">Particle Physics</div>
                  <span className="vvm-trishakti-dates">1952 – 2024</span>
                </div>
                <h4 className="vvm-trishakti-name">Prof. Rohini Godbole</h4>
                <div className="vvm-trishakti-epithet">Architect of Particle Phenomenology</div>

                <div className="vvm-trishakti-meta-row">
                  <div>
                    <span className="vvm-trishakti-meta-label">Core Domain:</span>
                    <span className="vvm-trishakti-meta-val">Theoretical High-Energy Particle Physics</span>
                  </div>
                  <div>
                    <span className="vvm-trishakti-meta-label">Key Institutions:</span>
                    <span className="vvm-trishakti-meta-val">TIFR Mumbai · Centre for High Energy Physics, IISc Bengaluru</span>
                  </div>
                </div>

                <div className="vvm-trishakti-block">
                  <span className="vvm-trishakti-block-title">Major Breakthroughs:</span>
                  <ul className="vvm-trishakti-list">
                    <li><strong>Photon Hadronic Structure:</strong> Co-authored the globally recognized Drees–Godbole model on photon-hadron cross-sections, essential for CERN&apos;s <strong>Large Hadron Collider (LHC)</strong>.</li>
                    <li><strong>Higgs Boson Phenomenology:</strong> Guided high-energy collider searches for the Higgs boson and supersymmetric particles beyond the Standard Model.</li>
                    <li><strong>Lilavati&apos;s Daughters:</strong> Co-edited the landmark book profiling nearly 100 Indian women scientists to mentor and inspire female scientists in STEM.</li>
                  </ul>
                </div>

                <div className="vvm-trishakti-quickfact">
                  <strong>VVM Exam Quick-Fact:</strong>
                  <span>Conferred India&apos;s <strong>Padma Shri (2019)</strong> and France&apos;s <strong>Ordre National du Mérite (2021)</strong> for international high-energy physics leadership and Indo-French scientific cooperation.</span>
                </div>
              </div>
            </div>

            {/* Sub-heading for other classical scientists */}
            <div className="vvm-section-header" style={{ marginTop: '2.5rem' }}>
              <div className="vvm-section-kicker">Modern Indian Scientific Heritage</div>
              <h3 className="vvm-section-title" style={{ fontSize: '1.35rem' }}>Foundational Pioneers of Modern Indian Science</h3>
              <p className="vvm-section-desc">
                Classical Indian physicists, chemists, and mathematicians whose pioneering discoveries shaped global 20th-century science:
              </p>
            </div>

            <div className="vvm-scientists-grid">

              <div className="vvm-scientist-card">
                <div className="vvm-scientist-header">
                  <h3 className="vvm-scientist-name">Jagadish Chandra Bose</h3>
                  <div className="vvm-scientist-dates">1858 – 1937 · Biophysics &amp; Wireless Telecommunications</div>
                </div>
                <div className="vvm-scientist-field">Founder, Bose Institute Kolkata</div>
                <p className="vvm-scientist-desc">
                  Pioneer of 60 GHz millimetre waves, horn antennas, and semiconductor crystal detectors. He invented the <em>Crescograph</em>, measuring microscopic plant growth and demonstrating that plant tissues possess electrical response mechanisms similar to animal nervous systems.
                </p>
                <div className="vvm-scientist-milestones">
                  <strong>VVM Exam Focus:</strong>
                  Galena crystal receiver · Millimetre waves · Crescograph · Refusal to patent discoveries (open science advocate).
                </div>
              </div>

              <div className="vvm-scientist-card">
                <div className="vvm-scientist-header">
                  <h3 className="vvm-scientist-name">Sir C.V. Raman</h3>
                  <div className="vvm-scientist-dates">1888 – 1970 · Optical Physics</div>
                </div>
                <div className="vvm-scientist-field">Nobel Prize in Physics (1930) · Bharat Ratna (1954)</div>
                <p className="vvm-scientist-desc">
                  Discovered the Raman Effect on February 28, 1928, showing that photons scattered by transparent molecules undergo changes in frequency corresponding to molecular vibration states. This established Raman spectroscopy, used globally in chemistry, pharmaceuticals, and materials science.
                </p>
                <div className="vvm-scientist-milestones">
                  <strong>VVM Exam Focus:</strong>
                  Raman Effect · National Science Day (Feb 28) · First Asian scientist to win a Nobel Prize in science.
                </div>
              </div>

              <div className="vvm-scientist-card">
                <div className="vvm-scientist-header">
                  <h3 className="vvm-scientist-name">Prof. Meghnad Saha</h3>
                  <div className="vvm-scientist-dates">1893 – 1956 · Astrophysics &amp; Nuclear Physics</div>
                </div>
                <div className="vvm-scientist-field">Founder, Saha Institute of Nuclear Physics</div>
                <p className="vvm-scientist-desc">
                  Formulated the Saha Ionization Equation (1920), which correlates the degree of thermal ionization in stars with temperature and pressure. This equation unlocked modern astrophysics by enabling scientists to determine the temperature, pressure, and chemical composition of distant stars.
                </p>
                <div className="vvm-scientist-milestones">
                  <strong>VVM Exam Focus:</strong>
                  Saha Ionization Equation · Stellar spectroscopy · River valley project planning (Damodar Valley Corporation).
                </div>
              </div>

              <div className="vvm-scientist-card">
                <div className="vvm-scientist-header">
                  <h3 className="vvm-scientist-name">Satyendra Nath Bose</h3>
                  <div className="vvm-scientist-dates">1894 – 1974 · Quantum Mechanics &amp; Mathematical Physics</div>
                </div>
                <div className="vvm-scientist-field">University of Calcutta &amp; Dhaka University</div>
                <p className="vvm-scientist-desc">
                  Derived Planck’s quantum radiation law without reference to classical electrodynamics, founding Bose-Einstein statistics. Albert Einstein extended his paper to predict the Bose-Einstein Condensate (BEC). In his honour, all particles with integer spin are named <em>Bosons</em>.
                </p>
                <div className="vvm-scientist-milestones">
                  <strong>VVM Exam Focus:</strong>
                  Bose-Einstein Statistics · Bosons (named by Paul Dirac) · Bose-Einstein Condensate (5th state of matter).
                </div>
              </div>

              <div className="vvm-scientist-card">
                <div className="vvm-scientist-header">
                  <h3 className="vvm-scientist-name">Homi Jehangir Bhabha</h3>
                  <div className="vvm-scientist-dates">1909 – 1966 · Nuclear &amp; Cosmic Ray Physics</div>
                </div>
                <div className="vvm-scientist-field">Father of the Indian Nuclear Program · Founder, TIFR &amp; BARC</div>
                <p className="vvm-scientist-desc">
                  Pioneered research on electron-positron scattering (Bhabha Scattering) and formulated India’s strategic three-stage nuclear power program to utilize the nation’s vast monazite thorium reserves in fast breeder reactors.
                </p>
                <div className="vvm-scientist-milestones">
                  <strong>VVM Exam Focus:</strong>
                  Bhabha Scattering · Three-stage nuclear energy blueprint · Establishment of TIFR and Atomic Energy Commission.
                </div>
              </div>

              <div className="vvm-scientist-card">
                <div className="vvm-scientist-header">
                  <h3 className="vvm-scientist-name">Srinivasa Ramanujan</h3>
                  <div className="vvm-scientist-dates">1887 – 1920 · Pure Mathematics &amp; Number Theory</div>
                </div>
                <div className="vvm-scientist-field">Fellow of the Royal Society · Trinity College Cambridge</div>
                <p className="vvm-scientist-desc">
                  Discovered nearly 3,900 mathematical identities, infinite series for 1/π, partition formulas with G.H. Hardy, and mock theta functions. His work continues to inspire modern breakthroughs in string theory, black hole physics, and crystallography.
                </p>
                <div className="vvm-scientist-milestones">
                  <strong>VVM Exam Focus:</strong>
                  National Mathematics Day (Dec 22) · Ramanujan-Hardy taxi number 1729 (1³ + 12³ = 9³ + 10³) · Partition function.
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB 4: NCERT BRIDGES */}
        {activeTab === 'ncert' && (
          <section className="vvm-section" aria-labelledby="ncert-heading">
            <div className="vvm-section-header">
              <div className="vvm-section-kicker">Section B Study Guide (50% Weightage)</div>
              <h2 id="ncert-heading" className="vvm-section-title">NCERT Science &amp; Mathematics Modules</h2>
              <p className="vvm-section-desc">
                Section B accounts for half of your total score. Prepare key NCERT Class 6–10 concepts through EdNet Learn’s interactive virtual laboratories.
              </p>
            </div>

            <div className="vvm-ncert-callout">
              <div className="vvm-ncert-callout-text">
                <h4>Hands-On Experimentation Beats Rote Memorization</h4>
                <p>
                  VVM test questions evaluate conceptual clarity, variable manipulation, and experimental observations. Test your hypotheses using these 6 high-yield simulation labs:
                </p>
              </div>
            </div>

            <div className="vvm-ncert-grid">
              <div className="vvm-sim-card">
                <span className="vvm-sim-card-tag">Physics · Class 7–10</span>
                <h5>Ray Optics &amp; Prism Dispersion</h5>
                <p>Experiment with reflection, refraction, focal length, convex/concave lens image formation, and Snell&apos;s law.</p>
                {onOpenScienceLab && (
                  <button type="button" className="vvm-sim-link-btn" onClick={() => onOpenScienceLab('optics')}>
                    Open Optics Lab →
                  </button>
                )}
              </div>

              <div className="vvm-sim-card">
                <span className="vvm-sim-card-tag">Physics · Class 9</span>
                <h5>Simple Pendulum &amp; Gravitation</h5>
                <p>Explore periodic motion, time period T = 2π√(L/g), amplitude independence, and gravity variations.</p>
                {onOpenScienceLab && (
                  <button type="button" className="vvm-sim-link-btn" onClick={() => onOpenScienceLab('pendulum')}>
                    Open Pendulum Lab →
                  </button>
                )}
              </div>

              <div className="vvm-sim-card">
                <span className="vvm-sim-card-tag">Physics · Class 10</span>
                <h5>Ohm&apos;s Law &amp; Circuit Resistors</h5>
                <p>Verify V = I · R with virtual ammeters and voltmeters. Configure series and parallel resistor networks.</p>
                {onOpenScienceLab && (
                  <button type="button" className="vvm-sim-link-btn" onClick={() => onOpenScienceLab('ohm')}>
                    Open Ohm&apos;s Law Lab →
                  </button>
                )}
              </div>

              <div className="vvm-sim-card">
                <span className="vvm-sim-card-tag">Chemistry · Class 7 &amp; 10</span>
                <h5>Acids, Bases &amp; pH Indicator Scale</h5>
                <p>Titrate strong/weak acids and bases. Observe colour transitions with litmus, methyl orange, and phenolphthalein.</p>
                {onOpenScienceLab && (
                  <button type="button" className="vvm-sim-link-btn" onClick={() => onOpenScienceLab('ph-titration')}>
                    Open pH Titration Lab →
                  </button>
                )}
              </div>

              <div className="vvm-sim-card">
                <span className="vvm-sim-card-tag">Physics · Class 9</span>
                <h5>Archimedes Buoyancy &amp; Density</h5>
                <p>Measure buoyant upthrust, fluid displacement, relative density, and conditions for floating vs. sinking.</p>
                {onOpenScienceLab && (
                  <button type="button" className="vvm-sim-link-btn" onClick={() => onOpenScienceLab('buoyancy')}>
                    Open Buoyancy Lab →
                  </button>
                )}
              </div>

              <div className="vvm-sim-card">
                <span className="vvm-sim-card-tag">Mathematics · Class 6–10</span>
                <h5>Vedic Sutras &amp; Mental Mathematics</h5>
                <p>Master 16 Vedic calculation sutras (Ekādhikena Pūrveṇa, Ūrdhva Tiryagbhyām) for rapid mental multiplication.</p>
                {onOpenVedicMaths && (
                  <button type="button" className="vvm-sim-link-btn" onClick={onOpenVedicMaths}>
                    Open Vedic Maths Studio →
                  </button>
                )}
              </div>
            </div>

            {/* Class-wise NCERT Curriculum Roadmap */}
            <div className="vvm-ncert-roadmap" style={{ marginTop: '2.5rem' }}>
              <div className="vvm-section-header">
                <div className="vvm-section-kicker">Curriculum Mapping</div>
                <h3 className="vvm-section-title" style={{ fontSize: '1.45rem' }}>NCERT Class-Wise Science &amp; Mathematics Focus</h3>
                <p className="vvm-section-desc">
                  VVM questions are strictly aligned with your registered class level. Master these core themes from your NCERT science and maths textbooks:
                </p>
              </div>

              <div className="vvm-cohort-grid">
                <div className="vvm-cohort-card">
                  <div className="vvm-cohort-badge junior">Junior Group · Classes 6, 7 &amp; 8</div>
                  <ul className="vvm-cohort-topics">
                    <li><strong>Class 6:</strong> Motion &amp; Distances, Light, Shadows &amp; Reflections, Electricity &amp; Circuits, Components of Food, Living Organisms, Fractions &amp; Number Lines.</li>
                    <li><strong>Class 7:</strong> Heat &amp; Temperature, Acids, Bases &amp; Salts, Physical &amp; Chemical Changes, Motion &amp; Time, Electric Current &amp; Its Effects, Light, Plant Nutrition &amp; Respiration.</li>
                    <li><strong>Class 8:</strong> Force &amp; Pressure, Friction, Sound, Chemical Effects of Electric Current, Light &amp; Vision, Microorganisms, Algebraic Expressions &amp; Mensuration.</li>
                  </ul>
                </div>

                <div className="vvm-cohort-card">
                  <div className="vvm-cohort-badge senior">Senior Group · Classes 9, 10 &amp; 11</div>
                  <ul className="vvm-cohort-topics">
                    <li><strong>Class 9:</strong> Laws of Motion, Universal Gravitation, Work &amp; Energy, Sound, Matter in Our Surroundings, Atoms &amp; Molecules, Cell &amp; Tissues, Number Systems, Polynomials.</li>
                    <li><strong>Class 10:</strong> Light Reflection &amp; Refraction, Human Eye, Electricity, Magnetic Effects, Chemical Reactions, Carbon Compounds, Life Processes, Control &amp; Coordination, Heredity.</li>
                    <li><strong>Class 11:</strong> Units &amp; Dimensions, Kinematics, Laws of Motion, Work Energy &amp; Power, Thermodynamics, Atomic Structure, Chemical Bonding, Cell Biology, Coordinate Geometry.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Official Study Material Download Reference */}
            <div className="vvm-official-downloads-box">
              <div className="vvm-odb-header">
                <h4>Official VVM 2026–27 Study Resources &amp; Booklets</h4>
                <p>
                  VIBHA provides dedicated preparation booklets for Section A in digital format on the official registration portal.
                </p>
              </div>
              <div className="vvm-odb-grid">
                <div className="vvm-odb-item">
                  <strong>1. Indian Contributions to Science (ICS)</strong>
                  <span>Official text compiled by VIBHA covering ancient to modern Indian scientific heritage.</span>
                  <a href="https://vvm.org.in/" target="_blank" rel="noopener noreferrer" className="vvm-odb-link">
                    Download from vvm.org.in ↗
                  </a>
                </div>
                <div className="vvm-odb-item">
                  <strong>2. Life Stories of Eminent Indian Scientists</strong>
                  <span>Dedicated booklets on Anna Mani, Asima Chatterjee, and contemporary pioneers.</span>
                  <a href="https://vvm.org.in/" target="_blank" rel="noopener noreferrer" className="vvm-odb-link">
                    Download from vvm.org.in ↗
                  </a>
                </div>
                <div className="vvm-odb-item">
                  <strong>3. VVM Dedicated Exam Mobile App</strong>
                  <span>App available on Android Play Store and iOS for Mock practice and final exam.</span>
                  <a href="https://vvm.org.in/" target="_blank" rel="noopener noreferrer" className="vvm-odb-link">
                    Get App Instructions ↗
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB 5: LOGIC */}
        {activeTab === 'logic' && (
          <section className="vvm-section" aria-labelledby="logic-heading">
            <div className="vvm-section-header">
              <div className="vvm-section-kicker">Section B Study Guide (10% Weightage)</div>
              <h2 id="logic-heading" className="vvm-section-title">Logic &amp; Analytical Reasoning Guide</h2>
              <p className="vvm-section-desc">
                Section B includes 10 questions testing spatial, analytical, and relational logic. Master the fundamental patterns asked in VVM exams.
              </p>
            </div>

            <div className="vvm-heritage-grid">
              <div className="vvm-heritage-card">
                <div className="vvm-heritage-card-top">
                  <span className="vvm-heritage-domain">Pattern Recognition</span>
                  <span className="vvm-subitem-badge">Series</span>
                </div>
                <h4>Number &amp; Letter Series Completion</h4>
                <p>
                  Look for prime number sequences, arithmetic differences with changing step sizes, alternating powers (n² + 1, n³ - 1), or Fibonacci-type recurrences where each term is the sum of preceding numbers.
                </p>
                <div className="vvm-heritage-takeaway">
                  <strong>Example:</strong> 2, 6, 12, 20, 30, <strong>42</strong> (Pattern: differences are +4, +6, +8, +10, +12).
                </div>
              </div>

              <div className="vvm-heritage-card">
                <div className="vvm-heritage-card-top">
                  <span className="vvm-heritage-domain">Spatial Deduction</span>
                  <span className="vvm-subitem-badge">Geometry</span>
                </div>
                <h4>Mirror Reflections &amp; Folded Paper</h4>
                <p>
                  In mirror images, left and right invert while vertical orientation stays unchanged. In water reflections, top and bottom invert while horizontal orientation stays fixed. Check asymmetry on letter shapes (P, R, F, S).
                </p>
                <div className="vvm-heritage-takeaway">
                  <strong>Example:</strong> Inverting dice faces: opposite sides of a standard die always sum to 7 (1 ↔ 6, 2 ↔ 5, 3 ↔ 4).
                </div>
              </div>

              <div className="vvm-heritage-card">
                <div className="vvm-heritage-card-top">
                  <span className="vvm-heritage-domain">Cryptic Encodings</span>
                  <span className="vvm-subitem-badge">Ciphers</span>
                </div>
                <h4>Letter Shifts &amp; Ancient Kaṭapayādi</h4>
                <p>
                  Coding problems frequently use Caesar shifts (+3, -2), reverse alphabet mappings (A ↔ Z, B ↔ Y), or historical Indian syllable-digit rules where consonants correspond to digits 0–9.
                </p>
                <div className="vvm-heritage-takeaway">
                  <strong>Example:</strong> If DELHI is coded as 4-5-12-8-9, then INDIA is 9-14-4-9-1 (alphabetical position).
                </div>
              </div>

              <div className="vvm-heritage-card">
                <div className="vvm-heritage-card-top">
                  <span className="vvm-heritage-domain">Relational Logic</span>
                  <span className="vvm-subitem-badge">Blood Relations</span>
                </div>
                <h4>Family Trees &amp; Direction Navigation</h4>
                <p>
                  Map direction problems on a Cartesian grid (+y North, -y South, +x East, -x West). For family relations, map generations on tiered horizontal levels and mark gender indicators (+ / -).
                </p>
                <div className="vvm-heritage-takeaway">
                  <strong>Tip:</strong> Always sketch vectors: walking East then turning left takes you North; turning right takes you South.
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB 6: MOCK QUIZ */}
        {activeTab === 'quiz' && (
          <section className="vvm-section" aria-labelledby="quiz-heading">
            {/* Cohort Switcher Bar */}
            <div className="vvm-cohort-selector-bar">
              <span className="vvm-cohort-selector-label">Select Exam Track:</span>
              <button
                type="button"
                className={`vvm-cohort-btn${mockCohort === 'junior' ? ' active' : ''}`}
                onClick={() => {
                  setMockCohort('junior');
                  setQuizFilter('all');
                }}
              >
                <span>Junior Group (Classes 6–8)</span>
                <span className="vvm-cohort-btn-pill">
                  {Object.keys(cohortAnswers.junior).length}/30 Qs
                </span>
              </button>
              <button
                type="button"
                className={`vvm-cohort-btn${mockCohort === 'senior' ? ' active' : ''}`}
                onClick={() => {
                  setMockCohort('senior');
                  setQuizFilter('all');
                }}
              >
                <span>Senior Group (Classes 9–11)</span>
                <span className="vvm-cohort-btn-pill">
                  {Object.keys(cohortAnswers.senior).length}/30 Qs
                </span>
              </button>
            </div>

            <div className="vvm-section-header">
              <div className="vvm-section-kicker">Interactive Diagnostic Mock Exam · {activeExam.cohortLabel}</div>
              <h2 id="quiz-heading" className="vvm-section-title">{activeExam.title}</h2>
              <p className="vvm-section-desc">
                Full 30-question diagnostic mock exam strictly adhering to the VVM 2026–27 curriculum and marking scheme. Section A tests Indian Scientific Heritage and Tri-Shakti Biographies (+4 marks, 0 negative, 50% cutoff to qualify). Section B tests NCERT Science, Mathematics, and Logic (+4 marks, -1 mark penalty).
              </p>
            </div>

            {/* Official Exam Rules Banner */}
            <div className="vvm-quiz-rules-banner">
              <div className="vvm-quiz-rules-title">
                <span>VVM Exam Structure &amp; Qualifier Thresholds</span>
                <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
                  Exam ID: {activeExam.examId} · Duration: {activeExam.durationMinutes} Mins · Total: 120 Marks
                </span>
              </div>
              <div className="vvm-quiz-rules-grid">
                <div className="vvm-quiz-rule-card">
                  <strong>Part A: Qualifier (Questions 1–12 · 48 Marks)</strong>
                  <span>6 Indian Contributions to Science + 6 Tri-Shakti Biographies (Mani, Chatterjee, Godbole). +4 marks per correct, 0 negative marks. <strong>Must score &ge; 24 marks (50%) to qualify.</strong></span>
                </div>
                <div className="vvm-quiz-rule-card">
                  <strong>Part B: Core Syllabus (Questions 13–30 · 72 Marks)</strong>
                  <span>15 NCERT Science &amp; Maths + 3 Logic &amp; Reasoning. +4 marks per correct, <strong>-1 mark deduction</strong> for incorrect answers. Evaluated only if Part A achieves &ge; 50%.</span>
                </div>
              </div>
            </div>

            {/* Section A Qualifier Status Alert */}
            {scoreSummary.partAAttempted > 0 && (
              <div className={`vvm-qualifier-banner ${scoreSummary.isPartAQualified ? 'qualified' : 'pending'}`}>
                <div>
                  <h4 className="vvm-qualifier-banner-title">
                    {scoreSummary.isPartAQualified
                      ? 'Part A Qualifier Achieved: Qualified for Section B Evaluation!'
                      : 'Part A Cutoff Status: Qualification Pending (Minimum 24 / 48 Marks Required)'}
                  </h4>
                  <div className="vvm-qualifier-banner-sub">
                    {scoreSummary.isPartAQualified
                      ? `You scored ${scoreSummary.partAScore} / 48 marks in Part A (Cutoff: 24). Part B score (${scoreSummary.partBScore} marks) is eligible and factored into your National Rank merit score!`
                      : `You have scored ${scoreSummary.partAScore} / 48 marks so far with ${scoreSummary.partACorrect} correct out of 12. Under VVM rules, Part B is evaluated only when Part A reaches 24 marks.`}
                  </div>
                </div>
                <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>
                  Part A: {scoreSummary.partAScore} / 48
                </div>
              </div>
            )}

            {/* Scorecard Summary Grid */}
            <div className="vvm-quiz-score-cards-grid">
              <div className="vvm-score-card">
                <div className="vvm-score-card-kicker">Overall Progress</div>
                <div className="vvm-score-card-num">{answeredCount} / 30</div>
                <div className="vvm-score-card-desc">
                  {scoreSummary.totalUnanswered} questions remaining
                </div>
              </div>

              <div className="vvm-score-card">
                <div className="vvm-score-card-kicker">Part A Score (Qualifier)</div>
                <div className="vvm-score-card-num">{scoreSummary.partAScore} / 48</div>
                <div className="vvm-score-card-desc">
                  {scoreSummary.partACorrect} correct · {scoreSummary.partAIncorrect} wrong · No negative
                </div>
              </div>

              <div className="vvm-score-card">
                <div className="vvm-score-card-kicker">Part B Score (Core)</div>
                <div className="vvm-score-card-num">{scoreSummary.partBScore} / 72</div>
                <div className="vvm-score-card-desc">
                  {scoreSummary.partBCorrect} correct (+4) · {scoreSummary.partBIncorrect} wrong (-1)
                </div>
              </div>

              <div className="vvm-score-card highlight">
                <div className="vvm-score-card-kicker">Total Merit Score</div>
                <div className="vvm-score-card-num">{currentScore} / 120</div>
                <div className="vvm-score-card-desc">
                  {scoreSummary.isPartAQualified
                    ? 'Official combined score (Part A + Part B)'
                    : 'Part A score only (qualifier pending)'}
                </div>
              </div>
            </div>

            {/* Status & Filter Bar */}
            <div className="vvm-quiz-status-bar">
              <div className="vvm-quiz-filter-group">
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b' }}>Filter:</span>
                <button
                  type="button"
                  className={`vvm-quiz-filter-btn${quizFilter === 'all' ? ' active' : ''}`}
                  onClick={() => setQuizFilter('all')}
                >
                  All Questions (30)
                </button>
                <button
                  type="button"
                  className={`vvm-quiz-filter-btn${quizFilter === 'partA' ? ' active' : ''}`}
                  onClick={() => setQuizFilter('partA')}
                >
                  Part A: Heritage &amp; Biographies (12)
                </button>
                <button
                  type="button"
                  className={`vvm-quiz-filter-btn${quizFilter === 'partB' ? ' active' : ''}`}
                  onClick={() => setQuizFilter('partB')}
                >
                  Part B: NCERT &amp; Logic (18)
                </button>
              </div>

              {answeredCount > 0 && (
                <button type="button" className="vvm-quiz-reset-btn" onClick={handleResetQuiz}>
                  Reset Mock Exam ↺
                </button>
              )}
            </div>

            {/* Questions Container */}
            <div className="vvm-quiz-container">
              {displayedQuestions.map((q) => {
                const userChoice = currentAnswers[q.id];
                const isAnswered = userChoice !== undefined;
                const isCorrect = userChoice === q.correctIndex;
                const isPartA = q.section === 'Part A';

                return (
                  <div key={q.id} className="vvm-question-card">
                    <div className="vvm-q-meta">
                      <div className="vvm-q-badges">
                        <span className={`vvm-q-section-pill ${isPartA ? 'part-a' : 'part-b'}`}>
                          {q.section} · {isPartA ? 'Qualifier' : 'Core'}
                        </span>
                        <span className="vvm-q-category">{q.category}</span>
                        <span className="vvm-q-marking-pill">
                          {isPartA ? '+4 Marks | 0 Negative' : '+4 Marks | -1 Negative'}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {isAnswered && (
                          <span
                            className={`vvm-q-earned-pill ${
                              isCorrect ? 'plus' : isPartA ? 'zero' : 'minus'
                            }`}
                          >
                            {isCorrect ? '+4 Marks' : isPartA ? '0 Marks' : '-1 Mark'}
                          </span>
                        )}
                        <span className="vvm-q-index">Question {q.id} of 30</span>
                      </div>
                    </div>

                    <div className="vvm-q-text">{q.question}</div>

                    <div className="vvm-options-grid">
                      {q.options.map((optText, optIdx) => {
                        let btnClass = 'vvm-option-btn';
                        if (isAnswered) {
                          if (optIdx === q.correctIndex) {
                            btnClass += optIdx === userChoice ? ' selected-correct' : ' reveal-correct';
                          } else if (optIdx === userChoice) {
                            btnClass += ' selected-incorrect';
                          }
                        }

                        const optionLetters = ['A', 'B', 'C', 'D'];

                        return (
                          <button
                            key={optIdx}
                            type="button"
                            className={btnClass}
                            onClick={() => handleSelectAnswer(q.id, optIdx)}
                            disabled={isAnswered}
                          >
                            <span className="vvm-opt-letter">{optionLetters[optIdx]}</span>
                            <span>{optText}</span>
                          </button>
                        );
                      })}
                    </div>

                    {isAnswered && (
                      <div className="vvm-q-explanation">
                        <strong>Explanation &amp; VVM Insight:</strong>
                        <span>{q.explanation}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* TAB 7: JOURNEY & AWARDS */}
        {activeTab === 'journey' && (
          <section className="vvm-section" aria-labelledby="journey-heading">
            <div className="vvm-section-header">
              <div className="vvm-section-kicker">Multi-Tier Competition Pathway</div>
              <h2 id="journey-heading" className="vvm-section-title">The 4-Stage VVM Competition Journey</h2>
              <p className="vvm-section-desc">
                From your school classroom to India’s premier atomic research centers and space laboratories.
              </p>
            </div>

            <div className="vvm-timeline">
              <div className="vvm-timeline-node">
                <span className="vvm-timeline-step-badge">Stage 1 · November</span>
                <h4>School-Level Examination (Level 1)</h4>
                <p>
                  Conducted digitally on the VVM mobile app or computer browser in school premises or home. Top 20 rankers from each class in every state qualify for the prestigious State Camp (minimum qualifying criteria apply).
                </p>
              </div>

              <div className="vvm-timeline-node">
                <span className="vvm-timeline-step-badge">Stage 2 · December – January</span>
                <h4>State Level Camp (Level 2 - SLC)</h4>
                <p>
                  A 2-day residential science camp featuring hands-on science experiments, analytical problem-solving, situational reasoning, and audio-visual challenges. Top 2 students from each class in each state qualify for the National Camp.
                </p>
              </div>

              <div className="vvm-timeline-node">
                <span className="vvm-timeline-step-badge">Stage 3 · May</span>
                <h4>National Camp (Level 3 - NLC)</h4>
                <p>
                  A 2-day mega science immersion hosted at premier scientific institutions (such as BARC Mumbai, IISc Bengaluru, or IITs). Students engage with distinguished scientists, undertake lab tasks, and are tested on creative innovation.
                </p>
              </div>

              <div className="vvm-timeline-node">
                <span className="vvm-timeline-step-badge">Stage 4 · Ongoing</span>
                <h4>Himalayan Darshan, Bhaskara Scholarships &amp; Mentorship</h4>
                <p>
                  National winners (Himalayans) receive substantial cash awards, the prestigious Bhaskara Scholarship, and exclusive 1-year research mentorship with exposure visits to DRDO, ISRO, CSIR, and national laboratories.
                </p>
              </div>
            </div>

            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <a
                href="https://vvm.org.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="vvm-topbar-portal-link"
                style={{ fontSize: '0.95rem', padding: '0.65rem 1.4rem' }}
              >
                <span>Visit Official VVM Portal (vvm.org.in) to Register ↗</span>
              </a>
            </div>
          </section>
        )}

      </div>
    </div>
  );
};

export default VvmPreparationPage;

