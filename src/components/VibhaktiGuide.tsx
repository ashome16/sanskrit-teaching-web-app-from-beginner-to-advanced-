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

type TabKey = 'cases' | 'trick-table' | 'sentences' | 'drill';

interface DrillQuestion {
  prompt: string;
  englishMeaning: string;
  options: { label: string; caseNum: number }[];
  correctCaseNum: number;
  explanation: string;
}

const DRILL_QUESTIONS: DrillQuestion[] = [
  {
    prompt: 'बालकः पठति।',
    englishMeaning: 'The boy reads.',
    options: [
      { label: 'प्रथमा विभक्ति (Nominative / Subject)', caseNum: 1 },
      { label: 'द्वितीया विभक्ति (Accusative / Object)', caseNum: 2 },
      { label: 'तृतीया विभक्ति (Instrumental / Means)', caseNum: 3 },
      { label: 'षष्ठी विभक्ति (Genitive / Possession)', caseNum: 6 },
    ],
    correctCaseNum: 1,
    explanation: 'बालकः is the कर्ता (Kartā / Subject) performing the action of reading (पठति), requiring प्रथमा विभक्ति.',
  },
  {
    prompt: 'जनकः बालकम् पश्यति।',
    englishMeaning: 'Father sees the boy.',
    options: [
      { label: 'प्रथमा विभक्ति (Nominative / Subject)', caseNum: 1 },
      { label: 'द्वितीया विभक्ति (Accusative / Direct Object)', caseNum: 2 },
      { label: 'चतुर्थी विभक्ति (Dative / Recipient)', caseNum: 4 },
      { label: 'सप्तमी विभक्ति (Locative / Location)', caseNum: 7 },
    ],
    correctCaseNum: 2,
    explanation: 'बालकम् is the कर्मन् (Karman / Direct Object) being seen by the father, ending in -म् (-am).',
  },
  {
    prompt: 'शिक्षकः बालकेन सह गच्छति।',
    englishMeaning: 'The teacher goes with the boy.',
    options: [
      { label: 'द्वितीया विभक्ति (Accusative / Object)', caseNum: 2 },
      { label: 'तृतीया विभक्ति (Instrumental / Companion)', caseNum: 3 },
      { label: 'पञ्चमी विभक्ति (Ablative / Separation)', caseNum: 5 },
      { label: 'षष्ठी विभक्ति (Genitive / Possession)', caseNum: 6 },
    ],
    correctCaseNum: 3,
    explanation: 'बालकेन denotes accompaniment with "सह" (सहयोगे तृतीया) with suffix -एण (-ena).',
  },
  {
    prompt: 'माता बालकाय फलम् ददाति।',
    englishMeaning: 'Mother gives a fruit for/to the boy.',
    options: [
      { label: 'तृतीया विभक्ति (Instrumental / Means)', caseNum: 3 },
      { label: 'चतुर्थी विभक्ति (Dative / Recipient)', caseNum: 4 },
      { label: 'पञ्चमी विभक्ति (Ablative / Origin)', caseNum: 5 },
      { label: 'सप्तमी विभक्ति (Locative / Location)', caseNum: 7 },
    ],
    correctCaseNum: 4,
    explanation: 'बालकाय represents सम्प्रदानम् (Recipient / to/for) in connection with the gift (दा धातु), ending in -ाय (-āya).',
  },
  {
    prompt: 'कन्दुकः बालकात् पतति।',
    englishMeaning: 'The ball falls from the boy.',
    options: [
      { label: 'चतुर्थी विभक्ति (Dative / Purpose)', caseNum: 4 },
      { label: 'पञ्चमी विभक्ति (Ablative / Separation)', caseNum: 5 },
      { label: 'षष्ठी विभक्ति (Genitive / Possession)', caseNum: 6 },
      { label: 'सम्बोधन विभक्ति (Vocative / Calling)', caseNum: 8 },
    ],
    correctCaseNum: 5,
    explanation: 'बालकात् denotes अपादानम् (Separation / moving away from origin: "from"), ending in -आत् (-āt).',
  },
  {
    prompt: 'एतत् बालकस्य पुस्तकम्।',
    englishMeaning: "This is the boy's book.",
    options: [
      { label: 'द्वितीया विभक्ति (Accusative / Object)', caseNum: 2 },
      { label: 'पञ्चमी विभक्ति (Ablative / Separation)', caseNum: 5 },
      { label: 'षष्ठी विभक्ति (Genitive / Possession "of" or "\'s")', caseNum: 6 },
      { label: 'सप्तमी विभक्ति (Locative / In/On)', caseNum: 7 },
    ],
    correctCaseNum: 6,
    explanation: "बालकस्य denotes सम्बन्धः (Possession / 'of' or 's), linking the book to the boy with suffix -स्य (-asya).",
  },
];

const VibhaktiGuide: React.FC<VibhaktiGuideProps> = ({
  onGoBack,
  onOpenWorksheets,
  onOpenQuiz,
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>('cases');
  const [selectedCaseNum, setSelectedCaseNum] = useState<number | null>(1);

  // Drill State
  const [drillIndex, setDrillIndex] = useState<number>(0);
  const [selectedOptionNum, setSelectedOptionNum] = useState<number | null>(null);
  const [drillIsChecked, setDrillIsChecked] = useState<boolean>(false);
  const [drillScore, setDrillScore] = useState<number>(0);
  const [drillCompleted, setDrillCompleted] = useState<boolean>(false);

  const currentDrillQ = DRILL_QUESTIONS[drillIndex];

  const handleDrillSelect = (caseNum: number) => {
    if (drillIsChecked) return;
    setSelectedOptionNum(caseNum);
    setDrillIsChecked(true);
    if (caseNum === currentDrillQ.correctCaseNum) {
      setDrillScore((s) => s + 1);
    }
  };

  const handleNextDrill = () => {
    if (drillIndex < DRILL_QUESTIONS.length - 1) {
      setDrillIndex((i) => i + 1);
      setSelectedOptionNum(null);
      setDrillIsChecked(false);
    } else {
      setDrillCompleted(true);
    }
  };

  const resetDrill = () => {
    setDrillIndex(0);
    setSelectedOptionNum(null);
    setDrillIsChecked(false);
    setDrillScore(0);
    setDrillCompleted(false);
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
          In Sanskrit, instead of separate words, we modify the noun ending directly.
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
              Word order is rigid and depends on positional hierarchy.
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
              Words can be placed anywhere in the sentence without losing meaning!
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

        {/* Navigation Tabs */}
        <nav className="vi-tabs" aria-label="Vibhakti Guide Tabs">
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
          <button
            type="button"
            className={`vi-tab-btn ${activeTab === 'drill' ? 'active' : ''}`}
            onClick={() => setActiveTab('drill')}
          >
            🎮 Case Practice Drill
          </button>
        </nav>
      </header>

      {/* Tab 1: The 8 Cases Detailed Exploration */}
      {activeTab === 'cases' && (
        <section aria-label="Cases Detailed Breakdown">
          {/* Case Selector Pills */}
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

          {/* Render Case Cards */}
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

                {/* Key Metrics Grid */}
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

                {/* Sentence Spotlight */}
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

                {/* Grammatical Explanation */}
                <div className="vi-explanation-text">
                  💡 <strong>Grammatical Breakdown:</strong> {c.explanation}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Tab 2: Quick Memory Trick Table */}
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

      {/* Tab 3: Complete Sentences View */}
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

      {/* Tab 4: Interactive Practice Drill */}
      {activeTab === 'drill' && (
        <section className="vi-drill-section" aria-label="Vibhakti Practice Drill">
          {!drillCompleted ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', color: '#6b7280', fontSize: '0.9rem' }}>
                <span>Question {drillIndex + 1} of {DRILL_QUESTIONS.length}</span>
                <span>Score: <strong style={{ color: '#059669' }}>{drillScore}</strong> / {DRILL_QUESTIONS.length}</span>
              </div>

              <div className="vi-drill-prompt-box">
                <h3 className="vi-drill-question">"{currentDrillQ.prompt}"</h3>
                <p className="vi-drill-hint">Meaning: <em>{currentDrillQ.englishMeaning}</em></p>
                <div style={{ marginTop: '0.75rem' }}>
                  <button
                    type="button"
                    className="vi-audio-btn"
                    onClick={() => playPronunciation(currentDrillQ.prompt)}
                  >
                    🔊 Listen to Sentence
                  </button>
                </div>
              </div>

              <p style={{ fontWeight: 700, color: '#374151', marginBottom: '0.75rem', fontSize: '0.95rem' }}>
                Which Vibhakti (case) does the noun form represent?
              </p>

              <div className="vi-drill-options">
                {currentDrillQ.options.map((opt) => {
                  let btnClass = 'vi-drill-opt-btn';
                  if (drillIsChecked) {
                    if (opt.caseNum === currentDrillQ.correctCaseNum) {
                      btnClass += ' correct';
                    } else if (opt.caseNum === selectedOptionNum) {
                      btnClass += ' wrong';
                    }
                  }
                  return (
                    <button
                      key={opt.caseNum}
                      type="button"
                      className={btnClass}
                      onClick={() => handleDrillSelect(opt.caseNum)}
                      disabled={drillIsChecked}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>

              {drillIsChecked && (
                <div>
                  <div
                    className={`vi-drill-feedback ${
                      selectedOptionNum === currentDrillQ.correctCaseNum ? 'correct' : 'wrong'
                    }`}
                  >
                    <strong>
                      {selectedOptionNum === currentDrillQ.correctCaseNum ? '🎉 Correct!' : '❌ Not quite!'}
                    </strong>{' '}
                    {currentDrillQ.explanation}
                  </div>
                  <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                    <button
                      type="button"
                      className="vi-footer-btn quiz"
                      onClick={handleNextDrill}
                    >
                      {drillIndex < DRILL_QUESTIONS.length - 1 ? 'Next Question ➡️' : 'See Results 🏆'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>🏆</div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#111827', margin: '0 0 0.5rem' }}>
                Drill Completed!
              </h2>
              <p style={{ fontSize: '1.1rem', color: '#4b5563', marginBottom: '1.5rem' }}>
                You scored <strong>{drillScore}</strong> out of <strong>{DRILL_QUESTIONS.length}</strong> ({Math.round((drillScore / DRILL_QUESTIONS.length) * 100)}%)
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="vi-footer-btn back"
                  onClick={resetDrill}
                >
                  🔄 Try Again
                </button>
                {onOpenQuiz && (
                  <button
                    type="button"
                    className="vi-footer-btn quiz"
                    onClick={onOpenQuiz}
                  >
                    🎯 Take 10-Question Master Quiz ▶
                  </button>
                )}
              </div>
            </div>
          )}
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
