import React, { useState } from 'react';
import BodhiAvatar, { type BodhiMood } from '../BodhiAvatar';
import { playPronunciation, type BodhiSpeechLang } from '../../utils/pronunciation';
import { useBodhiSpeech } from './useBodhiSpeech';

export type LabSegmentId =
  | 'paramanu'
  | 'prakriti'
  | 'jyotisha'
  | 'srishti-sthiti-laya'
  | 'nada-brahman'
  | 'asato-ma'
  | 'chaturyoni'
  | 'chandrayaan'
  | 'rituparna'
  | 'agnibana'
  | 'vedic-geometry'
  | 'mantra-acoustics'
  | 'temple-engineering'
  | 'kautilya'
  | 'chandahshastra'
  | 'ujjain-geodesy';

export interface LabSegmentProps {
  onNextLab?: () => void;
  onPrevLab?: () => void;
}

export const LabNextAction: React.FC<{
  nextTitle: string;
  nextCode?: string;
  nextDev?: string;
  nextIcon?: string;
  onNextLab?: () => void;
  message?: string;
}> = ({ nextTitle, nextCode, nextDev, nextIcon, onNextLab, message }) => {
  if (!onNextLab) return null;
  return (
    <div className="vl-panel vl-lab-next-action-card">
      <div className="vl-next-action-text">
        <span className="vl-next-action-badge">🎯 SECTOR COMPLETE // NEXT ADVENTURE</span>
        {nextDev && <div className="vl-next-action-dev" lang="sa">{nextDev}</div>}
        <h4 className="vl-next-action-title">
          {message || `Advance to Next Sector: ${nextCode ? `${nextCode} · ` : ''}${nextTitle}`}
        </h4>
      </div>
      <button
        type="button"
        className="vl-btn vl-btn--cyber vl-btn--next-action"
        onClick={onNextLab}
        aria-label={`Enter Next Lab: ${nextTitle}`}
      >
        <span>{nextIcon ? `${nextIcon} ` : ''}PROCEED TO NEXT LAB ➔</span>
      </button>
    </div>
  );
};


export interface LabTerm {
  dev: string;
  iast: string;
  en: string;
  note?: string;
  /** Optional game-style codex tag, e.g. "DATA STREAM // Perceptual Matrix". The plain meaning (en) then shows as a small line. */
  tag?: string;
  game?: string;
}

/** Tap a term to hear it with the site's generic Sanskrit pronunciation helper. */
export const TermPanel: React.FC<{ title?: string; terms: LabTerm[] }> = ({ title = 'Sanskrit words in this lab', terms }) => (
  <section className="vl-panel vl-terms" aria-label={title}>
    <h3 className="vl-panel-title">
      <span aria-hidden="true">🔤</span> {title}
      <span className="vl-panel-hint">Tap a word to hear it</span>
    </h3>
    <ul className="vl-term-list">
      {terms.map((t) => (
        <li key={t.iast}>
          <button
            type="button"
            className="vl-term"
            onClick={() => playPronunciation(t.dev)}
            title={`Hear ${t.iast}`}
          >
            <span className="vl-term-dev" lang="sa">{t.dev}</span>
            <span className="vl-term-iast">{t.iast}</span>
            {t.tag && <span className="vl-term-tag">{t.tag}</span>}
            {t.game && <span className="vl-term-game">{t.game}</span>}
            <span className={t.tag ? 'vl-term-dict' : 'vl-term-en'}>{t.tag ? `${t.iast}: ${t.en}` : t.en}</span>
            {t.note && <span className="vl-term-note">{t.note}</span>}
          </button>
        </li>
      ))}
    </ul>
  </section>
);

export interface LabChallenge {
  q: string;
  options: string[];
  answer: number;
  explain: string;
}

export const ChallengeList: React.FC<{ items: LabChallenge[]; title?: string }> = ({ items, title = 'Quick challenges' }) => {
  const [picked, setPicked] = useState<Record<number, number>>({});
  const solved = items.filter((_, i) => picked[i] === items[i].answer).length;
  return (
    <section className="vl-panel vl-challenges" aria-label={title}>
      <h3 className="vl-panel-title">
        <span aria-hidden="true">🎯</span> {title}
        <span className="vl-score">{solved} / {items.length} ✓</span>
      </h3>
      <ol className="vl-ch-list">
        {items.map((c, i) => {
          const choice = picked[i];
          const answered = choice !== undefined;
          const right = answered && choice === c.answer;
          return (
            <li key={c.q} className="vl-ch">
              <p className="vl-ch-q">{c.q}</p>
              <div className="vl-ch-opts">
                {c.options.map((o, j) => (
                  <button
                    key={o}
                    type="button"
                    className={`vl-ch-opt${answered && j === choice ? (right ? ' is-right' : ' is-wrong') : ''}`}
                    onClick={() => setPicked((p) => ({ ...p, [i]: j }))}
                  >
                    {o}
                  </button>
                ))}
              </div>
              {answered && (
                <p className={`vl-ch-feedback ${right ? 'is-right' : 'is-wrong'}`} role="status">
                  {right ? '✓ Yes! ' : '✗ Not quite. Try again. '}
                  {right && c.explain}
                </p>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
};

export const CoreIdea: React.FC<{ children: React.ReactNode; note?: React.ReactNode }> = ({ children, note }) => (
  <div className="vl-core">
    <div className="vl-core-tag">💡 Core idea</div>
    <div className="vl-core-body">{children}</div>
    {note && <div className="vl-core-note">{note}</div>}
  </div>
);

export interface BodhiSutra {
  dev: string;
  iast: string;
  source: string;
  meaning: string;
}

export interface BodhiModernBridge {
  ancientConcept: string;
  modernScience: string;
  relevanceNote: string;
}

export interface BodhiLabAnecdoteProps {
  title: string;
  sanskritTitle?: string;
  mood?: BodhiMood;
  sutra?: BodhiSutra;
  anecdote: React.ReactNode;
  epistemologyAndMethod?: React.ReactNode;
  modernBridge?: BodhiModernBridge;
  societalValue?: React.ReactNode;
  audioSanskrit?: string;
  audioEnglish?: string;
}

/**
 * Bodhi's Vijñāna Insight Panel:
 * Anchors the lab in the historical reality of Indian indigenous science as a continuous,
 * empirical, and societally committed evolution of human knowledge.
 */
export const BodhiLabAnecdote: React.FC<BodhiLabAnecdoteProps> = ({
  title,
  sanskritTitle,
  mood = 'scholar',
  sutra,
  anecdote,
  epistemologyAndMethod,
  modernBridge,
  societalValue,
  audioSanskrit,
  audioEnglish,
}) => {
  const { speakingKey, toggle: toggleBodhi } = useBodhiSpeech();
  const speaking = speakingKey as BodhiSpeechLang | null;
  const [activeTab, setActiveTab] = useState<'anecdote' | 'bridge' | 'lokasamgraha'>('anecdote');
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const speak = (text: string, lang: BodhiSpeechLang) => toggleBodhi(text, lang, lang);

  const sanskritToSpeak = audioSanskrit || sutra?.dev;
  const englishToSpeak = audioEnglish || (typeof anecdote === 'string' ? anecdote : undefined);

  return (
    <section className="vl-panel vl-bodhi-anecdote" aria-label={`Bodhi’s Insight: ${title}`}>
      {/* Header with Avatar and Voice Buttons */}
      <div className="vl-bodhi-header">
        <div className="vl-bodhi-avatar-frame">
          <BodhiAvatar mood={mood} size="md" isSpeaking={speaking !== null} />
        </div>
        <div className="vl-bodhi-header-text">
          <div className="vl-bodhi-badge">
            <span>✨ बोधि-विज्ञान-विमर्शः</span>
            <span>· Bodhi’s Indigenous Science Chronicle</span>
          </div>
          <h3 className="vl-bodhi-title">
            {title}
            {sanskritTitle && <span className="vl-bodhi-title-sa" lang="sa"> ({sanskritTitle})</span>}
          </h3>
          <p className="vl-bodhi-lead">
            Science is not a modern-day invention; it evolved over millennia through careful observation (<em>Pratyakṣa</em>),
            reasoned application (<em>Yukti</em>), and an unbroken civilizational dedication to societal upliftment.
          </p>
        </div>
        <div className="vl-bodhi-audio-group">
          {sanskritToSpeak && (
            <button
              type="button"
              className={`vl-bodhi-voice-btn ${speaking === 'sa' ? 'is-speaking' : ''}`}
              onClick={() => speak(sanskritToSpeak, 'sa')}
              title={speaking === 'sa' ? 'Stop Sanskrit pronunciation' : 'Hear primary Sanskrit aphorism read by Bodhi'}
            >
              {speaking === 'sa' ? '⏹' : '🔊'} <span lang="sa">संस्कृत-श्रवणम्</span>
            </button>
          )}
          {englishToSpeak && (
            <button
              type="button"
              className={`vl-bodhi-voice-btn vl-bodhi-voice-btn--en ${speaking === 'en' ? 'is-speaking' : ''}`}
              onClick={() => speak(englishToSpeak, 'en')}
              title={speaking === 'en' ? 'Stop Bodhi narration' : 'Hear Bodhi recite the historical insight'}
            >
              {speaking === 'en' ? '⏹' : '🗣️'} Hear Bodhi
            </button>
          )}
          <button
            type="button"
            className="vl-bodhi-collapse-btn"
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? 'Collapse chronicle to streamline view' : 'Expand full historical chronicle'}
          >
            {isExpanded ? '▲ Simplify View' : '▼ Read Chronicle & Sūtras'}
          </button>
        </div>
      </div>

      {isExpanded && (
        <>
          {/* Primary Sūtra / Text Citation Banner */}
      {sutra && (
        <div className="vl-bodhi-sutra">
          <div className="vl-bodhi-sutra-header">
            <span className="vl-bodhi-sutra-icon">📜</span>
            <strong className="vl-bodhi-sutra-source">{sutra.source}</strong>
            <button
              type="button"
              className="vl-bodhi-sutra-play"
              onClick={() => playPronunciation(sutra.dev)}
              title="Hear Sanskrit sūtra"
            >
              🔊 Tap to listen
            </button>
          </div>
          <div className="vl-bodhi-sutra-dev" lang="sa">{sutra.dev}</div>
          <div className="vl-bodhi-sutra-iast">{sutra.iast}</div>
          <div className="vl-bodhi-sutra-meaning">“{sutra.meaning}”</div>
        </div>
      )}

      {/* Interactive Tabs */}
      <div className="vl-bodhi-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'anecdote'}
          className={`vl-bodhi-tab ${activeTab === 'anecdote' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('anecdote')}
        >
          <span aria-hidden="true">📖</span> 1. Historical Anecdote & Observation
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'bridge'}
          className={`vl-bodhi-tab ${activeTab === 'bridge' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('bridge')}
        >
          <span aria-hidden="true">🔬</span> 2. Ancient Evolution & Modern Bridge
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'lokasamgraha'}
          className={`vl-bodhi-tab ${activeTab === 'lokasamgraha' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('lokasamgraha')}
        >
          <span aria-hidden="true">🌍</span> 3. Vidyā for Society (Lokasaṃgraha)
        </button>
      </div>

      {/* Tab Panels */}
      <div className="vl-bodhi-content">
        {activeTab === 'anecdote' && (
          <div className="vl-bodhi-pane">
            <div className="vl-bodhi-card-narrative">
              <h4 className="vl-bodhi-section-title">
                <span aria-hidden="true">🔍</span> Empirical Observation (प्रत्यक्ष-निरीक्षणम्) &amp; The Living Anecdote
              </h4>
              <div className="vl-bodhi-prose">{anecdote}</div>
              {epistemologyAndMethod && (
                <div className="vl-bodhi-epistemology">
                  <strong>The Empirical Epistemology (प्रमाण-पद्धतिः):</strong>
                  <div style={{ marginTop: '0.35rem' }}>{epistemologyAndMethod}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'bridge' && (
          <div className="vl-bodhi-pane">
            <div className="vl-bodhi-card-bridge">
              <h4 className="vl-bodhi-section-title">
                <span aria-hidden="true">⚡</span> Science Did Not Start Today: Unbroken Foundations
              </h4>
              <p className="vl-bodhi-bridge-intro">
                India represents an unbroken, continuous civilization where scientific curiosity was not a sudden 17th-century
                rupture, but an organic, centuries-long accumulation of empirical observation and rigorous hypothesis testing.
                While ancient methods did not possess modern hyper-accelerated digital labs, their conceptual breakthroughs were
                monumentally advanced for their contemporary epoch and directly laid the groundwork for modern disciplines.
              </p>
              {modernBridge && (
                <div className="vl-bodhi-bridge-grid">
                  <div className="vl-bodhi-bridge-box vl-bodhi-bridge-box--ancient">
                    <span className="vl-bodhi-bridge-tag">Ancient Observation (प्राचीन-सिद्धिः)</span>
                    <p className="vl-bodhi-bridge-val">{modernBridge.ancientConcept}</p>
                  </div>
                  <div className="vl-bodhi-bridge-arrow" aria-hidden="true">➔</div>
                  <div className="vl-bodhi-bridge-box vl-bodhi-bridge-box--modern">
                    <span className="vl-bodhi-bridge-tag">Modern Scientific Counterpart (आधुनिक-विज्ञानम्)</span>
                    <p className="vl-bodhi-bridge-val">{modernBridge.modernScience}</p>
                  </div>
                </div>
              )}
              {modernBridge?.relevanceNote && (
                <div className="vl-bodhi-bridge-note">
                  <strong>Contemporary Relevance:</strong> {modernBridge.relevanceNote}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'lokasamgraha' && (
          <div className="vl-bodhi-pane">
            <div className="vl-bodhi-card-society">
              <h4 className="vl-bodhi-section-title">
                <span aria-hidden="true">🌱</span> Knowledge for the Betterment of All Beings (लोकसंग्रहः &amp; सर्वभूतहितम्)
              </h4>
              <div className="vl-bodhi-prose">
                {societalValue || (
                  <p>
                    In the Indian civilizational ethos, knowledge (<em>Vidyā</em>) was never pursued for commercial monopoly,
                    destructive exploitation, or hubristic domination over nature. Rather, discovery was viewed as a sacred
                    trust for <em>Lokasaṃgraha</em> (holding the community together) and <em>Sarva-bhūta-hita</em> (the welfare of
                    all sentient beings). Observation, practical application, and free propagation of truth were revered as the highest
                    virtues.
                  </p>
                )}
              </div>
              <div className="vl-bodhi-motto-box">
                <div className="vl-bodhi-motto-sa" lang="sa">
                  सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः ।<br />
                  सर्वे भद्राणि पश्यन्तु मा कश्चिद् दुःखभाग्भवेत् ॥
                </div>
                <div className="vl-bodhi-motto-en">
                  “May all beings be at peace; may all be free from illness; may all perceive what is auspicious; may none suffer.”
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
        </>
      )}
    </section>
  );
};

