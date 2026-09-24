import React, { useEffect, useState } from 'react';
import '../styles/philosophy.css';
import { playPronunciation } from '../utils/pronunciation';

export interface PhilosophyPageProps {
  onOpenRegister?: () => void;
  onOpenVedicMaths?: () => void;
  onOpenVarnamala?: () => void;
  onOpenReader?: () => void;
  onGoHome?: () => void;
  initialEssay?: 'ai_sanskrit' | 'sunyat_anantam';
}

const GLOSSARY: { term: string; meaning: string }[] = [
  { term: 'śūnya', meaning: 'zero; the fruitful “nothing”' },
  { term: 'gaṇita / gaṇita-śāstra / gaṇita-vidyā', meaning: 'mathematics; the discipline; the living knowledge' },
  { term: 'ananta', meaning: 'the infinite' },
  { term: 'saṅkhyā', meaning: 'number' },
  { term: 'sthāna', meaning: 'place (place value)' },
  { term: 'darśana', meaning: 'a way of seeing; philosophy' },
  { term: 'vicāra', meaning: 'inquiry, reasoned thought' },
  { term: 'chandas / laya / śloka', meaning: 'metre, rhythm, verse' },
  { term: 'rekhā-gaṇita', meaning: 'geometry' },
  { term: 'ṛta', meaning: 'cosmic / structural order' },
  { term: 'yātrā', meaning: 'journey' },
  { term: 'jijñāsā', meaning: 'the wish to know' },
  { term: 'vaikharī', meaning: 'audible spoken speech; physical acoustic articulation' },
  { term: 'madhyamā', meaning: 'internal mental speech; cognitive thought and syntax' },
  { term: 'paśyantī', meaning: 'visionary intuitive grasp; undivided flash of meaning' },
  { term: 'parā', meaning: 'transcendent unmanifest source of all awareness and sound' },
  { term: 'sandhi', meaning: 'phonetic euphonic joining at morpheme and word boundaries' },
  { term: 'vibhakti', meaning: 'nominal case inflections expressing relational syntactical roles' },
  { term: 'dhātu', meaning: 'verbal root, the algorithmic generative core in Pāṇini’s Aṣṭādhyāyī' },
  { term: 'śikṣā', meaning: 'Vedic phonetic science mapping oral articulation points and acoustics' },
];

const DEFAULT_TITLE =
  'Online Sanskrit & Vedic Math Classes for Kids | EdNet Learn Gurukul';
const DEFAULT_DESC =
  'Unlock your child\'s potential with interactive Sanskrit and Vedic Math for kids. Start a 14-day free trial, then pay ₹200 once — no auto-debit.';

const AI_ESSAY_TITLE =
  'Why Learn a Language — Especially Sanskrit — in the Age of AI · Darśana | EdNet Learn Gurukul';
const AI_ESSAY_DESC =
  'Machines will make communication efficient. They will not make it living. Explore why Sanskrit phonetics, Pāṇinian grammar, and presence matter in an automated age.';

const MATH_ESSAY_TITLE =
  'Our Philosophy · Darśana | Śūnyāt Anantam | EdNet Learn Gurukul';
const MATH_ESSAY_DESC =
  'EdNet Learn Gurukul darśana: gaṇita as a living bhāṣā — from śūnya to ananta. Explore mathematics as inquiry, pattern, and ṛta. Begin a 14-day free trial.';

const PhilosophyPage: React.FC<PhilosophyPageProps> = ({
  onOpenRegister,
  onOpenVedicMaths,
  onOpenVarnamala,
  onOpenReader,
  onGoHome,
  initialEssay = 'ai_sanskrit',
}) => {
  const [activeEssay, setActiveEssay] = useState<'ai_sanskrit' | 'sunyat_anantam'>(initialEssay);
  const [glossaryOpen, setGlossaryOpen] = useState(false);

  useEffect(() => {
    const isAi = activeEssay === 'ai_sanskrit';
    const currentTitle = isAi ? AI_ESSAY_TITLE : MATH_ESSAY_TITLE;
    const currentDesc = isAi ? AI_ESSAY_DESC : MATH_ESSAY_DESC;

    const prevTitle = document.title;
    document.title = currentTitle;

    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content') || '';
    metaDesc?.setAttribute('content', currentDesc);

    const canonical = document.querySelector('link[rel="canonical"]');
    const prevCanonical = canonical?.getAttribute('href') || '';
    canonical?.setAttribute('href', 'https://ednetlearn.in/philosophy');

    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');
    const ogImage = document.querySelector('meta[property="og:image"]');
    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    const prevOgTitle = ogTitle?.getAttribute('content') || '';
    const prevOgDesc = ogDesc?.getAttribute('content') || '';
    const prevOgUrl = ogUrl?.getAttribute('href') || ogUrl?.getAttribute('content') || '';
    const prevOgImage = ogImage?.getAttribute('content') || '';
    const prevTwitterImage = twitterImage?.getAttribute('content') || '';
    const MANDALA_OG =
      'https://ednetlearn.in/philosophy/sunyat-anantam-mandala.webp';
    ogTitle?.setAttribute('content', currentTitle);
    ogDesc?.setAttribute('content', currentDesc);
    ogUrl?.setAttribute('content', 'https://ednetlearn.in/philosophy');
    ogImage?.setAttribute('content', MANDALA_OG);
    twitterImage?.setAttribute('content', MANDALA_OG);

    return () => {
      document.title = prevTitle || DEFAULT_TITLE;
      metaDesc?.setAttribute('content', prevDesc || DEFAULT_DESC);
      if (prevCanonical) canonical?.setAttribute('href', prevCanonical);
      if (prevOgTitle) ogTitle?.setAttribute('content', prevOgTitle);
      if (prevOgDesc) ogDesc?.setAttribute('content', prevOgDesc);
      if (prevOgUrl) ogUrl?.setAttribute('content', prevOgUrl);
      if (prevOgImage) ogImage?.setAttribute('content', prevOgImage);
      if (prevTwitterImage) twitterImage?.setAttribute('content', prevTwitterImage);
    };
  }, [activeEssay]);

  const handlePlayAudio = (term: string) => {
    try {
      playPronunciation(term);
    } catch (err) {
      console.warn('Audio pronunciation error:', err);
    }
  };

  const AudioChip: React.FC<{ term: string; label?: string }> = ({ term, label }) => (
    <button
      type="button"
      className="philosophy-audio-btn"
      onClick={() => handlePlayAudio(term)}
      title={`Listen to pronunciation of ${term}`}
      aria-label={`Pronounce ${term}`}
    >
      <span aria-hidden="true">🔊</span>
      <span>{label || term}</span>
    </button>
  );

  return (
    <article className="philosophy-page" id="philosophy-page" lang="en">
      <div className="philosophy-container">
        {/* Navigation & Crumbs */}
        <div className="philosophy-hero-top">
          {onGoHome && (
            <button type="button" className="philosophy-crumb-btn" onClick={onGoHome}>
              ← Home
            </button>
          )}
          {onOpenReader && (
            <button type="button" className="philosophy-crumb-btn" onClick={onOpenReader}>
              📖 Living Reader
            </button>
          )}
          {onOpenVarnamala && (
            <button type="button" className="philosophy-crumb-btn" onClick={onOpenVarnamala}>
              🔤 Alphabet &amp; Syllables
            </button>
          )}
          {onOpenVedicMaths && (
            <button type="button" className="philosophy-crumb-btn" onClick={onOpenVedicMaths}>
              📐 वैदिक-गणितम्
            </button>
          )}
        </div>

        {/* Multi-Essay Switcher Tabs */}
        <nav className="philosophy-essay-nav" aria-label="Darśana Essays Switcher">
          <button
            type="button"
            className={`philosophy-essay-tab ${activeEssay === 'ai_sanskrit' ? 'active' : ''}`}
            onClick={() => {
              setActiveEssay('ai_sanskrit');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span className="philosophy-essay-tab-icon" aria-hidden="true">🤖</span>
            <div>
              <span className="philosophy-essay-tab-title">Why Learn Sanskrit in the Age of AI</span>
              <span className="philosophy-essay-tab-sub">Machines make communication efficient — not living</span>
            </div>
          </button>
          <button
            type="button"
            className={`philosophy-essay-tab ${activeEssay === 'sunyat_anantam' ? 'active' : ''}`}
            onClick={() => {
              setActiveEssay('sunyat_anantam');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span className="philosophy-essay-tab-icon" aria-hidden="true">🌌</span>
            <div>
              <span className="philosophy-essay-tab-title">Śūnyāt Anantam (शून्यात् अनन्तम्)</span>
              <span className="philosophy-essay-tab-sub">The Journey of Gaṇita-śāstra · Mathematics as Darśana</span>
            </div>
          </button>
        </nav>

        {/* =========================================================================
            ESSAY 1: Why Learn a Language — Especially Sanskrit — in the Age of AI
           ========================================================================= */}
        {activeEssay === 'ai_sanskrit' && (
          <div className="philosophy-essay-body">
            <header className="philosophy-hero">
              <span className="philosophy-kicker">Gurukul Darśana · दर्शनम्</span>
              <h1 className="philosophy-title">
                Why Learn a Language — Especially Sanskrit — in the Age of AI
              </h1>
              <p className="philosophy-mantra">
                Machines will make communication efficient. They will not make it living.
              </p>

              <blockquote className="philosophy-pull-quote" style={{ maxWidth: '38rem', margin: '1.25rem auto 0.5rem' }}>
                <p>
                  “Language was never only a pipe for information. It is also how a mind binds to
                  breath, sound, culture, and attention. Artificial intelligence is superb at the
                  first job. It is not a substitute for the second.”
                </p>
              </blockquote>
            </header>

            <section className="philosophy-section" aria-labelledby="ai-opening">
              <p>
                If a device can translate any sentence in real time, and if a future implant can
                send a thought without words, a fair question follows: why learn a language at all?
                Why Sanskrit — a language many people meet first as prayer, grammar, or school memory
                — when an app can already gloss a śloka?
              </p>
              <p>
                Because language was never only a pipe for information. It is also how a mind binds to
                breath, sound, culture, and attention. Artificial intelligence is superb at the
                first job. It is not a substitute for the second.
              </p>
            </section>

            <section className="philosophy-section" aria-labelledby="two-kinds-comm">
              <h2 id="two-kinds-comm">Two Kinds of Communication</h2>
              <p>
                One kind of communication is <strong>transfer</strong>. Meaning is compressed, sent,
                decompressed. Speed and coverage win. This is what translation engines and, later,
                brain–computer interfaces will keep improving. The world becomes smaller. Barriers
                fall. That is a genuine gift.
              </p>
              <p>
                The other kind is <strong>bind</strong>. Speech is locked to the body that produces
                it: the chest vibration of a long vowel, the tongue striking the palate, the
                hesitation before a word that costs something to say, the shared room where two people
                hear the same syllable die away.
              </p>

              <div className="philosophy-duality-grid">
                <div className="philosophy-duality-card philosophy-duality-card--transfer">
                  <h3 className="philosophy-duality-title">
                    <span>⚡</span> Transfer (सञ्चार · Compression)
                  </h3>
                  <p className="philosophy-duality-desc">
                    Meaning compressed into packets, transmitted across wires, decompressed. Speed,
                    scale, and coverage dominate. AI excels here: translation models make sentences
                    interchangeable code and lower planetary friction.
                  </p>
                </div>
                <div className="philosophy-duality-card philosophy-duality-card--bind">
                  <h3 className="philosophy-duality-title">
                    <span>🪔</span> Bind (संयोग · Embodiment)
                  </h3>
                  <p className="philosophy-duality-desc">
                    Speech physically locked to the vocal apparatus: chest resonance, breath, tongue
                    palatal contact, shared space, and the human cost of formulating an utterance.
                    Cannot be outsourced to silicon.
                  </p>
                </div>
              </div>

              <p>
                AI can simulate the surface of that second kind. It cannot live it. When you rely
                only on transfer, you slowly treat every utterance as interchangeable code. What you
                gain in reach, you lose in grain.
              </p>
            </section>

            <section className="philosophy-section" aria-labelledby="what-ai-flattens">
              <h2 id="what-ai-flattens">What AI Can Do — and What It Flattens</h2>
              <p>
                A modern model can take a Sanskrit verse, parse compounds, output case endings, and
                produce five elegant English renderings in seconds. That is extraordinary for access.
              </p>
              <p>
                <strong>What it cannot do for you is make the language your own.</strong>
              </p>
              <p>
                When an engine resolves a sandhi (the joining of sounds at word boundaries), it
                solves an equation. When you resolve it aloud, you experience why the mouth prefers
                that pathway: effort, glide, release. You feel the architecture of speech.
              </p>
              <p>
                When an engine maps a vibhakti (case marker), it looks up a relational graph. When
                you learn to hear it, your brain begins to hold seven relationships at once without
                needing word order to prop them up. That changes how you think, not just what you
                read.
              </p>

              <div className="philosophy-grain-grid">
                <div className="philosophy-grain-card">
                  <div className="philosophy-grain-header">
                    <span className="philosophy-grain-sanskrit">संधिः</span>
                    <span className="philosophy-grain-label">Sandhi · Acoustic Glide</span>
                  </div>
                  <p>
                    Not an algebraic rule of text substitution, but the natural kinetic flow of
                    the tongue moving between points of articulation: effort, glide, and release.{' '}
                    <AudioChip term="संधिः" label="संधिः" />
                  </p>
                </div>

                <div className="philosophy-grain-card">
                  <div className="philosophy-grain-header">
                    <span className="philosophy-grain-sanskrit">विभक्तिः</span>
                    <span className="philosophy-grain-label">Vibhakti · 7 Relations</span>
                  </div>
                  <p>
                    Syntactic relation held directly within nominal terminations. Your mind holds
                    agent, patient, instrument, and location simultaneously without rigid English
                    word order.{' '}
                    <AudioChip term="विभक्तिः" label="विभक्तिः" />
                  </p>
                </div>

                <div className="philosophy-grain-card">
                  <div className="philosophy-grain-header">
                    <span className="philosophy-grain-sanskrit">धातुः</span>
                    <span className="philosophy-grain-label">Dhātu · Generative Root</span>
                  </div>
                  <p>
                    Every noun and verb seeds from an algorithmic root action. Language is not a list
                    of arbitrary tags, but an organic tree generated by precise Pāṇinian sūtras.{' '}
                    <AudioChip term="धातुः" label="धातुः" />
                  </p>
                </div>

                <div className="philosophy-grain-card">
                  <div className="philosophy-grain-header">
                    <span className="philosophy-grain-sanskrit">शब्द-अर्थ</span>
                    <span className="philosophy-grain-label">Śabda · Sound as Meaning</span>
                  </div>
                  <p>
                    Sound and meaning (शब्दार्थौ) are intrinsically wedded. Sanskrit retains its
                    tactile acoustic grain, resisting the rootless mush of modern translation engines.{' '}
                    <AudioChip term="शब्दः" label="शब्दः" />
                  </p>
                </div>
              </div>

              <p>
                In a machine-first world, everything is translated into a common mush of
                contemporary, flattened English: clean, helpful, and rootless. Sanskrit is the
                opposite of mush. It has grain. It resists casual skimming. It asks for your
                presence.
              </p>
            </section>

            <section className="philosophy-section" aria-labelledby="special-case">
              <h2 id="special-case">Why Sanskrit Is a Special Case in This Age</h2>
              <p>
                Every language has a soul, but Sanskrit has a peculiar relationship to technology.
              </p>

              <div className="philosophy-card">
                <h3>1. It is a designed instrument of speech</h3>
                <p>
                  Pāṇinian grammar does not describe how Sanskrit happened to drift on the street;
                  it formalises how speech sounds are generated from roots (<em>dhātu</em>{' '}
                  <AudioChip term="धातु" label="धातु" />) and affixes according to strict generative
                  rules. It is an algorithmic language created millennia before computers.
                </p>
                <p>
                  If you love code, Sanskrit should fascinate you not because “computers will run on
                  Sanskrit” (a common half-truth), but because it proves human beings could design a
                  system of speech as rigorous as code and as expressive as song.
                </p>
              </div>

              <div className="philosophy-card">
                <h3>2. It begins in phonetics, not typography</h3>
                <p>
                  Before it was written down, it was chanted. The Śikṣā (
                  <AudioChip term="शिक्षा" label="शिक्षा" />) phonetic tradition maps the mouth like
                  a keyboard:
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', margin: '0.5rem 0 0.85rem' }}>
                  <AudioChip term="कण्ठ्य" label="Throat (कण्ठ्य)" />
                  <AudioChip term="तालव्य" label="Palate (तालव्य)" />
                  <AudioChip term="मूर्धन्य" label="Roof / Retroflex (मूर्धन्य)" />
                  <AudioChip term="दन्त्य" label="Teeth (दन्त्य)" />
                  <AudioChip term="ओष्ठ्य" label="Lips (ओष्ठ्य)" />
                </div>
                <p>
                  When you recite, you are playing an acoustic instrument whose resonance you feel in
                  your skull and ribcage.
                </p>
                <p>
                  <strong>An AI screen is silent glass. Sanskrit insists on the body.</strong>
                </p>

                {/* 4 Levels of Vāk */}
                <h4 style={{ margin: '1rem 0 0.4rem', color: '#9a3412', fontSize: '0.95rem', fontWeight: 800 }}>
                  Catvāri Vāk-Padāni — The Four Levels of Speech (चत्वारि वाक्पदानि):
                </h4>
                <div className="philosophy-vak-chain">
                  <div className="philosophy-vak-node">
                    <span className="philosophy-vak-badge">Level 1 · Auditory</span>
                    <div className="philosophy-vak-name">वैखरी</div>
                    <div className="philosophy-vak-iast">Vaikharī</div>
                    <div className="philosophy-vak-meaning">Spoken audible sound, breath, and physical articulation.</div>
                    <AudioChip term="वैखरी" label="वैखरी" />
                  </div>
                  <div className="philosophy-vak-node">
                    <span className="philosophy-vak-badge">Level 2 · Mental</span>
                    <div className="philosophy-vak-name">मध्यमा</div>
                    <div className="philosophy-vak-iast">Madhyamā</div>
                    <div className="philosophy-vak-meaning">Internal dialogue, mental syntax, and silent thought.</div>
                    <AudioChip term="मध्यमा" label="मध्यमा" />
                  </div>
                  <div className="philosophy-vak-node">
                    <span className="philosophy-vak-badge">Level 3 · Intuitive</span>
                    <div className="philosophy-vak-name">पश्यन्ती</div>
                    <div className="philosophy-vak-iast">Paśyantī</div>
                    <div className="philosophy-vak-meaning">Visionary flash of unified meaning before words form.</div>
                    <AudioChip term="पश्यन्ती" label="पश्यन्ती" />
                  </div>
                  <div className="philosophy-vak-node">
                    <span className="philosophy-vak-badge">Level 4 · Transcendent</span>
                    <div className="philosophy-vak-name">परा</div>
                    <div className="philosophy-vak-iast">Parā</div>
                    <div className="philosophy-vak-meaning">Unmanifest source of pure consciousness and vibration.</div>
                    <AudioChip term="परा" label="परा" />
                  </div>
                </div>
              </div>

              <div className="philosophy-card">
                <h3>3. It is low-novelty, high-attention</h3>
                <p>
                  Most internet communication is high-novelty, low-attention: scroll, skim, react,
                  forget. Traditional Sanskrit learning is the reverse: take one verse, repeat it
                  forty times, hear the metre (<em>chandas</em> <AudioChip term="छन्दः" label="छन्दः" />
                  ), inhabit the sandhi, let the meaning settle over weeks.
                </p>
                <p>
                  <strong>That is an antidote to the machine age, not an inefficiency to fix.</strong>
                </p>
              </div>
            </section>

            <section className="philosophy-section" aria-labelledby="what-you-gain">
              <h2 id="what-you-gain">What You Actually Gain by Learning It</h2>
              <p>
                If you are learning only to get the “information” out of a text, let the AI read it
                to you. You will save hundreds of hours.
              </p>
              <p>Learn it if you want:</p>
              <ul className="philosophy-steps">
                <li>
                  <strong>A second channel in your head:</strong> To experience a thought before it
                  is forced into English categories.
                </li>
                <li>
                  <strong>To hear structure:</strong> Sanskrit makes the skeleton of meaning
                  audible. Case endings, prefixes, and roots teach you to look at any language — even
                  your mother tongue — with fresh eyes.
                </li>
                <li>
                  <strong>A living link:</strong> Not an academic autopsy of a dead tongue, but the
                  same sonic vibration people used three thousand years ago to ask the same questions
                  about time, grief, and freedom.
                </li>
                <li>
                  <strong>Attention training:</strong> The precision required for Sanskrit grammar
                  and pronunciation is one of the few remaining disciplines that cannot be faked with
                  a prompt.
                </li>
              </ul>
            </section>

            <section className="philosophy-section" aria-labelledby="how-to-learn">
              <h2 id="how-to-learn">How to Learn in the AI Age Without Becoming the Machine</h2>
              <p>
                The irony of modern language learning is that people often use apps that reduce
                language to automated drills — mimicking machines while trying to learn something
                human.
              </p>

              <div className="philosophy-card">
                <h3>Use AI as scaffolding, not the temple</h3>
                <p>
                  Use models to check your sandhi, to give vocabulary examples, or to explain a
                  confusing commentary. But never let the model do the reading for you. The friction
                  of parsing is where your brain grows.
                </p>
              </div>

              <div className="philosophy-card">
                <h3>Speak aloud from day one</h3>
                <p>
                  If you study Sanskrit purely as text on a screen, you cut off half of its life.
                  Recite. Even if your pronunciation is clumsy at first, let your mouth make the
                  shapes.
                </p>
              </div>

              <div className="philosophy-card">
                <h3>Keep one inefficient practice</h3>
                <p>
                  Write the Devanagari script by hand on paper. Sit with a printed page without
                  notifications. In an age of total convenience, deliberate inefficiency is how you
                  protect what is sacred and human.
                </p>
              </div>
            </section>

            <section className="philosophy-section" aria-labelledby="human-skill">
              <h2 id="human-skill">
                Language is no longer a survival skill; it is a human skill
              </h2>
              <p>
                For most of history, you learned another group’s language so you could trade,
                travel, or avoid war. AI will largely handle those survival functions.
              </p>
              <p>
                <strong>That does not make language learning obsolete. It makes it chosen.</strong>
              </p>
              <p>
                You no longer have to learn a language. That means when you do, it can be for the
                reasons that matter most: beauty, discipline, memory, and communion.
              </p>

              <div className="philosophy-callout" style={{ textAlign: 'center', padding: '1.25rem' }}>
                <p style={{ margin: '0 0 0.35rem', fontSize: '1.25rem', fontWeight: 800, color: '#9a3412' }}>
                  AI will give you the translation.
                </p>
                <p style={{ margin: 0, fontSize: '1.45rem', fontWeight: 900, color: '#1e293b' }}>
                  Only you can give yourself the voice.
                </p>
              </div>
            </section>

            {/* Practical Advice for Learners on this App */}
            <div className="philosophy-learner-box">
              <h3>For Learners on this App</h3>
              <ul className="philosophy-learner-list">
                <li>
                  <strong>Start with the sounds:</strong> Hear the difference between dental (दन्त्य)
                  and retroflex (मूर्धन्य). Speak the syllables before you read them.
                </li>
                <li>
                  <strong>One line with presence:</strong> One line of a verse spoken slowly with full
                  attention is worth ten pages translated by a machine in your pocket.
                </li>
                <li>
                  <strong>Trace with your hand:</strong> Use our handwriting and tracing studio to
                  anchor letter strokes in muscle memory before relying purely on keyboards.
                </li>
                <li>
                  <strong>Read verse-by-verse:</strong> Encounter texts in our living reader where
                  every word unfolds its root, gender, and grammatical case.
                </li>
              </ul>

              <div className="philosophy-action-buttons">
                {onOpenVarnamala && (
                  <button type="button" className="philosophy-action-btn" onClick={onOpenVarnamala}>
                    🔤 Alphabet &amp; Syllables Masterclass
                  </button>
                )}
                {onOpenReader && (
                  <button type="button" className="philosophy-action-btn" onClick={onOpenReader}>
                    📖 NCERT Deepakam Reader
                  </button>
                )}
                <button
                  type="button"
                  className="philosophy-action-btn"
                  style={{ background: '#b45309' }}
                  onClick={() => {
                    setActiveEssay('sunyat_anantam');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  🌌 Explore Gaṇita-śāstra (Śūnyāt Anantam) ➔
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            ESSAY 2: Śūnyāt Anantam — The Journey of Gaṇita-śāstra
           ========================================================================= */}
        {activeEssay === 'sunyat_anantam' && (
          <div className="philosophy-essay-body">
            <header className="philosophy-hero">
              <span className="philosophy-kicker">Gurukul Darśana · दर्शनम्</span>
              <h1 className="philosophy-title">Our Philosophy · Darśana</h1>
              <p className="philosophy-mantra" lang="sa">
                <span className="philosophy-mantra-latin">Śūnyāt Anantam</span>
                <span className="philosophy-mantra-sep" aria-hidden="true">
                  ·
                </span>
                <span className="philosophy-mantra-deva">शून्यात् अनन्तम्</span>
              </p>
              <figure className="philosophy-hero-mandala">
                <img
                  src="/philosophy/sunyat-anantam-mandala.webp"
                  alt="Śūnyāt Anantam — gaṇita-śāstra mandala from śūnya to ananta"
                  width={2000}
                  height={1091}
                  loading="eager"
                  decoding="async"
                />
              </figure>
              <p className="philosophy-secondary">The Journey of Gaṇita-śāstra</p>
              <blockquote className="philosophy-epigraph">
                <p lang="sa">Yatra saṅkhyā bhavati vicāraḥ</p>
                <cite>— where number becomes thought.</cite>
              </blockquote>

              <div className="philosophy-journey" aria-label="Journey from Śūnya to Ananta">
                <span className="philosophy-chip">Śūnya</span>
                <span className="philosophy-chip-arrow" aria-hidden="true">
                  →
                </span>
                <span className="philosophy-chip">Gaṇita</span>
                <span className="philosophy-chip-arrow" aria-hidden="true">
                  →
                </span>
                <span className="philosophy-chip philosophy-chip--accent">Ananta</span>
              </div>
              <p className="philosophy-journey-deva" lang="sa">
                शून्य → गणित → अनन्त
              </p>
            </header>

            <section className="philosophy-section" aria-labelledby="ganita-bhasha">
              <h2 id="ganita-bhasha">Gaṇita as Bhāṣā, Not a Race</h2>
              <p>
                Mathematics is often introduced as a contest: calculate faster, memorise more formulas,
                solve more questions. At EdNet Learn Gurukul, we invite children to experience{' '}
                <em>gaṇita-vidyā</em> — mathematics as a living knowledge — rather than as a timed
                transaction.
              </p>
              <p>
                We believe gaṇita is not merely a collection of techniques. It is a <em>bhāṣā</em> — a
                language — for discovering <em>saṅgati</em> (relationship), <em>saṃniveśa</em>{' '}
                (structure), <em>pramāṇa</em> (measure and proportion), <em>laya</em> (rhythm), and{' '}
                <em>krama</em> (order).
              </p>
              <p>
                Bhārata holds a remarkable mathematical heritage: the idea and use of <em>śūnya</em>{' '}
                (zero) and <em>sthāna</em> (place value); <em>rekhā-gaṇita</em> in the Śulba Sūtras;
                astronomical gaṇita associated with Āryabhaṭa; and combinatorial thinking in the Sanskrit
                tradition of Chandas. Our teaching gathers these strands into one <em>yātrā</em> — a
                journey:
              </p>
              <div className="philosophy-callout">
                <strong>Śūnya → Gaṇita → Ananta</strong>
                <span lang="sa">शून्य → गणित → अनन्त</span>
              </div>
              <ul className="philosophy-steps">
                <li>
                  From <em>śūnya</em>, we explore <em>saṅkhyā</em> (number).
                </li>
                <li>
                  From number, we discover <em>chanda</em> (pattern and metre).
                </li>
                <li>
                  From pattern, we encounter <em>racanā</em> (structure).
                </li>
                <li>
                  And from structure, we begin to glimpse <em>ananta</em> — the infinite.
                </li>
              </ul>
            </section>

            <section className="philosophy-section" aria-labelledby="trividha">
              <h2 id="trividha">Trividhā Pratiṣṭhā — The Three Foundations</h2>

              <div className="philosophy-card">
                <h3>1. Gaṇita as Darśana — Exploring Śūnya</h3>
                <p>
                  Śūnya is far more than a symbol written before or after another number. Its history is
                  a window into how mathematicians learned to represent <em>abhāva</em> (absence),{' '}
                  <em>sthāna</em> (place), and <em>saṅkhyā</em> (quantity). In the Indian tradition, zero
                  became essential to a numerical system whose influence travelled far beyond the
                  subcontinent.
                </p>
                <p>
                  At EdNet, we treat śūnya as an invitation to <em>vicāra</em> — thinking. What does it
                  mean for a mark to represent nothing? How can “nothing” have a mathematical role? How
                  can one symbol transform the way we write enormous numbers?
                </p>
                <p>
                  Children learn not only to use numbers, but to question the ideas behind them. Śūnya
                  becomes a <em>dvāra</em> — a doorway — into mathematical thinking: the unmanifest point
                  from which number, pattern, and logic unfold.
                </p>
              </div>

              <div className="philosophy-card">
                <h3>2. Gaṇita as Kalā and Laya — The Poetry of Chandas</h3>
                <p>
                  Long before modern textbooks, mathematical ideas in India were often carried in{' '}
                  <em>śloka</em>, language, diagrams, and carefully structured patterns. The tradition of
                  Chandas — poetic metre — also gave rise to systematic investigations of combinations.
                  The work traditionally associated with Piṅgala is especially striking for its treatment
                  of metres and the binary-like patterning of <em>guru</em> and <em>laghu</em> syllables.
                </p>
                <p>
                  This creates a living bridge between two subjects children usually meet separately:{' '}
                  <em>bhāṣā</em> and <em>gaṇita</em>. Laya becomes pattern. Pattern becomes sequence.
                  Sequence becomes combinatorics. Combinatorics becomes a way of understanding{' '}
                  <em>sambhāvanā</em> — possibility.
                </p>
                <p>
                  At EdNet, we encourage children to look for mathematics not only on a worksheet, but
                  inside cadence, structure, and idea.
                </p>
              </div>

              <div className="philosophy-card">
                <h3>3. Gaṇita as Ṛta — Reaching Toward Ananta</h3>
                <p>
                  Indian mathematicians also used gaṇita-śāstra to investigate geometry, astronomy,
                  measurement, cycles, and the natural world. The Śulba Sūtras contain geometric
                  constructions connected with altar design — <em>vedi</em> and <em>rekhā</em>. Centuries
                  later, mathematicians such as Āryabhaṭa developed methods for astronomical calculation
                  and the study of <em>kāla</em> (time) and celestial motion.
                </p>
                <p>
                  These traditions remind us that mathematics is not only a set of rules to memorise. A
                  formula describes a <em>sambandha</em> (relationship). A geometric construction reveals{' '}
                  <em>racanā</em> (structure). A sequence reveals <em>krama</em> (order). An astronomical
                  calculation turns observation into <em>bodha</em> (understanding).
                </p>
                <p>
                  And beyond every finite calculation lies a powerful mathematical idea: Ananta — अनन्त —
                  the infinite.
                </p>
              </div>
            </section>

            <section className="philosophy-section" aria-labelledby="pratijna">
              <h2 id="pratijna">Gurukula Pratijñā — The Gurukul Promise</h2>
              <h3 className="philosophy-subhead">From Āśu-gaṇana to Gambhīra Vicāra</h3>
              <p>
                There is value in computational fluency — <em>āśu-gaṇana</em>, quick and confident
                calculation. Children should become sure with numbers. But speed is only one dimension of
                mathematical ability.
              </p>
              <p>We want our students to ask:</p>
              <ul className="philosophy-steps">
                <li>Why does this work?</li>
                <li>Can I see another pattern?</li>
                <li>Can I explain it in my own words?</li>
                <li>What happens if I change the conditions?</li>
                <li>Can gaṇita connect two ideas that first seemed unrelated?</li>
              </ul>
              <p>
                That is the difference between performing a calculation and thinking mathematically —
                between <em>gaṇana</em> and <em>vicāra</em>.
              </p>
              <p>
                If you are looking only for a list of speed tricks to pass a timed test, those lessons
                are easy to find. If you want your child to build structural thinking, to look at{' '}
                <em>saṅkhyā</em> with wonder, and to connect logic with culture and darśana, welcome to
                EdNet Learn Gurukul.
              </p>
              <p>
                Our goal is not to turn children into human calculators. It is to help them become
                confident mathematical thinkers — young minds capable of seeing <em>vyavasthā</em> where
                others see complexity, asking better questions, and approaching unfamiliar problems with{' '}
                <em>jijñāsā</em> (curiosity) rather than fear.
              </p>
            </section>

            <section className="philosophy-section philosophy-closing" aria-labelledby="closing">
              <h2 id="closing">Śūnyāt Anantam</h2>
              <p>The journey begins with a symbol. Śūnya.</p>
              <p>From there comes saṅkhyā.</p>
              <p>From number comes pattern.</p>
              <p>From pattern comes structure.</p>
              <p>From structure comes bodha.</p>
              <p>
                And beyond what we can count lies Ananta — the infinite horizon of mathematical
                possibility.
              </p>
              <p className="philosophy-closing-line" lang="sa">
                <strong>Na kevalaṃ gaṇayāmaḥ — paśyāmaḥ.</strong>
              </p>
              <p>
                <em>We do not merely calculate. We learn to see.</em>
              </p>
              <p>This is the spirit of the EdNet Learn Gurukul.</p>
            </section>

            <section className="philosophy-cta" aria-labelledby="philosophy-cta-heading">
              <h2 id="philosophy-cta-heading">Begin Your 14-Day Free Trial Yātrā</h2>
              <p>
                Discover gaṇita-śāstra not as a race, but as a journey — from Śūnya to Ananta.
              </p>
              <p className="philosophy-cta-note">
                14-day free trial, then one-time ₹200. No auto-debit. Renew anytime.
              </p>
              <div className="philosophy-cta-actions">
                {onOpenRegister && (
                  <button type="button" className="philosophy-cta-primary" onClick={onOpenRegister}>
                    Start Free Trial ➔
                  </button>
                )}
                {onOpenVedicMaths && (
                  <button type="button" className="philosophy-cta-secondary" onClick={onOpenVedicMaths}>
                    Explore वैदिक-गणितम्
                  </button>
                )}
                <button
                  type="button"
                  className="philosophy-cta-secondary"
                  onClick={() => {
                    setActiveEssay('ai_sanskrit');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  🤖 Read “Why Learn Sanskrit in the Age of AI” ➔
                </button>
              </div>
            </section>
          </div>
        )}

        {/* Shared Glossary */}
        <section className="philosophy-glossary" aria-labelledby="glossary-heading">
          <button
            type="button"
            className="philosophy-glossary-toggle"
            aria-expanded={glossaryOpen}
            onClick={() => setGlossaryOpen((v) => !v)}
          >
            <span id="glossary-heading">Darśana Glossary · शब्द-कोशः</span>
            <span aria-hidden="true">{glossaryOpen ? '▾' : '▸'}</span>
          </button>
          {glossaryOpen && (
            <div className="philosophy-glossary-body">
              <table>
                <thead>
                  <tr>
                    <th scope="col">Term</th>
                    <th scope="col">Meaning</th>
                    <th scope="col">Listen</th>
                  </tr>
                </thead>
                <tbody>
                  {GLOSSARY.map((row) => (
                    <tr key={row.term}>
                      <td lang="sa">
                        <em>{row.term}</em>
                      </td>
                      <td>{row.meaning}</td>
                      <td>
                        <button
                          type="button"
                          className="philosophy-audio-btn"
                          style={{ padding: '0.1rem 0.4rem', fontSize: '0.78rem' }}
                          onClick={() => handlePlayAudio(row.term.split('/')[0].trim())}
                          title={`Listen to ${row.term}`}
                        >
                          🔊
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </article>
  );
};

export default PhilosophyPage;
