import React, { useState } from 'react';
import { soundEffects } from '../utils/soundEffects';
import '../styles/practice-vault-showcase.css';

export interface PracticeVaultShowcaseProps {
  onOpenQuiz?: () => void;
  onOpenWorksheets?: () => void;
  onOpenResources?: () => void;
}

interface WorkbookCard {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  imageSrc: string;
}

interface QuizQuestion {
  id: number;
  question: string;
  sub: string;
  options: { label: string; text: string; isCorrect: boolean }[];
  explanation: string;
}

interface WorksheetCard {
  id: string;
  badge: string;
  marks: string;
  title: string;
  desc: string;
  questions: string[];
}

const WORKBOOKS_DATA: WorkbookCard[] = [
  {
    id: 'wb-basic',
    title: 'Vol I: Swar & Vyanjan Foundation',
    subtitle: 'वर्णाभ्यासः · Alphabet & Matras',
    badge: 'Page 3 · Swaras',
    description: 'Phonetic mouth articulation points (स्थान-करण), directional stroke tracing, and matra pairing drills.',
    imageSrc: '/workbook-preview/basic/p3.webp',
  },
  {
    id: 'wb-grammar',
    title: 'Vol II: 7 Vibhaktis & Cases',
    subtitle: 'विभक्ति-प्रदीपः · Declension Maps',
    badge: 'Page 4 · 7 Vibhaktis',
    description: 'Color-coded case ending grids for Rama, Lata, and Phalam across all 3 numbers (एक-द्वि-बहुवचन).',
    imageSrc: '/workbook-preview/grammar1/p4.webp',
  },
  {
    id: 'wb-festival',
    title: 'Vol III: Dīpāvalī & Sacred Shlokas',
    subtitle: 'उत्सव-श्लोकाः · Verses & Chants',
    badge: 'Page 3 · Dīpāvalī',
    description: 'Authentic celebration verses with word-by-word anvaya splitting, transliteration, and English meanings.',
    imageSrc: '/workbook-preview/festival/p3.webp',
  },
  {
    id: 'wb-animals',
    title: 'Vol IV: Sacred Mounts & Animals',
    subtitle: 'पशुपक्षि-कोशः · Mythological Vāhanas',
    badge: 'Page 16 · Vāhanas',
    description: 'Visual dictionary of 40+ animal names, divine deity vehicles, and conversational Sanskrit sentence stems.',
    imageSrc: '/workbook-preview/animals/p16.webp',
  },
];

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'विद्या + आलयः = ?',
    sub: 'Identify the correct Dīrgha Sandhi combination (दीर्घ-सन्धिः):',
    options: [
      { label: 'A', text: 'विद्यालयः', isCorrect: true },
      { label: 'B', text: 'विद्यलयः', isCorrect: false },
      { label: 'C', text: 'विद्याआलयः', isCorrect: false },
      { label: 'D', text: 'विद्योदयः', isCorrect: false },
    ],
    explanation: 'अकः सवर्णे दीर्घः (Pāṇini 6.1.101): When an akṣara ending in "ā" meets another "ā", both merge into the elongated swara "ā", yielding विद्यालयः (School / Abode of Learning).',
  },
  {
    id: 2,
    question: 'बालकः फलम् खादति — अत्र "फलम्" पदे का विभक्तिः?',
    sub: 'Determine the grammatical case (विभक्तिः) of the word "फलम्":',
    options: [
      { label: 'A', text: 'प्रथमा विभक्तिः (Nominative)', isCorrect: false },
      { label: 'B', text: 'द्वितीया विभक्तिः (Accusative / Object)', isCorrect: true },
      { label: 'C', text: 'तृतीया विभक्तिः (Instrumental)', isCorrect: false },
      { label: 'D', text: 'सप्तमी विभक्तिः (Locative)', isCorrect: false },
    ],
    explanation: 'कर्तुरीप्सिततमं कर्म (Pāṇini 1.4.49) & कर्मणि द्वितीया (2.3.2): Because the fruit is the direct object being consumed, it takes the 2nd case (द्वितीया).',
  },
  {
    id: 3,
    question: '"पठति" इति क्रियापदस्य लोट्-लकारे (आज्ञार्थे) प्रथमपुरुष-एकवचने किं रूपम्?',
    sub: 'Select the imperative command form (लोट्-लकारः) for root "पठ्" (to read):',
    options: [
      { label: 'A', text: 'पठतु', isCorrect: true },
      { label: 'B', text: 'अपठत्', isCorrect: false },
      { label: 'C', text: 'पठिष्यति', isCorrect: false },
      { label: 'D', text: 'पठेत्', isCorrect: false },
    ],
    explanation: 'The लोट्-लकारः singular 3rd person ending is -तु. Thus पठ् + तु = पठतु ("May he/she read" or "Let them read").',
  },
];

const WORKSHEETS_DATA: WorksheetCard[] = [
  {
    id: 'ws-class6',
    badge: 'CBSE Class 6 · Ruchira Part 1',
    marks: '25 Marks · 40 Mins',
    title: 'वन्दे भारतमातरम् (Salutations to Mother India)',
    desc: 'Varnamala sound splitting, basic noun declension identification, and shloka meaning matching.',
    questions: [
      '१. अधोलिखित-पदानां वर्ण-विच्छेदं कुरुत (Split letters into swaras/vyanjanas): भारतम्, विद्या।',
      '२. एकपदेन उत्तरत (Answer in one word): कस्याः पादपद्मं वन्दामहे?',
      '३. समानार्थक-पदानि मेलयत (Match synonyms): जननी ➔ माता, वसुधा ➔ पृथिवी।',
    ],
  },
  {
    id: 'ws-class7',
    badge: 'CBSE Class 7 · Ruchira Part 2',
    marks: '30 Marks · 45 Mins',
    title: 'सुभाषितानि (Timeless Gems of Wisdom)',
    desc: 'Verse reconstruction, anvaya prose order, sandhi resolution, and moral synthesis questions.',
    questions: [
      '१. श्लोकांशान् योजयत (Connect matching couplets): "पृथिव्यां त्रीणि रत्नानि..." ➔ जलमन्नं सुभाषितम्।',
      '२. रेखाङ्कित-पदानि आधृत्य प्रश्न-निर्माणं कुरुत (Form questions from underlined nouns).',
      '३. "सत्येन धार्यते पृथिवी" — अस्य वाक्यस्य भावार्थं स्वमातृभाषया लिखत।',
    ],
  },
  {
    id: 'ws-grammar',
    badge: 'Grammar Intensive · All Classes',
    marks: '40 Marks · 60 Mins',
    title: 'धातुरूप-शब्दरूप-अभ्यासः (Verb & Noun Master Drill)',
    desc: 'Rigorous tables for masculine/feminine noun stems and Present/Past tense verb conjugations.',
    questions: [
      '१. "राम" शब्दस्य पञ्चमी-विभक्तौ सर्वाणि रूपाणि लिखत (रामात्, रामाभ्याम्, रामेभ्यः)।',
      '२. "गम् (गच्छ्)" धातोः लङ्-लकारे (Past Tense) मध्यमपुरुषस्य त्रीणि रूपाणि लिखत।',
      '३. कोष्ठकात् समुचितं पदं चित्वा रिक्तस्थानानि पूरयत (Fill blanks with appropriate case).',
    ],
  },
];

export const PracticeVaultShowcase: React.FC<PracticeVaultShowcaseProps> = ({
  onOpenQuiz,
  onOpenWorksheets,
  onOpenResources,
}) => {
  const [activeTab, setActiveTab] = useState<'workbooks' | 'quizzes' | 'worksheets'>('workbooks');
  const [selectedWorkbook, setSelectedWorkbook] = useState<WorkbookCard | null>(null);

  // Quiz sandbox state
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  const currentQuestion = QUIZ_QUESTIONS[currentQuizIndex];
  const selectedOptionIdx = selectedAnswers[currentQuestion.id];
  const hasAnsweredCurrent = selectedOptionIdx !== undefined;

  const handleSelectOption = (idx: number) => {
    if (hasAnsweredCurrent) return;

    setSelectedAnswers((prev) => ({ ...prev, [currentQuestion.id]: idx }));
    const opt = currentQuestion.options[idx];
    if (opt.isCorrect) {
      soundEffects.playSuccessDing();
    } else {
      soundEffects.playErrorBuzzer();
    }
  };

  return (
    <section className="pvs-section" aria-label="Practice Vault: Workbooks, Quizzes, and Worksheets">
      <div className="pvs-card-container">
        {/* Header */}
        <div className="pvs-header">
          <span className="pvs-eyebrow">
            📖 अभ्यास-शाला · SELF-STUDY & PRACTICE VAULT
          </span>
          <h3 className="pvs-title">
            Curated Workbooks, Live Quizzes & CBSE Practice Sheets
          </h3>
          <p className="pvs-subtitle">
            Solidify your Sanskrit mastery through authentic handwriting workbooks, instant interactive self-checks, and syllabus-aligned CBSE exam worksheets.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="pvs-tabs-row" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'workbooks'}
            className={`pvs-tab-btn ${activeTab === 'workbooks' ? 'active' : ''}`}
            onClick={() => setActiveTab('workbooks')}
          >
            <span className="pvs-tab-icon">📚</span>
            <span>कार्यपुस्तिकाः (Workbooks)</span>
            <span className="pvs-tab-count">4 Volumes</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'quizzes'}
            className={`pvs-tab-btn ${activeTab === 'quizzes' ? 'active' : ''}`}
            onClick={() => setActiveTab('quizzes')}
          >
            <span className="pvs-tab-icon">⚡</span>
            <span>प्रश्नोत्तरी (Live Quiz)</span>
            <span className="pvs-tab-count">Instant Check</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'worksheets'}
            className={`pvs-tab-btn ${activeTab === 'worksheets' ? 'active' : ''}`}
            onClick={() => setActiveTab('worksheets')}
          >
            <span className="pvs-tab-icon">📝</span>
            <span>अभ्यास-पत्राणि (CBSE Worksheets)</span>
            <span className="pvs-tab-count">NCERT 6–10</span>
          </button>
        </div>

        {/* TAB 1: WORKBOOKS */}
        {activeTab === 'workbooks' && (
          <div>
            <div className="pvs-workbooks-grid">
              {WORKBOOKS_DATA.map((wb) => (
                <div
                  key={wb.id}
                  className="pvs-wb-card"
                  onClick={() => setSelectedWorkbook(wb)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedWorkbook(wb);
                    }
                  }}
                  title="Click to view full-page preview"
                >
                  <div className="pvs-wb-thumb-wrap">
                    <img
                      src={wb.imageSrc}
                      alt={wb.title}
                      loading="lazy"
                      className="pvs-wb-thumb-img"
                    />
                    <span className="pvs-wb-page-badge">{wb.badge}</span>
                    <div className="pvs-wb-preview-overlay">
                      <span>🔍 Tap to Preview</span>
                    </div>
                  </div>
                  <div className="pvs-wb-info">
                    <h4 className="pvs-wb-title">{wb.title}</h4>
                    <span className="pvs-wb-sub">{wb.subtitle}</span>
                    <p className="pvs-wb-desc">{wb.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pvs-bottom-bar">
              <div className="pvs-bottom-stats">
                <span className="pvs-bottom-stat-item">✨ 120+ High-Resolution Practice Pages</span>
                <span className="pvs-bottom-stat-item">🖨️ Printable PDF & Tablet Ready</span>
                <span className="pvs-bottom-stat-item">✍️ Devanagari Tracing Guides</span>
              </div>
              {onOpenResources && (
                <button
                  type="button"
                  onClick={onOpenResources}
                  className="pvs-cta-btn"
                >
                  Browse Full Workbook Vault ➔
                </button>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: LIVE QUIZ SANDBOX */}
        {activeTab === 'quizzes' && (
          <div>
            <div className="pvs-quiz-sandbox">
              <div className="pvs-quiz-question-bar">
                <span className="pvs-quiz-q-pill">
                  🎯 Question {currentQuizIndex + 1} of {QUIZ_QUESTIONS.length}
                </span>
                <div className="pvs-quiz-selector" aria-label="Select sample question">
                  {QUIZ_QUESTIONS.map((q, idx) => (
                    <button
                      key={q.id}
                      type="button"
                      className={`pvs-quiz-num-btn ${currentQuizIndex === idx ? 'active' : ''}`}
                      onClick={() => setCurrentQuizIndex(idx)}
                      title={`Go to Question ${idx + 1}`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pvs-quiz-prompt">{currentQuestion.question}</div>
              <div className="pvs-quiz-translation">{currentQuestion.sub}</div>

              <div className="pvs-quiz-options">
                {currentQuestion.options.map((opt, idx) => {
                  const isSelected = selectedOptionIdx === idx;
                  let optClass = '';
                  if (hasAnsweredCurrent) {
                    if (opt.isCorrect) optClass = 'correct';
                    else if (isSelected && !opt.isCorrect) optClass = 'incorrect';
                  }

                  return (
                    <button
                      key={opt.label}
                      type="button"
                      disabled={hasAnsweredCurrent}
                      className={`pvs-quiz-opt-btn ${optClass}`}
                      onClick={() => handleSelectOption(idx)}
                    >
                      <span className="pvs-opt-letter">{opt.label}</span>
                      <span className="pvs-opt-text">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {hasAnsweredCurrent && (
                <div
                  className={`pvs-quiz-feedback ${
                    currentQuestion.options[selectedOptionIdx]?.isCorrect ? 'is-correct' : 'is-incorrect'
                  }`}
                >
                  <strong>
                    {currentQuestion.options[selectedOptionIdx]?.isCorrect
                      ? '✓ साधु! (Well done!) '
                      : '✗ पुनः प्रयतस्व! (Try again!) '}
                  </strong>
                  <span>{currentQuestion.explanation}</span>
                </div>
              )}
            </div>

            <div className="pvs-bottom-bar">
              <div className="pvs-bottom-stats">
                <span className="pvs-bottom-stat-item">🏆 500+ Curated Sanskrit Drills</span>
                <span className="pvs-bottom-stat-item">⚡ Sandhi, Samasa & Vibhakti Modes</span>
                <span className="pvs-bottom-stat-item">📊 Instant Pāṇinian Rule Breakdowns</span>
              </div>
              {onOpenQuiz && (
                <button
                  type="button"
                  onClick={onOpenQuiz}
                  className="pvs-cta-btn"
                >
                  Launch Full Interactive Quiz ➔
                </button>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: CBSE WORKSHEETS */}
        {activeTab === 'worksheets' && (
          <div>
            <div className="pvs-worksheets-grid">
              {WORKSHEETS_DATA.map((ws) => (
                <div key={ws.id} className="pvs-ws-card">
                  <div className="pvs-ws-top">
                    <span className="pvs-ws-badge">{ws.badge}</span>
                    <span className="pvs-ws-marks">{ws.marks}</span>
                  </div>
                  <h4 className="pvs-ws-title">{ws.title}</h4>
                  <p className="pvs-ws-desc">{ws.desc}</p>

                  <div className="pvs-ws-questions-box">
                    {ws.questions.map((q, i) => (
                      <div key={i} className="pvs-ws-q-item">
                        {q}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="pvs-bottom-bar">
              <div className="pvs-bottom-stats">
                <span className="pvs-bottom-stat-item">📄 150+ Downloadable Worksheets</span>
                <span className="pvs-bottom-stat-item">🔑 Detailed Step-by-Step Answer Keys</span>
                <span className="pvs-bottom-stat-item">🎯 NCERT Ruchira Syllabus Aligned</span>
              </div>
              {onOpenWorksheets && (
                <button
                  type="button"
                  onClick={onOpenWorksheets}
                  className="pvs-cta-btn"
                >
                  Access All CBSE Worksheets ➔
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal for Full Workbook Page Preview */}
      {selectedWorkbook && (
        <div
          className="pvs-modal-backdrop"
          onClick={() => setSelectedWorkbook(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="pvs-modal-inner"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="pvs-modal-close"
              onClick={() => setSelectedWorkbook(null)}
              aria-label="Close preview"
            >
              ✕
            </button>
            <div>
              <span className="pvs-eyebrow" style={{ marginBottom: '0.35rem' }}>
                {selectedWorkbook.badge}
              </span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#2b2118', margin: '0 0 0.25rem' }}>
                {selectedWorkbook.title}
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0 }}>
                {selectedWorkbook.description}
              </p>
            </div>
            <img
              src={selectedWorkbook.imageSrc}
              alt={selectedWorkbook.title}
              className="pvs-modal-img"
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.65rem' }}>
              <button
                type="button"
                onClick={() => setSelectedWorkbook(null)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '999px',
                  border: '1px solid #cbd5e1',
                  background: '#f8fafc',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                }}
              >
                Close
              </button>
              {onOpenResources && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedWorkbook(null);
                    onOpenResources();
                  }}
                  className="pvs-cta-btn"
                  style={{ padding: '0.5rem 1.15rem', fontSize: '0.85rem' }}
                >
                  Open Study Vault ➔
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PracticeVaultShowcase;
