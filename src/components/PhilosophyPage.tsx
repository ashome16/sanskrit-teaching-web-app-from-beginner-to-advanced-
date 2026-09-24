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
  { term: 'japa', meaning: 'meditative repetition of a mantra, verse, or syllable' },
  { term: 'ṛṣi', meaning: 'seer; investigator who observed inner mind-states through isolated speech' },
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

            {/* Opening */}
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

            {/* Evolution is not permission to discard the older work */}
            <section className="philosophy-section" aria-labelledby="evolution-work">
              <h2 id="evolution-work">Evolution is Not Permission to Discard the Older Work</h2>
              <p>
                Life did not arrive last Tuesday. Molecular and cellular lineages that make a nervous
                system possible run on the scale of billions of years. Bodies that stand, breathe, and
                speak were shaped over millions of years. The larynx, the ear, the long vagus, the
                coupling of breath to heart — these are not legacy features waiting to be deprecated
                by a software update.
              </p>
              <p>
                On top of that anatomy, human cultures spent millennia doing something software still
                treats as optional: holding sound still long enough to study it. Sanskrit is one of
                the densest records of that work. Phonetics (<em>śikṣā</em>{' '}
                <AudioChip term="शिक्षा" label="शिक्षा" />), meter (<em>chandas</em>{' '}
                <AudioChip term="छन्दः" label="छन्दः" />), grammar, oral error-correction, mantra as
                a controlled use of speech — thousands of years of research and practice went into
                making language an instrument, not only a chat protocol.
              </p>

              {/* Evolutionary Timescales Breakdown */}
              <div className="philosophy-timescale-grid" aria-label="Timescales of Human Speech Evolution">
                <div className="philosophy-timescale-card">
                  <span className="philosophy-timescale-time">Billions of Years</span>
                  <div className="philosophy-timescale-title">🌌 The Brain</div>
                  <p className="philosophy-timescale-desc">
                    Cellular and neurological lineages that make conscious perception possible.
                  </p>
                </div>
                <div className="philosophy-timescale-card">
                  <span className="philosophy-timescale-time">Millions of Years</span>
                  <div className="philosophy-timescale-title">🫁 The Speaking Body</div>
                  <p className="philosophy-timescale-desc">
                    Larynx, inner ear, long vagus nerve, and coupling of breath to heart.
                  </p>
                </div>
                <div className="philosophy-timescale-card">
                  <span className="philosophy-timescale-time">Thousands of Years</span>
                  <div className="philosophy-timescale-title">📜 Sanskrit Craft</div>
                  <p className="philosophy-timescale-desc">
                    Śikṣā phonetics, Pāṇinian grammar, chandas, and controlled acoustic mantra.
                  </p>
                </div>
                <div className="philosophy-timescale-card">
                  <span className="philosophy-timescale-time">Months</span>
                  <div className="philosophy-timescale-title">⚡ Artificial Intelligence</div>
                  <p className="philosophy-timescale-desc">
                    Model checkpoints, translation engines, speed, and synthetic thought-links.
                  </p>
                </div>
              </div>

              <p>
                AI will keep evolving in months. That speed is real. It does not entitle us to throw
                away the slower inheritances. Evolution, in a living species, is addition and
                refinement — not a factory reset. We can add translation, tutors, and even
                thought-links. We should not give up the mouth, the meter, or the discipline that
                taught a civilisation how to bind mind to sound.
              </p>
              <p>
                <strong>
                  To continue evolving is to carry the older timescales with us, not to declare them
                  obsolete because a new layer is faster.
                </strong>
              </p>
            </section>

            {/* Two kinds of communication */}
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
                it: the length of the exhale, the vibration in the chest, the exact place of the
                tongue, the state of the person who is speaking. Two people can send the same content.
                Only one of them is present in the sound.
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
                Systems make the first kind efficient and uniform. They do not automatically carry
                uniqueness, aliveness, or the conscious state of the speaker. If we treat language as
                obsolete the moment transfer is solved, we keep the packet and lose the person — and
                we waste the anatomy that took geological time to build.
              </p>
            </section>

            {/* What AI can do — and what it flattens */}
            <section className="philosophy-section" aria-labelledby="what-ai-flattens">
              <h2 id="what-ai-flattens">What AI Can Do — and What It Flattens</h2>
              <p>
                AI can already draft, translate, summarise, and tutor. It can give you a gloss of a
                verse and a plausible English sentence. Used well, it removes fear and delay from the
                early stages of study. Used as a replacement, it turns every language into an
                interchangeable code.
              </p>
              <p>
                A translated sentence can be correct and still hollow. Humour, register, mantra, and
                philosophical precision do not travel as cargo. They live in how a language cuts the
                world. Sanskrit does not merely name things English already knows. It trains a
                different grain of attention: sandhi as joining, vibhakti as relation, dhātu as root
                action, śabda as sound that is also meaning.
              </p>

              <div className="philosophy-grain-grid">
                <div className="philosophy-grain-card">
                  <div className="philosophy-grain-header">
                    <span className="philosophy-grain-sanskrit">संधिः</span>
                    <span className="philosophy-grain-label">Sandhi · Joining</span>
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
                    <span className="philosophy-grain-label">Vibhakti · Relation</span>
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
                    <span className="philosophy-grain-label">Dhātu · Root Action</span>
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
                If no one studies languages except through a model, cultural knowledge moves into the
                machine and out of us. We will talk through other worlds instead of inhabiting them.
                The thousands of years of practice become a dataset. That is storage. It is not
                transmission of a living skill.
              </p>
            </section>

            {/* Why Sanskrit is a special case in this age */}
            <section className="philosophy-section" aria-labelledby="special-case">
              <h2 id="special-case">Why Sanskrit Is a Special Case in This Age</h2>
              <p>
                Sanskrit is often introduced as “ancient” or “liturgical.” Those labels hide its
                usefulness now. It is not a museum language. It is one of the longest-running human
                attempts to make speech precise enough to think with.
              </p>

              <div className="philosophy-card">
                <h3>It is a designed instrument of speech</h3>
                <p>
                  The science of <em>śikṣā</em> (<AudioChip term="शिक्षा" label="शिक्षा" />) treats
                  letter, tone, duration, force, and continuity as things that can be held still.
                  Ordinary conversation changes too many variables at once — new words, social
                  threat, planning the next line. A mantra or a carefully recited verse is
                  low-novelty, rhythmic speech. That is why it can be used as a practice, not only as
                  a message. The <em>ṛṣi</em> (<AudioChip term="ऋषिः" label="ऋषिः" />) experiment was
                  not a laboratory with scanners. It was speech isolated so that mind-state could be
                  observed.
                </p>
              </div>

              <div className="philosophy-card">
                <h3>It keeps a path from outer sound to inner seeing</h3>
                <p>
                  Tradition names levels of <em>vāk</em>: <em>vaikharī</em> (audible),{' '}
                  <em>madhyamā</em> (inner speech), <em>paśyantī</em> (the impulse before words),{' '}
                  <em>parā</em> (speech not yet split). Learning Sanskrit with the mouth, not only with
                  a subtitle, is how a modern student still walks that path.
                </p>
                <p>
                  The temple <em>darśana</em> — seeing a form — is the tool for those who need an
                  outer support. The seer’s work is inner observation. Language study can serve both:
                  first the tool, then the seeing.
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
                <h3>The point is the principle of use, not a secret string of syllables</h3>
                <p>
                  Many mantras are already public. When a teacher still gives one in a closed way,
                  what is transmitted is not a rare password. It is a rule of use: this sound, this
                  breath, this constraint, this relationship. Two people can pronounce the same line.
                  Only one of them has accepted it as an instrument that must stay still.
                </p>
                <p>
                  <strong>
                    An app can print the words. It cannot replace that principle — but it can refuse
                    to treat the words as content to swipe past.
                  </strong>
                </p>
              </div>
            </section>

            {/* What you actually gain by learning it */}
            <section className="philosophy-section" aria-labelledby="what-you-gain">
              <h2 id="what-you-gain">What You Actually Gain by Learning It</h2>
              <p>
                You gain a second channel in a world that will otherwise offer you only the efficient
                one.
              </p>
              <ul className="philosophy-steps">
                <li>
                  <strong>You learn to hear structure:</strong> how sounds join, how a case ending
                  places a noun in a relation, how a compact verse holds more than a paraphrase. That
                  skill transfers. It makes you a better reader of any language, including the
                  outputs of models — because you can tell a gloss from an inhabiting.
                </li>
                <li>
                  <strong>You keep a living link:</strong> to texts that do not survive as
                  “information.” A hymn, a sūtra, a definition in a śāstra is not a tweet waiting to
                  be summarised. It is a form. Learning the language is how you stop outsourcing the
                  form to a system that has never sat still with it.
                </li>
                <li>
                  <strong>You honour the body you actually have:</strong> Repetition that looks
                  inefficient — japa (<AudioChip term="जप" label="जप" />), recitation, sandhi drills
                  — is inefficient only if the goal is throughput. If the goal is a mind that can stay
                  with one thing, using the throat and the ear that evolution already gave you, the old
                  method is still the right tool.
                </li>
              </ul>
              <p>
                <strong>
                  Meeting a language with the mouth is how a fast species stays faithful to a slow
                  one: itself.
                </strong>
              </p>
            </section>

            {/* How to learn in the AI age without becoming the machine */}
            <section className="philosophy-section" aria-labelledby="how-to-learn">
              <h2 id="how-to-learn">How to Learn in the AI Age Without Becoming the Machine</h2>

              <div className="philosophy-card">
                <h3>Use translation and tutors as scaffolding. Do not use them as the temple.</h3>
                <p>
                  Let models explain confusing grammar, generate drills, or provide scaffolding. But
                  never let the tool replace the friction of your own parsing.
                </p>
              </div>

              <div className="philosophy-card">
                <h3>Read aloud. Even a short line.</h3>
                <p>
                  The bind of speech — motor, ear, breath — does not happen on a silent screen. If
                  you only ever tap “show meaning,” you have used the transfer channel and skipped the
                  living one.
                </p>
              </div>

              <div className="philosophy-card">
                <h3>Keep one inefficient practice</h3>
                <p>
                  A verse, a nāma, a sandhi pattern returned to until it is in the mouth, not only in
                  history. Let the model quiz you. Do not let it chant for you.
                </p>
              </div>

              <div className="philosophy-card">
                <h3>Treat the app as a container that should get quieter as you grow, not louder</h3>
                <p>
                  Streaks and scores are for memory. They are not a measure of <em>darśana</em>.
                </p>
              </div>
            </section>

            {/* A design rule for this moment */}
            <section className="philosophy-section" aria-labelledby="design-rule">
              <h2 id="design-rule">A Design Rule for This Moment</h2>
              <p>
                Make the channel efficient for sharing. Keep a path that is inefficient enough to
                stay unique, alive, and honest about the state of the mind that is speaking.
              </p>
              <p>
                Sanskrit is one of the few languages still taught, in many homes and gurukuls, as that
                second path: not only so you can be understood, but so you can inhabit a way of
                cutting sound and meaning that machines can imitate and cannot replace.
              </p>
              <p>
                Learn it because the age of AI will make language optional as a survival skill. That
                is exactly when it becomes necessary as a human one. Billions of years made the
                possibility of a brain. Millions of years made a speaking body. Thousands of years
                made Sanskrit into a craft. Evolution, if it is wise, does not throw those layers
                away. It learns to speak from them.
              </p>

              <div className="philosophy-callout" style={{ textAlign: 'center', padding: '1.25rem' }}>
                <p style={{ margin: '0 0 0.35rem', fontSize: '1.2rem', fontWeight: 800, color: '#9a3412' }}>
                  AI will give you the translation.
                </p>
                <p style={{ margin: 0, fontSize: '1.45rem', fontWeight: 900, color: '#1e293b' }}>
                  Only you can give yourself the voice.
                </p>
              </div>
            </section>

            {/* For learners on this app */}
            <div className="philosophy-learner-box">
              <h3>For Learners on this App</h3>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.6, color: '#134e4a', margin: '0 0 1rem' }}>
                <strong>Start with sound.</strong> One line spoken slowly is worth a page of instant
                gloss. Use the tools here to see grammar clearly — then close the explanation and say
                the verse until the mouth knows it.
              </p>
              <p style={{ fontSize: '1.02rem', lineHeight: 1.6, color: '#134e4a', margin: '0 0 1.25rem' }}>
                That is the difference between having Sanskrit on your phone and having Sanskrit in your
                speech. The phone is new. The speech is older than every empire that tried to replace
                it.
              </p>

              <div className="philosophy-action-buttons">
                {onOpenVarnamala && (
                  <button type="button" className="philosophy-action-btn" onClick={onOpenVarnamala}>
                    🔤 Alphabet &amp; Syllables Masterclass
                  </button>
                )}
                {onOpenReader && (
                  <button type="button" className="philosophy-action-btn" onClick={onOpenReader}>
                    📖 NCERT Deepakam Living Reader
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
