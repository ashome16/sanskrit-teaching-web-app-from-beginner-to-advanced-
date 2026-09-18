import React, { useState } from 'react';
import {
  BALAKA_VIBHAKTI_DATA,
  VIBHAKTI_MEMORY_TRICK_TABLE,
} from '../data/vibhakti';
import { playPronunciation } from '../utils/pronunciation';
import '../styles/vibhakti-interactive.css';

interface VibhaktiGuideProps {
  onGoBack?: () => void;
  onOpenWorksheets?: () => void;
  onOpenQuiz?: () => void;
}

type TabKey = 'cases' | 'trick-table' | 'sentences' | 'interactive-view';

interface InteractiveVibhaktiQuestion {
  id: number;
  topic: string;
  question: string;
  options: { key: 'A' | 'B' | 'C' | 'D'; label: string }[];
  correctKey: 'A' | 'B' | 'C' | 'D';
  correctLabel: string;
  explanation: string;
  audioTerm?: string;
}

const VIBHAKTI_10_QUESTIONS: InteractiveVibhaktiQuestion[] = [
  {
    "id": 1,
    "topic": "प्रथमा विभक्ति (Nominative / Subject)",
    "question": "In the simple Sanskrit sentence \"बालकः पठति\" (Balakah pathati - The boy reads), which word is in the Prathama Vibhakti (Nominative Case) representing the subject performing the action?",
    "options": [
      {
        "key": "A",
        "label": "बालकः (Balakah)"
      },
      {
        "key": "B",
        "label": "पठति (Pathati)"
      },
      {
        "key": "C",
        "label": "बालं (Balam)"
      },
      {
        "key": "D",
        "label": "बाले (Bale)"
      }
    ],
    "correctKey": "A",
    "correctLabel": "A) बालकः (Balakah)",
    "explanation": "Correct! 'बालकः' is the subject of the sentence performing the action of reading, which requires the Prathama Vibhakti singular form.",
    "audioTerm": "बालकः पठति"
  },
  {
    "id": 2,
    "topic": "द्वितीया विभक्ति (Accusative / Object)",
    "question": "Which singular form of the masculine noun 'राम' (Rama) represents the Dvitiya Vibhakti (Accusative / Object case)?",
    "options": [
      {
        "key": "A",
        "label": "रामस्य (Ramasya)"
      },
      {
        "key": "B",
        "label": "रामाय (Ramaya)"
      },
      {
        "key": "C",
        "label": "रामम् (Ramam)"
      },
      {
        "key": "D",
        "label": "रामः (Ramah)"
      }
    ],
    "correctKey": "C",
    "correctLabel": "C) रामम् (Ramam)",
    "explanation": "Correct! 'रामम्' is the singular object form (Dvitiya Vibhakti) indicating the target of an action.",
    "audioTerm": "रामम्"
  },
  {
    "id": 3,
    "topic": "तृतीया विभक्ति (Instrumental / Means)",
    "question": "What is the meaning or function of the Tritiya Vibhakti (Instrumental Case) singular form 'रामेण' (Ramena)?",
    "options": [
      {
        "key": "A",
        "label": "From Rama"
      },
      {
        "key": "B",
        "label": "By Rama / With Rama"
      },
      {
        "key": "C",
        "label": "Of Rama"
      },
      {
        "key": "D",
        "label": "For Rama"
      }
    ],
    "correctKey": "B",
    "correctLabel": "B) By Rama / With Rama",
    "explanation": "Correct! The instrumental case ('रामेण') shows the instrument or agent by or with whom an action is performed.",
    "audioTerm": "रामेण"
  },
  {
    "id": 4,
    "topic": "चतुर्थी विभक्ति (Dative / Purpose & Recipient)",
    "question": "If you want to say \"giving a fruit for the boy\" or \"to the boy\" in Sanskrit, which Chaturthi Vibhakti singular form of 'बालक' (Balaka) should you use?",
    "options": [
      {
        "key": "A",
        "label": "बालकात् (Balakat)"
      },
      {
        "key": "B",
        "label": "बालके (Balake)"
      },
      {
        "key": "C",
        "label": "बालकस्य (Balakasya)"
      },
      {
        "key": "D",
        "label": "बालकाय (Balakaya)"
      }
    ],
    "correctKey": "D",
    "correctLabel": "D) बालकाय (Balakaya)",
    "explanation": "Correct! 'बालकाय' is the dative case form (Chaturthi Vibhakti) used for recipients or purposes, ending in '-aya'.",
    "audioTerm": "बालकाय"
  },
  {
    "id": 5,
    "topic": "पञ्चमी विभक्ति (Ablative / Separation)",
    "question": "Which form of 'राम' (Rama) represents the Panchami Vibhakti (Ablative Case) indicating separation or \"from Rama\"?",
    "options": [
      {
        "key": "A",
        "label": "रामात् (Ramat)"
      },
      {
        "key": "B",
        "label": "रामे (Rame)"
      },
      {
        "key": "C",
        "label": "रामस्य (Ramasya)"
      },
      {
        "key": "D",
        "label": "रामाय (Ramaya)"
      }
    ],
    "correctKey": "A",
    "correctLabel": "A) रामात् (Ramat)",
    "explanation": "Correct! 'रामात्' ends with a strong '-त्' sound, signifying the ablative case denoting origin or separation (\"from\").",
    "audioTerm": "रामात्"
  },
  {
    "id": 6,
    "topic": "षष्ठी विभक्ति (Genitive / Possession)",
    "question": "What does the Shashti Vibhakti (Genitive Case) singular form 'बालकस्य' (Balakasya) mean?",
    "options": [
      {
        "key": "A",
        "label": "O boy!"
      },
      {
        "key": "B",
        "label": "To the boy"
      },
      {
        "key": "C",
        "label": "Of the boy / Boy's"
      },
      {
        "key": "D",
        "label": "In the boy"
      }
    ],
    "correctKey": "C",
    "correctLabel": "C) Of the boy / Boy's",
    "explanation": "Correct! The genitive case ('बालकस्य') indicates possession or a relationship like \"of\" or \"'s\".",
    "audioTerm": "बालकस्य"
  },
  {
    "id": 7,
    "topic": "सप्तमी विभक्ति (Locative / Location)",
    "question": "Where an action takes place (in, on, or at) uses the Saptami Vibhakti. What is the singular Saptami form for the noun 'राम' (Rama)?",
    "options": [
      {
        "key": "A",
        "label": "रामम् (Ramam)"
      },
      {
        "key": "B",
        "label": "रामे (Rame)"
      },
      {
        "key": "C",
        "label": "रामस्य (Ramasya)"
      },
      {
        "key": "D",
        "label": "रामात् (Ramat)"
      }
    ],
    "correctKey": "B",
    "correctLabel": "B) रामे (Rame)",
    "explanation": "Correct! 'रामे' is the locative singular form indicating location (\"in/on Rama\").",
    "audioTerm": "रामे"
  },
  {
    "id": 8,
    "topic": "सम्बोधन विभक्ति (Vocative / Calling)",
    "question": "Which of the following best describes the purpose of the Sambodhana (Vocative Case) in Sanskrit?",
    "options": [
      {
        "key": "A",
        "label": "It indicates the direct object receiving an action."
      },
      {
        "key": "B",
        "label": "It indicates possession or relationship (like \"Rama's\")."
      },
      {
        "key": "C",
        "label": "It indicates the location or base where an action occurs."
      },
      {
        "key": "D",
        "label": "It is used to call or address a person directly (e.g., O Rama!)."
      }
    ],
    "correctKey": "D",
    "correctLabel": "D) It is used to call or address a person directly (e.g., O Rama!).",
    "explanation": "Correct! Sambodhana is treated as the vocative expression used to call out or draw someone's attention directly.",
    "audioTerm": "हे बालक"
  },
  {
    "id": 9,
    "topic": "Case Suffix Identification",
    "question": "In the word 'बालकात्' (Balakat), which case suffix indicates movement or separation \"from\"?",
    "options": [
      {
        "key": "A",
        "label": "Panchami Vibhakti (Ablative)"
      },
      {
        "key": "B",
        "label": "Tritiya Vibhakti (Instrumental)"
      },
      {
        "key": "C",
        "label": "Saptami Vibhakti (Locative)"
      },
      {
        "key": "D",
        "label": "Prathama Vibhakti (Nominative)"
      }
    ],
    "correctKey": "A",
    "correctLabel": "A) Panchami Vibhakti (Ablative)",
    "explanation": "Correct! 'बालकात्' belongs to the Panchami Vibhakti, denoting source or separation.",
    "audioTerm": "बालकात्"
  },
  {
    "id": 10,
    "topic": "Case Meaning Match",
    "question": "Match the meaning \"in/on Rama\" with the correct Saptami Vibhakti singular form:",
    "options": [
      {
        "key": "A",
        "label": "रामस्य (Ramasya)"
      },
      {
        "key": "B",
        "label": "रामम् (Ramam)"
      },
      {
        "key": "C",
        "label": "रामे (Rame)"
      },
      {
        "key": "D",
        "label": "रामात् (Ramat)"
      }
    ],
    "correctKey": "C",
    "correctLabel": "C) रामे (Rame)",
    "explanation": "Correct! 'रामे' is the correct locative form representing \"in or on Rama\".",
    "audioTerm": "रामे"
  }
];

const VibhaktiGuide: React.FC<VibhaktiGuideProps> = ({
  onGoBack,
  onOpenWorksheets,
  onOpenQuiz,
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>('interactive-view');
  const [selectedCaseNum, setSelectedCaseNum] = useState<number | null>(null);

  // Interactive View sub-mode: 'step' (Question by question) or 'sheet' (All 10 questions)
  const [interactiveMode, setInteractiveMode] = useState<'step' | 'sheet'>('step');

  // Step Mode State
  const [qIndex, setQIndex] = useState<number>(0);
  const [stepAnswers, setStepAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [stepChecked, setStepChecked] = useState<boolean>(false);
  const [stepCompleted, setStepCompleted] = useState<boolean>(false);

  // Sheet Mode State
  const [sheetAnswers, setSheetAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [sheetSubmitted, setSheetSubmitted] = useState<boolean>(false);
  const [showAnswerKey, setShowAnswerKey] = useState<boolean>(false);

  const currentQ = VIBHAKTI_10_QUESTIONS[qIndex];
  const stepScore = Object.entries(stepAnswers).filter(
    ([id, ans]) => ans === VIBHAKTI_10_QUESTIONS[Number(id) - 1].correctKey
  ).length;

  const sheetScore = Object.entries(sheetAnswers).filter(
    ([id, ans]) => ans === VIBHAKTI_10_QUESTIONS[Number(id) - 1].correctKey
  ).length;

  const handleStepSelect = (key: 'A' | 'B' | 'C' | 'D') => {
    if (stepChecked) return;
    setStepAnswers((prev) => ({ ...prev, [currentQ.id]: key }));
    setStepChecked(true);
  };

  const handleStepNext = () => {
    if (qIndex < VIBHAKTI_10_QUESTIONS.length - 1) {
      setQIndex((i) => i + 1);
      setStepChecked(false);
    } else {
      setStepCompleted(true);
    }
  };

  const resetStepQuiz = () => {
    setQIndex(0);
    setStepAnswers({});
    setStepChecked(false);
    setStepCompleted(false);
  };

  const handleSheetSelect = (qId: number, key: 'A' | 'B' | 'C' | 'D') => {
    if (sheetSubmitted) return;
    setSheetAnswers((prev) => ({ ...prev, [qId]: key }));
  };

  const displayedCases =
    selectedCaseNum === null
      ? BALAKA_VIBHAKTI_DATA
      : BALAKA_VIBHAKTI_DATA.filter((item) => item.number === selectedCaseNum);

  return (
    <div className="vi-container">
      {/* Header & Concept Introduction */}
      <header className="vi-header">
        <div className="vi-badge">🏛️ व्याकरण-मूलम् · SANSKRIT NOUN CASES</div>
        <h1 className="vi-title">विभक्ति-परिचयः · Understanding Vibhaktis</h1>
        <p className="vi-subtitle">
          In English, prepositions like <em>to, by, for, from, of, in</em> connect a noun to a verb.
          In Sanskrit, instead of separate words, we change the ending of the noun itself.
          These 8 case endings are called <strong>विभक्ति (Vibhakti)</strong>, and each maps to a specific sentence role known as a <strong>कारक (Kāraka)</strong>.
        </p>

        {/* Concept Comparison Grid */}
        <div className="vi-concept-grid">
          <div className="vi-concept-card english">
            <div className="vi-concept-header">
              <span>🇬🇧</span>
              <span>English Preposition System</span>
            </div>
            <div className="vi-concept-body">
              Uses separate helper words placed before nouns:
              <br />
              <em>"The boy goes <strong>to</strong> the school."</em>
              <br />
              <em>"A gift <strong>for</strong> the boy."</em>
              <br />
              Word order is rigid and depends on positional structure.
            </div>
          </div>

          <div className="vi-concept-card sanskrit">
            <div className="vi-concept-header">
              <span>🕉️</span>
              <span>Sanskrit Vibhakti System</span>
            </div>
            <div className="vi-concept-body">
              Changes the ending of the noun stem itself:
              <br />
              <em>"बालकः" ➡️ Subject (The boy)</em>
              <br />
              <em>"बालकाय" ➡️ Recipient (<strong>For</strong> the boy)</em>
              <br />
              Words can be moved freely in a sentence without changing the meaning!
            </div>
          </div>
        </div>

        {/* Paradigm Word Callout */}
        <div className="vi-paradigm-callout">
          <span>🌟 <strong>Standard Paradigm Noun:</strong></span>
          <span><strong>बालक (Bālaka - Boy)</strong> — Masculine noun ending in short "a" (-अकारान्त पुंलिङ्ग).</span>
          <button
            type="button"
            className="vi-audio-btn"
            onClick={() => playPronunciation('बालक')}
            title="Listen to pronunciation"
          >
            🔊 बालक
          </button>
        </div>

        {/* Main Navigation Tabs */}
        <nav className="vi-tabs" aria-label="Vibhakti Guide Tabs">
          <button
            type="button"
            className={`vi-tab-btn ${activeTab === 'interactive-view' ? 'active' : ''}`}
            onClick={() => setActiveTab('interactive-view')}
          >
            🎯 Interactive View (10 Qs Master Test)
          </button>
          <button
            type="button"
            className={`vi-tab-btn ${activeTab === 'cases' ? 'active' : ''}`}
            onClick={() => setActiveTab('cases')}
          >
            📖 The 8 Cases (अष्ट विभक्तयः)
          </button>
          <button
            type="button"
            className={`vi-tab-btn ${activeTab === 'trick-table' ? 'active' : ''}`}
            onClick={() => setActiveTab('trick-table')}
          >
            💡 Quick Memory Trick Table
          </button>
          <button
            type="button"
            className={`vi-tab-btn ${activeTab === 'sentences' ? 'active' : ''}`}
            onClick={() => setActiveTab('sentences')}
          >
            🔍 All Sentences & Breakdown
          </button>
        </nav>
      </header>

      {/* =========================================================================
          TAB: INTERACTIVE VIEW (10 QUESTIONS MASTER TEST)
         ========================================================================= */}
      {activeTab === 'interactive-view' && (
        <section aria-label="Interactive View - Vibhakti Basics Master Test">
          {/* Sub-mode switcher */}
          <div className="vi-sub-toggle-bar">
            <span style={{ fontWeight: 700, color: '#374151', fontSize: '0.92rem' }}>
              View Mode:
            </span>
            <button
              type="button"
              className={`vi-sub-toggle-btn ${interactiveMode === 'step' ? 'active' : ''}`}
              onClick={() => setInteractiveMode('step')}
            >
              ⚡ Step-by-Step Practice (1 by 1)
            </button>
            <button
              type="button"
              className={`vi-sub-toggle-btn ${interactiveMode === 'sheet' ? 'active' : ''}`}
              onClick={() => setInteractiveMode('sheet')}
            >
              📄 Full 10-Question Test Sheet
            </button>
            <button
              type="button"
              className="vi-sub-toggle-btn"
              style={{ background: showAnswerKey ? '#fef3c7' : '#ffffff', borderColor: '#f59e0b', color: '#b45309' }}
              onClick={() => setShowAnswerKey((k) => !k)}
            >
              {showAnswerKey ? '🙈 Hide Answer Key' : '🔑 Show Answer Key & Explanations'}
            </button>
          </div>

          {/* Answer Key Dropdown / Drawer */}
          {showAnswerKey && (
            <div style={{ background: '#fffbeb', border: '1.5px solid #fde68a', borderRadius: '12px', padding: '1.25rem 1.5rem', marginBottom: '1.5rem', boxShadow: '0 4px 12px rgba(217, 119, 6, 0.08)' }}>
              <h3 style={{ margin: '0 0 0.85rem', color: '#92400e', fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>🔑</span>
                <span>Answer Key and Explanations (10 Questions)</span>
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.85rem' }}>
                {VIBHAKTI_10_QUESTIONS.map((q) => (
                  <div key={q.id} style={{ background: '#ffffff', borderRadius: '8px', padding: '0.75rem 1rem', border: '1px solid #fcd34d' }}>
                    <div style={{ fontWeight: 800, color: '#047857', fontSize: '0.95rem', marginBottom: '0.25rem' }}>
                      {q.id}. {q.correctLabel}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#4b5563', lineHeight: 1.45 }}>
                      <strong>Explanation:</strong> {q.explanation}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sub-view A: Step-by-Step Practice */}
          {interactiveMode === 'step' && (
            <div style={{ maxWidth: '820px', margin: '0 auto' }}>
              {!stepCompleted ? (
                <div>
                  {/* Progress Bar */}
                  <div className="vi-progress-wrapper">
                    <div className="vi-progress-header">
                      <span>Question {qIndex + 1} of {VIBHAKTI_10_QUESTIONS.length}</span>
                      <span>Score: <strong style={{ color: '#059669' }}>{stepScore}</strong> / {qIndex + (stepChecked ? 1 : 0)}</span>
                    </div>
                    <div className="vi-progress-track">
                      <div
                        className="vi-progress-fill"
                        style={{ width: `${((qIndex + 1) / VIBHAKTI_10_QUESTIONS.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Question Box */}
                  <div className="vi-q-box">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span className="vi-q-badge">{currentQ.topic}</span>
                      {currentQ.audioTerm && (
                        <button
                          type="button"
                          className="vi-audio-btn"
                          onClick={() => playPronunciation(currentQ.audioTerm!)}
                          title="Listen to pronunciation"
                        >
                          🔊 Listen: {currentQ.audioTerm}
                        </button>
                      )}
                    </div>

                    <h2 className="vi-q-title">
                      {qIndex + 1}. {currentQ.question}
                    </h2>

                    {/* 4 Options Grid */}
                    <div className="vi-q-options-grid">
                      {currentQ.options.map((opt) => {
                        let btnClass = 'vi-q-opt-btn';
                        const userChoice = stepAnswers[currentQ.id];
                        if (stepChecked) {
                          if (opt.key === currentQ.correctKey) {
                            btnClass += ' correct';
                          } else if (opt.key === userChoice) {
                            btnClass += ' wrong';
                          }
                        }
                        return (
                          <button
                            key={opt.key}
                            type="button"
                            className={btnClass}
                            onClick={() => handleStepSelect(opt.key)}
                            disabled={stepChecked}
                          >
                            <span className="vi-q-opt-key">{opt.key}</span>
                            <span>{opt.label}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Feedback & Next Button */}
                    {stepChecked && (
                      <div>
                        <div
                          className={`vi-drill-feedback ${
                            stepAnswers[currentQ.id] === currentQ.correctKey ? 'correct' : 'wrong'
                          }`}
                        >
                          <div style={{ fontWeight: 800, marginBottom: '0.35rem', fontSize: '1.05rem' }}>
                            {stepAnswers[currentQ.id] === currentQ.correctKey
                              ? '🎉 Correct!'
                              : `❌ Not quite! Correct Answer: ${currentQ.correctLabel}`}
                          </div>
                          <div>{currentQ.explanation}</div>
                        </div>

                        <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
                          <button
                            type="button"
                            className="vi-footer-btn quiz"
                            onClick={handleStepNext}
                          >
                            {qIndex < VIBHAKTI_10_QUESTIONS.length - 1 ? 'Next Question ➡️' : 'See Final Score 🏆'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* Step Mode Completed Results Screen */
                <div style={{ background: '#ffffff', border: '1.5px solid #e5e7eb', borderRadius: '16px', padding: '2.5rem 1.5rem', textAlign: 'center', boxShadow: '0 4px 18px rgba(0,0,0,0.05)' }}>
                  <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>🏆</div>
                  <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', margin: '0 0 0.5rem' }}>
                    Master Test Completed!
                  </h2>
                  <p style={{ fontSize: '1.15rem', color: '#4b5563', marginBottom: '1.5rem' }}>
                    You scored <strong>{stepScore}</strong> out of <strong>{VIBHAKTI_10_QUESTIONS.length}</strong> ({Math.round((stepScore / VIBHAKTI_10_QUESTIONS.length) * 100)}%)
                  </p>

                  <div style={{ display: 'inline-block', background: '#ecfdf5', color: '#065f46', border: '1px solid #a7f3d0', padding: '0.5rem 1.25rem', borderRadius: '999px', fontWeight: 700, fontSize: '0.95rem', marginBottom: '1.75rem' }}>
                    {stepScore >= 9 ? '🌟 Outstanding! You have mastered Sanskrit Vibhakti basics!' : stepScore >= 7 ? '👍 Great job! Review the trick table to secure 100%.' : '📚 Good practice! Review the 8 cases and try again.'}
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      className="vi-footer-btn back"
                      onClick={resetStepQuiz}
                    >
                      🔄 Retake Interactive Test
                    </button>
                    {onOpenWorksheets && (
                      <button
                        type="button"
                        className="vi-footer-btn worksheet"
                        onClick={onOpenWorksheets}
                      >
                        📑 Open Vibhakti Worksheet (PDF) ▶
                      </button>
                    )}
                    {onOpenQuiz && (
                      <button
                        type="button"
                        className="vi-footer-btn quiz"
                        onClick={onOpenQuiz}
                      >
                        🎯 Practice in Main Quiz Section ▶
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Sub-view B: Full 10-Question Test Sheet */}
          {interactiveMode === 'sheet' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ fontWeight: 700, color: '#4b5563', fontSize: '0.95rem' }}>
                  Answer all 10 questions below, then click "Submit & Check Answers":
                </span>
                {sheetSubmitted && (
                  <span style={{ fontWeight: 800, color: '#059669', fontSize: '1.1rem' }}>
                    Total Score: {sheetScore} / {VIBHAKTI_10_QUESTIONS.length} ({Math.round((sheetScore / VIBHAKTI_10_QUESTIONS.length) * 100)}%)
                  </span>
                )}
              </div>

              <div className="vi-sheet-questions-list">
                {VIBHAKTI_10_QUESTIONS.map((q) => {
                  const userChoice = sheetAnswers[q.id];
                  const isCorrect = userChoice === q.correctKey;
                  return (
                    <div key={q.id} className="vi-sheet-q-card">
                      <div className="vi-sheet-q-header">
                        <span className="vi-sheet-q-num">{q.id}</span>
                        <span className="vi-q-badge">{q.topic}</span>
                        {q.audioTerm && (
                          <button
                            type="button"
                            className="vi-audio-btn"
                            onClick={() => playPronunciation(q.audioTerm!)}
                            title="Listen"
                          >
                            🔊
                          </button>
                        )}
                      </div>

                      <div className="vi-sheet-q-text">{q.question}</div>

                      <div className="vi-sheet-options">
                        {q.options.map((opt) => {
                          let labelClass = 'vi-sheet-opt-label';
                          if (userChoice === opt.key) labelClass += ' selected';
                          if (sheetSubmitted) {
                            if (opt.key === q.correctKey) {
                              labelClass += ' correct';
                            } else if (userChoice === opt.key) {
                              labelClass += ' wrong';
                            }
                          }
                          return (
                            <label key={opt.key} className={labelClass}>
                              <input
                                type="radio"
                                name={`sheet-q-${q.id}`}
                                value={opt.key}
                                checked={userChoice === opt.key}
                                onChange={() => handleSheetSelect(q.id, opt.key)}
                                disabled={sheetSubmitted}
                                style={{ accentColor: '#059669' }}
                              />
                              <strong style={{ minWidth: '1.2rem' }}>{opt.key})</strong>
                              <span>{opt.label}</span>
                            </label>
                          );
                        })}
                      </div>

                      {sheetSubmitted && (
                        <div className="vi-sheet-expl-box">
                          <div style={{ fontWeight: 800, color: isCorrect ? '#065f46' : '#991b1b', marginBottom: '0.25rem' }}>
                            {isCorrect ? '✅ Correct!' : `❌ Correct Answer: ${q.correctLabel}`}
                          </div>
                          <div>{q.explanation}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Submit / Reset Sheet Buttons */}
              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                {!sheetSubmitted ? (
                  <button
                    type="button"
                    className="vi-footer-btn quiz"
                    style={{ fontSize: '1.05rem', padding: '0.75rem 2rem' }}
                    onClick={() => setSheetSubmitted(true)}
                  >
                    ✅ Submit & Check Answers
                  </button>
                ) : (
                  <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      className="vi-footer-btn back"
                      onClick={() => {
                        setSheetAnswers({});
                        setSheetSubmitted(false);
                      }}
                    >
                      🔄 Reset Sheet
                    </button>
                    {onOpenWorksheets && (
                      <button
                        type="button"
                        className="vi-footer-btn worksheet"
                        onClick={onOpenWorksheets}
                      >
                        📑 Print Official PDF Worksheet ▶
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </section>
      )}

      {/* =========================================================================
          TAB: THE 8 CASES DETAILED VIEW
         ========================================================================= */}
      {activeTab === 'cases' && (
        <section aria-label="Cases Detailed Breakdown">
          <div className="vi-case-pills">
            <button
              type="button"
              className={`vi-case-pill-btn ${selectedCaseNum === null ? 'active' : ''}`}
              onClick={() => setSelectedCaseNum(null)}
            >
              👁️ View All 8 Cases
            </button>
            {BALAKA_VIBHAKTI_DATA.map((item) => (
              <button
                key={item.number}
                type="button"
                className={`vi-case-pill-btn ${selectedCaseNum === item.number ? 'active' : ''}`}
                onClick={() => setSelectedCaseNum(item.number)}
              >
                <span>{item.number}.</span>
                <span>{item.sanskrit.split(' ')[0]}</span>
                <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>({item.singularSuffixDeva})</span>
              </button>
            ))}
          </div>

          <div className="vi-cases-list">
            {displayedCases.map((c) => (
              <article key={c.number} className="vi-case-detail-card">
                <div className="vi-case-header-row">
                  <div className="vi-case-title-group">
                    <div className="vi-num-badge">{c.number}</div>
                    <div>
                      <div className="vi-case-main-title">{c.sanskrit} ({c.iast})</div>
                      <div className="vi-case-english-title">{c.caseName}</div>
                    </div>
                  </div>
                  <div className="vi-karaka-tag">
                    <span>🎯 Role:</span>
                    <strong>{c.roleSanskrit}</strong>
                  </div>
                </div>

                <div className="vi-metrics-grid">
                  <div className="vi-metric-box">
                    <div className="vi-metric-label">Role (कारक)</div>
                    <div className="vi-metric-val">{c.role}</div>
                  </div>
                  <div className="vi-metric-box">
                    <div className="vi-metric-label">English Indicator</div>
                    <div className="vi-metric-val">{c.englishIndicator}</div>
                  </div>
                  <div className="vi-metric-box">
                    <div className="vi-metric-label">Singular Suffix</div>
                    <div className="vi-metric-val">
                      <span className="vi-suffix-chip">{c.singularSuffixDeva}</span>
                      <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>({c.singularSuffixIast})</span>
                    </div>
                  </div>
                  <div className="vi-metric-box">
                    <div className="vi-metric-label">Inflected Word</div>
                    <div className="vi-metric-val">
                      <strong style={{ color: '#065f46', fontFamily: 'Georgia, serif' }}>{c.exampleWord}</strong>
                      <button
                        type="button"
                        className="vi-audio-btn"
                        onClick={() => playPronunciation(c.exampleWord)}
                        title="Listen to word"
                      >
                        🔊
                      </button>
                    </div>
                  </div>
                </div>

                <div className="vi-sentence-box">
                  <div className="vi-sentence-sanskrit">
                    <span>{c.sentence}</span>
                    <button
                      type="button"
                      className="vi-audio-btn"
                      onClick={() => playPronunciation(c.sentence)}
                      title="Listen to sentence"
                    >
                      🔊 Listen
                    </button>
                  </div>
                  <div className="vi-sentence-iast">{c.sentenceIast}</div>
                  <div className="vi-sentence-meaning">Meaning: <strong>{c.sentenceMeaning}</strong></div>
                </div>

                <div className="vi-explanation-text">
                  💡 <strong>Grammatical Breakdown:</strong> {c.explanation}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* =========================================================================
          TAB: QUICK MEMORY TRICK TABLE
         ========================================================================= */}
      {activeTab === 'trick-table' && (
        <section className="vi-table-section" aria-label="Memory Trick Table">
          <div className="vi-table-header-box">
            <h2 className="vi-table-title">
              <span>💡</span>
              <span>Quick Memory Trick Table (Masculine Singular)</span>
            </h2>
            <p className="vi-table-subtitle">
              Memorize the suffix sound sequence: <strong>-aḥ, -am, -ena, -āya, -āt, -asya, -e, He ... !</strong>
            </p>
          </div>

          <div className="vi-table-wrapper">
            <table className="vi-table">
              <thead>
                <tr>
                  <th>Vibhakti (Case)</th>
                  <th>English Indicator</th>
                  <th>Suffix Sound</th>
                  <th>Example Word</th>
                  <th>Example Sentence</th>
                  <th>Audio</th>
                </tr>
              </thead>
              <tbody>
                {VIBHAKTI_MEMORY_TRICK_TABLE.map((row) => (
                  <tr key={row.number}>
                    <td className="vi-table-case-cell">
                      <span>{row.caseName}</span>
                      <br />
                      <small style={{ color: '#6b7280' }}>({row.sanskritCase})</small>
                    </td>
                    <td>
                      <span style={{ fontWeight: 600, color: '#1f2937' }}>{row.englishIndicator}</span>
                    </td>
                    <td>
                      <span className="vi-table-suffix-badge">
                        {row.suffixDeva} ({row.suffixSound})
                      </span>
                    </td>
                    <td className="vi-table-word-cell">
                      <div>{row.exampleWord}</div>
                      <small style={{ color: '#4b5563', fontWeight: 500 }}>{row.exampleWordIast}</small>
                    </td>
                    <td style={{ color: '#374151' }}>{row.sentenceExample}</td>
                    <td>
                      <button
                        type="button"
                        className="vi-audio-btn"
                        onClick={() => playPronunciation(row.exampleWord)}
                        title={`Listen to ${row.exampleWord}`}
                      >
                        🔊
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1rem 1.25rem', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '0.92rem', color: '#334155', lineHeight: 1.6 }}>
            🔑 <strong>Memory Tip:</strong> Recite the row of suffixes rhythmically:
            <br />
            <code style={{ background: '#e2e8f0', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 700, color: '#0f172a' }}>
              ः (aḥ) ➡️ म् (am) ➡️ एण (ena) ➡️ ाय (āya) ➡️ आत् (āt) ➡️ स्य (asya) ➡️ ए (e) ➡️ हे (he)
            </code>
          </div>
        </section>
      )}

      {/* =========================================================================
          TAB: COMPLETE SENTENCES VIEW
         ========================================================================= */}
      {activeTab === 'sentences' && (
        <section aria-label="All Sentences & Breakdown">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
            {BALAKA_VIBHAKTI_DATA.map((item) => (
              <div
                key={item.number}
                style={{
                  background: '#ffffff',
                  border: '1.5px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '1.25rem 1.4rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.65rem',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 800, color: '#059669', fontSize: '0.92rem' }}>
                    Case {item.number}: {item.sanskrit}
                  </span>
                  <span style={{ background: '#f3f4f6', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, color: '#4b5563' }}>
                    {item.roleSanskrit}
                  </span>
                </div>

                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', fontFamily: 'Georgia, serif', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>{item.sentence}</span>
                  <button
                    type="button"
                    className="vi-audio-btn"
                    onClick={() => playPronunciation(item.sentence)}
                    title="Pronounce"
                  >
                    🔊
                  </button>
                </div>
                <div style={{ fontSize: '0.9rem', fontStyle: 'italic', color: '#059669' }}>
                  {item.sentenceIast}
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#374151' }}>
                  = {item.sentenceMeaning}
                </div>
                <div style={{ fontSize: '0.88rem', color: '#6b7280', marginTop: 'auto', paddingTop: '0.5rem', borderTop: '1px solid #f3f4f6' }}>
                  Focus: <strong style={{ color: '#065f46' }}>{item.exampleWord}</strong> ({item.wordMeaning})
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer Navigation CTAs */}
      <footer className="vi-footer-nav">
        {onOpenQuiz && (
          <button
            type="button"
            className="vi-footer-btn quiz"
            onClick={onOpenQuiz}
          >
            🎯 Play Vibhakti Basics Quiz (10 Qs) ▶
          </button>
        )}
        {onOpenWorksheets && (
          <button
            type="button"
            className="vi-footer-btn worksheet"
            onClick={onOpenWorksheets}
          >
            📑 Open Vibhakti Worksheet (PDF) ▶
          </button>
        )}
        {onGoBack && (
          <button
            type="button"
            className="vi-footer-btn back"
            onClick={onGoBack}
          >
            ← Back to Grammar Shelf
          </button>
        )}
      </footer>
    </div>
  );
};

export default VibhaktiGuide;
