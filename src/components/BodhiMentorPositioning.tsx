import React, { useState } from 'react';
import BodhiAvatar from './BodhiAvatar';
import {
  BODHI_PILLARS,
  BODHI_SCOPE_LIMITATIONS,
  BODHI_SAMPLE_INTERACTIONS,
} from '../data/bodhiData';
import { playPronunciation } from '../utils/pronunciation';
import '../styles/bodhi-positioning.css';

interface BodhiMentorPositioningProps {
  onOpenBodhi?: () => void;
  onOpenOnlineClasses?: () => void;
  onOpenVarnamala?: () => void;
  compact?: boolean;
}

type TabType = 'pillars' | 'scope' | 'samples' | 'safeguards';

export const BodhiMentorPositioning: React.FC<BodhiMentorPositioningProps> = ({
  onOpenBodhi,
  onOpenOnlineClasses,
  onOpenVarnamala,
  compact = false,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('pillars');
  const [selectedSampleId, setSelectedSampleId] = useState<string>(
    BODHI_SAMPLE_INTERACTIONS[0].id
  );
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const activeSample =
    BODHI_SAMPLE_INTERACTIONS.find((s) => s.id === selectedSampleId) ||
    BODHI_SAMPLE_INTERACTIONS[0];

  const handlePlaySampleAudio = (text?: string) => {
    if (!text) return;
    setIsPlayingAudio(true);
    playPronunciation(text);
    setTimeout(() => setIsPlayingAudio(false), 3000);
  };

  return (
    <section
      className={`bodhi-pos-section${compact ? ' bodhi-pos-section--compact' : ''}`}
      id="bodhi-mentor-positioning"
      aria-label="Bodhi AI Mentor: Positioning, Scope & Safeguards"
    >
      {/* 1. Header with Avatar & Core Identity */}
      <div className="bodhi-pos-header">
        <div className="bodhi-pos-header-left">
          <div className="bodhi-pos-avatar-wrap">
            <BodhiAvatar mood="scholar" size={compact ? 'md' : 'lg'} showHalo={true} />
            <button
              type="button"
              className="bodhi-pos-voice-btn"
              onClick={() => playPronunciation('नमस्ते! अहं बोधिः। भवतः संस्कृत-सखा।')}
              title="Hear Bodhi Speak"
            >
              🔊 Hear Bodhi
            </button>
          </div>
          <div className="bodhi-pos-title-wrap">
            <div className="bodhi-pos-badge-row">
              <span className="bodhi-pos-badge">🤖 AI Mentor Positioning</span>
              <span className="bodhi-pos-tier-pill">3-Tier Learning Model</span>
              <span className="bodhi-pos-badge" style={{ background: '#dcfce7', color: '#14532d', borderColor: '#86efac' }}>
                Zero Hallucination
              </span>
            </div>
            <h2 className="bodhi-pos-title">
              Who is Bodhi?
              <span className="bodhi-pos-title-sanskrit">
                बोधिः — कृत्रिमबुद्धि-सखा, पाठ्यमार्गदर्शकः, आचार्य-संवादश्च
              </span>
            </h2>
          </div>
        </div>
      </div>

      {/* Clear Architectural Definition */}
      <p className="bodhi-pos-lead">
        Bodhi is <strong>not an unconstrained generic chatbot</strong> that fabricates answers, nor is it an automated substitute for school teachers. 
        Bodhi is a <strong>hybrid Gurukul companion</strong> designed around three transparent tiers: an <strong>interactive guided lesson flow</strong> on every page, <strong>grounded AI retrieval</strong> locked to Pāṇinian grammar rules, and <strong>human Sanskrit Acharya escalation</strong> for subjective evaluations.
      </p>

      {/* 2. Interactive Navigation Tabs */}
      <nav className="bodhi-pos-tabs" role="tablist" aria-label="Bodhi Mentor Details">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'pillars'}
          className={`bodhi-pos-tab-btn ${activeTab === 'pillars' ? 'active' : ''}`}
          onClick={() => setActiveTab('pillars')}
        >
          🏛️ How Bodhi Works (3 Tiers)
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'scope'}
          className={`bodhi-pos-tab-btn ${activeTab === 'scope' ? 'active' : ''}`}
          onClick={() => setActiveTab('scope')}
        >
          ⚖️ Scope &amp; Limitations
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'samples'}
          className={`bodhi-pos-tab-btn ${activeTab === 'samples' ? 'active' : ''}`}
          onClick={() => setActiveTab('samples')}
        >
          💬 Sample Interactions ({BODHI_SAMPLE_INTERACTIONS.length})
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'safeguards'}
          className={`bodhi-pos-tab-btn ${activeTab === 'safeguards' ? 'active' : ''}`}
          onClick={() => setActiveTab('safeguards')}
        >
          🛡️ Educational Safeguards
        </button>
      </nav>

      {/* 3. Tab Contents */}

      {/* TAB 1: 3 PILLARS / TIERS */}
      {activeTab === 'pillars' && (
        <div className="bodhi-pillars-grid">
          {BODHI_PILLARS.map((pillar) => (
            <div key={pillar.id} className="bodhi-pillar-card">
              <div className="bodhi-pillar-card-top">
                <span className="bodhi-pillar-icon" aria-hidden="true">
                  {pillar.icon}
                </span>
                <span className="bodhi-pillar-badge">{pillar.badge}</span>
              </div>
              <h3 className="bodhi-pillar-title">{pillar.title}</h3>
              <span className="bodhi-pillar-sanskrit">{pillar.sanskritTitle}</span>
              <p className="bodhi-pillar-desc">{pillar.description}</p>
              <ul className="bodhi-pillar-points">
                {pillar.capabilities.map((cap, i) => (
                  <li key={i}>{cap}</li>
                ))}
              </ul>
              {pillar.humanTouch && (
                <div className="bodhi-pillar-human-touch">
                  💬 {pillar.humanTouch}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: SCOPE & LIMITATIONS */}
      {activeTab === 'scope' && (
        <div className="bodhi-scope-grid">
          <div className="bodhi-scope-col bodhi-scope-col--supported">
            <div className="bodhi-scope-col-header">
              <span style={{ fontSize: '1.4rem' }}>✅</span>
              <div>
                <h3>What Bodhi CAN Do (Scope)</h3>
                <small style={{ color: '#16a34a', fontWeight: 700 }}>
                  Grounded in Pāṇinian Shastras &amp; NCERT CBSE Curriculum
                </small>
              </div>
            </div>
            <div className="bodhi-scope-list">
              {BODHI_SCOPE_LIMITATIONS.supported.map((item, i) => (
                <div key={i} className="bodhi-scope-item">
                  <span className="bodhi-scope-item-icon" aria-hidden="true">✓</span>
                  <div className="bodhi-scope-item-body">
                    <strong>{item.feature}</strong>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bodhi-scope-col bodhi-scope-col--limitations">
            <div className="bodhi-scope-col-header">
              <span style={{ fontSize: '1.4rem' }}>❌</span>
              <div>
                <h3>What Bodhi CANNOT Do (Limitations)</h3>
                <small style={{ color: '#dc2626', fontWeight: 700 }}>
                  Transparent Boundaries &amp; Human Escalations
                </small>
              </div>
            </div>
            <div className="bodhi-scope-list">
              {BODHI_SCOPE_LIMITATIONS.limitations.map((item, i) => (
                <div key={i} className="bodhi-scope-item">
                  <span className="bodhi-scope-item-icon" aria-hidden="true" style={{ color: '#dc2626' }}>✗</span>
                  <div className="bodhi-scope-item-body">
                    <strong>{item.feature}</strong>
                    <p>{item.description}</p>
                    {item.alternative && (
                      <span className="bodhi-scope-alternative">
                        👉 Solution: {item.alternative}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SAMPLE INTERACTIONS */}
      {activeTab === 'samples' && (
        <div className="bodhi-samples-container">
          <div className="bodhi-sample-nav" role="tablist" aria-label="Sample Interaction Scenarios">
            {BODHI_SAMPLE_INTERACTIONS.map((sample) => (
              <button
                key={sample.id}
                type="button"
                className={`bodhi-sample-tab-btn ${sample.id === selectedSampleId ? 'active' : ''}`}
                onClick={() => setSelectedSampleId(sample.id)}
              >
                {sample.categoryBadge}
              </button>
            ))}
          </div>

          <div className="bodhi-sample-card">
            <div className="bodhi-sample-card-header">
              <div className="bodhi-sample-badges">
                <span className="bodhi-sample-cat-badge">{activeSample.category}</span>
                <span className="bodhi-sample-tier-badge">{activeSample.tier}</span>
              </div>
              {activeSample.sanskritAudio && (
                <button
                  type="button"
                  className="bodhi-sample-audio-btn"
                  onClick={() => handlePlaySampleAudio(activeSample.sanskritAudio)}
                  title="Hear pronunciation"
                >
                  {isPlayingAudio ? '🔊 Playing...' : '🔊 Hear Sanskrit Speech'}
                </button>
              )}
            </div>

            <div className="bodhi-sample-bubble-group">
              {/* Student Bubble */}
              <div className="bodhi-sample-bubble-student">
                <div className="bodhi-sample-bubble-label">
                  <span>🙋 Student Inquiry</span>
                </div>
                <p className="bodhi-sample-question-text">"{activeSample.studentQuestion}"</p>
                <div className="bodhi-sample-context">Context: {activeSample.studentContext}</div>
              </div>

              {/* Bodhi Bubble */}
              <div className="bodhi-sample-bubble-bodhi">
                <div className="bodhi-sample-bodhi-label">
                  <span>✨ Bodhi's Guidance</span>
                  <span style={{ fontSize: '0.72rem', color: '#854d0e', textTransform: 'none' }}>
                    Tier: {activeSample.tier}
                  </span>
                </div>
                <p className="bodhi-sample-answer-text">{activeSample.bodhiAnswer}</p>
              </div>
            </div>

            <div className="bodhi-sample-footer">
              <span className="bodhi-sample-takeaway">
                💡 Key Pedagogical Takeaway: {activeSample.keyTakeaway}
              </span>
              {activeSample.escalationNote && (
                <a
                  href="https://wa.me/919000335468?text=Hello%20Gurukul%20Acharyas%2C%20I%20have%20a%20Sanskrit%20essay%20for%20teacher%20review"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bodhi-scope-alternative"
                  style={{ textDecoration: 'none' }}
                >
                  💬 {activeSample.escalationNote}
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: EDUCATIONAL SAFEGUARDS */}
      {activeTab === 'safeguards' && (
        <div className="bodhi-safeguards-grid">
          <div className="bodhi-safeguard-card">
            <span className="bodhi-safeguard-icon" aria-hidden="true">🔒</span>
            <h3 className="bodhi-safeguard-title">Zero-Hallucination Guardrail</h3>
            <p className="bodhi-safeguard-desc">
              Unlike generic LLMs that invent non-existent rules or misquote shlokas, Bodhi’s answers are strictly cross-verified against Pāṇini’s <em>Aṣṭādhyāyī</em>, the NCERT <em>Deepakam</em> curriculum, and the 16 Vedic Mathematics Sutras.
            </p>
          </div>

          <div className="bodhi-safeguard-card">
            <span className="bodhi-safeguard-icon" aria-hidden="true">🛡️</span>
            <h3 className="bodhi-safeguard-title">Child &amp; Family Privacy</h3>
            <p className="bodhi-safeguard-desc">
              100% ad-free and privacy-first. Bodhi never stores, tracks, or monetizes student conversations for targeted advertising, fully adhering to child online safety guidelines (COPPA &amp; GDPR-K).
            </p>
          </div>

          <div className="bodhi-safeguard-card">
            <span className="bodhi-safeguard-icon" aria-hidden="true">👨‍🏫</span>
            <h3 className="bodhi-safeguard-title">Human-in-the-Loop Escalation</h3>
            <p className="bodhi-safeguard-desc">
              Automated tools provide instant 24/7 practice, but human Acharyas remain at the heart of the Gurukul. Any doubt, handwritten essay, or CBSE board question can be escalated directly to human educators on WhatsApp at +91 9000335468.
            </p>
          </div>
        </div>
      )}

      {/* 4. Action Bar */}
      <div className="bodhi-pos-action-bar">
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {onOpenBodhi && (
            <button
              type="button"
              className="bodhi-pos-cta-btn bodhi-pos-cta-btn--primary"
              onClick={onOpenBodhi}
              title="Open Ask Bodhi Q&A widget"
            >
              💬 Ask Bodhi a Question (150+ Topics)
            </button>
          )}
          {onOpenOnlineClasses && (
            <button
              type="button"
              className="bodhi-pos-cta-btn bodhi-pos-cta-btn--secondary"
              onClick={onOpenOnlineClasses}
            >
              🎓 Explore Guided Classes
            </button>
          )}
          {onOpenVarnamala && (
            <button
              type="button"
              className="bodhi-pos-cta-btn bodhi-pos-cta-btn--secondary"
              onClick={onOpenVarnamala}
            >
              🔤 Learn Sounds with Bodhi
            </button>
          )}
        </div>

        <a
          href="https://wa.me/919000335468?text=Hello%20Gurukul%2C%20I%20have%20a%20question%20for%20the%20human%20Sanskrit%20Acharyas"
          target="_blank"
          rel="noopener noreferrer"
          className="bodhi-pos-cta-btn bodhi-pos-cta-btn--whatsapp"
          title="Direct WhatsApp Mentor Desk (+91 9000335468)"
        >
          <span>💬</span> Chat with Human Acharya (WhatsApp: 9000335468)
        </a>
      </div>
    </section>
  );
};

export default BodhiMentorPositioning;
