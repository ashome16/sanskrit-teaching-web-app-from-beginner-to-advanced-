import React, { useEffect, useState } from 'react';
import BodhiAvatar from './BodhiAvatar';
import { MANTRAS_ADDENDUM_ID } from '../data/mantrasShlokas';
import '../styles/philosophy.css';
import { playPronunciation } from '../utils/pronunciation';
import {
  PingalaPrastaraTruthTable,
  PingalaNastamUddistamCodec,
  PingalaMeruPyramid,
} from './PingalaInteractiveTools';
import { TurangaBandhaChessboard } from './TurangaBandhaChessboard';
import { LilavatiPoeticMathStudio } from './LilavatiPoeticMathStudio';

export interface PhilosophyPageProps {
  onOpenRegister?: () => void;
  onOpenVedicMaths?: () => void;
  onOpenVarnamala?: () => void;
  onOpenReader?: () => void;
  onGoHome?: () => void;
  onOpenGrammarArticle?: (articleId: string) => void;
  /** Open a Course Addendum unit (e.g. Mantras & Ślokas). */
  onOpenCourseAddendum?: (addendumId: string) => void;
  initialEssay?: 'ai_sanskrit' | 'sunyat_anantam' | 'tagore_sanskrit' | 'music_of_matter' | 'pingala_binary' | 'turanga_bandha' | 'lilavati_math';
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
  { term: 'guru / guru-paramparā', meaning: 'living unbroken lineage of transmission; the human who has held sound until it changed them, passing sound with its rule of use' },
  { term: 'prāṇa', meaning: 'living breath carrying vibration and intention in speech; the vital current moving through body and world' },
  { term: 'śānti', meaning: 'from verbal root √śam (to quiet, to still, to bring to rest); not passive “calm” or a wellness mood, but the active stilling of whatever would stop the teaching from landing — in the body, between teacher and student, and in the world around them' },
  { term: 'adhikāra', meaning: 'conscious standing, fitness, and answerability; the inner vessel and duty required before knowledge can be received without turning into harm or display' },
  { term: 'tatsama (तत्सम)', meaning: 'direct Sanskrit loanword preserved without phonetic modification across modern Indian languages' },
  { term: 'chirasārathi (चिरसारथि)', meaning: 'the eternal charioteer; Puranic epithet for Kṛṣṇa guiding human destiny through historical struggle' },
  { term: 'pārthasārathī (पार्थसारथि)', meaning: 'Kṛṣṇa as divine charioteer to Arjuna (Pārtha) on the Kurukṣetra battlefield in the Bhagavad Gītā' },
  { term: 'dvā suparṇā (द्वा सुपर्णा)', meaning: 'the two birds of Muṇḍaka Upaniṣad 3.1.1 & Ṛgveda 1.164.20: the enjoying Jīva and the witnessing Paramātman' },
  { term: 'pañcajanya (पाञ्चजन्य)', meaning: 'the sacred conch of victory and righteousness blown by Śrī Kṛṣṇa in the Mahābhārata' },
  { term: 'prakṛti-gīti (प्रकृतिगीति)', meaning: 'songs and poems celebrating Nature as a living manifestation of cosmic consciousness (Brahman)' },
  { term: 'nāda brahma (नादब्रह्म)', meaning: 'the primal truth that the universe is fundamentally vibrational sound; cosmic acoustic consciousness' },
  { term: 'yathā piṇḍe tathā brahmāṇḍe (यथा पिण्डे तथा ब्रह्माण्डे)', meaning: 'as is the individual vessel (microcosm), so is the cosmic universe (macrocosm); the holographic principle of Vedic cosmology' },
  { term: 'cymatics (शब्द-दृश्य-विज्ञानम्)', meaning: 'the scientific study of visible sound, showing how acoustic frequencies organize chaotic matter into symmetrical standing geometric waves' },
  { term: 'yantra (यन्त्रम्)', meaning: 'sacred geometric diagram acting as the spatial standing-wave matrix generated by an acoustic sound (Mantra)' },
  { term: 'śrī chakra (श्रीचक्रम्)', meaning: 'the supreme sacred geometric yantra formed by 9 interlocking triangles radiating from a central Bindu, embodying cosmic vibration' },
  { term: 'vāstu śāstra (वास्तुशास्त्रम्)', meaning: 'the classical Indian architectural science that uses circle, square, and triangle geometries as functional acoustic lenses for energy alignment' },
  { term: 'ānanda (आनन्दः)', meaning: 'uncaused cosmic joy; the primordial creative impulse that sings the universe and all its geometric forms into existence' },
  { term: 'laghu (लघु)', meaning: 'light, short syllable of 1 mātrā (beat); encoded mathematically as 0 in binary meters' },
  { term: 'guru (गुरु)', meaning: 'heavy, long syllable of 2 mātrās (beats); encoded mathematically as 1 in binary meters' },
  { term: 'prastāra (प्रस्तारः)', meaning: 'systematic algorithmic expansion generating all 2ⁿ metric permutations without omission (binary truth table)' },
  { term: 'naṣṭam (नष्टम्)', meaning: 'the lost meter algorithm; converts a decimal row index into its exact binary syllable sequence via repeated halving' },
  { term: 'uddiṣṭam (उद्दिष्टम्)', meaning: 'the indicated number algorithm; converts a binary syllable sequence into its exact decimal row position via repeated doubling' },
  { term: 'meru prastāra (मेरु-प्रस्तारः)', meaning: 'the staircase of Mount Meru; combinatorial pyramid generating binomial coefficients (Pascal’s Triangle, c. 300 BCE)' },
  { term: 'dvirūpam (द्विरूपम्)', meaning: 'binary exponentiation; computing powers of 2 (2ⁿ) in logarithmic time O(log n)' },
  { term: 'chhandas śāstra (छन्दःशास्त्रम्)', meaning: 'the Vedic science of poetic meter and rhythmic combinatorics authored by Achārya Piṅgala' },
  { term: 'chitra-kāvya (चित्रकाव्यम्)', meaning: 'pictorial, constrained poetry; arranging syllables to fit geometric grids, matrices, wheels, and chessboards' },
  { term: 'turaṅga-bandha (तुरङ्गबन्धः)', meaning: 'the horse-binding or knight’s tour pattern; traversing an 8x4 half-chessboard using chess knight moves to reveal a second hidden verse' },
  { term: 'chaturaṅga (चतुरङ्गम्)', meaning: 'the ancient Indian ancestor of chess representing the four limbs of an army: infantry, cavalry, elephants, and chariots' },
  { term: 'hamiltonian path (हैमिल्टन-मार्गः)', meaning: 'a topological graph trajectory visiting every square/vertex of a board exactly once without duplication or omission' },
  { term: 'śrī pādukā sahasram (श्रीपादुकासहस्रम्)', meaning: 'Śrī Vedānta Deśika’s 1,008-verse masterpiece celebrating the divine sandals of Lord Ranganatha, featuring the iconic Verses 929 & 930' },
  { term: 'līlāvatī (लीलावती)', meaning: '12th-century foundational treatise on arithmetic, algebra, and geometry by Bhāskarāchārya, framed as poetic riddles addressed to his daughter' },
  { term: 'bhāskarāchārya / bhāskara ii (भास्कराचार्यः)', meaning: 'master 12th-century Indian mathematician-astronomer (1114 CE), author of Siddhānta Śiromaṇi, pioneer of differential calculus foundations' },
  { term: 'rasa / vismaya (रसः / विस्मयः)', meaning: 'aesthetic essence and wonder; Bhāskara’s pedagogy proving mathematics must evoke joyful contemplation (Ānanda) rather than mental burnout' },
  { term: 'alisaṅkhyā (अलिसङ्ख्या)', meaning: 'the classic riddle of the swarming bees; resolving multi-step radical quadratic equations through woodland poetry' },
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

const TAGORE_ESSAY_TITLE =
  'The Eternal Charioteer and the Cage Bird: Rabindranath Tagore & Sanskrit · Darśana | EdNet Learn Gurukul';
const TAGORE_ESSAY_DESC =
  'How Sanskrit and the Upanishads shaped Rabindranath Tagore’s creative genius: Jana Gana Mana’s Tatsama architecture, the Gita’s Chirasarathi, Dui Pakhi & Mundaka Upanishad.';

const MUSIC_OF_MATTER_TITLE =
  'The Music of Matter: Cymatics, Sacred Geometry & Holographic Universe · Darśana | EdNet Learn Gurukul';
const MUSIC_OF_MATTER_DESC =
  'From Nāda Brahma to Hans Jenny’s tonoscope: discover how sound waves crystallize into sacred geometry, Fibonacci floral mandalas, and quantum holographic reality.';

const PINGALA_ESSAY_TITLE =
  'The Binary Blueprint: How Piṅgala’s Chhandas Śāstra Anticipated Computer Science · Darśana | EdNet Learn Gurukul';
const PINGALA_ESSAY_DESC =
  'From Laghu (0) and Guru (1) to Prastāra truth tables, Naṣṭam/Uddiṣṭam codecs, and Meru Prastāra (Pascal’s Triangle): discover ancient India’s foundational computer science.';

const TURANGA_ESSAY_TITLE =
  'The Architecture of Sound and Strategy: Knight’s Tours in Classical Sanskrit Poetry · Darśana | EdNet Learn Gurukul';
const TURANGA_ESSAY_DESC =
  'Euler anticipated by 900 years: discover how Rudraṭa (9th c.) and Vedānta Deśika (14th c.) solved the Knight’s Tour on an 8x4 half-chessboard across Pādukā Sahasram 929–930.';

const LILAVATI_ESSAY_TITLE =
  'The Poetic Equation: How Bhāskarāchārya’s Līlāvatī Turned Mathematics into Art · Darśana | EdNet Learn Gurukul';
const LILAVATI_ESSAY_DESC =
  'Shattering the science-art divide: explore how Bhāskara II (1114 CE) cloaked multi-step quadratic equations, fractions, and geometry in the romantic imagery of nature.';

const PhilosophyPage: React.FC<PhilosophyPageProps> = ({
  onOpenRegister,
  onOpenVedicMaths,
  onOpenVarnamala,
  onOpenReader,
  onGoHome,
  onOpenGrammarArticle,
  onOpenCourseAddendum,
  initialEssay = 'ai_sanskrit',
}) => {
  const [activeEssay, setActiveEssay] = useState<'ai_sanskrit' | 'sunyat_anantam' | 'tagore_sanskrit' | 'music_of_matter' | 'pingala_binary' | 'turanga_bandha' | 'lilavati_math'>(initialEssay);
  const [glossaryOpen, setGlossaryOpen] = useState(false);

  useEffect(() => {
    if (initialEssay) {
      setActiveEssay(initialEssay);
    }
  }, [initialEssay]);

  useEffect(() => {
    let currentTitle = AI_ESSAY_TITLE;
    let currentDesc = AI_ESSAY_DESC;
    if (activeEssay === 'sunyat_anantam') {
      currentTitle = MATH_ESSAY_TITLE;
      currentDesc = MATH_ESSAY_DESC;
    } else if (activeEssay === 'tagore_sanskrit') {
      currentTitle = TAGORE_ESSAY_TITLE;
      currentDesc = TAGORE_ESSAY_DESC;
    } else if (activeEssay === 'music_of_matter') {
      currentTitle = MUSIC_OF_MATTER_TITLE;
      currentDesc = MUSIC_OF_MATTER_DESC;
    } else if (activeEssay === 'pingala_binary') {
      currentTitle = PINGALA_ESSAY_TITLE;
      currentDesc = PINGALA_ESSAY_DESC;
    } else if (activeEssay === 'turanga_bandha') {
      currentTitle = TURANGA_ESSAY_TITLE;
      currentDesc = TURANGA_ESSAY_DESC;
    } else if (activeEssay === 'lilavati_math') {
      currentTitle = LILAVATI_ESSAY_TITLE;
      currentDesc = LILAVATI_ESSAY_DESC;
    }

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
      activeEssay === 'tagore_sanskrit'
        ? 'https://ednetlearn.in/philosophy/tagore-sanskrit-charioteer.jpg'
        : activeEssay === 'music_of_matter'
        ? 'https://ednetlearn.in/philosophy/music-of-matter-cymatics.jpg'
        : activeEssay === 'pingala_binary'
        ? 'https://ednetlearn.in/philosophy/pingala-binary-blueprint.jpg'
        : activeEssay === 'turanga_bandha'
        ? 'https://ednetlearn.in/philosophy/turanga-bandha-knights-tour.jpg'
        : activeEssay === 'lilavati_math'
        ? 'https://ednetlearn.in/philosophy/lilavati-poetic-equation.jpg'
        : 'https://ednetlearn.in/philosophy/sunyat-anantam-mandala.webp';
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
          {onOpenGrammarArticle && (
            <button
              type="button"
              className="philosophy-crumb-btn"
              onClick={() => onOpenGrammarArticle('sanskrit-in-english')}
              title="Grammar Shelf · Sanskrit's Quiet Imprint on English"
            >
              🌍 Sanskrit in English
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
          <button
            type="button"
            className={`philosophy-essay-tab ${activeEssay === 'tagore_sanskrit' ? 'active' : ''}`}
            onClick={() => {
              setActiveEssay('tagore_sanskrit');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span className="philosophy-essay-tab-icon" aria-hidden="true">🪕</span>
            <div>
              <span className="philosophy-essay-tab-title">The Eternal Charioteer &amp; The Cage Bird</span>
              <span className="philosophy-essay-tab-sub">Tagore’s Creative Genius · Jana Gana Mana &amp; Dui Pakhi</span>
            </div>
          </button>
          <button
            type="button"
            className={`philosophy-essay-tab ${activeEssay === 'music_of_matter' ? 'active' : ''}`}
            onClick={() => {
              setActiveEssay('music_of_matter');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span className="philosophy-essay-tab-icon" aria-hidden="true">🔔</span>
            <div>
              <span className="philosophy-essay-tab-title">The Music of Matter: Cymatics &amp; Sacred Geometry</span>
              <span className="philosophy-essay-tab-sub">Nāda Brahma · Tonoscope · Yathā Piṇḍe Tathā Brahmāṇḍe</span>
            </div>
          </button>
          <button
            type="button"
            className={`philosophy-essay-tab ${activeEssay === 'pingala_binary' ? 'active' : ''}`}
            onClick={() => {
              setActiveEssay('pingala_binary');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span className="philosophy-essay-tab-icon" aria-hidden="true">⚡</span>
            <div>
              <span className="philosophy-essay-tab-title">The Binary Blueprint: Piṅgala &amp; Computer Science</span>
              <span className="philosophy-essay-tab-sub">Chhandas Śāstra · Laghu (0) &amp; Guru (1) · Prastāra · Meru Prastāra</span>
            </div>
          </button>
          <button
            type="button"
            className={`philosophy-essay-tab ${activeEssay === 'turanga_bandha' ? 'active' : ''}`}
            onClick={() => {
              setActiveEssay('turanga_bandha');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span className="philosophy-essay-tab-icon" aria-hidden="true">♞</span>
            <div>
              <span className="philosophy-essay-tab-title">Sound &amp; Strategy: Knight’s Tours in Sanskrit Poetry</span>
              <span className="philosophy-essay-tab-sub">चित्रकाव्यम् · तुरङ्गबन्धः · Pādukā Sahasram 929–930 · 8×4 Matrix</span>
            </div>
          </button>
          <button
            type="button"
            className={`philosophy-essay-tab ${activeEssay === 'lilavati_math' ? 'active' : ''}`}
            onClick={() => {
              setActiveEssay('lilavati_math');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span className="philosophy-essay-tab-icon" aria-hidden="true">🪷</span>
            <div>
              <span className="philosophy-essay-tab-title">The Poetic Equation: Bhāskara’s Līlāvatī</span>
              <span className="philosophy-essay-tab-sub">Math into Art · Swarm of Bees · Broken Necklace · Peacock &amp; Lotus</span>
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
                  <span className="philosophy-timescale-time">Unbroken Lineage</span>
                  <div className="philosophy-timescale-title">🪔 Guru-Paramparā</div>
                  <p className="philosophy-timescale-desc">
                    Living transmission: sound bound to breath, prāṇa, and a personal rule of use.
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

            {/* Bridge: The Study-Bond & Guru-Paramparā in the Course */}
            <div className="philosophy-callout philosophy-mantras-pointer" style={{ borderLeftColor: "#b45309", background: "#fff7ed", margin: "1.5rem 0 2rem" }}>
              <p style={{ margin: "0 0 0.45rem", fontWeight: 800, color: "#9a3412", fontSize: "1.05rem" }}>
                🪔 The Living Covenant: Guru-Paramparā, Saha Nāv Avatu &amp; Śabda-Brahman
              </p>
              <p style={{ margin: "0 0 0.65rem", color: "#451a03", fontSize: "0.98rem", lineHeight: 1.6 }}>
                The full exegesis of why the guru is not a faster model, the two premises of knowledge with duty (<em>adhikāra</em>), the dual grammar of <em>saha nāv avatu</em>, and the living ethic of <em>Śabda-Brahman</em> and <em>Bhūmi Vandanam</em> now live in the Course curriculum with interactive recitation.
              </p>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
                <a
                  href="/course#addendum-prologue-saha-nav-avatu"
                  className="philosophy-action-btn"
                  style={{ display: "inline-block", textDecoration: "none" }}
                  onClick={(e) => {
                    if (onOpenCourseAddendum) {
                      e.preventDefault();
                      onOpenCourseAddendum("addendum-prologue-saha-nav-avatu");
                    }
                  }}
                >
                  🤝 Study the Living Covenant in the Course ➔
                </a>
                <a
                  href="/course#mantras"
                  className="philosophy-action-btn"
                  style={{ display: "inline-block", textDecoration: "none", background: "transparent", color: "#9a3412", border: "1px solid #fdba74" }}
                  onClick={(e) => {
                    if (onOpenCourseAddendum) {
                      e.preventDefault();
                      onOpenCourseAddendum(MANTRAS_ADDENDUM_ID);
                    }
                  }}
                >
                  🪔 Recite the Mantras &amp; Ślokas ➔
                </a>
              </div>
            </div>

            {/* Why Sanskrit is a special case in this age */}
            <section className="philosophy-section" aria-labelledby="special-case">
              <h2 id="special-case">Why Sanskrit Is a Special Case in This Age</h2>
              <p>
                Sanskrit is often introduced as “ancient” or “liturgical.” Those labels hide its usefulness
                now. It is not a museum language. It is one of the longest-running human attempts to make
                speech precise enough to think with.
              </p>

              <div className="philosophy-card">
                <h3>It is a designed instrument of speech</h3>
                <p>
                  <em>Śikṣā</em> (<AudioChip term="शिक्षा" label="शिक्षा" />) treats letter, tone,
                  duration, force, and continuity as things that can be held still. Ordinary conversation
                  changes too many variables at once; a carefully recited verse is low-novelty, rhythmic
                  speech. That is why it can be a practice and not only a message. The <em>ṛṣi</em>{' '}
                  (<AudioChip term="ऋषिः" label="ऋषिः" />) experiment was not a laboratory with scanners.
                  It was speech isolated so that mind-state could be observed.
                </p>
              </div>

              <div className="philosophy-card">
                <h3>It keeps a path from outer sound to inner seeing</h3>
                <p>
                  Tradition names four levels of <em>vāk</em>. Learning Sanskrit with the mouth, not only
                  with a subtitle, is how a modern student still walks that path — first the tool, then the
                  seeing.
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
            </section>

            {/* What you gain — and how to learn without becoming the machine */}
            <section className="philosophy-section" aria-labelledby="what-you-gain">
              <h2 id="what-you-gain">What You Gain — and How to Learn Without Becoming the Machine</h2>
              <p>
                You gain a second channel in a world that will otherwise offer you only the efficient one.
              </p>
              <ul className="philosophy-steps">
                <li>
                  <strong>You learn to hear structure:</strong> how sounds join, how a case ending places a
                  noun in relation, how a compact verse holds more than a paraphrase. That skill makes you a
                  better reader of any language — including a model’s output — because you can tell a gloss
                  from an inhabiting.
                </li>
                <li>
                  <strong>You keep a living link</strong> to texts that do not survive as “information.” A
                  hymn, a sūtra, a definition in a śāstra is a form, not a tweet waiting to be summarised.
                </li>
                <li>
                  <strong>You honour the body you actually have:</strong> japa (<AudioChip term="जप" label="जप" />),
                  recitation, and sandhi drills are inefficient only if the goal is throughput. If the goal is
                  a mind that can stay with one thing, the old method is still the right tool.
                </li>
              </ul>
              <div className="philosophy-card">
                <h3>Use AI as scaffolding, not as the temple</h3>
                <p>
                  Let models explain confusing grammar and generate drills; never let them replace the
                  friction of your own parsing, or the living teacher when you have one. <strong>Read aloud</strong>,
                  even a short line — the bind of speech does not happen on a silent screen. <strong>Keep one
                  inefficient practice</strong>: a verse, a nāma, a sandhi pattern returned to until it is in
                  the mouth. Let the model quiz you; do not let it chant for you. And treat the app as a
                  container that should get quieter as you grow: streaks and scores are for memory, not a
                  measure of <em>darśana</em>, and not a guru.
                </p>
              </div>
              <p>
                <strong>
                  Meeting a language with the mouth is how a fast species stays faithful to a slow one: itself.
                </strong>
              </p>
            </section>

            {/* A design rule for this moment */}
            <section className="philosophy-section" aria-labelledby="design-rule">
              <h2 id="design-rule">A Design Rule for This Moment</h2>
              <p>
                Make the channel efficient for sharing. Keep a path that is inefficient enough to stay
                unique, alive, and honest about the state of the mind that is speaking. Sanskrit is one of
                the few languages still taught, in many homes and gurukuls, as that second path.
              </p>
              <p>
                Learn it because the age of AI will make language optional as a survival skill. That is
                exactly when it becomes necessary as a human one. Billions of years made the possibility of
                a brain. Millions of years made a speaking body. Thousands of years made Sanskrit into a
                craft. A living paramparā kept that craft from becoming only text. Evolution, if it is wise,
                does not throw those layers away. It learns to speak from them.
              </p>

              <div className="philosophy-callout" style={{ textAlign: 'center', padding: '1.25rem' }}>
                <p style={{ margin: '0 0 0.35rem', fontSize: '1.2rem', fontWeight: 800, color: '#9a3412' }}>
                  AI will give you the translation.
                </p>
                <p style={{ margin: '0 0 0.45rem', fontSize: '1.45rem', fontWeight: 900, color: '#1e293b' }}>
                  Only you can give yourself the voice.
                </p>
                <p style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#0f766e' }}>
                  And only a living teacher can show you that the voice is not an output — it is prāṇa, thought, and purpose made audible.
                </p>
              </div>
            </section>

            {/* For learners on this app */}
            <div className="philosophy-learner-box">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
                <BodhiAvatar mood="reading" size="sm" showHalo={false} />
                <h3 style={{ margin: 0 }}>For Learners on this App — Bodhi’s Study Note</h3>
              </div>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.6, color: '#134e4a', margin: '0 0 1rem' }}>
                <strong>Start with sound.</strong> One line spoken slowly is worth a page of instant
                gloss. Use the tools here to see grammar clearly — then close the explanation and say
                the verse until the mouth knows it.
              </p>
              <p style={{ fontSize: '1.02rem', lineHeight: 1.6, color: '#134e4a', margin: '0 0 1.25rem' }}>
                <strong>When you can, receive a line from a living teacher and keep its rule of use.</strong> That is the difference between having Sanskrit on your phone and having Sanskrit in your
                speech. The phone is new. The speech is older than every empire that tried to replace
                it. <strong>The guru is the reason the speech did not die when the page was printed.</strong>
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

            {onOpenGrammarArticle && (
              <div className="philosophy-related-reading" style={{ margin: '1.5rem 0', textAlign: 'center' }}>
                <button
                  type="button"
                  className="philosophy-crumb-btn"
                  onClick={() => onOpenGrammarArticle('sanskrit-in-english')}
                  title="Open Grammar Shelf — Sanskrit's Quiet Imprint on English"
                >
                  🌍 Related reading: Sanskrit's Quiet Imprint on English ➔
                </button>
              </div>
            )}

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

        {/* =========================================================================
            ESSAY 3: The Eternal Charioteer and the Cage Bird: Rabindranath Tagore & Sanskrit
           ========================================================================= */}
        {activeEssay === 'tagore_sanskrit' && (
          <div className="philosophy-essay-body">
            <header className="philosophy-hero">
              <span className="philosophy-kicker">Gurukul Darśana · Masterclass 5 · साहित्यम्</span>
              <h1 className="philosophy-title">
                The Eternal Charioteer and the Cage Bird
              </h1>
              <p className="philosophy-mantra">
                चिरसारथिः पञ्जरस्थविहगश्च — रवीन्द्रनाथस्य काव्यप्रतिभायाम् उपनिषदः
              </p>
              <p className="philosophy-secondary">
                How Sanskrit and the Upanishads Shaped Rabindranath Tagore’s Creative Genius
              </p>

              <blockquote className="philosophy-pull-quote" style={{ maxWidth: '42rem', margin: '1.25rem auto 0.75rem' }}>
                <p>
                  “To fully understand Tagore's masterpieces, including India's national anthem Jana Gana
                  Mana, one must look past surface-level translations. By exploring his foundational upbringing,
                  his structural use of Tatsama Sanskrit, and his creative adaptations of Vedic philosophy, we
                  unlock the deep roots connecting modern Indian identity with its most ancient wisdom.”
                </p>
              </blockquote>

              <div className="philosophy-journey" style={{ marginTop: '1rem' }}>
                <AudioChip term="चिरसारथिः" label="चिरसारथिः" />
                <span className="philosophy-mantra-sep">·</span>
                <AudioChip term="पार्थसारथिः" label="पार्थसारथिः" />
                <span className="philosophy-mantra-sep">·</span>
                <AudioChip term="उपनिषद्" label="उपनिषद्" />
                <span className="philosophy-mantra-sep">·</span>
                <AudioChip term="द्व सुपर्णा" label="द्व सुपर्णा" />
                <span className="philosophy-mantra-sep">·</span>
                <AudioChip term="तत्सम" label="तत्सम" />
                <span className="philosophy-mantra-sep">·</span>
                <AudioChip term="अधिनायक" label="अधिनायक" />
                <span className="philosophy-mantra-sep">·</span>
                <AudioChip term="प्रकृतिः" label="प्रकृतिः" />
                <span className="philosophy-mantra-sep">·</span>
                <AudioChip term="आनन्दः" label="आनन्दः" />
              </div>
            </header>

            {/* Visual Masterpiece Artwork Hero */}
            <figure className="philosophy-hero-mandala" style={{ maxWidth: 'min(100%, 780px)', margin: '1.75rem auto 2.25rem' }}>
              <img
                src="/philosophy/tagore-sanskrit-charioteer.jpg"
                alt="Rabindranath Tagore: The Eternal Charioteer and the Cage Bird — Sanskrit and Upanishadic Heritage Visual Artwork"
                width={1920}
                height={1700}
                loading="eager"
                decoding="async"
                style={{
                  display: 'block',
                  width: '100%',
                  height: 'auto',
                  borderRadius: '16px',
                  boxShadow: '0 12px 36px rgba(15, 23, 42, 0.16), 0 2px 8px rgba(0, 0, 0, 0.08)'
                }}
              />
              <figcaption style={{
                fontSize: '0.84rem',
                color: '#64748b',
                textAlign: 'center',
                marginTop: '0.75rem',
                fontStyle: 'italic',
                lineHeight: 1.5
              }}>
                Visual Symphony: Jorasanko, Himalayan Vedic Awakening (सत्यं ज्ञानम् अनन्तम्), Jana Gana Mana Sanskrit Etymology, The Eternal Charioteer (चिरसारथिः), and the Two Birds of Mundaka Upanishad (द्वा सुपर्णा).
              </figcaption>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginTop: '1rem' }} aria-label="Artwork thematic navigation">
                <a href="#tagore-upbringing" className="philosophy-chip" style={{ textDecoration: 'none', cursor: 'pointer' }}>🏛️ Jorasanko &amp; Himalayas</a>
                <a href="#tagore-jgm" className="philosophy-chip" style={{ textDecoration: 'none', cursor: 'pointer' }}>🇮🇳 Jana Gana Mana &amp; Sanskrit</a>
                <a href="#tagore-charioteer" className="philosophy-chip" style={{ textDecoration: 'none', cursor: 'pointer' }}>☸️ The Eternal Charioteer (चिरसारथिः)</a>
                <a href="#tagore-two-birds" className="philosophy-chip" style={{ textDecoration: 'none', cursor: 'pointer' }}>🕊️ Dui Pakhi &amp; Mundaka Upanishad</a>
                <a href="#tagore-nature" className="philosophy-chip" style={{ textDecoration: 'none', cursor: 'pointer' }}>🌿 Vedic Nature (Prakriti &amp; Ananda)</a>
                <a href="#tagore-comparative" className="philosophy-chip" style={{ textDecoration: 'none', cursor: 'pointer' }}>📜 Comparative Sanskrit Grid</a>
              </div>
            </figure>

            {/* 1. Upanishadic Upbringing */}
            <section className="philosophy-section" aria-labelledby="tagore-upbringing">
              <h2 id="tagore-upbringing">1. The Upanishadic Upbringing of a Polymath</h2>
              <p className="philosophy-secondary" style={{ marginTop: '-0.35rem', marginBottom: '1rem', fontStyle: 'italic' }}>
                Jorasanko Crucible · Himalayan Retreat · Sanskrit Grammar &amp; The Gayatri Awakening
              </p>
              <p>
                The sprawling Jorasanko mansion in 19th-century Calcutta was more than a family home; it was
                the vibrant crucible of the Bengal Renaissance. Within its walls, ancient Indian heritage
                collided with modern intellectual awakening. At the center of this world was a young Rabindranath
                Tagore, whose spiritual worldview was fundamentally anchored in the Vedic and Upanishadic traditions.
              </p>
              <p>
                Though born into the Brahmo Samaj—a reformist movement that rejected idol worship—Tagore’s
                literature remains profoundly tied to classical Indian heritage, rich in Sanskrit imagery, and
                deeply embedded with Puranic metaphors. Rabindranath grew up under the strict yet profoundly
                spiritual guidance of his father, Debendranath Tagore, who was affectionately known as Maharshi
                (the Great Sage).
              </p>
              <p>
                At age eleven, Tagore underwent the <em>Upanayana</em> (sacred thread coming-of-age ceremony). Following
                this milestone, his father took him on an extensive retreat into the Himalayas. It was during these
                formative travels that Debendranath systematically instructed the young boy in classical Sanskrit
                grammar, the Vedas, and the Upanishads.
              </p>
              <p>
                The daily routine at Jorasanko involved the chanting of Upanishadic verses and the Gayatri Mantra.
                Tagore later identified these early morning recitations as a core awakening of his consciousness to the
                oneness of the universe.
              </p>
              <p>
                Tagore’s lifelong spiritual manifesto, <em>Sadhana: The Realisation of Life</em>, explicitly relies on
                these ancient texts. He adopted the Vedic concepts of <em>Brahman</em> (the Infinite Cosmic Consciousness)
                and <em>Advaita</em> (non-duality), viewing nature not as passive, dead matter but as a living, divine entity.
              </p>

              <div className="philosophy-premise-card philosophy-premise-card--insight">
                <div className="philosophy-premise-title">
                  <span>🪔</span> The Jorasanko Awakening
                </div>
                <p>
                  “Daily morning chanting of Upanishadic verses and the Gayatri Mantra at Jorasanko formed
                  the primordial acoustic soil from which Tagore’s universal vision of consciousness emerged.”
                </p>
              </div>
            </section>

            {/* 2. Sanskrit Elements in Jana Gana Mana */}
            <section className="philosophy-section" aria-labelledby="tagore-jgm">
              <h2 id="tagore-jgm">2. Sanskrit Elements in “Jana Gana Mana”</h2>
              <p className="philosophy-secondary" style={{ marginTop: '-0.35rem', marginBottom: '1rem', fontStyle: 'italic' }}>
                Linguistic DNA of the National Anthem · Tatsama Vocabulary as a Universal Bridge
              </p>
              <p>
                Although <em>Jana Gana Mana</em> was originally composed as a five-stanza song titled{' '}
                <em>Bharoto Bhagyo Bidhata</em> in Sadhu Bhasha (a highly formal, literary register of Bengali), its
                linguistic DNA is almost entirely Sanskrit.
              </p>
              <p>
                Nearly every noun and adjective in the anthem functions natively in Sanskrit:
              </p>
              <ul>
                <li><strong>Jana (जन):</strong> People or individual embodied souls.</li>
                <li><strong>Gana (गण):</strong> The collective masses, plurality, democratic brotherhood.</li>
                <li><strong>Mana (मनस् / मन):</strong> The inner mind, psyche, or collective conscience.</li>
                <li><strong>Adhinayaka (अधिनायक):</strong> Supreme sovereign ruler or moral helmsman.</li>
                <li><strong>Bhagya Vidhata (भाग्य विधाता):</strong> The divine dispenser of cosmic destiny.</li>
              </ul>
              <p>
                Because of this intense saturation of <strong>Tatsama words</strong> (direct Sanskrit loanwords
                preserved without phonetic alteration), the anthem bypasses regional linguistic barriers. It acts as
                a universal motherboard, enabling speakers of diverse modern Indian languages to instantly grasp its
                sacred, unifying meaning.
              </p>

              <div className="philosophy-table-wrap">
                <table className="philosophy-table">
                  <thead>
                    <tr>
                      <th scope="col">Sanskrit Term (पदम्)</th>
                      <th scope="col">Devanagari / Root</th>
                      <th scope="col">Classical Meaning</th>
                      <th scope="col">Anthem Architectural Role</th>
                      <th scope="col">Listen</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Jana</strong></td>
                      <td lang="sa"><em>जन (√जन् · to be born)</em></td>
                      <td>Individual person, embodied soul</td>
                      <td>The diverse populace across provinces</td>
                      <td><AudioChip term="जन" label="जन" /></td>
                    </tr>
                    <tr>
                      <td><strong>Gana</strong></td>
                      <td lang="sa"><em>गण (√गण् · to assemble)</em></td>
                      <td>The collective plurality, community</td>
                      <td>The democratic brotherhood of India</td>
                      <td><AudioChip term="गण" label="गण" /></td>
                    </tr>
                    <tr>
                      <td><strong>Mana</strong></td>
                      <td lang="sa"><em>मनस् / मन (√मन् · to perceive)</em></td>
                      <td>Inner mind, psyche, cognition</td>
                      <td>The collective national conscience</td>
                      <td><AudioChip term="मनः" label="मनस्" /></td>
                    </tr>
                    <tr>
                      <td><strong>Adhinayaka</strong></td>
                      <td lang="sa"><em>अधिनायक (अधि + नायक)</em></td>
                      <td>Supreme sovereign guide, moral helmsman</td>
                      <td>The perennial director of destiny</td>
                      <td><AudioChip term="अधिनायक" label="अधिनायक" /></td>
                    </tr>
                    <tr>
                      <td><strong>Bhagya Vidhata</strong></td>
                      <td lang="sa"><em>भाग्य विधाता (वि + √धा)</em></td>
                      <td>Divine dispenser of cosmic destiny</td>
                      <td>Supreme Providence guiding the nation</td>
                      <td><AudioChip term="विधाता" label="विधाता" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="philosophy-card">
                <h3>The Universal Linguistic Bridge</h3>
                <p>
                  Saturated with Tatsama vocabulary, <em>Jana Gana Mana</em> operates natively in Bengali, Hindi,
                  Marathi, Gujarati, Odia, and Malayalam alike. Sanskrit is not an extinct language preserved in amber;
                  it is the living motherboard of Indian expression.
                </p>
              </div>
            </section>

            {/* 3. The Puranic Krishna Reference */}
            <section className="philosophy-section" aria-labelledby="tagore-charioteer">
              <h2 id="tagore-charioteer">3. The Puranic Krishna Reference: The Eternal Charioteer</h2>
              <p className="philosophy-secondary" style={{ marginTop: '-0.35rem', marginBottom: '1rem', fontStyle: 'italic' }}>
                Stanza 3 of Bharoto Bhagyo Bidhata · Chirasarathi as Parthasarathy · The Panchajanya Conch
              </p>
              <p>
                While a historical misconception once circulated that Tagore wrote the song to praise the visiting
                British monarch King George V, Tagore himself fiercely debunked this. In letters written in 1937 and
                1939, he clarified that the song was dedicated to the perennial guide of India’s destiny, not a
                mortal king.
              </p>
              <p>
                When examining the lesser-known third stanza of the full, uncut poem, Tagore’s imagery reveals a clear
                inspiration drawn from the Bhagavad Gita and Puranic descriptions of Sri Krishna:
              </p>

              <div className="philosophy-verse-banner">
                <div className="philosophy-verse-sanskrit" lang="sa">
                  पतन-अभ्युदय-बन्धुर पन्था, युग-युग धावित यात्री ।<br />
                  हे चिरसारथि, तव रथचक्रे मुखरित पथ दिन-रात्रि ॥<br />
                  दारुण विप्लव-माझे तव शङ्खध्वनि बाजे...
                </div>
                <div className="philosophy-verse-translit">
                  patana-abhyudaya-bandhura panthā, yuga-yuga dhāvita yātrī |<br />
                  he chirasārathi, tava ratha-cakre mukharita patha dina-rātri ||<br />
                  dāruṇa viplava-mājhe tava śaṅkha-dhvani bāje...
                </div>
                <div className="philosophy-verse-english">
                  “Along the rugged road of rise and fall, pilgrims have journeyed age after age. O Eternal
                  Charioteer, the wheels of Thy chariot echo day and night along the path! Amidst dire turmoil, Thy
                  sacred conch resounds...”
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                  <span className="philosophy-verse-source">Rabindranath Tagore · Bharoto Bhagyo Bidhata, Stanza 3 (1911)</span>
                  <AudioChip term="चिरसारथिः" label="Listen" />
                </div>
              </div>

              <p>Three core metaphysical symbols anchor this verse:</p>
              <ul>
                <li>
                  <strong>The Eternal Charioteer (Chirasarathi / चिरसारथि):</strong> When Tagore translated this
                  stanza into English, he purposefully capitalized the phrase as the "Eternal Charioteer". This is a
                  direct reference to Krishna’s role as <em>Parthasarathy</em> (पार्थसारथि), the divine charioteer
                  steering humanity through the tumultuous battlefield of Kurukṣetra and historical struggle.
                </li>
                <li>
                  <strong>The Sound of the Conch (Sankha-Dhwani / शङ्खध्वनि):</strong> The stanza continues to
                  describe a divine conch shell blowing amidst the chaos of revolutionary struggle to dispel terror and
                  grief. This mirrors the <em>Panchajanya</em> (पाञ्चजन्य), the sacred conch blown by Krishna to signal
                  the triumph of righteousness (Dharma).
                </li>
                <li>
                  <strong>The Wheel of Time (Yuga-Chakra / युगचक्र):</strong> The reference to the wheels of the
                  cosmic chariot guiding weary pilgrims through ages (<em>Yuga Yuga</em>) echoes the Puranic concepts of
                  divine cosmic order and the cyclic flow of time directed by the Supreme Divinity.
                </li>
              </ul>

              <div className="philosophy-premise-card philosophy-premise-card--insight">
                <div className="philosophy-premise-title">
                  <span>☸️</span> The Divine Helmsman (पार्थसारथिः)
                </div>
                <p>
                  By capitalizing "Eternal Charioteer" (चिरसारथि), Tagore invoked neither monarch nor mortal empire,
                  but Śrī Kṛṣṇa at the reins of the cosmic chariot, steering humanity through historical crisis toward
                  righteous awakening.
                </p>
              </div>
            </section>

            {/* 4. The Parable of the Two Birds */}
            <section className="philosophy-section" aria-labelledby="tagore-two-birds">
              <h2 id="tagore-two-birds">4. The Parable of the Two Birds (Dui Pakhi)</h2>
              <p className="philosophy-secondary" style={{ marginTop: '-0.35rem', marginBottom: '1rem', fontStyle: 'italic' }}>
                Dvā Suparṇā Mantra of Mundaka Upanishad 3.1.1 &amp; Rigveda 1.164.20 · Forest Bird vs. Cage Bird
              </p>
              <p>
                One of the most striking examples of how Tagore repackaged Vedic philosophy into modern literature is
                his famous poem "Dui Pakhi" (Two Birds). The poem draws direct inspiration from the celebrated{' '}
                <em>Dvā Suparṇā</em> mantra found in both the Mundaka Upanishad (3.1.1) and the Rigveda (1.164.20).
              </p>

              <div className="philosophy-verse-banner">
                <div className="philosophy-verse-sanskrit" lang="sa">
                  द्वा सुपर्णा सयुजा सखाया समानं वृक्षं परिषस्वजाते ।<br />
                  तयोरन्यः पिप्पलं स्वाद्वत्त्यनश्नन्नन्यो अभिचाकशीति ॥
                </div>
                <div className="philosophy-verse-translit">
                  dvā suparṇā sayujā sakhāyā samānaṃ vṛkṣaṃ pariṣasvajāte |<br />
                  tayoranyaḥ pippalaṃ svādvatti-anaśnannanyo abhicākaśīti ||
                </div>
                <div className="philosophy-verse-english">
                  “Two birds of beautiful plumage, inseparable companions, cling to the very same tree. One of them
                  eats the sweet and bitter fruits; the other looks on calmly without eating, a radiant silent witness.”
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                  <span className="philosophy-verse-source">Muṇḍaka Upaniṣad 3.1.1 · Ṛgveda 1.164.20 · Śvetāśvatara 4.6</span>
                  <AudioChip term="द्वा सुपर्णा सयुजा सखाया" label="Listen" />
                </div>
              </div>

              <p>
                The ancient Upanishadic allegory describes two inseparable companion birds perched on the exact same tree:
              </p>
              <p>
                In the original text, the first bird (<em>Jīva</em>, the individual soul) hops from branch to branch,
                eating the sweet and bitter fruits of the world, getting caught up in earthly joys and sorrows. The second
                bird (<em>Paramātman</em>, the Supreme Consciousness) merely sits on a higher branch, watching calmly as a
                silent witness (<em>Sākṣī</em>) without consuming anything.
              </p>
              <p>
                In his poem "Dui Pakhi", Tagore masterfully adapts this abstract metaphysical duality into a poignant
                narrative dialogue between a free forest-bird and a captive cage-bird:
              </p>
              <ul>
                <li>
                  <strong>The forest-bird</strong> represents boundless infinity, absolute freedom, and the vast,
                  unknown skies—mirroring the detached <em>Paramātman</em>.
                </li>
                <li>
                  <strong>The cage-bird</strong> represents the finite self bound by safe limits, material habits, and
                  domestic comfort—mirroring the conditioned <em>Jīva</em>.
                </li>
              </ul>
              <p>
                By translating a static philosophical concept into an active, emotional conversation between two
                entities longing to unite, Tagore gave a modern, human heartbeat to an ancient Upanishadic truth.
              </p>

              <div className="philosophy-card">
                <h3>From Metaphysics to Human Longing</h3>
                <p>
                  In <em>Dui Pakhi</em>, the abstract polarity of Jīva and Paramātman is transformed into a tender
                  dialogue between a forest bird and a cage bird, yearning for union across the bars of finite existence.
                </p>
              </div>
            </section>

            {/* 5. Vedic Echoes in Nature Poetry */}
            <section className="philosophy-section" aria-labelledby="tagore-nature">
              <h2 id="tagore-nature">5. Vedic Echoes in Tagore’s Nature Poetry (Prakriti)</h2>
              <p className="philosophy-secondary" style={{ marginTop: '-0.35rem', marginBottom: '1rem', fontStyle: 'italic' }}>
                Nature as a Living, Conscious Cosmic Force · Sarvam Khalvidam Brahma
              </p>
              <p>
                Tagore’s nature poetry (<em>Prakriti-Giti</em>) is not merely a romantic appreciation of scenic beauty;
                it is a direct continuation of the Vedic worldview.
              </p>
              <p>
                In the Rigveda, elements of nature like the dawn (<em>Uṣas</em>), wind (<em>Vāyu</em>), and rain
                (<em>Parjanya</em>) are treated as living, conscious, cosmic forces (<em>Devatās</em>). Tagore revived
                this ancient perception, viewing nature as a vast theater where the infinite manifests through the finite:
              </p>
              <ul>
                <li>
                  <strong>The Universe as a Living Entity:</strong> For Tagore, the rustling of leaves, the cresting of
                  river waves, and the shifting seasons were expressions of a singular, cosmic heartbeat. This mirrors
                  the Upanishadic dictum, <em>“Sarvam Khalvidam Brahma”</em> (All this universe is indeed Brahman).
                </li>
                <li>
                  <strong>The Spiritual Bond:</strong> Unlike Western Romantic poets who often viewed nature as a
                  canvas for the human ego, Tagore saw nature as a spiritual kin. In his poems, the human soul and the
                  natural world are two notes in the same eternal symphony, constantly seeking communion.
                </li>
              </ul>

              <div className="philosophy-premise-card philosophy-premise-card--insight">
                <div className="philosophy-premise-title">
                  <span>🌿</span> The Cosmic Heartbeat: Sarvam Khalvidam Brahma
                </div>
                <p>
                  <strong>“सर्वं खल्विदं ब्रह्म”</strong> — For Tagore, nature was never a passive backdrop for the ego,
                  but a living sanctuary where the finite soul communes with its own infinite essence.
                </p>
              </div>
            </section>

            {/* 6. Comparative Text Analysis */}
            <section className="philosophy-section" aria-labelledby="tagore-comparative">
              <h2 id="tagore-comparative">6. Comparative Text Analysis: Upanishadic Roots vs. Tagorean Verses</h2>
              <p className="philosophy-secondary" style={{ marginTop: '-0.35rem', marginBottom: '1rem', fontStyle: 'italic' }}>
                The Light of Consciousness (Prakāśa) &amp; The Abundance of Joy (Ānanda)
              </p>
              <p>
                To truly appreciate how seamlessly Tagore translated ancient Sanskrit philosophy into the cadence of
                modern Bengali verse, we can examine direct conceptual parallels across canonical verses:
              </p>

              {/* Parallel 1 */}
              <div style={{ margin: '1.5rem 0' }}>
                <h3 style={{ color: '#9a3412', fontSize: '1.15rem', marginBottom: '0.5rem' }}>
                  A. The Light of Consciousness (प्रकाशः)
                </h3>
                <div className="philosophy-verse-banner" style={{ margin: '0.75rem 0 1rem' }}>
                  <div className="philosophy-verse-sanskrit" lang="sa">
                    हिरण्मयेन पात्रेण सत्यस्यापिहितं मुखम् ।<br />
                    तत्त्वं पूषन्नपावृणु सत्यधर्माय दृष्टये ॥
                  </div>
                  <div className="philosophy-verse-translit">
                    hiraṇmayena pātreṇa satyasyāpihitaṃ mukham |<br />
                    tat tvaṃ pūṣann apāvṛṇu satyadharmāya dṛṣṭaye ||
                  </div>
                  <div className="philosophy-verse-english">
                    “The face of Truth is covered with a golden vessel. Unveil it, O Sustainer (Pūṣan), so that I,
                    dedicated to Truth, may behold it.”
                  </div>
                  <span className="philosophy-verse-source">Īśa Upaniṣad 15</span>
                </div>

                <div className="philosophy-card" style={{ background: '#fdfbf7', borderLeft: '4px solid #ea580c' }}>
                  <p style={{ margin: '0 0 0.5rem', fontWeight: 700, color: '#7c2d12' }}>
                    Tagore’s Resonance (Gitanjali, Song 57):
                  </p>
                  <p style={{ fontStyle: 'italic', margin: '0 0 0.5rem' }}>
                    “Light, my light, the world-filling light, the eye-kissing light, heart-sweetening light! Ah, the light
                    dances, my darling, at the center of my life; the light strikes, my darling, the chords of my love...”
                  </p>
                  <p style={{ margin: 0, fontSize: '0.92rem', color: '#475569' }}>
                    <strong>The Connection:</strong> Both texts move from contemplating the physical sun to experiencing an
                    ecstatic, internal awakening of spiritual truth and cosmic illumination.
                  </p>
                </div>
              </div>

              {/* Parallel 2 */}
              <div style={{ margin: '1.5rem 0' }}>
                <h3 style={{ color: '#0f766e', fontSize: '1.15rem', marginBottom: '0.5rem' }}>
                  B. The Abundance of Joy (आनन्दः)
                </h3>
                <div className="philosophy-verse-banner" style={{ margin: '0.75rem 0 1rem' }}>
                  <div className="philosophy-verse-sanskrit" lang="sa">
                    आनन्दाद्ध्येव खल्विमानि भूतानि जायन्ते ।<br />
                    आनन्देन जातानि जीवन्ति ।<br />
                    आनन्दं प्रयन्त्यभिसंविशन्तीति ॥
                  </div>
                  <div className="philosophy-verse-translit">
                    ānandāddhy eva khalv imāni bhūtāni jāyante |<br />
                    ānandena jātāni jīvanti |<br />
                    ānandaṃ prayanty abhisaṃviśantīti ||
                  </div>
                  <div className="philosophy-verse-english">
                    “From Infinite Joy (Ānanda) indeed all these beings are born; by Joy they are sustained when born; and
                    into Joy they dissolve upon departure.”
                  </div>
                  <span className="philosophy-verse-source">Taittirīya Upaniṣad 3.6.1</span>
                </div>

                <div className="philosophy-card" style={{ background: '#f0fdfa', borderLeft: '4px solid #0f766e' }}>
                  <p style={{ margin: '0 0 0.5rem', fontWeight: 700, color: '#134e4a' }}>
                    Tagore’s Resonance (Anandadhara Bahiche Bhubane):
                  </p>
                  <p style={{ fontStyle: 'italic', margin: '0 0 0.5rem' }}>
                    “Anandadhara bahiche bhubane / Dina rajani kataro amrito raso nabhane...”<br />
                    (A torrent of joy flows through the universe, night and day the nectar of immortality pours from the skies...)
                  </p>
                  <p style={{ margin: 0, fontSize: '0.92rem', color: '#475569' }}>
                    <strong>The Connection:</strong> Tagore takes the abstract philosophical concept of Ānanda (infinite
                    cosmic joy) and transforms it into an accessible lyrical river washing over everyday human experience.
                  </p>
                </div>
              </div>
            </section>

            {/* 7. Conclusion */}
            <section className="philosophy-section" aria-labelledby="tagore-conclusion">
              <h2 id="tagore-conclusion">7. Conclusion: The Shared Blueprint of Indian Heritage</h2>
              <p className="philosophy-secondary" style={{ marginTop: '-0.35rem', marginBottom: '1rem', fontStyle: 'italic' }}>
                How Sanskrit Unifies Modern Indian Languages · Philosophical Depth, Rasa &amp; Chandas
              </p>
              <p>
                Learning Sanskrit and its foundational literature is essential to gaining a complete picture of India's
                roots, heritage, and poetic references. Languages like Hindi, Bengali, Marathi, Gujarati, Odia, and
                Malayalam operate within this shared conceptual ecosystem.
              </p>
              <p>
                Tagore did not let Sanskrit restrict his modern style; instead, he used it as an expansive toolkit to
                elevate the emotion and texture of his poetry. By understanding the linguistic and philosophical foundations
                he leaned on, we do not just read modern Indian literature—we hear the ancient, eternal echoes built
                directly into its vocabulary.
              </p>

              <div className="philosophy-table-wrap">
                <table className="philosophy-table">
                  <thead>
                    <tr>
                      <th scope="col">Dimension</th>
                      <th scope="col">Role of Sanskrit Roots</th>
                      <th scope="col">Modern Language Impact</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Philosophical Depth</strong></td>
                      <td>Direct loaning of complex conceptual words (Tatsama).</td>
                      <td>
                        Allows abstract ideas like <em>Mukti</em> (liberation), <em>Chetana</em> (consciousness), and{' '}
                        <em>Satya</em> (truth) to hold identical meanings across distinct regional borders.
                      </td>
                    </tr>
                    <tr>
                      <td><strong>Emotional Landscape</strong></td>
                      <td>Aesthetic frameworks borrowed from classical texts (Navarasa).</td>
                      <td>
                        Words denoting deep emotional states like <em>Viraha</em> (the painful longing of separation) convey
                        the exact same cultural weight in a Hindi bhajan as they do in a Malayalam poem.
                      </td>
                    </tr>
                    <tr>
                      <td><strong>Rhythmic Architecture</strong></td>
                      <td>Metrical patterns and sound arrangements (Chandas).</td>
                      <td>
                        The innate, mathematical cadence of Sanskrit verses directly shaped the lyrical flow and structural
                        rhythm of medieval and modern regional devotional poetry.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Key Takeaways Cards */}
              <h3 style={{ marginTop: '2rem', marginBottom: '0.85rem', color: '#1e293b' }}>
                Key Takeaways · मुख्य-सिद्धान्ताः
              </h3>
              <div className="philosophy-timescale-grid" style={{ marginBottom: '1.5rem' }}>
                <div className="philosophy-timescale-card">
                  <span className="philosophy-timescale-time">Foundational Soil</span>
                  <div className="philosophy-timescale-title">🪔 Jorasanko Upbringing</div>
                  <p className="philosophy-timescale-desc">
                    Daily morning recitations of Upanishadic verses and the Gayatri under Maharshi Debendranath shaped
                    Tagore's consciousness.
                  </p>
                </div>
                <div className="philosophy-timescale-card">
                  <span className="philosophy-timescale-time">Linguistic DNA</span>
                  <div className="philosophy-timescale-title">📜 Tatsama Architecture</div>
                  <p className="philosophy-timescale-desc">
                    Jana Gana Mana is saturated with direct Sanskrit loanwords, making it universally intelligible across
                    all Indian language families.
                  </p>
                </div>
                <div className="philosophy-timescale-card">
                  <span className="philosophy-timescale-time">Puranic Metaphor</span>
                  <div className="philosophy-timescale-title">☸️ Krishna as Chirasarathi</div>
                  <p className="philosophy-timescale-desc">
                    Stanza 3 addresses the Eternal Charioteer with the Panchajanya conch, evoking Krishna as Parthasarathy
                    steering history.
                  </p>
                </div>
                <div className="philosophy-timescale-card">
                  <span className="philosophy-timescale-time">Vedic Allegory</span>
                  <div className="philosophy-timescale-title">🕊️ Dui Pakhi &amp; Mundaka</div>
                  <p className="philosophy-timescale-desc">
                    The famous Dvā Suparṇā mantra (Jīva vs. Paramātman) transformed into an intimate dialogue between forest
                    bird and cage bird.
                  </p>
                </div>
                <div className="philosophy-timescale-card">
                  <span className="philosophy-timescale-time">Cosmic Kinship</span>
                  <div className="philosophy-timescale-title">🌿 Living Nature (Prakriti)</div>
                  <p className="philosophy-timescale-desc">
                    Nature is not scenic decoration for the ego, but a living Devatā continuum — “Sarvam Khalvidam Brahma”.
                  </p>
                </div>
                <div className="philosophy-timescale-card">
                  <span className="philosophy-timescale-time">Living Motherboard</span>
                  <div className="philosophy-timescale-title">🏛️ Unified Heritage</div>
                  <p className="philosophy-timescale-desc">
                    Sanskrit provides the philosophical depth, emotional rasa, and metrical chandas uniting Hindi, Bengali,
                    Marathi, and beyond.
                  </p>
                </div>
              </div>

              {/* Bodhi's Study Note */}
              <div className="philosophy-learner-box">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
                  <BodhiAvatar mood="reading" size="sm" showHalo={false} />
                  <h3 style={{ margin: 0 }}>Bodhi’s Study Note · Explore the Masterclass in Depth</h3>
                </div>
                <p style={{ fontSize: '1.05rem', lineHeight: 1.6, color: '#134e4a', margin: '0 0 1rem' }}>
                  Tagore did not treat Sanskrit as a dead museum exhibit; he wielded it as a living, expansive palette. When
                  you read the national anthem or chant the Upaniṣads, you are participating in the exact same unbroken
                  acoustic and conceptual stream.
                </p>
                <div className="philosophy-action-buttons">
                  {onOpenCourseAddendum && (
                    <button
                      type="button"
                      className="philosophy-action-btn"
                      style={{ background: '#b45309' }}
                      onClick={() => onOpenCourseAddendum('addendum-tagore-sanskrit-genius')}
                    >
                      📜 Open Masterclass 5 in Course Addendum ➔
                    </button>
                  )}
                  {onOpenVarnamala && (
                    <button type="button" className="philosophy-action-btn" onClick={onOpenVarnamala}>
                      🔤 Alphabet &amp; Syllables Masterclass
                    </button>
                  )}
                  {onOpenReader && (
                    <button type="button" className="philosophy-action-btn" onClick={onOpenReader}>
                      📖 Living Reader
                    </button>
                  )}
                </div>
              </div>

              {/* CTA Actions */}
              <section className="philosophy-cta" aria-labelledby="tagore-cta-heading" style={{ marginTop: '2.5rem' }}>
                <h2 id="tagore-cta-heading">Awaken Your Living Connection to Sanskrit</h2>
                <p>
                  Experience Sanskrit not as dry grammar memorization, but as the living language of Indian genius,
                  philosophy, and poetry.
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
                    🤖 Why Learn Sanskrit in the Age of AI ➔
                  </button>
                  <button
                    type="button"
                    className="philosophy-cta-secondary"
                    onClick={() => {
                      setActiveEssay('sunyat_anantam');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    🌌 Śūnyāt Anantam (Mathematics as Darśana) ➔
                  </button>
                </div>
              </section>
            </section>
          </div>
        )}

        {/* =========================================================================
            ESSAY 4: The Music of Matter: Cymatics, Sacred Geometry & The Holographic Universe
           ========================================================================= */}
        {activeEssay === 'music_of_matter' && (
          <div className="philosophy-essay-body">
            <header className="philosophy-hero">
              <span className="philosophy-kicker">Gurukul Darśana · Masterclass 6 · नादब्रह्म</span>
              <h1 className="philosophy-title">
                The Music of Matter: Cymatics, Sacred Geometry, and the Holographic Universe
              </h1>
              <p className="philosophy-mantra">
                नादब्रह्म · यथा पिण्डे तथा ब्रह्माण्डे · आनन्दः
              </p>
              <p className="philosophy-secondary">
                From the Vibration of Sound to the Geometry of Existence — An Ancient Wisdom, A Modern Science, One Universe
              </p>

              <blockquote className="philosophy-pull-quote" style={{ maxWidth: '44rem', margin: '1.25rem auto 0.75rem' }}>
                <p>
                  “To view the universe through the lens of ancient Indian thought is to see a world woven entirely out
                  of sound. While the physical senses perceive a landscape of solid, detached objects, the Vedic tradition
                  asserts that reality is fundamentally vibrational. This ancient intuition aligns profoundly with cymatics—the
                  modern study of visible sound—revealing a striking convergence between acoustic physics, sacred art forms
                  like mandalas and rangolis, and the core cosmological principle of Yatha Pinde Tatha Brahmande.”
                </p>
              </blockquote>

              <div className="philosophy-journey" style={{ marginTop: '1rem' }}>
                <AudioChip term="नादब्रह्म" label="नादब्रह्म" />
                <span className="philosophy-mantra-sep">·</span>
                <AudioChip term="यथा पिण्डे तथा ब्रह्माण्डे" label="यथा पिण्डे तथा ब्रह्माण्डे" />
                <span className="philosophy-mantra-sep">·</span>
                <AudioChip term="मन्त्रः" label="मन्त्रः" />
                <span className="philosophy-mantra-sep">·</span>
                <AudioChip term="यन्त्रम्" label="यन्त्रम्" />
                <span className="philosophy-mantra-sep">·</span>
                <AudioChip term="श्रीचक्रम्" label="श्रीचक्रम्" />
                <span className="philosophy-mantra-sep">·</span>
                <AudioChip term="रङ्गोली" label="रङ्गोली" />
                <span className="philosophy-mantra-sep">·</span>
                <AudioChip term="वास्तुशास्त्रम्" label="वास्तुशास्त्रम्" />
                <span className="philosophy-mantra-sep">·</span>
                <AudioChip term="आनन्दः" label="आनन्दः" />
              </div>
            </header>

            {/* Visual Masterpiece Artwork Hero */}
            <figure className="philosophy-hero-mandala" style={{ maxWidth: 'min(100%, 820px)', margin: '1.75rem auto 2.25rem' }}>
              <img
                src="/philosophy/music-of-matter-cymatics.jpg"
                alt="The Music of Matter: Cymatics, Sacred Geometry, and the Holographic Universe — Visual Infographic"
                width={1920}
                height={1300}
                loading="eager"
                decoding="async"
                style={{
                  display: 'block',
                  width: '100%',
                  height: 'auto',
                  borderRadius: '16px',
                  boxShadow: '0 12px 36px rgba(15, 23, 42, 0.16), 0 2px 8px rgba(0, 0, 0, 0.08)'
                }}
              />
              <figcaption style={{
                fontSize: '0.84rem',
                color: '#64748b',
                textAlign: 'center',
                marginTop: '0.75rem',
                fontStyle: 'italic',
                lineHeight: 1.5
              }}>
                Visual Masterpiece: Nāda Brahma Soundwave, Hans Jenny Tonoscope &amp; Shri Yantra, Yathā Piṇḍe Tathā Brahmāṇḍe Holographic Matrix, Rangolis &amp; Golden Ratio Fibonacci Flora, Vāstu Śāstra Geometries, and the Cosmic Dissolution of Form in Eternal Consciousness.
              </figcaption>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginTop: '1rem' }} aria-label="Artwork thematic navigation">
                <a href="#cymatics-sanskrit" className="philosophy-chip" style={{ textDecoration: 'none', cursor: 'pointer' }}>🔊 1. Cymatics &amp; Sanskrit</a>
                <a href="#cymatics-yatha-pinde" className="philosophy-chip" style={{ textDecoration: 'none', cursor: 'pointer' }}>🌌 2. Yathā Piṇḍe Tathā Brahmāṇḍe</a>
                <a href="#cymatics-rangolis" className="philosophy-chip" style={{ textDecoration: 'none', cursor: 'pointer' }}>🌸 3. Rangolis &amp; Fibonacci Flora</a>
                <a href="#cymatics-vastu" className="philosophy-chip" style={{ textDecoration: 'none', cursor: 'pointer' }}>🏛️ 4. Vāstu Sacred Geometry</a>
                <a href="#cymatics-impermanence" className="philosophy-chip" style={{ textDecoration: 'none', cursor: 'pointer' }}>🌊 5. Metaphysics of Impermanence</a>
              </div>
            </figure>

            {/* 1. Cymatics and Sanskrit */}
            <section className="philosophy-section" aria-labelledby="cymatics-sanskrit-heading">
              <h2 id="cymatics-sanskrit">1. Cymatics and Sanskrit: The Science of Visible Sound</h2>
              <p className="philosophy-secondary" style={{ marginTop: '-0.35rem', marginBottom: '1rem', fontStyle: 'italic' }}>
                Hans Jenny’s Tonoscope · Acoustic Wave to Geometric Form · Mantra to Yantra
              </p>
              <p>
                In the mid-20th century, Swiss physician and natural scientist Hans Jenny pioneered the field of cymatics,
                using a specialized apparatus called a tonoscope to pass calibrated sound frequencies through physical mediums
                like quartz sand, lycopodium powder, and viscous liquids on flat vibrating membranes. The results were
                revolutionary: sound frequencies naturally and spontaneously organize chaotic particles into geometric,
                symmetrical, and highly repeatable patterns. Lower frequencies create simple harmonic structures, while
                higher frequencies generate intensely intricate, mandalic lattices.
              </p>
              <p>
                This physical phenomenon provides a concrete empirical parallel to the foundational philosophy of Mantra
                Śāstra (the science of sacred utterances) and the ancient concept of Nāda Brahma (नादब्रह्म = the universe
                is fundamentally sound). In this worldview, the ancient Ṛṣis (seers) did not invent Sanskrit words as
                arbitrary labels; instead, they inner-audited the innate vibrational signatures of physical and cosmic forces,
                mapping them into precise vocal phonetics.
              </p>

              <div className="philosophy-callout" style={{ margin: '1.5rem 0', background: '#f8fafc', borderLeft: '4px solid #0f766e', padding: '1.25rem 1.5rem', borderRadius: '0 12px 12px 0' }}>
                <h3 style={{ margin: '0 0 0.5rem', color: '#0f766e', fontSize: '1.05rem', fontWeight: 700 }}>
                  The Mantra ➔ Yantra Acoustic Transformation
                </h3>
                <div style={{ fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: '1.6', color: '#334155', background: '#ffffff', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', overflowX: 'auto' }}>
                  {`[ Mantra ] ────────────────────────> [ Yantra ]
(Acoustic Wave Input)               (Geometric Form Result)
         │                                     │
         ▼                                     ▼
   Cymatic Sound                       Standing Geometric
     Frequency                            Wave Pattern`}
                </div>
                <p style={{ marginTop: '0.85rem', marginBottom: 0, fontSize: '0.92rem', color: '#475569' }}>
                  In esoteric Vedic traditions, every sound (Mantra) has an exact corresponding geometric blueprint (Yantra).
                  When Hans Jenny chanted the primordial syllable <strong>"AUM" (ॐ)</strong> into the tonoscope, the scattered
                  particles on the plate shifted into concentric circles, squares, and interlocking triangles, structurally
                  mirroring the geometry of the ancient <strong>Śrī Chakra Yantra</strong>. Because Sanskrit grammar is
                  mathematically rigorous—regulating the exact placement of the tongue and release of breath—it functions
                  as a precision vibrational technology that shapes physical mediums through pure acoustic resonance.
                </p>
              </div>

              <blockquote className="philosophy-sutra-card">
                <p className="philosophy-sutra-dev">
                  नादरूपः स्मृतो ब्रह्मा नादरूपो जनार्दनः । नादरूपा परा शक्तिर्नादरूपो महेश्वरः ॥
                </p>
                <p className="philosophy-sutra-iast">
                  nādarūpaḥ smṛto brahmā nādarūpo janārdanaḥ | nādarūpā parā śaktir nādarūpo maheśvaraḥ ||
                </p>
                <p className="philosophy-sutra-meaning">
                  “Brahma the creator is recognized as sound; Janardana (Vishnu) the sustainer is sound; the supreme
                  creative power (Para Shakti) is sound; and Maheshvara (Shiva) the dissolver is sound.”
                </p>
                <cite className="philosophy-sutra-source">— Saṅgīta-Makaranda 1.4</cite>
              </blockquote>
            </section>

            {/* 2. Yatha Pinde Tatha Brahmande */}
            <section className="philosophy-section" aria-labelledby="cymatics-yatha-pinde-heading">
              <h2 id="cymatics-yatha-pinde">2. Yathā Piṇḍe Tathā Brahmāṇḍe: The Holographic Matrix</h2>
              <p className="philosophy-secondary" style={{ marginTop: '-0.35rem', marginBottom: '1rem', fontStyle: 'italic' }}>
                Yajurvedic Axiom · Quantum Non-Locality · The Microcosm-Macrocosm Mirror
              </p>
              <p>
                The structural relationship between sound and matter underpins the celebrated cosmological maxim from
                the Yajurveda:
              </p>

              <blockquote className="philosophy-sutra-card" style={{ margin: '1.25rem 0' }}>
                <p className="philosophy-sutra-dev">
                  यथा पिण्डे तथा ब्रह्माण्डे, यथा ब्रह्माण्डे तथा पिण्डे ।
                </p>
                <p className="philosophy-sutra-iast">
                  yathā piṇḍe tathā brahmāṇḍe, yathā brahmāṇḍe tathā piṇḍe |
                </p>
                <p className="philosophy-sutra-meaning">
                  “As is the individual body (Piṇḍa), so is the cosmic body (Brahmāṇḍa); as is the macrocosm, so is the microcosm.”
                </p>
                <cite className="philosophy-sutra-source">— Yajurveda · Garbha Upaniṣad 3</cite>
              </blockquote>

              <p>
                This ancient formula directly mirrors the principles of modern quantum mechanics and the holographic
                universe theory pioneered by theoretical physicist David Bohm. In an optical hologram, information about
                the entire three-dimensional object is distributed across every point of the interference pattern. If you
                shatter a holographic image, every microscopic fragment still retains the complete, intact image of the
                entire object.
              </p>
              <p>
                Traditional sacred arts like mandalas and rangolis function as physical, fractalline microcosms of this reality.
                When a practitioner plots a geometric rangoli at a doorstep, they are not merely rendering decoration; they
                are mapping the macrocosmic order of star systems, atomic electron orbitals, and planetary resonances onto
                a local, finite plane.
              </p>

              <blockquote className="philosophy-sutra-card">
                <p className="philosophy-sutra-dev">
                  पूर्णमदः पूर्णमिदं पूर्णात्पूर्णमुदच्यते । पूर्णस्य पूर्णमादाय पूर्णमेवावशिष्यते ॥
                </p>
                <p className="philosophy-sutra-iast">
                  pūrṇam adaḥ pūrṇam idaṃ pūrṇāt pūrṇam udacyate | pūrṇasya pūrṇam ādāya pūrṇam evāvaśiṣyate ||
                </p>
                <p className="philosophy-sutra-meaning">
                  “That is whole; this is whole. From the Whole, the whole manifests. When the whole is subtracted from the Whole, the Whole alone remains.”
                </p>
                <cite className="philosophy-sutra-source">— Īśa Upaniṣad · Śānti Mantra</cite>
              </blockquote>
            </section>

            {/* 3. Rangolis and Floral Offerings */}
            <section className="philosophy-section" aria-labelledby="cymatics-rangolis-heading">
              <h2 id="cymatics-rangolis">3. Rangolis and Floral Offerings: Frozen Music and Organic Arrays</h2>
              <p className="philosophy-secondary" style={{ marginTop: '-0.35rem', marginBottom: '1rem', fontStyle: 'italic' }}>
                Standing Nodal Waves · Fibonacci Growth · Liquid Crystal Cellular Water
              </p>
              <p>
                Traditional art practices across India bring this invisible acoustic blueprint directly into daily life,
                operating across three distinct, deeply scientific layers of form and material:
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', margin: '1.5rem 0' }}>
                <div style={{ background: '#ffffff', border: '1px solid #e2d9cc', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  <h3 style={{ margin: '0 0 0.5rem', color: '#b45309', fontSize: '1.05rem', fontWeight: 700 }}>
                    1. Rangolis as "Frozen Music"
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.92rem', lineHeight: '1.6', color: '#475569' }}>
                    The geometric grids of dots and lines drawn at the thresholds of Indian homes are literal visual
                    expressions of standing waves. They mimic the exact nodal points—lines of zero vibration—where sand
                    particles naturally settle on a vibrating cymatic plate. A rangoli is effectively a mantra made visible,
                    laid out on the earth to stabilize, filter, and harmonize the local environment.
                  </p>
                </div>

                <div style={{ background: '#ffffff', border: '1px solid #e2d9cc', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  <h3 style={{ margin: '0 0 0.5rem', color: '#059669', fontSize: '1.05rem', fontWeight: 700 }}>
                    2. Floral Offerings (Pushpa-Añjali)
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.92rem', lineHeight: '1.6', color: '#475569' }}>
                    Incorporating living materials brings an active biological layer to this cosmic matrix. Flowers are natural
                    cymatic structures whose petals grow along strict mathematical lines, specifically the Fibonacci Sequence
                    and the Golden Ratio (φ ≈ 1.618). These ratios dictate the most efficient way to pack matter in a confined
                    space, governing acoustic waves in water and the logarithmic expansion of galaxies.
                  </p>
                </div>

                <div style={{ background: '#ffffff', border: '1px solid #e2d9cc', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  <h3 style={{ margin: '0 0 0.5rem', color: '#2563eb', fontSize: '1.05rem', fontWeight: 700 }}>
                    3. Bio-Energetic Alignment
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.92rem', lineHeight: '1.6', color: '#475569' }}>
                    When a person interacts with these organic mandalas, a dynamic exchange occurs. Because the human body
                    is roughly 60% water, standing over or meditating near these precise geometric arrays structurally
                    harmonizes the liquid crystal lattice within our own cells, aligning the individual vessel (Piṇḍa)
                    with the broader universe (Brahmāṇḍa).
                  </p>
                </div>
              </div>
            </section>

            {/* 4. Geometry of Sacred Space */}
            <section className="philosophy-section" aria-labelledby="cymatics-vastu-heading">
              <h2 id="cymatics-vastu">4. The Geometry of Sacred Space: Vāstu Śāstra &amp; Temple Architecture</h2>
              <p className="philosophy-secondary" style={{ marginTop: '-0.35rem', marginBottom: '1rem', fontStyle: 'italic' }}>
                Circle (Chakra/Bindu) · Square (Bhūpura) · Triangle (Trikoṇa) · Śrī Yantra
              </p>
              <p>
                In the architectural science of Vāstu Śāstra, specific geometric shapes are utilized like functional
                acoustic lenses to focus or ground environmental energies:
              </p>

              <div className="philosophy-table-wrapper" style={{ margin: '1.5rem 0' }}>
                <table className="philosophy-data-table" aria-label="Sacred Geometry Archetypes in Vāstu Śāstra">
                  <thead>
                    <tr>
                      <th scope="col">Geometric Shape</th>
                      <th scope="col">Sanskrit Name</th>
                      <th scope="col">Cosmic Meaning</th>
                      <th scope="col">Functional Energy Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>The Circle</strong></td>
                      <td>चक्रम् / बिन्दुः (Chakra / Bindu)</td>
                      <td>Infinity, absolute consciousness, cosmic unity</td>
                      <td>Prevents energy from fragmenting by locking subtle vibrations into a protective vortex.</td>
                    </tr>
                    <tr>
                      <td><strong>The Square</strong></td>
                      <td>भूपुरम् (Bhūpura)</td>
                      <td>Stability, grounding, material manifestation</td>
                      <td>Acts as an energetic perimeter to anchor incoming cosmic frequencies into the terrestrial earth.</td>
                    </tr>
                    <tr>
                      <td><strong>The Triangle</strong></td>
                      <td>त्रिकोणम् (Trikoṇa)</td>
                      <td>Directed velocity, dynamic polarity</td>
                      <td>
                        Upward triangle represents ascending consciousness (Śiva); downward triangle represents
                        descending grace (Śakti); their intersection generates dynamic, vitalizing life movement.
                      </td>
                    </tr>
                    <tr>
                      <td><strong>The Śrī Yantra</strong></td>
                      <td>श्रीचक्रम् (Śrī Chakra)</td>
                      <td>The multi-dimensional hologram of creation</td>
                      <td>
                        9 interlocking triangles radiating from a central Bindu form 43 subsidiary triangles, acting as
                        a master acoustic antenna embodying cosmic manifestation.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 5. The Cosmic Core */}
            <section className="philosophy-section" aria-labelledby="cymatics-impermanence-heading">
              <h2 id="cymatics-impermanence">5. The Cosmic Core: The Metaphysics of Impermanence</h2>
              <p className="philosophy-secondary" style={{ marginTop: '-0.35rem', marginBottom: '1rem', fontStyle: 'italic' }}>
                Ānanda as the Cosmic Wave · Daily Dissolution · "Piṇḍa Dissolves, Brahmāṇḍa Sings On"
              </p>
              <p>
                This entire structural framework ultimately connects back to the Upanishadic concept of <strong>Ānanda (आनन्दः)</strong>—the
                infinite, creative joy that Rabindranath Tagore identified as the primary driving force of creation.
              </p>
              <p>
                In this view, the universe was not built out of mechanical necessity, but sung into existence out of the
                absolute joy of expression. Ānanda is the fundamental wave pulsing through the cosmos, while mandalas,
                flowers, and languages are the physical shapes that the wave creates when it meets matter.
              </p>
              <p>
                This realization illuminates the philosophy behind why rangolis are swept away daily and floral mandalas
                are left to wither. In a holographic universe born of sound, the physical form is temporary, but the
                underlying wave is eternal.
              </p>
              <p>
                The deliberate dissolution of these beautiful, labor-intensive designs teaches a profound lesson:
                to appreciate the temporary physical manifestation (Piṇḍa) without clinging to it, remaining securely
                anchored in the infinite, underlying field of consciousness (Brahmāṇḍa) that endlessly sings these
                geometric forms into life.
              </p>

              <blockquote className="philosophy-pull-quote" style={{ maxWidth: '38rem', margin: '1.75rem auto 1rem', textAlign: 'center' }}>
                <p style={{ fontStyle: 'italic', fontSize: '1.15rem', color: '#1e293b' }}>
                  “Piṇḍa dissolves... Brahmāṇḍa sings on.<br />
                  Appreciate the form, without clinging to it.<br />
                  Remain anchored in the infinite field of consciousness.”
                </p>
              </blockquote>

              <blockquote className="philosophy-sutra-card">
                <p className="philosophy-sutra-dev">
                  आनन्दाद्ध्येव खल्विमानि भूतानि जायन्ते । आनन्देन जातानि जीवन्ति । आनन्दं प्रयन्त्यभिसंविशन्तीति ॥
                </p>
                <p className="philosophy-sutra-iast">
                  ānandāddhy eva khalv imāni bhūtāni jāyante | ānandena jātāni jīvanti | ānandaṃ prayanty abhisaṃviśantīti ||
                </p>
                <p className="philosophy-sutra-meaning">
                  “From Infinite Joy (Ānanda) indeed all these beings are born; by Joy they are sustained when born; and into Joy they dissolve upon departure.”
                </p>
                <cite className="philosophy-sutra-source">— Taittirīya Upaniṣad 3.6.1</cite>
              </blockquote>
            </section>

            {/* 6. Comprehensive Synthesis Matrix */}
            <section className="philosophy-section" aria-labelledby="cymatics-synthesis-heading">
              <h2 id="cymatics-synthesis">6. The Convergence: Physics, Sacred Art &amp; Vedic Philosophy</h2>
              <p className="philosophy-secondary" style={{ marginTop: '-0.35rem', marginBottom: '1rem', fontStyle: 'italic' }}>
                Bridging Ancient Sound Technology &amp; Modern Quantum Holography
              </p>

              <div className="philosophy-table-wrapper" style={{ margin: '1.5rem 0' }}>
                <table className="philosophy-data-table" aria-label="Comprehensive Synthesis Table">
                  <thead>
                    <tr>
                      <th scope="col">Domain</th>
                      <th scope="col">Physical / Cymatic Phenomenon</th>
                      <th scope="col">Vedic Metaphysics &amp; Sacred Art</th>
                      <th scope="col">Modern Quantum Equivalent</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Sound &amp; Form</strong></td>
                      <td>Tonoscope frequencies organizing sand into symmetrical standing patterns</td>
                      <td>Mantra generates Yantra (AUM manifests Śrī Chakra geometry)</td>
                      <td>Wave-Particle Duality &amp; Quantum Cymatics</td>
                    </tr>
                    <tr>
                      <td><strong>Microcosm &amp; Macrocosm</strong></td>
                      <td>Local standing waves reflecting global boundary vibrations</td>
                      <td>Yathā Piṇḍe Tathā Brahmāṇḍe (Garbha Upaniṣad 3)</td>
                      <td>Holographic Principle (Bohm &amp; Pribram: the part contains the whole)</td>
                    </tr>
                    <tr>
                      <td><strong>Threshold Art</strong></td>
                      <td>Nodal points of zero vibration forming stable energy corridors</td>
                      <td>Rangoli / Kolam as "Frozen Music" harmonizing dwellings</td>
                      <td>Acoustic Levitation &amp; Nodal Field Stabilization</td>
                    </tr>
                    <tr>
                      <td><strong>Living Biology</strong></td>
                      <td>Liquid crystal water lattice organizing along Fibonacci ratios (φ ≈ 1.618)</td>
                      <td>Pushpa-Añjali (Floral Mandalas) attuning cellular water to cosmos</td>
                      <td>Coherent Water Domains (Del Giudice &amp; Preparata)</td>
                    </tr>
                    <tr>
                      <td><strong>Sacred Space</strong></td>
                      <td>Geometric resonance chambers concentrating sound reflections</td>
                      <td>Vāstu Śāstra: Circle, Square, and Śiva-Śakti Triangles</td>
                      <td>Resonance Cavities &amp; Spatial Waveguides</td>
                    </tr>
                    <tr>
                      <td><strong>Impermanence</strong></td>
                      <td>Oscillating wave remains when individual sand patterns scatter</td>
                      <td>Sweeping rangolis &amp; withering flowers; abiding in Ānanda</td>
                      <td>Quantum Field Theory: excitations arise and return to the ground state</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Course Addendum Integration Banner */}
              <div
                style={{
                  background: 'linear-gradient(135deg, #f0fdf4 0%, #e0f2fe 100%)',
                  border: '1.5px solid #86efac',
                  borderRadius: '16px',
                  padding: '1.75rem',
                  marginTop: '2rem',
                  boxShadow: '0 4px 16px rgba(16, 185, 129, 0.08)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
                  <span style={{ fontSize: '1.6rem' }}>📜</span>
                  <h3 style={{ margin: 0, color: '#065f46', fontSize: '1.2rem', fontWeight: 800 }}>
                    Study This Masterclass in the Official Course Addendum
                  </h3>
                </div>
                <p style={{ margin: '0 0 1.25rem', color: '#334155', lineHeight: '1.6', fontSize: '0.96rem' }}>
                  This masterclass is officially codified as <strong>Part 6</strong> of the comprehensive{' '}
                  <em>षड्दर्शनानि साङ्ख्यं च (Foundations of Reality)</em> curriculum, featuring complete sūtras,
                  audio terms, and deep links to Pāṇinian phonetics.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  {onOpenCourseAddendum && (
                    <button
                      type="button"
                      className="philosophy-cta-primary"
                      style={{ padding: '0.65rem 1.25rem', fontSize: '0.9rem' }}
                      onClick={() => onOpenCourseAddendum('addendum-cymatics-music-of-matter')}
                    >
                      Open Masterclass 6 in Course Addendum ➔
                    </button>
                  )}
                  {onOpenVedicMaths && (
                    <button
                      type="button"
                      className="philosophy-cta-secondary"
                      style={{ padding: '0.65rem 1.25rem', fontSize: '0.9rem' }}
                      onClick={onOpenVedicMaths}
                    >
                      📐 Explore Vedic Maths Studio
                    </button>
                  )}
                </div>
              </div>

              {/* Call to Action Navigation */}
              <section className="philosophy-cta" aria-labelledby="cymatics-cta-heading" style={{ marginTop: '2.5rem' }}>
                <h2 id="cymatics-cta-heading">Harmonize Your Mind with the Music of Matter</h2>
                <p>
                  Experience the living science of Sanskrit through phonetics, Pāṇinian grammar, and sacred geometry.
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
                      setActiveEssay('tagore_sanskrit');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    🪕 Rabindranath Tagore &amp; Sanskrit ➔
                  </button>
                  <button
                    type="button"
                    className="philosophy-cta-secondary"
                    onClick={() => {
                      setActiveEssay('pingala_binary');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    ⚡ The Binary Blueprint (Piṅgala &amp; Computer Science) ➔
                  </button>
                  <button
                    type="button"
                    className="philosophy-cta-secondary"
                    onClick={() => {
                      setActiveEssay('turanga_bandha');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    ♞ Sound &amp; Strategy: Knight’s Tours in Sanskrit Poetry ➔
                  </button>
                </div>
              </section>
            </section>
          </div>
        )}

        {/* =========================================================================
            ESSAY 5: The Binary Blueprint: How Piṅgala Anticipated Computer Science
           ========================================================================= */}
        {activeEssay === 'pingala_binary' && (
          <div className="philosophy-essay-body">
            <header className="philosophy-hero">
              <span className="philosophy-kicker">Gurukul Darśana · Masterclass 7 · पिङ्गल-च्छन्दःशास्त्रम्</span>
              <h1 className="philosophy-title">
                The Binary Blueprint: How Piṅgala’s Chhandas Śāstra Anticipated Computer Science
              </h1>
              <p className="philosophy-mantra">
                लौऽर्धे · समे गिति च · द्विरूपम् · मेरु-प्रस्तारः
              </p>
              <p className="philosophy-secondary">
                Zeroes and Ones, Algorithmic Truth Tables, Bi-Directional Codecs, and Pascal’s Triangle in Ancient India
              </p>

              <blockquote className="philosophy-pull-quote" style={{ maxWidth: '44rem', margin: '1.25rem auto 0.75rem' }}>
                <p>
                  “Centuries before Gottfried Wilhelm Leibniz formalized the binary numeral system in 1689 Europe, the Indian mathematician and grammarian Achārya Piṅgala developed the exact mathematical foundations of binary arithmetic in the Chhandas Śāstra (c. 300–200 BCE). Through Sanskrit poetic meters, Piṅgala treated the human voice as a binary generator, formalizing combinatorial truth tables, bi-directional codecs, and Pascal’s Triangle nearly two millennia before Western science.”
                </p>
              </blockquote>

              <div className="philosophy-journey" style={{ marginTop: '1rem' }}>
                <AudioChip term="लघु" label="लघु (Laghu)" />
                <span className="philosophy-mantra-sep">·</span>
                <AudioChip term="गुरु" label="गुरु (Guru)" />
                <span className="philosophy-mantra-sep">·</span>
                <AudioChip term="प्रस्तारः" label="प्रस्तारः (Prastāra)" />
                <span className="philosophy-mantra-sep">·</span>
                <AudioChip term="नष्टम्" label="नष्टम् (Naṣṭam)" />
                <span className="philosophy-mantra-sep">·</span>
                <AudioChip term="उद्दिष्टम्" label="उद्दिष्टम् (Uddiṣṭam)" />
                <span className="philosophy-mantra-sep">·</span>
                <AudioChip term="मेरु-प्रस्तारः" label="मेरु-प्रस्तारः (Meru Prastāra)" />
                <span className="philosophy-mantra-sep">·</span>
                <AudioChip term="द्विरूपम्" label="द्विरूपम् (Dvirūpam)" />
                <span className="philosophy-mantra-sep">·</span>
                <AudioChip term="छन्दःशास्त्रम्" label="छन्दःशास्त्रम्" />
              </div>
            </header>

            {/* Visual Masterpiece Artwork Hero */}
            <figure className="philosophy-hero-mandala" style={{ maxWidth: 'min(100%, 820px)', margin: '1.75rem auto 2.25rem' }}>
              <img
                src="/philosophy/pingala-binary-blueprint.jpg"
                alt="The Binary Blueprint: How Piṅgala’s Chhandas Śāstra Anticipated Computer Science — Visual Infographic"
                width={1920}
                height={1300}
                loading="eager"
                decoding="async"
                style={{
                  display: 'block',
                  width: '100%',
                  height: 'auto',
                  borderRadius: '16px',
                  boxShadow: '0 12px 36px rgba(15, 23, 42, 0.16), 0 2px 8px rgba(0, 0, 0, 0.08)',
                }}
              />
              <figcaption style={{
                fontSize: '0.84rem',
                color: '#64748b',
                textAlign: 'center',
                marginTop: '0.75rem',
                fontStyle: 'italic',
                lineHeight: 1.5,
              }}>
                Visual Masterpiece: Achārya Piṅgala’s Chhandas Śāstra, Binary Truth Table (Prastāra), Halāyudha’s Meru Prastāra (Pascal’s Triangle c. 300 BCE), Bidirectional Codecs (Naṣṭam &amp; Uddiṣṭam), and the Human Voice as a Digital Generator.
              </figcaption>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginTop: '1rem' }} aria-label="Artwork thematic navigation">
                <a href="#pingala-laghu-guru" className="philosophy-chip" style={{ textDecoration: 'none', cursor: 'pointer' }}>⚡ 1. Laghu &amp; Guru: 0 and 1</a>
                <a href="#pingala-prastara" className="philosophy-chip" style={{ textDecoration: 'none', cursor: 'pointer' }}>📊 2. Prastāra: The Truth Table</a>
                <a href="#pingala-codecs" className="philosophy-chip" style={{ textDecoration: 'none', cursor: 'pointer' }}>🔄 3. Naṣṭam &amp; Uddiṣṭam: Codec</a>
                <a href="#pingala-meru" className="philosophy-chip" style={{ textDecoration: 'none', cursor: 'pointer' }}>🔺 4. Meru Prastāra: Pascal’s Pyramid</a>
                <a href="#pingala-dvirupam" className="philosophy-chip" style={{ textDecoration: 'none', cursor: 'pointer' }}>🚀 5. Dvirūpam: O(log n) Exponentiation</a>
                <a href="#pingala-art-code" className="philosophy-chip" style={{ textDecoration: 'none', cursor: 'pointer' }}>💻 6. Art into Code &amp; Computing</a>
              </div>
            </figure>

            {/* Section 1: The Language of Zeroes and Ones */}
            <section className="philosophy-section" id="pingala-laghu-guru" aria-labelledby="heading-pingala-laghu-guru">
              <h2 id="heading-pingala-laghu-guru">1. The Language of Zeroes and Ones: Laghu (0) and Guru (1)</h2>
              <p className="philosophy-lead">
                At the heart of modern computer science lies the bit: a binary unit of information that can exist in one of two states: 0 or 1. Over two millennia ago, Achārya Piṅgala discovered this exact mathematical principle through the study of Sanskrit poetic rhythm.
              </p>
              <p>
                In classical Sanskrit prosody (<em>Chhandas Śāstra</em>), poetry is not measured by syllable count alone, but by acoustic duration (<em>Mātrā</em>). Every syllable in Sanskrit belongs strictly to one of two fundamental rhythmic categories:
              </p>
              <ul className="philosophy-bullet-list">
                <li>
                  <strong>Laghu (लघु - Light / Short):</strong> Takes 1 unit of time (1 Mātrā) to pronounce, symbolized classically by a vertical crescent (∪) or dot. In Piṅgala’s mathematical abstraction, this is the digit <strong>0</strong>.
                </li>
                <li>
                  <strong>Guru (गुरु - Heavy / Long):</strong> Takes 2 units of time (2 Mātrās) to pronounce—either with a long vowel or followed by a consonant cluster (Samyuktākṣara)—symbolized classically by a horizontal line (—). In Piṅgala’s algebra, this is the digit <strong>1</strong>.
                </li>
              </ul>
              <p>
                By mapping language to a discrete 2-state algebraic set, Piṅgala realized that any poetic meter of length <em>n</em> syllables could be treated as an <em>n</em>-bit binary string. A four-syllable meter is a 4-bit nibble; an eight-syllable Anuṣṭubh pāda is an 8-bit byte!
              </p>

              <div className="philosophy-callout">
                <span className="philosophy-callout-icon" aria-hidden="true">💡</span>
                <div>
                  <h3 className="philosophy-callout-title">The Binary Invariance Principle</h3>
                  <p className="philosophy-callout-text">
                    “Gottfried Leibniz is credited with inventing binary in 1689. Yet Leibniz himself was influenced by ancient combinatorial treatises, and 2,000 years prior, Piṅgala had already proven that poetic syllables constitute a discrete binary algebraic group.”
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2: Prastāra: The Truth Table */}
            <section className="philosophy-section" id="pingala-prastara" aria-labelledby="heading-pingala-prastara">
              <h2 id="heading-pingala-prastara">2. Prastāra: Algorithmic Generation of Binary Sequences</h2>
              <p className="philosophy-lead">
                Piṅgala did not stop at identifying binary states; he created an algorithmic routine called <strong>Prastāra (प्रस्तारः)</strong> to systematically expand every possible permutation of a meter of <em>n</em> syllables without a single omission or duplication.
              </p>
              <p>
                Piṅgala’s algorithm for generating the table of permutations of length <em>n</em>:
              </p>
              <ol className="philosophy-bullet-list" style={{ paddingLeft: '1.25rem' }}>
                <li>Start with a row of all Gurus: <code>1 1 1 ... 1</code> (or all Laghus in inverted order).</li>
                <li>To generate the next permutation: locate the first Guru (1) from left to right, change it into a Laghu (0).</li>
                <li>Copy all syllables to its left as all Gurus (1s), and copy all syllables to its right unchanged.</li>
                <li>Repeat until the row consists entirely of all Laghus (0s).</li>
              </ol>
              <p>
                This recursive procedure generates exactly <strong>2<sup>n</sup></strong> distinct rows. It is, in every formal sense, a <strong>Binary Truth Table</strong>, created over 2,100 years before George Boole formalized Boolean logic in 1854!
              </p>

              {/* Interactive Tool 1: Prastāra Truth Table */}
              <PingalaPrastaraTruthTable onPlayAudio={handlePlayAudio} />

              <div className="philosophy-card" style={{ marginTop: '1.5rem', background: '#fdf4ff', border: '1.5px solid #f0abfc' }}>
                <h3 style={{ margin: '0 0 0.5rem', color: '#86198f', fontSize: '1.15rem', fontWeight: 800 }}>
                  The Vedic Mnemonic: यामाताराजभानसलगाम् (Yā-Mā-Tā-Rā-Ja-Bhā-Na-Sa-La-Gām)
                </h3>
                <p style={{ margin: '0 0 0.5rem', fontSize: '0.92rem', color: '#701a75', lineHeight: 1.5 }}>
                  To memorize the 8 possible 3-syllable triplets (2<sup>3</sup> = 8 Gaṇas), Indian scholars devised a single 10-syllable circular shift register: <strong>या-मा-ता-रा-ज-भा-न-स-ल-गाम्</strong>.
                  Taking any 3 consecutive syllables gives the exact binary structure of that Gaṇa:
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.5rem', marginTop: '0.75rem' }}>
                  <div style={{ background: '#ffffff', padding: '0.5rem', borderRadius: '6px', border: '1px solid #f5d0fe', fontSize: '0.82rem' }}>
                    <strong>मा-ता-रा (M)</strong>: 1-1-1 (All Guru)
                  </div>
                  <div style={{ background: '#ffffff', padding: '0.5rem', borderRadius: '6px', border: '1px solid #f5d0fe', fontSize: '0.82rem' }}>
                    <strong>या-मा-ता (Y)</strong>: 0-1-1 (Initial Laghu)
                  </div>
                  <div style={{ background: '#ffffff', padding: '0.5rem', borderRadius: '6px', border: '1px solid #f5d0fe', fontSize: '0.82rem' }}>
                    <strong>रा-ज-भा (R)</strong>: 1-0-1 (Middle Laghu)
                  </div>
                  <div style={{ background: '#ffffff', padding: '0.5rem', borderRadius: '6px', border: '1px solid #f5d0fe', fontSize: '0.82rem' }}>
                    <strong>स-ल-गा (S)</strong>: 0-0-1 (Final Guru)
                  </div>
                  <div style={{ background: '#ffffff', padding: '0.5rem', borderRadius: '6px', border: '1px solid #f5d0fe', fontSize: '0.82rem' }}>
                    <strong>ता-रा-ज (T)</strong>: 1-1-0 (Final Laghu)
                  </div>
                  <div style={{ background: '#ffffff', padding: '0.5rem', borderRadius: '6px', border: '1px solid #f5d0fe', fontSize: '0.82rem' }}>
                    <strong>ज-भा-न (J)</strong>: 0-1-0 (Middle Guru)
                  </div>
                  <div style={{ background: '#ffffff', padding: '0.5rem', borderRadius: '6px', border: '1px solid #f5d0fe', fontSize: '0.82rem' }}>
                    <strong>भा-न-स (Bh)</strong>: 1-0-0 (Initial Guru)
                  </div>
                  <div style={{ background: '#ffffff', padding: '0.5rem', borderRadius: '6px', border: '1px solid #f5d0fe', fontSize: '0.82rem' }}>
                    <strong>न-स-ल (N)</strong>: 0-0-0 (All Laghu)
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Naṣṭam & Uddiṣṭam: Lossless Codec */}
            <section className="philosophy-section" id="pingala-codecs" aria-labelledby="heading-pingala-codecs">
              <h2 id="heading-pingala-codecs">3. Naṣṭam &amp; Uddiṣṭam: The Bidirectional Digital Codec</h2>
              <p className="philosophy-lead">
                Generating an entire table of 2<sup>n</sup> rows can be cumbersome when <em>n</em> is large (for a 16-syllable meter, the table has 65,536 rows). What if a poet needs to look up row #42,105 directly, or verify which row an existing verse belongs to?
              </p>
              <p>
                To solve this, Piṅgala invented two inverse algorithms that constitute the world’s earliest recorded <strong>lossless numeric codec</strong>:
              </p>
              <ul className="philosophy-bullet-list">
                <li>
                  <strong>Naṣṭam (नष्टम् - &quot;The Lost Meter&quot;):</strong> Decimal-to-Binary conversion. Takes a decimal row index <em>K</em> and recovers its exact binary syllable pattern by repeatedly halving the number (<em>लौऽर्धे । समे गिति च ॥</em>).
                </li>
                <li>
                  <strong>Uddiṣṭam (उद्दिष्टम् - &quot;The Indicated Number&quot;):</strong> Binary-to-Decimal conversion. Takes any sequence of syllables and determines its exact row index in the master table by summing powers of 2.
                </li>
              </ul>

              {/* Interactive Tool 2: Naṣṭam & Uddiṣṭam Sandbox */}
              <PingalaNastamUddistamCodec onPlayAudio={handlePlayAudio} />
            </section>

            {/* Section 4: Meru Prastāra: Pascal's Pyramid */}
            <section className="philosophy-section" id="pingala-meru" aria-labelledby="heading-pingala-meru">
              <h2 id="heading-pingala-meru">4. Meru Prastāra: The Combinatorial Pyramid</h2>
              <p className="philosophy-lead">
                To calculate how many combinations in a meter have an exact count of short and long syllables (such as how many 4-syllable verses have exactly 2 Gurus and 2 Laghus), Piṅgala conceptualized a stepped pyramidal grid.
              </p>
              <p>
                In the 10th century CE, Indian mathematician Halāyudha drew this out in his commentary <em>Mṛtasañjīvanī</em> on Piṅgala, naming it the <strong>Meru Prastāra (मेरु-प्रस्तारः - The Staircase of Mount Meru)</strong>.
              </p>
              <p>
                Halāyudha’s sūtra states: <em>&quot;Draw a square at the summit. Below it, draw two squares overlapping. Fill the boundary squares with 1. For any interior square, add the numbers in the two squares immediately above it.&quot;</em>
              </p>
              <p>
                This arrangement generates the binomial coefficients: <code>1; 1 1; 1 2 1; 1 3 3 1; 1 4 6 4 1; 1 5 10 10 5 1...</code> This is identical to <strong>&quot;Pascal’s Triangle&quot;</strong>, published by Blaise Pascal in 1654 CE—approximately 1,900 years after Piṅgala and 700 years after Halāyudha!
              </p>

              {/* Interactive Tool 3: Meru Prastāra Pyramid */}
              <PingalaMeruPyramid onPlayAudio={handlePlayAudio} />
            </section>

            {/* Section 5: Dvirūpam: O(log n) Exponentiation */}
            <section className="philosophy-section" id="pingala-dvirupam" aria-labelledby="heading-pingala-dvirupam">
              <h2 id="heading-pingala-dvirupam">5. Dvirūpam: Binary Fast Exponentiation O(log n)</h2>
              <p className="philosophy-lead">
                How did Piṅgala calculate the total number of permutations 2<sup>n</sup> for large meters without multiplying 2 by itself <em>n</em> times?
              </p>
              <p>
                In Sūtras 8.28–31 (<em>द्विरूपम् । रूपे शून्यम् ॥</em>), Piṅgala introduced the algorithm known today as <strong>Exponentiation by Squaring</strong>. By repeatedly halving even powers and subtracting 1 from odd powers:
              </p>
              <ul className="philosophy-bullet-list">
                <li>If the exponent is even: halve it and mark an operation of squaring.</li>
                <li>If the exponent is odd: subtract 1, divide by 2, and double the base.</li>
              </ul>
              <p>
                Instead of requiring <em>n</em> sequential multiplications (an O(n) linear operation), Piṅgala reduced computation to <strong>O(log n) logarithmic time</strong>. This exact algorithm is the computational backbone of modern public-key cryptography (such as RSA and Diffie-Hellman key exchange) running on every secure internet connection today!
              </p>
            </section>

            {/* Section 6: Art into Code & Computing Matrix */}
            <section className="philosophy-section" id="pingala-art-code" aria-labelledby="heading-pingala-art-code">
              <h2 id="heading-pingala-art-code">6. Elevating the Rhythms of Art into Code: Comparative Matrix</h2>
              <p className="philosophy-lead">
                Piṅgala’s Chhandas Śāstra demonstrates that ancient Indian science did not view mathematics as a detached, purely utilitarian tool. Mathematics was recognized as the invisible, elegant architecture of music, language, and spiritual consciousness.
              </p>
              <p>
                By treating the human voice as a binary generator, ancient Indian grammarians proved that the structural integrity of natural language could be formalized through strict algorithmic code.
              </p>

              <div className="philosophy-table-wrapper" style={{ margin: '1.5rem 0' }}>
                <table className="philosophy-table" aria-label="Comparative table of Piṅgala’s concepts and modern computer science">
                  <thead>
                    <tr>
                      <th scope="col">Piṅgala’s Concept (c. 300 BCE)</th>
                      <th scope="col">Sanskrit Term</th>
                      <th scope="col">Modern Computer Science Equivalent</th>
                      <th scope="col">Year in Western Science</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Binary Syllable States</td>
                      <td lang="sa"><em>लघु (Laghu) &amp; गुरु (Guru)</em></td>
                      <td>Binary Bits (0 and 1)</td>
                      <td>Gottfried Leibniz (1689 CE)</td>
                    </tr>
                    <tr>
                      <td>Permutation Generation</td>
                      <td lang="sa"><em>प्रस्तारः (Prastāra)</em></td>
                      <td>Binary Truth Table</td>
                      <td>George Boole (1854 CE)</td>
                    </tr>
                    <tr>
                      <td>Decimal to Binary</td>
                      <td lang="sa"><em>नष्टम् (Naṣṭam)</em></td>
                      <td>Division-by-2 Number Conversion</td>
                      <td>Modern Computer Arithmetic</td>
                    </tr>
                    <tr>
                      <td>Binary to Decimal</td>
                      <td lang="sa"><em>उद्दिष्टम् (Uddiṣṭam)</em></td>
                      <td>Polynomial Evaluation / Horner’s Rule</td>
                      <td>William G. Horner (1819 CE)</td>
                    </tr>
                    <tr>
                      <td>Combinatorial Pyramid</td>
                      <td lang="sa"><em>मेरु-प्रस्तारः (Meru Prastāra)</em></td>
                      <td>Binomial Coefficients / Pascal’s Triangle</td>
                      <td>Blaise Pascal (1654 CE)</td>
                    </tr>
                    <tr>
                      <td>Meter Exponentiation</td>
                      <td lang="sa"><em>द्विरूपम् (Dvirūpam)</em></td>
                      <td>Fast Binary Exponentiation (O(log n))</td>
                      <td>Modern Cryptography &amp; ALU Design</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Call to Action Navigation */}
              <section className="philosophy-cta" aria-labelledby="pingala-cta-heading" style={{ marginTop: '2.5rem' }}>
                <h2 id="pingala-cta-heading">Experience the Living Code of Sanskrit</h2>
                <p>
                  Explore the companion Masterclass in the Course Addendum or delve into Vedic Mathematics drills.
                </p>
                <div className="philosophy-cta-actions">
                  {onOpenCourseAddendum && (
                    <button
                      type="button"
                      className="philosophy-cta-primary"
                      onClick={() => onOpenCourseAddendum('addendum-pingala-binary-blueprint')}
                    >
                      📜 Open Masterclass 7 in Course Addendum ➔
                    </button>
                  )}
                  {onOpenVedicMaths && (
                    <button type="button" className="philosophy-cta-secondary" onClick={onOpenVedicMaths}>
                      📐 Explore वैदिक-गणितम्
                    </button>
                  )}
                  <button
                    type="button"
                    className="philosophy-cta-secondary"
                    onClick={() => {
                      setActiveEssay('turanga_bandha');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    ♞ Sound &amp; Strategy: Knight’s Tours in Sanskrit Poetry ➔
                  </button>
                  <button
                    type="button"
                    className="philosophy-cta-secondary"
                    onClick={() => {
                      setActiveEssay('music_of_matter');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    🔔 The Music of Matter (Cymatics) ➔
                  </button>
                </div>
              </section>
            </section>
          </div>
        )}

        {/* =========================================================================
            ESSAY 6: The Architecture of Sound and Strategy: Knight's Tours
           ========================================================================= */}
        {activeEssay === 'turanga_bandha' && (
          <div className="philosophy-essay-body">
            <header className="philosophy-hero">
              <span className="philosophy-kicker">Gurukul Darśana · Masterclass 8 · चित्रकाव्यम्</span>
              <h1 className="philosophy-title">
                The Architecture of Sound and Strategy: Knight’s Tours in Classical Sanskrit Poetry
              </h1>
              <p className="philosophy-mantra">
                तुरङ्गबन्धः · चित्रकाव्यम् · चतुरङ्गम् · पादुकासहस्रम्
              </p>
              <p className="philosophy-secondary">
                Euler Anticipated by 900 Years · Rudraṭa’s Kāvyālaṅkāra · Vedānta Deśika’s Pādukā Sahasram 929–930 · 8×4 Matrix
              </p>

              <blockquote className="philosophy-pull-quote" style={{ maxWidth: '44rem', margin: '1.25rem auto 0.75rem' }}>
                <p>
                  “In classical Sanskrit literature, poets engaged in Chitra-Kāvya (constrained, pictorial poetry) where syllables were arranged into precise geometric matrices. The supreme mathematical zenith of this genre is the Turanga-Bandha (the Knight’s Tour). Centuries before Swiss mathematician Leonhard Euler investigated the Knight’s Tour in 1759, Sanskrit authors were using this exact Hamiltonian path topology across half-chessboards to encode hidden, grammatically flawless poems.”
                </p>
              </blockquote>

              <div className="philosophy-journey" style={{ marginTop: '1rem' }}>
                <AudioChip term="चित्रकाव्यम्" label="चित्रकाव्यम् (Chitra-Kāvya)" />
                <span className="philosophy-mantra-sep">·</span>
                <AudioChip term="तुरङ्गबन्धः" label="तुरङ्गबन्धः (Turaṅga-Bandha)" />
                <span className="philosophy-mantra-sep">·</span>
                <AudioChip term="चतुरङ्गम्" label="चतुरङ्गम् (Chaturaṅga)" />
                <span className="philosophy-mantra-sep">·</span>
                <AudioChip term="पादुकासहस्रम्" label="पादुकासहस्रम्" />
                <span className="philosophy-mantra-sep">·</span>
                <AudioChip term="स्थिरागसां सदाराध्या" label="श्लोकः ९२९" />
                <span className="philosophy-mantra-sep">·</span>
                <AudioChip term="स्थिता समयराजत्पा" label="श्लोकः ९३०" />
              </div>
            </header>

            {/* Visual Masterpiece Artwork Hero */}
            <figure className="philosophy-hero-mandala" style={{ maxWidth: 'min(100%, 820px)', margin: '1.75rem auto 2.25rem' }}>
              <img
                src="/philosophy/turanga-bandha-knights-tour.jpg"
                alt="The Architecture of Sound and Strategy: Knight's Tours in Classical Sanskrit Poetry — Visual Infographic"
                width={1920}
                height={1080}
                loading="eager"
                decoding="async"
                style={{
                  display: 'block',
                  width: '100%',
                  height: 'auto',
                  borderRadius: '16px',
                  boxShadow: '0 12px 36px rgba(15, 23, 42, 0.16), 0 2px 8px rgba(0, 0, 0, 0.08)',
                }}
              />
              <figcaption style={{
                fontSize: '0.84rem',
                color: '#64748b',
                textAlign: 'center',
                marginTop: '0.75rem',
                fontStyle: 'italic',
                lineHeight: 1.5,
              }}>
                Visual Masterpiece: The Luminous Celestial Horse (Turanga) leaping along an 8x4 half-chessboard Hamiltonian path, Sacred Pādukā of Lord Ranganatha on a glowing lotus, Palm-leaf manuscripts of Rudraṭa’s Kāvyālaṅkāra &amp; Vedānta Deśika’s Pādukā Sahasram.
              </figcaption>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginTop: '1rem' }} aria-label="Artwork thematic navigation">
                <a href="#turanga-chitra-kavya" className="philosophy-chip" style={{ textDecoration: 'none', cursor: 'pointer' }}>♞ 1. Chitra-Kāvya &amp; Strategy</a>
                <a href="#turanga-rudrata" className="philosophy-chip" style={{ textDecoration: 'none', cursor: 'pointer' }}>📜 2. Rudraṭa’s Kāvyālaṅkāra (9th c.)</a>
                <a href="#turanga-desika" className="philosophy-chip" style={{ textDecoration: 'none', cursor: 'pointer' }}>✨ 3. Deśika’s Verses 929 &amp; 930</a>
                <a href="#turanga-simulator" className="philosophy-chip" style={{ textDecoration: 'none', cursor: 'pointer' }}>♟️ 4. Interactive Chessboard</a>
                <a href="#turanga-constraints" className="philosophy-chip" style={{ textDecoration: 'none', cursor: 'pointer' }}>⚖️ 5. Four Simultaneous Constraints</a>
                <a href="#turanga-manuals" className="philosophy-chip" style={{ textDecoration: 'none', cursor: 'pointer' }}>⚔️ 6. Sanskrit Chess Treatises</a>
              </div>
            </figure>

            {/* Section 1: Chitra-Kāvya & Strategy */}
            <section className="philosophy-section" id="turanga-chitra-kavya" aria-labelledby="heading-turanga-chitra-kavya">
              <h2 id="heading-turanga-chitra-kavya">1. Chitra-Kāvya &amp; Turaṅga-Bandha: Sound Arranged as Strategy</h2>
              <p className="philosophy-lead">
                In classical Sanskrit poetics, language was recognized as a geometric, spatial matrix. Far from being a mere decorative pastime, <strong>Chitra-Kāvya (चित्रकाव्यम् - constrained or pictorial poetry)</strong> demanded unprecedented mathematical rigor.
              </p>
              <p>
                Poets arranged phonemes and syllables to satisfy strict visual shapes: wheels with radiating spokes (<em>Cakra-Bandha</em>), lotus blossoms with folding petals (<em>Padma-Bandha</em>), crisscrossing lightning trajectories (<em>Gomūtrikā-Bandha</em>), and chessboards.
              </p>
              <p>
                The most mathematically astounding of these patterns is the <strong>Turaṅga-Bandha (तुरङ्गबन्धः - &quot;horse-binding&quot; or &quot;knight’s pattern&quot;)</strong>. Originating from ancient India’s strategic game of <strong>Chaturaṅga (चतुरङ्ग)</strong>, the horse (knight) moves in an invariant L-shaped jump: two squares along one axis and one square perpendicular.
              </p>
              <p>
                Centuries before the Swiss mathematician Leonhard Euler investigated the Knight’s Tour in 1759—a topological challenge requiring a knight to visit all squares of a chessboard exactly once without duplication—Sanskrit poet-mathematicians were using this Hamiltonian path topology as a generative cipher to encode hidden, grammatically flawless verses.
              </p>

              <div className="philosophy-callout">
                <span className="philosophy-callout-icon" aria-hidden="true">💡</span>
                <div>
                  <h3 className="philosophy-callout-title">The Topological Miracle</h3>
                  <p className="philosophy-callout-text">
                    “Euler investigated the Knight’s Tour in 1759 on bare numeric squares. Sanskrit polymaths solved the Knight’s Tour nearly 900 years earlier while simultaneously balancing phonetic meter, compounding grammar, and profound spiritual theology.”
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2: Rudraṭa’s Kāvyālaṅkāra */}
            <section className="philosophy-section" id="turanga-rudrata" aria-labelledby="heading-turanga-rudrata">
              <h2 id="heading-turanga-rudrata">2. Rudraṭa’s Kāvyālaṅkāra (9th Century): The Earliest Documented Knight’s Tour</h2>
              <p className="philosophy-lead">
                The earliest known textual documentation of a Knight’s Tour anywhere in the world appears in the <em>Kāvyālaṅkāra (काव्यालङ्कारः)</em>, a master treatise on poetics by the 9th-century Kashmiri scholar Rudraṭa.
              </p>
              <p>
                Rudraṭa mapped a four-line Sanskrit stanza on a half-chessboard grid: an <strong>8×4 matrix containing exactly 32 syllables</strong> (matching the 32 syllables of an Anuṣṭubh meter with 8 syllables per quarter-verse).
              </p>
              <ul className="philosophy-bullet-list">
                <li>
                  <strong>Horizontal Reading:</strong> Reading conventionally from left to right, line by line, produces a complete, meaningful, grammatically flawless Sanskrit verse.
                </li>
                <li>
                  <strong>Knight’s Walk:</strong> Placing a chess knight on square 1 and following its strict L-shaped trajectory systematically visits all 32 squares without duplication or omission.
                </li>
                <li>
                  <strong>Dual Emergence:</strong> As the knight steps on the syllables in this sequence, it spells out a second, entirely distinct, grammatically perfect poem!
                </li>
              </ul>
            </section>

            {/* Section 3: Vedānta Deśika’s Pādukā Sahasram */}
            <section className="philosophy-section" id="turanga-desika" aria-labelledby="heading-turanga-desika">
              <h2 id="heading-turanga-desika">3. Vedānta Deśika’s Pādukā Sahasram (14th Century): Verses 929 and 930</h2>
              <p className="philosophy-lead">
                While Rudraṭa laid the structural groundwork, the supreme zenith of Turaṅga-Bandha was reached 500 years later by the Śrī Vaiṣṇava polymath, philosopher, and poet <strong>Śrī Vedānta Deśika (1268–1369 CE)</strong>.
              </p>
              <p>
                In his magnum opus, the <em>Śrī Pādukā Sahasram</em> (1,008 verses celebrating the sacred Sandals of Lord Ranganatha composed in a single night at Srirangam), Deśika dedicated the 30th chapter, <em>Chitra-Paddhati</em>, to geometric poetry. In this chapter, he introduced verses 929 and 930, which structurally solved the Knight’s Tour on a half-chessboard (8×4 grid).
              </p>

              <div className="philosophy-card" style={{ margin: '1.25rem 0', background: '#f0fdf4', border: '1.5px solid #86efac' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#166534', textTransform: 'uppercase' }}>
                    Verse 929 (The Linear Layout · 8x4 Grid)
                  </span>
                  <button
                    type="button"
                    className="philosophy-audio-btn"
                    onClick={() => handlePlayAudio('स्थिरागसां सदाराध्या विहताकततामता सत्पादुके सरसा मा रङ्गराजपदं नय')}
                  >
                    🔊 Chant 929
                  </button>
                </div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#14532d', lineHeight: 1.6, marginBottom: '0.5rem' }}>
                  स्थिरागसां सदाराध्या विहताकततामता ।<br />
                  सत्पादुके सरसा मा रङ्गराजपदं नय ॥ ९२९ ॥
                </div>
                <p style={{ margin: '0 0 0.5rem', fontSize: '0.88rem', color: '#15803d', fontStyle: 'italic' }}>
                  sthirāgasāṁ sadārādhyā vihatākatatāmatā | satpāduke sarasā mā raṅgarājapadaṁ naya ||
                </p>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#166534', lineHeight: 1.5 }}>
                  <strong>Meaning:</strong> &quot;O sacred Sandals of the Supreme Brahman! You are eternally adorned by those who have committed unpardonable sins; you destroy all sorrow and unwanted miseries; you produce a sweet, musical sound. Please lead me to the eternal feet of Lord Rangaraja.&quot;
                </p>
              </div>

              <div className="philosophy-card" style={{ margin: '1.25rem 0', background: '#fffbeb', border: '1.5px solid #fde68a' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#92400e', textTransform: 'uppercase' }}>
                    Verse 930 (The Knight’s Emergence · Steps 1 to 32)
                  </span>
                  <button
                    type="button"
                    className="philosophy-audio-btn"
                    onClick={() => handlePlayAudio('स्थिता समयराजत्पा गतामदके गवि दुरंहसामसन्नतादा साध्या तापकरासरा')}
                  >
                    🔊 Chant 930
                  </button>
                </div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#78350f', lineHeight: 1.6, marginBottom: '0.5rem' }}>
                  स्थिता समयराजत्पा गताऽऽमदके गवि ।<br />
                  दुरंहसामसन्नतादा साध्या तापकरासरा ॥ ९३० ॥
                </div>
                <p style={{ margin: '0 0 0.5rem', fontSize: '0.88rem', color: '#b45309', fontStyle: 'italic' }}>
                  sthitā samayarājatpā gatā&apos;&apos;madake gavi | duraṁhasāmasannatādā sādhyā tāpakarāsarā ||
                </p>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#78350f', lineHeight: 1.5 }}>
                  <strong>Meaning:</strong> &quot;The sandals protect those who shine with good conduct; they possess the deep brilliance of gold; they dispense boundless spiritual joy; they destroy the despair of the wicked; and the radiant rays of their gems have the power to instantly extinguish the burning heat of worldly suffering.&quot;
                </p>
              </div>

              <div style={{ marginTop: '1.25rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                  Deśika’s 8×4 Grid Mapping Matrix (Chronological Steps 01 to 32)
                </h3>
                <div className="philosophy-table-wrapper">
                  <table className="philosophy-table" style={{ textAlign: 'center' }}>
                    <thead>
                      <tr>
                        <th>Row / Pāda</th>
                        <th>Col 1</th>
                        <th>Col 2</th>
                        <th>Col 3</th>
                        <th>Col 4</th>
                        <th>Col 5</th>
                        <th>Col 6</th>
                        <th>Col 7</th>
                        <th>Col 8</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>Pāda 1</strong></td>
                        <td>01 (स्थि)</td>
                        <td>16 (रा)</td>
                        <td>21 (ग)</td>
                        <td>26 (सां)</td>
                        <td>03 (स)</td>
                        <td>18 (दा)</td>
                        <td>23 (रा)</td>
                        <td>28 (ध्या)</td>
                      </tr>
                      <tr>
                        <td><strong>Pāda 2</strong></td>
                        <td>20 (वि)</td>
                        <td>25 (ह)</td>
                        <td>02 (ता)</td>
                        <td>17 (क)</td>
                        <td>22 (त)</td>
                        <td>27 (ता)</td>
                        <td>04 (म)</td>
                        <td>15 (ता)</td>
                      </tr>
                      <tr>
                        <td><strong>Pāda 3</strong></td>
                        <td>09 (सत्)</td>
                        <td>32 (पा)</td>
                        <td>13 (दु)</td>
                        <td>06 (के)</td>
                        <td>11 (स)</td>
                        <td>30 (र)</td>
                        <td>07 (सा)</td>
                        <td>24 (मा)</td>
                      </tr>
                      <tr>
                        <td><strong>Pāda 4</strong></td>
                        <td>12 (रं)</td>
                        <td>05 (ग)</td>
                        <td>10 (रा)</td>
                        <td>31 (ज)</td>
                        <td>08 (प)</td>
                        <td>29 (दं)</td>
                        <td>14 (न)</td>
                        <td>19 (य)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Section 4: Interactive Chessboard Simulator */}
            <section className="philosophy-section" id="turanga-simulator" aria-labelledby="heading-turanga-simulator">
              <h2 id="heading-turanga-simulator">4. Interactive Chessboard: The Knight’s Tour in Real Time</h2>
              <p className="philosophy-lead">
                Step through the tour move by move or hit &quot;Play&quot; to watch the glowing knight leap across the half-chessboard, assembling Verse 930 before your eyes!
              </p>

              {/* Embedded Interactive Chessboard Component */}
              <TurangaBandhaChessboard onPlayAudio={handlePlayAudio} />
            </section>

            {/* Section 5: The Four Simultaneous Constraints */}
            <section className="philosophy-section" id="turanga-constraints" aria-labelledby="heading-turanga-constraints">
              <h2 id="heading-turanga-constraints">5. The Genius of the Sanskrit Matrix: Four Simultaneous Constraints</h2>
              <p className="philosophy-lead">
                What makes Deśika’s achievement genuinely mind-boggling is the layering of multiple simultaneous constraints across the same 32 cells:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', margin: '1.25rem 0' }}>
                <div style={{ background: '#f8fafc', padding: '1.15rem', borderRadius: '12px', border: '1.5px solid #e2e8f0' }}>
                  <div style={{ fontSize: '1.25rem', marginBottom: '0.4rem' }}>📐</div>
                  <h3 style={{ margin: '0 0 0.4rem', fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
                    1. Mathematical Accuracy
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.5 }}>
                    The underlying matrix must track a flawlessly valid Hamiltonian path (Knight’s Tour topology) across 32 independent cells without dead-ending or duplicating.
                  </p>
                </div>
                <div style={{ background: '#f8fafc', padding: '1.15rem', borderRadius: '12px', border: '1.5px solid #e2e8f0' }}>
                  <div style={{ fontSize: '1.25rem', marginBottom: '0.4rem' }}>📜</div>
                  <h3 style={{ margin: '0 0 0.4rem', fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
                    2. Grammatical Rigor
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.5 }}>
                    Both resulting sequences cannot be random strings or phonetic gibberish; they must strictly adhere to the intricate rules of Pāṇinian Sanskrit grammar, case inflections (Vibhakti), and multi-word compounding (Samāsa).
                  </p>
                </div>
                <div style={{ background: '#f8fafc', padding: '1.15rem', borderRadius: '12px', border: '1.5px solid #e2e8f0' }}>
                  <div style={{ fontSize: '1.25rem', marginBottom: '0.4rem' }}>🎵</div>
                  <h3 style={{ margin: '0 0 0.4rem', fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
                    3. Poetic Meter
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.5 }}>
                    Both verses must seamlessly fit the Anuṣṭubh meter (a fixed rhythmic cadence of 8 syllables per quarter-verse with specified Laghu/Guru weightings at syllables 5, 6, and 7).
                  </p>
                </div>
                <div style={{ background: '#f8fafc', padding: '1.15rem', borderRadius: '12px', border: '1.5px solid #e2e8f0' }}>
                  <div style={{ fontSize: '1.25rem', marginBottom: '0.4rem' }}>🕉️</div>
                  <h3 style={{ margin: '0 0 0.4rem', fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
                    4. Thematic Consistency
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.5 }}>
                    Both verses must independently convey deep, elegant theological meanings relating to the same sacred subject: the divine sandals of the Supreme Lord.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6: Historical Chess Manuals in Sanskrit */}
            <section className="philosophy-section" id="turanga-manuals" aria-labelledby="heading-turanga-manuals">
              <h2 id="heading-turanga-manuals">6. Historical Chess Manuals in Sanskrit: Chaturaṅga as War &amp; Geometry</h2>
              <p className="philosophy-lead">
                Beyond poetic constraints, the game of chess—originating in ancient India as <strong>Chaturaṅga (चतुरङ्ग - &quot;four limbs of the army&quot;)</strong>—was thoroughly documented in secular technical treatises as a science of war, logic, and statecraft:
              </p>
              <ul className="philosophy-bullet-list">
                <li>
                  <strong>Vilāsamaṇi Mañjarī (विलासमणिमञ्जरी):</strong> Written by royal scholar Pandit Trivengadacharya Shastri, detailing advanced endgame scenarios, piece strategies, and traditional Indian movements.
                </li>
                <li>
                  <strong>Chaturaṅga Sāra Sarvasva (चतुरङ्गसारसर्वस्वम्):</strong> Compiled in the 19th century under the patronage of the Maharaja of Mysore, this exhaustive manuscript functions as an encyclopedia of chess, loaded with complex geometrical problems, tactical board layouts, and knight-tour permutations.
                </li>
              </ul>

              <div className="philosophy-card" style={{ marginTop: '1.75rem', background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', color: '#ffffff' }}>
                <h3 style={{ margin: '0 0 0.5rem', color: '#a5b4fc', fontSize: '1.2rem', fontWeight: 800 }}>
                  The Living Synthesis: Art, Play, and Mathematics
                </h3>
                <p style={{ margin: 0, fontSize: '0.94rem', color: '#e0e7ff', lineHeight: 1.6 }}>
                  Sanskrit polymaths achieved these breakthroughs without modern computing or linear algebra models. They used the phonetic matrix of a language as a live combinatorics field, proving that art, play, and mathematics are fundamentally one.
                </p>
              </div>

              {/* Call to Action Navigation */}
              <section className="philosophy-cta" aria-labelledby="turanga-cta-heading" style={{ marginTop: '2.5rem' }}>
                <h2 id="turanga-cta-heading">Master Sanskrit as a Strategic Way of Thinking</h2>
                <p>
                  Explore Masterclass 8 in the Course Addendum or delve into Piṅgala’s binary mathematics.
                </p>
                <div className="philosophy-cta-actions">
                  {onOpenCourseAddendum && (
                    <button
                      type="button"
                      className="philosophy-cta-primary"
                      onClick={() => onOpenCourseAddendum('addendum-turanga-bandha-knights-tour')}
                    >
                      📜 Open Masterclass 8 in Course Addendum ➔
                    </button>
                  )}
                  {onOpenVedicMaths && (
                    <button type="button" className="philosophy-cta-secondary" onClick={onOpenVedicMaths}>
                      📐 Explore वैदिक-गणितम्
                    </button>
                  )}
                  <button
                    type="button"
                    className="philosophy-cta-secondary"
                    onClick={() => {
                      setActiveEssay('pingala_binary');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    ⚡ The Binary Blueprint (Piṅgala) ➔
                  </button>
                  <button
                    type="button"
                    className="philosophy-cta-secondary"
                    onClick={() => {
                      setActiveEssay('music_of_matter');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    🔔 The Music of Matter (Cymatics) ➔
                  </button>
                  <button
                    type="button"
                    className="philosophy-cta-secondary"
                    onClick={() => {
                      setActiveEssay('lilavati_math');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    🪷 The Poetic Equation: Bhāskara’s Līlāvatī ➔
                  </button>
                </div>
              </section>
            </section>
          </div>
        )}

        {/* =========================================================================
            ESSAY 7: The Poetic Equation: Bhāskarāchārya's Līlāvatī
           ========================================================================= */}
        {activeEssay === 'lilavati_math' && (
          <div className="philosophy-essay-body">
            <header className="philosophy-hero">
              <span className="philosophy-kicker">Gurukul Darśana · Masterclass 9 · लीलावती</span>
              <h1 className="philosophy-title">
                The Poetic Equation: How Bhāskarāchārya’s Līlāvatī Turned Mathematics into Art
              </h1>
              <p className="philosophy-mantra">
                लीलावती · भास्कराचार्यः · आनन्दः · विस्मयः
              </p>
              <p className="philosophy-secondary">
                Shattering the Science-Art Divide · Woodland Quadratic Riddles · Lover’s Quarrel Fractions · The Peacock &amp; the Lotus
              </p>

              <blockquote className="philosophy-pull-quote" style={{ maxWidth: '44rem', margin: '1.25rem auto 0.75rem' }}>
                <p>
                  “In modern global education, a strict structural wall stands between the sciences and the arts. Students are frequently classified as either &apos;analytical and logical&apos; or &apos;creative and literary&apos;. 12th-century India completely shattered this division through the Līlāvatī. Authored by the master astronomer-mathematician Bhāskarāchārya (Bhāskara II) in 1114 CE, this foundational treatise on arithmetic, algebra, and geometry was written entirely in elegant Sanskrit verse. Rather than presenting quantitative data in dry, abstract equations, Bhāskara wrapped complex concepts in the romantic and vibrant imagery of the natural world.”
                </p>
              </blockquote>

              <div className="philosophy-journey" style={{ marginTop: '1rem' }}>
                <AudioChip term="लीलावती" label="लीलावती (Līlāvatī)" />
                <span className="philosophy-mantra-sep">·</span>
                <AudioChip term="भास्कराचार्यः" label="भास्कराचार्यः (Bhāskara II)" />
                <span className="philosophy-mantra-sep">·</span>
                <AudioChip term="रसः" label="रसः (Aesthetic Rasa)" />
                <span className="philosophy-mantra-sep">·</span>
                <AudioChip term="आनन्दः" label="आनन्दः (Creative Bliss)" />
                <span className="philosophy-mantra-sep">·</span>
                <AudioChip term="अलिकुलदलमूलम्" label="भ्रमर-श्लोकः" />
                <span className="philosophy-mantra-sep">·</span>
                <AudioChip term="सिद्धान्तशिरोमणिः" label="सिद्धान्तशिरोमणिः" />
              </div>
            </header>

            {/* Visual Masterpiece Artwork Hero */}
            <figure className="philosophy-hero-mandala" style={{ maxWidth: 'min(100%, 820px)', margin: '1.75rem auto 2.25rem' }}>
              <img
                src="/philosophy/lilavati-poetic-equation.jpg"
                alt="The Poetic Equation: How Bhāskarāchārya’s Līlāvatī Turned Mathematics into Art — Visual Infographic"
                width={1920}
                height={1080}
                loading="eager"
                decoding="async"
                style={{
                  display: 'block',
                  width: '100%',
                  height: 'auto',
                  borderRadius: '16px',
                  boxShadow: '0 12px 36px rgba(15, 23, 42, 0.16), 0 2px 8px rgba(0, 0, 0, 0.08)',
                }}
              />
              <figcaption style={{
                fontSize: '0.84rem',
                color: '#64748b',
                textAlign: 'center',
                marginTop: '0.75rem',
                fontStyle: 'italic',
                lineHeight: 1.5,
              }}>
                Visual Masterpiece: Bhāskarāchārya and young Līlāvatī studying mathematics in a garden pavilion by the lotus lake, surrounded by swarming bees, a peacock watching a snake from a stone pillar, a broken pearl necklace, and celestial astrolabes.
              </figcaption>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginTop: '1rem' }} aria-label="Artwork thematic navigation">
                <a href="#lilavati-divide" className="philosophy-chip" style={{ textDecoration: 'none', cursor: 'pointer' }}>🪷 1. Shattering the Divide</a>
                <a href="#lilavati-bees" className="philosophy-chip" style={{ textDecoration: 'none', cursor: 'pointer' }}>🐝 2. Swarm of Bees (Quadratic)</a>
                <a href="#lilavati-necklace" className="philosophy-chip" style={{ textDecoration: 'none', cursor: 'pointer' }}>📿 3. Broken Necklace (Fractions)</a>
                <a href="#lilavati-peacock-lotus" className="philosophy-chip" style={{ textDecoration: 'none', cursor: 'pointer' }}>🦚 4. Peacock &amp; Lotus (Geometry)</a>
                <a href="#lilavati-studio" className="philosophy-chip" style={{ textDecoration: 'none', cursor: 'pointer' }}>⚙️ 5. Interactive Riddle Studio</a>
                <a href="#lilavati-aesthetics" className="philosophy-chip" style={{ textDecoration: 'none', cursor: 'pointer' }}>🎨 6. Sanskrit Aesthetics &amp; Rasa</a>
              </div>
            </figure>

            {/* Section 1: Shattering the Divide */}
            <section className="philosophy-section" id="lilavati-divide" aria-labelledby="heading-lilavati-divide">
              <h2 id="heading-lilavati-divide">1. Shattering the Divide: Mathematics Framed as Poetic Dialogue</h2>
              <p className="philosophy-lead">
                In modern education, an artificial wall divides the quantitative sciences from the creative arts. Students are classified as either &quot;analytical thinkers&quot; or &quot;imaginative writers.&quot;
              </p>
              <p>
                Twelfth-century India completely dissolved this division through the <em>Līlāvatī (लीलावती)</em>, the opening volume of Bhāskarāchārya’s masterwork <em>Siddhānta Śiromaṇi</em> (1114 CE).
              </p>
              <p>
                Rather than presenting arithmetic, algebra, and geometry in dry symbols, Bhāskara framed the treatise as an affectionate series of poetic riddles addressed to his daughter Līlāvatī. Complex algebraic equations were wrapped in the vibrant textures of the natural world: buzzing bee swarms, fragrant jasmine creepers, scattered pearl necklaces, gliding snakes, and wind-blown lotuses.
              </p>

              <div className="philosophy-callout">
                <span className="philosophy-callout-icon" aria-hidden="true">💡</span>
                <div>
                  <h3 className="philosophy-callout-title">The Pedagogy of Wonder</h3>
                  <p className="philosophy-callout-text">
                    “Bhāskarāchārya proved that mathematical abstraction need not be dry or intimidating. When cloaked in rhythm and metaphor, mathematics becomes a living aesthetic experience that evokes wonder (Vismaya) and creative bliss (Ānanda).”
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2: Resolution of the Swarm of Bees Riddle */}
            <section className="philosophy-section" id="lilavati-bees" aria-labelledby="heading-lilavati-bees">
              <h2 id="heading-lilavati-bees">2. Resolution of the Classic &quot;Swarm of Bees&quot; Riddle</h2>
              <p className="philosophy-lead">
                The poetic riddle of the swarming bees demonstrates Bhāskara’s ability to disguise a multi-step quadratic equation as a romantic woodland narrative.
              </p>
              <div className="philosophy-card" style={{ background: '#f0fdfa', border: '1.5px solid #99f6e4', margin: '1.25rem 0' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#134e4a', lineHeight: 1.6, marginBottom: '0.4rem' }}>
                  अलिकुलदलमूलं मालतीं यातम्...<br />
                  <span style={{ fontSize: '0.94rem', fontWeight: 600, color: '#0f766e' }}>
                    aliguladalaṁ pañcamo malindaḥ, tribhāgo vilīyate mallikāyām |<br />
                    tadantaraguṇaṁ triguṇaṁ ca mālatyāṁ, nalinīdale ca avaśiṣṭa ekaḥ ||
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#115e59', lineHeight: 1.5 }}>
                  <strong>The Constraints:</strong> The square root of half the swarm of bees flew to the Mālatī flowers (√(x/2)); one-fifth landed upon the jasmine bush (x/5); one-third nestled in the lotus bloom (x/3). Three times the difference between the jasmine and lotus visitors flew to the trumpet flower (3 × (x/3 - x/5) = 2x/5); and exactly one lonely bee remained trapped inside a folded lotus bud at night.
                </p>
              </div>

              <p>
                To find the total swarm <em>x</em>, we set up the equation:
              </p>
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontFamily: 'monospace', fontSize: '0.95rem', margin: '1rem 0' }}>
                x = √(x/2) + x/5 + x/3 + 3(x/3 - x/5) + 1<br />
                x = √(x/2) + 14x/15 + 1<br />
                x/15 - 1 = √(x/2)<br />
                ((x - 15) / 15)² = x / 2 ➔ <strong>2x² - 285x + 450 = 0</strong>
              </div>
              <p>
                In Bhāskara’s parallel canonical verse (<em>Alikuladalamūlaṁ mālatīṁ yātamaṣṭau...</em>), the equation factors to <code>(2x - 9)(x - 72) = 0</code>, yielding exactly <strong>72 bees</strong>!
              </p>
            </section>

            {/* Section 3: The Broken Necklace */}
            <section className="philosophy-section" id="lilavati-necklace" aria-labelledby="heading-lilavati-necklace">
              <h2 id="heading-lilavati-necklace">3. The Broken Necklace: Elevating a Lover’s Quarrel into Fractions</h2>
              <p className="philosophy-lead">
                Another spectacular instance of elevating the mundane to the magical occurs in a problem regarding a broken pearl necklace during a passionate embrace:
              </p>
              <div className="philosophy-card" style={{ background: '#fffbeb', border: '1.5px solid #fde68a', margin: '1.25rem 0' }}>
                <blockquote style={{ margin: '0 0 0.5rem', fontStyle: 'italic', fontSize: '0.96rem', color: '#92400e', lineHeight: 1.6 }}>
                  &quot;Whilst making love a necklace broke. A row of pearls mislaid.<br />
                  One sixth fell to the floor. One fifth upon the bed.<br />
                  The young woman saved one third of them. One tenth were caught by her lover.<br />
                  If six pearls remained upon the string, how many pearls were there altogether?&quot;
                </blockquote>
                <div style={{ marginTop: '0.65rem', fontSize: '0.88rem', color: '#78350f', lineHeight: 1.5 }}>
                  <strong>The Solution:</strong> Finding a common denominator of 30:<br />
                  <code>(5p + 6p + 10p + 3p) / 30 + 6 = p ➔ 24p / 30 + 6 = p ➔ 4/5 p + 6 = p ➔ 1/5 p = 6 ➔ <strong>p = 30 pearls!</strong></code>
                </div>
              </div>
            </section>

            {/* Section 4: Geometry Puzzles: The Peacock and the Lotus */}
            <section className="philosophy-section" id="lilavati-peacock-lotus" aria-labelledby="heading-lilavati-peacock-lotus">
              <h2 id="heading-lilavati-peacock-lotus">4. Geometry in Nature: The Perched Peacock and the Wind-Blown Lotus</h2>
              <p className="philosophy-lead">
                Bhāskara transforms geometric constraints into living kinetic scenes rather than static chalkboard figures:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', margin: '1.25rem 0' }}>
                <div style={{ background: '#f8fafc', padding: '1.15rem', borderRadius: '12px', border: '1.5px solid #e2e8f0' }}>
                  <h3 style={{ margin: '0 0 0.4rem', fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
                    🦚 The Sliding Peacock on the Pillar
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.5 }}>
                    A peacock atop a 9-cubit pillar dives diagonally to intercept a snake slithering toward its hole from 27 cubits away. Since speeds are equal, the flight hypotenuse equals the snake’s travel distance:
                  </p>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.84rem', background: '#ffffff', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1', margin: '0.5rem 0' }}>
                    9² + x² = (27 - x)² ➔ 81 + x² = 729 - 54x + x²<br />
                    54x = 648 ➔ <strong>x = 12 cubits!</strong>
                  </div>
                </div>

                <div style={{ background: '#f8fafc', padding: '1.15rem', borderRadius: '12px', border: '1.5px solid #e2e8f0' }}>
                  <h3 style={{ margin: '0 0 0.4rem', fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
                    🪷 The Lotus in the Lake
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.5 }}>
                    A lotus tip rises half a cubit (h = 0.5) above water. A gust of wind pushes it until submerged 2 cubits away (L = 2). The right triangle with depth <em>d</em> and stem <em>d + 0.5</em> yields:
                  </p>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.84rem', background: '#ffffff', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1', margin: '0.5rem 0' }}>
                    d² + 2² = (d + 0.5)² ➔ d² + 4 = d² + d + 0.25<br />
                    d = 4 - 0.25 ➔ <strong>d = 3.75 cubits depth!</strong>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5: Interactive Riddle Studio */}
            <section className="philosophy-section" id="lilavati-studio" aria-labelledby="heading-lilavati-studio">
              <h2 id="heading-lilavati-studio">5. Interactive Riddle Studio: Solve Bhāskara’s Four Riddles</h2>
              <p className="philosophy-lead">
                Experiment with the interactive sliders below to solve the quadratic bee swarm, string the pearls, calculate the peacock’s dive, and measure the lake depth:
              </p>

              {/* Embedded Interactive Component */}
              <LilavatiPoeticMathStudio onPlayAudio={handlePlayAudio} />
            </section>

            {/* Section 6: Sanskrit Aesthetics & Rasa */}
            <section className="philosophy-section" id="lilavati-aesthetics" aria-labelledby="heading-lilavati-aesthetics">
              <h2 id="heading-lilavati-aesthetics">6. Sanskrit Aesthetics: The Philosophy Behind the Poetry</h2>
              <p className="philosophy-lead">
                The synthesis of quantitative mathematics and high poetry was the absolute norm in classical Sanskrit text production, driven by a profound educational philosophy:
              </p>
              <ul className="philosophy-bullet-list">
                <li>
                  <strong>Mnemonic Technology:</strong> In an oral culture relying on human memory, metered verse (<em>Chandas</em>) created phonetic compression codecs that remained in a student’s memory permanently.
                </li>
                <li>
                  <strong>The Evocation of Rasa:</strong> Bhāskarāchārya believed that solving a mathematical problem should evoke <em>Ānanda</em> (creative, playful joy) rather than intellectual exhaustion.
                </li>
                <li>
                  <strong>The Unified Symphony:</strong> To the Vedic thinker, numbers were not cold accidental variables. The exact mathematics regulating an algebraic fraction was seen as identical to the laws organizing cosmic stars and musical harmonics.
                </li>
              </ul>

              {/* Call to Action Navigation */}
              <section className="philosophy-cta" aria-labelledby="lilavati-cta-heading" style={{ marginTop: '2.5rem' }}>
                <h2 id="lilavati-cta-heading">Awaken Your Mathematical Imagination</h2>
                <p>
                  Explore Masterclass 9 in the Course Addendum or delve into interactive Vedic Math drills.
                </p>
                <div className="philosophy-cta-actions">
                  {onOpenCourseAddendum && (
                    <button
                      type="button"
                      className="philosophy-cta-primary"
                      onClick={() => onOpenCourseAddendum('addendum-lilavati-poetic-equation')}
                    >
                      📜 Open Masterclass 9 in Course Addendum ➔
                    </button>
                  )}
                  {onOpenVedicMaths && (
                    <button type="button" className="philosophy-cta-secondary" onClick={onOpenVedicMaths}>
                      📐 Explore वैदिक-गणितम्
                    </button>
                  )}
                  <button
                    type="button"
                    className="philosophy-cta-secondary"
                    onClick={() => {
                      setActiveEssay('turanga_bandha');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    ♞ Sound &amp; Strategy (Knight’s Tours) ➔
                  </button>
                  <button
                    type="button"
                    className="philosophy-cta-secondary"
                    onClick={() => {
                      setActiveEssay('pingala_binary');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    ⚡ The Binary Blueprint (Piṅgala) ➔
                  </button>
                </div>
              </section>
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
